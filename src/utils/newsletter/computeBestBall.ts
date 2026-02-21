import { getLeague, getMatchups, getPlayers, getRosters, getUsers } from "../api/FantasyAPI";
import type { Matchup, User } from "../../types/sleeperTypes";
import type { BestBallData } from "../../types/newsletterTypes";
import { calculateOptimalScore } from "./computeEfficiency";

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
  return user.metadata?.team_name || user.display_name || user.username || "Unknown Team";
}

type BestBallStanding = {
  rosterId: number;
  name: string;
  wins: number;
  losses: number;
  pf: number;
  pa: number;
};

export async function computeBestBall(
  leagueId: string,
  throughWeek: number
): Promise<BestBallData[]> {
  if (throughWeek <= 0) return [];

  const [league, users, rosters, players] = await Promise.all([
    getLeague(leagueId),
    getUsers(leagueId),
    getRosters(leagueId),
    // TODO: For ESPN leagues, this fetches throughWeek's roster to resolve player
    // positions for calculateOptimalScore. Players dropped before throughWeek may
    // still be missing, causing their position to be null and optimal scores for
    // early weeks to be slightly underestimated. A fully accurate fix would fetch
    // a per-week player map inside the week loop (N extra API calls).
    getPlayers(leagueId, throughWeek),
  ]);
  const weeklyMatchups: Matchup[][] = await Promise.all(
    Array.from({ length: throughWeek }, (_, i) => getMatchups(leagueId, i + 1))
  );

  const userById = new Map<string, User>(users.map((u) => [u.user_id, u]));

  function buildStandings(weeks: Matchup[][]): BestBallStanding[] {
    const standings = new Map<number, BestBallStanding>();

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

    for (const matchups of weeks) {
      if (!matchups || matchups.length === 0) continue;

      // Group by matchup_id to find opponent pairs
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

        // Calculate optimal scores for both teams
        const optimalA = calculateOptimalScore(a, league.roster_positions, players);
        const optimalB = calculateOptimalScore(b, league.roster_positions, players);

        // Best ball: everyone plays optimal lineups
        standingA.pf += optimalA;
        standingA.pa += optimalB;
        standingB.pf += optimalB;
        standingB.pa += optimalA;

        if (optimalA > optimalB) {
          standingA.wins++;
          standingB.losses++;
        } else if (optimalB > optimalA) {
          standingB.wins++;
          standingA.losses++;
        }
      }
    }

    return Array.from(standings.values());
  }

  function sortStandings(standings: BestBallStanding[]): BestBallStanding[] {
    return [...standings].sort((a, b) => {
      if (b.wins !== a.wins) return b.wins - a.wins;
      return b.pf - a.pf;
    });
  }

  function buildActualStandings(weeks: Matchup[][]): BestBallStanding[] {
    const standings = new Map<number, BestBallStanding>();

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

    for (const matchups of weeks) {
      if (!matchups || matchups.length === 0) continue;

      // Group by matchup_id to find opponent pairs
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

        // Actual scores (not optimal)
        const actualA = a.points;
        const actualB = b.points;

        standingA.pf += actualA;
        standingA.pa += actualB;
        standingB.pf += actualB;
        standingB.pa += actualA;

        if (actualA > actualB) {
          standingA.wins++;
          standingB.losses++;
        } else if (actualB > actualA) {
          standingB.wins++;
          standingA.losses++;
        }
      }
    }

    return Array.from(standings.values());
  }

  // Current best ball standings (optimal lineups)
  const currentSorted = sortStandings(buildStandings(weeklyMatchups));

  // Actual standings for Diff calculation (actual lineups)
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

  return currentSorted.map((team, index): BestBallData => {
    const bestBallRank = index + 1;
    const actualRank = actualRankByRosterId.get(team.rosterId) ?? bestBallRank;
    const diff = actualRank - bestBallRank;

    return {
      Rank: bestBallRank,
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
