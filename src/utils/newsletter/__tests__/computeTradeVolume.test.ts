import { computeTradeVolume } from "../computeTradeVolume";
import * as SleeperAPI from "../../api/SleeperAPI";
import { makeLeague } from "../testFixtures/sleeperFixtures";
import type { Transactions } from "../../../types/sleeperTypes";

jest.mock("../../api/SleeperAPI");

const mockGetLeague = SleeperAPI.getLeague as jest.MockedFunction<typeof SleeperAPI.getLeague>;
const mockGetTransactions = SleeperAPI.getTransactions as jest.MockedFunction<
  typeof SleeperAPI.getTransactions
>;

const CURRENT_ID = "100";
const PREV1_ID = "99";
const PREV2_ID = "98";

function makeTransaction(overrides: Partial<Transactions> = {}): Transactions {
  return {
    type: "trade",
    transaction_id: "tx_1",
    status_updated: 0,
    status: "complete",
    settings: null,
    roster_ids: [1, 2],
    metadata: null,
    leg: 1,
    drops: null,
    draft_picks: [],
    creator: "user_1",
    created: 0,
    consenter_ids: [1, 2],
    adds: { player_1: 2 },
    waiver_budget: [],
    ...overrides,
  };
}

/** League chain: 100 (2025) → 99 (2024) → 98 (2023) → end. */
function setupLeagueChain() {
  mockGetLeague.mockImplementation(async (id) => {
    if (id === CURRENT_ID)
      return makeLeague({
        league_id: CURRENT_ID,
        season: "2025",
        previous_league_id: PREV1_ID,
      });
    if (id === PREV1_ID)
      return makeLeague({
        league_id: PREV1_ID,
        season: "2024",
        previous_league_id: PREV2_ID,
        settings: { ...makeLeague().settings, last_scored_leg: 2 },
      });
    if (id === PREV2_ID)
      return makeLeague({ league_id: PREV2_ID, season: "2023", previous_league_id: "" });
    throw new Error("unknown league");
  });
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe("computeTradeVolume", () => {
  it("returns [] for non-Sleeper leagues", async () => {
    const result = await computeTradeVolume("espn_123", 5);
    expect(result).toEqual([]);
    expect(mockGetLeague).not.toHaveBeenCalled();
  });

  it("returns [] for invalid input", async () => {
    expect(await computeTradeVolume("", 5)).toEqual([]);
    expect(await computeTradeVolume(CURRENT_ID, 0)).toEqual([]);
  });

  it("counts only completed trades that exchange players, cumulatively", async () => {
    setupLeagueChain();
    mockGetTransactions.mockImplementation(async (leagueId, leg) => {
      if (leagueId !== CURRENT_ID) return [];
      if (leg === 1)
        return [makeTransaction({ transaction_id: "a" }), makeTransaction({ transaction_id: "b" })];
      if (leg === 2)
        return [
          /* pick-only trade — no players, excluded */
          makeTransaction({ transaction_id: "c", adds: null }),
          /* FAAB-only trade — empty adds, excluded */
          makeTransaction({ transaction_id: "d", adds: {} }),
          /* waiver claim — not a trade, excluded */
          makeTransaction({ transaction_id: "e", type: "waiver" }),
          /* pending trade — not completed, excluded */
          makeTransaction({ transaction_id: "f", status: "pending" }),
          makeTransaction({ transaction_id: "g" }),
        ];
      return [];
    });

    const result = await computeTradeVolume(CURRENT_ID, 3);
    const current = result.find((s) => s.season === "2025");

    expect(current?.points).toEqual([
      { week: 1, trades: 2 },
      { week: 2, trades: 3 },
      { week: 3, trades: 3 },
    ]);
  });

  it("walks previous_league_id and gives prior seasons their full length", async () => {
    setupLeagueChain();
    mockGetTransactions.mockImplementation(async (leagueId, leg) => {
      if (leagueId === CURRENT_ID) return leg === 1 ? [makeTransaction()] : [];
      if (leagueId === PREV1_ID) return leg === 1 ? [makeTransaction(), makeTransaction()] : [];
      if (leagueId === PREV2_ID) return leg === 2 ? [makeTransaction()] : [];
      return [];
    });

    const result = await computeTradeVolume(CURRENT_ID, 4);

    expect(result.map((s) => s.season)).toEqual(["2025", "2024", "2023"]);
    /* Current season covers only weeks 1..issue week. */
    expect(result[0].points).toHaveLength(4);
    /* Prior seasons use last_scored_leg (2 for 2024) or the 17-week fallback
       for 2023 (last_scored_leg unset in fixture → 0 → fallback). */
    expect(result[1].points).toHaveLength(2);
    expect(result[1].points[1]).toEqual({ week: 2, trades: 2 });
    expect(result[2].points).toHaveLength(17);
    expect(result[2].points[1]).toEqual({ week: 2, trades: 1 });
    expect(result[2].points[16]).toEqual({ week: 17, trades: 1 });
  });

  it("caps the season chain at 4 leagues", async () => {
    /* Extend the chain: 100→99→98→97→96, only the newest 4 are kept. */
    mockGetLeague.mockImplementation(async (id) => {
      const chain: Record<string, { season: string; prev: string }> = {
        "100": { season: "2025", prev: "99" },
        "99": { season: "2024", prev: "98" },
        "98": { season: "2023", prev: "97" },
        "97": { season: "2022", prev: "96" },
        "96": { season: "2021", prev: "" },
      };
      const entry = chain[id];
      if (!entry) throw new Error("unknown league");
      return makeLeague({
        league_id: id,
        season: entry.season,
        previous_league_id: entry.prev,
        settings: { ...makeLeague().settings, last_scored_leg: 1 },
      });
    });
    mockGetTransactions.mockResolvedValue([]);

    const result = await computeTradeVolume("100", 2);
    expect(result.map((s) => s.season)).toEqual(["2025", "2024", "2023", "2022"]);
    expect(mockGetLeague).not.toHaveBeenCalledWith("96");
    /* 4 seasons × bounded weeks — the 2021 league is never fetched. */
    expect(mockGetTransactions).not.toHaveBeenCalledWith("96", expect.anything());
  });

  it("skips a prior season whose league fetch fails", async () => {
    mockGetLeague.mockImplementation(async (id) => {
      if (id === CURRENT_ID)
        return makeLeague({ league_id: CURRENT_ID, season: "2025", previous_league_id: PREV1_ID });
      throw new Error("deleted league");
    });
    mockGetTransactions.mockResolvedValue([]);

    const result = await computeTradeVolume(CURRENT_ID, 2);
    expect(result.map((s) => s.season)).toEqual(["2025"]);
  });
});
