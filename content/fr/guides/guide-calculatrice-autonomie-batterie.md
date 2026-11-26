---
title: "Autonomie d'une Batterie : Combien de Temps Va-t-elle Durer ?"
description: "Découvrez comment lire la capacité d'une batterie (mAh et Ah), calculer l'autonomie réelle et utiliser notre Calculatrice d'Autonomie de Batterie."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "battery-runtime-calculator"
faqs:
  - question: "Pourquoi faut-il convertir les mAh en watts-heures (Wh) pour comparer deux batteries ?"
    answer: "Les ampères-heures (Ah) ou milliampères-heures (mAh) ne mesurent qu'une quantité de charge électrique, sans tenir compte de la tension. Une batterie de 10 Ah sous 12 V stocke 120 Wh, soit plus de trois fois plus d'énergie qu'une batterie externe de 10 000 mAh sous 3,7 V (37 Wh)."
  - question: "Quelle est la profondeur de décharge (DoD) recommandée pour préserver une batterie ?"
    answer: "Une batterie au plomb-acide ou AGM ne doit pas être déchargée au-delà de 50 % de sa capacité nominale sous peine de sulfatation rapide et irréversible. Les batteries au lithium LiFePO4 supportent couramment 80 % à 90 % de profondeur de décharge tout en dépassant 3 000 à 4 000 cycles."
  - question: "Qu'est-ce que l'effet Peukert et quelles batteries sont concernées ?"
    answer: "Décrite par la loi de Peukert, la perte de capacité sous fort courant réduit fortement l'autonomie d'une batterie lorsque la décharge est rapide. Cet effet pénalise lourdement les batteries au plomb (exposant k de 1,15 à 1,30), mais reste quasi négligeable sur le lithium LiFePO4 (k ≈ 1,02)."
  - question: "Pourquoi ma batterie externe de 20 000 mAh ne recharge-t-elle pas cinq fois mon smartphone de 4 000 mAh ?"
    answer: "La capacité commerciale des batteries externes est exprimée à la tension interne des cellules lithium (3,7 V), soit 74 Wh. L'élévation de tension vers 5 V, 9 V ou 20 V pour la charge USB entraîne 12 % à 18 % de pertes thermiques dans les convertisseurs, ne restituant qu'environ 61 à 65 Wh utiles."
  - question: "Comment le froid influence-t-il l'autonomie calculée d'une batterie ?"
    answer: "Les basses températures ralentissent les réactions électrochimiques et augmentent la résistance interne. À 0 °C, une batterie au plomb ou lithium-ion peut perdre 20 % à 35 % de sa capacité exploitable instantanée, et une batterie LiFePO4 ne doit jamais être rechargée sous 0 °C sans système de préchauffage intégré."
---

