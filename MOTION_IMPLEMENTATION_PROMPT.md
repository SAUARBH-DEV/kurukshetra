# KURUKSHETRA — MOTION IMPLEMENTATION PROMPT

## Use this prompt in Antigravity / Gemini

Read:
- CODE.md
- GEMINI.md
- ASSET_MAP.md
- INTEGRATION.md
- the current frontend codebase
- references/page1.png
- references/page2.png
- references/page3.png
- references/Video Project 3.mp4
- this motion specification

Do NOT rebuild the website from the screenshots.
Do NOT replace the existing architecture.
Do NOT create another frontend implementation beside the current one.

The current problem is that the website's motion is barely changing because the previous implementation used generic entrance animations rather than a coordinated motion system.

Your task is to implement an ACTUAL, CENTRALIZED MOTION ENGINE for Kurukshetra.

==================================================
1. ENGINE
==================================================

Use GSAP + ScrollTrigger for the major motion system.

Check package.json first.

If GSAP is not already installed, install ONLY the required GSAP dependency.

Do not install multiple competing animation libraries.

Do not add Lenis in this pass unless the existing project already uses it.

First make GSAP + ScrollTrigger work with normal browser scrolling. Smooth scrolling can be evaluated later.

GSAP's official documentation supports ScrollTrigger for viewport-triggered animations, timelines, staggered animations, pinning and responsive setups. Register ScrollTrigger explicitly. In React, clean up GSAP contexts/triggers correctly during component lifecycle changes.

==================================================
2. DO NOT USE GENERIC "FADE UP"
==================================================

The motion reference is not merely:

opacity 0 → 1
translateY(20px) → 0

Implement the motion as a coordinated sequence.

The motion language is:

CYBER-KINETIC / CINEMATIC / HARDWARE-LIKE

Characteristics:
- contained/windowed composition
- scale + vertical movement
- directional stagger
- bottom-to-top reveals
- right-to-left reveals
- horizontal card movement
- delayed text reveals
- restrained background movement
- snappy but smooth easing

==================================================
3. GLOBAL MOTION TOKENS
==================================================

Create a centralized motion configuration.

Starting values:

Durations:
fast = 0.2s
normal = 0.5s
slow = 0.8s

Easing:
entrance = cubic-bezier(0.16, 1, 0.3, 1)
standard = cubic-bezier(0.25, 1, 0.5, 1)
snappy = cubic-bezier(0.175, 0.885, 0.32, 1.275)
linear = linear

Distances:
small Y = 20px
medium Y = 40px
large Y = 60px+
medium X = 30px

Stagger:
tight = 0.04s
loose = 0.10s

Do not scatter these numbers across random components.

==================================================
4. INITIAL PAGE BOOT SEQUENCE
==================================================

The reference's main wrapper behaves like a contained composition.

Kurukshetra should have:

MAIN WRAPPER
initial:
scale(0.95)
translateY(5vh)

final:
scale(1)
translateY(0)

duration:
~800ms

easing:
entrance

This is NOT a normal browser-page slide.

The background/environment should feel comparatively stable while the main interface settles.

Then:

GLOBAL NAV
initial:
opacity 0
translateY(-15px)

delay:
~400ms

duration:
~500ms

HERO HEADING
initial:
opacity 0
translateY(40px)

delay:
~200ms

duration:
~600ms

The heading should reveal line-by-line or word-by-word where practical.

HERO DESCRIPTION
slightly after headline

HERO BUTTONS
initial:
opacity 0
translateY(20px)

delay:
~600ms

duration:
~500ms

Buttons enter as a group.

HERO STATS
small staggered reveal.

==================================================
5. HERO TEXT MUST MOVE WITH THE COMPOSITION
==================================================

Do not keep the headline static while only the background moves.

Perceived sequence:

main wrapper settles
↓
heading reveals
↓
supporting copy reveals
↓
CTA appears
↓
stats settle

The headline must feel attached to the moving composition.

==================================================
6. HOME → GAMES TRANSITION
==================================================

When navigating to Games, do NOT perform a hard page reload.

The current landing experience remains one route with anchors.

Transition language:

HOME COMPOSITION
moves upward
+
GAMES COMPOSITION
emerges from below

Do not create an uncontrolled full-page slideshow.

Preserve normal scrolling.

Use section-level movement and ScrollTrigger where appropriate.

==================================================
7. GAMES SECTION
==================================================

When the Games section enters the viewport:

1. Section/container settles.
2. Featured game reveals.
3. "SUPPORTED GAMES" heading appears.
4. Game cards cascade into view.
5. Tournament content appears later.

Featured game:
bottom-to-top / slight scale reveal.

Supported Games heading:
fade + translateY.

Game cards:
initial:
opacity 0
translateY(30px)
scale(0.95)

final:
opacity 1
translateY(0)
scale(1)

duration:
~500ms

stagger:
~40ms

==================================================
8. HORIZONTAL SUPPORTED GAMES MOTION
==================================================

Create an attractive horizontal motion system for the Supported Games cards.

Use a controlled horizontal track.

Potential behavior:
- cards enter from one horizontal direction during reveal
- once visible, the track can have a subtle slow movement if the composition calls for it
- movement must never make cards unreadable
- no sudden jumps
- no fast marquee

If an auto-moving marquee is implemented:
- use a duplicated track for seamless looping
- pause/reduce on hover when appropriate
- respect reduced motion
- ensure touch users can still access all cards

