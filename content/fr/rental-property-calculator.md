---
title: "Calculateur de Propriété Locative"
metaTitle: "Calculateur de Propriété Locative : Rendement et Flux"
description: "Évaluez la rentabilité réelle d'un investissement locatif en calculant le revenu net d'exploitation, le flux de trésorerie mensuel, le taux de capitalisation et le rendement sur fonds propres."
metaDescription: "Analysez la rentabilité de votre investissement locatif : revenu net d'exploitation, flux de trésorerie mensuel, taux de capitalisation et fonds propres."
metaKeywords: "calculateur de propriété locative, investissement locatif, rentabilité locative, flux de trésorerie immobilier, revenu net d'exploitation, taux de capitalisation, rendement sur fonds propres, tableau d'amortissement"
faqs:
  - question: "Quelle différence distingue le rendement brut, le taux de capitalisation et le rendement sur fonds propres ?"
    answer: "Le rendement brut divise simplement le loyer annuel par le prix d'achat, sans aucune charge. Le taux de capitalisation rapporte le revenu net d'exploitation (loyers encaissés moins vacance et charges d'exploitation) au prix du bien, ce qui permet de comparer deux biens indépendamment du crédit. Le rendement sur fonds propres divise enfin le flux de trésorerie annuel net de crédit par votre apport engagé afin de mesurer l'efficacité réelle de l'effet de levier."
  - question: "Pourquoi le revenu net d'exploitation exclut-il la mensualité du crédit immobilier ?"
    answer: "Le revenu net d'exploitation évalue la performance intrinsèque de l'immeuble, indépendamment de la manière dont l'acquéreur le finance. Deux investisseurs achetant le même appartement — l'un au comptant, l'autre avec 80 % d'emprunt — obtiennent exactement le même revenu net d'exploitation et le même taux de capitalisation, mais des flux de trésorerie mensuels très différents."
  - question: "Comment estimer de façon réaliste la vacance locative et le budget d'entretien annuel ?"
    answer: "En zone tendue, une vacance locative de 3 % à 5 % (environ deux semaines par an pour les changements de locataire) constitue un socle prudent, contre 7 % à 10 % dans les marchés moins liquides ou étudiants. Pour l'entretien courant et les remplacements d'équipements, provisionnez entre 0,5 % et 1 % de la valeur du bien par an pour un appartement récent, et jusqu'à 1,5 % pour un immeuble ancien."
  - question: "Faut-il intégrer les frais de notaire et travaux initiaux dans le capital réellement investi ?"
    answer: "Oui. Le calculateur rapporte par défaut le flux annuel à votre apport initial sur le prix du bien, mais dans la réalité vos liquidités mobilisées incluent aussi les frais d'acquisition (7 % à 8 % dans l'ancien en France, droits d'enregistrement en Belgique, droits de mutation au Québec) ainsi que les travaux de remise en état et l'ameublement. Ajouter ces sommes au capital investi évite de surestimer votre rentabilité."
  - question: "Un flux de trésorerie légèrement négatif signifie-t-il que l'investissement locatif est perdant ?"
    answer: "Pas nécessairement. Un flux mensuel négatif (effort d'épargne) indique uniquement que les loyers nets ne couvrent pas à eux seuls la mensualité de crédit. Or chaque échéance du tableau d'amortissement rembourse une part croissante de capital qui enrichit votre patrimoine net. L'essentiel est de vérifier que cet effort mensuel reste soutenable sur toute la durée du prêt et cohérent avec le potentiel de valorisation du secteur."
---

Évaluer un bien locatif à partir de son seul rendement brut conduit presque toujours à surestimer sa rentabilité réelle. Entre la **vacance locative**, la taxe foncière, l'assurance propriétaire non occupant, les provisions d'entretien, les frais de gestion déléguée et les charges de copropriété non récupérables, **25 % à 35 % des loyers bruts** s'évaporent avant le paiement de la première échéance bancaire.

