# Story 6.2: Complete UI Integration

**Status**: ✅ Completed

**Phase**: 6 - UI Integration

## Description

Wire the `useNewsletterData` hook into `LeagueWeeklyRecap.tsx`, replacing the placeholder awards-only view with the full suite of newsletter sections (awards, efficiency, matchup plots, standings, advanced analytics). Design should echo the main league newsletter layout but remain responsive for generic Sleeper leagues.

## Dependencies

- ✅ Story 6.1: Newsletter data hook
- ✅ All utilities from Phases 2–5 returning typed data
- ✅ Existing newsletter components (`LeaderboardTable`, `MatchupPlot`, etc.) available for reuse

## Files to Create/Modify

- [ ] `src/pages/LeagueWeeklyRecap.tsx` (MAJOR UPDATE – layout + rendering logic)
- [ ] `src/components/newsletter/SectionShell.tsx` (NEW – shared chrome for cards)
- [ ] `src/components/newsletter/NewsletterLayout.css` or styled component file (NEW – responsive grid)

## Acceptance Criteria

- [ ] Page imports `useNewsletterData` and renders sections based on hook output.
- [ ] Layout uses responsive masonry (2 columns desktop, single column mobile) with consistent gutters.
- [ ] Each section wrapped in `SectionShell` providing title, subtitle, status indicators, and optional actions.
- [ ] Progressive rendering: sections appear as soon as their data resolves without blocking others.
- [ ] Skeleton loaders fill each `SectionShell` while loading (tie into Story 7.2 but provide baseline placeholders).
- [ ] Error states show friendly copy + retry button per section (reuse hook `refetch`).
- [ ] Includes the following sections at minimum: Awards, Manager Skill (Efficiency), Matchup Spotlight, Standings, Power Rankings, Median, Best Ball, Playoff Picture, Schedule Comparisons.
- [ ] Adds anchor nav (sticky sidebar on desktop, dropdown on mobile) for quick jumps.
- [ ] Applies SEO-friendly document title (`Sleeper Weekly Recap – Week {week}`) and meta description.

## Implementation Notes

1. **Layout**: Use CSS grid with `auto-fit, minmax` to maintain cards; ensure matchups/plots can span two columns when space allows.
2. **Data Wiring**: Map hook response into `const sections = [...]` to iterate when rendering, consolidating boilerplate.
3. **Accessibility**: Provide `aria-live="polite"` for section status changes and ensure cards have heading hierarchy (`h2` per section).
4. **Performance**: Lazy-load heavy chart components via `React.lazy` + `Suspense` once section data is ready.
5. **Copywriting**: Mirror main newsletter tone (e.g., "Manager Skill Assessment", "Alternate Universe") for familiarity.

## Human Testing Steps

1. `yarn start` → visit `/league/1253779168802377728/weekly-recap/8`.
2. Confirm all sections render with appropriate headers and content.
3. Resize browser to mobile width (≤768px) → verify single-column stack and sticky nav transforms into dropdown.
4. Simulate slow network: ensure skeletons display and sections populate progressively without layout jumps.
5. Trigger offline mode during fetch → error banners appear with retry.

## Expected Results

- LeagueWeeklyRecap presents a polished, content-rich newsletter matching the main league experience.
- Users can digest data in distinct articles with consistent styling.
- Page remains performant and responsive across devices.

## Related Stories

- **Previous**: Story 6.1 (hook powering this page)
- **Next**: Phase 7 stories polishing loading, caching, and performance
