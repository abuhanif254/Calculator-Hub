---
title: "Comment Calculer son Allure de Course : Les Mathématiques du Marathon"
description: "Maîtrisez la formule de l'allure de course, la conversion en vitesse (km/h), l'équation de prédiction de Riegel sur marathon et semi-marathon, et utilisez notre calculatrice d'allure."
category: "Health"
relatedCalculator: "pace-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Quelle est la différence entre l'allure (min/km) et la vitesse (km/h) ?"
    answer: "L'allure exprime le temps nécessaire pour parcourir un kilomètre (par exemple 5 min 00 s/km), tandis que la vitesse mesure la distance parcourue en une heure (12,00 km/h). Les deux grandeurs sont mathématiquement inverses : plus vous courez vite, plus la vitesse augmente et plus l'allure diminue."
  - question: "Comment convertir correctement une allure décimale en minutes et secondes ?"
    answer: "Il faut conserver la partie entière pour les minutes et multiplier uniquement la partie décimale par 60 pour obtenir les secondes. Ainsi, une allure calculée de 4,50 min/km correspond à 4 minutes et 0,50 × 60 = 30 secondes, soit 4 min 30 s/km (et non 4 min 50 s/km)."
  - question: "Pourquoi la formule de Riegel utilise-t-elle un exposant de 1,06 ?"
    answer: "Lorsque la distance double, la vitesse moyenne soutenable baisse d'environ 4 à 6 % en raison de l'épuisement du glycogène musculaire, de la dérive cardiovasculaire et de la fatigue neuromusculaire. L'exposant empirique 1,06 modélise précisément cette décélération naturelle chez un coureur régulièrement entraîné pour la distance cible."
  - question: "Quelle allure faut-il tenir pour courir un marathon sous les 3 heures ?"
    answer: "Sur la distance officielle de 42,195 km, passer sous la barre des 3 heures (180 minutes) exige une allure moyenne inférieure ou égale à 4 min 16 s/km (précisément 4 min 15,9 s/km, soit une vitesse moyenne de 14,07 km/h). En pratique, les coureurs visent 4 min 14 s/km pour absorber les virages et ravitaillements."
  - question: "Pourquoi l'allure affichée par ma montre GPS diffère-t-elle de mon allure officielle en course ?"
    answer: "Un parcours mesuré officiellement suit la trajectoire la plus courte (la corde des virages). En peloton, un coureur parcourt souvent 42,5 à 42,8 km au lieu de 42,195 km, et la marge d'erreur GPS ajoute un léger biais. Votre montre affichera donc fréquemment une allure plus rapide de 2 à 4 secondes/km que l'allure réelle validée aux bornes officielles."
---

