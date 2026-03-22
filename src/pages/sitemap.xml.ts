import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const site = 'https://lesoutils-ia.fr';

  // Pages statiques du site
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/comparatifs/', priority: '0.8', changefreq: 'weekly' },
    { url: '/redaction-ia/', priority: '0.8', changefreq: 'weekly' },
    { url: '/automatisation/', priority: '0.8', changefreq: 'weekly' },
    { url: '/ia-pour-pme/', priority: '0.8', changefreq: 'weekly' },
    { url: '/guides/', priority: '0.8', changefreq: 'weekly' },
    { url: '/actualites/', priority: '0.7', changefreq: 'daily' },
    { url: '/newsletter/', priority: '0.6', changefreq: 'monthly' },
    { url: '/outils/', priority: '0.7', changefreq: 'weekly' },
    { url: '/comparatifs/crm/', priority: '0.7', changefreq: 'weekly' },
  ];

  // Articles dynamiques depuis la collection Astro
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
