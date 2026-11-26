---
title: "Calculatrice d'Enthalpie : La Chaleur des Réactions"
description: "Maîtrisez le concept d'enthalpie (ΔH), la distinction entre réactions exothermiques et endothermiques, les formules de bilan thermique et un exemple chiffré de combustion."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "enthalpy-calculator"
faqs:
  - question: "Quelle est la différence entre l'enthalpie (H) et l'énergie interne (U) ?"
    answer: "L'énergie interne U correspond à la somme de toutes les énergies microscopiques (cinétique et potentielle) des particules d'un système. L'enthalpie H intègre en plus le travail mécanique d'expansion contre la pression extérieure selon H = U + P × V. À pression constante, la variation d'enthalpie ΔH est directement égale à la chaleur échangée q_p."
  - question: "Pourquoi une réaction exothermique présente-t-elle un ΔH négatif ?"
    answer: "La thermodynamique adopte la convention du système : l'énergie qui entre dans le système chimique est comptée positivement, tandis que l'énergie cédée au milieu extérieur est négative. Lorsqu'une réaction libère de la chaleur vers l'environnement, l'enthalpie finale des produits est inférieure à celle des réactifs, d'où ΔH = H_produits − H_réactifs < 0."
  - question: "Peut-on mesurer la valeur absolue de l'enthalpie H d'une substance ?"
    answer: "Non, il est impossible de mesurer l'enthalpie absolue d'un corps pur, car son énergie interne totale dépend d'interactions nucléaires et électroniques complexes sans référence zéro universelle. En chimie, on mesure uniquement des variations d'enthalpie ΔH entre deux états, en fixant par convention à zéro l'enthalpie de formation des corps simples purs dans leur état standard le plus stable."
  - question: "Comment l'état physique (solide, liquide, gaz) influence-t-il l'enthalpie ?"
    answer: "Le changement d'état modifie fortement le contenu énergétique d'une espèce chimique. Par exemple, l'eau liquide à 25 °C possède une enthalpie de formation de −285,83 kJ/mol contre −241,82 kJ/mol pour la vapeur d'eau : la différence de 44,01 kJ/mol correspond précisément à l'enthalpie molaire de vaporisation de l'eau à cette température."
  - question: "Une réaction fortement exothermique est-elle toujours spontanée ?"
    answer: "Pas nécessairement. La spontanéité à température et pression constantes est gouvernée par l'enthalpie libre de Gibbs ΔG = ΔH − T × ΔS, et non par ΔH seul. Une réaction exothermique accompagnée d'une forte baisse d'entropie (ΔS < 0) devient non spontanée à haute température, et inversement, une réaction endothermique peut être spontanée si ΔS est suffisamment positif."
---

En thermodynamique chimique, l'**enthalpie** (notée `H`) mesure le contenu énergétique total d'un système soumis à une pression constante, en incluant à la fois son énergie interne et le travail d'expansion contre la pression atmosphérique. Lorsque l'on étudie une transformation physique ou une réaction chimique en réacteur ouvert, la **variation d'enthalpie (`ΔH`)** est strictement égale à la quantité de chaleur échangée avec le milieu extérieur.

