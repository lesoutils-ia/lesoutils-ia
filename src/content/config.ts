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

    // SEO
    ogImage: z.string().optional(),
    noindex: z.boolean().optional().default(false),

    // Schema Review — à renseigner sur les fiches outils et comparatifs
    toolName: z.string().optional(),       // nom de l'outil testé (ex: "Deepseek")
    rating: z.number().optional(),         // note sur 5 (ex: 4.2)
    reviewCount: z.number().optional(),    // nombre d'avis (ex: 14)
  }),
});

export const collections = { articles };
