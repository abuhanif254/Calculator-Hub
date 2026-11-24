---
title: "Calculateur de Demi-Vie"
metaTitle: "Calculateur de Demi-Vie : Formule et Décroissance Isotope"
description: "Calculez avec précision la demi-vie, la quantité restante, la masse initiale, le temps écoulé ou la constante de désintégration λ pour tout processus de décroissance exponentielle."
metaDescription: "Calculez la demi-vie, la quantité restante, le temps écoulé ou la constante de désintégration λ avec unités SI et isotopes usuels (C-14, I-131)."
metaKeywords: "calculateur de demi-vie, période radioactive, décroissance radioactive, constante de désintégration, datation carbone 14, iode 131, demi-vie pharmacocinétique, activité becquerel"
faqs:
  - question: "Quelle différence sépare la demi-vie, la constante de désintégration et la vie moyenne ?"
    answer: "La demi-vie (t₁/₂) est le temps nécessaire pour que la moitié des noyaux se désintègrent. La constante de désintégration (λ = ln(2) / t₁/₂, en s⁻¹) représente la probabilité de désintégration par seconde. La vie moyenne (τ = 1 / λ ≈ 1,4427 × t₁/₂) correspond à la durée de vie moyenne d'un noyau et au temps au bout duquel il reste 36,79 % de l'échantillon."
  - question: "Pourquoi un isotope radioactif ne disparaît-il pas après deux demi-vies ?"
    answer: "La décroissance est exponentielle et non linéaire : chaque période divise par deux la quantité encore présente, et non la quantité initiale. Après une demi-vie il reste 50 %, après deux demi-vies 25 %, après trois 12,5 %, et après dix demi-vies encore environ 0,098 % (1 / 1 024) de l'échantillon de départ."
  - question: "La formule de demi-vie s'applique-t-elle aussi à l'élimination d'un médicament ?"
    answer: "Oui, pour tout médicament suivant une pharmacocinétique linéaire d'ordre 1, la concentration plasmatique décroît exactement selon C(t) = C₀ × (1/2)^(t / t₁/₂). En pratique clinique, on considère généralement qu'un principe actif est quasi totalement éliminé après 5 à 7 demi-vies plasmatiques (il reste respectivement 3,13 % et 0,78 %)."
  - question: "Jusqu'à quel âge la datation au carbone 14 reste-t-elle fiable ?"
    answer: "Avec une période de 5 730 ans, le carbone 14 permet de dater des vestiges organiques jusqu'à environ 50 000 ans, soit près de 8,7 demi-vies (il subsiste alors moins de 0,24 % de l'activité initiale). Au-delà, le signal résiduel devient indiscernable du bruit de fond et les géologues utilisent d'autres couples comme potassium-argon ou uranium-plomb."
  - question: "Comment passer du nombre de noyaux à l'activité radioactive en becquerels (Bq) ?"
    answer: "L'activité radioactive A(t) est directement proportionnelle au nombre de noyaux instables N(t) via la relation A(t) = λ × N(t), où λ est exprimée en secondes inverses (s⁻¹) et A(t) en becquerels (1 Bq = 1 désintégration par seconde). L'activité suit donc exactement la même courbe de demi-vie que la masse ou la quantité de matière."
---

En physique nucléaire, en radioprotection, en cinétique chimique et en pharmacocinétique, la **demi-vie** — ou **période radioactive** ($t_{1/2}$) pour un radionucléide — mesure la durée au terme de laquelle exactement **50 %** d'une population initiale de noyaux instables ou de molécules d'ordre 1 a disparu. La désintégration d'un noyau étant aléatoire et indépendante de son âge, de sa température ou de sa liaison chimique, le phénomène obéit à une loi exponentielle universelle.

Notre **calculateur de demi-vie** résout les **cinq inconnues usuelles** : **quantité restante $N(t)$**, **quantité initiale $N_0$**, **demi-vie $t_{1/2}$**, **temps écoulé $t$** et **constante de désintégration $\lambda$**. Il convertit automatiquement les durées en **unités SI** (secondes), accepte la notation scientifique et intègre les principaux isotopes de référence.

