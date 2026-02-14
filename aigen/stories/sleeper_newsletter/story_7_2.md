# Story 7.2: Loading States & Skeletons

**Status**: ✅ Completed

**Phase**: 7 - Performance & Polish

## Description

Refine perceived performance by adding polished skeleton states, shimmer animations, and progressive disclosure for each newsletter section. Ensure layouts reserve space to prevent CLS and that sections transition smoothly from loading → ready.

## Files to Create/Modify

- [ ] `src/components/newsletter/SectionShell.tsx` (UPDATE – loading + error slots)
- [ ] `src/components/newsletter/skeletons/*` (NEW – per-section skeleton components)
- [ ] `src/pages/LeagueWeeklyRecap.tsx` (UPDATE – wire skeletons + progressive rendering)
- [ ] `src/styles/newsletterSkeletons.css` (NEW – shared shimmer styles)

## Acceptance Criteria

- [ ] Each section renders a bespoke skeleton approximating final layout (e.g., table rows for standings, cards for awards).
- [ ] Skeletons respect responsive layout and height so content swap doesn’t shift surrounding cards.
- [ ] Progressive rendering: as soon as a section’s data resolves, skeleton fades out and content fades in (CSS transition ≤200ms).
- [ ] Keep skeletons visible for minimum 400ms to avoid flicker on very fast loads.
- [ ] Provide accessible fallback (`aria-busy`, `aria-live`) to announce loading states for screen readers.
- [ ] Hook aggregate helper `readySections` drives a top-level progress indicator (e.g., “5 / 9 sections ready”).
- [ ] Storybook or Chromatic stories covering at least AwardsSkeleton + TableSkeleton.

## Implementation Notes

1. Use CSS `@keyframes shimmer` reused across skeleton blocks.
2. Wrap content inside `SectionShell` with `AnimatePresence` (Framer Motion) or CSS class toggles for fade transitions.
3. Consider `Suspense` boundaries for heavier charts to reuse fallback skeletons.
4. Ensure skeleton components are tree-shakeable; export from `index.ts` for ergonomics.

## Human Testing Steps

1. Simulate slow 3G in DevTools → visit weekly recap and observe skeleton coverage.
2. Confirm no layout jumps when data appears.
3. Use Lighthouse → verify CLS < 0.02.
4. Inspect DOM for `aria-busy` toggling appropriately.

## Expected Results

- Loading experience feels intentional and premium.
- Users can see which sections are still fetching.
- Layout remains stable regardless of network speed.
