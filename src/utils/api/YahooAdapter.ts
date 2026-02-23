/**
 * YahooAdapter.ts — Translates Yahoo Fantasy Sports API responses into Sleeper-compatible types.
 *
 * Yahoo's API has a quirky nested structure (XML-to-JSON with object-as-array encoding).
 * This adapter normalizes that into the same League/User/Roster/Matchup types that all
 * compute utilities already understand.
 *
 * Note on Yahoo API response shapes: Yahoo encodes what would be arrays as objects with
 * numeric string keys ("0", "1", ...) plus a "count" field. Team metadata is an array
 * of single-key objects. Use extractYahooField() to pull values by key from those arrays.
 */
import type {
  League,
  User,
  Roster,
  Matchup,
  Transactions,
  BracketMatchup,
} from "../../types/sleeperTypes";
import type {
  YahooTeamMetaArray,
  YahooTeamEntry,
  YahooMap,
  YahooRoster,
  YahooRosterPlayer,
  YahooMatchup,
  YahooStatModifier,
  YahooLeagueSettings,
} from "../../types/yahooTypes";
import { fetchLeague, fetchTeams, fetchRosters, fetchMatchups, fetchSettings, fetchPlayerStats } from "./YahooApi";
import { yahooToSleeperId } from "../playerUtils";
import type { GenericPlayer } from "./FantasyAPI";

// ---------------------------------------------------------------------------
// Yahoo stat ID → Sleeper scoring_settings key mapping
// See: https://developer.yahoo.com/fantasysports/guide/#stats-collection
// ---------------------------------------------------------------------------
const YAHOO_STAT_MAP: Record<string, string> = {
  "4": "pass_yd", // Passing yards
  "5": "pass_td", // Passing TDs
  "6": "pass_int", // Interceptions thrown
  "9": "pass_2pt", // Passing 2pt conversions
  "10": "rush_yd", // Rushing yards
  "11": "rush_td", // Rushing TDs
  "12": "rush_2pt", // Rushing 2pt conversions
  "16": "rec_yd", // Receiving yards
  "17": "rec_td", // Receiving TDs
  "18": "rec_2pt", // Receiving 2pt conversions
  "19": "rec", // Receptions (PPR)
  "22": "fum_lost", // Fumbles lost
  "23": "fum", // Fumbles (total)
  "29": "sack", // Sacks (DEF)
  "30": "int", // Defensive interceptions
  "31": "fum_rec", // Defensive fumble recoveries
  "32": "safe", // Safeties
  "33": "def_td", // Defensive TDs
  "34": "blk_kick", // Blocked kicks
  "37": "pts_allow_0", // Points allowed 0
  "38": "pts_allow_1_6", // Points allowed 1-6
  "39": "pts_allow_7_13", // Points allowed 7-13
  "40": "pts_allow_14_20", // Points allowed 14-20
  "41": "pts_allow_21_27", // Points allowed 21-27
  "42": "pts_allow_28_34", // Points allowed 28-34
  "43": "pts_allow_35p", // Points allowed 35+
  "57": "xpm", // Extra point made
  "58": "xpmiss", // Extra point missed
  "54": "fgm", // FG made (generic, per Yahoo's base stat)
  "55": "fgmiss", // FG missed
};

// Yahoo position string → standard position abbreviation
const YAHOO_POSITION_MAP: Record<string, string> = {
  QB: "QB",
  RB: "RB",
  WR: "WR",
  TE: "TE",
  K: "K",
  DEF: "DEF",
  D: "DEF",
  "D/ST": "DEF",
  // Flex slots — map to a real position; adapter uses full roster entry to determine actual
  "W/R": "WR",
  "W/T": "TE",
  "W/R/T": "WR",
  "Q/W/R/T": "QB",
  BN: "BN",
  IR: "IR",
};

// ---------------------------------------------------------------------------
// Internal helpers for Yahoo's quirky response structure
// ---------------------------------------------------------------------------

/**
 * Extract a field value from a Yahoo team metadata array.
 * Yahoo encodes team metadata as: [{"team_key": "..."}, {"team_id": "..."}, ...]
 */
