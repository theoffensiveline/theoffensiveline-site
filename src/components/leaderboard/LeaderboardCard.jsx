import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import {
  formatResult,
  getMedalEmoji,
  fetchAndSortResults,
  calculateOverallStandings
} from "../../utils/leaderboardUtils";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";

const Card = styled.div`
  background-color: white;
  padding: 16px;
  border-radius: 12px;
  width: 100%;
  max-width: 350px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  cursor: pointer;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
  }
`;

const Title = styled.h3`
  font-size: 1.2em;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 8px;
`;

const TopEntriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 16px;
`;

const TopEntryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  font-size: 0.9em;
`;

const Position = styled.div`
  display: flex;
  align-items: center;
  width: 20px;
  font-weight: 500;
`;

const Name = styled.div`
  color: #333;
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.85em;
`;

const Score = styled.div`
  font-weight: 500;
  color: #555;
  font-size: 0.85em;
  text-align: right;
`;

const Message = styled.div`
  font-size: 0.85em;
  color: #777;
  text-align: center;
  margin-top: 8px;
`;

const LeaderboardCard = ({ leaderboard }) => {
  const navigate = useNavigate();
  const [topEntries, setTopEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleClick = () => {
    if (!!leaderboard) {
      if (leaderboard.id === "overall") {
        navigate("/leaderboard/overall");
      } else {
        navigate(`/leaderboard/${leaderboard.id}`);
      }
    }
  };

  const fetchTopEntries = useCallback(async () => {
    if (!leaderboard || !leaderboard.id) return;

    try {
      setLoading(true);

      if (leaderboard.id === "overall") {
        // Get all leaderboards for 2025
        const leaderboardsQuery = query(
          collection(db, "leaderboards"),
          where("league_id", "==", "1124831356770058240"),
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

        // Calculate standings using shared function
        const standings = await calculateOverallStandings(leaderboards, allResults);

        // Get top 3 players
        const topPlayers = standings.slice(0, 3).map(player => ({
          id: player.name,
          name: player.name,
          score: Math.round(player.totalPoints)
        }));

        setTopEntries(topPlayers);
      } else {
        const sortedResults = await fetchAndSortResults(leaderboard.id, leaderboard.sort);
        // Get top 3 distinct names
        const uniqueNames = Array.from(new Set(sortedResults.map(result => result.name)));
        setTopEntries(uniqueNames.slice(0, 3).map(name => sortedResults.find(result => result.name === name)));
      }
    } catch (e) {
      console.error("Error fetching top entries:", e);
    } finally {
      setLoading(false);
    }
  }, [leaderboard]);

  useEffect(() => {
    if (leaderboard?.id) {
      fetchTopEntries();
    }
  }, [leaderboard, fetchTopEntries]);

  return (
    <Card onClick={handleClick}>
      <Title>{leaderboard.creator} - {leaderboard.name}</Title>
      {topEntries.length > 0 ? (
        <TopEntriesContainer>
          {topEntries.map((entry, index) => (
            <TopEntryRow key={entry.id}>
              <Position>{getMedalEmoji(index)}</Position>
              <Name>{entry.name}</Name>
              <Score>{formatResult(entry, leaderboard.sort)}</Score>
            </TopEntryRow>
          ))}
        </TopEntriesContainer>
      ) : loading ? (
        <Message>Loading...</Message>
      ) : (
        <Message>No entries yet</Message>
      )}
    </Card>
  );
};

export default LeaderboardCard;
