---
title: "Énergie Électrique : Comprendre votre Facture"
description: "Distinguez les watts des kilowattheures (kWh), convertissez la capacité mAh des batteries et calculez le coût réel de vos appareils avec notre Calculatrice d'Énergie Électrique."
category: "Math & Science"
relatedCalculator: "electrical-energy-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Quelle est la différence entre un kilowatt (kW) et un kilowattheure (kWh) ?"
    answer: "Le kilowatt (kW) mesure une puissance instantanée, comparable à la vitesse d'un véhicule en km/h. Le kilowattheure (kWh) mesure une quantité d'énergie consommée dans le temps, comparable à la distance parcourue en kilomètres : un radiateur de 2 kW allumé pendant 3 heures consomme exactement 6 kWh."
  - question: "Comment convertir des joules (J) en kilowattheures (kWh) ?"
    answer: "Un watt équivaut à 1 joule par seconde. Comme une heure contient 3 600 secondes et un kilowatt vaut 1 000 watts, 1 kWh correspond exactement à 3 600 000 joules (3,6 MJ). Pour convertir des joules en kWh, divisez simplement la valeur par 3 600 000."
  - question: "Pourquoi la capacité d'une batterie en mAh ne suffit-elle pas à connaître son énergie ?"
    answer: "Le milliampère-heure (mAh) mesure une charge électrique et non une énergie. Pour obtenir l'énergie stockée en wattheures (Wh), il faut multiplier cette charge par la tension nominale de la batterie : E (Wh) = (Q (mAh) × U (V)) / 1 000. Une batterie de 5 000 mAh à 3,85 V contient 19,25 Wh, contre 60 Wh à 12 V."
  - question: "Pourquoi ma facture d'électricité augmente-t-elle alors que ma consommation en kWh reste stable ?"
    answer: "Votre facture ne dépend pas uniquement des kWh consommés. Elle intègre une part fixe (l'abonnement annuel lié à la puissance souscrite en kVA), les variations du tarif réglementé ou de marché du kWh, ainsi que les taxes et contributions (accise sur l'électricité, contribution tarifaire d'acheminement et TVA)."
  - question: "Un appareil en veille consomme-t-il réellement beaucoup sur une année ?"
    answer: "Pris isolément, une veille de 5 W à 18 W paraît négligeable. Toutefois, parce qu'elle fonctionne 8 760 heures par an, une box internet et un décodeur totalisant 18 W en continu consomment 157,68 kWh par an, soit près de 40 € annuels à 0,25 €/kWh sans aucun service actif la nuit."
---

Votre fournisseur d'électricité ne vous facture pas la puissance instantanée de vos appareils, mais l'**énergie totale** consommée dans la durée. Tandis que la puissance (en watts, `W`) indique le rythme de consommation à un instant précis, l'énergie électrique (en joules `J` en physique, ou en kilowattheures `kWh` sur votre compteur) mesure le volume cumulé d'électricité utilisé.

Pour passer de la puissance d'un appareil à son coût annuel en euros, il suffit de multiplier cette puissance par sa durée réelle de fonctionnement (`E = P × t`). Notre [Calculatrice d'Énergie Électrique](/fr/calculatrices/calculateur-d-energie-electrique) effectue ces conversions entre joules, wattheures et kilowattheures instantanément.

## Puissance, énergie et unités de facturation : J, Wh et kWh

L'énergie électrique consommée par un appareil de puissance moyenne `P` sur une durée `t` s'exprime selon l'unité souhaitée :

```text
E (J)   = P (W) × t (secondes)
E (Wh)  = P (W) × t (heures)
E (kWh) = [P (W) × t (heures)] / 1 000
```

Définition des paramètres :
- **`E` (Énergie)** : quantité totale de travail électrique. Le **joule (J)** est l'unité SI (`1 W = 1 J/s`), mais les compteurs utilisent le **kilowattheure (kWh)** :

```text
1 kWh = 1 000 W × 3 600 s = 3 600 000 J = 3,6 MJ
```

- **`P` (Puissance active)** : débit d'énergie en watts (`W`) ou kilowatts (`1 kW = 1 000 W`).
- **`t` (Durée effective)** : temps réel durant lequel l'appareil consomme (en excluant les phases d'arrêt thermostatique).

### Capacité des batteries : relier mAh, tension et wattheures (Wh)