function extractYahooField<T = unknown>(meta: YahooTeamMetaArray, key: string): T | undefined {
  const entry = meta.find((item) => key in item);
  return entry ? (entry[key] as T) : undefined;
}

/**
 * Convert a Yahoo object-as-array ({"0": x, "1": y, count: N}) to a real array.
 */
function yahooMapToArray<T>(map: YahooMap<T>): T[] {
  const result: T[] = [];
  for (let i = 0; i < map.count; i++) {
    const item = map[String(i)];
    if (item !== undefined) result.push(item);
  }
  return result;
}

/**
 * Translate a Yahoo player_key (e.g. "449.p.30977") to a Sleeper player ID.
 * Falls back to the Yahoo numeric player ID if no mapping exists.
 */
function toSleeperId(playerKey: string): string {
  // Extract numeric ID from "449.p.30977" → "30977"
  const match = playerKey.match(/\.p\.(\d+)$/);
  if (!match) return playerKey;
  const yahooId = match[1];
  return yahooToSleeperId[yahooId] ?? yahooId;
}

/** Strip the "yahoo_" prefix to get the raw numeric Yahoo league ID */
function stripPrefix(leagueId: string): string {
  return leagueId.replace(/^yahoo_/, "");
}

// ---------------------------------------------------------------------------
// Scoring settings translation
// ---------------------------------------------------------------------------

function buildScoringSettings(modifiers: YahooStatModifier[]): League["scoring_settings"] {
  const settings: Record<string, number> = {};
  for (const mod of modifiers) {
    const key = YAHOO_STAT_MAP[mod.stat_id];
    if (key) settings[key] = parseFloat(mod.value);
  }
  return settings as unknown as League["scoring_settings"];
}

function buildRosterPositions(yahooSettings: YahooLeagueSettings): string[] {
  const positions: string[] = [];
  const rosterPos = yahooSettings.roster_positions?.roster_position;
  if (!Array.isArray(rosterPos)) return [];
  for (const rp of rosterPos) {
    const pos = YAHOO_POSITION_MAP[rp.position] ?? rp.position;
    for (let i = 0; i < (rp.count ?? 1); i++) {
      positions.push(pos);
    }
  }
  return positions;
}

// ---------------------------------------------------------------------------
// Exported adapter functions
// ---------------------------------------------------------------------------

export async function getLeague(leagueId: string): Promise<League> {
  const numericId = stripPrefix(leagueId);
  const [leagueRes, settingsRes] = await Promise.all([
    fetchLeague(numericId),
    fetchSettings(numericId),
  ]);

  const meta = leagueRes.fantasy_content.league[0];
  const yahooSettings = settingsRes.fantasy_content.league[1].settings;

  const modifiers = yahooSettings.stat_modifiers?.stats?.stat ?? [];
  const playoffStartWeek = parseInt(yahooSettings.playoff_start_week ?? "14", 10);
  const numPlayoffTeams = parseInt(yahooSettings.num_playoff_teams ?? "4", 10);
  // Yahoo returns week fields as strings; parse to numbers.
  // current_week is 0 for offseason leagues — fall back to end_week in that case.
  const effectiveWeek =
    parseInt(String(meta.current_week), 10) ||
    parseInt(String(meta.end_week), 10) ||
    playoffStartWeek;

  return {
    league_id: meta.league_id,
    name: meta.name,
    sport: "nfl",
    season: meta.season,
    season_type: "regular",
    status: meta.is_finished ? "complete" : "in_season",
    total_rosters: meta.num_teams,
    roster_positions: buildRosterPositions(yahooSettings),
    scoring_settings: buildScoringSettings(modifiers),
    previous_league_id: "",
    draft_id: "",
    avatar: meta.logo_url ?? "",
    bracket_id: null,
    loser_bracket_id: null,
    company_id: null,
    group_id: null,
    shard: 0,
    last_message_id: "",
    metadata: { auto_continue: "off", keeper_deadline: "", latest_league_winner_roster_id: "" },
    settings: {
      num_teams: meta.num_teams,
      playoff_week_start: playoffStartWeek,
      playoff_teams: numPlayoffTeams,
      start_week: parseInt(meta.start_week, 10) || 1,
      last_scored_leg: effectiveWeek,
      leg: effectiveWeek,
      last_report: effectiveWeek,
      // Defaults for fields not available from Yahoo API
      waiver_budget: 100,
      best_ball: 0,
      divisions: 0,
      draft_rounds: 15,
      playoff_seed_type: 0,
      playoff_type: 0,
      playoff_round_type: 0,
      trade_deadline: 0,
      type: 0,
      max_keepers: 0,
      waiver_type: 0,
      waiver_day_of_week: 0,
      waiver_clear_days: 2,
      waiver_bid_min: 0,
      daily_waivers: 0,
      daily_waivers_hour: 0,
      daily_waivers_days: 0,
      reserve_slots: 0,
      taxi_slots: 0,
      taxi_years: 0,
      taxi_deadline: 0,
      taxi_allow_vets: 0,
    },
  };
}

