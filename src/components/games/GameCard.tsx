import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Game } from '../../types';

interface GameCardProps {
  game: Game;
  isSelected?: boolean;
  onSelect?: (game: Game) => void;
  compact?: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  isSelected = false,
  onSelect,
  compact = false
}) => {
  return (
    <div
      onClick={() => onSelect && onSelect(game)}
      className={`group relative rounded-sm overflow-hidden cursor-pointer transition-all duration-300 border ${
        isSelected
          ? 'border-gold-400 shadow-[0_0_20px_rgba(229,166,45,0.45)] bg-dark-850'
          : 'border-gold-500/20 hover:border-gold-400/60 bg-dark-900/90 hover:bg-dark-850 hover:shadow-gold-subtle'
      }`}
    >
      {/* Artwork container */}
      <div className={`relative overflow-hidden ${compact ? 'h-24 sm:h-28' : 'h-32 sm:h-36'}`}>
        <img
          src={game.cardArt || game.image}
          alt={game.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent" />
        
        {/* Subtle highlight corner */}
        {isSelected && (
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gold-400 shadow-[0_0_8px_#F5BA41]" />
        )}
      </div>

      {/* Card Details */}
      <div className="p-3 sm:p-4 flex flex-col justify-between">
        <div>
          <h3 className="font-display font-bold text-sm sm:text-base text-neutral-100 tracking-wider group-hover:text-gold-300 transition-colors uppercase truncate">
            {game.name}
          </h3>
          {game.subtitle && !compact && (
            <p className="text-[10px] text-neutral-400 truncate mt-0.5 font-medium uppercase">
              {game.subtitle}
            </p>
          )}
        </div>

        {/* Tags and Action */}
        <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-1.5 overflow-hidden">
            {game.tags.slice(0, 2).map((tag, idx) => (
              <span
                key={idx}
                className="text-[9px] font-semibold tracking-wider px-1.5 py-0.5 rounded-sm bg-dark-950 text-neutral-400 border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action icon circle */}
          <div className="w-6 h-6 rounded-full border border-gold-500/30 flex items-center justify-center text-neutral-400 group-hover:text-black group-hover:bg-gold-400 group-hover:border-gold-400 transition-all flex-shrink-0 ml-1">
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
