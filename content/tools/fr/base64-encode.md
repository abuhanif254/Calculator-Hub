---
metaTitle: "Encodeur Base64 en Ligne | RFC 4648, Base64url & Data URI"
metaDescription: "Encodez et décodez texte UTF-8, JSON, images et fichiers binaires en Base64 RFC 4648 ou Base64url sans bourrage, avec aperçu Data URI local."
metaKeywords: "encodeur base64, décodeur base64, base64 en ligne, base64url, rfc 4648, base64 utf-8, image en base64, data uri, décoder base64, jwt base64url"
title: "Encodeur et Décodeur Base64"
shortDescription: "Encodez et décodez texte UTF-8, charges utiles JSON, images et fichiers binaires selon RFC 4648 (Base64 standard et Base64url sans bourrage) avec génération de Data URI et mesure du surcoût en octets, 100 % côté client."
faqs:
  - question: "Pourquoi l'encodage Base64 augmente-t-il la taille des données d'environ 33,3 % ?"
    answer: "Base64 convertit chaque bloc de 3 octets bruts (24 bits) en 4 caractères US-ASCII représentant chacun 6 bits. Remplacer 3 octets par 4 caractères impose un facteur d'expansion fixe de 4/3 (+33,33 %), auquel s'ajoutent 1 ou 2 caractères de bourrage '=' lorsque la longueur en octets n'est pas multiple de 3."
  - question: "Qu'est-ce qui distingue le Base64 standard (RFC 4648 §4) du Base64url (RFC 4648 §5) ?"
    answer: "Le Base64 standard attribue '+' au sextet 62 et '/' au sextet 63, deux symboles qui entrent en conflit avec l'encodage des espaces et des séparateurs de chemin dans les URL. La variante Base64url remplace '+' par '-', '/' par '_' et supprime le bourrage '=' final pour les jetons JWT, paramètres OAuth PKCE et noms de fichiers."
  - question: "Pourquoi window.btoa() échoue-t-il sur les accents et émojis en JavaScript ?"
    answer: "La fonction native window.btoa() n'accepte que les points de code Latin-1 (U+0000 à U+00FF) et lève une exception InvalidCharacterError dès qu'un caractère dépasse un octet (émojis, kanji, symbole euro). Notre outil sérialise d'abord le texte en octets UTF-8 via TextEncoder, puis valide le décodage avec TextDecoder en mode strict."
  - question: "Le Base64 constitue-t-il un chiffrement adapté aux mots de passe ou clés API ?"
    answer: "Non. Base64 est un encodage public totalement réversible, sans clé secrète ni garantie cryptographique. N'importe qui peut décoder un Secret Kubernetes ou un en-tête HTTP Basic Auth en une milliseconde ; protégez toujours ces données avec TLS en transit et un véritable chiffrement authentifié au repos."
  - question: "Quand faut-il intégrer une image en Data URI RFC 2397 plutôt qu'en fichier externe ?"
    answer: "Un Data URI (data:image/png;base64,...) est pertinent pour les petites icônes d'interface ou SVG critiques sous environ 4 Ko afin d'économiser une requête réseau. Au-delà, privilégiez des fichiers externes afin de conserver le cache HTTP indépendant et d'éviter d'alourdir le CSS ou le HTML de 33 %."
features:
  - "Encodage et décodage bidirectionnels RFC 4648 section 4 (Base64 standard) et section 5 (Base64url sans bourrage '=') avec permutation rapide"
  - "Sérialisation UTF-8 stricte via TextEncoder et décodage sécurisé via TextDecoder, éliminant les erreurs btoa() sur accents, écritures CJK et émojis"
  - "Glisser-déposer d'images et de fichiers binaires générant automatiquement un Data URI RFC 2397 avec détection du type MIME et aperçu visuel"
  - "Détection intelligente au collage reconnaissant une chaîne Base64 valide pour basculer directement en mode Décodage"
  - "Compteurs en direct des caractères, lignes et octets UTF-8 en entrée et sortie pour mesurer exactement le surcoût 4:3"
  - "Éditeur Monaco avec thème clair/sombre, brouillon local persistant, téléchargement et exécution 100 % hors ligne côté client"
