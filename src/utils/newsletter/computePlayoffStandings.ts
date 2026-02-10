import {
  getLeague,
  getMatchups,
  getRosters,
  getUsers,
} from "../api/SleeperAPI";
import type { Matchup, Roster, User } from "../../types/sleeperTypes";
import type { PlayoffTableData } from "../../types/newsletterTypes";

/** Red (#bc293d) for worst values */
const RED = { r: 0xbc, g: 0x29, b: 0x3d };
/** White midpoint */
const WHITE = { r: 0xff, g: 0xff, b: 0xff };
/** Green (#227740) for best values */
const GREEN = { r: 0x22, g: 0x77, b: 0x40 };

function interpolateColor(value: number, min: number, max: number): string {
  if (max === min) return "#f3f7f3"; // neutral when all values equal
  const ratio = (value - min) / (max - min);

  // Two-segment gradient: red → white → green (white at midpoint)
  let from, to, segmentRatio;
  if (ratio < 0.5) {
    from = RED;
    to = WHITE;
    segmentRatio = ratio * 2; // 0→1 within first half
  } else {
    from = WHITE;
    to = GREEN;
    segmentRatio = (ratio - 0.5) * 2; // 0→1 within second half
  }

  const r = Math.round(from.r + (to.r - from.r) * segmentRatio);
  const g = Math.round(from.g + (to.g - from.g) * segmentRatio);
  const b = Math.round(from.b + (to.b - from.b) * segmentRatio);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

type TeamStanding = {
  rosterId: number;
  name: string;
  wins: number;
  losses: number;
  pf: number;
  pa: number;
};

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
 * Compute standings from weekly matchups
 */
function computeStandings(
  rosters: Roster[],
  userById: Map<string, User>,
  weeklyMatchups: Matchup[][],
): TeamStanding[] {
  const standings = new Map<number, TeamStanding>();

  // Initialize standings for each roster
  for (const roster of rosters) {
    const user = userById.get(roster.owner_id);
    standings.set(roster.roster_id, {
      rosterId: roster.roster_id,
      name: getTeamName(user),
      wins: 0,
      losses: 0,
      pf: 0,
      pa: 0,
    });
  }

  // Process each week's matchups
  for (const matchups of weeklyMatchups) {
    if (!matchups || matchups.length === 0) continue;

    // Group matchups by matchup_id to find opponents
    const pairs = new Map<number, Matchup[]>();
    for (const m of matchups) {
      const existing = pairs.get(m.matchup_id) || [];
      existing.push(m);
      pairs.set(m.matchup_id, existing);
    }

    for (const [, pair] of pairs) {
      if (pair.length !== 2) continue;
      const [a, b] = pair;

      const standingA = standings.get(a.roster_id);
      const standingB = standings.get(b.roster_id);
      if (!standingA || !standingB) continue;

      standingA.pf += a.points;
      standingA.pa += b.points;
      standingB.pf += b.points;
      standingB.pa += a.points;

      if (a.points > b.points) {
        standingA.wins++;
        standingB.losses++;
      } else if (b.points > a.points) {
        standingB.wins++;
        standingA.losses++;
      }
      // Ties: neither gets a win or loss
    }
  }

  return Array.from(standings.values());
}

/**
 * Sort standings by wins (desc) then PF (desc)
 */
function sortStandings(standings: TeamStanding[]): TeamStanding[] {
  return [...standings].sort((a, b) => {
    if (b.wins !== a.wins) return b.wins - a.wins;
    return b.pf - a.pf;
  });
}

/**
 * Estimate team strength based on average points per game with recency weighting
 */
function estimateTeamStrength(
  rosterId: number,
  weeklyMatchups: Matchup[][],
): number {
  let totalWeightedPoints = 0;
  let totalWeight = 0;

  weeklyMatchups.forEach((matchups, weekIndex) => {
    if (!matchups) return;

    const matchup = matchups.find((m) => m.roster_id === rosterId);
    if (!matchup) return;

    // Recency weight: more recent weeks weighted higher
    // Most recent = 2.0, then 1.8, 1.6, 1.4, 1.2, older = 1.0
    const weeksBack = weeklyMatchups.length - 1 - weekIndex;
    const weight =
      weeksBack === 0
        ? 2.0
        : weeksBack === 1
          ? 1.8
          : weeksBack === 2
            ? 1.6
            : weeksBack === 3
              ? 1.4
              : weeksBack === 4
                ? 1.2
                : 1.0;

    totalWeightedPoints += matchup.points * weight;
    totalWeight += weight;
  });

  return totalWeight > 0 ? totalWeightedPoints / totalWeight : 100; // Default strength
}

/**
 * Simulate a single game between two teams
 */
function simulateGame(team1Strength: number, team2Strength: number): boolean {
  // Probabilistic win: P(team1 wins) = strength1 / (strength1 + strength2)
  const totalStrength = team1Strength + team2Strength;
  const team1WinProb = team1Strength / totalStrength;
  return Math.random() < team1WinProb;
}

/**
 * Run Monte Carlo simulation to calculate playoff probabilities
 */
function runMonteCarloSimulation(
  standings: TeamStanding[],
  weeklyMatchups: Matchup[][],
  currentWeek: number,
  totalWeeks: number,
  playoffSpots: number,
  simulations: number = 10000,
): { playoffProbs: Map<number, number>; lastProbs: Map<number, number> } {
  const playoffCounts = new Map<number, number>();
  const lastPlaceCounts = new Map<number, number>();

  // Initialize counts
  standings.forEach((team) => {
    playoffCounts.set(team.rosterId, 0);
    lastPlaceCounts.set(team.rosterId, 0);
  });

  // Estimate team strengths from historical data
  const teamStrengths = new Map<number, number>();
  standings.forEach((team) => {
    teamStrengths.set(
      team.rosterId,
      estimateTeamStrength(team.rosterId, weeklyMatchups),
    );
  });

  // Get remaining schedule (weeks currentWeek+1 to totalWeeks)
  const remainingWeeks = totalWeeks - currentWeek;
  if (remainingWeeks <= 0) {
    // No games remaining, current standings are final
    const sorted = sortStandings(standings);
    sorted.forEach((team, index) => {
      if (index < playoffSpots) {
        playoffCounts.set(team.rosterId, simulations);
      }
      if (index === sorted.length - 1) {
        lastPlaceCounts.set(team.rosterId, simulations);
      }
    });

    const playoffProbs = new Map<number, number>();
    const lastProbs = new Map<number, number>();
    playoffCounts.forEach((count, rosterId) => {
      playoffProbs.set(rosterId, (count / simulations) * 100);
    });
    lastPlaceCounts.forEach((count, rosterId) => {
      lastProbs.set(rosterId, (count / simulations) * 100);
    });
    return { playoffProbs, lastProbs };
  }

  // Run simulations
  for (let sim = 0; sim < simulations; sim++) {
    // Clone current standings for this simulation
    const simStandings = standings.map((team) => ({ ...team }));
    const standingsMap = new Map(simStandings.map((t) => [t.rosterId, t]));

    // Simulate remaining weeks
    for (let week = currentWeek + 1; week <= totalWeeks; week++) {
      // Get matchup pairings from a recent week (assume schedule repeats pattern)
      const sampleWeek = weeklyMatchups[Math.min(week - 1, currentWeek - 1)];
      if (!sampleWeek) continue;

      // Group by matchup_id to get opponents
      const pairs = new Map<number, Matchup[]>();
      for (const m of sampleWeek) {
        const existing = pairs.get(m.matchup_id) || [];
        existing.push(m);
        pairs.set(m.matchup_id, existing);
      }

      // Simulate each matchup
      for (const [, pair] of pairs) {
        if (pair.length !== 2) continue;
        const [a, b] = pair;

        const teamA = standingsMap.get(a.roster_id);
        const teamB = standingsMap.get(b.roster_id);
        if (!teamA || !teamB) continue;

        const strengthA = teamStrengths.get(a.roster_id) || 100;
        const strengthB = teamStrengths.get(b.roster_id) || 100;

        const teamAWins = simulateGame(strengthA, strengthB);
        if (teamAWins) {
          teamA.wins++;
          teamB.losses++;
        } else {
          teamB.wins++;
          teamA.losses++;
        }
      }
    }

    // Determine final standings after simulation
    const finalStandings = sortStandings(simStandings);

    // Count playoff appearances
    finalStandings.forEach((team, index) => {
      if (index < playoffSpots) {
        playoffCounts.set(
          team.rosterId,
          (playoffCounts.get(team.rosterId) || 0) + 1,
        );
      }
      if (index === finalStandings.length - 1) {
        lastPlaceCounts.set(
          team.rosterId,
          (lastPlaceCounts.get(team.rosterId) || 0) + 1,
        );
      }
    });
  }

  // Convert counts to probabilities
  const playoffProbs = new Map<number, number>();
  const lastProbs = new Map<number, number>();
  playoffCounts.forEach((count, rosterId) => {
    playoffProbs.set(rosterId, (count / simulations) * 100);
  });
  lastPlaceCounts.forEach((count, rosterId) => {
    lastProbs.set(rosterId, (count / simulations) * 100);
  });

  return { playoffProbs, lastProbs };
}

/**
 * Compute playoff standings with magic numbers and Monte Carlo probabilities
 */
export async function computePlayoffStandings(
  leagueId: string,
  currentWeek: number,
): Promise<PlayoffTableData[]> {
  if (currentWeek <= 0) return [];

  // Fetch all data in parallel
  const [league, users, rosters, ...weeklyMatchups] = await Promise.all([
    getLeague(leagueId),
    getUsers(leagueId),
    getRosters(leagueId),
    ...Array.from({ length: currentWeek }, (_, i) =>
      getMatchups(leagueId, i + 1),
    ),
  ]);

  const userById = new Map<string, User>(users.map((u) => [u.user_id, u]));

  // Calculate league parameters
  const totalWeeks = league.settings.playoff_week_start - 1;
  const playoffSpots = league.settings.playoff_teams || 6;
  const numTeams = rosters.length;
  const gamesRemaining = totalWeeks - currentWeek;

  // Compute current standings
  const standings = computeStandings(rosters, userById, weeklyMatchups);
  const sortedStandings = sortStandings(standings);

  // Get losses of key teams for magic number calculations
  const lastPlayoffTeamLosses =
    sortedStandings[Math.min(playoffSpots - 1, numTeams - 1)]?.losses || 0;
  const firstNonPlayoffTeamLosses =
    sortedStandings[Math.min(playoffSpots, numTeams - 1)]?.losses || 0;
  const lastPlaceLosses = sortedStandings[numTeams - 1]?.losses || 0;
  const secondLastLosses = sortedStandings[numTeams - 2]?.losses || 0;

  // Run Monte Carlo simulation for playoff probabilities
  const { playoffProbs, lastProbs } = runMonteCarloSimulation(
    sortedStandings,
    weeklyMatchups,
    currentWeek,
    totalWeeks,
    playoffSpots,
  );

  // Get probability ranges for color interpolation
  const playoffProbValues = Array.from(playoffProbs.values());
  const lastProbValues = Array.from(lastProbs.values());
  const minPlayoffProb = Math.min(...playoffProbValues);
  const maxPlayoffProb = Math.max(...playoffProbValues);
  const minLastProb = Math.min(...lastProbValues);
  const maxLastProb = Math.max(...lastProbValues);

  // Collect all numeric magic numbers for color scaling
  const playoffMagicNumbers: number[] = [];
  const lastMagicNumbers: number[] = [];
  sortedStandings.forEach((team, index) => {
    const rank = index + 1;
    const isInPlayoffSpot = rank <= playoffSpots;

    // Calculate Play-off # (magic number for clinching playoffs)
    let playoffNumber: number;
    if (isInPlayoffSpot) {
      playoffNumber = totalWeeks + 1 - team.wins - firstNonPlayoffTeamLosses;
    } else {
      playoffNumber = totalWeeks + 1 - team.wins - lastPlayoffTeamLosses;
    }
    if (playoffNumber > 0 && playoffNumber <= 2 * gamesRemaining + 1) {
      playoffMagicNumbers.push(playoffNumber);
    }

    // Calculate Last # (magic number for avoiding last place)
    let lastNumber = gamesRemaining - (lastPlaceLosses - team.losses - 1);
    if (rank === numTeams) {
      lastNumber += team.losses - secondLastLosses;
    }
    if (lastNumber > 0) {
      lastMagicNumbers.push(lastNumber);
    }
  });

  const minPlayoffMagic =
    playoffMagicNumbers.length > 0 ? Math.min(...playoffMagicNumbers) : 0;
  const maxPlayoffMagic =
    playoffMagicNumbers.length > 0 ? Math.max(...playoffMagicNumbers) : 0;
  const minLastMagic =
    lastMagicNumbers.length > 0 ? Math.min(...lastMagicNumbers) : 0;
  const maxLastMagic =
    lastMagicNumbers.length > 0 ? Math.max(...lastMagicNumbers) : 0;

  // Build result
  return sortedStandings.map((team, index): PlayoffTableData => {
    const rank = index + 1;
    const isInPlayoffSpot = rank <= playoffSpots;
    const isLastPlace = rank === numTeams;

    // Calculate Play-off # (magic number for clinching playoffs)
    let playoffNumber: number;
    if (isInPlayoffSpot) {
      // Teams in playoff spots: games needed to clinch vs 7th place
      playoffNumber = totalWeeks + 1 - team.wins - firstNonPlayoffTeamLosses;
    } else {
      // Teams outside playoffs: games needed to catch 6th place
      playoffNumber = totalWeeks + 1 - team.wins - lastPlayoffTeamLosses;
    }

    let playoffStatus: number | string;
    if (playoffNumber <= 0) {
      playoffStatus = "CLINCHED";
    } else if (playoffNumber > 2 * gamesRemaining + 1) {
      playoffStatus = "ELIMINATED";
    } else {
      playoffStatus = playoffNumber;
    }

    // Calculate Last # (magic number for avoiding last place)
    let lastNumber = gamesRemaining - (lastPlaceLosses - team.losses - 1);

    // Special case for last place team
    if (isLastPlace) {
      lastNumber += team.losses - secondLastLosses;
    }

    const lastStatus: number | string = lastNumber <= 0 ? "SAFE" : lastNumber;

    // Get probabilities from simulation
    const playoffProb = playoffProbs.get(team.rosterId) || 0;
    const lastProb = lastProbs.get(team.rosterId) || 0;

    // Determine playoff magic color
    let playoffMagicColor: string;
    if (playoffStatus === "CLINCHED") {
      playoffMagicColor = "#227740"; // Green
    } else if (playoffStatus === "ELIMINATED") {
      playoffMagicColor = "#bc293d"; // Red
    } else if (typeof playoffStatus === "number") {
      // Lower magic number = better (closer to clinching), so invert the scale
      playoffMagicColor = interpolateColor(
        playoffStatus,
        maxPlayoffMagic,
        minPlayoffMagic,
      );
    } else {
      playoffMagicColor = "#f3f7f3"; // Neutral
    }

    // Determine last place magic color
    let lastMagicColor: string;
    if (lastStatus === "SAFE") {
      lastMagicColor = "#227740"; // Green
    } else if (typeof lastStatus === "number") {
      // Lower magic number = better (closer to being safe), so invert the scale
      lastMagicColor = interpolateColor(lastStatus, maxLastMagic, minLastMagic);
    } else {
      lastMagicColor = "#f3f7f3"; // Neutral
    }

    return {
      Rank: rank,
      Team: team.name,
      W: team.wins,
      L: team.losses,
      "Play-off %": Math.round(playoffProb * 100) / 100,
      "WP Playoff %": 0, // Out of scope
      "Play-off #": playoffStatus,
      "Last %": Math.round(lastProb * 100) / 100,
      "Last #": lastStatus,
      PlayoffColor: interpolateColor(
        playoffProb,
        minPlayoffProb,
        maxPlayoffProb,
      ),
      WPPlayoffColor: "#f3f7f3", // Out of scope
      PlayoffMagicColor: playoffMagicColor,
      // Last %: inverted color (low % = green/safe, high % = red/danger)
      LastColor: interpolateColor(lastProb, maxLastProb, minLastProb),
      LastMagicColor: lastMagicColor,
    };
  });
}
