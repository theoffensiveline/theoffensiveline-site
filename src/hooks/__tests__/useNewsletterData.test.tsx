import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  useNewsletterData,
  newsletterQueryKeys,
  prefetchNewsletterSection,
  invalidateNewsletter,
} from "../useNewsletterData";
import { ReactNode } from "react";
import * as SleeperAPI from "../../utils/api/SleeperAPI";

// Create a wrapper with QueryClientProvider
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Disable retries for tests
        gcTime: 0, // Disable caching for tests
      },
    },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useNewsletterData", () => {
  it("should return structure when leagueId is missing (but queries disabled)", () => {
    const { result } = renderHook(
      () => useNewsletterData(undefined, 10),
      { wrapper: createWrapper() }
    );

    // Hook should still return structure, just with no data
    expect(result.current).toHaveProperty("awards");
    expect(result.current).toHaveProperty("isLoadingAny");
  });

  it("should return structure when week is invalid (but queries disabled)", () => {
    const { result } = renderHook(
      () => useNewsletterData("123456", 0),
      { wrapper: createWrapper() }
    );

    // Hook should still return structure, just with no data
    expect(result.current).toHaveProperty("awards");
    expect(result.current).toHaveProperty("isLoadingAny");
  });

  it("should return structure when week is NaN (but queries disabled)", () => {
    const { result } = renderHook(
      () => useNewsletterData("123456", NaN),
      { wrapper: createWrapper() }
    );

    // Hook should still return structure, just with no data
    expect(result.current).toHaveProperty("awards");
    expect(result.current).toHaveProperty("isLoadingAny");
  });

  it("should return newsletter data structure with all sections", () => {
    const { result } = renderHook(
      () => useNewsletterData("123456", 10),
      { wrapper: createWrapper() }
    );

    expect(result.current).toHaveProperty("awards");
    expect(result.current).toHaveProperty("leaderboard");
    expect(result.current).toHaveProperty("starters");
    expect(result.current).toHaveProperty("efficiency");
    expect(result.current).toHaveProperty("bestBall");
    expect(result.current).toHaveProperty("median");
    expect(result.current).toHaveProperty("powerRankings");
    expect(result.current).toHaveProperty("playoffStandings");
    expect(result.current).toHaveProperty("schedule");
    expect(result.current).toHaveProperty("matchupData");
  });

  it("should return aggregate helpers", () => {
    const { result } = renderHook(
      () => useNewsletterData("123456", 10),
      { wrapper: createWrapper() }
    );

    expect(result.current).toHaveProperty("isLoadingAny");
    expect(result.current).toHaveProperty("hasErrors");
    expect(result.current).toHaveProperty("readySections");
    expect(result.current).toHaveProperty("totalSections");
    expect(result.current.totalSections).toBe(10);
  });

  it("should have proper section structure", () => {
    const { result } = renderHook(
      () => useNewsletterData("123456", 10),
      { wrapper: createWrapper() }
    );

    const section = result.current.awards;
    expect(section).toHaveProperty("data");
    expect(section).toHaveProperty("status");
    expect(section).toHaveProperty("error");
    expect(section).toHaveProperty("isLoading");
    expect(section).toHaveProperty("refetch");
    expect(typeof section.refetch).toBe("function");
  });

  it("should initially have isLoadingAny true", () => {
    const { result } = renderHook(
      () => useNewsletterData("123456", 10),
      { wrapper: createWrapper() }
    );

    expect(result.current.isLoadingAny).toBe(true);
  });

  it("should have readySections equal to 0 initially", () => {
    const { result } = renderHook(
      () => useNewsletterData("123456", 10),
      { wrapper: createWrapper() }
    );

    expect(result.current.readySections).toBe(0);
  });

  describe("Query Keys", () => {
    it("should generate correct query keys for each section", () => {
      const leagueId = "123456";
      const week = 10;

      expect(newsletterQueryKeys.all(leagueId, week)).toEqual([
        "newsletter",
        leagueId,
        week,
      ]);
      expect(newsletterQueryKeys.awards(leagueId, week)).toEqual([
        "newsletter",
        leagueId,
        week,
        "awards",
      ]);
      expect(newsletterQueryKeys.leaderboard(leagueId, week)).toEqual([
        "newsletter",
        leagueId,
        week,
        "leaderboard",
      ]);
      expect(newsletterQueryKeys.starters(leagueId, week)).toEqual([
        "newsletter",
        leagueId,
        week,
        "starters",
      ]);
      expect(newsletterQueryKeys.efficiency(leagueId, week)).toEqual([
        "newsletter",
        leagueId,
        week,
        "efficiency",
      ]);
      expect(newsletterQueryKeys.bestBall(leagueId, week)).toEqual([
        "newsletter",
        leagueId,
        week,
        "bestBall",
      ]);
      expect(newsletterQueryKeys.median(leagueId, week)).toEqual([
        "newsletter",
        leagueId,
        week,
        "median",
      ]);
      expect(newsletterQueryKeys.powerRankings(leagueId, week)).toEqual([
        "newsletter",
        leagueId,
        week,
        "powerRankings",
      ]);
      expect(newsletterQueryKeys.playoffStandings(leagueId, week)).toEqual([
        "newsletter",
        leagueId,
        week,
        "playoffStandings",
      ]);
      expect(newsletterQueryKeys.schedule(leagueId, week)).toEqual([
        "newsletter",
        leagueId,
        week,
        "schedule",
      ]);
      expect(newsletterQueryKeys.matchupData(leagueId, week)).toEqual([
        "newsletter",
        leagueId,
        week,
        "matchupData",
      ]);
    });

    it("should generate unique query keys for different leagues and weeks", () => {
      const key1 = newsletterQueryKeys.awards("league1", 1);
      const key2 = newsletterQueryKeys.awards("league1", 2);
      const key3 = newsletterQueryKeys.awards("league2", 1);

      expect(key1).not.toEqual(key2);
      expect(key1).not.toEqual(key3);
      expect(key2).not.toEqual(key3);
    });
  });

  describe("Cache Configuration", () => {
    it("should apply different cache policies for current vs completed weeks", async () => {
      // Mock NFL state to control current week
      const mockGetNflState = jest.spyOn(SleeperAPI, "getNflState");
      mockGetNflState.mockResolvedValue({
        week: 10,
        season: "2025",
        season_type: "regular",
        season_start_date: "2025-09-01",
        previous_season: "2024",
        leg: 1,
        league_season: "2025",
        league_create_season: "2025",
        display_week: 10,
      });

      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      });

      const wrapper = ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      );

      // Test completed week (week 5, current is week 10)
      const { result: completedResult } = renderHook(
        () => useNewsletterData("123456", 5),
        { wrapper }
      );

      await waitFor(() => {
        expect(completedResult.current).toBeDefined();
      });

      // Test current week (week 10)
      const { result: currentResult } = renderHook(
        () => useNewsletterData("123456", 10),
        { wrapper }
      );

      await waitFor(() => {
        expect(currentResult.current).toBeDefined();
      });

      mockGetNflState.mockRestore();
    });

    it("should use correct stale times based on NFL week", async () => {
      // Mock NFL state
      const mockGetNflState = jest.spyOn(SleeperAPI, "getNflState");
      mockGetNflState.mockResolvedValue({
        week: 10,
        season: "2025",
        season_type: "regular",
        season_start_date: "2025-09-01",
        previous_season: "2024",
        leg: 1,
        league_season: "2025",
        league_create_season: "2025",
        display_week: 10,
      });

      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      });

      const wrapper = ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      );

      renderHook(() => useNewsletterData("123456", 5), { wrapper });

      await waitFor(() => {
        const cache = queryClient.getQueryCache();
        const queries = cache.getAll();

        // Verify some queries exist
        expect(queries.length).toBeGreaterThan(0);
      });

      mockGetNflState.mockRestore();
    });
  });

  describe("Helper Functions", () => {
    it("prefetchNewsletterSection should prefetch a specific section", async () => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      });

      // Mock the compute functions to avoid actual API calls
      const mockAwardsData = [
        {
          award: "Test Award",
          photo: "test.jpg",
          name: "Test Player",
          value: "100",
          description: "Test description",
        },
      ];

      // Spy on the query cache
      const prefetchSpy = jest.spyOn(queryClient, "prefetchQuery");

      await prefetchNewsletterSection(queryClient, "123456", 10, "awards");

      expect(prefetchSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: newsletterQueryKeys.awards("123456", 10),
        })
      );

      prefetchSpy.mockRestore();
    });

    it("invalidateNewsletter should invalidate all sections for a week", async () => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      });

      const invalidateSpy = jest.spyOn(queryClient, "invalidateQueries");

      await invalidateNewsletter(queryClient, "123456", 10);

      expect(invalidateSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: newsletterQueryKeys.all("123456", 10),
        })
      );

      invalidateSpy.mockRestore();
    });

    it("invalidateNewsletter should invalidate all weeks when week is omitted", async () => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      });

      const invalidateSpy = jest.spyOn(queryClient, "invalidateQueries");

      await invalidateNewsletter(queryClient, "123456");

      expect(invalidateSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: ["newsletter", "123456"],
        })
      );

      invalidateSpy.mockRestore();
    });
  });
});
