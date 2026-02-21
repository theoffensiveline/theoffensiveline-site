// ESPNApi.ts — Raw ESPN fantasy football API fetchers with deduplication
import type { ESPNLeagueResponse } from "../../types/espnTypes";
import { getEspnCredentials } from "../espnCredentials";

const ESPN_BASE = "https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl";

const _inflight = new Map<string, Promise<unknown>>();

/**
 * Build fetch headers including ESPN auth cookies when available.
 *
 * For private leagues ESPN requires espn_s2 and SWID cookies.
 * Browser fetch cannot set the Cookie header directly (it's forbidden),
 * so we pass the values via custom headers that ESPN's API recognises.
 * If ESPN's CORS policy rejects these headers, a server-side proxy
 * (e.g. Firebase Cloud Function) will be needed as a follow-up.
 */
function buildHeaders(): HeadersInit | undefined {
  const creds = getEspnCredentials();
  if (!creds) return undefined;
  return {
    "X-Fantasy-espn-s2": creds.espnS2,
    "X-Fantasy-SWID": creds.swid,
  };
}

function dedupedFetch<T>(url: string): Promise<T> {
  const cached = _inflight.get(url);
  if (cached) return cached as Promise<T>;

  const headers = buildHeaders();

  const promise: Promise<T> = fetch(url, {
    headers,
    // Include credentials so the browser sends any ESPN cookies
    // the user already has (e.g. if logged into ESPN in this browser).
    credentials: "include",
  })
    .then((res) => {
      if (!res.ok) throw new Error(`ESPN API error: ${res.status} ${res.statusText}`);
      return res.json() as Promise<T>;
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

export async function fetchLeague(numericId: string, year?: number): Promise<ESPNLeagueResponse> {
  const y = year ?? deriveSeasonYear();
  return dedupedFetch<ESPNLeagueResponse>(leagueUrl(numericId, y));
}

export async function fetchMatchups(
  numericId: string,
  year?: number,
  scoringPeriodId?: number
): Promise<ESPNLeagueResponse> {
  const y = year ?? deriveSeasonYear();
  const periodParam = scoringPeriodId != null ? `&scoringPeriodId=${scoringPeriodId}` : "";
  // mRoster is included so data.teams[].roster.entries has player IDs and
  // per-player appliedStatTotal for the requested scoringPeriodId.
  // mMatchupScore provides the schedule structure and team total points.
  return dedupedFetch<ESPNLeagueResponse>(
    `${leagueUrl(numericId, y)}?view=mMatchupScore&view=mRoster&view=mStatus&view=mSettings&view=mTeam&view=modular&view=mNav${periodParam}`
  );
}

export async function fetchRosters(numericId: string, year?: number): Promise<ESPNLeagueResponse> {
  const y = year ?? deriveSeasonYear();
  return dedupedFetch<ESPNLeagueResponse>(`${leagueUrl(numericId, y)}?view=mRoster`);
}

export async function fetchRecord(numericId: string, year?: number): Promise<ESPNLeagueResponse> {
  const y = year ?? deriveSeasonYear();
  return dedupedFetch<ESPNLeagueResponse>(
    `${leagueUrl(numericId, y)}?view=mStatus&view=mSettings&view=mTeam&view=mTransactions2&view=modular&view=mNav`
  );
}
