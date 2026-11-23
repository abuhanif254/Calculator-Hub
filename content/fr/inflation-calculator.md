---
title: "Calculatrice d'Inflation"
metaTitle: "Calculatrice d'Inflation : Pouvoir d'Achat et Coût Futur"
description: "Estimez l'érosion de votre pouvoir d'achat, le coût futur d'une dépense et l'inflation cumulée sur l'horizon de votre choix selon un taux annuel composé."
metaDescription: "Estimez l'impact de l'inflation composée sur votre épargne et vos prix futurs : pouvoir d'achat actualisé, coût futur, inflation cumulée et Fisher."
metaKeywords: "calculatrice inflation, calcul inflation, pouvoir d'achat, coût futur, inflation cumulée, taux d'inflation annuel, IPC INSEE, relation de Fisher, érosion monétaire"
faqs:
  - question: "Quelle est la différence entre le coût futur et le pouvoir d'achat équivalent ?"
    answer: "Le coût futur projette le prix qu'un bien ou un budget actuel atteindra dans plusieurs années sous l'effet de la hausse composée des prix : un panier de 10 000 € soumis à 3 % d'inflation par an coûtera 18 061 € dans 20 ans (+80,6 %). Le pouvoir d'achat équivalent répond à la question inverse : une somme fixe de 10 000 € conservée sans rendement ne permettra plus d'acheter que l'équivalent de 5 537 € d'aujourd'hui dans 20 ans, soit une perte réelle de 44,6 %."
  - question: "Comment calculer le rendement réel d'un placement avec la relation de Fisher ?"
    answer: "Soustraire simplement l'inflation au taux nominal (r_nom - i) n'est qu'une approximation. La formule exacte de Fisher s'écrit r_réel = (1 + r_nom) / (1 + i) - 1. Par exemple, un livret ou contrat rapportant 4,0 % net face à une inflation de 2,5 % procure un rendement réel exact de (1,04 / 1,025) - 1 = 1,46 % par an, et non 1,50 %. L'écart s'élargit fortement dès que l'inflation dépasse 4 % à 5 %."
  - question: "Quels indices officiels mesurent l'inflation en France, en Belgique, en Suisse et au Canada ?"
    answer: "En France, l'INSEE publie l'Indice des Prix à la Consommation (IPC) ainsi que l'IPCH harmonisé au niveau d'Eurostat. En Belgique, Statbel calcule l'IPC et l'indice santé, qui sert de base légale à l'indexation automatique des salaires et des loyers. En Suisse, l'Office fédéral de la statistique (OFS) publie l'IPC national, tandis que Statistique Canada mesure l'IPC canadien. La BCE et la Banque du Canada visent une inflation cible de 2 % à moyen terme, et la BNS une fourchette de 0 % à 2 %."
  - question: "Pourquoi mon inflation personnelle semble-t-elle supérieure au taux officiel de l'IPC ?"
    answer: "L'IPC reflète la consommation moyenne de l'ensemble des ménages d'un pays selon des pondérations statistiques fixes révisées chaque année. Si votre budget accorde un poids supérieur à la moyenne à l'alimentation, à l'énergie, au logement ou aux frais de garde — postes dont les prix évoluent souvent plus vite que l'indice général — votre inflation ressentie dépasse mécaniquement le taux officiel. Par ailleurs, l'achat immobilier n'est pas pondéré comme les loyers dans l'IPC européen."
  - question: "Comment fonctionne la règle de 72 pour estimer le doublement des prix ?"
    answer: "La règle de 72 fournit une estimation mentale rapide du nombre d'années nécessaires pour que les prix doublent — et que le pouvoir d'achat d'une épargne non rémunérée soit divisé par deux : il suffit de diviser 72 par le taux d'inflation annuel en pourcentage. À 2 % par an, les prix doublent en environ 35 à 36 ans ; à 3 %, en 23 à 24 ans ; et à 5 %, en un peu plus de 14 ans."
---

L'**inflation** mesure la hausse générale et durable des prix à la consommation via l'**Indice des Prix à la Consommation (IPC)**. Son caractère composé rogne discrètement les liquidités dormantes : même à $2\,\%$ ou $3\,\%$ par an, une épargne non rémunérée perd une fraction majeure de sa valeur réelle, tandis que le budget requis pour la retraite, les études ou l'immobilier s'alourdit rapidement.

Notre **calculatrice d'inflation** projette simultanément le **coût futur** d'une dépense actuelle, le **pouvoir d'achat résiduel** d'un capital statique en monnaie constante d'aujourd'hui, l'**inflation cumulée** ainsi que les deux courbes d'évolution année après année.

## Formules de l'Inflation Composée et du Pouvoir d'Achat

Soit $C_0$ le montant de départ (en euros `€`, dollars canadiens `$ CA` ou francs suisses `CHF`, la proportionnalité demeurant strictement identique), $i$ le taux d'inflation annuel moyen sous forme décimale ($0{,}03$ pour $3\,\%$) et $n$ l'horizon en années :

* **Coût futur (projection à la hausse)** et **pouvoir d'achat équivalent (érosion à la baisse)** :
  $$C_f = C_0 \times (1 + i)^n \qquad \text{et} \qquad P_a = \frac{C_0}{(1 + i)^n}$$
* **Inflation cumulée** et **perte relative de pouvoir d'achat** (en pourcentage) :
  $$I_{\text{cum}} = \left[(1 + i)^n - 1\right] \times 100 \qquad \text{et} \qquad \Delta P = \left(1 - \frac{1}{(1 + i)^n}\right) \times 100$$

Pour juger si un placement au taux annuel net $r_{\text{nom}}$ protège votre épargne, la **relation de Fisher** calcule le rendement réel exact, et le logarithme donne le temps exact de doublement des prix $n_2$ :

