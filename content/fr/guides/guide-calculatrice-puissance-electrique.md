---
title: "Puissance Électrique : Calculer les Watts (P=VI)"
description: "Maîtrisez la loi de Watt (P = U × I), calculez l'intensité et la puissance en courant continu, monophasé et triphasé avec notre Calculatrice de Puissance Électrique."
category: "Math & Science"
relatedCalculator: "electrical-power-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Quelle est la différence entre les watts (W) et les voltampères (VA) ?"
    answer: "Le watt (W) mesure la puissance active réellement convertie en chaleur, lumière ou travail mécanique, tandis que le voltampère (VA) représente la puissance apparente totale appelée sur le réseau (U × I). Sur une charge purement résistive (radiateur, bouilloire), le facteur de puissance vaut 1 et W = VA ; sur un moteur ou un onduleur, cos(φ) est inférieur à 1 et les VA dépassent les W."
  - question: "Pourquoi obtient-on 1 200 W avec 5 A en France contre 10 A aux États-Unis ?"
    answer: "D'après la loi de Watt (P = U × I), la puissance est le produit de la tension par l'intensité. Sous une tension domestique européenne de 230 V à 240 V, un appareil de 1 200 W n'appelle qu'environ 5 A (1 200 / 240 = 5 A), contre 10 A sous 120 V en Amérique du Nord (1 200 / 120 = 10 A), ce qui permet d'utiliser des câbles de section plus fine en Europe."
  - question: "Comment calculer l'intensité maximale admissible sur une prise de 230 V ?"
    answer: "Divisez la puissance totale des appareils branchés par la tension du réseau (230 V) en tenant compte du facteur de puissance : I = P / (230 × cos φ). En France, une prise standard protégée par un disjoncteur de 16 A supporte au maximum 3 680 W (230 × 16) sur une charge résistive, et un circuit de 20 A atteint 4 600 W."
  - question: "Pourquoi un moteur électrique fait-il parfois disjoncter alors que sa puissance nominale semble faible ?"
    answer: "Au démarrage, un moteur asynchrone appelle un courant d'appel (pointe de démarrage) égal à 3 à 7 fois son intensité nominale pendant quelques dixièmes de seconde. De plus, son rendement mécanique (η) et son facteur de puissance (cos φ) augmentent le courant absorbé par rapport à la puissance utile inscrite sur sa plaque signalétique."
  - question: "Quelle formule utiliser pour calculer la puissance électrique en triphasé ?"
    answer: "Pour une charge triphasée équilibrée sous 400 V entre phases, utilisez la formule P = √3 × U × I × cos(φ), où √3 ≈ 1,732, U est la tension composée (400 V) et I le courant dans chaque phase. Si la charge est purement résistive (résistance de chauffage couplée en étoile ou triangle), cos(φ) = 1 et la puissance vaut simplement 1,732 × 400 × I."
---

La puissance électrique mesure la vitesse à laquelle l'énergie électrique est transférée ou convertie en chaleur, lumière ou travail mécanique. Exprimée en watts (`W`), elle découle de la loi de Watt : `P = U × I` (notée `P = V × I` en notation internationale), soit le produit de la tension par l'intensité du courant.

Maîtriser cette relation permet de dimensionner vos circuits, d'éviter la surcharge des multiprises et de lire les plaques signalétiques de vos appareils. Effectuez vos conversions instantanément (`P`, `U` ou `I`) avec notre [Calculatrice de Puissance Électrique](/fr/calculatrices/calculateur-de-puissance-electrique).

## Principes fondamentaux et formules de la puissance électrique

En courant continu (CC) ou alternatif purement résistif (radiateur, bouilloire), la puissance active suit l'équation :

```text
P = U × I
```

Définition exacte des paramètres :
- **`P` (Puissance)** : exprimée en watts (`W`), soit `1 joule` transféré par seconde (`1 kW = 1 000 W`).
- **`U` ou `V` (Tension)** : différence de potentiel en volts (`V`), fixée à `230 V` en monophasé en Europe.
- **`I` (Intensité)** : débit de charges en ampères (`A`).

En substituant la loi d'Ohm (`U = R × I`, où `R` est la résistance en ohms `Ω`), on obtient deux variantes essentielles pour quantifier l'échauffement des conducteurs par effet Joule :

```text
P = R × I²        et        P = U² / R
```

La relation `P = R × I²` montre qu'en doublant le courant dans un câble, les pertes thermiques sont multipliées par quatre.

