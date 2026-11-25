---
metaTitle: "Testeur de Redirection URL | Tracer 301, 302, 307 & Boucles"
metaDescription: "Tracez chaque saut d'une URL : codes 301, 302, 307, 308, meta-refresh, boucles, latence, en-têtes HTTP bruts et conflits d'URL canonique pour votre SEO."
metaKeywords: "testeur redirection url, vérificateur redirection 301, traceur chaîne redirection, détecteur boucle redirection, code http 301 302 307 308, audit migration seo, conflit canonical, meta refresh"
title: "Testeur de Redirection URL Gratuit"
shortDescription: "Tracez instantanément le parcours complet d'une URL jusqu'à 10 sauts : codes HTTP 301, 302, 307 et 308, redirections meta-refresh et JavaScript, boucles infinies, latence par saut, en-têtes bruts et écarts d'URL canonique."
faqs:
  - question: "Quelle est la différence technique et SEO entre les codes 301, 302, 307 et 308 ?"
    answer: "Les codes 301 et 308 signalent un déplacement définitif qui transfère les signaux de canonisation et d'autorité vers la nouvelle URL, tandis que 302 et 307 indiquent un renvoi temporaire. Sur le plan du protocole HTTP (RFC 9110), 301 et 302 autorisent historiquement les clients à convertir une requête POST en GET, alors que 308 et 307 imposent de conserver strictement la méthode et le corps d'origine."
  - question: "Pourquoi l'outil repère-t-il aussi les redirections meta-refresh et JavaScript après un statut 200 OK ?"
    answer: "Un simple contrôle d'en-têtes s'arrête dès qu'un serveur renvoie 200 OK, masquant les redirections déclenchées côté client. Notre traceur inspecte jusqu'à 100 Kio du corps HTML reçu afin de détecter les balises meta http-equiv='refresh' ainsi que les instructions JavaScript window.location et location.replace qui allongent discrètement le parcours utilisateur."
  - question: "Que signifie l'alerte de conflit canonique (Canonical Mismatch) sur la page de destination ?"
    answer: "À l'arrivée sur une réponse 200 OK, l'analyseur extrait l'URL canonique déclarée dans l'en-tête HTTP Link (rel='canonical') ou la balise HTML link rel='canonical'. Si cette cible diffère de l'URL finale réellement atteinte, les moteurs reçoivent des signaux contradictoires entre la chaîne de redirection et la canonisation déclarée, ce qui fragmente la consolidation SEO."
  - question: "Combien de sauts Googlebot suit-il dans une chaîne de redirection avant d'abandonner ?"
    answer: "Googlebot suit généralement jusqu'à 5 à 10 sauts lors d'une même session d'exploration, mais chaque étape intermédiaire ajoute une latence réseau, consomme du budget de crawl et retarde l'affichage du contenu principal (LCP). Notre outil trace jusqu'à 10 sauts et émet un avertissement dès qu'une chaîne dépasse 2 sauts successifs."
  - question: "Pourquoi le testeur refuse-t-il d'analyser localhost ou une adresse IP privée d'intranet ?"
    answer: "Pour contourner les restrictions CORS du navigateur et lire les en-têtes bruts avec redirect: manual, chaque requête est exécutée côté serveur. Avant chaque saut de la chaîne, une résolution DNS vérifie l'adresse cible et bloque toute destination loopback (127.0.0.0/8, ::1), réseau privé RFC 1918, plage CGNAT RFC 6598 ou adresse link-local afin d'empêcher tout abus SSRF."
features:
  - "Traçage manuel jusqu'à 10 sauts HTTP successifs avec mesure de la latence en millisecondes et code de statut détaillé à chaque étape"
  - "Détection unifiée des redirections serveur (301, 302, 303, 307, 308) et client (meta http-equiv='refresh' et window.location JavaScript sur réponse 200 OK)"
  - "Repérage immédiat des boucles circulaires infinies (ERR_TOO_MANY_REDIRECTS) et des déclassements de protocole non sécurisés (HTTPS vers HTTP)"
  - "Audit automatique de cohérence canonique comparant l'URL finale aux en-têtes HTTP Link rel='canonical' et aux balises HTML link rel='canonical'"
  - "Inspection intégrale des en-têtes HTTP bruts, des cookies Set-Cookie et personnalisation du User-Agent (navigateur bureau, mobile ou Googlebot)"
  - "Validation DNS et filtrage SSRF exécutés sur chaque saut afin de bloquer les adresses loopback, privées RFC 1918 et non routables"
