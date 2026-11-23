---
metaTitle: "Décodeur JWT en Ligne | Inspecteur JSON Web Token RFC 7519"
metaDescription: "Décodez et auditez vos JSON Web Tokens (JWT) côté client : inspectez Header, Payload, claims exp/iat/nbf et algorithmes HS256, RS256 ou ES256."
metaKeywords: "décodeur jwt, décoder jwt, analyseur json web token, jwt parser, inspecteur jwt, rfc 7519, jwt payload, hs256 rs256 es256, claims exp iat nbf"
title: "Décodeur JWT"
shortDescription: "Inspectez localement l'en-tête JOSE, le payload JSON, les horodatages d'expiration (exp, iat, nbf) et l'algorithme cryptographique de vos JSON Web Tokens (RFC 7519)."
faqs:
  - question: "Peut-on coller un jeton JWT de production dans ce décodeur sans risque de fuite ?"
    answer: "Oui. Le décodage Base64url, l'analyse JSON et la conversion des dates Unix s'exécutent intégralement dans la mémoire locale de votre navigateur en JavaScript. Le jeton n'est jamais envoyé vers un serveur distant ni enregistré dans un journal réseau ; par précaution, évitez néanmoins de partager des captures d'écran contenant des jetons actifs."
  - question: "Pourquoi n'importe qui peut-il lire le contenu d'un JWT sans posséder la clé secrète ?"
    answer: "Un JWT signé standard (JWS, RFC 7515) assure l'intégrité et l'authenticité des données, jamais leur confidentialité. L'en-tête et le payload sont simplement encodés en Base64url et donc lisibles par tout intermédiaire. Pour masquer le contenu lui-même, il faut recourir à un jeton chiffré JWE (RFC 7516) composé de cinq segments."
  - question: "Quelle différence existe-t-il entre HS256 et RS256 ou ES256 ?"
    answer: "HS256 est un algorithme symétrique (HMAC-SHA256) : le même secret partagé sert à signer et à vérifier le jeton, ce qui complique le déploiement dans une architecture microservices. RS256 (RSA) et ES256 (ECDSA sur courbe P-256) sont asymétriques : seul le serveur d'identité détient la clé privée, tandis que chaque API vérifie la signature avec la clé publique publiée via JWKS."
  - question: "En quoi consiste la faille de l'algorithme alg: none et la confusion d'algorithme ?"
    answer: "L'attaque alg: none consiste à modifier l'en-tête en indiquant aucune signature et à vider le troisième segment ; un backend mal configuré peut accepter un payload falsifié. La confusion d'algorithme pousse un serveur attendant RS256 à vérifier un jeton HS256 en utilisant la clé publique PEM comme secret HMAC. La parade consiste à imposer côté serveur une liste blanche stricte d'algorithmes attendus."
  - question: "Pourquoi mon API renvoie-t-elle 401 Unauthorized alors que le claim exp semble encore valide ?"
    answer: "Plusieurs causes techniques expliquent ce rejet : un décalage d'horloge (clock skew) sur le claim nbf (Not Before) rendant le jeton temporairement invalide, une discordance sur les claims aud (Audience) ou iss (Émetteur), une rotation de clé où l'identifiant kid n'est plus présent dans le cache JWKS, ou un secret mal encodé."
features:
  - "Séparation et décodage Base64url instantanés des segments Header, Payload et Signature (RFC 7519)"
  - "Coloration syntaxique JSON structurée avec repérage immédiat des claims enregistrés et personnalisés"
  - "Conversion automatique des horodatages NumericDate (exp, iat, nbf) en heure locale et UTC avec statut actif/expiré"
  - "Détection des algorithmes JWA (HS256, RS256, PS256, ES256, EdDSA) et identification de la clé kid"
  - "Alertes de sécurité automatiques en cas d'algorithme 'none', de jeton expiré ou d'absence de claim exp"
  - "Exécution 100 % côté client respectant la confidentialité de vos jetons OAuth 2.0 et OpenID Connect"
useCases:
  - "Déboguer un flux d'authentification OAuth 2.0 ou OpenID Connect (Auth0, Keycloak, Cognito, Entra ID)"
  - "Vérifier les rôles (RBAC), portées (scope) et identifiants locataire (tenant_id) injectés dans un Access Token"
  - "Diagnostiquer une erreur 401 liée à une expiration prématurée (exp) ou un décalage horaire sur nbf"
  - "Contrôler l'identifiant de clé kid dans l'en-tête JOSE lors d'une rotation de certificats JWKS"
  - "Auditer la présence d'informations sensibles exposées par erreur dans un payload non chiffré"
  - "Valider les claims iss et aud lors de l'interconnexion d'une passerelle API et de microservices internes"
