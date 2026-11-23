---
title: "Calculatrice de Paiement"
metaTitle: "Calculatrice de Paiement : Mensualités de Prêt Fixe"
description: "Estimez instantanément la mensualité fixe, le coût total des intérêts et le montant global remboursé pour un prêt personnel, auto, travaux, immobilier ou à taux zéro."
metaDescription: "Calculez la mensualité constante, les intérêts totaux et le coût global de tout prêt à taux fixe ou à 0 % : crédit auto, personnel, conso ou immobilier."
metaKeywords: "calculatrice de paiement, calcul mensualité prêt, mensualité crédit auto, amortissement taux fixe, intérêt total emprunt, simulation remboursement, prêt taux zéro"
faqs:
  - question: "Pourquoi paie-t-on davantage d'intérêts au début du remboursement d'un prêt à échéances constantes ?"
    answer: "Chaque mois, les intérêts sont calculés sur le capital restant dû. Lors des premières échéances, ce solde est maximal : une part importante de votre mensualité constante sert donc à rémunérer le prêteur, et le reliquat amortit le capital. À mesure que le capital diminue, la part d'intérêts baisse mécaniquement et l'amortissement du principal s'accélère jusqu'à la dernière échéance."
  - question: "Faut-il saisir le taux nominal (débiteur) ou le TAEG dans la calculatrice de paiement ?"
    answer: "Pour retrouver exactement la mensualité hors assurance de votre offre bancaire, saisissez le taux débiteur nominal fixe. Pour mesurer le coût réel global et comparer deux établissements à conditions équivalentes, utilisez le Taux Annuel Effectif Global (TAEG en France et en Belgique), qui englobe les frais de dossier, les garanties et l'assurance emprunteur obligatoire."
  - question: "Comment la calculatrice traite-t-elle un crédit à taux zéro (0 %) ?"
    answer: "Lorsque le taux d'intérêt saisi vaut 0 %, la formule actuarielle classique produirait une division par zéro. Notre algorithme bascule automatiquement sur un amortissement linéaire exact : la mensualité correspond alors simplement au capital emprunté divisé par le nombre de mois, pour un coût d'intérêts strictement nul (utile pour un PTZ français ou un financement promotionnel à 0 %)."
  - question: "Pourquoi une mensualité hypothécaire au Canada est-elle légèrement différente de la formule européenne ?"
    answer: "En Europe continentale ainsi que pour la plupart des prêts personnels et automobiles canadiens, les intérêts sont capitalisés mensuellement selon le taux proportionnel (taux annuel divisé par 12). Au Canada, la Loi sur l'intérêt impose toutefois une capitalisation semestrielle pour les prêts hypothécaires à taux fixe, ce qui donne un taux mensuel effectif légèrement inférieur au douzième du taux affiché et abaisse marginalement la mensualité."
  - question: "Quel est l'impact réel d'un allongement de durée sur le coût total d'un crédit ?"
    answer: "Allonger la durée réduit la mensualité immédiate, mais fait croître les intérêts totaux de manière plus que proportionnelle, d'autant que les durées longues s'accompagnent souvent d'un taux nominal plus élevé. Par exemple, financer 24 000 € sur 7 ans à 6,40 % plutôt que sur 3 ans à 4,80 % divise presque la mensualité par deux, mais multiplie les intérêts cumulés par plus de trois."
---

Avant de contracter un crédit automobile, un prêt personnel, un financement de travaux ou un emprunt immobilier à taux fixe, connaître précisément votre **mensualité constante** et le **coût cumulé des intérêts** permet d'équilibrer confort mensuel et coût total du crédit.

Notre calculatrice de paiement évalue instantanément le **Paiement Mensuel**, l'**Intérêt Total** et le **Montant Total Payé**, accompagnés d'une ventilation graphique entre capital et intérêts, en euros (`€`), francs suisses (`CHF`) ou dollars canadiens (`CAD`), pour toute durée en années ou en mois.

## Formule d'Amortissement à Échéances Constantes

Dans un prêt amortissable à taux fixe (hors assurance facultative), la mensualité ($M$) reste constante jusqu'à l'extinction de la dette. Pour tout taux annuel strictement positif ($T_a > 0$), elle suit la formule actuarielle classique :

$$M = C \times \frac{r(1 + r)^n}{(1 + r)^n - 1}$$

