---
metaTitle: "Analyseur d'En-têtes HTTP | Audit Sécurité, CORS & SEO"
metaDescription: "Inspectez les en-têtes HTTP de n'importe quelle URL : audit CSP et HSTS, règles CORS, cookies sécurisés, cache CDN et chaînes de redirection 301."
metaKeywords: "analyseur entête http, http headers checker, sécurité http, cors tester, hsts checker, vérificateur redirection 301, csp header, x-frame-options, cache-control"
title: "Analyseur d'En-têtes HTTP"
shortDescription: "Inspectez les en-têtes de réponse HTTP d'une URL, tracez chaque saut de redirection, auditez les politiques de sécurité (CSP, HSTS, CORS) et validez la mise en cache."
faqs:
  - question: "Pourquoi une page web ne peut-elle pas inspecter directement les en-têtes d'un autre domaine en JavaScript ?"
    answer: "La politique de même origine (Same-Origin Policy) et le mécanisme CORS interdisent à un script exécuté dans le navigateur de lire les en-têtes de réponse d'un serveur tiers, sauf ceux explicitement exposés par Access-Control-Expose-Headers. Notre outil effectue la requête depuis un service intermédiaire afin de récupérer la réponse HTTP intégrale."
  - question: "Quand faut-il privilégier la méthode HEAD plutôt que GET lors d'un audit d'en-têtes ?"
    answer: "La méthode HEAD demande au serveur de renvoyer exactement la même ligne de statut et les mêmes métadonnées qu'une requête GET, sans transférer le corps de la réponse. Elle économise la bande passante pour vérifier des fichiers lourds, mais certains pare-feu applicatifs ou API répondent différemment en HEAD ; un contrôle final en GET reste donc recommandé."
  - question: "Comment interpréter un conflit entre Access-Control-Allow-Origin: * et les cookies ?"
    answer: "La spécification Fetch interdit l'utilisation du joker * lorsque la requête inclut des identifiants (credentials: include, cookies ou en-tête Authorization). Le serveur doit renvoyer l'origine exacte du client dans Access-Control-Allow-Origin, ajouter Access-Control-Allow-Credentials: true et déclarer Vary: Origin pour éviter un empoisonnement de cache."
  - question: "L'en-tête X-Robots-Tag remplace-t-il la balise meta robots HTML ?"
    answer: "Il offre exactement les mêmes directives (noindex, nofollow, noarchive, max-snippet) directement au niveau du protocole HTTP. Il est indispensable pour contrôler l'indexation de ressources non HTML comme les fichiers PDF, images, flux JSON ou endpoints d'API où aucune balise HTML ne peut être insérée."
  - question: "Pourquoi faut-il masquer les en-têtes Server et X-Powered-By ?"
    answer: "Exposer des valeurs détaillées telles que Apache/2.4.49 ou PHP/7.4.3 facilite la reconnaissance automatisée des versions vulnérables. Sans remplacer les mises à jour de sécurité, la suppression ou la réduction de ces bannières limite la surface d'exposition lors des scans opportunistes."
features:
  - "Inspection complète de la ligne de statut et de tous les en-têtes de réponse HTTP et HTTPS"
  - "Suivi détaillé des chaînes de redirection (301, 302, 307, 308) avec détection des boucles"
  - "Audit automatisé de sécurité : CSP, HSTS, X-Frame-Options, X-Content-Type-Options et Permissions-Policy"
  - "Contrôle des drapeaux Set-Cookie (Secure, HttpOnly, SameSite, Path et Max-Age)"
  - "Vérification de la négociation de cache (Cache-Control, ETag, Age, Vary) et compression (Gzip, Brotli)"
  - "Personnalisation de la méthode HTTP (GET ou HEAD) et du User-Agent (Googlebot, mobile, desktop)"
useCases:
  - "Auditer la conformité sécuritaire d'une application web avant une mise en production ou un pentest"
  - "Déboguer une erreur CORS bloquée dans la console navigateur lors de l'appel d'une API REST"
  - "Vérifier que les anciennes URL renvoient bien un code 301 propre en un seul saut vers la cible canonique"
  - "Contrôler l'efficacité du cache CDN (HIT vs MISS, directives s-maxage et stale-while-revalidate)"
  - "Valider la présence de X-Robots-Tag: noindex sur un environnement de préproduction ou des PDF internes"
  - "Comparer la configuration des en-têtes entre un serveur d'origine et un reverse proxy Nginx ou Cloudflare"
