/**
 * Compute Matchup Data for Weekly Scoring Distribution
 *
 * Transforms Sleeper API matchup data into the format needed for:
 * - StackedHistogram (Distribution of Scoring)
 * - WeeklyScoringChart (Weekly statistics over time)
 * - WeeklyMarginTable (Margin of victory table)
 */

import { getRosters, getUsers, getMatchups } from "../api/FantasyAPI";
import type { MatchupData } from "../../types/newsletterTypes";
import type { Matchup, Roster, User } from "../../types/sleeperTypes";
import { ColorConstants } from "../../components/constants/ColorConstants";

/**
 * Calculate median value from an array of numbers
 */
const calculateMedian = (values: number[]): number => {
  if (values.length === 0) return 0;

  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  } else {
    return sorted[mid];
  }
};

/**
 * Calculate league-wide statistics for a specific week
 */
const calculateWeeklyStats = (matchups: Matchup[]) => {
  const allPoints = matchups.map((m) => m.points);

  return {
    Average: allPoints.reduce((a, b) => a + b, 0) / allPoints.length,
    Median: calculateMedian(allPoints),
    Maximum: Math.max(...allPoints),
    Minimum: Math.min(...allPoints),
  };
};

/**
 * Determine color for margin of victory
 * Green for close wins, red for close losses, component background for blowouts
 */
const getMarginColor = (margin: number): string => {
  const CLOSE_GAME_THRESHOLD = 10.0;

  if (margin > 0 && margin <= CLOSE_GAME_THRESHOLD) {
    return ColorConstants.light.closeWinGreen; // Close win
  } else if (margin < 0 && margin >= -CLOSE_GAME_THRESHOLD) {
    return ColorConstants.light.closeLossRed; // Close loss
  } else {
    // Use component background for blowouts (consistent with table display)
    return ColorConstants.light.background;
  }
};

/**
 * Build team metadata map from rosters and users
 */
const buildTeamMetadata = (rosters: Roster[], users: User[]) => {
  const userMap = new Map(users.map((u) => [u.user_id, u]));

  return new Map(
    rosters.map((roster) => {
      const user = userMap.get(roster.owner_id);
      const teamName =
        user?.metadata?.team_name ||
        user?.display_name ||
        user?.username ||
        `Team ${roster.roster_id}`;
      const avatarUrl = user?.metadata?.avatar || user?.avatar;

      return [
        roster.roster_id,
        {
          team_name: teamName,
          avatar_url: avatarUrl,
        },
      ];
    })
  );
};

/**
 * Compute matchup data for all weeks through currentWeek
 *
 * @param leagueId - Sleeper league ID
 * @param currentWeek - Current week number to fetch through
 * @returns Array of MatchupData objects (one per team per week)
 */
export const computeMatchupData = async (
  leagueId: string,
  currentWeek: number
): Promise<MatchupData[]> => {
  // Fetch rosters and users
  const [rosters, users] = await Promise.all([getRosters(leagueId), getUsers(leagueId)]);

  // Build team metadata map
  const teamMetadata = buildTeamMetadata(rosters, users);

  // Fetch all weeks of matchup data in parallel
  const allWeeksMatchups = await Promise.all(
    Array.from({ length: currentWeek }, (_, i) => getMatchups(leagueId, i + 1))
  );

  // Process each week and collect all margins for color scaling
  const weeklyData: Array<{
    week: number;
    team_name: string;
    image_or_text: string | undefined;
    matchup_id: number;
    team_points: number;
    margin_of_victory: number;
    Average: number;
    Median: number;
    Maximum: number;
    Minimum: number;
  }> = [];

  for (let week = 1; week <= currentWeek; week++) {
    const weekMatchups = allWeeksMatchups[week - 1];

    if (!weekMatchups || weekMatchups.length === 0) {
      continue; // Skip weeks with no data
    }

    // Calculate weekly statistics
    const weekStats = calculateWeeklyStats(weekMatchups);

    // Build a map of matchup_id -> matchups for finding opponents
    const matchupMap = new Map<number, Matchup[]>();
    for (const matchup of weekMatchups) {
      if (!matchup.matchup_id) continue;

      if (!matchupMap.has(matchup.matchup_id)) {
        matchupMap.set(matchup.matchup_id, []);
      }
      matchupMap.get(matchup.matchup_id)!.push(matchup);
    }

    // Process each team's matchup
    for (const matchup of weekMatchups) {
      const metadata = teamMetadata.get(matchup.roster_id);
      if (!metadata) continue;

      // Find opponent (same matchup_id, different roster_id)
      const opponentMatchups = matchupMap.get(matchup.matchup_id!) || [];
      const opponent = opponentMatchups.find((m) => m.roster_id !== matchup.roster_id);

      // Calculate margin of victory (rounded to 2 decimal places)
      const opponentPoints = opponent?.points || 0;
      const margin = Math.round((matchup.points - opponentPoints) * 100) / 100;

      weeklyData.push({
        week,
        team_name: metadata.team_name,
        image_or_text: metadata.avatar_url || undefined,
        matchup_id: matchup.matchup_id || 0,
        team_points: matchup.points,
        margin_of_victory: margin,
        Average: weekStats.Average,
        Median: weekStats.Median,
        Maximum: weekStats.Maximum,
        Minimum: weekStats.Minimum,
      });
    }
  }

  // Apply colors to all entries
  const result: MatchupData[] = weeklyData.map((data) => ({
    ...data,
    mov_color: getMarginColor(data.margin_of_victory),
  }));

  return result;
};
