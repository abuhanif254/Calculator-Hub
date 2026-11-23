---
title: "Calculatrice Financière"
metaTitle: "Calculatrice Financière | Valeur Temporelle de l'Argent"
description: "Projetez la valeur future de votre capital et de vos versements périodiques grâce aux équations complètes de la valeur temporelle de l'argent et des intérêts composés."
metaDescription: "Calculez la valeur future, les intérêts composés et la croissance d'un capital avec versements réguliers selon le taux et la fréquence de capitalisation."
metaKeywords: "calculatrice financière, valeur temporelle de l'argent, valeur future, valeur actuelle, intérêts composés, capitalisation mensuelle, annuité, taux annuel effectif, épargne long terme"
faqs:
  - question: "Comment la fréquence de capitalisation modifie-t-elle le taux annuel effectif ?"
    answer: "Plus les intérêts sont calculés et réincorporés au capital fréquemment, plus vite ils produisent eux-mêmes de nouveaux intérêts. Pour un taux nominal annuel de 7,00 %, le taux annuel effectif atteint 7,000 % en capitalisation annuelle, 7,186 % en capitalisation trimestrielle, 7,229 % en capitalisation mensuelle et tend vers la limite continue e^0,07 - 1, soit 7,251 %."
  - question: "Quelle différence y a-t-il entre des versements en fin de période et en début de période ?"
    answer: "Avec des versements en fin de période (annuités à terme échu), chaque contribution commence à fructifier à la période suivante. Avec des versements en début de période (annuités d'avance, par exemple un virement programmé dès le premier jour du mois), chaque dépôt profite d'une période de capitalisation supplémentaire, ce qui multiplie la valeur future de la série de versements par (1 + i)."
  - question: "Comment tenir compte de l'inflation pour estimer son pouvoir d'achat futur ?"
    answer: "Ne vous contentez pas de soustraire l'inflation au taux nominal : appliquez la relation exacte de Fisher, r_réel = (1 + r_nominal) / (1 + inflation) - 1. Avec un rendement nominal de 6,00 % et une inflation de 2,00 %, le rendement réel exact est de 3,92 % (et non 4,00 %), ou vous pouvez directement diviser la valeur future nominale par (1 + inflation)^n."
  - question: "Qu'est-ce que la règle des 72 et dans quelles limites reste-t-elle fiable ?"
    answer: "La règle des 72 permet d'estimer mentalement le nombre d'années nécessaires pour doubler un capital sans versement additionnel en divisant 72 par le taux annuel exprimé en pourcentage (à 6 %, 72 / 6 = 12 ans contre 11,90 ans exactement ; à 8 %, 72 / 8 = 9 ans contre 9,01 ans). Cette approximation reste très précise entre 4 % et 12 %, mais s'écarte de la formule logarithmique exacte ln(2) / ln(1 + r) aux taux très faibles ou très élevés."
  - question: "Faut-il saisir un rendement brut ou net de frais et d'impôts dans la calculatrice financière ?"
    answer: "Pour une projection réaliste, retranchez systématiquement les frais de gestion annuels du support (fonds indiciels, unités de compte, frais d'enveloppe) avant de lancer le calcul. Si vos revenus capitalisent en franchise d'impôt annuelle (PEA, assurance-vie, PER en France, pilier 3a en Suisse, CELI ou REER au Canada), modélisez le taux net de frais puis appliquez la fiscalité de sortie ; si les intérêts sont taxés chaque année (compte à terme ou livret fiscalisé soumis au PFU de 30 %), réduisez directement le taux annuel de la ponction fiscale."
---

En gestion de patrimoine comme en finance d'entreprise, chaque décision d'épargne repose sur la **valeur temporelle de l'argent**. Un capital disponible aujourd'hui vaut davantage qu'une somme identique perçue plus tard, car il peut être placé dès maintenant pour générer des intérêts composés tout en résistant à l'érosion monétaire due à l'inflation.

Cette **calculatrice financière** projette simultanément la capitalisation d'un capital initial et d'une suite de versements périodiques (annuités), selon votre horizon et la fréquence de capitalisation, en euros (`€`), en francs suisses (`CHF`) ou en dollars canadiens (`CAD`).

## Équations Fondamentales de la Valeur Temporelle de l'Argent

### 1. Valeur future d'un capital initial et d'une suite d'annuités
Soit $VA$ le **capital de départ** (valeur actuelle), $V$ le **versement périodique constant** effectué en fin de période (terme échu), $r$ le **taux d'intérêt annuel nominal** (en décimal), $m$ le nombre de **capitalisations par an** ($m = 1, 4, 12$) et $n$ l'**horizon** en années. En posant le taux périodique $i = \frac{r}{m}$ et le nombre total de périodes $N = n \times m$, la **valeur future** $VF$ vaut :

$$VF = VA \times (1 + i)^N + V \times \frac{(1 + i)^N - 1}{i}$$

