---
title: "La Physique de la Chute Libre : La Gravité dans le Vide"
description: "Comprenez la cinématique de la chute libre : équations d'accélération (g = 9,81 m/s²), vitesse limite avec traînée aérodynamique, exemple chiffré en tour d'impesanteur et calculatrice en ligne."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "free-fall-calculator"
relatedType: "calculator"
faqs:
  - question: "Pourquoi deux objets de masses différentes tombent-ils exactement à la même vitesse dans le vide ?"
    answer: "D'après le principe d'équivalence et la seconde loi de Newton, la force de gravité vaut P = m × g et l'accélération vaut a = P / m. La masse m apparaît donc au numérateur et au dénominateur et se simplifie : a = (m × g) / m = g. Dans le vide, une plume et une sphère de plomb subissent la même accélération constante de 9,81 m/s²."
  - question: "Quelle est la différence entre la chute libre idéale et la chute réelle dans l'atmosphère ?"
    answer: "En chute libre idéale, seule la gravité agit sur le mobile, dont la vitesse augmente indéfiniment de 9,81 m/s chaque seconde. Dans l'air, la force de traînée aérodynamique croît avec le carré de la vitesse jusqu'à équilibrer le poids : le corps cesse alors d'accélérer et atteint sa vitesse limite (environ 54 m/s pour un parachutiste à plat)."
  - question: "Comment intégrer une vitesse initiale non nulle (v₀ ≠ 0) dans les équations de chute libre ?"
    answer: "Si l'objet est lancé verticalement vers le bas avec une vitesse initiale v₀, l'axe vertical étant orienté vers le bas, les équations deviennent v(t) = v₀ + g × t et d(t) = v₀ × t + ½ × g × t². S'il est lancé vers le haut, v₀ est négative et l'objet décélère jusqu'à s'immobiliser brièvement au sommet avant de redescendre."
  - question: "L'accélération gravitationnelle g est-elle strictement identique partout sur Terre ?"
    answer: "Non. Bien que l'on utilise g = 9,81 m/s² en calcul courant (et 9,80665 m/s² comme valeur normale de référence), l'intensité de la pesanteur varie d'environ 0,5 % entre l'équateur (9,780 m/s²) et les pôles (9,832 m/s²) sous l'effet de l'aplatissement terrestre et de la force centrifuge liée à la rotation de la planète."
  - question: "À partir de quelle hauteur la résistance de l'air rend-elle la formule du vide imprécise ?"
    answer: "Cela dépend de la densité et de la surface frontale de l'objet. Pour une bille d'acier dense et compacte, l'erreur reste inférieure à 2 % sur les 20 à 30 premiers mètres. En revanche, pour une feuille de papier, une plume ou une goutte de pluie, la traînée devient prédominante dès les premiers dixièmes de seconde de chute."
---

En mécanique classique, un corps est en **chute libre** lorsqu'il n'est soumis qu'à son propre poids, sans résistance de l'air ni poussée d'Archimède. Dans le vide au voisinage de la Terre, son accélération reste constante (`g ≈ 9,81 m/s²`), indépendamment de sa masse ou de sa forme.

Notre [Calculatrice de Chute Libre](/fr/calculatrices/calculateur-de-chute-libre) résout instantanément ce mouvement rectiligne uniformément accéléré. Saisissez la distance (`d`), la durée (`t`) ou la vitesse initiale (`v₀`) pour obtenir la vitesse d'impact et les grandeurs manquantes.

## Cinématique de la chute libre et équations fondamentales

Lorsqu'un mobile est lâché sans vitesse initiale (`v₀ = 0`) dans un champ uniforme `g`, sa vitesse croît linéairement de `9,81 m/s` (`35,3 km/h`) par seconde, tandis que la distance parcourue évolue selon le **carré du temps** :

```text
Vitesse instantanée       : v(t) = g × t
Distance parcourue        : d(t) = ½ × g × t²
Durée depuis le repos     : t    = √(2 × d / g)
Vitesse selon la hauteur  : v    = √(2 × g × d)
```

- **`v` (`m/s`) :** vitesse à l'instant `t` (multipliez par `3,6` pour obtenir des `km/h`).
- **`d` (`m`) :** hauteur verticale parcourue depuis le lâcher.
- **`t` (`s`) :** durée écoulée depuis le début de la chute.
- **`g` (`m/s²`) :** accélération de pesanteur (`9,81 m/s²` par convention ; `9,80665 m/s²` en valeur normalisée).

### Vitesse initiale non nulle (`v₀ ≠ 0`) et vitesse limite dans l'air

Si l'objet est propulsé vers le bas avec une vitesse initiale `v₀`, les équations deviennent :

```text
Vitesse : v(t) = v₀ + g × t
Distance: d(t) = v₀ × t + ½ × g × t²
Invariance temporelle : v² = v₀² + 2 × g × d
```

