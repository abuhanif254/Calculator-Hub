---
title: "Calculatrice de Tampon : Maintenir la Stabilité du pH"
description: "Comprenez comment fonctionnent les solutions tampons, comment calculer le ratio acide/base, et utilisez notre Calculatrice de Tampon."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "buffer-calculator"
faqs:
  - question: "Comment choisir le meilleur acide faible pour préparer un tampon à un pH donné ?"
    answer: "Sélectionnez un couple acide-base dont le pKa est le plus proche possible du pH cible, impérativement dans l'intervalle pKa − 1 ≤ pH ≤ pKa + 1. Par exemple, pour maintenir un pH de 5,00, le couple acide acétique / acétate (pKa = 4,76) est idéal, alors qu'un tampon phosphate (pKa2 = 7,20) n'aurait pratiquement aucun pouvoir tampon à ce pH."
  - question: "Quelle est la différence entre la plage tampon et la capacité tampon ?"
    answer: "La plage tampon désigne la zone de pH (généralement pKa ± 1) dans laquelle le couple reste efficace, et dépend uniquement du pKa. La capacité tampon (β) mesure la quantité maximale d'acide ou de base forte que la solution peut absorber avant que son pH ne dérive d'une unité : elle est directement proportionnelle à la concentration totale du tampon."
  - question: "Peut-on préparer un tampon en partant uniquement de l'acide faible et de soude (NaOH) ?"
    answer: "Oui, c'est même une méthode courante en laboratoire. En ajoutant un volume calculé d'une base forte (NaOH) à une solution d'acide faible (HA), on convertit une fraction exacte de HA en sa base conjuguée A⁻. Il faut toutefois veiller à ajuster le volume final à la fiole jaugée pour respecter la concentration totale voulue."
  - question: "Pourquoi le tampon Tris est-il sensible aux changements de température ?"
    answer: "Le pKa du couple Tris/TrisH⁺ varie fortement avec la température (environ −0,028 à −0,031 unité de pH par °C). Un tampon Tris ajusté à pH 8,00 sur la paillasse à 25 °C atteindra environ pH 8,56 s'il est refroidi à 4 °C, et pH 7,66 s'il est incubé à 37 °C. Il faut donc toujours l'ajuster à sa température réelle d'utilisation."
  - question: "Pourquoi un tampon phosphate (PBS) peut-il poser problème dans certains protocoles biologiques ?"
    answer: "Bien que le tampon phosphate soit non toxique et adapté au pH physiologique (7,2–7,4), les ions phosphate forment des précipités insolubles avec les cations divalents tels que Ca²⁺ et Mg²⁺. De plus, il inhibe certaines réactions enzymatiques (phosphatases, kinases). Dans ces cas, on privilégie des tampons zwitterioniques de Good comme HEPES ou MOPS."
---

En biochimie, en chimie analytique et en formulation pharmaceutique, une dérive de quelques dixièmes d'unité de pH suffit à dénaturer une enzyme, faire précipiter une protéine ou fausser une séparation chromatographique. Les **solutions tampons** préviennent ces variations en neutralisant les ajouts modérés d'acides ou de bases forts ainsi que les effets d'une dilution.

Notre [Calculatrice de Tampon](/fr/calculatrices/calculateur-de-tampon) calcule immédiatement le ratio exact entre base conjuguée et acide faible (`[A⁻] / [HA]`) à partir du pH cible et du `pKa` du couple retenu. Vous dimensionnez ainsi avec exactitude les quantités de réactifs et la réserve tampon de vos préparations de laboratoire.

## Mécanisme chimique, ratio de formulation et capacité tampon

Une solution tampon associe en concentrations comparables un **acide faible (`HA`)** et sa **base conjuguée (`A⁻`)** (ou une base faible et son acide conjugué), assurant un double bouclier chimique :

```text
Ajout de base forte  :  HA + OH⁻  → A⁻ + H₂O   (neutralisation par l'acide faible)
Ajout d'acide fort  :  A⁻ + H₃O⁺ → HA + H₂O   (captation par la base conjuguée)
```

Pour formuler un tampon de concentration totale `C_tot = [HA] + [A⁻]` au `pH` souhaité avec un couple de `pKa` connu, on inverse l'équation de Henderson-Hasselbalch pour déduire le ratio `R` et les deux molarités :

```text
R = [A⁻] / [HA] = 10^(pH − pKa)
[HA] = C_tot / (1 + R)      et      [A⁻] = C_tot × R / (1 + R)
```

### Pouvoir tampon (formule de Van Slyke)

Un tampon possède une réserve finie, mesurée par sa **capacité tampon (`β`)**, soit le nombre de moles d'acide ou de base forte (en `mol/L`) nécessaire pour déplacer le pH d'une unité :

```text
β = dC_b / dpH ≈ 2,303 × C_tot × (Ka × [H₃O⁺]) / (Ka + [H₃O⁺])²
```

