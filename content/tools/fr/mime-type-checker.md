---
metaTitle: "Vérificateur de Types MIME | Content-Type et Magic Bytes"
metaDescription: "Inspectez et validez les types MIME, en-têtes HTTP Content-Type et signatures Magic Bytes pour prévenir le MIME sniffing et sécuriser vos uploads."
metaKeywords: "vérificateur type mime, content-type http, magic bytes, mime sniffing, x-content-type-options nosniff, sécurité upload fichier, rfc 9110, type de média iana, validation fichier binaire"
title: "Vérificateur de Types MIME (MIME Type Checker)"
shortDescription: "Détectez et validez les types MIME (Content-Type) pour vos fichiers, extensions et URL en temps réel. Analysez les en-têtes HTTP et inspectez les Magic Bytes pour sécuriser vos uploads."
faqs:
  - question: "Quelle est la différence entre une extension de fichier et un type MIME ?"
    answer: "L'extension (.pdf, .png) est une convention locale utilisée par le système d'exploitation pour associer un fichier à une application. Le type MIME (application/pdf, image/png) est un identifiant normalisé par l'IANA et transmis dans l'en-tête HTTP Content-Type afin d'indiquer au navigateur comment interpréter la ressource."
  - question: "Comment les Magic Bytes permettent-ils de détecter un fichier falsifié ?"
    answer: "Les Magic Bytes sont des signatures hexadécimales fixes placées dans les premiers octets d'un fichier binaire (par exemple 89 50 4E 47 pour un PNG). Même si un attaquant renomme un exécutable en image.png, la lecture de sa signature brute révèle immédiatement la discordance avec l'extension déclarée."
  - question: "Pourquoi l'en-tête X-Content-Type-Options: nosniff est-il indispensable ?"
    answer: "Sans cette directive, certains navigateurs tentent de deviner le format réel d'une ressource par MIME sniffing. Un fichier texte ou une image polyglotte contenant du HTML ou du JavaScript peut alors être exécuté comme un script actif, ouvrant une brèche XSS stockée sur votre domaine."
  - question: "Quel type MIME officiel faut-il utiliser pour les fichiers JavaScript modernes ?"
    answer: "Depuis la RFC 9239, le type MIME standard recommandé par l'IANA est text/javascript, y compris pour les modules ES (.mjs). Les anciennes valeurs comme application/javascript ou application/x-javascript sont désormais obsolètes, bien qu'encore tolérées par la plupart des navigateurs."
  - question: "Pourquoi un fichier SVG peut-il représenter un risque même avec son vrai type MIME ?"
    answer: "Le format image/svg+xml repose sur XML et autorise l'embarquement direct de balises script ou de gestionnaires d'événements. Si un utilisateur téléverse un SVG non assaini servi sur votre domaine principal, son ouverture directe dans le navigateur peut exécuter du code malveillant."
features:
  - "Inspection locale des Magic Bytes (signatures hexadécimales) directement dans le navigateur sans transfert serveur."
  - "Détection automatique du spoofing d'extension entre le nom de fichier déclaré et sa structure binaire réelle."
  - "Analyse des en-têtes HTTP distants : Content-Type, paramètre charset et présence de X-Content-Type-Options."
  - "Référentiel complet des types MIME enregistrés par l'IANA avec correspondances d'extensions et catégories."
  - "Identification des formats à risque pour les formulaires d'upload (SVG, HTML, exécutables PE/ELF, archives)."
  - "Recommandations de configuration prêtes à l'emploi pour Nginx, Apache et les CDN afin de bloquer le MIME sniffing."
useCases:
  - "Auditer un formulaire d'upload utilisateur pour détecter les tentatives de contournement par double extension ou polyglotte."
  - "Déboguer un module JavaScript (.mjs) ou une feuille CSS bloqués par le navigateur suite à une erreur de type MIME strict."
  - "Vérifier que les serveurs Nginx, Apache ou Cloudflare renvoient bien X-Content-Type-Options: nosniff sur les assets statiques."
  - "Contrôler l'encodage charset=utf-8 des réponses API JSON, XML et HTML afin d'éliminer les corruptions de caractères accentués."
  - "Diagnostiquer des erreurs de rendu Googlebot causées par des ressources CSS ou polices WOFF2 servies en text/plain."
  - "Identifier le format binaire réel d'un fichier reçu sans extension ou corrompu lors d'un transfert HTTP ou SFTP."
