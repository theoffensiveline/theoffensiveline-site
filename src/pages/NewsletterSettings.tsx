/**
 * NewsletterSettings — editor-only management page at /n/:newsletterId/settings.
 *
 * Holds the editor affordances that used to live on the newsletter home
 * (which is now reader-first): adding seasons (chain suggestion + manual
 * cross-platform entry) and the feature palette toggles.
 */
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { verifyLeagueMembership } from "../utils/leagueClaim";
import { getNewsletter, setNewsletterFeature, updateNewsletter } from "../services/firestoreCrud";
import { getLeague, getPlatform } from "../utils/api/FantasyAPI";
import { getNflState, getSleeperUserByUsername, getUserLeagues } from "../utils/api/SleeperAPI";
import { useNewsletterDoc } from "../hooks/useNewsletterDoc";
import { TOGGLEABLE_FEATURES } from "../components/constants/NewsletterConstants";
import type { LeagueFeature, NewsletterSeason } from "../types/firestore";
import {
  PageColumn,
  PageTitle,
  SectionLabel,
  ActionButton,
} from "../components/newsletter/pageStyles";

const SubtleButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }: any) => theme.newsBlue}66;
  color: ${({ theme }: any) => theme.newsBlue};
  border-radius: 20px;
  padding: 7px 14px;
  font-size: 13px;
  cursor: pointer;
  margin-bottom: 12px;

  &:hover {
    border-color: ${({ theme }: any) => theme.newsBlue};
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

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 440px;
`;

const FeatureCard = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  text-align: left;
  background-color: ${({ theme }: any) => theme.background};
  border: 1px solid ${({ theme }: any) => theme.neutral3}44;
  border-radius: 10px;
  padding: 12px 14px;
  margin: 4px 0;
  cursor: pointer;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: ${({ theme }: any) => theme.neutral3};
  }

  input[type="checkbox"] {
    accent-color: ${({ theme }: any) => theme.newsBlue};
    margin-top: 3px;
    flex-shrink: 0;
  }
`;

const FeatureText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const FeatureName = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }: any) => theme.text};
`;

const FeatureDescription = styled.span`
  font-size: 12px;
  color: ${({ theme }: any) => theme.text};
  opacity: 0.65;
  line-height: 1.4;
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