- **`C_tot` (mol/L)** : concentration molaire totale du système tampon (`[HA] + [A⁻]`).
- **`β_max`** : le pouvoir tampon culmine exactement à `pH = pKa`, où `β_max = (2,303 / 4) × C_tot ≈ 0,576 × C_tot`. Doubler la concentration totale du tampon double directement sa capacité à absorber les perturbations acido-basiques.

## Exemple pratique pas à pas : tampon acétate à pH 5,00 (0,100 mol/L)

Préparons `V = 1,00 L` de tampon acétate à `pH = 5,00` et concentration totale `C_tot = 0,100 mol/L` à 25 °C à partir d'acide acétique pur (`CH₃COOH`, `pKa = 4,76`, `M = 60,05 g/mol`) et d'acétate de sodium anhydre (`CH₃COONa`, `M = 82,03 g/mol`).

**Étape 1 : Calculer le ratio base sur acide `R`**

```text
R = 10^(5,00 − 4,76) = 10^(0,24) = 1,738
```

**Étape 2 : Déterminer les concentrations et masses à peser**

```text
[CH₃COOH] = 0,100 / (1 + 1,738) = 0,100 / 2,738 = 0,0365 mol/L
[CH₃COO⁻] = 0,100 − 0,0365 = 0,0635 mol/L
```

Vérification : `4,76 + log₁₀(0,0635 / 0,0365) = 4,76 + 0,240 = 5,00`. Pour `1,00 L` de solution, les quantités à engager sont :

```text
Masse de CH₃COOH  = 0,0365 mol × 60,05 g/mol = 2,19 g (soit 36,5 mL de solution à 1,00 mol/L)
Masse de CH₃COONa = 0,0635 mol × 82,03 g/mol = 5,21 g
```

**Étape 3 : Protocole final et capacité obtenue**

À `pH = 5,00`, la capacité tampon vaut `β = 2,303 × 0,100 × (1,738 / 2,738²) = 0,0534 mol/(L·pH)`. Dissolvez les réactifs dans environ `800 mL` d'eau déionisée, contrôlez le pH à `25 °C` avec un pH-mètre étalonné en deux points (`pH 4,01` et `7,00`), puis complétez précisément à `1,000 L` en fiole jaugée.

## Tableau des systèmes tampons standards en laboratoire et biologie (à 25 °C)

| Système tampon (couple actif) | pKa (25 °C) | Plage utile | Applications et contraintes expérimentales |
| :--- | :--- | :--- | :--- |
| Glycine-HCl (`GlyH₂⁺ / GlyH`) | `2,35` (`pKa1`) | `2,2 – 3,6` | Digestion peptique, élution d'anticorps sur colonne |
| Citrate (`H₂Cit⁻ / HCit²⁻ / Cit³⁻`) | `3,13` / `4,76` / `6,40` | `3,0 – 6,2` | Large plage acide ; chélate fortement `Ca²⁺` et `Fe³⁺` |
| Acétate (`CH₃COOH / CH₃COO⁻`) | `4,76` | `3,8 – 5,8` | Chromatographie HPLC, dosages enzymatiques, textile |
| MES (`tampon de Good`) | `6,15` | `5,5 – 6,7` | Culture végétale, faible complexation métallique |
| Phosphate / PBS (`H₂PO₄⁻ / HPO₄²⁻`) | `7,20` (`pKa2`) | `6,0 – 8,0` | Biologie cellulaire ; précipite avec `Ca²⁺` et `Mg²⁺` |
| Tris-HCl (`TrisH⁺ / Tris`) | `8,07` | `7,1 – 9,1` | Électrophorèse ADN/protéines ; forte dérive thermique (`−0,03/°C`) |
| Borate (`H₃BO₃ / B(OH)₄⁻`) | `9,24` | `8,2 – 10,2` | Étalons pH-métriques, électrophorèse capillaire |

## Bonnes pratiques de préparation, erreurs courantes et précautions

Trois protocoles de fabrication sont équivalents sur le plan thermodynamique : mélanger directement l'acide faible et son sel conjugué (méthode privilégiée pour maîtriser la force ionique), neutraliser partiellement un acide faible par `NaOH`, ou acidifier partiellement une base faible par `HCl`. Ajustez toujours le volume final en fiole jaugée après toute correction de pH.

Évitez quatre pièges fréquents lors de la mise en œuvre :

- **Concentration inadaptée** : sous `10 mmol/L`, le `CO₂` atmosphérique dissous sature rapidement les tampons basiques ; au-delà de `0,5 mol/L`, la force ionique élevée risque de dénaturer les macromolécules ou de provoquer un choc osmotique cellulaire.
- **Dérive thermique (`dpKa / dT`)** : un tampon Tris ajusté à `pH 8,00` sur paillasse (`25 °C`) monte au-delà de `pH 8,5` s'il est utilisé en chambre froide à `4 °C`.
- **Incompatibilités chimiques** : le Tris interfère avec certains dosages protéiques (BCA) et le phosphate précipite les cofacteurs `Ca²⁺` ou `Mg²⁺` indispensables aux enzymes.
- **Étalonnage pH-métrique insuffisant** : calibrez toujours la sonde avec deux tampons étalons encadrant le pH cible et veillez à l'équilibre thermique avant toute mesure.
