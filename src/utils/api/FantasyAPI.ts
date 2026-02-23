/**
 * FantasyAPI.ts — Unified API router that delegates to Sleeper, ESPN, or Yahoo adapters.
 *
 * Exports the same function signatures as SleeperAPI.ts. Compute functions import
 * from this module instead of SleeperAPI directly. The routing decision is based on
 * the league ID prefix:
 *   - "espn_"   → ESPN adapter
 *   - "yahoo_"  → Yahoo adapter
 *   - (numeric) → Sleeper API
 *
 * This is the only file that knows about multiple platforms — compute functions
 * remain platform-agnostic.
 */
import type {
  League,
  User,
  Roster,
  Matchup,
  Transactions,
  BracketMatchup,
} from "../../types/sleeperTypes";
import { sleeperPlayers } from "../playerUtils";
import * as SleeperAPI from "./SleeperAPI";
import * as ESPNAdapter from "./ESPNAdapter";
import * as YahooAdapter from "./YahooAdapter";

/**
 * Minimal player record shared by Sleeper, ESPN, and Yahoo data sources.
 * Only the fields actually accessed in the codebase are included.
 */
export interface GenericPlayer {
  full_name: string | null;
  position: string | null;
  fantasy_positions: string[] | null;
  /** ESPN NFL team abbreviation (e.g. "buf"). Only set for ESPN DEF entries. */
  espn_team_abbrev?: string;
  /** Direct photo URL provided by the platform (e.g. Yahoo headshot). Takes precedence over CDN-constructed URLs. */
  photo_url?: string;
}

/**
 * Check whether a league ID belongs to an ESPN league.
 */
function isEspn(leagueId: string): boolean {
  return leagueId.startsWith("espn_");
}

/**
 * Check whether a league ID belongs to a Yahoo league.
 */
function isYahoo(leagueId: string): boolean {
  return leagueId.startsWith("yahoo_");
}

/**
 * Fetch league metadata.
 */
export const getLeague = async (leagueId: string): Promise<League> => {
  if (isYahoo(leagueId)) return YahooAdapter.getLeague(leagueId);
  if (isEspn(leagueId)) return ESPNAdapter.getLeague(leagueId);
  return SleeperAPI.getLeague(leagueId);
};

/**
 * Fetch all users/owners in a league.
 */
export const getUsers = async (leagueId: string): Promise<User[]> => {
  if (isYahoo(leagueId)) return YahooAdapter.getUsers(leagueId);
  if (isEspn(leagueId)) return ESPNAdapter.getUsers(leagueId);
  return SleeperAPI.getUsers(leagueId);
};

/**
 * Fetch all rosters in a league.
 */
export const getRosters = async (leagueId: string): Promise<Roster[]> => {
  if (isYahoo(leagueId)) return YahooAdapter.getRosters(leagueId);
  if (isEspn(leagueId)) return ESPNAdapter.getRosters(leagueId);
  return SleeperAPI.getRosters(leagueId);
};

/**
 * Fetch matchups for a specific week.
 */
export const getMatchups = async (leagueId: string, week: number): Promise<Matchup[]> => {
  if (isYahoo(leagueId)) return YahooAdapter.getMatchups(leagueId, week);
  if (isEspn(leagueId)) return ESPNAdapter.getMatchups(leagueId, week);
  return SleeperAPI.getMatchups(leagueId, week);
};

/**
 * Fetch current NFL state (week, season).
 *
 * For ESPN and Yahoo leagues, this requires a leagueId since the week info is
 * embedded in the league response (no global NFL state endpoint).
 */
export const getNflState = async (
  leagueId?: string
): Promise<{
  week: number;
  season: string;
  season_type: string;
  season_start_date: string;
  previous_season: string;
  leg: number;
  league_season: string;
  league_create_season: string;
  display_week: number;
}> => {
  if (leagueId && isYahoo(leagueId)) return YahooAdapter.getNflState(leagueId);
  if (leagueId && isEspn(leagueId)) return ESPNAdapter.getNflState(leagueId);
  return SleeperAPI.getNflState();
};

/**
 * Fetch player projections for a given week.
 */
export const getPlayerProjections = async (
  week: number,
  season: number,
  playerIds: string[],
  leagueId?: string
): Promise<Array<{ pts: number; playerId: string }>> => {
  if (leagueId && isYahoo(leagueId)) {
    return YahooAdapter.getPlayerProjections(week, season, playerIds);
  }
  if (leagueId && isEspn(leagueId)) {
    return ESPNAdapter.getPlayerProjections(week, season, playerIds);
  }
  return SleeperAPI.getPlayerProjections(week, season, playerIds);
};

/**
 * Fetch transactions for a league/week.
 */
export const getTransactions = async (leagueId: string, leg: number): Promise<Transactions[]> => {
  if (isYahoo(leagueId)) return YahooAdapter.getTransactions(leagueId, leg);
  if (isEspn(leagueId)) return ESPNAdapter.getTransactions(leagueId, leg);
  return SleeperAPI.getTransactions(leagueId, leg);
};

/**
 * Fetch playoff bracket matchups.
 */
export const getBracketMatchups = async (
  leagueId: string,
  winnersBracket: boolean
): Promise<BracketMatchup[]> => {
  if (isYahoo(leagueId)) return YahooAdapter.getBracketMatchups(leagueId, winnersBracket);
  if (isEspn(leagueId)) return ESPNAdapter.getBracketMatchups(leagueId, winnersBracket);
  return SleeperAPI.getBracketMatchups(leagueId, winnersBracket);
};

/**
 * Fetch a platform-agnostic player map for the given league.
 *
 * For Sleeper leagues: wraps the locally-bundled sleeper_players.json.
 * For ESPN/Yahoo leagues: extracts player info from the roster API response.
 */
export const getPlayers = async (
  leagueId: string,
  week?: number
): Promise<Record<string, GenericPlayer>> => {
  if (isYahoo(leagueId)) return YahooAdapter.getPlayers(leagueId, week);
  if (isEspn(leagueId)) return ESPNAdapter.getPlayers(leagueId, week);
  // Sleeper: project the locally-loaded JSON into GenericPlayer shape.
  const result: Record<string, GenericPlayer> = {};
  for (const [id, player] of Object.entries(sleeperPlayers)) {
    result[id] = {
      full_name: player.full_name,
      position: player.position,
      fantasy_positions: player.fantasy_positions,
    };
  }
  return result;
};
