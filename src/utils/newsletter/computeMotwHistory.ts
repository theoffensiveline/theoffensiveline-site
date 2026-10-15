/**
 * Compute Matchup of the Week history for the motw-history section.
 *
 * The MotW chain is forward-only: an editor-set seed marks the first MotW
 * of the season, and each following week's MotW is whichever matchup the
 * previous winner plays in. (Backward tracing is underdetermined — both
 * MotW participants may have won their prior-week games, so the incumbent
 * can't be identified going the other direction.)
 */

import { getRosters, getUsers, getMatchups } from "../api/FantasyAPI";
import { interpolateColor } from "./colorUtils";
import type { Matchup, Roster, User } from "../../types/sleeperTypes";
import type { MotwSeed } from "../../types/firestore";

export interface MotwHistoryRow {
  week: number;
  winnerTeam: string;
  winnerScore: number;
  winnerScoreColor: string;
  loserTeam: string;
  loserScore: number;
  loserScoreColor: string;
}

/**
 * Build roster_id → display name map (same fallback order as
 * computeMatchupData's buildTeamMetadata).
 */
const buildTeamNames = (rosters: Roster[], users: User[]): Map<number, string> => {
  const userMap = new Map(users.map((u) => [u.user_id, u]));
  return new Map(
    rosters.map((roster) => {
      const user = userMap.get(roster.owner_id);
      return [
        roster.roster_id,
        user?.metadata?.team_name ||
          user?.display_name ||
          user?.username ||
          `Team ${roster.roster_id}`,
      ];
    })
  );
};

/**
 * Walk the MotW chain from the seed through currentWeek.
 *
 * @param leagueId - Platform-prefixed league ID
 * @param currentWeek - The issue's week; rows cover seed.week..currentWeek
 * @param seed - Editor-set starting MotW (stored on the newsletter season)
 * @returns One row per completed MotW, in week order. The chain stops at
 *   the first week where the incumbent has no matchup (e.g. eliminated
 *   from all brackets) or the seed matchup doesn't exist.
 */
export const computeMotwHistory = async (
  leagueId: string,
  currentWeek: number,
  seed: MotwSeed
): Promise<MotwHistoryRow[]> => {
  if (seed.week < 1 || seed.week > currentWeek) return [];

  const [rosters, users] = await Promise.all([getRosters(leagueId), getUsers(leagueId)]);
  const teamNames = buildTeamNames(rosters, users);

  /* All weeks through the issue's week — the chain only reads seed.week
     onward, but the score-color scale pools every score of the season. */
  const weeks = Array.from({ length: currentWeek }, (_, i) => i + 1);
  const weeklyMatchups = await Promise.all(weeks.map((w) => getMatchups(leagueId, w)));

  const rows: MotwHistoryRow[] = [];
  /* Roster carrying the belt into this week; null = use the seed matchup. */
  let incumbentRosterId: number | null = null;

  for (let i = seed.week - 1; i < weeks.length; i++) {
    const week = weeks[i];
    const matchups = weeklyMatchups[i];
    if (!matchups || matchups.length === 0) break;

    const incumbent = incumbentRosterId;
    let pair: Matchup[];
    if (incumbent === null) {
      pair = matchups.filter((m) => m.matchup_id === seed.matchupId);
    } else {
      const entry = matchups.find((m) => m.roster_id === incumbent);
      pair =
        entry?.matchup_id != null ? matchups.filter((m) => m.matchup_id === entry.matchup_id) : [];
    }
    if (pair.length !== 2) break;

    const [a, b] = pair;
    /* A tie keeps the belt with the first-listed roster — deterministic,
       and the bylaws' both-incumbent case is too rare to model here. */
    const [winner, loser] = a.points >= b.points ? [a, b] : [b, a];

    rows.push({
      week,
      winnerTeam: teamNames.get(winner.roster_id) ?? `Team ${winner.roster_id}`,
      winnerScore: winner.points,
      winnerScoreColor: "",
      loserTeam: teamNames.get(loser.roster_id) ?? `Team ${loser.roster_id}`,
      loserScore: loser.points,
      loserScoreColor: "",
    });
    incumbentRosterId = winner.roster_id;
  }

  /* Score cells share one red→white→green scale pooled across EVERY score
     of the season (not just MotW results) — same red/green endpoints as
     the other computed tables, so colors are comparable league-wide. */
  const allScores = weeklyMatchups.flat().map((m) => m.points);
  const minScore = Math.min(...allScores);
  const maxScore = Math.max(...allScores);
  for (const row of rows) {
    row.winnerScoreColor = interpolateColor(row.winnerScore, minScore, maxScore);
    row.loserScoreColor = interpolateColor(row.loserScore, minScore, maxScore);
  }

  return rows;
};
