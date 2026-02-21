/**
 * ESPNAdapter.ts — Translates ESPN API responses into Sleeper-compatible types.
 *
 * This adapter allows compute functions to work with ESPN leagues without
 * any changes to their logic. ESPN responses are mapped to the League, User,
 * Roster, Matchup, Transactions, and BracketMatchup types from sleeperTypes.ts.
 */
import type {
  League,
  User,
  Roster,
  Matchup,
  Transactions,
  BracketMatchup,
} from "../../types/sleeperTypes";
import type { ESPNLeagueResponse, ESPNScheduleItem, ESPNRosterEntry } from "../../types/espnTypes";
import { fetchLeague, fetchMatchups, fetchRosters, fetchRecord } from "./ESPNApi";
import { espnToSleeperId } from "../playerUtils";

// ---------------------------------------------------------------------------
// ESPN stat ID → Sleeper scoring_settings key mapping
// Covers the most common scoring categories. Unknown stat IDs are ignored.
// ---------------------------------------------------------------------------
const ESPN_STAT_MAP: Record<number, string> = {
  3: "pass_yd", // Passing yards (usually per-yard, e.g. 0.04)
  4: "pass_td", // Passing TDs
  19: "pass_int", // Interceptions thrown
  20: "pass_2pt", // Passing 2pt conversions
  24: "rush_yd", // Rushing yards
  25: "rush_td", // Rushing TDs
  26: "rush_2pt", // Rushing 2pt conversions
  42: "rec_yd", // Receiving yards
  43: "rec_td", // Receiving TDs
  44: "rec_2pt", // Receiving 2pt conversions
  53: "rec", // Receptions (PPR)
  72: "fum_lost", // Fumbles lost
  74: "fum_rec_td", // Fumble recovery TD
  77: "fgm", // FG made (generic)
  80: "fgmiss", // FG missed
  85: "xpm", // Extra point made
  86: "xpmiss", // Extra point missed
  89: "pts_allow_0", // Points allowed 0
  90: "pts_allow_1_6", // Points allowed 1-6
  91: "pts_allow_7_13", // Points allowed 7-13
  92: "pts_allow_14_20", // Points allowed 14-20
  93: "pts_allow_21_27", // Points allowed 21-27
  94: "pts_allow_28_34", // Points allowed 28-34
  95: "pts_allow_35p", // Points allowed 35+
  99: "int", // Defensive interceptions
  104: "fum_rec", // Defensive fumble recovery
  105: "blk_kick", // Blocked kick
  106: "def_td", // Defensive TD
  107: "safe", // Safety
  108: "sack", // Sack
  109: "ff", // Forced fumble
};

// ESPN lineup slot IDs that count as "starter" slots (not bench/IR)
const BENCH_SLOT_ID = 20;
const IR_SLOT_ID = 21;

/**
 * Strip the "espn_" prefix from a league ID to get the raw numeric ESPN ID.
 *
 * @param leagueId - Prefixed league ID (e.g. "espn_123456")
 * @returns The numeric portion as a string
 */
function stripPrefix(leagueId: string): string {
  return leagueId.replace(/^espn_/, "");
}

/**
 * Fetch and translate an ESPN league into a Sleeper-compatible League object.
 *
 * @param leagueId - Prefixed ESPN league ID (e.g. "espn_123456")
 * @returns Sleeper-compatible League object
 */
