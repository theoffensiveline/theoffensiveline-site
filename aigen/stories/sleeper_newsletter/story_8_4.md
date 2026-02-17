# Story 8.4: Usage Guide & Examples

**Status**: 🚫 Superseded — replaced by [public-launch-plan.md](../../public-launch-plan.md), which covers the broader platform vision including commissioner onboarding.

**Phase**: 8 - Testing & Documentation

## Description

Produce a polished, user-facing guide that explains how commissioners (or any Sleeper league) can access and share the dynamic newsletter. Include screenshots, URL patterns, and troubleshooting tips so the feature can be adopted without developer support.

## Files to Create/Modify

- [ ] `docs/sleeper-newsletter-guide.md` (NEW – primary guide)
- [ ] `docs/images/newsletter/` (NEW – annotated screenshots)
- [ ] `README.md` (UPDATE – link to guide)

## Acceptance Criteria

- [ ] Guide covers prerequisites (league must be public or API token, etc.).
- [ ] Step-by-step instructions for generating weekly recap URLs, including parameters (`/league/{leagueId}/weekly-recap/{week}`).
- [ ] Provide at least two real examples with screenshots (desktop + mobile).
- [ ] Include FAQ/troubleshooting: missing data, caching delays, playoff week behavior, timezone differences.
- [ ] Document how to prefetch sections, share anchor links, and export to PDF.
- [ ] Tone should be approachable for non-technical managers; avoid jargon.
- [ ] Link to support/contact info for bug reports.

## Implementation Notes

1. Use Markdown tables for quick reference (e.g., "Section" → "What it shows" → "Data Source").
2. Embed images using relative paths so they render on GitHub and docs site.
3. Provide copy-paste commands for generating static links (maybe small CLI snippet).

## Human Testing Steps

1. Have a non-dev teammate follow the guide to open their league recap.
2. Ask them to share the link with another person; ensure instructions mention shareable query params.
3. Confirm screenshots render correctly on GitHub (dark/light mode) and in docs build if applicable.

## Expected Results

- League admins can onboard themselves without pinging engineers.
- Marketing/social teams have ready-made assets to promote the newsletter feature.
