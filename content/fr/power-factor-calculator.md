---
title: "Calculateur de facteur de puissance | Solveur de correction et de dimensionnement de condensateur"
description: "Calculateur de facteur de puissance en ligne gratuit. Calculez instantanément le facteur de puissance (FP), la puissance active (kW), la puissance apparente (kVA), la puissance réactive (kVAR), l'angle de phase, le courant alternatif monophasé et triphasé, la correction du facteur de puissance et le dimensionnement de la batterie de condensateurs."
metaTitle: "Calculateur de facteur de puissance | Solveur de correction et de dimensionnement de condensateur"
metaDescription: "Calculateur de facteur de puissance en ligne gratuit. Calculez instantanément le facteur de puissance (FP), la puissance active (kW), la puissance apparente (kVA), la puissance réactive (kVAR), l'angle de phase, le courant alternatif monophasé et triphasé, la correction du facteur de puissance et le dimensionnement de la batterie de condensateurs."
metaKeywords: "calculateur de facteur de puissance, calculateur pf, calculateur de correction de facteur de puissance, calculateur de puissance réactive, calculateur de puissance apparente, dimensionnement de batterie de condensateurs, calculateur de facteur de puissance triphasé"
features:
  - "Cockpit interactif avec bascule entre mode simple et avancé"
  - "5 onglets de catégories de fonctionnalités : Solveur FP CA de base, Correction FP et dimensionnement de condensateur, Tableau de bord de comparaison avant/après, Agrégation de vecteurs multi-charges, et Utilisation moteur/transformateur"
  - "📐 Diagramme dynamique interactif du triangle de puissance en SVG affichant la puissance active (P), la puissance réactive (Q), la puissance apparente (S) et l'angle de phase (φ)"
  - "🔄 Diagramme interactif de vecteurs de phaseurs illustrant la tension (V) par rapport au courant (I) pour un alignement en avance, en retard ou unitaire"
  - "🏢 Générateur d'agrégation de vecteurs multi-charges (ΣP + jΣQ) évitant une moyenne arithmétique incorrecte"
  - "🔋 Dimensionnement de batterie de condensateurs en microfarads (μF) pour les systèmes 50Hz et 60Hz dans des topologies en triangle (Δ) ou en étoile (Y)"
  - "📊 Analyse de la correction avant et après montrant le pourcentage de réduction du courant de ligne et la capacité du transformateur en kVA libérée"
  - "Générateur de quiz pratique avec des problèmes aléatoires d'ingénierie du facteur de puissance et des dérivations mathématiques étape par étape"
useCases:
  - "Ingénieurs électriciens concevant des batteries de condensateurs de correction du facteur de puissance pour les installations de fabrication industrielle"
  - "Gestionnaires d'installations réduisant les pénalités de puissance réactive des services publics et libérant la capacité des transformateurs"
  - "Électriciens et techniciens en systèmes électriques dimensionnant des gradins de condensateurs triphasés de 480V et 400V"
  - "Étudiants en ingénierie visualisant les triangles de puissance active, réactive et apparente ainsi que les angles de phase"
howToSteps:
  - "Sélectionnez votre type de système CA (monophasé ou triphasé phase-phase) et entrez la tension du système (V)."
  - "Entrez la puissance active (P en kW) et le facteur de puissance initial (FP)."
  - "Spécifiez votre facteur de puissance cible (par exemple 0,95 ou 0,98) et la fréquence (50Hz ou 60Hz)."
  - "Observez le triangle de puissance interactif, la compensation requise (Qc en kVAR) et les microfarads (μF) par phase."
  - "Utilisez le tableau de bord Avant/Après pour inspecter le pourcentage de réduction du courant de ligne et la libération de capacité du transformateur."
  - "Cliquez sur 'Copier le résumé' ou 'Imprimer le PDF' pour enregistrer votre rapport d'analyse en ingénierie électrique."
