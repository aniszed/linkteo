# Identité Linkteo — logo A2 « Trois brins »

Trois fibres convergent vers une épissure (carré orange), puis une sortie unique.

## Fichiers

| Fichier | Usage |
|---|---|
| `linkteo-logo.svg` | Logo horizontal, bleu nuit, fond clair |
| `linkteo-logo-white.svg` | Logo horizontal, blanc, fond sombre |
| `linkteo-icon.svg` | Symbole seul (avatar, tampon, sticker) |
| `favicon.svg` / `favicon-32.png` | Favicon (tracé redessiné pour les petites tailles) |
| `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png` | Icônes mobiles et manifest |
| `og-image.png` (1200×630) | Partage LinkedIn, WhatsApp, etc. |
| `planche-logo.png` | Planche de contrôle (pas un livrable) |

Le texte est vectorisé : aucun fichier ne dépend d'une police installée.

## Couleurs

| Rôle | Hex |
|---|---|
| Bleu nuit (base) | `#0B1F33` |
| Orange sécurité (épissure, appels à l'action) | `#FF6A13` |
| Gris clair secondaire (sur fond sombre) | `#A9B7C6` |

L'orange ne sert qu'à l'épissure et aux boutons d'action. Sur fond orange, le texte est bleu nuit (contraste 5,8:1), jamais blanc.

## Règles

- Zone de protection : la hauteur du carré orange, tout autour du logo.
- Taille minimale du logo horizontal : 110 px de large à l'écran, 30 mm en impression.
  En dessous, utiliser le symbole seul.
- Ne pas déformer, ne pas changer les couleurs, ne pas ajouter d'ombre.

## Régénérer

`source/build-logo.mjs` produit tous les fichiers. Il dépend de `opentype.js`, `sharp`
et `@expo-google-fonts/space-grotesk` (TTF Space Grotesk, licence OFL) :

```
npm i opentype.js sharp @expo-google-fonts/space-grotesk
node build-logo.mjs <dossier-sortie> <planche.png>
```
