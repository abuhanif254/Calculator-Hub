---
title: "Calculatrice de Ksp : Constante du Produit de Solubilité"
description: "Calculez le produit de solubilité Ksp et la solubilité molaire s des sels peu solubles, anticipez la précipitation avec Qsp et maîtrisez l'effet d'ion commun."
category: "Math & Science"
relatedCalculator: "ksp-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Quelle est la différence entre le Ksp et la solubilité molaire s ?"
    answer: "Le Ksp (ou Ks) est une constante d'équilibre sans unité qui ne dépend que de la température. La solubilité molaire s représente la concentration maximale de sel (en mol/L) pouvant se dissoudre avant saturation ; elle diminue en présence d'un ion commun ou d'un changement de pH."
  - question: "Peut-on comparer directement les Ksp de deux sels pour savoir lequel est le plus soluble ?"
    answer: "Seulement s'ils possèdent exactement la même stœchiométrie (par exemple deux sels de type 1:1 comme AgCl et BaSO₄). Pour des stœchiométries différentes, comme AgCl (1:1) et Ag₂CrO₄ (2:1), il faut impérativement calculer la solubilité molaire s."
  - question: "Comment savoir si un précipité va se former lors d'un mélange de solutions ?"
    answer: "Calculez le produit ionique instantané Qsp avec les concentrations initiales après mélange et comparez-le au Ksp. Si Qsp > Ksp, la solution est sursaturée et un précipité apparaît ; si Qsp ≤ Ksp, tous les ions restent dissous."
  - question: "Pourquoi la présence d'un ion commun réduit-elle fortement la solubilité d'un sel ?"
    answer: "Selon le principe de Le Chatelier, ajouter un ion déjà présent dans l'équilibre de dissolution augmente sa concentration dans la formule du Ksp. Pour maintenir le produit égal à Ksp, l'équilibre recule vers la forme solide, réduisant drastiquement la dissolution du sel."
  - question: "Le pH influence-t-il la solubilité d'un sel peu soluble ?"
    answer: "Oui, dès que l'anion du sel est une base faible (comme OH⁻, CO₃²⁻, F⁻, S²⁻ ou PO₄³⁻). En milieu acide, les protons H₃O⁺ consomment cet anion, abaissent le quotient Qsp et déplacent l'équilibre vers une dissolution accrue du solide."
---

Alors que le chlorure de sodium se dissout massivement dans l'eau, un sel comme le chlorure d'argent (`AgCl`) ou le sulfate de baryum (`BaSO₄`) reste presque entièrement solide au fond du récipient : seule une fraction infime s'ionise jusqu'à saturation. La **constante du produit de solubilité (`Ksp`, parfois notée `Ks`)** caractérise cet équilibre hétérogène entre le cristal et ses ions dissous.

Plus `Ksp` est faible, moins le composé est soluble dans l'eau pure à une température donnée. Pour calculer le `Ksp` à partir de la solubilité molaire `s` ou résoudre des stœchiométries complexes (`4s³`, `27s⁴`, `108s⁵`), utilisez notre [Calculatrice de Ksp](/fr/calculatrices/calculateur-de-ksp).

## Équation de dissolution, formule du Ksp et stœchiométrie ionique

Pour un solide ionique peu soluble `AₐB_b`, l'équilibre de saturation s'écrit :

```text
AₐB_b(s) ⇌ a A^(b+)(aq) + b B^(a−)(aq)
```

Le solide pur ayant une activité égale à `1`, `Ksp` ne retient que les concentrations molaires des ions dissous à l'équilibre :

```text
Ksp = [A^(b+)]^a × [B^(a−)]^b
```

En notant `s` la **solubilité molaire** dans l'eau pure (`mol/L`), l'expression de `Ksp` dépend de la stœchiométrie du sel :

* **Type `1:1` (`AB`, ex. `AgCl`) :** `Ksp = s²` → `s = √Ksp`
* **Type `1:2` ou `2:1` (`AB₂` / `A₂B`, ex. `CaF₂`, `Ag₂CrO₄`) :** `Ksp = s × (2s)² = 4s³` → `s = (Ksp / 4)^(1/3)`
* **Type `1:3` (`AB₃`, ex. `Fe(OH)₃`) :** `Ksp = s × (3s)³ = 27s⁴` → `s = (Ksp / 27)^(1/4)`
* **Type `2:3` (`A₂B₃`, ex. `Ca₃(PO₄)₂`) :** `Ksp = (2s)² × (3s)³ = 108s⁵` → `s = (Ksp / 108)^(1/5)`

### Anticiper la précipitation avec le produit ionique Qsp

Lors d'un mélange, comparez le **produit ionique instantané (`Qsp`)** à `Ksp` : si `Qsp < Ksp`, la solution est insaturée ; si `Qsp = Ksp`, elle est saturée ; si `Qsp > Ksp`, un précipité se forme jusqu'au retour à l'équilibre.

