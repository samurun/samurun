import { defineCollection, defineConfig, s } from 'velite';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const computedFields = <T extends { path: string }>(data: T) => ({
  ...data,
  slug: data.path,
  slugAsParams: data.path.split('/').slice(1).join('/'),
});

const posts = defineCollection({
  name: 'Post',
  pattern: 'posts/**/*.mdx',
  schema: s
    .object({
      path: s.path(),
      title: s.string().max(99),
      tags: s.array(s.string()).optional(),
      description: s.string().max(999).optional(),
      date: s.isodate(),
      body: s.mdx(),
    })
    .transform(computedFields),
});

const projects = defineCollection({
  name: 'Project',
  pattern: 'projects/**/*.mdx',
  schema: s
    .object({
      path: s.path(),
      title: s.string().max(99),
      cover: s.string(),
      tags: s.array(s.string()).optional(),
      description: s.string().max(999).optional(),
      date: s.isodate(),
      links: s.object({ demo: s.string(), git: s.string() }),
      body: s.mdx(),
    })
    .transform(computedFields),
});

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { posts, projects },
  mdx: {
    rehypePlugins: [
      [rehypePrettyCode, { theme: 'github-dark' }],
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['subheading-anchor'],
            ariaLabel: 'Link to section',
          },
        },
      ],
    ],
    remarkPlugins: [],
  },
});
