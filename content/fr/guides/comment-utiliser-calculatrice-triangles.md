---
title: "Comment Utiliser la Calculatrice de Triangles pour la Géométrie et la Trigonométrie"
description: "Mode d'emploi complet de la calculatrice de triangles : choix des entrées (CCC, CAC, ACA, CCA), degrés vs radians, résolution du cas ambigu et vérification trigonométrique."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "triangle-calculator"
faqs:
  - question: "Quelles combinaisons de données minimales faut-il saisir pour résoudre un triangle ?"
    answer: "Tout triangle plan possède six éléments principaux (trois côtés et trois angles). Il faut saisir exactement trois paramètres indépendants, dont au moins une longueur de côté : CCC (trois côtés), CAC (deux côtés et l'angle compris), ACA ou AAC (deux angles et un côté), ou CCA (deux côtés et un angle non compris)."
  - question: "Pourquoi la calculatrice refuse-t-elle parfois trois longueurs valides en apparence ?"
    answer: "Pour qu'un triangle existe dans le plan euclidien, l'inégalité triangulaire doit être strictement respectée : la somme des longueurs de deux côtés quelconques doit dépasser celle du troisième côté. Par exemple, des côtés de 3 cm, 4 cm et 8 cm ne peuvent jamais se rejoindre (3 + 4 < 8)."
  - question: "Comment interpréter deux résultats affichés dans le cas CCA ?"
    answer: "Lorsque vous connaissez deux côtés a, b et un angle opposé A tel que b × sin(A) < a < b, deux triangles géométriquement valides partagent exactement ces mêmes mesures : l'un possède un angle B aigu et l'autre un angle B' = 180° − B obtus. Vous devez choisir la solution compatible avec votre plan ou votre relevé terrain."
  - question: "Faut-il saisir les angles en degrés ou en radians ?"
    answer: "Vérifiez toujours le sélecteur d'unité avant de lancer le calcul. En topographie, architecture et géométrie scolaire, les angles s'expriment en degrés (somme égale à 180°). En analyse mathématique et programmation, les radians prédominent (somme égale à π rad ≈ 3,14159 rad). Une erreur d'unité fausse intégralement les sinus et cosinus."
  - question: "Peut-on résoudre un triangle en ne connaissant que ses trois angles (AAA) ?"
    answer: "Non, la configuration AAA définit uniquement la forme du triangle (une infinité de triangles semblables partageant les mêmes proportions), mais pas son échelle. Sans la longueur d'au moins un côté, d'une hauteur ou d'une surface, il est impossible de déterminer les dimensions réelles."
---

La **calculatrice de triangles** automatise la résolution complète d'un triangle plan à partir de trois mesures connues, en fournissant les côtés manquants, les trois angles intérieurs, le périmètre, les hauteurs et la surface. Pour obtenir un résultat fiable, vous devez sélectionner la bonne configuration d'entrée et respecter les conditions d'existence géométrique.

L'outil enchaîne les lois trigonométriques adaptées aux données saisies : le théorème de Pythagore pour les triangles rectangles, la loi des cosinus (théorème d'Al-Kashi) pour les configurations à trois côtés ou à angle compris, et la loi des sinus dès qu'un couple côté-angle opposé est connu.

## Principes de fonctionnement et règles de validation

Avant de résoudre les équations, la calculatrice vérifie deux contraintes euclidiennes strictes :

- **Somme des angles intérieurs :** `A + B + C = 180°` (soit `π rad`), avec chaque angle strictement compris entre `0°` et `180°`.
- **Inégalité triangulaire :** `a + b > c`, `a + c > b` et `b + c > a`, où les côtés `a, b, c` font respectivement face aux angles `A, B, C`.

### Les lois mobilisées selon vos entrées

1. **Triangle rectangle (`C = 90°`) :** le théorème de Pythagore (`a² + b² = c²`) et les rapports trigonométriques `sin(A) = a / c`, `cos(A) = b / c`, `tan(A) = a / b` déterminent immédiatement les inconnues.
2. **Loi des sinus :** `a / sin(A) = b / sin(B) = c / sin(C) = 2R` résout directement les configurations **ACA**, **AAC** et **CCA**, où `R` représente le rayon du cercle circonscrit.
3. **Loi des cosinus (Al-Kashi) :** `c² = a² + b² − 2ab × cos(C)` résout le cas **CAC**, et son inversion `cos(C) = (a² + b² − c²) / (2ab)` détermine les angles dans le cas **CCC**.
4. **Surface :** selon les grandeurs disponibles, l'outil applique `S = (a × b × sin(C)) / 2` ou la formule de Héron `S = √[s(s − a)(s − b)(s − c)]` avec le demi-périmètre `s = (a + b + c) / 2`.

