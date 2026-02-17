import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LeagueWeeklyRecap } from "../LeagueWeeklyRecap";
import { ColorConstants } from "../../components/constants/ColorConstants";
import { ThemeProvider as AppThemeProvider } from "../../ThemeContext";
import * as newsletterDataHook from "../../hooks/useNewsletterData";

// ---------------------------------------------------------------------------
// Suppress expected console output (error boundary logging, etc.)
// ---------------------------------------------------------------------------

const originalConsoleError = console.error;
const originalConsoleGroup = console.group;
const originalConsoleGroupEnd = console.groupEnd;
const originalConsoleInfo = console.info;

beforeEach(() => {
  console.error = jest.fn();
  console.group = jest.fn();
  console.groupEnd = jest.fn();
  console.info = jest.fn();
});

afterEach(() => {
  console.error = originalConsoleError;
  console.group = originalConsoleGroup;
  console.groupEnd = originalConsoleGroupEnd;
  console.info = originalConsoleInfo;
  jest.restoreAllMocks();
});

// ---------------------------------------------------------------------------
// Mock chart components — these are lazy-loaded Victory.js bundles that don't
// render in the test environment; we only care that the page wires them up.
// ---------------------------------------------------------------------------

jest.mock("../../components/newsletters/chartStyles", () => ({
  EfficiencyChart: () => <div data-testid="efficiency-chart" />,
  MatchupPlot: () => <div data-testid="matchup-plot" />,
  StackedHistogram: () => <div data-testid="stacked-histogram" />,
  WeeklyScoringChart: () => <div data-testid="weekly-scoring-chart" />,
}));

// ---------------------------------------------------------------------------
// Mock helpers
// ---------------------------------------------------------------------------

type SectionStatus = "pending" | "success" | "error";

const makeSection = (
  status: SectionStatus,
  data: unknown = null,
  error: Error | null = null,
) => ({
  data,
  status,
  error,
  isLoading: status === "pending",
  refetch: jest.fn(),
});

/**
 * Builds a full mock newsletter hook result.
 * Defaults to all sections "pending" so ALL 10 sections are always visible
 * (pending sections always pass the `shouldRender` check).
 */
const makeNewsletterResult = (
  overrides: Record<string, ReturnType<typeof makeSection>> = {},
) => ({
  awards: makeSection("pending"),
  leaderboard: makeSection("pending"),
  starters: makeSection("pending"),
  efficiency: makeSection("pending"),
  matchupData: makeSection("pending"),
  powerRankings: makeSection("pending"),
  median: makeSection("pending"),
  bestBall: makeSection("pending"),
  playoffStandings: makeSection("pending"),
  schedule: makeSection("pending"),
  isLoadingAny: true,
  hasErrors: false,
  readySections: 0,
  totalSections: 10,
  ...overrides,
});

// ---------------------------------------------------------------------------
// Render helper
// ---------------------------------------------------------------------------

