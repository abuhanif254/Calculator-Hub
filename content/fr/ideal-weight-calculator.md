---
title: "Calculateur de Poids Idéal"
metaTitle: "Calculateur de Poids Idéal : Formules Médicales et IMC"
description: "Estimez votre Poids Corporel Idéal (PCI) selon votre taille et votre sexe grâce aux quatre équations cliniques (Robinson, Miller, Hamwi, Devine) et à la fourchette d'IMC sain de l'OMS."
metaDescription: "Calculez votre poids idéal en kg selon votre taille et votre sexe avec les formules de Robinson, Miller, Hamwi et Devine ainsi que la plage IMC OMS."
metaKeywords: "calculateur de poids idéal, poids corporel idéal PCI, formule de Robinson, formule de Devine, formule de Miller, formule de Hamwi, fourchette IMC OMS, poids de forme, formule de Lorentz"
faqs:
  - question: "Pourquoi les quatre formules cliniques donnent-elles des résultats différents pour une même taille ?"
    answer: "Chaque équation repose sur une cohorte de référence et une pente de progression propres. Les modèles de Hamwi (1964) et Devine (1974) ont été élaborés pour le diabète et la posologie hospitalière à partir de données actuarielles anciennes, tandis que Robinson et Miller (1983) ont recalibré ces courbes sur des tables de mortalité actualisées. L'écart entre modèles reflète naturellement la diversité des ossatures humaines."
  - question: "À quoi sert concrètement le Poids Corporel Idéal en médecine hospitalière ?"
    answer: "Au-delà du suivi nutritionnel, le PCI demeure un paramètre clé en pharmacologie clinique et en réanimation. Il sert à ajuster la posologie de médicaments hydrosolubles peu distribués dans le tissu adipeux (aminosides, aciclovir) et à calculer le volume courant en ventilation mécanique protectrice (généralement 6 à 8 mL par kilogramme de poids idéal théorique, et non de poids réel)."
  - question: "Comment la formule de Lorentz utilisée en francophonie se situe-t-elle par rapport à ces quatre modèles ?"
    answer: "Très enseignée dans les facultés de médecine et de diététique en France, en Belgique et en Suisse, la formule de Lorentz estime le poids idéal par P = T - 100 - (T - 150) / 4 chez l'homme et / 2,5 chez la femme (T en cm). Pour un homme de 178 cm, elle donne 71,0 kg — un résultat quasiment identique à celui de Robinson (71,1 kg) et de Miller (70,4 kg)."
  - question: "Un sportif très musclé doit-il chercher à rentrer dans son Poids Corporel Idéal ?"
    answer: "Non. Les équations de PCI et l'IMC ne différencient pas la masse musculaire squelettique de la masse grasse. Un pratiquant de musculation, de rugby ou d'aviron peut dépasser son PCI de 10 à 15 % tout en affichant un taux de masse grasse bas et un bilan métabolique optimal. Le tour de taille et l'impédancemétrie apportent alors une évaluation bien plus pertinente."
  - question: "Ces formules s'appliquent-elles aux enfants, aux femmes enceintes ou aux personnes de plus de 65 ans ?"
    answer: "Non, elles sont exclusivement calibrées pour des adultes non enceintes âgés de 18 à 65 ans. Chez l'enfant et l'adolescent, seules les courbes de corpulence selon l'âge et le sexe font foi. Chez les seniors de plus de 65 à 70 ans, les recommandations cliniques (Haute Autorité de Santé, Santé Canada) privilégient une marge de réserve protectrice contre la dénutrition, avec un IMC cible souvent compris entre 22 et 27 kg/m²."
---

Le **Poids Corporel Idéal (PCI)** n'est pas une norme esthétique arbitraire : élaboré en milieu hospitalier pour la posologie médicamenteuse, la nutrition clinique et la ventilation assistée, il fournit aujourd'hui un **repère anthropométrique chiffré**, d'autant plus pertinent qu'il s'interprète comme une fourchette plutôt qu'un chiffre rigide.

