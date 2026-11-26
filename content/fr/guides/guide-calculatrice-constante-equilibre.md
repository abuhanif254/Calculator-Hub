---
title: "Calculatrice de Constante d'Équilibre : Mesurer l'Équilibre Chimique"
description: "Apprenez à calculer la constante d'équilibre Keq (Kc et Kp), à comparer le quotient réactionnel Q à Keq et à appliquer le principe de Le Chatelier."
category: "Math & Science"
relatedCalculator: "equilibrium-constant-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Que signifie concrètement une constante d'équilibre Keq très grande ou très petite ?"
    answer: "Une constante Keq supérieure à 10³ indique une réaction quasi totale favorisant fortement les produits à l'équilibre. À l'inverse, une valeur inférieure à 10⁻³ signifie que les réactifs restent largement majoritaires et que la transformation directe reste très limitée."
  - question: "Pourquoi les solides et les liquides purs n'apparaissent-ils pas dans la formule de Keq ?"
    answer: "La constante d'équilibre thermodynamique repose sur les activités chimiques. Or, l'activité d'un solide pur ou d'un liquide pur (comme un solvant en large excès) reste constante et égale à 1 tant qu'une phase pure subsiste, ce qui les exclut du calcul."
  - question: "Quelle est la différence entre la constante Kc et le quotient réactionnel Q ?"
    answer: "Kc et Q partagent exactement la même formule mathématique, mais Kc n'est évalué qu'avec les concentrations mesurées à l'équilibre. Q se calcule à n'importe quel instant : si Q < Kc, la réaction évolue vers les produits ; si Q > Kc, elle évolue en sens inverse."
  - question: "Un catalyseur ou un changement de pression modifie-t-il la valeur de Keq ?"
    answer: "Non. Un catalyseur accélère simultanément les vitesses directe et inverse sans modifier Keq. De même, une variation de pression ou de concentration déplace le système selon Le Chatelier en changeant Q, mais la constante Keq demeure inchangée tant que la température reste fixe."
  - question: "Comment la température influence-t-elle la constante d'équilibre Keq ?"
    answer: "La température est le seul paramètre physique capable de modifier Keq, selon l'équation de Van 't Hoff. Une hausse de température augmente Keq pour une réaction endothermique (ΔH° > 0) et diminue Keq pour une réaction exothermique (ΔH° < 0)."
---

De nombreuses réactions chimiques sont **réversibles** : tandis que les réactifs forment des produits, ces derniers se recombinent en sens inverse pour régénérer les réactifs. Lorsque les deux vitesses opposées deviennent égales, le système atteint un **équilibre dynamique** où les concentrations macroscopiques restent constantes dans le temps.

La **constante d'équilibre (`Keq`)** mesure la position de cet équilibre à une température donnée et révèle si les produits ou les réactifs dominent. Pour calculer rapidement `Kc` à partir des molarités et des exposants stœchiométriques, utilisez notre [Calculatrice de Constante d'Équilibre](/fr/calculatrices/calculateur-de-constante-d-equilibre).

## Loi d'action des masses : expressions de Kc, Kp et quotient Q

Pour une réaction équilibrée entre espèces dissoutes ou gazeuses :

```text
a A + b B ⇌ c C + d D
```

La constante d'équilibre exprimée en concentrations molaires (`Kc`) correspond au rapport des produits sur les réactifs à l'équilibre, chacun élevé à la puissance de son coefficient stœchiométrique :

```text
Kc = ([C]^c × [D]^d) / ([A]^a × [B]^b)
```

* **`[A]`, `[B]`, `[C]`, `[D]`** : concentrations molaires à l'équilibre (`mol/L`).
* **`a`, `b`, `c`, `d`** : coefficients stœchiométriques de l'équation ajustée.
* **Phases exclues :** Les solides purs `(s)` et liquides purs `(l)` ont une activité égale à `1` et sont omis de l'expression.

### Relation entre Kc et Kp pour les gaz

Pour des gaz parfaits, la constante en pressions partielles (`Kp`) se relie à `Kc` par :

```text
Kp = (P_C^c × P_D^d) / (P_A^a × P_B^b)
Kp = Kc × (R × T)^Δn
```

Ici, `T` est la température en kelvins (`°C + 273,15`), `Δn = (c + d) − (a + b)` représente la variation du nombre de moles gazeuses, et `R` vaut `0,08314 L·bar·mol⁻¹·K⁻¹` (pressions en bars) ou `0,08206 L·atm·mol⁻¹·K⁻¹` (en atmosphères).

