/** Fabriques de données structurées schema.org partagées entre les pages. */
import { zones } from '~/content/site-config';

export const breadcrumbLd = (site: URL, items: { nom: string; href: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.nom,
    item: new URL(it.href, site).href,
  })),
});

export const zonesServies = () =>
  zones.filter((z) => z.couvert).map((z) => ({ '@type': 'AdministrativeArea', name: `${z.nom} (${z.code})` }));

export const serviceLd = (
  site: URL,
  s: { nom: string; serviceType: string; description: string; href: string },
) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: s.nom,
  serviceType: s.serviceType,
  description: s.description,
  url: new URL(s.href, site).href,
  provider: { '@id': `${site.href}#organisation` },
  areaServed: zonesServies(),
});

export const faqLd = (faq: { q: string; r: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.r },
  })),
});
