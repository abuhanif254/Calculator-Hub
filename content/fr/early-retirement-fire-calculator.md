---
title: "Calculatrice FIRE (Indépendance Financière et Retraite Anticipée)"
metaTitle: "Calculatrice FIRE : Capital Retraite Anticipée et Règle 4%"
description: "Déterminez votre capital FIRE cible, votre taux d'épargne optimal et le nombre d'années nécessaires pour vivre de vos rentes grâce à la règle des 4 %."
metaDescription: "Calculez votre capital FIRE selon la règle des 4 %, simulez Lean et Coast FIRE et estimez le nombre d'années exact avant votre indépendance financière."
metaKeywords: "calculatrice FIRE, indépendance financière, retraite anticipée, règle des 4 pourcent, capital retraite, taux de retrait sûr, Coast FIRE, Lean FIRE"
faqs:
  - question: "La règle des 4 % issue de l'étude Trinity est-elle adaptée aux investisseurs en France, en Belgique, en Suisse ou au Canada ?"
    answer: "L'étude Trinity repose sur un portefeuille américain analysé sur 30 ans. Pour une retraite anticipée de 40 à 50 ans en Europe ou au Canada, où la fiscalité sur les plus-values (PFU de 30 % en France hors PEA, précompte mobilier, impôt sur les gains en capital) réduit le rendement net, les planificateurs financiers recommandent d'abaisser le taux de retrait sûr entre 3,25 % et 3,5 % (soit 28,5 à 30 fois vos dépenses annuelles)."
  - question: "Comment calculer mon numéro Coast FIRE si je souhaite cesser d'épargner et laisser mon capital croître jusqu'à 62 ans ?"
    answer: "Le numéro Coast FIRE correspond au capital qu'il faut détenir aujourd'hui pour que les seuls intérêts composés atteignent votre objectif FIRE à l'âge légal de la retraite, sans aucun versement supplémentaire. Il se calcule en divisant votre capital FIRE cible par (1 + r) puissance n, où r est le rendement annuel réel net d'inflation et n le nombre d'années avant la retraite."
  - question: "Faut-il intégrer sa résidence principale dans le patrimoine net de la calculatrice FIRE ?"
    answer: "Non, sauf si vous prévoyez de la vendre ou de la louer lors de votre départ. Votre résidence principale ne génère pas de flux financiers mobilisables pour payer vos dépenses courantes. En revanche, rembourser intégralement votre crédit immobilier avant votre retraite anticipée réduit vos dépenses annuelles, abaissant mécaniquement votre capital FIRE requis de 25 fois vos anciennes mensualités."
  - question: "Qu'est-ce que le risque de séquence des rendements et comment protéger son portefeuille FIRE ?"
    answer: "Le risque de séquence survient lorsqu'un krach boursier frappe votre portefeuille durant les 3 à 5 premières années de votre retraite anticipée. Vendre des actions au plus bas pour financer votre train de vie ampute durablement la capacité de rebond du capital. Pour s'en prémunir, constituez une réserve de sécurité (fonds euros, comptes à terme ou obligations court terme) couvrant 2 à 3 années de dépenses."
  - question: "Quel impact a un départ anticipé du salariat sur la couverture maladie et la taxe PUMA en France ?"
    answer: "En France, cesser toute activité avant l'âge légal interrompt l'acquisition de trimestres retraite et peut déclencher la Cotisation Subsidiaire Maladie (taxe PUMA) si vos revenus du capital dépassent 50 % du Plafond Annuel de la Sécurité Sociale alors que vos revenus d'activité sont inférieurs à 20 % de ce plafond. Conserver une activité à temps partiel (Barista FIRE) permet de valider ses trimestres et d'éviter cette cotisation."
---

Le mouvement **FIRE** (*Financial Independence, Retire Early* — Indépendance Financière, Retraite Anticipée) repose sur une équation patrimoniale précise : dès que les revenus passifs et les retraits programmés de votre portefeuille financier couvrent durablement votre train de vie, le travail salarié devient optionnel. Plutôt que d'attendre l'âge légal de la retraite (64 ans en France, 65 ans en Suisse et au Canada, 66 à 67 ans en Belgique), la démarche FIRE lie directement la durée de votre carrière à votre **taux d'épargne** et au rendement réel de vos placements.

## La mathématique du numéro FIRE et du taux de retrait sûr

Toute projection d'indépendance financière s'appuie sur deux formules complémentaires : la détermination du capital cible (le « numéro FIRE ») et l'équation logarithmique du temps requis pour l'atteindre.

### 1. Équation du capital FIRE cible

Le patrimoine net investi nécessaire pour financer vos dépenses sans épuiser votre capital dépend de vos dépenses annuelles nettes ($D_{\text{annuelles}}$) et du **taux de retrait sûr** ($\text{TRS}$, ou *Safe Withdrawal Rate*) :

$$\text{Capital FIRE} = \frac{D_{\text{annuelles}}}{\text{TRS}}$$

Avec la célèbre **règle des 4 %** ($\text{TRS} = 0{,}04$), diviser vos charges annuelles par $0{,}04$ revient exactement à les multiplier par 25 :

$$\text{Capital FIRE}_{4\,\%} = 25 \times D_{\text{annuelles}}$$

Pour une retraite précoce avant 45 ans sur un horizon de 45 à 50 ans, un taux de retrait prudent de **3,5 %** porte ce multiplicateur à $28{,}57 \times D_{\text{annuelles}}$.