Qu'il s'agisse d'équiper un van aménagé, de sécuriser un poste sur onduleur ou de choisir une batterie externe, la capacité inscrite sur l'étiquette ne reflète jamais directement l'énergie exploitable. Entre la limite de décharge tolérée par la chimie, les pertes de conversion et l'effet des forts courants, l'autonomie réelle s'écarte souvent du calcul naïf. Obtenez une estimation fiable en quelques secondes avec notre [Calculatrice d'Autonomie de Batterie](/fr/calculatrices/calculateur-d-autonomie-de-batterie).

Pour modéliser correctement la durée de fonctionnement, il faut d'abord convertir la capacité en watts-heures (`Wh`), appliquer le taux de **profondeur de décharge (`DoD`)**, intégrer le rendement du convertisseur (`η`), puis tenir compte de la loi de Peukert dès que l'intensité de décharge augmente.

## Capacité, énergie réelle et formules de calcul

Comparer uniquement des ampères-heures (`Ah`) ou des milliampères-heures (`mAh`) induit en erreur dès que les tensions diffèrent. Seule la multiplication par la tension nominale (`U_nom`) exprime la véritable réserve énergétique en **watts-heures (`Wh`)** :

```text
Énergie nominale :     E_nom (Wh) = C (Ah) × U_nom (V) = [C (mAh) / 1 000] × U_nom (V)
Énergie exploitable :  E_utile (Wh) = E_nom × DoD
Autonomie pratique :   T (heures) = (E_nom × DoD × η) / P_charge (W)
Correction Peukert :   T_réel = H × [C_nom / (I_réel × H)]^k
```

Trois paramètres pilotent l'autonomie réelle :

- **Profondeur de décharge (`DoD`) :** part d'énergie extractible sans endommager les cellules (`0,50` pour le plomb-acide/AGM ; `0,80` à `0,90` pour le lithium LiFePO4).
- **Rendement de conversion (`η`) :** un onduleur `12 V CC` vers `230 V CA` dissipe `10 %` à `15 %` en chaleur (`η = 0,85` à `0,90`), hors consommation à vide (`5 W` à `20 W`).
- **Exposant de Peukert (`k`) :** la capacité nominale des batteries au plomb est étalonnée sur `20 heures` (`H = 20 h`). Plus le courant tiré `I_réel` dépasse ce régime lent (`C / 20`), plus la capacité utilisable chute.

## Exemple chiffré : AGM Plomb vs Lithium LiFePO4

Supposons une charge continue de `P_charge = 120 W` alimentée via un onduleur `230 V` de rendement `η = 88 %` (`0,88`), avec deux batteries de même capacité nominale **`100 Ah`**.

### Scénario A : Batterie AGM Plomb-Acide 12 V / 100 Ah

1. **Énergie nominale :** `100 × 12,0 = 1 200 Wh`.
2. **Réserve avec `DoD = 50 %` :** `1 200 × 0,50 = 600 Wh` au régime lent (`5 A`).
3. **Courant côté batterie :** `I_réel = 120 / (12,0 × 0,88) = 11,36 A`.
4. **Pénalité Peukert (`k = 1,20`) :** le facteur `(5 / 11,36)^0,20` vaut `0,848`, ramenant l'énergie utile à `600 × 0,848 = 509 Wh`.
5. **Autonomie effective :** `T = (509 × 0,88) / 120 = 3,73 heures`, soit environ **3 h 44 min**.

### Scénario B : Batterie Lithium LiFePO4 12,8 V / 100 Ah

1. **Énergie nominale :** `100 × 12,8 = 1 280 Wh`.
2. **Réserve avec `DoD = 85 %` :** `1 280 × 0,85 = 1 088 Wh` (avec `k ≈ 1,02`, la perte Peukert est négligeable).
3. **Autonomie effective :** `T = (1 088 × 0,88) / 120 = 7,98 heures`, soit près de **8 h 00**.

À capacité nominale identique (`100 Ah`), la LiFePO4 offre donc plus du double d'autonomie tout en pesant environ deux fois moins (`~11 kg` contre `~28 kg`).

## Tableau comparatif des chimies de batteries

| Technologie | Tension (cellule / bloc) | `DoD` conseillée | Exposant `k` | Rendement cycle | Durée de vie | Usage idéal |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Plomb-acide ouvert | `2,0 V` / `12 V` | `50 %` | `1,20 – 1,30` | `~75 – 80 %` | `300 – 500 cycles` | Démarrage, secours ponctuel |
| Plomb AGM / Gel | `2,0 V` / `12 V` | `50 %` | `1,10 – 1,20` | `~80 – 85 %` | `400 – 700 cycles` | Onduleurs (ASI), petit solaire |
| Lithium-ion NMC | `3,6 – 3,7 V` / variable | `80 %` | `1,02 – 1,05` | `~92 – 95 %` | `800 – 1 200 cycles` | Outillage, vélos électriques |
| Lithium LiFePO4 (LFP) | `3,2 V` / `12,8 V` | `80 – 90 %` | `1,01 – 1,03` | `~95 – 98 %` | `3 000 – 6 000 cycles` | Van, solaire, station autonome |
| NiMH (AA / AAA) | `1,2 V` | `80 – 90 %` | `1,05 – 1,10` | `~70 – 75 %` | `500 – 1 000 cycles` | Petit appareillage domestique |
| Li-Po (batterie externe) | `3,7 V` (USB `5 – 20 V`) | `85 %` | `~1,02` | `~82 – 88 %` | `500 – 800 cycles` | Smartphones et portables |

## Pièges courants, température et sécurité

Trois pièges pratiques expliquent la majorité des écarts constatés sur le terrain par rapport aux estimations théoriques :

- **Le piège des batteries externes :** une capacité commerciale de `20 000 mAh` est toujours mesurée à la tension interne des cellules lithium, soit `3,7 V` (`74 Wh`). Après élévation et régulation vers `5 V`, `9 V` ou `20 V` en USB-C (`~15 %` de pertes thermiques), seuls `~63 Wh` arrivent réellement à votre appareil (`~12 600 mAh` utiles sous `5 V`).
- **La chute de tension dans les câbles et la consommation à vide :** à fort courant sous `12 V` (`> 50 A`), des câbles sous-dimensionnés ou des cosses mal serties créent une chute de tension qui déclenche prématurément la coupure basse tension (LVD) de l'onduleur alors que la batterie n'est pas vide. Pensez également à inclure la consommation permanente à vide de l'onduleur (`5 W` à `20 W`).
- **Le froid et la protection du BMS :** sous `0 °C`, la résistance interne augmente et ampute la capacité instantanée de `20 %` à `35 %`. Ne rechargez jamais une batterie LiFePO4 en dessous de `0 °C` sans dispositif de préchauffage piloté par son système de gestion de batterie (BMS), sous peine de provoquer un dépôt irréversible de lithium métallique.
