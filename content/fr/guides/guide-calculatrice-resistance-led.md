---
title: "Résistance pour LED : Protéger vos Composants"
description: "Découvrez pourquoi les LED ont besoin de résistances, comment éviter qu'elles ne brûlent, et utilisez notre Calculatrice de Résistance pour LED."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "led-resistor-calculator"
faqs:
  - question: "Pourquoi ne peut-on pas brancher une LED directement sur une pile sans résistance ?"
    answer: "Une LED se comporte comme une diode semi-conductrice dont le courant augmente de façon exponentielle dès que sa tension de seuil est dépassée. Sans résistance de limitation, même un léger excédent de tension génère un courant destructeur qui provoque un emballement thermique et grille la jonction en quelques millisecondes."
  - question: "Comment choisir la puissance en watts de la résistance de protection ?"
    answer: "Calculez d'abord la puissance dissipée par la résistance avec la formule P = (Vs − Vf) × If. Appliquez ensuite un coefficient de sécurité d'au moins 2 : si la dissipation calculée atteint 0,12 W, privilégiez une résistance de 0,25 W (1/4 W) bien ventilée, ou de 0,5 W (1/2 W) si la température ambiante est élevée."
  - question: "Peut-on utiliser une seule résistance commune pour plusieurs LED en parallèle ?"
    answer: "Non, cette pratique est fortement déconseillée. En raison des tolérances de fabrication, chaque LED possède une tension directe (Vf) légèrement différente ; celle ayant le seuil le plus bas absorbera la majorité du courant, surchauffera puis tombera en panne, entraînant la destruction en cascade des autres diodes."
  - question: "Quelle valeur normalisée choisir si le calcul donne une résistance introuvable ?"
    answer: "Arrondissez systématiquement à la valeur normalisée immédiatement supérieure dans la série E12 ou E24 (par exemple 360 Ω ou 390 Ω pour un besoin théorique de 350 Ω). Une résistance légèrement plus élevée réduit marginalement le courant et la luminosité, tout en augmentant la durée de vie de la LED."
  - question: "Une résistance suffit-elle pour alimenter une LED de puissance de 1 W ou 3 W ?"
    answer: "Non, pour les LED de puissance consommant 350 mA à 1 000 mA ou plus, une simple résistance série dissiperait plusieurs watts en chaleur pure et offrirait un rendement médiocre. Il est indispensable d'utiliser un pilote à courant constant (driver à découpage) adapté."
---

Brancher une diode électroluminescente (LED) directement aux bornes d'une pile provoque presque instantanément sa destruction. Contrairement à une lampe à incandescence, une LED est un composant semi-conducteur non linéaire : dès que sa tension de seuil est franchie, une hausse infime de tension entraîne une montée exponentielle du courant. L'insertion d'une résistance en série est donc indispensable pour limiter l'intensité et stabiliser le circuit. Dimensionnez ce composant en quelques secondes avec notre [Calculatrice de Résistance pour LED](/fr/calculatrices/calculateur-de-resistance-led).

Ce calcul repose sur la loi d'Ohm appliquée à la maille du circuit, complétée par la vérification de la dissipation thermique. En combinant la tension de la source, la chute de tension propre à la couleur de la diode et le courant nominal voulu, vous obtenez la valeur ohmique théorique, la valeur commerciale normalisée (séries E12 ou E24) et la puissance admissible requise.

## Principes physiques et formules de calcul

La fiche technique d'une LED précise deux grandeurs essentielles : sa **tension directe (`Vf`)**, correspondant au seuil nécessaire à la conduction, et son **courant direct nominal (`If`)**, exprimé en ampères (`A`) ou en milliampères (`mA`).

Lorsque la tension d'alimentation (`Vs`) dépasse `Vf`, l'excédent (`Vs − Vf`) doit être absorbé par une résistance placée en série. La valeur ohmique (`R`, en ohms `Ω`) et la puissance dissipée (`P_R`, en watts `W`) obéissent aux relations suivantes :

```text
LED unique :         R = (Vs − Vf) / If
N LED en série :     R = (Vs − N × Vf) / If
Puissance dissipée : P_R = (Vs − Vf) × If = R × If²
```

Pour un montage en série de `N` LED identiques, la somme `N × Vf` doit rester inférieure à `Vs`. Conservez au moins `1,5 V` à `2,0 V` de marge aux bornes de la résistance afin d'absorber les variations de tension sans déstabiliser la luminosité.

