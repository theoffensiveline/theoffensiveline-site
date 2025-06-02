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