faqs:
  - question: "Qu'est-ce que le facteur de puissance (FP) ?"
    answer: "Le facteur de puissance est le rapport entre la puissance active (kW) réellement consommée pour effectuer un travail et la puissance apparente (kVA) fournie au circuit (FP = P / S = cos φ). Il mesure l'efficacité énergétique électrique en CA."
  - question: "Quelle est la formule du facteur de puissance ?"
    answer: "Facteur de puissance FP = Puissance active P (kW) / Puissance apparente S (kVA). Alternativement, FP = cos(φ), où φ est l'angle de déphasage entre la tension et le courant alternatifs."
  - question: "Quelle est la différence entre la puissance active, la puissance réactive et la puissance apparente ?"
    answer: "La puissance active P (kW) effectue un travail réel (chaleur, lumière, mouvement). La puissance réactive Q (kVAR) maintient les champs électromagnétiques dans les moteurs et les transformateurs. La puissance apparente S (kVA) est la combinaison vectorielle totale des deux (S = √(P² + Q²))."
  - question: "Qu'est-ce qu'un facteur de puissance en retard ?"
    answer: "Un facteur de puissance en retard se produit dans les charges inductives (moteurs, transformateurs, inducteurs) où la forme d'onde du courant est en retard par rapport à la forme d'onde de la tension (angle de phase φ > 0)."
  - question: "Qu'est-ce qu'un facteur de puissance en avance ?"
    answer: "Un facteur de puissance en avance se produit dans les charges capacitives (batteries de condensateurs, longs câbles de transmission) où la forme d'onde du courant est en avance par rapport à la forme d'onde de la tension (angle de phase φ < 0)."
  - question: "Qu'est-ce qu'un facteur de puissance unitaire ?"
    answer: "Le facteur de puissance unitaire (FP = 1,0) se produit lorsque les formes d'onde de tension et de courant sont parfaitement en phase (φ = 0°), ce qui signifie que 100 % de l'énergie fournie est convertie en travail réel (0 kVAR de puissance réactive)."
  - question: "Pourquoi les compagnies d'électricité facturent-elles des pénalités liées au facteur de puissance ?"
    answer: "Un faible facteur de puissance oblige les compagnies d'électricité à fournir un courant de ligne plus élevé et une plus grande capacité de transformateur en kVA pour délivrer la même puissance active (kW), ce qui entraîne des pertes de transmission plus importantes (I²R) sur les réseaux électriques."
  - question: "Comment fonctionne la correction du facteur de puissance (PFC) ?"
    answer: "La correction du facteur de puissance ajoute des batteries de condensateurs en parallèle qui génèrent une puissance réactive en avance (-kVAR), neutralisant la puissance réactive en retard (+kVAR) tirée par les moteurs inductifs."
  - question: "Quelle est la formule de la compensation capacitive requise (Qc) ?"
    answer: "Qc = P × (tan φ1 - tan φ2), où P est la puissance active en kW, φ1 est l'angle de phase initial (arccos FP1) et φ2 est l'angle de phase cible (arccos FP2)."
  - question: "Comment calculez-vous la taille de la batterie de condensateurs en microfarads (μF) ?"
    answer: "Pour un système monophasé : C = (Qc × 1000) / (2π f V²). Pour un système triphasé en triangle : C_delta = (Qc × 1000) / (3 × 2π f V_L²). Pour un système triphasé en étoile : C_wye = (Qc × 1000) / (2π f V_L²)."
  - question: "Comment calculer le courant de ligne dans un système CA triphasé ?"
    answer: "Courant de ligne I_L = (P × 1000) / (√3 × V_L × FP), où P est la puissance en kW, V_L est la tension phase-phase et FP est le facteur de puissance."
  - question: "Comment calculer le courant de ligne dans un système CA monophasé ?"
    answer: "Courant de ligne I = (P × 1000) / (V × FP), où P est la puissance en kW, V est la tension et FP est le facteur de puissance."
  - question: "Dans quelle mesure la correction du facteur de puissance peut-elle réduire le courant de ligne ?"
    answer: "Améliorer le FP de 0,75 à 0,95 réduit le courant de ligne d'environ 21 %, réduisant les pertes par échauffement des câbles (I²R) de près de 37 %."
  - question: "Pourquoi ne peut-on pas simplement faire la moyenne des facteurs de puissance lors de la combinaison de plusieurs charges ?"
    answer: "Le facteur de puissance est un rapport trigonométrique non linéaire (cos φ). Les charges multiples doivent être agrégées en sommant la puissance active totale (ΣP) et la puissance réactive totale (ΣQ), puis en calculant FP_total = ΣP / √( (ΣP)² + (ΣQ)² )."
  - question: "Qu'est-ce que le triangle de puissance ?"
    answer: "Le triangle de puissance est un triangle rectangle représentant la relation vectorielle entre la puissance active P (base horizontale), la puissance réactive Q (perpendiculaire verticale) et la puissance apparente S (hypoténuse)."
  - question: "Quelle est la différence entre le facteur de puissance de déplacement et le facteur de puissance vrai ?"
    answer: "Le FP de déplacement est basé uniquement sur le déphasage fondamental de 50Hz/60Hz (cos φ1). Le FP vrai prend en compte la distorsion harmonique totale (THD) causée par l'électronique non linéaire (FP vrai = FP de déplacement × facteur d'harmonique)."
  - question: "Qu'est-ce qu'un avertissement de distorsion harmonique pour les batteries de condensateurs ?"
    answer: "Les charges non linéaires (variateurs de fréquence, alimentations à découpage) génèrent des courants harmoniques. Les batteries de condensateurs standard peuvent entrer en résonance avec l'inductance du système à des fréquences harmoniques, provoquant une destruction par surtension."
  - question: "Qu'est-ce que le filtrage par batterie de condensateurs désaccordée ?"
    answer: "Les batteries de condensateurs désaccordées connectent des réactances en série (inducteurs) avec des condensateurs pour décaler la fréquence de résonance en dessous de l'harmonique la plus basse (par exemple, 5e harmonique à 300Hz), empêchant l'amplification des harmoniques."
  - question: "Quel est le facteur de puissance cible pour les installations industrielles ?"
    answer: "Les installations industrielles ciblent généralement un facteur de puissance entre 0,95 et 0,98 en retard pour éviter les pénalités des services publics sans risquer une surcorrection du FP en avance."
  - question: "Que se passe-t-il si un système est surcorrigé vers un facteur de puissance en avance ?"
    answer: "Une surcorrection vers un FP en avance (FP < 1,0 en avance) peut provoquer une instabilité de tension du générateur, une augmentation de tension élevée indésirable lors de conditions de charge légère, et le déclenchement des relais de protection."
  - question: "Comment l'amélioration du facteur de puissance libère-t-elle la capacité du transformateur en kVA ?"
    answer: "La capacité du transformateur est évaluée en kVA (S = P / FP). L'augmentation du FP de 0,75 à 0,95 pour une charge de 100 kW réduit la demande en kVA de 133,3 kVA à 105,3 kVA, libérant 28 kVA de marge de réserve sur le transformateur."
  - question: "Qu'est-ce que la correction automatique du facteur de puissance (APFC) ?"
    answer: "Un panneau APFC utilise un contrôleur à microprocesseur pour commuter automatiquement les gradins de batteries de condensateurs en réponse aux changements des charges inductives des moteurs, maintenant un FP cible stable."
  - question: "Quel est l'angle de phase pour un facteur de puissance de 0,80 ?"
    answer: "φ = arccos(0,80) = 36,87 degrés (0,6435 radians)."
  - question: "Quel est le facteur de puissance des charges purement résistives (chauffages, lampes à incandescence) ?"
    answer: "Les charges purement résistives ont un facteur de puissance de 1,0 (FP unitaire, 0 kVAR de puissance réactive, angle de phase de 0°)."
  - question: "Quel est le facteur de puissance typique d'un moteur à induction non corrigé ?"
    answer: "Un moteur à induction triphasé non corrigé fonctionne à un FP de 0,80 à 0,88 à pleine charge, et peut descendre jusqu'à 0,20 à 0,50 à vide ou à faible charge."
  - question: "Quel est le facteur de puissance des alimentations d'ordinateur à découpage modernes ?"
    answer: "Les blocs d'alimentation (PSU) d'ordinateur modernes dotés d'une correction de facteur de puissance active (PFC active) fonctionnent avec un facteur de puissance de 0,95 à 0,99."
  - question: "La correction du facteur de puissance réduit-elle les factures d'électricité résidentielles ?"
    answer: "Généralement non. Les compteurs électriques résidentiels facturent uniquement l'énergie de puissance active (kWh), pas la demande en kVA ou en kVAR. La PFC profite aux installations commerciales et industrielles soumises aux tarifs de facturation en kVA/kVAR."
  - question: "Qu'est-ce qu'un kVARh (kilovar-heure) ?"
    answer: "Le kVARh mesure l'énergie réactive cumulée consommée au fil du temps, utilisée par les compteurs industriels pour calculer les pénalités liées au facteur de puissance."
  - question: "Quelle tension nominale de condensateurs faut-il utiliser pour une correction triphasée de 480V ?"
    answer: "Pour les systèmes 480V, des condensateurs classés à 525V ou 600V sont recommandés pour fournir une marge de sécurité contre les pointes de surtension harmoniques."
  - question: "Quelle est la relation entre kVA, kW et kVAR ?"
    answer: "(kVA)² = (kW)² + (kVAR)². Par conséquent kVA = √( kW² + kVAR² )."
