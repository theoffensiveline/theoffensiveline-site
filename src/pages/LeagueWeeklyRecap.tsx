import React, { useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  AwardsGridV2,
  ArticleSubheader,
  NewsletterContainer,
  NewsletterTitle,
} from "../components/newsletters/newsStyles";
import {
  EfficiencyChart,
  MatchupPlot,
} from "../components/newsletters/chartStyles";
import {
  AltLeaderboardTable,
  LeaderboardTable,
  PlayoffTable,
  PowerRankingsTable,
  ScheduleTable,
} from "../components/newsletters/tableStyles";
import { useNewsletterData } from "../hooks/useNewsletterData";
import { SectionShell } from "../components/newsletter/SectionShell";
import { AnchorNav } from "../components/newsletter/AnchorNav";

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

export const LeagueWeeklyRecap: React.FC = () => {
  const { leagueId, week } = useParams();

  const parsedWeek = useMemo(() => {
    const w = Number(week);
    return Number.isFinite(w) ? w : NaN;
  }, [week]);

  // Use the newsletter data hook
  const newsletter = useNewsletterData(leagueId, parsedWeek);

  // Extract matchup IDs for matchup section
  const matchupIds = useMemo(() => {
    if (!newsletter.starters.data) return [];
    return [...new Set(newsletter.starters.data.map((s) => s.matchup_id))].sort(
      (a, b) => a - b,
    );
  }, [newsletter.starters.data]);

  // Determine if inputs are valid
  const hasValidInputs =
    !!leagueId && Number.isFinite(parsedWeek) && parsedWeek > 0;

  // Set document title for SEO
  useEffect(() => {
    const weekStr = Number.isFinite(parsedWeek) ? parsedWeek : "";
    document.title = `Sleeper Weekly Recap – Week ${weekStr} | The Offensive Line`;

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        `Weekly fantasy football recap for Week ${weekStr}: awards, matchup analysis, power rankings, and playoff predictions.`,
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = `Weekly fantasy football recap for Week ${weekStr}: awards, matchup analysis, power rankings, and playoff predictions.`;
      document.head.appendChild(meta);
    }
  }, [parsedWeek]);

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

  // Define sections configuration
  const sections = [
    {
      id: "awards",
      label: "Awards",
      title: "Awards and Recap",
      subtitle: undefined,
      section: newsletter.awards,
      render: () => <AwardsGridV2 awardsData={newsletter.awards.data ?? []} />,
      shouldRender: true,
    },
    {
      id: "matchups",
      label: "Matchup Spotlight",
      title: "Matchups",
      subtitle: undefined,
      section: newsletter.starters,
      render: () => (
        <>
          {matchupIds.map((matchupId) => (
            <React.Fragment key={matchupId}>
              <ArticleSubheader>Matchup {matchupId}</ArticleSubheader>
              <MatchupPlot
                data={newsletter.starters.data ?? []}
                matchupId={matchupId}
              />
            </React.Fragment>
          ))}
        </>
      ),
      shouldRender: true,
    },
    {
      id: "efficiency",
      label: "Manager Skill",
      title: "Manager Skill Assessment",
      subtitle: undefined,
      section: newsletter.efficiency,
      render: () => (
        <EfficiencyChart chartData={newsletter.efficiency.data ?? []} />
      ),
      shouldRender: true,
    },
    {
      id: "standings",
      label: "Standings",
      title: "Standings",
      subtitle: undefined,
      section: newsletter.leaderboard,
      render: () => (
        <LeaderboardTable leaderboardData={newsletter.leaderboard.data ?? []} />
      ),
      shouldRender: true,
    },
    {
      id: "power-rankings",
      label: "Power Rankings",
      title: "Power Rankings",
      subtitle: "Rankings based on recent performance and strength of schedule",
      section: newsletter.powerRankings,
      render: () => (
        <PowerRankingsTable
          powerRankingsData={newsletter.powerRankings.data ?? []}
        />
      ),
      shouldRender: true,
    },
    {
      id: "median",
      label: "Median Scoring",
      title: "Median Scoring Leaderboard",
      subtitle: "Total record including matchups and games vs. league median",
      section: newsletter.median,
      render: () => <AltLeaderboardTable data={newsletter.median.data ?? []} />,
      shouldRender: true,
    },
    {
      id: "best-ball",
      label: "Alternate Universe",
      title: "Best Ball Standings",
      subtitle: "What if everyone played optimal lineups?",
      section: newsletter.bestBall,
      render: () => (
        <AltLeaderboardTable data={newsletter.bestBall.data ?? []} />
      ),
      shouldRender: true,
    },
    {
      id: "playoff-picture",
      label: "Playoff Picture",
      title: "Playoff Probabilities",
      subtitle: "Monte Carlo simulation of playoff and last place chances",
      section: newsletter.playoffStandings,
      render: () => (
        <PlayoffTable playoffData={newsletter.playoffStandings.data ?? []} />
      ),
      shouldRender: (newsletter.playoffStandings.data?.length ?? 0) > 0,
    },
    {
      id: "schedule",
      label: "Schedule Comparisons",
      title: "Schedule Comparisons",
      subtitle: "How would each team fare with different schedules?",
      section: newsletter.schedule,
      render: () => <ScheduleTable data={newsletter.schedule.data!} />,
      shouldRender:
        newsletter.schedule.data !== undefined &&
        newsletter.schedule.data !== null &&
        newsletter.schedule.data.current_records.length > 0,
    },
  ];

  // Filter to only sections that should render
  const visibleSections = sections.filter((s) => s.shouldRender);

  // Prepare anchor nav data
  const anchorSections = visibleSections.map((section) => ({
    id: section.id,
    label: section.label,
    isReady: section.section.status === "success",
  }));

  return (
    <PageLayout>
      <Sidebar>
        <AnchorNav sections={anchorSections} />
      </Sidebar>
      <MainContent>
        <NewsletterContainer>
          <NewsletterTitle>The Offensive Line</NewsletterTitle>
          <ArticleSubheader>
            Sleeper Weekly Recap – Week {parsedWeek}
          </ArticleSubheader>

          {visibleSections.map((section) => (
            <SectionShell
              key={section.id}
              id={section.id}
              title={section.title}
              subtitle={section.subtitle}
              status={section.section.status}
              error={section.section.error}
              onRetry={() => section.section.refetch()}
            >
              {section.render()}
            </SectionShell>
          ))}
        </NewsletterContainer>
      </MainContent>
    </PageLayout>
  );
};

export default LeagueWeeklyRecap;
