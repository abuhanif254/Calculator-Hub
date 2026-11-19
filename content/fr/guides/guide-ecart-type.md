---
title: "Comprendre l'Écart-Type avec des Exemples"
metaTitle: "Calculer l'Écart-Type : Formule, Variance et Exemples"
description: "Une explication claire de l'écart-type et de la variance : la différence entre les formules de population et d'échantillon, et ce que σ vous dit."
metaDescription: "Apprenez à calculer l'écart-type et la variance pas à pas : différence entre population et échantillon, correction de Bessel et règle empirique."
category: "Math & Science"
relatedCalculator: "standard-deviation-calculator"
faqs:
  - question: "Pourquoi divise-t-on par n - 1 au lieu de n pour l'écart-type d'un échantillon ?"
    answer: "Diviser par n - 1 (la correction de Bessel) compense le fait que la moyenne de l'échantillon est elle-même une estimation de la vraie moyenne de la population. Comme les observations d'un échantillon sont légèrement plus proches de leur propre moyenne que de celle de la population, diviser par n sous-estimerait systématiquement la dispersion réelle."
  - question: "Quelle est la différence fondamentale entre la variance et l'écart-type ?"
    answer: "La variance correspond à la moyenne des carrés des écarts à la moyenne ; elle s'exprime donc dans le carré de l'unité d'origine (par exemple en mètres carrés ou en euros au carré). L'écart-type est la racine carrée de la variance, ce qui ramène la mesure exactement dans l'unité physique des données initiales."
  - question: "Un écart-type peut-il être égal à zéro ou prendre une valeur négative ?"
    answer: "L'écart-type est égal à zéro uniquement lorsque toutes les valeurs de la série statistique sont strictement identiques. En revanche, il ne peut jamais être négatif, car chaque écart à la moyenne est élevé au carré avant d'être additionné et soumis à une racine carrée positive."
  - question: "Comment comparer la dispersion de deux séries ayant des unités ou des moyennes très différentes ?"
    answer: "On utilise le coefficient de variation (CV), qui s'obtient en divisant l'écart-type par la moyenne arithmétique et en multipliant le résultat par 100. Ce pourcentage sans dimension permet de comparer la volatilité relative de grandeurs hétérogènes."
  - question: "L'écart-type est-il sensible aux valeurs aberrantes ou extrêmes ?"
    answer: "Oui, fortement. Comme chaque écart à la moyenne est élevé au carré dans la formule, une seule valeur extrême augmente considérablement la somme des carrés. En présence de distributions très asymétriques ou de valeurs aberrantes, l'écart interquartile ou l'écart absolu médian sont plus robustes."
---

En statistique descriptive et en théorie des probabilités, la moyenne arithmétique ne suffit pas à résumer fidèlement une série de données. Deux groupes d'observations peuvent partager exactement la même moyenne tout en présentant des structures opposées : l'un regroupé autour de la valeur centrale, l'autre dispersé aux extrémités. L'**écart-type** est l'indicateur de référence qui mesure cette **dispersion** (ou variabilité) des valeurs autour de leur moyenne.

Un écart-type faible indique que les données restent concentrées près de la moyenne, tandis qu'un écart-type élevé révèle une forte volatilité. En finance, en contrôle qualité industriel comme en recherche scientifique, cet indicateur quantifie la précision d'une mesure et l'ampleur du risque.

## Les Formules Mathématiques : Population vs Échantillon

Le calcul de l'écart-type dépend d'une distinction méthodologique essentielle : analysez-vous l'intégralité des individus d'un groupe exhaustif (**la population**) ou seulement un sous-ensemble représentatif extrait de ce groupe (**un échantillon**) ?

### 1. Écart-Type de la Population ($\sigma$)
Lorsque vous disposez de toutes les observations sans exception, la variance $\sigma^2$ et l'écart-type $\sigma$ (lettre grecque *sigma*) se calculent en divisant par l'effectif total $N$ :

$$\sigma = \sqrt{\sigma^2} = \sqrt{\frac{\sum_{i=1}^{N} (x_i - \mu)^2}{N}}$$

### 2. Écart-Type de l'Échantillon ($s$)
Lorsque vos données constituent un échantillon servant à estimer une population plus vaste, on applique la **correction de Bessel** en divisant par $n - 1$ degrés de liberté :

$$s = \sqrt{s^2} = \sqrt{\frac{\sum_{i=1}^{n} (x_i - \bar{x})^2}{n - 1}}$$

### 3. Coefficient de Variation ($CV$) et Cote Standard ($Z$)
Pour évaluer la dispersion relative ou situer une observation individuelle par rapport à la moyenne, on utilise deux formules complémentaires :

$$CV = \left(\frac{s}{\bar{x}}\right) \times 100\ \% \qquad \text{et} \qquad Z = \frac{x_i - \mu}{\sigma}$$

### Définition des Variables
* **$\sigma$ et $s$ :** Respectivement l'écart-type de la population entière et l'écart-type non biaisé de l'échantillon.
* **$\sigma^2$ et $s^2$ :** Respectivement la variance de la population et celle de l'échantillon (en unités au carré).
* **$x_i$ :** Valeur numérique de la $i$-ème observation individuelle.
* **$\mu$ et $\bar{x}$ :** Moyenne arithmétique de la population ($\mu = \frac{\sum x_i}{N}$) et moyenne de l'échantillon ($\bar{x} = \frac{\sum x_i}{n}$).
* **$N$ et $n$ :** Effectif total de la population et taille de l'échantillon observé.
* **$n - 1$ :** Nombre de degrés de liberté de l'échantillon, corrigeant le biais de sous-estimation de la variance.

