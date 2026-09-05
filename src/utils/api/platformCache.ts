/**
 * platformCache.ts — Firestore-backed persistent cache for fantasy platform
 * API responses.
 *
 * Sleeper rate-limits aggressive multi-week fetching, and ESPN/Yahoo have
 * their own latency and auth overhead. Completed-week data is immutable, so
 * we persist raw API responses in Firestore and serve from there on
 * subsequent requests — across sessions, users, and devices.
 *
 * This module is platform-agnostic: it only knows how to read and write
 * cached blobs keyed by a deterministic string. Each adapter (SleeperAPI,
 * ESPNAdapter, YahooAdapter) decides its own caching strategy (which
 * endpoints to cache, TTL vs permanent, completed-week detection) and calls
 * these helpers.
 *
 * Cache doc shape:  { data: <raw API response>, cachedAt: number }
 * Doc IDs are built via `cacheKey()` — league IDs are platform-prefixed
 * (e.g. "espn_123456"), so there are no cross-platform collisions.
 */
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const CACHE_COLLECTION = "apiCache";

/**
 * Build a deterministic Firestore doc ID for a cached endpoint.
 * @param leagueId - Platform-prefixed league ID (e.g. "123456" or "espn_123")
 * @param endpoint - Endpoint name (e.g. "league", "users", "matchups")
 * @param week - Optional week/leg number for week-scoped endpoints
 */
export function cacheKey(leagueId: string, endpoint: string, week?: number): string {
  return week !== undefined ? `${leagueId}:${endpoint}:${week}` : `${leagueId}:${endpoint}`;
}

/**
 * Read a cached value from Firestore. Returns null on miss or error.
 * Use this for permanently-cached entries (e.g. completed-week matchups).
 */
export async function readCache<T>(key: string): Promise<T | null> {
  try {
    const snap = await getDoc(doc(db, CACHE_COLLECTION, key));
    if (!snap.exists()) return null;
    return snap.data().data as T;
  } catch (e) {
    console.warn("[platformCache] read failed:", e);
    return null;
  }
}

/**
 * Read a cached value only if it's within the TTL. Returns null if stale
 * or missing. Use this for endpoints that can change mid-season (league
 * settings, rosters, users, bracket).
 */
export async function readCacheWithTtl<T>(key: string, ttlMs: number): Promise<T | null> {
  try {
    const snap = await getDoc(doc(db, CACHE_COLLECTION, key));
    if (!snap.exists()) return null;
    const { data, cachedAt } = snap.data() as { data: T; cachedAt: number };
    if (Date.now() - cachedAt > ttlMs) return null;
    return data;
  } catch (e) {
    console.warn("[platformCache] read failed:", e);
    return null;
  }
}

/**
 * Write a value to the Firestore cache. Errors are logged but not thrown —
 * the cache is a performance optimization, not a correctness requirement.
 */
export async function writeCache<T>(key: string, data: T): Promise<void> {
  try {
    await setDoc(doc(db, CACHE_COLLECTION, key), {
      data,
      cachedAt: Date.now(),
    });
  } catch (e) {
    console.warn("[platformCache] write failed:", e);
  }
}
