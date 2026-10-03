import React, { useState } from 'react';
import { X, Trophy, CheckCircle, ArrowRight } from 'lucide-react';
import { Tournament } from '../../types';

interface RegistrationModalProps {
  tournament: Tournament | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  tournament,
  isOpen,
  onClose
}) => {
  const [teamName, setTeamName] = useState('');
  const [captainUid, setCaptainUid] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [inGameId, setInGameId] = useState('');
  const [registered, setRegistered] = useState(false);

  if (!isOpen || !tournament) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistered(true);
    setTimeout(() => {
      setRegistered(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-lg rounded-sm border border-gold-500/40 bg-dark-900 p-6 sm:p-8 shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Frame Corners */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-gold-400" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-gold-400" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-gold-400" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-gold-400" />

        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close registration"
          className="absolute top-4 right-4 p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pb-4 border-b border-gold-500/20">
          <div className="flex items-center gap-2 text-gold-400 text-xs font-bold tracking-widest uppercase mb-1">
            <Trophy className="w-3.5 h-3.5" />
            <span>OFFICIAL REGISTRATION</span>
          </div>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-white tracking-wide">
            {tournament.name}
          </h2>
          <div className="flex items-center gap-3 text-xs text-neutral-400 mt-1">
            <span>{tournament.gameName}</span>
            <span>•</span>
            <span className="text-gold-400 font-semibold">{tournament.prizePool} Prize</span>
            <span>•</span>
            <span>{tournament.format}</span>
          </div>
        </div>

        {registered ? (
          <div className="p-8 text-center space-y-3 bg-dark-950/80 rounded-sm border border-gold-500/30">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
            <div className="font-display font-bold text-lg text-white uppercase">
              Registration Recorded!
            </div>
            <p className="text-xs text-neutral-300">
              Team <span className="text-gold-400 font-semibold">{teamName}</span> ({collegeName}) has been reserved for the qualifier bracket.
            </p>
            <div className="text-[10px] text-neutral-400 pt-2 border-t border-white/5">
              Ready for backend database contract verification.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label htmlFor="reg-team" className="block font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                TEAM / ROSTER NAME
              </label>
              <input
                id="reg-team"
                type="text"
                required
                placeholder="e.g. Phoenix Vanguard"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full bg-dark-950 border border-gold-500/30 rounded-sm px-3.5 py-2 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-gold-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="reg-college" className="block font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                  COLLEGE / UNIVERSITY
                </label>
                <input
                  id="reg-college"
                  type="text"
                  required
                  placeholder="e.g. NIT Trichy"
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  className="w-full bg-dark-950 border border-gold-500/30 rounded-sm px-3.5 py-2 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label htmlFor="reg-captain" className="block font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                  CAPTAIN STUDENT ROLL / UID
                </label>
                <input
                  id="reg-captain"
                  type="text"
                  required
                  placeholder="e.g. 106121045"
                  value={captainUid}
                  onChange={(e) => setCaptainUid(e.target.value)}
                  className="w-full bg-dark-950 border border-gold-500/30 rounded-sm px-3.5 py-2 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-gold-400"
                />
              </div>
            </div>

            <div>
              <label htmlFor="reg-ign" className="block font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                CAPTAIN IN-GAME NAME (IGN) & ID
              </label>
              <input
                id="reg-ign"
                type="text"
                required
                placeholder="e.g. KarnaSniper#5192"
                value={inGameId}
                onChange={(e) => setInGameId(e.target.value)}
                className="w-full bg-dark-950 border border-gold-500/30 rounded-sm px-3.5 py-2 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-gold-400"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-sm font-semibold text-xs tracking-wider uppercase text-black bg-gold-gradient shadow-gold-glow hover:shadow-[0_0_20px_rgba(245,186,65,0.6)] transition-all flex items-center justify-center gap-2"
              >
                <span>CONFIRM QUALIFIER REGISTRATION</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
