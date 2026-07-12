/**
 * LeagueNewsletters — discovery + creation view for a league (#103 sub-issue A).
 *
 * Lists every newsletter that includes this league (View = primary CTA) and
 * offers "Create newsletter" as the secondary action. Creation requires a
 * soft membership check via verifyLeagueMembership — failure blocks with
 * guidance rather than allowing unverified creates (#106).
 */
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { verifyLeagueMembership } from "../utils/leagueClaim";
import { createNewsletter, getNewslettersForLeague } from "../services/firestoreCrud";
import { getLeague, getPlatform } from "../utils/api/FantasyAPI";
import { setSelectedNewsletter, setSelectedLeague } from "../utils/selectedNewsletter";
import type { NewsletterDoc } from "../types/firestore";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 4px;
  color: ${({ theme }: any) => theme.text};
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: ${({ theme }: any) => theme.text};
  opacity: 0.7;
  margin-bottom: 28px;
`;

const List = styled.div`
  width: 100%;
  max-width: 440px;
`;

const NewsletterItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background-color: ${({ theme }: any) => theme.background};
  border: 1px solid ${({ theme }: any) => theme.neutral3}44;
  border-radius: 10px;
  padding: 14px 16px;
  margin: 8px 0;
`;

const NewsletterInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  min-width: 0;
`;

const NewsletterName = styled.span`
  font-size: 15px;
  font-weight: bold;
  color: ${({ theme }: any) => theme.text};
`;

const NewsletterMeta = styled.span`
  font-size: 12px;
  color: ${({ theme }: any) => theme.text};
  opacity: 0.6;
`;

const PrimaryButton = styled.button`
  background-color: ${({ theme }: any) => theme.newsBlue};
  color: ${({ theme }: any) => theme.background};
  border: none;
  border-radius: 20px;
  padding: 8px 18px;
  font-size: 14px;
  cursor: pointer;
  flex-shrink: 0;

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

const SubscribeButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }: any) => theme.newsBlue}66;
  color: ${({ theme }: any) => theme.newsBlue};
  border-radius: 20px;
  padding: 7px 14px;
  font-size: 13px;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    border-color: ${({ theme }: any) => theme.newsBlue};
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

const SecondarySection = styled.div`
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px solid ${({ theme }: any) => theme.neutral3}33;
  width: 100%;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const NameInput = styled.input`
  width: 100%;
  max-width: 320px;
  padding: 10px 14px;
  border: 1px solid ${({ theme }: any) => theme.neutral3}66;
  border-radius: 8px;
  background-color: ${({ theme }: any) => theme.background};
  color: ${({ theme }: any) => theme.text};
  font-size: 14px;
`;

const Hint = styled.p`
  font-size: 13px;
  color: ${({ theme }: any) => theme.text};
  opacity: 0.6;
  line-height: 1.5;
  margin: 0;
`;

const ErrorText = styled.span`
  color: #bc293d;
  font-size: 13px;
