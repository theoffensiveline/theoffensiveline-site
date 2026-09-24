// ESPNApi.ts — Raw ESPN fantasy football API fetchers with deduplication
import type { ESPNLeagueResponse, ESPNRosterEntry } from "../../types/espnTypes";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { getEspnCredentials } from "../espnCredentials";
import { cacheKey, readCache, writeCache } from "./platformCache";

const ESPN_BASE = "https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl";

const _inflight = new Map<string, Promise<unknown>>();

/**
 * Fetch and cache the ESPN proxy URL from Firestore.
 *
 * The proxy service URL is stored in config/discord.webhookServiceUrl.
 * We derive the ESPN endpoint by replacing /api/webhook with /api/espn.
 * Cached after first fetch so Firestore is only hit once per session.
 */
let _proxyUrlPromise: Promise<string> | null = null;

function getEspnProxyUrl(): Promise<string> {
  if (_proxyUrlPromise) return _proxyUrlPromise;
  _proxyUrlPromise = getDoc(doc(db, "config", "discord"))
    .then((snap) => {
      if (!snap.exists()) {
        _proxyUrlPromise = null;
        return "";
      }
      const webhookServiceUrl: string = snap.data().webhookServiceUrl ?? "";
      if (!webhookServiceUrl) {
        _proxyUrlPromise = null;
        return "";
      }
      // Build the ESPN proxy URL from the same host, regardless of path
      const url = new URL(webhookServiceUrl);
      url.pathname = "/api/espn";
      return url.toString();
    })
    .catch((err) => {
      console.error("[ESPNApi] Failed to fetch proxy URL from Firestore:", err);
      _proxyUrlPromise = null;
      return "";
    });
  return _proxyUrlPromise;
}

/**
 * Strip a roster entry down to the fields ESPNAdapter reads. Raw entries
 * carry ownership percentages, rankings, acquisition metadata, and a per-week
 * stat array mixing actuals and projections — this is the bulk of the payload.
 */
function trimRosterEntry(entry: ESPNRosterEntry): ESPNRosterEntry {
  const p = entry.playerPoolEntry?.player;
  return {
    playerId: entry.playerId,
    lineupSlotId: entry.lineupSlotId,
    playerPoolEntry: entry.playerPoolEntry && {
      playerId: entry.playerPoolEntry.playerId,
      id: entry.playerPoolEntry.id,
      player: p && {
        id: p.id,
        fullName: p.fullName,
        defaultPositionId: p.defaultPositionId,
        proTeamId: p.proTeamId,
        // The adapter only reads actual stats (statSourceId 0); projections
        // and unused fields are dropped.
        stats: (p.stats ?? [])
          .filter((s) => s.statSourceId === 0)
          .map((s) => ({
            appliedTotal: s.appliedTotal,
            statSourceId: s.statSourceId,
            scoringPeriodId: s.scoringPeriodId,
          })),
      },
    },
  };
}

/**
 * Reduce an ESPN league payload to the fields the adapter reads before
 * persisting it. Raw responses are routinely several MB — over Firestore's
 * 1 MiB document limit — which made writeCache fail silently and left
 * private-league visitors with no fallback. The trimmed shape still satisfies
 * ESPNLeagueResponse, so a cache hit feeds the adapter unchanged.
 */
export function trimLeagueResponse(data: ESPNLeagueResponse): ESPNLeagueResponse {
  return {
    id: data.id,
    seasonId: data.seasonId,
    scoringPeriodId: data.scoringPeriodId,
    settings: data.settings,
    members: (data.members ?? []).map((m) => ({
      id: m.id,
      displayName: m.displayName,
      firstName: m.firstName,
      lastName: m.lastName,
    })),
    teams: (data.teams ?? []).map((t) => ({
      id: t.id,
      name: t.name,
      abbrev: t.abbrev,
      logo: t.logo,
      primaryOwner: t.primaryOwner,
      record: t.record,
      roster: t.roster && { entries: t.roster.entries.map(trimRosterEntry) },
    })),
    schedule: (data.schedule ?? []).map((item) => ({
      id: item.id,
      matchupPeriodId: item.matchupPeriodId,
      winner: item.winner,
      playoffTierType: item.playoffTierType,
      home: item.home && { teamId: item.home.teamId, totalPoints: item.home.totalPoints },
      away: item.away && { teamId: item.away.teamId, totalPoints: item.away.totalPoints },
    })),
  };
}

