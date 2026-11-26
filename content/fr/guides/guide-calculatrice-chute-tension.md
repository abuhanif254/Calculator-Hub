---
title: "Chute de Tension : Pourquoi les Câbles Longs Perdent de la Puissance"
description: "Calculez la chute de tension en monophasé, triphasé et courant continu selon le matériau (cuivre, aluminium), la section et la distance, conformément à la norme NF C 15-100."
category: "Math & Science"
relatedCalculator: "voltage-drop-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Pourquoi multiplie-t-on la distance par 2 dans la formule de chute de tension en monophasé ?"
    answer: "En courant continu et en monophasé, le courant électrique parcourt deux conducteurs : il part du tableau vers l'appareil par la phase (ou le pôle positif), puis revient au tableau par le neutre (ou le pôle négatif). Pour un câble de 40 mètres, la longueur totale de fil traversée par le courant est donc de 80 mètres."
  - question: "Quelle est la chute de tension maximale autorisée par la norme NF C 15-100 ?"
    answer: "Pour une installation alimentée directement par le réseau public basse tension, la norme NF C 15-100 fixe une limite de 3 % de chute de tension pour les circuits d'éclairage (soit 6,9 V sous 230 V) et de 5 % pour les autres usages comme les prises de courant et le chauffage (soit 11,5 V sous 230 V)."
  - question: "Pourquoi une rallonge trop fine et trop longue peut-elle endommager un moteur électrique ?"
    answer: "Lorsqu'un moteur reçoit 190 V au lieu de 230 V à cause d'une chute de tension excessive, son couple s'effondre et il peine à maintenir sa vitesse. Pour fournir le même travail mécanique, il absorbe davantage de courant (A), ce qui fait surchauffer ses bobinages et le câble lui-même jusqu'à risquer l'incendie."
  - question: "Quelle différence entre le cuivre et l'aluminium pour la chute de tension ?"
    answer: "L'aluminium possède une résistivité environ 1,64 fois plus élevée que celle du cuivre (0,0282 Ω·mm²/m contre 0,0172 Ω·mm²/m à 20 °C). À longueur et courant égaux, un câble en aluminium doit donc présenter une section normalisée supérieure d'un à deux crans pour offrir la même chute de tension qu'un câble en cuivre."
  - question: "Pourquoi les installations en 12 V ou 24 V sont-elles si sensibles à la chute de tension ?"
    answer: "D'une part, pour une même puissance (P = U × I), une tension de 12 V exige près de 19 fois plus d'ampères qu'en 230 V. D'autre part, une perte de seulement 1,2 V représente déjà 10 % de chute relative sous 12 V, contre à peine 0,52 % sous 230 V."
---

Aucun fil conducteur n'est parfait : le cuivre comme l'aluminium opposent une résistance électrique proportionnelle à la distance et inversement proportionnelle à la section. Sur un câble de grande longueur, cette résistance provoque une baisse de tension mesurable à l'extrémité de la ligne, appelée **chute de tension** (`ΔU`), accompagnée d'une perte thermique (`ΔP = R × I²`).

Lorsque cette perte est trop importante, un moteur peine à démarrer, surchauffe en tirant plus d'intensité et risque de dégrader l'isolant du câble. Utilisez notre [Calculatrice de Chute de Tension](/fr/calculatrices/calculateur-de-chute-de-tension) pour dimensionner exactement la section nécessaire avant de tirer une ligne.

## Physique de la chute de tension et formules exactes

D'après la loi de Pouillet (`R = ρ × L_totale / S`) et la loi d'Ohm (`ΔU = R × I`), la chute de tension absolue (`V`) et relative (`%`) s'obtiennent ainsi :

```text
Monophasé / Courant Continu :  ΔU = (2 × L × I × ρ × cos φ) / S
Triphasé équilibré (400 V)  :  ΔU = (√3 × L × I × ρ × cos φ) / S
Chute relative (%)          :  ΔU (%) = (ΔU / U_nominale) × 100
```

Définition exacte des paramètres :
- **`L` (Distance simple)** : longueur du câble entre la source et le récepteur, en mètres (`m`). Le facteur `2` en monophasé/CC compte l'aller par la phase et le retour par le neutre.
- **`I` (Intensité)** : courant appelé par la charge en ampères (`A`).
- **`S` (Section)** : aire conductrice du câble en millimètres carrés (`mm²`).
- **`ρ` (Résistivité)** : à `20 °C`, le cuivre vaut `0,0172 Ω·mm²/m` et l'aluminium `0,0282 Ω·mm²/m`. En régime de charge (`70 °C`), la norme NF C 15-100 retient **`ρ = 0,0225 Ω·mm²/m` pour le cuivre** et **`ρ = 0,036 Ω·mm²/m` pour l'aluminium**.
- **`cos(φ)`** : facteur de puissance (`1` en CC ou charge résistive ; pour les sections `> 16 mm²`, on intègre aussi la réactance linéique `λ ≈ 0,08 mΩ/m`).

