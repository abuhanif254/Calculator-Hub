---
metaTitle: "Encodeur d'URL en Ligne | RFC 3986 & encodeURIComponent"
metaDescription: "Encodez et décodez vos URL et paramètres de requête selon RFC 3986 (encodeURIComponent, encodeURI) avec inspecteur visuel et UTF-8 côté client."
metaKeywords: "encodeur url, décodeur url, encodage url, percent-encoding, rfc 3986, encodeURIComponent, encodeURI, paramètres de requête, url utf-8, urlsearchparams"
title: "Encodeur et Décodeur d'URL"
shortDescription: "Appliquez un encodage en pourcentage (RFC 3986, encodeURI et encodeURIComponent) aux URL complètes, paramètres de requête et chaînes UTF-8, avec un inspecteur visuel de paramètres exécuté localement."
faqs:
  - question: "Quand choisir encodeURIComponent plutôt que encodeURI ?"
    answer: "Utilisez encodeURIComponent pour encoder une valeur de paramètre de requête, un champ de formulaire ou un segment de chemin dynamique afin d'échapper les délimiteurs réservés (&, =, /, ?). Réservez encodeURI au nettoyage d'espaces ou d'accents dans une URL complète déjà assemblée dont le protocole et les barres obliques doivent rester intacts."
  - question: "Pourquoi encodeURIComponent laisse-t-il les caractères !, ', (, ) et * non encodés ?"
    answer: "ECMAScript définit encodeURIComponent d'après l'ancienne norme RFC 2396 plutôt que la section 2.3 de la RFC 3986. Les API exigeant un encodage RFC 3986 strict — notamment AWS Signature Version 4 et OAuth 1.0a — nécessitent une passe supplémentaire remplaçant ces cinq sous-délimiteurs par %21, %27, %28, %29 et %2A."
  - question: "Pourquoi un espace devient-il %20 dans un chemin mais + dans une requête de formulaire ?"
    answer: "La RFC 3986 encode chaque espace ASCII (0x20) en %20 dans tous les composants d'un URI. La notation '+' provient exclusivement du type MIME application/x-www-form-urlencoded utilisé par les formulaires HTML GET/POST et l'interface JavaScript URLSearchParams, et ne doit jamais être employée dans un chemin d'URL."
  - question: "Comment les accents, caractères CJK et émojis sont-ils encodés en pourcentage ?"
    answer: "Chaque valeur scalaire Unicode est d'abord sérialisée en octets UTF-8 (de 2 à 4 octets), puis chaque octet est transcrit en '%' suivi de deux chiffres hexadécimaux majuscules. Par exemple, le caractère 'é' produit %C3%A9 (2 octets) et un émoji 4 octets comme U+1F455 devient %F0%9F%91%95."
  - question: "Faut-il encoder en pourcentage un nom de domaine contenant des caractères accentués ?"
    answer: "Non. Les noms d'hôtes internationalisés reposent sur la norme IDNA2008 (encodage Punycode préfixé par 'xn--') pour la résolution DNS, et non sur l'encodage en pourcentage. Le percent-encoding s'applique uniquement au chemin, à la chaîne de requête et au fragment situés après le domaine."
features:
  - "Modes commutables Composant (encodeURIComponent) et URL complète (encodeURI) conformes aux règles web modernes"
  - "Flux bidirectionnel Encodage/Décodage avec inversion entrée-sortie en un clic et détection automatique d'URL déjà encodée au collage"
  - "Inspecteur interactif de paramètres de requête permettant d'ajouter, éditer ou supprimer chaque paire clé=valeur tout en préservant l'ancre #fragment"
  - "Encodage par lots ligne par ligne avec prise en charge intégrale des octets UTF-8 multi-octets et des émojis"
  - "Compteur en direct des délimiteurs réservés RFC 3986, analyse de variation de longueur et repérage des doubles encodages (%2520)"
  - "Exécution 100 % côté client avec copie rapide et export en fichier texte pour déboguer vos endpoints sans fuite de jetons"
useCases:
  - "Échapper en toute sécurité des requêtes de recherche, adresses e-mail ou filtres utilisateur avant leur insertion dans une API REST"
  - "Assembler un paramètre OAuth 2.0 redirect_uri imbriqué sans casser les délimiteurs '&' et '?' de l'URL parente"
  - "Créer, auditer et retoucher visuellement des liens marketing comportant de nombreux paramètres UTM"
  - "Encoder des segments de chemin dynamiques contenant des barres obliques, espaces ou dièses pour les routeurs Express, FastAPI ou Go"
  - "Construire des liens mailto: préremplis avec un objet accentué et un corps de message multiligne proprement encodé"
  - "Convertir des noms de fichiers non ASCII et chemins internationalisés en cibles HTTP déterministes pour vos scripts cURL"
