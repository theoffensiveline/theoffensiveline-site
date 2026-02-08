import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../components/survivorStyles";
import {
  AwardsGridV2,
  ArticleHeader,
  ArticleSubheader,
  NewsletterContainer,
  NewsletterTitle,
} from "../components/newsletters/newsStyles";
import { MatchupPlot } from "../components/newsletters/chartStyles";
import { LeaderboardTable } from "../components/newsletters/tableStyles";
import { computeWeeklyAwards } from "../utils/awards/computeWeeklyAwards";
import type { WeeklyAward } from "../utils/awards/computeWeeklyAwards";
import { computeLeaderboard } from "../utils/newsletter/computeLeaderboard";
import { computeStarters } from "../utils/newsletter/computeStarters";
import type { LeaderboardData, StartersData } from "../types/newsletterTypes";

export const LeagueWeeklyRecap: React.FC = () => {
  const { leagueId, week } = useParams();
  const [awards, setAwards] = useState<WeeklyAward[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardData[]>([]);
  const [starters, setStarters] = useState<StartersData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const parsedWeek = useMemo(() => {
    const w = Number(week);
    return Number.isFinite(w) ? w : NaN;
  }, [week]);

  useEffect(() => {
    const run = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (!leagueId) {
          setAwards([]);
          setLeaderboard([]);
          setStarters([]);
          setError("Missing leagueId");
          return;
        }

        if (!Number.isFinite(parsedWeek) || parsedWeek <= 0) {
          setAwards([]);
          setLeaderboard([]);
          setStarters([]);
          setError("Invalid week");
          return;
        }

        const [computedAwards, computedLeaderboard, computedStarters] =
          await Promise.all([
            computeWeeklyAwards(leagueId, parsedWeek),
            computeLeaderboard(leagueId, parsedWeek),
            computeStarters(leagueId, parsedWeek),
          ]);
        setAwards(computedAwards);
        setLeaderboard(computedLeaderboard);
        setStarters(computedStarters);
      } catch (e) {
        console.error("Error computing weekly recap:", e);
        setAwards([]);
        setLeaderboard([]);
        setStarters([]);
        setError("Failed to load weekly recap");
      } finally {
        setIsLoading(false);
      }
    };

    run();
  }, [leagueId, parsedWeek]);

  return (
    <NewsletterContainer>
      <NewsletterTitle>The Offensive Line</NewsletterTitle>
      <ArticleHeader>Weekly Recap</ArticleHeader>
      <ArticleSubheader>
        Week {Number.isFinite(parsedWeek) ? parsedWeek : "-"}
      </ArticleSubheader>

      <ArticleHeader>Awards and Recap</ArticleHeader>

      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <AwardsGridV2 awardsData={awards} />
          <ArticleHeader>Matchups</ArticleHeader>
          {[...new Set(starters.map((s) => s.matchup_id))]
            .sort((a, b) => a - b)
            .map((matchupId) => (
              <React.Fragment key={matchupId}>
                <ArticleSubheader>Matchup {matchupId}</ArticleSubheader>
                <MatchupPlot data={starters} matchupId={matchupId} />
              </React.Fragment>
            ))}
          <ArticleHeader>Standings</ArticleHeader>
          <LeaderboardTable leaderboardData={leaderboard} />
        </>
      )}
    </NewsletterContainer>
  );
};

export default LeagueWeeklyRecap;
