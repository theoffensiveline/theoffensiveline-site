import { useQueries, UseQueryResult, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { computeWeeklyAwards, WeeklyAward } from "../utils/newsletter/computeWeeklyAwards";
import { computeLeaderboard } from "../utils/newsletter/computeLeaderboard";
import { computeStarters } from "../utils/newsletter/computeStarters";
import { computeEfficiency } from "../utils/newsletter/computeEfficiency";
import { computeBestBall } from "../utils/newsletter/computeBestBall";
import { computeMedian } from "../utils/newsletter/computeMedian";
import { computePowerRankings } from "../utils/newsletter/computePowerRankings";
import { computePlayoffStandings } from "../utils/newsletter/computePlayoffStandings";
import { computeSchedule } from "../utils/newsletter/computeSchedule";
import { computeMatchupData } from "../utils/newsletter/computeMatchupData";
import { getLeague, getNflState } from "../utils/api/FantasyAPI";
import type {
  BestBallData,
  EfficiencyData,
  LeaderboardData,
  MatchupData,
  MedianData,
  PowerRankingsData,
  PlayoffTableData,
  ScheduleData,
  StartersData,
} from "../types/newsletterTypes";

// ---------------------------------------------------------------------------
// Performance logging
//
// Set REACT_APP_NEWSLETTER_PERF=1 before starting the dev server to enable
// per-section timing logs. Sections that exceed 200ms log a console.warn.
//
// Usage:
//   REACT_APP_NEWSLETTER_PERF=1 yarn start
// ---------------------------------------------------------------------------
const PERF_ENABLED = process.env.REACT_APP_NEWSLETTER_PERF === "1";

function withPerfLogging<T>(name: string, fn: () => Promise<T>): Promise<T> {
  if (!PERF_ENABLED) return fn();

  const start = performance.now();
  return fn().then(
    (result) => {
      const ms = performance.now() - start;
      if (ms > 200) {
        console.warn(
          `[NEWSLETTER_PERF] ⚠ ${name} took ${ms.toFixed(0)}ms (exceeded 200ms threshold)`
        );
      } else {
        console.log(`[NEWSLETTER_PERF] ✓ ${name} took ${ms.toFixed(0)}ms`);
      }
      return result;
    },
    (err) => {
      const ms = performance.now() - start;
      console.warn(`[NEWSLETTER_PERF] ✗ ${name} failed after ${ms.toFixed(0)}ms`);
      throw err;
    }
  );
}

/**
 * Cache configuration constants for newsletter data.
 *
 * These values control how long data is cached and when it's refetched.
 * Tuning these knobs affects the balance between data freshness and performance.
 */
const CACHE_CONFIG = {
  /**
   * Stale time for completed weeks (6 hours in milliseconds).
   * Data older than this is considered stale and will refetch on next access.
   * Completed weeks benefit from aggressive caching since data won't change.
   */
  COMPLETED_STALE_TIME: 6 * 60 * 60 * 1000,

  /**
   * Garbage collection time for completed weeks (24 hours in milliseconds).
   * Cached data is removed from memory after this duration of inactivity.
   */
  COMPLETED_GC_TIME: 24 * 60 * 60 * 1000,

  /**
   * Stale time for current week (1 hour in milliseconds).
   * Current week data refreshes more frequently in case scores change.
   */
  CURRENT_STALE_TIME: 60 * 60 * 1000,

  /**
   * Garbage collection time for current week (2 hours in milliseconds).
   */
  CURRENT_GC_TIME: 2 * 60 * 60 * 1000,
} as const;

/**
 * Query keys for newsletter data caching.
 *
 * Keys follow the pattern: ['newsletter', leagueId, week, section]
 * This ensures caches are isolated per league, week, and section.
 */
export const newsletterQueryKeys = {
  all: (leagueId: string, week: number) => ["newsletter", leagueId, week] as const,
  nflState: () => ["nflState"] as const,
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
  matchupData: (leagueId: string, week: number) =>
    [...newsletterQueryKeys.all(leagueId, week), "matchupData"] as const,
};

/**
 * Newsletter section types for prefetching
 */
export type NewsletterSection =
  | "awards"
  | "leaderboard"
  | "starters"
  | "efficiency"
  | "bestBall"
  | "median"
  | "powerRankings"
  | "playoffStandings"
  | "schedule"
  | "matchupData";

/**
 * Prefetch a specific newsletter section for faster loading on hover/navigation.
 *
 * @param queryClient - React Query client instance
 * @param leagueId - Sleeper league ID
 * @param week - Week number to prefetch
 * @param section - Newsletter section to prefetch
 *
 * @example
 * ```tsx
 * // Prefetch on hover
 * <button onMouseEnter={() => prefetchNewsletterSection(queryClient, "123", 10, "awards")}>
 *   Week 10
 * </button>
 * ```
 */
export async function prefetchNewsletterSection(
  queryClient: ReturnType<typeof useQueryClient>,
  leagueId: string,
  week: number,
  section: NewsletterSection
): Promise<void> {
  const sectionFunctions: Record<
    NewsletterSection,
    (leagueId: string, week: number) => Promise<unknown>
  > = {
    awards: computeWeeklyAwards,
    leaderboard: computeLeaderboard,
    starters: computeStarters,
    efficiency: computeEfficiency,
    bestBall: computeBestBall,
    median: computeMedian,
    powerRankings: computePowerRankings,
    playoffStandings: computePlayoffStandings,
    schedule: computeSchedule,
    matchupData: computeMatchupData,
  };

  const queryKey = newsletterQueryKeys[section](leagueId, week);
  const queryFn = sectionFunctions[section];

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => queryFn(leagueId, week),
  });
}

