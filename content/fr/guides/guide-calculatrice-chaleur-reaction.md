---
title: "Calculatrice de Chaleur de Réaction : Thermodynamique"
description: "Calculez la chaleur standard de réaction (ΔH°_r) à l'aide des enthalpies standard de formation, des conventions IUPAC, de la loi de Kirchhoff et d'un exemple industriel."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "heat-of-reaction-calculator"
faqs:
  - question: "Quelle est la définition actuelle de l'état standard selon l'IUPAC ?"
    answer: "Depuis 1982, l'IUPAC définit la pression standard p° à exactement 1 bar (100 000 Pa), remplaçant l'ancienne valeur de 1 atmosphère (101 325 Pa). Pour les solutions, l'état standard correspond à une concentration idéale de 1 mol/L (ou molalité de 1 mol/kg). Aucune température n'est imposée par la définition, mais les tables utilisent presque toujours 298,15 K (25 °C)."
  - question: "Pourquoi l'enthalpie standard de formation d'un corps simple vaut-elle zéro ?"
    answer: "Par convention thermodynamique, on attribue ΔH°_f = 0 kJ/mol à tout élément chimique dans sa forme allotropique et son état physique les plus stables à la température considérée et sous 1 bar (par exemple O₂ gazeux, N₂ gazeux ou carbone graphite à 298,15 K). En revanche, le carbone diamant (+1,89 kJ/mol) ou l'ozone O₃ (+142,7 kJ/mol) possèdent une enthalpie de formation non nulle."
  - question: "Comment calculer la chaleur de réaction à une température différente de 298,15 K ?"
    answer: "On applique la loi de Kirchhoff en intégrant la différence des capacités thermiques molaires à pression constante entre la température de référence T₁ et la température cible T₂ : ΔH°_r(T₂) = ΔH°_r(T₁) + ∫ ΔC°_p(T) dT. Sur un petit intervalle de température où ΔC°_p reste quasi constant, l'approximation ΔH°_r(T₁) + ΔC°_p × (T₂ − T₁) suffit souvent."
  - question: "Quelle est la différence entre ΔH°_r (pression constante) et ΔU°_r (volume constant) ?"
    answer: "La chaleur de réaction à volume constant mesure la variation d'énergie interne ΔU°_r, tandis que celle à pression constante mesure ΔH°_r. Les deux grandeurs sont reliées par ΔH°_r = ΔU°_r + Δν_gaz × R × T, où Δν_gaz est la variation du nombre de moles gazeuses entre produits et réactifs. Si la réaction n'implique aucun gaz ou conserve le nombre de moles de gaz, ΔH°_r et ΔU°_r sont pratiquement identiques."
  - question: "Que signifie l'unité kJ/mol pour une chaleur de réaction ΔH°_r ?"
    answer: "Pour une réaction globale écrite avec des coefficients stœchiométriques, kJ/mol signifie kilojoules par mole d'avancement de la réaction (ξ = 1 mol) telle qu'elle est équilibrée. Ainsi, pour 2 H₂ + O₂ → 2 H₂O(l) avec ΔH°_r = −571,66 kJ/mol, cette énergie correspond à la formation de 2 moles d'eau et à la consommation de 1 mole de dioxygène."
---

La **chaleur standard de réaction** (notée `ΔH°_r` ou `ΔH°_rxn`) quantifie l'énergie thermique absorbée ou dégagée par une transformation chimique lorsque tous les réactifs et tous les produits se trouvent dans leur état standard à une température donnée. Elle permet de comparer rigoureusement les réactions entre elles à partir de tables thermodynamiques universelles, sans avoir à mesurer chaque équation individuellement au calorimètre.

Notre [Calculatrice de Chaleur de Réaction](/fr/calculatrices/calculateur-de-chaleur-de-reaction) applique le bilan algébrique des **enthalpies standard de formation (`ΔH°_f`)** pondérées par les coefficients stœchiométriques de l'équation équilibrée. Cet outil répond directement aux besoins des étudiants en chimie physique, des ingénieurs de procédés et des chercheurs qui conçoivent des bilans énergétiques de réacteurs.

## États standards et équations de bilan

La valeur d'une chaleur de réaction dépend de la pression, de la température et de l'état d'agrégation des espèces. Pour garantir l'homogénéité des données expérimentales, l'Union internationale de chimie pure et appliquée (IUPAC) fixe des conditions de référence précises, désignées par l'exposant `°` :

- **Pression standard (`p°`)** : exactement `1 bar` (`10⁵ Pa`, soit `0,9869 atm`).
- **Température de tabulation usuelle** : `298,15 K` (`25,00 °C`), bien que la notion d'état standard existe à toute température `T`.
- **État de référence des éléments** : forme allotropique la plus stable à `1 bar` et `T` (`C(graphite)`, `O₂(g)`, `Br₂(l)`, `Fe(s)`), pour laquelle `ΔH°_f = 0 kJ/mol`.

À partir des grandeurs tabulées, la chaleur standard de réaction s'obtient par différence entre l'état final et l'état initial :

```text
Chaleur standard de réaction : ΔH°_r = Σ(n_i × ΔH°_f,produits) − Σ(m_j × ΔH°_f,réactifs)
Relation avec l'énergie ΔU°  : ΔH°_r = ΔU°_r + Δν_gaz × R × T
Correction en température    : ΔH°_r(T₂) = ΔH°_r(T₁) + ΔC°_p × (T₂ − T₁)
```

