---
title: "Convertisseur kWh en Watts (W) : Formule, durée et coût électrique"
description: "Convertissez des kilowattheures (kWh) en puissance moyenne en watts (W) selon la durée d'utilisation. Formule exacte (kWh × 1 000 ÷ h), exemples et tableau."
faqs:
  - question: "Peut-on convertir directement des kWh en watts sans connaître la durée ?"
    answer: "Non, car le kilowattheure mesure une quantité d'énergie consommée sur un intervalle de temps, tandis que le watt mesure une puissance instantanée. Il est impératif de connaître le nombre d'heures d'utilisation pour calculer la puissance moyenne en watts."
  - question: "Combien de watts représente 1 kWh sur une heure ou sur une journée ?"
    answer: "Une énergie de 1 kWh consommée en 1 heure correspond à une puissance moyenne de 1 000 W (1 kW). Si cette même énergie de 1 kWh est répartie uniformément sur 24 heures, elle équivaut à une puissance moyenne continue d'environ 41,67 W."
  - question: "Quelle est la différence entre le kW (puissance) et le kWh (énergie) ?"
    answer: "Le kilowatt (kW) indique la puissance instantanée qu'un appareil demande ou fournit à un instant T, comparable à la vitesse d'un véhicule en km/h. Le kilowattheure (kWh) représente l'énergie totale accumulée ou facturée dans le temps, comparable à la distance parcourue en kilomètres."
  - question: "Comment calculer la puissance moyenne d'un appareil à partir de sa facture d'électricité ?"
    answer: "Divisez la consommation facturée en kWh par le nombre total d'heures de fonctionnement sur la période, puis multipliez par 1 000. Par exemple, 300 kWh consommés sur un mois de 30 jours (720 heures) correspondent à une puissance moyenne continue de 416,7 W."
  - question: "Comment estimer la puissance solaire nécessaire à partir d'une consommation journalière en kWh ?"
    answer: "Divisez votre besoin journalier en kWh par le nombre d'heures d'ensoleillement équivalent pic de votre région, puis multipliez par 1 000 (en ajoutant une marge de 20 à 30 % pour les pertes). Par exemple, 4 kWh/jour avec 4 heures d'ensoleillement pic nécessitent au moins 1 000 Wc bruts."
---

La conversion de kilowattheures (`kWh`) en watts (`W`) permet de retrouver la puissance électrique moyenne d'un appareil ou d'un bâtiment à partir de sa consommation énergétique sur une durée donnée. La formule exacte s'écrit : `P (W) = [E (kWh) × 1 000] ÷ temps (heures)`.

Parce que le kilowattheure mesure une quantité d'**énergie** et le watt une **puissance instantanée**, il est physiquement impossible d'effectuer cette conversion sans intégrer la variable temporelle. Ce calcul s'avère essentiel lors d'un audit énergétique sur compteur Linky, pour dimensionner un parc photovoltaïque ou pour interpréter l'étiquette énergie d'un appareil électroménager.

## Formule exacte et unités du Système international (SI / BIPM)

Selon les définitions du Bureau international des poids et mesures (**BIPM**) et du Système international d'unités (**SI**), le watt (`W`) correspond à un transfert d'énergie d'un joule par seconde (`1 W = 1 J/s`). Le kilowattheure (`kWh`) constitue une unité dérivée usuelle équivalant à une puissance de `1 000 watts` maintenue pendant `3 600 secondes` (1 heure), soit `3,6 mégajoules`.

Pour passer de l'énergie à la puissance moyenne sur une période `t` exprimée en heures (`h`) :

- `P (W) = [E (kWh) × 1 000] ÷ t (h)`
- `P (kW) = E (kWh) ÷ t (h)`

Le facteur `1 000` provient simplement du préfixe métrique *kilo-* (`1 kWh = 1 000 Wh`). Ainsi, connaître `E` et `t` donne systématiquement la **puissance moyenne** sur l'intervalle observé. Si l'appareil fonctionne à puissance constante (comme un éclairage LED ou une résistance simple), cette moyenne égale sa puissance nominale.

## Exemples concrets d'audit énergétique étape par étape

### Exemple 1 : Estimer le talon de consommation d'un foyer sur 24 heures

Votre compteur communicant relève une consommation totale de **12 kWh** sur une journée complète de 24 heures durant votre absence, alors que seuls le réfrigérateur, la VMC et la box internet fonctionnaient.

