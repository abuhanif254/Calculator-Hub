---
title: "Calculatrice de Réductions : Les Mathématiques des Soldes"
description: "Maîtrisez le calcul des remises simples, le mécanisme multiplicatif des doubles démarques, le calcul du prix d'origine et la marge commerciale avec notre Calculatrice de Réductions."
category: "Finance"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "percent-off-calculator"
faqs:
  - question: "Pourquoi deux réductions successives de 30 % et 20 % ne donnent-elles pas 50 % de remise ?"
    answer: "Parce que la deuxième remise ne s'applique pas au prix initial, mais au prix déjà réduit de 30 % (soit 70 % du tarif de départ). Retirer 20 % de 70 % revient à retirer 14 % du prix initial, et non 20 %. Le taux global cumulé est donc de 30 % + 14 % = 44 %, laissant un prix final à 56 % de la valeur d'origine."
  - question: "L'ordre dans lequel on applique deux réductions en pourcentage change-t-il le prix final ?"
    answer: "Non. La multiplication étant commutative, appliquer -30 % puis -20 % (0,70 × 0,80 = 0,56) produit exactement le même résultat qu'appliquer -20 % puis -30 % (0,80 × 0,70 = 0,56). En revanche, si vous combinez un bon fixe en euros (ex. -20 €) et un pourcentage (ex. -20 %), appliquer d'abord le pourcentage puis déduire le bon fixe est toujours plus avantageux pour l'acheteur."
  - question: "Comment retrouver le prix d'origine d'un article à partir de son prix soldé ?"
    answer: "Il ne faut surtout pas ajouter le pourcentage de remise au prix soldé, car cela sous-estimerait le prix initial. Vous devez diviser le prix remisé par le coefficient multiplicateur (1 − taux de remise). Par exemple, pour un article payé 80 € après -20 %, le prix initial était de 80 / (1 − 0,20) = 80 / 0,80 = 100 €."
  - question: "Pourquoi une hausse de 25 % ne compense-t-elle pas une baisse de 25 % ?"
    answer: "Les variations en pourcentage sont asymétriques car la base de calcul change. Sur un prix de 100 €, une baisse de 25 % mène à 75 €. Appliquer ensuite +25 % sur 75 € n'ajoute que 18,75 €, soit 93,75 € au total. Pour revenir de 75 € à 100 €, une augmentation exacte de 33,33 % (25 / 75) est indispensable."
  - question: "Que garantit la directive européenne Omnibus sur l'affichage des prix barrés ?"
    answer: "Transposée en droit français à l'article L. 112-1-1 du Code de la consommation, la directive européenne Omnibus impose aux commerçants annonçant une réduction de prix d'indiquer clairement le prix antérieur le plus bas pratiqué au cours des 30 jours précédant l'opération. Cette règle vise à empêcher les gonflements artificiels de prix juste avant les soldes."
---

En période de soldes ou de ventes privées, les étiquettes cumulent fréquemment deux taux, tels que « `-30 %` + `-15 %` en caisse ». Spontanément, l'intuition additionne ces chiffres et conclut à `-45 %`, alors que l'économie réelle ne dépasse pas `40,5 %`.

Les réductions successives obéissent à une règle multiplicative : chaque remise s'applique uniquement sur le prix résiduel obtenu à l'étape précédente. Maîtriser les coefficients multiplicateurs permet de vérifier vos économies nettes, de comparer des coupons mixtes et de retrouver un prix barré grâce à notre [Calculatrice de Réductions](/fr/calculatrices/calculateur-pourcentage-reduction).

## Équations fondamentales des remises simples et cumulées

Chaque pourcentage de réduction `d` (exprimé en décimale, comme `0,30` pour `30 %`) se traduit par un **coefficient multiplicateur** égal à `(1 − d)`, qui représente la fraction du prix initial restant à payer :

```text
Prix final (remise simple) = Prix initial × (1 − d)
Économie réalisée = Prix initial × d = Prix initial − Prix final
Prix final (n remises) = Prix initial × (1 − d1) × (1 − d2) × ... × (1 − dn)
Taux global équivalent (2 remises) = d1 + d2 − (d1 × d2)
Prix initial retrouvé = Prix final / (1 − d)
```

Les variables interviennent avec précision :

- **`Prix initial`** : tarif catalogue de référence en euros (`€`) avant toute démarque.
- **`d`, `d1`, `d2`** : taux de réduction exprimés sous forme décimale (`0 ≤ d < 1`).
- **`(1 − d1) × (1 − d2)`** : coefficient multiplicateur cumulé. La multiplication étant commutative, permuter deux pourcentages purs ne modifie jamais le prix final.

