---
title: "Calculateur de Consolidation de Dettes : Économisez et Simplifiez votre Vie"
metaTitle: "Calculateur de Consolidation de Dettes et Rachat de Crédit"
description: "Comparez le coût total et les mensualités de vos emprunts actuels avec un prêt de consolidation unique, frais de dossier inclus, pour mesurer la rentabilité réelle d'un regroupement de dettes."
metaDescription: "Simulez le regroupement de vos dettes et crédits à taux élevé. Comparez mensualités, frais de dossier et économies d'intérêts avant de consolider."
metaKeywords: "calculateur de consolidation de dettes, rachat de crédit, regroupement de prêts, taux moyen pondéré, économie d'intérêts, amortissement prêt personnel, frais de dossier"
faqs:
  - question: "Une baisse de mensualité signifie-t-elle toujours que la consolidation de dettes est rentable ?"
    answer: "Non. Réduire la mensualité en allongeant fortement la durée de remboursement peut augmenter le coût total des intérêts, même lorsque le nouveau taux nominal est nettement inférieur au taux moyen pondéré de vos dettes actuelles. Une opération n'est financièrement avantageuse que si le coût total du prêt consolidé (intérêts et frais de dossier inclus) demeure inférieur au coût résiduel cumulé de vos emprunts séparés."
  - question: "Comment les frais de dossier et les indemnités de remboursement anticipé modifient-ils le calcul ?"
    answer: "Lorsque les frais de dossier ou de courtage sont financés à même le nouveau prêt, ils majorent le capital emprunté et génèrent eux-mêmes des intérêts pendant toute la durée du contrat. En France, pour un crédit à la consommation dont le capital remboursé par anticipation dépasse 10 000 € sur douze mois, l'indemnité de remboursement anticipé (IRA) est plafonnée à 1 % du montant remboursé (0,5 % s'il reste moins d'un an). Ajoutez ces frais au pourcentage de frais initiaux pour obtenir une comparaison fidèle."
  - question: "Quelle est la différence entre le taux nominal et le TAEG lors d'un rachat de crédit ?"
    answer: "Le taux nominal (ou taux débiteur) sert uniquement à calculer les intérêts sur le capital restant dû. Le Taux Annuel Effectif Global (TAEG), obligatoire en France et en Belgique, agrège le taux nominal, les frais de dossier, les commissions de courtage et l'assurance emprunteur exigée. Pour comparer objectivement deux offres de regroupement de crédits, confrontez toujours leur TAEG et leur coût total en euros ou en dollars canadiens."
  - question: "Que se passe-t-il si la mensualité d'une dette actuelle est inférieure aux intérêts mensuels ?"
    answer: "Si la mensualité versée sur une carte de crédit ou un crédit renouvelable ne couvre pas les intérêts générés chaque mois (M ≤ B × r), le capital ne s'amortit jamais et la dette croît indéfiniment (amortissement négatif). Dans une telle situation, la formule logarithmique de durée n'a pas de solution finie : augmenter immédiatement le versement mensuel ou consolider vers un prêt amortissable à taux fixe devient prioritaire."
  - question: "Un prêt de consolidation de dettes affecte-t-il le dossier ou la cote de crédit ?"
    answer: "Au Canada, la demande initiale entraîne une brève enquête de crédit, mais solder des cartes de crédit saturées abaisse le ratio d'utilisation du crédit renouvelable et améliore généralement la cote à moyen terme, à condition de ne pas réendetter les cartes libérées. En France (FICP), en Belgique (Centrale des crédits aux particuliers) et en Suisse (ZEK), un regroupement consenti hors incident de paiement n'entraîne aucun fichage négatif et peut ramener le taux d'endettement sous le seuil bancaire usuel de 35 %."
---

Cumuler plusieurs soldes de cartes de crédit, un crédit renouvelable et des prêts personnels complique le suivi budgétaire et alourdit la charge d'intérêts. La **consolidation de dettes** — appelée **rachat de crédit** ou **regroupement de prêts** en France et en Belgique — consiste à solder ces encours grâce à un emprunt unique à mensualité fixe. Avant de signer, il convient de vérifier si l'opération produit une réelle économie ou si elle se contente d'alléger la mensualité au prix d'un surcoût global.

