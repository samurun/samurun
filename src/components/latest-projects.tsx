import Link from 'next/link';

import { buttonVariants } from './ui/button';
import ProjectCard from './project-card';

import { projects } from '@/data/project';
import { cn } from '@/lib/utils';

export default function LatestProjects() {
  return (
    <section className='border-b border-border/50'>
      <div className='container py-20'>
        <div className='flex items-center justify-between mb-12'>
          <h2 className='text-lg font-semibold tracking-tight'>
            Latest Projects
          </h2>
          <Link
            href={'/projects'}
            className={cn(
              buttonVariants({ variant: 'link' }),
              'text-sm text-muted-foreground',
            )}
          >
            All Projects &rarr;
          </Link>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
