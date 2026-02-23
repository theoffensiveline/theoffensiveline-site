import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  Timestamp,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { getMatchups, getNflState, SleeperTeamIdMapping } from "./api/SleeperAPI";
import { Player } from "../types/sleeperTypes";

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

/**
 * A saved fantasy league reference stored in the user's Firestore profile.
 */
export interface SavedLeague {
  /** Namespaced league ID (e.g. "espn_123456" or "1253779168802377728") */
  id: string;
  /** Platform source */
  type: "sleeper" | "espn" | "yahoo";
  /** Display name of the league */
  name: string;
  /** Season year */
  year: number;
  /** Avatar or logo URL */
  avatar?: string;
}

export interface UserProfile {
  customDisplayName: string;
  email?: string;
  /** User's saved leagues across platforms */
  leagues?: SavedLeague[];
}

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error("Error getting user profile:", error);
    return null;
  }
};

export const setUserProfile = async (userId: string, profile: UserProfile): Promise<boolean> => {
  try {
    const docRef = doc(db, "users", userId);
    await setDoc(docRef, profile);
    return true;
  } catch (error) {
    console.error("Error setting user profile:", error);
    return false;
  }
};

export const updateUserProfile = async (
  userId: string,
  updates: Partial<UserProfile>
): Promise<boolean> => {
  try {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, updates);
    return true;
  } catch (error) {
    console.error("Error updating user profile:", error);
    return false;
  }
};

/**
 * Add a league to the user's saved leagues in Firestore.
 * Deduplicates by league ID — if the league already exists, it's updated.
 *
 * @param userId - Firebase auth user ID
 * @param league - League to save
 * @returns True if successful
 */
export const addLeagueToProfile = async (userId: string, league: SavedLeague): Promise<boolean> => {
  try {
    const profile = await getUserProfile(userId);
    const existing = profile?.leagues ?? [];
    // Remove any existing entry with same ID, then append
    const filtered = existing.filter((l) => l.id !== league.id);
    filtered.push(league);
    return await updateUserProfile(userId, { leagues: filtered });
  } catch (error) {
    console.error("Error adding league to profile:", error);
    return false;
  }
};

/**
 * Remove a league from the user's saved leagues in Firestore.
 *
 * @param userId - Firebase auth user ID
 * @param leagueId - League ID to remove
 * @returns True if successful
 */
export const removeLeagueFromProfile = async (
  userId: string,
  leagueId: string
): Promise<boolean> => {
  try {
    const profile = await getUserProfile(userId);
    const existing = profile?.leagues ?? [];
    const filtered = existing.filter((l) => l.id !== leagueId);
    return await updateUserProfile(userId, { leagues: filtered });
  } catch (error) {
    console.error("Error removing league from profile:", error);
    return false;
  }
};

/**
 * Get the user's saved leagues from Firestore.
 *
 * @param userId - Firebase auth user ID
 * @returns Array of saved leagues (empty if none)
 */
export const getUserLeagues = async (userId: string): Promise<SavedLeague[]> => {
  const profile = await getUserProfile(userId);
  return profile?.leagues ?? [];
};

export const updateAllUserPicksUsername = async (
  userId: string,
  newUsername: string
): Promise<boolean> => {
  try {
    const q = query(collection(db, "survivorPicks"), where("userId", "==", userId));

    const querySnapshot = await getDocs(q);
    const updatePromises = querySnapshot.docs.map((doc) =>
      updateDoc(doc.ref, { username: newUsername })
    );

    await Promise.all(updatePromises);
    return true;
  } catch (error) {
    console.error("Error updating user picks usernames:", error);
    return false;
  }
};

export const createPlayerMap = (
  playerData: Record<string, Player>
): Record<string, string | null> => {
  return Object.entries(playerData).reduce(
    (map, [id, player]) => {
      let playerName: string | null = null;
      if (player.position === "DEF") {
        playerName = player.team; // This assumes player.team is a string or null
      } else {
        playerName = `${player.first_name} ${player.last_name}`;
      }
      if (playerName !== null) {
        map[id] = playerName;
      }
      return map;
    },
    {} as Record<string, string | null>
  );
};

export const getSelectedTeamName = (
  userPick: any,
  teams: Record<number, { team_name: string }>
): string => {
  if (!userPick) return "None";

  // Try to find the team by roster ID (userPick.teamIdSelected is the roster ID)
  const rosterEntry = Object.entries(teams).find(
    ([rosterId]) => rosterId === userPick.teamIdSelected
  );

  return rosterEntry ? rosterEntry[1].team_name : "None";
};

export const isInBlackoutPeriod = (): boolean => {
  // Check if current time is in blackout period: Thursday 8PM ET to Tuesday 8AM ET
  const now = new Date();
  const etString = now.toLocaleString("en-US", {
    timeZone: "America/New_York",
  });
  const etDate = new Date(etString);
  const day = etDate.getDay(); // 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
  const hour = etDate.getHours();

  return (
    (day === 4 && hour >= 20) || // Thursday 8PM+
    day === 5 || // Friday
    day === 6 || // Saturday
    day === 0 || // Sunday
    day === 1 || // Monday
    (day === 2 && hour < 8) // Tuesday before 8AM
  );
};

export const canViewOtherPicks = (): boolean => {
  return isInBlackoutPeriod();
};

