---
title: "Calculateur de Date de Conception"
metaTitle: "Calculateur de Date de Conception : Fécondation & Terme"
description: "Estimez la date probable de fécondation et votre fenêtre de fertilité à partir de votre date prévue d'accouchement (DPA), d'une échographie de datation ou de vos dernières règles."
metaDescription: "Estimez votre date de conception et votre fenêtre de fertilité à partir de la DPA, d'une échographie (SA) ou de vos dernières règles selon votre cycle."
metaKeywords: "calculateur date de conception, calcul date fécondation, calculer début de grossesse, semaines d'aménorrhée SA et SG, fenêtre de fertilité, échographie de datation LCC, date prévue accouchement DPA"
faqs:
  - question: "Pourquoi le terme officiel est-il fixé à 41 SA en France contre 40 SA en Belgique, en Suisse et au Canada ?"
    answer: "En France, l'Assurance Maladie et le Collège national des gynécologues et obstétriciens français (CNGOF) retiennent une grossesse de 9 mois calendaires pleins, soit 41 semaines d'aménorrhée (39 semaines de grossesse réelle, environ 273 jours après fécondation). L'Organisation mondiale de la santé (OMS), la Belgique, la Suisse et la Société des obstétriciens et gynécologues du Canada (SOGC) appliquent la norme internationale de 40 SA (280 jours depuis les dernières règles, soit 266 jours après conception). Si vous saisissez une DPA française calculée à 41 SA dans le mode Depuis DPA, retranchez 7 jours à cette date pour éviter un décalage d'une semaine."
  - question: "Quelle est la différence entre les semaines d'aménorrhée (SA) et les semaines de grossesse (SG) ?"
    answer: "Les semaines d'aménorrhée (SA) se comptent à partir du premier jour des dernières règles, tandis que les semaines de grossesse (SG) correspondent à l'âge embryonnaire ou fœtal réel depuis la fécondation. Pour un cycle classique de 28 jours, l'ovulation survient au 14e jour : on compte donc toujours 2 semaines d'écart (SA = SG + 2). À 12 SA lors de la première échographie, l'embryon a ainsi 10 semaines de développement réel."
  - question: "Pourquoi la fenêtre de fertilité s'étend-elle de 5 jours avant la conception jusqu'au lendemain ?"
    answer: "Le jour de fécondation coïncide rarement avec le jour exact du rapport sexuel. Dans une glaire cervicale fertile, les spermatozoïdes survivent et conservent leur pouvoir fécondant jusqu'à 5 jours dans les trompes de Fallope, tandis que l'ovocyte libéré lors de l'ovulation ne reste viable que 12 à 24 heures. Tout rapport intervenu dans cette fenêtre de 6 jours d'amplitude (7 jours calendaires inclus) peut donc aboutir à la grossesse."
  - question: "Quelle méthode donne l'estimation la plus fiable : DPA, dernières règles ou échographie ?"
    answer: "L'échographie de datation du premier trimestre, pratiquée entre 11 SA et 13 SA + 6 jours grâce à la mesure de la longueur cranio-caudale (LCC), offre la meilleure précision clinique (marge d'erreur de ±3 à 5 jours). Le calcul par les dernières règles devient peu fiable en cas de cycles irréguliers, d'ovulation tardive, d'allaitement ou d'arrêt récent d'une contraception hormonale."
  - question: "Un calculateur de date de conception permet-il d'établir une paternité avec certitude ?"
    answer: "Non. Même adossé à une échographie précoce de qualité, le cumul entre la variabilité biométrique (±3 à 5 jours) et la durée de survie des spermatozoïdes (jusqu'à 5 jours) laisse une plage d'incertitude de 7 à 10 jours. Lorsque plusieurs rapports ont eu lieu au cours de cette période fertile, seule une expertise génétique (encadrée judiciairement en France par le Code civil) apporte une réponse certaine."
---

Lorsqu'une grossesse est confirmée, les praticiens expriment d'emblée son avancement en **semaines d'aménorrhée (SA)** et fixent une **date prévue d'accouchement (DPA)** sans toujours indiquer le jour probable de la fécondation. Ce calculateur effectue la démarche obstétricale inverse — la **datation rétrograde** — afin d'estimer la date de conception et la fenêtre de rapports fécondants à partir de trois données au choix : votre DPA, un compte rendu d'échographie ou le premier jour de vos dernières règles ajusté à votre cycle.

## Les Équations de Datation Rétrograde et la Fenêtre Fertile

Selon la norme obstétricale internationale (Organisation mondiale de la santé et règle de Naegele appliquée en Belgique, en Suisse et au Canada), une grossesse dure **$280\text{ jours}$** ($40\text{ SA}$) depuis les dernières règles, soit exactement **$266\text{ jours}$** ($38\text{ semaines de grossesse réelle}$) entre la fécondation et le terme. Les trois modes du calculateur appliquent ces équations :

1. **Depuis la Date Prévue d'Accouchement ($D_{\text{DPA}}$)** :
   $$D_{\text{conception}} = D_{\text{DPA}} - 266\text{ jours}$$
2. **Depuis une Échographie ($D_{\text{écho}}$)** mesurant un âge gestationnel de $S$ semaines d'aménorrhée et $J$ jours ($G = 7S + J$) :
   $$D_{\text{conception}} = D_{\text{écho}} - (7S + J) + 14\text{ jours}, \qquad D_{\text{DPA}} = D_{\text{conception}} + 266\text{ jours}$$
3. **Depuis les Dernières Règles ($D_{\text{DDR}}$)** pour un cycle habituel de longueur $L$ ($20 \le L \le 45\text{ jours}$), la phase lutéale post-ovulatoire restant quasi constante à $14\text{ jours}$ :
   $$D_{\text{conception}} = D_{\text{DDR}} + 14 + (L - 28) = D_{\text{DDR}} + (L - 14)$$

