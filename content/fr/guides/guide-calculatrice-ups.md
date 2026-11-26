---
title: "Calculatrice Onduleur (UPS) : Choisir sa Batterie de Secours"
description: "Dimensionnez votre onduleur (ASI/UPS) avec précision : conversion Watts et Volt-Ampères (VA), facteur de puissance, marge de sécurité, calcul d'autonomie batterie et topologies."
category: "Productivity & Utilities"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "ups-calculator"
faqs:
  - question: "Quelle est la différence entre les Watts (W) et les Volt-Ampères (VA) sur un onduleur ?"
    answer: "Les Watts (W) mesurent la puissance active réellement consommée par vos appareils, tandis que les Volt-Ampères (VA) représentent la puissance apparente appelée sur le circuit électrique. Leur rapport définit le facteur de puissance (FP = W / VA), généralement compris entre 0,6 et 0,9 sur les alimentations informatiques. Vous ne devez jamais dépasser ni la limite en W ni la limite en VA de l'onduleur."
  - question: "Pourquoi faut-il ajouter une marge de sécurité de 20 à 25 % lors du choix d'un UPS ?"
    answer: "Faire fonctionner un onduleur à 100 % de sa capacité nominale provoque un échauffement excessif de l'onduleur électronique, réduit fortement l'autonomie utile par effet Peukert et ne laisse aucune réserve lors des pics d'appel de courant au démarrage (inrush current). Une marge de 20 à 25 % prolonge aussi la durée de vie des batteries."
  - question: "Un onduleur à onde sinusoïdale simulée convient-il à un PC récent avec alimentation PFC active ?"
    answer: "Pas toujours. De nombreuses alimentations à correction active du facteur de puissance (Active PFC), notamment sur les stations de travail, serveurs et PC gaming, peuvent décrocher ou émettre un bourdonnement lors du basculement sur batterie avec une onde sinusoïdale approchée (en escalier). Pour ce matériel, privilégiez un modèle Line-Interactive ou On-Line à onde sinusoïdale pure."
  - question: "Puis-je brancher une imprimante laser ou un radiateur d'appoint sur les prises secourues par batterie ?"
    answer: "Non. Le four de fusion d'une imprimante laser génère des appels de courant instantanés pouvant dépasser 1 200 à 1 500 W, ce qui déclenche immédiatement la mise en sécurité par surcharge de la batterie. Branchez ces périphériques uniquement sur les prises parafoudre (non secourues) si l'onduleur en possède."
  - question: "Quelle est la durée de vie moyenne des batteries d'un onduleur et comment la préserver ?"
    answer: "Les batteries étanches au plomb-acide (VRLA) durent en moyenne 3 à 5 ans à une température ambiante de 20 °C, mais chaque hausse de 10 °C au-dessus de ce seuil divise environ par deux leur longévité chimique. Les modèles équipés de batteries lithium-fer-phosphate (LiFePO4) atteignent 8 à 10 ans et supportent beaucoup plus de cycles de décharge."
---

Un **onduleur** — ou alimentation sans interruption (**ASI** / **UPS**) — protège vos équipements informatiques contre les coupures franches, microcoupures, baisses de tension et surtensions. Lors d'une panne secteur, il transfère la charge sur batterie en quelques millisecondes, offrant le délai nécessaire pour sauvegarder vos données et éteindre vos systèmes proprement.

Un dimensionnement fiable consiste à additionner la puissance active totale (`W`), la convertir en puissance apparente (`VA`) selon le facteur de puissance, puis appliquer une marge de sécurité de `20 %` à `25 %`. Notre [Calculatrice Onduleur](/fr/calculatrices/calculateur-d-onduleur) automatise ces vérifications et estime votre autonomie sur batterie.

## Grandeurs électriques et formules de dimensionnement

Trois grandeurs gouvernent le choix d'un onduleur : la puissance active `P` (watts, `W`), la puissance apparente `S` (volt-ampères, `VA`) et le facteur de puissance `FP` (`cos φ`, compris entre `0` et `1`). En courant alternatif, les alimentations à découpage créent un déphasage et des harmoniques qui rendent `S` toujours supérieur ou égal à `P`.

```text
Puissance apparente requise : S (VA) = P (W) / FP
Puissance cible avec marge  : P_cible = P_totale × (1 + Marge)
Calibre apparent cible      : S_cible = S_totale × (1 + Marge)
Énergie utile batterie (Wh) : E_utile = N_bat × V_bat × C_bat (Ah) × DoD × η
Autonomie linéaire estimée  : t (min) = (E_utile / P_totale) × 60
```

