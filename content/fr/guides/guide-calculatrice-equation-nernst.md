---
title: "Calculatrice de l'Équation de Nernst : Électrochimie"
description: "Calculez le potentiel réel d'électrode E en conditions non standards avec l'équation de Nernst : constantes R et F, facteur 0,05916 V à 25 °C, quotient Q et exemple sur la pile Daniell."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "nernst-equation-calculator"
faqs:
  - question: "Pourquoi utilise-t-on souvent la constante 0,05916 V avec log₁₀ à 25 °C ?"
    answer: "L'équation fondamentale emploie le logarithme népérien ln(Q). À 25 °C (298,15 K), le regroupement (R × T × ln(10)) / F vaut (8,31446 × 298,15 × 2,302585) / 96 485,33 ≈ 0,05916 V. Cette conversion facilite les calculs manuels en pH-métrie et en chimie analytique, mais elle n'est rigoureusement valable qu'à 25 °C."
  - question: "Que devient l'équation de Nernst lorsque la pile est totalement déchargée à l'équilibre ?"
    answer: "Lorsque la réaction rédox atteint l'équilibre chimique, le courant net s'annule et le potentiel réel de la cellule tombe à E = 0 V. Le quotient réactionnel Q devient alors égal à la constante d'équilibre thermodynamique K, ce qui donne E° = [(R × T) / (n × F)] × ln(K)."
  - question: "Quelles espèces chimiques doivent figurer dans le quotient réactionnel Q ?"
    answer: "Q rassemble les activités (approximées par les concentrations molaires en mol/L pour les solutés aqueux et les pressions partielles en bar pour les gaz) des produits divisées par celles des réactifs, chacune élevée à son coefficient stœchiométrique. Les solides purs (électrodes métalliques) et le solvant pur (eau) ont une activité unitaire et n'apparaissent pas dans Q."
  - question: "Comment la température modifie-t-elle le potentiel prédit par l'équation de Nernst ?"
    answer: "La température absolue T (en Kelvin) multiplie directement le terme correctif (R × T) / (n × F). Si Q > 1 (pile partiellement déchargée), une hausse de température accentue la chute de tension par rapport à E° ; si Q < 1, elle augmente légèrement E, sous réserve que E° lui-même varie peu sur l'intervalle thermique étudié."
  - question: "Pourquoi la tension mesurée aux bornes d'une batterie en fonctionnement est-elle inférieure au potentiel de Nernst ?"
    answer: "L'équation de Nernst prédit le potentiel d'équilibre thermodynamique à courant nul, appelé tension en circuit ouvert (OCV). Dès qu'un courant I circule, des pertes irréversibles apparaissent : chute ohmique liée à la résistance interne (r × I), surtensions d'activation cinétique aux électrodes et polarisation de concentration."
---

L'**équation de Nernst**, établie en 1889 par Walther Nernst, relie la thermodynamique à l'électrochimie en calculant le **potentiel réel d'une électrode ou d'une pile (`E`)** lorsque les concentrations, les pressions ou la température s'écartent des conditions standards (`1 mol/L`, `1 bar`, `298,15 K`). Tandis que le potentiel standard (`E°`) décrit une référence figée, l'équation de Nernst suit la chute progressive de tension à mesure que les réactifs se consomment.

