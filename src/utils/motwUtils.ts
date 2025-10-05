import { getMatchups, getLeague } from "./api/SleeperAPI";
import { Matchup } from "../types/sleeperTypes";

export interface MotwData {
  matchupId: number;
  rosters: number[];
}

const motwCache = new Map<
  string,
  { data: Map<number, MotwData>; maxWeek: number }
>();

export const computeMotwChain = async (
  targetWeek: number,
  currentWeek: number,
  leagueId: string
): Promise<Map<number, MotwData>> => {
  if (targetWeek > currentWeek) {
    return new Map();
  }

  // Check cache
  const cached = motwCache.get(leagueId);
  if (cached && cached.maxWeek >= targetWeek) {
    // Return slice up to targetWeek
    return new Map(
      Array.from(cached.data.entries()).filter(([w]) => w <= targetWeek)
    );
  } else if (cached) {
    // Return the cached data, since we don't have data for newer weeks yet
    return cached.data;
  }

  // Compute
  const leagueData = await getLeague(leagueId);
  const rosterPositions = leagueData.roster_positions;

  let previousWinner: number | null = null;
  const motwData = new Map<number, MotwData>();

  for (let w = 1; w <= targetWeek; w++) {
    try {
      const matchupsData = await getMatchups(leagueId, w);
      const updatedMatchups = matchupsData.map((matchup: Matchup) => {
        const startersWithPositions = matchup.starters.map(
          (starterId, index) => ({
            id: starterId,
            position: rosterPositions[index] || "Unknown",
            points: matchup.players_points[starterId] || 0,
          })
        );
        return { ...matchup, starters: startersWithPositions };
      });

      let currentMotwId: number;
      if (w === 1) {
        currentMotwId = 1;
      } else {
        const currentWinner = previousWinner;
        const winnerMatchup = updatedMatchups.find(
          (m) => m.roster_id === currentWinner
        );
        if (!winnerMatchup) {
          console.error(`Could not find matchup for winner in week ${w}`);
          continue; // Skip this week instead of stopping
        }
        currentMotwId = winnerMatchup.matchup_id;
      }

      const motwMatchups = updatedMatchups.filter(
        (m) => m.matchup_id === currentMotwId
      );
      if (motwMatchups.length !== 2) {
        console.error(`Invalid MotW matchups for week ${w}`);
        continue; // Skip this week instead of stopping
      }

      const [teamA, teamB] = motwMatchups;
      previousWinner =
        teamA.points > teamB.points ? teamA.roster_id : teamB.roster_id;

      motwData.set(w, {
        matchupId: currentMotwId,
        rosters: [teamA.roster_id, teamB.roster_id],
      });
    } catch (error) {
      console.error(`Error fetching data for week ${w}:`, error);
      continue; // Skip this week on error
    }

    // Add delay to avoid rate limiting
    if (w < targetWeek) {
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }

  // Cache if this is for the current week and data is not empty
  if (targetWeek === currentWeek && motwData.size > 0) {
    motwCache.set(leagueId, { data: motwData, maxWeek: targetWeek });
  }

  return motwData;
};
