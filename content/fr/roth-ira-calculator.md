---
title: "Calculatrice Roth IRA"
metaTitle: "Calculatrice Roth IRA : Croissance Retraite sans Impôt"
description: "Estimez la valeur future de votre compte Roth IRA à la retraite et visualisez la part des gains composés exonérés d'impôt selon votre horizon et votre rendement."
metaDescription: "Calculez le solde futur de votre Roth IRA net d'impôt à la retraite. Simulez intérêts composés, versements annuels et comparatif CELI ou PEA."
metaKeywords: "calculatrice roth ira, retraite sans impôt, épargne retraite, intérêts composés, règle des 5 ans, cotisation après impôt, CELI Canada, PEA France"
faqs:
  - question: "Quelle différence fiscale distingue un Roth IRA d'un IRA traditionnel, d'un REER ou d'un PER ?"
    answer: "Un Roth IRA est alimenté par des revenus déjà imposés, mais la croissance du capital et tous les retraits qualifiés à la retraite sont totalement exonérés d'impôt sur le revenu. À l'inverse, un IRA traditionnel, un REER canadien ou un PER français offrent une déduction fiscale à l'entrée, puis imposent les sommes retirées à la retraite. Le Roth IRA est plus rentable lorsque votre taux marginal d'imposition à la retraite dépasse votre taux actuel."
  - question: "Quelles conditions permettent de retirer les gains d'un Roth IRA sans impôt ni pénalité ?"
    answer: "Pour qu'un retrait de plus-values soit qualifié et exonéré d'impôt fédéral, deux conditions cumulatives s'appliquent : le titulaire doit avoir au moins 59 ans et demi et respecter la règle des cinq ans, c'est-à-dire qu'au moins cinq années fiscales doivent s'être écoulées depuis le 1er janvier de la première année de cotisation. En revanche, les cotisations versées en capital peuvent être retirées à tout moment sans impôt ni pénalité."
  - question: "Quels sont les plafonds de cotisation et les limites de revenu applicables au Roth IRA ?"
    answer: "L'administration fiscale américaine (IRS) révise périodiquement le plafond annuel de cotisation selon l'inflation : il s'établit par exemple à 7 000 USD par an avant 50 ans et à 8 000 USD à partir de 50 ans grâce à la cotisation de rattrapage, dans la limite des revenus d'activité perçus. Au-delà de certains seuils de revenu brut ajusté modifié, le droit à la cotisation directe diminue puis disparaît."
  - question: "Existe-t-il des équivalents au Roth IRA au Canada, en France, en Suisse et en Belgique ?"
    answer: "Oui. Au Canada, le CELI (Compte d'épargne libre d'impôt) repose exactement sur le même principe de cotisations après impôt suivies d'une croissance et de retraits libres d'impôt. En France, le PEA exonère les gains d'impôt sur le revenu après cinq ans tout en maintenant les prélèvements sociaux de 17,2 %. Le Pilier 3a suisse et l'épargne-pension belge privilégient plutôt un avantage fiscal immédiat lors du versement."
  - question: "Comment est imposé un Roth IRA pour un francophone qui quitte les États-Unis pour la France ou le Canada ?"
    answer: "La fiscalité dépend directement de la convention bilatérale applicable. La convention fiscale franco-américaine protège en principe l'exonération des comptes de retraite américains qualifiés sous réserve de déclarations conformes en France. Au Canada, l'Agence du revenu exige un choix fiscal unique dès la première année de résidence pour préserver la croissance libre d'impôt du Roth IRA, à condition de cesser toute nouvelle cotisation."
---

