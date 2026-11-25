---
metaTitle: "Générateur d'UUID en Ligne | RFC 9562 v1, v4, v6 et v7"
metaDescription: "Générez jusqu'à 10 000 UUID RFC 9562 (v1, v4, v6, v7) côté client via Web Crypto. Formatez, validez et exportez vos GUID en JSON, CSV ou TXT."
metaKeywords: "générateur uuid, générateur guid, uuid v4, uuid v7, rfc 9562, générer uuid en masse, validateur uuid, identifiant unique, clé primaire uuid, postgresql uuid"
title: "Générateur d'UUID"
shortDescription: "Générez des UUID RFC 9562 cryptographiquement sûrs (v1, v4, v6 et v7 triés chronologiquement) à l'unité ou par lots jusqu'à 10 000, avec validation et extraits de code."
faqs:
  - question: "Pourquoi l'UUID v7 surpasse-t-il l'UUID v4 comme clé primaire dans PostgreSQL ou MySQL ?"
    answer: "L'UUID v4 étant entièrement aléatoire, chaque insertion disperse les nouvelles lignes sur des pages feuilles aléatoires de l'index B-Tree, provoquant des découpages de pages (page splits), une amplification d'écriture et des défauts de cache. L'UUID v7 place un horodatage Unix en millisecondes sur ses 48 bits de poids fort, ce qui concentre les insertions de façon monotone en fin d'index."
  - question: "Qu'a changé la publication de la RFC 9562 par rapport à l'ancienne norme RFC 4122 ?"
    answer: "Publiée par l'IETF en mai 2024, la RFC 9562 normalise officiellement les versions chronologiques UUID v6, UUID v7 basé sur l'époque Unix et UUID v8 à structure personnalisée. Elle déconseille également l'UUID v1 basé sur l'adresse MAC pour les usages sensibles et formalise les compteurs monotones pour les rafales d'écritures dans la même milliseconde."
  - question: "Quel type SQL choisir pour stocker des UUID sans gaspiller de RAM ni d'espace disque ?"
    answer: "Évitez les colonnes VARCHAR(36) ou CHAR(36) qui consomment au moins 36 octets en ASCII et alourdissent chaque index secondaire. Utilisez le type binaire natif UUID (16 octets) dans PostgreSQL, UNIQUEIDENTIFIER dans SQL Server ou BINARY(16) combiné à UUID_TO_BIN() dans MySQL 8."
  - question: "Le validateur intégré accepte-t-il les GUID en majuscules, entre accolades ou sans tirets ?"
    answer: "Oui. Avant de contrôler la conformité structurelle RFC 9562, le quartet de version et les bits de variante, l'onglet Validateur retire automatiquement les accolades ({...}) et les guillemets périphériques, puis reformate les chaînes hexadécimales compactes de 32 caractères vers le gabarit canonique 8-4-4-4-12."
  - question: "Quelle est la probabilité réelle de collision pour un UUID v4 ou v7 en production distribuée ?"
    answer: "L'UUID v4 offre 122 bits aléatoires (5,32 x 10^36 états), ce qui exige environ 2,71 x 10^18 identifiants pour atteindre un risque de collision de 50 % selon le paradoxe des anniversaires. L'UUID v7 intègre 74 bits d'entropie (ou compteur monotone plus aléa) par milliseconde, rendant toute collision accidentelle négligeable même sur des grappes multi-régions."
features:
  - "Génération conforme à la norme RFC 9562 sur quatre versions : v1 (grégorien/MAC), v4 (aléatoire CSPRNG), v6 (horodaté réordonné) et v7 (horodaté Unix)"
  - "Moteur de génération en masse 100 % côté client produisant jusqu'à 10 000 UUID formatés en une seule passe via l'API Web Crypto"
  - "Options de formatage instantanées : majuscules, suppression des tirets (32 caractères compacts), accolades Microsoft {...} et encadrement par guillemets"
  - "Onglet Validateur dédié normalisant les formats variés pour vérifier la structure canonique, la version et la variante RFC"
  - "Extraits de code prêts à l'emploi pour JavaScript/TypeScript, Node.js, Python, Java, C#/.NET et PostgreSQL"
  - "Copie en un clic, exportation directe en TXT, tableau JSON ou CSV, et historique local des 10 derniers lots générés"
