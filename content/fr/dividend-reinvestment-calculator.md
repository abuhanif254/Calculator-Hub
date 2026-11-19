---
title: "Calculatrice de Réinvestissement des Dividendes (DRIP)"
metaTitle: "Calculatrice de Réinvestissement des Dividendes (DRIP)"
description: "Mesurez l'effet boule de neige du réinvestissement automatique de vos dividendes (DRIP) sur le nombre d'actions détenues et votre rente future."
metaDescription: "Simulez votre portefeuille d'actions à dividendes (DRIP) : calculez la croissance du dividende, le rendement sur coût d'achat (YoC) et l'impact fiscal."
metaKeywords: "calculatrice réinvestissement dividendes, simulateur DRIP bourse, rendement sur coût d'achat YoC, actions à dividendes croissants, calcul rente dividendes"
faqs:
  - question: "Qu'est-ce que le rendement sur coût d'achat (Yield on Cost ou YoC) ?"
    answer: "Le rendement sur coût d'achat (Yield on Cost) rapporte le montant annuel des dividendes que vous percevez aujourd'hui au capital que vous avez initialement sorti de votre poche. Grâce à la combinaison du réinvestissement des coupons en nouvelles actions et de l'augmentation annuelle du dividende votée par l'entreprise, une action achetée avec un rendement initial de 3,5 % peut délivrer un YoC supérieur à 14 % au bout de 15 ans."
  - question: "Pourquoi le réinvestissement des dividendes est-il beaucoup plus efficace en PEA qu'en CTO ?"
    answer: "Sur un Compte-Titres Ordinaire (CTO) en France, chaque détachement de dividende déclenche immédiatement le Prélèvement Forfaitaire Unique (PFU ou Flat Tax) de 30 %. Vous ne pouvez donc réinvestir que 70 % du coupon brut. À l'inverse, au sein d'un Plan d'Épargne en Actions (PEA) ou d'un CELI au Canada, 100 % du dividende des actions locales est réinvesti sans aucun frottement fiscal intermédiaire."
  - question: "Comment fonctionne la prime de fidélité de 10 % sur les dividendes d'actions françaises ?"
    answer: "Plusieurs grandes sociétés du CAC 40 (comme Air Liquide, L'Oréal, Engie ou Seb) accordent une majoration de 10 % du dividende aux actionnaires qui inscrivent leurs titres au nominatif pur ou au nominatif administré dans leur PEA ou CTO et les conservent pendant au moins deux années civiles pleines."
  - question: "Vaut-il mieux choisir une action qui verse 7 % de dividende ou 3 % avec une forte croissance ?"
    answer: "Un rendement facial très élevé (supérieur à 7 % ou 8 %) est souvent le symptôme d'une chute du cours de bourse liée à des difficultés structurelles. Si l'entreprise ne génère pas assez de flux de trésorerie disponible (Free Cash Flow), elle finira par réduire ou supprimer son coupon. Sur un horizon de 10 à 20 ans, une entreprise qui verse 3 % mais augmente son dividende de 7 % par an génère une rente et un capital nettement supérieurs."
  - question: "Peut-on réinvestir automatiquement des dividendes sur des fractions d'actions ?"
    answer: "Sur un Compte-Titres Ordinaire, de nombreux courtiers modernes proposent un plan DRIP automatisé achetant des fractions d'actions dès le jour du paiement du coupon. En revanche, la réglementation française du PEA n'autorise que la détention d'actions entières : les dividendes s'accumulent alors sur le compte espèces du PEA et vous passez manuellement un ordre d'achat dès que le solde couvre le prix d'un titre entier."
---

Le réinvestissement systématique des dividendes — connu sous l'acronyme **DRIP** (*Dividend Reinvestment Plan*) — constitue l'un des leviers les plus puissants de la création de richesse en bourse. Lorsqu'un investisseur perçoit un dividende en espèces et l'utilise immédiatement pour acquérir de nouvelles actions, il active une **double capitalisation** : son nombre d'actions augmente d'année en année sans effort d'épargne supplémentaire, et chaque action nouvelle génère à son tour des dividendes qui croissent au rythme des bénéfices de l'entreprise.

Cette calculatrice de réinvestissement des dividendes modélise l'interaction entre vos apports périodiques, le taux de rendement du dividende, le taux de croissance annuel du coupon, l'appréciation du cours de l'action et la fiscalité sur les distributions.

## Les trois moteurs mathématiques de l'effet boule de neige (DRIP)

Contrairement à un livret bancaire où seul le taux d'intérêt travaille sur un capital fixe, un portefeuille d'actions à dividendes croissants combine trois variables dynamiques à chaque exercice annuel $t$ :

1. **La masse de dividendes bruts générée à l'année $t$ ($D_t$)** :
   Elle dépend du nombre d'actions détenues à la fin de l'année précédente ($N_{t-1}$) et du dividende par action ($\text{DPA}_t$), qui progresse au taux de croissance annuel du dividende $g_d$ :
   $$\text{DPA}_t = \text{DPA}_0 \times (1 + g_d)^t \quad \Longrightarrow \quad D_t = N_{t-1} \times \text{DPA}_t$$

