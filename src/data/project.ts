export const projects: ProjectType[] = [
  {
    source: 'mdx',
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
    source: 'mdx',
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
  {
    source: 'mdx',
    date: '2022-03-12',
    slug: 'net-zero-man',
    name: 'Net Zero Man',
    description: 'Calculate Your Daily Carbon Footprint & Offset It',
    cover: '/projects/net-zero-man/cover.png',
    links: {
      demo: 'https://thainetzeroman.com/',
    },
    tags: ['vite', 'typescript', 'shadcn', 'tailwindcss'],
  },
];

export type ProjectType = {
  source: 'github' | 'mdx';
  date: string;
  slug: string;
  name: string;
  description: string;
  cover: string;
  links: {
    github?: string | null;
    demo?: string;
  };
  tags: string[];
  /** If set, card links to this URL (external) instead of /projects/[slug] */
  href?: string;
};
