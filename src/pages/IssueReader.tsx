/**
 * IssueReader (#84) — public render of a published issue at
 * /n/:newsletterId/issue/:issueId. Computed sections render live via the
 * section registry; authored sections render their stored content.
 *
 * Drafts are hidden from non-editors client-side ("not published yet") —
 * true read-gating arrives with #103 sub-issue D.
 */
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { useNewsletterDoc } from "../hooks/useNewsletterDoc";
import { useNewsletterData } from "../hooks/useNewsletterData";
import { getIssue } from "../services/firestoreCrud";
import { IssueSectionView } from "../components/newsletter/IssueSectionView";
import {
  ArticleSubheader,
  NewsletterContainer,
  NewsletterTitle,
} from "../components/newsletters/newsStyles";

const Page = styled.div`
  max-width: 640px;
  margin: 0 auto;
  padding: 8px;
`;

const Centered = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: ${({ theme }: any) => theme.text};
`;

const EditLink = styled.button`
  background: none;
  border: 1px solid ${({ theme }: any) => theme.newsBlue}66;
  color: ${({ theme }: any) => theme.newsBlue};
  border-radius: 20px;
  padding: 6px 14px;
  font-size: 13px;
  cursor: pointer;
  margin-bottom: 8px;
`;

/** Parse "2025_w03" → { season: 2025, week: 3 }. */
function parseIssueId(issueId: string): { season: number; week: number } | null {
  const m = issueId.match(/^(\d{4})_w(\d{2})$/);
  if (!m) return null;
  return { season: parseInt(m[1], 10), week: parseInt(m[2], 10) };
}

function IssueReader(): React.ReactElement {
  const { newsletterId, issueId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const parsed = issueId ? parseIssueId(issueId) : null;

  const { data: newsletter, isLoading: newsletterLoading } = useNewsletterDoc(newsletterId);

  const { data: issue, isFetched } = useQuery({
    queryKey: ["issue", newsletterId, issueId],
    queryFn: () => getIssue(newsletterId!, parsed!.season, parsed!.week),
    enabled: !!newsletterId && !!parsed,
  });

  const isEditor =
    !!currentUser &&
    !!newsletter &&
    (newsletter.editorUid === currentUser.uid || newsletter.coEditorUids.includes(currentUser.uid));

  // Hooks must run unconditionally; week NaN disables the queries
  const newsletterData = useNewsletterData(issue?.leagueId, issue?.week ?? NaN);

  if (!parsed) return <Centered>Invalid issue ID.</Centered>;
  if (newsletterLoading || !isFetched) return <Centered>Loading…</Centered>;
  if (!newsletter) return <Centered>Newsletter not found.</Centered>;
  if (!issue) return <Centered>This issue doesn't exist yet.</Centered>;
  if (issue.status !== "published" && !isEditor) {
    return <Centered>This issue hasn't been published yet — check back soon.</Centered>;
  }

  // The builder edits only the active season, so older seasons' issues
  // can't offer an editor-mode hand-off.
  const activeSeason = newsletter.seasons.find(
    (s) => s.leagueId === newsletter.activeLeagueId
  )?.season;
  const canOpenInBuilder = isEditor && issue.season === activeSeason;

  return (
    <Page>
      <NewsletterContainer>
        <NewsletterTitle>{newsletter.name}</NewsletterTitle>
        <ArticleSubheader>
          {issue.season} · Week {issue.week}
          {issue.status !== "published" ? " · DRAFT" : ""}
        </ArticleSubheader>
        {canOpenInBuilder && (
          <EditLink onClick={() => navigate(`/n/${newsletterId}/builder?week=${issue.week}`)}>
            Editor mode
          </EditLink>
        )}

        {issue.sections.map((section) => (
          <IssueSectionView
            key={section.id}
            section={section}
            data={newsletterData}
            leagueId={issue.leagueId}
            week={issue.week}
          />
        ))}
      </NewsletterContainer>
    </Page>
  );
}

export default IssueReader;
