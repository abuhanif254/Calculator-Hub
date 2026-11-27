---
metaTitle: "Convertisseur CSV vers JSON en ligne — Typage & RFC-4180"
metaDescription: "Transformez vos fichiers CSV en JSON typé dans votre navigateur. Détection du délimiteur, champs entre guillemets RFC-4180 et ingestion API REST ou NoSQL."
metaKeywords: "csv vers json, convertisseur csv json, parser rfc 4180, détection délimiteur csv, inférence type json, ingestion nosql api rest"
title: "Convertisseur CSV vers JSON"
shortDescription: "Convertissez vos fichiers CSV en tableaux ou objets JSON structurés avec détection automatique du délimiteur, gestion des guillemets RFC-4180 et conversion typée."
faqs:
  - question: "Mes fichiers CSV confidentiels quittent-ils mon ordinateur lors de la conversion ?"
    answer: "Non. L'analyse lexicale du CSV, la détection du séparateur et la sérialisation JSON s'exécutent intégralement côté client dans votre navigateur. Aucune donnée n'est transmise à un serveur."
  - question: "Comment l'outil détecte-t-il automatiquement le délimiteur du CSV ?"
    answer: "L'analyseur évalue les premières lignes en dehors des paires de guillemets pour comparer la régularité des occurrences entre la virgule, le point-virgule, la tabulation et la barre verticale, sélectionnant le candidat le plus cohérent."
  - question: "Pourquoi faut-il faire attention à la conversion automatique des nombres ?"
    answer: "Convertir aveuglément toute chaîne numérique en type number peut supprimer les zéros initiaux d'un code postal comme 06000 ou altérer la précision d'un numéro SIRET à 14 chiffres ou d'un grand identifiant."
  - question: "Le convertisseur gère-t-il les retours à la ligne à l'intérieur d'une cellule CSV ?"
    answer: "Oui. Contrairement à un découpage naïf par split sur les sauts de ligne, notre automate à états RFC-4180 suit l'ouverture et la fermeture des guillemets afin de conserver les paragraphes multi-lignes dans une même propriété JSON."
  - question: "Comment gérer les fichiers CSV contenant des caractères accentués mal affichés ?"
    answer: "Si votre fichier source provient d'un vieil export Windows-1252 ou ISO-8859-1, convertissez-le en UTF-8 avant collage ou importez directement le fichier UTF-8 avec ou sans BOM pour que le parseur nettoie automatiquement le marqueur d'ordre d'octet."
features:
  - "Automate d'analyse strict RFC-4180 gérant guillemets doublés et cellules multi-lignes"
  - "Détection heuristique automatique des séparateurs virgule, point-virgule, tabulation et pipe"
  - "Inférence optionnelle des types JSON (nombres, booléens et valeurs nulles)"
  - "Suppression transparente du marqueur UTF-8 BOM en début de fichier"
  - "Traitement 100 % navigateur adapté aux jeux de données internes et RGPD"
useCases:
  - "Transformer un export tableur en tableau JSON prêt pour une requête POST sur une API REST"
  - "Alimenter une collection MongoDB, Firestore ou DynamoDB à partir de fichiers métiers"
  - "Convertir des fichiers de traduction ou de configuration CSV en dictionnaires JSON typés"
  - "Préparer des jeux de test unitaires et des fixtures JSON pour vos suites Jest ou Vitest"
  - "Nettoyer et structurer des données ouvertes (Open Data) avant indexation dans un moteur de recherche"
howToSteps:
  - "Collez votre contenu CSV ou chargez un fichier local dans la zone de saisie."
  - "Vérifiez le délimiteur détecté automatiquement ou forcez manuellement le point-virgule ou la virgule."
  - "Activez ou désactivez l'inférence de types (nombres et booléens) selon les exigences de votre schéma cible."
  - "Copiez le JSON formaté ou téléchargez le fichier pour l'injecter dans votre application ou base NoSQL."
---

L'importation de données tabulaires issues de tableurs ou de progiciels vers des API REST et des bases de données NoSQL commence presque toujours par une conversion CSV vers JSON. Notre outil exécute l'ensemble du parseur directement dans la mémoire de votre navigateur : aucune donnée n'est téléversée vers un serveur distant, garantissant une confidentialité totale pour vos fichiers clients, exports comptables et jeux de données soumis au RGPD.

Là où un découpage naïf par expression régulière échoue dès qu'un champ contient une virgule, un point-virgule ou un saut de ligne, une véritable conversion destinée à la production exige un analyseur lexical conforme à la norme RFC-4180 et un contrôle fin sur la conversion des types primitifs.

## Analyse syntaxique RFC-4180 et inférence de types

Un document CSV valide n'est pas un simple texte séparé par des virgules. Selon la spécification RFC-4180, un champ peut être encadré de guillemets doubles (`"..."`) pour protéger des délimiteurs internes, des sauts de ligne intégrés ou d'autres guillemets doublés (`""`). Un parseur fiable doit donc implémenter une machine à états caractère par caractère plutôt qu'un simple découpage ligne par ligne.

Le moteur de conversion applique quatre étapes déterministes :

