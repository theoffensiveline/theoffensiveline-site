// ESPNApi.ts — Raw ESPN fantasy football API fetchers with deduplication
import type { ESPNLeagueResponse } from "../../types/espnTypes";

const ESPN_BASE =
  "https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl";

const _inflight = new Map<string, Promise<unknown>>();

function dedupedFetch<T>(url: string): Promise<T> {
  const cached = _inflight.get(url);
  if (cached) return cached as Promise<T>;

  const promise: Promise<T> = fetch(url)
    .then((res) => {
      if (!res.ok)
        throw new Error(`ESPN API error: ${res.status} ${res.statusText}`);
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

export async function fetchLeague(
  numericId: string,
  year?: number
): Promise<ESPNLeagueResponse> {
  const y = year ?? deriveSeasonYear();
  return dedupedFetch<ESPNLeagueResponse>(leagueUrl(numericId, y));
}

export async function fetchMatchups(
  numericId: string,
  year?: number
): Promise<ESPNLeagueResponse> {
  const y = year ?? deriveSeasonYear();
  return dedupedFetch<ESPNLeagueResponse>(
    `${leagueUrl(numericId, y)}?view=mMatchupScore&view=mStatus&view=mSettings&view=mTeam&view=modular&view=mNav`
  );
}

export async function fetchRosters(
  numericId: string,
  year?: number
): Promise<ESPNLeagueResponse> {
  const y = year ?? deriveSeasonYear();
  return dedupedFetch<ESPNLeagueResponse>(
    `${leagueUrl(numericId, y)}?view=mRoster`
  );
}

export async function fetchRecord(
  numericId: string,
  year?: number
): Promise<ESPNLeagueResponse> {
  const y = year ?? deriveSeasonYear();
  return dedupedFetch<ESPNLeagueResponse>(
    `${leagueUrl(numericId, y)}?view=mStatus&view=mSettings&view=mTeam&view=mTransactions2&view=modular&view=mNav`
  );
}
