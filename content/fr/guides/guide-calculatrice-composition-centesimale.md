---
title: "Composition Centésimale : Analyser la Matière"
description: "Découvrez comment trouver le pourcentage massique des éléments dans un composé. Utilisez notre Calculatrice de Composition Centésimale."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "percent-composition-calculator"
relatedType: "calculator"
faqs:
  - question: "Pourquoi la somme des pourcentages massiques doit-elle toujours égaler 100 % ?"
    answer: "Selon la loi de conservation de la masse, la masse molaire d'un composé pur correspond exactement à la somme des masses atomiques de tous les atomes constituant sa formule. En divisant chaque contribution élémentaire par le total, la somme vaut 100,00 %, à d'éventuels écarts d'arrondi de ±0,02 % près."
  - question: "Quelle est la différence entre la composition centésimale massique et le pourcentage atomique ?"
    answer: "Le pourcentage atomique compte le nombre d'atomes d'un élément sur le total d'atomes de la molécule (dans H₂O, l'hydrogène représente 2 atomes sur 3, soit 66,67 %). La composition centésimale pondère chaque atome par sa masse molaire : comme l'oxygène pèse près de 16 fois plus que l'hydrogène, l'eau ne contient que 11,19 % d'hydrogène en masse contre 88,81 % d'oxygène."
  - question: "Comment passer de la composition centésimale expérimentale à la formule brute d'un composé ?"
    answer: "On suppose un échantillon de 100 g afin de convertir directement chaque pourcentage en grammes, puis on divise chaque masse par la masse molaire atomique de l'élément correspondant pour obtenir les moles. On divise ensuite ces quantités par la plus petite d'entre elles afin d'obtenir les rapports entiers simples de la formule empirique."
  - question: "Faut-il inclure les molécules d'eau d'hydratation dans la composition centésimale d'un sel hydraté ?"
    answer: "Oui, si le composé est pesé et utilisé sous sa forme hydratée (par exemple CuSO₄·5H₂O). Les 5 molécules d'eau appartiennent à la maille cristalline et représentent 36,08 % de la masse molaire totale ; les omettre fausserait toutes les pesées stœchiométriques en laboratoire."
  - question: "Comment vérifier qu'une molécule synthétisée est pure grâce à l'analyse élémentaire ?"
    answer: "En chimie organique et pharmaceutique, l'analyse élémentaire CHNS mesure par combustion les pourcentages expérimentaux de carbone, d'hydrogène, d'azote et de soufre. Une pureté satisfaisante exige un écart inférieur à ±0,40 point de pourcentage par rapport à la composition centésimale théorique."
---

La **composition centésimale massique** indique le pourcentage de la masse totale d'un composé pur apporté par chaque élément chimique. Bien qu'une molécule d'eau (`H₂O`) contienne deux atomes d'hydrogène pour un atome d'oxygène, sa répartition massique révèle l'inverse : l'oxygène représente `88,81 %` de la masse de l'eau, contre seulement `11,19 %` pour l'hydrogène.

Fondée sur la loi des proportions définies de Joseph Proust, cette grandeur sert à contrôler la pureté d'une synthèse organique, formuler des engrais agricoles (teneur NPK), doser des principes actifs pharmaceutiques ou identifier la formule brute d'une substance inconnue. Pour analyser instantanément des molécules complexes, utilisez notre [Calculatrice de Composition Centésimale](/fr/calculatrices/calculateur-de-composition-centesimale).

## Principes théoriques et formule de calcul

Contrairement au pourcentage atomique, la composition centésimale pondère chaque élément par sa **masse molaire atomique standard** (valeurs UICPA en `g/mol`). Une mole d'un composé de formule `AₓBᵧC_z` rassemble `x` moles de `A`, `y` moles de `B` et `z` moles de `C`.

```text
M_totale = (x × M_A) + (y × M_B) + (z × M_C)
% massique(E) = [(n_E × M_E) / M_totale] × 100
```

Chaque variable obéit à une définition précise :

- **`n_E` (nombre d'atomes de l'élément)** : effectif total d'atomes de l'élément `E` dans la formule. Lorsqu'une formule comporte des parenthèses, comme le nitrate de calcium `Ca(NO₃)₂`, l'indice `2` multiplie tout le groupe : `n_Ca = 1`, `n_N = 2` et `n_O = 6`.
- **`M_E` (masse molaire atomique)** : masse d'une mole d'atomes de `E` en `g/mol` (`C = 12,011`, `H = 1,008`, `N = 14,007`, `O = 15,999`), moyenne pondérée de ses isotopes naturels stables.
- **`M_totale` (masse molaire du composé)** : somme de toutes les masses élémentaires contenues dans une mole de substance (`g/mol`).
- **`% massique(E)`** : fraction massique de `E` exprimée en pourcentage, toujours comprise entre `0 %` et `100 %`.

## Exemple détaillé : analyser la caféine (C₈H₁₀N₄O₂)

Calculons la composition centésimale de la **caféine** (`C₈H₁₀N₄O₂`), molécule étalon très utilisée en chromatographie liquide (HPLC), avec les masses atomiques UICPA à cinq chiffres significatifs.