1. **Normalisation d'entrée et suppression du BOM** : le préfixe UTF-8 BOM (`\uFEFF`) souvent inséré par Excel est retiré de la première cellule afin d'éviter qu'une clé d'en-tête ne devienne `"\uFEFFid"` et ne casse silencieusement vos requêtes API.
2. **Détection du délimiteur** : si aucun séparateur n'est imposé, l'analyseur inspecte les premières lignes hors guillemets et compare la variance du nombre de colonnes produites par la virgule (`,`), le point-virgule (`;`), la tabulation (`\t`) et la barre verticale (`\|` ou pipe).
3. **Construction des objets** : la première ligne sert de référence pour les clés JSON. Chaque ligne suivante est associée positionnellement aux en-têtes.
4. **Coercition typée (type coercion)** : en CSV, toute donnée est fondamentalement textuelle. Le mode typé convertit les chaînes `"true"` / `"false"` en booléens JSON, les littéraux numériques valides en `number`, et les cellules vides en `null` ou `""` selon la configuration retenue. Il reste toutefois essentiel de pouvoir désactiver cette heuristique lorsque vous manipulez des identifiants métier formatés comme des chaînes.

## Cas pratique : préparer un export CSV pour une API REST ou NoSQL

Considérons un export CSV francophone issu d'un outil de gestion commerciale. Notez l'usage du point-virgule, d'un libellé protégé par des guillemets contenant lui-même un point-virgule et des guillemets doublés, ainsi que des valeurs booléennes et numériques :

```csv
sku;libelle;prixHT;enStock;tags
"SKU-001";"Clavier mécanique ""Pro""; AZERTY";129.90;true;périphérique
"SKU-002";"Câble USB-C
2 mètres";14.50;false;accessoire
```

Après passage dans l'automate RFC-4180 avec inférence des types activée, vous obtenez un tableau JSON immédiatement consommable par `fetch()`, `curl` ou `mongoimport --jsonArray` :

```json
[
  {
    "sku": "SKU-001",
    "libelle": "Clavier mécanique \"Pro\"; AZERTY",
    "prixHT": 129.9,
    "enStock": true,
    "tags": "périphérique"
  },
  {
    "sku": "SKU-002",
    "libelle": "Câble USB-C\n2 mètres",
    "prixHT": 14.5,
    "enStock": false,
    "tags": "accessoire"
  }
]
```

Le retour à la ligne contenu dans le libellé de `SKU-002` est préservé sous forme de séquence d'échappement JSON `\n`, et les guillemets doublés de `SKU-001` sont correctement déséchappés.

## Matrice de comparaison des modes de conversion et typage

Adaptez les règles d'analyse en fonction de la propreté de votre source CSV et du validateur côté serveur :

| Comportement | Mode strict (chaînes) | Mode typé (inférence) | Usage recommandé |
| :--- | :--- | :--- | :--- |
| Nombres (`"42"`, `"12.5"`) | Conservés en `"42"` | Convertis en `42`, `12.5` | Identifiants texte vs métriques numériques |
| Zéros initiaux (`"06000"`) | Préservés (`"06000"`) | Risque de perte (`6000`) | Codes postaux, numéros de téléphone, SIRET |
| Booléens (`"true"`, `"false"`) | Conservés en texte | Convertis en `true` / `false` | Drapeaux d'état pour bases NoSQL |
| Cellules vides (`;;`) | Chaîne vide `""` | `null` ou propriété omise | Schémas stricts avec champs optionnels |
| Format de sortie | Tableau d'objets `[{...}]` | Tableau de tableaux `[[...]]` | API REST / MongoDB vs matrices brutes |
| En-têtes en double | Écrasement ou suffixe | Alerte de collision | Audit qualité avant ingestion ETL |

## Pièges en production, sécurité et intégrité des données

Lorsqu'un fichier CSV est converti pour alimenter une base de données ou un service backend, plusieurs écueils classiques doivent être anticipés :

- **Perte des zéros initiaux et précision IEEE 754** : en JavaScript et JSON standard, tout nombre est stocké en virgule flottante double précision. Un identifiant à 18 chiffres (comme un ID Twitter/Snowflake ou un numéro de compte) converti en `number` perdra ses derniers chiffres au-delà de `Number.MAX_SAFE_INTEGER` (`9007199254740991`), et un code postal `"01000"` deviendra `1000`. Gardez le mode chaîne pour les identifiants ou validez les types avec un schéma strict après conversion.
- **Pollution de prototype via les en-têtes** : si un fichier CSV provenant d'un tiers contient une colonne nommée `__proto__`, `constructor` ou `prototype`, une affectation naïve sur un objet JavaScript brut peut altérer le comportement de l'application réceptrice. Créez toujours des objets avec `Object.create(null)` ou assainissez les clés avant l'ingestion en production.
- **Lignes irrégulières (ragged rows)** : certains exports mal formés comportent plus ou moins de colonnes que la ligne d'en-tête. Vérifiez la cohérence du nombre de champs avant d'insérer les documents JSON dans une collection, et assurez-vous qu'aucun délimiteur non protégé ne subsiste dans les champs textuels libres.
- **Encodage Windows-1252 et Mojibake** : un fichier généré par d'anciens systèmes ERP français utilise parfois l'encodage ANSI/Windows-1252 plutôt qu'UTF-8. L'apparition du caractère de remplacement Unicode `U+FFFD` (``) signale un mauvais décodage source qu'il convient de ré-encoder proprement en UTF-8 avant toute conversion vers votre API.
- **Validation des schémas avant insertion** : même après une conversion syntaxique réussie, considérez le JSON résultant comme une donnée non fiable tant qu'il n'a pas passé un validateur applicatif (JSON Schema ou Zod) vérifiant les plages numériques et les formats de dates ISO 8601.
