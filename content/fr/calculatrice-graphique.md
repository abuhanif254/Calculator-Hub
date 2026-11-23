---
title: "Calculatrice Graphique"
metaTitle: "Calculatrice Graphique en Ligne | Traceur de Fonctions"
description: "Tracez instantanément vos fonctions algébriques, polynomiales, rationnelles et trigonométriques sur un repère cartésien interactif avec fenêtre personnalisable."
metaDescription: "Tracez gratuitement vos fonctions mathématiques sur un repère cartésien : polynômes, asymptotes, courbes trigonométriques, racines et réglages d'axes."
metaKeywords: "calculatrice graphique, traceur de fonctions en ligne, représentation graphique fonction, repère cartésien, étude de courbe, asymptote, fonction trigonométrique, fenêtre graphique"
faqs:
  - question: "Les fonctions trigonométriques utilisent-elles les radians ou les degrés sur une calculatrice graphique ?"
    answer: "En analyse mathématique comme en physique, les fonctions circulaires sin(x), cos(x) et tan(x) évaluent l'argument x en radians, conformément au Système international d'unités (2π rad = 360°). Si vos données sont exprimées en degrés, convertissez l'angle directement dans l'expression en écrivant sin(x * pi / 180) ou réglez votre axe horizontal sur [-6,28 ; 6,28] pour visualiser deux périodes complètes de 2π."
  - question: "Pourquoi la courbe d'une fonction rationnelle affiche-t-elle parfois un trait vertical parasite ?"
    answer: "Lorsqu'un dénominateur s'annule en une valeur interdite (par exemple x = 2 pour f(x) = 1/(x - 2)), la courbe présente une asymptote verticale et passe brutalement de moins l'infini à plus l'infini. Un traceur par échantillonnage discret peut relier le dernier point très négatif au premier point très positif de part et d'autre du pôle : vérifiez toujours le domaine de définition pour distinguer cette discontinuité d'un véritable segment de courbe."
  - question: "Quelle différence y a-t-il entre log(x) et ln(x) lors de la saisie d'une expression ?"
    answer: "La notation ln(x) désigne le logarithme népérien de base e (environ 2,71828), omniprésent en calcul différentiel et en croissance continue, tandis que log(x) correspond au logarithme décimal de base 10 utilisé en acoustique (décibels), en chimie (pH) et sur les échelles de magnitude. Les deux fonctions ne sont définies que pour x strictement positif et vérifient log(x) = ln(x) / ln(10)."
  - question: "Comment régler la fenêtre d'affichage si aucune courbe n'apparaît à l'écran ?"
    answer: "Commencez par évaluer mentalement l'ordonnée à l'origine f(0) ou l'ordre de grandeur de la fonction sur votre intervalle. Une parabole translatée comme x^2 + 25 reste au-dessus d'une fenêtre limitée à Y max = 10, tandis que sqrt(x - 12) n'existe que pour x supérieur ou égal à 12. Élargissez d'abord les bornes X min, X max, Y min et Y max, puis resserrez progressivement autour de la zone d'intérêt."
  - question: "Peut-on déterminer graphiquement les racines et les extrema d'une fonction ?"
    answer: "Oui : les racines réelles d'une équation f(x) = 0 correspondent exactement aux points d'intersection entre la courbe et l'axe des abscisses, tandis que les maxima et minima locaux apparaissent aux sommets où la tangente devient horizontale (dérivée nulle avec changement de signe). En zoomant sur un intervalle étroit autour d'un point critique, vous lisez une approximation au centième près, qu'il convient ensuite de confirmer par le calcul algébrique."
---

La représentation graphique d'une fonction transforme une expression symbolique en objet géométrique immédiatement lisible. Du lycée en France au cégep au Québec, en passant par l'enseignement secondaire en Belgique, la maturité en Suisse et les écoles d'ingénieurs, la **calculatrice graphique** relie l'algèbre, l'analyse et la physique sur un repère cartésien $(O ; \vec{i}, \vec{j})$.

