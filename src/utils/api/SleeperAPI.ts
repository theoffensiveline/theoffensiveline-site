// SleeperAPI.ts
import type {
  League,
  User,
  Roster,
  Matchup,
  Transactions,
  BracketMatchup,
} from "../../types/sleeperTypes";
import { cacheKey, readCache, readCacheWithTtl, writeCache } from "./platformCache";

const BASE_URL = "https://api.sleeper.app/v1";

// ---------------------------------------------------------------------------
// In-flight request deduplication cache
//
// When multiple compute functions call the same endpoint simultaneously
// (e.g. getUsers called 10× in parallel at page load), only one HTTP request
// fires. All callers share the same Promise. The cache entry is removed once
// the request settles so subsequent calls trigger a fresh fetch.
// ---------------------------------------------------------------------------
const _inflight = new Map<string, Promise<unknown>>();

function dedupedFetch<T>(url: string, errorMessage: string): Promise<T> {
  const cached = _inflight.get(url);
  if (cached) return cached as Promise<T>;

  const promise: Promise<T> = fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(errorMessage);
      return res.json() as Promise<T>;
    })
    .finally(() => {
      _inflight.delete(url);
    });

  _inflight.set(url, promise);
  return promise;
}

// ---------------------------------------------------------------------------
// Firestore-backed persistent cache (see platformCache.ts for the storage
// helpers — shared across all platform adapters).
//
// Sleeper-specific cache strategy:
//   getMatchups / getTransactions  — completed weeks/legs: permanent cache
//                                     current week/leg:    bypass cache
//   getLeague / getUsers / getRosters / getBracketMatchups — 1-hour TTL
//
// The current NFL week is determined via /state/nfl, cached in-memory for
// 5 minutes so batched getMatchups calls only trigger one state request.
// ---------------------------------------------------------------------------
const STABLE_TTL_MS = 60 * 60 * 1000; // 1 hour — league/users/rosters/bracket
const NFL_STATE_MEM_TTL_MS = 5 * 60 * 1000; // 5 minutes — in-memory only

/** In-memory cache of the current NFL week (avoids repeated /state/nfl calls). */
let _nflWeekCache: { week: number; fetchedAt: number } | null = null;

/**
 * Determine the current NFL week. Uses an in-memory cache (5-min TTL) so that
 * batched getMatchups calls only trigger one /state/nfl request.
 * Returns null if the fetch fails — callers fall back to the Firestore cache.
 */
async function getCurrentNflWeek(): Promise<number | null> {
  if (_nflWeekCache && Date.now() - _nflWeekCache.fetchedAt < NFL_STATE_MEM_TTL_MS) {
    return _nflWeekCache.week;
  }
  try {
    const res = await fetch(`${BASE_URL}/state/nfl`);
    if (!res.ok) return null;
    const data = await res.json();
    _nflWeekCache = { week: data.week, fetchedAt: Date.now() };
    return data.week;
  } catch {
    return null;
  }
}

/**
 * Look up a Sleeper user by username.
 * Returns the user object if found, or null if the username doesn't exist.
 */
export const getSleeperUserByUsername = async (
  username: string
): Promise<{ user_id: string; username: string; display_name?: string } | null> => {
  try {
    const response = await fetch(`${BASE_URL}/user/${username}`);
    if (!response.ok) return null;
    const data = await response.json();
    return data?.user_id ? data : null;
  } catch {
    return null;
  }
};

/**
 * Subset of the Sleeper league shape returned by the user-leagues endpoint
 * that league-saving features care about.
 */
export interface SleeperUserLeague {
  league_id: string;
  name: string;
  season: string;
  avatar: string | null;
  /** League ID of this league's previous season ("0"/null for the first). */
  previous_league_id?: string | null;
}

/**
 * Fetch all leagues a Sleeper user belongs to for a given season.
 * Returns [] on any failure — callers treat league discovery as best-effort.
 */
export const getUserLeagues = async (
  userId: string,
  season: string | number
): Promise<SleeperUserLeague[]> => {
  try {
    const data = await dedupedFetch<SleeperUserLeague[]>(
      `${BASE_URL}/user/${userId}/leagues/nfl/${season}`,
      "Failed to fetch user leagues"
    );
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching user leagues:", error);
    return [];
  }
};

// Function to get league
export const getLeague = async (leagueId: string): Promise<League> => {
  const key = cacheKey(leagueId, "league");
  const cached = await readCacheWithTtl<League>(key, STABLE_TTL_MS);
  if (cached) return cached;

  try {
    const data = await dedupedFetch<League>(
      `${BASE_URL}/league/${leagueId}`,
      "Failed to fetch league"
    );
    await writeCache(key, data);
    return data;
  } catch (error) {
    console.error("Error fetching league:", error);
    throw error;
  }
};

