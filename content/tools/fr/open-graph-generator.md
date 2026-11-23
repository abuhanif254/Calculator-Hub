---
metaTitle: "Générateur Open Graph (OG) | Aperçu Facebook & LinkedIn"
metaDescription: "Créez, prévisualisez et validez vos balises Open Graph (og:title, og:image) pour Facebook, LinkedIn, Slack, Discord et WhatsApp avec export HTML prêt."
metaKeywords: "générateur open graph, balises og, aperçu facebook, aperçu linkedin, og:image dimensions, protocole open graph rdfa, meta property og, prévisualisation partage social, cache og"
title: "Générateur Open Graph"
shortDescription: "Concevez, prévisualisez et générez des balises de métadonnées Open Graph (OG) valides pour Facebook, LinkedIn, WhatsApp, Slack et Discord avec export HTML instantané."
faqs:
  - question: "Pourquoi les balises Open Graph utilisent-elles property au lieu de name ?"
    answer: "Le protocole Open Graph s'appuie sur la norme RDFa (Resource Description Framework in Attributes), qui associe des métadonnées sémantiques à une page via l'attribut property (par exemple property='og:title'). Les balises HTML classiques comme description utilisent l'attribut name."
  - question: "Quelles sont les dimensions et le poids recommandés pour og:image ?"
    answer: "Le format standard universel est 1200 x 630 pixels (ratio 1,91:1) en JPEG, PNG ou WebP. Maintenez le poids sous 300 Ko si vos liens sont partagés sur WhatsApp, et centrez vos titres dans une zone de sécurité carrée de 630 x 630 pixels pour résister au recadrage 1:1."
  - question: "Pourquoi mes balises Open Graph ne fonctionnent-elles pas sur une application React ou Vue ?"
    answer: "La majorité des crawlers sociaux (facebookexternalhit, LinkedInBot, WhatsApp, Slackbot) n'exécutent pas le JavaScript côté client. Si vos balises og: sont injectées dynamiquement dans le navigateur, le robot lit un HTML vide ; elles doivent être générées côté serveur (SSR, SSG ou Edge)."
  - question: "Comment forcer Facebook ou LinkedIn à actualiser une image Open Graph modifiée ?"
    answer: "Les plateformes mettent en cache les aperçus pendant plusieurs jours. Soumettez votre URL dans le Facebook Sharing Debugger (cliquez sur Scrape Again) ou dans le LinkedIn Post Inspector, ou ajoutez un paramètre de version à l'URL de l'image comme og-cover.jpg?v=2."
  - question: "Faut-il déclarer og:image:width et og:image:height dans le code HTML ?"
    answer: "Oui, c'est fortement recommandé. Lorsque ces dimensions explicites sont présentes dans le head, le crawler de Facebook peut générer et afficher la vignette dès le tout premier partage d'une nouvelle URL, sans attendre un second passage asynchrone."
features:
  - "Éditeur complet des balises Open Graph fondamentales et des schémas spécialisés (Article, Produit, Profil)."
  - "Simulateur d'aperçu en temps réel fidèle aux rendus de Facebook, LinkedIn, WhatsApp, Slack, Discord et X."
  - "Contrôle automatique des ratios d'image, de la zone de sécurité carrée WhatsApp et du poids maximal recommandé."
  - "Validation syntaxique des URL absolues HTTPS, longueurs de titres et propriétés structurées (width, height, alt)."
  - "Préréglages métier (article technique, fiche produit e-commerce, landing page SaaS) avec gestion og:locale."
  - "Export HTML propre en un clic, généré 100 % côté client sans aucune transmission de vos données."
useCases:
  - "Optimiser le taux de clics (CTR) des partages d'articles et d'études sur LinkedIn et Facebook."
  - "Déployer des métadonnées e-commerce enrichies (prix, devise EUR/CAD, disponibilité) pour les fiches produits."
  - "Éviter les aperçus cassés ou recadrés lorsque vos utilisateurs partagent un lien sur WhatsApp ou Slack."
  - "Structurer des sites multilingues francophones (fr_FR, fr_CA, fr_CH) à l'aide de og:locale et og:locale:alternate."
  - "Valider les balises générées par Next.js, Nuxt, Astro ou WordPress avant la mise en production d'une campagne."
  - "Garantir l'accessibilité des cartes de partage grâce à l'attribut og:image:alt et aux balises de type MIME explicites."
