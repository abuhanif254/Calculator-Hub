---
title: "Calculateur de Jour de Neige"
metaTitle: "Calculateur de Jour de Neige | Probabilité de Fermeture"
description: "Estimez la probabilité de fermeture d'école ou d'ouverture retardée selon l'accumulation de neige en cm, le refroidissement éolien, le verglas, le salage et la sensibilité du district."
metaDescription: "Estimez la probabilité de fermeture d'école ou de retard selon la neige en cm, le refroidissement éolien, le verglas, le salage et le district."
metaKeywords: "calculateur de jour de neige, probabilité de fermeture d'école, prévision jour de neige, refroidissement éolien formule, pluie verglaçante transports scolaires, verglas noir routes, tempête hivernale école"
faqs:
  - question: "Pourquoi deux régions ferment-elles leurs écoles pour des hauteurs de neige très différentes ?"
    answer: "Tout dépend de la capacité locale de déneigement et de salage, traduite dans le calculateur par la sensibilité du district. Les plaines peu exposées de France atlantique ou de Belgique disposent de flottes réduites et basculent en alerte dès 5 cm de neige. À l'inverse, les régions alpines, le Jura ou le Québec déploient des chasse-neige en continu et maintiennent souvent les cours au-delà de 20 cm."
  - question: "Un froid extrême peut-il entraîner une fermeture d'école sans fortes chutes de neige ?"
    answer: "Oui. Dès que la température de l'air descend sous -12,2 °C ou que le refroidissement éolien passe sous -26,1 °C, le modèle applique une majoration de +25 points. À ce seuil, la peau exposée des élèves attendant à l'arrêt de car risque l'engelure en moins de trente minutes, les freins pneumatiques des autobus peuvent geler et le gazole hivernal approche sa limite de filtrabilité."
  - question: "Pourquoi la pluie verglaçante pèse-t-elle plus lourd que la neige poudreuse dans le calcul ?"
    answer: "La neige sèche se déblaie aisément et offre encore une motricité partielle aux pneus hiver. La pluie verglaçante forme instantanément une pellicule de glace transparente sur l'asphalte, les ponts et les lignes électriques : même quelques millimètres suffisent à rendre les côtes impraticables aux cars scolaires et à provoquer des coupures de courant. Le calculateur lui attribue +20 points en intensité légère et +45 points en intensité forte."
  - question: "Comment l'horaire des chutes de neige influence-t-il la probabilité de fermeture ?"
    answer: "Le créneau horaire crée un écart maximal de 30 points. Si les précipitations débutent entre 04:00 et 08:59, elles coïncident avec l'inspection des routes et le départ des cars scolaires, ajoutant +15 points au score. Si l'épisode s'achève à 04:00 ou plus tôt, les équipes de viabilité hivernale disposent de la fin de nuit pour déneiger et saler, ce qui retire 15 points."
  - question: "Qui décide officiellement d'une fermeture d'école en France, en Belgique, en Suisse et au Québec ?"
    answer: "Le calculateur fournit une estimation prévisionnelle et ne remplace jamais une décision officielle. En France, le préfet peut suspendre les transports scolaires par arrêté tandis que le rectorat ou le maire prononce la fermeture des établissements. En Belgique, en Suisse romande et au Québec, la décision relève respectivement des directions scolaires et communes, des départements cantonaux ou des centres de services scolaires, généralement communiquée entre 05:30 et 06:30."
---

Lorsqu'une perturbation hivernale frappe la France, la Belgique, la Suisse romande ou le Québec en fin de nuit, la hauteur de neige ne suffit jamais à prédire l'ouverture des classes. **Quatre centimètres de neige humide mêlée de pluie verglaçante** à l'aube bloquent les cars scolaires bien plus vite que douze centimètres de poudreuse déblayés avant le jour.

Ce **Calculateur de Jour de Neige** réunit météo en **unités SI** (`cm`, `°C`, `km/h`) et logistique scolaire : accumulation prévue et antérieure, température, **refroidissement éolien**, chaussée, salage, verglas, densité, visibilité, horaire, zone, niveau et transport.