Dans l'atmosphère, la traînée finit par équilibrer le poids, plafonnant la vitesse à la **vitesse limite** `v_lim = √[(2 × m × g) / (ρ_air × S × C_x)]`, où `ρ_air ≈ 1,225 kg/m³` désigne la masse volumique de l'air au niveau de la mer, `S` la surface frontale exposée au flux et `C_x` le coefficient de traînée aérodynamique propre à la géométrie du corps.

Ainsi, une sphère lisse et dense conserve une trajectoire proche du modèle idéal sur plusieurs dizaines de mètres, tandis qu'une feuille plane ou une goutte de pluie s'écarte presque immédiatement de la courbe théorique en raison de sa faible masse rapportée à sa surface.

## Exemple numérique : largage en tour d'impesanteur

Les tours de chute libre, telle la tour ZARM de Brême, créent un vide poussé pour obtenir quelques secondes de microgravité. Considérons une capsule lâchée depuis le repos (`v₀ = 0`) sur une hauteur utile `d = 110 m`, avec `g = 9,81 m/s²`.

### Étape 1 : Calculer la durée de chute

D'après `t = √(2 × d / g)` :

`t = √(2 × 110 / 9,81) = √(22,4261) ≈ 4,74 s`.

Vérification inverse : `½ × 9,81 × (4,7356)² ≈ 110,0 m`. L'expérience bénéficie donc de `4,74 s` d'impesanteur avant décélération.

### Étape 2 : Déterminer la vitesse maximale atteinte

Avec `v = g × t` : `v = 9,81 × 4,7356 ≈ 46,46 m/s`, soit `46,456 × 3,6 ≈ 167,24 km/h`. La formule sans temps confirme ce résultat : `v = √(2 × 9,81 × 110) = √(2 158,2) ≈ 46,46 m/s`.

À `t = 2,00 s`, la capsule n'a parcouru que `d(2) = ½ × 9,81 × 4 = 19,62 m` (`17,8 %` du trajet), alors que sa vitesse vaut déjà `19,62 m/s` (`70,63 km/h`).

## Tableau des paramètres de chute dans le vide (`v₀ = 0`, `g = 9,81 m/s²`)

Ce tableau met en évidence la croissance quadratique de la distance face à la croissance linéaire de la vitesse :

| Durée (`t`) | Vitesse (`m/s`) | Vitesse (`km/h`) | Distance (`d`) | Énergie cinétique spécifique (`v² / 2`) |
| :--- | :--- | :--- | :--- | :--- |
| 0,5 s | 4,91 m/s | 17,7 km/h | 1,23 m | 12,0 J/kg |
| 1,0 s | 9,81 m/s | 35,3 km/h | 4,91 m | 48,1 J/kg |
| 2,0 s | 19,62 m/s | 70,6 km/h | 19,62 m | 192,5 J/kg |
| 3,0 s | 29,43 m/s | 105,9 km/h | 44,15 m | 433,1 J/kg |
| 5,0 s | 49,05 m/s | 176,6 km/h | 122,63 m | 1 203,0 J/kg |
| 10,0 s | 98,10 m/s | 353,2 km/h | 490,50 m | 4 811,8 J/kg |

## Applications pratiques, traînée et pièges courants

Ce modèle fonde le calcul du **tirant d'air des harnais antichute** sur chantier afin de garantir qu'un opérateur s'immobilise avant de heurter le niveau inférieur, l'estimation acoustique de la profondeur d'un puits (`d = ½ × g × t²`, en soustrayant le temps de retour du son à `340 m/s` dès que la profondeur dépasse cinquante mètres) et la **gravimétrie absolue** par interférométrie laser sous vide.

Dans l'industrie aérospatiale et la balistique, l'équation de chute libre sert aussi de référence de base pour valider les capteurs inertiels (accéléromètres), étalonner les essais de choc mécanique en laboratoire et vérifier le comportement des dispositifs de largage d'urgence avant l'intégration des modèles aérodynamiques complets.

Évitez quatre erreurs fréquentes :

1. **Ignorer la traînée sur de grandes hauteurs :** dans l'air, un parachutiste à plat plafonne vers `54 m/s` (`195 km/h`) et n'atteint pas les `353 km/h` théoriques après `10 s`.
2. **Supposer une proportionnalité directe entre distance et temps :** doubler la durée quadruple (`× 4`) la hauteur parcourue en raison du terme `t²`.
3. **Attribuer un écart de chute dans l'air à la gravité :** une boule de pétanque touche le sol avant une balle de tennis parce que son poids domine davantage la traînée, non parce que `g` est plus fort.
4. **Négliger `v₀` :** un objet lancé vers le bas depuis un véhicule ou une plateforme démarre avec `v₀ ≠ 0`.
