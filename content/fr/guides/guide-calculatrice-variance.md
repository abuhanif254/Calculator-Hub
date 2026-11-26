---
title: "Comprendre la Variance : Formules de Population vs Échantillon"
description: "Maîtrisez le calcul de la variance : différence entre population (N) et échantillon (n − 1, correction de Bessel), exemple chiffré, tableau comparatif et stabilité numérique."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "variance-calculator"
faqs:
  - question: "Pourquoi divise-t-on par n − 1 et non par n pour la variance d'échantillon ?"
    answer: "Lorsqu'on estime la dispersion à partir d'un échantillon, on utilise la moyenne de l'échantillon x̄ à la place de la vraie moyenne inconnue de la population μ. Or la somme des écarts à x̄ est contrainte à zéro, ce qui consomme un degré de liberté et sous-estime systématiquement la dispersion réelle d'un facteur (n − 1) / n. Diviser par n − 1 (correction de Bessel) rend l'estimateur s² sans biais en moyenne."
  - question: "Quelle est la différence entre la variance et l'écart type ?"
    answer: "La variance (σ² ou s²) mesure la moyenne des écarts au carré et s'exprime dans l'unité des données élevée au carré (par exemple en €² ou en cm²). L'écart type (σ ou s) est simplement la racine carrée positive de la variance : il ramène la mesure de dispersion dans la même unité que les valeurs d'origine, ce qui facilite son interprétation."
  - question: "À partir de quelle taille d'échantillon l'écart entre σ² et s² devient-il négligeable ?"
    answer: "Le rapport entre s² et σ² vaut n / (n − 1). Pour n = 5, l'écart atteint 25 % ; pour n = 20, il est de 5,3 % ; pour n = 100, il tombe à environ 1 %. Même sur de grands échantillons, la convention statistique impose toutefois de conserver n − 1 dès que les données représentent un sous-ensemble d'une population plus large."
  - question: "La variance peut-elle être négative ou nulle ?"
    answer: "Non, une variance ne peut jamais être négative car elle résulte d'une somme de carrés divisée par un effectif positif. Elle est strictement égale à zéro uniquement lorsque toutes les observations du jeu de données sont rigoureusement identiques (dispersion nulle)."
  - question: "Comment le décalage ou la multiplication des données modifie-t-elle la variance ?"
    answer: "Ajouter ou retrancher une constante c à chaque valeur ne change absolument pas la variance : Var(X + c) = Var(X), car la moyenne se décale autant que les points. En revanche, multiplier chaque valeur par un facteur a multiplie la variance par le carré de ce facteur : Var(a × X) = a² × Var(X)."
---

En statistique, la **variance** quantifie la dispersion des observations d'une série autour de leur moyenne arithmétique. En élevant chaque écart à la moyenne au carré, elle empêche les valeurs positives et négatives de se compenser mutuellement tout en pénalisant davantage les points très éloignés du centre.

Une distinction essentielle oppose la **variance de population (`σ²`)**, employée lorsque l'ensemble complet des individus est connu, à la **variance d'échantillon (`s²`)**, qui applique la correction de Bessel (`n − 1`) pour corriger le biais d'estimation sur un sous-ensemble. Notre [Calculatrice de Variance](/fr/calculatrices/calculatrice-variance) fournit simultanément la somme des carrés, les deux variances, les écarts types et le détail des calculs.

## Formules de la variance : population vs correction de Bessel

La formule retenue dépend du statut de votre jeu de données vis-à-vis de la population cible :

```text
Variance de population (σ²) : σ² = [ Σ (xᵢ − μ)² ] / N
Variance d'échantillon (s²) : s² = [ Σ (xᵢ − x̄)² ] / (n − 1)
Formule de König-Huygens    : σ² = (Σ xᵢ² / N) − μ²
Écart type associé          : σ = √(σ²)   |   s = √(s²)
Coefficient de variation    : CV = (s / x̄) × 100 %
```

Chaque notation correspond à un élément précis :

- **`xᵢ`** : chaque observation individuelle de la série (`i` de `1` à `N` ou `n`).
- **`μ` (population) et `x̄` (échantillon)** : moyenne arithmétique des données.
- **`Σ (xᵢ − x̄)²`** : somme des carrés des écarts (`SCE`), identique dans les deux variantes.
- **`N` contre `n − 1`** : dénominateur séparant le recensement exhaustif (`N`) de l'estimation sur échantillon (`n − 1`).

Pourquoi diviser par `n − 1` ? Parce que la moyenne `x̄` est extraite de l'échantillon lui-même et reste donc plus proche des `n` valeurs mesurées que la vraie moyenne `μ`. Comme la somme des écarts centrés est nulle (`Σ (xᵢ − x̄) = 0`), la dernière observation est entièrement contrainte par les `n − 1` précédentes. La division par `n − 1` rend `s²` sans biais en espérance (`E[s²] = σ²`), bien que sa racine carrée `s` conserve un léger biais négatif sur les tout petits effectifs.

