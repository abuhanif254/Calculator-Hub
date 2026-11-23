---
metaTitle: "Visionneuse et Éditeur CSV en Ligne | Analyse & JSON"
metaDescription: "Ouvrez, éditez, validez et analysez vos fichiers CSV RFC 4180 dans le navigateur. Détection UTF-8/BOM, filtres, tri et conversion CSV vers JSON."
metaKeywords: "visionneuse csv, éditeur csv en ligne, validateur csv rfc 4180, convertir csv en json, ouvrir fichier csv, délimiteur point-virgule, encodage utf-8 bom, analyseur csv gratuit"
title: "Visionneuse et Analyseur CSV"
shortDescription: "Ouvrez, éditez, validez et convertissez vos fichiers CSV en ligne dans une grille interactive 100 % côté client, avec gestion RFC 4180 et export JSON."
faqs:
  - question: "Pourquoi Excel affiche-t-il parfois toutes les colonnes CSV dans une seule cellule ?"
    answer: "En France et dans la majorité des pays européens, Excel utilise par défaut le point-virgule (;) comme séparateur de liste car la virgule est réservée aux décimales. Si le fichier provient d'un outil anglophone utilisant la virgule, Excel ne découpe pas les colonnes. Notre visionneuse détecte automatiquement le délimiteur réel."
  - question: "Comment corriger les accents cassés (Ã©, Ã¨, â‚¬) lors de l'ouverture d'un CSV ?"
    answer: "Ces caractères corrompus (mojibake) apparaissent lorsqu'un fichier encodé en UTF-8 sans BOM est ouvert en Windows-1252, ou inversement. Réexporter le tableau en UTF-8 propre (avec marque BOM si la destination est Microsoft Excel sous Windows) résout définitivement le problème."
  - question: "L'outil préserve-t-il les zéros initiaux des codes postaux, numéros SIRET ou codes EAN ?"
    answer: "Oui. Contrairement aux tableurs qui convertissent silencieusement '06000' en nombre '6000' ou basculent les identifiants à 14 chiffres en notation scientifique, notre analyseur conserve les chaînes textuelles brutes sans altération destructrice."
  - question: "Mes exports clients ou financiers CSV quittent-ils mon navigateur ?"
    answer: "Jamais. L'analyse syntaxique, l'édition de cellules, les statistiques de colonnes et la conversion vers JSON ou TSV s'exécutent intégralement en JavaScript local. Aucune donnée n'est envoyée sur un serveur distant."
  - question: "Comment fonctionne la validation structurelle d'un fichier CSV ?"
    answer: "Le parseur inspecte chaque enregistrement selon la norme RFC 4180 afin de repérer les guillemets non fermés, les lignes comportant un nombre de colonnes différent de l'en-tête, les doublons exacts et les cellules manquantes."
features:
  - "Parseur par machine à états conforme RFC 4180 gérant guillemets échappés et sauts de ligne internes"
  - "Détection automatique du délimiteur (virgule, point-virgule européen, tabulation TSV, pipe)"
  - "Grille interactive de type tableur avec édition en ligne, tri multi-colonnes, filtres et annulation (Ctrl+Z)"
  - "Panneau d'audit qualité : comptage des lignes/colonnes, valeurs nulles, doublons et détection de lignes mal formées"
  - "Conversion bidirectionnelle CSV vers JSON formaté avec correspondance automatique des en-têtes"
  - "Traitement 100 % côté client préservant les zéros initiaux et compatible avec l'export CSV, TSV, JSON et TXT"
useCases:
  - "Inspection et nettoyage d'exports PostgreSQL, MySQL ou BigQuery avant réimportation en base de données"
  - "Vérification rapide de catalogues e-commerce (Shopify, PrestaShop, WooCommerce) comportant prix et descriptions HTML"
  - "Débogage de fichiers comptables ou bancaires aux délimiteurs européens (;) avant intégration ERP"
  - "Transformation de jeux de données tabulaires en tableaux JSON prêts pour une API REST ou un script front-end"
  - "Audit de listes CRM (contacts, codes postaux, numéros de téléphone) sans corruption des zéros en tête par Excel"
  - "Validation de fichiers CSV volumineux ou légèrement malformés qui bloquent l'assistant d'import d'un SaaS"
