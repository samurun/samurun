import type { Metadata } from 'next';
import LabCard, { LabCardItem } from '@/components/lab-card';
import {
  ModernCssIllustration,
  EchartIllustration,
  ReactVirtualIllustration,
} from '@/components/lab-illustrations';

export const metadata: Metadata = {
  title: 'Labs',
  description: 'Interactive frontend and visualization experiments.',
};

const labs: LabCardItem[] = [
  {
    title: 'ECharts',
    description:
      'Interactive charts and data visualizations using Apache ECharts — from basic line/bar to custom geo maps and composable option builders.',
    thumbnail: <EchartIllustration />,
    href: '/labs/echarts',
    techStack: ['Apache ECharts', 'TypeScript', 'Interactive'],
    updatedAt: '2026-04-15',
  },
  {
    title: 'React Virtual',
    description:
      'Virtualize only the visible portion of massive scrollable lists and grids — keeping DOM small while rendering tens of thousands of rows smoothly.',
    thumbnail: <ReactVirtualIllustration />,
    href: '/labs/virtual',
    techStack: ['TanStack Virtual', 'Performance'],
    updatedAt: '2026-04-08',
  },
  {
    title: 'Modern CSS',
    description:
      'Exploring modern CSS features: corner-shape, the Custom Highlight API, and progressive-enhancement patterns without JS overhead.',
    thumbnail: <ModernCssIllustration />,
    href: '/labs/modern-css',
    techStack: ['corner-shape', 'Highlight API', 'Tailwind v4'],
    updatedAt: '2026-04-30',
  },
];

const [featured, ...rest] = labs;

export default function Page() {
  return (
    <main className='border-b border-border/50 min-h-screen'>
      <div className='container py-20'>
        <div className='mb-8 max-w-2xl'>
          <h1 className='text-lg font-semibold tracking-tight'>
            Labs
            <span className='text-sm text-muted-foreground ml-2'>
              {labs.length}
            </span>
          </h1>
          <p className='text-sm text-muted-foreground mt-3 leading-relaxed'>
            A space for exploring tech beyond day-job work — libraries I want to
            understand deeply, patterns I want to pressure-test, and techniques
            that might land in a real project later. Each lab ships with a live
            demo and source code.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <LabCard item={featured} featured />
          {rest.map((lab) => (
            <LabCard key={lab.title} item={lab} />
          ))}
        </div>
      </div>
    </main>
  );
}
