---
title: "Équilibrer des Équations Chimiques : Loi de Conservation"
description: "Découvrez pourquoi il faut équilibrer les équations, comment utiliser les coefficients, et utilisez notre calculatrice gratuite."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "balancing-chemical-equations-calculator"
relatedType: "calculator"
faqs:
  - question: "Pourquoi est-il strictement interdit de modifier les indices d'une formule chimique lors de l'équilibrage ?"
    answer: "Les indices indiquent la composition atomique intrinsèque d'une molécule ou d'un cristal. Remplacer H₂O (eau) par H₂O₂ (peroxyde d'hydrogène) ou CO₂ (dioxyde de carbone) par CO (monoxyde de carbone) change totalement la nature chimique et la toxicité de la substance. Seuls les coefficients stœchiométriques placés devant les formules peuvent être ajustés."
  - question: "Quelle est la différence entre un coefficient stœchiométrique entier et un coefficient fractionnaire ?"
    answer: "Un coefficient fractionnaire (comme 13/2 O₂) est mathématiquement exact à l'échelle molaire et reste fréquemment utilisé en thermochimie pour exprimer une enthalpie standard par mole de réactif principal. Toutefois, à l'échelle microscopique des molécules individuelles, une demi-molécule n'existe pas : par convention générale, on multiplie toute l'équation par le dénominateur commun afin d'obtenir les plus petits entiers premiers entre eux."
  - question: "Comment équilibrer une équation d'oxydoréduction (redox) contenant des ions en solution aqueuse ?"
    answer: "Pour une réaction ionique en solution, la conservation des atomes ne suffit pas : il faut aussi conserver la charge électrique totale. En milieu acide, on équilibre l'oxygène avec H₂O et l'hydrogène avec H⁺, puis on égalise les électrons échangés entre les deux demi-réactions avant de les additionner."
  - question: "Comment fonctionne l'algorithme matriciel utilisé par la calculatrice d'équilibrage ?"
    answer: "La calculatrice traduit chaque espèce chimique en vecteur colonne contenant le nombre d'atomes de chaque élément (et la charge électrique le cas échéant). Elle construit une matrice stœchiométrique A et résout le système linéaire homogène A × x = 0 par élimination de Gauss-Jordan pour trouver le noyau (espace nul) et le normaliser aux plus petits entiers positifs."
  - question: "Une équation chimique équilibrée garantit-elle que la réaction se produira spontanément ?"
    answer: "Non. L'équilibrage stœchiométrique décrit uniquement le bilan de conservation entre réactifs et produits si la réaction a lieu. Il ne renseigne ni sur la faisabilité thermodynamique (ΔG < 0), ni sur la vitesse cinétique, ni sur l'existence de réactions parasites ou d'équilibres chimiques incomplets."
---

L'**équilibrage d'une équation chimique** détermine les coefficients stœchiométriques assurant l'égalité exacte du nombre d'atomes de chaque élément — ainsi que de la charge électrique nette — entre les réactifs et les produits. Ce principe traduit la **loi de conservation de la masse** d'Antoine Lavoisier : lors d'une réaction chimique ordinaire, la matière ne se crée ni ne se détruit, seuls les réarrangements de liaisons évoluent.

Pour vérifier vos bilans de stœchiométrie ou résoudre des réactions complexes impliquant des polyatomiques et des ions, utilisez notre [Calculatrice pour Équilibrer les Équations Chimiques](/fr/calculatrices/calculateur-d-equilibrage-d-equations-chimiques). L'outil applique l'algèbre linéaire pour trouver les plus petits coefficients entiers possibles en une fraction de seconde.

## Fondements théoriques : indices, coefficients et algèbre stœchiométrique

Toute écriture chimique distingue deux nombres aux rôles strictement séparés :

