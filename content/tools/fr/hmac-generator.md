---
metaTitle: "Générateur HMAC en Ligne — SHA-256, SHA-512, SHA-1 & MD5"
metaDescription: "Générez et vérifiez des signatures HMAC (RFC 2104) en SHA-256, SHA-512, SHA-1 ou MD5 dans votre navigateur via Web Crypto API pour API et webhooks."
metaKeywords: "générateur hmac, hmac sha256, hmac sha512, code d'authentification de message, signature webhook, rfc 2104, vérificateur hmac, signature api, hmac md5, web crypto api"
title: "Générateur HMAC"
shortDescription: "Générez et vérifiez localement des codes d'authentification HMAC (RFC 2104) en SHA-256, SHA-512, SHA-1 et MD5 pour vos webhooks, API et fichiers via l'API Web Crypto."
faqs:
  - question: "Pourquoi HMAC est-il plus sûr qu'un simple hachage SHA-256(secret + message) ?"
    answer: "Une concaténation naïve avec une fonction Merkle-Damgård (MD5, SHA-1, SHA-256, SHA-512) expose à une attaque par extension de longueur : un attaquant qui connaît l'empreinte et la taille du message peut ajouter des octets arbitraires et forger un condensat valide sans posséder la clé. La construction imbriquée à deux passes de la RFC 2104, combinée aux masques XOR ipad et opad, neutralise totalement cette faille."
  - question: "Mes clés secrètes ou charges utiles de webhooks sont-elles envoyées sur un serveur ?"
    answer: "Non. Toutes les opérations s'exécutent exclusivement dans la mémoire de votre navigateur. HMAC-SHA256, HMAC-SHA512 et HMAC-SHA1 s'appuient sur l'API native window.crypto.subtle.sign(), tandis que HMAC-MD5 et les fichiers dépassant 20 Mo sont traités localement en flux par blocs de 2 Mo sans aucune requête réseau sortante."
  - question: "Quelle longueur de clé secrète recommandez-vous pour signer en HMAC ?"
    answer: "La norme NIST SP 800-107 recommande une clé cryptographiquement aléatoire d'au moins la taille du condensat de sortie : 32 octets (256 bits) minimum pour HMAC-SHA256 et 64 octets (512 bits) pour HMAC-SHA512. Les clés plus longues que la taille de bloc interne (64 ou 128 octets) sont pré-hachées par la RFC 2104 et n'apportent aucune entropie supplémentaire."
  - question: "Pourquoi la vérification HMAC de mon webhook échoue-t-elle avec Express, Next.js ou Fastify ?"
    answer: "La cause la plus fréquente consiste à signer un objet JSON re-sérialisé via JSON.stringify(req.body) au lieu du tampon binaire brut reçu sur le réseau. Un seul espace modifié, un caractère échappé différent ou un réordonnancement de clés JSON invalide irrémédiablement la signature HMAC."
  - question: "Pourquoi la comparaison des signatures côté serveur doit-elle s'effectuer en temps constant ?"
    answer: "Les opérateurs d'égalité classiques (=== ou ==) interrompent la comparaison dès le premier octet divergent, créant des écarts de latence mesurables à la microseconde qui permettent de forger un HMAC octet par octet. En production, utilisez toujours crypto.timingSafeEqual() en Node.js ou hmac.compare_digest() en Python."
features:
  - "Signature et vérification conformes RFC 2104 pour HMAC-SHA256, HMAC-SHA512, HMAC-SHA1 et HMAC-MD5"
  - "Exécution native via Web Crypto API (SubtleCrypto) avec streaming local par blocs de 2 Mo pour les fichiers supérieurs à 20 Mo"
  - "Générateur de clés secrètes CSPRNG intégré basé sur window.crypto.getRandomValues() produisant des clés de 256 bits"
  - "Champ de comparaison instantanée pour contrôler les en-têtes de webhooks entrants et les jetons d'authentification API"
  - "Masquage de la clé secrète, bascule hexadécimale majuscules/minuscules, copie automatique et liens de test partageables"
  - "Extraits de code prêts pour la production couvrant les webhooks, AWS Signature V4, les JWT HS256 et Express"
