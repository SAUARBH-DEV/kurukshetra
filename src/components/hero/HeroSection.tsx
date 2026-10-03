import React, { useState, useEffect } from 'react';
import { Landmark, Users, Trophy, Coins, ArrowRight } from 'lucide-react';
import { HeroData } from '../../types';
import { SpeedTypingText } from '../common/SpeedTypingText';

interface HeroSectionProps {
  data: HeroData;
  onExploreTournaments: () => void;
  onJoinCommunity: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  data,
  onExploreTournaments,
  onJoinCommunity
}) => {
  const [typingKey, setTypingKey] = useState<number>(0);

  useEffect(() => {
    const handleSectionChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ sectionId: string }>;
      if (customEvent.detail?.sectionId === 'home') {
        setTypingKey((prev) => prev + 1);
      }
    };

    let wasScrolledDown = false;
    const handleScroll = () => {
      if (window.scrollY > 300) {
        wasScrolledDown = true;
      } else if (wasScrolledDown && window.scrollY < 60) {
        wasScrolledDown = false;
        setTypingKey((prev) => prev + 1);
      }
    };

    window.addEventListener('kurukshetra:section-change', handleSectionChange);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('kurukshetra:section-change', handleSectionChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const getStatIcon = (icon: string) => {
    switch (icon) {
      case 'landmark':
        return <Landmark className="w-5 h-5 sm:w-6 sm:h-6 text-gold-400" />;
      case 'users':
        return <Users className="w-5 h-5 sm:w-6 sm:h-6 text-gold-400" />;
      case 'trophy':
        return <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-gold-400" />;
      case 'coins':
        return <Coins className="w-5 h-5 sm:w-6 sm:h-6 text-gold-400" />;
      default:
        return <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-gold-400" />;
    }
  };

  return (
    <section 
      id="home" 
      aria-label="Kurukshetra Hero Banner"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-start overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-16"
    >
      {/* ====================================================
          LAYER 1: BACKGROUND ARTWORK
          Stable, cinematic environment with NO text, NO buttons, NO stats
          ==================================================== */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        <img 
          src="/backgrounds/hero-bg.webp" 
          alt="" 
          role="presentation"
          className="w-full h-full object-cover object-[70%_center] lg:object-center transform scale-100 will-change-transform" 
        />
      </div>

      {/* ====================================================
          LAYER 2: ATMOSPHERIC EFFECTS & AMBIENT GLOW
          Subtle gold radial lighting & atmospheric smoke depth
          ==================================================== */}
      <div 
        className="absolute inset-0 pointer-events-none select-none z-[1] overflow-hidden"
        aria-hidden="true"
      >
        {/* Soft radial glow behind the primary text block */}
        <div className="absolute top-1/4 left-1/12 w-96 h-96 sm:w-[500px] sm:h-[500px] rounded-full bg-gold-500/10 blur-[100px]" />
        {/* Celestial golden light accent reflecting upward */}
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-gold-400/10 blur-[80px]" />
      </div>

      {/* ====================================================
          LAYER 3: DARK/GRADIENT READABILITY LAYER
          Multi-directional scrims ensuring AAA contrast over artwork
          ==================================================== */}
      <div 
        className="absolute inset-0 pointer-events-none select-none z-[2]"
        aria-hidden="true"
      >
        {/* Horizontal scrim from dark edge on left across to artwork */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950 via-dark-950/85 md:via-dark-950/75 to-transparent w-full md:w-4/5 lg:w-3/5" />
        {/* Top gradient for header integration */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-dark-950 via-dark-950/60 to-transparent" />
        {/* Bottom gradient for smooth transition to the next section */}
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-dark-950 via-dark-950/70 to-transparent" />
      </div>

      {/* ====================================================
          LAYER 4: DECORATIVE FRAME
          Mythological geometric frame with ornate corner brackets
          ==================================================== */}
      <div 
        data-motion="hero-frame"
        className="absolute inset-3 sm:inset-5 lg:inset-7 pointer-events-none z-20 border border-gold-500/25"
        aria-hidden="true"
      >
        <div className="frame-corner-tl" />
        <div className="frame-corner-tr" />
        <div className="frame-corner-bl" />
        <div className="frame-corner-br" />
      </div>

      {/* ====================================================
          LAYER 5: MAIN FOREGROUND WEBSITE COMPOSITION
          Enters from below the viewport (Motion Reference: Video Project 3)
          ==================================================== */}
      <div 
        data-motion="hero-wrapper"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full will-change-transform"
      >
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Sub-layer 5a: Pill Badge */}
          {data.eyebrow && (
            <div 
              data-motion="hero-badge"
              className="inline-flex items-center gap-2 px-3 py-1 mb-5 rounded-full bg-dark-900/90 border border-gold-500/40 text-gold-400 text-xs font-semibold tracking-widest uppercase shadow-[0_0_15px_rgba(229,166,45,0.15)]"
            >
              <span className="text-gold-400 text-xs">◆</span>
              <SpeedTypingText
                text={data.eyebrow}
                delay={100}
                speed={20}
                showCursor={false}
                triggerKey={typingKey}
              />
            </div>
          )}

          {/* Sub-layer 5b: Monumental 3-Line Headline with Speed Typing */}
          <h1 
            data-motion="hero-heading"
            className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-[5rem] font-bold leading-[1.05] tracking-wide mb-4"
          >
            <span className="block overflow-hidden py-0.5">
              <span data-motion="hero-heading-line" className="block text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] will-change-transform">
                <SpeedTypingText
                  text={data.titleLines[0]}
                  delay={160}
                  speed={24}
                  triggerKey={typingKey}
                />
              </span>
            </span>
            <span className="block overflow-hidden py-0.5">
              <span data-motion="hero-heading-line" className="block text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] will-change-transform">
                <SpeedTypingText
                  text={data.titleLines[1]}
                  delay={440}
                  speed={24}
                  triggerKey={typingKey}
                />
              </span>
            </span>
            <span className="block overflow-hidden py-0.5">
              <span data-motion="hero-heading-line" className="block will-change-transform">
                <SpeedTypingText
                  text={data.titleLines[2]}
                  className="text-gold-gradient drop-shadow-[0_0_30px_rgba(229,166,45,0.5)] font-extrabold"
                  delay={700}
                  speed={24}
                  triggerKey={typingKey}
                />
              </span>
            </span>
          </h1>

          {/* Sub-layer 5c: Subtitle & Supporting Description — Typing Wall Effect */}
          <div 
            data-motion="hero-copy"
            className="space-y-3 mb-8 sm:mb-10"
          >
            <h2 className="font-display italic text-lg sm:text-2xl text-neutral-200 font-medium drop-shadow-md">
              <SpeedTypingText
                text={data.subtitle}
                delay={980}
                speed={16}
                triggerKey={typingKey}
              />
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal drop-shadow">
              <SpeedTypingText
                text={data.description}
                delay={1640}
                speed={11}
                triggerKey={typingKey}
              />
            </p>
          </div>

          {/* Sub-layer 5d: CTA Button Group */}
          <div 
            data-motion="hero-actions"
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12 sm:mb-16"
          >
            <button
              onClick={onExploreTournaments}
              type="button"
              id="hero-explore-cta"
              className="inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-sm font-semibold text-xs sm:text-sm tracking-wider uppercase text-black bg-gold-gradient shadow-gold-glow hover:shadow-[0_0_35px_rgba(245,186,65,0.75)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-gold-300"
            >
              <span>{data.primaryCta.text}</span>
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onJoinCommunity}
              type="button"
              id="hero-join-cta"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-sm font-semibold text-xs sm:text-sm tracking-wider uppercase text-neutral-200 bg-dark-900/90 border border-gold-500/40 hover:border-gold-400 hover:text-gold-300 hover:bg-dark-850 hover:shadow-gold-subtle transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold-500"
            >
              {data.secondaryCta.text}
            </button>
          </div>

          {/* Sub-layer 5e: Statistics Bar */}
          <div 
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-gold-500/25 max-w-2xl"
          >
            {data.stats.map((stat, idx) => (
              <div 
                key={idx} 
                data-motion="hero-stat"
                className="flex items-center gap-3 will-change-transform"
              >
                <div className="p-2 sm:p-2.5 rounded-sm bg-dark-900/80 border border-gold-500/30 flex-shrink-0 shadow-inner">
                  {getStatIcon(stat.icon)}
                </div>
                <div>
                  <div className="font-display font-bold text-lg sm:text-xl text-neutral-100 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-xs font-semibold text-neutral-400 tracking-wider uppercase">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