howToSteps:
  - "Vérifiez que le mode Encoder est actif dans la barre d'outils (ou basculez sur Décoder pour analyser une chaîne existante)."
  - "Sélectionnez Composant (encodeURIComponent) pour une valeur de paramètre ou un segment de chemin, ou URL complète (encodeURI) pour un lien entier."
  - "Saisissez ou collez votre texte, chaîne Unicode ou URL dans le panneau d'entrée ; les saisies multilignes sont traitées ligne par ligne."
  - "Si votre URL comporte une chaîne de requête, modifiez, ajoutez ou supprimez individuellement chaque paire dans l'Inspecteur de paramètres ci-dessous."
  - "Contrôlez les compteurs de caractères réservés et le résultat généré à droite, puis copiez la chaîne ou téléchargez-la en fichier texte."
---

Chaque requête HTTP transmet son identifiant de ressource selon la grammaire US-ASCII stricte définie par la **RFC 3986** et le **WHATWG URL Standard**. Puisque les délimiteurs structurels (`?`, `&`, `/`, `#`, `=`) partagent la même chaîne que les données utilisateur, injecter une valeur brute provoque des découpages erronés côté routeur ou serveur mandataire — voire la perte silencieuse de tout texte placé après un `#` interprété comme fragment client. Cet utilitaire exécute un **percent-encoding** conforme et offre un inspecteur visuel de paramètres directement dans votre navigateur, gardant clés API et adresses internes sur votre poste.

## Taxonomie RFC 3986 : caractères non réservés et délimiteurs

La RFC 3986 répartit les symboles d'un URI en deux classes régissant la réécriture en triplet `%HH` (signe pour cent suivi de deux chiffres hexadécimaux) :

- **Caractères non réservés** (`ALPHA`, `DIGIT`, `-`, `.`, `_`, `~`) : ces 66 caractères n'ont aucune fonction syntaxique et ne doivent jamais être encodés ; normaliser `%7E` vers `~` préserve le sens exact de l'URI.
- **Caractères réservés** : regroupés en **délimiteurs généraux** (`gen-delims` : `:/?#[]@`), séparant `scheme://authority/path?query#fragment`, et en **sous-délimiteurs** (`sub-delims` : `!$&'()*+,;=`), actifs à l'intérieur d'un composant.

Tout autre octet — espace ASCII (`0x20`), contrôles (`0x00–0x1F`), guillemets, chevrons, signe `%` littéral (`%25`) et tout caractère non ASCII — doit être encodé lorsqu'il représente une donnée. L'encodage doit impérativement **précéder** l'assemblage : une fois `https://api.exemple.fr/recherche?q=R&D&page=2` concaténée à plat, aucun analyseur ne sait plus si le premier `&` appartient au terme `R&D` ou introduit un nouveau paramètre.

## Comparatif : `encodeURI`, `encodeURIComponent`, RFC 3986 strict et `URLSearchParams`

Employer la mauvaise primitive d'encodage cause d'innombrables signatures rejetées et paramètres tronqués. Ce tableau précise le comportement exact des quatre primitives standards :

| Mécanisme | Préserve `:/?#[]@` | Préserve `!$'()*+,;=` | Espace | Cas d'usage optimal |
| :--- | :---: | :---: | :---: | :--- |
| **`encodeURI()`** | Oui (`:/?#@&=+$,;`) | Oui (tous) | `%20` | Nettoyer espaces et UTF-8 dans une URL déjà assemblée |
| **`encodeURIComponent()`** | Non | Seulement `!'()*` | `%20` | Valeurs de requête, `redirect_uri` OAuth, segments de chemin |
| **RFC 3986 strict** | Non | Non (`!'()*` encodés) | `%20` | Requêtes canoniques AWS SigV4, signatures OAuth 1.0a |
| **`URLSearchParams`** | Non | Seulement `*` | `+` | Requêtes `application/x-www-form-urlencoded` et corps POST |

Pour signer des requêtes canoniques AWS S3, CloudFront ou OAuth 1.0a, complétez `encodeURIComponent()` par une substitution des cinq sous-délimiteurs restants afin que la signature corresponde octet pour octet côté serveur :

```javascript
function encodeRFC3986(valeur) {
  return encodeURIComponent(valeur).replace(
    /[!'()*]/g,
    (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`
  );
}

