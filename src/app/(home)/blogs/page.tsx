import { posts } from '#site/content';
import Link from 'next/link';
import { formatDate } from 'date-fns';

export const metadata = {
  title: 'Blogs',
  description: 'Thoughts, notes, and technical articles.',
};

function PostItem({ post }: { post: any }) {
  return (
    <div className='group border-b border-border p-6 hover:bg-secondary transition-colors'>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div className='flex flex-col gap-1'>
          <h3 className='text-sm font-bold uppercase tracking-widest'>
            <Link
              href={`/blogs/${post.slugAsParams}`}
              className='hover:underline underline-offset-4'
            >
              {post.title}
            </Link>
          </h3>
          {post.description && (
            <p className='text-xs text-muted-foreground leading-relaxed max-w-2xl'>
              {post.description}
            </p>
          )}
        </div>
        <div className='flex items-center gap-4'>
          <div className='font-mono text-[10px] text-muted-foreground uppercase tracking-widest'>
            {formatDate(post.date, 'MMM dd, yyyy')}
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className='hidden sm:flex items-center gap-2'>
              {post.tags.slice(0, 2).map((tag: string) => (
                <span
                  key={tag}
                  className='font-mono text-[9px] px-2 py-0.5 border border-border bg-background text-muted-foreground uppercase tracking-tighter'
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <main className='border-b border-border min-h-screen'>
      <div className='container py-20'>
        <div className='flex items-center gap-4 mb-12'>
          <h1 className='text-sm font-mono font-bold uppercase tracking-[0.2em]'>
            // BLOGS & ARTICLES
          </h1>
          <div className='h-[1px] flex-1 bg-border/50' />
        </div>
        <div className='border-t border-x border-border'>
          {sortedPosts.map((post) => (
            <PostItem key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
}
