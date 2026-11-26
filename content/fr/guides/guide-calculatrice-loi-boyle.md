---
title: "Calculatrice de la Loi de Boyle-Mariotte : Pression vs Volume"
description: "Maîtrisez la loi de Boyle-Mariotte (P₁ × V₁ = P₂ × V₂) à température constante : formule isotherme, exemple d'autonomie en plongée sous-marine, tableau et limites réelles."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "boyles-law-calculator"
faqs:
  - question: "Pourquoi la température doit-elle rester constante pour appliquer la loi de Boyle-Mariotte ?"
    answer: "La température mesure l'énergie cinétique moyenne des molécules de gaz. Si elle augmente pendant la compression, les molécules frappent les parois plus vite et plus fort, ce qui élève la pression au-delà de ce que prévoit P₁ × V₁ = P₂ × V₂. Pour une température variable, il faut utiliser la loi combinée des gaz."
  - question: "Pourquoi le risque de barotraumatisme pulmonaire est-il maximal entre 0 et 10 mètres sous l'eau ?"
    answer: "Selon la loi de Boyle-Mariotte, le volume d'un gaz est inversement proportionnel à la pression absolue. Entre 10 m (2 bar) et la surface (1 bar), la pression est divisée par deux et le volume double (+100 %), alors qu'entre 40 m (5 bar) et 30 m (4 bar) il n'augmente que de 25 %. C'est donc près de la surface que l'expansion relative est la plus brutale."
  - question: "Peut-on saisir directement la pression lue sur un manomètre dans P₁ × V₁ = P₂ × V₂ ?"
    answer: "Non. Un manomètre mesure une pression relative (différence par rapport à l'atmosphère ambiante). Vous devez impérativement convertir chaque mesure en pression absolue en ajoutant la pression atmosphérique (environ 1,013 bar au niveau de la mer), faute de quoi le produit P × V ne reste pas constant."
  - question: "Que se passe-t-il si l'on comprime un gaz très rapidement, comme avec une pompe à vélo ?"
    answer: "Une compression rapide ne laisse pas le temps à la chaleur de s'évacuer vers l'extérieur : le gaz s'échauffe (transformation adiabatique) et la pression grimpe plus vite que ne le prévoit la loi de Boyle-Mariotte. La relation P₁ × V₁ = P₂ × V₂ ne redevient exacte qu'une fois le cylindre revenu à la température initiale."
  - question: "À partir de quelle pression la loi de Boyle-Mariotte devient-elle imprécise pour l'air ou l'azote ?"
    answer: "Jusqu'à environ 30 à 50 bar à température ambiante, l'erreur reste inférieure à 1 ou 2 %. En revanche, à 200 ou 300 bar (bouteilles de plongée ou d'air respirable), le volume propre des molécules réduit l'espace libre disponible (facteur de compressibilité Z supérieur à 1 pour le diazote) : la quantité réelle d'air stockée s'écarte d'environ 4 à 10 % du calcul idéal."
---

La **loi de Boyle-Mariotte** — formulée indépendamment par Robert Boyle en 1662 et Edme Mariotte en 1676 — établit qu'à température et quantité de matière constantes, la pression absolue (`P`) d'un gaz parfait et son volume (`V`) sont inversement proportionnels : leur produit `P × V` demeure constant. En réduisant le volume de moitié, la fréquence des chocs moléculaires sur les parois double, ce qui double exactement la pression exercée.

Notre [Calculatrice de la Loi de Boyle-Mariotte](/fr/calculatrices/calculateur-de-loi-de-boyle) isole instantanément l'une des quatre grandeurs (`P₁`, `V₁`, `P₂` ou `V₂`) dès que les trois autres sont connues. Elle vous permet de dimensionner un volume d'air comprimé, de prévoir l'expansion d'une poche gazeuse sous vide ou de calculer l'autonomie respiratoire d'un bloc de plongée.

## Principe de la transformation isotherme et formulation

Une transformation isotherme (`T` constante) d'une quantité fixe de gaz (`n` constante) décrit une hyperbole équilatère dans le diagramme pression-volume :

```text
P × V = constante    |    P₁ × V₁ = P₂ × V₂
P₂ = (P₁ × V₁) / V₂  |    V₂ = (P₁ × V₁) / P₂
```

- **`P₁` et `P₂` (Pressions absolues)** : mesurées par rapport au vide absolu, dans la même unité des deux côtés (`bar`, `atm`, `Pa`, `kPa`, `psi`).
- **`V₁` et `V₂` (Volumes)** : exprimés dans une unité identique (`L`, `mL`, `cm³` ou `m³`).
- **Équilibre thermique** : la température finale du gaz doit être égale à sa température initiale.

## Exemple chiffré : autonomie et détente d'un bloc de plongée

