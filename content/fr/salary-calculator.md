---
title: "Calculatrice de Salaire"
metaTitle: "Calculatrice de Salaire : Horaire, Mensuel et Annuel"
description: "Convertissez instantanément votre rémunération entre taux horaire, journalier, hebdomadaire, aux deux semaines, mensuel et annuel selon votre temps de travail."
metaDescription: "Convertissez votre salaire entre taux horaire, journalier, hebdomadaire, aux deux semaines, mensuel et annuel selon votre temps de travail."
metaKeywords: "calculatrice de salaire, convertisseur de salaire, taux horaire, salaire mensuel, salaire annuel, paie aux deux semaines, 151,67 heures, conversion salaire"
faqs:
  - question: "Pourquoi un salaire mensuel aux 35 heures en France repose-t-il sur 151,67 heures et non 140 heures ?"
    answer: "Une année civile comporte 52 semaines réparties sur 12 mois, soit une moyenne de 4,333 semaines par mois et non 4 semaines exactes. La mensualisation légale française multiplie donc 35 heures par 52 semaines puis divise par 12 mois, ce qui donne exactement 151,666... heures, arrondies à 151,67 heures sur la fiche de paie."
  - question: "Quelle est la différence entre une paie aux deux semaines et une paie bimensuelle au Canada ?"
    answer: "Une paie aux deux semaines (courante au Québec et au Canada) correspond à un versement tous les 14 jours, soit 26 périodes par année, dont deux mois à trois versements. Une paie bimensuelle s'effectue deux fois par mois à dates fixes (par exemple le 15 et le dernier jour), soit 24 versements par an, chacun étant supérieur de 8,33 % pour un même salaire annuel."
  - question: "Comment convertir un salaire versé sur 13 mois en France ou en Suisse, ou avec double pécule en Belgique ?"
    answer: "Pour comparer deux offres sur des bases homogènes, saisissez l'enveloppe annuelle brute complète (13e mois ou pécule de vacances inclus) en période annuelle. Le résultat mensuel affiché représente alors votre revenu mensuel lissé sur 12 mois, même si votre virement mensuel ordinaire vaut un treizième (France, Suisse) ou un 13,92e (Belgique) de ce total."
  - question: "À quoi sert le paramètre des semaines non rémunérées pour les indépendants et contractuels ?"
    answer: "Pour un salarié dont les congés payés sont maintenus, les 52 semaines de l'année sont rémunérées et ce champ reste à 0. En revanche, un travailleur indépendant ou contractuel prenant 4 à 6 semaines sans facturation ramène son année rémunérée à 46 ou 48 semaines, réduisant son revenu annuel issu d'un taux horaire ou relevant le tarif nécessaire pour atteindre un revenu cible."
  - question: "Cette calculatrice convertit-elle un salaire brut en salaire net après impôts ?"
    answer: "Non : elle convertit une rémunération entre périodes à périmètre constant (brut vers brut, ou net vers net). Pour passer du brut au net, appliquez ensuite les retenues de votre pays : environ 22 % à 25 % de cotisations salariales dans le privé en France avant prélèvement à la source, 13,07 % d'ONSS plus précompte en Belgique, ou les cotisations et impôts applicables en Suisse et au Canada."
---

## Convertir un Salaire Entre Toutes les Périodes de Paie

Comparer deux offres d'emploi ou évaluer un passage vers le statut d'indépendant devient rapidement trompeur lorsque les rémunérations sont annoncées sur des bases hétérogènes : taux horaire au Québec ou en intérim, taux journalier moyen (TJM) pour les consultants, salaire mensuel brut sur 12 ou 13 mois en France et en Suisse, ou enveloppe annuelle globale. Multiplier un salaire hebdomadaire par 4 pour estimer un revenu mensuel crée déjà une erreur de **7,69 %**.

Notre **Calculatrice de Salaire** convertit instantanément un montant — horaire, journalier, hebdomadaire, mensuel ou annuel — vers toutes les fréquences de paie, y compris la paie aux deux semaines, selon vos heures hebdomadaires, vos jours ouvrés et vos semaines non rémunérées.

## Formules Exactes de Conversion Salariale

L'outil calcule d'abord le nombre de semaines rémunérées dans l'année ($S_{\text{eff}}$) et le nombre moyen d'heures par jour ouvré ($h_j$) :

$$S_{\text{eff}} = 52 - S_{\text{np}}, \qquad h_j = \frac{H_{\text{sem}}}{J_{\text{sem}}}$$

Tout montant saisi est converti vers la base annuelle de référence ($R_{\text{ann}}$), puis décliné sur chaque période :

$$R_{\text{ann}} = T_h \times H_{\text{sem}} \times S_{\text{eff}} = T_j \times J_{\text{sem}} \times S_{\text{eff}} = R_{\text{hebdo}} \times S_{\text{eff}} = 12 \times R_{\text{mens}}$$

$$R_{\text{mens}} = \frac{R_{\text{ann}}}{12}, \qquad R_{\text{hebdo}} = \frac{R_{\text{ann}}}{S_{\text{eff}}}, \qquad R_{2\text{sem}} = 2 \times R_{\text{hebdo}}, \qquad T_j = \frac{R_{\text{hebdo}}}{J_{\text{sem}}}, \qquad T_h = \frac{R_{\text{hebdo}}}{H_{\text{sem}}}$$

### Définition des variables en euros (€) ou dollars canadiens (CAD)

