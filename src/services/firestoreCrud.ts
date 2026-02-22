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
 *   /leagues/{leagueId}/newsletters/{weekNumber}
 *   /leagues/{leagueId}/weekData/{weekNumber}
 */

import {
  doc,
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
import type { UserDoc, LeagueDoc, NewsletterDoc, WeekDataDoc } from "../types/firestore";

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
 * Create a new league document. Sets createdAt and privacy defaults.
 * @param leagueId - Document ID (plain numeric for Sleeper, "espn_XXXXX" for ESPN)
 * @param data - League fields (excluding createdAt; privacy defaults to 'public')
 */
export async function createLeague(
  leagueId: string,
  data: Omit<LeagueDoc, "createdAt" | "privacy"> & { privacy?: LeagueDoc["privacy"] }
): Promise<void> {
  await setDoc(doc(db, "leagues", leagueId), {
    ...data,
    privacy: data.privacy ?? "public",
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
  return snap.exists() ? (snap.data() as LeagueDoc) : null;
}

/**
 * Fetch all leagues where a given UID is the editor.
 * @param editorUid - Firebase Auth UID of the editor
 * @returns Array of league documents with their IDs.
 */
export async function getLeaguesByEditor(
  editorUid: string
): Promise<(LeagueDoc & { id: string })[]> {
  const q = query(collection(db, "leagues"), where("editorUid", "==", editorUid));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as LeagueDoc) }));
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
// Newsletters — /leagues/{leagueId}/newsletters/{weekNumber}
// ---------------------------------------------------------------------------

/**
 * Create or overwrite a newsletter document for a given week.
 * @param leagueId - Parent league document ID
 * @param weekNumber - Week number as string (e.g. "1")
 * @param data - Newsletter fields
 */
export async function setNewsletter(
  leagueId: string,
  weekNumber: string,
  data: NewsletterDoc
): Promise<void> {
  await setDoc(doc(db, "leagues", leagueId, "newsletters", weekNumber), data);
}

/**
 * Fetch a newsletter document for a given week.
 * @param leagueId - Parent league document ID
 * @param weekNumber - Week number as string
 * @returns The newsletter document or null if not found.
 */
export async function getNewsletter(
  leagueId: string,
  weekNumber: string
): Promise<NewsletterDoc | null> {
  const snap = await getDoc(doc(db, "leagues", leagueId, "newsletters", weekNumber));
  return snap.exists() ? (snap.data() as NewsletterDoc) : null;
}

/**
 * Fetch all newsletters for a league.
 * @param leagueId - Parent league document ID
 * @returns Array of newsletter documents with their week numbers.
 */
export async function getAllNewsletters(
  leagueId: string
): Promise<(NewsletterDoc & { weekNumber: string })[]> {
  const snap = await getDocs(collection(db, "leagues", leagueId, "newsletters"));
  return snap.docs.map((d) => ({
    weekNumber: d.id,
    ...(d.data() as NewsletterDoc),
  }));
}

/**
 * Update fields on an existing newsletter document.
 * @param leagueId - Parent league document ID
 * @param weekNumber - Week number as string
 * @param data - Partial newsletter fields to merge
 */
export async function updateNewsletter(
  leagueId: string,
  weekNumber: string,
  data: Partial<NewsletterDoc>
): Promise<void> {
  await updateDoc(doc(db, "leagues", leagueId, "newsletters", weekNumber), data);
}

/**
 * Delete a newsletter document.
 * @param leagueId - Parent league document ID
 * @param weekNumber - Week number as string
 */
export async function deleteNewsletter(leagueId: string, weekNumber: string): Promise<void> {
  await deleteDoc(doc(db, "leagues", leagueId, "newsletters", weekNumber));
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
