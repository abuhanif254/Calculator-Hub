---
title: "Calculateur de Remboursement de Prêt Hypothécaire"
metaTitle: "Calculateur de Remboursement Anticipé Crédit Immobilier"
description: "Simulez le remboursement anticipé de votre crédit immobilier : calculez la réduction de durée, les économies d'intérêts et l'impact de versements supplémentaires."
metaDescription: "Simulez le remboursement anticipé ou la hausse de mensualité de votre prêt immobilier : calculez la durée gagnée, les intérêts économisés et les IRA."
metaKeywords: "calculateur remboursement prêt hypothécaire, remboursement anticipé crédit immobilier, modulation échéance prêt, indemnités remboursement anticipé IRA, capital restant dû"
faqs:
  - question: "Lors d'un remboursement anticipé partiel, vaut-il mieux réduire la durée ou réduire la mensualité ?"
    answer: "Sur le plan strictement financier, réduire la durée résiduelle en conservant la même mensualité est beaucoup plus rentable. En raccourcissant le prêt de plusieurs années, vous stoppez l'accumulation des intérêts composés et vous supprimez autant de mois de cotisations d'assurance emprunteur. Réduire la mensualité ne se justifie que si vous souhaitez alléger immédiatement votre taux d'endettement pour dégager du reste à vivre ou réemprunter."
  - question: "Comment sont plafonnées les Indemnités de Remboursement Anticipé (IRA) ?"
    answer: "En France (article R313-25 du Code de la consommation), l'indemnité ne peut jamais dépasser le plus faible des deux plafonds suivants : 6 mois d'intérêts sur le capital remboursé par anticipation au taux moyen du prêt, ou 3 % du capital restant dû avant le remboursement. En Belgique, l'indemnité de remploi sur un crédit hypothécaire aux particuliers est légalement limitée à 3 mois d'intérêts sur le montant remboursé."
  - question: "Dans quelles situations est-on légalement exonéré de pénalités de remboursement anticipé ?"
    answer: "En droit français (article L313-48 du Code de la consommation), aucune indemnité d'IRA n'est due pour les contrats conclus depuis le 1er juillet 1999 lorsque le remboursement anticipé est motivé par la vente du logement faisant suite à un changement du lieu d'activité professionnelle de l'emprunteur ou de son conjoint, par le décès ou par la cessation forcée de l'activité professionnelle (licenciement) de ces derniers."
  - question: "Pourquoi la modulation d'échéance à la hausse est-elle souvent préférable à un remboursement partiel ?"
    answer: "La plupart des contrats de prêt immobilier à taux fixe comportent une clause de modulation d'échéance permettant d'augmenter sa mensualité de 10 % à 30 % une fois par an après la première ou la deuxième année. Contrairement au remboursement anticipé par apport de capital, l'augmentation de la mensualité via cette clause contractuelle réduit automatiquement la durée du prêt sans déclencher aucune indemnité de remboursement anticipé (0 € d'IRA)."
  - question: "La banque peut-elle refuser un remboursement anticipé partiel de faible montant ?"
    answer: "En France, le prêteur a le droit d'interdire dans le contrat les remboursements anticipés partiels inférieurs ou égaux à 10 % du montant initial du prêt, sauf s'il s'agit de solder définitivement le reliquat du crédit (article L313-47 du Code de la consommation). Au Canada, les prêts hypothécaires fermés prévoient généralement un privilège annuel de remboursement anticipé sans pénalité compris entre 10 % et 20 % du capital initial."
---

Accélérer l'extinction d'un crédit immobilier ou d'un prêt hypothécaire constitue l'un des placements sans risque les plus efficaces lorsqu'on détient un emprunt souscrit à un taux supérieur à $3\text{ \%}$. Dans un tableau d'amortissement classique à échéances constantes, les intérêts mensuels sont calculés sur le **capital restant dû** ($\text{CRD}$). Par conséquent, chaque euro ou dollar versé en supplément de l'échéance normale vient amputer directement le capital principal : ce montant ne produira plus jamais d'intérêts jusqu'à la fin du contrat et supprime également les dernières mensualités d'assurance emprunteur lorsque la durée du prêt est raccourcie.

