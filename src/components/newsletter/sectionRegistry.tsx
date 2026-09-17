/**
 * Section registry (#84) — maps issue section type keys to their live
 * renderers. Computed sections store nothing but the key; at render time the
 * registry pairs it with data from useNewsletterData, exactly like
 * LeagueWeeklyRecap renders today.
 *
 * The registry is APPEND-ONLY: never delete or reuse a key. Retiring a
 * section = remove it from DEFAULT_SECTION_ORDER (no new uses) but keep the
 * renderer so old issues still work. Unknown keys render as nothing.
 */
import React from "react";
import { AwardsGridV2, ArticleCaption, ArticleSubheader } from "../newsletters/newsStyles";
import {
  AltLeaderboardTable,
  LeaderboardTable,
  PlayoffTable,
  PowerRankingsTable,
  ScheduleTable,
  WeeklyMarginTable,
} from "../newsletters/tableStyles";
import type { NewsletterData, SectionResult } from "../../hooks/useNewsletterData";
import type { IssueSection } from "../../types/firestore";
import { AwardsSkeleton, TableSkeleton, ChartSkeleton, MatchupSkeleton } from "./skeletons";

// Lazy chart chunks, same rationale as LeagueWeeklyRecap
const EfficiencyChart = React.lazy(() =>
  import("../newsletters/chartStyles").then((m) => ({ default: m.EfficiencyChart }))
);
const MatchupPlot = React.lazy(() =>
  import("../newsletters/chartStyles").then((m) => ({ default: m.MatchupPlot }))
);
const StackedHistogram = React.lazy(() =>
  import("../newsletters/chartStyles").then((m) => ({ default: m.StackedHistogram }))
);
const WeeklyScoringChart = React.lazy(() =>
  import("../newsletters/chartStyles").then((m) => ({ default: m.WeeklyScoringChart }))
);

export interface RegistryEntry {
  /** Short name shown in the builder palette and anchor nav. */
  label: string;
  /** Rendered section heading; undefined = subheader-only section. */
  title: (data: NewsletterData, section: IssueSection) => string | undefined;
  subtitle?: (data: NewsletterData, section: IssueSection) => string | undefined;
  /** The underlying query result driving loading/error state. */
  result: (data: NewsletterData) => SectionResult<unknown>;
  /**
   * onPatchSection is builder-only: when provided (draft mode), sections with
   * editor-editable data (e.g. WP odds inputs) can patch themselves. Reader
   * and published previews render without it.
   */
  render: (
    data: NewsletterData,
    section: IssueSection,
    onPatchSection?: (patch: Partial<IssueSection>) => void
  ) => React.ReactNode;
  skeleton: React.ReactNode;
  /** False = suppress the section (e.g. empty playoff data). */
  shouldRender?: (data: NewsletterData, section: IssueSection) => boolean;
}

/**
 * Default heading for a "matchup" section: "Team A vs Team B" once starters
 * data is in, "Matchup N" before that (or for byes/stale ids).
 */
export function matchupHeading(data: NewsletterData, matchupId: number | undefined): string {
  const names = (data.starters.data ?? [])
    .filter((s) => s.matchup_id === matchupId)
    .map((s) => s.team_name);
  if (names.length >= 2) return `${names[0]} vs ${names[1]}`;
  if (names.length === 1) return names[0];
  return matchupId !== undefined ? `Matchup ${matchupId}` : "Matchup";
}

