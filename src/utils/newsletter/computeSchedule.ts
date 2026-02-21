import { getMatchups, getRosters, getUsers } from "../api/FantasyAPI";
import type { Matchup, User } from "../../types/sleeperTypes";
import type { ScheduleData, RecordData } from "../../types/newsletterTypes";

function getTeamName(user: User | undefined): string {
  if (!user) return "Unknown Team";
  return user.metadata?.team_name || user.display_name || user.username || "Unknown Team";
}

/**
 * Represents a team's score and opponent for a given week
 */
interface WeeklyMatchup {
  rosterId: number;
  teamName: string;
  score: number;
  opponentRosterId: number;
  opponentScore: number;
}

/**
 * Calculates hypothetical records for each team playing every other team's schedule.
 * This shows how lucky/unlucky teams have been with their schedule by comparing
 * their actual record to what they would have achieved with different opponents.
 */
export async function computeSchedule(
  leagueId: string,
  throughWeek: number
): Promise<ScheduleData> {
  if (throughWeek <= 0) {
    return {
      best_records: [],
      worst_records: [],
      current_records: [],
    };
  }

  // Fetch all necessary data
  const [users, rosters, ...weeklyMatchups] = await Promise.all([
    getUsers(leagueId),
    getRosters(leagueId),
    ...Array.from({ length: throughWeek }, (_, i) => getMatchups(leagueId, i + 1)),
  ]);

  const userById = new Map<string, User>(users.map((u) => [u.user_id, u]));

  // Build team names map
  const teamNames = new Map<number, string>();
  for (const roster of rosters) {
    const user = userById.get(roster.owner_id);
    teamNames.set(roster.roster_id, getTeamName(user));
  }

  // Step 1: Get all team scores by week
  // weeklyData[weekIndex][rosterId] = { rosterId, teamName, score, opponentRosterId, opponentScore }
  const weeklyData: Map<number, WeeklyMatchup>[] = [];

  for (const matchups of weeklyMatchups) {
    if (!matchups || matchups.length === 0) continue;

    const weekData = new Map<number, WeeklyMatchup>();

    // Group by matchup_id to find opponent pairs
    const pairs = new Map<number, Matchup[]>();
    for (const m of matchups) {
      const existing = pairs.get(m.matchup_id) || [];
      existing.push(m);
      pairs.set(m.matchup_id, existing);
    }

    // Build weekly matchup data
    for (const [, pair] of pairs) {
      if (pair.length !== 2) continue;
      const [a, b] = pair;

      weekData.set(a.roster_id, {
        rosterId: a.roster_id,
        teamName: teamNames.get(a.roster_id) || "Unknown",
        score: a.points,
        opponentRosterId: b.roster_id,
        opponentScore: b.points,
      });

      weekData.set(b.roster_id, {
        rosterId: b.roster_id,
        teamName: teamNames.get(b.roster_id) || "Unknown",
        score: b.points,
        opponentRosterId: a.roster_id,
        opponentScore: a.points,
      });
    }

    weeklyData.push(weekData);
  }

  // Step 2: For each team pair (team1, team2), simulate team1 playing team2's schedule
  const allRosterIds = Array.from(teamNames.keys());

  // Map to store all simulated records
  // Key: `${team1RosterId}-${team2RosterId}`, Value: { wins, losses, ties }
  const simulatedRecords = new Map<string, { wins: number; losses: number; ties: number }>();

  for (const team1Id of allRosterIds) {
    for (const team2Id of allRosterIds) {
      const key = `${team1Id}-${team2Id}`;
      let wins = 0;
      let losses = 0;
      let ties = 0;

      // Simulate team1 playing team2's schedule
      for (const weekData of weeklyData) {
        const team1Week = weekData.get(team1Id);
        const team2Week = weekData.get(team2Id);

        if (!team1Week || !team2Week) continue;

        // If they actually played each other this week, use actual result
        if (team1Week.opponentRosterId === team2Id) {
          if (team1Week.score > team1Week.opponentScore) {
            wins++;
          } else if (team1Week.score < team1Week.opponentScore) {
            losses++;
          } else {
            ties++;
          }
        } else {
          // Otherwise, compare team1's score to team2's opponent's score
          // (team1 plays against who team2 faced)
          if (team1Week.score > team2Week.opponentScore) {
            wins++;
          } else if (team1Week.score < team2Week.opponentScore) {
            losses++;
          } else {
            ties++;
          }
        }
      }

      simulatedRecords.set(key, { wins, losses, ties });
    }
  }

  // Step 3: Find best, worst, and current records for each team
  const bestRecords: RecordData[] = [];
  const worstRecords: RecordData[] = [];
  const currentRecords: RecordData[] = [];

  for (const team1Id of allRosterIds) {
    const team1Name = teamNames.get(team1Id) || "Unknown";

    // Find best record (most wins)
    let bestWins = -1;
    let bestRecord: { wins: number; losses: number; ties: number } | null = null;
    const bestScheduleTeams: string[] = [];

    for (const team2Id of allRosterIds) {
      const key = `${team1Id}-${team2Id}`;
      const record = simulatedRecords.get(key);
      if (!record) continue;

      if (record.wins > bestWins) {
        bestWins = record.wins;
        bestRecord = record;
        bestScheduleTeams.length = 0;
        bestScheduleTeams.push(teamNames.get(team2Id) || "Unknown");
      } else if (record.wins === bestWins && bestRecord) {
        bestScheduleTeams.push(teamNames.get(team2Id) || "Unknown");
      }
    }

    if (bestRecord) {
      bestRecords.push({
        team1: team1Name,
        team2_list: bestScheduleTeams.sort(),
        wins: bestRecord.wins,
        losses: bestRecord.losses,
        ties: bestRecord.ties,
      });
    }

    // Find worst record (fewest wins)
    let worstWins = Infinity;
    let worstRecord: { wins: number; losses: number; ties: number } | null = null;
    const worstScheduleTeams: string[] = [];

    for (const team2Id of allRosterIds) {
      const key = `${team1Id}-${team2Id}`;
      const record = simulatedRecords.get(key);
      if (!record) continue;

      if (record.wins < worstWins) {
        worstWins = record.wins;
        worstRecord = record;
        worstScheduleTeams.length = 0;
        worstScheduleTeams.push(teamNames.get(team2Id) || "Unknown");
      } else if (record.wins === worstWins && worstRecord) {
        worstScheduleTeams.push(teamNames.get(team2Id) || "Unknown");
      }
    }

    if (worstRecord) {
      worstRecords.push({
        team1: team1Name,
        team2_list: worstScheduleTeams.sort(),
        wins: worstRecord.wins,
        losses: worstRecord.losses,
        ties: worstRecord.ties,
      });
    }

    // Current record (team1 playing their own schedule)
    const currentKey = `${team1Id}-${team1Id}`;
    const currentRecord = simulatedRecords.get(currentKey);
    if (currentRecord) {
      currentRecords.push({
        team1: team1Name,
        team2_list: [team1Name],
        wins: currentRecord.wins,
        losses: currentRecord.losses,
        ties: currentRecord.ties,
      });
    }
  }

  // Sort all records alphabetically by team name
  const sortByTeamName = (a: RecordData, b: RecordData) => a.team1.localeCompare(b.team1);

  return {
    best_records: bestRecords.sort(sortByTeamName),
    worst_records: worstRecords.sort(sortByTeamName),
    current_records: currentRecords.sort(sortByTeamName),
  };
}