## Mécanique actuarielle : comment un versement supplémentaire réduit la durée résiduelle

À chaque échéance mensuelle $k$, la mensualité constante hors assurance ($M$) se décompose entre la part d'intérêts ($I_k$) et la part de capital amorti ($C_k$) selon le taux mensuel $i = \frac{r_{\text{annuel}}}{12}$ :

$$I_k = \text{CRD}_{k-1} \times i \quad \text{et} \quad C_k = M - I_k$$

Lorsque l'emprunteur décide, à un instant où le capital restant dû est $\text{CRD}$, d'injecter un remboursement anticipé partiel unique ($V_{\text{unique}}$) et/ou d'augmenter sa mensualité récurrente d'un montant $\Delta M$, le nouveau solde de dette devient $\text{CRD} - V_{\text{unique}}$ et la nouvelle échéance s'élève à $M + \Delta M$.

Le nouveau nombre de mois restants ($n_{\text{nouveau}}$) nécessaire pour éteindre totalement la dette s'obtient en inversant la formule d'annuité par le logarithme népérien :

$$n_{\text{nouveau}} = \frac{\ln\left( \frac{M + \Delta M}{(M + \Delta M) - (\text{CRD} - V_{\text{unique}}) \times i} \right)}{\ln(1 + i)}$$

L'économie nette générée ($\text{Gain}_{\text{net}}$) cumule la réduction des intérêts et les mois d'assurance emprunteur économisés ($A_{\text{mensuelle}}$), diminués de l'éventuelle Indemnité de Remboursement Anticipé ($\text{IRA}$) :

$$\text{Gain}_{\text{net}} = (\text{Intérêts}_{\text{initiaux}} - \text{Intérêts}_{\text{nouveaux}}) + (n_{\text{ancien}} - n_{\text{nouveau}}) \times A_{\text{mensuelle}} - \text{IRA}$$

## Exemple chiffré : prêt de 250 000 € à 3,60 % sur 25 ans

Prenons un emprunteur ayant souscrit un prêt immobilier de **250 000 €** sur **25 ans** ($300\text{ mois}$) au taux nominal fixe de **3,60 %** (taux mensuel $i = 0,003$), assorti d'une assurance emprunteur de $0,30\text{ \%}$ sur le capital initial (**$62,50\text{ €/mois}$**).