Sur une fenêtre réglable $[X_{\min} ; X_{\max}] \times [Y_{\min} ; Y_{\max}]$, elle permet de repérer instantanément les racines, les variations, les extrema locaux, la périodicité et les asymptotes avant d'engager une étude formelle.

## Équations du Repère Cartésien et Échantillonnage

### 1. Courbe représentative et unités
Pour une fonction numérique $f$ définie sur un domaine $\mathcal{D}_f \subset \mathbb{R}$, sa courbe représentative $\mathcal{C}_f$ regroupe tous les points du plan cartésien vérifiant :

$$\mathcal{C}_f = \left\{ (x, y) \in \mathbb{R}^2 \;\middle|\; x \in \mathcal{D}_f \text{ et } y = f(x) \right\}$$

L'abscisse $x$ représente la variable indépendante (temps en secondes $\text{s}$, distance en mètres $\text{m}$ ou nombre réel) et l'ordonnée $y = f(x)$ la grandeur image. Pour les fonctions circulaires, l'angle $x$ est exprimé en **radians** ($\text{rad}$), unité du Système international.

### 2. Projection sur le canevas et pas de calcul
Pour tracer l'intervalle $[X_{\min} ; X_{\max}] \times [Y_{\min} ; Y_{\max}]$ sur un canevas de largeur $L$ et de hauteur $H$ (en pixels), le traceur applique deux transformations affines :

$$p_x = \frac{x - X_{\min}}{X_{\max} - X_{\min}} \times L \qquad \text{et} \qquad p_y = \left(1 - \frac{y - Y_{\min}}{Y_{\max} - Y_{\min}}\right) \times H$$

La courbe est ensuite évaluée selon un pas horizontal constant $\Delta x = \frac{X_{\max} - X_{\min}}{N}$, où $N$ est le nombre de subdivisions ($N \ge L$). Resserrer la fenêtre réduit $\Delta x$ et affine la lecture autour d'une intersection.

### 3. Formes canoniques de référence
- **Second degré** : $f(x) = ax^2 + bx + c = a(x - \alpha)^2 + \beta$, de sommet $S(\alpha ; \beta)$ avec $\alpha = -\frac{b}{2a}$ et $\beta = f(\alpha)$.
- **Sinusoïde** : $f(x) = A \sin(\omega x + \varphi) + d$, d'amplitude $A$, de pulsation $\omega$ (en $\text{rad}\cdot\text{s}^{-1}$), de période $T = \frac{2\pi}{\omega}$ et de phase $\varphi$.

## Étude Pas à Pas : Trajectoire Parabolique et Racines

Étudions la fonction modélisant la hauteur $y$ (en $\text{m}$) d'un projectile selon sa distance horizontale $x$ (en $\text{m}$) :

$$f(x) = -0{,}5x^2 + 3x + 3{,}5$$

Après saisie de `-0.5*x^2 + 3*x + 3.5`, vérifions chaque point remarquable :

1. **Ordonnée à l'origine** : $f(0) = 3{,}5\text{ m}$, soit le point de lancement $(0 ; 3{,}5)$.
2. **Sommet (maximum)** : puisque $a = -0{,}5 < 0$, la parabole admet un maximum en $\alpha = -\frac{3}{2(-0{,}5)} = \mathbf{3\text{ m}}$. La flèche maximale vaut $\beta = f(3) = -0{,}5(9) + 9 + 3{,}5 = \mathbf{8{,}0\text{ m}}$, point où la dérivée $f'(x) = -x + 3$ s'annule.
3. **Racines réelles ($f(x) = 0$)** : le discriminant vaut $\Delta = 3^2 - 4(-0{,}5)(3{,}5) = 16$ ($\sqrt{\Delta} = 4$), d'où :
   $$x_1 = \frac{-3 + 4}{-1} = \mathbf{-1\text{ m}} \qquad \text{et} \qquad x_2 = \frac{-3 - 4}{-1} = \mathbf{7\text{ m}}$$
   Pour $x \ge 0$, l'impact au sol survient exactement à $7{,}0\text{ m}$, avec une pente initiale $f'(0) = 3$ (angle $\arctan(3) \approx 71{,}57°$).