## Équations fondamentales de la décroissance exponentielle

### Loi de décroissance, constante λ et vie moyenne τ

La quantité $N(t)$ présente après un temps $t$ s'exprime indifféremment en base $1/2$ ou avec l'exponentielle naturelle :

$$N(t) = N_0 \cdot \left(\frac{1}{2}\right)^{\frac{t}{t_{1/2}}} = N_0 \cdot e^{-\lambda t}$$

La constante de désintégration $\lambda$ et la **vie moyenne** $\tau$ dépendent du logarithme népérien de 2 ($\ln(2) \approx 0{,}69315$) :

$$\lambda = \frac{\ln(2)}{t_{1/2}}, \qquad \tau = \frac{1}{\lambda} = \frac{t_{1/2}}{\ln(2)} \approx 1{,}4427 \cdot t_{1/2}$$

* **$N_0$ et $N(t)$** : quantités initiale et restante dans la même unité (masse en $\text{g}$ ou $\text{mg}$, nombre de noyaux, concentration plasmatique en $\text{mg/L}$ ou activité en **becquerels**, $\text{Bq}$).
* **$t$ et $t_{1/2}$** : temps écoulé et demi-vie ramenés à une unité commune (seconde $\text{s}$ en SI).
* **$\lambda$** : probabilité de désintégration par unité de temps ($\text{s}^{-1}$), reliant noyaux et activité par $A(t) = \lambda \cdot N(t)$.

### Formules inversées des autres modes de calcul

Pour isoler $N_0$, $t$ ou $t_{1/2}$ à partir de mesures expérimentales (avec $0 < N(t) < N_0$) :

$$N_0 = \frac{N(t)}{\left(\frac{1}{2}\right)^{\frac{t}{t_{1/2}}}}, \qquad t = t_{1/2} \cdot \frac{\ln\!\left(\frac{N_0}{N(t)}\right)}{\ln(2)}, \qquad t_{1/2} = \frac{t \cdot \ln(2)}{\ln\!\left(\frac{N_0}{N(t)}\right)}$$

## Exemples chiffrés pas à pas : médecine nucléaire et radiodatation

### Cas 1 : Décroissance de l'iode 131 en radiothérapie

Une source d'**iode 131** ($^{131}\text{I}$, $t_{1/2} = 8{,}02\text{ jours}$) présente une activité initiale $N_0 = 400\text{ MBq}$. Quelle activité subsiste après $t = 20\text{ jours}$ ?

1. **Nombre de demi-vies** : $20 / 8{,}02 \approx \mathbf{2{,}4938}$.
2. **Constante et vie moyenne** : $\lambda = 0{,}69315 / 8{,}02 \approx \mathbf{0{,}08643\text{ j}^{-1}} = \mathbf{1{,}000 \times 10^{-6}\text{ s}^{-1}}$ et $\tau = 8{,}02 / 0{,}69315 \approx \mathbf{11{,}57\text{ jours}}$.
3. **Activité restante** :
   $$N(20) = 400 \times (0{,}5)^{2{,}4938} = 400 \times 0{,}17754 \approx \mathbf{71{,}02\text{ MBq}}$$
   Il reste **17,75 %** de l'activité initiale ; **82,25 %** des noyaux se sont déjà désintégrés en xénon 131 stable.

### Cas 2 : Datation au carbone 14 d'un bois archéologique

Un fragment de bois ancien analysé par spectrométrie de masse conserve **35 %** de sa teneur initiale en **carbone 14** ($N(t)/N_0 = 0{,}35$, $t_{1/2} = 5\,730\text{ ans}$).

