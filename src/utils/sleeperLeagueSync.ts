/**
 * sleeperLeagueSync — converting and merging Sleeper leagues into the user's
 * saved-leagues list.
 *
 * Design rules (learned from the reverted PR #83):
 *   - Merging is ADDITIVE: we update metadata of already-saved leagues and add
 *     newly discovered ones, but never delete. Users may save leagues they
 *     browsed but don't belong to, and past-season leagues must survive a
 *     current-season refresh.
 *   - Leagues the user explicitly removed (tracked in
 *     profile.removedLeagueIds) are never re-added by discovery.
 *   - A missing avatar is OMITTED from the SavedLeague object — Firestore
 *     rejects `undefined` field values, which silently broke league saving
 *     for avatar-less leagues (fresh season renewals).
 */
import { getNflState, getUserLeagues } from "./api/SleeperAPI";
import type { SleeperUserLeague } from "./api/SleeperAPI";
import { updateUserProfile } from "./survivorUtils";
import type { SavedLeague, UserProfile } from "./survivorUtils";

/** Convert a Sleeper API league to our SavedLeague shape. */
export function toSavedLeague(league: SleeperUserLeague): SavedLeague {
  const saved: SavedLeague = {
    id: league.league_id,
    type: "sleeper",
    name: league.name,
    year: parseInt(league.season, 10),
  };
  // Only set avatar when present — `avatar: undefined` makes Firestore throw.
  if (league.avatar) {
    saved.avatar = `https://sleepercdn.com/avatars/${league.avatar}`;
  }
  return saved;
}

/**
 * Additively merge freshly discovered Sleeper leagues into the saved list.
 * Existing entries get their metadata updated; new ones are appended unless
 * the user previously removed them. Nothing is ever deleted.
 */
export function mergeSleeperLeagues(
  existing: SavedLeague[],
  fresh: SavedLeague[],
  removedLeagueIds: string[] = []
): { merged: SavedLeague[]; changed: boolean } {
  const freshById = new Map(fresh.map((l) => [l.id, l]));
  let changed = false;

  const merged = existing.map((league) => {
    const update = league.type === "sleeper" ? freshById.get(league.id) : undefined;
    if (!update) return league;
    freshById.delete(league.id);
    const next = { ...league, ...update };
    if (JSON.stringify(next) !== JSON.stringify(league)) {
      changed = true;
      return next;
    }
    return league;
  });

  for (const [id, league] of freshById) {
    if (removedLeagueIds.includes(id)) continue;
    merged.push(league);
    changed = true;
  }

  return { merged, changed };
}

/**
 * Discover the user's Sleeper leagues for the current + previous season.
 * Two seasons because Sleeper flips to the new season in spring — during the
 * off-season most of a user's leagues only exist under the previous year.
 */
export async function discoverSleeperLeagues(sleeperUserId: string): Promise<SavedLeague[]> {
  const nflState = await getNflState();
  const season = parseInt(nflState.season, 10);
  const [current, previous] = await Promise.all([
    getUserLeagues(sleeperUserId, season),
    getUserLeagues(sleeperUserId, season - 1),
  ]);
  return [...current, ...previous].map(toSavedLeague);
}

/** Cooldown so the background refresh doesn't refetch on every page load. */
const REFRESH_STORAGE_KEY = "sleeperLeaguesRefreshedAt";
const REFRESH_COOLDOWN_MS = 60 * 60 * 1000; // 1 hour

/**
 * Background refresh of the user's Sleeper leagues, called fire-and-forget
 * after the profile loads. Returns the merged list when something changed
 * (so the caller can update local state), or null when there's nothing to do.
 */
export async function refreshSleeperLeagues(
  userId: string,
  profile: UserProfile | null
): Promise<SavedLeague[] | null> {
  if (!profile?.sleeperUserId) return null;

  const last = parseInt(localStorage.getItem(REFRESH_STORAGE_KEY) ?? "0", 10);
  if (Date.now() - last < REFRESH_COOLDOWN_MS) return null;

  try {
    const fresh = await discoverSleeperLeagues(profile.sleeperUserId);
    // Only arm the cooldown after a successful fetch so transient failures retry.
    localStorage.setItem(REFRESH_STORAGE_KEY, String(Date.now()));

    const { merged, changed } = mergeSleeperLeagues(
      profile.leagues ?? [],
      fresh,
      profile.removedLeagueIds ?? []
    );
    if (!changed) return null;

    const ok = await updateUserProfile(userId, { leagues: merged });
    return ok ? merged : null;
  } catch (error) {
    console.warn("Sleeper league refresh failed (non-fatal):", error);
    return null;
  }
}
