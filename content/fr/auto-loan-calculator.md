---
title: "Calculatrice de Prêt Auto"
metaTitle: "Calculatrice de Prêt Auto : Mensualités, TAEG et Intérêts"
description: "Calculez vos mensualités de crédit automobile, le montant total des intérêts et le coût global de votre véhicule selon le prix, l'apport, la durée et le TAEG."
metaDescription: "Simulez vos mensualités de crédit auto, vos intérêts totaux et le coût réel de votre véhicule selon l'apport, la durée et le TAEG avec exemples chiffrés."
metaKeywords: "calculatrice de prêt auto, simulation crédit auto, mensualité voiture, TAEG crédit auto, tableau d'amortissement auto, financement automobile, apport personnel voiture"
faqs:
  - question: "Quelle est la différence entre le taux débiteur et le TAEG sur un crédit auto ?"
    answer: "Le taux débiteur nominal ne mesure que les intérêts purs appliqués au capital emprunté. Le TAEG (taux annuel effectif global) intègre en plus les frais obligatoires liés au financement, tels que les frais de dossier et les assurances exigées par le prêteur. Pour comparer objectivement une offre de concessionnaire et un prêt bancaire, comparez toujours les TAEG à durée et montant identiques."
  - question: "Pourquoi un apport personnel d'au moins 20 % protège-t-il l'acheteur ?"
    answer: "Un véhicule neuf perd fréquemment 15 % à 25 % de sa valeur dès la première année de mise en circulation. Verser un apport de 20 % (en épargne ou via la reprise d'un ancien véhicule) réduit immédiatement le capital financé, abaisse la mensualité et les intérêts totaux, et évite de vous retrouver en valeur résiduelle négative, c'est-à-dire de devoir plus à la banque que la valeur marchande de la voiture."
  - question: "Allonger la durée du prêt auto à 72 ou 84 mois est-il une bonne stratégie ?"
    answer: "Étendre le remboursement sur 6 ou 7 ans allège la mensualité à court terme, mais alourdit fortement le coût total des intérêts et expose l'emprunteur à payer un véhicule dont la cote a chuté bien plus vite que le capital restant dû. Sur 24 000 € à 5,50 %, passer de 48 à 84 mois ajoute plus de 2 178 € d'intérêts tout en prolongeant la dette hors garantie constructeur."
  - question: "Faut-il privilégier un crédit affecté, un prêt personnel ou une LOA ?"
    answer: "Le crédit affecté lie juridiquement le prêt à la livraison du véhicule : si la vente est annulée, le financement l'est aussi. Le prêt personnel offre plus de liberté (véhicule d'occasion entre particuliers, frais de carte grise inclus) sans justificatif d'achat. La location avec option d'achat (LOA) affiche des loyers attractifs mais impose souvent un premier loyer majoré, des plafonds kilométriques stricts et un coût global plus élevé si vous rachetez le véhicule en fin de contrat."
  - question: "Quels frais automobiles ne sont pas inclus dans la mensualité calculée ?"
    answer: "La calculatrice détermine la mensualité d'amortissement du capital financé et les intérêts. En parallèle, votre budget automobile réel doit intégrer les frais d'immatriculation (carte grise et malus écologique en France, taxe de mise en circulation en Belgique, plaques et frais cantonaux en Suisse, taxes TPS/TVQ au Québec), l'assurance auto tous risques, l'assurance emprunteur facultative, l'entretien périodique et le carburant ou la recharge électrique."
---

L'achat d'une voiture neuve ou d'occasion constitue l'un des postes les plus lourds du budget d'un foyer après le logement. Pourtant, de nombreux acheteurs négocient uniquement la mensualité en concession, sans mesurer le coût réel des intérêts ni la décote rapide du véhicule. Un point de taux en plus ou deux années de remboursement supplémentaires suffisent à alourdir la facture de plusieurs milliers d'euros.

Notre **calculatrice de prêt auto** calcule aussitôt votre **mensualité fixe**, le **capital emprunté**, les **intérêts totaux** et le **coût global du véhicule** (apport compris), avec répartition visuelle entre capital et intérêts. Renseignez simplement le prix du véhicule, votre apport (ou reprise), la durée en mois et le taux annuel pour comparer vos offres en euros (`€`), francs suisses (`CHF`) ou dollars canadiens (`CAD`).

## Formules du crédit automobile amortissable

Un crédit auto classique suit un amortissement **à échéances constantes**. À partir du prix négocié $P$, de l'apport personnel ou reprise $A$, de la durée $n$ (en mois) et du taux annuel $r_a$ (en décimal, soit $0{,}055$ pour $5{,}50\,\%$) :

$$C = P - A \qquad i = \frac{r_a}{12}$$

La mensualité constante $M$ (hors assurance facultative), les intérêts cumulés $I_{\text{tot}}$ et le coût global du véhicule s'expriment ainsi :

$$M = C \cdot \frac{i\,(1 + i)^n}{(1 + i)^n - 1} \qquad I_{\text{tot}} = M \cdot n - C \qquad \text{Coût total} = P + I_{\text{tot}}$$

*(Lorsque le taux est nul, $i = 0$, la mensualité se réduit simplement à $M = C / n$.)*

* **$P$ et $A$** : prix négocié du véhicule et apport personnel ou valeur de reprise (`€`).
* **$C$** : capital réellement emprunté ($P - A$).
* **$r_a$ et $i$** : taux annuel (nominal ou TAEG pour intégrer les frais obligatoires) et taux périodique mensuel.
* **$n$** : nombre de mensualités (généralement $36$, $48$, $60$, $72$ ou $84$ mois).

