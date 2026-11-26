---
title: "Masse Molaire : Lire le Tableau Périodique"
description: "Apprenez à calculer la masse molaire (g/mol) depuis le tableau périodique : masses atomiques standard IUPAC, parenthèses, hydrates cristallins, pourcentages massiques et exemples chiffrés."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "molar-mass-calculator"
relatedType: "calculator"
faqs:
  - question: "Quelle est la différence entre masse atomique, masse moléculaire relative et masse molaire ?"
    answer: "La masse atomique (ou moléculaire) relative Mr est un nombre sans dimension exprimant le rapport entre la masse moyenne d'une particule et le douzième de la masse d'un atome de carbone-12. La masse molaire M s'exprime en g/mol et désigne la masse d'une mole de particules. Numériquement, M et Mr ont presque exactement la même valeur (M = Mr × 1 g/mol)."
  - question: "Pourquoi les masses atomiques du tableau périodique ne sont-elles pas des nombres entiers ?"
    answer: "Chaque élément naturel est un mélange de plusieurs isotopes possédant le même nombre de protons mais un nombre différent de neutrons. La masse atomique standard publiée par l'IUPAC est une moyenne pondérée par les abondances naturelles. Par exemple, le chlore vaut 35,45 g/mol car il associe environ 75,8 % de chlore-35 et 24,2 % de chlore-37."
  - question: "Comment traiter le point central dans la formule d'un sel hydraté comme CuSO₄·5H₂O ?"
    answer: "En nomenclature chimique, le point médian (·) ne signifie pas une multiplication, mais une association stœchiométrique entre le sel anhydre et des molécules d'eau piégées dans le réseau cristallin. Pour calculer la masse molaire de CuSO₄·5H₂O, il faut donc additionner la masse molaire de CuSO₄ (159,60 g/mol) et cinq fois celle de l'eau (5 × 18,015 = 90,075 g/mol), soit 249,68 g/mol."
  - question: "Comment calculer la masse molaire d'une formule contenant des parenthèses comme Ca₃(PO₄)₂ ?"
    answer: "Tout indice situé immédiatement à droite d'une parenthèse fermante multiplie chacun des atomes contenus à l'intérieur. Dans Ca₃(PO₄)₂, on dénombre 3 atomes de calcium (Ca), 1 × 2 = 2 atomes de phosphore (P) et 4 × 2 = 8 atomes d'oxygène (O), soit 3×40,078 + 2×30,974 + 8×15,999 = 310,17 g/mol."
  - question: "Quelle différence existe-t-il entre la masse molaire chimique moyenne et la masse exacte en spectrométrie de masse ?"
    answer: "La masse molaire standard (calculée avec le tableau périodique) reflète la moyenne isotopique naturelle d'un échantillon macroscopique (par exemple 12,011 g/mol pour le carbone). En spectrométrie de masse haute résolution, l'appareil sépare chaque isotopologue individuel et mesure la masse exacte monoisotopique basée sur l'isotope le plus abondant seul (¹²C = 12,0000 u, ¹H = 1,0078 u)."
---

La **masse molaire** (`M`, en `g/mol`) désigne la masse d'une mole (`6,022 140 76 × 10²³` entités) d'atomes, de molécules ou d'unités formulaires. Elle permet à tout chimiste de convertir une formule chimique écrite (`H₂O`, `C₆H₁₂O₆`) en une masse pesable sur balance analytique.

Pour tout composé pur, la masse molaire se calcule en additionnant les masses atomiques standard du tableau périodique, chacune multipliée par son indice stœchiométrique. Pour vérifier instantanément une formule brute, parenthésée ou hydratée, utilisez notre [calculatrice de masse molaire](/fr/calculatrices/calculateur-de-masse-molaire).

## Lecture du tableau périodique et règles de sommation

Sur une case du tableau périodique figurent deux nombres distincts :

1. **Le numéro atomique (`Z`) :** entier supérieur (`6` pour `C`, `17` pour `Cl`), donnant le nombre de protons. Il **ne sert jamais** au calcul de la masse molaire.
2. **La masse atomique standard (`A_r`) :** nombre décimal inférieur (`12,011` pour `C`, `35,45` pour `Cl`). C'est la moyenne pondérée des isotopes naturels, directement utilisable en `g/mol`.

```text
Masse molaire composée       : M(A_a B_b C_c) = a × M(A) + b × M(B) + c × M(C)
Pourcentage massique         : % X = [ν_X × M(X) / M_totale] × 100
Sel hydraté (sel · n H₂O)    : M_totale = M(sel anhydre) + n × 18,015 g/mol
```

### Parenthèses, crochets et sels hydratés

- **Indices simples :** l'indice ne porte que sur le symbole placé immédiatement à gauche (`H₂SO₄` : `2 H, 1 S, 4 O`).
- **Parenthèses :** l'indice extérieur multiplie tous les atomes internes (`Mg(NO₃)₂` : `1 Mg, 2 N, 6 O`). Dans les complexes (`K₄[Fe(CN)₆]`), développez de l'intérieur vers l'extérieur (`4 K, 1 Fe, 6 C, 6 N`).
- **Hydrates cristallins :** le point médian (`Na₂CO₃·10H₂O`) indique une addition stœchiométrique d'eau cristalline, jamais une multiplication.

