---
title: "Calculateur d'Allure"
metaTitle: "Calculateur d'Allure : Rythme, Temps et Distance de Course"
description: "Calculez votre allure de course au kilomètre ou au mile, estimez votre temps final sur 5 km, 10 km, semi-marathon ou marathon et convertissez votre vitesse en km/h."
metaDescription: "Calculez votre allure en min/km, estimez votre temps final sur 5 km, 10 km, semi-marathon ou marathon et convertissez vos allures en km/h et min/mi."
metaKeywords: "calculateur d'allure, calcul allure course à pied, allure marathon min/km, convertir vitesse km/h en allure, temps de passage semi-marathon, allure 10 km, rythme de course"
faqs:
  - question: "Quelle est la différence entre l'allure (min/km) et la vitesse (km/h), et comment les convertir ?"
    answer: "L'allure indique le temps nécessaire pour parcourir un kilomètre (en minutes et secondes par kilomètre), tandis que la vitesse exprime la distance parcourue en une heure (en km/h). Les deux grandeurs sont inverses : V (km/h) = 3 600 / Allure (en secondes par km). Par exemple, une allure de 5 min 00 s/km (300 secondes) correspond à 12,00 km/h, et 4 min 30 s/km (270 secondes) équivaut à 13,33 km/h."
  - question: "Pourquoi le chrono officiel d'un marathon dépasse-t-il souvent l'allure moyenne affichée par ma montre GPS ?"
    answer: "Un parcours labellisé (Fédération Française d'Athlétisme, Swiss Athletics ou Fédération québécoise d'athlétisme) est mesuré à la corde la plus courte possible. En peloton, les dépassements et les virages pris au large allongent la distance réelle de 250 à 500 mètres, tandis que les immeubles urbains perturbent le signal satellitaire. Sur 42,195 km, viser 2 à 3 secondes plus vite au kilomètre à la montre — ou suivre un bracelet de temps de passage calé sur les bornes officielles — sécurise l'objectif chronométrique."
  - question: "Comment adapter son allure cible sur un parcours vallonné ou face au vent ?"
    answer: "Sur route vallonnée, une montée d'un pour cent de pente moyenne ralentit l'allure d'environ 12 à 15 secondes par kilomètre à effort cardiaque constant, alors qu'une descente équivalente ne fait regagner que 6 à 8 secondes. En course nature ou sentier, la méthode du kilomètre-effort ajoute approximativement 1 km équivalent plat par tranche de 100 mètres de dénivelé positif cumulé."
  - question: "À quelle allure courir en endurance fondamentale par rapport à son allure de course sur 10 km ?"
    answer: "Selon les principes d'entraînement polarisé appliqués en athlétisme francophone, 75 % à 80 % du volume hebdomadaire doit s'effectuer en endurance fondamentale (aisance respiratoire complète, soit 60 % à 70 % de la vitesse maximale aérobie). En pratique, cette allure se situe généralement entre 1 min 00 s et 1 min 30 s par kilomètre plus lentement que votre allure record sur 10 km."
  - question: "Pourquoi faut-il passer par les secondes totales plutôt que d'utiliser des minutes décimales ?"
    answer: "Le temps relève du système sexagésimal (base 60) et non du système décimal (base 100). Une allure de 4 min 30 s/km correspond à 4,50 minutes et jamais à 4,30 minutes. Multiplier 4,30 par 42,195 km produit une prévision de 3 h 01 min 26 s au lieu de 3 h 09 min 53 s, soit une erreur de 8 minutes et 27 secondes sur un marathon."
---

En course à pied, en cyclisme comme en marche rapide, l'**allure** demeure l'indicateur de pilotage privilégié des athlètes. Contrairement à la vitesse horaire, elle exprime le temps exact nécessaire pour franchir une unité de distance — le kilomètre ($\text{min:s/km}$) dans la francophonie métrique (France, Belgique, Suisse, Québec) ou le mile ($\text{min:s/mi}$) en Amérique du Nord — traduisant chaque objectif en repères concrets à la borne kilométrique.

