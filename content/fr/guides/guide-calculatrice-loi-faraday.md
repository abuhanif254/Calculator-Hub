---
title: "Calculatrice de la Loi de Faraday sur l'Électrolyse"
description: "Découvrez comment les Lois de Faraday relient la charge électrique à la quantité de substance déposée lors de l'électrolyse."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "faradays-law-calculator"
relatedType: "calculator"
faqs:
  - question: "D'où provient la constante de Faraday (F = 96 485 C/mol) et que représente-t-elle ?"
    answer: "La constante de Faraday représente la charge électrique absolue portée par exactement une mole d'électrons. Elle s'obtient en multipliant le nombre d'Avogadro (N_A ≈ 6,02214 × 10²³ mol⁻¹) par la charge élémentaire d'un électron (e ≈ 1,60218 × 10⁻¹⁹ C), ce qui donne F = 96 485,33 C/mol (arrondi à 96 485 C/mol dans les calculs usuels)."
  - question: "Pourquoi le facteur n varie-t-il selon l'ion métallique déposé ?"
    answer: "Le paramètre n correspond au nombre d'électrons nécessaires pour réduire un seul ion en atome neutre à la cathode (ou oxyder un atome à l'anode). Par exemple, il faut n = 1 électron pour Ag⁺ + e⁻ → Ag, mais n = 2 pour Cu²⁺ + 2 e⁻ → Cu et n = 3 pour Al³⁺ + 3 e⁻ → Al. À charge électrique égale, il faut donc trois fois plus d'électricité pour produire une mole d'aluminium que pour produire une mole d'argent."
  - question: "Qu'est-ce que le rendement faradique en électrolyse industrielle ?"
    answer: "Le rendement faradique (ou rendement de courant) est le rapport entre la masse réellement déposée et la masse théorique prédite par la loi de Faraday. En pratique, une fraction du courant sert à des réactions parasites (comme le dégagement d'hydrogène en milieu aqueux), ramenant le rendement industriel entre 85 % et 99 % selon le procédé."
  - question: "Comment calculer l'épaisseur d'un revêtement métallique à partir de la masse déposée ?"
    answer: "Une fois la masse m obtenue en grammes par la loi de Faraday, divisez-la par la masse volumique ρ du métal (en g/cm³) pour obtenir le volume déposé V = m / ρ, puis divisez ce volume par la surface immergée S de la pièce (en cm²). L'épaisseur e = m / (ρ × S) en centimètres se convertit en micromètres en multipliant par 10 000."
  - question: "Les lois de Faraday s'appliquent-elles également aux gaz produits lors de l'électrolyse ?"
    answer: "Oui, rigoureusement. Le nombre de moles de gaz dégagé vaut n_gaz = Q / (n × F), en veillant à prendre la stœchiométrie de la molécule gazeuse : pour le dihydrogène (2 H⁺ + 2 e⁻ → H₂) ou le dichlore (2 Cl⁻ → Cl₂ + 2 e⁻), n vaut 2 électrons par mole de gaz, tandis que pour le dioxygène (2 H₂O → O₂ + 4 H⁺ + 4 e⁻), n vaut 4 électrons par mole d'O₂."
---

Les **lois de Faraday sur l'électrolyse**, formulées en 1833, relient quantitativement la charge électrique traversant un électrolyte à la masse de substance déposée ou dégagée aux électrodes. La première loi établit que cette masse est proportionnelle à la charge totale transférée ; la seconde indique que, pour une même charge, les masses obtenues sont proportionnelles à la masse équivalente (`M / n`) de chaque espèce.

Pour dimensionner un bain de galvanoplastie ou estimer une production électrochimique, saisissez l'intensité, la durée, la masse molaire et la valence dans notre [Calculatrice de la Loi de Faraday](/fr/calculatrices/calculateur-de-loi-de-faraday). L'outil calcule la charge totale en coulombs, les moles d'électrons transférées et la masse exacte produite.

## Équations fondamentales et signification des paramètres

La réunion des deux lois de Faraday donne l'équation stœchiométrique générale de l'électrolyse :

```text
Charge électrique totale     : Q = I × t
Moles d'électrons échangées  : n(e⁻) = Q / F
Masse déposée (Faraday)      : m = (Q × M) / (n × F) = (I × t × M) / (n × F)
Équivalent électrochimique Z : Z = M / (n × F)   ⇒   m = Z × I × t
```

Respectez scrupuleusement la cohérence des unités :

- **`m`** : masse déposée ou libérée, en grammes (`g`).
- **`I`** : intensité du courant continu, en ampères (`A`).
- **`t`** : durée d'électrolyse obligatoirement exprimée en **secondes (`s`)**.
- **`Q`** : charge électrique totale en coulombs (`C = A·s`).
- **`M`** : masse molaire de l'espèce produite, en `g/mol`.
- **`n`** : nombre d'électrons transférés par entité dans la demi-réaction équilibrée.
- **`F`** : constante de Faraday (`96 485 C/mol`, soit `N_A × e`).

