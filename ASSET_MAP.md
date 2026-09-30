ASSET_MAP.md — Kurukshetra Reference Assets
Visual references
File	Purpose	Resolution
`page1.png`	Home / Hero reference	1672 × 941
`page 2.png`	Games + tournament discovery reference	1536 × 1024
`page3final.png`	How It Works + Leaderboard + Help reference	1672 × 941
`Video Project 3.mp4`	Motion reference	1920 × 1080, ~11.4s
Important
These files are references for:
layout
typography hierarchy
framing
artwork placement
borders
colors
CTA placement
section hierarchy
animation direction
They are not the final interactive website.
Recommended production asset breakdown
Before the frontend gets too deep, prepare individual assets:
```text
public/
  brand/
    logo
    emblem
  backgrounds/
    home
    games
    how-it-works
  games/
    bgmi
    chess
    valorant
    free-fire
    rocket-league
    dota2
    apex-legends
    call-of-duty
  icons/
    navigation
    game
    social
    stats
```
Preferred formats:
SVG for logos/icons when available
WebP/AVIF for large raster artwork
PNG only where transparency is needed
Motion reference interpretation
The useful animation idea from the provided video is a large interface composition rising from below the viewport into position, with a controlled fade/scale settle.
Recreate this behavior in CSS/Motion rather than embedding the video.