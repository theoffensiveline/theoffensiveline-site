/**
 * Firestore CRUD utility functions for multi-league collections.
 *
 * Each function is thin wrapper around the Firestore SDK, typed to our
 * document interfaces. Keeps Firestore calls centralised so the rest of
 * the app never imports Firestore directly.
 *
 * Collections handled:
 *   /users/{uid}
 *   /leagues/{leagueId}
 *   /newsletters/{newsletterId}                        (issue #103)
 *   /newsletters/{newsletterId}/issues/{season}_w{week}
 */

import {
  doc,
  addDoc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  where,
  arrayUnion,
  arrayRemove,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import type {
  UserDoc,
  LeagueDoc,
  LeagueFeature,
  NewsletterDoc,
  NewsletterSeason,
  IssueDoc,
  IssueSection,
} from "../types/firestore";
import { getSeedFeatures } from "../components/constants/LeagueConstants";

/**
 * Backfill `features` on league docs created before issue #94.
 * Known special leagues fall back to their seed set; everyone else gets [].
 */
function withFeatures(leagueId: string, data: LeagueDoc): LeagueDoc {
  return { ...data, features: data.features ?? getSeedFeatures(leagueId) };
}

// ---------------------------------------------------------------------------
// Users — /users/{uid}
// ---------------------------------------------------------------------------

/**
 * Create a new user document. Sets createdAt automatically.
 * @param uid - Firebase Auth UID
 * @param data - User fields (excluding createdAt)
 */
export async function createUser(uid: string, data: Omit<UserDoc, "createdAt">): Promise<void> {
  await setDoc(doc(db, "users", uid), {
    ...data,
    createdAt: Timestamp.now(),
  });
}

/**
 * Fetch a user document by UID.
 * @param uid - Firebase Auth UID
 * @returns The user document or null if not found.
 */
export async function getUser(uid: string): Promise<UserDoc | null> {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? (snap.data() as UserDoc) : null;
}

/**
 * Update fields on an existing user document.
 * @param uid - Firebase Auth UID
 * @param data - Partial user fields to merge
 */
export async function updateUser(uid: string, data: Partial<UserDoc>): Promise<void> {
  await updateDoc(doc(db, "users", uid), data);
}

/**
 * Delete a user document.
 * @param uid - Firebase Auth UID
 */
export async function deleteUser(uid: string): Promise<void> {
  await deleteDoc(doc(db, "users", uid));
}

// ---------------------------------------------------------------------------
// Leagues — /leagues/{leagueId}
// ---------------------------------------------------------------------------

/**
 * Create a new league document (platform metadata cache). Sets createdAt.
 * @param leagueId - Document ID (plain numeric for Sleeper, "espn_XXXXX" for ESPN)
 * @param data - League fields (excluding createdAt)
 */
export async function createLeague(
  leagueId: string,
  data: Omit<LeagueDoc, "createdAt">
): Promise<void> {
  await setDoc(doc(db, "leagues", leagueId), {
    ...data,
    createdAt: Timestamp.now(),
  });
}

/**
 * Fetch a league document by ID.
 * @param leagueId - League document ID
 * @returns The league document or null if not found.
 */
export async function getLeague(leagueId: string): Promise<LeagueDoc | null> {
  const snap = await getDoc(doc(db, "leagues", leagueId));
  return snap.exists() ? withFeatures(leagueId, snap.data() as LeagueDoc) : null;
}

// ---------------------------------------------------------------------------
// Newsletters — /newsletters/{newsletterId}   (issue #103)
// ---------------------------------------------------------------------------

/**
 * Flatten seasons[].leagueId for array-contains discovery queries.
 * The CRUD layer is the only writer of leagueIds — never set it directly.
 */
function deriveLeagueIds(seasons: NewsletterSeason[]): string[] {
  return seasons.map((s) => s.leagueId);
}

/**
 * Validate a newsletter's seasons and active pointer.
 * - Non-empty: a newsletter always covers at least one season.
 * - Unique season years: issue doc IDs are keyed {season}_w{week}, so two
 *   leagues covering the same year would silently overwrite each other's
 *   issues.
 * - Unique league IDs: ESPN reuses one league ID across seasons, so the same
 *   ID twice would break discovery and render duplicate season rows.
 * - activeLeagueId must be one of the seasons.
 */
function validateSeasons(seasons: NewsletterSeason[], activeLeagueId?: string): void {
  if (seasons.length === 0) {
    throw new Error("A newsletter must cover at least one season.");
  }
  const years = seasons.map((s) => s.season);
  if (new Set(years).size !== years.length) {
    throw new Error("A newsletter can only contain one league per season year.");
  }
  const ids = seasons.map((s) => s.leagueId);
  if (new Set(ids).size !== ids.length) {
    throw new Error("That league is already part of this newsletter.");
  }
  if (activeLeagueId !== undefined && !ids.includes(activeLeagueId)) {
    throw new Error("activeLeagueId must reference one of the newsletter's seasons.");
  }
}

/** Newsletter fields the caller provides; leagueIds/createdAt are derived. */
export type NewsletterCreate = Omit<NewsletterDoc, "createdAt" | "leagueIds">;

/**
 * Create a newsletter with an auto-generated ID.
 * @param data - Newsletter fields (leagueIds is derived from seasons)
 * @returns The new newsletter's document ID.
 */
export async function createNewsletter(data: NewsletterCreate): Promise<string> {
  validateSeasons(data.seasons, data.activeLeagueId);
  const ref = await addDoc(collection(db, "newsletters"), {
    ...data,
    leagueIds: deriveLeagueIds(data.seasons),
    createdAt: Timestamp.now(),
  });
  return ref.id;
}

/**
 * Fetch a newsletter by ID.
 * @param newsletterId - Newsletter document ID
 * @returns The newsletter document or null if not found.
 */
export async function getNewsletter(newsletterId: string): Promise<NewsletterDoc | null> {
  const snap = await getDoc(doc(db, "newsletters", newsletterId));
  return snap.exists() ? (snap.data() as NewsletterDoc) : null;
}

/**
 * Discovery query: all newsletters that include a given league-season.
 * @param leagueId - Prefixed league document ID
 * @returns Array of newsletter documents with their IDs.
 */
export async function getNewslettersForLeague(
  leagueId: string
): Promise<(NewsletterDoc & { id: string })[]> {
  const q = query(collection(db, "newsletters"), where("leagueIds", "array-contains", leagueId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as NewsletterDoc) }));
}