## Équations du modèle et refroidissement éolien

### 1. Indice de refroidissement éolien (formule SI)

Pour $T \le 10\,^\circ\text{C}$ et $V \ge 4{,}8\text{ km/h}$, la température ressentie $T_{\text{re}}$ (en $^\circ\text{C}$) suit l'équation d'Environnement Canada et de l'Organisation météorologique mondiale :

$$T_{\text{re}} = 13{,}12 + 0{,}6215\,T - 11{,}37\,V^{0{,}16} + 0{,}3965\,T\,V^{0{,}16}$$

Hors de ces seuils, $T_{\text{re}} = T$.

### 2. Score additif de probabilité ($P$)

La neige effective $S_{\text{eff}}$ (en `cm`) ajoute la chute prévue $S_{\text{nouv}}$ et la moitié de la couche au sol $S_{\text{préc}}$, puis la convertit en base $B_{\text{neige}}$ via la sensibilité $k_s$ normée par pas de `2,54 cm` (un pouce) :

$$S_{\text{eff}} = S_{\text{nouv}} + 0{,}5\,S_{\text{préc}}, \qquad B_{\text{neige}} = \min\!\left(100\,;\, k_s \times \frac{S_{\text{eff}}}{2{,}54}\right)$$

$$P = \max\!\left(0\,;\, \min\!\left(100\,;\, \operatorname{arrondi}\!\left(B_{\text{neige}} + M_{\text{temp}} + M_{\text{route}} + M_{\text{glace}} + M_{\text{log}}\right)\right)\right)$$

* **$k_s$ (sensibilité)** : `45` en zone **élevée** (plaines tempérées, `17,72` pts/cm, plafond `5,6 cm`), `18` en zone **moyenne** (`7,09` pts/cm, plafond `14,1 cm`) et `9` en zone **faible** (Alpes, Jura, Québec, `3,54` pts/cm, plafond `28,2 cm`).
* **$M_{\text{temp}}$** : `-35` si $T > +2{,}2\,^\circ\text{C}$, `-15` entre `0` et `+2,2 °C`, `+10` entre `-7,8` et `0 °C`, `+25` si $T < -12{,}2\,^\circ\text{C}$ ou $T_{\text{re}} < -26{,}1\,^\circ\text{C}$ sous `-7,8 °C`.
* **$M_{\text{route}}$** : de `-15` (sèche) et `-5` (humide) à `+5` (fondante), `+20` (enneigée) et `+35` (dangereuse), moins `12` points avec salage actif.
* **$M_{\text{glace}}$** : pluie verglaçante (`+20` légère, `+45` forte), plaques de glace (`+8` moyen, `+20` élevé), verglas général (`+5` ou `+15`) et neige humide lourde (`+10`).
* **$M_{\text{log}}$** : rural (`+15`) ou urbain (`-10`), primaire (`+8`) ou université (`-25`), car scolaire ou marche (`+8`) ou transports publics (`-12`), visibilité réduite (`+10`) ou dangereuse (`+20`), début `04:00–08:59` (`+15`) ou fin `≤ 04:00` (`-15`).

## Exemple chiffré pas à pas : épisode matinal périurbain

Prenons une **école primaire** périurbaine de **sensibilité moyenne** ($k_s = 18$) avec **car scolaire** : $S_{\text{nouv}} = 5\text{ cm}$ de neige mixte (`05:00–11:00`), $S_{\text{préc}} = 2\text{ cm}$, $T = -3\,^\circ\text{C}$, $V = 25\text{ km/h}$, chaussée moyenne salée, risque moyen de plaques de glace, sans pluie verglaçante ni brouillard.

1. **Refroidissement éolien** : avec $25^{0{,}16} = \mathbf{1{,}673672}$,
   $$T_{\text{re}} = 13{,}12 + 0{,}6215(-3) - 11{,}37(1{,}673672) + 0{,}3965(-3)(1{,}673672) = \mathbf{-9{,}76\,^\circ\text{C}} \approx \mathbf{-10\,^\circ\text{C}}$$
