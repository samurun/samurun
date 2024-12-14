import { projects } from '#site/content';
import Link from 'next/link';
import { formatDate } from 'date-fns';

export const metadata = {
  title: 'My Projects',
  description: 'A showcase of my projects',
};

export default function Page() {
  return (
    <main className='container max-w-4xl py-20'>
      <h1 className='text-4xl font-bold mb-8'>My Projects</h1>
      <div className='grid gap-6'>
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={project.slug}
            className='flex items-baseline gap-4 justify-between group border-b border-transparent hover:border-muted-foreground transition-all'
          >
            <p>{project.title}</p>
            <time
              dateTime={project.date}
              className='text-muted-foreground text-sm'
            >
              {formatDate(project.date, 'yyyy-MM-dd')}
            </time>
          </Link>
        ))}
      </div>
    </main>
  );
}
