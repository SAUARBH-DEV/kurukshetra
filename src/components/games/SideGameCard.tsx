import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Game } from '../../types';

interface SideGameCardProps {
  game: Game;
  isSelected?: boolean;
  onSelect: (game: Game) => void;
}

export const SideGameCard: React.FC<SideGameCardProps> = ({
  game,
  isSelected = false,
  onSelect
}) => {
  return (
    <div
      onClick={() => onSelect(game)}
      className={`group relative flex items-center justify-between p-3.5 sm:p-4 rounded-sm border overflow-hidden cursor-pointer transition-all duration-300 ${
        isSelected
          ? 'border-gold-400 bg-dark-850 shadow-gold-subtle'
          : 'border-gold-500/20 bg-dark-900/90 hover:border-gold-400/50 hover:bg-dark-850'
      }`}
    >
      {/* Background artwork on right with gradient fade */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 z-0 overflow-hidden">
        <img
          src={game.image}
          alt={game.name}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900/80 to-transparent" />
      </div>

      {/* Content on left */}
      <div className="relative z-10 max-w-[65%]">
        <h3 className="font-display font-bold text-base sm:text-lg text-white tracking-wider group-hover:text-gold-300 transition-colors uppercase">
          {game.name}
        </h3>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {game.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="text-[9px] font-semibold tracking-wider px-1.5 py-0.5 rounded-sm bg-dark-950/80 text-neutral-300 border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action Arrow Circle */}
      <div className="relative z-10 w-8 h-8 rounded-full border border-gold-500/30 flex items-center justify-center text-neutral-400 group-hover:text-black group-hover:bg-gold-400 group-hover:border-gold-400 transition-all flex-shrink-0">
        <ChevronRight className="w-4 h-4" />
      </div>
    </div>
  );
};
