---
title: "Calculatrice de pKa : Mesurer la Force d'un Acide"
description: "Comprenez les constantes de dissociation acide (Ka), comment calculer le pKa, et utilisez notre Calculatrice de pKa."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "pka-calculator"
faqs:
  - question: "Quelle est la différence fondamentale entre le pH et le pKa ?"
    answer: "Le pKa est une constante thermodynamique intrinsèque à une molécule (à température et solvant donnés) qui mesure sa propension à céder un proton. Le pH, en revanche, caractérise l'acidité globale d'une solution et dépend directement de la concentration de l'acide dissous et de la présence éventuelle d'autres espèces."
  - question: "Pourquoi un pKa négatif caractérise-t-il un acide fort dans l'eau ?"
    answer: "Comme pKa = −log₁₀(Ka), une valeur négative correspond à Ka > 1, ce qui signifie que l'équilibre est quasi totalement déplacé vers la forme dissociée. Dans l'eau, tout acide dont le pKa est inférieur à 0 (tel que HCl à −6,3) transfère pratiquement 100 % de ses protons aux molécules de solvant pour former l'ion hydronium H₃O⁺."
  - question: "Comment passer du pKa d'un acide au pKb de sa base conjuguée ?"
    answer: "En solution aqueuse à 25 °C, les constantes d'un couple acide-base conjugué sont liées par le produit ionique de l'eau (Ke = 1,0 × 10⁻¹⁴, soit pKe = 14,00). Il suffit d'appliquer la relation pKa + pKb = 14,00 : plus un acide est faible (pKa élevé), plus sa base conjuguée est forte (pKb faible)."
  - question: "La température et la force ionique modifient-elles la valeur du pKa ?"
    answer: "Oui. L'équilibre de dissociation possède une enthalpie de réaction non nulle : selon l'équation de van 't Hoff, le pKa du tampon Tris varie par exemple d'environ −0,03 unité par °C. De même, une force ionique élevée modifie les coefficients d'activité des ions, ce qui décale le pKa apparent par rapport au pKa thermodynamique à dilution infinie."
  - question: "Comment la notion de pKa s'applique-t-elle aux polyacides comme l'acide phosphorique ?"
    answer: "Un polyacide libère ses protons de façon séquentielle, chaque étape possédant sa propre constante de dissociation. L'acide phosphorique (H₃PO₄) présente ainsi trois valeurs croissantes : pKa1 = 2,15, pKa2 = 7,20 et pKa3 = 12,35. Chaque proton supplémentaire est plus difficile à arracher en raison de la charge négative croissante de l'anion résiduel."
---

La force d'un acide ne se mesure pas à sa corrosivité apparente ni à sa concentration, mais à sa capacité thermodynamique à céder un proton (H⁺) au solvant. En solution aqueuse, cet équilibre est quantifié par la **constante de dissociation acide (`Ka`)** et par son cologarithme décimal, le **`pKa`**, indicateur de référence en chimie analytique, biochimie et pharmacologie.

Grâce à notre [Calculatrice de pKa](/fr/calculatrices/calculateur-de-pka), vous convertissez instantanément toute valeur de `Ka` exprimée en notation scientifique en `pKa` (et inversement), tout en obtenant la constante conjuguée `pKb`. Maîtriser cette échelle logarithmique inversée permet d'anticiper l'ionisation d'une molécule à tout pH et de choisir le réactif adapté à chaque protocole.

## Principes thermodynamiques : constante Ka, pKa et couple acide-base

Selon Brønsted-Lowry, un acide `HA` dissous dans l'eau établit un équilibre de transfert de proton vers le solvant pour former l'ion hydronium `H₃O⁺` et sa base conjuguée `A⁻` :

```text
HA(aq) + H₂O(l) ⇌ H₃O⁺(aq) + A⁻(aq)
```