useCases:
  - "Valider un plan de redirection 301 complet lors d'une refonte d'arborescence ou d'une migration de nom de domaine sans perte de trafic SEO"
  - "Aplatir les chaînes multi-sauts classiques (http:// vers https:// puis vers www et slash final) qui dégradent le TTFB et le LCP"
  - "Résoudre une boucle infinie ERR_TOO_MANY_REDIRECTS causée par un conflit TLS entre un CDN (mode SSL Flexible) et des règles Nginx ou Apache"
  - "Débusquer des redirections temporaires 302 ou 307 injectées par défaut par une extension CMS ou un répartiteur de charge sur des URL définitivement déplacées"
  - "Contrôler le routage conditionnel par appareil ou géolocalisation en comparant la trace d'un navigateur standard face à Googlebot"
  - "Vérifier la destination réelle d'un lien raccourci, d'une URL de suivi publicitaire ou d'un lien d'affiliation et contrôler ses cookies de suivi"
howToSteps:
  - "Saisissez l'URL à inspecter dans le champ d'analyse (avec ou sans préfixe http:// ou https://, par exemple http://exemple.fr/ancienne-page)."
  - "Sélectionnez éventuellement le profil User-Agent souhaité (Chrome bureau, smartphone ou Googlebot) afin de reproduire un routage spécifique."
  - "Lancez le traçage : le moteur suit manuellement chaque en-tête Location ainsi que les redirections meta-refresh et JavaScript jusqu'à la réponse finale."
  - "Analysez chaque saut de la chaîne : code de statut HTTP, durée en millisecondes, type permanent ou temporaire et éventuel passage d'HTTPS vers HTTP."
  - "Dépliez les en-têtes HTTP bruts, les cookies Set-Cookie et le contrôle d'URL canonique pour vérifier l'alignement SEO de la destination."
  - "Corrigez les règles .htaccess, Nginx ou CDN signalées dans les alertes, puis relancez un test pour confirmer une redirection directe en un seul saut."
---

Lors d'une migration de domaine, d'un passage en HTTPS ou d'une refonte d'arborescence, les **redirections d'URL** garantissent la continuité entre anciennes routes et pages canoniques. Standardisées par la section 15.4 de la **RFC 9110**, elles peuvent, lorsqu'elles sont mal enchaînées, allonger le *Time to First Byte* (TTFB), provoquer des boucles infinies ou bloquer le transfert d'autorité SEO. Notre **Testeur de Redirection URL** suit manuellement jusqu'à 10 sauts, mesure la latence par étape, inspecte le corps HTML pour repérer les renvois côté client et contrôle la cohérence canonique de la destination.

## Sémantique RFC 9110 des codes HTTP et mécanismes côté client

Chaque type de redirection impose des règles distinctes sur la méthode HTTP, le cache navigateur et la canonisation :

| Code / Mécanisme | Classe | Préservation `POST` | Cache par défaut | Signal SEO & canonisation |
| :--- | :--- | :--- | :--- | :--- |
| **`301 Moved Permanently`** | Permanente (serveur) | Non garanti (souvent `GET`) | Oui (persistant) | Signal fort : transfère canonique et autorité |
| **`308 Permanent Redirect`** | Permanente (serveur) | **Strictement préservée** | Oui (persistant) | Signal fort identique au `301` (API et formulaires) |
| **`302 Found`** | Temporaire (serveur) | Non garanti (souvent `GET`) | Non (sauf en-tête) | Signal faible : conserve l'URL source indexée |
| **`307 Temporary Redirect`** | Temporaire (serveur) | **Strictement préservée** | Non (sauf en-tête) | Signal faible identique au `302` (aussi émis par HSTS) |
| **`303 See Other`** | Temporaire (PRG) | **Force `GET`** | Non | Motif Post/Redirect/Get après formulaire |
| **`<meta http-equiv="refresh">`** | Côté client (`200 OK`) | Toujours `GET` | Selon `200 OK` | Signal faible (délai `0` proche du `301`, à éviter) |
| **`window.location` (JS)** | Côté client (`200 OK`) | Toujours `GET` | Selon `200 OK` | Dépend du rendu Chromium ; fragile pour les bots |

Deux nuances piègent fréquemment les développeurs. D'abord, les navigateurs mettent en cache les réponses `301` et `308` de manière persistante : une règle erronée déployée en production reste parfois figée localement sans directive `Cache-Control` adaptée. Ensuite, un code **`307 Internal Redirect`** observé dans Chrome DevTools n'est pas renvoyé par votre serveur, mais synthétisé localement par la politique **HSTS** (`Strict-Transport-Security`) pour basculer `http://` vers `https://`. Notez enfin que l'en-tête `Location` accepte aussi bien une URI absolue qu'un chemin relatif (résolu par rapport à l'URL du saut courant selon la RFC 9110 §10.2.2) et que les caractères spéciaux dans les paramètres de requête doivent être correctement encodés (vérifiable avec notre [encodeur d'URL](/fr/outils/url-encoder)) pour éviter toute troncature.