/**
 * Invalidate all newsletter data for a specific league and week.
 * Useful for admin actions or when data needs to be refreshed manually.
 *
 * @param queryClient - React Query client instance
 * @param leagueId - Sleeper league ID
 * @param week - Week number to invalidate (optional - invalidates all weeks if omitted)
 *
 * @example
 * ```tsx
 * // Invalidate specific week
 * await invalidateNewsletter(queryClient, "123456", 10);
 *
 * // Invalidate all weeks for a league
 * await invalidateNewsletter(queryClient, "123456");
 * ```
 */
export async function invalidateNewsletter(
  queryClient: ReturnType<typeof useQueryClient>,
  leagueId: string,
  week?: number
): Promise<void> {
  const queryKey =
    week !== undefined ? newsletterQueryKeys.all(leagueId, week) : ["newsletter", leagueId];

  await queryClient.invalidateQueries({ queryKey });
}

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
  matchupData: SectionResult<MatchupData[]>;
  /** Whether the league uses median scoring (league_average_match === 1) */
  isMedianLeague: boolean;
  // Aggregate helpers
  isLoadingAny: boolean;
  hasErrors: boolean;
  readySections: number;
  totalSections: number;
}

/**
 * Helper to transform UseQueryResult to SectionResult
 */
function toSectionResult<T>(queryResult: UseQueryResult<T, Error>): SectionResult<T> {
  return {
    data: queryResult.data,
    status: queryResult.status,
    error: queryResult.error,
    isLoading: queryResult.isLoading || queryResult.isPending,
    refetch: queryResult.refetch,
  };
}

