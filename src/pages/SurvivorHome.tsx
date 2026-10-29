import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";
import { type SurvivorPick } from "../utils/survivorUtils";
import { useSurvivorStandings } from "../utils/survivorQueries";
import { leagueIds } from "../components/constants/LeagueConstants";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getNflState } from "../utils/api/SleeperAPI";
import { computeMotwChain } from "../utils/motwUtils";
import { canViewOtherPicks } from "../utils/survivorUtils";
import {
  useSurvivorDeadlineInfo,
  formatEt,
  formatRemaining,
} from "../components/survivor/SurvivorDeadlineBanner";

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
    teamIdSelected?: string;
    isMotw?: boolean;
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
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text};
  font-family: "Playfair Display", serif;
  font-weight: 900;
  font-size: 36px;
  text-transform: uppercase;
`;

type StatusTone = "ok" | "warn" | "locked" | "out";

const StatusBar = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "tone",
})<{ tone: StatusTone }>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px 16px;
  background: ${({ theme }) => theme.componentBackground};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px 16px;
  margin-bottom: 16px;
  border-left: 4px solid
    ${({ tone }) =>
      tone === "warn"
        ? "#e6a800"
        : tone === "locked"
          ? "#f44336"
          : tone === "out"
            ? "#888"
            : "#4caf50"};
  color: ${({ theme }) => theme.text};
`;

const StatusText = styled.span`
  font-weight: 700;
  white-space: nowrap;
`;

const DeadlineText = styled.span`
  font-size: 0.85em;
  opacity: 0.8;
  flex: 1;
  text-align: center;
  min-width: 180px;
`;

const StatusButton = styled.button`
  background: ${({ theme }) => theme.button};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  border-radius: 16px;
  padding: 7px 18px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.componentBackground};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text};
`;

const StandingsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-size: 0.9em;

  th,
  td {
    padding: 8px 6px;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.neutral2};
  }

  th {
    background-color: ${({ theme }) => theme.neutral1};
    font-weight: bold;
    text-align: center;
    white-space: nowrap;
  }

  .player-cell {
    position: sticky;
    left: 0;
    background: ${({ theme }) => theme.componentBackground};
    font-weight: bold;
    white-space: nowrap;
    z-index: 1;
  }

  th.player-cell {
    background: ${({ theme }) => theme.neutral1};
  }

  .week-cell {
    text-align: center;
    white-space: nowrap;
    border-radius: 6px;

    &.win {
      background: rgba(76, 175, 80, 0.18);
    }

    &.loss {
      background: rgba(244, 67, 54, 0.15);
    }
  }

  tr.eliminated {
    opacity: 0.5;
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

const StatusPill = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== "eliminated",
})<{ eliminated: boolean }>`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 0.8em;
  font-weight: 600;
  white-space: nowrap;
  background: ${({ eliminated }) =>
    eliminated ? "rgba(128, 128, 128, 0.2)" : "rgba(76, 175, 80, 0.18)"};
  color: ${({ eliminated }) => (eliminated ? "#888" : "#4caf50")};
`;

