import type { Metadata } from 'next';
import Card from '@/components/lab-card';
import {
  UiComponentsIllustration,
  ModernCssIllustration,
  EchartIllustration,
  ReactVirtualIllustration,
} from '@/components/lab-illustrations';
import LabCard from '@/components/lab-card';

export const metadata: Metadata = {
  title: 'Labs',
  description: 'Interactive frontend and visualization experiments.',
};

const labs = [
  {
    title: 'UI Components',
    description:
      'Handcrafted UI components built from scratch for specific use cases.',
    thumbnail: <UiComponentsIllustration />,
    href: '/labs/ui',
    tags: ['ui', 'components'],
  },
  {
    title: 'Modern CSS',
    description:
      'Exploring modern CSS features and techniques for responsive design.',
    thumbnail: <ModernCssIllustration />,
    href: '/labs/modern-css',
    tags: ['css', 'responsive'],
  },
  {
    title: 'ECharts',
    description:
      'Interactive charts and data visualizations using Apache ECharts.',
    thumbnail: <EchartIllustration />,
    href: '/labs/echarts',
    tags: ['charts', 'data-viz'],
  },
  {
    title: 'React Virtual',
    description:
      'Virtualize only the visible content for massive scrollable DOM.',
    thumbnail: <ReactVirtualIllustration />,
    href: '/labs/virtual',
    tags: ['performance', 'virtualization'],
  },
];

export default function Page() {
  return (
    <main className='border-b border-border/50 min-h-screen'>
      <div className=''>
        <div className='mb-12'>
          <h1 className='text-lg font-semibold tracking-tight'>
            Labs
            <span className='text-sm text-muted-foreground ml-2'>
              {labs.length}
            </span>
          </h1>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {labs.map((lab) => (
            <LabCard key={lab.title} item={lab} />
          ))}
        </div>
      </div>
    </main>
  );
}
