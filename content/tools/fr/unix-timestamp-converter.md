---
metaTitle: "Convertisseur Timestamp Unix et Epoch en date ISO 8601"
metaDescription: "Convertissez instantanément les timestamps Unix (10 ou 13 chiffres) en dates ISO 8601 UTC et locales. Idéal pour déboguer JWT exp/iat et éviter le bug de 2038."
metaKeywords: "convertisseur timestamp unix, epoch converter, iso 8601 rfc 3339, jwt exp iat, timestamp 10 chiffres 13 chiffres, bogue an 2038, temps posix, bigint nanosecondes"
title: "Convertisseur de Timestamp Unix et Epoch"
shortDescription: "Transformez les timestamps Unix (secondes, millisecondes, microsecondes ou nanosecondes) en dates ISO 8601 UTC et locales avec inspection des claims JWT."
faqs:
  - question: "Quelle est la différence entre un timestamp à 10 chiffres et à 13 chiffres ?"
    answer: "Un timestamp à 10 chiffres exprime le nombre de secondes écoulées depuis l'Epoch Unix (par exemple dans les jetons JWT ou Python time.time()), tandis qu'un timestamp à 13 chiffres mesure des millisecondes (comme Date.now() en JavaScript ou Java)."
  - question: "Qu'est-ce que l'Epoch Unix exactement ?"
    answer: "L'Epoch Unix correspond à l'instant de référence 1970-01-01T00:00:00Z en temps universel coordonné (UTC). Le temps POSIX compte de manière linéaire le nombre de secondes écoulées depuis cette date en ignorant les secondes intercalaires."
  - question: "Comment interpréter les champs exp et iat d'un jeton JWT ?"
    answer: "Selon la norme RFC 7519, les claims iat (Issued At), nbf (Not Before) et exp (Expiration Time) sont des entiers numériques en secondes depuis l'Epoch Unix. En JavaScript, il faut donc multiplier leur valeur par 1 000 avant de la passer à new Date()."
  - question: "Qu'est-ce que le bogue de l'an 2038 (Year 2038 problem) ?"
    answer: "Les systèmes stockant le timestamp Unix dans un entier signé 32 bits (int32) atteignent leur valeur maximale de 2 147 483 647 le 19 janvier 2038 à 03:14:07 UTC. La seconde suivante provoque un débordement vers une date négative en décembre 1901."
  - question: "Mes timestamps et dates saisies restent-ils confidentiels ?"
    answer: "Oui. Toutes les conversions temporelles et le formatage ISO 8601 s'exécutent localement dans votre navigateur via l'API JavaScript standard et BigInt, sans aucun transfert de données vers un serveur."
features:
  - "Détection automatique de l'échelle temporelle : secondes (10 chiffres), ms (13), µs (16) et ns (19)"
  - "Conversion bidirectionnelle instantanée entre timestamp Unix, format ISO 8601 / RFC 3339 et fuseau local"
  - "Précision exacte jusqu'à la nanoseconde grâce à l'arithmétique entière BigInt sans perte IEEE 754"
  - "Calcul rapide des durées relatives et des dates d'expiration pour les jetons JWT (exp, iat, nbf)"
  - "Exécution 100 % côté client sans journalisation ni envoi des données sur le réseau"
useCases:
  - "Vérifier la date exacte d'expiration (exp) et d'émission (iat) d'un jeton JWT en débogage"
  - "Corréler des journaux applicatifs exprimés en millisecondes avec des événements d'infrastructure en secondes"
  - "Tester des requêtes SQL ou des index temporels avant une migration vers des entiers 64 bits"
  - "Convertir une date ISO 8601 issue d'une API REST en entier Unix pour des tests automatisés"
  - "Calculer des horizons temporels futurs au-delà du seuil critique du 19 janvier 2038"
howToSteps:
  - "Collez un timestamp numérique (10 à 19 chiffres) ou une chaîne ISO 8601 dans le champ d'entrée."
  - "Vérifiez l'échelle détectée (secondes, millisecondes, microsecondes ou nanosecondes) et ajustez-la si besoin."
  - "Lisez simultanément l'horodatage normalisé en UTC (RFC 3339) et dans le fuseau horaire de votre navigateur."
  - "Copiez le format converti vers vos requêtes SQL, scripts de test ou outils d'observabilité."
---

La manipulation des horodatages constitue une source fréquente de bogues subtils dans les systèmes distribués : un décalage d'un facteur 1 000 entre secondes et millisecondes place une date d'expiration en janvier 1970, tandis qu'une confusion entre heure locale et UTC décale les journaux de plusieurs heures. Ce convertisseur bidirectionnel traduit instantanément tout timestamp Unix en date lisible ISO 8601 et inversement.

Respectant une confidentialité stricte, l'outil exécute l'intégralité des calculs temporels côté client dans votre navigateur. Vos horodatages de journaux d'audit, vos valeurs issues de charges utiles JWT ou vos données de télémétrie restent strictement privés et ne transitent par aucun serveur.

## Spécification technique : Epoch Unix, ISO 8601 et précision temporelle

Le temps Unix (ou temps POSIX) mesure l'écoulement du temps en comptant les secondes depuis l'Epoch fixée au `1970-01-01T00:00:00Z` (minuit UTC le 1er janvier 1970). Conformément à la norme POSIX.1, chaque journée compte exactement 86 400 secondes : les secondes intercalaires (leap seconds) ajoutées occasionnellement au temps UTC astronomique ne sont pas comptabilisées, ce qui garantit un calcul calendaire purement arithmétique mais impose aux serveurs NTP d'appliquer un lissage (leap smearing) lors de ces rares événements.