/**
 * Fetch all newsletters where a given UID is the editor.
 * @param editorUid - Firebase Auth UID
 * @returns Array of newsletter documents with their IDs.
 */
export async function getNewslettersByEditor(
  editorUid: string
): Promise<(NewsletterDoc & { id: string })[]> {
  const q = query(collection(db, "newsletters"), where("editorUid", "==", editorUid));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as NewsletterDoc) }));
}

/**
 * Fetch all newsletters where a given UID is a co-editor.
 * @param uid - Firebase Auth UID
 * @returns Array of newsletter documents with their IDs.
 */
export async function getNewslettersByCoEditor(
  uid: string
): Promise<(NewsletterDoc & { id: string })[]> {
  const q = query(collection(db, "newsletters"), where("coEditorUids", "array-contains", uid));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as NewsletterDoc) }));
}

/**
 * Update fields on a newsletter. If seasons change, leagueIds is re-derived
 * and duplicate season years are rejected.
 * @param newsletterId - Newsletter document ID
 * @param data - Partial newsletter fields to merge
 */
export async function updateNewsletter(
  newsletterId: string,
  data: Partial<NewsletterCreate>
): Promise<void> {
  const payload: Partial<NewsletterDoc> = { ...data };
  if (data.seasons) {
    validateSeasons(data.seasons, data.activeLeagueId);
    payload.leagueIds = deriveLeagueIds(data.seasons);
  }
  await updateDoc(doc(db, "newsletters", newsletterId), payload);
}

