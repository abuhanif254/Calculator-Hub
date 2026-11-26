---
title: "La Loi d'Ohm Expliquée : La Base de l'Électronique"
description: "Maîtrisez la Loi d'Ohm (U = R × I / V = IR). Comprenez la tension, le courant et la résistance, calculez la puissance dissipée et utilisez notre Calculatrice de la Loi d'Ohm."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "ohms-law-calculator"
relatedType: "calculator"
faqs:
  - question: "Pourquoi utilise-t-on parfois U et parfois V pour noter la tension dans la loi d'Ohm ?"
    answer: "En France et selon la norme internationale CEI 60027, la grandeur tension électrique se note U (du latin urgeo, pousser), tandis que son unité, le volt, se note V : on écrit donc U = R × I. Dans la littérature anglo-saxonne et sur la majorité des logiciels de simulation, la grandeur et l'unité portent la même lettre V, d'où la forme V = I × R. Les deux écritures désignent exactement la même loi physique."
  - question: "La loi d'Ohm s'applique-t-elle à tous les composants électroniques ?"
    answer: "Non. Elle ne s'applique strictement qu'aux dipôles dits ohmiques ou linéaires (résistances fixes, conducteurs métalliques à température constante), dont le rapport U / I reste constant. Les diodes, LED, transistors, varistances et lampes à incandescence sont non linéaires : la loi d'Ohm permet toutefois de calculer leur résistance statique à un point de fonctionnement précis."
  - question: "Comment la loi d'Ohm se combine-t-elle avec la formule de la puissance électrique ?"
    answer: "En remplaçant U ou I dans la relation de puissance P = U × I (en courant continu), on obtient deux formes dérivées essentielles : P = R × I² et P = U² / R. Ces formules permettent de vérifier qu'une résistance ou un câble ne dépassera pas sa puissance thermique maximale admissible."
  - question: "Que se passe-t-il physiquement lors d'un court-circuit selon la loi d'Ohm ?"
    answer: "Un court-circuit met deux points de potentiels différents en contact via une résistance quasi nulle (souvent quelques milliohms). D'après I = U / R, le courant augmente brutalement jusqu'à la limite maximale que peut fournir la source (courant de court-circuit), générant une chaleur instantanée proportionnelle à R × I² capable de faire fondre l'isolant et de provoquer un incendie."
  - question: "La loi d'Ohm reste-t-elle valable en courant alternatif (AC) ?"
    answer: "Pour une charge purement résistive (radiateur, grille-pain, résistance bobinée sans inductance), la loi d'Ohm s'applique directement aux valeurs efficaces : U_eff = R × I_eff. Dès qu'un circuit alternatif comporte des bobines ou des condensateurs, il faut remplacer la résistance R par l'impédance complexe Z, qui dépend de la fréquence du signal."
---

