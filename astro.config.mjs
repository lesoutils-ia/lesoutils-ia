import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://lesoutils-ia.fr',
  integrations: [
    sitemap({
      // Exclure les pages qu'on ne veut pas dans Google
      filter: (page) =>
        !page.includes('/mentions-legales') &&
        !page.includes('/contact'),
    }),
  ],
});