Pour un **prêt à taux zéro** ($T_a = 0\,\%$, tel qu'un PTZ ou un crédit promotionnel à 0 %), l'outil bascule automatiquement sur la division linéaire exacte $M = \frac{C}{n}$.

* **$C$ (Capital emprunté)** : somme nette financée après apport personnel (`€`, `CHF` ou `CAD`).
* **$r$ (Taux mensuel)** : taux nominal annuel en décimal divisé par 12 ($r = \frac{T_a}{12}$). Un taux annuel de 5,40 % correspond à 0,0045 par mois.
* **$n$ (Nombre d'échéances)** : durée totale en mois (ou années multipliées par 12).
* **$S_{\text{total}}$ et $I_{\text{total}}$** : montant total versé ($M \times n$) et intérêts cumulés ($S_{\text{total}} - C$).

### Dynamique Mensuelle et Spécificité Canadienne

Chaque mois $k$ (de 1 à $n$), les intérêts portent uniquement sur le capital restant dû ($CRD_{k-1}$), tandis que le solde amortit le principal :

$$I_k = CRD_{k-1} \times r \qquad A_k = M - I_k \qquad CRD_k = CRD_{k-1} - A_k$$

Si les crédits européens (France, Belgique, Suisse) et les prêts auto ou personnels canadiens recourent au taux proportionnel $r = T_a / 12$, les **prêts hypothécaires canadiens à taux fixe** imposent une capitalisation semestrielle donnant un taux mensuel effectif légèrement inférieur : $r_{\text{CA}} = \left(1 + \frac{T_a}{2}\right)^{1/6} - 1$.

## Exemple Chiffré Pas à Pas : Emprunt de 24 000 € sur 5 Ans

Considérons un crédit automobile de **24 000 €** au taux nominal fixe de **5,40 %** sur **5 ans (60 mois)**.

1. **Taux mensuel et facteur** : $r = \frac{0{,}054}{12} = 0{,}0045$ (0,45 %/mois) et $(1 + 0{,}0045)^{60} \approx 1{,}309171$.
2. **Mensualité constante** :
   $$M = 24\,000 \times \frac{0{,}0045 \times 1{,}309171}{1{,}309171 - 1} = \mathbf{457{,}32\text{ €}}$$
3. **Progression de l'amortissement** :
   * **Mois 1** : intérêts de **108,00 €**, capital amorti de **349,32 €**, solde restant dû de **23 650,68 €**.
   * **Mois 30 (mi-parcours)** : intérêts de **59,42 €**, capital amorti de **397,90 €**, solde encore dû de **12 806,96 €** (plus de 53 % du capital reste à amortir à mi-durée).
   * **Mois 60** : intérêts de **2,05 €**, capital amorti de **455,27 €**, solde soldé à **0,00 €**.
4. **Bilan global** : sur 60 mois, l'emprunteur paie **27 439,26 €**, dont **3 439,26 €** d'intérêts (**14,33 %** du capital emprunté). *(Sous capitalisation semestrielle hypothécaire canadienne à 5,40 %, le taux mensuel effectif de 0,44502 % donnerait **456,66 CAD/mois** et **3 399,61 CAD** d'intérêts.)*

## Comparatif des Durées et des Taux pour 24 000 € Empruntés

Ce tableau compare six durées et taux usuels pour un même capital financé de **24 000 €** :

| Scénario de Prêt | Durée | Taux | Mensualité | Intérêts Totaux | Total Payé | Intérêts / Capital |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Crédit court 3 ans** | 36 mois | 4,80 % | 717,15 € | 1 817,34 € | 25 817,34 € | 7,57 % |
| **Crédit auto 4 ans** | 48 mois | 5,10 % | 553,79 € | 2 581,96 € | 26 581,96 € | 10,76 % |
| **Taux zéro (0 %) 5 ans** | 60 mois | 0,00 % | 400,00 € | 0,00 € | 24 000,00 € | 0,00 % |
| **Crédit standard 5 ans** | 60 mois | 5,40 % | 457,32 € | 3 439,26 € | 27 439,26 € | 14,33 % |
| **Financement long 6 ans** | 72 mois | 5,90 % | 396,62 € | 4 556,45 € | 28 556,45 € | 18,99 % |
| **Crédit étendu 7 ans** | 84 mois | 6,40 % | 355,23 € | 5 838,96 € | 29 838,96 € | 24,33 % |

Passer de 3 ans (4,80 %) à 7 ans (6,40 %) allège la mensualité de **361,92 €**, mais augmente les intérêts de **4 021,62 €** (plus du triple).

## Conseils Pratiques et Pièges à Éviter Avant de Signer

* **Arbitrer à partir du TAEG réel** : Une mensualité hors assurance et hors frais de dossier masque souvent le coût effectif. Comparez toujours le Taux Annuel Effectif Global indiqué sur la fiche précontractuelle (FIPEN en France, SECCI en Belgique, tableau d'information au Canada).
* **Respecter votre capacité d'endettement** : En France, le HCSF plafonne l'endettement immobilier à **35 %** assurance incluse ; en Belgique et en Suisse, l'usage bancaire cible un tiers des revenus nets ; au Canada, les ratios ABD et ATD encadrent les charges à **32 %** et **40 à 44 %**.
* **Chiffrer un apport et la décote du bien** : Apporter **4 000 €** dans notre exemple (20 000 € financés sur 5 ans à 5,40 %) baisse la mensualité de **76,22 €** (à **381,10 €**) et économise **573,21 €** d'intérêts. À l'inverse, étaler un crédit auto sur 7 ans expose à devoir plus que la valeur argus du véhicule.
* **Connaître vos droits légaux** : En France, Belgique et Suisse, le crédit à la consommation bénéficie d'un délai légal de rétractation de **14 jours calendaires** ; en France, un remboursement anticipé de crédit conso jusqu'à **10 000 €** sur douze mois est exempt d'indemnité.
