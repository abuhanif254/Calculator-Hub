---
title: "Calculatrice de Triangle"
metaTitle: "Calculatrice de Triangle : Côtés, Angles, Aire et Al-Kashi"
description: "Résolvez instantanément tout triangle en mode trois côtés (CCC), deux côtés et angle compris (CAC) ou base et hauteur. Obtenez angles exacts, côté manquant, aire et périmètre."
metaDescription: "Résolvez tout triangle en mode CCC, CAC ou base et hauteur. Calculez instantanément les angles, les côtés manquants, le périmètre et l'aire par Héron."
metaKeywords: "calculatrice de triangle, résoudre un triangle, théorème d'Al-Kashi, loi des cosinus, formule de Héron, aire d'un triangle, angles d'un triangle, géométrie CCC CAC"
faqs:
  - question: "Pourquoi la calculatrice refuse-t-elle certains triplets de côtés en mode CCC ?"
    answer: "Pour qu'un triangle existe dans le plan euclidien, ses trois côtés doivent respecter strictement l'inégalité triangulaire : la somme des longueurs de deux côtés quelconques doit être strictement supérieure au troisième côté (a + b > c, a + c > b et b + c > a). Par exemple, des côtés de 3 m, 4 m et 8 m ne peuvent jamais se rejoindre ; si 3 + 4 = 7, le triangle est aplati et d'aire nulle."
  - question: "Quelle est la différence entre le cas CAC et le cas ambigu CCA ?"
    answer: "Dans le mode CAC (côté-angle-côté), l'angle connu est directement compris entre les deux côtés mesurés, ce qui définit un triangle unique et sans ambiguïté via le théorème d'Al-Kashi. À l'inverse, lorsque l'angle connu n'est pas compris entre les deux côtés (configuration CCA), il peut exister zéro, une ou deux solutions géométriques distinctes selon la longueur du côté opposé."
  - question: "Comment savoir si un triangle est acutangle, rectangle ou obtusangle à partir de ses trois côtés ?"
    answer: "En désignant par c le plus long côté du triangle, comparez c² à la somme a² + b². Si c² = a² + b², le triangle est rectangle (réciproque de Pythagore). Si c² < a² + b², les trois angles sont aigus (triangle acutangle). Si c² > a² + b², l'angle opposé au plus grand côté dépasse 90° (triangle obtusangle)."
  - question: "Dans un triangle obtusangle, où se situe la hauteur utilisée pour calculer l'aire ?"
    answer: "La hauteur associée à une base est toujours le segment perpendiculaire reliant le sommet opposé à la droite portant cette base. Dans un triangle comportant un angle supérieur à 90°, deux des trois hauteurs tombent à l'extérieur du triangle, sur le prolongement des côtés adjacents à l'angle obtus. La formule Aire = (base × hauteur) / 2 reste néanmoins strictement exacte."
  - question: "Quelles unités faut-il saisir pour les côtés, les angles et l'aire ?"
    answer: "Tous les côtés (ou la base et la hauteur) doivent être exprimés dans la même unité de longueur (millimètres, centimètres ou mètres). Les angles sont toujours saisis et affichés en degrés décimaux entre 0° et 180°. Le périmètre conserve l'unité linéaire choisie, tandis que l'aire s'exprime dans l'unité au carré correspondante (cm², m², etc.)."
---

En arpentage foncier, en charpente, en chaudronnerie, en mécanique des structures ou en géométrie scolaire, le triangle demeure la figure rigide élémentaire sur laquelle repose toute décomposition polygonale. Résoudre un triangle consiste à déterminer l'ensemble de ses six éléments — ses trois côtés $a$, $b$, $c$ et ses trois angles internes opposés $\hat{A}$, $\hat{B}$, $\hat{C}$ — ainsi que son périmètre $P$ et son aire $\mathcal{A}$.

Notre **calculatrice de triangle** adapte automatiquement les théorèmes de trigonométrie plane à vos données selon trois modes : **3 côtés connus (CCC)**, **2 côtés et l'angle compris (CAC)**, ou **Base et hauteur** pour obtenir directement la surface.

## Formules géométriques et trigonométriques de résolution

Tout triangle plan non aplati satisfait deux contraintes incontournables : la somme des angles internes vaut exactement **180°** ($\pi$ radians), et ses longueurs respectent l'**inégalité triangulaire** ($a + b > c$, $a + c > b$ et $b + c > a$).

### Théorème d'Al-Kashi (loi des cosinus)

Généralisation du théorème de Pythagore aux triangles quelconques, le théorème d'Al-Kashi résout sans ambiguïté les configurations **CAC** et **CCC** :

$$c^{2} = a^{2} + b^{2} - 2ab\cos(\hat{C}) \qquad \Longleftrightarrow \qquad \hat{A} = \arccos\!\left(\frac{b^{2} + c^{2} - a^{2}}{2bc}\right)$$

* En mode **CAC** (côtés $a$, $b$ et angle compris $\hat{C}$), la première relation détermine aussitôt la longueur du troisième côté $c$, puis la relation inversée livre $\hat{A}$ et $\hat{B} = 180^\circ - \hat{C} - \hat{A}$.
* En mode **CCC** (trois côtés $a$, $b$, $c$), la relation inversée calcule directement $\hat{A}$ et $\hat{B}$ en degrés, puis $\hat{C} = 180^\circ - \hat{A} - \hat{B}$.

### Aire par Héron, trigonométrie et base-hauteur

En posant le périmètre $P = a + b + c$ et le demi-périmètre $s = \frac{a + b + c}{2}$, trois expressions rigoureusement équivalentes donnent l'aire $\mathcal{A}$ (en m², cm² ou mm²) :

