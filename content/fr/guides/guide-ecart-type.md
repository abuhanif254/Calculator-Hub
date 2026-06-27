---
title: "Comprendre l'Écart-Type avec des Exemples"
description: "Une explication claire de l'écart-type et de la variance : la différence entre les formules de population et d'échantillon, et ce que σ vous dit."
category: "Math & Science"
readingTime: 7
lastUpdated: "2026-06-11"
relatedCalculator: "standard-deviation-calculator"
---

## Qu'est-ce que l'Écart-Type ?

L'**écart-type** est une mesure de la dispersion des valeurs d'un ensemble de données autour de la moyenne. Un petit écart-type signifie que les valeurs sont regroupées étroitement autour de la moyenne ; un grand écart-type signifie que les valeurs sont très dispersées.

Il répond à la question fondamentale : *"À quel point la moyenne est-elle typique ?"*

L'écart-type est représenté par la lettre grecque **σ (sigma)** pour une population et **s** pour un échantillon.

## Les Formules

### Écart-Type de la Population (σ)
À utiliser lorsque vous disposez de données pour une **population entière**.

$$
\sigma = \sqrt{\frac{\sum_{i=1}^{N}(x_i - \mu)^2}{N}}
$$

### Écart-Type de l'Échantillon (s)
À utiliser lorsque vos données sont un **échantillon tiré d'une population plus large**.

$$
s = \sqrt{\frac{\sum_{i=1}^{n}(x_i - \bar{x})^2}{n-1}}
$$

**La différence critique :** La formule de l'échantillon divise par **(n − 1)** au lieu de **n**. C'est ce qu'on appelle la **correction de Bessel**.

## Guide Étape par Étape : Exemple Résolu

**Ensemble de données : [4, 7, 13, 2, 1]** (Échantillon, n = 5)

### Étape 1 : Calculez la Moyenne
$$
\bar{x} = \frac{4 + 7 + 13 + 2 + 1}{5} = 5,4
$$

### Étape 2 : Trouvez l'écart avec la moyenne pour chaque valeur
$$ (4 - 5,4) = -1,4 \quad (7 - 5,4) = 1,6 \quad (13 - 5,4) = 7,6 $$

### Étape 3 : Mettez au carré chaque écart
$$ 1,96 \quad 2,56 \quad 57,76 \quad 11,56 \quad 19,36 $$

### Étape 4 : Sommez les écarts au carré
$$ \sum = \textbf{93,2} $$

### Étape 5 : Divisez par (n − 1) pour la variance de l'échantillon
$$ s^2 = \frac{93,2}{4} = \textbf{23,3} $$

### Étape 6 : Prenez la racine carrée
$$ s = \sqrt{23,3} \approx \textbf{4,83} $$

## La Règle Empirique (68-95-99,7)
Pour les distributions normales (en cloche) :
- **μ ± 1σ :** 68,27 % des valeurs
- **μ ± 2σ :** 95,45 % des valeurs
- **μ ± 3σ :** 99,73 % des valeurs

## Questions Fréquemment Posées

**Pourquoi l'écart-type est-il plus utile que la variance ?**
La variance est exprimée en unités au carré. L'écart-type ramène la dispersion à l'unité de mesure d'origine.

**L'écart-type peut-il être nul ou négatif ?**
Il peut être nul (si toutes les valeurs sont identiques), mais il ne peut **jamais** être négatif.
