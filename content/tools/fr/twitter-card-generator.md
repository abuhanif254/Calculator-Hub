---
metaTitle: "Générateur de Twitter Card (X) | Aperçu Social et HTML"
metaDescription: "Générez des balises Twitter (X) Card valides (Summary, Large Image, App, Player) avec aperçu en direct, gestion du repli Open Graph et export HTML."
metaKeywords: "générateur twitter card, balises meta twitter, x card summary large image, twitterbot robots.txt, aperçu lien x, twitter app card, twitter player card, fallback open graph"
title: "Générateur de Twitter (X) Card"
shortDescription: "Générez des balises meta Twitter (X) Card valides avec prévisualisation en temps réel. Créez des cartes Summary, Large Image, App ou Player avec export HTML propre."
faqs:
  - question: "Quelle est la différence entre summary et summary_large_image sur X ?"
    answer: "Le format summary affiche une vignette carrée 1:1 compacte (minimum 144 x 144 px) à côté du texte, adaptée aux profils ou documentations. Le format summary_large_image déploie une bannière pleine largeur (idéalement 1200 x 628 px) qui capte davantage l'attention dans le fil d'actualité."
  - question: "Dois-je dupliquer toutes mes balises Open Graph avec le préfixe twitter: ?"
    answer: "Non. Le robot Twitterbot utilise automatiquement og:title, og:description, og:image et og:image:alt en repli si les équivalents twitter: sont absents. En revanche, la balise twitter:card reste strictement obligatoire car Open Graph ne définit pas le format d'affichage propre à X."
  - question: "Pourquoi ma Twitter Card ne s'affiche-t-elle pas lors du partage d'un lien ?"
    answer: "Les causes les plus fréquentes sont l'absence de twitter:card, une URL d'image relative ou en HTTP non sécurisé, un fichier dépassant 5 Mo, un blocage de Twitterbot dans robots.txt, ou des balises injectées uniquement côté client en JavaScript sans rendu serveur (SSR)."
  - question: "Quels formats d'image et limites techniques Twitterbot accepte-t-il ?"
    answer: "X accepte les formats JPG, PNG, WebP et GIF (seule la première image d'un GIF animé est retenue) pour un poids maximal de 5 Mo et des dimensions inférieures à 4096 x 4096 pixels. Le format vectoriel SVG n'est pas pris en charge."
  - question: "Comment purger le cache d'une Twitter Card après avoir changé l'image ?"
    answer: "Les serveurs de X mettent les métadonnées en cache pendant environ sept jours. Pour actualiser l'aperçu immédiatement, renommez ou versionnez l'URL de l'image (par exemple card.jpg?v=3) et testez la page dans l'outil de prévisualisation officiel ou le compositeur de post."
features:
  - "Prise en charge complète des 4 formats officiels : Summary, Summary Large Image, App Card et Player Card."
  - "Prévisualisation en direct reflétant l'interface moderne de X (superposition du domaine, recadrage et troncature)."
  - "Détection intelligente du repli Open Graph (og:) pour éviter la duplication inutile des balises dans le head."
  - "Compteurs de caractères intégrés respectant les seuils critiques (70 caractères pour le titre, 200 pour la description)."
  - "Configuration guidée des identifiants mobiles (App Store iOS, Google Play) et des flux iframe sécurisés Player."
  - "Génération 100 % côté client avec export HTML prêt à coller, sans stockage ni envoi de données."
useCases:
  - "Maximiser le taux de clics (CTR) d'articles techniques, annonces produit et communiqués diffusés sur X."
  - "Déployer des App Cards avec liens profonds (deep links) iOS et Android pour accélérer l'installation d'une application."
  - "Diffuser un lecteur vidéo ou audio embarqué (Player Card HTTPS) directement dans le fil X sans quitter l'application."
  - "Vérifier que la zone inférieure gauche d'une bannière 1200 x 628 px n'est pas masquée par l'étiquette de domaine de X."
  - "Auditer et alléger un en-tête HTML en combinant proprement Open Graph et balises twitter: minimales."
  - "Assurer l'accessibilité des cartes de partage grâce à la balise twitter:image:alt lue par les lecteurs d'écran."
