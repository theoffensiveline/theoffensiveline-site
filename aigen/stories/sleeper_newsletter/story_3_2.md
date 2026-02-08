# Story 3.2: Median Scoring Leaderboard

**Status**: ⏳ Pending

**Phase**: 3 - Advanced Analytics

## Description

Create a leaderboard showing teams' records against the median score each week (eliminates schedule luck).

## Dependencies

- ✅ Story 1.1, 1.2: Type definitions

## Files to Create/Modify

- [ ] `src/utils/newsletter/computeMedian.ts` (NEW)
- [ ] `src/pages/LeagueWeeklyRecap.tsx` (UPDATE - add median section)

## Acceptance Criteria

- [ ] `computeMedian(leagueId: string, throughWeek: number): Promise<MedianData[]>` function
- [ ] Calculates median score for each week
- [ ] Tracks W/L against median for each team
- [ ] Shows cumulative median record
- [ ] UI displays median leaderboard

## Human Testing Steps

1. Navigate to weekly recap
2. "Median Scoring" section appears
3. Shows teams' records vs median
4. Teams above median each week get a "win", below get a "loss"

## Expected Results

- Median leaderboard displays
- Provides alternative way to rank teams (eliminates schedule luck)

## Testing Performed by Claude

- [ ] Calculate weekly median scores
- [ ] Track wins/losses vs median
- [ ] Add to UI

## Related Stories

- **Previous**: Story 3.1
- **Next**: Story 4.1

## Notes

- Median scoring is a fair way to measure team strength independent of matchups
