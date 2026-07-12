# The Offensive Line — Public Launch Plan

## The Vision

Take The Offensive Line from a single-league site to a platform where **any Sleeper or ESPN fantasy football league** can have its own automated newsletter — complete with stats, graphs, and editor-written commentary.

---

## How It Works Today

- Any Sleeper or ESPN league can be viewed — stats, matchups, standings are pulled from the respective platform API
- Newsletter content (graphs, stats, tables) is auto-generated for every league
- Our league has additional custom stats and graphs from R scripts (`ff-data-analytics`) — this is league-specific bonus content, not part of the general platform
- Only our league has a filled-out newsletter with written commentary (manually coded into React components)
- Firebase Auth (Google) for login
- Sleeper API for league/roster/matchup data (plain numeric league IDs, e.g. `123456`)
- ESPN API for league/roster/matchup data via `ESPNAdapter.ts`, which translates ESPN responses to Sleeper-compatible types so all compute utilities work unchanged (ESPN league IDs prefixed with `espn_`, e.g. `espn_123456`)
- **ESPN limitations:** transactions and player projections are not available via the ESPN public API — sections depending on these will not render for ESPN leagues

## How It Will Work

### Account Creation & League Linking

1. **Sign up** — Email/password or Google Auth (already exists via Firebase)
2. **Link your platform account:**
   - **Sleeper** — Enter your Sleeper username. We call `GET /v1/user/<username>` to validate it and get the `user_id`. We store the mapping: `Firebase UID → Sleeper user_id`.
   - **ESPN** — No account linking equivalent exists. ESPN is league-first: users enter a league ID directly via `/espn-login`. Private leagues additionally require `espn_s2` and `SWID` browser cookies for auth (see ESPN Private League Auth below).
3. **See your leagues:**
   - **Sleeper** — We call `GET /v1/user/<user_id>/leagues/nfl/<season>` to auto-discover all leagues the user belongs to.
   - **ESPN** — No "all leagues for a user" API exists. ESPN leagues are entered manually and saved to the user's dashboard.

### League Verification (The Sleeper OAuth Problem)

Sleeper has no OAuth. Anyone could type in any username. Here's how we handle it:

**MVP approach:** Skip verification. Since newsletters are about fun league content (not financial data), the risk of someone impersonating a Sleeper user is low. If someone goes through the trouble of faking membership in a random fantasy league... they probably just want a newsletter. We can add verification later if abuse becomes an issue.

> **Future option — Sleeper team name verification:** Generate a one-time code (e.g., `TOL-7X2K`). User sets it as their Sleeper team name temporarily. We poll `GET /v1/league/<league_id>/users` and check for the code. Once verified, they change it back. Low-effort but proves account ownership. Add this if abuse becomes a problem.

### ESPN Private League Auth

ESPN private leagues require `espn_s2` and `SWID` cookies that browsers cannot set directly. The flow:

1. User enters their ESPN league ID and optionally provides `espn_s2` + `SWID` (extracted from their ESPN browser session)
2. Credentials are saved to `localStorage`
3. All ESPN API requests are routed through a Vercel proxy (`proxy-service/api/espn.js`) that adds the Cookie header server-side
4. The proxy URL is stored in Firestore (`config/discord.webhookServiceUrl`) so it can be updated without a redeploy

Public ESPN leagues work without any credentials.

### Newsletter Claiming & Ownership

Every league on Sleeper or ESPN can have a newsletter. Here's how they get created:

1. **Auto-generated base newsletter** — When someone links a league, the system generates the stats/graphs newsletter automatically (no human input needed). This is the "data layer" — the same graphs and tables you have now, powered by the platform's API data.

