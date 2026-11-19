---
title: "Calculateur de Rente"
metaTitle: "Calculateur de Rente : Capital, Versements et Viager"
description: "Estimez la valeur actuelle ou future d'une rente certaine ou viagère ainsi que le montant exact de vos arrérages périodiques selon le taux de rendement."
metaDescription: "Simulez votre rente mensuelle ou trimestrielle, calculez le capital nécessaire à la retraite et comparez rente à terme échu ou d'avance avec précision."
metaKeywords: "calculateur de rente, calcul rente viagere, valeur actuelle rente, rente certaine, capital retraite en rente, arrerages mensuels, rente a terme echu"
faqs:
  - question: "Quelle est la différence entre une rente à terme échu et une rente payable d'avance ?"
    answer: "Une rente à terme échu verse chaque arrérage à la fin de la période (par exemple le 30 du mois), tandis qu'une rente payable d'avance (ou à terme à échoir) effectue le versement dès le premier jour de la période. À montant égal, la rente payable d'avance nécessite un capital initial légèrement supérieur — ou génère une valeur acquise plus élevée — car chaque flux bénéficie d'une période de capitalisation supplémentaire."
  - question: "Comment la fiscalité française s'applique-t-elle aux rentes viagères à titre onéreux (RVTO) ?"
    answer: "Lorsque vous convertissez un capital personnel non déduit fiscalement (comme une assurance-vie ou la vente d'un bien en viager) en rente viagère à titre onéreux, seule une fraction de la rente est soumise à l'impôt sur le revenu et aux prélèvements sociaux de 17,2 %. Cette fraction dépend de votre âge lors de l'entrée en jouissance : 70 % si vous avez moins de 50 ans, 50 % entre 50 et 59 ans, 40 % entre 60 et 69 ans, et seulement 30 % à partir de 70 ans."
  - question: "Vaut-il mieux sortir en capital fractionné ou en rente viagère sur un Plan d'Épargne Retraite (PER) ?"
    answer: "La sortie en rente viagère sécurise un revenu garanti à vie contre le risque de longévité, mais entraîne l'aliénation définitive du capital en cas de décès prématuré (sauf option de réversion ou d'annuités garanties). La sortie en capital fractionné, programmée sous forme de rente certaine sur 15 à 25 ans, conserve la pleine propriété du patrimoine transmissible aux héritiers tout en permettant de moduler les retraits."
  - question: "Qu'est-ce qu'une option d'annuités garanties dans un contrat de rente ?"
    answer: "L'option d'annuités garanties engage l'assureur à verser la rente pendant une durée minimale incompressible (souvent 15 ou 20 ans), même si le crédirentier décède avant ce terme. En cas de décès prématuré, le solde des annuités restantes est intégralement reversé aux bénéficiaires désignés, évitant ainsi la perte sèche du capital converti."
  - question: "Comment protéger le pouvoir d'achat d'une rente face à l'inflation sur 20 ou 30 ans ?"
    answer: "Une rente à versements fixes perd environ un tiers de son pouvoir d'achat en vingt ans sous une inflation annuelle moyenne de 2 %. Pour compenser cette érosion, vous pouvez opter pour une rente indexée (dont l'arrérage initial est réduit de 15 % à 25 % mais progresse de 1,5 % à 2 % chaque année) ou conserver une poche d'actifs financiers diversifiés à côté de votre rente."
---

La planification d'un revenu régulier à partir d'un capital — ou, à l'inverse, l'évaluation du patrimoine nécessaire pour financer une série de décaissements futurs — repose sur les mathématiques actuarielles des rentes. Que vous prépariez la phase de décumulation d'un Plan d'Épargne Retraite (PER) en France, le retrait programmé d'un Fonds enregistré de revenu de retraite (FERR) au Canada, la conversion d'un deuxième pilier LPP en Suisse ou le calcul d'une rente d'éducation, ce calculateur détermine avec exactitude la valeur actuelle, la valeur acquise et le montant des arrérages périodiques.

## Comprendre le mécanisme d'une rente financière : certaine ou viagère