### Prédire le sens d'évolution avec le quotient Q

Le **quotient réactionnel (`Q`)** utilise la même formule que `Kc` mais s'évalue à tout instant hors équilibre :

* **`Q < Keq` :** Réaction spontanée dans le sens direct (formation de produits).
* **`Q = Keq` :** Système à l'équilibre thermodynamique.
* **`Q > Keq` :** Réaction dans le sens inverse (régénération des réactifs).

## Exemple résolu pas à pas : synthèse de l'ammoniac et conversion Kc / Kp

Étudions le procédé Haber-Bosch à `500 °C` (`773,15 K`) :

```text
N₂(g) + 3 H₂(g) ⇌ 2 NH₃(g)
```

Supposons à l'équilibre `[N₂] = 0,40 mol/L`, `[H₂] = 0,60 mol/L` et `[NH₃] = 0,24 mol/L`.

1. **Exprimer `Kc` :** `Kc = [NH₃]² / ([N₂] × [H₂]³)`.
2. **Calculer `Kc` :**

```text
Kc = (0,24)² / (0,40 × 0,60³) = 0,0576 / (0,40 × 0,216) = 0,0576 / 0,0864 ≈ 0,667
```

3. **Tester le quotient `Q` :** Si `[NH₃]` valait initialement `0,10 mol/L` pour les mêmes `[N₂]` et `[H₂]`, on aurait `Q = (0,10)² / 0,0864 = 0,116 < 0,667` : le mélange produirait davantage de `NH₃`.
4. **Convertir en `Kp` (en bars) :** Avec `Δn = 2 − (1 + 3) = −2` et `R × T = 0,08314 × 773,15 = 64,28 L·bar·mol⁻¹` :

```text
Kp = 0,667 × (64,28)^(−2) = 0,667 / 4131,9 ≈ 1,61 × 10⁻⁴
```

## Tableau comparatif des ordres de grandeur de Keq et ΔG° (à 25 °C)

Ce tableau associe `Keq` à l'enthalpie libre standard `ΔG° = −R·T·ln(Keq)` à `298,15 K` (`25 °C`).

| Plage de Keq | Valeur type | ΔG° (`kJ/mol`) | État du système à l'équilibre |
| :--- | :--- | :--- | :--- |
| `Keq ≥ 10⁶` | `10⁶` | `−34,2` | Réaction quasi totale ; produits exclusifs |
| `10³ ≤ Keq < 10⁶` | `10³` | `−17,1` | Produits très largement dominants |
| `10 ≤ Keq < 10³` | `10` | `−5,71` | Produits majoritaires, équilibre incomplet |
| `0,1 ≤ Keq < 10` | `1` | `0,00` | Proportions comparables ; sensible à Le Chatelier |
| `10⁻³ ≤ Keq < 0,1` | `10⁻¹` | `+5,71` | Réactifs majoritaires ; extraction continue requise |
| `Keq < 10⁻³` | `10⁻³` | `+17,1` | Réaction directe très défavorable à `25 °C` |

## Facteurs d'influence, principe de Le Chatelier et précautions de calcul

Selon le **principe de Le Chatelier**, toute perturbation imposée à un système en équilibre (ajout de réactif, extraction continue d'un produit comme l'eau lors d'une estérification de Fischer, ou compression gazeuse) modifie le quotient `Q` et déplace la composition jusqu'à ce que `Q` redevienne égal à `Keq`, sans changer la valeur de `Keq`. Dans le procédé Haber-Bosch, une pression élevée (`150` à `300 bars`) favorise ainsi l'ammoniac puisque `4` moles de gaz produisent `2` moles de produit. Seule la **température** modifie numériquement `Keq`, suivant la loi de Van 't Hoff :

```text
ln(K₂ / K₁) = (−ΔH° / R) × (1 / T₂ − 1 / T₁)
```

En pratique industrielle et analytique, évitez quatre erreurs classiques :

* **Intégrer un solide pur dans `Kc` :** Pour `CaCO₃(s) ⇌ CaO(s) + CO₂(g)`, `Kp = P_CO₂` uniquement.
* **Mélanger les unités de `R` :** Harmonisez toujours `R` (`0,08314` pour les bars, `0,08206` pour les atmosphères) dans `Kp = Kc × (R·T)^Δn`.
* **Oublier les transformations algébriques :** Inverser une réaction donne `1 / Keq` ; multiplier ses coefficients par `n` donne `Keq^n`.
* **Confondre thermodynamique et cinétique :** Un grand `Keq` n'implique pas une réaction rapide sans catalyseur.
