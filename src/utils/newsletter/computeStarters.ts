import { getMatchups, getRosters, getUsers } from "../api/SleeperAPI";
import type { Roster, User } from "../../types/sleeperTypes";
import type { StartersData } from "../../types/newsletterTypes";
import { sleeperPlayers } from "../playerUtils";

function getTeamName(user: User | undefined): string {
  if (!user) return "Unknown Team";
  return (
    user.metadata?.team_name ||
    user.display_name ||
    user.username ||
    "Unknown Team"
  );
}

export async function computeStarters(
  leagueId: string,
  week: number,
): Promise<StartersData[]> {
  const [matchups, rosters, users] = await Promise.all([
    getMatchups(leagueId, week),
    getRosters(leagueId),
    getUsers(leagueId),
  ]);

  const userById = new Map<string, User>(users.map((u) => [u.user_id, u]));

  // Map roster_id to roster and user info for quick lookup
  const rosterById = new Map<number, Roster>(
    rosters.map((r) => [r.roster_id, r]),
  );

  const results: StartersData[] = [];

  for (const matchup of matchups) {
    const roster = rosterById.get(matchup.roster_id);
    const user = roster ? userById.get(roster.owner_id) : undefined;
    const teamName = getTeamName(user);

    const entries = matchup.starters.map((playerId, index) => {
      const player = sleeperPlayers[playerId];
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
