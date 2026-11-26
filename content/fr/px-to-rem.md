---
title: "Convertisseur PX en REM : Formule CSS, accessibilité et guide"
description: "Convertissez instantanément vos pixels (px) en unités CSS rem selon la taille racine (16 px par défaut). Formule W3C, exemples pratiques et tableau complet."
faqs:
  - question: "Comment convertir des px en rem en CSS ?"
    answer: "Divisez la taille souhaitée en pixels par la taille de police définie sur l'élément racine html. Avec la valeur par défaut de 16 px dans les navigateurs, la formule est rem = px ÷ 16 (par exemple, 24 px ÷ 16 = 1,5 rem)."
  - question: "Quelle est la différence entre les unités CSS rem et em ?"
    answer: "L'unité rem (root em) se réfère toujours à la taille de police de l'élément racine html, ce qui garantit une valeur stable partout dans la page. L'unité em dépend de la taille de police du parent direct, pouvant entraîner un effet d'accumulation en cascade."
  - question: "Pourquoi recommande-t-on le rem plutôt que le px pour l'accessibilité ?"
    answer: "Lorsque l'utilisateur modifie la taille de police par défaut dans les réglages de son navigateur pour mieux lire, les valeurs en rem s'adaptent proportionnellement. Les tailles fixes en px risquent au contraire d'ignorer cette préférence utilisateur."
  - question: "Quelle est l'utilité de définir html { font-size: 62.5%; } ?"
    answer: "Comme 62,5 % de 16 px vaut exactement 10 px, cette règle fixe 1 rem à 10 px et simplifie les calculs mentaux (18 px deviennent 1,8 rem). Il faut toutefois veiller à redéfinir body { font-size: 1.6rem; } pour préserver une lecture confortable à 16 px."
  - question: "Faut-il également convertir les bordures et les points de rupture (media queries) en rem ?"
    answer: "Les bordures fines de 1 px ou 2 px restent généralement exprimées en px pour conserver un trait net sur l'écran. En revanche, utiliser le rem pour les media queries permet à la mise en page de s'adapter automatiquement au zoom textuel de l'utilisateur."
---

Pour convertir une mesure CSS exprimée en pixels (`px`) vers l'unité relative `rem` (*root em*), appliquez la formule fondamentale : `rem = px ÷ taille de police racine`. Dans la quasi-totalité des navigateurs web modernes, la taille de police racine par défaut est de **16 px**, ce qui donne l'équivalence directe `1 rem = 16 px` et `rem = px ÷ 16`.

À l'inverse des pixels, qui fixent une dimension rigide, le `rem` adapte dynamiquement la typographie, les marges et les espacements aux préférences d'affichage de chaque utilisateur. Maîtriser cette conversion constitue un pilier de l'intégration web responsive et de l'accessibilité numérique.

## Formule mathématique et spécification CSS du W3C

La spécification *CSS Values and Units* publiée par le **W3C** (World Wide Web Consortium) définit deux grandes familles de longueurs : les unités absolues (dont le pixel CSS `px`, ancré sur un angle visuel de référence à `1/96` de pouce) et les unités relatives à la fonte (*font-relative lengths*), parmi lesquelles figure le `rem`.

La formule exacte de conversion s'écrit :

`valeur en rem = valeur en px ÷ font-size(html)`

Et dans le sens inverse :

`valeur en px = valeur en rem × font-size(html)`

Contrairement à l'unité `em`, dont la référence change selon la hiérarchie du DOM, le `rem` interroge exclusivement l'élément racine `:root` (ou `html`). Tant que la feuille de style ne surcharge pas la propriété `font-size` de `html`, le dénominateur demeure égal à `16 px`, soit la base standard historique issue des premiers navigateurs graphiques et conservée par Chrome, Firefox, Safari et Edge.

## Exemples de calcul détaillés étape par étape

### Exemple 1 : Convertir un titre principal de maquette Figma (base standard 16 px)

Une maquette graphique indique un titre `<h1>` de 36 px avec une marge inférieure de 24 px. Votre projet utilise la taille racine par défaut du navigateur (16 px).

