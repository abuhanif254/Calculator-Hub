---
title: "Mouvement de Projectile : La Physique des Trajectoires"
description: "Maîtrisez les équations du mouvement balistique, l'indépendance des axes, l'angle de portée maximale et l'utilisation de notre calculatrice de trajectoire."
category: "Math & Science"
relatedCalculator: "projectile-motion-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Pourquoi deux projectiles lancés à la même hauteur avec ou sans vitesse horizontale touchent-ils le sol ensemble ?"
    answer: "En l'absence de résistance de l'air, la composante horizontale et la composante verticale du mouvement sont totalement indépendantes. La gravité agit uniquement selon l'axe vertical à 9,81 m/s² ; la vitesse verticale initiale étant nulle dans les deux cas, les durées de chute sont rigoureusement identiques."
  - question: "L'angle de 45° garantit-il toujours la portée horizontale maximale ?"
    answer: "Uniquement lorsque le point de lancement et le point d'impact se trouvent à la même altitude (h₀ = 0 m) et que la traînée aérodynamique est négligeable. Si le projectile est tiré depuis une hauteur surélevée (h₀ > 0), l'angle optimal devient inférieur à 45° ; avec la résistance de l'air, il descend souvent entre 30° et 42°."
  - question: "Que vaut la vitesse du projectile au sommet exact de sa trajectoire ?"
    answer: "Au point culminant (apogée), la composante verticale de la vitesse s'annule temporairement (vy = 0 m/s), mais la vitesse totale n'est pas nulle sauf pour un tir strictement vertical à 90°. Le mobile conserve intégralement sa composante horizontale vx = v₀ × cos(θ)."
  - question: "Comment la hauteur initiale h₀ modifie-t-elle le temps de vol ?"
    answer: "Une hauteur initiale positive allonge la phase de descente au-delà du niveau de départ. Le temps de vol ne vaut plus simplement (2 × v₀ × sin(θ)) / g, mais nécessite la résolution de l'équation quadratique verticale, donnant t_vol = [v₀ × sin(θ) + √((v₀ × sin(θ))² + 2 × g × h₀)] / g."
  - question: "Pourquoi les logiciels de calcul donnent-ils parfois une portée erronée avec sin(θ) ?"
    answer: "L'erreur la plus fréquente provient des unités d'angle : la majorité des calculatrices scientifiques et des langages de programmation attendent des radians plutôt que des degrés. Il convient de vérifier le réglage en degrés ou de multiplier l'angle par π / 180 avant d'évaluer sin(θ) et cos(θ)."
---

Le mouvement de projectile décrit la trajectoire suivie par un corps lancé avec une vitesse initiale `v₀` et soumis uniquement à l'accélération uniforme de la pesanteur (`g = 9,81 m/s²`). Sans frottement de l'air, le mobile suit une parabole résultant de l'indépendance complète entre le mouvement horizontal et le mouvement vertical.

Sur l'axe horizontal, aucune force n'agit et la vitesse reste constante ; sur l'axe vertical, la gravité impose une accélération uniforme vers le bas. Pour obtenir instantanément la portée, la hauteur maximale et le temps de vol à partir de vos propres données, utilisez notre [Calculatrice de Mouvement de Projectile](/fr/calculatrices/calculateur-de-mouvement-de-projectile).

## Équations horaires et décomposition vectorielle

Soit un projectile lancé depuis une altitude `h₀` (en `m`) avec une vitesse initiale `v₀` (en `m/s`) et un angle d'élévation `θ` (en degrés). La projection du vecteur vitesse sépare le système en deux composantes initiales :

```text
v₀x = v₀ × cos(θ)
v₀y = v₀ × sin(θ)
```

À tout instant `t` (en secondes), les coordonnées `(x, y)` obéissent aux équations cinématiques suivantes :

```text
x(t) = v₀ × cos(θ) × t
y(t) = h₀ + v₀ × sin(θ) × t − ½ × g × t²
```

On en déduit directement les quatre grandeurs clés du vol :

- **Temps d'atteinte du sommet (`t_sommet`)** : instant où `vy(t) = 0`, soit `t_sommet = (v₀ × sin(θ)) / g`.
- **Hauteur maximale (`H_max`)** : altitude au sommet, `H_max = h₀ + (v₀ × sin(θ))² / (2 × g)`.
- **Temps de vol total (`t_vol`)** : racine positive de `y(t) = 0`, soit `t_vol = [v₀ × sin(θ) + √((v₀ × sin(θ))² + 2 × g × h₀)] / g` (se réduisant à `(2 × v₀ × sin(θ)) / g` si `h₀ = 0`).
- **Portée horizontale (`R`)** : distance parcourue à l'impact, `R = v₀ × cos(θ) × t_vol` (soit `R = (v₀² × sin(2θ)) / g` pour un tir à niveau `h₀ = 0`).

