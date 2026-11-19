---
title: "Calculatrice de Rendement de Dépôt à Terme"
metaTitle: "Calculatrice de Dépôt à Terme : Compte à Terme (CAT) & CPG"
description: "Calculez le rendement garanti à l'échéance, les intérêts composés et le gain net après impôt d'un compte à terme (CAT) ou certificat de placement (CPG)."
metaDescription: "Simulez votre compte à terme (CAT) ou certificat de dépôt (CPG) : estimez vos intérêts garantis à l'échéance, le taux actuariel annuel et la fiscalité."
metaKeywords: "calculatrice compte à terme CAT, simulateur dépôt à terme, certificat de placement garanti CPG, calcul intérêts compte à terme, taux actuariel CAT"
faqs:
  - question: "Quelle est la différence entre un compte à terme à taux fixe et à taux progressif ?"
    answer: "Un compte à terme (CAT) à taux fixe verrouille un taux annuel unique garanti du premier au dernier jour du contrat (par exemple 3,40 % sur 24 mois). À l'inverse, un CAT à taux progressif rémunère votre épargne par paliers croissants tous les 6 ou 12 mois (par exemple 2,60 % la 1re année, 3,20 % la 2e année et 4,00 % la 3e année) et autorise généralement une sortie sans pénalité à chaque date d'anniversaire de palier."
  - question: "Pourquoi faut-il ouvrir plusieurs petits comptes à terme plutôt qu'un seul gros contrat ?"
    answer: "Juridiquement, un compte à terme ne permet ni versement complémentaire ni retrait partiel en cours de vie. Si vous placez 40 000 € sur un seul CAT et avez soudainement besoin de 8 000 € pour une dépense imprévue, vous devrez clôturer l'intégralité du contrat de 40 000 € et subir la pénalité de sortie anticipée sur toute la somme. En ouvrant quatre CAT distincts de 10 000 € (sans aucun frais d'ouverture), vous pouvez en casser un seul en cas de besoin tout en préservant le taux plein sur les 30 000 € restants."
  - question: "Quelle est la différence entre le taux nominal et le taux de rendement actuariel (TRAAB) ?"
    answer: "Sur un compte à terme pluriannuel dont les intérêts sont versés en une seule fois à l'échéance finale (in fine) sans être capitalisés chaque année, les intérêts de la première année ne produisent pas eux-mêmes d'intérêts les années suivantes. Le Taux de Rendement Actuariel Annuel Brut (TRAAB) ramène ce gain total à une base annuelle composée comparable : ainsi, un taux nominal simple de 3,50 % sur 3 ans payé in fine correspond à un TRAAB réel de 3,39 %."
  - question: "Quels sont le préavis et les pénalités en cas de retrait anticipé sur un CAT ?"
    answer: "En raison des normes prudentielles bancaires (ratio de liquidité LCR à 30 jours), la plupart des banques européennes imposent un préavis de 31 ou 32 jours calendaires avant le déblocage effectif des fonds d'un compte à terme. La pénalité contractuelle consiste généralement en une minoration du taux promis (par exemple -0,50 point ou application de 50 % du taux initial), et aucun intérêt n'est versé si la clôture intervient au cours du premier mois."
  - question: "Quelle fiscalité s'applique aux intérêts d'un compte à terme ou d'un CPG ?"
    answer: "En France, les intérêts d'un CAT subissent le Prélèvement Forfaitaire Unique (PFU ou Flat Tax) de 30 % (ou le barème de l'impôt sur le revenu + 17,2 % de prélèvements sociaux sur option). En Belgique, le précompte mobilier de 30 % s'applique dès le premier euro, sans bénéficier de la tranche d'exonération réservée aux comptes d'épargne réglementés. Au Canada, les intérêts d'un CPG sont imposables à 100 % à votre taux marginal, sauf s'il est détenu dans un CELI ou un REER."
---

Appelé **Compte à Terme (CAT)** ou **Dépôt à Terme (DAT)** en France et en Belgique, **Obligation de caisse** en Suisse, et **Certificat de Placement Garanti (CPG)** au Canada, ce placement bancaire repose sur un contrat clair : vous immobilisez un versement unique pendant une durée déterminée (de 1 mois à 5 ans) et la banque s'engage contractuellement à vous verser un taux d'intérêt fixe garanti jusqu'à l'échéance.

Contrairement aux livrets d'épargne dont le taux peut être abaissé lorsque les banques centrales réduisent leurs taux directeurs, le dépôt à terme fige votre rémunération dès la signature. Cette calculatrice de rendement de dépôt à terme estime vos intérêts bruts et nets, votre capital final à l'échéance et votre taux actuariel selon la fréquence de capitalisation.

## Mécanique contractuelle : intérêts composés, paiement *in fine* ou taux progressif

Avant de souscrire un dépôt à terme, vérifiez dans la fiche précontractuelle la convention de calcul des intérêts retenue par la banque :

1. **La capitalisation périodique (annuelle, trimestrielle ou mensuelle)** : à chaque fin de période, les intérêts acquis s'ajoutent au capital initial pour produire eux-mêmes des intérêts durant la période suivante. C'est la norme pour les CPG canadiens à intérêt composé et de nombreux CAT européens de plus de 12 mois.
2. **Les intérêts simples payés *in fine* à l'échéance** : fréquente sur les CAT français de 12 à 36 mois, cette méthode calcule l'intérêt uniquement sur le capital initial déposé, sans capitalisation intermédiaire. Sur plus d'un an, elle réduit légèrement le **Taux de Rendement Actuariel Annuel Brut (TRAAB)**.
3. **Le compte à terme à taux progressif** : le contrat est découpé en paliers semestriels ou annuels avec un taux facial croissant à chaque palier, offrant souvent une sortie sans pénalité à chaque échéance de palier.

