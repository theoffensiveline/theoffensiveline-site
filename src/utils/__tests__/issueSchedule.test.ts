import { Timestamp } from "firebase/firestore";
import {
  isIssueLive,
  isIssueScheduled,
  formatScheduleTime,
  toLocalDateTimeInput,
} from "../issueSchedule";

const NOW = 1_760_000_000_000; // fixed reference instant

describe("isIssueLive", () => {
  it("is live when published, regardless of schedule", () => {
    expect(isIssueLive({ status: "published", scheduledPublishAt: null }, NOW)).toBe(true);
    expect(
      isIssueLive(
        { status: "published", scheduledPublishAt: Timestamp.fromMillis(NOW + 60_000) },
        NOW
      )
    ).toBe(true);
  });

  it("is not live for an unscheduled draft", () => {
    expect(isIssueLive({ status: "draft", scheduledPublishAt: null }, NOW)).toBe(false);
    expect(isIssueLive({ status: "draft" }, NOW)).toBe(false);
  });

  it("is not live while the scheduled time is still in the future", () => {
    const at = Timestamp.fromMillis(NOW + 1);
    expect(isIssueLive({ status: "draft", scheduledPublishAt: at }, NOW)).toBe(false);
  });

  it("goes live the moment the scheduled time arrives", () => {
    const at = Timestamp.fromMillis(NOW);
    expect(isIssueLive({ status: "draft", scheduledPublishAt: at }, NOW)).toBe(true);
    expect(isIssueLive({ status: "draft", scheduledPublishAt: at }, NOW + 1)).toBe(true);
  });
});

describe("isIssueScheduled", () => {
  it("is scheduled only for a draft with a future time", () => {
    const future = Timestamp.fromMillis(NOW + 3_600_000);
    expect(isIssueScheduled({ status: "draft", scheduledPublishAt: future }, NOW)).toBe(true);
    expect(isIssueScheduled({ status: "published", scheduledPublishAt: future }, NOW)).toBe(false);
    expect(isIssueScheduled({ status: "draft", scheduledPublishAt: null }, NOW)).toBe(false);
  });

  it("is no longer scheduled once the time passes", () => {
    const past = Timestamp.fromMillis(NOW - 1);
    expect(isIssueScheduled({ status: "draft", scheduledPublishAt: past }, NOW)).toBe(false);
  });
});

describe("toLocalDateTimeInput", () => {
  it("round-trips through new Date for datetime-local values", () => {
    const d = new Date(2026, 9, 29, 21, 5); // Oct 29 2026, 9:05 PM local
    const value = toLocalDateTimeInput(d);
    expect(value).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/);
    expect(new Date(value).getTime()).toBe(d.getTime());
  });
});

describe("formatScheduleTime", () => {
  it("produces a human-readable local time", () => {
    const text = formatScheduleTime(Timestamp.fromDate(new Date(2026, 9, 29, 21, 0)));
    expect(text).toContain("Oct");
    expect(text).toContain("29");
  });
});
