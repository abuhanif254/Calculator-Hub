---
title: "Calculateur d'Abordabilité Immobilière"
metaTitle: "Calculateur d'Abordabilité Immobilière : Capacité d'Achat"
description: "Estimez le prix maximal du logement que vous pouvez financer selon vos revenus, vos dettes mensuelles, votre apport personnel et les charges de propriété."
metaDescription: "Estimez le prix maximal de votre futur logement selon vos revenus, dettes mensuelles, apport personnel, taux d'emprunt et charges de propriété."
metaKeywords: "calculateur abordabilité immobilière, capacité d'achat immobilier, capacité d'emprunt, taux d'endettement HCSF, budget achat maison, mensualité immobilière, apport personnel"
faqs:
  - question: "Quelle est la différence entre la règle des 35 % en France et les plafonds en Belgique, en Suisse et au Canada ?"
    answer: "En France, le Haut Conseil de Stabilité Financière (HCSF) limite le taux d'endettement à 35 % assurance emprunteur incluse sur 25 ans au plus. En Suisse, les banques plafonnent les charges théoriques à 33 % du revenu brut avec un taux fictif de 5 % et 1 % d'entretien. Au Canada, les ratios ABD (39 % pour le logement) et ATD (44 % toutes dettes comprises) s'ajoutent au test de résistance du BSIF, tandis que la Belgique privilégie le reste à vivre et une quotité financée souvent plafonnée à 90 %."
  - question: "Pourquoi faut-il déduire les frais de notaire et droits de mutation avant de saisir son apport ?"
    answer: "L'apport personnel saisi vient directement diminuer le capital emprunté sur le prix du bien. Or, les prêteurs exigent presque toujours de régler comptant les frais d'acquisition annexes (7 % à 8 % de frais de notaire dans l'ancien en France, droits d'enregistrement régionaux en Belgique, taxe de bienvenue au Québec). Retranchez ces frais de votre épargne disponible pour obtenir votre apport net réel."
  - question: "Quel impact a un crédit automobile ou personnel en cours sur la capacité d'achat immobilier ?"
    answer: "Chaque euro consacré à une dette existante ampute directement votre mensualité immobilière autorisée. Sur un prêt à 3,80 % sur 25 ans avec 0,80 % de taxe foncière, une mensualité de crédit automobile de 300 € réduit le prix maximal finançable de 51 412 €, soit plus de 171 fois la mensualité en cours."
  - question: "Pourquoi ajouter 30 000 € d'apport augmente-t-il parfois le prix maximal de moins de 30 000 € ?"
    answer: "Lorsque l'impôt foncier est calculé en pourcentage du prix du bien, un logement plus cher entraîne une taxe foncière mensuelle plus élevée. Votre mensualité logement restant plafonnée par votre taux d'endettement, cette hausse fiscale absorbe une petite part de capacité d'emprunt, si bien que 30 000 € d'apport supplémentaires génèrent un gain légèrement inférieur sur le prix maximal."
  - question: "Qu'est-ce que le « reste à vivre » et peut-il bloquer un dossier même sous 35 % d'endettement ?"
    answer: "Le reste à vivre désigne le revenu mensuel disponible après paiement de l'ensemble des mensualités de crédit. Une banque peut refuser un prêt pourtant inférieur au plafond de 35 % ou 36 % si ce solde, évalué par adulte et par enfant à charge, est jugé insuffisant pour assumer les dépenses courantes, l'énergie et les impôts."
---

## Évaluer sa Capacité d'Achat Immobilier avant de Chercher un Bien

Chiffrer son budget d'acquisition réel constitue le préalable indispensable de tout projet immobilier. Loin des estimations approximatives fondées sur un simple multiple du salaire annuel, les banques croisent votre **taux d'endettement maximal**, vos **dettes mensuelles en cours**, votre **apport personnel net**, les caractéristiques du prêt (taux et durée) ainsi que les **charges récurrentes de propriété** (taxe foncière, assurance habitation et copropriété).

Notre **Calculateur d'Abordabilité Immobilière** modélise simultanément l'ensemble de ces contraintes afin de calculer votre prix d'achat maximal, le capital empruntable et la décomposition exacte de votre mensualité globale.

## Modèle Mathématique du Prix Maximal Finançable

À partir de votre revenu annuel ($R_{\text{ann}}$), du taux d'endettement retenu ($\tau_{\text{end}}$) et de vos dettes mensuelles existantes ($D_{\text{ex}}$), l'outil détermine l'enveloppe mensuelle maximale dédiée au logement ($M_{\text{log}}$) :

$$D_{\max} = \frac{R_{\text{ann}}}{12} \times \tau_{\text{end}}, \qquad M_{\text{log}} = \max\!\bigl(0,\; D_{\max} - D_{\text{ex}}\bigr)$$

Pour un taux nominal annuel $t_{\text{ann}}$ sur $A$ années ($n = 12 \times A$ mois et taux mensuel $r = t_{\text{ann}} / 12$), le facteur d'amortissement mensuel vaut :

$$f = \frac{r(1 + r)^n}{(1 + r)^n - 1} \qquad \text{(ou } f = \frac{1}{n} \text{ si } r = 0\text{)}$$

La mensualité totale du logement additionne le prêt $(P_{\max} - E) \cdot f$, la taxe foncière mensuelle $P_{\max} \cdot \tau_{\text{fonc}} / 12$, l'assurance habitation ($A_{\text{hab}}$) et la copropriété ($C_{\text{copro}}$). En résolvant pour le prix maximal $P_{\max}$ et l'emprunt $C_{\max}$ :

