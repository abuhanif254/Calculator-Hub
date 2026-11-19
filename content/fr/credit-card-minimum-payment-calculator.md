---
title: "Calculatrice de Paiement Minimum par Carte de Crédit"
metaTitle: "Calculatrice Paiement Minimum Carte de Crédit et Intérêts"
description: "Calculez la durée réelle et le coût total en intérêts du paiement minimum de votre carte de crédit ou crédit renouvelable, et simulez un désendettement accéléré."
metaDescription: "Découvrez combien d'années et d'intérêts coûte le paiement minimum d'une carte de crédit (TAEG 19-22 %) et combien économiser avec une mensualité fixe."
metaKeywords: "calculatrice paiement minimum carte de crédit, coût crédit renouvelable, intérêts carte de crédit, rembourser solde carte bancaire, tableau amortissement carte"
faqs:
  - question: "Pourquoi le paiement minimum d'une carte de crédit met-il parfois plus de 15 ou 20 ans à rembourser une dette modeste ?"
    answer: "Le paiement minimum n'est pas une mensualité fixe, mais un faible pourcentage (souvent 2 % à 3 %) recalculé chaque mois sur le solde décroissant. Avec un taux d'intérêt annuel de 19,99 % (soit 1,67 % d'intérêt par mois), un paiement minimum de 2,5 % n'affecte que 0,83 % au remboursement du capital. À mesure que le solde baisse, la mensualité exigée diminue elle aussi, étirant la queue d'amortissement sur deux décennies."
  - question: "Qu'advient-il du délai de grâce sans intérêt de 21 jours lorsque je ne paie que le minimum ?"
    answer: "Dès que vous ne réglez pas l'intégralité (100 %) du solde de votre relevé mensuel avant la date d'échéance, vous perdez immédiatement le bénéfice du délai de grâce sans intérêt, non seulement sur le solde reporté, mais aussi sur tous vos nouveaux achats. Chaque nouvel achat effectué avec cette carte commence alors à produire des intérêts quotidiens dès le jour même de la transaction."
  - question: "Pourquoi le paiement minimum des cartes de crédit est-il passé à 5 % au Québec ?"
    answer: "Afin de lutter contre le surendettement chronique lié aux paiements minimums de 2 % ou 3 %, la Loi sur la protection du consommateur du Québec a imposé une hausse graduelle du versement minimum jusqu'au seuil de 5 % du solde pour tous les comptes de cartes de crédit. Cette règle réduit de plus de moitié la durée totale de remboursement et les frais d'intérêts cumulés."
  - question: "Comment la loi encadre-t-elle le remboursement minimum des crédits renouvelables en France et en Belgique ?"
    answer: "En France, la loi Lagarde interdit les crédits renouvelables perpétuels : chaque échéance doit obligatoirement comprendre un amortissement minimal du capital permettant de solder la dette en un maximum de 36 mois (pour un crédit inférieur ou égal à 3 000 €) ou de 60 mois (au-delà de 3 000 €). En Belgique, la loi impose en outre une remise à zéro (zéroisation) périodique complète du solde."
  - question: "Comment sont calculés les intérêts sur les avances de fonds ou retraits d'espèces par carte de crédit ?"
    answer: "Contrairement aux achats courants, les avances d'espèces aux distributeurs et les virements depuis une carte de crédit ne bénéficient d'aucun délai de grâce, même si vous payez votre relevé en totalité à la fin du mois. Les intérêts courent dès la seconde du retrait, souvent à un taux annuel majoré (22 % à 24,99 %) assorti de frais fixes par opération."
---

Se contenter d'acquitter le **paiement minimum** inscrit sur le relevé mensuel d'une carte de crédit ou d'un crédit renouvelable est l'un des pièges financiers les plus coûteux pour un ménage. Conçu par les établissements émetteurs pour maintenir le compte en règle sans défaut de paiement, ce versement minimal est calibré de telle sorte qu'il couvre à peine les intérêts mensuels facturés (dont le TAEG oscille entre **19 % et 22,99 %**) et n'amortit qu'une fraction infime du capital emprunté.

## La mécanique mathématique du piège du paiement minimum

Pour comprendre pourquoi une dette de quelques milliers d'euros ou de dollars s'éternise sur quinze à vingt-cinq ans, il faut examiner les trois équations appliquées chaque mois par l'algorithme bancaire.

### 1. Calcul des intérêts mensuels sur le solde

À partir du taux annuel ($i_{\text{annuel}}$), la banque applique un taux périodique mensuel $r_m = \frac{i_{\text{annuel}}}{12}$ (ou un taux journalier $\frac{i_{\text{annuel}}}{365}$ multiplié par le nombre de jours du cycle) au solde restant dû du mois précédent ($S_{t-1}$) :

$$I_t = S_{t-1} \times \frac{i_{\text{annuel}}}{12}$$

### 2. Formule du paiement minimum exigé ($M_{\text{min}, t}$)

Selon la juridiction et l'émetteur de la carte, l'échéance minimale correspond au plus élevé entre un pourcentage du solde ($p$, compris entre 2 % et 5 %) et un plancher forfaitaire ($M_{\text{plancher}}$, généralement 10 $ à 25 $/€) :

$$M_{\text{min}, t} = \max\left(S_{t-1} \times p,\; M_{\text{plancher}}\right)$$

