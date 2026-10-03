import React, { useState, useEffect, useRef } from 'react';
import { Gamepad2, FileText, Users, Trophy, ChevronRight } from 'lucide-react';
import { howItWorksSteps } from '../../data/howItWorks';
import { HowItWorksStepData } from '../../types';
import { SpeedTypingText } from '../common/SpeedTypingText';

export const HowItWorksSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [typingKey, setTypingKey] = useState<number>(0);
  const lastTriggerTime = useRef<number>(0);

  const triggerTyping = () => {
    const now = Date.now();
    if (now - lastTriggerTime.current < 250) return;
    lastTriggerTime.current = now;
    setIsInView(true);
    setTypingKey((k) => k + 1);
  };

  // Scroll detection via IntersectionObserver (triggers typing while scrolling into view)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Check if element is already within viewport on initial render
    const rect = el.getBoundingClientRect();
    const isCurrentlyVisible = rect.top < window.innerHeight * 0.85 && rect.bottom > 0;
    if (isCurrentlyVisible) {
      setIsInView(true);
      setTypingKey((k) => k + 1);
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
  }, []);

  // Section transition event listener
  useEffect(() => {
    const handleSectionChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ sectionId: string }>;
      if (customEvent.detail?.sectionId === 'how-it-works') {
        triggerTyping();
      }
    };
    window.addEventListener('kurukshetra:section-change', handleSectionChange);
    return () => window.removeEventListener('kurukshetra:section-change', handleSectionChange);
  }, []);

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'gamepad':
        return <Gamepad2 className="w-6 h-6 text-gold-400" />;
      case 'file-text':
        return <FileText className="w-6 h-6 text-gold-400" />;
      case 'users':
        return <Users className="w-6 h-6 text-gold-400" />;
      case 'trophy':
        return <Trophy className="w-6 h-6 text-gold-400" />;
      default:
        return <Gamepad2 className="w-6 h-6 text-gold-400" />;
    }
  };

  return (
    <section 
      id="how-it-works" 
      ref={sectionRef}
      aria-label="How Kurukshetra Works"
      className="relative py-20 bg-dark-950 scroll-mt-20 overflow-hidden"
    >
      {/* Subtle background glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gold-500/5 blur-[120px] pointer-events-none select-none" 
        aria-hidden="true"
      />

      <div 
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isInView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        
        {/* Left/Top Content Header — Fades in with smooth left-to-right glide */}
        <div 
          className={`mb-12 transition-all duration-800 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none ${
            isInView ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
          }`}
        >
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-dark-900 border border-gold-500/40 text-gold-400 text-xs font-bold tracking-widest uppercase mb-3">
            <span className="w-1.5 h-1.5 rotate-45 bg-gold-400 shadow-[0_0_6px_#F5BA41]" />
            <SpeedTypingText
              text="GET STARTED"
              delay={50}
              speed={20}
              showCursor={false}
              triggerKey={typingKey}
              enabled={isInView}
            />
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-wide uppercase mb-3">
            <SpeedTypingText
              text="HOW IT "
              delay={120}
              speed={28}
              showCursor={false}
              triggerKey={typingKey}
              enabled={isInView}
            />
            <SpeedTypingText
              text="WORKS"
              className="text-gold-gradient"
              delay={320}
              speed={28}
              showCursor={true}
              triggerKey={typingKey}
              enabled={isInView}
            />
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            <SpeedTypingText
              text="From registration to glory — a simple path to endless opportunities. Join tournaments, compete, and make your mark."
              delay={480}
              speed={11}
              showCursor={false}
              triggerKey={typingKey}
              enabled={isInView}
            />
          </p>
        </div>

        {/* Step Panels — Staggered horizontal cascade */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative"
        >
          {howItWorksSteps.map((stepData: HowItWorksStepData, idx: number) => (
            <div 
              key={stepData.step} 
              className={`relative flex items-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none ${
                isInView ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
              }`}
              style={{ transitionDelay: `${220 + idx * 90}ms` }}
            >
              {/* Card Surface */}
              <div className="w-full relative rounded-sm p-6 bg-dark-900/90 border border-gold-500/25 hover:border-gold-400/60 transition-all duration-300 shadow-card-depth flex flex-col justify-between min-h-[220px] group">
                {/* Frame Corner Accents */}
                <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-gold-400/50" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-gold-400/50" />

                {/* Top: Step Number & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display font-bold text-2xl text-gold-400/90 tracking-wider">
                    {stepData.step}
                  </span>
                  <div className="w-12 h-12 rounded-full border border-gold-500/30 bg-dark-950 flex items-center justify-center group-hover:scale-110 group-hover:border-gold-400 transition-all shadow-inner">
                    {getStepIcon(stepData.icon)}
                  </div>
                </div>

                {/* Bottom: Title & Description */}
                <div>
                  <h3 className="font-display font-bold text-sm sm:text-base text-white tracking-wider uppercase mb-2 group-hover:text-gold-300 transition-colors">
                    {stepData.title}
                  </h3>
                  <p className="text-neutral-400 text-xs leading-relaxed font-normal">
                    {stepData.description}
                  </p>
                </div>
              </div>

              {/* Connecting Chevron on Desktop between cards */}
              {idx < howItWorksSteps.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 z-20 text-gold-500/40 pointer-events-none">
                  <ChevronRight className="w-6 h-6" />
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

