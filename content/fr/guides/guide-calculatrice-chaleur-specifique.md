---
title: "Calculatrice de Chaleur Spécifique : Capacité Thermique"
description: "Maîtrisez la capacité thermique massique (Q = m × c × ΔT) : définitions thermodynamiques, bilan calorimétrique chiffré, tableau de matériaux et limites physiques."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "specific-heat-calculator"
faqs:
  - question: "Quelle est la différence entre chaleur spécifique (c) et capacité thermique (C) ?"
    answer: "La chaleur spécifique, ou capacité thermique massique (notée c), est une grandeur intensive propre à chaque substance, exprimée en J/(kg·K) ou J/(g·°C). La capacité thermique globale (notée C) est une grandeur extensive propre à un objet donné : elle vaut C = m × c et s'exprime en J/K."
  - question: "Pourquoi la formule Q = m × c × ΔT échoue-t-elle pendant la fusion ou l'ébullition ?"
    answer: "Lors d'un changement d'état d'un corps pur à pression constante, toute l'énergie thermique fournie sert à rompre les liaisons intermoléculaires sans modifier l'agitation thermique moyenne : la température reste constante (ΔT = 0). Il faut alors utiliser l'enthalpie de changement d'état selon la relation Q = m × L."
  - question: "Pourquoi distingue-t-on la chaleur spécifique à pression constante (cp) de celle à volume constant (cv) ?"
    answer: "Lorsqu'on chauffe un gaz à pression constante, il se dilate et fournit un travail mécanique contre le milieu extérieur ; il exige donc plus d'énergie que si son volume restait bloqué (cp > cv). Pour les solides et les liquides peu compressibles, cette dilatation reste minime et cp demeure très proche de cv."
  - question: "Peut-on utiliser indifféremment les degrés Celsius (°C) et les kelvins (K) pour calculer ΔT ?"
    answer: "Oui, absolument. Comme l'écart entre deux graduations de l'échelle Celsius est rigoureusement égal à un kelvin, une variation ΔT de 25 °C correspond exactement à une variation de 25 K. Veillez toutefois à ne jamais confondre une température absolue et un écart de température."
  - question: "Pourquoi l'eau liquide possède-t-elle une chaleur spécifique nettement supérieure à celle des métaux ?"
    answer: "Les molécules d'eau forment entre elles un réseau dense de liaisons hydrogène. Une part importante de l'énergie apportée sert d'abord à étirer et rompre partiellement ces interactions intermoléculaires avant d'accroître l'énergie cinétique de translation, ce qui confère à l'eau une inertie thermique exceptionnelle de 4 184 J/(kg·K)."
---

La **capacité thermique massique** — couramment appelée **chaleur spécifique** et notée `c` — mesure la quantité d'énergie thermique nécessaire pour élever de `1 K` (ou `1 °C`) la température d'une masse unitaire de `1 kg` (ou `1 g`) d'une substance donnée, sans changement d'état. Exprimée en joules par kilogramme et par kelvin (`J/(kg·K)`) dans le Système international, cette propriété intrinsèque explique pourquoi une même quantité de chaleur porte rapidement une poêle en cuivre à haute température alors qu'elle ne réchauffe que lentement un volume équivalent d'eau.

Notre [Calculatrice de Chaleur Spécifique](/fr/calculatrices/calculateur-de-chaleur-massique) résout instantanément l'équation fondamentale de la chaleur sensible `Q = m × c × ΔT` pour isoler l'énergie échangée, la masse de l'échantillon, la capacité thermique massique d'un matériau inconnu ou l'écart thermique final. Elle permet ainsi de dimensionner un équipement thermique, de vérifier un bilan calorimétrique ou d'identifier un alliage en laboratoire.

## Principes thermodynamiques et équation de la chaleur sensible

Tant qu'aucune transition de phase (fusion, vaporisation) ni réaction chimique ne se produit, le transfert thermique sensible `Q` reçu ou cédé par un corps homogène est proportionnel à sa masse et à sa variation de température :

```text
Q = m × c × ΔT        |  ΔT = T_finale − T_initiale
c = Q / (m × ΔT)      |  m  = Q / (c × ΔT)
T_finale = T_initiale + Q / (m × c)
```

- **`Q` (Énergie thermique, en `J` ou `kJ`)** : positive lorsque le corps absorbe de la chaleur (`ΔT > 0`), négative lorsqu'il refroidit (`ΔT < 0`).
- **`m` (Masse, en `kg` ou `g`)** : doit correspondre à l'unité de masse au dénominateur de `c`.
- **`c` (Capacité thermique massique, en `J/(kg·K)` ou `J/(g·°C)`)** : propriété intensive du matériau (`1 J/(g·°C) = 1 000 J/(kg·K)`).
- **`ΔT` (Écart thermique, en `K` ou `°C`)** : l'amplitude d'un degré Celsius étant identique à celle d'un kelvin, aucune conversion en kelvins n'est requise pour une différence.

