import Link from 'next/link';

import { buttonVariants } from './ui/button';
import ProjectCard from './project-card';

import { projects } from '@/data/project';
import { cn } from '@/lib/utils';

export default function LatestProjects() {
  return (
    <section className='border-b border-border'>
      <div className='container py-20'>
        <div className='flex items-center justify-between mb-12'>
          <h2 className='text-sm font-mono font-bold uppercase tracking-[0.2em]'>
            // LATEST PROJECTS
          </h2>
          <Link
            href={'/projects'}
            className={cn(
              buttonVariants({ variant: 'link' }),
              'font-mono text-[10px] uppercase tracking-widest',
            )}
          >
            All Projects &rarr;
          </Link>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 border-t border-l border-border'>
          {projects.map((project) => (
            <div key={project.slug} className='border-r border-b border-border'>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