howToSteps:
  - "Saisissez une extension (par exemple .webp ou .woff2) ou un type MIME dans la barre de recherche pour consulter sa fiche IANA."
  - "Glissez-déposez un fichier local dans l'analyseur binaire pour extraire instantanément ses Magic Bytes côté client."
  - "Comparez l'extension déclarée avec la signature hexadécimale détectée afin de repérer toute usurpation de format."
  - "Renseignez une URL HTTP/HTTPS dans l'inspecteur distant pour lire l'en-tête Content-Type et le jeu de caractères renvoyés."
  - "Vérifiez le statut de sécurité de l'en-tête X-Content-Type-Options et appliquez les correctifs serveur recommandés."
---

Sur le Web, un navigateur ne s'appuie pas sur l'extension d'un fichier pour décider s'il doit afficher une image, compiler un module JavaScript ou déclencher un téléchargement : il suit l'en-tête HTTP `Content-Type`, défini par le standard des types MIME (*Multipurpose Internet Mail Extensions*). Normalisés par les **RFC 6838** et **RFC 9110** et maintenus dans le registre officiel de l'IANA, les types de médias gouvernent à la fois l'interopérabilité applicative, la sécurité contre les injections de code et la capacité des robots d'indexation à rendre une page. Un **vérificateur de types MIME** permet de confronter trois vérités trop souvent divergentes : l'extension nominale, l'en-tête déclaré par le serveur et la signature binaire réelle du fichier.

## Anatomie d'un type MIME et syntaxe HTTP

Selon la RFC 6838, un type MIME obéit à la structure `type/sous-type`, complétée par des paramètres optionnels séparés par un point-virgule. Le type principal définit la famille de données (`text`, `image`, `audio`, `video`, `font`, `application`, `multipart` ou `message`), tandis que le sous-type identifie le format exact.

Les arbres d'enregistrement précisent l'origine de la spécification : l'arbre standard ne comporte aucun préfixe (`application/pdf`), l'arbre fournisseur utilise `vnd.` (`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` pour `.xlsx`), l'arbre personnel emploie `prs.` et les formats expérimentaux héritent historiquement du préfixe `x-`. Les suffixes structurés tels que `+xml`, `+json` ou `+zip` (par exemple `application/ld+json` ou `image/svg+xml`) informent les parseurs génériques de la syntaxe sous-jacente.

Dans une réponse HTTP, l'en-tête `Content-Type` transporte souvent des paramètres critiques :

```http
Content-Type: text/html; charset=utf-8
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW
X-Content-Type-Options: nosniff
```

L'omission de `charset=utf-8` sur un flux `text/html` ou `text/csv` provoque des erreurs de décodage des caractères diacritiques français (`é`, `è`, `ç`), tandis qu'un type erroné sur un module ES (`<script type="module">`) entraîne un refus immédiat d'exécution, car la spécification HTML impose un contrôle MIME strict sans solution de repli.

## Signatures binaires (Magic Bytes) et validation d'uploads

Se fier au nom de fichier ou à la propriété `file.type` envoyée par un navigateur constitue une faille classique de sécurité : un client HTTP peut forger librement l'extension comme l'en-tête `Content-Type` d'une requête `POST`. Pour établir la nature réelle d'un fichier, il faut inspecter ses **Magic Bytes**, une séquence d'octets immuable placée en tête de fichier (offset `0`) ou à un décalage précis.

