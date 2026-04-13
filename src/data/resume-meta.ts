export const resumeMeta = {
  name: 'Fadlan Jehteerokee',
  title: 'Full Stack Web Developer',
  location: 'Bangkok, Thailand',
  email: 'fadlan.jehteerokee@gmail.com',
  phone: '080-873-4357',
  links: [
    { label: 'Portfolio', url: 'https://samurun-xi.vercel.app' },
    { label: 'GitHub', url: 'https://github.com/samurun' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/fadlan-jehteerokee' },
  ],
  summary:
    'Full Stack Developer with 4+ years delivering production React/Next.js applications for government, gaming, and environmental clients. Specializes in frontend architecture — design systems, schema-driven forms, and data visualization platforms — with hands-on full-stack delivery using Node.js and PostgreSQL. Proven ability to ship scalable, maintainable UIs in TypeScript with modern tooling. Seeking a mid-to-senior frontend or full-stack role where I can own architecture and drive technical decisions.',
  skills: [
    {
      label: 'Frontend',
      items: [
        'React',
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'shadcn/ui',
        'MUI',
        'TanStack Query',
        'React Hook Form',
        'Zod',
        'Formik',
        'Yup',
        'ECharts',
        'Recharts',
        'Leaflet.js',
      ],
    },
    {
      label: 'Backend',
      items: ['Node.js', 'NestJS', 'Elysia', 'PostgreSQL', 'REST APIs'],
    },
    {
      label: 'Tooling',
      items: [
        'Docker',
        'MinIO',
        'RabbitMQ',
        'Redis',
        'GitHub',
        'GitHub Actions',
        'CI/CD',
      ],
    },
  ],
  education: {
    degree: 'Bachelor of Science, Information and Communication Technology',
    school: 'Prince of Songkla University',
    period: '2015 – 2019',
  },
} as const;
