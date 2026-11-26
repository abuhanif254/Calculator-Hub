---
title: "Calculatrice de Solubilité : La Chimie de la Dissolution"
description: "Maîtrisez le calcul de la solubilité molaire (s), du produit de solubilité Kps, l'influence de la température et de l'effet d'ion commun avec des exemples chiffrés."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "solubility-calculator"
faqs:
  - question: "Quelle est la différence entre la solubilité massique et la solubilité molaire ?"
    answer: "La solubilité massique indique la masse maximale de soluté dissoute par litre de solution (en g/L ou g/100 mL), tandis que la solubilité molaire s exprime cette même limite en nombre de moles par litre (mol/L ou M). On passe de l'une à l'autre en divisant la solubilité massique par la masse molaire du composé : s = s_massique / M."
  - question: "Pourquoi la température augmente-t-elle la solubilité des solides mais diminue-t-elle celle des gaz ?"
    answer: "La dissolution de la majorité des sels cristallins est endothermique (ΔH_diss > 0) : selon le principe de Le Chatelier, un apport thermique déplace l'équilibre vers la forme dissoute. À l'inverse, la dissolution d'un gaz dans un liquide est exothermique (ΔH_diss < 0) ; chauffer le solvant augmente l'agitation thermique et favorise le dégazage vers la phase gazeuse."
  - question: "Comment l'effet d'ion commun modifie-t-il la solubilité d'un sel peu soluble ?"
    answer: "L'ajout d'un électrolyte fort partageant un ion avec le sel peu soluble augmente la concentration de cet ion en solution. Comme le produit de solubilité Kps reste constant à température donnée, l'équilibre se déplace dans le sens de la précipitation, ce qui abaisse fortement la solubilité molaire s du sel."
  - question: "Comment savoir s'il va y avoir précipitation grâce à Qps et Kps ?"
    answer: "On compare le quotient réactionnel ionique Qps, calculé avec les concentrations réelles initiales, à la constante Kps. Si Qps < Kps, la solution est insaturée et aucun précipité ne se forme ; si Qps = Kps, la solution est exactement saturée ; si Qps > Kps, la solution est sursaturée et le sel précipite jusqu'à revenir à Qps = Kps."
  - question: "Ajouter davantage de solide non dissous augmente-t-il la concentration de la solution saturée ?"
    answer: "Non. Une fois la saturation atteinte, la phase aqueuse est en équilibre dynamique avec le solide en excès : autant d'ions se dissolvent qu'il n'en recristallise par seconde. Ajouter du solide supplémentaire augmente uniquement la masse de dépôt au fond du récipient sans modifier la molarité de la solution."
---

La **solubilité** désigne la quantité maximale d'une substance (le **soluté**) capable de se dissoudre dans un volume donné de liquide (le **solvant**) à une température et une pression fixées pour former une solution saturée homogène. Elle s'exprime en grammes par litre (`g/L`) pour la solubilité massique, ou en moles par litre (`mol/L`) pour la **solubilité molaire** (`s`), grandeur de référence en chimie analytique et en génie des procédés.

Notre [Calculatrice de Solubilité](/fr/calculatrices/calculateur-de-solubilite) calcule instantanément la solubilité molaire à partir de la masse dissoute, de la masse molaire du composé et du volume final de solution, tout en gérant les conversions d'unités. Que vous prépariez une saumure industrielle ou évaluiez un seuil de précipitation minérale, ces relations quantitatives préviennent les erreurs de formulation et les dépôts imprévus.

## Principes thermodynamiques et équations de la dissolution

La dissolution résulte d'un bilan énergétique entre la rupture du réseau cristallin du soluté, la création d'une cavité dans le solvant et la solvatation des espèces dispersées. Selon la règle de polarité, les solvants polaires comme l'eau dissolvent efficacement les composés ioniques et polaires, tandis que les solvants apolaires dissolvent les molécules organiques hydrophobes.

Pour une solution préparée à saturation ou un sel ionique peu soluble en équilibre `AₐB_b(s) ⇌ a A^(b+)(aq) + b B^(a−)(aq)`, on applique les équations suivantes :

```text
Quantité de matière       : n (mol) = m (g) / M (g/mol)
Solubilité molaire        : s (mol/L) = n / V(L) = m / (M × V)
Solubilité massique       : s_massique (g/L) = m / V = s × M
Produit de solubilité Kps : Kps = [A^(b+)]^a × [B^(a−)]^b = (a × s)^a × (b × s)^b
Solubilité depuis Kps     : s = [Kps / (a^a × b^b)]^(1 / (a + b))
Loi de Henry (gaz)        : C_gaz = k_H × P_gaz
```

### Rôle de la température, de la pression et des ions communs

L'effet thermique dépend du signe de l'enthalpie standard de dissolution (`ΔH_diss`). Pour la majorité des solides ioniques (tels que `KNO₃` ou `NH₄Cl`), la dissolution est endothermique (`ΔH_diss > 0`) : élever la température accroît la solubilité. Quelques sels comme le sulfate de cérium font exception avec une solubilité rétrograde à chaud.