useCases:
  - "Construire un en-tête HTTP Basic Authentication (Authorization: Basic base64(utilisateur:motdepasse)) sans erreur de saut de ligne shell"
  - "Générer des segments Base64url non bourrés pour des jetons JWT, défis OAuth 2.0 PKCE et paramètres d'état transmis dans une URL"
  - "Intégrer de petites icônes PNG, WebP ou SVG en Data URI RFC 2397 dans une feuille de style CSS ou un gabarit HTML autonome"
  - "Encoder des certificats TLS PEM, fichiers de compte de service JSON ou variables sensibles pour les manifestes Kubernetes Secret YAML"
  - "Transporter des empreintes binaires, tampons PDF ou textes chiffrés dans des champs chaînes d'API REST JSON ou GraphQL"
  - "Vérifier l'intégrité aller-retour d'un webhook ou d'un jeton applicatif en alternant Encodage et Décodage d'un seul clic"
howToSteps:
  - "Sélectionnez le mode Encoder ou Décoder dans la barre supérieure, ou cliquez sur Coller pour laisser l'outil détecter automatiquement une chaîne Base64."
  - "Saisissez votre texte UTF-8, objet JSON ou identifiant dans l'éditeur Monaco de gauche, ou déposez une image ou un fichier binaire dans la zone d'import."
  - "Activez l'option URL-Safe dès que la chaîne produite doit figurer dans un paramètre d'URL, un segment de route, un nom de fichier ou un JWT."
  - "Consultez les compteurs de caractères et d'octets UTF-8 pour vérifier l'expansion réelle, ainsi que l'aperçu du Data URI pour vos images."
  - "Copiez le résultat, téléchargez-le en fichier local ou cliquez sur Inverser pour réinjecter la sortie en entrée et contrôler la réversibilité."
---

Le **Base64** est un schéma d'encodage binaire vers texte normalisé par la **RFC 4648** qui traduit toute suite arbitraire d'octets en un sous-ensemble sûr de 64 caractères US-ASCII imprimables. Dès que des données brutes — images, empreintes cryptographiques, certificats TLS ou texte UTF-8 multi-octets — transitent par des canaux textuels comme JSON, XML, YAML, les en-têtes HTTP ou MIME SMTP, Base64 empêche la corruption des octets de contrôle (`0x00–0x1F`) et de poids fort (`0x80–0xFF`). Exécuté localement dans votre navigateur, cet outil préserve vos identifiants et clés privées hors de tout serveur distant.

## Mécanique binaire : quantum de 24 bits et bourrage modulo 3

Les ordinateurs stockent les octets sur 8 bits (256 valeurs), alors que l'alphabet Base64 code **6 bits par symbole** (`A–Z` pour `0–25`, `a–z` pour `26–51`, `0–9` pour `52–61`, plus deux symboles propres au profil pour `62` et `63`). Le plus petit commun multiple de 8 et 6 valant **24**, l'encodeur regroupe l'entrée par **blocs de 3 octets (24 bits)** puis découpe chaque quantum en **quatre sextets de 6 bits**.

L'encodage de la chaîne ASCII `Man` (3 octets) illustre un alignement sans bourrage :

| Étape | Décomposition binaire | Résultat |
| :--- | :--- | :--- |
| **1. Entrée ASCII** | `M`, `a`, `n` | Décimal `77`, `97`, `110` (`0x4D 0x61 0x6E`) |
| **2. Flux 8 bits** | `01001101` `01100001` `01101110` | 24 bits contigus |
| **3. Quatre sextets** | `010011` `010110` `000101` `101110` | Quatre groupes de 6 bits |
| **4. Indices décimaux** | `19`, `22`, `5`, `46` | Indexation `0–63` |
| **5. Sortie RFC 4648** | `T`, `W`, `F`, `u` | Chaîne finale : `TWFu` |

Si la taille d'entrée `n` en octets n'est pas multiple de 3, des bits nuls complètent le dernier sextet actif, et des symboles de bourrage (`=`) complètent le bloc de 4 caractères en Base64 standard :

- **`n mod 3 == 0`** : bloc complet de 24 bits donnant 4 caractères sans `=`.
- **`n mod 3 == 1`** : 1 octet résiduel (8 bits) + 4 zéros à droite = 2 caractères suivis de **`==`**.
- **`n mod 3 == 2`** : 2 octets résiduels (16 bits) + 2 zéros à droite = 3 caractères suivis de **`=`**.

Selon la **RFC 4648 section 3.5** (*Canonical Encoding*), les bits de remplissage doivent impérativement rester nuls afin qu'aucune paire de chaînes Base64 distinctes ne puisse se décoder vers les mêmes octets, évitant toute malléabilité de signatures. La longueur finale atteint `4 * ceil(n / 3)` octets avec bourrage et `ceil(4 * n / 3)` sans bourrage, soit un **surcoût de 33,33 %** avant compression gzip ou Brotli.

