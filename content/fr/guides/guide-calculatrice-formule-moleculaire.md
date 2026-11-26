---
title: "Formule Moléculaire : Trouver le Vrai Composé"
description: "Apprenez la différence entre formule empirique et moléculaire, comment calculer le nombre réel d'atomes, et utilisez notre Calculatrice."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "molecular-formula-calculator"
relatedType: "calculator"
faqs:
  - question: "De quelles données a-t-on besoin pour passer de la formule empirique à la formule moléculaire ?"
    answer: "Deux grandeurs sont indispensables : la formule empirique (qui fixe le rapport entier minimal entre les atomes) et la masse molaire réelle du composé (exprimée en g/mol), obtenue expérimentalement par spectrométrie de masse, par méthode des gaz parfaits ou par mesure colligative."
  - question: "La formule moléculaire peut-elle être identique à la formule empirique ?"
    answer: "Oui, dès que le multiplicateur entier n vaut 1 (c'est-à-dire lorsque la masse molaire réelle est égale à la masse de l'unité empirique). C'est le cas de très nombreuses molécules courantes comme l'eau (H₂O), le méthane (CH₄), l'ammoniac (NH₃) ou l'éthanol (C₂H₆O)."
  - question: "Pourquoi plusieurs composés différents ont-ils exactement la même formule moléculaire ?"
    answer: "La formule moléculaire indique uniquement le nombre réel d'atomes de chaque élément, sans préciser comment ils sont liés entre eux. Deux molécules distinctes partageant la même formule moléculaire sont des isomères : par exemple, C₆H₁₂O₆ correspond aussi bien au D-glucose qu'au D-fructose ou au galactose."
  - question: "Que faire si le rapport masse molaire réelle / masse empirique ne donne pas un entier exact ?"
    answer: "Avec des mesures expérimentales, de légers écarts (par exemple 5,97 ou 6,03) sont normaux et doivent être arrondis à l'entier le plus proche (6). En revanche, un résultat intermédiaire tel que 2,45 ou 3,52 indique soit une formule empirique erronée, soit une masse molaire biaisée par un échantillon impur ou une dimérisation."
  - question: "Quelle différence entre masse molaire moyenne et masse monoisotopique en spectrométrie de masse ?"
    answer: "La masse molaire standard utilise les masses atomiques moyennes pondérées par l'abondance naturelle des isotopes (utile pour la stœchiométrie macroscopique). En spectrométrie de masse haute résolution, le pic moléculaire correspond à la masse monoisotopique des isotopes les plus abondants (¹²C, ¹H, ¹⁶O), ce qui permet de distinguer des formules de masses nominales voisines."
---

La **formule moléculaire** indique le nombre exact et réel d'atomes de chaque élément chimique qui constituent une molécule discrète. Contrairement à la formule empirique, qui ne donne que le rapport entier le plus simple (tel que `CH₂O`), la formule moléculaire révèle la taille réelle de la molécule : elle distingue ainsi le formaldéhyde (`CH₂O`), l'acide acétique (`C₂H₄O₂`) et le glucose (`C₆H₁₂O₆`), bien que ces trois espèces présentent la même composition centésimale.

Pour effectuer cette conversion sans risque d'erreur d'arrondi, notre [Calculatrice de Formule Moléculaire](/fr/calculatrices/calculateur-de-formule-moleculaire) combine la formule empirique et la masse molaire expérimentale afin d'en déduire le facteur multiplicateur entier `n` et la formule moléculaire exacte.

## Relation mathématique entre formule empirique et formule moléculaire

Toute molécule discrète renferme un nombre entier `n` de répétitions de son motif empirique. Sa masse molaire réelle est donc nécessairement un multiple entier de la masse molaire calculée sur la formule empirique.

Les paramètres de calcul sont :
- `M_emp` : masse molaire du motif empirique en `g/mol`, somme des masses atomiques pondérées par leurs indices empiriques (`a, b, c`) ;
- `M_mol` : masse molaire réelle du composé en `g/mol`, mesurée expérimentalement ;
- `n` : multiplicateur entier strictement positif (`n ∈ ℕ*`, `n ≥ 1`).

```text
1. Masse molaire empirique : M_emp = (a × M_A) + (b × M_B) + (c × M_C) + ...
2. Multiplicateur entier   : n = arrondi(M_mol / M_emp)
3. Formule moléculaire     : A_(a × n) B_(b × n) C_(c × n)
```

Lorsque `n = 1`, les formules empirique et moléculaire coïncident (`CO₂`, `H₂SO₄`, `C₃H₈`). Dès que `n ≥ 2`, plusieurs motifs s'assemblent par liaisons covalentes. Rappelons toutefois que la formule moléculaire renseigne uniquement sur la composition atomique globale sans préciser l'enchaînement des atomes : des **isomères de constitution** ou des **stéréoisomères** (comme le D-glucose, le D-fructose et le D-galactose pour `C₆H₁₂O₆`) partagent exactement la même formule moléculaire mais possèdent des propriétés physiques et biologiques distinctes.