$$\mathcal{A} = \sqrt{s(s - a)(s - b)(s - c)} \quad \text{(Héron)} \qquad \mathcal{A} = \frac{1}{2}ab\sin(\hat{C}) \quad \text{(CAC)} \qquad \mathcal{A} = \frac{b \times h}{2} \quad \text{(Base-hauteur)}$$

En complément, la **loi des sinus** relie chaque côté au rayon $R$ du cercle circonscrit ($\frac{a}{\sin\hat{A}} = \frac{b}{\sin\hat{B}} = \frac{c}{\sin\hat{C}} = 2R$), tandis que le rayon du cercle inscrit vaut simplement $r = \mathcal{A} / s$.

## Exemples chiffrés pas à pas : modes CCC et CAC

### Cas 1 : Parcelle mesurée par trois côtés (mode CCC)

Un géomètre relève les trois bordures d'un terrain triangulaire : **a = 7 m**, **b = 8 m** et **c = 9 m**.

1. **Validité et périmètre** : comme 7 + 8 = 15 > 9, le triangle existe ; son périmètre vaut **24 m** et son demi-périmètre **12 m**.
2. **Angles par le théorème d'Al-Kashi** :
   $$\cos(\hat{A}) = \frac{8^{2} + 9^{2} - 7^{2}}{2 \times 8 \times 9} = \frac{96}{144} = \frac{2}{3} \implies \hat{A} \approx 48{,}19^\circ$$
   $$\cos(\hat{B}) = \frac{7^{2} + 9^{2} - 8^{2}}{2 \times 7 \times 9} = \frac{66}{126} = \frac{11}{21} \implies \hat{B} \approx 58{,}41^\circ$$
   Le troisième angle s'en déduit par différence : **180° − 48,19° − 58,41° = 73,40°**.
3. **Aire par la formule de Héron** :
   $$\mathcal{A} = \sqrt{12 \times 5 \times 4 \times 3} = \sqrt{720} = 12\sqrt{5} \approx \mathbf{26{,}83\text{ m}^2}$$

### Cas 2 : Fermette à deux côtés et angle compris (mode CAC)

Deux arbalétriers de charpente mesurant **6,0 m** et **10,0 m** forment entre eux un angle au faîtage de **60°**.

1. **Longueur de l'entrait $c$** (sachant que $\cos 60^\circ = 0{,}5$) :
   $$c = \sqrt{6^{2} + 10^{2} - 2 \times 6 \times 10 \times 0{,}5} = \sqrt{76} \approx \mathbf{8{,}72\text{ m}}$$
2. **Aire trigonométrique** (avec $\sin 60^\circ = \frac{\sqrt{3}}{2}$) :
   $$\mathcal{A} = \frac{1}{2} \times 6{,}0 \times 10{,}0 \times \frac{\sqrt{3}}{2} = 15\sqrt{3} \approx \mathbf{25{,}98\text{ m}^2}$$
3. **Angles restants et périmètre** : on obtient **36,59°** face au côté de 6,0 m, **83,41°** face au côté de 10,0 m (somme exacte de 180,00°) et un périmètre total de **24,72 m**.

## Tableau de référence des triangles remarquables

En notant $c$ le plus long côté, ce tableau synthétise les repères immédiats pour vérifier la nature et la surface d'une figure :

| Type de triangle | Côtés caractéristiques | Angles internes | Critère d'Al-Kashi | Aire rapide ($\mathcal{A}$) |
| :--- | :--- | :--- | :--- | :--- |
| **Équilatéral** | $a = b = c$ | 60°, 60°, 60° | $c^2 < a^2 + b^2$ | $\frac{\sqrt{3}}{4}a^{2} \approx 0{,}433\,a^{2}$ |
| **Isocèle** | $a = b \ne c$ | $\hat{A} = \hat{B}$ | Variable selon $\hat{C}$ | $\frac{c}{4}\sqrt{4a^{2} - c^{2}}$ |
| **Rectangle (3-4-5)** | $a^{2} + b^{2} = c^{2}$ | Un angle droit (90°) | $c^2 = a^2 + b^2$ | $\frac{a \times b}{2}$ |
| **Rectangle isocèle** | $a$, $a$, $a\sqrt{2}$ | 45°, 45°, 90° | $c^2 = 2a^2$ | $\frac{a^{2}}{2}$ |
| **Demi-équilatéral** | $a$, $a\sqrt{3}$, $2a$ | 30°, 60°, 90° | $c^2 = 4a^2$ | $\frac{\sqrt{3}}{2}a^{2}$ |
| **Acutangle** | Trois côtés distincts | Tous inférieurs à 90° | $c^2 < a^2 + b^2$ | Formule de Héron |
| **Obtusangle** | Trois côtés distincts | Un angle supérieur à 90° | $c^2 > a^2 + b^2$ | Formule de Héron |

## Conseils pratiques et erreurs courantes à éviter

* **Vérifier l'unité d'angle (degrés contre radians)** : La calculatrice travaille exclusivement en **degrés** (entre 0° et 180°). Sur un tableur réglé par défaut en radians, convertissez chaque angle via $\theta_{\text{rad}} = \theta_{\text{deg}} \times \frac{\pi}{180}$.
* **Distinguer hauteur orthogonale et côté oblique** : En mode Base et hauteur, $h$ désigne toujours la distance perpendiculaire entre le sommet opposé et la droite portant la base — jamais la longueur d'un côté latéral (sauf dans un triangle rectangle).
* **Uniformiser les unités du Système international** : Mélanger mètres et centimètres fausse la surface d'un facteur 100. Convertissez toutes les longueurs dans la même unité avant saisie (1 m² = 10 000 cm²).
* **Mesurer l'angle compris en mode CAC** : Pour garantir une solution unique, saisissez impérativement l'angle situé entre les deux côtés connus, jamais un angle opposé à l'un d'eux.