howToSteps:
  - "Récupérez votre chaîne JWT (trois segments séparés par deux points) depuis un en-tête Authorization Bearer ou un cookie."
  - "Supprimez éventuellement le préfixe 'Bearer ' puis collez le jeton complet dans la zone de saisie."
  - "Consultez le bloc Header décodé pour vérifier le type (typ), l'algorithme (alg) et l'identifiant de clé (kid)."
  - "Inspectez le bloc Payload afin de contrôler les claims standards (sub, iss, aud) et vos attributs métier."
  - "Vérifiez le panneau de validité temporelle traduisant iat, nbf et exp en dates lisibles et durée restante."
  - "Repérez les éventuels avertissements de sécurité (algorithme faible, absence d'expiration) avant déploiement."
---

Le **JSON Web Token (JWT)**, normalisé par la spécification **RFC 7519**, est un format compact et autonome destiné à transmettre des revendications (*claims*) vérifiables entre deux parties sous la forme d'objets JSON. Omniprésent dans les architectures sans état (*stateless*), les API REST, **OAuth 2.0** et **OpenID Connect (OIDC)**, un JWT s'inscrit dans l'écosystème **JOSE** qui regroupe la signature (**JWS**, RFC 7515), le chiffrement (**JWE**, RFC 7516), la représentation des clés (**JWK**, RFC 7517) et le registre des algorithmes (**JWA**, RFC 7518).

## Structure compacte d'un jeton JWS en trois segments

Dans sa forme signée la plus répandue (JWS Compact Serialization), un JWT concatène trois chaînes encodées en **Base64url** (RFC 4648 section 5, sans bourrage `=`) séparées par des points :

```text
Base64Url(Header) . Base64Url(Payload) . Base64Url(Signature)
```

Voici un exemple concret des deux premiers blocs une fois décodés (opération que vous pouvez également détailler octet par octet via notre [décodeur Base64](/fr/outils/base64-decode)) :

```json
// 1. En-tête JOSE (Header)
{
  "alg": "ES256",
  "typ": "at+jwt",
  "kid": "key-2026-11-eu"
}

// 2. Charge utile (Payload / Claims)
{
  "iss": "https://auth.exemple.fr",
  "sub": "usr_849201",
  "aud": "https://api.exemple.fr/v2",
  "iat": 1795420800,
  "nbf": 1795420800,
  "exp": 1795421700,
  "jti": "9c2e8f14-7b6a-4d1e-a054-1f2c3d4e5f60",
  "scope": "orders:read profile"
}
```

La **signature** cryptographique est calculée sur la concaténation ASCII exacte `Base64Url(Header) + "." + Base64Url(Payload)`. Toute altération d'un seul caractère dans le payload ou dans l'en-tête (par exemple modifier `scope` ou prolonger `exp`) invalide immédiatement la signature lors du contrôle côté serveur.

### Taxonomie des revendications (*claims*) et horodatages `NumericDate`

La RFC 7519 classe les clés du payload en trois catégories : les **claims enregistrés** standardisés (`iss` émetteur, `sub` sujet, `aud` audience cible, `exp` expiration, `nbf` non valide avant, `iat` émis à, `jti` identifiant unique anti-rejeu), les **claims publics** définis pour éviter les collisions de noms, et les **claims privés** propres à votre application (`tenant_id`, `roles`). Les valeurs temporelles `exp`, `nbf` et `iat` utilisent le format **`NumericDate`** : un entier représentant le nombre de secondes écoulées depuis l'époque Unix (`1970-01-01T00:00:00Z`), et non des millisecondes. Pour explorer un payload imbriqué particulièrement volumineux, vous pouvez aussi l'exporter vers notre [formateur JSON](/fr/outils/json-formatter).

## JWS signé versus JWE chiffré : choisir le bon profil JOSE

