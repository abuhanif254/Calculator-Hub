---
title: "Calculateur de Prêt Personnel"
metaTitle: "Calculateur de Prêt Personnel | Estimez vos Mensualités"
description: "Simulez votre prêt personnel en ligne : calculez vos mensualités constantes, le coût total des intérêts, l'impact du TAEG et votre tableau d'amortissement."
metaDescription: "Simulez votre prêt personnel : calculez vos mensualités, le total des intérêts, le TAEG et le tableau d'amortissement complet pour maîtriser votre budget."
metaKeywords: "calculateur prêt personnel, simulation crédit consommation, calcul mensualité prêt, tableau amortissement, TAEG crédit personnel, coût total crédit, taux endettement"
faqs:
  - question: "Quelle est la différence entre le taux débiteur nominal et le TAEG d'un prêt personnel ?"
    answer: "Le taux débiteur nominal sert uniquement à calculer les intérêts sur le capital restant dû. Le TAEG (Taux Annuel Effectif Global), obligatoire sur toute offre de crédit en France et en Belgique, intègre à la fois les intérêts, les frais de dossier et les frais obligatoires liés à l'octroi du prêt selon une méthode actuarielle standardisée, ce qui en fait le seul indicateur fiable pour comparer deux banques."
  - question: "Quels sont les montants et durées habituels d'un prêt personnel non affecté ?"
    answer: "En France, le prêt personnel relève du crédit à la consommation encadré par le Code de la consommation pour un capital compris entre 200 € et 75 000 € et une durée supérieure à 3 mois, généralement étalée de 12 à 84 mois. Contrairement au crédit affecté (auto ou travaux), la somme est versée librement sur votre compte sans justificatif de facture."
  - question: "Des indemnités de remboursement anticipé (IRA) s'appliquent-elles sur un prêt personnel ?"
    answer: "En France, le remboursement anticipé d'un crédit à la consommation est totalement gratuit si le montant remboursé ne dépasse pas 10 000 € par période de 12 mois. Au-delà de ce seuil, l'indemnité légale maximale est plafonnée à 1 % du capital remboursé par anticipation si la durée restante dépasse un an, ou à 0,5 % si elle est inférieure ou égale à un an, sans jamais excéder les intérêts qui restaient à courir."
  - question: "L'assurance emprunteur est-elle obligatoire pour obtenir un prêt personnel ?"
    answer: "Non, l'assurance décès-invalidité est juridiquement facultative pour un prêt personnel, bien que certains établissements la proposent systématiquement. Si vous y souscrivez, vérifiez si la cotisation est calculée sur le capital initial (cotisation fixe jusqu'au terme) ou sur le capital restant dû (cotisation dégressive), et observez le TAEA affiché sur la fiche d'information précontractuelle."
  - question: "Comment un prêt personnel modifie-t-il ma capacité d'emprunt immobilier ?"
    answer: "Toute mensualité de crédit à la consommation s'ajoute directement à vos charges récurrentes dans le calcul du taux d'endettement, plafonné à 35 % des revenus nets (assurance comprise) selon la norme du HCSF en France. À titre d'ordre de grandeur, une mensualité de 350 € par mois réduit votre capacité d'emprunt immobilier d'environ 60 350 € sur 20 ans à un taux de 3,50 %."
---

Le **prêt personnel** est un crédit amortissable à taux fixe et à échéances constantes qui finance librement un projet — travaux, véhicule, équipement ou rachat de dettes coûteuses — sans justificatif de facture ni garantie hypothécaire. Avant de vous engager en France, en Belgique, en Suisse ou au Canada, une simulation précise vous permet d'évaluer votre effort mensuel et le coût réel du financement.

Ce calculateur détermine votre **mensualité fixe**, répartit chaque échéance entre **intérêts** et **capital amorti**, et mesure l'effet de la durée et du taux sur le coût total du crédit.

## Formule d'Amortissement et Calcul du TAEG

### 1. Mensualité constante hors assurance
Pour un capital emprunté $C$ (en €, CHF ou CAD), un taux débiteur annuel nominal $t_a$ et une durée de $n$ mois, le taux mensuel proportionnel vaut $t_m = \frac{t_a}{12}$. La mensualité constante $M$ s'obtient par :

$$M = C \times \frac{t_m (1 + t_m)^n}{(1 + t_m)^n - 1}$$

Pour un crédit promotionnel à taux zéro ($t_a = 0$), la mensualité se réduit simplement à $M = C / n$.

### 2. Tableau d'amortissement mois par mois
À chaque échéance $k$ (de $1$ à $n$), les intérêts portent uniquement sur le capital restant dû précédent ($CRD_{k-1}$, avec $CRD_0 = C$) :

$$I_k = CRD_{k-1} \times t_m, \qquad A_k = M - I_k, \qquad CRD_k = CRD_{k-1} - A_k$$

La part d'intérêts $I_k$ décroît chaque mois au profit du capital amorti $A_k$. Le coût total des intérêts hors frais annexes vaut $I_{\text{total}} = (M \times n) - C$.

### 3. Équivalence actuarielle du TAEG
Le **TAEG** (Taux Annuel Effectif Global) intègre les frais de dossier $F$ et les frais obligatoires via une actualisation actuarielle :

