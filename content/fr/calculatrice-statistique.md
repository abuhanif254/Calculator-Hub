---
title: "Calculatrice Statistique"
metaTitle: "Calculatrice Statistique : Moyenne, Médiane et Écart-Type"
description: "Calculez instantanément moyenne, médiane, mode, quartiles, variance, écart-type, erreur standard, asymétrie et aplatissement avec graphiques complets."
metaDescription: "Analysez toute série de données : moyenne, médiane, mode, quartiles Q1-Q3, variance, écart-type, erreur standard, histogramme et boîte à moustaches."
metaKeywords: "calculatrice statistique, moyenne médiane mode, écart-type échantillon, variance population, quartiles Q1 Q3, écart interquartile, asymétrie, aplatissement, boîte à moustaches"
faqs:
  - question: "Quand utiliser l'écart-type d'échantillon (n - 1) plutôt que l'écart-type de population (n) ?"
    answer: "Employez la variance et l'écart-type de population (diviseur n) uniquement lorsque votre série couvre la totalité exhaustive du groupe étudié, par exemple tous les capteurs d'un lot fini. Dès que vos mesures représentent un échantillon destiné à caractériser une population plus vaste, utilisez l'écart-type d'échantillon avec la correction de Bessel (diviseur n - 1), qui supprime le biais de sous-estimation de la dispersion réelle."
  - question: "Pourquoi la médiane est-elle souvent préférable à la moyenne arithmétique ?"
    answer: "La moyenne intègre chaque observation avec le même poids et se laisse fortement déplacer par une seule mesure extrême, comme un pic de latence ou un salaire exceptionnel. La médiane, qui coupe la série ordonnée en deux moitiés égales, demeure robuste face aux valeurs aberrantes et reflète bien mieux l'ordre de grandeur typique d'une distribution asymétrique."
  - question: "Comment sont déterminés les quartiles Q1 et Q3 et pourquoi diffèrent-ils parfois entre logiciels ?"
    answer: "Plusieurs conventions coexistent en statistique descriptive. Notre outil applique la méthode de Tukey : Q1 est la médiane de la moitié inférieure et Q3 celle de la moitié supérieure, en excluant la médiane centrale lorsque l'effectif est impair. Certains tableurs (comme les fonctions QUARTILE.INCLURE ou QUARTILE.EXCLURE d'Excel) recourent à une interpolation linéaire par centiles ; l'écart entre méthodes s'efface rapidement quand l'effectif grandit."
  - question: "Quelle différence sépare l'écart-type de l'erreur standard de la moyenne ?"
    answer: "L'écart-type quantifie la variabilité individuelle des observations autour de la moyenne et reste globalement stable lorsque vous collectez davantage de données. L'erreur standard de la moyenne (écart-type d'échantillon divisé par la racine carrée de n) évalue quant à elle la précision de l'estimation de la moyenne : elle décroît à mesure que l'échantillon s'élargit et sert à construire les intervalles de confiance."
  - question: "Comment interpréter les coefficients d'asymétrie et d'aplatissement en excès ?"
    answer: "Une asymétrie voisine de zéro indique une courbe équilibrée ; une valeur positive révèle une queue étirée vers les grandes valeurs (asymétrie à droite), et une valeur négative une queue vers la gauche. L'aplatissement en excès (kurtosis de Fisher) compare le poids des queues à celui d'une loi normale (référence 0) : positif, il signale des queues lourdes propices aux valeurs extrêmes ; négatif, une répartition plus plate."
---

En contrôle qualité industriel, en métrologie de laboratoire ou en analyse de performances informatiques, une série brute de mesures ne révèle rien tant qu'elle n'est pas synthétisée. La **statistique descriptive** caractérise tout jeu de données selon quatre dimensions : la **tendance centrale** (moyenne, médiane, mode), la **dispersion** (étendue, variance, écart-type, écart interquartile), la **position** (quartiles) et la **forme** (asymétrie et aplatissement).

