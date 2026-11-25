---
metaTitle: "Décodeur d'URL en Ligne — UTF-8, Requêtes & Double Encodage"
metaDescription: "Décodez vos URL encodées en pourcentage (RFC 3986), inspectez les paramètres de requête, restaurez l'UTF-8 et détectez les doubles encodages en local."
metaKeywords: "décodeur url, décoder url en ligne, percent decoding, rfc 3986, decodeURIComponent, decodeURI, paramètres de requête, double encodage, url utf-8"
title: "Décodeur d'URL"
shortDescription: "Décodez instantanément les chaînes encodées en pourcentage (RFC 3986), inspectez vos paramètres de requête en tableau, restaurez l'UTF-8 et détectez les doubles encodages en local."
faqs:
  - question: "Quelle est la différence entre decodeURI(), decodeURIComponent() et URLSearchParams ?"
    answer: "decodeURI() décode une URL complète tout en préservant les délimiteurs structurels réservés (:, /, ?, #, &, =, +, ;, ,). decodeURIComponent() décode chaque triplet hexadécimal %XX sans exception, idéal pour une valeur de paramètre isolée. URLSearchParams convertit en plus les signes + en espaces selon application/x-www-form-urlencoded."
  - question: "Pourquoi une erreur URIError: malformed URI sequence survient-elle lors du décodage ?"
    answer: "Cette exception se déclenche lorsqu'un signe % n'est pas suivi de deux chiffres hexadécimaux valides (par exemple 50% de remise) ou quand les octets décodés forment une séquence UTF-8 tronquée ou invalide, cas fréquent sur d'anciens serveurs encodés en ISO-8859-1 ou Windows-1252."
  - question: "Comment détecter et corriger une URL doublement encodée (%2520 ou %252F) ?"
    answer: "Un double encodage se reconnaît au motif %25 suivi de deux chiffres hexadécimaux : le symbole % d'une séquence déjà encodée (%20) a été ré-encodé en %25, formant %2520. Relancez une seconde passe de décodage pour confirmer le défaut, puis supprimez l'appel d'encodage redondant dans votre routeur, proxy ou SDK."
  - question: "Pourquoi un signe plus (+) devient-il tantôt un espace, tantôt un caractère littéral ?"
    answer: "Selon la RFC 3986, un espace dans le chemin d'une URL s'encode en %20 et le caractère + y reste littéral. Dans une chaîne de requête issue d'un formulaire (application/x-www-form-urlencoded, norme WHATWG), les espaces sont encodés en +, tandis qu'un vrai signe plus doit être encodé en %2B."
  - question: "Les URL sensibles (callbacks OAuth, webhooks, jetons) sont-elles transmises à un serveur ?"
    answer: "Non. L'ensemble du décodage, de la reconstitution UTF-8 et de l'inspection des paramètres de requête s'exécute localement dans votre navigateur. Aucune chaîne saisie n'est envoyée ni journalisée sur un serveur distant."
features:
  - "Décodage en temps réel conforme RFC 3986 avec bascule instantanée entre decodeURIComponent et decodeURI"
  - "Inspecteur interactif des paramètres de requête affichant chaque paire clé-valeur décodée sous forme de tableau"
  - "Reconstitution fidèle des séquences multi-octets UTF-8 couvrant accents, alphabets internationaux et emojis sur 4 octets"
  - "Détection des motifs de double encodage (%2520, %252F) et gestion explicite des erreurs de séquence URI mal formée"
  - "Interprétation maîtrisée du caractère + issu des requêtes application/x-www-form-urlencoded sans altérer les chemins"
  - "Traitement 100 % côté client avec compteur de longueur comparatif, copie rapide et export en fichier texte"
useCases:
  - "Inspection des paramètres redirect_uri, state, scope et error_description dans les callbacks OAuth 2.0 et OpenID Connect"
  - "Décodage de filtres JSON, de requêtes GraphQL ou de curseurs de pagination sérialisés dans des requêtes HTTP GET"
  - "Audit et nettoyage de liens marketing, balises UTM et redirections d'affiliation imbriquées sur plusieurs domaines"
  - "Diagnostic des bogues de double encodage entre un frontend, un reverse proxy Nginx/CDN et un backend applicatif"
  - "Restauration d'URL internationalisées (IRI), de slugs accentués et de noms de fichiers contenant des caractères non latins"
  - "Analyse de journaux d'accès serveur (access.log) pour repérer des tentatives d'obfuscation, de traversée de répertoire ou de XSS"
