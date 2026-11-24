---
title: "Calculateur d'Intervalle de Confiance – Z, T et Proportion"
metaTitle: "Calculateur d'Intervalle de Confiance | Z, T, Proportion"
description: "Calculez vos intervalles de confiance pour une moyenne (lois Z et Student), une proportion, une variance ou deux échantillons avec étapes détaillées."
metaDescription: "Calculez l'intervalle de confiance à 90 %, 95 % ou 99 % pour moyennes (Z et Student), proportions, variance et deux échantillons avec marge d'erreur."
metaKeywords: "calculateur intervalle de confiance, intervalle de confiance 95, loi de Student, loi normale Z, marge d'erreur, intervalle de proportion, test de Welch, khi-deux variance"
faqs:
  - question: "Quand faut-il utiliser la loi normale (Z) plutôt que la loi de Student (T) pour une moyenne ?"
    answer: "La loi normale centrée réduite (Z) s'emploie uniquement lorsque l'écart-type réel de la population (σ) est connu avec certitude, situation fréquente en métrologie sur procédé étalonné mais rare dans les enquêtes empiriques. Dès que la dispersion est estimée par l'écart-type de l'échantillon (s), la loi de Student à n - 1 degrés de liberté s'impose : ses queues plus épaisses tiennent compte de l'incertitude supplémentaire liée à l'estimation de s, et elle converge naturellement vers Z lorsque l'effectif devient élevé."
  - question: "Comment interpréter correctement un intervalle de confiance à 95 % en statistique fréquentiste ?"
    answer: "En statistique fréquentiste, le paramètre réel de la population (moyenne μ ou proportion p) est une constante fixe et non une variable aléatoire. Dire que l'intervalle calculé a 95 % de chances de contenir la vraie valeur constitue donc un abus de langage. L'interprétation rigoureuse porte sur la procédure d'échantillonnage : si l'on répétait l'expérience un grand nombre de fois sur des échantillons aléatoires indépendants de même taille, environ 95 % des intervalles construits encadreraient le véritable paramètre."
  - question: "Pourquoi diviser la marge d'erreur par deux impose-t-il de quadrupler la taille de l'échantillon ?"
    answer: "L'erreur standard décroît inversement à la racine carrée de l'effectif (1 / √n). Pour réduire la demi-largeur de l'intervalle d'un facteur k à niveau de confiance identique, il faut donc multiplier le nombre d'observations par k². Ainsi, diviser la marge d'erreur par 2 exige 4 fois plus d'observations, et la diviser par 3 en réclame 9 fois plus : c'est cette loi de rendement décroissant qui dicte le budget des sondages et des essais cliniques."
  - question: "Quand préférer l'intervalle de Welch à la variance combinée pour comparer deux moyennes ?"
    answer: "Pour estimer la différence entre deux moyennes indépendantes, la méthode de Welch ne suppose pas que les deux populations partagent la même variance : elle calcule l'erreur standard à partir de chaque variance d'échantillon séparément et ajuste les degrés de liberté par la formule de Welch-Satterthwaite. Elle constitue le choix par défaut recommandé en pratique, en particulier dès que le rapport entre la plus grande et la plus petite variance dépasse 4 ou que les effectifs des deux groupes diffèrent."
  - question: "Pourquoi l'intervalle de confiance d'une variance par la loi du khi-deux est-il asymétrique ?"
    answer: "Contrairement à la loi normale ou à la loi de Student, la loi du khi-deux (χ²) est définie uniquement sur les réels positifs et présente une asymétrie prononcée vers la droite, surtout lorsque les degrés de liberté (n - 1) sont faibles. Comme les bornes s'obtiennent en divisant (n - 1)s² par deux quantiles non symétriques de cette loi, l'estimation ponctuelle s² se situe toujours plus près de la borne inférieure que de la borne supérieure."
---

En biostatistique, en métrologie industrielle comme en études de marché, une estimation ponctuelle tirée d'un échantillon ne suffit jamais à décider : elle n'indique pas sa propre précision. Dire qu'un panier moyen atteint `84,60 €` ou qu'un taux de conversion s'établit à `28,0 %` impose de quantifier l'incertitude d'échantillonnage. L'**intervalle de confiance (IC)** encadre le paramètre inconnu de la population par une fourchette plausible associée à un niveau de confiance choisi ($90\,\%$, $95\,\%$ ou $99\,\%$).