## Exemple de Calcul Résolu Étape par Étape

Considérons un laboratoire d'agronomie qui mesure le rendement (en quintaux par hectare) sur un échantillon de **$n = 6$ parcelles expérimentales** :

$$\text{Série de données : } [42,\ 48,\ 50,\ 54,\ 57,\ 61]$$

### Étape 1 : Calculer la moyenne arithmétique de l'échantillon ($\bar{x}$)
On additionne les six valeurs puis on divise par l'effectif $n = 6$ :

$$\bar{x} = \frac{42 + 48 + 50 + 54 + 57 + 61}{6} = \frac{312}{6} = 52\text{ q/ha}$$

### Étape 2 : Calculer l'écart à la moyenne ($x_i - \bar{x}$) pour chaque observation
On soustrait la moyenne ($52$) à chacune des six valeurs :
* $42 - 52 = -10$
* $48 - 52 = -4$
* $50 - 52 = -2$
* $54 - 52 = +2$
* $57 - 52 = +5$
* $61 - 52 = +9$

La somme des écarts simples vaut $(-10) + (-4) + (-2) + 2 + 5 + 9 = 0$, confirmant l'exactitude de la moyenne.

### Étape 3 : Élever chaque écart au carré $(x_i - \bar{x})^2$ et calculer la somme
La mise au carré supprime les signes négatifs et amplifie les grands écarts :
* $(-10)^2 = 100$
* $(-4)^2 = 16$
* $(-2)^2 = 4$
* $(+2)^2 = 4$
* $(+5)^2 = 25$
* $(+9)^2 = 81$

La somme des carrés des écarts s'élève à :

$$\sum_{i=1}^{6} (x_i - \bar{x})^2 = 100 + 16 + 4 + 4 + 25 + 81 = \mathbf{230}$$

### Étape 4 : Déterminer la variance ($s^2$) et l'écart-type de l'échantillon ($s$)
On divise la somme des carrés par $n - 1 = 5$ puis on extrait la racine carrée :

$$s^2 = \frac{230}{5} = 46\text{ (q/ha)}^2 \qquad \implies \qquad s = \sqrt{46} \approx \mathbf{6,782\text{ q/ha}}$$

Si ces $6$ parcelles avaient constitué toute la population, la division par $N = 6$ aurait donné $\sigma^2 \approx 38,33$ et $\sigma \approx 6,191\text{ q/ha}$. Le coefficient de variation de l'échantillon s'établit à $CV = \frac{6,782}{52} \times 100 \approx \mathbf{13,04\ \%}$.

## Tableau de Référence : Intervalles de la Loi Normale et Règle Empirique

Pour une distribution normale symétrique (courbe de Gauss), l'écart-type détermine la proportion exacte d'observations comprises autour de la moyenne :

| Intervalle autour de la Moyenne | Proportion des Données (Loi Normale) | Probabilité Hors Intervalle | Fréquence d'Observation | Interprétation Statistique et Contrôle Qualité |
| :--- | :--- | :--- | :--- | :--- |
| **$\mu \pm 1\sigma$** | $68,27\ \%$ | $31,73\ \%$ ($\approx 1$ sur $3$) | Courant | Zone de variation habituelle (noyau central) |
| **$\mu \pm 1,96\sigma$** | $95,00\ \%$ | $5,00\ \%$ ($1$ sur $20$) | Seuil critique standard | Intervalle de confiance classique à $95\ \%$ |
| **$\mu \pm 2\sigma$** | $95,45\ \%$ | $4,55\ \%$ ($\approx 1$ sur $22$) | Peu fréquent | Limite d'alerte dans les tests scientifiques |
| **$\mu \pm 2,58\sigma$** | $99,00\ \%$ | $1,00\ \%$ ($1$ sur $100$) | Rare | Intervalle de confiance de haute sécurité ($99\ \%$) |
| **$\mu \pm 3\sigma$** | $99,73\ \%$ | $0,27\ \%$ ($\approx 1$ sur $370$) | Très rare (anomalie) | Seuil de maîtrise statistique des procédés |
| **$\mu \pm 6\sigma$** | $99,9999998\ \%$ | $0,0000002\ \%$ ($2$ par milliard) | Quasi impossible | Norme industrielle de haute précision |

## Quand Privilégier d'Autres Mesures de Dispersion ?

Bien que l'écart-type soit le pilier de l'inférence statistique, il convient de lui associer d'autres paramètres dans deux cas :

1. **Distributions fortement asymétriques (revenus, immobilier) :** Le couple **médiane / écart interquartile ($Q_3 - Q_1$)** décrit les $50\ \%$ centraux sans être déformé par les valeurs extrêmes.
2. **Séries comportant une valeur aberrante :** L'**écart absolu moyen**, qui calcule la moyenne des distances $|x_i - \bar{x}|$ sans mise au carré, offre une lecture linéaire plus robuste.
