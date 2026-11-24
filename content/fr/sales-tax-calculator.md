---
title: "Calculatrice de Taxe de Vente / TVA"
metaTitle: "Calculatrice TVA et Taxe de Vente | Calcul HT et TTC"
description: "Calculez instantanément la TVA, la TPS/TVQ ou la taxe de vente en mode direct (HT vers TTC) ou inversé (TTC vers HT) avec décomposition exacte du montant de taxe."
metaDescription: "Ajoutez la TVA ou faites le calcul inversé TTC vers HT en un clic. Formules exactes et taux officiels pour France, Belgique, Suisse et Québec."
metaKeywords: "calculatrice tva, calcul tva inversé, passer du ttc au ht, calculatrice taxe de vente, tps tvq québec, taux tva france belgique suisse, prix hors taxe, montant ttc"
faqs:
  - question: "Pourquoi ne peut-on pas simplement soustraire 20 % d'un prix TTC pour retrouver le prix HT ?"
    answer: "Parce que la TVA s'applique au prix hors taxe (HT) et non au total toutes taxes comprises (TTC). Si un bien vaut 1 200 € HT, une TVA de 20 % ajoute 240 € pour atteindre 1 440 € TTC. Retirer naïvement 20 % de 1 440 € soustrairait 288 € et produirait un faux montant HT de 1 152 €. Pour inverser la TVA sans erreur, il faut toujours diviser le montant TTC par 1 + le taux décimal (ici 1,20)."
  - question: "Comment convertir rapidement un prix TTC en prix HT (calcul inversé de TVA) ?"
    answer: "Divisez le montant TTC par le coefficient (1 + t), où t représente le taux de taxe exprimé en décimal (0,20 pour 20 %, 0,21 pour 21 %, 0,081 pour 8,1 % ou 0,14975 pour la TPS+TVQ au Québec). Soustrayez ensuite le montant HT obtenu du montant TTC pour isoler le montant exact de taxe collectée ou déductible."
  - question: "Comment fonctionnent la TPS et la TVQ ensemble au Québec ?"
    answer: "Depuis le 1er janvier 2013, la Taxe sur les produits et services (TPS fédérale à 5 %) et la Taxe de vente du Québec (TVQ à 9,975 %) ne se composent plus l'une sur l'autre : elles s'appliquent toutes les deux directement sur le prix hors taxe. Le taux combiné exact est donc de 14,975 %, soit un multiplicateur de 1,14975 pour passer du prix affiché en rayon au total à la caisse."
  - question: "Quelle est la différence entre la TVA européenne et la taxe de vente nord-américaine ?"
    answer: "La Taxe sur la Valeur Ajoutée (TVA en France, en Belgique et en Suisse) est un impôt indirect multi-stades perçu à chaque maillon de la chaîne économique avec déduction de la TVA payée sur les achats, et les prix aux particuliers sont légalement affichés TTC. À l'inverse, une taxe de vente au détail (aux États-Unis ou dans certaines provinces canadiennes) est prélevée en une seule étape au point de vente final, sur des prix généralement affichés hors taxe."
  - question: "À quel moment arrondir la TVA sur une facture comportant plusieurs lignes ?"
    answer: "En comptabilité européenne, il est recommandé de sommer d'abord les montants hors taxe de toutes les lignes relevant d'un même taux, puis d'appliquer le taux de TVA une seule fois sur chaque sous-total avant d'arrondir au centime le plus proche. En France, le BOFiP admet également l'arrondi ligne par ligne, à condition d'appliquer la même méthode avec constance sur l'ensemble du document."
---

Établir une facture en France ou en Belgique, vérifier une note de frais en Suisse ou anticiper le montant réel à la caisse au Québec impose de maîtriser exactement la conversion entre **prix hors taxe (HT)** et **prix toutes taxes comprises (TTC)**. Une erreur dans le calcul inversé suffit à fausser une déclaration de TVA, une marge commerciale ou un remboursement comptable.

Notre calculatrice fonctionne dans les deux sens, en euros (`€`), francs suisses (`CHF`) ou dollars canadiens (`CAD`) : le **mode direct (HT vers TTC)** calcule la taxe à ajouter et le total brut, tandis que le **mode inversé (TTC vers HT)** extrait précisément le net hors taxe et l'impôt inclus à partir d'un reçu global.

## Formules de calcul direct (HT vers TTC) et inversé (TTC vers HT)

### 1. Calcul direct : ajouter la taxe

À partir d'un montant net hors taxe ($P_{\text{HT}}$) et d'un taux décimal $t$, la taxe ($T$) et le prix final ($P_{\text{TTC}}$) valent :

$$T = P_{\text{HT}} \times t \qquad \text{et} \qquad P_{\text{TTC}} = P_{\text{HT}} \times (1 + t)$$

### 2. Calcul inversé : extraire la taxe d'un prix TTC

Pour isoler l'assiette hors taxe d'un prix taxes comprises, il faut impérativement **diviser** par $(1 + t)$ et jamais soustraire directement le pourcentage :

$$P_{\text{HT}} = \frac{P_{\text{TTC}}}{1 + t} \qquad \text{et} \qquad T = P_{\text{TTC}} - P_{\text{HT}} = P_{\text{TTC}} \times \frac{t}{1 + t}$$

### 3. Cumul de deux taxes non composées (TPS et TVQ au Québec)

Depuis 2013, la TPS fédérale ($t_1 = 5\,\%$) et la TVQ québécoise ($t_2 = 9{,}975\,\%$) portent toutes deux directement sur le prix HT (et non plus en cascade l'une sur l'autre) :

