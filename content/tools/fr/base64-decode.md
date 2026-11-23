---
metaTitle: "Décodeur Base64 en Ligne | UTF-8, URL-Safe & Aperçu Image"
metaDescription: "Décodez instantanément toute chaîne Base64 ou Base64url en texte UTF-8, JSON, image ou fichier binaire. Détection MIME et exécution 100 % locale."
metaKeywords: "décoder base64, décodeur base64, base64 en texte, base64 en image, décodeur chaîne base64, url safe base64 décodeur, base64 utf-8, base64 en json, rfc 4648"
title: "Décodeur Base64"
shortDescription: "Convertissez instantanément vos chaînes Base64 et Base64url en texte UTF-8, objets JSON, images prévisualisables ou fichiers binaires téléchargeables, 100 % dans votre navigateur."
faqs:
  - question: "Le décodage Base64 nécessite-t-il une clé secrète ou un mot de passe ?"
    answer: "Non. Base64 est un encodage de transfert standardisé par la RFC 4648 et non un algorithme de chiffrement. N'importe quel programme ou utilisateur possédant la chaîne peut restaurer les octets d'origine sans secret ; il ne faut donc jamais compter sur Base64 pour protéger des identifiants ou des données confidentielles."
  - question: "Pourquoi la fonction JavaScript atob() corrompt-elle les accents français et les emojis ?"
    answer: "La fonction historique window.atob() suppose une correspondance stricte d'un caractère par octet (encodage Latin-1 / ISO-8859-1). Dès que le texte d'origine contient des séquences UTF-8 multi-octets (comme « é », « € » ou un emoji), atob() restitue des caractères garbled ; il faut décoder vers un Uint8Array puis passer par TextDecoder('utf-8')."
  - question: "Quelle différence sépare le Base64 standard du Base64 URL-Safe (Base64url) ?"
    answer: "Le Base64 standard utilise les caractères '+' et '/' ainsi que le bourrage '=' en fin de chaîne, qui possèdent une signification réservée dans les URL et les cookies. La variante Base64url (RFC 4648 section 5), employée notamment dans les JWT et OAuth 2.0, remplace '+' par '-', '/' par '_' et rend le bourrage '=' facultatif."
  - question: "Pourquoi le décodeur signale-t-il une chaîne Base64 invalide ou mal formée ?"
    answer: "Les causes les plus courantes sont une chaîne tronquée (longueur non divisible par 4 avec un reste de 1 caractère, mathématiquement impossible), la présence de caractères hors alphabet, un mélange entre variantes standard et URL-Safe, ou des signes '+' transformés en espaces dans un paramètre d'URL non échappé."
  - question: "Comment l'outil reconnaît-il automatiquement si un Base64 contient une image ou un PDF ?"
    answer: "Lorsqu'un préfixe Data URI (data:image/png;base64,...) est absent, le décodeur inspecte les premiers octets bruts du résultat — les magic bytes — comme 89 50 4E 47 pour PNG, FF D8 FF pour JPEG ou 25 50 44 46 (%PDF) pour un document PDF afin d'afficher un aperçu ou de proposer l'extension adéquate."
features:
  - "Décodage en temps réel des alphabets RFC 4648 standard, Base64url et blocs MIME multi-lignes"
  - "Restitution fidèle de l'UTF-8 complet (accents, scripts internationaux, emojis) via TextDecoder"
  - "Nettoyage automatique des espaces, retours à la ligne CRLF/LF et rétablissement du bourrage '='"
  - "Reconnaissance des Data URI (RFC 2397) et détection des magic bytes pour prévisualiser PNG, JPEG, WebP et SVG"
  - "Export binaire en un clic pour récupérer des documents PDF, archives ZIP ou certificats DER décodés"
  - "Exécution 100 % côté client sans aucun envoi de jetons, clés ou pièces jointes vers un serveur"
