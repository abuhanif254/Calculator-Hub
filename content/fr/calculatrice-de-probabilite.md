---
title: "Calculatrice de Probabilité"
metaTitle: "Calculatrice de Probabilité | Bayes, Espérance et Cotes"
description: "Calculez les probabilités simples et composées, la probabilité conditionnelle, le théorème de Bayes, l'espérance mathématique, les cotes et la loi binomiale avec simulateurs."
metaDescription: "Calculatrice de probabilité gratuite : union, intersection, probabilité conditionnelle, théorème de Bayes, espérance, cotes et loi binomiale."
metaKeywords: "calculatrice de probabilité, théorème de Bayes, probabilité conditionnelle, espérance mathématique, loi binomiale, union intersection, calcul cotes, événements indépendants"
faqs:
  - question: "Quelle différence distingue deux événements indépendants de deux événements incompatibles ?"
    answer: "Deux événements sont indépendants lorsque la réalisation de l'un ne modifie pas la probabilité de l'autre : P(A ∩ B) = P(A) × P(B). Deux événements sont incompatibles (ou disjoints) lorsqu'ils ne peuvent pas se produire simultanément : P(A ∩ B) = 0. Par conséquent, deux événements de probabilités strictement positives ne peuvent jamais être à la fois indépendants et incompatibles."
  - question: "Quand faut-il multiplier des probabilités et quand faut-il les additionner ?"
    answer: "On multiplie les probabilités pour calculer une intersection (la probabilité que l'événement A ET l'événement B se réalisent conjointement). On additionne les probabilités pour calculer une union (la probabilité que A OU B, ou les deux, surviennent), en prenant soin de soustraire leur chevauchement P(A ∩ B) afin de ne pas compter deux fois les issues communes."
  - question: "Comment le théorème de Bayes corrige-t-il l'erreur du taux de base ?"
    answer: "Le théorème de Bayes combine la probabilité a priori d'une hypothèse P(A) avec la vraisemblance d'observer un indice sachant cette hypothèse P(B | A), puis divise par la probabilité totale de l'indice P(B) sur tous les scénarios. Cette pondération évite de surestimer un résultat positif lorsque le phénomène recherché est rare dans la population."
  - question: "Comment convertir une probabilité en cotes et inversement ?"
    answer: "La probabilité rapporte les cas favorables au total des issues possibles, tandis que la cote (en faveur) rapporte les cas favorables aux cas défavorables. Pour une probabilité p, la cote en faveur vaut p / (1 - p) et la cote contre vaut (1 - p) / p. Inversement, une cote de a contre b en faveur correspond à une probabilité exacte de a / (a + b)."
  - question: "Que démontre la loi des grands nombres dans les simulateurs de pièces et de dés ?"
    answer: "La loi des grands nombres établit que plus on répète une expérience aléatoire indépendante dans des conditions identiques (lancers d'une pièce ou d'un dé), plus la fréquence empirique observée d'un événement converge vers sa probabilité théorique. Sur dix lancers, l'écart peut rester important ; sur dix mille lancers, la fréquence se stabilise près de la valeur attendue."
---

La théorie des probabilités mesure l'incertitude sur l'intervalle **$[0 ; 1]$** selon les axiomes de Kolmogorov — positivité ($P(E) \ge 0$), normalisation ($P(\Omega) = 1$) et additivité des événements disjoints. Elle fonde l'actuariat, le diagnostic médical, la fiabilité industrielle et la gestion des risques financiers.

Parce que l'intuition échoue souvent face aux événements composés et aux taux de base faibles, notre calculatrice évalue aussitôt **union, intersection, complémentaire, probabilité conditionnelle, théorème de Bayes, loi binomiale, espérance mathématique, cotes** et **simulateurs de pièces ou de dés**.

## Lois fondamentales et formules de probabilité

### 1. Probabilité élémentaire, union et intersection

Dans un univers fini $\Omega$ d'issues équiprobables :

$$P(A) = \frac{\text{card}(A)}{\text{card}(\Omega)} \qquad \text{et} \qquad P(\bar{A}) = 1 - P(A)$$

L'union suit la formule du crible, et l'intersection dépend du lien entre $A$ et $B$ :

$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

* **Indépendants** : $P(A \cap B) = P(A) \times P(B)$.
* **Dépendants** : $P(A \cap B) = P(A) \times P(B \mid A)$.
* **Incompatibles** : $P(A \cap B) = 0$.
* **Différence symétrique** (un seul des deux) : $P(A \triangle B) = P(A) + P(B) - 2\,P(A \cap B)$.

### 2. Probabilité conditionnelle et théorème de Bayes

Pour $P(B) > 0$, la probabilité *a posteriori* de $A$ sachant $B$ s'obtient via la formule des probabilités totales :

$$P(A \mid B) = \frac{P(A \cap B)}{P(B)} = \frac{P(B \mid A)\,P(A)}{P(B \mid A)\,P(A) + P(B \mid \bar{A})\,P(\bar{A})}$$

### 3. Loi binomiale, espérance et cotes

Pour $k$ succès en $n$ essais indépendants de probabilité $p$, et pour une variable discrète $X$ :

$$P(X = k) = \binom{n}{k}\,p^k\,(1 - p)^{n - k} \qquad E(X) = \sum_{i=1}^{m} x_i\,P(X = x_i) \qquad \text{Cote} = \frac{p}{1 - p}$$