Les batteries de smartphones ou d'outillage indiquent souvent leur capacité en **milliampères-heures (mAh)** ou **ampères-heures (Ah)**. Ce chiffre représente une charge électrique, et non une énergie : pour comparer deux batteries de tensions différentes, convertissez en wattheures :

```text
E (Wh) = [Capacité (mAh) × Tension (V)] / 1 000
```

Une batterie de `5 000 mAh` sous `3,85 V` renferme `19,25 Wh`, contre `60 Wh` pour une batterie `5 000 mAh` (`5 Ah`) sous `12 V`. C'est cette valeur en `Wh` (limite usuelle à `100 Wh`) qui encadre le transport aérien des batteries au lithium.

## Exemple de calcul complet : du watt à la facture en euros

Évaluons le coût annuel d'un chauffe-eau à accumulation (`2 400 W`) et d'une box internet avec décodeur en fonctionnement continu (`18 W`), sur la base illustrative de `0,25 €/kWh` TTC en option Base et `0,20 €/kWh` TTC en Heures Creuses.

**Cas 1 : Le chauffe-eau électrique (cycle thermostatique)**  
Le thermostat n'alimente la résistance qu'environ `3,5 heures` par jour en moyenne :
1. Puissance en kilowatts : `P = 2 400 / 1 000 = 2,4 kW`.
2. Énergie journalière : `E_jour = 2,4 × 3,5 = 8,4 kWh/jour`.
3. Énergie annuelle : `E_an = 8,4 × 365 = 3 066 kWh/an`.
4. Coût en Heures Creuses (`0,20 €/kWh`) : `3 066 × 0,20 = 613,20 €/an` (contre `766,50 €` en tarif Base, soit `153,30 €` d'économie annuelle).

**Cas 2 : La box internet et les veilles permanentes**  
À `18 W` en continu sur `8 760 heures` (`24 h × 365 j`) :
1. Énergie annuelle : `E_an = (18 × 8 760) / 1 000 = 157,68 kWh/an`.
2. Coût à `0,25 €/kWh` : `157,68 × 0,25 = 39,42 €/an`.

## Comparatif de consommation et coût annuel par type d'appareil

Ce tableau présente des estimations réalistes pour un logement résidentiel à un tarif illustratif de `0,25 €/kWh` TTC.

| Équipement domestique | Puissance moyenne (`P`) | Durée active annuelle | Énergie annuelle (`kWh`) | Coût annuel (à 0,25 €/kWh) |
| :--- | :--- | :--- | :--- | :--- |
| Ampoule LED (salon) | 9 W | 1 460 h (4 h/j) | 13,14 kWh | 3,29 € |
| Réfrigérateur combiné classe D | 25 W (moyenne lissée) | 8 760 h (continu) | 219,00 kWh | 54,75 € |
| Téléviseur OLED 55 pouces | 110 W | 1 460 h (4 h/j) | 160,60 kWh | 40,15 € |
| Lave-linge (220 cycles/an) | 2 200 W (chauffe) | ~75 h de chauffe | 165,00 kWh | 41,25 € |
| Radiateur électrique (15 m²) | 1 500 W | 1 200 h effectives | 1 800,00 kWh | 450,00 € |
| Véhicule électrique (12 000 km/an) | 7 400 W (borne) | ~276 h de charge | 2 040,00 kWh | 510,00 € |

## Structure de votre facture, pièges de mesure et bonnes pratiques

Une facture d'électricité associe trois composantes : l'**abonnement fixe** (indexé sur la puissance souscrite en `kVA`, souvent `6` ou `9 kVA`), la **part variable** (`kWh × prix unitaire`), et les **taxes** (accise sur l'électricité, CTA et TVA à taux réduit sur l'abonnement / taux normal sur l'énergie).

Évitez trois erreurs fréquentes lors de vos bilans :
- **Multiplier la puissance maximale par 24 h** : un réfrigérateur affiche `140 W` en crête, mais son compresseur ne tourne que `25 %` à `35 %` du temps. Utiliser la puissance de plaque surestimerait la facture par trois ou quatre.
- **Confondre kVA et kWh** : réduire l'abonnement de `9 kVA` à `6 kVA` diminue la part fixe mais ne modifie pas le nombre de `kWh` facturés.
- **Se fier aux puissances théoriques** : pour des appareils à puissance modulée (ordinateur, pompe à chaleur Inverter), mesurez l'énergie réelle intégrée avec un wattmètre sur prise ou via la courbe de charge de votre compteur communicant (type Linky).
