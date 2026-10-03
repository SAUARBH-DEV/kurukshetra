import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin once globally
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Global Motion Tokens
 * Centralized configuration based on MOTION_IMPLEMENTATION_PROMPT.md
 */
export const MOTION_TOKENS = {
  durations: {
    fast: 0.2,
    normal: 0.5,
    slow: 0.8,
    heroWrapper: 0.85,
    heroNav: 0.5,
    heroHeading: 0.65,
    heroCopy: 0.5,
    heroActions: 0.5,
    heroStat: 0.45,
    gamesFeatured: 0.7,
    gamesSideCard: 0.5,
    gamesHeader: 0.5,
    supportedCardEntrance: 0.55,
    supportedTrackLoop: 55, // 55s slow, calm, readable continuous glide
  },
  easings: {
    entrance: 'power3.out',
    strongEntrance: 'power4.out',
    standard: 'power2.out',
    snappy: 'back.out(1.7)',
    linear: 'none',
  },
  distances: {
    smallY: 20,
    mediumY: 40,
    largeY: 60,
    navY: -15,
    heroWrapperY: '5vh',
    horizontalEntranceX: 70,
    sideCardX: 35,
  },
  stagger: {
    tight: 0.04,
    loose: 0.1,
    headingLine: 0.14,
    actions: 0.08,
    stats: 0.08,
    sideCards: 0.08,
    supportedCards: 0.045,
  },
};

/**
 * Checks if the user prefers reduced motion
 */
export const isReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * HERO BOOT & TEXT SEQUENCING (Step 1 & Step 2)
 * 
 * Orchestrates the initial cinematic entrance:
 * 1. Main hero wrapper scales and rises (scale 0.95, y: 5vh -> scale 1, y: 0)
 * 2. Decorative frame settles
 * 3. Hero badge and 3-line heading reveal upward with line-by-line masked stagger
 * 4. Global navigation drops into place (delay ~350ms)
 * 5. Supporting description follows heading
 * 6. Hero action buttons follow description
 * 7. Hero statistics cascade into view following CTA
 * 
 * @param scope Root container element for scoping GSAP selectors
 * @returns GSAP Context for React lifecycle cleanup
 */
