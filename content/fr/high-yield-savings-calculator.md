---
title: "Calculatrice de Compte d'Épargne à Haut Rendement"
metaTitle: "Calculatrice de Compte d'Épargne : Livrets et Intérêts"
description: "Estimez les intérêts composés de votre épargne de précaution sur un livret bancaire à haut rendement, un livret réglementé ou un fonds monétaire."
metaDescription: "Calculez vos gains sur un compte d'épargne à haut rendement ou livret boosté : simulez la règle des quinzaines, les versements mensuels et le gain net."
metaKeywords: "calculatrice compte épargne haut rendement, simulation livret bancaire boosté, calcul intérêts livret A LEP, règle des quinzaines, épargne de précaution"
faqs:
  - question: "Comment fonctionne la règle des quinzaines sur les livrets d'épargne en France ?"
    answer: "En France, les livrets réglementés (Livret A, LDDS, LEP) et la majorité des livrets bancaires calculent les intérêts par périodes de 15 jours, le 1er et le 16 de chaque mois (soit 24 quinzaines par an). Un versement effectué entre le 1er et le 15 ne commence à produire des intérêts que le 16 du mois. À l'inverse, un retrait effectué le 28 du mois annule rétroactivement les intérêts de toute la seconde quinzaine depuis le 16."
  - question: "Comment comparer un livret bancaire fiscalisé avec le Livret A ?"
    answer: "Les intérêts du Livret A, du LDDS et du LEP sont totalement nets d'impôt et de prélèvements sociaux. En revanche, les intérêts d'un livret bancaire à haut rendement non réglementé subissent en France le Prélèvement Forfaitaire Unique (PFU ou Flat Tax) de 30 % (12,8 % d'impôt sur le revenu + 17,2 % de prélèvements sociaux). Il faut donc multiplier le taux brut affiché par 0,70 : un livret fiscalisé à 4,00 % brut ne rapporte en réalité que 2,80 % net."
  - question: "Un livret à taux boosté de 5 % pendant 3 mois est-il vraiment avantageux sur un an ?"
    answer: "Le taux promotionnel annoncé par les banques en ligne est toujours un taux annuel nominal appliqué uniquement pendant 3 ou 4 mois (6 à 8 quinzaines sur 24). Une fois la période promotionnelle terminée, votre épargne est rémunérée au taux de base standard (souvent entre 1,50 % et 2,00 % brut). Sur 12 mois pleins, un boost de 5 % brut pendant 3 mois suivi de 2 % brut pendant 9 mois équivaut à un taux annuel brut moyen de 2,75 %, soit 1,925 % net après Flat Tax."
  - question: "Quelle est la spécificité de la prime de fidélité sur les comptes d'épargne en Belgique ?"
    answer: "Les comptes d'épargne réglementés belges combinent deux rémunérations : un taux de base (calculé pour chaque jour où l'argent reste sur le compte et versé au 1er janvier) et une prime de fidélité (acquise uniquement sur les sommes qui demeurent déposées sans interruption pendant 12 mois consécutifs, et versée le trimestre suivant son acquisition)."
  - question: "Pourquoi certains comptes espèces rémunérés versent-ils des intérêts calculés au jour le jour ?"
    answer: "Les courtiers européens, les néobanques et les comptes d'épargne à intérêt élevé (CEIE) au Canada calculent les intérêts sur une base quotidienne réelle (Act/360 ou Act/365) et les versent chaque fin de mois. Cette méthode évite toute perte de quinzaine lors des dépôts ou retraits et accélère légèrement la capitalisation puisque les intérêts perçus chaque mois produisent eux-mêmes des intérêts dès le mois suivant."
---

Construire et rémunérer efficacement son **épargne de précaution** — l'équivalent de 3 à 6 mois de dépenses courantes disponibles à tout instant sans risque de perte en capital — est le socle d'une gestion patrimoniale saine. Face à la multiplication des offres de **comptes d'épargne à haut rendement**, de « super-livrets » à taux boosté, de comptes espèces rémunérés au jour le jour et de livrets réglementés, comparer le rendement facial brut ne suffit pas : la fréquence de capitalisation, la règle des quinzaines et la fiscalité modifient profondément le gain réellement encaissé.

Cette calculatrice de compte d'épargne à haut rendement simule la croissance exacte de votre trésorerie selon votre capital initial, vos versements mensuels, le taux d'intérêt nominal et la périodicité de capitalisation.

## Fréquence de capitalisation, règle des quinzaines et taux net après fiscalité

Lorsqu'une banque ou une plateforme financière affiche un taux annuel nominal, deux paramètres techniques déterminent vos intérêts réels :

