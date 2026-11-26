---
title: "Coût de l'Électricité : Combien Coûtent vos Appareils ?"
description: "Apprenez à lire votre facture, à calculer les kilowattheures (kWh) et à prédire le coût de fonctionnement de vos appareils avec notre calculatrice gratuite."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "electricity-cost-calculator"
faqs:
  - question: "Quelle est la différence entre le kilowatt (kW) et le kilowattheure (kWh) ?"
    answer: "Le kilowatt (kW) mesure une puissance instantanée, c'est-à-dire le débit d'énergie maximal qu'un appareil peut absorber à un instant T. Le kilowattheure (kWh) mesure la quantité totale d'énergie consommée dans le temps : c'est l'unité facturée par votre fournisseur. Un appareil de 2 kW fonctionnant pendant 3 heures consomme 6 kWh."
  - question: "Pourquoi la consommation réelle d'un réfrigérateur ou d'un radiateur est-elle inférieure à sa puissance nominale ?"
    answer: "La puissance indiquée sur la plaque signalétique correspond à l'appel maximal lorsque l'élément chauffant ou le compresseur tourne à plein régime. Grâce à leur thermostat, un radiateur ou un réfrigérateur ne fonctionnent par intermittence que 30 % à 60 % du temps pour maintenir la température de consigne, ce qui réduit d'autant l'énergie réellement facturée."
  - question: "Combien coûte réellement la consommation cachée des appareils en veille ?"
    answer: "Même éteints avec la télécommande, une box internet, un téléviseur, un amplificateur ou un micro-ondes consomment chacun entre 2 W et 18 W en continu (24 h/24). Cumulée sur un logement entier, cette consommation dite fantôme atteint fréquemment 300 à 500 kWh par an, soit environ 65 € à 110 € annuels au tarif moyen de 0,22 €/kWh."
  - question: "L'option Heures Pleines / Heures Creuses est-elle toujours rentable ?"
    answer: "Non. En contrepartie d'un tarif réduit pendant 8 heures (généralement la nuit), le prix du kWh en Heures Pleines et le coût de l'abonnement sont plus élevés qu'en option Base. Pour que l'option HP/HC devienne avantageuse, il faut généralement décaler au moins 30 % à 40 % de sa consommation totale sur les plages creuses (chauffe-eau, recharge de véhicule électrique, lave-linge)."
  - question: "Comment mesurer la consommation exacte d'un appareil dont la puissance varie ?"
    answer: "Pour un ordinateur, un lave-linge ou une pompe à chaleur Inverter dont la puissance fluctue constamment selon le cycle, la plaque signalétique donne uniquement un plafond. Utilisez un wattmètre sur prise (prise connectée avec mesure d'énergie) pendant 24 heures ou relevez la courbe de charge horaire sur l'espace client de votre compteur communicant Linky."
---

Sur une facture d'électricité, vous ne payez pas les **watts (`W`)** inscrits sur l'étiquette de vos appareils, mais les **kilowattheures (`kWh`)** effectivement consommés au fil du temps, auxquels s'ajoutent l'abonnement fixe et les taxes. Un kilowattheure correspond à une puissance de `1 000 W` (`1 kW`) appelée en continu pendant exactement `1 heure`.

