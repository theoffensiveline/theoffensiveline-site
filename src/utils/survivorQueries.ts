import { useQuery } from "@tanstack/react-query";
import {
  getSurvivorStandings,
  getUserSurvivorPick,
  getUserSurvivorPicks,
  getMatchupResults,
} from "./survivorUtils";

// Query keys for consistent caching
export const survivorQueryKeys = {
  all: ["survivor"] as const,
  standings: (leagueId: string) => [...survivorQueryKeys.all, "standings", leagueId] as const,
  userPick: (leagueId: string, userId: string, week: number) =>
    [...survivorQueryKeys.all, "userPick", leagueId, userId, week] as const,
  userPicks: (leagueId: string, userId: string) =>
    [...survivorQueryKeys.all, "userPicks", leagueId, userId] as const,
  matchupResults: (leagueId: string, week: number) =>
    [...survivorQueryKeys.all, "matchupResults", leagueId, week] as const,
};

// React Query hooks
export const useSurvivorStandings = (leagueId: string) => {
  return useQuery({
    queryKey: survivorQueryKeys.standings(leagueId),
    queryFn: () => getSurvivorStandings(leagueId),
    enabled: !!leagueId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUserSurvivorPick = (leagueId: string, userId: string, week: number) => {
  return useQuery({
    queryKey: survivorQueryKeys.userPick(leagueId, userId, week),
    queryFn: () => getUserSurvivorPick(leagueId, userId, week),
    enabled: !!leagueId && !!userId && !!week,
    staleTime: 2 * 60 * 1000, // 2 minutes for user-specific data
  });
};

export const useUserSurvivorPicks = (leagueId: string, userId: string) => {
  return useQuery({
    queryKey: survivorQueryKeys.userPicks(leagueId, userId),
    queryFn: () => getUserSurvivorPicks(leagueId, userId),
    enabled: !!leagueId && !!userId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useMatchupResults = (leagueId: string, week: number) => {
  return useQuery({
    queryKey: survivorQueryKeys.matchupResults(leagueId, week),
    queryFn: () => getMatchupResults(leagueId, week),
    enabled: !!leagueId && !!week,
    staleTime: 10 * 60 * 1000, // 10 minutes for matchup data (changes weekly)
  });
};
