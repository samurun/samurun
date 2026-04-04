import Link from 'next/link';
import Image from 'next/image';

import { ProjectType } from '@/data/project';

type ProjectCardProps = { project: ProjectType };

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className='group flex flex-col h-full overflow-hidden rounded-xl border border-border/50 bg-card hover:border-border transition-all duration-200'>
      <div className='aspect-video relative overflow-hidden rounded-t-xl bg-secondary'>
        <Image
          src={project.cover}
          alt={project.name}
          fill
          className='object-cover w-full h-full group-hover:scale-[1.02] transition-transform duration-300 ease-out'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </div>
      <div className='p-5 flex-1 flex flex-col gap-3'>
        <div className='flex-1'>
          <Link
            href={`/projects/${project.slug}`}
            scroll={true}
            className='inline-block'
          >
            <h3 className='text-sm font-semibold tracking-tight group-hover:text-primary transition-colors'>
              {project.name}
            </h3>
          </Link>
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
    </div>
  );
}
