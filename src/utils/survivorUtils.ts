import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { getMatchups, getNflState } from "./api/SleeperAPI";

export interface SurvivorPick {
  id: string;
  leagueId: string;
  userId: string;
  username: string;
  week: number;
  teamIdSelected: string; // The roster ID
  ownerName: string; // The name of the team owner
  timestamp: Timestamp;
  status?: "win" | "loss" | "pending";
  teamScore?: number;
  opponentScore?: number;
  opponentTeamId?: string;
  opponentTeamName?: string;
}

export const saveSurvivorPick = async (
  pick: Omit<SurvivorPick, "timestamp" | "id">
): Promise<{ success: boolean; id?: string; error?: any }> => {
  // Import the mapping here to avoid circular dependencies
  const { SleeperTeamIdMapping } = await import("./api/SleeperAPI");

  // Add owner name to the pick
  const pickWithOwner = {
    ...pick,
    ownerName:
      SleeperTeamIdMapping[
        pick.teamIdSelected as keyof typeof SleeperTeamIdMapping
      ] || "Unknown Owner",
  };
  try {
    // First, check if a pick already exists for this user, league, and week
    const existingPicksQuery = query(
      collection(db, "survivorPicks"),
      where("leagueId", "==", pick.leagueId),
      where("userId", "==", pick.userId),
      where("week", "==", pick.week)
    );

    const querySnapshot = await getDocs(existingPicksQuery);

    if (!querySnapshot.empty) {
      // Update existing pick
      const existingPick = querySnapshot.docs[0];
      await setDoc(
        doc(db, "survivorPicks", existingPick.id),
        {
          teamIdSelected: pick.teamIdSelected,
          ownerName: pickWithOwner.ownerName,
          username: pick.username,
          timestamp: Timestamp.now(),
        },
        { merge: true }
      );
      return { success: true, id: existingPick.id };
    } else {
      // Create new pick
      const pickRef = doc(collection(db, "survivorPicks"));
      const newPick: Omit<SurvivorPick, "id"> = {
        ...pickWithOwner,
        timestamp: Timestamp.now(),
      };
      await setDoc(pickRef, newPick);
      return { success: true, id: pickRef.id };
    }
  } catch (error) {
    console.error("Error saving survivor pick:", error);
    return { success: false, error };
  }
};

export const getUserSurvivorPick = async (
  leagueId: string,
  userId: string,
  week: number
): Promise<SurvivorPick | null> => {
  try {
    const q = query(
      collection(db, "survivorPicks"),
      where("leagueId", "==", leagueId),
      where("userId", "==", userId),
      where("week", "==", week)
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() } as SurvivorPick;
    }
    return null;
  } catch (error) {
    console.error("Error getting user survivor pick:", error);
    return null;
  }
};

export const getUserSurvivorPicks = async (
  leagueId: string,
  userId: string
): Promise<SurvivorPick[]> => {
  try {
    const q = query(
      collection(db, "survivorPicks"),
      where("leagueId", "==", leagueId),
      where("userId", "==", userId)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as SurvivorPick)
    );
  } catch (error) {
    console.error("Error getting user survivor picks:", error);
    return [];
  }
};

export const getMatchupResults = async (leagueId: string, week: number) => {
  try {
    const matchups = await getMatchups(leagueId, week);
    const results: Record<
      number,
      {
        winnerId: string | null;
        team1: { rosterId: number; points: number };
        team2: { rosterId: number; points: number };
      }
    > = {};

    // Group matchups by matchup_id
    const groupedMatchups = matchups.reduce((groups, matchup) => {
      if (!groups[matchup.matchup_id]) {
        groups[matchup.matchup_id] = [];
      }
      groups[matchup.matchup_id].push(matchup);
      return groups;
    }, {} as Record<number, typeof matchups>);

    // Determine winner for each matchup
    Object.entries(groupedMatchups).forEach(([matchupId, matchupPair]) => {
      if (matchupPair.length === 2) {
        const [team1, team2] = matchupPair;
        results[parseInt(matchupId)] = {
          winnerId:
            team1.points > team2.points
              ? team1.roster_id.toString()
              : team2.points > team1.points
              ? team2.roster_id.toString()
              : null,
          team1: {
            rosterId: team1.roster_id,
            points: team1.points,
          },
          team2: {
            rosterId: team2.roster_id,
            points: team2.points,
          },
        };
      }
    });

    return results;
  } catch (error) {
    console.error("Error getting matchup results:", error);
    return {};
  }
};

