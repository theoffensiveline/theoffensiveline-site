// ESPN Fantasy Football API response types

export interface ESPNLeagueResponse {
  id: number;
  seasonId: number;
  scoringPeriodId: number;
  settings: ESPNSettings;
  teams: ESPNTeam[];
  members: ESPNMember[];
  schedule: ESPNScheduleItem[];
}

export interface ESPNSettings {
  name: string;
  size: number;
  scheduleSettings: {
    matchupPeriodCount: number;
    playoffMatchupPeriodLength: number;
    matchupPeriods: Record<string, number[]>;
  };
  scoringSettings: {
    scoringItems: ESPNScoringItem[];
  };
  rosterSettings: {
    lineupSlotCounts: Record<string, number>;
    positionLimits: Record<string, number>;
  };
}

export interface ESPNScoringItem {
  statId: number;
  pointsOverrides?: Record<string, number>;
  points: number;
}

export interface ESPNTeam {
  id: number;
  name: string;
  abbrev: string;
  logo: string;
  primaryOwner: string;
  record: {
    overall: {
      wins: number;
      losses: number;
      ties: number;
      pointsFor: number;
      pointsAgainst: number;
    };
  };
  roster?: {
    entries: ESPNRosterEntry[];
  };
}

export interface ESPNMember {
  id: string;
  displayName: string;
  firstName: string;
  lastName: string;
}

export interface ESPNScheduleItem {
  id: number;
  matchupPeriodId: number;
  home: ESPNMatchupTeam;
  away?: ESPNMatchupTeam;
  winner: "HOME" | "AWAY" | "UNDECIDED";
  playoffTierType?: "NONE" | "WINNERS_BRACKET" | "LOSERS_BRACKET";
}

export interface ESPNMatchupTeam {
  teamId: number;
  totalPoints: number;
  rosterForCurrentScoringPeriod?: {
    entries: ESPNRosterEntry[];
  };
  rosterForMatchupPeriod?: {
    entries: ESPNRosterEntry[];
  };
}

export interface ESPNRosterEntry {
  playerId: number;
  lineupSlotId: number;
  playerPoolEntry?: {
    appliedStatTotal: number;
    onTeamId: number;
    player?: {
      fullName: string;
      defaultPositionId: number;
      proTeamId: number;
    };
  };
}