2. **Creating a newsletter = claiming** — A league member creates a newsletter for their league and becomes its **Editor** (see #103). There is no separate claim step and no unclaimed state.
   - Editor can appoint **Co-Editors** from league members
   - Leagues without a newsletter keep the auto-generated experience (recaps, rosters, history)

3. **Multiple newsletters per league — allowed by design** (decision reversed 2026-07-11, #103). Platform identity is unverifiable (Sleeper has no OAuth; linking is just typing a username), so any exclusive first-come claim would let a squatter permanently lock out the real league. Instead, duplicates are harmless: they can't block anyone, they wrap only already-public stats, and the create flow steers members to the existing newsletter first ("view this one" primary, "create another" secondary).

> **Why the reversal?** One-per-league assumed claims could be trusted. They can't be verified, so exclusivity becomes a denial-of-service tool. Fragmentation is handled socially (discovery lists show editor + season range; leagues converge on the real one) rather than by an unenforceable lock.

### Newsletter Privacy

The Editor sets the newsletter visibility:

| Setting         | Who can view               | Who can submit content |
| --------------- | -------------------------- | ---------------------- |
| **Public**      | Anyone (no account needed) | League members only    |
| **League Only** | Verified league members    | League members only    |

**League member access:**

- **Sleeper leagues:** Members create an account, link their Sleeper username, and the system auto-detects shared leagues. No invite codes or manual approval — if the Sleeper API says you're in the league, you're in.
- **ESPN leagues:** Members enter the league ID manually. Private league membership is verified via the `espn_s2`/`SWID` credentials — if ESPN's API returns the league data with those credentials, you're in.

> **Suggestion:** Start with just these two tiers. Don't over-engineer permissions. You can always add granularity later.

### The Editor Experience

When an Editor opens their league's newsletter for the current week:

**Newsletter Builder View (MVP):**

- Each section of the newsletter is displayed in order
- Auto-generated content (graphs, stats, matchup recaps) is pre-populated and locked
- Editor can **add commentary below each section** — rich text editor (bold, italic, links, images)

**Future enhancements:**

- Reorder sections (drag and drop)
- Hide sections they don't want
- Add custom sections — freeform content blocks between the data sections
- Add a headline/intro at the top
- Add awards — custom superlatives (Boom of the Week, Bust of the Week, etc.)
- **AI-generated content** — auto-generate commentary, recaps, or trash talk based on the week's data

**Workflow:**

1. Week ends (Monday/Tuesday)
2. Data auto-populates into the newsletter draft
3. Editor gets notified: "Your Week 12 newsletter is ready to edit"
4. Editor adds commentary, reorders, customizes
5. Editor hits **Publish**
6. League members get notified (email? push? in-app?)

### League Member Submissions

Members can contribute content to the newsletter before the Editor publishes:

**Submission types:**

- **Memes/images** — Upload with optional caption
- **Trash talk** — Short text blurbs
- **Quotes of the week** — Funny things said in the group chat
- **Reactions/hot takes** — Short-form commentary on matchups

**How it works:**

1. After the week ends, a **submission window** opens (configurable by Editor — e.g., Monday 6am to Wednesday 6pm)
2. Members submit content via a simple form
3. Editor sees all submissions in the Newsletter Builder
4. Editor **curates** — approves, rejects, or reorders submissions
5. Approved submissions appear in a "League Submissions" section of the newsletter

> **This is the killer feature.** The auto-generated stats are table stakes. The member submissions and editor commentary are what make each league's newsletter feel personal and keep people coming back.

---

## Data & Infrastructure

### What Changes

| Component                 | Current                 | Future                               |
| ------------------------- | ----------------------- | ------------------------------------ |
| **Newsletter generation** | R scripts, manual       | Automated pipeline per league        |
| **Content storage**       | React components (code) | Firestore documents (data)           |
| **User model**            | Simple Google Auth      | Firebase Auth + Sleeper/ESPN linking |
| **League data**           | Single hardcoded league | Multi-league, dynamic                |

### Auto-Generated Content Pipeline

Most of the current newsletter content (matchups, standings, scores, rosters) comes directly from the **Sleeper or ESPN API** at render time. The R scripts (`ff-data-analytics`) generate custom/advanced stats specific to your league — that's bonus content, not the core pipeline.

All compute utilities route through `FantasyAPI.ts`, which dispatches to `SleeperAPI.ts` or `ESPNAdapter.ts` based on the league ID prefix. This means the same newsletter sections work for both platforms without any per-platform logic in the UI layer.

For multi-league, the auto-generated newsletter is straightforward:

1. **No batch pipeline needed** — API data is fetched on demand per league
2. **Each league's newsletter** auto-populates with: matchup results, standings, scores, leaderboard, power rankings, awards — from Sleeper or ESPN API
3. **ESPN caveat:** transactions and waiver activity are not available via the ESPN public API and will not appear for ESPN leagues
4. **Custom stats (R scripts)** remain a premium/optional feature. Editors could eventually upload custom data files, but that's a later phase

> **This is a big simplification.** You don't need a backend stats service for Phase 1. The Sleeper and ESPN APIs are the data layer. The R analytics are a differentiator for leagues that want deeper stats — something to offer as an advanced feature later.

### Firestore Schema (High Level)

```
/users/{uid}
  - email, displayName, createdAt
  - sleeperUserId, sleeperUsername (set after Sleeper account linking)
  - espnLeagueIds[] (manually added ESPN league IDs, since ESPN has no account-level discovery API)

/leagues/{leagueId}  ← leagueId is the platform-prefixed ID: plain numeric for Sleeper, "espn_XXXXX" for ESPN
  - platform: 'sleeper' | 'espn' | 'yahoo'
  - platformLeagueId  ← the raw ID as used by the platform's own API
  - name, season, createdAt
  - (editorUid/coEditorUids/privacy/features live here temporarily; they move
     to the newsletter doc and are removed in #103 sub-issue C)

/newsletters/{newsletterId}  ← the top-level publication entity (#103)
  - name, editorUid, editorName, coEditorUids[], privacy, features[]
  - seasons[]: { leagueId, season, verified }, activeLeagueId
  - leagueIds[] (flattened for discovery queries), createdAt

/newsletters/{newsletterId}/issues/{season}_w{week}  ← weekly editions (zero-padded week)
  - status: draft | published
  - publishedAt, sections[], editorNotes

/newsletters/{newsletterId}/issues/{issueId}/submissions/{submissionId}
  - authorUid, type (meme | text | quote), content, imageUrl, status (pending | approved | rejected), createdAt

/leagues/{leagueId}/weekData/{weekNumber}
  - matchups, standings, awards, leaderboard (auto-generated JSON; fate decided in #84)
```

---

## Rollout Plan

### Phase 1: Multi-League Foundation

- User accounts with Sleeper linking (connect your Sleeper username, see your leagues)
- ESPN league entry flow already live — users enter league ID + optional private league credentials
- Editor role claiming per league (shipped in #53; superseded by newsletter creation = claiming, #103)
- Auto-generated newsletters (data only, no editor features)
- Public viewing of any Sleeper or ESPN league's stats (already works today)

### Phase 2: Editor Experience

- Newsletter Builder UI
- Newsletter creation = claiming (replaces editor role claiming, #103)
- Commentary and custom sections
- Publish workflow
- Privacy settings (public vs league-only)

### Phase 3: Member Submissions

- Submission form and window
- Editor curation UI

### Phase 4: Growth & Polish

- Notifications (new submissions, newsletter published — email, push, Discord webhooks)
- Newsletter discovery (browse public newsletters)
- League leaderboards across the platform
- Embeddable widgets (share stats on social)
- Custom themes per league

---

## Open Questions

1. **Custom stats as a feature** — The R-generated advanced stats are unique to your league right now. Could this become a feature where Editors upload custom data, or where power users can run custom analytics? Or keep it as your league's secret sauce?

2. **Hosting & cost** — Firebase free tier covers small scale, but multi-league with image uploads will hit limits. What's the budget tolerance?

3. **Notification delivery** — Email? Push notifications? Discord webhook per league? All of the above?

4. **Off-season** — What happens when football isn't happening? Archive mode? Off-season content?

5. **Additional platforms** — ESPN is now supported. Do you want to support Yahoo or other platforms? The abstraction layer (`FantasyAPI.ts` → platform adapter) is already in place — adding a new platform means writing a new adapter.

6. **Monetization** — Is this a free tool forever, or is there a path to revenue (premium features, ads, etc.)? Affects architecture decisions now.

---

## Summary

The core bet: **every fantasy football league wants a newsletter, but nobody wants to build one from scratch.** Auto-generate the data, let an Editor add personality, let members contribute — and you've got a product that's sticky because the content is personal to each league.

The Sleeper-no-OAuth problem is solvable with lightweight verification. ESPN private leagues are handled via a Vercel proxy that adds cookie auth server-side. Newsletters are the top-level entity (multiple per league allowed — see the claiming section and #103), with a public/private toggle and a simple editor. Ship Phase 1, get leagues onboarded, and let real usage guide what comes next.