howToSteps:
  - "Collez votre URL complète, chaîne de requête ou valeur encodée en pourcentage dans la zone d'entrée."
  - "Choisissez le mode adapté : decodeURIComponent pour décoder tous les triplets %XX, ou decodeURI pour conserver la structure d'une URL complète."
  - "Consultez immédiatement le texte restitué ainsi que l'écart de longueur entre l'entrée encodée et la sortie décodée."
  - "Ouvrez l'Inspecteur de paramètres de requête pour examiner ou ajuster chaque paire clé-valeur située après le point d'interrogation."
  - "Si des séquences %25xx subsistent dans la sortie, lancez une seconde passe afin d'isoler un double encodage."
  - "Copiez le texte décodé ou téléchargez-le en fichier texte pour vos tests API ou vos rapports d'audit."
---

Une URL qui transite sur HTTP n'autorise directement qu'un sous-ensemble restreint d'US-ASCII défini par la **RFC 3986** et le **WHATWG URL Standard**. Dès qu'une requête transporte des accents, du JSON sérialisé ou un lien de retour OAuth, les clients HTTP traduisent chaque octet réservé ou non ASCII en triplet `%XX`. Le **décodage d'URL** (percent-decoding) réalise l'opération inverse pour restituer la chaîne lisible, inspecter chaque paramètre de requête ou déboguer une redirection défaillante. Pour préparer des chaînes sûres avant un appel API, associez cet outil à notre [encodeur d'URL](/fr/outils/url-encoder).

## Mécanique du décodage en pourcentage et séquences UTF-8

Le décodeur parcourt la chaîne séquentiellement et repère chaque délimiteur `%` suivi de deux chiffres hexadécimaux (`0-9`, `A-F`, insensibles à la casse). Chaque triplet `%XX` est converti en un octet brut (`0x00` à `0xFF`), puis la suite d'octets est interprétée en **UTF-8**. Notez que le percent-encoding s'applique uniquement au chemin, à la chaîne de requête et au fragment : le nom de domaine d'une adresse internationalisée (IDN) utilise quant à lui l'encodage **Punycode** (`xn--...`) défini par IDNA2008.

Pour l'ASCII de base (`0x00–0x7F`), la traduction est directe : `%20` devient un espace, `%2F` une barre oblique `/` et `%40` une arobase `@`. Les caractères Unicode modernes exigent deux à quatre octets contigus :

- **2 octets** : `é` (`U+00E9`) s'encode `%C3%A9`, donc `caf%C3%A9` redevient `café`.
- **3 octets** : le symbole `€` (`U+20AC`) correspond à `%E2%82%AC`.
- **4 octets** : l'emoji 🚀 (`U+1F680`) se compose des quatre octets `%F0%9F%9A%80`.

Cette règle explique un piège récurrent sur les applications francophones héritées : un serveur en **ISO-8859-1** ou **Windows-1252** représente `é` par l'unique octet `%E9`. Soumis à un décodeur UTF-8 strict comme `decodeURIComponent()`, cet octet isolé ne respecte aucune séquence UTF-8 valide et lève `URIError: malformed URI sequence`.

## Comparatif des API de décodage : RFC 3986 contre formulaires Web

Les fonctions standard de décodage appliquent des règles différentes sur les caractères réservés (`; , / ? : @ & = + $ #`) et le signe `+`. Choisir la mauvaise API provoque des altérations silencieuses sur des jetons Base64 ou des e-mails avec suffixe (`prenom+tag@domaine.fr`).

| Méthode / Norme | Portée prévue | Réservés préservés | `+` vers espace | Sur `%` invalide | Usage recommandé |
| :--- | :--- | :---: | :---: | :--- | :--- |
| **`decodeURI()`** | URL complète (RFC 3986) | Oui (`: / ? # & = + ; , @ $`) | Non | Lève `URIError` | Afficher une URL complète sans casser sa syntaxe |
| **`decodeURIComponent()`** | Valeur ou segment isolé | Non (décode tout) | Non | Lève `URIError` | Décoder une valeur de paramètre ou une `redirect_uri` |
| **`URLSearchParams`** | Chaîne de requête (WHATWG) | N/A (paires clé-valeur) | **Oui** | Remplace par `U+FFFD` | Analyser les paramètres situés après `?` |
| **`urllib.parse.unquote`** | Chemin RFC 3986 (Python) | Non | Non | Laisse / `U+FFFD` | Décoder des segments de chemin côté serveur |
| **`urllib.parse.unquote_plus`** | `x-www-form-urlencoded` | Non | **Oui** | Remplace par `U+FFFD` | Lire des champs soumis par formulaire HTML |

La frontière entre **chemin** et **chaîne de requête** est stricte : dans `/docs/C++%20guide.pdf`, les signes `+` restent littéraux et seul `%20` code un espace. Dans `?q=cafe+creme&tag=c%2B%2B`, `URLSearchParams` convertit `+` en espace et `%2B` en `+` littéral.

## Diagnostiquer le double encodage et les erreurs d'URI

Le **double encodage** survient lorsqu'une chaîne déjà encodée passe dans un second encodeur : `%20` voit son `%` ré-encodé en `%25`, devenant `%2520`, et `%2F` devient `%252F`. Ce défaut apparaît fréquemment entre un routeur frontend, une directive `proxy_pass` Nginx comportant un suffixe de chemin (qui réécrit et renormalise l'URI avant transmission) et un serveur OAuth. Rappelez-vous aussi que le fragment situé après `#` reste côté client et n'est jamais envoyé dans la requête HTTP serveur.

