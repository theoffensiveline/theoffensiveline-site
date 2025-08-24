export const leagueIds = {
  mainLeague: "1253779168802377728",
  walterPicks: "1223730601350135814",
} as const;

export type LeagueId = (typeof leagueIds)[keyof typeof leagueIds];
