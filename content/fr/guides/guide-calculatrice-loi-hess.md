---
title: "Calculatrice de la Loi de Hess : Additionner l'Enthalpie"
description: "Apprenez à combiner des équations thermochimiques selon la loi de Hess (fonction d'état), appliquez les règles d'inversion et de multiplication, et suivez un exemple complet."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "hess-law-calculator"
faqs:
  - question: "Pourquoi la loi de Hess est-elle toujours exacte, quel que soit le chemin réactionnel ?"
    answer: "La loi de Hess découle directement du premier principe de la thermodynamique : l'enthalpie H est une fonction d'état qui ne dépend que de l'état initial et de l'état final du système. Si deux chemins reliant les mêmes réactifs aux mêmes produits avaient des variations d'enthalpie différentes, un cycle fermé créerait ou détruirait de l'énergie, ce qui est physiquement impossible."
  - question: "Que devient ΔH lorsqu'on inverse ou qu'on multiplie une équation chimique ?"
    answer: "L'enthalpie est une grandeur extensive proportionnelle aux quantités de matière mises en jeu. Si vous multipliez tous les coefficients d'une équation par un facteur k, vous devez multiplier ΔH par k. Si vous inversez le sens de la réaction (les produits deviennent les réactifs), le signe de ΔH change simplement d'opposé (+ΔH devient −ΔH)."
  - question: "À quoi sert la loi de Hess quand on connaît déjà les enthalpies de formation ?"
    answer: "La loi de Hess permet justement de déterminer les enthalpies standard de formation qui sont impossibles à mesurer directement au calorimètre, comme la formation du monoxyde de carbone sans sur-oxydation en CO₂ ou la transformation lente du graphite en diamant. Elle est aussi indispensable pour construire les cycles de Born-Haber des cristaux ioniques."
  - question: "Peut-on appliquer la loi de Hess à l'enthalpie libre (ΔG) et à l'entropie (ΔS) ?"
    answer: "Oui. Comme l'enthalpie H, l'entropie S et l'enthalpie libre de Gibbs G sont des fonctions d'état extensives. Les mêmes règles de combinaison linéaire (inversion du signe et multiplication par les coefficients stœchiométriques) s'appliquent exactement à ΔS° et ΔG°, à condition que toutes les réactions combinées soient rapportées à la même température et aux mêmes états standards."
  - question: "Que faire si toutes les équations intermédiaires ne sont pas à la même température ?"
    answer: "Vous ne pouvez pas additionner directement des variations d'enthalpie mesurées à des températures différentes sans correction préalable. Il faut d'abord ramener chaque ΔH à une température commune (généralement 298,15 K) à l'aide de la loi de Kirchhoff et des capacités thermiques molaires C_p des réactifs et des produits."
---

La **loi de Hess**, formulée en 1840 par le chimiste Germain Henri Hess, stipule que la variation d'enthalpie d'une réaction chimique globale est identique que celle-ci se déroule en une seule étape directe ou en une succession d'étapes intermédiaires. Cette propriété résulte du fait que l'enthalpie est une **fonction d'état** : seul l'écart énergétique entre les réactifs initiaux et les produits finaux compte, indépendamment du mécanisme cinétique ou des catalyseurs employés.

Notre [Calculatrice de la Loi de Hess](/fr/calculatrices/calculateur-de-loi-de-hess) additionne vos enthalpies intermédiaires après ajustement stœchiométrique afin d'obtenir la variation d'enthalpie nette (`ΔH_total`) d'une transformation cible. Cette approche algébrique est l'outil privilégié dès qu'une réaction est trop lente, trop violente ou trop impure pour autoriser une mesure calorimétrique directe.

## Règles algébriques de la loi de Hess

Pour combiner plusieurs réactions auxiliaires afin de reconstituer une équation cible, on exploite la linéarité et l'extensivité de la fonction enthalpie selon trois opérations élémentaires :

```text
Additivité des étapes    : ΔH_cible = ΔH₁' + ΔH₂' + ΔH₃' + ...
Règle d'inversion (× −1) : A → B (ΔH)  ⇒  B → A (−ΔH)
Règle de facteur (× k)   : A → B (ΔH)  ⇒  k A → k B (k × ΔH)
```

En pratique, la résolution d'un cycle de Hess suit une méthode systématique en quatre temps :

1. Repérez dans les équations auxiliaires les espèces présentes dans l'équation cible (en choisissant d'abord celles qui n'apparaissent que dans une seule équation).
2. Inversez ou multipliez chaque équation auxiliaire afin que l'espèce cible figure du bon côté (réactif ou produit) avec le coefficient stœchiométrique exact, en appliquant la même transformation à son `ΔH`.
3. Additionnez membre à membre les équations modifiées et vérifiez que toutes les espèces intermédiaires absentes de l'équation cible s'annulent parfaitement (y compris leur état physique).
4. Additionnez les valeurs ajustées de `ΔH` pour obtenir la variation d'enthalpie totale.

## Exemple résolu : synthèse du monoxyde de carbone

