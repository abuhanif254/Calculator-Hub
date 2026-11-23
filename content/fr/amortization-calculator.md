---
title: "Calculatrice d'Amortissement"
metaTitle: "Calculatrice d'Amortissement | Tableau de Prêt et Intérêts"
description: "Calculez vos mensualités constantes, générez un tableau d'amortissement mois par mois et mesurez l'économie d'un remboursement anticipé."
metaDescription: "Calculez vos mensualités de prêt et générez un tableau d'amortissement détaillé : capital amorti, coût total des intérêts et remboursement anticipé."
metaKeywords: "calculatrice amortissement, tableau d'amortissement prêt, amortissement constant, capital restant dû, remboursement anticipé, échéancier bancaire, intérêts crédit"
faqs:
  - question: "Quelle est la différence entre un prêt à mensualités constantes et un prêt à amortissement constant ?"
    answer: "Dans un prêt à mensualités constantes (le standard bancaire pour la majorité des crédits immobiliers et personnels), l'échéance mensuelle reste identique du premier au dernier mois, tandis que la part d'intérêts diminue au profit du capital amorti. Dans un prêt à amortissement constant, vous remboursez chaque mois la même fraction de capital augmentée d'intérêts décroissants : les premières mensualités sont plus élevées, mais le coût global des intérêts est sensiblement réduit."
  - question: "Pourquoi paie-t-on autant d'intérêts au début d'un tableau d'amortissement ?"
    answer: "Les intérêts de chaque mois sont calculés exclusivement sur le capital restant dû au terme de la période précédente. Au démarrage du crédit, ce solde est à son niveau maximal, ce qui mobilise une large portion de vos premières mensualités. Chaque remboursement réduit ensuite cette assiette, déclenchant une accélération progressive de l'amortissement du capital jusqu'à l'extinction totale de la dette."
  - question: "En quoi le calcul d'amortissement hypothécaire diffère-t-il entre l'Europe et le Canada ?"
    answer: "En France, en Belgique et en Suisse, le taux périodique mensuel d'un prêt à taux fixe s'obtient généralement par division proportionnelle directe du taux nominal annuel par 12. Au Canada, la réglementation fédérale impose pour les prêts hypothécaires à taux fixe une capitalisation semestrielle : le taux mensuel équivalent est alors légèrement inférieur au douzième du taux affiché, ce qui abaisse modestement la mensualité à taux nominal égal."
  - question: "À quel moment un remboursement anticipé partiel est-il le plus rentable ?"
    answer: "Un versement anticipé génère une économie maximale lorsqu'il intervient dans la première moitié du prêt, période durant laquelle l'essentiel des intérêts reste à courir. Pour optimiser le gain, il est préférable d'affecter ce versement à la réduction de la durée restante plutôt qu'à la baisse de la mensualité, tout en vérifiant les éventuelles indemnités de remboursement anticipé prévues au contrat."
  - question: "Comment l'assurance emprunteur s'intègre-t-elle dans un tableau d'amortissement ?"
    answer: "L'échéancier de base détaille le capital amorti et les intérêts nominaux. L'assurance emprunteur figure habituellement dans une colonne distincte : sa cotisation demeure fixe sur toute la durée si elle est calculée sur le capital initial, ou décroît progressivement si elle est assise sur le capital restant dû, ce qui influe directement sur le taux annuel effectif global (TAEG)."
---

Le **tableau d'amortissement** — ou échéancier bancaire — détaille mois après mois le remboursement de tout prêt amortissable, qu'il s'agisse d'un crédit immobilier, d'un financement automobile ou d'un emprunt professionnel. Bien que la mensualité prélevée demeure identique d'un mois à l'autre, sa répartition interne bascule progressivement : la fraction versée en intérêts diminue pendant que la part consacrée au remboursement du capital s'amplifie. Lire précisément cet échéancier permet de comparer deux offres sur leur coût réel et d'évaluer la rentabilité d'un remboursement anticipé.

## Mécanique actuarielle du tableau d'amortissement

Pour un emprunt classique à **mensualités constantes**, l'échéance mensuelle fixe ($M$) permettant d'amortir un capital initial $C_0$ en euros (`€`) sur $N$ mois au taux périodique $r$ est donnée par la formule actuarielle :

$$M = C_0 \times \frac{r(1 + r)^N}{(1 + r)^N - 1}$$

- **$C_0$** désigne le capital initial emprunté hors frais annexes.
- **$N$** représente le nombre total d'échéances mensuelles ($\text{durée en années} \times 12$).
- **$r$** correspond au taux mensuel : en Europe (France, Belgique, Suisse), on applique le taux proportionnel $r = \frac{T_{\text{annuel}}}{12}$, alors qu'une hypothèque canadienne à taux fixe applique la capitalisation semestrielle légale $r = \left(1 + \frac{T_{\text{annuel}}}{2}\right)^{1/6} - 1$.

Chaque ligne $k$ de l'échéancier (de $k = 1$ à $k = N$) se déduit ensuite par récurrence à partir du **capital restant dû** ($CRD$) du mois précédent :

$$I_k = CRD_{k-1} \times r, \qquad A_k = M - I_k, \qquad CRD_k = CRD_{k-1} - A_k$$

Où $I_k$ représente les intérêts du mois et $A_k$ le capital amorti. Le coût théorique total des intérêts vaut $I_{\text{total}} = (M \times N) - C_0$, avec un léger ajustement sur la dernière mensualité pour compenser les arrondis mensuels au centime.

