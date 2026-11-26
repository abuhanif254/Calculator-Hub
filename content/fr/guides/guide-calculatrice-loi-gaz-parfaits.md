---
title: "Calculatrice de la Loi des Gaz Parfaits : PV = nRT"
description: "Maîtrisez l'équation d'état PV = nRT : choix de la constante R selon vos unités, calcul détaillé d'un réservoir sous pression, volumes molaires et limites des gaz réels."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "ideal-gas-law-calculator"
faqs:
  - question: "Pourquoi la température doit-elle impérativement être exprimée en kelvins dans PV = nRT ?"
    answer: "L'équation PV = nRT établit une proportionnalité directe entre l'énergie cinétique moyenne des molécules et la température absolue. À 0 °C, les molécules possèdent encore une agitation thermique importante ; utiliser le degré Celsius fausserait totalement le rapport de proportionnalité et provoquerait une division par zéro à 0 °C."
  - question: "Quelle valeur de la constante R faut-il utiliser entre 8,314 et 0,08206 ?"
    answer: "Tout dépend des unités choisies pour la pression et le volume. En unités du Système international (pascals et mètres cubes), utilisez R = 8,31446 J/(mol·K). Si vous travaillez en atmosphères et en litres, employez R = 0,082057 L·atm/(mol·K). Avec des bars et des litres, prenez R = 0,083145 L·bar/(mol·K)."
  - question: "À partir de quelles conditions un gaz réel s'écarte-t-il sensiblement de la loi des gaz parfaits ?"
    answer: "Les écarts dépassent généralement 2 à 5 % lorsque la pression dépasse quelques dizaines de bars (au-delà de 20 à 50 bar selon le gaz) ou lorsque la température s'approche du point de liquéfaction du fluide. Dans ces régimes, le volume propre des molécules et les forces attractives intermoléculaires ne sont plus négligeables."
  - question: "Comment déterminer la masse volumique ou la masse molaire d'un gaz grâce à PV = nRT ?"
    answer: "En remplaçant le nombre de moles n par le rapport m / M (masse sur masse molaire), l'équation devient P × V = (m / M) × R × T. Comme la masse volumique ρ vaut m / V, on obtient directement ρ = (P × M) / (R × T), ce qui permet soit de calculer la densité d'un gaz connu, soit d'identifier sa masse molaire M."
  - question: "Quelle différence existe-t-il entre les conditions normales (CNTP) et les conditions standard (TPN) ?"
    answer: "Les conditions normales de température et de pression (CNTP) historiques correspondent à 0 °C (273,15 K) et 1 atm (101,325 kPa), donnant un volume molaire de 22,414 L/mol. Depuis 1982, l'IUPAC définit les conditions standard (STP) à 0 °C et 1 bar (100 kPa), soit 22,711 L/mol, tandis que les conditions ambiantes standard (SATP) utilisent 25 °C et 1 bar (24,789 L/mol)."
---

La **loi des gaz parfaits**, résumée par l'équation d'état `P × V = n × R × T`, relie de façon univoque quatre grandeurs macroscopiques d'un gaz à l'équilibre : sa pression (`P`), le volume qu'il occupe (`V`), sa quantité de matière (`n`) et sa température thermodynamique absolue (`T`). Synthèse des lois expérimentales de Boyle-Mariotte, Charles, Gay-Lussac et Avogadro formulée au XIXe siècle par Émile Clapeyron, elle constitue l'outil de base pour modéliser le comportement des gaz à pression modérée.

Notre [Calculatrice de la Loi des Gaz Parfaits](/fr/calculatrices/calculateur-de-loi-des-gaz-parfaits) résout cette équation pour n'importe laquelle des quatre variables d'état. Il vous suffit de saisir trois grandeurs connues dans vos unités préférées : l'outil convertit automatiquement la température en kelvins, sélectionne la valeur exacte de la constante universelle `R` et restitue le résultat recherché.

## Fondements théoriques et variables de l'équation d'état

Le modèle du gaz parfait suppose des molécules ponctuelles sans volume propre et dépourvues d'interactions attractives ou répulsives entre les chocs élastiques sur les parois :

```text
Équation d'état : P × V = n × R × T    |  Forme massique : P × M = ρ × R × T
P = (n × R × T) / V  |  V = (n × R × T) / P  |  n = (P × V) / (R × T)  |  T = (P × V) / (n × R)
```

Dans le Système international (SI), chaque grandeur s'exprime précisément ainsi :

- **`P` (Pression absolue, en pascals `Pa`)** : force par unité de surface (`1 bar = 100 000 Pa` ; `1 atm = 101 325 Pa`).
- **`V` (Volume, en mètres cubes `m³`)** : espace intérieur disponible (`1 m³ = 1 000 L`).
- **`n` (Quantité de matière, en moles `mol`)** : égale à `m / M` (masse en grammes divisée par la masse molaire en `g/mol`).
- **`R` (Constante universelle des gaz parfaits)** : fixée à `8,31446 J/(mol·K)` en unités SI.
- **`T` (Température absolue, en kelvins `K`)** : impérativement calculée par `T(K) = T(°C) + 273,15`.

