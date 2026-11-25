---
metaTitle: "Générateur SHA256 en Ligne — Empreinte SHA-256 & Fichiers"
metaDescription: "Calculez et vérifiez vos empreintes SHA-256 (FIPS 180-4) sur texte UTF-8 ou fichiers volumineux 100 % côté client via l'API native Web Crypto."
metaKeywords: "générateur sha256, hash sha256 en ligne, calculer checksum sha256, fips 180-4, web crypto api, sha-256 fichier, vérifier intégrité sha256, empreinte cryptographique"
title: "Générateur SHA256"
shortDescription: "Calculez et vérifiez instantanément des empreintes cryptographiques SHA-256 (FIPS 180-4) pour vos textes UTF-8 et fichiers volumineux, entièrement côté client via l'API Web Crypto."
faqs:
  - question: "Pourquoi SHA-256 est-il sûr pour l'intégrité mais insuffisant seul pour les mots de passe ?"
    answer: "SHA-256 est conçu pour s'exécuter très rapidement sur CPU, GPU et ASIC. Sans fonction de dérivation volontairement lente et gourmande en mémoire (Argon2id, bcrypt ou scrypt) associée à un sel aléatoire unique, un attaquant testant une base volée évalue des milliards de candidats par seconde."
  - question: "Quelle est la différence entre un condensat SHA-256 et une signature HMAC-SHA256 ?"
    answer: "Un hachage SHA-256 sans clé vérifie l'intégrité mais ne prouve pas l'identité de l'émetteur, et une construction naïve SHA-256(secret + message) reste exposée aux attaques par extension de longueur. HMAC-SHA256 imbrique deux passes avec clé secrète pour authentifier en sécurité webhooks et requêtes API."
  - question: "Comment l'outil hache-t-il des fichiers volumineux sans saturer la mémoire du navigateur ?"
    answer: "Les fichiers sont lus localement et progressivement par blocs sur votre appareil, en exploitant les API natives du navigateur et Web Crypto (window.crypto.subtle). Aucune donnée n'est envoyée sur un serveur, préservant la confidentialité et évitant le gel de l'onglet."
  - question: "Pourquoi deux fichiers d'apparence identique donnent-ils un SHA-256 différent ?"
    answer: "L'effet d'avalanche modifie entièrement l'empreinte dès qu'un seul bit change : une fin de ligne CRLF au lieu de LF, un BOM UTF-8 invisible, un horodatage interne dans un ZIP ou PDF, ou une normalisation Unicode NFC contre NFD suffisent à produire un condensat distinct."
  - question: "SHA-256 résiste-t-il à la menace des ordinateurs quantiques ?"
    answer: "Oui pour la sécurité pratique actuelle. L'algorithme de Grover réduirait au mieux la recherche de pré-image de 2^256 à 2^128 opérations, seuil qui reste hors d'atteinte. Pour une marge supplémentaire sur des archives à très long terme, SHA-384 ou SHA-512 restent recommandés."
features:
  - "Calcul SHA-256 conforme FIPS PUB 180-4 en temps réel avec encodage UTF-8 strict et compteur d'octets en direct"
  - "Exécution accélérée par l'API native Web Crypto du navigateur (window.crypto.subtle) tirant parti du processeur"
  - "Hachage local de fichiers par glisser-déposer avec lecture progressive par tranches adaptée aux ISO et sauvegardes"
  - "Vérificateur côte à côte validant instantanément une somme de contrôle de référence publiée par un éditeur"
  - "Bascule hexadécimale minuscules/majuscules, copie rapide dans le presse-papiers et téléchargement du condensat"
  - "Traitement 100 % côté client avec historique local de session, sans téléversement ni journalisation serveur"
useCases:
  - "Contrôle des sommes de contrôle SHA-256 d'images ISO Linux, d'installateurs logiciels et d'artefacts de chaîne CI/CD"
  - "Génération et vérification d'empreintes Subresource Integrity (SRI) pour sécuriser scripts et feuilles CSS tiers"
  - "Validation de digests d'images Docker/OCI (sha256:...), de paquets npm/PyPI et de dépôts Git en format SHA-256"
  - "Vérification d'intégrité de sauvegardes chiffrées, d'exports de bases de données et d'archives probantes avant stockage"
  - "Corrélation d'empreintes de binaires suspects sur VirusTotal, MISP ou dans des règles YARA lors d'investigations SOC"
  - "Création d'identifiants déterministes basés sur le contenu, d'arbres de Merkle et de preuves d'horodatage"
