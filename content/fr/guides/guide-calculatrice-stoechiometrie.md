---
title: "Stœchiométrie : Les Mathématiques des Réactions"
description: "Maîtrisez le concept clé de la chimie. Apprenez à équilibrer les équations, trouver le réactif limitant, et utilisez notre Calculatrice de Stœchiométrie."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "stoichiometry-calculator"
relatedType: "calculator"
faqs:
  - question: "Peut-on modifier les indices d'une formule chimique pour équilibrer une équation ?"
    answer: "Jamais. Modifier un indice transforme la nature chimique de la substance (changer H₂O en H₂O₂ revient à remplacer l'eau par de l'eau oxygénée). Ajustez exclusivement les coefficients stœchiométriques placés devant chaque formule afin de conserver le nombre d'atomes de chaque élément et la charge totale."
  - question: "Comment identifier le réactif limitant lorsque deux masses initiales sont données en grammes ?"
    answer: "Ne comparez jamais directement les grammes. Convertissez chaque masse en moles (n = m / M), puis divisez chaque quantité par son coefficient stœchiométrique dans l'équation équilibrée (n / |ν|). Le réactif produisant le quotient le plus petit s'épuise en premier : c'est le réactif limitant."
  - question: "Pourquoi le rendement expérimental d'une synthèse est-il presque toujours inférieur à 100 % ?"
    answer: "Plusieurs facteurs réduisent la masse récupérée : réactions réversibles limitées par un équilibre chimique, réactions parasites formant des sous-produits, pertes mécaniques lors des filtrations ou recristallisations, et dégradation partielle. Un rendement dépassant 100 % révèle habituellement un produit encore humide ou impur."
  - question: "Qu'est-ce que l'avancement maximal ξ_max et comment l'utilise-t-on dans un tableau d'avancement ?"
    answer: "L'avancement ξ (xi, en moles) suit la progression d'une réaction. À tout instant, chaque espèce vaut n(ξ) = n₀ + ν × ξ (avec ν négatif pour les réactifs et positif pour les produits). L'avancement maximal ξ_max est la plus petite valeur annulant un réactif ; il fixe simultanément tous les produits formés et l'excès restant."
  - question: "Comment appliquer la stœchiométrie aux gaz ou aux solutions aqueuses ?"
    answer: "La proportionnalité molaire reste identique ; seule la conversion initiale en moles change. Pour une solution titrée, utilisez n = C × V (V en litres). Pour un gaz parfait, appliquez n = (P × V) / (R × T), avec P en pascals, V en mètres cubes, T en kelvins et R = 8,314 J·mol⁻¹·K⁻¹."
---

La **stœchiométrie** (du grec *stoicheion*, élément, et *metron*, mesure) établit les proportions quantitatives exactes reliant réactifs et produits au cours d'une transformation chimique. Elle découle de la loi de conservation de la masse d'Antoine Lavoisier : aucun atome n'apparaît ni ne disparaît, les liaisons se réorganisent selon les rapports entiers d'une équation équilibrée.

En synthèse organique, en génie chimique, en métallurgie et en analyse environnementale, les bilans stœchiométriques permettent de doser les réactifs au plus juste, d'identifier le réactif limitant et d'estimer le rendement théorique d'un procédé. Pour équilibrer vos réactions et calculer masses produites et excès restants, utilisez notre [Calculatrice de Stœchiométrie](/fr/calculatrices/calculateur-de-stoechiometrie).

## Les lois opératoires de la stœchiométrie

Tout calcul stœchiométrique transforme des mesures macroscopiques (grammes, litres, pascals) en une grandeur centrale unique : la **quantité de matière `n` en moles (`mol`)**. Pour une réaction générale `a A + b B → c C + d D`, les équations de base s'écrivent :

```text
Masse → moles : n = m / M
Solution → moles : n = C × V
Gaz parfait → moles : n = (P × V) / (R × T)
Réactif au temps t : n_A(ξ) = n_A,0 − a × ξ
Produit au temps t : n_C(ξ) = n_C,0 + c × ξ
Rendement (%) : η = (m_expérimentale / m_théorique) × 100
```

Chaque symbole possède une définition précise :

- **`a, b, c, d` (coefficients stœchiométriques)** : entiers positifs ajustant le bilan atomique et électrique de part et d'autre de la flèche `→`.
- **`M` (masse molaire en `g/mol`)** : masse d'une mole de l'espèce considérée.
- **`ξ` (avancement molaire en `mol`)** : variable unique indiquant le degré de progression de la réaction.
- **`ξ_max` (avancement maximal)** : plus petite valeur entre `n_A,0 / a` et `n_B,0 / b`. Le réactif correspondant est le **réactif limitant**, l'autre restant **en excès**.
- **`η` (rendement)** : pourcentage de la masse théorique effectivement isolée sous forme pure à la fin de l'expérience.

## Exemple chiffré : réduction de l'oxyde de fer(III)

Étudions la réduction de l'hématite (`Fe₂O₃`) par le monoxyde de carbone (`CO`) dans un haut-fourneau :