howToSteps:
  - "Sélectionnez le type d'objet Open Graph adapté à votre page (website, article ou product) ou un préréglage."
  - "Renseignez l'URL canonique absolue en HTTPS, le titre (50 à 65 caractères) et une description concise."
  - "Indiquez l'URL absolue de votre visuel 1200 x 630 px ou importez une image locale pour vérifier son cadrage."
  - "Complétez les propriétés avancées : og:site_name, og:locale (ex. fr_FR), dimensions et texte alternatif og:image:alt."
  - "Inspectez les onglets de prévisualisation multi-plateformes pour détecter toute troncature ou coupure de texte."
  - "Copiez le bloc HTML généré et insérez-le le plus haut possible dans la balise head de votre document rendu serveur."
---

Une part majeure de la découverte de contenus web s'effectue désormais hors des moteurs de recherche classiques, via les flux sociaux et les messageries professionnelles ou instantanées (LinkedIn, Facebook, Slack, Discord, WhatsApp, Teams). Lorsqu'un lien est collé dans une conversation, la plateforme interroge l'URL cible pour construire une carte enrichie. Ce mécanisme repose sur le **protocole Open Graph (OGP)**, spécifié sur la base de **RDFa** (*Resource Description Framework in Attributes*), qui transforme n'importe quelle page HTML en objet typé et lisible par les robots d'extraction sociaux.

## Architecture du protocole Open Graph et résolution par les crawlers

Parce qu'il étend RDFa, Open Graph recourt à l'attribut `property` (et non `name`) sur les balises `<meta>`, idéalement couplé à la déclaration de préfixe `prefix="og: https://ogp.me/ns#"` sur l'élément `<html>`. Quatre propriétés forment le socle minimal obligatoire : `og:title`, `og:type`, `og:image` et `og:url`. Elles se complètent de `og:description`, `og:site_name` et `og:locale` (`fr_FR`, `fr_CA`, `fr_BE`).

Comprendre le comportement réseau des robots sociaux explique la majorité des pannes d'aperçu en production :

- **Absence d'exécution JavaScript** : les agents tels que `facebookexternalhit/1.1`, `LinkedInBot/1.0`, `Slackbot-LinkExpanding`, `Discordbot` et `WhatsApp/2` effectuent une requête HTTP `GET` brute et analysent uniquement le HTML initial. Sur une application monopage (SPA) rendue côté client, ces robots n'observent jamais les balises injectées après hydratation. Un rendu serveur (**SSR**), statique (**SSG**) ou en périphérie (**Edge**) est impératif.
- **Troncature du flux HTML** : pour économiser bande passante et CPU, plusieurs parseurs cessent de lire le document après les premiers **256 Ko à 1 Mo**. Placez toujours vos balises `og:` dans le premier tiers du `<head>`, avant les feuilles de style inline volumineuses ou les blocs JSON-LD massifs.
- **Propriétés structurées d'image** : déclarer explicitement `og:image:width`, `og:image:height`, `og:image:type` et `og:image:alt` permet à Facebook d'afficher la vignette dès le premier partage d'une page neuve sans déclencher de passe asynchrone vide.

## Spécifications d'affichage par plateforme sociale

Chaque réseau applique ses propres règles de recadrage, de poids maximal et de mise en cache. Un visuel unique de **1200 × 630 pixels** (ratio `1,91:1`) optimisé sous **300 Ko** — facilement obtenu via notre outil [Compresser une Image](/fr/outils/compress-image) — constitue le meilleur dénominateur commun, à condition de concentrer les éléments critiques dans un carré central de 630 × 630 pixels.

