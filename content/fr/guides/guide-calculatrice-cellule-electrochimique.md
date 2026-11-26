---
title: "Calculatrice de Cellule Électrochimique : Les Piles Expliquées"
description: "Calculez la force électromotrice standard E°cellule d'une pile galvanique à partir des potentiels de réduction, identifiez anode et cathode et vérifiez la spontanéité."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "electrochemical-cell-calculator"
faqs:
  - question: "Faut-il inverser le signe du potentiel standard de l'anode dans la formule E°cellule = E°cathode − E°anode ?"
    answer: "Non. Le signe moins présent dans E°cellule = E°red(cathode) − E°red(anode) effectue déjà l'inversion nécessaire pour l'oxydation à l'anode. Vous devez saisir directement les deux potentiels standards de réduction tels qu'ils figurent dans les tables IUPAC : inverser le signe au préalable provoquerait une erreur de double négation."
  - question: "Doit-on multiplier E°red par les coefficients stœchiométriques lors de l'équilibrage des électrons ?"
    answer: "Jamais. Le potentiel standard d'électrode E° est une grandeur intensive (exprimée en joules par coulomb, J/C = V) qui ne dépend pas de la quantité de matière mise en jeu. Même si une demi-équation est multipliée par 2 ou 3 pour équilibrer les électrons, son E° reste rigoureusement identique."
  - question: "Quel est le rôle indispensable du pont salin dans une pile galvanique ?"
    answer: "Le pont salin (gel d'agar-agar imbibé de KNO₃ ou de KCl) ferme le circuit électrique en permettant la migration des ions entre les deux demi-piles : les anions migrent vers l'anode pour compenser l'apparition de cations, tandis que les cations migrent vers la cathode. Sans pont salin, l'accumulation de charges bloque la réaction en une fraction de seconde."
  - question: "Quelle est la différence entre une pile galvanique et une cellule d'électrolyse ?"
    answer: "Une pile galvanique (ou voltaïque) fonctionne de manière spontanée (E°cellule > 0, ΔG° < 0) et transforme l'énergie chimique en énergie électrique, avec une anode négative (−) et une cathode positive (+). À l'inverse, une cellule d'électrolyse force une réaction non spontanée (E°cellule < 0, ΔG° > 0) grâce à un générateur externe ; la cathode reste le siège de la réduction mais devient le pôle négatif (−)."
  - question: "Comment interpréter la notation conventionnelle d'une pile comme Zn(s) | Zn²⁺(aq) || Cu²⁺(aq) | Cu(s) ?"
    answer: "Par convention IUPAC, l'anode (oxydation) est toujours placée à gauche et la cathode (réduction) à droite. Une barre simple (|) symbolise une interface de phase entre un solide et une solution aqueuse, tandis que la double barre (||) représente le pont salin ou la membrane séparatrice."
---

Une **cellule électrochimique galvanique** (ou pile voltaïque) convertit directement l'énergie chimique d'une réaction d'oxydoréduction spontanée en énergie électrique. Pour exploiter le transfert d'électrons dans un circuit extérieur, l'oxydation et la réduction sont séparées en deux compartiments distincts : l'**anode** et la **cathode**, reliés par un fil conducteur et par un **pont salin**.

Notre [Calculatrice de Cellule Électrochimique](/fr/calculatrices/calculateur-de-pile-electrochimique) détermine la **force électromotrice standard (`E°_cellule`)** à partir des potentiels standards de réduction (`E°_red`) de la cathode et de l'anode, puis indique immédiatement si le couple forme une pile spontanée ou s'il exige une électrolyse.

## Potentiels standards, polarité et formule de la FEM

Chaque couple rédox possède un **potentiel standard de réduction (`E°_red`)** mesuré en volts (`V`) à `25 °C` (`1 mol/L`, `1 bar`), référencé par rapport à l'électrode standard à hydrogène (`ESH = 0,000 V`). Plus `E°_red` est élevé, plus l'oxydant attire les électrons.

On calcule la tension standard à vide en soustrayant le potentiel de réduction de l'anode de celui de la cathode :

```text
Force électromotrice standard : E°_cellule = E°_red(cathode) − E°_red(anode)
Énergie libre de Gibbs       : ΔG° = −n × F × E°_cellule
Critère de pile galvanique    : E°_cellule > 0  et  ΔG° < 0  (réaction spontanée)
Critère d'électrolyse         : E°_cellule < 0  et  ΔG° > 0  (apport externe requis)
```

### Rôles de l'anode, de la cathode et du pont salin

Quelle que soit la cellule, le nom de chaque électrode est fixé par la réaction chimique qui s'y produit :

- **Anode (oxydation) :** l'espèce cède des électrons (`Réducteur → Oxydant + n e⁻`). Dans une pile spontanée, l'anode possède le plus faible `E°_red` et constitue le **pôle négatif (`−`)**.
- **Cathode (réduction) :** l'espèce capte les électrons (`Oxydant + n e⁻ → Réducteur`). Dans une pile spontanée, elle possède le plus fort `E°_red` et forme le **pôle positif (`+`)**.
- **Pont salin :** ce gel conducteur (`KNO₃` ou `KCl`) assure l'électroneutralité des solutions en faisant migrer les anions vers l'anode et les cations vers la cathode.

