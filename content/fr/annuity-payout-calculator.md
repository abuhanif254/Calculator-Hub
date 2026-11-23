---
title: "Calculateur de Versement de Rente : Maximisez votre Revenu de Retraite"
metaTitle: "Calculateur de Versement de Rente | Revenu de Retraite"
description: "Estimez votre revenu périodique de retraite ou la durée de vie de votre capital à partir d'une somme forfaitaire, d'un taux de rendement et d'une fréquence de retrait."
metaDescription: "Calculez votre versement périodique de rente ou la durée d'épuisement de votre capital de retraite selon le taux de rendement et la fréquence choisie."
metaKeywords: "calculateur de versement de rente, rente certaine, rente viagère, revenu de retraite, décaissement capital retraite, PER rente, FERR canada, taux de conversion LPP"
faqs:
  - question: "Quelle différence distingue une rente certaine d'une rente viagère ?"
    answer: "Une rente certaine (ou à durée fixe) verse un revenu calculé sur un nombre d'années précis jusqu'à épuisement du capital ; en cas de décès prématuré, le solde revient aux héritiers. Une rente viagère garantit un versement jusqu'au décès du bénéficiaire, ce qui protège contre le risque de longévité mais implique l'aliénation du capital auprès de l'assureur, sauf option de réversion ou d'annuités garanties."
  - question: "À partir de quel montant le capital ne s'épuise-t-il jamais ?"
    answer: "Lorsque votre retrait périodique est inférieur ou égal aux intérêts générés sur la période (produit du capital initial par le taux périodique), vous entrez en régime de rente perpétuelle. Par exemple, un capital de 200 000 € placé à 4,00 % génère 666,67 € d'intérêts mensuels : tout retrait inférieur ou égal à ce seuil préserve indéfiniment le capital nominal."
  - question: "Comment la fiscalité francophone traite-t-elle les versements de rente ?"
    answer: "En France, une rente viagère à titre onéreux (issue d'une assurance-vie ou d'un PEA) n'est imposée à l'impôt sur le revenu et aux prélèvements sociaux que sur une fraction décroissante avec l'âge lors du premier versement (40 % entre 60 et 69 ans, 30 % dès 70 ans), tandis qu'une rente issue d'un PER ayant ouvert droit à déduction est imposée comme une pension après abattement de 10 %. En Suisse (2e pilier LPP) et au Canada (FERR), les rentes versées s'ajoutent généralement au revenu imposable annuel."
  - question: "Pourquoi le solde restant génère-t-il encore beaucoup d'intérêts pendant le décaissement ?"
    answer: "Contrairement à une simple division du capital par le nombre de mois, une rente financière laisse la fraction non encore retirée fructifier au taux de rendement attendu. Sur vingt ans à 4,50 %, les intérêts accumulés pendant la phase de distribution représentent plus de la moitié du capital de départ, ce qui augmente sensiblement la mensualité soutenable."
  - question: "Comment intégrer l'inflation dans une simulation de rente fixe ?"
    answer: "Une rente nominale constante perd progressivement de son pouvoir d'achat : avec 2,5 % d'inflation annuelle, 1 500 € perçus dans vingt ans n'équivaudront plus qu'à environ 915 € d'aujourd'hui. Pour estimer un revenu en euros constants, saisissez dans le calculateur le taux de rendement réel (taux nominal diminué du taux d'inflation anticipé) plutôt que le taux nominal brut."
---

Préparer sa retraite ne se limite pas à capitaliser une épargne : l'étape clé consiste à orchestrer le **décaissement progressif** d'une somme forfaitaire en revenu régulier et prévisible. Que le capital provienne d'un **Plan d'Épargne Retraite (PER)** ou d'une assurance-vie en France, d'une épargne-pension en Belgique, d'un avoir du **2e pilier LPP** en Suisse ou d'un **Fonds enregistré de revenu de retraite (FERR)** au Canada, la logique financière reste identique.

Ce calculateur répond aux deux problématiques symétriques : en mode **Durée fixe**, il calcule le **versement périodique maximal** jusqu'à l'échéance visée ; en mode **Montant fixe**, il estime la **durée de vie exacte** du capital selon le retrait souhaité (mensuel, trimestriel ou annuel).

## Formules du Décaissement : Versement Constant et Durée d'Épuisement

Le calcul modélise une **rente certaine à terme échu** : chaque retrait entame graduellement le capital tandis que le solde résiduel continue de produire des intérêts composés.

**Mode 1 — Versement périodique constant ($V$) à durée fixée** :

$$V = C_0 \times \frac{r}{1 - (1 + r)^{-n}} \qquad \text{avec} \qquad r = \frac{t}{m} \quad \text{et} \quad n = D \times m$$

* **$C_0$** : capital initial disponible (`€`, `CHF` ou `$ CAD`).
* **$t$** et **$r$** : taux de rendement annuel net (décimal) et taux périodique correspondant.
* **$m$** : fréquence annuelle ($12$ mensuelle, $4$ trimestrielle, $1$ annuelle).
* **$D$** et **$n$** : horizon en années et nombre total de versements (si $r = 0$, $V = C_0 / n$).

