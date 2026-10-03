import { Game } from '../types';

export const gamesData: Game[] = [
  {
    id: 'bgmi',
    slug: 'bgmi',
    name: 'BGMI',
    subtitle: 'BATTLEGROUNDS MOBILE INDIA',
    category: 'Battle Royale',
    platform: 'Mobile',
    tags: ['SQUAD', 'BR', 'MOBILE'],
    description: "Jump into India's biggest battle royale tournaments. Compete with the best, represent your college, and make your mark on Kurukshetra.",
    isFeatured: true,
    image: '/games/bgmi-hero-art.png',
    cardArt: '/games/bgmi-art.png',
    stats: [
      { label: 'PLAYERS', value: '25K+' },
      { label: 'TOURNAMENTS', value: '120+' },
      { label: 'TEAMS', value: '8K+' }
    ],
    ctaText: 'EXPLORE BGMI TOURNAMENTS'
  },
  {
    id: 'chess',
    slug: 'chess',
    name: 'CHESS',
    subtitle: 'THE ULTIMATE MIND SPORT',
    category: 'Strategy',
    platform: 'Cross-Platform',
    tags: ['1v1', 'STRATEGY', 'SKILL'],
    description: "Grandmaster strategy meets high-stakes collegiate competition. Master the 64 squares.",
    isFeatured: false,
    image: '/games/chess-card.png',
    cardArt: '/games/chess-art.png',
    stats: [
      { label: 'PLAYERS', value: '10K+' },
      { label: 'TOURNAMENTS', value: '65+' },
      { label: 'MASTERS', value: '450+' }
    ],
    ctaText: 'EXPLORE CHESS TOURNAMENTS'
  },
  {
    id: 'valorant',
    slug: 'valorant',
    name: 'VALORANT',
    subtitle: 'TACTICAL HERO SHOOTER',
    category: 'Tactical FPS',
    platform: 'PC',
    tags: ['5v5', 'TACTICAL', 'PC'],
    description: "Precise gunplay meets adaptable agent abilities. Plant the spike, defend the site, claim university glory.",
    isFeatured: false,
    image: '/games/valorant-card.png',
    cardArt: '/games/valorant-art.png',
    stats: [
      { label: 'PLAYERS', value: '18K+' },
      { label: 'TOURNAMENTS', value: '80+' },
      { label: 'TEAMS', value: '3.2K+' }
    ],
    ctaText: 'EXPLORE VALORANT TOURNAMENTS'
  },
  {
    id: 'freefire',
    slug: 'free-fire',
    name: 'FREE FIRE',
    subtitle: 'FAST-PACED SURVIVAL SHOOTER',
    category: 'Battle Royale',
    platform: 'Mobile',
    tags: ['SQUAD', 'BR', 'MOBILE'],
    description: "10-minute survival shooter matches. High speed, intense gunfights, and non-stop campus excitement.",
    isFeatured: false,
    image: '/games/freefire-card.png',
    cardArt: '/games/freefire-art.png',
    stats: [
      { label: 'PLAYERS', value: '22K+' },
      { label: 'TOURNAMENTS', value: '95+' },
      { label: 'TEAMS', value: '6.5K+' }
    ],
    ctaText: 'EXPLORE FREE FIRE TOURNAMENTS'
  },
  {
    id: 'rocketleague',
    slug: 'rocket-league',
    name: 'ROCKET LEAGUE',
    subtitle: 'HIGH-POWERED HYBRID OF SOCCER & VEHICULAR MAYHEM',
    category: 'Sports Action',
    platform: 'PC',
    tags: ['3v3', 'ACTION', 'PC'],
    description: "Aerial acrobatics, supersonic speed, and jaw-dropping college championship goals.",
    isFeatured: false,
    image: '/games/rocketleague-card.png',
    cardArt: '/games/rocketleague-art.png',
    stats: [
      { label: 'PLAYERS', value: '8K+' },
      { label: 'TOURNAMENTS', value: '40+' },
      { label: 'TEAMS', value: '1.8K+' }
    ],
    ctaText: 'EXPLORE ROCKET LEAGUE TOURNAMENTS'
  },
  {
    id: 'dota2',
    slug: 'dota-2',
    name: 'DOTA 2',
    subtitle: 'THE ENDLESS BATTLE OF THE ANCIENTS',
    category: 'MOBA',
    platform: 'PC',
    tags: ['5v5', 'MOBA', 'PC'],
    description: "Deep strategic teamwork and legendary hero coordination representing collegiate powerhouse squads.",
    isFeatured: false,
    image: '/games/dota2-thumb.png',
    cardArt: '/games/dota2-art.png',
    stats: [
      { label: 'PLAYERS', value: '7K+' },
      { label: 'TOURNAMENTS', value: '35+' },
      { label: 'TEAMS', value: '1.2K+' }
    ],
    ctaText: 'EXPLORE DOTA 2 TOURNAMENTS'
  },
  {
    id: 'apex',
    slug: 'apex-legends',
    name: 'APEX LEGENDS',
    subtitle: 'CHARACTER-DRIVEN BATTLE ROYALE',
    category: 'Battle Royale',
    platform: 'PC',
    tags: ['SQUAD', 'BR', 'PC'],
    description: "Master a growing roster of powerful Legends with unique abilities in fast-paced Frontier combat.",
    isFeatured: false,
    image: '/games/apex-thumb.png',
    cardArt: '/games/apex-art.png',
    stats: [
      { label: 'PLAYERS', value: '9K+' },
      { label: 'TOURNAMENTS', value: '45+' },
      { label: 'TEAMS', value: '2.1K+' }
    ],
    ctaText: 'EXPLORE APEX LEGENDS TOURNAMENTS'
  },
  {
    id: 'cod',
    slug: 'call-of-duty',
    name: 'CALL OF DUTY',
    subtitle: 'ICONIC MULTIPLAYER COMBAT',
    category: 'FPS',
    platform: 'Multiplatform',
    tags: ['MULTIPLAYER', 'FPS', 'PC'],
    description: "Heart-pounding competitive firefights and tactical coordination across premier college squads.",
    isFeatured: false,
    image: '/games/cod-thumb.png',
    cardArt: '/games/cod-art.png',
    stats: [
      { label: 'PLAYERS', value: '14K+' },
      { label: 'TOURNAMENTS', value: '60+' },
      { label: 'TEAMS', value: '4K+' }
    ],
    ctaText: 'EXPLORE CALL OF DUTY TOURNAMENTS'
  }
];

export const getFeaturedGame = (slug?: string): Game => {
  if (slug) {
    const found = gamesData.find(g => g.slug === slug || g.id === slug);
    if (found) return found;
  }
  return gamesData.find(g => g.isFeatured) || gamesData[0];
};