Pour les gaz, la pression partielle gouverne directement la concentration dissoute via la loi de Henry (`C_gaz = k_H × P_gaz`), tandis qu'une hausse de température réduit `k_H` et provoque le dégazage. En présence d'un **ion commun** apporté par un autre électrolyte, l'équilibre se déplace vers le solide et abaisse fortement `s` sans modifier `Kps`.

## Exemple numérique étape par étape : NaCl et fluorure de calcium

Considérons d'abord une préparation à `25 °C` où `180,0 g` de chlorure de sodium (`NaCl`, masse molaire `M = 58,44 g/mol`) atteignent la saturation dans un volume final exact `V = 500 mL` (`0,500 L`).

1. **Calcul des moles (`n`) :** `n = 180,0 g / 58,44 g/mol = 3,080 mol` de `NaCl`.
2. **Conversion du volume (`V`) :** `V = 500 mL / 1 000 = 0,500 L`.
3. **Solubilité molaire (`s`) :** `s = 3,080 mol / 0,500 L = 6,160 mol/L` (soit `360,0 g/L`).

Prenons ensuite le cas d'un sel peu soluble, le fluorure de calcium (`CaF₂`, `M = 78,07 g/mol`, `Kps = 3,45 × 10⁻¹¹` à `25 °C`), selon `CaF₂(s) ⇌ Ca²⁺(aq) + 2 F⁻(aq)` (`a = 1`, `b = 2`).

1. **Expression de `Kps` :** `Kps = [Ca²⁺] × [F⁻]² = s × (2s)² = 4s³`.
2. **Extraction de `s` :** `s = (3,45 × 10⁻¹¹ / 4)^(1/3) = (8,625 × 10⁻¹²)^(1/3) ≈ 2,051 × 10⁻⁴ mol/L`.
3. **Solubilité massique :** `s_massique = 2,051 × 10⁻⁴ × 78,07 ≈ 0,0160 g/L` (`16,0 mg/L`).

## Tableau comparatif des constantes Kps et solubilités à 25 °C

Ce tableau compare des composés de référence afin d'illustrer comment la stœchiométrie et l'ordre de grandeur de `Kps` fixent la saturation dans l'eau pure à `25 °C` :

| Composé | Équilibre ionique | Constante Kps (25 °C) | Relation Kps = f(s) | Solubilité s (mol/L) | Solubilité (g/L) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `NaCl` | `Na⁺ + Cl⁻` | Très soluble | Hors approximation Kps | `6,16` | `360,0` |
| `CaSO₄` | `Ca²⁺ + SO₄²⁻` | `4,93 × 10⁻⁵` | `Kps = s²` | `7,02 × 10⁻³` | `0,956` |
| `PbI₂` | `Pb²⁺ + 2 I⁻` | `9,80 × 10⁻⁹` | `Kps = 4s³` | `1,35 × 10⁻³` | `0,622` |
| `CaF₂` | `Ca²⁺ + 2 F⁻` | `3,45 × 10⁻¹¹` | `Kps = 4s³` | `2,05 × 10⁻⁴` | `1,60 × 10⁻²` |
| `AgCl` | `Ag⁺ + Cl⁻` | `1,77 × 10⁻¹⁰` | `Kps = s²` | `1,33 × 10⁻⁵` | `1,91 × 10⁻³` |
| `Fe(OH)₃` | `Fe³⁺ + 3 OH⁻` | `2,79 × 10⁻³⁹` | `Kps = 27s⁴` | `1,01 × 10⁻¹⁰` | `1,08 × 10⁻⁸` |

## Applications pratiques, erreurs fréquentes et limites du modèle

La maîtrise quantitative de la solubilité est déterminante dans plusieurs domaines :

- **Industrie pharmaceutique :** près de `40 %` des principes actifs présentent une faible solubilité aqueuse (classes BCS II et IV), ce qui limite la biodisponibilité orale et impose un ajustement de pH ou une salification.
- **Traitement des eaux et thermique :** le suivi de la saturation du carbonate de calcium (`CaCO₃`) et du `CaSO₄` prévient l'entartrage des chaudières et des membranes d'osmose inverse.
- **Hydrométallurgie :** la précipitation sélective sépare des cations métalliques (`Ag⁺`, `Pb²⁺`, `Fe³⁺`) par contrôle fin du pH ou ajout de réactifs.

### Pièges courants et précautions expérimentales

La première erreur consiste à confondre le **volume de solvant pur ajouté** et le **volume final de la solution** : aux fortes concentrations, la dissolution modifie le volume total et fausse `s` hors fiole jaugée. Deuxièmement, l'oubli de l'exposant stœchiométrique dans `Kps` (écrire `2s³` au lieu de `4s³`) génère des écarts importants.

Enfin, `Kps` suppose des solutions diluées de force ionique négligeable (`γᵢ ≈ 1`). En milieu salin concentré, les interactions électrostatiques réduisent l'activité réelle des ions (effet salin), augmentant légèrement la solubilité par rapport à la valeur idéale, tout comme les réactions acido-basiques sur les anions basiques (`F⁻`, `CO₃²⁻`, `OH⁻`).
