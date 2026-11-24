---
title: "Calculatrice de Moyenne – Moyenne Arithmétique, Pondérée, Géométrique et Harmonique"
metaTitle: "Calculatrice de Moyenne | Formules et Types de Moyennes"
description: "Calculez les moyennes arithmétique, pondérée, géométrique, harmonique, tronquée et par classes, avec variance, écart-type, médiane et quartiles."
metaDescription: "Calculez les moyennes arithmétique, pondérée, géométrique, harmonique et tronquée avec écart-type, médiane, quartiles et exemples étape par étape."
metaKeywords: "calculatrice de moyenne, moyenne arithmétique, moyenne pondérée, moyenne géométrique, moyenne harmonique, moyenne tronquée, données groupées, statistiques descriptives"
faqs:
  - question: "Quand faut-il choisir la moyenne géométrique plutôt que la moyenne arithmétique ?"
    answer: "La moyenne géométrique s'impose dès que les phénomènes se composent de manière multiplicative au fil du temps : rendements annuels d'un placement en euros, inflation cumulée, croissance démographique ou variation d'un indice boursier. La moyenne arithmétique des taux surestime systématiquement la performance réelle composée, car elle ignore l'asymétrie mécanique des gains et des pertes (une baisse de 20 % exige une hausse de 25 % pour revenir au capital initial)."
  - question: "Pourquoi la moyenne harmonique est-elle indispensable pour calculer une vitesse moyenne sur une distance fixe ?"
    answer: "La vitesse étant le rapport d'une distance sur une durée (v = d / t), un tronçon parcouru plus lentement occupe mécaniquement davantage de temps qu'un tronçon rapide de même longueur. Sur des distances identiques, la moyenne arithmétique accorde à tort un poids égal à chaque vitesse et surestime la vitesse réelle, alors que la moyenne harmonique pondère exactement chaque vitesse par le temps passé et retrouve le quotient distance totale sur durée totale."
  - question: "Que signifie l'inégalité entre moyennes harmonique, géométrique et arithmétique (H ≤ G ≤ x̄) ?"
    answer: "Pour toute série de nombres strictement positifs, la moyenne harmonique est toujours inférieure ou égale à la moyenne géométrique, elle-même inférieure ou égale à la moyenne arithmétique : H ≤ G ≤ x̄. L'égalité stricte n'advient que lorsque toutes les valeurs de la série sont rigoureusement identiques. Plus la dispersion des observations augmente, plus l'écart entre ces trois moyennes pythagoriciennes se creuse."
  - question: "À quoi sert une moyenne tronquée par rapport à la moyenne arithmétique classique ?"
    answer: "Une moyenne tronquée à p % écarte les p % de valeurs les plus faibles et les p % de valeurs les plus élevées après tri, puis calcule la moyenne arithmétique des données restantes. Elle offre un compromis robuste entre la moyenne classique (très sensible aux valeurs aberrantes) et la médiane (qui n'exploite que le rang central), ce qui explique son usage en notation sportive, en métrologie et dans les indices d'inflation sous-jacente."
  - question: "Comment la calculatrice estime-t-elle la moyenne à partir de données groupées par classes ?"
    answer: "Lorsque vos données se présentent sous forme d'intervalles avec effectifs (par exemple 10–20 avec 14 observations), les valeurs individuelles exactes ne sont plus accessibles. La calculatrice remplace chaque intervalle [a_k ; b_k] par son centre de classe c_k = (a_k + b_k) / 2, puis applique la formule de la moyenne pondérée par les effectifs f_k. L'estimation suppose que les observations se répartissent uniformément à l'intérieur de chaque classe."
---

Dans le langage courant, parler de « la moyenne » laisse croire qu'une formule unique convient à chaque situation. En statistique appliquée, en finance comme en physique, cette habitude entraîne pourtant des biais sévères : déterminer une vitesse moyenne sur distances égales, un rendement annuel composé ou une note finale à coefficients réclame à chaque fois un opérateur propre. Choisir la moyenne adaptée à la structure de vos mesures — additive, pondérée, multiplicative ou rationnelle — garantit la fiabilité de l'analyse.