$$P_{\max} = \frac{M_{\text{log}} - A_{\text{hab}} - C_{\text{copro}} + E \cdot f}{f + \dfrac{\tau_{\text{fonc}}}{12}}, \qquad C_{\max} = P_{\max} - E$$

### Définition des variables en euros (€) ou dollars canadiens (CAD)

* **$R_{\text{ann}}$ et $D_{\text{ex}}$** : revenu annuel du foyer et total mensuel des crédits en cours (auto, étudiant, consommation, pensions versées).
* **$E$** : apport personnel net affecté au prix du bien, après déduction des frais de notaire ou droits de mutation.
* **$t_{\text{ann}}$ et $A$** : taux annuel fixe du crédit (assurance emprunteur incluse en France) et durée d'amortissement en années.
* **$\tau_{\text{fonc}}$, $A_{\text{hab}}$ et $C_{\text{copro}}$** : taux annuel d'impôt foncier rapporté à la valeur du bien, assurance habitation mensuelle et charges mensuelles de copropriété.

## Exemple Chiffré Pas à Pas : Ménage à 72 000 € de Revenus Annuels

Prenons un couple gagnant **72 000 € par an** (**6 000 €/mois**), payant **300 €/mois** de crédit automobile et disposant de **50 000 €** d'apport net (frais de notaire mis à part). Il simule un prêt sur **25 ans** ($n = 300$) à **3,80 %** (assurance comprise), une taxe foncière de **0,80 %/an**, **600 €/an** d'assurance habitation (**50 €/mois**), **120 €/mois** de copropriété et le seuil d'endettement standard de **36 %**.

1. **Mensualité maximale du logement** :
   $$D_{\max} = 6\,000 \times 0{,}36 = 2\,160{,}00\text{ €}, \qquad M_{\text{log}} = 2\,160{,}00 - 300{,}00 = \mathbf{1\,860{,}00\text{ € / mois}}$$
2. **Facteur d'amortissement mensuel** :
   Avec $r = 0{,}038 / 12 \approx 0{,}00316667$ et $(1 + r)^{300} \approx 2{,}581831$, on obtient $f \approx \mathbf{0{,}00516857}$.
3. **Prix maximal et capital emprunté** :
   Le taux mensuel foncier vaut $0{,}008 / 12 \approx 0{,}00066667$ (dénominateur : $0{,}00583524$). Le numérateur vaut $1\,860 - 50 - 120 + 50\,000 \times 0{,}00516857 = 1\,948{,}43\text{ €}$ :
   $$P_{\max} = \frac{1\,948{,}43}{0{,}00583524} = \mathbf{333\,907{,}58\text{ €}}, \qquad C_{\max} = 333\,907{,}58 - 50\,000 = \mathbf{283\,907{,}58\text{ €}}$$
4. **Contrôle de la ventilation mensuelle** :
   Capital et intérêts (**1 467,39 €**) + taxe foncière (**222,61 €**) + assurance (**50,00 €**) + copropriété (**120,00 €**) = **1 860,00 €**. Avec les **300 €** du prêt auto, les charges atteignent **2 160 €**, soit exactement **36,0 %**.

## Sensibilité du Budget Selon les Leviers Financiers

| Scénario Financier (base : 72 000 €/an) | Mensualité Logement | Capital Emprunté | Prix Maximal | Écart vs Référence |
| :--- | :--- | :--- | :--- | :--- |
| **Référence (36 %, 3,80 %, 25 ans)** | 1 860 € | 283 908 € | **333 908 €** | Référence (0 €) |
| **Norme HCSF France (plafond 35 %)** | 1 800 € | 273 625 € | **323 625 €** | **- 10 282 €** |
| **Taux relevé à 4,50 % (+0,70 pt)** | 1 860 € | 266 132 € | **316 132 €** | **- 17 776 €** |
| **Durée ramenée à 20 ans (3,80 %)** | 1 860 € | 250 191 € | **300 191 €** | **- 33 716 €** |
| **Crédit auto soldé (dette = 0 €)** | 2 160 € | 335 319 € | **385 319 €** | **+ 51 412 €** |
| **Apport porté à 80 000 € (+30 000 €)** | 1 860 € | 280 480 € | **360 480 €** | **+ 26 573 €** |

## Normes Francophones et Pièges Classiques d'Acquisition

* **Règles bancaires par pays** : en **France**, le HCSF plafonne l'endettement à **35 %** (assurance emprunteur comprise) et la durée à **25 ans** (27 ans en achat sur plan). En **Belgique**, la Banque nationale limite généralement la quotité empruntée à **90 %**, avec des droits d'enregistrement propres à chaque région. En **Suisse**, il faut au moins **20 %** de fonds propres (dont 10 % hors deuxième pilier) et respecter **33 %** d'endettement calculé sur un taux théorique de **5 %** plus **1 %** d'entretien. Au **Canada et au Québec**, les ratios **ABD (39 %)** et **ATD (44 %)** s'accompagnent du test de résistance fédéral (+2 points ou 5,25 %) et de la prime SCHL sous 20 % de mise de fonds.
* **Isolez les frais d'acquisition et votre épargne de précaution** : déduisez toujours les frais de notaire (7 % à 8 % dans l'ancien en France, taxe de bienvenue au Québec) et conservez 3 à 6 mois de trésorerie avant de renseigner votre apport net.
* **Remboursez les crédits courts en priorité** : solder **300 €/mois** de prêt auto augmente votre budget immobilier de **51 412 €**, un levier supérieur à une hausse équivalente d'apport.
* **Intégrez l'assurance emprunteur** : ajoutez son taux (souvent 0,15 % à 0,45 % en France) au taux nominal du crédit afin d'obtenir une capacité d'achat fidèle aux critères bancaires.
