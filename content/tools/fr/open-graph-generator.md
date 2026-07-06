---
metaTitle: "Générateur Open Graph | Aperçu Facebook, Twitter, LinkedIn"
metaDescription: "Créez, prévisualisez et générez des balises Open Graph (OG) pour Facebook, LinkedIn, Slack, WhatsApp et Twitter. Simulez l'affichage en temps réel."
metaKeywords: "générateur open graph, balises og, aperçu open graph, aperçu facebook, simulateur linkedin, générateur carte twitter, taille image open graph"
title: "Générateur Open Graph"
shortDescription: "Concevez, prévisualisez et générez des balises de métadonnées Open Graph (OG) pour les réseaux sociaux. Prévisualisez vos cartes de partage en temps réel."
faqs:
  - question: "Quelle est la différence entre les balises HTML standard et Open Graph ?"
    answer: "Les balises HTML standard (comme 'title' et 'description') sont conçues pour les moteurs de recherche (Google, Bing). Les balises Open Graph (préfixées par 'og:') sont conçues pour les plateformes sociales (Facebook, LinkedIn, Discord) afin d'afficher des cartes visuelles riches."
  - question: "Quelle est la dimension idéale pour une image Open Graph ?"
    answer: "La dimension recommandée pour une image panoramique (widescreen) est de 1200 x 630 pixels. Cela correspond au ratio 1.91:1. Pour WhatsApp qui recadre l'image en carré, gardez vos textes dans une zone de sécurité carrée au centre (630x630 pixels)."
  - question: "Pourquoi l'image d'aperçu n'apparaît-elle pas sur WhatsApp ?"
    answer: "Cela est dû à deux problèmes courants : 1) L'URL de l'image est relative (ex. '/img/og.png') au lieu d'être absolue (ex. 'https://domaine.com/img/og.png'). 2) Le poids du fichier dépasse 300 Ko. WhatsApp ignore les fichiers trop lourds."
  - question: "Comment vider le cache Open Graph sur Facebook ou LinkedIn ?"
    answer: "Les réseaux sociaux mettent l'image en cache. Si vous mettez à jour votre image, vous devez utiliser le Facebook Sharing Debugger ou le LinkedIn Post Inspector et cliquer sur 'Scrape Again' pour forcer la mise à jour."
  - question: "Puis-je utiliser des images SVG pour la balise 'og:image' ?"
    answer: "Non. La plupart des robots d'exploration sociaux (Facebook, X, LinkedIn) ne prennent pas en charge les fichiers SVG. Utilisez PNG, JPEG ou WebP."
features:
  - "Constructeur interactif pour les propriétés OG standard et spécialisées (Article, Produit)."
  - "Uploadeur d'images (Glisser-Déposer) avec vérificateur de ratio et d'optimisation."
  - "Prévisualisation réaliste pour Facebook, LinkedIn, Discord, Slack, WhatsApp, X (Twitter)."
  - "Analyseur et vérificateur de balises manquantes."
  - "Préréglages (Blog, E-commerce, Portfolio)."
  - "Historique local de session (Import/Export)."
  - "Génération 100% côté client (respect de la vie privée)."
useCases:
  - "Optimisation des aperçus de liens sur Facebook et LinkedIn pour augmenter le taux de clics (CTR)."
  - "Création de balises pour les produits E-commerce (affichage du prix, devise et stock)."
  - "Formatage des articles de blog techniques avec les dates de publication et le profil de l'auteur."
  - "Vérification et correction des images recadrées sur WhatsApp ou Telegram."
howToSteps:
  - "Sélectionnez un préréglage depuis la barre de configuration (ex: Blog)."
  - "Saisissez le titre de votre page, la description et l'URL canonique."
  - "Uploadez une image d'aperçu (ou insérez une URL absolue)."
  - "Dans la liste déroulante 'Type d'objet OG', choisissez le type (Article, Produit)."
  - "Vérifiez le score SEO et résolvez les avertissements (comme les URLs relatives)."
  - "Basculez entre les onglets sociaux pour inspecter l'affichage."
  - "Cliquez sur 'Copier HTML' et collez le bloc dans l'en-tête (<head>) de votre application."