## Exemple numérique complet : sulfate d'ammonium et sel hydraté

Calculons d'abord la masse molaire du **sulfate d'ammonium** `(NH₄)₂SO₄`, engrais azoté majeur et réactif de précipitation protéique.

### Étape 1 : Décompte des atomes dans `(NH₄)₂SO₄`

En distribuant l'indice `2` sur `(NH₄)` : `N = 2`, `H = 4 × 2 = 8`, `S = 1`, `O = 4`.

### Étape 2 : Somme des contributions atomiques IUPAC

```text
Azote (N)     : 2 × 14,007 =  28,014 g/mol
Hydrogène (H) : 8 ×  1,008 =   8,064 g/mol
Soufre (S)    : 1 × 32,06  =  32,060 g/mol
Oxygène (O)   : 4 × 15,999 =  63,996 g/mol
------------------------------------------
Total M       :              132,134 g/mol
```

La masse molaire vaut **`132,13 g/mol`**.

### Étape 3 : Teneur massique en azote (`% N`)

`% N = (28,014 / 132,134) × 100 ≈ 21,20 %` (`21,20 kg` d'azote par `100 kg` d'engrais pur).

### Cas d'un hydrate : sulfate de cuivre pentahydraté (`CuSO₄·5H₂O`)

Avec `Cu = 63,546`, `S = 32,06`, `O = 15,999` et `H₂O = 18,015 g/mol` :

- `M(CuSO₄) = 63,546 + 32,06 + (4 × 15,999) = 159,602 g/mol`
- `5 × M(H₂O) = 5 × 18,015 = 90,075 g/mol`
- `M_totale = 159,602 + 90,075 = 249,677 g/mol` (soit **`249,68 g/mol`**).

L'eau de cristallisation représente `36,08 %` de la masse du sel bleu pesé.

## Tableau des masses molaires et compositions centésimales clés

Ce tableau synthétise six composés de référence avec leur décompte atomique, leur masse molaire IUPAC et la fraction massique de leur élément principal.

| Composé chimique | Formule | Décompte atomique | Masse molaire (`g/mol`) | Élément majoritaire | Usage principal |
|---|---|---|---|---|---|
| Eau | `H₂O` | `2 H, 1 O` | `18,015` | Oxygène (`88,81 %`) | Solvant et étalon de densité |
| Dioxyde de carbone | `CO₂` | `1 C, 2 O` | `44,009` | Oxygène (`72,71 %`) | Bilans carbone et fluides supercritiques |
| Chlorure de sodium | `NaCl` | `1 Na, 1 Cl` | `58,44` | Chlore (`60,66 %`) | Étalonnage salin et sérum physiologique |
| Bicarbonate de sodium | `NaHCO₃` | `1 Na, 1 H, 1 C, 3 O` | `84,006` | Oxygène (`57,14 %`) | Tampon pH et pharmacopée |
| Acide sulfurique | `H₂SO₄` | `2 H, 1 S, 4 O` | `98,07` | Oxygène (`65,25 %`) | Synthèse industrielle et batteries |
| Glucose | `C₆H₁₂O₆` | `6 C, 12 H, 6 O` | `180,16` | Oxygène (`53,28 %`) | Métabolisme et milieux biologiques |

## Usages avancés, polymères et erreurs fréquentes

### De la formule empirique aux macromolécules

Le rapport `M_mesurée / M_empirique` permet de déduire la formule brute exacte d'un composé inconnu à partir de son analyse élémentaire centésimale (`CH₂O` de masse `30,03 g/mol` multiplié par `6` identifie sans ambiguïté le glucose `C₆H₁₂O₆` à `180,16 g/mol`). Pour les **polymères** synthétiques et biologiques (polyéthylène, cellulose, protéines ou acides nucléiques), les chaînes macromoléculaires présentent une distribution statistique de longueurs ; on distingue alors la masse molaire moyenne en nombre (`M_n`) de la masse molaire moyenne en masse (`M_w`), dont le quotient `Ð = M_w / M_n` mesure l'indice de dispersité.

### Cinq pièges classiques de lecture et de saisie

1. **Confondre numéro atomique `Z` et masse atomique :** additionner `Z = 6` (`C`) et `Z = 8` (`O`) fausse totalement le calcul.
2. **Ignorer la casse des symboles :** `Co` désigne le cobalt (`58,933 g/mol`), alors que `CO` est le monoxyde de carbone (`28,010 g/mol`).
3. **Multiplier le point d'hydratation :** additionnez toujours `n × 18,015 g/mol` au sel anhydre, ne multipliez jamais.
4. **Oublier de distribuer l'indice des parenthèses :** dans `(NH₄)₂SO₄`, multipliez aussi `N` par `2`.
5. **Arrondir trop tôt les masses atomiques :** conservez au moins deux décimales par élément avant la somme finale pour éviter une dérive supérieure à `1 %`.
