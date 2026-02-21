import { computeLeaderboard } from "../computeLeaderboard";
import * as SleeperAPI from "../../api/SleeperAPI";
import * as leagueHistory from "../../leagueHistory";
import {
  makeUser,
  makeRoster,
  makeMatchup,
  makeMatchupPair,
} from "../testFixtures/sleeperFixtures";

jest.mock("../../api/SleeperAPI");
jest.mock("../../leagueHistory");

const mockGetUsers = SleeperAPI.getUsers as jest.MockedFunction<typeof SleeperAPI.getUsers>;
const mockGetRosters = SleeperAPI.getRosters as jest.MockedFunction<typeof SleeperAPI.getRosters>;
const mockGetMatchups = SleeperAPI.getMatchups as jest.MockedFunction<
  typeof SleeperAPI.getMatchups
>;
const mockGetAvatarUrl = leagueHistory.getAvatarUrl as jest.MockedFunction<
  typeof leagueHistory.getAvatarUrl
>;

const LEAGUE_ID = "league_123";

beforeEach(() => {
  jest.clearAllMocks();
  mockGetAvatarUrl.mockReturnValue("https://example.com/avatar.jpg");
});

// ---------------------------------------------------------------------------
// Shared fixture setup
// ---------------------------------------------------------------------------
function setupTwoTeamLeague() {
  const user1 = makeUser({ user_id: "user_1", metadata: { team_name: "Team Alpha", avatar: "" } });
  const user2 = makeUser({
    user_id: "user_2",
    display_name: "Beta",
    metadata: { team_name: "", avatar: "" },
  });
  const roster1 = makeRoster({ roster_id: 1, owner_id: "user_1" });
  const roster2 = makeRoster({ roster_id: 2, owner_id: "user_2" });

  mockGetUsers.mockResolvedValue([user1, user2]);
  mockGetRosters.mockResolvedValue([roster1, roster2]);

  return { user1, user2, roster1, roster2 };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe("computeLeaderboard", () => {
  describe("edge cases", () => {
    it("returns empty array when throughWeek is 0", async () => {
      const result = await computeLeaderboard(LEAGUE_ID, 0);
      expect(result).toEqual([]);
      expect(mockGetUsers).not.toHaveBeenCalled();
    });

    it("returns empty array when throughWeek is negative", async () => {
      const result = await computeLeaderboard(LEAGUE_ID, -1);
      expect(result).toEqual([]);
    });
  });

  describe("single week", () => {
    it("correctly computes wins/losses/PF/PA after one week", async () => {
      setupTwoTeamLeague();
      // Team 1 wins 110–90
      mockGetMatchups.mockResolvedValue([...makeMatchupPair({ points1: 110, points2: 90 })]);

      const result = await computeLeaderboard(LEAGUE_ID, 1);

      const winner = result.find((r) => r.Team === "Team Alpha")!;
      const loser = result.find((r) => r.Team === "Beta")!;

      expect(winner.Rank).toBe(1);
      expect(winner.W).toBe(1);
      expect(winner.L).toBe(0);
      expect(winner.PF).toBeCloseTo(110, 1);
      expect(winner.PA).toBeCloseTo(90, 1);

      expect(loser.Rank).toBe(2);
      expect(loser.W).toBe(0);
      expect(loser.L).toBe(1);
      expect(loser.PF).toBeCloseTo(90, 1);
      expect(loser.PA).toBeCloseTo(110, 1);
    });

    it("Trend is 0 for all teams on week 1 (no previous week)", async () => {
      setupTwoTeamLeague();
      mockGetMatchups.mockResolvedValue([...makeMatchupPair({ points1: 100, points2: 80 })]);

      const result = await computeLeaderboard(LEAGUE_ID, 1);

      result.forEach((row) => {
        expect(row.Trend).toBe(0);
      });
    });

    it("handles tied score — no wins or losses awarded", async () => {
      setupTwoTeamLeague();
      mockGetMatchups.mockResolvedValue([...makeMatchupPair({ points1: 100, points2: 100 })]);

      const result = await computeLeaderboard(LEAGUE_ID, 1);

      result.forEach((row) => {
        expect(row.W).toBe(0);
        expect(row.L).toBe(0);
      });
    });
  });

  describe("multi-week trend", () => {
    it("computes positive Trend when team moves up in rankings", async () => {
      setupTwoTeamLeague();

      // Week 1: Team 2 wins (Team 1 rank 2, Team 2 rank 1)
      const week1 = makeMatchupPair({ points1: 80, points2: 120 });
      // Week 2: Team 1 wins big — overtakes via PF tiebreak if needed
      const week2 = makeMatchupPair({ points1: 200, points2: 50 });

      mockGetMatchups.mockResolvedValueOnce([...week1]).mockResolvedValueOnce([...week2]);

      const result = await computeLeaderboard(LEAGUE_ID, 2);

      // Team 1 should now be rank 1 and moved up from rank 2 → Trend = +1
      const team1 = result.find((r) => r.Team === "Team Alpha")!;
      expect(team1.Rank).toBe(1);
      expect(team1.Trend).toBe(1);
    });

    it("computes negative Trend when team drops in rankings", async () => {
      setupTwoTeamLeague();

      const week1 = makeMatchupPair({ points1: 150, points2: 80 }); // Team 1 leads
      const week2 = makeMatchupPair({ points1: 50, points2: 200 }); // Team 2 takes over

      mockGetMatchups.mockResolvedValueOnce([...week1]).mockResolvedValueOnce([...week2]);

      const result = await computeLeaderboard(LEAGUE_ID, 2);

      const team1 = result.find((r) => r.Team === "Team Alpha")!;
      expect(team1.Rank).toBe(2);
      expect(team1.Trend).toBe(-1);
    });
  });

  describe("color interpolation", () => {
    it("returns neutral color #f3f7f3 when all teams have equal PF", async () => {
      setupTwoTeamLeague();
      // Both score the same — min === max triggers neutral branch
      mockGetMatchups.mockResolvedValue([...makeMatchupPair({ points1: 100, points2: 100 })]);

      const result = await computeLeaderboard(LEAGUE_ID, 1);

      result.forEach((row) => {
        expect(row.PFColor).toBe("#f3f7f3");
        expect(row.PAColor).toBe("#f3f7f3");
      });
    });

    it("top PF gets green-ish color, bottom PF gets red-ish color", async () => {
      setupTwoTeamLeague();
      mockGetMatchups.mockResolvedValue([...makeMatchupPair({ points1: 200, points2: 50 })]);

      const result = await computeLeaderboard(LEAGUE_ID, 1);

      const top = result.find((r) => r.PF === 200)!;
      const bottom = result.find((r) => r.PF === 50)!;

      // Green component should be higher for the top scorer
      const topGreen = parseInt(top.PFColor.slice(3, 5), 16);
      const bottomGreen = parseInt(bottom.PFColor.slice(3, 5), 16);
      expect(topGreen).toBeGreaterThan(bottomGreen);
    });
  });

  describe("team name resolution", () => {
    it("uses team_name from metadata when available", async () => {
      const user = makeUser({
        user_id: "user_1",
        metadata: { team_name: "Metadata Team", avatar: "" },
        display_name: "Display Name",
        username: "username",
      });
      mockGetUsers.mockResolvedValue([user]);
      mockGetRosters.mockResolvedValue([makeRoster({ roster_id: 1, owner_id: "user_1" })]);
      mockGetMatchups.mockResolvedValue([makeMatchupPair({ roster1Id: 1, roster2Id: 1 })[0]]);

      const result = await computeLeaderboard(LEAGUE_ID, 1);
      expect(result[0].Team).toBe("Metadata Team");
    });

    it("falls back to display_name when team_name is empty", async () => {
      const user = makeUser({
        user_id: "user_1",
        metadata: { team_name: "", avatar: "" },
        display_name: "FallbackDisplay",
        username: "username",
      });
      mockGetUsers.mockResolvedValue([user]);
      mockGetRosters.mockResolvedValue([makeRoster({ roster_id: 1, owner_id: "user_1" })]);
      mockGetMatchups.mockResolvedValue([makeMatchupPair({ roster1Id: 1, roster2Id: 1 })[0]]);

      const result = await computeLeaderboard(LEAGUE_ID, 1);
      expect(result[0].Team).toBe("FallbackDisplay");
    });

    it("returns Unknown Team when no user is linked to roster", async () => {
      mockGetUsers.mockResolvedValue([]);
      mockGetRosters.mockResolvedValue([makeRoster({ roster_id: 1, owner_id: "orphan_user" })]);
      mockGetMatchups.mockResolvedValue([makeMatchup({ roster_id: 1, matchup_id: 1, points: 50 })]);

      const result = await computeLeaderboard(LEAGUE_ID, 1);
      expect(result[0].Team).toBe("Unknown Team");
    });
  });

  describe("output shape", () => {
    it("returns correct LeaderboardData fields for each row", async () => {
      setupTwoTeamLeague();
      mockGetMatchups.mockResolvedValue([...makeMatchupPair()]);

      const result = await computeLeaderboard(LEAGUE_ID, 1);

      expect(result).toHaveLength(2);
      const row = result[0];
      expect(row).toHaveProperty("Rank");
      expect(row).toHaveProperty("Trend");
      expect(row).toHaveProperty("Team");
      expect(row).toHaveProperty("W");
      expect(row).toHaveProperty("L");
      expect(row).toHaveProperty("PF");
      expect(row).toHaveProperty("PA");
      expect(row).toHaveProperty("PFColor");
      expect(row).toHaveProperty("PAColor");
    });

    it("ranks are sequential starting at 1", async () => {
      setupTwoTeamLeague();
      mockGetMatchups.mockResolvedValue([...makeMatchupPair()]);

      const result = await computeLeaderboard(LEAGUE_ID, 1);

      const ranks = result.map((r) => r.Rank).sort((a, b) => a - b);
      expect(ranks).toEqual([1, 2]);
    });
  });
});