Ce calculateur combine les **quatre équations médicales de référence** — **Robinson**, **Miller**, **Hamwi** et **Devine** — avec la **plage d'Indice de Masse Corporelle (IMC) sain** de l'Organisation Mondiale de la Santé (OMS), en unités métriques (`cm`, `kg`) comme impériales (`pieds`, `pouces`, `livres`).

## Les Quatre Formules Cliniques et la Plage d'IMC de l'OMS

Ces quatre équations linéaires reposent sur une taille de base de **$152{,}4\text{ cm}$** ($5\text{ pieds}$, soit $60\text{ pouces}$), augmentée d'une pente constante par pouce supplémentaire ($2{,}54\text{ cm}$). Pour une taille $T_{\text{cm}}$ en centimètres, l'écart en pouces vaut :

$$d = \frac{T_{\text{cm}}}{2{,}54} - 60$$

Le Poids Corporel Idéal ($PCI$, en kilogrammes `kg`) s'exprime alors selon le sexe biologique :

* **J. D. Robinson (1983)** : Homme $PCI = 52{,}0 + 1{,}90 \cdot d$ ; Femme $PCI = 49{,}0 + 1{,}70 \cdot d$.
* **D. R. Miller (1983)** : Homme $PCI = 56{,}2 + 1{,}41 \cdot d$ ; Femme $PCI = 53{,}1 + 1{,}36 \cdot d$.
* **G. J. Hamwi (1964)** : Homme $PCI = 48{,}0 + 2{,}70 \cdot d$ ; Femme $PCI = 45{,}5 + 2{,}20 \cdot d$.
* **B. J. Devine (1974)** : Homme $PCI = 50{,}0 + 2{,}30 \cdot d$ ; Femme $PCI = 45{,}5 + 2{,}30 \cdot d$.

En parallèle, la **fourchette d'IMC sain de l'OMS** ($18{,}5$ à $25{,}0\text{ kg/m}^2$) convertit la taille en mètres ($T_{\text{m}} = T_{\text{cm}} / 100$) en bornes pondérales :

$$P_{\min} = 18{,}5 \times T_{\text{m}}^2 \qquad \text{et} \qquad P_{\max} = 25{,}0 \times T_{\text{m}}^2$$

## Exemples Chiffrés Pas à Pas : Profils Masculin et Féminin

### Cas n° 1 : Homme adulte mesurant 178 cm ($1{,}78\text{ m}$)

1. **Écart au seuil de référence** : $T_{\text{pouces}} = 178 / 2{,}54 = 70{,}079\text{ pouces}$, soit $d = 10{,}079\text{ pouces}$.
2. **Résultats des quatre équations cliniques** :
   * **Robinson** : $52{,}0 + (1{,}90 \times 10{,}079) = \mathbf{71{,}1\text{ kg}}$
   * **Miller** : $56{,}2 + (1{,}41 \times 10{,}079) = \mathbf{70{,}4\text{ kg}}$
   * **Devine** : $50{,}0 + (2{,}30 \times 10{,}079) = \mathbf{73{,}2\text{ kg}}$
   * **Hamwi** : $48{,}0 + (2{,}70 \times 10{,}079) = \mathbf{75{,}2\text{ kg}}$
3. **Plage d'IMC sain OMS** ($T_{\text{m}}^2 = 3{,}1684\text{ m}^2$) : de $18{,}5 \times 3{,}1684 = \mathbf{58{,}6\text{ kg}}$ à $25{,}0 \times 3{,}1684 = \mathbf{79{,}2\text{ kg}}$.

Les quatre modèles convergent entre **$70{,}4$ et $75{,}2\text{ kg}$** (IMC de $22{,}2$ à $23{,}7\text{ kg/m}^2$), au cœur de la plage OMS et tout près de la formule francophone de Lorentz ($71{,}0\text{ kg}$).

### Cas n° 2 : Femme adulte mesurant 165 cm ($1{,}65\text{ m}$)