Ce calculateur confronte l'amortissement résiduel de vos dettes actuelles à celui du prêt consolidé, en intégrant le taux nominal, la durée et les frais de dossier financés.

## Équations d'Amortissement et Rentabilité d'un Regroupement

Le modèle actuariel s'applique à toute devise (euros `€`, dollars canadiens `$ CA` ou francs suisses `CHF`).

### 1. Situation actuelle : taux pondéré et durée restante

Pour $k$ dettes de solde $B_i$, de taux annuel $t_i$ (taux mensuel $r_i = t_i / 12$) et de mensualité $M_i$, le capital total $C_{\text{total}}$ et le taux moyen pondéré $\bar{t}$ valent :

$$C_{\text{total}} = \sum_{i=1}^{k} B_i \qquad \text{et} \qquad \bar{t} = \frac{\sum_{i=1}^{k} B_i \cdot t_i}{C_{\text{total}}}$$

Pour chaque encours dont la mensualité dépasse les intérêts mensuels ($M_i > B_i \cdot r_i$), le nombre de mois restants $n_i$ s'obtient par :

$$n_i = -\frac{\ln\!\left(1 - \dfrac{B_i \cdot r_i}{M_i}\right)}{\ln(1 + r_i)}$$

Le coût résiduel cumulé atteint $K_{\text{actuel}} = \sum_{i=1}^{k} M_i \cdot n_i$, dont $I_{\text{actuel}} = K_{\text{actuel}} - C_{\text{total}}$ d'intérêts.

### 2. Prêt consolidé et seuil de viabilité

Avec des frais de dossier financés au taux décimal $f$, un nouveau taux annuel $t_{\text{nouv}}$ ($r_{\text{nouv}} = t_{\text{nouv}} / 12$) et une durée de $N$ mois, le capital financé vaut $C_{\text{nouv}} = C_{\text{total}} \cdot (1 + f)$ et la mensualité fixe s'établit à :

$$M_{\text{nouv}} = \frac{C_{\text{nouv}} \cdot r_{\text{nouv}}}{1 - (1 + r_{\text{nouv}})^{-N}}$$

Le coût total ressort à $K_{\text{nouv}} = M_{\text{nouv}} \cdot N$ (coût net de financement $I_{\text{nouv}} = K_{\text{nouv}} - C_{\text{total}}$, frais inclus). L'opération est rentable lorsque l'économie nette $\Delta K = K_{\text{actuel}} - K_{\text{nouv}}$ est positive.

## Exemple Chiffré Pas à Pas : Consolider 24 000 € de Crédits

Un ménage regroupe **trois encours** totalisant **$24\,000\text{ €}$** et **$750{,}00\text{ €}$** de mensualités :