---

## Introduction au protocole Open Graph

Dans l'écosystème web moderne, le contenu n'est pas seulement découvert via Google. Une partie massive du trafic est générée par le partage sur les réseaux sociaux et les applications de chat (Facebook, LinkedIn, Slack, WhatsApp). Lorsqu'un utilisateur partage un lien, il ne voit pas une simple URL, mais une carte riche interactive.

Cette interaction est régie par le **protocole Open Graph (OGP)**. Créé par Facebook en 2010, il a été conçu pour permettre à des pages web de devenir des objets riches dans le graphique social.

---

## Pourquoi l'Open Graph est-il important ?

Bien que les balises Open Graph n'influencent pas directement votre classement sur Google, elles ont un impact massif sur vos taux de conversion :

1. **Optimisation du CTR (taux de clics)** : Une carte magnifiquement formatée avec une image haute résolution a beaucoup plus de chances d'être cliquée.
2. **Contrôle de la marque** : Vous évitez que Facebook choisisse un logo aléatoire en bas de votre page web.
3. **Preuve sociale** : Un aperçu riche donne immédiatement confiance à l'utilisateur.

---

## Comportements de l'aperçu par plateforme

### 1. Facebook
Le robot de Facebook recommande un ratio de **1.91:1**. L'image doit mesurer au moins **600 x 315 pixels**, bien que **1200 x 630 pixels** soit fortement recommandé.

### 2. LinkedIn (B2B)
LinkedIn préfère également **1200 x 627 pixels**. L'algorithme tronque les titres à **70 caractères** et les descriptions à environ **150 caractères**.

### 3. WhatsApp
WhatsApp crée des vignettes (thumbnails) de partage sur l'appareil. Le ratio est **1:1** (un carré parfait). Assurez-vous que l'image `og:image` fait **moins de 300 Ko**, sinon l'image ne s'affichera pas !

---

## Les balises Open Graph fondamentales

Voici les quatre propriétés requises dans votre `<head>` :

```html
<meta property=\"og:title\" content=\"Titre de la page\" />
<meta property=\"og:type\" content=\"website\" />
<meta property=\"og:image\" content=\"https://domaine.com/img.jpg\" />
<meta property=\"og:url\" content=\"https://domaine.com/article\" />
```

* `og:title` : Gardez-le sous 60 caractères.
* `og:description` : Idéalement 60 à 90 caractères pour un impact maximal.
* `og:image` : L'URL absolue de l'image qui représente la page.

---

## Les types d'objets Open Graph

Par défaut, c'est `website`. Mais vous pouvez choisir :

### 1. L'objet Article (`og:type=\"article\"`)
Pour les articles de blog.
* `article:published_time` : Date de publication (ISO 8601).
* `article:author` : Lien vers le profil de l'auteur.

### 2. L'objet Produit (`og:type=\"product\"`)
Pour le e-commerce, permettant aux réseaux sociaux d'afficher le prix et les devises.
* `product:price:amount` : Prix (ex. `49.99`).
* `product:price:currency` : Devise (ex. `EUR`).
* `product:availability` : Stock (ex. `instock`).

---

## Check-list pour les développeurs (Image OG)

* **Dimensions** : Visez **1200 x 630 pixels**.
* **Ratio** : Exactement **1.91:1**.
* **Zone de sécurité** : Mettez votre texte important au centre (carré de 630x630 px) pour survivre au recadrage WhatsApp.
* **URL absolue** : N'utilisez **jamais** de chemins relatifs (comme `/images/og.png`).

Utilisez notre outil complet de génération Open Graph pour tout tester visuellement avant de publier votre site !
