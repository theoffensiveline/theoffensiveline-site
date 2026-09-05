/**
 * IssueReader (#84) — public render of a published issue at
 * /n/:newsletterId/issue/:issueId. Computed sections render live via the
 * section registry; authored sections render their stored content.
 *
 * Drafts are hidden from non-editors client-side ("not published yet") —
 * true read-gating arrives with #103 sub-issue D.
 */
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { useNewsletterDoc } from "../hooks/useNewsletterDoc";
import { useNewsletterData } from "../hooks/useNewsletterData";
import { getIssue } from "../services/firestoreCrud";
import { setSelectedNewsletter } from "../utils/selectedNewsletter";
import { IssueSectionView } from "../components/newsletter/IssueSectionView";
import { SubmissionsList } from "../components/newsletter/SubmissionsList";
import { IssuePage, Centered } from "../components/newsletter/pageStyles";
import {
  ArticleSubheader,
  NewsletterContainer,
  NewsletterTitle,
} from "../components/newsletters/newsStyles";

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

/** Both client ID forms: weekly "2025_w03" and ad-hoc "2025_x{millis}". */
function isValidIssueId(issueId: string): boolean {
  return /^\d{4}_(w\d{2}|x\d+)$/.test(issueId);
}

function IssueReader(): React.ReactElement {
  const { newsletterId, issueId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const validId = !!issueId && isValidIssueId(issueId);

  const { data: newsletter, isLoading: newsletterLoading } = useNewsletterDoc(newsletterId);

  const { data: issue, isFetched } = useQuery({
    queryKey: ["issue", newsletterId, issueId],
    queryFn: () => getIssue(newsletterId!, issueId!),
    enabled: !!newsletterId && validId,
  });

  // Reading an issue selects its newsletter (same as visiting the newsletter
  // home) — otherwise a shared issue link leaves the NavBar pointed at
  // whatever was selected before, a dead end for first-time visitors (#108).
  useEffect(() => {
    if (newsletterId && newsletter) {
      setSelectedNewsletter(newsletterId, newsletter.activeLeagueId);
    }
  }, [newsletterId, newsletter]);

  const isEditor =
    !!currentUser &&
    !!newsletter &&
    (newsletter.editorUid === currentUser.uid || newsletter.coEditorUids.includes(currentUser.uid));

  // Hooks must run unconditionally; week NaN disables the queries
  const newsletterData = useNewsletterData(issue?.leagueId, issue?.week ?? NaN);

  if (!validId) return <Centered>Invalid issue ID.</Centered>;
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
    <IssuePage>
      <NewsletterContainer>
        <NewsletterTitle>{newsletter.name}</NewsletterTitle>
        <ArticleSubheader>
          {issue.title || (issue.week !== null ? `Week ${issue.week}` : "Special issue")}
          {" · "}
          {issue.season}
          {issue.title && issue.week !== null ? ` · Week ${issue.week}` : ""}
          {issue.status !== "published" ? " · DRAFT" : ""}
        </ArticleSubheader>
        <EditLink onClick={() => navigate(`/home/${issue.leagueId}`)}>
          ← Back to league home
        </EditLink>
        {canOpenInBuilder && (
          <EditLink
            onClick={() =>
              navigate(
                issue.week !== null
                  ? `/n/${newsletterId}/builder?week=${issue.week}`
                  : `/n/${newsletterId}/builder?issue=${issueId}`
              )
            }
          >
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

        {issue.week !== null && <SubmissionsList newsletterId={newsletterId!} issueId={issueId!} />}
      </NewsletterContainer>
    </IssuePage>
  );
}

export default IssueReader;
