---
title: "Comprendre la Quantité de Mouvement : La Physique des Collisions"
description: "Maîtrisez la formule p = m × v, le théorème de l'impulsion, la conservation de la quantité de mouvement lors des chocs et notre calculatrice dédiée."
category: "Math & Science"
relatedCalculator: "momentum-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Quelle est la différence entre quantité de mouvement et énergie cinétique ?"
    answer: "La quantité de mouvement (p = m × v) est une grandeur vectorielle proportionnelle à la vitesse et conservée dans tout système isolé, même lors d'un choc avec déformation. L'énergie cinétique (Ec = ½ × m × v²) est un scalaire proportionnel au carré de la vitesse, qui peut être converti en chaleur ou en déformation lors d'une collision inélastique."
  - question: "Pourquoi les véhicules modernes disposent-ils de zones de déformation programmée ?"
    answer: "Pour une variation de quantité de mouvement Δp imposée par l'arrêt du véhicule, l'impulsion vaut I = F_moy × Δt = Δp. En augmentant la durée d'impact Δt grâce à l'écrasement progressif de la carrosserie et au déploiement des coussins gonflables, on réduit d'autant la force moyenne F_moy subie par les occupants."
  - question: "La quantité de mouvement totale peut-elle être nulle alors que des objets bougent ?"
    answer: "Oui, car p est un vecteur orienté. Si deux patineurs de masse égale s'écartent l'un de l'autre à 3 m/s dans des directions exactement opposées, leurs quantités de mouvement (+m × v et −m × v) s'annulent vectoriellement, maintenant une somme totale nulle."
  - question: "Qu'appelle-t-on une collision parfaitement élastique par rapport à une collision inélastique ?"
    answer: "Dans une collision parfaitement élastique (coefficient de restitution e = 1), la quantité de mouvement et l'énergie cinétique totale sont toutes deux conservées. Dans une collision inélastique (e < 1), la quantité de mouvement reste conservée dans un système isolé, mais une fraction de l'énergie cinétique se dissipe en déformation plastique, bruit et chaleur."
  - question: "Comment la lumière ou une fusée dans le vide peuvent-elles posséder ou modifier une quantité de mouvement ?"
    answer: "Une fusée accélère en éjectant des gaz vers l'arrière : la quantité de mouvement gagnée par la fusée vers l'avant compense exactement celle emportée par les gaz. Quant aux photons sans masse, la mécanique relativiste et quantique leur attribue une quantité de mouvement p = E / c = h / λ."
---

Lorsqu'un insecte heurte un pare-brise à `10 km/h`, l'impact reste sans effet ; si une boule de pétanque frappe la même vitre à cette vitesse, le verre cède instantanément. Cette différence reflète l'écart de **quantité de mouvement**, grandeur vectorielle égale au produit de la masse par le vecteur vitesse (`p = m × v`), mesurée en kilogrammes-mètres par seconde (`kg·m/s`).

La quantité de mouvement gouverne l'issue de toute collision ou propulsion par réaction. Pour calculer rapidement `p`, `m` ou `v` en unités SI, utilisez notre [Calculatrice de Quantité de Mouvement](/fr/calculatrices/calculateur-de-quantite-mouvement).

## Définition vectorielle, impulsion et loi de conservation

La quantité de mouvement linéaire relie la masse et la vitesse par l'expression :

```text
p = m × v
```

Les trois grandeurs s'expriment en unités du Système international :

- **Quantité de mouvement (`p`)** : en **`kg·m/s`** (équivalent au newton-seconde, **`N·s`**). Grandeur vectorielle orientée, son signe algébrique traduit le sens du mouvement sur un axe.
- **Masse (`m`)** : en **kilogrammes (`kg`)**.
- **Vitesse (`v`)** : en **mètres par seconde (`m/s`)**.

### Théorème de l'impulsion et conservation lors des chocs

L'impulsion mécanique (`I`, en `N·s`) produite par une force moyenne `F_moy` pendant une durée `Δt` équivaut à la variation de quantité de mouvement du mobile :

```text
I = F_moy × Δt = Δp = m × (v_f − v_i)
```

Ce théorème explique le principe des dispositifs de sécurité passive : pour une variation `Δp` imposée lors d'un arrêt, doubler la durée d'écrasement `Δt` divise par deux la force moyenne `F_moy` transmise.

D'après la troisième loi de Newton, deux corps qui interagissent dans un système isolé (`∑F_ext = 0`) échangent des impulsions opposées. La **quantité de mouvement vectorielle totale est donc rigoureusement conservée** :

