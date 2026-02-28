/**
 * YahooApi.ts — Raw Yahoo Fantasy Sports API fetchers with deduplication and auto-refresh.
 *
 * Yahoo's Fantasy API has no CORS headers, so all API calls are routed through
 * the Vercel proxy (action: "fetch"). Tokens are stored in localStorage via
 * yahooCredentials.ts and refreshed automatically via the proxy before requests.
 *
 * In-flight deduplication prevents duplicate HTTP requests when multiple compute
 * functions call the same endpoint concurrently.
 *
 * Auth flow: standard OAuth 2.0 authorization code (no PKCE).
 * The client_secret lives in the Vercel proxy (YAHOO_CLIENT_SECRET env var).
 * The client_id is in REACT_APP_YAHOO_CLIENT_ID for constructing the auth URL.
 */
import type {
  YahooLeagueResponse,
  YahooLeagueTeamsResponse,
  YahooLeagueRostersResponse,
  YahooLeagueScoreboardResponse,
  YahooLeagueSettingsResponse,
  YahooGameResponse,
} from "../../types/yahooTypes";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  getYahooCredentials,
  saveYahooCredentials,
  isYahooTokenExpired,
} from "../yahooCredentials";

const YAHOO_API_BASE = "/fantasy/v2";

const _inflight = new Map<string, Promise<unknown>>();

/** Yahoo client_id — used only for constructing the OAuth redirect URL. */
export const CLIENT_ID = process.env.REACT_APP_YAHOO_CLIENT_ID ?? "";

// ---------------------------------------------------------------------------
// Proxy URL (same Vercel service as ESPN, different path)
// ---------------------------------------------------------------------------

let _proxyUrlPromise: Promise<string> | null = null;

function getYahooProxyUrl(): Promise<string> {
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
      const url = new URL(webhookServiceUrl);
      url.pathname = "/api/yahoo";
      return url.toString();
    })
    .catch((err) => {
      console.error("[YahooApi] Failed to fetch proxy URL from Firestore:", err);
      _proxyUrlPromise = null;
      return "";
    });
  return _proxyUrlPromise;
}

// ---------------------------------------------------------------------------
// Token refresh
// ---------------------------------------------------------------------------

let _refreshPromise: Promise<void> | null = null;

/**
 * Refresh the Yahoo access token via the proxy if it's expired.
 * Concurrent refresh calls share one promise.
 */
async function refreshIfNeeded(): Promise<void> {
  if (!isYahooTokenExpired()) return;

  if (_refreshPromise) return _refreshPromise;

  _refreshPromise = (async () => {
    const creds = getYahooCredentials();
    if (!creds?.refreshToken) {
      throw new Error("[YahooApi] No refresh token available — re-authorization required.");
    }

    const proxyUrl = await getYahooProxyUrl();
    if (!proxyUrl) {
      throw new Error("[YahooApi] Could not reach token proxy.");
    }

    const res = await fetch(proxyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "refresh",
        refreshToken: creds.refreshToken,
      }),
    });

    if (!res.ok) {
      throw new Error(`[YahooApi] Token refresh failed: ${res.status}`);
    }

    const data = await res.json();
    saveYahooCredentials({
      accessToken: data.access_token,
      refreshToken: data.refresh_token ?? creds.refreshToken,
      expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000,
    });
  })().finally(() => {
    _refreshPromise = null;
  });

  return _refreshPromise;
}

// ---------------------------------------------------------------------------
// Core fetch with deduplication
// ---------------------------------------------------------------------------