export async function getUsers(leagueId: string): Promise<User[]> {
  const numericId = stripPrefix(leagueId);
  const res = await fetchTeams(numericId);
  const teamsMap = res.fantasy_content.league[1].teams;
  const teams = yahooMapToArray<YahooTeamEntry>(teamsMap as YahooMap<YahooTeamEntry>);
  return teams.map((entry) => {
    const meta = entry.team[0];
    const teamId = String(extractYahooField<string>(meta, "team_id") ?? "");
    const name = String(extractYahooField<string>(meta, "name") ?? "Unknown Team");
    const managers =
      extractYahooField<
        Array<{
          manager: {
            manager_id: string;
            nickname: string;
            guid: string;
            image_url?: string;
            is_commissioner?: string;
          };
        }>
      >(meta, "managers") ?? [];
    const manager = managers[0]?.manager;
    const logos =
      extractYahooField<Array<{ team_logo: { url: string } }>>(meta, "team_logos") ?? [];
    const avatarUrl = logos[0]?.team_logo?.url ?? null;

    return {
      user_id: manager?.guid ?? teamId,
      display_name: manager?.nickname ?? "Unknown",
      avatar: avatarUrl,
      is_owner: manager?.is_commissioner === "1",
      league_id: leagueId,
      settings: null,
      metadata: { team_name: name },
    };
  });
}