Le **Roth IRA** (compte individuel d'épargne-retraite américain de type Roth) repose sur un mécanisme patrimonial redoutablement efficace : les cotisations proviennent de revenus déjà imposés, mais les dividendes, intérêts composés et retraits qualifiés à la retraite sont totalement exonérés d'impôt sur le revenu, sans aucun retrait minimum obligatoire du vivant du titulaire.

Notre calculatrice projette votre solde futur entre votre âge actuel et votre départ à la retraite en séparant vos apports cumulés des gains composés. Indépendant de la devise, ce moteur mathématique s'applique à l'identique en euros (`€`), en dollars canadiens (`CAD`) pour un **CELI** ou en dollars américains (`USD`).

## Formule de capitalisation composée d'un compte Roth IRA

Entre votre âge actuel ($A_0$) et votre âge de retraite ($A_{\text{ret}}$), l'horizon vaut $n = A_{\text{ret}} - A_0$ années. Avec un taux de rendement annuel net $r$ et une cotisation annuelle constante $C$ versée chaque fin d'exercice, le solde final exonéré d'impôt ($S_n$) suit l'équation :

$$S_n = S_0 (1 + r)^n + C \times \frac{(1 + r)^n - 1}{r}$$

Lorsque $r = 0$, l'expression se réduit à $S_n = S_0 + n \cdot C$. Chaque variable correspond à un champ précis :

* **$S_0$ (Solde actuel)** : capital déjà investi (`€`, `CAD` ou `USD`).
* **$C$ (Cotisation annuelle)** : apport effectué chaque année jusqu'à la retraite (`€`, `CAD` ou `USD`).
* **$r$ (Taux de rendement annuel)** : performance nette de frais en décimal ($0{,}07$ pour $7{,}0\,\%$).
* **$n$ (Horizon)** : nombre d'années de capitalisation ($A_{\text{ret}} - A_0$).

Le total des cotisations vaut $C_{\text{tot}} = S_0 + n \cdot C$, et les gains nets d'impôt représentent $G_{\text{tot}} = S_n - C_{\text{tot}}$.

### Fiscalité à l'entrée contre fiscalité à la sortie

Placer un revenu brut $B$ imposé immédiatement au taux $\tau_0$ dans un Roth IRA ou un CELI produit $V_{\text{Roth}} = B(1 - \tau_0)(1 + r)^n$. L'investir avant impôt dans un plan déductible (IRA traditionnel, REER canadien ou PER français) puis subir un taux $\tau_n$ au retrait donne $V_{\text{Trad}} = B(1 + r)^n (1 - \tau_n)$. Les deux stratégies s'équivalent si $\tau_0 = \tau_n$ ; l'enveloppe après impôt l'emporte dès que **$\tau_n > \tau_0$**, cas fréquent en début de carrière ou face à une hausse future des barèmes.

## Exemple chiffré : épargner de 30 à 65 ans

Un épargnant de **30 ans** vise la retraite à **65 ans** ($n = 35\text{ ans}$). Il dispose d'un solde initial de **10 000 €** (calcul identique en `CAD` ou `USD`), cotise **6 000 € par an** et retient un rendement annuel net de **7,0 %**.

1. **Facteur composé sur 35 ans** : $(1{,}07)^{35} \approx 10{,}676581$.
2. **Croissance du solde initial** : $10\,000 \times 10{,}676581 = 106\,765{,}81\text{ €}$.
3. **Capitalisation des 35 cotisations** :
   $$6\,000 \times \frac{10{,}676581 - 1}{0{,}07} = 829\,421{,}27\text{ €}$$
4. **Solde final net d'impôt** : $106\,765{,}81 + 829\,421{,}27 = \mathbf{936\,187{,}08\text{ €}}$.
5. **Apports contre intérêts** : les cotisations totalisent **220 000 €** ($23{,}5\,\%$), tandis que les gains exonérés atteignent **716 187,08 €** ($76{,}5\,\%$).

L'économie fiscale est considérable : face au prélèvement forfaitaire français de $30\,\%$ sur un compte-titres ordinaire, l'abri fiscal évite **214 856 €** d'impôt à la sortie (et **123 184 €** face aux prélèvements sociaux de $17{,}2\,\%$ du PEA). Corrigé d'une inflation moyenne de $2{,}0\,\%$ par an ($(1{,}02)^{35} \approx 1{,}99989$), ce capital de **936 187 €** représente **468 119 €** en pouvoir d'achat actuel.

## Tableau comparatif : l'effet décisif de l'âge de démarrage

À partir d'un solde nul ($S_0 = 0\text{ €}$) et d'une cotisation annuelle de **7 000 €** jusqu'à **65 ans** (repère aligné sur le plafond d'un Roth IRA avant 50 ans ou d'un CELI), voici l'impact de l'âge de départ selon trois rendements nets :

| Âge de départ | Durée | Total versé | Solde à 5 % | Solde à 7 % | Part des gains (7 %) | Solde à 8 % |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **25 ans** | 40 ans | 280 000 € | 845 598 € | 1 397 446 € | 80,0 % | 1 813 396 € |
| **30 ans** | 35 ans | 245 000 € | 632 242 € | 967 658 € | 74,7 % | 1 206 218 € |
| **35 ans** | 30 ans | 210 000 € | 465 072 € | 661 226 € | 68,2 % | 792 982 € |
| **40 ans** | 25 ans | 175 000 € | 334 090 € | 442 743 € | 60,5 % | 511 742 € |
| **45 ans** | 20 ans | 140 000 € | 231 462 € | 286 968 € | 51,2 % | 320 334 € |
| **50 ans** | 15 ans | 105 000 € | 151 050 € | 175 903 € | 40,3 % | 190 065 € |

Commencer à **25 ans** plutôt qu'à **35 ans** n'exige que **70 000 €** d'apports supplémentaires, mais génère **736 220 €** de richesse en plus à $7\,\%$ : les dix dernières années concentrent l'essentiel de la création de capital.

## Règles pratiques et pièges courants à éviter

* **Raisonner en rendement réel net de frais** : Soustrayez les frais annuels de gestion ($0{,}10\,\%$ à $0{,}25\,\%$ sur fonds indiciels contre $1{,}50\,\%$ à $2{,}00\,\%$ sur fonds actifs) et l'inflation anticipée ($2\,\%$). Saisir $5\,\%$ au lieu de $7\,\%$ affiche directement votre patrimoine en pouvoir d'achat constant.
* **Respecter les plafonds annuels** : Le Roth IRA limite les versements annuels (avec rattrapage dès 50 ans), tout comme le CELI canadien ou le PEA français (plafonné à 150 000 € de dépôts). Au-delà, complétez via une assurance-vie, un Pilier 3a suisse ou un compte-titres.
* **Observer la règle des cinq ans** : Retirer des plus-values avant 59 ans et demi ou avant cinq années fiscales expose à l'impôt et à une pénalité de $10\,\%$, tandis que le capital cotisé reste retirable sans frais.
* **Vérifier les conventions fiscales en cas d'expatriation** : Entre les États-Unis, la France, la Belgique, la Suisse et le Canada, un déménagement peut modifier le traitement fiscal d'un compte étranger ; consultez toujours la convention bilatérale avant de poursuivre vos versements.
