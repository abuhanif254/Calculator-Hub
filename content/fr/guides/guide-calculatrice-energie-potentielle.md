---
title: "L'Énergie Potentielle : L'Énergie Stockée en Attente"
description: "Maîtrisez l'énergie potentielle gravitationnelle (Eₚ = m × g × h) : formules, conversion en énergie cinétique, exemple chiffré hydroélectrique, tableau comparatif et utilisation de notre calculatrice."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "potential-energy-calculator"
relatedType: "calculator"
faqs:
  - question: "Quelle est la différence entre l'énergie potentielle gravitationnelle et l'énergie potentielle élastique ?"
    answer: "L'énergie potentielle gravitationnelle (Eₚ = m × g × h) dépend de la masse d'un objet et de son élévation dans un champ de pesanteur. L'énergie potentielle élastique (Eₑ = ½ × k × x²) correspond à l'énergie mécanique stockée lors de la compression ou de l'étirement réversible d'un corps déformable comme un ressort, où k est la raideur en N/m et x la déformation en mètres."
  - question: "Pourquoi l'énergie potentielle dépend-elle du choix du niveau de référence (h = 0) ?"
    answer: "L'énergie potentielle n'a pas de valeur absolue universelle en mécanique classique : seule sa variation ΔEₚ = m × g × (h_final − h_initial) possède un sens physique mesurable. Vous pouvez donc choisir arbitrairement le niveau du sol, le fond d'un puits ou le plateau d'une table comme origine h = 0, à condition de conserver cette même référence tout au long du calcul."
  - question: "Quelle valeur de l'accélération gravitationnelle g faut-il utiliser dans les calculs de précision ?"
    answer: "Pour les calculs courants d'ingénierie et d'enseignement en Europe, on retient g = 9,81 m/s². La valeur normale normalisée par le Bureau international des poids et mesures (BIPM) est exactement g₀ = 9,80665 m/s². En pratique, g varie légèrement à la surface terrestre : environ 9,78 m/s² à l'équateur contre 9,83 m/s² aux pôles, et diminue avec l'altitude."
  - question: "La formule Eₚ = m × g × h reste-t-elle valable pour des altitudes spatiales ou des satellites ?"
    answer: "Non. L'expression m × g × h suppose un champ gravitationnel uniforme et constant, ce qui reste précis à moins de 0,3 % près jusqu'à environ 10 km d'altitude. Pour des trajectoires orbitales ou de très grandes distances, il faut utiliser la loi universelle de Newton : Eₚ(r) = −G × M × m / r, où r est la distance au centre de masse de l'astre."
  - question: "Comment l'énergie potentielle se convertit-elle en énergie cinétique lors d'une chute ?"
    answer: "En l'absence de frottements aérodynamiques, l'énergie mécanique totale Eₘ = Eₚ + E_c reste strictement conservée. Toute perte d'altitude Δh libère une quantité d'énergie m × g × Δh qui se transforme intégralement en énergie cinétique ½ × m × v². On en déduit directement la vitesse théorique atteinte après une chute de hauteur h : v = √(2 × g × h)."
---

L'**énergie potentielle gravitationnelle** représente l'énergie mécanique stockée par un corps en raison de son altitude dans un champ de gravité. Lorsqu'une charge est hissée contre la pesanteur, le travail fourni ne disparaît pas : il reste emmagasiné et prêt à être restitué sous forme cinétique ou électrique dès que la masse redescend.

