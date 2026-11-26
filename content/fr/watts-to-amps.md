---
title: "Convertisseur Watts en Ampères (W en A) : Formule DC, AC et tableau"
description: "Calculez l'intensité en ampères (A) depuis la puissance en watts (W) en courant continu (DC) ou alternatif (AC) avec facteur de puissance. Formule et tableau."
faqs:
  - question: "Comment convertir des watts (W) en ampères (A) sur une prise 230 V ?"
    answer: "En courant alternatif monophasé 230 V (standard européen), divisez la puissance en watts par la tension multipliée par le facteur de puissance : I = P ÷ (230 × FP). Pour un appareil purement résistif (radiateur, bouilloire) où FP = 1, divisez simplement les watts par 230."
  - question: "Pourquoi le facteur de puissance (cos φ) modifie-t-il le calcul en courant alternatif ?"
    answer: "Les appareils dotés de moteurs, transformateurs ou alimentations électroniques déphasent le courant par rapport à la tension. Pour fournir la même puissance active en watts, ils tirent un courant apparent plus élevé en ampères, proportionnellement à l'inverse du facteur de puissance."
  - question: "Quelle est la différence entre le calcul en courant continu (12 V / 48 V) et alternatif ?"
    answer: "En courant continu (batteries solaires 12 V, 24 V ou 48 V), il n'y a ni fréquence ni déphasage : la formule est directement I = P ÷ V. À puissance égale, un circuit 12 V demande presque vingt fois plus d'ampères qu'un circuit 230 V."
  - question: "Quel disjoncteur choisir pour une puissance donnée en watts ?"
    answer: "Calculez l'intensité maximale en ampères, puis appliquez une marge de sécurité pour les charges continues (souvent 80 % de la capacité nominale du disjoncteur). Par exemple, un appareil de 2 300 W sous 230 V tire 10 A et nécessite un disjoncteur de 16 A avec du câble de 1,5 mm² ou 2,5 mm²."
  - question: "Comment convertir des watts en ampères en courant triphasé ?"
    answer: "En triphasé équilibré (400 V entre phases en Europe), la formule intègre la racine carrée de 3 (environ 1,732) : I = P ÷ (V × 1,732 × FP). Pour un moteur de 5 000 W sous 400 V avec un facteur de puissance de 0,85, le courant par phase vaut environ 8,49 A."
---

Pour convertir une puissance électrique en watts (W) en intensité en ampères (A), la relation fondamentale repose sur la loi de puissance électrique : `I (A) = P (W) ÷ V (V)` en courant continu (DC), et `I (A) = P (W) ÷ (V × FP)` en courant alternatif monophasé (AC), où `FP` désigne le facteur de puissance (compris entre 0 et 1).

Cette conversion est indispensable pour dimensionner les disjoncteurs d'un tableau électrique, choisir la section des câbles en cuivre, vérifier la capacité d'un onduleur photovoltaïque ou sécuriser une installation sur batterie 12 V, 24 V ou 48 V. Un courant sous-estimé provoque un échauffement des conducteurs et des déclenchements intempestifs.

## Formule officielle et normes électriques (CEI et NF C 15-100)

Les unités impliquées appartiennent au Système international (SI) et sont encadrées par les normes de la Commission électrotechnique internationale (**CEI**) ainsi que par la norme française **NF C 15-100** pour les installations basse tension :

- **Courant continu (DC)** — batteries solaires, automobile, USB-C, parcs 12 V à 48 V :
  `I (A) = P (W) ÷ U (V)`
- **Courant alternatif monophasé (AC)** — prises domestiques 230 V (Europe) ou 120 V (Amérique du Nord) :
  `I (A) = P (W) ÷ (U (V) × FP)`
- **Courant alternatif triphasé équilibré (AC)** — ateliers, bornes de recharge 400 V :
  `I (A) = P (W) ÷ (U (V) × √3 × FP)` (avec `√3 ≈ 1,732`)

Sur une charge purement résistive comme un convecteur électrique ou une plaque chauffante, le facteur de puissance `FP` (souvent noté `cos φ` pour les charges sinusoïdales) vaut `1`. Sur un moteur de pompe, un compresseur de réfrigérateur ou une alimentation à découpage non corrigée, `FP` se situe couramment entre `0,70` et `0,95`, ce qui augmente l'intensité réelle circulant dans les fils.