- **Les indices (en bas à droite d'un symbole) :** ils définissent la structure moléculaire. Dans `2 H₂SO₄`, l'indice `2` après `H` et l'indice `4` après `O` identifient l'acide sulfurique. Ils restent **immuables** durant l'équilibrage.
- **Les coefficients stœchiométriques (devant la formule) :** ils multiplient toute la formule qui suit. Le coefficient `2` devant `H₂SO₄` compte `4` atomes d'hydrogène, `2` de soufre et `8` d'oxygène.

Pour les réactions ioniques en solution aqueuse `(aq)`, la **conservation de la charge électrique globale** s'impose au même titre que celle des atomes : la somme algébrique des charges des réactifs doit égaler celle des produits.

### Méthode systématique par inspection et par système linéaire

Pour les réactions courantes, suivez cet ordre de priorité :

1. Équilibrez d'abord les **éléments n'apparaissant que dans un réactif et un produit** (`C`, `Fe`, `S`, `N`).
2. Traitez les **ions polyatomiques intacts** (`SO₄²⁻`, `NO₃⁻`, `PO₄³⁻`) comme des blocs unitaires s'ils ne se dissocient pas.
3. Ajustez **l'hydrogène (`H`) puis l'oxygène (`O`)** en dernier.
4. Sur les réactions complexes, placez des inconnues (`a, b, c, d...`) devant chaque espèce et résolvez le système linéaire associé.

## Exemple pratique pas à pas : combustion du butane par méthode algébrique

Équilibrons la combustion complète du butane (`C₄H₁₀`) dans le dioxygène (`O₂`) produisant du dioxyde de carbone (`CO₂`) et de l'eau (`H₂O`) :

```text
a C₄H₁₀ + b O₂  →  c CO₂ + d H₂O
```

### Étape 1 : Poser les équations de conservation

```text
Carbone (C)   : 4a = c
Hydrogène (H) : 10a = 2d   (soit d = 5a)
Oxygène (O)   : 2b = 2c + d
```

### Étape 2 : Résoudre et normaliser aux plus petits entiers

Fixons arbitrairement `a = 1` :

```text
c = 4 × 1 = 4
d = 5 × 1 = 5
2b = 2(4) + 5 = 13   ⇒   b = 13 / 2 = 6,5
```

Multiplions chaque coefficient par `2` pour supprimer la fraction :

```text
2 C₄H₁₀(g) + 13 O₂(g)  →  8 CO₂(g) + 10 H₂O(g)
```

### Étape 3 : Vérification atomique et pondérale

Avec `C = 12,011 g/mol`, `H = 1,008 g/mol` et `O = 15,999 g/mol` :

- **Atomes :** `8 C`, `20 H` et `26 O` de chaque côté (`8 × 2 + 10 × 1 = 26 O`).
- **Masse des réactifs :** `2 × 58,124 + 13 × 31,998 = 116,248 + 415,974 = 532,222 g`.
- **Masse des produits :** `8 × 44,009 + 10 × 18,015 = 352,072 + 180,150 = 532,222 g`.

La conservation de la masse est vérifiée au milligramme près.

## Tableau comparatif des types de réactions et stratégies d'équilibrage

| Type de réaction | Exemple équilibré | Particularité | Stratégie efficace | Piège courant |
|---|---|---|---|---|
| Synthèse | `N₂ + 3 H₂ → 2 NH₃` | Deux corps simples s'unissent | Égaliser l'indice impair | Oublier la diatomie (`H₂`, `N₂`) |
| Décomposition | `2 KClO₃ → 2 KCl + 3 O₂` | Un réactif unique se scinde | PPCM des oxygènes (`2` et `3`) | Altérer les indices du chlorate |
| Combustion d'alcane | `2 C₄H₁₀ + 13 O₂ → 8 CO₂ + 10 H₂O` | Forme `CO₂` et `H₂O` | Ordre `C → H → O`, puis `× 2` | Mal additionner `O` dans `CO₂` + `H₂O` |
| Neutralisation | `H₂SO₄ + 2 NaOH → Na₂SO₄ + 2 H₂O` | Échange de protons `H⁺` | Apparier `H⁺` et `OH⁻` | Scinder l'ion sulfate `SO₄²⁻` |
| Précipitation | `Pb²⁺ + 2 I⁻ → PbI₂(s)` | Formation d'un solide | Vérifier la neutralité nette | Ignorer les charges des ions |
| Oxydoréduction | `MnO₄⁻ + 5 Fe²⁺ + 8 H⁺ → Mn²⁺ + 5 Fe³⁺ + 4 H₂O` | Transfert d'électrons | Demi-réactions + `H⁺`/`H₂O` | Oublier la balance électrique |

## Cas d'usage industriels, erreurs classiques et limites stœchiométriques

### Dimensionnement des procédés et sécurité thermique

En génie chimique, l'équation équilibrée fonde le **bilan matière** : elle identifie le **réactif limitant**, la quantité théorique de produit et le besoin en utilités. Dans les brûleurs industriels et chaudières, le rapport air/combustible stœchiométrique garantit une oxydation complète ; un manque d'oxygène engendre une combustion incomplète libérant du monoxyde de carbone (`CO`), toxique, et des suies.

### Erreurs fréquentes et limites d'interprétation

1. **Corriger une formule plutôt que les réactifs :** si l'équilibrage bloque, vérifiez que vous n'avez pas omis une espèce (comme `H₂O` ou `CO₂`) au lieu de modifier un indice.
2. **Négliger la simplification par le PGCD :** l'écriture `4 H₂ + 2 O₂ → 4 H₂O` doit être divisée par `2` selon la convention IUPAC (`2 H₂ + O₂ → 2 H₂O`).
3. **Confondre stœchiométrie et rendement réel :** une équation équilibrée décrit le bilan maximal à `100 %`, sans préjuger des équilibres réversibles (`⇌`), de la cinétique ni des réactions secondaires.
