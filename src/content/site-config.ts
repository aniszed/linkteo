/**
 * site-config.ts — toutes les informations modifiables du site.
 *
 * Règle : ce fichier ne contient que des faits vérifiables.
 * Tout ce qui n'est pas encore vrai ou pas encore connu est marqué TODO
 * et n'est PAS affiché (voir `npm run check:todo` pour la liste).
 */

// ---------------------------------------------------------------------------
// Société (source : Insee / RNE, mise à jour du 17/11/2026)
// ---------------------------------------------------------------------------
export const entreprise = {
  nom: 'Linkteo',
  raisonSociale: 'LINKTEO',
  formeJuridique: 'Société par actions simplifiée (SAS)',
  capitalSocial: null as string | null, // TODO: capital social (voir Kbis), obligatoire dans les mentions légales
  siren: '131 710 816',
  siret: '131 710 816 00011',
  rcs: 'RCS Paris 131 710 816',
  tva: 'FR50131710816',
  naf: '6190Z — Autres activités de télécommunication',
  dateCreation: '2026-10-21',
  siege: {
    rue: '47 rue Vivienne',
    codePostal: '75002',
    ville: 'Paris',
    pays: 'FR',
  },
  president: 'Hamza Mkadmi',
  directeurPublication: 'Hamza Mkadmi', // TODO: confirmer le directeur de la publication
} as const;

// ---------------------------------------------------------------------------
// Coordonnées
// ---------------------------------------------------------------------------
export const contact = {
  /** TODO: numéro de téléphone. Format affiché + format international pour le lien tel:. */
  telephone: null as { affichage: string; international: string } | null,
  /** TODO: adresse email sur le domaine (contact@linkteo.com) une fois le domaine et la messagerie en place. */
  email: null as string | null,
  /** Plages de réponse annoncées. TODO: confirmer les horaires réels. */
  horaires: 'Du lundi au vendredi, 8 h – 18 h',
  /** Engagement de délai de réponse. TODO: confirmer que l'engagement est tenable avant de l'afficher. */
  delaiReponse: { texte: 'Réponse sous 24 h ouvrées', confirme: false },
  /** TODO: URL de la fiche Google Business Profile (à créer en mode « zone desservie », adresse masquée). */
  googleBusinessProfile: null as string | null,
  /** TODO: page LinkedIn de la société. */
  linkedin: null as string | null,
} as const;

// ---------------------------------------------------------------------------
// Indexation : false tant que le site tourne sur linkteo.netlify.app
// Pilotée par la variable d'environnement PUBLIC_SITE_INDEXABLE (Netlify).
// ---------------------------------------------------------------------------
export const indexable = import.meta.env.PUBLIC_SITE_INDEXABLE === 'true';

// ---------------------------------------------------------------------------
// Qualifications : seules celles avec `detenue: true` sont affichées.
// Ajouter la date d'obtention et passer à true au fur et à mesure.
// ---------------------------------------------------------------------------
export interface Qualification {
  id: string;
  libelle: string;
  detail: string;
  detenue: boolean;
}

export const qualifications: Qualification[] = [
  { id: 'rc-pro', libelle: 'Assurance RC professionnelle', detail: 'Attestation fournie sur demande', detenue: false }, // TODO
  { id: 'aipr', libelle: 'AIPR opérateur', detail: 'Travaux à proximité des réseaux', detenue: false }, // TODO
  { id: 'caces-r486', libelle: 'CACES R486', detail: 'Nacelle (PEMP), interventions sur poteaux', detenue: false }, // TODO
  { id: 'travail-hauteur', libelle: 'Travail en hauteur', detail: 'Port du harnais, échelles, poteaux', detenue: false }, // TODO
  { id: 'h0b0', libelle: 'Habilitation électrique H0B0', detail: 'Intervention à proximité d’installations électriques', detenue: false }, // TODO
];

// ---------------------------------------------------------------------------
// Pièces administratives pour les donneurs d'ordre
// `disponible: false` = pas encore listée sur le site.
// ---------------------------------------------------------------------------
export const piecesAdministratives = [
  { libelle: 'Extrait Kbis de moins de 3 mois', disponible: true },
  { libelle: 'Attestation de vigilance URSSAF (renouvelée tous les 6 mois)', disponible: true },
  { libelle: 'Attestation de régularité fiscale', disponible: true },
  { libelle: 'RIB au nom de la société', disponible: true },
  { libelle: 'Liste nominative des salariés étrangers soumis à autorisation de travail', disponible: true },
  { libelle: 'Attestation d’assurance RC professionnelle', disponible: false }, // TODO: dès souscription
  { libelle: 'Copies des habilitations et titres des techniciens', disponible: false }, // TODO: dès obtention
] as const;

/** TODO: nombre de techniciens. Tant que null, aucune capacité chiffrée n'est affichée. */
export const nombreTechniciens: number | null = null;

/** TODO: références clients (nom, logo, accord écrit pour citer). Section masquée tant que vide. */
export const references: { nom: string; logo?: string }[] = [];

// ---------------------------------------------------------------------------
// Prestations
// `page` = slug de la page dédiée (phase 2). `ancre` = section dans cette page.
// ---------------------------------------------------------------------------
export type IconName =
  | 'raccordement'
  | 'sav'
  | 'maintenance'
  | 'malfacon'
  | 'mesure'
  | 'poteau';

