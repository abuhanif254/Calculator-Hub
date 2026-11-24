---
title: "Calculateur de Volume"
metaTitle: "Calculateur de Volume : Formules 3D et Conversions m³ / L"
description: "Calculez instantanément le volume exact de 14 formes géométriques 3D (pavé droit, cylindre, sphère, cône, tronc de cône, capsule, tore) et convertissez le résultat en mètres cubes, litres ou gallons."
metaDescription: "Calculez le volume exact de 14 solides 3D (cylindre, sphère, cône, pavé droit, tronc de cône) avec conversions instantanées en m³, litres et gallons."
metaKeywords: "calculateur de volume, calcul volume m3, volume cylindre, volume sphère, volume cône, tronc de cône, pavé droit, conversion m3 litres, formules géométrie 3D"
faqs:
  - question: "Comment convertir rapidement des mètres cubes et centimètres cubes en litres ?"
    answer: "En unités SI, un litre correspond exactement à un décimètre cube (1 L = 1 dm³). On retient donc deux relations clés : 1 m³ = 1 000 L (multipliez les m³ par 1 000) et 1 cm³ = 1 mL (divisez les cm³ par 1 000 pour obtenir des litres, ou par 1 000 000 pour obtenir des m³)."
  - question: "Que se passe-t-il si l'on saisit le diamètre à la place du rayon dans une formule de volume ?"
    answer: "Confondre le diamètre d avec le rayon r = d / 2 provoque une surestimation massive : le volume est multiplié par 4 pour un cylindre ou un cône (terme r²) et par 8 pour une sphère ou un hémisphère (terme r³). Notre calculateur inclut un sélecteur dédié Rayon / Diamètre pour éliminer ce risque."
  - question: "Comment déterminer le volume de matière d'un tuyau ou d'une cuve creuse ?"
    answer: "Pour calculer le volume de la paroi d'un tube, appliquez la formule du cylindre creux V = π × (R² − r²) × h, où R est le rayon extérieur, r le rayon intérieur et h la longueur. Pour connaître la capacité de fluide contenue à l'intérieur, utilisez simplement le cylindre plein avec le rayon intérieur r."
  - question: "Pourquoi le coefficient 1/3 apparaît-il dans les formules du cône et de la pyramide ?"
    answer: "Par le principe de Cavalieri et le calcul intégral, la section transversale d'un cône ou d'une pyramide varie comme le carré de la distance au sommet. L'intégration de x² entre 0 et h introduit le facteur exact 1/3 : un cône occupe donc exactement le tiers du volume du cylindre de même base et de même hauteur."
  - question: "Quelle différence existe-t-il entre le volume géométrique et la capacité d'un récipient ?"
    answer: "Le volume mesure l'espace tridimensionnel total occupé par un corps solide (exprimé en m³, dm³ ou cm³), tandis que la capacité désigne le volume intérieur utile disponible pour contenir un liquide, un gaz ou un matériau en vrac (souvent exprimé en litres ou en hectolitres), déduction faite de l'épaisseur des parois."
---

En géométrie dans l'espace, en génie civil, en hydraulique comme en logistique, le **volume** mesure l'étendue tridimensionnelle occupée par un solide ou disponible à l'intérieur d'un contenant. Dans le Système international d'unités (**SI**), l'unité légale est le **mètre cube (`m³`)**, couramment déclinée en **litres (`1 L = 1 dm³ = 0,001 m³`)** et en **centimètres cubes (`1 cm³ = 1 mL`)**.

Notre **calculateur de volume** traite **14 solides 3D** — cube, pavé droit, cylindre, cylindre creux, sphère, hémisphère, sphère creuse, cône, tronc de cône, pyramide, prisme triangulaire, capsule, ellipsoïde et tore. Il accepte des **unités mixtes** (`mm`, `cm`, `dm`, `m`, pouces, pieds, verges), bascule entre **rayon et diamètre** et convertit le résultat dans **11 unités de volume**.

## Principes géométriques et formules des solides 3D

Trois règles structurent l'ensemble des calculs de cubage :

* **Prismes droits et cylindres** (section constante) : $V = A_{\text{base}} \cdot h$.
* **Cônes et pyramides** (solides pointus) : $V = \frac{1}{3} A_{\text{base}} \cdot h$.
* **Solides de révolution et formes creuses** (obtenus par intégration ou soustraction de volumes) :

$$V_{\text{cyl}} = \pi r^2 h, \qquad V_{\text{sph}} = \frac{4}{3} \pi r^3, \qquad V_{\text{tronc}} = \frac{1}{3} \pi h \left(R^2 + Rr + r^2\right), \qquad V_{\text{tube}} = \pi \left(R^2 - r^2\right) h$$

* **$r$ et $R$** : rayon simple, ou rayons intérieur ($r$) et extérieur / de grande base ($R$), égaux à la moitié du diamètre ($r = d / 2$).
* **$h$** : hauteur droite mesurée **perpendiculairement** à la base.
* **$L, l, a, b, c$** : dimensions d'un pavé droit, arête d'un cube ou demi-axes d'un ellipsoïde, convertis dans la même unité linéaire.

### Tableau récapitulatif des formules de volume 3D

