/**
 * useEnsureLeagueDoc — ensures a Firestore `/leagues/{leagueId}` document
 * exists the first time a user navigates to a league page.
 *
 * Uses an in-memory set to avoid redundant reads within a session.
 * Only creates the doc if it doesn't already exist (no overwrites).
 *
 * This sets the foundation for editor role claiming (#53) — once the doc
 * exists, an editor can claim it.
 */
import { useEffect, useRef } from "react";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import type { Platform } from "../types/firestore";

/** Track which league IDs we've already verified this session. */
const _verified = new Set<string>();

/**
 * Detect the platform from a league ID.
 * ESPN IDs are prefixed with "espn_", everything else is Sleeper.
 */
function detectPlatform(leagueId: string): Platform {
  return leagueId.startsWith("espn_") ? "espn" : "sleeper";
}

/**
 * Extract the raw platform league ID (strips the "espn_" prefix for ESPN).
 */
function extractPlatformLeagueId(leagueId: string): string {
  return leagueId.startsWith("espn_") ? leagueId.slice(5) : leagueId;
}

/**
 * Hook: call from any page that has a leagueId param.
 * Ensures the Firestore league doc exists (creates a skeleton if not).
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
  const attempted = useRef(false);

  useEffect(() => {
    if (!leagueId || _verified.has(leagueId) || attempted.current) return;
    attempted.current = true;

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
        // Non-fatal — the page still works without the league doc
        console.warn("[useEnsureLeagueDoc] Failed to ensure league doc:", err);
      }
    })();
  }, [leagueId, leagueName, season]);
}
