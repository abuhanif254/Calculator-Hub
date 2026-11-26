---
title: "Graphiques de Fonctions : Paraboles et Pentes"
description: "Maîtrisez le tracé des fonctions affines et quadratiques : coefficient directeur, ordonnée à l'origine, discriminant, sommet d'une parabole et racines."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "graphing-calculator"
relatedType: "calculator"
faqs:
  - question: "Quelle est la différence entre une fonction linéaire et une fonction affine ?"
    answer: "Une fonction affine s'écrit f(x) = m × x + b et trace une droite quelconque non verticale. La fonction linéaire en est le cas particulier où b = 0 (f(x) = m × x), ce qui signifie que la droite passe par l'origine O(0 ; 0) et traduit une proportionnalité stricte."
  - question: "Comment interpréter le signe et la valeur de la pente m sur un graphique ?"
    answer: "Si m > 0, la droite est croissante de gauche à droite ; si m < 0, elle est décroissante ; si m = 0, elle est horizontale. Numériquement, m indique de combien d'unités varie l'ordonnée y lorsque l'abscisse x augmente de +1 vers la droite."
  - question: "Comment trouver rapidement le sommet d'une parabole sans dériver ?"
    answer: "Pour f(x) = a × x² + b × x + c (a ≠ 0), l'abscisse du sommet vaut toujours h = −b ÷ (2a), et son ordonnée vaut k = f(h). Ce point correspond à un minimum global si a > 0 (parabole en U) ou à un maximum global si a < 0 (parabole en cloche)."
  - question: "Que signifie un discriminant Δ négatif sur le tracé d'une parabole ?"
    answer: "Lorsque Δ = b² − 4ac est strictement négatif, l'équation f(x) = 0 n'admet aucune racine réelle. Graphiquement, la parabole ne coupe jamais l'axe des abscisses : elle reste entièrement au-dessus de cet axe si a > 0, ou entièrement en dessous si a < 0."
  - question: "Pourquoi une pente égale à 1 ne forme-t-elle pas toujours un angle de 45° à l'écran ?"
    answer: "Une droite de pente m = 1 ne forme un angle de 45° que dans un repère orthonormé, où l'échelle visuelle de l'axe X est identique à celle de l'axe Y. Si votre fenêtre de zoom étire un axe par rapport à l'autre, les angles et la perpendicularité sont visuellement déformés."
---

Tracer le **graphique d'une fonction** transforme une expression algébrique en une géométrie immédiatement exploitable : taux de variation, seuils d'équilibre, extrema et intersections deviennent lisibles d'un coup d'œil. En physique, en économie et en ingénierie, deux familles dominent : les **fonctions affines** (droites de pente constante) et les **fonctions quadratiques** (paraboles symétriques).

Pour interpréter avec rigueur un tracé numérique, vous devez relier chaque coefficient de l'équation à son rôle géométrique : pente, ordonnée à l'origine, concavité, sommet et discriminant. Notre [Calculatrice Graphique](/fr/calculatrices/calculatrice-graphique) permet de superposer plusieurs courbes et de lire leurs points remarquables en temps réel.

## Équations fondamentales : droites et paraboles

L'analyse graphique repose sur les formes développées et canoniques suivantes :

```text
Fonction affine (droite) : f(x) = m × x + b
  Pente (coeff. directeur) : m = (y₂ − y₁) ÷ (x₂ − x₁)  (x₂ ≠ x₁)
  Racine (coupe axe Ox)    : x₀ = −b ÷ m                (m ≠ 0)
  Droites perpendiculaires : m₁ × m₂ = −1

Fonction quadratique     : f(x) = a × x² + b × x + c    (a ≠ 0)
  Forme canonique          : f(x) = a × (x − h)² + k
  Sommet S(h ; k)          : h = −b ÷ (2a)  ;  k = f(h) = c − b² ÷ (4a)
  Discriminant             : Δ = b² − 4ac
  Racines réelles (Δ ≥ 0)  : x₁,₂ = (−b ± √Δ) ÷ (2a)
  Pente de la tangente     : f'(x) = 2ax + b
```

### Rôle exact des coefficients

- **Coefficient directeur `m` :** variation constante entre `A(x₁ ; y₁)` et `B(x₂ ; y₂)`, soit `Δy ÷ Δx`.
- **Ordonnée à l'origine `b` (ou `c`) :** valeur `f(0)` à l'intersection avec l'axe `Oy`.
- **Paramètre `a` :** gouverne l'orientation (en U si `a > 0`, en cloche si `a < 0`) et l'ouverture autour de `x = h`.
- **Discriminant `Δ` :** détermine le nombre de racines réelles (`2` si `Δ > 0`, `1` si `Δ = 0`, aucune si `Δ < 0`).

