---
title: "Convertisseur d'Unités"
metaTitle: "Convertisseur d'Unités : Longueur, Poids, Volume et °C/°F"
description: "Convertissez instantanément vos mesures entre le système métrique (SI) et les unités impériales ou américaines : longueur, masse, volume et température (°C, °F, K)."
metaDescription: "Convertissez avec précision longueurs, masses, volumes et températures entre unités SI (m, kg, L, °C) et anglo-saxonnes (pouces, lb, gal, °F)."
metaKeywords: "convertisseur d'unités, calculateur de conversion, unités SI, métrique en impérial, pouces en cm, kilogrammes en livres, celsius en fahrenheit, gallons en litres"
faqs:
  - question: "Pourquoi les conversions de longueur, de masse et de volume suivent-elles un facteur multiplicatif, mais pas celles de température ?"
    answer: "Les longueurs, les masses et les volumes partagent le même zéro physique absolu : 0 m vaut exactement 0 pied et 0 kg vaut 0 livre. Le passage d'une unité à l'autre est donc strictement proportionnel. En revanche, les échelles Celsius, Fahrenheit et Kelvin possèdent des points zéro différents (0 °C correspond à 32 °F et à 273,15 K), ce qui impose une transformation affine combinant un coefficient d'échelle et un décalage additif."
  - question: "Quelle est la différence entre le gallon américain et le gallon impérial britannique ?"
    answer: "Le gallon liquide américain vaut exactement 3,78541 litres, alors que le gallon impérial britannique (utilisé historiquement au Royaume-Uni et parfois encore au Canada pour la consommation automobile) atteint 4,54609 litres, soit 20,10 % de plus. Le même décalage touche la pinte (473,18 mL aux États-Unis contre 568,26 mL au Royaume-Uni) et la tasse culinaire (236,59 mL aux États-Unis contre 250 mL pour la tasse métrique canadienne)."
  - question: "Comment convertir rapidement des degrés Celsius en Fahrenheit et en Kelvin ?"
    answer: "Pour passer des degrés Celsius aux degrés Fahrenheit, multipliez par 9/5 (soit 1,8) puis ajoutez 32 : ainsi, 20 °C donnent 68 °F et 100 °C donnent 212 °F. Pour passer en Kelvin, unité de base du Système international (SI), ajoutez simplement 273,15 à la valeur en Celsius : 20 °C équivalent donc à 293,15 K. Remarquons enfin que les échelles Celsius et Fahrenheit se croisent exactement à −40 °C = −40 °F."
  - question: "Pourquoi faut-il distinguer l'once avoirdupois, l'once troy et l'once liquide ?"
    answer: "Le terme « once » recouvre trois grandeurs incompatibles. L'once avoirdupois (oz) mesure une masse courante et vaut 28,3495 g (un seizième de livre). L'once troy (ozt), réservée à l'or, à l'argent et aux métaux précieux, pèse 31,1035 g. Quant à l'once liquide américaine (fl oz), il s'agit d'une unité de volume de 29,5735 mL, dont la masse ne correspond à 29,57 g que pour de l'eau pure à densité unitaire."
  - question: "Les facteurs de conversion comme 1 pouce = 2,54 cm ou 1 livre = 0,45359237 kg sont-ils exacts ou approchés ?"
    answer: "Ces deux égalités sont rigoureusement exactes par définition internationale depuis l'Accord sur le yard et la livre de 1959, qui a rattaché les unités usuelles anglo-saxonnes aux étalons du Système international (SI). Le pouce vaut exactement 0,0254 m, le pied 0,3048 m, la verge 0,9144 m, le mille terrestre 1 609,344 m et la livre avoirdupois exactement 0,45359237 kg."
---