useCases:
  - "Concevoir des schémas PostgreSQL, MySQL ou CockroachDB à fort débit avec des clés primaires UUID v7 optimisées pour les index B-Tree"
  - "Remplacer les identifiants auto-incrémentés d'une API REST par des UUID v4 imprévisibles afin d'éliminer les failles d'énumération IDOR"
  - "Alimenter des bases de préproduction, des jeux de tests d'intégration et des scénarios de charge avec jusqu'à 10 000 identifiants uniques"
  - "Produire des GUID Microsoft .NET, COM ou SQL Server en majuscules avec accolades pour des migrations de registre ou de configuration"
  - "Attribuer des identifiants de corrélation et de traçage distribué entre microservices, files de messages et clients mobiles hors ligne"
  - "Contrôler la conformité RFC d'identifiants issus de webhooks externes ou de migrations de bases de données historiques"
howToSteps:
  - "Choisissez la version cible dans l'onglet Générateur : v4 pour une opacité totale, v7 pour l'indexation chronologique SQL, ou v1/v6 pour la compatibilité historique."
  - "Sélectionnez une génération unitaire ou indiquez une quantité en masse jusqu'à 10 000 identifiants via les raccourcis ou le champ numérique."
  - "Activez au besoin les modificateurs de formatage (majuscules, sans tirets, accolades ou guillemets) adaptés à votre langage ou requête SQL."
  - "Cliquez sur Générer pour créer les identifiants localement, puis copiez une ligne précise ou exportez le lot complet en TXT, CSV ou JSON."
  - "Basculez vers l'onglet Validateur pour auditer des chaînes externes, ou ouvrez les Extraits Développeurs pour intégrer la génération native dans votre stack."
---

Les systèmes distribués ne peuvent dépendre d'une séquence SQL unique sans créer un goulot d'étranglement, tandis que des entiers séquentiels (`/commandes/4019`) exposent votre volumétrie et favorisent les attaques **IDOR** (*Insecure Direct Object Reference*). Les **UUID** (*Universally Unique Identifiers*), nommés **GUID** sous Microsoft `.NET` et Win32, résolvent ces deux enjeux via une structure fixe de 128 bits normalisée par l'**IETF RFC 9562** (qui remplace la RFC 4122 depuis mai 2024). Cet outil génère, formate et valide les UUID `v1`, `v4`, `v6` et `v7` localement dans votre navigateur grâce à Web Crypto, sans aucun transfert réseau.

## Structure binaire 128 bits et encodage de variante

Un UUID canonique comporte 32 caractères hexadécimaux groupés en cinq segments séparés par des tirets (`8-4-4-4-12`, soit 36 caractères ASCII) :

```text
xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
              ^    ^
              |    └── Variante : 8, 9, a ou b (binaire 10xx = RFC 9562)
              └─────── Version : 1, 4, 6 ou 7
```

Six bits portent les métadonnées structurelles : les 4 bits `ver` sur le quartet fort de l'octet 6 et les 2 bits `var` (`10`) en tête de l'octet 8. Les **122 bits restants** varient selon la version :

| Version | Horodatage | Bits aléatoires / nœud | Triable | Fuite MAC | Usage recommandé |
| :--- | :--- | :--- | :---: | :---: | :--- |
| **UUID v1** | 60 bits (pas 100 ns depuis `1582-10-15`, poids faible en tête) | 14 bits `clock_seq` + 48 bits MAC/nœud | Non | Élevée si MAC réelle | Systèmes historiques et compatibilité |
| **UUID v4** | Aucun | 122 bits aléatoires CSPRNG | Non | Aucune | URL publiques, jetons opaques, traces |
| **UUID v6** | 60 bits grégoriens réordonnés (big-endian) | 14 bits `clock_seq` + 48 bits nœud | Oui | Modérée (nœud aléatoire) | Migration triable depuis v1 |
| **UUID v7** | 48 bits époque Unix ms (`1970-01-01`, big-endian) | 12 bits `rand_a` (ou compteur) + 62 bits `rand_b` | Oui | Aucune (date seule) | Clés primaires SQL/NoSQL, journaux |

## Pourquoi l'UUID v7 corrige la fragmentation des index B-Tree

Dans PostgreSQL (index B-Tree) ou MySQL InnoDB (index clusterisé sur clé primaire), l'ordre des clés gouverne les accès disque. Insérer des millions d'**UUID v4** disperse les écritures sur des pages feuilles aléatoires :

1. **Découpage de pages et amplification d'écriture** : Les pages B-Tree à moitié pleines se scindent continuellement, gonflant l'index de 30 % à 50 % et multipliant les écritures WAL.
2. **Effondrement du cache tampon** : Chaque insertion frappant une page froide au lieu du bord droit de l'arbre, le taux de succès du *buffer pool* chute dès que l'index dépasse la RAM.

