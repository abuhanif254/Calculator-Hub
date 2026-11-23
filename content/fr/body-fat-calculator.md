---
title: "Calculatrice d'Indice de Masse Grasse"
metaTitle: "Calculatrice d'Indice de Masse Grasse (IMG) : US Navy"
description: "Estimez votre pourcentage de graisse corporelle, votre masse grasse et votre masse maigre en kilogrammes grâce à la formule anthropométrique de l'US Navy."
metaDescription: "Estimez votre indice de masse grasse (IMG), votre masse adipeuse et votre masse maigre par mensurations (méthode US Navy) avec seuils homme et femme."
metaKeywords: "calculatrice indice de masse grasse, calcul IMG, pourcentage graisse corporelle, méthode US Navy, masse maigre, masse grasse, équation de Siri, composition corporelle"
faqs:
  - question: "Quelle différence existe-t-il entre l'IMG par mensurations et l'IMC ?"
    answer: "L'Indice de Masse Corporelle (IMC) rapporte uniquement le poids au carré de la taille sans distinguer le muscle de la graisse : un sportif musclé peut afficher un IMC classé en surpoids alors que son taux de graisse est faible, tandis qu'une personne sédentaire de poids normal peut présenter un excès de graisse abdominale. L'IMG par mensurations (méthode US Navy) mesure directement les périmètres corporels pour séparer la masse adipeuse de la masse maigre."
  - question: "Pourquoi la méthode US Navy donne-t-elle un résultat différent de la formule de Deurenberg ?"
    answer: "La formule de Deurenberg estime l'IMG uniquement à partir de l'IMC, de l'âge et du sexe ; elle hérite donc des biais de l'IMC chez les profils athlétiques ou de morphologie atypique. La méthode de l'US Navy (équations de Hodgdon et Beckett) évalue directement la densité corporelle via le tour de taille, le tour de cou et, chez la femme, le tour de hanches, ce qui reflète bien mieux la répartition réelle du tissu adipeux."
  - question: "Pourquoi le tour de hanches est-il requis uniquement pour les femmes ?"
    answer: "La répartition physiologique des réserves adipeuses diffère selon le sexe biologique. Les hommes accumulent prioritairement la graisse sous-cutanée et viscérale au niveau de l'abdomen (répartition androïde), tandis que les femmes stockent une part importante de tissu adipeux autour du bassin, des fessiers et des cuisses (répartition gynoïde). Intégrer le tour de hanches évite de sous-estimer systématiquement l'IMG féminin."
  - question: "Quelle est la marge d'erreur de la méthode US Navy face au scanner DEXA ou à une balance impédancemètre ?"
    answer: "Comparée aux méthodes cliniques de référence comme l'absorptiométrie biphotonique (DEXA) ou la pesée hydrostatique, la formule de l'US Navy présente une erreur standard d'environ ±3 à 4 points de pourcentage. Elle s'avère souvent plus reproductible dans le temps qu'une balance impédancemètre grand public, dont la lecture varie fortement selon l'hydratation, la transpiration ou le dernier repas."
  - question: "Existe-t-il un danger à descendre sous le seuil de graisse essentielle ?"
    answer: "Oui. Le tissu adipeux essentiel (environ 2 à 5 % chez l'homme et 10 à 13 % chez la femme) protège les organes internes, isole le système nerveux et assure la synthèse des hormones stéroïdiennes. Descendre durablement sous ces seuils expose à une fatigue chronique, une baisse immunitaire, des troubles endocriniens et, chez la sportive, à une aménorrhée associée à une déminéralisation osseuse (syndrome RED-S)."
---

Le poids affiché sur une balance ne révèle pas la **composition corporelle**. Deux adultes de même taille et de même masse peuvent présenter des profils métaboliques opposés selon l'équilibre entre leur **masse grasse** (tissu adipeux essentiel et de réserve) et leur **masse maigre** (muscles, squelette, organes vitaux et eau).

Notre calculatrice d'indice de masse grasse (IMG) applique la **méthode anthropométrique de la Marine américaine (US Navy)** à partir de mensurations prises au mètre ruban, en unités métriques (`cm`, `kg`) ou impériales. Elle détermine votre taux de graisse corporelle, le poids exact de votre masse grasse et de votre masse maigre, ainsi que votre catégorie clinique.

## Équations de Densité Corporelle (US Navy) et de Siri

Développée par James Hodgdon et Marcia Beckett au Naval Health Research Center (1984), la méthode US Navy combine deux étapes biophysiques : une régression logarithmique estime d'abord la **densité corporelle** ($D_b$, en $\text{g/cm}^3$), puis l'**équation de Siri** (1956) convertit cette densité en pourcentage lipidique (sur la base de $0{,}900\text{ g/cm}^3$ pour le tissu adipeux et $1{,}100\text{ g/cm}^3$ pour la masse maigre) :

$$\text{IMG (\%)} = \frac{495}{D_b} - 450$$

Avec toutes les circonférences et la stature exprimées en centimètres (`cm`), les formules s'écrivent :

* **Homme** (sous la condition $T > C$) :
  $$\text{IMG}_{\text{homme}} = \frac{495}{1{,}0324 - 0{,}19077 \times \log_{10}(T - C) + 0{,}15456 \times \log_{10}(H)} - 450$$
* **Femme** (sous la condition $T + B > C$) :
  $$\text{IMG}_{\text{femme}} = \frac{495}{1{,}29579 - 0{,}35004 \times \log_{10}(T + B - C) + 0{,}22100 \times \log_{10}(H)} - 450$$

