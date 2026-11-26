---
title: "Rendement Moyen Expliqué : Comment Mesurer vos Investissements"
description: "Distinguez moyenne arithmétique et moyenne géométrique (TCAC / CAGR), comprenez l'impact mathématique de la volatilité et calculez votre performance réelle."
category: "Finance"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "average-return-calculator"
relatedType: "calculator"
faqs:
  - question: "Pourquoi la moyenne arithmétique surestime-t-elle presque toujours le rendement d'un portefeuille ?"
    answer: "La moyenne arithmétique additionne les rendements annuels et divise par le nombre d'années comme si le capital restait identique chaque année. Or, une perte de 50 % réduit de moitié la base sur laquelle s'applique le gain suivant : il faut ensuite +100 % pour simplement revenir à l'équilibre, alors que la moyenne arithmétique de −50 % et +100 % affiche faussement +25 %."
  - question: "Quelle est la différence entre le TCAC (CAGR) et le rendement pondéré par l'argent (MWR / TRI) ?"
    answer: "Le Taux de Croissance Annuel Composé (TCAC ou moyenne géométrique) mesure la performance intrinsèque d'un placement sans tenir compte de vos dépôts ou retraits intermédiaires. À l'inverse, le Taux de Rendement Interne (TRI / MWR) intègre le montant et la date exacte de chaque flux d'argent pour mesurer la rentabilité réelle vécue par votre patrimoine personnel."
  - question: "Comment la volatilité réduit-elle la performance composée (volatility drag) ?"
    answer: "À rendement moyen arithmétique égal, plus les variations annuelles sont amples, plus le rendement géométrique réel baisse. Mathématiquement, la moyenne géométrique est approximativement égale à la moyenne arithmétique diminuée de la moitié de la variance des rendements (R_géo ≈ R_arith − σ² / 2). Réduire la volatilité sans sacrifier le rendement améliore donc mécaniquement l'enrichissement final."
  - question: "Le rendement moyen géométrique tient-il compte de l'inflation et des frais ?"
    answer: "Non par défaut : si vous calculez le TCAC à partir des soldes nominaux de votre compte, vous obtenez un rendement nominal net des frais déjà prélevés par le fonds, mais brut d'inflation et d'impôts. Pour connaître votre enrichissement réel en pouvoir d'achat, appliquez la formule de Fisher : R_réel = (1 + R_nominal) / (1 + inflation) − 1."
  - question: "Sur quelle période minimale faut-il calculer un rendement moyen pertinent ?"
    answer: "Annualiser une performance sur quelques mois produit des chiffres extravagants et statistiquement non représentatifs (par exemple, +5 % en un mois équivaut à +79,6 % en taux annualisé). Un rendement moyen annuel composé devient véritablement pertinent à partir d'un cycle complet d'au moins 3 à 5 ans, et idéalement 10 ans ou plus pour les marchés actions."
---

Lorsqu'un placement gagne **+50 %** la première année puis perd **−50 %** la deuxième, la moyenne arithmétique simple affiche **0 %**, suggérant un capital intact. En réalité, **10 000 €** montent à **15 000 €** puis retombent à **7 500 €**, soit une perte réelle de **−25 %** et un taux annualisé de **−13,40 %** !

Pour mesurer fidèlement la croissance d'un capital, il faut utiliser la **moyenne géométrique**, ou **Taux de Croissance Annuel Composé (TCAC / CAGR)**. Notre [Calculatrice de Rendement Moyen](/fr/calculatrices/calculateur-rendement-moyen) détermine automatiquement ce taux annualisé exact et le gain cumulé réel.

## Moyenne arithmétique contre moyenne géométrique : les formules

À partir d'une série de rendements annuels `r_1, r_2, ..., r_n` sur **n** années, ou d'un capital initial **V_0** atteignant **V_n** sans apports ni retraits intermédiaires, deux indicateurs s'opposent :

```text
Moyenne arithmétique : R_arith = (r_1 + r_2 + ... + r_n) / n
Facteur cumulé      : F_cum   = (1 + r_1) × (1 + r_2) × ... × (1 + r_n) = V_n / V_0
Moyenne géométrique : TCAC    = F_cum^(1 / n) − 1 = (V_n / V_0)^(1 / n) − 1
Rendement cumulé    : R_cum   = F_cum − 1
```

La moyenne arithmétique répond simplement à une question théorique ponctuelle concernant le rendement espéré sur une année isolée, sans mémoire de la trajectoire passée. À l'inverse, le **TCAC** mesure le taux annuel constant qui reproduit exactement la croissance composée de votre patrimoine du premier jour au solde final.

Mathématiquement, la moyenne géométrique reste toujours inférieure ou égale à la moyenne arithmétique dès que les performances fluctuent : cet écart s'accroît proportionnellement à la moitié de la variance des rendements annuels, un mécanisme appelé **érosion par la volatilité** (*volatility drag*). Deux portefeuilles affichant la même moyenne arithmétique aboutiront ainsi à des soldes finaux différents selon l'amplitude de leurs variations.