Énoncée en 1827 par Georg Simon Ohm, la **loi d'Ohm** établit la proportionnalité entre la tension aux bornes d'un conducteur ohmique, l'intensité du courant qui le traverse et sa résistance électrique. Elle constitue l'outil de base pour dimensionner un circuit, choisir une protection ou diagnostiquer une panne avec notre [Calculatrice de la Loi d'Ohm](/fr/calculatrices/calculateur-loi-d-ohm).

Sous sa forme canonique, la loi s'écrit `U = R × I` (également notée `V = I × R` en notation anglo-saxonne). En connaissant deux grandeurs parmi la tension, le courant, la résistance ou la puissance dissipée, vous déterminez immédiatement les deux autres grandeurs d'un circuit en courant continu.

## Principes physiques et formules fondamentales

L'analogie hydraulique permet de visualiser immédiatement le comportement d'un circuit : la **tension** correspond à la pression d'eau dans un réservoir, le **courant** au débit en litres par seconde, et la **résistance** au rétrécissement du tuyau qui freine l'écoulement. Augmenter la pression ou réduire le frein accroît mécaniquement le débit.

En associant la loi d'Ohm à la loi de Joule sur la puissance thermique, on obtient l'ensemble complet des relations en régime continu :

```text
Tension (volts, V)     : U = R × I   |   U = P / I   |   U = √(P × R)
Courant (ampères, A)   : I = U / R   |   I = P / U   |   I = √(P / R)
Résistance (ohms, Ω)   : R = U / I   |   R = U² / P  |   R = P / I²
Puissance (watts, W)   : P = U × I   |   P = R × I²  |   P = U² / R
```

Chaque grandeur obéit aux définitions du Système international (SI) :

- **Tension (`U` ou `V`) :** différence de potentiel électrique entre deux points, en **volts (V)** (`1 V = 1 J/C`).
- **Intensité (`I`) :** débit de charges électriques par seconde, en **ampères (A)** (`1 A = 1 C/s`).
- **Résistance (`R`) :** opposition du dipôle au passage du courant, en **ohms (Ω)**. Un dipôle vaut `1 Ω` lorsqu'une tension de `1 V` y fait circuler `1 A`.
- **Puissance (`P`) :** énergie électrique convertie en chaleur ou travail utile par seconde, en **watts (W)**.

## Exemple pratique détaillé : protéger une LED sur un bus 12 V

L'application la plus fréquente en électronique consiste à calculer la résistance de limitation d'une LED. Sans résistance en série, une LED branchée sur `12 V` laisserait passer un courant destructeur. Considérons une LED blanche alimentée sur un bus continu stabilisé :

- Tension d'alimentation : `U_alim = 12,0 V`
- Tension directe nominale de la LED : `U_LED = 3,2 V`
- Courant souhaité : `I = 20 mA = 0,020 A`

**Étape 1 — Tension aux bornes de la résistance :**
La résistance doit absorber la différence de potentiel restante :
`U_R = U_alim − U_LED = 12,0 − 3,2 = 8,8 V`

**Étape 2 — Valeur théorique par la loi d'Ohm :**
`R = U_R / I = 8,8 / 0,020 = 440 Ω`

**Étape 3 — Valeur normalisée (série E24) et courant réel :**
On retient la valeur standard immédiatement supérieure pour protéger la LED, soit `R_norm = 470 Ω`. Le courant réel devient :
`I_reel = 8,8 / 470 ≈ 0,01872 A` (`18,7 mA`).

**Étape 4 — Puissance thermique dissipée :**
`P_R = U_R × I_reel = 8,8 × 0,01872 ≈ 0,165 W` (`165 mW`).
Bien qu'une résistance de `0,25 W` suffise théoriquement, un déclassement thermique de 50 % recommande un modèle `0,5 W` en boîtier fermé.

## Tableau comparatif de scénarios électriques courants

Ce tableau relie tension, courant, résistance équivalente et puissance dissipée sur six cas représentatifs, de l'électronique basse consommation aux circuits domestiques.

| Application type | Tension (`U`) | Courant (`I`) | Résistance (`R`) | Puissance (`P`) | Point de vigilance |
| :--- | :---: | :---: | :---: | :---: | :--- |
| Capteur IoT sur pile bouton | `3,0 V` | `3 mA` | `1 000 Ω` | `9 mW` | Autonomie et courants de fuite |
| Circuit logique + LED témoin | `5,0 V` | `20 mA` | `250 Ω` | `100 mW` | Stabilité du régulateur `5 V` |
| Bandeau LED 12 V DC | `12,0 V` | `2,5 A` | `4,8 Ω` | `30 W` | Chute de tension sur câble fin |
| Électrovanne industrielle | `24,0 V` | `4,0 A` | `6,0 Ω` | `96 W` | Échauffement continu et fusible |
| Chargeur vélo / bus télécom | `48,0 V` | `10,0 A` | `4,8 Ω` | `480 W` | Section de cuivre et connectique |
| Radiateur électrique 230 V | `230 V` | `8,0 A` | `28,75 Ω` | `1 840 W` | Calibre disjoncteur NF C 15-100 |

## Erreurs fréquentes et limites de validité

Appliquer la loi d'Ohm sans discernement conduit à des erreurs classiques de conception ou de diagnostic :

- **Confondre les préfixes d'unités :** injecter des milliampères (`mA`) ou des kilohms (`kΩ`) sans conversion préalable fausse le résultat d'un facteur `1 000`. Convertissez systématiquement en volts, ampères et ohms avant le calcul.
- **Oublier la résistance interne et les câbles :** en `12 V` ou `24 V`, la résistance des conducteurs génère une chute de tension (`ΔU = R_fil × I`) qui réduit sensiblement la tension utile en bout de ligne.
- **Négliger la dérive thermique :** la résistivité des métaux augmente avec la température. Le filament d'une ampoule halogène à froid présente une résistance 10 à 15 fois plus faible qu'à chaud, provoquant un fort appel de courant à l'allumage.
- **Extrapoler aux charges non ohmiques :** sur un moteur, un transformateur ou une diode, le rapport `U / I` varie selon la charge, la fréquence ou la force contre-électromotrice ; en alternatif réactif, on remplace `R` par l'impédance `Z`.

Pour approfondir chaque grandeur individuellement, utilisez nos outils dédiés à la [tension électrique](/fr/calculatrices/calculateur-de-tension), à l'[intensité du courant](/fr/calculatrices/calculateur-de-courant) et au calcul de [résistance](/fr/calculatrices/calculateur-de-resistance).