1. **Le mode de décompte des jours de valeur (Jour le jour vs Quinzaines)** :
   * Sur les **comptes rémunérés au jour le jour** (néobanques, courtiers, comptes d'épargne canadiens ou suisses), chaque euro déposé porte intérêt dès le lendemain de sa réception jusqu'au jour de son retrait, avec un versement mensuel des intérêts.
   * Sur les **livrets français soumis à la règle des 24 quinzaines**, l'année est découpée en 24 périodes fixes. Les intérêts acquis s'accumulent dans un compteur séparé et ne sont **capitalisés qu'une seule fois par an, le 31 décembre**.
2. **Le passage du taux brut au taux net d'impôt** :
   Hors enveloppes réglementées exonérées (Livret A, LDDS, LEP en France ; tranche exonérée de précompte mobilier en Belgique ; CELI au Canada), les intérêts bruts subissent une retenue fiscale à la source ($\tau = 30\text{ \%}$ de PFU en France). Le taux net réellement perçu vaut :
   $$t_{\text{net}} = t_{\text{brut}} \times (1 - \tau)$$

## Formules de calcul : capitalisation mensuelle et taux moyen pondéré

### 1. Valeur acquise avec capitalisation mensuelle et versements réguliers
Pour un compte d'épargne créditant les intérêts chaque mois au taux périodique mensuel net $r_m = \frac{t_{\text{net}}}{12}$, le solde final ($VF$) après $n$ mois pour un dépôt initial $C_0$ et un versement mensuel constant $V$ est donné par :

$$VF = C_0 \times (1 + r_m)^n + V \times \frac{(1 + r_m)^n - 1}{r_m}$$

### 2. Taux annuel réel d'un super-livret à taux promotionnel temporaire
Lorsqu'un livret bancaire offre un taux promotionnel $t_{\text{boost}}$ pendant $q_{\text{boost}}$ quinzaines (ex. 6 quinzaines pour 3 mois), puis rémunère l'épargne au taux de base $t_{\text{base}}$ sur les $24 - q_{\text{boost}}$ quinzaines restantes de l'année, le taux annuel brut moyen sur 12 mois s'établit à :

$$t_{\text{moyen brut}} = \frac{t_{\text{boost}} \times q_{\text{boost}} + t_{\text{base}} \times (24 - q_{\text{boost}})}{24}$$

## Cas pratique comparé : 25 000 € de trésorerie et 300 € par mois sur 2 ans

Supposons que vos livrets défiscalisés (Livret A et LDDS) soient au plafond et que vous placiez une réserve de **25 000 €** ($C_0$) tout en épargnant **300 € par mois** ($V$) pendant **24 mois (2 ans)**.

### Scénario A : Compte rémunéré à taux fixe de 3,60 % brut (capitalisation mensuelle)
* Après déduction de la Flat Tax de 30 % ($\tau = 0,30$), le taux annuel net ressort à $t_{\text{net}} = 3,60\text{ \%} \times 0,70 = \mathbf{2,52\text{ \% net / an}}$.
* Le taux mensuel net est $r_m = \frac{0,0252}{12} = 0,0021$ ($0,21\text{ \%/mois}$). Sur $n = 24$ mois, $(1 + 0,0021)^{24} \approx 1,051637$.
  1. **Valeur acquise par le dépôt initial de 25 000 €** : $25\,000 \times 1,051637 = 26\,290,93\text{ €}$.
  2. **Valeur acquise par les 24 versements mensuels de 300 €** : $300 \times \frac{1,051637 - 1}{0,0021} = 7\,376,73\text{ €}$.
  3. **Capital total net au bout de 24 mois** : $VF = 26\,290,93 + 7\,376,73 = \mathbf{33\,667,66\text{ €}}$.
  * Sur **32 200,00 €** versés, vous encaissez **1 467,66 € d'intérêts nets d'impôt** (**2 096,66 € bruts** moins 629,00 € de PFU).

### Scénario B : Super-livret avec taux boosté à 5,00 % brut pendant 3 mois (puis 2,00 % brut)
* L'année 1, le taux moyen brut sur 24 quinzaines n'est que de **2,75 % brut** (**1,925 % net** après PFU). L'année 2, le rendement retombe à 2,00 % brut (**1,40 % net**).
* Sur 24 mois, ce livret « boosté à 5 % » génère seulement **958,40 € d'intérêts nets**, soit **509,26 € de moins** que le compte régulier à 3,60 % brut.

## Comparatif des supports d'épargne sans risque (France, Belgique, Canada)

| Support d'épargne | Plafond | Capitalisation | Fiscalité | Taux net (pour 3 % brut) |
| :--- | :--- | :--- | :--- | :--- |
| **Livret A / LDDS (France)** | 22 950 € / 12 000 € | Quinzaine / Annuelle | 0 % (Exonéré) | **3,00 % net** |
| **LEP (France)** | 10 000 € *(sous RFR)* | Quinzaine / Annuelle | 0 % (Exonéré) | **3,00 % net** |
| **Super-Livret (France)** | 100 000 € à Illimité | Quinzaine / Annuelle | 30 % (PFU) | **2,10 % net** |
| **Compte Espèces Rémunéré** | Variable | Jour le jour / Mensuelle | 30 % (PFU) | **2,13 % net** |
| **Compte Réglementé (Belgique)** | Plafond fiscal | Jour + Fidélité 12 mois | 0 % sous plafond | **3,00 % net** |
| **CEIE en CELI (Canada)** | Droits CELI | Jour le jour / Mensuelle | 0 % (CELI) | **3,04 % net** |

## Bonnes pratiques pour optimiser la rémunération de votre trésorerie

* **Saturez d'abord votre LEP (Livret d'Épargne Populaire) si vous y êtes éligible** : vérifiez votre Revenu Fiscal de Référence sur votre avis d'imposition ; son taux réglementé surpasse celui du Livret A en franchise totale d'impôt.
* **Synchronisez vos virements avec les quinzaines** : versez entre le **12 et le 14 du mois** (valeur au 16) ou entre le **27 et le 29 du mois** (valeur au 1er), et retirez le **1er** ou le **16 du mois** pour ne perdre aucune quinzaine acquise.
* **Utilisez les fonds monétaires (€STR) au-delà des plafonds** : pour une trésorerie excédant 50 000 €, un fonds monétaire indexé sur le taux €STR de la BCE capitalise les intérêts chaque jour ouvré sans perte de quinzaine.
