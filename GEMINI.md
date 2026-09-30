GEMINI.md — Kurukshetra Frontend Agent Rules
1. Mission
You are the primary frontend engineer for Kurukshetra inside Antigravity.
Read `CODE.md` before making changes.
Your job is to turn the supplied visual references into a real, responsive, accessible frontend.
The reference images are:
`page1` — home/hero
`page2` — games + tournament discovery
`page3` — how it works + leaderboard + help/community
`Video Project 3` — motion reference
The previous Kurukshetra implementation may already contain useful components, auth UI, styling, Supabase integration scaffolding, or other work.
Inspect and preserve useful existing work before creating replacements.
---
2. Most Important Rule
Do not build the website by placing each full-page screenshot as an `<img>` and calling it finished.
Recreate the design using:
real HTML
React components
CSS/Tailwind
actual links/buttons
real text
real responsive layouts
The screenshots are the target.
They are not the implementation.
---
3. Before Coding
Always do this:
Read `CODE.md`.
Inspect repository structure.
Inspect `package.json`.
Locate current app routes.
Locate current shared components.
Locate existing fonts/assets.
Locate existing auth/data utilities.
Check whether previous Kurukshetra work already implements any part of the UI.
Do not delete existing work just because it is imperfect.
Prefer:
```text
inspect → reuse → refine → replace only when necessary
```
---
4. Current UX Structure
Use one main landing experience with section anchors.
```text
/
#home
#games
#tournaments
#how-it-works
#leaderboard
#community
```
Header behavior:
```text
Home        → /#home
Games       → /#games
Tournaments → /#tournaments
Community   → /#community
Leaderboard → /#leaderboard
```
For V1, Games and Tournaments are both part of the second visual area.
Community functionality is not fully built.
Display:
```text
COMING SOON
```
where necessary instead of inventing features.
---
5. Page1 — Home Implementation
Visual target:
cinematic dark/gold environment
Kurukshetra branding
large three-line serif headline
supporting description
two CTAs
statistics
compass/emblem visual
Do not bake the title into an image.
Create real text:
```text
THE BATTLE.
THE GLORY.
THE LEGACY.
```
Use responsive typography.
Desktop can use large display sizing.
Mobile must use controlled wrapping and avoid overflow.
---
6. Header
Build one reusable `Header` component.
Expected navigation:
```text
Home
Games
Tournaments
Community
Leaderboard
```
Actions:
```text
Login
User/profile icon
```
There may also be a search icon depending on the current design.
Header requirements
sticky or appropriately persistent
transparent/dark cinematic appearance
active section indicator
keyboard accessible
mobile navigation
no overflow
clear focus states
When the current section changes through scrolling, the active nav item may update.
Do not make section tracking overly complicated.
---
7. Main Animation Requirement
The provided video is a reference for motion.
The main idea to reproduce:
> The visual UI composition enters from below the viewport.
Use a real frontend animation.
Concept:
```text
Initial:
y: 80–100%
opacity: 0
scale: 0.97

Animated:
y: 0
opacity: 1
scale: 1
```
Use roughly:
```text
0.7s – 1.2s
```
with a smooth ease-out curve.
Do not use a springy cartoon bounce.
Stagger
Use small delays for:
```text
headline
description
CTA
stats
decorative/interface elements
```
The whole page should feel like one coordinated entrance.
Important
Do not make every section permanently animate.
Entrance animation should be triggered intentionally:
initial page load
section entering viewport
specific user interaction
Avoid motion overload.
---
8. First Page "Comes From Bottom"
The user's intended behavior is that the first main visual composition rises from the bottom, similar to the provided video reference.
Implement this as the initial hero entrance.
Suggested sequence:
```text
0 ms
page/background visible

100–150 ms
hero visual starts rising

200–350 ms
main heading begins revealing

300–500 ms
description + CTAs appear

450–700 ms
stats/decorative details settle
```
These timings are starting points, not strict values.
The final feel matters more than exact numbers.
---
9. Page2 — Games + Tournaments
Create a clear second major section.
Featured Game
Use a data-driven component.
The reference currently shows BGMI as the featured game.
The featured game module should contain:
image
game title
subtitle
tags
stats
CTA
Example CTA:
```text
EXPLORE BGMI TOURNAMENTS
```
Do not make BGMI permanently special in the data architecture.
Another game should be able to become featured later.
---
10. Game Cards
Create one reusable:
```text
<GameCard />
```
Possible fields:
```ts
type Game = {
  id: string;
  slug: string;
  name: string;
  image: string;
  tags: string[];
  platform?: string;
  category?: string;
};
```
Current visual examples can be centralized in mock data.
Do not copy/paste eight different cards.
---
11. Supported Games Layout
Match the visual reference closely:
large artwork
strong title
small tags
circular/outlined action affordance
dark card surface
gold accent borders
Responsive rules:
Desktop:
wide row/grid
Tablet:
reduced columns
Mobile:
horizontal scrolling row or 1–2 column layout
Do not make every card tiny just to keep all games on one row.
---
12. Tournament Area
The Tournaments header link should land at the tournament portion of the second section.
Build reusable components:
```text
TournamentCard
TournamentGrid
TournamentFilters
TournamentStatus
```
A tournament card should make these easy to find:
game
tournament name
status
date/time
format
prize information when available
entry/team information
action
For the visual-first phase, use mock data.
Do not fabricate real tournament numbers.
---
13. Page3 — How It Works
Recreate the four-step visual:
```text
01 Discover Tournaments
02 Register & Join
03 Compete
04 Climb the Leaderboard
```
Use a reusable:
```text
HowItWorksStep
```
Desktop can use a horizontal layout.
Mobile should stack/reflow cleanly.
Do not force four cards to stay side-by-side on mobile.
---
14. Leaderboard
Build the presentation as real UI.
Tabs:
```text
Colleges
Teams
Players
```
Rows:
```text
Rank
College/Team/Player
Tournament Wins
Total Points
Trend
```
The right-side "Your Rank" panel can use mock data.
Do not claim the displayed college/rank/statistics are live.
---
15. Help + Community
Recreate the bottom section:
```text
NEED HELP?
GET HELP
JOIN OUR COMMUNITY
```
For now:
Help can be a placeholder mail/contact action.
Community can show `COMING SOON`.
Social icons can be non-functional placeholders until links are supplied.
Do not create fake Discord/community activity.
---
16. Asset Handling
The supplied screenshots are visual references.
Use real extracted assets whenever possible.
Priority order:
```text
Existing project assets
↓
Exported/source artwork
↓
Cropped image assets when necessary
↓
Full-page screenshots only for reference
```
Do not stretch artwork.
Use correct image aspect ratios.
For meaningful images, provide alt text.
For purely decorative background art:
```text
alt=""
```
or equivalent decorative handling.
---
17. Typography
Use a display font for major headings and a clean UI font for navigation/body.
Do not introduce multiple font families without a reason.
Create consistent utility/classes for:
```text
display-xl
display-lg
heading
body
eyebrow
label
caption
```
Do not rely on arbitrary font sizes in every component.
---
18. Styling
Keep the visual hierarchy close to the references:
```text
near-black
↓
deep dark surfaces
↓
warm gold accents
↓
off-white text
↓
subtle glow
```
Gold should emphasize important elements, not paint everything gold.
Avoid:
random neon colors
excessive gradients
excessive glassmorphism
huge blurred blobs
unnecessary 3D effects
generic SaaS card styling
---
19. Responsive Behavior
Check every major component at:
```text
360px
390px
768px
1024px
1440px+
```
Pay particular attention to:
header
hero title
CTA buttons
game cards
tournament cards
leaderboard
footer/help area
Do not use fixed pixel dimensions copied directly from the screenshots.
The screenshots are designed for specific aspect ratios; the website must adapt.
---
20. Smooth Scroll
Navigation should feel smooth.
Use native/browser-supported smooth scrolling or the project's existing scroll system.
Do not introduce a heavy scrolling library simply for anchor navigation.
When navigating to a section:
account for the fixed header
keep the heading visible
preserve expected browser behavior
Use appropriate `scroll-margin-top` where needed.
---
21. Accessibility
Required:
semantic headings
real `<button>` for actions
real `<a>`/router link for navigation
keyboard access
visible focus
accessible labels for icon buttons
non-color-only status communication
reduced-motion support
For icon-only buttons:
```text
aria-label="Search"
aria-label="Open menu"
```
as appropriate.
---
22. Frontend Data Rules
For now, centralized mock data is acceptable.
Recommended:
```text
src/data/games.ts
src/data/tournaments.ts
src/data/leaderboard.ts
src/data/hero.ts
```
Do not embed arrays of data directly across multiple UI components.
The goal is to let Claude Code later replace the data layer without redesigning the UI.
---
23. Backend Boundary
Do not independently invent:
API endpoints
database fields
authorization rules
privileged operations
service-role usage
When data is missing, either:
use explicit mock data during frontend development, or
ask/prepare a backend handoff for Claude Code.
Never put backend secrets into `.env` values that are exposed to the browser.
---
24. Bug-Fix Workflow
For every bug:
First
Reproduce it.
Second
Identify whether the problem is:
```text
UI
CSS
React state
routing
data transformation
API contract
backend
```
Third
Fix the smallest relevant layer.
Do not rewrite the page because one margin is wrong.
Fourth
Check for regression.
Fifth
Report:
```text
Cause:
Fix:
Files changed:
Verified:
```
Never claim verification that you did not perform.
---
25. Existing Work Rule
This is not a fresh toy project.
There may already be:
authentication
Supabase setup
components
routes
backend integration
visual design code
utilities
environment configuration
Before replacing anything:
```text
search → understand → reuse → modify
```
If an existing component is close to the reference, refine it.
Do not create:
```text
HeaderNew
HeaderV2
HeaderFinal
HeaderFinal2
```
because of AI iteration.
---
26. Avoid Overengineering
Do not add:
Redux unless already required
complex state machines for simple UI
animation frameworks without a real need
multiple component libraries
unnecessary utility packages
micro-frontend architecture
elaborate design systems for a small page
The target is a clean startup-grade frontend.
---
27. Do Not Invent Content
Never invent:
real player counts
real colleges
real prize pools
real sponsors
real tournament winners
real community members
When content is not available, use:
```text
mock
sample
coming soon
```
or project-approved placeholder content.
---
28. Verification Checklist
Before saying the task is done:
```text
[ ] Correct section/route behavior
[ ] Desktop layout
[ ] Mobile layout
[ ] Tablet behavior
[ ] No horizontal overflow
[ ] Navigation works
[ ] Buttons are real interactive elements
[ ] Images preserve aspect ratio
[ ] Keyboard navigation works
[ ] Reduced motion considered
[ ] No avoidable console errors
[ ] TypeScript/lint passes where configured
[ ] Existing Kurukshetra functionality still works
```
---
29. Working With Claude Code
When the work reaches the backend boundary, prepare a clear handoff.
Use:
```text
CLAUDE HANDOFF

Feature:
Frontend screen:
Data required:
Fields:
Request/action:
Success response:
Error cases:
Authorization needed:
Current mock data:
Files waiting for integration:
```
Example:
```text
CLAUDE HANDOFF

Feature:
Tournament listing

Frontend screen:
/#tournaments

Data required:
id
name
game
status
startTime
format
prizePool
teamSize

Current:
mockTournaments.ts

Need:
backend contract for live/upcoming tournaments
```
Do not implement a guessed API.
---
30. Final Principle
Match the visual intent, not the pixels.
The frontend should preserve the emotion of the screenshots:
cinematic
premium
competitive
mythological
Indian college esports
while remaining:
real
responsive
accessible
interactive
maintainable
ready for backend integration.