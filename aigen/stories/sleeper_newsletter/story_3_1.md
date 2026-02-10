# Story 3.1: Best Ball Leaderboard

**Status**: ✅ Completed

**Phase**: 3 - Advanced Analytics

## Description

Calculate a "best ball" leaderboard showing what each team's record would be if they had played optimal lineups every week.

## Dependencies

- ✅ Story 2.3: Efficiency calculation (reuse optimal lineup logic)

## Files to Create/Modify

- [ ] `src/utils/newsletter/computeBestBall.ts` (NEW)
- [ ] `src/pages/LeagueWeeklyRecap.tsx` (UPDATE - add best ball section)

## Acceptance Criteria

- [ ] `computeBestBall(leagueId: string, throughWeek: number): Promise<BestBallData[]>` function
- [ ] Calculates optimal lineup for each team for each week
- [ ] Determines best ball W/L record (optimal score vs opponent's actual score)
- [ ] Compares best ball record to actual record
- [ ] Shows total optimal points vs actual points
- [ ] UI displays best ball leaderboard

## Human Testing Steps

1. Navigate to weekly recap
2. "Alternate Universe" or "Best Ball" section should appear
3. Table shows teams with best ball records
4. Compare to actual standings - some teams should have better best ball records

## Expected Results

- Best ball leaderboard table displays
- Shows what teams' records would be with perfect lineup management
- Highlights teams that underperformed due to lineup decisions

## Testing Performed by Claude

- [ ] Implement best ball W/L calculation
- [ ] Test with multi-week data
- [ ] Verify best ball records make sense

## Related Stories

- **Previous**: Story 2.4
- **Next**: Story 3.2

## Notes

- Best ball is hypothetical - shows potential if lineups were perfect
- Useful for identifying teams hurt by bad lineup decisions
