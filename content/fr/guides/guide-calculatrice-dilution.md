---
title: "Dilution en Série : Créer des Concentrations Précises"
description: "Découvrez le facteur de dilution, comment réaliser des dilutions en série en laboratoire, et utilisez notre Calculatrice de Dilution."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "dilution-calculator"
relatedType: "calculator"
faqs:
  - question: "Quelle est la différence entre une notation 1:10 (facteur de dilution) et un rapport 1:9 (soluté:solvant) ?"
    answer: "En biologie et microbiologie, « dilution au 1/10 » ou « 1:10 » désigne presque toujours 1 volume de solution mère mélangé à 9 volumes de diluant pour obtenir 10 volumes totaux (facteur F = 10). Certains protocoles de chimie analytique utilisent toutefois « 1:9 » pour noter le ratio soluté sur solvant (1 + 9 = 10 volumes). Vérifiez toujours si le texte indique le volume total ou le volume de diluant."
  - question: "Pourquoi réaliser une dilution en série plutôt qu'une dilution directe en une seule étape ?"
    answer: "Une dilution directe d'un facteur 10⁶ exigerait soit de prélever 1 µL pour le diluer dans 1 000 mL (gaspillage important), soit de pipeter 1 picolitre dans 1 mL, ce qui est impossible avec des micropipettes standard. La cascade maintient chaque prélèvement dans la zone optimale des pipettes (10 à 1 000 µL)."
  - question: "Faut-il obligatoirement changer de cône de micropipette entre chaque tube d'une dilution en série ?"
    answer: "Oui, impérativement. Réutiliser le même embout entre un tube concentré et le suivant transfère des traces résiduelles accrochées aux parois (effet « carry-over »). Sur des facteurs de 10⁵ ou 10⁶, ce transfert parasite peut multiplier la concentration finale par 2 à 10."
  - question: "Comment calculer la concentration bactérienne initiale en UFC/mL après comptage sur gélose ?"
    answer: "Appliquez UFC/mL = N_colonies / (V_étalé × D), où V_étalé est le volume déposé sur la boîte (souvent 0,1 mL ou 1 mL) et D la dilution cumulative du tube (par exemple 10⁻⁴). Selon les normes microbiologiques ISO, ne retenez que les boîtes comptant entre 30 et 300 colonies."
  - question: "Comment les erreurs de pipetage s'accumulent-elles le long d'une gamme de dilutions en série ?"
    answer: "Chaque étape transmet son erreur relative aux suivantes. Une erreur aléatoire de ±2 % par transfert donne après n étapes une incertitude quadratique de √(n × 2²), soit ±4,5 % après 5 tubes. Un biais systématique de +2 % (pipette décalibrée) s'additionne linéairement et atteint +10,4 % au cinquième tube."
---

Une **dilution en série** (ou dilution en cascade) enchaîne plusieurs dilutions successives où chaque tube préparé devient la solution mère du tube suivant. Cette méthode permet d'abaisser une concentration de plusieurs ordres de grandeur — de `10³` à `10⁹` fois — tout en conservant de faibles volumes de réactifs et des prélèvements fiables à la micropipette.

Incontournable en microbiologie pour dénombrer des cultures denses, en immunologie pour les courbes ELISA, en pharmacologie pour déterminer une concentration inhibitrice médiane (`CI₅₀`) et en biologie moléculaire pour les gammes qPCR, la dilution en série suit une progression géométrique exacte. Pour dimensionner vos volumes d'aliquote et de diluant à chaque étape, utilisez notre [Calculatrice de Dilution](/fr/calculatrices/calculateur-de-dilution).

## Mathématiques du facteur de dilution et progression géométrique

Lorsqu'on transfère un volume d'aliquote `V_aliq` dans un tube contenant déjà un volume `V_dil` de diluant (tampon `PBS`, bouillon stérile, eau ultrapure), le volume total vaut `V_total = V_aliq + V_dil`. Le **facteur de dilution unitaire** `F_étape` s'exprime par :

```text
F_étape = V_total / V_aliq = (V_aliq + V_dil) / V_aliq
Fraction D = 1 / F_étape = V_aliq / V_total
F_total(n) = F₁ × F₂ × ... × F_n
```

Lorsque toutes les étapes utilisent le même facteur `F_étape`, la concentration `C_n` au tube `n` décroît selon une loi géométrique simple :

```text
F_total(n) = (F_étape)^n
C_n = C₀ / (F_étape)^n = C₀ × D^n
```

Chaque terme répond à une définition précise :

- **`C₀` (concentration initiale)** : concentration de départ (`mg/L`, `µg/mL`, `mol/L`, `%` ou `UFC/mL`). Contrairement au calcul molaire, le facteur de dilution s'applique à toute unité proportionnelle à la masse ou au nombre d'entités.
- **`V_aliq` (aliquote transférée)** : volume prélevé dans le tube précédent. Il doit rester dans la plage de justesse de la micropipette (`≥ 10 %` de sa capacité nominale).
- **`V_dil` (volume de diluant)** : volume de solvant pré-distribué dans chaque tube vierge.
- **`V_résiduel` (volume disponible)** : après transfert vers le tube suivant, chaque tube intermédiaire conserve exactement `V_dil` de solution utile pour les tests.

