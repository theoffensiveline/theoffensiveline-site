export interface League {
  total_rosters: number;
  status: string;
  sport: string;
  settings: {
    waiver_budget: number;
    playoff_teams: number;
    num_teams: number;
    playoff_week_start: number;
    last_scored_leg: number;
    last_report: number;
  };
  season_type: string;
  season: string;
  scoring_settings: ScoringSettings;
  roster_positions: string[];
  previous_league_id: string;
  name: string;
  league_id: string;
  draft_id: string;
  avatar: string;
  metadata: {
    auto_continue: "on" | "off";
    keeper_deadline: string;
    latest_league_winner_roster_id: string;
  };
}

export interface Matchup {
  points: number;
  players: string[];
  roster_id: number;
  custom_points: number | null;
  matchup_id: number;
  starters: string[];
  starters_points: number[];
  players_points: Record<string, number>;
  week?: number;
}

export interface Roster {
  roster_id: number;
  owner_id: string;
  starters: string[];
  players: string[];
  settings: {
    wins: number;
    losses: number;
    ties: number;
    fpts: number;
    fpts_decimal: number;
    fpts_against: number;
    fpts_against_decimal: number;
  };
  league_id: string;
}

export interface User {
  user_id: string;
  username: string;
  display_name: string;
  avatar: string;
  metadata: {
    team_name: string;
    avatar: string;
  };
  is_owner: boolean; // is commissioner
}

interface ScoringSettings {
  sack: number;
  fgm_40_49: number;
  pass_int: number;
  pts_allow_0: number;
  pass_2pt: number;
  st_td: number;
  fgm_yds_over_30: number;
  rec_td: number;
  fgm_30_39: number;
  xpmiss: number;
  rush_td: number;
  fgm: number;
  rec_2pt: number;
  rush_fd: number;
  st_fum_rec: number;
  fgmiss: number;
  ff: number;
  rec: number;
  pts_allow_14_20: number;
  fgm_0_19: number;
  int: number;
  def_st_fum_rec: number;
  fum_lost: number;
  pts_allow_1_6: number;
  rec_fd: number;
  fgm_20_29: number;
  pts_allow_21_27: number;
  xpm: number;
  rush_2pt: number;
  fum_rec: number;
  def_st_td: number;
  fgm_50p: number;
  def_td: number;
  safe: number;
  pass_yd: number;
  blk_kick: number;
  pass_td: number;
  rush_yd: number;
  fum: number;
  pts_allow_28_34: number;
  pts_allow_35p: number;
  fum_rec_td: number;
  rec_yd: number;
  def_st_ff: number;
  pts_allow_7_13: number;
  st_ff: number;
}

export interface Player {
  last_name: string;
  oddsjam_id: any;
  search_last_name: string;
  full_name: string | null;
  injury_start_date: string | null;
  college: string | null;
  sport: string | null;
  injury_notes: string | null;
  first_name: string;
  espn_id: number | null;
  practice_participation: string | null;
  number: number | null;
  metadata: any;
  active: boolean;
  injury_body_part: string | null;
  gsis_id: string | null;
  years_exp: number | null;
  player_id: string;
  fantasy_positions: string[] | null;
  rotowire_id: number | null;
  team: string | null;
  status: string | null;
  practice_description: string | null;
  height: string | null;
  team_abbr: string | null;
  competitions: any[]; // Adjust type if more specific type is known
  depth_chart_order: number | null;
  birth_country: string | null;
  high_school: string | null;
  team_changed_at: string | null;
  rotoworld_id: any;
  search_rank: number | null;
  birth_state: string | null;
  age: number | null;
  depth_chart_position: string | null;
  birth_city: string | null;
  swish_id: any;
  stats_id: number | null;
  opta_id: string | null;
  birth_date: string | null;
  news_updated: any;
  weight: string | null;
  fantasy_data_id: number | null;
  search_full_name: string;
  position: string | null;
  pandascore_id: string | null;
  hashtag: string | null;
  sportradar_id: string | null;
  yahoo_id: number | null;
  search_first_name: string;
  injury_status: string | null;
}

export interface Transactions {
  type: "trade" | "free_agent" | "waiver";
  transaction_id: string;
  status_updated: number; // unix timestamp
  status: "complete" | string;
  settings: null | {
    waiver_bid?: number;
  };
  roster_ids: number[]; // roster_ids involved in transaction
  metadata: null | Record<string, any>; // can contain waiver notes
  leg: number; // in football, represents the week
  drops: null | {
    [playerId: string]: number; // player_id -> roster_id mapping
  };
  draft_picks: {
    season: string;
    round: number;
    roster_id: number; // original owner's roster_id
    previous_owner_id: number;
    owner_id: number; // new owner after trade
  }[];
  creator: string; // user id who initiated the transaction
  created: number; // unix timestamp
  consenter_ids: number[]; // roster_ids of people who agreed
  adds: null | {
    [playerId: string]: number; // player_id -> roster_id mapping
  };
  waiver_budget: {
    sender: number;
    receiver: number;
    amount: number;
  }[];
}

interface BracketMatchupFrom {
  w?: number; // winner of match id
  l?: number; // loser of match id
}

export interface BracketMatchup {
  r: number; // round number
  m: number; // match id
  t1: number | null; // roster_id of team 1 or null
  t2: number | null; // roster_id of team 2 or null
  w: number | null; // roster_id of winner
  l: number | null; // roster_id of loser
  t1_from?: BracketMatchupFrom; // where team 1 comes from
  t2_from?: BracketMatchupFrom; // where team 2 comes from
  p?: number; // optional placement/position
}

export interface LeagueHistory {
  leagues: League[];
  rosters: Record<string, Roster[]>; // league_id -> rosters
  users: Record<string, User[]>; // league_id -> users
  metadata: {
    startYear: string;
    endYear: string;
    totalSeasons: number;
  };
}