### Étape 1 : calculer la masse apportée par chaque élément

```text
Carbone (C) : 8 × 12,011 g/mol = 96,088 g/mol
Hydrogène (H) : 10 × 1,008 g/mol = 10,080 g/mol
Azote (N) : 4 × 14,007 g/mol = 56,028 g/mol
Oxygène (O) : 2 × 15,999 g/mol = 31,998 g/mol
```

### Étape 2 : additionner pour obtenir la masse molaire totale

```text
M(C₈H₁₀N₄O₂) = 96,088 + 10,080 + 56,028 + 31,998 = 194,194 g/mol
```

### Étape 3 : déduire chaque pourcentage massique

```text
% C = (96,088 / 194,194) × 100 = 49,48 %
% H = (10,080 / 194,194) × 100 = 5,19 %
% N = (56,028 / 194,194) × 100 = 28,85 %
% O = (31,998 / 194,194) × 100 = 16,48 %
```

La vérification donne `49,48 % + 5,19 % + 28,85 % + 16,48 % = 100,00 %`. Bien que l'hydrogène soit l'atome le plus nombreux (`10` atomes sur `24`, soit `41,67 %` en nombre), sa faible masse atomique limite sa contribution pondérale à `5,19 %`.

## Tableau comparatif de composés de référence

Ce tableau synthétise la masse molaire et la répartition massique exacte de six composés majeurs rencontrés en chimie analytique, minérale et biochimique.

| Composé chimique | Formule | Masse molaire (`g/mol`) | Élément majoritaire | Autres éléments (% massique) | Application principale |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Eau | `H₂O` | `18,015` | `O : 88,81 %` | `H : 11,19 %` | Solvant et référence de densité |
| Dioxyde de carbone | `CO₂` | `44,009` | `O : 72,71 %` | `C : 27,29 %` | Bilans carbone et combustion |
| Ammoniac | `NH₃` | `17,031` | `N : 82,24 %` | `H : 17,76 %` | Engrais azotés et synthèse minérale |
| Éthanol | `C₂H₆O` | `46,069` | `C : 52,14 %` | `O : 34,73 %`, `H : 13,13 %` | Solvant organique et bioéthanol |
| Glucose | `C₆H₁₂O₆` | `180,156` | `O : 53,29 %` | `C : 40,00 %`, `H : 6,71 %` | Métabolisme et dosages glucidiques |
| Sulfate de cuivre pentahydraté | `CuSO₄·5H₂O` | `249,677` | `O : 57,67 %` | `Cu : 25,45 %`, `S : 12,84 %`, `H : 4,04 %` | Étalonnage redox (`36,08 %` d'eau) |

## Calcul inverse : déduire la formule empirique

Lorsqu'un analyseur élémentaire CHNS fournit les pourcentages expérimentaux d'un échantillon inconnu, on remonte à sa **formule empirique** (plus petit rapport entier d'atomes) sur une base conventionnelle de `100,0 g` :

1. **Convertir en grammes** : un échantillon dosé à `40,00 %` de `C`, `6,71 %` de `H` et `53,29 %` de `O` renferme `40,00 g` de carbone, `6,71 g` d'hydrogène et `53,29 g` d'oxygène.
2. **Convertir en moles** : `n_C = 40,00 / 12,011 = 3,330 mol` ; `n_H = 6,71 / 1,008 = 6,657 mol` ; `n_O = 53,29 / 15,999 = 3,331 mol`.
3. **Diviser par le minimum (`3,330`)** : on obtient le rapport `C : H : O = 1,00 : 2,00 : 1,00`, soit la formule empirique `CH₂O` (`30,026 g/mol`).
4. **Identifier la formule moléculaire** : si la spectrométrie de masse indique `180,16 g/mol`, le rapport `180,16 / 30,026 = 6` confirme la formule `C₆H₁₂O₆`.

## Erreurs courantes et exigences métrologiques

En pratique analytique, quatre écueils expliquent les écarts entre théorie et mesure :

- **Confondre formule empirique et moléculaire** : le formaldéhyde (`CH₂O`), l'acide acétique (`C₂H₄O₂`) et le glucose (`C₆H₁₂O₆`) partagent la même composition (`40,0 % C`, `6,7 % H`, `53,3 % O`). Une mesure de masse molaire reste nécessaire.
- **Omettre l'eau de cristallisation** : ignorer l'eau d'un sel hydraté (`MgSO₄·7H₂O`, `CuSO₄·5H₂O`) fausse la teneur en soluté actif des étalons.
- **Arrondir trop tôt les masses** : utiliser `12` pour `C` ou `35,5` pour `Cl` biaise le calcul au-delà du seuil de `±0,40 %` exigé en pharmacie.
- **Ignorer le marquage isotopique** : pour des solvants deutérés (`CDCl₃`, `D₂O`) ou au `¹³C`, utilisez la masse exacte de l'isotope (`²H = 2,014 g/mol`, `¹³C = 13,003 g/mol`).
