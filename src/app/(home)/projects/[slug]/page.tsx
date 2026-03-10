import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ExternalLinkIcon } from 'lucide-react';

import { MDXContent } from '@/components/mdx-content';
import ProjectGallery from '@/components/project-gallery';
import BackButton from '@/components/back-button';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import {
  getAllProjectSlugs,
  getProjectBySlug,
  getProjectImages,
} from '@/lib/projects';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectImages = getProjectImages(project!);

  return (
    <main className='border-b border-border min-h-screen'>
      <div className='container py-20'>
        <div className='mb-12'>
          <BackButton />
        </div>

        <div className='flex items-center justify-between gap-4 mb-12'>
          <div className='flex items-center gap-4 flex-1'>
            <h1 className='text-sm font-mono font-bold uppercase tracking-[0.2em]'>
              {project!.title}
            </h1>
            <div className='h-px flex-1 bg-border/50' />
          </div>
          {project!.links.demo && (
            <Link
              href={project!.links.demo}
              target='_blank'
              rel='noopener noreferrer'
              className={cn(buttonVariants({ variant: 'secondary' }))}
            >
              Visit Website
              <ExternalLinkIcon className='size-3' />
            </Link>
          )}
        </div>

        <div className='grid grid-cols-1 gap-4'>
          <div>
            {project!.cover && (
              <div className='relative w-full aspect-video border border-border overflow-hidden mb-12 bg-muted/20'>
                <Image
                  src={project!.cover}
                  alt={project!.title}
                  fill
                  className='object-contain'
                  priority
                  sizes='(max-width: 1024px) 100vw, 1200px'
                />
              </div>
            )}

            <article className='prose dark:prose-invert prose-zinc max-w-none'>
              <MDXContent code={project!.body} />
            </article>

            <ProjectGallery images={projectImages} title={project!.title} />
          </div>
        </div>
      </div>
    </main>
  );
}
