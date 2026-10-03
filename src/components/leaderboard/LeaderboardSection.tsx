import React, { useState } from 'react';
import { Crown, Trophy, ArrowUp, ArrowDown, Minus, ArrowRight, ShieldCheck } from 'lucide-react';
import { LeaderboardEntry } from '../../types';
import {
  leaderboardColleges,
  leaderboardTeams,
  leaderboardPlayers,
  userRankData
} from '../../data/leaderboard';
import { useInView } from '../../hooks/useInView';
import { SpeedTypingText } from '../common/SpeedTypingText';

export const LeaderboardSection: React.FC = () => {
  const { ref: sectionRef, inView } = useInView({ threshold: 0.08 });
  const [activeTab, setActiveTab] = useState<'colleges' | 'teams' | 'players'>('colleges');
  const [expanded, setExpanded] = useState(false);

  const getEntries = (): LeaderboardEntry[] => {
    switch (activeTab) {
      case 'colleges':
        return expanded ? leaderboardColleges : leaderboardColleges.slice(0, 5);
      case 'teams':
        return expanded ? leaderboardTeams : leaderboardTeams.slice(0, 5);
      case 'players':
        return expanded ? leaderboardPlayers : leaderboardPlayers.slice(0, 5);
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="w-7 h-7 rounded-full bg-gradient-to-b from-yellow-300 to-amber-600 text-black font-extrabold flex items-center justify-center text-xs shadow-[0_0_10px_rgba(245,186,65,0.6)]">
          1
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="w-7 h-7 rounded-full bg-gradient-to-b from-slate-200 to-slate-400 text-black font-extrabold flex items-center justify-center text-xs shadow-sm">
          2
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="w-7 h-7 rounded-full bg-gradient-to-b from-amber-600 to-amber-800 text-white font-extrabold flex items-center justify-center text-xs shadow-sm">
          3
        </div>
      );
    }
    return (
      <div className="w-7 h-7 rounded-full bg-dark-950 text-neutral-400 font-bold flex items-center justify-center text-xs border border-white/10">
        {rank}
      </div>
    );
  };

  const renderTrend = (trend: string, dir: 'up' | 'down' | 'neutral') => {
    if (dir === 'up') {
      return (
        <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold text-xs">
          <ArrowUp className="w-3 h-3" />
          {trend}
        </span>
      );
    }
    if (dir === 'down') {
      return (
        <span className="inline-flex items-center gap-1 text-red-400 font-semibold text-xs">
          <ArrowDown className="w-3 h-3" />
          {trend}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-neutral-400 font-semibold text-xs">
        <Minus className="w-3 h-3" />
        {trend}
      </span>
    );
  };

  return (
    <section 
      id="leaderboard" 
      ref={sectionRef}
      aria-label="Kurukshetra Rankings and Leaderboard"
      className="relative py-20 bg-dark-950 scroll-mt-20 overflow-hidden"
    >
      <div 
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          inView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        
        {/* Main Grid: Left Column, Center Table, Right Your Rank Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Title, Subtitle, Tabs, Artwork (4 cols) — Glides in smoothly from left */}
          <div 
            className={`lg:col-span-4 flex flex-col justify-between h-full transition-all duration-800 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none ${
              inView ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
            }`}
          >
            <div>
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-dark-900 border border-gold-500/40 text-gold-400 text-xs font-bold tracking-widest uppercase mb-3">
                <span className="w-1.5 h-1.5 rotate-45 bg-gold-400 shadow-[0_0_6px_#F5BA41]" />
                <SpeedTypingText
                  text="RANKINGS"
                  delay={160}
                  speed={24}
                  showCursor={false}
                  triggerKey={inView ? 'in-view' : 'out-view'}
                />
              </div>

              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-wide uppercase mb-3">
                <SpeedTypingText
                  text="LEADER"
                  delay={240}
                  speed={24}
                  showCursor={false}
                  enabled={inView}
                />
                <SpeedTypingText
                  text="BOARD"
                  className="text-gold-gradient"
                  delay={380}
                  speed={24}
                  enabled={inView}
                />
              </h2>

              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                <SpeedTypingText
                  text="Top colleges. Top teams. Top players. See who's leading the battleground."
                  delay={580}
                  speed={12}
                  showCursor={false}
                  enabled={inView}
                />
              </p>

              {/* Tabs */}
              <div className="flex flex-wrap gap-2 mb-8">
                <button
                  onClick={() => setActiveTab('colleges')}
                  type="button"
                  className={`px-4 py-2 rounded-sm text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 ${
                    activeTab === 'colleges'
                      ? 'bg-gold-gradient text-black shadow-gold-subtle'
                      : 'bg-dark-900/90 text-neutral-400 hover:text-white border border-white/5'
                  }`}
                >
                  <Trophy className="w-3.5 h-3.5" />
                  COLLEGES
                </button>

                <button
                  onClick={() => setActiveTab('teams')}
                  type="button"
                  className={`px-4 py-2 rounded-sm text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 ${
                    activeTab === 'teams'
                      ? 'bg-gold-gradient text-black shadow-gold-subtle'
                      : 'bg-dark-900/90 text-neutral-400 hover:text-white border border-white/5'
                  }`}
                >
                  TEAMS
                </button>

                <button
                  onClick={() => setActiveTab('players')}
                  type="button"
                  className={`px-4 py-2 rounded-sm text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 ${
                    activeTab === 'players'
                      ? 'bg-gold-gradient text-black shadow-gold-subtle'
                      : 'bg-dark-900/90 text-neutral-400 hover:text-white border border-white/5'
                  }`}
                >
                  PLAYERS
                </button>
              </div>
            </div>

            {/* Warrior Artwork from reference */}
            <div className="relative rounded-sm overflow-hidden border border-gold-500/20 bg-dark-900/40 hidden lg:block">
              <img
                src="/leaderboard/warrior-silhouette.png"
                alt="Kurukshetra Commander"
                className="w-full h-48 object-cover object-top opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-[11px] text-gold-400/90 font-semibold tracking-wider uppercase text-center">
                “Victory belongs to the disciplined.”
              </div>
            </div>
          </div>

          {/* Center Table (5 cols) — Glides in smoothly from left */}
          <div 
            className={`lg:col-span-5 transition-all duration-800 delay-250 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none ${
              inView ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
            }`}
          >
            <div className="rounded-sm border border-gold-500/30 bg-dark-900/90 overflow-hidden shadow-card-depth">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-dark-950 border-b border-gold-500/20 text-neutral-400 uppercase font-semibold tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4 w-12 text-center">#</th>
                      <th className="py-3.5 px-4 uppercase">{activeTab === 'colleges' ? 'COLLEGE' : activeTab === 'teams' ? 'TEAM' : 'PLAYER'}</th>
                      <th className="py-3.5 px-4 text-center">WINS</th>
                      <th className="py-3.5 px-4 text-center">POINTS</th>
                      <th className="py-3.5 px-4 text-center">TREND</th>
                    </tr>
                  </thead>
                  <tbody key={activeTab} className="divide-y divide-white/5 animate-slide-left">
                    {getEntries().map((entry) => (
                      <tr 
                        key={entry.rank}
                        className="hover:bg-dark-850/80 transition-colors"
                      >
                        <td className="py-3 px-4 text-center">
                          <div className="flex justify-center">
                            {getRankBadge(entry.rank)}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            {entry.logo && (
                              <img
                                src={entry.logo}
                                alt={entry.name}
                                className="w-7 h-7 rounded-full object-contain p-0.5 bg-dark-950 border border-gold-500/30 flex-shrink-0"
                              />
                            )}
                            <div className="font-semibold text-neutral-100 flex items-center gap-1.5">
                              <span>{entry.name}</span>
                              {entry.verified && (
                                <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center font-bold text-neutral-200">
                          {entry.wins}
                        </td>
                        <td className="py-3 px-4 text-center font-bold text-gold-400">
                          {entry.points.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {renderTrend(entry.trend, entry.trendDirection)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="p-4 bg-dark-950/80 border-t border-gold-500/20 flex items-center justify-between">
                <span className="text-xs text-neutral-400">
                  Showing {expanded ? 'All' : 'Top 5'} {activeTab.toUpperCase()}
                </span>
                <button
                  onClick={() => setExpanded(!expanded)}
                  type="button"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-gold-500/40 text-gold-300 hover:text-gold-200 hover:border-gold-400 text-xs font-semibold tracking-wider uppercase transition-colors"
                >
                  <span>{expanded ? 'SHOW TOP 5' : 'VIEW FULL LEADERBOARD'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: "YOUR RANK" Panel (3 cols) — Slides in smoothly from right */}
          <div 
            className={`lg:col-span-3 transition-all duration-900 delay-350 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none ${
              inView ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
            }`}
          >
            <div className="rounded-sm border border-gold-500/40 bg-dark-900/95 p-6 shadow-card-depth relative overflow-hidden group">
              {/* Corner Frame Accents */}
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-gold-400" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-gold-400" />

              {/* Header: Crown & Title */}
              <div className="flex items-center gap-2 text-gold-400 mb-6 pb-3 border-b border-gold-500/20">
                <Crown className="w-5 h-5 text-gold-400" />
                <span className="font-display font-bold text-sm tracking-widest uppercase">
                  YOUR RANK
                </span>
              </div>

              {/* College Identity */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full border-2 border-gold-400/80 p-1 bg-dark-950 flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(229,166,45,0.4)]">
                  <img
                    src={userRankData.logo}
                    alt={userRankData.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-white">
                    {userRankData.name}
                  </h3>
                  <p className="text-xs text-gold-400 font-semibold tracking-wider">
                    {userRankData.rankText}
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2 py-4 border-y border-white/5 mb-6 text-center">
                <div>
                  <div className="font-display font-bold text-lg text-white">
                    {userRankData.wins}
                  </div>
                  <div className="text-[10px] text-neutral-400 uppercase font-semibold">
                    Wins
                  </div>
                </div>

                <div className="border-x border-white/5">
                  <div className="font-display font-bold text-lg text-gold-400">
                    {userRankData.points}
                  </div>
                  <div className="text-[10px] text-neutral-400 uppercase font-semibold">
                    Points
                  </div>
                </div>

                <div>
                  <div className="font-display font-bold text-lg text-emerald-400 flex items-center justify-center gap-0.5">
                    <ArrowUp className="w-3 h-3" />
                    +2
                  </div>
                  <div className="text-[10px] text-neutral-400 uppercase font-semibold">
                    This Week
                  </div>
                </div>
              </div>

              {/* Quote Block */}
              <blockquote className="italic text-xs text-neutral-300 leading-relaxed pl-3 border-l-2 border-gold-500/50">
                “{userRankData.quote}”
              </blockquote>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
