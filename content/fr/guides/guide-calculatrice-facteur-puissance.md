---
title: "Facteur de Puissance : L'Analogie de la Bière"
description: "Comprenez le Facteur de Puissance. Découvrez la différence entre Puissance Active, Apparente et Réactive avec notre Calculatrice de Facteur de Puissance."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "power-factor-calculator"
faqs:
  - question: "Quelle est la différence entre kW et kVA ?"
    answer: "Le kilowatt (kW) mesure la puissance active réellement convertie en travail utile (chaleur, mouvement, lumière). Le kilovoltampère (kVA) mesure la puissance apparente totale que le réseau et le transformateur doivent fournir. Lorsque le facteur de puissance vaut 1, kW et kVA sont égaux ; s'il vaut 0,80, il faut 125 kVA pour obtenir 100 kW utiles."
  - question: "Un mauvais facteur de puissance augmente-t-il la facture d'électricité d'un particulier ?"
    answer: "En France et dans la majorité des pays européens, les compteurs résidentiels (puissance souscrite ≤ 36 kVA) ne facturent que l'énergie active (kWh). Toutefois, comme un mauvais facteur de puissance augmente l'intensité circulant dans les câbles, il peut faire disjoncter votre installation plus tôt par dépassement de la puissance apparente souscrite (kVA)."
  - question: "Pourquoi les industriels paient-ils des pénalités pour l'énergie réactive ?"
    answer: "L'énergie réactive (kVARh) ne produit pas de travail chez l'usager mais circule sur les lignes haute et basse tension, générant des pertes par effet Joule et saturant la capacité des transformateurs. En France, pour les contrats professionnels supérieurs à 36 kVA, le gestionnaire de réseau facture les dépassements lorsque tan(φ) excède 0,40 (soit un facteur de puissance inférieur à 0,928)."
  - question: "Le facteur de puissance est-il toujours égal à cos(φ) ?"
    answer: "Uniquement lorsque le courant et la tension sont parfaitement sinusoïdaux. En présence de charges non linéaires (alimentations à découpage, variateurs de vitesse, éclairages LED sans correction), le courant est déformé par des harmoniques : le facteur de puissance réel devient inférieur au simple cos(φ) du signal fondamental."
  - question: "Comment corriger efficacement un facteur de puissance trop bas ?"
    answer: "Pour des charges inductives comme des moteurs asynchrones, on installe des batteries de condensateurs automatiques en parallèle afin de compenser localement la puissance réactive. Pour les appareils électroniques, l'intégration d'un étage PFC (Power Factor Correction) actif ramène le facteur de puissance entre 0,95 et 0,99."
---

En courant alternatif (CA), toute l'électricité appelée sur le réseau ne se transforme pas en travail mécanique, thermique ou lumineux. Une fraction de l'énergie effectue des allers-retours permanents entre le générateur et les champs magnétiques des moteurs ou transformateurs, encombrant inutilement les câbles. Le **facteur de puissance (FP)** quantifie cette efficacité d'utilisation du courant, et vous pouvez l'évaluer instantanément grâce à notre [Calculatrice de Facteur de Puissance](/fr/calculatrices/calculateur-de-facteur-de-puissance).

Pour visualiser ce phénomène sans recourir immédiatement au calcul vectoriel, l'analogie de la chope de bière reste la plus parlante : le **liquide** représente la puissance active (`P`, en kW) qui désaltère réellement, la **mousse** correspond à la puissance réactive (`Q`, en kVAR) qui occupe de l'espace sans nourrir, et la **chope entière** symbolise la puissance apparente (`S`, en kVA) que le fournisseur doit dimensionner et acheminer.

## Triangle des puissances et formules fondamentales

En régime alternatif sinusoïdal (50 Hz en Europe), les charges purement résistives maintiennent la tension et le courant parfaitement en phase. À l'inverse, les bobinages inductifs retardent le courant d'un angle de déphasage `φ`, créant le célèbre **triangle rectangle des puissances** :

```text
Puissance apparente :     S = √(P² + Q²) = U × I (monophasé) ou √3 × U × I (triphasé)
Puissance réactive :      Q = √(S² − P²) = S × sin(φ)
Facteur de puissance :    FP = P / S
Régime sinusoïdal pur :   FP = cos(φ)   et   tan(φ) = Q / P
Avec harmoniques :        FP = cos(φ) × [1 / √(1 + THD²)]
```

Le facteur de puissance `FP` varie entre `0` et `1` (souvent exprimé en pourcentage, de `0 %` à `100 %`). Un `FP` égal à `1,00` signifie que toute la puissance apparente sert à produire un travail utile (`Q = 0`). À l'opposé, un `FP` de `0,75` indique que `25 %` de la capacité électrique mobilisée dans les câbles et transformateurs sert uniquement à transporter une « mousse » improductive, obligeant à surdimensionner les sections de cuivre et augmentant les pertes thermiques `R × I²`.

