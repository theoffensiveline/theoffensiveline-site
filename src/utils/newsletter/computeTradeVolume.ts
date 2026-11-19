/**
 * Compute cumulative trade volume by week for the trade-volume section.
 *
 * Produces one cumulative-count series per season: the current season
 * (weeks 1..issue week) plus up to MAX_SEASONS - 1 prior seasons reached by
 * walking the league's previous_league_id chain. Prior seasons run through
 * their last scored leg so the chart shows complete seasons next to the
 * in-progress one.
 *
 * Only trades that exchange at least one player are counted — pick-only and
 * FAAB-only trades are excluded, as are non-completed transactions.
 *
 * Every week/leg fetch goes through getTransactions, which permanently
 * caches completed weeks in Firestore, so repeat views cost nothing.
 */

import { getLeague, getPlatform, getTransactions } from "../api/FantasyAPI";
import type { TradeVolumeSeason } from "../../types/newsletterTypes";
import type { League, Transactions } from "../../types/sleeperTypes";

/** Total seasons shown (current + priors), matching the old 4-line chart. */
const MAX_SEASONS = 4;
/** Weeks to scan for a prior season when last_scored_leg is unavailable. */
const FALLBACK_SEASON_WEEKS = 17;
/** Hard cap — no NFL fantasy season scores past week 18. */
const MAX_SEASON_WEEKS = 18;

/**
 * A trade counts when it completed and at least one roster received a
 * player. Trades moving only draft picks or FAAB have an empty `adds` map.
 */
const isPlayerTrade = (tx: Transactions): boolean =>
  tx.type === "trade" && tx.status === "complete" && !!tx.adds && Object.keys(tx.adds).length > 0;

/**
 * Walk previous_league_id from the current league, collecting up to
 * MAX_SEASONS league objects. Stops at the end of the chain, on a fetch
 * failure, or if a league repeats.
 */
const collectSeasonLeagues = async (leagueId: string): Promise<League[]> => {
  const leagues: League[] = [];
  let currentId: string | null = leagueId;

  while (currentId && leagues.length < MAX_SEASONS) {
    let league: League;
    try {
      league = await getLeague(currentId);
    } catch {
      break;
    }
    if (leagues.some((l) => l.league_id === league.league_id)) break;
    leagues.push(league);
    currentId = league.previous_league_id || null;
  }

  return leagues;
};

/**
 * @param leagueId - Platform-prefixed league ID
 * @param week - The issue's week; the current season's series covers 1..week
 * @returns One TradeVolumeSeason per season, current first. Empty for
 *   non-Sleeper leagues (ESPN/Yahoo expose no transactions) or on failure.
 */
export const computeTradeVolume = async (
  leagueId: string,
  week: number
): Promise<TradeVolumeSeason[]> => {
  if (!leagueId || week < 1 || getPlatform(leagueId) !== "sleeper") return [];

  const leagues = await collectSeasonLeagues(leagueId);
  if (leagues.length === 0) return [];

  return Promise.all(
    leagues.map(async (league, index) => {
      /* Current season stops at the issue week; prior seasons run through
         their last scored leg so completed seasons show their full arc. */
      const lastWeek =
        index === 0
          ? week
          : Math.min(league.settings?.last_scored_leg || FALLBACK_SEASON_WEEKS, MAX_SEASON_WEEKS);
      const weekCount = Math.max(1, Math.floor(lastWeek));

      const txWeeks = await Promise.all(
        Array.from({ length: weekCount }, (_, i) =>
          getTransactions(league.league_id, i + 1).catch(() => [] as Transactions[])
        )
      );

      let cumulative = 0;
      const points = txWeeks.map((txs, i) => {
        cumulative += txs.filter(isPlayerTrade).length;
        return { week: i + 1, trades: cumulative };
      });

      return { season: league.season, leagueId: league.league_id, points };
    })
  );
};
