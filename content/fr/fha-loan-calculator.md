---
title: "Calculateur de Prêt FHA"
metaTitle: "Calculateur de Prêt FHA : Mensualité et Assurance MIP"
description: "Estimez la mensualité complète d'un prêt hypothécaire FHA : capital amorti, intérêts, prime d'assurance hypothécaire initiale et annuelle (MIP), impôts fonciers et assurance habitation."
metaDescription: "Estimez vos mensualités de prêt hypothécaire FHA avec apport dès 3,5 %, prime d'assurance initiale (1,75 %), prime annuelle, taxes foncières et charges."
metaKeywords: "calculateur de prêt fha, prêt hypothécaire fha, assurance mip fha, prime initiale 1,75 %, calcul hypothèque états-unis, tableau d'amortissement fha, TAEG prêt fha"
faqs:
  - question: "Comment fonctionnent la prime d'assurance initiale de 1,75 % et la prime annuelle sur un prêt FHA ?"
    answer: "Tout emprunteur FHA s'acquitte d'une double assurance hypothécaire obligatoire (sigle MIP). La prime initiale, fixée à 1,75 % du prêt de base, est généralement intégrée directement au capital financé plutôt que réglée comptant à la signature. S'y ajoute une prime annuelle — couramment 0,55 % pour un emprunt de 30 ans avec 3,5 % d'apport — divisée par 12 et prélevée chaque mois avec votre mensualité."
  - question: "Peut-on supprimer l'assurance hypothécaire FHA une fois atteint 20 % de fonds propres ?"
    answer: "Non, c'est une différence majeure face à un crédit conventionnel. Lorsque votre apport initial est inférieur à 10 %, la prime annuelle FHA demeure exigible pendant toute la durée du prêt (jusqu'à 30 ans), même si votre solde descend sous 80 % de la valeur du logement. Avec un apport d'au moins 10 %, elle s'arrête automatiquement après 11 ans. Pour la supprimer plus tôt, il faut refinancer le solde vers un prêt conventionnel."
  - question: "Quel score de crédit et quel apport minimal sont exigés pour obtenir un prêt FHA ?"
    answer: "Les directives fédérales autorisent un apport minimal de 3,5 % du prix d'achat à partir d'un score de crédit américain de 580. Entre 500 et 579, le programme reste accessible mais impose un apport d'au moins 10 %. Certaines banques agréées appliquent toutefois des exigences internes légèrement supérieures, souvent autour de 600 à 620."
  - question: "Pourquoi la prime annuelle FHA se calcule-t-elle sur le prêt de base et non sur le capital total financé ?"
    answer: "Conformément à la réglementation de l'administration fédérale du logement, l'assiette de la prime annuelle correspond au montant du prêt de base (prix d'achat moins apport), et non au capital majoré de la prime initiale de 1,75 %. En revanche, les intérêts de votre tableau d'amortissement portent bien sur le capital total financé, prime initiale comprise."
  - question: "Un résident francophone (France, Belgique, Suisse ou Canada) peut-il obtenir un prêt FHA aux États-Unis ?"
    answer: "Le prêt FHA est exclusivement réservé à l'acquisition d'une résidence principale située aux États-Unis par une personne disposant d'un numéro de sécurité sociale américain, d'un statut légal de résidence (citoyen, résident permanent ou visa de travail admissible) et d'un historique de crédit local. Un acheteur résidant hors des États-Unis pour un pied-à-terre ou un bien locatif doit recourir à un financement classique ou spécialisé."
---

Garanti par l'administration fédérale américaine du logement (**FHA**), le **prêt hypothécaire FHA** constitue la principale voie d'accession à la propriété aux États-Unis pour les primo-accédants, les expatriés francophones installés sur place ou les ménages disposant d'une épargne initiale réduite. Il autorise un apport dès **3,5 %** et accepte des critères de crédit plus souples que les prêts conventionnels.

