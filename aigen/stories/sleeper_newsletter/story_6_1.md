# Story 6.1: Newsletter Data Hook

**Status**: ✅ Completed

**Phase**: 6 - UI Integration

## Description

Create a composable React hook that orchestrates every newsletter data request via `@tanstack/react-query`. The hook should hide the complexity of fetching 10+ utilities, normalize responses, expose per-section status, and provide helper selectors for the UI layer (LeagueWeeklyRecap + future mobile views).

## Dependencies

- ✅ Phases 2–5 utilities available (`computeLeaderboard`, `computeStarters`, `computeEfficiency`, `computePlayoffStandings`, etc.)
- ✅ React Query already configured at app root

## Files to Create/Modify

- [ ] `src/hooks/useNewsletterData.ts` (NEW – hook + helpers)
- [ ] `src/hooks/__tests__/useNewsletterData.test.tsx` (NEW – hook unit tests)
- [ ] `src/pages/LeagueWeeklyRecap.tsx` (UPDATE – consume hook)

## Acceptance Criteria

- [ ] Export `useNewsletterData(leagueId: string, week: number)` hook.
- [ ] Internally kicks off React Query `useQueries` batch (or derived custom hook) for all sections:
  - Awards, Efficiency, Starters, Leaderboard, Median, BestBall, PowerRankings, PlayoffTable, Schedule comparisons
- [ ] Returns structured object per section:
  ```ts
  {
    data: SectionData | undefined;
    status: 'idle' | 'loading' | 'success' | 'error';
    error?: Error;
    refetch(): Promise<void>;
  }
  ```
- [ ] Includes aggregate helpers: `isLoadingAny`, `hasErrors`, `readySections` count.
- [ ] Applies sensible caching defaults (staleTime, gcTime) but defers fine-tuning to Story 7.1.
- [ ] Automatically pauses playoff-specific queries before `week >= playoff_week_start - 2`.
- [ ] Throws descriptive error when `leagueId` or `week` missing.
- [ ] Fully typed using `newsletterTypes` exports.
- [ ] Unit tests cover success + partial failure scenarios using MSW or jest mocks.

## Implementation Notes

1. Use `useQueries` with `select` functions to shape each payload for UI (e.g., flatten scoreboard arrays).
2. Derive stable query keys: `['newsletter', leagueId, week, 'leaderboard']`, etc.
3. Share a memoized map of section configs to avoid duplicate logic.
4. Provide fallback empty arrays until data resolves to prevent undefined checks everywhere.
5. Error normalization: wrap thrown errors so UI can show friendlier copy.

## Human Testing Steps

1. Run `yarn test useNewsletterData` → unit tests should pass.
2. Start dev server, navigate to `/league/1253779168802377728/weekly-recap/8`.
3. Confirm network tab shows parallel requests and console logs contain no warnings.
4. Simulate network error (toggle offline in DevTools) → verify hook surfaces per-section error state.

## Expected Results

- UI layer consumes a single hook instead of wiring 10 separate queries.
- Loading/error logic becomes centralized and predictable.
- Hook is reusable for future newsletter skins.

## Related Stories

- **Previous**: Story 5.1 (Playoff Standings & Scenarios)
- **Next**: Story 6.2 (full UI integration relies on this hook)