| Plateforme | Dimensions idéales `og:image` | Ratio | Poids max / Formats | Troncature Titre / Description | Crawler & Outil de purge du cache |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Facebook** | 1200 × 630 px (min 600 × 315) | 1,91:1 | 8 Mo (JPG, PNG, WebP) | ~65 car. / ~155 car. | `facebookexternalhit` — Sharing Debugger |
| **LinkedIn** | 1200 × 627 px | 1,91:1 | 5 Mo (JPG, PNG) | ~70 car. / ~140 car. | `LinkedInBot` — Post Inspector |
| **WhatsApp** | 1200 × 630 px (zone 630×630) | 1:1 (vignette) | **300 Ko strict** (JPG, PNG) | ~65 car. / ~120 car. | `WhatsApp/2` — Cache appareil + serveur |
| **Slack** | 1200 × 630 px | 1,91:1 | 5 Mo (JPG, PNG, GIF) | ~80 car. / ~200 car. | `Slackbot-LinkExpanding` — TTL ~30 min |
| **Discord** | 1200 × 630 px | 1,91:1 | 8 Mo (JPG, PNG, WebP) | ~80 car. / ~250 car. | `Discordbot` — Purge via query string `?v=` |
| **X (Twitter)** | 1200 × 628 px (repli OG) | 1,91:1 / 2:1 | 5 Mo (JPG, PNG, WebP) | ~70 car. / ~200 car. | `Twitterbot` — Nécessite `twitter:card` |

Notez que X (Twitter) réutilise automatiquement `og:title`, `og:description` et `og:image` en solution de repli, mais exige toujours sa propre balise `twitter:card` pour activer la bannière grand format ; associez cet outil à notre [Générateur de Twitter Card](/fr/outils/twitter-card-generator) et à notre [Générateur de Balises Meta](/fr/outils/meta-tag-generator) pour couvrir l'ensemble du `<head>`.

## Exemple complet prêt pour la production

Voici un bloc `<head>` conforme combinant Open Graph structuré, métadonnées d'article ISO 8601 et internationalisation francophone :

```html
<!DOCTYPE html>
<html lang="fr" prefix="og: https://ogp.me/ns# article: https://ogp.me/ns/article#">
<head>
  <meta charset="utf-8" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="Atelier Dev Francophone" />
  <meta property="og:locale" content="fr_FR" />
  <meta property="og:locale:alternate" content="fr_CA" />
  <meta property="og:url" content="https://exemple.fr/guides/architecture-http3" />
  <meta property="og:title" content="Déployer HTTP/3 et QUIC en production sans régresser" />
  <meta property="og:description" content="Benchmark TLS 1.3, configuration Nginx et diagnostic UDP pour réduire la latence mobile." />
  <meta property="og:image" content="https://exemple.fr/og/http3-guide-1200x630.jpg" />
  <meta property="og:image:secure_url" content="https://exemple.fr/og/http3-guide-1200x630.jpg" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Schéma comparatif de latence entre HTTP/2 et HTTP/3 QUIC" />
  <meta property="article:published_time" content="2026-10-14T08:30:00+02:00" />
  <meta property="article:section" content="Infrastructure Web" />
</head>
```

## Diagnostic des erreurs Open Graph les plus fréquentes

1. **URL d'image relative ou redirection en boucle** : une valeur comme `/assets/og.png` est systématiquement ignorée par Facebook et LinkedIn. Utilisez toujours une URL absolue en `https://` renvoyant un code `200 OK` direct sans chaîne de redirections.
2. **Blocage par pare-feu WAF ou `robots.txt`** : certaines règles anti-bots Cloudflare ou ModSecurity renvoient un défi JavaScript (`403` ou `503`) aux agents `facebookexternalhit` ou `LinkedInBot`. Vérifiez vos journaux d'accès ainsi que les directives configurées via notre [Générateur robots.txt](/fr/outils/robots-txt-generator).
3. **Format SVG ou certificat TLS incomplet** : le format vectoriel `image/svg+xml` n'est pas rendu par les crawlers sociaux. De même, une chaîne de certificats intermédiaires SSL incomplète provoque l'échec silencieux du téléchargement de l'image sur LinkedIn et WhatsApp alors même que le navigateur desktop l'affiche normalement.
4. **Absence d'image sur WhatsApp malgré un code valide** : vérifiez le poids exact du fichier transféré (`Content-Length`) ; au-delà de **300 Ko**, le client WhatsApp abandonne silencieusement le rendu de la miniature.
