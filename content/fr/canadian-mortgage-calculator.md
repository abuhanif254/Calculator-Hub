---
title: "Calculatrice Hypothécaire Canadienne"
metaTitle: "Calculatrice Hypothécaire Canadienne : Taux Semestriel CAD"
description: "Estimez vos versements hypothécaires au Canada en appliquant la capitalisation semestrielle légale, la prime SCHL et vos taxes foncières en dollars canadiens."
metaDescription: "Calculez votre prêt hypothécaire au Canada avec capitalisation semestrielle légale, prime SCHL, fréquences accélérées et amortissement en dollars CAD."
metaKeywords: "calculatrice hypothécaire canadienne, calcul hypothèque canada, capitalisation semestrielle, loi sur l'intérêt canada, assurance prêt hypothécaire SCHL, versement accéléré aux deux semaines, amortissement hypothécaire CAD"
faqs:
  - question: "Pourquoi les prêts hypothécaires à taux fixe au Canada sont-ils composés semestriellement ?"
    answer: "L'article 6 de la Loi sur l'intérêt du Canada interdit de capitaliser les intérêts d'une hypothèque à taux fixe plus de deux fois par année (semestriellement, non d'avance). Pour un même taux nominal affiché, cette règle fédérale génère un taux annuel effectif et une mensualité légèrement inférieurs à ceux d'un prêt américain composé mensuellement."
  - question: "Quelle est la différence entre le terme hypothécaire et la période d'amortissement au Canada ?"
    answer: "La période d'amortissement désigne la durée totale nécessaire pour rembourser intégralement le capital, généralement 25 ans (ou 30 ans avec au moins 20 % de mise de fonds ou pour les acheteurs admissibles d'une première propriété). Le terme correspond à la durée de votre contrat actuel, souvent 3 à 5 ans, à l'issue duquel le solde restant doit être renouvelé au taux du marché."
  - question: "Quand l'assurance prêt hypothécaire SCHL est-elle obligatoire et comment est-elle taxée ?"
    answer: "Toute mise de fonds inférieure à 20 % du prix d'achat impose une assurance prêt hypothécaire (SCHL, Sagen ou Canada Guaranty), dont la prime varie de 2,80 % à 4,00 % du prêt et s'ajoute habituellement au capital financé. Au Québec, en Ontario, en Saskatchewan et au Manitoba, la taxe provinciale applicable à cette prime (notamment la TVQ de 9,975 % au Québec) ne peut pas être financée et doit être payée comptant chez le notaire."
  - question: "Quel est l'avantage réel d'un versement accéléré aux deux semaines par rapport au versement standard ?"
    answer: "En paiement standard aux deux semaines, la banque multiplie votre mensualité par 12 puis divise par 26, ce qui représente le même montant annuel. En mode accéléré aux deux semaines, elle divise directement votre mensualité par 2 et prélève ce montant 26 fois par an, soit l'équivalent de 13 mensualités par année : cette treizième mensualité amortit directement le capital et retranche souvent plus de trois ans à un prêt sur 25 ans."
  - question: "Comment fonctionnent le test de résistance du BSIF et la pénalité de différentiel de taux d'intérêt (DTI) ?"
    answer: "Pour qualifier un emprunteur, les banques fédérales appliquent le test de résistance du BSIF au plus élevé entre 5,25 % et votre taux contractuel majoré de 2 %. Par ailleurs, si vous résiliez un terme fixe avant son échéance, la pénalité correspond au plus élevé entre trois mois d'intérêts et le différentiel de taux d'intérêt (DTI), qui peut atteindre plusieurs milliers de dollars."
---

## Capitalisation Semestrielle : La Règle Légale de l'Hypothèque Canadienne

Contrairement aux prêts immobiliers américains ou européens calculés en taux mensuel proportionnel, le crédit hypothécaire canadien suit une règle fédérale spécifique. Selon l'article 6 de la **Loi sur l'intérêt du Canada**, les intérêts d'une hypothèque à taux fixe doivent être **composés semestriellement, non d'avance**, soit deux fois par année au maximum. Utiliser une calculatrice américaine pour un achat à Montréal, Québec, Ottawa, Toronto ou Vancouver surestime donc systématiquement le taux mensuel effectif et le coût global du prêt.

Le marché canadien distingue également la **période d'amortissement** (durée totale d'extinction de la dette, typiquement 25 ans, voire 30 ans selon la mise de fonds et l'admissibilité) du **terme hypothécaire** (durée d'engagement contractuel, souvent 5 ans), au bout duquel le solde doit être renouvelé aux taux du marché. À la différence des taux fixes, la plupart des prêts hypothécaires canadiens à **taux variable** appliquent une capitalisation mensuelle.

## Formules Officielles du Calcul Hypothécaire Canadien

Le calcul convertit d'abord le taux nominal annuel affiché ($T_{\text{nom}}$) en taux annuel effectif ($T_{\text{eff}}$), puis en taux périodique équivalent ($r_m$ en mensuel ou $r_p$ pour $p$ paiements par an) :

$$T_{\text{eff}} = \left(1 + \frac{T_{\text{nom}}}{2}\right)^2 - 1$$

$$r_m = \left(1 + \frac{T_{\text{nom}}}{2}\right)^{\frac{2}{12}} - 1 \qquad \text{et} \qquad r_p = \left(1 + \frac{T_{\text{nom}}}{2}\right)^{\frac{2}{p}} - 1$$

Le versement périodique constant (capital et intérêts) s'obtient ensuite par la formule actuarielle :

$$M = C \times \frac{r_p (1 + r_p)^N}{(1 + r_p)^N - 1}$$