$$C - F = \sum_{k=1}^{n} \frac{M}{(1 + \text{TAEG})^{k/12}}$$

Même sans frais de dossier ($F = 0$), la capitalisation actuarielle mensuelle rend le TAEG légèrement supérieur au taux nominal : $\text{TAEG} = (1 + t_m)^{12} - 1$.

## Exemple Chiffré Pas à Pas : Emprunt de 18 000 € sur 48 Mois

Prenons un prêt personnel de **$C = 18\,000\text{ €}$** sur **$n = 48\text{ mois}$** ($4\text{ ans}$) au taux débiteur nominal fixe de **$t_a = 5{,}40\text{ \%}$**, avec **$180\text{ €}$ de frais de dossier** ($1\text{ \%}$) et sans assurance facultative.

1. **Taux mensuel et facteur de capitalisation** :
   $$t_m = \frac{0{,}054}{12} = 0{,}0045 \quad (0{,}45\text{ \%/mois}), \qquad (1{,}0045)^{48} = 1{,}240501$$
2. **Mensualité constante** :
   $$M = 18\,000 \times \frac{0{,}0045 \times 1{,}240501}{1{,}240501 - 1} = \mathbf{417{,}80\text{ €}}$$
   *(Valeur exacte avant arrondi : $417{,}7967\text{ €}$.)*
3. **Coût total du financement** : sur $48$ mois, le cumul remboursé atteint **$20\,054{,}24\text{ €}$**, dont **$2\,054{,}24\text{ €}$ d'intérêts**. En ajoutant $180\text{ €}$ de frais de dossier, le coût global s'élève à **$2\,234{,}24\text{ €}$**.
4. **Jalons du tableau d'amortissement** :
   - **Mois 1** : $I_1 = 81{,}00\text{ €}$, capital amorti $A_1 = 336{,}80\text{ €}$, $CRD_1 = 17\,663{,}20\text{ €}$.
   - **Mois 2** : $I_2 = 79{,}48\text{ €}$, capital amorti $A_2 = 338{,}31\text{ €}$, $CRD_2 = 17\,324{,}89\text{ €}$.
   - **Mois 24** : $I_{24} = 44{,}36\text{ €}$, capital amorti $A_{24} = 373{,}44\text{ €}$, $CRD_{24} = 9\,484{,}44\text{ €}$.
   - **Mois 48** : $I_{48} = 1{,}87\text{ €}$, capital soldé $A_{48} = 415{,}93\text{ €}$, $CRD_{48} = 0{,}00\text{ €}$.
5. **TAEG effectif** : sans frais, le taux nominal de $5{,}40\text{ \%}$ correspond à un TAEG de **$5{,}54\text{ \%}$** ; avec $180\text{ €}$ de frais retenus au départ ($17\,820\text{ €}$ nets débloqués), le TAEG grimpe à **$6{,}08\text{ \%}$**.

## Tableau Comparatif : Durée et Taux pour un Prêt de 18 000 €

| Durée ($n$) | Mensualité (5,40 %) | Intérêts totaux (5,40 %) | Coût relatif (5,40 %) | Mensualité (7,20 %) | Intérêts totaux (7,20 %) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **24 mois** | 792,91 € | 1 029,92 € | 5,72 % | 807,54 € | 1 380,95 € |
| **36 mois** | 542,71 € | 1 537,73 € | 8,54 % | 557,44 € | 2 067,67 € |
| **48 mois** | 417,80 € | 2 054,24 € | 11,41 % | 432,70 € | 2 769,82 € |
| **60 mois** | 342,99 € | 2 579,44 € | 14,33 % | 358,12 € | 3 487,35 € |
| **72 mois** | 293,24 € | 3 113,31 € | 17,30 % | 308,61 € | 4 220,19 € |
| **84 mois** | 257,81 € | 3 655,81 € | 20,31 % | 273,43 € | 4 968,24 € |

## Conseils Pratiques et Pièges Courants

- **Comparer sur le TAEG et le coût total en euros** : doubler la durée de $36$ à $72\text{ mois}$ allège la mensualité de $249{,}47\text{ €}$, mais fait plus que doubler les intérêts (de $1\,537{,}73\text{ €}$ à $3\,113{,}31\text{ €}$ à $5{,}40\text{ \%}$). Choisissez la durée la plus courte compatible avec votre reste à vivre.
- **Contrôler les plafonds légaux et frais cachés** : en France, le TAEG ne peut dépasser le taux d'usure fixé par la Banque de France (en Suisse, le plafond de la LCC s'applique). Méfiez-vous des taux d'appel accompagnés de frais de dossier ou d'une assurance calculée sur le capital initial.
- **Préserver sa capacité d'emprunt immobilier** : une mensualité de $417{,}80\text{ €}$ ampute d'environ **$72\,039\text{ €}$** votre enveloppe d'emprunt immobilier sur $20\text{ ans}$ à $3{,}50\text{ \%}$.
- **Rembourser par anticipation tôt dans le contrat** : les intérêts étant concentrés sur la première moitié du prêt, un remboursement partiel ou total est bien plus rentable durant les deux premières années (et gratuit jusqu'à $10\,000\text{ €}$ par an en France).
- **Connaître son droit de rétractation** : en France, en Belgique et en Suisse, vous disposez de **$14\text{ jours}$ calendaires** après signature pour renoncer sans frais.
