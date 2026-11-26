---
title: "Comment Suivre son Pourcentage de Graisse Corporelle au Fil du Temps"
description: "Guide pratique sur le suivi du pourcentage de masse grasse : équations métriques de l'US Navy, exemple chiffré, comparatif DEXA/BIA et seuils de référence."
category: "Health"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "body-fat-calculator"
faqs:
  - question: "Quelle est la méthode la plus fiable à domicile pour suivre sa masse grasse ?"
    answer: "La méthode des circonférences de l'US Navy, réalisée avec un mètre ruban souple selon un protocole constant le matin à jeun, offre souvent un meilleur suivi longitudinal que les balances à impédancemétrie domestiques, dont les mesures varient fortement selon votre niveau d'hydratation."
  - question: "Pourquoi la formule de l'US Navy donne-t-elle des résultats absurdes si l'on mélange centimètres et pouces ?"
    answer: "Les équations simplifiées publiées en ligne avec des constantes comme +36,76 ou −78,387 ont été calibrées pour des mesures en pouces. Utiliser directement des centimètres dans ces versions fausse le calcul de 5 à 7 points. En centimètres, il faut impérativement passer par les équations de densité corporelle de Hodgdon et Beckett puis par l'équation de Siri."
  - question: "Pourquoi les balances impédancemétriques changent-elles de 2 % d'un jour à l'autre ?"
    answer: "L'impédance bioélectrique (BIA) mesure la résistance électrique du corps à un courant faible, qui dépend directement de l'eau corporelle. Un repas salé, une séance de sport, la déshydratation ou le cycle menstruel modifient la conductivité tissulaire et faussent la lecture instantanée sans que votre graisse réelle ait bougé."
  - question: "Quel est le seuil minimal de graisse corporelle à ne pas franchir ?"
    answer: "La graisse essentielle est indispensable à la protection des organes, à l'isolation nerveuse et à la synthèse hormonale : elle représente environ 2 % à 5 % chez l'homme et 10 % à 13 % chez la femme. Descendre sous ces planchers expose à une fatigue chronique, une perte osseuse et une aménorrhée chez la femme."
  - question: "Comment interpréter un poids stable accompagné d'une baisse du tour de taille ?"
    answer: "C'est le signe caractéristique d'une recomposition corporelle réussie : vous perdez du tissu adipeux abdominal tout en gagnant ou en consolidant de la masse musculaire. Dans ce scénario, le pourcentage de masse grasse diminue même si l'aiguille de la balance reste immobile."
---

Le **pourcentage de graisse corporelle** (ou masse grasse) exprime la proportion de tissu adipeux dans votre poids total, le reste formant la **masse maigre** (muscles, os, eau, organes). Contrairement à l'IMC, qui confond muscle et graisse, cet indicateur évalue la qualité réelle de votre composition corporelle et votre niveau de risque métabolique.

Pour un suivi fiable sans examen médical mensuel, la stratégie optimale consiste à appliquer un protocole constant de mensurations à domicile — via la **méthode métrique de l'US Navy** — complété par la tendance pondérale hebdomadaire, tout en réservant l'imagerie de référence (`DEXA`) aux bilans espacés de six à douze mois.

## Équations métriques de l'US Navy et protocole de mesure

Établie en 1984 par James A. Hodgdon et Marsha B. Beckett, la méthode par circonférences calcule d'abord la **densité corporelle (`D`, en g/cm³)** à partir de logarithmes décimaux (`log10`), puis la convertit en pourcentage de masse grasse (`MG %`) grâce à l'équation de **Siri (1961)**.

Toutes les longueurs ci-dessous sont strictement exprimées en **centimètres (`cm`)** :

```text
Hommes :
D = 1,0324 − 0,19077 × log10(Tour de taille − Tour de cou) + 0,15456 × log10(Stature)

Femmes :
D = 1,29579 − 0,35004 × log10(Tour de taille + Tour de hanches − Tour de cou) + 0,22100 × log10(Stature)

Conversion en masse grasse (Siri, 1961) :
MG (%) = (495 / D) − 450
```

Sa marge d'erreur absolue atteint **±3 % à ±4 %**, mais sa reproductibilité dans le temps reste élevée si vous respectez ces règles :

- **Cou :** sous la pomme d'Adam, ruban perpendiculaire à l'axe du cou, épaules relâchées.
- **Taille :** au niveau du nombril chez l'homme et au point le plus étroit chez la femme, sans rentrer le ventre, en fin d'expiration normale.
- **Hanches (femmes) :** au périmètre maximal des fessiers, pieds joints.
- **Conditions identiques :** mesurez-vous le matin à jeun après passage aux toilettes, en retenant la moyenne de deux prises.

