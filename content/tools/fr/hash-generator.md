---
metaTitle: "Générateur de Hash en Ligne | MD5, SHA-256, SHA-512, SHA-3"
metaDescription: "Calculez des empreintes MD5, SHA-1, SHA-256, SHA-512 et SHA-3 localement dans votre navigateur. Vérifiez l'intégrité de vos textes et fichiers."
metaKeywords: "générateur de hash, hash md5 en ligne, générateur sha256, générateur sha1, sha512, générateur sha3, calculer hash, intégrité fichier, checksum, empreinte cryptographique"
title: "Générateur de Hash"
shortDescription: "Calculez instantanément des empreintes cryptographiques MD5, SHA-1, SHA-256, SHA-512 et SHA-3 pour du texte ou des fichiers volumineux, 100 % côté client."
faqs:
  - question: "Pourquoi SHA-256 est-il recommandé à la place de MD5 et SHA-1 ?"
    answer: "MD5 (128 bits) et SHA-1 (160 bits) sont vulnérables à des attaques par collision pratiques et peu coûteuses (comme FastColl ou SHAttered). SHA-256 produit un condensat de 256 bits avec une résistance théorique de 2^128 opérations face aux collisions, ce qui en fait la référence actuelle pour vérifier l'intégrité des fichiers et signer des certificats."
  - question: "En quoi l'architecture de SHA-3 diffère-t-elle de celle de SHA-2 ?"
    answer: "La famille SHA-2 repose sur la construction itérative de Merkle-Damgård, sensible aux attaques par extension de longueur lorsqu'elle est utilisée naïvement avec une clé secrète. SHA-3 (normalisé par le NIST dans FIPS 202) s'appuie sur la construction éponge de Keccak avec une permutation interne de 1600 bits, immunisée nativement contre cette classe d'attaque."
  - question: "Un hachage SHA-256 suffit-il pour stocker des mots de passe en base de données ?"
    answer: "Non. Les fonctions de hachage cryptographiques générales comme SHA-256 ou SHA-3 sont conçues pour s'exécuter le plus vite possible, ce qui facilite les attaques par force brute sur GPU. Pour les mots de passe, utilisez une fonction de dérivation de clé lente et gourmande en mémoire telle qu'Argon2id, scrypt ou bcrypt avec un sel unique par utilisateur."
  - question: "Pourquoi deux fichiers apparemment identiques produisent-ils des hachages différents ?"
    answer: "En raison de l'effet d'avalanche, la moindre différence d'un seul bit modifie environ la moitié des bits de l'empreinte. Les causes les plus fréquentes sur les fichiers texte sont les fins de ligne Windows (CRLF) versus Unix (LF), la présence d'un marqueur d'ordre d'octets UTF-8 (BOM) ou une espace finale invisible."
  - question: "Mes fichiers confidentiels sont-ils envoyés sur un serveur lors du calcul ?"
    answer: "Non. Toutes les opérations de hachage s'effectuent localement dans votre navigateur grâce à l'API Web Cryptography (SubtleCrypto) et à un découpage par blocs en mémoire. Aucun octet de vos textes ou de vos archives binaires ne transite sur le réseau."
features:
  - "Calcul simultané multi-algorithmes : MD5, SHA-1, SHA-224, SHA-256, SHA-384, SHA-512 et SHA-3 (Keccak)"
  - "Lecture en flux par blocs des fichiers volumineux sans saturer la mémoire vive du navigateur"
  - "Comparateur intégré insensible à la casse pour valider immédiatement un checksum officiel"
  - "Indicateurs de robustesse cryptographique signalant les algorithmes dépréciés ou cassés"
  - "Encodage UTF-8 strict compatible avec les caractères accentués, symboles techniques et emojis"
  - "Traitement 100 % côté client sans aucune transmission réseau ni journalisation serveur"
useCases:
  - "Contrôler l'intégrité d'une image ISO Linux ou d'un exécutable téléchargé via son fichier SHA256SUMS"
  - "Générer des empreintes déterministes pour le cache-busting d'actifs statiques dans un pipeline CI/CD"
  - "Dédupliquer des documents binaires ou détecter des altérations silencieuses dans un stockage objet"
  - "Produire des sommes de contrôle MD5 héritées exigées par les en-têtes Content-MD5 d'anciennes API"
  - "Auditer la conformité de livrables logiciels en consignant leurs condensats SHA-256 et SHA-512"
  - "Vérifier qu'un transfert SFTP, une sauvegarde ou une migration de base n'a subi aucune corruption"
