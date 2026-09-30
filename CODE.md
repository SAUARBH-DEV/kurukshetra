# CODE.md — Kurukshetra Master Engineering & Product Spec

## 0. Purpose

This file is the project-level source of truth for the current Kurukshetra website build.

The repository contains three visual reference pages and one animation reference video:

1. `page1` → Homepage / Hero
2. `page2` → Games + tournament discovery
3. `page3` → How It Works + Leaderboard + Help / Community
4. `Video Project 3` → Motion reference

These are **design references**, not flattened website screenshots to ship as the final UI.

The final website must recreate the visual system with real HTML, CSS, React components, routes/anchors, accessible controls, and real data contracts.

---

# 1. Current Product Direction

Kurukshetra is a college-focused esports platform.

The first version of the public website should communicate three things clearly:

- Discover games and tournaments.
- Compete and represent your college.
- Build a competitive identity/community around esports.

The visual identity is dark, cinematic, gold/amber, premium, mythological, and competitive.

The website should look like a serious esports product rather than a generic gaming landing page.

---

# 2. Important Decision: One Landing Experience First

For the current build, implement the visual experience as **one main landing route with three major sections**, not three unrelated page loads.

Recommended section structure:

```text
/
├── #home
├── #games
├── #tournaments
├── #how-it-works
├── #leaderboard
└── #community
```

This preserves the "three page" visual concept while allowing the header to move between sections smoothly.

Future product routes can be added later:

```text
/tournaments/[id]
/leaderboard
/auth
/profile
/team/[id]
```

Do not build those future routes during the visual-first phase unless they are specifically required.

---

# 3. Header Navigation Contract

The global header is present across the experience.

### Home

Clicking **Home**:

```text
/
```

Then scroll/focus to:

```text
#home
```

### Games

Clicking **Games**:

```text
/#games
```

It should land on the second visual section and make the **Supported Games** content visible.

### Tournaments

Clicking **Tournaments**:

```text
/#tournaments
```

It should land on the tournament portion of the second section, not a separate page during V1.

### Community

Clicking **Community**:

```text
/#community
```

It should land on the bottom/community/help portion of the third section.

For now the community feature itself is not fully implemented.

Use a visible state such as:

```text
COMING SOON
```

Do not fake a live community system.

### Leaderboard

For V1:

```text
/#leaderboard
```

The page3 leaderboard section can remain presentational/mock until backend data is connected.

---

# 4. Three Visual Sections

## SECTION 01 — HOME / HERO

Reference: `page1`

Core content:

- Kurukshetra logo/brand
- "India's College Esports Platform"
- Main headline:
  - THE BATTLE.
  - THE GLORY.
  - THE LEGACY.
- Supporting statement
- Primary CTA:
  - Explore Tournaments
- Secondary CTA:
  - Join Kurukshetra / Login
- Supporting statistics

The statistics shown in the reference are design content only.

Do not treat screenshot numbers as real production metrics.

Use configurable data:

```ts
const heroStats = [
  { label: "Colleges", value: "120+" },
  { label: "Players", value: "15K+" },
  { label: "Tournaments", value: "250+" },
  { label: "Prize Pool", value: "₹50L+" },
];
```

These may be replaced with backend values later.

---

# 5. SECTION 02 — GAMES + TOURNAMENT DISCOVERY

Reference: `page2`

This section contains:

### Featured game area

The current visual reference highlights BGMI.

The component should be data-driven:

```ts
type FeaturedGame = {
  slug: string;
  name: string;
  subtitle?: string;
  tags: string[];
  image: string;
};
```

### Secondary game cards

Current visual examples include:

- Chess
- Valorant
- Free Fire
- Rocket League
- Dota 2
- Apex Legends
- Call of Duty

These are example content from the design.

Do not hard-code them into multiple components.

Use one game data source.

### Supported Games

Use a horizontally responsive game-card layout.

Desktop may show a wide row.

Tablet/mobile must become:

- horizontal scroll
- or responsive grid

Do not allow the desktop card widths to collapse into unreadable cards.

### Tournament area

The Tournaments navigation target should land here.

Use a dedicated section/component for:

- live/running tournaments
- upcoming tournaments
- tournament filters
- game filters
- registration/details CTA

Data must be mockable now and replaceable with backend data later.

---

# 6. SECTION 03 — HOW IT WORKS + LEADERBOARD + HELP

Reference: `page3`

## How It Works

Keep the four visual steps:

1. Discover Tournaments
2. Register & Join
3. Compete
4. Climb the Leaderboard

Use reusable step cards.

Do not flatten the whole section into one background image.

## Leaderboard

The visual reference contains:

- Colleges
- Teams
- Players
- Rank
- Tournament wins
- Total points
- Trend
- "Your Rank" panel

The frontend must model this as real UI.

Mock data is acceptable for initial development.

## Help / Community

The bottom portion contains:

- Need Help?
- Get Help CTA
- Join Our Community
- social/contact icons

For V1:

- Community navigation works.
- Help CTA can point to a placeholder route/mail action.
- Community destination can display a "Coming Soon" treatment where functionality is not ready.

Do not create fake community activity.

---

# 7. Animation Reference

The provided video is a **motion reference**, not a video that should be embedded in the website.

The useful motion principle is:

> A large UI composition enters the viewport from below while the surrounding composition remains visually stable.

Recreate the concept using frontend animation.

Do not use the reference video as the production hero animation.

Recommended behavior for the main hero/content reveal:

```text
Initial:
translateY: 60–100%
opacity: 0
scale: ~0.96

Enter:
translateY → 0
opacity → 1
scale → 1
```

Use an easing curve with a premium, slightly heavy finish.

Avoid cartoon-like bounce.