Do not create a visually noisy infinite animation.

==================================================
9. TOURNAMENT REVEAL
==================================================

Tournament cards should cascade upward when entering view.

Use ScrollTrigger with a trigger start around:

"top 85%"

or another value that makes cards animate while visible.

Play once.

==================================================
10. HOW IT WORKS
==================================================

When the third visual area enters:

LEFT SIDE:
- heading
- supporting copy
- step cards

Use opacity + small translateY.

RIGHT SIDE:
- featured visual / leaderboard composition

Use translateX(50px) → 0
opacity 0 → 1

The right side should feel slightly delayed behind the left.

==================================================
11. LEADERBOARD
==================================================

Treat the leaderboard as ONE visual block first.

Sequence:

section enters
↓
heading
↓
leaderboard panel
↓
tabs/content
↓
your-rank card

Main leaderboard:
opacity 0
translateY(50px)

duration:
~700ms

delay:
~150ms

Then optional small internal stagger.

==================================================
12. BACKGROUND TYPOGRAPHY / ATMOSPHERE
==================================================

Where the design has large background typography, use a slow continuous horizontal loop.

Concept:
translateX(0) → translateX(-100%)

long duration
linear

This must remain subtle.

Respect reduced motion.

==================================================
13. PARALLAX
==================================================

The How It Works background can move slightly slower than foreground content.

Use restrained parallax.

Do NOT create aggressive 3D movement.

==================================================
14. MICRO INTERACTIONS
==================================================

Tournament/Game card hover:
container:
scale 1 → 1.02

internal image:
scale 1 → 1.05

duration:
~300ms

CTA hover:
translateY(0 → -2px)

duration:
~150ms

Button press:
scale 1 → 0.97 → 1

duration:
~100ms

==================================================
15. SCROLLTRIGGER RULES
==================================================

Use ScrollTrigger for sections that reveal during scrolling.

Preferred:
play-once behavior.

Start around:
"top 85%"

Adjust after visual testing.

Use responsive media-query handling if desktop and mobile need different distances.

In React:
- scope animation selectors
- clean up GSAP contexts/triggers
- do not leave stale ScrollTriggers after unmount

==================================================
16. PERFORMANCE
==================================================

Animate primarily:
transform
opacity

Avoid layout animation of:
top
left
margin
height

Do not use a video background.
Do not use canvas/WebGL for this motion system.

==================================================
17. REDUCED MOTION
==================================================

Support:

prefers-reduced-motion

When enabled:
- remove large translate distances
- remove continuous background loops
- reduce/disable parallax
- use opacity/static states

==================================================
18. REQUIRED FILE ARCHITECTURE
==================================================

Create one centralized motion utility/module, for example:

src/lib/motion.ts

or the equivalent place that fits the current repository.

Create reusable helpers for:
- hero boot
- reveal-on-scroll
- staggered cards
- slide-from-right
- horizontal track
- reduced motion detection

Do NOT put every animation directly into the page component.

Use semantic hooks/data attributes such as:

data-motion="hero-wrapper"
data-motion="hero-nav"
data-motion="hero-heading"
data-motion="hero-copy"
data-motion="hero-actions"
data-motion="hero-stat"
data-motion="game-grid"
data-motion="game-card"
data-motion="tournament-card"
data-motion="leaderboard-panel"
data-motion="slide-from-right"

==================================================
19. DO NOT REDESIGN
==================================================

This task is animation architecture, not a visual redesign.

Do not change typography, spacing, colors, content, layout, or images unless a tiny change is strictly necessary to support animation.

First make the CURRENT page animate correctly.

==================================================
20. IMPLEMENTATION ORDER
==================================================

Step 1: Create centralized GSAP motion module.
Step 2: Implement hero boot sequence.
Step 3: Visually verify hero.
Step 4: Implement hero text sequencing.
Step 5: Visually verify.
Step 6: Implement Games section reveals.
Step 7: Implement Supported Games horizontal motion.
Step 8: Implement tournament reveal.
Step 9: Implement How It Works + leaderboard movement.
Step 10: Implement micro-interactions.
Step 11: Implement reduced-motion behavior.
Step 12: Test desktop + mobile.

==================================================
21. VISUAL VERIFICATION
==================================================

After each major step:
1. Run the application.
2. Open it in the browser.
3. Inspect the actual rendered animation.
4. Compare against the motion specification/reference.
5. Adjust timing, distance, and easing.

Do NOT finish by only checking source code.

==================================================
22. ACCEPTANCE CRITERIA
==================================================

[ ] Main wrapper scale + rise on initial load
[ ] Header delayed entrance
[ ] Hero heading delayed upward reveal
[ ] Hero text synchronized with composition
[ ] CTA delayed entrance
[ ] Stats stagger
[ ] Home → Games visual movement
[ ] Games content reveal
[ ] Supported Games horizontal movement
[ ] Tournament card cascade
[ ] How It Works reveal
[ ] Right-side leaderboard/panel entrance
[ ] Slow atmospheric background motion where appropriate
[ ] Card hover lift
[ ] Button press feedback
[ ] Reduced-motion support
[ ] No duplicated/picture-in-picture UI
[ ] Normal scrolling still works
[ ] Mobile remains usable

==================================================
FINAL REPORT
==================================================

Report:

Motion engine:
Files created:
Files modified:
Libraries added:
Animation sequences implemented:
Desktop verified:
Mobile verified:
Reduced motion verified:
Remaining visual differences:
