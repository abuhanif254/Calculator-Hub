---
title: "Comment Fonctionne la Calculatrice de Demi-Vie (Désintégration Radioactive)"
description: "Comprendre la loi de décroissance exponentielle : formule N(t), constante radioactive λ, vie moyenne τ, exemple chiffré en médecine nucléaire et tableau d'isotopes."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "half-life-calculator"
faqs:
  - question: "La température, la pression ou une réaction chimique modifient-elles la demi-vie d'un isotope ?"
    answer: "Non, pour les modes de désintégration alpha et bêta habituels, la demi-vie physique est une propriété intrinsèque du noyau atomique. Elle reste strictement constante quelles que soient les conditions thermodynamiques ou la molécule dans laquelle l'atome est engagé (à de rarissimes exceptions près pour la capture électronique à ultra-haute pression)."
  - question: "Quelle est la différence entre la demi-vie (t½) et la vie moyenne (τ) ?"
    answer: "La demi-vie t½ désigne le temps nécessaire pour que 50 % des noyaux initiaux se désintègrent. La vie moyenne τ (tau) représente l'espérance statistique de durée de vie d'un noyau individuel avant désintégration et vaut τ = 1 / λ = t½ / ln(2) ≈ 1,4427 × t½."
  - question: "Pourquoi une substance radioactive n'atteint-elle théoriquement jamais zéro ?"
    answer: "La loi N(t) = N₀ × (1/2)^(t / t½) est une exponentielle décroissante asymptotique : chaque intervalle d'une demi-vie divise la quantité restante par deux sans jamais annuler la fonction mathématique. En pratique, au-delà de 10 demi-vies (0,098 % restant), on considère souvent l'activité négligeable ou réduite au niveau du bruit de fond."
  - question: "Quelle est la distinction entre demi-vie physique, biologique et effective en médecine nucléaire ?"
    answer: "La demi-vie physique t½ concerne uniquement la décroissance nucléaire du radionucléide. La demi-vie biologique correspond à l'élimination métabolique du radiopharmaceutique par l'organisme (urine, bile). La demi-vie effective combine les deux mécanismes selon 1 / t_eff = 1 / t_phys + 1 / t_bio et est toujours inférieure à la plus courte des deux."
  - question: "Comment passer du nombre de noyaux N(t) à l'activité mesurée en becquerels (Bq) ?"
    answer: "L'activité A(t), exprimée en becquerels (1 Bq = 1 désintégration par seconde), est directement proportionnelle au nombre de noyaux instables : A(t) = λ × N(t). Comme la constante λ reste fixe pour un isotope donné, le rapport A(t) / A₀ suit exactement la même loi exponentielle que N(t) / N₀."
---

La **demi-vie radioactive** (ou période radioactive, notée `t½`) est le temps nécessaire pour que la moitié des noyaux instables d'un échantillon donné subisse une désintégration nucléaire spontanée. C'est une constante physique propre à chaque radionucléide, indépendante de la quantité initiale, de l'état physique ou de l'environnement chimique.

Une calculatrice de demi-vie résout la loi fondamentale de décroissance exponentielle à partir de trois paramètres connus sur quatre : quantité ou activité initiale (`N₀` ou `A₀`), quantité ou activité restante (`N(t)` ou `A(t)`), temps écoulé (`t`) et période (`t½`). Au bout d'une demi-vie il reste `50 %` de l'isotope, après deux demi-vies `25 %`, après trois `12,5 %`, et ainsi de suite selon une progression géométrique de raison `1/2`.

## Équations de la désintégration exponentielle

La décroissance radioactive repose sur le fait que la probabilité de désintégration par unité de temps est constante pour chaque noyau. On l'exprime sous deux formes mathématiquement équivalentes :

```text
Forme en base 1/2       : N(t) = N₀ × (1/2)^(t / t½)
Forme exponentielle     : N(t) = N₀ × e^(−λ × t)
Constante radioactive λ : λ = ln(2) / t½ ≈ 0,693147 / t½
Vie moyenne τ           : τ = 1 / λ = t½ / ln(2) ≈ 1,4427 × t½
Activité nucléaire A(t) : A(t) = λ × N(t) = A₀ × (1/2)^(t / t½)
```

### Résolution des quatre variables inconnues

Selon l'onglet sélectionné dans l'outil, la calculatrice isole la variable recherchée par inversion logarithmique :

- **Quantité restante (`N(t)`) :** `N(t) = N₀ × (0,5)^(t / t½)`
- **Quantité initiale (`N₀`) :** `N₀ = N(t) × 2^(t / t½)`
- **Temps écoulé (`t`) :** `t = t½ × [ln(N₀ / N(t)) / ln(2)]`
- **Demi-vie (`t½`) :** `t½ = t × [ln(2) / ln(N₀ / N(t))]`

