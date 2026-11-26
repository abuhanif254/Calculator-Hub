---
title: "Calculatrice de Jour de Neige : L'École sera-t-elle Annulée ?"
description: "Évaluez la probabilité de fermeture des écoles et de suspension des transports scolaires par temps hivernal : cumul de neige, pluie verglaçante, refroidissement éolien et facteur horaire."
category: "Productivity & Utilities"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "snow-day-calculator"
faqs:
  - question: "Pourquoi une chute de neige de 10 cm ferme-t-elle les écoles dans une région mais pas dans une autre ?"
    answer: "Tout dépend de l'infrastructure locale de déneigement et de l'équipement des véhicules. Une zone alpine ou un territoire nord-américain habitué aux hivers rigoureux dispose de flottes importantes de chasse-neige et de pneus hiver généralisés, tandis qu'une région de plaine ou littorale suspend souvent les transports dès 5 à 8 cm."
  - question: "Quelle est la différence entre la suspension des transports scolaires et la fermeture de l'école ?"
    answer: "En Europe francophone, notamment en France via arrêté préfectoral, les autorités suspendent fréquemment uniquement les autocars scolaires sur le réseau secondaire : les établissements restent ouverts pour accueillir les élèves qui se déplacent à pied, alors qu'au Québec ou en Amérique du Nord la fermeture complète du centre scolaire est plus courante."
  - question: "La pluie verglaçante pèse-t-elle plus lourd que la neige dans la décision d'annulation ?"
    answer: "Oui. Quelques millimètres (2 à 5 mm) de pluie verglaçante sur un sol gelé forment une pellicule de glace vive extrêmement glissante sur laquelle le sel met du temps à agir. Le risque d'accident pour les bus scolaires devient critique, déclenchant des fermetures même sans aucune accumulation de neige."
  - question: "À partir de quel refroidissement éolien les établissements ferment-ils par grand froid ?"
    answer: "En l'absence de neige, les fermetures pour froid polaire surviennent généralement lorsque l'indice de refroidissement éolien descend sous −25 °C à −35 °C selon les régions. Ce seuil vise à prévenir les engelures chez les élèves qui attendent à l'arrêt de bus et à éviter les pannes de démarrage des autocars diesel."
  - question: "Les résultats d'une calculatrice de jour de neige sont-ils garantis ?"
    answer: "Non. Ces outils modélisent statistiquement les seuils météorologiques habituels, mais la décision finale appartient toujours aux autorités locales (préfecture, rectorat, direction d'établissement ou centre de services scolaire), qui intègrent l'état des stocks de sel, le nombre de chauffeurs disponibles et l'évolution en temps réel des chaussées."
---

La fermeture d'un établissement scolaire ou la suspension des transports par temps hivernal dépend d'une analyse du risque routier qui dépasse la seule hauteur de neige annoncée. Quatre variables pèsent sur l'arbitrage des autorités : la **fenêtre horaire de l'épisode**, la présence de **pluie verglaçante**, l'**indice de refroidissement éolien** et la **capacité locale de déneigement**.

En pondérant ces paramètres dans un modèle probabiliste, il devient possible d'anticiper le risque d'annulation avant les communiqués matinaux. Notre [Calculatrice de Jour de Neige](/fr/calculatrices/calculateur-jour-de-neige) croise ces critères météorologiques et territoriaux pour estimer votre probabilité de fermeture.

## Méthode d'évaluation et paramètres météorologiques clés

`20 cm` de neige tombant un samedi après-midi n'ont guère d'incidence sur les cours du lundi, car les services routiers disposent de plus de `36 heures` pour dégager les axes. Un modèle réaliste pondère donc l'intensité brute par un facteur horaire et un indice territorial :

```text
Refroidissement éolien : T_éolien = 13,12 + 0,6215 × T − 11,37 × V^0,16 + 0,3965 × T × V^0,16
Score de sévérité      : Score = (w₁ × S_neige + w₂ × I_verglas + w₃ × I_froid) × F_horaire × K_territoire
Probabilité estimée    : P (%) = 100 / [1 + e^(−(Score − Seuil) / Échelle)]
```

Dans la formule du refroidissement éolien (adoptée par Météo-France et Environnement Canada), `T` désigne la température sous abri en `°C` (`T ≤ 10 °C`) et `V` la vitesse du vent en `km/h` (`V > 4,8 km/h`).

### Les cinq facteurs déterminants

