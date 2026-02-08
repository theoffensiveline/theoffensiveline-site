/**
 * Newsletter Type Definitions
 *
 * Type definitions for newsletter JSON data formats used across
 * The Offensive Line fantasy football website.
 */

/**
 * Manager efficiency chart data showing actual vs optimal lineup performance
 */
export interface EfficiencyData {
  /** Week number */
  week: number;
  /** Team name */
  team_name: string;
  /** Actual points scored with lineup decisions */
  actual_points: number;
  /** Maximum possible points with optimal lineup */
  max_points: number;
  /** Efficiency percentage (actual/max * 100) */
  percentage: number;
}

/**
 * Player entry in a starter lineup
 */
export interface PlayerEntry {
  /** Player's full name */
  full_name: string;
  /** Optional nickname for the player */
  nickname?: string;
  /** Player position (QB, RB, WR, TE, K, DEF) */
  position: string;
  /** Fantasy points scored */
  points: number;
}

/**
 * Starter lineup data for matchup visualizations
 */
export interface StartersData {
  /** Team name */
  team_name: string;
  /** Matchup identifier */
  matchup_id: number;
  /** Array of player entries in starting lineup */
  entries: PlayerEntry[];
}

/**
 * Leaderboard data showing team standings with Points For/Against
 */
export interface LeaderboardData {
  /** Team rank (1-indexed) */
  Rank: number;
  /** Rank change from previous week (positive = moved up, negative = moved down) */
  Trend: number;
  /** Team name */
  Team: string;
  /** Wins */
  W: number;
  /** Losses */
  L: number;
  /** Points For */
  PF: number;
  /** Points Against */
  PA: number;
  /** Color for PF display (hex or gradient) */
  PFColor: string;
  /** Color for PA display (hex or gradient) */
  PAColor: string;
  /** Avatar URL */
  avatar_upload?: string;
  /** Image URL or text for display */
  image_or_text?: string;
}

/**
 * Matchup statistics with margin of victory and league context
 */
export interface MatchupData {
  /** Week number */
  week: number;
  /** Team name */
  team_name: string;
  /** Team avatar or display image URL */
  image_or_text?: string;
  /** Matchup identifier */
  matchup_id: number;
  /** Team's total points */
  team_points: number;
  /** Margin of victory (positive if won, negative if lost) */
  margin_of_victory: number;
  /** League average score for the week */
  Average: number;
  /** League median score for the week */
  Median: number;
  /** Highest score in the league for the week */
  Maximum: number;
  /** Lowest score in the league for the week */
  Minimum: number;
  /** Color for margin of victory display */
  mov_color: string;
}

/**
 * Best Ball leaderboard showing optimal lineup standings
 */
export interface BestBallData {
  /** Team rank (1-indexed) */
  Rank: number;
  /** Change in rank from previous week */
  Diff: number;
  /** Team name */
  Team: string;
  /** Wins with optimal lineups */
  W: number;
  /** Losses with optimal lineups */
  L: number;
  /** Points For with optimal lineups */
  PF: number;
  /** Points Against */
  PA: number;
  /** Color for PF display (hex or gradient) */
  PFColor: string;
  /** Color for PA display (hex or gradient) */
  PAColor: string;
}

/**
 * Median scoring leaderboard (wins/losses vs league median)
 */
export interface MedianData {
  /** Team rank (1-indexed) */
  Rank: number;
  /** Change in rank from previous week */
  Diff: number;
  /** Team name */
  Team: string;
  /** Wins against league median */
  W: number;
  /** Losses against league median */
  L: number;
  /** Points For */
  PF: number;
  /** Points Against */
  PA: number;
  /** Color for PF display (hex or gradient) */
  PFColor: string;
  /** Color for PA display (hex or gradient) */
  PAColor: string;
}

/**
 * Power rankings with team ability and strength of schedule metrics
 */
export interface PowerRankingsData {
  /** Power ranking position */
  "P Rank": number;
  /** Team name */
  Team: string;
  /** Play-all wins (wins if team played everyone each week) */
  "Play All W": number;
  /** Play-all losses */
  "Play All L": number;
  /** Team ability score (0-100 scale) */
  "Team Ability": number;
  /** Strength of schedule score (0-100 scale) */
  "Str of Sched": number;
  /** Color for team ability display */
  TaColor: string;
  /** Color for strength of schedule display */
  SosColor: string;
}

/**
 * Record data for schedule analysis
 */
export interface RecordData {
  /** Team name */
  team1: string;
  /** List of teams for comparison */
  team2_list?: string[];
  /** Number of wins */
  wins: number;
  /** Number of losses */
  losses: number;
  /** Number of ties */
  ties: number;
}

/**
 * Strength of schedule data with best/worst record scenarios
 */
export interface ScheduleData {
  /** Best possible records against different schedules */
  best_records: RecordData[];
  /** Worst possible records against different schedules */
  worst_records: RecordData[];
  /** Current actual records */
  current_records: RecordData[];
}

/**
 * Playoff probability table data
 */
export interface PlayoffTableData {
  /** Current rank */
  Rank: number;
  /** Team name */
  Team: string;
  /** Wins */
  W: number;
  /** Losses */
  L: number;
  /** Probability of making playoffs (0-100) */
  "Play-off %": number;
  /** Weighted probability of making playoffs (0-100) */
  "WP Playoff %": number;
  /** Number representing playoff odds */
  "Play-off #": number;
  /** Probability of finishing last (0-100) */
  "Last %": number;
  /** Number representing last place odds */
  "Last #": number;
  /** Color for playoff probability display */
  PlayoffColor: string;
  /** Color for weighted playoff probability display */
  WPPlayoffColor: string;
  /** Color for last place probability display */
  LastColor: string;
}
