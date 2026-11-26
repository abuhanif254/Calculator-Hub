---
title: "Courant Électrique : Le Flux des Électrons"
description: "Découvrez ce qu'est le courant électrique, comment mesurer l'ampérage, les seuils de danger physiologique, le dimensionnement des câbles et utilisez notre Calculatrice de Courant."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "current-calculator"
relatedType: "calculator"
faqs:
  - question: "Pourquoi dit-on que ce sont les ampères qui tuent et non les volts ?"
    answer: "La gravité d'une électrisation dépend directement de l'intensité du courant qui traverse les tissus vitaux (cœur, système nerveux) et de la durée du passage. Selon la norme CEI 60479-1, un courant alternatif de 30 à 50 mA pendant plus d'une seconde suffit à provoquer une fibrillation ventriculaire mortelle. La tension reste toutefois nécessaire pour vaincre l'impédance de la peau et générer ce courant."
  - question: "Quelle est la différence entre le sens conventionnel du courant et le déplacement réel des électrons ?"
    answer: "Historiquement, André-Marie Ampère a défini le courant comme allant de la borne positive (+) vers la borne négative (−) avant la découverte de l'électron. Dans un fil métallique, les électrons (chargés négativement) se déplacent en réalité de la borne négative vers la borne positive, à une vitesse de dérive très lente (quelques dixièmes de millimètre par seconde), bien que l'onde électromagnétique se propage près de la vitesse de la lumière."
  - question: "Quelle est la différence entre un ampère (A) et un ampère-heure (Ah) ?"
    answer: "L'ampère (A) mesure un débit instantané de charges électriques (1 coulomb par seconde), exactement comme des litres par minute pour de l'eau. L'ampère-heure (Ah) mesure une quantité totale de charge stockée (capacité d'une batterie) : une batterie de 10 Ah peut théoriquement délivrer 1 A pendant 10 heures ou 2 A pendant 5 heures."
  - question: "Comment mesurer l'intensité du courant sans court-circuiter le circuit ?"
    answer: "Contrairement au voltmètre, un ampèremètre doit impérativement être inséré en série dans le circuit (en ouvrant le fil pour que tout le courant traverse l'appareil), car sa résistance interne est proche de zéro. Brancher un ampèremètre en parallèle sur une prise ou une batterie crée un court-circuit franc qui fait fondre son fusible interne. Sur les forts courants alternatifs ou continus, une pince ampèremétrique permet une mesure sans contact ni coupure."
  - question: "Pourquoi un appareil consomme-t-il un courant de démarrage bien supérieur à son courant nominal ?"
    answer: "Au moment de la mise sous tension, un moteur électrique à l'arrêt ne génère aucune force contre-électromotrice et se comporte presque comme un court-circuit résistif : son courant d'appel atteint souvent 4 à 8 fois le courant nominal pendant quelques centaines de millisecondes. De même, les alimentations à découpage et les lampes à incandescence provoquent une pointe de courant transitoire pour charger leurs condensateurs ou chauffer le filament."
---

Le **courant électrique** (noté `I` pour *intensité*) correspond au flux ordonné de porteurs de charge — électrons dans les métaux ou ions dans les électrolytes — circulant dans un circuit fermé. Mesuré en **ampères (A)**, il représente la grandeur déterminante pour la sécurité des personnes et le dimensionnement thermique des câbles, fusibles et disjoncteurs.

Notre [Calculatrice de Courant](/fr/calculatrices/calculateur-de-courant) détermine immédiatement l'intensité absorbée à partir de la tension (`U`) et de la résistance (`R`), ou via la puissance (`P`). Maîtriser l'ampérage permet d'éviter les surchauffes, les déclenchements intempestifs et les risques d'incendie électrique.

## Définition physique, régimes et équations clés

L'intensité `I` mesure la quantité de charge `Q` (en coulombs) traversant une section du conducteur par unité de temps `t` (en secondes). Un courant de `1 A` correspond au passage d'environ `6,24 × 10¹⁸` électrons par seconde.

Selon les grandeurs connues, on calcule l'intensité par l'une des relations suivantes :

```text
Définition (charge / temps)               : I = Q / t
Loi d'Ohm (tension et résistance)         : I = U / R
Courant continu (puissance et tension)    : I = P / U
Monophasé AC (avec facteur de puissance)  : I = P / (U × cos φ)
Triphasé AC équilibré                     : I = P / (√3 × U_composée × cos φ)
```

Dans ces expressions, `I` s'exprime en ampères (`A`, ou `1 mA = 0,001 A`), `U` en volts (`V`), `R` en ohms (`Ω`), `P` en watts (`W`) et `cos φ` désigne le facteur de puissance (`1,0` pour une charge purement résistive ; `0,75` à `0,95` pour les moteurs et alimentations).

