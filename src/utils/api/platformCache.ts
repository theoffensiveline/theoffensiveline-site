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
import type { DocumentSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

export const CACHE_COLLECTION = "apiCache";

/**
 * Bound cache reads so a dead Firestore connection can't stall page loads.
 * Some ad/privacy blockers block firestore.googleapis.com even on sites with
 * no ads, and an offline network leaves getDoc retrying for a long time —
 * callers fall through to the live API on timeout.
 */
const READ_TIMEOUT_MS = 2000;
const TIMEOUT_ERROR = new Error("Firestore cache read timed out");

/**
 * Tripped when a read times out. A timeout almost always means the Firestore
 * connection itself is dead for the session (e.g. firestore.googleapis.com
 * is blocked), so subsequent reads return null immediately rather than each
 * paying the full timeout again.
 */
let _firestoreUnreachable = false;

/**
 * In-flight getDoc deduplication — parallel compute utilities often read the
 * same cache keys at once; share one Firestore request across all callers.
 */
const _inflightReads = new Map<string, Promise<DocumentSnapshot>>();

function withTimeout<T>(promise: Promise<T>): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(TIMEOUT_ERROR), READ_TIMEOUT_MS);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

function dedupedGetDoc(key: string): Promise<DocumentSnapshot> {
  const inflight = _inflightReads.get(key);
  if (inflight) return inflight;
  const promise = withTimeout(getDoc(doc(db, CACHE_COLLECTION, key))).finally(() => {
    _inflightReads.delete(key);
  });
  _inflightReads.set(key, promise);
  return promise;
}

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
  if (_firestoreUnreachable) return null;
  try {
    const snap = await dedupedGetDoc(key);
    if (!snap.exists()) return null;
    return snap.data().data as T;
  } catch (e) {
    if (e === TIMEOUT_ERROR) _firestoreUnreachable = true;
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
  if (_firestoreUnreachable) return null;
  try {
    const snap = await dedupedGetDoc(key);
    if (!snap.exists()) return null;
    const { data, cachedAt } = snap.data() as { data: T; cachedAt: number };
    if (Date.now() - cachedAt > ttlMs) return null;
    return data;
  } catch (e) {
    if (e === TIMEOUT_ERROR) _firestoreUnreachable = true;
    console.warn("[platformCache] read failed:", e);
    return null;
  }
}

/**
 * Write a value to the Firestore cache. Fire-and-forget by design — callers
 * must NOT await this; the write is a performance optimization and must never
 * delay returning data to the caller. Errors are logged but never thrown.
 */
export function writeCache<T>(key: string, data: T): void {
  try {
    setDoc(doc(db, CACHE_COLLECTION, key), {
      data,
      cachedAt: Date.now(),
    }).catch((e) => console.warn(`[platformCache] write failed for ${key}:`, e));
  } catch (e) {
    console.warn(`[platformCache] write failed for ${key}:`, e);
  }
}