## Coût des chaînes de redirection sur la latence et le budget de crawl

Une chaîne apparaît lorsque plusieurs couches (DNS, CDN, proxy, CMS) empilent leurs règles au lieu de cibler directement l'URL canonique :

```text
http://exemple.fr/articles/guide          -> 301 (110 ms : bascule HTTPS)
https://exemple.fr/articles/guide         -> 301 (145 ms : ajout de www)
https://www.exemple.fr/articles/guide     -> 301 (130 ms : ajout du slash final)
https://www.exemple.fr/articles/guide/    -> 200 (190 ms : document final)
```

Sur réseau mobile, chaque changement d'hôte déclenche une nouvelle résolution DNS et une négociation TLS avant même le téléchargement du HTML. Près de **400 ms** sont ici gaspillées avant le chargement du CSS et de l'image LCP, tandis que Googlebot consomme quatre hits de crawl pour une seule page. Aplatissez toujours vos règles vers **un unique saut `301` ou `308`**.

## Règles propres en un saut (Nginx, Apache et vérification CLI)

Sous Nginx, réunissez protocole et nom d'hôte dans un bloc dédié pour éviter tout saut intermédiaire :

```nginx
server {
    listen 80;
    listen 443 ssl http2;
    server_name exemple.fr;
    return 301 https://www.exemple.fr$request_uri;
}

server {
    listen 80;
    server_name www.exemple.fr;
    return 301 https://www.exemple.fr$request_uri;
}
```

Sous Apache, générez la règle équivalente avec notre [générateur de fichier .htaccess](/fr/outils/htaccess-generator) en combinant `RewriteCond %{HTTPS} off` et `RewriteCond %{HTTP_HOST} !^www\.` vers un seul `RewriteRule` en `[R=301,L]`. En ligne de commande, contrôlez rapidement la trace avec `curl` ou auditez la sécurité complète via notre [analyseur d'en-têtes HTTP](/fr/outils/http-header-checker) :

```bash
curl -sIL --max-redirs 10 "http://exemple.fr/ancien-guide" | grep -iE "^(HTTP/|location:|link:)"
```

## Trois anomalies critiques détectées en audit

### 1. Boucles infinies (`ERR_TOO_MANY_REDIRECTS`)

La boucle la plus courante survient derrière un CDN configuré en mode SSL *Flexible* : le client atteint le CDN en HTTPS, mais le CDN interroge l'origine en HTTP ; l'origine répond alors par un `301` vers HTTPS en boucle. Activez le mode **Full (Strict)** avec un certificat valide côté origine, ou testez l'en-tête `X-Forwarded-Proto` avant de rediriger.

### 2. Conflit canonique et déclassement HTTPS

Si `A` redirige en `301` vers `B` (`200 OK`) mais que `B` déclare `<link rel="canonical" href="C">` ou un en-tête `Link: <C>; rel="canonical"`, corrigez la cible ou les balises créées avec notre [générateur de balises méta](/fr/outils/meta-tag-generator), et veillez à ce que votre [générateur de Sitemap XML](/fr/outils/sitemap-xml-generator) ne contienne que des URL finales en `200 OK`. Éliminez également tout passage d'`https://` vers `http://` qui brise le chiffrement de session.

### 3. Routage par `User-Agent`, cookies intermédiaires et garde-fous SSRF

Certains sites renvoient une `302` mobile ou géolocalisée selon l'agent utilisateur, ou posent des cookies de suivi (`Set-Cookie`) sur un saut intermédiaire avant la destination finale. Comparez toujours les traces obtenues entre Chrome bureau et `Googlebot` (inspectable via notre [analyseur de User-Agent](/fr/outils/user-agent-parser)), contrôlez l'absence de fuite de jeton de session sur les redirections inter-domaines et vérifiez les champs `A`/`CNAME` avec notre [outil de recherche DNS](/fr/outils/dns-lookup) si un saut échoue. Pour garantir la sûreté de l'audit côté serveur, chaque saut subit une résolution DNS préalable bloquant toute redirection malveillante vers loopback (`127.0.0.0/8`, `::1`), les plages privées RFC 1918, l'espace CGNAT RFC 6598 ou les adresses link-local (SSRF).