---

# Le Calculateur de facteur de puissance définitif : Puissance réactive, dimensionnement de condensateurs et efficacité énergétique

Bienvenue sur le **Calculateur de facteur de puissance** ultime et le guide d'ingénierie électrique en CA complet. Que vous soyez un gestionnaire d'installation tentant d'éliminer les pénalités de puissance réactive écrasantes des services publics, un ingénieur industriel dimensionnant une massive batterie de condensateurs automatique de $480\text{V}$, ou un étudiant en physique universitaire essayant de visualiser géométriquement le triangle de puissance ($S^2 = P^2 + Q^2$), la maîtrise du facteur de puissance est absolument obligatoire.

Le facteur de puissance est la mesure ultime de l'efficacité électrique en courant alternatif. Un faible facteur de puissance signifie que votre système lutte activement contre lui-même — tirant d'énormes quantités de courant pour ne faire absolument aucun travail réel, surchauffant violemment les câbles, saturant les transformateurs et forçant le réseau électrique à brûler du charbon supplémentaire juste pour pousser l'énergie vers votre usine.

Dans cette masterclass SEO exhaustive de plus de 4 000 mots, nous allons déconstruire la trigonométrie fondamentale $FP = \cos \phi$, exposer les ravages financiers des charges de moteurs inductifs non corrigées, décoder les mathématiques d'ingénierie nécessaires pour dimensionner en toute sécurité une batterie de condensateurs désaccordée, et prouver mathématiquement comment l'amélioration de votre facteur de puissance libère instantanément la capacité piégée des transformateurs. Pour nous assurer que vous comprenez parfaitement ces concepts d'ingénierie, nous avons inclus cinq diagrammes interactifs Mermaid.js méticuleusement détaillés et sûrs pour les analyseurs.