howToSteps:
  - "Choisissez le type de Twitter Card adapté à votre objectif : summary, summary_large_image, app ou player."
  - "Rédigez un titre percutant (sous 70 caractères) et une description concise (sous 200 caractères)."
  - "Saisissez l'URL HTTPS absolue de votre image et ajoutez un texte alternatif descriptif dans twitter:image:alt."
  - "Ajoutez les comptes d'attribution @site et @creator, ou renseignez les ID App Store / Google Play pour une App Card."
  - "Contrôlez le cadrage et les zones de superposition dans l'aperçu en direct pour prévenir toute coupure de texte."
  - "Exportez le bloc HTML en un clic et insérez-le dans le head rendu côté serveur de votre page."
---

Lorsqu'un lien est publié sur **X (anciennement Twitter)**, l'agent d'exploration `Twitterbot/1.0` interroge la page cible afin de convertir une simple URL en carte visuelle interactive : une **Twitter Card**. Ce format structure l'affichage du titre, du domaine, du visuel ou du lecteur multimédia directement dans le flux, augmentant sensiblement la visibilité et le taux de clic par rapport à un lien nu. Bien que le protocole de X cohabite étroitement avec Open Graph, il possède ses propres règles de syntaxe, de résolution en cascade et de sécurité réseau qu'il convient de maîtriser pour éviter les aperçus vides ou mal recadrés.

## Mécanisme de parsing de Twitterbot et cascade de repli Open Graph

La spécification des Twitter Cards emploie des balises `<meta name="twitter:...">`, contrairement au protocole Open Graph qui utilise l'attribut RDFa `property="og:..."`. Si `Twitterbot` tolère aujourd'hui `property` dans certains cas, conserver `name` demeure la norme officielle et la garantie d'une compatibilité durable.

Surtout, X applique une **cascade de repli déterministe** vers Open Graph afin d'éviter la redondance inutile dans le `<head>` :

