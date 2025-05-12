import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, doc, getDoc, where, query } from 'firebase/firestore';
import { db } from '../../firebase';
import styled from 'styled-components';
import { Plus } from 'lucide-react';
import LeaderboardSubmitModal from "./LeaderboardSubmitModal";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  gap: 16px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  font-size: 2em;
  font-weight: 700;
  text-align: center;
`;

const AddButton = styled.button`
  background-color: #007acc;
  color: white;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #005fa3;
  }
`;

const Card = styled.div`
  background-color: white;
  padding: 16px;
  border-radius: 12px;
  width: 100%;
  max-width: 350px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  transition: transform 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
  }
`;

const Position = styled.div`
  font-size: 1.2em;
  font-weight: 600;
`;

const Name = styled.div`
  font-size: 1.1em;
  color: #333;
`;

const Score = styled.div`
  font-size: 1.1em;
  font-weight: 500;
  color: #007acc;
`;

const Leaderboard = () => {
  const { leaderboardId } = useParams();
  const [leaderboard, setLeaderboard] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitModalVisible, setSubmitModalVisible] = useState(false);

  useEffect(() => {
    fetchLeaderboard();
  }, [leaderboardId]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);

      // Fetch leaderboard details
      const leaderboardRef = doc(db, 'leaderboards', leaderboardId);
      const leaderboardSnap = await getDoc(leaderboardRef);

      if (leaderboardSnap.exists()) {
        const data = leaderboardSnap.data();
        setLeaderboard(data);

        // Fetch results from the 'leaderboard-results' collection by leaderboard_id
        const q = query(
          collection(db, 'leaderboard-results'),
          where('leaderboard_id', '==', leaderboardId)
        );
        const resultsSnap = await getDocs(q);

        const fetchedResults = resultsSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sort the results
        const sortedResults = sortResults(fetchedResults, data.sort);
        setResults(sortedResults);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const sortResults = (results, sortType) => {
    if (sortType === 'low_score') return results.sort((a, b) => a.score - b.score);
    if (sortType === 'high_score') return results.sort((a, b) => b.score - a.score);
    if (sortType === 'low_time') return results.sort((a, b) => timeToMs(a) - timeToMs(b));
    if (sortType === 'high_time') return results.sort((a, b) => timeToMs(b) - timeToMs(a));
    return results;
  };

  const timeToMs = ({ hours = 0, minutes = 0, seconds = 0, milliseconds = 0 }) =>
    (hours * 3600000) + (minutes * 60000) + (seconds * 1000) + milliseconds;

  if (loading) return <p>Loading...</p>;
  if (!leaderboard) return <p>Leaderboard not found.</p>;

  return (
    <>
      {!!submitModalVisible && (
        <LeaderboardSubmitModal
          props={{
            visible: submitModalVisible,
            setVisible: setSubmitModalVisible,
            refresh: fetchLeaderboard,
            sortType: leaderboard.sort,
            leaderboardId: leaderboardId
          }}
        />
      )}
      <Container>
        <TitleContainer>
          <Title>{leaderboard.name}</Title>
          <AddButton onClick={() => setSubmitModalVisible(true)}>
            <Plus size={20} />
          </AddButton>
        </TitleContainer>

        {results.map((result, index) => (
          <Card key={result.id}>
            <Position>#{index + 1}</Position>
            <Name>{result.name}</Name>
            <Score>
              {leaderboard.sort.includes('score')
                ? result.score
                : `${result.hours}h ${result.minutes}m ${result.seconds}s ${result.milliseconds}ms`}
            </Score>
          </Card>
        ))}
      </Container>
    </>
  );
};

export default Leaderboard;
