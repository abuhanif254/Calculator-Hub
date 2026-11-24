---
title: "Calculateur de Remboursement de Carte de Crédit"
metaTitle: "Calculateur de Remboursement de Carte de Crédit et TAEG"
description: "Planifiez le remboursement intégral de votre carte de crédit ou crédit renouvelable : calculez la durée exacte, la mensualité cible, le coût total des intérêts et votre tableau d'amortissement."
metaDescription: "Simulez le remboursement de votre carte de crédit : durée exacte, mensualité cible, coût total des intérêts TAEG et tableau d'amortissement mensuel."
metaKeywords: "calculateur remboursement carte de crédit, crédit renouvelable, calcul intérêts TAEG, tableau d'amortissement carte, se désendetter, mensualité remboursement, méthode avalanche, rachat de crédit"
faqs:
  - question: "Comment le taux annuel (TAEG) est-il converti en intérêts mensuels sur une carte de crédit ?"
    answer: "Pour établir le tableau d'amortissement, le taux annuel nominal est divisé par 12 afin d'obtenir le taux périodique mensuel r = TAEG / 12. Chaque mois, les intérêts sont calculés sur le capital restant dû au début de la période ; le reste de votre versement vient amortir le capital."
  - question: "Pourquoi le paiement minimal prolonge-t-il autant le remboursement d'une dette ?"
    answer: "Le paiement minimal exigé par les émetteurs (souvent 2 % à 3 % du solde en France, en Belgique ou au Québec) couvre principalement les intérêts mensuels et n'entame qu'une fraction minime du capital. À un TAEG proche de 20 %, la durée dépasse fréquemment 8 à 10 ans et les intérêts cumulés peuvent excéder la dette initiale."
  - question: "Que se passe-t-il si ma mensualité est inférieure ou égale aux intérêts du premier mois ?"
    answer: "Lorsque votre versement M est inférieur ou égal au seuil C₀ × r, le capital ne diminue jamais : on parle d'amortissement négatif. La dette stagne ou gonfle de mois en mois et la formule de durée ne converge plus. Il faut impérativement relever la mensualité au-dessus de ce plancher d'intérêts."
  - question: "Faut-il privilégier la méthode avalanche ou boule de neige pour solder plusieurs cartes ?"
    answer: "La méthode avalanche consiste à verser le minimum sur chaque carte et à consacrer tout excédent budgétaire à celle affichant le TAEG le plus élevé : c'est la stratégie qui minimise le coût total des intérêts. La méthode boule de neige cible d'abord le plus petit solde afin d'obtenir un succès psychologique rapide."
  - question: "Quand un prêt personnel amortissable devient-il plus avantageux qu'une carte de crédit ?"
    answer: "Dès que votre solde dépasse quelques milliers d'euros et ne peut être apuré en trois ou quatre mois, un prêt personnel amortissable (souvent proposé entre 6 % et 10 % de TAEG) ou un regroupement de crédits réduit fortement la charge d'intérêts par rapport à un crédit renouvelable ou une carte facturée à 18 % ou 22 %."
---

Laisser un solde impayé sur une carte de crédit ou un crédit renouvelable figure parmi les financements les plus onéreux pour un ménage. En France et en Belgique, le taux annuel effectif global (**TAEG**) d'un crédit renouvelable atteint couramment **18 % à 22 %** ; au Québec, les cartes standards affichent souvent **19,99 % à 22,99 %**, tandis que le plafond légal suisse s'établit à **14 %**. Avec une mensualité trop faible, les intérêts absorbent presque tout le versement et la dette s'étire sur des années.

Notre **calculateur de remboursement de carte de crédit** fonctionne selon deux modes : déterminer la **durée exacte** pour une mensualité fixe, ou calculer la **mensualité constante** nécessaire pour solder la dette à une échéance donnée. Il génère un **tableau d'amortissement** mensuel détaillant capital amorti, intérêts cumulés et solde restant (`€`, `C$`, etc.).

## Formules d'amortissement d'un solde de carte de crédit

### Durée de remboursement à mensualité fixe

Avec un taux périodique mensuel $r = \text{TAEG} / 12$, le nombre de mois $n$ requis pour solder un capital initial $C_0$ au moyen d'une mensualité constante $M$ est donné par :

$$n = \left\lceil -\frac{\ln\!\left(1 - \frac{r \cdot C_0}{M}\right)}{\ln(1 + r)} \right\rceil \qquad \text{pour } M > C_0 \cdot r$$

* **$C_0$** : solde initial dû sur la carte (en euros ou dans votre devise).
* **$r$** : taux mensuel décimal (par exemple $r = 0{,}198 / 12 = 0{,}0165$ pour un TAEG de 19,8 %).
* **$M$** : mensualité fixe versée chaque mois. Si $M \le C_0 \cdot r$, les intérêts ne sont pas couverts et la dette ne s'amortit jamais.
* **$n$** : nombre entier de mois arrondi à l'entier supérieur (la dernière échéance règle le solde résiduel). Pour un taux nul ($r = 0$), on a simplement $n = \lceil C_0 / M \rceil$.

