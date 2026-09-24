import { trimLeagueResponse } from "../ESPNApi";
import type { ESPNLeagueResponse } from "../../../types/espnTypes";

// Build a realistic fat ESPN response: 10 teams x 20 players, each player with
// 18 periods x 2 stat sources plus the junk fields ESPN includes.
function fatResponse(): ESPNLeagueResponse {
  const entries = Array.from({ length: 20 }, (_, i) => ({
    playerId: 1000 + i,
    lineupSlotId: i < 9 ? i : 20,
    acquisitionDate: 1700000000000,
    acquisitionType: "DRAFT",
    injuryStatus: "NORMAL",
    status: "ONTEAM",
    playerPoolEntry: {
      appliedStatTotal: 123.4,
      playerId: 1000 + i,
      id: 1000 + i,
      onTeamId: 1,
      keeperValue: 0,
      lineupLocked: false,
      rosterLocked: false,
      status: "ONTEAM",
      tradeLocked: false,
      player: {
        id: 1000 + i,
        fullName: `Player ${i}`,
        defaultPositionId: 2,
        proTeamId: 5,
        injured: false,
        ownership: { percentOwned: 99.1, percentStarted: 80.2 },
        rankings: { 0: [{ rank: 12 }] },
        stats: Array.from({ length: 18 }, (_, w) => [
          {
            appliedTotal: w + 1.5,
            statSourceId: 0,
            scoringPeriodId: w + 1,
            proTeamId: 5,
            stats: { "24": 100.5, "25": 1 },
          },
          {
            appliedTotal: w + 2.5,
            statSourceId: 1,
            scoringPeriodId: w + 1,
            proTeamId: 5,
            stats: { "24": 99.9 },
          },
        ]).flat(),
      },
      ratings: { 0: { totalRating: 10, totalRanking: 5 } },
    },
  }));

  return {
    id: 1262381848,
    seasonId: 2026,
    scoringPeriodId: 3,
    settings: {
      name: "Test League",
      size: 10,
      scheduleSettings: {
        matchupPeriodCount: 14,
        playoffMatchupPeriodLength: 2,
        matchupPeriods: {},
      },
      scoringSettings: { scoringItems: [{ statId: 3, points: 0.04 }] },
      rosterSettings: { lineupSlotCounts: { "0": 1 }, positionLimits: {} },
    } as any,
    members: [
      { id: "{ABC}", displayName: "user1", firstName: "A", lastName: "B", junk: "x" } as any,
    ],
    teams: Array.from({ length: 10 }, (_, t) => ({
      id: t + 1,
      name: `Team ${t}`,
      abbrev: `T${t}`,
      logo: "http://logo",
      primaryOwner: "{ABC}",
      record: { overall: { wins: t, losses: 1, ties: 0, pointsFor: 1000, pointsAgainst: 900 } },
      valuesByStat: { "1": 5 },
      waiverRank: 3,
      roster: { entries, appliedStatTotal: 500 },
    })) as any,
    schedule: Array.from({ length: 45 }, (_, i) => ({
      id: i,
      matchupPeriodId: (i % 15) + 1,
      winner: "HOME" as const,
      playoffTierType: "NONE" as const,
      home: {
        teamId: 1,
        totalPoints: 100.5,
        rosterForCurrentScoringPeriod: { entries },
        rosterForMatchupPeriod: { entries },
      },
      away: { teamId: 2, totalPoints: 90.5, rosterForCurrentScoringPeriod: { entries } },
    })),
  } as ESPNLeagueResponse;
}

test("trim shrinks payload well under 1 MiB and keeps consumed fields", () => {
  const raw = fatResponse();
  const rawSize = JSON.stringify(raw).length;
  const trimmed = trimLeagueResponse(raw);
  const trimmedSize = JSON.stringify(trimmed).length;
  console.log(
    `raw: ${(rawSize / 1024).toFixed(0)} KB -> trimmed: ${(trimmedSize / 1024).toFixed(0)} KB`
  );

  expect(trimmedSize).toBeLessThan(1024 * 1024);
  expect(trimmedSize).toBeLessThan(rawSize / 5);

  expect(trimmed.seasonId).toBe(2026);
  expect(trimmed.scoringPeriodId).toBe(3);
  expect(trimmed.settings.name).toBe("Test League");
  expect(trimmed.members[0].displayName).toBe("user1");
  expect(trimmed.teams[0].record.overall.pointsFor).toBe(1000);
  const e0 = trimmed.teams[0].roster!.entries[0];
  expect(e0.playerId).toBe(1000);
  expect(e0.lineupSlotId).toBe(0);
  expect(e0.playerPoolEntry!.player!.fullName).toBe("Player 0");
  const stats = e0.playerPoolEntry!.player!.stats!;
  expect(stats.every((s) => s.statSourceId === 0)).toBe(true);
  expect(stats).toHaveLength(18);
  expect(Object.keys(stats[0]).sort()).toEqual(["appliedTotal", "scoringPeriodId", "statSourceId"]);
  expect(trimmed.schedule[0].home!.teamId).toBe(1);
  expect(trimmed.schedule[0].home!.totalPoints).toBe(100.5);
  expect((trimmed.schedule[0].home as any).rosterForCurrentScoringPeriod).toBeUndefined();
  expect(trimmed.schedule[0].matchupPeriodId).toBe(1);
});