---

## 1. La physique du triangle de puissance (Active, Réactive et Apparente)

Dans les circuits à courant continu (CC), la puissance est simple : les Volts multipliés par les Ampères donnent les Watts. Dans les circuits à courant alternatif (CA), la puissance se divise en trois vecteurs dimensionnels distincts.

Pour comprendre le facteur de puissance, vous devez visualiser le **Triangle de puissance**.

1. **Puissance active (P) en kW :** C'est la base horizontale du triangle. Elle représente le travail réel et utile effectué par l'électricité — faire tourner un arbre de moteur, chauffer un élément de four ou éclairer une LED.
2. **Puissance réactive (Q) en kVAR :** C'est la perpendiculaire verticale du triangle. Elle représente l'énergie "fantôme" requise pour maintenir les champs magnétiques invisibles à l'intérieur des moteurs à induction et des transformateurs. Elle rebondit d'avant en arrière entre la charge et le réseau, ne faisant aucun travail réel mais occupant un espace précieux sur les lignes électriques.
3. **Puissance apparente (S) en kVA :** C'est l'hypoténuse du triangle. C'est la somme vectorielle totale de la puissance active et réactive ($S = \sqrt{P^2 + Q^2}$). C'est l'énergie brute que le réseau électrique doit réellement générer et pousser dans les câbles.

