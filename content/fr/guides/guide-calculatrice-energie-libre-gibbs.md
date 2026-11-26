---
title: "Calculatrice d'Énergie Libre de Gibbs : Réactions Spontanées"
description: "Calculez la variation d'énergie libre de Gibbs ΔG = ΔH − TΔS pour déterminer la spontanéité d'une réaction, la température d'inversion et le lien avec l'équilibre K."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "gibbs-free-energy-calculator"
faqs:
  - question: "Une réaction spontanée (ΔG < 0) se produit-elle forcément de manière rapide ?"
    answer: "Non. L'énergie libre de Gibbs ΔG gouverne uniquement la thermodynamique (la direction favorable d'une transformation), jamais sa cinétique (sa vitesse). Par exemple, la transformation du diamant en graphite à 25 °C est spontanée (ΔG° = −2,9 kJ/mol), mais sa barrière d'énergie d'activation Ea est si élevée que la réaction reste imperceptible sans catalyseur ou haute température."
  - question: "Pourquoi faut-il convertir ΔH et ΔS dans la même unité avant d'appliquer ΔG = ΔH − TΔS ?"
    answer: "Dans les tables thermodynamiques, l'enthalpie ΔH est presque toujours exprimée en kilojoules par mole (kJ/mol), alors que l'entropie ΔS est donnée en joules par mole et par kelvin (J/(mol·K)). Soustraire directement des joules à des kilojoules crée une erreur d'un facteur 1 000 : il est indispensable de diviser ΔS par 1 000 pour l'exprimer en kJ/(mol·K)."
  - question: "Quelle est la distinction entre ΔG° (standard) et ΔG (réel) ?"
    answer: "ΔG° mesure le bilan d'énergie libre lorsque tous les réactifs et produits sont dans leur état standard (1 mol/L, 1 bar, en général à 298,15 K). Le ΔG réel tient compte des concentrations et pressions instantanées via ΔG = ΔG° + R × T × ln(Q) : une réaction à ΔG° > 0 peut devenir spontanée (ΔG < 0) si l'on maintient un fort excès de réactifs ou si l'on élimine les produits en continu."
  - question: "Comment calculer la température à laquelle une réaction change de sens de spontanéité ?"
    answer: "Lorsque ΔH et ΔS ont le même signe, la réaction s'inverse à la température d'inversion T_inv où ΔG = 0. On obtient directement T_inv = ΔH / ΔS (avec T_inv en kelvins, ΔH et ΔS exprimés dans des unités cohérentes d'énergie, par exemple en J/mol et J/(mol·K))."
  - question: "Comment l'énergie libre de Gibbs est-elle reliée à la constante d'équilibre K ?"
    answer: "À l'équilibre chimique, le potentiel thermodynamique s'annule (ΔG = 0) et Q = K. L'équation ΔG = ΔG° + R × T × ln(Q) devient alors ΔG° = −R × T × ln(K), ce qui permet de déduire K = exp(−ΔG° / (R × T)). Plus ΔG° est négatif, plus K est supérieur à 1 et plus les produits dominent à l'équilibre."
---

L'**énergie libre de Gibbs** (`G = H − T × S`) est la fonction thermodynamique qui prédit si une transformation chimique ou physique est **spontanée** à température et pression constantes. Sa variation (`ΔG`) mesure également le travail maximal utile (hors travail mécanique de volume) récupérable par l'environnement, comme l'énergie électrique d'une pile ou le travail cellulaire fourni par l'ATP.

Notre [Calculatrice d'Énergie Libre de Gibbs](/fr/calculatrices/calculateur-d-energie-libre-de-gibbs) calcule `ΔG` à partir de l'enthalpie (`ΔH`), de l'entropie (`ΔS`) et de la température (`T`), harmonise automatiquement les unités (`J`, `kJ`, `°C`, `K`, `°F`) et précise si la réaction est exergonique (spontanée), endergonique (non spontanée) ou à l'équilibre.

## Équation de Gibbs-Helmholtz et paramètres thermodynamiques

Établie par Josiah Willard Gibbs en 1873, la variation d'enthalpie libre arbitre le compromis entre la stabilisation thermique (baisse d'enthalpie) et l'augmentation du désordre moléculaire (hausse d'entropie) :

```text
Équation fondamentale (T fixe) : ΔG = ΔH − T × ΔS
En conditions non standards    : ΔG = ΔG° + R × T × ln(Q)
Lien avec l'équilibre K        : ΔG° = −R × T × ln(K)
Température d'inversion T_inv  : T_inv (K) = ΔH / ΔS   (si ΔH et ΔS de même signe)
Lien avec l'électrochimie      : ΔG° = −n × F × E°_cellule
```

### Interprétation des grandeurs et conventions de signe

