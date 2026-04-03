import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://lesoutils-ia.fr',
  redirects: {
    '/outils': '/comparatifs',
    '/automatisation': '/comparatifs/automatisation',
    '/redaction-ia': '/comparatifs/redaction-ia',
    '/actualites': '/guides',
  },
});
