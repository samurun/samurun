import Link from 'next/link';
import Image from 'next/image';

import { ProjectType } from '@/data/project';
import { cn } from '@/lib/utils';

type ProjectCardProps = { project: ProjectType };

export default function ProjectCard({ project }: ProjectCardProps) {
  const isExternal = Boolean(project.href);
  const linkHref = project.href ?? `/projects/${project.slug}`;
  const linkProps = isExternal
    ? { target: '_blank', rel: 'noopener noreferrer' as const }
    : { scroll: true };

  return (
    <Link
      href={linkHref}
      {...linkProps}
      className='group flex flex-col h-full overflow-hidden rounded-xl border border-border/50 bg-card hover:border-border transition-all duration-200'
    >
      <div className='aspect-2/1 relative overflow-hidden rounded-t-xl bg-secondary'>
        <span className='absolute top-2 right-2 z-10 text-[10px] px-2 py-0.5 rounded-md bg-background/80 backdrop-blur text-muted-foreground border border-border/50'>
          {project.source}
        </span>
        <Image
          src={project.cover}
          alt={project.name}
          fill
          unoptimized={isExternal}
          className={cn(
            'object-cover w-full h-full group-hover:scale-[1.02] transition-transform duration-300 ease-out',
            project.source === 'github' && 'object-contain bg-white',
          )}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </div>
      <div className='p-5 flex-1 flex flex-col gap-3'>
        <div className='flex-1'>
          <h3 className='text-sm font-semibold tracking-tight group-hover:text-primary transition-colors'>
            {project.name}
          </h3>
          <p className='text-xs text-muted-foreground leading-relaxed mt-1 line-clamp-2'>
            {project.description}
          </p>
        </div>
        <div className='flex flex-wrap gap-1.5'>
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className='text-[11px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground'
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
