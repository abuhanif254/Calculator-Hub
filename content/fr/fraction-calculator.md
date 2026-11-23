---
title: "Calculatrice de Fractions"
metaTitle: "Calculatrice de Fractions : Calcul, PGCD et Simplification"
description: "Additionnez, soustrayez, multipliez et divisez des fractions et nombres fractionnaires avec mise au dénominateur commun et simplification irréductible automatique."
metaDescription: "Résolvez addition, soustraction, multiplication et division de fractions et nombres mixtes. Simplification irréductible par PGCD, PPCM et décimaux exacts."
metaKeywords: "calculatrice de fractions, additionner des fractions, diviser des fractions, simplifier une fraction irréductible, dénominateur commun PPCM, PGCD algorithme d'Euclide, nombres fractionnaires"
faqs:
  - question: "Quelle est la différence entre une fraction propre, une fraction impropre et un nombre fractionnaire ?"
    answer: "Une fraction propre possède un numérateur strictement inférieur au dénominateur en valeur absolue (par exemple 3/4, inférieure à 1). Une fraction impropre a un numérateur supérieur ou égal au dénominateur (comme 11/4) et peut s'écrire sous la forme d'un nombre fractionnaire (ou nombre mixte), combinant une partie entière et une fraction propre (2 3/4)."
  - question: "Pourquoi faut-il un dénominateur commun pour additionner des fractions, mais pas pour les multiplier ?"
    answer: "Additionner ou soustraire des fractions revient à regrouper des parts de même taille : tant que les dénominateurs diffèrent, les unités de partage ne sont pas comparables, ce qui impose de passer par le plus petit commun multiple (PPCM). La multiplication correspond en revanche à prendre une fraction d'une autre fraction, ce qui s'opère directement produit par produit entre numérateurs et dénominateurs."
  - question: "Comment rendre une fraction irréductible grâce au PGCD et à l'algorithme d'Euclide ?"
    answer: "Une fraction est irréductible lorsque son numérateur et son dénominateur n'ont plus aucun diviseur commun supérieur à 1. Pour y parvenir sans tâtonner, l'algorithme d'Euclide effectue des divisions euclidiennes successives afin de trouver le Plus Grand Commun Diviseur (PGCD), puis divise simultanément le numérateur et le dénominateur par ce PGCD."
  - question: "Comment savoir si une fraction irréductible possède une écriture décimale finie ou périodique ?"
    answer: "Une fois la fraction réduite sous forme irréductible, son écriture décimale est exacte et finie si et seulement si la décomposition en facteurs premiers de son dénominateur ne contient que des puissances de 2 et de 5 (comme 4, 8, 10, 16 ou 20). La présence de tout autre facteur premier (3, 7, 11, 13...) entraîne nécessairement un développement décimal périodique infini."
  - question: "Comment convertir correctement un nombre fractionnaire négatif comme -2 3/4 en fraction impropre ?"
    answer: "Le signe moins porte sur la totalité du nombre fractionnaire, c'est-à-dire sur la somme de la partie entière et de la partie fractionnaire. Il faut donc calculer -(2 × 4 + 3)/4 = -11/4, et non (-2 × 4 + 3)/4 = -5/4, qui est l'erreur de signe la plus répandue."
---

## Arithmétique des Fractions : Structure, Formes et Exactitude

