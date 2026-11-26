---
title: "Dilution de Molarité : La Formule C1V1 = C2V2"
description: "Apprenez à préparer des solutions à partir d'une solution mère concentrée. Comprenez la formule de dilution et utilisez notre calculatrice."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "molarity-dilution-calculator"
relatedType: "calculator"
faqs:
  - question: "Pourquoi la formule C₁V₁ = C₂V₂ reste-t-elle valable quelles que soient les unités de volume ?"
    answer: "L'équation C₁ × V₁ = C₂ × V₂ exprime la conservation de la quantité de matière : n₁ = n₂. Tant que V₁ et V₂ partagent exactement la même unité (par exemple tous deux en millilitres ou tous deux en litres) et que C₁ et C₂ utilisent la même unité de concentration, les facteurs de conversion s'annulent."
  - question: "Faut-il ajouter exactement (V₂ − V₁) millilitres d'eau ou compléter au trait de jauge ?"
    answer: "En chimie analytique, complétez toujours au trait de jauge d'une fiole jaugée jusqu'au volume final V₂ plutôt que d'additionner deux volumes séparés. Lors du mélange d'acides concentrés ou d'alcools avec l'eau, des interactions moléculaires provoquent une contraction ou une dilatation volumique mesurable."
  - question: "Peut-on utiliser C₁V₁ = C₂V₂ pour calculer le point d'équivalence d'un titrage acido-basique ?"
    answer: "Uniquement lorsque la stœchiométrie vaut 1:1 (comme HCl + NaOH). Si les coefficients diffèrent, par exemple H₂SO₄ + 2 NaOH, la formule simple échoue : appliquez la relation (C₁ × V₁) / ν₁ = (C₂ × V₂) / ν₂, soit deux fois moins de moles d'acide sulfurique que de soude."
  - question: "Comment calculer la molarité initiale C₁ d'un flacon d'acide commercial étiqueté en pourcentage massique ?"
    answer: "Appliquez C₁ = (ρ × P × 10) / M, où ρ est la masse volumique en g/mL, P le titre massique en pourcentage et M la masse molaire en g/mol. Ainsi, un acide chlorhydrique à 37 % de densité 1,19 g/mL et de masse molaire 36,46 g/mol titre (1,19 × 37 × 10) / 36,46 ≈ 12,08 mol/L."
  - question: "Pourquoi doit-on toujours verser l'acide concentré dans l'eau et jamais l'inverse ?"
    answer: "La dissolution d'un acide fort comme l'acide sulfurique (H₂SO₄ à 96 %) est fortement exothermique. Verser un peu d'eau sur un grand volume d'acide dense provoque une ébullition locale instantanée en surface et des projections corrosives. Verser lentement l'acide dans un large volume d'eau dissipe la chaleur sans risque."
---

La **dilution d'une solution molaire** consiste à diminuer la concentration d'un soluté par ajout de solvant pur, sans modifier le nombre de moles dissoutes. Elle repose sur l'équation fondamentale `C₁ × V₁ = C₂ × V₂` (souvent notée `M₁ × V₁ = M₂ × V₂`), qui relie la molarité et le volume prélevé de solution mère aux grandeurs finales de la solution fille.

Dans les laboratoires de chimie, de biologie et de contrôle industriel, les fournisseurs livrent des solutions mères concentrées pour réduire les volumes stockés et préserver la stabilité chimique des réactifs. Maîtriser ce calcul garantit l'exactitude des tampons, la reproductibilité des dosages et la sécurité face aux acides corrosifs. Utilisez notre [Calculatrice de Dilution de Molarité](/fr/calculatrices/calculateur-de-dilution-de-molarite) pour obtenir instantanément le volume à prélever.

## Principes physico-chimiques de l'équation C₁V₁ = C₂V₂

Lors d'une dilution, la quantité de matière `n` (en moles) de soluté prélevée dans le flacon d'origine reste intégralement conservée dans la fiole finale. Comme la molarité vaut `C = n / V`, l'égalité `n₁ = n₂` conduit directement aux formules opérationnelles :

```text
Quantité prélevée : n₁ = C₁ × V₁
Quantité finale : n₂ = C₂ × V₂
Conservation : C₁ × V₁ = C₂ × V₂
Volume à prélever : V₁ = (C₂ × V₂) / C₁
Facteur dilution : F = C₁ / C₂ = V₂ / V₁
```

Chaque paramètre possède une signification stricte :

- **`C₁` (concentration initiale)** : molarité de la solution mère en `mol/L`, toujours supérieure à `C₂` lors d'une dilution.
- **`V₁` (volume à prélever)** : volume exact de solution mère mesuré à la pipette jaugée ou graduée.
- **`C₂` (concentration cible)** : molarité recherchée pour l'expérience ou le réactif de travail.
- **`V₂` (volume final total)** : capacité nominale de la fiole jaugée utilisée (`100 mL`, `250 mL`, `500 mL`, `1 000 mL`).
- **`F` (facteur de dilution)** : rapport sans dimension supérieur à `1` indiquant le coefficient d'atténuation.

