---
title: "Calculatrice de Variance : Le Guide Ultime de la Dispersion"
metaTitle: "Calculatrice de Variance : Population, Échantillon et Écart"
description: "Calculez instantanément la variance d'échantillon et de population, l'écart-type et la somme des carrés à l'aide de formules détaillées et d'exemples concrets."
metaDescription: "Calculez la variance d'échantillon (correction de Bessel) et de population, l'écart-type et la somme des carrés. Formules, tableau comparatif et exemples."
metaKeywords: "calculatrice de variance, calcul variance échantillon, variance de population, correction de Bessel, formule variance écart-type, somme des carrés, dispersion statistique"
faqs:
  - question: "Quand faut-il diviser par n - 1 (échantillon) plutôt que par N (population) ?"
    answer: "La variance de population (division par N) s'emploie uniquement lorsque vos données recensent la totalité absolue du groupe étudié, par exemple les 27 États membres de l'Union européenne ou l'ensemble des pièces d'un lot clos. Dès que vos observations forment un échantillon tiré d'un ensemble plus vaste, la division par n - 1 est indispensable pour obtenir un estimateur sans biais de la dispersion réelle."
  - question: "Pourquoi élève-t-on les écarts à la moyenne au carré dans la formule de la variance ?"
    answer: "La somme algébrique des écarts bruts à la moyenne arithmétique est mathématiquement toujours égale à zéro, car les écarts positifs et négatifs se compensent exactement. L'élévation au carré rend chaque terme positif ou nul, pénalise davantage les valeurs éloignées du centre et produit une fonction dérivable indispensable à l'analyse de variance (ANOVA) et à la régression linéaire."
  - question: "Une variance statistique peut-elle être négative ou égale à zéro ?"
    answer: "Non, une variance ne peut jamais être négative puisqu'elle représente une moyenne de carrés de nombres réels, tous positifs ou nuls. Elle vaut exactement zéro dans un seul cas limite : lorsque toutes les observations de la série sont strictement identiques entre elles, traduisant une absence totale de dispersion."
  - question: "Quelle est la différence pratique entre la variance et l'écart-type ?"
    answer: "La variance mesure la dispersion dans l'unité de départ élevée au carré (par exemple des euros au carré ou des millimètres carrés), ce qui facilite les calculs d'additivité et de décomposition du risque. L'écart-type est simplement la racine carrée positive de la variance : il ramène la mesure dans l'unité physique d'origine pour une lecture immédiate autour de la moyenne."
  - question: "Quel est l'effet d'un changement d'unité ou d'une constante ajoutée sur la variance ?"
    answer: "Ajouter ou retrancher une constante b à toutes les valeurs d'une série ne modifie pas la variance, car tous les écarts à la moyenne restent inchangés. En revanche, multiplier chaque observation par un facteur a multiplie la variance par a au carré : convertir des longueurs de centimètres en millimètres (facteur 10) multiplie ainsi la variance par 100."
---

## Comprendre la Variance et la Dispersion Statistique

En statistique descriptive comme en analyse inférentielle, les indicateurs de tendance centrale (moyenne ou médiane) ne suffisent jamais à décrire une série numérique. Deux distributions peuvent afficher la même moyenne tout en présentant des profils de risque opposés : l'une concentrée autour du centre, l'autre très dispersée. La **variance** — notée $\sigma^2$ pour une population complète et $s^2$ pour un échantillon — quantifie cette variabilité en mesurant la moyenne des écarts quadratiques par rapport à la moyenne arithmétique.

Elle constitue le socle de nombreuses analyses : mesure de la volatilité d'un portefeuille financier en euros (€), maîtrise statistique des procédés en métrologie industrielle, analyse de variance (ANOVA) en recherche clinique ou compromis biais-variance en apprentissage automatique. En gestion de portefeuille, la variance totale combine les variances individuelles et les covariances entre actifs pour quantifier l'effet de la diversification. En analyse de variance, elle permet de décomposer la variabilité totale entre variance expliquée par les facteurs étudiés et variance résiduelle afin de calculer la statistique de Fisher.

