---
title: "Équation de Henderson-Hasselbalch : Les Solutions Tampons"
description: "Découvrez comment fonctionne l'équation de Henderson-Hasselbalch, le rôle des solutions tampons sur le pH, et utilisez notre calculatrice."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "henderson-hasselbalch-equation-calculator"
faqs:
  - question: "Que signifie exactement le fait que pH = pKa dans l'équation de Henderson-Hasselbalch ?"
    answer: "Lorsque la concentration molaire de la base conjuguée [A⁻] égale exactement celle de l'acide faible [HA], le ratio [A⁻]/[HA] vaut 1 et log₁₀(1) = 0. L'équation se réduit alors à pH = pKa. Physiquement, cela correspond à une ionisation de 50 % (point de demi-équivalence d'un titrage), situation où la solution possède son pouvoir tampon maximal."
  - question: "Pourquoi l'efficacité d'un tampon est-elle limitée à la plage pKa ± 1 ?"
    answer: "Lorsque le pH s'écarte d'une unité de part et d'autre du pKa, le ratio [A⁻]/[HA] atteint 10:1 ou 1:10. Au-delà de ce seuil, l'une des deux espèces représente moins de 9,1 % du total : elle risque d'être rapidement épuisée lors d'un ajout d'acide ou de base forte, faisant chuter brutalement la capacité tampon."
  - question: "Comment appliquer l'équation à un couple base faible / acide conjugué comme NH₃ / NH₄⁺ ?"
    answer: "Deux écritures strictement équivalentes existent. La plus directe utilise le pKa de l'acide conjugué (9,25 pour NH₄⁺) : pH = pKa + log₁₀([NH₃] / [NH₄⁺]). Vous pouvez aussi calculer pOH = pKb + log₁₀([NH₄⁺] / [NH₃]) avec pKb(NH₃) = 4,75, puis déduire pH = 14,00 − pOH à 25 °C."
  - question: "La dilution à l'eau pure modifie-t-elle le pH calculé par Henderson-Hasselbalch ?"
    answer: "En première approximation, non : comme [A⁻] et [HA] occupent le même volume, une dilution modérée divise les deux concentrations par le même facteur et laisse le ratio [A⁻]/[HA] inchangé. Toutefois, une dilution extrême (concentration totale inférieure à 10⁻⁴ mol/L) finit par décaler le pH vers 7,00 sous l'effet de l'auto-ionisation de l'eau, et réduit proportionnellement la capacité tampon."
  - question: "Quelles sont les hypothèses mathématiques qui limitent la validité de cette formule ?"
    answer: "L'équation suppose que la dissociation propre de HA et l'hydrolyse de A⁻ sont négligeables devant leurs concentrations initiales, et que les ions H₃O⁺ et OH⁻ issus de l'eau restent négligeables. Elle devient inexacte pour les acides modérément forts (pKa < 2), les solutions très diluées (< 10⁻⁴ mol/L) ou les pH extrêmes (< 2 ou > 12)."
---

Verser quelques gouttes d'acide chlorhydrique dans un litre d'eau pure fait chuter le pH de `7,0` à moins de `2,0`. Pourtant, le plasma sanguin humain reste stable entre `7,35` et `7,45` malgré les acides organiques produits en continu par le métabolisme, grâce au système tampon bicarbonate/acide carbonique régi par **l'équation de Henderson-Hasselbalch**.

Cette relation fondamentale relie directement le pH d'une solution tampon au `pKa` du couple acide-base et au logarithme décimal du rapport des concentrations entre la base conjuguée et l'acide faible. Avec notre [Calculatrice de Henderson-Hasselbalch](/fr/calculatrices/calculateur-d-equation-de-henderson-hasselbalch), vous déterminez instantanément le pH d'un mélange ou le rapport de concentrations requis pour viser un pH biologique ou analytique précis.

## Dérivation mathématique et paramètres de l'équation

L'équation de Henderson-Hasselbalch découle directement de la loi d'action de masse appliquée à la constante d'acidité `Ka` d'un couple acide faible / base conjuguée (`HA / A⁻`) à l'équilibre :

```text
Ka = ([H₃O⁺] × [A⁻]) / [HA]
```

En isolant `[H₃O⁺]`, puis en appliquant l'opérateur `−log₁₀` aux deux membres de l'égalité, on aboutit à l'équation de Henderson-Hasselbalch :

```text
−log₁₀([H₃O⁺]) = −log₁₀(Ka) + log₁₀([A⁻] / [HA])
pH = pKa + log₁₀([A⁻] / [HA])
```

Pour un couple formé d'une base faible neutre `B` et de son acide conjugué cationique `BH⁺` (tel `NH₃ / NH₄⁺`), on emploie le `pKa` de `BH⁺` ou, de manière équivalente, le `pKb` de `B` :

```text
pH = pKa + log₁₀([B] / [BH⁺])      ou      pOH = pKb + log₁₀([BH⁺] / [B])
```

### Définition des variables et propriétés logarithmiques

- **`pH`** : potentiel hydrogène mesuré de la solution tampon à la température de travail.
- **`pKa`** : cologarithme de la constante de dissociation acide (`−log₁₀(Ka)`).
- **`[A⁻]` et `[HA]` (mol/L)** : concentrations molaires à l'équilibre de la base conjuguée (acceptrice de protons) et de l'acide faible (donneur de protons).
- **Équivalence en quantité de matière** : les deux espèces partageant le même volume total `V`, le rapport des concentrations `[A⁻] / [HA]` équivaut exactement au rapport des nombres de moles `n(A⁻) / n(HA)`.
- **Point de demi-équivalence** : lorsque `[A⁻] = [HA]`, le logarithme s'annule (`log₁₀(1) = 0`) et `pH = pKa`.

