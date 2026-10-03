import { LeaderboardEntry, UserRankData } from '../types';

export const leaderboardColleges: LeaderboardEntry[] = [
  {
    rank: 1,
    name: 'IIT Delhi',
    category: 'colleges',
    wins: 24,
    points: 8420,
    trend: '+2',
    trendDirection: 'up',
    logo: '/leaderboard/iit-delhi.png',
    verified: true
  },
  {
    rank: 2,
    name: 'NIT Trichy',
    category: 'colleges',
    wins: 18,
    points: 6980,
    trend: '+1',
    trendDirection: 'up',
    logo: '/leaderboard/nit-trichy.png'
  },
  {
    rank: 3,
    name: 'VIT Vellore',
    category: 'colleges',
    wins: 16,
    points: 6120,
    trend: '-1',
    trendDirection: 'down',
    logo: '/leaderboard/vit-vellore.png'
  },
  {
    rank: 4,
    name: 'NIT Surathkal',
    category: 'colleges',
    wins: 14,
    points: 5880,
    trend: '—',
    trendDirection: 'neutral',
    logo: '/leaderboard/nit-surathkal.png'
  },
  {
    rank: 5,
    name: 'BITS Pilani',
    category: 'colleges',
    wins: 12,
    points: 5210,
    trend: '+3',
    trendDirection: 'up',
    logo: '/leaderboard/bits-pilani.png'
  },
  {
    rank: 6,
    name: 'IIT Bombay',
    category: 'colleges',
    wins: 11,
    points: 4890,
    trend: '+1',
    trendDirection: 'up'
  },
  {
    rank: 7,
    name: 'NIT Rourkela',
    category: 'colleges',
    wins: 8,
    points: 4320,
    trend: '+2',
    trendDirection: 'up',
    logo: '/leaderboard/nit-rourkela.png'
  }
];

export const leaderboardTeams: LeaderboardEntry[] = [
  {
    rank: 1,
    name: 'Delhi Gladiators (IITD)',
    category: 'teams',
    wins: 14,
    points: 5120,
    trend: '+1',
    trendDirection: 'up',
    tag: 'IITD'
  },
  {
    rank: 2,
    name: 'Trichy Titans (NITT)',
    category: 'teams',
    wins: 12,
    points: 4680,
    trend: '+2',
    trendDirection: 'up',
    tag: 'NITT'
  },
  {
    rank: 3,
    name: 'Vellore Vipers (VIT)',
    category: 'teams',
    wins: 10,
    points: 4150,
    trend: '-1',
    trendDirection: 'down',
    tag: 'VIT'
  },
  {
    rank: 4,
    name: 'Surathkal Spartans (NITK)',
    category: 'teams',
    wins: 9,
    points: 3890,
    trend: '—',
    trendDirection: 'neutral',
    tag: 'NITK'
  },
  {
    rank: 5,
    name: 'Pilani Phoenix (BITS)',
    category: 'teams',
    wins: 7,
    points: 3410,
    trend: '+2',
    trendDirection: 'up',
    tag: 'BITS'
  }
];

export const leaderboardPlayers: LeaderboardEntry[] = [
  {
    rank: 1,
    name: 'Karna_Sniper (IIT Delhi)',
    category: 'players',
    wins: 28,
    points: 3840,
    trend: '+3',
    trendDirection: 'up',
    verified: true
  },
  {
    rank: 2,
    name: 'Arjuna_IGL (NIT Trichy)',
    category: 'players',
    wins: 24,
    points: 3510,
    trend: '+1',
    trendDirection: 'up',
    verified: true
  },
  {
    rank: 3,
    name: 'Bhima_Entry (VIT Vellore)',
    category: 'players',
    wins: 21,
    points: 3180,
    trend: '-1',
    trendDirection: 'down'
  },
  {
    rank: 4,
    name: 'Yudhish_Tactics (BITS Pilani)',
    category: 'players',
    wins: 18,
    points: 2950,
    trend: '—',
    trendDirection: 'neutral'
  },
  {
    rank: 5,
    name: 'Nakula_Support (NIT Surathkal)',
    category: 'players',
    wins: 16,
    points: 2720,
    trend: '+2',
    trendDirection: 'up'
  }
];

export const userRankData: UserRankData = {
  name: "NIT Rourkela",
  rankText: "#7 in Colleges",
  wins: 8,
  points: "4,320",
  trend: "+2 This Week",
  quote: "Compete. Improve. Represent your college. Make a legacy.",
  logo: "/leaderboard/nit-rourkela.png"
};
