import { posts } from '#site/content';
import BackButton from '@/components/back-button';
import { MDXContent } from '@/components/mdx-content';
import { formatDate } from 'date-fns';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type PostDetailProps = {
  params: Promise<{ slug: string }>;
};

async function getPostBySlug(slug: string) {
  return posts.find((item) => item.slugAsParams === slug);
}

export async function generateMetadata({ params }: PostDetailProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return {
    title: post?.title,
    description: post?.description,
  };
}

export default async function PostDetail({ params }: PostDetailProps) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className='container max-w-3xl py-8 space-y-4'>
      <BackButton />
      <h1 className='text-3xl font-bold mb-4'>{post?.title}</h1>
      <section className='flex justify-between gap-4 mt-2'>
        <time dateTime={post.date} className='text-sm text-muted-foreground'>
          {formatDate(new Date(post.date), 'yyyy-MM-dd')}
        </time>
        <ul className='space-x-2 text-sm'>
          {post.tags?.map((tag) => (
            <Link href='#' key={tag} className='text-blue-500 hover:underline'>
              #{tag}
            </Link>
          ))}
        </ul>
      </section>
      <article className=' prose dark:prose-invert pt-4'>
        <MDXContent code={post.body} />
      </article>
    </main>
  );
}