Pour évaluer instantanément cette réserve, notre [Calculatrice d'Énergie Potentielle](/fr/calculatrices/calculateur-d-energie-potentielle) applique la relation `Eₚ = m × g × h`. Vous pouvez ainsi calculer l'énergie en joules (`J`), ou isoler la masse (`m`), la hauteur (`h`) ou la gravité locale (`g`).

## Principes fondamentaux et équations de l'énergie potentielle

Au voisinage immédiat de la surface terrestre, le champ de pesanteur est quasi uniforme. L'énergie potentielle (`Eₚ`) dépend alors linéairement de trois grandeurs du Système international (SI) :

```text
Énergie potentielle : Eₚ = m × g × h
Masse de l'objet    : m  = Eₚ / (g × h)
Hauteur relative    : h  = Eₚ / (m × g)
Gravité locale      : g  = Eₚ / (m × h)
```

- **`Eₚ` (Joules, `J`) :** énergie stockée par rapport au plan de référence (`1 J = 1 kg·m²/s²`).
- **`m` (kilogrammes, `kg`) :** masse de l'objet, distincte de son poids (`P = m × g` en newtons).
- **`g` (`m/s²`) :** pesanteur locale (`9,81 m/s²` sur Terre ; `9,80665 m/s²` en valeur normale ; `1,62 m/s²` sur la Lune ; `3,72 m/s²` sur Mars).
- **`h` (mètres, `m`) :** dénivelé vertical par rapport à l'origine `h = 0`.

### Conservation mécanique et conversion cinétique

La gravité étant une **force conservative**, son travail dépend uniquement des altitudes initiale et finale, jamais du chemin suivi. Sans frottements, la somme de l'énergie potentielle et de l'énergie cinétique (`E_c = ½ × m × v²`) demeure constante :

```text
Conservation : Eₚ₁ + E_c₁ = Eₚ₂ + E_c₂
Chute libre  : m × g × h = ½ × m × v²  ⇒  v = √(2 × g × h)
```

La masse `m` se simplifiant, la vitesse théorique en bas de chute ne dépend que de `g` et `h`. À l'échelle orbitale, où `g` décroît en `1 / r²`, la formule cède la place au potentiel newtonien `Eₚ(r) = −G × M × m / r` (`G ≈ 6,6743 × 10⁻¹¹ m³/(kg·s²)`).

## Exemple numérique : station de transfert d'énergie par pompage (STEP)

Les centrales hydroélectriques STEP stockent l'électricité excédentaire en pompant de l'eau vers un bassin supérieur. Étudions un réservoir de volume `V = 50 000 m³` situé à une hauteur de chute brute `h = 320 m`.

### Étape 1 : Déterminer la masse d'eau et l'énergie brute

Avec une masse volumique `ρ = 1 000 kg/m³`, la masse d'eau vaut `m = 50 000 × 1 000 = 50 000 000 kg` (`50 000 tonnes`). En prenant `g = 9,81 m/s²` :

`Eₚ = 50 000 000 × 9,81 × 320 = 156 960 000 000 J = 156,96 GJ`.

Comme `1 kWh = 3 600 000 J`, cette réserve correspond à `156 960 000 000 / 3 600 000 = 43 600 kWh = 43,60 MWh`.

### Étape 2 : Estimer l'électricité produite et la vitesse du jet

Avec un rendement global turbine-alternateur `η = 88 %` (`0,88`), l'énergie restituée au réseau atteint `E_élec = 43,60 × 0,88 = 38,37 MWh`. Hors pertes de charge dans la conduite forcée, la vitesse théorique de sortie de l'injecteur atteindrait `v = √(2 × 9,81 × 320) = √(6 278,4) ≈ 79,24 m/s` (`285 km/h`).

## Tableau comparatif d'ordres de grandeur (`g = 9,81 m/s²`)

Ce tableau compare six systèmes concrets du joule au gigajoule :

| Situation physique | Masse (`m`) | Hauteur (`h`) | Énergie potentielle (`Eₚ`) | Équivalent kWh |
| :--- | :--- | :--- | :--- | :--- |
| Pomme sur une branche | 0,15 kg | 2,0 m | 2,94 J | 8,18 × 10⁻⁷ kWh |
| Réservoir domestique surélevé | 1 000 kg | 12 m | 117,72 kJ | 0,0327 kWh |
| Ascenseur au 10ᵉ étage | 1 200 kg | 30 m | 353,16 kJ | 0,0981 kWh |
| Wagon de montagnes russes | 2 500 kg | 65 m | 1,59 MJ | 0,443 kWh |
| Randonneur au Mont-Blanc | 75 kg | 4 808 m | 3,54 MJ | 0,983 kWh |
| Bassin STEP (50 000 m³) | 50 000 000 kg | 320 m | 156,96 GJ | 43 600 kWh |

## Applications industrielles, erreurs fréquentes et limites du modèle

Le calcul de `Eₚ` sert au dimensionnement des **équipements de sécurité** (énergie d'impact en cas de rupture d'élingue, résistance des filets antichute et calcul des amortisseurs de fin de course), à l'ingénierie ferroviaire et routière (voies de détresse en descente, récupération d'énergie cinétique sur les trains et véhicules hybrides) ainsi qu'au **stockage gravitaire** par contrepoids dans les puits miniers désaffectés ou les tours modulaires.

Sur le terrain, les bureaux d'études évaluent également les variations de pesanteur selon l'altitude et la latitude : entre l'équateur (`9,780 m/s²`) et les pôles (`9,832 m/s²`), l'écart atteint environ `0,5 %`, ce qui peut peser sur le bilan énergétique d'un grand réservoir hydroélectrique.

Évitez quatre erreurs récurrentes lors de vos calculs :

1. **Confondre masse (`kg`) et poids (`N`) :** saisir une force en newtons dans le champ de la masse fausse le résultat d'un facteur `9,81`.
2. **Oublier la référence `h = 0` :** sous le niveau de référence (puits, sous-sol à `h = −6 m`), `Eₚ` devient négative ; il faut fournir un travail positif pour remonter la charge.
3. **Négliger les conversions :** convertissez les centimètres en mètres et les grammes en kilogrammes avant de calculer des joules.
4. **Ignorer les pertes dissipatives :** dans l'air ou dans un mécanisme réel, le frottement dissipe une part de `Eₚ` en chaleur, réduisant la vitesse finale sous `√(2 × g × h)`.