const SurvivorHome: React.FC = () => {
  const { currentUser } = useAuth();
  const [standings, setStandings] = useState<UserStanding[]>([]);
  const [currentWeek, setCurrentWeek] = useState(1);
  const navigate = useNavigate();
  const LEAGUE_ID = leagueIds.mainLeague;

  // Use React Query for survivor standings data
  const { data: survivorData, isLoading, error: queryError } = useSurvivorStandings(LEAGUE_ID);

  const computeMotw = useCallback(
    async (targetWeek: number, currentWeekParam: number) => {
      const motwData = await computeMotwChain(targetWeek, currentWeekParam, LEAGUE_ID);
      const newMotwRosters = new Map<number, number[]>();
      motwData.forEach((data, week) => {
        newMotwRosters.set(week, data.rosters);
      });
      return newMotwRosters;
    },
    [LEAGUE_ID]
  );

  // Process survivor data when it changes
  useEffect(() => {
    const processStandingsData = async () => {
      if (!survivorData) return;

      try {
        const { picks, userStatus: userStatusMap } = survivorData;

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

        const motwRostersMap = await computeMotw(currentWeek, currentWeek);

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
              teamName: pick.missed
                ? "No pick"
                : pick.ownerName || `Team ${pick.teamIdSelected?.slice(0, 6)}`,
              status: pick.status || "pending",
              opponentTeamName: pick.opponentTeamName,
              teamScore: pick.teamScore,
              opponentScore: pick.opponentScore,
              teamIdSelected: pick.teamIdSelected,
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

          // Attach MOTW info
          allPicks.forEach((pick) => {
            if (pick.teamIdSelected) {
              const rosterId = parseInt(pick.teamIdSelected);
              const weekRosters = motwRostersMap.get(pick.week);
              pick.isMotw = weekRosters?.includes(rosterId) || false;
            }
          });

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
        console.error("Failed to process survivor standings:", err);
      }
    };

    processStandingsData();
  }, [survivorData, computeMotw]);

  const currentUserStanding = standings.find((standing) => standing.userId === currentUser?.uid);

  const deadlineInfo = useSurvivorDeadlineInfo();
  const deadlineRemaining = deadlineInfo.deadline.getTime() - Date.now();

  const renderHearts = (lives: number) =>
    "❤️".repeat(Math.max(0, lives)) + "🖤".repeat(Math.max(0, 2 - lives));

  // Warn when the user is still alive but hasn't picked for the current week
  const currentWeekPick = currentUserStanding?.picks.find((p) => p.week === currentWeek);
  const needsPick =
    !!currentUserStanding &&
    !currentUserStanding.isEliminated &&
    !deadlineInfo.locked &&
    !currentWeekPick?.teamIdSelected;

  const statusTone: StatusTone = currentUserStanding?.isEliminated
    ? "out"
    : needsPick
      ? "warn"
      : deadlineInfo.locked
        ? "locked"
        : "ok";

  const aliveCount = standings.filter((s) => !s.isEliminated).length;

  const handleMakePick = () => {
    navigate(`/survivor/${LEAGUE_ID}`);
  };

  // Generate weeks array for the table, only including weeks with data
  const weeks = useMemo(() => {
    const weeksWithData = new Set<number>();
    standings.forEach((standing) => {
      standing.picks.forEach((pick) => {
        if (pick.teamName !== "-") {
          weeksWithData.add(pick.week);
        }
      });
    });
    return Array.from(weeksWithData).sort((a, b) => a - b);
  }, [standings]);

  if (isLoading) {
    return <Container>Loading...</Container>;
  }

  if (queryError) {
    return <Container>Error: {queryError.message}</Container>;
  }
  return (
    <Container>
      <Title>Survivor Pool</Title>

      <StatusBar tone={statusTone}>
        <StatusText>
          {!currentUser
            ? "Survivor Pool"
            : !currentUserStanding
              ? "Not entered"
              : currentUserStanding.isEliminated
                ? "❌ Eliminated"
                : `✅ Alive ${renderHearts(currentUserStanding.lives)}`}
        </StatusText>
        <DeadlineText>
          {needsPick && `⚠️ No pick in for Week ${currentWeek} — `}
          {deadlineInfo.locked
            ? `🔒 Picks locked — reopen ${formatEt(deadlineInfo.deadline)}`
            : `⏰ Picks lock ${formatEt(deadlineInfo.deadline)}${
                deadlineRemaining > 0 ? ` · ${formatRemaining(deadlineRemaining)} left` : ""
              }`}
        </DeadlineText>
        {currentUser && (
          <StatusButton onClick={handleMakePick}>
            {!currentUserStanding
              ? "Enter Survivor Pool"
              : currentUserStanding.isEliminated
                ? "View Picks"
                : needsPick
                  ? "Make Pick"
                  : "Update Pick"}
          </StatusButton>
        )}
      </StatusBar>

      <Card>
        <h2>Standings</h2>
        <p style={{ fontSize: "0.9em", color: "#666", marginBottom: "10px" }}>
          {aliveCount} alive · {standings.length - aliveCount} eliminated · ⭐ = Matchup of the Week
          pick
        </p>
        {standings.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <StandingsTable>
              <thead>
                <tr>
                  <th className="player-cell">Player</th>
                  <th>Status</th>
                  {weeks.map((week) => (
                    <th key={week}>Week {week}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {standings.map((standing, index) => {
                  const isCurrentUser = standing.userId === currentUser?.uid;
                  const rowClass = `${isCurrentUser ? "current-user" : ""} ${
                    standing.isEliminated ? "eliminated" : ""
                  }`.trim();
                  return (
                    <tr key={standing.userId} className={rowClass}>
                      <td className="player-cell">
                        {index + 1}. {standing.userName}
                      </td>
                      <td>
                        <StatusPill eliminated={standing.isEliminated}>
                          {standing.isEliminated
                            ? "Eliminated"
                            : `Alive ${renderHearts(standing.lives)}`}
                        </StatusPill>
                      </td>
                      {weeks.map((week) => {
                        const pick = standing.picks.find((p) => p.week === week);

                        const isCurrentUser = standing.userId === currentUser?.uid;
                        const isEliminated = standing.isEliminated;
                        const userEliminatedBeforeThisWeek =
                          isEliminated && week > standing.currentWeek;
                        const canViewPick =
                          pick &&
                          pick.teamName !== "-" &&
                          (week < currentWeek ||
                            (week === currentWeek && (isCurrentUser || canViewOtherPicks())) ||
                            (week > currentWeek && !userEliminatedBeforeThisWeek));

                        if (!pick && !userEliminatedBeforeThisWeek) {
                          return <td key={week}></td>;
                        }

                        return (
                          <td key={week} className={`week-cell ${pick?.status || ""}`}>
                            {canViewPick ? (
                              <>
                                {pick?.isMotw ? "⭐ " : ""}
                                {pick.teamName === "-" ? "N/A" : pick.teamName}
                                {pick.status === "win" && " ✓"}
                                {pick.status === "loss" && " ✗"}
                              </>
                            ) : userEliminatedBeforeThisWeek ? (
                              <span style={{ color: "#666", fontStyle: "italic" }}>N/A</span>
                            ) : (
                              <span style={{ color: "#888", fontStyle: "italic" }}>⏳ Pending</span>
                            )}
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