export const SECTION_REGISTRY: Record<string, RegistryEntry> = {
  awards: {
    label: "Awards",
    title: () => "Awards and Recap",
    result: (d) => d.awards,
    render: (d) => <AwardsGridV2 awardsData={d.awards.data ?? []} />,
    skeleton: <AwardsSkeleton />,
  },
  efficiency: {
    label: "Manager Skill",
    title: () => "Manager Skill Assessment",
    result: (d) => d.efficiency,
    render: (d) => (
      <React.Suspense fallback={<ChartSkeleton />}>
        <EfficiencyChart chartData={d.efficiency.data ?? []} />
      </React.Suspense>
    ),
    skeleton: <ChartSkeleton />,
  },
  matchup: {
    label: "Matchup",
    title: () => undefined,
    subtitle: (d, s) => s.title || matchupHeading(d, s.matchupId),
    result: (d) => d.starters,
    render: (d, s) => (
      <React.Suspense fallback={<MatchupSkeleton />}>
        <MatchupPlot data={d.starters.data ?? []} matchupId={s.matchupId ?? 0} />
      </React.Suspense>
    ),
    skeleton: <MatchupSkeleton />,
    shouldRender: (d, s) =>
      s.matchupId !== undefined &&
      (d.starters.status !== "success" ||
        (d.starters.data ?? []).some((m) => m.matchup_id === s.matchupId)),
  },
  "scoring-distributions": {
    label: "Scoring Distributions",
    title: () => "Scoring Distributions",
    result: (d) => d.matchupData,
    render: (d) => (
      <React.Suspense fallback={<ChartSkeleton />}>
        <ArticleSubheader>Distribution of Scoring</ArticleSubheader>
        <StackedHistogram chartData={d.matchupData.data ?? []} />
        <ArticleCaption>Weekly Scoring Distribution w/ Historical Scores</ArticleCaption>

        <ArticleSubheader>Weekly Scoring Chart</ArticleSubheader>
        <WeeklyScoringChart chartData={d.matchupData.data ?? []} />
        <ArticleCaption>Weekly Scoring Chart</ArticleCaption>

        <ArticleSubheader>Weekly Margin of Victory</ArticleSubheader>
        <WeeklyMarginTable
          matchupData={d.matchupData.data ?? []}
          leaderboardData={d.leaderboard.data ?? []}
        />
        <ArticleCaption>Weekly Margin of Victory Table</ArticleCaption>
      </React.Suspense>
    ),
    skeleton: <ChartSkeleton />,
  },
  standings: {
    label: "Standings",
    title: () => "Standings",
    subtitle: (d) =>
      d.isMedianLeague ? "Record includes matchups against the league median" : undefined,
    result: (d) => (d.isMedianLeague ? d.median : d.leaderboard),
    render: (d) =>
      d.isMedianLeague ? (
        <AltLeaderboardTable data={d.median.data ?? []} />
      ) : (
        <LeaderboardTable leaderboardData={d.leaderboard.data ?? []} />
      ),
    skeleton: <TableSkeleton rows={10} columns={6} />,
  },
  "power-rankings": {
    label: "Power Rankings",
    title: () => "Power Rankings",
    subtitle: () => "Rankings based on recent performance and strength of schedule",
    result: (d) => d.powerRankings,
    render: (d) => <PowerRankingsTable powerRankingsData={d.powerRankings.data ?? []} />,
    skeleton: <TableSkeleton rows={10} columns={4} />,
  },
  median: {
    label: "Median Scoring",
    title: (d) => (d.isMedianLeague ? "Head-to-Head Only Standings" : "Median Scoring Leaderboard"),
    subtitle: (d) =>
      d.isMedianLeague
        ? "What if we didn't play the median?"
        : "Total record including matchups and games vs. league median",
    result: (d) => (d.isMedianLeague ? d.leaderboard : d.median),
    render: (d) =>
      d.isMedianLeague ? (
        <LeaderboardTable leaderboardData={d.leaderboard.data ?? []} />
      ) : (
        <AltLeaderboardTable data={d.median.data ?? []} />
      ),
    skeleton: <TableSkeleton rows={10} columns={5} />,
  },
  "best-ball": {
    label: "Alternate Universe",
    title: () => "Best Ball Standings",
    subtitle: () => "What if everyone played optimal lineups?",
    result: (d) => d.bestBall,
    render: (d) => <AltLeaderboardTable data={d.bestBall.data ?? []} />,
    skeleton: <TableSkeleton rows={10} columns={5} />,
  },
  "playoff-picture": {
    label: "Playoff Picture",
    title: () => "Playoff Probabilities",
    subtitle: () => "Monte Carlo simulation of playoff and last place chances",
    result: (d) => d.playoffStandings,
    // WP odds are never auto-populated — the column only appears when the
    // editor enabled it (section.wpOdds set) and shows their manual values.
    render: (d, s, onPatchSection) => (
      <PlayoffTable
        playoffData={d.playoffStandings.data ?? []}
        wpOdds={s.wpOdds ?? null}
        onWpOddsChange={
          onPatchSection
            ? (team: string, value: string) =>
                onPatchSection({ wpOdds: { ...(s.wpOdds ?? {}), [team]: value } })
            : undefined
        }
      />
    ),
    skeleton: <TableSkeleton rows={10} columns={4} />,
    shouldRender: (d) =>
      d.playoffStandings.status !== "success" || (d.playoffStandings.data?.length ?? 0) > 0,
  },
  schedule: {
    label: "Schedule Comparisons",
    title: () => "Schedule Comparisons",
    subtitle: () => "How would each team fare with different schedules?",
    result: (d) => d.schedule,
    render: (d) => (d.schedule.data ? <ScheduleTable data={d.schedule.data} /> : null),
    skeleton: <TableSkeleton rows={10} columns={6} />,
    shouldRender: (d) =>
      d.schedule.status !== "success" || (d.schedule.data?.current_records.length ?? 0) > 0,
  },
};

/**
 * Prefill order for a fresh issue — mirrors the weekly recap page. "matchup"
 * is a slot marker: it expands to one section per matchup_id once starters
 * data resolves (see IssueBuilder).
 */
export const DEFAULT_SECTION_ORDER = [
  "awards",
  "efficiency",
  "matchup",
  "scoring-distributions",
  "standings",
  "power-rankings",
  "median",
  "best-ball",
  "playoff-picture",
  "schedule",
];