En éliminant le temps `t`, la trajectoire cartésienne s'écrit `y(x) = h₀ + x × tan(θ) − [g × x²] / [2 × v₀² × cos²(θ)]`.

## Exemple numérique détaillé : tir depuis une plateforme surélevée

Un projectile est lancé depuis une hauteur `h₀ = 12,0 m` avec `v₀ = 30,0 m/s` et un angle `θ = 35°` (`g = 9,81 m/s²`). Déterminons sa trajectoire étape par étape :

1. **Composantes initiales** : avec `cos(35°) = 0,81915` et `sin(35°) = 0,57358`, on obtient `v₀x = 24,57 m/s` et `v₀y = 17,21 m/s`.
2. **Sommet de la trajectoire** : `t_sommet = 17,207 / 9,81 = 1,75 s`. L'altitude maximale vaut `H_max = 12,0 + (17,207)² / 19,62 = 12,0 + 15,09 = 27,09 m`.
3. **Temps de vol total** : `(17,207)² + 2 × 9,81 × 12,0 = 531,52`, d'où `t_vol = (17,207 + √531,52) / 9,81 = (17,207 + 23,055) / 9,81 = 4,10 s`.
4. **Portée et vitesse d'impact** : `R = 24,575 × 4,104 = 100,86 m`. À l'impact, `vy_impact = 17,207 − 9,81 × 4,104 = −23,05 m/s`, donnant une vitesse totale `v_impact = √(24,575² + 23,053²) = 33,70 m/s`, conforme à la conservation de l'énergie (`√(v₀² + 2 × g × h₀)`).

## Influence de l'angle de lancement (`v₀ = 40 m/s`, `h₀ = 0 m`)

Le tableau ci-dessous illustre la symétrie des portées pour des angles complémentaires lorsque le tir s'effectue sur terrain plat (`h₀ = 0 m`, `g = 9,81 m/s²`).

| Angle (`θ`) | Vitesse horizontale (`v₀x`) | Temps de vol (`t_vol`) | Hauteur maximale (`H_max`) | Portée horizontale (`R`) | Régime de tir |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `15°` | `38,64 m/s` | `2,11 s` | `5,46 m` | `81,55 m` | Tir tendu, vol bref |
| `30°` | `34,64 m/s` | `4,08 s` | `20,39 m` | `141,25 m` | Complémentaire de `60°` |
| `45°` | `28,28 m/s` | `5,77 s` | `40,77 m` | `163,10 m` | Portée maximale dans le vide |
| `60°` | `20,00 m/s` | `7,06 s` | `61,16 m` | `141,25 m` | Même portée que `30°` |
| `75°` | `10,35 m/s` | `7,88 s` | `76,09 m` | `81,55 m` | Tir plongeant, même portée que `15°` |
| `90°` | `0,00 m/s` | `8,15 s` | `81,55 m` | `0,00 m` | Tir vertical pur |

## Applications réelles, erreurs courantes et limites aérodynamiques

Ces équations s'appliquent en biomécanique sportive (lancer du poids, du javelot, coups de pied arrêtés), en sécurité civile (portée des lances à incendie, zones d'exclusion lors de démolitions) et en génie hydraulique pour dimensionner les jets d'eau.

Trois pièges de calcul reviennent fréquemment :

- **Confondre degrés et radians** : évaluer `sin(45)` en radians donne `0,8509` au lieu de `0,7071`, faussant toute la simulation.
- **Appliquer `R = (v₀² × sin(2θ)) / g` avec `h₀ ≠ 0`** : cette formule simplifiée est fausse dès que le départ et l'arrivée ne sont pas à la même altitude.
- **Inverser le signe de `g`** : avec un axe vertical ascendant, l'accélération vaut `−9,81 m/s²`.

Dans l'air réel, la traînée aérodynamique (`F_traînée = ½ × ρ × Cx × A × v²`) rend la parabole asymétrique, réduit la portée et abaisse l'angle optimal vers `30° à 42°`. À cela s'ajoutent l'effet Magnus dû à la rotation du projectile, ainsi que la courbure terrestre et la force de Coriolis sur les très longues portées.
