---
title: "Calculateur de Pourboire"
metaTitle: "Calculateur de Pourboire : Addition, Taxes et Partage"
description: "Calculez instantanément le montant du pourboire, divisez l'addition de restaurant entre convives et évitez de payer un pourboire sur la TPS/TVQ ou la TVA."
metaDescription: "Calculez le pourboire idéal au restaurant, appliquez le taux sur le montant hors taxes et partagez l'addition entre amis en France, au Canada ou aux USA."
metaKeywords: "calculateur de pourboire, calcul pourboire restaurant, partager addition entre amis, pourboire avant ou après taxes Québec, service compris 15 pourcent France, pourboire États-Unis"
faqs:
  - question: "Le pourboire doit-il être calculé sur le montant avant taxes ou après taxes au Québec et au Canada ?"
    answer: "Le pourboire doit toujours être calculé sur le sous-total avant les taxes de vente (TPS et TVQ au Québec, ou TVH en Ontario). Payer un pourcentage sur le montant toutes taxes comprises revient à verser un pourboire sur un impôt gouvernemental. Au Québec, la Loi sur la protection du consommateur (Projet de loi 72) oblige désormais les commerçants à programmer leurs terminaux de paiement pour que les suggestions de pourcentage portent exclusivement sur le prix hors taxes."
  - question: "Que signifie la mention légale « Service compris 15 % » sur une note de restaurant en France ?"
    answer: "En France (arrêté du 27 mars 1987), ainsi qu'en Belgique et en Suisse, les prix affichés sur les cartes incluent obligatoirement les taxes (TVA) et la rémunération du personnel de salle (le « service compris »). Le client n'a aucune obligation légale d'ajouter un supplément. Le pourboire laissé sur la table ou par carte (souvent 5 % à 10 %) est une gratification facultative qui récompense un service attentif."
  - question: "Les pourboires payés par carte bancaire vont-ils réellement aux serveurs ?"
    answer: "Oui. En France, le Code du travail impose à l'employeur de reverser intégralement au personnel en contact avec la clientèle toutes les sommes perçues pour le service par carte bancaire. Au Canada et aux États-Unis, les pourboires par carte sont reversés sur la paie ou en fin de service (parfois partagés avec la cuisine et les commis selon une clé interne appelée tip-out)."
  - question: "Pourquoi le pourboire de 15 % à 20 % est-il quasi obligatoire aux États-Unis et au Canada ?"
    answer: "En Amérique du Nord, le personnel de salle relève du statut de « salariés à pourboire ». Leur salaire horaire de base est inférieur au salaire minimum général, car la législation fiscale présume que le client complétera leur rémunération par un pourboire d'au moins 15 % (18 % à 20 % aux États-Unis)."
  - question: "Dois-je calculer le pourboire avant ou après une réduction promotionnelle (coupon ou 2 pour 1) ?"
    answer: "Selon les usages en restauration, le pourboire se calcule sur la valeur initiale hors taxes des plats commandés avant l'application de la remise ou du chèque-cadeau, car le travail fourni en salle et en cuisine reste identique."
---

Que vous partagiez une note de brasserie entre amis à Paris, régliez un souper à Montréal avec la TPS et la TVQ ou voyagiez à New York, le calcul du pourboire et la division de l'addition soulèvent souvent des hésitations au moment de saisir le terminal de paiement. Ce calculateur dissocie avec précision le sous-total hors taxes, les taxes locales, les remises éventuelles et la part exacte revenant à chaque convive.

## La règle d'or mathématique : calculer le pourboire sur le sous-total hors taxes

L'erreur financière la plus fréquente sur les terminaux de paiement électronique (TPE) consiste à appliquer le pourcentage de pourboire sur le montant total **après taxes**. Lorsque la taxe de vente s'élève à près de $15\,\%$ (comme au Québec ou dans les provinces maritimes canadiennes), sélectionner le bouton « $18\,\%$ » d'un terminal mal paramétré qui calcule sur le total TTC revient en réalité à laisser **$20{,}7\,\%$** du prix du repas.

Pour obtenir un calcul juste et transparent, notre outil applique les trois équations fondamentales suivantes à partir du sous-total hors taxes ($S_{\text{HT}}$), du taux de pourboire ($p$), du taux de taxe ($t$), d'une éventuelle remise ($R$) et du nombre de convives ($N$) :

1. **Montant exact du pourboire (calculé sur la valeur initiale hors taxes)** :
   $$\text{Pourboire} = S_{\text{HT}} \times \frac{p}{100}$$
2. **Montant des taxes de vente (calculé sur le sous-total net après remise)** :
   $$\text{Taxes} = (S_{\text{HT}} - R) \times \frac{t}{100}$$
3. **Total général et division par personne** :
   $$\text{Addition Totale} = (S_{\text{HT}} - R) + \text{Taxes} + \text{Pourboire} \qquad \Longrightarrow \qquad \text{Part par Convive} = \frac{\text{Addition Totale}}{N}$$

## Exemples chiffrés : dîner à Montréal (TPS + TVQ) et partage de table à Paris

