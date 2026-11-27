---
metaTitle: "Convertisseur SQL INSERT vers JSON : Migration et Typage"
metaDescription: "Transformez vos instructions SQL INSERT INTO VALUES en tableaux JSON typés. Gérez guillemets échappés, valeurs NULL et migrations vers NoSQL sans serveur."
metaKeywords: "convertisseur sql json, sql insert to json, parser sql values, migration rdbms nosql, convertir dump sql json, typage null sql, fixtures json"
title: "Convertisseur SQL INSERT vers JSON"
shortDescription: "Extrayez et convertissez instantanément vos instructions SQL INSERT INTO ... VALUES (...) en tableaux d'objets JSON strictement typés. Gérez automatiquement les chaînes échappées, valeurs NULL, booléens et insertions multi-lignes."
faqs:
  - question: "Comment l'outil gère-t-il les valeurs NULL, booléennes et numériques lors de la conversion ?"
    answer: "Notre analyseur lexical distingue les littéraux entre guillemets simples (traités comme des chaînes de caractères JSON) des valeurs brutes. Le mot-clé SQL NULL devient null en JSON, TRUE et FALSE deviennent des booléens natifs, et les entiers ou décimaux non quotés sont convertis en nombres JSON valides."
  - question: "Que se passe-t-il si une instruction INSERT omet la liste des noms de colonnes ?"
    answer: "Lorsque la clause INSERT INTO table (col1, col2) précise les colonnes, l'outil les utilise comme clés JSON. Si votre requête omet les colonnes (INSERT INTO table VALUES (...)), le convertisseur génère automatiquement des clés génériques ordonnées (column_1, column_2, etc.) afin de préserver l'intégrité de chaque tuple."
  - question: "Les apostrophes échappées comme '' ou \\' dans les chaînes SQL sont-elles conservées ?"
    answer: "Oui. Le parseur implémente une machine à états conforme au standard SQL ANSI et aux dialectes MySQL/PostgreSQL : il reconnaît les doubles apostrophes ('L''entreprise') ainsi que les échappements par antislash ('L\\'entreprise') et les virgules situées à l'intérieur des chaînes sans jamais casser le découpage des colonnes."
  - question: "Puis-je convertir un dump SQL contenant plusieurs lignes INSERT ou des tuples multiples ?"
    answer: "Oui. L'outil prend en charge à la fois les requêtes INSERT groupées à tuples multiples VALUES (...), (...), (...) et les séquences de plusieurs instructions INSERT INTO distinctes collées en bloc, en les consolidant dans un tableau JSON unique."
  - question: "Mes données SQL de production ou schémas propriétaires sont-ils envoyés à un serveur ?"
    answer: "Absolument pas. Tout le traitement lexical et la sérialisation JSON s'exécutent à 100 % côté client dans votre navigateur. Vos dumps, données clients ou jeux de tests ne transitent par aucun serveur distant."
features:
  - "Analyseur lexical SQL robuste gérant les parenthèses imbriquées, virgules internes et chaînes multi-lignes"
  - "Préservation fidèle des types JSON : null, booléens, nombres entiers/flottants et chaînes déséchappées"
  - "Support des dialectes courants : guillemets d'identifiants backticks, guillemets doubles et crochets"
  - "Consolidation automatique des instructions INSERT multi-lignes et des listes multi-tuples en un tableau JSON formaté"
  - "Confidentialité totale : exécution 100 % locale dans le navigateur sans aucun transfert réseau"
useCases:
  - "Migrer des jeux de données relationnels (PostgreSQL, MySQL, SQLite) vers des collections MongoDB, Firestore ou DynamoDB"
  - "Transformer des scripts seed.sql hérités en fixtures JSON typées pour des tests automatisés Jest, Vitest ou Playwright"
  - "Alimenter rapidement un serveur mock REST/GraphQL à partir d'un export SQL de base de données"
  - "Inspecter visuellement des dumps SQL volumineux ou mal formatés sous forme d'objets JSON structurés et lisibles"
  - "Préparer des jeux de données d'entraînement ou d'indexation vectorielle à partir d'enregistrements tabulaires SQL"
