/**
 * Selection helpers for the dual-key transition (#108).
 *
 * The NavBar's primary key is now `selectedNewsletterId`; `selectedLeagueId`
 * keeps being written in parallel because the claim card, league-home
 * fallback, and LeaderboardSubmitModal still read it until #103 sub-issue C
 * retires them. All writes go through these helpers so the two keys can't
 * drift, and both fire the `leagueChange` event the NavBar listens for.
 */

/** Select a newsletter: primary key plus its active season as the league key. */
export function setSelectedNewsletter(newsletterId: string, activeLeagueId: string): void {
  localStorage.setItem("selectedNewsletterId", newsletterId);
  localStorage.setItem("selectedLeagueId", activeLeagueId);
  window.dispatchEvent(new Event("leagueChange"));
}

/** Select a bare league (no newsletter context) — clears the newsletter key. */
export function setSelectedLeague(leagueId: string): void {
  localStorage.setItem("selectedLeagueId", leagueId);
  localStorage.removeItem("selectedNewsletterId");
  window.dispatchEvent(new Event("leagueChange"));
}

/** Clear both keys (logout). */
export function clearSelection(): void {
  localStorage.removeItem("selectedLeagueId");
  localStorage.removeItem("selectedNewsletterId");
  window.dispatchEvent(new Event("leagueChange"));
}

export function getSelectedNewsletterId(): string | null {
  return localStorage.getItem("selectedNewsletterId");
}