* **$H$** : stature debout (`cm`).
* **$C$** : tour de cou sous le larynx (`cm`).
* **$T$** : tour de taille, au nombril chez l'homme et au point le plus étroit chez la femme (`cm`).
* **$B$** : tour de hanches au point maximal des fessiers, requis uniquement chez la femme (`cm`).
* **$P$** : poids total (`kg`), donnant $M_{\text{grasse}} = P \times \frac{\text{IMG}}{100}$ et $M_{\text{maigre}} = P - M_{\text{grasse}}$.

Dans l'outil, l'âge (entre 15 et 120 ans) valide uniquement le cadre adulte de l'équation, qui ne dépend pas de l'IMC contrairement à la formule de Deurenberg.

## Exemples Chiffrés Pas à Pas (Homme et Femme)

### Cas 1 : Homme de 34 ans

Pour un poids de **80,0 kg**, une taille de **178 cm**, un tour de cou de **39 cm** et un tour de taille au nombril de **86 cm** :

1. **Différence abdominale** : $T - C = 86 - 39 = 47\text{ cm}$, soit $\log_{10}(47) \approx 1{,}67210$ et $\log_{10}(178) \approx 2{,}25042$.
2. **Densité corporelle** : $D_b = 1{,}0324 - 0{,}19077 \times 1{,}67210 + 0{,}15456 \times 2{,}25042 \approx 1{,}06124\text{ g/cm}^3$.
3. **Résultats** : $\text{IMG} = \frac{495}{1{,}06124} - 450 \approx \mathbf{16{,}44\,\%}$ (affiché **16,4 %**, catégorie **Fitness**), soit **13,15 kg** de masse grasse et **66,85 kg** de masse maigre.

### Cas 2 : Femme de 31 ans

Pour un poids de **62,0 kg**, une taille de **165 cm**, un cou de **33 cm**, une taille au point le plus fin de **72 cm** et des hanches de **98 cm** :

1. **Somme anthropométrique** : $T + B - C = 72 + 98 - 33 = 137\text{ cm}$, soit $\log_{10}(137) \approx 2{,}13672$ et $\log_{10}(165) \approx 2{,}21748$.
2. **Densité corporelle** : $D_b = 1{,}29579 - 0{,}35004 \times 2{,}13672 + 0{,}22100 \times 2{,}21748 \approx 1{,}03792\text{ g/cm}^3$.
3. **Résultats** : $\text{IMG} = \frac{495}{1{,}03792} - 450 \approx \mathbf{26{,}92\,\%}$ (affiché **26,9 %**, catégorie **Moyen**), soit **16,69 kg** de masse grasse et **45,31 kg** de masse maigre.

## Grille de Référence Clinique de l'IMG (Normes ACE)

Notre calculateur classe votre taux selon les seuils de l'American Council on Exercise (ACE), utilisés en médecine du sport et en nutrition francophone :

| Catégorie | Homme (%) | Femme (%) | Interprétation clinique |
| :--- | :--- | :--- | :--- |
| **Sous le seuil essentiel** | < 2 % | < 10 % | Déficit critique : risques endocrinien, osseux et immunitaire |
| **Graisse essentielle** | 2 % – 5 % | 10 % – 13 % | Minimum vital (organes, hormones) ; réservé aux pics compétitifs |
| **Athlète** | 6 % – 13 % | 14 % – 20 % | Profil sportif entraîné (endurance, sports à catégories de poids) |
| **Fitness** | 14 % – 17 % | 21 % – 24 % | Composition athlétique durable, risque cardiométabolique faible |
| **Moyen** | 18 % – 24 % | 25 % – 31 % | Zone de santé générale satisfaisante pour la majorité des adultes |
| **Obèse (excès adipeux)** | ≥ 25 % | ≥ 32 % | Excès adipeux majorant le risque cardiovasculaire et diabétique |

En référence clinique, le scanner **DEXA** reste l'étalon-or ($\pm 1\text{ à }2\,\%$), devant la pince à plis cutanés ($\pm 3\,\%$), la méthode US Navy ($\pm 3\text{ à }4\,\%$) et les balances impédancemètres domestiques ($\pm 4\text{ à }6\,\%$ selon l'hydratation).

## Protocole de Prise de Mensurations et Pièges Fréquents

* **Mesurer le matin à jeun** : Un ballonnement digestif ajoutant seulement **+2 cm** au tour de taille dans notre exemple masculin (`88 cm` au lieu de `86 cm`) fait grimper l'IMG de **16,44 % à 17,96 %** (`+1,52 point`), suffisant pour basculer de catégorie.
* **Respecter les repères anatomiques** : Placez un mètre ruban souple parfaitement horizontal, sans comprimer la peau. Mesurez le cou sous le larynx, la taille en fin d'expiration naturelle sans rentrer le ventre (**au nombril** chez l'homme, **au creux le plus fin** chez la femme) et les hanches au pourtour maximal des fessiers, pieds joints.
* **Privilégier le suivi mensuel** : Répétez le protocole toutes les deux à quatre semaines dans des conditions identiques pour suivre l'évolution parallèle de votre masse grasse et de votre masse maigre plutôt qu'un chiffre ponctuel.
* **Tenir compte des limites morphologiques** : Un cou très développé en musculation peut minorer l'estimation ; par ailleurs, la formule ne s'applique pas durant la grossesse ni chez l'enfant, où seul un suivi médical ou diététique fait foi.
