import React from 'react';
import { Calendar, User } from 'lucide-react';
import styled from 'styled-components';

const Card = styled.div`
  background-color: white;
  padding: 16px;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
  }
`;

const Title = styled.h3`
  font-size: 1.2em;
  font-weight: 600;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #555;
`;

const LeaderboardCard = ({ leaderboard }) => {
  const handleClick = () => {
    console.log(`Selected leaderboard: ${leaderboard.name}`);
  };

  return (
    <Card onClick={handleClick}>
      <Title>{leaderboard.name}</Title>
      <InfoRow>
        <User size={18} />
        <span>{leaderboard.creator}</span>
      </InfoRow>
      <InfoRow>
        <Calendar size={18} />
        <span>Year: {leaderboard.year}</span>
      </InfoRow>
    </Card>
  );
};

export default LeaderboardCard;