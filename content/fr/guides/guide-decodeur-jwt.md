---
title: "Comprendre les JWT (JSON Web Tokens) : Un Guide Complet"
description: "Découvrez comment les JWT sont structurés, comment les décoder en toute sécurité et pourquoi il ne faut jamais y stocker de données sensibles."
category: "Productivity & Utilities"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "jwt-decoder"
relatedType: "tool"
faqs:
  - question: "Que se passe-t-il lorsqu'un JWT expire et comment gérer le renouvellement ?"
    answer: "La charge utile d'un JWT contient généralement la revendication 'exp' (horodatage Unix en secondes UTC). Dès que l'horloge du serveur dépasse cette valeur, le jeton est rejeté avec un code HTTP 401. Pour éviter de déconnecter l'utilisateur brutalement, les architectures modernes associent un jeton d'accès à durée de vie courte (5 à 15 minutes) à un jeton de rafraîchissement (refresh token) stocké de manière sécurisée afin d'émettre un nouveau JWT."
  - question: "Faut-il stocker les JWT dans le localStorage ou dans des cookies HttpOnly ?"
    answer: "Pour une application web, le stockage dans un cookie doté des attributs HttpOnly, Secure et SameSite=Strict (ou Lax) est nettement préférable au localStorage. Tout script JavaScript injecté lors d'une faille XSS peut lire intégralement le localStorage et exfiltrer le jeton, alors qu'un cookie HttpOnly reste inaccessible au DOM tout en étant protégé contre le CSRF par l'attribut SameSite."
  - question: "Quelle est la différence entre un jeton JWS (signé) et un jeton JWE (chiffré) ?"
    answer: "Un JWS (JSON Web Signature, norme RFC 7515) comporte trois segments séparés par des points : son contenu est uniquement encodé en Base64Url et signé pour garantir l'intégrité, mais il reste lisible par quiconque l'intercepte. Un JWE (JSON Web Encryption, norme RFC 7516) comporte cinq segments et chiffre réellement la charge utile afin d'assurer la confidentialité des données."
  - question: "Pourquoi l'algorithme 'none' représente-t-il une vulnérabilité critique ?"
    answer: "La spécification RFC 7519 prévoit l'identifiant d'algorithme 'none' pour les jetons non signés. Si un serveur valide aveuglément l'en-tête fourni par le client sans imposer une liste blanche d'algorithmes, un attaquant peut modifier la charge utile (par exemple passer un rôle en administrateur), indiquer 'alg: none' et supprimer la signature pour usurper une identité."
  - question: "Est-il risqué de coller un JWT de production dans un décodeur en ligne classique ?"
    answer: "Oui. Un décodeur distant peut enregistrer les requêtes dans ses journaux serveur ou exposer un jeton encore actif, offrant ainsi un accès immédiat à votre session ou à votre API. De plus, un JWT contient souvent des données personnelles (identifiant, adresse électronique) soumises au RGPD. Il est donc impératif d'utiliser un outil fonctionnant 100 % côté client dans votre navigateur."
---

Un **JSON Web Token (JWT)**, défini par la norme **RFC 7519**, est un conteneur compact et autonome permettant de transmettre des données vérifiables entre deux systèmes au format JSON. Un JWT signé se présente sous la forme de trois segments séparés par des points (`en-tête.charge_utile.signature`), massivement adoptés pour l'authentification sans état (*stateless*) des API REST et le protocole OpenID Connect.

La règle fondamentale est qu'un JWT standard (**JWS**) est **signé, mais non chiffré** : son contenu est uniquement encodé en `Base64Url`, donc lisible par tout intermédiaire. La signature garantit l'intégrité et l'authenticité du jeton, jamais sa confidentialité. Pour inspecter vos jetons sans risque de fuite, utilisez notre [Outil Décodeur JWT](/fr/outils/jwt-decoder), dont l'exécution reste strictement locale dans votre navigateur.

## Anatomie technique et spécification RFC 7519 d'un JWT

Structurellement, un JWT signé résulte de deux encodages suivis d'une opération cryptographique :

```text
Entrée_Signature = Base64Url(UTF8(En-tête)) + "." + Base64Url(UTF8(Charge_utile))
Signature        = Algorithme(Entrée_Signature, Clé_Secrète_ou_Privée)
JWT_Complet      = Entrée_Signature + "." + Base64Url(Signature)
```

L'encodage `Base64Url` (RFC 4648) convertit chaque bloc de `3` octets en `4` caractères ASCII (surcoût de taille d'environ `33,3 %`), remplace `+` et `/` par `-` et `_`, et supprime le remplissage `=` afin d'assurer la compatibilité avec les URL et en-têtes HTTP.

### 1. L'en-tête (Header)