Une fraction $\frac{a}{b}$ représente le quotient exact de deux entiers relatifs : le **numérateur** $a$ (nombre de parts retenues) et le **dénominateur** $b \neq 0$ (nombre de parts égales constituant l'unité). Cet ensemble forme le corps des nombres rationnels $\mathbb{Q}$. On distingue les **fractions propres** ($|a| < |b|$, comprises entre $-1$ et $1$), les **fractions impropres** ($|a| \ge |b|$) et les **nombres fractionnaires** — ou nombres mixtes — associant une partie entière et une fraction propre, comme $2\,\frac{5}{12}$.

Au-delà de l'algèbre scolaire, le calcul rationnel demeure indispensable dès que la précision exacte prime sur l'approximation décimale. En menuiserie, en usinage, en pâtisserie professionnelle ou en métrologie, des quantités telles que $\frac{1}{3}$, $\frac{5}{12}$ ou $\frac{11}{15}$ possèdent un développement décimal infini : les conserver sous forme de fractions jusqu'au résultat final évite toute dérive d'arrondi cumulatif.

## Formules Algébriques des Quatre Opérations et de la Simplification

Les opérations sur deux fractions $\frac{a}{b}$ et $\frac{c}{d}$ ($b \neq 0$, $d \neq 0$) suivent des lois algébriques exactes. Un nombre fractionnaire $e\,\frac{n}{d}$ ($d > 0$, $0 \le n < d$) est d'abord converti en fraction impropre :

$$e\,\frac{n}{d} = \operatorname{sgn}(e) \times \frac{|e| \cdot d + n}{d}$$

### Addition, soustraction, multiplication et division

$$\frac{a}{b} \pm \frac{c}{d} = \frac{a \cdot d \pm c \cdot b}{b \cdot d}$$

Pour manipuler des entiers réduits lors d'une addition ou d'une soustraction, on utilise le **plus petit dénominateur commun**, donné par le plus petit commun multiple $\operatorname{PPCM}(|b|, |d|) = \frac{|b \cdot d|}{\operatorname{PGCD}(|b|, |d|)}$. Pour la multiplication et la division (règle de l'inverse pour $c \neq 0$) :

$$\frac{a}{b} \times \frac{c}{d} = \frac{a \cdot c}{b \cdot d} \qquad \text{et} \qquad \frac{a}{b} \div \frac{c}{d} = \frac{a}{b} \times \frac{d}{c} = \frac{a \cdot d}{b \cdot c}$$

### Simplification irréductible par le PGCD

Pour réduire un quotient brut $\frac{p}{q}$ ($q > 0$) à son unique forme irréductible, on détermine $g = \operatorname{PGCD}(|p|, q)$ grâce à l'algorithme d'Euclide, puis on simplifie :

$$\frac{p_{\text{irréductible}}}{q_{\text{irréductible}}} = \frac{p \div g}{q \div g}$$

* **$a, c \in \mathbb{Z}$** : numérateurs entiers relatifs des deux opérandes.
* **$b, d \in \mathbb{Z}^*$** : dénominateurs non nuls (toute division par zéro est mathématiquement impossible).
* **$g = \operatorname{PGCD}(|p|, q)$** : plus grand entier positif divisant à la fois le numérateur et le dénominateur.

## Exemple Résolu Pas à Pas : Addition et Division de Nombres Fractionnaires

Un technicien d'atelier raccorde deux rails métalliques mesurant $2\,\frac{5}{12}\text{ m}$ et $1\,\frac{11}{15}\text{ m}$, puis découpe l'ensemble en tronçons égaux de $\frac{5}{6}\text{ m}$.

1. **Conversion en fractions impropres** :
   $$2\,\frac{5}{12} = \frac{2 \times 12 + 5}{12} = \frac{29}{12}\text{ m} \qquad \text{et} \qquad 1\,\frac{11}{15} = \frac{1 \times 15 + 11}{15} = \frac{26}{15}\text{ m}$$
2. **Plus petit dénominateur commun via le PPCM** :
   Comme $\operatorname{PGCD}(12, 15) = 3$, le plus petit commun multiple vaut $\operatorname{PPCM}(12, 15) = \frac{12 \times 15}{3} = 60$.
3. **Addition au dénominateur commun $60$** :
   $$\frac{29 \times 5}{12 \times 5} + \frac{26 \times 4}{15 \times 4} = \frac{145}{60} + \frac{104}{60} = \frac{249}{60}\text{ m}$$
4. **Simplification par l'algorithme d'Euclide** :
   Les divisions euclidiennes successives donnent $249 = 4 \times 60 + 9$, $60 = 6 \times 9 + 6$, $9 = 1 \times 6 + 3$ et $6 = 2 \times 3 + 0$, d'où $\operatorname{PGCD}(249, 60) = 3$. La longueur totale irréductible est :
   $$\frac{249 \div 3}{60 \div 3} = \frac{83}{20}\text{ m} = 4\,\frac{3}{20}\text{ m} = \mathbf{4{,}15\text{ m}}$$
   Bien que les deux mesures initiales ($\frac{29}{12} \approx 2{,}4167\text{ m}$ et $\frac{26}{15} \approx 1{,}7333\text{ m}$) soient des décimaux périodiques infinis, leur somme exacte tombe sur un décimal fini.
5. **Division en tronçons de $\frac{5}{6}\text{ m}$** :
   $$\frac{83}{20} \div \frac{5}{6} = \frac{83}{20} \times \frac{6}{5} = \frac{498}{100} = \frac{249}{50} = 4\,\frac{49}{50} = \mathbf{4{,}98\text{ tronçons}}$$
   On obtient $4$ tronçons complets de $\frac{5}{6}\text{ m}$ et une chute exacte de $\frac{49}{50} \times \frac{5}{6} = \frac{49}{60}\text{ m}$ (environ $0{,}8167\text{ m}$).

## Tableau de Référence des Fractions Usuelles et Correspondances SI

| Fraction | Facteurs Premiers | Décimal | Pourcentage | Nature Décimale | Équivalent en $\text{mm}$ ($1\text{ po} = 25{,}4\text{ mm}$) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **$\frac{1}{2}$** | $2$ | $0{,}5$ | $50{,}00\,\%$ | Fini exact | $12{,}7000\text{ mm}$ |
| **$\frac{1}{3}$** | $3$ | $0{,}\overline{3}$ | $33{,}33\,\%$ | Périodique infini | $\approx 8{,}4667\text{ mm}$ |
| **$\frac{1}{4}$** | $2^2$ | $0{,}25$ | $25{,}00\,\%$ | Fini exact | $6{,}3500\text{ mm}$ |
| **$\frac{1}{5}$** | $5$ | $0{,}2$ | $20{,}00\,\%$ | Fini exact | $5{,}0800\text{ mm}$ |
| **$\frac{1}{6}$** | $2 \times 3$ | $0{,}1\overline{6}$ | $16{,}67\,\%$ | Périodique infini | $\approx 4{,}2333\text{ mm}$ |
| **$\frac{1}{8}$** | $2^3$ | $0{,}125$ | $12{,}50\,\%$ | Fini exact | $3{,}1750\text{ mm}$ |
| **$\frac{1}{12}$** | $2^2 \times 3$ | $0{,}08\overline{3}$ | $8{,}33\,\%$ | Périodique infini | $\approx 2{,}1167\text{ mm}$ |
| **$\frac{1}{16}$** | $2^4$ | $0{,}0625$ | $6{,}25\,\%$ | Fini exact | $1{,}5875\text{ mm}$ |

## Astuces de Calcul et Erreurs Classiques sur les Fractions

* **N'additionnez jamais les dénominateurs entre eux** : Écrire $\frac{1}{2} + \frac{1}{3} = \frac{2}{5}$ ($0{,}4$) produit un résultat inférieur au premier terme. Seuls les numérateurs s'additionnent après mise au même dénominateur ($\frac{3}{6} + \frac{2}{6} = \frac{5}{6}$).
* **Simplifiez en croix avant de multiplier** : Pour $\frac{14}{25} \times \frac{15}{21}$, divisez d'abord $14$ et $21$ par $7$ puis $15$ et $25$ par $5$ afin de réduire directement à $\frac{2}{5} \times \frac{3}{3} = \frac{2}{5}$, sans calculer $\frac{210}{525}$.
* **Maîtrisez le signe des nombres fractionnaires négatifs** : Dans $-3\,\frac{2}{5}$, le signe porte sur tout le nombre, soit $-\left(3 + \frac{2}{5}\right) = -\frac{17}{5}$, et jamais $-\frac{13}{5}$.
* **Comparez deux fractions sans calculatrice par le produit en croix** : Pour ordonner rapidement deux fractions positives $\frac{a}{b}$ et $\frac{c}{d}$ ayant des dénominateurs différents, il suffit de comparer $a \cdot d$ et $c \cdot b$ ; par exemple, comme $5 \times 11 = 55 > 4 \times 13 = 52$, on conclut immédiatement que $\frac{5}{13}$ dépasse $\frac{4}{11}$ sans calculer leur dénominateur commun $143$.
* **Vérifiez le critère $2^p \times 5^q$** : Pour savoir si un résultat fractionnaire se reporte exactement en millimètres ou en centimes d'euro (€), examinez la factorisation du dénominateur irréductible ; tout autre facteur premier impose de conserver l'écriture fractionnaire jusqu'à la conclusion, puis de n'arrondir qu'au moment de la mesure physique finale.
