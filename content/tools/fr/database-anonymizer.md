---
metaTitle: "Anonymiseur Base de Données SQL & CSV | Masquage PII RGPD"
metaDescription: "Détectez 31 types de PII et anonymisez vos exports CSV, TSV, JSON ou SQL localement dans le navigateur avec 10 stratégies RGPD et zéro envoi serveur."
metaKeywords: "anonymiseur base de données, masquer pii sql csv, anonymisation rgpd, pseudonymisation données test, masquage données personnelles, dump sql anonymisé, conformité cnil hipaa, données synthétiques staging"
title: "Anonymiseur de Base de Données SQL & CSV"
shortDescription: "Détectez automatiquement 31 classes de données personnelles (PII) et secrets dans vos exports CSV, TSV, JSON ou SQL, puis anonymisez-les localement dans le navigateur via 10 stratégies configurables sans aucun envoi serveur."
faqs:
  - question: "Cet anonymiseur transfère-t-il mes dumps de production vers un serveur distant ?"
    answer: "Jamais. L'ingestion du fichier, le profilage PII, l'application des 10 stratégies de masquage et l'export CSV, JSON ou TSV s'exécutent entièrement dans la mémoire locale de votre navigateur. Une fois la page chargée, vous pouvez même couper votre connexion réseau et traiter vos jeux de données hors ligne."
  - question: "Comment anonymiser un dump SQL brut issu de PostgreSQL ou MySQL ?"
    answer: "Extrayez les tables sensibles en CSV, TSV ou JSON à l'aide de commandes natives comme PostgreSQL COPY TO STDOUT, MySQL SELECT INTO OUTFILE ou mongoexport, masquez les colonnes identifiées dans cet espace local, puis réimportez le fichier assaini dans votre base de préproduction. Les journaux texte (.txt et .log) sont aussi pris en charge."
  - question: "Quels types de données personnelles (PII) et de secrets sont détectés automatiquement ?"
    answer: "Le détecteur hybride couvre 31 classes d'identifiants réparties par niveau de risque (Élevé, Moyen, Faible) : e-mails, téléphones, numéros SSN, cartes bancaires PAN, IBAN, dates de naissance, adresses postales, IPv4/IPv6, adresses MAC, dossiers médicaux, condensats de mots de passe, clés API et jetons JWT."
  - question: "Quelle stratégie choisir pour préserver les jointures SQL ou la distribution statistique ?"
    answer: "Utilisez Tokenize ou Deterministic Hash pour conserver une correspondance bijective d'égalité permettant les jointures et la déduplication entre lignes. Choisissez Shuffle Column (permutation de Fisher-Yates) lorsque vos requêtes BI ou votre pagination exigent exactement la même cardinalité, les mêmes extrêmes et le même taux de valeurs nulles."
  - question: "Quelles sont les limites de taille et de volume en exécution côté client ?"
    answer: "Le moteur navigateur accepte des fichiers jusqu'à 50 Mo et analyse jusqu'à 50 000 lignes par session aux formats CSV, TSV, JSON, TXT et LOG. Pour des dumps de production de plusieurs gigaoctets, extrayez au préalable un échantillon représentatif via LIMIT ou TABLESAMPLE avant le masquage."
features:
  - "Exécution 100 % côté client dans le navigateur sans téléversement cloud, stockage disque ni appel API externe"
  - "Moteur hybride de détection PII analysant 31 classes d'identifiants et secrets par densité d'expressions régulières, alias d'en-têtes et pondération de spécificité"
  - "10 stratégies de masquage configurables par colonne : masquage partiel, données synthétiques, hachage déterministe, tokenisation, préservation de format, mélange Fisher-Yates, décalage de dates, généralisation, caviardage et nullification"
  - "Détection automatique et parsing robuste pour CSV RFC 4180, TSV, tableaux d'objets JSON hétérogènes et journaux TXT/LOG jusqu'à 50 Mo et 50 000 lignes"
  - "Profilage des colonnes classé par risque (Élevé, Moyen, Faible) avec score de confiance en pourcentage et interrupteurs individuels"
  - "Tableau d'aperçu comparatif Original contre Anonymisé et export en un clic vers CSV, JSON ou TSV"
useCases:
  - "Assainir des exports PostgreSQL, MySQL ou SQLite avant d'alimenter les postes développeurs et les bases de préproduction CI/CD"
  - "Masquer les e-mails clients, numéros de sécurité sociale et cartes bancaires dans des extractions CRM/ERP transmises à des prestataires QA externes"
  - "Préparer des jeux de données analytiques conformes au RGPD et au cadre HIPAA Safe Harbor par mélange de colonnes et généralisation numérique"
  - "Nettoyer les jetons JWT, clés API, empreintes de mots de passe et adresses IP capturés par erreur dans des fichiers LOG avant ouverture d'un ticket d'incident"
  - "Produire des jeux de test réalistes à partir de collections MongoDB ou d'API REST JSON sans casser les validateurs de schéma ni l'interface"
  - "Construire des tables tokenisées préservant l'intégrité référentielle des clés étrangères au sein d'un même export sans exposer l'identité réelle"
