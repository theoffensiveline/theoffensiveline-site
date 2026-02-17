# Story 8.3: Documentation Updates

**Status**: ✅ Completed

**Phase**: 8 - Testing & Documentation

## Description

Refresh internal documentation so future contributors can extend the Sleeper newsletter stack without digging through code. Capture architecture decisions, caching strategy, and how to run the new tooling.

## Files to Create/Modify

- [x] `CLAUDE.md` (UPDATE – add newsletter utilities + testing commands)
- [x] `aigen/technical_considerations.md` (UPDATE – summarize architecture decisions + learned constraints)
- [x] `docs/newsletter-data-flow.md` (NEW – visual overview of API → utilities → UI)

## Acceptance Criteria

- [x] Each newsletter utility documented with purpose, inputs/outputs, and primary consumers.
- [x] Multi-week fetching + caching strategy explained with diagrams or tables.
- [x] Instructions added for running unit/integration tests plus perf diagnostics.
- [x] Include troubleshooting FAQ (e.g., Sleeper rate limits, missing avatars, timezone drift).
- [x] Documentation references relevant stories for historical context.

## Implementation Notes

1. Use Mermaid diagrams for sequence of data fetching (Sleeper API → compute\* utilities → React Query → UI).
2. Crosslink to code files using absolute paths for quick navigation.
3. Highlight environment variables or config toggles introduced in Phase 7 (e.g., `NEWSLETTER_PERF`).

## Human Testing Steps

1. Have a teammate follow docs to run newsletter locally; gather feedback.
2. Confirm lint/markdown checks pass (`yarn lint:docs` if available).
3. Ensure documentation builds (if using Docusaurus) or renders correctly on GitHub.

## Expected Results

- New contributors onboard quickly with minimal guidance.
- Institutional knowledge captured instead of living only in story files.
