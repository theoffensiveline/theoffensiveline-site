import { toSavedLeague, mergeSleeperLeagues } from "../sleeperLeagueSync";
import type { SavedLeague } from "../survivorUtils";

describe("toSavedLeague", () => {
  it("converts a Sleeper league with an avatar", () => {
    const saved = toSavedLeague({
      league_id: "123",
      name: "Test League",
      season: "2025",
      avatar: "abc123",
    });
    expect(saved).toEqual({
      id: "123",
      type: "sleeper",
      name: "Test League",
      year: 2025,
      avatar: "https://sleepercdn.com/avatars/abc123",
    });
  });

  it("omits the avatar key entirely when avatar is null (Firestore rejects undefined)", () => {
    const saved = toSavedLeague({
      league_id: "456",
      name: "No Avatar League",
      season: "2026",
      avatar: null,
    });
    expect("avatar" in saved).toBe(false);
    expect(saved).toEqual({ id: "456", type: "sleeper", name: "No Avatar League", year: 2026 });
  });
});

describe("mergeSleeperLeagues", () => {
  const sleeper2025: SavedLeague = { id: "s25", type: "sleeper", name: "Old League", year: 2025 };
  const sleeper2026: SavedLeague = { id: "s26", type: "sleeper", name: "New League", year: 2026 };
  const espnLeague: SavedLeague = { id: "espn_1", type: "espn", name: "ESPN League", year: 2025 };

  it("adds newly discovered leagues", () => {
    const { merged, changed } = mergeSleeperLeagues([espnLeague], [sleeper2026]);
    expect(changed).toBe(true);
    expect(merged).toEqual([espnLeague, sleeper2026]);
  });

  it("never deletes leagues missing from the fresh list (past seasons survive a refresh)", () => {
    const { merged, changed } = mergeSleeperLeagues([sleeper2025, espnLeague], [sleeper2026]);
    expect(merged).toContainEqual(sleeper2025);
    expect(merged).toContainEqual(espnLeague);
    expect(merged).toContainEqual(sleeper2026);
    expect(changed).toBe(true);
  });

  it("does not re-add leagues the user removed", () => {
    const { merged, changed } = mergeSleeperLeagues([], [sleeper2026], ["s26"]);
    expect(merged).toEqual([]);
    expect(changed).toBe(false);
  });

  it("updates metadata of an already-saved league", () => {
    const renamed = { ...sleeper2026, name: "Renamed League" };
    const { merged, changed } = mergeSleeperLeagues([sleeper2026], [renamed]);
    expect(changed).toBe(true);
    expect(merged).toEqual([renamed]);
  });

  it("reports no change when fresh data matches saved data", () => {
    const { merged, changed } = mergeSleeperLeagues([sleeper2026, espnLeague], [sleeper2026]);
    expect(changed).toBe(false);
    expect(merged).toEqual([sleeper2026, espnLeague]);
  });

  it("does not confuse a non-sleeper league with the same id", () => {
    const weird: SavedLeague = { id: "s26", type: "espn", name: "Same ID ESPN", year: 2026 };
    const { merged } = mergeSleeperLeagues([weird], [sleeper2026]);
    // ESPN entry untouched; sleeper league appended separately
    expect(merged).toContainEqual(weird);
    expect(merged).toContainEqual(sleeper2026);
  });

  it("handles empty fresh list without changes", () => {
    const { merged, changed } = mergeSleeperLeagues([sleeper2025], []);
    expect(changed).toBe(false);
    expect(merged).toEqual([sleeper2025]);
  });
});
