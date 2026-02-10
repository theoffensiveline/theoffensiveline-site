import { useQueries, UseQueryResult } from "@tanstack/react-query";
import { computeWeeklyAwards, WeeklyAward } from "../utils/awards/computeWeeklyAwards";
import { computeLeaderboard } from "../utils/newsletter/computeLeaderboard";
import { computeStarters } from "../utils/newsletter/computeStarters";
import { computeEfficiency } from "../utils/newsletter/computeEfficiency";
import { computeBestBall } from "../utils/newsletter/computeBestBall";
import { computeMedian } from "../utils/newsletter/computeMedian";
import { computePowerRankings } from "../utils/newsletter/computePowerRankings";
import { computePlayoffStandings } from "../utils/newsletter/computePlayoffStandings";
import { computeSchedule } from "../utils/newsletter/computeSchedule";
import type {
  BestBallData,
  EfficiencyData,
  LeaderboardData,
  MedianData,
  PowerRankingsData,
  PlayoffTableData,
  ScheduleData,
  StartersData,
} from "../types/newsletterTypes";

/**
 * Query keys for newsletter data caching
 */
export const newsletterQueryKeys = {
  all: (leagueId: string, week: number) => ["newsletter", leagueId, week] as const,
  awards: (leagueId: string, week: number) =>
    [...newsletterQueryKeys.all(leagueId, week), "awards"] as const,
  leaderboard: (leagueId: string, week: number) =>
    [...newsletterQueryKeys.all(leagueId, week), "leaderboard"] as const,
  starters: (leagueId: string, week: number) =>
    [...newsletterQueryKeys.all(leagueId, week), "starters"] as const,
  efficiency: (leagueId: string, week: number) =>
    [...newsletterQueryKeys.all(leagueId, week), "efficiency"] as const,
  bestBall: (leagueId: string, week: number) =>
    [...newsletterQueryKeys.all(leagueId, week), "bestBall"] as const,
  median: (leagueId: string, week: number) =>
    [...newsletterQueryKeys.all(leagueId, week), "median"] as const,
  powerRankings: (leagueId: string, week: number) =>
    [...newsletterQueryKeys.all(leagueId, week), "powerRankings"] as const,
  playoffStandings: (leagueId: string, week: number) =>
    [...newsletterQueryKeys.all(leagueId, week), "playoffStandings"] as const,
  schedule: (leagueId: string, week: number) =>
    [...newsletterQueryKeys.all(leagueId, week), "schedule"] as const,
};

/**
 * Section data structure returned by the hook
 */
export interface SectionResult<T> {
  data: T | undefined;
  status: "pending" | "error" | "success";
  error: Error | null;
  isLoading: boolean;
  refetch: () => Promise<UseQueryResult<T, Error>>;
}

/**
 * Newsletter data hook return type
 */
export interface NewsletterData {
  awards: SectionResult<WeeklyAward[]>;
  leaderboard: SectionResult<LeaderboardData[]>;
  starters: SectionResult<StartersData[]>;
  efficiency: SectionResult<EfficiencyData[]>;
  bestBall: SectionResult<BestBallData[]>;
  median: SectionResult<MedianData[]>;
  powerRankings: SectionResult<PowerRankingsData[]>;
  playoffStandings: SectionResult<PlayoffTableData[]>;
  schedule: SectionResult<ScheduleData>;
  // Aggregate helpers
  isLoadingAny: boolean;
  hasErrors: boolean;
  readySections: number;
  totalSections: number;
}

/**
 * Helper to transform UseQueryResult to SectionResult
 */
function toSectionResult<T>(
  queryResult: UseQueryResult<T, Error>
): SectionResult<T> {
  return {
    data: queryResult.data,
    status: queryResult.status,
    error: queryResult.error,
    isLoading: queryResult.isLoading || queryResult.isPending,
    refetch: queryResult.refetch,
  };
}

