/**
 * NewsletterHome — minimal publication page at /n/:newsletterId (#103 sub-issue A).
 *
 * Shows the newsletter's name, editor status, and its league-seasons linking
 * into the existing league pages. Editors get an add-season affordance:
 * a one-click suggestion from the previous_league_id chain, plus manual
 * league-ID entry for cross-platform history (added unverified).
 *
 * Just enough to make the entity testable end-to-end — the full newsletter
 * home (features, archive, season switcher) is #103 sub-issue B.
 */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { verifyLeagueMembership } from "../utils/leagueClaim";
import { getNewsletter, updateNewsletter } from "../services/firestoreCrud";
import { getLeague, getPlatform } from "../utils/api/FantasyAPI";
import { useNewsletterDoc } from "../hooks/useNewsletterDoc";
import { setSelectedNewsletter } from "../utils/selectedNewsletter";
import type { NewsletterSeason } from "../types/firestore";

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
  font-size: 26px;
  margin-bottom: 4px;
  color: ${({ theme }: any) => theme.text};
`;

const EditorBadge = styled.span`
  font-size: 13px;
  color: ${({ theme }: any) => theme.newsBlue};
  margin-bottom: 24px;
`;

const SectionLabel = styled.h3`
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${({ theme }: any) => theme.text};
  opacity: 0.5;
  margin: 20px 0 12px;
`;

const List = styled.div`
  width: 100%;
  max-width: 440px;
`;

const SeasonItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: ${({ theme }: any) => theme.background};
  border: 1px solid ${({ theme }: any) => theme.neutral3}44;
  border-radius: 10px;
  padding: 14px 16px;
  margin: 8px 0;
  cursor: pointer;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: ${({ theme }: any) => theme.neutral3};
  }
`;

const SeasonYear = styled.span`
  font-size: 15px;
  font-weight: bold;
  color: ${({ theme }: any) => theme.text};
`;

const SeasonMeta = styled.span`
  font-size: 12px;
  color: ${({ theme }: any) => theme.text};
  opacity: 0.6;
`;

const SeasonLink = styled.button`
  background: none;
  border: none;
  color: ${({ theme }: any) => theme.newsBlue};
  font-size: 12px;
  cursor: pointer;
  padding: 2px 6px;
  text-decoration: underline;
`;

const ActionButton = styled.button`
  background-color: ${({ theme }: any) => theme.newsBlue};
  color: ${({ theme }: any) => theme.background};
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

const ManualRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 8px;
`;

const IdInput = styled.input`
  padding: 8px 12px;
  border: 1px solid ${({ theme }: any) => theme.neutral3}66;
  border-radius: 8px;
  background-color: ${({ theme }: any) => theme.background};
  color: ${({ theme }: any) => theme.text};
  font-size: 13px;
  width: 220px;
`;

const Hint = styled.p`
  font-size: 13px;
  color: ${({ theme }: any) => theme.text};
  opacity: 0.6;
  line-height: 1.5;
  margin: 4px 0;
`;

const ErrorText = styled.span`
  color: #bc293d;
  font-size: 13px;
`;

interface ChainSuggestion {
  leagueId: string;
  season: number;
  name: string;
}

