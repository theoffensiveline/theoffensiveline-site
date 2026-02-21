import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../firebase";
import { leagueIds } from "../components/constants/LeagueConstants";

/**
 * Converts time components to milliseconds for sorting
 * @param {Object} timeObj - Object containing time components
 * @param {number} timeObj.hours - Hours component
 * @param {number} timeObj.minutes - Minutes component
 * @param {number} timeObj.seconds - Seconds component
 * @param {number} timeObj.milliseconds - Milliseconds component
 * @param {boolean} timeObj.dnf - Did Not Finish flag
 * @returns {number} - Total milliseconds
 */
export const timeToMs = ({
  hours = 0,
  minutes = 0,
  seconds = 0,
  milliseconds = 0,
  dnf = false,
}) => {
  if (dnf) return Number.MAX_SAFE_INTEGER; // DNF entries should sort to the bottom for low_time
  return (
    (hours || 0) * 3600000 + (minutes || 0) * 60000 + (seconds || 0) * 1000 + (milliseconds || 0)
  );
};

const sortByDNF = (a, b) => {
  if (a.dnf && !b.dnf) return 1; // DNF sorts to bottom
  if (!a.dnf && b.dnf) return -1; // Non-DNF sorts to top
  if (a.dnf && b.dnf) return 0; // Both DNF, keep original order
  return 0;
};

/**
 * Sorts leaderboard results based on sort type
 * @param {Array} results - Array of leaderboard results
 * @param {string} sortType - Type of sorting to apply
 * @returns {Array} - Sorted results
 */
export const sortResults = (results, sortType) => {
  if (sortType === "low_score") {
    return results.sort((a, b) => {
      const dnfSort = sortByDNF(a, b);
      if (dnfSort !== 0) return dnfSort;
      return (a.score || 0) - (b.score || 0);
    });
  }
  if (sortType === "high_score") {
    return results.sort((a, b) => {
      const dnfSort = sortByDNF(a, b);
      if (dnfSort !== 0) return dnfSort;
      return (b.score || 0) - (a.score || 0);
    });
  }
  if (sortType === "low_time") {
    return results.sort((a, b) => {
      const dnfSort = sortByDNF(a, b);
      if (dnfSort !== 0) return dnfSort;
      return timeToMs(a) - timeToMs(b);
    });
  }
  if (sortType === "high_time") {
    return results.sort((a, b) => {
      const dnfSort = sortByDNF(a, b);
      if (dnfSort !== 0) return dnfSort;
      return timeToMs(b) - timeToMs(a);
    });
  }
  return results;
};

/**
 * Formats a score or time result for display
 * @param {Object} result - Result object
 * @param {string} sortType - Sort type of the leaderboard
 * @returns {string} - Formatted score or time
 */
export const formatResult = (result, sortType) => {
  if (result.dnf) return "DNF";

  if (sortType.includes("score")) {
    return result.score;
  }

  return `${result.hours && result.hours > 0 ? `${result.hours}h ` : ""}${
    result.minutes || 0
  }m ${result.seconds || 0}s${
    result.milliseconds ? ` ${String(result.milliseconds).padStart(3, "0")}ms` : ""
  }`;
};

/**
 * Returns medal emoji based on position
 * @param {number} position - Position in leaderboard (0-indexed)
 * @returns {string} - Medal emoji or position string
 */
export const getMedalEmoji = (position) => {
  switch (position) {
    case 0:
      return "🥇";
    case 1:
      return "🥈";
    case 2:
      return "🥉";
    default:
      return `#${position + 1}`;
  }
};

