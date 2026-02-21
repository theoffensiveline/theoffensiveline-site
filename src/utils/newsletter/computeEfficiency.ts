import { getLeague, getMatchups, getPlayers, getRosters, getUsers } from "../api/FantasyAPI";
import type { GenericPlayer } from "../api/FantasyAPI";
import type { Matchup, Roster, User } from "../../types/sleeperTypes";
import type { EfficiencyData } from "../../types/newsletterTypes";

function getTeamName(user: User | undefined): string {
  if (!user) return "Unknown Team";
  return user.metadata?.team_name || user.display_name || user.username || "Unknown Team";
}

/**
 * Determines the fantasy position of a player by their ID.
 * Returns the primary fantasy position (QB, RB, WR, TE, K, DEF).
 */
function getPlayerPosition(
  playerId: string,
  players: Record<string, GenericPlayer>
): string | null {
  const player = players[playerId];
  if (!player) return null;
  // fantasy_positions is an array; use first entry as primary position
  return player.fantasy_positions?.[0] ?? player.position ?? null;
}

/**
 * Given a matchup's players and their points, plus the league's roster_positions,
 * calculates the maximum possible score using an optimal lineup.
 *
 * Uses a greedy approach:
 * 1. Fill position-locked slots (QB, RB, WR, TE, K, DEF) with the highest-scoring
 *    eligible players.
 * 2. Fill FLEX slots (RB/WR/TE) with the best remaining eligible players.
 * 3. Fill SUPER_FLEX slots (QB/RB/WR/TE) with the best remaining eligible players.
 * 4. BN (bench) slots are ignored.
 */
export function calculateOptimalScore(
  matchup: Matchup,
  rosterPositions: string[],
  players: Record<string, GenericPlayer>
): number {
  // Build a list of { playerId, position, points } for all players
  const playerPool = matchup.players
    .map((playerId) => ({
      playerId,
      position: getPlayerPosition(playerId, players),
      points: matchup.players_points?.[playerId] ?? 0,
    }))
    // Sort descending by points so greedy picks top scorers first
    .sort((a, b) => b.points - a.points);

  // Track which players have been assigned to a slot
  const used = new Set<string>();

  // Separate roster slots into categories
  const positionSlots: string[] = []; // QB, RB, WR, TE, K, DEF
  const flexSlots: string[] = []; // FLEX
  const superFlexSlots: string[] = []; // SUPER_FLEX, REC_FLEX
  const ignoredSlots = new Set(["BN", "IR"]);

  for (const slot of rosterPositions) {
    if (ignoredSlots.has(slot)) continue;
    if (slot === "FLEX") {
      flexSlots.push(slot);
    } else if (slot === "SUPER_FLEX" || slot === "REC_FLEX") {
      superFlexSlots.push(slot);
    } else {
      positionSlots.push(slot);
    }
  }

  let optimalScore = 0;

  // 1. Fill position-locked slots
  for (const slot of positionSlots) {
    const best = playerPool.find((p) => !used.has(p.playerId) && p.position === slot);
    if (best) {
      used.add(best.playerId);
      optimalScore += best.points;
    }
  }

  // 2. Fill FLEX slots (RB/WR/TE eligible)
  const flexEligible = new Set(["RB", "WR", "TE"]);
  for (const _ of flexSlots) {
    const best = playerPool.find(
      (p) => !used.has(p.playerId) && p.position && flexEligible.has(p.position)
    );
    if (best) {
      used.add(best.playerId);
      optimalScore += best.points;
    }
  }

  // 3. Fill SUPER_FLEX slots (QB/RB/WR/TE eligible)
  const superFlexEligible = new Set(["QB", "RB", "WR", "TE"]);
  for (const _ of superFlexSlots) {
    const best = playerPool.find(
      (p) => !used.has(p.playerId) && p.position && superFlexEligible.has(p.position)
    );
    if (best) {
      used.add(best.playerId);
      optimalScore += best.points;
    }
  }

  return optimalScore;
}

export async function computeEfficiency(leagueId: string, week: number): Promise<EfficiencyData[]> {
  const [league, matchups, rosters, users, players] = await Promise.all([
    getLeague(leagueId),
    getMatchups(leagueId, week),
    getRosters(leagueId),
    getUsers(leagueId),
    getPlayers(leagueId),
  ]);

  const userById = new Map<string, User>(users.map((u) => [u.user_id, u]));
  const rosterById = new Map<number, Roster>(rosters.map((r) => [r.roster_id, r]));

  const results: EfficiencyData[] = [];

  for (const matchup of matchups) {
    const roster = rosterById.get(matchup.roster_id);
    const user = roster ? userById.get(roster.owner_id) : undefined;
    const teamName = getTeamName(user);

    const actualPoints = matchup.points;
    const maxPoints = calculateOptimalScore(matchup, league.roster_positions, players);

    const percentage = maxPoints > 0 ? (actualPoints / maxPoints) * 100 : 100;

    results.push({
      week,
      team_name: teamName,
      actual_points: actualPoints,
      max_points: maxPoints,
      percentage,
    });
  }

  return results;
}
