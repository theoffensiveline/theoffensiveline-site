/**
 * NewsletterHome — reader-first publication page at /n/:newsletterId (#103).
 *
 * Shows the newsletter's name, its issues, and its league-seasons linking
 * into the existing league pages. Editor management (adding seasons, feature
 * toggles) lives on NewsletterSettings at /n/:newsletterId/settings — the
 * home page only offers editors the builder and settings entry points.
 */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { getAllIssues } from "../services/firestoreCrud";
import { useNewsletterDoc } from "../hooks/useNewsletterDoc";
import { setSelectedNewsletter } from "../utils/selectedNewsletter";

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

/** Issues nested under their season row, indented to read as children. */
const IssueList = styled.div`
  margin-left: 28px;
`;

function NewsletterHome(): React.ReactElement {
  const { newsletterId } = useParams();
  const navigate = useNavigate();
  const { currentUser, profile, updateProfile } = useAuth();
  const [subscribing, setSubscribing] = useState(false);
  // Issues stay hidden until a season is clicked open — the league pages
  // already list week content, so showing issues by default doubled it up.
  const [expandedSeason, setExpandedSeason] = useState<number | null>(null);

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

  const { data: issues } = useQuery({
    queryKey: ["issues", newsletterId],
    queryFn: () => getAllIssues(newsletterId!),
    enabled: !!newsletterId,
  });

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

  if (isLoading) return <Container>Loading…</Container>;
  if (!newsletter) return <Container>Newsletter not found.</Container>;

  const seasonsDesc = [...newsletter.seasons].sort((a, b) => b.season - a.season);
  const visibleIssues = (issues ?? [])
    .filter((i) => i.status === "published" || isEditor)
    .sort((a, b) => (a.id < b.id ? 1 : -1));
  const issuesBySeason = new Map<number, typeof visibleIssues>();
  for (const issue of visibleIssues) {
    issuesBySeason.set(issue.season, [...(issuesBySeason.get(issue.season) ?? []), issue]);
  }

  return (
    <Container>
      <Title>{newsletter.name}</Title>
      {isEditor && <EditorBadge>🖋️ You're the editor</EditorBadge>}
      {isEditor && (
        <ButtonRow>
          <ActionButton onClick={() => navigate(`/n/${newsletterId}/builder`)}>
            Open builder
          </ActionButton>
          <SubtleButton onClick={() => navigate(`/n/${newsletterId}/settings`)}>
            Settings
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
          <React.Fragment key={s.season}>
            <SeasonItem
              onClick={() => setExpandedSeason(expandedSeason === s.season ? null : s.season)}
              role="button"
              aria-expanded={expandedSeason === s.season}
              style={{ cursor: "pointer" }}
            >
              <SeasonYear>
                {expandedSeason === s.season ? "▾ " : "▸ "}
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
                  {(issuesBySeason.get(s.season) ?? []).length > 0
                    ? ` · ${(issuesBySeason.get(s.season) ?? []).length} issue${
                        (issuesBySeason.get(s.season) ?? []).length === 1 ? "" : "s"
                      }`
                    : ""}
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
            {expandedSeason === s.season && (
              <IssueList>
                {(issuesBySeason.get(s.season) ?? []).map((issue) => (
                  <SeasonItem
                    key={issue.id}
                    onClick={() => navigate(`/n/${newsletterId}/issue/${issue.id}`)}
                    role="button"
                    style={{ cursor: "pointer" }}
                  >
                    <SeasonYear>Week {issue.week}</SeasonYear>
                    {issue.status !== "published" && <SeasonMeta>draft</SeasonMeta>}
                  </SeasonItem>
                ))}
                {(issuesBySeason.get(s.season) ?? []).length === 0 && (
                  <SeasonMeta>No issues yet</SeasonMeta>
                )}
              </IssueList>
            )}
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
}

export default NewsletterHome;
