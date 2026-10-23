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

export type GithubProject = {
  date: string;
  slug: string;
  name: string;
  description: string;
  cover: string;
  url: string;
  tags: string[];
};

/** Public repos tagged with FEATURED_TOPIC, most recently pushed first. */
export async function getGithubProjects(): Promise<GithubProject[]> {
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
        date: r.pushed_at,
        slug: r.name,
        name: r.name,
        description: r.description ?? '',
        cover: `https://opengraph.githubassets.com/1/${r.full_name}`,
        tags: r.topics?.length
          ? r.topics.slice(0, 5)
          : r.language
            ? [r.language.toLowerCase()]
            : [],
        url: r.html_url,
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {
    return [];
  }
}