function NewsletterHome(): React.ReactElement {
  const { newsletterId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { currentUser, profile, updateProfile } = useAuth();
  const [manualId, setManualId] = useState("");
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const [subscribing, setSubscribing] = useState(false);

  const isSubscribed = !!newsletterId && !!profile?.subscribedNewsletterIds?.includes(newsletterId);

  const toggleSubscription = async () => {
    if (!newsletterId || !currentUser || subscribing) return;
    setSubscribing(true);
    try {
      const current = profile?.subscribedNewsletterIds ?? [];
      const next = isSubscribed
        ? current.filter((id) => id !== newsletterId)
        : [...current, newsletterId];
      await updateProfile({ subscribedNewsletterIds: next });
    } finally {
      setSubscribing(false);
    }
  };

  const { data: newsletter, isLoading } = useNewsletterDoc(newsletterId);

  // Visiting a newsletter selects it (regardless of auth), so shared public
  // links render this newsletter's nav for anonymous readers too (#108).
  useEffect(() => {
    if (newsletterId && newsletter) {
      setSelectedNewsletter(newsletterId, newsletter.activeLeagueId);
    }
  }, [newsletterId, newsletter]);

  const isEditor =
    !!currentUser &&
    !!newsletter &&
    (newsletter.editorUid === currentUser.uid || newsletter.coEditorUids.includes(currentUser.uid));

  // One-click prior-season suggestion: follow previous_league_id from the
  // earliest Sleeper season (ESPN/Yahoo adapters have no season chain, so a
  // cross-platform earliest season would otherwise dead-end the suggestion).
  const seasonYears = newsletter?.seasons.map((s) => s.season).join(",");
  const { data: suggestion } = useQuery<ChainSuggestion | null>({
    queryKey: ["prevSeasonSuggestion", newsletterId, seasonYears],
    enabled: isEditor && !!newsletter,
    staleTime: 60 * 60 * 1000,
    queryFn: async () => {
      const earliestSleeper = [...newsletter!.seasons]
        .filter((s) => getPlatform(s.leagueId) === "sleeper")
        .sort((a, b) => a.season - b.season)[0];
      if (!earliestSleeper) return null;
      const league = await getLeague(earliestSleeper.leagueId);
      const prevId = league.previous_league_id;
      if (!prevId || prevId === "0" || newsletter!.leagueIds.includes(prevId)) return null;
      const prev = await getLeague(prevId);
      return { leagueId: prevId, season: parseInt(prev.season, 10), name: prev.name };
    },
  });

  /**
   * Append a season. Re-fetches the doc first so a stale cache can't drop a
   * concurrently added season. The active pointer only advances when the new
   * season is strictly newer than the current one (season rollover) — adding
   * history never moves it (#103: explicit pointer, never derived).
   */
  const addSeason = async (season: NewsletterSeason): Promise<boolean> => {
    if (!newsletterId) return false;
    try {
      const fresh = await getNewsletter(newsletterId);
      if (!fresh) throw new Error("Newsletter no longer exists.");
      const seasons = [...fresh.seasons, season].sort((a, b) => a.season - b.season);
      const activeYear = fresh.seasons.find((s) => s.leagueId === fresh.activeLeagueId)?.season;
      const activeLeagueId =
        activeYear !== undefined && season.season > activeYear
          ? season.leagueId
          : fresh.activeLeagueId;
      await updateNewsletter(newsletterId, { seasons, activeLeagueId });
      await queryClient.invalidateQueries({ queryKey: ["newsletter", newsletterId] });
      return true;
    } catch (e) {
      setAddError(e instanceof Error ? e.message : "Couldn't add that season.");
      return false;
    }
  };

  const handleAddSuggestion = async () => {
    if (!suggestion || adding) return;
    setAdding(true);
    setAddError(null);
    try {
      // Chain seasons get a membership check; verified when it passes.
      const membership = await verifyLeagueMembership(suggestion.leagueId, profile);
      await addSeason({
        leagueId: suggestion.leagueId,
        season: suggestion.season,
        verified: membership.isMember,
      });
    } finally {
      setAdding(false);
    }
  };

  const handleAddManual = async () => {
    const id = manualId.trim();
    if (!id || adding) return;
    setAddError(null);
    // ESPN/Yahoo reuse one league ID for every season, so re-adding the same
    // ID is usually someone trying to add the new season — explain that
    // instead of a bare duplicate error. Per-season entries for reused IDs
    // are a known follow-up to #103.
    if (newsletter?.leagueIds.includes(id)) {
      setAddError(
        getPlatform(id) === "sleeper"
          ? "That league is already part of this newsletter. On Sleeper, each season has its own league ID — use the new season's ID instead."
          : `That league is already in this newsletter. ${
              getPlatform(id) === "espn" ? "ESPN" : "Yahoo"
            } keeps the same league ID every season, so it can't be added twice — separate entries per season aren't supported yet.`
      );
      return;
    }
    setAdding(true);
    try {
      // Fetchable check only — manual (cross-platform) seasons are unverified.
      const league = await getLeague(id);
      const ok = await addSeason({
        leagueId: id,
        season: parseInt(league.season, 10),
        verified: false,
      });
      if (ok) setManualId("");
    } catch (e) {
      setAddError("Couldn't fetch that league — check the ID (use espn_/yahoo_ prefixes).");
    } finally {
      setAdding(false);
    }
  };

  if (isLoading) return <Container>Loading…</Container>;
  if (!newsletter) return <Container>Newsletter not found.</Container>;

  const seasonsDesc = [...newsletter.seasons].sort((a, b) => b.season - a.season);

  return (
    <Container>
      <Title>{newsletter.name}</Title>
      {isEditor && <EditorBadge>🖋️ You're the editor</EditorBadge>}
      {currentUser && !isEditor && (
        <ActionButton onClick={toggleSubscription} disabled={subscribing}>
          {subscribing ? "…" : isSubscribed ? "Unsubscribe" : "Subscribe"}
        </ActionButton>
      )}

      <SectionLabel>Seasons</SectionLabel>
      <List>
        {seasonsDesc.map((s) => (
          <SeasonItem
            key={s.season}
            onClick={() => navigate(`/home/${s.leagueId}`)}
            role="button"
            style={{ cursor: "pointer" }}
          >
            <SeasonYear>
              {s.season}
              {s.leagueId === newsletter.activeLeagueId ? " · current" : ""}
            </SeasonYear>
            <span>
              <SeasonMeta
                title={
                  s.verified
                    ? "The editor's league membership was confirmed for this season"
                    : "Added without a membership check — display-only"
                }
              >
                {s.verified ? "verified" : "unverified"}
              </SeasonMeta>
              <SeasonLink
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/league/${s.leagueId}/league-overview`);
                }}
              >
                overview
              </SeasonLink>
            </span>
          </SeasonItem>
        ))}
      </List>

      {isEditor && (
        <>
          <SectionLabel>Add a Season</SectionLabel>
          {suggestion && (
            <ActionButton onClick={handleAddSuggestion} disabled={adding}>
              {adding
                ? "Adding…"
                : `Add ${suggestion.season} — ${
                    suggestion.name.length > 28
                      ? `${suggestion.name.slice(0, 28)}…`
                      : suggestion.name
                  }`}
            </ActionButton>
          )}
          <ManualRow>
            <IdInput
              type="text"
              placeholder="League ID (espn_… / yahoo_… / Sleeper)"
              value={manualId}
              onChange={(e) => setManualId(e.target.value)}
            />
            <ActionButton onClick={handleAddManual} disabled={adding || !manualId.trim()}>
              Add
            </ActionButton>
          </ManualRow>
          <Hint>
            Manually added leagues are marked unverified — they show up in the newsletter but don't
            count toward league membership.
          </Hint>
          {addError && <ErrorText>{addError}</ErrorText>}
        </>
      )}
    </Container>
  );
}

export default NewsletterHome;