## Formules Fondamentales : Population, Échantillon et König-Huygens

Le calcul de la variance distingue la population exhaustive d'un échantillon destiné à l'estimer.

### Variance de population ($\sigma^2$) et variance d'échantillon ($s^2$)

Lorsque tous les $N$ individus de la population cible sont observés, la variance vaut :

$$\sigma^2 = \frac{1}{N} \sum_{i=1}^{N} (x_i - \mu)^2$$

Pour un échantillon de taille $n$ issu d'une population plus vaste, on applique la **correction de Bessel** en divisant par $n - 1$ :

$$s^2 = \frac{1}{n - 1} \sum_{i=1}^{n} (x_i - \bar{x})^2$$

L'identité de **König-Huygens** permet de calculer directement la somme des carrés des écarts ($SC$) en une seule passe :

$$SC = \sum_{i=1}^{n} (x_i - \bar{x})^2 = \sum_{i=1}^{n} x_i^2 - \frac{\left(\sum_{i=1}^{n} x_i\right)^2}{n}$$

### Définition des variables et unités

* **$\sigma^2$ et $s^2$** : variance de population et estimateur sans biais sur échantillon, exprimés dans le carré de l'unité SI ou monétaire ($\text{MPa}^2$, $\text{mm}^2$, $\text{€}^2$).
* **$x_i$** : $i$-ème observation individuelle de la série statistique.
* **$\mu$ et $\bar{x}$** : moyenne arithmétique de la population ($\frac{1}{N}\sum x_i$) et de l'échantillon ($\frac{1}{n}\sum x_i$).
* **$N$, $n$ et $n - 1$** : effectif de population, taille d'échantillon ($n \ge 2$) et nombre de degrés de liberté ($dl$).

## Pourquoi Diviser par n - 1 ? Correction de Bessel et Degrés de Liberté

La moyenne empirique $\bar{x}$ est par construction la valeur qui minimise la somme des carrés des écarts pour l'échantillon observé. Comme $\bar{x}$ diffère légèrement de la vraie moyenne $\mu$, on vérifie toujours :

$$\sum_{i=1}^{n} (x_i - \bar{x})^2 \le \sum_{i=1}^{n} (x_i - \mu)^2$$

Diviser $SC$ par $n$ sous-estime donc systématiquement $\sigma^2$ en moyenne. Une fois $\bar{x}$ fixée, seules $n - 1$ observations varient librement, la dernière étant imposée par $\sum (x_i - \bar{x}) = 0$. Multiplier l'estimateur brut par $\frac{n}{n - 1}$ — soit diviser par $n - 1$ — supprime exactement ce biais négatif.

## Exemple Numérique Pas à Pas : Contrôle Qualité en Métrologie

Un laboratoire mesure la résistance à la traction (en mégapascals, $\text{MPa}$) d'un échantillon aléatoire de $n = 6$ éprouvettes d'acier : $\{414, 418, 420, 422, 426, 432\}\text{ MPa}$.

1. **Moyenne d'échantillon ($\bar{x}$)** :
   $$\bar{x} = \frac{414 + 418 + 420 + 422 + 426 + 432}{6} = \frac{2\,532}{6} = 422{,}0\text{ MPa}$$
2. **Écarts centrés ($x_i - \bar{x}$)** :
   En retranchant $422\text{ MPa}$ à chaque valeur, on obtient $-8$, $-4$, $-2$, $0$, $+4$ et $+10\text{ MPa}$, dont la somme vaut exactement $0$.