**L'équation du facteur de puissance :**
$$\text{Facteur de puissance (FP)} = \frac{\text{Puissance active (kW)}}{\text{Puissance apparente (kVA)}}$$

Si votre installation consomme $100\text{ kW}$ de puissance active, mais tire $125\text{ kVA}$ de puissance apparente, votre facteur de puissance est $100 / 125 = 0,80$ (ou $80\%$). Cela signifie que votre installation n'est efficace qu'à $80\%$ dans l'utilisation du courant alternatif qu'elle tire du réseau.

---

## 2. La dévastation financière d'un faible facteur de puissance

Les compagnies d'électricité facturent les foyers résidentiels strictement pour la puissance active (kWh). Cependant, les installations commerciales et industrielles sont facturées pour la puissance apparente (kVA) ou pénalisées pour l'excès de puissance réactive (kVAR).

Pourquoi ? Parce que pousser la puissance réactive sur le réseau nécessite des fils de cuivre plus épais, des transformateurs élévateurs massifs et des appareillages de commutation plus lourds. Si votre usine a un facteur de puissance de $0,70$, le fournisseur doit construire une infrastructure capable de gérer $42\%$ de courant en plus que ce que votre puissance active justifie réellement.

Pour compenser, la compagnie d'électricité vous infligera une **Pénalité de facteur de puissance**.
- Si votre FP descend en dessous de $0,90$, ils peuvent facturer $2\%$ supplémentaires sur votre facture totale.
- Si votre FP descend en dessous de $0,80$, la pénalité peut grimper à $10\%$.
- Si votre FP chute à $0,70$, la compagnie d'électricité peut déconnecter de force votre installation du réseau jusqu'à ce que vous installiez des batteries de condensateurs correctives.

Corriger votre facteur de puissance de $0,75$ à $0,95$ est souvent rentabilisé en moins de 18 mois uniquement grâce à l'élimination de ces tarifs de pénalité écrasants.

---

## 3. Les mathématiques du dimensionnement des condensateurs ($Q_c$)

Comment corrigez-vous un faible facteur de puissance ? En combattant la physique par la physique.

Les charges inductives (moteurs) nécessitent une puissance réactive en retard ($+\text{kVAR}$). Les condensateurs génèrent naturellement une puissance réactive en avance ($-\text{kVAR}$). En installant une massive batterie de condensateurs juste à côté du moteur inductif, le condensateur fournit l'énergie du champ magnétique requise localement. La puissance réactive rebondit simplement entre le condensateur et le moteur, protégeant complètement le réseau électrique d'avoir à la fournir.

**La formule de dimensionnement du condensateur :**
$$Q_c = P \times (\tan(\phi_1) - \tan(\phi_2))$$

