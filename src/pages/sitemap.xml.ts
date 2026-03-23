import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const site = 'https://lesoutils-ia.fr';

  const staticPages = [
    // Pages principales
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/comparatifs/', priority: '0.9', changefreq: 'weekly' },
    { url: '/guides/', priority: '0.8', changefreq: 'weekly' },
    { url: '/actualites/', priority: '0.7', changefreq: 'daily' },
    { url: '/newsletter/', priority: '0.6', changefreq: 'monthly' },
    { url: '/methode/', priority: '0.6', changefreq: 'monthly' },
    { url: '/contact/', priority: '0.5', changefreq: 'monthly' },
    { url: '/mentions-legales/', priority: '0.3', changefreq: 'yearly' },

    // Pages catégories
    { url: '/redaction-ia/', priority: '0.7', changefreq: 'weekly' },
    { url: '/automatisation/', priority: '0.7', changefreq: 'weekly' },
    { url: '/ia-pour-pme/', priority: '0.7', changefreq: 'weekly' },
    { url: '/outils/', priority: '0.7', changefreq: 'weekly' },

    // Pages comparatifs — priorité haute car pages de monétisation
    { url: '/comparatifs/crm/', priority: '0.9', changefreq: 'monthly' },
    { url: '/comparatifs/chatgpt-alternatives/', priority: '0.9', changefreq: 'monthly' },
    { url: '/comparatifs/email-marketing/', priority: '0.9', changefreq: 'monthly' },
    { url: '/comparatifs/automatisation/', priority: '0.9', changefreq: 'monthly' },
    { url: '/comparatifs/redaction-ia/', priority: '0.9', changefreq: 'monthly' },
    { url: '/comparatifs/prospection/', priority: '0.9', changefreq: 'monthly' },
    { url: '/comparatifs/ia-image/', priority: '0.9', changefreq: 'monthly' },
    { url: '/comparatifs/ia-pour-pme/', priority: '0.9', changefreq: 'monthly' },
    { url: '/comparatifs/ia-comptabilite/', priority: '0.9', changefreq: 'monthly' },
    { url: '/comparatifs/agents-ia/', priority: '0.9', changefreq: 'monthly' },
    { url: '/comparatifs/ia-service-client/', priority: '0.9', changefreq: 'monthly' },
    { url: '/comparatifs/formation-ia/', priority: '0.9', changefreq: 'monthly' },
  ];

  const articles = await getCollection('articles', ({ data }) => !data.draft);
  const today = new Date().toISOString().split('T')[0];

  const staticUrls = staticPages.map(page => `
  <url>
    <loc>${site}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('');

  const articleUrls = articles.map(article => `
  <url>
    <loc>${site}/articles/${article.slug}/</loc>
    <lastmod>${article.data.updateDate || article.data.publishDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${articleUrls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
