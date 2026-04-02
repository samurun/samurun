import type { Metadata } from 'next';
import Card from '@/components/card';

export const metadata: Metadata = {
  title: 'Labs',
  description: 'Interactive frontend and visualization experiments.',
};

const labs = [
  {
    title: 'UI Components',
    description:
      'Handcrafted UI components built from scratch for specific use cases.',
    image: '/labs/ui-components.svg',
    href: '/labs/ui',
    tags: ['ui', 'components'],
  },
  {
    title: 'Modern CSS',
    description:
      'Exploring modern CSS features and techniques for responsive design.',
    image: '/labs/modern-css.svg',
    href: '/labs/modern-css',
    tags: ['css', 'responsive'],
  },
  {
    title: 'ECharts',
    description:
      'Interactive charts and data visualizations using Apache ECharts.',
    image: '/labs/echart.svg',
    href: '/labs/echarts',
    tags: ['charts', 'data-viz'],
  },
  {
    title: 'React Virtual',
    description:
      'Virtualize only the visible content for massive scrollable DOM.',
    image: '/labs/react-virtual.svg',
    href: '/labs/virtual',
    tags: ['performance', 'virtualization'],
  },
];

export default function Page() {
  return (
    <main className='border-b border-border min-h-screen'>
      <div className='container py-20'>
        <div className='flex items-center gap-4 mb-12'>
          <h1 className='text-sm font-mono font-bold uppercase tracking-[0.2em]'>
            // ALL LABS {labs.length}
          </h1>
          <div className='h-px flex-1 bg-border/50' />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 border-t border-l border-border'>
          {labs.map((lab) => (
            <div key={lab.title} className='border-r border-b border-border'>
              <Card item={lab} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
