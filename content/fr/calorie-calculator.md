---
title: "Calculateur de Calories"
metaTitle: "Calculateur de Calories : Besoins par Jour et Métabolisme"
description: "Calculez votre métabolisme de base selon l'équation de Mifflin-St Jeor et votre dépense énergétique journalière totale afin d'ajuster vos apports en calories selon votre objectif."
metaDescription: "Estimez vos besoins caloriques quotidiens avec la formule Mifflin-St Jeor : métabolisme de base, maintien, perte de poids et prise de masse."
metaKeywords: "calculateur de calories, besoins caloriques journaliers, formule Mifflin-St Jeor, métabolisme de base, dépense énergétique journalière, déficit calorique, perte de poids, prise de masse"
faqs:
  - question: "Pourquoi ce calculateur utilise-t-il l'équation de Mifflin-St Jeor plutôt que Harris-Benedict ?"
    answer: "Établie en 1990 sur des cohortes adultes contemporaines, l'équation de Mifflin-St Jeor prédit la dépense énergétique au repos à ±10 % près chez la majorité des adultes sains, surpassant en précision l'équation historique de Harris-Benedict (1919), qui tend à surestimer le métabolisme de base d'environ 5 % chez les populations sédentaires modernes."
  - question: "Comment convertir les kilocalories (kcal) en kilojoules (kJ) affichés sur les étiquettes alimentaires ?"
    answer: "Dans le Système international d'unités (SI), l'énergie s'exprime en joules et les emballages européens, suisses et canadiens indiquent à la fois les kilojoules et les kilocalories. La conversion exacte est 1 kcal = 4,184 kJ : un besoin journalier de 2 100 kcal équivaut donc à 8 786 kJ."
  - question: "Un déficit de 500 kcal par jour garantit-il exactement 0,5 kg de perte par semaine ?"
    answer: "C'est une excellente approximation initiale, mais non une règle linéaire indéfinie. Un kilogramme de tissu adipeux mobilisé correspond à environ 7 700 kcal, de sorte qu'un déficit hebdomadaire de 3 500 kcal (500 kcal × 7 jours) entraîne théoriquement une baisse d'environ 0,45 kg par semaine. Au fil des semaines, l'allègement corporel et l'adaptation métabolique diminuent légèrement la dépense quotidienne, ce qui impose de réajuster l'apport."
  - question: "Quel est l'apport calorique minimal à ne pas franchir sans suivi médical ?"
    answer: "Descendre durablement sous le métabolisme de base expose à la fonte musculaire, à la fatigue hormonale et aux carences en micronutriments. En pratique clinique et selon les repères nutritionnels francophones (ANSES, Santé Canada, OSAV), on évite généralement de descendre sous 1 200 kcal/jour chez la femme et 1 500 kcal/jour chez l'homme hors encadrement médical ou diététique spécialisé."
  - question: "Dois-je rajouter les calories affichées par ma montre connectée au résultat du calculateur ?"
    answer: "Non. Le multiplicateur de niveau d'activité physique (1,375 à 1,9) intègre déjà vos entraînements hebdomadaires dans votre dépense énergétique journalière totale. Ajouter par-dessus les calories estimées par un bracelet connecté — souvent surestimées de 15 % à 40 % — conduit à compter deux fois les séances de sport et bloque la perte de poids."
---

Déterminer combien d'énergie votre organisme dépense chaque jour constitue le socle de toute stratégie nutritionnelle cohérente : stabiliser son poids, réduire sa masse grasse ou accompagner une prise de muscle. Ce besoin associe le **métabolisme de base ($MB$)** — l'énergie minimale requise au repos pour les fonctions vitales — et le **niveau d'activité physique ($NAP$)** quotidien.

Notre calculateur emploie l'équation de **Mifflin-St Jeor**, référence en diététique clinique, pour estimer votre **dépense énergétique journalière totale ($DEJT$)** et calibrer vos apports selon votre objectif.

## Équation de Mifflin-St Jeor et Dépense Énergétique Totale

Le métabolisme de base $MB$ (en kilocalories par jour, $\text{kcal/j}$) se calcule à partir d'unités métriques : masse corporelle $m$ en kilogrammes ($\text{kg}$), taille $h$ en centimètres ($\text{cm}$) et âge $a$ en années (valide à partir de $15\text{ ans}$).

* **Homme :**
  $$MB_{\text{homme}} = (10 \times m) + (6{,}25 \times h) - (5 \times a) + 5$$
* **Femme :**
  $$MB_{\text{femme}} = (10 \times m) + (6{,}25 \times h) - (5 \times a) - 161$$

En cas de saisie en unités impériales (courantes au Québec et au Canada), l'outil convertit d'abord les livres ($1\text{ lb} = 0{,}453592\text{ kg}$) et les pieds/pouces ($1\text{ pi} = 30{,}48\text{ cm}$ ; $1\text{ po} = 2{,}54\text{ cm}$).

La **dépense énergétique journalière totale ($DEJT$)** s'obtient en multipliant $MB$ par le coefficient d'activité $NAP$ ($1{,}2$ à $1{,}9$), avec conversion en kilojoules (unité SI des tableaux nutritionnels) :

$$DEJT = MB \times NAP \qquad \text{et} \qquad E_{\text{kJ}} = E_{\text{kcal}} \times 4{,}184$$

Trois cibles en découlent :

