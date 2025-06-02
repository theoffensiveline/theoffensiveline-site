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
`;

const Title = styled.h1`
  font-size: 2em;
  font-weight: 700;
  text-align: center;
  margin-bottom: 16px;
`;

const Card = styled.div`
  background-color: white;
  padding: 16px;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 8px;
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
`;

const Name = styled.div`
  font-size: 1.1em;
  color: #333;
  flex-grow: 1;
  margin: 0 16px;
`;

const Score = styled.div`
  font-size: 1.1em;
  font-weight: 500;
  color: #007acc;
  width: 60px;
  text-align: right;
`;

const Stats = styled.div`
  font-size: 0.9em;
  color: #666;
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
  color: #444;
  min-width: 80px;
`;

const StatValue = styled.span`
  color: #666;
`;

const ChallengeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const ChallengeTag = styled.span`
  background-color: #f0f0f0;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.85em;
  color: #555;
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
                        <Score>{Math.round(standing.totalPoints)}</Score>
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
                    </Stats>
                </Card>
            ))}
        </Container>
    );
};

export default OverallLeaderboard; 