## Exemple pratique pas à pas : fluorure de calcium et effet d'ion commun

Considérons le fluorure de calcium (`CaF₂`, `M = 78,07 g/mol`) avec `Ksp = 3,9 × 10⁻¹¹` à `25 °C`.

### Partie A : Solubilité dans l'eau pure

1. **Équilibre :** `CaF₂(s) ⇌ Ca²⁺(aq) + 2 F⁻(aq)`, soit `[Ca²⁺] = s` et `[F⁻] = 2s`.
2. **Résolution pour `s` :**

```text
Ksp = s × (2s)² = 4s³ = 3,9 × 10⁻¹¹
s³ = (3,9 × 10⁻¹¹) / 4 = 9,75 × 10⁻¹²
s = (9,75 × 10⁻¹²)^(1/3) ≈ 2,14 × 10⁻⁴ mol/L
```

3. **Solubilité massique :** `2,14 × 10⁻⁴ mol/L × 78,07 g/mol = 0,0167 g/L` (`16,7 mg/L`).

### Partie B : Effet d'ion commun dans NaF à 0,10 mol/L

Dans du fluorure de sodium (`NaF`) à `0,10 mol/L`, `[F⁻] = 0,10 + 2s' ≈ 0,10 mol/L` car `s' << 0,10` :

```text
Ksp = s' × (0,10)² = 3,9 × 10⁻¹¹
s' = (3,9 × 10⁻¹¹) / 0,010 = 3,9 × 10⁻⁹ mol/L
```

L'hypothèse `2s' << 0,10` est vérifiée. L'ion commun `F⁻` réduit la solubilité du `CaF₂` d'un facteur proche de **55 000**.

## Tableau de référence des produits de solubilité Ksp (à 25 °C)

| Composé ionique | Formule | Type | Ksp (à 25 °C) | Formule de `s` | Solubilité `s` (`mol/L`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Chlorure d'argent | `AgCl` | `1:1` | `1,77 × 10⁻¹⁰` | `√Ksp` | `1,33 × 10⁻⁵` |
| Sulfate de baryum | `BaSO₄` | `1:1` | `1,1 × 10⁻¹⁰` | `√Ksp` | `1,05 × 10⁻⁵` |
| Carbonate de calcium | `CaCO₃` | `1:1` | `3,36 × 10⁻⁹` | `√Ksp` | `5,80 × 10⁻⁵` |
| Chromate d'argent | `Ag₂CrO₄` | `2:1` | `1,12 × 10⁻¹²` | `(Ksp / 4)^(1/3)` | `6,54 × 10⁻⁵` |
| Fluorure de calcium | `CaF₂` | `1:2` | `3,9 × 10⁻¹¹` | `(Ksp / 4)^(1/3)` | `2,14 × 10⁻⁴` |
| Hydroxyde de magnésium | `Mg(OH)₂` | `1:2` | `5,61 × 10⁻¹²` | `(Ksp / 4)^(1/3)` | `1,12 × 10⁻⁴` |
| Hydroxyde de fer(III) | `Fe(OH)₃` | `1:3` | `2,79 × 10⁻³⁹` | `(Ksp / 27)^(1/4)` | `1,01 × 10⁻¹⁰` |

## Applications pratiques, biais d'interprétation et limites du modèle

La maîtrise du `Ksp` intervient dans des secteurs critiques :

* **Traitement des eaux et industrie :** Prévention de l'entartrage (`CaCO₃`, `Mg(OH)₂`) dans les canalisations et précipitation sélective des métaux lourds.
* **Imagerie médicale :** Malgré la toxicité de `Ba²⁺`, le sulfate de baryum (`BaSO₄`, `s = 1,05 × 10⁻⁵ mol/L`) sert de contraste radiologique sûr grâce à son `Ksp` très bas.
* **Santé dentaire et rénale :** Conversion de l'émail en fluorapatite moins soluble et prévention des calculs d'oxalate de calcium (`Qsp < Ksp`).

Évitez enfin trois pièges méthodologiques courants :

* **Comparer deux `Ksp` de stœchiométries différentes :** Bien que le `Ksp` de `Ag₂CrO₄` (`1,12 × 10⁻¹²`) soit inférieur à celui de `AgCl` (`1,77 × 10⁻¹⁰`), `Ag₂CrO₄` reste presque cinq fois **plus soluble** dans l'eau pure (`6,54 × 10⁻⁵` contre `1,33 × 10⁻⁵ mol/L`).
* **Omettre la dilution après mélange :** Divisez toujours les moles par le volume total `V₁ + V₂` pour calculer `Qsp`.
* **Ignorer l'effet de sel et la complexation :** Les électrolytes inertes augmentent la solubilité en abaissant les coefficients d'activité `γ`, tandis que les ligands (comme `NH₃` sur `Ag⁺`) dissolvent le précipité par formation de complexes.
