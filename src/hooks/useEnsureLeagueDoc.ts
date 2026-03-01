/**
 * useEnsureLeagueDoc — ensures a Firestore `/leagues/{leagueId}` document
 * exists the first time an authenticated user navigates to a league page.
 *
 * Uses an in-memory set to avoid redundant reads within a session.
 * Only creates the doc if it doesn't already exist (no overwrites).
 * Requires authentication — anonymous visitors do not trigger writes.
 *
 * This sets the foundation for editor role claiming (#53) — once the doc
 * exists, an editor can claim it.
 */
import { useEffect } from "react";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import type { Platform } from "../types/firestore";

/** Track which league IDs we've already verified this session. */
const _verified = new Set<string>();

/**
 * Detect the platform from a league ID.
 * ESPN IDs are prefixed with "espn_". Yahoo IDs would use "yahoo_" if added.
 * Plain numeric IDs default to Sleeper (the original platform).
 */
function detectPlatform(leagueId: string): Platform {
  if (leagueId.startsWith("espn_")) return "espn";
  // Yahoo support not yet implemented — would be "yahoo_" prefixed.
  return "sleeper";
}

/**
 * Extract the raw platform league ID (strips the platform prefix).
 */
function extractPlatformLeagueId(leagueId: string): string {
  if (leagueId.startsWith("espn_")) return leagueId.slice(5);
  return leagueId;
}

/**
 * Hook: call from any page that has a leagueId param.
 * Ensures the Firestore league doc exists (creates a skeleton if not).
 * Only runs for authenticated users.
 *
 * @param leagueId - The league document ID (may be undefined if param missing)
 * @param leagueName - Optional display name to set on creation
 * @param season - Optional season year to set on creation
 */
export function useEnsureLeagueDoc(
  leagueId: string | undefined,
  leagueName?: string,
  season?: number
): void {
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!leagueId || !currentUser || _verified.has(leagueId)) return;

    (async () => {
      try {
        const ref = doc(db, "leagues", leagueId);
        const snap = await getDoc(ref);
        if (!snap.exists()) {
          const platform = detectPlatform(leagueId);
          await setDoc(ref, {
            platform,
            platformLeagueId: extractPlatformLeagueId(leagueId),
            name: leagueName || "",
            season: season || new Date().getFullYear(),
            editorUid: "",
            coEditorUids: [],
            privacy: "public",
            createdAt: Timestamp.now(),
          });
        }
        _verified.add(leagueId);
      } catch (err) {
        // Non-fatal — the page still works without the league doc.
        // Don't add to _verified so it can retry on next navigation.
        console.warn("[useEnsureLeagueDoc] Failed to ensure league doc:", err);
      }
    })();
  }, [leagueId, leagueName, season, currentUser]);
}
