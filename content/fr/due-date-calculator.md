---
title: "Calculateur de Date d'Accouchement"
metaTitle: "Calculateur de Date d'Accouchement (DPA) : DDR et FIV"
description: "Calculez votre date prévue d'accouchement (DPA) à partir des dernières règles (règle de Naegele ajustée), de la conception ou d'un transfert FIV J3/J5."
metaDescription: "Calculez votre date prévue d'accouchement (DPA) par dernières règles, conception ou transfert FIV J3/J5, avec repères 40 SA et 41 SA en France."
metaKeywords: "calculateur date d'accouchement, calcul DPA, date prévue d'accouchement, règle de Naegele, semaines d'aménorrhée, date de conception, calcul DPA FIV, 40 SA 41 SA"
faqs:
  - question: "Pourquoi mon médecin en France indique-t-il une DPA 7 jours plus tard que le calculateur ?"
    answer: "Notre calculateur applique le standard international de l'OMS retenu en Belgique, en Suisse et au Canada, qui fixe le terme théorique à 40 semaines d'aménorrhée (280 jours depuis les dernières règles, ou 266 jours depuis la conception). En France, le Collège national des gynécologues et obstétriciens français (CNGOF) et l'Assurance Maladie (CPAM) retiennent un terme légal à 41 semaines d'aménorrhée (287 jours, soit 39 semaines de grossesse ou 9 mois calendaires après la fécondation). Pour obtenir la DPA administrative française, ajoutez simplement 7 jours au résultat affiché."
  - question: "Quelle différence existe-t-il entre semaines d'aménorrhée (SA) et semaines de grossesse (SG) ?"
    answer: "Les semaines d'aménorrhée (SA) se comptent depuis le premier jour des dernières règles, tandis que les semaines de grossesse (SG) partent de la fécondation. Pour un cycle régulier de 28 jours avec ovulation au 14e jour, on a exactement SA = SG + 2. Les médecins et sages-femmes utilisent systématiquement les SA en pratique clinique, car la date des règles reste plus facilement identifiable que le jour précis de l'ovulation hors protocole de procréation médicalement assistée."
  - question: "Comment adapter le calcul lorsque mon cycle menstruel ne dure pas 28 jours ?"
    answer: "La phase lutéale qui sépare l'ovulation des règles suivantes demeure relativement stable autour de 14 jours, alors que la phase folliculaire avant l'ovulation s'allonge ou se raccourcit selon la durée du cycle. Notre outil corrige automatiquement la règle de Naegele en ajoutant (durée du cycle - 28) jours pour tout cycle compris entre 20 et 45 jours : un cycle de 32 jours décale ainsi la DPA de +4 jours, et un cycle de 25 jours l'avance de 3 jours."
  - question: "Comment la DPA est-elle calculée après un transfert d'embryon en FIV (J3 ou J5) ?"
    answer: "Dans le cadre d'une fécondation in vitro, l'âge exact de l'embryon au moment du transfert est connu avec certitude, ce qui rend le calcul indépendant de la durée des cycles. Sous la convention internationale à 40 SA (266 jours après fécondation), le calculateur ajoute 266 - 3 = 263 jours après un transfert d'embryon clivé à J3, et 266 - 5 = 261 jours après un transfert de blastocyste à J5. Pour la date administrative française (41 SA), ajoutez 7 jours supplémentaires."
  - question: "L'échographie du premier trimestre peut-elle corriger la date prévue d'accouchement ?"
    answer: "Oui, et c'est elle qui fait foi médicalement. Réalisée entre 11 SA et 13 SA + 6 jours, l'échographie de datation mesure la longueur cranio-caudale (LCC) de l'embryon avec une précision de ±3 à 5 jours. En France, Belgique, Suisse et au Canada, lorsque la datation échographique s'écarte de l'estimation par les dernières règles (généralement au-delà de 5 à 7 jours), c'est la date échographique qui fixe définitivement l'âge gestationnel et le calendrier du congé maternité."
---

La **Date Prévue d'Accouchement (DPA)** constitue le repère central du suivi prénatal. Même si seuls **$4\,\%$ à $5\,\%$** des bébés naissent le jour exact estimé, cette date cale le calendrier des échographies, des dépistages, de la surveillance de fin de grossesse et des démarches de congé maternité.

Notre calculateur estime votre DPA selon trois méthodes cliniques — **date des dernières règles (DDR)** avec ajustement de cycle ($20\text{ à }45\text{ jours}$), **date de conception** ou **transfert FIV (J3 ou J5)** — et affiche en complément le signe astrologique et la pierre de naissance du mois de terme.

## Formules Obstétricales : Règle de Naegele, Conception et FIV

L'outil applique la norme internationale de l'OMS (**$40\text{ SA}$**, en vigueur en **Belgique**, en **Suisse** et au **Canada / Québec**) par addition exacte de jours calendaires UTC :

* **Dernières règles ($\text{DDR}$) — règle de Naegele ajustée** ($20 \le L_{\text{cycle}} \le 45\text{ j}$) :
  $$\text{DPA}_{\text{40 SA}} = \text{DDR} + 280 + (L_{\text{cycle}} - 28)\text{ jours}$$
* **Date de conception ($D_{\text{conc}}$)** :
  $$\text{DPA}_{\text{40 SA}} = D_{\text{conc}} + 266\text{ jours} \qquad (38\text{ SG})$$
* **Transfert d'embryon en FIV ($D_{\text{FIV}}$)** :
  $$\text{DPA}_{\text{40 SA}} = D_{\text{FIV}} + (266 - A_{\text{embryon}})\text{ jours}$$
  soit $+263\text{ jours}$ pour un embryon clivé **J3** et $+261\text{ jours}$ pour un blastocyste **J5**.