## Exemple de calcul détaillé : alimenter un atelier à 45 mètres

Calculons la chute de tension pour alimenter un atelier situé à `L = 45 m` sous `230 V` monophasé avec `I = 16 A` (`3 680 W`, `cos φ = 1`) et un câble en cuivre en charge (`ρ = 0,0225 Ω·mm²/m`).

**Cas 1 : Câble de section `S = 1,5 mm²`**

```text
ΔU = (2 × 45 × 16 × 0,0225) / 1,5 = 32,4 / 1,5 = 21,60 V
ΔU (%) = (21,60 / 230) × 100 = 9,39 %
```

Il n'arrive plus que `208,4 V` au bout du câble, bien au-delà de la limite de `5 %`, et le fil dissipe inutilement `21,60 × 16 = 345,6 W` en chaleur.

**Cas 2 : Section intermédiaire `S = 4 mm²`**

```text
ΔU = 32,4 / 4 = 8,10 V      →      ΔU (%) = (8,10 / 230) × 100 = 3,52 %
```

Conforme pour des prises de courant (`≤ 5 %`), mais trop élevé si un circuit d'éclairage (`≤ 3 %`) dépend de cette ligne.

**Cas 3 : Section recommandée `S = 6 mm²`**

```text
ΔU = 32,4 / 6 = 5,40 V      →      ΔU (%) = (5,40 / 230) × 100 = 2,35 %
```

La perte tombe sous les `3 %` (compatible tous usages) et la dissipation thermique dans le câble est divisée par quatre (`86,4 W`).

## Tableau comparatif par section de câble (cuivre, 230 V, 16 A)

Ce référentiel compare les sections normalisées en cuivre (`ρ = 0,0225 Ω·mm²/m`) pour une charge monophasée de `16 A` sous `230 V`.

| Section (`S`) | Résistance A/R (50 m) | Chute à 25 m (`ΔU` / `%`) | Chute à 50 m (`ΔU` / `%`) | Verdict normatif à 16 A (NF C 15-100) |
| :--- | :--- | :--- | :--- | :--- |
| 1,5 mm² | 1,50 Ω | 12,00 V (5,22 %) | 24,00 V (10,43 %) | Non conforme sur ces longueurs |
| 2,5 mm² | 0,90 Ω | 7,20 V (3,13 %) | 14,40 V (6,26 %) | Prises ≤ 39 m (éclairage ≤ 23 m) |
| 4 mm² | 0,56 Ω | 4,50 V (1,96 %) | 9,00 V (3,91 %) | Prises ≤ 63 m |
| 6 mm² | 0,38 Ω | 3,00 V (1,30 %) | 6,00 V (2,61 %) | Éclairage et borne IRVE ≤ 57 m |
| 10 mm² | 0,23 Ω | 1,80 V (0,78 %) | 3,60 V (1,57 %) | Liaison tableau divisionnaire |
| 16 mm² | 0,14 Ω | 1,13 V (0,49 %) | 2,25 V (0,98 %) | Très longues portées / forte puissance |

## Applications, risques électriques et exigences normatives

Ce calcul s'impose dès qu'une ligne excède 20 mètres ou transporte un fort courant : dépendance extérieure, pompe de forage, borne de recharge VE (IRVE) ou installation solaire `12 V` / `24 V` / `48 V` (très sensible car l'intensité y est élevée pour une faible tension). Sur le réseau public, le transport en haute tension (`225 000 V` ou `400 000 V`) repose sur le même principe : élever `U` réduit `I` et divise drastiquement les pertes `R × I²`.

Trois erreurs critiques sont à proscrire sur le terrain :
- **Laisser une rallonge enroulée sur tambour** : même si vous n'utilisez que `5 m` sur `25 m`, le courant traverse toute la bobine. Les spires serrées empêchent l'évacuation de la chaleur, font fondre l'isolant et déclenchent un incendie.
- **Sous-estimer l'échauffement du conducteur** : calculer avec `ρ` à `20 °C` (`0,0172`) sous-estime la chute réelle d'environ `24 %` par rapport à la valeur en charge (`0,0225`).
- **Confondre tenue thermique et chute de tension** : un câble de `2,5 mm²` supporte `20 A` sur `5 m` sans fondre, mais perd près de `9,4 %` sur `60 m`. En France, la norme **NF C 15-100** impose de vérifier conjointement la limite de chute de tension (`3 %` éclairage, `5 %` autres usages depuis l'origine) et le calibre du disjoncteur de protection.