Le premier terme mesure la croissance exponentielle du capital initial et le second la somme géométrique des versements. En cas de versements en **début de période** (annuités d'avance), seul le second terme est multiplié par $(1 + i)$.

Si les versements sont annuels ($V_{\text{an}}$) alors que la capitalisation est infra-annuelle ($m > 1$), on passe par le **taux annuel effectif** $r_{\text{eff}}$ :

$$r_{\text{eff}} = \left(1 + \frac{r}{m}\right)^m - 1 \qquad \Longrightarrow \qquad VF = VA(1 + r_{\text{eff}})^n + V_{\text{an}} \times \frac{(1 + r_{\text{eff}})^n - 1}{r_{\text{eff}}}$$

### 2. Capital investi, intérêts composés et temps de doublement
L'effort d'épargne cumulé, les gains composés et le temps exact de doublement $n_2$ d'un capital unique s'expriment par :

$$C_{\text{investi}} = VA + (V \times N), \qquad G_{\text{intérêts}} = VF - C_{\text{investi}}, \qquad n_2 = \frac{\ln(2)}{\ln(1 + r_{\text{eff}})}$$

## Exemple Chiffré Pas à Pas : Plan d'Épargne sur 15 Ans

Supposons un capital initial **$VA = 15\,000\text{ €}$** complété par un versement mensuel **$V = 350\text{ €}$** en fin de mois pendant **$n = 15\text{ ans}$**, à un taux nominal annuel net de frais de **$r = 6{,}00\text{ \%}$** capitalisé mensuellement ($m = 12$).

1. **Paramètres périodiques** : $N = 15 \times 12 = 180\text{ mois}$ et $i = 0{,}06 / 12 = 0{,}005$ ($0{,}50\text{ \%/mois}$), soit un taux annuel effectif $r_{\text{eff}} = (1{,}005)^{12} - 1 = \mathbf{6{,}168\text{ \%}}$. Le facteur de capitalisation vaut $(1{,}005)^{180} = \mathbf{2{,}454094}$.
2. **Capital initial capitalisé** :
   $$VF_{\text{initial}} = 15\,000 \times 2{,}454094 = \mathbf{36\,811{,}40\text{ €}}$$
3. **Suite des versements mensuels** :
   $$VF_{\text{versements}} = 350 \times \frac{2{,}454094 - 1}{0{,}005} = 350 \times 290{,}818712 = \mathbf{101\,786{,}55\text{ €}}$$
4. **Bilan patrimonial** :
   - **Valeur future totale** : $36\,811{,}40 + 101\,786{,}55 = \mathbf{138\,597{,}95\text{ €}}$.
   - **Total investi** : $15\,000 + (350 \times 180) = \mathbf{78\,000{,}00\text{ €}}$.
   - **Intérêts composés générés** : $138\,597{,}95 - 78\,000{,}00 = \mathbf{60\,597{,}95\text{ €}}$, soit **$43{,}72\text{ \%}$** du capital final.
5. **Calendrier et inflation** : en versant dès le $1^{\text{er}}$ du mois (annuité d'avance), la valeur future passe à **$139\,106{,}89\text{ €}$** ($+508{,}94\text{ €}$). Sous une inflation annuelle de $2{,}00\text{ \%}$ ($(1{,}02)^{15} = 1{,}345868$), ce patrimoine équivaut à **$102\,980{,}32\text{ €}$** en pouvoir d'achat actuel.

## Table de Référence : Fréquence de Capitalisation sur 25 000 € à 7 % Nominal

| Horizon ($n$) | Annuelle (7,000 %) | Trimestrielle (7,186 %) | Mensuelle (7,229 %) | Continue (7,251 %) | Bonus mensuel vs annuel |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **5 ans** | 35 063,79 € | 35 369,45 € | 35 440,63 € | 35 476,69 € | +376,84 € |
| **10 ans** | 49 178,78 € | 50 039,93 € | 50 241,53 € | 50 343,82 € | +1 062,75 € |
| **15 ans** | 68 975,79 € | 70 795,41 € | 71 223,67 € | 71 441,28 € | +2 247,88 € |
| **20 ans** | 96 742,11 € | 100 159,80 € | 100 968,47 € | 101 380,00 € | +4 226,36 € |
| **25 ans** | 135 685,82 € | 141 703,90 € | 143 135,46 € | 143 865,07 € | +7 449,64 € |
| **30 ans** | 190 306,38 € | 200 479,59 € | 202 912,44 € | 204 154,25 € | +12 606,06 € |

## Bonnes Pratiques de Modélisation et Erreurs à Éviter

- **Harmoniser la période du taux et celle des versements** : n'appliquez jamais un taux mensuel $r/12$ à des apports annuels, ni un taux annuel nominal à des versements mensuels. Faites coïncider l'unité de $V$, $i$ et $N$, ou utilisez $r_{\text{eff}}$.
- **Mesurer l'érosion cumulative des frais** : un écart de frais de $1{,}55\text{ point/an}$ ($0{,}25\text{ \%}$ sur un fonds indiciel contre $1{,}80\text{ \%}$ sur un fonds actif) ramène un rendement de $7{,}00\text{ \%}$ à $5{,}45\text{ \%}$ et réduit le capital final de **$30{,}57\text{ \%}$** sur $25\text{ ans}$.
- **Modéliser la fiscalité selon l'enveloppe** : les enveloppes à capitalisation brute différée (PEA, assurance-vie, PER en France, pilier 3a en Suisse, CELI/REER au Canada) surperforment durablement un compte taxé chaque année sur ses intérêts.
- **Raisonner en moyenne géométrique** : sur un portefeuille volatil, seul le rendement composé annualisé reflète la croissance réelle ; une hausse de $+50\text{ \%}$ suivie d'une chute de $-50\text{ \%}$ laisse $-25\text{ \%}$, malgré une moyenne arithmétique de $0\text{ \%}$.
