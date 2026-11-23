---
title: "Calculateur TAEG (Taux Annuel Effectif Global)"
metaTitle: "Calculateur TAEG : Taux Annuel Effectif Global en Ligne"
description: "Calculez le TAEG réel de votre prêt immobilier ou crédit à la consommation en intégrant le taux nominal, les frais de dossier, les garanties et le courtage."
metaDescription: "Calculez le TAEG réel de votre prêt immobilier ou crédit conso. Intégrez frais de dossier, courtage et garanties pour comparer vos offres bancaires."
metaKeywords: "calculateur taeg, taux annuel effectif global, taux effectif suisse, taux annuel en pourcentage canada, coût total crédit, taeg prêt immobilier, taux d'usure, comparer offres de prêt"
faqs:
  - question: "Pourquoi le TAEG est-il toujours supérieur au taux nominal débiteur ?"
    answer: "Le taux nominal débiteur ne rémunère que le capital emprunté. Le TAEG agrège l'ensemble des coûts rendus obligatoires par l'établissement prêteur pour accorder le financement : intérêts nominaux, frais de dossier bancaires, honoraires de courtage, frais de garantie (caution mutuelle ou hypothèque), frais d'évaluation du bien et cotisations d'assurance emprunteur exigées. L'amortissement de ces frais sur la durée du prêt relève mécaniquement le taux global."
  - question: "Quels frais doivent être intégrés ou exclus du calcul du TAEG ?"
    answer: "En France (article R.314-4 du Code de la consommation) et en Belgique (Code de droit économique), le TAEG inclut les frais de dossier, les commissions de courtage, les frais de constitution de sûreté réelle ou de cautionnement ainsi que l'assurance emprunteur lorsqu'elle conditionne l'octroi du crédit. En revanche, les frais de notaire liés à l'acte d'acquisition immobilière, les droits d'enregistrement et les pénalités éventuelles de remboursement anticipé en sont exclus."
  - question: "Quelle différence existe entre méthode proportionnelle et TAEG actuariel européen ?"
    answer: "La méthode proportionnelle multiplie simplement le taux mensuel effectif par douze, convention proche du taux annuel en pourcentage nord-américain. En Europe (France, Belgique) et en Suisse (taux d'intérêt effectif selon la LCC), la loi impose la méthode actuarielle qui compose le taux mensuel sur douze mois selon la formule (1 + i)^12 - 1. Pour un même prêt, le TAEG actuariel dépasse toujours légèrement le taux proportionnel."
  - question: "Un TAEG plus bas garantit-il systématiquement le crédit le moins cher ?"
    answer: "Uniquement si vous conservez le prêt jusqu'à son terme contractuel. En cas de revente immobilière ou de renégociation au bout de trois à cinq ans, des frais initiaux élevés n'ont pas le temps d'être amortis par un taux nominal légèrement inférieur. Dans ce cas, une offre affichant un taux débiteur un peu plus élevé mais sans frais de dossier ni pénalités peut coûter nettement moins cher en euros décaissés."
  - question: "Quel est le rôle du taux d'usure en France et du plafond légal en Suisse ?"
    answer: "En France, le TAEG d'une offre bancaire ne peut jamais dépasser le taux d'usure publié périodiquement par la Banque de France pour chaque catégorie et durée de crédit, sous peine de refus légal du dossier. En Suisse, la Loi fédérale sur le crédit à la consommation (LCC) fixe un taux d'intérêt maximal annuel révisé par le Conseil fédéral. Au Canada, les prêteurs doivent communiquer le taux annuel du coût d'emprunt pour protéger le consommateur."
---

Pour comparer objectivement deux propositions de prêt immobilier, de crédit automobile ou de prêt personnel, le seul **taux nominal débiteur** reste trompeur : une banque peut afficher un taux facial bas tout en facturant des frais de dossier, de courtage ou de garantie élevés. Les réglementations francophones imposent donc un indicateur harmonisé : le **Taux Annuel Effectif Global (TAEG)** en France et en Belgique, le **taux d'intérêt effectif** en Suisse et le **taux annuel en pourcentage** au Canada.

Ce calculateur combine capital emprunté, taux nominal, durée et frais initiaux obligatoires pour révéler le **taux effectif réel**, la **mensualité constante**, le **capital net perçu** et le **coût total du crédit**.

## Équations du TAEG : Mensualité, Actualisation et Norme Actuarielle

Le calcul repose sur l'équivalence des flux actualisés : les frais payés au déblocage réduisent la somme nette reçue par l'emprunteur, alors que les échéances demeurent calculées sur le capital brut.

**1. Mensualité constante hors assurance ($M$)** :

$$M = C \times \frac{r(1 + r)^n}{(1 + r)^n - 1}$$

* **$C$** : capital nominal emprunté (`€`, `CHF` ou `$ CAD`).
* **$r = t_{\text{nom}} / 12$** : taux mensuel proportionnel issu du taux nominal annuel $t_{\text{nom}}$.
* **$n$** : nombre total de mensualités (années $\times 12$).

**2. Taux mensuel effectif ($i$)** :

Avec des frais initiaux obligatoires $F$, le montant net décaissé vaut $C_{\text{net}} = C - F$. Le taux périodique effectif $i$ vérifie :

$$C - F = \sum_{k=1}^{n} \frac{M}{(1 + i)^k} = M \times \frac{1 - (1 + i)^{-n}}{i}$$