Notre [Calculatrice d'Enthalpie](/fr/calculatrices/calculateur-d-enthalpie) détermine immédiatement le bilan thermique d'une transformation à partir des enthalpies totales des réactifs et des produits, puis classe automatiquement le processus comme **exothermique** (`ΔH < 0`, libération de chaleur) ou **endothermique** (`ΔH > 0`, absorption de chaleur). Ce paramètre constitue le socle du dimensionnement des échangeurs thermiques, de l'évaluation du pouvoir calorifique des combustibles et de la prévention de l'emballement thermique en génie des procédés.

## Principes thermodynamiques et formules de calcul

La définition formelle de l'enthalpie associe trois grandeurs d'état : l'énergie interne `U`, la pression `P` et le volume `V`. Dans les conditions habituelles de laboratoire ou d'usine à pression constante (`ΔP = 0`), le premier principe de la thermodynamique permet d'exprimer `ΔH` uniquement en fonction de la chaleur échangée à pression constante `q_p`.

```text
Définition de l'enthalpie       : H = U + P × V
Variation à pression constante  : ΔH = ΔU + P × ΔV = q_p
Bilan d'une réaction chimique   : ΔH_réaction = H_produits − H_réactifs
Calcul par les formations       : ΔH°_r = Σ(n_i × ΔH°_f,produits) − Σ(m_j × ΔH°_f,réactifs)
Approximation par les liaisons  : ΔH_r ≈ Σ D(liaisons rompues) − Σ D(liaisons formées)
```

Dans ces expressions, `ΔH` s'exprime généralement en kilojoules (`kJ`) ou en kilojoules par mole (`kJ/mol`) rapportés à l'avancement unitaire de l'équation équilibrée. Les coefficients `n_i` et `m_j` désignent les nombres stœchiométriques des produits et des réactifs. La convention de signe joue un rôle déterminant :

- **Réaction exothermique (`ΔH < 0`)** : la formation des nouvelles liaisons dans les produits libère davantage d'énergie que n'en consomme la rupture des liaisons des réactifs. La température du milieu environnant augmente (combustion, neutralisation acide-base, hydratation du ciment).
- **Réaction endothermique (`ΔH > 0`)** : la rupture des liaisons initiales exige plus d'énergie que n'en restitue la formation des produits. Le système absorbe de la chaleur au détriment du milieu extérieur, provoquant un refroidissement local (dissolution de certains sels, craquage thermique, photosynthèse).

## Exemple chiffré : combustion complète du propane

Considérons la combustion complète du propane gazeux (`C₃H₈`) dans le dioxygène à la température de référence de `298,15 K` (`25 °C`) sous une pression standard de `1 bar`, en supposant que l'eau produite se condense à l'état liquide :

`C₃H₈(g) + 5 O₂(g) → 3 CO₂(g) + 4 H₂O(l)`

Les enthalpies standard de formation (`ΔH°_f`) tabulées pour chaque espèce valent :

- `ΔH°_f(C₃H₈, g) = −103,85 kJ/mol`
- `ΔH°_f(O₂, g) = 0,00 kJ/mol` (corps simple dans son état de référence)
- `ΔH°_f(CO₂, g) = −393,51 kJ/mol`
- `ΔH°_f(H₂O, l) = −285,83 kJ/mol`

On applique la relation stœchiométrique en trois étapes :

1. **Somme pour les produits** : `H_produits = 3 × (−393,51) + 4 × (−285,83) = −1 180,53 − 1 143,32 = −2 323,85 kJ`.
2. **Somme pour les réactifs** : `H_réactifs = 1 × (−103,85) + 5 × 0,00 = −103,85 kJ`.
3. **Variation d'enthalpie de la réaction** : `ΔH°_r = −2 323,85 − (−103,85) = −2 220,00 kJ/mol` de propane.

Le signe négatif confirme que la combustion est fortement exothermique. Pour une masse de `1,00 kg` de propane (masse molaire `M = 44,10 g/mol`, soit `22,676 mol`), la chaleur totale libérée atteint `22,676 × 2 220,00 = 50 341 kJ`, soit `50,34 MJ/kg` (pouvoir calorifique supérieur). Si l'eau restait sous forme de vapeur dans les fumées, il faudrait utiliser `ΔH°_f(H₂O, g) = −241,82 kJ/mol`, ce qui réduirait l'énergie récupérable de `4 × 44,01 = 176,04 kJ/mol`.

## Ordres de grandeur des variations d'enthalpie

Le tableau ci-dessous rassemble des transformations chimiques et physiques courantes pour situer les échelles d'énergie rencontrées en laboratoire et dans l'industrie.

| Transformation | Équation ou changement d'état | ΔH° (kJ/mol) | Régime thermique | Application ou contexte |
| :--- | :--- | :--- | :--- | :--- |
| Combustion du méthane | `CH₄(g) + 2 O₂(g) → CO₂(g) + 2 H₂O(l)` | `−890,36` | Exothermique | Chauffage au gaz naturel |
| Neutralisation acide-base | `H⁺(aq) + OH⁻(aq) → H₂O(l)` | `−55,84` | Exothermique | Titrages et sûreté thermique |
| Synthèse de l'ammoniac | `1/2 N₂(g) + 3/2 H₂(g) → NH₃(g)` | `−45,94` | Exothermique | Procédé Haber-Bosch |
| Fusion de la glace | `H₂O(s) → H₂O(l)` (`0 °C`) | `+6,01` | Endothermique | Stockage par chaleur latente |
| Dissolution du nitrate d'ammonium | `NH₄NO₃(s) → NH₄⁺(aq) + NO₃⁻(aq)` | `+25,69` | Endothermique | Poches de froid médicales |
| Vaporisation de l'eau | `H₂O(l) → H₂O(g)` (`100 °C`) | `+40,66` | Endothermique | Chaudières et refroidissement |

## Applications industrielles et erreurs fréquentes

Dans l'industrie chimique, la maîtrise de `ΔH` conditionne directement la sécurité et le rendement énergétique des procédés. Lors d'une réaction exothermique mal refroidie en réacteur fermé, l'accumulation de chaleur accélère la cinétique selon la loi d'Arrhenius, créant un risque d'emballement thermique et de surpression. À l'inverse, les procédés endothermiques comme le vapocraquage ou la calcination du calcaire exigent un apport continu d'énergie pour maintenir la conversion.

Pour éviter les erreurs de calcul lors de l'utilisation d'une calculatrice d'enthalpie, vérifiez systématiquement quatre points :

1. **Cohérence de l'état physique** : confondre `H₂O(l)` et `H₂O(g)` ou le carbone graphite et diamant fausse le bilan de plusieurs dizaines de kilojoules par mole.
2. **Ordre de soustraction** : la formule impose `H_produits − H_réactifs` ; inverser les termes inverse le signe de `ΔH`.
3. **Équilibrage stœchiométrique** : toute valeur de `ΔH` dépend de l'équation équilibrée ; doubler les coefficients double la chaleur en kilojoules.
4. **Limites des énergies de liaison** : cette approximation ne vaut qu'en phase gazeuse ; en phase liquide ou solide, seules les tables de formation restent fiables.
