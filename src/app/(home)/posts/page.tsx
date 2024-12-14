import { posts } from '#site/content';
import Link from 'next/link';
import { format } from 'date-fns';

export default function BlogPage() {
  return (
    <main className='container max-w-4xl py-20'>
      <h1 className='text-4xl font-bold mb-8'>Posts</h1>
      <div className='grid gap-6'>
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={post.slug}
            className='flex items-baseline gap-4 justify-between group border-b border-transparent hover:border-muted-foreground transition-all'
          >
            <article>
              <p className='truncate'>{post.title}</p>
              <p className='text-muted-foreground text-sm'>
                {post.description}
              </p>
            </article>
            <time
              dateTime={post.date}
              className='text-sm text-muted-foreground text-nowrap'
            >
              {format(new Date(post.date), 'yyyy-MM-dd')}
            </time>
          </Link>
        ))}
      </div>
    </main>
  );
}