export async function getRosters(leagueId: string): Promise<Roster[]> {
  const numericId = stripPrefix(leagueId);
  const [teamsRes, rostersRes] = await Promise.all([
    fetchTeams(numericId),
    fetchRosters(numericId),
  ]);

  const teamsMap = teamsRes.fantasy_content.league[1].teams;
  const rostersMap = rostersRes.fantasy_content.league[1].teams;
  const teamCount = teamsMap.count;

  const rosters: Roster[] = [];

  for (let i = 0; i < teamCount; i++) {
    const teamEntry = (teamsMap as YahooMap<YahooTeamEntry>)[String(i)];
    const rosterEntry = (rostersMap as YahooMap<{ team: unknown[] }>)[String(i)];
    if (!teamEntry || !rosterEntry) continue;

    const meta = teamEntry.team[0];
    const teamId = parseInt(String(extractYahooField<string>(meta, "team_id") ?? i + 1), 10);
    const managers =
      extractYahooField<Array<{ manager: { guid: string } }>>(meta, "managers") ?? [];
    const ownerGuid = managers[0]?.manager?.guid ?? String(teamId);

    const standings = teamEntry.team[2]?.team_standings;
    const outcomes = standings?.outcome_totals;

    const ptsStr: string = standings?.points_for ?? "0";
    const ptsAgainstStr: string = standings?.points_against ?? "0";
    const pts = parseFloat(ptsStr);
    const ptsAgainst = parseFloat(ptsAgainstStr);
    const fptsInt = Math.floor(pts);
    const fptsDecimal = Math.round((pts - fptsInt) * 100);
    const fpaInt = Math.floor(ptsAgainst);
    const fpaDecimal = Math.round((ptsAgainst - fpaInt) * 100);

    // Extract players from roster
    // Roster is at team[1].roster["0"].players (not team[3].roster.players)
    const rosterTeamArr = rosterEntry.team as unknown[];
    const rosterWrapper = rosterTeamArr[1] as { roster?: YahooRoster } | undefined;
    const playersMap = rosterWrapper?.roster?.["0"]?.players;

    const allPlayerIds: string[] = [];
    const starterIds: string[] = [];

    if (playersMap) {
      const players = yahooMapToArray<YahooRosterPlayer>(playersMap);
      for (const playerEntry of players) {
        const playerMeta = playerEntry.player[0];
        const playerKey = String(extractYahooField<string>(playerMeta, "player_key") ?? "");
        if (!playerKey) continue;
        const sleeperId = toSleeperId(playerKey);
        allPlayerIds.push(sleeperId);

        // selected_position is an array of single-key objects — use extractYahooField
        const selectedPos = extractYahooField<string>(
          playerEntry.player[1]?.selected_position ?? [],
          "position"
        );
        if (selectedPos && selectedPos !== "BN" && selectedPos !== "IR") {
          starterIds.push(sleeperId);
        }
      }
    }

    rosters.push({
      roster_id: teamId,
      owner_id: ownerGuid,
      league_id: leagueId,
      starters: starterIds,
      players: allPlayerIds,
      reserve: null,
      taxi: null,
      keepers: null,
      co_owners: null,
      player_map: null,
      metadata: null,
      settings: {
        wins: parseInt(outcomes?.wins ?? "0", 10),
        losses: parseInt(outcomes?.losses ?? "0", 10),
        ties: parseInt(outcomes?.ties ?? "0", 10),
        fpts: fptsInt,
        fpts_decimal: fptsDecimal,
        fpts_against: fpaInt,
        fpts_against_decimal: fpaDecimal,
        ppts: 0,
        ppts_decimal: 0,
        division: 0,
        total_moves: 0,
        waiver_budget_used: 0,
        waiver_position: 0,
      },
    });
  }

  return rosters;
}

