---
title: "Calculatrice Scientifique"
metaTitle: "Calculatrice Scientifique en Ligne : Trigo, Log et RAD/DEG"
description: "Effectuez des calculs scientifiques avancés avec fonctions trigonométriques, logarithmes, puissances, racines carrées, constantes π et e, en radians ou degrés."
metaDescription: "Calculez expressions imbriquées, trigonométrie (sin, cos, tan en RAD/DEG), logarithmes (ln, log), racines et exposants avec priorité opératoire exacte."
metaKeywords: "calculatrice scientifique, trigonométrie radians degrés, logarithme népérien ln, logarithme décimal log, priorité opératoire PEDMAS, exposants et racines, constantes pi et e"
faqs:
  - question: "Quand faut-il basculer entre le mode Radians (RAD) et le mode Degrés (DEG) ?"
    answer: "Le mode Radians (RAD), unité dérivée du Système international (SI), est indispensable en analyse mathématique, en physique ondulatoire, en mécanique rotationnelle et dès qu'une expression fait intervenir π (comme sin(π ÷ 6)). Le mode Degrés (DEG) convient à la géométrie plane, à l'architecture, à la topographie et aux mesures d'angles usuelles. L'outil applique automatiquement la conversion θ_rad = θ_deg × π / 180 lorsque DEG est actif."
  - question: "Quelle est la différence entre ln et log, et comment calculer un logarithme en base 2 ou en base quelconque ?"
    answer: "La touche ln calcule le logarithme népérien (base e ≈ 2,7182818), utilisé dans les phénomènes continus et les équations différentielles. La touche log calcule le logarithme décimal (base 10), courant en acoustique (décibels), en chimie (pH) et en sismologie. Pour obtenir un logarithme en base b quelconque (par exemple en base 2 pour l'informatique), appliquez la formule de changement de base : log_b(x) = ln(x) ÷ ln(b) = log(x) ÷ log(b)."
  - question: "Comment calculer une racine cubique ou une racine n-ième avec cette calculatrice ?"
    answer: "La touche √ extrait uniquement la racine carrée (exposant 1/2). Pour calculer une racine cubique ou une racine n-ième d'un nombre positif x, utilisez la touche de puissance xʸ avec un exposant fractionnaire entre parenthèses : x^(1÷n). Par exemple, pour la racine cubique de 27, saisissez 27^(1÷3) afin d'obtenir 3, et non 27^1÷3 qui donnerait 9."
  - question: "Pourquoi l'expression -3^2 ne donne-t-elle pas le même résultat que (-3)^2 ?"
    answer: "Selon la priorité opératoire, l'élévation à la puissance s'exécute avant le signe moins unaire : mathématiquement, -3^2 signifie -(3^2) = -9, tandis que (-3)^2 élève la base négative au carré et vaut +9. Par sécurité, encadrez toujours toute base négative par des parenthèses — (-3)^2 — ou utilisez -(3^2) lorsque vous voulez l'opposé de la puissance."
  - question: "Pourquoi tan(90°), ln(0) ou √(-4) renvoient-ils une erreur ou une valeur numérique extrême ?"
    answer: "Ces entrées sortent du domaine de définition réel de la fonction. La tangente possède une asymptote verticale à 90° (ou π/2 rad) car cos(90°) = 0 ; l'approximation finie de π/2 peut parfois renvoyer une valeur géante (environ 1,63 × 10^16) au lieu de l'infini. De même, ln(x) et log(x) exigent strictement x > 0, et la racine carrée réelle √(x) impose x ≥ 0."
---

En physique, en chimie, en ingénierie et dans l'enseignement scientifique, une calculatrice arithmétique simple ne suffit plus dès qu'interviennent des fonctions transcendantes ou des expressions imbriquées. Cette **calculatrice scientifique** évalue des formules complètes selon la priorité opératoire stricte, avec une précision jusqu'à **$15$ chiffres significatifs**, la fermeture automatique des parenthèses ouvertes et le basculement direct entre **radians (`RAD`)** et **degrés (`DEG`)**.

