---
title: "La Physique du Travail : Force et Déplacement"
description: "Maîtrisez le calcul du travail mécanique (W = F × d × cos θ) : travail moteur, résistant et nul, exemple chiffré de manutention, tableau des régimes angulaires et utilisation de notre calculatrice."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "work-calculator"
relatedType: "calculator"
faqs:
  - question: "Pourquoi soutenir une charge lourde immobile correspond-il à un travail mécanique nul ?"
    answer: "En physique, le travail mécanique exige un déplacement du point d'application de la force (W = F × d × cos θ). Si vous maintenez une caisse immobile à bout de bras, d = 0 m et donc W = 0 J. Vos muscles consomment néanmoins de l'énergie chimique (ATP) par micro-contractions isométriques répétées, intégralement dissipée en chaleur."
  - question: "Que signifie un travail négatif (travail résistant) en physique ?"
    answer: "Un travail est négatif lorsque l'angle θ entre la force et le déplacement est compris entre 90° et 180° (cos θ < 0). La force s'oppose alors au mouvement et retire de l'énergie mécanique au système : c'est le cas des freins d'un véhicule ou de la force de frottement qui ralentissent un objet en le chauffant."
  - question: "Quelle est la différence entre le travail d'une force constante et celui d'une force variable ?"
    answer: "La formule W = F × d × cos(θ) ne s'applique directement que si la force reste constante en intensité et en direction sur un trajet rectiligne. Si la force varie avec la position, comme lors de la compression d'un ressort (F = k × x), il faut intégrer la force sur le déplacement : W = ∫ F(x) dx, soit W = ½ × k × x² pour un ressort idéal."
  - question: "Le travail d'une force dépend-il du chemin suivi ?"
    answer: "Cela dépend de la nature de la force. Pour une force conservative comme le poids ou la force élastique d'un ressort, le travail ne dépend que des points de départ et d'arrivée. Pour une force non conservative comme le frottement solide ou la traînée aérodynamique, plus la trajectoire est longue, plus le travail résistant négatif est élevé."
  - question: "Quel est le lien exact entre le travail mécanique et l'énergie cinétique ?"
    answer: "Selon le théorème de l'énergie cinétique, la somme algébrique des travaux de toutes les forces extérieures appliquées à un solide est égale à la variation de son énergie cinétique : ΣW = ΔE_c = ½ × m × v_f² − ½ × m × v_i². Un travail net positif accélère le mobile, tandis qu'un travail net négatif le décélère."
---

En physique, le **travail mécanique** (`W`) quantifie l'énergie transférée lorsqu'une force déplace son point d'application. Contrairement au langage courant, pousser un mur immobile demande un effort physiologique mais produit un travail mécanique nul (`W = 0 J`), car aucun déplacement n'est engendré.

Notre [Calculatrice de Travail](/fr/calculatrices/calculateur-de-travail) évalue instantanément le travail en joules (`J`) à partir de la force (`F`), du déplacement (`d`) et de l'angle (`θ`) entre ces deux vecteurs, ou résout l'une des variables manquantes.

## Définition vectorielle et équation du travail mécanique

Pour une force constante appliquée sur un trajet rectiligne, le travail correspond au **produit scalaire** du vecteur force par le vecteur déplacement :

```text
Travail mécanique  : W = F × d × cos(θ)
Force appliquée    : F = W / [d × cos(θ)]
Distance parcourue : d = W / [F × cos(θ)]
```

- **`W` (Joules, `J`) :** énergie transférée (`1 J = 1 N·m`).
- **`F` (Newtons, `N`) :** intensité de la force constante exercée.
- **`d` (mètres, `m`) :** longueur du déplacement rectiligne.
- **`θ` (degrés ou radians) :** angle orienté entre la force et le déplacement.

### Travail moteur, travail nul et travail résistant

Le signe de `cos(θ)` classe l'effet énergétique de chaque force :

1. **Travail moteur (`0° ≤ θ < 90°`, `W > 0`) :** la force accompagne le mouvement et fournit de l'énergie mécanique au système.
2. **Travail nul (`θ = 90°` ou `d = 0`, `W = 0`) :** toute force perpendiculaire au trajet (poids sur terrain plat, réaction normale) ne modifie pas la vitesse.
3. **Travail résistant (`90° < θ ≤ 180°`, `W < 0`) :** la force freine le mobile en prélevant de l'énergie, souvent dissipée en chaleur.