Adapter une recette nord-américaine, contrôler la franchise bagage d'un vol transatlantique, lire une fiche technique d'outillage ou interpréter un bulletin météorologique étranger impose de traduire fidèlement le **Système international d'unités (SI)** vers les unités impériales ou américaines. Même au Canada, où le système métrique est officiel depuis les années 1970, la taille, les matériaux de construction et la cuisine courante mêlent quotidiennement pieds, pouces, livres et millilitres.

Notre **convertisseur d'unités** couvre quatre grandeurs essentielles — **Longueur**, **Poids (masse)**, **Température** et **Volume** — avec saisie bidirectionnelle et inversion instantanée, à partir des définitions métrologiques exactes du Bureau international des poids et mesures (BIPM).

## Équations de Conversion : Pivot Métrique et Transformations Affines

Pour les grandeurs proportionnelles (**longueur**, **masse** et **volume**), chaque unité est rattachée par un facteur exact à une **unité pivot** ($u_0$) : le **mètre (`m`)**, le **kilogramme (`kg`)** ou le **litre (`L`)**. Toute conversion s'écrit en une seule équation homogène :

$$V_{\text{cible}} = V_{\text{source}} \times \frac{f_{\text{source}}}{f_{\text{cible}}}$$

* **$V_{\text{source}}$ et $V_{\text{cible}}$** : valeurs numériques dans les unités de départ et d'arrivée.
* **$f_{\text{source}}$ et $f_{\text{cible}}$** : équivalents respectifs d'une unité source et d'une unité cible exprimés dans l'unité pivot (par exemple $0{,}0254\,\text{m}$ pour 1 pouce, $0{,}01\,\text{m}$ pour 1 centimètre, $0{,}45359237\,\text{kg}$ pour 1 livre).
* **$k = f_{\text{source}} / f_{\text{cible}}$** : facteur multiplicatif direct entre les deux unités.

### Échelles de Température : Transformations Affines

Les échelles thermométriques ne partagent pas le même zéro ($0\,°\text{C} = 32\,°\text{F} = 273{,}15\,\text{K}$). L'outil convertit donc toute température via le degré Celsius selon trois équations affines exactes :

$$T_{°\text{F}} = \frac{9}{5}\,T_{°\text{C}} + 32 \qquad T_{°\text{C}} = (T_{°\text{F}} - 32) \times \frac{5}{9} \qquad T_{\text{K}} = T_{°\text{C}} + 273{,}15$$

Pour un **écart de température** (variation thermique), le décalage constant disparaît : une hausse de $\Delta 10\,°\text{C}$ équivaut exactement à $+18\,°\text{F}$ et à $+10\,\text{K}$.

## Exemples Chiffrés Pas à Pas

Voici trois conversions concrètes vérifiées à partir des facteurs exacts du moteur.

### 1. Menuiserie : 78,5 Pouces en Mètres, Centimètres et Pieds

Un plan de travail importé des États-Unis affiche une longueur de **78,5 pouces (`in`)** :

1. **Passage par le mètre** : $78{,}5 \times 0{,}0254 = \mathbf{1{,}9939\,\text{m}}$.
2. **Conversion en centimètres (`cm`)** : $1{,}9939 / 0{,}01 = \mathbf{199{,}39\,\text{cm}}$.
3. **Conversion en pieds (`ft`)** : $1{,}9939 / 0{,}3048 \approx \mathbf{6{,}5417\,\text{pi}}$ (soit 6 pieds et 6,5 pouces).

### 2. Cuisine : 1,5 Tasse Américaine et Four à 375 °F

Une pâtisserie nord-américaine demande **1,5 tasse américaine (`cup`)** de lait et une cuisson à **375 °F** :

1. **Volume en litres puis millilitres** : $1{,}5 \times 0{,}236588 = \mathbf{0{,}354882\,\text{L}}$, soit **354,88 mL** (environ 35,5 cL).
2. **Température en Celsius et Kelvin** : $(375 - 32) \times \frac{5}{9} = 343 \times \frac{5}{9} \approx \mathbf{190{,}56\,°\text{C}}$ (thermostat 6–7), soit $190{,}56 + 273{,}15 = \mathbf{463{,}71\,\text{K}}$.