$$r_{\text{réel}} = \frac{1 + r_{\text{nom}}}{1 + i} - 1 \qquad \text{et} \qquad n_2 = \frac{\ln(2)}{\ln(1 + i)} \approx \frac{72}{100 \times i}$$

## Exemple Chiffré Pas à Pas : 50 000 € sur 15 Ans

Supposons un capital ou un objectif budgétaire de **$C_0 = 50\,000\text{ €}$** (ou `50 000 $ CA` / `CHF`) face à une inflation moyenne de **$i = 2{,}8\,\%$** ($0{,}028$) sur **$n = 15\text{ ans}$**.

1. **Facteur composé** :
   $$(1 + 0{,}028)^{15} \approx 1{,}513201$$
2. **Coût futur et inflation cumulée** :
   $$C_f = 50\,000 \times 1{,}513201 = \mathbf{75\,660{,}07\text{ €}} \qquad \text{et} \qquad I_{\text{cum}} = \mathbf{+51{,}32\,\%}$$
   Un panier ou projet de $50\,000\text{ €}$ aujourd'hui exigera donc environ **$75\,660\text{ €}$** dans quinze ans.
3. **Pouvoir d'achat résiduel sans rendement** :
   $$P_a = \frac{50\,000}{1{,}513201} = \mathbf{33\,042{,}53\text{ €}}$$
   Conservés sur un compte courant non rémunéré, ces $50\,000\text{ €}$ perdent **$16\,957{,}47\text{ €}$** de pouvoir d'achat réel (**$-33{,}91\,\%$**).
4. **Effet d'un placement à $4{,}0\,\%$ net d'impôts** :
   Par la relation de Fisher, le rendement réel s'élève à $r_{\text{réel}} = \frac{1{,}04}{1{,}028} - 1 \approx \mathbf{1{,}17\,\%/\text{an}}$. Au bout de $15\text{ ans}$, le capital nominal atteint $50\,000 \times (1{,}04)^{15} = \mathbf{90\,047{,}18\text{ €}}$, équivalant en euros constants d'aujourd'hui à $\frac{90\,047{,}18}{1{,}513201} = \mathbf{59\,507{,}73\text{ €}}$ ($+9\,507{,}73\text{ €}$ de gain réel).

## Tableau Comparatif : Érosion de 10 000 € selon le Régime d'Inflation

Pour une somme repère de **$10\,000\text{ €}$** (ou `$ CA` / `CHF`), voici l'écart entre coût futur et pouvoir d'achat à $10$ et $20\text{ ans}$ sous cinq régimes d'inflation :

| Taux annuel ($i$) | Coût futur (10 ans) | Pouvoir d'achat (10 ans) | Coût futur (20 ans) | Pouvoir d'achat (20 ans) | Perte réelle (20 ans) | Doublement ($n_2$) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1,0 %** (bas suisse) | 11 046 € | 9 053 € | 12 202 € | 8 195 € | -18,0 % | 69,7 ans |
| **2,0 %** (cible BCE / BdC) | 12 190 € | 8 203 € | 14 859 € | 6 730 € | -32,7 % | 35,0 ans |
| **3,0 %** (historique modéré) | 13 439 € | 7 441 € | 18 061 € | 5 537 € | -44,6 % | 23,4 ans |
| **5,0 %** (poussée forte) | 16 289 € | 6 139 € | 26 533 € | 3 769 € | -62,3 % | 14,2 ans |
| **8,0 %** (choc de prix) | 21 589 € | 4 632 € | 46 610 € | 2 145 € | -78,5 % | 9,0 ans |

## Repères Francophones, Conseils Pratiques et Pièges Fréquents

* **Comprendre l'asymétrie entre hausse des prix et baisse de pouvoir d'achat** : À $3\,\%$ sur $20\text{ ans}$, les prix augmentent de **$+80{,}6\,\%$**, mais la perte de pouvoir d'achat vaut **$-44{,}6\,\%$** (et non $-80{,}6\,\%$), car $1 / 1{,}8061 = 0{,}5537$.
* **Raisonner en rendement réel après impôts** : Les impôts sur le capital (PFU de $30\,\%$ en France hors Livret A/PEA, précompte mobilier de $30\,\%$ en Belgique, impôt sur les revenus mobiliers en Suisse ou fiscalité hors CELI/REER au Canada) taxent les gains *nominaux*. Un taux brut de $3{,}0\,\%$ taxé à $30\,\%$ ne laisse que $2{,}1\,\%$ net, donc un rendement réel négatif dès que l'inflation dépasse $2{,}1\,\%$.
* **Ne pas additionner des taux annuels successifs** : Deux années à $5\,\%$ puis $2\,\%$ produisent $(1{,}05 \times 1{,}02) - 1 = \mathbf{7{,}10\,\%}$ d'inflation cumulée (moyenne géométrique de **$3{,}49\,\%/\text{an}$**), jamais une simple somme de $7{,}00\,\%$.
* **Utiliser l'indice adapté à son pays** : Référez-vous à l'**IPC** de l'**INSEE** (ou **IPCH** Eurostat) en France, à l'**indice santé** de **Statbel** en Belgique (indexation des salaires et loyers), à l'**IPC** de l'**OFS** en Suisse et à l'**IPC** de **Statistique Canada**, en testant une marge de $\pm 1\text{ point}$ pour votre panier personnel.
* **Indexer salaires et versements programmés** : Une augmentation inférieure à l'IPC équivaut à une baisse de revenu réel. Revalorisez chaque année vos versements d'épargne au moins au rythme de l'inflation pour tenir vos objectifs longs.