howToSteps:
  - "Collez une ou plusieurs instructions SQL INSERT INTO ... VALUES (...) dans la zone d'entrée."
  - "Vérifiez que les noms de colonnes sont présents ou laissez l'outil générer des clés par défaut si nécessaire."
  - "Inspectez le tableau JSON généré instantanément avec coloration syntaxique et typage automatique."
  - "Copiez le résultat ou téléchargez le fichier .json prêt à être importé dans votre base NoSQL ou suite de tests."
---

Les bases de données relationnelles exportent couramment leurs sauvegardes et jeux d'amorçage sous forme d'instructions `INSERT INTO ... VALUES (...)`. Pourtant, les applications modernes s'appuient de plus en plus sur des API REST, des bases orientées documents comme MongoDB, ou des outils de test front-end qui consomment nativement du JSON. Convertir manuellement ces tuples SQL avec des expressions régulières fragiles mène presque toujours à des erreurs sur les virgules dans les textes, les apostrophes échappées ou les valeurs `NULL`. Notre convertisseur résout ce problème grâce à une analyse syntaxique déterministe exécutée directement dans votre navigateur.

Vos schémas et extractions de base de données contiennent souvent des données sensibles ou confidentielles. C'est pourquoi notre outil fonctionne à 100 % côté client, sans aucun envoi vers un serveur externe. Que vous traitiez des données de pré-production, des fixtures de test ou des exports clients anonymisés, aucune information ne quitte la mémoire locale de votre navigateur.

## Analyse syntaxique des tuples SQL et gestion du typage

Contrairement à un simple découpage par `split(',')`, la conversion fiable d'une requête `INSERT` nécessite une véritable machine à états finis (automate lexical) respectant la grammaire SQL standard (ISO/IEC 9075). Un parseur naïf échoue dès qu'une chaîne contient une virgule, une parenthèse fermante ou une apostrophe échappée.

Notre moteur procède en trois phases distinctes :

1. **Extraction des identifiants de table et de colonnes** : l'analyseur normalise les délimiteurs d'identifiants propres à chaque SGBD — backticks `` `col` `` pour MySQL/MariaDB, guillemets doubles `"col"` pour PostgreSQL/SQLite, ou crochets `[col]` pour SQL Server — afin d'obtenir des clés JSON propres et uniformes.
2. **Tokenisation consciente du contexte** : lorsqu'il parcourt la clause `VALUES`, l'automate suit la profondeur des parenthèses et l'état de citation. À l'intérieur d'un littéral délimité par des apostrophes simples `'...'`, les caractères spéciaux (virgules, points-virgules, parenthèses) sont traités comme du texte pur. Les séquences d'échappement ANSI (`''` représentant une apostrophe littérale) et C-style (`\'`, `\n`, `\"`, `\\` utilisées par MySQL) sont correctement déséchappées avant la sérialisation JSON.
3. **Inférence stricte des types scalaires** : chaque jeton extrait est évalué selon sa nature lexicale. Un jeton quoté produit systématiquement une chaîne JSON (`string`), même s'il contient uniquement des chiffres comme un code postal `'01000'`, évitant ainsi la perte du zéro initial. À l'inverse, les jetons non quotés sont mappés sur les primitives JSON correspondantes : `NULL` devient `null`, `TRUE`/`FALSE` deviennent des booléens, et les nombres valides sont convertis en type numérique `number` (ou conservés en chaîne si la précision dépasse la limite IEEE 754).

## Parcours pratique : migration de fixtures PostgreSQL vers JSON

Imaginons que vous deviez migrer un script d'initialisation PostgreSQL contenant des profils utilisateurs, des descriptions avec virgules et apostrophes, des valeurs nulles et des booléens vers une collection NoSQL ou un fichier de fixture TypeScript :

```sql
INSERT INTO "users" ("id", "nom", "bio", "actif", "cp")
VALUES
  (1, 'Camille Laurent', 'Ingénieure DevOps, passionnée d''automatisation', TRUE, '06000'),
  (2, 'Lucas Mercier', 'Développeur back-end; expert SQL', FALSE, NULL);
```