Notre [Calculatrice de l'Équation de Nernst](/fr/calculatrices/calculateur-d-equation-de-nernst) automatise ce calcul à toute température `T` avec les constantes physiques exactes (`R` et `F`), le nombre d'électrons échangés `n` et le quotient réactionnel `Q`. Vous obtenez immédiatement la tension en circuit ouvert d'une pile, le potentiel d'une demi-cellule analytique ou la limite d'inversion d'un couple rédox.

## Formulation mathématique et paramètres fondamentaux

Sous sa forme générale, l'équation de Nernst retranche au potentiel standard `E°` un terme proportionnel à la température et au logarithme népérien du quotient réactionnel :

```text
Forme générale (ln)       : E = E° − [(R × T) / (n × F)] × ln(Q)
Forme décimale à 25 °C    : E = E° − (0,05916 / n) × log₁₀(Q)
Constante des gaz R       : 8,31446 J/(mol·K)
Constante de Faraday F    : 96 485,33 C/mol
Température absolue T     : T (K) = T (°C) + 273,15
Lien avec l'équilibre K   : E° = [(R × T) / (n × F)] × ln(K)  (pour E = 0 V)
```

### Définition rigoureuse des variables d'entrée

Chaque grandeur doit être saisie dans les unités du Système international pour fournir un résultat exact en volts (`V`) :

- **`E°` (V) :** potentiel standard de la cellule (`E°_cathode − E°_anode`) ou potentiel standard de réduction d'une demi-pile, tabulé à `25 °C`.
- **`T` (K) :** température absolue en kelvins (`25 °C = 298,15 K`). L'emploi direct des degrés Celsius fausse totalement le calcul.
- **`n` (sans unité) :** nombre stœchiométrique d'électrons transférés dans l'équation équilibrée (par exemple `n = 2` pour la pile Daniell).
- **`Q` (sans unité) :** quotient réactionnel (`[Produits]^p / [Réactifs]^r`) incluant uniquement les espèces dissoutes et gazeuses, à l'exclusion des solides purs et de l'eau solvant.

Si `Q < 1` (excès de réactifs), `ln(Q) < 0` et `E > E°`. Si `Q = 1`, `E = E°`. Si `Q > 1` (pile en décharge), `ln(Q) > 0` et `E < E°`.

## Exemple numérique détaillé : pile Daniell à 35 °C

Étudions une pile Daniell (`Zn(s) | Zn²⁺(aq) || Cu²⁺(aq) | Cu(s)`) d'équation `Zn(s) + Cu²⁺(aq) ⇌ Zn²⁺(aq) + Cu(s)`, avec `n = 2` et `E° = +1,100 V`. Supposons qu'elle fonctionne à `35 °C` après une décharge partielle, avec `[Cu²⁺] = 0,020 mol/L` et `[Zn²⁺] = 1,50 mol/L`.

1. **Conversion de `T` en kelvins :** `T = 35 + 273,15 = 308,15 K`. Le raccourci `0,05916 V` étant réservé à `25 °C`, on utilise la formule complète en `ln`.
2. **Calcul du quotient `Q` :** les métaux solides ayant une activité de `1`, `Q = [Zn²⁺] / [Cu²⁺] = 1,50 / 0,020 = 75,0`.
3. **Facteur pré-logarithmique :** `(R × T) / (n × F) = (8,31446 × 308,15) / (2 × 96 485,33) ≈ 0,013277 V`.
4. **Potentiel réel `E` :** avec `ln(75,0) ≈ 4,3175`, la chute vaut `0,013277 × 4,3175 ≈ 0,0573 V`, soit `E = 1,100 − 0,0573 = 1,043 V`.

## Tableau d'évolution du potentiel de la pile Daniell à 25 °C (E° = 1,100 V, n = 2)

Ce tableau retrace l'évolution de `E` en fonction du quotient `Q = [Zn²⁺] / [Cu²⁺]` à `25 °C`, de la surcharge en réactif jusqu'à l'équilibre final :

| Quotient Q | log₁₀(Q) | Terme −(0,05916 / 2) × log₁₀(Q) | Potentiel E (V) | État de la pile |
| :--- | :--- | :--- | :--- | :--- |
| `1,0 × 10⁻⁴` | `−4` | `+0,1183 V` | `1,218 V` | Forte concentration en `Cu²⁺` |
| `1,0 × 10⁻²` | `−2` | `+0,0592 V` | `1,159 V` | Réactifs majoritaires (`E > E°`) |
| `1,0` | `0` | `0,0000 V` | `1,100 V` | Conditions standards (`E = E°`) |
| `1,0 × 10²` | `+2` | `−0,0592 V` | `1,041 V` | Décharge partielle |
| `1,0 × 10⁶` | `+6` | `−0,1775 V` | `0,923 V` | Déplétion marquée en `Cu²⁺` |
| `1,54 × 10³⁷` (`= K`) | `+37,19` | `−1,1000 V` | `0,000 V` | Équilibre atteint (pile usée) |

## Applications analytiques, erreurs fréquentes et limites du modèle

L'équation de Nernst fonde de nombreux capteurs et modèles électrochimiques :

- **pH-métrie et sondes ioniques (ISE) :** une électrode de verre suit linéairement le `pH` avec une pente théorique de `−59,16 mV` par unité de `pH` à `25 °C`. Les électrodes à fluorures (`F⁻`) ou à calcium exploitent la même loi logarithmique.
- **Gestion des batteries (BMS) :** la modélisation de la tension en circuit ouvert (OCV) selon l'état de charge (SoC) des cellules lithium-ion s'appuie sur des relations nernstiennes d'intercalation.
- **Électrophysiologie :** le potentiel d'équilibre transmembranaire de chaque ion (`K⁺` vers `−90 mV`, `Na⁺` vers `+60 mV`) détermine l'excitabilité neuronale.

### Pièges courants et précautions expérimentales

La faute la plus courante consiste à associer le facteur `0,05916` au logarithme népérien `ln(Q)` (au lieu de `log₁₀(Q)`), ou inversement d'utiliser `RT / (nF)` avec `log₁₀(Q)` sans multiplier par `ln(10) ≈ 2,3026`. Oublier `n` au dénominateur ou inclure les solides purs dans `Q` fausse également le résultat.

Enfin, au-delà d'une force ionique de `0,1 mol/L`, assimiler les activités aux concentrations molaires devient approximatif : il faut introduire les coefficients d'activité (loi de Debye-Hückel) et tenir compte de la variation thermique propre de `E°` loin de `25 °C`.