export async function getMatchups(
  leagueId: string,
  week: number,
  includePlayerStats = false
): Promise<Matchup[]> {
  const numericId = stripPrefix(leagueId);

  // Only fetch rosters (for lineup + player IDs) when per-player stats are needed.
  // Team totals come from the scoreboard alone.
  const [scoreboardRes, rostersRes] = await Promise.all([
    fetchMatchups(numericId, week),
    includePlayerStats ? fetchRosters(numericId, week) : Promise.resolve(null),
  ]);

  const scoreboard = scoreboardRes.fantasy_content.league[1]?.scoreboard;
  // Matchups are nested under scoreboard["0"].matchups (not scoreboard.matchups)
  const matchupsMap = scoreboard?.["0"]?.matchups;
  if (!matchupsMap) {
    console.warn(`[YahooAdapter:getMatchups] week=${week} — no matchups map, returning []`);
    return [];
  }
  const matchupEntries = yahooMapToArray<{ matchup: YahooMatchup }>(matchupsMap);

  // Build lineup map and fetch per-player stats only when requested
  const teamRosterMap = buildTeamRosterMap(
    rostersRes?.fantasy_content.league[1]?.teams
  );
  const yahooKeyPts: Record<string, number> = {};

  if (includePlayerStats) {
    const allYahooKeys = Object.values(teamRosterMap).flatMap((t) => t.yahooPlayerKeys);

    // Batch-fetch player fantasy points (25 keys per request to stay within URL limits)
    const BATCH_SIZE = 25;
    const statsBatches = await Promise.all(
      Array.from({ length: Math.ceil(allYahooKeys.length / BATCH_SIZE) }, (_, i) =>
        fetchPlayerStats(numericId, allYahooKeys.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE), week)
      )
    );

    // Parse stats responses into yahooPlayerKey → fantasy points map
    let _loggedStatsSample = false;
    for (const batch of statsBatches) {
      if (!batch) continue;
      const leagueArr = (batch as { fantasy_content: { league: unknown[] } }).fantasy_content
        .league;
      const playersMap = (leagueArr[1] as { players?: YahooMap<{ player: unknown[] }> })?.players;
      if (!playersMap) continue;

      const playerEntries = yahooMapToArray<{ player: unknown[] }>(playersMap);
      for (const entry of playerEntries) {
        const playerArr = entry.player;
        if (!Array.isArray(playerArr)) continue;

        if (!_loggedStatsSample) {
          console.log(
            "[YahooAdapter:getMatchups] stats sample player:",
            JSON.stringify(entry, null, 2).slice(0, 600)
          );
          _loggedStatsSample = true;
        }

        const playerMeta = playerArr[0] as YahooTeamMetaArray;
        const playerKey = String(extractYahooField<string>(playerMeta, "player_key") ?? "");
        if (!playerKey) continue;

        // player_points may be at any position after [0] (metadata)
        const playerPointsEl = (playerArr as Array<unknown>)
          .slice(1)
          .find(
            (el): el is { player_points: { total: string } } =>
              el != null && typeof el === "object" && "player_points" in (el as object)
          );
        yahooKeyPts[playerKey] = parseFloat(playerPointsEl?.player_points?.total ?? "0");
      }
    }

    console.log(
      "[YahooAdapter:getMatchups] week",
      week,
      "— stats resolved for",
      Object.keys(yahooKeyPts).length,
      "players, sample:",
      Object.entries(yahooKeyPts).slice(0, 3)
    );
  }

  const results: Matchup[] = [];
  let matchupId = 1;

  for (const { matchup } of matchupEntries) {
    // Teams are nested under matchup["0"].teams (not matchup.teams)
    const teamsInMatchup = yahooMapToArray<{ team: unknown[] }>(
      matchup["0"].teams as YahooMap<{ team: unknown[] }>
    );

    for (const teamEntry of teamsInMatchup) {
      const teamMeta = teamEntry.team[0] as YahooTeamMetaArray;
      const teamId = parseInt(String(extractYahooField<string>(teamMeta, "team_id") ?? "0"), 10);
      const teamPoints = (teamEntry.team[1] as { team_points?: { total: string } })?.team_points;
      const totalPoints = parseFloat(teamPoints?.total ?? "0");

      const lineup = teamRosterMap[teamId];
      const players = lineup?.players ?? [];
      const starters = lineup?.starters ?? [];
      const yahooPlayerKeys = lineup?.yahooPlayerKeys ?? [];
      const starterYahooKeys = lineup?.starterYahooKeys ?? [];

      // Apply per-player points using parallel yahoo key arrays (empty when not fetched)
      const playersPoints: Record<string, number> = {};
      for (let i = 0; i < players.length; i++) {
        playersPoints[players[i]] = yahooKeyPts[yahooPlayerKeys[i]] ?? 0;
      }
      const startersPoints = starterYahooKeys.map((k) => yahooKeyPts[k] ?? 0);

      results.push({
        roster_id: teamId,
        matchup_id: matchupId,
        points: totalPoints,
        custom_points: null,
        players,
        starters,
        starters_points: startersPoints,
        players_points: playersPoints,
        week,
      });
    }

    matchupId++;
  }

  return results;
}

type TeamLineup = {
  /** All rostered players as Sleeper IDs (parallel to yahooPlayerKeys) */
  players: string[];
  /** Starting players as Sleeper IDs (parallel to starterYahooKeys) */
  starters: string[];
  /** Yahoo player keys for every rostered player, parallel to `players` */
  yahooPlayerKeys: string[];
  /** Yahoo player keys for starters only, parallel to `starters` */
  starterYahooKeys: string[];
};

/** Build a lineup map of team_id → { players, starters, yahoo keys } from the roster response.
 *  Points are NOT populated here — they come from a separate fetchPlayerStats call. */
