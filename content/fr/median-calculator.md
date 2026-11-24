---
title: "Calculatrice de Médiane – Trouvez la Médiane avec des Solutions Étape par Étape"
metaTitle: "Calculatrice de Médiane | Quartiles, EIQ et Centiles"
description: "Calculez la médiane, les quartiles (Q1, Q3), l'écart interquartile (EIQ), les centiles, le résumé en cinq nombres et les valeurs aberrantes de Tukey."
metaDescription: "Calculez la médiane, les quartiles Q1 et Q3, l'écart interquartile (EIQ), les centiles et les valeurs aberrantes sur données brutes ou groupées."
metaKeywords: "calculatrice de médiane, calcul médiane, quartiles Q1 Q3, écart interquartile EIQ, résumé en cinq nombres, boîte à moustaches, valeurs aberrantes Tukey, données groupées"
faqs:
  - question: "Quelle différence sépare le calcul de la médiane pour un effectif pair ou impair ?"
    answer: "Après tri par ordre croissant, lorsque l'effectif n est impair, la médiane correspond exactement à l'observation située au rang central (n + 1) / 2. Lorsque n est pair, il n'existe pas d'élément unique au milieu : la médiane s'obtient en prenant la moyenne arithmétique des deux valeurs centrales, situées aux rangs n / 2 et (n / 2) + 1. Elle peut donc être une valeur intermédiaire absente de la série initiale."
  - question: "Pourquoi préférer la médiane à la moyenne pour analyser des salaires ou des prix immobiliers ?"
    answer: "Les revenus en euros, les patrimoines et les prix au m² présentent une forte asymétrie à droite, avec quelques valeurs extrêmement élevées qui gonflent artificiellement la moyenne arithmétique. La médiane possède un point de rupture de 50 % : remplacer la plus grande observation par un montant dix fois supérieur ne la modifie pas d'un centime, ce qui reflète bien mieux le niveau typique auquel est confrontée la moitié de la population."
  - question: "Comment la calculatrice détermine-t-elle les quartiles Q1, Q3 et les centiles ?"
    answer: "Notre calculatrice trie la série puis applique l'interpolation linéaire continue (identique à la fonction CENTILE.INCLURE des tableurs et au type 7 de R) : la position d'indice zéro vaut pos = (n - 1) × p / 100, puis la valeur est interpolée linéairement entre les deux observations encadrantes. Cette méthode explique pourquoi Q1 et Q3 peuvent différer légèrement sur de petits échantillons par rapport à la méthode discrète des demi-séries enseignée au lycée."
  - question: "Comment la règle de Tukey identifie-t-elle les valeurs aberrantes à partir de l'écart interquartile ?"
    answer: "À partir de l'écart interquartile (EIQ = Q3 - Q1), la règle de Tukey trace deux clôtures internes : la borne inférieure Q1 - 1,5 × EIQ et la borne supérieure Q3 + 1,5 × EIQ. Toute observation située hors de cet intervalle est signalée comme valeur aberrante potentielle (et comme aberrante extrême au-delà de 3 × EIQ). Contrairement aux seuils fondés sur l'écart-type, ces clôtures résistent elles-mêmes aux anomalies qu'elles cherchent à détecter."
  - question: "Peut-on obtenir une médiane exacte à partir d'un tableau de données groupées par classes ?"
    answer: "Non, car le regroupement en intervalles efface les valeurs individuelles à l'intérieur de chaque classe. La calculatrice repère d'abord la classe médiane — la première dont l'effectif cumulé atteint ou dépasse N / 2 — puis estime la médiane par interpolation linéaire : Me ≈ L + ((N / 2 - F) / f) × w. Cette approximation suppose que les observations se répartissent de manière uniforme au sein de la classe médiane."
---

La **médiane** est l'indicateur central de référence en statistique robuste. Elle divise toute série numérique triée en deux moitiés égales : au moins $50\,\%$ des valeurs lui sont inférieures ou égales et au moins $50\,\%$ lui sont supérieures ou égales. Là où une seule valeur extrême déplace fortement la moyenne arithmétique, la médiane reste stable. C'est pourquoi l'INSEE, Statbel, l'OFS ou Statistique Canada privilégient le revenu médian, le prix immobilier médian et les délais médians.

Notre calculatrice traite les **données brutes**, les **tableaux d'effectifs** et les **données groupées par classes**. Elle renvoie instantanément la **médiane ($Q_2$)**, les **quartiles ($Q_1$, $Q_3$)**, l'**écart interquartile (EIQ)**, les **centiles**, le **résumé en cinq nombres**, les **clôtures de Tukey** et les indicateurs complémentaires (moyenne, mode, écart-type, asymétrie).

## Formules de la médiane, des quartiles et des données groupées

Soit une série de $n$ observations triées par ordre croissant : $x_{(1)} \le x_{(2)} \le \dots \le x_{(n)}$.

**1. Médiane d'une série brute** :

$$Me = \begin{cases} x_{\left(\frac{n+1}{2}\right)} & \text{si } n \text{ est impair} \\ \dfrac{x_{(n/2)} + x_{(n/2 + 1)}}{2} & \text{si } n \text{ est pair} \end{cases}$$

**2. Centiles, quartiles et clôtures de Tukey** (interpolation linéaire `CENTILE.INCLURE` / type 7) :

Pour un centile $p \in [0 \,;\, 100]$, le rang continu vaut $r = 1 + \frac{p}{100}(n - 1)$ et la valeur interpolée s'écrit :

$$P_p = x_{(\lfloor r \rfloor)} + (r - \lfloor r \rfloor)\,\bigl(x_{(\lfloor r \rfloor + 1)} - x_{(\lfloor r \rfloor)}\bigr)$$