Notre calculateur traite tous les cas courants : **intervalle Z** ($\sigma$ connu), **intervalle de Student T** (statistiques résumées ou données brutes), **proportion**, **différence de deux moyennes** (Welch ou variance combinée), **échantillons appariés**, **différence de deux proportions** et **variance** par la loi du khi-deux ($\chi^2$).

## Formules fondamentales des intervalles de confiance

Pour tout estimateur de loi symétrique (moyenne, proportion ou différence), l'intervalle de confiance suit la structure générale $\text{IC}_{1-\alpha} = \hat{\theta} \pm c_{\alpha/2} \times ES(\hat{\theta})$, qui se décline en trois formules de référence :

**1. Moyenne avec écart-type $\sigma$ connu (loi normale Z)** :

$$\text{IC}_{1-\alpha}(\mu) = \bar{x} \pm z_{1-\alpha/2}\,\frac{\sigma}{\sqrt{n}}$$

**2. Moyenne avec écart-type inconnu (loi de Student T, $\text{ddl} = n - 1$)** :

$$\text{IC}_{1-\alpha}(\mu) = \bar{x} \pm t_{1-\alpha/2,\,n-1}\,\frac{s}{\sqrt{n}}$$

**3. Proportion de population (approximation de Wald)** :

$$\text{IC}_{1-\alpha}(p) = \hat{p} \pm z_{1-\alpha/2}\sqrt{\frac{\hat{p}(1 - \hat{p})}{n}}$$

* **$\hat{\theta}$ ($\bar{x}$ ou $\hat{p} = x/n$)** : estimation ponctuelle calculée sur l'échantillon.
* **$\sigma$ et $s$** : écart-type de la population ou écart-type corrigé de l'échantillon (dénominateur $n - 1$).
* **$n$ et $1 - \alpha$** : effectif indépendant et niveau de confiance (par exemple $0{,}95$ pour $\alpha = 0{,}05$).
* **$z_{1-\alpha/2}$ et $t_{1-\alpha/2,\,n-1}$** : valeurs critiques bilatérales des lois normale et de Student.
* **$ES$ et $E$** : erreur standard de l'estimateur et marge d'erreur ($E = c_{\alpha/2} \times ES$).

### Deux échantillons et intervalle de variance

Pour deux moyennes indépendantes à variances inégales, la formule de **Welch** calcule $(\bar{x}_1 - \bar{x}_2) \pm t_{1-\alpha/2,\,\nu}\sqrt{s_1^2/n_1 + s_2^2/n_2}$ avec les degrés de liberté de Welch-Satterthwaite $\nu$. Sur mesures avant/après, l'intervalle de Student apparié s'applique aux différences individuelles $d_i$. Pour une **variance** $\sigma^2$, la loi du khi-deux produit un intervalle asymétrique :

$$\text{IC}_{1-\alpha}(\sigma^2) = \left[\frac{(n - 1)s^2}{\chi^2_{1-\alpha/2,\,n-1}} \,;\, \frac{(n - 1)s^2}{\chi^2_{\alpha/2,\,n-1}}\right]$$

## Exemples chiffrés : panier moyen et taux de conversion

**Cas 1 — Moyenne avec $\sigma$ inconnu (Student T)** : Un commerçant prélève un échantillon aléatoire de **$n = 25$ commandes**, de moyenne $\bar{x} = \mathbf{84{,}60\text{ €}}$ et d'écart-type $s = \mathbf{14{,}50\text{ €}}$. On calcule l'IC à **$95\,\%$** ($\alpha = 0{,}05$).