Ce calculateur résout le triptyque **temps – distance – allure** selon trois modes : déterminer l'allure moyenne requise pour un chrono cible, estimer le temps final à rythme constant ou calculer la distance couverte sur une durée donnée, y compris sur formats homologués ($5\text{ km}$, $10\text{ km}$, semi-marathon et marathon).

## Les Équations Fondamentales de l'Allure et de la Vitesse

Tout calcul fiable débute par la conversion de la durée en heures ($h$), minutes ($m$) et secondes ($s$) en **secondes totales** ($T_{\text{s}}$) afin d'écarter toute erreur liée à la base 60 :

$$T_{\text{s}} = 3\,600 \cdot h + 60 \cdot m + s$$

Une fois le temps exprimé en secondes et la distance normalisée en kilomètres ($D_{\text{km}}$), les trois modes reposent sur la relation cinématique suivante :

$$A_{\text{s/km}} = \frac{T_{\text{s}}}{D_{\text{km}}}, \qquad T_{\text{s}} = D_{\text{km}} \times A_{\text{s/km}}, \qquad D_{\text{km}} = \frac{T_{\text{s}}}{A_{\text{s/km}}}$$

Dans ces équations :

* **$T_{\text{s}}$** désigne la durée totale de l'effort en secondes ($\text{s}$).
* **$D_{\text{km}}$** représente la distance en kilomètres ($\text{km}$), incluant les distances officielles de la Fédération Française d'Athlétisme : $5{,}000\text{ km}$, $10{,}000\text{ km}$, **$21{,}0975\text{ km}$** (semi-marathon) et **$42{,}195\text{ km}$** (marathon).
* **$A_{\text{s/km}}$** est l'allure en secondes par kilomètre, convertie en minutes entières $m_A = \lfloor A_{\text{s/km}} / 60 \rfloor$ et secondes restantes $s_A = A_{\text{s/km}} - 60 \cdot m_A$.

Pour passer à la **vitesse moyenne horaire** ($V$ en $\text{km/h}$) ou convertir en unité impériale ($1\text{ mile} = 1{,}60934\text{ km}$), on applique :

$$V_{\text{km/h}} = \frac{3\,600}{A_{\text{s/km}}} = \frac{60}{A_{\text{min/km}}}, \qquad A_{\text{s/mi}} = A_{\text{s/km}} \times 1{,}60934$$

## Exemples Chiffrés Pas à Pas : Objectif Marathon et Sortie Calibrée

### Cas n° 1 : Quelle allure tenir pour courir un marathon en 3 h 45 min 00 s ?

Un coureur prépare un marathon officiel ($D = 42{,}195\text{ km}$) avec l'objectif d'achever l'épreuve en **$3\text{ h }45\text{ min }00\text{ s}$**.

1. **Conversion en secondes totales** :
   $$T_{\text{s}} = (3 \times 3\,600) + (45 \times 60) = 10\,800 + 2\,700 = 13\,500\text{ s}$$
2. **Allure requise au kilomètre** :
   $$A_{\text{s/km}} = \frac{13\,500}{42{,}195} \approx 319{,}943\text{ s/km}$$
   Comme $319{,}943 = 5 \times 60 + 19{,}943$, l'allure cible exacte s'établit à **$5\text{ min }20\text{ s/km}$**.
3. **Vitesse horaire et équivalence au mile** :
   * Vitesse moyenne : $V = 3\,600 / 319{,}943 = \mathbf{11{,}25\text{ km/h}}$.
   * Allure impériale : $319{,}943 \times 1{,}60934 = 514{,}90\text{ s/mi}$, soit **$8\text{ min }35\text{ s/mi}$**.
4. **Temps de passage clés** : $53\text{ min }19\text{ s}$ au $10^{\text{e}}\text{ km}$, $1\text{ h }52\text{ min }30\text{ s}$ au semi-marathon et $2\text{ h }39\text{ min }58\text{ s}$ au $30^{\text{e}}\text{ km}$.

