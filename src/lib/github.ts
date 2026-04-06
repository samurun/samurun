import type { ProjectType } from '@/data/project';

type GithubRepo = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  fork: boolean;
  archived: boolean;
  private: boolean;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  created_at: string;
};

const GITHUB_USER = 'samurun';
/** Only repos tagged with this GitHub topic will be shown. */
const FEATURED_TOPIC = 'portfolio';

/**
 * Merge static projects with GitHub repos.
 * - Dedupe by slug (static wins — richer MDX data)
 * - Sort by date desc
 */
export async function getMergedProjects(
  staticProjects: ProjectType[],
): Promise<ProjectType[]> {
  const ghProjects = await getGithubProjects();
  const staticSlugs = new Set(staticProjects.map((p) => p.slug));
  const merged = [
    ...staticProjects,
    ...ghProjects.filter((p) => !staticSlugs.has(p.slug)),
  ];
  return merged.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export async function getGithubProjects(): Promise<ProjectType[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          }),
        },
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) return [];

    const repos: GithubRepo[] = await res.json();

    return repos
      .filter(
        (r) =>
          !r.fork &&
          !r.archived &&
          !r.private &&
          r.description &&
          r.topics?.includes(FEATURED_TOPIC),
      )
      .map((r) => ({
        source: 'github' as const,
        date: r.pushed_at,
        slug: r.name,
        name: r.name,
        description: r.description ?? '',
        cover: `https://opengraph.githubassets.com/1/${r.full_name}`,
        links: {
          github: r.html_url,
          demo: r.homepage ?? undefined,
        },
        tags: r.topics?.length
          ? r.topics.slice(0, 5)
          : r.language
            ? [r.language.toLowerCase()]
            : [],
        href: r.html_url,
      }));
  } catch {
    return [];
  }
}