Notre **Calculateur de Propriété Locative** croise vos paramètres d'emprunt et l'ensemble des flux d'exploitation pour restituer quatre indicateurs décisifs : le **revenu net d'exploitation (RNE)**, le **flux de trésorerie mensuel**, le **taux de capitalisation** et le **rendement sur fonds propres**.

## Équations Financières de la Rentabilité Locative

L'analyse d'un actif locatif suit trois blocs mathématiques exprimés en **euros (€)**. Pour un prix d'acquisition $P$, un apport initial $E$, un emprunt $C = \max(0,\, P - E)$, un taux annuel $t_{\text{ann}}$ ($r = t_{\text{ann}}/12$) et $A$ années ($n = 12A$ mois), la mensualité fixe vaut :

$$M_{\text{crédit}} = C \times \frac{r(1 + r)^n}{(1 + r)^n - 1} \qquad \text{(ou } M_{\text{crédit}} = \frac{C}{n} \text{ si } r = 0\text{)}$$

À partir du loyer mensuel brut ($L$) et du taux de vacance ($v$), le revenu encaissé effectif ($R_{\text{eff}}$) et les charges d'exploitation mensuelles ($D_{\text{exp}}$) s'écrivent :

$$R_{\text{eff}} = L \times (1 - v), \qquad D_{\text{exp}} = \frac{T_{\text{fonc}} + A_{\text{PNO}} + M_{\text{ent}}}{12} + (L \times g) + C_{\text{copro}}$$

On en déduit le revenu net d'exploitation annuel, le flux mensuel net de crédit, le taux de capitalisation et le rendement des liquidités engagées :

$$\text{RNE}_{\text{ann}} = 12 \times (R_{\text{eff}} - D_{\text{exp}}), \qquad F_m = (R_{\text{eff}} - D_{\text{exp}}) - M_{\text{crédit}}$$

$$\tau_{\text{cap}} = \frac{\text{RNE}_{\text{ann}}}{P} \times 100, \qquad \tau_{\text{fp}} = \frac{12 \times F_m}{E} \times 100$$

### Définition des paramètres d'exploitation

* **$T_{\text{fonc}}$, $A_{\text{PNO}}$ et $M_{\text{ent}}$** : taxe foncière annuelle, assurance propriétaire non occupant et budget annuel d'entretien courant.
* **$g$ et $C_{\text{copro}}$** : honoraires d'agence appliqués au loyer brut et quote-part mensuelle de charges de copropriété non récupérables.
* **$\tau_{\text{cap}}$ et $\tau_{\text{fp}}$** : rendement net avant financement et rendement annuel sur fonds propres mobilisés.

## Exemple Chiffré Pas à Pas : Bien Locatif à 200 000 €

Prenons un lot divisé en deux studios meublés acquis **200 000 €** avec **40 000 € d'apport** (**20 %**), financé par un emprunt de **160 000 €** à **3,60 %** sur **20 ans** ($n = 240$). Le loyer brut atteint **1 500 €/mois** (**9,00 %** brut), avec **5 %** de vacance, **1 200 €/an** de taxe foncière, **240 €/an** d'assurance PNO, **1 200 €/an** d'entretien, **8 %** de gestion déléguée et **60 €/mois** de copropriété non récupérable.

1. **Mensualité du crédit** : avec $r = 0{,}003$ et $(1{,}003)^{240} \approx 2{,}052220$,
   $$M_{\text{crédit}} = 160\,000 \times \frac{0{,}003 \times 2{,}052220}{2{,}052220 - 1} = \mathbf{936{,}18\text{ €/mois}}$$
