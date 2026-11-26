---
title: "Comment Additionner et Soustraire le Temps : Le Guide Ultime"
description: "Maîtrisez l'arithmétique sexagésimale (base 60), convertissez les heures minutes en heures décimales pour la paie et calculez vos durées avec passage de minuit."
category: "Productivity & Utilities"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "time-calculator"
relatedType: "calculator"
faqs:
  - question: "Pourquoi 7,50 heures ne signifient-elles pas 7 heures et 50 minutes ?"
    answer: "L'écriture 7,50 h est une heure décimale (en base 10), alors que la lecture horaire 7 h 30 min utilise le système sexagésimal (en base 60). Comme une heure compte 60 minutes, la fraction 0,50 h correspond à 0,50 × 60 = 30 minutes. À l'inverse, 7 h 50 min équivalent à 7 + (50 / 60) = 7,8333 heures décimales."
  - question: "Comment calculer une durée de travail qui traverse minuit (équipe de nuit) ?"
    answer: "Lorsqu'un poste commence à 22 h 15 et se termine à 06 h 30 le lendemain, la soustraction directe échoue car l'heure de fin est inférieure à l'heure de début. Il faut découper le calcul à minuit : (24 h 00 − 22 h 15) + 06 h 30 = 1 h 45 + 6 h 30 = 8 h 15 min, soit 8,25 heures décimales."
  - question: "Faut-il arrondir les heures au quart d'heure chaque jour ou uniquement en fin de mois pour la paie ?"
    answer: "En droit du travail, les durées quotidiennes doivent être totalisées à la minute près en base 60 tout au long de la période de paie avant toute conversion ou arrondi éventuel. Arrondir chaque journée séparément (par exemple au dixième ou au quart d'heure) introduit un biais systématique cumulatif sur 20 à 22 jours travaillés."
  - question: "Comment convertir rapidement des secondes en format HH:MM:SS ?"
    answer: "Utilisez la division euclidienne par 3 600 et par 60. Par exemple, pour 10 000 secondes : 10 000 ÷ 3 600 = 2 heures (reste 2 800 secondes) ; puis 2 800 ÷ 60 = 46 minutes (reste 40 secondes). Le résultat exact est donc 02:46:40."
  - question: "Que se passe-t-il pour le calcul des heures lors du changement d'heure d'été ou d'hiver ?"
    answer: "Les horloges civiles européennes avancent d'une heure fin mars (une nuit de 23 heures) et reculent d'une heure fin octobre (une nuit de 25 heures). Pour un salarié travaillant de 22 h 00 à 06 h 00 en heure locale, la durée réelle travaillée est donc de 7 heures lors du passage à l'heure d'été et de 9 heures lors du passage à l'heure d'hiver."
---

Additionner des heures ou calculer l'amplitude d'une journée de travail provoque souvent des erreurs car le temps mélange deux systèmes numériques incompatibles : la **base 60** (système sexagésimal) pour les minutes et les secondes, et la **base 10** (système décimal) pour la paie, la facturation et les tableurs. Ainsi, `0,5` heure correspond à `30` minutes (`0,5 × 60`) et jamais à `50` minutes.

