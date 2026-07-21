/**
 * IssueBuilder (#84) — editor-facing composer at /n/:newsletterId/builder.
 *
 * Picks a week of the newsletter's active season, prefills the standard
 * computed section set on first open, and lets the editor add rich-text
 * commentary, remove, and reorder sections. Drafts autosave (debounced);
 * Publish flips status and locks editing until reverted.
 *
 * Co-editing is last-write-wins (Firestore default) — acceptable per #84.
 */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Timestamp } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { useNewsletterDoc } from "../hooks/useNewsletterDoc";
import { useNewsletterData } from "../hooks/useNewsletterData";
import { useCompletedWeeks } from "../hooks/useCompletedWeeks";
import { getIssue, setIssue, getAllIssues, issueDocId } from "../services/firestoreCrud";
import { SECTION_REGISTRY, DEFAULT_SECTION_ORDER } from "../components/newsletter/sectionRegistry";
import { IssueSectionView } from "../components/newsletter/IssueSectionView";
import { RichTextEditor } from "../components/newsletter/RichText";
import { NewsletterContainer, NewsletterTitle } from "../components/newsletters/newsStyles";
import type { IssueDoc, IssueSection } from "../types/firestore";

/* ------------------------------------------------------------------ */
/*  Styled                                                             */
/* ------------------------------------------------------------------ */

const Page = styled.div`
  max-width: 640px;
  margin: 0 auto;
  padding: 8px;
`;

const ControlsBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin: 12px 0 4px;
`;

const WeekSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid ${({ theme }: any) => theme.neutral3}66;
  border-radius: 8px;
  background-color: ${({ theme }: any) => theme.background};
  color: ${({ theme }: any) => theme.text};
  font-size: 14px;
`;

const PublishButton = styled.button`
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

const SaveState = styled.span`
  font-size: 12px;
  color: ${({ theme }: any) => theme.text};
  opacity: 0.6;
`;

const PublishedBanner = styled.div`
  margin: 8px 0;
  padding: 10px 16px;
  border: 1px solid ${({ theme }: any) => theme.newsBlue};
  border-radius: 10px;
  font-size: 14px;
  color: ${({ theme }: any) => theme.text};
  text-align: center;
`;

const SectionFrame = styled.div`
  border: 1px dashed ${({ theme }: any) => theme.neutral3}66;
  border-radius: 10px;
  margin: 10px 0;
  padding: 4px 10px 10px;
`;

const SectionToolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 0;
`;

const SectionChip = styled.span`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${({ theme }: any) => theme.text};
  opacity: 0.55;
  flex-grow: 1;
  text-align: left;
`;

const IconButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }: any) => theme.neutral3}55;
  border-radius: 6px;
  color: ${({ theme }: any) => theme.text};
  font-size: 12px;
  padding: 3px 8px;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }: any) => theme.neutral3};
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;

const TitleInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 6px;
  padding: 8px 12px;
  border: 1px solid ${({ theme }: any) => theme.neutral3}66;
  border-radius: 8px;
  background-color: ${({ theme }: any) => theme.background};
  color: ${({ theme }: any) => theme.text};
  font-size: 14px;
  font-weight: bold;
`;

const Centered = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: ${({ theme }: any) => theme.text};
`;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function prefillSections(): IssueSection[] {
  return DEFAULT_SECTION_ORDER.map((type) => ({ id: crypto.randomUUID(), type }));
}