## Exemple chiffré : calcul de pression dans une bouteille de diazote

Prenons une bouteille industrielle en acier de volume interne `V = 50,0 L` (`0,0500 m³`) chargée avec `m = 2,80 kg` (`2 800 g`) de diazote (`N₂`, masse molaire `M = 28,014 g/mol`) stockée dans un atelier à `22,0 °C`. Quelle est la pression absolue à l'intérieur du cylindre ?

1. **Convertir la température en kelvins** : `T = 22,0 + 273,15 = 295,15 K`.
2. **Déterminer la quantité de matière `n`** : `n = 2 800 / 28,014 ≈ 99,95 mol`.
3. **Appliquer l'équation en unités SI** (`R = 8,31446 J/(mol·K)`, `V = 0,0500 m³`) :

```text
P = (99,95 × 8,31446 × 295,15) / 0,0500
P = 245 278,6 / 0,0500 = 4 905 572 Pa ≈ 4,91 MPa
```

En convertissant en unités d'usage courant (`1 bar = 100 000 Pa`), on obtient `49,06 bar` (ou `48,41 atm`). Vérifions ce résultat en utilisant directement des litres et des atmosphères avec `R = 0,082057 L·atm/(mol·K)` : `P = (99,95 × 0,082057 × 295,15) / 50,0 = 2 420,70 / 50,0 ≈ 48,41 atm`. Les deux approches concordent exactement.

## Correspondance des unités et valeurs de la constante `R`

Une source majeure d'erreur consiste à combiner des unités mixtes avec une valeur inadaptée de `R`. Le tableau ci-dessous recense les valeurs exactes de `R` à employer selon votre jeu d'unités :

| Unité de pression (`P`) | Unité de volume (`V`) | Unité d'énergie équivalente | Valeur de la constante `R` | Domaine d'utilisation courant |
| :--- | :--- | :--- | :---: | :--- |
| Pascal (`Pa`) | Mètre cube (`m³`) | Joule (`J`) | `8,31446 J/(mol·K)` | Physique fondamentale, normes SI |
| Kilopascal (`kPa`) | Litre (`L`) | Joule (`J`) | `8,31446 L·kPa/(mol·K)` | Thermodynamique et génie chimique |
| Bar (`bar`) | Litre (`L`) | `100 J` | `0,083145 L·bar/(mol·K)` | Bouteilles de gaz, génie des procédés |
| Atmosphère (`atm`) | Litre (`L`) | `101,325 J` | `0,082057 L·atm/(mol·K)` | Chimie analytique, enseignement |
| Millimètre de mercure (`mmHg`) | Litre (`L`) | `0,13332 J` | `62,364 L·mmHg/(mol·K)` | Techniques du vide, physiologie respiratoire |
| Livre par pouce carré (`psi`) | Pied cube (`ft³`) | `Btu` / travail mécanique | `10,7316 ft³·psi/(lbmol·°R)` | Instrumentation industrielle anglo-saxonne |

À titre de repère rapide, `1 mol` de gaz parfait occupe `22,414 L` aux conditions normales (`0 °C` et `1 atm`), `22,711 L` aux conditions standard IUPAC (`0 °C` et `1 bar`) et `24,789 L` à température ambiante standard (`25 °C` et `1 bar`).

## Applications, pièges fréquents et limites du modèle

La loi des gaz parfaits intervient dans le dimensionnement des réacteurs chimiques (bilan stœchiométrique des gaz dégagés), le calcul de la poussée aérostatique des ballons, la météorologie (variation de la densité de l'air humide avec l'altitude) et l'analyse de sécurité des enceintes confinées exposées à une élévation thermique.

Pour préserver la fiabilité de vos calculs, gardez à l'esprit trois précautions essentielles :

- **Distinguer pression absolue et pression manométrique** : un manomètre industriel indique zéro à l'air libre ; il affiche une pression relative. Vous devez impérativement y additionner la pression atmosphérique locale (environ `1,013 bar` au niveau de la mer) avant d'injecter `P` dans `PV = nRT`.
- **Surveiller la condensabilité** : la formule suppose que la totalité de la substance reste à l'état gazeux. Si la pression partielle d'une vapeur (eau, fluide frigorigène, solvant) dépasse sa pression de vapeur saturante à la température `T`, une fraction condense et `n` diminue.
- **Évaluer les écarts aux hautes pressions** : dans notre exemple à `49 bar`, l'écart réel du diazote reste inférieur à `1 %` à température ambiante, mais à `200–300 bar` (bouteilles de plongée ou stockage d'hydrogène) ou près du point critique, le facteur de compressibilité `Z = PV / (nRT)` s'écarte nettement de `1`. Les ingénieurs basculent alors vers l'équation d'état de **Van der Waals**, de Redlich-Kwong ou de Peng-Robinson pour intégrer le covolume moléculaire et les forces de cohésion.
