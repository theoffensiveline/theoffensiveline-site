import React, { useEffect, useState } from "react";
import { LeaderboardTable } from "../components/newsletters/tableStyles";
import {
  getMatchups,
  getLeague,
  getUsers,
  getRosters,
} from "../utils/api/FantasyAPI";
import { useParams } from "react-router-dom";
import { Roster, User, Matchup, League } from "../types/sleeperTypes";
import { custom_palette36 } from "../components/constants/ColorConstants";
import { LoadingSpinner } from "../components/survivorStyles";

interface StandingsRow {
  Rank: number;
  Trend: string;
  Team: string;
  W: number;
  L: number;
  PF: number;
  PA: number;
  PFColor?: string;
  PAColor?: string;
}

export const LeagueOverview: React.FC = () => {
  const [standings, setStandings] = useState<StandingsRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { leagueId } = useParams();

  useEffect(() => {
    const fetchStandings = async () => {
      setIsLoading(true);
      try {
        if (!leagueId) return;
        const league: League = await getLeague(leagueId);
        const users = await getUsers(leagueId);
        const rosters: Roster[] = await getRosters(leagueId);
        const lastReport = league.settings.last_report;

        // Create a map of roster_id to team name
        const teamNames = new Map();
        rosters.forEach((roster: Roster) => {
          const user = users.find((u: User) => u.user_id === roster.owner_id);
          const teamName =
            user?.metadata?.team_name || user?.display_name || user?.username;
          teamNames.set(roster.roster_id, teamName);
        });

        // Fetch all matchups from week 1 to last_report
        const allMatchups = [];
        for (let week = 1; week <= lastReport; week++) {
          const weekMatchups = await getMatchups(leagueId, week);
          // Add week field to each matchup
          const matchupsWithWeek = weekMatchups.map((matchup: Matchup) => ({
            ...matchup,
            week,
          }));
          allMatchups.push(...matchupsWithWeek);
        }

        // Calculate current standings using all matchups
        const teamStats = calculateStandings(allMatchups, teamNames);

        // Calculate previous week's standings excluding current week
        const previousWeekStats = calculateStandings(
          allMatchups.filter((m: { week: number }) => m.week < lastReport),
          teamNames
        );

        // Transform the data to match LeaderboardTable format
        const formattedStandings = Object.entries(teamStats)
          .sort(([, a], [, b]) => {
            if (b.wins !== a.wins) return b.wins - a.wins;
            return b.pointsFor - a.pointsFor;
          })
          .map(([teamId, team], index) => {
            const prevRank = getPreviousRank(teamId, previousWeekStats);
            const trend = getTrend(index + 1, prevRank);

            return {
              Rank: index + 1,
              Trend: trend,
              Team: team.name,
              W: team.wins,
              L: team.losses,
              PF: Number(team.pointsFor.toFixed(1)),
              PA: Number(team.pointsAgainst.toFixed(1)),
              PFColor: calculateColor(
                team.pointsFor,
                Object.values(teamStats),
                "PF"
              ),
              PAColor: calculateColor(
                team.pointsAgainst,
                Object.values(teamStats),
                "PA"
              ),
            };
          });

        setStandings(formattedStandings);
      } catch (error) {
        console.error("Error fetching standings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStandings();
  }, [leagueId]);

  return (
    <div className="container mx-auto px-8 sm:px-16 max-w-7xl">
      <h1 className="text-2xl font-bold mb-4">League Standings</h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <LeaderboardTable leaderboardData={standings} />
      )}
    </div>
  );
};

// Helper function to calculate standings from matchups
const calculateStandings = (
  matchups: Matchup[],
  teamNames: Map<number, string>
) => {
  const standings: Record<string, any> = {};

  // Initialize standings with roster settings
  matchups.forEach((matchup) => {
    if (!standings[matchup.roster_id]) {
      standings[matchup.roster_id] = {
        name: teamNames.get(matchup.roster_id) || `Team ${matchup.roster_id}`,
        wins: 0,
        losses: 0,
        ties: 0,
        pointsFor: 0,
        pointsAgainst: 0,
      };
    }
  });

  // Group matchups by week
  const matchupsByWeek = matchups.reduce((acc, matchup) => {
    if (!acc[matchup.week!]) {
      acc[matchup.week!] = [];
    }
    acc[matchup.week!].push(matchup);
    return acc;
  }, {} as Record<number, Matchup[]>);

  // Calculate points for/against by week
  Object.values(matchupsByWeek).forEach((weekMatchups) => {
    const matchupPairs = weekMatchups.reduce((acc, matchup) => {
      if (!acc[matchup.matchup_id]) {
        acc[matchup.matchup_id] = [];
      }
      acc[matchup.matchup_id].push(matchup);
      return acc;
    }, {} as Record<number, Matchup[]>);

    Object.values(matchupPairs).forEach((pair) => {
      pair.forEach((matchup) => {
        const opponent = pair.find((m) => m.roster_id !== matchup.roster_id);
        const opponentPoints = opponent ? opponent.points : 0;

        standings[matchup.roster_id].pointsFor += matchup.points;
        standings[matchup.roster_id].pointsAgainst += opponentPoints;

        // Update W/L/T
        if (matchup.points > opponentPoints) {
          standings[matchup.roster_id].wins += 1;
        } else if (matchup.points < opponentPoints) {
          standings[matchup.roster_id].losses += 1;
        } else {
          standings[matchup.roster_id].ties += 1;
        }
      });
    });
  });

  return standings;
};

// Helper function to get previous rank
const getPreviousRank = (
  teamId: string,
  previousStats: Record<string, any>
) => {
  // If there are no previous stats, return 0 to indicate no previous ranking
  if (Object.keys(previousStats).length === 0) return 0;

  const sortedTeams = Object.entries(previousStats).sort(([, a], [, b]) => {
    if (b.wins !== a.wins) return b.wins - a.wins;
    return b.pointsFor - a.pointsFor;
  });

  const index = sortedTeams.findIndex(([id]) => id === teamId);
  // If team wasn't found in previous stats, return 0
  return index === -1 ? 0 : index + 1;
};

// Helper function to calculate trend
const getTrend = (currentRank: number, previousRank: number): string => {
  if (previousRank === 0) return "−";
  if (currentRank < previousRank) return `↑ ${previousRank - currentRank}`;
  if (currentRank > previousRank) return `↓ ${currentRank - previousRank}`;
  return "−";
};

// Helper function to calculate colors based on values
const calculateColor = (value: number, data: any[], type: "PF" | "PA") => {
  const allValues = data.map((team) =>
    type === "PF" ? team.pointsFor : team.pointsAgainst
  );
  const max = Math.max(...allValues);
  const min = Math.min(...allValues);

  const intensity = (value - min) / (max - min);
  const paletteIndex = Math.min(
    Math.floor(intensity * custom_palette36.length),
    custom_palette36.length - 1
  );

  // For PF, use green end of palette (right side)
  // For PA, use red end of palette (left side)
  return type === "PA"
    ? custom_palette36[custom_palette36.length - 1 - paletteIndex]
    : custom_palette36[paletteIndex];
};