### Définition des variables en dollars canadiens (CAD)

* **$C$** : capital net emprunté en dollars canadiens (CAD), égal au prix d'achat diminué de la mise de fonds, augmenté de la prime d'assurance hypothécaire (SCHL) si la mise de fonds reste sous $20\,\%$.
* **$T_{\text{nom}}$** : taux nominal annuel fixe contractuel (ex. $0{,}0525$ pour $5{,}25\,\%$).
* **$r_m$ et $r_p$** : taux effectif appliqué à chaque échéance mensuelle ($p = 12$), bimensuelle ($p = 24$) ou aux deux semaines ($p = 26$).
* **$N = p \times A$** : nombre total d'échéances sur $A$ années d'amortissement ($N = 300$ pour $25$ ans en paiements mensuels).
* **Charges mensuelles annexes** : la calculatrice additionne un douzième des taxes municipales et scolaires annuelles, un douzième de l'assurance habitation et les frais mensuels de copropriété.

## Exemple Chiffré Pas à Pas : Propriété de 600 000 $ CAD avec 20 % de Mise de Fonds

Prenons l'acquisition d'une maison affichée à **600 000 $ CAD** avec une mise de fonds de **120 000 $** (20 %, sans assurance SCHL), soit un emprunt de **480 000 $** amorti sur **25 ans** (300 mensualités) au taux fixe de **5,25 %**. Ajoutons **6 000 $** de taxes foncières annuelles (500,00 $ par mois) et **1 500 $** d'assurance habitation annuelle (125,00 $ par mois).

1. **Taux annuel effectif et taux mensuel canadien** :
   $$T_{\text{eff}} = (1{,}02625)^2 - 1 \approx 0{,}053189 \text{ (soit } 5{,}3189\,\%\text{)}$$
   $$r_m = (1{,}02625)^{\frac{1}{6}} - 1 \approx 0{,}00432790 \text{ (soit } 0{,}4328\,\%\text{ par mois)}$$
2. **Mensualité capital et intérêts** :
   Avec le facteur de capitalisation $(1 + 0{,}00432790)^{300} \approx 3{,}653074$, le versement mensuel vaut :
   $$M = 480\,000 \times \frac{0{,}00432790 \times 3{,}653074}{3{,}653074 - 1} = \mathbf{2\,860{,}41\text{ \$ CAD / mois}}$$
   En comparaison, une capitalisation mensuelle américaine (taux mensuel de 0,4375 %) donnerait **2 876,39 $**, soit **15,98 $ de trop par mois** et **4 794,76 $ d'intérêts** excédentaires sur 25 ans.
3. **Première échéance, solde à 5 ans et budget global** :
   Le premier mois comprend **2 077,39 $** d'intérêts et **783,01 $** de remboursement en capital. Après un terme de **5 ans** (60 versements), **53 513,40 $** de capital sont amortis et le solde à renouveler s'établit à **426 486,60 $**. Sur 25 ans à taux constant, les intérêts cumulés totalisent **378 121,95 $**. Taxes et assurance incluses, le budget mensuel global atteint **3 485,41 $ CAD**.

## Comparatif des Fréquences de Versement (480 000 $ à 5,25 % sur 25 Ans)

| Mode de Paiement | Fréquence | Versement Périodique | Durée Effective | Intérêts Totaux | Écart vs Mensuel Canadien |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Mensuel canadien (Référence)** | 12 / an | **2 860,41 $** | 25 ans | **378 122 $** | Référence (0 $) |
| **Bimensuel (Semi-mensuel)** | 24 / an | **1 428,66 $** | 25 ans | **377 195 $** | - 926 $ économisés |
| **Aux deux semaines standard** | 26 / an | **1 318,65 $** | 25 ans | **377 124 $** | - 998 $ économisés |
| **Aux deux semaines accéléré** | 26 / an | **1 430,20 $** | **21 ans 4 mois** | **314 678 $** | **- 63 444 $ et 3 ans 8 mois gagnés** |
| **Mensuel capitalisation mensuelle (É.-U.)** | 12 / an | **2 876,39 $** | 25 ans | **382 917 $** | + 4 795 $ de surcoût |

## Mise de Fonds, Assurance SCHL et Pièges Fréquents au Canada

* **Tranches canadiennes de mise de fonds minimale** : Elle s'établit à **5 %** jusqu'à **500 000 $**, puis à **10 %** entre **500 000 $ et 1 499 999 $** depuis le relèvement du plafond assurable à 1,5 million de dollars (**20 %** obligatoires dès 1 500 000 $). Sur **600 000 $**, le minimum légal est de **35 000 $** (5,83 %).
* **Prime SCHL et taxe provinciale comptant** : Sous 20 % de mise de fonds, la prime d'assurance hypothécaire vaut **4,00 %** (5 %–9,99 %), **3,10 %** (10 %–14,99 %) ou **2,80 %** (15 %–19,99 %). Avec 10 % sur **600 000 $** (prêt de **540 000 $**), la prime de 3,10 % ajoute **16 740 $** au capital (prêt de **556 740 $**, mensualité de **3 317,71 $**), tandis que la TVQ au Québec (9,975 %, soit **1 669,82 $**) se paie comptant chez le notaire.
* **Test de résistance du BSIF et pénalité DTI** : La qualification bancaire s'évalue au plus élevé entre 5,25 % et le taux contractuel majoré de 2 points (**7,25 %** ici). Avant de rompre un contrat fixe avant son échéance, comparez vos privilèges annuels de remboursement anticipé à la pénalité du **différentiel de taux d'intérêt (DTI)** exigée par votre prêteur.