Avec un rendement faradique `η` (`0 < η ≤ 1`), une surface immergée `S` (`cm²`) et une masse volumique `ρ` (`g/cm³`), la masse réelle et l'épaisseur `e` (`cm`) valent :

```text
m_réelle = η × (I × t × M) / (n × F)
e        = m_réelle / (ρ × S)
```

## Exemple numérique complet : cuivrage électrolytique et calcul d'épaisseur

Un bain acide de sulfate de cuivre (`CuSO₄`) effectue un cuivrage selon `Cu²⁺(aq) + 2 e⁻ → Cu(s)`, soit `n = 2` et `M(Cu) = 63,546 g/mol`. Un courant constant `I = 4,50 A` circule pendant `45 minutes` sur une pièce de surface `S = 150 cm²`.

### Étape 1 : Charge électrique totale (`Q`)

Convertissons d'abord le temps en secondes (`45 × 60 = 2 700 s`) :

```text
Q = 4,50 × 2 700 = 12 150 C
```

### Étape 2 : Masse théorique de cuivre déposée

```text
n(e⁻) = 12 150 / 96 485 = 0,125926 mol
n(Cu) = 0,125926 / 2    = 0,062963 mol
m_th  = (12 150 × 63,546) / (2 × 96 485) = 772 083,9 / 192 970 = 4,001 g
```

Le dépôt théorique maximal atteint **`4,00 g`** de cuivre.

### Étape 3 : Rendement faradique et épaisseur du revêtement

Avec un rendement faradique industriel `η = 96,0 %` (`0,96`) et une masse volumique `ρ = 8,96 g/cm³` :

```text
m_réelle = 4,001 × 0,96 = 3,841 g
V_dépôt  = 3,841 / 8,96 = 0,4287 cm³
e        = 0,4287 / 150 = 0,002858 cm = 28,58 µm ≈ 28,6 µm
```

L'épaisseur moyenne déposée sur la pièce atteint **`28,6 µm`**.

## Tableau comparatif des dépôts électrolytiques et produits industriels

L'équivalent électrochimique `Z = M / (n × F)` indique la masse transformée par coulomb.

| Espèce chimique | Demi-réaction | Valence `n` | `M` (`g/mol`) | Équivalent `Z` (`mg/C`) | Charge pour `10 g` | Usage industriel majeur |
|---|---|---|---|---|---|---|
| Argent (`Ag⁺`) | `Ag⁺ + e⁻ → Ag` | `1` | `107,87` | `1,1180 mg/C` | `8 945 C` (`2,48 A·h`) | Argenture optique, connectique |
| Zinc (`Zn²⁺`) | `Zn²⁺ + 2 e⁻ → Zn` | `2` | `65,38` | `0,3388 mg/C` | `29 515 C` (`8,20 A·h`) | Électrozingage anticorrosion |
| Cuivre (`Cu²⁺`) | `Cu²⁺ + 2 e⁻ → Cu` | `2` | `63,55` | `0,3293 mg/C` | `30 365 C` (`8,43 A·h`) | Électroraffinage (99,99 %), circuits |
| Nickel (`Ni²⁺`) | `Ni²⁺ + 2 e⁻ → Ni` | `2` | `58,69` | `0,3042 mg/C` | `32 878 C` (`9,13 A·h`) | Nickelage anti-usure |
| Aluminium (`Al³⁺`) | `Al³⁺ + 3 e⁻ → Al` | `3` | `26,98` | `0,0932 mg/C` | `107 285 C` (`29,80 A·h`) | Procédé Hall-Héroult |
| Dihydrogène (`H₂`) | `2 H⁺ + 2 e⁻ → H₂(g)` | `2` | `2,016` | `0,01045 mg/C` | `957 192 C` (`265,9 A·h`) | Hydrogène vert par électrolyse |

## Applications industrielles, erreurs fréquentes et précautions opératoires

### Métallurgie, galvanoplastie et hydrogène décarboné

Les lois de Faraday dimensionnent l'**électroraffinage du cuivre** (pureté `99,99 %`), l'**électrométallurgie de l'aluminium** à `960 °C`, l'industrie chlore-alcali ainsi que les électrolyseurs alcalins et `PEM` produisant de l'hydrogène vert. En microélectronique, elles calibrent les dépôts conducteurs sur cartes imprimées au micromètre près.

### Erreurs fréquentes et limites physiques en atelier

1. **Oublier les secondes dans `Q = I × t` :** entrer des minutes ou heures fausse le bilan d'un facteur `60` ou `3 600` (`1 A·h = 3 600 C`).
2. **Confondre atome et molécule diatomique :** pour `Cl₂` (`70,90 g/mol`) ou `H₂` (`2,016 g/mol`), `M` et `n = 2` doivent porter sur la molécule entière.
3. **Dépasser la densité de courant critique :** un courant excessif sur une faible surface `S` produit des dépôts brûlés et déclenche un dégagement parasite d'hydrogène abaissant `η`.
4. **Courant variable :** si `I` fluctue, remplacez `I × t` par l'intégrale coulométrique `Q = ∫ I(t) dt`.