Pour les gaz, on distingue la capacité isobare `cp` (pression constante) de la capacité isochore `cv` (volume constant). Pour les liquides et solides à pression ambiante, on emploie usuellement `cp`.

## Exemple chiffré : chauffage d'eau et équilibre calorimétrique

Chauffons d'abord `1,50 kg` d'eau (`c = 4 184 J/(kg·K)`) de `18,0 °C` à `100,0 °C` (`ΔT = 82,0 K`) avec une bouilloire de `2 000 W`, sans pertes : `Q = 1,50 × 4 184 × 82,0 = 514 632 J` (`514,63 kJ`, soit `0,143 kWh`), pour une durée théorique `t = 514 632 / 2 000 = 257,3 s` (`4 min 17 s`).

Analysons ensuite la trempe d'une pièce de cuivre de `1,50 kg` à `180,0 °C` (`c_Cu = 385 J/(kg·K)`) plongée dans un calorimètre adiabatique contenant `2,00 kg` d'eau à `20,0 °C`. À l'équilibre thermique (`T_eq`), la somme des échanges est nulle :

```text
1,50 × 385 × (T_eq − 180,0) + 2,00 × 4 184 × (T_eq − 20,0) = 0
577,5 × T_eq − 103 950 + 8 368 × T_eq − 167 360 = 0
8 945,5 × T_eq = 271 310  →  T_eq ≈ 30,33 °C
```

Le cuivre cède `86,43 kJ` quand l'eau absorbe `86,44 kJ` (écart dû à l'arrondi). À masses comparables, l'eau ne gagne que `10,33 °C` alors que le cuivre chute de `149,67 °C`, reflétant directement le rapport entre leurs chaleurs spécifiques.

## Valeurs de référence des matériaux courants

Le tableau ci-dessous rassemble les capacités thermiques massiques à pression atmosphérique normale (aux environs de `20 °C`, sauf mention contraire) pour sept substances fréquemment rencontrées en physique, en chimie et en ingénierie :

| Substance | État physique | `c` en `J/(kg·K)` | `c` en `J/(g·°C)` | Usage thermique caractéristique |
| :--- | :--- | :---: | :---: | :--- |
| Eau pure (`20 °C`) | Liquide | `4 184` | `4,184` | Fluide caloporteur, stockage thermique |
| Éthanol (`25 °C`) | Liquide | `2 440` | `2,440` | Solvant, fluide cryogénique basse température |
| Glace (`−10 °C`) | Solide | `2 050` | `2,050` | Chaîne du froid, climatologie |
| Aluminium | Solide | `897` | `0,897` | Dissipateurs thermiques, échangeurs légers |
| Verre borosilicaté | Solide | `830` | `0,830` | Verrerie de laboratoire, isolation vitrée |
| Fer / Acier doux | Solide | `449` | `0,449` | Radiateurs en fonte, outillage industriel |
| Cuivre | Solide | `385` | `0,385` | Ustensiles de cuisson, tuyauterie, électronique |

## Applications pratiques, écueils et limites physiques

En génie climatique et en thermique du bâtiment, la capacité thermique massique guide le choix des fluides caloporteurs (eau pure ou eau glycolée) et le dimensionnement de l'inertie des parois lourdes (béton, brique, pierre) destinées à lisser les pics de température estivaux. Dans l'industrie automobile ou électronique, elle permet d'évaluer l'élévation thermique maximale d'un composant lors d'une surcharge transitoire.

Plusieurs erreurs méthodologiques faussent fréquemment les résultats :

- **Oublier la capacité thermique du récipient** : lors d'une mesure en calorimètre réel, une fraction de l'énergie chauffe également les parois et l'agitateur (la valeur en eau du calorimètre). L'ignorer sous-estime systématiquement la chaleur spécifique mesurée.
- **Confondre les unités énergétiques** : les tables anciennes expriment `c` en `cal/(g·°C)` (`1 cal = 4,184 J`), tandis que les fiches techniques de chauffage utilisent le `Wh` ou le `kWh` (`1 kWh = 3 600 000 J`).
- **Appliquer `Q = m × c × ΔT` à travers un changement d'état** : si vous partez de glace à `−10 °C` pour obtenir de l'eau à `+20 °C`, vous devez additionner trois termes distincts : échauffement de la glace (`c = 2 050 J/(kg·K)`), fusion isotherme à `0 °C` (chaleur latente `L_f = 333,5 kJ/kg`), puis échauffement de l'eau liquide (`c = 4 184 J/(kg·K)`).
- **Supposer `c` rigoureusement constant sur de vastes plages thermiques** : chez les solides cristallins, `c` chute fortement aux températures cryogéniques selon le modèle de Debye et augmente légèrement à haute température. Pour des écarts modérés (`0 °C` à `100 °C`), la valeur tabulée à `20 °C` reste toutefois suffisamment précise pour la grande majorité des calculs d'ingénierie.
