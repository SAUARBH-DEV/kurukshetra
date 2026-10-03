import React from 'react';
import { Calendar, Users, Trophy, CheckCircle, Clock } from 'lucide-react';
import { Tournament } from '../../types';

interface TournamentCardProps {
  tournament: Tournament;
  onRegisterClick: (tournament: Tournament) => void;
}

export const TournamentCard: React.FC<TournamentCardProps> = ({
  tournament,
  onRegisterClick
}) => {
  const getStatusBadge = () => {
    switch (tournament.status) {
      case 'live':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[10px] font-bold tracking-wider uppercase bg-red-950/80 text-red-400 border border-red-500/40">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            LIVE NOW
          </span>
        );
      case 'upcoming':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[10px] font-bold tracking-wider uppercase bg-gold-950/80 text-gold-400 border border-gold-500/40">
            <Clock className="w-3 h-3 text-gold-400" />
            REGISTRATION OPEN
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[10px] font-bold tracking-wider uppercase bg-neutral-900 text-neutral-400 border border-white/10">
            <CheckCircle className="w-3 h-3 text-neutral-400" />
            CONCLUDED
          </span>
        );
    }
  };

  const getCtaLabel = () => {
    switch (tournament.status) {
      case 'live':
        return 'WATCH STREAM';
      case 'upcoming':
        return 'REGISTER SQUAD';
      case 'completed':
        return 'VIEW BRACKETS';
    }
  };

  const fillPercentage = Math.round((tournament.registeredTeams / tournament.maxTeams) * 100);

  return (
    <div className="relative rounded-sm overflow-hidden border border-gold-500/20 bg-dark-900/90 hover:border-gold-400/50 hover:bg-dark-850 transition-all duration-300 shadow-card-depth flex flex-col justify-between group">
      {/* Top Banner & Badges */}
      <div className="p-4 sm:p-5 pb-3">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-2 py-0.5 rounded-sm bg-dark-950 text-gold-400 border border-gold-500/30 text-[10px] font-bold tracking-wider uppercase">
            {tournament.gameName}
          </span>
          {getStatusBadge()}
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-gold-300 transition-colors line-clamp-1">
          {tournament.name}
        </h3>
      </div>

      {/* Middle Specs */}
      <div className="px-4 sm:px-5 py-3 space-y-2.5 border-t border-white/5 text-xs text-neutral-300">
        <div className="flex items-center justify-between">
          <span className="text-neutral-400 flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-gold-400" />
            Prize Pool
          </span>
          <span className="font-bold text-gold-300 text-sm">
            {tournament.prizePool}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-neutral-400 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-neutral-400" />
            Date & Time
          </span>
          <span className="font-medium text-neutral-200">
            {tournament.date}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-neutral-400 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-neutral-400" />
            Format
          </span>
          <span className="font-medium text-neutral-200">
            {tournament.format}
          </span>
        </div>

        {/* Registration Fill Meter */}
        <div className="pt-2">
          <div className="flex justify-between text-[11px] mb-1">
            <span className="text-neutral-400">Slots Filled</span>
            <span className="text-gold-400 font-semibold">{tournament.registeredTeams} / {tournament.maxTeams} Teams</span>
          </div>
          <div className="w-full bg-dark-950 h-1.5 rounded-full overflow-hidden border border-white/5">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                tournament.status === 'live' 
                  ? 'bg-red-500' 
                  : 'bg-gold-500'
              }`}
              style={{ width: `${fillPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="p-4 sm:p-5 pt-3 border-t border-white/5 bg-dark-950/40">
        <button
          onClick={() => onRegisterClick(tournament)}
          type="button"
          className={`w-full py-2.5 px-4 rounded-sm font-semibold text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 ${
            tournament.status === 'live'
              ? 'bg-red-500 hover:bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]'
              : tournament.status === 'upcoming'
              ? 'bg-gold-gradient hover:shadow-gold-glow text-black'
              : 'bg-dark-800 hover:bg-dark-700 text-neutral-300 border border-white/10'
          }`}
        >
          {getCtaLabel()}
        </button>
      </div>
    </div>
  );
};