1. **Loi et degrés de liberté** : $\sigma$ étant inconnu, on applique la loi de Student avec $\text{ddl} = 25 - 1 = \mathbf{24}$.
2. **Erreur standard** : $ES = 14{,}50 / \sqrt{25} = 14{,}50 / 5 = \mathbf{2{,}90\text{ €}}$.
3. **Marge d'erreur** : Avec $t_{0{,}975,\,24} = \mathbf{2{,}0639}$, on obtient $E = 2{,}0639 \times 2{,}90 \approx \mathbf{5{,}99\text{ €}}$.
4. **Intervalle à $95\,\%$** : $[84{,}60 - 5{,}99 \,;\, 84{,}60 + 5{,}99] = \mathbf{[78{,}61\text{ €} \,;\, 90{,}59\text{ €}]}$.
5. **Comparaison** : À **$99\,\%$** ($t_{0{,}995,\,24} = 2{,}7969$), $E$ grimpe à **$8{,}11\text{ €}$**, soit **$[76{,}49\text{ €} \,;\, 92{,}71\text{ €}]$**. À l'inverse, employer abusivement $z = 1{,}9600$ réduirait $E$ à $5{,}68\text{ €}$, sous-estimant l'incertitude de **$5{,}04\,\%$**.

**Cas 2 — Proportion** : Sur **$n = 400$ visiteurs**, $x = \mathbf{112}$ achètent, soit $\hat{p} = \mathbf{0{,}28}$ ($28{,}0\,\%$). Les critères $n\hat{p} = 112 \ge 5$ et $n(1 - \hat{p}) = 288 \ge 5$ étant vérifiés, $ES = \sqrt{0{,}28 \times 0{,}72 / 400} \approx \mathbf{0{,}02245}$. À $95\,\%$, $E = 1{,}9600 \times 0{,}02245 \approx \mathbf{0{,}0440}$ ($4{,}40$ points), d'où l'intervalle **$[23{,}60\,\% \,;\, 32{,}40\,\%]$**.

## Table de référence : valeurs critiques Z et Student

Plus l'échantillon est restreint, plus les quantiles de Student dépassent ceux de la loi normale pour refléter l'incertitude sur $s$ :

| Confiance | Risque $\alpha$ | Normale ($z$) | Student ($\text{ddl}=5$) | Student ($\text{ddl}=10$) | Student ($\text{ddl}=24$) | Student ($\text{ddl}=30$) | Student ($\text{ddl}=100$) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **$90\,\%$** | $0{,}10$ | $1{,}645$ | $2{,}015$ | $1{,}812$ | $1{,}711$ | $1{,}697$ | $1{,}660$ |
| **$95\,\%$** | $0{,}05$ | $1{,}960$ | $2{,}571$ | $2{,}228$ | $2{,}064$ | $2{,}042$ | $1{,}984$ |
| **$99\,\%$** | $0{,}01$ | $2{,}576$ | $4{,}032$ | $3{,}169$ | $2{,}797$ | $2{,}750$ | $2{,}626$ |

L'effectif agit deux fois sur la précision : il réduit l'erreur standard en $1/\sqrt{n}$ et rapproche simultanément le quantile de Student de la loi normale. Dans l'exemple du panier moyen, quadrupler l'échantillon de $25$ à $100$ commandes à dispersion constante divise l'erreur standard de $2{,}90\text{ €}$ à $1{,}45\text{ €}$ et ramène la marge d'erreur à $95\,\%$ de $5{,}99\text{ €}$ à **$2{,}88\text{ €}$** (avec $t_{0{,}975,\,99} = 1{,}9842$), soit un gain de précision légèrement supérieur à un facteur deux.

## Pièges fréquents et vérifications indispensables

* **Confondre niveau de confiance et probabilité sur un intervalle figé** : Un IC à $95\,\%$ qualifie la fiabilité du protocole d'échantillonnage ; une fois les bornes calculées, la vraie moyenne s'y trouve ou non.
* **Utiliser Wald sur de faibles effectifs** : Si $n\hat{p} < 5$, $n(1 - \hat{p}) < 5$ ou si $\hat{p}$ frôle $0\,\%$ ou $100\,\%$, l'intervalle symétrique se dégrade et peut sortir de $[0 \,;\, 1]$ ; préférez l'intervalle du score de Wilson.
* **Comparer deux groupes par chevauchement visuel** : Deux IC à $95\,\%$ séparés peuvent se chevaucher légèrement alors que l'IC de leur différence exclut zéro ; calculez toujours directement l'intervalle de la différence.
* **Négliger la normalité sur petits échantillons** : Pour $n < 15$, la loi de Student exige l'absence d'asymétrie forte et de valeur aberrante majeure ; inspectez toujours la série avant d'interpréter les bornes.