D'après le **théorème de l'énergie cinétique**, la somme algébrique des travaux égale la variation d'énergie cinétique : `ΣW = ΔE_c = ½ × m × v_f² − ½ × m × v_i²`.

## Exemple numérique : halage d'une caisse industrielle

Un opérateur tire une caisse de `m = 120 kg` sur `d = 25 m` sur un sol horizontal via une sangle inclinée à `θ = 30°` avec une tension `F = 350 N`. Une force de frottement horizontale `f = 220 N` s'oppose au glissement.

### Étape 1 : Travail de la traction, du poids et du frottement

- **Force de traction :** seule la composante horizontale travaille : `W_F = 350 × 25 × cos(30°) = 8 750 × 0,866025 ≈ 7 577,72 J` (`7,58 kJ`).
- **Poids et réaction normale :** perpendiculaires au sol plat (`θ = 90°`), donc `W_P = 0 J` et `W_N = 0 J`.
- **Frottement cinétique :** opposé au mouvement (`θ = 180°`, `cos 180° = −1`), soit `W_f = 220 × 25 × (−1) = −5 500 J` (`−5,50 kJ`).

### Étape 2 : Travail net et vitesse finale atteinte

Le travail résultant vaut `W_net = 7 577,72 − 5 500 = +2 077,72 J` (`2,08 kJ`). En partant du repos (`v_i = 0`), la caisse atteint au bout des `25 m` une vitesse :

`v_f = √(2 × W_net / m) = √(2 × 2 077,72 / 120) = √(34,6287) ≈ 5,88 m/s`.

## Tableau comparatif des régimes de travail selon l'angle

Ce tableau illustre l'impact de l'angle `θ` sur le transfert énergétique :

| Cas d'application | Force (`F`) | Distance (`d`) | Angle (`θ`) | `cos(θ)` | Travail (`W`) | Régime |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Levage vertical par palan | 2 000 N | 4,0 m | 0° | +1,000 | +8 000 J | Moteur maximal |
| Remorquage incliné à 30° | 350 N | 25 m | 30° | +0,866 | +7 578 J | Moteur partiel |
| Traction oblique à 60° | 180 N | 15 m | 60° | +0,500 | +1 350 J | Moteur (50 %) |
| Transport horizontal (poids) | 500 N | 20 m | 90° | 0,000 | 0 J | Travail nul |
| Descente freinée sur rampe | 600 N | 10 m | 150° | −0,866 | −5 196 J | Résistant partiel |
| Freinage d'urgence | 4 500 N | 18 m | 180° | −1,000 | −81 000 J | Résistant maximal |

## Applications pratiques, erreurs courantes et limites du modèle

Le travail mécanique sert à dimensionner les **systèmes de freinage** (`W = −ΔE_c`, afin d'estimer l'échauffement des disques lors d'un arrêt d'urgence), les **engins de manutention, ponts roulants et convoyeurs industriels**, ainsi que les cycles thermodynamiques des moteurs et compresseurs (`W = −P × ΔV` lors de la détente ou de la compression d'un fluide).

En biomécanique et en ergonomie du poste de travail, la distinction entre effort statique et travail mécanique éclaire également la conception des exosquelettes et des aides à la manutention : réduire la distance de portage ou orienter l'effort dans l'axe du déplacement diminue directement l'énergie mécanique exigée par la tâche.

Surveillez quatre pièges récurrents :

1. **Confondre degrés et radians :** évaluer `cos(30)` en mode radians renvoie `0,154` au lieu de `0,866`, faussant totalement le résultat.
2. **Saisir la masse au lieu du poids :** pour un levage vertical, convertissez d'abord `m` en force `F = m × g` (en newtons) avant de multiplier par la hauteur.
3. **Oublier l'invariance par le trajet pour le poids :** hisser `50 kg` de `3 m` demande `1 471,5 J` contre la gravité, que l'on monte verticalement ou par une rampe de `12 m` (hors frottements).
4. **Appliquer `F × d` à une force variable :** pour un ressort (`F = k × x`) ou une traînée évolutive, intégrez la force sur le trajet (`W = ½ × k × x²`).
