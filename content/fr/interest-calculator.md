---
title: "Calculatrice d'Intérêts"
metaTitle: "Calculatrice d'Intérêts : Simple, Composé et Continu"
description: "Calculez le solde final et les intérêts générés selon sept modes de calcul : intérêt simple, capitalisation annuelle, semestrielle, trimestrielle, mensuelle, quotidienne ou continue."
metaDescription: "Calculez vos intérêts simples, composés (annuels, mensuels, quotidiens) ou continus. Comparez taux nominal, taux effectif annuel et rendement net final."
metaKeywords: "calculatrice d'intérêts, intérêt composé, intérêt simple, capitalisation continue, taux effectif annuel, rendement épargne, fréquence de capitalisation, règle de 72"
faqs:
  - question: "Quelle est la différence entre un taux d'intérêt nominal et un taux effectif annuel ?"
    answer: "Le taux nominal correspond au taux affiché dans le contrat avant prise en compte de la fréquence de capitalisation. Dès que les intérêts sont réintégrés au capital plusieurs fois par an (chaque mois ou chaque trimestre), les intérêts acquis produisent à leur tour des intérêts dans la même année : le rendement réel obtenu sur douze mois, appelé taux effectif annuel (TAE), dépasse alors le taux nominal."
  - question: "Pourquoi passer d'une capitalisation mensuelle à une capitalisation quotidienne change-t-il peu le résultat ?"
    answer: "L'effet de la fréquence de capitalisation obéit à une limite mathématique convergente vers le nombre d'Euler e. À un taux nominal de 5 % sur 10 ans pour 10 000 €, la capitalisation mensuelle atteint 16 470,09 €, la quotidienne 16 486,65 € et la capitalisation continue plafonne à 16 487,21 €. L'essentiel du gain provient du passage de l'intérêt simple à la capitalisation annuelle, puis mensuelle."
  - question: "Comment utiliser la règle de 72 pour estimer le doublement d'un capital ?"
    answer: "La règle de 72 offre un repère mental rapide pour l'intérêt composé : divisez 72 par le taux annuel en pourcentage afin d'obtenir le nombre approximatif d'années nécessaires au doublement du placement. À 4,5 % par an, un capital double en environ 16 ans (72 / 4,5 = 16 ; la valeur mathématique exacte en capitalisation annuelle est de 15,75 ans)."
  - question: "Dans quels contextes financiers rencontre-t-on la capitalisation continue ?"
    answer: "Les comptes bancaires grand public utilisent des échéances discrètes (annuelles, semestrielles ou mensuelles), mais la capitalisation continue (A = C × e^(r×t)) sert de référence théorique en finance quantitative, pour la valorisation d'options (modèle Black-Scholes), le calcul des taux zéro-coupon obligataires et l'évaluation de la borne maximale de rendement d'un taux nominal donné."
  - question: "Comment les livrets d'épargne francophones calculent-ils concrètement les intérêts ?"
    answer: "En France, les livrets réglementés comme le Livret A et le LDDS calculent les intérêts par quinzaine (les 1er et 16 de chaque mois) puis les capitalisent une seule fois par an au 31 décembre. En Belgique, les comptes d'épargne réglementés associent un taux de base annuel et une prime de fidélité acquise après douze mois. Au Canada, les prêts hypothécaires à taux fixe appliquent légalement une capitalisation semestrielle, tandis que les comptes d'épargne à intérêt élevé capitalisent généralement chaque mois."
---

Qu'il s'agisse de projeter la croissance d'un capital placé sur un compte à terme, une assurance-vie en euros, un compte épargne suisse ou un certificat de placement garanti (CPG) canadien, ou encore d'évaluer le coût d'un emprunt sans amortissement intermédiaire, le régime de calcul des intérêts façonne directement la somme finale.

Notre **calculatrice d'intérêts** modélise un capital initial unique (en euros `€`, francs suisses `CHF` ou dollars canadiens `CAD`) sur une durée en années ou en mois, en offrant **sept modes** : intérêt simple, capitalisation annuelle, semestrielle, trimestrielle, mensuelle, quotidienne et capitalisation continue.

## Formules fondamentales et taux effectif annuel