1. Divisez la taille du titre par la base racine : `36 ÷ 16 = 2,25`. Le titre s'écrira donc `font-size: 2.25rem;`.
2. Divisez ensuite la marge inférieure par 16 : `24 ÷ 16 = 1,5`. Vous appliquerez `margin-bottom: 1.5rem;`.
3. Si un utilisateur règle son navigateur sur une police par défaut de 20 px, le titre passera automatiquement à `2,25 × 20 = 45 px` et la marge à `30 px`, préservant les proportions d'origine.

### Exemple 2 : Travailler avec une taille de base personnalisée à 18 px

Un site éditorial destiné à la lecture longue configure `:root { font-size: 18px; }` sur grand écran afin d'améliorer le confort visuel. Vous devez traduire un bloc d'alerte prévu à 27 px de marge intérieure et un texte secondaire de 14 px.

1. Appliquez la formule avec le nouveau dénominateur (18) : `27 ÷ 18 = 1,5 rem`.
2. Calculez le texte secondaire : `14 ÷ 18 = 0,7778 rem` (arrondi à quatre décimales pour éviter tout décalage d'affichage).
3. Vérifiez que l'utilisation de pixels bruts sur `:root` est bien souhaitée : pour respecter les préférences navigateur, il est préférable d'écrire `:root { font-size: 112.5%; }` (`18 ÷ 16 = 1,125`), ce qui produit 18 px par défaut tout en restant relatif.

### Exemple 3 : Utiliser l'astuce du 62,5 % (base 10 px) pour un corps de texte

De nombreux développeurs déclarent `html { font-size: 62.5%; }` (`62,5 % × 16 px = 10 px`) pour supprimer les divisions par 16. Vous souhaitez obtenir un corps de texte à 16 px et un sous-titre à 22 px.

1. Divisez chaque valeur par 10 : `16 ÷ 10 = 1,6 rem` et `22 ÷ 10 = 2,2 rem`.
2. Appliquez impérativement `body { font-size: 1.6rem; }` dès le début de votre CSS. Sans cette règle, tous les textes sans taille explicite s'afficheraient à 10 px, rendant la page presque illisible.

## Tableau de correspondance rapide PX vers REM (base 16 px)

Ce tableau répertorie les valeurs typographiques et d'espacement les plus fréquentes sur la base standard `1 rem = 16 px`.

| Pixels | REM (16 px) | REM (10 px) | Usage courant |
| :--- | :--- | :--- | :--- |
| 4 px | 0,25 rem | 0,4 rem | Espacement icône |
| 8 px | 0,5 rem | 0,8 rem | Marge grille 8 pt |
| 12 px | 0,75 rem | 1,2 rem | Badge ou légende |
| 14 px | 0,875 rem | 1,4 rem | Texte secondaire |
| 16 px | 1 rem | 1,6 rem | Corps de texte |
| 18 px | 1,125 rem | 1,8 rem | Texte éditorial |
| 24 px | 1,5 rem | 2,4 rem | Titre `<h2>` |
| 32 px | 2 rem | 3,2 rem | Titre mobile |
| 48 px | 3 rem | 4,8 rem | Grand titre d'en-tête |

## Applications en intégration web et pièges courants

L'adoption du `rem` répond aux critères d'accessibilité **WCAG** (notamment le critère 1.4.4 exigeant un redimensionnement du texte jusqu'à 200 % sans perte de lisibilité ni chevauchement). Quatre précautions évitent les régressions visuelles :

- **L'effet boule de neige des unités `em`** : Si un parent possède `font-size: 1.2em;` et qu'un enfant déclare `1.2em`, le texte atteint `1,44` fois la taille initiale (`1,2 × 1,2`). Le `rem` supprime cette dérive sur les composants modulaires comme les modales ou menus.
- **L'incompatibilité du 62,5 % avec les bibliothèques tierces** : Intégrer un framework conçu pour 16 px (Tailwind CSS, Bootstrap) avec `font-size: 62.5%` sur `html` réduit tous les composants importés de 37,5 %. Conservez la base native à `100%` (16 px).
- **Définir `:root` en `px` bloque l'accessibilité** : Écrire `html { font-size: 16px; }` annule le choix d'un utilisateur malvoyant ayant réglé son navigateur sur une police agrandie. Privilégiez un pourcentage (`100%` ou `112.5%`).
- **Quand conserver le pixel (`px`)** : Le pixel reste adapté aux bordures fines (`border: 1px solid`) et aux ombres portées discrètes pour éviter le flou de sous-pixel.