Considérons un bloc de plongée standard de volume interne `V₁ = 12,0 L` gonflé à une pression absolue `P₁ = 200 bar` à `20 °C`. Calculons d'abord le volume d'air équivalent à la pression atmosphérique de surface (`P₂ = 1,00 bar`), puis la durée d'autonomie théorique au fond à `30 m` de profondeur (`P₃ = 4,00 bar` absolus, la pression hydrostatique augmentant d'environ `1 bar` tous les `10 m`), en conservant une réserve de sécurité de `50 bar`.

1. **Volume équivalent en surface (`P₂ = 1,00 bar`)** :

```text
V₂ = (P₁ × V₁) / P₂ = (200 × 12,0) / 1,00 = 2 400 L (soit 2,40 m³)
```

2. **Volume utilisable jusqu'à la réserve (`50 bar`)** :
   La pression disponible hors réserve vaut `ΔP = 200 − 50 = 150 bar`. À la pression de `1,00 bar`, cela représente `150 × 12,0 = 1 800 L` d'air respirable.
3. **Volume disponible à `30 m` de profondeur (`P₃ = 4,00 bar`)** :
   Les détendeurs délivrent l'air à la pression ambiante. D'après la loi de Boyle-Mariotte, le volume utilisable à `30 m` vaut :

```text
V_fond = (150 × 12,0) / 4,00 = 1 800 / 4,00 = 450 L
```

Avec une consommation ventilatoire moyenne d'un plongeur au calme de `20 L/min` mesurée à la profondeur d'évolution, l'autonomie disponible au fond avant d'entamer la réserve s'élève à `450 / 20 = 22,5 minutes` (hors air consommé pendant la descente et la remontée).

## Tableau de compression isotherme selon la profondeur

Pour illustrer le caractère non linéaire (hyperbolique) de la loi de Boyle-Mariotte, le tableau suivant suit un volume souple de `10,00 L` d'air prélevé en surface (`1,0 bar`) lorsqu'on l'immerge par paliers de `10 m` à température constante :

| Profondeur | Pression absolue (`P`) | Volume du gaz (`V`) | Produit `P × V` | Variation relative par tranche de `10 m` |
| :---: | :---: | :---: | :---: | :--- |
| `0 m` (surface) | `1,0 bar` | `10,00 L` | `10,0 bar·L` | Référence initiale (`100 %`) |
| `10 m` | `2,0 bar` | `5,00 L` | `10,0 bar·L` | `−50,0 %` (division par `2`) |
| `20 m` | `3,0 bar` | `3,33 L` | `10,0 bar·L` | `−33,3 %` par rapport à `10 m` |
| `30 m` | `4,0 bar` | `2,50 L` | `10,0 bar·L` | `−25,0 %` par rapport à `20 m` |
| `40 m` | `5,0 bar` | `2,00 L` | `10,0 bar·L` | `−20,0 %` par rapport à `30 m` |
| `50 m` | `6,0 bar` | `1,67 L` | `10,0 bar·L` | `−16,7 %` par rapport à `40 m` |

Ce tableau explique une règle vitale de la physiologie hyperbare : la variation relative de volume la plus violente survient dans les dix premiers mètres sous la surface. À l'inverse, à la remontée de `10 m` vers `0 m`, l'air doublant brusquement de volume expose un plongeur retenant sa respiration à un risque maximal de surpression pulmonaire.

## Applications courantes, erreurs à éviter et limites réelles

Au-delà de la plongée sous-marine et de l'aéronautique (variation du volume gazeux dans les cavités internes lors de la dépressurisation en cabine), la loi de Boyle-Mariotte régit le fonctionnement des seringues médicales (la traction du piston augmente le volume interne, crée une dépression et laisse la pression atmosphérique pousser le liquide), des ressorts pneumatiques, des vases d'expansion de chauffage central et des pompes à vide.

Plusieurs écueils pratiques compromettent souvent les calculs :

- **Confondre pression manométrique et pression absolue** : lire `200 bar` sur un manomètre signifie en réalité `201,013 bar` absolus. À haute pression, cet écart reste inférieur à `0,5 %`, mais à basse pression (par exemple `1,0 bar` au manomètre d'un vase d'expansion, soit `2,013 bar` absolus), oublier la pression atmosphérique fausserait le volume final d'un facteur `2`.
- **Oublier l'effet thermique des compressions rapides** : lors du gonflage rapide d'un bloc à `200 bar`, la température interne grimpe fortement ; une fois le bloc refroidi dans l'eau à `15 °C`, la pression chute sensiblement (ce reliquat relève de la loi de Gay-Lussac).
- **Négliger la compressibilité des gaz réels à très haute pression** : à `200–300 bar`, le volume propre des molécules d'azote ou d'oxygène réduit la compressibilité par rapport au modèle parfait (`Z > 1` pour l'air à `20 °C` au-delà de `100 bar`), ce qui diminue d'environ `5 à 10 %` la masse d'air réellement stockée par rapport au calcul idéal de `P₁ × V₁`.
