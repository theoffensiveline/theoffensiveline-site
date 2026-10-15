/**
 * MotwSeedPicker — builder-only control for setting a season's MotW seed.
 *
 * The MotW chain is forward-only and needs an editor-chosen starting
 * matchup (NewsletterSeason.motwSeed). This picker lists the seed week's
 * matchups as "Team A vs Team B" and writes the choice back onto the
 * newsletter doc's season entry. Once set, the motw-history section
 * computes the whole chain forward from it.
 */
import React, { useState } from "react";
import styled from "styled-components";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { computeStarters } from "../../utils/newsletter/computeStarters";
import { updateNewsletter } from "../../services/firestoreCrud";
import type { NewsletterSeason } from "../../types/firestore";

const PickerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  padding: 6px 0;
  font-size: 13px;
  color: ${({ theme }: any) => theme.text};
`;

const Select = styled.select`
  padding: 6px 10px;
  border: 1px solid ${({ theme }: any) => theme.neutral3}66;
  border-radius: 8px;
  background-color: ${({ theme }: any) => theme.background};
  color: ${({ theme }: any) => theme.text};
  font-size: 13px;
  max-width: 320px;
`;

const SetButton = styled.button`
  background-color: ${({ theme }: any) => theme.newsBlue};
  color: ${({ theme }: any) => theme.background};
  border: none;
  border-radius: 16px;
  padding: 6px 14px;
  font-size: 13px;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

const ErrorText = styled.span`
  color: #bc293d;
  font-size: 12px;
`;

interface MotwSeedPickerProps {
  newsletterId: string;
  /** Full seasons array — needed for the updateNewsletter write. */
  seasons: NewsletterSeason[];
  /** The season's league (issue.leagueId / activeLeagueId). */
  leagueId: string;
  /** Issue's week — the seed can't start after it. */
  issueWeek: number;
}

export function MotwSeedPicker({
  newsletterId,
  seasons,
  leagueId,
  issueWeek,
}: MotwSeedPickerProps): React.ReactElement {
  const queryClient = useQueryClient();
  const season = seasons.find((s) => s.leagueId === leagueId);
  const seed = season?.motwSeed;

  const [week, setWeek] = useState(seed?.week ?? 1);
  const [matchupId, setMatchupId] = useState<number | null>(seed?.matchupId ?? null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  const { data: starters, isLoading } = useQuery({
    queryKey: ["motwSeedMatchups", leagueId, week],
    queryFn: () => computeStarters(leagueId, week),
    staleTime: 6 * 60 * 60 * 1000,
  });

  /* One option per matchup_id: "Team A vs Team B". */
  const matchupOptions = [...new Set(starters?.map((s) => s.matchup_id) ?? [])]
    .sort((a, b) => a - b)
    .map((id) => {
      const names = (starters ?? []).filter((s) => s.matchup_id === id).map((s) => s.team_name);
      return { id, label: names.length >= 2 ? `${names[0]} vs ${names[1]}` : `Matchup ${id}` };
    });

  const dirty = seed?.week !== week || seed?.matchupId !== matchupId;

  const save = async () => {
    if (matchupId === null || saving) return;
    setSaving(true);
    setError(false);
    try {
      await updateNewsletter(newsletterId, {
        seasons: seasons.map((s) =>
          s.leagueId === leagueId ? { ...s, motwSeed: { week, matchupId } } : s
        ),
      });
      await queryClient.invalidateQueries({ queryKey: ["newsletter", newsletterId] });
    } catch (e) {
      console.error("Error saving MotW seed:", e);
      setError(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <PickerRow>
      <span>{seed ? "MotW chain starts:" : "Pick this season's first MotW:"}</span>
      <Select
        value={week}
        onChange={(e) => {
          setWeek(Number(e.target.value));
          setMatchupId(null);
        }}
      >
        {Array.from({ length: issueWeek }, (_, i) => i + 1).map((w) => (
          <option key={w} value={w}>
            Week {w}
          </option>
        ))}
      </Select>
      <Select
        value={matchupId ?? ""}
        disabled={isLoading}
        onChange={(e) => setMatchupId(Number(e.target.value))}
      >
        <option value="" disabled>
          {isLoading ? "Loading matchups…" : "Select matchup"}
        </option>
        {matchupOptions.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </Select>
      <SetButton onClick={save} disabled={matchupId === null || saving || !dirty}>
        {saving ? "Saving…" : seed ? "Update" : "Set"}
      </SetButton>
      {error && <ErrorText>Save failed — try again.</ErrorText>}
    </PickerRow>
  );
}
