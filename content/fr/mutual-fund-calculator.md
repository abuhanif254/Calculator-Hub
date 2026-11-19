---
title: "Calculateur de Fonds Communs de Placement"
metaTitle: "Calculateur de Fonds Communs de Placement (OPCVM / FCP)"
description: "Simulez le rendement de vos investissements en fonds communs (OPCVM, SICAV, FCP, ETF) en versement unique ou programmé après déduction des frais."
metaDescription: "Calculez la valeur future de vos placements en OPCVM, FCP ou ETF : comparez versement unique et versements programmés (DCA) et mesurez l'impact des frais."
metaKeywords: "calculateur fonds communs de placement, simulateur OPCVM, rendement SICAV FCP, versements programmes DCA, impact frais de gestion fonds, calcul plus-value fonds"
faqs:
  - question: "Quelle est la différence entre un FCP, une SICAV et un ETF ?"
    answer: "Un Fonds Commun de Placement (FCP) et une Société d'Investissement à Capital Variable (SICAV) sont les deux formes juridiques d'OPCVM en Europe : l'investisseur en SICAV est actionnaire tandis que le porteur de FCP est copropriétaire d'actifs. Un ETF (fonds indiciel coté) est un OPCVM coté en continu en Bourse qui réplique passivement un indice (comme le CAC 40, le MSCI World ou le S&P 500) avec des frais de gestion cinq à dix fois inférieurs à ceux d'un fonds actif."
  - question: "Comment les frais courants d'un fonds commun sont-ils prélevés sur mon épargne ?"
    answer: "Les frais de gestion annuels (ou ratio des frais de gestion — RFG au Canada) ne font pas l'objet d'un prélèvement visible sur votre compte espèces : ils sont déduits quotidiennement, au prorata temporis (1/365e par jour), directement de la valeur liquidative (VL) de la part du fonds. La performance affichée par la valeur liquidative est donc toujours nette des frais internes du fonds."
  - question: "Faut-il privilégier un versement unique (Lump Sum) ou des versements programmés (DCA) ?"
    answer: "Statistiquement, sur des marchés haussiers à long terme, investir une somme disponible en une seule fois (versement unique) surperforme l'étalement dans deux tiers des cas car le capital travaille immédiatement à 100 %. En revanche, les versements programmés mensuels (Dollar-Cost Averaging) lissent le prix de revient unitaire de vos parts, éliminent le risque d'investir au plus haut la veille d'un krach et s'adaptent parfaitement à l'épargne salariale mensuelle."
  - question: "Pourquoi choisir des parts de capitalisation (Part C) plutôt que de distribution (Part D) ?"
    answer: "Un fonds à part de capitalisation (C) réinvestit automatiquement et intégralement les dividendes ou coupons perçus à l'intérieur même du portefeuille, sans passer par votre compte espèces. Sur un compte-titres ordinaire, cela évite de déclencher une imposition annuelle (comme la flat tax de 30 % en France) sur les revenus distribués et maximise l'effet boule de neige des intérêts composés."
  - question: "Les frais de gestion de mon assurance-vie s'ajoutent-ils à ceux de l'OPCVM ?"
    answer: "Oui. Lorsque vous logez un OPCVM ou un ETF en unités de compte au sein d'un contrat d'assurance-vie ou d'un PER, vous supportez deux couches de frais annuels : les frais internes du fonds (prélevés sur la valeur liquidative, par exemple 1,60 %) ET les frais de gestion de l'enveloppe d'assurance (prélevés par diminution du nombre de parts détenues, souvent entre 0,50 % et 0,90 % par an)."
---

## Évaluer la performance nette d'un portefeuille de fonds (OPCVM, SICAV, FCP et ETF)

L'investissement collectif à travers des **Organismes de Placement Collectif en Valeurs Mobilières (OPCVM)** — qu'il s'agisse de Fonds Communs de Placement (FCP), de SICAV en Europe, de fonds communs de placement au Canada ou de fonds indiciels cotés (ETF) — permet d'accéder à un portefeuille diversifié d'actions ou d'obligations avec une mise de départ accessible.

Toutefois, la projection réaliste d'un patrimoine investi en fonds ne peut se limiter au rendement brut des marchés financiers. Deux paramètres structurels déterminent la valeur finale réellement perçue par l'épargnant : la **cadence d'alimentation** (versement initial unique combiné ou non à des versements programmés mensuels) et la **structure des frais** (droits d'entrée sur versement et frais de gestion annuels récurrents consignés dans le Document d'Informations Clés — DIC).

## Équations de capitalisation : versement unique, versements programmés et impact des frais

Pour modéliser la valeur liquidative totale acquise au terme de $N$ années ($n = 12N$ mois), il convient d'abord d'isoler le rendement annuel net de frais courants :

$$r_{\text{net}} = r_{\text{brut}} - f_g$$

