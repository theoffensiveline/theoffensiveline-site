import { getMatchups, getRosters, getUsers } from "../api/FantasyAPI";
import type { Matchup, User } from "../../types/sleeperTypes";
import type { MedianData } from "../../types/newsletterTypes";

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

type MedianStanding = {
  rosterId: number;
  name: string;
  wins: number;
  losses: number;
  pf: number;
  pa: number;
};

/**
 * Calculates the median score for a given week's matchups.
 * Returns the median of all team scores for that week.
 */
function calculateMedianScore(matchups: Matchup[]): number {
  const scores = matchups.map((m) => m.points).sort((a, b) => a - b);
  const mid = Math.floor(scores.length / 2);

  if (scores.length % 2 === 0) {
    // Even number of teams: average the two middle values
    return (scores[mid - 1] + scores[mid]) / 2;
  } else {
    // Odd number of teams: take the middle value
    return scores[mid];
  }
}

export async function computeMedian(
  leagueId: string,
  throughWeek: number,
): Promise<MedianData[]> {
  if (throughWeek <= 0) return [];

  const [users, rosters, ...weeklyMatchups] = await Promise.all([
    getUsers(leagueId),
    getRosters(leagueId),
    ...Array.from({ length: throughWeek }, (_, i) =>
      getMatchups(leagueId, i + 1),
    ),
  ]);

  const userById = new Map<string, User>(users.map((u) => [u.user_id, u]));

  function buildStandings(weeks: Matchup[][]): MedianStanding[] {
    const standings = new Map<number, MedianStanding>();

    // Initialize standings for all rosters
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

    // Process each week
    for (const matchups of weeks) {
      if (!matchups || matchups.length === 0) continue;

      // Calculate median score for this week
      const medianScore = calculateMedianScore(matchups);

      // Group by matchup_id to find opponent pairs
      const pairs = new Map<number, Matchup[]>();
      for (const m of matchups) {
        const existing = pairs.get(m.matchup_id) || [];
        existing.push(m);
        pairs.set(m.matchup_id, existing);
      }

      // Process actual matchups (head-to-head records)
      for (const [, pair] of pairs) {
        if (pair.length !== 2) continue;
        const [a, b] = pair;

        const standingA = standings.get(a.roster_id);
        const standingB = standings.get(b.roster_id);
        if (!standingA || !standingB) continue;

        // Track PF and PA
        standingA.pf += a.points;
        standingA.pa += b.points;
        standingB.pf += b.points;
        standingB.pa += a.points;

        // Actual matchup result
        if (a.points > b.points) {
          standingA.wins++;
          standingB.losses++;
        } else if (b.points > a.points) {
          standingB.wins++;
          standingA.losses++;
        }
        // Note: ties possible but rare in fantasy
      }

      // Process median records (each team vs median)
      for (const matchup of matchups) {
        const standing = standings.get(matchup.roster_id);
        if (!standing) continue;

        // Each team plays against the median
        if (matchup.points > medianScore) {
          standing.wins++;
        } else if (matchup.points < medianScore) {
          standing.losses++;
        }
        // If exactly equal to median, no W or L (rare but possible)
      }
    }

    return Array.from(standings.values());
  }

  function sortStandings(standings: MedianStanding[]): MedianStanding[] {
    return [...standings].sort((a, b) => {
      if (b.wins !== a.wins) return b.wins - a.wins;
      return b.pf - a.pf;
    });
  }

  function buildActualStandings(weeks: Matchup[][]): MedianStanding[] {
    const standings = new Map<number, MedianStanding>();

    // Initialize standings for all rosters
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

    // Process each week - only actual head-to-head matchups
    for (const matchups of weeks) {
      if (!matchups || matchups.length === 0) continue;

      // Group by matchup_id to find opponent pairs
      const pairs = new Map<number, Matchup[]>();
      for (const m of matchups) {
        const existing = pairs.get(m.matchup_id) || [];
        existing.push(m);
        pairs.set(m.matchup_id, existing);
      }

      // Process actual matchups (head-to-head records only)
      for (const [, pair] of pairs) {
        if (pair.length !== 2) continue;
        const [a, b] = pair;

        const standingA = standings.get(a.roster_id);
        const standingB = standings.get(b.roster_id);
        if (!standingA || !standingB) continue;

        // Track PF and PA
        standingA.pf += a.points;
        standingA.pa += b.points;
        standingB.pf += b.points;
        standingB.pa += a.points;

        // Actual matchup result
        if (a.points > b.points) {
          standingA.wins++;
          standingB.losses++;
        } else if (b.points > a.points) {
          standingB.wins++;
          standingA.losses++;
        }
      }
    }

    return Array.from(standings.values());
  }

  // Current median standings (actual + median games)
  const currentSorted = sortStandings(buildStandings(weeklyMatchups));

  // Actual standings for Diff calculation (head-to-head only)
  const actualSorted = sortStandings(buildActualStandings(weeklyMatchups));
  const actualRankByRosterId = new Map<number, number>();
  actualSorted.forEach((team, index) => {
    actualRankByRosterId.set(team.rosterId, index + 1);
  });

  // Color interpolation ranges
  const pfValues = currentSorted.map((t) => t.pf);
  const paValues = currentSorted.map((t) => t.pa);
  const minPF = Math.min(...pfValues);
  const maxPF = Math.max(...pfValues);
  const minPA = Math.min(...paValues);
  const maxPA = Math.max(...paValues);

  return currentSorted.map((team, index): MedianData => {
    const medianRank = index + 1;
    const actualRank = actualRankByRosterId.get(team.rosterId) ?? medianRank;
    const diff = actualRank - medianRank;

    return {
      Rank: medianRank,
      Diff: diff,
      Team: team.name,
      W: team.wins,
      L: team.losses,
      PF: Math.round(team.pf * 100) / 100,
      PA: Math.round(team.pa * 100) / 100,
      PFColor: interpolateColor(team.pf, minPF, maxPF),
      PAColor: interpolateColor(team.pa, maxPA, minPA),
    };
  });
}
