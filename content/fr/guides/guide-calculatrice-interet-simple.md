---
title: "Intérêt Simple vs Composé : Quelle est la Différence ?"
description: "Comprenez la différence mathématique et financière entre intérêt simple et intérêt composé : formules exactes, exemples chiffrés, impact de la durée et usages en épargne et crédit."
category: "Finance"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "simple-interest-calculator"
faqs:
  - question: "Dans quels produits financiers rencontre-t-on réellement l'intérêt simple ?"
    answer: "L'intérêt simple sert principalement à calculer les intérêts courus à court terme : obligations à coupon fixe sans réinvestissement, billets de trésorerie, découverts bancaires calculés au jour le jour, avances sur titres, pénalités de retard légales et certains prêts à court terme remboursés en une seule échéance (prêts in fine)."
  - question: "Un prêt auto ou personnel amortissable est-il vraiment à intérêt simple ?"
    answer: "En pratique bancaire, on appelle souvent ces crédits des prêts à intérêt simple car chaque mois les intérêts sont calculés uniquement sur le capital restant dû, sans capitalisation des intérêts passés tant que vous payez à l'échéance. Toutefois, comme le capital diminue à chaque mensualité, le montant total payé est bien inférieur à la formule linéaire I = C × r × t sur le capital initial."
  - question: "Pourquoi l'intérêt simple et l'intérêt composé annuel donnent-ils le même résultat sur 1 an ?"
    answer: "Avec une capitalisation annuelle (n = 1) sur une durée exactement égale à 1 an (t = 1), la formule composée C × (1 + r)^1 − C se réduit à C × r, soit exactement la même valeur que l'intérêt simple. L'écart n'apparaît qu'à partir de la deuxième période de capitalisation, ou dès la première année si la capitalisation est mensuelle ou quotidienne."
  - question: "Quelle est la différence entre taux nominal proportionnel et TAEG (taux effectif) ?"
    answer: "Le taux nominal proportionnel sert de base au calcul périodique (par exemple 6 % par an divisé par 12 = 0,5 % par mois). Le taux effectif annuel (ou TAEG pour un crédit) intègre l'effet de la fréquence de capitalisation ainsi que les frais obligatoires : un taux nominal de 6 % capitalisé mensuellement correspond à un rendement annuel effectif de 6,168 %."
  - question: "Comment convertir correctement les jours ou les mois dans la formule d'intérêt simple ?"
    answer: "L'unité du temps t doit toujours correspondre à l'unité du taux r. Si r est un taux annuel, exprimez 6 mois par t = 6/12 = 0,5 an, et 90 jours par t = 90/365 (convention exact/365 en France pour les découverts) ou 90/360 selon la convention monétaire du contrat."
---

L'intérêt rémunère l'immobilisation d'un capital selon deux mécanismes opposés : l'**intérêt simple**, dont la progression reste strictement linéaire sur le seul capital de départ, et l'**intérêt composé**, qui suit une trajectoire exponentielle parce que les intérêts acquis produisent à leur tour des intérêts.

La règle de décision est symétrique : en tant qu'**épargnant**, vous recherchez l'intérêt composé à fréquence élevée pour accélérer la croissance de votre patrimoine ; en tant qu'**emprunteur**, vous privilégiez l'intérêt simple afin d'éviter la capitalisation des intérêts dus. Utilisez notre [Calculatrice d'Intérêt Simple](/fr/calculatrices/calculateur-d-interet-simple) pour chiffrer instantanément vos intérêts linéaires en jours, mois ou années.

## Formules mathématiques et conventions de calcul

### 1. Intérêt simple (croissance linéaire)

Dans ce régime, l'assiette reste figée au capital initial `C_0` pendant toute la durée de l'opération :

```text
I_simple = C_0 × r × t
V_finale = C_0 × (1 + r × t)
```

- **`C_0`** : capital initial investi ou emprunté (`€`).
- **`r`** : taux annuel exprimé en décimal (`0,06` pour `6 %`).
- **`t`** : durée exprimée en années (`jours / 365` en base exacte, ou `mois / 12`).

### 2. Intérêt composé (croissance exponentielle)

Dans ce régime, les intérêts générés à chaque sous-période s'ajoutent au capital pour former la base suivante :

```text
V_finale = C_0 × (1 + r / k)^(k × t)
I_composé = V_finale − C_0
```

- **`k`** : fréquence annuelle de capitalisation (`1` annuelle, `4` trimestrielle, `12` mensuelle, `365` quotidienne).
- **`t`** : durée totale en années.

### Taux nominal et taux annuel effectif (`TEA`)