useCases:
  - "Inspecter une charge utile JSON ou XML encapsulée en Base64 dans un webhook ou un journal d'API"
  - "Extraire et enregistrer une icône ou une photo intégrée en Data URI dans une feuille CSS ou un e-mail HTML"
  - "Décoder manuellement le segment d'en-tête ou de revendications d'un jeton OAuth 2.0 ou SAML"
  - "Vérifier le contenu brut d'un certificat PEM, d'une clé publique SSH ou d'une pièce jointe MIME SMTP"
  - "Déboguer des paramètres d'état (state) encodés en Base64url lors d'un flux de redirection OpenID Connect"
  - "Contrôler l'encodage d'un en-tête HTTP Basic Authorization avant son intégration dans un client REST"
howToSteps:
  - "Collez votre chaîne Base64 brute, votre bloc PEM ou votre Data URI complet dans la zone d'entrée."
  - "Activez le mode URL-Safe si l'entrée provient d'une URL, d'un cookie ou d'un jeton JWT (caractères '-' et '_')."
  - "Laissez le nettoyeur automatique ignorer les retours à la ligne MIME et recalculer le bourrage '=' manquant."
  - "Consultez immédiatement le texte UTF-8 décodé dans le panneau de sortie ou l'aperçu visuel pour une image."
  - "Pour les payloads binaires (PDF, ZIP, polices WOFF2), cliquez sur Télécharger afin d'enregistrer le fichier natif."
  - "Copiez le résultat décodé ou transférez-le vers un formateur JSON pour une inspection structurée."
---

Le décodage **Base64** reconvertit une représentation textuelle composée uniquement de caractères ASCII imprimables vers sa séquence exacte d'octets d'origine — texte UTF-8, objet JSON, image matricielle ou archive binaire. Définie par la norme **RFC 4648**, cette transformation strictement réversible et sans perte permet aux protocoles conçus pour le texte (SMTP, HTTP, JSON, XML, CSS) de transporter n'importe quelle donnée binaire sans risque d'altération par des passerelles réseau ou des analyseurs sensibles aux octets de contrôle.

## Mécanique binaire du décodage : de 4 symboles vers 3 octets

Base64 s'appuie sur un alphabet indexé de 64 symboles (de `0` à `63`), chaque caractère codant précisément **6 bits** d'information (`2^6 = 64`). Lors du décodage, l'algorithme consomme la chaîne par groupes de **4 caractères**, ce qui représente `4 × 6 = 24 bits`. Ce bloc de 24 bits est ensuite redécoupé en **3 octets** standards de 8 bits (`24 / 8 = 3`), ce qui explique également le surcoût de taille constant de l'encodage Base64 : environ **+33 %** (ratio exact `4/3`), avant éventuels retours à la ligne.

Lorsque la longueur initiale des octets n'était pas un multiple de 3, l'encodeur ajoute des caractères de bourrage (*padding*) `=` à la fin du dernier groupe :

- **Aucun `=`** : le dernier quartet produit 3 octets complets.
- **Un seul `=`** (3 symboles utiles, soit 18 bits) : les 2 bits de poids faible nuls sont écartés pour reconstituer exactement **2 octets** (16 bits).
- **Deux `==`** (2 symboles utiles, soit 12 bits) : les 4 bits excédentaires sont ignorés pour reconstituer **1 octet** (8 bits).
- Un groupe résiduel d'un seul caractère (6 bits) est toujours **invalide** car il ne permet pas de former un octet complet.

## Variantes Base64 et spécifications RFC

Selon le protocole source, l'alphabet, le remplissage et les sauts de ligne diffèrent sensiblement. Le tableau ci-dessous détaille les quatre variantes les plus rencontrées en production :

| Variante | Norme de référence | Index 62 et 63 | Bourrage `=` | Sauts de ligne | Usage principal |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Base64 Standard** | RFC 4648 §4 | `+` et `/` | Requis (multiple de 4) | Aucun | API JSON, Data URI, HTTP Basic Auth |
| **Base64url (URL-Safe)** | RFC 4648 §5 | `-` et `_` | Souvent omis | Aucun | JWT (RFC 7519), OAuth 2.0, PKCE, URL |
| **Base64 MIME** | RFC 2045 | `+` et `/` | Requis | CRLF tous les 76 car. | Pièces jointes e-mail (SMTP / IMAP) |
| **Base64 PEM** | RFC 7468 | `+` et `/` | Requis | LF/CRLF tous les 64 car. | Certificats X.509, clés RSA/ECDSA |