L'**UUID v7** résout ce problème : ses 48 bits initiaux encodent l'horodatage Unix en millisecondes en ordre *big-endian* (valide jusqu'en 10889), suivis de 74 bits aléatoires ou de compteur monotone. Les écritures s'ajoutent séquentiellement en bordure droite avec un débit proche d'un `BIGINT`, sans coordination centrale. Nuance sécurité : v7 révélant l'horodatage à la milliseconde près, préférez **UUID v4** pour les jetons porteurs ou URL devant rester opaques.

## Probabilité de collision, entropie Web Crypto et lots massifs

Pour des identifiants aléatoires uniformes sur $k$ bits, la probabilité de collision parmi $n$ tirages suit l'approximation du paradoxe des anniversaires :

$$P(\text{collision}) \approx 1 - \exp\!\left(-\frac{n^2}{2 \cdot 2^k}\right)$$

Pour **UUID v4** ($k = 122$, soit $2^{122} \approx 5{,}32 \times 10^{36}$), générer $n = 10^{12}$ identifiants donne une probabilité inférieure à $10^{-13}$ ; atteindre 50 % exigerait $n \approx 2{,}71 \times 10^{18}$ UUID (un milliard par seconde durant 85 ans). Pour **UUID v7**, les 74 bits par milliseconde offrent $2^{74} \approx 1{,}89 \times 10^{22}$ états distincts, et la RFC 9562 §6.2 permet d'employer `rand_a` comme compteur monotone en rafale.

Contrairement à `Math.random()`, dont l'état interne pseudo-aléatoire peut être prédit dans certains moteurs JavaScript, notre générateur puise exclusivement dans `crypto.getRandomValues()` et `crypto.randomUUID()` fournis par le générateur cryptographique (CSPRNG) de votre système d'exploitation. L'exécution intégralement locale évite que des clés destinées à un environnement de préproduction ou de production ne transitent dans des journaux serveur tiers. Pour des encodages propriétaires de partitionnement (*sharding*), la RFC 9562 définit aussi **UUID v8**, tandis que **ULID** reprend la même philosophie chronologique en encodage Base32 sur 26 caractères.

## Stockage SQL, validation Regex et pièges d'endianness

Évitez `VARCHAR(36)` en production : le stockage binaire sur 16 octets divise l'empreinte mémoire par plus de deux et accélère chaque index :

```sql
-- PostgreSQL : type natif uuid sur 16 octets (v7 natif en PG 18 ou via extensions)
CREATE TABLE evenements (
  id UUID PRIMARY KEY,
  charge JSONB NOT NULL
);

-- MySQL 8 : BINARY(16) compact (ne jamais passer swap_flag=1 avec UUID v7 !)
CREATE TABLE evenements (
  id BINARY(16) PRIMARY KEY,
  cree_le TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO evenements (id) VALUES (UUID_TO_BIN('019345a2-8c1d-7f2e-9a41-3b7e2f8c1d09', 0));
```

Deux pièges inter-plateformes méritent vigilance :
- **MySQL `UUID_TO_BIN(uuid, 1)`** : Le drapeau `1` réarrange les octets temporels d'un UUID **v1**. Ne l'activez jamais sur **UUID v7**, déjà trié en *big-endian*, sinon son préfixe chronologique est détruit.
- **Ordre des octets `.NET`** : `Guid.ToByteArray()` encode `Data1`, `Data2` et `Data3` en *little-endian*. Entre C# et PostgreSQL ou Go, utilisez `Guid.ToByteArray(bigEndian: true)` (.NET 8+) ou la forme texte canonique.

Expression régulière stricte pour les versions `1`, `4`, `6`, `7` et la variante RFC 9562 (`8/9/a/b`) :

```regex
^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1467][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$
```

### Sentinelles Nil/Max et dérive d'horloge NTP

La RFC 9562 définit le **Nil UUID** (`00000000-0000-0000-0000-000000000000`) pour représenter une clé absente sans colonne nullable, et le **Max UUID** (`ffffffff-ffff-ffff-ffff-ffffffffffff`) comme borne haute d'intervalle B-Tree. Sur des serveurs synchronisés par NTP, vérifiez que votre implémentation v7 préserve la monotonie lors d'un recul d'horloge.

## Enchaîner avec vos autres outils de développement

Après exportation d'un lot JSON jusqu'à 10 000 identifiants, validez vos charges utiles dans le [formateur JSON](/fr/outils/json-formatter) ou générez des jeux d'essai complets avec le [générateur de données fictives API](/fr/outils/api-mock-data-generator). Pour des clés URL plus compactes ou préfixées (`usr_...`), basculez vers notre [générateur de chaînes aléatoires](/fr/outils/random-string-generator).
