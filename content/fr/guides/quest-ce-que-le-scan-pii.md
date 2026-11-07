---
title: "Qu’est-ce que le Scan PII ? Guide Complet de Détection des Données Sensibles"
description: "Découvrez comment fonctionne l’analyse des données à caractère personnel (PII), quels identifiants sensibles contiennent vos bases de données et comment prévenir les fuites de données."
---

## Qu’est-ce qu’une Donnée à Caractère Personnel (PII) ?

Les **données à caractère personnel (PII — Personally Identifiable Information)** désignent toute information permettant d’identifier directement ou indirectement une personne physique. Dans les architectures SQL, PostgreSQL, MySQL et les exports JSON/CSV, le **scan PII automatisé** identifie les colonnes et valeurs sensibles avant que les jeux de données ne soient partagés avec des environnements de test ou d’analytique.

### Identifiants Directs et Quasi-Identifiants
- **Identifiants Directs** : Nom complet, numéro de sécurité sociale (NIR/SSN), adresse e-mail, numéro de téléphone, IBAN, numéro de carte bancaire (PAN) et adresse IP.
- **Quasi-Identifiants** : Date de naissance, code postal, profession et données de géolocalisation pouvant permettre une ré-identification par recoupement.

## Comment Fonctionne la Détection PII Côté Client

Un moteur d’inspection PII de niveau industriel repose sur trois mécanismes complémentaires :
1. **Analyse Sémantique des Schémas** : Inspection des noms de colonnes (`email`, `telephone`, `iban`, `carte_bancaire`) dans les dumps SQL et en-têtes CSV.
2. **Expressions Régulières et Contrôles Mathématiques** : Vérification syntaxique combinée à l’**algorithme de Luhn** pour les numéros PAN et aux normes ISO pour les identifiants bancaires.
3. **Anonymisation Immédiate en Mémoire** : Transformation locale par hachage cryptographique SHA-256, tokénisation ou données synthétiques sans aucun transfert serveur.
