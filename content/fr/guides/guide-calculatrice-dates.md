---
title: "Le Guide de la Calculatrice de Dates : Additionnez, Soustrayez et Mesurez le Temps"
description: "Calculez avec précision l'écart exact entre deux dates, distinguez jours calendaires, ouvrables et ouvrés, maîtrisez les années bissextiles grégoriennes et la norme ISO 8601."
category: "Productivity & Utilities"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "date-calculator"
relatedType: "calculator"
faqs:
  - question: "Quelle est la différence entre jours calendaires, jours ouvrables et jours ouvrés en France ?"
    answer: "Les jours calendaires comptent tous les jours de l'année sans exception (7 jours/semaine, week-ends et jours fériés inclus). Les jours ouvrables couvrent 6 jours par semaine, du lundi au samedi inclus, hors jours fériés chômés (base légale de 30 jours de congés payés par an). Les jours ouvrés correspondent aux jours d'ouverture effective de l'entreprise, généralement du lundi au vendredi hors fériés (soit 5 jours/semaine et 25 jours de congés payés par an)."
  - question: "Pourquoi l'année 1900 n'était-elle pas bissextile alors que 2000 l'était ?"
    answer: "Dans le calendrier grégorien, une année est bissextile si elle est divisible par 4, sauf si elle est divisible par 100 sans être divisible par 400. L'année 1900, divisible par 100 mais non par 400, ne comptait donc que 365 jours. À l'inverse, 2000 étant divisible par 400, elle a bien comporté un 29 février. Cette correction ramène l'année civile moyenne à 365,2425 jours, très proche de l'année tropique réelle (365,24219 jours)."
  - question: "Comment calculer le nombre de jours entre deux dates lorsque les deux bornes doivent être incluses ?"
    answer: "Par défaut, la soustraction arithmétique Date_fin − Date_début mesure l'intervalle écoulé (comme le nombre de nuits d'un séjour hôtelier) : du 1er au 5 du mois, on obtient 4 jours. Si la date de départ et la date de fin doivent toutes deux être comptées (location de matériel, durée d'un événement), il faut ajouter 1 jour au résultat, soit 5 jours inclusifs."
  - question: "Que se passe-t-il quand on ajoute un mois au 31 janvier ?"
    answer: "Comme février ne compte que 28 jours (ou 29 en année bissextile), la plupart des calculateurs et standards financiers plafonnent le résultat au dernier jour valide du mois cible : 31 janvier + 1 mois donne le 28 ou 29 février. Attention : cette opération n'est pas associative, car (31 janvier + 1 mois) + 1 mois donne le 28 mars, alors que 31 janvier + 2 mois donne le 31 mars."
  - question: "Quel est le format de date officiel recommandé pour éviter la confusion entre JJ/MM/AAAA et MM/JJ/AAAA ?"
    answer: "La norme internationale ISO 8601 impose le format AAAA-MM-JJ (par exemple 2026-11-26). Ce format élimine toute ambiguïté entre la convention européenne (26/11/2026) et la convention américaine (11/26/2026) et permet un tri chronologique exact par simple classement alphabétique dans les bases de données et les noms de fichiers."
---

L'arithmétique calendaire échappe aux règles simples de la base 10 à cause de l'irrégularité du **calendrier grégorien** : mois de 28, 29, 30 ou 31 jours, semaines de 7 jours et années bissextiles séculaires. Mesurer un écart entre deux dates ou projeter une échéance impose en outre de distinguer **jours calendaires**, **jours ouvrables** et **jours ouvrés**.

Pour calculer une durée exacte en années, mois, semaines et jours, ou projeter une date cible avec son jour de semaine, notre [Calculatrice de Dates](/fr/calculatrices/calculateur-de-date) exécute l'ensemble de ces règles localement dans votre navigateur.

## Règles calendaires, années bissextiles et arithmétique des dates

Le calendrier grégorien corrige la dérive face à l'année tropique (`365,24219` jours) en supprimant 3 années bissextiles par cycle de 400 ans (1700, 1800, 1900, 2100), ne gardant que **97 années bissextiles sur 400 ans**. L'année civile moyenne vaut ainsi `365 + 97 / 400 = 365,2425` jours.

En gestion administrative et RH en France, trois régimes coexistent :

- **Jours calendaires** : les 7 jours de la semaine, week-ends et fériés inclus (`365` ou `366` jours/an). Base des délais de rétractation et des baux.
- **Jours ouvrables** : du **lundi au samedi inclus** (`6` jours/semaine), hors dimanches et jours fériés chômés. Base légale des congés payés (`2,5` jours/mois, soit **30 jours ouvrables/an**).
- **Jours ouvrés** : jours d'activité effective de l'entreprise, généralement du **lundi au vendredi** (`5` jours/semaine), hors fériés (`25` jours ouvrés = `30` jours ouvrables).

