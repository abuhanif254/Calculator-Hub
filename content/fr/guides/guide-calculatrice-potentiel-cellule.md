---
title: "Calculatrice de Potentiel de Cellule : Réactions Spontanées"
description: "Apprenez à calculer le potentiel standard d'une cellule électrochimique et à prédire si une réaction redox se produira spontanément."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "cell-potential-calculator"
relatedType: "calculator"
faqs:
  - question: "Pourquoi ne multiplie-t-on jamais le potentiel standard E° par les coefficients stœchiométriques de l'équation ?"
    answer: "Le potentiel électrique E° (en volts, soit des joules par coulomb) est une grandeur intensive, au même titre que la température ou la masse volumique. Doubler la quantité de matière double l'enthalpie libre ΔG° et le nombre d'électrons n, mais le rapport ΔG° / (−n × F) reste strictement identique."
  - question: "Que signifie un potentiel de cellule standard E°cellule négatif ?"
    answer: "Un E°cellule négatif correspond à une enthalpie libre standard positive (ΔG° > 0) dans les conditions standard. Cela indique que la réaction ne peut pas se produire spontanément dans le sens écrit : elle est non spontanée et nécessite un apport continu d'énergie électrique extérieure (électrolyse), tandis que la réaction inverse est spontanée."
  - question: "Quelle est la différence entre E°cellule et le potentiel réel calculé par l'équation de Nernst ?"
    answer: "Le potentiel standard E°cellule suppose des conditions idéales : température de 298,15 K (25 °C), concentrations de 1 mol/L pour tous les solutés et pression de 1 bar pour les gaz. Dès que les concentrations s'écartent de 1 mol/L ou que la pile se décharge, le potentiel réel Ecellule évolue selon l'équation de Nernst : E = E° − (R × T / (n × F)) × ln(Q)."
  - question: "Quel est le rôle de l'électrode standard à hydrogène (ESH) dans l'échelle des potentiels ?"
    answer: "Il est physiquement impossible de mesurer le potentiel absolu d'une seule demi-cellule isolée ; seule une différence de potentiel entre deux électrodes est mesurable. Par convention internationale (IUPAC), on attribue arbitrairement la valeur exacte E° = 0,00 V à l'électrode standard à hydrogène (couple H⁺/H₂ à 1 mol/L et 1 bar) afin d'étalonner tous les autres couples redox."
  - question: "Pourquoi le pont salin est-il indispensable au fonctionnement d'une pile galvanique ?"
    answer: "Sans pont salin, l'accumulation de cations à l'anode et la disparition de cations à la cathode créeraient instantanément une charge électrique nette opposée au mouvement des électrons, bloquant la réaction en une fraction de seconde. Le pont salin assure la neutralité électrique de chaque compartiment par migration d'ions inertes (tels que K⁺ et NO₃⁻) tout en empêchant le mélange direct des réactifs."
---

Le **potentiel standard de cellule** (`E°cellule`, en volts `V`) mesure la force électromotrice maximale d'une cellule électrochimique dans les conditions standard (`25 °C`, concentrations de `1 mol/L`, pression de `1 bar`). Cette grandeur intensive prédit immédiatement si une réaction d'oxydoréduction est spontanée (pile galvanique, `E°cellule > 0`) ou si elle requiert une source électrique externe (électrolyse, `E°cellule < 0`).

Pour calculer la tension d'un couple redox et vérifier la spontanéité d'une réaction, utilisez notre [Calculatrice de Potentiel de Cellule](/fr/calculatrices/calculateur-de-potentiel-de-pile). En saisissant les potentiels standard de réduction de la cathode et de l'anode, l'outil détermine `E°cellule`, l'enthalpie libre standard et le sens naturel du transfert d'électrons.

## Fondements électrochimiques : potentiels standard et équation de Nernst

