---
title: "Comprendre la Tension : La Pression de l'Électricité"
description: "Découvrez ce qu'est la tension électrique (en volts), comment la différence de potentiel alimente vos appareils, calculez les chutes de tension et utilisez notre Calculatrice de Tension."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "voltage-calculator"
relatedType: "calculator"
faqs:
  - question: "Quelle est la différence entre la tension nominale, la tension à vide et la tension en charge ?"
    answer: "La tension à vide (ou force électromotrice E) est mesurée aux bornes d'une source lorsqu'aucun courant ne circule. Dès qu'une charge est branchée, la résistance interne r de la pile ou du transformateur crée une chute interne r × I : la tension en charge U = E − (r × I) diminue donc. La tension nominale désigne la valeur de référence moyenne indiquée par le fabricant (par exemple 1,5 V pour une pile alcaline ou 230 V pour le réseau européen)."
  - question: "Pourquoi parle-t-on de 230 V efficace en France alors que l'amplitude maximale dépasse 325 V ?"
    answer: "Le réseau domestique français délivre une tension alternative sinusoïdale de fréquence 50 Hz. La valeur 230 V correspond à la tension efficace (RMS), c'est-à-dire la tension continue équivalente qui dissiperait la même puissance moyenne dans une résistance. L'amplitude crête atteint U_max = 230 × √2 ≈ 325,3 V, ce qui signifie que l'isolation des câbles et composants doit supporter au moins cette tension de crête."
  - question: "Une haute tension est-elle toujours mortelle au toucher ?"
    answer: "Le danger physiologique dépend du courant qui traverse réellement le corps humain et de sa durée. Une décharge électrostatique sur une poignée de porte atteint souvent 10 000 à 20 000 V, mais la quantité d'énergie stockée est infime et dure quelques nanosecondes. En revanche, sur une source capable de maintenir sa tension (réseau secteur ou batterie haute tension), une tension supérieure au seuil de sécurité (50 V AC ou 120 V DC en milieu sec selon la norme CEI) suffit à faire circuler un courant potentiellement mortel à travers la peau."
  - question: "Comment mesurer correctement une tension avec un multimètre sans endommager l'appareil ?"
    answer: "Un voltmètre se branche toujours en parallèle aux bornes du composant ou de la source à mesurer, jamais en série. Sélectionnez le calibre DC (V continu) ou AC (V alternatif) supérieur à la tension attendue. L'impédance d'entrée élevée d'un multimètre numérique (généralement 10 MΩ) garantit qu'il ne perturbe pratiquement pas le circuit testé."
  - question: "Pourquoi la chute de tension est-elle plus critique en 12 V ou 24 V qu'en 230 V ?"
    answer: "À puissance égale, diviser la tension par dix multiplie le courant par dix (I = P / U). Or la chute de tension en ligne ΔU = R_fil × I augmente proportionnellement au courant, et sa part relative (ΔU / U) devient cent fois plus sensible à basse tension. Une perte de 2 V est anodine sur du 230 V (0,87 %), mais catastrophique sur un circuit 12 V (16,7 %)."
---

La **tension électrique** (notée `U` en Europe ou `V` dans les pays anglophones) mesure la différence de potentiel électrique entre deux points d'un circuit, en **volts (V)**. Elle correspond à l'énergie potentielle disponible par unité de charge pour mettre les électrons en mouvement : sans différence de potentiel, aucun courant durable ne s'établit dans un conducteur.

Notre [Calculatrice de Tension](/fr/calculatrices/calculateur-de-tension) détermine instantanément la tension aux bornes d'un dipôle à partir du courant (`I`) et de la résistance (`R`), ou via la puissance (`P`). Que vous dimensionniez une alimentation, un capteur analogique ou une liaison solaire, maîtriser la tension garantit la compatibilité et la sécurité du montage.

## Différence de potentiel et formules de calcul

Une batterie ou un alternateur ne crée pas d'électrons : il maintient un déséquilibre de charges entre une borne négative (excès d'électrons) et une borne positive (déficit). La tension entre deux points `A` et `B` mesure le travail nécessaire pour déplacer `1 coulomb` entre ces deux potentiels.

Dans la pratique, la tension se calcule à l'aide des relations suivantes :

```text
Loi d'Ohm (courant et résistance)       : U = R × I
À partir de la puissance et du courant  : U = P / I
À partir de la puissance et résistance  : U = √(P × R)
Tension en charge d'un générateur       : U = E − (r_interne × I)
Chute de tension en ligne (2 fils DC)   : ΔU = (ρ × 2 × L / S) × I
```

Où `U` est la tension en volts (`V`), `E` la force électromotrice à vide, `I` le courant en ampères (`A`), `R` la résistance en ohms (`Ω`), `ρ` la résistivité du cuivre (`0,0172 Ω·mm²/m` à `20 °C`), `L` la longueur simple en mètres (`m`) et `S` la section en `mm²`.

