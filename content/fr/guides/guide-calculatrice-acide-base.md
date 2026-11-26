---
title: "Calculatrice Acide-Base : Maîtriser la Neutralisation"
description: "Découvrez comment les acides et les bases réagissent, comprenez les formules de titrage, et utilisez notre Calculatrice Acide-Base."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "acid-base-calculator"
faqs:
  - question: "Le pH au point d'équivalence d'un titrage acide-base vaut-il toujours 7,00 ?"
    answer: "Non. Le pH d'équivalence n'est égal à 7,00 (à 25 °C) que lors du titrage d'un acide fort par une base forte (comme HCl par NaOH), car les ions spectateurs ne réagissent pas avec l'eau. Si vous titrez un acide faible par une base forte, la base conjuguée formée hydrolyse l'eau et rend la solution basique à l'équivalence (pH > 7). Inversement, titrer une base faible par un acide fort donne un pH acide (pH < 7)."
  - question: "Pourquoi la formule simple Ma × Va = Mb × Vb échoue-t-elle avec l'acide sulfurique ?"
    answer: "La relation Ma × Va = Mb × Vb suppose une stœchiométrie 1:1 (un proton cédé par molécule d'acide pour un ion hydroxyde accepté par la base). Or l'acide sulfurique (H₂SO₄) est un diacide capable de libérer deux protons par molécule. Il faut donc intégrer les coefficients stœchiométriques : na × Ma × Va = nb × Mb × Vb, avec na = 2 pour H₂SO₄."
  - question: "Comment choisir l'indicateur coloré adapté à une neutralisation ?"
    answer: "La zone de virage de l'indicateur doit encadrer le pH exact du point d'équivalence, idéalement sur la partie la plus verticale de la courbe de titrage. On utilise le bleu de bromothymol (virage 6,0–7,6) pour un titrage fort/fort, la phénolphtaléine (8,2–10,0) pour un acide faible dosé par une base forte, et le rouge de méthyle (4,4–6,2) pour une base faible dosée par un acide fort."
  - question: "Pourquoi faut-il étalonner une solution de soude (NaOH) avant un titrage précis ?"
    answer: "L'hydroxyde de sodium solide est très hygroscopique (il absorbe l'humidité de l'air) et réagit rapidement avec le dioxyde de carbone atmosphérique pour former du carbonate de sodium (carbonatation). Sa masse pesée ne garantit donc jamais sa molarité réelle : il doit être titré au préalable contre un étalon primaire stable comme l'hydrogénophtalate de potassium (KHP)."
  - question: "Faut-il convertir les millilitres en litres dans l'équation de titrage ?"
    answer: "Pour calculer uniquement une molarité ou un volume inconnu via na × Ma × Va = nb × Mb × Vb, vous pouvez laisser Va et Vb en millilitres (mL), à condition impérative d'utiliser la même unité des deux côtés. En revanche, pour calculer une quantité de matière en moles (n = M × V), le volume doit obligatoirement être converti en litres (1 L = 1 000 mL)."
---

Une réaction de neutralisation acide-base repose sur un transfert quantitatif de protons entre un acide et une base pour former de l'eau et un sel dissous. En chimie analytique comme en production industrielle, le **titrage volumétrique** exploite cette stœchiométrie exacte pour mesurer la concentration inconnue d'une solution grâce à un volume précis de réactif titrant étalonné.

Notre [Calculatrice Acide-Base](/fr/calculatrices/calculateur-acide-base) résout immédiatement l'équation d'équivalence, que vous cherchiez la molarité d'un échantillon ou le volume de base ou d'acide requis pour atteindre la neutralisation complète. Maîtriser la stœchiométrie et le pH à l'équivalence prévient les erreurs de dosage et de choix d'indicateur.

## Mécanisme de neutralisation et équation générale de titrage

En solution aqueuse, la neutralisation d'un acide fort par une base forte correspond à la combinaison rapide et totale des ions hydronium et hydroxyde (enthalpie standard voisine de `−57,3 kJ/mol` à 25 °C) :

```text
H₃O⁺(aq) + OH⁻(aq) → 2 H₂O(l)
```

Dès que l'acide ou la base comporte plusieurs fonctions réactives, l'équivalence survient lorsque le nombre d'équivalents acides égale celui des équivalents basiques :

```text
n_a × M_a × V_a = n_b × M_b × V_b
```

On retrouve parfois l'écriture en normalité (`N = n × M`), soit `N_a × V_a = N_b × V_b`.

### Définition des paramètres

- **`M_a` et `M_b` (mol/L)** : molarités de la solution acide et de la solution basique.
- **`V_a` et `V_b` (L ou mL)** : volumes engagés à l'équivalence, exprimés dans la même unité des deux côtés de l'équation.
- **`n_a`** : nombre de protons titrables par molécule d'acide (`1` pour `HCl` ou `CH₃COOH`, `2` pour `H₂SO₄` ou l'acide oxalique `H₂C₂O₄`).
- **`n_b`** : nombre d'équivalents `OH⁻` libérés ou de protons acceptés par unité de base (`1` pour `NaOH` ou `NH₃`, `2` pour `Ca(OH)₂`).