où $r_{\text{brut}}$ désigne la performance annuelle brute des actifs du fonds et $f_g$ le taux annuel total des frais de gestion (frais internes du fonds majorés, le cas échéant, des frais de tenue d'enveloppe). En présence de frais d'entrée sur versement $f_e$, seule la fraction $(1 - f_e)$ de chaque apport achète effectivement des parts.

### 1. Valeur acquise par le versement initial unique ($VF_{\text{unique}}$)
Pour un capital initial $C_0$ investi dès le premier jour avec capitalisation mensuelle au taux périodique $i_m = \frac{r_{\text{net}}}{12}$ :

$$VF_{\text{unique}} = C_0 \times (1 - f_e) \times (1 + i_m)^n$$

### 2. Valeur acquise par les versements programmés mensuels ($VF_{\text{prog}}$)
Pour un versement mensuel constant $V_m$ exécuté en début de mois pendant $n$ mois :

$$VF_{\text{prog}} = V_m \times (1 - f_e) \times \frac{(1 + i_m)^n - 1}{i_m} \times (1 + i_m)$$

Le patrimoine final total correspond à la somme des deux poches : $VF_{\text{totale}} = VF_{\text{unique}} + VF_{\text{prog}}$.

## Étude de cas chiffrée : fonds actif chargé en frais contre fonds indiciel (ETF) sur 20 ans

Imaginons un investisseur qui place un capital initial de **$20\,000\text{ €}$** ($C_0$) et programme un achat mensuel automatique de **$300\text{ €}$ par mois** ($V_m$) pendant **20 ans** ($n = 240\text{ mois}$). Le total des sommes versées de sa poche s'élève à $20\,000 + (300 \times 240) = \mathbf{92\,000\text{ €}}$. Le marché actions mondial sous-jacent délivre un rendement brut annuel de **$8{,}00\,\%$** ($r_{\text{brut}}$). Comparons deux supports investis sur ce même marché :

### Option A : Fonds indiciel (ETF) sans frais d'entrée ($f_e = 0\,\%$) et à $0{,}20\,\%$ de frais annuels
* Rendement annuel net : $r_{\text{net}} = 8{,}00\,\% - 0{,}20\,\% = 7{,}80\,\%$, soit un taux mensuel $i_m = \frac{0{,}078}{12} = 0{,}0065$ ($0{,}65\,\%$).
* Croissance du capital initial de $20\,000\text{ €}$ :
  $$VF_{\text{unique}} = 20\,000 \times (1{,}0065)^{240} = 20\,000 \times 4{,}734886 = 94\,697{,}72\text{ €}$$
* Croissance des 240 mensualités de $300\text{ €}$ :
  $$VF_{\text{prog}} = 300 \times \frac{4{,}734886 - 1}{0{,}0065} \times 1{,}0065 = 300 \times 578{,}3327 = 173\,499{,}80\text{ €}$$
* **Capital final acquis (Option A) :** $94\,697{,}72 + 173\,499{,}80 = \mathbf{268\,197{,}52\text{ €}}$ (soit $176\,197{,}52\text{ €}$ de gains nets).

### Option B : OPCVM bancaire classique avec $2{,}00\,\%$ de frais d'entrée et $2{,}00\,\%$ de frais de gestion annuels
* Rendement annuel net : $r_{\text{net}} = 8{,}00\,\% - 2{,}00\,\% = 6{,}00\,\%$, soit $i_m = \frac{0{,}06}{12} = 0{,}005$ ($0{,}50\,\%$).
* Après $2\,\%$ de droits d'entrée, le capital initial investi n'est plus que de $19\,600\text{ €}$ et chaque mensualité nette tombe à $294\text{ €}$.
* Croissance du capital initial : $19\,600 \times (1{,}005)^{240} = 19\,600 \times 3{,}310204 = 64\,880{,}01\text{ €}$.
* Croissance des mensualités : $294 \times \frac{3{,}310204 - 1}{0{,}005} \times 1{,}005 = 294 \times 464{,}3511 = 136\,519{,}22\text{ €}$.
* **Capital final acquis (Option B) :** $64\,880{,}01 + 136\,519{,}22 = \mathbf{201\,399{,}23\text{ €}}$.

**Conclusion mathématique :** Une différence apparemment mineure de $1{,}80\,\%$ sur les frais de gestion annuels et de $2\,\%$ à l'entrée ampute le patrimoine final de **$66\,798{,}29\text{ €}$**, soit plus des deux tiers de la totalité des sommes versées par l'épargnant.

## Tableau comparatif : évolution d'un versement programmé de 400 € par mois

Ce tableau indique le capital accumulé (en euros, sans frais d'entrée) pour un investissement programmé de **$400\text{ €}$ par mois** selon la durée de détention et la classe d'actifs du fonds :

| Horizon de placement | Cumul des versements | Fonds Obligataire (3,60 % net/an) | Fonds Équilibré (6,00 % net/an) | Fonds Actions (8,40 % net/an) |
| :--- | :--- | :--- | :--- | :--- |
| **10 ans (120 mois)** | 48 000 € | 57 863 € | 65 879 € | 75 343 € |
| **15 ans (180 mois)** | 72 000 € | 95 525 € | 116 909 € | 144 586 € |
| **20 ans (240 mois)** | 96 000 € | 140 614 € | 185 740 € | 248 655 € |
| **25 ans (300 mois)** | 120 000 € | 194 597 € | 278 584 € | 405 153 € |

## Points de vigilance pour sélectionner et loger vos fonds

* **Traquer les commissions de surperformance :** Outre les frais de gestion fixes, certains OPCVM actifs prélèvent une commission de surperformance (souvent $15\,\%$ à $20\,\%$ de la performance excédant leur indice de référence). Vérifiez dans le DIC que le fonds applique une clause de *High-Water Mark*, interdisant de facturer une surperformance tant que les pertes des années précédentes n'ont pas été intégralement effacées.
* **Optimiser l'enveloppe fiscale de détention :** En France, loger des fonds actions éligibles ou des ETF au sein d'un Plan d'Épargne en Actions (PEA) permet d'être exonéré d'impôt sur le revenu sur les plus-values après 5 ans (seuls les prélèvements sociaux de $17{,}2\,\%$ restent dus), contre une *flat tax* (PFU) de $30\,\%$ sur un compte-titres ordinaire. Au Canada, priorisez systématiquement le CELI et le REER avant tout compte non enregistré.
* **Éviter la fausse diversification :** Détenir cinq fonds communs commercialisés par la même banque qui investissent tous dans les grandes capitalisations européennes ou américaines ne réduit pas votre risque : comparez l'exposition géographique réelle et les dix premières lignes de chaque fonds avant de souscrire.
