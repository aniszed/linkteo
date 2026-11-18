# linkteo.com — site vitrine Linkteo

Site vitrine de Linkteo, société de raccordement et de maintenance fibre optique (FTTH) en Île-de-France.

Astro 5 (génération statique, aucun JavaScript côté client), Tailwind CSS 4, TypeScript strict.
Hébergement Netlify (offre gratuite), formulaires Netlify Forms.

## Démarrer

Prérequis : Node.js 22 (voir `.nvmrc`). Node 22.19 ou plus évite un avertissement à l'installation.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # vérification TypeScript (astro check) puis génération dans dist/
npm run preview    # sert dist/ en local
npm run check:todo # liste les informations encore à fournir
```

## Modifier le contenu sans toucher au code

| Quoi | Où |
|---|---|
| Coordonnées, téléphone, email, horaires | `src/content/site-config.ts` → `contact` |
| Identité légale (SIREN, capital, siège…) | `src/content/site-config.ts` → `entreprise` |
| Habilitations et assurances | `qualifications` : passer `detenue` à `true` pour les afficher |
| Pièces du dossier administratif | `piecesAdministratives` |
| Nombre de techniciens, références clients | `nombreTechniciens`, `references` (masqués tant que vides) |
| Prestations (titres, résumés, points) | `prestations` |
| Départements couverts | `zones` (`couvert: true / false`) |
| Titles et meta descriptions | `seo` |
| Questions fréquentes | `src/content/faq.ts` |

Règle : rien n'est affiché s'il n'est pas vrai. Ce qui manque est marqué `TODO` et n'apparaît pas sur le site.

Une nouvelle page n'est liée depuis le menu, le pied de page et les cartes que lorsqu'elle est ajoutée à
`pagesPubliees` dans `site-config.ts`. Cela évite les liens morts pendant la construction.

## Structure

```
brand/                  logo, favicons, image Open Graph + script de génération
public/                 fichiers servis tels quels (favicons, og-image, manifest)
scripts/
  build-idf-map.mjs     génère la carte d'Île-de-France (src/data/idf-map.ts)
  check-todo.mjs        checklist des TODO
src/
  content/              site-config.ts, faq.ts : tout le contenu modifiable
  components/
    layout/             Header, Footer, MobileCallBar (barre d'appel mobile), Logo
    sections/           sections de l'accueil
    icons/Icon.astro    icônes métier en SVG inline
    diagrams/           schéma NRO → SRO → PBO → PTO
  layouts/              BaseLayout (SEO, Open Graph, JSON-LD), PageTexte
  pages/                une page = un fichier ; robots.txt généré
  styles/global.css     couleurs, typographies, composants (tokens Tailwind 4)
netlify.toml            build, en-têtes de sécurité, cache, redirections du domaine
```

## Déployer sur Netlify

1. Pousser le dépôt sur GitHub (`aniszed/linkteo`).
2. Netlify → *Add new site* → *Import an existing project* → GitHub → `linkteo`.
   Les réglages de build sont lus dans `netlify.toml`, il n'y a rien à saisir.
3. Netlify → *Site configuration* → *Site details* → renommer le site en `linkteo`
   (adresse de test : `https://linkteo.netlify.app`).
4. Netlify → *Forms* : activer la détection des formulaires, puis ajouter une notification email
   (*Forms* → *Form notifications*) pour recevoir chaque demande.

### Pré-production et indexation

Tant que `PUBLIC_SITE_INDEXABLE` vaut `false` (valeur par défaut dans `netlify.toml`), toutes les pages
portent `noindex` et `robots.txt` bloque les robots. Le site de test n'est donc pas indexé.

### Mise en ligne sur linkteo.com

1. Acheter `linkteo.com` (et `linkteo.fr` si souhaité), puis dans Netlify → *Domain management* :
   ajouter `linkteo.com` comme domaine principal et `www.linkteo.com`, `linkteo.fr` comme alias.
   Suivre les instructions DNS de Netlify. Le certificat HTTPS est automatique.
2. Dans `netlify.toml` : décommenter les redirections 301 vers `https://linkteo.com`
   et passer `PUBLIC_SITE_INDEXABLE` à `"true"`.
3. Pousser. Vérifier `https://linkteo.com/robots.txt` (doit autoriser) et le code source (`index, follow`).
4. Google Search Console : ajouter la propriété `linkteo.com`, envoyer `https://linkteo.com/sitemap-index.xml`.

## Qualité

- Lighthouse (mobile et ordinateur, accueil et mentions légales) : 100 / 100 / 100 / 100,
  mesuré en local le 18/11/2026 avec l'indexation activée. À revérifier sur l'URL publique
  avec PageSpeed Insights après le déploiement.
- Données structurées : `Organization` sur toutes les pages, `LocalBusiness` (avec `areaServed`) sur l'accueil.
  À valider sur https://search.google.com/test/rich-results une fois en ligne.
- Aucun cookie, aucun traceur, aucune police chargée depuis un service tiers.

## Carte d'Île-de-France

Contours : IGN Admin Express via [france-geojson](https://github.com/gregoiredavid/france-geojson)
(Licence Ouverte / Etalab). Pour la régénérer :

```bash
curl -L -o departements.geojson https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements-version-simplifiee.geojson
npm run map -- departements.geojson
```
