---
title: "Calculateur de Béton"
metaTitle: "Calculateur de Béton : Volume en m³, Verges Cubes et Sacs"
description: "Estimez précisément le volume de béton nécessaire pour vos dalles, fondations et poteaux cylindriques en mètres cubes ou verges cubes, ainsi que le nombre de sacs prémélangés à prévoir."
metaDescription: "Calculez le volume exact de béton en m³ ou verges cubes pour vos dalles et poteaux, estimez vos sacs prémélangés et prévoyez la marge de chantier."
metaKeywords: "calculateur de béton, calcul volume béton m3, dalle béton épaisseur, nombre de sacs béton, béton prêt à l'emploi, dosage béton 350 kg, verges cubes béton, poteau cylindrique"
faqs:
  - question: "Combien de sacs de béton prémélangé faut-il pour obtenir 1 m³ de béton ?"
    answer: "En Europe francophone, 1 m³ de béton nécessite environ 80 sacs prémélangés de 25 kg (rendement moyen de 12,5 L par sac) ou environ 57 sacs de 35 kg (environ 17,5 L par sac). En formats nord-américains affichés par le calculateur, 1 m³ correspond à 59 sacs de 36 kg (80 lb) ou 79 sacs de 27 kg (60 lb)."
  - question: "Quelle épaisseur minimale prévoir pour une dalle en béton selon son usage ?"
    answer: "Prévoyez 10 à 12 cm d'épaisseur pour une terrasse piétonne ou une dalle d'abri de jardin sur hérisson compacté, 12 à 15 cm avec treillis soudé pour une allée carrossable ou un garage de véhicule léger, et 15 à 20 cm fortement armés pour le passage de véhicules utilitaires lourds."
  - question: "Pourquoi ajouter une marge de sécurité de 5 à 10 % au volume géométrique calculé ?"
    answer: "Un fond de fouille n'est jamais parfaitement plan, la poussée hydrostatique du béton frais (environ 2 400 kg/m³) fait légèrement fléchir les planches de coffrage, la vibration compacte le mélange et une partie reste collée dans la bétonnière, la goulotte ou le tuyau de pompe. Une marge de 5 à 10 % évite une rupture de coulage irréversible."
  - question: "À partir de quel volume vaut-il mieux commander une toupie plutôt que des sacs ?"
    answer: "Dès 1 à 1,5 m³, le béton prêt à l'emploi livré par camion toupie devient nettement plus avantageux. Fabriquer 2 m³ en sacs implique de manipuler plus de 4,5 tonnes de matière à la bétonnière et expose à des reprises de bétonnage fragiles, alors qu'une toupie garantit une classe de résistance homogène C25/30 en une seule coulée."
  - question: "Comment convertir des mètres cubes de béton en verges cubes pour un chantier au Québec ?"
    answer: "Un mètre cube vaut exactement 35,3147 pieds cubes, soit 1,308 verge cube (1 verge cube = 27 pieds cubes = 0,7646 m³). Notre calculateur accepte directement le système métrique (mètres et centimètres) comme le système impérial (pieds et pouces) et convertit automatiquement votre volume."
---

Estimer avec justesse le volume de béton avant de commander ses matériaux demeure indispensable sur tout chantier de maçonnerie ou d'aménagement extérieur. Le béton frais pèse environ **2 350 à 2 400 kg/m³** et sa prise hydraulique est irréversible : manquer de 0,25 m³ en cours de coulage crée une **reprise de bétonnage** qui fragilise l'ouvrage, tandis qu'une surestimation alourdit le budget (souvent **140 à 190 € TTC/m³** livré hors pompage) et impose d'évacuer les surplus.

Notre **calculateur de béton** évalue instantanément le cubage de vos projets en **mètres cubes (`m³`)** ou en **verges cubes (`yd³`)** pour une **dalle rectangulaire** ou un **poteau cylindrique**, en système métrique (SI) comme en système impérial, avec estimation directe des sacs prémélangés.

## Formules géométriques de volume et rendement des sacs

### Dalle rectangulaire et poteau cylindrique

En unités SI, la longueur $L$, la largeur $l$ et la profondeur $h$ se saisissent en mètres, tandis que l'épaisseur $e$ et le diamètre $D$ sont exprimés en centimètres :

$$V_{\text{dalle}} = L \times l \times \frac{e}{100}, \qquad V_{\text{cyl}} = \pi \times \left(\frac{D}{200}\right)^{2} \times h$$

* **$L, l$** : longueur et largeur intérieures du coffrage, en mètres.
* **$e$** : épaisseur moyenne de la dalle, en centimètres (divisée par 100 pour convertir en mètres).
* **$D, h$** : diamètre du forage ou coffrage tubulaire (en cm, donnant un rayon $r = D / 200$ en m) et profondeur en mètres. Pour $N$ plots identiques, le volume total vaut $N \times V_{\text{cyl}}$.

En système impérial (courant au Québec), la conversion repose sur $1\text{ m}^3 = 35{,}3147\text{ pi}^3$ et $1\text{ verge cube} = 27\text{ pi}^3$, soit $V_{\text{yd}^3} = V_{\text{m}^3} \times 1{,}30795$.

### Marge de chantier et estimation des sacs prémélangés

Ajoutez systématiquement une marge de perte $m$ de **5 % à 10 %**, puis divisez par le rendement unitaire $r_{\text{sac}}$ en arrondissant à l'entier supérieur :

