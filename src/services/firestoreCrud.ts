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
 *   /leagues/{leagueId}/weekData/{weekNumber}           (fate decided in #84)
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
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import type {
  UserDoc,
  LeagueDoc,
  NewsletterDoc,
  NewsletterSeason,
  IssueDoc,
  WeekDataDoc,
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

/**
 * Update fields on an existing league document.
 * @param leagueId - League document ID
 * @param data - Partial league fields to merge
 */
export async function updateLeague(leagueId: string, data: Partial<LeagueDoc>): Promise<void> {
  await updateDoc(doc(db, "leagues", leagueId), data);
}

/**
 * Delete a league document.
 * @param leagueId - League document ID
 */
export async function deleteLeague(leagueId: string): Promise<void> {
  await deleteDoc(doc(db, "leagues", leagueId));
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
 * Build an issue document ID. Weeks are zero-padded so lexical order
 * matches chronological order ("2025_w02" < "2025_w10").
 */
export function issueDocId(season: number, week: number): string {
  return `${season}_w${String(week).padStart(2, "0")}`;
}

/**
 * Create or overwrite an issue for a given season + week.
 * @param newsletterId - Parent newsletter document ID
 * @param season - NFL season year
 * @param week - Week number
 * @param data - Issue fields
 */
export async function setIssue(
  newsletterId: string,
  season: number,
  week: number,
  data: IssueDoc
): Promise<void> {
  await setDoc(doc(db, "newsletters", newsletterId, "issues", issueDocId(season, week)), data);
}

/**
 * Fetch an issue for a given season + week.
 * @param newsletterId - Parent newsletter document ID
 * @param season - NFL season year
 * @param week - Week number
 * @returns The issue document or null if not found.
 */
export async function getIssue(
  newsletterId: string,
  season: number,
  week: number
): Promise<IssueDoc | null> {
  const snap = await getDoc(
    doc(db, "newsletters", newsletterId, "issues", issueDocId(season, week))
  );
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

// ---------------------------------------------------------------------------
// WeekData — /leagues/{leagueId}/weekData/{weekNumber}
// ---------------------------------------------------------------------------

/**
 * Create or overwrite a weekData document (auto-generated stats cache).
 * @param leagueId - Parent league document ID
 * @param weekNumber - Week number as string
 * @param data - Week data fields
 */
export async function setWeekData(
  leagueId: string,
  weekNumber: string,
  data: WeekDataDoc
): Promise<void> {
  await setDoc(doc(db, "leagues", leagueId, "weekData", weekNumber), data);
}

/**
 * Fetch a weekData document for a given week.
 * @param leagueId - Parent league document ID
 * @param weekNumber - Week number as string
 * @returns The weekData document or null if not found.
 */
export async function getWeekData(
  leagueId: string,
  weekNumber: string
): Promise<WeekDataDoc | null> {
  const snap = await getDoc(doc(db, "leagues", leagueId, "weekData", weekNumber));
  return snap.exists() ? (snap.data() as WeekDataDoc) : null;
}

/**
 * Update fields on an existing weekData document.
 * @param leagueId - Parent league document ID
 * @param weekNumber - Week number as string
 * @param data - Partial weekData fields to merge
 */
export async function updateWeekData(
  leagueId: string,
  weekNumber: string,
  data: Partial<WeekDataDoc>
): Promise<void> {
  await updateDoc(doc(db, "leagues", leagueId, "weekData", weekNumber), data);
}

/**
 * Delete a weekData document.
 * @param leagueId - Parent league document ID
 * @param weekNumber - Week number as string
 */
export async function deleteWeekData(leagueId: string, weekNumber: string): Promise<void> {
  await deleteDoc(doc(db, "leagues", leagueId, "weekData", weekNumber));
}