```javascript
// Décodage défensif d'un paramètre avec détection de double encodage
export function decoderParametreSur(brut, convertirPlus = true) {
  const normalise = convertirPlus ? brut.replace(/\+/g, '%20') : brut;
  try {
    const passe1 = decodeURIComponent(normalise);
    return { valeur: passe1, doubleEncodage: /%(?:[0-9A-Fa-f]{2})/.test(passe1) };
  } catch (erreur) {
    const nettoye = normalise.replace(/%(?![0-9A-Fa-f]{2})/g, '%25');
    return { valeur: decodeURIComponent(nettoye), doubleEncodage: false, avertissement: erreur.message };
  }
}
```

```bash
# Décoder rapidement une ligne d'access.log en CLI avec Python
python3 -c "import sys, urllib.parse; print(urllib.parse.unquote_plus(sys.argv[1]))" \
  "https://api.exemple.fr/search?filter=%7B%22ville%22%3A%22Montr%C3%A9al%22%7D"
```

### Chaîner le décodage avec JSON, Base64 et JWT

Dans les API REST et les flux d'authentification, le percent-encoding n'est souvent que la couche externe :

1. Extrayez un filtre JSON encodé (`%7B%22sort%22%3A%22desc%22%7D`), puis indentez-le dans notre [formateur JSON](/fr/outils/json-formatter).
2. Si un paramètre `state` ou `SAMLRequest` contient du Base64 où `+`, `/` et `=` ont été encodés en `%2B`, `%2F` et `%3D`, décodez l'URL puis inspectez la charge dans notre [décodeur Base64](/fr/outils/base64-decode) ou notre [décodeur JWT](/fr/outils/jwt-decoder).
3. Pour suivre des redirections marketing multi-sauts, combinez l'analyse avec notre [vérificateur de redirections](/fr/outils/redirect-checker).

## Sécurité : limites de l'encodage et risques au décodage

Le percent-encoding n'est **pas un chiffrement** : quiconque intercepte l'URL la décode instantanément. Ne placez jamais de clés API, mots de passe ou jetons de session dans une chaîne de requête, car ils persistent dans l'historique du navigateur, les journaux proxy et les en-têtes `Referer`.

Un décodage imprudent expose par ailleurs à trois vulnérabilités classiques :

- **Contournement de WAF et traversée de répertoire** : si un filtre contrôle le chemin avant un second décodage applicatif, `%252e%252e%252fetc%252fpasswd` franchit l'inspection puis devient `../etc/passwd`. Décodez une seule fois et normalisez le chemin avant toute vérification d'accès.
- **Redirection ouverte** : validez toujours le domaine d'une `redirect_uri` *après* décodage strict contre une liste blanche explicite.
- **XSS côté DOM** : n'injectez jamais un paramètre décodé dans `innerHTML` ou `href` sans échappement HTML et contrôle strict du protocole (`https:` uniquement).

Tous les calculs de cet utilitaire s'exécutent localement dans votre navigateur : vos URL de production, journaux et callbacks restent strictement privés.
