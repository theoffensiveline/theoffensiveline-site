import { computeEfficiency, calculateOptimalScore } from "../computeEfficiency";
import * as SleeperAPI from "../../api/SleeperAPI";
import * as playerUtils from "../../playerUtils";
import { makeUser, makeRoster, makeMatchup, makeLeague } from "../testFixtures/sleeperFixtures";

jest.mock("../../api/SleeperAPI");
jest.mock("../../playerUtils", () => ({
  sleeperPlayers: {},
}));

const mockGetLeague = SleeperAPI.getLeague as jest.MockedFunction<typeof SleeperAPI.getLeague>;
const mockGetMatchups = SleeperAPI.getMatchups as jest.MockedFunction<typeof SleeperAPI.getMatchups>;
const mockGetRosters = SleeperAPI.getRosters as jest.MockedFunction<typeof SleeperAPI.getRosters>;
const mockGetUsers = SleeperAPI.getUsers as jest.MockedFunction<typeof SleeperAPI.getUsers>;

// We need access to the mutable players map so individual tests can inject
// player data without affecting each other.
const mockPlayers = playerUtils.sleeperPlayers as Record<string, { fantasy_positions: string[]; position: string }>;

const LEAGUE_ID = "league_123";

beforeEach(() => {
  jest.clearAllMocks();
  // Clear the mock players between tests
  Object.keys(mockPlayers).forEach((k) => delete mockPlayers[k]);
});

