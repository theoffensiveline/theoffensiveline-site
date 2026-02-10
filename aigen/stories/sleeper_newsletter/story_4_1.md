# Story 4.1: Power Rankings Algorithm

**Status**: ✅ Completed

**Phase**: 4 - Power Rankings & Analytics

## Description

Implement power rankings algorithm that fetches multiple weeks of data and ranks teams based on recent performance, strength of schedule, and trends.

## Dependencies

- ✅ Stories 1.1, 1.2, 2.1: Type definitions and leaderboard logic

## Files to Create/Modify

- [ ] `src/utils/newsletter/computePowerRankings.ts` (NEW)
- [ ] `src/pages/LeagueWeeklyRecap.tsx` (UPDATE)

## Acceptance Criteria

- [ ] Fetches matchup data for weeks 1 through throughWeek
- [ ] Implements weighted play-all algorithm:
  - [ ] Ranks teams by points for each week (1 = highest)
  - [ ] Converts rank to play-all wins/losses (wins = N - rank, losses = rank - 1)
  - [ ] Applies recency weights: current week 2.0, then 1.8, 1.6, 1.4, 1.2, else 1.0
  - [ ] Sums weighted play-all wins for each team
  - [ ] Calculates strength of schedule (mean of N - opponent's weekly rank)
  - [ ] Ranks teams by descending weighted wins, tiebreak by SOS
- [ ] Calculates trend by recomputing rankings without current week (trend = last rank - current rank)
- [ ] Works with any number of weeks (week 1 = no trend data, that's fine)
- [ ] Shows movement arrows from previous week

## Human Testing Steps

1. Navigate to weekly recap
2. "Power Rankings" section appears
3. Teams ranked by power score (not just W/L)
4. Arrows show movement up/down from previous week

## Expected Results

- Power rankings display
- Rankings consider recent performance more than early season
- Trend indicators show team momentum

## Notes

- Cache multi-week data efficiently with React Query
- Power rankings more nuanced than simple W/L standings

### Detailed Algorithm

The power rankings use a **weighted play-all algorithm**:

1. **For each week, rank teams by points**: 1 (highest) to N (lowest)

2. **Convert rank to play-all wins/losses**:
   - Play-all wins = N - rank
   - Play-all losses = rank - 1
   - Example: 12-team league, rank 1 = 11 wins, 0 losses

3. **Apply recency weights**:
   - Current week (most recent): 2.0
   - Previous week: 1.8
   - 2 weeks ago: 1.6
   - 3 weeks ago: 1.4
   - 4 weeks ago: 1.2
   - All other weeks: 1.0

4. **Calculate weighted play-all wins**: Sum (play-all wins × week weight) for each team

5. **Calculate strength of schedule (SOS)**: Mean of (N - opponent's weekly rank) across all weeks

6. **Rank teams**: By descending weighted wins, tiebreak by descending SOS

7. **Calculate trend**: Recompute rankings excluding current week, trend = last rank - current rank

### Example

12-team league, week 5, Team A's weekly ranks: [3, 1, 4, 2, 1]

**Play-all wins**:

- Week 1 (rank 3): 12-3 = 9 wins, weight 1.0 → 9.0
- Week 2 (rank 1): 12-1 = 11 wins, weight 1.2 → 13.2
- Week 3 (rank 4): 12-4 = 8 wins, weight 1.4 → 11.2
- Week 4 (rank 2): 12-2 = 10 wins, weight 1.8 → 18.0
- Week 5 (rank 1): 12-1 = 11 wins, weight 2.0 → 22.0

**Weighted total**: 9.0 + 13.2 + 11.2 + 18.0 + 22.0 = 73.4

This is the power score used for ranking.