4. **Cadrage optimal** : une fenêtre $X \in [-2 ; 8]$ et $Y \in [-2 ; 10]$ englobe les deux racines et le sommet. Sur un canevas de $800 \times 600\text{ px}$, le pas vaut $\Delta x = 0{,}0125\text{ m}$ et le sommet $S(3 ; 8)$ se place au pixel $(400 ; 100)$.

## Table de Référence : Fonctions Usuelles et Fenêtres Conseillées

| Famille | Syntaxe type | Domaine $\mathcal{D}_f$ | Fenêtre ($X$ ; $Y$) | Propriétés et singularités |
| :--- | :--- | :--- | :--- | :--- |
| **Affine** | `2*x - 3` | $\mathbb{R}$ | $[-10 ; 10]$ ; $[-10 ; 10]$ | Pente constante $a$, zéro en $-b/a$ |
| **Quadratique** | `x^2 - 4*x + 3` | $\mathbb{R}$ | $[-2 ; 6]$ ; $[-3 ; 10]$ | Axe $x = \alpha$, sommet $S(\alpha ; \beta)$ |
| **Cubique** | `x^3 - 3*x` | $\mathbb{R}$ | $[-4 ; 4]$ ; $[-10 ; 10]$ | Point d'inflexion en $f''(x) = 0$ |
| **Rationnelle** | `1/(x - 2)` | $\mathbb{R} \setminus \{2\}$ | $[-4 ; 8]$ ; $[-6 ; 6]$ | Asymptotes $x = 2$ et $y = 0$ |
| **Racine carrée** | `sqrt(x)` | $[0 ; +\infty[$ | $[-1 ; 16]$ ; $[-1 ; 5]$ | Tangente verticale en $0$, concave |
| **Logarithme** | `ln(x)`, `log(x)` | $]0 ; +\infty[$ | $[-1 ; 12]$ ; $[-4 ; 4]$ | Zéro en $(1 ; 0)$, asymptote $x = 0^+$ |
| **Trigonométrique** | `sin(x)`, `tan(x)` | $\mathbb{R}$ (hors pôles) | $[-6{,}28 ; 6{,}28]$ ; $[-3 ; 3]$ | Période $2\pi$ ou $\pi$, argument en $\text{rad}$ |

## Bonnes Pratiques de Tracé et Pièges Fréquents

- **Soigner les parenthèses et priorités** : `1/x+2` trace $\frac{1}{x} + 2$ et non $\frac{1}{x+2}$ (`1/(x+2)`). De même, `-x^2` vaut $-(x^2)$, alors que le carré de $-x$ s'écrit `(-x)^2`.
- **Surveiller la déformation d'échelle** : un repère non orthonormé ($X \in [-5 ; 5]$ contre $Y \in [-50 ; 50]$) écrase les pentes d'un facteur $10$ et fausse la perpendicularité visuelle ($m_1 \cdot m_2 = -1$).
- **Prévenir le repliement de fréquence** : pour une onde rapide comme $\sin(40x)$ sur $[-10 ; 10]$ (période $T \approx 0{,}157$), un pas $\Delta x$ trop large crée de fausses oscillations lentes. Réduisez l'intervalle $X$ pour révéler la courbe exacte.
- **Vérifier le domaine avant de conclure** : une zone vide signale souvent une restriction d'existence ($\sqrt{x}$ ou $\ln(x)$ pour $x < 0$) ; confirmez toujours les asymptotes et limites par le calcul analytique.
