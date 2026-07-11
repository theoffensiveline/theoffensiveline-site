import type { LeagueFeature } from "../../types/firestore";

export const leagueIds = {
  mainLeague: "1253779168802377728",
  walterPicks: "1223730601350135814",
} as const;

export type LeagueId = (typeof leagueIds)[keyof typeof leagueIds];

/**
 * Temporary seed/fallback for league docs that predate the `features` field
 * (issue #94). Used when creating a league doc and when reading one that has
 * no `features` yet. Remove once all docs carry their own flags.
 */
const seedFeatures: Record<string, LeagueFeature[]> = {
  [leagueIds.mainLeague]: [
    "survivor",
    "leaderboards",
    "hotdogs",
    "bylaws",
    "submit",
    "custom-newsletters",
  ],
  [leagueIds.walterPicks]: ["custom-newsletters", "weekly-recaps"],
};

export function getSeedFeatures(leagueId: string): LeagueFeature[] {
  return seedFeatures[leagueId] ?? [];
}
