---
title: "Calculateur d'Amortissement Hypothécaire"
metaTitle: "Calculateur d'Amortissement Hypothécaire et Échéancier"
description: "Simulez votre mensualité fixe et générez votre tableau d'amortissement annuel complet pour suivre la part de capital remboursé, les intérêts cumulés et le solde restant dû."
metaDescription: "Calculez vos mensualités de prêt immobilier et consultez votre tableau d'amortissement détaillé : capital, intérêts cumulés et solde restant dû."
metaKeywords: "calculateur amortissement hypothécaire, tableau d'amortissement, prêt immobilier, échéancier de crédit, capital et intérêts, mensualité constante, TAEG"
faqs:
  - question: "Quelle est la différence entre le taux nominal saisi dans le calculateur et le TAEG d'une offre de prêt ?"
    answer: "Le taux nominal (ou taux débiteur) sert uniquement à calculer les intérêts sur le capital restant dû et construit votre tableau d'amortissement hors assurance. Le TAEG (Taux Annuel Effectif Global), obligatoire en France et en Belgique, agrège en plus l'assurance emprunteur, les frais de dossier, le coût de la garantie (hypothèque ou caution) et les frais de courtage afin de comparer le coût réel total de plusieurs offres bancaires."
  - question: "Pourquoi la part d'intérêts est-elle majoritaire dans mes premières mensualités et qu'est-ce que le point de bascule ?"
    answer: "Dans un crédit amortissable à échéances constantes, les intérêts de chaque mois sont calculés sur le capital restant dû au début de la période. Comme la dette est maximale au démarrage, les intérêts absorbent une large fraction des premières mensualités. Le point de bascule désigne le mois précis à partir duquel la part de capital amorti dépasse définitivement celle des intérêts : sur un prêt de 25 ans à 4,20 %, il n'intervient qu'au 103e mois (en 9e année)."
  - question: "Comment le tableau d'amortissement aide-t-il à préparer une revente anticipée ou un rachat de crédit ?"
    answer: "Le tableau vous indique exactement le capital restant dû à chaque anniversaire du contrat. Avant de vendre un bien ou de renégocier votre taux, ce solde permet de chiffrer la trésorerie nette dégagée après remboursement de la banque et d'estimer les indemnités de remboursement anticipé (plafonnées en France à 6 mois d'intérêts ou 3 % du capital restant dû, et à 3 mois d'intérêts en Belgique)."
  - question: "Le calcul des mensualités diffère-t-il entre la France, la Belgique, la Suisse et le Canada ?"
    answer: "Oui, sur deux points majeurs. En France et en Belgique, le taux mensuel est proportionnel (taux annuel divisé par 12) et le prêt s'amortit intégralement sur 15 à 25 ans. Au Canada, la loi impose une capitalisation semestrielle pour les prêts hypothécaires à taux fixe, ce qui rend le taux mensuel effectif légèrement inférieur au douzième du taux affiché. En Suisse, seul le prêt de deuxième rang (au-delà de 65 % de la valeur du bien) est obligatoirement amorti, souvent de manière indirecte via le pilier 3a."
  - question: "Vaut-il mieux réduire la durée ou la mensualité lors d'un remboursement anticipé partiel ?"
    answer: "Si votre budget mensuel reste confortable, privilégiez la réduction de la durée restante : maintenir la même mensualité sur un capital diminué accélère l'amortissement de chaque échéance suivante et supprime davantage d'intérêts futurs (ainsi que des mois d'assurance emprunteur) qu'une baisse de mensualité à durée inchangée."
---

Lorsqu'on souscrit un crédit immobilier, la seule mensualité masque l'essentiel : la vitesse réelle à laquelle la dette diminue. Durant les premières années d'un emprunt long, les intérêts absorbent la majeure partie de chaque versement tandis que le capital remboursé progresse lentement.

Notre **calculateur d'amortissement hypothécaire** détermine votre mensualité fixe hors assurance, le total des intérêts et votre **tableau d'amortissement annuel** complet (courbes du capital cumulé, des intérêts cumulés et du solde restant dû) en euros (`€`), francs suisses (`CHF`) ou dollars canadiens (`CAD`).

## Formules de l'Amortissement à Mensualité Constante

Pour un emprunt amortissable à taux fixe de capital $C_0$, remboursé sur $t$ années ($n = 12t$ mensualités) au taux nominal annuel $i$, la mensualité constante hors assurance $M$ vaut :

$$M = C_0 \times \frac{r(1 + r)^n}{(1 + r)^n - 1} \qquad \text{avec} \quad r = \frac{i}{12}$$

* **$C_0$** : capital emprunté initial (`€`, `CHF` ou `CAD`).
* **$r$** : taux mensuel appliqué au solde restant dû (si $i = 0\,\%$, comme un prêt à taux zéro, $M = C_0 / n$).
* **$n$** : nombre total d'échéances ($180$ sur 15 ans, $240$ sur 20 ans, $300$ sur 25 ans).
* **$M$** : mensualité constante combinant intérêts et amortissement du capital.

### Ventilation Mensuelle et Capital Restant Dû

À chaque mois $k$ (de $1$ à $n$), l'échéancier décompose l'échéance puis met à jour la dette :

$$I_k = C_{k-1} \times r \qquad A_k = M - I_k \qquad C_k = C_{k-1} - A_k$$

Le capital restant dû après $k$ versements et le coût total des intérêts s'expriment aussi directement :