$$V_{\text{commande}} = V_{\text{théorique}} \times (1 + m), \qquad N_{\text{sacs}} = \left\lceil \frac{V_{\text{commande}}}{r_{\text{sac}}} \right\rceil$$

Le calculateur utilise les formats nord-américains standards : **0,0170 m³** (`0,60 pi³`) par sac de **36 kg (80 lb)** et **0,0127 m³** (`0,45 pi³`) par sac de **27 kg (60 lb)**. En Europe francophone, comptez environ **0,0125 m³** (12,5 L) par sac de **25 kg** et **0,0175 m³** (17,5 L) par sac de **35 kg**.

## Exemples chiffrés pas à pas : terrasse et scellement de clôture

### Cas 1 : Dalle de terrasse armée (6,0 m × 4,0 m × 12 cm)

1. **Volume géométrique** : $6{,}0 \times 4{,}0 \times 0{,}12 = \mathbf{2{,}88\text{ m}^3}$, équivalent à **3,77 verges cubes**.
2. **Volume à commander (+10 %)** : $2{,}88 \times 1{,}10 = 3{,}168\text{ m}^3$. Les centrales facturant par tranches de 0,25 ou 0,50 m³, on commande **3,25 m³** de béton prêt à l'emploi C25/30.
3. **Sacs contre toupie** : En sacs de 35 kg (17,5 L), ce volume représenterait **182 sacs**, soit plus de **6,3 tonnes** à malaxer. À un tarif indicatif de **165 €/m³**, une livraison toupie de 3,25 m³ coûte **536,25 €** (hors frais éventuels de petit cubage ou pompe) et garantit un coulage homogène en moins d'une heure.

### Cas 2 : Scellement de 10 poteaux (diamètre 30 cm, profondeur 80 cm)

1. **Volume d'un trou** (rayon 0,15 m, profondeur 0,80 m) : $\pi \times 0{,}15^{2} \times 0{,}80 = \mathbf{0{,}05655\text{ m}^3}$ (56,5 L).
2. **Total pour 10 poteaux avec 10 % de marge** : $10 \times 0{,}05655 \times 1{,}10 = \mathbf{0{,}622\text{ m}^3}$ (21,97 pi³).
3. **Nombre de sacs** : **37 sacs de 36 kg (80 lb)** ou **49 sacs de 27 kg (60 lb)** — soit **50 sacs de 25 kg** ou **36 sacs de 35 kg** en négoce européen, volume parfaitement gérable à la bétonnière.

## Tableau de référence : épaisseurs, classes NF EN 206 et dosages

Ce guide récapitule les épaisseurs courantes, la classe européenne (**NF EN 206/CN**) et le dosage en ciment pour une fabrication à la bétonnière :

| Type d'ouvrage | Épaisseur / dimensions | Classe béton | Dosage ciment | Armature conseillée |
| :--- | :--- | :--- | :--- | :--- |
| **Béton de propreté** | 5 cm en fond de fouille | C12/15 | 150 – 200 kg/m³ | Non armé |
| **Terrasse piétonne / abri** | 10 à 12 cm sur hérisson | C20/25 | 300 kg/m³ | Treillis PAF / ST10 |
| **Allée carrossable / garage** | 12 à 15 cm | C25/30 | 350 kg/m³ | Treillis soudé ST25C |
| **Fondation / semelle filante** | 20 à 30 cm (hors gel) | C25/30 – C30/37 | 350 – 400 kg/m³ | Chaînage armé HA10 |
| **Scellement de poteaux** | Ø 25 à 35 cm, prof. 60 – 80 cm | C20/25 – C25/30 | 300 – 350 kg/m³ | Facultative |

Pour gâcher **1 m³ de béton courant à 350 kg/m³**, prévoyez **10 sacs de ciment de 35 kg** (ou 14 de 25 kg), **800 kg de sable**, **1 050 kg de gravier** (4/20 mm) et **175 L d'eau**.

## Erreurs de chantier fréquentes et précautions avant coulage

* **Confondre mètres et centimètres à la saisie** : En mode métrique, l'épaisseur de dalle et le diamètre des poteaux s'entrent en **centimètres**, tandis que longueur, largeur et profondeur sont en **mètres**. Saisir `0,12` au lieu de `12` pour une dalle de 12 cm divise le volume par 100.
* **Négliger le nivellement du fond de forme** : Sur une terrasse de 24 m², un creux moyen de seulement 1,5 cm au centre absorbe **0,36 m³ supplémentaires** (21 sacs de 35 kg). Compactez soigneusement le hérisson de gravier, posez un film polyane et contreventez solidement le coffrage.
* **Ajouter trop d'eau pour fluidifier le mélange** : Dépasser un rapport eau/ciment de 0,50 à 0,55 fait chuter la résistance mécanique et multiplie les fissures de retrait. Pour un coulage fluide en centrale, commandez plutôt une consistance `S3` ou `S4` obtenue par plastifiant.
* **Oublier les frais de « vide sur toupie » et l'accès camion** : Une toupie transporte 6 à 8 m³ et pèse jusqu'à 32 tonnes ; sous un seuil minimal (souvent 4 à 5 m³), la centrale facture un forfait de transport complémentaire. Vérifiez toujours la largeur et la portance de l'accès avant la livraison.