```text
Année bissextile   ⇔ (Année mod 4 = 0 ET Année mod 100 ≠ 0) OU (Année mod 400 = 0)
Écart calendaire   : ΔJ = JDN(Date_fin) − JDN(Date_début)
Durée inclusive    : ΔJ_inclusif = JDN(Date_fin) − JDN(Date_début) + 1
```

*(Le Jour Julien `JDN` attribue un entier continu à chaque date pour soustraire deux dates sans parcourir chaque mois.)*

## Exemple chiffré pas à pas : écart calendaire et délai en jours ouvrés

### Cas 1 : Écart exact incluant un février bissextile

Calculons la durée entre le **15 janvier 2024** et le **10 avril 2024** (2024 étant divisible par 4 et non par 100, février compte **29 jours**) :

1. **Janvier 2024** (du 15 exclu au 31 inclus) : `31 − 15 = 16` jours.
2. **Février 2024** (bissextile) : `29` jours.
3. **Mars 2024** : `31` jours.
4. **Avril 2024** (du 1er au 10 inclus) : `10` jours.
5. **Total** : `16 + 29 + 31 + 10 = 86` jours calendaires (`12 semaines et 2 jours`, ou `2 mois et 26 jours`). Avec les deux bornes incluses (location de matériel), la durée s'élève à `86 + 1 = 87` jours.

### Cas 2 : Projection d'un délai de 30 jours ouvrés avec jour férié

Projetons un contrat de **30 jours ouvrés** démarrant le **lundi 2 novembre 2026** (premier jour inclus) en France métropolitaine, intégrant le **mercredi 11 novembre 2026** férié :

1. **Base sans férié** : `30` jours ouvrés égalent `6 semaines` de 5 jours (`6 × 5 = 30`), menant du lundi 2 novembre au vendredi 11 décembre 2026 (`40` jours calendaires inclusifs).
2. **Impact du 11 novembre** : ce jour chômé retire 1 jour ouvré ; au 11 décembre, seuls `29` jours ouvrés sont réalisés.
3. **Report au jour ouvré suivant** : après le week-end des 12 et 13 décembre, le 30e jour ouvré tombe le **lundi 14 décembre 2026**, soit **43 jours calendaires inclusifs** (`42` jours d'écart arithmétique).

## Tableau comparatif des méthodes de décompte et conventions

| Méthode / Convention | Jours comptés par semaine | Traitement des jours fériés | Base annuelle | Usage principal |
| :--- | :--- | :--- | :--- | :--- |
| **Jours calendaires** | 7 jours (lun. à dim.) | Inclus dans le décompte | 365 ou 366 j | Délais légaux (rétractation 14 j), baux, âge exact |
| **Jours ouvrables (France)** | 6 jours (lun. à sam.) | Exclus si fériés chômés | ~302 à 305 j | Congés payés légaux (2,5 j/mois), délais postaux |
| **Jours ouvrés (France)** | 5 jours (lun. à ven.) | Exclus si fériés chômés | ~251 à 254 j | Gestion de projet, SLA, paie, RTT |
| **Jours francs (procédure)** | 7 jours (hors jour de départ) | Prorogé si fin sam./dim./férié | Variable | Procédure civile (art. 641 et 642 CPC), recours |
| **Convention bancaire ACT/360** | Exact / 360 | Inclus (jours calendaires) | 360 j (diviseur) | Intérêts débiteurs, découvert, marché monétaire €STR |
| **Convention 30E/360** | 30 jours fixes par mois | Inclus | 360 j | Obligations, coupons financiers européens |

## Cas d'usage, pièges courants et précision réglementaire

Le calcul de dates encadre les préavis (bail de 1 ou 3 mois), les intérêts courus, la gestion de projet et la procédure civile. En droit français, l'article 642 du Code de procédure civile prévoit qu'un délai expirant un samedi, un dimanche ou un jour férié est **prorogé jusqu'au premier jour ouvrable suivant**.

Évitez quatre pièges classiques :

- **Confondre nuits et jours** : du 10 au 15 août, l'écart vaut `5` nuits mais `6` jours calendaires de présence.
- **Le bug de l'an 1900 des tableurs** : par rétrocompatibilité avec Lotus 1-2-3, Excel considère 1900 comme bissextile, décalant d'un jour les dates antérieures au 1er mars 1900.
- **La non-commutativité des fins de mois** : `(31 janv + 1 mois) + 1 mois` donne le `28 mars`, alors que `31 janv + 2 mois` donne le `31 mars`.
- **Les fuseaux horaires et l'heure d'été** : soustraire des horodatages locaux lors des nuits de 23 h ou 25 h peut décaler la date d'un jour ; calculez toujours sur des dates pures (`AAAA-MM-JJ`, norme ISO 8601) ou en UTC.
