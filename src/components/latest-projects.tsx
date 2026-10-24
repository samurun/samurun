import Link from 'next/link';

import { buttonVariants } from './ui/button';
import ProjectCard from './project-card';

import { siteConfig } from '@/config/siteConfig';
import { getGithubProjects } from '@/lib/github';
import { cn } from '@/lib/utils';

export default async function LatestProjects() {
  const latest = (await getGithubProjects()).slice(0, 4);

  return (
    <section id='projects' className='scroll-mt-14 border-b border-border/50'>
      <div className='container py-20'>
        <div className='flex items-center justify-between mb-12'>
          <h2 className='text-lg font-semibold tracking-tight'>
            Latest Projects
          </h2>
          <Link
            href={siteConfig.links.github}
            target='_blank'
            rel='noopener noreferrer'
            className={cn(
              buttonVariants({ variant: 'link' }),
              'text-sm text-muted-foreground',
            )}
          >
            All Projects &rarr;
          </Link>
        </div>
        {latest.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {latest.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <p className='rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground'>
            Projects couldn&apos;t be loaded right now.{' '}
            <a
              href={siteConfig.links.github}
              target='_blank'
              rel='noopener noreferrer'
              className='text-foreground underline underline-offset-4'
            >
              See them on GitHub
            </a>
            .
          </p>
        )}
      </div>
    </section>
  );
}
