export const projects = [
  {
    date: '2024-01-12',
    slug: 'xrb-farm',
    name: 'XRB Farm',
    description: 'Earn Fruits with KKUB',
    cover: '/projects/xrb-farm/farm.png',
    links: {
      github: null,
      demo: 'https://xrb-farm.vercel.app/farm',
    },
    tags: ['vite', 'react', 'typescript', 'shadcn', 'tailwindcss', 'viem.sh'],
  },
  {
    date: '2024-03-12',
    slug: 'land-manager',
    name: 'Land Manager',
    description: 'Design Your Own Building Space in Your Preferred Style',
    cover: '/projects/landmanager/map.png',
    links: {
      github: null,
      demo: 'https://landmanager.themonkgames.online/',
    },
    tags: [
      'next.js',
      'typescript',
      'shadcn',
      'tailwindcss',
      'leaflet.js',
      'viem.sh',
    ],
  },
];

export type ProjectType = (typeof projects)[0];
