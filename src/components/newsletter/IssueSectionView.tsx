/**
 * Renders one issue section (#84) — shared by the builder preview and the
 * published reader. Computed sections go through SectionShell with live
 * data; authored sections render their stored Tiptap JSON. Unknown types
 * render nothing (append-only registry contract).
 */
import React from "react";
import styled from "styled-components";
import { SectionShell } from "./SectionShell";
import { SECTION_REGISTRY } from "./sectionRegistry";
import { RichTextView } from "./RichText";
import { ArticleSubheader } from "../newsletters/newsStyles";
import type { NewsletterData } from "../../hooks/useNewsletterData";
import type { IssueSection } from "../../types/firestore";

const AuthoredBlock = styled.div`
  margin: 24px 0;
  padding: 0 8px;
`;

interface IssueSectionViewProps {
  section: IssueSection;
  data: NewsletterData;
  leagueId: string;
  week: number;
}

export function IssueSectionView({
  section,
  data,
  leagueId,
  week,
}: IssueSectionViewProps): React.ReactElement | null {
  if (section.type === "editor-text") {
    return (
      <AuthoredBlock>
        {section.title && <ArticleSubheader>{section.title}</ArticleSubheader>}
        <RichTextView content={section.body} />
      </AuthoredBlock>
    );
  }

  const entry = SECTION_REGISTRY[section.type];
  if (!entry) return null; // unknown type — degrade silently
  if (entry.shouldRender && !entry.shouldRender(data)) return null;

  const result = entry.result(data);
  return (
    <SectionShell
      id={section.id}
      sectionKey={section.type}
      leagueId={leagueId}
      week={week}
      title={entry.title(data)}
      subtitle={entry.subtitle?.(data)}
      status={result.status}
      error={result.error}
      onRetry={() => result.refetch()}
      skeleton={entry.skeleton}
    >
      {entry.render(data)}
    </SectionShell>
  );
}
