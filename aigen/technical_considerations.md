# Technical Considerations

This document captures lessons learned and important notes for The Offensive Line website development.

## Key Architecture Notes

- **Newsletters:** React components with JSON data from external `ff-data-analytics` R repo
- **Themes:** Light/dark support via ColorConstants - always use theme colors, never hardcode
- **State:** React Query for server state (Sleeper API), Context for auth/theme
- **Newsletter routing:** Must include year folder (e.g., "2025/2025 Week 1")

## What Works Well

- React Query caching for Sleeper API (5-min stale time)
- Firebase v9 modular API for Firestore
- Styled-components pattern for theming
- Newsletter folder organization by year

## Watch Out For

- `sleeper_players.json` is 17MB - don't import in multiple places
- Test both light and dark themes for all UI changes
- Newsletter must include MotWRules component as last article (id: 30)
- Snowfall effect only shows Dec-Jan (hardcoded month check)
- League IDs partially hardcoded - multi-league support incomplete

## Common Patterns

**Styling:**

```javascript
background: ${({ theme }) => theme.background};
```

**Colors:** Use ColorConstants from [ColorConstants.ts](../src/components/constants/ColorConstants.ts)

- Light bg: `#ECECDF`, Dark bg: `#2E2E2E`
- Data viz: `#FF3366` to `#20A4F4` gradient

**Newsletter Creation:** See [newsletters/README.md](../src/newsletters/README.md)

---

_Update this doc as we learn more through implementation._