1. **`twitter:card`** : **aucun équivalent Open Graph**. Cette balise est impérative pour choisir le gabarit (`summary_large_image`, `app`, `player`). En son absence, X ignore la carte ou bascule sur un rendu minimaliste.
2. **`twitter:title`** -> se replie sur `og:title`.
3. **`twitter:description`** -> se replie sur `og:description`.
4. **`twitter:image`** -> se replie sur `og:image`.
5. **`twitter:image:alt`** -> se replie sur `og:image:alt` (limite de 420 caractères, indispensable pour l'accessibilité).

Cette architecture permet deux stratégies en production : soit déclarer un jeu Open Graph complet accompagné uniquement de `twitter:card` et `twitter:site` (couplé à notre [Générateur Open Graph](/fr/outils/open-graph-generator)), soit surcharger `twitter:title` et `twitter:image` pour adapter l'accroche et le ratio spécifiquement à l'audience de X.

## Comparatif technique des 4 types de Twitter Cards

Le choix du gabarit conditionne les dimensions d'image attendues, les métadonnées obligatoires et le comportement interactif dans les applications mobiles iOS/Android comme sur le Web.

| Type (`twitter:card`) | Dimensions & Ratio | Limites techniques & Formats | Balises spécifiques requises | Cas d'usage optimal |
| :--- | :--- | :--- | :--- | :--- |
| **`summary`** | 1:1 — min 144×144 px (idéal 600×600) | Max 5 Mo ; JPG, PNG, WebP, GIF (1re image) | `twitter:card`, `twitter:title` | Pages documentation, profils, outils utilitaires |
| **`summary_large_image`** | 2:1 ou 1,91:1 — min 300×157 px (idéal **1200×628**) | Max 5 Mo ; max 4096×4096 px ; SVG exclu | `twitter:card`, `twitter:title`, `twitter:image` | Articles, études de cas, landing pages, e-commerce |
| **`app`** | Icône récupérée depuis les stores | Métadonnées tirées de l'App Store / Play Store | `twitter:app:id:iphone`, `ipad`, `googleplay` | Acquisition mobile et deep linking applicatif |
| **`player`** | 16:9 ou 1:1 (cohérent avec l'iframe) | HTTPS strict, TLS valide, sans cookies requis | `twitter:player`, `width`, `height`, `image` | Vidéos, podcasts, lecteurs interactifs embarqués |

Sur l'interface actuelle de X, la carte `summary_large_image` superpose le nom de domaine et parfois le titre directement en bas à gauche du visuel. Laissez systématiquement une marge visuelle libre de **60 à 80 pixels** dans le coin inférieur gauche de vos bannières (que vous pouvez recadrer facilement avec notre outil [Redimensionner une Image](/fr/outils/resize-image)). Pour l'attribution analytique pérenne, notez que les identifiants numériques immuables `twitter:site:id` et `twitter:creator:id` peuvent remplacer les pseudonymes `@handle` afin de rester valides même si le compte change de nom d'utilisateur.

## Exemples de balisage HTML et configuration `robots.txt`

Voici un balisage hybride propre et minimaliste pour une carte `summary_large_image` optimisée, incluant l'attribution et l'accessibilité :

```html
<!-- Repli Open Graph partagé + surcharge X -->
<meta property="og:title" content="Architecture Edge Caching : diviser le TTFB par 4" />
<meta property="og:description" content="Guide pratique sur stale-while-revalidate, les tags de purge et les en-têtes Vary." />
<meta property="og:image" content="https://exemple.fr/media/edge-caching-1200x628.jpg" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@VotreMarque" />
<meta name="twitter:creator" content="@NomAuteur" />
<meta name="twitter:image:alt" content="Diagramme de latence Edge Caching entre origine et CDN" />
```

Pour une **App Card** pointant vers les boutiques mobiles francophones (`twitter:app:country` sur `FR` ou `CA`) :

```html
<meta name="twitter:card" content="app" />
<meta name="twitter:site" content="@VotreApp" />
<meta name="twitter:app:country" content="FR" />
<meta name="twitter:app:name:iphone" content="MonApp Finance" />
<meta name="twitter:app:id:iphone" content="1234567890" />
<meta name="twitter:app:name:googleplay" content="MonApp Finance" />
<meta name="twitter:app:id:googleplay" content="fr.exemple.monapp" />
```

Une cause fréquente d'image absente provient d'un fichier `robots.txt` trop restrictif qui bloque le répertoire `/images/` ou `/_next/image`. Autorisez explicitement `Twitterbot` sur les ressources publiques (voir aussi notre [Générateur robots.txt](/fr/outils/robots-txt-generator)) :

```text
User-agent: Twitterbot
Allow: /images/
Allow: /media/
Disallow: /admin/
```

## Dépannage : résoudre les cartes invisibles ou obsolètes

Si votre lien s'affiche sans visuel dans le compositeur de post X, vérifiez successivement ces cinq points :

1. **Rendu côté serveur (SSR)** : `Twitterbot` n'exécute pas JavaScript. Inspectez le code source brut via `curl -A "Twitterbot/1.0" -s https://exemple.fr/page` afin de confirmer que les balises `<meta name="twitter:...">` figurent bien dans la réponse HTTP initiale.
2. **En-têtes et protocoles d'image** : l'URL de `twitter:image` doit être absolue, servie en **HTTPS**, renvoyer un statut `200 OK` rapide (< 3 secondes) et un type MIME raster valide (`image/jpeg`, `image/png` ou `image/webp`).
3. **Poids et compression** : un PNG non optimisé dépassant **5 Mo** est rejeté silencieusement ; ramenez vos visuels sous 500 Ko avec notre outil [Compresser une Image](/fr/outils/compress-image).
4. **Restrictions Player Card** : l'URL déclarée dans `twitter:player` ne doit envoyer ni `X-Frame-Options: DENY` ni directive CSP `frame-ancestors 'none'`, sous peine de blocage de l'iframe embarquée.
5. **Invalidation du cache** : X conserve les cartes jusqu'à **7 jours**. Ajoutez un paramètre de requête neuf à l'URL de l'image (`?v=202611`) et complétez l'audit global de vos métadonnées avec notre [Générateur de Balises Meta](/fr/outils/meta-tag-generator).