La représentation textuelle de référence sur le Web et dans les API REST suit la norme **ISO 8601** et son profil strict **RFC 3339**, sous la forme `YYYY-MM-DDTHH:mm:ss.sssZ` (le suffixe `Z` indiquant UTC, ou un décalage explicite comme `+01:00`). Sur le plan informatique, la précision varie selon les langages : JavaScript (`Date.now()`) utilise les millisecondes, tandis que Go (`time.UnixNano()`), OpenTelemetry et Prometheus manipulent des nanosecondes. En JavaScript, le type `Number` (flottant double précision IEEE 754) perd sa précision au-delà de `Number.MAX_SAFE_INTEGER` (`9 007 199 254 740 991`), ce qui empêche de représenter fidèlement un timestamp en nanosecondes (19 chiffres) sans recourir à l'arithmétique entière `BigInt`.

Pour éviter toute ambiguïté lors de l'ingestion de données hétérogènes, les systèmes de télémétrie utilisent l'ordre de grandeur numérique pour distinguer l'unité : autour de `1,7 × 10^9` pour les secondes, `1,7 × 10^12` pour les millisecondes, `1,7 × 10^15` pour les microsecondes et `1,7 × 10^18` pour les nanosecondes. Ce convertisseur applique cette heuristique tout en vous permettant de forcer l'unité souhaitée pour les dates historiques proches de 1970.

## Cas pratique : inspecter les claims JWT exp/iat et corréler des logs

Lorsqu'un utilisateur signale une déconnexion prématurée, le développeur extrait fréquemment la charge utile d'un jeton JWT (JSON Web Token, RFC 7519) et observe les valeurs suivantes :

```json
{
  "sub": "usr_94821",
  "iat": 1795752890,
  "nbf": 1795752890,
  "exp": 1795756490
}
```

Ces trois claims sont exprimés en **secondes** (10 chiffres). Pour vérifier la durée de vie exacte en JavaScript sans erreur d'échelle, il convient de multiplier par `1000` avant d'instancier un objet `Date` ou de comparer avec `Math.floor(Date.now() / 1000)` :

```javascript
const iatMs = 1795752890 * 1000;
const expMs = 1795756490 * 1000;

console.log(new Date(iatMs).toISOString()); // "2026-11-27T04:14:50.000Z"
console.log(new Date(expMs).toISOString()); // "2026-11-27T05:14:50.000Z"
// Durée de validité : 3 600 secondes (1 heure)
```

À l'inverse, si vous corrélez cet événement avec un journal Elasticsearch ou Node.js contenant `1795753105412` (13 chiffres), le convertisseur détecte automatiquement l'échelle en millisecondes et affiche `2026-11-27T04:18:25.412Z`, confirmant que la requête a eu lieu 3 minutes et 35 secondes après l'émission du jeton.

## Tableau de référence des échelles temporelles et formats

Le tableau ci-dessous présente les ordres de grandeur actuels et les seuils techniques associés à chaque unité de timestamp :

| Échelle / Format | Nombre de chiffres (actuel) | Exemple représentatif | Équivalent UTC (ISO 8601) | Usage écosystème principal |
| --- | --- | --- | --- | --- |
| Secondes (`s`) | 10 chiffres | `1795752890` | `2026-11-27T04:14:50Z` | JWT (`exp`, `iat`), Python, C, Linux |
| Millisecondes (`ms`) | 13 chiffres | `1795752890123` | `2026-11-27T04:14:50.123Z` | JavaScript `Date.now()`, Java, SQL `BIGINT` |
| Microsecondes (`µs`) | 16 chiffres | `1795752890123456` | `2026-11-27T04:14:50.123456Z` | PostgreSQL, traces Chrome, Parquet |
| Nanosecondes (`ns`) | 19 chiffres | `1795752890123456789` | `2026-11-27T04:14:50.123456789Z` | Go `UnixNano()`, OpenTelemetry, InfluxDB |
| ISO 8601 / RFC 3339 | Chaîne normalisée | `2026-11-27T04:14:50Z` | `2026-11-27T04:14:50Z` | API REST, JSON Schema, journaux audit |
| Seuil 32 bits (`int32`) | 10 chiffres (max) | `2147483647` | `2038-01-19T03:14:07Z` | Limite critique du bogue de l'an 2038 |

## Pièges en production : bogue de l'an 2038, précision et fuseaux

Plusieurs erreurs classiques affectent la fiabilité temporelle des applications en production :

- **Débordement 32 bits en 2038 (Y2K38)** : un entier signé sur 32 bits plafonne à `2 147 483 647`, soit le `2038-01-19T03:14:07Z`. Toute échéance à long terme (prêt immobilier de 20 ans, certificat TLS longue durée, contrat d'assurance) calculée dès aujourd'hui dépasse déjà ce seuil. Utilisez impérativement des entiers 64 bits (`int64` ou `BIGINT`) et évitez le type historique `TIMESTAMP` sur d'anciens moteurs MySQL 5.x/8.0 non migrés.
- **Confusion secondes vs millisecondes dans les API** : passer un timestamp de 13 chiffres à une fonction attendant des secondes génère une date située en l'an 58 000 ; à l'inverse, passer 10 chiffres à `new Date()` renvoie janvier 1970. Validez systématiquement les bornes numériques aux frontières de vos services.
- **Troncature silencieuse en JavaScript** : ne stockez jamais un timestamp en nanosecondes dans un champ JSON parsé en `Number` JavaScript, car les trois derniers chiffres seraient arrondis. Transférez les nanosecondes sous forme de chaîne de caractères ou manipulez-les avec `BigInt`.
- **Mesure de durées avec une horloge murale** : l'horloge système peut reculer lors d'une resynchronisation NTP. Pour mesurer une latence ou un timeout, préférez une horloge monotone (`performance.now()` ou `process.hrtime.bigint()`) et réservez le timestamp Unix à l'horodatage d'événements.
