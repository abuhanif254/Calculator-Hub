---
title: "Onduleurs : Convertir la Batterie en Courant AC"
description: "Découvrez comment dimensionner un onduleur DC/AC, la différence entre pur sinus et quasi sinus, le rendement énergétique et les courants de batterie."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "inverter-calculator"
relatedType: "calculator"
faqs:
  - question: "Quelle est la différence concrète entre un onduleur pur sinus et un quasi sinus ?"
    answer: "Un onduleur pur sinus génère une onde sinusoïdale de 230 V à 50 Hz identique à celle du réseau public, avec un taux de distorsion harmonique (THD) inférieur à 3 %. Un modèle quasi sinus produit un signal en créneaux par paliers, ce qui fait chauffer les moteurs inductifs, génère des bourdonnements audio et peut endommager les alimentations à découpage."
  - question: "Quelle marge de sécurité prévoir pour dimensionner la puissance d'un onduleur ?"
    answer: "Il est recommandé d'ajouter une marge de 20 % à 25 % au-dessus de la somme des puissances continues simultanées. Cette réserve compense le déclassement thermique en ambiance chaude, les pertes liées au facteur de puissance (cos φ) et évite de solliciter l'électronique en permanence à 100 % de sa capacité nominale."
  - question: "Comment calculer l'intensité en ampères tirée sur une batterie 12 V ou 24 V ?"
    answer: "On divise la puissance alternative délivrée (en watts) par le produit de la tension batterie (en volts) et du rendement de conversion de l'onduleur (souvent 0,85 à 0,92). Par exemple, 1 000 W en sortie AC avec un rendement de 88 % sous 12 V exigent environ 94,7 A en continu sur le parc de batteries."
  - question: "Pourquoi la puissance en VA diffère-t-elle de la puissance en watts (W) ?"
    answer: "Les watts mesurent la puissance active réellement consommée par la charge, tandis que les voltampères (VA) représentent la puissance apparente totale fournie par l'onduleur. Le rapport entre les deux est le facteur de puissance cos(φ) : un moteur ayant un cos(φ) de 0,70 consommant 700 W sollicite en réalité 1 000 VA."
  - question: "Un onduleur consomme-t-il de l'électricité lorsqu'aucun appareil n'est branché ?"
    answer: "Oui, tout onduleur sous tension prélève un courant à vide pour alimenter son électronique interne et maintenir la tension de sortie. Cette autoconsommation varie de 0,4 A à 1,5 A sous 12 V (5 W à 20 W), soit 120 Wh à 480 Wh perdus sur 24 heures sans mode veille (ECO)."
---

Un **onduleur** (convertisseur DC/AC) transforme le courant continu basse tension d'un parc de batteries (`12 V`, `24 V` ou `48 V`) en courant alternatif domestique (`230 V` à `50 Hz` en Europe). Il est indispensable pour alimenter des équipements secteur dans un van aménagé, un bateau ou un site isolé.

Un dimensionnement fiable dépasse la simple addition des watts : vous devez intégrer les pics de démarrage inductifs, le facteur de puissance, le rendement de conversion et l'intensité continue prélevée côté batterie. Notre [Calculatrice d'Onduleur](/fr/calculatrices/calculateur-d-onduleur) automatise ces calculs à partir de vos charges réelles.

## Principes électriques et formules de dimensionnement

L'onduleur hache la tension continue à haute fréquence pour l'élever, puis la restitue sous forme sinusoïdale ou en paliers. En raison des pertes de transformation, la puissance prélevée sur la batterie reste toujours supérieure à la puissance utile en sortie.

```text
Puissance continue requise : P_totale = Σ P_appareils (W)
Puissance nominale cible   : P_onduleur ≥ P_totale × 1,25
Puissance apparente        : S (VA) = P (W) ÷ cos(φ)
Courant continu batterie   : I_DC (A) = P_AC ÷ (V_bat × η)
Chute de tension câblage   : ΔV (V) = (2 × ρ × L × I_DC) ÷ S_câble
```

### Paramètres déterminants

- **Puissance nominale (`W` ou `VA`) :** capacité continue à `25 °C`. Pour une charge inductive de facteur `cos(φ) = 0,8`, un modèle de `1 000 VA` ne délivre que `800 W` actifs.
- **Puissance de crête :** réserve brève (`0,5` à `3 s`) absorbant l'appel au démarrage des compresseurs et pompes (`3` à `5` fois leur puissance nominale).
- **Rendement (`η`) :** compris entre `85 %` et `93 %` selon le taux de charge.
- **Tension système (`V_bat`) :** passer de `12 V` à `24 V` divise le courant `I_DC` par deux et réduit par quatre les pertes par effet Joule (`R × I²`).