function newTextSection(): IssueSection {
  return { id: crypto.randomUUID(), type: "editor-text", title: "" };
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

function IssueBuilder(): React.ReactElement {
  const { newsletterId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { currentUser } = useAuth();

  const { data: newsletter, isLoading: newsletterLoading } = useNewsletterDoc(newsletterId);
  const isEditor =
    !!currentUser &&
    !!newsletter &&
    (newsletter.editorUid === currentUser.uid || newsletter.coEditorUids.includes(currentUser.uid));

  const activeLeagueId = newsletter?.activeLeagueId;
  const season = newsletter?.seasons.find((s) => s.leagueId === activeLeagueId)?.season;

  const { completedWeeksDesc, loading: weeksLoading } = useCompletedWeeks(
    activeLeagueId,
    !!activeLeagueId
  );

  const { data: allIssues } = useQuery({
    queryKey: ["issues", newsletterId],
    queryFn: () => getAllIssues(newsletterId!),
    enabled: !!newsletterId,
  });

  // Default week: latest completed week without a published issue
  const [week, setWeek] = useState<number | null>(null);
  useEffect(() => {
    if (week !== null || weeksLoading || !allIssues || season === undefined) return;
    if (completedWeeksDesc.length === 0) return;
    const published = new Set(allIssues.filter((i) => i.status === "published").map((i) => i.id));
    const candidate =
      completedWeeksDesc.find((w) => !published.has(issueDocId(season, w))) ??
      completedWeeksDesc[0];
    setWeek(candidate);
  }, [week, weeksLoading, completedWeeksDesc, allIssues, season]);

  // Load (or prefill) the selected week's issue
  const docId = season !== undefined && week !== null ? issueDocId(season, week) : null;
  const { data: loadedIssue, isFetched: issueFetched } = useQuery({
    queryKey: ["issue", newsletterId, docId],
    queryFn: () => getIssue(newsletterId!, season!, week!),
    enabled: !!newsletterId && !!docId,
  });

  const [sections, setSections] = useState<IssueSection[] | null>(null);
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const dirtyRef = useRef(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!issueFetched || week === null) return;
    dirtyRef.current = false;
    setSaveState("idle");
    if (loadedIssue) {
      setSections(loadedIssue.sections);
      setStatus(loadedIssue.status);
    } else {
      setSections(prefillSections());
      setStatus("draft");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issueFetched, loadedIssue, docId]);

  const buildDoc = useCallback(
    (s: IssueSection[], st: "draft" | "published", publishedAt: Timestamp | null): IssueDoc => ({
      status: st,
      publishedAt,
      season: season!,
      week: week!,
      leagueId: activeLeagueId!,
      sections: s,
    }),
    [season, week, activeLeagueId]
  );

  const persist = useCallback(
    async (doc: IssueDoc) => {
      setSaveState("saving");
      try {
        await setIssue(newsletterId!, doc.season, doc.week, doc);
        dirtyRef.current = false;
        setSaveState("saved");
        queryClient.invalidateQueries({ queryKey: ["issues", newsletterId] });
      } catch (e) {
        console.error("Error saving issue:", e);
        setSaveState("error");
      }
    },
    [newsletterId, queryClient]
  );

  // Debounced autosave of dirty drafts
  useEffect(() => {
    if (!dirtyRef.current || sections === null || status !== "draft") return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      persist(buildDoc(sections, "draft", loadedIssue?.publishedAt ?? null));
    }, 1200);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections]);

  const mutate = (updater: (prev: IssueSection[]) => IssueSection[]) => {
    dirtyRef.current = true;
    setSections((prev) => (prev ? updater(prev) : prev));
  };

  const move = (index: number, dir: -1 | 1) =>
    mutate((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });

  const remove = (index: number) => mutate((prev) => prev.filter((_, i) => i !== index));

  const addTextAfter = (index: number | null) =>
    mutate((prev) => {
      const next = [...prev];
      next.splice(index === null ? next.length : index + 1, 0, newTextSection());
      return next;
    });

  const patchSection = (id: string, patch: Partial<IssueSection>) =>
    mutate((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));

  const publish = async () => {
    if (!sections) return;
    const doc = buildDoc(sections, "published", Timestamp.now());
    await persist(doc);
    setStatus("published");
  };

  const unpublish = async () => {
    if (!sections) return;
    const doc = buildDoc(sections, "draft", null);
    await persist(doc);
    setStatus("draft");
  };

  // Live data for the computed-section preview
  const newsletterData = useNewsletterData(activeLeagueId, week ?? NaN);

  /* ----------------------------- render ----------------------------- */

  if (newsletterLoading) return <Centered>Loading…</Centered>;
  if (!newsletter) return <Centered>Newsletter not found.</Centered>;
  if (!isEditor) {
    return (
      <Centered>
        Only this newsletter's editors can use the builder.
        <div style={{ marginTop: 12 }}>
          <SubtleButton onClick={() => navigate(`/n/${newsletterId}`)}>
            Back to newsletter
          </SubtleButton>
        </div>
      </Centered>
    );
  }
  if (!weeksLoading && completedWeeksDesc.length === 0) {
    return <Centered>No completed weeks yet — the builder opens once Week 1 is scored.</Centered>;
  }

  const editable = status === "draft";
  const issuesById = new Map((allIssues ?? []).map((i) => [i.id, i]));

  return (
    <Page>
      <NewsletterContainer>
        <NewsletterTitle>{newsletter.name}</NewsletterTitle>

        <ControlsBar>
          <WeekSelect
            value={week ?? ""}
            onChange={(e) => setWeek(Number(e.target.value))}
            disabled={week === null}
          >
            {completedWeeksDesc.map((w) => {
              const existing =
                season !== undefined ? issuesById.get(issueDocId(season, w)) : undefined;
              const marker = existing
                ? existing.status === "published"
                  ? " · published"
                  : " · draft"
                : "";
              return (
                <option key={w} value={w}>
                  Week {w}
                  {marker}
                </option>
              );
            })}
          </WeekSelect>

          {editable ? (
            <PublishButton onClick={publish} disabled={!sections || saveState === "saving"}>
              Publish
            </PublishButton>
          ) : (
            <SubtleButton onClick={unpublish}>Revert to draft</SubtleButton>
          )}

          <SaveState>
            {saveState === "saving" && "Saving…"}
            {saveState === "saved" && "Saved"}
            {saveState === "error" && "Save failed — edit again to retry"}
          </SaveState>
        </ControlsBar>

        {!editable && (
          <PublishedBanner>
            This issue is published and locked. Revert to draft to edit.
          </PublishedBanner>
        )}
        {editable && newsletter.coEditorUids.length > 0 && (
          <SaveState>Heads up: co-editors editing at the same time is last-write-wins.</SaveState>
        )}

        {sections === null ? (
          <Centered>Loading issue…</Centered>
        ) : (
          <>
            {sections.map((section, index) => (
              <SectionFrame key={section.id}>
                <SectionToolbar>
                  <SectionChip>
                    {section.type === "editor-text"
                      ? "Commentary"
                      : (SECTION_REGISTRY[section.type]?.label ?? section.type)}
                  </SectionChip>
                  {editable && (
                    <>
                      <IconButton onClick={() => move(index, -1)} disabled={index === 0}>
                        ↑
                      </IconButton>
                      <IconButton
                        onClick={() => move(index, 1)}
                        disabled={index === sections.length - 1}
                      >
                        ↓
                      </IconButton>
                      <IconButton onClick={() => addTextAfter(index)}>+ text</IconButton>
                      <IconButton onClick={() => remove(index)}>✕</IconButton>
                    </>
                  )}
                </SectionToolbar>

                {section.type === "editor-text" ? (
                  <>
                    <TitleInput
                      type="text"
                      placeholder="Section heading (optional)"
                      value={section.title ?? ""}
                      disabled={!editable}
                      onChange={(e) => patchSection(section.id, { title: e.target.value })}
                    />
                    <RichTextEditor
                      content={section.body}
                      disabled={!editable}
                      onChange={(body) => patchSection(section.id, { body })}
                    />
                  </>
                ) : (
                  week !== null &&
                  activeLeagueId && (
                    <IssueSectionView
                      section={section}
                      data={newsletterData}
                      leagueId={activeLeagueId}
                      week={week}
                    />
                  )
                )}
              </SectionFrame>
            ))}

            {editable && (
              <SubtleButton onClick={() => addTextAfter(null)}>
                + Add commentary section
              </SubtleButton>
            )}
          </>
        )}
      </NewsletterContainer>
    </Page>
  );
}

export default IssueBuilder;
