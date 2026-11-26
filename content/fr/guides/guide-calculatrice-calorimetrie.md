---
title: "Calculatrice de Calorimétrie : Mesurer le Transfert de Chaleur"
description: "Maîtrisez la formule q = m × c × ΔT, le bilan thermique d'un calorimètre avec sa capacité thermique C_cal, la distinction entre bombe et vase Dewar et un exemple de neutralisation."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "calorimetry-calculator"
faqs:
  - question: "Quelle est la différence entre capacité thermique massique (c) et capacité thermique (C_cal) ?"
    answer: "La capacité thermique massique c (en J/(g·K) ou J/(kg·K)) est une propriété intensive propre à une substance : elle indique l'énergie nécessaire pour élever 1 g de cette matière de 1 K. La capacité thermique C_cal (en J/K) est une grandeur extensive propre à un appareil entier (paroi du calorimètre, agitateur, thermomètre) et représente la chaleur absorbée par l'instrument par degré d'échauffement."
  - question: "Pourquoi une variation de température ΔT en °C est-elle numériquement identique en kelvins (K) ?"
    answer: "L'échelle Celsius et l'échelle Kelvin possèdent exactement le même pas de graduation : un écart de 1 °C équivaut strictement à un écart de 1 K, seul le zéro de référence diffère de 273,15 unités. Ainsi, ΔT = T_finale − T_initiale reste inchangé que les deux températures soient exprimées en °C ou en K."
  - question: "Quelle est la distinction entre un calorimètre à tasse (pression constante) et une bombe calorimétrique ?"
    answer: "Un calorimètre à tasse (ou vase Dewar ouvert à l'atmosphère) fonctionne à pression constante et mesure directement la chaleur q_p = ΔH (adapté aux réactions en solution aqueuse). Une bombe calorimétrique est une enceinte d'acier hermétique à volume constant qui mesure q_v = ΔU, utilisée pour les combustions de solides, de liquides ou d'aliments sous dioxygène sous pression."
  - question: "Comment déterminer expérimentalement la capacité thermique C_cal d'un calorimètre ?"
    answer: "On réalise un étalonnage en mélangeant une masse connue d'eau chaude à température T₁ dans une masse connue d'eau froide à T₂ placée dans le calorimètre, ou en dissipant une énergie électrique mesurée (U × I × t). L'écart entre l'énergie cédée et l'énergie reçue par l'eau seule donne directement C_cal = −(q_chaude + q_froide) / ΔT_cal."
  - question: "Quand faut-il utiliser q = m × L à la place de q = m × c × ΔT ?"
    answer: "La relation q = m × c × ΔT s'applique uniquement lorsque la substance change de température sans changer d'état physique (chaleur sensible). Dès qu'un corps pur atteint sa température de fusion ou d'ébullition, la température reste constante pendant toute la transition et la chaleur échangée se calcule avec l'enthalpie massique de changement d'état L selon q = m × L (chaleur latente)."
---

La **calorimétrie** est la discipline expérimentale qui mesure les transferts de chaleur (`q`) accompagnant une transformation chimique, un mélange thermique ou un changement d'état dans une enceinte isolée. En mesurant avec précision l'élévation ou la chute de température d'un milieu récepteur (généralement de l'eau ou une solution aqueuse), on remonte directement à l'énergie libérée ou absorbée par le phénomène étudié.

Notre [Calculatrice de Calorimétrie](/fr/calculatrices/calculateur-de-calorimetrie) résout l'équation fondamentale `q = m × c × ΔT` en isolant automatiquement l'inconnue de votre choix : énergie thermique (`q`), masse (`m`), capacité thermique massique (`c`) ou variation de température (`ΔT`). Cet outil permet de dépouiller rapidement des mesures de laboratoire, de dimensionner un bain thermostatique ou d'estimer une chaleur spécifique inconnue.

## Équations fondamentales et bilan d'un calorimètre