### Calculer C₁ depuis un flacon commercial (% massique et densité)

Les flacons d'acides commerciaux affichent un pourcentage massique `P` et une masse volumique `ρ` (en `g/mL`). Un litre (`1 000 mL`) pèse `1 000 × ρ` grammes, dont `P / 100` correspond au soluté pur :

```text
C₁ (mol/L) = (ρ × P × 10) / M_soluté
```

## Exemple chiffré : préparer 500 mL d'acide chlorhydrique à 0,50 mol/L

Vous devez préparer `500 mL` d'une solution de `HCl` à `0,50 mol/L` à partir d'acide concentré à `37 %` en masse (`ρ = 1,19 g/mL`, `M = 36,46 g/mol`).

### Étape 1 : déterminer la molarité mère C₁

```text
C₁ = (1,19 × 37 × 10) / 36,46 = 440,3 / 36,46 ≈ 12,08 mol/L
```

### Étape 2 : calculer le volume V₁ à pipeter

Avec `C₁ = 12,08 mol/L`, `C₂ = 0,50 mol/L` et `V₂ = 500 mL` :

```text
V₁ = (0,50 × 500) / 12,08 = 250 / 12,08 = 20,70 mL
```

Le facteur de dilution vaut `F = 12,08 / 0,50 = 24,16`.

### Étape 3 : protocole sécurisé en fiole jaugée

1. Versez d'abord environ `300 mL` d'eau ultrapure dans une fiole jaugée de `500 mL` (fond d'eau indispensable).
2. Sous hotte aspirante, prélevez `20,70 mL` de `HCl` concentré et versez l'acide lentement le long de la paroi.
3. Agitez doucement et laissez refroidir à `20 °C` pour éviter toute erreur liée à la dilatation thermique.
4. Ajustez à l'eau ultrapure jusqu'au trait de jauge, bouchez et retournez la fiole dix fois.

## Tableau des réactifs commerciaux de référence

Ce tableau indique la molarité mère `C₁` et le volume `V₁` requis pour préparer `1 000 mL` (`1,0 L`) de solution à `1,00 mol/L` à partir de six réactifs courants.

| Réactif chimique | Titre massique (`P`) | Densité (`ρ`, `g/mL`) | Masse molaire (`g/mol`) | Molarité `C₁` (`mol/L`) | Volume `V₁` pour `1 L` à `1,0 M` | Facteur `F` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Acide chlorhydrique (`HCl`) | `37,0 %` | `1,19` | `36,46` | `12,08` | `82,8 mL` | `12,1` |
| Acide sulfurique (`H₂SO₄`) | `96,0 %` | `1,84` | `98,08` | `18,01` | `55,5 mL` | `18,0` |
| Acide nitrique (`HNO₃`) | `68,0 %` | `1,41` | `63,01` | `15,22` | `65,7 mL` | `15,2` |
| Acide acétique (`CH₃COOH`) | `99,8 %` | `1,05` | `60,05` | `17,45` | `57,3 mL` | `17,5` |
| Ammoniaque (`NH₃`) | `25,0 %` | `0,91` | `17,03` | `13,36` | `74,9 mL` | `13,4` |
| Soude (`NaOH`) | `50,0 %` | `1,52` | `40,00` | `19,00` | `52,6 mL` | `19,0` |

## Applications pratiques et erreurs critiques

Au-delà des acides minéraux, `C₁V₁ = C₂V₂` sert quotidiennement à diluer des tampons biologiques (`PBS` 10× ou `TAE` 50× ramenés à 1×), des amorces de PCR (`100 µmol/L` ramenés à `0,5 µmol/L`) et des gammes d'étalonnage UV-visible.

Évitez cinq erreurs classiques qui faussent la molarité finale :

- **Confondre solvant ajouté et volume total** : ajouter `500 mL` d'eau à `20,70 mL` de `HCl` donne `520,7 mL` totaux, soit `0,480 mol/L` au lieu de `0,500 mol/L` (`-4 %` d'erreur). Complétez toujours *jusqu'au* volume `V₂`.
- **Ignorer la contraction volumique** : mélanger `500 mL` d'éthanol pur et `500 mL` d'eau produit environ `963 mL` et non `1 000 mL`. Seule la fiole jaugée étalonnée à `20 °C` (norme ISO 1042) garantit `V₂`.
- **Mélanger les unités** : convertir impérativement `C₁` et `C₂` dans la même unité (ex. `mol/L`), et `V₁` et `V₂` dans la même unité (ex. `mL`), avant de calculer.
- **Tenter un facteur extrême en une étape** : pipeter moins de `10 µL` pour `1 L` (`F > 100 000`) dégrade la justesse ; passez par une dilution en série.
- **Omettre l'étalonnage des solutions volatiles ou carbonatées** : l'ammoniaque perd du gaz `NH₃` et la soude absorbe le `CO₂` atmosphérique. Un titrage de contrôle reste requis pour une précision inférieure à `0,5 %`.