### 3. Aviation : Bagage de 50 Livres en Kilogrammes

Une franchise soute de **50 livres (`lb`)** représente :

$$M_{\text{kg}} = 50 \times 0{,}45359237 = \mathbf{22{,}6796\,\text{kg}}$$

Une valise pesée à 22,9 kg au départ de Paris, Bruxelles ou Genève respecte la limite habituelle de 23 kg, mais dépasserait le seuil strict de 50 lb sur une correspondance nord-américaine.

## Tableau de Référence des Facteurs de Conversion

Ce barème synthétise les correspondances clés du convertisseur :

| Grandeur | Conversion | Facteur / Formule | Exemple Repère |
| :--- | :--- | :--- | :--- |
| **Longueur** | Pouce (`in`) → Centimètre (`cm`) | × 2,54 (exact) | 15 in = 38,10 cm |
| **Longueur** | Pied (`ft`) → Mètre (`m`) | × 0,3048 (exact) | 10 ft = 3,048 m |
| **Longueur** | Verge (`yd`) → Mètre (`m`) | × 0,9144 (exact) | 100 yd = 91,44 m |
| **Longueur** | Mille terrestre (`mi`) → Kilomètre (`km`) | × 1,609344 (exact) | 100 km = 62,1371 mi |
| **Masse** | Livre (`lb`) → Kilogramme (`kg`) | × 0,45359237 (exact) | 1 kg = 2,20462 lb |
| **Masse** | Once (`oz`) → Gramme (`g`) | × 28,349523 | 8 oz = 226,80 g |
| **Volume US** | Once liquide (`fl oz`) → Millilitre (`mL`) | × 29,5735 | 12 fl oz = 354,88 mL |
| **Volume US** | Tasse (`cup`) → Millilitre (`mL`) | × 236,588 | 2 tasses = 473,18 mL |
| **Volume US** | Gallon (`gal`) → Litre (`L`) | × 3,78541 | 1 L = 0,26417 gal |
| **Température** | Celsius (`°C`) → Fahrenheit (`°F`) | (°C × 1,8) + 32 | 20 °C = 68 °F |

## Pièges Fréquents et Bonnes Pratiques de Mesure

* **Distinguer volumes américains, impériaux et canadiens** : Le convertisseur applique les volumes liquides américains (`gal` = 3,78541 L, `pt` = 473,18 mL, `cup` = 236,59 mL). Au Royaume-Uni, le gallon impérial atteint **4,54609 L** (+20,10 %) et la pinte **568,26 mL**. Au Canada francophone, une tasse métrique culinaire vaut **250 mL** (+5,7 % par rapport à la tasse américaine).
* **Ne pas confondre les trois types d'onces** : L'once courante (`oz`, 28,35 g) diffère de l'once troy réservée aux métaux précieux (**31,1035 g**) et de l'once liquide américaine (`fl oz`, 29,57 mL), qui mesure un volume. Passer d'un volume d'ingrédient à une masse exige toujours de connaître sa masse volumique.
* **Séparer température absolue et écart thermique** : Baisser un four de **20 °C** signifie le réduire de **36 °F** ($20 \times 1{,}8$), jamais de 68 °F. Ajouter $+32$ sur une différence fausse systématiquement le réglage.
* **Différencier mille terrestre et mille marin** : Sur route, 1 mille terrestre vaut **1,609344 km**, alors qu'en aviation et en navigation maritime, le mille marin vaut exactement **1,852 km** (une minute d'arc de méridien).
* **Préserver la précision lors de calculs enchaînés** : Pour des conversions multiples (pouces vers millimètres puis surfaces ou volumes), conservez les facteurs exacts du pivot SI jusqu'au résultat final avant d'arrondir selon la tolérance de votre instrument de mesure.
