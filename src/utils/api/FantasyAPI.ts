/**
 * FantasyAPI.ts — Unified API router that delegates to Sleeper or ESPN adapters.
 *
 * Exports the same function signatures as SleeperAPI.ts. Compute functions import
 * from this module instead of SleeperAPI directly. The routing decision is based on
 * the league ID prefix: IDs starting with "espn_" go to the ESPN adapter, all others
 * go to the Sleeper API.
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
import * as SleeperAPI from "./SleeperAPI";
import * as ESPNAdapter from "./ESPNAdapter";

/**
 * Check whether a league ID belongs to an ESPN league.
 *
 * @param leagueId - League identifier (may be prefixed with "espn_")
 * @returns True if this is an ESPN league
 */
function isEspn(leagueId: string): boolean {
	return leagueId.startsWith("espn_");
}

/**
 * Fetch league metadata.
 *
 * @param leagueId - League identifier
 * @returns Sleeper-compatible League object
 */
export const getLeague = async (leagueId: string): Promise<League> => {
	return isEspn(leagueId)
		? ESPNAdapter.getLeague(leagueId)
		: SleeperAPI.getLeague(leagueId);
};

/**
 * Fetch all users/owners in a league.
 *
 * @param leagueId - League identifier
 * @returns Array of Sleeper-compatible User objects
 */
export const getUsers = async (leagueId: string): Promise<User[]> => {
	return isEspn(leagueId)
		? ESPNAdapter.getUsers(leagueId)
		: SleeperAPI.getUsers(leagueId);
};

/**
 * Fetch all rosters in a league.
 *
 * @param leagueId - League identifier
 * @returns Array of Sleeper-compatible Roster objects
 */
export const getRosters = async (leagueId: string): Promise<Roster[]> => {
	return isEspn(leagueId)
		? ESPNAdapter.getRosters(leagueId)
		: SleeperAPI.getRosters(leagueId);
};

/**
 * Fetch matchups for a specific week.
 *
 * @param leagueId - League identifier
 * @param week - Week number
 * @returns Array of Sleeper-compatible Matchup objects
 */
export const getMatchups = async (leagueId: string, week: number): Promise<Matchup[]> => {
	return isEspn(leagueId)
		? ESPNAdapter.getMatchups(leagueId, week)
		: SleeperAPI.getMatchups(leagueId, week);
};

/**
 * Fetch current NFL state (week, season).
 *
 * For ESPN leagues, this requires a leagueId since ESPN embeds week info in the
 * league response (there's no global NFL state endpoint like Sleeper has).
 *
 * @param leagueId - Optional league identifier. Required for ESPN leagues.
 * @returns NFL state object with week, season, and related fields
 */
export const getNflState = async (leagueId?: string): Promise<{
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
	if (leagueId && isEspn(leagueId)) {
		return ESPNAdapter.getNflState(leagueId);
	}
	return SleeperAPI.getNflState();
};

/**
 * Fetch player projections for a given week.
 *
 * @param week - Week number
 * @param season - Season year
 * @param playerIds - Array of player IDs to get projections for
 * @returns Array of player projections with points and player ID
 */
export const getPlayerProjections = async (
	week: number,
	season: number,
	playerIds: string[],
	leagueId?: string,
): Promise<Array<{ pts: number; playerId: string }>> => {
	if (leagueId && isEspn(leagueId)) {
		return ESPNAdapter.getPlayerProjections(week, season, playerIds);
	}
	return SleeperAPI.getPlayerProjections(week, season, playerIds);
};

/**
 * Fetch transactions for a league/week.
 *
 * @param leagueId - League identifier
 * @param leg - Week number
 * @returns Array of Sleeper-compatible Transaction objects
 */
export const getTransactions = async (
	leagueId: string,
	leg: number,
): Promise<Transactions[]> => {
	return isEspn(leagueId)
		? ESPNAdapter.getTransactions(leagueId, leg)
		: SleeperAPI.getTransactions(leagueId, leg);
};

/**
 * Fetch playoff bracket matchups.
 *
 * @param leagueId - League identifier
 * @param winnersBracket - True for winners bracket, false for losers
 * @returns Array of Sleeper-compatible BracketMatchup objects
 */
export const getBracketMatchups = async (
	leagueId: string,
	winnersBracket: boolean,
): Promise<BracketMatchup[]> => {
	return isEspn(leagueId)
		? ESPNAdapter.getBracketMatchups(leagueId, winnersBracket)
		: SleeperAPI.getBracketMatchups(leagueId, winnersBracket);
};
