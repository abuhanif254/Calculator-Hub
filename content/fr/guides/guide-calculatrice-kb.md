---
title: "Calculatrice de Kb : Constante de Dissociation Basique"
description: "Calculez la constante de basicité Kb et le pKb des bases faibles, maîtrisez la relation Ka × Kb = Kw et interprétez le pOH en solution aqueuse."
category: "Math & Science"
relatedCalculator: "kb-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Comment la constante Kb mesure-t-elle la force d'une base faible ?"
    answer: "La constante Kb quantifie l'aptitude d'une base faible à capter un proton de l'eau pour former son acide conjugué et des ions hydroxyde OH⁻. Plus Kb est grand, plus la concentration en OH⁻ produite est élevée et plus la base est forte."
  - question: "Quelle est la relation exacte entre Ka, Kb et Kw ?"
    answer: "Pour tout couple acide/base conjuguée en solution aqueuse, le produit vaut toujours Ka × Kb = Kw. À 25 °C, Kw = 1,00 × 10⁻¹⁴, ce qui implique également la relation logarithmique pKa + pKb = 14,00."
  - question: "Comment calculer le Kb à partir du pH d'une solution basique ?"
    answer: "Convertissez d'abord le pH en pOH via pOH = 14,00 − pH (à 25 °C), puis calculez [OH⁻] = 10^(−pOH). Comme [BH⁺] = [OH⁻] et [B] = C₀ − [OH⁻], vous obtenez directement Kb = [OH⁻]² / (C₀ − [OH⁻])."
  - question: "Une base faible peut-elle avoir un pH acide en solution aqueuse ?"
    answer: "Non. En ajoutant une base dans l'eau pure, vous produisez des ions OH⁻, ce qui maintient le pH au-dessus de 7,00 à 25 °C. Même si une base est extrêmement diluée, le pH tend vers la neutralité (7,00) sans jamais devenir acide."
  - question: "Pourquoi la valeur de Kw change-t-elle lorsque la température varie ?"
    answer: "L'autoprotolyse de l'eau (2 H₂O ⇌ H₃O⁺ + OH⁻) est une réaction endothermique. Lorsque la température augmente, l'équilibre se déplace vers la droite : à 37 °C, Kw atteint 2,4 × 10⁻¹⁴ et le pH de neutralité passe à 6,81."
---

Alors qu'un acide cède des protons, une base selon Brønsted-Lowry capte un proton (`H⁺`) aux molécules d'eau environnantes et libère des ions hydroxyde (`OH⁻`). Les bases fortes comme la soude (`NaOH`) s'ionisent totalement, mais les bases faibles telles que l'ammoniac ou les amines n'atteignent qu'une protonation partielle. La **constante de dissociation basique (`Kb`)** mesure la position exacte de cet équilibre.

Plus `Kb` est grand, plus la base génère d'ions `OH⁻` et élève le pH. Pour calculer rapidement `Kb`, convertir `pKb` ou déterminer la constante de l'acide conjugué, utilisez notre [Calculatrice de Kb](/fr/calculatrices/calculateur-de-kb).

## Fondements chimiques, formule de Kb et échelle pKb

Dissoute dans l'eau pure, une base faible neutre `B` réagit réversiblement avec le solvant :

```text
B(aq) + H₂O(l) ⇌ BH⁺(aq) + OH⁻(aq)
```

L'activité de l'eau en large excès étant égale à `1`, la constante de basicité `Kb` s'exprime à partir des molarités à l'équilibre :

```text
Kb = ([BH⁺] × [OH⁻]) / [B]
```

* **`[BH⁺]`** : concentration molaire de l'acide conjugué formé (`mol/L`).
* **`[OH⁻]`** : concentration molaire en ions hydroxyde (`mol/L`), reliée au `pOH` par `pOH = −log₁₀([OH⁻])`.
* **`[B]`** : concentration molaire de la base faible restante (`mol/L`).

L'échelle logarithmique `pKb` facilite la comparaison directe des bases :

```text
pKb = −log₁₀(Kb)    et    Kb = 10^(−pKb)
```

Plus `pKb` est petit, plus la base est forte : une différence d'une unité de `pKb` correspond à un facteur dix sur `Kb`.

### La relation fondamentale Ka × Kb = Kw

Tout couple acide/base conjuguée (`BH⁺ / B`) vérifie le produit ionique de l'eau (`Kw = [H₃O⁺] × [OH⁻]`). En multipliant `Ka(BH⁺)` par `Kb(B)`, les termes `[BH⁺]` et `[B]` se simplifient :

