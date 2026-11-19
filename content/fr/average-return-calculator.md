---
title: "Calculateur de Rendement Moyen"
metaTitle: "Calculateur de Rendement Moyen : Arithmétique et TCAC"
description: "Calculez le rendement moyen arithmétique et le taux de croissance annuel composé (TCAC) d'un portefeuille financier ou immobilier sur plusieurs périodes."
metaDescription: "Calculez gratuitement le rendement moyen arithmétique et géométrique (TCAC) de vos placements. Comparez la performance réelle et l'effet de la volatilité."
metaKeywords: "calculateur rendement moyen, rendement moyen arithmétique, rendement géométrique, TCAC, taux de croissance annuel composé, performance portefeuille, volatilité rendement"
faqs:
  - question: "Quelle est la différence entre le rendement moyen arithmétique et le rendement géométrique ?"
    answer: "Le rendement arithmétique additionne les performances annuelles puis les divise par le nombre d'années, en ignorant la capitalisation. Le rendement géométrique (ou TCAC) intègre l'effet composé des gains et des pertes successifs sur la base réelle du capital réinvesti à chaque période. Dès que les rendements varient d'une année sur l'autre, la moyenne géométrique est toujours inférieure à la moyenne arithmétique."
  - question: "Pourquoi une baisse de 50 % suivie d'une hausse de 50 % ne ramène-t-elle pas le portefeuille à l'équilibre ?"
    answer: "Si un capital de 10 000 € subit une perte de 50 %, il tombe à 5 000 €. Une hausse ultérieure de 50 % s'applique sur cette nouvelle base de 5 000 €, ce qui génère un gain de 2 500 € et porte le capital à 7 500 €. Bien que la moyenne arithmétique soit de 0 % ((-50 % + 50 %) / 2), la perte réelle est de 25 %, soit un rendement géométrique annuel de -13,40 %."
  - question: "Quand faut-il utiliser la moyenne arithmétique plutôt que la moyenne géométrique ?"
    answer: "La moyenne géométrique est la seule mesure exacte pour évaluer la performance historique passée d'un capital investi sans retrait ni apport intermédiaire. En revanche, en finance statistique, la moyenne arithmétique d'un échantillon historique est souvent utilisée comme estimateur non biaisé du rendement espéré pour une seule année future isolée."
  - question: "Comment intégrer l'inflation et les frais de gestion dans le calcul du rendement moyen ?"
    answer: "Il convient d'abord de soustraire les frais de gestion annuels (par exemple 0,60 % à 1,00 % sur un contrat d'assurance-vie en unités de compte) de chaque performance annuelle avant de calculer la moyenne géométrique. Pour obtenir le rendement réel net d'inflation, appliquez la formule de Fisher : ((1 + rendement nominal) / (1 + taux d'inflation)) - 1."
  - question: "Ce calcul s'applique-t-il si j'effectue des versements programmés tous les mois ?"
    answer: "Non. Le rendement moyen arithmétique et le TCAC supposent un capital unique investi au départ sans flux intermédiaires (mesure pondérée par le temps, ou TWR). Si vous réalisez des apports ou des retraits réguliers, votre performance personnelle dépend du calendrier des versements et doit être mesurée par le Taux de Rendement Interne (TRI)."
---

Évaluer la rentabilité d'un Plan d'Épargne en Actions (PEA), d'un contrat d'assurance-vie en unités de compte ou d'un patrimoine immobilier locatif exige de distinguer deux grandeurs mathématiques que les brochures commerciales confondent fréquemment : la **moyenne arithmétique** et la **moyenne géométrique** (ou Taux de Croissance Annuel Composé, TCAC). Lorsqu'un placement traverse des cycles de hausse et de baisse, la simple moyenne des pourcentages annuels donne une vision artificiellement gonflée du capital réellement accumulé.

## Pourquoi la moyenne arithmétique surestime la performance réelle

La moyenne arithmétique traite chaque période annuelle comme si le capital initial était réinitialisé au premier janvier de chaque année. Or, en gestion de patrimoine, les gains et les pertes se composent de manière multiplicative : une perte réduit l'assiette sur laquelle s'appliquera le rebond suivant.

Ce phénomène mathématique est appelé **érosion liée à la volatilité** (*volatility drag*). Plus l'amplitude des variations annuelles d'un actif est marquée, plus l'écart se creuse entre son rendement moyen apparent (arithmétique) et le taux de croissance effectif de votre épargne (géométrique). Deux fonds affichant tous deux une performance arithmétique moyenne de 7 % par an sur dix ans peuvent livrer des capitaux finaux très différents selon la régularité de leur parcours.

## Formules mathématiques : moyenne arithmétique vs moyenne géométrique (TCAC)

Soit une série de $n$ rendements périodiques successifs exprimés sous forme décimale ($r_1, r_2, \dots, r_n$), où un gain de $12\text{ \%}$ s'écrit $0,12$ et une perte de $8\text{ \%}$ s'écrit $-0,08$.

### 1. Le rendement moyen arithmétique ($R_a$)
Il correspond à la somme algébrique des rendements divisée par le nombre total de périodes observées :

$$R_a = \frac{1}{n} \sum_{i=1}^{n} r_i = \frac{r_1 + r_2 + \dots + r_n}{n}$$

### 2. Le rendement moyen géométrique ($R_g$ ou TCAC)
Il mesure le taux annuel constant qui, composé sur $n$ périodes, produit exactement le même multiplicateur final de richesse que la séquence réelle des rendements :

$$R_g = \left[ \prod_{i=1}^{n} (1 + r_i) \right]^{\frac{1}{n}} - 1 = \left[ (1 + r_1)(1 + r_2)\dots(1 + r_n) \right]^{\frac{1}{n}} - 1$$

