---
title: "Calculateur de GPA"
metaTitle: "Calculateur de GPA : Moyenne Pondérée sur Échelle de 4,0"
description: "Calculez facilement votre GPA standard (sur 4,0) et votre GPA pondéré à partir de vos notes lettrées, crédits et niveaux de cours, avec repères de conversion francophones."
metaDescription: "Calculez votre GPA non pondéré et pondéré sur 4,0 à partir de vos notes et crédits, avec équivalences pour la France, la Belgique, la Suisse et le Québec."
metaKeywords: "calculateur de gpa, calcul moyenne universitaire, échelle 4.0, gpa pondéré et non pondéré, conversion notes sur 20 en gpa, crédits ECTS, moyenne cumulative Québec"
faqs:
  - question: "Quelle est la différence entre un GPA non pondéré et un GPA pondéré ?"
    answer: "Le GPA non pondéré mesure chaque cours sur la même échelle stricte de 0,0 à 4,0, quelle que soit sa difficulté : un A rapporte toujours 4,0 points. Le GPA pondéré récompense la rigueur académique en ajoutant un bonus de +0,5 point pour les cours enrichis (filière Honors) et de +1,0 point pour les cours de niveau universitaire anticipé (programmes AP ou Baccalauréat International IB), permettant de dépasser 4,0 jusqu'à 5,0."
  - question: "Comment convertir une moyenne française ou belge sur 20 en GPA sur 4,0 ?"
    answer: "Il ne faut jamais appliquer une simple règle de trois linéaire (multiplier par 4 et diviser par 20), car la notation francophone sur 20 utilise rarement l'intervalle 17 à 20. Dans la pratique des admissions nord-américaines, une moyenne de 16/20 et plus correspond souvent à 4,0, une tranche de 14 à 15,9/20 (mention Bien) se situe autour de 3,5 à 3,9, et 12 à 13,9/20 (mention Assez Bien) avoisine 3,0 à 3,4. Seuls les organismes officiels (WES, ECE) ou l'université d'accueil établissent l'équivalence finale."
  - question: "Pourquoi le GPA québécois monte-t-il parfois jusqu'à 4,3 au lieu de 4,0 ?"
    answer: "Au Canada francophone, deux conventions coexistent. Des établissements comme l'Université de Montréal, l'UQAM, l'Université Laval ou l'Université de Sherbrooke utilisent une moyenne cumulative sur 4,3 où la note A+ vaut 4,3 points. À l'inverse, l'Université McGill et la grande majorité des universités américaines plafonnent l'échelle standard à 4,0, où A+ et A valent tous deux 4,0."
  - question: "Peut-on saisir directement ses crédits ECTS européens dans le calculateur de GPA ?"
    answer: "Oui, à condition que tous les cours saisis emploient la même unité de pondération. Comme les crédits apparaissent à la fois au numérateur et au dénominateur de la moyenne pondérée, tout facteur proportionnel s'annule mathématiquement : saisir 6 ECTS et 4 ECTS produit exactement le même GPA que leur équivalent nord-américain de 3 et 2 crédits (ratio usuel 2:1)."
  - question: "Les cours validés sans note chiffrée ou abandonnés comptent-ils dans le GPA ?"
    answer: "En règle générale, les cours notés uniquement Réussite/Échec sans mention chiffrée ainsi que les retraits officiels dans les délais n'entrent pas dans le calcul du GPA : ne les incluez pas dans le dénominateur des crédits. En revanche, un échec noté F (0,0 point) pèse pleinement dans la moyenne jusqu'à son éventuel remplacement selon le règlement de reprise de l'établissement."
---

Le **GPA** — moyenne pondérée des points de note utilisée dans les établissements secondaires et universitaires nord-américains et internationaux — joue un rôle déterminant pour intégrer un programme d'échange, un master à l'étranger, un MBA ou obtenir une bourse. Pour un étudiant formé en France, en Belgique, en Suisse ou au Québec, comprendre son calcul exact évite des erreurs de conversion pénalisantes dans un dossier d'admission.