useCases:
  - "Débogage et validation des signatures de webhooks entrants émis par Stripe, GitHub, Shopify, Slack ou Twilio"
  - "Signature de requêtes API REST canoniques, de chaînes de requête et d'en-têtes AWS Signature Version 4"
  - "Vérification de signatures symétriques de JSON Web Tokens (JWT) en HS256 et HS512 lors d'audits d'authentification"
  - "Génération d'empreintes authentifiées infalsifiables pour des archives locales et des files de messages inter-services"
  - "Création locale de secrets symétriques à haute entropie (256 bits) sans transit par un service externe"
  - "Tests de rétrocompatibilité pour les systèmes hérités reposant sur HMAC-SHA1 (OAuth 1.0a, TOTP RFC 6238) ou HMAC-MD5"
howToSteps:
  - "Sélectionnez l'algorithme cible (HMAC-SHA256, HMAC-SHA512, HMAC-SHA1 ou HMAC-MD5) dans la barre d'algorithmes."
  - "Saisissez votre clé secrète partagée ou cliquez sur le générateur CSPRNG pour créer une clé hexadécimale aléatoire de 32 octets."
  - "Collez la charge utile brute dans l'onglet Texte ou basculez vers l'onglet Fichier pour signer un binaire local."
  - "Ajustez si besoin l'affichage hexadécimal (minuscules ou majuscules), le masquage de la clé ou la copie automatique."
  - "Copiez le condensat HMAC généré en temps réel ou récupérez l'extrait de code adapté à votre backend."
  - "Collez une signature attendue dans le vérificateur intégré pour confirmer instantanément la validité cryptographique."
---

Une empreinte sans clé telle que [SHA-256](/fr/outils/sha256-generator) ou un [générateur de hachage](/fr/outils/hash-generator) classique détecte les altérations accidentelles, mais n'empêche aucun intermédiaire de modifier un message puis de recalculer un condensat valide. Le **HMAC (Hash-based Message Authentication Code)**, défini par la **RFC 2104** et **FIPS PUB 198-1**, assure simultanément l'intégrité des données et l'authentification de l'émetteur en liant le hachage à une clé secrète symétrique. Sans ce secret partagé, impossible de forger un webhook HTTP, une requête API signée ou un jeton JWT symétrique (`HS256`/`HS512`) pour Stripe, GitHub, Shopify, Slack ou AWS Signature Version 4.

## Construction RFC 2104 et immunité à l'extension de longueur

Certains prototypes signent encore un message via `SHA-256(secret || message)`. Sur les fonctions **Merkle-Damgård** (MD5, SHA-1, SHA-256, SHA-512), cette construction est vulnérable aux **attaques par extension de longueur** : le condensat final exposant l'état interne de compression, un attaquant connaissant l'empreinte et la taille approximative du message peut reprendre le calcul, injecter `&role=admin` et forger un hachage valide sans connaître le secret.

La RFC 2104 neutralise cette faille grâce à deux passes imbriquées et deux constantes de bourrage fixes : `ipad` (`0x36` répété `B` fois) et `opad` (`0x5c` répété `B` fois), `B` étant la taille de bloc interne en octets :

```text
HMAC(K, m) = H((K' XOR opad) || H((K' XOR ipad) || m))
```

Avant le `XOR`, la clé `K` est normalisée exactement à `B` octets pour former `K'` :

- Si `len(K) > B`, on calcule `K' = H(K)` puis on complète à droite avec `0x00` jusqu'à `B` octets.
- Si `len(K) < B`, on complète directement `K` à droite avec `0x00` jusqu'à `B` octets.
- Si `len(K) == B`, on pose directement `K' = K`.

La sortie interne étant aussitôt encapsulée dans la passe externe liée à la clé, l'état interne en fin de message reste inaccessible. La sécurité du HMAC repose sur la propriété de **fonction pseudo-aléatoire (PRF)** de la compression plutôt que sur la résistance stricte aux collisions, expliquant pourquoi `HMAC-SHA1` et `HMAC-MD5` résistent encore à la récupération de clé malgré les collisions de MD5 et SHA-1 bruts. Les nouveaux systèmes doivent toutefois imposer `HMAC-SHA256` ou `HMAC-SHA512`.

## Variantes HMAC et entropie recommandée

Le choix de la variante dépend de l'interopérabilité protocolaire et de l'architecture CPU. `HMAC-SHA512` double la taille de bloc à 128 octets et manipule des mots de 64 bits, offrant souvent un débit supérieur sur serveurs x86-64 et ARM64.

