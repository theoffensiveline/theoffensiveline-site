/**
 * Shared fixture factories for newsletter utility tests.
 *
 * All factories accept optional overrides so individual tests can tweak
 * only the fields they care about without repeating boilerplate.
 */

import type { League, Matchup, Roster, User } from "../../../types/sleeperTypes";

// ---------------------------------------------------------------------------
// User
// ---------------------------------------------------------------------------
export function makeUser(overrides: Partial<User> = {}): User {
  return {
    user_id: "user_1",
    username: "testuser",
    display_name: "Test User",
    avatar: "abc123",
    metadata: {
      team_name: "Test Team",
      avatar: "abc123",
    },
    ...overrides,
  } as User;
}

// ---------------------------------------------------------------------------
// Roster
// ---------------------------------------------------------------------------
export function makeRoster(overrides: Partial<Roster> = {}): Roster {
  return {
    roster_id: 1,
    owner_id: "user_1",
    league_id: "league_123",
    players: [],
    starters: [],
    reserve: [],
    settings: {
      wins: 0,
      losses: 0,
      ties: 0,
      fpts: 0,
      fpts_decimal: 0,
      fpts_against: 0,
      fpts_against_decimal: 0,
      ppts: 0,
      ppts_decimal: 0,
      waiver_position: 1,
      waiver_budget_used: 0,
      total_moves: 0,
      streak: 0,
      rank: 0,
    },
    ...overrides,
  } as unknown as Roster;
}

// ---------------------------------------------------------------------------
// Matchup
// ---------------------------------------------------------------------------
export function makeMatchup(overrides: Partial<Matchup> = {}): Matchup {
  return {
    roster_id: 1,
    matchup_id: 1,
    points: 100,
    players: [],
    starters: [],
    starters_points: [],
    players_points: {},
    custom_points: null,
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// League
// ---------------------------------------------------------------------------
export function makeLeague(overrides: Partial<League> = {}): League {
  return {
    league_id: "league_123",
    name: "Test League",
    total_rosters: 10,
    status: "in_season",
    sport: "nfl",
    season_type: "regular",
    season: "2024",
    roster_positions: ["QB", "RB", "RB", "WR", "WR", "TE", "FLEX", "BN", "BN", "BN"],
    settings: {
      playoff_week_start: 15,
      playoff_teams: 6,
      num_teams: 10,
      waiver_budget: 100,
      last_scored_leg: 0,
      last_report: 0,
      best_ball: 0,
      divisions: 0,
      draft_rounds: 15,
      start_week: 1,
      playoff_seed_type: 0,
      playoff_type: 0,
      playoff_round_type: 0,
      trade_deadline: 11,
      type: 2,
      max_keepers: 1,
      waiver_type: 0,
      waiver_day_of_week: 2,
      waiver_clear_days: 2,
      waiver_bid_min: 0,
      daily_waivers: 0,
      daily_waivers_hour: 0,
      daily_waivers_days: 0,
      reserve_slots: 1,
      taxi_slots: 0,
      taxi_years: 0,
      taxi_deadline: 0,
      taxi_allow_vets: 0,
      leg: 0,
    },
    scoring_settings: {} as League["scoring_settings"],
    previous_league_id: "",
    draft_id: "draft_1",
    avatar: "",
    bracket_id: null,
    loser_bracket_id: null,
    company_id: null,
    group_id: null,
    shard: 0,
    last_message_id: "",
    metadata: {
      auto_continue: "on",
      keeper_deadline: "",
      latest_league_winner_roster_id: "",
    },
    ...overrides,
  } as League;
}

// ---------------------------------------------------------------------------
// Helpers to build a complete 2-team matchup pair for a given week
// ---------------------------------------------------------------------------
export interface MatchupPairOptions {
  matchupId?: number;
  roster1Id?: number;
  roster2Id?: number;
  points1?: number;
  points2?: number;
}

export function makeMatchupPair(opts: MatchupPairOptions = {}): [Matchup, Matchup] {
  const {
    matchupId = 1,
    roster1Id = 1,
    roster2Id = 2,
    points1 = 100,
    points2 = 90,
  } = opts;

  return [
    makeMatchup({ roster_id: roster1Id, matchup_id: matchupId, points: points1 }),
    makeMatchup({ roster_id: roster2Id, matchup_id: matchupId, points: points2 }),
  ];
}
