/**
 * Yahoo OAuth token management.
 *
 * Stores access_token, refresh_token, and expiry in localStorage so the
 * user doesn't have to re-authorize every visit. Tokens are refreshed
 * automatically by YahooApi when they expire.
 */

const STORAGE_KEY = "yahoo_credentials";

export interface YahooCredentials {
  accessToken: string;
  refreshToken: string;
  /** Unix timestamp (ms) when the access token expires */
  expiresAt: number;
}

/** Retrieve saved Yahoo credentials (or null if none / invalid). */
export function getYahooCredentials(): YahooCredentials | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as YahooCredentials;
    if (parsed.accessToken && parsed.refreshToken && parsed.expiresAt) return parsed;
    return null;
  } catch {
    return null;
  }
}

/** Save Yahoo credentials to localStorage. */
export function saveYahooCredentials(creds: YahooCredentials): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(creds));
}

/** Remove saved Yahoo credentials (e.g. on sign-out or re-auth). */
export function clearYahooCredentials(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/** Returns true if the stored access token is expired (or within 60s of expiry). */
export function isYahooTokenExpired(): boolean {
  const creds = getYahooCredentials();
  if (!creds) return true;
  return Date.now() >= creds.expiresAt - 60_000;
}