## Exemple pratique pas à pas : résoudre le cas ambigu (CCA)

Le mode **CCA** (deux côtés et un angle non compris) génère zéro, une ou deux solutions selon les longueurs en présence. Supposons un relevé de charpente où `a = 7,00 m`, `b = 10,00 m` et l'angle opposé au côté `a` vaut `A = 30°`.

### Étape 1 : Tester la hauteur minimale

La calculatrice évalue d'abord la hauteur orthogonale issue du sommet `C` :

`h = b × sin(A) = 10,00 × sin(30°) = 5,00 m`

Comme `h < a < b` (`5,00 < 7,00 < 10,00`), le côté `a` coupe la droite de base en deux points possibles de part et d'autre du pied de la hauteur : **deux triangles géométriquement valides coexistent**.

### Étape 2 : Calculer les deux solutions via la loi des sinus

On isole d'abord le sinus de l'angle `B` : `sin(B) = (b × sin(A)) / a = (10,00 × 0,5) / 7,00 ≈ 0,714286`.

- **Solution 1 (`B₁` aigu) :** `B₁ = arcsin(0,714286) ≈ 45,58°`.
  - Troisième angle : `C₁ = 180° − 30° − 45,58° = 104,42°`.
  - Troisième côté : `c₁ = 7,00 × sin(104,42°) / 0,5 ≈ 13,56 m`.
  - Surface correspondante : `S₁ = 0,5 × 7,00 × 10,00 × sin(104,42°) ≈ 33,90 m²`.

- **Solution 2 (`B₂` obtus) :** comme deux angles supplémentaires ont le même sinus, `B₂ = 180° − 45,58° = 134,42°` reste valide puisque `A + B₂ = 164,42° < 180°`.
  - Troisième angle : `C₂ = 180° − 30° − 134,42° = 15,58°`.
  - Troisième côté : `c₂ = 7,00 × sin(15,58°) / 0,5 ≈ 3,76 m`.
  - Surface correspondante : `S₂ = 0,5 × 7,00 × 10,00 × sin(15,58°) ≈ 9,40 m²`.

## Tableau comparatif des modes de saisie de la calculatrice

| Mode | Paramètres saisis | Loi principale | Solutions | Cas d'application typique |
|---|---|---|---|---|
| **CCC** | 3 côtés (`a, b, c`) | Al-Kashi + Héron | 0 ou 1 | Arpentage par chaînage des bords d'une parcelle |
| **CAC** | 2 côtés + angle compris (`a, b, C`) | Al-Kashi → Sinus | 1 unique | Implantation d'une ferme ou visée au théodolite |
| **ACA** | 2 angles + côté compris (`A, c, B`) | Somme à 180° → Sinus | 1 unique | Mesure indirecte d'une largeur de cours d'eau |
| **AAC** | 2 angles + côté opposé (`A, B, a`) | Somme à 180° → Sinus | 1 unique | Calculs de pente et triangulation cartographique |
| **CCA** | 2 côtés + angle opposé (`a, b, A`) | Sinus + test de `h` | 0, 1 ou 2 | Cinématique de bielles et bras articulés |
| **AAA** | 3 angles (`A, B, C`) | Homothétie seule | Infinité | Contrôle de similitude sans échelle réelle |

## Applications pratiques et erreurs courantes à éviter

En **menuiserie, charpente et architecture**, l'outil vérifie l'équerrage par la règle du `3-4-5`, calcule les longueurs exactes d'arbalétriers et détermine les angles de coupe des assemblages. En **topographie et génie civil**, les configurations ACA et AAC permettent d'évaluer des distances inaccessibles par visée angulaire depuis une base mesurée au télémètre laser.

Pour garantir l'exactitude de vos résultats, évitez quatre erreurs de manipulation fréquentes :

1. **Inverser angle inclus et angle opposé :** confondre les modes CAC et CCA modifie totalement le triangle calculé ; vérifiez toujours sur votre schéma que l'angle `C` fait bien face au côté `c`.
2. **Mélanger les unités de longueur ou d'angle :** convertissez tous les côtés dans une même unité (mètres ou centimètres) et contrôlez le sélecteur degrés/radians avant de valider.
3. **Arrondir les valeurs intermédiaires :** tronquer `sin(B)` à deux décimales (`0,71` au lieu de `0,714286`) décale l'angle `B` de près d'un demi-degré et fausse le côté `c` de plusieurs centimètres.
4. **Ignorer les angles obtus avec `arcsin` :** la fonction `arcsin` renvoie exclusivement des angles aigus (`≤ 90°`) ; pour l'angle opposé au plus grand côté d'un triangle, privilégiez la loi des cosinus (`arccos`).

Lancez vos résolutions directement dans notre [calculatrice de triangles](/fr/calculatrices/calculatrice-de-triangle).