| Extension | Type MIME officiel (IANA) | Signature Magic Bytes (Hex) | Offset | Risque sécurité et point de vigilance |
| :--- | :--- | :--- | :--- | :--- |
| `.png` | `image/png` | `89 50 4E 47 0D 0A 1A 0A` | `0` | Fiable ; vérifier les chunks textes pour les fichiers polyglottes |
| `.jpg` | `image/jpeg` | `FF D8 FF` | `0` | Ré-encoder côté serveur pour purger les métadonnées EXIF/commentaires |
| `.webp` | `image/webp` | `52 49 46 46` + `57 45 42 50` | `0` et `8` | Conteneur RIFF ; contrôler les octets 8 à 11 (`WEBP`) |
| `.pdf` | `application/pdf` | `25 50 44 46 2D` (`%PDF-`) | `0` | Peut contenir du JavaScript embarqué ; servir avec `Content-Disposition` |
| `.zip` / `.docx` | `application/zip` | `50 4B 03 04` (`PK..`) | `0` | Même en-tête pour ZIP, DOCX, XLSX et JAR ; inspecter l'archive interne |
| `.svg` | `image/svg+xml` | Texte XML (`<svg` ou `<?xml`) | Variable | Risque XSS élevé ; assainir le DOM XML ou isoler le domaine |
| `.woff2` | `font/woff2` | `77 4F 46 32` (`wOF2`) | `0` | Requis pour le chargement CORS strict des polices Web |
| `.exe` / `.dll` | `application/vnd.microsoft.portable-executable` | `4D 5A` (`MZ`) | `0` | Exécutable Windows ; à rejeter systématiquement sur un upload public |

Même les Magic Bytes ne suffisent pas seuls face aux **fichiers polyglottes** (comme un GIF valide dont le bloc de commentaire contient du code HTML ou JavaScript). Une défense en profondeur combine l'inspection binaire côté serveur (via `libmagic`), le ré-encodage des images uploadées, le renommage aléatoire par UUID et l'hébergement des contenus utilisateurs sur un sous-domaine sandbox distinct sans cookies de session.

## Prévenir le MIME Sniffing et durcir la configuration serveur

Le **MIME Sniffing** (spécifié par le *WHATWG MIME Sniffing Standard*) désigne le mécanisme par lequel un navigateur inspecte les premiers octets d'une ressource afin de deviner son format lorsque l'en-tête serveur est absent ou générique (`application/octet-stream`, `text/plain`). Si un attaquant dépose un fichier `avatar.txt` contenant `<script>...</script>`, un navigateur autorisé à pratiquer le sniffing peut le reclasser en `text/html` et exécuter le script dans le contexte d'origine du site.

L'ajout systématique de l'en-tête `X-Content-Type-Options: nosniff` interdit cette réinterprétation. Configurez Nginx et Apache pour déclarer explicitement les formats modernes :

```nginx
# Nginx (/etc/nginx/conf.d/mime-security.conf)
include       /etc/nginx/mime.types;
types {
    text/javascript  mjs;
    image/avif       avif;
    font/woff2       woff2;
}
default_type  application/octet-stream;
add_header X-Content-Type-Options "nosniff" always;
```

Sous Apache, déclarez vos directives dans `.htaccess` (ou générez-les via notre [Générateur .htaccess](/fr/outils/htaccess-generator)) :

```apache
AddType text/javascript .js .mjs
AddType image/webp .webp
Header always set X-Content-Type-Options "nosniff"
```

## Scénarios de dépannage et diagnostic HTTP

En production, vérifiez d'abord les en-têtes bruts avec `curl -sI` ou notre [Vérificateur d'En-têtes HTTP](/fr/outils/http-header-checker). Trois anomalies concentrent l'essentiel des pannes :

1. **CSS ou script bloqué en mode strict** : un en-tête `text/plain` couplé à `nosniff` empêche les navigateurs et Googlebot de charger le style ou le code, pénalisant l'ergonomie mobile et le SEO.
2. **HTML renvoyé à la place d'un bundle JS** : une réécriture SPA défaillante sert `index.html` (`text/html`) sur un chunk absent, produisant l'erreur *Expected a JavaScript module script*.
3. **Téléchargement forcé d'images ou de PDF** : un bucket S3 ou R2 attribue `application/octet-stream` par défaut lors d'un envoi programmatique. Définissez explicitement `ContentType` à chaque `PutObject` et réservez `Content-Disposition: attachment` aux pièces jointes non fiables.
