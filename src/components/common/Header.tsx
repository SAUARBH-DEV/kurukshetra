import React, { useState, useEffect } from 'react';
import { Search, User, Menu, X, Shield } from 'lucide-react';

interface HeaderProps {
  onOpenLogin: () => void;
  onOpenSearch: () => void;
  onNavigate?: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenLogin, onOpenSearch, onNavigate }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // 1. Detect if user is scrolled to the absolute bottom of the page (Community hub)
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 70;
      if (isAtBottom) {
        setActiveSection('community');
        return;
      }

      // 2. Section detection from bottom to top
      const sections = ['community', 'leaderboard', 'how-it-works', 'tournaments', 'games', 'home'];
      const scrollPosition = window.scrollY + 180;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el && scrollPosition >= el.offsetTop) {
          // If how-it-works is reached, map to tournaments since it's part of the discovery flow
          if (sectionId === 'how-it-works') {
            setActiveSection('tournaments');
          } else {
            setActiveSection(sectionId);
          }
          break;
        }
      }
    };

    const handleSectionChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ sectionId: string }>;
      if (customEvent.detail?.sectionId) {
        setActiveSection(customEvent.detail.sectionId);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('kurukshetra:section-change', handleSectionChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('kurukshetra:section-change', handleSectionChange);
    };
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Games', href: '#games', id: 'games' },
    { label: 'Tournaments', href: '#tournaments', id: 'tournaments' },
    { label: 'Leaderboard', href: '#leaderboard', id: 'leaderboard' },
    { label: 'Community', href: '#community', id: 'community' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const sectionId = href.replace('#', '');
    setActiveSection(sectionId);
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header 
      data-motion="hero-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,padding,border-color,box-shadow] duration-300 ${
        scrolled 
          ? 'bg-dark-950/90 backdrop-blur-md border-b border-border-gold shadow-lg shadow-black/50 py-3' 
          : 'bg-gradient-to-b from-dark-950/80 via-dark-950/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo & Tagline */}
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
          className="flex items-center gap-3.5 group focus:outline-none focus:ring-1 focus:ring-gold-500 rounded-sm"
        >
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0 flex items-center justify-center">
            <img 
              src="/brand/emblem.png" 
              alt="Kurukshetra Golden Star Emblem" 
              className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(229,166,45,0.6)] group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg sm:text-xl tracking-[0.2em] text-neutral-100 group-hover:text-gold-400 transition-colors">
              KURUKSHETRA
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-gold-500 font-semibold uppercase">
              THE BATTLE. THE GLORY. THE LEGACY.
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`relative px-3.5 py-1.5 text-xs lg:text-sm font-medium tracking-wider uppercase transition-all duration-200 focus:outline-none focus:text-gold-400 ${
                  isActive 
                    ? 'text-neutral-100 font-semibold' 
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent shadow-[0_0_8px_rgba(229,166,45,0.8)]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            type="button"
            aria-label="Search tournaments and games"
            className="p-2 text-neutral-400 hover:text-gold-400 hover:bg-white/5 rounded-full transition-colors focus:outline-none focus:ring-1 focus:ring-gold-500"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Login Button */}
          <button
            onClick={onOpenLogin}
            type="button"
            className="px-4 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-neutral-200 bg-dark-900/80 border border-gold-500/40 hover:border-gold-400 hover:text-gold-300 hover:shadow-[0_0_15px_rgba(229,166,45,0.3)] rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-gold-500/50"
          >
            LOGIN
          </button>

          {/* Profile Icon */}
          <button
            onClick={onOpenLogin}
            type="button"
            aria-label="User profile"
            className="p-1.5 sm:p-2 rounded-full border border-gold-500/30 text-neutral-400 hover:text-gold-400 hover:border-gold-400 transition-colors focus:outline-none focus:ring-1 focus:ring-gold-500"
          >
            <User className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden p-2 text-neutral-400 hover:text-gold-400 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-dark-950/95 border-b border-border-gold backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 mt-2 shadow-2xl animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              className={`block px-4 py-2.5 text-sm font-medium tracking-wider uppercase rounded-md transition-colors ${
                activeSection === link.id
                  ? 'bg-gold-500/10 text-gold-400 border-l-2 border-gold-400'
                  : 'text-neutral-300 hover:bg-white/5 hover:text-neutral-100'
              }`}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-neutral-500 tracking-wider">INDIA'S ESPORTS HUB</span>
            <div className="flex items-center gap-1.5 text-xs text-gold-500">
              <Shield className="w-3.5 h-3.5" />
              <span>COLLEGIATE DIVISION</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
