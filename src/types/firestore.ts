/**
 * Firestore document type definitions for multi-league support.
 * Platform-neutral — works for both Sleeper and ESPN leagues.
 *
 * Collections:
 *   /users/{uid}
 *   /leagues/{leagueId}
 *   /leagues/{leagueId}/newsletters/{weekNumber}
 *   /leagues/{leagueId}/weekData/{weekNumber}
 *
 * leagueId format: plain numeric for Sleeper, "espn_XXXXX" for ESPN.
 * platformLeagueId = raw ID as used by the platform's own API.
 *
 * NOTE: ESPN credentials (espn_s2 / SWID) are NEVER stored in Firestore.
 *       They belong in localStorage only.
 *
 * NOTE: /leagues/{leagueId}/newsletters/{weekNumber}/submissions/ is Phase 3.
 */

import { Timestamp } from "firebase/firestore";

/** Supported fantasy platforms. */
export type Platform = "sleeper" | "espn";

/** Privacy setting for a league. Defaults to 'public' for Phase 1. */
export type Privacy = "public" | "private";

/** Newsletter publication status. */
export type NewsletterStatus = "draft" | "published";

/**
 * /users/{uid}
 *
 * Represents an authenticated user. One document per Firebase Auth UID.
 * Sleeper fields are set after Sleeper account linking.
 * ESPN league IDs are manually saved by the user.
 */
export interface UserDoc {
  /** User's email address from Firebase Auth. */
  email: string;
  /** Display name chosen by the user. */
  displayName: string;
  /** Timestamp when the user document was created. */
  createdAt: Timestamp;
  /** Sleeper user ID, set after account linking. */
  sleeperUserId?: string;
  /** Sleeper username, set after account linking. */
  sleeperUsername?: string;
  /** List of ESPN league IDs the user has manually saved. */
  espnLeagueIds?: string[];
}

/**
 * /leagues/{leagueId}
 *
 * Represents a fantasy league. The document ID encodes the platform:
 * plain numeric for Sleeper, "espn_XXXXX" for ESPN.
 */
export interface LeagueDoc {
  /** Which fantasy platform this league belongs to. */
  platform: Platform;
  /** Raw league ID as used by the platform's own API. */
  platformLeagueId: string;
  /** Human-readable league name. */
  name: string;
  /** NFL season year (e.g. 2025). */
  season: number;
  /** Firebase UID of the primary editor. */
  editorUid: string;
  /** Firebase UIDs of co-editors who can also edit newsletters. */
  coEditorUids: string[];
  /** Privacy setting. Defaults to 'public' for Phase 1. */
  privacy: Privacy;
  /** Timestamp when the league document was created. */
  createdAt: Timestamp;
}

/**
 * /leagues/{leagueId}/newsletters/{weekNumber}
 *
 * Represents a single week's newsletter for a league.
 * weekNumber is stored as a string document ID (e.g. "1", "2").
 */
export interface NewsletterDoc {
  /** Whether this newsletter is a draft or has been published. */
  status: NewsletterStatus;
  /** Timestamp when the newsletter was published. Null if still draft. */
  publishedAt: Timestamp | null;
  /** Ordered list of section identifiers included in this newsletter. */
  sections: string[];
  /** Free-form notes from the editor. */
  editorNotes: string;
}

/**
 * /leagues/{leagueId}/weekData/{weekNumber}
 *
 * Auto-generated JSON cache of weekly stats for a league.
 * weekNumber is stored as a string document ID (e.g. "1", "2").
 */
export interface WeekDataDoc {
  /** Matchup results for the week. */
  matchups: Record<string, unknown>;
  /** Current standings after this week. */
  standings: Record<string, unknown>;
  /** Awards computed for this week. */
  awards: Record<string, unknown>;
  /** Leaderboard data for this week. */
  leaderboard: Record<string, unknown>;
}
