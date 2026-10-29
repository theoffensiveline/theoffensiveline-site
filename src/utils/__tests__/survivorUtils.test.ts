import { computeSurvivorResults, type SurvivorPick } from "../survivorUtils";

/* Keep tests hermetic — survivorUtils imports Firestore `db` and the Sleeper
   API at module load. jest.mock is hoisted above the imports. */
jest.mock("../../firebase", () => ({ db: {} }));
jest.mock("../api/SleeperAPI", () => ({
  getMatchups: jest.fn(),
  getNflState: jest.fn(),
  SleeperTeamIdMapping: {},
}));

type WeeklyResults = Parameters<typeof computeSurvivorResults>[2];

const makePick = (userId: string, week: number, teamIdSelected = "1"): SurvivorPick => ({
  id: `${userId}-w${week}`,
  leagueId: "league1",
  userId,
  username: `name-${userId}`,
  week,
  teamIdSelected,
  ownerName: `Owner-${teamIdSelected}`,
  timestamp: { seconds: 0, nanoseconds: 0 } as any,
});

/* Single-matchup week where `winnerRosterId` beat `loserRosterId`. */
const weekResults = (winnerRosterId: number, loserRosterId: number): WeeklyResults[number] => ({
  1: {
    winnerId: String(winnerRosterId),
    team1: { rosterId: winnerRosterId, points: 100 },
    team2: { rosterId: loserRosterId, points: 90 },
  },
});

describe("computeSurvivorResults — missed submissions", () => {
  it("deducts a life for a week with no pick once the deadline has passed", () => {
    const picks = [makePick("u1", 1), makePick("u1", 2)];
    const weeklyResults: WeeklyResults = { 1: weekResults(1, 2), 2: weekResults(1, 3) };

    const { picks: processed, userStatus } = computeSurvivorResults(
      picks,
      4 /* currentWeek */,
      weeklyResults,
      "league1",
      false
    );

    expect(userStatus.u1).toEqual({ lives: 1, isEliminated: false });

    const missed = processed.find((p) => p.week === 3);
    expect(missed).toMatchObject({ status: "loss", missed: true, userId: "u1" });
  });

  it("eliminates a user after two missed weeks", () => {
    const picks = [makePick("u1", 1)];
    const weeklyResults: WeeklyResults = { 1: weekResults(1, 2) };

    const { picks: processed, userStatus } = computeSurvivorResults(
      picks,
      4,
      weeklyResults,
      "league1",
      false
    );

    expect(userStatus.u1).toEqual({ lives: 0, isEliminated: true });
    expect(processed.filter((p) => p.missed).map((p) => p.week)).toEqual([2, 3]);
  });

  it("does not penalize weeks before a user's first pick (late entry)", () => {
    const picks = [makePick("u1", 3)];
    const weeklyResults: WeeklyResults = { 1: weekResults(1, 2), 3: weekResults(1, 4) };

    const { userStatus } = computeSurvivorResults(picks, 4, weeklyResults, "league1", false);

    expect(userStatus.u1).toEqual({ lives: 2, isEliminated: false });
  });

  it("counts the current week as a miss only once its deadline has passed", () => {
    const picks = [makePick("u1", 1), makePick("u1", 2), makePick("u1", 3)];
    const weeklyResults: WeeklyResults = {
      1: weekResults(1, 5),
      2: weekResults(1, 6),
      3: weekResults(1, 7),
    };

    // Deadline not yet passed — no penalty for the current week
    const before = computeSurvivorResults(picks, 4, weeklyResults, "league1", false);
    expect(before.userStatus.u1).toEqual({ lives: 2, isEliminated: false });
    expect(before.picks.some((p) => p.week === 4)).toBe(false);

    // Deadline passed with no pick — costs a life immediately
    const after = computeSurvivorResults(picks, 4, weeklyResults, "league1", true);
    expect(after.userStatus.u1).toEqual({ lives: 1, isEliminated: false });
    expect(after.picks.find((p) => p.week === 4)).toMatchObject({ status: "loss", missed: true });
  });

  it("keeps a real current-week pick pending after the deadline instead of resolving it", () => {
    const picks = [makePick("u1", 1), makePick("u1", 2), makePick("u1", 3), makePick("u1", 4)];
    const weeklyResults: WeeklyResults = {
      1: weekResults(1, 5),
      2: weekResults(1, 6),
      3: weekResults(1, 7),
    };

    const { picks: processed, userStatus } = computeSurvivorResults(
      picks,
      4,
      weeklyResults,
      "league1",
      true
    );

    expect(processed.find((p) => p.week === 4)).toMatchObject({ status: "pending" });
    expect(userStatus.u1).toEqual({ lives: 2, isEliminated: false });
  });

  it("stops accruing missed picks once a user is eliminated", () => {
    // Real losing picks in weeks 1 and 2 eliminate the user; week 3+ show N/A
    const picks = [makePick("u1", 1, "2"), makePick("u1", 2, "2")];
    const weeklyResults: WeeklyResults = { 1: weekResults(1, 2), 2: weekResults(1, 2) };

    const { picks: processed, userStatus } = computeSurvivorResults(
      picks,
      5,
      weeklyResults,
      "league1",
      false
    );

    expect(userStatus.u1).toEqual({ lives: 0, isEliminated: true });
    expect(processed.some((p) => p.missed)).toBe(false);
  });

  it("users who never picked are not participants and get no status", () => {
    const { picks, userStatus } = computeSurvivorResults([], 4, {}, "league1", true);
    expect(picks).toEqual([]);
    expect(userStatus).toEqual({});
  });
});

describe("computeSurvivorResults — pick resolution", () => {
  it("marks wins and losses from matchup results", () => {
    const picks = [
      makePick("u1", 1, "1"), // picked roster 1, which won
      makePick("u1", 2, "2"), // picked roster 2, which lost
      makePick("u1", 5), // future week
    ];
    const weeklyResults: WeeklyResults = { 1: weekResults(1, 2), 2: weekResults(1, 2) };

    const { picks: processed, userStatus } = computeSurvivorResults(
      picks,
      3,
      weeklyResults,
      "league1",
      false
    );

    expect(processed.find((p) => p.week === 1)).toMatchObject({
      status: "win",
      teamScore: 100,
      opponentScore: 90,
    });
    expect(processed.find((p) => p.week === 2)).toMatchObject({ status: "loss" });
    expect(processed.find((p) => p.week === 5)).toMatchObject({ status: "pending" });
    expect(userStatus.u1).toEqual({ lives: 1, isEliminated: false });
  });
});
