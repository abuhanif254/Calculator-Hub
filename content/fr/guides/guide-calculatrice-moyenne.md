---
title: "Comment Trouver la Moyenne : Arithmétique, Géométrique et Harmonique"
description: "Maîtrisez le calcul des moyennes arithmétique, géométrique et harmonique : formules exactes, inégalité des moyennes, exemples chiffrés en finance et physique, et pièges à éviter."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "mean-calculator"
relatedType: "calculator"
faqs:
  - question: "Quelle différence fondamentale sépare les moyennes arithmétique, géométrique et harmonique ?"
    answer: "La moyenne arithmétique additionne les valeurs et convient aux grandeurs additives (notes, masses, températures). La moyenne géométrique multiplie les facteurs et mesure un taux de croissance composé ou un ratio d'échelle. La moyenne harmonique inverse les valeurs et s'impose pour agréger des taux ou vitesses rapportés à un numérateur constant (km/h sur une même distance)."
  - question: "Pourquoi la moyenne géométrique est-elle toujours inférieure ou égale à la moyenne arithmétique ?"
    answer: "Pour tout ensemble de nombres strictement positifs, l'inégalité classique des moyennes garantit que H ≤ G ≤ x̄. L'écart entre la moyenne arithmétique et la moyenne géométrique augmente avec la dispersion (variance) des données : en finance, cette différence correspond au coût de la volatilité qui réduit le rendement composé réel par rapport au rendement annuel moyen."
  - question: "Peut-on calculer une moyenne géométrique ou harmonique avec des zéros ou des nombres négatifs ?"
    answer: "La moyenne harmonique n'est pas définie dès qu'une valeur vaut zéro, car la division par zéro est impossible. La moyenne géométrique s'annule si un terme vaut zéro et produit des nombres complexes si un nombre pair de facteurs est négatif ; en pratique, on l'applique à des grandeurs positives ou à des facteurs multiplicatifs (1 + taux), comme 0,90 pour une baisse de 10 %."
  - question: "Quand faut-il utiliser une moyenne pondérée plutôt qu'une moyenne arithmétique simple ?"
    answer: "Utilisez la moyenne pondérée dès que chaque observation n'a pas la même importance ou représentativité : notes d'examen affectées de coefficients, portefeuille boursier où chaque actif pèse selon sa valeur en euros, ou prix unitaire moyen d'achats effectués en quantités différentes."
  - question: "Comment éviter l'erreur de la moyenne des moyennes ?"
    answer: "On ne peut jamais calculer la moyenne arithmétique simple de deux moyennes issues de groupes de tailles différentes. Il faut impérativement pondérer chaque moyenne de groupe par son effectif (ou sa base de calcul) : moyenne globale = (n₁ × x̄₁ + n₂ × x̄₂) / (n₁ + n₂)."
---

En statistique descriptive, le terme « moyenne » désigne par défaut la **moyenne arithmétique**, obtenue en divisant la somme des observations par leur effectif. Toutefois, ce choix devient mathématiquement faux dès que vos données représentent des taux de variation successifs, des rapports ou des vitesses : dans ces cas, seules la **moyenne géométrique** et la **moyenne harmonique** fournissent un résultat exact.

Notre [Calculatrice de Moyenne](/fr/calculatrices/calculatrice-de-moyenne) calcule simultanément ces trois indicateurs à partir d'une même série numérique. Ce guide présente leurs formules, l'inégalité fondamentale qui les relie, deux démonstrations chiffrées complètes et les critères pour choisir l'estimateur adapté.

## Formules des moyennes pythagoriciennes

Pour une série de `n` observations `x₁, x₂, ..., xₙ`, les moyennes pythagoriciennes traduisent trois modes de composition (additif, multiplicatif et inverse) :

```text
Arithmétique simple   : x̄   = (x₁ + x₂ + ... + xₙ) / n
Arithmétique pondérée : x̄_w = (w₁×x₁ + w₂×x₂ + ... + wₙ×xₙ) / (w₁ + w₂ + ... + wₙ)
Géométrique (xᵢ > 0)  : G   = (x₁ × x₂ × ... × xₙ)^(1/n) = exp[(1/n) × Σ ln(xᵢ)]
Harmonique (xᵢ > 0)   : H   = n / (1/x₁ + 1/x₂ + ... + 1/xₙ)
```

Pour tout jeu de valeurs strictement positives, l'inégalité suivante est toujours vérifiée :

`H ≤ G ≤ x̄`

L'égalité (`H = G = x̄`) n'apparaît que si toutes les observations sont identiques. La moyenne harmonique accorde un poids maximal aux petites valeurs, tandis que la moyenne arithmétique est tirée vers le haut par les grandes valeurs.