/**
 * Custom hook to fetch all newsletter data using React Query with intelligent caching.
 *
 * **Cache Strategy:**
 * - **Completed weeks** (week < current NFL week): 6hr stale time, 24hr GC, no refetch on mount
 * - **Current week**: 1hr stale time, 2hr GC, refetch on window focus
 *
 * This ensures historic weeks load instantly from cache while current week data stays fresh.
 *
 * @param leagueId - Sleeper league ID
 * @param week - Week number to fetch data for
 * @returns Newsletter data with loading states and helpers
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
export function useNewsletterData(leagueId: string | undefined, week: number): NewsletterData {
  // Validation - don't throw errors to avoid breaking React Hook rules
  // Instead, disable queries if invalid
  const enabled = !!leagueId && Number.isFinite(week) && week > 0;

  // Safe leagueId for query functions (with fallback to avoid undefined errors)
  const safeLeagueId = leagueId || "";

  // Fetch NFL state to determine current week
  const { data: nflState } = useQuery({
    queryKey: [...newsletterQueryKeys.nflState(), safeLeagueId],
    queryFn: () => getNflState(safeLeagueId || undefined),
    staleTime: 60 * 60 * 1000, // 1 hour - NFL week doesn't change often
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });

  // Fetch league settings to detect median scoring mode
  const { data: leagueData } = useQuery({
    queryKey: ["league", safeLeagueId],
    queryFn: () => getLeague(safeLeagueId),
    enabled,
    staleTime: 24 * 60 * 60 * 1000, // League settings rarely change
    gcTime: 24 * 60 * 60 * 1000,
  });

  const isMedianLeague = leagueData?.settings?.league_average_match === 1;

  // Determine if requested week is current or completed
  const currentNflWeek = nflState?.week ?? 18; // Default to late season if unknown
  const isCurrentWeek = week >= currentNflWeek;

  /**
   * Cache policy based on whether week is current or completed.
   * Memoized to prevent re-registering queries on every render.
   */
  const cachePolicy = useMemo(
    () => ({
      staleTime: isCurrentWeek
        ? CACHE_CONFIG.CURRENT_STALE_TIME
        : CACHE_CONFIG.COMPLETED_STALE_TIME,
      gcTime: isCurrentWeek ? CACHE_CONFIG.CURRENT_GC_TIME : CACHE_CONFIG.COMPLETED_GC_TIME,
      refetchOnMount: isCurrentWeek, // Don't refetch completed weeks on mount
      refetchOnWindowFocus: isCurrentWeek, // Only refetch current week on focus
    }),
    [isCurrentWeek]
  );

  // Memoize queries configuration to avoid re-registering
  const queriesConfig = useMemo(
    () => [
      {
        queryKey: newsletterQueryKeys.awards(safeLeagueId, week),
        queryFn: () => withPerfLogging("awards", () => computeWeeklyAwards(safeLeagueId, week)),
        enabled,
        ...cachePolicy,
      },
      {
        queryKey: newsletterQueryKeys.leaderboard(safeLeagueId, week),
        queryFn: () => withPerfLogging("leaderboard", () => computeLeaderboard(safeLeagueId, week)),
        enabled,
        ...cachePolicy,
      },
      {
        queryKey: newsletterQueryKeys.starters(safeLeagueId, week),
        queryFn: () => withPerfLogging("starters", () => computeStarters(safeLeagueId, week)),
        enabled,
        ...cachePolicy,
      },
      {
        queryKey: newsletterQueryKeys.efficiency(safeLeagueId, week),
        queryFn: () => withPerfLogging("efficiency", () => computeEfficiency(safeLeagueId, week)),
        enabled,
        ...cachePolicy,
      },
      {
        queryKey: newsletterQueryKeys.bestBall(safeLeagueId, week),
        queryFn: () => withPerfLogging("bestBall", () => computeBestBall(safeLeagueId, week)),
        enabled,
        ...cachePolicy,
      },
      {
        queryKey: newsletterQueryKeys.median(safeLeagueId, week),
        queryFn: () => withPerfLogging("median", () => computeMedian(safeLeagueId, week)),
        enabled,
        ...cachePolicy,
      },
      {
        queryKey: newsletterQueryKeys.powerRankings(safeLeagueId, week),
        queryFn: () =>
          withPerfLogging("powerRankings", () => computePowerRankings(safeLeagueId, week)),
        enabled,
        ...cachePolicy,
      },
      {
        queryKey: newsletterQueryKeys.playoffStandings(safeLeagueId, week),
        queryFn: () =>
          withPerfLogging("playoffStandings", () => computePlayoffStandings(safeLeagueId, week)),
        enabled,
        ...cachePolicy,
      },
      {
        queryKey: newsletterQueryKeys.schedule(safeLeagueId, week),
        queryFn: () => withPerfLogging("schedule", () => computeSchedule(safeLeagueId, week)),
        enabled,
        ...cachePolicy,
      },
      {
        queryKey: newsletterQueryKeys.matchupData(safeLeagueId, week),
        queryFn: () => withPerfLogging("matchupData", () => computeMatchupData(safeLeagueId, week)),
        enabled,
        ...cachePolicy,
      },
    ],
    [safeLeagueId, week, enabled, cachePolicy]
  );

  // Fetch all sections in parallel using useQueries
  const queries = useQueries({ queries: queriesConfig });

  // Access queries by index with proper typing
  const awardsQuery = queries[0] as UseQueryResult<WeeklyAward[], Error>;
  const leaderboardQuery = queries[1] as UseQueryResult<LeaderboardData[], Error>;
  const startersQuery = queries[2] as UseQueryResult<StartersData[], Error>;
  const efficiencyQuery = queries[3] as UseQueryResult<EfficiencyData[], Error>;
  const bestBallQuery = queries[4] as UseQueryResult<BestBallData[], Error>;
  const medianQuery = queries[5] as UseQueryResult<MedianData[], Error>;
  const powerRankingsQuery = queries[6] as UseQueryResult<PowerRankingsData[], Error>;
  const playoffStandingsQuery = queries[7] as UseQueryResult<PlayoffTableData[], Error>;
  const scheduleQuery = queries[8] as UseQueryResult<ScheduleData, Error>;
  const matchupDataQuery = queries[9] as UseQueryResult<MatchupData[], Error>;

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
    matchupData: toSectionResult(matchupDataQuery),
    isMedianLeague,
    isLoadingAny,
    hasErrors,
    readySections,
    totalSections,
  };
}