Ce calculateur fournit simultanément votre **GPA non pondéré** (plafonné à $4{,}0$) et votre **GPA pondéré** (intégrant les bonifications de niveau) à partir de vos notes lettrées et de vos crédits.

## Formules Exactes du GPA Non Pondéré, Pondéré et Cumulé

Chaque enseignement $i$ (sur $k$ cours) comporte un nombre de **crédits** $c_i$ (crédits nord-américains ou **ECTS**), une note convertie en points $p_i \in [0{,}0 ; 4{,}0]$ et une bonification de filière $b_i$ ($0{,}0$ en cours standard, $+0{,}5$ en filière enrichie *Honors*, $+1{,}0$ en programme universitaire anticipé *AP* ou Baccalauréat International *IB*).

### 1. GPA non pondéré et GPA pondéré

$$\text{GPA}_{\text{non pondéré}} = \frac{\sum_{i=1}^{k} p_i \cdot c_i}{\sum_{i=1}^{k} c_i} \qquad \text{et} \qquad \text{GPA}_{\text{pondéré}} = \frac{\sum_{i=1}^{k} (p_i + b_i) \cdot c_i}{\sum_{i=1}^{k} c_i}$$

### 2. Mise à jour du GPA cumulé

Pour intégrer un nouveau semestre à un dossier antérieur de $C_{\text{ant}}$ crédits validés à la moyenne $\text{GPA}_{\text{ant}}$ :

$$\text{GPA}_{\text{cumulé}} = \frac{\text{GPA}_{\text{ant}} \cdot C_{\text{ant}} + \sum_{i=1}^{k} p_i \cdot c_i}{C_{\text{ant}} + \sum_{i=1}^{k} c_i}$$

## Exemple Chiffré Pas à Pas : Semestre de 17 Crédits

Soit un relevé semestriel de **cinq cours** représentant **$17$ crédits** :

