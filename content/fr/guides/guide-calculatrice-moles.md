---
title: "La Mole : La Douzaine du Chimiste"
description: "Maîtrisez la mole et le nombre d'Avogadro (6,022 140 76 × 10²³ mol⁻¹) : formules de conversion masse-mole-volume de gaz, bilan stœchiométrique complet et tableau comparatif."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "mole-calculator"
relatedType: "calculator"
faqs:
  - question: "Pourquoi le nombre d'Avogadro vaut-il exactement 6,022 140 76 × 10²³ mol⁻¹ ?"
    answer: "Depuis la révision du Système international d'unités entrée en vigueur le 20 mai 2019, la mole n'est plus définie par la masse de 12 g de carbone-12, mais par une valeur numérique exacte et fixe attribuée à la constante d'Avogadro : N_A = 6,022 140 76 × 10²³ mol⁻¹. Cette valeur a été choisie pour assurer la continuité parfaite avec l'ancienne échelle atomique."
  - question: "Une mole de molécules différentes pèse-t-elle toujours le même poids ?"
    answer: "Non. Tout comme une douzaine d'œufs pèse moins lourd qu'une douzaine de pastèques, une mole contient toujours le même nombre d'entités (6,022 × 10²³), mais sa masse en grammes dépend de la taille et de la masse des atomes constituants. Une mole d'eau (H₂O) pèse 18,015 g, tandis qu'une mole de glucose (C₆H₁₂O₆) pèse 180,156 g."
  - question: "Comment convertir un nombre de molécules en moles, puis en grammes ?"
    answer: "Divisez d'abord le nombre d'entités N par la constante d'Avogadro N_A pour obtenir la quantité de matière n = N / N_A (en mol). Multipliez ensuite n par la masse molaire M du composé (en g/mol) pour obtenir la masse m = n × M en grammes."
  - question: "Quelle est la différence entre une mole d'oxygène atomique (O) et une mole de dioxygène (O₂) ?"
    answer: "Une mole d'atomes d'oxygène (O) compte 6,022 × 10²³ atomes individuels et pèse 15,999 g. Une mole de molécules de dioxygène gazeux (O₂) contient 6,022 × 10²³ molécules diatomiques — soit deux moles d'atomes d'oxygène — et pèse exactement le double, soit 31,998 g."
  - question: "Quel volume occupe une mole de gaz parfait dans les conditions normales ?"
    answer: "Dans les conditions normales de température et de pression historiques (0 °C soit 273,15 K, et 101,325 kPa), une mole de gaz parfait occupe un volume molaire V_m = 22,414 L/mol. À 25 °C (298,15 K) et 100 kPa (conditions standard IUPAC actuelles), ce volume molaire vaut 24,790 L/mol."
---

Les atomes et les molécules sont si petits qu'il est impossible de les compter individuellement : une goutte d'eau (`0,05 mL`) contient déjà plus de `1,67 × 10²¹` molécules. Pour relier l'échelle microscopique des équations chimiques aux pesées de laboratoire, la chimie emploie une unité de comptage universelle : la **mole** (`mol`).

Une mole rassemble exactement `6,022 140 76 × 10²³` entités élémentaires (atomes, molécules, ions ou électrons), valeur appelée **constante d'Avogadro (`N_A`)**. Ce facteur d'échelle convertit directement la masse atomique en grammes par mole (`g/mol`). Pour convertir instantanément masses, moles et particules, utilisez notre [calculatrice de moles](/fr/calculatrices/calculateur-de-moles).

## Les quatre relations fondamentales de la quantité de matière

Selon l'état physique de l'échantillon (solide, solution ou gaz), la quantité de matière `n` (en `mol`) s'obtient par l'une de ces quatre relations :

```text
Depuis une masse solide/liquide : n = m / M
Depuis un nombre d'entités      : n = N / N_A   (N_A = 6,022 140 76 × 10²³ mol⁻¹)
En solution liquide             : n = C × V
Pour un gaz parfait             : n = (P × V) / (R × T)  ou  n = V / V_m
```

### Définition des paramètres et cohérence des unités

- **`n` — Quantité de matière :** en moles (`mol`).
- **`m` et `M` — Masse et masse molaire :** `m` en grammes (`g`) et `M` en grammes par mole (`g/mol`).
- **`N` — Nombre d'entités :** sans unité (atomes, molécules, ions).
- **`C` et `V` — Molarité et volume de solution :** `C` en `mol/L` et `V` en litres (`L`).
- **`P`, `V`, `R`, `T` — Gaz parfaits (SI) :** `P` en pascals (`Pa`), `V` en `m³` (`1 m³ = 1 000 L`), `T` en kelvins (`K = °C + 273,15`) et `R = 8,314 462 6 J/(mol·K)`.

### La redéfinition SI de 2019 : du Carbone-12 à la constante exacte