### Cas n° 1 : Repas pour 4 personnes au Québec (pourboire de 15 % hors taxes)
Quatre convives dînent dans un restaurant de Montréal. Le sous-total des plats et boissons figurant sur la facture avant taxes est de **$160{,}00\text{ \$ CAD}$**.
* **Calcul des taxes québécoises** :
  * TPS fédérale ($5\,\%$) : $160{,}00\text{ \$} \times 0{,}05 = 8{,}00\text{ \$}$
  * TVQ provinciale ($9{,}975\,\%$) : $160{,}00\text{ \$} \times 0{,}09975 = 15{,}96\text{ \$}$
  * Total des taxes ($14{,}975\,\%$) : **$23{,}96\text{ \$ CAD}$** (sous-total TTC de $183{,}96\text{ \$}$).
* **Calcul du pourboire de 15 % sur le montant avant taxes** :
  $$160{,}00\text{ \$} \times 0{,}15 = \mathbf{24{,}00\text{ \$ CAD}}$$
  *(Astuce québécoise : comme la somme de la TPS et de la TVQ vaut $14{,}975\,\%$, additionner les deux lignes de taxes sur votre reçu donne $23{,}96\text{ \$}$, soit à quatre cents près le montant exact d'un pourboire de $15\,\%$ !)*
* **Comparaison avec le piège du calcul après taxes** :
  Appliquer $15\,\%$ sur les $183{,}96\text{ \$}$ TTC aurait coûté $27{,}59\text{ \$}$ de pourboire, soit **$3{,}59\text{ \$}$ de trop** versés sur la taxe gouvernementale.
* **Partage équitable entre les 4 amis** :
  $$\text{Total} = 160{,}00\text{ \$} + 23{,}96\text{ \$} + 24{,}00\text{ \$} = 207{,}96\text{ \$ CAD} \qquad \Longrightarrow \qquad \frac{207{,}96\text{ \$}}{4} = \mathbf{51{,}99\text{ \$ CAD / personne}}$$

### Cas n° 2 : Addition de brasserie en France ou en Belgique avec arrondi
Trois collègues déjeunent à Lyon. La note s'élève à **$112{,}50\text{ € TTC}$** (« Service compris » inclus). Satisfaits de la rapidité du service, ils souhaitent laisser environ **$6\,\%$ à $7\,\%$** de pourboire tout en arrondissant la dépense à un chiffre rond divisible par trois.
* Un pourboire de **$7{,}50\text{ €}$** ($6{,}67\,\%$) porte l'addition totale à $112{,}50\text{ €} + 7{,}50\text{ €} = \mathbf{120{,}00\text{ €}}$, permettant à chacun de régler exactement **$40{,}00\text{ €}$** par carte bancaire.

## Guide international des usages : quel pourcentage laisser selon le pays ?

| Pays / Zone | Régime du Service | Restaurant Assis | Café & Bar | Livraison & Taxi | Règle Locale |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **France, Belgique, Suisse** | Service compris ($15\,\%$ inclus TTC) | 5 % à 10 % (2 € à 10 €) | Arrondi à l'euro supérieur | 2 € à 5 € | Gratification libre, non obligatoire |
| **Canada (Québec, Ontario)** | Non compris (salariés à pourboire) | **15 %** à **20 %** | 1 $ à 2 $ par verre | 10 % à 15 % (min. 3 $) | Calculer **avant** TPS/TVQ ou TVH |
| **États-Unis** | Non compris (salaire de base bas) | **18 %** à **22 %** | 1 $ à 2 $ par verre | 15 % à 20 % | Vérifier l'*Auto-Gratuity* (18 %) dès 6 convives |
| **Royaume-Uni** | Variable (*Service Charge*) | 10 % à 12,5 % | 0 % au comptoir du pub | Arrondi ou 10 % | Ne rien ajouter si *Service Charge 12.5%* figure |

## Astuces de calcul mental et bonnes pratiques lors du partage

1. **Méthode rapide du 10 % + moitié pour calculer 15 % de tête** : Sur un montant hors taxes de $64{,}00\text{ \$}$, décalez la virgule d'un rang vers la gauche pour obtenir $10\,\%$ ($6{,}40\text{ \$}$). Ajoutez la moitié correspondant à $5\,\%$ ($3{,}20\text{ \$}$) : $6{,}40 + 3{,}20 = \mathbf{9{,}60\text{ \$}}$ (pourboire exact à $15\,\%$). Pour $20\,\%$, doublez simplement la valeur de $10\,\%$ ($12{,}80\text{ \$}$).
2. **Attention aux frais de groupe pré-inclus (*Auto-Gratuity*)** : Dans de nombreux restaurants nord-américains, les tables de $6\text{ personnes}$ ou plus se voient automatiquement facturer $18\,\%$ de service. Vérifiez le ticket avant de valider un second pourboire sur le terminal, sous peine de payer $36\,\%$ en double.
3. **Partage égalitaire ou au prorata de l'alcool** : Lorsqu'une partie des convives ne boit pas d'alcool, isolez le prix des bouteilles de vin (et leur pourboire associé) pour le répartir entre les buveurs, puis divisez la partie repas à parts égales.