Lorsqu'une assurance emprunteur obligatoire $A$ est prélevée chaque mois, elle s'ajoute à $M$ dans le numérateur. Cette équation n'ayant pas de résolution algébrique directe pour $n > 4$, le calculateur trouve $i$ par itération de Newton-Raphson.

**3. Annualisation selon la zone géographique** :

$$\text{Taux proportionnel} = 12 \times i \qquad \text{et} \qquad \text{TAEG}_{\text{actuariel}} = (1 + i)^{12} - 1$$

L'outil affiche le taux proportionnel ($12 \times i$, usage courant en Amérique du Nord), tandis que la directive européenne 2014/17/UE (France, Belgique) et la LCC suisse retiennent la formule actuarielle composée $(1 + i)^{12} - 1$.

## Exemples Chiffrés Pas à Pas : Immobilier et Consommation

### Cas n° 1 : Prêt immobilier de 200 000 € sur 20 ans

Un ménage emprunte **$200\,000\text{ €}$** sur **$20\text{ ans}$** ($n = 240$) à **$3{,}60\,\%$** nominal ($r = 0{,}30\,\%$ par mois), avec **$4\,500\text{ €}$** de frais initiaux ($1\,200\text{ €}$ de dossier, $2\,300\text{ €}$ de caution bancaire et $1\,000\text{ €}$ de courtage).

1. **Mensualité constante** : $M = 200\,000 \times \frac{0{,}003 \times (1{,}003)^{240}}{(1{,}003)^{240} - 1} = \mathbf{1\,170{,}22\text{ €}}$.
2. **Capital net perçu** : $C_{\text{net}} = 200\,000 - 4\,500 = \mathbf{195\,500\text{ €}}$.
3. **Taux mensuel effectif** : La résolution de $195\,500 = 1\,170{,}22 \times \frac{1 - (1+i)^{-240}}{i}$ donne **$i = 0{,}32159\,\%$**.
4. **Taux annuels et coût global** : Le taux proportionnel atteint **$3{,}86\,\%$** ($+0{,}26$ point) et le **TAEG actuariel** ressort à **$(1{,}0032159)^{12} - 1 = 3{,}93\,\%$**. Les intérêts cumulés s'élèvent à $80\,853{,}50\text{ €}$, soit **$85\,353{,}50\text{ €}$** de coût total avec les frais.

### Cas n° 2 : Crédit personnel de 15 000 € sur 4 ans

Pour **$15\,000\text{ €}$** empruntés à **$5{,}40\,\%$** sur **$48\text{ mois}$** avec **$600\text{ €}$** de frais de dossier ($4\,\%$) :

* **Mensualité** : **$348{,}16\text{ €}$** pour **$14\,400\text{ €}$** nets perçus.
* **Taux effectif** : $i = 0{,}62485\,\%$ mensuel, soit **$7{,}50\,\%$** proportionnel ($+2{,}10$ points) et **$7{,}76\,\%$** en TAEG actuariel, pour un coût total de **$2\,311{,}87\text{ €}$** ($1\,711{,}87\text{ €}$ d'intérêts plus $600\text{ €}$ de frais).

## Impact de la Durée sur le TAEG à Frais Initiaux Identiques

Simulation pour **$100\,000\text{ €}$** à **$4{,}00\,\%$** nominal ($4{,}07\,\%$ actuariel sans frais) grevés de **$3\,000\text{ €}$** de frais initiaux :

| Durée | Mensualités | Mensualité | Taux proportionnel ($12i$) | TAEG actuariel | Coût total |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **3 ans** | 36 | 2 952,40 € | 6,03 % | 6,20 % | 9 286,35 € |
| **5 ans** | 60 | 1 841,65 € | 5,25 % | 5,38 % | 13 499,13 € |
| **10 ans** | 120 | 1 012,45 € | 4,65 % | 4,75 % | 24 494,17 € |
| **15 ans** | 180 | 739,69 € | 4,45 % | 4,54 % | 36 143,83 € |
| **20 ans** | 240 | 605,98 € | 4,35 % | 4,44 % | 48 435,28 € |
| **25 ans** | 300 | 527,84 € | 4,29 % | 4,38 % | 61 351,05 € |

Des frais fixes pèsent d'autant plus sur le TAEG que la durée est brève ($+2{,}13$ points sur 3 ans contre $+0{,}30$ point sur 25 ans), alors qu'allonger le prêt réduit le TAEG mais multiplie par six la facture en euros.

## Repères Pratiques et Pièges Courants de Comparaison

* **Anticiper le paradoxe du remboursement anticipé** : Le TAEG suppose le maintien du prêt jusqu'à son terme. En cas de revente après 3 ans sur $200\,000\text{ €}$ (20 ans), une offre à $3{,}40\,\%$ avec $5\,000\text{ €}$ de frais coûte **$24\,325\text{ €}$** cumulés contre **$20\,485\text{ €}$** à $3{,}60\,\%$ sans frais.
* **Distinguer TAEG et TAEA** : En France, la loi Lemoine permet de substituer l'assurance emprunteur à tout moment ; comparez séparément le TAEG hors assurance et le **Taux Annuel Effectif d'Assurance (TAEA)**.
* **Respecter la convention canadienne** : Les hypothèques canadiennes à taux fixe se capitalisent semestriellement par la loi, abaissant légèrement le taux mensuel équivalent sous $t_{\text{nom}} / 12$.
* **Comparer à durée strictement égale** : Ne jugez jamais deux TAEG sur des maturités différentes, car un amortissement plus long dilue artificiellement les frais tout en alourdissant le coût total.
