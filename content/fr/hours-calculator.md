---
title: "Calculateur d'Heures"
metaTitle: "Calculateur d'Heures de Travail, Pauses et Centièmes"
description: "Calculez votre temps de travail effectif entre une heure de début et de fin, déduisez vos pauses non rémunérées et convertissez vos minutes en heures décimales (centièmes) pour la paie."
metaDescription: "Calculez vos heures travaillées de jour ou de nuit, déduisez vos pauses et convertissez vos minutes en centièmes d'heure pour la paie et la facturation."
metaKeywords: "calculateur d'heures, heures de travail, temps de travail effectif, centièmes d'heure, heures décimales, feuille de temps, calcul paie, horaires de nuit"
faqs:
  - question: "Comment convertir des minutes en centièmes d'heure pour établir une fiche de paie ?"
    answer: "Il suffit de diviser le nombre de minutes par 60 afin de passer du système sexagésimal (base 60) au système décimal (base 10). Par exemple, 15 minutes équivalent exactement à 0,25 heure, 30 minutes à 0,50 heure et 45 minutes à 0,75 heure. Une erreur classique consiste à multiplier un taux horaire par 7,45 pour 7 h 45 min au lieu de 7,75, ce qui entraîne une sous-rémunération immédiate."
  - question: "Comment le calculateur gère-t-il un poste de nuit qui franchit minuit ?"
    answer: "Lorsque l'heure de fin saisie est antérieure à l'heure de début (par exemple un service de 21 h 45 à 06 h 20), l'algorithme ajoute automatiquement 24 heures (1 440 minutes) à l'horaire de fin pour calculer l'amplitude continue sur deux jours calendaires, puis retranche la pause non rémunérée. Attention toutefois aux deux nuits annuelles de changement d'heure (été/hiver), qui durent réellement 23 heures ou 25 heures."
  - question: "Toutes les pauses doivent-elles être déduites du temps de travail effectif ?"
    answer: "Seules les pauses non rémunérées durant lesquelles le salarié peut vaquer librement à ses occupations personnelles doivent être déduites. En France, le Code du travail impose 20 minutes de pause dès 6 heures consécutives ; en Suisse (LTr), 15 minutes dès 5 h 30, 30 minutes dès 7 heures et 60 minutes dès 9 heures ; au Québec (CNESST), 30 minutes de repas après 5 heures. Si vous restez à la disposition de l'employeur pendant votre pause, elle constitue du temps de travail effectif et ne doit pas être soustraite."
  - question: "Pourquoi 35 heures hebdomadaires correspondent-elles à 151,67 heures mensuelles sur un bulletin de paie ?"
    answer: "En France, la mensualisation lisse la durée hebdomadaire sur les 52 semaines de l'année réparties en 12 mois : 35 × 52 / 12 = 151,6667 heures, arrondies à 151,67 heures décimales (soit 151 h 40 min). Selon la même logique, une semaine de 38 heures en Belgique représente 164,67 heures mensuelles, 40 heures au Québec donnent 173,33 heures et 42 heures en Suisse équivalent à 182,00 heures."
  - question: "Comment calculer un salaire brut incluant des heures supplémentaires ou des majorations de nuit ?"
    answer: "Le calculateur multiplie votre durée nette en heures décimales par le taux horaire saisi pour estimer la rémunération de base. Pour intégrer des heures supplémentaires (par exemple +25 % de la 36e à la 43e heure et +50 % au-delà en France, ou +50 % après 40 heures au Québec) ou une prime de nuit, calculez séparément le bloc d'heures normales et le bloc majoré en appliquant le taux horaire majoré correspondant."
---

La gestion des feuilles de temps, du pointage et de la facturation horaire repose sur deux systèmes numériques distincts : l'horloge compte en **base 60** (minutes sexagésimales), tandis que les bulletins de paie et honoraires s'expriment en **base 10** en euros (`€`), francs suisses (`CHF`) ou dollars canadiens (`CAD`).

Notre calculateur d'heures assure instantanément cette conversion. À partir de votre **Heure de Début**, **Heure de Fin**, **Durée de la Pause** non rémunérée et **Taux Horaire** facultatif, il calcule le temps net (`h` et `min`), les **heures décimales (centièmes)** et le **salaire brut estimé**, de jour comme de nuit.

## Équations du Temps de Travail Effectif et des Centièmes

Pour décompter une vacation à la minute près sans ambiguïté au passage de minuit, chaque horaire est converti en minutes depuis `00 h 00` :

$$t_d = 60 \times H_d + M_d \qquad t_f = 60 \times H_f + M_f$$

* **$H_d, M_d$** et **$H_f, M_f$** : heures (`0` à `23`) et minutes (`0` à `59`) de début et de fin de poste.
* **$P$** : durée totale des pauses non rémunérées en minutes ($0 \le P < D_{\text{brute}}$).
* **$T_h$** : taux horaire brut facultatif (`€/h`, `CHF/h` ou `CAD/h`).

### Franchissement de minuit, centièmes et salaire brut

Si l'horaire de fin précède le début ($t_f < t_d$), le poste franchit minuit et l'algorithme ajoute **1 440 minutes** (24 heures) :