2. **Base de neige** : $S_{\text{eff}} = 5 + 0{,}5(2) = \mathbf{6{,}0\text{ cm}}$, soit $B_{\text{neige}} = 18 \times (6{,}0 / 2{,}54) = \mathbf{42{,}52\text{ points}}$.
3. **Météo, chaussée et glace** : tenue au sol ($M_{\text{temp}} = \mathbf{+10}$), chaussée moyenne salée ($M_{\text{route}} = +5 - 12 = \mathbf{-7}$), plaques de glace moyennes ($M_{\text{glace}} = \mathbf{+8}$).
4. **Logistique** : primaire (`+8`), car scolaire (`+8`) et début à `05:00` (`+15`) donnent $M_{\text{log}} = \mathbf{+31}$.
5. **Score final** : $42{,}52 + 10 - 7 + 8 + 31 = \mathbf{84{,}52} \implies \mathbf{85\,\%}$ (**Très élevé**, fermeture quasi certaine).

**Variante nocturne** : si l'épisode s'achève à `03:00` (`21:00–03:00`), le terme horaire passe de `+15` à `-15` (`-30` points) et le score tombe à $54{,}52$, soit **`55 %`** (**Élevé**, zone de retard d'ouverture).

## Scénarios de référence et niveaux de risque

| Scénario francophone ($k_s$) | $S_{\text{eff}}$ / $T$ | $B_{\text{neige}}$ | Météo-route-glace | $M_{\text{log}}$ | Probabilité et niveau |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Pluie-neige urbaine salée, Paris / Bruxelles** (`45`) | 2,0 cm / +3 °C | 35,4 | -42 | -22 | **0 % — Très faible** |
| **Campus universitaire alpin, Genève / Grenoble** (`9`) | 14,0 cm / -3 °C | 49,6 | +8 | -47 | **11 % — Faible** |
| **Neige finie à 03:00, Wallonie / Jura** (`18`) | 5,0 cm / -2 °C | 35,4 | +8 | -7 | **36 % — Modéré** |
| **Grand froid sec venteux, Québec ($T_{\text{re}} = -31\,^\circ\text{C}$)** (`9`) | 10,0 cm / -18 °C | 35,4 | +20 | +8 | **63 % — Élevé** |
| **Épisode matinal dès 05:00 (exemple)** (`18`) | 6,0 cm / -3 °C | 42,5 | +11 | +31 | **85 % — Très élevé** |
| **Pluie verglaçante rurale sans salage, Bretagne** (`45`) | 3,0 cm / -1 °C | 53,1 | +110 | +56 | **100 % — Extrême** |

Six paliers guident l'interprétation : sous **25 %** (`0–9 %` très faible, `10–24 %` faible), cours maintenus ; de **25 % à 44 %** (modéré), retard probable dès **40 %** ; de **45 % à 69 %** (élevé), fermeture probable dès **65 %** ; de **70 % à 89 %** (très élevé) et **90 % à 100 %** (extrême), annulation quasi certaine à compter de **85 %**.

## Pièges courants à éviter

* **Compter sur le sel sous `-9 °C`** : le chlorure de sodium perd son pouvoir fondant par grand froid ; les routes restent glissantes malgré le salage et exigent abrasifs ou chlorure de calcium.
* **Ne lire que les centimètres** : trois centimètres de neige avec pluie verglaçante immobilisent plus vite les cars que quinze centimètres de poudreuse sèche.
* **Oublier le relief du bassin scolaire** : la pluie en vallée masque parfois des hameaux d'altitude verglacés où partent les cars ; saisissez toujours le tronçon le plus exposé.
* **Confondre arrêt des cars et fermeture** : en vigilance orange ou rouge neige-verglas de Météo-France, le préfet suspend souvent les transports scolaires tandis que les écoles accueillent les élèves piétons.
* **Assimiler université et primaire** : un campus doté de résidences et relié au métro (`-37` points hors zone) ferme rarement avec les écoles primaires rurales.
