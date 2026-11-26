---
title: "Qu’est-ce que le Scan PII ? Guide Complet de Détection des Données Sensibles"
description: "Fonctionnement technique du scan PII dans vos bases SQL, CSV et JSON : taxonomie des identifiants directs et quasi-identifiants, algorithmes de validation (Luhn, modulo 97) et anonymisation locale."
category: "Privacy & Security"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "database-anonymizer"
relatedType: "tool"
faqs:
  - question: "Quelle est la différence entre un identifiant direct et un quasi-identifiant lors d'un scan PII ?"
    answer: "Un identifiant direct permet à lui seul de désigner une personne physique sans ambiguïté : nom complet, adresse e-mail nominative, numéro de sécurité sociale (NIR), IBAN ou numéro de carte bancaire. Un quasi-identifiant ne suffit pas isolément (code postal, date de naissance, sexe, profession), mais leur combinaison permet une ré-identification statistique rapide par recoupement avec des sources publiques."
  - question: "Pourquoi les expressions régulières seules génèrent-elles trop de faux positifs ?"
    answer: "Une simple expression régulière de 16 chiffres confond un numéro de carte bancaire avec un identifiant de commande, un horodatage en microsecondes ou une référence logistique interne. Un moteur de scan PII fiable associe donc le motif syntaxique à une vérification mathématique (algorithme de Luhn, clé modulo 97) et à l'analyse sémantique du nom de colonne."
  - question: "Comment le scan PII vérifie-t-il les numéros de carte bancaire, IBAN et numéros NIR français ?"
    answer: "Chaque identifiant structuré obéit à une somme de contrôle normalisée : les numéros de carte bancaire (PAN) valident l'algorithme de Luhn en base 10 ; les IBAN européens vérifient le reste modulo 97 égal à 1 après réarrangement selon la norme ISO 13616 ; le NIR français contrôle sa clé à deux chiffres via la formule 97 − (N mod 97), avec gestion spécifique des départements corses 2A et 2B."
  - question: "Le scan PII côté client garantit-il qu'aucune donnée sensible ne quitte le poste de travail ?"
    answer: "Oui, à condition que le parseur SQL/CSV et le moteur de détection s'exécutent intégralement dans la mémoire vive du navigateur sans appel réseau sortant. Aucun dump de production n'est téléversé sur un serveur tiers, ce qui élimine le risque de transfert non autorisé au sens du RGPD et facilite l'auditabilité interne."
  - question: "À quelle fréquence faut-il exécuter une analyse PII sur des bases hors production ?"
    answer: "Idéalement à chaque rafraîchissement d'un environnement de recette ou de développement, ainsi qu'après toute migration de schéma ajoutant de nouvelles colonnes textuelles ou JSONB. Intégrer le scan dans la chaîne CI/CD empêche qu'un développeur n'importe par inadvertance des données clients réelles sur un poste local."
---

Les **données à caractère personnel (PII — Personally Identifiable Information)** désignent toute information se rapportant à une personne physique identifiée ou identifiable, directement ou indirectement, selon l'article 4 du Règlement Général sur la Protection des Données (RGPD). Dans les bases SQL (PostgreSQL, MySQL) et les exports CSV ou JSON, le **scan PII automatisé** inspecte schémas et valeurs pour localiser ces attributs sensibles avant toute copie vers un environnement de recette ou d'analytique.

