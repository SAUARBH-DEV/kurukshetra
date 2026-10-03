import React, { useState } from 'react';
import { Headphones, ArrowRight, Sparkles, Mail } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { SpeedTypingText } from '../common/SpeedTypingText';

interface HelpCommunitySectionProps {
  onOpenHelp: () => void;
}

export const HelpCommunitySection: React.FC<HelpCommunitySectionProps> = ({ onOpenHelp }) => {
  const { ref: sectionRef, inView } = useInView({ threshold: 0.1 });
  const [socialToast, setSocialToast] = useState<string | null>(null);

  const handleSocialClick = (platform: string) => {
    setSocialToast(`${platform} Portal — COMING SOON`);
    setTimeout(() => {
      setSocialToast(null);
    }, 2800);
  };

  const socialLinks = [
    { name: 'Discord', icon: 'discord', label: 'Discord Community' },
    { name: 'Instagram', icon: 'instagram', label: 'Instagram' },
    { name: 'Twitter/X', icon: 'twitter', label: 'Twitter' },
    { name: 'YouTube', icon: 'youtube', label: 'YouTube Stream' },
    { name: 'Email', icon: 'mail', label: 'Support Email' },
  ];

  return (
    <section 
      id="community" 
      ref={sectionRef}
      aria-label="Kurukshetra Support and Community Hub"
      className="relative pt-16 pb-28 min-h-[80vh] flex flex-col justify-between bg-dark-950 scroll-mt-20 border-t border-gold-500/20 overflow-hidden"
    >
      
      {/* Toast Alert for Coming Soon feature */}
      {socialToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-dark-900 border border-gold-400 text-gold-300 px-4 py-2.5 rounded-sm shadow-gold-glow text-xs font-semibold tracking-wider uppercase animate-fade-in flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-gold-400" />
          <span>{socialToast}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Help & Community Main Container matching Page3 */}
        <div 
          data-motion="community-container"
          className={`relative rounded-sm border border-gold-500/30 bg-dark-900/90 p-6 sm:p-8 lg:p-10 shadow-card-depth overflow-hidden transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            inView ? 'opacity-100' : 'opacity-0'
          }`}
        >
          
          {/* Subtle battlefield background art on bottom right */}
          <div className="absolute right-0 bottom-0 w-1/3 h-full pointer-events-none opacity-20 hidden md:block">
            <img
              src="/backgrounds/help-silhouette.png"
              alt=""
              className="w-full h-full object-cover object-right"
            />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            
            {/* Left: NEED HELP? & Support Text — Glides in smoothly from left */}
            <div 
              className={`flex flex-col sm:flex-row sm:items-center gap-6 max-w-xl transition-all duration-700 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none ${
                inView ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
              }`}
            >
              <div 
                className="w-14 h-14 rounded-full border border-gold-500/40 bg-dark-950 flex items-center justify-center text-gold-400 flex-shrink-0 shadow-[0_0_15px_rgba(229,166,45,0.25)]"
              >
                <Headphones className="w-7 h-7" />
              </div>

              <div>
                <h3 className="font-display font-bold text-2xl text-white tracking-wide uppercase mb-1">
                  <SpeedTypingText
                    text="NEED HELP?"
                    delay={160}
                    speed={25}
                    showCursor={false}
                    triggerKey={inView ? 'in-view' : 'out-view'}
                  />
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                  Have questions or facing an issue? We're here to help. Get support for tournaments, registration, accounts, or any other queries.
                </p>
              </div>
            </div>

            {/* Middle: GET HELP CTA Button — Glides in smoothly from left */}
            <div 
              className={`flex-shrink-0 transition-all duration-700 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none ${
                inView ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
              }`}
            >
              <button
                onClick={onOpenHelp}
                type="button"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3 rounded-sm font-semibold text-xs sm:text-sm tracking-wider uppercase text-black bg-gold-gradient shadow-gold-glow hover:shadow-[0_0_25px_rgba(245,186,65,0.7)] hover:scale-[1.02] transition-all focus:outline-none focus:ring-2 focus:ring-gold-300"
              >
                <span>GET HELP</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>

            {/* Right: JOIN OUR COMMUNITY & Social Icons — Glides in smoothly from right */}
            <div 
              className={`flex flex-col sm:items-end gap-3 pt-6 lg:pt-0 border-t lg:border-t-0 border-white/5 transition-all duration-700 delay-250 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none ${
                inView ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-gold-400 uppercase">
                <span className="w-1.5 h-1.5 rotate-45 bg-gold-400" />
                <span>JOIN OUR COMMUNITY</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-sm bg-gold-500/20 text-gold-300 border border-gold-500/40">
                  COMING SOON
                </span>
              </div>

              {/* Social Buttons */}
              <div className="flex items-center gap-2.5">
                {socialLinks.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleSocialClick(item.name)}
                    type="button"
                    aria-label={item.label}
                    className="w-9 h-9 rounded-sm border border-gold-500/30 bg-dark-950 flex items-center justify-center text-neutral-400 hover:text-gold-400 hover:border-gold-400 hover:bg-dark-850 transition-all focus:outline-none focus:ring-1 focus:ring-gold-400"
                  >
                    {item.name === 'Discord' && (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                      </svg>
                    )}
                    {item.name === 'Instagram' && (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    )}
                    {item.name === 'Twitter/X' && (
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    )}
                    {item.name === 'YouTube' && (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    )}
                    {item.name === 'Email' && (
                      <Mail className="w-4 h-4" />
                    )}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Global Footer Sub-Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex items-center gap-3">
            <img 
              src="/brand/emblem.png" 
              alt="Kurukshetra Logo" 
              className="w-6 h-6 object-contain"
            />
            <span className="font-display font-semibold tracking-wider text-neutral-300">
              KURUKSHETRA ESPORTS
            </span>
          </div>

          <p className="text-center sm:text-right text-[11px] text-neutral-400">
            © 2026 Kurukshetra. Built for Indian University Esports. All game titles and trademarks are property of their respective owners.
          </p>
        </div>

      </div>
    </section>
  );
};