`;

/** Human-readable season range, e.g. "2023–2025" or "2025". */
export function seasonRange(nl: NewsletterDoc): string {
  const years = nl.seasons.map((s) => s.season);
  const min = Math.min(...years);
  const max = Math.max(...years);
  return min === max ? String(min) : `${min}–${max}`;
}

function LeagueNewsletters(): React.ReactElement {
  const { leagueId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { currentUser, profile, updateProfile } = useAuth();
  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const toggleSubscription = async (nlId: string) => {
    if (!currentUser || togglingId) return;
    setTogglingId(nlId);
    try {
      const current = profile?.subscribedNewsletterIds ?? [];
      const next = current.includes(nlId)
        ? current.filter((id) => id !== nlId)
        : [...current, nlId];
      await updateProfile({ subscribedNewsletterIds: next });
    } finally {
      setTogglingId(null);
    }
  };

  const { data: newsletters, isLoading } = useQuery({
    queryKey: ["newslettersForLeague", leagueId],
    queryFn: () => getNewslettersForLeague(leagueId!),
    enabled: !!leagueId,
  });

  // Platform league for name prefill + season year at create time
  const { data: platformLeague, isError: platformLeagueError } = useQuery({
    queryKey: ["league", leagueId],
    queryFn: () => getLeague(leagueId!),
    enabled: !!leagueId,
    staleTime: 24 * 60 * 60 * 1000,
  });

  const { data: membership } = useQuery({
    queryKey: ["leagueMembership", leagueId, profile?.sleeperUserId ?? "none"],
    queryFn: () => verifyLeagueMembership(leagueId!, profile),
    enabled: !!leagueId && !!currentUser,
    staleTime: 60 * 60 * 1000,
  });

  if (!leagueId) return <Container>Missing league ID</Container>;

  const handleCreate = async () => {
    if (!currentUser || !platformLeague) return;
    setCreating(true);
    setCreateError(null);
    try {
      const newsletterName = name.trim() || `${platformLeague.name} Newsletter`;
      const id = await createNewsletter({
        name: newsletterName,
        editorUid: currentUser.uid,
        editorName: currentUser.displayName || "Unknown editor",
        coEditorUids: [],
        privacy: "public",
        features: [],
        seasons: [{ leagueId, season: parseInt(platformLeague.season, 10), verified: true }],
        activeLeagueId: leagueId,
      });
      await queryClient.invalidateQueries({ queryKey: ["newslettersForLeague", leagueId] });
      navigate(`/n/${id}`);
    } catch (e) {
      console.error("Error creating newsletter:", e);
      setCreateError("Couldn't create the newsletter. Please try again.");
    } finally {
      setCreating(false);
    }
  };

  // Guidance when the soft membership check blocks creation
  const renderCreateSection = () => {
    if (!currentUser) {
      return (
        <>
          <Hint>Sign in to create a newsletter for this league.</Hint>
          <PrimaryButton onClick={() => navigate("/login")}>Sign in</PrimaryButton>
        </>
      );
    }
    if (membership?.reason === "no-sleeper-link" && getPlatform(leagueId) === "sleeper") {
      return (
        <>
          <Hint>Link your Sleeper account to create a newsletter for this league.</Hint>
          <PrimaryButton onClick={() => navigate("/profile")}>Go to profile</PrimaryButton>
        </>
      );
    }
    if (membership?.reason === "not-in-league") {
      return <Hint>Only members of this league can create a newsletter for it.</Hint>;
    }
    if (membership?.reason === "fetch-failed") {
      return <Hint>Couldn't verify league membership right now — try again later.</Hint>;
    }
    if (platformLeagueError) {
      return <Hint>Couldn't load this league from its platform — try again later.</Hint>;
    }
    if (!membership) {
      return <Hint>Checking league membership…</Hint>;
    }
    if (!membership.isMember) return null; // unreachable — all reasons handled above

    return (
      <>
        <Hint>
          {newsletters && newsletters.length > 0
            ? "Most leagues only need one newsletter — check the list above before creating another."
            : "Be the first to create a newsletter for this league. You'll be its editor."}
        </Hint>
        <NameInput
          type="text"
          placeholder={platformLeague ? `${platformLeague.name} Newsletter` : "Newsletter name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={80}
        />
        <PrimaryButton onClick={handleCreate} disabled={creating || !platformLeague}>
          {creating ? "Creating…" : "Create newsletter"}
        </PrimaryButton>
        {createError && <ErrorText>{createError}</ErrorText>}
      </>
    );
  };

  return (
    <Container>
      <Title>Newsletters</Title>
      <Subtitle>{platformLeague ? platformLeague.name : "…"}</Subtitle>

      {isLoading && <Hint>Loading newsletters…</Hint>}
      {!isLoading && (!newsletters || newsletters.length === 0) && (
        <Hint>No newsletters exist for this league yet.</Hint>
      )}
      <List>
        {/* Every league gets the auto-generated experience, newsletter or not */}
        <NewsletterItem>
          <NewsletterInfo>
            <NewsletterName>Example newsletter</NewsletterName>
            <NewsletterMeta>auto-generated stats & recaps · no editor content</NewsletterMeta>
            {platformLeague &&
              !(
                (platformLeague.settings?.last_scored_leg ?? 0) > 0 ||
                (platformLeague.settings?.last_report ?? 0) > 0
              ) && (
                <NewsletterMeta>
                  Season hasn't started — content will populate once Week 1 completes
                </NewsletterMeta>
              )}
          </NewsletterInfo>
          <PrimaryButton
            onClick={() => {
              setSelectedLeague(leagueId);
              navigate(`/home/${leagueId}`);
            }}
          >
            View
          </PrimaryButton>
        </NewsletterItem>
      </List>
      {newsletters && newsletters.length > 0 && (
        <List>
          {newsletters.map((nl) => (
            <NewsletterItem key={nl.id}>
              <NewsletterInfo>
                <NewsletterName>{nl.name}</NewsletterName>
                <NewsletterMeta>
                  {seasonRange(nl)} · {nl.seasons.length}{" "}
                  {nl.seasons.length === 1 ? "season" : "seasons"} · ed.{" "}
                  {nl.editorName || "unknown"}
                </NewsletterMeta>
              </NewsletterInfo>
              {currentUser && nl.editorUid !== currentUser.uid && (
                <SubscribeButton
                  onClick={() => toggleSubscription(nl.id)}
                  disabled={togglingId === nl.id}
                >
                  {profile?.subscribedNewsletterIds?.includes(nl.id) ? "Unsubscribe" : "Subscribe"}
                </SubscribeButton>
              )}
              <PrimaryButton
                onClick={() => {
                  setSelectedNewsletter(nl.id, nl.activeLeagueId);
                  navigate(`/n/${nl.id}`);
                }}
              >
                View
              </PrimaryButton>
            </NewsletterItem>
          ))}
        </List>
      )}

      <SecondarySection>{renderCreateSection()}</SecondarySection>
    </Container>
  );
}

export default LeagueNewsletters;
