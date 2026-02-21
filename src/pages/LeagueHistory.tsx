import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getBracketMatchups } from "../utils/api/FantasyAPI";
import { fetchLeagueHistory } from "../utils/leagueHistory";
import { UserCard } from "../components/UserCard";
import {
  Container,
  Title,
  LoadingState,
  ErrorState,
} from "../components/shared/PageComponents";
import type {
  LeagueHistory as LeagueHistoryType,
  Roster,
  User,
} from "../types/sleeperTypes";

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const SeasonDivider = styled.div`
  margin: 40px 0;
  border-top: 2px solid ${({ theme }) => theme.newsBlue};
  padding-top: 20px;
`;

function LeagueHistory() {
  const { leagueId } = useParams<{ leagueId: string }>();
  const [leagueHistory, setLeagueHistory] = useState<LeagueHistoryType | null>(
    null
  );
  const [seasonData, setSeasonData] = useState<
    Array<{
      winner: { user: User | null; roster: Roster | null; season: string };
      loser: { user: User | null; roster: Roster | null };
      toiletBowlChamp: { user: User | null; roster: Roster | null };
      highestPoints: { user: User | null; roster: Roster | null };
    }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!leagueId) return;

      try {
        setLoading(true);
        const history = await fetchLeagueHistory(leagueId);
        setLeagueHistory(history);

        const seasonsData = await Promise.all(
          history.leagues.map(async (league) => {
            const winnersBracket = await getBracketMatchups(
              league.league_id,
              true
            );
            const losersBracket = await getBracketMatchups(
              league.league_id,
              false
            );
            const rosters = history.rosters[league.league_id];
            const users = history.users[league.league_id];

            // Determine the actual winner from the winners bracket
            // Only show a winner if the championship match (final round) is completed
            const finalRound = Math.max(
              ...winnersBracket.map((match) => match.r)
            );
            const championshipMatch = winnersBracket.find(
              (match) => match.r === finalRound && match.w !== null
            );
            const winningRoster = championshipMatch
              ? rosters.find(
                  (roster) => roster.roster_id === championshipMatch.w
                )
              : null;

            const highestPointsRoster = rosters.reduce((highest, current) => {
              const currentPoints =
                current.settings.fpts + current.settings.fpts_decimal / 100;
              const highestPoints =
                highest.settings.fpts + highest.settings.fpts_decimal / 100;
              return currentPoints > highestPoints ? current : highest;
            }, rosters[0]);

            const losingRoster = rosters.reduce((worst, current) => {
              const currentPoints =
                current.settings.fpts + current.settings.fpts_decimal / 100;
              const worstPoints =
                worst.settings.fpts + worst.settings.fpts_decimal / 100;
              return current.settings.wins < worst.settings.wins ||
                (current.settings.wins === worst.settings.wins &&
                  currentPoints < worstPoints)
                ? current
                : worst;
            }, rosters[0]);

            const finalLosersBracketMatch = losersBracket.find(
              (match) =>
                match.r === Math.max(...losersBracket.map((m) => m.r)) &&
                match.w !== null
            );

            const toiletBowlRoster = finalLosersBracketMatch
              ? rosters.find(
                  (roster) => roster.roster_id === finalLosersBracketMatch.w
                )
              : null;

            const findUser = (rosterId: string | null) =>
              rosterId
                ? users.find((user) => user.user_id === rosterId) || null
                : null;

            return {
              winner: {
                user: winningRoster ? findUser(winningRoster.owner_id) : null,
                roster: winningRoster || null,
                season: league.season,
              },
              loser: {
                user: findUser(losingRoster?.owner_id),
                roster: losingRoster || null,
              },
              toiletBowlChamp: {
                user: toiletBowlRoster
                  ? findUser(toiletBowlRoster?.owner_id)
                  : null,
                roster: toiletBowlRoster || null,
              },
              highestPoints: {
                user: findUser(highestPointsRoster?.owner_id),
                roster: highestPointsRoster || null,
              },
            };
          })
        );

        setSeasonData(seasonsData);
      } catch (err) {
        setError("Failed to load league history");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [leagueId]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!leagueHistory)
    return <ErrorState message="No league history available" />;

  return (
    <Container>
      <Title>
        League History ({leagueHistory.metadata.startYear} -{" "}
        {leagueHistory.metadata.endYear})
      </Title>

      {seasonData.map((season, index) => (
        <div key={season.winner.season}>
          {index > 0 && <SeasonDivider />}
          <CardsGrid>
            {season.winner.user && season.winner.roster && (
              <UserCard
                title={`${season.winner.season} Champion`}
                user={season.winner.user}
                roster={season.winner.roster}
                season={season.winner.season}
              />
            )}

            <UserCard
              title={`${season.winner.season} Highest Points`}
              user={season.highestPoints.user}
              roster={season.highestPoints.roster}
              season={season.winner.season}
            />

            <UserCard
              title={`${season.winner.season} Last Place`}
              user={season.loser.user}
              roster={season.loser.roster}
              season={season.winner.season}
            />

            {season.toiletBowlChamp.user && season.toiletBowlChamp.roster && (
              <UserCard
                title={`${season.winner.season} Toilet Bowl Champion`}
                user={season.toiletBowlChamp.user}
                roster={season.toiletBowlChamp.roster}
                season={season.winner.season}
              />
            )}
          </CardsGrid>
        </div>
      ))}
    </Container>
  );
}

export default LeagueHistory;
