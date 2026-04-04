import { posts } from '#site/content';
import Link from 'next/link';
import { formatDate } from 'date-fns';

export const metadata = {
  title: 'Blogs',
  description: 'Thoughts, notes, and technical articles.',
};

function PostItem({ post }: { post: any }) {
  return (
    <div className='group rounded-xl p-5 hover:bg-secondary/50 transition-colors duration-200'>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div className='flex flex-col gap-1'>
          <h3 className='text-sm font-semibold tracking-tight'>
            <Link
              href={`/blogs/${post.slugAsParams}`}
              className='group-hover:text-primary transition-colors'
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
        <div className='flex items-center gap-3'>
          <span className='text-xs text-muted-foreground'>
            {formatDate(post.date, 'MMM dd, yyyy')}
          </span>
          {post.tags && post.tags.length > 0 && (
            <div className='hidden sm:flex items-center gap-1.5'>
              {post.tags.slice(0, 2).map((tag: string) => (
                <span
                  key={tag}
                  className='text-[11px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground'
                >
                  {tag}
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
    <main className='border-b border-border/50 min-h-screen'>
      <div className='container py-20'>
        <div className='mb-12'>
          <h1 className='text-lg font-semibold tracking-tight'>
            Blogs & Articles
          </h1>
        </div>
        <div className='space-y-1'>
          {sortedPosts.map((post) => (
            <PostItem key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
}
