---
title: "Calculatrice d'Électrolyse : L'Électricité au Service de la Chimie"
description: "Maîtrisez les lois de Faraday de l'électrolyse : formules de masse déposée, intensité et charge électrique, exemple chiffré de cuivrage, rendements faradiques et tableau comparatif des métaux."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "electrolysis-calculator"
relatedType: "calculator"
faqs:
  - question: "Quelle est la différence fondamentale entre une cellule électrolytique et une pile galvanique ?"
    answer: "Une pile galvanique convertit une réaction d'oxydoréduction spontanée (ΔG < 0) en courant électrique : l'anode est le pôle négatif et la cathode le pôle positif. À l'inverse, une cellule électrolytique utilise une source de tension continue externe pour forcer une réaction thermodynamiquement défavorable (ΔG > 0) : l'oxydation a toujours lieu à l'anode (devenue pôle positif) et la réduction à la cathode (devenue pôle négatif)."
  - question: "Pourquoi la constante de Faraday vaut-elle 96 485 C/mol et comment l'utiliser dans les calculs ?"
    answer: "La constante de Faraday F représente la charge électrique portée par une mole d'électrons. Elle résulte du produit de la charge élémentaire e (1,602 176 634 × 10⁻¹⁹ C) par le nombre d'Avogadro N_A (6,022 140 76 × 10²³ mol⁻¹), soit exactement 96 485,332 C/mol. En pratique industrielle et académique, la valeur arrondie 96 485 C/mol garantit une précision supérieure à 0,001 %."
  - question: "Que faire lorsque le rendement faradique (rendement en courant) est inférieur à 100 % ?"
    answer: "Dans un bain réel, des réactions secondaires (comme le dégagement de dihydrogène à la cathode ou la réoxydation d'espèces dissoutes) consomment une fraction du courant total. Multipliez la masse théorique issue de la loi de Faraday par le rendement faradique η (compris entre 0 et 1) : m_réelle = η × m_théorique. Inversement, pour obtenir une masse cible donnée, divisez le courant ou le temps théorique par η."
  - question: "Comment déterminer le nombre d'électrons échangés n pour un ion en solution ou un sel fondu ?"
    answer: "Le paramètre n correspond au coefficient stœchiométrique des électrons dans la demi-équation équilibrée formant une mole de l'espèce recherchée. Par exemple, n = 1 pour Ag⁺ + e⁻ → Ag, n = 2 pour Cu²⁺ + 2 e⁻ → Cu, n = 3 pour Al³⁺ + 3 e⁻ → Al, mais n = 2 pour la formation d'une mole de dihydrogène (2 H⁺ + 2 e⁻ → H₂) et n = 4 pour une mole de dioxygène (2 H₂O → O₂ + 4 H⁺ + 4 e⁻)."
  - question: "La tension appliquée (en volts) modifie-t-elle la masse déposée selon la loi de Faraday ?"
    answer: "Non, directement : la quantité de matière transformée dépend uniquement de la charge électrique Q = I × t traversant l'électrolyte. Toutefois, la tension U détermine si la réaction peut démarrer (elle doit dépasser la force contre-électromotrice augmentée des surtensions et de la chute ohmique I × R) et fixe la consommation énergétique totale E = U × I × t, exprimée en joules ou en kilowattheures (kWh)."
---

L'**électrolyse** est un procédé électrochimique qui force une réaction d'oxydoréduction non spontanée grâce à un générateur de courant continu externe. Alors qu'une pile galvanique produit de l'électricité à partir d'une transformation spontanée (`ΔG < 0`), une cellule électrolytique consomme de l'énergie électrique pour contraindre les électrons à circuler contre le gradient thermodynamique (`ΔG > 0`), permettant de raffiner des métaux, de déposer des revêtements protecteurs ou de produire du dihydrogène.

Pour dimensionner un bain de galvanoplastie, estimer une masse déposée ou calculer l'intensité requise sur une durée donnée, notre [Calculatrice d'Électrolyse](/fr/calculatrices/calculateur-d-electrolyse) applique directement les lois de Faraday. Renseignez trois grandeurs parmi la masse (`m`), l'intensité (`I`), la durée (`t`) et la masse molaire (`M`) pour obtenir instantanément l'inconnue et la charge électrique (`Q`).

## Lois quantitatives de Faraday et définitions des paramètres

Établies en 1833, les lois de Faraday relient l'électricité traversant un électrolyte à la quantité de matière transformée : la masse produite est proportionnelle à la charge totale `Q`, et, pour une charge identique, les masses de différentes espèces sont proportionnelles à leur masse équivalente `M / n`. Dans la cellule, l'oxydation s'effectue à l'**anode** (pôle `+`) et la réduction à la **cathode** (pôle `−`).

```text
Charge électrique totale   : Q = I × t
Quantité d'électrons       : n(e⁻) = Q / F
Masse théorique déposée    : m = (I × t × M) / (n × F)
Masse réelle (rendement η) : m_réelle = η × (I × t × M) / (n × F)
```

Par réarrangement algébrique, on isole directement l'intensité (`I = (m × n × F) / (t × M)`), la durée (`t = (m × n × F) / (I × M)`) ou la masse molaire (`M = (m × n × F) / (I × t)`).

Définitions et unités impératives :

