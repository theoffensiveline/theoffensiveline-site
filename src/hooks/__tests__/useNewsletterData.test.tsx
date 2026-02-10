import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useNewsletterData } from "../useNewsletterData";
import { ReactNode } from "react";

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
    expect(result.current.totalSections).toBe(9);
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
});