## Exemple numérique complet : installation autonome en 12 V

Soit un fourgon doté d'une batterie LiFePO4 `12 V / 200 Ah` (tension minimale en charge retenue : `V_bat = 12,0 V`). Vous alimentez simultanément :

- Réfrigérateur à compression (`230 V`) : `60 W` continus (`300 W` au démarrage) ;
- Chargeur d'ordinateur portable : `90 W` ;
- Bouilloire compacte : `800 W` ;
- Éclairage et routeur mobile : `50 W`.

### Étape 1 : Puissance continue et marge de sécurité

La somme des charges simultanées vaut `P_totale = 60 + 90 + 800 + 50 = 1 000 W`. Avec une marge de `25 %` (`1 000 × 1,25 = 1 250 W`), on choisit un onduleur **pur sinus de `1 500 W` continus** (crête `3 000 W`). Si le compresseur démarre (`300 W`) pendant que la bouilloire, le PC et l'éclairage tournent (`940 W`), l'appel instantané atteint `1 240 W`, bien en deçà des `3 000 W` admissibles.

### Étape 2 : Courant batterie et énergie consommée

Avec un rendement `η = 88 %` (`0,88`) sous `12,0 V`, l'intensité continue maximale vaut :

`I_DC = 1 000 ÷ (12,0 × 0,88) = 1 000 ÷ 10,56 ≈ 94,7 A`

Sur `1 heure` cumulée à ce régime, la batterie fournit `1 000 ÷ 0,88 ≈ 1 136,4 Wh`, soit `88,8 Ah` à `12,8 V`.

### Étape 3 : Câblage et fusible

Sur une distance `L = 1,5 m` (`3 m` aller-retour en cuivre, `ρ = 0,0175 Ω·mm²/m`) avec du `35 mm²`, la chute de tension reste limitée à `ΔV = (2 × 0,0175 × 1,5 × 94,7) ÷ 35 ≈ 0,14 V` (`1,18 %`). Un fusible de `125 A` sécurise le circuit.

## Comparatif des architectures d'onduleurs

| Architecture | Signal (THD) | Tension DC | Plage de puissance | Rendement | Usages adaptés |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Quasi sinus** | Paliers (`THD > 20 %`) | `12 V` | `150 W`–`600 W` | `80 %`–`85 %` | Charges résistives basiques |
| **Pur sinus compact** | Sinusoïde (`THD < 3 %`) | `12 V` | `300 W`–`1 200 W` | `88 %`–`92 %` | Informatique, TV, audio sensible |
| **Pur sinus haute puissance** | Sinusoïde (`THD < 3 %`) | `12 V` | `1 500 W`–`2 000 W` | `86 %`–`91 %` | Van : cafetière, petit outillage |
| **Pur sinus 24 V** | Sinusoïde (`THD < 3 %`) | `24 V` | `2 000 W`–`4 000 W` | `90 %`–`94 %` | Bateaux, poids lourds, chalets |
| **Pur sinus 48 V** | Sinusoïde (`THD < 2 %`) | `48 V` | `3 000 W`–`10 000 W` | `92 %`–`95 %` | Maisons hors réseau, pompes |
| **Onduleur-chargeur hybride** | Sinusoïde + transfert | `24 V`/`48 V` | `3 000`–`8 000 VA` | `91 %`–`94 %` | Secours (UPS), solaire + réseau |

## Erreurs courantes et normes de sécurité

Au-delà de `2 000 W` sous `12 V`, les courants dépassent `180 A` et imposent de basculer en `24 V` ou `48 V` pour éviter l'échauffement des cosses et des câbles surdimensionnés.

Veillez également à éviter trois écueils majeurs :

- **Oublier le déclassement thermique :** dans un coffre confiné à `45 °C`, un onduleur perd `15 %` à `30 %` de sa puissance nominale mesurée à `25 °C`.
- **Négliger la protection différentielle 230 V :** conformément aux normes **NF C 15-100** et **EN 1648**, dès que plusieurs prises sont distribuées, reliez la terre selon le schéma préconisé par le fabricant et installez un disjoncteur différentiel `30 mA` (type A ou B) avec protection divisionnaire.
- **Laisser l'appareil sous tension à vide :** une autoconsommation permanente de `15 W` gaspille `360 Wh` par jour (`≈ 30 Ah` sous `12 V`). Activez le mode ECO ou coupez l'onduleur hors usage.
