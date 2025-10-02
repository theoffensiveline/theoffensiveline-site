import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { SurvivorPick } from "../utils/survivorUtils";
import {
  getLeague,
  getMatchups,
  getNflState,
  getUsers,
  getRosters,
  SleeperTeamIdMapping,
} from "../utils/api/SleeperAPI";
import { saveSurvivorPick, getUserSurvivorPick, getSurvivorStandings } from "../utils/survivorUtils";
import { Matchup, Roster, User, Player } from "../types/sleeperTypes";
import playerData from "../utils/api/sleeper_players.json";
import { leagueIds } from "../components/constants/LeagueConstants";
import {
  SurvivorContainer,
  SurvivorTitle,
  SurvivorMatchupContainer,
  SurvivorMatchupTitle,
  SurvivorMatchupTeamRow,
  SurvivorMatchupTeamInfo,
  SurvivorMatchupPlayerRows,
  SurvivorMatchupPositions,
  SurvivorMatchupVs,
  SurvivorMatchupPosition,
  SurvivorButton,
  SurvivorWeekNav,
  LoadingSpinner,
  TeamPointsRow,
} from "../components/survivorStyles";

interface Team {
  team_id: string;
  team_name: string;
  team_logo: string;
  team_wins: number;
  team_losses: number;
  team_ties: number;
  team_points_for: number;
  team_points_against: number;
}

interface UserStatus {
  isEliminated: boolean;
  lives: number;
}

// Add this interface near the top with other interfaces
interface StarterWithPosition {
  id: string;
  position: string;
  points: number;
}

// Update the Matchup type to include the new starters format
interface ExtendedMatchup extends Omit<Matchup, "starters"> {
  starters: StarterWithPosition[];
}