## Équations mathématiques de la valeur à l'échéance et du taux actuariel (TRAAB)

### 1. Dépôt à terme à intérêts composés
Pour un capital initial $C_0$ bloqué pendant $t$ années au taux nominal annuel brut $R$, avec une fréquence de capitalisation de $m$ fois par an ($m = 1$ annuelle, $m = 4$ trimestrielle, $m = 12$ mensuelle), la valeur brute à l'échéance ($VF_{\text{brute}}$) s'écrit :

$$VF_{\text{brute}} = C_0 \times \left(1 + \frac{R}{m}\right)^{m \times t}$$

### 2. Dépôt à terme à intérêts simples payés *in fine* et calcul du TRAAB
Si le contrat prévoit un paiement unique d'intérêts simples au terme de $M$ mois ($M > 12$), l'intérêt brut total ($I_{\text{brut}}$) et le **Taux de Rendement Actuariel Annuel Brut (TRAAB)** sont :

$$I_{\text{brut}} = C_0 \times R \times \frac{M}{12} \quad \text{et} \quad \text{TRAAB} = \left(1 + R \times \frac{M}{12}\right)^{\frac{12}{M}} - 1$$

Après application du prélèvement fiscal au taux $\tau$ ($\tau = 30\text{ \%}$ de PFU en France ou de précompte mobilier en Belgique), le gain net encaissé vaut $I_{\text{net}} = I_{\text{brut}} \times (1 - \tau)$.

## Exemple chiffré : placement de 40 000 € sur un Compte à Terme de 36 mois

Prenons un épargnant sécurisant **40 000 €** ($C_0$) pendant **36 mois (3 ans)** ($t = 3$) sur un Compte à Terme au taux nominal annuel fixe de **3,40 % brut** ($R = 0,034$), soumis au PFU de **30 %** ($\tau = 0,30$).

### Cas n° 1 : Contrat avec capitalisation annuelle des intérêts ($m = 1$)
1. **Coefficient de capitalisation sur 3 ans** : $(1 + 0,034)^3 \approx 1,1055073$.
2. **Capital brut acquis au terme des 36 mois** : $VF_{\text{brute}} = 40\,000 \times 1,1055073 = \mathbf{44\,220,29\text{ €}}$.
3. **Intérêts bruts et fiscalité** :
   * Intérêts bruts générés : $44\,220,29 - 40\,000 = \mathbf{4\,220,29\text{ €}}$.
   * Retenue fiscale (PFU 30 %) : $4\,220,29 \times 0,30 = 1\,266,09\text{ €}$.
   * **Intérêts nets encaissés** : **2 954,20 €**, portant le capital final net à **42 954,20 €** (TRAAB de 3,40 % brut, soit **2,40 % net/an**).

### Cas n° 2 : Contrat à intérêts simples payés *in fine* au 36e mois
* Sans capitalisation annuelle intermédiaire : $I_{\text{brut}} = 40\,000 \times 0,034 \times 3 = \mathbf{4\,080,00\text{ €}}$.
* Le TRAAB réel descend à $(1 + 0,102)^{1/3} - 1 = \mathbf{3,29\text{ \% brut}}$, et le gain net après PFU ressort à **2 856,00 €**, soit **98,20 € nets de moins** que le contrat capitalisé.

## Grille comparative : rendement d'un dépôt de 40 000 € selon la durée

| Durée & Structure | Taux brut | TRAAB | Intérêts bruts | Impôt (30 %) | Intérêts nets | Capital net final |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **6 mois** *(In fine)* | 3,50 % | 3,53 % | 700,00 € | 210,00 € | **490,00 €** | 40 490,00 € |
| **12 mois** *(Fixe)* | 3,45 % | 3,45 % | 1 380,00 € | 414,00 € | **966,00 €** | 40 966,00 € |
| **24 mois** *(Capitalisé)* | 3,40 % | 3,40 % | 2 766,24 € | 829,87 € | **1 936,37 €** | 41 936,37 € |
| **36 mois** *(Capitalisé)* | 3,40 % | 3,40 % | 4 220,29 € | 1 266,09 € | **2 954,20 €** | 42 954,20 € |
| **36 mois** *(In fine)* | 3,40 % | 3,29 % | 4 080,00 € | 1 224,00 € | **2 856,00 €** | 42 856,00 € |
| **60 mois** *(Capitalisé)* | 3,60 % | 3,60 % | 7 737,42 € | 2 321,23 € | **5 416,19 €** | 45 416,19 € |

## Stratégie d'échelonnement (Laddering) et précautions contractuelles

* **Fractionnez vos dépôts (*CAT / CPG Laddering*)** : plutôt que de bloquer 40 000 € sur un unique contrat, ouvrez **quatre contrats de 10 000 €** (sans frais supplémentaires). En cas de besoin imprévu, vous ne résilierez qu'une seule ligne de 10 000 € sans pénaliser les trois autres.
* **Verrouillez des échéances longues au sommet du cycle des taux** : lorsque les banques centrales amorcent une baisse des taux directeurs, un compte à terme de 24 à 60 mois fige un rendement élevé pendant plusieurs années.
* **Intégrez le préavis incompressible de 32 jours** : même en acceptant la pénalité de retrait anticipé, votre banque appliquera un délai légal de **31 à 32 jours calendaires** avant le virement des fonds.
