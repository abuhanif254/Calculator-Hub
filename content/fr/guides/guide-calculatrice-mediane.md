---
title: "Comment Trouver la Médiane : Un Guide Complet des Moyennes"
description: "Apprenez à calculer la médiane pour un effectif pair ou impair, mesurez la dispersion avec les quartiles (Q1, Q3, IQR) et comprenez pourquoi la médiane surpasse la moyenne face aux valeurs aberrantes."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "median-calculator"
relatedType: "calculator"
faqs:
  - question: "Pourquoi la médiane est-elle préférée à la moyenne pour les salaires et l'immobilier ?"
    answer: "Les distributions de revenus et de prix immobiliers sont fortement asymétriques vers le haut : quelques très hauts revenus ou biens d'exception tirent la moyenne arithmétique artificiellement vers le haut. La médiane, insensible aux valeurs extrêmes, indique le seuil exact où 50 % des observations se situent au-dessous et 50 % au-dessus."
  - question: "Comment calcule-t-on la médiane lorsque la série contient un nombre pair de valeurs ?"
    answer: "Après avoir trié les n données par ordre croissant, il n'existe pas d'élément central unique mais deux valeurs centrales aux rangs n/2 et (n/2) + 1. La médiane correspond à la moyenne arithmétique de ces deux valeurs centrales : Me = (x_(n/2) + x_(n/2 + 1)) / 2."
  - question: "La médiane doit-elle nécessairement figurer parmi les valeurs observées ?"
    answer: "Si l'effectif n est impair, la médiane est toujours l'une des valeurs réelles de la série. En revanche, si n est pair, la demi-somme des deux valeurs centrales peut produire un nombre intermédiaire absent du jeu de données initial (par exemple 2 750 € entre 2 700 € et 2 800 €)."
  - question: "Que deviennent la médiane et l'écart interquartile lorsqu'on ajoute une valeur aberrante ?"
    answer: "Ajouter une valeur extrême (par exemple multiplier le plus haut salaire par dix) ne déplace la médiane que d'un demi-rang vers le haut et laisse sa valeur quasiment inchangée, tandis que l'écart interquartile (Q3 − Q1) reste borné au cœur des 50 % centraux. On dit que ces indicateurs possèdent un point de rupture élevé (statistique robuste)."
  - question: "Comment la médiane se relie-t-elle aux quartiles et aux boîtes à moustaches ?"
    answer: "La médiane correspond au deuxième quartile (Q2), soit le 50e centile. Elle divise la série ordonnée en deux moitiés égales dont les médianes respectives définissent le premier quartile Q1 (25e centile) et le troisième quartile Q3 (75e centile), formant le rectangle central d'une boîte à moustaches (boxplot)."
---

La **médiane** (notée `Me` ou `Q₂`) est la valeur centrale qui partage une série statistique ordonnée en deux moitiés d'effectif égal : `50 %` des observations lui sont inférieures ou égales, et `50 %` lui sont supérieures ou égales. Contrairement à la moyenne arithmétique, elle ne dépend que du classement des données et reste insensible aux valeurs extrêmes.

Notre [Calculatrice de Médiane](/fr/calculatrices/calculatrice-de-mediane) trie automatiquement vos séries, détecte la parité de l'échantillon et affiche la médiane, le minimum, le maximum et le nombre d'observations. Ce guide présente les formules exactes selon la parité, l'usage des quartiles, un exemple salarial chiffré en euros et les biais à éviter.

## Définition, formules et statistiques robustes

Avant tout calcul, la série brute de `n` valeurs doit être triée par ordre croissant : `x₍₁₎ ≤ x₍₂₎ ≤ ... ≤ x₍ₙ₎`.

```text
Effectif impair : Me = x_((n + 1) / 2)
Effectif pair   : Me = [x_(n/2) + x_((n/2) + 1)] / 2
Écart interquartile : IQR = Q₃ − Q₁
Valeurs aberrantes (Tukey) : x < Q₁ − 1,5 × IQR  ou  x > Q₃ + 1,5 × IQR
```

La résistance d'un indicateur aux anomalies se mesure par son **point de rupture**. Une seule valeur extrême suffit à faire diverger la moyenne arithmétique (point de rupture `0 %`), alors que la médiane reste stable jusqu'à près de `50 %` d'observations aberrantes.

Pour décrire également la dispersion, on associe la médiane au premier quartile `Q₁` (`25e` centile) et au troisième quartile `Q₃` (`75e` centile). L'écart interquartile `IQR = Q₃ − Q₁` mesure l'étendue des `50 %` centraux. En outre, comparer la moyenne (`x̄`) et la médiane (`Me`) révèle l'asymétrie : si `x̄ > Me`, la distribution s'étire vers les hautes valeurs ; si `x̄ < Me`, elle s'étire vers les basses valeurs.

