---
title: "Résistance des Câbles : Pourquoi ils Chauffent"
description: "Découvrez comment la longueur, l'épaisseur et le matériau d'un fil affectent sa résistance, et utilisez notre Calculatrice de Résistance de Câble."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "wire-resistance-calculator"
faqs:
  - question: "Comment convertir une jauge américaine AWG en section normalisée en mm² ?"
    answer: "La jauge AWG (American Wire Gauge) suit une échelle logarithmique inversée : plus le chiffre est petit, plus le câble est épais. La formule exacte donne S (mm²) = 0,012668 × 92^((36 − AWG) / 19,5). En pratique européenne, un AWG 14 équivaut à environ 2,08 mm² (on utilise du 2,5 mm²) et un AWG 12 à 3,31 mm² (on utilise du 4 mm²)."
  - question: "Quelle est la chute de tension maximale autorisée par la norme NF C 15-100 ?"
    answer: "En installation domestique alimentée par le réseau public basse tension en France, la norme NF C 15-100 limite la chute de tension maximale entre le point de livraison (disjoncteur de branchement) et l'appareil d'utilisation à 3 % pour les circuits d'éclairage et à 5 % pour les autres usages (prises, chauffage, électroménager)."
  - question: "Pourquoi la résistance d'un câble augmente-t-elle lorsqu'il chauffe ?"
    answer: "Dans les métaux conducteurs comme le cuivre ou l'aluminium, l'élévation de température amplifie l'agitation thermique du réseau cristallin. Les électrons libres subissent davantage de collisions, ce qui accroît la résistivité d'environ 0,39 % par degré Celsius pour le cuivre. Ce phénomène peut créer un emballement thermique si le câble est mal dimensionné ou confiné."
  - question: "Qu'est-ce que l'effet de peau en courant alternatif ?"
    answer: "À mesure que la fréquence du signal augmente ou que la section du câble devient très importante, le champ magnétique alternatif repousse les courants vers la périphérie du conducteur (effet pelliculaire). À 50 Hz dans le cuivre, l'épaisseur de peau atteint environ 9,3 mm : l'effet reste négligeable sur les fils domestiques (1,5 à 16 mm²), mais devient sensible sur les gros jeux de barres industriels."
  - question: "Peut-on remplacer un câble en cuivre par un câble en aluminium de même section ?"
    answer: "Non, pas à section égale. La résistivité de l'aluminium (0,02826 Ω·mm²/m) est environ 64 % plus élevée que celle du cuivre (0,01724 Ω·mm²/m). Pour obtenir la même conductance et éviter la surchauffe, il faut systématiquement passer à une ou deux sections normalisées supérieures en aluminium et utiliser des bornes bimétalliques adaptées."
---

Aucun conducteur métallique courant n'est parfait à température ambiante : tout câble électrique oppose une **résistance** (`R`, mesurée en **ohms, `Ω`**) au passage des électrons. Lorsqu'un courant d'intensité `I` traverse ce câble, cette opposition convertit une partie de l'énergie électrique en chaleur par **effet Joule** (`P = R × I²`) et provoque une **chute de tension** (`ΔU = R × I`) entre la source et l'appareil alimenté.

La résistance d'un conducteur cylindrique dépend de quatre paramètres physiques : la nature du métal (sa résistivité `ρ`), la longueur totale parcourue par le courant (`L`), la section transversale (`S`) et la température de fonctionnement (`T`). Pour dimensionner rapidement un conducteur en millimètres carrés (`mm²`) ou en AWG, utilisez notre [Calculatrice de Résistance de Câble](/fr/calculatrices/calculateur-de-resistance-de-fil).

## Loi de Pouillet, effet Joule et dérive thermique

En courant continu ou en alternatif basse fréquence (`50 Hz`) pour les sections usuelles, la résistance linéique et totale d'un fil obéit à la loi de Pouillet, corrigée par le coefficient thermique du métal :

```text
Loi de Pouillet (à 20 °C) : R₂₀ = ρ₂₀ × (L / S)
Correction thermique      : R(T) = R₂₀ × [1 + α × (T − 20)]
Chute de tension (mono)   : ΔU = R(T) × I   (avec L = 2 × distance aller)
Pertes par effet Joule    : P_J = R(T) × I²

Paramètres standards à 20 °C :
  Cuivre recuit (ETP) : ρ₂₀ = 0,01724 Ω·mm²/m  |  α = 0,00393 °C⁻¹
  Aluminium           : ρ₂₀ = 0,02826 Ω·mm²/m  |  α = 0,00403 °C⁻¹
```

Deux conséquences découlent immédiatement de ces équations. D'une part, la longueur `L` doit compter l'**aller et le retour** du courant en circuit monophasé ou continu (`L = 2 × d`). D'autre part, les pertes thermiques croissent avec le **carré** de l'intensité (`I²`) : doubler le courant dans un même fil multiplie par quatre l'échauffement dissipé dans son isolant.