Son clavier rassemble les fonctions fondamentales de l'analyse réelle : trigonométrie (`sin`, `cos`, `tan`), logarithmes népérien (`ln`) et décimal (`log`), racine carrée (`√`), puissance (`xʸ`), ainsi que les constantes $\pi$ et $e$.

## Relations Fondamentales et Priorité Opératoire

Quatre familles d'identités gouvernent les calculs scientifiques et permettent aussi d'obtenir les fonctions dérivées sans touche dédiée :

1. **Conversion angulaire (unité SI : radian, `rad`)** :
   $$\theta_{\text{rad}} = \theta_{\text{deg}} \times \frac{\pi}{180} \qquad \text{et} \qquad \theta_{\text{deg}} = \theta_{\text{rad}} \times \frac{180}{\pi}$$
   avec $\pi \approx 3{,}141592653589793$ ($360^\circ = 2\pi\text{ rad}$).
2. **Identités trigonométriques et inverses multiplicatifs** :
   $$\sin^2(\theta) + \cos^2(\theta) = 1, \qquad \tan(\theta) = \frac{\sin(\theta)}{\cos(\theta)}, \qquad \cot(\theta) = \frac{1}{\tan(\theta)}, \qquad \sec(\theta) = \frac{1}{\cos(\theta)}$$
3. **Logarithmes, exponentielles et changement de base** :
   Pour tout réel $x > 0$ et toute base $b > 0$ ($b \neq 1$), avec $e \approx 2{,}718281828459045$ :
   $$y = \ln(x) \iff e^y = x, \qquad y = \log_{10}(x) \iff 10^y = x, \qquad \log_b(x) = \frac{\ln(x)}{\ln(b)} = \frac{\log(x)}{\log(b)}$$
4. **Puissances rationnelles et racines $n$-ièmes** :
   $$\sqrt[n]{x} = x^{1/n} \qquad (x \ge 0 \text{ pour } n \text{ pair})$$

L'évaluateur applique la **priorité opératoire** classique (**PEDMAS**) dans cet ordre précis :

* **Parenthèses `(...)`** : les blocs les plus imbriqués sont résolus en priorité.
* **Fonctions et exposants (`sin`, `cos`, `tan`, `ln`, `log`, `√`, `^`)** : l'exponentiation est associative à droite, donc $2^{3^2} = 2^{(3^2)} = 512$ et non $(2^3)^2 = 64$.
* **Multiplications et divisions (`×`, `÷`)** : évaluées de gauche à droite.
* **Additions et soustractions (`+`, `−`)** : exécutées en dernier, de gauche à droite.

## Exemples Résolus Pas à Pas en Physique et Ingénierie

### Cas n° 1 : Portée d'un projectile en mode Degrés (`DEG`)

Un projectile est lancé à la vitesse initiale $v_0 = 24\text{ m/s}$ sous un angle $\alpha = 35^\circ$, dans un champ de pesanteur $g = 9{,}81\text{ m/s}^2$ (frottements négligés). Sa portée horizontale $D$ obéit à :

$$D = \frac{v_0^2 \cdot \sin(2\alpha)}{g}$$

1. **Choix du mode angulaire** : activez **`DEG`** sur l'écran supérieur.
2. **Saisie complète** : `(24^2×sin(2×35))÷9.81`.
3. **Calcul détaillé** :
   * Carré de la vitesse : $24^2 = 576\text{ m}^2/\text{s}^2$.
   * Angle double : $2 \times 35^\circ = 70^\circ$ ($1{,}221730\text{ rad}$), donnant $\sin(70^\circ) \approx 0{,}939693$.
   * Numérateur : $576 \times 0{,}939693 \approx 541{,}263\text{ m}^2/\text{s}^2$.
   * Portée finale : $D = 541{,}263 / 9{,}81 \approx \mathbf{55{,}17\text{ m}}$.

### Cas n° 2 : Décibels acoustiques et décroissance radioactive

