---
title: "Dé-identification des Données HIPAA : Safe Harbor vs Détermination d’Expert"
description: "Comprenez les exigences de dé-identification HIPAA selon 45 CFR §164.514 en comparant la méthode Safe Harbor (suppression des 18 identifiants) et l’évaluation statistique."
---

## Normes de Dé-identification HIPAA (45 CFR §164.514)

La réglementation américaine **HIPAA** encadre strictement les **données de santé protégées (PHI — Protected Health Information)**. Pour exploiter des bases de données médicales à des fins de test logiciel ou de recherche analytique, la norme prévoit deux voies légales de dé-identification :

### 1. La Méthode Safe Harbor (Sphère de Sécurité)
Impose la suppression ou le masquage systématique de **18 catégories d’identifiants**, notamment :
- Les noms des patients et de leurs proches.
- Les données géographiques plus précises que l’État (adresses postales et codes postaux complets).
- Toutes les dates précises liées au patient (naissance, admission, sortie, décès) à l’exception de l’année, ainsi que le regroupement des âges supérieurs à 89 ans.
- Les numéros de téléphone, adresses e-mail, numéros de sécurité sociale (SSN), numéros de dossier médical (MRN), adresses IP et identifiants biométriques.

### 2. La Méthode de Détermination d’Expert (Expert Determination)
Repose sur une évaluation mathématique et statistique formelle (application du **$k$-anonymat** et de la **$l$-diversité**) démontrant que le risque de ré-identification d’un patient est quasi nul.
