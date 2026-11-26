---
title: "Calculatrice de pOH : L'Inverse du pH"
description: "Découvrez comment l'échelle de pOH mesure l'alcalinité, la relation entre pH et pOH (pH + pOH = 14), et utilisez notre Calculatrice de pOH."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "poh-calculator"
relatedType: "calculator"
faqs:
  - question: "Pourquoi la somme pH + pOH vaut-elle 14,00 et cette règle est-elle toujours vraie ?"
    answer: "Elle découle directement du produit ionique de l'eau Ke = [H₃O⁺] × [OH⁻] = 1,00 × 10⁻¹⁴ à 25 °C : en prenant −log₁₀ de chaque membre, on obtient pH + pOH = pKe = 14,00. Cette égalité n'est exacte qu'à 25 °C (298,15 K) ; à 60 °C, pKe chute à 13,02 et à 100 °C il vaut 12,29."
  - question: "Une solution avec un pOH de 2 est-elle acide ou basique ?"
    answer: "Elle est fortement basique (alcaline). L'échelle de pOH fonctionne à l'inverse de celle du pH : un pOH faible (pOH < 7 à 25 °C) indique une concentration élevée en ions hydroxyde OH⁻ (ici 10⁻² = 0,01 mol/L), ce qui correspond à un pH de 14 − 2 = 12."
  - question: "Comment calculer le pOH d'une dibase forte comme l'hydroxyde de calcium Ca(OH)₂ ?"
    answer: "Chaque mole de Ca(OH)₂ totalement dissoute libère deux moles d'ions hydroxyde (Ca(OH)₂ → Ca²⁺ + 2 OH⁻). Il faut donc d'abord multiplier la concentration molaire de la base par 2 avant d'appliquer pOH = −log₁₀([OH⁻])."
  - question: "Quelle est la différence entre le pOH et l'alcalinité (TAC) d'une eau ?"
    answer: "Le pOH (et le pH) mesure une intensité instantanée : la concentration en ions OH⁻ libres présents à l'équilibre. L'alcalinité (ou Titre Alcalimétrique Complet, TAC) mesure la capacité tampon globale de l'eau à neutraliser un acide, principalement due aux ions bicarbonates (HCO₃⁻) et carbonates (CO₃²⁻)."
  - question: "Peut-on mesurer directement le pOH avec une sonde dédiée comme un pH-mètre ?"
    answer: "En pratique courante, on mesure toujours le pH à l'aide d'une électrode de verre sensible aux ions H₃O⁺, puis on déduit le pOH grâce à la relation pOH = pKe − pH corrigée de la température mesurée par la sonde."
---

Le **pOH** (« potentiel hydroxyde ») quantifie la basicité (alcalinité) d'une solution aqueuse en mesurant sur une échelle logarithmique négative la concentration molaire des ions hydroxyde (`OH⁻`). Plus une solution contient d'ions `OH⁻`, plus son pOH est faible : à `25 °C`, un `pOH < 7` caractérise un milieu **basique**, un `pOH = 7` correspond à la **neutralité** et un `pOH > 7` indique un milieu **acide**.

Complémentaire du pH, l'échelle de pOH simplifie considérablement l'étude des bases fortes (`NaOH`, `KOH`, `Ca(OH)₂`) et des bases faibles (`NH₃`). Notre [Calculatrice de pOH](/fr/calculatrices/calculateur-de-poh) détermine instantanément le pOH, le pH ainsi que les concentrations `[OH⁻]` et `[H₃O⁺]` à partir de n'importe laquelle de ces quatre grandeurs.

## Équations du pOH et couplage avec le produit ionique de l'eau

L'eau pure subit une réaction d'autoprotolyse réversible (`2 H₂O ⇌ H₃O⁺ + OH⁻`) dont la constante d'équilibre, le **produit ionique de l'eau** `Ke`, lie indissociablement les concentrations des ions oxonium et hydroxyde.

Les grandeurs de référence à `25 °C` (`298,15 K`) sont :
- `[OH⁻]` : concentration molaire en ions hydroxyde (`mol/L` ou `M`) ;
- `[H₃O⁺]` : concentration molaire en ions oxonium (`mol/L`) ;
- `Cb` : concentration analytique de la base dissoute (`mol/L`) ;
- `Kb` : constante de basicité d'une base faible (`pKb = −log₁₀(Kb)`), reliée à son acide conjugué par `pKa + pKb = pKe` ;
- `Ke` : produit ionique de l'eau, valant `1,00 × 10⁻¹⁴` à `25 °C` (`pKe = −log₁₀(Ke) = 14,00`).

```text
Définition du pOH          : pOH = −log₁₀([OH⁻])
Concentration en OH⁻       : [OH⁻] = 10^(−pOH)
Produit ionique de l'eau   : Ke = [H₃O⁺] × [OH⁻] = 1,00 × 10⁻¹⁴  (à 25 °C)
Relation pH / pOH          : pH + pOH = pKe = 14,00             (à 25 °C)
Base forte monobasique     : pOH = −log₁₀(Cb)                   [si Cb ≥ 10⁻⁶ mol/L]
Base faible (Cb / Kb ≥ 100): [OH⁻] ≈ √(Kb × Cb)   ⇒   pOH ≈ ½ × (pKb − log₁₀(Cb))
```

Ainsi, chaque diminution de `1` unité de pOH traduit une concentration en ions `OH⁻` multipliée par **`10`**, exactement symétrique à la logique du pH pour les ions `H₃O⁺`.