Avec $d = (165 / 2{,}54) - 60 = 4{,}961\text{ pouces}$ et $T_{\text{m}}^2 = 2{,}7225\text{ m}^2$ :

* **Robinson** : $49{,}0 + (1{,}70 \times 4{,}961) = \mathbf{57{,}4\text{ kg}}$ ; **Miller** : $53{,}1 + (1{,}36 \times 4{,}961) = \mathbf{59{,}8\text{ kg}}$.
* **Hamwi** : $45{,}5 + (2{,}20 \times 4{,}961) = \mathbf{56{,}4\text{ kg}}$ ; **Devine** : $45{,}5 + (2{,}30 \times 4{,}961) = \mathbf{56{,}9\text{ kg}}$.
* **Plage IMC OMS** : de **$50{,}4\text{ kg}$** à **$68{,}1\text{ kg}$**.

## Tableau Comparatif du Poids Corporel Idéal (en kg) de 155 à 190 cm

| Taille | Homme : Robinson / Miller | Homme : Devine / Hamwi | Femme : Robinson / Miller | Femme : Devine / Hamwi | Plage IMC OMS (18,5–25) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **155 cm** | 53,9 / 57,6 | 52,4 / 50,8 | 50,7 / 54,5 | 47,9 / 47,8 | 44,4 – 60,1 |
| **160 cm** | 57,7 / 60,4 | 56,9 / 56,1 | 54,1 / 57,2 | 52,4 / 52,1 | 47,4 – 64,0 |
| **165 cm** | 61,4 / 63,2 | 61,4 / 61,4 | 57,4 / 59,8 | 56,9 / 56,4 | 50,4 – 68,1 |
| **170 cm** | 65,2 / 66,0 | 65,9 / 66,7 | 60,8 / 62,5 | 61,4 / 60,7 | 53,5 – 72,2 |
| **175 cm** | 68,9 / 68,7 | 70,5 / 72,0 | 64,1 / 65,2 | 66,0 / 65,1 | 56,7 – 76,6 |
| **180 cm** | 72,6 / 71,5 | 75,0 / 77,3 | 67,5 / 67,9 | 70,5 / 69,4 | 59,9 – 81,0 |
| **185 cm** | 76,4 / 74,3 | 79,5 / 82,7 | 70,8 / 70,6 | 75,0 / 73,7 | 63,3 – 85,6 |
| **190 cm** | 80,1 / 77,1 | 84,0 / 88,0 | 74,2 / 73,2 | 79,5 / 78,1 | 66,8 – 90,2 |

## Affiner son Interprétation et Éviter les Biais Anthropométriques

* **Associer le PCI au tour de taille** : La répartition adipeuse abdominale prédit mieux le risque cardiométabolique que la masse totale. Croisez votre résultat avec le **tour de taille** (seuils OMS et Haute Autorité de Santé : $< 94\text{ cm}$ chez l'homme, $< 80\text{ cm}$ chez la femme) et le **rapport tour de taille sur taille** (cible $< 0{,}50$).
* **Tenir compte de la carrure osseuse** : La méthode de Hamwi prévoit un ajustement de **$-10\,\%$ pour une ossature fine** et **$+10\,\%$ pour une ossature large**, appréciée par le tour de poignet — expliquant l'amplitude de $15$ à $24\text{ kg}$ de la plage OMS.
* **Repérer les écarts aux tailles extrêmes** : Sous $155\text{ cm}$, Devine et Hamwi sous-estiment volontiers le poids féminin tandis que Miller reste plus stable ; au-delà de $185\text{ cm}$, la pente élevée de Hamwi creuse un écart notable ($+10{,}9\text{ kg}$ face à Miller à $190\text{ cm}$ chez l'homme).
* **Viser des paliers durables avec un professionnel** : En cas de surpoids installé ou de pathologie chronique, les sociétés savantes francophones privilégient des objectifs progressifs de $5\,\%$ à $10\,\%$ du poids initial, accompagnés par un médecin traitant ou un diététicien-nutritionniste.