À 25 °C, la loi d'action de masse définit la constante d'acidité `Ka` (sans dimension par rapport à l'état standard de 1 mol/L) :

```text
Ka = ([H₃O⁺] × [A⁻]) / [HA]
```

Les valeurs de `Ka` couvrant des dizaines d'ordres de grandeur (de `10⁹` à `10⁻¹⁶`), on adopte une échelle logarithmique :

```text
pKa = −log₁₀(Ka)      et      Ka = 10^(−pKa)
```

À 25 °C, le produit ionique de l'eau (`Ke = [H₃O⁺] × [OH⁻] = 1,0 × 10⁻¹⁴`) relie le couple à la constante `Kb` de `A⁻` :

```text
Ka × Kb = Ke = 1,0 × 10⁻¹⁴      donc      pKa + pKb = 14,00
```

### Paramètres clés et effet nivelant de l'eau

- **`[HA]` et `[A⁻]` (mol/L)** : concentrations molaires à l'équilibre des formes protonée (acide) et déprotonée (base conjuguée).
- **`[H₃O⁺]` (mol/L)** : concentration d'ions hydronium à l'équilibre (`pH = −log₁₀([H₃O⁺])`).
- **Échelle inversée** : un **`pKa` faible** ou négatif révèle un `Ka` élevé, donc un **acide fort** ; un **`pKa` élevé** caractérise un **acide faible** peu dissocié.

Un acide fort (`pKa < 0`, tel `HCl` ou `HNO₃`) transfère quasi intégralement ses protons à l'eau : l'acide le plus fort subsistant est `H₃O⁺`. Cet **effet nivelant** impose d'utiliser des solvants aprotiques (DMSO, acétonitrile) pour hiérarchiser deux acides forts. Les acides faibles (`0 < pKa < 14`) restent en équilibre partiel.

## Exemple de calcul pas à pas : du Ka au pKa et au taux de dissociation

Prenons une solution aqueuse d'acide acétique (`CH₃COOH`) de concentration initiale `C₀ = 0,100 mol/L` à 25 °C, avec `Ka = 1,75 × 10⁻⁵`.

**Étape 1 : Calculer le pKa et le pKb conjugué**

```text
pKa = −log₁₀(1,75 × 10⁻⁵) = 5 − 0,2430 = 4,76
pKb(CH₃COO⁻) = 14,00 − 4,76 = 9,24      soit      Kb = 5,75 × 10⁻¹⁰
```

**Étape 2 : Calculer `[H₃O⁺]` à l'équilibre et le taux de dissociation `α`**

En notant `x = [H₃O⁺] = [A⁻]` la fraction dissociée, il reste `[HA] = 0,100 − x`, d'où :

```text
x² / (0,100 − x) = 1,75 × 10⁻⁵
```

La résolution de `x² + 1,75 × 10⁻⁵ x − 1,75 × 10⁻⁶ = 0` donne :

```text
x = [H₃O⁺] = 1,314 × 10⁻³ mol/L
```

Vérification : `(1,314 × 10⁻³)² / (0,100 − 1,314 × 10⁻³) = 1,75 × 10⁻⁵`. Le taux de dissociation vaut `α = 1,314 × 10⁻³ / 0,100 = 1,31 %` pour un `pH = −log₁₀(1,314 × 10⁻³) = 2,88`.

## Tableau comparatif des constantes Ka et pKa de référence (à 25 °C)

| Espèce acide (formule) | Constante Ka (25 °C) | pKa | Catégorie d'acidité | Usage principal |
| :--- | :--- | :--- | :--- | :--- |
| Acide chlorhydrique (`HCl`) | `~2 × 10⁶` | `−6,3` | Acide fort | Synthèse minérale, ajustement de pH |
| Acide phosphorique (`H₃PO₄`, `pKa1`) | `7,1 × 10⁻³` | `2,15` | Acide faible modéré | Acidifiant, tampons HPLC |
| Acide formique (`HCOOH`) | `1,8 × 10⁻⁴` | `3,75` | Acide carboxylique faible | Phase mobile en spectrométrie LC-MS |
| Acide acétique (`CH₃COOH`) | `1,75 × 10⁻⁵` | `4,76` | Acide faible classique | Vinaigre, tampons acétate (`pH 3,8–5,8`) |
| Dihydrogénophosphate (`H₂PO₄⁻`, `pKa2`) | `6,3 × 10⁻⁸` | `7,20` | Polyacide amphotère | Tampon PBS physiologique (`pH 7,4`) |
| Ion ammonium (`NH₄⁺`) | `5,6 × 10⁻¹⁰` | `9,25` | Acide conjugué faible | Tampons ammoniacaux, analyse azotée |
| Ion hydrogénocarbonate (`HCO₃⁻`, `pKa2`) | `4,7 × 10⁻¹¹` | `10,33` | Acide très faible | Équilibre calco-carbonique, eaux |

## Applications pratiques, pièges analytiques et limites du modèle

En **pharmacocinétique**, le `pKa` gouverne l'absorption membranaire : les bicouches lipidiques privilégient le passage des formes neutres. Un principe actif acide faible comme l'aspirine (`pKa = 3,5`) reste majoritairement non ionisé dans l'estomac (`pH ≈ 1,5–2,0`), favorisant son passage gastrique, alors qu'une base faible (`pKa ≈ 8,5`) est absorbée dans l'intestin grêle (`pH ≈ 6,5–7,5`). En **chromatographie HPLC**, fixer le pH de la phase mobile à au moins `2 unités` du `pKa` garantit une espèce unique et des pics symétriques.

Trois erreurs analytiques courantes doivent être évitées :

1. **Confondre `pKa` et `pH`** : diluer dix fois un acide faible élève son pH et son taux de dissociation (loi d'Ostwald), mais son `pKa` demeure strictement inchangé à température constante.
2. **Négliger la force ionique** : au-dessus de `0,05 mol/L` de sels, les interactions électrostatiques abaissent l'activité des ions et décalent le `pKa` apparent (`pKa'`) de `0,1` à `0,3` unité.
3. **Oublier l'effet thermique** : les tables sont établies à `25,0 °C`. Transposer ces valeurs à `37 °C` ou `4 °C` sans correction de van 't Hoff fausse les calculs, notamment sur les tampons aminés.
