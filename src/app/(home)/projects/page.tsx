import ProjectCard from '@/components/project-card';
import { projects } from '@/data/project';

export const metadata = {
  title: 'My Projects',
  description: 'A showcase of my projects',
};

export default function Page() {
  return (
    <main className='container max-w-4xl py-20'>
      <h1 className='text-4xl font-bold mb-8'>My Projects</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </main>
  );
}
