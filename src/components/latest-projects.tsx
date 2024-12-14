import { buttonVariants } from './ui/button';
import { projects } from '@/data/project';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import ProjectCard from './project-card';

export default function LatestProjects() {
  return (
    <section className=''>
      <div className='max-w-5xl mx-auto px-6 md:px-4 py-20'>
        <h2 className='text-2xl font-bold mb-8'>Latest Projects</h2>
        <div className='grid sm:grid-cols-2 gap-6'>
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <div className='mt-8 text-center'>
          <Link
            href={'/projects'}
            className={cn(buttonVariants({ variant: 'link' }))}
          >
            View all projects
          </Link>
        </div>
      </div>
    </section>
  );
}
