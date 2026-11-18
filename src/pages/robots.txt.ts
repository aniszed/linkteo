import type { APIRoute } from 'astro';
import { indexable } from '~/content/site-config';

// Tant que PUBLIC_SITE_INDEXABLE n'est pas à true, tout le site est fermé aux robots.
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('/sitemap-index.xml', site).href;
  const body = indexable
    ? `User-agent: *\nAllow: /\nDisallow: /merci\n\nSitemap: ${sitemap}\n`
    : `# Pré-production : indexation désactivée (PUBLIC_SITE_INDEXABLE=false)\nUser-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
