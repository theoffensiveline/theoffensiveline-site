import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  getSurvivorStandings,
  type SurvivorPick,
} from "../utils/survivorUtils";
import { leagueIds } from "../components/constants/LeagueConstants";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getNflState } from "../utils/api/SleeperAPI";

interface UserStanding {
  userId: string;
  userName: string;
  isEliminated: boolean;
  lives: number;
  currentWeek: number;
  picks: Array<{
    week: number;
    teamName: string;
    status: "win" | "loss" | "pending";
    opponentTeamName?: string;
    teamScore?: number;
    opponentScore?: number;
  }>;
}

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  color: ${({ theme }) => theme.text};
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.text};
`;

const Card = styled.div`
  background: ${({ theme }) => theme.componentBackground};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  background: ${({ theme }) => theme.button};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const StandingsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.neutral2};
  }

  th {
    background-color: ${({ theme }) => theme.neutral1};
    font-weight: bold;
    text-align: center;
  }

  tr:hover {
    background-color: ${({ theme }) => theme.neutral1};
  }

  .win {
    color: #4caf50;
  }

  .loss {
    color: #f44336;
  }

  .pending {
    color: #ffc107;
  }

  .current-user {
    background-color: ${({ theme }) => theme.primary}20;
    font-weight: bold;
  }
`;

const SurvivorHome: React.FC = () => {
  const { currentUser } = useAuth();
  const [standings, setStandings] = useState<UserStanding[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const LEAGUE_ID = leagueIds.mainLeague;

  useEffect(() => {
    const loadStandings = async () => {
      try {
        setLoading(true);
        const { picks, userStatus: userStatusMap } = await getSurvivorStandings(
          LEAGUE_ID
        );

        // Group picks by user
        const userPicks = new Map<string, SurvivorPick[]>();
        picks.forEach((pick) => {
          if (!userPicks.has(pick.userId)) {
            userPicks.set(pick.userId, []);
          }
          userPicks.get(pick.userId)?.push(pick);
        });

        // Process each user's picks
        const userStandings: UserStanding[] = [];
        const nflState = await getNflState();
        const currentWeek = nflState.week;
        setCurrentWeek(currentWeek);

        for (const [userId, picks] of userPicks.entries()) {
          const userStatus = userStatusMap[userId] || {
            lives: 2,
            isEliminated: false,
          };
          const sortedPicks = [...picks].sort((a, b) => a.week - b.week);

          // Create a map of week to pick for easy lookup
          const picksByWeek = new Map<number, any>();
          sortedPicks.forEach((pick) => {
            picksByWeek.set(pick.week, {
              week: pick.week,
              teamName:
                pick.ownerName || `Team ${pick.teamIdSelected?.slice(0, 6)}`,
              status: pick.status || "pending",
              opponentTeamName: pick.opponentTeamName,
              teamScore: pick.teamScore,
              opponentScore: pick.opponentScore,
            });
          });

          // Include all weeks up to the current NFL week
          const allPicks = [];
          for (let week = 1; week <= currentWeek; week++) {
            if (picksByWeek.has(week)) {
              allPicks.push(picksByWeek.get(week));
            } else {
              allPicks.push({
                week,
                teamName: "-",
                status: "pending" as const,
              });
            }
          }

          // Get the username from the first pick or use a fallback
          const username = picks[0]?.username || `User ${userId.slice(0, 6)}`;

          userStandings.push({
            userId,
            userName: username,
            isEliminated: userStatus.isEliminated,
            lives: userStatus.lives,
            currentWeek: sortedPicks[sortedPicks.length - 1]?.week || 0,
            picks: allPicks,
          });
        }

        // Sort standings
        userStandings.sort((a, b) => {
          // Not eliminated first
          if (a.isEliminated !== b.isEliminated) {
            return a.isEliminated ? 1 : -1;
          }
          // Then by lives remaining
          if (a.lives !== b.lives) {
            return b.lives - a.lives;
          }
          // Then by current week
          return b.currentWeek - a.currentWeek;
        });

        setStandings(userStandings);
      } catch (err) {
        console.error("Failed to load survivor standings:", err);
        setError("Failed to load survivor standings");
      } finally {
        setLoading(false);
      }
    };

    if (LEAGUE_ID) {
      loadStandings();
    }
  }, [LEAGUE_ID]);

  const currentUserStanding = standings.find(
    (standing) => standing.userId === currentUser?.uid
  );

  const handleMakePick = () => {
    navigate(`/survivor/${LEAGUE_ID}`);
  };

  // Generate weeks array for the table
  const weeks = Array.from({ length: currentWeek }, (_, i) => i + 1);

  if (loading) {
    return <Container>Loading...</Container>;
  }

  if (error) {
    return <Container>Error: {error}</Container>;
  }

  return (
    <Container>
      <Title>Survivor Pool</Title>

      {currentUser && currentUserStanding && (
        <Card>
          <h2>Your Status</h2>
          <div style={{ marginBottom: "15px" }}>
            <p>
              <strong>Status:</strong>{" "}
              {currentUserStanding.isEliminated
                ? "❌ Eliminated"
                : `✅ Alive (${currentUserStanding.lives} ${
                    currentUserStanding.lives === 1 ? "life" : "lives"
                  } remaining)`}
            </p>
            <p>
              <strong>Current Week:</strong> {currentWeek}
            </p>
          </div>
          <Button onClick={handleMakePick}>
            {currentUserStanding.isEliminated
              ? "View Picks"
              : "Make/Update Pick"}
          </Button>
        </Card>
      )}

      <Card>
        <h2>Standings</h2>
        {standings.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <StandingsTable>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Player</th>
                  <th>Status</th>
                  {weeks.map((week) => (
                    <th key={week}>Week {week}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {standings.map((standing, index) => {
                  const isCurrentUser = standing.userId === currentUser?.uid;
                  return (
                    <tr
                      key={standing.userId}
                      className={isCurrentUser ? "current-user" : ""}
                    >
                      <td>{index + 1}</td>
                      <td>{standing.userName}</td>
                      <td>
                        {standing.isEliminated
                          ? `❌ Eliminated`
                          : `✅ Alive (${standing.lives} ${
                              standing.lives === 1 ? "life" : "lives"
                            })`}
                      </td>
                      {weeks.map((week) => {
                        const pick = standing.picks.find(
                          (p) => p.week === week
                        );
                        if (!pick) {
                          return <td key={week}></td>;
                        }

                        return (
                          <td key={week} className={pick.status}>
                            {pick.teamName}
                            {pick.status === "win" && " ✓"}
                            {pick.status === "loss" && " ✗"}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </StandingsTable>
          </div>
        ) : (
          <p>No standings data available yet.</p>
        )}
      </Card>
    </Container>
  );
};

export default SurvivorHome;