### Courant continu (DC) et courant alternatif (AC)

En **courant continu (DC)**, le flux conserve un sens et une amplitude stables (batteries, cartes électroniques, solaire). En **courant alternatif (AC)**, le sens s'inverse `50 fois` par seconde en Europe (`50 Hz`). On utilise alors l'**intensité efficace (`I_eff`)**, qui produit le même échauffement par effet Joule qu'un courant continu équivalent.

## Exemple pratique : protection d'un convecteur de 2 400 W sur 230 V

Considérons un convecteur électrique résistif (`cos φ = 1,0`) de `2 400 W` alimenté sur le réseau monophasé français `230 V` (`50 Hz`). Calculons son courant de fonctionnement et la protection adaptée.

**Étape 1 — Résistance équivalente à chaud :**
`R = U² / P = 230² / 2 400 = 52 900 / 2 400 ≈ 22,04 Ω`

**Étape 2 — Intensité efficace permanente :**
`I_eff = U / R = 230 / 22,04 ≈ 10,43 A`
Vérification directe par la puissance : `I_eff = 2 400 / 230 ≈ 10,435 A`.

**Étape 3 — Courant de crête et charge transférée en 1 heure :**
`I_max = I_eff × √2 ≈ 10,435 × 1,4142 ≈ 14,76 A`
En `3 600 s`, la charge transférée atteint `Q = 10,435 × 3 600 = 37 566 C` (`10,435 Ah`).

**Étape 4 — Câble et disjoncteur (NF C 15-100) :**
Pour `10,43 A` permanents, un disjoncteur `16 A` sur câble cuivre `1,5 mm²` convient jusqu'à `3 500 W` en circuit chauffage (ou `20 A` sur `2,5 mm²` jusqu'à `4 500 W`). Un fil de `0,75 mm²` subirait un échauffement dangereux.

## Seuils de courant : sécurité physiologique et calibres domestiques

Ce tableau regroupe les seuils critiques issus de la norme CEI 60479-1 (`50 Hz` alternatif) et les calibres habituels de la norme NF C 15-100.

| Intensité (`I`) | Effet physiologique ou usage technique | Référentiel | Protection / Section cuivre |
| :---: | :--- | :--- | :--- |
| `0,5` à `1 mA` | Seuil de perception tactile (picotement) | CEI 60479-1 | Isolation de base conforme |
| `10 mA` | Seuil de non-lâcher (tétanisation) | Contact main-main | Coupure rapide requise |
| `30 mA` | Risque respiratoire ; seuil des différentiels | NF C 15-100 (DDR) | Déclenchement `< 300 ms` |
| `50` à `75 mA` | Fibrillation ventriculaire (arrêt cardiaque) | Passage `> 1 s` | Danger mortel immédiat |
| `16 A` | Prises (`1,5 mm²` max 8 socles) / éclairage | Disjoncteur `16 A` | Cuivre `1,5 mm²` minimum |
| `20 A` | Prises `2,5 mm²` / circuit spécialisé | Disjoncteur `20 A` | Cuivre `2,5 mm²` dédié |
| `32 A` | Plaques de cuisson / borne de recharge | Disjoncteur `32 A` | Cuivre `6 mm²` dédié |

## Pièges courants et précautions d'ingénierie

Maîtriser le courant impose d'anticiper les phénomènes thermiques et de mesure :

- **L'effet quadratique de la chaleur (`P = R × I²`) :** doubler le courant dans un fil multiplie par **quatre** les pertes thermiques. Une borne mal serrée ou oxydée augmente `R` localement et peut déclencher un incendie bien en dessous du calibre du disjoncteur.
- **L'échauffement des enrouleurs :** un câble enroulé évacue mal la chaleur. Une rallonge donnée pour `3 500 W` déroulée ne supporte souvent que `1 000 W` à `1 200 W` enroulée avant ramollissement de l'isolant.
- **Le rôle réel du fusible :** un disjoncteur protège le câblage contre l'incendie, non les puces électroniques qui grillent en microsecondes. Son calibre doit rester inférieur à la capacité thermique du conducteur le plus fin en aval.
- **Le choix de la pince ampèremétrique :** une pince à transformateur de courant ne lit que l'alternatif (`AC`). Pour mesurer une batterie (`DC`), utilisez une pince à effet Hall (`AC/DC`) autour d'un seul fil, jamais autour de la gaine complète aller-retour.

Complétez votre dimensionnement avec la [Calculatrice de Tension](/fr/calculatrices/calculateur-de-tension) et la [Calculatrice de Résistance](/fr/calculatrices/calculateur-de-resistance).