Où :
- $Q_c$ = Taille du condensateur requise en kVAR.
- $P$ = Puissance active de la charge en kW.
- $\phi_1$ = Angle de phase initial (calculé par $\arccos(\text{FP}_{\text{initial}})$).
- $\phi_2$ = Angle de phase cible (calculé par $\arccos(\text{FP}_{\text{cible}})$).

**Exemple de calcul :**
Vous avez un moteur de $100\text{ kW}$ fonctionnant à un FP de $0,75$. Vous voulez le corriger à un FP de $0,95$.
1. Angle initial : $\arccos(0,75) = 41,41^\circ$. $\tan(41,41^\circ) = 0,8819$.
2. Angle cible : $\arccos(0,95) = 18,19^\circ$. $\tan(18,19^\circ) = 0,3286$.
3. Compensation requise : $Q_c = 100 \times (0,8819 - 0,3286) = 55,33\text{ kVAR}$.

Vous devez installer une batterie de condensateurs de $55\text{ kVAR}$ pour atteindre un facteur de puissance de $0,95$.

---

## 4. Libération de la capacité piégée du transformateur

L'un des avantages les plus puissants, mais rarement compris, de la correction du facteur de puissance est la libération instantanée de la capacité piégée du transformateur.

Les transformateurs sont strictement évalués en kVA (puissance apparente). Ils ne se soucient pas des kW ; ils ne se soucient que du courant thermique total.
Si vous avez un transformateur d'installation massif de $500\text{ kVA}$, et que votre usine tire $400\text{ kW}$ de puissance active avec un terrible facteur de puissance de $0,70$ :
- Puissance apparente = $400 / 0,70 = 571\text{ kVA}$.
- **Résultat :** Votre transformateur de $500\text{ kVA}$ est surchargé de $71\text{ kVA}$. Il va surchauffer et exploser de façon catastrophique.

Au lieu de dépenser 50 000 $ pour passer à un transformateur de $800\text{ kVA}$, vous installez une batterie de condensateurs pour corriger le facteur de puissance à $0,95$ :
- Nouvelle puissance apparente = $400 / 0,95 = 421\text{ kVA}$.
- **Résultat :** Exactement le même transformateur de $500\text{ kVA}$ fonctionne désormais en toute sécurité à $84\%$ de charge. Vous avez magiquement libéré $150\text{ kVA}$ de capacité piégée à partir de rien, vous permettant d'ajouter de nouveaux équipements de fabrication sans mettre à niveau la sous-station du réseau.

---

## 5. Le danger de la résonance harmonique et du désaccord

Les condensateurs sont incroyablement dangereux lorsqu'ils sont installés aveuglément. Les usines modernes sont remplies d'électronique non linéaire : variateurs de fréquence (VFD), pilotes d'éclairage LED et alimentations à découpage.

Ces dispositifs génèrent une **distorsion harmonique** — des fréquences parasites qui rebondissent sur le réseau électrique à $300\text{Hz}$, $420\text{Hz}$ et $660\text{Hz}$.
Selon les lois de la physique, l'impédance d'un condensateur chute violemment à mesure que la fréquence augmente. Si vous installez une batterie de condensateurs standard dans une usine avec des harmoniques élevées, le condensateur agira comme un aspirateur, aspirant tout le courant harmonique haute fréquence jusqu'à ce qu'il explose littéralement.

Pour éviter cela, les ingénieurs installent des **batteries de condensateurs désaccordées**. Ces batteries placent de lourdes réactances inductives en série directement devant les condensateurs, décalant intentionnellement le point de résonance du circuit en dessous de la fréquence harmonique dangereuse la plus basse (par exemple, en accordant la batterie à $255\text{Hz}$ pour esquiver parfaitement la 5e harmonique agressive de $300\text{Hz}$).

---

## 6. Cinq scénarios conceptuels d'ingénierie avec visualisations 2D

Pour maîtriser pleinement les relations physiques régissant le facteur de puissance, nous explorerons cinq scénarios d'ingénierie distincts décomposés visuellement à l'aide de diagrammes Mermaid.js personnalisés.

