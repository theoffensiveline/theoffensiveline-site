# Story 2.3: Efficiency Chart Calculation

**Status**: ✅ Completed

**Phase**: 2 - Core Data Transformations

## Description

Create a utility to calculate manager efficiency by comparing actual lineups to optimal lineups, showing how well each manager set their roster.

## Dependencies

- ✅ Story 1.1, 1.2: Type definitions

## Files to Create/Modify

- [ ] `src/utils/newsletter/computeEfficiency.ts` (NEW)
- [ ] `src/pages/LeagueWeeklyRecap.tsx` (UPDATE - add efficiency chart)

## Acceptance Criteria

- [ ] `computeEfficiency(leagueId: string, week: number): Promise<EfficiencyData[]>` function created
- [ ] Calculates optimal lineup for each team (highest scoring valid lineup)
- [ ] Calculates actual score vs optimal score
- [ ] Calculates efficiency percentage
- [ ] Returns data for EfficiencyChart component
- [ ] UI displays efficiency chart

## Implementation Notes

### Optimal Lineup Algorithm

1. For each team, get all players (starters + bench)
2. Get scoring settings from league (QB, RB, WR, TE, FLEX, K, DEF slots)
3. Find highest scoring combination that satisfies roster requirements
4. Compare to actual starters

### Efficiency Calculation

```typescript
efficiency = (actualScore / optimalScore) * 100;
```

## Human Testing Steps

1. Navigate to `/league/1253779168802377728/weekly-recap/8`
2. Verify "Manager Skill Assessment" section appears
3. Chart shows efficiency percentages for all teams
4. Teams with 100% efficiency had optimal lineups
5. Teams below 100% left points on bench

## Expected Results

- Efficiency chart displays with team names and percentages
- Tooltips show actual vs optimal scores
- No console errors

## Testing Performed by Claude

- [ ] Implement optimal lineup calculation
- [ ] Test with various league roster settings
- [ ] Verify efficiency calculations are accurate
- [ ] Add to LeagueWeeklyRecap UI

## Related Stories

- **Previous**: Story 2.2
- **Next**: Story 2.4

## Notes

- Optimal lineup calculation must respect position requirements
- FLEX spot can be RB/WR/TE (highest scoring eligible player)
