# Story 1.2: Extend Sleeper API Types

**Status**: ⏳ Pending

**Phase**: 1 - Foundation & Data Models

## Description

Review and extend the existing Sleeper API type definitions to ensure all fields needed for newsletter data transformations are properly typed. This includes adding any missing fields discovered in the Sleeper API responses.

## Dependencies

None - can be done in parallel with Story 1.1

## Files to Create/Modify

- [ ] `src/types/sleeperTypes.ts` (UPDATE - add missing fields)

## Acceptance Criteria

- [ ] All fields used by newsletter utilities are typed in `sleeperTypes.ts`
- [ ] `Matchup` type includes all fields we'll need (starters, players, players_points, points, matchup_id, roster_id)
- [ ] `Roster` type includes all fields we'll need (roster_id, owner_id, players, starters, settings, metadata with team_name and player_map)
- [ ] `Roster.metadata.player_map` typed as `Record<string, string>` for custom player nicknames
- [ ] `User` type includes all fields we'll need (user_id, display_name, metadata.team_name, avatar)
- [ ] `League` type includes playoff settings if missing
- [ ] JSDoc comments added for any undocumented fields
- [ ] No TypeScript errors in project

## Implementation Notes

### Fields to Verify

**Matchup** interface should include:
- `matchup_id: number` - identifies which teams are matched up
- `roster_id: number` - the team's roster ID
- `points: number` - total points scored
- `players: string[]` - all player IDs on roster
- `starters: string[]` - player IDs that started
- `players_points: Record<string, number>` - points by player ID

**User** interface should include:
- `user_id: string`
- `display_name: string`
- `username: string`
- `avatar: string | null`
- `metadata?: { team_name?: string }` - custom team name

**Roster** interface should include:
- `roster_id: number`
- `owner_id: string`
- `players: string[]`
- `starters: string[]`
- `settings: { wins: number, losses: number, fpts: number }`
- `metadata?: { team_name?: string, player_map?: Record<string, string> }` - team nickname and custom player nicknames

**League** interface should include:
- `league_id: string`
- `name: string`
- `season: string`
- `settings: { playoff_week_start?: number, playoff_teams?: number }`

## Human Testing Steps

Since this story only updates types (no UI changes):

1. **Verify TypeScript compilation**:
   ```bash
   yarn build
   ```
   - Should complete with no errors

2. **Check type definitions**:
   - Open `src/types/sleeperTypes.ts`
   - Verify all interfaces are complete
   - Verify JSDoc comments are present

3. **Test imports**:
   - Types should autocomplete in VSCode
   - No red squiggly lines when using the types

## Expected Results

- ✅ `sleeperTypes.ts` updated with all necessary fields
- ✅ JSDoc comments explain any unclear fields
- ✅ Project builds without TypeScript errors
- ✅ Types are ready for use in newsletter utilities

## Testing Performed by Claude

Before requesting human verification, Claude will:

- [ ] Review existing `sleeperTypes.ts`
- [ ] Add any missing fields
- [ ] Add JSDoc comments
- [ ] Run `yarn build` to verify no TS errors

## Related Stories

- **Previous**: Story 1.1 - Newsletter Type Definitions
- **Next**: All Phase 2 stories use these types
- **Blocks**: Phase 2 stories (they depend on complete Sleeper types)

## Notes

- This is a quick story to ensure we have complete type coverage
- May discover additional fields needed during Phase 2 implementation