Une confusion fréquente consiste à supposer qu'un JWT protège la confidentialité de ses champs. Un **JWS** (3 segments) signe les données pour empêcher toute falsification, mais laisse son contenu entièrement lisible après simple décodage Base64url. Si un jeton doit transporter des données personnelles réglementées ou des attributs métier confidentiels sur un réseau non maîtrisé, il convient d'utiliser un **JWE** (*JSON Web Encryption*, RFC 7516) composé de **cinq segments** (`ProtectedHeader.EncryptedKey.IV.Ciphertext.AuthTag`) reposant sur un chiffrement authentifié tel que `A256GCM`.

## Comparatif des algorithmes de signature JWA (RFC 7518)

Le choix de l'algorithme déclaré dans le champ `alg` détermine la gestion des clés, la taille du jeton et les performances de vérification :

| Algorithme | Famille cryptographique | Type de clé | Taille de signature | Forces et cas d'usage recommandés |
| :--- | :--- | :--- | :--- | :--- |
| **`HS256` / `HS512`** | HMAC + SHA-2 | Symétrique (secret partagé) | 32 ou 64 octets | Très rapide ; réservé aux services partageant un secret de 256 bits minimum |
| **`RS256`** | RSA PKCS#1 v1.5 + SHA-256 | Asymétrique (RSA ≥ 2048 bits) | 256 octets | Standard historique OIDC/JWKS ; compatible avec tous les SDK |
| **`PS256`** | RSA-PSS + SHA-256 | Asymétrique (RSA ≥ 2048 bits) | 256 octets | Rembourrage probabiliste plus robuste que PKCS#1 v1.5 |
| **`ES256`** | ECDSA courbe P-256 + SHA-256 | Asymétrique (elliptique) | 64 octets | Jetons compacts et vérification rapide ; idéal pour API mobiles et modernes |
| **`EdDSA`** | Ed25519 (RFC 8037) | Asymétrique (courbe Edwards) | 64 octets | Immunité contre les failles de nonce aléatoire, haute sécurité moderne |
| **`none`** | Aucune signature | Aucune | 0 octet | **Dangereux** : à rejeter impérativement dans toute bibliothèque de vérification |

Pour expérimenter la génération de signatures HMAC-SHA256 ou le calcul d'empreintes, consultez notre [générateur HMAC](/fr/outils/hmac-generator) et notre [générateur de Hash](/fr/outils/hash-generator).

## Vulnérabilités classiques et dépannage en production

### 1. Confusion d'algorithme, champ `kid` et confusion ID Token / Access Token

Ne laissez jamais la bibliothèque serveur faire confiance aveuglément au champ `alg` reçu dans l'en-tête du jeton. Sans liste blanche explicite côté vérificateur (par exemple `algorithms: ['ES256']`), un attaquant peut forcer `alg: "none"` ou basculer un serveur configuré en `RS256` vers `HS256` en signant son jeton falsifié avec la clé publique PEM accessible sur le serveur. De même, le champ `kid` (*Key ID*) doit être recherché dans un dictionnaire JWKS mis en cache et **jamais** concaténé dans un chemin de fichier ou une requête SQL. Enfin, vérifiez systématiquement les claims `iss`, `aud` ainsi que `typ: "at+jwt"` (RFC 9068) afin d'empêcher qu'un ID Token OIDC destiné au client front-end ne soit accepté comme Access Token par une API métier.

### 2. Décalage d'horloge (`clock skew`) et rotation de clés JWKS

Dans les clusters distribués Kubernetes ou multi-régions, un écart de quelques secondes entre l'horloge NTP du fournisseur d'identité et celle de votre API suffit à déclencher un rejet `401 Unauthorized` sur le claim `nbf` (jeton « pas encore valide »). Configurez une tolérance de dérive modérée (`clockTolerance` de 30 à 60 secondes) et assurez-vous que votre validateur recharge l'endpoint `/.well-known/jwks.json` (avec limitation de débit) lorsqu'un nouvel identifiant `kid` apparaît après une rotation planifiée.

### 3. Stockage navigateur, durée de vie et révocation (`jti`)

Un JWT étant autonome, il reste techniquement valide jusqu'à son horodatage `exp` même après une déconnexion ou un changement de mot de passe. Privilégiez donc des jetons d'accès courts (5 à 15 minutes) couplés à un **Refresh Token** rotatif stocké dans un cookie `HttpOnly`, `Secure` et `SameSite=Strict` — vérifiable dans notre [analyseur d'en-têtes HTTP](/fr/outils/http-header-checker) — et, pour les opérations critiques, maintenez une liste de révocation temporaire en cache Redis indexée sur l'identifiant unique `jti` jusqu'à expiration naturelle du jeton.
