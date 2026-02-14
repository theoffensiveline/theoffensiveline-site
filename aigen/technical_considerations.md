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
- **Skeleton Loading States:** Custom skeletons per section with 400ms minimum display time prevents flicker
- **Progressive Rendering:** SectionShell component with skeleton prop allows bespoke loading states
- **Styled-components keyframes:** Shimmer animations using `keyframes` from styled-components (no CSS files needed)

## Watch Out For

- `sleeper_players.json` is 17MB - don't import in multiple places
- Test both light and dark themes for all UI changes
- Newsletter must include MotWRules component as last article (id: 30)
- Snowfall effect only shows Dec-Jan (hardcoded month check)
- League IDs partially hardcoded - multi-league support incomplete
- **Transient Props:** Use `$` prefix for styled-components props (e.g., `$columns`) to avoid DOM warnings
- **Conditional Rendering:** Check both `status !== "success"` AND data presence to show sections while loading
- **Bundle Size:** Code splitting needed for chart components (Story 7.4) - page waits for all JS before rendering

## Common Patterns

**Styling:**

```javascript
background: ${({ theme }) => theme.background};
```

**Colors:** Use ColorConstants from [ColorConstants.ts](../src/components/constants/ColorConstants.ts)

- Light bg: `#ECECDF`, Dark bg: `#2E2E2E`
- Data viz: `#FF3366` to `#20A4F4` gradient

**Newsletter Creation:** See [newsletters/README.md](../src/newsletters/README.md)

**Skeleton Loading States:**

```tsx
// Use transient props ($) in styled-components
const TableRow = styled.div<{ $columns: number }>`
  grid-template-columns: ${({ $columns }) => `repeat(${$columns}, 1fr)`};
`;

// Then use it
<TableRow $columns={5}>...</TableRow>

// SectionShell with custom skeleton
<SectionShell
  status={section.status}
  skeleton={<TableSkeleton rows={10} columns={6} />}
>
  {section.render()}
</SectionShell>

// Conditional shouldRender for dynamic sections
shouldRender: status !== "success" || (data?.length ?? 0) > 0
```

---

_Update this doc as we learn more through implementation._