### Tension continue (DC) vs tension alternative (AC)

En **courant continu (DC)**, la polarité et l'amplitude restent constantes dans le temps (piles, batteries, ports USB `5 V`, panneaux photovoltaïques). En **courant alternatif (AC)**, la polarité s'inverse périodiquement — `50 fois` par seconde (`50 Hz`) sur le réseau européen `230 V` efficace entre phase et neutre, et `400 V` entre phases en triphasé. Ce régime permet aux transformateurs d'élever facilement la tension pour transporter l'énergie à longue distance avec peu de pertes.

## Exemple chiffré : chute de tension sur une ligne 24 V

Sur les installations en très basse tension (solaire, camping-car, éclairage extérieur), la résistance des câbles provoque souvent une perte sous-estimée. Prenons un projecteur LED de `24,0 V` continu consommant `5,0 A`, relié à une batterie par un câble cuivre de `35 m` (`70 m` aller-retour) en section `1,5 mm²`.

**Étape 1 — Résistance totale des deux conducteurs :**
`R_fil = 0,0172 × (2 × 35) / 1,5 = 1,204 / 1,5 ≈ 0,803 Ω`

**Étape 2 — Chute de tension en ligne :**
`ΔU = R_fil × I = 0,803 × 5,0 ≈ 4,01 V`

**Étape 3 — Tension utile aux bornes du projecteur :**
`U_charge = 24,0 − 4,01 = 19,99 V`
La perte atteint `16,7 %` (contre `3 %` à `5 %` recommandés par la norme NF C 15-100), et `20,1 W` sont dissipés en chaleur dans le câble.

**Étape 4 — Correction avec une section de `4 mm²` :**
`R_fil_4mm = 0,0172 × 70 / 4 = 0,301 Ω`
`ΔU_4mm = 0,301 × 5,0 = 1,505 V` (`6,3 %`), soit `22,50 V` utiles. Pour descendre sous `3 %` (`0,72 V`), une section de `10 mm²` est nécessaire (`ΔU ≈ 0,60 V`).

## Domaines de tension normalisés (CEI 60038 / NF C 15-100)

Les normes classent les tensions selon le niveau de risque d'électrisation et les exigences d'isolation des matériels.

| Domaine / Niveau | Tension nominale | Régime | Usages typiques | Exigence de sécurité (milieu sec) |
| :--- | :---: | :---: | :--- | :--- |
| Logique / Microélectronique | `1,8 V` à `5,0 V` | Continu (DC) | Processeurs, USB, capteurs | Aucun risque d'électrisation |
| Très Basse Tension (TBTS) | `12 V` à `48 V` | DC / AC | Automobile, solaire, PoE (`48 V`) | Sûr jusqu'à `50 V` AC / `120 V` DC |
| Basse Tension A (BTA) | `230 V` / `400 V` | Alternatif (AC) | Prises domestiques, ateliers | DDR `30 mA` et mise à la terre |
| Traction / Véhicules EV | `400 V` à `1 500 V` | Continu (DC) | Batteries VE, photovoltaïque | Isolation renforcée, verrouillage |
| Haute Tension A (HTA) | `15 kV` à `20 kV` | Alternatif (AC) | Distribution publique Enedis | Postes de transformation verrouillés |
| Haute Tension B (HTB) | `63 kV` à `400 kV` | Alternatif (AC) | Transport national RTE | Distances d'isolement de plusieurs mètres |

## Erreurs courantes et précautions de mesure

Plusieurs pièges récurrents faussent les diagnostics ou endommagent les montages :

- **Confondre tension à vide et tension en charge :** une pile usée peut afficher `1,45 V` à vide puis chuter sous `0,8 V` dès qu'un appareil tire du courant, à cause de sa résistance interne élevée. Testez toujours une source en charge.
- **Mesurer une tension fantôme :** l'impédance de `10 MΩ` d'un multimètre numérique capte les couplages capacitifs entre fils voisins et peut afficher `30 V` à `90 V` sur un conducteur déconnecté. Utilisez le mode basse impédance (`LoZ`) pour lever le doute.
- **Sous-dimensionner l'isolation des composants :** un condensateur `16 V` sur un rail `12 V` soumis à des pointes inductives risque le claquage. Gardez une marge de `30 %` à `50 %` au-dessus de la tension crête attendue.
- **Inverser la polarité en courant continu :** sans diode ou MOSFET de protection, inverser `+` et `−` détruit quasi instantanément les circuits intégrés et condensateurs électrolytiques.

Pour vérifier les grandeurs associées, complétez vos calculs avec la [Calculatrice de Courant](/fr/calculatrices/calculateur-de-courant) et la [Calculatrice de Résistance](/fr/calculatrices/calculateur-de-resistance).