Après passage dans le convertisseur, le parseur extrait les colonnes entre guillemets doubles, déséchappe `d''automatisation` en `d'automatisation`, préserve `'06000'` comme chaîne et type correctement `TRUE`, `FALSE` et `NULL` pour produire ce tableau JSON valide :

```json
[
  {"id": 1, "nom": "Camille Laurent", "bio": "Ingénieure DevOps, passionnée d'automatisation", "actif": true, "cp": "06000"},
  {"id": 2, "nom": "Lucas Mercier", "bio": "Développeur back-end; expert SQL", "actif": false, "cp": null}
]
```

Ce résultat peut être injecté directement via `mongoimport --jsonArray`, importé statiquement dans un module ESM (`import users from './users.json'`), ou chargé comme jeu de données initial dans une base documentaire locale durant vos tests d'intégration continus.

## Tableau de correspondance des types SQL vers JSON

Le tableau ci-dessous résume la manière dont les principales expressions et types SQL rencontrés dans les clauses `VALUES` sont traduits au format JSON (RFC 8259) :

| Type SQL | Exemple | Type JSON | Rendu et remarques |
| :--- | :--- | :--- | :--- |
| `VARCHAR`, `TEXT` | `'L''équipe'` | `string` | `"L'équipe"` (déséchappé) |
| `INT`, `BIGINT` | `42`, `-1050` | `number` | `42`, `-1050` |
| `DECIMAL`, `FLOAT` | `19.99`, `0.5` | `number` | `19.99`, `0.5` |
| `BOOLEAN` | `TRUE`, `FALSE` | `boolean` | `true`, `false` |
| `NULL` | `NULL` | `null` | `null` (non quoté) |
| `DATE`, `UUID` | `'2026-11-27'` | `string` | `"2026-11-27"` (ISO 8601) |
| Texte chiffré | `'00742'` | `string` | `"00742"` (zéros gardés) |

## Cas limites en production : échappement, encodage et gros volumes

Lors de la migration de véritables exports issus de `pg_dump` ou `mysqldump`, plusieurs cas limites peuvent survenir. Tout d'abord, certains dialectes comme MySQL autorisent des entiers booléens (`0` et `1`) dans les colonnes `TINYINT(1)`. Comme la clause `INSERT` seule ne contient pas le schéma `CREATE TABLE`, `0` et `1` sont convertis en nombres JSON : pensez à appliquer une passe de normalisation dans votre script cible si votre modèle NoSQL exige des booléens stricts.

Deuxièmement, les expressions dynamiques SQL présentes dans certains scripts manuels — telles que `NOW()`, `CURRENT_TIMESTAMP`, `UNHEX('...')` ou des sous-requêtes `SELECT` — ne constituent pas des littéraux scalaires évaluables statiquement. Si vos données contiennent des fonctions SQL ou des casts PostgreSQL comme `'{"a":1}'::jsonb`, privilégiez un export tabulaire propre ou retirez les annotations de cast superflues avant la conversion.

Troisièmement, portez attention aux très grands entiers (identifiants `BIGINT` de 64 bits comme les clés Snowflake) et aux montants financiers `DECIMAL` haute précision. Le standard JSON (RFC 8259) ne fixe pas de limite de précision aux nombres, mais la majorité des parseurs JSON JavaScript (`JSON.parse`) convertissent les nombres en flottants IEEE 754 sur 64 bits, risquant d'arrondir les entiers au-delà de 15 à 16 chiffres significatifs. Pour les identifiants critiques ou montants monétaires exacts, il reste recommandé côté base de données de les exporter entre apostrophes ou de les convertir en chaînes avant ingestion.

Enfin, vérifiez toujours l'encodage UTF-8 de vos fichiers SQL source avant de les traiter, particulièrement sous Windows où certains exports hérités utilisent encore Latin-1 (ISO-8859-1) ou Windows-1252. Un encodage cohérent garantit la préservation exacte des caractères accentués et des émojis lors du passage vers JSON.