$$D_{\text{brute}} = \begin{cases} t_f - t_d & \text{si } t_f \ge t_d \\ (t_f + 1\,440) - t_d & \text{si } t_f < t_d \end{cases}$$

Après retrait de la pause ($D_{\text{nette}} = D_{\text{brute}} - P$), le format horaire, les **heures décimales** ($H_{\text{déc}}$, conservées à quatre décimales pour la paie puis affichées en centièmes) et le salaire brut ($S_{\text{brut}}$) s'obtiennent directement :

$$H_{\text{ent}} = \left\lfloor \frac{D_{\text{nette}}}{60} \right\rfloor \qquad M_{\text{rest}} = D_{\text{nette}} \bmod 60 \qquad H_{\text{déc}} = \frac{D_{\text{nette}}}{60} \qquad S_{\text{brut}} = H_{\text{déc}} \times T_h$$

## Exemple Chiffré Pas à Pas : Vacation de Nuit et Paie Brute

Soit un technicien ou soignant travaillant de **21 h 45** à **06 h 20**, avec **45 minutes** de pause repas non rémunérée et un taux horaire brut de **18,50 €/h**.

1. **Minutes depuis minuit** : début à $t_d = 21 \times 60 + 45 = 1\,305\text{ min}$ ; fin à $t_f = 6 \times 60 + 20 = 380\text{ min}$.
2. **Franchissement de minuit** : comme $380 < 1\,305$, on ajoute $1\,440\text{ min}$ ($1\,820\text{ min}$), donnant une amplitude brute de $1\,820 - 1\,305 = \mathbf{515\text{ min}}$ (**8 h 35 min**).
3. **Temps net** : $D_{\text{nette}} = 515 - 45 = \mathbf{470\text{ min}}$, soit **7 h 50 min**.
4. **Centièmes et salaire brut** : $H_{\text{déc}} = \frac{470}{60} \approx \mathbf{7{,}8333\text{ h}}$ (affiché **7,83 h**), soit $7{,}8333 \times 18{,}50 = \mathbf{144{,}92\text{ €}}$.

L'erreur courante consistant à calculer $7{,}50 \times 18{,}50$ produirait **138,75 €**, soit **6,17 €** perdus sur une seule nuit. Sur cinq vacations (**2 350 minutes**, soit **39 h 10 min** ou **39,1667 h**), le cumul exact atteint **724,58 €**, contre **724,27 €** si chaque journée est arrondie préalablement à `7,83 h` (`39,15 h`).

## Table de Conversion : Minutes, Centièmes et Valeur Horaire

Ce barème résume les conversions usuelles entre minutes, heures décimales et rémunération à un taux témoin de **20,00 €/h** (ou `20,00 CAD/h`) :

| Minutes | Fraction | Décimale (4 chiff.) | Centièmes | Valeur à 20,00 €/h |
| :--- | :--- | :--- | :--- | :--- |
| **5 min** | 1/12 | 0,0833 h | 0,08 h | 1,67 € |
| **10 min** | 1/6 | 0,1667 h | 0,17 h | 3,33 € |
| **12 min** | 1/5 | 0,2000 h | 0,20 h | 4,00 € |
| **15 min** | 1/4 | 0,2500 h | 0,25 h | 5,00 € |
| **20 min** | 1/3 | 0,3333 h | 0,33 h | 6,67 € |
| **30 min** | 1/2 | 0,5000 h | 0,50 h | 10,00 € |
| **45 min** | 3/4 | 0,7500 h | 0,75 h | 15,00 € |
| **50 min** | 5/6 | 0,8333 h | 0,83 h | 16,67 € |

Seuls les multiples de **6, 12, 15 et 30 minutes** possèdent une écriture décimale finie ; les autres fractions génèrent une décimale périodique.

## Erreurs Fréquentes de Pointage et Bonnes Pratiques Paie

* **Cumuler les minutes avant de convertir** : Sur un mois de 20 à 22 jours, arrondir chaque journée en centièmes crée une dérive cumulée. Additionnez d'abord toutes les minutes de la période, puis divisez une seule fois par 60.
* **Appliquer les bases légales francophones** : La durée de référence mensuelle diffère selon le pays — **35 h/semaine** (`151,67 h/mois`) en France, **38 h** (`164,67 h/mois`) en Belgique, **40 h** (`173,33 h/mois`) au Québec et souvent **42 à 45 h** en Suisse (LTr). Les heures supplémentaires se déclenchent au-delà de ces seuils.
* **Corriger les nuits de changement d'heure** : Une garde de `22 h 00` à `06 h 00` dure **9 heures** réelles au passage à l'heure d'hiver et **7 heures** au printemps ; ajustez manuellement d'une heure ces deux nuits annuelles.
* **Distinguer pauses libres et astreinte** : Toute coupure où le salarié reste à disposition de l'employeur constitue du temps de travail effectif rémunéré. De même, isolez séparément les plages majorées de nuit (`21 h – 06 h` en France, `20 h – 06 h` en Belgique, `23 h – 06 h` en Suisse).