howToSteps:
  - "Entrez l'URL complète à inspecter, incluant le protocole http:// ou https://."
  - "Sélectionnez la méthode HTTP adaptée : GET pour une réponse complète ou HEAD pour les métadonnées seules."
  - "Choisissez éventuellement un profil User-Agent spécifique (navigateur classique, smartphone ou Googlebot)."
  - "Lancez l'analyse pour récupérer la chronologie des redirections et le tableau brut des en-têtes."
  - "Examinez les diagnostics de sécurité, de cache, de compression et les drapeaux des cookies émis."
  - "Corrigez les directives manquantes sur votre serveur ou reverse proxy puis relancez le test pour confirmation."
---

Avant d'afficher le moindre pixel d'une page HTML ou de traiter un objet JSON, un navigateur échange avec le serveur distant une enveloppe de métadonnées structurée définie par la norme **RFC 9110** : les **en-têtes HTTP** (*HTTP Headers*). Invisibles dans le rendu final, ces paires clé-valeur gouvernent le chiffrement de transport, les défenses contre le détournement de session, la politique de mise en cache CDN, la négociation de compression et les signaux transmis aux moteurs de recherche.

## Anatomie du protocole et différences HTTP/1.1, HTTP/2 et HTTP/3

Une réponse HTTP débute par une ligne de statut (`HTTP/1.1 200 OK` ou le pseudo-en-tête `:status: 200` en HTTP/2 et HTTP/3), suivie des champs d'en-tête. Alors que HTTP/1.1 transmet les en-têtes en texte ASCII insensible à la casse, **HTTP/2** (RFC 9113, compression binaire **HPACK**) et **HTTP/3** (QUIC, compression **QPACK**) imposent la normalisation stricte des noms d'en-têtes en minuscules (`content-type`, `cache-control`).

La norme distingue également les en-têtes **de bout en bout** (*end-to-end*), conservés tout au long de la chaîne entre le serveur d'origine et le client, des en-têtes **saut par saut** (*hop-by-hop*) comme `Connection`, `Keep-Alive` ou `Transfer-Encoding`, qui ne concernent qu'une liaison réseau précise entre deux intermédiaires (par exemple entre Nginx et un CDN).

## Référentiel des en-têtes critiques de sécurité, cache et SEO

Le tableau suivant recense les principaux en-têtes de réponse à auditer systématiquement lors du déploiement d'un site web ou d'une API :

| En-tête HTTP | Domaine | Exemple de valeur recommandée | Effet concret côté navigateur ou robot |
| :--- | :--- | :--- | :--- |
| **`Strict-Transport-Security`** | Sécurité (TLS) | `max-age=31536000; includeSubDomains; preload` | Impose HTTPS pendant 1 an et neutralise le SSL stripping |
| **`Content-Security-Policy`** | Sécurité (XSS) | `default-src 'self'; frame-ancestors 'none'` | Restreint l'origine des scripts, styles, polices et iframes |
| **`X-Content-Type-Options`** | Sécurité (MIME) | `nosniff` | Interdit au navigateur de deviner un type MIME exécutable |
| **`Referrer-Policy`** | Vie privée | `strict-origin-when-cross-origin` | Masque le chemin complet et les paramètres vers les domaines tiers |
| **`Cache-Control`** | Performance | `public, max-age=31536000, immutable` | Autorise le cache navigateur et CDN sans revalidation inutile |
| **`Vary`** | Cache & Proxy | `Accept-Encoding, Origin` | Cloisonne les variantes stockées en cache par compression ou origine |
| **`X-Robots-Tag`** | SEO technique | `noindex, nofollow` | Pilote l'indexation des PDF, médias et pages hors balise HTML |
| **`Set-Cookie`** | Session | `id=...; Secure; HttpOnly; SameSite=Lax` | Protège le jeton contre JavaScript (XSS) et les requêtes CSRF |

Pour générer rapidement ces règles côté Apache, vous pouvez utiliser notre [générateur de fichier .htaccess](/fr/outils/htaccess-generator) ou isoler un problème de sauts multiples avec le [vérificateur de redirections](/fr/outils/redirect-checker).