L'équivalence désigne l'égalité stœchiométrique des réactifs introduits, et non obligatoirement la neutralité (`pH = 7,00`). Lorsqu'un acide faible `HA` est dosé par une base forte, la base conjuguée `A⁻` présente à l'équivalence hydrolyse l'eau et place le point d'équivalence en milieu basique (`pH > 7`). À l'inverse, le titrage d'une base faible par un acide fort aboutit à un pH acide (`pH < 7`).

## Exemple chiffré pas à pas : dosage d'un diacide par la soude

Vous contrôlez une solution d'acide sulfurique (`H₂SO₄`, `n_a = 2`) avec une solution étalonnée de soude (`NaOH`, `n_b = 1`) à `M_b = 0,150 mol/L`. Une prise d'essai de `V_a = 25,0 mL` atteint le virage après ajout de `V_b = 32,4 mL` de soude.

**Étape 1 : Écrire la réaction équilibrée**

```text
H₂SO₄(aq) + 2 NaOH(aq) → Na₂SO₄(aq) + 2 H₂O(l)
```

Il faut exactement deux moles de `NaOH` pour neutraliser une mole d'acide sulfurique.

**Étape 2 : Calculer les moles de `NaOH` consommées**

Avec `32,4 mL = 0,0324 L` :

```text
n(NaOH) = 0,150 mol/L × 0,0324 L = 4,86 × 10⁻³ mol (soit 4,86 mmol)
```

**Étape 3 : Déduire la molarité `M_a` de l'acide**

La stœchiométrie `1:2` donne :

```text
n(H₂SO₄) = 4,86 × 10⁻³ / 2 = 2,43 × 10⁻³ mol
M_a = 2,43 × 10⁻³ mol / 0,0250 L = 0,0972 mol/L
```

L'équation directe confirme ce résultat : `2 × M_a × 25,0 = 1 × 0,150 × 32,4`, d'où `M_a = 0,0972 mol/L`. Avec une masse molaire `M(H₂SO₄) = 98,08 g/mol`, la concentration massique correspondante vaut `9,53 g/L`.

## Tableau comparatif des profils de titrage acide-base (à 25 °C)

| Couple titré (exemple) | pH à l'équivalence (25 °C) | Allure du saut de pH | Indicateur coloré adapté (zone de virage) |
| :--- | :--- | :--- | :--- |
| Acide fort + Base forte (`HCl + NaOH`) | `7,00` | Saut ample et vertical (`pH 4–10`) | Bleu de bromothymol (`6,0–7,6`) |
| Acide faible + Base forte (`CH₃COOH + NaOH`) | `~8,73` (sel `0,05 mol/L`) | Zone tampon initiale, saut modéré | Phénolphtaléine (`8,2–10,0`) |
| Acide fort + Base faible (`HCl + NH₃`) | `~5,28` (sel `0,05 mol/L`) | Zone tampon basique, saut acide | Rouge de méthyle (`4,4–6,2`) |
| Diacide fort + Base forte (`H₂SO₄ + NaOH`) | `~7,00` | Saut unique (2e acidité proche) | Bleu de bromothymol (`6,0–7,6`) |
| Polyacide faible + Base forte (`H₃PO₄ + NaOH`) | `4,68` (1er) / `9,78` (2e) | Deux sauts distincts | Hélianthine puis thymolphtaléine |
| Acide faible + Base faible (`CH₃COOH + NH₃`) | `~7,00` | Inflexion très aplatie | pH-métrie ou conductimétrie requise |

## Applications industrielles, erreurs fréquentes et précautions de sécurité

En **œnologie et agroalimentaire**, le titrage acide-base mesure l'acidité titrable des vins, moûts et produits laitiers, déterminante pour la stabilité microbiologique et l'équilibre organoleptique. En **traitement des eaux industrielles**, la neutralisation maintient les effluents dans la fenêtre réglementaire européenne (`pH 5,5` à `8,5`) avant rejet. En **contrôle pharmaceutique**, les dosages acidimétriques et alcalimétriques de la Pharmacopée européenne vérifient la pureté des matières premières.

Quatre écueils fréquents altèrent la fiabilité d'un dosage :

- **Omettre `n_a` ou `n_b`** : appliquer `M_a × V_a = M_b × V_b` à `H₂SO₄` ou `Ca(OH)₂` introduit une erreur systématique d'un facteur 2 (`100 %` d'écart).
- **Choisir un mauvais indicateur** : doser `CH₃COOH` avec de l'hélianthine (virage `3,1–4,4`) déclenche le changement de couleur très tôt avant l'équivalence réelle (`pH ≈ 8,73`).
- **Craindre l'eau de rinçage** : ajouter de l'eau distillée dans l'erlenmeyer pour rincer les parois dilue la prise d'essai mais ne modifie pas le nombre de moles initial d'analyte, donc ne change pas `V_b`.
- **Risque exothermique** : la neutralisation de réactifs concentrés libère une forte chaleur. Travaillez sous hotte aspirante avec lunettes et gants adaptés, et versez toujours l'acide dans l'eau, jamais l'inverse.