### Courant alternatif monophasé et triphasé : le facteur de puissance

En courant alternatif (CA), les charges inductives ou capacitives (moteurs, transformateurs, alimentations électroniques) déphasent le courant par rapport à la tension. On distingue alors la **puissance apparente** `S` en voltampères (`VA`), qui dimensionne disjoncteurs et câbles, de la **puissance active** `P` en watts (`W`) :

```text
Monophasé :  S = U × I          et   P = U × I × cos(φ)
Triphasé  :  S = √3 × U × I     et   P = √3 × U × I × cos(φ)
```

Le facteur de puissance `cos(φ)` varie entre `0` et `1` (`1,00` pour une résistance pure, `0,75` à `0,88` pour un moteur asynchrone).

## Exemple de calcul détaillé étape par étape

Appliquons ces formules à trois cas pratiques sur un réseau européen (`230 V` monophasé, `400 V` triphasé).

**Étape 1 : Intensité d'un four électrique résistif.**  
Un four de `P = 2 875 W` sous `U = 230 V` (`cos φ = 1`) appelle :

```text
I = P / U = 2 875 / 230 = 12,5 A
```

Ce courant reste compatible avec un circuit spécialisé de `20 A` (`4 600 W` max).

**Étape 2 : Puissance apparente et active d'un compresseur monophasé.**  
Pour un courant mesuré de `I = 8,0 A` sous `U = 230 V` avec `cos(φ) = 0,85` :
1. Puissance apparente appelée : `S = 230 × 8,0 = 1 840 VA`.
2. Puissance active consommée : `P = 1 840 × 0,85 = 1 564 W`.

Un onduleur ou groupe électrogène doit être calibré sur `1 840 VA` (et non `1 564 W`).

**Étape 3 : Courant de ligne d'un moteur triphasé 400 V.**  
Pour un moteur de puissance mécanique utile `P_utile = 5 500 W`, de rendement `η = 0,90` et `cos(φ) = 0,86` :
1. Puissance électrique absorbée : `P_abs = 5 500 / 0,90 = 6 111,1 W`.
2. Intensité par phase (`√3 ≈ 1,732`) : `I = 6 111,1 / (1,732 × 400 × 0,86) ≈ 10,26 A`.

## Référentiel des puissances et intensités usuelles (230 V)

Ce tableau regroupe des équipements domestiques typiques sous `230 V` et leur protection conforme à la norme **NF C 15-100**.

| Équipement / Charge | Puissance active (`P`) | Facteur (`cos φ`) | Intensité à 230 V (`I`) | Disjoncteur (NF C 15-100) |
| :--- | :--- | :--- | :--- | :--- |
| Éclairage LED (10 lampes) | 100 W | 0,90 | 0,48 A | 10 A ou 16 A (1,5 mm²) |
| Réfrigérateur combiné | 180 W | 0,80 | 0,98 A | 16 A ou 20 A |
| PC fixe + double écran | 350 W | 0,95 | 1,60 A | 16 A (circuit prises) |
| Lave-linge (chauffe) | 2 200 W | 0,98 | 9,76 A | 20 A (circuit spécialisé) |
| Sèche-linge à condensation | 2 500 W | 0,95 | 11,44 A | 20 A (circuit spécialisé) |
| Borne de recharge VE | 7 360 W | 1,00 | 32,00 A | 40 A type A (10 mm²) |

## Applications pratiques, erreurs fréquentes et cadre normatif

La formule `P = U × I` guide le choix d'une alimentation `12 V` ou `24 V`, la vérification des multiprises et le dimensionnement de la puissance d'abonnement du compteur (`kVA`).

Trois pièges techniques reviennent fréquemment :
- **Surcharger une multiprise** : un bloc marqué `16 A / 230 V` plafonne à `3 680 W` cumulés. Brancher ensemble un radiateur (`2 000 W`) et un sèche-cheveux (`1 800 W`) atteint `16,52 A` et provoque un échauffement dangereux des contacts.
- **Oublier le rendement (`η`) et le courant d'appel** : un convertisseur dissipe `5 %` à `15 %` de pertes, et un moteur tire `3` à `7` fois son courant nominal au démarrage.
- **Ignorer les exigences de régime continu** : selon la norme **NF C 15-100**, les gros consommateurs durables (borne VE, ballon d'eau chaude, four) imposent un circuit dédié et une marge thermique stricte sur la section des conducteurs.