* **$\Omega$** : univers complet des issues possibles.
* **$P(A)$ et $P(A \mid B)$** : probabilités *a priori* et *a posteriori* de $A$.
* **$P(B \mid A)$** : vraisemblance d'observer l'indice $B$ sachant $A$.
* **$\binom{n}{k} = \frac{n!}{k!(n - k)!}$** : combinaisons de $k$ succès parmi $n$ essais.
* **$E(X)$** : espérance mathématique (valeur moyenne à long terme en `€`, `CHF` ou unités SI).

## Exemples chiffrés pas à pas

### Exemple 1 : Redondance de capteurs (événements indépendants)

Un système ferroviaire emploie deux détecteurs indépendants : $P(A) = 0{,}80$ et $P(B) = 0{,}65$.

1. **Les deux détectent ($A \cap B$)** : $0{,}80 \times 0{,}65 = \mathbf{0{,}52}$ ($52{,}0\,\%$).
2. **Au moins un détecte ($A \cup B$)** : $0{,}80 + 0{,}65 - 0{,}52 = \mathbf{0{,}93}$ ($93{,}0\,\%$).
3. **Exactement un seul ($A \triangle B$)** : $0{,}80 + 0{,}65 - 2 \times 0{,}52 = \mathbf{0{,}41}$ ($41{,}0\,\%$).
4. **Aucun ne détecte ($\bar{A} \cap \bar{B}$)** : $1 - 0{,}93 = \mathbf{0{,}07}$ ($7{,}0\,\%$), égal à $0{,}20 \times 0{,}35$.

### Exemple 2 : Dépistage clinique et théorème de Bayes

Une pathologie touche $2\,\%$ d'une population ($P(M) = 0{,}02$, $P(\bar{M}) = 0{,}98$). Un test offre $94\,\%$ de sensibilité ($P(+ \mid M) = 0{,}94$) et $92\,\%$ de spécificité ($8\,\%$ de faux positifs, $P(+ \mid \bar{M}) = 0{,}08$).

1. **Vrais positifs conjoints** : $0{,}94 \times 0{,}02 = \mathbf{0{,}0188}$.
2. **Faux positifs conjoints** : $0{,}08 \times 0{,}98 = \mathbf{0{,}0784}$.
3. **Probabilité d'un test positif** : $P(+) = 0{,}0188 + 0{,}0784 = \mathbf{0{,}0972}$ ($9{,}72\,\%$).
4. **Valeur prédictive positive** :
   $$P(M \mid +) = \frac{0{,}0188}{0{,}0972} \approx \mathbf{0{,}1934} \quad (\mathbf{19{,}34\,\%})$$

Moins d'un patient positif sur cinq est réellement malade, car les $8\,\%$ de faux positifs frappent les $98\,\%$ d'individus sains : un second test confirmatoire reste indispensable.

## Tableau de référence des opérations probabilistes

| Opération | Notation | Formule | Condition | Interprétation |
| :--- | :--- | :--- | :--- | :--- |
| **Contraire** | $P(\bar{A})$ | $1 - P(A)$ | Aucune | $A$ ne survient pas |
| **Intersection indép.** | $P(A \cap B)$ | $P(A) \cdot P(B)$ | Indépendance | $A$ **et** $B$ |
| **Intersection dép.** | $P(A \cap B)$ | $P(A) \cdot P(B \mid A)$ | Dépendance | $A$ **puis** $B$ |
| **Union disjointe** | $P(A \cup B)$ | $P(A) + P(B)$ | $P(A \cap B) = 0$ | $A$ **ou** $B$ |
| **Union générale** | $P(A \cup B)$ | $P(A) + P(B) - P(A \cap B)$ | Chevauchement | Au moins un des deux |
| **Ou exclusif** | $P(A \triangle B)$ | $P(A) + P(B) - 2P(A \cap B)$ | Symétrique | Exactement un seul |
| **Aucun des deux** | $P(\bar{A} \cap \bar{B})$ | $1 - P(A \cup B)$ | De Morgan | Ni $A$ ni $B$ |
| **Au moins un succès** | $P(X \ge 1)$ | $1 - (1 - p)^n$ | $n$ essais indép. | $\ge 1$ succès sur $n$ |

## Pièges classiques et biais de raisonnement à éviter

* **Confondre indépendance et incompatibilité** : Deux événements non impossibles ne sont jamais à la fois indépendants ($P(A)P(B) > 0$) et incompatibles ($P(A \cap B) = 0$). S'ils s'excluent, la survenue de $A$ impose $P(B \mid A) = 0$ : ils sont fortement dépendants.
* **Inverser le conditionnement ($P(M \mid +) \neq P(+ \mid M)$)** : C'est le sophisme du procureur. Vérifiez toujours l'événement connu à droite de la barre verticale.
* **Céder à l'erreur du parieur** : Après cinq « face » sur une pièce équilibrée, la probabilité de « pile » reste $0{,}50$ ; la loi des grands nombres dilue les écarts sans jamais compenser le passé.
* **Additionner sur essais répétés** : Une chance de $0{,}25$ par essai ne donne pas $100\,\%$ sur quatre essais, mais $1 - (1 - 0{,}25)^4 \approx \mathbf{68{,}36\,\%}$ via le complémentaire.
