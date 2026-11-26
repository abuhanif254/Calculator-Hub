---
title: "Calculatrice de Ka : La Constante de Dissociation Acide"
description: "Maîtrisez le calcul de la constante d'acidité Ka et du pKa, la méthode du tableau d'avancement et le taux de dissociation des acides faibles."
category: "Math & Science"
relatedCalculator: "ka-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Quelle est la différence entre un acide fort et un acide faible selon le Ka ?"
    answer: "Un acide fort se dissocie totalement dans l'eau, avec un Ka très supérieur à 1 (pKa négatif). Un acide faible ne se dissocie que partiellement et établit un équilibre dynamique caractérisé par un Ka inférieur à 1, généralement compris entre 10⁻² et 10⁻¹⁰."
  - question: "Comment passer de la valeur du Ka à celle du pKa ?"
    answer: "Le pKa correspond au cologarithme décimal de Ka : pKa = −log₁₀(Ka). Inversement, vous obtenez Ka à partir du pKa grâce à la relation Ka = 10^(−pKa). Plus le Ka est élevé, plus le pKa est petit et plus l'acide est fort."
  - question: "Quand l'approximation des 5 % est-elle valide pour calculer le Ka ?"
    answer: "Vous pouvez négliger la quantité d'acide dissocié (C₀ − x ≈ C₀) lorsque le taux de dissociation reste inférieur ou égal à 5 %, ce qui correspond généralement au critère C₀ / Ka ≥ 400. En dessous de ce seuil, il faut résoudre l'équation du second degré complète."
  - question: "La constante d'acidité Ka dépend-elle de la concentration initiale de l'acide ?"
    answer: "Non. La constante Ka ne dépend que de la température et de la nature du couple acide/base. En revanche, une dilution augmente le taux de dissociation (loi de dilution d'Ostwald) tout en conservant une valeur de Ka rigoureusement identique."
  - question: "Pourquoi la deuxième acidité Ka₂ d'un polyacide est-elle toujours plus faible que Ka₁ ?"
    answer: "Retirer un deuxième proton H⁺ à une espèce déjà chargée négativement (HA⁻) demande davantage d'énergie en raison de l'attraction électrostatique. Par conséquent, Ka₂ est systématiquement inférieur à Ka₁ de plusieurs ordres de grandeur."
---

En solution aqueuse, un acide fort comme l'acide chlorhydrique cède la quasi-totalité de ses protons à l'eau. À l'inverse, un acide faible tel que l'acide acétique reste majoritairement sous forme moléculaire intacte à l'équilibre. La **constante de dissociation acide (`Ka`)** quantifie ce degré d'ionisation et permet de comparer objectivement la force des acides.

Plus la valeur de `Ka` est élevée, plus l'équilibre produit d'ions oxonium (`H₃O⁺`) et plus l'acide est fort. Pour déterminer instantanément `Ka`, `pKa` ou les concentrations à l'équilibre sans erreur algébrique, utilisez notre [Calculatrice de Ka](/fr/calculatrices/calculateur-de-ka).

## Principes thermodynamiques et formule de la constante Ka

Dans l'eau, la dissociation d'un acide faible monoprotique `HA` obéit à l'équilibre réversible :

```text
HA(aq) + H₂O(l) ⇌ H₃O⁺(aq) + A⁻(aq)
```

En solution diluée, l'activité du solvant `H₂O` vaut `1`. La loi d'action des masses donne donc l'expression suivante pour `Ka` :

```text
Ka = ([H₃O⁺] × [A⁻]) / [HA]
```

* **`[H₃O⁺]`** (ou `[H⁺]`) : concentration molaire des ions oxonium à l'équilibre (`mol/L`), liée au pH par `pH = −log₁₀([H₃O⁺])`.
* **`[A⁻]`** : concentration molaire de la base conjuguée à l'équilibre (`mol/L`).
* **`[HA]`** : concentration molaire de l'acide non dissocié restant à l'équilibre (`mol/L`).

Les valeurs de `Ka` couvrant de nombreux ordres de grandeur, l'échelle logarithmique `pKa` s'impose en pratique :

```text
pKa = −log₁₀(Ka)    et    Ka = 10^(−pKa)
```

Un acide de `pKa = 2,0` est cent fois plus dissocié qu'un acide de `pKa = 4,0` à concentration identique. Pour les polyacides comme l'acide phosphorique (`H₃PO₄`), chaque déprotonation successive possède sa propre constante (`Ka₁ >> Ka₂ >> Ka₃`).

## Méthode de calcul pas à pas : exemple avec l'acide acétique