howToSteps:
  - "Glissez-déposez votre fichier CSV dans la fenêtre ou collez directement son contenu brut."
  - "Vérifiez la détection automatique du séparateur (virgule, point-virgule ou tabulation) et de la ligne d'en-tête."
  - "Parcourez la grille, triez les colonnes ou filtrez par mot-clé pour isoler rapidement vos enregistrements."
  - "Cliquez dans une cellule pour corriger une valeur en ligne, avec historique complet d'annulation."
  - "Ouvrez l'onglet Analyse pour repérer les lignes décalées, les valeurs vides et les doublons."
  - "Exportez le jeu de données nettoyé au format CSV normalisé, TSV ou JSON structuré."
---

Le format **CSV (Comma-Separated Values)** demeure l'épine dorsale des échanges tabulaires entre bases de données, progiciels ERP, plateformes e-commerce et pipelines analytiques. Pourtant, derrière son apparente simplicité de texte brut se cachent de nombreux pièges : séparateurs régionaux incompatibles, guillemets mal échappés, sauts de ligne à l'intérieur des cellules et conflits d'encodage. Notre **Visionneuse et Analyseur CSV** analyse, édite, valide et convertit vos fichiers directement dans votre navigateur sans jamais altérer vos données sensibles.

## Internes du format RFC 4180 et parseur par machine à états

Contrairement à une idée répandue, découper un fichier CSV par un simple `ligne.split(',')` échoue dès qu'un jeu de données réel entre en jeu. La spécification **RFC 4180** (`text/csv`) définit des règles précises que seul un **automate fini** (machine à états parcourant le flux caractère par caractère) traite de manière fiable :

- **Encapsulation par guillemets doubles** : tout champ contenant le délimiteur, un retour à la ligne (`\r\n` ou `\n`) ou un guillemet doit être entouré de guillemets doubles (`"..."`).
- **Échappement des guillemets internes** : un guillemet littéral à l'intérieur d'un champ cité se note en le doublant (`""`), et non avec un antislash (`\"`) comme en JSON ou en C.
- **Enregistrements multilignes et fins de ligne** : un saut de ligne situé dans un champ cité fait partie intégrante de la valeur de la cellule et ne marque pas la fin de l'enregistrement. Bien que RFC 4180 recommande `CRLF` (`\r\n`), les outils Linux et macOS génèrent couramment `LF` (`\n`) ; l'automate normalise les deux conventions sans rompre l'alignement.
- **Variantes régionales européennes** : en environnement francophone, la virgule servant de séparateur décimal (`1 490,50`), le **point-virgule (`;`)** remplace fréquemment la virgule comme délimiteur de colonnes.

### Comparaison des formats d'échange tabulaire

| Format | Délimiteur / Structure | Typage natif | Sauts de ligne en cellule | Compatibilité Excel / SQL | Risque principal |
| :--- | :--- | :---: | :---: | :--- | :--- |
| **CSV (RFC 4180)** | Virgule `,` + guillemets `"` | Non (texte) | Oui (si cité) | Universelle (SQL, Python, BI) | Conflit décimal en locale FR |
| **CSV Européen** | Point-virgule `;` + guillemets `"` | Non (texte) | Oui (si cité) | Excellente sur Excel FR/EU | Parseurs US attendus sur `,` |
| **TSV** | Tabulation `\t` | Non (texte) | Limité | Très bonne (bio-info, CLI) | Tabulations parasites en texte |
| **JSON** | Arbre clé-valeur typé | Oui | Oui (`\n`) | API web, NoSQL, PostgreSQL | Plus verbeux (répétition des clés) |
| **XLSX** | Archive ZIP / XML binaire | Oui | Oui | Natif tableurs bureautiques | Lourd, lent, formules masquées |