## Exemple pas à pas : gamme décimale et numération bactérienne

### Étape 1 : réaliser une cascade décimale (facteur 10) en 5 tubes

Supposez que vous partiez d'un étalon protéique (`BSA`) à `C₀ = 10 000 µg/mL` (`10 mg/mL`) pour atteindre `0,1 µg/mL` au cinquième tube, avec `900 µL` disponibles par tube :

1. Distribuez `V_dil = 900 µL` de tampon `PBS` dans 5 microtubes numérotés de 1 à 5.
2. Homogénéisez la solution mère, prélevez `V_aliq = 100 µL` et transférez-les dans le Tube 1 (`V_total = 1 000 µL`, donc `F_étape = 10`).
3. Changez d'embout, vortexez le Tube 1, puis transférez `100 µL` dans le Tube 2.
4. Répétez l'opération avec un cône neuf jusqu'au Tube 5.

La série obtenue suit exactement la progression décimale :

```text
Tube 1 : F_total = 10¹ ⇒ C₁ = 10 000 / 10 = 1 000 µg/mL
Tube 2 : F_total = 10² ⇒ C₂ = 10 000 / 100 = 100 µg/mL
Tube 3 : F_total = 10³ ⇒ C₃ = 10 000 / 1 000 = 10 µg/mL
Tube 4 : F_total = 10⁴ ⇒ C₄ = 10 000 / 10 000 = 1 µg/mL
Tube 5 : F_total = 10⁵ ⇒ C₅ = 10 000 / 100 000 = 0,1 µg/mL
```

### Étape 2 : calculer une charge bactérienne en UFC/mL

Si la même gamme `10⁻¹` à `10⁻⁵` provient d'une culture bactérienne et que l'étalement de `V_étalé = 0,1 mL` (`100 µL`) issu du **Tube 4** (`D = 10⁻⁴`) produit `142` colonies isolées après incubation :

```text
UFC/mL = N_colonies / (V_étalé × D) = 142 / (0,1 × 10⁻⁴) = 1,42 × 10⁷ UFC/mL
```

Le Tube 3 (`10⁻³`) aurait donné environ `1 420` colonies confluentes, tandis que le Tube 5 (`10⁻⁵`) n'en compterait que `14` (hors plage statistique `30–300`).

## Tableau comparatif des schémas de dilution en série

Le facteur unitaire choisi arbitre entre finesse de pas sur une courbe et étendue de la plage couverte.

| Schéma (`F_étape`) | Aliquote (`V_total = 1 mL`) | Diluant | Tube 1 (`% de C₀`) | Tube 3 (`% de C₀`) | Tube 5 (`% de C₀`) | Usage typique |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `1:2` (facteur `2`) | `500 µL` | `500 µL` | `50,0 %` (`1/2`) | `12,5 %` (`1/8`) | `3,125 %` (`1/32`) | Titrage sérique, CMI antibiotiques |
| `1:3` (facteur `3`) | `333,3 µL` | `666,7 µL` | `33,33 %` (`1/3`) | `3,704 %` (`1/27`) | `0,412 %` (`1/243`) | Courbes dose-réponse (`CI₅₀`) |
| `1:4` (facteur `4`) | `250 µL` | `750 µL` | `25,0 %` (`1/4`) | `1,563 %` (`1/64`) | `0,098 %` (`1/1 024`) | Tests ELISA et immunodosages |
| `1:5` (facteur `5`) | `200 µL` | `800 µL` | `20,0 %` (`1/5`) | `0,800 %` (`1/125`) | `0,032 %` (`1/3 125`) | Gammes qPCR et Western Blot |
| `1:10` (facteur `10`) | `100 µL` | `900 µL` | `10,0 %` (`1/10`) | `0,100 %` (`10⁻³`) | `0,001 %` (`10⁻⁵`) | Microbiologie alimentaire, eau |
| `1:100` (facteur `100`) | `10 µL` | `990 µL` | `1,00 %` (`10⁻²`) | `0,0001 %` (`10⁻⁶`) | `10⁻⁸ %` (`10⁻¹⁰`) | Réduction rapide de cultures denses |

## Bonnes pratiques et erreurs critiques en laboratoire

La reproductibilité d'une cascade dépend de la rigueur gestuelle à chaque transfert :

- **Supprimer l'effet « carry-over »** : changez d'embout après chaque transfert. Réutiliser un même cône contamine le tube suivant par le film liquide résiduel.
- **Homogénéiser et pré-mouiller** : passez chaque tube au vortex `5 à 10 secondes` avant le prélèvement suivant. Pour les solutions visqueuses ou protéiques, pré-mouillez le cône neuf par aspiration-refoulement.
- **Limiter la dérive cumulative** : un biais de `+3 %` sur la micropipette atteint `+19,4 %` après 6 transferts. Au-delà de 6 étapes, privilégiez les dilutions gravimétriques par pesée.
- **Éviter les faibles volumes** : deux étapes au `1:10` (`100 µL` dans `900 µL`) offrent une meilleure répétabilité qu'une étape directe au `1:100` (`10 µL` dans `990 µL`), sensible à l'évaporation.