// ---------------------------------------------------------------------------
// calculateOptimalScore (pure function — no mocks needed)
// ---------------------------------------------------------------------------
describe("calculateOptimalScore", () => {
  it("scores zero when player pool is empty", () => {
    const matchup = makeMatchup({ players: [], players_points: {} });
    expect(calculateOptimalScore(matchup, ["QB", "RB", "WR", "BN"])).toBe(0);
  });

  it("fills position-locked slots with highest-scoring eligible players", () => {
    mockPlayers["p_qb"] = { fantasy_positions: ["QB"], position: "QB" };
    mockPlayers["p_rb"] = { fantasy_positions: ["RB"], position: "RB" };
    mockPlayers["p_wr"] = { fantasy_positions: ["WR"], position: "WR" };

    const matchup = makeMatchup({
      players: ["p_qb", "p_rb", "p_wr"],
      players_points: { p_qb: 25, p_rb: 20, p_wr: 15 },
    });

    const score = calculateOptimalScore(matchup, ["QB", "RB", "WR"]);
    expect(score).toBeCloseTo(25 + 20 + 15, 5);
  });

  it("ignores BN and IR slots", () => {
    mockPlayers["p_qb"] = { fantasy_positions: ["QB"], position: "QB" };

    const matchup = makeMatchup({
      players: ["p_qb"],
      players_points: { p_qb: 30 },
    });

    // Only BN slots — nothing should be started
    const score = calculateOptimalScore(matchup, ["BN", "IR"]);
    expect(score).toBe(0);
  });

  it("fills FLEX slot with best remaining RB/WR/TE", () => {
    mockPlayers["p_rb1"] = { fantasy_positions: ["RB"], position: "RB" };
    mockPlayers["p_rb2"] = { fantasy_positions: ["RB"], position: "RB" };

    const matchup = makeMatchup({
      players: ["p_rb1", "p_rb2"],
      players_points: { p_rb1: 18, p_rb2: 12 },
    });

    // One locked RB slot + one FLEX
    const score = calculateOptimalScore(matchup, ["RB", "FLEX"]);
    // rb1 goes to RB slot (18), rb2 goes to FLEX (12)
    expect(score).toBeCloseTo(18 + 12, 5);
  });

  it("fills SUPER_FLEX with best remaining QB/RB/WR/TE", () => {
    mockPlayers["p_qb1"] = { fantasy_positions: ["QB"], position: "QB" };
    mockPlayers["p_qb2"] = { fantasy_positions: ["QB"], position: "QB" };

    const matchup = makeMatchup({
      players: ["p_qb1", "p_qb2"],
      players_points: { p_qb1: 35, p_qb2: 22 },
    });

    const score = calculateOptimalScore(matchup, ["QB", "SUPER_FLEX"]);
    // qb1 → QB, qb2 → SUPER_FLEX
    expect(score).toBeCloseTo(35 + 22, 5);
  });

  it("prefers higher-scoring player in flex over lower-scoring", () => {
    mockPlayers["p_wr_high"] = { fantasy_positions: ["WR"], position: "WR" };
    mockPlayers["p_wr_low"] = { fantasy_positions: ["WR"], position: "WR" };
    mockPlayers["p_rb"] = { fantasy_positions: ["RB"], position: "RB" };

    const matchup = makeMatchup({
      players: ["p_wr_high", "p_wr_low", "p_rb"],
      players_points: { p_wr_high: 30, p_wr_low: 10, p_rb: 20 },
    });

    // 1 WR slot + 1 RB slot + 1 FLEX
    const score = calculateOptimalScore(matchup, ["WR", "RB", "FLEX"]);
    // WR slot: p_wr_high (30), RB slot: p_rb (20), FLEX: p_wr_low (10)
    expect(score).toBeCloseTo(30 + 20 + 10, 5);
  });

  it("unknown player IDs contribute 0 points but don't crash", () => {
    // p_unknown not in mockPlayers — getPlayerPosition returns null
    const matchup = makeMatchup({
      players: ["p_unknown"],
      players_points: { p_unknown: 99 },
    });

    const score = calculateOptimalScore(matchup, ["QB"]);
    expect(score).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// computeEfficiency (async — requires all four API mocks)
// ---------------------------------------------------------------------------
describe("computeEfficiency", () => {
  function setupLeague() {
    const league = makeLeague({
      roster_positions: ["QB", "RB", "WR", "WR", "TE", "FLEX", "BN", "BN"],
    });
    const user = makeUser({ user_id: "user_1", metadata: { team_name: "Test Team", avatar: "" } });
    const roster = makeRoster({ roster_id: 1, owner_id: "user_1" });

    mockGetLeague.mockResolvedValue(league);
    mockGetUsers.mockResolvedValue([user]);
    mockGetRosters.mockResolvedValue([roster]);

    return { league, user, roster };
  }

  it("returns one row per matchup entry", async () => {
    setupLeague();
    mockGetMatchups.mockResolvedValue([
      makeMatchup({ roster_id: 1, matchup_id: 1, points: 100, players: [], players_points: {} }),
    ]);

    const result = await computeEfficiency(LEAGUE_ID, 1);
    expect(result).toHaveLength(1);
  });

  it("computes percentage as 100 when maxPoints is 0 (empty roster)", async () => {
    setupLeague();
    mockGetMatchups.mockResolvedValue([
      makeMatchup({ roster_id: 1, matchup_id: 1, points: 0, players: [], players_points: {} }),
    ]);

    const result = await computeEfficiency(LEAGUE_ID, 1);
    expect(result[0].percentage).toBe(100);
    expect(result[0].max_points).toBe(0);
  });

  it("calculates percentage correctly when maxPoints > 0", async () => {
    setupLeague();

    mockPlayers["p_qb"] = { fantasy_positions: ["QB"], position: "QB" };

    mockGetMatchups.mockResolvedValue([
      makeMatchup({
        roster_id: 1,
        matchup_id: 1,
        points: 20,
        players: ["p_qb"],
        players_points: { p_qb: 25 },
      }),
    ]);

    const result = await computeEfficiency(LEAGUE_ID, 1);
    // maxPoints = 25 (QB slot), actualPoints = 20, percentage = 80%
    expect(result[0].actual_points).toBe(20);
    expect(result[0].max_points).toBe(25);
    expect(result[0].percentage).toBeCloseTo(80, 1);
  });

  it("includes week number in result", async () => {
    setupLeague();
    mockGetMatchups.mockResolvedValue([
      makeMatchup({ roster_id: 1, matchup_id: 1, points: 100, players: [], players_points: {} }),
    ]);

    const result = await computeEfficiency(LEAGUE_ID, 7);
    expect(result[0].week).toBe(7);
  });

  it("uses Unknown Team when no user is linked to a roster", async () => {
    const league = makeLeague();
    mockGetLeague.mockResolvedValue(league);
    mockGetUsers.mockResolvedValue([]);
    mockGetRosters.mockResolvedValue([makeRoster({ roster_id: 1, owner_id: "nobody" })]);
    mockGetMatchups.mockResolvedValue([
      makeMatchup({ roster_id: 1, matchup_id: 1, points: 50, players: [], players_points: {} }),
    ]);

    const result = await computeEfficiency(LEAGUE_ID, 1);
    expect(result[0].team_name).toBe("Unknown Team");
  });

  it("returns correct output shape", async () => {
    setupLeague();
    mockGetMatchups.mockResolvedValue([
      makeMatchup({ roster_id: 1, matchup_id: 1, points: 100, players: [], players_points: {} }),
    ]);

    const result = await computeEfficiency(LEAGUE_ID, 1);
    const row = result[0];
    expect(row).toHaveProperty("week");
    expect(row).toHaveProperty("team_name");
    expect(row).toHaveProperty("actual_points");
    expect(row).toHaveProperty("max_points");
    expect(row).toHaveProperty("percentage");
  });
});
