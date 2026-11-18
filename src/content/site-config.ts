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
  | 'poteau'
  | 'soudure';

export interface Prestation {
  id: string;
  icone: IconName;
  titre: string;
  resume: string;
  points: string[];
  page: string;
}

// Cœur de métier : le D2 (distribution, du SRO aux PBO).
// Le raccordement client final (D3) n'est pas proposé pour l'instant : sa page existe
// (src/content/prestations/raccordement-fibre-optique.md) mais n'est pas publiée.
// TODO: le jour où le D3 démarre, ajouter '/raccordement-fibre-optique' à pagesPubliees et une entrée ici.
export const prestations: Prestation[] = [
  {
    id: 'deploiement',
    icone: 'poteau',
    titre: 'Déploiement du réseau de distribution (D2)',
    resume: 'Tirage des câbles de distribution du SRO aux PBO, en souterrain, en aérien et en façade, et pose des boîtiers.',
    points: ['Fourreaux et chambres, poteaux, façades', 'Pose de PBO et de BPE', 'Lovage et étiquetage'],
    page: '/deploiement-fibre-optique-d2',
  },
  {
    id: 'soudure',
    icone: 'soudure',
    titre: 'Soudure et raccordement de boîtiers',
    resume: 'Épissures par fusion dans les BPE et les PBO selon le plan de boîte du bureau d’études, piquages sur câble.',
    points: ['Soudure par fusion', 'Respect du plan d’épissurage', 'Cassettes rangées, fibres repérées'],
    page: '/deploiement-fibre-optique-d2#soudure',
  },
  {
    id: 'mesure',
    icone: 'mesure',
    titre: 'Mesures et recette',
    resume: 'Recette des liens par réflectométrie et photométrie, avec fichiers de mesure exploitables.',
    points: ['Mesure OTDR', 'Photométrie (puissance, affaiblissement)', 'Fichiers .sor et rapport'],
    page: '/mesures-controles-optiques',
  },
  {
    id: 'maintenance',
    icone: 'maintenance',
    titre: 'Maintenance préventive et curative',
    resume: 'Contrôle et remise en état des PBO, des boîtiers et des sous-répartiteurs du réseau de distribution.',
    points: ['PBO, BPE, boîtiers d’étage', 'Remise en ordre du brassage, selon consignes', 'Étiquetage et lovage'],
    page: '/maintenance-reseau-ftth',
  },
  {
    id: 'malfacon',
    icone: 'malfacon',
    titre: 'Reprises de malfaçon',
    resume: 'Reprise des non-conformités relevées par l’opérateur d’infrastructure ou lors d’un audit de réseau.',
    points: ['Traitement de listes de reprises', 'Avant / après photographié', 'Mise en conformité aux règles d’ingénierie'],
    page: '/maintenance-reseau-ftth#malfacons',
  },
  {
    id: 'sav',
    icone: 'sav',
    titre: 'Dépannage réseau',
    resume: 'Localisation et réparation des coupures et des défauts sur le réseau de distribution : câble sectionné, boîtier endommagé.',
    points: ['Localisation à l’OTDR', 'Reprise d’épissures ou de câble', 'Compte rendu de cause'],
    page: '/sav-depannage-fibre-optique',
  },
];

// ---------------------------------------------------------------------------
// Zones d'intervention (départements d'Île-de-France)
// `couvert: false` = affiché sur la carte, mais hors zone principale.
// ---------------------------------------------------------------------------
export type Couronne = 'paris' | 'petite' | 'grande';

export interface Zone {
  code: string;
  nom: string;
  /** URL d'une future page départementale : /zones/<slug>. Créée quand il y aura des chantiers à montrer. */
  slug: string;
  couvert: boolean;
  couronne: Couronne;
  /** Ce qui caractérise le terrain pour un technicien fibre. Faits généraux, vérifiables. */
  terrain: string;
  /** Principales communes, citées à titre de repère. */
  communes: string[];
}