### 2. Formule du nombre d'années avant la liberté financière

En partant d'un portefeuille déjà investi ($C_0$), augmenté d'une épargne annuelle constante ($E$) placée à un rendement annuel réel net d'inflation ($r = \frac{1 + r_{\text{nominal}}}{1 + i} - 1$), le nombre d'années ($N$) nécessaires pour atteindre votre objectif $\text{Capital FIRE}$ s'obtient par :

$$N = \frac{\ln\left(\frac{\text{Capital FIRE} \cdot r + E}{C_0 \cdot r + E}\right)}{\ln(1 + r)}$$

Raisonner en **rendement réel** (corrigé de l'inflation) exprime votre futur capital au pouvoir d'achat d'aujourd'hui, évitant toute illusion monétaire.

## Les cinq architectures du mouvement FIRE

Selon vos ambitions de niveau de vie et votre souhait de conserver ou non une activité complémentaire, cinq variantes structurent la planification patrimoniale :

| Variante FIRE | Budget mensuel | Dépenses annuelles | Capital à 4 % ($25\times$) | Capital à 3,5 % ($28{,}6\times$) | Philosophie et profil type |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Lean FIRE** | 1 800 € / $ | 21 600 € / $ | 540 000 € / $ | 617 140 € / $ | Minimalisme, logement payé, coût de vie modéré |
| **Standard FIRE** | 3 200 € / $ | 38 400 € / $ | 960 000 € / $ | 1 097 140 € / $ | Maintien intégral du confort de vie sans privation |
| **Fat FIRE** | 6 500 € / $ | 78 000 € / $ | 1 950 000 € / $ | 2 228 570 € / $ | Train de vie abondant et forte marge de sécurité |
| **Barista FIRE** | 3 200 € (dont 1 200 € actifs) | 24 000 € du portefeuille | 600 000 € / $ | 685 710 € / $ | Quitter un poste stressant pour un mi-temps passion |
| **Coast FIRE** | Variable à 62-65 ans | Acquis à 35 ans : 260 000 € | Atteint 960 000 € à 62 ans | Atteint 1 097 000 € à 65 ans | Les intérêts composés suffisent sans nouvel effort |

## Étude de cas chiffrée : trajectoire d'un ménage vers la retraite à 46 ans

Prenons Camille et Thomas, âgés de 30 ans, qui perçoivent un revenu net annuel après impôt de **65 000 €**. Leurs dépenses annuelles s'élèvent à **36 000 €** (3 000 €/mois) et ils détiennent déjà un portefeuille de **80 000 €** réparti en PEA et assurance-vie (ou CELI/REER au Canada).

1. **Épargne annuelle et taux d'épargne** :
   $$E = 65\,000\text{ €} - 36\,000\text{ €} = 29\,000\text{ €/an} \quad \left(\text{taux d'épargne de } \frac{29\,000}{65\,000} = 44{,}62\,\%\right)$$
2. **Capital FIRE requis à 4 %** :
   $$\text{Capital FIRE} = \frac{36\,000}{0{,}04} = 900\,000\text{ €}$$
3. **Hypothèse de rendement réel** :
   Portefeuille d'ETF actions mondiales offrant 7,5 % nominal par an pour une inflation de 2,38 %, soit un rendement réel net $r = 5{,}0\,\%$ ($0{,}05$).
4. **Application de la formule temporelle** :
   - Numérateur : $(900\,000 \times 0{,}05) + 29\,000 = 74\,000$
   - Dénominateur : $(80\,000 \times 0{,}05) + 29\,000 = 33\,000$
   - Quotient : $\frac{74\,000}{33\,000} \approx 2{,}242424$
   - Durée : $N = \frac{\ln(2{,}242424)}{\ln(1{,}05)} = \frac{0{,}807557}{0{,}048790} \approx \mathbf{16{,}55\text{ années}}$

Le couple atteindra l'indépendance financière dans **16 ans et 7 mois** (**46 ans et demi**). À titre de repère, en partant de zéro ($C_0 = 0$) à 5 % réel, un taux d'épargne de **20 %** exige **36,7 ans**, **35 %** demande **24,7 ans**, **50 %** ramène la durée à **16,6 ans** et **65 %** la réduit à **10,8 ans**.

## Pièges réels et optimisations fiscales à anticiper

- **Confondre retrait brut et pouvoir d'achat net d'impôt** : Lors d'un retrait sur compte-titres ordinaire, l'impôt frappe uniquement la **quote-part de plus-value** comprise dans le retrait. Si votre portefeuille comporte 60 % de gains, le PFU de 30 % en France prélève $60\,\% \times 30\,\% = 18\,\%$ du retrait. Majorez votre capital cible ou privilégiez les enveloppes capitalisantes (PEA après 5 ans limité à 17,2 % de prélèvements sociaux sur les gains, assurance-vie après 8 ans, ou CELI exonéré au Canada).
- **Oublier l'amortissement des équipements durables** : Ajoutez une provision de maintenance de 8 % à 10 % à vos dépenses courantes (remplacement de véhicule, travaux, santé) avant de les multiplier par 25.
- **Adopter une règle de retrait flexible** : Réduire vos dépenses discrétionnaires de 10 % à 15 % lors des années boursières négatives porte le taux de survie du portefeuille à près de 100 % sur 50 ans.