Ici, `N_bat` représente le nombre de batteries internes, `V_bat` leur tension (`12 V`), `C_bat` leur capacité (`Ah`), `DoD` la profondeur de décharge utile (`0,80`) et `η` le rendement de conversion (`0,85` à `0,90`).

### Double contrainte et effet Peukert

Chaque modèle affiche deux plafonds (ex. `1 500 VA / 900 W`) qu'il ne faut **jamais dépasser simultanément**. Par ailleurs, selon la loi de Peukert sur les batteries au plomb VRLA, plus le courant tiré augmente, plus la capacité chimique disponible diminue : doubler la charge réduit l'autonomie de `55 %` à `65 %` plutôt que de moitié.

## Exemple chiffré : poste de travail et serveur NAS

Évaluons le besoin d'un bureau technique comprenant quatre équipements critiques :

1. **Station de travail :** `350 W` en charge soutenue (alimentation à PFC actif, `FP ≈ 0,95`).
2. **Deux écrans 27 pouces :** `2 × 35 W = 70 W`.
3. **Serveur NAS 4 baies :** `45 W`.
4. **Boîtier fibre (ONT) et routeur :** `25 W`.

Totalisons d'abord les puissances actives, puis appliquons une marge de `25 %` (`× 1,25`) :

```text
P_totale = 350 + 70 + 45 + 25 = 490 W
P_cible  = 490 × 1,25 = 612,5 W
```

Avec un facteur de puissance moyen pondéré de `0,85`, la puissance apparente atteint `490 / 0,85 = 576,5 VA`, soit `720,6 VA` avec marge. Un onduleur d'entrée de gamme `1 000 VA / 600 W` (`FP` interne de `0,60`) est donc légèrement insuffisant face aux `612,5 W` cibles.

Un modèle `1 500 VA / 900 W` doté de deux batteries `12 V / 9 Ah` (`216 Wh` nominaux) offre une énergie utile de `216 × 0,80 × 0,85 = 146,88 Wh`. L'estimation linéaire donne `(146,88 / 490) × 60 = 18,0 minutes`, soit `10` à `12 minutes` réelles après effet Peukert : suffisant pour déclencher un arrêt automatisé via USB (`NUT` ou `apcupsd`).

## Comparatif des profils de charge et calibres recommandés

| Profil d'installation | Charge (`W`) | Cible (`+25 %`) | Calibre conseillé (`VA / W`) | Topologie adaptée | Autonomie typique |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Box fibre et ONT | `30 W` | `38 W` | `400 VA / 240 W` | Off-Line (VFD) | `45`–`90 min` |
| PC bureautique et 1 écran | `180 W` | `225 W` | `650 VA / 390 W` | Off-Line / Line-Interactive | `12`–`18 min` |
| Station de travail et NAS | `490 W` | `613 W` | `1 500 VA / 900 W` | Line-Interactive sinus pur | `10`–`12 min` |
| PC gaming haut de gamme | `750 W` | `938 W` | `2 000 VA / 1 200 W` | Line-Interactive sinus pur | `6`–`9 min` |
| Baie réseau PoE | `400 W` | `500 W` | `1 000 VA / 700 W` | Line-Interactive rack | `12`–`15 min` |
| Serveur PME et stockage | `1 200 W` | `1 500 W` | `2 200`–`3 000 VA / 2 000 W` | On-Line Double Conversion | `10`–`15 min` |

## Topologies d'onduleurs et erreurs à éviter

### Off-Line, Line-Interactive et On-Line (IEC 62040-3)

- **Off-Line (VFD) :** commute sur batterie en `6` à `12 ms` sans régulation de tension. Économique pour un routeur ou un poste bureautique simple.
- **Line-Interactive (VI) :** intègre un régulateur automatique (**AVR**) qui corrige les variations de tension sans user la batterie (`2` à `6 ms` de transfert). C'est la référence pour les postes de travail et NAS, idéalement en **onde sinusoïdale pure**.
- **On-Line Double Conversion (VFI) :** isole en permanence la charge via une double conversion AC/DC/AC avec temps de transfert nul (`0 ms`). Indispensable pour les serveurs critiques et réseaux perturbés.

### Pièges courants lors de l'achat

Évitez de dimensionner d'après la puissance nominale du bloc d'alimentation PC (par exemple `850 W`) alors que sa consommation réelle mesurée au wattmètre plafonne à `400 W` : vous surpaieriez l'appareil et ses batteries de rechange. Ne branchez jamais d'imprimante laser, de chauffage ou de moteur puissant sur les prises secourues sous peine de surcharge immédiate, et vérifiez la présence d'une onde sinusoïdale pure pour toute alimentation à PFC actif.
