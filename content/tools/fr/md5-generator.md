---
metaTitle: "Générateur MD5 en Ligne — Hash Texte, Fichier & Checksum"
metaDescription: "Calculez et vérifiez vos empreintes MD5 (RFC 1321) sur texte UTF-8 ou fichiers locaux en glisser-déposer, 100 % côté client sans envoi serveur."
metaKeywords: "générateur md5, hash md5 en ligne, calculer checksum md5, rfc 1321, somme de contrôle md5, fichier vers md5, vérifier intégrité md5, etag s3 md5"
title: "Générateur MD5"
shortDescription: "Calculez et comparez instantanément des sommes de contrôle MD5 (128 bits, RFC 1321) à partir de texte UTF-8 ou de fichiers locaux, entièrement dans votre navigateur sans transfert serveur."
faqs:
  - question: "Pourquoi MD5 est-il considéré comme cryptographiquement cassé ?"
    answer: "Depuis les travaux de Xiaoyun Wang en 2004 puis les collisions à préfixe choisi, on peut produire deux fichiers distincts partageant exactement le même condensat MD5 en moins d'une seconde sur matériel courant. Cette faille a permis de forger des certificats X.509 et de signer le malware Flame."
  - question: "Dans quels contextes techniques l'utilisation de MD5 reste-t-elle acceptable ?"
    answer: "MD5 demeure pertinent dans des environnements non antagonistes où aucun attaquant ne maîtrise les entrées : détection de corruption réseau ou disque, en-tête HTTP Content-MD5 et ETag S3 mono-partie, clés de cache Redis/Memcached, déduplication interne ou identifiants hérités comme Gravatar."
  - question: "Pourquoi mon condensat MD5 diffère-t-il du résultat de la commande md5sum ?"
    answer: "L'écart vient presque toujours d'octets invisibles : la commande echo ajoute un saut de ligne final LF contrairement à printf, Windows emploie CRLF au lieu de LF, un éditeur peut insérer un BOM UTF-8 (0xEF 0xBB 0xBF) ou enregistrer le texte en Windows-1252 plutôt qu'en UTF-8."
  - question: "Peut-on déchiffrer ou inverser un hash MD5 de 32 caractères ?"
    answer: "Non. MD5 est une fonction de compression à sens unique qui projette toute entrée sur 128 bits fixes avec perte d'information irréversible. Les outils présentés comme décodeurs MD5 consultent simplement des bases de condensats précalculés (dictionnaires ou tables arc-en-ciel) pour des mots courants."
  - question: "Mes textes ou fichiers locaux sont-ils envoyés sur un serveur distant ?"
    answer: "Non. Le calcul MD5 s'exécute intégralement en local dans la mémoire de votre navigateur via les API File et ArrayBuffer. Aucun fichier, texte ou condensat ne quitte votre appareil."
features:
  - "Calcul MD5 conforme RFC 1321 en temps réel dès la frappe avec encodage UTF-8 strict et gestion multiligne"
  - "Hachage binaire local de fichiers par glisser-déposer directement dans le navigateur sans aucun téléversement"
  - "Champ de comparaison et de vérification instantanée face à une somme de contrôle de référence"
  - "Bascule hexadécimale minuscules (a-f) et majuscules (A-F) compatible avec Linux, macOS, PowerShell et SQL"
  - "Indicateur en direct du nombre de caractères et de la taille en octets UTF-8 pour repérer espaces et fins de ligne"
  - "Historique local de session conservé dans votre navigateur avec copie rapide de l'empreinte en un clic"
useCases:
  - "Vérification de l'intégrité d'archives, de dumps SQL ou d'images ISO téléchargées face à un fichier MD5SUMS"
  - "Contrôle de l'en-tête Content-MD5 et des valeurs ETag sur des objets mono-partie stockés dans Amazon S3 ou MinIO"
  - "Normalisation de requêtes SQL longues ou de filtres API en clés de cache fixes de 32 caractères pour Redis"
  - "Déduplication rapide de médias, pièces jointes ou lots de fichiers dans des pipelines de données internes"
  - "Génération d'empreintes MD5 d'adresses e-mail normalisées (minuscules, sans espaces) pour les intégrations Gravatar"
  - "Diagnostic des différences d'octets (CRLF vs LF, BOM UTF-8, accents NFC vs NFD) entre Windows, macOS et Linux"
