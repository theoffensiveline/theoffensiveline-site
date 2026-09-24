/**
 * NewsletterSubmit (#submit) — let any authenticated user append a short blurb
 * to a league's weekly newsletter issue.
 *
 * Flow: the league comes from the URL (`/newsletter-submit/:leagueId`, set by
 * the NavBar feature link). The page resolves the newsletter to attach to —
 * the currently-selected newsletter if it covers this league, otherwise the
 * first newsletter found for the league. The user picks a week (defaulting to
 * the current NFL week) and enters a title + text. The submission is written
 * to `/newsletters/{id}/issues/{season}_w{NN}/submissions/` and renders at the
 * bottom of that issue in the reader. A bare image URL in the text field is
 * rendered as an <img> by the reader; a bare tweet URL renders as an embedded
 * tweet.
 *
 * The legacy Submit.jsx / /submit/:leagueId route still exists but is no
 * longer linked — the `submit` feature flag always points here.
 */
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import { useNewsletterDoc } from "../hooks/useNewsletterDoc";
import {
  getNewslettersForLeague,
  getIssuesForLeague,
  addSubmission,
  getSubmissions,
  updateSubmission,
  deleteSubmission,
  issueDocId,
} from "../services/firestoreCrud";
import { getNflState } from "../utils/api/FantasyAPI";
import { getSelectedNewsletterId } from "../utils/selectedNewsletter";
import { isImageUrl, isBareUrl, getTweetId } from "../utils/submissionUtils";
import { TweetEmbed } from "../components/newsletter/TweetEmbed";
import type { NewsletterDoc } from "../types/firestore";
import { IssuePage, Centered } from "../components/newsletter/pageStyles";

const MAX_WEEK = 18;

const FormCard = styled(Box)`
  background: ${({ theme }) => theme.background};
  border: 2px solid ${({ theme }) => theme.newsBlue};
  color: ${({ theme }) => theme.text};
  max-width: 480px;
  margin: 24px auto;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  h2 {
    color: ${({ theme }) => theme.text};
    margin: 0 0 4px;
  }

  .subtitle {
    color: ${({ theme }) => theme.text}99;
    font-size: 0.85rem;
    margin-bottom: 16px;
  }

  .MuiInputLabel-root {
    color: ${({ theme }) => theme.text}99;
  }

  .MuiOutlinedInput-root {
    color: ${({ theme }) => theme.text};

    .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.text}33;
    }

    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.text}66;
    }

    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.newsBlue};
    }
  }

  .MuiSelect-icon {
    color: ${({ theme }) => theme.text}99;
  }

  .MuiMenuItem-root {
    color: ${({ theme }) => theme.text};

    &:hover {
      background-color: ${({ theme }) => theme.newsBlue}22;
    }
  }

  .MuiCheckbox-root {
    color: ${({ theme }) => theme.text}99;

    &.Mui-checked {
      color: ${({ theme }) => theme.newsBlue};
    }
  }

  .MuiFormControlLabel-label {
    color: ${({ theme }) => theme.text}cc;
    font-size: 0.9rem;
  }
`;

const SubmitButton = styled.button`
  border: 1px solid ${({ theme }) => theme.newsBlue};
  border-radius: 8px;
  background: ${({ theme }) => theme.newsBlue};
  height: 3rem;
  width: 100%;
  color: ${({ theme }) => theme.background};
  margin-top: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.newsBlue}dd;
  }

  &:disabled {
    background: ${({ theme }) => theme.text}33;
    border-color: ${({ theme }) => theme.text}33;
    cursor: not-allowed;
  }
`;

const StatusMessage = styled.p<{ $error?: boolean }>`
  margin-top: 12px;
  font-size: 0.9rem;
  color: ${({ $error, theme }) => ($error ? "#ff4444" : `${theme.newsBlue}`)};
`;

const PriorSection = styled.div`
  margin-top: 24px;
  border-top: 1px solid ${({ theme }) => theme.text}33;
  padding-top: 16px;

  h3 {
    font-size: 15px;
    color: ${({ theme }) => theme.text};
    margin: 0 0 8px;
  }
`;

const PriorCard = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.text}22;

  &:last-child {
    border-bottom: none;
  }
`;

const PriorTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;

const PriorText = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.text}cc;
  white-space: pre-wrap;
  word-break: break-word;
  margin-top: 4px;
`;

const PriorImage = styled.img`
  max-width: 100%;
  width: 100%;
  margin-top: 4px;
`;

const PriorActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

const SmallButton = styled.button`
  border: 1px solid ${({ theme }) => theme.newsBlue}66;
  border-radius: 6px;
  background: none;
  color: ${({ theme }) => theme.newsBlue};
  padding: 4px 10px;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.newsBlue};
  }

  &.danger {
    border-color: #ff444466;
    color: #ff4444;

    &:hover {
      border-color: #ff4444;
    }
  }
`;

const EditRow = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

type ResolvedNewsletter = { id: string } & NewsletterDoc;