- **`m` (`g`) :** masse déposée à la cathode ou dissoute à l'anode.
- **`I` (`A`) :** courant continu constant (`1 A = 1 C/s`).
- **`t` (`s`) :** durée totale du passage du courant (`1 h = 3 600 s`).
- **`M` (`g/mol`) :** masse molaire de l'espèce formée.
- **`n` :** nombre d'électrons transférés par mole produite.
- **`F` (`96 485 C/mol`) :** constante de Faraday.
- **`η` (`0` à `1`) :** rendement faradique utile.

## Exemple numérique pas à pas : raffinage du cuivre

Un atelier réalise un dépôt de cuivre à partir d'un bain acide de sulfate de cuivre (`CuSO₄`). La réduction cathodique est `Cu²⁺(aq) + 2 e⁻ → Cu(s)`, d'où `n = 2`. L'intensité vaut `I = 12,5 A` pendant `2 h 30 min`, avec `η = 96 %` (`0,96`), une tension `U = 2,2 V` et `M(Cu) = 63,546 g/mol`.

### Étape 1 : Conversion temporelle et charge électrique

Convertissons d'abord la durée en secondes, puis calculons `Q` :

- `t = 2,5 h × 3 600 s/h = 9 000 s`
- `Q = 12,5 A × 9 000 s = 112 500 C` (soit `31,25 Ah`)

### Étape 2 : Quantité d'électrons et masse théorique

Le nombre de moles d'électrons transférées est `n(e⁻) = 112 500 / 96 485 ≈ 1,16598 mol`. Comme deux électrons réduisent un ion `Cu²⁺`, la masse théorique vaut :

`m_th = (112 500 × 63,546) / (2 × 96 485) = 7 148 925 / 192 970 ≈ 37,047 g`

### Étape 3 : Masse réelle et bilan énergétique

Avec un rendement faradique de `96 %` (`4 %` de courant consommé par des réactions parasites), on obtient :

`m_réelle = 37,047 × 0,96 ≈ 35,565 g` (soit `35,57 g` de cuivre déposé)

L'énergie consommée s'élève à `E = U × Q = 2,2 × 112 500 = 247 500 J = 0,06875 kWh`, soit une consommation spécifique de `0,06875 / 0,035565 ≈ 1,93 kWh/kg` de cuivre raffiné.

## Équivalents électrochimiques des principales réactions industrielles

L'**équivalent électrochimique** (`3 600 × M / (n × F)`, en `g/Ah`) compare la productivité massique des procédés industriels à charge identique :

| Espèce produite | Demi-réaction cathodique | `n` | Masse molaire (`M`) | Équivalent (`g/Ah`) | Énergie typique (`kWh/kg`) |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Argent (`Ag`)** | `Ag⁺ + e⁻ → Ag` | `1` | `107,87 g/mol` | `4,025 g/Ah` | `0,3 – 0,6 kWh/kg` |
| **Zinc (`Zn`)** | `Zn²⁺ + 2 e⁻ → Zn` | `2` | `65,38 g/mol` | `1,220 g/Ah` | `3,0 – 3,5 kWh/kg` |
| **Cuivre (`Cu`)** | `Cu²⁺ + 2 e⁻ → Cu` | `2` | `63,55 g/mol` | `1,185 g/Ah` | `1,8 – 2,2 kWh/kg` |
| **Nickel (`Ni`)** | `Ni²⁺ + 2 e⁻ → Ni` | `2` | `58,69 g/mol` | `1,095 g/Ah` | `2,5 – 3,5 kWh/kg` |
| **Aluminium (`Al`)** | `Al³⁺ + 3 e⁻ → Al` | `3` | `26,98 g/mol` | `0,336 g/Ah` | `13,0 – 15,0 kWh/kg` |
| **Dihydrogène (`H₂`)** | `2 H⁺ + 2 e⁻ → H₂` | `2` | `2,016 g/mol` | `0,0376 g/Ah` | `50,0 – 55,0 kWh/kg` |

Un ampère-heure dépose ainsi douze fois plus d'argent que d'aluminium, expliquant pourquoi les cuves Hall-Héroult d'alumine dissoute dans la cryolithe à `960 °C` opèrent sous `150 000` à `400 000 A`.

## Applications industrielles, erreurs fréquentes et limites physiques

Outre la métallurgie primaire et le procédé chlore-soude (`2 NaCl + 2 H₂O → Cl₂ + H₂ + 2 NaOH`), l'électrolyse alimente la **galvanoplastie** (nickel, chrome, or) et la production d'**hydrogène vert** par électrolyseurs alcalins ou PEM.

Quatre erreurs faussent couramment les calculs :

- **Oubli de conversion temporelle :** entrer des minutes ou des heures dans `m = (I × t × M) / (n × F)` décale le résultat d'un facteur `60` ou `3 600`.
- **Valence `n` erronée :** distinguer `Fe²⁺` de `Fe³⁺`, et compter `n` par **molécule** pour les gaz (`n = 2` pour `H₂`, `n = 4` pour `O₂`).
- **Milieu aqueux vs sel fondu :** les métaux très réducteurs (`Al`, `Na`, `Mg`) ne se déposent pas en solution aqueuse, l'eau étant réduite en `H₂` avant eux.
- **Courant limite de diffusion :** dépasser la densité de courant critique crée un dépôt spongieux et fait chuter le rendement faradique.
