# MOTION_USAGE.md

## Install

```bash
npm install gsap
```

## Semantic markup example

```tsx
<section data-motion="hero-wrapper">
  <header data-motion="hero-nav">...</header>

  <h1 data-motion="hero-heading">
    <span>THE BATTLE.</span>
    <span>THE GLORY.</span>
    <span>THE LEGACY.</span>
  </h1>

  <p data-motion="hero-copy">
    India's Digital Home for College Gaming.
  </p>

  <div data-motion="hero-actions">
    <button>Explore Tournaments</button>
    <button>Join Kurukshetra</button>
  </div>

  <div>
    <div data-motion="hero-stat">120+ Colleges</div>
    <div data-motion="hero-stat">15K+ Players</div>
    <div data-motion="hero-stat">250+ Tournaments</div>
    <div data-motion="hero-stat">₹50L+ Prize Pool</div>
  </div>
</section>
```

## React integration pattern

```tsx
"use client";

import { useLayoutEffect, useRef } from "react";
import {
  initHeroMotion,
  initStaggeredGrid,
  initLeaderboardMotion,
  initSlideFromRight,
} from "@/lib/motion";

export function MotionRoot({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const heroContext = initHeroMotion(root);
    initStaggeredGrid(root);
    initLeaderboardMotion(root);
    initSlideFromRight(root);

    return () => heroContext.revert();
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
```

The exact integration must follow the existing repository architecture. Do not create duplicate page components merely to demonstrate the animation.
