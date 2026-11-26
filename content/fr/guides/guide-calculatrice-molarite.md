---
title: "Calculatrice de Molarité : Mesurer la Concentration Chimique"
description: "Maîtrisez le calcul de la concentration molaire (mol/L) : formules fondamentales, facteur de dilution, préparation d'une solution de NaCl, tableau de référence et erreurs à éviter."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "molarity-calculator"
relatedType: "calculator"
faqs:
  - question: "Quelle est la différence entre la molarité (mol/L) et la concentration massique (g/L) ?"
    answer: "La molarité (notée C ou M) mesure le nombre de moles de soluté dissoutes par litre de solution (mol/L), tandis que la concentration massique (notée Cm ou t) exprime la masse de soluté en grammes par litre de solution (g/L). On passe directement de l'une à l'autre grâce à la masse molaire du composé : Cm = C × M_molaire."
  - question: "Pourquoi faut-il préparer une solution dans une fiole jaugée plutôt que d'ajouter directement un litre d'eau au solide ?"
    answer: "Le volume du soluté dissous s'ajoute partiellement à celui du solvant (avec parfois une légère contraction ou expansion volumique due aux interactions ioniques). Si vous versez 1,000 L d'eau sur 58,44 g de NaCl, le volume final de la solution dépassera 1,000 L et votre molarité réelle sera inférieure à 1,00 mol/L. La fiole jaugée garantit que le volume total final atteint exactement le trait de jauge."
  - question: "La température modifie-t-elle la molarité d'une solution préparée au laboratoire ?"
    answer: "Oui. Comme la molarité rapporte la quantité de matière au volume total de la solution, toute dilatation thermique du solvant augmente le volume V et diminue légèrement la molarité. Pour l'eau pure, le passage de 20 °C à 40 °C accroît le volume d'environ 0,6 %, ce qui abaisse la concentration molaire d'autant. Pour les travaux thermodynamiques à température variable, privilégiez la molalité (mol/kg)."
  - question: "Comment calculer la molarité d'un acide commercial à partir de son pourcentage massique et de sa densité ?"
    answer: "Utilisez la formule C = (1 000 × ρ × w) / M_molaire, où ρ est la densité (ou masse volumique en g/mL), w la fraction massique (par exemple 0,37 pour 37 %) et M_molaire la masse molaire en g/mol. Pour l'acide chlorhydrique à 37 % (ρ = 1,19 g/mL et M_molaire = 36,46 g/mol), on obtient C = (1 000 × 1,19 × 0,37) / 36,46 ≈ 12,08 mol/L."
  - question: "Quelle est la distinction entre la molarité (mol/L) et la normalité (éq/L) ?"
    answer: "La molarité compte le nombre total de moles d'une espèce chimique par litre, alors que la normalité (N) compte le nombre d'équivalents réactifs (protons H⁺ ou électrons échangés) par litre. Pour un monoacide comme HCl, 1 mol/L équivaut à 1 N ; pour un diacide fort comme H₂SO₄ en réaction complète avec une base, une solution à 1,0 mol/L correspond à 2,0 N. L'IUPAC recommande toutefois d'utiliser la molarité."
---

La **molarité** (ou concentration molaire, notée `C` ou `M`) constitue l'unité de référence en chimie analytique et en biochimie pour quantifier la matière dissoute dans un mélange liquide. Elle se définit comme le quotient du nombre de moles de soluté (`n`) par le volume total de la solution finale (`V`), et s'exprime en moles par litre (`mol/L` ou `mol·L⁻¹`).

Une solution étiquetée `2,0 mol/L` (`2,0 M`) renferme exactement `2,0 moles` d'espèce pure dans chaque litre de liquide prêt à l'emploi, et non par litre de solvant versé initialement. Pour automatiser vos pesées et dilutions en cascade, utilisez notre [calculatrice de molarité](/fr/calculatrices/calculateur-de-molarite).

## Fondements mathématiques et paramètres de la concentration molaire

La concentration molaire relie la quantité de matière, la masse pesée sur balance et le volume de verrerie jaugée :

```text
Concentration molaire       : C = n / V
Quantité de matière         : n = m / M_molaire
Molarité depuis la masse    : C = m / (M_molaire × V)
Masse à peser (préparation) : m = C × V × M_molaire
Loi de dilution             : C₁ × V₁ = C₂ × V₂
Titre commercial liquide    : C = (1 000 × ρ × w) / M_molaire
```

### Définition précise des grandeurs et unités

- **`C` (ou `M`) — Concentration molaire :** en `mol/L` (`mmol/L` ou `µmol/L` en biologie clinique).
- **`n` — Quantité de matière du soluté :** en moles (`mol`, soit `6,022 140 76 × 10²³` entités par mole).
- **`V` — Volume total de la solution :** en litres (`L`). Convertissez systématiquement les millilitres en litres (`1 mL = 0,001 L`).
- **`m` — Masse de soluté pur :** en grammes (`g`), corrigée du degré de pureté si nécessaire.
- **`M_molaire` — Masse molaire du soluté :** en `g/mol`, calculée depuis le tableau périodique.
- **`ρ` et `w` — Masse volumique et fraction massique :** `ρ` en `g/mL` et `w` sans unité (`0,37` pour `37 % m/m`).

