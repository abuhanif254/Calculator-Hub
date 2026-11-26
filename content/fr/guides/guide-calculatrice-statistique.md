---
title: "Statistiques Descriptives Expliquées : Comment Analyser Vos Données"
description: "Maîtrisez les statistiques descriptives : moyenne, médiane, mode, variance, écart-type, correction de Bessel (n − 1), quartiles, exemple chiffré et tableau de référence."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "statistics-calculator"
relatedType: "calculator"
faqs:
  - question: "Quand faut-il choisir la variance d'échantillon (n − 1) plutôt que la variance de population (N) ?"
    answer: "Utilisez la division par N uniquement lorsque vous disposez de l'intégralité exhaustive de la population étudiée (par exemple, tous les salariés d'une entreprise donnée). Dès que vos données proviennent d'un prélèvement ou d'un sous-ensemble destiné à estimer un phénomène plus large, appliquez la correction de Bessel (n − 1) pour obtenir un estimateur sans biais."
  - question: "Pourquoi la moyenne et la médiane divergent-elles fortement sur certains jeux de données ?"
    answer: "La moyenne intègre la valeur exacte de chaque observation : une seule donnée très élevée (comme un revenu exceptionnel ou un temps de latence anormal) la tire fortement vers le haut. La médiane ne dépend que du rang central ; lorsque moyenne et médiane s'écartent nettement, votre distribution présente une asymétrie prononcée ou des valeurs aberrantes."
  - question: "Comment interpréter un écart-type élevé par rapport à la moyenne ?"
    answer: "Un écart-type élevé indique une forte hétérogénéité : les points s'étalent largement autour de la moyenne. Pour évaluer objectivement cette dispersion indépendamment de l'unité de mesure, calculez le coefficient de variation CV = (s / x̄) × 100 %. Au-delà de 30 %, une série est généralement considérée comme fortement dispersée."
  - question: "Quelle est la méthode standard pour détecter statistiquement une valeur aberrante ?"
    answer: "La règle de Tukey s'appuie sur les quartiles et l'écart interquartile (EIQ = Q3 − Q1). Toute observation inférieure à Q1 − 1,5 × EIQ ou supérieure à Q3 + 1,5 × EIQ est signalée comme valeur aberrante potentielle (outlier), car cette borne reste insensible aux extrêmes qu'elle cherche précisément à isoler."
  - question: "La variance et l'écart-type s'expriment-ils dans la même unité que les données ?"
    answer: "Non pour la variance, dont l'unité est élevée au carré (par exemple des g² ou des €²), ce qui rend son interprétation directe peu intuitive. En prenant sa racine carrée, l'écart-type retrouve exactement l'unité d'origine des mesures (grammes, euros, secondes), permettant une lecture immédiate de la marge de dispersion."
---

La **statistique descriptive** résume un jeu de données brut à l'aide d'indicateurs numériques rigoureux, avant toute modélisation probabiliste ou inférentielle. Pour caractériser fidèlement une série en finance, en ingénierie industrielle ou en recherche clinique, il est indispensable d'évaluer simultanément deux dimensions complémentaires : la **tendance centrale** (où se concentrent les mesures) et la **dispersion** (avec quelle amplitude elles s'écartent du centre).

Une analyse réduite à la seule moyenne arithmétique masque fréquemment des anomalies majeures, telles qu'une forte asymétrie, une bimodalité ou la présence de valeurs aberrantes. Notre [Calculatrice de Statistiques](/fr/calculatrices/calculatrice-statistique) calcule en une seule passe l'ensemble des mesures de position et de variabilité, en distinguant explicitement les formules de population et d'échantillon.

## Mesures de tendance centrale et de position

Pour une série statistique ordonnée `x₁ ≤ x₂ ≤ … ≤ xₙ`, quatre indicateurs complémentaires décrivent la localisation des valeurs :

- **Moyenne arithmétique (`x̄` ou `μ`) :** somme des observations divisée par l'effectif (`Σxᵢ / n`). Optimale pour les distributions symétriques, elle reste toutefois très sensible aux valeurs extrêmes.
- **Médiane (`Me`) :** valeur centrale qui partage la série triée en deux effectifs de `50 %`. Pour un effectif impair, il s'agit de l'élément de rang `(n + 1) / 2` ; pour un effectif pair, de la demi-somme des rangs `n / 2` et `(n / 2) + 1`.
- **Mode (`Mo`) :** valeur la plus fréquente du jeu de données, utile pour détecter un pic dominant ou résumer des classes discrètes.
- **Quartiles (`Q1`, `Q2`, `Q3`) :** seuils qui découpent la série ordonnée en quatre quarts (`25 %`, `50 %`, `75 %`). L'écart interquartile `EIQ = Q3 − Q1` mesure l'étalement du cœur de la distribution en neutralisant les extrêmes.

## Mesures de dispersion et correction de Bessel

Deux séries peuvent présenter exactement la même moyenne tout en affichant des dispersions opposées. On quantifie cet étalement grâce aux formules suivantes :