### Cas n° 2 : Prédire un temps sur 10 km et calibrer une séance de 50 minutes

* **Mode Temps** : À une allure spécifique de **$4\text{ min }45\text{ s/km}$** ($285\text{ s/km}$, soit $12{,}63\text{ km/h}$), un $10\text{ km}$ s'achève en $10 \times 285 = 2\,850\text{ s}$, soit **$47\text{ min }30\text{ s}$**.
* **Mode Distance** : Lors d'une séance d'endurance fondamentale de **$50\text{ min}$** ($3\,000\text{ s}$) à **$6\text{ min }00\text{ s/km}$** ($360\text{ s/km}$), la distance parcourue vaut $3\,000 / 360 = \mathbf{8{,}33\text{ km}}$ ($5{,}18\text{ miles}$).

## Tableau de Correspondance : Allures, Vitesses et Chronos Officiels

| Allure (min:s/km) | Allure (min:s/mi) | Vitesse (km/h) | 5 km | 10 km | Semi-marathon | Marathon |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **3:30** | 5:38 | 17,14 | 17:30 | 35:00 | 1:13:50 | 2:27:41 |
| **4:00** | 6:26 | 15,00 | 20:00 | 40:00 | 1:24:23 | 2:48:47 |
| **4:30** | 7:15 | 13,33 | 22:30 | 45:00 | 1:34:56 | 3:09:53 |
| **5:00** | 8:03 | 12,00 | 25:00 | 50:00 | 1:45:29 | 3:30:59 |
| **5:30** | 8:51 | 10,91 | 27:30 | 55:00 | 1:56:02 | 3:52:04 |
| **6:00** | 9:39 | 10,00 | 30:00 | 1:00:00 | 2:06:35 | 4:13:10 |
| **6:30** | 10:28 | 9,23 | 32:30 | 1:05:00 | 2:17:08 | 4:34:16 |
| **7:00** | 11:16 | 8,57 | 35:00 | 1:10:00 | 2:27:41 | 4:55:22 |

*Chronos au format $\text{min:s}$ ou $\text{h:min:s}$ sur distances officielles ($21{,}0975\text{ km}$ et $42{,}195\text{ km}$).*

## Stratégies de Course et Pièges Fréquents de Calcul d'Allure

* **Éviter la confusion entre base 60 et notation décimale** : Saisir $5{,}30$ au lieu de $5{,}50\text{ min}$ pour $5\text{ min }30\text{ s/km}$ crée une dérive de $12\text{ s/km}$, soit plus de huit minutes d'erreur sur marathon. Travaillez toujours en secondes avant toute opération.
* **Anticiper l'écart entre montre GPS et balisage officiel** : En peloton, la distance GPS excède souvent la distance mesurée de $0{,}5\,\%$ à $1{,}2\,\%$ (virages au large et immeubles). Préparez un bracelet de temps de passage et vérifiez vos chronos cumulés aux bornes physiques du parcours plutôt qu'à l'allure instantanée.
* **Privilégier une seconde moitié légèrement plus rapide** : Partir $15$ à $20\text{ s/km}$ trop vite sous l'adrénaline accélère l'acidose musculaire et épuise le glycogène. Démarrer $5\text{ s/km}$ sous la cible sur les trois premiers kilomètres puis accélérer dans le dernier quart limite la défaillance après le $30^{\text{e}}\text{ km}$.
* **Hiérarchiser ses zones autour de la VMA** : À partir de votre vitesse maximale aérobie (VMA) ou d'un chrono récent sur piste ($400\text{ m}$ étalonné), répartissez le travail entre endurance fondamentale ($60\text{ à }70\,\%$), allure marathon ($75\text{ à }82\,\%$), seuil anaérobie ($85\text{ à }88\,\%$) et fractionné court ($95\text{ à }105\,\%$) pour progresser sans surmenage.