- **`ΔH` (Variation d'enthalpie, en `kJ/mol`) :** chaleur échangée à pression constante. Une réaction exothermique (`ΔH < 0`) libère de la chaleur et favorise la spontanéité ; une réaction endothermique (`ΔH > 0`) en absorbe.
- **`ΔS` (Variation d'entropie, en `J/(mol·K)`) :** mesure la dispersion de l'énergie et de la matière (souvent positive lors d'une création de gaz). Un `ΔS > 0` rend `−T × ΔS` négatif et favorise la réaction à chaud.
- **`T` (Température absolue, en `K`) :** `T(K) = T(°C) + 273,15`, toujours strictement positive.
- **Verdict :** `ΔG < 0` indique une réaction **spontanée (exergonique)** ; `ΔG > 0` une réaction **non spontanée (endergonique)** ; `ΔG = 0` l'**équilibre thermodynamique**.

## Exemple numérique complet : synthèse de l'ammoniac (Haber-Bosch)

Analysons la synthèse de l'ammoniac `N₂(g) + 3 H₂(g) ⇌ 2 NH₃(g)`. À `25 °C` (`298,15 K`), les tables donnent `ΔH° = −92,22 kJ/mol` et `ΔS° = −198,75 J/(mol·K)` (perte d'entropie car `4` moles de gaz deviennent `2`).

1. **Conversion de `ΔS°` en `kJ/(mol·K)` :** `ΔS° = −198,75 / 1 000 = −0,19875 kJ/(mol·K)`.
2. **Calcul de `ΔG°` à `25 °C` (`298,15 K`) :** `T × ΔS° = 298,15 × (−0,19875) = −59,257 kJ/mol`. Ainsi, `ΔG° = −92,22 − (−59,257) = −32,96 kJ/mol` (`< 0`, réaction spontanée à `25 °C`).
3. **Température d'inversion (`T_inv`) :** `ΔH°` et `ΔS°` étant tous deux négatifs, l'équilibre `ΔG° = 0` survient à `T_inv = −92,22 / (−0,19875) = 464,0 K`, soit `190,85 °C`.
4. **Comportement à `450 °C` (`723,15 K`) :** `ΔG°(723,15 K) ≈ −92,22 − (723,15 × −0,19875) = +51,51 kJ/mol` (`> 0` à `1 bar`). L'industrie chauffe à `450 °C` pour activer cinétiquement le diazote sur catalyseur au fer, mais comprime les gaz à `150–300 bar` pour abaisser `Q` et maintenir `ΔG < 0`.

## Tableau des quatre régimes thermodynamiques de spontanéité

Les signes combinés de `ΔH` et `ΔS` définissent le domaine thermique de spontanéité de toute transformation :

| Signe de ΔH | Signe de ΔS | Signe de −TΔS | Spontanéité (ΔG < 0) | Exemple de référence |
| :--- | :--- | :--- | :--- | :--- |
| `ΔH < 0` | `ΔS > 0` | Toujours `< 0` | Spontanée à **toute température** | Combustion du propane |
| `ΔH > 0` | `ΔS < 0` | Toujours `> 0` | **Jamais spontanée** (sens direct) | Synthèse de l'ozone (`3 O₂ → 2 O₃`) |
| `ΔH < 0` | `ΔS < 0` | `> 0` | Spontanée à **basse température** (`T < T_inv`) | Synthèse de `NH₃` (`T < 191 °C`) ; gel de l'eau |
| `ΔH > 0` | `ΔS > 0` | `< 0` | Spontanée à **haute température** (`T > T_inv`) | Calcination du calcaire (`CaCO₃ → CaO + CO₂`) |
| `ΔH = TΔS` | Équilibre | `ΔG = 0` | Aucun sens favorisé | Fusion de la glace à `0 °C` (`273,15 K`) |
| Couplage | Variable | Variable | Pilotée par **couplage exergonique** | Hydrolyse de l'ATP (`ΔG°' = −30,5 kJ/mol`) |

## Applications, erreurs critiques d'unités et limites de la thermodynamique

L'enthalpie libre de Gibbs guide la conception des réactions dans de nombreux secteurs :

- **Biochimie métabolique :** les réactions cellulaires endergoniques (synthèse protéique, transport actif) sont couplées enzymatiquement à l'hydrolyse de l'ATP (`ΔG°' = −30,5 kJ/mol`) pour rendre le bilan global négatif.
- **Métallurgie extractive :** les diagrammes d'Ellingham tracent `ΔG°(T)` des oxydes métalliques pour choisir le réducteur (`C`, `CO`, `Al`) et la température de fusion optimaux.
- **Biophysique :** la stabilité d'une protéine repliée (`ΔG_repliement`, typiquement de `−20 à −60 kJ/mol`) quantifie sa résistance thermique ou mutationnelle.

### Pièges fréquents et approximations à surveiller

L'erreur la plus répandue reste la **confusion entre `kJ` et `J`** : saisir `-198,75` au lieu de `-0,19875` dans `ΔG = ΔH − TΔS` produit un résultat erroné d'un facteur mille. Il faut aussi impérativement convertir la température en kelvins (`+ 273,15`).

Enfin, supposer `ΔH°` et `ΔS°` indépendants de `T` reste une approximation valide sur quelques dizaines de kelvins ; sur des écarts thermiques supérieurs à `200 K`, les calculs de haute précision intègrent les capacités calorifiques (`ΔCp`) via les lois de Kirchhoff.