/**
 * Fetch an ESPN URL with in-flight deduplication and a Firestore fallback.
 *
 * Every successful response is trimmed and written to the apiCache
 * (fire-and-forget) so that visitors without ESPN credentials — e.g. someone
 * opening a shared newsletter link to a private league — can still be served.
 * For those visitors the cache is checked FIRST: a credential-less fetch to a
 * private league is a guaranteed 401, so going live first just adds a dead
 * round trip per endpoint. On a cache miss they still try a direct fetch
 * (public leagues work without creds). Credentialed users always go live
 * first, then fall back to the cache when a fetch fails (ESPN down, expired
 * cookies); otherwise the original error propagates.
 */
function dedupedFetch(url: string, cacheDocId?: string): Promise<ESPNLeagueResponse> {
  const cached = _inflight.get(url);
  if (cached) return cached as Promise<ESPNLeagueResponse>;

  const creds = getEspnCredentials();

  /* If credentials are saved, route through the server-side proxy so the
     Cookie header can be set. Browser fetch cannot set Cookie directly.
     Otherwise, attempt a direct request (works for public leagues). */
  const fetchLive = async (): Promise<ESPNLeagueResponse> => {
    const proxyUrl = creds ? await getEspnProxyUrl() : "";
    const res =
      creds && proxyUrl
        ? await fetch(proxyUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url, espn_s2: creds.espnS2, swid: creds.swid }),
          })
        : await fetch(url, { credentials: "include" });
    if (!res.ok) throw new Error(`ESPN API error: ${res.status} ${res.statusText}`);
    return res.json() as Promise<ESPNLeagueResponse>;
  };

  const promise: Promise<ESPNLeagueResponse> = (async () => {
    if (!creds && cacheDocId) {
      const cachedData = await readCache<ESPNLeagueResponse>(cacheDocId);
      if (cachedData != null) return { data: cachedData, fresh: false };
    }
    return { data: await fetchLive(), fresh: true };
  })()
    .then(({ data, fresh }) => {
      if (fresh && cacheDocId) writeCache(cacheDocId, trimLeagueResponse(data));
      return data;
    })
    .catch(async (err) => {
      if (cacheDocId) {
        const fallback = await readCache<ESPNLeagueResponse>(cacheDocId);
        if (fallback != null) return fallback;
      }
      throw err;
    })
    .finally(() => {
      _inflight.delete(url);
    });

  _inflight.set(url, promise);
  return promise;
}

function leagueUrl(numericId: string, year: number): string {
  return `${ESPN_BASE}/seasons/${year}/segments/0/leagues/${numericId}`;
}

/** Derive the season year from the current date */
export function deriveSeasonYear(): number {
  const now = new Date();
  const month = now.getMonth(); // 0-indexed
  // Aug (7) through Dec (11) = current year; Jan-Jul = previous year
  return month >= 7 ? now.getFullYear() : now.getFullYear() - 1;
}

// Cache doc IDs embed the season year so data from different seasons can
// never collide under the same key (e.g. "espn_123:matchups:2025:5").
function espnCacheId(numericId: string, endpoint: string, year: number, week?: number): string {
  return cacheKey(`espn_${numericId}`, `${endpoint}:${year}`, week);
}

export async function fetchLeague(numericId: string, year?: number): Promise<ESPNLeagueResponse> {
  const y = year ?? deriveSeasonYear();
  return dedupedFetch(leagueUrl(numericId, y), espnCacheId(numericId, "league", y));
}

export async function fetchMatchups(
  numericId: string,
  year?: number,
  scoringPeriodId?: number
): Promise<ESPNLeagueResponse> {
  const y = year ?? deriveSeasonYear();
  const periodParam = scoringPeriodId != null ? `&scoringPeriodId=${scoringPeriodId}` : "";
  return dedupedFetch(
    `${leagueUrl(numericId, y)}?view=mMatchupScore&view=mRoster&view=mStatus&view=mSettings&view=mTeam&view=modular&view=mNav${periodParam}`,
    espnCacheId(numericId, "matchups", y, scoringPeriodId)
  );
}

export async function fetchRosters(numericId: string, year?: number): Promise<ESPNLeagueResponse> {
  const y = year ?? deriveSeasonYear();
  return dedupedFetch(
    `${leagueUrl(numericId, y)}?view=mRoster`,
    espnCacheId(numericId, "rosters", y)
  );
}

export async function fetchRecord(numericId: string, year?: number): Promise<ESPNLeagueResponse> {
  const y = year ?? deriveSeasonYear();
  return dedupedFetch(
    `${leagueUrl(numericId, y)}?view=mStatus&view=mSettings&view=mTeam&view=mTransactions2&view=modular&view=mNav`,
    espnCacheId(numericId, "record", y)
  );
}