function dedupedFetch<T>(path: string): Promise<T> {
  const fullPath = `${YAHOO_API_BASE}${path}${path.includes("?") ? "&" : "?"}format=json`;

  const cached = _inflight.get(fullPath);
  if (cached) return cached as Promise<T>;

  // Yahoo's Fantasy API has no CORS headers — all calls must go through the proxy.
  const promise: Promise<T> = (async () => {
    await refreshIfNeeded();
    const creds = getYahooCredentials();
    if (!creds)
      throw new Error("[YahooApi] Not authenticated — please connect your Yahoo account.");

    const proxyUrl = await getYahooProxyUrl();
    if (!proxyUrl) throw new Error("[YahooApi] Could not reach proxy.");

    const res = await fetch(proxyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "fetch", path: fullPath, token: creds.accessToken }),
    });

    if (!res.ok) throw new Error(`Yahoo API error: ${res.status} ${res.statusText}`);
    return res.json() as Promise<T>;
  })().finally(() => {
    _inflight.delete(fullPath);
  });

  _inflight.set(fullPath, promise);
  return promise;
}

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

/** Build the Yahoo league resource key from a numeric league ID */
function leagueKey(numericId: string): string {
  return `nfl.l.${numericId}`;
}

// ---------------------------------------------------------------------------
// Exported fetchers
// ---------------------------------------------------------------------------

export async function fetchLeague(numericId: string): Promise<YahooLeagueResponse> {
  return dedupedFetch<YahooLeagueResponse>(`/league/${leagueKey(numericId)}`);
}

export async function fetchSettings(numericId: string): Promise<YahooLeagueSettingsResponse> {
  return dedupedFetch<YahooLeagueSettingsResponse>(`/league/${leagueKey(numericId)}/settings`);
}

export async function fetchTeams(numericId: string): Promise<YahooLeagueTeamsResponse> {
  return dedupedFetch<YahooLeagueTeamsResponse>(`/league/${leagueKey(numericId)}/teams`);
}

export async function fetchRosters(
  numericId: string,
  week?: number
): Promise<YahooLeagueRostersResponse> {
  const weekParam = week != null ? `;week=${week}` : "";
  return dedupedFetch<YahooLeagueRostersResponse>(
    `/league/${leagueKey(numericId)}/teams/roster${weekParam}`
  );
}

export async function fetchMatchups(
  numericId: string,
  week: number
): Promise<YahooLeagueScoreboardResponse> {
  return dedupedFetch<YahooLeagueScoreboardResponse>(
    `/league/${leagueKey(numericId)}/scoreboard;week=${week}`
  );
}

export async function fetchNflGame(): Promise<YahooGameResponse> {
  return dedupedFetch<YahooGameResponse>(`/game/nfl`);
}

/**
 * Fetch per-player fantasy points for a batch of players in a specific week.
 * Requesting via the league endpoint returns points calculated with the
 * league's own scoring settings (not raw stats).
 * Keep batches ≤ 25 to stay within Yahoo URL length limits.
 */
export async function fetchPlayerStats(
  numericId: string,
  playerKeys: string[],
  week: number
): Promise<unknown> {
  if (playerKeys.length === 0) return null;
  const keys = playerKeys.join(",");
  const path = `/league/${leagueKey(numericId)}/players;player_keys=${keys}/stats;type=week;week=${week}`;
  console.log("[YahooApi:fetchPlayerStats] path:", path.slice(0, 150));
  return dedupedFetch(path);
}

// ---------------------------------------------------------------------------
// OAuth helpers (used by YahooLogin / YahooCallback)
// ---------------------------------------------------------------------------

/** Build the Yahoo OAuth authorization URL. Uses state for CSRF protection. */
export function buildAuthUrl(clientId: string, redirectUri: string, state: string): string {
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    scope: "fspt-r",
    state,
  });
  return `https://api.login.yahoo.com/oauth2/request_auth?${params.toString()}`;
}

/**
 * Exchange an authorization code for tokens via the Vercel proxy.
 * The proxy uses the server-side YAHOO_CLIENT_SECRET for Basic Auth.
 */
export async function exchangeCodeForTokens(
  code: string,
  redirectUri: string
): Promise<{ accessToken: string; refreshToken: string; expiresAt: number }> {
  const proxyUrl = await getYahooProxyUrl();
  if (!proxyUrl) throw new Error("Could not reach token proxy.");

  const res = await fetch(proxyUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "exchange",
      redirectUri,
      code,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error_description ?? `Token exchange failed: ${res.status}`);
  }

  const data = await res.json();
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000,
  };
}