Désignons par **$C$** le capital initial, **$r$** le taux nominal annuel exprimé en décimal (4,50 % s'écrit 0,045), **$t$** la durée totale en années ($t = m / 12$ pour une durée saisie en $m$ mois) et **$n$** le nombre de capitalisations par an. Le solde final **$A$** et les intérêts cumulés **$I = A - C$** répondent à trois formules :

1. **Intérêt simple** (sans réinvestissement des intérêts acquis) :
   $$A = C \times (1 + r \cdot t) \qquad \text{et} \qquad I = C \times r \times t$$
2. **Intérêt composé discret** ($n \in \{1 ; 2 ; 4 ; 12 ; 365\}$) :
   $$A = C \times \left(1 + \frac{r}{n}\right)^{n \cdot t}$$
3. **Capitalisation continue** (limite lorsque $n \to +\infty$, avec la constante d'Euler $e \approx 2{,}71828$) :
   $$A = C \times e^{r \cdot t}$$

Pour comparer objectivement deux placements aux fréquences distinctes, convertissez chaque taux nominal en **taux effectif annuel ($r_{\text{eff}}$)** :

$$r_{\text{eff}} = \left(1 + \frac{r}{n}\right)^{n} - 1 \qquad \text{(discret)} \qquad \text{ou} \qquad r_{\text{eff}} = e^{r} - 1 \qquad \text{(continu)}$$

### Estimer le doublement du capital : règle de 72 et règle de 69,3

En capitalisation annuelle, la **règle de 72** fournit un ordre de grandeur fiable du délai de doublement : divisez 72 par le taux annuel en pourcentage. À **4,50 %**, le repère donne 72 / 4,5 = **16 ans** (contre **15,75 ans** exactement via $\frac{\ln 2}{\ln 1{,}045}$). En capitalisation continue, le délai exact suit la **règle de 69,3** : $t = \frac{\ln 2}{r} \approx \frac{69{,}3}{r_{\%}}$, soit **15,40 ans** à 4,50 %.

## Exemple chiffré : comparer quatre régimes sur 8 ans

Un épargnant place un capital initial de **20 000 €** pendant **8 ans** (soit **96 mois**) à un taux nominal annuel fixe de **4,50 %** ($r = 0{,}045$). Comparons quatre modes disponibles :

1. **Intérêt simple** :
   $$I = 20\,000 \times 0{,}045 \times 8 = 7\,200{,}00\text{ €} \quad \Longrightarrow \quad A = \mathbf{27\,200{,}00\text{ €}}$$
2. **Capitalisation annuelle ($n = 1$)** :
   $$A = 20\,000 \times (1 + 0{,}045)^{8} = 20\,000 \times 1{,}4221006 = \mathbf{28\,442{,}01\text{ €}}$$
   Les intérêts atteignent **8 442,01 €**, soit **1 242,01 €** de plus que l'intérêt simple grâce aux intérêts générés sur les gains antérieurs.
3. **Capitalisation mensuelle ($n = 12$, taux mensuel de 0,375 % sur 96 mois)** :
   $$A = 20\,000 \times \left(1 + \frac{0{,}045}{12}\right)^{96} = 20\,000 \times (1{,}00375)^{96} = \mathbf{28\,647{,}29\text{ €}}$$
   Les intérêts montent à **8 647,29 €**, soit un gain additionnel de **205,28 €** par rapport à la composition annuelle.
4. **Capitalisation continue** :
   $$A = 20\,000 \times e^{0{,}045 \times 8} = 20\,000 \times e^{0{,}36} = \mathbf{28\,666{,}59\text{ €}}$$
   Ce plafond théorique n'ajoute que **19,30 €** face au rythme mensuel sur huit années complètes.

## Tableau comparatif des sept fréquences de capitalisation

Pour un capital de **10 000 €** placé à **5,00 %** nominal pendant **10 ans**, voici l'impact exact de chaque mode sur le taux effectif annuel et le capital acquis :

| Régime de calcul | Périodes / an ($n$) | Taux effectif annuel | Solde final | Intérêts totaux | Surplus / simple |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Intérêt simple** | — | 5,0000 % | 15 000,00 € | 5 000,00 € | 0,00 € |
| **Annuelle** | 1 | 5,0000 % | 16 288,95 € | 6 288,95 € | +1 288,95 € |
| **Semestrielle** | 2 | 5,0625 % | 16 386,16 € | 6 386,16 € | +1 386,16 € |
| **Trimestrielle** | 4 | 5,0945 % | 16 436,19 € | 6 436,19 € | +1 436,19 € |
| **Mensuelle** | 12 | 5,1162 % | 16 470,09 € | 6 470,09 € | +1 470,09 € |
| **Quotidienne** | 365 | 5,1267 % | 16 486,65 € | 6 486,65 € | +1 486,65 € |
| **Continue** | ∞ | 5,1271 % | 16 487,21 € | 6 487,21 € | +1 487,21 € |

La capitalisation annuelle capte déjà **86,7 %** du gain maximal réalisable face à l'intérêt simple (1 288,95 € sur 1 487,21 €), tandis qu'entre les rythmes quotidien et continu l'écart se limite à **0,56 €** sur une décennie.

## Pièges courants et précautions dans l'espace francophone

* **Distinguer taux brut, net fiscal et rendement réel** : Les intérêts subissent la fiscalité locale — prélèvement forfaitaire unique (PFU) de **30 %** en France hors livrets défiscalisés (Livret A, LDDS, LEP), précompte mobilier de **30 %** en Belgique au-delà de la tranche exonérée des comptes réglementés, impôt sur le revenu (avec impôt anticipé de **35 %** récupérable) en Suisse, ou imposition au taux marginal hors **CELI** et **REER** au Canada. Pour mesurer votre pouvoir d'achat réel, ajustez le taux net de l'inflation $\pi$ via la relation de Fisher : $r_{\text{réel}} = \frac{1 + r_{\text{net}}}{1 + \pi} - 1$.
* **Vérifier les conventions nationales de capitalisation** : Un compte à terme européen capitalise généralement annuellement ou à l'échéance, tandis qu'au Canada les hypothèques à taux fixe utilisent légalement une capitalisation semestrielle.
* **Ne pas confondre capital unique et flux périodiques** : Cette calculatrice suppose un dépôt initial unique sans apports ni retraits. Les plans d'épargne à versements mensuels ou les crédits amortissables suivent un profil différent.
* **Se méfier des taux d'appel temporaires** : Un super-livret annonçant « 5 % pendant 3 mois puis 1,5 % » doit être calculé par tranches successives plutôt qu'au taux bonifié sur douze mois.
