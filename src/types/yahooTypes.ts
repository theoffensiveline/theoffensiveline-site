/**
 * TypeScript types for the Yahoo Fantasy Sports API v2 responses.
 *
 * Yahoo's API returns XML-to-JSON translated responses with a quirky structure:
 * - Responses are wrapped in `fantasy_content`
 * - Arrays are encoded as objects with numeric string keys and a "count" field
 * - Resource arrays alternate: [metadata_object, children_object]
 * - Team metadata is itself an array of single-key objects (use extractYahooField)
 */

// ---------------------------------------------------------------------------
// Low-level structural types
// ---------------------------------------------------------------------------

/**
 * Yahoo encodes arrays as objects with numeric string keys ("0", "1", ...) + "count".
 * e.g. { "0": {...}, "1": {...}, count: 2 }
 */
export type YahooMap<T> = Record<string, T> & { count: number };

/**
 * Yahoo team metadata is an array of single-key objects.
 * Use extractYahooField() to get a value by key.
 */
export type YahooTeamMetaArray = Array<Record<string, unknown>>;

// ---------------------------------------------------------------------------
// Shared sub-types
// ---------------------------------------------------------------------------

export interface YahooTeamLogo {
  size: "small" | "large";
  url: string;
}

export interface YahooManager {
  manager_id: string;
  nickname: string;
  guid: string;
  image_url?: string;
  is_commissioner?: "1" | "0";
}

export interface YahooOutcomeTotals {
  wins: string;
  losses: string;
  ties: string;
  percentage: string;
}

export interface YahooTeamStandings {
  rank: number;
  playoff_seed: number;
  outcome_totals: YahooOutcomeTotals;
  points_for?: string;
  points_against?: string;
}

export interface YahooTeamPoints {
  coverage_type: string;
  week?: string;
  season?: string;
  total: string;
}

export interface YahooPlayerPoints {
  coverage_type: string;
  week?: string;
  total: string;
}

export interface YahooSelectedPosition {
  coverage_type: string;
  week: number;
  position: string;
}

export interface YahooPlayerStat {
  stat_id: string;
  value: string;
}

export interface YahooPlayerStats {
  coverage_type: string;
  week?: string;
  stats: YahooMap<{ stat: YahooPlayerStat }>;
}

// ---------------------------------------------------------------------------
// Player types
// ---------------------------------------------------------------------------

/**
 * A player entry within a team roster.
 * Yahoo encodes player metadata as an array of single-key objects.
 */
export interface YahooRosterPlayer {
  /** player[0] = array of metadata objects (use extractYahooField) */
  /** player[1] = { selected_position: Array<Record<string,unknown>> } — Yahoo array-of-single-key-objects pattern */
  /** player[2+] = varies by sub-resource (is_editable, player_points, etc.) */
  player: [YahooTeamMetaArray, { selected_position: YahooTeamMetaArray }, ...Array<unknown>];
}

/**
 * Yahoo encodes the players map under a nested "0" key inside roster.
 * Access players at roster["0"].players, not roster.players.
 */
export interface YahooRoster {
  "0": { players: YahooMap<YahooRosterPlayer> };
  week?: string;
}

// ---------------------------------------------------------------------------
// Team types
// ---------------------------------------------------------------------------

/**
 * A team entry from /league/.../teams
 * team[0] = team metadata array
 * team[1] = team_points (current week)
 * team[2] = team_standings
 * team[3] = roster (if roster sub-resource requested)
 */
export interface YahooTeamEntry {
  team: [
    YahooTeamMetaArray,
    { team_points: YahooTeamPoints },
    { team_standings: YahooTeamStandings },
    ...Array<unknown>,
  ];
}

/**
 * The roster response only has two elements in the team array:
 * team[0] = metadata, team[1] = { roster: YahooRoster }
 * (no team_points or team_standings — those come from the /teams endpoint)
 */
