import { projects } from '@/data/project';
import { getMergedProjects } from '@/lib/github';
import ProjectCard from '@/components/project-card';

export const metadata = {
  title: 'Projects',
  description: 'A showcase of my projects',
};

export default async function Page() {
  const merged = await getMergedProjects(projects);

  return (
    <main className='border-b border-border/50 min-h-screen'>
      <div className='container py-20'>
        <div className='mb-12'>
          <h1 className='text-lg font-semibold tracking-tight'>
            Projects
            <span className='text-sm text-muted-foreground ml-2'>
              {merged.length}
            </span>
          </h1>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {merged.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </main>
  );
}