2. **Revenu effectif après vacance** : $1\,500 - 75 = \mathbf{1\,425{,}00\text{ €/mois}}$.
3. **Charges d'exploitation** : taxe foncière (100 €) + assurance (20 €) + entretien (100 €) + gestion (120 €) + copropriété (60 €) $= \mathbf{400{,}00\text{ €/mois}}$.
4. **RNE et taux de capitalisation** : $\text{RNE}_m = 1\,425 - 400 = 1\,025\text{ €/mois}$, soit **12 300 €/an**, d'où $\tau_{\text{cap}} = 12\,300 / 200\,000 = \mathbf{6{,}15\,\%}$ (un recul de 2,85 points par rapport au brut).
5. **Flux de trésorerie et enrichissement patrimonial** : $F_m = 1\,025{,}00 - 936{,}18 = \mathbf{+88{,}82\text{ €/mois}}$ (+1 065,86 €/an exact), soit $\tau_{\text{fp}} = 1\,065{,}86 / 40\,000 = \mathbf{2{,}66\,\%}$. De plus, dès la première année du **tableau d'amortissement**, les loyers remboursent **5 565,37 €** de capital, portant l'enrichissement annuel total avant impôt à **6 631,23 €**.

## Comparatif de Scénarios de Financement et d'Exploitation

Sur ce bien de **200 000 €** loué **1 500 €/mois**, chaque paramètre modifie sensiblement la trésorerie :

|Scénario d'Investissement|RNE Annuel|Mensualité|Flux Mensuel|Taux Cap.|Rend. Fonds Propres|
|:---|:---|:---|:---|:---|:---|
|**Référence (gestion 8 %, 20 ans, 3,60 %)**|12 300 €|936,18 €|**+88,82 €**|6,15 %|**2,66 %**|
|**Autogestion (frais de gestion 0 %)**|13 740 €|936,18 €|**+208,82 €**|6,87 %|**6,26 %**|
|**Crédit allongé à 25 ans (taux 3,80 %)**|12 300 €|826,97 €|**+198,03 €**|6,15 %|**5,94 %**|
|**Apport porté à 30 % (60 000 €)**|12 300 €|819,16 €|**+205,84 €**|6,15 %|**4,12 %**|
|**Vacance 10 % et taux relevé à 4,50 %**|11 400 €|1 012,24 €|**-62,24 €**|5,70 %|**-1,87 %**|

Le taux de capitalisation demeure identique (6,15 %) quelles que soient la durée ou la mise de fonds. En revanche, porter l'apport à **60 000 €** abaisse le rendement sur fonds propres à **4,12 %** face au crédit sur 25 ans (**5,94 %**), illustrant la dilution de l'effet de levier bancaire.

## Pièges Fréquents et Spécificités Fiscales Francophones

* **Intégrer le TAEG complet et les frais d'acquisition** : Ajoutez au taux nominal l'assurance emprunteur et les garanties du **TAEG**, puis additionnez aux liquidités engagées les **frais de notaire** (7 % à 8 % dans l'ancien en France), les **droits d'enregistrement** régionaux en Belgique ou la taxe de bienvenue au Québec afin de mesurer votre rendement sur capital réellement immobilisé.
* **Mesurer la fiscalité après exploitation** : Tous les ratios affichés s'entendent avant impôt. En **France**, l'écart entre location nue (micro-foncier ou régime réel soumis au barème plus 17,2 % de prélèvements sociaux) et location meublée (LMNP au réel avec amortissement comptable) transforme radicalement le flux net. En **Belgique**, l'imposition s'appuie sur le revenu cadastral indexé et le précompte immobilier ; en **Suisse**, les loyers nets s'intègrent au revenu cantonal et fédéral ; au **Canada**, les intérêts et frais d'exploitation demeurent déductibles.
* **Isoler les charges propriétaires et le risque énergétique** : Ne saisissez en copropriété que la fraction non récupérable (syndic, assurance immeuble, fonds travaux) et vérifiez les obligations de performance énergétique (**DPE** en France, certificat **PEB** en Belgique) avant toute offre. Prévoyez également une garantie loyers impayés si votre trésorerie reste tendue et testez toujours un scénario dégradé (vacance à 10 % et hausse de taux) pour valider la solidité de votre projet.
