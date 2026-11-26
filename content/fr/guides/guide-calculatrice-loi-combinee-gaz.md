---
title: "Calculatrice de la Loi Combinée des Gaz : Conditions Changeantes"
description: "Utilisez la loi combinée des gaz (P₁V₁/T₁ = P₂V₂/T₂) pour prévoir l'évolution conjointe de la pression, du volume et de la température, avec exemple chiffré et tableau."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "combined-gas-law-calculator"
faqs:
  - question: "Faut-il convertir la pression et le volume en unités SI dans la loi combinée des gaz ?"
    answer: "Non, tant que la quantité de matière reste constante, il suffit d'utiliser exactement la même unité de pression pour P₁ et P₂ (bar, atm, kPa ou hPa) et exactement la même unité de volume pour V₁ et V₂ (L, mL ou m³). Les facteurs de conversion s'annulent de part et d'autre de l'égalité."
  - question: "Quelle erreur provoque l'utilisation d'une pression manométrique au lieu d'une pression absolue ?"
    answer: "Les lois des gaz reposent exclusivement sur la pression absolue, mesurée par rapport au vide. Si un pneu affiche 2,2 bar au manomètre, sa pression absolue vaut environ 3,213 bar. Saisir 2,2 bar fausserait gravement le rapport P₁ / P₂ lors d'une variation de température ou de volume."
  - question: "Comment adapter la formule si du gaz fuit ou est ajouté entre l'état initial et l'état final ?"
    answer: "La loi combinée suppose une enceinte parfaitement étanche (n₁ = n₂). Si le nombre de moles varie entre les deux états, vous devez revenir à l'équation générale P₁ × V₁ / (n₁ × T₁) = P₂ × V₂ / (n₂ × T₂), ou calculer séparément chaque état via PV = nRT."
  - question: "La loi combinée est-elle valable pour de l'air humide qui refroidit fortement ?"
    answer: "Elle reste valable tant que la vapeur d'eau demeure à l'état gazeux. En revanche, si le refroidissement fait descendre l'air sous son point de rosée, une partie de la vapeur d'eau condense en liquide : la quantité totale de gaz n diminue et la chaleur latente libérée modifie l'évolution thermique."
  - question: "Pourquoi le rapport P × V / T reste-t-il invariant même lorsque pression, volume et température changent simultanément ?"
    answer: "D'après l'équation d'état des gaz parfaits PV = nRT, le quotient (P × V) / T est égal au produit n × R. Tant que le système reste fermé (n constant) et que le gaz conserve un comportement proche du modèle parfait, ce produit ne dépend pas du chemin suivi entre l'état 1 et l'état 2."
---

La **loi combinée des gaz** exprime la conservation du rapport `(P × V) / T` pour une quantité fixe de gaz parfait passant d'un état d'équilibre initial `(P₁, V₁, T₁)` à un état final `(P₂, V₂, T₂)`. Elle fusionne en une seule équation trois lois historiques — Boyle-Mariotte (isotherme), Charles (isobare) et Gay-Lussac (isochore) — afin de modéliser les transformations réelles où pression, volume et température évoluent simultanément, sans avoir à connaître le nombre de moles `n` ni la constante `R`.

Notre [Calculatrice de la Loi Combinée des Gaz](/fr/calculatrices/calculateur-de-loi-combinee-des-gaz) vous permet de déterminer n'importe laquelle des six grandeurs d'état à partir des cinq autres. Elle gère automatiquement la conversion indispensable des températures en kelvins et assure l'homogénéité des rapports de pression et de volume.

## Unification des lois simples et équations de calcul

À quantité de matière `n` constante, l'équation `PV = nRT` implique que `PV / T = nR = constante`. Entre deux états d'équilibre quelconques, on obtient :

```text
(P₁ × V₁) / T₁ = (P₂ × V₂) / T₂
P₂ = P₁ × (V₁ / V₂) × (T₂ / T₁)  |  V₂ = V₁ × (P₁ / P₂) × (T₂ / T₁)  |  T₂ = T₁ × (P₂ / P₁) × (V₂ / V₁)
```

Respectez ces trois règles de cohérence :

- **`P₁` et `P₂` (Pressions absolues)** : unité identique des deux côtés (`Pa`, `hPa`, `bar`, `atm`), toujours mesurée par rapport au vide absolu (pression relative + pression atmosphérique).
- **`V₁` et `V₂` (Volumes)** : unité commune des deux côtés (`m³`, `L`, `mL`).
- **`T₁` et `T₂` (Températures absolues, en `K`)** : converties impérativement en kelvins (`T(K) = T(°C) + 273,15`). Comme la formule divise par `T`, conserver des degrés Celsius fausserait radicalement le résultat et provoquerait une division par zéro à `0 °C`.