Notre calculatrice statistique produit instantanément l'ensemble de ces grandeurs, détaille les calculs étape par étape et trace trois visuels complémentaires : un **histogramme de fréquences** (règle de Sturges), une **courbe normale ajustée** et une **boîte à moustaches**.

## Formules fondamentales de la statistique descriptive

Pour $n$ observations $x_1, x_2, \dots, x_n$ mesurées dans une unité SI (gramme `g`, millimètre `mm` ou milliseconde `ms`), la **moyenne arithmétique** vaut $\bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i$.

La dispersion se mesure par la **variance** (en unité au carré, par exemple `ms²`) et par sa racine carrée, l'**écart-type** (même unité que les mesures), en distinguant population et échantillon :

$$\sigma^2 = \frac{1}{n}\sum_{i=1}^{n}(x_i - \bar{x})^2 \quad \text{(population)} \qquad \text{et} \qquad s^2 = \frac{1}{n - 1}\sum_{i=1}^{n}(x_i - \bar{x})^2 \quad \text{(échantillon)}$$

Le diviseur $n - 1$ (**correction de Bessel**) corrige la perte d'un degré de liberté liée à l'estimation de $\bar{x}$. L'**erreur standard de la moyenne** vaut $\text{ESM} = \frac{s}{\sqrt{n}}$.

### Quartiles de Tukey et coefficients de forme

Sur la série ordonnée, la **médiane ($\tilde{x}$)** partage les effectifs en deux moitiés. Selon la **méthode de Tukey**, $Q_1$ est la médiane de la moitié inférieure et $Q_3$ celle de la moitié supérieure (médiane centrale exclue si $n$ est impair). L'**écart interquartile** vaut $\text{EIQ} = Q_3 - Q_1$, et toute donnée hors des barrières $[Q_1 - 1{,}5 \times \text{EIQ} \; ; \; Q_3 + 1{,}5 \times \text{EIQ}]$ est repérée comme **valeur aberrante**.

Pour quantifier la forme (grandeurs sans dimension), l'outil calcule l'**asymétrie corrigée de Fisher-Pearson** ($n \ge 3$) et l'**aplatissement en excès** ($n \ge 4$) :

$$g_1 = \frac{n}{(n - 1)(n - 2)} \sum_{i=1}^{n}\left(\frac{x_i - \bar{x}}{s}\right)^3$$

$$g_2 = \frac{n(n + 1)}{(n - 1)(n - 2)(n - 3)} \sum_{i=1}^{n}\left(\frac{x_i - \bar{x}}{s}\right)^4 - \frac{3(n - 1)^2}{(n - 2)(n - 3)}$$

## Exemple chiffré : temps de réponse d'un capteur industriel

Un banc d'essai enregistre **$n = 11$ temps de réponse** en millisecondes (`ms`), classés par ordre croissant :

`18, 20, 20, 22, 23, 24, 26, 28, 29, 30, 46`

1. **Tendance centrale** : $\sum x_i = 286\text{ ms}$, d'où une moyenne exacte **$\bar{x} = 26{,}00\text{ ms}$**, une médiane (6e rang) **$\tilde{x} = 24{,}00\text{ ms}$** et un **mode de 20 ms** (répété deux fois).
2. **Quartiles et anomalies** : l'étendue vaut $46 - 18 = \mathbf{28{,}00\text{ ms}}$. La moitié inférieure `[18, 20, 20, 22, 23]` donne **$Q_1 = 20{,}00\text{ ms}$** et la moitié supérieure `[26, 28, 29, 30, 46]` donne **$Q_3 = 29{,}00\text{ ms}$**, soit **$\text{EIQ} = 9{,}00\text{ ms}$**. La barrière supérieure de Tukey vaut $29 + 1{,}5 \times 9 = \mathbf{42{,}50\text{ ms}}$ : le pic à **46 ms** est identifié comme valeur aberrante.
3. **Variance, écart-type et erreur standard** : la somme des carrés des écarts à $26\text{ ms}$ vaut :
   $$\sum_{i=1}^{11}(x_i - 26)^2 = 64 + 36 + 36 + 16 + 9 + 4 + 0 + 4 + 9 + 16 + 400 = \mathbf{594\text{ ms}^2}$$
   * **Population** : $\sigma^2 = 594 / 11 = \mathbf{54{,}00\text{ ms}^2}$ et $\sigma = \mathbf{7{,}3485\text{ ms}}$.
   * **Échantillon** : $s^2 = 594 / 10 = \mathbf{59{,}40\text{ ms}^2}$ et $s = \mathbf{7{,}7071\text{ ms}}$.
   * **Erreur standard** : $\text{ESM} = 7{,}7071 / \sqrt{11} = \mathbf{2{,}3238\text{ ms}}$.