## Exemple numérique complet : parabole et droite sécante

Étudions la parabole `f(x) = −0,5x² + 3x + 3,5` et la droite `g(x) = −0,5x + 6,5`.

### Étape 1 : Sommet et allure de `f(x)`

Avec `a = −0,5`, `b = 3` et `c = 3,5`, `a < 0` indique une parabole tournée vers le bas admettant un maximum :

- Abscisse du sommet : `h = −3 ÷ (2 × (−0,5)) = −3 ÷ (−1) = 3` ;
- Ordonnée du sommet : `k = f(3) = −0,5 × 9 + 3 × 3 + 3,5 = −4,5 + 9 + 3,5 = 8`.

Le sommet est donc `S(3 ; 8)`, avec un axe de symétrie vertical `x = 3` et une ordonnée à l'origine `f(0) = 3,5`.

### Étape 2 : Racines via le discriminant

`Δ = 3² − 4 × (−0,5) × 3,5 = 9 + 7 = 16`, d'où `√Δ = 4`. Les deux intersections avec l'axe `Ox` valent :

- `x₁ = (−3 + 4) ÷ (−1) = −1` ;
- `x₂ = (−3 − 4) ÷ (−1) = 7`.

La moyenne `(−1 + 7) ÷ 2 = 3` confirme l'abscisse `h = 3` du sommet.

### Étape 3 : Intersections avec `g(x)` et tangente en `x = 1`

Résolvons `f(x) = g(x)` : `−0,5x² + 3x + 3,5 = −0,5x + 6,5`, soit `−0,5x² + 3,5x − 3 = 0`. En multipliant par `−2`, `x² − 7x + 6 = 0` se factorise en `(x − 1)(x − 6) = 0`. Les points communs sont :

- `g(1) = −0,5(1) + 6,5 = 6` → `P₁(1 ; 6)` ;
- `g(6) = −0,5(6) + 6,5 = 3,5` → `P₂(6 ; 3,5)`.

Au point `P₁`, la pente instantanée de la parabole vaut `f'(1) = 2 × (−0,5) × 1 + 3 = 2`, contre `m = −0,5` pour la droite sécante.

## Typologie visuelle et propriétés des courbes

| Type de fonction | Équation type | Allure / Concavité | Racines (`y = 0`) | Exemple d'application |
| :--- | :--- | :--- | :--- | :--- |
| **Affine croissante (`m > 0`)** | `y = 2,5x − 5` | Droite montante de pente `+2,5` | `1` racine (`x₀ = 2`) | Coût total = coût variable + frais fixes |
| **Constante (`m = 0`)** | `y = 4` | Droite horizontale de pente nulle | `0` racine (sauf `y = 0`) | Abonnement forfaitaire sans part variable |
| **Droite verticale** | `x = 3` | Pente non définie (non fonctionnelle) | `1` point en `(3 ; 0)` | Plafond de capacité ou asymptote |
| **Parabole convexe (`a > 0, Δ > 0`)** | `y = x² − 4x + 3` | En U ; minimum en `S(2 ; −1)` | `2` racines (`1` et `3`) | Coût moyen unitaire avec seuil optimal |
| **Parabole tangente (`a < 0, Δ = 0`)** | `y = −2x² + 8x − 8` | En cloche ; maximum en `S(2 ; 0)` | `1` racine double (`2`) | Point de tangence sur un niveau critique |
| **Parabole sans racine (`a > 0, Δ < 0`)** | `y = x² + 2x + 5` | En U ; minimum en `S(−1 ; 4)` | `0` racine réelle | Énergie potentielle strictement positive |

## Erreurs fréquentes et limites numériques

La lecture d'un tracé informatique comporte quatre pièges récurrents :

- **Confondre `−x²` et `(−x)²` :** par priorité opératoire, `−x²` signifie `−(x²)` (toujours `≤ 0`), alors que `(−x)² = x²` reste positif ou nul.
- **Inverser `Δx` et `Δy` :** placer `(x₂ − x₁)` au numérateur donne l'inverse de la pente réelle.
- **Fenêtre de zoom inadaptée :** une parabole très ouverte (`a = 0,01`) ou décalée (`h = 250`) peut paraître rectiligne ou sortir du cadre `[−10 ; 10]`. Centrez toujours la vue sur le sommet `(h ; k)` calculé.
- **Précision flottante :** près d'une racine double (`Δ ≈ 0`), l'arithmétique IEEE 754 peut produire un résidu minuscule (comme `1,2 × 10⁻¹⁶`) ou masquer un point de tangence si la résolution d'échantillonnage est insuffisante.