export const initHeroMotion = (scope?: HTMLElement | null): gsap.Context => {
  return gsap.context((self) => {
    // 1. Reduced motion handling
    if (isReducedMotion()) {
      gsap.set('[data-motion="hero-wrapper"]', { opacity: 1, scale: 1, y: 0 });
      gsap.set('[data-motion="hero-nav"]', { opacity: 1, y: 0 });
      gsap.set('[data-motion="hero-badge"]', { opacity: 1, y: 0 });
      gsap.set('[data-motion="hero-heading"]', { opacity: 1, y: 0 });
      gsap.set('[data-motion="hero-heading-line"]', { opacity: 1, y: 0 });
      gsap.set('[data-motion="hero-copy"]', { opacity: 1, y: 0 });
      gsap.set('[data-motion="hero-actions"]', { opacity: 1, y: 0 });
      gsap.set('[data-motion="hero-stat"]', { opacity: 1, y: 0, scale: 1 });
      gsap.set('[data-motion="hero-frame"]', { opacity: 1 });
      return;
    }

    const q = self.selector ? self.selector : (sel: string) => document.querySelectorAll(sel);

    const tl = gsap.timeline({
      defaults: {
        ease: MOTION_TOKENS.easings.standard,
      },
    });

    // Decorative frame subtle fade in
    const frame = q('[data-motion="hero-frame"]');
    if (frame.length > 0) {
      tl.fromTo(
        frame,
        { opacity: 0 },
        { opacity: 1, duration: 1.0, ease: 'power2.out' },
        0
      );
    }

    // 1. Main Hero Wrapper:
    // scale(0.95), translateY(5vh) -> scale(1), translateY(0)
    const wrapper = q('[data-motion="hero-wrapper"]');
    if (wrapper.length > 0) {
      tl.fromTo(
        wrapper,
        {
          scale: 0.95,
          y: MOTION_TOKENS.distances.heroWrapperY,
          opacity: 0,
        },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: MOTION_TOKENS.durations.heroWrapper,
          ease: MOTION_TOKENS.easings.strongEntrance,
        },
        0
      );
    }

    // Eyebrow badge: glides in smoothly from left
    const badge = q('[data-motion="hero-badge"]');
    if (badge.length > 0) {
      tl.fromTo(
        badge,
        {
          opacity: 0,
          x: -35,
          y: 0,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.55,
          ease: MOTION_TOKENS.easings.entrance,
        },
        0.15
      );
    }

    // 2. Navigation: drops in at 350ms
    const nav = q('[data-motion="hero-nav"]');
    if (nav.length > 0) {
      tl.fromTo(
        nav,
        {
          opacity: 0,
          y: MOTION_TOKENS.distances.navY,
        },
        {
          opacity: 1,
          y: 0,
          duration: MOTION_TOKENS.durations.heroNav,
          ease: MOTION_TOKENS.easings.standard,
        },
        0.35
      );
    }

    // 3. Hero Heading: line-by-line reveal
    const headingLines = q('[data-motion="hero-heading-line"]');
    if (headingLines.length > 0) {
      tl.fromTo(
        headingLines,
        {
          opacity: 0,
          y: '105%',
        },
        {
          opacity: 1,
          y: '0%',
          duration: MOTION_TOKENS.durations.heroHeading,
          ease: MOTION_TOKENS.easings.entrance,
          stagger: MOTION_TOKENS.stagger.headingLine,
        },
        0.20
      );
    } else {
      const heading = q('[data-motion="hero-heading"]');
      if (heading.length > 0) {
        tl.fromTo(
          heading,
          {
            opacity: 0,
            x: -40,
            y: 0,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: MOTION_TOKENS.durations.heroHeading,
            ease: MOTION_TOKENS.easings.entrance,
          },
          0.20
        );
      }
    }

    // 4. Supporting text follows heading: glides in smoothly from left to right
    const copy = q('[data-motion="hero-copy"]');
    if (copy.length > 0) {
      tl.fromTo(
        copy,
        {
          opacity: 0,
          x: -40,
          y: 0,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: MOTION_TOKENS.durations.heroCopy,
          ease: MOTION_TOKENS.easings.standard,
        },
        0.55
      );
    }

    // 5. Hero CTA buttons follow description: glide in smoothly from left to right
    const actions = q('[data-motion="hero-actions"]');
    if (actions.length > 0) {
      const buttons = q('[data-motion="hero-actions"] button');
      if (buttons.length > 0) {
        tl.fromTo(
          buttons,
          {
            opacity: 0,
            x: -30,
            y: 0,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: MOTION_TOKENS.durations.heroActions,
            ease: MOTION_TOKENS.easings.standard,
            stagger: MOTION_TOKENS.stagger.actions,
          },
          0.75
        );
      } else {
        tl.fromTo(
          actions,
          {
            opacity: 0,
            x: -30,
            y: 0,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: MOTION_TOKENS.durations.heroActions,
            ease: MOTION_TOKENS.easings.standard,
          },
          0.75
        );
      }
    }

    // 6. Hero statistics follow CTA buttons: cascade in smoothly from right to left
    const stats = q('[data-motion="hero-stat"]');
    if (stats.length > 0) {
      tl.fromTo(
        stats,
        {
          opacity: 0,
          x: 35,
          y: 0,
          scale: 0.96,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: MOTION_TOKENS.durations.heroStat,
          ease: MOTION_TOKENS.easings.standard,
          stagger: MOTION_TOKENS.stagger.stats,
        },
        0.90
      );
    }
  }, scope || undefined);
};

/**
 * GAMES SECTION & SUPPORTED GAMES MOTION (Step 2)
 * 
 * Orchestrates:
 * 1. ScrollTrigger entrance (play-once, start: top 85%)
 * 2. Featured Game bottom-to-top / slight scale reveal
 * 3. Side game cards entrance from right
 * 4. Supported games header reveal
 * 5. Supported Games cards directional horizontal entrance
 * 6. Subtle, non-aggressive horizontal card-track motion with pause/resume on hover and controls
 * 7. Reduced motion support
 * 
 * @param scope Root container element for scoping GSAP selectors
 * @returns GSAP Context for React lifecycle cleanup
 */