export async function getLeague(leagueId: string): Promise<League> {
  const numericId = stripPrefix(leagueId);
  const data = await fetchLeague(numericId);

  // Build scoring_settings from ESPN scoring items
  const scoringSettings: Record<string, number> = {};
  for (const item of data.settings?.scoringSettings?.scoringItems ?? []) {
    const key = ESPN_STAT_MAP[item.statId];
    if (key) {
      scoringSettings[key] = item.points;
    }
  }

  // Determine playoff week start from schedule settings
  const matchupPeriodCount = data.settings?.scheduleSettings?.matchupPeriodCount ?? 13;
  const playoffWeekStart = matchupPeriodCount + 1;

  return {
    total_rosters: data.settings?.size ?? data.teams?.length ?? 0,
    status: "in_season",
    sport: "nfl",
    settings: {
      waiver_budget: 0,
      playoff_teams: 6,
      num_teams: data.settings?.size ?? data.teams?.length ?? 0,
      playoff_week_start: playoffWeekStart,
      last_scored_leg: data.scoringPeriodId,
      last_report: data.scoringPeriodId,
      best_ball: 0,
      divisions: 0,
      draft_rounds: 0,
      start_week: 1,
      playoff_seed_type: 0,
      playoff_type: 0,
      playoff_round_type: 0,
      trade_deadline: 0,
      type: 0,
      max_keepers: 0,
      waiver_type: 0,
      waiver_day_of_week: 0,
      waiver_clear_days: 0,
      waiver_bid_min: 0,
      daily_waivers: 0,
      daily_waivers_hour: 0,
      daily_waivers_days: 0,
      reserve_slots: 0,
      taxi_slots: 0,
      taxi_years: 0,
      taxi_deadline: 0,
      taxi_allow_vets: 0,
      leg: data.scoringPeriodId,
      league_average_match: 0, // ESPN doesn't have median scoring
    },
    season_type: "regular",
    season: data.seasonId.toString(),
    scoring_settings: scoringSettings as unknown as League["scoring_settings"],
    roster_positions: buildRosterPositions(data),
    previous_league_id: "",
    name: data.settings?.name ?? "ESPN League",
    league_id: leagueId,
    draft_id: "",
    avatar: "",
    bracket_id: null,
    loser_bracket_id: null,
    company_id: null,
    group_id: null,
    shard: 0,
    last_message_id: "",
    metadata: {
      auto_continue: "off",
      keeper_deadline: "",
      latest_league_winner_roster_id: "",
    },
  };
}

/**
 * Build Sleeper-style roster_positions array from ESPN lineup slot counts.
 *
 * @param data - ESPN league response
 * @returns Array of position strings like ["QB", "RB", "RB", "WR", "WR", "TE", "FLEX", "K", "DEF", "BN", ...]
 */
function buildRosterPositions(data: ESPNLeagueResponse): string[] {
  const slotCounts = data.settings?.rosterSettings?.lineupSlotCounts;
  if (!slotCounts)
    return [
      "QB",
      "RB",
      "RB",
      "WR",
      "WR",
      "TE",
      "FLEX",
      "K",
      "DEF",
      "BN",
      "BN",
      "BN",
      "BN",
      "BN",
      "BN",
    ];

  // ESPN lineup slot ID → Sleeper position name
  const slotMap: Record<number, string> = {
    0: "QB",
    2: "RB",
    4: "WR",
    6: "TE",
    16: "DEF",
    17: "K",
    23: "FLEX", // RB/WR/TE flex
    20: "BN", // Bench
    21: "IR", // Injured reserve
  };

  const positions: string[] = [];
  for (const [slotId, count] of Object.entries(slotCounts)) {
    const pos = slotMap[parseInt(slotId)];
    if (pos && pos !== "BN" && pos !== "IR") {
      for (let i = 0; i < count; i++) positions.push(pos);
    }
  }
  // Add bench slots
  const benchCount = slotCounts["20"] ?? 6;
  for (let i = 0; i < benchCount; i++) positions.push("BN");

  return positions;
}

/**
 * Fetch and translate ESPN members/teams into Sleeper-compatible User objects.
 *
 * @param leagueId - Prefixed ESPN league ID
 * @returns Array of Sleeper-compatible User objects
 */
export async function getUsers(leagueId: string): Promise<User[]> {
  const numericId = stripPrefix(leagueId);
  const data = await fetchMatchups(numericId);

  const memberMap = new Map<string, { displayName: string; firstName: string; lastName: string }>();
  for (const m of data.members ?? []) {
    memberMap.set(m.id, m);
  }

  return (data.teams ?? []).map((team) => {
    const member = memberMap.get(team.primaryOwner);
    return {
      user_id: team.id.toString(),
      display_name: member?.displayName ?? `Team ${team.id}`,
      avatar: team.logo || null,
      metadata: {
        team_name: team.name || team.abbrev,
        avatar: team.logo || undefined,
      },
      is_owner: false,
      settings: null,
    };
  });
}

/**
 * Fetch and translate ESPN teams into Sleeper-compatible Roster objects.
 *
 * Fetches records (wins/losses/points) and current rosters (player lists)
 * in parallel and merges them by team ID.
 *
 * @param leagueId - Prefixed ESPN league ID
 * @returns Array of Sleeper-compatible Roster objects
 */