En finance patrimoniale, une **rente** désigne une suite de flux financiers périodiques constants ou indexés, appelés **arrérages**, versés à intervalles réguliers (mensuels, trimestriels ou annuels). On distingue deux grandes familles de contrats selon la nature de leur échéance :

1. **La rente certaine (ou à durée déterminée) :** Le nombre total de versements est fixé contractuellement dès le départ (par exemple sur 15, 20 ou 25 ans). Elle ne dépend pas de l'espérance de vie du bénéficiaire. Si le titulaire décède avant le terme prévu, les arrérages restants continuent d'être payés à ses ayants droit jusqu'à l'extinction du calendrier initial. C'est le modèle mathématique exact d'un plan de retraits programmés sur un portefeuille de titres ou une assurance-vie.
2. **La rente viagère :** Le versement des arrérages est garanti jusqu'au décès du crédirentier, quelle que soit sa longévité effective. Pour tarifer cette garantie, l'assureur mutualise le risque de survie en s'appuyant sur des tables de mortalité homologuées (comme les tables réglementaires TGF05 pour les femmes et TGH05 pour les hommes en France) et sur un taux technique d'escompte.

Au-delà de la durée, la date d'exécution du paiement à l'intérieur de chaque période modifie directement la valorisation :
* **Rente à terme échu (ordinaire) :** L'arrérage est versé à la fin de chaque période (par exemple le dernier jour du mois). Pendant toute la première période, l'intégralité du capital initial produit des intérêts avant le premier décaissement.
* **Rente payable d'avance (à terme à échoir) :** Le premier versement intervient immédiatement le jour de la mise en place du contrat. Chaque flux étant avancé d'une période, le capital requis pour financer les mêmes décaissements est mathématiquement majoré d'une période d'intérêts.

## Formules mathématiques de la valeur actuelle et de la valeur acquise

Pour actualiser une série d'arrérages futurs ou capitaliser des versements périodiques, la finance utilise les séries géométriques à taux composé.

### 1. Valeur actuelle d'une rente à terme échu ($VA$)
Elle indique le capital initial exact qu'il faut détenir aujourd'hui, placé au taux périodique $r$, pour pouvoir prélever un arrérage constant $P$ pendant $n$ périodes jusqu'à épuisement total du fonds :

$$VA = P \times \frac{1 - (1 + r)^{-n}}{r}$$

Si la rente est **payable d'avance** (en début de période), la formule devient :

$$VA_{\text{avance}} = P \times \frac{1 - (1 + r)^{-n}}{r} \times (1 + r)$$

### 2. Valeur acquise (ou valeur future $VF$) d'une suite de versements
Lorsque les flux périodiques $P$ ne sont pas consommés mais réinvestis au taux $r$ pendant $n$ périodes (phase de constitution de l'épargne), le capital accumulé à terme s'établit à :

$$VF = P \times \frac{(1 + r)^n - 1}{r}$$

**Définition des variables :**
* $P$ : Montant de l'arrérage périodique (versement ou retrait en $€$, $\$$ ou $\text{CHF}$).
* $r$ : Taux d'intérêt périodique net. Pour des versements mensuels avec un taux nominal annuel $T_{\text{annuel}}$, on pose $r = \frac{T_{\text{annuel}}}{12}$.
* $n$ : Nombre total de périodes de paiement ($n = \text{années} \times 12$ pour une rente mensuelle).

## Exemple chiffré : financer une rente mensuelle de 1 500 € pendant 20 ans

Imaginons un épargnant qui prend sa retraite à 64 ans et souhaite s'assurer un complément de revenu certain de **$1\,500\text{ €}$ par mois** (versé en fin de mois, soit à terme échu) pendant exactement **20 ans** ($240\text{ mois}$). Son capital est logé sur un support équilibré délivrant un rendement annuel net de frais de **$3{,}60\,\%$**.

1. **Conversion des paramètres en base mensuelle :**
   * Arrérage périodique : $P = 1\,500\text{ €}$
   * Taux mensuel : $r = \frac{0{,}036}{12} = 0{,}003$ (soit $0{,}30\,\%$ par mois)
   * Nombre de mensualités : $n = 20 \times 12 = 240$

2. **Calcul du facteur d'actualisation :**
   $$(1 + r)^{-n} = (1{,}003)^{-240} \approx 0{,}487277$$
   $$\frac{1 - 0{,}487277}{0{,}003} = \frac{0{,}512723}{0{,}003} \approx 170{,}9076$$

3. **Détermination du capital initial requis ($VA$) :**
   $$VA = 1\,500 \times 170{,}9076 = 256\,361{,}41\text{ €}$$

**Interprétation patrimoniale :** Avec un capital de **$256\,361{,}41\text{ €}$** rémunéré à $3{,}60\,\%$ l'an, l'épargnant percevra un cumul de $1\,500\text{ €} \times 240 = 360\,000\text{ €}$ sur vingt ans. La différence, soit **$103\,638{,}59\text{ €}$**, provient exclusivement des intérêts composés générés par le capital restant investi tout au long de la période de décaissement. Si l'épargnant avait exigé des versements en début de mois (rente payable d'avance), le capital initial nécessaire aurait été de $256\,361{,}41 \times 1{,}003 = 257\,130{,}49\text{ €}$.