```text
Fe₂O₃ (s) + 3 CO (g) → 2 Fe (s) + 3 CO₂ (g)
```

On engage `100,0 g` de `Fe₂O₃` (`M = 159,69 g/mol`) et `60,0 g` de `CO` (`M = 28,01 g/mol`). Déterminons le réactif limitant, la masse théorique de fer obtenue, l'excès de `CO` et le rendement si `61,5 g` de fer pur sont isolés.

### Étape 1 : convertir les masses en moles

```text
n₀(Fe₂O₃) = 100,0 / 159,69 = 0,6262 mol
n₀(CO) = 60,0 / 28,01 = 2,1421 mol
```

### Étape 2 : trouver le réactif limitant via ξ_max

On divise chaque quantité initiale par son coefficient stœchiométrique :

```text
Pour Fe₂O₃ : ξ₁ = 0,6262 / 1 = 0,6262 mol
Pour CO : ξ₂ = 2,1421 / 3 = 0,7140 mol
```

Comme `0,6262 mol < 0,7140 mol`, **`Fe₂O₃` est le réactif limitant** et `ξ_max = 0,6262 mol`.

### Étape 3 : dresser le bilan massique et calculer le rendement

Avec `M(Fe) = 55,845 g/mol` et `M(CO₂) = 44,009 g/mol` :

```text
Fer formé : n(Fe) = 2 × 0,6262 = 1,2524 mol ⇒ m_th(Fe) = 1,2524 × 55,845 = 69,94 g
CO₂ dégagé : n(CO₂) = 3 × 0,6262 = 1,8786 mol ⇒ m(CO₂) = 1,8786 × 44,009 = 82,68 g
CO restant : n_rest(CO) = 2,1421 − 1,8786 = 0,2635 mol ⇒ m = 0,2635 × 28,01 = 7,38 g
```

Vérification de Lavoisier : la masse consommée (`100,0 g Fe₂O₃ + 52,62 g CO = 152,62 g`) égale exactement la masse formée (`69,94 g Fe + 82,68 g CO₂ = 152,62 g`). Pour `61,5 g` de fer récoltés, le rendement atteint :

```text
η = (61,5 / 69,94) × 100 = 87,9 %
```

## Tableau de six réactions stœchiométriques de référence

| Réaction chimique | Équation équilibrée | Rapports molaires | Égalité stœchiométrique | Application |
| :--- | :--- | :--- | :--- | :--- |
| Synthèse de l'ammoniac | `N₂ + 3 H₂ → 2 NH₃` | `1 : 3 → 2` | `n(H₂) = 3 × n(N₂)` | Procédé Haber-Bosch (engrais) |
| Combustion du méthane | `CH₄ + 2 O₂ → CO₂ + 2 H₂O` | `1 : 2 → 1 : 2` | `n(O₂) = 2 × n(CH₄)` | Énergie thermique et bilans CO₂ |
| Neutralisation acide-base | `H₂SO₄ + 2 NaOH → Na₂SO₄ + 2 H₂O` | `1 : 2 → 1 : 2` | `n(NaOH) = 2 × n(H₂SO₄)` | Titrage et traitement d'effluents |
| Aluminothermie | `Fe₂O₃ + 2 Al → 2 Fe + Al₂O₃` | `1 : 2 → 2 : 1` | `n(Al) = 2 × n(Fe₂O₃)` | Soudure de rails ferroviaires |
| Fermentation alcoolique | `C₆H₁₂O₆ → 2 C₂H₅OH + 2 CO₂` | `1 → 2 : 2` | `1 mol` glucose → `2 mol` éthanol | Biotechnologie et bioéthanol |
| Précipitation des chlorures | `AgNO₃ + NaCl → AgCl↓ + NaNO₃` | `1 : 1 → 1 : 1` | `n(AgNO₃) = n(NaCl)` | Gravimétrie et dosage de Mohr |

## Usages industriels et erreurs fréquentes

Dans l'industrie chimique, on introduit le réactif le moins coûteux en excès (`10 %` à `20 %`) pour consommer le réactif précieux ou déplacer l'équilibre selon Le Chatelier. En thermique, un excès d'air prévient la formation de monoxyde de carbone (`CO`).

Quatre erreurs expliquent la majorité des résultats erronés :

- **Comparer des grammes** : dans `2 H₂ + O₂ → 2 H₂O`, `10 g` de `H₂` (`5,0 mol`) et `10 g` de `O₂` (`0,31 mol`) pèsent autant, mais l'oxygène est limitant.
- **Oublier la pureté** : un minerai à `80 %` ou un acide à `37 %` exige de multiplier la masse pesée par le titre avant de diviser par `M`.
- **Confondre plafond et équilibre** : une réaction équilibrée s'arrête avant l'épuisement du limitant ; `m_théorique` reste la référence du rendement.
- **Négliger l'économie d'atomes** : un rendement de `95 %` peut générer de lourds déchets (`M_utile / ∑ M_réactifs × 100`).