export interface YahooTeamWithRoster {
  team: [YahooTeamMetaArray, { roster: YahooRoster }];
}

// ---------------------------------------------------------------------------
// Matchup / Scoreboard types
// ---------------------------------------------------------------------------

export interface YahooMatchupTeamEntry {
  team: [
    YahooTeamMetaArray,
    { team_points: YahooTeamPoints },
    { team_projected_points?: YahooTeamPoints },
  ];
}

/**
 * Yahoo encodes each matchup's teams under a nested "0" key.
 * The `teams` map lives at `matchup["0"].teams`, not `matchup.teams`.
 */
export interface YahooMatchup {
  "0": { teams: YahooMap<YahooMatchupTeamEntry> };
  week: string;
  week_start: string;
  week_end: string;
  status: string;
  is_playoffs: "0" | "1";
  is_consolation: "0" | "1";
  is_tied?: number;
  winner_team_key?: string;
}

/**
 * Yahoo encodes the matchups list under a nested "0" key.
 * The matchups map lives at `scoreboard["0"].matchups`, not `scoreboard.matchups`.
 */
export interface YahooScoreboard {
  "0": { matchups: YahooMap<{ matchup: YahooMatchup }> };
  week: string;
}

// ---------------------------------------------------------------------------
// Settings / Scoring types
// ---------------------------------------------------------------------------

export interface YahooStatModifier {
  stat_id: string;
  value: string;
}

export interface YahooRosterPosition {
  position: string;
  count: number;
}

export interface YahooLeagueSettings {
  name: string;
  is_public_viewable: number;
  scoring_type: string;
  roster_positions: { roster_position: YahooRosterPosition[] };
  stat_modifiers: { stats: { stat: YahooStatModifier[] } };
  playoff_start_week?: string;
  num_playoff_teams?: string;
  num_playoff_consolation_teams?: string;
  draft_type?: string;
}

// ---------------------------------------------------------------------------
// League types
// ---------------------------------------------------------------------------

export interface YahooLeagueMeta {
  league_key: string;
  league_id: string;
  name: string;
  url: string;
  logo_url?: string;
  draft_status: string;
  num_teams: number;
  edit_key: string;
  weekly_deadline: string;
  scoring_type: string;
  league_type: string;
  current_week: number | string; // Yahoo returns this as a string despite being numeric
  start_week: string;
  start_date: string;
  end_week: string;
  end_date: string;
  is_finished?: number;
  game_code: string;
  season: string;
  /** Derived from settings sub-resource, if requested */
  settings?: YahooLeagueSettings;
}

// ---------------------------------------------------------------------------
// Top-level response shapes
// ---------------------------------------------------------------------------

export interface YahooLeagueResponse {
  fantasy_content: {
    league: [YahooLeagueMeta, Record<string, unknown>];
    time?: string;
    refresh_rate?: string;
  };
}

export interface YahooLeagueTeamsResponse {
  fantasy_content: {
    league: [YahooLeagueMeta, { teams: YahooMap<YahooTeamEntry> }];
  };
}

export interface YahooLeagueRostersResponse {
  fantasy_content: {
    league: [YahooLeagueMeta, { teams: YahooMap<YahooTeamWithRoster> }];
  };
}

export interface YahooLeagueScoreboardResponse {
  fantasy_content: {
    league: [YahooLeagueMeta, { scoreboard: YahooScoreboard }];
  };
}

export interface YahooLeagueSettingsResponse {
  fantasy_content: {
    league: [YahooLeagueMeta, { settings: YahooLeagueSettings }];
  };
}

export interface YahooGameResponse {
  fantasy_content: {
    game: [
      {
        game_key: string;
        game_id: string;
        name: string;
        code: string;
        type: string;
        url: string;
        season: string;
        current_week?: number;
        is_game_over?: number;
        is_offseason?: number;
      },
      Record<string, unknown>,
    ];
  };
}