Soit une solution d'acide acétique (`CH₃COOH`) de concentration initiale `C₀ = 0,100 mol/L` dont le pH mesuré atteint `2,88` à `25 °C`. Déterminons son `Ka`, son `pKa` et son taux de dissociation `α` :

1. **Calculer `[H₃O⁺]` :** `[H₃O⁺] = 10^(−2,88) = 1,318 × 10⁻³ mol/L`. Cette valeur dépassant largement `10⁻⁷ mol/L`, l'autoprotolyse de l'eau est négligeable.
2. **Déduire `[A⁻]` :** Chaque molécule dissociée génère un ion `H₃O⁺` et un ion acétate, donc `[CH₃COO⁻] = 1,318 × 10⁻³ mol/L`.
3. **Calculer `[HA]` à l'équilibre :** `[CH₃COOH] = 0,100 − 0,001318 = 0,09868 mol/L`.
4. **Appliquer la formule de `Ka` :**

```text
Ka = (1,318 × 10⁻³ × 1,318 × 10⁻³) / 0,09868
Ka = (1,737 × 10⁻⁶) / 0,09868 ≈ 1,76 × 10⁻⁵
```

5. **Convertir en `pKa` et `α` :** `pKa = −log₁₀(1,76 × 10⁻⁵) ≈ 4,75` et `α = (1,318 × 10⁻³ / 0,100) × 100 = 1,32 %`.

### L'approximation des 5 % et la résolution quadratique

Si vous connaissez `Ka` et `C₀` et cherchez `x = [H₃O⁺]`, l'équation exacte s'écrit `x² + Ka·x − Ka·C₀ = 0`. Lorsque `C₀ / Ka ≥ 400`, le taux `α` reste inférieur ou égal à `5 %` et l'approximation `C₀ − x ≈ C₀` donne directement `x ≈ √(Ka × C₀)`. À l'inverse, pour l'acide fluorhydrique (`Ka = 6,6 × 10⁻⁴`) à `0,050 mol/L`, le ratio `C₀ / Ka = 75,8 < 400` impose la résolution quadratique exacte.

## Tableau comparatif des constantes Ka et pKa usuelles (à 25 °C)

| Acide | Formule | Ka (à 25 °C) | pKa | Force et application |
| :--- | :--- | :--- | :--- | :--- |
| Acide chlorhydrique | `HCl` | `≈ 1,0 × 10⁶` | `−6,3` | Acide fort ; décapage et titrages |
| Acide phosphorique (`Ka₁`) | `H₃PO₄` | `7,1 × 10⁻³` | `2,15` | Acide moyen ; tampons biologiques |
| Acide fluorhydrique | `HF` | `6,6 × 10⁻⁴` | `3,18` | Acide faible ; gravure du verre |
| Acide formique | `HCOOH` | `1,8 × 10⁻⁴` | `3,75` | Acide faible ; phase mobile HPLC |
| Acide acétique | `CH₃COOH` | `1,8 × 10⁻⁵` | `4,75` | Acide faible ; tampons acétate |
| Acide carbonique (`Ka₁`) | `H₂CO₃` | `4,5 × 10⁻⁷` | `6,35` | Acide très faible ; tampon sanguin |
| Ion ammonium | `NH₄⁺` | `5,7 × 10⁻¹⁰` | `9,24` | Acide conjugué faible ; engrais |

## Applications pratiques, erreurs fréquentes et limites de validité

La valeur de `Ka` gouverne la formulation des **solutions tampons** via l'équation de Henderson-Hasselbalch (`pH = pKa + log₁₀([A⁻] / [HA])`), dont l'efficacité maximale se situe dans l'intervalle `pKa ± 1`. En pharmacologie, le `pKa` détermine la fraction non ionisée d'un principe actif : un acide faible (`pKa ≈ 3,5`) reste neutre et liposoluble dans l'estomac (`pH ≈ 1,5`), mais s'ionise dans le plasma (`pH = 7,4`).

En pratique analytique, trois erreurs faussent régulièrement les résultats :

* **Négliger l'autoprotolyse de l'eau en haute dilution :** Sous `C₀ = 10⁻⁶ mol/L`, les ions `H₃O⁺` de l'eau (`10⁻⁷ mol/L`) empêchent le pH d'un acide de dépasser `7,0` à `25 °C`.
* **Oublier l'effet thermique :** `Ka` dépend de la température via l'enthalpie de dissociation ; les valeurs tabulées à `25 °C` diffèrent à `37 °C`.
* **Confondre concentration et activité :** Au-dessus d'une force ionique de `0,1 mol/L`, les interactions électrostatiques imposent d'utiliser les activités (`a = γ × C`) via les modèles de Debye-Hückel ou de Davies.
