---
title: "Calculatrice d'Écart-Type"
metaTitle: "Calculatrice d'Écart-Type | Formule, Variance et Moyenne"
description: "Calculez instantanément l'écart-type, la variance, la moyenne, l'erreur standard et les quartiles d'un échantillon ou d'une population."
metaDescription: "Calculez l'écart-type (s ou σ), la variance, la moyenne, les quartiles et l'erreur standard à partir de données brutes, de fréquences ou de classes."
metaKeywords: "calculatrice écart-type, calcul écart-type, variance échantillon population, correction de Bessel, coefficient de variation, règle empirique, erreur standard, dispersion statistique"
faqs:
  - question: "Quand faut-il choisir l'écart-type d'échantillon (s) plutôt que celui de population (σ) ?"
    answer: "Utilisez l'écart-type de population (σ, division par N) uniquement si votre série réunit la totalité exhaustive des individus étudiés, comme les notes complètes d'une promotion donnée. Dès que vos observations forment un sous-ensemble destiné à estimer un ensemble plus vaste — un lot prélevé en usine, un sondage ou un échantillon clinique — retenez l'écart-type d'échantillon (s, division par n - 1), dont la correction de Bessel corrige la sous-estimation systématique de la variance réelle."
  - question: "Pourquoi la variance s'exprime-t-elle en unités au carré alors que l'écart-type garde l'unité d'origine ?"
    answer: "Pour calculer la variance, chaque écart à la moyenne est élevé au carré afin d'éviter que les écarts positifs et négatifs ne s'annulent tout en pénalisant davantage les valeurs éloignées. Des mesures en grammes (g) ou en euros (€) produisent donc une variance en g² ou en €². En prenant la racine carrée de la variance, l'écart-type ramène la dispersion à l'échelle physique ou monétaire initiale, directement comparable à la moyenne."
  - question: "À quoi sert le coefficient de variation (CV) par rapport à l'écart-type brut ?"
    answer: "Le coefficient de variation rapporte l'écart-type à la moyenne en pourcentage : CV = (s / |x̄|) × 100 %. Il permet de comparer la dispersion relative de deux phénomènes d'unités ou d'ordres de grandeur différents, par exemple la régularité d'une ligne d'usinage en millimètres et la variabilité des coûts de production en euros. Il ne doit toutefois s'appliquer qu'à des grandeurs mesurées sur une échelle à zéro absolu, et jamais lorsque la moyenne approche de zéro."
  - question: "Quelle différence distingue l'écart-type (s) de l'erreur standard de la moyenne (ES) ?"
    answer: "L'écart-type mesure la dispersion des observations individuelles autour de la moyenne : il caractérise la variabilité intrinsèque du phénomène et reste globalement stable quand la taille de l'échantillon augmente. L'erreur standard (ES = s / √n) mesure au contraire l'incertitude qui entoure l'estimation de la moyenne elle-même : plus vous recueillez d'observations, plus l'erreur standard décroît et plus votre intervalle de confiance autour de la moyenne se resserre."
  - question: "Comment l'écart-type réagit-il aux valeurs aberrantes dans une série asymétrique ?"
    answer: "Parce que la formule élève chaque écart au carré, une seule valeur aberrante située loin de la moyenne gonfle fortement la variance et l'écart-type. Lorsque la distribution est fortement asymétrique — comme les salaires en euros ou les temps de réponse informatiques —, il est recommandé de compléter l'écart-type par des indicateurs robustes que calcule aussi notre outil : la médiane, l'écart interquartile (EIQ) et les seuils de détection de Tukey."
---

En statistique, en métrologie industrielle comme en gestion financière, la moyenne arithmétique ne suffit jamais à décrire une série. Deux jeux de données peuvent partager exactement la même moyenne tout en reflétant des réalités opposées : l'un régulier et prévisible, l'autre erratique et risqué. L'**écart-type** mesure précisément cette **dispersion typique** autour du centre, dans la même unité que vos mesures (`g`, `mm`, `s`, `€`, `CHF` ou `$ CAD`).