export const fetchAndSortResults = async (leaderboardId, sortType) => {
  // Special case for fewest submissions leaderboard
  if (leaderboardId === "QSv4tImm8DuHqC5wI5rY") {
    // Get all leaderboards except the fewest submissions one
    const leaderboardsQuery = query(
      collection(db, "leaderboards"),
      where("league_id", "==", leagueIds.mainLeague),
      where("year", "==", "2025")
    );
    const leaderboardsSnapshot = await getDocs(leaderboardsQuery);
    const leaderboards = leaderboardsSnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((l) => l.id !== "QSv4tImm8DuHqC5wI5rY");

    // Get all results for these leaderboards
    const leaderboardIds = leaderboards.map((l) => l.id);
    const resultsQuery = query(
      collection(db, "leaderboard-results"),
      where("leaderboard_id", "in", leaderboardIds)
    );
    const resultsSnapshot = await getDocs(resultsQuery);
    const allResults = resultsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Get all league members
    const leagueId = leaderboards[0]?.league_id;
    if (!leagueId) {
      console.error("No league_id found in leaderboards");
      return [];
    }

    const response = await fetch(`https://api.sleeper.app/v1/league/${leagueId}/users`);
    const leagueMembers = await response.json();

    // Initialize submission counts for all league members
    const submissionCounts = {};
    leagueMembers.forEach((member) => {
      const name = member.display_name || member.username;
      submissionCounts[name] = 0;
    });

    // Count submissions per person
    allResults.forEach((result) => {
      if (submissionCounts[result.name] !== undefined) {
        submissionCounts[result.name]++;
      }
    });

    // Convert to array and sort by submission count (lowest first)
    const sortedResults = Object.entries(submissionCounts)
      .map(([name, count]) => ({
        id: name, // Using name as ID since these are virtual results
        name,
        score: count,
        submission_count: count,
      }))
      .sort((a, b) => a.score - b.score);

    return sortedResults;
  }

  // Regular leaderboard handling
  const q = query(
    collection(db, "leaderboard-results"),
    where("leaderboard_id", "==", leaderboardId)
  );
  const resultsSnap = await getDocs(q);

  const fetchedResults = resultsSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Sort results first
  const sortedResults = sortResults(fetchedResults, sortType);

  // Filter to keep only the best result for each person
  const uniqueResults = [];
  const seenNames = new Set();

  for (const result of sortedResults) {
    if (!seenNames.has(result.name)) {
      uniqueResults.push(result);
      seenNames.add(result.name);
    }
  }

  return uniqueResults;
};

export const getAllSubmissions = (results, sortType) => {
  // Sort all results
  const sortedResults = sortResults(results, sortType);

  // Get unique results to determine which submissions get points
  const uniqueResults = [];
  const seenNames = new Set();
  const bestSubmissionIds = new Set();

  for (const result of sortedResults) {
    if (!seenNames.has(result.name)) {
      uniqueResults.push(result);
      seenNames.add(result.name);
      bestSubmissionIds.add(result.id);
    }
  }

  // Return all results with a flag indicating if it's the best submission
  return sortedResults.map((result) => ({
    ...result,
    isBestSubmission: bestSubmissionIds.has(result.id),
  }));
};

/**
 * Gets the top N distinct results from a sorted array
 * @param {Array} sortedResults - Array of results already sorted by performance
 * @param {number} n - Number of distinct results to return
 * @returns {Array} - Top N distinct results
 */
export const getTopNDistinct = (sortedResults, n = 3) => {
  const distinctResults = [];
  const seenNames = new Set();

  for (const result of sortedResults) {
    if (!seenNames.has(result.name)) {
      distinctResults.push(result);
      seenNames.add(result.name);
      if (distinctResults.length === n) break;
    }
  }

  return distinctResults;
};

export const POINTS_MAP = {
  1: 40,
  2: 30,
  3: 20,
  4: 15,
  5: 10,
  6: 7,
  7: 4,
  8: 2,
  9: 1,
  10: 0,
  11: 0,
  12: 0,
};

export const calculatePoints = (place, tiedCount) => {
  if (place > 12) return 0;

  let totalPoints = 0;
  for (let i = 0; i < tiedCount; i++) {
    totalPoints += POINTS_MAP[place + i] || 0;
  }
  return totalPoints / tiedCount;
};

const initializePlayerStats = (name, submissionCount = 0) => ({
  totalPoints: 0,
  firstPlace: 0,
  topThree: 0,
  challengesCompleted: 0,
  headToHead: {},
  firstPlaceChallenges: [],
  topThreeChallenges: [],
  submissionCount: submissionCount,
});

const processTiedPlayers = (tiedPlayers, currentPlace, leaderboardName, playerStats) => {
  const points = calculatePoints(currentPlace, tiedPlayers.length);
  tiedPlayers.forEach((player) => {
    if (!playerStats[player.name]) {
      playerStats[player.name] = initializePlayerStats(player.name);
    }
    playerStats[player.name].totalPoints += points;
    if (currentPlace === 1) {
      playerStats[player.name].firstPlace++;
      playerStats[player.name].firstPlaceChallenges.push(leaderboardName);
    }
    if (currentPlace <= 3) {
      playerStats[player.name].topThree++;
      playerStats[player.name].topThreeChallenges.push(leaderboardName);
    }
    playerStats[player.name].challengesCompleted++;
  });
};