howToSteps:
  - "Exportez les tables cibles en CSV, TSV, JSON ou TXT/LOG (jusqu'à 50 Mo et 50 000 lignes), ou cliquez sur le jeu d'essai intégré pour tester le flux."
  - "Glissez-déposez votre fichier dans la zone d'import afin de déclencher la détection automatique du format et le découpage local des colonnes."
  - "Consultez le rapport d'analyse PII affichant le volume de lignes, les colonnes signalées, leur niveau de risque et leur indice de confiance."
  - "Activez ou désactivez chaque colonne et attribuez-lui la stratégie appropriée (données synthétiques pour les e-mails, préservation de format pour les IP, tokenisation pour les clés)."
  - "Cliquez sur lancer l'anonymisation pour traiter toutes les lignes en mémoire, puis basculez entre les vues Original et Anonymisé dans l'aperçu."
  - "Sélectionnez CSV, JSON ou TSV dans le menu d'export et téléchargez le fichier nettoyé prêt pour votre environnement de test."
---

Copier un dump brut de production vers un serveur de préproduction, un pipeline CI/CD ou un poste développeur expose immédiatement aux fuites de données, aux envois accidentels d'e-mails clients et aux violations du principe de minimisation du **RGPD**. Maintenir des scripts Python ou SQL ponctuels à chaque migration de schéma reste fragile. Notre **Anonymiseur de Base de Données SQL & CSV** traite vos exports CSV, TSV, JSON et journaux TXT/LOG directement dans la mémoire du navigateur — jusqu'à **50 Mo** et **50 000 lignes** sans aucun envoi réseau —, détecte **31 classes de données personnelles (PII) et secrets**, puis applique dix stratégies granulaires par colonne.

## Internes du parseur multi-formats et détection hybride des PII

Avant le profilage, le moteur reconnaît la syntaxe via l'extension et des marqueurs structurels (`[` ou `{` pour JSON, fréquence tabulations contre virgules pour TSV/CSV, ou mode monoligne pour `.txt`/`.log`). Le lecteur CSV **RFC 4180** préserve les virgules dans les chaînes citées, décode les guillemets doublés (`""`) et aligne les lignes incomplètes sur l'en-tête. Pour JSON, le parseur calcule l'union complète des clés sur les objets hétérogènes afin de ne perdre aucun champ optionnel.

Un filtrage limité aux noms de colonnes manque les champs obscurcis (`attr_1`, `payload`), tandis qu'un scan purement regex confond souvent des numéros de commande avec des téléphones. Le moteur combine deux signaux pondérés :

