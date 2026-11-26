---
title: "Masse vs Poids : Quelle est la Différence ?"
description: "Découvrez pourquoi votre poids change sur la Lune alors que votre masse reste identique, et utilisez notre Calculatrice de Poids."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "weight-calculator"
faqs:
  - question: "Pourquoi les balances domestiques affichent-elles des kilogrammes et non des newtons ?"
    answer: "Une balance ou un pèse-personne mesure en réalité la force exercée par votre poids sur un capteur de contrainte ou un ressort, puis divise automatiquement cette force par l'accélération gravitationnelle terrestre standard (9,80665 m/s²) pour afficher votre masse en kilogrammes. Si vous emportiez un pèse-personne terrestre sur la Lune sans le recalibrer, il indiquerait environ six fois moins de kilogrammes, bien que votre masse réelle soit inchangée."
  - question: "La gravité est-elle exactement identique partout sur Terre ?"
    answer: "Non. En raison de l'aplatissement de la Terre aux pôles, de la force centrifuge liée à sa rotation et des variations d'altitude, l'accélération de la pesanteur varie d'environ 9,780 m/s² à l'équateur à 9,832 m/s² aux pôles, soit un écart d'environ 0,53 %. À Paris (latitude 48,85° N), elle vaut approximativement 9,809 m/s², tandis qu'au sommet du mont Blanc elle diminue légèrement."
  - question: "Quelle est la différence entre masse inerte, masse grave et poids apparent ?"
    answer: "La masse inerte mesure la résistance d'un corps à toute accélération (F = m × a), tandis que la masse grave détermine l'intensité de l'attraction gravitationnelle qu'il subit. Le principe d'équivalence d'Einstein établit leur égalité stricte. Le poids apparent correspond quant à lui à la force de réaction exercée par un support ; en chute libre orbitale (dans l'ISS), le poids réel dû à la gravité vaut encore près de 89 % de sa valeur au sol, mais le poids apparent est nul."
  - question: "Comment varie le poids apparent d'un objet dans un ascenseur en accélération ?"
    answer: "Lorsque l'ascenseur accélère vers le haut avec une accélération a, la force exercée sur le plancher augmente selon P_app = m × (g + a). À l'inverse, lorsqu'il accélère vers le bas, elle diminue selon P_app = m × (g − a). À vitesse constante (a = 0), le poids apparent retrouve exactement sa valeur statique m × g."
  - question: "Comment mesure-t-on la masse d'un astronaute en impesanteur ?"
    answer: "Dans une station spatiale où les balances classiques sont inutilisables, on exploite la masse inerte à l'aide d'un dispositif à ressort oscillant (Body Mass Measurement Device). En mesurant la période T d'oscillation d'un siège monté sur un ressort de raideur connue k, on déduit la masse par la relation m = k × (T / 2π)², indépendamment de toute gravité."
---

Dans le langage courant, « masse » et « poids » sont employés comme des synonymes, alors qu'en physique ils désignent deux grandeurs fondamentalement distinctes. La **masse** (`m`) mesure la quantité de matière d'un corps et son inertie : exprimée en **kilogrammes (kg)**, elle reste strictement identique sur Terre, sur la Lune ou dans l'espace interplanétaire.

Le **poids** (`P`) est au contraire une **force** mécanique, définie comme l'attraction gravitationnelle exercée par un astre sur cette masse. Exprimé en **newtons (N)**, il dépend directement de l'intensité du champ de pesanteur local (`g`). Pour effectuer vos conversions entre masse et force selon n'importe quel astre, utilisez notre [Calculatrice de Poids](/fr/calculatrices/calculateur-de-poids).

## Principes physiques et équation fondamentale du poids

### La masse : une propriété intrinsèque et scalaire

La masse constitue une grandeur scalaire invariante dans le cadre de la mécanique classique. Un bloc d'acier de `50 kg` contient exactement le même nombre d'atomes et oppose la même résistance à la mise en mouvement (inertie) qu'il se trouve au niveau de la mer, à bord d'un avion ou en orbite lunaire. Le kilogramme est l'unité de base de la masse dans le Système international (SI), défini depuis 2019 à partir de la constante de Planck (`h`).

### Le poids : une grandeur vectorielle mesurée en newtons