Le niveau sonore $L$ (en décibels, $\text{dB}$) d'une source d'intensité $I = 3{,}2 \times 10^{-5}\text{ W/m}^2$ rapportée au seuil $I_0 = 10^{-12}\text{ W/m}^2$ vaut :

$$L = 10 \cdot \log_{10}\!\left(\frac{I}{I_0}\right) = 10 \times \log(3{,}2 \times 10^7)$$

En entrant `10×log(3.2×10^7)`, on obtient $\log_{10}(3{,}2 \times 10^7) \approx 7{,}505150$, soit **$L \approx 75{,}05\text{ dB}$**. Pour une masse initiale $N_0 = 120\text{ g}$ d'un radio-isotope de constante $\lambda = 0{,}045\text{ j}^{-1}$, la masse résiduelle à $t = 15\text{ jours}$ s'écrit $N(15) = 120 \times e^{-0{,}045 \times 15}$. La saisie `120×e^(−0.045×15)` évalue $e^{-0{,}675} \approx 0{,}509156$ et donne **$\mathbf{61{,}10\text{ g}}$** (la demi-vie `ln(2)÷0.045` vaut $\mathbf{15{,}40\text{ jours}}$).

## Tableau de Référence : Fonctions, Domaines et Saisie Clavier

| Touche / Fonction | Définition mathématique | Domaine réel valide | Saisie exacte | Résultat |
| :--- | :--- | :--- | :--- | :--- |
| **`sin`, `cos`, `tan`** | Rapports trigonométriques (`RAD` / `DEG`) | $\mathbb{R}$ (hors $90^\circ + 180^\circ k$ pour `tan`) | `sin(30)` en `DEG` | `0.5` |
| **`ln`** | Logarithme népérien $\ln(x)$ | $x > 0$ | `ln(e^4)` | `4` |
| **`log`** | Logarithme décimal $\log_{10}(x)$ | $x > 0$ | `log(1000)` | `3` |
| **Base $b$ (dérivée)** | $\log_b(x) = \ln(x)/\ln(b)$ | $x > 0$, $b > 0$, $b \neq 1$ | `ln(512)÷ln(2)` | `9` |
| **`√`** | Racine carrée principale $\sqrt{x}$ | $x \ge 0$ | `√(144+25)` | `13` |
| **`xʸ`** | Puissance $x^y$ ou racine $x^{1/n}$ | $x > 0$ si $y \notin \mathbb{Z}$ | `64^(1÷3)` | `4` |
| **`π` et `e`** | Constantes transcendantes | Précision à 15 chiffres | `2×π×5` | `31.4159265358979` |

## Bonnes Pratiques de Saisie et Erreurs Classiques à Éviter

* **Vérifier `RAD` ou `DEG` avant tout calcul d'angle** : La calculatrice démarre en **radians (`RAD`)**. Saisir `sin(30)` sans basculer en degrés produit **$-0{,}988032$** ($\sin(30\text{ rad})$) au lieu de **$0{,}5$**.
* **Expliciter tous les opérateurs de multiplication** : N'utilisez jamais la juxtaposition implicite (`2π` ou `3sin(45)`) ; saisissez toujours **`2×π`** ou **`3×sin(45)`** pour garantir une interprétation syntaxique fiable.
* **Parenthéser exposants fractionnaires et bases négatives** : Saisir `27^1÷3` calcule $(27^1)\div 3 = 9$, tandis que **`27^(1÷3)`** renvoie la racine cubique exacte ($3$). Encadrez également toute base négative — **`(-5)^2`** vaut $25$ — afin d'écarter l'ambiguïté du signe moins unaire.
* **Distinguer la touche `%` du pourcentage courant** : Dans un évaluateur d'expressions, `%` représente l'opérateur **modulo** (reste de la division euclidienne, par exemple `17%5 = 2`), et non une division par $100$. Pour $15\,\%$ de $240$, entrez **`240×0.15`** ou **`240×15÷100`** ($36$). Enfin, en mode radians, la représentation finie de $\pi$ explique qu'une expression comme $\cos(\pi\div 2)$ affiche environ $6{,}12\times 10^{-17}$ au lieu d'un zéro absolu.
