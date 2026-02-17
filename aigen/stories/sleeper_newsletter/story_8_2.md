# Story 8.2: Integration Tests

**Status**: ✅ Completed

**Phase**: 8 - Testing & Documentation

## Description

Exercise the full newsletter flow inside React Testing Library + MSW. Validate that `LeagueWeeklyRecap` renders all sections, handles loading/error states, and responds to week changes without hitting the real Sleeper API.

## Files to Create/Modify

- [x] `src/pages/__tests__/LeagueWeeklyRecap.test.tsx` (NEW – 24 integration tests)
- [x] `src/setupTests.ts` (NEW – explicit jest-dom setup; MSW not needed, mocked at hook boundary)

## Acceptance Criteria

- [x] Render weekly recap page with mocked hook outputs and assert all core sections appear.
- [x] Simulate week change → document title + subtitle update per week param (3 distinct week tests).
- [x] Mock error responses for at least one section; test that error banners + retry button work.
- [x] Confirm skeletons display before data resolves (pending status → skeletons render).
- [x] Anchor nav + SEO title assertions cover per-week behavior.
- [x] Integration suite runs in ~4s (well under 10s CI target).

## Implementation Notes

1. Prefer MSW to intercept `getMatchups` etc. so we’re close to production behavior.
2. Use `await screen.findByText(...)` patterns to wait for specific section headings.
3. Add helper to render component with router context (since page uses route params).
4. Include test verifying keyboard navigation through anchor nav works when sections present.

## Human Testing Steps

1. `yarn test LeagueWeeklyRecap` → ensure passing locally.
2. Temporarily break a section (e.g., throw error in computePlayoff) to confirm integration test fails.
3. Review coverage to verify `src/pages/LeagueWeeklyRecap.tsx` crosses 80% lines.

## Expected Results

- Regression coverage for entire page prevents accidental UI breakages.
- Developers can refactor with confidence knowing MSW-backed tests cover cross-module wiring.
