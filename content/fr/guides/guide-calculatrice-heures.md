---
title: "Maîtrise de la Paie : Calculer les Feuilles de Temps et les Heures"
description: "Convertissez les minutes en heures décimales, déduisez les pauses non rémunérées, calculez les heures supplémentaires (+25 % et +50 %) et vérifiez le salaire brut en France."
category: "Productivity & Utilities"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "hours-calculator"
relatedType: "calculator"
faqs:
  - question: "Pourquoi ne faut-il jamais écrire 8 h 30 sous la forme 8,30 heures dans une feuille de temps ?"
    answer: "L'heure suit une base sexagésimale (60 minutes par heure) alors que la paie multiplie des heures décimales (base 100) par un taux horaire. Écrire 8,30 au lieu de 8,50 fait perdre 0,20 heure, soit 12 minutes de rémunération par jour. Sur 220 jours travaillés à 20 €/h, cette seule erreur de notation représente un manque à gagner de 880 € brut par an."
  - question: "Les temps de pause déjeuner et de pause réglementaire sont-ils rémunérés en France ?"
    answer: "Selon l'article L3121-16 du Code du travail, tout salarié a droit à une pause minimale de 20 minutes consécutives dès que le temps de travail quotidien atteint 6 heures. Par défaut, ces pauses (dont la pause déjeuner) ne constituent pas du temps de travail effectif et ne sont pas rémunérées, sauf si le salarié reste à la disposition de l'employeur ou si une convention collective prévoit leur maintien."
  - question: "Quels sont les taux légaux de majoration des heures supplémentaires en France ?"
    answer: "En l'absence d'accord collectif ou de convention de branche fixant un taux différent (qui ne peut toutefois pas descendre sous 10 %), le Code du travail fixe la majoration à +25 % pour les huit premières heures supplémentaires effectuées au-delà de 35 h (soit de la 36e à la 43e heure hebdomadaire) et à +50 % à partir de la 44e heure."
  - question: "Quelle est la différence entre 151,67 heures mensuelles et la durée réelle d'un mois ?"
    answer: "La mensualisation lisse le salaire sur l'année afin d'éviter des variations de fiche de paie entre un mois court (février, 20 jours ouvrés) et un mois long (juillet, 23 jours ouvrés). La formule légale pour un temps plein aux 35 heures est (35 × 52) ÷ 12 = 151,67 heures par mois, même si le nombre réel d'heures travaillées sur un mois donné oscille entre 140 et 161 heures."
  - question: "Comment gérer le décompte des heures lors d'un service de nuit franchissant minuit ?"
    answer: "Lorsqu'une prise de poste débute à 22 h 00 et s'achève à 06 h 00 le lendemain, une simple soustraction donne un résultat négatif (−16 h). Il faut ajouter 24 heures à l'heure de fin avant de soustraire : (6 + 24) − 22 = 8 heures brutes, puis retrancher les éventuelles pauses non rémunérées et appliquer la majoration de travail de nuit prévue par l'accord d'entreprise."
---

La gestion rigoureuse d'une feuille de temps repose sur deux étapes distinctes : déterminer le **temps de travail effectif** en soustrayant les pauses non rémunérées, puis convertir ce volume horaire sexagésimal (heures et minutes) en **heures décimales** afin de le multiplier par le taux horaire contractuel. Confondre ces deux bases fausse systématiquement les bulletins de paie et les facturations de prestations.

