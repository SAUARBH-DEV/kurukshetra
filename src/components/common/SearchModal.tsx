import React, { useState } from 'react';
import { Search, X, Trophy, Gamepad2, ArrowRight } from 'lucide-react';
import { gamesData } from '../../data/games';
import { tournamentsData } from '../../data/tournaments';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectGame: (slug: string) => void;
  onSelectTournament: (id: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectGame,
  onSelectTournament
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredGames = gamesData.filter((g) =>
    g.name.toLowerCase().includes(query.toLowerCase()) ||
    g.category.toLowerCase().includes(query.toLowerCase()) ||
    g.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredTournaments = tournamentsData.filter((t) =>
    t.name.toLowerCase().includes(query.toLowerCase()) ||
    t.gameName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-2xl rounded-sm border border-gold-500/40 bg-dark-900 shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-gold-500/20 bg-dark-950">
          <Search className="w-5 h-5 text-gold-400 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search games, tournaments, college cups..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-none text-neutral-100 placeholder-neutral-500 text-sm px-3 focus:outline-none"
          />
          <button
            onClick={onClose}
            type="button"
            aria-label="Close search"
            className="p-1 rounded-sm text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          
          {/* Games Match */}
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-gold-400 uppercase mb-3">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>GAMES ({filteredGames.length})</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {filteredGames.slice(0, 4).map((game) => (
                <button
                  key={game.id}
                  onClick={() => {
                    onSelectGame(game.slug);
                    onClose();
                  }}
                  className="flex items-center gap-2.5 p-2 rounded-sm bg-dark-950 border border-white/5 hover:border-gold-500/40 text-left transition-colors group"
                >
                  <img
                    src={game.cardArt}
                    alt={game.name}
                    className="w-8 h-8 rounded-sm object-cover flex-shrink-0"
                  />
                  <div className="overflow-hidden">
                    <div className="text-xs font-semibold text-white group-hover:text-gold-300 truncate">
                      {game.name}
                    </div>
                    <div className="text-[10px] text-neutral-400 truncate">
                      {game.category}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Tournaments Match */}
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-gold-400 uppercase mb-3">
              <Trophy className="w-3.5 h-3.5" />
              <span>TOURNAMENTS ({filteredTournaments.length})</span>
            </div>
            <div className="space-y-2">
              {filteredTournaments.slice(0, 4).map((tournament) => (
                <button
                  key={tournament.id}
                  onClick={() => {
                    onSelectTournament(tournament.id);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-sm bg-dark-950 border border-white/5 hover:border-gold-500/40 text-left transition-colors group"
                >
                  <div>
                    <div className="text-xs font-semibold text-white group-hover:text-gold-300">
                      {tournament.name}
                    </div>
                    <div className="text-[10px] text-neutral-400 mt-0.5">
                      {tournament.gameName} • {tournament.prizePool} Prize • {tournament.date}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-gold-400 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