3. **Somme des carrés des écarts ($SC$)** :
   $$SC = (-8)^2 + (-4)^2 + (-2)^2 + 0^2 + 4^2 + 10^2 = 64 + 16 + 4 + 0 + 16 + 100 = 200\text{ MPa}^2$$
   Vérification par König-Huygens : $\sum x_i^2 = 1\,068\,704$, donc $SC = 1\,068\,704 - \frac{2\,532^2}{6} = 200\text{ MPa}^2$.
4. **Variance et écart-type** :
   Avec $n - 1 = 5$ degrés de liberté, on obtient :
   $$s^2 = \frac{200}{5} = 40{,}00\text{ MPa}^2 \quad \Longrightarrow \quad s = \sqrt{40{,}00} \approx 6{,}3246\text{ MPa}$$
   Le coefficient de variation vaut $CV = \frac{6{,}3246}{422} \times 100 \approx 1{,}50\,\%$, attestant d'un lot homogène. Si ces six éprouvettes représentaient la population entière ($N = 6$), on obtiendrait $\sigma^2 = \frac{200}{6} \approx 33{,}3333\text{ MPa}^2$ et $\sigma \approx 5{,}7735\text{ MPa}$.

## Tableau Comparatif des Indicateurs de Dispersion Statistique

| Indicateur | Formule | Unité | Sensibilité aux Extrêmes | Usage Privilégié |
| :--- | :--- | :--- | :--- | :--- |
| **Variance d'échantillon ($s^2$)** | $\frac{\sum (x_i - \bar{x})^2}{n - 1}$ | Unité² ($\text{u}^2$) | Très élevée | ANOVA, régression linéaire, inférence |
| **Variance de population ($\sigma^2$)** | $\frac{\sum (x_i - \mu)^2}{N}$ | Unité² ($\text{u}^2$) | Très élevée | Recensements clos, probabilités |
| **Écart-type ($s$ ou $\sigma$)** | $\sqrt{s^2}$ ou $\sqrt{\sigma^2}$ | Unité ($\text{u}$) | Élevée | Intervalles de confiance, scores $z$, Six Sigma |
| **Coefficient de variation ($CV$)** | $\frac{s}{\lvert\bar{x}\rvert} \times 100\,\%$ | Pourcentage ($\%$) | Élevée | Comparaison entre échelles ou devises |
| **Écart absolu moyen ($EAM$)** | $\frac{1}{n}\sum \lvert x_i - \bar{x}\rvert$ | Unité ($\text{u}$) | Modérée | Erreurs de prévision et suivi logistique |
| **Écart interquartile ($EIQ$)** | $Q_3 - Q_1$ | Unité ($\text{u}$) | Très faible | Distributions asymétriques (salaires, immobilier) |

## Conseils Pratiques et Pièges Courants à Éviter

* **Distinction critique entre $n$ et $n - 1$ sur petits échantillons** : Confondre $\sigma^2$ et $s^2$ génère une erreur relative de $\frac{1}{n}$, soit $20\,\%$ pour $n = 5$ et $10\,\%$ pour $n = 10$, faussant les intervalles de confiance et les tests de Student.
* **Dimension quadratique et additivité** : Une variance exprimée en $\text{€}^2$ ne s'additionne pas à une moyenne en $\text{€}$. En revanche, la variance est directement additive pour deux variables indépendantes : $\operatorname{Var}(X + Y) = \operatorname{Var}(X) + \operatorname{Var}(Y)$, propriété clé de la théorie moderne du portefeuille.
* **Sensibilité quadratique aux valeurs aberrantes** : Un point situé trois fois plus loin de la moyenne pèse neuf fois plus dans $SC$. Sur une série asymétrique, complétez toujours $s^2$ par la médiane et l'écart interquartile ($EIQ$).
* **Impact d'un changement d'unité SI** : Selon $\operatorname{Var}(aX + b) = a^2 \operatorname{Var}(X)$, passer de mètres en centimètres ($a = 100$) multiplie la variance par $10\,000$, alors qu'une translation constante $+b$ la laisse inchangée.
