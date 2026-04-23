import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string().optional(),
    updatedDate: z.coerce.date().optional(),
    heroImage: image().optional(),
    draft: z.boolean().default(false),
    slug: z.string().optional(),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