Pour calculer de tête sans outil, isolez **`10 %`** en décalant la virgule d'un rang à gauche. Pour `-35 %` sur `140,00 €`, prenez `10 % = 14,00 €`, multipliez par `3` (`42,00 €` pour `30 %`) et ajoutez la moitié de `10 %` (`7,00 €` pour `5 %`), soit `49,00 €` de rabais et `91,00 €` à payer.

## Exemple chiffré étape par étape : double démarque et calcul inversé

### Cas A : Cumul de deux remises en pourcentage

Un manteau à `180,00 €` reçoit une démarque de `-30 %`, puis une remise fidélité de `-15 %` en caisse :

1. **Première démarque (`-30 %`)** : `180,00 × 0,70 = 126,00 €` (économie de `54,00 €`).
2. **Seconde démarque (`-15 %`)** : appliquée sur `126,00 €`, elle donne `126,00 × 0,85 = 107,10 €` (économie supplémentaire de `18,90 €`).
3. **Bilan global** : l'économie totale vaut `72,90 €`. La formule confirme le taux réel : `0,30 + 0,15 − (0,30 × 0,15) = 0,405`, soit **`40,5 %`** (et non `45 %`, qui aurait promis `99,00 €`, soit `8,10 €` d'écart).

### Cas B : Retrouver le prix initial avant réduction

Un ordinateur portable est affiché à `748,00 €` après `-15 %`. Son tarif d'origine se calcule par division par `(1 − 0,15) = 0,85` : `748,00 / 0,85 = 880,00 €`. Rajouter `15 %` à `748,00 €` donnerait à tort `860,20 €`, soit une erreur de `19,80 €`.

## Tableau d'équivalence des doubles remises et marges de récupération

| Remises affichées | Somme apparente | Taux global réel | Coefficient | Prix final sur `100,00 €` | Hausse pour revenir à `100,00 €` |
| :--- | :---: | :---: | :---: | :---: | :---: |
| `-10 %` puis `-10 %` | `-20,0 %` | **`-19,0 %`** | `× 0,810` | `81,00 €` | `+23,46 %` |
| `-20 %` puis `-10 %` | `-30,0 %` | **`-28,0 %`** | `× 0,720` | `72,00 €` | `+38,89 %` |
| `-25 %` puis `-20 %` | `-45,0 %` | **`-40,0 %`** | `× 0,600` | `60,00 €` | `+66,67 %` |
| `-30 %` puis `-20 %` | `-50,0 %` | **`-44,0 %`** | `× 0,560` | `56,00 €` | `+78,57 %` |
| `-40 %` puis `-20 %` | `-60,0 %` | **`-52,0 %`** | `× 0,480` | `48,00 €` | `+108,33 %` |
| `-50 %` puis `-20 %` | `-70,0 %` | **`-60,0 %`** | `× 0,400` | `40,00 €` | `+150,00 %` |

## Applications commerciales, pièges marketing et cadre réglementaire

Ces règles mathématiques éclairent plusieurs stratégies commerciales et obligations légales :

- **Ordre entre bon fixe et pourcentage** : combiner `-20 €` et `-20 %` dépend de l'ordre d'application. Sur `100 €`, déduire d'abord `20 €` puis `-20 %` coûte `64,00 €` (`80 × 0,80`), alors qu'appliquer `-20 %` puis `-20 €` ramène la facture à `60,00 €`.
- **Impact sur la marge commerciale** : pour un commerçant vendant `100 € HT` un produit acheté `60 € HT` (marge de `40 €`), une remise de `-20 %` abaisse le prix à `80 € HT` et divise la marge unitaire par deux (`20 €`). Il devra donc doubler ses ventes (`+100 %` de volume) pour préserver son profit brut total.
- **Lots « `2` achetés, le `3e` offert »** : le rabais équivaut à `33,33 %` uniquement pour trois articles de prix identique. Dès que les tarifs diffèrent et que le moins cher est offert, la réduction réelle diminue fortement. Par exemple, avec deux articles à soixante euros et un troisième à trente euros, le panier passe de cent cinquante à cent vingt euros, soit seulement vingt pour cent de remise effective.
- **Asymétrie entre baisse et hausse de prix** : après une chute tarifaire de cinquante pour cent, un produit passé de cent à cinquante euros doit doubler de valeur pour retrouver son niveau initial, soit une progression nécessaire de cent pour cent. Confondre ces bases relatives fausse fréquemment les prévisions de chiffre d'affaires lors des campagnes promotionnelles saisonnières.
- **Encadrement des prix barrés (directive Omnibus)** : en France (article L. 112-1-1 du Code de la consommation), toute annonce de baisse de prix doit afficher comme référence le prix le plus bas pratiqué durant les `30` jours précédents, interdisant les majorations artificielles préalables destinées à gonfler l'ampleur apparente de la promotion.