En contrepartie de cette garantie publique, l'emprunteur paie une **double prime d'assurance hypothécaire** (sigle **MIP** dans les contrats américains) qui modifie le capital emprunté, la mensualité et le **TAEG** (taux annuel effectif global). Notre **Calculateur de Prêt FHA** détaille cette mécanique pour évaluer votre charge mensuelle globale.

## Équations du Prêt FHA et Calcul de l'Assurance Hypothécaire

Contrairement à un crédit classique où l'assurance reste séparée du capital, le prêt FHA capitalise la prime initiale dans le montant amorti tout en calculant la prime annuelle sur le prêt de base.

Pour un prix d'achat $P$ (en dollars américains `$`), un apport $E$ et un taux de prime initiale $\tau_{\text{init}}$ (standard $1{,}75\,\%$), le prêt de base ($C_{\text{base}}$), la prime initiale ($P_{\text{init}}$) et le capital financé ($C_{\text{tot}}$) valent :

$$C_{\text{base}} = \max(0,\, P - E), \qquad P_{\text{init}} = C_{\text{base}} \times \tau_{\text{init}}, \qquad C_{\text{tot}} = C_{\text{base}} + P_{\text{init}}$$

Avec un taux fixe annuel $t_{\text{ann}}$ ($r = t_{\text{ann}}/12$) sur $A$ années ($n = 12A$ mois) et une prime annuelle $\tau_{\text{ann}}$, l'échéance amortissable ($M_{CI}$) et l'assurance mensuelle ($M_{\text{ass}}$) s'écrivent :

$$M_{CI} = C_{\text{tot}} \times \frac{r(1 + r)^n}{(1 + r)^n - 1}, \qquad M_{\text{ass}} = \frac{C_{\text{base}} \times \tau_{\text{ann}}}{12}$$

La mensualité globale (compte séquestre inclus) additionne impôts fonciers annuels ($T_{\text{fonc}}$), assurance habitation annuelle ($A_{\text{hab}}$) et charges de copropriété mensuelles ($C_{\text{copro}}$) :

$$M_{\text{globale}} = M_{CI} + M_{\text{ass}} + \frac{T_{\text{fonc}}}{12} + \frac{A_{\text{hab}}}{12} + C_{\text{copro}}$$

### Définition des composantes du calcul