1. **Densité de motifs échantillonnés (jusqu'à 60 points)** : jusqu'à 200 cellules non vides par colonne sont testées contre 31 expressions compilées couvrant neuf domaines : Contact (`email`, `phone`, `url`, `username`), Identité (`full_name`, `first_name`, `last_name`), Pièces officielles (`ssn`, `passport`, `national_id`, `drivers_license`), Financier (`credit_card`, `bank_account`, `iban`, `tax_id`), Réseau (`ip_address`, `ipv6`, `mac_address`, `device_id`), Démographie (`date_of_birth`, `gender`, `age`), Localisation (`address`, `zip_code`, `coordinates`), Médical (`medical_record`) et Sécurité (`password_hash`, `api_key`, `jwt_token`, `vin`, `uuid`).
2. **Alias d'en-têtes et spécificité** : les en-têtes normalisés du dictionnaire (`pan`, `card_no`, `remote_addr`, `mrn`, `passwd`) ajoutent **+35 points** (ou déclenchent un score de 65 % sur colonnes clairsemées). Des bonus de priorité (**+20** pour SSN et préfixes Visa/Mastercard/Amex/Discover ; **+15** pour e-mails) évitent qu'une règle numérique générique masque un identifiant strict.

Au-delà de **20 %**, chaque colonne reçoit un niveau de risque (`Élevé`, `Moyen`, `Faible`) et une règle par défaut adaptée : synthétique pour noms/e-mails, masquage partiel pour cartes/SSN, préservation de format pour IP, tokenisation pour UUID et décalage pour dates de naissance.

## Comparatif des 10 stratégies de masquage par colonne

Choisir la bonne stratégie équilibre résistance à la ré-identification, contraintes SQL et valeur analytique :

| Stratégie | Exemple de sortie | Jointure | Fidélité statistique | Usage d'ingénierie |
| :--- | :--- | :---: | :--- | :--- |
| **Redact** | `[REDACTED]` | Non | Aucune | Caviarder notes, clés API ou secrets |
| **Nullify** | *(vide)* | Non | Aucune | Vider les champs nullables |
| **Partial Mask** | `****-****-****-1111` | Non | Extrémités | Tester reçus et interfaces masquées |
| **Deterministic Hash** | Empreinte 64 hex | Oui | Cardinalité | Déduplication et correspondance |
| **Synthetic Data** | `bob.johnson@test.org` | Non | Syntaxe réaliste | Jeux de préproduction et démos UI |
| **Format-Preserving** | `847.392.4.615` | Non | Longueur / masque | Contraintes SQL `CHECK` strictes |
| **Tokenize** | `TOK_000001` | Oui | Cardinalité | Clés étrangères intra-fichier |
| **Shuffle Column** | Permute les cellules | Non | Exacte (100 %) | Histogrammes BI et plans SQL |
| **Date Shift (±30 j)** | `1990-04-02` | Non | Approximative | Préserver l'ordre chronologique |
| **Generalize** | `30-40` ou `1990` | Classes | Tranches larges | Réduire les quasi-identifiants |

Deux mécanismes comptent en revue de sécurité. **Shuffle Column** exécute une permutation impartiale de **Fisher-Yates** sur la colonne, gardant intactes cardinalité, bornes et fréquence des valeurs nulles tout en rompant le lien individuel. **Tokenize** maintient en RAM une table éphémère (`TOK_000001`, `TOK_000002`) réinitialisée à chaque passe, assurant la cohérence des doublons sans jamais écrire de clé de réversibilité sur disque.

## Extraction, nettoyage et réimportation de dumps SQL volumineux

Comme un dump `.sql` de plusieurs gigaoctets mêle DDL et blocs de données, extrayez des tranches bornées en CSV ou JSON, nettoyez-les localement puis rechargez-les en préproduction :

```bash
# 1. PostgreSQL : exporter 50 000 utilisateurs avec en-têtes CSV
psql "$PROD_REPLICA_URL" -c \
  "\copy (SELECT id, first_name, last_name, email, phone, dob, ip_address \
          FROM users ORDER BY id DESC LIMIT 50000) \
   TO 'users_slice.csv' WITH (FORMAT csv, HEADER true)"

# 2. MongoDB : exporter une collection en tableau JSON
mongoexport --uri="$PROD_MONGO_RO" --collection=customers \
  --limit=50000 --jsonArray --out=customers_slice.json

# 3. Réimporter le CSV anonymisé dans la base de staging
psql "$STAGING_DB_URL" -c \
  "\copy users(id, first_name, last_name, email, phone, dob, ip_address) \
   FROM 'anonymized_users_slice.csv' WITH (FORMAT csv, HEADER true)"
```

Vérifiez toujours les cinq premières lignes dans l'aperçu `Original` contre `Anonymisé` avant d'exporter en CSV RFC 4180, TSV ou JSON indenté. Vous pouvez auditer les délimiteurs dans la [Visionneuse CSV](/fr/outils/csv-viewer), formater vos requêtes via le [Formateur SQL](/fr/outils/sql-formatter), inspecter vos tableaux dans le [Formateur JSON](/fr/outils/json-formatter) ou créer des profils vierges avec le [Générateur de Données Utilisateurs Factices](/fr/outils/fake-user-data-generator).

## Conformité (RGPD, CNIL, HIPAA) et vigilance sécurité

### Anonymisation réelle contre pseudonymisation

Selon le **Considérant 26 du RGPD** et les critères de la CNIL (individualisation, corrélation, inférence), un jeu de données sort du champ légal uniquement si toute ré-identification devient raisonnablement impossible. Les hachages déterministes et jetons relèvent de la **pseudonymisation** (Article 4(5) RGPD) : ils limitent l'exposition en staging mais restent des données personnelles si une table de corrélation existe. Sous **HIPAA Safe Harbor** (45 CFR §164.514(b)(2)), neutralisez les 18 identifiants, notamment en ramenant les dates de naissance à l'année seule via `Generalize`.

### Faible entropie et quasi-identifiants composites

Proscrivez le hachage non salé sur des espaces réduits (SSN, téléphones, e-mails d'entreprise), vulnérables aux tables précalculées. Pour des jointures ETL inter-tables, préférez une signature à clé secrète — testable dans notre [Générateur HMAC](/fr/outils/hmac-generator). Enfin, auditez les **quasi-identifiants combinés** (`code_postal + date_de_naissance + genre`) et vérifiez tout `jwt_token` détecté via le [Décodeur JWT](/fr/outils/jwt-decoder) avant d'appliquer `Redact` ou `Nullify`.
