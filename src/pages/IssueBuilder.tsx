/**
 * IssueBuilder (#84) — editor-facing composer at /n/:newsletterId/builder.
 *
 * Edits the newsletter's ACTIVE season. Two issue kinds: weekly issues
 * (picked by completed week; prefill the standard computed section set) and
 * ad-hoc "special" issues (week-less, "{season}_x{millis}" doc IDs,
 * commentary-only, positioned among the weeklies via sortWeek). Every issue
 * has an optional title. Drafts autosave (debounced, transactional
 * create-or-merge that never touches status); Publish/Revert are the only
 * status writers; drafts are deletable (two-click).
 *
 * Co-editing is last-write-wins (Firestore default) — acceptable per #84.
 */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Timestamp } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { useNewsletterDoc } from "../hooks/useNewsletterDoc";
import { useNewsletterData } from "../hooks/useNewsletterData";
import { useCompletedWeeks } from "../hooks/useCompletedWeeks";
import {
  getIssue,
  setIssue,
  saveIssueDraft,
  getAllIssues,
  issueDocId,
  adhocIssueId,
  deleteIssue,
} from "../services/firestoreCrud";
import { SECTION_REGISTRY, DEFAULT_SECTION_ORDER } from "../components/newsletter/sectionRegistry";
import { IssueSectionView } from "../components/newsletter/IssueSectionView";
import { RichTextEditor } from "../components/newsletter/RichText";
import { NewsletterContainer, NewsletterTitle } from "../components/newsletters/newsStyles";
import type { IssueDoc, IssueSection } from "../types/firestore";
import { IssuePage, Centered } from "../components/newsletter/pageStyles";

/* ------------------------------------------------------------------ */
/*  Styled                                                             */
/* ------------------------------------------------------------------ */

const ControlsBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin: 12px 0 4px;
`;

const SelectControl = styled.select`
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

/** Failure notices must not blend in with the muted "Saved" text. */
const ErrorNote = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: #bc293d;
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

const RestoreRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 12px;
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
  const [searchParams] = useSearchParams();
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

  const { data: allIssues, isError: issuesError } = useQuery({
    queryKey: ["issues", newsletterId],
    queryFn: () => getAllIssues(newsletterId!),
    enabled: !!newsletterId,
  });

  // Ad-hoc (week-less) issue selection: takes precedence over the weekly
  // selection for docId. Seeded from ?issue= (reader's "Editor mode" hand-off
  // for special issues).
  const requestedIssue = searchParams.get("issue");
  const [adhocId, setAdhocId] = useState<string | null>(() =>
    requestedIssue && /^\d{4}_x\d+$/.test(requestedIssue) ? requestedIssue : null
  );
  // The builder edits the ACTIVE season only — saves stamp `season` on the
  // doc, so a crafted ?issue= from an older season would get its season
  // overwritten. Drop the selection once the newsletter doc reveals it.
  useEffect(() => {
    if (adhocId && season !== undefined && !adhocId.startsWith(`${season}_`)) {
      setAdhocId(null);
    }
  }, [adhocId, season]);

  // Default week: an explicit ?week= (reader's "Editor mode" hand-off) wins;
  // otherwise the latest completed week without a published issue. If the
  // issues list fails to load, fall back to the latest week rather than
  // stranding the builder on skeletons forever.
  const requestedWeek = searchParams.has("week") ? Number(searchParams.get("week")) : null;
  const [week, setWeek] = useState<number | null>(null);
  useEffect(() => {
    if (week !== null || weeksLoading || season === undefined) return;
    if (completedWeeksDesc.length === 0) return;
    if (requestedWeek !== null && completedWeeksDesc.includes(requestedWeek)) {
      setWeek(requestedWeek);
      return;
    }
    if (!allIssues && !issuesError) return;
    const published = new Set(
      (allIssues ?? []).filter((i) => i.status === "published").map((i) => i.id)
    );
    const candidate =
      completedWeeksDesc.find((w) => !published.has(issueDocId(season, w))) ??
      completedWeeksDesc[0];
    setWeek(candidate);
  }, [week, weeksLoading, completedWeeksDesc, allIssues, issuesError, season, requestedWeek]);

  // Load (or prefill) the selected issue
  const docId =
    adhocId ?? (season !== undefined && week !== null ? issueDocId(season, week) : null);
  const {
    data: loadedIssue,
    isFetched: issueFetched,
    isError: issueLoadError,
  } = useQuery({
    queryKey: ["issue", newsletterId, docId],
    queryFn: () => getIssue(newsletterId!, docId!),
    enabled: !!newsletterId && !!docId,
  });

  const [sections, setSections] = useState<IssueSection[] | null>(null);
  const [issueTitle, setIssueTitle] = useState("");
  const [sortWeek, setSortWeek] = useState<number | null>(null);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const dirtyRef = useRef(false);
  // Bumped on every edit; a save only clears dirty if nothing changed since
  // its snapshot, so keystrokes made while a save is in flight are never
  // dropped (#84 swarm review).
  const editSeqRef = useRef(0);
  const markDirty = () => {
    dirtyRef.current = true;
    editSeqRef.current += 1;
  };
  // Title as of the last completed save — the issues-list query only needs
  // invalidating when a title (selector label) actually changed.
  const lastSavedTitleRef = useRef("");
  const [deleteError, setDeleteError] = useState(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Live mirrors read inside timers/cleanups so callbacks never act on
  // stale closures (#84 review: publish-resurrection class).
  const liveRef = useRef<{
    docId: string | null;
    season: number | undefined;
    week: number | null;
    leagueId: string | undefined;
    sections: IssueSection[] | null;
    title: string;
    sortWeek: number | null;
    status: "draft" | "published";
    docExists: boolean;
  }>({
    docId: null,
    season: undefined,
    week: null,
    leagueId: undefined,
    sections: null,
    title: "",
    sortWeek: null,
    status: "draft",
    docExists: false,
  });
  liveRef.current = {
    ...liveRef.current,
    docId,
    season,
    week: adhocId ? null : week,
    leagueId: activeLeagueId,
    sections,
    title: issueTitle,
    sortWeek,
    status,
  };

  /**
   * Save ONLY the sections (merge write — never status/publishedAt), tagged
   * with the doc it belongs to so a save that resolves after a week switch
   * can't corrupt the new week's UI state.
   */
  const saveSections = useCallback(
    async (
      target: { docId: string; season: number; week: number | null; leagueId: string },
      toSave: IssueSection[],
      title: string,
      sortWeek: number | null
    ): Promise<boolean> => {
      const isCurrent = () => liveRef.current.docId === target.docId;
      // Edits made after this point must survive the save completing.
      const seqAtSnapshot = editSeqRef.current;
      if (isCurrent()) setSaveState("saving");
      try {
        const outcome = await saveIssueDraft(newsletterId!, target.docId, {
          season: target.season,
          week: target.week,
          leagueId: target.leagueId,
          title,
          sortWeek,
          sections: toSave,
        });
        const titleChanged = title !== lastSavedTitleRef.current;
        lastSavedTitleRef.current = title;
        if (isCurrent()) {
          liveRef.current.docExists = true;
          // Only clear dirty if nothing changed since the snapshot — a
          // keystroke during the in-flight write stays dirty for the next
          // timer/flush instead of being silently dropped.
          if (editSeqRef.current === seqAtSnapshot) {
            dirtyRef.current = false;
            setSaveState("saved");
          }
        }
        // Keep the shared single-issue cache truthful for the reader/home
        queryClient.setQueryData(
          ["issue", newsletterId, target.docId],
          (old: IssueDoc | null | undefined): IssueDoc => ({
            status: old?.status ?? "draft",
            publishedAt: old?.publishedAt ?? null,
            season: target.season,
            week: target.week,
            leagueId: target.leagueId,
            title,
            sortWeek,
            sections: toSave,
          })
        );
        // The issues list only feeds selector markers/labels — re-read it
        // only when a doc appeared or a title (label) changed, not on every
        // debounced content save (#84 swarm review).
        if (outcome === "created" || titleChanged) {
          queryClient.invalidateQueries({ queryKey: ["issues", newsletterId] });
        }
        return true;
      } catch (e) {
        console.error("Error saving issue:", e);
        if (isCurrent()) setSaveState("error");
        return false;
      }
    },
    [newsletterId, queryClient]
  );

  // Week switch / unmount: the CLEANUP closure holds the outgoing week's
  // identity (the ref alone would already point at the new week), so dirty
  // edits are flushed to the doc they belong to. The effect body then blanks
  // the editing surface until the new week's doc loads — edits made during
  // the loading window could otherwise be saved into the wrong week's doc.
  const prevDocIdRef = useRef<string | null>(null);
  useEffect(() => {
    if (prevDocIdRef.current !== null && prevDocIdRef.current !== docId) {
      dirtyRef.current = false;
      setSections(null);
      setSaveState("idle");
      setConfirmingDelete(false);
      setDeleteError(false);
    }
    prevDocIdRef.current = docId;

    const target =
      docId && season !== undefined && activeLeagueId
        ? { docId, season, week: adhocId ? null : week, leagueId: activeLeagueId }
        : null;
    return () => {
      // Runs when docId changes away from `target`, and on unmount.
      // liveRef.sections/title still hold this issue's values (state resets
      // after), but status/docExists must come from the pre-switch values.
      const live = liveRef.current;
      if (!target || !dirtyRef.current || live.status !== "draft" || !live.sections) return;
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveSections(target, live.sections, live.title, live.sortWeek);
    };
    // season/activeLeagueId are deps so a docId that exists BEFORE the
    // newsletter doc loads (the ?issue= cold-load path) still gets a real
    // flush target once they resolve (#84 swarm review).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docId, season, activeLeagueId]);

  useEffect(() => {
    if (!issueFetched || docId === null) return;
    // A FAILED fetch is not "no doc": prefilling here would let the autosave
    // overwrite a real issue's sections. The render shows a retry-able error
    // state instead (#84 swarm review).
    if (issueLoadError) return;
    // Same-doc refetch (e.g. window refocus) while the editor has unsaved
    // edits: don't clobber their work — our save layer owns the truth.
    if (dirtyRef.current) return;
    // Don't reset the save indicator here: this effect also fires on the
    // cache echo of our own save (setQueryData), which would blank "Saved"
    // the instant it appeared. The docId-switch reset handles new docs.
    if (loadedIssue) {
      setSections(loadedIssue.sections);
      setIssueTitle(loadedIssue.title ?? "");
      setSortWeek(loadedIssue.sortWeek ?? null);
      setStatus(loadedIssue.status);
      lastSavedTitleRef.current = loadedIssue.title ?? "";
      liveRef.current.docExists = true;
    } else {
      // New doc: weekly issues prefill the standard computed set; ad-hoc
      // issues start with a single commentary section (no week, so computed
      // sections have nothing to render from).
      setSections(adhocId ? [newTextSection()] : prefillSections());
      setIssueTitle("");
      setSortWeek(null);
      setStatus("draft");
      lastSavedTitleRef.current = "";
      liveRef.current.docExists = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issueFetched, loadedIssue, docId, issueLoadError]);

  // Debounced autosave of dirty drafts. The timer re-checks live state at
  // fire time, so a publish (or week switch) between keystroke and fire can
  // never be overwritten by a stale draft snapshot.
  useEffect(() => {
    if (!dirtyRef.current || sections === null || status !== "draft") return;
    const scheduledDocId = docId;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      const live = liveRef.current;
      if (
        !dirtyRef.current ||
        live.status !== "draft" ||
        !live.docId ||
        live.docId !== scheduledDocId ||
        live.season === undefined ||
        !live.leagueId ||
        !live.sections
      ) {
        return;
      }
      saveSections(
        { docId: live.docId, season: live.season, week: live.week, leagueId: live.leagueId },
        live.sections,
        live.title,
        live.sortWeek
      );
    }, 1200);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections, issueTitle, sortWeek]);

  const mutate = (updater: (prev: IssueSection[]) => IssueSection[]) => {
    setSections((prev) => {
      if (!prev) return prev;
      const next = updater(prev);
      if (next !== prev) markDirty();
      return next;
    });
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

  /**
   * Explicit status change: the ONLY writer of status/publishedAt. Cancels
   * any pending autosave first, persists the full doc, and flips local
   * state + the shared cache only when the write actually succeeded.
   */
  const setPublishState = async (nextStatus: "draft" | "published") => {
    if (!sections || !docId || season === undefined || !activeLeagueId) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    dirtyRef.current = false;
    const doc: IssueDoc = {
      status: nextStatus,
      publishedAt: nextStatus === "published" ? Timestamp.now() : null,
      season,
      week: adhocId ? null : week,
      leagueId: activeLeagueId,
      title: issueTitle,
      sortWeek,
      sections,
    };
    setSaveState("saving");
    try {
      await setIssue(newsletterId!, docId, doc);
      liveRef.current.docExists = true;
      setStatus(nextStatus);
      setSaveState("saved");
      queryClient.setQueryData(["issue", newsletterId, docId], doc);
      queryClient.invalidateQueries({ queryKey: ["issues", newsletterId] });
    } catch (e) {
      console.error("Error changing publish state:", e);
      // Sections may be unsaved again — let autosave/Retry pick them up
      markDirty();
      setSaveState("error");
    }
  };

  const publish = () => setPublishState("published");
  const unpublish = () => setPublishState("draft");

  /**
   * Delete the current draft (two-click confirm in the UI). Published issues
   * must be reverted to draft first — the button only renders for drafts.
   */
  const deleteDraft = async () => {
    if (!docId || !liveRef.current.docExists || status !== "draft") return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    dirtyRef.current = false;
    try {
      await deleteIssue(newsletterId!, docId);
      setConfirmingDelete(false);
      setDeleteError(false);
      liveRef.current.docExists = false;
      queryClient.removeQueries({ queryKey: ["issue", newsletterId, docId] });
      queryClient.invalidateQueries({ queryKey: ["issues", newsletterId] });
      if (adhocId) {
        // Fall back to the weekly selection; the load effect repopulates.
        setAdhocId(null);
      } else {
        // Stay on the week with a fresh prefill.
        setSections(prefillSections());
        setIssueTitle("");
        setSortWeek(null);
        setSaveState("idle");
      }
    } catch (e) {
      console.error("Error deleting issue:", e);
      // Distinct from a save failure: the generic Retry re-SAVES, which
      // would mislead here. Reset the confirm so the editor can retry the
      // delete itself (#84 swarm review).
      setConfirmingDelete(false);
      setDeleteError(true);
    }
  };

  /** Manual retry after a failed save — re-sends the current content. */
  const retrySave = () => {
    const live = liveRef.current;
    if (!live.docId || live.season === undefined) return;
    if (!live.leagueId || !live.sections) return;
    saveSections(
      { docId: live.docId, season: live.season, week: live.week, leagueId: live.leagueId },
      live.sections,
      live.title,
      live.sortWeek
    );
  };

  // Live data for the computed-section preview (ad-hoc issues have no week,
  // so the queries stay disabled)
  const newsletterData = useNewsletterData(activeLeagueId, adhocId ? NaN : (week ?? NaN));

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
  const editable = status === "draft";
  const issuesById = new Map((allIssues ?? []).map((i) => [i.id, i]));
  // Existing ad-hoc issues for the active season, newest first
  const adhocIssues = (allIssues ?? [])
    .filter((i) => season !== undefined && i.id.startsWith(`${season}_x`))
    .sort((a, b) => (a.id < b.id ? 1 : -1));
  // Computed sections removed from this draft, offered for one-click restore.
  // Ad-hoc issues have no week for computed sections to render from, so the
  // restore affordance is weekly-only.
  const removedComputedTypes =
    sections && !adhocId
      ? DEFAULT_SECTION_ORDER.filter((t) => !sections.some((s) => s.type === t))
      : [];

  return (
    <IssuePage>
      <NewsletterContainer>
        <NewsletterTitle>{newsletter.name}</NewsletterTitle>

        <ControlsBar>
          <SubtleButton onClick={() => navigate(`/n/${newsletterId}`)}>
            ← Back to newsletter
          </SubtleButton>
        </ControlsBar>

        <ControlsBar>
          <SelectControl
            value={adhocId ? `a:${adhocId}` : week !== null ? `w:${week}` : ""}
            onChange={(e) => {
              const v = e.target.value;
              if (v === "new-adhoc") {
                if (season !== undefined) setAdhocId(adhocIssueId(season));
              } else if (v.startsWith("a:")) {
                setAdhocId(v.slice(2));
              } else if (v.startsWith("w:")) {
                setAdhocId(null);
                setWeek(Number(v.slice(2)));
              }
            }}
          >
            {adhocId === null && week === null && <option value="">Select an issue…</option>}
            {/* A just-created special issue isn't in allIssues until first save */}
            {adhocId !== null && !adhocIssues.some((i) => i.id === adhocId) && (
              <option value={`a:${adhocId}`}>New special issue</option>
            )}
            {adhocIssues.map((i) => (
              <option key={i.id} value={`a:${i.id}`}>
                {i.title || "Special issue"}
                {i.status === "published" ? " · published" : " · draft"}
              </option>
            ))}
            {completedWeeksDesc.map((w) => {
              const existing =
                season !== undefined ? issuesById.get(issueDocId(season, w)) : undefined;
              const marker = existing
                ? existing.status === "published"
                  ? " · published"
                  : " · draft"
                : "";
              return (
                <option key={w} value={`w:${w}`}>
                  Week {w}
                  {marker}
                </option>
              );
            })}
            <option value="new-adhoc">+ New special issue</option>
          </SelectControl>

          {editable ? (
            <PublishButton onClick={publish} disabled={!sections || saveState === "saving"}>
              Publish
            </PublishButton>
          ) : (
            <SubtleButton onClick={unpublish}>Revert to draft</SubtleButton>
          )}

          {editable &&
            sections !== null &&
            liveRef.current.docExists &&
            (confirmingDelete ? (
              <>
                <SubtleButton
                  onClick={deleteDraft}
                  style={{ borderColor: "#bc293d", color: "#bc293d" }}
                >
                  Really delete?
                </SubtleButton>
                <SubtleButton onClick={() => setConfirmingDelete(false)}>Cancel</SubtleButton>
              </>
            ) : (
              <SubtleButton onClick={() => setConfirmingDelete(true)}>Delete draft</SubtleButton>
            ))}

          <SaveState>
            {saveState === "saving" && "Saving…"}
            {saveState === "saved" && "Saved"}
          </SaveState>
          {saveState === "error" && <ErrorNote>Save failed</ErrorNote>}
          {saveState === "error" && <SubtleButton onClick={retrySave}>Retry</SubtleButton>}
          {deleteError && <ErrorNote>Delete failed — try again.</ErrorNote>}
        </ControlsBar>

        {!editable && (
          <PublishedBanner>
            This issue is published and locked. Revert to draft to edit.
          </PublishedBanner>
        )}
        {editable && newsletter.coEditorUids.length > 0 && (
          <SaveState>Heads up: co-editors editing at the same time is last-write-wins.</SaveState>
        )}

        {docId !== null && sections !== null && (
          <TitleInput
            type="text"
            placeholder={
              adhocId ? "Issue title (optional — e.g. Offseason Address)" : "Issue title (optional)"
            }
            value={issueTitle}
            disabled={!editable}
            onChange={(e) => {
              markDirty();
              setIssueTitle(e.target.value);
            }}
          />
        )}

        {docId !== null && sections !== null && adhocId && (
          <ControlsBar>
            <SaveState>Position in issue list:</SaveState>
            <SelectControl
              value={sortWeek === null ? "" : String(sortWeek)}
              disabled={!editable}
              onChange={(e) => {
                markDirty();
                setSortWeek(e.target.value === "" ? null : Number(e.target.value));
              }}
            >
              <option value="">Top of season</option>
              {completedWeeksDesc.map((w) => (
                <option key={w} value={w}>
                  After Week {w}
                </option>
              ))}
              <option value={0}>Before Week 1</option>
            </SelectControl>
          </ControlsBar>
        )}

        {docId === null ? (
          <Centered>
            {weeksLoading || completedWeeksDesc.length > 0
              ? "Loading…"
              : "No completed weeks yet — pick “+ New special issue” to write a preseason edition."}
          </Centered>
        ) : issueLoadError && sections === null ? (
          <Centered>
            Couldn't load this issue — check your connection.
            <div style={{ marginTop: 12 }}>
              <SubtleButton
                onClick={() =>
                  queryClient.invalidateQueries({ queryKey: ["issue", newsletterId, docId] })
                }
              >
                Retry
              </SubtleButton>
            </div>
          </Centered>
        ) : sections === null ? (
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
                      <IconButton
                        onClick={() => move(index, -1)}
                        disabled={index === 0}
                        aria-label="Move section up"
                        title="Move section up"
                      >
                        ↑
                      </IconButton>
                      <IconButton
                        onClick={() => move(index, 1)}
                        disabled={index === sections.length - 1}
                        aria-label="Move section down"
                        title="Move section down"
                      >
                        ↓
                      </IconButton>
                      <IconButton
                        onClick={() => addTextAfter(index)}
                        aria-label="Insert commentary section below"
                        title="Insert commentary section below"
                      >
                        + text
                      </IconButton>
                      <IconButton
                        onClick={() => remove(index)}
                        aria-label="Remove section"
                        title="Remove section"
                      >
                        ✕
                      </IconButton>
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
              <>
                <SubtleButton onClick={() => addTextAfter(null)}>
                  + Add commentary section
                </SubtleButton>
                {removedComputedTypes.length > 0 && (
                  <RestoreRow>
                    <SaveState>Restore removed section:</SaveState>
                    {removedComputedTypes.map((type) => (
                      <IconButton
                        key={type}
                        onClick={() =>
                          mutate((prev) => [...prev, { id: crypto.randomUUID(), type }])
                        }
                        aria-label={`Restore ${SECTION_REGISTRY[type].label} section`}
                      >
                        + {SECTION_REGISTRY[type].label}
                      </IconButton>
                    ))}
                  </RestoreRow>
                )}
              </>
            )}
          </>
        )}
      </NewsletterContainer>
    </IssuePage>
  );
}

export default IssueBuilder;
