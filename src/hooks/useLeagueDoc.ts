/**
 * useLeagueDoc — read (and lazily create) the Firestore document for a league.
 *
 * Every league viewed on the site gets a /leagues/{leagueId} document that
 * holds platform-neutral metadata (demoted by #103/#110 — editor/privacy
 * live on newsletter docs now; `features` stays for the legacy experience).
 *
 * With `createIfMissing: true` (used on league entry pages like Home), the
 * hook creates the document on first authenticated access, seeding it from
 * the platform API (league name + season + seed features).
 * Anonymous visitors never trigger creation — Firestore rules require auth.
 *
 * Without it (used on dashboards), the hook is a plain read: a missing
 * document simply means no one has visited the league while signed in yet.
 */
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { getLeague as getLeagueDoc, createLeague } from "../services/firestoreCrud";
import {
  getLeague as getPlatformLeague,
  getPlatform,
  getPlatformLeagueId,
} from "../utils/api/FantasyAPI";
import type { LeagueDoc } from "../types/firestore";
import { getSeedFeatures } from "../components/constants/LeagueConstants";

interface UseLeagueDocOptions {
  /** Create the Firestore doc on first access when signed in. Default false. */
  createIfMissing?: boolean;
}

export function useLeagueDoc(
  leagueId: string | undefined,
  { createIfMissing = false }: UseLeagueDocOptions = {}
): UseQueryResult<LeagueDoc | null> {
  const { currentUser } = useAuth();
  const canCreate = createIfMissing && !!currentUser;

  return useQuery<LeagueDoc | null>({
    // canCreate is in the key so signing in re-runs the query and creates the doc
    queryKey: ["leagueDoc", leagueId, canCreate],
    enabled: !!leagueId,
    queryFn: async () => {
      const existing = await getLeagueDoc(leagueId!);
      if (existing || !canCreate) return existing;

      const platformLeague = await getPlatformLeague(leagueId!);
      await createLeague(leagueId!, {
        platform: getPlatform(leagueId!),
        platformLeagueId: getPlatformLeagueId(leagueId!),
        name: platformLeague.name,
        season: parseInt(platformLeague.season, 10),
        features: getSeedFeatures(leagueId!),
      });
      return getLeagueDoc(leagueId!);
    },
  });
}
