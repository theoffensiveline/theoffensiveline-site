# Story 7.1: React Query Caching Strategy

**Status**: ⏳ Pending

**Phase**: 7 - Performance & Polish

## Description

Tune caching and stale-time logic so the newsletter feels instantaneous when flipping between weeks. Completed weeks should benefit from aggressive memoization, while the current week refreshes more frequently in case scores change.

## Files to Create/Modify

- [ ] `src/hooks/useNewsletterData.ts` (UPDATE – inject cache policy)
- [ ] `src/hooks/__tests__/useNewsletterData.test.tsx` (UPDATE – add cache-related tests)

## Acceptance Criteria

- [ ] Query keys follow pattern `['newsletter', leagueId, week, section]` so caches do not leak.
- [ ] Completed weeks (week < current real-world week) use `staleTime = 6 * 60 * 60 * 1000` and `gcTime = 24 * 60 * 60 * 1000`.
- [ ] Current week uses `staleTime = 60 * 1000` with background refetch on window focus.
- [ ] Add manual `prefetchNewsletterSection` helper for hover previews (used by nav anchors later).
- [ ] Unit tests confirm cache durations and key generation.
- [ ] Document cache knobs via inline JSDoc so future phases can tweak easily.

## Implementation Notes

1. Derive `isCurrentWeek` from comparing requested `week` against league `latestScoredWeek` (or fallback to current date).
2. Wrap `useQueries` config creation in `useMemo` to avoid re-registering queries unnecessarily.
3. Ensure `refetchOnMount` is false for cached completed weeks to prevent flash loading states.
4. Provide `invalidateNewsletter(leagueId, week)` helper for admin actions.

## Human Testing Steps

1. Load week 8 recap → immediately switch away and back; should load from cache with no spinner.
2. Change week to current (e.g., 13 during season); confirm data refreshes within ~1 minute automatically.
3. Inspect React Query Devtools to verify separate caches per section.

## Expected Results

- Historic weeks snap into view instantly.
- Current week remains fresh without manual reloads.
- Query cache stays bounded and predictable.
