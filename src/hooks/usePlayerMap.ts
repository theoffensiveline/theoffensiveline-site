import { useQuery } from "@tanstack/react-query";
import { getPlayers } from "../utils/api/FantasyAPI";
import type { GenericPlayer } from "../utils/api/FantasyAPI";

/**
 * Returns a platform-agnostic player map for the given league.
 *
 * For Sleeper leagues the map is built synchronously from the bundled JSON
 * (no network call). For ESPN leagues it fetches from the roster API on
 * first access and then caches indefinitely for the session.
 *
 * Returns an empty map while loading so call sites can render without guards.
 */
export function usePlayerMap(leagueId: string): Record<string, GenericPlayer> {
  const { data } = useQuery({
    queryKey: ["players", leagueId],
    queryFn: () => getPlayers(leagueId),
    staleTime: Infinity,
  });
  return data ?? {};
}