Il est pratiquement impossible de mesurer directement l'enthalpie de formation du monoxyde de carbone (`CO`) en brûlant du carbone graphite dans le dioxygène, car il se forme inévitablement un mélange de `CO` et de `CO₂`. On souhaite donc déterminer `ΔH°_cible` à `298,15 K` pour :

`C(graphite) + 1/2 O₂(g) → CO(g)`

Nous disposons de deux combustions complètes faciles à mesurer en bombe calorimétrique :

- **Équation (1)** : `C(graphite) + O₂(g) → CO₂(g)`, avec `ΔH°₁ = −393,51 kJ`
- **Équation (2)** : `CO(g) + 1/2 O₂(g) → CO₂(g)`, avec `ΔH°₂ = −282,98 kJ`

Appliquons les règles algébriques pas à pas :

1. **Positionner `C(graphite)`** : il apparaît déjà à gauche avec le coefficient `1` dans l'équation (1). On conserve (1) inchangée (`× 1`) :
   `C(graphite) + O₂(g) → CO₂(g)` | `ΔH°₁' = −393,51 kJ`
2. **Positionner `CO(g)`** : il figure à gauche dans l'équation (2), alors qu'il doit apparaître à droite dans l'équation cible. On inverse donc (2) (`× −1`), ce qui inverse le signe de `ΔH°₂` :
   `CO₂(g) → CO(g) + 1/2 O₂(g)` | `ΔH°₂' = +282,98 kJ`
3. **Additionner et simplifier** : `CO₂(g)` présent des deux côtés s'annule intégralement, et `1 O₂(g)` à gauche moins `1/2 O₂(g)` à droite laisse `1/2 O₂(g)` à gauche :
   `C(graphite) + 1/2 O₂(g) → CO(g)`
4. **Calculer la somme enthalpique** :
   `ΔH°_cible = −393,51 + (+282,98) = −110,53 kJ/mol`

Le résultat obtenu (`−110,53 kJ/mol`) correspond exactement à l'enthalpie standard de formation tabulée du monoxyde de carbone gazeux.

## Cycles thermochimiques et cas d'usage

Le tableau suivant présente six applications majeures de la loi de Hess en chimie physique, en chimie du solide et en génie chimique.

| Réaction ou cycle étudié | Données auxiliaires combinées | Résultat ΔH° | Intérêt scientifique ou industriel |
| :--- | :--- | :--- | :--- |
| Formation du `CO(g)` | Combustions de `C(gr)` et `CO(g)` | `−110,53 kJ/mol` | Évite la co-production parasite de `CO₂` |
| Transition `C(graphite) → C(diamant)` | Combustions complètes des deux allotropes | `+1,89 kJ/mol` | Mesure d'une transition cinétiquement bloquée |
| Hydratation `CuSO₄(s) + 5 H₂O(l)` | Enthalpies de dissolution des formes anhydre et hydratée | `−78,0 kJ/mol` | Contourne l'impossibilité de mesurer un sel solide mouillé |
| Cycle de Born-Haber du `NaCl(s)` | Sublimation, ionisation, dissociation, affinité, réseau | `−411,1 kJ/mol` | Détermine l'énergie réticulaire des cristaux ioniques |
| Énergie de résonance du benzène | Hydrogénation du cyclohexène (`× 3`) vs benzène | `−150 kJ/mol` (écart) | Quantifie la stabilisation aromatique du cycle |
| Gazéification du charbon `C + H₂O(g)` | Combustions de `C(gr)`, `CO` et `H₂` | `+131,3 kJ/mol` | Dimensionne les gazogènes industriels |

## Limites expérimentales et vigilance méthodologique

Bien que la loi de Hess soit mathématiquement exacte, sa mise en œuvre pratique accumule les incertitudes expérimentales des réactions combinées. Si vous additionnez trois ou quatre réactions mesurées au calorimètre avec une incertitude de `±1,5 kJ/mol` chacune, l'erreur propagée sur la différence finale peut devenir significative, en particulier lorsque le résultat est une petite différence entre deux grands nombres (comme pour la transition graphite-diamant, où `1,89 kJ/mol` résulte de la différence entre `−393,51` et `−395,40 kJ/mol`).

Pour garantir la fiabilité de vos combinaisons thermochimiques, veillez à respecter trois règles de rigueur :

- **Vérifier les états physiques à l'identique** : une espèce ne peut être simplifiée entre les deux membres que si son état (solide, liquide, gazeux ou aqueux) et sa forme cristalline coïncident exactement. Sinon, il faut ajouter l'étape de changement d'état correspondante (fusion, vaporisation ou dissolution).
- **Maintenir une température et une pression uniformes** : toutes les valeurs introduites dans la calculatrice doivent être référencées à la même température (typiquement `298,15 K`) et au même état standard.
- **Contrôler l'annulation complète des intermédiaires** : si une espèce parasite subsiste après sommation, les coefficients multiplicateurs ou le sens d'au moins une équation auxiliaire sont erronés.
