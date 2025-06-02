import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import {
  formatResult,
  getMedalEmoji,
  fetchAndSortResults,
} from "../../utils/leaderboardUtils";

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
      navigate(`/leaderboard/${leaderboard.id}`);
    }
  };

  const fetchTopEntries = useCallback(async () => {
    if (!leaderboard || !leaderboard.id) return;

    try {
      setLoading(true);

      const sortedResults = await fetchAndSortResults(leaderboard.id, leaderboard.sort);

      // Get top 3 distinct names
      const uniqueNames = Array.from(new Set(sortedResults.map(result => result.name)));
      setTopEntries(uniqueNames.slice(0, 3).map(name => sortedResults.find(result => result.name === name)));
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