### Exemple 1 : La physique vectorielle du triangle de puissance

**Le scénario :**
Un étudiant en génie électrique doit visualiser exactement comment le vecteur de puissance active horizontal se combine avec le vecteur de puissance réactive vertical pour former l'hypoténuse de la puissance apparente.

**Visualisation 2D :**
Cet organigramme logique cartographie la relation physique des vecteurs, démontrant clairement comment la réduction du vecteur Q vertical réduit le vecteur S de l'hypoténuse plus près de l'unité.

```mermaid
flowchart LR
    A["Puissance active (kW)<br/>Vecteur de travail horizontal"] --> B{"Sommation vectorielle<br/>Décalage de l'angle de phase"}
    
    C["Puissance réactive (kVAR)<br/>Vecteur magnétique vertical"] --> B
    
    B --> D["Puissance apparente (kVA)<br/>Charge totale du réseau"]
    
    style A fill:#10b981,stroke:#047857,color:#fff
    style C fill:#ef4444,stroke:#991b1b,color:#fff
    style D fill:#f59e0b,stroke:#b45309,color:#fff
```

---

### Exemple 2 : La courbe de pénalité financière

**Le scénario :**
Un gestionnaire d'installation doit présenter une analyse de rentabilisation au directeur financier prouvant que laisser le facteur de puissance de l'usine glisser en dessous de $0,85$ déclenche une augmentation exponentielle des tarifs de pénalité des services publics.

**Les mathématiques :**
Les compagnies d'électricité imposent généralement une base de référence de $0,90$. En dessous de cela, le multiplicateur de pénalité s'incurve agressivement vers le haut pour punir les abus sur le réseau.

**Visualisation 2D :**
Ce graphique trace la corrélation directe entre un facteur de puissance qui s'effondre et les lourdes pénalités financières infligées par le réseau électrique local.

```mermaid
xychart-beta
    title "Pénalité de la compagnie d'électricité vs Facteur de puissance"
    x-axis "Facteur de puissance (FP)" [0.95, 0.90, 0.85, 0.80, 0.75, 0.70]
    y-axis "Pourcentage de pénalité" 0 --> 25
    bar [0, 0, 5, 10, 18, 25]
```

---

### Exemple 3 : Libérer la capacité piégée du transformateur

**Le scénario :**
Une usine industrielle veut ajouter une nouvelle ligne d'assemblage de $100\text{ kW}$, mais son transformateur de $500\text{ kVA}$ est saturé à $490\text{ kVA}$ en raison d'un terrible facteur de puissance de $0,70$.

**Les mathématiques :**
Charge actuelle : $343\text{ kW}$ / $0,70 = 490\text{ kVA}$.
Charge corrigée : $343\text{ kW}$ / $0,98 = 350\text{ kVA}$.
Capacité piégée libérée : $140\text{ kVA}$.

**Visualisation 2D :**
Ce graphique prouve comment la correction du facteur de puissance réduit mathématiquement l'empreinte de la puissance apparente (kVA), libérant d'énormes quantités de marge de réserve sur le transformateur existant.

```mermaid
xychart-beta
    title "Demande du transformateur en kVA pour une charge de 343 kW"
    x-axis "État du système" [Avant correction (0.70 FP), Après correction (0.98 FP), Limite de marge sûre]
    y-axis "Demande du transformateur (kVA)" 0 --> 600
    bar [490, 350, 500]
```

---

### Exemple 4 : Logique de dimensionnement automatique de la batterie de condensateurs

**Le scénario :**
Un entrepreneur en électricité doit calculer la quantité exacte de kVAR en avance requise pour neutraliser les moteurs à induction en retard d'une usine, tout en veillant à ce que le système ne sur-corrige pas accidentellement dans un facteur de puissance en avance dangereux.