## Exemple chiffré étape par étape : du jeu brut à l'écart type

Soit `5` mesures de masse (en `kg`) relevées sur des colis expédiés : **`[10 ; 14 ; 16 ; 20 ; 20]`**.

**Étape 1 : calculer la moyenne arithmétique**
```text
x̄ = (10 + 14 + 16 + 20 + 20) / 5 = 80 / 5 = 16,0 kg
```

**Étape 2 : calculer les écarts à la moyenne et leurs carrés**
```text
x₁=10 : 10−16 = −6 → (−6)² = 36
x₂=14 : 14−16 = −2 → (−2)² = 4
x₃=16 : 16−16 = 0 → (0)² = 0
x₄=20 : 20−16 = +4 → (+4)² = 16
x₅=20 : 20−16 = +4 → (+4)² = 16
```
Vérification : somme des écarts simples nulle (`−6−2+0+4+4=0`). Somme des carrés des écarts : **`SCE = 36 + 4 + 0 + 16 + 16 = 72 kg²`**.

**Étape 3 : diviser selon la nature des données**
- **Population complète (`N = 5`)** : `σ² = 72 / 5 = 14,4 kg²` → écart type `σ = √14,4 ≈ 3,7947 kg`.
- **Échantillon (`n = 5`, `n − 1 = 4`)** : `s² = 72 / 4 = 18,0 kg²` → écart type `s = √18,0 ≈ 4,2426 kg` (`CV = 26,52 %`).

Pour `n = 5`, la variance d'échantillon `s²` dépasse `σ²` de **`25 %`** (`5 / 4 = 1,25`), démontrant l'importance du dénominateur sur les petites séries.

## Tableau comparatif des indicateurs de dispersion

| Indicateur | Formule ou définition | Unité | Sensibilité aux valeurs extrêmes | Usage statistique recommandé |
| :--- | :--- | :--- | :--- | :--- |
| **Variance de population (`σ²`)** | `Σ (xᵢ − μ)² / N` | Unité² | Très élevée (carré des écarts) | Données exhaustives et lois théoriques |
| **Variance d'échantillon (`s²`)** | `Σ (xᵢ − x̄)² / (n − 1)` | Unité² | Très élevée (carré des écarts) | Inférence statistique, ANOVA, estimation de `σ²` |
| **Écart type (`σ` ou `s`)** | `√(Variance)` | Unité d'origine | Élevée | Interprétation directe, scores Z et intervalles |
| **Coefficient de variation (`CV`)** | `(s / x̄) × 100 %` | Sans unité (`%`) | Élevée | Comparaison de séries aux unités ou ordres distincts |
| **Écart interquartile (`IQR`)** | `Q₃ − Q₁` | Unité d'origine | Nulle (robuste à `50 %`) | Distributions asymétriques (revenus, durées) |
| **Écart absolu médian (`MAD`)** | `Médiane(\|xᵢ − Médiane\|)` | Unité d'origine | Très faible | Détection robuste d'anomalies sur données bruitées |

## Domaines d'application, erreurs de calcul et limites d'interprétation

La variance fonde de nombreuses méthodes quantitatives avancées :

- **Gestion de portefeuille (Markowitz)** : le risque global d'un portefeuille combinant deux actifs utilise l'additivité des variances et leur covariance : `σ_p² = w₁²σ₁² + w₂²σ₂² + 2 × w₁ × w₂ × Cov(R₁, R₂)`.
- **Analyse de la variance (ANOVA)** : la comparaison de trois moyennes ou plus repose sur le rapport entre variance intergroupes et variance intragroupes (statistique `F`).
- **Science des données** : le compromis biais-variance gouverne la généralisation des modèles prédictifs, et l'analyse en composantes principales classe les axes selon la part de variance expliquée.

Quatre pièges reviennent fréquemment :

1. **Confondre l'unité de la variance et celle des données** : une variance de `18,0 kg²` n'est pas comparable à des kilogrammes ; passez toujours à l'écart type (`4,24 kg`) pour communiquer un écart concret.
2. **Appliquer König-Huygens sur de très grands nombres** : calculer `(Σ xᵢ² / N) − μ²` en virgule flottante lorsque la moyenne dépasse largement l'écart type (`1 000 000 ± 0,01`) provoque une perte de précision numérique pouvant produire une variance négative ; privilégiez l'algorithme incrémental de Welford.
3. **Utiliser `VAR.P` au lieu de `VAR.S` dans un tableur** : sur un échantillon, `VAR.P` divise par `N` et sous-estime la dispersion réelle.
4. **Se limiter à la variance sur des données asymétriques** : en présence de valeurs aberrantes ou de queues lourdes, complétez toujours l'analyse par la médiane et l'écart interquartile (`IQR`).
