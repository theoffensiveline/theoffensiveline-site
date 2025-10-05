import { useState, useEffect } from "react";
import { ExtendedMatchup, Team } from "../types/survivorTypes";
import { MotwData, computeMotwChain } from "../utils/motwUtils";
import {
  getLeague,
  getMatchups,
  getNflState,
  getUsers,
  getRosters,
} from "../utils/api/SleeperAPI";
import { Matchup, Roster, User } from "../types/sleeperTypes";

export const useSurvivorData = (leagueId: string) => {
  const [week, setWeek] = useState<number | null>(null);
  const [currentWeek, setCurrentWeek] = useState<number | null>(null);
  const [matchups, setMatchups] = useState<ExtendedMatchup[]>([]);
  const [teams, setTeams] = useState<Record<number, Team>>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [motwMatchupId, setMotwMatchupId] = useState<number | null>(null);
  const [allMotwData, setAllMotwData] = useState<Map<number, MotwData>>(
    new Map()
  );

  const fetchWeekFromSleeper = async (): Promise<number> => {
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

      if (weekNumber !== null && leagueId) {
        const matchupsData = await getMatchups(leagueId, weekNumber);

        // Fetch league data to get roster positions
        const leagueData = await getLeague(leagueId);
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
        const rostersData = await getRosters(leagueId);
        const usersData = await getUsers(leagueId);

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

  const computeMotw = async (targetWeek: number, currentWeek: number) => {
    if (targetWeek > currentWeek) {
      setMotwMatchupId(null);
      return;
    }
    const motwData = await computeMotwChain(targetWeek, currentWeek, leagueId);
    setAllMotwData(motwData);
    const data = motwData.get(targetWeek);
    setMotwMatchupId(data?.matchupId || null);
  };

  const handlePreviousWeek = async () => {
    if (week && week > 1) {
      const newWeek = week - 1;
      setWeek(newWeek);
      await fetchMatchups(newWeek, currentWeek || 1);
      await computeMotw(newWeek, currentWeek || 1);
    }
  };

  const handleNextWeek = async () => {
    if (week && week < 17) {
      const newWeek = week + 1;
      setWeek(newWeek);
      await fetchMatchups(newWeek, currentWeek || 1);
      await computeMotw(newWeek, currentWeek || 1);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const currentWeek = await fetchWeekFromSleeper();
        await fetchMatchups(currentWeek, currentWeek);
        await computeMotw(currentWeek, currentWeek);
      } catch (err) {
        setError("Failed to fetch initial data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (leagueId) {
      fetchInitialData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leagueId]);

  return {
    week,
    currentWeek,
    matchups,
    teams,
    error,
    loading,
    motwMatchupId,
    allMotwData,
    handlePreviousWeek,
    handleNextWeek,
  };
};
