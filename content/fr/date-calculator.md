---
title: "Calculateur de Date"
metaTitle: "Calculateur de Date : Jours Entre Deux Dates et Délais"
description: "Calculez l'écart exact en années, mois, semaines et jours entre deux dates du calendrier grégorien, ou ajoutez et soustrayez une durée précise."
metaDescription: "Calculez le nombre exact de jours, semaines et mois entre deux dates grégoriennes ou déterminez une échéance légale en ajoutant une durée précise."
metaKeywords: "calculateur de date, jours entre deux dates, calculer une durée, ajouter des jours à une date, compteur de jours, échéance légale, année bissextile, jours calendaires"
faqs:
  - question: "Comment fonctionne l'option « inclure le jour de fin » dans le calcul d'une durée ?"
    answer: "Par défaut, le calculateur mesure un écart exclusif entre deux dates, à l'image du nombre de nuits entre une date d'arrivée et une date de départ. En cochant l'inclusion du jour de fin, l'outil ajoute exactement une journée calendaire (86 400 secondes), ce qui correspond au décompte d'un congé pris du premier au dernier jour inclus ou d'une location facturée à la journée."
  - question: "Quelle est la règle complète des années bissextiles dans le calendrier grégorien ?"
    answer: "Une année est bissextile (366 jours, avec un 29 février) si son millésime est divisible par 4, à l'exception des années séculaires divisibles par 100 comme 1900 ou 2100, sauf si elles sont également divisibles par 400 comme 2000 ou 2400. Cette correction fixe la durée moyenne de l'année civile à 365,2425 jours."
  - question: "Que se passe-t-il si l'on ajoute un mois au 31 janvier ou un an au 29 février ?"
    answer: "Le calculateur applique un écrêtage de fin de mois afin d'éviter un glissement involontaire sur le mois suivant. Ainsi, ajouter un mois au 31 janvier renvoie le 28 février (ou le 29 février lors d'une année bissextile), et ajouter un an au 29 février 2024 conduit au 28 février 2025 plutôt qu'au 1er mars."
  - question: "Quelle différence entre jours calendaires, jours ouvrables et jours ouvrés en droit francophone ?"
    answer: "Les jours calendaires englobent tous les jours sans exception, dimanches et fériés compris. Les jours ouvrables comptent du lundi au samedi hors jours fériés chômés (base des 30 jours de congés payés en France), tandis que les jours ouvrés correspondent aux jours travaillés, généralement du lundi au vendredi (25 jours par an). Notre outil opère en jours calendaires purs."
  - question: "Pourquoi le calcul de dates utilise-t-il le temps universel coordonné (UTC) plutôt que l'heure locale ?"
    answer: "En Europe francophone et au Canada, les passages à l'heure d'été et d'hiver créent chaque année une journée locale de 23 heures et une autre de 25 heures. Calculer une différence en heure locale puis diviser par 86 400 secondes peut fausser le résultat d'une journée entière. Le calcul en temps universel coordonné (UTC) fixe chaque journée exactement à 86 400 secondes."
---

## Arithmétique du Calendrier Grégorien et Calcul de Durées

Déterminer manuellement l'intervalle entre deux dates ou calculer une échéance précise expose facilement à des erreurs de comptage. Le calendrier grégorien superpose des mois de longueurs inégales (28, 29, 30 et 31 jours), des années bissextiles de 366 jours et des changements d'heure saisonniers qui perturbent les calculs naïfs en heure locale.

Notre **Calculateur de Date** automatise deux opérations complémentaires avec une exactitude rigoureuse : la **durée entre deux dates** (jours calendaires totaux, semaines décimales et décomposition en années, mois et jours, avec inclusion facultative du jour final) ainsi que l'**ajout ou la soustraction d'une durée** (années, mois, semaines et jours) pour fixer un préavis locatif, une échéance contractuelle ou un jalon de projet.

## Formules Exactes : Écart en Jours, Décomposition et Écrêtage

Chaque date est normalisée en horodatage UTC à minuit (`00:00:00 UTC`), éliminant tout décalage lié aux fuseaux horaires. En unité du Système international (SI), une journée vaut exactement $86\,400\text{ s}$. Pour deux dates ordonnées $t_1 \le t_2$ (en secondes UTC), l'écart total en jours et en semaines s'écrit :

$$J_{\text{total}} = \frac{t_2 - t_1}{86\,400} + \delta_{\text{fin}} \qquad \text{et} \qquad S = \frac{J_{\text{total}}}{7}$$

La règle grégorienne déterminant si une année $A$ est bissextile (février à 29 jours) vérifie :

$$B(A) \iff \bigl((A \bmod 4 = 0) \land (A \bmod 100 \neq 0)\bigr) \lor (A \bmod 400 = 0)$$

Pour l'ajout ou la soustraction d'une durée $(A_{\text{op}}, M_{\text{op}}, S_{\text{op}}, J_{\text{op}})$ de signe $s \in \{+1, -1\}$, le calcul décale d'abord les années et les mois avec écrêtage sur le dernier jour du mois cible, puis applique le décalage exact en jours :

$$j_{\text{interm}} = \min\!\bigl(j_0,\; L(A_{\text{cible}}, M_{\text{cible}})\bigr), \qquad \Delta J_{\text{exact}} = s \times (7 \times S_{\text{op}} + J_{\text{op}})$$

