---
title: "Calculatrice de la Loi de Charles : Volume vs Température"
description: "Découvrez comment chauffer un gaz le fait s'étendre, la relation directe de la Loi de Charles, et utilisez notre calculatrice."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "charles-law-calculator"
relatedType: "calculator"
faqs:
  - question: "Pourquoi faut-il obligatoirement convertir les températures en kelvins (K) dans la loi de Charles ?"
    answer: "L'échelle Celsius est une échelle relative dont le zéro (0 °C) correspond à la fusion de la glace et non à l'arrêt de l'agitation thermique. Si vous utilisiez des degrés Celsius dans V₁ / T₁ = V₂ / T₂, une température de 0 °C provoquerait une division par zéro et une température négative produirait un volume physiquement impossible. L'échelle absolue en kelvins (T(K) = T(°C) + 273,15) garantit une proportionnalité rigoureuse."
  - question: "Que se passe-t-il théoriquement au zéro absolu (0 K ou −273,15 °C) selon la loi de Charles ?"
    answer: "En extrapolant la droite V(T) d'un gaz parfait jusqu'à 0 K (−273,15 °C), le volume théorique tend vers zéro. Dans la réalité physique, tous les gaz réels subissent une liquéfaction puis une solidification bien avant d'atteindre le zéro absolu, et le volume propre des molécules empêche toute disparition de la matière."
  - question: "À quelles conditions un gaz réel s'écarte-t-il de la loi de Charles ?"
    answer: "La loi de Charles suppose un gaz parfait composé de molécules ponctuelles sans interactions attractives. À haute pression (au-delà de quelques dizaines de bars) ou à basse température proche du point de liquéfaction, le covolume moléculaire et les forces de Van der Waals deviennent significatifs, imposant l'usage du facteur de compressibilité Z ou d'équations d'état réelles."
  - question: "Comment la loi de Charles s'intègre-t-elle dans l'équation des gaz parfaits (PV = nRT) ?"
    answer: "En isolant le rapport V / T dans la loi des gaz parfaits, on obtient V / T = (n × R) / P. Lorsque la quantité de matière n (en moles) et la pression P restent constantes au cours de la transformation, le terme (n × R) / P forme une constante k, ce qui restitue exactement la loi de Charles : V₁ / T₁ = V₂ / T₂."
  - question: "Quelles unités de volume peut-on saisir dans la calculatrice de la loi de Charles ?"
    answer: "Vous pouvez employer n'importe quelle unité de volume (litres L, millilitres mL, mètres cubes m³ ou centimètres cubes cm³), à condition stricte d'utiliser la même unité pour V₁ et V₂. Comme la formule repose sur un rapport sans dimension entre deux états, les facteurs de conversion volumique s'annulent mutuellement."
---

La **loi de Charles** établit que, pour une quantité fixe de gaz maintenue à pression constante, le volume occupé par ce gaz est directement proportionnel à sa température absolue en kelvins. Formulée à partir des travaux de Jacques Charles puis publiée par Joseph Louis Gay-Lussac en 1802, cette relation isobare constitue un fondement de la thermodynamique classique.

Pour résoudre un changement d'état isobare, saisissez trois des quatre grandeurs (`V₁`, `T₁`, `V₂`, `T₂`) dans notre [Calculatrice de la Loi de Charles](/fr/calculatrices/calculateur-de-loi-de-charles). L'outil convertit les températures en kelvins, vérifie leur cohérence physique et calcule le volume final, la température requise ainsi que le taux d'expansion relative.

## Principes thermodynamiques et formulation mathématique

À l'échelle microscopique, la température absolue reflète l'énergie cinétique moyenne des molécules gazeuses. En chauffant un gaz dans une enceinte à paroi mobile (piston ou enveloppe souple), les molécules accélèrent et frappent les parois plus violemment. Pour conserver une pression interne égale à la pression extérieure constante, l'enceinte se dilate jusqu'à rétablir l'équilibre mécanique.

Cette proportionnalité directe entre le volume `V` et la température absolue `T` s'écrit :

```text
Loi isobare générale   : V / T = k  (à P et n constants)
Comparaison de 2 états : V₁ / T₁ = V₂ / T₂
Conversion en kelvins  : T(K) = T(°C) + 273,15
```

`V₁` et `V₂` partagent la même unité de volume (`L`, `mL` ou `m³`), tandis que `T₁` et `T₂` s'expriment impérativement en **kelvins (`K`)**. Le coefficient de dilatation thermique isobare d'un gaz parfait vaut `β = 1 / T`, soit `1 / 273,15 ≈ 3,661 × 10⁻³ K⁻¹` à `0 °C` : chaque degré Celsius supplémentaire accroît le volume de `1 / 273,15` par rapport à son volume à `0 °C`.

### Formules isolées selon la variable recherchée