En notation IUPAC, l'anode figure toujours à gauche et la cathode à droite : `Anode | Espèce oxydée || Espèce à réduire | Cathode`.

## Exemple numérique complet : pile Aluminium–Argent (Al / Ag)

Construisons une pile associant une électrode d'aluminium dans `Al³⁺` (`1 mol/L`) et une électrode d'argent dans `Ag⁺` (`1 mol/L`) à `25 °C`.

1. **Potentiels standards de réduction (`E°_red`) :** `Ag⁺(aq) + e⁻ → Ag(s)` vaut `+0,800 V` ; `Al³⁺(aq) + 3 e⁻ → Al(s)` vaut `−1,662 V`.
2. **Identification des électrodes :** comme `+0,800 V > −1,662 V`, l'argent est la **cathode (`+`)** (réduction) et l'aluminium devient l'**anode (`−`)** (oxydation : `Al → Al³⁺ + 3 e⁻`).
3. **Équilibrage des électrons (`n = 3`) :** l'équation bilan s'écrit `Al(s) + 3 Ag⁺(aq) → Al³⁺(aq) + 3 Ag(s)`.
4. **Calcul de `E°_cellule` :** on ne multiplie **jamais** `+0,800 V` par `3`. On obtient `E°_cellule = +0,800 − (−1,662) = +2,462 V`.
5. **Vérification via `ΔG°` :** avec `n = 3` et `F = 96 485 C/mol`, `ΔG° = −3 × 96 485 × 2,462 ≈ −712,6 kJ/mol` (`< 0`, réaction fortement spontanée). Sa notation est `Al(s) | Al³⁺(aq) || Ag⁺(aq) | Ag(s)`.

## Tableau comparatif des couples rédox et systèmes électrochimiques

Ce tableau rapproche des piles pédagogiques et des systèmes industriels courants pour comparer leurs réactions aux électrodes et leurs tensions caractéristiques :

| Système électrochimique | Anode (oxydation) | Cathode (réduction) | E°_cellule / Tension | Application |
| :--- | :--- | :--- | :--- | :--- |
| Pile Daniell (`Zn / Cu`) | `Zn → Zn²⁺ + 2 e⁻` | `Cu²⁺ + 2 e⁻ → Cu` | `+1,104 V` | Cellule galvanique de référence |
| Pile `Al / Ag` | `Al → Al³⁺ + 3 e⁻` | `Ag⁺ + e⁻ → Ag` | `+2,462 V` | Pile académique haute tension |
| Pile alcaline (`Zn / MnO₂`) | `Zn + 2 OH⁻ → ZnO + H₂O + 2 e⁻` | `2 MnO₂ + H₂O + 2 e⁻ → Mn₂O₃ + 2 OH⁻` | `+1,50 V` | Pile primaire grand public |
| Pile bouton argent (`Zn / Ag₂O`) | `Zn + 2 OH⁻ → ZnO + H₂O + 2 e⁻` | `Ag₂O + H₂O + 2 e⁻ → 2 Ag + 2 OH⁻` | `+1,55 V` | Horlogerie et prothèses auditives |
| Batterie au plomb (`Pb / PbO₂`) | `Pb + HSO₄⁻ → PbSO₄ + H⁺ + 2 e⁻` | `PbO₂ + HSO₄⁻ + 3 H⁺ + 2 e⁻ → PbSO₄ + 2 H₂O` | `+2,05 V` / cellule | Batterie automobile (`12 V` = 6 cellules) |
| Électrolyse de l'eau | `2 H₂O → O₂ + 4 H⁺ + 4 e⁻` | `2 H⁺ + 2 e⁻ → H₂` | `−1,229 V` | Production non spontanée de `H₂` |

## Applications pratiques, pièges de calcul et limites réelles

Le calcul de `E°_cellule` oriente la conception des batteries, des piles à combustible (`H₂/O₂` à `+1,23 V` théorique) et la **protection cathodique contre la corrosion**. Fixer une anode sacrificielle en magnésium (`E° = −2,37 V`) ou en zinc (`E° = −0,76 V`) sur une coque en acier (`Fe²⁺/Fe = −0,44 V`) force l'oxydation de l'anode sacrificielle et préserve l'acier.

### Erreurs fréquentes et écarts en conditions réelles

Deux erreurs dominent les calculs de piles :

1. **Double inversion de signe :** si vous inversez déjà `E°_red(anode)` en potentiel d'oxydation, il faut additionner et non soustraire. Avec `E°_cathode − E°_anode`, utilisez toujours les `E°_red` bruts des tables.
2. **Multiplication par la stœchiométrie :** multiplier `+0,800 V` par `3` dans la pile `Al / Ag` est physiquement faux, car la tension est une grandeur intensive (`J/C`).

Enfin, `E°_cellule` suppose `25 °C`, `1 mol/L` et un courant nul. Hors conditions standards, la tension suit l'**équation de Nernst**, et en charge (`I > 0`), elle chute selon `U = E_cellule − r × I − η` sous l'effet de la résistance interne `r` et des surtensions cinétiques `η`.