Autrefois, la mole désignait le nombre d'atomes contenus dans `12 g` de carbone-12 (`¹²C`). Depuis mai 2019, le Système international fixe directement `N_A` comme constante exacte sans incertitude (`6,022 140 76 × 10²³ mol⁻¹`). La masse molaire du carbone-12 demeure égale à `12,000 g/mol` à moins d'un milliardième près, préservant tous les calculs de paillasse.

## Exemple numérique complet : bilan molaire d'une réaction chimique

On attaque `15,014 g` de carbonate de calcium pur (`CaCO₃`, `M = 100,09 g/mol`) par un excès d'acide chlorhydrique (`HCl`) selon :

`CaCO₃(s) + 2 HCl(aq) → CaCl₂(aq) + H₂O(l) + CO₂(g)`

### Étape 1 : Quantité de matière initiale de `CaCO₃`

`n(CaCO₃) = 15,014 / 100,09 = 0,1500 mol`

### Étape 2 : Moles d'acide consommées et de `CO₂` formées

D'après la stœchiométrie (`1 : 2 : 1`) :

`n(HCl) = 2 × 0,1500 = 0,3000 mol` et `n(CO₂) = 0,1500 mol`

### Étape 3 : Nombre de molécules de `CO₂` dégagées

`N(CO₂) = 0,1500 × 6,022 140 76 × 10²³ ≈ 9,033 × 10²² molécules`

### Étape 4 : Volume de gaz recueilli à `20 °C` (`293,15 K`) et `101 325 Pa`

`V = (n × R × T) / P = (0,1500 × 8,314 46 × 293,15) / 101 325 ≈ 0,003 608 m³ = 3,61 L`

La réaction libère donc **`0,1500 mol`**, soit **`3,61 litres`** de dioxyde de carbone gazeux.

## Tableau de correspondance : masse, moles et nombre d'entités

Ce tableau compare six espèces chimiques pour montrer comment une même masse (`100 g`) correspond à des quantités de matière très différentes.

| Espèce chimique | Formule | Masse molaire (`g/mol`) | Masse pour `0,50 mol` | Moles dans `100 g` | Entités dans `100 g` | Type d'entité |
|---|---|---|---|---|---|---|
| Dihydrogène | `H₂` | `2,016` | `1,008 g` | `49,60 mol` | `2,99 × 10²⁵` | Molécules |
| Eau | `H₂O` | `18,015` | `9,008 g` | `5,551 mol` | `3,34 × 10²⁴` | Molécules |
| Fer métallique | `Fe` | `55,845` | `27,92 g` | `1,791 mol` | `1,08 × 10²⁴` | Atomes |
| Chlorure de sodium | `NaCl` | `58,44` | `29,22 g` | `1,711 mol` | `1,03 × 10²⁴` | Unités formulaires |
| Acide sulfurique | `H₂SO₄` | `98,07` | `49,04 g` | `1,020 mol` | `6,14 × 10²³` | Molécules |
| Glucose | `C₆H₁₂O₆` | `180,16` | `90,08 g` | `0,555 mol` | `3,34 × 10²³` | Molécules |

À masse égale (`100 g`), le dihydrogène léger renferme près de **90 fois plus** de molécules que le glucose, prouvant que les bilans chimiques doivent toujours s'équilibrer en moles.

## Applications en stœchiométrie et pièges analytiques

### Du réactif limitant au bilan industriel et clinique

Pour identifier le **réactif limitant**, convertissez chaque réactif en moles puis divisez par son coefficient stœchiométrique : le plus petit rapport désigne le réactif épuisé en premier et fixe le rendement (`η = n_obtenue / n_théorique × 100 %`). Le calcul molaire gouverne aussi les bilans d'émissions de `CO₂` industriels et les ionogrammes sanguins cliniques (`mmol/L`) équilibrant cations (`Na⁺`, `K⁺`) et anions (`Cl⁻`, `HCO₃⁻`).

### Erreurs fréquentes lors des conversions molaires

1. **Oublier la diatomie des gaz :** `H₂`, `N₂`, `O₂` et `Cl₂` pèsent respectivement `2,016`, `28,014`, `31,998` et `70,90 g/mol`, soit le double de l'atome isolé.
2. **Raisonner en grammes plutôt qu'en moles :** `10 g` de `H₂` (`4,96 mol`) et `10 g` de `O₂` (`0,313 mol`) ne réagissent pas en proportion `1:1`.
3. **Laisser `T` en degrés Celsius :** dans `P·V = n·R·T`, utiliser `20 °C` au lieu de `293,15 K` fausse le volume d'un facteur 15.
4. **Confondre moles de sel et moles d'ions :** `1 mol` de `CaCl₂` dissous libère `1 mol` de `Ca²⁺` et `2 mol` de `Cl⁻`, soit `3 moles` d'ions.