### Convention Française ($41\text{ SA}$) face au Standard International ($40\text{ SA}$)

En **France**, le **CNGOF** et la **CPAM** définissent le terme administratif à **$41\text{ SA}$** ($39\text{ SG}$, soit $287\text{ jours}$ depuis une DDR standard de $28\text{ jours}$ ou « début de grossesse $+ 9\text{ mois}$ ») :

$$\text{DPA}_{\text{France (41 SA)}} = \text{DPA}_{\text{40 SA}} + 7\text{ jours}$$

Un dossier obstétrical français affiche donc systématiquement une DPA décalée de $+7\text{ jours}$ par rapport à un dossier belge, suisse ou québécois, sans modifier la durée biologique réelle de la grossesse.

## Exemples Chiffrés Pas à Pas

### Cas 1 : Dernières règles avec cycle de 32 jours

Supposons une **DDR le $10\text{ mars }2026$** avec des cycles réguliers de **$32\text{ jours}$**.

1. **Jours à ajouter** : $280 + (32 - 28) = \mathbf{284\text{ jours}}$ (équivalent à une ovulation au $18^{\text{e}}$ jour, le $28\text{ mars }2026$, augmentée de $266\text{ jours}$).
2. **Décompte calendaire** : $21\text{ j}$ restants en mars $+ 244\text{ j}$ d'avril à novembre $= 265\text{ j}$ au $30\text{ novembre}$, puis $284 - 265 = 19\text{ j}$ en décembre.
3. **Résultat** : $\text{DPA}_{\text{40 SA}}$ le **samedi $19\text{ décembre }2026$** (**Sagittaire**, **Turquoise**), et **samedi $26\text{ décembre }2026$** sous la convention française à $41\text{ SA}$ ($+7\text{ j}$).

### Cas 2 : Transfert FIV d'un blastocyste J5

Un transfert de **blastocyste J5** a lieu le **$14\text{ avril }2026$**.

1. **Jours à ajouter** : $266 - 5 = \mathbf{261\text{ jours}}$.
2. **Décompte exact** : $16\text{ j}$ restants en avril $+ 214\text{ j}$ de mai à novembre $= 230\text{ j}$, puis $261 - 230 = 31\text{ j}$ en décembre.
3. **Résultat** : $\text{DPA}_{\text{40 SA}}$ le **jeudi $31\text{ décembre }2026$** (**Capricorne**, **Turquoise**), soit le **jeudi $7\text{ janvier }2027$** à $41\text{ SA}$ en France. Avec un embryon **J3** transféré le même jour ($+263\text{ j}$), le terme à $40\text{ SA}$ tomberait le **$2\text{ janvier }2027$**.

## Calendrier de Référence : Trimestres et Jalons Cliniques

Ce tableau met en regard **semaines d'aménorrhée (SA)** et **semaines de grossesse (SG)** (cycle de $28\text{ jours}$) avec les étapes clés du suivi francophone :

| Période / Jalon | Âge en SA | Âge en SG | Jours depuis DDR | Repère médical et administratif |
| :--- | :--- | :--- | :--- | :--- |
| **1er trimestre** | 0 à 13 SA + 6 j | 0 à 11 SG + 6 j | 0 à 97 j | Organogenèse, premiers bilans sanguins |
| **Écho de datation (T1)** | 11 à 13 SA + 6 j | 9 à 11 SG + 6 j | 77 à 97 j | Mesure LCC (référence définitive à ±3–5 j) |
| **Déclaration (France)** | Avant 16 SA | Avant 14 SG | Avant 112 j | Déclaration CPAM / CAF obligatoire |
| **2e trimestre (T2)** | 14 à 27 SA + 6 j | 12 à 25 SG + 6 j | 98 à 195 j | Écho morphologique (20–24 SA), dépistage diabète |
| **3e trimestre (T3)** | 28 à 36 SA + 6 j | 26 à 34 SG + 6 j | 196 à 258 j | Écho croissance (32 SA), suivi renforcé |
| **Fenêtre « à terme »** | 37 à 41 SA + 6 j | 35 à 39 SG + 6 j | 259 à 293 j | Terme précoce (37–38 SA), complet (39–40 SA), tardif (41 SA) |

## Limites du Calcul et Précautions Médicales

* **Penser en fenêtre de terme** : Une naissance est médicalement **à terme** entre **$37\text{ SA}$** et **$41\text{ SA} + 6\text{ j}$** (cinq semaines). Environ $80\,\%$ des accouchements spontanés surviennent dans les deux semaines autour de la DPA.
* **Cycles irréguliers ou post-contraception** : En cas de SOPK, d'allaitement ou d'arrêt récent de pilule, l'ovulation décalée fausse le calcul par DDR ; l'échographie du premier trimestre (longueur cranio-caudale) devient alors la seule référence fiable.
* **Saignements d'implantation ou règles** : De légers saignements $6\text{ à }12\text{ jours}$ après la fécondation peuvent être confondus avec des règles et décaler la DPA d'un mois.
* **Grossesses multiples** : La datation reste identique, mais l'accouchement survient plus tôt (souvent entre $36\text{ et }38\text{ SA}$ pour des jumeaux selon la chorionicité).
* **Validation clinique et démarches sociales** : Le calcul en jours exacts intègre automatiquement le $29\text{ février}$ lors des années bissextiles, mais seule la date confirmée par votre obstétricien ou sage-femme fait foi pour le suivi médical et les prestations (CPAM en France, mutualité belge, APG suisse ou RQAP au Québec).
