---
title: "Intérêts Simples vs Composés : Le Guide de la Croissance"
description: "Maîtrisez la différence mathématique entre intérêts simples et intérêts composés : formules exactes, fréquences de capitalisation, exemple chiffré sur 10 ans et cadre fiscal français."
category: "Finance"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "interest-calculator"
relatedType: "calculator"
faqs:
  - question: "Quelle est la différence fondamentale entre un intérêt simple et un intérêt composé ?"
    answer: "L'intérêt simple est calculé uniquement sur le capital initial pendant toute la durée de l'opération, ce qui produit une progression strictement linéaire. L'intérêt composé s'ajoute périodiquement au capital de départ afin de produire lui-même des intérêts lors des périodes suivantes, générant une croissance exponentielle."
  - question: "Comment la fréquence de capitalisation modifie-t-elle le rendement réel d'un placement ?"
    answer: "Plus la capitalisation est fréquente (mensuelle ou quotidienne plutôt qu'annuelle), plus les intérêts acquis commencent tôt à fructifier. À un taux nominal annuel de 6,00 %, une capitalisation annuelle rapporte exactement 6,0000 % par an, tandis qu'une capitalisation mensuelle élève le taux effectif annuel (TEA) à 6,1678 %."
  - question: "Comment fonctionne la règle de 72 pour estimer le doublement d'un capital ?"
    answer: "La règle de 72 permet d'approximer le nombre d'années nécessaires pour doubler un capital en divisant 72 par le taux d'intérêt composé annuel exprimé en pourcentage. À 6,00 % par an, le capital double en environ 72 / 6 = 12 ans (le calcul logarithmique exact donne 11,90 ans)."
  - question: "Dans quels produits financiers rencontre-t-on encore des intérêts simples ?"
    answer: "L'intérêt simple s'applique aux prêts de trésorerie à très court terme, aux découverts bancaires facturés au prorata temporis, aux intérêts moratoires ou légaux, ainsi qu'aux obligations à coupon fixe lorsque vous percevez les coupons en espèces sans les réinvestir."
  - question: "Comment la règle des quinzaines du Livret A en France interagit-elle avec la capitalisation ?"
    answer: "Sur un Livret A ou un LDDS, les intérêts sont calculés par quinzaine (les 1er et 16 de chaque mois) selon une méthode d'intérêt simple intra-annuelle, puis capitalisés une seule fois par an au 31 décembre. Les intérêts de l'année N produisent donc de nouveaux intérêts à compter du 1er janvier de l'année N+1."
---

La distinction entre **intérêt simple** et **intérêt composé** constitue le socle de toute décision d'épargne ou d'emprunt. Alors que l'intérêt simple rémunère exclusivement votre mise de départ à un rythme linéaire constant, l'intérêt composé réintègre les gains accumulés dans la base de calcul, créant une croissance exponentielle qui s'accélère avec le temps.

À moins d'un an, l'écart entre les deux régimes reste limité ; sur dix à trente ans, la capitalisation génère l'essentiel du patrimoine final. Pour comparer ces trajectoires selon vos montants et fréquences de calcul, testez vos hypothèses avec notre [Calculatrice d'Intérêts](/fr/calculatrices/calculatrice-interets).

## Formules mathématiques et paramètres de capitalisation

L'intérêt simple applique une proportion directe du capital initial (`P`), du taux nominal annuel (`r`) et de la durée en années (`t`), tandis que l'intérêt composé recalcule la rémunération sur `m` périodes annuelles (`1`, `4`, `12` ou `365`) :

```text
Intérêt simple           : I = P × r × t   et   VF = P × (1 + r × t)
Valeur future composée   : VF = P × (1 + r / m)^(m × t)
Capitalisation continue  : VF = P × e^(r × t)
Taux effectif annuel     : TEA = (1 + r / m)^m − 1
```

Chaque variable suit une convention stricte :