On en déduit $Q_1 = P_{25}$, $Q_2 = Me = P_{50}$, $Q_3 = P_{75}$, l'écart interquartile **$\text{EIQ} = Q_3 - Q_1$** et les clôtures de Tukey $[Q_1 - 1{,}5\,\text{EIQ} \,;\, Q_3 + 1{,}5\,\text{EIQ}]$.

**3. Estimation sur données groupées** (interpolation dans la classe médiane) :

$$Me \approx L + \left(\frac{\frac{N}{2} - F}{f}\right) \times w$$

* **$x_{(k)}$ et $n$ (ou $N$)** : $k$-ième valeur ordonnée et effectif total.
* **$L$** : borne inférieure de la classe médiane (première classe atteignant un effectif cumulé $\ge N / 2$).
* **$F$, $f$ et $w$** : effectif cumulé strictement avant la classe médiane, effectif et amplitude de cette classe.

## Exemples chiffrés : marché immobilier et données groupées

**Cas 1 — Série brute avec valeur aberrante** : Un observatoire relève **$n = 10$ transactions** (en `€/m²`), saisies dans le désordre : `3 600, 3 100, 7 950, 3 450, 3 250, 3 900, 3 500, 4 100, 3 400, 3 750`.

1. **Tri croissant** : `3 100, 3 250, 3 400, 3 450, 3 500, 3 600, 3 750, 3 900, 4 100, 7 950`.
2. **Médiane ($n = 10$, pair)** : Moyenne des $5^{\text{e}}$ et $6^{\text{e}}$ valeurs :
   $$Me = \frac{3\,500 + 3\,600}{2} = \mathbf{3\,550\text{ €/m²}}$$
   La somme atteint $40\,000\text{ €/m²}$, soit une moyenne de **$4\,000\text{ €/m²}$** ($+450\text{ €/m²}$, ou **$+12{,}68\,\%$** au-dessus de $Me$), gonflée par le bien à `7 950 €/m²`.
3. **Quartiles par interpolation** :
   * **$Q_1$ ($p = 25$)** : $r = 1 + 0{,}25 \times 9 = 3{,}25 \Rightarrow 3\,400 + 0{,}25 \times (3\,450 - 3\,400) = \mathbf{3\,412{,}5\text{ €/m²}}$.
   * **$Q_3$ ($p = 75$)** : $r = 1 + 0{,}75 \times 9 = 7{,}75 \Rightarrow 3\,750 + 0{,}75 \times (3\,900 - 3\,750) = \mathbf{3\,862{,}5\text{ €/m²}}$.
4. **EIQ et résumé en cinq nombres** : $\text{EIQ} = 3\,862{,}5 - 3\,412{,}5 = \mathbf{450\text{ €/m²}}$, soit le résumé `(3 100 ; 3 412,5 ; 3 550 ; 3 862,5 ; 7 950)`.
5. **Clôtures de Tukey** : Borne inférieure $= 3\,412{,}5 - 675 = \mathbf{2\,737{,}5\text{ €/m²}}$ ; borne supérieure $= 3\,862{,}5 + 675 = \mathbf{4\,537{,}5\text{ €/m²}}$. La valeur `7 950 €/m²` dépasse `4 537,5 €/m²` (et la clôture extrême $5\,212{,}5\text{ €/m²}$) : elle est confirmée comme valeur aberrante.

**Cas 2 — Données groupées** : Une clinique recense **$N = 40$ délais d'attente** (en minutes) : $[0\,; 10[$ (6), $[10\,; 20[$ (12), $[20\,; 30[$ (14) et $[30\,; 40[$ (8). Le rang $N/2 = 20$ tombe dans $[20\,; 30[$ (cumul passant de $F = 18$ à $32$). Avec $L = 20$, $f = 14$ et $w = 10$, on obtient $Me \approx 20 + \frac{20 - 18}{14} \times 10 \approx \mathbf{21{,}43\text{ min}}$.

## Tableau comparatif : médiane, moyenne et mode selon la distribution

| Profil de distribution | Position relative | Centre recommandé | Dispersion associée |
| :--- | :--- | :--- | :--- |
| **Symétrique unimodale** (loi normale) | $\text{Mode} \approx Me \approx \bar{x}$ | Moyenne ou médiane | Écart-type ($s$) |
| **Asymétrique à droite** (salaires, immobilier) | $\text{Mode} < Me < \bar{x}$ | **Médiane** | **Écart interquartile (EIQ)** |
| **Asymétrique à gauche** (notes faciles, usure) | $\bar{x} < Me < \text{Mode}$ | **Médiane** | **Écart interquartile (EIQ)** |
| **Bimodale ou multimodale** (groupes mixtes) | Variable selon les pics | Segmenter les groupes | Résumé par sous-groupe |

## Pièges fréquents et bonnes pratiques d'analyse

* **Confondre tri numérique et tri alphabétique** : Dans certains exports texte, « 1 000 » précède « 200 », ce qui fausse $Me$, $Q_1$ et $Q_3$ ; notre outil convertit et trie numériquement chaque valeur.
* **Supprimer aveuglément toute valeur aberrante** : Une observation hors des clôtures de Tukey peut refléter un segment réel précieux (bien d'exception, pic critique) plutôt qu'une erreur de saisie ; vérifiez toujours sa provenance avant exclusion.
* **Comparer des quartiles de conventions différentes** : Il existe neuf méthodes de calcul des quantiles ; sur moins de 30 valeurs, vérifiez si l'outil comparé applique l'interpolation inclusive (`CENTILE.INCLURE`), exclusive ou les demi-séries.
* **Moyenner des médianes régionales** : La médiane globale d'une population ne se calcule jamais à partir des médianes de ses sous-groupes, même pondérées ; réunissez toujours toutes les observations brutes.
