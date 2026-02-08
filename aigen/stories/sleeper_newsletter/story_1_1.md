# Story 1.1: Create Newsletter Type Definitions

**Status**: ✅ Completed

**Phase**: 1 - Foundation & Data Models

## Description

Create TypeScript type definitions for all newsletter JSON data formats by extracting examples from existing main league newsletter data files. This provides the type foundation for all subsequent utilities.

## Dependencies

None - this is the first story

## Files to Create/Modify

- [ ] `src/types/newsletterTypes.ts` (NEW)

## Acceptance Criteria

- [ ] Type definitions created for all newsletter data formats:
  - [ ] `EfficiencyData` - Manager efficiency chart data
  - [ ] `StartersData` - Player performance for matchup plots
  - [ ] `LeaderboardData` - Team standings with PF/PA
  - [ ] `MatchupData` - Matchup statistics
  - [ ] `BestBallData` - Optimal lineup leaderboard
  - [ ] `MedianData` - Median scoring leaderboard
  - [ ] `PowerRankingsData` - Power rankings with trends
  - [ ] `ScheduleData` - Strength of schedule
  - [ ] `PlayoffTableData` - Playoff standings
- [ ] All types are exported from the file
- [ ] Types match the structure of example JSON files in `src/newsletters/2025/2025 Week 1/`
- [ ] No TypeScript errors in project after adding types
- [ ] Types include proper JSDoc comments explaining each field

## Implementation Notes

### Reference Files

Extract structure from these example files:

- `src/newsletters/2025/2025 Week 1/efficiencyData.json`
- `src/newsletters/2025/2025 Week 1/starters.json`
- `src/newsletters/2025/2025 Week 1/leaderboard.json`
- `src/newsletters/2025/2025 Week 1/matchupData.json`
- `src/newsletters/2025/2025 Week 1/bestBallLb.json`
- `src/newsletters/2025/2025 Week 1/medianLb.json`
- `src/newsletters/2025/2025 Week 1/powerRankings.json`

### Type Guidelines

- Use `interface` for object shapes
- Use `type` for unions or simple aliases
- Make optional fields explicit with `?`
- Use `number` for numeric values, `string` for text
- Arrays should be typed as `Type[]`
- Include JSDoc comments for non-obvious fields

### Example Structure

```typescript
/**
 * Leaderboard data showing team standings
 */
export interface LeaderboardData {
  /** Team rank (1-indexed) */
  Rank: number;
  /** Team name */
  Team: string;
  /** Wins */
  W: number;
  /** Losses */
  L: number;
  /** Points For */
  PF: number;
  /** Points Against */
  PA: number;
  /** Color for PF display (hex or gradient) */
  PFColor: string;
  /** Color for PA display (hex or gradient) */
  PAColor: string;
  /** Avatar URL */
  avatar_upload?: string;
  /** Image URL or text for display */
  image_or_text?: string;
}
```

## Human Testing Steps

Since this story only creates types (no UI changes), testing is simpler:

1. **Verify TypeScript compilation**:

   ```bash
   yarn build
   ```

   - Should complete with no errors
   - No type errors should appear

2. **Verify types are importable**:
   - Open VSCode
   - Create a test import in any `.ts` file:
     ```typescript
     import type { LeaderboardData } from "../types/newsletterTypes";
     ```
   - Autocomplete should suggest all the new types
   - No red squiggly lines

3. **Check type definitions**:
   - Open `src/types/newsletterTypes.ts`
   - Verify all 9 data types are defined
   - Verify JSDoc comments are present

## Expected Results

- ✅ New file `src/types/newsletterTypes.ts` exists
- ✅ 9 interface/type definitions exported
- ✅ Project builds without TypeScript errors
- ✅ Types are autocomplete-able in VSCode
- ✅ Clear JSDoc documentation for each type

## Testing Performed by Claude

Before requesting human verification, Claude will:

- [x] Create the types file
- [x] Extract structures from example JSON files
- [x] Add JSDoc comments
- [x] Run `yarn build` to verify no TS errors
- [x] Import types in a test file to verify they're accessible

## Related Stories

- **Next**: Story 1.2 - Extend Sleeper API Types
- **Blocks**: All Phase 2 stories (they depend on these types)

## Notes

This is a foundational story - getting the types right here will make all subsequent stories easier and prevent type errors down the line.