## Tableau comparatif : capital requis pour 1 000 € de rente mensuelle

Le tableau ci-dessous présente le capital initial indispensable (en euros, arrondi à l'unité, pour une rente à terme échu) afin de percevoir **$1\,000\text{ €}$ par mois** selon la durée de décaissement souhaitée et le taux de rendement annuel net de votre placement :

| Durée de la rente | Cumul des retraits | Taux annuel 2,40 % | Taux annuel 3,60 % | Taux annuel 4,80 % |
| :--- | :--- | :--- | :--- | :--- |
| **15 ans (180 mois)** | 180 000 € | 151 036 € | 138 929 € | 128 199 € |
| **20 ans (240 mois)** | 240 000 € | 190 341 € | 170 908 € | 154 229 € |
| **25 ans (300 mois)** | 300 000 € | 225 432 € | 197 629 € | 174 738 € |
| **30 ans (360 mois)** | 360 000 € | 256 761 € | 219 957 € | 190 898 € |

On observe que plus l'horizon de décaissement s'allonge, plus l'effet du taux de rendement réduit l'effort d'épargne initial : sur 30 ans à $4{,}80\,\%$, il suffit d'immobiliser $190\,898\text{ €}$ pour distribuer $360\,000\text{ €}$ de flux mensuels.

## Pièges courants et critères de décision avant de convertir un capital

Avant d'opter pour une sortie en rente auprès d'un assureur ou de programmer des rachats partiels automatiques, quatre paramètres doivent être vérifiés :

* **Le coût des frais sur arrérages :** Dans de nombreux contrats de retraite (PER, Madelin, LPP), l'assureur prélève des frais de service sur chaque versement mensuel (souvent entre $1\,\%$ et $3\,\%$). Un frais d'arrérage de $2\,\%$ réduit immédiatement une rente brute de $1\,500\text{ €}$ à $1\,470\text{ €}$.
* **L'arbitrage fiscal entre rente et rachats programmés :** En France, les rachats partiels programmés sur une assurance-vie de plus de 8 ans ne sont taxés que sur la part d'intérêts comprise dans chaque retrait (après abattement annuel de $4\,600\text{ €}$ ou $9\,200\text{ €}$ pour un couple). Cette auto-rente reste plus souple qu'une rente viagère irrévocable.
* **L'âge d'entrée en jouissance :** Convertir un capital en rente viagère avant 65 ans offre un taux de conversion modeste (souvent sous $3{,}8\,\%$ par an). Retarder la conversion à 70 ans tout en consommant d'abord une épargne liquide rehausse sensiblement l'arrérage viager.
* **La clause de réversion au conjoint :** Choisir une réversion à $60\,\%$ ou $100\,\%$ au profit du conjoint réduit l'arrérage initial de $8\,\%$ à $18\,\%$ selon l'écart d'âge, mais protège efficacement le foyer lorsque les pensions des époux sont asymétriques.
