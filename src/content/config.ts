import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    tags: z.array(z.string()).optional().default([]),
    author: z.string().default('Équipe lesoutils-ia'),
    authorInitials: z.string().default('LI'),
    publishDate: z.string(),
    updateDate: z.string().optional(),
    readTime: z.string().default('5 min'),
    featured: z.boolean().optional().default(false),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { articles };