Par produit en croix, vous obtenez quatre relations directes :

- **Volume final (`V₂`) :** `V₂ = V₁ × (T₂ / T₁)`
- **Température finale (`T₂`) :** `T₂ = T₁ × (V₂ / V₁)`
- **Volume initial (`V₁`) :** `V₁ = V₂ × (T₁ / T₂)`
- **Température initiale (`T₁`) :** `T₁ = T₂ × (V₁ / V₂)`

Si vos mesures sont en degrés Celsius (`°C`), ajoutez `273,15` avant le calcul, puis retranchez `273,15` si vous devez exprimer la température résultat en `°C`.

## Exemple numérique détaillé : dilatation d'un volume d'air

Considérons un ballon souple contenant un volume d'air sec `V₁ = 4,50 L` à `T₁ = 20,0 °C`, sous pression atmosphérique constante `P = 101,325 kPa`. Calculons son volume après chauffage à `85,0 °C`, puis après refroidissement à `−15,0 °C`.

### Étape 1 : Conversion des températures en kelvins

```text
T₁ = 20,0 + 273,15  = 293,15 K
T₂ = 85,0 + 273,15  = 358,15 K
T₃ = −15,0 + 273,15 = 258,15 K
```

### Étape 2 : Volume après chauffage (`85,0 °C`)

```text
V₂ = 4,50 × (358,15 / 293,15) = 4,50 × 1,22173 = 5,498 L ≈ 5,50 L
```

Le volume augmente de `0,998 L`, soit une expansion de **`+22,17 %`**. Un calcul erroné en degrés Celsius (`4,50 × 85 / 20`) aurait donné `19,125 L`, soit une erreur de plus de `248 %`.

### Étape 3 : Volume après refroidissement (`−15,0 °C`)

```text
V₃ = 4,50 × (258,15 / 293,15) = 4,50 × 0,88061 = 3,963 L ≈ 3,96 L
```

Le gaz se contracte de `0,537 L`, soit une réduction de **`−11,94 %`** par rapport à `20,0 °C`.

## Tableau comparatif des variations volume-température à pression constante

Ce tableau présente le volume exact d'un gaz parfait dont le volume de référence à `0,0 °C` (`273,15 K`) vaut `1,000 L` sous `101,325 kPa`.

| Température (`°C`) | Température absolue (`K`) | Rapport `T / T₀` | Volume (`L`) | Variation vs `0 °C` | Contexte physique typique |
|---|---|---|---|---|---|
| `−50,0 °C` | `223,15 K` | `0,81695` | `0,817 L` | `−18,3 %` | Haute troposphère / air polaire |
| `0,0 °C` | `273,15 K` | `1,00000` | `1,000 L` | `0,0 %` | Conditions normales (CNTP) |
| `20,0 °C` | `293,15 K` | `1,07322` | `1,073 L` | `+7,3 %` | Température de laboratoire |
| `50,0 °C` | `323,15 K` | `1,18305` | `1,183 L` | `+18,3 %` | Sortie d'échangeur thermique |
| `100,0 °C` | `373,15 K` | `1,36610` | `1,366 L` | `+36,6 %` | Ébullition de l'eau à 1 atm |
| `150,0 °C` | `423,15 K` | `1,54915` | `1,549 L` | `+54,9 %` | Enveloppe de montgolfière |

## Applications industrielles, erreurs fréquentes et limites physiques

### Aéronautique, métrologie et génie des procédés

La loi de Charles explique l'ascension des **montgolfières** : en chauffant l'air d'une enveloppe ouverte à sa base, la pression demeure égale à la pression atmosphérique tandis que l'air dilaté s'échappe partiellement, réduisant sa masse volumique (`ρ = P × M / (R × T)`) et créant la poussée d'Archimède. En métrologie des gaz et génie climatique, cette loi convertit aussi les débits mesurés à chaud (`m³/h`) en normo-mètres cubes (`Nm³/h`, référencés à `0 °C` et `101,325 kPa`).

### Précautions méthodologiques et limites d'application

1. **Pression réellement constante :** dans une bouteille rigide ou un pneumatique peu extensible (`V` quasi fixe), le chauffage accroît surtout la pression selon la loi de Gay-Lussac (`P₁ / T₁ = P₂ / T₂`).
2. **Usage impératif du kelvin :** utiliser les degrés Celsius ou Fahrenheit invalide tout rapport thermique.
3. **Condensation de vapeurs :** en présence de vapeur d'eau ou de solvants, le refroidissement peut condenser une fraction du gaz et diminuer le nombre de moles `n`.
4. **Gaz réels à haute pression :** au-delà de `20 bar` ou près du point critique (ex. `CO₂` comprimé), les forces intermoléculaires imposent d'introduire le facteur de compressibilité `Z(P, T)`.