* **$C_{\text{base}}$ et $C_{\text{tot}}$** : capital emprunté avant puis après intégration de la prime initiale de $1{,}75\,\%$.
* **$\tau_{\text{init}}$ et $\tau_{\text{ann}}$** : taux de prime initiale et taux de prime annuelle (barème de $0{,}15\,\%$ à $0{,}75\,\%$ selon la durée et l'apport).
* **$T_{\text{fonc}}$, $A_{\text{hab}}$ et $C_{\text{copro}}$** : taxes foncières annuelles, assurance multirisque habitation annuelle et copropriété mensuelle.

## Exemple Chiffré Pas à Pas : Acquisition à 320 000 $ avec 3,5 % d'Apport

Prenons un ménage francophone résidant aux États-Unis achetant sa résidence principale **320 000 $** (environ **295 000 €** selon le cours de change), avec **3,5 % d'apport** (**11 200 $**), un taux fixe de **6,25 %** sur **30 ans** ($n = 360$), une prime initiale de **1,75 %**, une prime annuelle de **0,55 %**, **3 600 $/an** d'impôts fonciers, **1 440 $/an** d'assurance habitation et 0 $ de copropriété.

1. **Prêt de base et prime initiale** : $C_{\text{base}} = 320\,000 - 11\,200 = \mathbf{308\,800\text{ \$}}$, $P_{\text{init}} = 308\,800 \times 0{,}0175 = \mathbf{5\,404\text{ \$}}$, d'où $C_{\text{tot}} = \mathbf{314\,204\text{ \$}}$.
2. **Mensualité capital et intérêts** : avec $r = 0{,}0625 / 12 \approx 0{,}00520833$ et $(1 + r)^{360} \approx 6{,}489166$,
   $$M_{CI} = 314\,204 \times \frac{0{,}00520833 \times 6{,}489166}{6{,}489166 - 1} = \mathbf{1\,934{,}61\text{ \$/mois}}$$
   La capitalisation de la prime initiale (5 404 $) majore l'échéance de **33,27 $/mois** et ajoute **6 574 $ d'intérêts** sur 30 ans.
3. **Assurance mensuelle et compte séquestre** : $M_{\text{ass}} = (308\,800 \times 0{,}0055) / 12 = \mathbf{141{,}53\text{ \$/mois}}$, taxes foncières **300,00 $/mois**, assurance habitation **120,00 $/mois**.
4. **Mensualité globale** : $1\,934{,}61 + 141{,}53 + 300{,}00 + 120{,}00 = \mathbf{2\,496{,}14\text{ \$/mois}}$. Sur 30 ans, le cumul capital plus intérêts atteint **696 458,91 $** (dont **382 254,91 $ d'intérêts**).

## Barème Comparatif des Scénarios FHA Selon l'Apport et la Durée

Pour ce logement de **320 000 $** (taxes 300 $/mois, assurance 120 $/mois, taux indicatif 5,75 % sur 15 ans contre 6,25 % sur 30 ans) :

|Scénario FHA|Apport|Prime Ann.|Capital Financé|Capital+Intérêts|Assurance/Mois|Mensualité Globale|Durée Prime|
|:---|:---|:---|:---|:---|:---|:---|:---|
|**30 ans — Apport 3,5 %**|11 200 $|0,55 %|314 204 $|1 934,61 $|141,53 $|**2 496,14 $**|Toute la durée (30 ans)|
|**30 ans — Apport 5,0 %**|16 000 $|0,50 %|309 320 $|1 904,54 $|126,67 $|**2 451,20 $**|Toute la durée (30 ans)|
|**30 ans — Apport 10,0 %**|32 000 $|0,50 %|293 040 $|1 804,30 $|120,00 $|**2 344,30 $**|**11 ans puis 0 $**|
|**15 ans — Apport 3,5 %**|11 200 $|0,40 %|314 204 $|2 609,18 $|102,93 $|**3 132,12 $**|Toute la durée (15 ans)|
|**15 ans — Apport 10,0 %**|32 000 $|0,15 %|293 040 $|2 433,43 $|36,00 $|**2 889,43 $**|**11 ans puis 0 $**|

## Règles d'Éligibilité et Pièges Coûteux à Anticiper

* **Anticiper le seuil décisif des 10 % d'apport** : Sous 10 % de mise de fonds, la prime annuelle reste facturée jusqu'à la fin du tableau d'amortissement, contrairement à un prêt conventionnel dont l'assurance cesse à 20 % de fonds propres. Si vous achetez avec 3,5 % d'apport, planifiez un refinancement conventionnel dès que votre fonds propre atteint 20 %.
* **Comparer le TAEG réel plutôt que le taux nominal** : Un prêt FHA affiche souvent un taux nominal inférieur de 0,25 à 0,50 point à une offre classique. Cependant, une fois les primes de 1,75 % et 0,55 % intégrées au **TAEG**, un emprunteur au score supérieur à 720 obtient fréquemment un coût global plus avantageux en crédit conventionnel.
* **Vérifier les plafonds locaux, le taux d'endettement et l'inspection** : Chaque comté américain fixe un plafond d'emprunt révisé chaque année, tandis que le ratio d'endettement logement vise généralement 31 % et le ratio total 43 % (parfois jusqu'à 50 % avec dossiers compensatoires). Le logement doit servir de résidence principale (occupation sous 60 jours) et passer une expertise stricte de sécurité et d'habitabilité.
* **Distinguer les dispositifs francophones et gérer le change** : Le prêt FHA ne s'applique ni en Europe ni au Canada (où existent l'assurance **SCHL** au Canada et le **PTZ** en France). Si vous transférez votre apport depuis la zone euro (`EUR €`) ou la Suisse (`CHF`), anticipez les frais de change et les frais de clôture locaux (2 % à 5 % du prix).