Notre calculatrice accepte les **séries brutes**, les **tableaux d'effectifs** et les **données groupées par classes**. Elle délivre aussitôt les **moyennes arithmétique, pondérée, géométrique, harmonique, tronquée et cumulative**, complétées par la médiane, le mode, la variance, l'écart-type, les quartiles, le coefficient de variation, l'asymétrie et les valeurs aberrantes.

## Formules des principales moyennes

Pour $n$ observations $x_1, x_2, \dots, x_n$ exprimées dans une unité SI (`m`, `kg`, `km/h`, `ms`) ou monétaire (`€`, `CHF`, `$ CAD`) :

**1. Moyenne arithmétique** (grandeurs additives) :

$$\bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i$$

**2. Moyenne pondérée** (et données groupées de centres $c_k$ et d'effectifs $f_k$) :

$$\bar{x}_p = \frac{\sum_{i=1}^{n} w_i x_i}{\sum_{i=1}^{n} w_i} \qquad \text{et pour des classes :} \qquad \bar{x} \approx \frac{\sum_{k=1}^{K} f_k c_k}{\sum_{k=1}^{K} f_k}$$

**3. Moyenne géométrique** ($x_i > 0$, facteurs multiplicatifs) :

$$G = \left(\prod_{i=1}^{n} x_i\right)^{\!1/n} = \exp\!\left(\frac{1}{n}\sum_{i=1}^{n}\ln x_i\right)$$

**4. Moyenne harmonique** ($x_i > 0$, vitesses et rapports) :

$$H = \frac{n}{\sum_{i=1}^{n} \frac{1}{x_i}}$$

* **$x_i$ et $n$** : valeur de la $i$-ème observation et effectif total de la série.
* **$w_i$, $c_k$, $f_k$** : poids positif attribué à $x_i$ ; pour une classe $[a_k \,;\, b_k]$, $c_k = (a_k + b_k)/2$ et $f_k$ est son effectif.
* **Moyenne tronquée à $p\,\%$** : moyenne arithmétique obtenue après retrait des $\lfloor n \cdot p / 100 \rfloor$ valeurs extrêmes à chaque bout de la série triée.
* **Inégalité pythagoricienne** : pour toute série strictement positive, **$H \le G \le \bar{x}$**, avec égalité uniquement si toutes les valeurs sont identiques.

## Exemples chiffrés : vitesse, rendement composé et notes pondérées

**Cas 1 — Vitesse moyenne sur distances égales ($H < G < \bar{x}$)** : Un utilitaire effectue 4 tronçons de **$60\text{ km}$** chacun ($240\text{ km}$ au total) aux vitesses de **$40$, $60$, $80$ et $120\text{ km/h}$**.

1. **Vérification physique** : Les durées valent $1{,}50\text{ h}$, $1{,}00\text{ h}$, $0{,}75\text{ h}$ et $0{,}50\text{ h}$, soit **$3{,}75\text{ h}$** ; la vitesse réelle atteint $240 / 3{,}75 = \mathbf{64{,}0\text{ km/h}}$.
2. **Arithmétique** : $\bar{x} = (40 + 60 + 80 + 120) / 4 = \mathbf{75{,}0\text{ km/h}}$ (surestimation de **$+17{,}19\,\%$**).
3. **Géométrique** : $G = (40 \times 60 \times 80 \times 120)^{1/4} = (23\,040\,000)^{1/4} \approx \mathbf{69{,}28\text{ km/h}}$.
4. **Harmonique** :
   $$H = \frac{4}{\frac{1}{40} + \frac{1}{60} + \frac{1}{80} + \frac{1}{120}} = \frac{4}{\frac{15}{240}} = \frac{960}{15} = \mathbf{64{,}0\text{ km/h}}$$
   La moyenne harmonique retrouve exactement la réalité physique, confirmant l'ordre **$64{,}0 < 69{,}28 < 75{,}0$**.

**Cas 2 — Rendement composé (moyenne géométrique)** : Un capital de **$10\,000\text{ €}$** gagne **$+25\,\%$** l'année 1 (facteur $1{,}25$) puis perd **$-20\,\%$** l'année 2 (facteur $0{,}80$). Il revient à $10\,000 \times 1{,}25 \times 0{,}80 = \mathbf{10\,000\text{ €}}$ (rendement composé exact $= 0{,}0\,\%$). La moyenne arithmétique des taux indique à tort $(+25 - 20)/2 = \mathbf{+2{,}5\,\%}$, tandis que la moyenne géométrique donne $\sqrt{1{,}25 \times 0{,}80} - 1 = \mathbf{0{,}0\,\%}$.

**Cas 3 — Pondérée et tronquée** : Trois notes de $14/20$ (coeff. $2$), $11/20$ (coeff. $1$) et $16/20$ (coeff. $3$) donnent une moyenne pondérée de $(28 + 11 + 48) / 6 = \mathbf{14{,}50/20}$, contre $13{,}67/20$ sans coefficients. Sur 10 latences serveur en millisecondes (`42, 45, 46, 48, 49, 50, 51, 52, 55, 312`), l'anomalie à `312 ms` tire la moyenne arithmétique à **$75{,}0\text{ ms}$**, alors que la moyenne tronquée à $10\,\%$ (retrait de `42` et `312`) revient à $396 / 8 = \mathbf{49{,}5\text{ ms}}$.

## Tableau comparatif : quelle moyenne choisir selon vos données ?

| Type de moyenne | Condition de validité | Sensibilité aux extrêmes | Cas d'usage privilégiés |
| :--- | :--- | :--- | :--- |
| **Arithmétique ($\bar{x}$)** | Toute valeur réelle | Élevée | Grandeurs additives symétriques (masses, notes égales) |
| **Pondérée ($\bar{x}_p$)** | Poids $w_i > 0$, $\sum w_i > 0$ | Proportionnelle au poids | Notes à coefficients, indices de prix, classes |
| **Géométrique ($G$)** | Valeurs strictement positives | Modérée | Rendements composés, croissance, ratios d'indices |
| **Harmonique ($H$)** | Valeurs strictement positives | Forte sur les faibles valeurs | Vitesses à distance égale, débits, score F1 |
| **Tronquée** | Toute valeur réelle ($p < 50\,\%$) | Faible (robuste) | Latences réseau, jurys sportifs, mesures bruitées |

En complément, la **moyenne cumulative** recalcule $\bar{x}_k$ à mesure que chaque nouvelle mesure $x_k$ arrive, ce qui permet de suivre en temps réel la stabilisation d'une ligne de production ou d'un coût moyen mensuel en euros.

## Pièges fréquents et limites d'interprétation

* **Moyenner des moyennes sans pondérer par les effectifs** : Si l'agence A affiche un panier moyen de `120 €` sur 80 ventes et l'agence B `180 €` sur 20 ventes, la moyenne consolidée vaut `132 €` et non `150 €`.
* **Appliquer la moyenne géométrique sur des taux négatifs bruts** : Transformez toujours chaque variation $r_i$ en facteur $(1 + r_i) > 0$, calculez $G$, puis soustrayez $1$.
* **Ignorer l'asymétrie de la distribution** : Sur des salaires ou des prix immobiliers en euros, quelques très hautes valeurs décalent $\bar{x}$ vers le haut ; associez systématiquement la médiane.
* **Lire une moyenne sans sa dispersion** : Deux séries de même moyenne peuvent présenter des risques opposés ; vérifiez toujours l'écart-type $s$ ou l'écart interquartile affichés par la calculatrice.
