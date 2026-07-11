/**
 * EditorClaimCard — banner on a league's home page for the newsletter
 * editor role (#53).
 *
 * States:
 *   - unclaimed + verified league member  → Claim button
 *   - unclaimed + signed out              → sign-in prompt
 *   - unclaimed + Sleeper account not linked → link-account prompt
 *   - claimed by the current user         → "you're the editor" banner
 *   - claimed by someone else / not a member / lookup failed → renders nothing
 *     (the league picker already shows claimed status)
 */
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { useLeagueDoc } from "../hooks/useLeagueDoc";
import { verifyLeagueMembership, claimEditorRole } from "../utils/leagueClaim";
import { getPlatform } from "../utils/api/FantasyAPI";

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin: 12px 20px 0;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.newsBlue};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.background};
`;

const Message = styled.span`
  color: ${({ theme }) => theme.text};
  font-size: 15px;
`;

const ClaimButton = styled.button`
  background-color: ${({ theme }) => theme.newsBlue};
  color: ${({ theme }) => theme.background};
  border: none;
  border-radius: 20px;
  padding: 8px 18px;
  font-size: 14px;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

const ErrorText = styled.span`
  color: #bc293d;
  font-size: 13px;
  width: 100%;
  text-align: center;
`;

interface EditorClaimCardProps {
  leagueId: string;
}

function EditorClaimCard({ leagueId }: EditorClaimCardProps): React.ReactElement | null {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { currentUser, profile } = useAuth();
  // Same options as Home's call so the two share one cached query
  const { data: leagueDoc, isLoading } = useLeagueDoc(leagueId, { createIfMissing: true });
  const [claiming, setClaiming] = useState(false);
  const [claimError, setClaimError] = useState<string | null>(null);

  const unclaimed = !!leagueDoc && leagueDoc.editorUid === null;

  const { data: membership } = useQuery({
    queryKey: ["leagueMembership", leagueId, profile?.sleeperUserId ?? "none"],
    queryFn: () => verifyLeagueMembership(leagueId, profile),
    enabled: !!currentUser && unclaimed,
    staleTime: 60 * 60 * 1000,
  });

  if (isLoading || !leagueDoc) return null;

  // Claimed by the current user
  if (currentUser && leagueDoc.editorUid === currentUser.uid) {
    return (
      <Card>
        <Message>🖋️ You're the editor of this league's newsletter.</Message>
      </Card>
    );
  }

  if (!unclaimed) return null;

  // Unclaimed, signed out — invite sign-in
  if (!currentUser) {
    return (
      <Card>
        <Message>This league's newsletter editor role is unclaimed.</Message>
        <ClaimButton onClick={() => navigate("/login")}>Sign in to claim it</ClaimButton>
      </Card>
    );
  }

  // Sleeper league but no linked Sleeper account — point at the profile page
  if (membership?.reason === "no-sleeper-link" && getPlatform(leagueId) === "sleeper") {
    return (
      <Card>
        <Message>Link your Sleeper account to claim this league's editor role.</Message>
        <ClaimButton onClick={() => navigate("/profile")}>Go to profile</ClaimButton>
      </Card>
    );
  }

  if (!membership?.isMember) return null;

  const handleClaim = async () => {
    if (!currentUser) return;
    setClaiming(true);
    setClaimError(null);
    const result = await claimEditorRole(leagueId, currentUser.uid);
    if (!result.success) {
      setClaimError(result.error ?? "Something went wrong.");
    }
    // Refetch the league doc either way — on failure it shows the new editor
    await queryClient.invalidateQueries({ queryKey: ["leagueDoc", leagueId] });
    setClaiming(false);
  };

  return (
    <Card>
      <Message>This league's newsletter editor role is unclaimed.</Message>
      <ClaimButton onClick={handleClaim} disabled={claiming}>
        {claiming ? "Claiming…" : "Claim editor role"}
      </ClaimButton>
      {claimError && <ErrorText>{claimError}</ErrorText>}
    </Card>
  );
}

export default EditorClaimCard;
