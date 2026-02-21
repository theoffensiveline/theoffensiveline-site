import React, { useMemo, useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  AwardsGridV2,
  ArticleCaption,
  ArticleSubheader,
  NewsletterContainer,
  NewsletterTitle,
} from "../components/newsletters/newsStyles";
import {
  AltLeaderboardTable,
  LeaderboardTable,
  PlayoffTable,
  PowerRankingsTable,
  ScheduleTable,
  WeeklyMarginTable,
} from "../components/newsletters/tableStyles";
import { useNewsletterData } from "../hooks/useNewsletterData";
import { SectionShell } from "../components/newsletter/SectionShell";
import { AnchorNav } from "../components/newsletter/AnchorNav";
import { ProgressIndicator } from "../components/newsletter/ProgressIndicator";
import {
  AwardsSkeleton,
  TableSkeleton,
  ChartSkeleton,
  MatchupSkeleton,
} from "../components/newsletter/skeletons";

// Lazy-load Victory.js-backed chart components to keep the initial bundle lean.
// SectionShell already renders a skeleton while status is "pending", so the
// Suspense fallback (null) is only reached during the brief gap between a
// section becoming "success" and the chunk arriving — practically invisible.
const EfficiencyChart = React.lazy(() =>
  import("../components/newsletters/chartStyles").then((m) => ({
    default: m.EfficiencyChart,
  }))
);
const MatchupPlot = React.lazy(() =>
  import("../components/newsletters/chartStyles").then((m) => ({
    default: m.MatchupPlot,
  }))
);
const StackedHistogram = React.lazy(() =>
  import("../components/newsletters/chartStyles").then((m) => ({
    default: m.StackedHistogram,
  }))
);
const WeeklyScoringChart = React.lazy(() =>
  import("../components/newsletters/chartStyles").then((m) => ({
    default: m.WeeklyScoringChart,
  }))
);

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------

const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
  padding: 8px;

  @media (min-width: 769px) {
    max-width: 600px;
    flex-direction: row;
    gap: 16px;
  }
`;

const Sidebar = styled.aside`
  @media (min-width: 769px) {
    flex: 0 0 140px;
    width: 140px;
  }
`;

const MainContent = styled.div`
  flex: 1;
  min-width: 0;
`;

// ---------------------------------------------------------------------------
// Refresh-all button
// ---------------------------------------------------------------------------

const RefreshAllButton = styled.button`
  display: block;
  margin: 8px auto 0;
  background: ${({ theme }) => theme.button};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  padding: 8px 18px;
  font-family: "Playfair Display", serif;
  font-size: 13px;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

// ---------------------------------------------------------------------------
// Global error toast
// ---------------------------------------------------------------------------