- **Référence sans remboursement anticipé** :
  - Mensualité hors assurance : $M = 250\,000 \times \frac{0,003 \times (1,003)^{300}}{(1,003)^{300} - 1} = \mathbf{1\,265,01\text{ €}}$.
  - Total des intérêts sur 300 mois : **$129\,503,00\text{ €}$** (plus **$18\,750,00\text{ €}$** d'assurance = **$148\,253,00\text{ €}$** de coût total).

### Option 1 : Modulation de la mensualité de +150 €/mois (sans apport de capital)
Si l'emprunteur active sa clause de modulation pour ajouter **$150,00\text{ €/mois}$** à son échéance ($M_{\text{nouvelle}} = 1\,415,01\text{ €}$) :
1. **Nouvelle durée** : $n_{\text{nouveau}} = \frac{\ln(1\,415,01 / (1\,415,01 - 750))}{\ln(1,003)} \approx \mathbf{252,1\text{ mois}}$ (soit **21 ans**).
2. **Gain financier** : le crédit s'achève **48 mois (4 ans) plus tôt**. Les intérêts descendent à $106\,685\text{ €}$ (gain de **$22\,818\text{ €}$**) et les 48 mois d'assurance supprimés économisent **$3\,000\text{ €}$**, soit un gain net total de **$25\,818\text{ €}$** avec **$0\text{ €}$ d'IRA**.

### Option 2 : Versement unique de 25 000 € au bout de 5 ans (60e mois)
Au terme de la 5e année ($60\text{ mois}$), le capital restant dû s'élève à **$216\,619,12\text{ €}$**. L'emprunteur injecte **$25\,000\text{ €}$** en choisissant de **maintenir sa mensualité à $1\,265,01\text{ €}$ pour réduire la durée** :
1. **Nouveau solde et durée** : le capital restant dû tombe à $191\,619,12\text{ €}$ et la durée résiduelle chute de $240\text{ mois}$ à **$199,1\text{ mois}$** (**41 mois supprimés**).
2. **Pénalité légale (IRA)** : plafonnée à 6 mois d'intérêts sur le montant remboursé ($25\,000 \times 0,036 / 2 = \mathbf{450,00\text{ €}}$).
3. **Bilan net** : économie de $26\,611\text{ €}$ d'intérêts + 41 mois d'assurance ($2\,562,50\text{ €}$) - $450\text{ €}$ d'IRA = **$28\,723,50\text{ €}$ d'économie nette**.

## Comparatif des stratégies d'accélération (250 000 € à 3,60 % sur 25 ans)

| Stratégie de Remboursement | Mensualité (Hors Assurance) | Durée Totale | Mois Gagnés | Intérêts Totaux | Économie Nette (Intérêts + Assurance - IRA) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Calendrier initial** | $1\,265,01\text{ €}$ | $300\text{ mois}$ | $0\text{ mois}$ | $129\,503\text{ €}$ | **$0\text{ €}$ (Référence)** |
| **Modulation $+100\text{ €/mois}$** | $1\,365,01\text{ €}$ | $266\text{ mois}$ | $34\text{ mois}$ | $113\,332\text{ €}$ | **$+18\,296\text{ €}$** (0 € d'IRA) |
| **Modulation $+200\text{ €/mois}$** | $1\,465,01\text{ €}$ | $239\text{ mois}$ | $61\text{ mois}$ | $100\,736\text{ €}$ | **$+32\,580\text{ €}$** (0 € d'IRA) |
| **Apport $25\,000\text{ €}$ à 5 ans (Baisse mensualité)** | $1\,119,02\text{ €}$ | $300\text{ mois}$ | $0\text{ mois}$ | $120\,804\text{ €}$ | **$+8\,249\text{ €}$** (dont $450\text{ €}$ d'IRA) |
| **Apport $25\,000\text{ €}$ à 5 ans (Baisse durée)** | $1\,265,01\text{ €}$ | $259\text{ mois}$ | $41\text{ mois}$ | $102\,892\text{ €}$ | **$+28\,724\text{ €}$** (dont $450\text{ €}$ d'IRA) |

Choisir la **réduction de durée** plutôt que la **réduction de mensualité** lors de l'apport de $25\,000\text{ €}$ à 5 ans procure **$20\,475\text{ €}$ d'économies supplémentaires**.

## Arbitrage patrimonial : solder son prêt ou placer sa trésorerie ?

1. **Crédit à taux bas ($0,90\text{ \%}$ à $2,00\text{ \%}$)** : ne remboursez pas par anticipation. Un placement sans risque (fonds en euros, Livret A, compte à terme) offre un rendement net supérieur au coût du prêt tout en conservant la protection décès-invalidité de l'assurance emprunteur sur la totalité du capital.
2. **Crédit à taux supérieur à $3,50\text{ \%}$** : le remboursement anticipé agit comme un placement sans risque et totalement net d'impôt dont le rendement équivaut au taux nominal du prêt majoré de l'économie d'assurance.
3. **Agissez dans le premier tiers du prêt** : plus de $60\text{ \%}$ des intérêts d'un crédit sur 25 ans sont prélevés durant les 9 premières années.