Si vous devez effectuer l'opération inverse ou manipuler un média dédié, vous pouvez basculer vers notre [encodeur Base64](/fr/outils/base64-encode), notre convertisseur [Base64 vers image](/fr/outils/base64-to-image) ou l'outil [Image vers Base64](/fr/outils/image-to-base64).

## Décodage UTF-8 robuste et détection des *magic bytes*

En JavaScript côté navigateur, l'erreur la plus répandue consiste à appeler directement `atob(str)` sur un Base64 encodant du texte UTF-8. L'API historique `atob()` retourne une chaîne binaire où chaque unité de code représente un octet brut ; le caractère `é` (encodé en UTF-8 par `0xC3 0xA9`) apparaît alors sous la forme corrompue `Ã©`. L'implémentation moderne convertit d'abord la variante `base64url`, rétablit le bourrage, remplit un tableau typé `Uint8Array`, puis délègue la reconstruction Unicode à `TextDecoder` :

```javascript
function decodeBase64Utf8(input) {
  // Normaliser Base64url et supprimer les retours à la ligne MIME
  let normalized = input.replace(/\s+/g, '').replace(/-/g, '+').replace(/_/g, '/');
  const remainder = normalized.length % 4;
  if (remainder === 1) throw new Error('Longueur Base64 invalide (modulo 4 = 1).');
  if (remainder > 0) normalized += '='.repeat(4 - remainder);

  const binary = atob(normalized);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder('utf-8', { fatal: false }).decode(bytes);
}
```

Lorsque les octets décodés ne forment pas du texte UTF-8 mais un contenu binaire, l'inspection des **octets magiques** (*magic bytes*) en tête du flux identifie immédiatement le format réel même sans préfixe Data URI (RFC 2397) :

- **PNG** : `89 50 4E 47 0D 0A 1A 0A` (débute typiquement en Base64 par `iVBORw0KGgo`)
- **JPEG** : `FF D8 FF` (débute en Base64 par `/9j/`)
- **GIF** : `47 49 46 38` (`R0lGOD`)
- **PDF** : `25 50 44 46` (`JVBERi0`, correspondant à `%PDF-`)
- **ZIP / DOCX / XLSX** : `50 4B 03 04` (`UEsDB`)

## Data URI (RFC 2397) et arbitrages de performance web

Un **Data URI** suit la syntaxe normalisée `data:[<mediatype>][;base64],<données>` (par exemple `data:image/webp;base64,UklGR...`). S'il évite une requête HTTP distincte pour de très petites icônes ou des vignettes floutées (*LQIP*), l'intégration massive de médias Base64 dans une feuille CSS ou un document HTML alourdit la charge utile initiale de 33 %, bloque le rendu critique (*First Contentful Paint*) et empêche le navigateur de mettre chaque image en cache indépendamment entre deux pages. Pour auditer le type réel d'un fichier extrait, associez le décodage à notre [vérificateur de type MIME](/fr/outils/mime-type-checker).

## Scénarios de dépannage courants en intégration API

### Signes `+` convertis en espaces dans une requête GET

Lorsqu'une chaîne Base64 standard transite non échappée dans la chaîne de requête d'une URL (`?token=ab+cd==`), les serveurs web appliquant `application/x-www-form-urlencoded` interprètent `+` comme un espace (`0x20`), ce qui casse le décodage. Privilégiez toujours l'encodage **Base64url** pour les paramètres d'URL ou vérifiez l'échappement préalable avec notre [décodeur d'URL](/fr/outils/url-decoder).

### Inspection de payloads JWT et JSON imbriqués

Dans un flux OAuth ou OpenID Connect, décoder le deuxième segment d'un jeton produit un document JSON compact souvent difficile à lire sur une ligne. Pour vérifier simultanément l'en-tête, les horodatages d'expiration (`exp`, `nbf`) et l'algorithme de signature, passez directement par le [décodeur JWT](/fr/outils/jwt-decoder), ou indentez la structure obtenue grâce au [formateur JSON](/fr/outils/json-formatter). N'oubliez jamais que la lisibilité immédiate de tout payload Base64 interdit d'y stocker des mots de passe, clés privées ou numéros bancaires sans chiffrement préalable (AES-GCM ou JWE).
