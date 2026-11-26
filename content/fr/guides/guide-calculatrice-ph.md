---
title: "Calculatrice de pH : Mesurer l'Acidité"
description: "Comprenez l'échelle de pH, apprenez à calculer la concentration en ions hydrogène avec les logarithmes, et utilisez notre Calculatrice de pH."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "ph-calculator"
relatedType: "calculator"
faqs:
  - question: "Le pH d'une solution peut-il être négatif ou supérieur à 14 ?"
    answer: "Oui. L'intervalle de 0 à 14 correspond aux solutions aqueuses diluées dont les concentrations sont comprises entre 1 mol/L d'acide fort et 1 mol/L de base forte à 25 °C. Un acide fort concentré comme HCl à 2 mol/L présente un pH théorique d'environ −0,30, tandis qu'une solution de soude à 5 mol/L dépasse 14."
  - question: "Pourquoi une eau pure n'a-t-elle un pH neutre égal à 7,00 qu'à 25 °C ?"
    answer: "L'autoprotolyse de l'eau est un processus endothermique : sa constante d'équilibre Ke augmente avec la température. À 25 °C, Ke = 1,00 × 10⁻¹⁴ et la neutralité ([H₃O⁺] = [OH⁻]) se situe à pH = 7,00. À 37 °C (température corporelle), Ke vaut environ 2,4 × 10⁻¹⁴ et l'eau pure neutre a un pH de 6,81 tout en restant parfaitement neutre."
  - question: "Quelle est la différence de calcul entre un acide fort et un acide faible ?"
    answer: "Un acide fort (HCl, HNO₃, HClO₄) se dissocie totalement dans l'eau : [H₃O⁺] égale directement la concentration initiale Ca. Un acide faible (acide acétique, acide citrique) ne se dissocie que partiellement selon sa constante d'acidité Ka, ce qui impose d'utiliser Ka (ou pKa) pour trouver [H₃O⁺]."
  - question: "Que devient le pH d'un acide fort très dilué, par exemple à 10⁻⁸ mol/L ?"
    answer: "La formule simplifiée pH = −log₁₀(Ca) donnerait un pH erroné de 8,00 (basique) pour un acide. À très forte dilution (Ca < 10⁻⁶ mol/L), les ions H₃O⁺ issus de l'autoprotolyse naturelle de l'eau (10⁻⁷ mol/L) ne sont plus négligeables. Il faut résoudre l'équation quadratique exacte, qui donne un pH de 6,98."
  - question: "Pourquoi un écart de 1 unité de pH correspond-il à une acidité 10 fois plus grande ?"
    answer: "Parce que le pH est défini par un logarithme décimal négatif : pH = −log₁₀([H₃O⁺]). Diminuer le pH d'une unité multiplie la concentration en ions oxonium par 10¹ = 10 ; une baisse de 3 unités de pH multiplie cette concentration par 10³ = 1 000."
---