export default function NewsletterSubmit(): React.ReactElement {
  const { leagueId } = useParams<{ leagueId: string }>();
  const { currentUser, profile } = useAuth();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [week, setWeek] = useState<number>(1);
  const [weekTouched, setWeekTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ message: string; error: boolean } | null>(null);

  // Resolve the newsletter to attach to: the selected newsletter if it covers
  // this league, otherwise the first newsletter found for the league.
  const selectedNid = getSelectedNewsletterId();
  const selectedQuery = useNewsletterDoc(selectedNid ?? undefined);
  const selectedCoversLeague =
    !!selectedQuery.data && !!leagueId && selectedQuery.data.leagueIds.includes(leagueId);

  const fallbackQuery = useQuery({
    queryKey: ["newslettersForLeague", leagueId],
    queryFn: () => getNewslettersForLeague(leagueId!),
    enabled: !!leagueId && (!selectedNid || (selectedQuery.isFetched && !selectedCoversLeague)),
  });

  const newsletter: ResolvedNewsletter | null = useMemo(() => {
    if (selectedCoversLeague && selectedNid && selectedQuery.data) {
      return { id: selectedNid, ...selectedQuery.data };
    }
    const fb = fallbackQuery.data?.[0];
    return fb ?? null;
  }, [selectedCoversLeague, selectedNid, selectedQuery.data, fallbackQuery.data]);

  // Season for this league within the newsletter.
  const season = useMemo(() => {
    if (!newsletter || !leagueId) return undefined;
    return (
      newsletter.seasons.find((s) => s.leagueId === leagueId)?.season ??
      newsletter.seasons.find((s) => s.leagueId === newsletter.activeLeagueId)?.season
    );
  }, [newsletter, leagueId]);

  // Default the week selector to the current NFL week — or the earliest week
  // without a published issue when it's within 1 of the current week (i.e.
  // the next newsletter is still being written, or the editor is one week
  // behind). If the newsletter is further behind, stick with the current
  // week rather than defaulting to a stale one.
  const stateQuery = useQuery({
    queryKey: ["nflState", leagueId],
    queryFn: () => getNflState(leagueId),
    enabled: !!leagueId,
  });

  const issuesQuery = useQuery({
    queryKey: ["issuesForLeague", newsletter?.id, leagueId],
    queryFn: () => getIssuesForLeague(newsletter!.id, leagueId!),
    enabled: !!newsletter && !!leagueId,
  });

  useEffect(() => {
    if (weekTouched || !stateQuery.data?.week) return;
    const current = Math.min(stateQuery.data.week, MAX_WEEK);
    const publishedWeeks = new Set(
      (issuesQuery.data ?? [])
        .filter((i) => i.status === "published" && i.week !== null && i.season === season)
        .map((i) => i.week as number)
    );
    let earliestMissing = MAX_WEEK;
    for (let w = 1; w <= MAX_WEEK; w++) {
      if (!publishedWeeks.has(w)) {
        earliestMissing = w;
        break;
      }
    }
    setWeek(Math.abs(earliestMissing - current) <= 1 ? earliestMissing : current);
  }, [stateQuery.data, issuesQuery.data, season, weekTouched]);

  const weekOptions = useMemo(() => Array.from({ length: MAX_WEEK }, (_, i) => i + 1), []);

  // Fetch this issue's submissions so we can show the user what they've
  // already submitted for the selected week (avoids accidental duplicates).
  const issueIdForQuery = newsletter && season !== undefined ? issueDocId(season, week) : null;
  const { data: mySubmissions, refetch: refetchSubmissions } = useQuery({
    queryKey: ["submissions", newsletter?.id, issueIdForQuery],
    queryFn: () => getSubmissions(newsletter!.id, issueIdForQuery!),
    enabled: !!newsletter && !!issueIdForQuery,
  });
  const mine = useMemo(
    () => (mySubmissions ?? []).filter((s) => s.authorUid === currentUser?.uid),
    [mySubmissions, currentUser?.uid]
  );

  // Inline edit state for prior submissions.
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editText, setEditText] = useState("");
  const [editLoading, setEditLoading] = useState(false);

  const startEdit = (s: { id: string; title: string; text: string }) => {
    setEditingId(s.id);
    setEditTitle(s.title);
    setEditText(s.text);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditText("");
  };

  // Bare links that aren't a direct image or tweet render as plain text —
  // warn before saving so users don't paste an image's page link (e.g.
  // imgflip.com/i/xyz) expecting it to embed.
  const confirmPlainTextLink = (value: string): boolean => {
    const trimmed = value.trim();
    if (!isBareUrl(trimmed) || isImageUrl(trimmed) || getTweetId(trimmed)) return true;
    return window.confirm(
      "This link won't embed — it'll show as plain text in the newsletter. If you meant to share an image, use a direct image URL ending in .png, .jpg, .gif, etc. A link to the image's page won't render.\n\nSubmit anyway?"
    );
  };

  const handleSaveEdit = async (submissionId: string) => {
    if (!newsletter || !issueIdForQuery || editText.trim() === "") return;
    if (!confirmPlainTextLink(editText)) return;
    setEditLoading(true);
    try {
      await updateSubmission(newsletter.id, issueIdForQuery, submissionId, {
        title: editTitle.trim(),
        text: editText.trim(),
      });
      cancelEdit();
      refetchSubmissions();
    } catch (err) {
      console.error("Failed to update submission:", err);
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async (submissionId: string) => {
    if (!newsletter || !issueIdForQuery) return;
    if (!window.confirm("Delete this submission? This can't be undone.")) return;
    try {
      await deleteSubmission(newsletter.id, issueIdForQuery, submissionId);
      refetchSubmissions();
    } catch (err) {
      console.error("Failed to delete submission:", err);
    }
  };

  const canSubmit =
    !!currentUser && !!newsletter && season !== undefined && text.trim() !== "" && !loading;

  const handleSubmit = async () => {
    if (!canSubmit || !newsletter || season === undefined || !currentUser || !leagueId) return;
    if (!confirmPlainTextLink(text)) return;
    setLoading(true);
    setStatus(null);

    const authorName = anonymous
      ? "Anonymous"
      : profile?.customDisplayName || currentUser.displayName || "Anonymous";

    try {
      await addSubmission(newsletter.id, issueDocId(season, week), {
        title: title.trim(),
        text: text.trim(),
        authorUid: currentUser.uid,
        authorName,
        season,
        week,
        leagueId,
      });
      setStatus({
        message: "Submitted! It'll appear at the bottom of that week's newsletter.",
        error: false,
      });
      setTitle("");
      setText("");
      refetchSubmissions();
    } catch (err) {
      console.error("Failed to submit:", err);
      setStatus({ message: "Something went wrong. Please try again.", error: true });
    } finally {
      setLoading(false);
    }
  };

  if (!leagueId) return <Centered>No league selected.</Centered>;
  if (selectedQuery.isLoading || fallbackQuery.isLoading) return <Centered>Loading…</Centered>;
  if (!newsletter)
    return (
      <Centered>
        No newsletter found for this league yet. A newsletter needs to exist before you can submit.
      </Centered>
    );
  if (season === undefined)
    return <Centered>This league isn't part of the newsletter's seasons.</Centered>;

  return (
    <IssuePage>
      <FormCard>
        <h2>Submit to {newsletter.name}</h2>
        <p className="subtitle">
          Your submission will appear at the bottom of that week's newsletter.
        </p>

        <FormControl fullWidth margin="normal">
          <InputLabel id="submit-week-label">Week</InputLabel>
          <Select<number>
            labelId="submit-week-label"
            label="Week"
            value={week}
            onChange={(e) => {
              setWeek(Number(e.target.value));
              setWeekTouched(true);
            }}
          >
            {weekOptions.map((w) => (
              <MenuItem key={w} value={w}>
                Week {w}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          label="Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Brief headline"
        />

        <TextField
          fullWidth
          margin="normal"
          label="Text"
          multiline
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Say something — or paste an image or tweet URL to embed it"
        />

        <FormControlLabel
          control={
            <Checkbox checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} />
          }
          label="Post anonymously"
        />

        <SubmitButton onClick={handleSubmit} disabled={!canSubmit}>
          {loading ? "Submitting…" : "Submit"}
        </SubmitButton>

        {status && <StatusMessage $error={status.error}>{status.message}</StatusMessage>}

        {mine.length > 0 && (
          <PriorSection>
            <h3>Your submissions for Week {week}</h3>
            {mine.map((s) => {
              const tweetId = getTweetId(s.text);
              return (
                <PriorCard key={s.id}>
                  {editingId === s.id ? (
                    <EditRow>
                      <TextField
                        fullWidth
                        size="small"
                        label="Title"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                      />
                      <TextField
                        fullWidth
                        size="small"
                        label="Text"
                        multiline
                        rows={3}
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                      <PriorActions>
                        <SmallButton
                          onClick={() => handleSaveEdit(s.id)}
                          disabled={editLoading || editText.trim() === ""}
                        >
                          {editLoading ? "Saving…" : "Save"}
                        </SmallButton>
                        <SmallButton onClick={cancelEdit} disabled={editLoading}>
                          Cancel
                        </SmallButton>
                      </PriorActions>
                    </EditRow>
                  ) : (
                    <>
                      <PriorTitle>{s.title || "(untitled)"}</PriorTitle>
                      {isImageUrl(s.text) ? (
                        <PriorImage src={s.text.trim()} alt={s.title || "submission"} />
                      ) : tweetId ? (
                        <TweetEmbed tweetId={tweetId} url={s.text.trim()} />
                      ) : (
                        <PriorText>{s.text}</PriorText>
                      )}
                      <PriorActions>
                        <SmallButton onClick={() => startEdit(s)}>Edit</SmallButton>
                        <SmallButton className="danger" onClick={() => handleDelete(s.id)}>
                          Delete
                        </SmallButton>
                      </PriorActions>
                    </>
                  )}
                </PriorCard>
              );
            })}
          </PriorSection>
        )}
      </FormCard>
    </IssuePage>
  );
}