export const zones: Zone[] = [
  {
    code: '75', nom: 'Paris', slug: 'paris', couvert: true, couronne: 'paris',
    terrain: 'Immeubles collectifs anciens et récents : colonnes montantes, boîtiers d’étage, gaines techniques. Accès à organiser (gardien, syndic, badge) et stationnement contraint.',
    communes: ['Les 20 arrondissements'],
  },
  {
    code: '92', nom: 'Hauts-de-Seine', slug: 'hauts-de-seine', couvert: true, couronne: 'petite',
    terrain: 'Habitat collectif dense, quartiers de bureaux et zones pavillonnaires. Réseau surtout en immeuble et en souterrain.',
    communes: ['Nanterre', 'Boulogne-Billancourt', 'Colombes', 'Courbevoie', 'Rueil-Malmaison', 'Antony'],
  },
  {
    code: '93', nom: 'Seine-Saint-Denis', slug: 'seine-saint-denis', couvert: true, couronne: 'petite',
    terrain: 'Grands ensembles et résidences de bailleurs sociaux, centres-villes denses et pavillonnaire. Les interventions en parties communes se coordonnent avec le gestionnaire.',
    communes: ['Saint-Denis', 'Montreuil', 'Aubervilliers', 'Aulnay-sous-Bois', 'Noisy-le-Grand', 'Bobigny'],
  },
  {
    code: '94', nom: 'Val-de-Marne', slug: 'val-de-marne', couvert: true, couronne: 'petite',
    terrain: 'Alternance de collectif dense et de grands secteurs pavillonnaires, avec un réseau en façade et en souterrain.',
    communes: ['Créteil', 'Vitry-sur-Seine', 'Champigny-sur-Marne', 'Saint-Maur-des-Fossés', 'Ivry-sur-Seine'],
  },
  {
    code: '77', nom: 'Seine-et-Marne', slug: 'seine-et-marne', couvert: true, couronne: 'grande',
    terrain: 'Le plus vaste département d’Île-de-France : villes nouvelles, périurbain et villages. Réseau aérien fréquent hors des centres, temps de trajet à intégrer au planning.',
    communes: ['Meaux', 'Chelles', 'Melun', 'Pontault-Combault', 'Savigny-le-Temple'],
  },
  {
    code: '78', nom: 'Yvelines', slug: 'yvelines', couvert: true, couronne: 'grande',
    terrain: 'Villes résidentielles, vallée de la Seine et secteurs ruraux à l’ouest. Mélange de souterrain en ville et d’aérien sur poteaux en périphérie.',
    communes: ['Versailles', 'Sartrouville', 'Mantes-la-Jolie', 'Saint-Germain-en-Laye', 'Poissy'],
  },
  {
    code: '91', nom: 'Essonne', slug: 'essonne', couvert: true, couronne: 'grande',
    terrain: 'Agglomérations au nord, plateau de Saclay, sud rural. Pavillonnaire dominant, réseau aérien et en façade fréquent.',
    communes: ['Évry-Courcouronnes', 'Corbeil-Essonnes', 'Massy', 'Palaiseau', 'Savigny-sur-Orge'],
  },
  {
    code: '95', nom: 'Val-d’Oise', slug: 'val-d-oise', couvert: true, couronne: 'grande',
    terrain: 'Agglomération dense au sud-est, ville nouvelle de Cergy-Pontoise, Vexin rural au nord-ouest. Beaucoup de pavillonnaire et de réseau aérien.',
    communes: ['Argenteuil', 'Cergy', 'Sarcelles', 'Garges-lès-Gonesse', 'Pontoise', 'Franconville'],
  },
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
  '/deploiement-fibre-optique-d2',
  '/sav-depannage-fibre-optique',
  '/maintenance-reseau-ftth',
  '/mesures-controles-optiques',
  '/sous-traitance-fibre-optique',
  '/zone-intervention',
  '/mentions-legales',
  '/politique-de-confidentialite',
];

export const estPubliee = (href: string): boolean => pagesPubliees.includes(href.split('#')[0] || '/');

export const navigation = [
  { label: 'Prestations', href: '/#prestations' },
  { label: 'Sous-traitance', href: '/sous-traitance-fibre-optique' },
  { label: 'Zones', href: '/zone-intervention' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/#contact' },
] as const;

// ---------------------------------------------------------------------------
// SEO : titles et descriptions rédigés à la main, un par page.
// ---------------------------------------------------------------------------
export const seo = {
  accueil: {
    title: 'Linkteo — Sous-traitant fibre optique D2 en Île-de-France',
    description:
      'Déploiement FTTH D2 en sous-traitance : tirage de câbles, pose de PBO et BPE, soudure, recette OTDR, maintenance et reprises. 8 départements d’Île-de-France.',
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