## Exemples numériques complets : base forte, dibase et base faible

### Cas 1 : Solution d'hydroxyde de sodium (`NaOH`, base forte)

Calculons le pOH et le pH d'une solution de soude caustique à `Cb = 4,0 × 10⁻³ mol/L` à `25 °C`. La dissociation est totale (`NaOH → Na⁺ + OH⁻`), donc `[OH⁻] = 4,0 × 10⁻³ mol/L` :
1. `pOH = −log₁₀(4,0 × 10⁻³) = −(0,6021 − 3) = 2,40`
2. `pH = 14,00 − 2,40 = 11,60`
3. `[H₃O⁺] = 10^(−11,60) = 2,51 × 10⁻¹² mol/L`

### Cas 2 : Solution d'hydroxyde de calcium (`Ca(OH)₂`, dibase forte)

Une eau de chaux limpide contient `Cb = 1,5 × 10⁻³ mol/L` de `Ca(OH)₂`. Chaque mole libérant `2` moles d'ions hydroxyde, on obtient `[OH⁻] = 2 × 1,5 × 10⁻³ = 3,0 × 10⁻³ mol/L` :
1. `pOH = −log₁₀(3,0 × 10⁻³) = 2,52`
2. `pH = 14,00 − 2,52 = 11,48`

### Cas 3 : Solution d'ammoniac (`NH₃`, base faible)

On prépare une solution d'ammoniac à `Cb = 0,20 mol/L` (`pKb = 4,75`, soit `Kb = 1,78 × 10⁻⁵`). Comme `Cb / Kb ≈ 11 236 ≥ 100`, l'approximation s'applique :
1. `[OH⁻] ≈ √(1,78 × 10⁻⁵ × 0,20) = √(3,56 × 10⁻⁶) = 1,887 × 10⁻³ mol/L`
2. `pOH = −log₁₀(1,887 × 10⁻³) = 2,72`
3. `pH = 14,00 − 2,72 = 11,28`

## Tableau comparatif : correspondance entre pOH, pH et concentrations à 25 °C

Ce tableau illustre le caractère parfaitement inversé des échelles pOH et pH sur sept solutions aqueuses usuelles :

| Solution aqueuse | `[OH⁻]` (`mol/L`) | pOH | pH | `[H₃O⁺]` (`mol/L`) | Caractère du milieu |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Soude caustique `1,0 M`** | `1,00` | `0,00` | `14,00` | `1,00 × 10⁻¹⁴` | Très fortement basique |
| **Soude diluée `0,01 M`** | `1,00 × 10⁻²` | `2,00` | `12,00` | `1,00 × 10⁻¹²` | Fortement basique |
| **Ammoniaque ménagère** | `1,58 × 10⁻³` | `2,80` | `11,20` | `6,31 × 10⁻¹²` | Basique |
| **Lait de magnésie (`Mg(OH)₂`)** | `3,16 × 10⁻⁴` | `3,50` | `10,50` | `3,16 × 10⁻¹¹` | Modérément basique |
| **Bicarbonate de sodium `0,1 M`** | `2,00 × 10⁻⁶` | `5,70` | `8,30` | `5,01 × 10⁻⁹` | Faiblement basique |
| **Eau pure neutre (`25 °C`)** | `1,00 × 10⁻⁷` | `7,00` | `7,00` | `1,00 × 10⁻⁷` | Neutre |
| **Vinaigre blanc** | `3,16 × 10⁻¹²` | `11,50` | `2,50` | `3,16 × 10⁻³` | Acide |

## Dépendance thermique, erreurs courantes et applications industrielles

La relation `pH + pOH = 14,00` constitue un cas particulier valable uniquement à `25 °C`. Comme l'autoprotolyse de l'eau absorbe de la chaleur, `Ke` croît fortement avec la température :
- À **`0 °C`** : `Ke = 0,114 × 10⁻¹⁴` → `pKe = 14,94` (neutralité à `pH = pOH = 7,47`) ;
- À **`25 °C`** : `Ke = 1,00 × 10⁻¹⁴` → `pKe = 14,00` (neutralité à `pH = pOH = 7,00`) ;
- À **`60 °C`** : `Ke = 9,6 × 10⁻¹⁴` → `pKe = 13,02` (neutralité à `pH = pOH = 6,51`) ;
- À **`100 °C`** : `Ke = 5,1 × 10⁻¹³` → `pKe = 12,29` (neutralité à `pH = pOH = 6,15`).

En laboratoire et dans l'industrie (traitement et neutralisation des effluents alcalins, bains de dégraissage métallurgique, saponification des corps gras, contrôle des chaudières industrielles), trois erreurs reviennent régulièrement :
1. **Oublier la stœchiométrie des polybases** (`Ca(OH)₂`, `Ba(OH)₂`), qui libèrent deux ions `OH⁻` par unité de formule.
2. **Appliquer `pOH = −log₁₀(Cb)` aux bases extrêmement diluées** (`Cb < 10⁻⁶ mol/L`), ce qui conduit à un pOH supérieur à `7` (donc un pH faussement acide). Dans cette zone, l'autoprotolyse de l'eau impose de résoudre `[OH⁻]² − Cb × [OH⁻] − Ke = 0`.
3. **Confondre pOH et pouvoir tampon alcalin** : deux solutions de `NaOH` diluée et de tampon carbonate peuvent afficher le même `pOH = 4,0`, mais la seconde exigera un volume d'acide beaucoup plus important pour être ramenée à la neutralité.
