import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Users, Trophy, UsersRound } from 'lucide-react';
import { Game } from '../../types';
import { SpeedTypingText } from '../common/SpeedTypingText';

interface FeaturedGameProps {
  game: Game;
  onExploreTournaments: (gameSlug: string) => void;
}

export const FeaturedGame: React.FC<FeaturedGameProps> = ({
  game,
  onExploreTournaments
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState<boolean>(false);
  const [sequenceKey, setSequenceKey] = useState<string>(`${game.slug}-0`);
  const lastTriggerTime = useRef<number>(0);

  const triggerTyping = () => {
    const now = Date.now();
    if (now - lastTriggerTime.current < 250) return;
    lastTriggerTime.current = now;
    setIsInView(true);
    setSequenceKey(`${game.slug}-${now}`);
  };

  // 1. Scroll detection via IntersectionObserver (types while scrolling into section)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Check if element is already within viewport on initial render
    const rect = el.getBoundingClientRect();
    const isCurrentlyVisible = rect.top < window.innerHeight * 0.85 && rect.bottom > 0;
    if (isCurrentlyVisible) {
      setIsInView(true);
      setSequenceKey(`${game.slug}-${Date.now()}`);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            triggerTyping();
          } else {
            // When user scrolls away, reset so it re-types when scrolling back
            setIsInView(false);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [game.slug]);

  // 2. Selection changes (when clicking side cards)
  useEffect(() => {
    triggerTyping();
  }, [game.slug]);

  // 3. Header navigation tap ("Games" section in upper header / hero)
  useEffect(() => {
    const handleSectionChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ sectionId: string }>;
      if (customEvent.detail?.sectionId === 'games') {
        triggerTyping();
      }
    };

    window.addEventListener('kurukshetra:section-change', handleSectionChange);
    return () => window.removeEventListener('kurukshetra:section-change', handleSectionChange);
  }, [game.slug]);

  return (
    <div 
      ref={containerRef}
      className="relative rounded-sm overflow-hidden border border-gold-500/30 bg-dark-900 shadow-card-depth group"
    >
      {/* Background Artwork Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src={game.image}
          alt={game.name}
          className="w-full h-full object-cover object-center lg:object-right transition-transform duration-700 group-hover:scale-105"
        />
        {/* Gradient Scrim for readable text overlay on left */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950 via-dark-950/85 to-dark-950/30 lg:w-3/4" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/50 to-transparent" />
      </div>

      {/* Frame Accent Corners */}
      <div className="absolute inset-2 pointer-events-none border border-gold-500/15 z-10">
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold-400" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gold-400" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gold-400" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold-400" />
      </div>

      {/* Foreground Content */}
      <div 
        key={sequenceKey}
        className="relative z-10 p-6 sm:p-8 lg:p-10 flex flex-col justify-between min-h-[420px] lg:min-h-[460px] max-w-xl animate-slide-left"
      >
        <div>
          {/* Eyebrow / Featured Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-dark-950/80 border border-gold-500/50 backdrop-blur-md mb-5">
            <span className="w-1.5 h-1.5 rotate-45 bg-gold-400 shadow-[0_0_6px_#F5BA41]" />
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-gold-400 uppercase">
              <SpeedTypingText
                text="FEATURED GAME"
                delay={50}
                speed={18}
                showCursor={false}
                triggerKey={sequenceKey}
                enabled={isInView}
              />
            </span>
          </div>

          {/* Huge Title */}
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-wider mb-1 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
            <SpeedTypingText
              text={game.name}
              delay={100}
              speed={28}
              showCursor={true}
              triggerKey={sequenceKey}
              enabled={isInView}
            />
          </h2>

          {/* Subtitle */}
          {game.subtitle && (
            <div className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-gold-400/90 uppercase mb-4">
              <SpeedTypingText
                text={game.subtitle}
                delay={260}
                speed={18}
                showCursor={true}
                triggerKey={sequenceKey}
                enabled={isInView}
              />
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {game.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 text-[10px] sm:text-xs font-semibold tracking-wider text-neutral-300 bg-dark-950/80 border border-gold-500/20 rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-6 font-normal min-h-[3.6rem]">
            <SpeedTypingText
              text={game.description || ''}
              delay={500}
              speed={10}
              showCursor={false}
              triggerKey={sequenceKey}
              enabled={isInView}
            />
          </p>
        </div>

        {/* Stats and CTA */}
        <div>
          {/* Stats Bar */}
          {game.stats && (
            <div className="grid grid-cols-3 gap-3 py-4 border-y border-gold-500/20 mb-6 bg-dark-950/40 backdrop-blur-sm px-2 rounded-sm">
              {game.stats.map((st, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  {idx === 0 && <Users className="w-4 h-4 text-gold-400 flex-shrink-0" />}
                  {idx === 1 && <Trophy className="w-4 h-4 text-gold-400 flex-shrink-0" />}
                  {idx === 2 && <UsersRound className="w-4 h-4 text-gold-400 flex-shrink-0" />}
                  <div>
                    <div className="font-display font-bold text-sm sm:text-base text-neutral-100">
                      {st.value}
                    </div>
                    <div className="text-[9px] font-semibold text-neutral-400 uppercase tracking-wider">
                      {st.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA Button */}
          <button
            onClick={() => onExploreTournaments(game.slug)}
            type="button"
            className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-sm font-semibold text-xs sm:text-sm tracking-wider uppercase text-black bg-gold-gradient shadow-gold-glow hover:shadow-[0_0_25px_rgba(245,186,65,0.7)] hover:scale-[1.01] active:scale-[0.98] transition-all group focus:outline-none focus:ring-2 focus:ring-gold-300"
          >
            <span>{game.ctaText || `EXPLORE ${game.name} TOURNAMENTS`}</span>
            <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