export interface Prestation {
  id: string;
  icone: IconName;
  titre: string;
  resume: string;
  points: string[];
  page: string;
}

export const prestations: Prestation[] = [
  {
    id: 'raccordement',
    icone: 'raccordement',
    titre: 'Raccordement client final (D3)',
    resume: 'Tirage du câble de branchement du PBO jusqu’au logement, pose et test de la PTO.',
    points: ['Souterrain, aérien et façade', 'Immeuble et pavillon', 'Photos PBO et PTO à la clôture'],
    page: '/raccordement-fibre-optique',
  },
  {
    id: 'sav',
    icone: 'sav',
    titre: 'SAV et dépannage',
    resume: 'Diagnostic et remise en service sur des liens déjà raccordés : coupure, affaiblissement, PTO endommagée.',
    points: ['Localisation du défaut', 'Reprise de soudure ou de connecteur', 'Compte rendu de cause'],
    page: '/sav-depannage-fibre-optique',
  },
  {
    id: 'maintenance',
    icone: 'maintenance',
    titre: 'Maintenance préventive et curative',
    resume: 'Contrôle et remise en état des points de branchement et des boîtiers sur le réseau de distribution.',
    points: ['PBO, boîtiers d’étage, colonnes', 'Remise en ordre du brassage', 'Étiquetage et lovage'],
    page: '/maintenance-reseau-ftth',
  },
  {
    id: 'malfacon',
    icone: 'malfacon',
    titre: 'Reprises de malfaçon',
    resume: 'Reprise des raccordements non conformes signalés par l’opérateur d’infrastructure ou lors d’un audit.',
    points: ['Traitement de listes de reprises', 'Avant / après photographié', 'Mise en conformité aux règles d’ingénierie'],
    page: '/maintenance-reseau-ftth#malfacons',
  },
  {
    id: 'mesure',
    icone: 'mesure',
    titre: 'Mesures et contrôles optiques',
    resume: 'Recette et diagnostic par réflectométrie et photométrie, avec fichiers de mesure exploitables.',
    points: ['Mesure OTDR', 'Photométrie (puissance, affaiblissement)', 'Fichiers .sor et rapport'],
    page: '/mesures-controles-optiques',
  },
  {
    id: 'poteau',
    icone: 'poteau',
    titre: 'Poteaux et façades',
    resume: 'Interventions en hauteur sur le réseau aérien : ancrages, passages en façade, boîtiers sur poteau.',
    points: ['Pose d’ancrages et de supports', 'Cheminement en façade', 'Balisage du chantier'],
    page: '/raccordement-fibre-optique#aerien-facade',
  },
];

// ---------------------------------------------------------------------------
// Zones d'intervention (départements d'Île-de-France)
// `couvert: false` = affiché sur la carte, mais hors zone principale.
// ---------------------------------------------------------------------------
export interface Zone {
  code: string;
  nom: string;
  slug: string; // URL : /zones/<slug>
  couvert: boolean;
}

export const zones: Zone[] = [
  { code: '75', nom: 'Paris', slug: 'paris', couvert: true },
  { code: '77', nom: 'Seine-et-Marne', slug: 'seine-et-marne', couvert: true },
  { code: '78', nom: 'Yvelines', slug: 'yvelines', couvert: true },
  { code: '91', nom: 'Essonne', slug: 'essonne', couvert: true },
  { code: '92', nom: 'Hauts-de-Seine', slug: 'hauts-de-seine', couvert: true },
  { code: '93', nom: 'Seine-Saint-Denis', slug: 'seine-saint-denis', couvert: true },
  { code: '94', nom: 'Val-de-Marne', slug: 'val-de-marne', couvert: true },
  { code: '95', nom: 'Val-d’Oise', slug: 'val-d-oise', couvert: true },
];

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------
/**
 * Pages déjà construites. Un lien vers une page absente de cette liste
 * n'est pas rendu (évite les 404 pendant la construction par phases).
 */
export const pagesPubliees: string[] = [
  '/',
  '/raccordement-fibre-optique',
  '/sav-depannage-fibre-optique',
  '/maintenance-reseau-ftth',
  '/mesures-controles-optiques',
  '/sous-traitance-fibre-optique',
  '/mentions-legales',
  '/politique-de-confidentialite',
];

export const estPubliee = (href: string): boolean => pagesPubliees.includes(href.split('#')[0] || '/');

export const navigation = [
  { label: 'Prestations', href: '/#prestations' },
  { label: 'Sous-traitance', href: '/sous-traitance-fibre-optique' },
  { label: 'Zones', href: '/#zones' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/#contact' },
] as const;

// ---------------------------------------------------------------------------
// SEO : titles et descriptions rédigés à la main, un par page.
// ---------------------------------------------------------------------------
export const seo = {
  accueil: {
    title: 'Linkteo — Sous-traitant fibre optique en Île-de-France (FTTH)',
    description:
      'Raccordement D3, SAV, maintenance FTTH, reprises de malfaçon et mesures OTDR en Île-de-France. Sous-traitance pour intégrateurs, opérateurs et exploitants de RIP.',
  },
  merci: {
    title: 'Demande envoyée — Linkteo',
    description: 'Votre demande a bien été transmise à Linkteo.',
  },
  notFound: {
    title: 'Page introuvable — Linkteo',
    description: 'Cette page n’existe pas ou a été déplacée.',
  },
} as const;
