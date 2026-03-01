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
import { updateUserProfile, SavedLeague } from "./survivorUtils";

/** Cooldown: skip refresh if we already ran within this window (ms). */
const REFRESH_COOLDOWN_MS = 60 * 60 * 1000; // 1 hour
let _lastRefreshMs = 0;

/**
 * Sleeper league shape from the API (subset of fields we care about).
 */
interface SleeperLeagueResponse {
  league_id: string;
  name: string;
  avatar: string | null;
}

/**
 * Fetch the user's current-season Sleeper leagues and merge them into their
 * saved leagues list. Only writes to Firestore if something changed.
 *
 * Accepts the already-loaded profile data to avoid a redundant Firestore read.
 *
 * @param userId - Firebase Auth UID
 * @param sleeperUserId - The linked Sleeper user ID (skip if not linked)
 * @param currentLeagues - The user's currently saved leagues from profile
 * @param setSavedLeagues - React state setter for the saved leagues array
 */
export async function refreshSleeperLeagues(
  userId: string,
  sleeperUserId: string | undefined,
  currentLeagues: SavedLeague[],
  setSavedLeagues: React.Dispatch<React.SetStateAction<SavedLeague[]>>
): Promise<void> {
  try {
    // Skip if no Sleeper account linked
    if (!sleeperUserId) return;

    // Cooldown check — don't hammer the API on rapid re-renders
    if (Date.now() - _lastRefreshMs < REFRESH_COOLDOWN_MS) return;
    _lastRefreshMs = Date.now();

    const nflState = await getNflState();
    const res = await fetch(
      `https://api.sleeper.app/v1/user/${sleeperUserId}/leagues/nfl/${nflState.season}`
    );
    if (!res.ok) return;

    const apiLeagues: SleeperLeagueResponse[] = await res.json();
    const season = parseInt(nflState.season, 10);

    // Build the fresh Sleeper league list from the API
    const freshSleeper: SavedLeague[] = apiLeagues.map((lg) => ({
      id: lg.league_id,
      type: "sleeper" as const,
      name: lg.name,
      year: season,
      avatar: lg.avatar ? `https://sleepercdn.com/avatars/${lg.avatar}` : undefined,
    }));

    // Keep all non-Sleeper leagues untouched
    const nonSleeper = currentLeagues.filter((l) => l.type !== "sleeper");

    // Detect if anything actually changed (compare IDs, names, avatars, year)
    const existingSleeper = currentLeagues.filter((l) => l.type === "sleeper");
    const serialize = (leagues: SavedLeague[]) =>
      JSON.stringify(
        leagues
          .map((l) => ({ id: l.id, name: l.name, avatar: l.avatar, year: l.year }))
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
    // Reset cooldown so we can retry on next auth cycle
    _lastRefreshMs = 0;
    // Non-fatal — cached leagues still work
    console.warn("[refreshSleeperLeagues] Background refresh failed:", err);
  }
}