Le **pH** (« potentiel hydrogène ») mesure l'acidité ou la basicité d'une solution aqueuse sur une échelle logarithmique inversée, centrée sur `7,00` à `25 °C`. Une solution est **acide** lorsque `pH < 7` (excès d'ions oxonium `H₃O⁺`, souvent notés `H⁺` par simplification), **neutre** lorsque `pH = 7` (`[H₃O⁺] = [OH⁻]`) et **basique ou alcaline** lorsque `pH > 7`.

Notre [Calculatrice de pH](/fr/calculatrices/calculateur-de-ph) convertit instantanément une concentration molaire en ions hydrogène (`[H₃O⁺]` ou `[H⁺]`) en valeur de pH exacte, et effectue l'opération inverse pour retrouver la concentration molaire à partir d'un pH mesuré au laboratoire.

## Formules logarithmiques et équilibres acido-basiques

Introduit par le biochimiste danois Søren Sørensen en 1909, le pH permet de condenser des concentrations variant sur plus de quatorze ordres de grandeur en nombres simples à manipuler. Rigoureusement défini à partir de l'activité chimique des ions oxonium (`a(H₃O⁺)`), il s'exprime dans les solutions diluées en fonction de la concentration molaire `[H₃O⁺]` en `mol/L` (`M`).

Les grandeurs fondamentales à `25 °C` sont :
- `[H₃O⁺]` : concentration molaire effective en ions oxonium (`mol/L`) ;
- `Ca` : concentration analytique initiale de l'acide apporté (`mol/L`) ;
- `Ka` : constante d'acidité du couple acide/base faible (`pKa = −log₁₀(Ka)`) ;
- `Ke` : produit ionique de l'eau (`Ke = [H₃O⁺] × [OH⁻] = 1,00 × 10⁻¹⁴` à `25 °C`).

```text
Définition générale      : pH = −log₁₀([H₃O⁺])
Concentration inverse    : [H₃O⁺] = 10^(−pH)
Acide fort monoprotique  : pH = −log₁₀(Ca)              [valide si Ca ≥ 10⁻⁶ mol/L]
Acide faible (Ca/Ka≥100) : [H₃O⁺] ≈ √(Ka × Ca)    ⇒    pH ≈ ½ × (pKa − log₁₀(Ca))
Solution tampon          : pH = pKa + log₁₀([Base] / [Acide])
```

En raison du signe négatif devant le logarithme décimal, plus `[H₃O⁺]` augmente, plus le pH diminue. Chaque baisse de `1` unité de pH multiplie par **`10`** la concentration en ions `H₃O⁺` ; une baisse de `2` unités la multiplie par **`100`**, et une baisse de `3` unités par **`1 000`**.

## Exemples numériques détaillés : acide fort, acide faible et calcul inverse

### Cas 1 : Solution d'acide chlorhydrique (`HCl`, acide fort)

On prépare une solution aqueuse d'acide chlorhydrique à `Ca = 2,5 × 10⁻³ mol/L` à `25 °C`. Comme `HCl` est un acide fort totalement dissocié dans l'eau (`HCl + H₂O → H₃O⁺ + Cl⁻`), on a `[H₃O⁺] = 2,5 × 10⁻³ mol/L`.
- `pH = −log₁₀(2,5 × 10⁻³) = −(log₁₀(2,5) − 3) = −(0,3979 − 3) = 2,60`

### Cas 2 : Solution d'acide acétique (`CH₃COOH`, acide faible)

Calculons le pH d'un vinaigre blanc assimilé à une solution d'acide acétique à `Ca = 0,10 mol/L` (`pKa = 4,76`, soit `Ka = 1,74 × 10⁻⁵`). Vérifions d'abord l'approximation de faible dissociation : `Ca / Ka = 0,10 / (1,74 × 10⁻⁵) ≈ 5 747 ≥ 100`, la formule simplifiée est donc valide.
- `[H₃O⁺] ≈ √(1,74 × 10⁻⁵ × 0,10) = √(1,74 × 10⁻⁶) = 1,319 × 10⁻³ mol/L`
- `pH = −log₁₀(1,319 × 10⁻³) = 2,88` (identique à `0,5 × (4,76 − (−1,00)) = 2,88`)

### Cas 3 : Calcul inverse depuis un pH mesuré

Une eau minérale affiche un pH de `6,40` à `25 °C`. Sa concentration en ions oxonium vaut :
- `[H₃O⁺] = 10^(−6,40) = 3,98 × 10⁻⁷ mol/L`

## Échelle de référence : pH et concentrations ioniques de milieux courants (25 °C)

Le tableau suivant met en correspondance le pH de solutions courantes et leurs concentrations molaires exactes en ions `H₃O⁺` et `OH⁻` :

| Milieu ou solution | pH typique | `[H₃O⁺]` (`mol/L`) | `[OH⁻]` (`mol/L`) | Qualification |
| :--- | :---: | :---: | :---: | :--- |
| **Acide gastrique humain** | `1,5` | `3,16 × 10⁻²` | `3,16 × 10⁻¹³` | Fortement acide |
| **Jus de citron frais** | `2,2` | `6,31 × 10⁻³` | `1,58 × 10⁻¹²` | Acide |
| **Café noir filtré** | `5,0` | `1,00 × 10⁻⁵` | `1,00 × 10⁻⁹` | Légèrement acide |
| **Eau pure déminéralisée** | `7,0` | `1,00 × 10⁻⁷` | `1,00 × 10⁻⁷` | Neutre |
| **Sang artériel humain** | `7,4` | `3,98 × 10⁻⁸` | `2,51 × 10⁻⁷` | Légèrement basique (tamponné) |
| **Eau de mer de surface** | `8,1` | `7,94 × 10⁻⁹` | `1,26 × 10⁻⁶` | Faiblement basique |
| **Eau de Javel diluée** | `11,5` | `3,16 × 10⁻¹²` | `3,16 × 10⁻³` | Fortement basique |

## Usages pratiques, erreurs courantes et limites de précision

Le suivi du pH est critique dans de nombreux domaines réglementés et scientifiques :
- **Qualité de l'eau et santé publique** : en France et dans l'Union européenne, l'eau destinée à la consommation humaine doit respecter une plage de pH comprise entre `6,5` et `9,0` afin d'éviter la corrosion des canalisations ou l'entartrage. En piscine, un pH maintenu entre `7,2` et `7,4` maximise l'efficacité désinfectante de l'acide hypochloreux tout en préservant le confort oculaire.
- **Physiologie clinique** : le pH du sang artériel est strictement régulé entre `7,35` et `7,45` par le couple tampon bicarbonate/acide carbonique (`HCO₃⁻ / CO₂`) ; tout écart déclenche une acidose ou une alcalose métabolique ou respiratoire.
- **Agronomie et œnologie** : le pH du sol conditionne l'assimilation des oligo-éléments par les cultures, tandis qu'en vinification un moût autour de `pH 3,2–3,5` protège le vin contre le développement microbien.

Pour éviter les biais de calcul et de mesure, gardez à l'esprit ces précautions :
1. **Autoprotolyse aux très faibles concentrations** : dès que `Ca` descend sous `10⁻⁶ mol/L`, résolvez l'équation de conservation de l'électroneutralité `[H₃O⁺]² − Ca × [H₃O⁺] − Ke = 0` plutôt que d'appliquer `−log₁₀(Ca)`.
2. **Effet de la température et de la force ionique** : dans des saumures ou solutions très concentrées, les interactions électrostatiques abaissent le coefficient d'activité `γ`, de sorte que `pH = −log₁₀(γ × [H₃O⁺])` s'écarte légèrement du calcul idéal.
3. **Étalonnage du pH-mètre** : toute mesure instrumentale exige un étalonnage préalable en deux points avec des solutions tampons certifiées encadrant la plage mesurée (par exemple `pH 4,01` et `7,00`, ou `7,00` et `10,01`) et une compensation thermique active.