howToSteps:
  - "Choisissez l'onglet Texte pour hacher une chaîne UTF-8 ou l'onglet Fichier pour contrôler un binaire local."
  - "Saisissez ou collez votre texte dans l'éditeur, ou glissez-déposez directement votre fichier dans la zone dédiée."
  - "Consultez le condensat hexadécimal de 64 caractères généré en direct ainsi que la taille exacte en octets traités."
  - "Sélectionnez la casse hexadécimale souhaitée (minuscules ou majuscules) selon la convention de votre outil cible."
  - "Collez l'empreinte de référence publiée par l'éditeur dans le champ Comparer pour confirmer l'intégrité bit à bit."
  - "Copiez le condensat dans le presse-papiers, exportez-le en fichier texte ou retrouvez vos calculs dans l'historique local."
---

Normalisé par le NIST dans **FIPS PUB 180-4** au sein de la famille SHA-2, **SHA-256 (Secure Hash Algorithm 256-bit)** transforme n'importe quel flux binaire en une empreinte cryptographique fixe de **256 bits (32 octets)**, exprimée en 64 caractères hexadécimaux. Contrairement à MD5 — vulnérable aux collisions pratiques et réservé aux usages non antagonistes via notre [générateur MD5](/fr/outils/md5-generator) — aucune attaque pratique par collision ou pré-image n'existe contre SHA-256. Il constitue le socle d'intégrité des certificats TLS/X.509, des digests d'images Docker/OCI, de Subresource Integrity (SRI), des arbres de Merkle et de la distribution logicielle. Pour calculer plusieurs empreintes en parallèle, consultez notre [générateur de hachage](/fr/outils/hash-generator).

## Mécanique algorithmique selon FIPS PUB 180-4

SHA-256 applique une fonction de compression **Merkle-Damgård** sur des blocs de **512 bits (64 octets)** :

1. **Bourrage et découpage big-endian** : un bit `1` (`0x80`) est ajouté au message, suivi de zéros jusqu'à `448 mod 512` bits. Les 64 derniers bits encodent la longueur initiale en bits en entier **big-endian** (contrairement à MD5 en little-endian), puis le flux est découpé en blocs de 16 mots de 32 bits.
2. **Calendrier de message (64 mots)** : les 16 mots `W₀…W₁₅` sont étendus en 64 mots `W₀…W₆₃` via les fonctions `σ₀` et `σ₁` combinant rotations droites (`ROTR`) et décalages (`SHR`).
3. **Constantes « nothing-up-my-sleeve »** : les 8 registres initiaux `H₀…H₇` proviennent des parties fractionnaires des racines carrées des 8 premiers nombres premiers (`2` à `19`), et les 64 constantes `K₀…K₆₃` des racines cubiques des 64 premiers nombres premiers (`2` à `311`), écartant tout soupçon de porte dérobée.
4. **64 tours de compression** : les fonctions `Ch(e,f,g)`, `Maj(a,b,c)`, `Σ₀(a)` et `Σ₁(e)` brassent les registres modulo 2³², assurant un **effet d'avalanche** complet dès qu'un bit varie.

Vecteurs UTF-8 vérifiables : `""` → `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` ; `"hello world"` → `b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9` ; `"Hello world"` → `64ec88ca00b268e5ba1a35678a1b5316d212f4f366b2477232534a8aeca37f3c`.

## Comparatif : SHA-256 face à SHA-512, SHA-3 et BLAKE3

Avec **2²⁵⁶** sorties possibles (environ `1,15 × 10⁷⁷`) et une sécurité contre les collisions de **2¹²⁸** opérations, SHA-256 offre une marge considérable. Le tableau ci-dessous le situe face aux primitives modernes :

