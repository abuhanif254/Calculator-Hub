---
title: "Comment Calculer les Paiements et les Intérêts Totaux d'un Prêt Auto"
description: "Méthode de calcul des mensualités et du coût total d'un crédit automobile : formule d'amortissement, impact du TAEG, de l'apport personnel et de la durée de remboursement."
category: "Finance"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "auto-loan-calculator"
faqs:
  - question: "Quelle différence y a-t-il entre le taux débiteur nominal et le TAEG d'un prêt auto ?"
    answer: "Le taux débiteur nominal sert uniquement à calculer la part d'intérêts pure dans votre échéance mensuelle. Le TAEG (Taux Annuel Effectif Global) est l'indicateur légal de comparaison : il intègre le taux nominal ainsi que l'ensemble des frais obligatoires liés à l'octroi du crédit (frais de dossier, coût des garanties ou assurance imposée par le prêteur)."
  - question: "Comment la durée du crédit influence-t-elle le coût total des intérêts ?"
    answer: "Allonger la durée (par exemple de 48 à 72 mois) réduit votre mensualité, mais augmente doublement le coût du crédit : vous payez des intérêts pendant 24 mois supplémentaires sur un capital qui s'amortit plus lentement, et les prêteurs appliquent souvent un taux plus élevé sur les durées longues. Sur 22 000 € à 5,4 %, passer de 48 à 72 mois coûte environ 1 294 € d'intérêts en plus."
  - question: "Quel apport personnel faut-il prévoir pour éviter une situation de valeur négative ?"
    answer: "Un véhicule neuf perd généralement 20 % à 25 % de sa valeur dès la première année. Pour éviter que le capital restant dû ne dépasse la valeur vénale de la voiture (situation d'équité négative en cas de sinistre total ou de revente anticipée), il est recommandé de verser un apport d'au moins 20 % du prix d'achat et de limiter la durée du prêt à 48 ou 60 mois maximum."
  - question: "L'assurance emprunteur est-elle obligatoire pour un crédit automobile ?"
    answer: "Sur le plan légal, l'assurance emprunteur n'est pas obligatoire pour un crédit à la consommation affecté à l'achat d'un véhicule, contrairement à certaines garanties exigées en prêt immobilier. Certains établissements la rendent néanmoins contractuelle pour accorder un taux préférentiel, auquel cas son coût doit figurer dans le TAEG."
  - question: "Peut-on rembourser un prêt auto par anticipation sans pénalités ?"
    answer: "En France et dans l'Union européenne, le Code de la consommation permet de rembourser un crédit à la consommation par anticipation à tout moment. Aucune indemnité n'est due si le montant remboursé sur 12 mois est inférieur ou égal à 10 000 €. Au-delà de 10 000 €, l'indemnité est légalement plafonnée à 1 % du capital remboursé (0,5 % s'il reste moins d'un an avant la fin du contrat)."
---

Un prêt automobile est un crédit amortissable à mensualités constantes : chaque échéance couvre simultanément les intérêts dus sur le capital restant et une fraction croissante de remboursement du capital. Maîtriser ce calcul vous permet de chiffrer le coût global du financement bien au-delà de la simple mensualité affichée en concession.

Votre mensualité dépend de trois paramètres directs : le capital net emprunté (prix TTC majoré des frais d'immatriculation et diminué de l'apport et de la reprise), le taux périodique et la durée totale. Négocier uniquement sur la mensualité en étirant le prêt sur 72 ou 84 mois alourdit considérablement la facture finale d'intérêts.

## Formule d'amortissement et paramètres du crédit automobile

La mensualité constante hors assurance facultative (`M`) et le coût total des intérêts obéissent aux équations suivantes :

```text
M = P × [r × (1 + r)^n] / [(1 + r)^n − 1]
Coût total des intérêts = (M × n) − P
```

Définissez précisément chaque variable avant de simuler votre financement :

- **`P` (Capital net financé)** : `Prix TTC du véhicule + Frais de carte grise et de mise à la route − Apport personnel − Valeur nette de reprise`. Tout solde d'un ancien prêt transféré s'ajoute à `P`.
- **`r` (Taux mensuel)** : taux débiteur nominal annuel divisé par 12 (`Taux nominal / 12`). Distinguez ce taux du `TAEG` (Taux Annuel Effectif Global), qui inclut frais de dossier et assurances imposées pour comparer objectivement deux banques.
- **`n` (Durée en mois)** : couramment `24`, `36`, `48`, `60`, `72` ou `84` mois.