howToSteps:
  - "Choisissez le mode d'entrée souhaité : saisie de texte libre ou sélection d'un fichier local."
  - "Saisissez ou collez votre chaîne UTF-8 dans l'éditeur, ou glissez-déposez un fichier dans la zone dédiée."
  - "Observez le calcul instantané des empreintes hexadécimales pour chaque algorithme pris en charge."
  - "Vérifiez les badges de statut cryptographique pour sélectionner un algorithme adapté à votre niveau de sécurité."
  - "Collez une empreinte attendue dans le champ de comparaison afin de confirmer une correspondance exacte bit à bit."
  - "Copiez le condensat final en minuscules ou en majuscules pour l'intégrer à vos scripts ou manifests."
---

Une fonction de hachage cryptographique transforme une séquence d'octets de longueur arbitraire — qu'il s'agisse d'une simple chaîne de caractères, d'un document PDF ou d'une image disque de plusieurs gigaoctets — en une empreinte binaire de taille fixe appelée condensat, hachage (*hash*) ou somme de contrôle (*checksum*). Cet outil exécute les algorithmes MD5, SHA-1, la famille SHA-2 et SHA-3 directement dans votre navigateur, afin de valider l'intégrité de vos données sans jamais les téléverser sur un serveur distant.

## Propriétés mathématiques et architectures internes

