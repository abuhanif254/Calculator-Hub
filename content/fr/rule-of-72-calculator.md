---
title: "Calculateur de la règle des 72 : temps de doublement et intérêts composés"
description: "Estimez en quelques secondes le temps nécessaire pour doubler votre capital grâce à la règle des 72. Comparez avec le calcul exact et mesurez l'inflation."
faqs:
  - question: "Pourquoi le nombre 72 fonctionne-t-il aussi bien pour estimer un doublement de capital ?"
    answer: "Le doublement d'un capital à intérêts composés obéit à l'équation (1 + r)^n = 2, dont la solution exacte fait intervenir le logarithme népérien ln(2) ≈ 0,693. Pour des rendements annuels usuels compris entre 6 % et 10 %, l'écart entre la capitalisation annuelle discrète et la capitalisation continue rapproche la constante idéale de 72. De plus, 72 possède de nombreux diviseurs entiers (2, 3, 4, 6, 8, 9, 12), ce qui en fait un outil de calcul mental incomparable."
  - question: "Quand faut-il privilégier la règle des 70 ou de 69,3 plutôt que celle des 72 ?"
    answer: "La règle de 69,3 repose directement sur ln(2) et s'avère exacte pour une capitalisation continue ou des taux très faibles inférieurs à 2 %. La règle des 70 offre un meilleur compromis pour les taux situés entre 1 % et 4 %, notamment pour évaluer l'effet de l'inflation ou le rendement d'un livret réglementé. À l'inverse, entre 5 % et 10 %, la règle des 72 minimise l'erreur d'approximation."
  - question: "La règle des 72 reste-t-elle valable après impôts et prélèvements sociaux en France ?"
    answer: "Oui, à condition d'utiliser le taux de rendement net de fiscalité et de frais de gestion. Par exemple, si un placement génère 8 % brut mais supporte le prélèvement forfaitaire unique (PFU) de 30 % à la sortie ou des frais annuels de 1 %, vous devez appliquer la règle sur le rendement réellement capitalisé chaque année, soit environ 7 % hors frais annuels avant impôt sur les plus-values réalisées."
  - question: "Comment utiliser la règle des 72 pour mesurer l'érosion du pouvoir d'achat due à l'inflation ?"
    answer: "Il suffit de diviser 72 par le taux d'inflation annuel moyen pour connaître le nombre d'années nécessaires afin que la valeur réelle de votre épargne soit divisée par deux. Avec une inflation durable de 3 % par an, 10 000 € conservés sur un compte courant non rémunéré ne vaudront plus que 5 000 € en pouvoir d'achat réel au bout d'environ 24 ans."
  - question: "Peut-on appliquer la règle des 72 à une dette à taux variable ou un crédit renouvelable ?"
    answer: "Tout à fait. La mécanique des intérêts composés s'applique aussi contre l'emprunteur lorsque les intérêts ne sont pas amortis. Une dette ou un découvert bancaire facturé à un taux annuel effectif global (TAEG) de 18 % sans remboursement du principal double de montant en seulement quatre ans (72 ÷ 18 = 4), ce qui illustre l'urgence de solder en priorité les créances les plus coûteuses."
---

La règle des 72 est une méthode de calcul mental qui permet d'estimer en quelques secondes le nombre d'années nécessaires pour doubler un capital investi à taux d'intérêt composé annuel constant. Il suffit de diviser 72 par le taux de rendement annuel exprimé en pourcentage : à 6 % par an, un placement double approximativement tous les 12 ans.

Cet outil s'applique avec la même rigueur au rendement d'un portefeuille boursier, à l'évolution d'une dette non amortie ou à l'érosion du pouvoir d'achat provoquée par l'inflation. En confrontant l'approximation mentale à la formule logarithmique exacte, vous obtenez une vision immédiate de la puissance de la capitalisation à long terme.

## Formule mathématique, variables et comparaison des méthodes

L'estimation rapide repose sur une division élémentaire, tandis que le calcul rigoureux fait appel aux logarithmes naturels afin de modéliser la capitalisation annuelle discrète. Voici les deux expressions utilisées par notre calculateur :

- **Approximation par la règle des 72** : `Années de doublement ≈ 72 ÷ r` (où `r` est le taux annuel en pourcentage, par exemple `6` pour `6 %`).
- **Formule exacte (capitalisation annuelle)** : `Durée exacte = ln(2) ÷ ln(1 + r_décimal)` (où `r_décimal = r ÷ 100`, soit `0,06` pour `6 %`).

Pourquoi le numérateur oscille-t-il entre `69,3`, `70` et `72` ? En mathématiques financières, si les intérêts étaient capitalisés en continu à chaque instant, le temps de doublement vaudrait exactement `ln(2) ÷ r_décimal`, soit `69,31 ÷ r`. Or, la majorité des produits d'épargne en France (assurance-vie en fonds euros, livrets réglementés, dividendes réinvestis sur un PEA) capitalisent annuellement. Comme `ln(1 + r_décimal)` est légèrement inférieur à `r_décimal`, ce décalage déplace la constante idéale vers `70` pour les taux bas (`1 %` à `4 %`), puis vers `72` autour de `8 %`.