1. **Logarithme du rapport** : $\ln(1 / 0{,}35) = \ln(2{,}8571) \approx \mathbf{1{,}04982}$.
2. **Nombre de périodes** : $1{,}04982 / 0{,}69315 \approx \mathbf{1{,}5146}$.
3. **Âge conventionnel** : $t = 5\,730 \times 1{,}5146 \approx \mathbf{8\,678{,}5\text{ ans}}$.

## Tableau de référence des isotopes majeurs (unités SI)

Constantes calculées sur la base de l'année julienne ($365{,}25\text{ j} = 31\,557\,600\text{ s}$) :

| Isotope | Symbole | Demi-vie ($t_{1/2}$) | Constante $\lambda$ ($\text{s}^{-1}$) | Application principale |
| :--- | :--- | :--- | :--- | :--- |
| **Technétium 99m** | $^{99\text{m}}\text{Tc}$ | 6,01 heures | $3{,}204 \times 10^{-5}$ | Scintigraphie médicale |
| **Radon 222** | $^{222}\text{Rn}$ | 3,8235 jours | $2{,}098 \times 10^{-6}$ | Surveillance des bâtiments |
| **Iode 131** | $^{131}\text{I}$ | 8,02 jours | $1{,}000 \times 10^{-6}$ | Thérapie thyroïdienne |
| **Césium 137** | $^{137}\text{Cs}$ | 30,17 ans | $7{,}280 \times 10^{-10}$ | Contrôle industriel, fission |
| **Carbone 14** | $^{14}\text{C}$ | 5 730 ans | $3{,}833 \times 10^{-12}$ | Radiodatation (< 50 000 ans) |
| **Plutonium 239** | $^{239}\text{Pu}$ | 24 110 ans | $9{,}110 \times 10^{-13}$ | Combustible MOX, déchets |
| **Uranium 238** | $^{238}\text{U}$ | $4{,}468 \times 10^{9}$ ans | $4{,}916 \times 10^{-18}$ | Géochronologie terrestre |

Deux paliers pratiques guident les protocoles professionnels. En pharmacocinétique clinique, on estime qu'un médicament d'ordre 1 est quasi éliminé après **5 à 7 demi-vies**, lorsqu'il ne subsiste respectivement que **3,13 %** et **0,78 %** de la concentration initiale. En radioprotection hospitalière, la **règle des dix demi-vies** fait référence : après $10 \cdot t_{1/2}$, la fraction restante vaut $(1/2)^{10} = 1 / 1\,024 \approx \mathbf{0{,}0977\text{ \%}}$, soit une atténuation supérieure à un facteur 1 000 permettant souvent la gestion des effluents à vie courte.

## Erreurs fréquentes et limites physiques du modèle

* **Mélanger des unités de temps incompatibles** : Saisir $t$ en heures et $t_{1/2}$ en jours sans conversion fausse l'exposant d'un facteur 24. Une constante $\lambda$ en $\text{s}^{-1}$ impose toujours un temps exprimé en secondes.
* **Supposer une disparition complète après deux demi-vies** : La décroissance est asymptotique : après 1, 2 et 3 périodes, il reste respectivement **50 %**, **25 %** et **12,5 %**, jamais zéro après deux périodes.
* **Confondre demi-vie physique, biologique et effective** : Dans un organisme vivant, un traceur disparaît à la fois par désintégration nucléaire ($t_{\text{phys}}$) et par excrétion physiologique ($t_{\text{bio}}$) selon $\frac{1}{t_{\text{eff}}} = \frac{1}{t_{\text{phys}}} + \frac{1}{t_{\text{bio}}}$, rendant $t_{\text{eff}}$ toujours inférieure aux deux valeurs prises séparément.
* **Omettre la calibration radiocarbone ou la saturation pharmacologique** : En archéologie, l'âge brut au $^{14}\text{C}$ doit être ajusté par les courbes dendrochronologiques (**IntCal**). En pharmacologie, la loi d'ordre 1 cesse de s'appliquer lorsque les enzymes d'élimination sont saturées (cinétique d'ordre 0, comme pour l'éthanol à forte dose).