* **$R_{\text{ann}}, R_{\text{mens}}, R_{\text{hebdo}}, R_{2\text{sem}}$** : rémunérations annuelle, mensuelle (12 mois), hebdomadaire et aux deux semaines (26 versements si $S_{\text{np}} = 0$), en euros (€) ou en dollars canadiens (CAD).
* **$T_h$ et $T_j$** : taux horaire et rémunération journalière correspondants (bruts ou nets selon la donnée initiale).
* **$H_{\text{sem}}$ et $J_{\text{sem}}$** : heures contractuelles par semaine ($35\text{ h}$ en France, $38\text{ h}$ en Belgique, $40\text{ h}$ au Canada, $42\text{ h}$ en Suisse) et jours travaillés par semaine (généralement $5$).
* **$S_{\text{np}}$** : semaines non rémunérées par an ($0$ pour un salarié en congés payés ; congés sans solde ou intercontrats pour un indépendant).

## Exemple Chiffré Pas à Pas : Salarié Temps Plein vs Contractuel

Prenons un salarié rémunéré **45 500 € bruts/an**, travaillant **35 heures** sur **5 jours par semaine**, avec congés payés inclus ($S_{\text{np}} = 0$, soit $S_{\text{eff}} = 52$ semaines).

1. **Temps de travail mensualisé et journalier** :
   $h_j = 35 / 5 = \mathbf{7{,}00\text{ h / jour}}$ et heures mensualisées $= 35 \times 52 / 12 = \mathbf{151{,}67\text{ h / mois}}$.
2. **Équivalences salariales exactes** :
   * Mensuel lissé : $45\,500 / 12 = \mathbf{3\,791{,}67\text{ € / mois}}$.
   * Hebdomadaire : $45\,500 / 52 = \mathbf{875{,}00\text{ € / semaine}}$.
   * Aux deux semaines : $875{,}00 \times 2 = \mathbf{1\,750{,}00\text{ € / 2 semaines}}$.
   * Journalier : $875{,}00 / 5 = \mathbf{175{,}00\text{ € / jour}}$.
   * Horaire : $875{,}00 / 35 = \mathbf{25{,}00\text{ € / heure}}$.
3. **Effet de 4 semaines non rémunérées** :
   Un contractuel payé **25,00 €/h** aux 35 heures qui prend **4 semaines sans solde** ($S_{\text{eff}} = 48$) perçoit $25{,}00 \times 35 \times 48 = \mathbf{42\,000{,}00\text{ € / an}}$ (**3 500,00 €/mois**), soit **3 500 € de moins (-7,69 %)**. Pour préserver 45 500 € annuels sur 48 semaines, son taux horaire doit atteindre $45\,500 / (35 \times 48) = \mathbf{27{,}08\text{ € / h}}$ (+8,33 %).

## Comparatif des Standards de Temps de Travail Francophones

Pour une **rémunération annuelle identique de 45 500 €** (transposable à l'identique en **CAD** ou en **CHF**), voici la variation réelle du taux horaire selon la durée hebdomadaire du pays :

| Régime de Référence | Heures / Sem. | Heures / Mois | Semaines Payées | Taux Horaire | Taux Journalier (5 j) | Salaire Mensuel |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **France (durée légale)** | 35 h | 151,67 h | 52 | **25,00 €** | 175,00 € | 3 791,67 € |
| **Belgique (temps plein)** | 38 h | 164,67 h | 52 | **23,03 €** | 175,00 € | 3 791,67 € |
| **Canada / Québec** | 40 h | 173,33 h | 52 | **21,88 €** | 175,00 € | 3 791,67 € |
| **Suisse (moyenne)** | 42 h | 182,00 h | 52 | **20,83 €** | 175,00 € | 3 791,67 € |
| **Indépendant (6 sem. sans solde)** | 40 h | 153,33 h | 46 | **24,73 €** | 197,83 € | 3 791,67 € |

À enveloppe annuelle constante, passer de **35 h** à **42 h** réduit la rémunération horaire réelle de **25,00 €** à **20,83 €** (-16,67 %).

## Spécificités Nationales et Erreurs Fréquentes de Conversion

* **Abandonnez la règle des 4 semaines par mois** : un mois compte **4,333 semaines** ($52 / 12$). Multiplier une paie hebdomadaire par 4 ou une paie aux deux semaines par 2 sous-estime votre revenu mensuel réel de **7,69 %** (soit **291,67 €/mois** oubliés sur 45 500 €/an).
* **Distinguez paie aux deux semaines et paie bimensuelle** : au Canada, **45 500 CAD/an** donnent **1 750,00 CAD** aux deux semaines (26 paies), contre **1 895,83 CAD** en paie bimensuelle (24 paies).
* **Comparez toujours sur l'enveloppe annuelle brute complète** : un salaire français ou suisse de **3 500 € sur 13 mois** équivaut à **45 500 €/an**, soit **3 791,67 €** lissés sur 12 mois ; en Belgique, double pécule de vacances et prime de fin d'année portent souvent la base autour de **13,92 mois**.
* **Forfait jours cadres et tarif journalier d'indépendant** : pour un cadre français au forfait **218 jours/an**, la valeur par jour travaillé atteint **208,72 €** pour 45 500 €. Un travailleur indépendant doit majorer son taux journalier équivalent salarié afin d'absorber cotisations sociales, mutuelle, assurance professionnelle et périodes non facturées.