export async function getRosters(leagueId: string): Promise<Roster[]> {
  const numericId = stripPrefix(leagueId);
  const [recordData, rosterData] = await Promise.all([
    fetchRecord(numericId),
    fetchRosters(numericId),
  ]);

  // Build a map of team ID → roster entries from the mRoster response
  const rosterEntriesByTeam = new Map<number, ESPNRosterEntry[]>();
  for (const team of rosterData.teams ?? []) {
    rosterEntriesByTeam.set(team.id, team.roster?.entries ?? []);
  }

  return (recordData.teams ?? []).map((team) => {
    const record = team.record?.overall;
    const pf = record?.pointsFor ?? 0;
    const pa = record?.pointsAgainst ?? 0;

    // Translate ESPN player IDs to Sleeper IDs for the current roster
    const entries = rosterEntriesByTeam.get(team.id) ?? [];
    const allPlayers: string[] = [];
    const starterPlayers: string[] = [];

    for (const entry of entries) {
      if (entry.playerId == null) continue;
      const espnPid = entry.playerId.toString();
      const pid = espnToSleeperId[espnPid] ?? espnPid;
      allPlayers.push(pid);
      if (entry.lineupSlotId < BENCH_SLOT_ID) {
        starterPlayers.push(pid);
      }
    }

    return {
      roster_id: team.id,
      owner_id: team.id.toString(),
      starters: starterPlayers,
      players: allPlayers,
      settings: {
        wins: record?.wins ?? 0,
        losses: record?.losses ?? 0,
        ties: record?.ties ?? 0,
        fpts: Math.floor(pf),
        fpts_decimal: Math.round((pf % 1) * 100),
        fpts_against: Math.floor(pa),
        fpts_against_decimal: Math.round((pa % 1) * 100),
        ppts: Math.floor(pf),
        ppts_decimal: Math.round((pf % 1) * 100),
        division: 0,
        total_moves: 0,
        waiver_budget_used: 0,
        waiver_position: 0,
      },
      league_id: leagueId,
      co_owners: null,
      keepers: null,
      reserve: null,
      taxi: null,
      metadata: null,
      player_map: null,
    };
  });
}

/**
 * Fetch and translate ESPN schedule into Sleeper-compatible Matchup objects.
 *
 * Each ESPN schedule item (home vs away) becomes two Matchup entries that share
 * the same matchup_id, mirroring Sleeper's format.
 *
 * @param leagueId - Prefixed ESPN league ID
 * @param week - The matchup period (week number) to fetch
 * @returns Array of Sleeper-compatible Matchup objects for the given week
 */
export async function getMatchups(leagueId: string, week: number): Promise<Matchup[]> {
  const numericId = stripPrefix(leagueId);
  // mRoster + scoringPeriodId ensures data.teams[].roster.entries has player
  // IDs and per-player appliedStatTotal for this specific week.
  const data = await fetchMatchups(numericId, undefined, week);

  // Build a lookup: teamId → roster entries (with player IDs from mRoster view)
  const rosterByTeamId = new Map<number, ESPNRosterEntry[]>(
    (data.teams ?? []).map((team) => [team.id, team.roster?.entries ?? []])
  );

  // Filter schedule to the requested week
  const weekSchedule = (data.schedule ?? []).filter(
    (item: ESPNScheduleItem) => item.matchupPeriodId === week
  );

  const matchups: Matchup[] = [];

  for (const item of weekSchedule) {
    const matchupId = item.id;

    if (item.home) {
      matchups.push(buildMatchupEntry(item.home, matchupId, rosterByTeamId, week));
    }
    if (item.away) {
      matchups.push(buildMatchupEntry(item.away, matchupId, rosterByTeamId, week));
    }
  }

  return matchups;
}

/**
 * Build a single Sleeper-compatible Matchup entry.
 *
 * Player entries come from data.teams[].roster.entries (via mRoster view) since
 * rosterForCurrentScoringPeriod on schedule items contains NFL team-level stats,
 * not individual fantasy player entries with player IDs.
 *
 * @param week - The scoring period to pull per-player stats for. Used to filter
 *   player.stats[] by scoringPeriodId so we get the single-week score rather
 *   than the season-to-date appliedStatTotal (which is cumulative).
 */
