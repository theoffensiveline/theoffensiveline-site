import { getMatchups, getRosters, getUsers } from "../api/FantasyAPI";
import type { Matchup, Roster, User } from "../../types/sleeperTypes";
import type { LeaderboardData } from "../../types/newsletterTypes";
import { getAvatarUrl } from "../leagueHistory";

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
  avatarUrl: string | undefined;
  wins: number;
  losses: number;
  pf: number;
  pa: number;
};

function getTeamName(user: User | undefined): string {
  if (!user) return "Unknown Team";
  return (
    user.metadata?.team_name || user.display_name || user.username || "Unknown Team"
  );
}

function computeStandings(
  rosters: Roster[],
  userById: Map<string, User>,
  weeklyMatchups: Matchup[][]
): TeamStanding[] {
  const standings = new Map<number, TeamStanding>();

  // Initialize standings for each roster
  for (const roster of rosters) {
    const user = userById.get(roster.owner_id);
    standings.set(roster.roster_id, {
      rosterId: roster.roster_id,
      name: getTeamName(user),
      avatarUrl: user ? getAvatarUrl(user) : undefined,
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

function sortAndRank(standings: TeamStanding[]): TeamStanding[] {
  return [...standings].sort((a, b) => {
    if (b.wins !== a.wins) return b.wins - a.wins;
    return b.pf - a.pf;
  });
}

export async function computeLeaderboard(
  leagueId: string,
  throughWeek: number
): Promise<LeaderboardData[]> {
  if (throughWeek <= 0) return [];

  // Fetch all data in parallel: users, rosters, and matchups for all weeks
  const [users, rosters, ...weeklyMatchups] = await Promise.all([
    getUsers(leagueId),
    getRosters(leagueId),
    ...Array.from({ length: throughWeek }, (_, i) =>
      getMatchups(leagueId, i + 1)
    ),
  ]);

  const userById = new Map<string, User>(users.map((u) => [u.user_id, u]));

  // Compute current standings (through throughWeek)
  const currentStandings = computeStandings(rosters, userById, weeklyMatchups);
  const currentSorted = sortAndRank(currentStandings);

  // Compute previous week standings for Trend (if throughWeek > 1)
  let prevRankByRosterId = new Map<number, number>();
  if (throughWeek > 1) {
    const prevStandings = computeStandings(
      rosters,
      userById,
      weeklyMatchups.slice(0, throughWeek - 1)
    );
    const prevSorted = sortAndRank(prevStandings);
    prevSorted.forEach((team, index) => {
      prevRankByRosterId.set(team.rosterId, index + 1);
    });
  } else {
    // Week 1: no previous week, trend is 0 for everyone
    currentSorted.forEach((team, index) => {
      prevRankByRosterId.set(team.rosterId, index + 1);
    });
  }

  // Find min/max PF and PA for color interpolation
  const pfValues = currentSorted.map((t) => t.pf);
  const paValues = currentSorted.map((t) => t.pa);
  const minPF = Math.min(...pfValues);
  const maxPF = Math.max(...pfValues);
  const minPA = Math.min(...paValues);
  const maxPA = Math.max(...paValues);

  return currentSorted.map((team, index): LeaderboardData => {
    const currentRank = index + 1;
    const prevRank = prevRankByRosterId.get(team.rosterId) ?? currentRank;
    // Trend is positive if rank improved (went from higher number to lower)
    const trend = prevRank - currentRank;

    return {
      Rank: currentRank,
      Trend: trend,
      Team: team.name,
      W: team.wins,
      L: team.losses,
      PF: Math.round(team.pf * 100) / 100,
      PA: Math.round(team.pa * 100) / 100,
      PFColor: interpolateColor(team.pf, minPF, maxPF),
      // PA: lower is better, so invert the color (low PA = green)
      PAColor: interpolateColor(team.pa, maxPA, minPA),
      avatar_upload: team.avatarUrl,
      image_or_text: team.avatarUrl,
    };
  });
}
