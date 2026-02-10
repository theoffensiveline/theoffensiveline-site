# Story 7.4: Performance Optimization

**Status**: ⏳ Pending

**Phase**: 7 - Performance & Polish

## Description

Eliminate unnecessary renders and heavy computations so the recap page remains snappy even on slower devices. Focus on batching API requests, memoizing expensive transformations, and trimming bundle size.

## Files to Create/Modify

- [ ] `src/utils/newsletter/*` (UPDATE – add memoization / shared caches)
- [ ] `src/hooks/useNewsletterData.ts` (UPDATE – batch network calls)
- [ ] `src/pages/LeagueWeeklyRecap.tsx` (UPDATE – React performance tweaks)

## Acceptance Criteria

- [ ] Consolidate redundant API calls by fetching weekly matchup data once per week and sharing across utilities.
- [ ] Memoize transformation outputs per `(leagueId, week)` with LRU cache to avoid recomputation when navigating back.
- [ ] Split code-split heavy visualization components (MatchupPlot, EfficiencyChart) with dynamic imports.
- [ ] Ensure initial page load (uncached) completes within 3s on Fast 3G (Lighthouse). Document results.
- [ ] Reduce hydration work by using `React.memo` on static section shells, minimizing prop churn.
- [ ] Add perf logging toggle (`NEWSLETTER_PERF=1`) that measures utility runtimes and logs warning if >200ms.

## Implementation Notes

1. Evaluate using `Promise.allSettled` within `useNewsletterData` to overlap network requests.
2. Build `getWeekData()` helper returning `{matchups, rosters, users}` shared by compute utilities.
3. Ensure caches clear on league/week change to prevent stale data leaks.
4. Consider using Web Workers for CPU-heavy computations (power rankings) if time permits.

## Human Testing Steps

1. Run Lighthouse Performance audit (mobile) – verify TTI < 3.5s, CLS < 0.02, total blocking time < 200ms.
2. Open React Profiler while toggling weeks – ensure repeated renders drop significantly.
3. Review Network tab to confirm limited duplicate requests.

## Expected Results

- Newsletter feels immediate even when switching weeks repeatedly.
- CPU-heavy sections no longer block main thread.
- Bundle size reduced and network chatter minimized.