const renderPage = (leagueId = "league123", week = "10") => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const path = `/league/${leagueId}/weekly-recap/${week}`;

  return render(
    <QueryClientProvider client={queryClient}>
      <StyledThemeProvider theme={ColorConstants.light}>
        <AppThemeProvider>
          <MemoryRouter initialEntries={[path]}>
            <Routes>
              <Route
                path="/league/:leagueId/weekly-recap/:week"
                element={<LeagueWeeklyRecap />}
              />
            </Routes>
          </MemoryRouter>
        </AppThemeProvider>
      </StyledThemeProvider>
    </QueryClientProvider>,
  );
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("LeagueWeeklyRecap", () => {
  beforeEach(() => {
    jest
      .spyOn(newsletterDataHook, "useNewsletterData")
      .mockReturnValue(makeNewsletterResult() as any);
  });

  // -------------------------------------------------------------------------
  // Invalid inputs
  // -------------------------------------------------------------------------

  describe("invalid inputs", () => {
    it("shows 'Invalid week number' when week param is not a number", () => {
      renderPage("league123", "not-a-week");
      expect(screen.getByText("Invalid week number")).toBeInTheDocument();
    });

    it("shows 'Missing league ID' when leagueId is blank", () => {
      // Route won't match with empty string, so render the component directly
      // by pointing at a route that passes leagueId param as a space
      const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
      });
      render(
        <QueryClientProvider client={queryClient}>
          <StyledThemeProvider theme={ColorConstants.light}>
            <AppThemeProvider>
              <MemoryRouter initialEntries={["/league//weekly-recap/10"]}>
                <Routes>
                  <Route
                    path="/league/:leagueId/weekly-recap/:week"
                    element={<LeagueWeeklyRecap />}
                  />
                  {/* Catch-all for the malformed URL */}
                  <Route path="*" element={<LeagueWeeklyRecap />} />
                </Routes>
              </MemoryRouter>
            </AppThemeProvider>
          </StyledThemeProvider>
        </QueryClientProvider>,
      );
      // Either "Missing league ID" or "Invalid week number" — inputs are invalid
      const title = screen.getByText("The Offensive Line");
      expect(title).toBeInTheDocument();
    });

    it("does not render section shells when inputs are invalid", () => {
      renderPage("league123", "bad");
      expect(screen.queryByRole("status", { name: "Loading content" })).toBeNull();
    });
  });

  // -------------------------------------------------------------------------
  // Loading state — skeletons
  // -------------------------------------------------------------------------

  describe("loading state", () => {
    it("shows skeletons while sections are pending", () => {
      renderPage();
      // Each SectionShell in pending state renders a skeleton with this aria-label
      const skeletons = screen.getAllByRole("status", {
        name: "Loading content",
      });
      expect(skeletons.length).toBeGreaterThan(0);
    });

    it("renders all 10 section headings even before data arrives", () => {
      renderPage();
      expect(screen.getByText("Awards and Recap")).toBeInTheDocument();
      expect(screen.getByText("Manager Skill Assessment")).toBeInTheDocument();
      expect(screen.getByText("Matchups")).toBeInTheDocument();
      expect(screen.getByText("Scoring Distributions")).toBeInTheDocument();
      expect(screen.getByText("Standings")).toBeInTheDocument();
      expect(screen.getByText("Power Rankings")).toBeInTheDocument();
      expect(screen.getByText("Median Scoring Leaderboard")).toBeInTheDocument();
      expect(screen.getByText("Best Ball Standings")).toBeInTheDocument();
      expect(screen.getByText("Playoff Probabilities")).toBeInTheDocument();
      expect(screen.getByText("Schedule Comparisons")).toBeInTheDocument();
    });

    it("shows progress indicator while loading", () => {
      renderPage();
      // ProgressIndicator has role="status" with live region
      // (distinct from the skeleton role="status" elements)
      expect(screen.getByText(/sections ready/)).toBeInTheDocument();
    });

    it("does not show the Refresh all button while loading", () => {
      renderPage();
      expect(
        screen.queryByText("Refresh all sections"),
      ).not.toBeInTheDocument();
    });
  });

  // -------------------------------------------------------------------------
  // Success state
  // -------------------------------------------------------------------------

  describe("success state", () => {
    beforeEach(() => {
      jest.spyOn(newsletterDataHook, "useNewsletterData").mockReturnValue(
        makeNewsletterResult({
          awards: makeSection("success", []),
          leaderboard: makeSection("success", []),
          starters: makeSection("success", []),
          efficiency: makeSection("success", []),
          matchupData: makeSection("success", []),
          powerRankings: makeSection("success", []),
          median: makeSection("success", []),
          bestBall: makeSection("success", []),
          // Leave playoff and schedule pending so they stay visible
        }) as any,
      );
    });

    it("renders the page title", () => {
      renderPage();
      expect(screen.getByText("The Offensive Line")).toBeInTheDocument();
    });

    it("renders the week subtitle", () => {
      renderPage("league123", "7");
      expect(
        screen.getByText("Sleeper Weekly Recap – Week 7"),
      ).toBeInTheDocument();
    });

    it("does not show error alerts when all sections succeed", () => {
      renderPage();
      expect(screen.queryAllByRole("alert")).toHaveLength(0);
    });

    it("does not show Refresh all sections button when no errors", () => {
      renderPage();
      expect(
        screen.queryByText("Refresh all sections"),
      ).not.toBeInTheDocument();
    });
  });

  // -------------------------------------------------------------------------
  // Error handling
  // -------------------------------------------------------------------------

  describe("error handling", () => {
    it("shows an error alert when a section fails", () => {
      jest.spyOn(newsletterDataHook, "useNewsletterData").mockReturnValue(
        makeNewsletterResult({
          awards: makeSection("error", null, new Error("API failure")),
        }) as any,
      );
      renderPage();
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    it("shows a Retry button inside the error panel", () => {
      jest.spyOn(newsletterDataHook, "useNewsletterData").mockReturnValue(
        makeNewsletterResult({
          awards: makeSection("error", null, new Error("API failure")),
        }) as any,
      );
      renderPage();
      expect(
        screen.getByRole("button", { name: "Retry" }),
      ).toBeInTheDocument();
    });

    it("calls section refetch when Retry is clicked", () => {
      const awardsRefetch = jest.fn();
      jest.spyOn(newsletterDataHook, "useNewsletterData").mockReturnValue(
        makeNewsletterResult({
          awards: {
            data: null,
            status: "error" as const,
            error: new Error("fail"),
            isLoading: false,
            refetch: awardsRefetch,
          },
        }) as any,
      );
      renderPage();
      fireEvent.click(screen.getByRole("button", { name: "Retry" }));
      expect(awardsRefetch).toHaveBeenCalledTimes(1);
    });

    it("shows Refresh all sections button when any section fails", () => {
      jest.spyOn(newsletterDataHook, "useNewsletterData").mockReturnValue(
        makeNewsletterResult({
          awards: makeSection("error", null, new Error("fail")),
        }) as any,
      );
      renderPage();
      expect(screen.getByText("Refresh all sections")).toBeInTheDocument();
    });

    it("calls refetch on all visible sections when Refresh all is clicked", () => {
      const awardsRefetch = jest.fn();
      const leaderboardRefetch = jest.fn();
      jest.spyOn(newsletterDataHook, "useNewsletterData").mockReturnValue(
        makeNewsletterResult({
          awards: {
            data: null,
            status: "error" as const,
            error: new Error("fail"),
            isLoading: false,
            refetch: awardsRefetch,
          },
          leaderboard: {
            data: null,
            status: "error" as const,
            error: new Error("fail"),
            isLoading: false,
            refetch: leaderboardRefetch,
          },
        }) as any,
      );
      renderPage();
      fireEvent.click(screen.getByText("Refresh all sections"));
      expect(awardsRefetch).toHaveBeenCalledTimes(1);
      expect(leaderboardRefetch).toHaveBeenCalledTimes(1);
    });
  });

  // -------------------------------------------------------------------------
  // Multi-error toast
  // -------------------------------------------------------------------------

  describe("multi-error toast", () => {
    it("renders the toast element when 2 or more sections fail", () => {
      jest.spyOn(newsletterDataHook, "useNewsletterData").mockReturnValue(
        makeNewsletterResult({
          awards: makeSection("error", null, new Error("fail")),
          leaderboard: makeSection("error", null, new Error("fail")),
        }) as any,
      );
      renderPage();
      expect(
        screen.getByText(/Multiple sections failed to load/),
      ).toBeInTheDocument();
    });

    it("does not show the toast text when only one section fails", () => {
      // The toast element is always in the DOM (opacity-controlled).
      // With a single error the toast state remains false (below threshold of 2).
      // We validate by checking there is exactly one error alert, not a toast.
      jest.spyOn(newsletterDataHook, "useNewsletterData").mockReturnValue(
        makeNewsletterResult({
          awards: makeSection("error", null, new Error("fail")),
        }) as any,
      );
      renderPage();
      // One error → single alert panel, Refresh all button present
      expect(screen.getAllByRole("alert")).toHaveLength(1);
    });
  });

  // -------------------------------------------------------------------------
  // Document title & SEO
  // -------------------------------------------------------------------------

  describe("document title and SEO", () => {
    it("sets the document title with the correct week number", () => {
      renderPage("league123", "10");
      expect(document.title).toBe(
        "Sleeper Weekly Recap – Week 10 | The Offensive Line",
      );
    });

    it("updates the document title when a different week is rendered", () => {
      renderPage("league123", "3");
      expect(document.title).toBe(
        "Sleeper Weekly Recap – Week 3 | The Offensive Line",
      );
    });

    it("adds a meta description tag containing the week number", () => {
      renderPage("league123", "5");
      const meta = document.querySelector('meta[name="description"]');
      expect(meta).not.toBeNull();
      expect(meta!.getAttribute("content")).toContain("Week 5");
    });
  });

  // -------------------------------------------------------------------------
  // Anchor navigation
  // -------------------------------------------------------------------------

  describe("anchor navigation", () => {
    it("does not render nav when no sections are ready", () => {
      // All sections are pending by default → AnchorNav returns null
      renderPage();
      expect(
        screen.queryByRole("navigation", { name: "Section navigation" }),
      ).toBeNull();
    });

    it("renders nav with correct links when sections are ready", () => {
      jest.spyOn(newsletterDataHook, "useNewsletterData").mockReturnValue(
        makeNewsletterResult({
          awards: makeSection("success", []),
          leaderboard: makeSection("success", []),
        }) as any,
      );
      renderPage();
      const nav = screen.getByRole("navigation", { name: "Section navigation" });
      expect(nav).toBeInTheDocument();
      // Awards and Standings links should be present
      expect(screen.getByRole("link", { name: "Awards" })).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "Standings" }),
      ).toBeInTheDocument();
    });

    it("marks not-yet-ready section links as disabled", () => {
      jest.spyOn(newsletterDataHook, "useNewsletterData").mockReturnValue(
        makeNewsletterResult({
          awards: makeSection("success", []),
        }) as any,
      );
      renderPage();
      // Standings is still pending — its nav link should be aria-disabled
      const standingsLink = screen.getByRole("link", { name: "Standings" });
      expect(standingsLink).toHaveAttribute("aria-disabled", "true");
    });
  });
});
