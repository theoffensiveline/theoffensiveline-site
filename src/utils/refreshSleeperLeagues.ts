/**
 * refreshSleeperLeagues — background sync of Sleeper leagues.
 *
 * Called fire-and-forget after the cached profile loads. Fetches the user's
 * current-season leagues from the Sleeper API, diffs against saved leagues,
 * and writes changes to Firestore + updates local state.
 *
 * Only touches Sleeper leagues — ESPN/Yahoo leagues are left untouched.
 */
import { getNflState } from "./api/SleeperAPI";
import {
  getUserProfile,
  updateUserProfile,
  SavedLeague,
} from "./survivorUtils";

/** Cooldown: skip refresh if we already ran within this window (ms). */
const REFRESH_COOLDOWN_MS = 60 * 60 * 1000; // 1 hour
let _lastRefreshMs = 0;

/**
 * Fetch the user's current-season Sleeper leagues and merge them into their
 * saved leagues list. Only writes to Firestore if something changed.
 *
 * @param userId - Firebase Auth UID
 * @param setSavedLeagues - React state setter for the saved leagues array
 */
export async function refreshSleeperLeagues(
  userId: string,
  setSavedLeagues: React.Dispatch<React.SetStateAction<SavedLeague[]>>
): Promise<void> {
  try {
    // Cooldown check — don't hammer the API on rapid re-renders
    if (Date.now() - _lastRefreshMs < REFRESH_COOLDOWN_MS) return;
    _lastRefreshMs = Date.now();

    const profile = await getUserProfile(userId);
    if (!profile?.sleeperUserId) return;

    const nflState = await getNflState();
    const res = await fetch(
      `https://api.sleeper.app/v1/user/${profile.sleeperUserId}/leagues/nfl/${nflState.season}`
    );
    if (!res.ok) return;

    const apiLeagues: any[] = await res.json();
    const season = parseInt(nflState.season, 10);

    // Build the fresh Sleeper league list from the API
    const freshSleeper: SavedLeague[] = apiLeagues.map((lg) => ({
      id: lg.league_id,
      type: "sleeper" as const,
      name: lg.name,
      year: season,
      avatar: lg.avatar
        ? `https://sleepercdn.com/avatars/${lg.avatar}`
        : undefined,
    }));

    // Keep all non-Sleeper leagues untouched
    const existing = profile.leagues ?? [];
    const nonSleeper = existing.filter((l) => l.type !== "sleeper");

    // Detect if anything actually changed (compare IDs + names + avatars)
    const existingSleeper = existing.filter((l) => l.type === "sleeper");
    const serialize = (leagues: SavedLeague[]) =>
      JSON.stringify(
        leagues
          .map((l) => ({ id: l.id, name: l.name, avatar: l.avatar }))
          .sort((a, b) => a.id.localeCompare(b.id))
      );

    if (serialize(existingSleeper) === serialize(freshSleeper)) {
      // No changes — skip the Firestore write
      return;
    }

    const merged = [...nonSleeper, ...freshSleeper];

    // Persist to Firestore
    await updateUserProfile(userId, { leagues: merged });

    // Update local state so the UI re-renders
    setSavedLeagues(merged);
  } catch (err) {
    // Non-fatal — cached leagues still work
    console.warn("[refreshSleeperLeagues] Background refresh failed:", err);
  }
}
