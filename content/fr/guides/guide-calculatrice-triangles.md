---
title: "Guide de la Calculatrice de Triangles : Côtés, Angles et Surface"
description: "Une référence complète pour résoudre n'importe quel triangle en utilisant les lois trigonométriques, le théorème de Pythagore et la formule de Héron."
category: "Math & Science"
readingTime: 7
lastUpdated: "2026-06-11"
relatedCalculator: "triangle-calculator"
---

## Qu'est-ce qu'un Triangle ?

Un triangle est un polygone avec trois côtés et trois angles. La somme de tous les angles intérieurs est toujours exactement de **180°**.

Les triangles sont classés de deux manières :
- **Par angles :** Aigu (< 90°), Rectangle (= 90°), Obtus (> 90°)
- **Par côtés :** Équilatéral, Isocèle, Scalène (quelconque)

## Le Théorème de Pythagore (Triangles Rectangles)

Pour tout triangle rectangle avec des cathètes **a** et **b** et l'hypoténuse **c** :
$$
a^2 + b^2 = c^2
$$

### Rapports Trigonométriques (SOH-CAH-TOA)
$$
\sin\theta = \frac{O}{H}, \quad \cos\theta = \frac{A}{H}, \quad \tan\theta = \frac{O}{A}
$$

## Loi des Sinus

S'applique à **n'importe quel** triangle :
$$
\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C}
$$
**À utiliser lorsque :** Vous connaissez deux angles et un côté (AAC ou ACA), ou deux côtés et un angle opposé (CCA).

## Loi des Cosinus

Généralise le théorème de Pythagore :
$$
c^2 = a^2 + b^2 - 2ab \cdot \cos C
$$
**À utiliser lorsque :** Vous connaissez trois côtés (CCC) ou deux côtés et l'angle inclus (CAC).

## Formule de Héron pour la Surface

Lorsque vous connaissez les trois côtés (CCC) :
$$
s = \frac{a + b + c}{2}
$$
$$
A = \sqrt{s(s-a)(s-b)(s-c)}
$$

## Tableau de Décision — Quelle Méthode Utiliser ?

| Informations | Configuration | Méthode |
|---|---|---|
| Trois côtés | CCC | Loi des Cosinus → Héron |
| 2 côtés + angle inclus | CAC | Loi des Cosinus → Loi des Sinus |
| 2 angles + côté | AAC ou ACA | Loi des Sinus |
| 2 côtés + angle non inclus| CCA | Loi des Sinus (cas ambigu) |
| Trois angles | AAA | Forme déterminée mais pas la taille |

## Questions Fréquemment Posées

**Q : Qu'est-ce que le cas ambigu (CCA) ?**
R : Avec deux côtés et un angle non inclus, la loi des sinus peut produire 0, 1 ou 2 triangles valides.

**Q : Puis-je utiliser la loi des cosinus pour les triangles rectangles ?**
R : Oui. Lorsque C = 90°, cos(90°) = 0, et la formule se réduit à Pythagore.