// Function to get all users in a league
export const getUsers = async (leagueId: string): Promise<User[]> => {
  const key = cacheKey(leagueId, "users");
  const cached = await readCacheWithTtl<User[]>(key, STABLE_TTL_MS);
  if (cached) return cached;

  try {
    const data = await dedupedFetch<User[]>(
      `${BASE_URL}/league/${leagueId}/users`,
      "Failed to fetch users"
    );
    await writeCache(key, data);
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Function to get rosters for a specific league
export const getRosters = async (leagueId: string): Promise<Roster[]> => {
  const key = cacheKey(leagueId, "rosters");
  const cached = await readCacheWithTtl<Roster[]>(key, STABLE_TTL_MS);
  if (cached) return cached;

  try {
    const data = await dedupedFetch<Roster[]>(
      `${BASE_URL}/league/${leagueId}/rosters`,
      "Failed to fetch rosters"
    );
    await writeCache(key, data);
    return data;
  } catch (error) {
    console.error("Error fetching rosters:", error);
    throw error;
  }
};

// Function to get matchups for a specific league and week
// Completed weeks (week < current NFL week) are cached permanently in Firestore.
// The current week bypasses the cache to ensure live scoring is fresh.
export const getMatchups = async (leagueId: string, week: number): Promise<Matchup[]> => {
  const currentWeek = await getCurrentNflWeek();
  const isCompleted = currentWeek !== null && week < currentWeek;

  if (isCompleted) {
    const key = cacheKey(leagueId, "matchups", week);
    const cached = await readCache<Matchup[]>(key);
    if (cached) return cached;
  }

  try {
    const data = await dedupedFetch<Matchup[]>(
      `${BASE_URL}/league/${leagueId}/matchups/${week}`,
      "Failed to fetch matchups"
    );
    // Only persist completed-week data (current week changes with live scoring)
    if (isCompleted) {
      await writeCache(cacheKey(leagueId, "matchups", week), data);
    }
    return data;
  } catch (error) {
    // If Sleeper is rate-limiting, try the cache as a last resort even for
    // the current week — stale data is better than a blank page.
    const key = cacheKey(leagueId, "matchups", week);
    const fallback = await readCache<Matchup[]>(key);
    if (fallback) return fallback;

    console.error("Error fetching matchups:", error);
    throw error;
  }
};

// Function to get the NFL state
export const getNflState = async (): Promise<{
  week: number;
  season: string;
  season_type: string;
  season_start_date: string;
  previous_season: string;
  leg: number;
  league_season: string;
  league_create_season: string;
  display_week: number;
}> => {
  try {
    const response = await fetch(`${BASE_URL}/state/nfl`);
    if (!response.ok) {
      throw new Error("Failed to fetch slate");
    }
    const data = await response.json();
    // Populate the in-memory cache so getCurrentNflWeek benefits from this fetch
    _nflWeekCache = { week: data.week, fetchedAt: Date.now() };
    return data;
  } catch (error) {
    console.error("Error fetching slate:", error);
    throw error;
  }
};

// Function to get projections for a list of players
export const getPlayerProjections = async (
  week: number,
  season: number,
  playerIds: string[]
): Promise<Array<{ pts: number; playerId: string }>> => {
  try {
    const projections = await Promise.all(
      playerIds.map(async (playerId) => {
        const response = await fetch(
          `https://api.sleeper.com/projections/nfl/${playerId}?season_type=regular&season=${season}&week=${week}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch player projections");
        }
        const data = await response.json();
        return { pts: data.stats.pts_ppr, playerId };
      })
    );
    return projections;
  } catch (error) {
    console.error("Error fetching player projections:", error);
    throw error;
  }
};

export const getTransactions = async (leagueId: string, leg: number): Promise<Transactions[]> => {
  const currentWeek = await getCurrentNflWeek();
  const isCompleted = currentWeek !== null && leg < currentWeek;

  if (isCompleted) {
    const key = cacheKey(leagueId, "transactions", leg);
    const cached = await readCache<Transactions[]>(key);
    if (cached) return cached;
  }

  try {
    const response = await fetch(`${BASE_URL}/league/${leagueId}/transactions/${leg}`);
    if (!response.ok) {
      throw new Error("Failed to fetch transactions");
    }
    const data = await response.json();
    if (isCompleted) {
      await writeCache(cacheKey(leagueId, "transactions", leg), data);
    }
    return data;
  } catch (error) {
    const key = cacheKey(leagueId, "transactions", leg);
    const fallback = await readCache<Transactions[]>(key);
    if (fallback) return fallback;

    console.error("Error fetching transactions:", error);
    throw error;
  }
};

export const getBracketMatchups = async (
  leagueId: string,
  winnersBracket: boolean
): Promise<BracketMatchup[]> => {
  const endpoint = winnersBracket ? "winners_bracket" : "losers_bracket";
  const key = cacheKey(leagueId, endpoint);
  const cached = await readCacheWithTtl<BracketMatchup[]>(key, STABLE_TTL_MS);
  if (cached) return cached;

  try {
    const response = await fetch(`${BASE_URL}/league/${leagueId}/${endpoint}`);
    if (!response.ok) {
      throw new Error("Failed to fetch bracket matchups");
    }
    const data = await response.json();
    await writeCache(key, data);
    return data;
  } catch (error) {
    console.error("Error fetching bracket matchups:", error);
    throw error;
  }
};

export const SleeperTeamIdMapping = {
  "1": "Smitty",
  "2": "Trevor",
  "3": "Alec",
  "4": "Josh K",
  "5": "Jake",
  "6": "Nikhil",
  "7": "Greg",
  "8": "Anthony",
  "9": "Devan",
  "10": "Josh L",
  "11": "Kyle",
  "12": "Matt Rob",
};