```text
Ka × Kb = Kw = 1,00 × 10⁻¹⁴ (à 25 °C)
pKa + pKb = pKw = 14,00 (à 25 °C)
```

Ainsi, plus un acide est faible, plus sa base conjuguée est forte ; inversement, la base conjuguée d'un acide fort (`Cl⁻`) est spectatrice dans l'eau.

## Exemple numérique détaillé : calcul du Kb de l'ammoniac

Prenons une solution d'ammoniac (`NH₃`) de concentration initiale `C₀ = 0,200 mol/L` à `25 °C`, dont le pH mesuré vaut `11,27`. Déterminons `Kb`, `pKb` et le `pKa` de `NH₄⁺` :

1. **Calculer le `pOH` :** `pOH = 14,00 − 11,27 = 2,73`.
2. **Trouver `[OH⁻]` :** `[OH⁻] = 10^(−2,73) = 1,862 × 10⁻³ mol/L` (l'apport de l'eau à `10⁻⁷ mol/L` est négligeable).
3. **Déduire les espèces à l'équilibre :** `[NH₄⁺] = 1,862 × 10⁻³ mol/L` et `[NH₃] = 0,200 − 0,001862 = 0,1981 mol/L`.
4. **Calculer `Kb` :**

```text
Kb = (1,862 × 10⁻³ × 1,862 × 10⁻³) / 0,1981
Kb = (3,467 × 10⁻⁶) / 0,1981 ≈ 1,75 × 10⁻⁵
```

5. **Déduire `pKb`, `α` et `Ka(NH₄⁺)` :** On obtient `pKb = −log₁₀(1,75 × 10⁻⁵) = 4,76` et un taux de protonation `α = 0,93 %` (inférieur à `5 %`). Pour l'ion ammonium conjugué : `Ka = 1,00 × 10⁻¹⁴ / 1,75 × 10⁻⁵ = 5,71 × 10⁻¹⁰` et `pKa = 9,24`.

## Tableau comparatif des constantes Kb et pKb de bases courantes (à 25 °C)

| Base | Formule | Kb (à 25 °C) | pKb | pKa (conjugué) | Catégorie et usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Diéthylamine | `(C₂H₅)₂NH` | `6,9 × 10⁻⁴` | `3,16` | `10,84` | Amine secondaire ; synthèse organique |
| Méthylamine | `CH₃NH₂` | `4,4 × 10⁻⁴` | `3,36` | `10,64` | Amine primaire ; pharmacie |
| Ammoniac | `NH₃` | `1,8 × 10⁻⁵` | `4,75` | `9,25` | Base minérale ; tampons et eau |
| Hydrazine | `N₂H₄` | `1,3 × 10⁻⁶` | `5,89` | `8,11` | Réducteur ; chaudières industrielles |
| Pyridine | `C₅H₅N` | `1,7 × 10⁻⁹` | `8,77` | `5,23` | Base hétérocyclique ; catalyse |
| Ion acétate | `CH₃COO⁻` | `5,6 × 10⁻¹⁰` | `9,25` | `4,75` | Base conjuguée ; sel alcalinisant |
| Aniline | `C₆H₅NH₂` | `4,3 × 10⁻¹⁰` | `9,37` | `4,63` | Amine aromatique ; colorants |

## Applications industrielles, pièges courants et précision analytique

Le paramètre `Kb` est crucial en **chimie environnementale** et en **formulation pharmaceutique**. Dans le traitement des eaux et l'aquaculture, l'équilibre `NH₃ / NH₄⁺` dicte la toxicité ammoniacale : seule la forme neutre `NH₃` franchit les branchies des poissons (seuil critique dès `0,02 mg/L`), et sa proportion grimpe dès que le pH ou la température s'élèvent. En galénique, le `pKb` des principes actifs aminés guide la formation de sels solubles ou l'extraction liquide-liquide.

Évitez quatre erreurs fréquentes lors de vos calculs :

* **Confondre `pH` et `pOH` :** L'expression de `Kb` donne `[OH⁻]`, donc le `pOH` ; convertissez toujours en `pH = pKw − pOH`.
* **Figer `Kw` à `1,00 × 10⁻¹⁴` hors `25 °C` :** `Kw` vaut `1,14 × 10⁻¹⁵` à `0 °C` et `5,48 × 10⁻¹⁴` à `50 °C`.
* **Abuser de l'approximation `C₀ − x ≈ C₀` :** Lorsque `C₀ / Kb < 400`, résolvez l'équation quadratique `x² + Kb·x − Kb·C₀ = 0`.
* **Négliger la force ionique :** En milieu salin concentré, les coefficients d'activité `γ` modifient le pH mesuré par rapport au modèle idéal.