## Exemple chiffré : expansion d'un ballon-sonde météorologique

Un ballon-sonde est gonflé au sol avec de l'hélium dans une enveloppe souple et étanche (`P₁ = 1 013 hPa`, `V₁ = 4,20 m³`, `T₁ = 20,0 °C`), puis atteint la stratosphère à `22 km` d'altitude (`P₂ = 40,0 hPa`, `T₂ = −55,0 °C`).

1. **Convertir en kelvins** : `T₁ = 20,0 + 273,15 = 293,15 K` et `T₂ = −55,0 + 273,15 = 218,15 K`.
2. **Calculer les rapports** : `P₁ / P₂ = 1 013 / 40,0 = 25,325` et `T₂ / T₁ = 218,15 / 293,15 ≈ 0,744158`.
3. **Déterminer `V₂`** :

```text
V₂ = 4,20 × 25,325 × 0,744158 = 106,365 × 0,744158 ≈ 79,15 m³
```

Vérifions l'invariant `(P × V) / T` : au sol `1 013 × 4,20 / 293,15 = 14,513 hPa·m³/K`, et en altitude `40,0 × 79,152 / 218,15 = 14,513 hPa·m³/K`. Le refroidissement de `75 K` tend à contracter le gaz de `25,6 %`, mais la chute de pression multiplie finalement son volume par `18,8`.

## Tableau comparatif des transformations dérivées

En bloquant l'une des trois variables ou en combinant leurs variations, la loi combinée restitue l'ensemble des régimes thermodynamiques usuels :

| Scénario physique | Contrainte appliquée | Équation simplifiée | Sens de variation typique | Exemple concret |
| :--- | :--- | :--- | :--- | :--- |
| Isotherme (Boyle-Mariotte) | `T₁ = T₂` | `P₁ × V₁ = P₂ × V₂` | `V` diminue quand `P` augmente | Seringue obturée, bulle d'air en plongée |
| Isobare (Charles) | `P₁ = P₂` | `V₁ / T₁ = V₂ / T₂` | `V` augmente avec `T` | Montgolfière, dilatation thermique d'un piston libre |
| Isochore (Gay-Lussac) | `V₁ = V₂` | `P₁ / T₁ = P₂ / T₂` | `P` augmente avec `T` | Autoclave, bouteille de gaz exposée au soleil |
| Compression avec échauffement | `V₂ < V₁` et `T₂ > T₁` | `P₂ = P₁ × (V₁/V₂) × (T₂/T₁)` | Les deux effets augmentent `P₂` | Cylindre moteur en phase de compression |
| Détente avec refroidissement | `P₂ < P₁` et `T₂ < T₁` | `V₂ = V₁ × (P₁/P₂) × (T₂/T₁)` | Effets opposés sur `V₂` | Ballon-sonde atmosphérique, détente d'air |
| Enceinte ouverte (fuite) | `n₁ ≠ n₂` | Loi combinée inapplicable | Dépend du débit massique | Pneu crevé, purge d'un réservoir |

## Applications pratiques, erreurs fréquentes et limites

La loi combinée sert couramment en plongée sous-marine pour anticiper la variation de volume d'air entre une réserve en surface chaude et une profondeur froide, en pneumatique industrielle pour ajuster la pression de gonflage entre hiver et été, ou en chimie analytique pour ramener un volume gazeux mesuré à température ambiante vers les conditions normales de référence (`273,15 K`, `101,325 kPa`).

Trois pièges pratiques demandent une vigilance particulière :

- **Confondre pression relative et pression absolue** : si un pneu est gonflé à `2,20 bar` au manomètre à `20 °C` (soit `P₁ = 2,20 + 1,013 = 3,213 bar` absolus) et que la température chute à `−10 °C` (`263,15 K`) à volume quasi constant, la pression absolue tombe à `3,213 × (263,15 / 293,15) = 2,884 bar`, soit `1,87 bar` au manomètre (et non `1,97 bar` comme le donnerait un calcul erroné sur la valeur relative).
- **Négliger l'élasticité des parois** : dans un pneu ou un ballon en caoutchouc, le volume `V₂` varie légèrement avec la pression interne, contrairement à une bouteille métallique rigide.
- **Confondre vitesse de transformation et états d'équilibre** : la loi combinée ne décrit pas le chemin instantané d'une compression adiabatique rapide (qui obéit à `P × V^γ = constante`), mais uniquement la relation exacte entre deux états stabilisés thermiquement. De plus, au-delà de quelques dizaines de bars ou près du point de liquéfaction, le comportement réel dévie et impose d'introduire le facteur de compressibilité `Z` (`P₁V₁/(Z₁T₁) = P₂V₂/(Z₂T₂)`).