### Préparation par pesée directe ou dilution d'une solution mère

À partir d'un solide pur, on pèse la masse `m` requise pour atteindre `C` dans le volume final `V` d'une fiole jaugée. Pour préparer une gamme étalon ou diluer un acide concentré, on prélève un volume `V₁` d'une solution mère `C₁` à la pipette jaugée, puis on complète avec du solvant jusqu'au volume `V₂`. La quantité de soluté étant conservée (`n₁ = n₂`), on applique `C₁ × V₁ = C₂ × V₂`.

## Exemple numérique complet : préparation et dilution d'une solution de NaCl

Un technicien prépare `500 mL` d'une solution mère de chlorure de sodium (`NaCl`, `M_molaire = 58,44 g/mol`) à `0,250 mol/L`, puis la dilue pour obtenir `250 mL` de solution de travail à `0,040 mol/L`.

### Étape 1 : Conversion volumique et quantité de matière

Convertissons le volume en litres : `V = 500 mL = 0,500 L`.

Calculons le nombre de moles requis : `n = C × V = 0,250 × 0,500 = 0,125 mol`.

### Étape 2 : Calcul de la masse de NaCl à peser

Multiplions `n` par la masse molaire : `m = 0,125 × 58,44 = 7,305 g`.

L'opérateur pèse **`7,31 g`** de `NaCl` sec, les dissout dans `350 mL` d'eau distillée dans une fiole jaugée de `500 mL`, puis ajuste au trait de jauge à `20 °C`.

### Étape 3 : Dilution de la solution mère vers la solution de travail

Pour préparer `V₂ = 250 mL` à `C₂ = 0,040 mol/L` depuis `C₁ = 0,250 mol/L` :

`V₁ = (C₂ × V₂) / C₁ = (0,040 × 250) / 0,250 = 10,0 / 0,250 = 40,0 mL`

Il faut pipeter exactement **`40,0 mL`** de solution mère dans une fiole jaugée de `250 mL` et compléter à l'eau purifiée (facteur de dilution `F = 6,25`).

## Tableau de référence des solutions et concentrations usuelles

Ce tableau présente six solutions courantes en laboratoire, en industrie et en biologie médicale à `20 °C`.

| Solution de référence | Soluté | Masse molaire (`g/mol`) | Titre massique | Molarité (`mol/L`) | Usage courant et remarque métrologique |
|---|---|---|---|---|---|
| Sérum physiologique (`0,9 %`) | `NaCl` | `58,44` | `9,0 g/L` | `0,154 mol/L` | Isotonique au plasma sanguin (`308 mOsm/L`) |
| Glucose à jeun (clinique) | `C₆H₁₂O₆` | `180,16` | `0,90 g/L` | `0,0050 mol/L` | Soit `5,0 mmol/L` en biochimie médicale |
| Soude standard (`1 M`) | `NaOH` | `40,00` | `40,0 g/L` | `1,00 mol/L` | Titrage acido-basique ; absorbe le `CO₂` |
| Acide chlorhydrique (`37 %`) | `HCl` | `36,46` | `37 %` (`ρ = 1,19`) | `12,08 mol/L` | Solution fumante à manipuler sous hotte |
| Acide sulfurique (`98 %`) | `H₂SO₄` | `98,07` | `98 %` (`ρ = 1,84`) | `18,39 mol/L` | Dilution fortement exothermique |
| Acide acétique (`99,8 %`) | `CH₃COOH` | `60,05` | `99,8 %` (`ρ = 1,05`) | `17,45 mol/L` | Tampons acétate ; gèle sous `16,6 °C` |

## Applications pratiques, limites métrologiques et erreurs fréquentes

### Domaines d'utilisation en chimie, biologie et contrôle qualité

La molarité régit la plupart des protocoles quantitatifs à température contrôlée. En **spectrophotométrie UV-visible**, la loi de Beer-Lambert (`A = ε × l × C`) relie l'absorbance à la molarité. En **dosage volumétrique**, l'équivalence repose sur `C_A × V_A / ν_A = C_B × V_B / ν_B`. En **biologie moléculaire et pharmacie**, les tampons (`PBS`, `Tris`) exigent une précision millimolaire pour préserver l'osmolarité et l'activité enzymatique.

### Erreurs fréquentes et précautions de sécurité

1. **Confondre volume du solvant et volume de solution :** verser `1,00 L` d'eau sur un solide donne un volume final supérieur à `1,00 L` et fausse `C`.
2. **Oublier l'eau de cristallisation :** le sulfate de cuivre pentahydraté (`CuSO₄·5H₂O`, `249,68 g/mol`) diffère nettement du sel anhydre (`159,60 g/mol`).
3. **Négliger l'étalonnage thermique à `20 °C` :** ajuster au trait une solution encore chaude entraîne une contraction volumique au refroidissement.
4. **Inverser la dilution d'un acide fort :** versez toujours lentement l'acide concentré dans l'eau froide sous agitation, jamais l'eau dans l'acide.
