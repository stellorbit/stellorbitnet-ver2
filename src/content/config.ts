// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
    slug: z.string().optional(),
  }),
});

<<<<<<< HEAD
export const collections = { blog };
=======
export const collections = { blog };
>>>>>>> 0136ddfac91f9078b298f3eb1a3a850842975327
