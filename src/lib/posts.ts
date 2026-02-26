import { posts as postsData } from '#site/content';

export type Post = (typeof postsData)[number];

export function getAllPostSlugs() {
  return postsData.map((p) => p.slug);
}

export function getPostBySlug(slug: string): Post | undefined {
  return postsData.find((p) => p.slug === slug);
}
