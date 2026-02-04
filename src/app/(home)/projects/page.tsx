import { projects } from '@/data/project';
import ProjectCard from '@/components/project-card';

export const metadata = {
  title: 'Projects',
  description: 'A showcase of my projects',
};

export default function Page() {
  return (
    <main className='border-b border-border min-h-screen'>
      <div className='container py-20'>
        <div className='flex items-center gap-4 mb-12'>
          <h1 className='text-sm font-mono font-bold uppercase tracking-[0.2em]'>
            // ALL PROJECTS
          </h1>
          <div className='h-[1px] flex-1 bg-border/50' />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 border-t border-l border-border'>
          {projects.map((project) => (
            <div key={project.slug} className='border-r border-b border-border'>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