Chaque mois, la part d'intérêts vaut `Capital restant dû × r`, et le reliquat de `M` amortit le capital.

## Exemple chiffré : financement d'un véhicule de 28 000 €

Supposons l'achat d'une voiture à `28 000 € TTC` avec `600 €` de carte grise et frais de mise à la route, un apport de `4 600 €` et une reprise de `2 000 €`. Le financement est souscrit sur `48 mois` au taux nominal de `5,40 %` l'an sans frais de dossier.

1. **Capital emprunté (`P`)** : `28 000 € + 600 € − 4 600 € − 2 000 € = 22 000 €`.
2. **Taux mensuel (`r`)** : `0,054 / 12 = 0,0045` (`0,45 %` par mois).
3. **Facteur composé `(1 + r)^n`** : `(1,0045)^48 = 1,240499`.
4. **Mensualité (`M`)** : `22 000 × (0,0045 × 1,240499) / (1,240499 − 1) = 122,8094 / 0,240499 = 510,64 €` par mois.
5. **Coût total du crédit** : `(510,64 € × 48) − 22 000 € = 24 510,74 € − 22 000 € = 2 510,74 €` d'intérêts totaux (avant arrondi au centime).

### Effet d'un versement anticipé mensuel de +50 €

En ajoutant `50 €` par mois directement affectés au capital (`560,64 €/mois`), le prêt est soldé en **`44 mois`** au lieu de `48`. Les intérêts cumulés chutent à `2 261,07 €`, soit **`249,67 €` économisés** et quatre mensualités supprimées.

## Tableau comparatif selon la durée et le taux d'intérêt

Pour un capital financé de **`22 000 €`**, ce tableau compare l'impact du taux nominal et de la durée sur l'échéance mensuelle et le coût total des intérêts :

| Taux nominal | Durée | Mensualité | Total remboursé | Intérêts totaux | Écart vs 48 mois (5,4 %) |
|---:|---:|---:|---:|---:|---:|
| 3,9 % | 36 mois | 648,55 € | 23 347,78 € | 1 347,78 € | −1 162,96 € |
| 5,4 % | 36 mois | 663,32 € | 23 879,45 € | 1 879,45 € | −631,29 € |
| 5,4 % | 48 mois | 510,64 € | 24 510,74 € | 2 510,74 € | Référence |
| 5,4 % | 60 mois | 419,21 € | 25 152,65 € | 3 152,65 € | +641,91 € |
| 5,4 % | 72 mois | 358,40 € | 25 805,15 € | 3 805,15 € | +1 294,41 € |
| 7,5 % | 72 mois | 380,38 € | 27 387,54 € | 5 387,54 € | +2 876,80 € |

À taux constant (`5,4 %`), doubler la durée de `36` à `72` mois réduit la mensualité de `304,92 €`, mais double quasiment les intérêts (`3 805,15 €` contre `1 879,45 €`). Avec un taux dégradé à `7,5 %` sur 72 mois, le surcoût dépasse `5 387 €`, soit près d'un quart du capital emprunté.

## Risques financiers, erreurs courantes et précautions réglementaires

### Le risque d'équité négative lié à la décote

Un véhicule neuf perd `20 % à 25 %` de sa valeur dès la première année, puis `10 % à 15 %` par an ensuite. Avec un faible apport sur `72` ou `84` mois, l'amortissement initial est trop lent : votre **capital restant dû dépasse la valeur vénale** pendant deux à trois ans. En cas de vol ou de sinistre total, l'indemnité d'assurance standard ne couvre pas le solde du crédit sans garantie perte financière.

### Quatre réflexes pour sécuriser votre financement

1. **Séparer l'achat du crédit** : négociez d'abord le prix net du véhicule, puis mettez en concurrence votre banque et l'offre du concessionnaire sur la base du `TAEG`.
2. **Comparer crédit et LOA / LLD** : la Location avec Option d'Achat affiche des loyers réduits grâce à l'option d'achat finale, mais coûte souvent plus cher qu'un crédit classique si vous conservez la voiture plus de quatre ans.
3. **Traquer les frais annexes facultatifs** : gravage des vitres, extension de garantie ou assurance facultative gonflent la mensualité ; vérifiez leur caractère non obligatoire.
4. **Exercer vos droits de rétractation** : en France et dans l'UE, vous disposez d'un **délai légal de rétractation de 14 jours calendaires**, et un crédit affecté est annulé de plein droit si la livraison du véhicule échoue.