export const getSurvivorStandings = async (
  leagueId: string
): Promise<{
  picks: SurvivorPick[];
  userStatus: Record<string, { lives: number; isEliminated: boolean }>;
}> => {
  try {
    // Get all survivor picks
    const q = query(
      collection(db, "survivorPicks"),
      where("leagueId", "==", leagueId)
    );

    const querySnapshot = await getDocs(q);
    const allPicks = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as SurvivorPick)
    );

    // Get current week to determine which weeks are completed
    const nflState = await getNflState();
    const currentWeek = nflState.week;
    const completedWeeks = Array.from(
      { length: currentWeek - 1 },
      (_, i) => i + 1
    );

    // Get matchup results for completed weeks
    const weeklyResults: Record<
      number,
      Awaited<ReturnType<typeof getMatchupResults>>
    > = {};
    for (const week of completedWeeks) {
      weeklyResults[week] = await getMatchupResults(leagueId, week);
    }

    // Process each user's picks
    const userPicks = new Map<string, SurvivorPick[]>();
    const userStatus: Record<string, { lives: number; isEliminated: boolean }> =
      {};

    // Initialize user status with 2 lives
    allPicks.forEach((pick) => {
      if (!userStatus[pick.userId]) {
        userStatus[pick.userId] = { lives: 2, isEliminated: false };
      }
      if (!userPicks.has(pick.userId)) {
        userPicks.set(pick.userId, []);
      }
      userPicks.get(pick.userId)?.push(pick);
    });

    // Process each user's picks to determine win/loss status
    const processedPicks: SurvivorPick[] = [];

    for (const [userId, picks] of userPicks.entries()) {
      // Sort picks by week
      const sortedPicks = [...picks].sort((a, b) => a.week - b.week);

      for (const pick of sortedPicks) {
        // Skip if user is already eliminated
        if (userStatus[userId].lives <= 0) {
          const lossPick: SurvivorPick = {
            ...pick,
            status: "loss" as const,
            teamScore: 0,
            opponentScore: 0,
          };
          processedPicks.push(lossPick);
          continue;
        }

        // Check if the week is completed
        if (pick.week < currentWeek) {
          const weekResults = weeklyResults[pick.week];
          let isWin = false;
          let teamScore = 0;
          let opponentScore = 0;
          let opponentTeamId = "";

          // Find the matchup where the picked team played
          for (const matchup of Object.values(weekResults)) {
            const team1RosterId = matchup.team1.rosterId.toString();
            const team2RosterId = matchup.team2.rosterId.toString();

            if (team1RosterId === pick.teamIdSelected) {
              // The picked team is team1 in this matchup
              isWin = team1RosterId === matchup.winnerId?.toString();
              teamScore = matchup.team1.points;
              opponentScore = matchup.team2.points;
              opponentTeamId = team2RosterId;
              break;
            } else if (team2RosterId === pick.teamIdSelected) {
              // The picked team is team2 in this matchup
              isWin = team2RosterId === matchup.winnerId?.toString();
              teamScore = matchup.team2.points;
              opponentScore = matchup.team1.points;
              opponentTeamId = team1RosterId;
              break;
            }
          }

          // Update pick status and user lives
          if (!isWin) {
            userStatus[userId].lives--;
            if (userStatus[userId].lives <= 0) {
              userStatus[userId].isEliminated = true;
            }
          }

          const resultPick: SurvivorPick = {
            ...pick,
            status: isWin ? "win" : "loss",
            teamScore,
            opponentScore,
            opponentTeamId,
            opponentTeamName: `Team ${opponentTeamId.slice(0, 6)}`, // Default name if not found
          };
          processedPicks.push(resultPick);
        } else {
          // Future week, status is pending
          const pendingPick: SurvivorPick = {
            ...pick,
            status: "pending",
            teamScore: 0,
            opponentScore: 0,
          };
          processedPicks.push(pendingPick);
        }
      }
    }

    // Sort all picks by user and week
    const sortedPicks = processedPicks.sort((a, b) => {
      // Sort by user first
      if (a.userId !== b.userId) {
        const statusA = userStatus[a.userId];
        const statusB = userStatus[b.userId];

        // Not eliminated comes first
        if (!statusA.isEliminated && statusB.isEliminated) return -1;
        if (statusA.isEliminated && !statusB.isEliminated) return 1;

        // More lives comes first
        if (statusA.lives !== statusB.lives)
          return statusB.lives - statusA.lives;

        // Finally sort by username
        return a.username.localeCompare(b.username);
      }

      // Then sort by week for the same user
      return a.week - b.week;
    });

    return {
      picks: sortedPicks,
      userStatus,
    };
  } catch (error) {
    console.error("Error getting survivor standings:", error);
    return { picks: [], userStatus: {} };
  }
};