Recommended duration:

```text
700ms – 1200ms
```

depending on the element.

For the three-section experience:

- Hero enters first.
- Supporting content reveals with a small stagger.
- When the user moves to the next section, cards can reveal upward.
- Avoid re-running large entrance animations every time unless intentional.

---

# 8. Animation Architecture

Prefer a React-friendly animation solution already used by the repository.

If no animation library exists, CSS transitions/animations are acceptable for simple movement.

Do not add a large animation dependency only for one translateY effect.

If Framer Motion/Motion is already present, use the established project approach.

Suggested conceptual pattern:

```text
Section enters viewport
        ↓
Main visual composition rises from bottom
        ↓
Text/CTA reveal with slight stagger
        ↓
Cards/images settle
```

Support:

```text
prefers-reduced-motion
```

When reduced motion is requested, replace large movement with:

- opacity
- very small transform
- or no animation

---

# 9. Critical Asset Rule

The three uploaded images are full-page references.

They should **not** be used as the entire website UI background if the image contains the actual text/buttons/navigation from the design.

Reason:

- text is not accessible
- buttons cannot function correctly
- responsive behavior becomes poor
- SEO suffers
- mobile layout becomes brittle
- backend data cannot replace screenshot content

Use the images for visual reference and extract/use the actual graphical assets separately.

Ideal asset structure:

```text
public/
  brand/
    logo.svg
    emblem.svg
  backgrounds/
    home.webp
    games.webp
    how-it-works.webp
  games/
    bgmi.webp
    chess.webp
    valorant.webp
    free-fire.webp
    rocket-league.webp
    dota2.webp
    apex.webp
    call-of-duty.webp
  icons/
  ui/
```

If only the three full-page images exist, asset preparation should happen before deep frontend implementation.

---

# 10. Typography

The reference uses a strong display-serif / Roman-style headline with modern supporting UI text.

Do not substitute five unrelated fonts.

Use at most:

- one display family
- one interface/body family

Create project tokens for:

```text
display
heading
body
label
caption
```

Typography must remain readable on mobile.

Do not reproduce screenshot text by baking it into raster images.

---

# 11. Visual System

Primary visual characteristics:

- near-black background
- warm gold/amber accents
- off-white typography
- thin geometric borders
- cinematic artwork
- subtle glow
- high contrast

Use a centralized theme/token layer.

Example conceptual tokens:

```text
--bg
--surface
--surface-elevated
--gold
--gold-soft
--text-primary
--text-secondary
--border
--success
--danger
```

Do not scatter arbitrary hex values through components.

---

# 12. Layout Rules

The reference has a strong framed composition.

Use:

- maximum content width
- consistent horizontal padding
- intentional section boundaries
- border treatments
- decorative ornaments only where they support hierarchy

Do not make every element gold.

Gold should signal:

- CTA
- active navigation
- selected state
- important metadata
- decorative identity

---

# 13. Mobile Strategy

Do not simply shrink the desktop image.

The mobile version should be intentionally reflowed.

Expected behavior:

### Header

Desktop:

```text
Logo | Nav | Search | Login | User
```

Mobile:

```text
Logo | menu/action
```

### Hero

Desktop:
- text and cinematic artwork share a composition

Mobile:
- text becomes dominant
- artwork may move behind or below
- CTAs stack
- stats wrap or collapse

### Games

Use:

- responsive grid
- or horizontal scroll

### Leaderboard

Avoid unreadable wide tables.

Use:

- responsive table
- card rows
- or horizontally scrollable table

---

# 14. Frontend/Backend Ownership

## Gemini

Primary owner:

- component implementation
- page composition
- CSS/Tailwind
- animation
- responsive UI
- accessibility
- browser/frontend bugs

## Claude Code

Primary owner:

- database
- authentication internals
- authorization
- SQL
- RLS
- server-side business logic
- API/server actions
- data integrity
- complex backend features

## Shared contract

Before integrating dynamic data, agree on:

```text
endpoint/action
request shape
response shape
error shape
loading behavior
authorization requirements
```

Frontend must never invent privileged backend behavior.

---

# 15. Backend Integration Strategy

The first frontend milestone should work with centralized mock data.

Example:

```text
src/data/mockGames.ts
src/data/mockTournaments.ts
src/data/mockLeaderboard.ts
```

Once Claude Code exposes real contracts, Gemini replaces only the data source.

The UI component API should stay stable where possible.

---

# 16. Error / Empty / Loading States

Every future data-driven region should have:

```text
loading
success
empty
error
```

Do not ship an empty black section when an API fails.

Use graceful product copy.

---

# 17. Coding Standards

Use:

- TypeScript
- semantic HTML
- reusable components
- small focused functions
- explicit types
- accessible interactions
- existing project conventions

Do not:

- duplicate components
- duplicate API clients
- add unnecessary libraries
- over-abstract
- rewrite stable code for style alone

---

# 18. Definition of Done

A frontend task is complete only when:

- correct section/route behavior works
- responsive layout works
- animation does not block interaction
- keyboard access works
- there are no avoidable console errors
- no screenshot text is mistakenly treated as real data
- mock data is centralized
- backend assumptions are documented
- the change does not break existing Kurukshetra work

---

# 19. Git Workflow

Keep work separable.

Recommended branches:

```text
main
develop
feature/frontend-...
feature/backend-...
```

Do not let Gemini and Claude modify the same sensitive files at the same time.

Recommended handoff:

```text
Gemini → UI + contracts needed
Claude → backend/data contract
Gemini → integration
Both → verification
```

---

# 20. Final Rule

Build the **real website behind the reference**, not the reference image itself.

The screenshots define the visual target.

The code defines the product.
