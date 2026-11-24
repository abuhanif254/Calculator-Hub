---
title: "Calculateur de Dépôt à Terme (DAT)"
metaTitle: "Calculateur de Dépôt à Terme (DAT) : Intérêts et Échelle"
description: "Calculez le capital final, les intérêts bruts et le pouvoir d'achat réel d'un dépôt à terme (DAT/CAT/CPG), simulez les pénalités de sortie anticipée et planifiez votre échelle d'échéances."
metaDescription: "Simulez le rendement de votre dépôt à terme (DAT/CAT/CPG) : capital à échéance, pénalité de retrait anticipé, inflation et échelle de placements."
metaKeywords: "calculateur dépôt à terme, compte à terme, simulateur DAT, certificat de placement garanti, CPG, échelle de DAT, pénalité retrait anticipé, taux actuariel"
faqs:
  - question: "Quelle est la différence entre le taux actuariel annuel et le taux nominal d'un dépôt à terme ?"
    answer: "Le taux actuariel annuel (ou rendement annuel effectif) intègre déjà l'effet de la capitalisation des intérêts au fil de l'année, ce qui permet de comparer directement deux banques sur une base identique. Le taux nominal est le taux contractuel de base avant composition : pour un taux actuariel de 3,60 % capitalisé mensuellement, le taux nominal équivalent s'établit à 3,5419 %."
  - question: "Comment fonctionnent les pénalités de retrait anticipé sur un compte à terme (DAT/CAT) ou un CPG ?"
    answer: "En France, les comptes à terme autorisent généralement un déblocage anticipé sous préavis réglementaire de 32 jours calendaires, assorti d'une minoration contractuelle du taux (et souvent d'aucune rémunération durant le premier mois). Dans d'autres contrats (notamment en Amérique du Nord ou en Suisse), la banque retient un nombre fixe de mois d'intérêts ou un pourcentage du capital : si le retrait intervient très tôt, cette pénalité peut même entamer le dépôt initial."
  - question: "Pourquoi construire une échelle de dépôts à terme plutôt que de bloquer tout son capital sur une seule échéance ?"
    answer: "L'échelle de dépôts à terme consiste à fractionner votre capital entre plusieurs maturités échelonnées (par exemple 1, 2, 3, 4 et 5 ans). Chaque année, une tranche arrive à échéance et vous offre une liquidité sans pénalité — ou peut être réinvestie au taux long du moment — tout en conservant un rendement moyen proche des durées longues."
  - question: "Comment les intérêts d'un dépôt à terme sont-ils imposés en France, en Belgique, en Suisse et au Canada ?"
    answer: "En France, les intérêts bruts d'un DAT ou d'un compte à terme subissent par défaut le prélèvement forfaitaire unique (PFU) de 30 % (12,8 % d'impôt sur le revenu et 17,2 % de prélèvements sociaux), sauf option globale pour le barème progressif. En Belgique, le précompte mobilier libératoire s'élève également à 30 %. En Suisse, les intérêts sont imposés comme revenu (avec impôt anticipé de 35 % récupérable). Au Canada, ils s'ajoutent au revenu imposable sauf si le CPG est détenu dans un CELI ou un REER."
  - question: "Quelle protection couvre mon capital sur un dépôt à terme en cas de défaillance bancaire ?"
    answer: "Les dépôts à terme ouverts dans un établissement agréé bénéficient de la garantie légale des dépôts : jusqu'à 100 000 € par déposant et par banque en France (FGDR) et en Belgique (Fonds de garantie), jusqu'à 100 000 CHF par client en Suisse (esisuisse), et jusqu'à 100 000 CAD par catégorie d'assurance au Canada (SADC ou Autorité des marchés financiers au Québec)."
---

