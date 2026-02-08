# Story 6.1: Newsletter Data Hook

**Status**: ⏳ Pending

**Phase**: 6 - UI Integration

## Description

Create a custom React hook to orchestrate fetching all newsletter data with React Query, handling loading states and errors.

## Dependencies

- ✅ All Phase 2-5 utilities must be complete

## Files to Create/Modify

- [ ] `src/hooks/useNewsletterData.ts` (NEW)

## Acceptance Criteria

- [ ] `useNewsletterData(leagueId, week)` hook created
- [ ] Fetches all data in parallel
- [ ] Returns loading/error states for each section
- [ ] Uses React Query for caching
- [ ] Handles errors gracefully

## Human Testing Steps

1. Loading states work smoothly
2. Data fetches efficiently
3. Errors display clearly

## Expected Results

- Clean data fetching abstraction
- Good UX with loading states