Pour rester cohérent, `t` et `t½` doivent obligatoirement être exprimés dans la même unité (secondes, heures, jours ou années), tandis que `N(t)` et `N₀` partagent la même grandeur (masse en g, moles, nombre d'atomes ou activité en Bq).

## Exemple numérique complet : radiopharmacie à l'Iode-131

Un service de médecine nucléaire reçoit un flacon d'Iode-131 (`¹³¹I`), utilisé pour le traitement des pathologies thyroïdiennes, dont l'activité calibrée à réception est `A₀ = 800 MBq`. La période physique de l'Iode-131 est exactement `t½ = 8,02 jours`.

### Étape 1 : Calculer la constante radioactive `λ`

On convertit la demi-vie en constante de désintégration journalière :

`λ = ln(2) / 8,02 ≈ 0,693147 / 8,02 ≈ 0,086427 jour⁻¹`

### Étape 2 : Déterminer l'activité restante après `t = 12,0 jours`

Calculons d'abord le nombre de demi-vies écoulées :

`n = t / t½ = 12,0 / 8,02 ≈ 1,49626`

Appliquons la formule exponentielle :

`A(12) = 800 × (0,5)^(1,49626) = 800 × e^(−0,086427 × 12,0)`

`A(12) = 800 × e^(−1,03712) ≈ 800 × 0,35447 ≈ 283,6 MBq`

Après `12,0 jours`, il reste donc **`283,6 MBq`**, soit **`35,45 %`** de l'activité initiale.

### Étape 3 : Calculer le délai pour descendre à `100 MBq`

Si le protocole exige d'attendre que l'activité atteigne le seuil de `100 MBq` (`12,5 %` de `800 MBq`), on résout l'équation en `t` :

`t = 8,02 × [ln(800 / 100) / ln(2)] = 8,02 × [ln(8) / ln(2)] = 8,02 × 3 = 24,06 jours`

Ce résultat vérifie exactement l'intuition : passer de `800 MBq` à `100 MBq` représente une division par `8 = 2³`, soit exactement trois demi-vies (`24,06 jours`).

## Tableau de référence des isotopes majeurs

Ce tableau synthétise les constantes nucléaires et les domaines d'utilisation de six isotopes couramment modélisés.

| Isotope | Symbole | Demi-vie (`t½`) | Constante `λ` (approchée) | Mode de désintégration | Application principale |
|---|---|---|---|---|---|
| Technétium-99m | `⁹⁹ᵐTc` | `6,01 heures` | `0,1153 h⁻¹` | Transition isomérique (`γ`) | Scintigraphie médicale (imagerie hospitalière) |
| Iode-131 | `¹³¹I` | `8,02 jours` | `0,0864 j⁻¹` | Bêta moins (`β⁻`) + gamma | Radiothérapie métabolique de la thyroïde |
| Cobalt-60 | `⁶⁰Co` | `5,27 ans` | `0,1315 an⁻¹` | Bêta moins (`β⁻`) + gamma | Radiothérapie externe et stérilisation industrielle |
| Césium-137 | `¹³⁷Cs` | `30,17 ans` | `0,0230 an⁻¹` | Bêta moins (`β⁻`) + gamma | Étalonnage métrologique et suivi radiologique |
| Carbone-14 | `¹⁴C` | `5 730 ans` | `1,210 × 10⁻⁴ an⁻¹` | Bêta moins (`β⁻`) | Datation archéologique (jusqu'à ~50 000 ans) |
| Uranium-238 | `²³⁸U` | `4,468 milliards d'ans` | `1,551 × 10⁻¹⁰ an⁻¹` | Alpha (`α`) | Datation géochronologique des roches terrestres |

## Domaines d'application, limites et précautions réglementaires

### Usages scientifiques, médicaux et industriels

Au-delà de la datation radiométrique (`¹⁴C` pour le bois et les ossements, `⁴⁰K/⁴⁰Ar` et `²³⁸U/²⁰⁶Pb` pour les minéraux), le calcul de demi-vie gouverne la **gestion des déchets radioactifs** (calcul du temps de décroissance avant libération réglementaire, dit « gestion par décroissance » pour les isotopes à vie courte) et la **dosimétrie médicale**. En pharmacocinétique clinique, la même mathématique exponentielle modélise l'élimination plasmatique de nombreux médicaments suivant une cinétique d'ordre 1.

### Précautions méthodologiques et sources d'erreur

1. **Incohérence d'unités temporelles :** si vous saisissez `t½ = 6,01` (en heures) et `t = 2` (en jours) sans convertir `2 jours = 48 heures`, l'exposant calculé est faux d'un facteur 24.
2. **Confusion entre demi-vie physique et effective :** chez un patient, l'activité résiduelle décroît beaucoup plus vite que ne le prédit `t½` seul en raison de l'excrétion biologique.
3. **Limites statistiques à très faible nombre d'atomes :** la loi exponentielle est une loi macroscopique déterministe. Lorsqu'il ne reste que quelques dizaines de noyaux instables, les fluctuations aléatoires de Poisson dominent la mesure.
4. **Corrections de calibration au Carbone-14 :** en archéologie, le ratio brut issu de la formule exponentielle fournit un « âge radiocarbone conventionnel » qui doit ensuite être calibré (courbes IntCal) pour compenser les variations historiques du taux de `¹⁴C` atmosphérique et l'effet réservoir marin.

Effectuez vos projections d'activité et de datation directement avec notre [calculatrice de demi-vie](/fr/calculatrices/calculatrice-de-demi-vie).
