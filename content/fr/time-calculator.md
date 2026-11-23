---
title: "Calculateur de Temps"
metaTitle: "Calculateur de Temps : Durée, Heures et Base 60 en Ligne"
description: "Calculez la durée exacte entre deux horaires (avec passage à minuit) ou additionnez et soustrayez des jours, heures, minutes et secondes en base sexagésimale."
metaDescription: "Calculez le temps écoulé entre deux horaires (même après minuit) ou additionnez et soustrayez des durées en jours, heures, minutes et secondes."
metaKeywords: "calculateur de temps, calculatrice d'heures, calculer une durée, additionner des heures, soustraire du temps, temps écoulé, conversion heures décimales"
faqs:
  - question: "Comment convertir facilement des heures et minutes en heures décimales pour la paie ?"
    answer: "Divisez le nombre de minutes par 60 et ajoutez le résultat aux heures entières : H_déc = h + (m / 60). Par exemple, 7 h 45 équivaut à 7 + (45 / 60) = 7,75 heures décimales, et non 7,45 heures. Cette conversion est indispensable avant de multiplier une durée travaillée par un taux horaire brut ou facturable."
  - question: "Comment le calculateur gère-t-il un horaire de travail qui franchit minuit ?"
    answer: "En mode différence d'horaires, lorsque l'heure de fin est numériquement antérieure à l'heure de début (par exemple un poste de nuit de 21 h 45 à 06 h 15), l'algorithme ajoute automatiquement 24 heures (soit 1 440 minutes) à l'horaire de fin. Il mesure ainsi l'intervalle réel sur deux journées calendaires consécutives, soit exactement 8 heures et 30 minutes (510 minutes)."
  - question: "Pourquoi additionner 1 h 45 et 1 h 30 sur une calculatrice classique donne-t-il un résultat faux ?"
    answer: "Une calculatrice ordinaire opère en base 10 (système décimal), où une unité vaut 100 centièmes : additionner 1,45 + 1,30 renvoie 2,75. Or le temps suit un système sexagésimal (base 60), dans lequel 60 minutes forment 1 heure : 45 min + 30 min = 75 min = 1 h 15 min, ce qui porte la somme exacte à 3 h 15 min (soit 3,25 heures décimales)."
  - question: "Comment calculer la durée réelle d'un vol international traversant plusieurs fuseaux horaires ?"
    answer: "Les heures affichées sur un billet d'avion sont toujours exprimées en heure locale de départ et d'arrivée. Pour connaître le temps de vol réel, convertissez d'abord les deux horaires en Temps Universel Coordonné (UTC) en retranchant le décalage horaire de chaque ville, puis calculez la différence entre ces deux horaires UTC."
  - question: "Le calculateur tient-il compte du passage à l'heure d'été ou à l'heure d'hiver ?"
    answer: "Non. Le calcul de différence horaire fonctionne sur une journée solaire civile uniforme de 24 heures (1 440 minutes) sans calendrier de fuseau horaire. Lors de la nuit du changement d'heure en Europe ou au Canada, un poste de 22 h 00 à 06 h 00 dure en réalité 7 heures au passage à l'heure d'été (nuit de 23 h) et 9 heures au retour à l'heure d'hiver (nuit de 25 h) : pensez à ajuster manuellement d'une heure lors de ces deux nuits annuelles."
---

Additionner des relevés d'heures, calculer un poste de nuit franchissant minuit, cumuler des séquences de montage vidéo ou comparer des chronos sportifs expose toujours au même piège : le temps obéit au **système sexagésimal** (base 60 pour les minutes et secondes, base 24 pour les heures par jour) et non au système décimal. Convertir chaque durée dans l'unité fondamentale du Système international — la **seconde ($\text{s}$)** — garantit des sommes, soustractions et intervalles exacts sans erreur de retenue.

## Formules exactes de l'arithmétique temporelle

Le calculateur combine deux moteurs : la différence entre deux heures d'horloge et l'arithmétique complète en jours, heures, minutes et secondes.

### 1. Différence entre deux horaires (avec passage à minuit)

Pour une heure de début $(h_1, m_1)$ et une heure de fin $(h_2, m_2)$ au format 24 heures, on convertit chaque horaire en minutes depuis minuit :

$$M_1 = 60\,h_1 + m_1 \qquad \text{et} \qquad M_2 = 60\,h_2 + m_2$$

Lorsque la période franchit minuit ($M_2 < M_1$), on ajoute une journée civile de $1\,440\text{ min}$ ($24 \times 60$) :

$$\Delta M = \begin{cases} M_2 - M_1 & \text{si } M_2 \ge M_1 \\ (M_2 + 1\,440) - M_1 & \text{si } M_2 < M_1 \end{cases}$$

La division euclidienne donne ensuite $H = \left\lfloor \dfrac{\Delta M}{60} \right\rfloor$ et $\text{Min} = \Delta M \bmod 60$.

### 2. Addition et soustraction de durées ($j,\; h,\; m,\; s$)

Chaque durée est transformée en un entier exact de secondes ($\text{s}$) :

$$S = 86\,400\,j + 3\,600\,h + 60\,m + s$$

Après $S_{\text{rés}} = S_1 \pm S_2$ (un résultat négatif en soustraction indique un déficit ou une avance), on décompose $|S_{\text{rés}}|$ en cascade :

