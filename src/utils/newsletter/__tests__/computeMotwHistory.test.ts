import { computeMotwHistory } from "../computeMotwHistory";
import * as SleeperAPI from "../../api/SleeperAPI";
import { makeUser, makeRoster, makeMatchup } from "../testFixtures/sleeperFixtures";

jest.mock("../../api/SleeperAPI");

const mockGetRosters = SleeperAPI.getRosters as jest.MockedFunction<typeof SleeperAPI.getRosters>;
const mockGetUsers = SleeperAPI.getUsers as jest.MockedFunction<typeof SleeperAPI.getUsers>;
const mockGetMatchups = SleeperAPI.getMatchups as jest.MockedFunction<
  typeof SleeperAPI.getMatchups
>;

const LEAGUE_ID = "league_123";
const SEED = { week: 1, matchupId: 1 };

beforeEach(() => {
  jest.clearAllMocks();
});

/**
 * Four teams: rosters 1-4. The MotW chain follows the winner's next
 * matchup, so a 4-team league can exercise winner-stays, loser-leaves.
 */
function setupLeague() {
  mockGetUsers.mockResolvedValue([
    makeUser({ user_id: "u1", metadata: { team_name: "Alpha", avatar: "" } }),
    makeUser({ user_id: "u2", metadata: { team_name: "Beta", avatar: "" } }),
    makeUser({ user_id: "u3", metadata: { team_name: "Gamma", avatar: "" } }),
    makeUser({ user_id: "u4", metadata: { team_name: "Delta", avatar: "" } }),
  ]);
  mockGetRosters.mockResolvedValue([
    makeRoster({ roster_id: 1, owner_id: "u1" }),
    makeRoster({ roster_id: 2, owner_id: "u2" }),
    makeRoster({ roster_id: 3, owner_id: "u3" }),
    makeRoster({ roster_id: 4, owner_id: "u4" }),
  ]);
}

describe("computeMotwHistory", () => {
  it("returns empty when the seed week is after the current week", async () => {
    const result = await computeMotwHistory(LEAGUE_ID, 2, { week: 5, matchupId: 1 });
    expect(result).toEqual([]);
    expect(mockGetMatchups).not.toHaveBeenCalled();
  });

  it("returns the seed matchup's result for the seed week", async () => {
    setupLeague();
    mockGetMatchups.mockResolvedValue([
      makeMatchup({ roster_id: 1, matchup_id: 1, points: 120 }),
      makeMatchup({ roster_id: 2, matchup_id: 1, points: 100 }),
      makeMatchup({ roster_id: 3, matchup_id: 2, points: 90 }),
      makeMatchup({ roster_id: 4, matchup_id: 2, points: 80 }),
    ]);

    const result = await computeMotwHistory(LEAGUE_ID, 1, SEED);
    expect(result).toEqual([
      expect.objectContaining({
        week: 1,
        winnerTeam: "Alpha",
        winnerScore: 120,
        loserTeam: "Beta",
        loserScore: 100,
      }),
    ]);
    /* Score pool includes the non-MotW matchup too: 120 is the season max
       (green), 100 is the midpoint of [80, 120] (white). */
    expect(result[0].winnerScoreColor).toBe("#227740");
    expect(result[0].loserScoreColor).toBe("#ffffff");
  });

  it("follows the winner into their next matchup", async () => {
    setupLeague();
    mockGetMatchups
      // Week 1: roster 1 (seed MotW) beats roster 2
      .mockResolvedValueOnce([
        makeMatchup({ roster_id: 1, matchup_id: 1, points: 120 }),
        makeMatchup({ roster_id: 2, matchup_id: 1, points: 100 }),
        makeMatchup({ roster_id: 3, matchup_id: 2, points: 90 }),
        makeMatchup({ roster_id: 4, matchup_id: 2, points: 80 }),
      ])
      // Week 2: incumbent roster 1 now plays roster 3 in matchup 2
      .mockResolvedValueOnce([
        makeMatchup({ roster_id: 1, matchup_id: 2, points: 95 }),
        makeMatchup({ roster_id: 3, matchup_id: 2, points: 110 }),
        makeMatchup({ roster_id: 2, matchup_id: 1, points: 105 }),
        makeMatchup({ roster_id: 4, matchup_id: 1, points: 88 }),
      ]);

    const result = await computeMotwHistory(LEAGUE_ID, 2, SEED);
    expect(result).toHaveLength(2);
    expect(result[1]).toEqual(
      expect.objectContaining({
        week: 2,
        winnerTeam: "Gamma",
        winnerScore: 110,
        loserTeam: "Alpha",
        loserScore: 95,
      })
    );
  });

  it("stops the chain when the incumbent has no matchup", async () => {
    setupLeague();
    mockGetMatchups
      .mockResolvedValueOnce([
        makeMatchup({ roster_id: 1, matchup_id: 1, points: 120 }),
        makeMatchup({ roster_id: 2, matchup_id: 1, points: 100 }),
        makeMatchup({ roster_id: 3, matchup_id: 2, points: 90 }),
        makeMatchup({ roster_id: 4, matchup_id: 2, points: 80 }),
      ])
      // Week 2: roster 1 absent (bye / eliminated)
      .mockResolvedValueOnce([
        makeMatchup({ roster_id: 2, matchup_id: 1, points: 105 }),
        makeMatchup({ roster_id: 4, matchup_id: 1, points: 88 }),
      ]);

    const result = await computeMotwHistory(LEAGUE_ID, 2, SEED);
    expect(result).toHaveLength(1);
    expect(result[0].week).toBe(1);
  });

  it("returns empty when the seed matchup doesn't exist", async () => {
    setupLeague();
    mockGetMatchups.mockResolvedValue([
      makeMatchup({ roster_id: 3, matchup_id: 2, points: 90 }),
      makeMatchup({ roster_id: 4, matchup_id: 2, points: 80 }),
    ]);

    const result = await computeMotwHistory(LEAGUE_ID, 1, SEED);
    expect(result).toEqual([]);
  });

  it("breaks on an empty week", async () => {
    setupLeague();
    mockGetMatchups
      .mockResolvedValueOnce([
        makeMatchup({ roster_id: 1, matchup_id: 1, points: 120 }),
        makeMatchup({ roster_id: 2, matchup_id: 1, points: 100 }),
      ])
      .mockResolvedValueOnce([]);

    const result = await computeMotwHistory(LEAGUE_ID, 2, SEED);
    expect(result).toHaveLength(1);
  });

  it("falls back to Team {rosterId} when the roster is unknown", async () => {
    mockGetUsers.mockResolvedValue([]);
    mockGetRosters.mockResolvedValue([]);
    mockGetMatchups.mockResolvedValue([
      makeMatchup({ roster_id: 7, matchup_id: 1, points: 120 }),
      makeMatchup({ roster_id: 8, matchup_id: 1, points: 100 }),
    ]);

    const result = await computeMotwHistory(LEAGUE_ID, 1, SEED);
    expect(result[0].winnerTeam).toBe("Team 7");
    expect(result[0].loserTeam).toBe("Team 8");
  });
});
