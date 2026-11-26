---
title: "Comprendre les Besoins Caloriques : Utiliser la Calculatrice de Métabolisme de Base"
description: "Le métabolisme de base expliqué : équations de Mifflin-St Jeor et Harris-Benedict, coefficients d'activité physique et calcul de la dépense énergétique journalière."
category: "Health"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "bmr-calculator"
faqs:
  - question: "Quelle différence y a-t-il entre le métabolisme de base et la dépense énergétique journalière ?"
    answer: "Le métabolisme de base (MB) correspond à l'énergie minimale consommée sur 24 heures par votre organisme au repos complet, à jeun et à neutralité thermique. La dépense énergétique journalière (DEJ) intègre en plus la thermogenèse alimentaire et l'ensemble de vos mouvements physiques, professionnels et sportifs."
  - question: "Pourquoi l'équation de Mifflin-St Jeor est-elle préférée à celle de Harris-Benedict ?"
    answer: "Publiée en 1990 à partir d'un échantillon moderne, l'équation de Mifflin-St Jeor prédit le métabolisme de base mesuré par calorimétrie indirecte à ±10 % près chez une large majorité d'adultes. La formule de Harris-Benedict, même révisée en 1984, tend à surestimer la dépense de repos d'environ 3 % à 5 %."
  - question: "Est-il dangereux de consommer moins de calories que son métabolisme de base ?"
    answer: "Oui sur la durée. Maintenir un apport inférieur au MB prive l'organisme de l'énergie requise pour ses fonctions vitales et déclenche une adaptation métabolique : baisse de la thermogenèse hors exercice, fatigue, fonte musculaire et perturbations hormonales. Les déficits durables doivent rester modérés par rapport à la DEJ."
  - question: "À quelle fréquence faut-il recalculer ses besoins caloriques lors d'une perte de poids ?"
    answer: "Il est recommandé de mettre à jour votre calcul tous les 4 à 6 kg perdus ou gagnés, ou lorsque votre niveau d'activité hebdomadaire change durablement. Comme le poids intervient directement dans l'équation, un corps plus léger brûle naturellement moins d'énergie au repos et lors des déplacements."
  - question: "Comment estimer ses besoins si l'on connaît déjà son pourcentage de masse grasse ?"
    answer: "Si vous disposez d'une estimation fiable de votre masse maigre (via DEXA ou mesures anthropométriques), utilisez la formule de Katch-McArdle : MB = 370 + (21,6 × Masse maigre en kg). Elle est particulièrement pertinente pour les sportifs très musclés ou, à l'inverse, les personnes présentant une forte adiposité."
---

Le **Métabolisme de Base (MB)** mesure l'énergie minimale, en kilocalories par jour (`kcal/jour`), nécessaire à votre organisme au repos complet pour assurer ses fonctions vitales : respiration, circulation sanguine, activité cérébrale, synthèse cellulaire et thermorégulation. Chez la plupart des adultes, ce socle représente **60 % à 75 % de la Dépense Énergétique Journalière (DEJ)**.

Déterminer votre MB constitue la première étape pour piloter votre alimentation. En le multipliant par un coefficient correspondant à votre **Niveau d'Activité Physique (NAP)**, vous obtenez votre DEJ de maintien, point de repère pour instaurer un déficit modéré ou un léger surplus énergétique.

## Équations prédictives et paramètres de calcul

Faute de calorimétrie indirecte en laboratoire, les nutritionnistes utilisent des équations prédictives fondées sur le poids `P` en kilogrammes (`kg`), la taille `T` en centimètres (`cm`) et l'âge `A` en années.

### Équation de Mifflin-St Jeor (référence actuelle, 1990)

Retenue par les sociétés savantes de nutrition pour sa meilleure précision chez l'adulte contemporain :

```text
Hommes : MB (kcal/jour) = (10 × P) + (6,25 × T) − (5 × A) + 5
Femmes : MB (kcal/jour) = (10 × P) + (6,25 × T) − (5 × A) − 161
```

### Équation de Harris-Benedict révisée (Roza et Shizgal, 1984)

Encore présente dans de nombreux outils cliniques, elle produit souvent des valeurs légèrement supérieures :

```text
Hommes : MB (kcal/jour) = (13,397 × P) + (4,799 × T) − (5,677 × A) + 88,362
Femmes : MB (kcal/jour) = (9,247 × P) + (3,098 × T) − (4,330 × A) + 447,593
```

### Équation de Katch-McArdle (basée sur la masse maigre)

Indépendante du sexe, elle utilise uniquement la masse maigre `MM` en kilogrammes (`MM = Poids × [1 − % Masse grasse / 100]`) :

```text
Mixte : MB (kcal/jour) = 370 + (21,6 × MM)
```

