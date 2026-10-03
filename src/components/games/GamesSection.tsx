import React, { useState, useRef, useEffect } from 'react';
import { Gamepad2, ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Game } from '../../types';
import { FeaturedGame } from './FeaturedGame';
import { SideGameCard } from './SideGameCard';
import { GameCard } from './GameCard';
import { SpeedTypingText } from '../common/SpeedTypingText';

interface GamesSectionProps {
  games: Game[];
  onSelectGameForTournaments: (gameSlug: string) => void;
}

export const GamesSection: React.FC<GamesSectionProps> = ({
  games,
  onSelectGameForTournaments
}) => {
  const [selectedGameSlug, setSelectedGameSlug] = useState<string>('bgmi');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const supportedHeaderRef = useRef<HTMLDivElement>(null);
  const [supportedInView, setSupportedInView] = useState(false);
  const [supportedTypingKey, setSupportedTypingKey] = useState(0);

  useEffect(() => {
    const el = supportedHeaderRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSupportedInView(true);
            setSupportedTypingKey((k) => k + 1);
          } else {
            setSupportedInView(false);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const currentFeaturedGame = games.find(g => g.slug === selectedGameSlug) || games[0];
  
  // Side games stack (4 games: chess, valorant, freefire, rocketleague)
  const sideGames = games.filter(g => ['chess', 'valorant', 'free-fire', 'rocket-league'].includes(g.slug));

  const handleGameSelect = (game: Game) => {
    setSelectedGameSlug(game.slug);
  };

  const handleTogglePause = () => {
    setIsPaused(prev => !prev);
  };

  return (
    <section 
      id="games" 
      data-motion="games-section"
      aria-label="Kurukshetra Games Arena"
      className="relative py-16 sm:py-24 bg-dark-950 scroll-mt-20 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div 
        className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-gold-500/5 blur-[120px] pointer-events-none select-none" 
        aria-hidden="true"
      />

      <div 
        data-motion="games-container"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        
        {/* Top Area: Featured Game & Side Cards Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-16">
          {/* Main Featured Game Card (8 cols) — Settles with smooth scale */}
          <div 
            data-motion="featured-game"
            className="lg:col-span-8 will-change-transform"
          >
            <FeaturedGame 
              game={currentFeaturedGame} 
              onExploreTournaments={onSelectGameForTournaments}
            />
          </div>

          {/* Right 4 Stacked Game Cards (4 cols) — Enters from side with stagger */}
          <div 
            data-motion="side-games-stack"
            className="lg:col-span-4 flex flex-col justify-between gap-3.5"
          >
            {sideGames.map((game) => (
              <div
                key={game.id}
                data-motion="side-game-card"
                className="will-change-transform"
              >
                <SideGameCard
                  game={game}
                  isSelected={currentFeaturedGame.slug === game.slug}
                  onSelect={handleGameSelect}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Supported Games Sub-Header */}
        <div 
          ref={supportedHeaderRef}
          data-motion="supported-games-header"
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-gold-500/20"
        >
          <div className="flex items-center gap-3">
            <div className="p-1.5 sm:p-2 rounded-sm bg-dark-900 border border-gold-500/40 text-gold-400">
              <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-white tracking-wider uppercase">
                <SpeedTypingText
                  text="SUPPORTED GAMES"
                  delay={100}
                  speed={24}
                  enabled={supportedInView}
                  triggerKey={supportedTypingKey}
                />
              </h2>
              <span className="text-[10px] sm:text-xs text-neutral-400 tracking-wider">
                <SpeedTypingText
                  text="Official Competitive Titles"
                  delay={420}
                  speed={16}
                  showCursor={false}
                  enabled={supportedInView}
                  triggerKey={supportedTypingKey}
                />
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* Carousel navigation controls */}
            <div className="flex items-center gap-1.5 bg-dark-900/90 border border-gold-500/30 rounded-sm p-1">
              <button
                data-motion="supported-games-prev"
                type="button"
                aria-label="Scroll games left"
                className="p-1.5 text-neutral-400 hover:text-gold-300 hover:bg-white/5 rounded-sm transition-colors focus:outline-none"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleTogglePause}
                data-motion="supported-games-toggle"
                type="button"
                aria-label={isPaused ? "Play auto scroll" : "Pause auto scroll"}
                className="p-1.5 text-neutral-400 hover:text-gold-300 hover:bg-white/5 rounded-sm transition-colors focus:outline-none"
              >
                {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              </button>
              <button
                data-motion="supported-games-next"
                type="button"
                aria-label="Scroll games right"
                className="p-1.5 text-neutral-400 hover:text-gold-300 hover:bg-white/5 rounded-sm transition-colors focus:outline-none"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <a
              href="#tournaments"
              onClick={(e) => {
                e.preventDefault();
                onSelectGameForTournaments('all');
              }}
              className="group flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-gold-400 hover:text-gold-300 transition-colors focus:outline-none"
            >
              <span>VIEW ALL</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Supported Games Horizontal Motion System */}
        <div className="relative group overflow-hidden">
          {/* Subtle gradient edges for cinematic theater fade */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-dark-950 to-transparent z-10 pointer-events-none hidden sm:block" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-dark-950 to-transparent z-10 pointer-events-none hidden sm:block" />

          {/* Smooth horizontal scroll track */}
          <div 
            ref={carouselRef}
            className="overflow-hidden py-2 px-1 focus:outline-none select-none"
            tabIndex={0}
            aria-label="Supported games list"
          >
            <div 
              data-motion="supported-games-track"
              className="flex gap-3.5 sm:gap-4 w-max will-change-transform"
            >
              {/* Render 2 sets for seamless continuous horizontal motion */}
              {[...games, ...games].map((game, idx) => (
                <div 
                  key={`${game.id}-${idx}`}
                  data-motion="supported-games-card"
                  className="min-w-[150px] sm:min-w-[170px] lg:min-w-[185px] flex-shrink-0 will-change-transform"
                >
                  <GameCard
                    game={game}
                    isSelected={currentFeaturedGame.slug === game.slug}
                    onSelect={handleGameSelect}
                    compact
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};


