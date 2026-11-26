---
title: "Comprendre la Densité : Pourquoi la Glace Flotte"
description: "Distinguez masse volumique et densité, maîtrisez la formule ρ = m / V et le principe d'Archimède, et comprenez l'anomalie de la glace avec notre Calculatrice de Densité."
category: "Math & Science"
relatedCalculator: "density-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Quelle est la différence entre la masse volumique et la densité en français ?"
    answer: "En physique francophone, la masse volumique (ρ) est le rapport de la masse sur le volume et possède une unité (kg/m³ ou g/cm³). La densité (d) est un nombre sans unité égal au rapport de la masse volumique du corps sur celle d'un corps de référence (l'eau à 1 000 kg/m³ pour les solides/liquides, ou l'air pour les gaz)."
  - question: "Pourquoi la glace flotte-t-elle sur l'eau alors que la plupart des solides coulent dans leur liquide ?"
    answer: "Lors de la congélation, les molécules d'eau forment des liaisons hydrogène rigides organisées en réseau cristallin hexagonal très espacé. Le volume augmente d'environ 9 % à masse constante, ce qui abaisse la masse volumique de la glace à 917 kg/m³ contre 1 000 kg/m³ pour l'eau liquide : elle flotte donc."
  - question: "Comment convertir rapidement des g/cm³ en kg/m³ ?"
    answer: "Il suffit de multiplier par 1 000. Par exemple, une masse volumique de 2,70 g/cm³ pour l'aluminium correspond exactement à 2 700 kg/m³, et 1 g/cm³ équivaut à 1 kg/L ou 1 000 kg/m³."
  - question: "Quel pourcentage d'un iceberg se trouve caché sous la surface de l'océan ?"
    answer: "D'après le principe d'Archimède, la fraction immergée vaut le rapport ρ_glace / ρ_eau de mer. Avec de la glace à 917 kg/m³ dans une eau salée à 1 025 kg/m³, environ 89,5 % du volume de l'iceberg reste immergé, ne laissant que 10,5 % visibles hors de l'eau."
  - question: "Pourquoi un paquebot en acier de 7 850 kg/m³ flotte-t-il alors qu'un boulon en acier coule ?"
    answer: "Un boulon est plein : sa masse volumique moyenne vaut 7 850 kg/m³, bien au-dessus de l'eau (1 025 kg/m³). Une coque de navire renferme un immense volume d'air, ce qui abaisse la masse volumique globale de l'ensemble (acier + air) bien en dessous de celle de l'eau de mer."
---

Un kilogramme de plumes et un kilogramme de plomb ont exactement la même masse, mais les plumes occupent un volume des centaines de fois plus grand. Cette compacité de la matière est mesurée par la **masse volumique** (`ρ = m / V`), étroitement associée à la **densité** relative (`d`), grandeur sans unité qui compare un matériau à l'eau ou à l'air.

C'est ce rapport entre masse et volume qui détermine pourquoi une pierre coule, pourquoi une montgolfière s'élève et pourquoi la glace flotte sur les rivières en hiver. Utilisez notre [Calculatrice de Densité](/fr/calculatrices/calculateur-de-masse-volumique) pour calculer instantanément l'une des trois variables à partir des deux autres.

## Masse volumique, densité et poussée d'Archimède

Trois formules algébriques gouvernent les calculs de compacité :

```text
ρ = m / V        m = ρ × V        V = m / ρ
```

Définition précise des grandeurs et unités :
- **`ρ` (Masse volumique)** : masse par unité de volume, exprimée en `kg/m³` dans le Système international, ou couramment en `g/cm³` et `kg/L`. Retenez la conversion exacte : **`1 g/cm³ = 1 kg/L = 1 000 kg/m³`**.
- **`m` (Masse)** : quantité de matière en `kg` ou `g` (à distinguer du poids en newtons `N`).
- **`V` (Volume)** : espace occupé en `m³`, litres (`1 m³ = 1 000 L`) ou `cm³` (`1 L = 1 000 cm³`).

La **densité (`d`)** est un nombre sans unité qui rapporte `ρ` à un fluide de référence :

```text
Solides et liquides :  d = ρ_substance / ρ_eau   (ρ_eau = 1 000 kg/m³ à 4 °C)
Gaz                 :  d = ρ_gaz / ρ_air         (ρ_air = 1,292 kg/m³ à 0 °C, 1 atm)
```

D'après le **principe d'Archimède**, un corps plongé dans un fluide subit une poussée verticale égale au poids du volume de fluide déplacé (`F_A = ρ_fluide × V_immergé × g`). Un objet homogène flotte si `ρ_objet < ρ_fluide`, et la part immergée de son volume vaut alors `ρ_objet / ρ_fluide`.

