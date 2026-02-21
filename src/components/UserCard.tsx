import styled from "styled-components";
import { Roster, User } from "../types/sleeperTypes";
import { calculatePoints, formatRecord, getAvatarUrl } from "../utils/leagueHistory";

const Card = styled.div`
  background-color: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.newsBlue};
  border-radius: 10px;
  padding: 15px;
  text-align: center;

  h2 {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 1.1rem;
    margin: 5px 0;
  }

  p {
    margin: 5px 0;
    font-size: 0.9rem;
  }
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 5px auto;
`;

interface UserCardProps {
  title: string;
  user: User | null;
  roster: Roster | null;
  season: string;
}

export function UserCard({ title, user, roster, season }: UserCardProps) {
  const avatarUrl = user ? getAvatarUrl(user) : undefined;

  return (
    <Card>
      <h2>{title}</h2>
      {avatarUrl && <Avatar src={avatarUrl} alt={`${user?.display_name}'s avatar`} />}
      <h3>{user?.display_name}</h3>
      {user?.metadata.team_name && <p>Team: {user.metadata.team_name}</p>}
      {roster && (
        <>
          <p>Record: {formatRecord(roster)}</p>
          <p>Points For: {calculatePoints(roster)}</p>
        </>
      )}
    </Card>
  );
}
