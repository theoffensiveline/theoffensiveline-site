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
import { computeWeeklyAwards } from "../utils/awards/computeWeeklyAwards";
import type { WeeklyAward } from "../utils/awards/computeWeeklyAwards";

export const LeagueWeeklyRecap: React.FC = () => {
  const { leagueId, week } = useParams();
  const [awards, setAwards] = useState<WeeklyAward[]>([]);
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
          setError("Missing leagueId");
          return;
        }

        if (!Number.isFinite(parsedWeek) || parsedWeek <= 0) {
          setAwards([]);
          setError("Invalid week");
          return;
        }

        const computed = await computeWeeklyAwards(leagueId, parsedWeek);
        setAwards(computed);
      } catch (e) {
        console.error("Error computing weekly awards:", e);
        setAwards([]);
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
        <AwardsGridV2 awardsData={awards} />
      )}
    </NewsletterContainer>
  );
};

export default LeagueWeeklyRecap;
