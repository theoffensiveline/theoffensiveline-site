import React, { useState, useEffect } from "react";
import {
  getMatchups,
  getState,
  getUsers,
  getRosters,
} from "../components/api/SleeperAPI";
import playerData from "../components/api/sleeper_players.json"; // Adjust path as necessary

interface Matchup {
  starters: string[]; // Array of starter player IDs and team names
  roster_id: number; // Roster ID
  players: string[]; // Array of player IDs and team names
  matchup_id: number; // Matchup ID
  points: number; // Total points for the team
  custom_points: number | null; // Custom points if overridden
}

interface Team {
  team_id: string;
  team_name: string;
  team_logo: string;
}

interface Roster {
  roster_id: number;
  owner_id: string;
  starters: string[];
  players: string[];
  settings: {
    wins: number;
    losses: number;
    ties: number;
    fpts: number;
    fpts_decimal: number;
    fpts_against: number;
    fpts_against_decimal: number;
  };
}

interface User {
  user_id: string;
  username: string;
  display_name: string;
  avatar: string;
  metadata: {
    team_name: string;
    avatar: string;
  };
}

const Survivor: React.FC = () => {
  const [week, setWeek] = useState<number | null>(null);
  const [matchups, setMatchups] = useState<Matchup[]>([]);
  const [teams, setTeams] = useState<Record<number, Team>>({});
  const [error, setError] = useState<string | null>(null);
  const LEAGUE_ID = localStorage.getItem("selectedLeagueId");

  // Create a map from player ID to player name
  const playerMap = Object.entries(playerData).reduce((map, [id, player]) => {
    map[id] = `${player.first_name} ${player.last_name}`;
    return map;
  }, {} as Record<string, string>);

  useEffect(() => {
    const fetchWeekAndMatchups = async () => {
      try {
        // Fetch the state to get the week number
        const stateData = await getState();
        const currentWeek = stateData["week"];
        setWeek(currentWeek);

        // Fetch matchups using the fetched week number
        if (currentWeek !== null && LEAGUE_ID) {
          const matchupsData = await getMatchups(LEAGUE_ID, currentWeek);
          setMatchups(matchupsData);

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
                  team_name: user.metadata.team_name || user.username, // Use metadata.team_name if available
                  team_logo: user.metadata.avatar
                    ? `${user.metadata.avatar}`
                    : "default-avatar.png", // Use metadata.avatar if available
                };
              }
              return map;
            },
            {}
          );
          setTeams(teamMap);
        }
      } catch (err) {
        setError("Failed to load data");
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
    <div>
      <h1>Survivor - Week {week} Matchups</h1>
      {error && <p>{error}</p>} {/* Show error if any */}
      {week === null ? (
        <p>Loading week data...</p>
      ) : Object.keys(groupedMatchups).length > 0 ? (
        <div>
          {Object.keys(groupedMatchups).map((matchupId) => {
            const matchups = groupedMatchups[parseInt(matchupId, 10)];
            if (matchups.length < 2) return null; // Ensure there are two matchups to display side by side

            const [team1, team2] = matchups;
            const team1StartersSet = new Set(team1.starters);
            const team2StartersSet = new Set(team2.starters);
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
              <div
                key={matchupId}
                style={{ paddingLeft: "20px", marginBottom: "20px" }}
              >
                <h2>Matchup {matchupId}</h2>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ width: "45%" }}>
                    <h3>{team1Details.team_name}</h3>
                    <img
                      src={team1Details.team_logo}
                      alt={team1Details.team_name}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    />
                    <div>
                      {team1.starters.map((id) => (
                        <div
                          key={id}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <div style={{ width: "150px" }}>
                            {playerMap[id] || id}
                          </div>
                        </div>
                      ))}
                    </div>
                    <h4>Bench</h4>
                    <div>
                      {team1BenchPlayers.map((id) => (
                        <div key={id}>{playerMap[id] || id}</div>
                      ))}
                    </div>
                  </div>
                  <div style={{ width: "45%" }}>
                    <h3>{team2Details.team_name}</h3>
                    <img
                      src={team2Details.team_logo}
                      alt={team2Details.team_name}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    />
                    <div>
                      {team2.starters.map((id) => (
                        <div
                          key={id}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <div style={{ width: "150px" }}>
                            {playerMap[id] || id}
                          </div>
                        </div>
                      ))}
                    </div>
                    <h4>Bench</h4>
                    <div>
                      {team2BenchPlayers.map((id) => (
                        <div key={id}>{playerMap[id] || id}</div>
                      ))}
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            );
          })}
        </div>
      ) : (
        <p>Loading matchups...</p>
      )}
    </div>
  );
};

export default Survivor;