- **`P` (Principal)** : capital initial investi ou emprunté dès le premier jour, exprimé en euros (`€`).
- **`r` (Taux nominal annuel)** : taux contractuel sous forme décimale (`0,06` pour `6,00 %`).
- **`t` (Durée)** : horizon total en années (ou fraction d'année, comme `90 / 365`).
- **`m` (Fréquence annuelle)** : nombre de capitalisations par an. Plus `m` augmente, plus le `TEA` dépasse `r`, convergeant vers `e^r − 1` (`6,1837 %` pour `6,00 %` en continu).

### Règle de 72 et temps de doublement

Pour estimer mentalement le doublement d'un capital, divisez `72` par le taux annuel en pourcentage (`t ≈ 72 / taux`). La formule logarithmique exacte vaut `ln(2) / ln(1 + r)`. À `6,00 %` l'an, l'approximation donne `12,00 ans` contre `11,90 ans` exactement.

## Exemple chiffré étape par étape : 10 000 € à 6,00 % sur 10 ans

Comparons **`10 000 €`** placés à **`6,00 %`** (`r = 0,06`) pendant **`10 ans`** selon trois régimes :

1. **Intérêt simple** : chaque année verse `10 000 € × 0,06 = 600,00 €`. Au bout de 10 ans, les gains cumulent `6 000,00 €` pour une valeur finale de **`16 000,00 €`**.
2. **Composé annuel (`m = 1`)** : `VF = 10 000 × (1,06)^10 = 10 000 × 1,790848 = 17 908,48 €`. Les intérêts s'élèvent à `7 908,48 €`, soit **`1 908,48 €` de surplus** issus des intérêts réinvestis.
3. **Composé mensuel (`m = 12`)** : au taux mensuel de `0,50 %` (`0,06 / 12`) sur `120` mois, `VF = 10 000 × (1,005)^120 = 18 193,97 €`. Le `TEA` atteint **`6,1678 %`** et l'avantage sur l'intérêt simple grimpe à **`2 193,97 €`**.

À `20 ans`, l'intérêt simple plafonne à `22 000,00 €`, alors que la capitalisation mensuelle atteint `33 102,04 €` : les intérêts cumulés représentent alors `70 %` du capital total.

## Tableau comparatif : évolution de 10 000 € à 6,00 % selon la durée

Ce tableau confronte la valeur future de **`10 000 €`** placés à `6,00 %` nominal sans versement complémentaire, entre `1` et `30` ans :

| Horizon (`t`) | Intérêt simple | Composé annuel | Composé mensuel | Composé continu | Gain mensuel vs simple |
|---:|---:|---:|---:|---:|---:|
| 1 an | 10 600,00 € | 10 600,00 € | 10 616,78 € | 10 618,37 € | +16,78 € |
| 5 ans | 13 000,00 € | 13 382,26 € | 13 488,50 € | 13 498,59 € | +488,50 € |
| 10 ans | 16 000,00 € | 17 908,48 € | 18 193,97 € | 18 221,19 € | +2 193,97 € |
| 15 ans | 19 000,00 € | 23 965,58 € | 24 540,94 € | 24 596,03 € | +5 540,94 € |
| 20 ans | 22 000,00 € | 32 071,35 € | 33 102,04 € | 33 201,17 € | +11 102,04 € |
| 30 ans | 28 000,00 € | 57 434,91 € | 60 225,75 € | 60 496,47 € | +32 225,75 € |

Sur `30 ans`, la capitalisation mensuelle (`60 225,75 €`) génère **`32 225,75 €`** de plus que l'intérêt simple (`28 000,00 €`), soit plus du triple de la mise initiale en gains composés.

## Cas d'usage, pièges courants et fiscalité française

L'intérêt simple régit les opérations courtes : agios de découvert calculés au jour le jour (`solde × jours × taux / 365`), pénalités commerciales ou obligations à coupon fixe dont les intérêts sont dépensés. L'intérêt composé gouverne l'épargne longue (ETF capitalisants en PEA ou assurance-vie, PER, comptes à terme capitalisés) ainsi que les dettes non soldées soumises à l'anatocisme.

Évitez quatre écueils fréquents dans vos simulations :

1. **Confondre taux nominal et TEA / TAEG** : `6,00 %` capitalisés chaque mois délivrent `6,1678 %` effectifs à l'épargnant, et alourdissent d'autant le coût d'un crédit.
2. **Négliger la règle des quinzaines** : sur un Livret A ou un LDDS, les dépôts produisent intérêt le `1er` ou le `16` suivant, et la capitalisation reste annuelle au `31 décembre`.
3. **Ignorer le frottement fiscal et les frais** : hors enveloppes exonérées, le Prélèvement Forfaitaire Unique (`PFU` à `30 %`) réduit chaque gain annuel cristallisé (`6,00 %` brut tombe à `4,20 %` net).
4. **Oublier l'inflation** : déduisez toujours la hausse des prix (par exemple `2 %` par an) pour estimer votre pouvoir d'achat futur en euros constants.