$$j = \left\lfloor \frac{|S_{\text{rés}}|}{86\,400} \right\rfloor, \quad h = \left\lfloor \frac{|S_{\text{rés}}| \bmod 86\,400}{3\,600} \right\rfloor, \quad m = \left\lfloor \frac{|S_{\text{rés}}| \bmod 3\,600}{60} \right\rfloor, \quad s = |S_{\text{rés}}| \bmod 60$$

Pour la paie ou la facturation, la conversion en **heures décimales** (centièmes d'heure) s'écrit :

$$H_{\text{déc}} = h + \frac{m}{60} + \frac{s}{3\,600}$$

## Exemples chiffrés pas à pas

### Exemple 1 : Poste de nuit avec passage à minuit et pause
Un salarié travaille de **21 h 45** à **06 h 15** le lendemain, avec une pause non rémunérée de $45\text{ min}$.
1. **Minutes depuis minuit** : $M_1 = 21 \times 60 + 45 = 1\,305\text{ min}$ ; $M_2 = 6 \times 60 + 15 = 375\text{ min}$.
2. **Franchissement de minuit** : comme $375 < 1\,305$, $M_2' = 375 + 1\,440 = 1\,815\text{ min}$.
3. **Temps de présence** : $\Delta M = 1\,815 - 1\,305 = \mathbf{510\text{ min}} = \mathbf{8\text{ h } 30\text{ min}}$ ($8,50\text{ h}$ décimales).
4. **Temps effectif après pause** : $510 - 45 = 465\text{ min} = \mathbf{7\text{ h } 45\text{ min}}$, soit **$7,75\text{ h}$** à multiplier par le taux horaire.

### Exemple 2 : Addition avec retenues en cascade
Additionnons $1\text{ j } 14\text{ h } 48\text{ min } 50\text{ s}$ et $0\text{ j } 11\text{ h } 35\text{ min } 25\text{ s}$ :
1. **Mise en secondes** : $S_1 = 86\,400 + 50\,400 + 2\,880 + 50 = 139\,730\text{ s}$ et $S_2 = 39\,600 + 2\,100 + 25 = 41\,725\text{ s}$.
2. **Somme totale** : $S_{\text{total}} = 139\,730 + 41\,725 = \mathbf{181\,455\text{ s}}$.
3. **Normalisation** : $2\text{ j}$ ($172\,800\text{ s}$, reste $8\,655\text{ s}$), puis $2\text{ h}$ ($7\,200\text{ s}$, reste $1\,455\text{ s}$), puis $24\text{ min}$ ($1\,440\text{ s}$, reste $15\text{ s}$), soit **$2\text{ j } 2\text{ h } 24\text{ min } 15\text{ s}$**.

## Table de conversion sexagésimale vers heures décimales

| Durée (`h:min`) | Minutes | Secondes (SI) | Heures Décimales | Repère Pratique |
| :--- | :--- | :--- | :--- | :--- |
| **0 h 06 min** | $6\text{ min}$ | $360\text{ s}$ | **$0,1000\text{ h}$** | Un dixième d'heure exact (tranche juridique) |
| **0 h 15 min** | $15\text{ min}$ | $900\text{ s}$ | **$0,2500\text{ h}$** | Quart d'heure (facturation standard) |
| **0 h 20 min** | $20\text{ min}$ | $1\,200\text{ s}$ | $0,3333\text{ h}$ | Pause légale minimale en France dès 6 h |
| **0 h 30 min** | $30\text{ min}$ | $1\,800\text{ s}$ | **$0,5000\text{ h}$** | Demi-heure exacte |
| **0 h 45 min** | $45\text{ min}$ | $2\,700\text{ s}$ | **$0,7500\text{ h}$** | Trois quarts d'heure |
| **7 h 30 min** | $450\text{ min}$ | $27\,000\text{ s}$ | **$7,5000\text{ h}$** | Journée type ($37,5\text{ h}$ au Canada/Suisse) |
| **24 h 00 min** | $1\,440\text{ min}$ | $86\,400\text{ s}$ | **$24,0000\text{ h}$** | Jour solaire civil complet |

## Erreurs fréquentes et bonnes pratiques professionnelles

1. **Confondre minutes et centièmes d'heure** : saisir `7,30` au lieu de `7,50` pour $7\text{ h } 30\text{ min}$ sous-estime la durée de $12$ minutes par jour, soit $4$ heures perdues sur un mois de $20$ jours ouvrés.
2. **Dépassement de 24 heures sur tableur** : dans Excel ou LibreOffice Calc, le format standard `hh:mm` repart à zéro après $24\text{ h}$ (affichant `02:30` pour `26:30`). Utilisez le format personnalisé `[h]:mm:ss` pour les cumuls longs.
3. **Oublier la conversion UTC sur les vols internationaux** : une soustraction directe entre l'heure de Paris (UTC+1) et celle de Montréal (UTC-5) fausse la durée réelle de $6$ heures. Convertissez toujours les horaires en UTC au préalable.
4. **Nuits de changement d'heure saisonnier** : le passage à l'heure d'été ($23\text{ h}$) et à l'heure d'hiver ($25\text{ h}$) rompt la règle des $1\,440$ minutes ; ajustez manuellement d'une heure lors de ces deux nuits.
5. **Interpréter les durées négatives** : en mode soustraction, un signe moins (comme `-1 h 25 min`) signale immédiatement un déficit sur un compteur d'heures hebdomadaire ou une avance par rapport à un chrono cible.