const Survivor: React.FC = () => {
  const [week, setWeek] = useState<number | null>(null);
  const [currentWeek, setCurrentWeek] = useState<number | null>(null);
  const [matchups, setMatchups] = useState<ExtendedMatchup[]>([]);
  const [teams, setTeams] = useState<Record<number, Team>>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userPick, setUserPick] = useState<SurvivorPick | null>(null);
  const [userStatus, setUserStatus] = useState<UserStatus | null>(null);
  const LEAGUE_ID = leagueIds.mainLeague;

  // Create a map from player ID to player name
  const playerMap = Object.entries(
    playerData as unknown as Record<string, Player>
  ).reduce((map, [id, player]) => {
    let playerName: string | null = null;
    if (player.position === "DEF") {
      playerName = player.team; // This assumes player.team is a string or null
    } else {
      playerName = `${player.first_name} ${player.last_name}`;
    }
    if (playerName !== null) {
      map[id] = playerName;
    }
    return map;
  }, {} as Record<string, string | null>);

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleTeamSelect = async (teamId: number) => {
    if (!currentUser) {
      navigate("/login", { state: { from: "/survivor" } });
      return;
    }

    const team = teams[teamId];
    if (!team) return;

    try {
      // Find the roster ID for the selected team first
      const rosterEntry = Object.entries(teams).find(
        ([_, t]) => t.team_id === team.team_id
      );
      if (!rosterEntry) {
        throw new Error("Could not find roster for selected team");
      }
      const rosterId = rosterEntry[0];

      const ownerName = Object.keys(SleeperTeamIdMapping).includes(rosterId)
        ? SleeperTeamIdMapping[rosterId as keyof typeof SleeperTeamIdMapping]
        : "Unknown Owner";

      // If this is the already picked team, do nothing
      if (userPick?.teamIdSelected === rosterId) {
        return;
      }

      // If another team is already picked, confirm the change
      if (userPick) {
        const currentPickOwnerName = Object.keys(SleeperTeamIdMapping).includes(
          userPick.teamIdSelected
        )
          ? SleeperTeamIdMapping[
              userPick.teamIdSelected as keyof typeof SleeperTeamIdMapping
            ]
          : "Unknown Owner";

        const confirmUpdate = window.confirm(
          `You already picked ${currentPickOwnerName} for this week. Do you want to change to ${ownerName}?`
        );
        if (!confirmUpdate) return;
      }

      const pick = {
        leagueId: LEAGUE_ID,
        userId: currentUser.uid,
        ownerName,
        username:
          currentUser.displayName || `User-${currentUser.uid.slice(0, 6)}`,
        week: week || currentWeek || 1,
        teamIdSelected: rosterId,
      };

      const result = await saveSurvivorPick(pick);
      if (result.success) {
        setUserPick({
          ...pick,
          id: result.id || "",
          timestamp: {
            seconds: Math.floor(Date.now() / 1000),
            nanoseconds: 0,
          } as any,
        });
      } else {
        throw new Error("Failed to save pick");
      }
    } catch (error) {
      console.error("Error saving pick:", error);
      alert("Failed to save your pick. Please try again.");
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const currentWeek = await fetchWeekFromSleeper();
        await fetchMatchups(currentWeek, currentWeek);
      } catch (err) {
        setError("Failed to fetch initial data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (LEAGUE_ID) {
      fetchInitialData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [LEAGUE_ID]);

  // Fetch user's pick and status when week or currentUser changes
  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser || !week) return;

      try {
        // Fetch user's pick
        const pick = await getUserSurvivorPick(LEAGUE_ID, currentUser.uid, week);
        setUserPick(pick);
        
        // Try to get user status from standings
        try {
          const standings = await getSurvivorStandings(LEAGUE_ID);
          const userStatus = standings.userStatus?.[currentUser.uid];
          if (userStatus) {
            setUserStatus({
              isEliminated: userStatus.isEliminated ?? false,
              lives: userStatus.lives ?? 0
            });
          }
        } catch (error) {
          console.error("Error fetching standings:", error);
          // If we can't get standings, assume not eliminated
          setUserStatus({
            isEliminated: false,
            lives: 1 // Default to 1 life if we can't determine
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (currentUser && week) {
      fetchUserData();
    } else {
      setUserPick(null);
      setUserStatus(null);
    }
  }, [currentUser, week, LEAGUE_ID]);

  const fetchWeekFromSleeper = async () => {
    try {
      // Fetch the state to get the week number
      const stateData = await getNflState();
      const currentWeek = stateData["week"];
      setWeek(currentWeek);
      setCurrentWeek(currentWeek);
      return currentWeek;
    } catch (error) {
      console.error("Failed to fetch NFL state:", error);
      throw error;
    }
  };

  const fetchMatchups = async (weekNumber: number, currentWeek: number) => {
    try {
      setLoading(true);

      if (weekNumber !== null && LEAGUE_ID) {
        const matchupsData = await getMatchups(LEAGUE_ID, weekNumber);

        // Fetch league data to get roster positions
        const leagueData = await getLeague(LEAGUE_ID);
        const rosterPositions = leagueData.roster_positions;

        // Update the matchups to include roster positions
        const updatedMatchups = (matchupsData as Matchup[]).map(
          (matchup: Matchup) => {
            const { starters, players_points } = matchup;
            const startersWithPositions = starters.map((starterId, index) => ({
              id: starterId,
              position: rosterPositions[index] || "Unknown",
              points: (players_points ?? {})[starterId] || 0,
            }));
            return { ...matchup, starters: startersWithPositions };
          }
        );

        // Now we can safely set the matchups with the correct type
        setMatchups(updatedMatchups as ExtendedMatchup[]);

        // Fetch team rosters and users
        const rostersData = await getRosters(LEAGUE_ID);
        const usersData = await getUsers(LEAGUE_ID);

        // Map rosters to teams
        const teamMap = rostersData.reduce(
          (map: Record<number, Team>, roster: Roster) => {
            const user = usersData.find(
              (user: User) => user.user_id === roster.owner_id
            );
            if (user) {
              map[roster.roster_id] = {
                team_id: roster.owner_id,
                team_name: user.metadata.team_name || user.username,
                team_logo: user.metadata.avatar
                  ? `${user.metadata.avatar}`
                  : "default-avatar.png",
                team_wins: roster.settings.wins,
                team_losses: roster.settings.losses,
                team_ties: roster.settings.ties,
                team_points_for:
                  roster.settings.fpts + roster.settings.fpts_decimal / 100,
                team_points_against:
                  roster.settings.fpts_against +
                  roster.settings.fpts_against_decimal / 100,
              };
            }
            return map;
          },
          {}
        );
        setTeams(teamMap);
      }
    } catch (err) {
      setError("Failed to load matchups data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePreviousWeek = (currentWeek: number) => {
    if (week && week > 1) {
      const newWeek = week - 1;
      setWeek(newWeek);
      fetchMatchups(newWeek, currentWeek); // Fetch matchups for the new week
    }
  };

  const handleNextWeek = (currentWeek: number) => {
    if (week && week < 17) {
      const newWeek = week + 1;
      setWeek(newWeek);
      fetchMatchups(newWeek, currentWeek); // Fetch matchups for the new week
    }
  };

  // Group matchups by matchup_id
  const groupedMatchups = matchups.reduce(
    (groups: Record<number, ExtendedMatchup[]>, matchup) => {
      const { matchup_id } = matchup;
      if (!groups[matchup_id]) {
        groups[matchup_id] = [];
      }
      groups[matchup_id].push(matchup);
      return groups;
    },
    {} as Record<number, ExtendedMatchup[]>
  );

  // Get the name of the currently selected team
  const getSelectedTeamName = () => {
    if (!userPick) return "None";

    // Try to find the team by roster ID (userPick.teamIdSelected is the roster ID)
    const rosterEntry = Object.entries(teams).find(
      ([rosterId]) => rosterId === userPick.teamIdSelected
    );

    return rosterEntry ? rosterEntry[1].team_name : "None";
  };

  // Check if user can make a selection
  const canMakeSelection = userStatus && !userStatus.isEliminated && week === currentWeek;

  return (
    <SurvivorContainer>
      {!loading && week !== null && currentWeek !== null && (
        <>
          <SurvivorWeekNav>
            {week > 1 && (
              <SurvivorButton
                style={{ position: "absolute", left: "0", margin: "10px" }}
                onClick={() => handlePreviousWeek(currentWeek)}
              >
                Previous Week
              </SurvivorButton>
            )}
            <SurvivorButton
              style={{ position: "absolute", right: "0", margin: "10px" }}
              onClick={() => handleNextWeek(currentWeek)}
            >
              Next Week
            </SurvivorButton>
          </SurvivorWeekNav>
          <SurvivorTitle>Week {week} Matchups</SurvivorTitle>
          <div
            style={{
              textAlign: "center",
              margin: "10px 0",
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: userStatus?.isEliminated ? "#ff4444" : "inherit"
            }}
          >
            {userStatus?.isEliminated ? (
              <span>❌ Eliminated - No more picks allowed</span>
            ) : (
              <span>Selection: {getSelectedTeamName()}{userStatus?.lives !== undefined && ` (${userStatus.lives} ${userStatus.lives === 1 ? 'life' : 'lives'} remaining)`}</span>
            )}
          </div>
        </>
      )}
      {loading ? <LoadingSpinner /> : null}
      {/* Show loading message while data is being fetched */}
      {error && <p>{error}</p>} {/* Show error if any */}
      {!loading &&
      week !== null &&
      currentWeek !== null &&
      Object.keys(groupedMatchups).length > 0 ? (
        <div>
          {Object.keys(groupedMatchups).map((matchupId: string) => {
            const matchups = groupedMatchups[parseInt(matchupId, 10)];
            // Ensure matchups is defined and has at least two elements
            if (!matchups || matchups.length < 2) return null;

            const [team1, team2] = matchups;
            const team1StartersSet = new Set(team1.starters.map((s) => s.id));
            const team2StartersSet = new Set(team2.starters.map((s) => s.id));
            const team1BenchPlayers = team1.players.filter(
              (id) => !team1StartersSet.has(id)
            );
            const team2BenchPlayers = team2.players.filter(
              (id) => !team2StartersSet.has(id)
            );

            const team1Details = teams[team1.roster_id] || {
              team_name: "Unknown",
              team_logo: "default-avatar.png",
            };
            const team2Details = teams[team2.roster_id] || {
              team_name: "Unknown",
              team_logo: "default-avatar.png",
            };

            const buildRecord = (details: Team) => {
              const { team_wins, team_losses, team_ties } = details;
              return `${team_wins} - ${team_losses}${
                team_ties > 0 ? ` - ${team_ties}` : ""
              }`;
            };

            return (
              <SurvivorMatchupContainer key={matchupId}>
                {/* Matchup Title (Spanning all 3 columns) */}
                <SurvivorMatchupTitle>Matchup {matchupId}</SurvivorMatchupTitle>

                {/* First row for Team Names and Images */}
                <SurvivorMatchupTeamRow>
                  <SurvivorMatchupTeamInfo>
                    <h3>{team1Details.team_name}</h3>
                    <img
                      src={team1Details.team_logo}
                      alt={team1Details.team_name}
                    />
                    <p>
                      Record: {buildRecord(team1Details)}
                      <br />
                      PF: {team1Details.team_points_for}
                      <br />
                      PA: {team1Details.team_points_against}
                    </p>
                    <SurvivorButton
                      onClick={() => handleTeamSelect(team1.roster_id)}
                      disabled={
                        !canMakeSelection ||
                        (week !== currentWeek &&
                        userPick?.teamIdSelected !== team1.roster_id.toString())
                      }
                      isSelected={
                        userPick?.teamIdSelected === team1.roster_id.toString()
                      }
                      isCurrentWeek={week === currentWeek}
                      title={userStatus?.isEliminated ? "You have been eliminated" : ""}
                    >
                      {userPick?.teamIdSelected === team1.roster_id.toString()
                        ? "Selected"
                        : userPick && week === currentWeek
                        ? "Switch"
                        : "Select"}
                    </SurvivorButton>
                  </SurvivorMatchupTeamInfo>
                  <SurvivorMatchupVs>VS</SurvivorMatchupVs>
                  <SurvivorMatchupTeamInfo>
                    <h3>{team2Details.team_name}</h3>
                    <img
                      src={team2Details.team_logo}
                      alt={team2Details.team_name}
                    />
                    <p>
                      Record: {buildRecord(team2Details)}
                      <br />
                      PF: {team2Details.team_points_for}
                      <br />
                      PA: {team2Details.team_points_against}
                    </p>
                    <SurvivorButton
                      onClick={() => handleTeamSelect(team2.roster_id)}
                      disabled={
                        !canMakeSelection ||
                        (week !== currentWeek &&
                        userPick?.teamIdSelected !== team2.roster_id.toString())
                      }
                      isSelected={
                        userPick?.teamIdSelected === team2.roster_id.toString()
                      }
                      isCurrentWeek={week === currentWeek}
                      title={userStatus?.isEliminated ? "You have been eliminated" : ""}
                    >
                      {userPick?.teamIdSelected === team2.roster_id.toString()
                        ? "Selected"
                        : userPick && week === currentWeek
                        ? "Switch"
                        : "Select"}
                    </SurvivorButton>
                  </SurvivorMatchupTeamInfo>
                </SurvivorMatchupTeamRow>

                {/* Team Points Row */}
                <TeamPointsRow>
                  <div>{team1.points}</div>
                  <div>Points</div>
                  <div>{team2.points}</div>
                </TeamPointsRow>

                {/* Second row for Starters */}
                <SurvivorMatchupPlayerRows>
                  <h4>Starters</h4>
                  {team1.starters.map(({ id }) => (
                    <div
                      key={id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ textAlign: "left" }}>
                        {playerMap[id] || "N/A"}
                      </div>
                      <div style={{ textAlign: "right" }}>
                        {team1.players_points[id] || "0"}
                      </div>
                    </div>
                  ))}
                </SurvivorMatchupPlayerRows>
                <SurvivorMatchupPositions>
                  <h4>Positions</h4>
                  {team1.starters.map(({ position }, index) => (
                    <SurvivorMatchupPosition key={index} position={position}>
                      {position}
                    </SurvivorMatchupPosition>
                  ))}
                </SurvivorMatchupPositions>
                <SurvivorMatchupPlayerRows>
                  <h4>Starters</h4>
                  {team2.starters.map(({ id }) => (
                    <div
                      key={id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ textAlign: "left" }}>
                        {team2.players_points[id] || "0"}
                      </div>
                      <div style={{ textAlign: "right" }}>
                        {playerMap[id] || "N/A"}
                      </div>
                    </div>
                  ))}
                </SurvivorMatchupPlayerRows>

                {/* Third row for Bench */}
                <SurvivorMatchupPlayerRows>
                  <h4>Bench</h4>
                  {team1BenchPlayers.map((id) => (
                    <div key={id} style={{ textAlign: "left" }}>
                      {playerMap[id] || id}
                    </div>
                  ))}
                </SurvivorMatchupPlayerRows>
                <SurvivorMatchupPositions />
                <SurvivorMatchupPlayerRows>
                  <h4>Bench</h4>
                  {team2BenchPlayers.map((id) => (
                    <div key={id} style={{ textAlign: "right" }}>
                      {playerMap[id] || id}
                    </div>
                  ))}
                </SurvivorMatchupPlayerRows>
              </SurvivorMatchupContainer>
            );
          })}
        </div>
      ) : !loading ? (
        <p>No matchups available for this week.</p>
      ) : null}
    </SurvivorContainer>
  );
};

export default Survivor;