/**
 * Atomically enable/disable a single feature flag on a newsletter.
 * arrayUnion/arrayRemove touch only the named flag, so concurrent toggles
 * and console-set dogfood flags can never be clobbered by a stale
 * read-modify-write (#110 review).
 * @param newsletterId - Newsletter document ID
 * @param feature - The flag to toggle
 * @param enabled - true to add, false to remove
 */
export async function setNewsletterFeature(
  newsletterId: string,
  feature: LeagueFeature,
  enabled: boolean
): Promise<void> {
  await updateDoc(doc(db, "newsletters", newsletterId), {
    features: enabled ? arrayUnion(feature) : arrayRemove(feature),
  });
}

/**
 * Delete a newsletter document.
 * @param newsletterId - Newsletter document ID
 */
export async function deleteNewsletter(newsletterId: string): Promise<void> {
  await deleteDoc(doc(db, "newsletters", newsletterId));
}

// ---------------------------------------------------------------------------
// Issues — /newsletters/{newsletterId}/issues/{season}_w{week}
// ---------------------------------------------------------------------------

/**
 * Build a weekly issue document ID. Weeks are zero-padded so lexical order
 * matches chronological order ("2025_w02" < "2025_w10").
 */
export function issueDocId(season: number, week: number): string {
  return `${season}_w${String(week).padStart(2, "0")}`;
}

/**
 * Build an ad-hoc (week-less) issue document ID. The epoch-millis suffix is
 * unique per creation and keeps lexical order = creation order; "x" sorts
 * after "w", so a season's ad-hoc issues list above its weeklies when
 * sorting IDs descending.
 */
export function adhocIssueId(season: number): string {
  return `${season}_x${Date.now()}`;
}

/**
 * Create or overwrite an issue.
 * @param newsletterId - Parent newsletter document ID
 * @param issueId - Issue document ID (weekly or ad-hoc form)
 * @param data - Issue fields
 */
export async function setIssue(
  newsletterId: string,
  issueId: string,
  data: IssueDoc
): Promise<void> {
  await setDoc(doc(db, "newsletters", newsletterId, "issues", issueId), data);
}

/**
 * Autosave an issue draft's content WITHOUT touching status/publishedAt —
 * a merge write, so a stale tab's autosave can never revert another tab's
 * publish (#84 review). status/publishedAt are written only when the doc is
 * being created (createIfMissing) or via the explicit publish/unpublish
 * paths (setIssue).
 * @param newsletterId - Parent newsletter document ID
 * @param issueId - Issue document ID (weekly or ad-hoc form)
 * @param data - Draft content: season, week (null for ad-hoc), leagueId,
 *   title, and the current ordered sections
 * @param createIfMissing - Include draft status fields (first save of a new doc)
 */
export async function saveIssueSections(
  newsletterId: string,
  issueId: string,
  data: {
    season: number;
    week: number | null;
    leagueId: string;
    title: string;
    sections: IssueSection[];
  },
  createIfMissing: boolean
): Promise<void> {
  await setDoc(
    doc(db, "newsletters", newsletterId, "issues", issueId),
    {
      ...data,
      ...(createIfMissing ? { status: "draft", publishedAt: null } : {}),
    },
    { merge: true }
  );
}

/**
 * Fetch an issue by document ID.
 * @param newsletterId - Parent newsletter document ID
 * @param issueId - Issue document ID (weekly or ad-hoc form)
 * @returns The issue document or null if not found.
 */
export async function getIssue(newsletterId: string, issueId: string): Promise<IssueDoc | null> {
  const snap = await getDoc(doc(db, "newsletters", newsletterId, "issues", issueId));
  return snap.exists() ? (snap.data() as IssueDoc) : null;
}

/**
 * Fetch all issues for a newsletter.
 * @param newsletterId - Parent newsletter document ID
 * @returns Array of issue documents with their IDs (e.g. "2025_w02").
 */
export async function getAllIssues(newsletterId: string): Promise<(IssueDoc & { id: string })[]> {
  const snap = await getDocs(collection(db, "newsletters", newsletterId, "issues"));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as IssueDoc) }));
}