Maîtriser la conversion entre le format `HH:MM:SS` et les **heures décimales** (centièmes d'heure) est essentiel pour vérifier un bulletin de paie, facturer des prestations ou synchroniser des pistes audiovisuelles. Notre [Calculatrice de Temps](/fr/calculatrices/calculateur-de-temps) effectue ces additions, soustractions et conversions en base 60 instantanément.

## Système sexagésimal (base 60) et conversion en heures décimales

Les subdivisions de l'heure obéissent à des facteurs constants : **1 minute = 60 secondes**, **1 heure = 60 minutes = 3 600 secondes** et **1 jour = 24 heures = 1 440 minutes = 86 400 secondes**.

Lors d'une addition, une retenue se déclenche dès que les secondes ou les minutes atteignent **60**. Lors d'une soustraction, si le terme à retrancher dépasse la valeur disponible, on **emprunte 1 unité** au rang supérieur, ce qui ajoute **60** (et non 100) au rang inférieur.

```text
Total en secondes          : S_tot = (H × 3 600) + (M × 60) + S
Heures décimales (base 10) : H_déc = H + (M / 60) + (S / 3 600)
Minutes depuis décimal     : M_exact = Partie_décimale(H_déc) × 60
Passage de minuit          : Durée = (24 h 00 − Heure_début) + Heure_fin
```

La conversion en heures décimales est requise dès qu'une durée multiplie un taux horaire en euros (`€/h`) : `15 min` valent `0,25 h`, `30 min` valent `0,50 h` et `45 min` valent `0,75 h`.

## Exemples chiffrés pas à pas : pointage, pauses et facturation

### Exemple 1 : Addition avec double retenue en base 60

Additionnons deux durées : `3 h 48 min 50 s + 2 h 35 min 30 s`.

1. **Secondes** : `50 + 30 = 80 s`. Comme `80 = 1 × 60 + 20`, on pose **20 s** et on retient **1 min**.
2. **Minutes** : `48 + 35 + 1 = 84 min`. Comme `84 = 1 × 60 + 24`, on pose **24 min** et on retient **1 h**.
3. **Heures** : `3 + 2 + 1 = 6 h`.
4. **Total exact** : **6 h 24 min 20 s**, soit `6 + (24 / 60) + (20 / 3 600) = 6,4056 h` en décimal.

### Exemple 2 : Soustraction, pause déjeuner et facturation horaire

Un consultant travaille de **08:45** à **17:15** avec une pause non rémunérée de **0 h 45 min**, au taux de **48,00 €/h** :

1. **Amplitude brute (`17:15 − 08:45`)** : `15 min − 45 min` étant négatif, on emprunte `1 h` (`60 min`) à `17 h`, obtenant `16 h 75 min`. On soustrait : `75 − 45 = 30 min` et `16 − 8 = 8 h`, soit **8 h 30 min**.
2. **Déduction de la pause (`8 h 30 min − 0 h 45 min`)** : un nouvel emprunt transforme `8 h 30 min` en `7 h 90 min`, donnant `90 − 45 = 45 min` et **7 h 45 min** nettes.
3. **Facturation** : `7 + (45 / 60) = 7,75 h`, soit `7,75 × 48,00 € = 372,00 €`. Une saisie erronée de `7,45` dans un tableur produirait `7,45 × 48,00 € = 357,60 €`, soit **14,40 € de perte par jour**.

## Tableau de correspondance : minutes sexagésimales et centièmes d'heure

Le tableau suivant compare les durées courantes à `50,00 €/h` et mesure l'erreur financière d'une lecture décimale brute :

| Durée (`HH:MM`) | Minutes | Fraction d'heure | Heures décimales | Valeur exacte à `50 €/h` | Montant si saisi en décimal brut | Écart d'erreur |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `00:05` | 5 min | 1 / 12 | `0,0833 h` | 4,17 € | 2,50 € (pour `0,05`) | −1,67 € |
| `00:06` | 6 min | 1 / 10 | `0,1000 h` | 5,00 € | 3,00 € (pour `0,06`) | −2,00 € |
| `00:10` | 10 min | 1 / 6 | `0,1667 h` | 8,33 € | 5,00 € (pour `0,10`) | −3,33 € |
| `00:15` | 15 min | 1 / 4 | `0,2500 h` | 12,50 € | 7,50 € (pour `0,15`) | −5,00 € |
| `00:20` | 20 min | 1 / 3 | `0,3333 h` | 16,67 € | 10,00 € (pour `0,20`) | −6,67 € |
| `00:30` | 30 min | 1 / 2 | `0,5000 h` | 25,00 € | 15,00 € (pour `0,30`) | −10,00 € |
| `00:45` | 45 min | 3 / 4 | `0,7500 h` | 37,50 € | 22,50 € (pour `0,45`) | −15,00 € |

## Cas d'usage, erreurs classiques et précision réglementaire

En France, le décompte exact à la minute détermine le seuil légal des **35 heures hebdomadaires** et la majoration des heures supplémentaires (`+25 %` de la 36e à la 43e heure, `+50 %` au-delà, sauf accord collectif). L'arithmétique en base 60 s'applique également au montage vidéo (timecodes), au transport routier et au chronométrage sportif.

Évitez trois erreurs récurrentes :

- **Saisir un point au lieu de deux-points dans un tableur** : `7.30` signifie `7 h 18 min`. Utilisez `07:30` avec le format `[h]:mm` pour additionner au-delà de 24 heures.
- **Arrondir chaque journée séparément** : `20 min` valent `0,3333... h`. Multiplier `0,33` sur trois jours donne `0,99 h` au lieu d'une heure pleine. Sommez toujours en minutes avant de convertir en fin de période.
- **Confondre AM/PM ou négliger l'heure d'été** : adoptez la **notation 24 heures** (`17:15`) et vérifiez le décalage horaire (nuits de 23 h en mars et 25 h en octobre) pour les postes de nuit.