## Exemple chiffré étape par étape : ligne monophasée de 25 mètres

Supposons que vous alimentiez un atelier situé à `d = 25 m` du tableau électrique (`230 V` monophasé) à l'aide d'un câble en cuivre de section `S = 2,5 mm²` parcouru par un courant de `I = 16 A` (puissance appelée de `3 680 W`).

1. **Longueur totale du conducteur :**
   - En monophasé (phase + neutre), le courant parcourt l'aller et le retour : `L = 2 × 25 = 50 m`.
2. **Résistance électrique à `20 °C` :**
   - `R₂₀ = 0,01724 × (50 / 2,5) = 0,01724 × 20 = 0,3448 Ω`.
3. **Résistance à la température de service (`T = 50 °C`, soit `ΔT = +30 °C`) :**
   - `R₅₀ = 0,3448 × [1 + 0,00393 × 30] = 0,3448 × 1,1179 = 0,3855 Ω`.
4. **Chute de tension en bout de ligne :**
   - `ΔU = 0,3855 × 16 = 6,17 V`.
   - En pourcentage de la tension nominale : `6,17 / 230 = 2,68 %` (conforme à la limite de `5 %` de la norme NF C 15-100 pour un circuit prises).
5. **Puissance perdue en chaleur dans le câble :**
   - `P_J = 0,3855 × 16² = 0,3855 × 256 = 98,69 W`, soit près de `1,97 W` dissipés par mètre de câble double.

Si ce même appareil fonctionnait sous `12 V` continu (installation solaire ou batterie auxiliaire) avec le même courant de `16 A`, la chute de `6,17 V` représenterait `51,4 %` de perte : l'équipement refuserait tout simplement de démarrer.

## Comparatif des sections normalisées et matériaux (à 20 °C)

Le tableau suivant récapitule les résistances linéiques (par kilomètre de conducteur simple) et les calibres de protection courants selon la norme européenne CEI 60228 / NF C 15-100 :

| Matériau et section | Équivalent AWG approx. | Résistivité `ρ₂₀` (`Ω·mm²/m`) | Résistance linéique (`Ω/km`) | Calibre disjoncteur usuel | Puissance max à `230 V` |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Cuivre `1,5 mm²`** | ~AWG 15 | `0,01724` | `11,49 Ω/km` | `16 A` (éclairage / `10 A` conseillé) | `3,68 kW` |
| **Cuivre `2,5 mm²`** | ~AWG 13 | `0,01724` | `6,90 Ω/km` | `20 A` (prises `16 A`) | `4,60 kW` |
| **Cuivre `6,0 mm²`** | ~AWG 9 | `0,01724` | `2,87 Ω/km` | `32 A` (plaque de cuisson) | `7,36 kW` |
| **Cuivre `10,0 mm²`** | ~AWG 7 | `0,01724` | `1,72 Ω/km` | `45 A` (colonne / borne VE) | `10,35 kW` |
| **Aluminium `10,0 mm²`** | ~AWG 7 | `0,02826` | `2,83 Ω/km` | `32 A` (liaison tableau) | `7,36 kW` |
| **Aluminium `16,0 mm²`** | ~AWG 5 | `0,02826` | `1,77 Ω/km` | `45 A` (branchement long) | `10,35 kW` |

## Cas d'usage, erreurs fréquentes et précautions normatives

Au-delà du calcul théorique de résistance, plusieurs phénomènes de terrain gouvernent la sécurité réelle d'une installation :

- **Le piège du touret enroulé :** Une rallonge de `25 m` en `1,5 mm²` déroulée dissipe sans difficulté `1 500 W` dans l'air ambiant. Laissée enroulée sur son tambour, la chaleur produite par effet Joule ne peut s'évacuer : la température grimpe rapidement, ce qui accroît `R(T)`, accélère l'échauffement et finit par faire fondre l'isolant PVC (limité à `70 °C` en régime permanent).
- **Résistance de contact aux bornes :** Une vis de bornier mal serrée introduit une résistance ponctuelle localisée de quelques dixièmes d'ohm. Traversée par `16 A`, une résistance de contact de `0,2 Ω` dégage à elle seule `51,2 W` sur une surface minuscule, cause majeure d'incendies électriques domestiques.
- **Facteur de chute de tension en triphasé :** En triphasé équilibré (`400 V` entre phases), le facteur multiplicatif de distance passe de `2` à `√3 ≈ 1,732` (`ΔU = √3 × ρ × (d / S) × I × cos φ`), ce qui réduit nettement la section nécessaire à puissance transportée égale.
- **Jonctions cuivre-aluminium :** Ne raccordez jamais directement du cuivre et de l'aluminium dans un même bornier sans cosse bimétallique ; l'humidité provoque une corrosion galvanique qui dégrade le contact et fait bondir la résistance locale.