Le poids résulte de la loi de la gravitation universelle de Newton. Il possède une direction (verticale locale), un sens (vers le centre de l'astre) et une intensité proportionnelle à la masse et à la gravité locale :

```text
Poids (force)       : P = m × g
Accélération locale : g = G × M / R²
Conversion inverse  : m = P / g

Où :
  P = poids en newtons (N), avec 1 N = 1 kg·m/s²
  m = masse en kilogrammes (kg)
  g = accélération de la pesanteur en m/s² (Terre : g₀ = 9,80665 m/s²)
  G = constante gravitationnelle (6,67430 × 10⁻¹¹ N·m²/kg²)
  M = masse de l'astre (kg) et R = distance à son centre (m)
```

Un objet de `1 kg` subit sur Terre un poids d'environ `9,81 N`, soit quasiment `1 décanewton (1 daN = 10 N)`. En ingénierie mécanique et en levage industriel, cette équivalence pratique (`1 daN ≈ 1,02 kgf`) reste courante sur les abaques de charge.

## Exemple chiffré étape par étape : astronaute et équipement

Considérons un astronaute équipé de son scaphandre autonome dont la masse totale est `m = 120 kg`. Calculons son poids sur la Terre, sur la Lune et sur Mars, puis vérifions la conversion inverse à partir d'une mesure de force.

1. **Sur Terre (`g = 9,81 m/s²`) :** `P_Terre = 120 × 9,81 = 1 177,2 N` (`1 176,8 N` avec `g₀ = 9,80665 m/s²`).
2. **Sur la Lune (`g = 1,62 m/s²`) :** `P_Lune = 120 × 1,62 = 194,4 N`, soit `16,5 %` du poids terrestre (`194,4 / 1 177,2 = 0,1651`).
3. **Sur Mars (`g = 3,72 m/s²`) :** `P_Mars = 120 × 3,72 = 446,4 N`, soit `37,9 %` du poids terrestre (`446,4 / 1 177,2 = 0,3792`).
4. **Calcul inverse de la masse :** Si un dynamomètre calibré mesure `735,50 N` au sol (`g₀ = 9,80665 m/s²`), la masse réelle vaut : `m = 735,50 / 9,80665 = 75,00 kg`.

Bien que le poids lunaire de l'astronaute soit divisé par six, sa masse inerte demeure de `120 kg` : il faut toujours fournir exactement la même impulsion horizontale pour l'arrêter s'il se déplace à pleine vitesse.

## Comparatif du poids d'une masse de 75 kg dans le Système solaire

Le tableau ci-dessous compare l'accélération gravitationnelle moyenne en surface (ou au niveau de pression de `1 bar` pour les géantes gazeuses) et le poids résultant pour une personne ou une charge de `75 kg` :

| Astre | Gravité de surface (`g`) | Poids pour `75 kg` (`N`) | Facteur relatif (`Terre = 1,00`) | Particularité physique |
| :--- | :---: | :---: | :---: | :--- |
| **Lune** | `1,62 m/s²` | `121,50 N` | `0,17 g` | Faible gravité, sauts amplifiés |
| **Mercure** | `3,70 m/s²` | `277,50 N` | `0,38 g` | Noyau ferreux très dense |
| **Mars** | `3,72 m/s²` | `279,00 N` | `0,38 g` | Quasi identique à Mercure |
| **Vénus** | `8,87 m/s²` | `665,25 N` | `0,90 g` | Taille et masse proches de la Terre |
| **Terre** | `9,81 m/s²` | `735,75 N` | `1,00 g` | Valeur de référence (`g₀ = 9,80665`) |
| **Saturne** | `10,44 m/s²` | `783,00 N` | `1,06 g` | Faible densité moyenne (`0,687 g/cm³`) |
| **Jupiter** | `24,79 m/s²` | `1 859,25 N` | `2,53 g` | Gravité intense à `1 bar` |

## Applications pratiques, erreurs courantes et limites métrologiques

Distinguer masse et poids est indispensable dans plusieurs disciplines techniques et réglementaires :

- **Génie civil, levage et aéronautique :** Les calculs de résistance des matériaux (câbles, ponts, trains d'atterrissage) s'expriment exclusivement en newtons (`N`) ou kilonewtons (`kN`), et doivent intégrer les facteurs de charge dynamiques (par exemple `2,5 g` en manœuvre aéronautique).
- **Métrologie légale et étalonnage (norme OIML R76) :** Les balances commerciales et de laboratoire de haute précision (classes I et II) doivent être étalonnées sur leur lieu d'utilisation exact à l'aide de masses étalons certifiées, afin de compenser la variation géographique de `g` (environ `0,5 %` entre l'équateur et les pôles) et la poussée d'Archimède de l'air ambiant.
- **Erreurs fréquentes à éviter :**
  1. Exprimer une force ou une contrainte en kilogrammes sans préciser qu'il s'agit du « kilogramme-force » (`1 kgf = 9,80665 N`), unité aujourd'hui obsolète.
  2. Confondre diminution du poids en altitude et impesanteur : à `400 km` d'altitude (orbite de la Station spatiale internationale), la gravité terrestre vaut encore `8,69 m/s²` ; les astronautes flottent non pas par absence de gravité, mais parce qu'ils sont en chute libre permanente autour de la Terre.
  3. Oublier que la valeur `g = 9,81 m/s²` est un arrondi pratique, insuffisant pour des pesées analytiques au milligramme ou des calculs balistiques de précision.