| Algorithme | Sortie (bits / hex) | Construction | Extension de longueur | Accélération matérielle | Usages typiques |
| :--- | :---: | :--- | :---: | :--- | :--- |
| **SHA-256** | 256 / 64 | Merkle-Damgård (32 bits) | Vulnérable si naïf | **SHA-NI (x86) & ARMv8** | TLS, SRI, Docker/OCI, Git v2, Bitcoin |
| **SHA-512** | 512 / 128 | Merkle-Damgård (64 bits) | Vulnérable si naïf | Rapide sur CPU 64 bits | Ed25519, haut débit sur serveurs 64 bits |
| **SHA-512/256** | 256 / 64 | SHA-512 tronqué + IV dédiés | **Immunisé** | Rapide sur CPU 64 bits | Systèmes 64 bits exigeant 256 bits |
| **SHA3-256** | 256 / 64 | Éponge Keccak | **Immunisé** | Variable selon CPU | Diversification NIST (FIPS 202) |
| **BLAKE3** | 256 / 64 | Arbre de Merkle SIMD | **Immunisé** | AVX-512 / NEON massif | Stockage adressé par contenu, builds |

En raison de Merkle-Damgård, n'authentifiez jamais un message par `SHA-256(secret || message)` : cette forme est exposée aux **attaques par extension de longueur**. Employez systématiquement une signature HMAC à deux passes via notre [générateur HMAC](/fr/outils/hmac-generator). De même, lorsque vous comparez côté serveur des condensats dérivés d'un secret (jetons API ou liens signés), privilégiez toujours une comparaison en temps constant (`timingSafeEqual` ou `compare_digest`) afin de prévenir les fuites par canal temporel.

## Exemples pratiques : Web Crypto API, SRI et CLI

Les navigateurs exposent l'API native **Web Crypto (`window.crypto.subtle.digest`)**, exécutée en code compilé avec accélération matérielle **SHA-NI** / **ARMv8**. Comme `SubtleCrypto.digest()` traite un tampon unique en une passe, les fichiers de plusieurs gigaoctets requièrent une lecture progressive par tranches pour éviter de saturer la RAM de l'onglet. Voici comment produire en JavaScript un digest hexadécimal et un attribut **Subresource Integrity (SRI)** en Base64 (contrôlable avec notre [encodeur Base64](/fr/outils/base64-encode)) :

```javascript
// Navigateur / Node.js 20+ — SHA-256 hexadécimal et SRI Base64 via Web Crypto
export async function hacherSha256(texte) {
  const octets = new TextEncoder().encode(texte);
  const tampon = await crypto.subtle.digest('SHA-256', octets);
  const vue = new Uint8Array(tampon);
  const hex = Array.from(vue, (b) => b.toString(16).padStart(2, '0')).join('');
  return { hex, sri: 'sha256-' + btoa(String.fromCharCode(...vue)) };
}
```

```bash
# Linux — vérifier un téléchargement contre un manifeste officiel
sha256sum -c SHA256SUMS --ignore-missing

# macOS / Windows PowerShell
shasum -a 256 archive.dmg
Get-FileHash -Path ".\archive.zip" -Algorithm SHA256

# Générer un condensat SRI Base64 pour <script src="..." integrity="sha256-...">
openssl dgst -sha256 -binary bundle.min.js | openssl base64 -A
```

### Intégrité logicielle, signatures et mots de passe

En production, SHA-256 s'intègre au cœur de protocoles plus larges :

- **Signatures et jetons** : dans RSA-PSS, ECDSA P-256 et les JWT (`RS256`, `ES256`, inspectables dans notre [décodeur JWT](/fr/outils/jwt-decoder)), la clé privée signe le condensat de 32 octets plutôt que le document brut.
- **Chaîne logicielle et immuabilité** : Docker/OCI verrouille les images par digest (`image@sha256:...`), Git prend en charge `git init --object-format=sha256`, et Bitcoin combine arbres de Merkle et double SHA-256 pour la preuve de travail.
- **Mots de passe** : ne stockez jamais `SHA-256(mot_de_passe)` nu. Utilisez **Argon2id**, **bcrypt** ou, en contexte FIPS, **PBKDF2-HMAC-SHA256** avec un sel aléatoire ≥ 128 bits et un coût élevé (≥ 600 000 itérations selon l'OWASP).

## Confidentialité locale et vérification rigoureuse

Tous les calculs s'effectuent localement dans votre navigateur via `window.crypto.subtle` et une lecture progressive par tranches adaptée aux ISO ou sauvegardes volumineuses : aucune donnée ne quitte votre machine. Pour sécuriser vos téléchargements, récupérez toujours le fichier `SHA256SUMS` depuis le site officiel en HTTPS (idéalement signé via GPG ou Sigstore) plutôt que depuis le même miroir non authentifié que l'archive, afin de garantir que le manifeste lui-même n'a pas été substitué.