- **Cumul et intensité (`S_neige`) :** en centimètres (`cm`). Une chute dépassant `3 cm/h` sature les engins de déneigement entre deux rotations.
- **Facteur horaire (`F_horaire`) :** maximal (`× 1,20`) lorsque le pic survient entre `3 h` et `7 h` au départ des autocars ; faible si la tempête débute l'après-midi ou le week-end.
- **Verglas (`I_verglas`) :** quelques millimètres de pluie verglaçante multiplient par `4` à `8` la distance de freinage d'un autocar.
- **Froid extrême (`I_froid`) :** un ressenti sous `−25 °C` expose les élèves aux engelures à l'arrêt de bus et complique le démarrage des moteurs diesel.
- **Coefficient territorial (`K_territoire`) :** reflète la densité des routes secondaires rurales et le niveau d'équipement hivernal de la région.

## Exemple chiffré : tempête matinale en zone périurbaine

Prenons une prévision pour un mardi matin en plaine périurbaine : `14 cm` de neige attendus entre `4 h 30` et `7 h 30`, avec `2 mm` de pluie verglaçante en début d'épisode, une température `T = −12 °C` et un vent `V = 35 km/h`.

**Étape 1 — Calculer le refroidissement éolien (`T_éolien`) :**
Avec `35^0,16 ≈ 1,7662` :

```text
T_éolien = 13,12 + (0,6215 × −12) − (11,37 × 1,7662) + (0,3965 × −12 × 1,7662)
T_éolien = 13,12 − 7,458 − 20,082 − 8,404 = −22,82 °C
```

Le ressenti descend à `−22,8 °C`, tout près du seuil critique grand froid.

**Étape 2 — Pondérer par l'horaire et le territoire :**
Sur une grille calibrée à `100` points pour les plaines :
- `14 cm` de neige soutenue : `42 points` ;
- `2 mm` de pluie verglaçante : `+25 points` ;
- Refroidissement éolien à `−22,8 °C` : `+10 points`, soit `77 points` météo.

L'épisode coïncidant avec le ramassage scolaire (`F_horaire = 1,20`) sur un secteur périurbain à voirie secondaire (`K_territoire = 1,05`), le score atteint `77 × 1,20 × 1,05 = 97,02 points`. Via la courbe logistique, la probabilité d'annulation ressort à environ **`88 %`**. À titre de contraste, les mêmes `14 cm` tombant à `15 h` par `+1 °C` sans verglas chutent sous `25 points` (probabilité autour de `12 %`).

## Tableau comparatif des scénarios météorologiques hivernaux

| Scénario météo prévu | Zone | Fenêtre horaire | Facteur critique | Probabilité | Décision typique |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `4 cm` neige sèche (`−2 °C`) | Urbain dense | `2 h` – `5 h` | Voirie salée avant l'aube | `5 %`–`12 %` | Écoles et bus maintenus |
| `15 cm` neige (`−5 °C`) | Périurbain | `4 h` – `8 h` | Cadence `> 3 cm/h` au matin | `80 %`–`90 %` | Suspension cars / fermeture |
| `4 mm` pluie verglaçante | Plaine | `5 h` – `9 h` | Glace vive sur chaussée | `85 %`–`95 %` | Annulation générale des bus |
| `28 cm` + rafales `65 km/h` | Zone rurale | `23 h` – `7 h` | Congères et visibilité nulle | `92 %`–`98 %` | Fermeture annoncée la veille |
| Froid sec (`−33 °C` éolien) | Zone nordique | `7 h` – `9 h` | Risque d'engelure et pannes | `65 %`–`80 %` | Fermeture ou ouverture tardive |
| `18 cm` neige humide (`+1 °C`) | Banlieue | Samedi `10 h` | Aucun transport scolaire | `< 5 %` | Aucun impact lundi matin |

## Nuances régionales et limites de prévision

Les seuils d'alerte diffèrent fortement selon les territoires. En France, une **vigilance orange neige-verglas** conduit souvent les préfectures à suspendre par arrêté les transports scolaires dès `5` à `8 cm` dans les plaines du Nord, de l'Ouest ou du littoral, tout en maintenant les écoles ouvertes pour les élèves piétons. À l'inverse, en montagne ou au Québec, où flottes et chaussées sont préparées, il faut couramment `25` à `35 cm` de neige pour fermer les établissements.

Enfin, des paramètres logistiques échappent aux modèles météorologiques : niveau des stocks de sel en fin d'hiver, disponibilité des conducteurs, pannes de chauffage ou gel précoce des ponts et viaducs. Utilisez ces probabilités pour anticiper votre organisation, tout en confirmant systématiquement l'information auprès de la préfecture, du rectorat ou de votre établissement.
