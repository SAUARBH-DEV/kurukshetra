import { gsap } from 'gsap';
import { isReducedMotion } from './motion';

export const SECTION_ORDER = [
  'home',
  'games',
  'tournaments',
  'how-it-works',
  'leaderboard',
  'community',
] as const;

export type SectionId = typeof SECTION_ORDER[number];

let isTransitioning = false;
let currentTargetId: string | null = null;
let activeTl: gsap.core.Timeline | null = null;
let safetyTimer: ReturnType<typeof setTimeout> | null = null;

/**
 * Returns true if a page transition is currently in progress
 */
export const isPageTransitioning = (): boolean => isTransitioning;

/**
 * Cleanly resets stage overlay, cancels active GSAP timelines, and unlocks navigation
 */
const cleanStage = (): void => {
  if (safetyTimer) {
    clearTimeout(safetyTimer);
    safetyTimer = null;
  }
  if (activeTl) {
    activeTl.kill();
    activeTl = null;
  }
  if (typeof document !== 'undefined') {
    document.documentElement.style.overflow = '';
    document.documentElement.style.scrollBehavior = '';
    document.body.style.scrollBehavior = '';
    const stage = document.getElementById('card-transition-stage');
    if (stage) {
      stage.classList.add('hidden');
      const outgoing = document.getElementById('card-outgoing-content');
      const incoming = document.getElementById('card-incoming-content');
      if (outgoing) outgoing.innerHTML = '';
      if (incoming) incoming.innerHTML = '';
    }
  }
  isTransitioning = false;
  currentTargetId = null;
};

/**
 * Detects the currently active section based on window scroll position
 */
export const getCurrentSectionId = (): SectionId => {
  if (typeof window === 'undefined') return 'home';

  // 1. Detect if window is scrolled near the bottom of the page (Community hub)
  const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 70;
  if (isAtBottom) return 'community';

  const scrollPos = window.scrollY + 180;
  for (let i = SECTION_ORDER.length - 1; i >= 0; i--) {
    const el = document.getElementById(SECTION_ORDER[i]);
    if (el && scrollPos >= el.offsetTop) {
      return SECTION_ORDER[i];
    }
  }
  return 'home';
};

/**
 * Ensures the transition stage overlay exists in the DOM
 */
const getOrCreateStage = (): {
  stage: HTMLElement;
  backdrop: HTMLElement;
  outgoingCard: HTMLElement;
  outgoingContent: HTMLElement;
  outgoingScrim: HTMLElement;
  incomingCard: HTMLElement;
  incomingContent: HTMLElement;
} => {
  let stage = document.getElementById('card-transition-stage');
  if (!stage) {
    stage = document.createElement('div');
    stage.id = 'card-transition-stage';
    stage.setAttribute('aria-hidden', 'true');
    stage.className = 'fixed inset-0 pointer-events-none z-40 hidden overflow-hidden select-none';
    stage.innerHTML = `
      <div id="card-stage-backdrop" class="absolute inset-0 bg-dark-950/85 backdrop-blur-[2px]"></div>
      
      <!-- Outgoing Card Layer (underneath) -->
      <div id="card-page-outgoing" class="absolute inset-0 w-full h-full will-change-transform z-10">
        <div id="card-outgoing-content" class="w-full h-full overflow-hidden relative border border-gold-500/20 shadow-2xl bg-dark-950"></div>
        <div id="card-outgoing-scrim" class="absolute inset-0 bg-black/60 pointer-events-none opacity-0"></div>
      </div>

      <!-- Incoming Card Layer (slides over top) -->
      <div id="card-page-incoming" class="absolute inset-0 w-full h-full will-change-transform z-20">
        <div id="card-incoming-content" class="w-full h-full overflow-hidden relative border border-gold-500/35 bg-dark-950"></div>
      </div>
    `;
    document.body.appendChild(stage);
  }

  return {
    stage,
    backdrop: document.getElementById('card-stage-backdrop')!,
    outgoingCard: document.getElementById('card-page-outgoing')!,
    outgoingContent: document.getElementById('card-outgoing-content')!,
    outgoingScrim: document.getElementById('card-outgoing-scrim')!,
    incomingCard: document.getElementById('card-page-incoming')!,
    incomingContent: document.getElementById('card-incoming-content')!,
  };
};

/**
 * Synchronizes the landed section with the appearing page
 */
