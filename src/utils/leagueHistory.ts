import { getLeague, getRosters, getUsers } from "./api/SleeperAPI";
import { League, LeagueHistory, Roster, User } from "../types/sleeperTypes";

export async function fetchLeagueHistory(
  leagueId: string
): Promise<LeagueHistory> {
  const leagues: League[] = [];
  const rosters: Record<string, Roster[]> = {};
  const users: Record<string, User[]> = {};

  let currentLeagueId = leagueId;

  while (currentLeagueId) {
    // Use existing API functions instead of direct fetch calls
    const league = await getLeague(currentLeagueId);
    const leagueRosters = await getRosters(currentLeagueId);
    const leagueUsers = await getUsers(currentLeagueId);

    leagues.push(league);
    rosters[currentLeagueId] = leagueRosters;
    users[currentLeagueId] = leagueUsers;

    currentLeagueId = league.previous_league_id;
  }

  // Sort leagues by season (newest first)
  leagues.sort((a, b) => parseInt(b.season) - parseInt(a.season));

  return {
    leagues,
    rosters,
    users,
    metadata: {
      startYear: leagues[leagues.length - 1].season,
      endYear: leagues[0].season,
      totalSeasons: leagues.length,
    },
  };
}

export function getAvatarUrl(user: User): string | undefined {
  if (!user) return undefined;
  return user.metadata.avatar || 
    (user.avatar ? `https://sleepercdn.com/avatars/${user.avatar}` : undefined);
}

export function calculatePoints(roster: Roster): number {
  if (!roster) return 0;
  return roster.settings.fpts + roster.settings.fpts_decimal / 100;
}

export function formatRecord(roster: Roster): string {
  if (!roster) return '';
  const { wins, losses, ties } = roster.settings;
  return `${wins}-${losses}${ties > 0 ? `-${ties}` : ''}`;
}