$$C_k = C_0 \times \frac{(1 + r)^n - (1 + r)^k}{(1 + r)^n - 1} \qquad I_{\text{total}} = (M \times n) - C_0$$

En France et en Belgique, les banques retiennent le taux proportionnel $r = i / 12$. Au Canada, la loi impose une **capitalisation semestrielle** sur les prêts à taux fixe, soit $r_{\text{CA}} = (1 + i / 2)^{1/6} - 1$, légèrement inférieur à $i / 12$.

## Exemple Chiffré Pas à Pas : 250 000 € à 4,20 % sur 25 Ans

Prenons un emprunt résidentiel de **250 000 €** au taux nominal fixe de **4,20 %** sur **25 ans** ($n = 300$ mois).

1. **Taux mensuel et mensualité hors assurance** :
   * Taux périodique : $r = 0{,}042 / 12 = 0{,}0035$ ($0{,}35\,\%$/mois) et $(1{,}0035)^{300} \approx 2{,}852417$.
   $$M = 250\,000 \times \frac{0{,}0035 \times 2{,}852417}{2{,}852417 - 1} \approx \mathbf{1\,347{,}36\,\text{€}}$$
   * Intérêts totaux sur 25 ans : $404\,206{,}74 - 250\,000 = \mathbf{154\,206{,}74\,\text{€}}$.
2. **Décomposition des premières mensualités** :
   * **Mois 1** : $I_1 = 250\,000 \times 0{,}0035 = \mathbf{875{,}00\,\text{€}}$ d'intérêts (**64,9 %** de la mensualité), pour $A_1 = \mathbf{472{,}36\,\text{€}}$ de capital. Solde : $C_1 = 249\,527{,}64\,\text{€}$.
   * **Mois 2** : $I_2 = \mathbf{873{,}35\,\text{€}}$, $A_2 = \mathbf{474{,}01\,\text{€}}$, solde $C_2 = 249\,053{,}64\,\text{€}$.
3. **Point de bascule et jalons de remboursement** :
   * Le **point de bascule** (où le capital amorti dépasse les intérêts) arrive au **103e mois** (8 ans et 7 mois) : $I_{103} = 672{,}76\,\text{€}$ contre $A_{103} = 674{,}59\,\text{€}$.
   * Fin de l'**année 10** (mois 120) : après **40 %** de la durée, le solde reste à **179 707,26 €** — seuls **28,1 %** du capital (**70 292,74 €**) sont amortis. Au **300e mois**, les intérêts tombent à **4,70 €** pour **1 342,66 €** de capital.

Au Canada, sur ce même prêt en capitalisation semestrielle ($r_{\text{CA}} \approx 0{,}34698\,\%$), la mensualité baisse à **1 342,30 CAD**, économisant **1 518 CAD** d'intérêts.

## Comparatif des Durées pour 250 000 € à 4,20 %

| Durée | Mensualité (Hors Ass.) | Intérêts Mois 1 | Point de Bascule | Solde à 7 Ans | Intérêts Totaux | Coût Total |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **15 ans** | 1 874,38 € | 875,00 € | Mois 1 | 152 605 € | 87 388 € | 337 388 € |
| **20 ans** | 1 541,43 € | 875,00 € | Mois 43 | 185 053 € | 119 942 € | 369 942 € |
| **25 ans** | 1 347,36 € | 875,00 € | Mois 103 | 203 966 € | 154 207 € | 404 207 € |
| **30 ans** | 1 222,54 € | 875,00 € | Mois 163 | 216 130 € | 190 115 € | 440 115 € |

Passer de **20 à 25 ans** réduit l'échéance de **194,07 €/mois**, mais ajoute **34 264 €** d'intérêts et laisse près de **19 000 €** de capital supplémentaire à rembourser en cas de revente après 7 ans. À l'inverse, injecter **15 000 €** en remboursement anticipé partiel au **60e mois** (tout en maintenant la mensualité constante) raccourcit le prêt de **24 mois** et efface **18 277 €** d'intérêts futurs.

## Pièges Fréquents et Repères Régionaux à Vérifier

* **Oublier l'assurance et le TAEG** : Le tableau d'amortissement repose sur le taux nominal seul. Ajoutez l'assurance emprunteur (**0,15 % à 0,45 %/an**), les frais de dossier et la garantie pour comparer les offres via le **TAEG** et respecter, en France, le plafond HCSF (**35 %** d'endettement assurance incluse sur **25 ans** maximum hors différé VEFA).
* **Négliger les indemnités de remboursement anticipé (IRA)** : Avant une revente ou un rachat, chiffrez les pénalités — plafonnées en France à **6 mois d'intérêts** (ou **3 %** du capital restant dû), à **3 mois d'intérêts** (indemnité de remploi) en Belgique, et indexées sur le différentiel de taux au Canada. Négociez leur exonération dès l'offre.
* **Renégocier trop tard dans l'échéancier** : Un rachat de crédit rapporte surtout durant le premier tiers du prêt. Passé le point de bascule, les frais de garantie et de dossier absorbent souvent un écart de taux inférieur à **0,70–1 point**.
* **Confondre les usages suisses et canadiens** : En Suisse, seul le **2e rang** (au-delà de 65 % de la valeur vénale) s'amortit obligatoirement sur 15 ans ou avant la retraite (souvent en amortissement indirect via le pilier 3a). Au Canada, distinguez la période d'amortissement (25–30 ans) du **terme** (3 à 5 ans) où le taux est renégocié.
