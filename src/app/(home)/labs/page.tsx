import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

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
              <div className='group flex flex-col h-full overflow-hidden'>
                <div className='aspect-video relative overflow-hidden bg-secondary border-b border-border transition-all duration-500'>
                  <Image
                    src={lab.image}
                    alt={lab.title}
                    fill
                    className='object-cover w-full h-full transition-transform duration-700 ease-out'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  />
                  <div className='absolute top-2 right-2 flex gap-1 transition-opacity'>
                    {lab.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className='font-mono text-[8px] px-1 border border-foreground/20 bg-background/80'
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className='space-y-3 flex-1 flex flex-col'>
                  <div className='space-y-1 flex-1 p-4 m-0'>
                    <Link
                      href={lab.href}
                      scroll={true}
                      className='inline-block'
                    >
                      <h3 className='font-bold uppercase tracking-widest group-hover:underline'>
                        {lab.title}
                      </h3>
                    </Link>
                    <p className='text-xs text-muted-foreground leading-relaxed line-clamp-2'>
                      {lab.description}
                    </p>
                  </div>
                  <div className='flex items-center justify-between pt-4 border-t border-border/50 p-4'>
                    <div className='flex gap-2'>
                      {lab.tags.map((tag) => (
                        <span
                          key={tag}
                          className='font-mono text-[9px] uppercase tracking-tighter text-muted-foreground'
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={lab.href}
                      className='font-mono text-[9px] uppercase hover:underline'
                    >
                      View &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