Le premier segment précise les métadonnées techniques : `typ` (`"JWT"`), `alg` (l'algorithme de signature) et souvent `kid` (*Key ID*) pour identifier la clé publique dans un annuaire JWKS (*JSON Web Key Set*). On distingue les algorithmes symétriques à secret partagé (`HS256`, `HS512`) et les schémas asymétriques à paire de clés privée/publique (`RS256`, `ES256`, `EdDSA`).

### 2. La charge utile (Payload) et les revendications

Le second segment transporte les **revendications** (*claims*). La RFC 7519 normalise sept champs enregistrés : `iss` (émetteur), `sub` (sujet), `aud` (destinataire), `exp` (expiration en secondes Unix UTC), `nbf` (entrée en vigueur), `iat` (date d'émission) et `jti` (identifiant unique anti-rejeu), complétés par des attributs applicatifs comme le rôle utilisateur.

### 3. La signature numérique

Le troisième segment scelle l'en-tête et la charge utile. Toute altération d'un seul caractère invalide immédiatement la signature lors du contrôle côté serveur.

## Exemple pratique étape par étape : décodage et vérification

Analysons ce JWT signé avec `HS256` et la clé de test `cle-secrete-exemple-256` (`201` caractères au total) :

```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c3ItODQyMSIsIm5vbSI6IkNhbWlsbGUgRHVwb250Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzk1NjUwMDAwLCJleHAiOjE3OTU2NTM2MDB9.FV1oMDGshWymWqczpj9pNN_izHT7jwrit_U3KSwGNho
```

1. **En-tête (`36` caractères)** : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9` correspond à `27` octets UTF-8 (`27 × 4 / 3 = 36`) et se décode en `{"alg":"HS256","typ":"JWT"}`.
2. **Charge utile (`120` caractères)** : ce segment représente `90` octets (`90 × 4 / 3 = 120`) et révèle `{"sub":"usr-8421","nom":"Camille Dupont","role":"admin","iat":1795650000,"exp":1795653600}`.
3. **Contrôle temporel** : `iat = 1795650000` correspond au `25 novembre 2026 à 23 h 40 UTC` et `exp = 1795653600` au `26 novembre 2026 à 00 h 40 UTC`. La durée de vie vaut `1795653600 − 1795650000 = 3 600` secondes (`60` minutes).
4. **Signature (`43` caractères)** : HMAC-SHA256 génère `256` bits (`32` octets), soit `⌈32 × 4 / 3⌉ = 43` caractères `Base64Url` (`FV1oMDGshWymWqczpj9pNN_izHT7jwrit_U3KSwGNho`). Le serveur recalcule cette empreinte sur les `157` premiers caractères (`36 + 1 + 120`) et la compare en temps constant.

## Comparatif des algorithmes de signature et formats

| Algorithme / Format | Cryptographie | Taille de signature | Distribution des clés | Usage recommandé |
| :--- | :--- | :--- | :--- | :--- |
| `HS256` | Symétrique (secret partagé) | `32` octets (`43` car.) | Clé identique | Services internes ou monolithes maîtrisés |
| `HS512` | Symétrique (secret partagé) | `64` octets (`86` car.) | Clé identique | Flux internes à forte exigence cryptographique |
| `RS256` | Asymétrique RSA (`≥ 2 048` bits) | `256` octets (`342` car.) | Clé publique JWKS | Écosystèmes OAuth 2.0 / OIDC hérités |
| `ES256` | Asymétrique ECDSA P-256 | `64` octets (`86` car.) | Clé publique JWKS | API modernes, mobiles et passerelles rapides |
| `EdDSA` | Asymétrique Ed25519 | `64` octets (`86` car.) | Clé publique JWKS | Systèmes critiques à haute performance |
| `JWE` (`A256GCM`) | Chiffrement authentifié (RFC 7516) | `5` segments chiffrés | Clé publique / symétrique | Transport de données confidentielles |

## Cas d'usage, erreurs critiques et conformité RGPD

Les JWT sont idéaux pour authentifier des appels d'API sans requête en base de données, fédérer des identités via SSO ou émettre des liens temporaires. Ils conviennent moins aux sessions exigeant une révocation immédiate, car un jeton reste valide jusqu'à son `exp` sans liste d'exclusion côté serveur.

Évitez impérativement ces trois pièges recensés par l'OWASP :

* **Exposer des secrets** : n'inscrivez jamais de mots de passe, clés API ou numéros bancaires dans un JWS.
* **Accepter l'algorithme du client** : imposez une liste blanche côté serveur (`ES256` ou `RS256`) pour bloquer l'attaque `alg: "none"` et la confusion de clé publique (`RS256` détourné en `HS256`).
* **Gonfler la charge utile** : trop de permissions font dépasser la limite de `4 ko` des cookies ou le plafond de `8 ko` des en-têtes HTTP sur les mandataires inverses (erreur `431`).

Sur le plan réglementaire, un identifiant `sub`, un nom ou un courriel rendent le JWT qualifiable de **donnée personnelle au sens du RGPD**. Coller un jeton actif sur un site tiers expose vos sessions et enfreint le principe de minimisation. Notre [Outil Décodeur JWT](/fr/outils/jwt-decoder) adopte une **architecture zéro-nuage** : tout le décodage s'effectue exclusivement dans la mémoire vive de votre navigateur, sans transmission réseau.
