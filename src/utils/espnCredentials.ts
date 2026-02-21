/**
 * ESPN private league credential management.
 *
 * Stores espn_s2 and SWID cookies in localStorage so users
 * don't have to re-enter them every visit.
 */

const STORAGE_KEY = "espn_credentials";

export interface EspnCredentials {
  espnS2: string;
  swid: string;
}

/** Retrieve saved ESPN credentials (or null if none). */
export function getEspnCredentials(): EspnCredentials | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as EspnCredentials;
    if (parsed.espnS2 && parsed.swid) return parsed;
    return null;
  } catch {
    return null;
  }
}

/** Save ESPN credentials to localStorage. */
export function saveEspnCredentials(creds: EspnCredentials): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(creds));
}

/** Remove saved ESPN credentials. */
export function clearEspnCredentials(): void {
  localStorage.removeItem(STORAGE_KEY);
}
