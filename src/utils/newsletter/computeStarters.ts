import { getMatchups, getPlayers, getRosters, getUsers } from "../api/FantasyAPI";
import type { Roster, User } from "../../types/sleeperTypes";
import type { StartersData } from "../../types/newsletterTypes";

function getTeamName(user: User | undefined): string {
  if (!user) return "Unknown Team";
  return user.metadata?.team_name || user.display_name || user.username || "Unknown Team";
}

export async function computeStarters(leagueId: string, week: number): Promise<StartersData[]> {
  const [matchups, rosters, users, players] = await Promise.all([
    getMatchups(leagueId, week, true),
    getRosters(leagueId),
    getUsers(leagueId),
    getPlayers(leagueId, week),
  ]);

  const userById = new Map<string, User>(users.map((u) => [u.user_id, u]));

  // Map roster_id to roster and user info for quick lookup
  const rosterById = new Map<number, Roster>(rosters.map((r) => [r.roster_id, r]));

  console.log(
    "[computeStarters] rosterById keys:",
    [...rosterById.keys()].sort((a, b) => a - b),
    "userById keys (first 3):",
    [...userById.keys()].slice(0, 3)
  );

  const results: StartersData[] = [];

  for (const matchup of matchups) {
    const roster = rosterById.get(matchup.roster_id);
    const user = roster ? userById.get(roster.owner_id) : undefined;
    const teamName = getTeamName(user);
    console.log(
      `[computeStarters] roster_id=${matchup.roster_id} matchup_id=${matchup.matchup_id} → roster=${roster?.roster_id ?? "MISS"} owner_id=${roster?.owner_id?.slice(0, 8) ?? "—"} → teamName="${teamName}"`
    );

    const entries = matchup.starters.map((playerId, index) => {
      const player = players[playerId];
      const points = matchup.starters_points?.[index] ?? 0;

      // Get custom nickname from roster player_map
      const nickname = roster?.player_map?.[playerId] || undefined;

      return {
        full_name: player?.full_name || playerId,
        nickname,
        position: player?.position || "FLEX",
        points,
      };
    });

    // Sort by points descending
    entries.sort((a, b) => b.points - a.points);

    results.push({
      team_name: teamName,
      matchup_id: matchup.matchup_id,
      entries,
    });
  }

  return results;
}
