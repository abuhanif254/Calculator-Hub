---
title: "Calculateur de Taille"
metaTitle: "Calculateur de Taille : Conversion cm/pieds et Croissance"
description: "Convertissez instantanément votre taille entre centimètres, mètres, pieds et pouces, situez votre centile par région et estimez la stature adulte d'un enfant selon la formule de Tanner."
metaDescription: "Convertissez instantanément cm en pieds et pouces, évaluez votre centile de taille par région et estimez la stature adulte d'un enfant par Tanner."
metaKeywords: "calculateur de taille, conversion cm en pieds et pouces, taille cible parentale, formule de Tanner, centile de taille, taille moyenne homme femme, taille adulte enfant, calcul IMC"
faqs:
  - question: "Comment convertir précisément une taille en centimètres en pieds et pouces ?"
    answer: "Divisez d'abord votre taille en centimètres par 2,54 pour obtenir le nombre total de pouces, puisque 1 pouce vaut exactement 2,54 cm selon l'accord international de 1959. Divisez ensuite ce total par 12 pour isoler le nombre entier de pieds ; le reste correspond aux pouces. Par exemple, 175 cm donnent 68,90 pouces, soit 5 pieds et 8,9 pouces."
  - question: "Quelle est la marge d'erreur de la formule de Tanner pour prédire la taille adulte d'un enfant ?"
    answer: "La taille cible parentale obtenue par la formule de Tanner offre une estimation génétique assortie d'une dispersion habituelle de ±8,5 cm (couvrant environ 95 % des enfants en bonne santé). La génétique explique 60 % à 80 % de la stature finale, tandis que la nutrition, la qualité du sommeil, l'âge de la puberté et l'état de santé général façonnent le reste."
  - question: "Pourquoi notre taille varie-t-elle entre le matin et le soir, puis diminue-t-elle avec l'âge ?"
    answer: "Au fil de la journée, la gravité comprime les disques intervertébraux remplis d'eau, ce qui réduit la stature de 1 à 2 cm entre le réveil et le coucher. À partir de 40 ans environ, la déshydratation progressive de ces disques, le tassement postural et la baisse de densité minérale osseuse entraînent une perte moyenne d'environ 1 cm par décennie."
  - question: "Comment interpréter un centile de taille par rapport à une moyenne régionale ?"
    answer: "Un centile indique le pourcentage d'adultes du même sexe et de la même région que vous dépassez en taille. Se situer au 75e centile signifie être plus grand que 75 % de la population de référence et plus petit que 25 %. Comme les moyennes varient fortement d'un pays à l'autre, un adulte de 180 cm se classe au 90e centile mondial mais au 30e centile aux Pays-Bas."
  - question: "Pourquoi une erreur de 2 cm sur la taille modifie-t-elle sensiblement l'IMC ?"
    answer: "Dans la formule de Quetelet, la taille exprimée en mètres est élevée au carré au dénominateur (IMC = masse / taille²). Pour une personne de 75 kg, passer de 1,75 m à 1,73 m fait grimper l'indice de masse corporelle de 24,5 à 25,1 kg/m², franchissant artificiellement le seuil de surpoids uniquement à cause d'une mesure imprécise."
---

La mesure précise de la stature intervient dans de nombreux usages : dossiers médicaux, suivi pédiatrique dans le carnet de santé, choix de vêtements ou de cadres de vélo et formalités internationales. Si la France, la Belgique, la Suisse et le Système international (SI) expriment la taille en **centimètres** et en **mètres**, les pays anglo-saxons ainsi que l'usage courant au Canada recourent encore aux **pieds** et aux **pouces**.

Notre **calculateur de taille** réunit cinq modules : un convertisseur bidirectionnel exact (centimètres, mètres, millimètres, pieds et pouces décimaux ou fractionnaires), un prédicteur de taille adulte par la **formule de Tanner**, un comparateur visuel entre deux personnes, un calculateur de **centile régional** selon la loi normale et un module d'**IMC**.

## Équations de conversion, de croissance et de centile

Depuis l'accord international de 1959, la correspondance métrique-impériale est exacte : **1 pouce vaut 2,54 cm** et **1 pied vaut 12 pouces (30,48 cm)**.

### Conversion métrique-impériale

Pour convertir une taille en centimètres ($H_{\text{cm}}$) vers des pieds entiers et pouces restants, puis effectuer l'inverse :

$$P_{\text{tot}} = \frac{H_{\text{cm}}}{2{,}54}, \qquad \text{Pieds} = \left\lfloor \frac{P_{\text{tot}}}{12} \right\rfloor, \qquad \text{Pouces} = P_{\text{tot}} - 12 \times \text{Pieds}$$

$$H_{\text{cm}} = (12 \times \text{Pieds} + \text{Pouces}) \times 2{,}54$$

* **$H_{\text{cm}}$** désigne la stature en centimètres (et $H_{\text{m}} = H_{\text{cm}} / 100$ en mètres).
* **$P_{\text{tot}}$** représente la taille totale en pouces décimaux, et $\lfloor \cdot \rfloor$ la partie entière inférieure.

### Taille cible parentale (Tanner) et centile gaussien

En pédiatrie, la **formule de Tanner** estime la taille adulte cible d'un enfant à partir des statures du père ($H_{\text{père}}$) et de la mère ($H_{\text{mère}}$), en intégrant l'écart moyen de dimorphisme sexuel de **13 cm** :

