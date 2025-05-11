import React, { useEffect } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import LeaderboardCard from './LeaderboardCard';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    max-width: 400px;
`;

const Message = styled.p`
    font-size: 1.2em;
    color: #555;
`;

const YearGroup = styled.div`
    width: 100%;
    margin-bottom: 20px;
`;

const YearTitle = styled.h2`
    font-size: 1.5em;
    font-weight: 700;
    margin-bottom: 12px;
    text-align: center;
    color: #333;
`;

const LeaderboardsHome = () => {
  const [leaderboards, setLeaderboards] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const LEAGUE_ID = "1124831356770058240";

  useEffect(() => {
    if (!!LEAGUE_ID) {
      setLoading(true);
      try {
        const q = query(
          collection(db, 'leaderboards'),
          where('league_id', '==', LEAGUE_ID)
        );
        getDocs(q).then((res) => {
          const data = res.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setLeaderboards(data);
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
  }, [LEAGUE_ID]);

  useEffect(() => {
    // Sort the leaderboards by year descending
    setLeaderboards((prev) =>
      [...prev].sort((a, b) => b.year - a.year)
    );
  }, [leaderboards]);

  if (loading) return <Message>Loading...</Message>;
  if (!leaderboards.length) return <Message>No leaderboards found.</Message>;

  // Group leaderboards by year
  const groupedByYear = leaderboards.reduce((acc, leaderboard) => {
    const year = leaderboard.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(leaderboard);
    return acc;
  }, {});

  return (
    <Container>
      {Object.keys(groupedByYear).sort((a, b) => Number(b) - Number(a)).map((year) => (
        <YearGroup key={year}>
          <YearTitle>{year}</YearTitle>
          {groupedByYear[year].map((leaderboard) => (
            <LeaderboardCard key={leaderboard.id} leaderboard={leaderboard} />
          ))}
        </YearGroup>
      ))}
    </Container>
  );
};

export default LeaderboardsHome;
