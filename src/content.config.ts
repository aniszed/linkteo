import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Pages prestations : un fichier Markdown par prestation dans src/content/prestations/.
 * Le nom du fichier donne l'URL : raccordement-fibre-optique.md → /raccordement-fibre-optique
 */
const prestations = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/prestations' }),
  schema: z.object({
    /** Balise <title> : rédigée à la main, 60 caractères environ. */
    title: z.string().max(70),
    /** Meta description : rédigée à la main, 150 à 160 caractères. */
    description: z.string().min(110).max(170),
    h1: z.string(),
    /** Nom court (fil d'Ariane, liens). */
    nom: z.string(),
    /** Type de service pour le JSON-LD. */
    serviceType: z.string(),
    icone: z.enum(['raccordement', 'sav', 'maintenance', 'malfacon', 'mesure', 'poteau', 'soudure']),
    chapo: z.string(),
    /** Points clés affichés à côté du chapô. */
    essentiel: z.array(z.string()).min(3).max(6),
    /** Livrables remis au donneur d'ordre. */
    livrables: z.array(z.string()).min(2),
    faq: z.array(z.object({ q: z.string(), r: z.string() })).default([]),
    /** Ordre d'affichage. */
    ordre: z.number(),
  }),
});

export const collections = { prestations };
