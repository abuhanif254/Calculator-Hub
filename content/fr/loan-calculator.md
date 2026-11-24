---
title: "Calculatrice de Prêt"
metaTitle: "Calculatrice de Prêt : Amortissable, Différé et Obligation"
description: "Simulez trois structures de financement : prêt amortissable à mensualités fixes, prêt à paiement différé unique et obligation zéro-coupon avec choix de capitalisation."
metaDescription: "Calculez mensualités de prêt amortissable, remboursement différé et valeur actuelle d'obligation selon la capitalisation, la durée et le taux annuel."
metaKeywords: "calculatrice de prêt, simulation crédit, prêt amortissable, tableau d'amortissement, prêt à paiement différé, obligation zéro-coupon, capitalisation des intérêts, TAEG"
faqs:
  - question: "Quelles sont les trois structures de financement prises en charge par cette calculatrice ?"
    answer: "L'outil réunit trois moteurs distincts : le prêt amortissable à mensualités fixes (crédit immobilier, prêt personnel, crédit auto), le prêt à paiement différé unique où capital et intérêts capitalisés sont réglés en une seule fois à l'échéance (prêt-relais, avance de trésorerie), et l'obligation zéro-coupon qui actualise une valeur faciale prédéterminée pour connaître la somme versée au départ."
  - question: "Comment la fréquence de capitalisation modifie-t-elle le coût réel d'un prêt ?"
    answer: "À taux nominal annuel identique, plus les intérêts sont capitalisés fréquemment (mensuellement plutôt qu'annuellement ou semestriellement), plus le taux effectif annuel augmente. Par exemple, un taux nominal de 6,00 % correspond à un taux effectif annuel de 6,000 % en capitalisation annuelle, 6,090 % en capitalisation semestrielle (norme hypothécaire canadienne) et 6,168 % en capitalisation mensuelle."
  - question: "Pourquoi la part d'intérêts est-elle beaucoup plus forte au début d'un prêt amortissable ?"
    answer: "À chaque échéance, les intérêts sont calculés sur le capital restant dû, qui atteint son maximum au lancement du prêt. Sur 100 000 € à 6 % sur 10 ans, le premier mois consacre 500,00 € aux intérêts (45 % de la mensualité) et 610,21 € au capital ; au dernier mois, les intérêts tombent à 5,52 €. C'est pourquoi les remboursements anticipés partiels sont nettement plus rentables durant la première moitié du prêt."
  - question: "Quelle différence existe-t-il entre un prêt à différé total et un prêt in fine classique ?"
    answer: "Dans un prêt in fine classique, l'emprunteur paie chaque mois les intérêts simples et ne rembourse le capital qu'à la dernière échéance. Dans un prêt à paiement différé unique (différé total), aucun versement n'a lieu avant l'échéance : les intérêts non payés s'ajoutent périodiquement au capital et produisent eux-mêmes des intérêts (capitalisation composée), ce qui alourdit sensiblement le montant final dû."
  - question: "Comment distinguer le taux nominal saisi dans la calculatrice du TAEG d'une offre bancaire ?"
    answer: "Le taux nominal sert à calculer la mensualité pure en capital et intérêts. Le TAEG (taux annuel effectif global), obligatoire en France et en Belgique sur toute offre de crédit, intègre en plus l'assurance emprunteur obligatoire, les frais de dossier et les frais de garantie (caution ou hypothèque). Saisir le TAEG dans la calculatrice permet d'approcher la charge financière complète tout compris."
---

Un prêt met un capital à la disposition d'un emprunteur contre son remboursement majoré d'intérêts, mais son coût réel dépend étroitement de sa mécanique d'amortissement. Verser une mensualité fixe chaque mois, solder capital et intérêts composés en une fois à maturité ou actualiser une valeur faciale prédéterminée produisent des charges financières sans commune mesure.

Notre **calculatrice de prêt** réunit ces **trois régimes** sur une même page — **prêt amortissable**, **prêt à paiement différé unique** et **obligation zéro-coupon** — avec réglage de la durée (années et mois), du taux annuel et de la **fréquence de capitalisation** (annuelle, semestrielle, trimestrielle ou mensuelle). Utilisable en euros (`€`), francs suisses (`CHF`) ou dollars canadiens (`CAD`), elle décompose capital, intérêts cumulés et valeur à l'échéance.

## Formules mathématiques des trois régimes de prêt

Soient $C$ le capital initial, $r$ le taux nominal annuel (en décimal, soit $0{,}06$ pour $6\,\%$), $k \in \{1\,;\,2\,;\,4\,;\,12\}$ le nombre de capitalisations par an, $t = a + m/12$ la durée en années et $N = 12a + m$ le nombre de mensualités.

### 1. Prêt amortissable à échéances constantes

On convertit d'abord le taux nominal en **taux mensuel équivalent** $i_m$, puis on applique la formule d'annuité constante :

$$i_m = \left(1 + \frac{r}{k}\right)^{k/12} - 1 \qquad M = C \cdot \frac{i_m\,(1 + i_m)^N}{(1 + i_m)^N - 1}$$

* Avec $k = 12$ (taux proportionnel mensuel en France et en Europe), $i_m = r / 12$.
* Avec $k = 2$ (pratique légale des hypothèques fixes au Canada), $i_m = (1 + r/2)^{1/6} - 1$, légèrement inférieur à $r / 12$.
* Les intérêts cumulés valent $I_{\text{amort}} = N \cdot M - C$ (et $M = C / N$ si $i_m = 0$).