Par convention IUPAC, les tables ne fournissent que des **potentiels standard de réduction (`E°`)**, mesurant l'affinité d'une espèce oxydée pour les électrons. Dans toute cellule, une **réduction** se produit à la **cathode** (gain d'électrons) et une **oxydation** à l'**anode** (perte d'électrons).

Le potentiel standard de cellule vaut la différence entre les deux potentiels de réduction :

```text
Potentiel standard de cellule : E°cellule = E°cathode − E°anode
Lien thermodynamique          : ΔG° = −n × F × E°cellule
Équation de Nernst (générale) : E_cellule = E°cellule − [(R × T) / (n × F)] × ln(Q)
Équation de Nernst à 25 °C    : E_cellule = E°cellule − (0,05916 / n) × log₁₀(Q)
```

Ici, `n` est le nombre de moles d'électrons échangés dans l'équation bilan, `F = 96 485 C/mol` la constante de Faraday, `R = 8,3145 J/(mol·K)` la constante des gaz parfaits, `T` la température en kelvins et `Q` le quotient réactionnel (excluant les solides purs et le solvant). Une réaction est **spontanée** lorsque `ΔG° < 0`, soit `E°cellule > 0` en conditions standard (`E_cellule > 0` en conditions réelles).

## Exemple numérique pas à pas : pile Daniell (Zn/Cu) hors conditions standard

Analysons une pile Daniell associant une électrode de zinc dans `Zn²⁺` et une électrode de cuivre dans `Cu²⁺`, reliées par un pont salin. À `25 °C` (`298,15 K`), les potentiels standard valent :

- Cathode (réduction) : `Cu²⁺(aq) + 2 e⁻ → Cu(s)` avec `E°(Cu²⁺/Cu) = +0,34 V`
- Anode (oxydation) : `Zn²⁺(aq) + 2 e⁻ → Zn(s)` avec `E°(Zn²⁺/Zn) = −0,76 V`

### Étape 1 : Calculer `E°cellule` et `ΔG°` standard

Le couple de potentiel le plus élevé (`+0,34 V`) est réduit à la cathode tandis que le zinc (`−0,76 V`) s'oxyde à l'anode :

```text
Bilan     : Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s)   (n = 2)
E°cellule = +0,34 − (−0,76) = +1,10 V
ΔG°       = −2 × 96 485 × 1,10 = −212 267 J/mol ≈ −212,3 kJ/mol
```

Avec `E°cellule = +1,10 V > 0`, la pile fonctionne spontanément.

### Étape 2 : Correction de concentration par l'équation de Nernst

Supposons maintenant des concentrations non standard à `25 °C` : `[Cu²⁺] = 1,50 mol/L` et `[Zn²⁺] = 0,015 mol/L`. Les solides purs ayant une activité de `1`, le quotient réactionnel vaut :

```text
Q = [Zn²⁺] / [Cu²⁺] = 0,015 / 1,50 = 0,010 = 10⁻²
```

Appliquons la loi de Nernst à `25 °C` (`n = 2`) :

```text
E_cellule = 1,10 − (0,05916 / 2) × log₁₀(10⁻²)
E_cellule = 1,10 − 0,02958 × (−2) = +1,159 V ≈ +1,16 V
```

L'excès de `Cu²⁺` et la dilution de `Zn²⁺` accroissent la force électromotrice de `+59 mV`.

## Tableau de référence des couples redox et potentiels standard (`25 °C`)

| Couple redox | Demi-réaction de réduction | `E°` (`V` vs ESH) | Pouvoir chimique | Rôle face à `Cu²⁺/Cu` | Application majeure |
|---|---|---|---|---|---|
| `Li⁺ / Li` | `Li⁺ + e⁻ → Li(s)` | `−3,04 V` | Réducteur très fort | Anode (`ΔE° = 3,38 V`) | Batteries lithium-ion |
| `Zn²⁺ / Zn` | `Zn²⁺ + 2 e⁻ → Zn(s)` | `−0,76 V` | Réducteur fort | Anode (`ΔE° = 1,10 V`) | Piles alcalines, galvanisation |
| `Fe²⁺ / Fe` | `Fe²⁺ + 2 e⁻ → Fe(s)` | `−0,44 V` | Réducteur modéré | Anode (`ΔE° = 0,78 V`) | Corrosion des aciers |
| `H⁺ / H₂` | `2 H⁺ + 2 e⁻ → H₂(g)` | `0,00 V` | Référence ESH | Anode (`ΔE° = 0,34 V`) | Étalonnage universel |
| `Cu²⁺ / Cu` | `Cu²⁺ + 2 e⁻ → Cu(s)` | `+0,34 V` | Oxydant faible | Référence | Électroraffinage, piles Daniell |
| `Ag⁺ / Ag` | `Ag⁺ + e⁻ → Ag(s)` | `+0,80 V` | Oxydant modéré | Cathode (`ΔE° = 0,46 V`) | Électrodes `Ag/AgCl` |
| `Cl₂ / Cl⁻` | `Cl₂(g) + 2 e⁻ → 2 Cl⁻` | `+1,36 V` | Oxydant puissant | Cathode (`ΔE° = 1,02 V`) | Procédé chlore-alcali |

## Applications industrielles, erreurs fréquentes et limites expérimentales

### Protection cathodique, stockage d'énergie et capteurs

La classification des potentiels standard fonde la **protection cathodique par anode sacrificielle** : des blocs de zinc (`−0,76 V`) ou de magnésium (`−2,37 V`) fixés sur une coque en acier (`−0,44 V`) ou une conduite enterrée s'oxydent préférentiellement et protègent le fer. Le même principe régit la tension nominale des accumulateurs (plomb-acide `2,0 V`, lithium-ion `3,2–3,7 V`) et les sondes potentiométriques (pH-mètres).

### Erreurs fréquentes et limites expérimentales

1. **Changer le signe avant soustraction :** la formule `E°cathode − E°anode` exige les valeurs brutes des tables de réduction sans inversion manuelle de signe.
2. **Multiplier `E°` par les coefficients :** multiplier `Ag⁺ + e⁻ → Ag` par `2` pour équilibrer les électrons ne modifie jamais son potentiel (`+0,80 V`).
3. **Confondre thermodynamique et cinétique :** un `E°cellule > 0` ne garantit pas une réaction rapide. L'aluminium (`−1,66 V`) résiste à l'eau grâce à une couche passivante d'alumine (`Al₂O₃`).
4. **Négliger résistance interne et surtension :** en fonctionnement réel sous courant `I`, la tension utile chute (`U = E_cellule − r × I − η`), alors qu'une électrolyse nécessite une tension supérieure à `|E_cellule|`.
