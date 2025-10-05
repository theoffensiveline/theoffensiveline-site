export interface Team {
  team_id: string;
  team_name: string;
  team_logo: string;
  team_wins: number;
  team_losses: number;
  team_ties: number;
  team_points_for: number;
  team_points_against: number;
}

export interface UserStatus {
  isEliminated: boolean;
  lives: number;
}

export interface StarterWithPosition {
  id: string;
  position: string;
  points: number;
}

export interface ExtendedMatchup {
  matchup_id: number;
  roster_id: number;
  points: number;
  starters: StarterWithPosition[];
  players: string[];
  players_points: Record<string, number>;
}