Toute l'énergie retenue par la résistance étant convertie en chaleur par effet Joule, choisissez une puissance nominale au moins égale à `2 × P_R` (marge thermique de sécurité).

## Exemple détaillé étape par étape

Voici deux situations typiques : une LED témoin sur pile de `9 V`, puis un assemblage de trois LED blanches sous `12 V`.

### Cas 1 : Une LED rouge standard sur pile 9 V

Avec une pile `Vs = 9,0 V` et une LED rouge de 5 mm (`Vf = 2,0 V`, `If = 20 mA = 0,020 A`) :

1. **Chute de tension à absorber :** `9,0 − 2,0 = 7,0 V`.
2. **Résistance théorique :** `R = 7,0 / 0,020 = 350 Ω`.
3. **Valeur normalisée supérieure :** on sélectionne `360 Ω` (série E24) ou `390 Ω` (série E12). Avec `390 Ω`, le courant réel s'établit à `7,0 / 390 = 0,0179 A` (`17,9 mA`), garantissant une excellente longévité sans baisse lumineuse visible.
4. **Dissipation thermique :** `P_R = 7,0 × 0,0179 = 0,125 W` (`125 mW`). Le double vaut `0,250 W` : une résistance de `0,25 W` (1/4 W) atteint sa limite recommandée ; une `0,5 W` (1/2 W) offre davantage de confort thermique.

### Cas 2 : Trois LED blanches en série sous 12 V

Pour trois LED blanches (`Vf = 3,2 V`, `If = 15 mA = 0,015 A`) en série sur une alimentation régulée `12,0 V` :

1. **Tension cumulée des diodes :** `3 × 3,2 = 9,6 V`, soit `2,4 V` restants sur la résistance.
2. **Résistance requise :** `R = 2,4 / 0,015 = 160 Ω` (valeur exacte en série E24).
3. **Puissance dissipée :** `P_R = 2,4 × 0,015 = 0,036 W` (`36 mW`). Une résistance `0,25 W` suffit largement et le rendement électrique passe de `22,2 %` à `80,0 %`.

## Tableau comparatif des valeurs usuelles (5 V et 12 V)

Les résistances ci-dessous correspondent à la valeur normalisée supérieure (séries E12/E24) et incluent la puissance dissipée sous `12 V`.

| Couleur / Type de LED | `Vf` typique | `If` nominal | Résistance sous 5 V | Résistance sous 12 V | Dissipation sous 12 V | Boîtier conseillé (12 V) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Rouge (~630 nm) | `2,0 V` | `20 mA` | `150 Ω` | `510 Ω` | `196 mW` | `0,5 W` (1/2 W) |
| Jaune / Ambre (~590 nm) | `2,1 V` | `20 mA` | `150 Ω` | `510 Ω` | `192 mW` | `0,5 W` (1/2 W) |
| Vert classique (~565 nm) | `2,2 V` | `20 mA` | `150 Ω` | `510 Ω` | `188 mW` | `0,5 W` (1/2 W) |
| Bleu ou Blanc (InGaN) | `3,2 V` | `20 mA` | `91 Ω` ou `100 Ω` | `470 Ω` | `165 mW` | `0,5 W` (1/2 W) |
| Infrarouge (~940 nm) | `1,3 V` | `20 mA` | `200 Ω` | `560 Ω` | `204 mW` | `0,5 W` (1/2 W) |
| Témoin basse conso | `1,8 V` | `5 mA` | `680 Ω` | `2,2 kΩ` | `47 mW` | `0,25 W` (1/4 W) |

## Erreurs courantes et précautions de montage

Ne reliez jamais plusieurs LED en parallèle derrière une seule résistance commune. À cause des dispersions de fabrication et du coefficient de température négatif des semi-conducteurs, la diode ayant le `Vf` le plus bas absorbe davantage de courant, s'échauffe, abaisse encore son seuil et finit par claquer, surchargeant immédiatement les autres branches. Chaque branche parallèle exige sa propre résistance.

Dimensionnez toujours `R` avec la tension maximale réelle de la source (`Vs_max`). Un circuit automobile dit « 12 V » atteint `14,4 V` moteur en marche, et un accumulateur Li-ion varie de `3,0 V` à `4,2 V`. Enfin, sur microcontrôleur, respectez la limite par broche (`20 mA` sur Arduino Uno en 5 V, souvent `4 mA` à `12 mA` sur ESP32 en 3,3 V) : pour un simple voyant moderne, `5 mA` suffisent généralement.
