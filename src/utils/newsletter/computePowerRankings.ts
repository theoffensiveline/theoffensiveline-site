import { getMatchups, getRosters, getUsers } from "../api/FantasyAPI";
import type { Matchup, User } from "../../types/sleeperTypes";
import type { PowerRankingsData } from "../../types/newsletterTypes";

const RED = { r: 0xbc, g: 0x29, b: 0x3d };
const WHITE = { r: 0xff, g: 0xff, b: 0xff };
const GREEN = { r: 0x22, g: 0x77, b: 0x40 };

function interpolateColor(value: number, min: number, max: number): string {
  if (max === min) return "#f3f7f3";
  const ratio = (value - min) / (max - min);

  let from, to, segmentRatio;
  if (ratio < 0.5) {
    from = RED;
    to = WHITE;
    segmentRatio = ratio * 2;
  } else {
    from = WHITE;
    to = GREEN;
    segmentRatio = (ratio - 0.5) * 2;
  }

  const r = Math.round(from.r + (to.r - from.r) * segmentRatio);
  const g = Math.round(from.g + (to.g - from.g) * segmentRatio);
  const b = Math.round(from.b + (to.b - from.b) * segmentRatio);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

function getTeamName(user: User | undefined): string {
  if (!user) return "Unknown Team";
  return (
    user.metadata?.team_name ||
    user.display_name ||
    user.username ||
    "Unknown Team"
  );
}

/**
 * Get the recency weight for a week based on how many weeks back from current
 * @param weeksBack How many weeks back from the current week (0 = current week)
 * @returns The weight multiplier
 */
function getRecencyWeight(weeksBack: number): number {
  // Current week (0 weeks back): 2.0
  // Previous week (1 week back): 1.8
  // 2 weeks back: 1.6
  // 3 weeks back: 1.4
  // 4 weeks back: 1.2
  // All other weeks: 1.0
  switch (weeksBack) {
    case 0:
      return 2.0;
    case 1:
      return 1.8;
    case 2:
      return 1.6;
    case 3:
      return 1.4;
    case 4:
      return 1.2;
    default:
      return 1.0;
  }
}

type TeamPowerData = {
  rosterId: number;
  name: string;
  weightedWins: number;
  weightedLosses: number;
  unweightedWins: number;
  unweightedLosses: number;
  sos: number; // Strength of schedule
  opponentRanks: number[]; // Track opponent ranks for SOS calculation
};

/**
 * Rank teams by points for a given week
 * @param matchups Matchups for a single week
 * @returns Map of rosterId to rank (1 = highest points)
 */
function rankTeamsByPoints(matchups: Matchup[]): Map<number, number> {
  // Sort teams by points descending
  const sorted = [...matchups].sort((a, b) => b.points - a.points);

  const rankMap = new Map<number, number>();
  sorted.forEach((matchup, index) => {
    rankMap.set(matchup.roster_id, index + 1); // 1-indexed rank
  });

  return rankMap;
}

/**
 * Compute power rankings using weighted play-all algorithm
 */
export async function computePowerRankings(
  leagueId: string,
  throughWeek: number,
): Promise<PowerRankingsData[]> {
  if (throughWeek <= 0) return [];

  const [users, rosters, ...weeklyMatchups] = await Promise.all([
    getUsers(leagueId),
    getRosters(leagueId),
    ...Array.from({ length: throughWeek }, (_, i) =>
      getMatchups(leagueId, i + 1),
    ),
  ]);

  const userById = new Map<string, User>(users.map((u) => [u.user_id, u]));
  const N = rosters.length; // Number of teams

  /**
   * Calculate power rankings for a subset of weeks
   * @param weeks Array of weekly matchups to include
   * @returns Sorted array of team power data
   */
  function calculateRankings(weeks: Matchup[][]): TeamPowerData[] {
    const teamData = new Map<number, TeamPowerData>();

    // Initialize data for all rosters
    for (const roster of rosters) {
      const user = userById.get(roster.owner_id);
      teamData.set(roster.roster_id, {
        rosterId: roster.roster_id,
        name: getTeamName(user),
        weightedWins: 0,
        weightedLosses: 0,
        unweightedWins: 0,
        unweightedLosses: 0,
        sos: 0,
        opponentRanks: [],
      });
    }

    // Process each week
    weeks.forEach((matchups, weekIndex) => {
      if (!matchups || matchups.length === 0) return;

      // Calculate how many weeks back from the most recent week in the array
      const weeksBack = weeks.length - 1 - weekIndex;
      const weight = getRecencyWeight(weeksBack);

      // Rank teams by points for this week
      const weeklyRanks = rankTeamsByPoints(matchups);

      // Group matchups by matchup_id to find opponents
      const matchupPairs = new Map<number, Matchup[]>();
      for (const m of matchups) {
        const existing = matchupPairs.get(m.matchup_id) || [];
        existing.push(m);
        matchupPairs.set(m.matchup_id, existing);
      }

      // Calculate weighted play-all wins/losses and track opponent ranks
      for (const matchup of matchups) {
        const team = teamData.get(matchup.roster_id);
        if (!team) continue;

        const rank = weeklyRanks.get(matchup.roster_id) ?? N;

        // Play-all wins = N - rank, losses = rank - 1
        const playAllWins = N - rank;
        const playAllLosses = rank - 1;

        // Apply recency weight for ranking
        team.weightedWins += playAllWins * weight;
        team.weightedLosses += playAllLosses * weight;

        // Track unweighted for display
        team.unweightedWins += playAllWins;
        team.unweightedLosses += playAllLosses;

        // Track opponent rank for SOS calculation
        const pair = matchupPairs.get(matchup.matchup_id);
        if (pair && pair.length === 2) {
          const opponent = pair.find((m) => m.roster_id !== matchup.roster_id);
          if (opponent) {
            const opponentRank = weeklyRanks.get(opponent.roster_id) ?? N;
            team.opponentRanks.push(opponentRank);
          }
        }
      }
    });

    // Calculate SOS for each team (mean of N - opponent's weekly rank)
    for (const team of teamData.values()) {
      if (team.opponentRanks.length > 0) {
        const sosSum = team.opponentRanks.reduce(
          (sum, opponentRank) => sum + (N - opponentRank),
          0,
        );
        team.sos = sosSum / team.opponentRanks.length;
      }
    }

    // Sort teams by weighted wins (descending), then by SOS (descending)
    return Array.from(teamData.values()).sort((a, b) => {
      if (b.weightedWins !== a.weightedWins) {
        return b.weightedWins - a.weightedWins;
      }
      return b.sos - a.sos;
    });
  }

  // Calculate current rankings (all weeks through current week)
  const currentRankings = calculateRankings(weeklyMatchups);

  // Calculate previous rankings (all weeks except current week) for trend
  let previousRankings: TeamPowerData[] = [];
  if (throughWeek > 1) {
    const previousWeeks = weeklyMatchups.slice(0, -1);
    previousRankings = calculateRankings(previousWeeks);
  }

  // Create a map of previous ranks by rosterId
  const previousRankMap = new Map<number, number>();
  previousRankings.forEach((team, index) => {
    previousRankMap.set(team.rosterId, index + 1);
  });

  // Get value ranges for color interpolation
  const abilityValues = currentRankings.map((t) => {
    const totalGames = t.unweightedWins + t.unweightedLosses;
    return totalGames > 0 ? (t.unweightedWins / totalGames) * 100 : 0;
  });
  const sosValues = currentRankings.map((t) => t.sos);
  const minAbility = Math.min(...abilityValues);
  const maxAbility = Math.max(...abilityValues);
  const minSOS = Math.min(...sosValues);
  const maxSOS = Math.max(...sosValues);

  // Calculate max possible SOS (playing rank 1 team every week = N-1 average)
  const maxPossibleSOS = N - 1;

  // Convert to PowerRankingsData format
  return currentRankings.map((team, index): PowerRankingsData => {
    const currentRank = index + 1;
    const previousRank = previousRankMap.get(team.rosterId) ?? currentRank;
    const trend = previousRank - currentRank; // Positive = moved up

    // Team Ability = win percentage scaled to 1-100
    const totalGames = team.unweightedWins + team.unweightedLosses;
    const teamAbility =
      totalGames > 0 ? (team.unweightedWins / totalGames) * 99 + 1 : 1;

    // Str of Sched scaled to 1-100
    // SOS = 0 means played worst teams (1), SOS = maxPossibleSOS means played best teams (100)
    const strOfSched =
      maxPossibleSOS > 0 ? (team.sos / maxPossibleSOS) * 99 + 1 : 1;

    return {
      "P Rank": currentRank,
      Trend: trend,
      Team: team.name,
      "Play All W": team.unweightedWins,
      "Play All L": team.unweightedLosses,
      "Team Ability": Math.round(teamAbility * 100) / 100,
      "Str of Sched": Math.round(strOfSched * 100) / 100,
      TaColor: interpolateColor(teamAbility, minAbility, maxAbility),
      SosColor: interpolateColor(team.sos, maxSOS, minSOS),
    };
  });
}