Certaines banques appliquent la variante du « 1 % de capital plus intérêts du mois » : $M_{\text{min}, t} = \max(0{,}01 \times S_{t-1} + I_t,\; M_{\text{plancher}})$. Le capital réellement remboursé durant le mois $t$ se limite à $C_t = M_{\text{min}, t} - I_t$, et le nouveau solde devient $S_t = S_{t-1} - C_t$.

### 3. Équation du désendettement par mensualité fixe constante

À l'inverse, si vous remplacez le paiement minimum décroissant par un **virement mensuel fixe** ($M$, supérieur aux intérêts du premier mois $I_1$), le nombre exact de mois ($N$) nécessaires pour ramener votre dette à zéro se calcule par la formule logarithmique d'amortissement :

$$N = \frac{-\ln\left(1 - \frac{S_0 \cdot r_m}{M}\right)}{\ln(1 + r_m)}$$

## Étude de cas chiffrée : un solde de 5 000 $ / € à un taux de 19,99 %

Prenons un titulaire de carte de crédit affichant un solde débiteur de **5 000 $** (ou €) au taux annuel standard de **19,99 %**, qui cesse tout nouvel achat sur sa carte. Le taux d'intérêt mensuel est de $r_m = \frac{0{,}1999}{12} \approx 0{,}0166583$ (**1,6658 % par mois**).

### Scénario A : Le piège du paiement minimum à 2,5 % du solde (plancher de 15 $)

1. **Premier mois** :
   - Paiement minimum réclamé : $5\,000 \times 0{,}025 = \mathbf{125{,}00\text{ \$}}$
   - Intérêts facturés par la banque : $5\,000 \times 0{,}0166583 = \mathbf{83{,}29\text{ \$}}$
   - Capital réellement remboursé : $125{,}00 - 83{,}29 = \mathbf{41{,}71\text{ \$}}$ (66,6 % de votre paiement s'évapore en intérêts).
   - Nouveau solde au début du mois 2 : $5\,000 - 41{,}71 = \mathbf{4\,958{,}29\text{ \$}}$.
2. **Effet de ralentissement sur la durée totale** :
   Au mois 2, le paiement minimum baisse à $123{,}96\text{ \$}$ et continue de diminuer chaque mois jusqu'au plancher de 15 $. À ce rythme, il faut **243 mois (20 ans et 3 mois)** pour solder les 5 000 $, pour un total de **7 826 $ d'intérêts** (**12 826 $** déboursés au total).

### Scénario B : La puissance d'une mensualité fixe de 200 $ / mois

Si cet emprunteur verse un montant fixe de **200 $ chaque mois** sans jamais réduire son effort à mesure que le solde diminue :

$$\frac{S_0 \cdot r_m}{M} = \frac{83{,}2917}{200} = 0{,}416458 \implies 1 - 0{,}416458 = 0{,}583542$$

$$N = \frac{-\ln(0{,}583542)}{\ln(1 + 0{,}0166583)} = \frac{0{,}538639}{0{,}016521} \approx \mathbf{32{,}6\text{ mois (2 ans et 9 mois)}}$$

Le coût total en intérêts chute à **1 521 $** (contre 7 826 $). Maintenir un versement fixe de 200 $ par mois fait économiser **6 305 $ d'intérêts** et supprime **17 ans et 6 mois** d'endettement.

## Tableau comparatif d'amortissement (Solde de 5 000 $ / € à 19,99 %)

| Stratégie mensuelle | 1er versement | Durée totale | Intérêts payés | Total remboursé | Gain face au minimum 2 % |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Minimum 2 %** (plancher 15 $) | 100 $ | 369 mois (30,8 ans) | 14 294 $ | 19 294 $ | *Référence (pire cas)* |
| **Minimum 2,5 %** (plancher 15 $) | 125 $ | 243 mois (20,3 ans) | 7 826 $ | 12 826 $ | + 6 468 $ et 10,5 ans gagnés |
| **Minimum 5 %** (norme Québec) | 250 $ | 94 mois (7,8 ans) | 2 184 $ | 7 184 $ | + 12 110 $ et 22,9 ans gagnés |
| **Mensualité fixe 150 $ / €** | 150 $ | 49 mois (4,1 ans) | 2 315 $ | 7 315 $ | + 11 979 $ et 26,7 ans gagnés |
| **Mensualité fixe 250 $ / €** | 250 $ | 25 mois (2,1 ans) | 1 131 $ | 6 131 $ | + 13 163 $ et 28,7 ans gagnés |

## Plan d'action concret pour sortir d'une dette de carte de crédit

- **Verrouiller un virement automatique fixe** : Ne laissez jamais la banque prélever uniquement le montant minimum variable. Programmez un virement permanent fixe au moins égal à votre premier paiement minimum majoré de 50 $ ou 100 $ : chaque mois, la part d'intérêt baisse et l'amortissement du capital accélère.
- **Isoler la carte endettée de vos achats quotidiens** : Tant qu'un solde débiteur subsiste sur une carte, la période de grâce de 21 jours est suspendue. Utilisez une carte de débit immédiat pour vos dépenses courantes afin d'éviter que votre épicerie ne subisse 20 % d'intérêt dès le jour de l'achat.
- **Arbitrer vers un prêt personnel ou un transfert de solde** : Remplacer un solde de carte à 19,99 % par un prêt personnel amortissable à 7 % ou 8 % (ou un transfert de solde promotionnel de 0 % à 2 % sur 12 mois) divise par trois la charge d'intérêts et fixe une échéance finale ferme.