```text
Étendue                  : E = max(x) − min(x)
Variance de population   : σ² = [Σ (xᵢ − μ)²] / N       | Écart-type : σ = √(σ²)
Variance d'échantillon   : s² = [Σ (xᵢ − x̄)²] / (n − 1) | Écart-type : s = √(s²)
Coefficient de variation : CV = (s / |x̄|) × 100 %
```

### Pourquoi diviser par n − 1 pour un échantillon ?

Lorsque la vraie moyenne `μ` de la population entière est inconnue, on l'estime par la moyenne empirique `x̄` calculée sur l'échantillon prélevé. Or, par propriété algébrique, la somme des carrés des écarts est toujours minimale autour de `x̄` et jamais plus grande qu'autour de `μ`. Diviser par `n` sous-estimerait donc systématiquement la variance réelle de la population. Remplacer `n` par `n − 1` degrés de liberté constitue la **correction de Bessel**, garantissant un estimateur sans biais de la variance.

## Exemple chiffré : contrôle qualité d'une ligne d'ensachage

Un responsable qualité pèse un échantillon aléatoire de `n = 8` sachets de café étiquetés `250 g`. Les masses relevées en grammes sont : `248, 250, 250, 251, 252, 253, 254, 262`.

```text
1. Moyenne, médiane, mode et étendue :
   Σxᵢ = 2 020 g  →  x̄ = 2 020 / 8 = 252,5 g
   Me  = (251 + 252) / 2 = 251,5 g  |  Mo = 250 g  |  Étendue = 262 − 248 = 14 g

2. Somme des carrés des écarts à la moyenne x̄ = 252,5 g :
   (−4,5)² + 2×(−2,5)² + (−1,5)² + (−0,5)² + (+0,5)² + (+1,5)² + (+9,5)²
   = 20,25 + 12,50 + 2,25 + 0,25 + 0,25 + 2,25 + 90,25 = 128,00 g²

3. Variance, écart-type et détection d'anomalie selon Tukey :
   Échantillon (n − 1 = 7) : s² = 128,00 / 7 ≈ 18,29 g²  →  s ≈ 4,28 g
   Population  (N = 8)     : σ² = 128,00 / 8 = 16,00 g²  →  σ = 4,00 g
   CV = (4,28 / 252,5) × 100 ≈ 1,69 %
   Q1 = 250 g, Q3 = 253,5 g, EIQ = 3,5 g → seuil haut = 253,5 + 1,5 × 3,5 = 258,75 g
```

Le sachet de `262 g` dépasse nettement le seuil haut de Tukey (`258,75 g`). À lui seul, il génère `90,25 g²` de variance sur `128,00 g²` (soit `70,5 %` de la variance totale), signalant une dérive ponctuelle de la doseuse qu'il convient de corriger.

## Tableau récapitulatif des indicateurs statistiques

| Indicateur | Formule ou définition | Unité | Robustesse aux extrêmes | Usage privilégié |
| :--- | :--- | :--- | :--- | :--- |
| Moyenne (`x̄`) | `Σxᵢ / n` | Unité d'origine | Faible | Séries symétriques et bilans globaux |
| Médiane (`Me`) | `50e` centile ordonné | Unité d'origine | Élevée | Salaires (`€`), immobilier, délais |
| Écart-type échantillon (`s`) | `√[Σ(xᵢ − x̄)² / (n − 1)]` | Unité d'origine | Faible | Inférence depuis un prélèvement partiel |
| Écart-type population (`σ`) | `√[Σ(xᵢ − μ)² / N]` | Unité d'origine | Faible | Recensement complet d'un ensemble fermé |
| Écart interquartile (`EIQ`) | `Q3 − Q1` | Unité d'origine | Très élevée | Mesure de dispersion avec valeurs aberrantes |
| Coefficient de variation (`CV`) | `(s / \|x̄\|) × 100 %` | Pourcentage (`%`) | Faible | Comparer deux séries d'échelles distinctes |

## Applications, biais courants et précision numérique

En finance, l'écart-type des rendements mesure la volatilité d'un portefeuille en euros (`€`), tandis qu'en ingénierie il suit la stabilité énergétique (`kWh` ou `m³`). Surveillez quatre pièges courants :

- **Confusion entre `n` et `n − 1` :** sur `n = 5`, l'écart entre `s` et `σ` dépasse `11 %`, faussant les intervalles de confiance.
- **Paradoxe de Simpson :** une moyenne agrégée peut inverser la tendance des sous-groupes ; segmentez toujours vos catégories.
- **Instabilité numérique :** la formule développée `Σxᵢ² / n − x̄²` perd en précision sur grands nombres ; les algorithmes centrés ou de Welford évitent ce défaut.
- **Échelles incomparables :** un écart-type de `10 €` sur `20 €` (`CV = 50 %`) traduit une variabilité bien supérieure à `100 €` sur `1 200 €` (`CV = 8,33 %`).

Importez vos mesures dans la [Calculatrice de Statistiques](/fr/calculatrices/calculatrice-statistique) en choisissant le mode *Échantillon* ou *Population* adapté pour obtenir un bilan complet et fiable.
