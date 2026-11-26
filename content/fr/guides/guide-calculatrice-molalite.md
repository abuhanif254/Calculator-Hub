---
title: "Molalité : La Concentration à l'Épreuve de la Température"
description: "Comprenez la molalité (mol/kg de solvant) : formules thermodynamiques, propriétés colligatives (cryoscopie, ébullioscopie), exemple chiffré d'antigel et tableau des solvants."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "molality-calculator"
relatedType: "calculator"
faqs:
  - question: "Pourquoi la molalité reste-t-elle rigoureusement indépendante de la température et de la pression ?"
    answer: "La molalité rapporte la quantité de matière de soluté (en moles) à la masse du solvant pur (en kilogrammes). Contrairement au volume d'un liquide qui se dilate sous l'effet de la chaleur ou se contracte au froid, la masse est une grandeur conservative invariante face aux variations de température et de pression."
  - question: "Quelle est l'erreur la plus fréquente entre masse du solvant et masse totale de la solution ?"
    answer: "Beaucoup d'utilisateurs divisent le nombre de moles par la masse totale du mélange (soluté + solvant), ce qui correspond au titre massique molaire mais pas à la molalité. La définition officielle exige exclusivement la masse du solvant pur en kilogrammes au dénominateur : b = n_soluté / m_solvant."
  - question: "Comment convertir une molarité (mol/L) en molalité (mol/kg) ?"
    answer: "Il est indispensable de connaître la masse volumique ρ (en g/mL) de la solution et la masse molaire M_molaire (en g/mol) du soluté. Pour un litre de solution pesant 1 000 × ρ grammes, la masse de solvant vaut (1 000 × ρ − C × M_molaire) grammes. La formule exacte est donc b = (1 000 × C) / (1 000 × ρ − C × M_molaire)."
  - question: "Dans quel cas la molarité et la molalité ont-elles quasiment la même valeur numérique ?"
    answer: "Dans les solutions aqueuses très diluées (C < 0,01 mol/L) à température ambiante (environ 20 °C), la masse volumique de la solution est proche de 1,00 kg/L et la masse du soluté est négligeable devant celle de l'eau. Un litre de solution contient alors environ 1 kg d'eau, ce qui rend b ≈ C."
  - question: "Pourquoi utilise-t-on le symbole b en plus de m pour noter la molalité ?"
    answer: "La lettre m minuscule désigne déjà simultanément la masse (en physique) et l'unité du mètre (dans le Système international), tandis que M majuscule note la molarité ou la masse molaire. Pour éliminer toute ambiguïté dans les publications scientifiques, l'UICPA (IUPAC) recommande l'usage du symbole b pour la molalité."
---

