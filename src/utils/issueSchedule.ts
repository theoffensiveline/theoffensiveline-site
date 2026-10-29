/**
 * Scheduled-publish helpers (#schedule). Issues publish lazily: the editor
 * writes `scheduledPublishAt` while status stays "draft", and every reader
 * treats the issue as published once that time passes — no server job.
 * All visibility decisions go through isIssueLive so the predicate lives in
 * exactly one place.
 */

import { Timestamp } from "firebase/firestore";
import type { IssueDoc } from "../types/firestore";

type Schedulable = Pick<IssueDoc, "status" | "scheduledPublishAt">;

/**
 * True once the issue is visible to readers: published outright, or
 * scheduled and the publish time has already passed.
 */
export function isIssueLive(issue: Schedulable, now = Date.now()): boolean {
  if (issue.status === "published") return true;
  const at = issue.scheduledPublishAt;
  return at != null && at.toMillis() <= now;
}

/**
 * True while a draft is waiting on a future scheduled publish time.
 */
export function isIssueScheduled(issue: Schedulable, now = Date.now()): boolean {
  if (issue.status !== "draft") return false;
  const at = issue.scheduledPublishAt;
  return at != null && at.toMillis() > now;
}

/** Compact "Tue, Oct 29, 9:00 PM" for publish-time labels. */
export function formatScheduleTime(at: Timestamp): string {
  return at.toDate().toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/** Format a Date for <input type="datetime-local"> (local time, minutes). */
export function toLocalDateTimeInput(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
