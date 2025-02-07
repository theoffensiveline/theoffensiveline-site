import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { getLeague, getUsers, getRosters } from "../utils/api/SleeperAPI";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  text-align: center;

  @media (max-width: 600px) {
    padding: 10px;
  }
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 80%;
  max-width: 800px;
  margin-top: 20px;
  border-collapse: collapse;
  margin-bottom: 50px;
`;

const Th = styled.th`
  padding: 12px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
`;

const Td = styled.td`
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  text-align: center;
`;

interface Standing {
  userName: string;
  wins: number;
  losses: number;
  pointsFor: number;
}

interface LocationState {
  league: {
    league_id: string;
  };
}

function GenericLeagueLandingPage() {
  const [leagueName, setLeagueName] = useState<string>("");
  const [standings, setStandings] = useState<Standing[]>([]);
  const location = useLocation();
  const { league } = (location.state as LocationState) || {};
  const leagueId =
    league?.league_id || localStorage.getItem("selectedLeagueId");

  useEffect(() => {
    if (!leagueId) {
      console.error("No league ID found");
      return;
    }

    const fetchLeagueData = async () => {
      try {
        const league = await getLeague(leagueId);
        setLeagueName(league.name);

        const [users, rosters] = await Promise.all([
          getUsers(leagueId),
          getRosters(leagueId),
        ]);

        const standingsData = rosters.map((roster: any) => {
          const user = users.find((u: any) => u.user_id === roster.owner_id);
          return {
            userName:
              user?.metadata?.team_name || user?.display_name || "Unknown",
            wins: roster.settings.wins || 0,
            losses: roster.settings.losses || 0,
            pointsFor: Number(roster.settings.fpts || 0).toFixed(2),
          };
        });

        // Sort by wins (descending), then points for
        standingsData.sort((a: Standing, b: Standing) =>
          b.wins !== a.wins
            ? b.wins - a.wins
            : Number(b.pointsFor) - Number(a.pointsFor)
        );

        setStandings(standingsData);
      } catch (error) {
        console.error("Error fetching league data:", error);
      }
    };

    fetchLeagueData();
  }, [leagueId]);

  return (
    <Container>
      <Heading>{leagueName || "Loading..."}</Heading>
      <Table>
        <thead>
          <tr>
            <Th>Rank</Th>
            <Th>Team</Th>
            <Th>W</Th>
            <Th>L</Th>
            <Th>PF</Th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team, index) => (
            <tr key={team.userName}>
              <Td>{index + 1}</Td>
              <Td>{team.userName}</Td>
              <Td>{team.wins}</Td>
              <Td>{team.losses}</Td>
              <Td>{team.pointsFor}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default GenericLeagueLandingPage;