Dans un calorimètre idéalement adiabatique (aucune fuite thermique vers l'extérieur), la conservation de l'énergie impose que la somme algébrique de toutes les chaleurs échangées à l'intérieur de l'enceinte soit nulle. Dans un appareil réel, les parois internes, le barreau aimanté et la sonde thermométrique absorbent également une fraction de l'énergie via la **capacité thermique du calorimètre (`C_cal`)**.

```text
Chaleur sensible d'une phase : q = m × c × ΔT = m × c × (T_f − T_i)
Énergie absorbée par l'appareil : q_cal = C_cal × ΔT
Bilan thermique adiabatique  : q_réaction + q_solution + q_cal = 0
Soit pour la réaction        : q_réaction = −(m_sol × c_sol + C_cal) × ΔT
Enthalpie molaire (à P cst)  : ΔH_r = q_réaction / n_limitant
```

Les paramètres suivent des unités cohérentes : `q` en joules (`J`), `m` en grammes (`g`), `c` en `J/(g·K)` (soit `4,184 J/(g·K)` pour l'eau pure liquide à `25 °C`), `C_cal` en `J/K` et `ΔT = T_f − T_i` en `°C` ou en `K`. Lorsque deux corps à des températures différentes sont mis en contact sans réaction chimique (`q_réaction = 0`), la température d'équilibre `T_éq` se situe toujours entre les deux températures initiales.

## Exemple expérimental : neutralisation acide-base

Au laboratoire, on mélange dans un calorimètre à vase Dewar (`C_cal = 42,0 J/K`) un volume de `50,0 mL` d'acide chlorhydrique (`HCl`) à `1,00 mol/L` et `50,0 mL` d'hydroxyde de sodium (`NaOH`) à `1,00 mol/L`, tous deux initialement équilibrés à `T_i = 21,50 °C`. Après agitation, la température maximale mesurée atteint `T_f = 27,56 °C`.

En assimilant la solution saline diluée à de l'eau pure (`ρ = 1,00 g/mL` et `c_sol = 4,184 J/(g·K)`), le dépouillement complet s'effectue en quatre étapes :

1. **Variation de température et masse totale** :
   `ΔT = 27,56 − 21,50 = +6,06 °C = +6,06 K`
   `m_sol = (50,0 + 50,0) mL × 1,00 g/mL = 100,0 g`
2. **Chaleur absorbée par la solution et le calorimètre** :
   `q_sol = 100,0 × 4,184 × 6,06 = +2 535,5 J`
   `q_cal = 42,0 × 6,06 = +254,5 J`
3. **Chaleur libérée par la réaction** :
   `q_réaction = −(2 535,5 + 254,5) = −2 790,0 J = −2,790 kJ`
4. **Enthalpie molaire de neutralisation** :
   La quantité de matière d'eau formée vaut `n = 0,0500 L × 1,00 mol/L = 0,0500 mol`.
   `ΔH_neut = −2,790 kJ / 0,0500 mol = −55,80 kJ/mol`

On retrouve ainsi la valeur de référence tabulée (`−55,84 kJ/mol`) à moins de `0,1 %` près. Sans prise en compte de `C_cal`, l'erreur systématique par défaut aurait atteint près de `9 %`.

## Capacités thermiques massiques de référence

Le choix d'un fluide caloporteur ou d'un matériau de stockage thermique dépend directement de sa capacité thermique massique `c` (mesurée ici vers `25 °C` / `298 K` sauf mention contraire).

| Substance | État physique | c (J/(g·K)) | c (J/(kg·K)) | Usage ou propriété thermique |
| :--- | :--- | :--- | :--- | :--- |
| Eau pure | Liquide (`25 °C`) | `4,184` | `4 184` | Fluide de référence calorimétrique et caloporteur |
| Éthanol | Liquide (`25 °C`) | `2,440` | `2 440` | Solvant organique à inertie thermique modérée |
| Glace d'eau | Solide (`0 °C`) | `2,090` | `2 090` | Deux fois plus faible que l'eau liquide |
| Aluminium | Solide (`25 °C`) | `0,897` | `897` | Dissipateurs thermiques et échangeurs légers |
| Verre borosilicaté | Solide (`25 °C`) | `0,830` | `830` | Verrerie de laboratoire (béchers, vases Dewar) |
| Fer / Acier doux | Solide (`25 °C`) | `0,449` | `449` | Enceinte des bombes calorimétriques |
| Cuivre | Solide (`25 °C`) | `0,385` | `385` | Conduction rapide avec faible inertie massique |

## Protocoles de mesure, limites et erreurs courantes

En pratique industrielle et analytique (normes ISO 1928 pour les combustibles solides ou calorimétrie différentielle à balayage DSC en pharmacie), la qualité d'une mesure calorimétrique repose sur le contrôle des pertes thermiques. Lorsque la réaction est lente, la courbe température-temps `T(t)` doit être extrapolée graphiquement par la méthode de Regnault-Pfaundler afin de corriger les échanges résiduels avec l'air ambiant.

Quatre pièges classiques faussent fréquemment les calculs de calorimétrie :

1. **Négliger `C_cal` ou la valeur en eau** : dans un simple gobelet en verre ou un calorimètre métallique non étalonné, la paroi absorbe `5 % à 20 %` de la chaleur dégagée.
2. **Incohérence d'unités sur `m` et `c`** : associer une masse en kilogrammes avec `c = 4,184 J/(g·K)` introduit un facteur d'erreur de `1 000`. Convertissez systématiquement `m` en grammes ou exprimez `c` en `J/(kg·K)`.
3. **Oublier un changement de phase** : si de la glace fond pendant l'expérience ou si de l'eau bout, l'équation `q = m × c × ΔT` devient invalide sur le palier isotherme et doit être complétée par `m × L`.
4. **Confondre `q_p` et `q_v` en bombe calorimétrique** : une combustion en bombe scellée mesure `ΔU`, et non `ΔH` ; la conversion exige d'ajouter `Δν_gaz × R × T` lorsque le nombre de moles de gaz varie entre réactifs et produits.