## Exemples pratiques de dimensionnement étape par étape

### Exemple 1 : Comparer une charge de 600 W en solaire 12 V et 48 V (DC)

Vous installez un réfrigérateur professionnel de 600 W sur un parc de batteries solaires en courant continu.

1. En **12 V DC** : `I = 600 ÷ 12 = 50 A`. Cette intensité impose des câbles de forte section (16 mm² ou 25 mm²) et un fusible adapté.
2. En **48 V DC** : `I = 600 ÷ 48 = 12,5 A`. Quadrupler la tension divise l'intensité par quatre, réduisant les pertes par effet Joule (`P = R × I²`) et le coût du câblage.

### Exemple 2 : Dimensionner un appareil inductif de 2 200 W sur secteur 230 V (AC)

Vous branchez un climatiseur mobile de 2 200 W sur une prise de 230 V, avec un facteur de puissance `FP = 0,88`.

1. Calculez le dénominateur apparent : `230 × 0,88 = 202,4`.
2. Divisez la puissance active : `I = 2 200 ÷ 202,4 ≈ 10,87 A`.
3. Oublier `FP` (`2 200 ÷ 230 = 9,57 A`) sous-estimerait le courant réel de `1,3 A`. Sur un circuit de 16 A, la marge reste confortable.

### Exemple 3 : Vérifier un appareil de 1 500 W sur réseau 120 V (AC)

Vous utilisez un radiateur résistif (`FP = 1`) de 1 500 W sur une prise nord-américaine de 120 V protégée par un disjoncteur de 15 A.

1. Appliquez la formule : `I = 1 500 ÷ (120 × 1) = 12,5 A`.
2. Appliquez la règle des 80 % en charge continue (norme NEC) : un disjoncteur de 15 A ne doit pas dépasser `12 A` en continu. À 12,5 A, l'appareil doit rester seul sur ce circuit.

## Tableau de référence rapide Watts vers Ampères (DC et AC)

Le tableau suivant indique l'intensité pour les puissances courantes. Les colonnes AC supposent `FP = 1` ; divisez par `0,85` pour un moteur.

| Puissance | 12 V DC | 48 V DC | 120 V AC | 230 V AC |
| :--- | :--- | :--- | :--- | :--- |
| 100 W | 8,33 A | 2,08 A | 0,83 A | 0,43 A |
| 500 W | 41,67 A | 10,42 A | 4,17 A | 2,17 A |
| 1 000 W | 83,33 A | 20,83 A | 8,33 A | 4,35 A |
| 1 500 W | 125,00 A | 31,25 A | 12,50 A | 6,52 A |
| 2 000 W | 166,67 A | 41,67 A | 16,67 A | 8,70 A |
| 2 500 W | 208,33 A | 52,08 A | 20,83 A | 10,87 A |
| 3 680 W | 306,67 A | 76,67 A | 30,67 A | 16,00 A |
| 5 000 W | 416,67 A | 104,17 A | 41,67 A | 21,74 A |

## Cas d'usage sur le terrain et erreurs électriques à éviter

Les interventions en électricité résidentielle et photovoltaïque révèlent quatre erreurs récurrentes de conversion :

- **Omettre le rendement d'un onduleur solaire** : Alimenter une charge 230 V de 1 000 W via un onduleur 12 V au rendement de 90 % exige `1 000 ÷ 0,90 = 1 111 W` côté batterie, soit `92,6 A` au lieu de 83,33 A.
- **Confondre puissance nominale et courant de démarrage** : Un moteur (pompe, compresseur, scie) appelle brièvement 3 à 6 fois son intensité nominale au démarrage, nécessitant un disjoncteur courbe C ou D.
- **Ignorer les tensions régionales** : Les appareils nord-américains fonctionnent sous 120 V (60 Hz) contre 230 V (50 Hz) en Europe. À puissance égale, le courant en 120 V est presque doublé (`1,92×`).
- **Oublier la chute de tension en 12 V / 24 V** : Sur un véhicule aménagé ou un site isolé, un courant de 20 A sous 12 V subit une chute critique dès quelques mètres sans section de câble majorée.
