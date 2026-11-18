// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Domaine canonique unique (sans www). Netlify redirige www et .fr vers lui.
export default defineConfig({
  site: 'https://linkteo.com',
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'file',
    inlineStylesheets: 'always',
  },
  compressHTML: true,
  integrations: [
    sitemap({
      filter: (page) => !/\/(merci|404)$/.test(page),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