* **Maintien** : apport égal à $DEJT$.
* **Perte de poids** : $DEJT - 500\text{ kcal/j}$ ($-3\,500\text{ kcal/semaine}$, soit environ $0{,}45\text{ à }0{,}5\text{ kg}$ par semaine).
* **Prise de poids** : $DEJT + 500\text{ kcal/j}$ (ou un surplus modéré de $+200\text{ à }+350\text{ kcal/j}$ pour limiter le gain adipeux lors d'une prise de masse musculaire).

## Exemple Chiffré Pas à Pas

Prenons une **femme de $34\text{ ans}$**, mesurant **$167\text{ cm}$** pour **$66\text{ kg}$**, qui exerce un emploi de bureau et réalise **quatre séances de sport par semaine** (activité modérée, $NAP = 1{,}55$).

1. **Métabolisme de base ($MB$)** :
   $$MB = (10 \times 66) + (6{,}25 \times 167) - (5 \times 34) - 161$$
   $$MB = 660 + 1\,043{,}75 - 170 - 161 = \mathbf{1\,372{,}75\text{ kcal/j}} \quad (5\,744\text{ kJ/j})$$
2. **Dépense journalière totale ($DEJT$)** :
   $$DEJT = 1\,372{,}75 \times 1{,}55 = \mathbf{2\,127{,}76\text{ kcal/j}} \approx \mathbf{2\,128\text{ kcal/j}} \quad (8\,903\text{ kJ/j})$$
3. **Cibles quotidiennes** :
   * **Maintien** : **$2\,128\text{ kcal/j}$** ($8\,903\text{ kJ}$).
   * **Perte de poids** ($-500\text{ kcal/j}$) : **$1\,628\text{ kcal/j}$** ($6\,811\text{ kJ}$), un niveau qui demeure nettement supérieur au métabolisme de base ($1\,373\text{ kcal/j}$).
   * **Prise de masse** : **$2\,628\text{ kcal/j}$** à $+500\text{ kcal/j}$ (ou **$2\,428\text{ kcal/j}$** avec un surplus contrôlé de $+300\text{ kcal/j}$).

## Référentiel des Multiplicateurs d'Activité ($NAP$)

Ce tableau compare la $DEJT$ sur les cinq paliers d'activité pour notre **profil féminin** ($34\text{ ans}$, $66\text{ kg}$, $167\text{ cm}$, $MB = 1\,373\text{ kcal/j}$) et un **profil masculin** ($38\text{ ans}$, $82\text{ kg}$, $180\text{ cm}$, $MB = 1\,760\text{ kcal/j}$).

| Niveau d'activité | Facteur | Profil quotidien type | Femme ($MB$ 1 373) | Homme ($MB$ 1 760) |
| :--- | :--- | :--- | :--- | :--- |
| **Sédentaire** | $\times 1{,}200$ | Travail assis, < 5 000 pas/j | 1 647 kcal (6 892 kJ) | 2 112 kcal (8 837 kJ) |
| **Activité légère** | $\times 1{,}375$ | 1 à 3 séances/semaine | 1 888 kcal (7 897 kJ) | 2 420 kcal (10 125 kJ) |
| **Activité modérée** | $\times 1{,}550$ | 3 à 5 séances soutenues/semaine | 2 128 kcal (8 903 kJ) | 2 728 kcal (11 414 kJ) |
| **Activité soutenue** | $\times 1{,}725$ | 6 à 7 entraînements ou métier actif | 2 368 kcal (9 908 kJ) | 3 036 kcal (12 703 kJ) |
| **Très intense** | $\times 1{,}900$ | Métier physique lourd + biquotidien | 2 608 kcal (10 913 kJ) | 3 344 kcal (13 991 kJ) |

## Conseils Pratiques et Pièges Fréquents

* **Ne pas surestimer son activité physique** : Rester assis huit heures par jour et s'entraîner trois fois $45\text{ minutes}$ relève généralement du palier **activité légère** ($1{,}375$), pas soutenue ($1{,}725$). L'activité spontanée hors sport (marche, station debout, déplacements) pèse fortement sur la dépense réelle.
* **Composer avec la masse musculaire** : Mifflin-St Jeor ne mesure pas la composition corporelle. Pour un athlète très musclé ou en cas d'obésité importante, l'équation de **Katch-McArdle** ($MB = 370 + 21{,}6 \times \text{masse maigre en kg}$) affine utilement l'estimation.
* **Comptabiliser les calories liquides et la densité des macronutriments** : Chaque gramme de protéines ou de glucides apporte $4\text{ kcal}$, chaque gramme de lipides $9\text{ kcal}$, et l'alcool $7\text{ kcal/g}$. Les huiles d'assaisonnement, sauces, jus de fruits et boissons alcoolisées expliquent fréquemment un écart de $250\text{ à }400\text{ kcal/j}$ entre l'apport estimé et l'apport réel.
* **Ajuster sur le terrain après deux à trois semaines** : Toute équation reste un point de départ statistique. Privilégiez un déficit modéré ($300\text{ à }500\text{ kcal/j}$) pour préserver votre masse musculaire, suivez la moyenne hebdomadaire du poids matinal à jeun, puis modulez l'apport de $150\text{ à }200\text{ kcal/j}$ en cas de stagnation sur $14\text{ à }21\text{ jours}$. Pensez aussi à recalculer votre $DEJT$ tous les $5\text{ kg}$ perdus ou gagnés.
* **Respecter l'équilibre nutritionnel** : Les repères de l'**ANSES** (France), du **Conseil Supérieur de la Santé** (Belgique), de l'**OSAV** (Suisse) et de **Santé Canada** soulignent l'importance des protéines ($0{,}83\text{ à }1{,}6\text{ g/kg}$ selon l'entraînement), des fibres et des lipides essentiels. En cas de grossesse, d'allaitement, d'adolescence ou de pathologie chronique, demandez l'avis d'un médecin ou d'un diététicien.