1. Multipliez l'énergie par 1 000 pour obtenir des wattheures : `12 × 1 000 = 12 000 Wh`.
2. Divisez par la durée d'observation (24 heures) : `12 000 ÷ 24 = 500 W`.
3. Votre logement présente donc une puissance moyenne appelée en continu de **500 W** (un talon électrique élevé qu'il convient d'investiguer).

### Exemple 2 : Vérifier la puissance réelle d'un radiateur électrique

Un radiateur d'appoint a consommé **4,5 kWh** pendant une séance de chauffage continu de **3 heures** dans un bureau bien isolé.

1. Convertissez l'énergie en wattheures : `4,5 × 1 000 = 4 500 Wh`.
2. Divisez par les 3 heures d'utilisation : `4 500 ÷ 3 = 1 500 W`.
3. L'appareil a donc délivré une puissance moyenne de **1 500 W** (1,5 kW). Au tarif réglementé illustratif de 0,25 €/kWh, cette session représente `4,5 × 0,25 = 1,125 €`.

### Exemple 3 : Dimensionner la charge continue sur une batterie solaire

Vous disposez d'une batterie lithium de **5,12 kWh** utilisables et souhaitez alimenter un poste informatique isolé pendant une nuit de **8 heures**.

1. Traduisez la capacité utilisable en wattheures : `5,12 × 1 000 = 5 120 Wh`.
2. Divisez par l'autonomie souhaitée : `5 120 ÷ 8 = 640 W`.
3. Vous pouvez maintenir une charge continue maximale de **640 W** durant 8 heures (hors pertes de conversion de l'onduleur, qui ramèneraient plutôt la charge utile autour de 550 à 580 W).

## Tableau de correspondance kWh vers Watts selon la durée

Le tableau ci-dessous présente les combinaisons énergie/durée les plus fréquentes en audit domestique et solaire.

| Énergie | Durée | Puissance (W) | Puissance (kW) | Contexte |
| :--- | :--- | :--- | :--- | :--- |
| 0,5 kWh | 1 h | 500 W | 0,5 kW | Ordinateur fixe sollicité |
| 1 kWh | 1 h | 1 000 W | 1 kW | Micro-ondes pleine puissance |
| 1 kWh | 2 h | 500 W | 0,5 kW | Téléviseur ou outillage léger |
| 1 kWh | 8 h | 125 W | 0,125 kW | Poste de bureau sur la journée |
| 1 kWh | 24 h | 41,67 W | 0,042 kW | Box internet et veilles |
| 5 kWh | 4 h | 1 250 W | 1,25 kW | Sèche-linge ou chauffe-eau |
| 10 kWh | 5 h | 2 000 W | 2 kW | Recharge véhicule électrique |
| 24 kWh | 24 h | 1 000 W | 1 kW | Charge moyenne de 1 kW / jour |

## Usages en audit énergétique, solaire et erreurs classiques

Lors de l'analyse de relevés électriques ou de fiches constructeurs, quatre confusions reviennent fréquemment :

- **Confondre puissance crête et puissance moyenne** : Un réfrigérateur affiche 150 W sur son compresseur, mais ne consomme que `1,2 kWh` sur 24 heures (`50 W` en moyenne). Son thermostat coupant le moteur les deux tiers du temps, diviser les kWh par 24 h fournit la puissance *moyenne*, jamais la puissance *maximale* au démarrage.
- **Utiliser l'écriture erronée « kW/h »** : L'énergie s'exprime en kilowattheures (`kWh`, produit `kW × h`), et non en kilowatts divisés par des heures (`kW/h`). Cette erreur inverse mentalement le sens de la formule.
- **Négliger les heures d'ensoleillement équivalent** : Un panneau de 400 Wc ne produit pas `400 W × 24 h = 9,6 kWh` par jour. En France métropolitaine, la production journalière correspond plutôt à `3` à `5` heures de pleine puissance en moyenne annuelle (`1,2` à `2 kWh/jour`).
- **Oublier la puissance souscrite (kVA)** : Convertir une facture annuelle en moyenne (`4 380 kWh ÷ 8 760 h = 500 W`) ne permet pas de choisir un abonnement de 1 kVA. Le compteur doit absorber les pointes simultanées (four, chauffe-eau, plaques), imposant souvent 6 à 9 kVA.