L'allure de course mesure le temps requis pour parcourir un kilomètre (`min/km`) et s'obtient en divisant la durée totale convertie en minutes décimales par la distance en kilomètres. Contrairement à la vitesse (`km/h`), l'allure permet de piloter l'effort grâce aux temps de passage kilométriques, un repère essentiel sur semi-marathon (`21,0975 km`) et marathon (`42,195 km`). Notre [calculatrice d'allure](/fr/calculatrices/calculateur-allure) automatise les conversions entre allure, vitesse, distance et chronomètre.

Préparer une épreuve d'endurance implique toutefois de maîtriser la conversion sexagésimale (base 60), d'appliquer un modèle de fatigue non linéaire pour projeter ses chronos et d'anticiper l'écart entre distance GPS et tracé officiel.

## Formules fondamentales : allure, vitesse et prédiction de Riegel

### Conversion décimale et calcul de l'allure

Manipuler directement des heures, minutes et secondes comme des nombres décimaux fausse tous les calculs. Il faut d'abord convertir la durée en minutes décimales :

```text
Temps_décimal (min) = Heures × 60 + Minutes + Secondes / 60
Allure_décimale     = Temps_décimal / Distance (km)
Vitesse (km/h)      = 60 / Allure_décimale = Distance (km) / (Temps_décimal / 60)
```

Pour reconvertir `4,75 min/km` en format horaire, on conserve la partie entière (`4 min`) et on multiplie la fraction décimale par `60` (`0,75 × 60 = 45 s`), obtenant **4 min 45 s/km**.

### Prédiction de chrono par l'équation de Peter Riegel

Une allure sur 10 km ne se transpose pas linéairement sur 42,195 km. Publiée en 1977 par Peter Riegel, la formule d'endurance relie deux performances sur des distances `D1` et `D2` :

```text
T2 = T1 × (D2 / D1)^1,06
```

Ici, `T1` correspond au temps de référence sur `D1`, et l'exposant `1,06` modélise la baisse progressive de vitesse liée à l'allongement de la distance.

## Exemple chiffré pas à pas : viser 3 h 30 min au marathon

### Calcul de l'allure cible et de la vitesse moyenne

Pour courir un marathon officiel (**42,195 km**) en **3 h 30 min 00 s** :

1. **Temps en minutes décimales :** `3 × 60 + 30 = 210,00 min`.
2. **Allure décimale :** `210,00 / 42,195 = 4,97689 min/km`.
3. **Format minutes : secondes :** on garde `4 min` et on calcule `0,97689 × 60 = 58,61 s`, soit **4 min 59 s/km** (`04:59/km`, ou `4 min 58 s/km` par sécurité).
4. **Vitesse équivalente :** `60 / 4,97689 = 12,06 km/h`.
5. **Passage au semi-marathon :** `21,0975 × 4,97689 = 105,00 min`, soit **1 h 45 min 00 s** à mi-course.

### Validation du potentiel via Riegel

Vérifions le temps requis sur 10 km selon Riegel pour un coureur crédité de **45 min 30 s** (`45,50 min`) :

```text
T_marathon = 45,50 × (42,195 / 10)^1,06
           = 45,50 × (4,2195)^1,06
           = 45,50 × 4,6002 = 209,31 min ≈ 3 h 29 min 19 s
```

Un chrono de 45 min 30 s sur 10 km valide donc mathématiquement un objectif sous les 3 h 30 min, sous réserve d'une préparation spécifique suffisante.

## Tableau de correspondance : allures, vitesses et chronos officiels

| Allure (min/km) | Vitesse (km/h) | 5 km | 10 km | Semi-marathon (21,0975 km) | Marathon (42,195 km) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **6 min 00 s/km** | 10,00 km/h | 30 min 00 s | 1 h 00 min 00 s | 2 h 06 min 35 s | 4 h 13 min 10 s |
| **5 min 30 s/km** | 10,91 km/h | 27 min 30 s | 55 min 00 s | 1 h 56 min 02 s | 3 h 52 min 04 s |
| **5 min 00 s/km** | 12,00 km/h | 25 min 00 s | 50 min 00 s | 1 h 45 min 29 s | 3 h 30 min 59 s |
| **4 min 45 s/km** | 12,63 km/h | 23 min 45 s | 47 min 30 s | 1 h 40 min 13 s | 3 h 20 min 26 s |
| **4 min 30 s/km** | 13,33 km/h | 22 min 30 s | 45 min 00 s | 1 h 34 min 56 s | 3 h 09 min 53 s |
| **4 min 00 s/km** | 15,00 km/h | 20 min 00 s | 40 min 00 s | 1 h 24 min 23 s | 2 h 48 min 47 s |

## Stratégie de course, dérive GPS et limites physiologiques

### Allure régulière contre « negative split »

Sur marathon, partir seulement 5 secondes/km trop vite durant les 15 premiers kilomètres accélère la déplétion du glycogène hépatique et musculaire, exposant au fameux « mur » après le 30e kilomètre. Les analyses statistiques des grands marathons internationaux démontrent que les records personnels sont majoritairement réalisés à allure constante ou en **negative split** (seconde moitié de course courue 1 à 2 % plus vite que la première), ce qui limite l'accumulation précoce de lactate sanguin et préserve la foulée finale.

### Sur-distance GPS et limites du modèle de Riegel

Les parcours labellisés FFA ou World Athletics mesurent exactement 42,195 km le long de la trajectoire optimale à la corde des virages. En courant au sein d'un peloton dense sans tangenter chaque courbe, votre distance réelle atteint couramment **42,5 km** : à 4 min 59 s/km affichés au GPS, le chrono final grimpe à `42,5 × 4,9833 = 211,79 min` (3 h 31 min 47 s). Étalonnez donc votre rythme sur les bornes kilométriques officielles plutôt que sur l'allure instantanée de la montre. Enfin, l'équation de Riegel sous-estime votre temps final si le volume hebdomadaire demeure inférieur à 50–60 km, si le dénivelé positif s'accentue ou si la température extérieure dépasse 18–20 °C, imposant alors un ralentissement préventif de 1,5 à 3 % pour contenir la dérive cardiaque.