$$P_{\text{TTC}} = P_{\text{HT}} \times (1 + t_1 + t_2) \qquad \Longrightarrow \qquad t_{\text{combiné}} = 14{,}975\,\%$$

* **$P_{\text{HT}}$ et $P_{\text{TTC}}$** : montant net hors taxe et montant brut toutes taxes comprises (`€`, `CHF`, `CAD`).
* **$t$** : taux décimal ($\text{taux en \%} \div 100$, soit $0{,}20$ pour $20\,\%$).
* **$T$** : montant exact de taxe collectée ou déductible.
* **$1 + t$** : coefficient multiplicateur (HT → TTC) et diviseur (TTC → HT).
* **$\frac{t}{1 + t}$** : fraction réelle de taxe contenue dans le prix TTC ($16{,}67\,\%$ pour une TVA à $20\,\%$).

## Exemples chiffrés pas à pas (Europe et Québec)

### Exemple 1 : Calcul inversé de la TVA française à 20 %

Une entreprise règle une prestation facturée **$1\,440{,}00\text{ €}$ TTC** au taux normal français de **$20\,\%$** ($t = 0{,}20$).

1. **Calcul du montant net HT** :
   $$P_{\text{HT}} = \frac{1\,440{,}00}{1{,}20} = \mathbf{1\,200{,}00\text{ €}}$$
2. **Extraction de la TVA déductible** :
   $$T = 1\,440{,}00 - 1\,200{,}00 = \mathbf{240{,}00\text{ €}} \quad (\text{soit } 16{,}67\,\% \text{ du TTC})$$
3. **Écart lié à l'erreur classique** : retrancher naïvement $20\,\%$ de $1\,440{,}00\text{ €}$ enlèverait $288{,}00\text{ €}$ pour donner un faux HT de $1\,152{,}00\text{ €}$ — soit une anomalie comptable de **$48{,}00\text{ €}$**.

### Exemple 2 : Ajout de la TPS et de la TVQ au Québec

Un ordinateur est étiqueté **$850{,}00\text{ CAD}$** hors taxe à Montréal.

1. **TPS ($5{,}00\,\%$)** : $850{,}00 \times 0{,}05 = \mathbf{42{,}50\text{ CAD}}$.
2. **TVQ ($9{,}975\,\%$)** : $850{,}00 \times 0{,}09975 = 84{,}7875 \approx \mathbf{84{,}79\text{ CAD}}$.
3. **Total taxes** : $42{,}50 + 84{,}79 = \mathbf{127{,}29\text{ CAD}}$ (identique au calcul combiné $850 \times 0{,}14975 = 127{,}2875 \approx 127{,}29\text{ CAD}$).
4. **Total à régler** : $850{,}00 + 127{,}29 = \mathbf{977{,}29\text{ CAD}}$.

## Tableau comparatif des taux officiels dans la francophonie

Ces coefficients s'appliquent aux taux normaux en vigueur pour convertir un prix TTC en HT :

| Juridiction | Impôt | Taux normal | Taux réduits / spéciaux | Diviseur ($1 + t$) | Part dans le TTC |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **France** | TVA | $20{,}0\,\%$ | $10{,}0\,\%$, $5{,}5\,\%$, $2{,}1\,\%$ | $1{,}200$ | $16{,}67\,\%$ |
| **Belgique** | TVA | $21{,}0\,\%$ | $12{,}0\,\%$, $6{,}0\,\%$ | $1{,}210$ | $17{,}36\,\%$ |
| **Suisse** | TVA | $8{,}1\,\%$ | $3{,}8\,\%$ (héberg.), $2{,}6\,\%$ | $1{,}081$ | $7{,}49\,\%$ |
| **Luxembourg** | TVA | $17{,}0\,\%$ | $14{,}0\,\%$, $8{,}0\,\%$, $3{,}0\,\%$ | $1{,}170$ | $14{,}53\,\%$ |
| **Québec (Canada)** | TPS + TVQ | $14{,}975\,\%$ | $0\,\%$ (détaxés) | $1{,}14975$ | $13{,}02\,\%$ |
| **Ontario (Canada)** | TVH | $13{,}0\,\%$ | $0\,\%$ (détaxés) | $1{,}130$ | $11{,}50\,\%$ |

La **TVA européenne** est un impôt multi-stades à paiements fractionnés (déductible entre professionnels, affiché TTC pour les particuliers), tandis que la **taxe de vente nord-américaine** s'ajoute généralement en caisse sur des prix affichés HT, avec détaxation des produits essentiels.

## Pièges comptables et fiscaux à éviter

* **Soustraire le pourcentage d'un total TTC** : Mémorisez les diviseurs exacts ($1{,}20$ en France, $1{,}21$ en Belgique, $1{,}081$ en Suisse, $1{,}14975$ au Québec) plutôt que le taux facial.
* **Appliquer un taux unique sur un ticket mixte** : Un reçu de restauration mêle souvent des plats (taux réduit ou intermédiaire) et des boissons alcoolisées (taux normal). Ventilez chaque sous-total par taux avant d'extraire la TVA.
* **Calculer la taxe avant remise commerciale** : La base imposable correspond au **net commercial** (après rabais, remises et ristournes), augmenté des frais accessoires soumis au même taux.
* **Mélanger les règles d'arrondi multilignes** : Arrondir la TVA ligne par ligne plutôt que sur le sous-total HT par taux peut créer un écart de quelques centimes ; conservez une règle unique sur toute la facture pour garantir HT + TVA = TTC.