$$H_{\text{garçon}} = \frac{H_{\text{père}} + H_{\text{mère}} + 13}{2}, \qquad H_{\text{fille}} = \frac{H_{\text{père}} + H_{\text{mère}} - 13}{2}$$

La fourchette génétique attendue s'étend sur **±8,5 cm** autour de cette valeur centrale. Pour situer une stature adulte dans une cohorte régionale de moyenne $\mu$ et d'écart-type $\sigma$, l'outil détermine le score $z$ puis le centile cumulatif via la fonction d'erreur de Gauss :

$$z = \frac{H_{\text{cm}} - \mu}{\sigma}, \qquad \text{Centile} = 50 \times \left[1 + \operatorname{erf}\!\left(\frac{z}{\sqrt{2}}\right)\right]$$

Le module d'IMC relie simultanément masse et stature selon la formule de Quetelet ($\text{IMC} = m / H_{\text{m}}^{2}$, avec $m$ en kilogrammes).

## Exemples chiffrés pas à pas

### Cas 1 : Conversion complète et centile d'un homme de 180 cm

1. **Pouces totaux** : 180 divisé par 2,54 donne **70,866 pouces**.
2. **Pieds et pouces** : la partie entière de 70,866 / 12 vaut **5 pieds** (60 pouces), laissant **10,87 pouces**, affiché **5 pieds 10,9 pouces** (ou 5 pi 10 7/8 po au huitième de pouce).
3. **Centile régional** : dans la cohorte masculine mondiale (moyenne 171,0 cm, écart-type 7,0 cm), le score $z = (180{,}0 - 171{,}0) / 7{,}0 = +1{,}2857$ situe cet adulte au **90,1e centile**. En Allemagne (moyenne 180,0 cm), cette taille correspond exactement au **50,0e centile** ($z = 0$), tandis qu'aux Pays-Bas (moyenne 183,8 cm, écart-type 7,1 cm), elle correspond au **29,6e centile** ($z = -0{,}535$).

### Cas 2 : Taille cible parentale et comparateur visuel

Soit un père mesurant **182 cm** et une mère mesurant **164 cm** (somme parentale de **346 cm**, différence directe de **18 cm** soit un écart relatif de **11,0 %** dans le comparateur visuel) :

* **Garçon** : (346 + 13) / 2 = **179,5 cm**, plage génétique probable de **171,0 cm à 188,0 cm**.
* **Fille** : (346 − 13) / 2 = **166,5 cm**, plage probable de **158,0 cm à 175,0 cm**.

Une alimentation riche en protéines, calcium et vitamine D, couplée à un sommeil profond régulier et une activité physique adaptée, favorise pleinement le potentiel de croissance dans cette fourchette.

## Tableau de référence des moyennes régionales et conversions

Ce tableau rassemble les moyennes adultes intégrées au calculateur et le repère usuel observé en France, avec leur conversion exacte :

| Population de référence | Hommes (cm / impérial) | Femmes (cm / impérial) | Écart-type H / F |
| :--- | :--- | :--- | :--- |
| **Moyenne mondiale** | 171,0 cm (5 pi 7,3 po) | 159,0 cm (5 pi 2,6 po) | 7,0 / 6,5 cm |
| **France (repère adulte)** | 178,0 cm (5 pi 10,1 po) | 165,0 cm (5 pi 5,0 po) | ~7,0 / 6,5 cm |
| **États-Unis** | 175,3 cm (5 pi 9,0 po) | 161,8 cm (5 pi 3,7 po) | 7,4 / 6,9 cm |
| **Allemagne** | 180,0 cm (5 pi 10,9 po) | 166,0 cm (5 pi 5,4 po) | 7,1 / 6,5 cm |
| **Pays-Bas** | 183,8 cm (6 pi 0,4 po) | 170,4 cm (5 pi 7,1 po) | 7,1 / 6,5 cm |
| **Japon** | 170,8 cm (5 pi 7,2 po) | 158,0 cm (5 pi 2,2 po) | 6,1 / 5,8 cm |

## Erreurs courantes de mesure et limites à connaître

* **Confondre pieds décimaux et pieds-pouces** : Écrire « 5,9 pieds » pour « 5 pieds 9 pouces » reste l'erreur la plus fréquente. Comme un pied compte 12 pouces, **5 pi 9 po** valent **5,75 pieds** (**175,26 cm**), alors que **5,9 pieds** représentent **179,83 cm** — soit **4,57 cm** d'écart.
* **Négliger le protocole de mesure** : Mesurez pieds nus, talons, fesses et omoplates contre un mur plat, regard horizontal sur le plan de Francfort et à heure fixe, idéalement le matin avant la compression discale diurne de 1 à 2 cm.
* **Surestimer la portée clinique de Tanner** : La taille cible parentale ignore l'âge osseux, une puberté précoce ou tardive et les troubles endocriniens. Elle complète sans remplacer le suivi pédiatrique sur les courbes officielles (AFPA-INSERM en France, OMS au Canada).
* **Ignorer l'effet de l'âge sur les centiles** : La stature maximale est atteinte vers 20 ans puis diminue d'environ 1 cm par décennie après 40 ans ; comparer un senior à une cohorte jeune fausse le centile affiché.