**Visualisation 2D :**
Cet organigramme de haut en bas cartographie la logique stricte requise pour extraire la puissance active et les angles de phase, calculer la compensation requise ($Q_c$) et déployer un panneau de correction automatique du facteur de puissance (APFC) à gradins.

```mermaid
flowchart TD
    A["Extraire les données de base<br/>P=100kW, FP=0.75"] --> B{"Exécuter les calculs<br/>de compensation"}
    
    B --> C["Calculer l'angle initial<br/>tan(41.4 deg) = 0.88"]
    B --> D["Calculer l'angle cible<br/>tan(18.2 deg) = 0.33"]
    
    C --> E["Exécuter la formule<br/>Qc = 100 x (0.88 - 0.33)"]
    D --> E
    
    E --> F["Résultat : 55 kVAR requis"]
    F --> G["Sélection finale :<br/>Installer un gradin de 60 kVAR"]
    
    style G fill:#3b82f6,stroke:#1d4ed8,color:#fff
```

---

### Exemple 5 : Le délai de l'angle de phase

**Le scénario :**
Un étudiant en physique a du mal à comprendre ce que signifie réellement "en retard" dans une forme d'onde de courant alternatif.

**Visualisation 2D :**
Ce diagramme de Gantt décrit brutalement la chronologie microscopique d'une onde sinusoïdale CA de 50Hz, démontrant comment une charge inductive retarde physiquement la montée de la forme d'onde de courant à l'unisson avec la forme d'onde de tension, créant ainsi l'angle de phase ($\phi$).

```mermaid
gantt
    title Délai de forme d'onde CA (Tension vs Retard de courant)
    dateFormat  YYYY-MM-DD
    axisFormat  %H:%M
    
    section Forme d'onde de tension
    La tension traverse zéro et culmine :crit, 2026-01-01 00:00, 1h
    
    section Forme d'onde de courant
    Le courant est retardé par l'inducteur :active, 2026-01-01 01:00, 1h
    
    section Angle de phase
    L'écart temporel crée l'angle de phase :done, 2026-01-01 02:00, 1h
```

---

## 7. Conclusion et défi d'ingénierie

La maîtrise du calcul du facteur de puissance est le summum absolu de l'ingénierie de l'efficacité électrique en courant alternatif. Comprendre la trigonométrie vectorielle du triangle de puissance, respecter les ravages financiers des charges inductives non corrigées et craindre le danger explosif de la résonance harmonique garantira que vos installations industrielles fonctionnent à une efficacité maximale sans aucune pénalité du service public.

Si vous ignorez ces principes mathématiques, vos câbles fondront sous la surcharge thermique $I^2 R$, vos transformateurs satureront et échoueront violemment, et votre directeur financier saignera des milliers de dollars chaque mois en payant des suppléments de kVA fantômes au réseau électrique.

Pour vous assurer que vous avez maîtrisé ces concepts critiques, démarrez notre simulateur interactif et essayez de résoudre ces défis finaux :
1. **Le transformateur piégé :** Une usine tire $600\text{ kW}$ à $0,65\text{ FP}$ d'un transformateur de $1000\text{ kVA}$. S'ils installent une batterie de condensateurs pour atteindre $0,95\text{ FP}$, quelle capacité de kVA exacte est libérée ?
2. **Le dimensionnement des condensateurs :** Un moteur de $250\text{ kW}$ fonctionne à un FP de $0,80$. Calculez le kVAR exact de compensation capacitive requis pour atteindre un FP de $0,98$.
3. **La réduction du courant :** Une charge triphasée de $480\text{V}$ tire $100\text{ kW}$ à $0,70\text{ FP}$. Calculez le courant de ligne. Ensuite, calculez le nouveau courant de ligne si le FP est amélioré à $0,95$. Combien d'ampères de contrainte thermique ont été économisés ?

Fiez-vous à ce calculateur pour auditer les factures d'électricité de votre installation, justifier mathématiquement les retours sur investissement des batteries de condensateurs et éliminer définitivement l'inefficacité du réseau.