## Exemple chiffré de suivi sur douze semaines

Suivons un **homme de 178 cm**, au tour de cou stable à **38 cm**, engagé dans un programme combinant déficit modéré et renforcement musculaire.

### Bilan initial (Semaine 1)
- Poids : **78,0 kg** ; tour de taille : **85 cm** (`85 − 38 = 47 cm`).
- Logarithmes : `log10(47) = 1,67210` et `log10(178) = 2,25042`.
- Densité : `D = 1,0324 − (0,19077 × 1,67210) + (0,15456 × 2,25042) = 1,06123 g/cm³`.
- Masse grasse : `MG = (495 / 1,06123) − 450 = 16,4 %`, soit `12,8 kg` de graisse et `65,2 kg` de masse maigre.

### Contrôle à douze semaines (Semaine 12)
- Poids : **75,5 kg** (`−2,5 kg`) ; tour de taille : **81 cm** (`−4 cm`, soit `81 − 38 = 43 cm`).
- Logarithme : `log10(43) = 1,63347`.
- Densité : `D = 1,0324 − (0,19077 × 1,63347) + (0,15456 × 2,25042) = 1,06860 g/cm³`.
- Masse grasse : `MG = (495 / 1,06860) − 450 = 13,2 %`, soit `10,0 kg` de graisse et `65,5 kg` de masse maigre.

Le suivi met en évidence une perte de **2,8 kg de masse grasse** avec maintien intégral de la masse musculaire, ce que la balance seule n'aurait pas révélé.

## Comparatif des méthodes d'évaluation et seuils ACE

Chaque technique d'estimation présente un équilibre spécifique entre précision analytique, sensibilité à l'hydratation et accessibilité.

| Méthode | Précision typique | Paramètre mesuré | Sensibilité hydrique | Usage et fréquence conseillée |
|---|---|---|---|---|
| Absorptiométrie DEXA | ±1,0 % – 2,0 % | Atténuation de deux rayons X (os, maigre, gras) | Faible | Étalon clinique ; tous les 6 à 12 mois |
| Pléthysmographie (Bod Pod) | ±1,5 % – 3,0 % | Volume corporel par déplacement d'air | Faible | Centre sportif ou universitaire |
| Pesée hydrostatique | ±1,5 % – 2,5 % | Densité corporelle en immersion totale | Modérée | Laboratoire de physiologie |
| Plis cutanés (7 sites) | ±3,0 % – 4,0 % | Épaisseur du tissu adipeux sous-cutané | Faible (dépend du praticien) | Mensuel avec le même opérateur |
| Circonférences (US Navy) | ±3,0 % – 4,0 % | Proportions tronc / cou / stature | Faible | Gratuit ; toutes les 2 à 4 semaines |
| Impédance bioélectrique (BIA) | ±3,5 % – 6,0 % | Conductivité électrique de l'eau corporelle | Très élevée (sel, sueur) | Tendance lissée sur 7 jours |

Selon les repères de l'**American Council on Exercise (ACE)**, les plages de référence s'établissent ainsi :
- **Graisse essentielle :** `2 % – 5 %` (hommes) | `10 % – 13 %` (femmes).
- **Athlètes :** `6 % – 13 %` (hommes) | `14 % – 20 %` (femmes).
- **Condition physique optimale :** `14 % – 17 %` (hommes) | `21 % – 24 %` (femmes).
- **Moyenne acceptable :** `18 % – 24 %` (hommes) | `25 % – 31 %` (femmes).
- **Excès adipeux :** `≥ 25 %` (hommes) | `≥ 32 %` (femmes).

## Biais de suivi et leviers d'amélioration

Ne comparez jamais deux techniques différentes d'un mois à l'autre : une balance BIA et la méthode US Navy présentent fréquemment un écart de `2 à 4 points`. Seule la **pente d'évolution** mesurée dans des conditions strictement identiques est exploitable. Chez les profils au cou très musclé ou à stockage fémoral marqué, complétez le ruban par des photos mensuelles sous éclairage fixe.

Pour optimiser durablement la composition corporelle, associez un déficit modéré (`300 à 500 kcal/jour`), un apport protéique de `1,6 à 2,2 g/kg/jour`, deux à quatre séances hebdomadaires de résistance musculaire et sept à neuf heures de sommeil réparateur.