howToSteps:
  - "Sélectionnez l'onglet Saisie de texte pour hacher une chaîne UTF-8 ou l'onglet Fichier pour traiter un document local."
  - "Saisissez ou collez votre texte dans l'éditeur, ou glissez-déposez votre fichier binaire dans la zone dédiée."
  - "Contrôlez le compteur d'octets UTF-8 afin d'écarter tout espace final ou saut de ligne involontaire."
  - "Choisissez la casse hexadécimale attendue (minuscules ou majuscules) via la bascule d'affichage."
  - "Collez la somme de contrôle de référence dans le champ Comparer / Vérifier pour confirmer la correspondance exacte."
  - "Copiez le condensat de 32 caractères ou retrouvez vos calculs récents dans l'historique local de session."
---

Conçu par Ronald Rivest en 1991 et normalisé par la **RFC 1321**, **MD5 (Message Digest Algorithm 5)** compresse n'importe quel flux binaire en une empreinte fixe de **128 bits (16 octets)**, généralement affichée sur 32 caractères hexadécimaux. Bien que MD5 soit officiellement disqualifié pour toute protection face à un adversaire actif, il reste largement déployé en ingénierie logicielle et administration système : détection de corruption accidentelle, en-têtes `Content-MD5`, clés de cache et rétrocompatibilité d'API. Pour un contrôle d'intégrité cryptographique moderne, utilisez notre [générateur SHA256](/fr/outils/sha256-generator) ou comparez plusieurs algorithmes dans notre [générateur de hachage](/fr/outils/hash-generator).

## Architecture interne de MD5 (RFC 1321)

MD5 suit une construction **Merkle-Damgård** sur des blocs de **512 bits (64 octets)** découpés en 16 mots de 32 bits en ordre **little-endian** :

1. **Bourrage (padding)** : un bit `1` (`0x80`) est ajouté au message, suivi de bits `0` jusqu'à atteindre `448 mod 512` bits. Les 64 derniers bits encodent la taille initiale en bits (modulo 2⁶⁴) en little-endian.
2. **État initial** : quatre registres de 32 bits (`A`, `B`, `C`, `D`) sont initialisés aux constantes `0x67452301`, `0xefcdab89`, `0x98badcfe` et `0x10325476`.
3. **Compression en 64 étapes** : chaque bloc traverse 4 rondes de 16 opérations mêlant quatre fonctions booléennes non linéaires (`F`, `G`, `H`, `I`), des rotations circulaires à gauche et 64 constantes `T[i] = floor(2³² × |sin(i)|)`.
4. **Finalisation** : l'état résultant est additionné modulo 2³² à l'état d'entrée du bloc, puis sérialisé en little-endian sur 16 octets.

Ce traitement garantit déterminisme, taille constante (la chaîne vide `""` produit `d41d8cd98f00b204e9800998ecf8427e`) et effet d'avalanche immédiat : `admin` donne `21232f297a57a5a743894a0e4a801fc3` contre `e3afed0047b08059d0fada10f400c1e5` pour `Admin`. En l'absence d'attaquant, la probabilité de collision fortuite sur 128 bits reste négligeable jusqu'à environ 2⁶⁴ objets (borne des anniversaires), expliquant pourquoi MD5 détecte efficacement une corruption réseau ou disque.

## Vulnérabilités cryptographiques et choix d'algorithme

La limite majeure de MD5 est sa **rupture complète face aux collisions volontaires**. Depuis la démonstration de Xiaoyun Wang (2004), un utilitaire comme *FastColl* génère deux fichiers distincts partageant un même MD5 en moins d'une seconde, et des **collisions à préfixe choisi** ont permis de forger des certificats TLS (2008) puis de signer le malware *Flame* (2012). En parallèle, un GPU moderne évalue des dizaines de milliards de hachages MD5 par seconde, rendant le stockage de mots de passe en MD5 — même salé — trivialement cassable.