La **Dépense Énergétique Journalière (DEJ)** résulte ensuite du produit entre le MB et le Niveau d'Activité Physique (`NAP`) :

```text
DEJ (kcal/jour) = MB × NAP
```

## Exemple chiffré complet de calcul

Prenons une **femme de 30 ans**, pesant **65 kg**, mesurant **168 cm**, ayant une activité modérée trois à quatre fois par semaine (`NAP = 1,55`).

1. **Calcul du MB avec Mifflin-St Jeor :**
   - Poids : `10 × 65 = 650`
   - Taille : `6,25 × 168 = 1 050`
   - Âge : `5 × 30 = 150`
   - `MB = 650 + 1 050 − 150 − 161 = 1 389 kcal/jour`
2. **Comparaison avec Harris-Benedict révisée :**
   - `MB = (9,247 × 65) + (3,098 × 168) − (4,330 × 30) + 447,593 = 1 439,2 kcal/jour`, soit `+50 kcal/jour` (`+3,6 %`).
3. **Calcul de la DEJ de maintien (Mifflin-St Jeor) :**
   - `DEJ = 1 389 × 1,55 = 2 152,95`, soit **2 153 kcal/jour**.
4. **Ajustement selon l'objectif :**
   - Un kilogramme de tissu adipeux stocke environ `7 700 kcal`. Un déficit de `500 kcal/jour` (`3 500 kcal/semaine`) correspond à environ **0,45 kg/semaine**, soit une cible de `2 153 − 500 = 1 653 kcal/jour`, qui reste au-dessus du MB (`1 389 kcal/jour`).
   - Pour une prise de masse musculaire contrôlée (`+250 à +350 kcal/jour`) : `2 403 à 2 503 kcal/jour`.

## Grille des niveaux d'activité physique et scénarios

Le tableau ci-dessous applique les cinq multiplicateurs `NAP` à notre profil exemple (`MB = 1 389 kcal/jour`) :

| Niveau d'activité | Profil hebdomadaire concret | Coefficient NAP | DEJ de maintien | Déficit modéré (−400 kcal) | Surplus (+300 kcal) |
|---|---|---|---|---|---|
| Sédentaire | Travail assis, aucun sport régulier | 1,20 | 1 667 kcal/j | 1 267 kcal/j (sous le MB) | 1 967 kcal/j |
| Légèrement actif | Marche quotidienne + 1 à 3 séances douces | 1,375 | 1 910 kcal/j | 1 510 kcal/j | 2 210 kcal/j |
| Modérément actif | Activité debout ou 3 à 5 séances/semaine | 1,55 | 2 153 kcal/j | 1 753 kcal/j | 2 453 kcal/j |
| Très actif | Entraînements intenses 6 à 7 jours/semaine | 1,725 | 2 396 kcal/j | 1 996 kcal/j | 2 696 kcal/j |
| Extrêmement actif | Travail physique lourd + sport quotidien | 1,90 | 2 639 kcal/j | 2 239 kcal/j | 2 939 kcal/j |

Chez un profil sédentaire, un déficit de `400 kcal/jour` ferait passer l'apport sous le MB (`1 267 < 1 389 kcal/j`). Il est alors préférable d'augmenter la dépense par la marche quotidienne plutôt que de restreindre excessivement l'assiette.

## Erreurs courantes, adaptation métabolique et calibration

Toute équation prédictive comporte une marge d'erreur individuelle d'environ **±10 %**. Trois pièges expliquent la majorité des écarts constatés sur la balance :

- **Surestimation du NAP :** effectuer trois séances de 45 minutes par semaine tout en restant assis le reste du temps correspond plutôt à un coefficient de `1,35 à 1,42` qu'à `1,55`.
- **Double comptage sportif :** comme le `NAP` inclut déjà vos entraînements, ajouter les calories affichées par une montre connectée conduit à surévaluer vos besoins.
- **Adaptation métabolique et âge :** après 30 ans, le MB baisse d'environ `1 % à 2 %` par décennie via la perte musculaire. En déficit prolongé, la diminution involontaire des mouvements spontanés (NEAT) réduit aussi la DEJ de `100 à 300 kcal/jour`.

### Calibration pratique sur deux à trois semaines

Traitez votre DEJ théorique comme une estimation initiale. Consignez précisément vos apports pendant 14 à 21 jours tout en calculant votre poids moyen hebdomadaire le matin à jeun : si le poids moyen stagne, vous avez trouvé votre maintien réel ; sinon, ajustez votre cible par paliers de `150 à 200 kcal/jour`. En cas de pathologie thyroïdienne, de diabète ou de troubles alimentaires, faites valider votre objectif par un médecin ou un diététicien.
