import Link from 'next/link';
import Image from 'next/image';

import { ProjectType } from '@/data/project';

type ProjectCardProps = { project: ProjectType };

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div
      key={project.name}
      className='group flex flex-col h-full overflow-hidden'
    >
      <div className='aspect-video relative overflow-hidden bg-secondary border-b border-border grayscale group-hover:grayscale-0 transition-all duration-500'>
        <Image
          src={project.cover}
          alt={project.name}
          fill
          className='object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out'
        />
        <div className='absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
          {project.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className='font-mono text-[8px] px-1 border border-foreground/20 bg-background/80'
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className='p-6 space-y-3 flex-1 flex flex-col'>
        <div className='space-y-1 flex-1'>
          <Link
            href={`/projects/${project.slug}`}
            scroll={true}
            className='inline-block'
          >
            <h3 className='text-sm font-bold uppercase tracking-widest group-hover:underline'>
              {project.name}
            </h3>
          </Link>
          <p className='text-xs text-muted-foreground leading-relaxed line-clamp-2'>
            {project.description}
          </p>
        </div>
        <div className='flex items-center justify-between pt-4 border-t border-border/50'>
          <div className='flex gap-2'>
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className='font-mono text-[9px] uppercase tracking-tighter text-muted-foreground'
              >
                #{tag}
              </span>
            ))}
          </div>
          <Link
            href={`/projects/${project.slug}`}
            className='font-mono text-[9px] uppercase hover:underline'
          >
            View &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