| Algorithme | Sortie (bits / hex) | Collisions | Résistance GPU (mots de passe) | Statut sécurité | Cas d'usage recommandé |
| :--- | :---: | :--- | :--- | :--- | :--- |
| **MD5** | 128 / 32 | Cassée (< 1 s) | Nulle | Obsolète en sécurité | Checksums non antagonistes, S3 `Content-MD5`, cache |
| **SHA-256** | 256 / 64 | Intacte | Faible seul | Standard cryptographique | Intégrité logicielle, TLS, OCI/Docker, certificats |
| **BLAKE3** | 256 / 64 | Intacte | Faible seul | Moderne très haut débit | Déduplication massive, stockage adressé par contenu |
| **Argon2id** | Configurable | N/A (KDF lente) | **Élevée (mémoire dure)** | Référence OWASP | Stockage de mots de passe et dérivation de clés |

Pour signer un webhook ou une requête API, évitez `MD5(secret + message)` (vulnérable à l'extension de longueur) et privilégiez notre [générateur HMAC](/fr/outils/hmac-generator) en HMAC-SHA256. Pour les comptes utilisateurs, générez des secrets robustes via notre [générateur de mots de passe forts](/fr/outils/strong-password-generator) et hachez-les avec **Argon2id** ou **bcrypt**.

## Usages légitimes en ingénierie et subtilités S3

Dans un périmètre maîtrisé, MD5 garde des usages ciblés et bien encadrés :

- **Amazon S3, MinIO et `Content-MD5`** : l'en-tête HTTP `Content-MD5` attend le **Base64 des 16 octets binaires** du condensat MD5 — et non le Base64 de la chaîne hexadécimale de 32 caractères (vérifiable avec notre [encodeur Base64](/fr/outils/base64-encode)). Sur S3, seul un envoi mono-partie produit un `ETag` égal au MD5 du fichier ; un téléversement multipartite génère un `ETag` composite `<md5_des_md5>-<nb_parties>`.
- **Clés de cache compactes et Gravatar** : réduire une requête SQL ou un filtre JSON canonique en `CHAR(32)` ou `BINARY(16)` uniformise l'indexation dans Redis et Memcached. Pour les intégrations héritées Gravatar, supprimez d'abord les espaces en début et fin d'adresse e-mail puis convertissez-la intégralement en minuscules avant le hachage (Gravatar accepte désormais aussi SHA-256).
- **Déduplication interne** : efficace sur des corpus de confiance ; dès que des tiers peuvent déposer des fichiers, passez à SHA-256 ou BLAKE3 pour écarter tout risque de collision volontaire.

## Commandes CLI, Python et causes d'écarts d'empreinte

```bash
# Linux — printf évite le saut de ligne final ajouté par echo
printf 'admin' | md5sum
# -> 21232f297a57a5a743894a0e4a801fc3  -

# Générer un en-tête Content-MD5 valide (binaire -> Base64) pour Amazon S3
openssl dgst -md5 -binary archive.tar.gz | openssl base64

# Windows (PowerShell) — contrôle d'intégrité local
Get-FileHash -Path ".\archive.tar.gz" -Algorithm MD5
```

```python
# Python — calcul MD5 en flux constant sur fichier volumineux
import hashlib

def md5_fichier(chemin: str, bloc: int = 65536) -> str:
    h = hashlib.md5()
    with open(chemin, "rb") as f:
        for morceau in iter(lambda: f.read(bloc), b""):
            h.update(morceau)
    return h.hexdigest()
```

### Diagnostiquer un condensat différent entre systèmes

Lorsque l'empreinte diffère entre cet outil et un terminal, contrôlez quatre causes classiques :

1. **Saut de ligne final** : `echo "admin" | md5sum` hache `admin\n` et renvoie `456b7016a916a4b178dd72b947c152b7` au lieu de `21232f297a57a5a743894a0e4a801fc3`.
2. **Fins de ligne `CRLF` contre `LF`** : un fichier texte avec `\r\n` sous Windows génère un MD5 différent de sa copie `\n` sous Linux.
3. **BOM UTF-8** : la séquence invisible `0xEF 0xBB 0xBF` en tête d'un CSV ou JSON modifie intégralement l'empreinte.
4. **Normalisation Unicode** : `é` composé (`U+00E9`, NFC) et `e` + accent combinant (`U+0301`, NFD, fréquent sous macOS) diffèrent octet par octet.

Tout le traitement s'effectue 100 % côté client dans votre navigateur, sans transmission de vos fichiers ni de vos textes.