## Stratégies de mise en cache, CDN et redirections SEO

La maîtrise fine de `Cache-Control` repose sur la distinction entre le cache privé du navigateur (`max-age`) et les caches partagés tels que Cloudflare, Fastly ou Varnish (`s-maxage`). Contrairement à une idée reçue, la directive `no-cache` **autorise** le stockage local de la ressource mais impose une revalidation conditionnelle auprès du serveur (`If-None-Match` comparé à l'`ETag`) avant réutilisation. Pour interdire toute persistance disque ou mémoire sur des pages bancaires ou médicales, il faut déclarer `Cache-Control: no-store`. En complément, `stale-while-revalidate=60` autorise un CDN à servir brièvement une copie périmée tout en rafraîchissant l'origine en arrière-plan, maintenant une latence quasi nulle tandis que l'en-tête `Age` indique l'ancienneté en secondes dans le cache.

Sur le versant SEO et API, le code de statut d'une redirection transporte une sémantique stricte : **301** (permanente) et **302** (temporaire) permettent historiquement aux clients de transformer une requête `POST` en `GET`, alors que **308** (permanente) et **307** (temporaire) préservent impérativement la méthode et le corps de la requête initiale. Enfin, pour déclarer la version canonique d'un document PDF ou d'une image téléchargeable sans balise HTML, le serveur peut renvoyer un en-tête `Link: <https://exemple.fr/guide>; rel="canonical"` couplé à un `Content-Type` vérifiable via notre [vérificateur de type MIME](/fr/outils/mime-type-checker).

## Exemple de réponse HTTP saine et lecture diagnostique

Lors d'une inspection réelle (équivalente à un `curl -sI https://exemple.fr/app.js`), une réponse correctement configurée pour un actif statique versionné ressemble à ceci :

```http
HTTP/2 200
date: Mon, 23 Nov 2026 08:30:00 GMT
content-type: application/javascript; charset=utf-8
content-encoding: br
etag: "673a9c-1f40"
cache-control: public, max-age=31536000, immutable
vary: Accept-Encoding
strict-transport-security: max-age=63072000; includeSubDomains; preload
x-content-type-options: nosniff
x-cache: HIT
```

On relève immédiatement cinq signaux positifs : la négociation **HTTP/2**, la compression **Brotli** (`content-encoding: br`), la présence d'un validateur fort `etag`, l'en-tête `vary: Accept-Encoding` garantissant qu'un client ne supportant pas Brotli ne recevra pas une réponse compressée mise en cache, et un `x-cache: HIT` confirmant le service depuis la périphérie CDN.

## Trois scénarios de dépannage fréquents

### 1. Échec CORS sur requête authentifiée (`preflight OPTIONS`)

Lorsqu'une application front-end appelle une API sur un autre sous-domaine avec un en-tête `Authorization: Bearer ...` ou un type `application/json`, le navigateur envoie d'abord une requête `OPTIONS`. Si le serveur renvoie `Access-Control-Allow-Origin: *` tout en activant `Access-Control-Allow-Credentials: true`, le navigateur bloque la réponse. Renvoyez toujours l'origine validée sur liste blanche (`https://app.exemple.fr`) accompagnée de `Vary: Origin`.

### 2. Revalidation `304 Not Modified` inopérante

Si vos réponses dynamiques renvoient systématiquement `200 OK` avec le corps complet malgré la présence d'un `ETag`, vérifiez que la compression à la volée du reverse proxy ne convertit pas l'étiquette forte (`"abc"`) en étiquette faible (`W/"abc"`) sans correspondance avec l'en-tête `If-None-Match` envoyé par le client, ou qu'un `Cache-Control: no-store` n'empêche pas le navigateur de conserver le validateur.

### 3. Contenu bloqué par un changement d'User-Agent ou de DNS

Certains serveurs renvoient des en-têtes `X-Robots-Tag` ou des redirections 302 géolocalisées uniquement pour des agents utilisateurs spécifiques. Testez votre URL en alternant entre un profil navigateur standard et `Googlebot` (analysable en détail via notre [analyseur de User Agent](/fr/outils/user-agent-parser)), et confirmez le routage réseau sous-jacent à l'aide de l'outil [DNS Lookup](/fr/outils/dns-lookup).