## Exemple chiffré : prêt de 200 000 € sur 20 ans à 3,60 %

Étudions un crédit immobilier de **200 000 €** sur **20 ans** ($N = 240\text{ mois}$) au taux annuel fixe de **3,60 %** hors assurance (méthode proportionnelle européenne).

### Étape 1 : Calcul de la mensualité constante

Le taux mensuel exact vaut $r = \frac{0{,}036}{12} = 0{,}003$ ($0{,}30\,\%$ par mois) et le facteur composé atteint $(1{,}003)^{240} \approx 2{,}052220$.

$$M = 200\,000 \times \frac{0{,}003 \times 2{,}052220}{2{,}052220 - 1} = \mathbf{1\,170{,}22\text{ €}}$$

En comparaison, une hypothèque canadienne au même taux nominal affiché de 3,60 % à capitalisation semestrielle donne un taux mensuel effectif de $0{,}297774\,\%$ et une mensualité de **1 167,47 €**.

### Étape 2 : Ventilation des premières échéances

- **Mois 1** : $I_1 = 200\,000 \times 0{,}003 = \mathbf{600{,}00\text{ €}}$, donc $A_1 = 1\,170{,}22 - 600{,}00 = \mathbf{570{,}22\text{ €}}$ et $CRD_1 = 199\,429{,}78\text{ €}$.
- **Mois 2** : $I_2 = 199\,429{,}78 \times 0{,}003 = \mathbf{598{,}29\text{ €}}$, portant le capital amorti à $A_2 = \mathbf{571{,}93\text{ €}}$ pour un solde de **198 857,85 €**.
- **Point de bascule (Mois 10)** : dès la 10e échéance, le capital remboursé (**585,80 €**) dépasse définitivement les intérêts mensuels (**584,42 €**).

### Étape 3 : Gain d'un versement supplémentaire de 100 €/mois

En majorant chaque mensualité de **100 €** affectés au capital (soit **1 270,22 €** par mois), le crédit s'éteint en **214 mois** (17 ans et 10 mois), ce qui supprime **26 mensualités**. Les intérêts cumulés reculent de **80 853,77 €** à **71 106,78 €**, soit **9 746,99 €** d'économie directe.

## Extrait d'échéancier et jalons clés sur 20 ans

Le tableau ci-dessous retrace la trajectoire du prêt de **200 000 €** à **3,60 %** aux grandes échéances clés :

| Échéance | Mensualité (€) | Intérêts (€) | Capital amorti (€) | Intérêts cumulés (€) | Capital restant dû (€) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Mois 1** | 1 170,22 | 600,00 | 570,22 | 600,00 | 199 429,78 |
| **Mois 2** | 1 170,22 | 598,29 | 571,93 | 1 198,29 | 198 857,85 |
| **Mois 10 (bascule)** | 1 170,22 | 584,42 | 585,80 | 5 922,41 | 194 220,21 |
| **Mois 60 (5 ans)** | 1 170,22 | 489,77 | 680,45 | 32 788,74 | 162 575,54 |
| **Mois 120 (10 ans)** | 1 170,22 | 355,79 | 814,43 | 58 208,80 | 117 782,40 |
| **Mois 180 (15 ans)** | 1 170,22 | 195,43 | 974,79 | 74 809,30 | 64 169,70 |
| **Mois 240 (solde)** | 1 171,19 | 3,50 | 1 167,69 | **80 853,77** | **0,00** |

À mi-parcours (10 ans), **72,0 %** des intérêts totaux (**58 208,80 €**) ont déjà été acquittés alors que seulement **41,1 %** du capital emprunté est remboursé. La dernière échéance (**1 171,19 €**) inclut un ajustement de 0,97 € soldant les fractions de centimes cumulées sur 239 mois.

Notons également que si l'emprunteur avait choisi un **prêt à amortissement constant** (remboursement fixe de 833,33 € de capital chaque mois plus intérêts décroissants), la première mensualité aurait atteint 1 433,33 €, mais la charge cumulée d'intérêts serait tombée à 72 300,00 €, soit une économie de 8 553,77 € au prix d'un effort de trésorerie initial plus exigeant. De plus, l'échéancier de base reflète le seul taux nominal : pour comparer deux banques de façon loyale, rapportez toujours ce coût au **TAEG**, qui intègre frais de dossier, garantie et assurance emprunteur.

## Vigilance et stratégies pour réduire le coût d'amortissement

- **Raccourcir la durée plutôt que baisser la mensualité** : lors d'un remboursement anticipé partiel, maintenir sa mensualité pour réduire le nombre d'échéances restantes supprime les années les plus coûteuses et maximise l'économie d'intérêts.
- **Anticiper les indemnités de remboursement anticipé** : en France, elles sont plafonnées au plus bas entre 6 mois d'intérêts au taux moyen du prêt et 3 % du capital restant dû ; en Belgique, l'indemnité de remploi est limitée à 3 mois d'intérêts. Négociez leur suppression dès l'offre initiale.
- **Mesurer le coût du différé d'amortissement** : lors d'un achat sur plan, une période de différé partiel consiste à payer uniquement des intérêts intercalaires sans réduire le capital dû, ce qui alourdit mécaniquement la facture globale.
- **Arbitrer entre amortissement direct et indirect en Suisse** : pour la dette hypothécaire de second rang, l'amortissement indirect via le pilier 3a maintient la déductibilité fiscale des intérêts tout en capitalisant les sommes dédiées au remboursement futur.
