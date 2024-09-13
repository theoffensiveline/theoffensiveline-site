import React, { useState, useEffect } from "react";
import {
  getLeague,
  getMatchups,
  getNflState,
  getUsers,
  getRosters,
} from "../components/api/SleeperAPI";
import { Roster, User } from "../types/sleeperTypes";
import playerData from "../components/api/sleeper_players.json"; // Adjust path as necessary
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
  SurvivorSelectTeamButton,
} from "../components/survivorStyles";

interface Matchup {
  starters: Array<{ id: string; position: string }>; // Array of objects with ID and position
  roster_id: number; // Roster ID
  players: string[]; // Array of player IDs
  matchup_id: number; // Matchup ID
  points: number; // Total points for the team
  custom_points: number | null; // Custom points if overridden
}

interface Team {
  team_id: string;
  team_name: string;
  team_logo: string;
}

const Survivor: React.FC = () => {
  const [week, setWeek] = useState<number | null>(null);
  const [matchups, setMatchups] = useState<Matchup[]>([]);
  const [teams, setTeams] = useState<Record<number, Team>>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // hardcoded for now so Chris doesn't have to login
  const LEAGUE_ID = "1124831356770058240"; //localStorage.getItem("selectedLeagueId");

  // Create a map from player ID to player name
  const playerMap = Object.entries(playerData).reduce((map, [id, player]) => {
    map[id] = `${player.first_name} ${player.last_name}`;
    return map;
  }, {} as Record<string, string>);

  const handleTeamSelect = (teamId: number) => {
    const team = teams[teamId];
    alert(
      `You want to select ${team.team_name}? This doesn't work yet, please text Matt Smith your submission until further notice.`
    );
  };

  useEffect(() => {
    const fetchWeekAndMatchups = async () => {
      try {
        // Fetch the state to get the week number
        const stateData = await getNflState();
        const currentWeek = stateData["week"];
        setWeek(currentWeek);

        // Fetch matchups using the fetched week number
        if (currentWeek !== null && LEAGUE_ID) {
          const matchupsData = await getMatchups(LEAGUE_ID, currentWeek);
          setMatchups(matchupsData);

          // Fetch team rosters and users
          const rostersData = await getRosters(LEAGUE_ID);
          const usersData = await getUsers(LEAGUE_ID);

          // Fetch league data to get roster positions
          const leagueData = await getLeague(LEAGUE_ID);
          const rosterPositions = leagueData.roster_positions;

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
                };
              }
              return map;
            },
            {}
          );
          setTeams(teamMap);

          // Update the matchups to include roster positions
          const updatedMatchups = matchupsData.map((matchup: Matchup) => {
            const { starters } = matchup;
            const startersWithPositions = starters.map((id, index) => ({
              id,
              position: rosterPositions[index] || "Unknown",
            }));
            return { ...matchup, starters: startersWithPositions };
          });
          setMatchups(updatedMatchups);
        }
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchWeekAndMatchups();
  }, [LEAGUE_ID]);

  // Group matchups by matchup_id
  const groupedMatchups = matchups.reduce((groups, matchup) => {
    const { matchup_id } = matchup;
    if (!groups[matchup_id]) {
      groups[matchup_id] = [];
    }
    groups[matchup_id].push(matchup);
    return groups;
  }, {} as Record<number, Matchup[]>);

  return (
    <SurvivorContainer>
      <SurvivorTitle>Week {week} Matchups</SurvivorTitle>
      {loading && <p>Loading data...</p>}{" "}
      {/* Show loading message while data is being fetched */}
      {error && <p>{error}</p>} {/* Show error if any */}
      {!loading && week !== null && Object.keys(groupedMatchups).length > 0 ? (
        <div>
          {Object.keys(groupedMatchups).map((matchupId) => {
            const matchups = groupedMatchups[parseInt(matchupId, 10)];
            if (matchups.length < 2) return null; // Ensure there are two matchups to display side by side

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
                    <SurvivorSelectTeamButton
                      onClick={() => handleTeamSelect(team1.roster_id)}
                    >
                      Select
                    </SurvivorSelectTeamButton>
                  </SurvivorMatchupTeamInfo>
                  <SurvivorMatchupVs>VS</SurvivorMatchupVs>
                  <SurvivorMatchupTeamInfo>
                    <h3>{team2Details.team_name}</h3>
                    <img
                      src={team2Details.team_logo}
                      alt={team2Details.team_name}
                    />
                    <SurvivorSelectTeamButton
                      onClick={() => handleTeamSelect(team2.roster_id)}
                    >
                      Select
                    </SurvivorSelectTeamButton>
                  </SurvivorMatchupTeamInfo>
                </SurvivorMatchupTeamRow>

                {/* Second row for Starters */}
                <SurvivorMatchupPlayerRows>
                  <h4>Starters</h4>
                  {team1.starters.map(({ id }) => (
                    <div
                      key={id}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <div>{playerMap[id] || "N/A"}</div>
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
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <div>{playerMap[id] || "N/A"}</div>
                    </div>
                  ))}
                </SurvivorMatchupPlayerRows>

                {/* Third row for Bench */}
                <SurvivorMatchupPlayerRows>
                  <h4>Bench</h4>
                  {team1BenchPlayers.map((id) => (
                    <div key={id}>{playerMap[id] || id}</div>
                  ))}
                </SurvivorMatchupPlayerRows>
                <SurvivorMatchupPositions />
                <SurvivorMatchupPlayerRows>
                  <h4>Bench</h4>
                  {team2BenchPlayers.map((id) => (
                    <div key={id}>{playerMap[id] || id}</div>
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