Dans ces formules, `n_i` et `m_j` sont les coefficients stœchiométriques sans dimension, `Δν_gaz` représente la variation du nombre de moles gazeuses (`Σ n_gaz,produits − Σ m_gaz,réactifs`), et `R = 8,3145 J/(mol·K)` est la constante universelle des gaz parfaits.

## Exemple détaillé : vaporeformage du méthane

Le vaporeformage du méthane constitue le principal procédé industriel de production de dihydrogène (`H₂`) et de gaz de synthèse. À `298,15 K` et `1 bar`, son équation équilibrée s'écrit avec l'eau à l'état gazeux :

`CH₄(g) + H₂O(g) → CO(g) + 3 H₂(g)`

Les enthalpies standard de formation à `298,15 K` issues des tables thermodynamiques de référence sont :

- `ΔH°_f(CH₄, g) = −74,81 kJ/mol`
- `ΔH°_f(H₂O, g) = −241,82 kJ/mol`
- `ΔH°_f(CO, g) = −110,53 kJ/mol`
- `ΔH°_f(H₂, g) = 0,00 kJ/mol`

Le calcul se déroule étape par étape :

1. **Enthalpie totale des produits** : `1 × (−110,53) + 3 × 0,00 = −110,53 kJ`.
2. **Enthalpie totale des réactifs** : `1 × (−74,81) + 1 × (−241,82) = −316,63 kJ`.
3. **Chaleur standard de réaction** : `ΔH°_r = −110,53 − (−316,63) = +206,10 kJ/mol`.

La valeur positive élevée (`+206,10 kJ/mol`) démontre que le vaporeformage est fortement endothermique : le réacteur doit être chauffé extérieurement par des brûleurs entre `750 °C` et `900 °C` pour déplacer l'équilibre vers la droite et compenser l'absorption thermique. Par ailleurs, la variation de moles gazeuses vaut `Δν_gaz = (1 + 3) − (1 + 1) = +2`, d'où un terme d'expansion `Δν_gaz × R × T = 2 × 8,3145 × 298,15 = +4 958 J = +4,96 kJ/mol`. La variation d'énergie interne standard vaut donc `ΔU°_r = 206,10 − 4,96 = +201,14 kJ/mol`.

## Valeurs de référence des enthalpies standard de formation

Le tableau ci-après regroupe des enthalpies standard de formation à `298,15 K` (`1 bar`) fréquemment mobilisées dans les calculs de thermochimie organique et minérale.

| Espèce chimique | Formule et état | ΔH°_f à 298,15 K (kJ/mol) | Remarque thermodynamique |
| :--- | :--- | :--- | :--- |
| Dioxygène | `O₂(g)` | `0,00` | Corps simple dans son état standard de référence |
| Carbone graphite | `C(graphite, s)` | `0,00` | Allotrope le plus stable à `298,15 K` et `1 bar` |
| Carbone diamant | `C(diamant, s)` | `+1,89` | Allotrope métastable à pression ambiante |
| Méthane | `CH₄(g)` | `−74,81` | Hydrocarbure le plus simple, base du gaz naturel |
| Monoxyde de carbone | `CO(g)` | `−110,53` | Réducteur métallurgique et gaz de synthèse |
| Eau vapeur | `H₂O(g)` | `−241,82` | État gazeux à retenir dans les réactions à haute température |
| Eau liquide | `H₂O(l)` | `−285,83` | Plus stable de `44,01 kJ/mol` que la vapeur à `25 °C` |
| Dioxyde de carbone | `CO₂(g)` | `−393,51` | Produit de combustion complète du carbone |

## Précautions pratiques et erreurs de modélisation

L'exploitation de `ΔH°_r` dans un contexte d'ingénierie ou d'analyse de laboratoire exige de vérifier la validité des hypothèses sous-jacentes. Les tables standard supposent des gaz parfaits et des solutions infiniment diluées ; sous haute pression (par exemple `150 à 300 bar` dans un réacteur d'ammoniac) ou pour des électrolytes concentrés, l'enthalpie réelle s'écarte de la valeur standard en raison des enthalpies d'excès et de mélange.

Trois sources d'erreur reviennent régulièrement lors du paramétrage d'une calculatrice de chaleur de réaction :

- **Confondre l'état standard et les conditions réelles** : une valeur calculée à `298,15 K` ne décrit pas directement un réacteur fonctionnant à `1 000 K` sans appliquer la correction de Kirchhoff via les capacités thermiques `C°_p(T)`.
- **Oublier la chaleur de dissolution ou de dilution** : mélanger un acide concentré avec de l'eau dégage une enthalpie de dilution supplémentaire importante qui s'ajoute à la chaleur de réaction proprement dite.
- **Mélanger les conventions de signe entre `ΔH°_f` et énergies de liaison** : la formule `Produits − Réactifs` s'applique exclusivement aux enthalpies de formation (et aux enthalpies de combustion avec signe inversé), jamais aux énergies de dissociation de liaison, qui obéissent à l'ordre inverse `Liaisons rompues − Liaisons formées`.
