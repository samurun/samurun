import fs from 'fs';
import path from 'path';

import { projects as projectsData } from '#site/content';

export type Project = (typeof projectsData)[number];

export function getAllProjectSlugs() {
  return projectsData.map((p) => p.slugAsParams);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projectsData.find((p) => p.slugAsParams === slug);
}

export function getProjectImages(project: Project): string[] {
  if (!project.cover) return [];

  const folder = path.join(
    process.cwd(),
    'public',
    path.dirname(project.cover),
  );

  if (!fs.existsSync(folder)) return [];

  return fs
    .readdirSync(folder)
    .filter((file) =>
      ['.png', '.jpg', '.jpeg', '.webp'].includes(
        path.extname(file).toLowerCase(),
      ),
    )
    .map((file) => path.join(path.dirname(project.cover!), file));
}