```text
m₁ × v₁ + m₂ × v₂ = m₁ × v'₁ + m₂ × v'₂
```

Cette conservation reste valable que le choc soit élastique (énergie cinétique conservée, coefficient de restitution `e = 1`), partiellement inélastique (`0 < e < 1`) ou parfaitement inélastique (`e = 0`, corps solidaires après impact avec dissipation maximale d'énergie cinétique).

## Exemple numérique détaillé : collision parfaitement inélastique

Sur une chaussée rectiligne, un véhicule A (`m₁ = 1 200 kg`, `v₁ = 20,0 m/s`, soit `72 km/h`) percute par l'arrière un véhicule B à l'arrêt (`m₂ = 800 kg`, `v₂ = 0 m/s`). Les deux véhicules restent accrochés après le choc, qui dure `Δt = 0,15 s`. Calculons la vitesse commune, la perte d'énergie et la force moyenne sur B :

1. **Quantité de mouvement initiale** : `p_initial = (1 200 × 20,0) + (800 × 0) = 24 000 kg·m/s`.
2. **Vitesse commune après collision (`v'`)** : par conservation, `(1 200 + 800) × v' = 24 000`, d'où `v' = 24 000 / 2 000 = 12,0 m/s` (`43,2 km/h`).
3. **Bilan d'énergie cinétique** : l'énergie initiale vaut `Ec_initial = ½ × 1 200 × 20,0² = 240,0 kJ`. Après impact, `Ec_final = ½ × 2 000 × 12,0² = 144,0 kJ`. L'énergie dissipée en déformation et chaleur atteint `ΔEc = 240,0 − 144,0 = 96,0 kJ` (`40,0 %` de perte).
4. **Force moyenne sur le véhicule B** : `Δp_B = 800 × (12,0 − 0) = 9 600 kg·m/s`, soit `F_moy = 9 600 / 0,15 = 64 000 N` (`64,0 kN`).

## Comparaison des régimes de collision et ordres de grandeur

Le tableau suivant récapitule les propriétés des principaux régimes de choc et ordres de grandeur mécaniques.

| Régime ou système physique | Quantité de mouvement (`p`) | Énergie cinétique (`Ec`) | Comportement observé |
| :--- | :--- | :--- | :--- |
| Collision élastique (`e = 1`) | Conservée vectoriellement | Conservée à `100 %` | Rebond sans perte thermique (billes d'acier) |
| Collision inélastique (`0 < e < 1`) | Conservée vectoriellement | Dissipation partielle | Rebond atténué (balle sur sol rigide) |
| Choc parfaitement inélastique (`e = 0`) | Conservée vectoriellement | Dissipation maximale | Mobiles accouplés après l'impact |
| Propulsion par réaction (fusée) | Somme totale constante (`0`) | Créée par énergie interne | Poussée opposée à l'éjection des gaz |
| Balle de fusil (`0,008 kg` à `800 m/s`) | `6,4 kg·m/s` | `2 560 J` | Faible impulsion, haute énergie concentrée |
| Poids lourd (`40 000 kg` à `22,2 m/s`) | `888 000 kg·m/s` | `9,86 MJ` | Forte inertie directionnelle au freinage |

## Applications d'ingénierie, erreurs courantes et limites théoriques

La conservation de la quantité de mouvement sert à reconstituer les vitesses pré-impact en accidentologie routière, à orienter les satellites par roues à réaction et à identifier les particules neutres invisibles dans les collisionneurs de physique des hautes énergies.

Trois erreurs d'analyse reviennent fréquemment :

- **Omettre le signe des vitesses** : lors d'un choc frontal, deux mobiles circulant en sens inverses possèdent des vitesses de signes opposés (`+v₁` et `−v₂`) ; additionner leurs modules fausse le bilan vectoriel.
- **Confondre égalité de `p` et égalité d'énergie** : lors d'une séparation à partir du repos (`p_total = 0`), les deux fragments ont des quantités de mouvement de même norme, mais le plus léger emporte l'essentiel de l'énergie cinétique car `Ec = p² / (2 × m)`.
- **Négliger les forces extérieures prolongées** : si un frottement intense ou un ancrage rigide agit durant le choc, le système n'est plus isolé et `∑F_ext × Δt` modifie `p`.

Enfin, à des vitesses relativistes (`v > 0,1 c`), il faut utiliser `p = γ × m × v` avec `γ = 1 / √(1 − v²/c²)`. En physique quantique et électromagnétique, les photons sans masse transportent eux aussi une quantité de mouvement (`p = E / c`), exploitée par les voiles solaires spatiales.
