---
title: "Comment Fonctionne la Calculatrice de Demi-Vie (Désintégration Radioactive)"
description: "Un guide complet sur la demi-vie : la formule de désintégration exponentielle, comment trouver la quantité restante ou le temps écoulé, et des exemples."
category: "Math & Science"
readingTime: 6
lastUpdated: "2026-06-11"
relatedCalculator: "half-life-calculator"
---

## Qu'est-ce que la Demi-Vie ?

La **demi-vie** (symbole : t½) est le temps nécessaire pour qu'exactement la moitié d'une quantité d'une substance radioactive subisse une désintégration nucléaire. C'est une propriété caractéristique de chaque isotope radioactif — constante et indépendante de la température, de la pression ou de la forme chimique.

Après une demi-vie, il en reste 50 %. Après deux demi-vies, 25 %. Après trois, 12,5 % — et ainsi de suite. Il s'agit d'une **désintégration exponentielle**.

## Les Formules

### Formule Principale de Désintégration Exponentielle
$$
N(t) = N_0 \times \left(\frac{1}{2}\right)^{\frac{t}{t_{1/2}}}
$$
Où :
- **N(t)** = quantité restante au temps *t*
- **N₀** = quantité initiale
- **t** = temps écoulé
- **t½** = demi-vie de l'isotope

### Forme Alternative (Constante de Désintégration)
La constante de désintégration **λ (lambda)** représente la probabilité par unité de temps qu'un atome donné se désintègre.
$$
\lambda = \frac{\ln(2)}{t_{1/2}} \approx \frac{0,6931}{t_{1/2}}
$$
$$
N(t) = N_0 \times e^{-\lambda t}
$$

## Guide Étape par Étape

### Étape 1 — Identifiez l'Isotope et sa Demi-Vie
Recherchez la demi-vie de votre isotope. Assurez-vous que les unités de temps sont cohérentes.

### Étape 2 — Déterminez ce que Vous Savez
Identifiez les trois des quatre variables (N₀, N(t), t, t½) dont vous disposez.

### Étape 3 — Sélectionnez le Mode
Dans la Calculatrice de Demi-Vie, sélectionnez l'onglet correspondant à ce que vous voulez trouver.

### Étape 4 — Entrez vos Valeurs
La calculatrice accepte n'importe quelle unité de temps (secondes, heures, années).

## Tableau de Référence — Isotopes Courants

| Isotope | Symbole | Demi-Vie | Utilisation Principale |
|---|---|---|---|
| Carbone-14 | ¹⁴C | 5 730 ans | Datation archéologique |
| Uranium-238 | ²³⁸U | 4,47 milliards | Datation géologique |
| Iode-131 | ¹³¹I | 8,02 jours | Traitement du cancer de la thyroïde |
| Technétium-99m | ⁹⁹ᵐTc | 6,0 heures | Imagerie médicale |

## Questions Fréquemment Posées

**Q : La demi-vie change-t-elle avec la température ou l'environnement chimique ?**
R : Non. La désintégration nucléaire est une propriété du noyau.

**Q : Pourquoi utilise-t-on la "demi-vie" au lieu du "temps de désintégration total" ?**
R : Parce que les substances radioactives n'atteignent jamais complètement zéro — la désintégration est asymptotique.