function buildTeamRosterMap(
  teamsMap: YahooMap<{ team: unknown[] }> | undefined
): Record<number, TeamLineup> {
  const result: Record<number, TeamLineup> = {};

  if (!teamsMap) return result;
  const teams = yahooMapToArray<{ team: unknown[] }>(teamsMap);
  for (const teamEntry of teams) {
    const meta = teamEntry.team[0] as YahooTeamMetaArray;
    const teamId = parseInt(String(extractYahooField<string>(meta, "team_id") ?? "0"), 10);

    // Roster is at team[1].roster["0"].players
    const rosterWrapper = teamEntry.team[1] as { roster?: YahooRoster } | undefined;
    const playersMap = rosterWrapper?.roster?.["0"]?.players;

    const players: string[] = [];
    const starters: string[] = [];
    const yahooPlayerKeys: string[] = [];
    const starterYahooKeys: string[] = [];

    if (playersMap) {
      const playerEntries = yahooMapToArray<YahooRosterPlayer>(playersMap);
      for (const playerEntry of playerEntries) {
        const playerMeta = playerEntry.player[0];
        const playerKey = String(extractYahooField<string>(playerMeta, "player_key") ?? "");
        if (!playerKey) continue;

        const sleeperId = toSleeperId(playerKey);
        // selected_position is an array of single-key objects — use extractYahooField
        const selectedPos = extractYahooField<string>(
          playerEntry.player[1]?.selected_position ?? [],
          "position"
        );

        players.push(sleeperId);
        yahooPlayerKeys.push(playerKey);

        if (selectedPos && selectedPos !== "BN" && selectedPos !== "IR") {
          starters.push(sleeperId);
          starterYahooKeys.push(playerKey);
        }
      }
    }

    result[teamId] = { players, starters, yahooPlayerKeys, starterYahooKeys };
  }

  return result;
}

export async function getNflState(leagueId: string): Promise<{
  week: number;
  season: string;
  season_type: string;
  season_start_date: string;
  previous_season: string;
  leg: number;
  league_season: string;
  league_create_season: string;
  display_week: number;
}> {
  const numericId = stripPrefix(leagueId);
  // Prefer league's current_week over the game-level week (handles offseason correctly)
  const leagueRes = await fetchLeague(numericId);
  const meta = leagueRes.fantasy_content.league[0];
  const currentWeek = parseInt(String(meta.current_week ?? 1), 10) || 1;
  const season = meta.season;

  return {
    week: currentWeek,
    season,
    season_type: "regular",
    season_start_date: meta.start_date ?? `${season}-09-01`,
    previous_season: String(parseInt(season, 10) - 1),
    leg: currentWeek,
    league_season: season,
    league_create_season: season,
    display_week: currentWeek,
  };
}

/** Transactions are available in Yahoo but not mapped yet — returns empty array. */
export async function getTransactions(_leagueId: string, _leg: number): Promise<Transactions[]> {
  // TODO: implement Yahoo transactions via /league/{key}/transactions;type=add,drop,trade
  return [];
}