1. **Mathématiques avancées** ($4$ crédits, `A-` = $3{,}7$, niveau *AP*/*IB* $+1{,}0$) : $14{,}8$ pts non pondérés ; $18{,}8$ pts pondérés.
2. **Physique générale** ($4$ crédits, `B+` = $3{,}3$, filière *Honors* $+0{,}5$) : $13{,}2$ pts non pondérés ; $15{,}2$ pts pondérés.
3. **Littérature francophone** ($3$ crédits, `A` = $4{,}0$, standard $+0{,}0$) : $12{,}0$ pts non pondérés ; $12{,}0$ pts pondérés.
4. **Économie appliquée** ($3$ crédits, `B` = $3{,}0$, standard $+0{,}0$) : $9{,}0$ pts non pondérés ; $9{,}0$ pts pondérés.
5. **Informatique** ($3$ crédits, `A` = $4{,}0$, filière *Honors* $+0{,}5$) : $12{,}0$ pts non pondérés ; $13{,}5$ pts pondérés.

* **Total des crédits** : $4 + 4 + 3 + 3 + 3 = \mathbf{17\text{ crédits}}$.
* **GPA non pondéré** : $(14{,}8 + 13{,}2 + 12{,}0 + 9{,}0 + 12{,}0) / 17 = 61{,}0 / 17 = \mathbf{3{,}59}$ ($3{,}588$).
* **GPA pondéré** : $(18{,}8 + 15{,}2 + 12{,}0 + 9{,}0 + 13{,}5) / 17 = 68{,}5 / 17 = \mathbf{4{,}03}$ ($4{,}029$).
* **GPA cumulé actualisé** : Si le relevé antérieur compte **$45$ crédits** à **$3{,}42$** ($153{,}90$ points acquis), la nouvelle moyenne cumulée devient :
  $$\text{GPA}_{\text{cumulé}} = \frac{153{,}90 + 61{,}0}{45 + 17} = \frac{214{,}90}{62} = \mathbf{3{,}47}$$

## Barème de Points et Repères d'Équivalence Francophones

Le tableau ci-dessous rassemble la grille exacte sur $4{,}0$ du calculateur ainsi que les correspondances **indicatives** pour la France et la Belgique (`/20`), la Suisse (`/6`) et le Québec (`/4,3`) :

| Note | Points (/4,0) | Pourcentage | France / Belgique (/20)* | Suisse (/6)* | Québec (/4,3) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **A+ / A** | 4,0 | 93 – 100 % | 16,0 – 20,0 (Très Bien) | 5,5 – 6,0 | 4,3 / 4,0 |
| **A−** | 3,7 | 90 – 92 % | 14,5 – 15,9 (Bien) | 5,25 – 5,49 | 3,7 |
| **B+** | 3,3 | 87 – 89 % | 13,5 – 14,4 | 5,0 – 5,24 | 3,3 |
| **B** | 3,0 | 83 – 86 % | 12,0 – 13,4 (Assez Bien) | 4,75 – 4,99 | 3,0 |
| **B−** | 2,7 | 80 – 82 % | 11,0 – 11,9 | 4,5 – 4,74 | 2,7 |
| **C+** | 2,3 | 77 – 79 % | 10,5 – 10,9 | 4,25 – 4,49 | 2,3 |
| **C** | 2,0 | 73 – 76 % | 10,0 – 10,4 (Passable) | 4,0 – 4,24 | 2,0 |
| **C− / D+ / D** | 1,7 / 1,3 / 1,0 | 60 – 72 % | 8,0 – 9,9 (Compensé) | 3,5 – 3,99 | 1,7 / 1,3 / 1,0 |
| **F** | 0,0 | < 60 % | < 8,0 (Ajourné) | < 3,5 | 0,0 |

*\*Correspondances indicatives : les jurys et organismes d'évaluation (WES, ECE) ajustent la conversion selon la sélectivité du diplôme (université, grande école, CPGE, école polytechnique).*

## Conseils Pratiques et Pièges Courants

* **Situer son score face aux seuils d'admission** : Dans l'enseignement supérieur international, un GPA non pondéré de **$3{,}00$** représente souvent le seuil minimal requis en deuxième cycle universitaire ; **$3{,}50$ et plus** correspond aux distinctions académiques (tableau d'honneur du doyen ou mention très honorable), tandis que la tranche **$3{,}75\text{ à }4{,}00$** caractérise les programmes les plus sélectifs et les bourses d'excellence.
* **Bannir la règle de trois sur `/20`** : Diviser un $14/20$ par $5$ donnerait $2{,}80$, ce qui dévalorise fortement un dossier français ou belge. Convertissez chaque matière selon une table de distribution reconnue avant de pondérer par les crédits.
* **Surveiller les notes `F` en mode pondéré** : Le calculateur ajoute arithmétiquement le bonus ($+0{,}5$ ou $+1{,}0$) à la note choisie. Or la majorité des établissements refusent toute bonification sur un échec (`F`) : laissez un cours échoué en niveau standard pour conserver un GPA pondéré réaliste.
* **Harmoniser les échelles Québec (`/4,3`) et États-Unis (`/4,0`)** : Lors d'une fusion de relevés entre une université québécoise sur $4{,}3$ et un échange sur $4{,}0$, ramenez les `A+` à $4{,}0$ et gardez une unité homogène de crédits ($30\text{ ECTS} \approx 15\text{ crédits}$ nord-américains).
* **Ne pas moyenner deux semestres sans pondération** : Un semestre de $12$ crédits à $3{,}20$ suivi d'un semestre de $18$ crédits à $3{,}80$ ne donne pas $3{,}50$, mais $(3{,}20 \times 12 + 3{,}80 \times 18) / 30 = \mathbf{3{,}56}$. Pondérez toujours par le volume exact de crédits.