Lorsque `k > 1`, le taux nominal annuel `r` sous-estime le rendement ou le coût réel sur un an. Le taux effectif vaut `TEA = (1 + r / k)^k − 1`. Ainsi, `6 %` nominal capitalisé chaque mois (`k = 12`) correspond à un taux effectif annuel de `(1 + 0,06 / 12)^12 − 1 = 6,168 %`.

## Exemple chiffré : 15 000 € placés à 6 % sur plusieurs horizons

Prenons un capital `C_0 = 15 000 €` rémunéré à `6 %` nominal (`r = 0,06`) sans versement complémentaire :

1. **À 1 an (`t = 1`)** : en intérêt simple, `I = 15 000 × 0,06 × 1 = 900,00 €`, soit **15 900,00 €** au total. En capitalisation annuelle (`k = 1`), le montant est identique (**15 900,00 €**). En capitalisation mensuelle (`k = 12`), il atteint **15 925,17 €**, soit déjà **25,17 €** d'écart.
2. **À 5 ans (`t = 5`)** : l'intérêt simple produit toujours `900 €` par an, soit `4 500,00 €` cumulés (**19 500,00 €**). En composé annuel, le capital grimpe à `15 000 × 1,06^5 = 20 073,38 €` (`5 073,38 €` d'intérêts), et à **20 232,75 €** en capitalisation mensuelle.
3. **À 15 ans (`t = 15`)** : la droite linéaire atteint `15 000 + (900 × 15) = 28 500,00 €` (`13 500,00 €` d'intérêts). La capitalisation annuelle porte le solde à **35 948,37 €** (`20 948,37 €` d'intérêts) et la capitalisation mensuelle à **36 811,40 €** (`21 811,40 €` d'intérêts), soit **8 311,40 €** de gains additionnels par rapport à l'intérêt simple.

## Tableau comparatif : 15 000 € à 6 % nominal selon l'horizon

| Durée (`t`) | Intérêt simple (capital final) | Intérêt simple (intérêts seuls) | Composé annuel (`k = 1`) | Composé mensuel (`k = 12`) | Gain du composé mensuel vs simple |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 6 mois (`0,5` an) | 15 450,00 € | 450,00 € | 15 443,45 € (prorata) | 15 455,66 € | +5,66 € |
| 1 an | 15 900,00 € | 900,00 € | 15 900,00 € | 15 925,17 € | +25,17 € |
| 3 ans | 17 700,00 € | 2 700,00 € | 17 865,24 € | 17 950,21 € | +250,21 € |
| 5 ans | 19 500,00 € | 4 500,00 € | 20 073,38 € | 20 232,75 € | +732,75 € |
| 10 ans | 24 000,00 € | 9 000,00 € | 26 862,72 € | 27 290,95 € | +3 290,95 € |
| 15 ans | 28 500,00 € | 13 500,00 € | 35 948,37 € | 36 811,40 € | +8 311,40 € |

Pour estimer de tête le temps de doublement d'un capital en intérêt composé, la **règle de 72** donne `72 / 6 = 12 ans` (contre `100 / 6 = 16,7 ans` en intérêt simple).

## Cas d'usage réels, erreurs de calcul et cadre légal

### Applications financières courantes

- **Intérêt simple** : escompte commercial, billets de trésorerie, intérêts intercalaires d'un prêt débloqué par tranches, obligations à coupon versé sans réinvestissement, pénalités de retard et calcul quotidien des agios sur découvert.
- **Intérêt composé** : livrets réglementés (Livret A, LDDS, calculés par quinzaine avec capitalisation au 31 décembre), assurance-vie en fonds euros, ETF capitalisants, mais aussi le solde impayé d'une **carte de crédit renouvelable**, dont les intérêts mensuels s'ajoutent au capital dû.

### Erreurs fréquentes et vigilance réglementaire

1. **Incohérence d'unités** : appliquer un taux annuel à un nombre de mois sans diviser par 12 surestime le résultat d'un facteur 12. Vérifiez aussi si la convention de jours retenue est l'année civile (`365` ou `366` jours) ou l'année bancaire « lombarde » (`360` jours), régulièrement censurée en France sur les crédits immobiliers aux particuliers lorsqu'elle majore le TAEG au détriment de l'emprunteur.
2. **Encadrement de l'anatocisme** : en droit civil français (article 1343-2 du Code civil), la capitalisation des intérêts échus sur une créance impayée est encadrée et exige en principe des intérêts dus au moins pour une année entière, hors exceptions bancaires de compte courant. Effectuez vos simulations linéaires avec notre [Calculatrice d'Intérêt Simple](/fr/calculatrices/calculateur-d-interet-simple).
