import { notFound } from 'next/navigation';
import { MDXContent } from '@/components/mdx-content';
import BackButton from '@/components/back-button';
import { formatDate } from 'date-fns';

import {
  getAllPostSlugs,
  getPostBySlug,
  Post,
} from '@/lib/posts';

interface PageProps {
  params: { slug: string };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = params;
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="border-b border-border/50 min-h-screen">
      <div className="container py-20">
        <div className="mb-12">
          <BackButton />
        </div>

        <header className="space-y-4 mb-12">
          <div className="flex items-center gap-4">
            <time
              dateTime={post.date}
              className="text-xs text-muted-foreground"
            >
              {formatDate(post.date, 'MMMM dd, yyyy')}
            </time>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <article className="prose dark:prose-invert prose-zinc max-w-none">
          <MDXContent code={post.body} />
        </article>
        <div className="mt-20 pt-8 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            Last updated: {formatDate(post.date, 'yyyy-MM-dd')}
          </p>
        </div>
      </div>
    </main>
  );
}