## Exemple chiffré : salaires mensuels nets dans une PME

Relevons les salaires mensuels nets de `7` salariés dans le désordre : `2 900 €`, `2 100 €`, `12 300 €`, `2 500 €`, `2 350 €`, `3 150 €`, `2 700 €`.

### Cas 1 : effectif impair (`n = 7`)

1. **Tri croissant :** `[2 100 ; 2 350 ; 2 500 ; 2 700 ; 2 900 ; 3 150 ; 12 300]`.
2. **Rang médian :** `(7 + 1) / 2 = 4ᵉ` position.
3. **Médiane :** `Me = 2 700 €` (`3` salaires au-dessous, `3` au-dessus).
4. **Contraste avec la moyenne :** la masse salariale vaut `28 000 €`, soit une moyenne de `28 000 / 7 = 4 000 €`, supérieure au salaire réel de `6` personnes sur `7` (`85,7 %`) à cause du salaire dirigeant de `12 300 €`.

### Cas 2 : effectif pair (`n = 8`)

L'entreprise embauche un huitième collaborateur payé `2 800 €` nets par mois.

1. **Tri croissant :** `[2 100 ; 2 350 ; 2 500 ; 2 700 ; 2 800 ; 2 900 ; 3 150 ; 12 300]`.
2. **Rangs centraux :** `8 / 2 = 4ᵉ` valeur (`2 700 €`) et `(8 / 2) + 1 = 5ᵉ` valeur (`2 800 €`).
3. **Médiane :** `Me = (2 700 + 2 800) / 2 = 2 750 €`.
4. **Quartiles et IQR :** `Q₁` (médiane de la moitié basse) vaut `(2 350 + 2 500) / 2 = 2 425 €`, et `Q₃` (médiane de la moitié haute) vaut `(2 900 + 3 150) / 2 = 3 025 €`. L'écart interquartile s'établit à `IQR = 3 025 − 2 425 = 600 €`. Selon la règle de Tukey (`Q₃ + 1,5 × IQR = 3 925 €`), le salaire de `12 300 €` est bien identifié comme valeur aberrante statistique.

## Tableau comparatif des indicateurs de tendance centrale

| Indicateur | Principe | Résistance aux extrêmes | Données ordinales | Usage optimal | Limite majeure |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Médiane (`Me`)** | Rang `50 %` | Très élevée (`~50 %`) | Oui | Salaires, immobilier, latences | Non additive |
| **Moyenne (`x̄`)** | Somme / `n` | Nulle (`0 %`) | Non | Budgets, notes, lois normales | Déformée par les extrêmes |
| **Mode (`Mo`)** | Valeur la plus fréquente | Très élevée | Oui (et nominales) | Tailles, catégories, votes | Parfois multiple (bimodal) |
| **Moyenne tronquée** | Moyenne hors `10 %` queues | Élevée | Non | Jugements sportifs, capteurs | Écarte des données réelles |
| **Quartiles (`Q₁`, `Q₃`)** | Rangs `25 %` et `75 %` | Élevée (`25 %`) | Oui | Dispersion (`IQR`), boxplots | Varie selon l'interpolation |
| **Étendue (`Max − Min`)** | Écart total | Nulle | Non | Contrôle de bornes simples | Sensible à une seule anomalie |

## Applications concrètes, données groupées et pièges fréquents

En **économie publique** (INSEE, Eurostat), le niveau de vie médian et le prix médian au `m²` reflètent le ménage typique sans être gonflés par les patrimoines exceptionnels. En **ingénierie logicielle**, le suivi des temps de réponse d'API privilégie la médiane (`p50`) et les centiles hauts (`p95`, `p99`), car une moyenne masque les pics de latence subis par une minorité d'utilisateurs.

L'erreur la plus fréquente consiste à oublier le tri préalable avant d'appliquer `(n + 1) / 2`, ou à confondre le **rang** (`4ᵉ` position) avec la **valeur** (`2 700 €`). Enfin, sur des données regroupées par classes (tranches de revenus ou d'âge), la médiane exacte disparaît : on repère la classe où l'effectif cumulé atteint `50 %`, puis on estime la médiane par interpolation linéaire sous l'hypothèse d'une répartition uniforme dans cette classe.

Notez par ailleurs une limite propre aux indicateurs de rang : la médiane n'est pas additive d'un sous-groupe à l'autre. Vous ne pouvez donc pas déduire la médiane nationale d'un indicateur en combinant simplement les médianes régionales ; seul le regroupement complet des séries individuelles permet de recalculer le rang central exact.
