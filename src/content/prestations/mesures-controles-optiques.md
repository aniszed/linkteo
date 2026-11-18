---
title: "Mesures OTDR et recette fibre optique en Île-de-France — Linkteo"
description: "Mesures de réflectométrie OTDR et de photométrie pour la recette et le diagnostic de liens fibre optique. Fichiers .sor et rapport exploitable. Île-de-France."
h1: "Mesures OTDR et contrôles optiques"
nom: "Mesures et recette"
serviceType: "Mesures de réflectométrie et de photométrie"
icone: mesure
ordre: 2
chapo: >-
  Une mesure n'a de valeur que si elle est exploitable par la personne qui la reçoit. Nous réalisons les
  mesures de photométrie et de réflectométrie selon votre cahier des charges, et nous livrons les
  fichiers bruts avec un rapport lisible.
essentiel:
  - Photométrie (puissance, affaiblissement)
  - Réflectométrie OTDR, unidirectionnelle ou bidirectionnelle
  - Recette de liens et diagnostic de défauts
  - Seuils et longueurs d'onde de votre cahier des charges
livrables:
  - Fichiers de mesure bruts (.sor)
  - Rapport PDF par lien ou par lot
  - Liste des liens hors seuil avec localisation des événements
  - Nommage des fichiers selon votre convention
faq:
  - q: Quels seuils appliquez-vous ?
    r: >-
      Ceux de votre cahier des charges ou de l'opérateur d'infrastructure : affaiblissement total, perte par
      épissure, réflectance des connecteurs. Nous ne fixons pas nos propres seuils, et nous signalons tout
      lien qui ne les respecte pas.
  - q: Pourquoi une mesure bidirectionnelle ?
    r: >-
      Une perte d'épissure mesurée dans un seul sens peut être faussée, jusqu'à paraître comme un gain,
      quand les deux fibres soudées sont légèrement différentes. La moyenne des deux sens donne la vraie
      valeur. C'est la règle pour une recette.
---

## Photométrie

Avec une source et un photomètre (puissance-mètre), on mesure :

- la **puissance reçue** à un point du réseau, typiquement au PBO pour vérifier un lien de distribution ;
- l'**affaiblissement de bout en bout** d'un lien, comparé au budget optique attendu.

C'est la mesure de base : rapide, elle dit si le lien fonctionne et avec quelle marge.

## Réflectométrie (OTDR)

Le réflectomètre envoie des impulsions dans la fibre et analyse la lumière renvoyée. La courbe obtenue
montre chaque **événement** le long du lien : épissures, connecteurs, coupleurs, courbures, coupure, avec
leur position et leur perte.

- **Bobine amorce** en entrée, et en sortie si nécessaire, pour caractériser le premier et le dernier
  connecteur.
- **Mesure bidirectionnelle** pour les recettes, avec moyenne des pertes d'épissure.
- **Longueurs d'onde** selon le cahier des charges (par exemple 1310 et 1550 nm), la seconde révélant
  mieux les courbures.

## Recette ou diagnostic

**En recette**, après construction ou reprise, on vérifie qu'un lot de liens respecte les seuils, et on
livre la preuve. **En diagnostic**, on cherche où se trouve un défaut et ce qu'il est : coupure franche,
courbure, épissure dégradée, connecteur sale.

## Ce que vous recevez

Les fichiers bruts **.sor**, lisibles par les logiciels d'analyse courants, nommés selon votre convention.
Un **rapport PDF** par lien ou par lot, et la **liste des liens hors seuil** avec la position et la
nature de chaque événement en cause.
