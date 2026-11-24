---
title: "Calculatrice de Mode – Trouvez des Modes Simples, Multiples et de Données Groupées"
metaTitle: "Calculatrice de Mode : Simple, Bimodal et Données Groupées"
description: "Calculez le mode statistique, les tableaux de fréquences et la classe modale pour vos séries unimodales, bimodales, multimodales ou groupées en classes."
metaDescription: "Calculez gratuitement le mode statistique (simple, bimodal, multimodal ou données groupées) avec tableaux de fréquences, formules et exemples."
metaKeywords: "calculatrice de mode, calcul mode statistique, classe modale, données groupées, distribution bimodale, distribution multimodale, tableau de fréquences, formule de Pearson, tendance centrale"
faqs:
  - question: "Une série statistique peut-elle n'avoir aucun mode ou en posséder plusieurs ?"
    answer: "Oui. Si chaque valeur distincte apparaît exactement le même nombre de fois (par exemple une seule fois chacune, ou deux fois chacune), la série est dite amodale et ne comporte aucun mode. Lorsque deux valeurs se partagent la fréquence maximale, la série est bimodale ; à partir de trois ex æquo au sommet des effectifs, elle est qualifiée de multimodale."
  - question: "Comment estimer le mode sur des données continues regroupées par classes ?"
    answer: "Pour des grandeurs continues (durées, masses, tailles) où les valeurs exactes ne se répètent presque jamais, on regroupe d'abord les observations en classes d'amplitude égale afin d'identifier la classe modale (celle de plus fort effectif). On applique ensuite la formule d'interpolation de Czuber, qui pondère la position du pic à l'intérieur de l'intervalle selon les effectifs des deux classes voisines."
  - question: "Que révèle une distribution bimodale dans une analyse réelle ?"
    answer: "Une bimodalité signale presque toujours le mélange de deux sous-populations distinctes au sein d'un même jeu de données : par exemple, les pointures de chaussures vendues conjointement à des femmes et à des hommes, le trafic routier des pointes du matin et du soir, ou encore deux profils tarifaires regroupés dans un même rapport commercial."
  - question: "À quoi sert la relation empirique de Karl Pearson entre moyenne, médiane et mode ?"
    answer: "Pour une distribution unimodale modérément asymétrique, Karl Pearson a établi que la distance entre la moyenne et le mode vaut environ trois fois celle entre la moyenne et la médiane, ce qui donne l'approximation Mo ≈ 3 × Médiane - 2 × Moyenne. Cette relation permet d'estimer rapidement le pic principal lorsqu'on ne dispose que des paramètres résumés."
  - question: "Pourquoi le mode est-il le seul indicateur de tendance centrale valable pour des données nominales ?"
    answer: "Des variables qualitatives nominales — comme les groupes sanguins (A, B, AB, O), les modes de transport ou les catégories de produits — ne peuvent ni s'additionner pour calculer une moyenne, ni s'ordonner pour déterminer une médiane. Comme le mode repose uniquement sur le dénombrement des effectifs, il demeure l'unique mesure de tendance centrale mathématiquement légitime sur une échelle nominale."
---

En statistique descriptive, le **mode** ($Mo$) désigne la valeur ou la catégorie la plus fréquente d'une série, correspondant au sommet de l'histogramme ou de la courbe de densité. Contrairement à la moyenne (centre de gravité numérique) ou à la médiane (seuil des $50\,\%$), le mode répond à une question directe de terrain : *quel résultat revient le plus souvent ?*

En gestion de stocks, en métrologie ou en études d'opinion, un chausseur ne fabrique pas une pointure moyenne de `41,125` : il calibre ses commandes sur les pointures modales réellement vendues. Seul indicateur valable sur les quatre échelles de Stevens (nominale, ordinale, d'intervalle et de rapport), le mode est évalué par notre calculatrice pour les **données brutes** comme pour les **classes groupées**, avec détection automatique des régimes **amodal, unimodal, bimodal ou multimodal** et génération des tableaux d'effectifs, fréquences relatives et cumulées.

## Formules du mode : séries brutes, classes groupées et relation de Pearson

### 1. Données discrètes ou catégorielles

Pour des modalités distinctes $x \in S$ d'effectif $f(x)$, le mode maximise la fréquence dès lors que toutes les valeurs ne sont pas ex æquo :

$$Mo = \arg\max_{x \in S} f(x) \qquad \text{si} \qquad \max_{x \in S} f(x) > \min_{x \in S} f(x)$$

Lorsque chaque valeur distincte partage exactement le même effectif, la série est uniforme et **amodale** (aucun mode).

### 2. Données continues groupées par classes (interpolation de Czuber)

Pour des classes contiguës d'amplitude égale $a$, la **classe modale** est l'intervalle d'effectif maximal $f_1$. Le mode interpolé se calcule avec ses deux classes voisines :

$$Mo = L + \left(\frac{f_1 - f_0}{(f_1 - f_0) + (f_1 - f_2)}\right) \times a = L + \left(\frac{\Delta_1}{\Delta_1 + \Delta_2}\right) \times a$$

### 3. Relation empirique de Karl Pearson

Pour une distribution unimodale modérément asymétrique, la médiane se place au tiers de l'écart entre moyenne et mode :

