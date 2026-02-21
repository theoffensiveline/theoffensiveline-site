import { computeMatchupData } from "../computeMatchupData";
import * as SleeperAPI from "../../api/SleeperAPI";
import { makeUser, makeRoster, makeMatchup } from "../testFixtures/sleeperFixtures";

jest.mock("../../api/SleeperAPI");

const mockGetRosters = SleeperAPI.getRosters as jest.MockedFunction<typeof SleeperAPI.getRosters>;
const mockGetUsers = SleeperAPI.getUsers as jest.MockedFunction<typeof SleeperAPI.getUsers>;
const mockGetMatchups = SleeperAPI.getMatchups as jest.MockedFunction<
  typeof SleeperAPI.getMatchups
>;

const LEAGUE_ID = "league_123";

// Color constants mirrored from ColorConstants.ts light theme
const CLOSE_WIN_GREEN = "#227740";
const CLOSE_LOSS_RED = "#bc293d";
const BLOWOUT_BG = "#ECECDF";

beforeEach(() => {
  jest.clearAllMocks();
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function setupTwoTeams() {
  const user1 = makeUser({
    user_id: "user_1",
    metadata: { team_name: "Team Alpha", avatar: "avatar_a" },
  });
  const user2 = makeUser({
    user_id: "user_2",
    metadata: { team_name: "Team Beta", avatar: "avatar_b" },
  });
  const roster1 = makeRoster({ roster_id: 1, owner_id: "user_1" });
  const roster2 = makeRoster({ roster_id: 2, owner_id: "user_2" });

  mockGetUsers.mockResolvedValue([user1, user2]);
  mockGetRosters.mockResolvedValue([roster1, roster2]);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe("computeMatchupData", () => {
  describe("basic output", () => {
    it("returns empty array when currentWeek is 0", async () => {
      mockGetRosters.mockResolvedValue([]);
      mockGetUsers.mockResolvedValue([]);

      const result = await computeMatchupData(LEAGUE_ID, 0);
      expect(result).toEqual([]);
    });

    it("returns one row per team per week", async () => {
      setupTwoTeams();
      const week1 = [
        makeMatchup({ roster_id: 1, matchup_id: 1, points: 120 }),
        makeMatchup({ roster_id: 2, matchup_id: 1, points: 100 }),
      ];

      mockGetMatchups.mockResolvedValue(week1);

      const result = await computeMatchupData(LEAGUE_ID, 1);
      // 2 teams × 1 week = 2 rows
      expect(result).toHaveLength(2);
    });

    it("returns correct shape for each row", async () => {
      setupTwoTeams();
      mockGetMatchups.mockResolvedValue([
        makeMatchup({ roster_id: 1, matchup_id: 1, points: 120 }),
        makeMatchup({ roster_id: 2, matchup_id: 1, points: 100 }),
      ]);

      const result = await computeMatchupData(LEAGUE_ID, 1);
      const row = result[0];

      expect(row).toHaveProperty("week");
      expect(row).toHaveProperty("team_name");
      expect(row).toHaveProperty("matchup_id");
      expect(row).toHaveProperty("team_points");
      expect(row).toHaveProperty("margin_of_victory");
      expect(row).toHaveProperty("Average");
      expect(row).toHaveProperty("Median");
      expect(row).toHaveProperty("Maximum");
      expect(row).toHaveProperty("Minimum");
      expect(row).toHaveProperty("mov_color");
    });

    it("accumulates rows across multiple weeks", async () => {
      setupTwoTeams();
      const weekData = [
        makeMatchup({ roster_id: 1, matchup_id: 1, points: 120 }),
        makeMatchup({ roster_id: 2, matchup_id: 1, points: 100 }),
      ];

      mockGetMatchups.mockResolvedValueOnce(weekData).mockResolvedValueOnce(weekData);

      const result = await computeMatchupData(LEAGUE_ID, 2);
      // 2 teams × 2 weeks = 4 rows
      expect(result).toHaveLength(4);
    });
  });

  describe("margin of victory", () => {
    it("winner has positive margin_of_victory", async () => {
      setupTwoTeams();
      mockGetMatchups.mockResolvedValue([
        makeMatchup({ roster_id: 1, matchup_id: 1, points: 130 }),
        makeMatchup({ roster_id: 2, matchup_id: 1, points: 100 }),
      ]);

      const result = await computeMatchupData(LEAGUE_ID, 1);
      const winner = result.find((r) => r.team_name === "Team Alpha")!;
      expect(winner.margin_of_victory).toBeCloseTo(30, 2);
    });

    it("loser has negative margin_of_victory", async () => {
      setupTwoTeams();
      mockGetMatchups.mockResolvedValue([
        makeMatchup({ roster_id: 1, matchup_id: 1, points: 130 }),
        makeMatchup({ roster_id: 2, matchup_id: 1, points: 100 }),
      ]);

      const result = await computeMatchupData(LEAGUE_ID, 1);
      const loser = result.find((r) => r.team_name === "Team Beta")!;
      expect(loser.margin_of_victory).toBeCloseTo(-30, 2);
    });

    it("margin is 0 for a tie", async () => {
      setupTwoTeams();
      mockGetMatchups.mockResolvedValue([
        makeMatchup({ roster_id: 1, matchup_id: 1, points: 100 }),
        makeMatchup({ roster_id: 2, matchup_id: 1, points: 100 }),
      ]);

      const result = await computeMatchupData(LEAGUE_ID, 1);
      result.forEach((row) => {
        expect(row.margin_of_victory).toBe(0);
      });
    });

    it("rounds margin to 2 decimal places", async () => {
      setupTwoTeams();
      mockGetMatchups.mockResolvedValue([
        makeMatchup({ roster_id: 1, matchup_id: 1, points: 100.123 }),
        makeMatchup({ roster_id: 2, matchup_id: 1, points: 90.456 }),
      ]);

      const result = await computeMatchupData(LEAGUE_ID, 1);
      const winner = result.find((r) => r.team_name === "Team Alpha")!;
      // 100.123 - 90.456 = 9.667, rounded to 2dp = 9.67
      expect(winner.margin_of_victory).toBe(9.67);
    });
  });

  describe("margin color (mov_color)", () => {
    it("close win (margin ≤ 10) gets green color", async () => {
      setupTwoTeams();
      mockGetMatchups.mockResolvedValue([
        makeMatchup({ roster_id: 1, matchup_id: 1, points: 105 }),
        makeMatchup({ roster_id: 2, matchup_id: 1, points: 100 }),
      ]);

      const result = await computeMatchupData(LEAGUE_ID, 1);
      const winner = result.find((r) => r.team_name === "Team Alpha")!;
      expect(winner.mov_color).toBe(CLOSE_WIN_GREEN);
    });

    it("close loss (margin ≥ -10) gets red color", async () => {
      setupTwoTeams();
      mockGetMatchups.mockResolvedValue([
        makeMatchup({ roster_id: 1, matchup_id: 1, points: 105 }),
        makeMatchup({ roster_id: 2, matchup_id: 1, points: 100 }),
      ]);

      const result = await computeMatchupData(LEAGUE_ID, 1);
      const loser = result.find((r) => r.team_name === "Team Beta")!;
      expect(loser.mov_color).toBe(CLOSE_LOSS_RED);
    });

    it("blowout win (margin > 10) gets background color", async () => {
      setupTwoTeams();
      mockGetMatchups.mockResolvedValue([
        makeMatchup({ roster_id: 1, matchup_id: 1, points: 200 }),
        makeMatchup({ roster_id: 2, matchup_id: 1, points: 100 }),
      ]);

      const result = await computeMatchupData(LEAGUE_ID, 1);
      const winner = result.find((r) => r.team_name === "Team Alpha")!;
      expect(winner.mov_color).toBe(BLOWOUT_BG);
    });

    it("blowout loss (margin < -10) gets background color", async () => {
      setupTwoTeams();
      mockGetMatchups.mockResolvedValue([
        makeMatchup({ roster_id: 1, matchup_id: 1, points: 200 }),
        makeMatchup({ roster_id: 2, matchup_id: 1, points: 100 }),
      ]);

      const result = await computeMatchupData(LEAGUE_ID, 1);
      const loser = result.find((r) => r.team_name === "Team Beta")!;
      expect(loser.mov_color).toBe(BLOWOUT_BG);
    });

    it("exact threshold 10 is still a close win", async () => {
      setupTwoTeams();
      mockGetMatchups.mockResolvedValue([
        makeMatchup({ roster_id: 1, matchup_id: 1, points: 110 }),
        makeMatchup({ roster_id: 2, matchup_id: 1, points: 100 }),
      ]);

      const result = await computeMatchupData(LEAGUE_ID, 1);
      const winner = result.find((r) => r.team_name === "Team Alpha")!;
      expect(winner.mov_color).toBe(CLOSE_WIN_GREEN);
    });
  });

  describe("weekly statistics", () => {
    it("computes Average correctly", async () => {
      setupTwoTeams();
      // Two scores: 120 and 80 → average = 100
      mockGetMatchups.mockResolvedValue([
        makeMatchup({ roster_id: 1, matchup_id: 1, points: 120 }),
        makeMatchup({ roster_id: 2, matchup_id: 1, points: 80 }),
      ]);

      const result = await computeMatchupData(LEAGUE_ID, 1);
      result.forEach((row) => {
        expect(row.Average).toBeCloseTo(100, 5);
      });
    });

    it("computes Median correctly for even count", async () => {
      setupTwoTeams();
      // Two scores: 80 and 120 → median = (80 + 120) / 2 = 100
      mockGetMatchups.mockResolvedValue([
        makeMatchup({ roster_id: 1, matchup_id: 1, points: 120 }),
        makeMatchup({ roster_id: 2, matchup_id: 1, points: 80 }),
      ]);

      const result = await computeMatchupData(LEAGUE_ID, 1);
      result.forEach((row) => {
        expect(row.Median).toBe(100);
      });
    });

    it("computes Maximum and Minimum correctly", async () => {
      setupTwoTeams();
      mockGetMatchups.mockResolvedValue([
        makeMatchup({ roster_id: 1, matchup_id: 1, points: 150 }),
        makeMatchup({ roster_id: 2, matchup_id: 1, points: 60 }),
      ]);

      const result = await computeMatchupData(LEAGUE_ID, 1);
      result.forEach((row) => {
        expect(row.Maximum).toBe(150);
        expect(row.Minimum).toBe(60);
      });
    });

    it("includes the correct week number", async () => {
      setupTwoTeams();
      const weekData = [
        makeMatchup({ roster_id: 1, matchup_id: 1, points: 100 }),
        makeMatchup({ roster_id: 2, matchup_id: 1, points: 90 }),
      ];

      mockGetMatchups.mockResolvedValueOnce(weekData).mockResolvedValueOnce(weekData);

      const result = await computeMatchupData(LEAGUE_ID, 2);
      const week1Rows = result.filter((r) => r.week === 1);
      const week2Rows = result.filter((r) => r.week === 2);
      expect(week1Rows).toHaveLength(2);
      expect(week2Rows).toHaveLength(2);
    });
  });

  describe("team metadata", () => {
    it("uses team_name from metadata when available", async () => {
      const user = makeUser({
        user_id: "user_1",
        metadata: { team_name: "Metadata Name", avatar: "" },
        display_name: "Display Name",
      });
      mockGetUsers.mockResolvedValue([user]);
      mockGetRosters.mockResolvedValue([makeRoster({ roster_id: 1, owner_id: "user_1" })]);
      mockGetMatchups.mockResolvedValue([
        makeMatchup({ roster_id: 1, matchup_id: 1, points: 100 }),
      ]);

      const result = await computeMatchupData(LEAGUE_ID, 1);
      expect(result[0].team_name).toBe("Metadata Name");
    });

    it("falls back to display_name when team_name is absent", async () => {
      const user = makeUser({
        user_id: "user_1",
        metadata: { team_name: "", avatar: "" },
        display_name: "DisplayFallback",
        username: "username_fallback",
      });
      mockGetUsers.mockResolvedValue([user]);
      mockGetRosters.mockResolvedValue([makeRoster({ roster_id: 1, owner_id: "user_1" })]);
      mockGetMatchups.mockResolvedValue([
        makeMatchup({ roster_id: 1, matchup_id: 1, points: 100 }),
      ]);

      const result = await computeMatchupData(LEAGUE_ID, 1);
      expect(result[0].team_name).toBe("DisplayFallback");
    });

    it("falls back to Team {rosterId} when no user is found", async () => {
      mockGetUsers.mockResolvedValue([]);
      mockGetRosters.mockResolvedValue([makeRoster({ roster_id: 5, owner_id: "nobody" })]);
      mockGetMatchups.mockResolvedValue([
        makeMatchup({ roster_id: 5, matchup_id: 1, points: 100 }),
      ]);

      const result = await computeMatchupData(LEAGUE_ID, 1);
      expect(result[0].team_name).toBe("Team 5");
    });

    it("skips weeks with empty matchup data", async () => {
      setupTwoTeams();
      mockGetMatchups
        .mockResolvedValueOnce([]) // Week 1 empty
        .mockResolvedValueOnce([
          // Week 2 has data
          makeMatchup({ roster_id: 1, matchup_id: 1, points: 100 }),
          makeMatchup({ roster_id: 2, matchup_id: 1, points: 90 }),
        ]);

      const result = await computeMatchupData(LEAGUE_ID, 2);
      // Only week 2 contributed rows
      expect(result).toHaveLength(2);
      result.forEach((r) => expect(r.week).toBe(2));
    });
  });
});
