import React from "react";
import { ExtendedMatchup, Team } from "../../types/survivorTypes";
import { ColorConstants } from "../constants/ColorConstants";
import {
  SurvivorMatchupContainer,
  SurvivorMatchupTitle,
  SurvivorMatchupTeamRow,
  SurvivorMatchupTeamInfo,
  SurvivorMatchupVs,
  SurvivorMatchupPlayerRows,
  SurvivorMatchupPositions,
  SurvivorMatchupPosition,
  SurvivorButton,
  TeamPointsRow,
} from "../survivorStyles";

interface SurvivorMatchupProps {
  matchupId: string;
  matchups: ExtendedMatchup[];
  teams: Record<number, Team>;
  motwMatchupId: number | null;
  userPick?: { teamIdSelected: string } | null;
  canMakeSelection: boolean;
  userStatus?: { isEliminated: boolean } | null;
  onTeamSelect: (teamId: number, matchupId: number) => void;
  playerMap: Record<string, string | null>;
  allUserPicks?: any[];
  allMotwData?: Map<number, any>;
  week?: number | null;
  selectionReason?: string;
}

const SurvivorMatchup: React.FC<SurvivorMatchupProps> = ({
  matchupId,
  matchups,
  teams,
  motwMatchupId,
  userPick,
  canMakeSelection,
  userStatus,
  onTeamSelect,
  playerMap,
  allUserPicks,
  allMotwData,
  week,
  selectionReason,
}) => {
  // Ensure matchups is defined and has at least two elements
  if (!matchups || matchups.length < 2) return null;

  const [team1, team2] = matchups;
  const team1StartersSet = new Set(team1.starters.map((s) => s.id));
  const team2StartersSet = new Set(team2.starters.map((s) => s.id));
  const team1BenchPlayers = team1.players.filter(
    (id: string) => !team1StartersSet.has(id)
  );
  const team2BenchPlayers = team2.players.filter(
    (id: string) => !team2StartersSet.has(id)
  );

  const hasPickedTeamBefore = (rosterId: string, matchupId: number) => {
    const isMotw = matchupId === motwMatchupId;
    if (isMotw) return false; // Allow MotW picks even if picked before
    const previousNonMotwPicks =
      allUserPicks?.filter((pick) => {
        if (pick.week >= (week || 0)) return false;
        const pickMotwData = allMotwData?.get(pick.week);
        if (!pickMotwData) return true; // assume not motw if no data
        return !pickMotwData.rosters.includes(parseInt(pick.teamIdSelected));
      }) || [];
    return previousNonMotwPicks.some(
      (pick) => pick.teamIdSelected === rosterId
    );
  };

  const team1Details = teams[team1.roster_id] || {
    team_name: "Unknown",
    team_logo: "default-avatar.png",
  };
  const team2Details = teams[team2.roster_id] || {
    team_name: "Unknown",
    team_logo: "default-avatar.png",
  };

  const buildRecord = (details: Team) => {
    const { team_wins, team_losses, team_ties } = details;
    return `${team_wins} - ${team_losses}${
      team_ties > 0 ? ` - ${team_ties}` : ""
    }`;
  };

  return (
    <SurvivorMatchupContainer key={matchupId}>
      {/* Matchup Title (Spanning all 3 columns) */}
      <SurvivorMatchupTitle>
        <span
          style={{
            color:
              parseInt(matchupId) === motwMatchupId
                ? ColorConstants.light.hotDogYellow
                : "inherit",
          }}
        >
          {parseInt(matchupId) === motwMatchupId
            ? "⭐ Matchup of the Week"
            : `Matchup ${matchupId}`}
        </span>
      </SurvivorMatchupTitle>

      {/* First row for Team Names and Images */}
      <SurvivorMatchupTeamRow>
        <SurvivorMatchupTeamInfo>
          <h3>{team1Details.team_name}</h3>
          <img src={team1Details.team_logo} alt={team1Details.team_name} />
          <p>
            Record: {buildRecord(team1Details)}
            <br />
            PF: {team1Details.team_points_for}
            <br />
            PA: {team1Details.team_points_against}
          </p>
          <SurvivorButton
            onClick={() => onTeamSelect(team1.roster_id, parseInt(matchupId))}
            disabled={
              !canMakeSelection ||
              userPick?.teamIdSelected === team1.roster_id.toString() ||
              hasPickedTeamBefore(
                team1.roster_id.toString(),
                parseInt(matchupId)
              )
            }
            isSelected={userPick?.teamIdSelected === team1.roster_id.toString()}
            title={
              userStatus?.isEliminated
                ? "You have been eliminated"
                : hasPickedTeamBefore(
                    team1.roster_id.toString(),
                    parseInt(matchupId)
                  )
                ? `Already picked ${team1Details.team_name} in a previous non-MotW week`
                : !canMakeSelection && selectionReason
                ? selectionReason
                : ""
            }
          >
            {userPick?.teamIdSelected === team1.roster_id.toString()
              ? "Selected"
              : userPick && canMakeSelection
              ? "Switch"
              : "Select"}
          </SurvivorButton>
        </SurvivorMatchupTeamInfo>
        <SurvivorMatchupVs>VS</SurvivorMatchupVs>
        <SurvivorMatchupTeamInfo>
          <h3>{team2Details.team_name}</h3>
          <img src={team2Details.team_logo} alt={team2Details.team_name} />
          <p>
            Record: {buildRecord(team2Details)}
            <br />
            PF: {team2Details.team_points_for}
            <br />
            PA: {team2Details.team_points_against}
          </p>
          <SurvivorButton
            onClick={() => onTeamSelect(team2.roster_id, parseInt(matchupId))}
            disabled={
              !canMakeSelection ||
              userPick?.teamIdSelected === team2.roster_id.toString() ||
              hasPickedTeamBefore(
                team2.roster_id.toString(),
                parseInt(matchupId)
              )
            }
            isSelected={userPick?.teamIdSelected === team2.roster_id.toString()}
            title={
              userStatus?.isEliminated
                ? "You have been eliminated"
                : hasPickedTeamBefore(
                    team2.roster_id.toString(),
                    parseInt(matchupId)
                  )
                ? `Already picked ${team2Details.team_name} in a previous non-MotW week`
                : !canMakeSelection && selectionReason
                ? selectionReason
                : ""
            }
          >
            {userPick?.teamIdSelected === team2.roster_id.toString()
              ? "Selected"
              : userPick && canMakeSelection
              ? "Switch"
              : "Select"}
          </SurvivorButton>
        </SurvivorMatchupTeamInfo>
      </SurvivorMatchupTeamRow>

      {/* Team Points Row */}
      <TeamPointsRow>
        <div>{team1.points}</div>
        <div>Points</div>
        <div>{team2.points}</div>
      </TeamPointsRow>

      {/* Second row for Starters */}
      <SurvivorMatchupPlayerRows>
        <h4>Starters</h4>
        {team1.starters.map(({ id }) => (
          <div
            key={id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ textAlign: "left" }}>{playerMap[id] || "N/A"}</div>
            <div style={{ textAlign: "right" }}>
              {team1.players_points[id] || "0"}
            </div>
          </div>
        ))}
      </SurvivorMatchupPlayerRows>
      <SurvivorMatchupPositions>
        <h4>Positions</h4>
        {team1.starters.map(({ position }, index: number) => (
          <SurvivorMatchupPosition key={index} position={position}>
            {position}
          </SurvivorMatchupPosition>
        ))}
      </SurvivorMatchupPositions>
      <SurvivorMatchupPlayerRows>
        <h4>Starters</h4>
        {team2.starters.map(({ id }) => (
          <div
            key={id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ textAlign: "left" }}>
              {team2.players_points[id] || "0"}
            </div>
            <div style={{ textAlign: "right" }}>{playerMap[id] || "N/A"}</div>
          </div>
        ))}
      </SurvivorMatchupPlayerRows>

      {/* Third row for Bench */}
      <SurvivorMatchupPlayerRows>
        <h4>Bench</h4>
        {team1BenchPlayers.map((id: string) => (
          <div key={id} style={{ textAlign: "left" }}>
            {playerMap[id] || id}
          </div>
        ))}
      </SurvivorMatchupPlayerRows>
      <SurvivorMatchupPositions />
      <SurvivorMatchupPlayerRows>
        <h4>Bench</h4>
        {team2BenchPlayers.map((id: string) => (
          <div key={id} style={{ textAlign: "right" }}>
            {playerMap[id] || id}
          </div>
        ))}
      </SurvivorMatchupPlayerRows>
    </SurvivorMatchupContainer>
  );
};

export default SurvivorMatchup;
