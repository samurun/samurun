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
  {
    date: '2022-03-12',
    slug: 'net-zero-man',
    name: 'Net Zero Man',
    description:
      'กิจกรรมในแต่ละวันของท่านมีการปล่อยก๊าซเรือนกระจก ซึ่งเป็นสาเหตุสำคัญที่ก่อให้เกิดภาวะโลกร้อนและการเปลี่ยนแปลง สภาพภูมิอากาศเท่าใดสามารถคำนวณได้แล้วง่ายๆ',
    cover: '/projects/net-zero-man/cover.png',
    links: {
      demo: 'https://thainetzeroman.com/',
    },
    tags: ['vite', 'typescript', 'shadcn', 'tailwindcss'],
  },
];

export type ProjectType = (typeof projects)[0];
