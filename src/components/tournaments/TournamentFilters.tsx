import React from 'react';
import { Filter } from 'lucide-react';
import { TournamentStatus } from '../../types';

interface TournamentFiltersProps {
  statusFilter: TournamentStatus | 'all';
  onStatusChange: (status: TournamentStatus | 'all') => void;
  selectedGame: string;
  onGameChange: (game: string) => void;
  games: { id: string; name: string }[];
}

export const TournamentFilters: React.FC<TournamentFiltersProps> = ({
  statusFilter,
  onStatusChange,
  selectedGame,
  onGameChange,
  games
}) => {
  const statusOptions: { label: string; value: TournamentStatus | 'all' }[] = [
    { label: 'ALL TOURNAMENTS', value: 'all' },
    { label: '🔴 LIVE NOW', value: 'live' },
    { label: 'UPCOMING', value: 'upcoming' },
    { label: 'COMPLETED', value: 'completed' },
  ];

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 mb-8 border-b border-gold-500/20">
      {/* Status Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        {statusOptions.map((opt) => {
          const isActive = statusFilter === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onStatusChange(opt.value)}
              type="button"
              className={`px-3.5 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-sm transition-all ${
                isActive
                  ? 'bg-gold-gradient text-black shadow-gold-subtle font-bold'
                  : 'bg-dark-900/80 text-neutral-400 hover:text-white hover:bg-dark-850 border border-white/5'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* Game Selector Dropdown */}
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-gold-400" />
        <select
          value={selectedGame}
          onChange={(e) => onGameChange(e.target.value)}
          aria-label="Filter by Game"
          className="bg-dark-900 border border-gold-500/30 text-neutral-200 text-xs font-medium rounded-sm px-3 py-1.5 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400"
        >
          <option value="all">ALL GAMES</option>
          {games.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