## Exemple chiffré pas à pas sur 5 années

Supposons un investissement initial **V_0 = 10 000 €** détenu pendant **n = 5 ans** sans mouvement de trésorerie, avec la séquence annuelle suivante : **+22 %**, **−15 %**, **+12 %**, **+8 %** et **−4 %**.

1. **Moyenne arithmétique (trompeuse) :**
   `(0,22 − 0,15 + 0,12 + 0,08 − 0,04) / 5 = 0,23 / 5 = +4,60 %`.
   Appliquée de manière composée, elle ferait croire à un capital de `10 000 × (1,046)^5 = 12 521,56 €`.
2. **Facteur cumulé et solde réel :**
   `F_cum = 1,22 × 0,85 × 1,12 × 1,08 × 0,96 = 1,204181`.
   Le capital final effectif vaut `10 000 × 1,204181 = 12 041,81 €`, soit un gain cumulé réel de **+20,42 %** (près de 480 € sous l'estimation arithmétique).
3. **Taux de Croissance Annuel Composé (TCAC) :**
   `TCAC = (12 041,81 / 10 000)^(1 / 5) − 1 = (1,204181)^(0,20) − 1 = 3,79 %/an`.

Votre capital a donc progressé exactement comme un placement à taux fixe constant de **3,79 %** par an sur cinq ans.

## Effet de la volatilité : comparaison de 5 profils sur 4 ans

Le tableau suivant compare cinq portefeuilles partis avec **10 000 €** sur **4 ans** pour illustrer l'écart croissant entre moyenne arithmétique et TCAC :

| Profil sur 4 ans | Séquence annuelle | Moyenne arithmétique | TCAC réel | Capital final | Érosion par volatilité |
| :--- | :--- | :---: | :---: | :---: | :---: |
| Croissance stable | +6 %, +6 %, +6 %, +6 % | 6,00 % | 6,00 % | 12 625 € | 0,00 pt |
| Volatilité modérée | +12 %, −2 %, +10 %, +4 % | 6,00 % | 5,86 % | 12 557 € | −0,14 pt |
| Marché cyclique | +25 %, −15 %, +20 %, −6 % | 6,00 % | 4,63 % | 11 985 € | −1,37 pt |
| Forte instabilité | +50 %, −50 %, +50 %, −50 % | 0,00 % | −13,40 % | 5 625 € | −13,40 pts |
| Krach suivi d'un rebond | −40 %, +66,7 %, +8 %, +8 % | 10,67 % | 3,92 % | 11 664 € | −6,75 pts |

Sur la dernière ligne, bien que le rebond de **+66,7 %** efface mathématiquement le krach initial de **−40 %** (`0,60 × 1,6667 = 1,00`), la moyenne arithmétique affiche un résultat trompeur de **+10,67 %** alors que le rendement composé réel du placement sur quatre ans atteint seulement **3,92 %** par an. Cet exemple démontre l'utilité de vérifier systématiquement le facteur cumulé avant d'investir.

## Usages pratiques, biais méthodologiques et limites

### Choisir le bon indicateur selon vos flux de trésorerie

Le TCAC constitue la référence absolue pour comparer objectivement deux fonds indiciels ou deux classes d'actifs sur des périodes identiques, ou pour évaluer la rentabilité historique d'un investissement immobilier locatif en intégrant les loyers nets réinvestis. En revanche, dès que votre portefeuille enregistre des dépôts mensuels ou des retraits irréguliers, le calcul simple entre valeur finale et capital initial perd sa validité ; privilégiez alors deux outils complémentaires :

- **Le rendement pondéré par le temps (TWR) :** isole totalement vos apports externes pour juger objectivement la performance intrinsèque du gérant ou de la stratégie ;
- **Le Taux de Rendement Interne (TRI / MWR) :** intègre la date exacte et le montant de chaque versement ou retrait pour mesurer votre enrichissement financier personnel réel.

### Quatre erreurs d'interprétation fréquentes

1. **Comparer des durées différentes :** un TCAC mesuré sur 5 années haussières ne se compare jamais à un TCAC calculé sur 15 ans incluant une crise ; alignez strictement vos dates de début et de fin.
2. **Ignorer le risque de séquence des rendements :** en l'absence de retraits, l'ordre des rendements annuels ne modifie pas le TCAC final. En phase de décumulation à la retraite, subir de lourdes pertes durant les premières années accélère considérablement l'épuisement du capital, même à TCAC identique.
3. **Oublier les dividendes réinvestis :** comparer un fonds capitalisant à un indice nu (*Price Return*) comme le CAC 40 classique fausse l'analyse ; utilisez systématiquement l'indice dividendes réinvestis (CAC 40 GR).
4. **Extrapoler un historique trop court :** un TCAC exceptionnel observé sur 2 ou 3 ans reflète souvent une expansion temporaire des multiples de valorisation plutôt qu'un rendement durable sur vingt ans.
