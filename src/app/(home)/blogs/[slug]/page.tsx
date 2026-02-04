import { posts } from '#site/content';
import { notFound } from 'next/navigation';
import { MDXContent } from '@/components/mdx-content';
import BackButton from '@/components/back-button';
import { formatDate } from 'date-fns';

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getPostBySlug(slug: string) {
  return posts.find((item) => item.slugAsParams === slug);
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slugAsParams,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return {
    title: post?.title,
    description: post?.description,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className='border-b border-border min-h-screen'>
      <div className='container py-20'>
        <div className='mb-12'>
          <BackButton />
        </div>

        <header className='space-y-4 mb-12'>
          <div className='flex items-center gap-4'>
            <time
              dateTime={post.date}
              className='font-mono text-[10px] uppercase tracking-widest text-muted-foreground'
            >
              {formatDate(post.date, 'MMMM dd, yyyy')}
            </time>
            <div className='h-[1px] flex-1 bg-border/50' />
          </div>
          <h1 className='text-4xl font-bold tracking-tight'>{post.title}</h1>
          {post.tags && post.tags.length > 0 && (
            <div className='flex flex-wrap gap-2 pt-2'>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className='font-mono text-[9px] px-2 py-0.5 border border-border bg-secondary text-muted-foreground uppercase tracking-widest'
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <article className='prose dark:prose-invert prose-zinc max-w-none'>
          <MDXContent code={post.body} />
        </article>
        <div className='mt-20 pt-8 border-t border-border'>
          <p className='font-mono text-[10px] text-muted-foreground uppercase tracking-widest'>
            Last updated: {formatDate(post.date, 'yyyy-MM-dd')}
          </p>
        </div>
      </div>
    </main>
  );
}