## Exemple chiffré pas à pas : tampon phosphate et ajout d'acide fort

Calculons le pH d'un tampon phosphate (`H₂PO₄⁻ / HPO₄²⁻`, `pKa2 = 7,20` à 25 °C) préparé dans `1,00 L` d'eau déionisée en dissolvant `0,120 mol` de dihydrogénophosphate de sodium (`NaH₂PO₄`, forme `HA`) et `0,180 mol` d'hydrogénophosphate disodique (`Na₂HPO₄`, forme `A⁻`).

**Étape 1 : Calculer le pH initial du tampon**

Le ratio base sur acide vaut `0,180 / 0,120 = 1,50`. L'équation donne :

```text
pH = 7,20 + log₁₀(0,180 / 0,120) = 7,20 + log₁₀(1,50) = 7,20 + 0,176 = 7,38
```

**Étape 2 : Simuler l'ajout de `0,020 mol` d'acide chlorhydrique (`HCl`)**

En négligeant la variation de volume, les `0,020 mol` d'ions `H₃O⁺` apportés par l'acide fort réagissent quantitativement avec la base conjuguée `HPO₄²⁻` pour régénérer l'acide faible `H₂PO₄⁻` :

```text
n(A⁻) après ajout = 0,180 − 0,020 = 0,160 mol
n(HA) après ajout = 0,120 + 0,020 = 0,140 mol
```

**Étape 3 : Recalculer le nouveau pH**

```text
pH = 7,20 + log₁₀(0,160 / 0,140) = 7,20 + log₁₀(1,1429) = 7,20 + 0,058 = 7,26
```

Le pH ne diminue que de **`0,12` unité** (`7,38 → 7,26`). En comparaison, l'ajout des mêmes `0,020 mol` de `HCl` dans `1,00 L` d'eau pure ferait plonger le pH de `7,00` à `−log₁₀(0,020) = 1,70`, soit une chute de `5,30` unités.

## Tableau de correspondance : ratio [A⁻]/[HA], ionisation et décalage de pH

| Écart `pH − pKa` | Ratio `[A⁻] / [HA]` | Fraction `[HA]` | Fraction `[A⁻]` | Interprétation physico-chimique |
| :--- | :--- | :--- | :--- | :--- |
| `−2,00` | `0,01` (1 : 100) | `99,0 %` | `1,0 %` | Hors plage tampon ; forme acide très majoritaire |
| `−1,00` | `0,10` (1 : 10) | `90,9 %` | `9,1 %` | Borne inférieure de la zone tampon efficace (`pKa − 1`) |
| `−0,50` | `0,316` | `76,0 %` | `24,0 %` | Tampon actif ; bonne réserve contre les ajouts de base |
| `0,00` | `1,00` (1 : 1) | `50,0 %` | `50,0 %` | Pouvoir tampon maximal (`pH = pKa`, demi-équivalence) |
| `+0,50` | `3,16` | `24,0 %` | `76,0 %` | Tampon actif ; bonne réserve contre les ajouts d'acide |
| `+1,00` | `10,0` (10 : 1) | `9,1 %` | `90,9 %` | Borne supérieure de la zone tampon efficace (`pKa + 1`) |
| `+2,00` | `100` (100 : 1) | `1,0 %` | `99,0 %` | Hors plage tampon ; base conjuguée quasi exclusive |

## Applications cliniques, hypothèses de validité et limites

En **médecine clinique et gazométrie artérielle**, l'équation de Henderson-Hasselbalch modélise l'équilibre acido-basique du sang artériel via le couple bicarbonate / dioxyde de carbone dissous (`pKa' = 6,10` à `37 °C`) :

```text
pH = 6,10 + log₁₀([HCO₃⁻] / (0,030 × PaCO₂))
```

Avec une bicarbonatémie physiologique `[HCO₃⁻] = 24 mmol/L` et une pression partielle artérielle `PaCO₂ = 40 mmHg` (`1,20 mmol/L` de `CO₂` dissous), le calcul donne `6,10 + log₁₀(20) = 7,40`. Les cliniciens distinguent ainsi immédiatement les déséquilibres **métaboliques** (variation de `[HCO₃⁻]`) des troubles **respiratoires** (variation de `PaCO₂`). En **pharmacocinétique**, la formule prévoit aussi le piégeage ionique des principes actifs entre l'estomac, le plasma et les urines.

Trois limites encadrent néanmoins son emploi analytique :

1. **Solutions très diluées (`< 10⁻⁴ mol/L`)** : l'auto-ionisation de l'eau (`H₃O⁺` et `OH⁻` à `10⁻⁷ mol/L`) n'est plus négligeable et impose une résolution complète par bilan de charges et de matière.
2. **Acides forts ou intermédiaires (`pKa < 2`)** : la dissociation spontanée initiale consomme une fraction notable de `[HA]`, écartant les concentrations d'équilibre des valeurs nominales introduites.
3. **Force ionique élevée** : à forte salinité (comme en sérum physiologique à `0,15 mol/L` de `NaCl`), il convient d'utiliser le `pKa'` apparent corrigé des coefficients d'activité plutôt que le `pKa` thermodynamique.