Pour analyser des pourcentages d'évolution `rᵢ` (`+15 %`, `-8 %`), convertissez d'abord chaque taux en facteur multiplicatif `fᵢ = 1 + rᵢ` (`1,15` et `0,92`), calculez la moyenne géométrique `G` des facteurs, puis retranchez `1` pour obtenir le **taux de croissance annuel composé (TCAC)** : `TCAC = G − 1`.

## Exemples chiffrés étape par étape

### Exemple 1 : rendement composé d'un portefeuille (moyenne géométrique)

Un capital initial de `10 000 €` est investi `3` ans avec des rendements annuels de `+20 %`, `-10 %` et `+25 %`.

1. **Moyenne arithmétique (trompeuse) :** `(20 − 10 + 25) / 3 = +11,67 %` par an, ce qui laisserait croire à un capital final de `10 000 × 1,1167³ ≈ 13 926 €`.
2. **Facteurs multiplicatifs :** `f₁ = 1,20`, `f₂ = 0,90` et `f₃ = 1,25`.
3. **Capital réel après 3 ans :** `10 000 × 1,20 × 0,90 × 1,25 = 10 000 × 1,35 = 13 500 €` (`+35 %` cumulés).
4. **Moyenne géométrique :** `G = 1,35^(1/3) ≈ 1,105209`, soit un taux annuel composé réel de **`+10,52 %`**. Vérification : `10 000 × 1,105209³ = 13 500,00 €`.

### Exemple 2 : vitesse moyenne sur trajet égal (moyenne harmonique)

Un véhicule parcourt `120 km` à `60 km/h` à l'aller, puis `120 km` à `120 km/h` au retour (`240 km` au total).

1. **Moyenne arithmétique (erronée) :** `(60 + 120) / 2 = 90 km/h`.
2. **Vérification physique :** l'aller dure `120 / 60 = 2 h` et le retour `120 / 120 = 1 h`, soit `3 h` au total. La vitesse réelle vaut `240 / 3 = 80 km/h`.
3. **Moyenne harmonique :** `H = 2 / (1/60 + 1/120) = 2 / (3/120) = 240 / 3 = 80 km/h`.

Pour `{60 ; 120}`, on vérifie `H (80) ≤ G (√7 200 ≈ 84,85) ≤ x̄ (90)`. En revanche, si les deux trajets avaient duré `1 heure` chacun (durées égales), la moyenne arithmétique `90 km/h` serait correcte.

## Tableau comparatif des types de moyennes

| Type de moyenne | Formule | Condition | Sensibilité extrêmes | Usage principal | Piège courant |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Arithmétique** | `Σxᵢ / n` | Tous réels | Élevée | Notes, masses, températures | Appliquée aux taux/vitesses |
| **Pondérée** | `Σ(wᵢ×xᵢ) / Σwᵢ` | `wᵢ ≥ 0`, `Σwᵢ > 0` | Élevée | Coefficients, portefeuilles | Oublier de diviser par `Σwᵢ` |
| **Géométrique** | `(Πxᵢ)^(1/n)` | `xᵢ > 0` | Modérée | Rendements composés, indices | Saisir des `%` négatifs |
| **Harmonique** | `n / Σ(1/xᵢ)` | `xᵢ > 0` | Forte aux petits `xᵢ` | Vitesses, débits, PER | Appliquée sur durées égales |
| **Quadratique (RMS)** | `√(Σxᵢ² / n)` | Tous réels | Très élevée | Courant AC, erreur RMSE | Confondue avec l'arithmétique |
| **Tronquée (10 %)** | Moyenne hors queues | Tous réels | Faible (robuste) | Jurys, capteurs bruités | Masquer un signal extrême |

## Applications concrètes et précision numérique

En **finance**, la moyenne géométrique mesure la performance composée d'un placement, tandis que la moyenne harmonique agrège les multiples de valorisation comme le ratio cours/bénéfice (PER) d'un portefeuille équipondéré en euros. En **physique**, la valeur efficace d'un signal sinusoïdal repose sur la moyenne quadratique (`RMS`), car sa moyenne arithmétique est nulle.

Sur le plan informatique, multiplier directement des centaines de termes `x₁ × x₂ × ... × xₙ` provoque un dépassement flottant (`overflow` ou `underflow`). Les calculatrices scientifiques utilisent donc l'identité logarithmique `G = exp[(1/n) × Σ ln(xᵢ)]`, numériquement stable. Enfin, face à une distribution fortement asymétrique (salaires, immobilier), complétez toujours la moyenne arithmétique par la médiane afin d'éviter qu'une poignée de valeurs extrêmes ne déforme la tendance centrale.

Évitez également l'erreur classique de la « moyenne des moyennes » : si un premier échantillon de `20` mesures affiche une moyenne de `12,0` et un second de `80` mesures affiche `18,0`, la moyenne globale ne vaut pas `(12 + 18) / 2 = 15,0`, mais bien la moyenne pondérée par les effectifs, soit `(20 × 12 + 80 × 18) / 100 = 16,8`.