### Mensualité pour une durée cible et total des intérêts

Pour solder intégralement la carte en exactement $n$ mois, la mensualité constante vaut :

$$M = C_0 \cdot \frac{r(1 + r)^n}{(1 + r)^n - 1}$$

Chaque mois $k$, les intérêts portent sur le solde précédent : $I_k = C_{k-1} \cdot r$, le capital remboursé vaut $P_k = M - I_k$ et le solde devient $C_k = C_{k-1} - P_k$. Le coût total du crédit correspond à $I_{\text{total}} = \sum_{k=1}^{n} I_k = \text{Total payé} - C_0$.

## Exemple chiffré pas à pas : 4 500 € à 19,8 % de TAEG

Considérons un solde de **$C_0 = 4\,500\text{ €}$** à **19,8 % de TAEG**, soit $r = 0{,}0165$ (**1,65 % par mois**). Les intérêts du premier mois atteignent déjà $4\,500 \times 0{,}0165 = \mathbf{74{,}25\text{ €}}$.

### Scénario A : mensualité fixe de 150 € par mois

1. **Seuil d'amortissement** : $150\text{ €} > 74{,}25\text{ €}$, le capital diminue dès le premier versement.
2. **Détail des deux premières échéances** :
   * **Mois 1** : intérêts **74,25 €**, capital amorti **75,75 €**, nouveau solde **4 424,25 €**.
   * **Mois 2** : intérêts $4\,424{,}25 \times 0{,}0165 = \mathbf{73{,}00\text{ €}}$, capital **77,00 €**, nouveau solde **4 347,25 €**.
3. **Durée et coût global** :
   $$n = -\frac{\ln(1 - 74{,}25 / 150)}{\ln(1{,}0165)} = -\frac{\ln(0{,}505)}{\ln(1{,}0165)} \approx 41{,}75 \implies \mathbf{42\text{ mois}}$$
   Le remboursement prend **3 ans et 6 mois** (41 mensualités de 150 € puis une dernière de **112,21 €**), pour **1 762,21 €** d'intérêts et **6 262,21 €** versés au total.

### Scénario B : objectif de remboursement en 24 mois

Avec $n = 24$ mois et $(1{,}0165)^{24} \approx 1{,}48120$, la mensualité requise atteint :

$$M = 4\,500 \times \frac{0{,}0165 \times 1{,}48120}{1{,}48120 - 1} = \mathbf{228{,}59\text{ €/mois}}$$

Les intérêts tombent à **986,20 €** (total versé : **5 486,20 €**). Ajouter **78,59 €/mois** par rapport au scénario A fait gagner **18 mois** et économiser **776,01 €**.

## Tableau comparatif selon la mensualité (4 500 € à 19,8 %)

| Mensualité fixe | Capital amorti (mois 1) | Durée totale | Intérêts cumulés | Total payé | Économie face à 90 € |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **90 €** | 15,75 € | 8 ans 11 mois (107 mois) | 5 085,51 € | 9 585,51 € | — |
| **120 €** | 45,75 € | 4 ans 11 mois (59 mois) | 2 570,86 € | 7 070,86 € | 2 514,65 € |
| **150 €** | 75,75 € | 3 ans 6 mois (42 mois) | 1 762,21 € | 6 262,21 € | 3 323,30 € |
| **220 €** | 145,75 € | 2 ans 2 mois (26 mois) | 1 035,20 € | 5 535,20 € | 4 050,31 € |
| **300 €** | 225,75 € | 1 an 6 mois (18 mois) | 713,19 € | 5 213,19 € | 4 372,32 € |

À **90 €/mois**, les intérêts finaux (**5 085,51 €**) dépassent le capital emprunté. Verser **30 € de plus par mois** (120 €) divise par deux les intérêts et retranche **4 ans**.

## Pièges courants et leviers de désendettement

* **Confondre paiement minimal et mensualité fixe** : Un minimum calculé en pourcentage du solde décroît chaque mois, allongeant la dette sur des années. Programmez toujours un virement fixe en euros nettement supérieur au minimum contractuel.
* **Continuer les achats sur la carte débitrice** : Lorsqu'un solde est reporté, la plupart des banques suppriment la **période de grâce sans intérêt** sur les nouvelles dépenses, qui produisent des intérêts dès le jour d'achat. Utilisez une carte à débit immédiat jusqu'au solde nul.
* **Négliger avances de fonds et assurance facultative** : Les retraits d'espèces à crédit déclenchent des frais immédiats (2 % à 4 %) et des intérêts sans délai de grâce. De même, une assurance emprunteur mensuelle (0,4 % à 0,6 % du solde) alourdit fortement le coût effectif.
* **Appliquer la méthode avalanche ou refinancer** : Avec plusieurs cartes, affectez chaque excédent au **TAEG le plus élevé** (méthode avalanche), ou remplacez une dette à 20 % par un prêt personnel amortissable à taux fixe inférieur afin de verrouiller votre date de fin.
