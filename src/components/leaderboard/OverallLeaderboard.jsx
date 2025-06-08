import { useEffect, useState, useCallback } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import styled from "styled-components";
import { calculateOverallStandings } from "../../utils/leaderboardUtils";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  gap: 16px;
  color: ${({ theme }) => theme.text};
`;

const Title = styled.h1`
  font-size: 2em;
  font-weight: 700;
  text-align: center;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.text};
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.background};
  padding: 16px;
  border-radius: 12px;
  width: 100%;
  max-width: 350px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid ${({ theme }) => theme.newsBlue};
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Position = styled.div`
  font-size: 1.2em;
  font-weight: 600;
  width: 40px;
  color: ${({ theme }) => theme.text};
`;

const Name = styled.div`
  font-size: 1.1em;
  color: ${({ theme }) => theme.text};
  flex-grow: 1;
  margin: 0 16px;
`;

const Score = styled.div`
  font-size: 1.1em;
  font-weight: 500;
  color: ${({ theme }) => theme.newsBlue};
  width: 60px;
  text-align: right;
`;

const Stats = styled.div`
  font-size: 0.9em;
  color: ${({ theme }) => theme.text}99;
  margin-top: 4px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StatRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: baseline;
`;

const StatLabel = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  min-width: 80px;
`;

const StatValue = styled.span`
  color: ${({ theme }) => theme.text}99;
`;

const ChallengeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const ChallengeTag = styled.span`
  background-color: ${({ theme }) => theme.newsBlue}22;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.85em;
  color: ${({ theme }) => theme.newsBlue};
`;

const OverallLeaderboard = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const LEAGUE_ID = "1124831356770058240";

  const calculateStandings = useCallback(async () => {
    try {
      setLoading(true);

      // Get all leaderboards
      const leaderboardsQuery = query(
        collection(db, "leaderboards"),
        where("league_id", "==", LEAGUE_ID),
        where("year", "==", "2025")
      );
      const leaderboardsSnapshot = await getDocs(leaderboardsQuery);
      const leaderboards = leaderboardsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Get all results for these leaderboards
      const leaderboardIds = leaderboards.map(l => l.id);
      const resultsQuery = query(
        collection(db, "leaderboard-results"),
        where("leaderboard_id", "in", leaderboardIds)
      );
      const resultsSnapshot = await getDocs(resultsQuery);
      const allResults = resultsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const standingsArray = await calculateOverallStandings(leaderboards, allResults);
      setStandings(standingsArray);
    } catch (error) {
      console.error("Error calculating standings:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    calculateStandings();
  }, [calculateStandings]);

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      <Title>All Challenges</Title>
      {standings.map((standing, index) => (
        <Card key={standing.name}>
          <CardHeader>
            <Position>#{index + 1}</Position>
            <Name>{standing.name}</Name>
            <Score>{Number.isInteger(standing.totalPoints) ? standing.totalPoints : Number(standing.totalPoints).toFixed(1)}</Score>
          </CardHeader>
          <Stats>
            <StatRow>
              <StatLabel>1st Place:</StatLabel>
              <ChallengeList>
                {standing.firstPlaceChallenges?.map(challenge => (
                  <ChallengeTag key={challenge}>{challenge}</ChallengeTag>
                ))}
              </ChallengeList>
            </StatRow>
            <StatRow>
              <StatLabel>Top 3:</StatLabel>
              <ChallengeList>
                {standing.topThreeChallenges?.map(challenge => (
                  <ChallengeTag key={challenge}>{challenge}</ChallengeTag>
                ))}
              </ChallengeList>
            </StatRow>
            <StatRow>
              <StatLabel>Completed:</StatLabel>
              <StatValue>{standing.challengesCompleted}/12 Challenges</StatValue>
            </StatRow>
            <StatRow>
              <StatLabel>Submissions:</StatLabel>
              <StatValue>{standing.submissionCount} submission{standing.submissionCount === 1 ? '' : 's'}</StatValue>
            </StatRow>
          </Stats>
        </Card>
      ))}
    </Container>
  );
};

export default OverallLeaderboard;
