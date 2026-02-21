import styled from "styled-components";
import type { Roster, User } from "../../types/sleeperTypes";

export const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.newsBlue};
  margin-bottom: 20px;
`;

export const LoadingState = ({ message = "Loading..." }) => <Container>{message}</Container>;

export const ErrorState = ({ message }: { message: string }) => <Container>{message}</Container>;

export const TeamAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 0%;
`;

export const TeamHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.newsBlue};
`;

export const TeamInfo = styled.div`
  h3 {
    margin: 0;
    color: ${({ theme }) => theme.newsBlue};
  }
  p {
    margin: 5px 0 0;
    color: ${({ theme }) => theme.text};
  }
`;

export const getTeamNameFromRoster = (roster: Roster | undefined | null, users: User[]): string => {
  if (!roster) return "Unknown Team";
  const user = users.find((u) => u.user_id === roster.owner_id);
  return user?.metadata?.team_name || user?.display_name || user?.username || "Unknown Team";
};