/** Playoff bracket from Yahoo scoreboard (playoff weeks). */
export async function getBracketMatchups(
  leagueId: string,
  winnersBracket: boolean
): Promise<BracketMatchup[]> {
  const numericId = stripPrefix(leagueId);
  const leagueRes = await fetchLeague(numericId);
  const meta = leagueRes.fantasy_content.league[0];

  // Get settings to find playoff start week
  const settingsRes = await fetchSettings(numericId);
  const playoffStartWeek = parseInt(
    settingsRes.fantasy_content.league[1].settings?.playoff_start_week ?? "14",
    10
  );
  const endWeek = parseInt(meta.end_week, 10);

  const brackets: BracketMatchup[] = [];

  for (let w = playoffStartWeek; w <= endWeek; w++) {
    try {
      const scoreboardRes = await fetchMatchups(numericId, w);
      const scoreboard = scoreboardRes.fantasy_content.league[1].scoreboard;
      // Matchups are nested under scoreboard["0"].matchups
      const matchupsMap = scoreboard?.["0"]?.matchups;
      if (!matchupsMap) continue;
      const matchupEntries = yahooMapToArray<{ matchup: YahooMatchup }>(matchupsMap);
      const round = w - playoffStartWeek + 1;

      for (const { matchup } of matchupEntries) {
        if (matchup.is_playoffs !== "1") continue;
        const isConsolation = matchup.is_consolation === "1";
        if (winnersBracket && isConsolation) continue;
        if (!winnersBracket && !isConsolation) continue;

        // Teams are nested under matchup["0"].teams
        const teams = yahooMapToArray<{ team: unknown[] }>(
          matchup["0"].teams as YahooMap<{ team: unknown[] }>
        );
        if (teams.length < 2) continue;

        const getTeamId = (t: { team: unknown[] }) =>
          parseInt(
            String(extractYahooField<string>(t.team[0] as YahooTeamMetaArray, "team_id") ?? "0"),
            10
          );

        const getTeamPoints = (t: { team: unknown[] }) =>
          parseFloat((t.team[1] as { team_points?: { total: string } })?.team_points?.total ?? "0");

        const t1Id = getTeamId(teams[0]);
        const t2Id = getTeamId(teams[1]);
        const t1Pts = getTeamPoints(teams[0]);
        const t2Pts = getTeamPoints(teams[1]);

        const winnerKey = matchup.winner_team_key;
        let winner: number | null = null;
        let loser: number | null = null;
        if (winnerKey) {
          const winnerMatch = winnerKey.match(/\.t\.(\d+)$/);
          if (winnerMatch) {
            winner = parseInt(winnerMatch[1], 10);
            loser = winner === t1Id ? t2Id : t1Id;
          }
        } else if (matchup.status === "postevent") {
          winner = t1Pts >= t2Pts ? t1Id : t2Id;
          loser = winner === t1Id ? t2Id : t1Id;
        }

        brackets.push({
          r: round,
          m: brackets.length + 1,
          t1: t1Id,
          t2: t2Id,
          w: winner,
          l: loser,
        });
      }
    } catch {
      // Some weeks may not have matchups yet — stop gracefully
      break;
    }
  }

  return brackets;
}

export async function getPlayers(
  leagueId: string,
  week?: number
): Promise<Record<string, GenericPlayer>> {
  const numericId = stripPrefix(leagueId);
  const rostersRes = await fetchRosters(numericId, week);
  const teamsMap = rostersRes.fantasy_content.league[1].teams;
  const teams = yahooMapToArray<{ team: unknown[] }>(teamsMap as YahooMap<{ team: unknown[] }>);

  const result: Record<string, GenericPlayer> = {};

  for (const teamEntry of teams) {
    // Roster is at team[1].roster["0"].players (not team[3].roster.players)
    const rosterWrapper = teamEntry.team[1] as { roster?: YahooRoster } | undefined;
    const playersMap = rosterWrapper?.roster?.["0"]?.players;
    if (!playersMap) continue;

    const players = yahooMapToArray<YahooRosterPlayer>(playersMap);
    for (const playerEntry of players) {
      const playerMeta = playerEntry.player[0];
      const playerKey = String(extractYahooField<string>(playerMeta, "player_key") ?? "");
      if (!playerKey) continue;

      // Player name is under key "name" as { full, first, last } — not "full_name"
      const nameObj = extractYahooField<{ full?: string }>(playerMeta, "name");
      const fullName = nameObj?.full ?? "";
      const displayPos = String(extractYahooField<string>(playerMeta, "display_position") ?? "");
      const stdPos = YAHOO_POSITION_MAP[displayPos] ?? displayPos;

      const sleeperId = toSleeperId(playerKey);
      const photoUrl =
        extractYahooField<string>(playerMeta, "image_url") ??
        extractYahooField<{ url?: string }>(playerMeta, "headshot")?.url;
      result[sleeperId] = {
        full_name: fullName || null,
        position: stdPos || null,
        fantasy_positions: stdPos ? [stdPos] : null,
        photo_url: photoUrl || undefined,
      };
    }
  }

  return result;
}

/** Not available via Yahoo public API. */
export async function getPlayerProjections(
  _week: number,
  _season: number,
  _playerIds: string[]
): Promise<Array<{ pts: number; playerId: string }>> {
  return [];
}
