// ESPNApi.ts — Raw ESPN fantasy football API fetchers with deduplication
import type { ESPNLeagueResponse } from "../../types/espnTypes";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { getEspnCredentials } from "../espnCredentials";

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

function dedupedFetch<T>(url: string): Promise<T> {
  const cached = _inflight.get(url);
  if (cached) return cached as Promise<T>;

  const creds = getEspnCredentials();

  // If credentials are saved, route through the server-side proxy so the
  // Cookie header can be set. Browser fetch cannot set Cookie directly.
  // Otherwise, attempt a direct request (works for public leagues).
  const promise: Promise<T> = (creds ? getEspnProxyUrl() : Promise.resolve(""))
    .then((proxyUrl) => {
      if (creds && proxyUrl) {
        return fetch(proxyUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url, espn_s2: creds.espnS2, swid: creds.swid }),
        });
      }
      return fetch(url, { credentials: "include" });
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