// Encodage sûr d'une URL de redirection imbriquée
const retour = "https://app.exemple.fr/auth?next=/facturation&offre=pro(v2)";
const urlConnexion = `https://idp.exemple.fr/authorize?redirect_uri=${encodeRFC3986(retour)}`;
```

## Sérialisation UTF-8 multi-octets et distinction IDNA Punycode

Sous RFC 3986 et WHATWG URL, le percent-encoding porte sur des **octets UTF-8**, et non sur des unités UTF-16 ou ISO-8859-1. Chaque caractère Unicode est d'abord converti sur 1 à 4 octets avant transcription en `%HH` :

1. **ASCII 1 octet (`U+0000–U+007F`)** : `?` (`0x3F`) produit `%3F` ; l'espace (`0x20`) produit `%20`.
2. **Latin accentué, grec, cyrillique 2 octets (`U+0080–U+07FF`)** : `é` (`U+00E9`, UTF-8 `C3 A9`) produit `%C3%A9`.
3. **Plan multilingue de base 3 octets (`U+0800–U+FFFF`)** : `€` (`U+20AC`, `E2 82 AC`) produit `%E2%82%AC` ; `本` (`U+672C`) produit `%E6%9C%AC`.
4. **Plan complémentaire 4 octets (`U+10000–U+10FFFF`)** : `👕` (`U+1F455`, `F0 9F 91 95`) produit `%F0%9F%91%95`.

En revanche, les **noms de domaine internationalisés** obéissent au standard **IDNA2008 / Punycode** : l'hôte `café.exemple.fr` est résolu en DNS sous la forme `xn--caf-dma.exemple.fr`, jamais en `caf%C3%A9.exemple.fr`. Le percent-encoding ne concerne que le chemin, la requête et le fragment. Pour obtenir des chemins SEO lisibles en ASCII pur plutôt que des séquences `%C3%A9`, normalisez vos titres avec notre [générateur de slug](/fr/outils/slug-generator).

## Pièges d'ingénierie et bonnes pratiques

### Double encodage, symbole `+` et réécriture par les passerelles

Un double encodage apparaît lorsqu'une valeur déjà encodée subit une seconde passe : `%20` devient `%2520` car le signe `%` se réencode lui-même en `%25`. Ce défaut survient fréquemment lorsqu'un front-end appelle manuellement `encodeURIComponent()` avant de confier le paramètre à Axios, à `fetch` avec `URLSearchParams` ou à un client HTTP qui réencode automatiquement les clés et valeurs. Une autre incohérence classique concerne l'espace dans `application/x-www-form-urlencoded` : `decodeURIComponent()` laisse le signe `+` intact au lieu de le convertir en espace, ce qui oblige à traiter distinctement les requêtes de formulaire et les segments de chemin. Pour diagnostiquer ces couches superposées ou vérifier une cascade de réponses HTTP, appuyez-vous sur notre [décodeur d'URL](/fr/outils/url-decoder) et notre [vérificateur de redirections](/fr/outils/redirect-checker).

### Données binaires versus texte en chaîne de requête

Le percent-encoding d'octets binaires arbitraires triple leur volume (+200 %), chaque octet hors de l'ensemble non réservé consommant trois caractères ASCII. Pour transporter un jeton cryptographique, un identifiant binaire ou un état compressé dans une URL ou un lien de partage, convertissez d'abord le tampon en **Base64url sans bourrage** (`-` et `_`) via notre [encodeur Base64](/fr/outils/base64-encode) : le surcoût tombe autour de 33 % tout en restant intégralement dans l'alphabet non réservé de la RFC 3986, sans aucun échappement supplémentaire.

### Édition visuelle, liens `mailto:` et équivalent cURL

Au-delà de dix paramètres de filtrage, de pagination ou de suivi UTM, éditer manuellement une chaîne séparée par `&` expose aux délimiteurs oubliés. Coller l'URL ici peuple l'**Inspecteur de paramètres** : chaque paire s'édite décodée puis se resérialise via `encodeURIComponent()` en préservant intact le chemin de base ainsi que l'ancre `#fragment`. Pour les liens `mailto:` préremplis, privilégiez également `%0D%0A` pour encoder les sauts de ligne du corps de message afin d'assurer une interprétation homogène sur les clients de messagerie de bureau et mobiles.

En terminal, déléguez toujours l'encodage à cURL avec `curl -G --data-urlencode "q=R&D + tarifs (2026)" https://api.exemple.fr/recherche` plutôt que d'assembler des variables shell à la main. Enfin, même si `%2f` et `%2F` sont équivalents selon la RFC 3986, privilégiez les chiffres hexadécimaux **majuscules** pour normaliser vos clés de cache CDN et signatures canoniques.