4. **Forme et histogramme** : l'asymétrie vaut **$g_1 = +1{,}8838$** (queue droite cohérente avec $\bar{x} > \tilde{x} > \text{Mode}$), l'aplatissement en excès atteint **$g_2 = +4{,}5311$** (queues lourdes) et la règle de Sturges fixe $k = \lceil 1 + 3{,}322 \log_{10}(11) \rceil = \mathbf{5\text{ classes}}$.

Sans le pic à $46\text{ ms}$ ($n = 10$), la moyenne descend à **24,00 ms** (proche de la médiane **23,50 ms**) et l'écart-type chute de **7,7071 ms** à **4,1366 ms** : une seule anomalie concentrait $67{,}3\,\%$ de la somme des carrés.

## Tableau de référence : choisir le bon indicateur statistique

| Indicateur | Ce qu'il mesure | Unité | Sensibilité aux extrêmes | Usage privilégié |
| :--- | :--- | :--- | :--- | :--- |
| **Moyenne ($\bar{x}$)** | Centre arithmétique | Unité ($u$) | Élevée | Distributions symétriques ou normales |
| **Médiane ($\tilde{x}$)** | Valeur centrale ($50\text{e}$ centile) | Unité ($u$) | Très faible | Séries asymétriques (revenus, délais) |
| **Mode** | Valeur la plus fréquente | Unité ($u$) | Nulle | Données discrètes, classes majoritaires |
| **Écart-type ($s$ ou $\sigma$)** | Dispersion quadratique | Unité ($u$) | Élevée | Contrôle qualité, tests paramétriques |
| **Écart interquartile ($\text{EIQ}$)** | Dispersion des $50\,\%$ centraux | Unité ($u$) | Très faible | Boîtes à moustaches, séries bruitées |
| **Erreur standard ($\text{ESM}$)** | Précision de la moyenne | Unité ($u$) | Modérée | Intervalles de confiance, comparaisons |
| **Asymétrie ($g_1$) et $g_2$** | Équilibre et poids des queues | Sans unité | Très élevée | Vérifier la normalité avant un test |

## Pièges courants et bonnes pratiques d'analyse

* **Saisir les décimaux avec un point** : La zone de saisie découpant la série sur les virgules, espaces et sauts de ligne, notez `24.5` (et non `24,5`) pour éviter qu'un nombre décimal ne soit scindé en deux valeurs.
* **Distinguer $s$ et $\sigma$ sur petits effectifs** : À $n = 5$, l'écart-type d'échantillon dépasse celui de population de $11{,}8\,\%$. Retenez $s$ dès que vous inférez vers une population plus large.
* **Toujours inspecter les graphiques** : Des moyennes et écarts-types identiques peuvent dissimuler une distribution bimodale ou des groupes distincts ; vérifiez l'histogramme et la boîte à moustaches avant toute modélisation normale.
* **Vérifier toute valeur aberrante avant exclusion** : Un relevé dépassant $Q_3 + 1{,}5 \times \text{EIQ}$ peut signaler une faute de mesure, mais aussi une défaillance critique réelle qu'il serait risqué d'ignorer.