Pour être qualifiée de cryptographiquement sûre, une fonction de hachage `H` doit satisfaire trois garanties fondamentales : la **résistance à la pré-image** (impossibilité pratique de retrouver un message `m` à partir de `H(m)`), la **résistance à la seconde pré-image** (impossibilité de fabriquer un message `m2 ≠ m1` ayant la même empreinte qu'un message donné) et la **résistance aux collisions** (impossibilité de trouver une paire quelconque `(m1, m2)` vérifiant `H(m1) = H(m2)`). S'y ajoute l'**effet d'avalanche** : l'inversion d'un unique bit dans l'entrée doit basculer statistiquement 50 % des bits de sortie, rendant toute corrélation impossible.

Sur le plan structurel, deux grandes familles coexistent dans les bibliothèques modernes :

### La construction de Merkle-Damgård (MD5, SHA-1, SHA-2)

Les algorithmes **MD5** (RFC 1321), **SHA-1** et **SHA-2** (norme NIST FIPS 180-4) découpent l'entrée en blocs fixes de 512 bits (ou 1 024 bits pour SHA-384 et SHA-512), appliquent un remplissage (*padding*) incluant un bit `1`, des zéros et la longueur totale du message encodée sur 64 ou 128 bits, puis enchaînent une fonction de compression itérative à partir d'un vecteur d'initialisation constant.

Bien que **SHA-256** et **SHA-512** demeurent extrêmement robustes contre les collisions, la structure de Merkle-Damgård expose un angle mort spécifique : l'**attaque par extension de longueur** (*length extension attack*). Si un développeur authentifie un message en calculant naïvement `SHA256(secret || message)`, un attaquant connaissant le condensat et la longueur du secret peut calculer un hachage valide pour `secret || message || padding || données_injectées` sans connaître le secret. C'est précisément pour neutraliser cette faille que l'authentification par clé secrète doit passer par HMAC (RFC 2104), testable via notre [générateur HMAC](/fr/outils/hmac-generator).

### La construction éponge de Keccak (SHA-3)

Normalisée par le NIST en 2015 dans **FIPS 202**, la famille **SHA-3** (issue de l'algorithme Keccak) adopte une architecture radicalement différente appelée **construction éponge** (*sponge construction*). Elle maintient un état interne de 1 600 bits divisé en deux zones : le débit (*bitrate* `r`) qui absorbe les blocs d'entrée par opération XOR, et la capacité (`c`) qui n'est jamais exposée directement et fixe la marge de sécurité cryptographique. Entre chaque bloc, la permutation `Keccak-f[1600]` applique 24 rondes mêlant opérations booléennes et rotations binaires. Parce que l'état complet n'est jamais restitué intégralement en sortie, SHA-3 est naturellement immunisé contre les attaques par extension de longueur.

## Comparatif technique des algorithmes de hachage

Le tableau ci-dessous synthétise les caractéristiques internes, l'état de la sécurité cryptanalytique et les usages appropriés de chaque algorithme :

| Algorithme | Sortie (bits / hex) | Taille de bloc | Architecture interne | Statut de sécurité | Usage recommandé |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **MD5** | 128 bits (32 car.) | 512 bits | Merkle-Damgård | Cassé (collisions en quelques secondes) | Sommes non critiques, compatibilité héritée |
| **SHA-1** | 160 bits (40 car.) | 512 bits | Merkle-Damgård | Obsolète (attaque SHAttered / préfixe choisi) | Systèmes hérités uniquement, migration vers SHA-256 |
| **SHA-256** | 256 bits (64 car.) | 512 bits | Merkle-Damgård (ARX) | Fort (norme industrielle) | Intégrité de fichiers, TLS, signatures, blockchain |
| **SHA-512** | 512 bits (128 car.) | 1 024 bits | Merkle-Damgård (64 bits) | Très fort (rapide sur CPU 64 bits) | Archives volumineuses, audits haute sécurité |
| **SHA-3-256** | 256 bits (64 car.) | 1 088 bits (`r`) | Éponge Keccak (`c = 512`) | Très fort (immunité extension de longueur) | Diversification cryptographique, protocoles récents |
| **SHA-3-512** | 512 bits (128 car.) | 576 bits (`r`) | Éponge Keccak (`c = 1024`) | Maximal | Signatures longue durée, exigences NIST post-SHA-2 |

Si vous travaillez spécifiquement sur un seul format de condensat, vous pouvez également consulter nos outils dédiés [générateur SHA-256](/fr/outils/sha256-generator) et [générateur MD5](/fr/outils/md5-generator).

## Vérification en ligne de commande et dépannage courant

Dans un flux d'intégration continue ou lors de la réception d'un livrable binaire, il est courant de croiser l'empreinte calculée dans le navigateur avec les utilitaires système natifs :

```bash
# Linux / macOS : vérifier une archive par rapport au manifeste officiel
sha256sum -c SHA256SUMS

# Calculer SHA-256 d'une chaîne SANS retour à la ligne implicite
printf '%s' 'bonjour-monde' | sha256sum

# Windows PowerShell : obtenir le condensat SHA-256 d'un installateur
Get-FileHash -Path ".\setup.exe" -Algorithm SHA256
```

### Scénario de dépannage : pourquoi `echo` ne donne pas le même hash ?

Un piège extrêmement fréquent chez les développeurs consiste à exécuter `echo "secret" | sha256sum` dans un terminal Linux puis à coller `secret` dans un générateur en ligne, obtenant deux condensats totalement différents. La commande `echo` ajoute par défaut un octet de saut de ligne LF (`0x0A`) en fin de chaîne. En utilisant `printf '%s' "secret"` (ou `echo -n`), l'entrée transmise correspond exactement aux 6 octets ASCII attendus.

De la même manière, un fichier texte édité sous Windows (`CRLF`, octets `0x0D 0x0A`) et transféré en mode binaire vers un serveur Linux produira un condensat distinct de sa version convertie en `LF` (`0x0A`). Vérifiez également la présence éventuelle d'un **BOM UTF-8** (`EF BB BF`) ajouté en tête de fichier par certains éditeurs.

## Hachage, chiffrement et protection des mots de passe

Le hachage assure l'**intégrité**, jamais la **confidentialité** : contrairement au chiffrement symétrique (AES-GCM) ou asymétrique (RSA), il n'existe pas de clé de déchiffrement permettant d'inverser un condensat. En revanche, une entrée courte ou prévisible reste vulnérable aux attaques par dictionnaire et par tables précalculées.

Pour sécuriser des identifiants utilisateurs, n'utilisez jamais un simple `SHA-256` nu : préférez un algorithme de dérivation de clé résistant au matériel spécialisé (**Argon2id**, **scrypt** ou **bcrypt**) combiné à un sel aléatoire généré cryptographiquement, et vérifiez la robustesse de vos secrets initiaux avec notre [générateur de mots de passe](/fr/outils/password-generator).