### Définition des variables

* **$t_1, t_2$** : horodatages UTC en secondes (unité SI) des dates bornes, réordonnés si la date finale précède celle de départ.
* **$\delta_{\text{fin}} \in \{0, 1\}$** : indicateur d'inclusion du jour final ($0$ pour un écart exclusif ; $1$ lorsque l'option « inclure le jour de fin » est activée).
* **$L(A, M)$** : nombre de jours du mois $M$ de l'année $A$ ($31$, $30$, ou $29$ en février si $B(A)$ est vrai, sinon $28$).
* **Décomposition $(A, M, J)$** : calculée composante par composante ; si l'écart de jours est négatif, l'outil emprunte $1$ mois en ajoutant $L(A_{\text{prec}}, M_{\text{prec}})$, puis emprunte $1$ an ($+12$ mois) si l'écart mensuel devient négatif.

## Exemple Chiffré Pas à Pas : Projet Traversant une Année Bissextile

Considérons un chantier débutant le **18 novembre 2023** et s'achevant le **10 mars 2025**, couvrant l'année bissextile **2024**.

1. **Décompte exact en jours (jour de fin exclu)** :
   * Fin 2023 (18 novembre au 31 décembre) : $12 + 31 = \mathbf{43\text{ jours}}$.
   * Année 2024 (bissextile) : $\mathbf{366\text{ jours}}$.
   * Début 2025 (1er janvier au 10 mars) : $31 + 28 + 10 = \mathbf{69\text{ jours}}$.
   * Total : $J_{\text{total}} = 43 + 366 + 69 = \mathbf{478\text{ jours}}$, soit $478 / 7 = \mathbf{68{,}29\text{ semaines}}$.
2. **Décomposition calendaire** :
   * Écarts bruts : $2\text{ ans}$, $-8\text{ mois}$, $-8\text{ jours}$.
   * Emprunt sur février 2025 ($28$ jours) : $-8 + 28 = \mathbf{20\text{ jours}}$ et $-9\text{ mois}$ ; puis emprunt d'une année : **1 an, 3 mois et 20 jours**.
   * Avec le **jour de fin inclus** ($\delta_{\text{fin}} = 1$) : **479 jours** (**68,43 semaines**), soit **1 an, 3 mois et 21 jours**.
3. **Ajout avec écrêtage de fin de mois** :
   À partir du **30 janvier 2026**, ajouter **1 mois, 2 semaines et 3 jours** écrête d'abord le mois au **28 février 2026** (2026 étant non bissextile), puis ajoute $\Delta J = 2 \times 7 + 3 = 17\text{ jours}$ pour atteindre exactement le **mardi 17 mars 2026**.

## Repères de Délais Légaux dans la Francophonie

| Délai Courant | Pays / Région | Base de Décompte | Règle d'Échéance |
| :--- | :--- | :--- | :--- |
| **Rétractation (vente à distance)** | France, Belgique | **14 jours calendaires** | Dès le lendemain de réception ; report au 1er jour ouvrable si fin un dimanche ou férié |
| **Préavis bail d'habitation** | France | **1 mois ou 3 mois** | Calcul de date à date (31 janvier $\rightarrow$ 28 ou 29 février) |
| **Résiliation de bail** | Suisse | **3 mois** | Pour un terme local d'usage ou une fin de mois ; réception avant le début du délai |
| **Avis de non-reconduction** | Québec (Canada) | **3 à 6 mois** | Avant la fin d'un bail de 12 mois et plus (1 à 2 mois sous 12 mois) |
| **Paiement entre entreprises** | France, Belgique | **30 à 60 jours** | Plafond légal français : 60 jours nets ou 45 jours fin de mois |
| **Congés payés annuels** | FR / BE, CH / QC | **30 j ouvrables** / **4 sem.** / **2–3 sem.** | Distinguer jours calendaires, ouvrables (6 j/sem.) et ouvrés (5 j/sem.) |

## Conseils Pratiques et Pièges Courants du Calcul de Dates

* **Vérifiez l'inclusion des bornes** : un séjour du 10 au 15 août totalise **5 nuits** (jour final exclu), mais un congé du 10 au 15 août inclus couvre **6 jours calendaires** (jour final inclus).
* **L'addition de mois et de jours n'est pas commutative** : depuis le **30 janvier 2026**, ajouter **1 mois** (écrêtage au 28 février) puis **2 jours** donne le **lundi 2 mars 2026**, alors qu'ajouter **2 jours** (1er février) puis **1 mois** mène au **1er mars 2026**. Précisez l'ordre dans toute clause mêlant mois et jours.
* **Un mois civil ne vaut pas 30 jours fixes** : en année commune, 6 mois du 1er janvier au 1er juillet font **181 jours**, contre **184 jours** du 1er juillet au 1er janvier suivant. Utilisez toujours les jours calendaires exacts pour des intérêts moratoires.
* **Anticipez les jours fériés et fins de semaine** : en procédure civile (article 642 en France, règles analogues en Belgique, Suisse et Québec), une échéance tombant un samedi, un dimanche ou un jour férié est généralement prorogée au premier jour ouvrable suivant. Contrôlez toujours le jour de la semaine affiché avant d'expédier un courrier recommandé.