## Encodage UTF-8, BOM et conversion structurée vers JSON

La corruption des caractères accentués (*mojibake*, par exemple `Éléphant` affiché en `Ã‰lÃ©phant` ou le symbole euro `€` encodé `0x80` en CP1252 contre `0xE2 0x82 0xAC` en UTF-8) provient presque toujours d'une divergence entre **UTF-8** et **Windows-1252 (CP1252)** ou **ISO-8859-1**. Sous Windows, Microsoft Excel interprète un fichier CSV en encodage système local à moins qu'il ne débute par un **BOM UTF-8** (*Byte Order Mark*, séquence d'octets `0xEF 0xBB 0xBF`). À l'inverse, certains scripts Unix ou commandes `COPY` PostgreSQL rejettent ce BOM invisible qui reste collé au nom de la première colonne (`\uFEFFsku`).

### Inférence de types et préservation des identifiants

Un fichier CSV ne portant aucune métadonnée de type, la transformation vers JSON ou vers une base relationnelle exige de la prudence. Convertir agressivement chaque valeur numérique détruit les zéros initiaux des codes postaux (`06000`), altère les numéros de téléphone internationaux (`+33...`) ou tronque la précision des numéros de carte et identifiants SIRET à 14 chiffres. Notre outil conserve les identifiants sous forme de chaînes fiables tout en respectant les champs multilignes et les guillemets doublés :

```csv
sku;designation;prix_eur;code_postal
"REF-001";"Écran 27"" IPS, calibré";349,90;"06000"
"REF-002";"Pack clavier
+ souris sans fil";89,50;"01200"
```

```json
[
  {
    "sku": "REF-001",
    "designation": "Écran 27\" IPS, calibré",
    "prix_eur": "349,90",
    "code_postal": "06000"
  },
  {
    "sku": "REF-002",
    "designation": "Pack clavier\n+ souris sans fil",
    "prix_eur": "89,50",
    "code_postal": "01200"
  }
]
```

## Sécurité et scénarios de dépannage courants

Lors de la préparation ou de l'audit de fichiers CSV en environnement professionnel, surveillez quatre anomalies critiques :

1. **Injection de formules CSV (*CSV Injection*)** : si une cellule issue d'un formulaire web commence par `=`, `+`, `-`, `@` ou une tabulation (par exemple `=HYPERLINK(...)`), son ouverture dans Excel ou LibreOffice peut déclencher une formule malveillante ou une exfiltration DDE. Inspectez les préfixes suspects dans la grille avant toute diffusion interne.
2. **Décalage silencieux de colonnes** : un seul guillemet non fermé à la ligne 412 absorbe toutes les lignes suivantes dans une unique cellule géante. L'onglet d'analyse signale immédiatement les écarts d'arité par rapport à la ligne d'en-tête.
3. **Performances locales sans limite serveur** : grâce au décodage local (`FileReader` et `TextDecoder`) et au filtrage en mémoire, vous pouvez inspecter des exports contenant des dizaines de milliers d'enregistrements sans subir la lenteur ni les conversions automatiques de dates d'un tableur lourd.
4. **Chaînes de conversion et de comparaison** : une fois vos données exportées en JSON, indentez-les dans notre [Formateur JSON](/fr/outils/json-formatter), comparez deux révisions d'un export via le [Comparateur de Différences](/fr/outils/diff-checker), préparez des requêtes avec le [Formateur SQL](/fr/outils/sql-formatter), ou publiez un extrait web avec le [Générateur de Tableaux HTML](/fr/outils/html-table-generator). Pour d'autres formats structurés, le [Formateur YAML](/fr/outils/yaml-formatter) et le [Formateur XML](/fr/outils/xml-formatter) complètent cet environnement local.
