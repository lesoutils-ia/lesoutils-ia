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

    // SEO — champs optionnels ajoutés
    ogImage: z.string().optional(),   // image spécifique à l'article (sinon /og-default.jpg)
    noindex: z.boolean().optional().default(false), // true = exclure de Google (brouillons, pages test)
    slug: z.string().optional(),      // slug personnalisé si différent du nom de fichier
  }),
});

export const collections = { articles };