### 2. Prêt à paiement différé unique

Aucun remboursement n'intervient avant la date finale ; les intérêts se capitalisent périodiquement sur le capital pour donner la somme due à l'échéance $V_f$ :

$$V_f = C \left(1 + \frac{r}{k}\right)^{k \cdot t} \qquad I_{\text{diff}} = V_f - C$$

### 3. Obligation zéro-coupon (valeur faciale prédéterminée)

On fixe la valeur faciale $V_n$ versée à maturité et l'on calcule sa valeur actuelle reçue au départ (prix d'émission $V_0$) :

$$V_0 = \frac{V_n}{\left(1 + \frac{r}{k}\right)^{k \cdot t}} \qquad I_{\text{obl}} = V_n - V_0$$

## Exemple chiffré pas à pas : 100 000 € à 6,00 % sur 10 ans

Comparons les trois modules sur **$100\,000\text{ €}$** à **$6{,}00\,\%$** nominal sur **$10\text{ ans}$** ($N = 120$ mois).

1. **Prêt amortissable ($k = 12$, capitalisation mensuelle)** :
   * Taux mensuel : $i_m = 0{,}06 / 12 = \mathbf{0{,}005}$ ($0{,}50\,\%$) et $(1{,}005)^{120} \approx \mathbf{1{,}819397}$.
   * Mensualité fixe : $M = 100\,000 \times \frac{0{,}005 \times 1{,}819397}{1{,}819397 - 1} \approx \mathbf{1\,110{,}21\text{ €}}$ *(exactement $1\,110{,}2050\text{ €}$)*.
   * Total remboursé : **$133\,224{,}60\text{ €}$**, soit **$33\,224{,}60\text{ €}$** d'intérêts.
   * **Tableau d'amortissement** : au **mois 1**, les intérêts s'élèvent à **$500{,}00\text{ €}$** ($45{,}0\,\%$ de l'échéance) contre **$610{,}21\text{ €}$** de capital amorti. À mi-parcours (**mois 60**), le capital restant dû atteint encore **$57\,425{,}98\text{ €}$** ($291{,}22\text{ €}$ d'intérêts et $818{,}98\text{ €}$ de capital). Au **mois 120**, les intérêts tombent à **$5{,}52\text{ €}$** ($0{,}5\,\%$).
2. **Prêt à paiement différé unique ($k = 1$, capitalisation annuelle)** :
   * Somme due à l'échéance : $V_f = 100\,000 \times (1{,}06)^{10} = \mathbf{179\,084{,}77\text{ €}}$.
   * Intérêts cumulés : **$79\,084{,}77\text{ €}$**, soit plus du double du prêt amortissable, puisque le principal n'est jamais entamé avant la 10e année.
3. **Obligation zéro-coupon ($V_n = 100\,000\text{ €}$, $k = 1$)** :
   * Montant reçu au départ : $V_0 = 100\,000 / (1{,}06)^{10} = \mathbf{55\,839{,}48\text{ €}}$, soit **$44\,160{,}52\text{ €}$** d'intérêts implicites (décote d'émission).

## Tableau comparatif : impact de la fréquence de capitalisation

Pour **$100\,000\text{ €}$** à **$6{,}00\,\%$** sur **10 ans**, la fréquence de capitalisation modifie le taux effectif annuel (TEA) et les résultats de chaque régime :

| Capitalisation ($k$) | Taux effectif annuel | Amortissable : mensualité | Amortissable : intérêts | Différé : dû à l'échéance | Obligation : reçu au départ |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Annuelle ($k = 1$)** | 6,000 % | 1 102,24 € | 32 268,83 € | 179 084,77 € | 55 839,48 € |
| **Semestrielle ($k = 2$)** | 6,090 % | 1 106,51 € | 32 781,19 € | 180 611,12 € | 55 367,58 € |
| **Trimestrielle ($k = 4$)** | 6,136 % | 1 108,71 € | 33 045,38 € | 181 401,84 € | 55 126,23 € |
| **Mensuelle ($k = 12$)** | 6,168 % | 1 110,21 € | 33 224,60 € | 181 939,67 € | 54 963,27 € |

Passer d'une capitalisation annuelle à mensuelle ajoute **$955{,}77\text{ €}$** d'intérêts sur le prêt amortissable et **$2\,854{,}90\text{ €}$** sur le prêt différé.

## Pièges fréquents avant de s'engager

* **Confondre taux nominal et TAEG** : le taux nominal exclut l'assurance emprunteur, les frais de dossier et les garanties (hypothèque ou caution). Comparez toujours les offres à partir du **TAEG** légal.
* **Sous-estimer l'anatocisme d'un différé total** : en franchise totale (prêt-relais, prêt étudiant), les intérêts non payés génèrent à leur tour des intérêts. Préférez un différé partiel (paiement mensuel des intérêts) dès que votre trésorerie le permet.
* **Oublier les indemnités de remboursement anticipé (IRA) et l'endettement** : en crédit immobilier français, les IRA sont plafonnées à $6\text{ mois}$ d'intérêts ou $3\,\%$ du capital restant dû. Vérifiez également le plafond d'endettement ($35\,\%$ assurance incluse en France, ratios ABD/ATD au Canada, taux théorique de $5\,\%$ en Suisse).
* **Allonger la durée lors d'un rachat de prêt** : un taux plus bas sur une durée rallongée réduit la mensualité mais peut augmenter le total des intérêts restants. Comparez toujours le coût global restant dû, frais inclus.
