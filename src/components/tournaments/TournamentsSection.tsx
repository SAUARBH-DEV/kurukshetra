import React, { useState } from 'react';
import { Trophy, Swords } from 'lucide-react';
import { Tournament, TournamentStatus, Game } from '../../types';
import { TournamentCard } from './TournamentCard';
import { TournamentFilters } from './TournamentFilters';
import { useInView } from '../../hooks/useInView';
import { SpeedTypingText } from '../common/SpeedTypingText';

interface TournamentsSectionProps {
  tournaments: Tournament[];
  games: Game[];
  onOpenRegisterModal: (tournament: Tournament) => void;
  defaultGameFilter?: string;
}

export const TournamentsSection: React.FC<TournamentsSectionProps> = ({
  tournaments,
  games,
  onOpenRegisterModal,
  defaultGameFilter = 'all'
}) => {
  const { ref: sectionRef, inView } = useInView({ threshold: 0.08 });
  const [statusFilter, setStatusFilter] = useState<TournamentStatus | 'all'>('all');
  const [selectedGame, setSelectedGame] = useState<string>(defaultGameFilter);

  const filteredTournaments = tournaments.filter((t) => {
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchesGame = selectedGame === 'all' || t.gameId === selectedGame;
    return matchesStatus && matchesGame;
  });

  return (
    <section 
      id="tournaments" 
      ref={sectionRef}
      aria-label="Kurukshetra Tournament Arena"
      className="relative py-16 sm:py-24 bg-dark-950 scroll-mt-20 overflow-hidden"
    >
      <div 
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          inView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          {/* Header Left Text — Glides in smoothly from left to right */}
          <div 
            className={`transition-all duration-800 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none ${
              inView ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-dark-900 border border-gold-500/40 text-gold-400 text-xs font-bold tracking-widest uppercase mb-3">
              <Swords className="w-3.5 h-3.5 text-gold-400" />
              <SpeedTypingText
                text="COLLEGIATE CHAMPIONSHIPS"
                delay={180}
                speed={22}
                showCursor={false}
                triggerKey={inView ? 'in-view' : 'out-view'}
              />
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-wide uppercase">
              <SpeedTypingText
                text="TOURNAMENT ARENA"
                delay={280}
                speed={24}
                enabled={inView}
              />
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm mt-1 max-w-xl">
              <SpeedTypingText
                text="Official university-sanctioned battlegrounds. Represent your college, claim prize pools, and forge your legacy."
                delay={640}
                speed={12}
                enabled={inView}
                showCursor={false}
              />
            </p>
          </div>

          {/* Header Right Badge — Glides in smoothly from right to left */}
          <div 
            className={`flex items-center gap-3 text-xs text-neutral-400 transition-all duration-800 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none ${
              inView ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Verified College IDs Only
            </span>
          </div>
        </div>

        {/* Filters — Glides in smoothly from left to right */}
        <div 
          className={`transition-all duration-800 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none ${
            inView ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}
        >
          <TournamentFilters
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            selectedGame={selectedGame}
            onGameChange={setSelectedGame}
            games={games.map((g) => ({ id: g.id, name: g.name }))}
          />
        </div>

        {/* Tournament Grid with horizontal progressive reveal */}
        {filteredTournaments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTournaments.map((tournament, idx) => (
              <div
                key={tournament.id}
                className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none ${
                  inView ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                }`}
                style={{ transitionDelay: `${250 + Math.min(idx, 5) * 75}ms` }}
              >
                <TournamentCard
                  tournament={tournament}
                  onRegisterClick={onOpenRegisterModal}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-sm border border-gold-500/20 bg-dark-900/50">
            <Trophy className="w-12 h-12 text-gold-500/40 mx-auto mb-3" />
            <h3 className="font-display font-bold text-lg text-neutral-200 uppercase">
              No Tournaments Found
            </h3>
            <p className="text-neutral-400 text-xs mt-1">
              Try adjusting your filters or check back soon for newly scheduled collegiate qualifiers.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
