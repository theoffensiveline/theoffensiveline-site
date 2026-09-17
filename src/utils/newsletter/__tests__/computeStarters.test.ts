import { computeStarters } from "../computeStarters";
import * as FantasyAPI from "../../api/FantasyAPI";
import { makeUser, makeRoster, makeMatchup } from "../testFixtures/sleeperFixtures";

jest.mock("../../api/FantasyAPI");

const mockGetMatchups = FantasyAPI.getMatchups as jest.MockedFunction<
  typeof FantasyAPI.getMatchups
>;
const mockGetRosters = FantasyAPI.getRosters as jest.MockedFunction<typeof FantasyAPI.getRosters>;
const mockGetUsers = FantasyAPI.getUsers as jest.MockedFunction<typeof FantasyAPI.getUsers>;
const mockGetPlayers = FantasyAPI.getPlayers as jest.MockedFunction<typeof FantasyAPI.getPlayers>;

const LEAGUE_ID = "league_123";

const PLAYERS = {
  "100": { full_name: "Bijan Robinson", position: "RB", fantasy_positions: ["RB"] },
  "200": { full_name: "Justin Herbert", position: "QB", fantasy_positions: ["QB"] },
};

beforeEach(() => {
  jest.clearAllMocks();
  mockGetPlayers.mockResolvedValue(PLAYERS);
});

function setup(
  overrides: { metadata?: Record<string, string>; player_map?: Record<string, string> | null } = {}
) {
  const user = makeUser({
    user_id: "user_1",
    metadata: { team_name: "Team Alpha", avatar: "avatar_a" },
  });
  const roster = makeRoster({
    roster_id: 1,
    owner_id: "user_1",
    metadata: overrides.metadata ?? {},
    player_map: overrides.player_map ?? null,
  });

  mockGetUsers.mockResolvedValue([user]);
  mockGetRosters.mockResolvedValue([roster]);
  mockGetMatchups.mockResolvedValue([
    makeMatchup({
      roster_id: 1,
      matchup_id: 1,
      points: 31,
      starters: ["100", "200"],
      starters_points: [5.8, 25.28],
    }),
  ]);
}

describe("computeStarters", () => {
  it("returns one StartersData per matchup entry with sorted players", async () => {
    setup();

    const result = await computeStarters(LEAGUE_ID, 8);
    expect(result).toHaveLength(1);
    expect(result[0].team_name).toBe("Team Alpha");
    // Sorted by points descending
    expect(result[0].entries.map((e) => e.full_name)).toEqual(["Justin Herbert", "Bijan Robinson"]);
  });

  it("attaches nicknames from roster metadata p_nick_{playerId} keys", async () => {
    setup({ metadata: { p_nick_100: "Mike Ehrmantraut" } });

    const result = await computeStarters(LEAGUE_ID, 8);
    const bijan = result[0].entries.find((e) => e.full_name === "Bijan Robinson")!;
    const herbert = result[0].entries.find((e) => e.full_name === "Justin Herbert")!;

    expect(bijan.nickname).toBe("Mike Ehrmantraut");
    expect(herbert.nickname).toBeUndefined();
  });

  it("falls back to player_map when no metadata nickname exists", async () => {
    setup({ player_map: { "200": "Walter White" } });

    const result = await computeStarters(LEAGUE_ID, 8);
    const herbert = result[0].entries.find((e) => e.full_name === "Justin Herbert")!;
    expect(herbert.nickname).toBe("Walter White");
  });

  it("prefers metadata p_nick_ over player_map when both exist", async () => {
    setup({
      metadata: { p_nick_200: "Heisenberg" },
      player_map: { "200": "Walter White" },
    });

    const result = await computeStarters(LEAGUE_ID, 8);
    const herbert = result[0].entries.find((e) => e.full_name === "Justin Herbert")!;
    expect(herbert.nickname).toBe("Heisenberg");
  });

  it("leaves nickname undefined when roster has neither metadata nor player_map", async () => {
    setup();

    const result = await computeStarters(LEAGUE_ID, 8);
    result[0].entries.forEach((e) => expect(e.nickname).toBeUndefined());
  });
});
