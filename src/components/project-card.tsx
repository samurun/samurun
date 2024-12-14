import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import Image from 'next/image';
import { ProjectType } from '@/data/project';
import Link from 'next/link';

type ProjectCardProps = { project: ProjectType };

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card key={project.name} className='overflow-hidden group'>
      <CardContent className='pt-6'>
        <div className='aspect-video relative overflow-hidden p-4 bg-border'>
          <div className='aspect-video'>
            <Image
              src={project.cover}
              alt={project.name}
              fill
              className='object-cover w-full h-full group-hover:scale-105 transition-transform duration-300'
            />
          </div>
        </div>
        <Link href={`/projects/${project.slug}`} scroll={true}>
          <h3 className='text-lg font-bold'>{project.name}</h3>
        </Link>
        <p className='text-muted-foreground line-clamp-1'>
          {project.description}
        </p>
      </CardContent>
      <CardFooter className='p-4 pt-0 flex gap-2 flex-wrap'>
        {project.tags.map((tag) => (
          <Badge key={tag} variant='secondary' className='bg-white/10'>
            {tag}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
}