function NewsletterSettings(): React.ReactElement {
  const { newsletterId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { currentUser, profile } = useAuth();
  const [manualId, setManualId] = useState("");
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const [togglingFeature, setTogglingFeature] = useState<LeagueFeature | null>(null);
  const [featureError, setFeatureError] = useState<string | null>(null);

  const { data: newsletter, isLoading } = useNewsletterDoc(newsletterId);

  const isEditor =
    !!currentUser &&
    !!newsletter &&
    (newsletter.editorUid === currentUser.uid || newsletter.coEditorUids.includes(currentUser.uid));

  // Toggle a palette feature via atomic arrayUnion/arrayRemove — only the
  // named flag is touched, so concurrent toggles and console-set dogfood
  // flags can never be clobbered by a stale cache (#110 review).
  const toggleFeature = async (feature: LeagueFeature) => {
    if (!newsletter || !newsletterId || togglingFeature) return;
    setTogglingFeature(feature);
    setFeatureError(null);
    try {
      const enabled = !(newsletter.features ?? []).includes(feature);
      await setNewsletterFeature(newsletterId, feature, enabled);
      // NavBar shares the ["newsletter", id] query key, so this refreshes its nav too
      await queryClient.invalidateQueries({ queryKey: ["newsletter", newsletterId] });
    } catch (e) {
      console.error("Error toggling feature:", e);
      setFeatureError("Couldn't update that feature — try again.");
    } finally {
      setTogglingFeature(null);
    }
  };

  // One-click season suggestions, both directions (ESPN/Yahoo adapters have
  // no season chain, so only Sleeper seasons participate):
  //  - Backward: follow previous_league_id from the earliest Sleeper season.
  //  - Forward: Sleeper has NO next-season pointer, so the newest season's
  //    successor is found by fetching the editor's own leagues for the next
  //    year and matching previous_league_id back to our newest season.
  const seasonYears = newsletter?.seasons.map((s) => s.season).join(",");
  const { data: suggestions } = useQuery<ChainSuggestion[]>({
    queryKey: ["seasonSuggestions", newsletterId, seasonYears, profile?.sleeperUserId ?? ""],
    enabled: isEditor && !!newsletter,
    staleTime: 60 * 60 * 1000,
    queryFn: async () => {
      const out: ChainSuggestion[] = [];
      const sleeperSeasons = [...newsletter!.seasons]
        .filter((s) => getPlatform(s.leagueId) === "sleeper")
        .sort((a, b) => a.season - b.season);
      if (sleeperSeasons.length === 0) return out;

      const earliest = sleeperSeasons[0];
      const league = await getLeague(earliest.leagueId);
      const prevId = league.previous_league_id;
      if (prevId && prevId !== "0" && !newsletter!.leagueIds.includes(prevId)) {
        const prev = await getLeague(prevId);
        out.push({ leagueId: prevId, season: parseInt(prev.season, 10), name: prev.name });
      }

      try {
        const newest = sleeperSeasons[sleeperSeasons.length - 1];
        let sleeperUid = profile?.sleeperUserId;
        if (!sleeperUid) {
          // Sleeper-login flow caches the username even for unlinked accounts
          const username = localStorage.getItem("sleeperUsername");
          if (username) sleeperUid = (await getSleeperUserByUsername(username))?.user_id;
        }
        if (sleeperUid) {
          // Walk every year up to the current season, matching against the
          // whole discovered chain — this survives a league that skipped a
          // Sleeper season (2026's previous points at 2024) AND a newsletter
          // that skipped a year (2025 and 2026 both get offered).
          const currentSeason = parseInt((await getNflState()).season, 10);
          const chainIds = new Set(newsletter!.leagueIds);
          for (
            let year = newest.season + 1;
            year <= Math.min(currentSeason, newest.season + 6);
            year++
          ) {
            const yearLeagues = await getUserLeagues(sleeperUid, year);
            const match = yearLeagues.find(
              (l) => l.previous_league_id && chainIds.has(l.previous_league_id)
            );
            if (match && !newsletter!.leagueIds.includes(match.league_id)) {
              out.push({ leagueId: match.league_id, season: year, name: match.name });
              chainIds.add(match.league_id);
            }
          }
        }
      } catch (e) {
        // Forward lookup is best-effort — the manual input still works.
        console.error("Error looking up next season:", e);
      }
      return out.sort((a, b) => b.season - a.season);
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

  const handleAddSuggestion = async (suggestion: ChainSuggestion) => {
    if (adding) return;
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

  if (isLoading) return <PageColumn>Loading…</PageColumn>;
  if (!newsletter) return <PageColumn>Newsletter not found.</PageColumn>;
  if (!isEditor) {
    return (
      <PageColumn>
        Only this newsletter's editors can access settings.
        <div style={{ marginTop: 12 }}>
          <SubtleButton onClick={() => navigate(`/n/${newsletterId}`)}>
            Back to newsletter
          </SubtleButton>
        </div>
      </PageColumn>
    );
  }

  return (
    <PageColumn>
      <PageTitle>{newsletter.name}</PageTitle>
      <SubtleButton onClick={() => navigate(`/n/${newsletterId}`)}>
        ← Back to newsletter
      </SubtleButton>

      <SectionLabel>Add a Season</SectionLabel>
      {(suggestions ?? []).map((suggestion) => (
        <ActionButton
          key={suggestion.leagueId}
          onClick={() => handleAddSuggestion(suggestion)}
          disabled={adding}
        >
          {adding
            ? "Adding…"
            : `Add ${suggestion.season} — ${
                suggestion.name.length > 28 ? `${suggestion.name.slice(0, 28)}…` : suggestion.name
              }`}
        </ActionButton>
      ))}
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

      <SectionLabel>Features</SectionLabel>
      <FeatureList>
        {TOGGLEABLE_FEATURES.map(({ feature, label, description }) => (
          <FeatureCard key={feature}>
            <input
              type="checkbox"
              checked={(newsletter.features ?? []).includes(feature)}
              onChange={() => toggleFeature(feature)}
              disabled={togglingFeature !== null}
            />
            <FeatureText>
              <FeatureName>{label}</FeatureName>
              <FeatureDescription>{description}</FeatureDescription>
            </FeatureText>
          </FeatureCard>
        ))}
      </FeatureList>
      <Hint>Enabled features appear in this newsletter's navigation.</Hint>
      {featureError && <ErrorText>{featureError}</ErrorText>}
    </PageColumn>
  );
}

export default NewsletterSettings;
