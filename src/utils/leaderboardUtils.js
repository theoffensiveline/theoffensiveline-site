import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../firebase";

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
    (hours || 0) * 3600000 +
    (minutes || 0) * 60000 +
    (seconds || 0) * 1000 +
    (milliseconds || 0)
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
    result.milliseconds ? ` ${result.milliseconds}ms` : ""
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
  const q = query(
    collection(db, "leaderboard-results"),
    where("leaderboard_id", "==", leaderboardId)
  );
  const resultsSnap = await getDocs(q);

  const fetchedResults = resultsSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return sortResults(fetchedResults, sortType);
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

export const calculateOverallStandings = async (leaderboards, allResults) => {
  const playerStats = {};

  // Initialize player stats with empty arrays for challenges
  leaderboards.forEach((leaderboard) => {
    const leaderboardResults = allResults.filter(
      (r) => r.leaderboard_id === leaderboard.id
    );

    // Sort results using the existing sortResults function
    const sortedResults = sortResults(leaderboardResults, leaderboard.sort);

    // Calculate placements and handle ties
    let currentPlace = 1;
    let currentScore = null;
    let tiedCount = 0;
    let tiedPlayers = [];

    sortedResults.forEach((result, index) => {
      const score = parseFloat(result.score);

      if (currentScore === null) {
        currentScore = score;
        tiedCount = 1;
        tiedPlayers = [result];
      } else if (score === currentScore) {
        tiedCount++;
        tiedPlayers.push(result);
      } else {
        // Process tied players
        const points = calculatePoints(currentPlace, tiedCount);
        tiedPlayers.forEach((player) => {
          if (!playerStats[player.name]) {
            playerStats[player.name] = {
              totalPoints: 0,
              firstPlace: 0,
              topThree: 0,
              challengesCompleted: 0,
              headToHead: {},
              firstPlaceChallenges: [],
              topThreeChallenges: [],
            };
          }
          playerStats[player.name].totalPoints += points;
          if (currentPlace === 1) {
            playerStats[player.name].firstPlace++;
            playerStats[player.name].firstPlaceChallenges.push(
              leaderboard.name
            );
          }
          if (currentPlace <= 3) {
            playerStats[player.name].topThree++;
            playerStats[player.name].topThreeChallenges.push(leaderboard.name);
          }
          playerStats[player.name].challengesCompleted++;
        });

        // Reset for next group
        currentPlace += tiedCount;
        currentScore = score;
        tiedCount = 1;
        tiedPlayers = [result];
      }

      // Handle last group
      if (index === sortedResults.length - 1) {
        const points = calculatePoints(currentPlace, tiedCount);
        tiedPlayers.forEach((player) => {
          if (!playerStats[player.name]) {
            playerStats[player.name] = {
              totalPoints: 0,
              firstPlace: 0,
              topThree: 0,
              challengesCompleted: 0,
              headToHead: {},
              firstPlaceChallenges: [],
              topThreeChallenges: [],
            };
          }
          playerStats[player.name].totalPoints += points;
          if (currentPlace === 1) {
            playerStats[player.name].firstPlace++;
            playerStats[player.name].firstPlaceChallenges.push(
              leaderboard.name
            );
          }
          if (currentPlace <= 3) {
            playerStats[player.name].topThree++;
            playerStats[player.name].topThreeChallenges.push(leaderboard.name);
          }
          playerStats[player.name].challengesCompleted++;
        });
      }
    });

    // Calculate head-to-head records
    Object.keys(playerStats).forEach((player1) => {
      Object.keys(playerStats).forEach((player2) => {
        if (player1 !== player2) {
          if (!playerStats[player1].headToHead[player2]) {
            playerStats[player1].headToHead[player2] = 0;
          }
          if (!playerStats[player2].headToHead[player1]) {
            playerStats[player2].headToHead[player1] = 0;
          }
        }
      });
    });

    // Compare each player's results in this leaderboard
    sortedResults.forEach((result1, i) => {
      sortedResults.forEach((result2, j) => {
        if (i !== j) {
          const score1 = parseFloat(result1.score);
          const score2 = parseFloat(result2.score);
          if (score1 > score2) {
            playerStats[result1.name].headToHead[result2.name]++;
          }
        }
      });
    });
  });

  // Convert to array and sort
  const standingsArray = Object.entries(playerStats).map(([name, stats]) => ({
    name,
    ...stats,
    headToHeadWins: Object.values(stats.headToHead).reduce((a, b) => a + b, 0),
  }));

  // Sort by total points, then apply tiebreakers
  standingsArray.sort((a, b) => {
    if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
    if (a.headToHeadWins !== b.headToHeadWins)
      return b.headToHeadWins - a.headToHeadWins;
    if (a.firstPlace !== b.firstPlace) return b.firstPlace - a.firstPlace;
    if (a.topThree !== b.topThree) return b.topThree - a.topThree;
    return b.challengesCompleted - a.challengesCompleted;
  });

  return standingsArray;
};