Lorsque vous connaissez uniquement la valeur initiale du portefeuille ($V_0$) et sa valeur finale ($V_n$) après $n$ années sans flux intermédiaires, la formule se simplifie :

$$R_g = \left( \frac{V_n}{V_0} \right)^{\frac{1}{n}} - 1$$

### 3. Lien avec la variance ($\sigma^2$)
Pour des variations modérées, l'écart entre les deux moyennes dépend de la variance $\sigma^2$ (le carré de l'écart-type des rendements) selon l'approximation :

$$R_g \approx R_a - \frac{\sigma^2}{2}$$

La moyenne géométrique n'égale la moyenne arithmétique que lorsque la volatilité est strictement nulle ($\sigma = 0$), comme sur un Livret A ou un dépôt à terme à taux fixe.

## Exemple chiffré : trajectoire d'un portefeuille de 50 000 € sur 4 ans

Un épargnant investit un capital unique de **50 000 €** sur un portefeuille d'ETF actions au sein d'un PEA et relève les performances suivantes sur quatre ans :

- **Année 1** : $+20\text{ \%}$ ($r_1 = +0,20$). Le capital passe de $50\,000\text{ €}$ à $60\,000\text{ €}$.
- **Année 2** : $-15\text{ \%}$ ($r_2 = -0,15$). Le capital recule de $60\,000\text{ €}$ à $51\,000\text{ €}$.
- **Année 3** : $+10\text{ \%}$ ($r_3 = +0,10$). Le capital progresse de $51\,000\text{ €}$ à $56\,100\text{ €}$.
- **Année 4** : $+5\text{ \%}$ ($r_4 = +0,05$). Le capital atteint $58\,905\text{ €}$.

**Calcul de la moyenne arithmétique :**

$$R_a = \frac{20\text{ \%} - 15\text{ \%} + 10\text{ \%} + 5\text{ \%}}{4} = 5,00\text{ \% par an}$$

Si le portefeuille avait réellement crû au rythme composé de $5,00\text{ \%}$ par an, l'épargnant disposerait de $50\,000 \times (1,05)^4 = 60\,775,31\text{ €}$. Or son relevé affiche **$58\,905,00\text{ €}$**, soit un écart de **$1\,870,31\text{ €}$**.

**Calcul de la moyenne géométrique exacte (TCAC) :**

$$R_g = (1,20 \times 0,85 \times 1,10 \times 1,05)^{0,25} - 1 = (1,1781)^{0,25} - 1 \approx 4,18\text{ \% par an}$$

En vérifiant avec ce taux composé : $50\,000 \times (1,041828)^4 = 58\,905,00\text{ €}$. La différence de $0,82$ point par an traduit le coût mathématique exact du repli subi la deuxième année.

## Tableau comparatif : impact de la volatilité sur 100 000 € pendant 10 ans

Comparons quatre profils sur 10 ans (cinq années haussières et cinq années baissières) présentant tous exactement le **même rendement arithmétique de 8,00 % par an**, mais avec une volatilité croissante :

| Profil de Portefeuille | Alternance (5 ans / 5 ans) | Moyenne Arithmétique | Écart-Type ($\sigma$) | Rendement Géométrique (TCAC) | Capital Final à 10 ans (base 100 000 €) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Obligataire Stable** | $+8\text{ \%}$ constant | $8,00\text{ \%}$ | $0,00\text{ \%}$ | **$8,00\text{ \%}$** | $215\,892\text{ €}$ |
| **Fonds Équilibré** | $+16\text{ \%}$ / $0\text{ \%}$ | $8,00\text{ \%}$ | $8,00\text{ \%}$ | **$7,70\text{ \%}$** | $210\,034\text{ €}$ |
| **Actions Dynamiques** | $+28\text{ \%}$ / $-12\text{ \%}$ | $8,00\text{ \%}$ | $20,00\text{ \%}$ | **$6,12\text{ \%}$** | $181\,136\text{ €}$ |
| **Actifs Spéculatifs** | $+48\text{ \%}$ / $-32\text{ \%}$ | $8,00\text{ \%}$ | $40,00\text{ \%}$ | **$0,32\text{ \%}$** | $103\,238\text{ €}$ |

Malgré une moyenne arithmétique de $+8,00\text{ \%}$ par an, le profil spéculatif ne délivre qu'un rendement composé réel de $0,32\text{ \%}$ par an à cause de l'ampleur des baisses.

## Pièges fréquents lors de l'évaluation d'un portefeuille

- **Confondre performance du fonds (TWR) et enrichissement personnel (TRI)** : Le TCAC mesure la performance intrinsèque d'un support sans flux intermédiaires. Si vous investissez par versements mensuels programmés (DCA), une baisse en fin de parcours pèse sur un capital beaucoup plus lourd qu'au démarrage : utilisez alors le Taux de Rendement Interne (TRI).
- **Négliger l'asymétrie des pertes** : Une chute de $-20\text{ \%}$ exige un gain de $+25\text{ \%}$ pour revenir au point de départ ; une baisse de $-50\text{ \%}$ impose $+100\text{ \%}$. Contenir les baisses protège davantage le rendement géométrique que la recherche de hausses extrêmes.
- **Omettre la fiscalité et l'inflation** : Déduisez toujours les frais annuels de gestion, la fiscalité (PFU de $30\text{ \%}$ sur compte-titres ou prélèvements sociaux de $17,2\text{ \%}$ sur PEA après 5 ans) et le taux d'inflation pour juger votre gain réel de pouvoir d'achat.