export const canMakeSelection = (
  userStatus: { isEliminated: boolean } | null,
  week: number | null,
  currentWeek: number | null
): { canSelect: boolean; reason?: string } => {
  if (!week || !currentWeek) {
    return { canSelect: false, reason: "Invalid week data" };
  }

  // Check if current time is in blackout period: Thursday 8PM ET to Tuesday 8AM ET
  const isBlackoutPeriod = isInBlackoutPeriod();

  if (isBlackoutPeriod) {
    return {
      canSelect: false,
      reason: "Selections are locked during the weekend (Thursday 8 PM ET to Tuesday 8 AM ET)",
    };
  }

  if (userStatus?.isEliminated) {
    return { canSelect: false, reason: "You have been eliminated" };
  }

  if (week < currentWeek) {
    return { canSelect: false, reason: "This week has already passed" };
  }

  return { canSelect: true };
};

export const buildRecord = (details: {
  team_wins: number;
  team_losses: number;
  team_ties: number;
}): string => {
  const { team_wins, team_losses, team_ties } = details;
  return `${team_wins} - ${team_losses}${team_ties > 0 ? ` - ${team_ties}` : ""}`;
};

export const saveSurvivorPick = async (
  pick: Omit<SurvivorPick, "timestamp" | "id">
): Promise<{ success: boolean; id?: string; error?: any }> => {
  // Add owner name to the pick
  const pickWithOwner = {
    ...pick,
    ownerName:
      SleeperTeamIdMapping[pick.teamIdSelected as keyof typeof SleeperTeamIdMapping] ||
      "Unknown Owner",
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
        }) as SurvivorPick
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
    const groupedMatchups = matchups.reduce(
      (groups, matchup) => {
        if (!groups[matchup.matchup_id]) {
          groups[matchup.matchup_id] = [];
        }
        groups[matchup.matchup_id].push(matchup);
        return groups;
      },
      {} as Record<number, typeof matchups>
    );

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
    const q = query(collection(db, "survivorPicks"), where("leagueId", "==", leagueId));

    const querySnapshot = await getDocs(q);
    const allPicks = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as SurvivorPick
    );

    // Get current week to determine which weeks are completed
    const nflState = await getNflState();
    const currentWeek = nflState.week;
    const completedWeeks = Array.from({ length: currentWeek - 1 }, (_, i) => i + 1);

    // Get matchup results for completed weeks
    const weeklyResults: Record<number, Awaited<ReturnType<typeof getMatchupResults>>> = {};
    for (const week of completedWeeks) {
      weeklyResults[week] = await getMatchupResults(leagueId, week);
    }

    // Process each user's picks
    const userPicks = new Map<string, SurvivorPick[]>();
    const userStatus: Record<string, { lives: number; isEliminated: boolean }> = {};

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
        if (statusA.lives !== statusB.lives) return statusB.lives - statusA.lives;

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

interface TeamSelectParams {
  leagueId: string;
  currentUser: any;
  profile: UserProfile | null;
  week: number | null;
  currentWeek: number | null;
  userPick: any;
  allUserPicks: any[];
  allMotwData: Map<number, any>;
  motwMatchupId: number | null;
  teams: Record<number, any>;
}

export const handleTeamSelect = async (
  teamId: number,
  matchupId: number,
  params: TeamSelectParams,
  navigate: (path: string, options?: any) => void,
  refetchUserPick: () => void
): Promise<{ success: boolean; message?: string }> => {
  const {
    leagueId,
    currentUser,
    profile,
    week,
    currentWeek,
    userPick,
    allUserPicks,
    allMotwData,
    motwMatchupId,
    teams,
  } = params;

  if (!currentUser) {
    navigate("/login", { state: { from: "/survivor" } });
    return { success: false };
  }

  const team = teams[teamId];
  if (!team) return { success: false };

  try {
    // Find the roster ID for the selected team first
    const rosterEntry = Object.entries(teams).find(([_, t]) => t.team_id === team.team_id);
    if (!rosterEntry) {
      throw new Error("Could not find roster for selected team");
    }
    const rosterId = rosterEntry[0];

    // Check selection rules
    const isMotw = matchupId === motwMatchupId;
    if (!isMotw) {
      // Check if already picked this team in a previous non-MotW week
      const previousNonMotwPicks =
        allUserPicks?.filter((pick) => {
          if (pick.week >= (week || 0)) return false;
          const pickMotwData = allMotwData.get(pick.week);
          if (!pickMotwData) return true; // assume not motw if no data
          return !pickMotwData.rosters.includes(parseInt(pick.teamIdSelected));
        }) || [];
      const hasPickedBefore = previousNonMotwPicks.some((pick) => pick.teamIdSelected === rosterId);
      if (hasPickedBefore) {
        return {
          success: false,
          message: `You already picked ${team.team_name} in a previous non-MotW week.`,
        };
      }
    }

    const ownerName = Object.keys(SleeperTeamIdMapping).includes(rosterId)
      ? SleeperTeamIdMapping[rosterId as keyof typeof SleeperTeamIdMapping]
      : "Unknown Owner";

    // If this is the already picked team, do nothing
    if (userPick?.teamIdSelected === rosterId) {
      return { success: true };
    }

    // If another team is already picked, allow changing without confirmation
    // (previously had confirm dialog, removed for mobile compatibility)

    const pick = {
      leagueId,
      userId: currentUser.uid,
      ownerName,
      username:
        profile?.customDisplayName ||
        currentUser.displayName ||
        `User-${currentUser.uid.slice(0, 6)}`,
      week: week || currentWeek || 1,
      teamIdSelected: rosterId,
    };

    const result = await saveSurvivorPick(pick);
    if (result.success) {
      // Refetch the user's pick data after saving
      refetchUserPick();
    } else {
      throw new Error("Failed to save pick");
    }
    return { success: true };
  } catch (error) {
    console.error("Error saving pick:", error);
    return {
      success: false,
      message: "Failed to save your pick. Please try again.",
    };
  }
};
