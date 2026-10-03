export interface HeroStat {
  label: string;
  value: string;
  icon: 'landmark' | 'users' | 'trophy' | 'coins';
}

export interface HeroData {
  eyebrow: string;
  titleLines: string[];
  subtitle: string;
  description: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta: {
    text: string;
    href: string;
  };
  stats: HeroStat[];
}

export interface GameStat {
  label: string;
  value: string;
}

export interface Game {
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  category: string;
  platform?: string;
  tags: string[];
  description?: string;
  isFeatured?: boolean;
  image: string;
  cardArt: string;
  stats?: GameStat[];
  ctaText?: string;
}

export type TournamentStatus = 'live' | 'upcoming' | 'completed';

export interface Tournament {
  id: string;
  name: string;
  gameId: string;
  gameName: string;
  status: TournamentStatus;
  date: string;
  time?: string;
  format: string;
  prizePool: string;
  teamSize: string;
  registeredTeams: number;
  maxTeams: number;
  featured?: boolean;
}

export interface HowItWorksStepData {
  step: string;
  title: string;
  description: string;
  icon: 'gamepad' | 'file-text' | 'users' | 'trophy';
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  category: 'colleges' | 'teams' | 'players';
  wins: number;
  points: number;
  trend: string;
  trendDirection: 'up' | 'down' | 'neutral';
  logo?: string;
  verified?: boolean;
  tag?: string;
}

export interface UserRankData {
  name: string;
  rankText: string;
  wins: number;
  points: string;
  trend: string;
  quote: string;
  logo?: string;
}