| Algorithme | Condensat | Hex | Bloc (`B`) | Clé min. (NIST SP 800-107) | Statut | Déploiements typiques |
| :--- | :---: | :---: | :---: | :---: | :--- | :--- |
| **HMAC-SHA256** | 256 bits | 64 | 64 octets | 32 octets | Standard recommandé | GitHub `X-Hub-Signature-256`, Stripe, Shopify, AWS SigV4, JWT `HS256` |
| **HMAC-SHA512** | 512 bits | 128 | 128 octets | 64 octets | Haute assurance | JWT `HS512`, API d'échanges financiers, RPC internes critiques |
| **HMAC-SHA1** | 160 bits | 40 | 64 octets | 20 octets | Rétrocompatibilité | OAuth 1.0a, HOTP/TOTP (RFC 4226 / 6238), anciens webhooks |
| **HMAC-MD5** | 128 bits | 32 | 64 octets | 16 octets | Obsolète | CRAM-MD5 hérité, anciens services SOAP |

Produisez toujours au moins 32 octets aléatoires via un CSPRNG — avec le générateur `window.crypto.getRandomValues()` intégré ou notre [générateur de chaînes aléatoires](/fr/outils/random-string-generator).

## Vérification en production, anti-rejeu et rotation de clés

Cet outil signe textes et fichiers jusqu'à 20 Mo localement via `window.crypto.subtle.importKey` et `crypto.subtle.sign` (avec bascule automatique vers un flux par tranches de 2 Mo au-delà de 20 Mo et pour `HMAC-MD5`). En production backend, appliquez deux règles strictes : **signer le tampon binaire brut non analysé** et **comparer en temps constant** pour bloquer les attaques par canal auxiliaire temporel.

```javascript
// Node.js (Express / Next.js) — vérification en temps constant
import crypto from 'node:crypto';

export function verifierWebhook(rawBody, secret, headerHex) {
  const attendu = crypto.createHmac('sha256', secret).update(rawBody).digest();
  const recu = Buffer.from(headerHex.replace(/^sha256=/i, '').trim(), 'hex');
  if (attendu.length !== recu.length) return false;
  return crypto.timingSafeEqual(attendu, recu);
}
```

```python
# Python — vérification HMAC-SHA256 résistante aux canaux temporels
import hashlib, hmac

def verifier_signature(corps_brut: bytes, secret: str, en_tete: str) -> bool:
    attendu = hmac.new(secret.encode("utf-8"), corps_brut, hashlib.sha256).hexdigest()
    return hmac.compare_digest(attendu, en_tete.removeprefix("sha256=").strip().lower())
```

### Fenêtre anti-rejeu et rotation sans coupure

Un HMAC valide garantit l'authenticité du paquet, mais n'empêche pas un attaquant de réémettre plus tard une requête légitime interceptée. Incluez systématiquement un horodatage Unix dans la chaîne signée (par exemple `${timestamp}.${rawBody}`) et rejetez toute requête décalée de plus de 300 secondes. Pour renouveler vos secrets sans interrompre vos intégrations, acceptez temporairement deux clés actives (clé principale et clé précédente) pendant la fenêtre de transition, en évaluant chaque empreinte en temps constant avant de révoquer l'ancien secret.

## Diagnostiquer les écarts de signature

Si une vérification échoue malgré des paramètres apparemment exacts, contrôlez ces quatre causes fréquentes :

1. **Re-sérialisation JSON** : Un middleware comme `express.json()` modifie espaces, ordre des clés ou échappements (`\/` contre `/`). Signer `JSON.stringify(req.body)` brise la signature ; capturez toujours le `Buffer` brut avant le parsing.
2. **Encodage d'en-tête et formats fournisseurs** : GitHub préfixe sa sortie hexadécimale par `sha256=`, Stripe utilise `t=1700000000,v1=<hex>` sur `${timestamp}.${rawBody}`, tandis que Shopify encode le condensat binaire en Base64 (contrôlable via notre [encodeur Base64](/fr/outils/base64-encode)). Pour auditer un jeton `HS256`/`HS512`, inspectez ses segments Base64Url dans notre [décodeur JWT](/fr/outils/jwt-decoder).
3. **Encodage de la clé secrète** : Confirmez si un secret hexadécimal de 64 caractères est consommé comme 64 octets UTF-8 ou décodé en 32 octets binaires, et supprimez tout `\r\n` parasite dans vos fichiers `.env`.
4. **Canonicalisation stricte** : AWS Signature Version 4 impose un tri alphabétique des paramètres de requête, des en-têtes en minuscules et des sauts de ligne `\n` avant d'enchaîner les dérivations HMAC-SHA256 par date, région et service.