Le cumul encaissé vaut $V \times n$ et les intérêts produits durant la distribution égalent $(V \times n) - C_0$.

**Mode 2 — Nombre de périodes ($n$) avant épuisement à retrait fixé** :

* Si **$V \le C_0 \times r$**, les intérêts seuls couvrent le retrait : la **rente est perpétuelle** et le capital ne s'épuise jamais.
* Si **$V > C_0 \times r$**, l'inversion logarithmique donne le nombre exact d'échéances :

$$n = -\frac{\ln\!\left(1 - \frac{C_0 \cdot r}{V}\right)}{\ln(1 + r)}$$

## Exemples Chiffrés Pas à Pas : Europe et Canada

### Cas n° 1 : Calculer une mensualité sur 20 ans (mode Durée fixe)

Un retraité européen mobilise **$250\,000\text{ €}$** placés à **$4{,}50\,\%$** annuel pour percevoir une rente mensuelle ($m = 12$) durant **$20\text{ ans}$** ($n = 240$).

1. **Taux mensuel** : $r = 0{,}045 / 12 = 0{,}00375$ ($0{,}375\,\%$).
2. **Facteur d'amortissement** : $1 - (1{,}00375)^{-240} = 1 - 0{,}40724 = 0{,}59276$.
3. **Mensualité soutenable** :
   $$V = 250\,000 \times \frac{0{,}00375}{0{,}59276} = \mathbf{1\,581{,}62\text{ € / mois}}$$
4. **Total perçu** : **$379\,589{,}63\text{ €}$** sur 20 ans, dont **$129\,589{,}63\text{ €}$ d'intérêts** cumulés pendant le décaissement.

### Cas n° 2 : Estimer la longévité d'un FERR (mode Montant fixe)

Un épargnant canadien dispose de **$200\,000\text{ CAD}$** rapportant **$5{,}00\,\%$** ($r = 0{,}41667\,\%$ par mois) et prélève **$1\,200\text{ CAD}$** mensuellement.

* **Seuil perpétuel** : $200\,000 \times 0{,}0041667 = \mathbf{833{,}33\text{ CAD}}$. Ce seuil étant dépassé, le capital s'amortit progressivement.
* **Durée exacte** : $n = -\ln(1 - 833{,}33 / 1\,200) / \ln(1{,}0041667) = \mathbf{285{,}14\text{ mois}}$, soit **23 ans et 9 mois**, pour **$342\,170{,}50\text{ CAD}$** encaissés dont **$142\,170{,}50\text{ CAD}$** d'intérêts.

## Barème de Référence : Rente Mensuelle pour un Capital de 200 000 €

| Durée de versement | Rendement 2,0 % / an | Rendement 4,0 % / an | Rendement 6,0 % / an | Intérêts totaux à 4,0 % |
| :--- | :--- | :--- | :--- | :--- |
| **10 ans (120 mois)** | 1 840,27 € / mois | 2 024,90 € / mois | 2 220,41 € / mois | 42 988 € |
| **15 ans (180 mois)** | 1 287,02 € / mois | 1 479,38 € / mois | 1 687,71 € / mois | 66 288 € |
| **20 ans (240 mois)** | 1 011,77 € / mois | 1 211,96 € / mois | 1 432,86 € / mois | 90 871 € |
| **25 ans (300 mois)** | 847,71 € / mois | 1 055,67 € / mois | 1 288,60 € / mois | 116 702 € |
| **30 ans (360 mois)** | 739,24 € / mois | 954,83 € / mois | 1 199,10 € / mois | 143 739 € |
| **Rente perpétuelle** | 333,33 € / mois | 666,67 € / mois | 1 000,00 € / mois | Capital préservé |

Plus l'horizon s'allonge, plus le rendement pèse : sur 30 ans, passer de $2\,\%$ à $6\,\%$ hausse la mensualité de **$+62\,\%$** ($739\text{ €}$ à $1\,199\text{ €}$), contre $+21\,\%$ sur 10 ans.

## Repères Pratiques et Pièges Fréquents du Décaissement

* **Corriger le rendement de l'inflation et des frais** : À $2{,}5\,\%$ d'inflation annuelle, une mensualité fixe perd **$39\,\%$ de son pouvoir d'achat** en vingt ans. Saisissez un taux réel net de frais de gestion pour raisonner à pouvoir d'achat constant.
* **Protéger le portefeuille contre le risque de séquence** : Une chute des marchés durant les cinq premières années de retraits raccourcit durablement la longévité du capital ; isolez deux à trois années de dépenses sur un fonds sécurisé.
* **Arbitrer entre rente certaine et rente viagère** : La rente certaine laisse le risque de longévité à l'épargnant, tandis que la rente viagère (ou la conversion du 2e pilier suisse au taux LPP) transfère ce risque à l'assureur moyennant aliénation du capital ; les options de **réversion** ou d'**annuités garanties** protègent le conjoint et les héritiers.
* **Intégrer les règles fiscales locales** : Au Canada, le FERR impose un retrait minimal croissant dès 72 ans ; en France, comparez la rente viagère aux rachats partiels programmés sur une assurance-vie de plus de huit ans bénéficiant de l'abattement fiscal annuel.