En France, le calcul doit également intégrer les seuils hebdomadaires de la durée légale (`35 heures`), le déclenchement des majorations pour heures supplémentaires (`+25 %` puis `+50 %`) et les passages de minuit. Notre [Calculatrice d'Heures](/fr/calculatrices/calculateur-d-heures) automatise ces conversions et le chiffrage brut directement dans votre navigateur.

## Conversion sexagésimale et formules de décompte de paie

La première règle consiste à transformer les minutes en centièmes d'heure en divisant par `60`. À l'inverse, pour repasser d'un total décimal au format `HH:MM`, on multiplie la partie fractionnaire par `60`.

```text
Durée brute (min)       = (Heure_fin − Heure_début) [ou + 1 440 min si passage minuit]
Temps effectif (min)    = Durée brute (min) − Pauses non rémunérées (min)
Heures décimales (H_d)  = Heures entières + (Minutes / 60)

Salaire brut semaine    = (H_normales × Taux)
                        + (H_sup_25 × Taux × 1,25)
                        + (H_sup_50 × Taux × 1,50)
```

Voici les équivalences décimales exactes les plus fréquentes en pointage quotidien :
- `10 min` = `0,17 h` (`0,1667`) | `15 min` = `0,25 h` | `20 min` = `0,33 h` (`0,3333`)
- `30 min` = `0,50 h` | `40 min` = `0,67 h` (`0,6667`) | `45 min` = `0,75 h`

Pour le calcul des heures supplémentaires en droit français, l'unité de référence reste la **semaine civile** (du lundi `0 h 00` au dimanche `23 h 59`), et non le mois. Un dépassement sur une semaine isolée génère des heures supplémentaires même si la semaine suivante est plus courte, sauf dispositif d'aménagement du temps de travail (annualisation ou modulation).

## Exemple chiffré pas à pas : semaine de 45 heures avec pauses et majorations

Calculons le salaire brut d'un technicien rémunéré **`18,00 €/h` brut** (base `35 h`), avec le pointage hebdomadaire suivant :

1. **Lundi** : `08 h 15` → `18 h 00`, pause `45 min` → `9 h 00` effectives (`9,00 h`).
2. **Mardi** : `08 h 00` → `18 h 30`, pause `1 h 00` → `9 h 30` effectives (`9,50 h`).
3. **Mercredi** : `08 h 30` → `17 h 45`, pause `45 min` → `8 h 30` effectives (`8,50 h`).
4. **Jeudi** : `08 h 00` → `18 h 15`, pause `45 min` → `9 h 30` effectives (`9,50 h`).
5. **Vendredi** : `08 h 00` → `17 h 15`, pause `45 min` → `8 h 30` effectives (`8,50 h`).

Total effectif : `9,00 + 9,50 + 8,50 + 9,50 + 8,50 = 45,00 heures`.

- **Heures normales (1re à 35e h)** : `35,00 h × 18,00 € = 630,00 €`.
- **Heures sup. +25 % (36e à 43e h)** : `8,00 h × 22,50 € = 180,00 €`.
- **Heures sup. +50 % (44e et 45e h)** : `2,00 h × 27,00 € = 54,00 €`.
- **Total brut hebdomadaire** : `630,00 + 180,00 + 54,00 = 864,00 €` (contre `810,00 €` sans majoration).

## Typologie des heures en paie française et seuils d'application

Le tableau ci-dessous synthétise le traitement des différentes catégories d'heures pour un taux horaire de référence de `20,00 €/h` brut :

| Catégorie d'heures | Seuil de déclenchement | Taux légal par défaut | Taux horaire (`20 €/h`) | Cadre réglementaire / Remarque |
| :--- | :--- | :--- | :--- | :--- |
| **Heures normales** | Jusqu'à `35 h/semaine` | `100 %` (`1,00×`) | `20,00 €` | Base mensualisée à `151,67 h/mois` |
| **Heures complémentaires (≤ 1/10)** | Temps partiel, ≤ `+10 %` du contrat | `+10 %` (`1,10×`) | `22,00 €` | Obligatoire dès la 1re heure au-delà du contrat |
| **Heures complémentaires (> 1/10)** | Temps partiel, de `+10 %` à `+1/3` | `+25 %` (`1,25×`) | `25,00 €` | Requiert un accord collectif pour dépasser `1/10` |
| **Heures supplémentaires (1er palier)** | De la `36e` à la `43e h/semaine` | `+25 %` (`1,25×`) | `25,00 €` | Exonération fiscale & réduction cotisations (loi TEPA) |
| **Heures supplémentaires (2e palier)** | À partir de la `44e h/semaine` | `+50 %` (`1,50×`) | `30,00 €` | Plafond hebdomadaire absolu : `48 h` (ou `44 h` en moyenne sur 12 sem.) |
| **Heures de nuit** | Entre `21 h` et `6 h` (selon accord) | Selon convention | Variable (`+10 %` à `+30 %`) | Repos compensateur obligatoire pour travailleur de nuit |

## Erreurs courantes de pointage et limites réglementaires

### Arrondis abusifs et troncature de badgeuse

Certaines feuilles de temps arrondissent systématiquement chaque pointage au quart d'heure défavorable au salarié (par exemple, compter `08 h 07` comme `08 h 15` à l'arrivée et `17 h 07` comme `17 h 00` au départ). En droit social, tout temps commandé par l'employeur et effectué à sa demande doit être décompté à la minute exacte ou selon un système d'arrondi neutre et transparent.

### Confusion entre temps de trajet, habillage et travail effectif

Le trajet domicile-travail habituel n'entre pas dans le temps de travail effectif. En revanche, les déplacements entre deux chantiers ou deux clients au cours de la journée sont intégralement rémunérés. De même, lorsque le port d'une tenue de travail spécifique est imposé par la sécurité ou l'hygiène et doit s'effectuer sur place, le temps d'habillage et de déshabillage ouvre droit à une contrepartie financière ou en repos.

### Dépassement des durées maximales de travail

Même avec paiement des majorations, la législation européenne et française fixe des butoirs stricts : **`10 heures`** de travail effectif par jour (sauf dérogation), **`48 heures`** sur une même semaine isolée, et **`44 heures`** en moyenne hebdomadaire calculée sur `12 semaines` consécutives, avec un repos quotidien minimal de **`11 heures`** consécutives entre deux postes.