1. **Crédit renouvelable** : $6\,000\text{ €}$ à $19{,}80\,\%$ ($r_1 = 0{,}0165$), $190\text{ €}$/mois $\Rightarrow$ $44{,}98\text{ mois}$, coût **$8\,546{,}79\text{ €}$** ($2\,546{,}79\text{ €}$ d'intérêts).
2. **Prêt personnel** : $11\,000\text{ €}$ à $11{,}40\,\%$ ($r_2 = 0{,}0095$), $320\text{ €}$/mois $\Rightarrow$ $41{,}81\text{ mois}$, coût **$13\,380{,}55\text{ €}$** ($2\,380{,}55\text{ €}$ d'intérêts).
3. **Crédit auto résiduel** : $7\,000\text{ €}$ à $8{,}40\,\%$ ($r_3 = 0{,}0070$), $240\text{ €}$/mois $\Rightarrow$ $32{,}74\text{ mois}$, coût **$7\,857{,}05\text{ €}$** ($857{,}05\text{ €}$ d'intérêts).

* **Bilan actuel** : Taux moyen pondéré de **$12{,}63\,\%$** ($12{,}625\,\%$), coût total de **$29\,784{,}39\text{ €}$**, soit **$5\,784{,}39\text{ €}$** d'intérêts.
* **Offre étudiée** : **$6{,}90\,\%$** ($r_{\text{nouv}} = 0{,}00575$) sur **$48\text{ mois}$**, avec **$1{,}5\,\%$** de frais financés ($360{,}00\text{ €}$).
  * Capital financé : $24\,000 \times 1{,}015 = \mathbf{24\,360{,}00\text{ €}}$.
  * Nouvelle mensualité : $\dfrac{24\,360 \times 0{,}00575}{1 - (1{,}00575)^{-48}} = \mathbf{582{,}20\text{ €}}$.
  * Coût total : $582{,}2011 \times 48 = \mathbf{27\,945{,}65\text{ €}}$ (soit $3\,945{,}65\text{ €}$ d'intérêts et frais).
* **Résultat** : Gain de trésorerie de **$167{,}80\text{ €}$/mois** et **économie globale nette de $1\,838{,}74\text{ €}$**.

## Comparatif des Scénarios sur 24 000 € de Dettes

Pour cet encours (coût actuel $29\,784{,}39\text{ €}$, mensualité $750{,}00\text{ €}$) avec $1{,}5\,\%$ de frais financés, la durée choisie inverse rapidement la rentabilité :

| Scénario (Taux / Durée) | Mensualité | Écart mensuel | Coût total | Bilan net |
| :--- | :--- | :--- | :--- | :--- |
| **6,90 % sur 36 mois** | 751,05 € | −1,05 € | 27 037,90 € | **+2 746,49 €** |
| **6,90 % sur 48 mois** | 582,20 € | +167,80 € | 27 945,65 € | **+1 838,74 €** |
| **6,90 % sur 60 mois** | 481,21 € | +268,79 € | 28 872,52 € | **+911,86 €** |
| **6,90 % sur 72 mois** | 414,15 € | +335,85 € | 29 818,44 € | **−34,06 €** |
| **6,90 % sur 84 mois** | 366,47 € | +383,53 € | 30 783,31 € | **−998,93 €** |
| **8,50 % sur 48 mois** | 600,43 € | +149,57 € | 28 820,77 € | **+963,62 €** |
| **8,50 % sur 72 mois** | 433,08 € | +316,92 € | 31 181,86 € | **−1 397,48 €** |

Dès $72\text{ mois}$, l'allongement efface l'avantage d'un taux pourtant divisé presque par deux.

## Conseils Pratiques et Pièges à Éviter

* **Écarter les prêts déjà peu coûteux** : Conservez séparément tout emprunt dont le taux reste inférieur à celui du regroupement (prêt auto promotionnel ou éco-prêt à taux zéro).
* **Comparer le TAEG complet et le cadre réglementaire** : En France (taux d'usure trimestriel de la Banque de France), en Belgique et en Suisse (Loi fédérale sur le crédit à la consommation), intégrez l'assurance emprunteur, les frais de courtage et les indemnités de remboursement anticipé éventuelles. Au Canada, distinguez un prêt de consolidation amortissable à taux fixe d'une marge de crédit à taux variable, exposée aux hausses de taux directeur.
* **Confronter la consolidation à la méthode avalanche** : Si votre capacité d'épargne mensuelle suffit, concentrer chaque euro ou dollar excédentaire sur la dette au taux le plus élevé (ici le crédit renouvelable à $19{,}80\,\%$) permet parfois d'économiser sans payer de frais de dossier.
* **Clôturer les réserves reconstituées** : Le piège majeur après consolidation consiste à réutiliser les cartes de crédit ou réserves renouvelables soldées, ce qui double l'endettement.
* **Limiter l'allongement de durée** : Passer de $60$ à $48\text{ mois}$ exige $101\text{ €}$/mois en plus mais économise $927\text{ €}$. Si vous devez allonger pour revenir sous le seuil d'endettement de $35\,\%$ (repère HCSF en France), prévoyez des remboursements anticipés partiels dès que votre budget le permet.