/**
 * Custom hook to fetch all newsletter data using React Query
 *
 * @param leagueId - Sleeper league ID
 * @param week - Week number to fetch data for
 * @returns Newsletter data with loading states and helpers
 *
 * @throws Error if leagueId or week is invalid
 *
 * @example
 * ```tsx
 * const newsletter = useNewsletterData("123456", 10);
 *
 * if (newsletter.isLoadingAny) {
 *   return <LoadingSpinner />;
 * }
 *
 * if (newsletter.hasErrors) {
 *   return <ErrorMessage />;
 * }
 *
 * return <AwardsGridV2 awardsData={newsletter.awards.data} />;
 * ```
 */
export function useNewsletterData(
  leagueId: string | undefined,
  week: number
): NewsletterData {
  // Validation - don't throw errors to avoid breaking React Hook rules
  // Instead, disable queries if invalid
  const enabled = !!leagueId && Number.isFinite(week) && week > 0;

  // Safe leagueId for query functions (with fallback to avoid undefined errors)
  const safeLeagueId = leagueId || "";

  // Fetch all sections in parallel using useQueries
  const queries = useQueries({
    queries: [
      {
        queryKey: newsletterQueryKeys.awards(safeLeagueId, week),
        queryFn: () => computeWeeklyAwards(safeLeagueId, week),
        enabled,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
      },
      {
        queryKey: newsletterQueryKeys.leaderboard(safeLeagueId, week),
        queryFn: () => computeLeaderboard(safeLeagueId, week),
        enabled,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      },
      {
        queryKey: newsletterQueryKeys.starters(safeLeagueId, week),
        queryFn: () => computeStarters(safeLeagueId, week),
        enabled,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      },
      {
        queryKey: newsletterQueryKeys.efficiency(safeLeagueId, week),
        queryFn: () => computeEfficiency(safeLeagueId, week),
        enabled,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      },
      {
        queryKey: newsletterQueryKeys.bestBall(safeLeagueId, week),
        queryFn: () => computeBestBall(safeLeagueId, week),
        enabled,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      },
      {
        queryKey: newsletterQueryKeys.median(safeLeagueId, week),
        queryFn: () => computeMedian(safeLeagueId, week),
        enabled,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      },
      {
        queryKey: newsletterQueryKeys.powerRankings(safeLeagueId, week),
        queryFn: () => computePowerRankings(safeLeagueId, week),
        enabled,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      },
      {
        queryKey: newsletterQueryKeys.playoffStandings(safeLeagueId, week),
        queryFn: () => computePlayoffStandings(safeLeagueId, week),
        enabled,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      },
      {
        queryKey: newsletterQueryKeys.schedule(safeLeagueId, week),
        queryFn: () => computeSchedule(safeLeagueId, week),
        enabled,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      },
    ],
  });

  // Destructure queries for easier access
  const [
    awardsQuery,
    leaderboardQuery,
    startersQuery,
    efficiencyQuery,
    bestBallQuery,
    medianQuery,
    powerRankingsQuery,
    playoffStandingsQuery,
    scheduleQuery,
  ] = queries;

  // Calculate aggregate helpers
  const isLoadingAny = queries.some((q) => q.isLoading || q.isPending);
  const hasErrors = queries.some((q) => q.isError);
  const readySections = queries.filter((q) => q.isSuccess).length;
  const totalSections = queries.length;

  return {
    awards: toSectionResult(awardsQuery),
    leaderboard: toSectionResult(leaderboardQuery),
    starters: toSectionResult(startersQuery),
    efficiency: toSectionResult(efficiencyQuery),
    bestBall: toSectionResult(bestBallQuery),
    median: toSectionResult(medianQuery),
    powerRankings: toSectionResult(powerRankingsQuery),
    playoffStandings: toSectionResult(playoffStandingsQuery),
    schedule: toSectionResult(scheduleQuery),
    isLoadingAny,
    hasErrors,
    readySections,
    totalSections,
  };
}