const ToastContainer = styled.div<{ $visible: boolean }>`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: #ff3366;
  color: #fff;
  padding: 12px 24px;
  border-radius: 6px;
  font-family: "Playfair Display", serif;
  font-size: 14px;
  z-index: 9999;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  pointer-events: none;
  opacity: ${({ $visible }: { $visible: boolean }) => ($visible ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const TOAST_DURATION_MS = 5000;
const MULTI_ERROR_THRESHOLD = 2;

export const LeagueWeeklyRecap: React.FC = () => {
  const { leagueId, week } = useParams();

  const parsedWeek = useMemo(() => {
    const w = Number(week);
    return Number.isFinite(w) ? w : NaN;
  }, [week]);

  // Use the newsletter data hook (always called — queries are disabled when inputs invalid)
  const newsletter = useNewsletterData(leagueId, parsedWeek);

  // Extract matchup IDs for matchup section
  const matchupIds = useMemo(() => {
    if (!newsletter.starters.data) return [];
    return [...new Set(newsletter.starters.data.map((s) => s.matchup_id))].sort((a, b) => a - b);
  }, [newsletter.starters.data]);

  // Determine if inputs are valid
  const hasValidInputs = !!leagueId && Number.isFinite(parsedWeek) && parsedWeek > 0;

  const platformLabel = leagueId?.startsWith("espn_") ? "ESPN" : "Sleeper";

  // Set document title for SEO
  useEffect(() => {
    const weekStr = Number.isFinite(parsedWeek) ? parsedWeek : "";
    document.title = `${platformLabel} Weekly Recap – Week ${weekStr} | The Offensive Line`;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        `Weekly fantasy football recap for Week ${weekStr}: awards, matchup analysis, power rankings, and playoff predictions.`
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = `Weekly fantasy football recap for Week ${weekStr}: awards, matchup analysis, power rankings, and playoff predictions.`;
      document.head.appendChild(meta);
    }
  }, [parsedWeek, platformLabel]);

  // ---------------------------------------------------------------------------
  // Global toast: show when ≥ MULTI_ERROR_THRESHOLD sections error at once
  // ---------------------------------------------------------------------------

  const [toastVisible, setToastVisible] = useState(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track render-time boundary errors alongside API errors
  const [boundaryErrorSections, setBoundaryErrorSections] = useState<Set<string>>(new Set());

  const handleBoundaryError = useCallback((_error: Error, sectionKey: string) => {
    setBoundaryErrorSections((prev) => {
      const next = new Set(prev);
      next.add(sectionKey);
      return next;
    });
  }, []);

  // Build sections config — memoized so handleRefreshAll can reference it stably
  const sections = useMemo(
    () => [
      {
        id: "awards",
        label: "Awards",
        title: "Awards and Recap",
        subtitle: undefined as string | undefined,
        section: newsletter.awards,
        render: () => <AwardsGridV2 awardsData={newsletter.awards.data ?? []} />,
        skeleton: <AwardsSkeleton />,
        shouldRender: true,
      },
      {
        id: "efficiency",
        label: "Manager Skill",
        title: "Manager Skill Assessment",
        subtitle: undefined as string | undefined,
        section: newsletter.efficiency,
        render: () => (
          <React.Suspense fallback={<ChartSkeleton />}>
            <EfficiencyChart chartData={newsletter.efficiency.data ?? []} />
          </React.Suspense>
        ),
        skeleton: <ChartSkeleton />,
        shouldRender: true,
      },
      {
        id: "matchups",
        label: "Matchup Spotlight",
        title: "Matchups",
        subtitle: undefined as string | undefined,
        section: newsletter.starters,
        render: () => (
          <React.Suspense fallback={<MatchupSkeleton />}>
            {matchupIds.map((matchupId) => (
              <React.Fragment key={matchupId}>
                <ArticleSubheader>Matchup {matchupId}</ArticleSubheader>
                <MatchupPlot data={newsletter.starters.data ?? []} matchupId={matchupId} />
              </React.Fragment>
            ))}
          </React.Suspense>
        ),
        skeleton: <MatchupSkeleton />,
        shouldRender: true,
      },
      {
        id: "scoring-distributions",
        label: "Scoring Distributions",
        title: "Scoring Distributions",
        subtitle: undefined as string | undefined,
        section: newsletter.matchupData,
        render: () => (
          <React.Suspense fallback={<ChartSkeleton />}>
            <ArticleSubheader>Distribution of Scoring</ArticleSubheader>
            <StackedHistogram chartData={newsletter.matchupData.data ?? []} />
            <ArticleCaption>Weekly Scoring Distribution w/ Historical Scores</ArticleCaption>

            <ArticleSubheader>Weekly Scoring Chart</ArticleSubheader>
            <WeeklyScoringChart chartData={newsletter.matchupData.data ?? []} />
            <ArticleCaption>Weekly Scoring Chart</ArticleCaption>

            <ArticleSubheader>Weekly Margin of Victory</ArticleSubheader>
            <WeeklyMarginTable
              matchupData={newsletter.matchupData.data ?? []}
              leaderboardData={newsletter.leaderboard.data ?? []}
            />
            <ArticleCaption>Weekly Margin of Victory Table</ArticleCaption>
          </React.Suspense>
        ),
        skeleton: <ChartSkeleton />,
        shouldRender: true,
      },
      {
        id: "standings",
        label: "Standings",
        title: "Standings",
        subtitle: newsletter.isMedianLeague
          ? "Record includes matchups against the league median"
          : (undefined as string | undefined),
        section: newsletter.isMedianLeague ? newsletter.median : newsletter.leaderboard,
        render: () =>
          newsletter.isMedianLeague ? (
            <AltLeaderboardTable data={newsletter.median.data ?? []} />
          ) : (
            <LeaderboardTable leaderboardData={newsletter.leaderboard.data ?? []} />
          ),
        skeleton: <TableSkeleton rows={10} columns={6} />,
        shouldRender: true,
      },
      {
        id: "power-rankings",
        label: "Power Rankings",
        title: "Power Rankings",
        subtitle: "Rankings based on recent performance and strength of schedule",
        section: newsletter.powerRankings,
        render: () => (
          <PowerRankingsTable powerRankingsData={newsletter.powerRankings.data ?? []} />
        ),
        skeleton: <TableSkeleton rows={10} columns={4} />,
        shouldRender: true,
      },
      {
        id: "median",
        label: newsletter.isMedianLeague ? "H2H Only Standings" : "Median Scoring",
        title: newsletter.isMedianLeague
          ? "Head-to-Head Only Standings"
          : "Median Scoring Leaderboard",
        subtitle: newsletter.isMedianLeague
          ? "What if we didn't play the median?"
          : "Total record including matchups and games vs. league median",
        section: newsletter.isMedianLeague ? newsletter.leaderboard : newsletter.median,
        render: () =>
          newsletter.isMedianLeague ? (
            <LeaderboardTable leaderboardData={newsletter.leaderboard.data ?? []} />
          ) : (
            <AltLeaderboardTable data={newsletter.median.data ?? []} />
          ),
        skeleton: <TableSkeleton rows={10} columns={5} />,
        shouldRender: true,
      },
      {
        id: "best-ball",
        label: "Alternate Universe",
        title: "Best Ball Standings",
        subtitle: "What if everyone played optimal lineups?",
        section: newsletter.bestBall,
        render: () => <AltLeaderboardTable data={newsletter.bestBall.data ?? []} />,
        skeleton: <TableSkeleton rows={10} columns={5} />,
        shouldRender: true,
      },
      {
        id: "playoff-picture",
        label: "Playoff Picture",
        title: "Playoff Probabilities",
        subtitle: "Monte Carlo simulation of playoff and last place chances",
        section: newsletter.playoffStandings,
        render: () => <PlayoffTable playoffData={newsletter.playoffStandings.data ?? []} />,
        skeleton: <TableSkeleton rows={10} columns={4} />,
        shouldRender:
          newsletter.playoffStandings.status !== "success" ||
          (newsletter.playoffStandings.data?.length ?? 0) > 0,
      },
      {
        id: "schedule",
        label: "Schedule Comparisons",
        title: "Schedule Comparisons",
        subtitle: "How would each team fare with different schedules?",
        section: newsletter.schedule,
        render: () => <ScheduleTable data={newsletter.schedule.data!} />,
        skeleton: <TableSkeleton rows={10} columns={6} />,
        shouldRender:
          newsletter.schedule.status !== "success" ||
          (newsletter.schedule.data !== undefined &&
            newsletter.schedule.data !== null &&
            newsletter.schedule.data.current_records.length > 0),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      newsletter.awards,
      newsletter.efficiency,
      newsletter.starters,
      newsletter.matchupData,
      newsletter.leaderboard,
      newsletter.powerRankings,
      newsletter.median,
      newsletter.bestBall,
      newsletter.playoffStandings,
      newsletter.schedule,
      matchupIds,
    ]
  );

  const visibleSections = useMemo(() => sections.filter((s) => s.shouldRender), [sections]);

  // Count errored sections (API errors + render boundary errors)
  const apiErrorCount = visibleSections.filter((s) => s.section.status === "error").length;
  const totalErrorCount = apiErrorCount + boundaryErrorSections.size;

  // Show toast when ≥ MULTI_ERROR_THRESHOLD sections error simultaneously
  useEffect(() => {
    if (totalErrorCount >= MULTI_ERROR_THRESHOLD) {
      setToastVisible(true);
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      toastTimerRef.current = setTimeout(() => {
        setToastVisible(false);
      }, TOAST_DURATION_MS);
    }
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalErrorCount]);

  const handleRefreshAll = useCallback(() => {
    visibleSections.forEach((s) => s.section.refetch());
    setBoundaryErrorSections(new Set());
  }, [visibleSections]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  if (!hasValidInputs) {
    return (
      <NewsletterContainer>
        <NewsletterTitle>The Offensive Line</NewsletterTitle>
        <ArticleSubheader>Weekly Recap</ArticleSubheader>
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          {!leagueId ? "Missing league ID" : "Invalid week number"}
        </div>
      </NewsletterContainer>
    );
  }

  // Prepare anchor nav data
  const anchorSections = visibleSections.map((section) => ({
    id: section.id,
    label: section.label,
    isReady: section.section.status === "success",
  }));

  // Count ready sections for progress indicator
  const readySectionsCount = visibleSections.filter((s) => s.section.status === "success").length;

  const hasAnyError = totalErrorCount > 0;

  return (
    <PageLayout>
      <Sidebar>
        <AnchorNav sections={anchorSections} />
      </Sidebar>
      <MainContent>
        <NewsletterContainer>
          <NewsletterTitle>The Offensive Line</NewsletterTitle>
          <ArticleSubheader>
            {platformLabel} Weekly Recap – Week {parsedWeek}
          </ArticleSubheader>

          <ProgressIndicator
            totalSections={visibleSections.length}
            readySections={readySectionsCount}
          />

          {hasAnyError && (
            <RefreshAllButton onClick={handleRefreshAll}>Refresh all sections</RefreshAllButton>
          )}

          {visibleSections.map((section) => (
            <SectionShell
              key={section.id}
              id={section.id}
              sectionKey={section.id}
              leagueId={leagueId}
              week={parsedWeek}
              title={section.title}
              subtitle={section.subtitle}
              status={section.section.status}
              error={section.section.error}
              onRetry={() => section.section.refetch()}
              skeleton={section.skeleton}
              onBoundaryError={handleBoundaryError}
            >
              {section.render()}
            </SectionShell>
          ))}
        </NewsletterContainer>
      </MainContent>

      <ToastContainer $visible={toastVisible} role="status" aria-live="polite" aria-atomic="true">
        Multiple sections failed to load. Check your connection or hit "Refresh all sections".
      </ToastContainer>
    </PageLayout>
  );
};

export default LeagueWeeklyRecap;
