import React, { useState, useLayoutEffect, useRef } from 'react';
import { Header } from './components/common/Header';
import { HeroSection } from './components/hero/HeroSection';
import { GamesSection } from './components/games/GamesSection';
import { TournamentsSection } from './components/tournaments/TournamentsSection';
import { HowItWorksSection } from './components/howitworks/HowItWorksSection';
import { LeaderboardSection } from './components/leaderboard/LeaderboardSection';
import { HelpCommunitySection } from './components/community/HelpCommunitySection';
import { LoginModal } from './components/common/LoginModal';
import { SearchModal } from './components/common/SearchModal';
import { HelpModal } from './components/common/HelpModal';
import { RegistrationModal } from './components/tournaments/RegistrationModal';

import { heroData } from './data/hero';
import { gamesData } from './data/games';
import { tournamentsData } from './data/tournaments';
import { Tournament } from './types';
import { initHeroMotion, initGamesMotion, transitionToSection } from './lib/motion';

export const App: React.FC = () => {
  const appRef = useRef<HTMLDivElement>(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [tournamentGameFilter, setTournamentGameFilter] = useState('all');

  useLayoutEffect(() => {
    const heroCtx = initHeroMotion(appRef.current);
    const gamesCtx = initGamesMotion(appRef.current);
    return () => {
      heroCtx.revert();
      gamesCtx.revert();
    };
  }, []);

  const handleNavigate = (sectionId: string) => {
    transitionToSection(sectionId);
  };

  const handleSelectGameForTournaments = (gameSlug: string) => {
    setTournamentGameFilter(gameSlug);
    handleNavigate('tournaments');
  };

  const handleSelectGameFromSearch = (slug: string) => {
    setTournamentGameFilter(slug);
    handleNavigate('tournaments');
  };

  const handleSelectTournamentFromSearch = (id: string) => {
    const found = tournamentsData.find(t => t.id === id);
    if (found) {
      setSelectedTournament(found);
    }
    handleNavigate('tournaments');
  };

  return (
    <div ref={appRef} className="min-h-screen bg-dark-950 text-neutral-100 flex flex-col font-sans selection:bg-gold-500 selection:text-black">
      
      {/* Global Header */}
      <Header
        onOpenLogin={() => setLoginModalOpen(true)}
        onOpenSearch={() => setSearchModalOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* SECTION 1 — HOME / HERO */}
        <HeroSection
          data={heroData}
          onExploreTournaments={() => handleNavigate('tournaments')}
          onJoinCommunity={() => handleNavigate('community')}
        />

        {/* SECTION 2 — GAMES & TOURNAMENTS */}
        <GamesSection
          games={gamesData}
          onSelectGameForTournaments={handleSelectGameForTournaments}
        />

        <TournamentsSection
          tournaments={tournamentsData}
          games={gamesData}
          onOpenRegisterModal={(tournament) => setSelectedTournament(tournament)}
          defaultGameFilter={tournamentGameFilter}
        />

        {/* SECTION 3 — HOW IT WORKS + LEADERBOARD + HELP / COMMUNITY */}
        <HowItWorksSection />

        <LeaderboardSection />

        <HelpCommunitySection
          onOpenHelp={() => setHelpModalOpen(true)}
        />
      </main>

      {/* Interactive Modals */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectGame={handleSelectGameFromSearch}
        onSelectTournament={handleSelectTournamentFromSearch}
      />

      <HelpModal
        isOpen={helpModalOpen}
        onClose={() => setHelpModalOpen(false)}
      />

      <RegistrationModal
        tournament={selectedTournament}
        isOpen={selectedTournament !== null}
        onClose={() => setSelectedTournament(null)}
      />

    </div>
  );
};

export default App;
