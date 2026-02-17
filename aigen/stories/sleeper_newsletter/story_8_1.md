# Story 8.1: Unit Tests for Utilities

**Status**: ✅ Completed

**Phase**: 8 - Testing & Documentation

## Description

Backstop every data transformation with Jest tests that mock Sleeper API responses. Focus on deterministic outputs for leaderboard, efficiency, playoff tables, etc., so refactors don’t silently change newsletter copy.

## Files to Create/Modify

- [ ] `src/utils/newsletter/__tests__/computeLeaderboard.test.ts`
- [ ] `src/utils/newsletter/__tests__/computeEfficiency.test.ts`
- [ ] `src/utils/newsletter/__tests__/computePlayoffStandings.test.ts`
- [ ] `src/utils/newsletter/__tests__/computeMatchupData.test.ts`
- [ ] `src/utils/newsletter/__tests__/fixtures/` (NEW – mocked Sleeper payloads)

## Acceptance Criteria

- [ ] Each newsletter utility has a dedicated test file covering happy path + critical edge cases (ties, missing players, bye weeks).
- [ ] Tests isolate external calls via `jest.mock('../SleeperAPI')` and fixture data.
- [ ] Coverage report (`yarn test --coverage`) shows ≥80% statements for `src/utils/newsletter`.
- [ ] Add snapshot/inline assertions for narrative strings to catch tone regressions.
- [ ] CI command documented in README (or package script) for running utility tests only.

## Implementation Notes

1. Build shared fixture builder to generate consistent league/matchup payloads.
2. Use fake timers to control `Date` for playoff week logic.
3. Validate thrown errors (e.g., missing leagueId) with `await expect(...).rejects.toThrow(...)`.
4. Consider property-based tests for color gradients to ensure interpolation boundaries.

## Human Testing Steps

1. Run `yarn test utils-newsletter` (new script) – all suites pass locally.
2. Inspect coverage output to confirm thresholds met.
3. Introduce intentional regression (e.g., change tiebreak order) – ensure tests fail.

## Expected Results

- Utility layer gains strong regression protection.
- Future refactors are safe thanks to high coverage and fixtures.