export const initGamesMotion = (scope?: HTMLElement | null): gsap.Context => {
  return gsap.context((self) => {
    // Reduced motion handling
    if (isReducedMotion()) {
      gsap.set('[data-motion="games-section"]', { opacity: 1, y: 0 });
      gsap.set('[data-motion="featured-game"]', { opacity: 1, y: 0, scale: 1 });
      gsap.set('[data-motion="side-game-card"]', { opacity: 1, x: 0 });
      gsap.set('[data-motion="supported-games-header"]', { opacity: 1, y: 0 });
      gsap.set('[data-motion="supported-games-track"]', { x: 0 });
      gsap.set('[data-motion="supported-games-card"]', { opacity: 1, x: 0, scale: 1 });
      return;
    }

    const q = self.selector ? self.selector : (sel: string) => document.querySelectorAll(sel);
    const section = q('[data-motion="games-section"]');
    if (!section || section.length === 0) return;

    // Master entrance timeline for Games Section triggered once on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section[0] as Element,
        start: 'top 85%',
        once: true,
      },
      defaults: {
        ease: MOTION_TOKENS.easings.standard,
      },
    });

    // 1. Featured Game card: glides in smoothly from left with subtle scale
    const featured = q('[data-motion="featured-game"]');
    if (featured.length > 0) {
      tl.fromTo(
        featured,
        {
          opacity: 0,
          x: -45,
          y: 0,
          scale: 0.98,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: MOTION_TOKENS.durations.gamesFeatured,
          ease: MOTION_TOKENS.easings.entrance,
        },
        0
      );
    }

    // 2. Right side stacked cards: enter with stagger from right
    const sideCards = q('[data-motion="side-game-card"]');
    if (sideCards.length > 0) {
      tl.fromTo(
        sideCards,
        {
          opacity: 0,
          x: MOTION_TOKENS.distances.sideCardX,
        },
        {
          opacity: 1,
          x: 0,
          duration: MOTION_TOKENS.durations.gamesSideCard,
          stagger: MOTION_TOKENS.stagger.sideCards,
          ease: MOTION_TOKENS.easings.standard,
        },
        0.15
      );
    }

    // 3. Supported Games header: glides in smoothly from left
    const header = q('[data-motion="supported-games-header"]');
    if (header.length > 0) {
      tl.fromTo(
        header,
        {
          opacity: 0,
          x: -40,
          y: 0,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: MOTION_TOKENS.durations.gamesHeader,
          ease: MOTION_TOKENS.easings.standard,
        },
        0.25
      );
    }

    // 4. Supported Games cards: directional horizontal entrance
    const cards = q('[data-motion="supported-games-card"]');
    if (cards.length > 0) {
      tl.fromTo(
        cards,
        {
          opacity: 0,
          x: MOTION_TOKENS.distances.horizontalEntranceX,
          scale: 0.96,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: MOTION_TOKENS.durations.supportedCardEntrance,
          stagger: MOTION_TOKENS.stagger.supportedCards,
          ease: MOTION_TOKENS.easings.entrance,
        },
        0.35
      );
    }

    // 5. Subtle horizontal card-track motion
    const track = q('[data-motion="supported-games-track"]')[0] as HTMLElement | undefined;
    if (track) {
      // Very slow, smooth, non-aggressive infinite linear loop (55s per half cycle)
      // Perfectly seamless with duplicated content
      const trackTween = gsap.to(track, {
        xPercent: -50,
        duration: MOTION_TOKENS.durations.supportedTrackLoop,
        ease: 'none',
        repeat: -1,
      });

      // Pause / resume on hover to keep cards easily clickable and inspectable
      const carouselContainer = track.parentElement;
      if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => trackTween.pause());
        carouselContainer.addEventListener('mouseleave', () => {
          if (!track.dataset.userPaused) {
            trackTween.play();
          }
        });
      }

      // Connect interactive controls
      const toggleBtn = q('[data-motion="supported-games-toggle"]')[0] as HTMLElement | undefined;
      if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
          if (trackTween.paused()) {
            delete track.dataset.userPaused;
            trackTween.play();
          } else {
            track.dataset.userPaused = 'true';
            trackTween.pause();
          }
        });
      }

      const prevBtn = q('[data-motion="supported-games-prev"]')[0] as HTMLElement | undefined;
      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          const current = trackTween.progress();
          const target = (current - 0.0625 + 1) % 1;
          gsap.to(trackTween, { progress: target, duration: 0.4, ease: 'power2.out' });
        });
      }

      const nextBtn = q('[data-motion="supported-games-next"]')[0] as HTMLElement | undefined;
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          const current = trackTween.progress();
          const target = (current + 0.0625) % 1;
          gsap.to(trackTween, { progress: target, duration: 0.4, ease: 'power2.out' });
        });
      }
    }
  }, scope || undefined);
};

// Re-export Book-Page Transition system for centralized access
export {
  transitionToSection,
  isPageTransitioning,
  getCurrentSectionId,
  revealSectionContent,
  SECTION_ORDER,
} from './bookPageTransition';