### Tolérance expérimentale sur le calcul du multiplicateur `n`

En laboratoire, le quotient `M_mol / M_emp` tombe rarement sur un entier mathématique parfait en raison de l'incertitude des mesures de masse molaire (`± 0,5 %` à `± 2 %` selon la méthode). Un écart inférieur à `± 0,05` autour d'un entier (par exemple `5,96` ou `6,04`) s'arrondit légitimement à `6`. En revanche, une valeur intermédiaire telle que `2,45` signale une erreur sur la formule empirique, une impureté ou un mélange.

## Exemple numérique détaillé : identification d'un glucide et d'un hydrocarbure

### Cas 1 : Poudre organique de motif empirique `CH₂O`

L'analyse élémentaire d'un solide cristallin donne la formule empirique `CH₂O`, et la spectrométrie de masse mesure **`M_mol = 180,16 g/mol`**.

1. **Masse molaire empirique (`M_emp`)** avec `M(C) = 12,011 g/mol`, `M(H) = 1,008 g/mol` et `M(O) = 15,999 g/mol` :
   - `M_emp(CH₂O) = 12,011 + (2 × 1,008) + 15,999 = 30,026 g/mol`
2. **Calcul du multiplicateur (`n`)** :
   - `n = 180,16 / 30,026 = 6,0001 ≈ 6`
3. **Multiplication de chaque indice empirique par `6`** :
   - Carbone : `1 × 6 = 6` ; Hydrogène : `2 × 6 = 12` ; Oxygène : `1 × 6 = 6`.

La formule moléculaire exacte est **`C₆H₁₂O₆`** (hexose tel que le D-glucose).

### Cas 2 : Hydrocarbures de formule empirique `CH`

Deux composés contenant `92,26 %` de carbone et `7,74 %` d'hydrogène partagent le motif `CH` (`M_emp = 13,019 g/mol`) :
- Pour `M_mol = 26,04 g/mol` : `n = 26,04 / 13,019 = 2,000` → **`C₂H₂`** (acétylène) ;
- Pour `M_mol = 78,11 g/mol` : `n = 78,11 / 13,019 = 6,000` → **`C₆H₆`** (benzène).

## Tableau comparatif : séries de composés à formule empirique identique

Ce tableau illustre comment le facteur multiplicateur `n` génère des composés distincts à partir d'un même motif empirique :

| Formule empirique | Masse empirique (`g/mol`) | Masse molaire réelle (`g/mol`) | Facteur `n` | Formule moléculaire | Composé type et usage |
| :--- | :---: | :---: | :---: | :--- | :--- |
| `CH₂O` | `30,03` | `30,03` | `1` | `CH₂O` | Méthanal (résines) |
| `CH₂O` | `30,03` | `60,05` | `2` | `C₂H₄O₂` | Acide acétique (vinaigre) |
| `CH₂O` | `30,03` | `180,16` | `6` | `C₆H₁₂O₆` | D-Glucose (métabolisme) |
| `CH` | `13,02` | `26,04` | `2` | `C₂H₂` | Acétylène (soudage) |
| `CH` | `13,02` | `78,11` | `6` | `C₆H₆` | Benzène (solvant aromatique) |
| `CH₂` | `14,03` | `84,16` | `6` | `C₆H₁₂` | Cyclohexane (solvant) |
| `NO₂` | `46,01` | `92,01` | `2` | `N₂O₄` | Peroxyde d'azote (comburant) |

## Détermination expérimentale de la masse molaire et pièges à éviter

Trois méthodes fournissent la masse molaire `M_mol` nécessaire au calcul :
- **Spectrométrie de masse (SM)** : mesure le rapport `m/z` de l'ion moléculaire (`M⁺•`) ou protoné (`[M + H]⁺`) avec une précision inférieure à `0,001 g/mol` en haute résolution.
- **Méthode des gaz parfaits (Dumas)** : pour les liquides volatils, `M_mol = (m × R × T) / (P × V)`.
- **Méthodes colligatives** : cryoscopie ou osmométrie pour les solutés non volatils.

Évitez enfin ces quatre erreurs fréquentes :
1. **Inverser le quotient (`M_emp / M_mol`)** : un résultat inférieur à `1` est impossible, car `n ≥ 1` ;
2. **Négliger la dimérisation** : certains composés s'associent en phase vapeur ou en solution apolaire (`2 NO₂ ⇌ N₂O₄`, dimères d'acides carboxyliques), doublant la masse apparente ;
3. **Confondre masse monoisotopique et masse moyenne** : notamment en présence de chlore (`³⁵Cl/³⁷Cl`) ou de brome (`⁷⁹Br/⁸¹Br`) ;
4. **Appliquer le concept aux solides ioniques ou réticulés** : les cristaux comme `NaCl` ou `SiO₂` ne forment pas de molécules discrètes et n'admettent qu'une formule statistique.