Pour placer une trésorerie destinée à un projet daté (apport immobilier, fiscalité, excédent d'entreprise) sans subir la volatilité boursière, le **Dépôt à Terme (DAT)** — appelé **Compte à Terme (CAT)** en France et en Belgique, ou **Certificat de Placement Garanti (CPG)** au Canada — garantit dès l'ouverture un taux fixé d'avance en échange d'une immobilisation temporaire.

Notre **calculateur de dépôt à terme** détermine votre capital à l'échéance, convertit le taux actuariel annuel en taux nominal périodique, mesure l'effet de l'inflation, estime le coût d'un **retrait anticipé**, compare deux offres bancaires et planifie votre **échelle de DAT** en euros (`€`), francs suisses (`CHF`) ou dollars canadiens (`CAD`).

## Formules du Rendement Actuariel, de l'Inflation et des Pénalités

À partir du dépôt initial $P$, du **taux actuariel annuel brut** $r_{\text{eff}}$, de la fréquence de capitalisation ($n$ périodes/an : $12$ mensuelle, $4$ trimestrielle, $1$ annuelle) et d'une durée de $M$ mois ($t = M / 12$ ans), le taux nominal annuel équivalent $r_{\text{nom}}$ vérifie :

$$r_{\text{eff}} = \left(1 + \frac{r_{\text{nom}}}{n}\right)^n - 1 \qquad \Longleftrightarrow \qquad r_{\text{nom}} = n\left[(1 + r_{\text{eff}})^{1/n} - 1\right]$$

La valeur brute à échéance $V_f$ et les intérêts bruts $I_{\text{brut}}$ s'écrivent alors :

$$V_f = P\left(1 + \frac{r_{\text{nom}}}{n}\right)^{nt} = P(1 + r_{\text{eff}})^{M/12} \qquad I_{\text{brut}} = V_f - P$$

* **$P$** : capital immobilisé à l'ouverture (`€`, `CHF` ou `CAD`).
* **$r_{\text{eff}}$ et $r_{\text{nom}}$** : taux actuariel annuel (après capitalisation) et taux nominal correspondant.
* **$M$ et $t$** : durée du blocage en mois et en années ($t = M / 12$).
* **$n$** : nombre de capitalisations par an.

### Fiscalité, Pouvoir d'Achat Réel et Pénalité de Sortie Anticipée

Après imposition au taux $\tau$ (par exemple $30\,\%$ en France ou en Belgique) et ajustement face à l'inflation annuelle $\pi$ :

$$I_{\text{net}} = I_{\text{brut}} \times (1 - \tau) \qquad V_{\text{réel}} = \frac{P + I_{\text{net}}}{(1 + \pi)^t}$$

En cas de retrait anticipé au mois $m$ avec une pénalité de $k$ mois d'intérêts calculés sur le solde atteint $C_m$, la retenue vaut :

$$P_{\text{pén}} = C_m \times \frac{r_{\text{nom}}}{12} \times k$$

## Exemple Chiffré Pas à Pas : 25 000 € sur 24 Mois à 3,60 % Brut

Supposons **25 000 €** placés sur un DAT de **24 mois** ($t = 2$ ans) au taux actuariel annuel brut de **3,60 %**, capitalisé mensuellement ($n = 12$), avec **2,00 %/an** d'inflation et **30 %** de fiscalité forfaitaire (PFU en France ou précompte mobilier en Belgique).

1. **Taux nominal équivalent et capital brut à échéance** :
   * $r_{\text{nom}} = 12 \times \left[(1{,}036)^{1/12} - 1\right] \approx \mathbf{3{,}5419\,\%}$ (soit $0{,}29516\,\%$/mois).
   $$V_f = 25\,000 \times (1{,}036)^2 = 25\,000 \times 1{,}073296 = \mathbf{26\,832{,}40\,\text{€}}$$
   * Intérêts bruts acquis : $I_{\text{brut}} = \mathbf{1\,832{,}40\,\text{€}}$.
2. **Rendement net d'impôt et pouvoir d'achat réel** :
   * Impôt (30 %) : **549,72 €** ; intérêts nets : **1 282,68 €**, soit **26 282,68 €** encaissés (**2,53 %/an** net actuariel).
   * Facteur d'inflation : $(1{,}02)^2 = 1{,}0404$. En euros constants d'aujourd'hui, le capital brut vaut **25 790,47 €** et le capital net vaut $26\,282{,}68 / 1{,}0404 = \mathbf{25\,262{,}09\,\text{€}}$ (gain réel net de **262,09 €**).
3. **Sortie anticipée au 9e mois (pénalité de 3 mois d'intérêts)** :
   * Solde couru : $25\,000 \times (1{,}036)^{9/12} = \mathbf{25\,672{,}01\,\text{€}}$ (**672,01 €** d'intérêts).
   * Pénalité : $25\,672{,}01 \times (0{,}035419 / 12) \times 3 = \mathbf{227{,}32\,\text{€}}$, laissant **25 444,69 €** bruts (**444,69 €** d'intérêts avant impôt). À l'inverse, sortir dès le **2e mois** (147,80 € acquis contre 222,68 € de pénalité) entamerait le capital de **74,88 €**.

## Modèle d'Échelle de DAT pour 50 000 € sur 5 Ans

Au lieu de bloquer **50 000 €** sur un seul DAT à 5 ans (**10 249,96 €** bruts à 3,80 %, sans liquidité avant 60 mois), diviser le capital en **cinq tranches de 10 000 €** libère une échéance chaque année :

| Tranche | Durée | Capital | Taux Actuariel Brut | Intérêts Bruts | Intérêts Nets (30 %) | Valeur Brute |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **DAT n° 1** | 12 mois | 10 000 € | 3,10 % | 310,00 € | 217,00 € | 10 310,00 € |
| **DAT n° 2** | 24 mois | 10 000 € | 3,30 % | 670,89 € | 469,62 € | 10 670,89 € |
| **DAT n° 3** | 36 mois | 10 000 € | 3,50 % | 1 087,18 € | 761,03 € | 11 087,18 € |
| **DAT n° 4** | 48 mois | 10 000 € | 3,65 % | 1 541,90 € | 1 079,33 € | 11 541,90 € |
| **DAT n° 5** | 60 mois | 10 000 € | 3,80 % | 2 049,99 € | 1 434,99 € | 12 049,99 € |
| **Total / Moy.** | **Échelonné** | **50 000 €** | **3,47 % moy.** | **5 659,96 €** | **3 961,97 €** | **55 659,96 €** |

À chaque échéance annuelle, la tranche libérée répond à un besoin imprévu sans pénalité ou se replace sur 5 ans au taux long.

## Pièges Fréquents Avant de Souscrire un Compte à Terme

* **Comparer un taux brut de DAT au taux net d'un livret exonéré** : Un DAT à **3,60 % brut** fiscalisé à 30 % ne rapporte que **2,53 % net**. Remplissez d'abord vos enveloppes défiscalisées (Livret A, LDDS ou LEP en France ; plafond **CELI** au Canada) si leur taux net rivalise sans blocage.
* **Sous-estimer le préavis de 32 jours et la décote de sortie** : En France, clôturer un CAT avant terme impose couramment un **préavis de 32 jours calendaires** et une forte minoration de rémunération. Gardez votre épargne de précaution (3 à 6 mois de dépenses) sur un support liquide.
* **Subir une reconduction tacite peu rémunératrice** : Sans instruction dans la fenêtre de grâce (souvent 7 à 10 jours), plusieurs banques reconduisent le DAT à un taux standard inférieur aux offres d'appel. Notez chaque date d'échéance.
* **Dépasser les plafonds de garantie bancaire** : Au-delà de **100 000 €** par agrément bancaire en France (FGDR) ou en Belgique (**100 000 CHF** en Suisse via esisuisse ; **100 000 CAD** par catégorie au Canada via la SADC), répartissez vos dépôts entre plusieurs établissements distincts.
