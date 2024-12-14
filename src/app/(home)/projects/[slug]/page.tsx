import { Globe } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { projects } from '@/data/project';
import { notFound } from 'next/navigation';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { MDXContent } from '@/components/mdx-content';
import { posts } from '#site/content';
import BackButton from '@/components/back-button';
import { cn } from '@/lib/utils';

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getMDXBySlug(slug: string) {
  return posts.find((item) => item.slugAsParams === slug);
}

async function getProjectBySlug(slug: string) {
  return projects.find((item) => item.slug === slug);
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  return {
    title: project?.name,
    description: project?.description,
    openGraph: {
      images: [project?.cover],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  const body = await getMDXBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className='container max-w-3xl py-8 space-y-4'>
      <BackButton />
      <h1 className='text-3xl font-bold mb-4'>{project.name}</h1>
      <div className='mb-6 relative aspect-video'>
        <Image
          src={project.cover}
          alt={project.name}
          fill
          className='object-contain'
        />
      </div>
      <div className='flex flex-wrap gap-2'>
        {project.tags.map((tag) => (
          <Badge key={tag} variant='secondary'>
            {tag}
          </Badge>
        ))}
      </div>
      <div className='flex gap-4 mb-8'>
        {project.links.demo && (
          <Link
            href={project.links.demo}
            target='_blank'
            className={cn(buttonVariants())}
          >
            <Globe className='h-4 w-4' /> Live Demo
          </Link>
        )}
        {project.links.github && (
          <Link
            href={project.links.github}
            target='_blank'
            className={cn(buttonVariants({ variant: 'outline' }))}
          >
            <GitHubLogoIcon className='h-4 w-4' /> GitHub
          </Link>
        )}
      </div>
      <article className=' prose dark:prose-invert pt-8'>
        {body && <MDXContent code={body?.body} />}
      </article>
    </div>
  );
}