## Pourquoi la glace flotte : l'anomalie dilatométrique de l'eau

Chez la plupart des substances, le solide est plus dense que le liquide et coule au fond. L'eau fait figure d'exception vitale pour la planète.

À l'état liquide, les molécules d'eau (`H₂O`) glissent librement et s'organisent de manière compacte jusqu'à atteindre un maximum de masse volumique de **`999,97 kg/m³` à `3,98 °C`**. En refroidissant jusqu'à `0 °C`, les **liaisons hydrogène** verrouillent les molécules en une structure cristalline hexagonale ouverte et aérée. À masse égale, l'eau gelée occupe environ `9 %` de volume supplémentaire : sa masse volumique chute à **`916,7 kg/m³`** (environ `917 kg/m³`). La glace flotte donc en surface et isole thermiquement les eaux profondes, préservant la vie aquatique sous la banquise.

## Exemple de calcul détaillé : alliage industriel et iceberg

**Partie A : Masse d'un bloc d'aluminium**  
Un bloc plein d'aluminium (`ρ = 2 700 kg/m³`) mesure `40 cm × 25 cm × 10 cm`.
1. Calculer le volume en `m³` : `V = 0,40 × 0,25 × 0,10 = 0,010 m³` (`10 L`).
2. Calculer la masse : `m = 2 700 × 0,010 = 27,0 kg`.

**Partie B : Fraction immergée d'un iceberg en mer**  
Un iceberg d'eau douce (`ρ_glace = 917 kg/m³`) flotte dans une eau de mer de masse volumique `ρ_mer = 1 025 kg/m³` :

```text
Fraction immergée = 917 / 1 025 ≈ 0,8946 → 89,5 % sous la surface
```

Seuls `10,5 %` de la glace restent visibles hors de l'eau (contre `8,3 %` en eau douce pure à `1 000 kg/m³`).

## Tableau de référence des masses volumiques usuelles

Valeurs mesurées aux conditions ambiantes standard (`20 °C`, `101 325 Pa`), sauf mention spécifique.

| Substance / Matériau | État | Masse volumique (`kg/m³`) | Masse volumique (`g/cm³`) | Densité (`d` vs eau) | Comportement dans l'eau pure |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Air sec (20 °C, 1 atm) | Gaz | 1,204 kg/m³ | 0,001204 g/cm³ | 0,0012 | Remonte vers la surface |
| Bois de chêne sec | Solide | 720 kg/m³ | 0,720 g/cm³ | 0,720 | Flotte (72 % immergé) |
| Glace d'eau pure (0 °C) | Solide | 917 kg/m³ | 0,917 g/cm³ | 0,917 | Flotte (91,7 % immergé) |
| Eau pure (4 °C) | Liquide | 1 000 kg/m³ | 1,000 g/cm³ | 1,000 | Référence (équilibre neutre) |
| Eau de mer moyenne | Liquide | 1 025 kg/m³ | 1,025 g/cm³ | 1,025 | Portance accrue (+2,5 %) |
| Aluminium pur | Solide | 2 700 kg/m³ | 2,700 g/cm³ | 2,700 | Coule rapidement |
| Acier de construction | Solide | 7 850 kg/m³ | 7,850 g/cm³ | 7,850 | Coule (sauf coque creuse) |
| Or pur (24 carats) | Solide | 19 300 kg/m³ | 19,300 g/cm³ | 19,300 | Coule (métal très dense) |

## Applications pratiques, pièges d'interprétation et limites de précision

La masse volumique sert au contrôle de pureté en bijouterie par pesée hydrostatique, au calcul de descente de charges dans le bâtiment (béton armé à `2 400–2 500 kg/m³`), à l'architecture navale et au pilotage des **montgolfières** : selon la loi des gaz parfaits (`ρ = (P × M) / (R × T)`), chauffer l'air réduit sa masse volumique par rapport à l'air ambiant et crée la portance.

Trois erreurs classiques faussent fréquemment les mesures :
- **Anglicisme terminologique** : en anglais, *density* désigne la masse volumique (avec unités) et *specific gravity* la densité relative. En français, distinguez strictement `ρ` (`kg/m³`) de `d` (sans unité).
- **Masse volumique réelle vs apparente** : pour le sable, la neige ou une mie de pain, l'air interstitiel réduit la densité globale ; tasser le matériau diminue `V` à `m` constant et augmente `ρ`.
- **Effets de température, pression et salinité** : la dilatation thermique et les sels dissous modifient sensiblement `ρ` ; tout pycnomètre ou densimètre précise donc sa température d'étalonnage (`20 °C` ou `4 °C`).