2. **L'accumulation de nouvelles actions ($\Delta N_t$)** :
   Après déduction de la fiscalité éventuelle au taux $\tau$ sur le dividende perçu et ajout de vos versements annuels nouveaux ($A_t$), la trésorerie disponible est convertie en actions nouvelles au cours boursier de l'année $t$ ($P_t = P_0 \times (1 + g_p)^t$, où $g_p$ est la croissance annuelle du cours) :
   $$\Delta N_t = \frac{D_t \times (1 - \tau) + A_t}{P_t} \quad \text{et} \quad N_t = N_{t-1} + \Delta N_t$$

3. **Le rendement sur coût d'achat (*Yield on Cost* ou YoC)** :
   Indicateur clé du rentier boursier, il mesure la rentabilité annuelle en dividendes rapportée uniquement aux sommes sorties de votre poche :
   $$\text{YoC}_t = \frac{D_t}{\text{Capital initial } C_0 + \sum A_t}$$

## Démonstration chiffrée : 15 ans de réinvestissement en PEA

Prenons un investisseur plaçant un capital unique de **20 000 €** ($C_0$) au sein d'un Plan d'Épargne en Actions (PEA, donc $\tau = 0\text{ \%}$ d'impôt lors de l'encaissement des coupons) sur un portefeuille de valeurs européennes (prix unitaire $P_0 = 100\text{ €}$, soit $N_0 = 200\text{ actions}$), sans aucun versement complémentaire ($A_t = 0\text{ €}$) pendant **15 ans**.

* **Rendement initial du dividende** : $y = 3,80\text{ \%}$ ($\text{DPA}_0 = 3,80\text{ €}$ par action, générant **760,00 €** l'an 1).
* **Croissance annuelle du dividende et du cours** : $g_d = g_p = 5,50\text{ \% par an}$.

Suivons la mécanique mathématique sur 15 ans :
1. **Multiplication du nombre d'actions détenues** :
   Chaque année, le réinvestissement intégral d'un dividende de 3,80 % augmente le stock d'actions de 3,80 % :
   $$N_{15} = 200 \times (1 + 0,038)^{15} = 349,95\text{ actions}$$
   Sans rajouter un seul euro de sa poche, l'investisseur possède **74,97 % d'actions en plus** (près de 150 actions gratuites acquises grâce aux coupons).
2. **Progression du cours et du dividende unitaire (à 5,50 %/an sur 15 ans)** :
   * Facteur de croissance : $(1 + 0,055)^{15} \approx 2,232476$.
   * Nouveau cours de l'action à 15 ans : $P_{15} = 100 \times 2,232476 = 223,25\text{ €}$.
   * Nouveau dividende unitaire par action : $\text{DPA}_{15} = 3,80 \times 2,232476 = 8,4834\text{ €}$.
3. **Valorisation totale du portefeuille à 15 ans** :
   $$V_{15} = 349,945\text{ actions} \times 223,2476\text{ €} = 78\,124,38\text{ €}$$
   *(Sans réinvestissement des dividendes, les 200 actions initiales ne vaudraient que **44 649,53 €**).*
4. **Rente annuelle et Rendement sur Coût d'Achat (YoC) à 15 ans** :
   * Dividende annuel perçu à la 15e année : $349,945 \times 8,4834\text{ €} = 2\,968,73\text{ € / an}$ (rente multipliée par **3,91**).
   * **Yield on Cost (YoC)** : $\frac{2\,968,73\text{ €}}{20\,000\text{ €}} = \mathbf{14,84\text{ \%}}$ de rendement annuel sur la mise initiale.

## Tableau comparatif : 3 profils d'actions à dividendes sur 20 ans (20 000 € en PEA)

| Stratégie & Profil | Rendement initial | Croissance annuelle | Rente à 10 ans (YoC) | Rente à 20 ans (YoC) | Portefeuille à 20 ans |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Croissance** *(L'Oréal, Air Liquide)* | 2,20 % | +7,50 % / an | 1 127 € *(5,6 %)* | **2 885 €** *(14,4 %)* | **131 142 €** |
| **2. Équilibré** *(Sanofi, TotalEnergies)* | 3,80 % | +5,50 % / an | 1 888 € *(9,4 %)* | **4 684 €** *(23,4 %)* | **123 265 €** |
| **3. Haut Rendement** *(Télécoms, SIIC)* | 6,50 % | +1,50 % / an | 2 830 € *(14,2 %)* | **6 164 €** *(30,8 %)* | **94 832 €** |

## Stratégies d'optimisation fiscale et pièges à éviter

* **Évitez la ponction fiscale précoce du Compte-Titres Ordinaire (CTO)** : si notre investisseur (rendement 3,80 %, croissance 5,50 %) loge ses actions sur un CTO soumis à la Flat Tax de 30 % sur chaque coupon au lieu d'un PEA, son taux de réinvestissement annuel tombe à **2,66 % net**. Au bout de 15 ans, son portefeuille atteint **66 140 €** au lieu de **78 124 €**, soit près de **12 000 € perdus** à cause du frottement fiscal.
* **Activez le nominatif administré pour obtenir +10 % de dividendes** : inscrire vos actions éligibles (Air Liquide, L'Oréal, Engie, Seb) au nominatif administré dans votre PEA est gratuit chez la plupart des courtiers en ligne et majore votre dividende de 10 % après deux années civiles pleines.
* **Écartez les « pièges à dividendes » (*Dividend Traps*)** : vérifiez toujours que le **taux de distribution (*Payout Ratio*)** ne dépasse pas **65 % à 70 %** du bénéfice net et qu'il est couvert par le **flux de trésorerie disponible (*Free Cash Flow*)**.
