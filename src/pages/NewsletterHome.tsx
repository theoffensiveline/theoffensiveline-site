/**
 * NewsletterHome — pure seasons index at /n/:newsletterId (#103/#84).
 *
 * Shows the newsletter's name and its league-seasons; clicking a season
 * opens that year's league home, where the issues (and the builder entry,
 * for editors on the active season) live. Editor management (adding
 * seasons, feature toggles) is on NewsletterSettings at
 * /n/:newsletterId/settings — this page offers editors only that link.
 */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import { useNewsletterDoc } from "../hooks/useNewsletterDoc";
import { setSelectedNewsletter } from "../utils/selectedNewsletter";
import {
  PageColumn,
  PageTitle,
  SectionLabel,
  ActionButton,
} from "../components/newsletter/pageStyles";

const EditorBadge = styled.span`
  font-size: 13px;
  color: ${({ theme }: any) => theme.newsBlue};
  margin-bottom: 24px;
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

const SubtleButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }: any) => theme.newsBlue}66;
  color: ${({ theme }: any) => theme.newsBlue};
  border-radius: 20px;
  padding: 7px 14px;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }: any) => theme.newsBlue};
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

function NewsletterHome(): React.ReactElement {
  const { newsletterId } = useParams();
  const navigate = useNavigate();
  const { currentUser, profile, updateProfile } = useAuth();
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

  if (isLoading) return <PageColumn>Loading…</PageColumn>;
  if (!newsletter) return <PageColumn>Newsletter not found.</PageColumn>;

  const seasonsDesc = [...newsletter.seasons].sort((a, b) => b.season - a.season);

  return (
    <PageColumn>
      <PageTitle>{newsletter.name}</PageTitle>
      {isEditor && <EditorBadge>🖋️ You're the editor</EditorBadge>}
      {/* The builder entry lives on the current season's league home with the
          issues — this page is a pure seasons index. */}
      {isEditor && (
        <ButtonRow>
          <SubtleButton onClick={() => navigate(`/n/${newsletterId}/settings`)}>
            League Settings
          </SubtleButton>
        </ButtonRow>
      )}
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
    </PageColumn>
  );
}

export default NewsletterHome;