function buildMatchupEntry(
  side: NonNullable<ESPNScheduleItem["home"]>,
  matchupId: number,
  rosterByTeamId: Map<number, ESPNRosterEntry[]>,
  week: number
): Matchup {
  const entries = rosterByTeamId.get(side.teamId) ?? [];

  const starters: string[] = [];
  const startersPoints: number[] = [];
  const players: string[] = [];
  const playersPoints: Record<string, number> = {};

  for (const entry of entries) {
    // Skip empty roster slots (no player assigned)
    if (entry.playerId == null) continue;

    const espnPid = entry.playerId.toString();
    const pid = espnToSleeperId[espnPid] ?? espnPid;

    // Use the week-specific actual stat entry from player.stats[].
    // appliedStatTotal is the season-to-date cumulative total and must NOT be
    // used here — by week 10 it inflates every player's "points" ~10x, making
    // calculateOptimalScore return an impossibly high max score.
    const pts =
      entry.playerPoolEntry?.player?.stats?.find(
        (s) => s.statSourceId === 0 && s.scoringPeriodId === week
      )?.appliedTotal ?? 0;

    players.push(pid);
    playersPoints[pid] = pts;

    // Bench=20, IR=21 — everything else (including FLEX=23) is a starter slot
    if (entry.lineupSlotId !== BENCH_SLOT_ID && entry.lineupSlotId !== IR_SLOT_ID) {
      starters.push(pid);
      startersPoints.push(pts);
    }
  }

  return {
    points: side.totalPoints,
    players,
    roster_id: side.teamId,
    custom_points: null,
    matchup_id: matchupId,
    starters,
    starters_points: startersPoints,
    players_points: playersPoints,
  };
}

/**
 * Get NFL state (current week/season) from an ESPN league.
 *
 * Unlike Sleeper's global /state/nfl endpoint, ESPN embeds this in the league response.
 *
 * @param leagueId - Prefixed ESPN league ID
 * @returns Object with week, season, and other state fields
 */
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
  const data = await fetchLeague(numericId);
  const season = data.seasonId.toString();
  const week = data.scoringPeriodId;

  return {
    week,
    season,
    season_type: "regular",
    season_start_date: "",
    previous_season: (data.seasonId - 1).toString(),
    leg: week,
    league_season: season,
    league_create_season: season,
    display_week: week,
  };
}

/**
 * Get transactions for an ESPN league. Not available via the public ESPN API.
 *
 * @param _leagueId - Prefixed ESPN league ID (unused)
 * @param _leg - Week number (unused)
 * @returns Empty array — ESPN transactions are not accessible
 */
export async function getTransactions(_leagueId: string, _leg: number): Promise<Transactions[]> {
  return [];
}

/**
 * Get bracket matchups for ESPN playoffs.
 *
 * Derives bracket structure from ESPN schedule items with playoff tier types.
 *
 * @param leagueId - Prefixed ESPN league ID
 * @param winnersBracket - Whether to return winners (true) or losers (false) bracket
 * @returns Array of Sleeper-compatible BracketMatchup objects
 */
export async function getBracketMatchups(
  leagueId: string,
  winnersBracket: boolean
): Promise<BracketMatchup[]> {
  const numericId = stripPrefix(leagueId);
  const data = await fetchMatchups(numericId);
  const league = await fetchLeague(numericId);

  const playoffStart = (league.settings?.scheduleSettings?.matchupPeriodCount ?? 13) + 1;
  const tierType = winnersBracket ? "WINNERS_BRACKET" : "LOSERS_BRACKET";

  // Filter to playoff matchups of the right bracket type
  const playoffItems = (data.schedule ?? []).filter(
    (item: ESPNScheduleItem) =>
      item.matchupPeriodId >= playoffStart &&
      (item.playoffTierType === tierType || item.playoffTierType === "NONE")
  );

  // Build bracket matchups
  const brackets: BracketMatchup[] = [];
  for (const item of playoffItems) {
    const round = item.matchupPeriodId - playoffStart + 1;
    brackets.push({
      r: round,
      m: item.id,
      t1: item.home?.teamId ?? null,
      t2: item.away?.teamId ?? null,
      w:
        item.winner === "HOME"
          ? (item.home?.teamId ?? null)
          : item.winner === "AWAY"
            ? (item.away?.teamId ?? null)
            : null,
      l:
        item.winner === "HOME"
          ? (item.away?.teamId ?? null)
          : item.winner === "AWAY"
            ? (item.home?.teamId ?? null)
            : null,
    });
  }

  return brackets;
}