Lorsque des équipements électroniques déforment la forme d'onde du courant, le taux de distorsion harmonique (`THD`) dégrade le facteur de puissance même si `cos(φ)` semble proche de `1`.

## Exemple chiffré : diagnostic et correction en atelier

Considérons un atelier mécanique alimenté en triphasé `400 V` dont les machines absorbent une puissance active mesurée au wattmètre de `P = 40,0 kW`, tandis que la puissance apparente relevée au compteur atteint `S = 50,0 kVA`.

1. **Calcul du facteur de puissance actuel :** `FP = 40,0 / 50,0 = 0,80` (soit `80 %` d'efficacité). En régime sinusoïdal, `cos(φ₁) = 0,80`, ce qui correspond à un déphasage `φ₁ ≈ 36,87°` et à `tan(φ₁) = 0,75`.
2. **Calcul de la puissance réactive (« la mousse ») :** `Q = √(50,0² − 40,0²) = √(2 500 − 1 600) = √900 = 30,0 kVAR`.
3. **Courant circulant dans la ligne :** `I = 50 000 / (1,732 × 400) = 72,2 A`.
4. **Dimensionnement de la compensation :** pour éviter les pénalités tarifaires, l'atelier vise `FP = 0,96` (`tan(φ₂) = 0,292`). La puissance capacitive nécessaire est `Q_c = P × (tan(φ₁) − tan(φ₂)) = 40,0 × (0,75 − 0,292) = 18,32 kVAR`, ce qui conduit à installer une batterie automatique de `20 kVAR`.
5. **Gain obtenu :** à `FP = 0,96`, la puissance apparente chute à `S' = 40,0 / 0,96 = 41,67 kVA` et le courant de ligne tombe à `60,1 A`, soit une baisse d'intensité de `16,7 %` et une réduction des pertes Joule dans les câbles d'alimentation de `30,6 %`.

## Comparatif des facteurs de puissance par type d'équipement

Pour une puissance utile identique de `10,0 kW`, le tableau suivant illustre l'impact direct du facteur de puissance sur la capacité apparente exigée et sur l'énergie réactive générée.

| Type de charge électrique | Facteur de puissance typique | Nature du déphasage ou de la distorsion | `S` requise pour `10 kW` | `Q` réactive (ou équivalente) | Impact sur le réseau |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Radiateur électrique / Four résistif | `1,00` | Aucun (charge résistive pure) | `10,00 kVA` | `0,00 kVAR` | Optimal, aucune pénalité |
| Alimentation PC avec PFC actif | `0,98` | Très faible distorsion résiduelle | `10,20 kVA` | `~2,03 kVAR` | Excellent, conforme normes CE |
| Éclairage LED professionnel | `0,92` | Légèrement capacitif + harmoniques | `10,87 kVA` | `~4,26 kVAR` | Acceptable, conforme seuil pro |
| Moteur asynchrone (pleine charge) | `0,85` | Inductif (champ magnétique) | `11,76 kVA` | `~6,20 kVAR` | Compensation utile au tableau |
| Moteur asynchrone (à 30 % de charge) | `0,55` | Fortement inductif | `18,18 kVA` | `~15,19 kVAR` | Gaspillage majeur de capacité |
| Chargeur / Redresseur sans PFC | `0,65` | Forte distorsion harmonique (`THD`) | `15,38 kVA` | Déformation + réactif | Échauffement du neutre et filtres |

## Réglementation, erreurs courantes et précautions

En France, la tarification de l'énergie réactive s'applique aux raccordements professionnels de puissance supérieure à `36 kVA` (segments C2 à C4). Le gestionnaire de réseau Enedis tolère gratuitement une tangente `tan(φ)` allant jusqu'à `0,40` pendant les heures pleines d'hiver et d'été, ce qui équivaut à un facteur de puissance minimal de `0,928`. Au-delà, chaque `kVARh` excédentaire est facturé sur la facture d'acheminement, rendant l'installation de batteries de condensateurs généralement rentable en moins de 18 à 24 mois.

Deux pièges techniques méritent une vigilance particulière. D'une part, surdimensionner des condensateurs fixes provoque une **surcompensation** lorsque les moteurs s'arrêtent la nuit : la charge devient capacitive, le courant avance la tension et la tension du site peut grimper dangereusement. L'usage d'un régulateur varmétrique pilotant des gradins automatiques élimine ce risque.

D'autre part, en présence d'un parc important de variateurs de vitesse, d'onduleurs ou d'éclairages LED, des condensateurs classiques peuvent entrer en résonance avec les harmoniques de rang 5 ou 7 et exploser par surintensité. Il convient alors de mesurer le spectre harmonique au préalable et d'utiliser des batteries désaccordées équipées de selfs anti-harmoniques, ou des filtres actifs de puissance.
