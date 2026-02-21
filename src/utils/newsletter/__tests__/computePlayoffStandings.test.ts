import { computePlayoffStandings } from "../computePlayoffStandings";
import * as SleeperAPI from "../../api/SleeperAPI";
import {
  makeUser,
  makeRoster,
  makeLeague,
  makeMatchupPair,
  makeMatchup,
} from "../testFixtures/sleeperFixtures";

jest.mock("../../api/SleeperAPI");

const mockGetLeague = SleeperAPI.getLeague as jest.MockedFunction<typeof SleeperAPI.getLeague>;
const mockGetUsers = SleeperAPI.getUsers as jest.MockedFunction<typeof SleeperAPI.getUsers>;
const mockGetRosters = SleeperAPI.getRosters as jest.MockedFunction<typeof SleeperAPI.getRosters>;
const mockGetMatchups = SleeperAPI.getMatchups as jest.MockedFunction<
  typeof SleeperAPI.getMatchups
>;

const LEAGUE_ID = "league_123";

beforeEach(() => {
  jest.clearAllMocks();
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Build an N-team league where week 1 matchup results are provided.
 * Remaining rosters score 0 points with bye-week placeholder matchups.
 */
function setupLeague(
  opts: {
    numTeams?: number;
    playoffWeekStart?: number;
    playoffTeams?: number;
  } = {}
) {
  const { numTeams = 4, playoffWeekStart = 5, playoffTeams = 2 } = opts;

  const league = makeLeague({
    settings: {
      ...makeLeague().settings,
      playoff_week_start: playoffWeekStart,
      playoff_teams: playoffTeams,
      num_teams: numTeams,
    },
  });

  const users = Array.from({ length: numTeams }, (_, i) =>
    makeUser({
      user_id: `user_${i + 1}`,
      metadata: { team_name: `Team ${i + 1}`, avatar: "" },
    })
  );

  const rosters = Array.from({ length: numTeams }, (_, i) =>
    makeRoster({ roster_id: i + 1, owner_id: `user_${i + 1}` })
  );

  mockGetLeague.mockResolvedValue(league);
  mockGetUsers.mockResolvedValue(users);
  mockGetRosters.mockResolvedValue(rosters);

  return { league, users, rosters };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe("computePlayoffStandings", () => {
  describe("edge cases", () => {
    it("returns empty array when currentWeek is 0", async () => {
      const result = await computePlayoffStandings(LEAGUE_ID, 0);
      expect(result).toEqual([]);
      expect(mockGetLeague).not.toHaveBeenCalled();
    });

    it("returns empty array when currentWeek is negative", async () => {
      const result = await computePlayoffStandings(LEAGUE_ID, -1);
      expect(result).toEqual([]);
    });
  });

  describe("output shape", () => {
    it("returns correct PlayoffTableData fields", async () => {
      setupLeague();
      // 4-team league, 2 matchups week 1
      mockGetMatchups.mockResolvedValue([
        ...makeMatchupPair({ matchupId: 1, roster1Id: 1, roster2Id: 2, points1: 120, points2: 90 }),
        ...makeMatchupPair({ matchupId: 2, roster1Id: 3, roster2Id: 4, points1: 110, points2: 80 }),
      ]);

      const result = await computePlayoffStandings(LEAGUE_ID, 1);

      expect(result).toHaveLength(4);
      const row = result[0];
      expect(row).toHaveProperty("Rank");
      expect(row).toHaveProperty("Team");
      expect(row).toHaveProperty("W");
      expect(row).toHaveProperty("L");
      expect(row).toHaveProperty("Play-off %");
      expect(row).toHaveProperty("Play-off #");
      expect(row).toHaveProperty("Last %");
      expect(row).toHaveProperty("Last #");
      expect(row).toHaveProperty("PlayoffColor");
      expect(row).toHaveProperty("PlayoffMagicColor");
      expect(row).toHaveProperty("LastColor");
      expect(row).toHaveProperty("LastMagicColor");
    });

    it("ranks are sequential starting at 1", async () => {
      setupLeague();
      mockGetMatchups.mockResolvedValue([
        ...makeMatchupPair({ matchupId: 1, roster1Id: 1, roster2Id: 2, points1: 120, points2: 90 }),
        ...makeMatchupPair({ matchupId: 2, roster1Id: 3, roster2Id: 4, points1: 110, points2: 80 }),
      ]);

      const result = await computePlayoffStandings(LEAGUE_ID, 1);
      const ranks = result.map((r) => r.Rank).sort((a, b) => a - b);
      expect(ranks).toEqual([1, 2, 3, 4]);
    });
  });

  describe("standings computation", () => {
    it("correctly records wins and losses", async () => {
      setupLeague({ numTeams: 2, playoffTeams: 1 });
      // Team 1 beats Team 2
      mockGetMatchups.mockResolvedValue([
        ...makeMatchupPair({ roster1Id: 1, roster2Id: 2, points1: 150, points2: 80 }),
      ]);

      const result = await computePlayoffStandings(LEAGUE_ID, 1);
      const winner = result.find((r) => r.Team === "Team 1")!;
      const loser = result.find((r) => r.Team === "Team 2")!;

      expect(winner.W).toBe(1);
      expect(winner.L).toBe(0);
      expect(loser.W).toBe(0);
      expect(loser.L).toBe(1);
    });

    it("handles tied score — no win/loss recorded", async () => {
      setupLeague({ numTeams: 2, playoffTeams: 1 });
      mockGetMatchups.mockResolvedValue([
        ...makeMatchupPair({ roster1Id: 1, roster2Id: 2, points1: 100, points2: 100 }),
      ]);

      const result = await computePlayoffStandings(LEAGUE_ID, 1);
      result.forEach((row) => {
        expect(row.W).toBe(0);
        expect(row.L).toBe(0);
      });
    });
  });

  describe("magic numbers", () => {
    it("assigns CLINCHED to team that cannot be displaced with remaining games", async () => {
      // 2-team league, playoff_week_start = 3 → totalWeeks = 2
      // After week 2, no games remain — team with 2 wins is clinched
      setupLeague({ numTeams: 2, playoffWeekStart: 3, playoffTeams: 1 });

      // Week 1: Team 1 wins
      const week1 = makeMatchupPair({ roster1Id: 1, roster2Id: 2, points1: 120, points2: 90 });
      // Week 2: Team 1 wins again
      const week2 = makeMatchupPair({ roster1Id: 1, roster2Id: 2, points1: 110, points2: 80 });

      mockGetMatchups.mockResolvedValueOnce([...week1]).mockResolvedValueOnce([...week2]);

      const result = await computePlayoffStandings(LEAGUE_ID, 2);
      const team1 = result.find((r) => r.Team === "Team 1")!;
      expect(team1["Play-off #"]).toBe("CLINCHED");
    });

    it("assigns ELIMINATED to team that cannot reach playoffs", async () => {
      // 2-team league, 1 playoff spot, 2 total weeks
      // After week 2, Team 2 has 0 wins → ELIMINATED
      setupLeague({ numTeams: 2, playoffWeekStart: 3, playoffTeams: 1 });

      const week1 = makeMatchupPair({ roster1Id: 1, roster2Id: 2, points1: 120, points2: 90 });
      const week2 = makeMatchupPair({ roster1Id: 1, roster2Id: 2, points1: 110, points2: 80 });

      mockGetMatchups.mockResolvedValueOnce([...week1]).mockResolvedValueOnce([...week2]);

      const result = await computePlayoffStandings(LEAGUE_ID, 2);
      const team2 = result.find((r) => r.Team === "Team 2")!;
      expect(team2["Play-off #"]).toBe("ELIMINATED");
    });

    it("assigns SAFE to the leader when they cannot possibly finish last", async () => {
      // 2-team league, 2 total weeks (playoffWeekStart=3), currentWeek=2 → no games remaining.
      // Team 1 won both weeks (2W-0L). Their Last # = gamesRemaining - (lastPlaceLosses - wins_lead - 1)
      // = 0 - (2 - 0 - 1) = -1 → SAFE
      setupLeague({ numTeams: 2, playoffWeekStart: 3, playoffTeams: 1 });

      const week1 = makeMatchupPair({ roster1Id: 1, roster2Id: 2, points1: 120, points2: 90 });
      const week2 = makeMatchupPair({ roster1Id: 1, roster2Id: 2, points1: 110, points2: 80 });

      mockGetMatchups.mockResolvedValueOnce([...week1]).mockResolvedValueOnce([...week2]);

      const result = await computePlayoffStandings(LEAGUE_ID, 2);
      const leader = result[0]; // Team 1 (2W-0L) — safely cannot finish last
      expect(leader["Last #"]).toBe("SAFE");
    });
  });

  describe("probability fields", () => {
    it("Play-off % is between 0 and 100 for all teams", async () => {
      setupLeague();
      mockGetMatchups.mockResolvedValue([
        ...makeMatchupPair({ matchupId: 1, roster1Id: 1, roster2Id: 2, points1: 120, points2: 90 }),
        ...makeMatchupPair({ matchupId: 2, roster1Id: 3, roster2Id: 4, points1: 110, points2: 80 }),
      ]);

      const result = await computePlayoffStandings(LEAGUE_ID, 1);
      result.forEach((row) => {
        expect(row["Play-off %"]).toBeGreaterThanOrEqual(0);
        expect(row["Play-off %"]).toBeLessThanOrEqual(100);
      });
    });

    it("Last % is between 0 and 100 for all teams", async () => {
      setupLeague();
      mockGetMatchups.mockResolvedValue([
        ...makeMatchupPair({ matchupId: 1, roster1Id: 1, roster2Id: 2, points1: 120, points2: 90 }),
        ...makeMatchupPair({ matchupId: 2, roster1Id: 3, roster2Id: 4, points1: 110, points2: 80 }),
      ]);

      const result = await computePlayoffStandings(LEAGUE_ID, 1);
      result.forEach((row) => {
        expect(row["Last %"]).toBeGreaterThanOrEqual(0);
        expect(row["Last %"]).toBeLessThanOrEqual(100);
      });
    });

    it("leading team has higher playoff % than last place team", async () => {
      setupLeague({ numTeams: 4, playoffTeams: 2, playoffWeekStart: 7 });
      // Give Team 1 a large enough points advantage to ensure it leads
      mockGetMatchups.mockResolvedValue([
        ...makeMatchupPair({ matchupId: 1, roster1Id: 1, roster2Id: 2, points1: 200, points2: 50 }),
        ...makeMatchupPair({ matchupId: 2, roster1Id: 3, roster2Id: 4, points1: 180, points2: 60 }),
      ]);

      const result = await computePlayoffStandings(LEAGUE_ID, 1);
      const first = result[0];
      const last = result[result.length - 1];
      expect(first["Play-off %"]).toBeGreaterThanOrEqual(last["Play-off %"]);
    });
  });

  describe("color fields", () => {
    it("CLINCHED team gets green PlayoffMagicColor", async () => {
      setupLeague({ numTeams: 2, playoffWeekStart: 3, playoffTeams: 1 });
      const week1 = makeMatchupPair({ roster1Id: 1, roster2Id: 2, points1: 120, points2: 90 });
      const week2 = makeMatchupPair({ roster1Id: 1, roster2Id: 2, points1: 110, points2: 80 });
      mockGetMatchups.mockResolvedValueOnce([...week1]).mockResolvedValueOnce([...week2]);

      const result = await computePlayoffStandings(LEAGUE_ID, 2);
      const clinched = result.find((r) => r["Play-off #"] === "CLINCHED")!;
      expect(clinched.PlayoffMagicColor).toBe("#227740");
    });

    it("ELIMINATED team gets red PlayoffMagicColor", async () => {
      setupLeague({ numTeams: 2, playoffWeekStart: 3, playoffTeams: 1 });
      const week1 = makeMatchupPair({ roster1Id: 1, roster2Id: 2, points1: 120, points2: 90 });
      const week2 = makeMatchupPair({ roster1Id: 1, roster2Id: 2, points1: 110, points2: 80 });
      mockGetMatchups.mockResolvedValueOnce([...week1]).mockResolvedValueOnce([...week2]);

      const result = await computePlayoffStandings(LEAGUE_ID, 2);
      const eliminated = result.find((r) => r["Play-off #"] === "ELIMINATED")!;
      expect(eliminated.PlayoffMagicColor).toBe("#bc293d");
    });

    it("SAFE last-place team gets green LastMagicColor", async () => {
      setupLeague({ numTeams: 2, playoffWeekStart: 3, playoffTeams: 1 });
      const week1 = makeMatchupPair({ roster1Id: 1, roster2Id: 2, points1: 120, points2: 90 });
      const week2 = makeMatchupPair({ roster1Id: 1, roster2Id: 2, points1: 110, points2: 80 });
      mockGetMatchups.mockResolvedValueOnce([...week1]).mockResolvedValueOnce([...week2]);

      const result = await computePlayoffStandings(LEAGUE_ID, 2);
      const safe = result.find((r) => r["Last #"] === "SAFE")!;
      expect(safe.LastMagicColor).toBe("#227740");
    });
  });
});