Où **$D_{\text{conception}}$** désigne le jour estimé de fécondation ($J_0$), **$S$** et **$J$** les semaines complètes et jours mesurés lors de l'examen échographique, et **$L$** la durée moyenne en jours entre deux menstruations consécutives.

Parce que les spermatozoïdes survivent jusqu'à **$5\text{ jours}$** dans la glaire cervicale fertile tandis que l'ovocyte demeure fécondable **$12\text{ à }24\text{ heures}$**, l'outil délimite automatiquement la **fenêtre de rapports fécondants** :

$$\text{Fenêtre fertile} = \left[\, D_{\text{conception}} - 5\text{ jours}\; ;\; D_{\text{conception}} + 1\text{ jour} \,\right]$$

> **Spécificité française (41 SA contre 40 SA)** : En France, l'Assurance Maladie fixe le terme officiel à **$41\text{ SA}$** ($273\text{ jours}$ après la fécondation, soit neuf mois calendaires). Si vous saisissez une DPA française dans le mode « Depuis DPA », retranchez $7\text{ jours}$ à cette date ou privilégiez le mode « Depuis Écho », qui s'appuie directement sur l'âge mesuré en SA.

## Exemples Chiffrés Pas à Pas : Échographie Précoce et Cycle Long

### Cas n° 1 : Datation à partir d'une échographie du 1er trimestre

Une patiente passe son échographie de datation le **15 juillet 2026**. La mesure de la longueur cranio-caudale (LCC) révèle un âge gestationnel de **$11\text{ SA}$ et $4\text{ jours}$**.

1. **Conversion en jours d'aménorrhée** : $G = (11 \times 7) + 4 = 81\text{ jours}$.
2. **Remontée vers la conception** : $15\text{ juillet }2026 - 81\text{ jours}$ donne une DDR théorique au **25 avril 2026** ; en ajoutant $14\text{ jours}$, on obtient une date probable de conception au **9 mai 2026**.
3. **Fenêtre fertile** : de $9\text{ mai} - 5\text{ j}$ à $9\text{ mai} + 1\text{ j}$, soit du **4 mai au 10 mai 2026**.
4. **Terme estimé** : $9\text{ mai }2026 + 266\text{ jours} =$ **30 janvier 2027** à $40\text{ SA}$ (correspondant au **6 février 2027** à $41\text{ SA}$ selon le calcul administratif français).

### Cas n° 2 : Estimation sur un cycle régulier long de 33 jours

Les dernières règles ont débuté le **1er avril 2026** pour un cycle régulier de **$L = 33\text{ jours}$**.

1. **Décalage d'ovulation** : $L - 14 = 33 - 14 = 19\text{ jours}$ après la DDR (soit $5\text{ jours}$ plus tard qu'un cycle standard de $28\text{ jours}$).
2. **Date de conception et fenêtre fertile** : conception probable le **20 avril 2026**, rapports fécondants entre le **15 avril et le 21 avril 2026**, et DPA internationale ($40\text{ SA}$) au **11 janvier 2027** ($18\text{ janvier }2027$ à $41\text{ SA}$).

## Comparatif des Méthodes de Datation Obstétricale

| Méthode de Datation | Données Requises | Base Temporelle | Marge d'Erreur | Fiabilité (Cycle Irrégulier) |
| :--- | :--- | :--- | :--- | :--- |
| **Échographie T1 (LCC)** | Date + âge en SA et jours | Biométrie embryonnaire | **± 3 à 5 jours** | **Très élevée** |
| **Dernières règles (DDR)** | Date DDR + durée cycle $L$ | Phase lutéale de 14 j | ± 5 à 10 jours | **Faible** |
| **DPA 40 SA (OMS / BE / CH / CA)** | Date du terme à 40 SA | $D_{\text{DPA}} - 266\text{ j}$ | Selon source DPA | **Élevée** si issue d'écho |
| **DPA 41 SA (France)** | Date du terme à 41 SA | $D_{\text{DPA}} - 273\text{ j}$ | Selon source DPA | **Élevée** après $-7\text{ j}$ |
| **PMA (FIV / TEC)** | Ponction ou transfert + stade | Jour exact connu | **Au jour près** | **Absolue** |

## Repères Biologiques et Précautions d'Interprétation

* **Distinguer fécondation et nidation** : La fécondation a lieu dans la trompe de Fallope au jour $J_0$, mais la nidation du blastocyste dans l'endomètre intervient entre **$J_{+6}$ et $J_{+10}$**. L'hormone $\beta\text{-hCG}$ n'étant sécrétée qu'après l'implantation, un test de grossesse réalisé trop précocement peut rester faussement négatif.
* **Privilégier la LCC entre 11 SA et 13 SA + 6 jours** : Selon le Collège français d'échographie fœtale (CFEF), une longueur cranio-caudale comprise entre $45\text{ mm}$ et $84\text{ mm}$ constitue l'étalon-or de datation et corrige les biais liés aux cycles irréguliers, au syndrome des ovaires polykystiques (SOPK) ou à l'arrêt récent d'une contraception.
* **Cas particulier de la PMA (FIV ou transfert d'embryon congelé)** : Le calcul par dernières règles ne s'applique pas ; la date de conception correspond au jour de la ponction ovocytaire ou à la date du transfert diminuée de l'âge embryonnaire ($3\text{ jours}$ pour un $J_3$, $5\text{ jours}$ pour un blastocyste $J_5$).
* **Suivi médical indispensable** : Ce calcul mathématique est informatif et ne remplace pas la validation clinique d'un gynécologue-obstétricien ou d'une sage-femme pour arrêter l'âge gestationnel officiel et le calendrier des examens prénataux.