Notre calculatrice traite les **séries brutes**, les **tableaux d'effectifs** et les **données groupées par classes**. Elle renvoie aussitôt moyenne, variance et écart-type de population ($\sigma$) et d'échantillon ($s$), erreur standard, coefficient de variation, écart absolu moyen, quartiles, asymétrie et valeurs aberrantes.

## Formules de la variance et de l'écart-type

Le calcul s'appuie sur la somme des carrés des écarts à la moyenne, puis sur le dénominateur adapté à la nature de votre série.

**1. Population exhaustive** ($N$ individus au total, moyenne $\mu$) :

$$\sigma^2 = \frac{1}{N}\sum_{i=1}^{N}(x_i - \mu)^2 \qquad \text{et} \qquad \sigma = \sqrt{\sigma^2}$$

**2. Échantillon aléatoire** ($n$ observations issues d'un ensemble plus vaste, moyenne $\bar{x}$) :

$$s^2 = \frac{1}{n - 1}\sum_{i=1}^{n}(x_i - \bar{x})^2 \qquad \text{et} \qquad s = \sqrt{s^2}$$

* **$x_i$** : observation mesurée en unité SI (`g`, `m`, `s`) ou monétaire (`€`, `$ CAD`).
* **$\mu$ et $\bar{x}$** : moyenne arithmétique de la population ou de l'échantillon.
* **$N$ et $n$** : effectif total de la population ou taille de l'échantillon ($n \ge 2$ pour $s$).
* **$n - 1$ (correction de Bessel)** : degrés de liberté compensant la sous-estimation induite par l'usage de la moyenne empirique $\bar{x}$ au lieu de $\mu$.

### Données pondérées et indicateurs complémentaires

Pour des fréquences ou des classes de centres $c_k$ et d'effectifs $f_k$ ($n = \sum f_k$), la somme des carrés vaut $\sum_{k=1}^{K} f_k(c_k - \bar{x})^2$. La calculatrice en déduit trois indicateurs clés :

* **Erreur standard** : $ES = s / \sqrt{n}$ (précision de l'estimation de $\mu$).
* **Coefficient de variation** : $CV = (s / |\bar{x}|) \times 100\,\%$ (dispersion relative sans unité).
* **Écart absolu moyen** : $EAM = \frac{1}{n}\sum |x_i - \bar{x}|$ (moins sensible aux valeurs extrêmes).

## Exemple chiffré : contrôle qualité en métrologie

Un torréfacteur vérifie une ensacheuse réglée sur une cible de **$500\text{ g}$**. Un prélèvement aléatoire de **$n = 8$ paquets** mesure (en grammes) : **$494, 498, 500, 501, 502, 504, 505, 512$**. S'agissant d'un échantillon de production, la référence est $s$.

1. **Moyenne** : $\bar{x} = 4\,016 / 8 = \mathbf{502{,}0\text{ g}}$.
2. **Écarts centrés $(x_i - \bar{x})$** : $-8, -4, -2, -1, 0, +2, +3, +10\text{ g}$ (somme exactement nulle).
3. **Carrés des écarts** : $64, 16, 4, 1, 0, 4, 9, 100\text{ g}^2$, soit $SC = \mathbf{198\text{ g}^2}$.
4. **Échantillon ($n - 1 = 7$)** :
   $$s^2 = \frac{198}{7} \approx 28{,}2857\text{ g}^2 \qquad \Longrightarrow \qquad s = \sqrt{28{,}2857} \approx \mathbf{5{,}3184\text{ g}}$$
5. **Population ($N = 8$)** : $\sigma^2 = 198 / 8 = 24{,}75\text{ g}^2$ et $\sigma \approx \mathbf{4{,}9749\text{ g}}$ (la correction de Bessel majore ici l'écart-type de **$+6{,}90\,\%$**).
6. **Indicateurs dérivés** : $ES = 5{,}3184 / \sqrt{8} \approx \mathbf{1{,}8803\text{ g}}$, $CV = \mathbf{1{,}06\,\%}$ et $EAM = 30 / 8 = \mathbf{3{,}75\text{ g}}$. Avec une médiane à $501{,}5\text{ g}$, $Q_1 = 499{,}0\text{ g}$ et $Q_3 = 504{,}5\text{ g}$ ($\text{EIQ} = 5{,}5\text{ g}$), la borne supérieure de Tukey atteint $504{,}5 + 1{,}5 \times 5{,}5 = \mathbf{512{,}75\text{ g}}$ : la valeur $512\text{ g}$ reste donc juste sous le seuil d'aberration. Ce diagnostic montre une machine bien centrée mais dont le remplissage mérite un léger recalage vers $500\text{ g}$.

## Table de référence : règle empirique et borne de Bienaymé-Tchebychev

Pour une distribution proche d'une **loi normale**, chaque multiple de l'écart-type encadre une fraction précise des données ; hors normalité, l'inégalité de Bienaymé-Tchebychev ($1 - 1/k^2$) fournit une borne inférieure universelle :

| Intervalle centré | Loi normale (inclus) | Hors intervalle | Minimum garanti (Tchebychev) | Portefeuille (moy. $8\,\%$, $\sigma = 12\,\%$) |
| :--- | :--- | :--- | :--- | :--- |
| **$\mu \pm 1{,}00\,\sigma$** | $68{,}27\,\%$ | $31{,}73\,\%$ | Non contraint | $-4{,}0\,\%$ à $+20{,}0\,\%$ |
| **$\mu \pm 1{,}645\,\sigma$** | $90{,}00\,\%$ | $10{,}00\,\%$ | $63{,}05\,\%$ | $-11{,}7\,\%$ à $+27{,}7\,\%$ |
| **$\mu \pm 1{,}960\,\sigma$** | $95{,}00\,\%$ | $5{,}00\,\%$ | $73{,}97\,\%$ | $-15{,}5\,\%$ à $+31{,}5\,\%$ |
| **$\mu \pm 2{,}00\,\sigma$** | $95{,}45\,\%$ | $4{,}55\,\%$ | $75{,}00\,\%$ | $-16{,}0\,\%$ à $+32{,}0\,\%$ |
| **$\mu \pm 2{,}576\,\sigma$** | $99{,}00\,\%$ | $1{,}00\,\%$ | $84{,}93\,\%$ | $-22{,}9\,\%$ à $+38{,}9\,\%$ |
| **$\mu \pm 3{,}00\,\sigma$** | $99{,}73\,\%$ | $0{,}27\,\%$ | $88{,}89\,\%$ | $-28{,}0\,\%$ à $+44{,}0\,\%$ |

L'effet de Bessel $\sqrt{n/(n-1)}$ décroît vite avec l'effectif : **$+11{,}80\,\%$** pour $n = 5$, **$+5{,}41\,\%$** pour $n = 10$, **$+1{,}71\,\%$** pour $n = 30$ et **$+0{,}50\,\%$** dès $n = 100$.

## Pièges fréquents et bonnes pratiques statistiques

* **Ne jamais additionner deux écarts-types** : Pour deux variables indépendantes (tolérances d'assemblage ou rendements décorrélés), ce sont les **variances** qui s'additionnent : $\sigma_{A+B} = \sqrt{\sigma_A^2 + \sigma_B^2}$. En finance, la volatilité annuelle se déduit de l'écart-type mensuel par $\sigma_{\text{an}} = \sigma_{\text{mois}} \times \sqrt{12}$.
* **Contrôler l'asymétrie avant la règle 68–95–99,7** : Sur des salaires en euros ou des délais fortement asymétriques, l'intervalle $\bar{x} \pm 2s$ est biaisé ; associez alors médiane et écart interquartile.
* **Mesurer l'approximation des données groupées** : Le regroupement par classes ramène chaque observation au centre de son intervalle, ce qui perd de la précision si les classes sont larges ou ouvertes.
* **Réserver le CV aux échelles à zéro absolu** : Le coefficient de variation est pertinent en `kg`, `m`, `€` ou kelvins, jamais en degrés Celsius où le zéro est conventionnel.