### Dynamique du tableau d'amortissement

Si la mensualité $M$ reste fixe, sa ventilation change à chaque échéance $k$. Les intérêts sont calculés sur le **capital restant dû** $S_{k-1}$ :

$$I_k = S_{k-1} \cdot i \qquad K_k = M - I_k \qquad S_k = S_{k-1} - K_k$$

Au départ, le capital restant dû étant élevé, la part d'intérêts pèse davantage ; mois après mois, $I_k$ diminue tandis que la fraction amortissant le capital $K_k$ progresse.

## Exemple chiffré pas à pas : véhicule à 30 000 € sur 60 mois

Prenons une berline négociée à **$30\,000\text{ €}$**, avec un apport (ou reprise) de **$6\,000\text{ €}$** ($20\,\%$), un taux annuel de **$5{,}50\,\%$** et une durée de **$60\text{ mois}$** (5 ans).

1. **Capital emprunté et taux mensuel** : $C = 30\,000 - 6\,000 = \mathbf{24\,000\text{ €}}$ et $i = 0{,}055 / 12 \approx \mathbf{0{,}00458333}$.
2. **Facteur composé** : $(1 + i)^{60} = (1{,}00458333)^{60} \approx \mathbf{1{,}315704}$.
3. **Mensualité constante** :
   $$M = 24\,000 \times \frac{0{,}00458333 \times 1{,}315704}{1{,}315704 - 1} \approx \mathbf{458{,}43\text{ €}}$$
   *(soit $458{,}4278\text{ €}$ avant arrondi au centime).*
4. **Intérêts et coût global** : le total des 60 échéances atteint **$27\,505{,}67\text{ €}$**, soit **$3\,505{,}67\text{ €}$** d'intérêts totaux et un coût total du véhicule de **$33\,505{,}67\text{ €}$**.
5. **Jalons du tableau d'amortissement** :
   * **Mois 1** : **$110{,}00\text{ €}$** d'intérêts ($24{,}0\,\%$) et **$348{,}43\text{ €}$** de capital amorti (solde : $23\,651{,}57\text{ €}$).
   * **Mois 30** : **$60{,}59\text{ €}$** d'intérêts ($13{,}2\,\%$) et **$397{,}84\text{ €}$** de capital (solde : $12\,821{,}83\text{ €}$).
   * **Mois 60** : **$2{,}09\text{ €}$** d'intérêts ($0{,}5\,\%$) et **$456{,}34\text{ €}$** de capital, soldant le prêt.

## Tableau comparatif : impact de la durée sur 24 000 € à 5,50 %

Pour un véhicule de $30\,000\text{ €}$ avec $6\,000\text{ €}$ d'apport, voici l'effet direct de la durée sur la mensualité et le coût total :

| Durée | Mensualité | Total remboursé | Intérêts totaux | Coût total véhicule | Intérêts / Capital | Risque de décote |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **36 mois** | 724,70 € | 26 089,26 € | 2 089,26 € | 32 089,26 € | 8,7 % | Très faible |
| **48 mois** | 558,16 € | 26 791,46 € | 2 791,46 € | 32 791,46 € | 11,6 % | Faible |
| **60 mois** | 458,43 € | 27 505,67 € | 3 505,67 € | 33 505,67 € | 14,6 % | Modéré |
| **72 mois** | 392,11 € | 28 231,87 € | 4 231,87 € | 34 231,87 € | 17,6 % | Élevé |
| **84 mois** | 344,88 € | 28 970,01 € | 4 970,01 € | 34 970,01 € | 20,7 % | Critique |

Passer de **48 à 72 mois** baisse la mensualité de **$166{,}05\text{ €}$**, mais ajoute **$1\,440{,}41\text{ €}$** d'intérêts ; sur **84 mois**, le surcoût atteint **$2\,880{,}75\text{ €}$** face au prêt sur 36 mois.

## Pièges fréquents et repères de financement

* **Négocier « à la mensualité »** : figez toujours le prix net du véhicule avant de discuter du financement. Allonger le crédit sur 72 ou 84 mois masque un prix élevé et crée un risque de **valeur résiduelle négative** (capital restant dû supérieur à la cote Argus en cas de revente ou de sinistre total).
* **Confondre taux débiteur et TAEG** : un taux concessionnaire à $4{,}90\,\%$ assorti de frais de dossier et d'une assurance obligatoire coûte souvent plus cher qu'un crédit bancaire à $5{,}30\,\%$ TAEG sans frais. Exigez la fiche précontractuelle normalisée (FIPEN en France, SECCI en Belgique).
* **Ignorer la règle 20/4/10 et l'endettement global** : viser **20 % d'apport**, **48 mois maximum** et un budget auto global (crédit, assurance, carburant) sous **10 % du revenu mensuel** préserve votre épargne et votre capacité d'emprunt immobilier (plafond d'endettement à $35\,\%$ en France).
* **Oublier la fiscalité locale et le remboursement anticipé** : budgétez hors prêt la carte grise et le malus écologique (France), la taxe de mise en circulation (Belgique), la casco complète (Suisse) ou les taxes TPS/TVQ (Québec). En France, un crédit à la consommation peut être remboursé par anticipation sans indemnité jusqu'à $10\,000\text{ €}$ par période de 12 mois.