Connaître la puissance de l'appareil, sa durée de fonctionnement quotidienne, son facteur de charge réel (thermostat ou variateur) et votre tarif toutes taxes comprises (`TTC`) permet d'anticiper précisément son impact budgétaire mensuel et annuel. Pour obtenir immédiatement ces montants, utilisez notre [Calculatrice de Coût de l'Électricité](/fr/calculatrices/calculateur-de-cout-d-electricite).

## Formule de calcul énergétique et structure de la facture

Le calcul du coût de fonctionnement d'un équipement électrique repose sur la conversion de sa puissance moyenne en énergie facturable :

```text
Énergie journalière (kWh) : E_jour = [P (W) / 1 000] × t_heures × f_charge
Coût journalier (€)       : C_jour = E_jour × Tarif_TTC (€/kWh)
Coût annuel (€)           : C_an   = E_jour × N_jours × Tarif_TTC

Où :
  P         = puissance électrique nominale absorbée en watts (W)
  t_heures  = durée de mise sous tension par jour (h)
  f_charge  = facteur de fonctionnement effectif (de 0,0 à 1,0 ; ex. 1,00 pour une lampe)
  Tarif_TTC = prix unitaire du kWh incluant l'accise sur l'électricité et la TVA (20 %)
```

Une erreur fréquente consiste à utiliser le prix hors taxes (`HT`) figurant dans les grilles commerciales ou à oublier que votre facture comporte deux composantes distinctes : la **part fixe** (abonnement mensuel proportionnel à la puissance souscrite en `kVA`, par exemple `6 kVA` ou `9 kVA`) et la **part variable** proportionnelle aux `kWh` consommés. Seule cette part variable évolue lorsque vous allumez ou éteignez un appareil.

## Exemple chiffré étape par étape : chauffage d'appoint vs pompe à chaleur

Comparons deux solutions fournissant la même quantité de chaleur pour chauffer une pièce pendant `120 jours` d'hiver, à un tarif de référence de `0,22 €/kWh TTC` :

### Scénario A : radiateur convecteur d'appoint (`2 000 W`)

Supposons un appareil réglé sur thermostat qui maintient la pièce chaude `6 heures` par jour, avec un cycle de chauffe effectif de `60 %` (`f_charge = 0,60`) :

1. **Énergie électrique absorbée par jour :**
   - `E_jour = (2 000 / 1 000) × 6 × 0,60 = 2 × 6 × 0,60 = 7,20 kWh/jour`.
2. **Coût quotidien :**
   - `C_jour = 7,20 × 0,22 = 1,584 €`, soit `1,58 €/jour`.
3. **Bilan sur une saison de chauffe (`120 jours`) :**
   - Énergie totale : `7,20 × 120 = 864,00 kWh`.
   - Coût saisonnier : `864 × 0,22 = 190,08 €`.

### Scénario B : climatiseur réversible / pompe à chaleur air-air (`COP = 3,6`)

Pour restituer exactement les mêmes `7,20 kWh` thermiques par jour avec un coefficient de performance (`COP`) de `3,6` :

1. **Énergie électrique prélevée sur le réseau :**
   - `E_jour = 7,20 / 3,6 = 2,00 kWh/jour`.
2. **Coût quotidien et saisonnier (`120 jours`) :**
   - Coût quotidien : `2,00 × 0,22 = 0,44 €/jour`.
   - Énergie saisonnière : `2,00 × 120 = 240,00 kWh`.
   - Coût saisonnier : `240 × 0,22 = 52,80 €`.
3. **Économie nette réalisée sur l'hiver :**
   - `190,08 − 52,80 = 137,28 €` économisés, soit une baisse de facture de `72,2 %` à confort thermique identique.

## Tableau comparatif : consommation et coût annuel d'appareils courants

Les estimations ci-dessous s'appuient sur un tarif moyen de `0,22 €/kWh TTC` et des cycles d'utilisation résidentiels représentatifs en Europe :

| Appareil domestique | Puissance moyenne effective | Durée d'usage annuelle | Consommation (`kWh/an`) | Coût annuel (`0,22 €/kWh`) | Facteur déterminant |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Box internet + décodeur** | `18 W` (continu) | `8 760 h` (`24 h/j`) | `157,68 kWh` | `34,69 €` | Fonctionnement permanent `365 j/an` |
| **Téléviseur OLED 55"** | `110 W` | `1 460 h` (`4 h/j`) | `160,60 kWh` | `35,33 €` | Luminosité HDR et durée d'écran |
| **Sèche-linge pompe à chaleur** | `800 W` | `225 h` (`150 cycles`) | `180,00 kWh` | `39,60 €` | Remplace ~`2 200 W` à résistance |
| **Réfrigérateur combiné (D)** | `45 W` moy. (`150 W` crête, `30 %`) | `8 760 h` (`24 h/j`) | `394,20 kWh` | `86,72 €` | Température ambiante et joints |
| **Recharge véhicule électrique** | `7 400 W` (wallbox `32 A`) | `208 h` (`4 h/sem.`) | `1 539,20 kWh` | `338,62 €` | Gain net en Heures Creuses |
| **Chauffe-eau électrique 200 L** | `2 200 W` | `912,5 h` (`2,5 h/j`) | `2 007,50 kWh` | `441,65 €` | Pertes statiques et volume puisé |

## Erreurs fréquentes, optimisation et limites réglementaires

Pour interpréter correctement vos relevés de consommation et réduire durablement votre facture, gardez à l'esprit ces points clés :

- **Confondre puissance apparente (`VA`) et puissance active (`W`) :** Les compteurs résidentiels (tels que Linky) surveillent le dépassement de puissance souscrite en **kilovoltampères (`kVA`)**, mais facturent exclusivement l'énergie **active** en `kWh`. Pour les appareils résistifs (radiateur, bouilloire), `1 VA = 1 W`, tandis que certains moteurs ou alimentations non corrigées présentent un facteur de puissance inférieur à `1`.
- **Oublier l'étiquette énergie européenne :** Depuis la révision du règlement UE `2017/1369` (échelle unifiée de `A` à `G`), la classe énergétique affichée sur les réfrigérateurs, lave-linge et téléviseurs indique directement la consommation annuelle standardisée en `kWh/an` ou `kWh/100 cycles`, bien plus fiable qu'un calcul manuel à partir des watts de crête.
- **Négliger la température de consigne :** En chauffage électrique, baisser la consigne d'ambiance de `20 °C` à `19 °C` réduit en moyenne la consommation de chauffage d'environ `7 %`, et abaisser la consigne d'un ballon d'eau chaude de `65 °C` à `55 °C` diminue ses pertes thermiques tout en limitant l'entartrage (sous réserve d'un cycle hebdomadaire anti-légionellose à `60 °C`).
- **Sous-estimer le cumul des veilles :** Couper la box internet la nuit ou regrouper les équipements multimédias sur une multiprise à interrupteur permet fréquemment d'effacer `100` à `200 kWh/an` sans perte de confort.