| Solide 3D | Formule exacte | Paramètres | Usage courant |
| :--- | :--- | :--- | :--- |
| **Cube** | $V = a^3$ | Arête $a$ | Caisses cubiques, blocs étalons |
| **Pavé droit** | $V = L \cdot l \cdot h$ | Longueur $L$, largeur $l$, hauteur $h$ | Piscines, conteneurs, pièces |
| **Prisme triangulaire** | $V = \frac{1}{2} b \cdot h_b \cdot H$ | Base $b$, hauteur $h_b$, longueur $H$ | Combles, toitures, goulottes |
| **Cylindre** | $V = \pi r^2 h$ | Rayon $r$, hauteur $h$ | Citernes, fûts, silos, piliers |
| **Cylindre creux** | $V = \pi (R^2 - r^2) h$ | Rayons $R$ (ext.), $r$ (int.), long. $h$ | Tuyaux, viroles, buses béton |
| **Sphère / Hémisphère** | $\frac{4}{3}\pi r^3$ / $\frac{2}{3}\pi r^3$ | Rayon $r$ | Cuves sous pression, dômes |
| **Cône droit** | $V = \frac{1}{3} \pi r^2 h$ | Rayon $r$, hauteur $h$ | Tas de granulats, entonnoirs |
| **Tronc de cône** | $V = \frac{1}{3}\pi h(R^2 + Rr + r^2)$ | Rayons $R$ et $r$, hauteur $h$ | Seaux, trémies industrielles |
| **Pyramide rectangulaire** | $V = \frac{1}{3} L \cdot l \cdot h$ | Base $L \times l$, hauteur $h$ | Trémies carrées, toits pavillon |
| **Capsule** | $V = \pi r^2 (h + \frac{4}{3} r)$ | Rayon $r$, cylindre central $h$ | Cuves à fonds hémisphériques |
| **Ellipsoïde / Tore** | $\frac{4}{3}\pi abc$ / $2\pi^2 R r^2$ | Demi-axes $a, b, c$ / rayons $R, r$ | Géodésie, échangeurs toriques |

## Exemples chiffrés pas à pas : citerne et trémie

### Cas 1 : Citerne cylindrique de récupération d'eau

On évalue la capacité utile d'une cuve verticale de **diamètre intérieur $d = 180\text{ cm}$** et de **hauteur $h = 2{,}40\text{ m}$**.

1. **Passage au rayon en mètres** : $r = 180 / 2 = 90\text{ cm} = \mathbf{0{,}90\text{ m}}$.
2. **Aire circulaire de base** : $A_{\text{base}} = \pi \times 0{,}90^2 = \pi \times 0{,}81 \approx \mathbf{2{,}5447\text{ m}^2}$.
3. **Volume et capacité** :
   $$V = 2{,}5447 \times 2{,}40 \approx \mathbf{6{,}1073\text{ m}^3}$$
   La citerne stocke **6 107,3 litres** (soit **1 613,4 gallons américains** ou **1 343,4 gallons impériaux**).

### Cas 2 : Trémie industrielle en tronc de cône

Une trémie tronconique présente un **grand rayon $R = 0{,}60\text{ m}$**, un **rayon de sortie $r = 0{,}35\text{ m}$** et une **hauteur $h = 1{,}20\text{ m}$**.

1. **Facteur quadratique** : $R^2 + Rr + r^2 = 0{,}36 + 0{,}21 + 0{,}1225 = \mathbf{0{,}6925\text{ m}^2}$.
2. **Volume exact** :
   $$V = \frac{1}{3} \pi \times 1{,}20 \times 0{,}6925 = 0{,}40 \times \pi \times 0{,}6925 \approx \mathbf{0{,}8702\text{ m}^3}$$
   Sa capacité rase atteint donc **870,2 litres**.

## Conversions d'unités SI, litres et mesures impériales

Contrairement aux longueurs, les volumes suivent une **échelle cubique** : chaque rang décimal multiplie ou divise par $10^3 = \mathbf{1\,000}$. Ainsi, $1\text{ m} = 100\text{ cm}$, mais $1\text{ m}^3 = 100^3 = \mathbf{1\,000\,000\text{ cm}^3}$. Repères essentiels entre système métrique et normes nord-américaines (Québec, industrie) :

* **$1\text{ m}^3 = 1\,000\text{ dm}^3 = 1\,000\text{ L} = 10^6\text{ cm}^3$** ; **$1\text{ cm}^3 = 1\text{ mL}$** ; **$1\text{ hL} = 100\text{ L}$**.
* **$1\text{ pied cube (pi}^3) = 28{,}3168\text{ L}$** ; **$1\text{ verge cube (vg}^3) = 0{,}7646\text{ m}^3$**.
* **$1\text{ gallon américain} = 3{,}7854\text{ L}$** contre **$1\text{ gallon impérial} = 4{,}5461\text{ L}$**.

## Erreurs géométriques et pièges de mesure à éviter

* **Saisir le diamètre à la place du rayon** : Entrer $1{,}80\text{ m}$ au lieu de $0{,}90\text{ m}$ multiplie le volume d'un cylindre ou d'un cône par **4** (24,43 m³ contre 6,11 m³) et celui d'une sphère par **8**.
* **Confondre hauteur droite et arête oblique** : Un cône ou une pyramide exige la hauteur perpendiculaire $h$ et non la génératrice $g$. Pour un rayon $r = 3\text{ m}$ et une pente $g = 5\text{ m}$, le théorème de Pythagore impose $h = \sqrt{5^2 - 3^2} = 4\text{ m}$.
* **Mesurer l'extérieur d'une cuve à paroi épaisse** : Pour la capacité utile en liquide, mesurez toujours les cotes **intérieures** ; réservez la formule du cylindre creux ou de la sphère creuse au volume de béton ou de métal de la paroi.
* **Oublier la puissance cubique lors d'une conversion manuelle** : Pour passer de centimètres cubes en mètres cubes, divisez par **1 000 000** et non par 100, ou convertissez toutes vos longueurs en mètres avant le calcul.