## Variantes RFC 4648 et profils protocolaires

Quatre profils normatifs coexistent selon l'alphabet terminal, le bourrage et la coupure de ligne :

| Variante | Norme | Index 62 / 63 | Bourrage `=` | Coupure de ligne | Usages principaux |
| :--- | :--- | :---: | :---: | :--- | :--- |
| **Standard** | RFC 4648 §4 | `+` `/` | Requis | Aucune | Data URI, HTTP Basic Auth, Secrets Kubernetes, JSON binaire |
| **Base64url** | RFC 4648 §5 | `-` `_` | Omis | Aucune | Segments JWT, OAuth 2.0 PKCE `code_challenge`, paramètres URL |
| **MIME** | RFC 2045 | `+` `/` | Requis | CRLF / 76 car. | Pièces jointes SMTP (`Content-Transfer-Encoding: base64`) |
| **PEM** | RFC 7468 | `+` `/` | Requis | LF / 64 car. | Certificats X.509 TLS, clés PKCS#8 et blocs SSH |

Au décodage, l'outil reconvertit `-` en `+` et `_` en `/`, nettoie les retours à la ligne MIME ou PEM, puis restaure tout `=` omis avant de reconstruire le flux UTF-8. En mode strict, `TextDecoder` signale toute séquence d'octets UTF-8 invalide au lieu de la masquer, prévenant la corruption silencieuse de clés, de certificats ou de fichiers binaires compressés lors du débogage d'une API REST ou d'un webhook entrant.

## Pièges d'implémentation : `btoa()` Unicode et sauts de ligne shell

Deux erreurs classiques perturbent les flux d'authentification OAuth, les manifestes Kubernetes et les pipelines d'intégration continue.

### 1. Échec Unicode de `window.btoa()` en JavaScript

La fonction navigateur `btoa()` mappe chaque unité UTF-16 sur un octet unique et lève `InvalidCharacterError` dès `U+0100` (`café ☕`, symbole `€`, idéogrammes CJK). Pour produire un jeton Base64url portable, un en-tête signé ou un défi OAuth 2.0 PKCE `S256` sans erreur d'encodage, sérialisez toujours votre chaîne en octets UTF-8 via `TextEncoder` avant la conversion binaire :

```javascript
function encoderBase64Url(texte) {
  const octets = new TextEncoder().encode(texte);
  let binaire = "";
  for (const octet of octets) binaire += String.fromCharCode(octet);
  return btoa(binaire)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
```

### 2. Octet `\n` parasite dans les commandes CLI et Kubernetes

Exécuter `echo "admin:secret" | base64` ajoute un `\n` (`0x0A`) final, produisant `YWRtaW46c2VjcmV0Cg==` au lieu de `YWRtaW46c2VjcmV0` et invalidant silencieusement vos en-têtes Basic Auth ou le champ `data` d'un `Secret` Kubernetes déployé en GitOps. Utilisez toujours `printf` sans retour final et l'option `-w 0` sous GNU coreutils pour éviter la coupure à 76 colonnes :

```bash
printf '%s' 'admin:secret' | base64 -w 0
# Sortie exacte : YWRtaW46c2VjcmV0
```

## Seuils des Data URI et frontières de sécurité

Déposer une image lit le fichier localement via `FileReader` et génère un **Data URI RFC 2397** (`data:image/png;base64,...`) prêt pour `<img src="...">` ou CSS `url(...)`. Utile sous **4 Ko** pour éviter une requête réseau sur une icône critique ou un petit pictogramme vectoriel, l'intégration pénalise au-delà par un gonflement de 33 % du poids brut, la perte du cache HTTP indépendant entre pages et un ralentissement de l'analyse CSSOM. Mesurez toujours le poids final des feuilles de style avant d'intégrer des vignettes, et utilisez [Image vers Base64](/fr/outils/image-to-base64) et [Base64 vers Image](/fr/outils/base64-to-image) pour les conversions dédiées.

Enfin, **Base64 n'est jamais un chiffrement** : toute chaîne se lit instantanément dans notre [décodeur Base64](/fr/outils/base64-decode). Pour auditer un jeton signé, ouvrez le [décodeur JWT](/fr/outils/jwt-decoder) ; pour échapper des paramètres d'adresse sans surcoût global, passez à l'[encodeur d'URL](/fr/outils/url-encoder) ; pour une intégrité cryptographique réelle, recourez au [générateur HMAC](/fr/outils/hmac-generator) ou au [générateur de Hash](/fr/outils/hash-generator).