La **molalité** (notée `b` selon l'IUPAC, ou `m` minuscule) mesure la concentration d'une solution en rapportant le nombre de moles de soluté dissoutes à la **masse du solvant pur** en kilogrammes (`mol/kg` ou `mol·kg⁻¹`). Contrairement à la molarité (`mol/L`), elle ne dépend d'aucune mesure volumétrique.

Cette propriété rend la molalité totalement invariante aux variations de température et de pression : chauffer ou refroidir un mélange en enceinte fermée ne modifie ni les moles de soluté ni la masse de solvant. Pour calculer vos concentrations thermiques ou propriétés colligatives, utilisez notre [calculatrice de molalité](/fr/calculatrices/calculateur-de-molalite).

## Formulation mathématique et propriétés colligatives

En chimie physique, la molalité s'exprime à partir de mesures gravimétriques et gouverne les déplacements de température de changement d'état :

```text
Molalité (définition)          : b = n_soluté / m_solvant
Depuis la masse du soluté      : b = m_soluté / (M_molaire × m_solvant)
Conversion molarité → molalité : b = (1 000 × C) / (1 000 × ρ − C × M_molaire)
Abaissement cryoscopique       : ΔT_cong = K_f × b × i
Élévation ébullioscopique      : ΔT_éb   = K_éb × b × i
```

### Définition exacte des paramètres et unités

- **`b` (ou `m`) — Molalité :** exprimée en `mol/kg` (moles de soluté par kilogramme de solvant pur).
- **`n_soluté` — Quantité de matière dissoute :** en moles (`mol`).
- **`m_solvant` — Masse du solvant pur :** impérativement en kilogrammes (`kg` ; `250 g = 0,250 kg`).
- **`ρ` — Masse volumique de la solution :** en `g/mL`, requise uniquement pour convertir une molarité `C` en molalité.
- **`K_f` et `K_éb` — Constantes cryoscopique et ébullioscopique :** en `°C·kg/mol`, propres à chaque solvant pur.
- **`i` — Facteur de van 't Hoff :** nombre d'espèces dissoutes générées par unité de soluté (`i = 1` pour un non-électrolyte ; `i ≈ 2` pour `NaCl` dilué ; `i ≈ 3` pour `CaCl₂` dilué).

### Pourquoi la masse supplante le volume en thermodynamique

Sur une large plage thermique — par exemple entre `−20 °C` et `+110 °C` dans un circuit caloporteur ou une boucle de refroidissement industriel —, la dilatation thermique du liquide modifie en permanence la molarité (`mol/L`), faussant les équations d'équilibre et les dérivées thermodynamiques. La pesée analytique des constituants élimine totalement cette dérive volumétrique et offre une exactitude métrologique nettement supérieure à la lecture d'un ménisque sur verrerie graduée.

## Exemple numérique complet : abaissement cryoscopique d'un antigel

Un ingénieur prépare un mélange antigel en dissolvant `310,35 g` d'éthylène glycol (`C₂H₆O₂`, `M_molaire = 62,07 g/mol`, `i = 1`) dans `1,25 kg` (`1 250 g`) d'eau déminéralisée (`K_f = 1,86 °C·kg/mol`).

### Étape 1 : Quantité de matière d'éthylène glycol

Divisons la masse de soluté par sa masse molaire :

`n_soluté = 310,35 / 62,07 = 5,000 mol`

### Étape 2 : Calcul de la molalité de la solution

Divisons par la masse d'eau pure en kilogrammes :

`b = 5,000 mol / 1,25 kg = 4,00 mol/kg`

La masse totale du mélange vaut `1 560,35 g`, mais seule la masse du solvant (`1,25 kg`) figure au dénominateur.

### Étape 3 : Abaissement du point de congélation

Appliquons la loi cryoscopique :

`ΔT_cong = 1,86 × 4,00 × 1 = 7,44 °C`

Le point de congélation de l'eau passe de `0,00 °C` à **`−7,44 °C`**. À molalité identique (`4,00 mol/kg`), du chlorure de sodium (`NaCl`, `i ≈ 2` idéal) doublerait théoriquement cet abaissement (`14,88 °C`) du fait de sa dissociation en deux ions.

## Tableau de référence : solvants usuels en cryoscopie et ébullioscopie

Ce tableau répertorie six solvants utilisés pour formuler des fluides thermiques ou déterminer des masses molaires par cryoscopie.

| Solvant | Formule | Masse molaire (`g/mol`) | Fusion (`°C`) | `K_f` (`°C·kg/mol`) | Ébullition (`°C`) | `K_éb` (`°C·kg/mol`) |
|---|---|---|---|---|---|---|
| Eau | `H₂O` | `18,015` | `0,0` | `1,86` | `100,0` | `0,512` |
| Éthanol | `C₂H₅OH` | `46,07` | `−114,1` | `1,99` | `78,4` | `1,22` |
| Acide acétique | `CH₃COOH` | `60,05` | `16,6` | `3,90` | `117,9` | `3,07` |
| Benzène | `C₆H₆` | `78,11` | `5,5` | `5,12` | `80,1` | `2,53` |
| Cyclohexane | `C₆H₁₂` | `84,16` | `6,5` | `20,0` | `80,7` | `2,79` |
| Camphre | `C₁₀H₁₆O` | `152,23` | `178,8` | `37,7` | `207,4` | `5,61` |

Les constantes `K_f` très élevées du cyclohexane (`20,0`) et du camphre (`37,7`, méthode de Rast) permettent de mesurer avec précision la masse molaire d'un composé inconnu à partir d'un faible écart thermique.

## Applications thermodynamiques, précision et pièges courants

### Usages en biologie clinique, génie chimique et électrochimie

En **biologie médicale**, l'état d'hydratation s'évalue par l'**osmolalité plasmatique et urinaire** (`mOsm/kg` d'eau par cryoscopie), plus fiable que l'osmolarité (`mOsm/L`) car insensible au volume occupé par les protéines et lipides du plasma. En **génie des procédés**, la molalité pilote la formulation des saumures frigorifiques et les équilibres liquide-vapeur. En **électrochimie**, les coefficients d'activité ionique (`γ±`) de Debye-Hückel sont tabulés sur l'échelle molale.

### Erreurs fréquentes et limites d'application

1. **Diviser par la masse totale du mélange :** pour `50 g` de sel dans `500 g` d'eau, le dénominateur est `0,500 kg`, jamais `0,550 kg`.
2. **Oublier la conversion en kilogrammes :** saisir `500` au lieu de `0,500` réduit le résultat d'un facteur `1 000`.
3. **Confondre `m` (molalité) et `M` (molarité) :** vérifiez toujours si le protocole exige des `mol/kg` ou des `mol/L`.
4. **Appliquer le facteur `i` idéal aux solutions concentrées :** au-delà de `0,5 mol/kg`, les interactions entre ions forment des paires transitoires qui réduisent `i_effectif` (environ `1,85` au lieu de `2,0` pour `NaCl`).
