import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  useUserSurvivorPick,
  useSurvivorStandings,
  useUserSurvivorPicks,
} from "../utils/survivorQueries";
import { Player } from "../types/sleeperTypes";
import {
  createPlayerMap,
  getSelectedTeamName,
  canMakeSelection,
  handleTeamSelect,
} from "../utils/survivorUtils";
import playerData from "../utils/api/sleeper_players.json";
import { leagueIds } from "../components/constants/LeagueConstants";
import { SleeperTeamIdMapping } from "../utils/api/SleeperAPI";
import {
  SurvivorContainer,
  SurvivorTitle,
  SurvivorButton,
  SurvivorWeekNav,
  LoadingSpinner,
} from "../components/survivorStyles";
import { useSurvivorData } from "../hooks/useSurvivorData";
import SurvivorMatchup from "../components/survivor/SurvivorMatchup";
import { ExtendedMatchup } from "../types/survivorTypes";
import CustomAlert from "../components/shared/CustomAlert";
import CustomConfirm from "../components/shared/CustomConfirm";

const Survivor: React.FC = () => {
  const LEAGUE_ID = leagueIds.mainLeague;

  const { currentUser, profile } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState<string>("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingTeamSelect, setPendingTeamSelect] = useState<{
    teamId: number;
    matchupId: number;
  } | null>(null);

  const closeAlert = () => setIsAlertOpen(false);

  const closeConfirm = () => {
    setIsConfirmOpen(false);
    setPendingTeamSelect(null);
  };

  // Use custom hook for data fetching
  const {
    week,
    currentWeek,
    matchups,
    teams,
    error,
    loading,
    motwMatchupId,
    allMotwData,
    handlePreviousWeek,
    handleNextWeek,
  } = useSurvivorData(LEAGUE_ID);

  // Use React Query for survivor data
  const { data: userPick, refetch: refetchUserPick } = useUserSurvivorPick(
    LEAGUE_ID,
    currentUser?.uid || "",
    week || 0
  );

  const { data: standingsData } = useSurvivorStandings(LEAGUE_ID);

  const { data: allUserPicks } = useUserSurvivorPicks(LEAGUE_ID, currentUser?.uid || "");

  // Create a map from player ID to player name using utility
  const playerMap = createPlayerMap(playerData as unknown as Record<string, Player>);

  // Derive user status from standings data
  const userStatus = standingsData?.userStatus?.[currentUser?.uid || ""] || null;

  const onTeamSelect = async (teamId: number, matchupId: number) => {
    if (isSubmitting) return; // Prevent multiple submissions

    // Check if user already has a pick for this week
    if (userPick) {
      const team = teams[teamId];
      if (!team) return;

      // Find roster ID
      const rosterEntry = Object.entries(teams).find(([_, t]) => t.team_id === team.team_id);
      if (!rosterEntry) return;
      const rosterId = rosterEntry[0];

      // If same team, do nothing
      if (userPick.teamIdSelected === rosterId) return;

      // Show confirm dialog
      const currentPickOwnerName = Object.keys(SleeperTeamIdMapping).includes(
        userPick.teamIdSelected
      )
        ? SleeperTeamIdMapping[userPick.teamIdSelected as keyof typeof SleeperTeamIdMapping]
        : "Unknown Owner";

      const newOwnerName = Object.keys(SleeperTeamIdMapping).includes(rosterId)
        ? SleeperTeamIdMapping[rosterId as keyof typeof SleeperTeamIdMapping]
        : "Unknown Owner";

      setConfirmMessage(
        `You already picked ${currentPickOwnerName} for this week. Do you want to change to ${newOwnerName}?`
      );
      setPendingTeamSelect({ teamId, matchupId });
      setIsConfirmOpen(true);
      return;
    }

    // No existing pick, proceed directly
    await performTeamSelect(teamId, matchupId);
  };

  const performTeamSelect = async (teamId: number, matchupId: number) => {
    setIsSubmitting(true);
    try {
      const params = {
        leagueId: LEAGUE_ID,
        currentUser,
        profile,
        week,
        currentWeek,
        userPick,
        allUserPicks: allUserPicks || [],
        allMotwData,
        motwMatchupId,
        teams,
      };
      const result = await handleTeamSelect(teamId, matchupId, params, navigate, refetchUserPick);
      if (result.message) {
        setAlertMessage(result.message);
        setIsAlertOpen(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirm = async () => {
    if (pendingTeamSelect) {
      await performTeamSelect(pendingTeamSelect.teamId, pendingTeamSelect.matchupId);
      setIsConfirmOpen(false);
      setPendingTeamSelect(null);
    }
  };

  // Group matchups by matchup_id
  const groupedMatchups = matchups.reduce(
    (groups: Record<number, ExtendedMatchup[]>, matchup) => {
      const { matchup_id } = matchup;
      if (!groups[matchup_id]) {
        groups[matchup_id] = [];
      }
      groups[matchup_id].push(matchup);
      return groups;
    },
    {} as Record<number, ExtendedMatchup[]>
  );

  return (
    <SurvivorContainer>
      {!loading && week !== null && currentWeek !== null && (
        <>
          <SurvivorWeekNav>
            {week > 1 && (
              <SurvivorButton
                style={{ position: "absolute", left: "0", margin: "10px" }}
                onClick={() => handlePreviousWeek()}
              >
                Previous Week
              </SurvivorButton>
            )}
            <SurvivorButton
              style={{ position: "absolute", right: "0", margin: "10px" }}
              onClick={() => handleNextWeek()}
            >
              Next Week
            </SurvivorButton>
          </SurvivorWeekNav>
          <SurvivorTitle>Week {week} Matchups</SurvivorTitle>
          <div
            style={{
              textAlign: "center",
              margin: "10px 0",
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: userStatus?.isEliminated ? "#ff4444" : "inherit",
            }}
          >
            {userStatus?.isEliminated ? (
              <span>❌ Eliminated - No more picks allowed</span>
            ) : (
              <span>
                Selection: {getSelectedTeamName(userPick, teams)}
                {userStatus?.lives !== undefined &&
                  ` (${userStatus.lives} ${userStatus.lives === 1 ? "life" : "lives"} remaining)`}
              </span>
            )}
          </div>
        </>
      )}
      {loading ? <LoadingSpinner /> : null}
      {/* Show loading message while data is being fetched */}
      {error && <p>{error}</p>} {/* Show error if any */}
      {!loading &&
      week !== null &&
      currentWeek !== null &&
      Object.keys(groupedMatchups).length > 0 ? (
        <div>
          {/* Check if user can make a selection using utility after data is loaded */}
          {(() => {
            const { canSelect: userCanMakeSelection, reason: selectionReason } = canMakeSelection(
              userStatus,
              week,
              currentWeek
            );
            return Object.keys(groupedMatchups)
              .sort((a, b) => {
                if (b === motwMatchupId?.toString()) return 1;
                return 0;
              })
              .map((matchupId: string) => {
                const matchupList = groupedMatchups[parseInt(matchupId, 10)];
                return (
                  <SurvivorMatchup
                    key={matchupId}
                    matchupId={matchupId}
                    matchups={matchupList}
                    teams={teams}
                    motwMatchupId={motwMatchupId}
                    userPick={userPick}
                    canMakeSelection={userCanMakeSelection && !isSubmitting}
                    userStatus={userStatus}
                    onTeamSelect={onTeamSelect}
                    playerMap={playerMap}
                    allUserPicks={allUserPicks}
                    allMotwData={allMotwData}
                    week={week}
                    selectionReason={selectionReason}
                  />
                );
              });
          })()}
        </div>
      ) : !loading ? (
        <p>No matchups available for this week.</p>
      ) : null}
      <CustomAlert message={alertMessage} onClose={closeAlert} isOpen={isAlertOpen} />
      <CustomConfirm
        message={confirmMessage}
        onConfirm={handleConfirm}
        onCancel={closeConfirm}
        isOpen={isConfirmOpen}
      />
    </SurvivorContainer>
  );
};

export default Survivor;