Pour les taux élevés dépassant `10 %`, on emploie parfois la correction linéaire `Années ≈ [72 + (r − 8) ÷ 3] ÷ r`. Divisible par `2, 3, 4, 6, 8, 9` et `12`, `72` reste néanmoins la référence pratique la plus polyvalente.

## Exemple pratique détaillé : simuler un PEA et l'inflation

Prenons un épargnant français qui place `15 000 €` dans un Plan d'Épargne en Actions (PEA) sur des fonds indiciels diversifiés, avec un rendement annuel net de frais de `6 %` et une inflation moyenne de `2,5 %`.

**Étape 1 : Estimer le doublement nominal avec la règle des 72.**
En divisant `72` par `6`, on obtient `72 ÷ 6 = 12 ans`. Le capital atteindra `30 000 €` après 12 ans, puis `60 000 €` après 24 ans sans versement supplémentaire.

**Étape 2 : Vérifier par la formule logarithmique exacte.**
Avec `r_décimal = 0,06`, on calcule `ln(2) ÷ ln(1,06)`, soit `0,693147 ÷ 0,058269 = 11,896 ans` (environ `11 ans et 11 mois`). L'écart avec l'approximation mentale n'est que de `0,104 an`.

**Étape 3 : Mesurer l'inflation et le doublement réel.**
Avec `2,5 %` d'inflation, le pouvoir d'achat est divisé par deux en `72 ÷ 2,5 = 28,8 ans` (`28,07 ans` en calcul exact). Selon l'équation de Fisher, le taux réel vaut `(1,06 ÷ 1,025) − 1 = 3,415 %`. Il faudra donc environ `72 ÷ 3,415 = 21,1 ans` (`20,64 ans` exacts) pour doubler son pouvoir d'achat.

## Tableau comparatif : précision des règles de 72, 70 et 69,3

Le tableau ci-dessous confronte les trois raccourcis mentaux à la durée exacte de doublement pour six niveaux de rendement annuel représentatifs des marchés financiers et du crédit.

| Taux annuel (`r`) | Règle des 72 (ans) | Règle des 70 (ans) | Règle de 69,3 (ans) | Durée exacte `ln(2)÷ln(1+r)` | Écart de la règle des 72 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `2 %` (Épargne prudente) | `36,00` | `35,00` | `34,65` | `35,00` | `+1,00 an` |
| `3 %` (Obligations / Livret) | `24,00` | `23,33` | `23,10` | `23,45` | `+0,55 an` |
| `5 %` (Portefeuille équilibré) | `14,40` | `14,00` | `13,86` | `14,21` | `+0,19 an` |
| `8 %` (Actions mondiales) | `9,00` | `8,75` | `8,66` | `9,01` | `-0,01 an` |
| `10 %` (Croissance élevée) | `7,20` | `7,00` | `6,93` | `7,27` | `-0,07 an` |
| `12 %` (Crédit / Haut risque) | `6,00` | `5,83` | `5,78` | `6,12` | `-0,12 an` |

On observe que la règle des 72 atteint une précision remarquable autour de `8 %` avec une erreur quasi nulle de `-0,01 an`, alors que la règle des 70 domine nettement pour les taux faibles compris entre `2 %` et `3 %`.

## Limites pratiques, erreurs fréquentes et précautions patrimoniales

Si la règle des 72 excelle pour comparer rapidement deux placements ou sensibiliser à l'effet boule de neige des intérêts composés, plusieurs pièges fréquents peuvent fausser votre analyse financière :

1. **Confondre rendement brut et rendement net** : Les frais de gestion annuels d'un contrat d'assurance-vie ou d'un OPCVM (souvent `0,6 %` à `2 %`) viennent directement réduire le taux de capitalisation. Passer de `6 %` à `4,5 %` net fait passer le temps de doublement de `12 ans` à `16 ans`.
2. **Ignorer la volatilité des rendements** : La formule suppose un taux constant chaque année. Or, sur les marchés actions, une baisse de `-30 %` suivie d'une hausse de `+30 %` donne un résultat cumulé de `-9 %`, et non `0 %`. C'est le taux de croissance annuel composé (TCAC) qu'il faut retenir, jamais la moyenne arithmétique simple.
3. **Oublier l'impact des versements programmés et de la fiscalité** : La règle des 72 évalue uniquement la croissance d'un capital initial unique sans apports mensuels ni retraits. De même, les prélèvements sociaux (`17,2 %`) et l'impôt sur le revenu (PFU à `12,8 %` ou barème progressif) diminuent la somme finale disponible lors des rachats.

*Avertissement : cet outil fournit des simulations mathématiques à caractère purement éducatif et ne constitue en aucun cas un conseil en investissement financier ou fiscal. Consultez un conseiller en gestion de patrimoine certifié avant toute décision d'allocation.*
