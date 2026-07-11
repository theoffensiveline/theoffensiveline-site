/**
 * Firestore document type definitions for multi-league support.
 * Platform-neutral — works for both Sleeper and ESPN leagues.
 *
 * Collections:
 *   /users/{uid}
 *   /leagues/{leagueId}
 *   /newsletters/{newsletterId}                       (issue #103)
 *   /newsletters/{newsletterId}/issues/{season}_w{week}
 *   /leagues/{leagueId}/weekData/{weekNumber}          (fate decided in #84)
 *
 * leagueId format: plain numeric for Sleeper, "espn_XXXXX" for ESPN,
 * "yahoo_XXXXX" for Yahoo.
 * platformLeagueId = raw ID as used by the platform's own API.
 *
 * NOTE: ESPN credentials (espn_s2 / SWID) are NEVER stored in Firestore.
 *       They belong in localStorage only.
 *
 * NOTE: /newsletters/{id}/issues/{issueId}/submissions/ is Phase 3.
 */

import { Timestamp } from "firebase/firestore";

/** Supported fantasy platforms. */
export type Platform = "sleeper" | "espn" | "yahoo";

/** Privacy setting for a league or newsletter. Defaults to 'public'. */
export type Privacy = "public" | "league_only";

/** Issue publication status. */
export type NewsletterStatus = "draft" | "published";

/**
 * Per-league feature flags (issue #94). Leagues get the base experience by
 * default; flags enable extra nav items and pages. Graduating a feature to
 * all leagues = adding it to the default set at creation time.
 */
export type LeagueFeature =
  | "survivor"
  | "leaderboards"
  | "hotdogs"
  | "bylaws"
  | "submit"
  | "custom-newsletters"
  // Auto weekly recaps are on by default; "custom-newsletters" replaces them
  // with the hand-written archive unless "weekly-recaps" is also set.
  | "weekly-recaps";

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
  /** Firebase UID of the primary editor. Null until a member claims the role. */
  editorUid: string | null;
  /** Firebase UIDs of co-editors who can also edit newsletters. */
  coEditorUids: string[];
  /** Privacy setting. Defaults to 'public' for Phase 1. */
  privacy: Privacy;
  /** Extra features enabled for this league. Empty = base experience only. */
  features: LeagueFeature[];
  /** Timestamp when the league document was created. */
  createdAt: Timestamp;
}

/**
 * One league-season entry inside a newsletter (see NewsletterDoc).
 */
export interface NewsletterSeason {
  /** Prefixed league doc ID (plain numeric Sleeper, "espn_X", "yahoo_X"). */
  leagueId: string;
  /** NFL season year this league covers (e.g. 2025). */
  season: number;
  /**
   * Whether the editor passed a membership check for this league when it was
   * added. Unverified seasons are display-only: they never grant privacy
   * membership (#103 decision 4).
   */
  verified: boolean;
}

/**
 * /newsletters/{newsletterId}
 *
 * The top-level publication entity (issue #103). An editor creates a
 * newsletter for a league; it contains one or more league-seasons, possibly
 * across platforms. Multiple newsletters per league are allowed by design
 * (#103 decision 2 — exclusive claims would let squatters lock out real
 * leagues, since platform identity is unverifiable).
 */
export interface NewsletterDoc {
  /** Editor-chosen publication name. No uniqueness guarantee. */
  name: string;
  /** Firebase UID of the creator/editor. Creation is claiming — never null. */
  editorUid: string;
  /** Firebase UIDs of co-editors. Must be empty at creation (rules-enforced). */
  coEditorUids: string[];
  /** Privacy setting. Gating lands in #103 sub-issue D. */
  privacy: Privacy;
  /** Feature flags for this publication's extra pages. */
  features: LeagueFeature[];
  /** Ordered league-seasons this publication covers. */
  seasons: NewsletterSeason[];
  /** League ID of the current season — explicit, never derived from order. */
  activeLeagueId: string;
  /**
   * Flattened seasons[].leagueId, kept in sync by the CRUD layer for
   * array-contains discovery queries. Never write directly.
   */
  leagueIds: string[];
  /** Timestamp when the newsletter was created. */
  createdAt: Timestamp;
}

/**
 * /newsletters/{newsletterId}/issues/{season}_w{week}
 *
 * A weekly edition of a newsletter. Doc IDs zero-pad the week ("2025_w02")
 * so lexical order matches chronological order. Placeholder shape — the
 * full builder schema lands with #84. Replaces the never-used
 * /leagues/{id}/newsletters subcollection.
 */
export interface IssueDoc {
  /** Whether this issue is a draft or has been published. */
  status: NewsletterStatus;
  /** Timestamp when the issue was published. Null if still draft. */
  publishedAt: Timestamp | null;
  /** Ordered list of section identifiers included in this issue. */
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