// ESPN defaultPositionId → position string
const ESPN_POSITION_MAP: Record<number, string> = {
  1: "QB",
  2: "RB",
  3: "WR",
  4: "TE",
  5: "K",
  16: "DEF",
};

// ESPN proTeamId → NFL team abbreviation (lowercase, for CDN logo URL).
// Used to construct https://a.espncdn.com/i/teamlogos/nfl/500/{abbrev}.png
// for D/ST entries whose player IDs are ESPN team-defense IDs, not headshot IDs.
const ESPN_PRO_TEAM_MAP: Record<number, string> = {
  1: "atl",
  2: "buf",
  3: "chi",
  4: "cin",
  5: "cle",
  6: "dal",
  7: "den",
  8: "det",
  9: "gb",
  10: "ten",
  11: "ind",
  12: "kc",
  13: "lv",
  14: "lar",
  15: "mia",
  16: "min",
  17: "ne",
  18: "no",
  19: "nyg",
  20: "nyj",
  21: "phi",
  22: "ari",
  23: "pit",
  24: "lac",
  25: "sf",
  26: "sea",
  27: "tb",
  28: "wsh",
  29: "car",
  30: "jax",
  33: "bal",
  34: "hou",
};

/**
 * Fetch a player map for an ESPN league, keyed by the same IDs used in
 * rosters and matchups (Sleeper ID when a mapping exists, ESPN ID otherwise).
 *
 * Player data (name, position) is extracted directly from ESPN roster entries,
 * so this requires no external lookup file.
 *
 * @param leagueId - Prefixed ESPN league ID
 * @returns Map of player ID → GenericPlayer
 */
export async function getPlayers(
  leagueId: string,
  week?: number
): Promise<Record<string, import("./FantasyAPI").GenericPlayer>> {
  const numericId = stripPrefix(leagueId);
  // When a specific week is provided, fetch that week's roster so players who
  // were on teams then (but since dropped/traded) are included in the map.
  // Without this, getPlayerPosition() returns null for those players and
  // calculateOptimalScore() underestimates the max score for historical weeks.
  const data =
    week != null ? await fetchMatchups(numericId, undefined, week) : await fetchRosters(numericId);

  const players: Record<string, import("./FantasyAPI").GenericPlayer> = {};

  for (const team of data.teams ?? []) {
    for (const entry of team.roster?.entries ?? []) {
      const espnPid =
        entry.playerId ??
        entry.playerPoolEntry?.playerId ??
        entry.playerPoolEntry?.id ??
        entry.playerPoolEntry?.player?.id;
      if (espnPid == null) continue;

      const pid = espnToSleeperId[String(espnPid)] ?? String(espnPid);
      if (pid in players) continue; // already added from another team's roster

      const playerData = entry.playerPoolEntry?.player;
      const position =
        playerData?.defaultPositionId != null
          ? (ESPN_POSITION_MAP[playerData.defaultPositionId] ?? null)
          : null;

      const espn_team_abbrev =
        position === "DEF" && playerData?.proTeamId != null
          ? ESPN_PRO_TEAM_MAP[playerData.proTeamId]
          : undefined;

      players[pid] = {
        full_name: playerData?.fullName ?? null,
        position,
        fantasy_positions: position ? [position] : null,
        ...(espn_team_abbrev ? { espn_team_abbrev } : {}),
      };
    }
  }

  return players;
}

/**
 * Get player projections for ESPN leagues. Not available via public ESPN API.
 *
 * @param _week - Week number (unused)
 * @param _season - Season year (unused)
 * @param _playerIds - Player IDs (unused)
 * @returns Empty array — ESPN projections not accessible
 */
export async function getPlayerProjections(
  _week: number,
  _season: number,
  _playerIds: string[]
): Promise<Array<{ pts: number; playerId: string }>> {
  return [];
}