export const animateSectionEntrance = (sectionId: string): void => {
  if (typeof window === 'undefined') return;

  // Dispatch custom event for components listening to re-triggers (e.g. SpeedTyping in HeroSection)
  window.dispatchEvent(
    new CustomEvent('kurukshetra:section-change', {
      detail: { sectionId },
    })
  );

  const el = document.getElementById(sectionId);
  if (!el) return;

  // Ensure all elements in the landed section are resting, crisp, and visible
  el.querySelectorAll<HTMLElement>('[data-motion]').forEach((item) => {
    item.style.opacity = '1';
    item.style.transform = 'none';
  });
};

/**
 * Core Cinematic Card-Sliding Navigation Transition Engine
 * 
 * Interruption-safe, robust against rapid clicks:
 * - If a transition is active and user clicks a different section, immediately resets
 *   and starts transition to the new target.
 * - Cancels timers and kills timelines to prevent any race condition or "hung" states.
 * - Always re-synchronizes component entrance animations upon arrival.
 * 
 * @param targetSectionId The destination section id (e.g. 'games', 'tournaments')
 * @param onComplete Optional callback fired upon transition completion
 */
export const transitionToSection = (
  targetSectionId: string,
  onComplete?: () => void
): void => {
  const toEl = document.getElementById(targetSectionId);
  if (!toEl) {
    console.warn(`Target section #${targetSectionId} not found.`);
    return;
  }

  // If already transitioning to this exact target, avoid duplicate duplicate triggers
  if (isTransitioning && currentTargetId === targetSectionId) {
    return;
  }

  // If a transition was active to another section, cleanly finalize it immediately
  if (isTransitioning) {
    cleanStage();
  }

  const fromId = getCurrentSectionId();
  if (fromId === targetSectionId) {
    toEl.scrollIntoView({ behavior: 'smooth' });
    animateSectionEntrance(targetSectionId);
    onComplete?.();
    return;
  }

  // Accessibility: Respect prefers-reduced-motion
  if (isReducedMotion()) {
    toEl.scrollIntoView({ behavior: 'auto' });
    toEl.querySelectorAll('[data-motion]').forEach((el) => {
      (el as HTMLElement).style.opacity = '1';
      (el as HTMLElement).style.transform = 'none';
    });
    animateSectionEntrance(targetSectionId);
    onComplete?.();
    return;
  }

  const fromEl = document.getElementById(fromId);
  if (!fromEl) {
    toEl.scrollIntoView({ behavior: 'smooth' });
    animateSectionEntrance(targetSectionId);
    onComplete?.();
    return;
  }

  // Navigation lock active
  isTransitioning = true;
  currentTargetId = targetSectionId;

  // Determine direction based on canonical section order
  const fromIndex = SECTION_ORDER.indexOf(fromId as SectionId);
  const toIndex = SECTION_ORDER.indexOf(targetSectionId as SectionId);
  const isForward = toIndex >= fromIndex;

  // Detect mobile viewport
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Setup transition stage
  const {
    stage,
    outgoingCard,
    outgoingContent,
    outgoingScrim,
    incomingCard,
    incomingContent,
  } = getOrCreateStage();

  // Clean previous clones
  outgoingContent.innerHTML = '';
  incomingContent.innerHTML = '';

  // Create clean clones of both sections without ID collisions
  const cloneFrom = fromEl.cloneNode(true) as HTMLElement;
  cloneFrom.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));
  cloneFrom.removeAttribute('id');
  cloneFrom.style.width = '100vw';
  cloneFrom.style.maxWidth = '100vw';
  cloneFrom.style.minHeight = '100vh';

  const cloneTo = toEl.cloneNode(true) as HTMLElement;
  cloneTo.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));
  cloneTo.removeAttribute('id');
  cloneTo.style.width = '100vw';
  cloneTo.style.maxWidth = '100vw';
  cloneTo.style.minHeight = '100vh';

  // Ensure incoming clone has all elements in their visible, resting state
  cloneTo.querySelectorAll('[data-motion]').forEach((el) => {
    (el as HTMLElement).style.opacity = '1';
    (el as HTMLElement).style.transform = 'none';
  });

  // Mount clones into card shells
  outgoingContent.appendChild(cloneFrom);
  incomingContent.appendChild(cloneTo);

  // Preserve scroll offset on outgoing card
  const currentScrollOffset = Math.max(0, window.scrollY - fromEl.offsetTop);
  outgoingContent.scrollTop = currentScrollOffset;
  incomingContent.scrollTop = 0;

  // Configure rich card drop shadow on the incoming card
  incomingCard.style.boxShadow = isForward
    ? '-30px 0 60px rgba(0,0,0,0.9), 0 0 25px rgba(229,166,45,0.25)'
    : '30px 0 60px rgba(0,0,0,0.9), 0 0 25px rgba(229,166,45,0.25)';

  // Directional sliding values
  const outgoingTargetX = isForward ? (isMobile ? -20 : -30) : (isMobile ? 20 : 30);
  const incomingStartX = isForward ? 100 : -100;

  // Make stage visible
  stage.classList.remove('hidden');

  // Lock document scroll temporarily during card slide
  document.documentElement.style.overflow = 'hidden';

  const duration = isMobile ? 0.38 : 0.46;

  // Construct snappy GSAP card sliding timeline
  const tl = gsap.timeline({
    onComplete: () => {
      if (safetyTimer) {
        clearTimeout(safetyTimer);
        safetyTimer = null;
      }
      activeTl = null;

      // 1. Temporarily disable CSS smooth scrolling on html & body
      document.documentElement.style.scrollBehavior = 'auto';
      document.body.style.scrollBehavior = 'auto';
      document.documentElement.style.overflow = '';

      // 2. Instantly position window to target section while stage is active
      window.scrollTo(0, toEl.offsetTop);

      // 3. Ensure target section elements are completely visible and resting
      toEl.querySelectorAll('[data-motion]').forEach((el) => {
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'none';
      });

      // 4. Hide transition stage and clear clones
      stage.classList.add('hidden');
      outgoingContent.innerHTML = '';
      incomingContent.innerHTML = '';

      // 5. Restore default scroll behavior
      document.documentElement.style.scrollBehavior = '';
      document.body.style.scrollBehavior = '';

      // 6. Release navigation lock
      isTransitioning = false;
      currentTargetId = null;

      // 7. Re-trigger synchronized entrance on landed section
      animateSectionEntrance(targetSectionId);

      onComplete?.();
    },
  });

  activeTl = tl;

  // T=0ms: Initial state
  gsap.set(outgoingCard, {
    xPercent: 0,
    scale: 1,
    opacity: 1,
  });
  gsap.set(outgoingScrim, { opacity: 0 });

  gsap.set(incomingCard, {
    xPercent: incomingStartX,
    scale: 0.98,
    opacity: 1,
  });

  // 1. Outgoing Card: recedes with slight scale-down & scrim dimming
  tl.to(
    outgoingCard,
    {
      xPercent: outgoingTargetX,
      scale: 0.94,
      opacity: 0.4,
      duration,
      ease: 'power2.inOut',
    },
    0
  );

  tl.to(
    outgoingScrim,
    {
      opacity: 0.55,
      duration,
      ease: 'power2.inOut',
    },
    0
  );

  // 2. Incoming Card: sweeps briskly over top into docked position
  tl.to(
    incomingCard,
    {
      xPercent: 0,
      scale: 1,
      duration,
      ease: 'power3.out',
    },
    0
  );

  // 3. Coordinated internal components motion in direction of card entrance
  const innerElements = incomingContent.querySelectorAll<HTMLElement>(
    '[data-motion="featured-game"], [data-motion="side-games-stack"], [data-motion="supported-games-header"], [data-motion="supported-games-track"], [data-motion="hero-content"], [data-motion="tournaments-filter"], [data-motion="tournament-card"], [data-motion="how-step"], [data-motion="leaderboard-tab"], [data-motion="leaderboard-table"], [data-motion="community-container"]'
  );
  const blocksToAnimate = innerElements.length > 0
    ? Array.from(innerElements).slice(0, 8)
    : Array.from(incomingContent.querySelectorAll<HTMLElement>('h1, h2, .grid > div, p')).slice(0, 6);

  if (blocksToAnimate.length > 0) {
    gsap.set(blocksToAnimate, {
      xPercent: isForward ? 24 : -24,
      opacity: 0.65,
    });

    tl.to(
      blocksToAnimate,
      {
        xPercent: 0,
        opacity: 1,
        duration: duration * 1.05,
        stagger: 0.03,
        ease: 'power2.out',
      },
      0.03
    );
  }

  // Safety fallback: if anything hangs, unlock navigation after 800ms
  safetyTimer = setTimeout(() => {
    cleanStage();
  }, 800);
};

// Re-export for compatibility
export const revealSectionContent = (sectionId: string): void => {
  const section = document.getElementById(sectionId);
  if (!section) return;
  section.querySelectorAll('[data-motion]').forEach((el) => {
    (el as HTMLElement).style.opacity = '1';
    (el as HTMLElement).style.transform = 'none';
  });
};