const handleTiedResults = (sortedResults, leaderboardName, playerStats) => {
  let currentPlace = 1;
  let currentScore = null;
  let tiedPlayers = [];

  sortedResults.forEach((result, index) => {
    const score = parseFloat(result.score);

    if (currentScore === null) {
      currentScore = score;
      tiedPlayers = [result];
    } else if (score === currentScore) {
      tiedPlayers.push(result);
    } else {
      processTiedPlayers(tiedPlayers, currentPlace, leaderboardName, playerStats);
      currentPlace += tiedPlayers.length;
      currentScore = score;
      tiedPlayers = [result];
    }

    if (index === sortedResults.length - 1) {
      processTiedPlayers(tiedPlayers, currentPlace, leaderboardName, playerStats);
    }
  });
};

export const calculateSubmissionCounts = async (leagueId) => {
  // Get all leaderboards except the fewest submissions one
  const leaderboardsQuery = query(
    collection(db, "leaderboards"),
    where("league_id", "==", leagueId),
    where("year", "==", "2025")
  );
  const leaderboardsSnapshot = await getDocs(leaderboardsQuery);
  const leaderboards = leaderboardsSnapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .filter((l) => l.id !== "QSv4tImm8DuHqC5wI5rY");

  // Get all results for these leaderboards
  const leaderboardIds = leaderboards.map((l) => l.id);
  const resultsQuery = query(
    collection(db, "leaderboard-results"),
    where("leaderboard_id", "in", leaderboardIds)
  );
  const resultsSnapshot = await getDocs(resultsQuery);
  const allResults = resultsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Get all league members
  const response = await fetch(`https://api.sleeper.app/v1/league/${leagueId}/users`);
  const leagueMembers = await response.json();

  // Initialize submission counts for all league members
  const submissionCounts = {};
  leagueMembers.forEach((member) => {
    const name = member.display_name || member.username;
    submissionCounts[name] = 0;
  });

  // Count submissions per person
  allResults.forEach((result) => {
    if (submissionCounts[result.name] !== undefined) {
      submissionCounts[result.name]++;
    }
  });

  return submissionCounts;
};

export const calculateOverallStandings = async (leaderboards, allResults) => {
  const playerStats = {};
  // Get the league_id from the first leaderboard
  const LEAGUE_ID = leaderboards[0]?.league_id;

  if (!LEAGUE_ID) {
    console.error("No league_id found in leaderboards");
    return [];
  }

  // Get submission counts for all players
  const submissionCounts = await calculateSubmissionCounts(LEAGUE_ID);

  // Process each leaderboard
  leaderboards.forEach((leaderboard) => {
    const leaderboardResults = allResults.filter((r) => r.leaderboard_id === leaderboard.id);

    // Use getAllSubmissions to get results with best submission flags
    const resultsWithFlags = getAllSubmissions(leaderboardResults, leaderboard.sort);
    // Only use the best submissions for points calculation
    const bestResults = resultsWithFlags.filter((result) => result.isBestSubmission);
    handleTiedResults(bestResults, leaderboard.name, playerStats);
  });

  // Add players who haven't participated in any challenges and set submission counts for all players
  Object.entries(submissionCounts).forEach(([name, count]) => {
    if (!playerStats[name]) {
      playerStats[name] = initializePlayerStats(name, count);
    } else {
      // Set submission count for players who have participated
      playerStats[name].submissionCount = count;
    }
  });

  // Calculate points for fewest submissions leaderboard
  const submissionEntries = Object.entries(submissionCounts)
    .map(([name, count]) => ({
      name,
      score: count,
    }))
    .sort((a, b) => a.score - b.score);

  handleTiedResults(submissionEntries, "Fewest Submissions", playerStats);

  // Convert to array and sort
  const standingsArray = Object.entries(playerStats).map(([name, stats]) => ({
    name,
    ...stats,
    headToHeadWins: Object.values(stats.headToHead).reduce((a, b) => a + b, 0),
  }));

  // Sort by total points, then apply tiebreakers
  standingsArray.sort((a, b) => {
    if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
    if (a.headToHeadWins !== b.headToHeadWins) return b.headToHeadWins - a.headToHeadWins;
    if (a.firstPlace !== b.firstPlace) return b.firstPlace - a.firstPlace;
    if (a.topThree !== b.topThree) return b.topThree - a.topThree;
    if (a.submissionCount !== b.submissionCount) return a.submissionCount - b.submissionCount;
    return b.challengesCompleted - a.challengesCompleted;
  });

  return standingsArray;
};