$$Mo \approx 3 \times \text{Médiane} - 2 \times \text{Moyenne}$$

* **$f(x)$** : effectif absolu (nombre d'occurrences) de la modalité $x$.
* **$L$ et $a$** : borne inférieure exacte et amplitude de la classe modale.
* **$f_1, f_0, f_2$** : effectifs respectifs de la classe modale, de la classe précédente et de la classe suivante.
* **$\Delta_1 = f_1 - f_0$ et $\Delta_2 = f_1 - f_2$** : excédents d'effectif par rapport aux classes adjacentes.

### Les quatre régimes de modalité

* **Amodal** : aucune modalité ne domine (ex. $\{12 ; 19 ; 24 ; 31\}$ ou $\{5 ; 5 ; 8 ; 8 ; 14 ; 14\}$).
* **Unimodal** : un pic unique concentre la série, signe d'une population homogène.
* **Bimodal** : deux pics égaux ou distincts trahissent souvent le mélange de deux sous-populations à segmenter.
* **Multimodal** : trois pics ou plus reflètent une saisonnalité ou des profils hétérogènes.

## Exemples chiffrés pas à pas

### Exemple 1 : Ventes de chaussures en pointures européennes (bimodal)

Une boutique lyonnaise relève $n = 16$ paires vendues dans une matinée :

$$\{38 ; 39 ; 39 ; 40 ; 40 ; 40 ; 40 ; 41 ; 41 ; 42 ; 42 ; 43 ; 43 ; 43 ; 43 ; 44\}$$

1. **Effectifs et fréquences relatives ($f_i / n$)** : pointures `38` et `44` ($f = 1$, soit $6{,}25\,\%$) ; `39`, `41` et `42` ($f = 2$, soit $12{,}50\,\%$) ; `40` et `43` ($f = 4$, soit $25{,}00\,\%$ chacune).
2. **Diagnostic** : deux valeurs atteignent l'effectif maximal $4$. La série est **bimodale** avec **$Mo = \{40 ; 43\}$**.
3. **Impact stock** : la moyenne vaut **$41{,}125$** ($658 / 16$) et la médiane **$41{,}0$**. Surstocker la pointure `41` créerait des ruptures sur les deux pics réels (`40` et `43`).

### Exemple 2 : Durées de trajet domicile-travail (données groupées)

Une enquête porte sur $N = 120$ actifs répartis en classes d'amplitude $a = 10\text{ min}$ : $[10 ; 20[$ ($f = 14$), $[20 ; 30[$ ($f_0 = 28$), $[30 ; 40[$ ($f_1 = 44$, classe modale), $[40 ; 50[$ ($f_2 = 22$) et $[50 ; 60[$ ($f = 12$).

1. **Paramètres** : $L = 30\text{ min}$, $a = 10\text{ min}$, $\Delta_1 = 44 - 28 = 16$ et $\Delta_2 = 44 - 22 = 22$.
2. **Interpolation** :
   $$Mo = 30 + \left(\frac{16}{16 + 22}\right) \times 10 = 30 + \frac{160}{38} \approx \mathbf{34{,}21\text{ min}}$$

L'effectif gauche ($28$) dépassant l'effectif droit ($22$), le mode se rapproche logiquement de la borne $30\text{ min}$ plutôt que du centre $35\text{ min}$.

## Comparatif entre mode, médiane et moyenne arithmétique

| Critère statistique | Mode ($Mo$) | Médiane ($Me$) | Moyenne ($\bar{x}$) |
| :--- | :--- | :--- | :--- |
| **Échelles valides** | **Nominale**, ordinale, intervalle, rapport | Ordinale, intervalle, rapport | Intervalle et rapport seuls |
| **Unicité** | $0$, $1$, $2$ ou plusieurs | Toujours unique | Toujours unique |
| **Valeur observée** | Oui (données discrètes) | Oui si $n$ est impair | Rarement observée |
| **Effet des extrêmes** | **Nul** | Très faible (rupture $50\,\%$) | Élevé |
| **Usage optimal** | Stocks, votes, mélanges | Salaires et prix asymétriques | Variance, tests, régression |

## Erreurs courantes et bonnes pratiques de calcul

* **Confondre le mode avec sa fréquence** : Dans l'exemple des chaussures, les modes sont les pointures **`40` et `43`**, jamais l'effectif (`4`). Le mode conserve toujours l'unité de la variable (`min`, `€`, `kg`, catégorie).
* **Oublier la densité sur des classes inégales** : Si les amplitudes $a_k$ varient d'une classe à l'autre, remplacez les effectifs $f_k$ par les densités $d_k = f_k / a_k$ avant d'identifier la classe modale et d'appliquer l'interpolation.
* **Mal calibrer le nombre de classes** : Des classes trop fines génèrent des pics aléatoires ; trop larges, elles masquent une bimodalité. La règle de Sturges ($K \approx 1 + 3{,}322\,\log_{10}(n)$) offre un découpage initial fiable.
* **Employer Pearson sur une série bimodale** : L'approximation $3\,Me - 2\,\bar{x}$ suppose une distribution unimodale modérément asymétrique ; contrôlez toujours l'histogramme au préalable.