Sans détection préalable, des identifiants clients critiques fuient rapidement dans des sauvegardes locales, des journaux applicatifs ou des jeux de test partagés. Pour auditer et assainir vos fichiers sans les exposer sur le réseau, notre [Outil d'Anonymisation de Base de Données](/fr/outils/database-anonymizer) exécute l'inspection PII et le masquage intégralement côté client, en mémoire locale.

## Taxonomie des données détectées : identifiants directs, indirects et sensibles

Un scanner PII efficace hiérarchise les colonnes selon trois niveaux de risque afin d'appliquer une règle de masquage adaptée :

- **Identifiants directs :** attributs qui isolent immédiatement un individu (nom complet, e-mail, numéro de téléphone, numéro de sécurité sociale NIR, IBAN, numéro de carte bancaire PAN, passeport, adresse IP publique).
- **Quasi-identifiants (identifiants indirects) :** données anodines isolément, mais hautement discriminantes combinées. Les études de référence en confidentialité statistique montrent que le triplet code postal, date de naissance et sexe identifie de façon unique plus de `85 %` d'une population.
- **Catégories particulières (art. 9 du RGPD) :** données médicales, biométriques, opinions politiques ou appartenance syndicale, soumises à un régime d'interdiction de principe.

## Architecture d'un moteur de détection PII multicouche

Pour obtenir un rappel élevé sans submerger les développeurs de fausses alertes, un moteur d'analyse combine trois couches de validation.

### 1. Analyse sémantique des schémas

Le moteur inspecte d'abord les métadonnées : noms de tables (`clients`, `facturation`) et de colonnes (`email_principal`, `num_secu`, `iban_remboursement`, `ip_connexion`), normalisés en ignorant accents, `snake_case` et `camelCase`. Cette analyse lexicographique multilingue produit un premier indice de probabilité sémantique.

### 2. Expressions régulières et sommes de contrôle mathématiques

Les candidats extraits par expressions régulières subissent une validation déterministe pour écarter les identifiants techniques génériques :

```text
Score global : S = w_col × S_schéma + w_val × S_syntaxe + w_chk × S_contrôle
Luhn (PAN)   : somme_pondérée(chiffres) mod 10 = 0
IBAN (ISO)   : valeur_numérique(BBAN + pays + clé) mod 97 = 1
NIR français : clé = 97 − (NIR_13_chiffres mod 97)
```

Lorsque l'intitulé de colonne est générique (`valeur_libre`, `payload`), l'entropie de Shannon et le taux de validation sur échantillon stratifié confirment la présence réelle de PII.

### 3. Analyse des champs textuels et anonymisation locale

Les colonnes `TEXT` ou `JSONB` renferment souvent des PII saisies librement (téléphone dans un ticket SAV, IBAN dans un commentaire). Le moteur découpe ces chaînes en jetons, applique la détection contextuelle et déclenche immédiatement le masquage en mémoire avant toute exportation.

## Exemple pratique pas à pas : audit d'un export SQL avant mise en recette

Une équipe prépare un jeu de recette à partir d'un dump PostgreSQL de `50 000` lignes comprenant `clients` (`18` colonnes) et `commandes`.

### Étape 1 : Profilage et élimination des faux positifs

Le scanner évalue les `18` colonnes sur un échantillon initial de `1 000` lignes, puis sur tout le flux :

1. `nom_complet`, `email_principal`, `iban_remboursement` et `ip_inscription` obtiennent un score supérieur à `0,95` par convergence sémantique et mathématique.
2. La colonne `ref_article_externe` contient des nombres à `12` chiffres : seules `98` valeurs sur `1 000` valident par hasard l'algorithme de Luhn (`9,8 %`, proche du taux aléatoire de `10 %`) et aucune ne respecte un préfixe téléphonique. Le moteur l'exclut, abaissant le taux de faux positifs de `14,0 %` à `0,8 %`.

### Étape 2 : Traitement des fuites en texte libre et masquage

Dans la colonne `note_sav` (`TEXT`), l'analyse repère `412` numéros de téléphone et `27` IBAN. L'équipe applique en mémoire un caviardage ciblé sur `note_sav` (`[MASQUÉ]`), une substitution synthétique sur `nom_complet` et `email_principal`, un hachage `HMAC-SHA256` sur `iban_remboursement`, et une généralisation à l'année sur `date_naissance`.

## Matrice des détecteurs PII et contrôles mathématiques associés

| Type de PII | Format / Norme | Contrôle mathématique ou structurel | Risque de faux positif | Réduction du bruit |
| :--- | :--- | :--- | :--- | :--- |
| **Carte bancaire (PAN)** | `13–19` chiffres (`ISO/IEC 7812`) | Algorithme de Luhn (`mod 10 = 0`) | Numéros de commande, EAN | Vérifier préfixes BIN/IIN (`4`, `51–55`) et contexte |
| **IBAN européen** | `15–34` car. (`ISO 13616`) | Réarrangement + `mod 97 = 1` | Références de virement | Longueur exacte par pays (`FR = 27`, `DE = 22`) |
| **NIR (Sécu FR)** | `15` chiffres (`13` + clé `2`) | `clé = 97 − (N mod 97)`, `2A/2B` | SIRET (`14` chiffres) | Exiger préfixe `1/2` et mois `01–12` ou `20+` |
| **Adresse e-mail** | `RFC 5322` simplifiée | Syntaxe `local@domaine.tld` | Identifiants de commits | Exclure `.local`, `.internal`, `.invalid` |
| **Téléphone** | `E.164` / ARCEP (`+33`, `01–09`) | Longueur stricte (`10` chiffres FR) | Codes postaux, timestamps | Pondérer selon intitulé colonne et séparateurs |
| **Adresse IP** | `IPv4` / `IPv6` | `4` octets `0–255` ou `8` blocs hex | Versions logicielles (`10.2.4.1`) | Exclure plages privées (`RFC 1918`) et `version` |

## Pièges courants et bonnes pratiques d'exploitation

Deux angles morts exigent une vigilance constante. D'une part, les champs encodés en Base64 ou chiffrés au niveau applicatif échappent aux expressions régulières et doivent être décodés ou inspectés en amont. D'autre part, un scan automatisé ne remplace pas la revue des identifiants métier construits par concaténation (initiales + année de naissance), qui restent juridiquement identifiants.

Intégrez systématiquement l'analyse PII dans vos pipelines d'extraction hors production en privilégiant un traitement local **Zero-Cloud** : vous supprimez tout transfert de données sensibles vers des tiers tout en automatisant la conformité technique.
