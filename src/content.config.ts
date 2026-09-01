import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

// Publications: structured data, one flat JSON array. Complete archive.
const publications = defineCollection({
  loader: file('src/data/publications.json'),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    venue: z.string(),
    venueShort: z.string().optional(),
    year: z.number(),
    // Conference/publication month (1-13), used only for chronological sorting,
    // never displayed. 13 = preprints (treated as most recent in their year).
    month: z.number().min(1).max(13).optional(),
    type: z.enum(['conference', 'journal', 'workshop', 'preprint', 'thesis']).default('conference'),
    theme: z.enum(['generative', 'systems', 'learning', 'other']).default('other'),
    links: z
      .object({
        paper: z.string().url().optional(),
        code: z.string().url().optional(),
        project: z.string().url().optional(),
        arxiv: z.string().url().optional(),
      })
      .default({}),
    award: z.string().optional(),
    selected: z.boolean().default(false),
    // "Louis Béthune" appears as this string in the authors array — used to bold self
    role: z.string().optional(),
  }),
});

// Projects: the "Selected work" cards + optional detail pages.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      year: z.number(),
      order: z.number().default(99),
      featured: z.boolean().default(false),
      summary: z.string(),
      role: z.string().optional(),
      theme: z.array(z.string()).default([]),
      image: image().optional(),
      imageAlt: z.string().optional(),
      links: z
        .object({
          paper: z.string().url().optional(),
          code: z.string().url().optional(),
          weights: z.string().url().optional(),
          project: z.string().url().optional(),
          talk: z.string().url().optional(),
        })
        .default({}),
      hasDetail: z.boolean().default(false),
    }),
});

// Long-form prose pages (Home welcome, About bio, Research intro). Markdown, or
// MDX where a page needs a component (e.g. obfuscated email links).
const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string().optional(),
  }),
});

// Writing / blog posts. Markdown or MDX (MDX allows gifs + light interaction).
const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { publications, projects, pages, writing };
