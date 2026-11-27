---
title: "Calculateur de TCAC (CAGR) : Taux de Croissance Annuel Composé"
description: "Estimez le taux de croissance annuel composé (TCAC / CAGR) de vos placements, ETF ou revenus SaaS en euros. Formule, exemple détaillé et tableau comparatif."
faqs:
  - question: "Pourquoi le TCAC est-il préférable à la moyenne arithmétique des rendements ?"
    answer: "La moyenne arithmétique surestime presque toujours la performance réelle d'un portefeuille volatil. Une baisse de 50 % suivie d'une hausse de 50 % donne une moyenne arithmétique de 0 %, mais votre capital a perdu 25 % de sa valeur. Le TCAC mesure la croissance géométrique effective qui relie réellement la valeur de départ à la valeur d'arrivée."
  - question: "Comment interpréter le TCAC d'un revenu annuel récurrent (ARR) en SaaS ?"
    answer: "Pour un éditeur de logiciel par abonnement (SaaS), le TCAC de l'ARR traduit la vitesse de croissance composée de l'activité récurrente d'une année sur l'autre, indépendamment des à-coups trimestriels. Les investisseurs en capital-risque l'utilisent pour évaluer la trajectoire d'expansion sur trois à cinq ans et calibrer les multiples de valorisation."
  - question: "Le TCAC tient-il compte des versements ou retraits effectués en cours de période ?"
    answer: "Non, la formule classique du TCAC suppose qu'aucun apport ni retrait intermédiaire n'a lieu entre la date initiale et la date finale. Si vous alimentez régulièrement un plan d'épargne en ETF chaque mois, utilisez plutôt le taux de rendement interne (TRI) ou le rendement pondéré par le temps pour éviter de fausser votre analyse."
  - question: "Que représente la règle de 72 associée au TCAC ?"
    answer: "La règle de 72 est une approximation rapide permettant d'estimer le nombre d'années nécessaires pour doubler un capital ou un chiffre d'affaires à taux composé constant : il suffit de diviser 72 par le TCAC exprimé en pourcentage. À 8 % par an, un portefeuille double approximativement tous les 9 ans."
  - question: "Peut-on calculer un TCAC sur une durée inférieure à un an ou supérieure à dix ans ?"
    answer: "Mathématiquement oui, en utilisant une fraction d'année pour les périodes courtes, mais l'annualisation d'une performance réalisée sur quelques mois est trompeuse car elle extrapole une tendance passagère sur douze mois. Le TCAC révèle toute sa pertinence sur des horizons pluriannuels compris entre 3 et 20 ans."
---

Le **taux de croissance annuel composé (TCAC)**, souvent désigné par le sigle **CAGR**, indique le rythme de progression annuel constant qui aurait permis à un capital, un portefeuille d'actions ou un revenu d'entreprise de passer de sa valeur initiale à sa valeur finale sur une période donnée.

Contrairement à une variation cumulée ou à une moyenne arithmétique trompeuse, le TCAC lisse les fluctuations intermédiaires et intègre l'effet des intérêts composés. C'est l'étalon utilisé par les gérants de fonds indiciels cotés (ETF), les analystes financiers et les dirigeants de logiciels par abonnement (SaaS) pour comparer des trajectoires pluriannuelles.

## Formule mathématique, variables et méthodologie

La formule du TCAC repose sur une moyenne géométrique calculée entre les deux bornes temporelles :

`TCAC (%) = [(Valeur finale ÷ Valeur initiale)^(1 ÷ n) − 1] × 100`

Chaque variable répond à une définition précise :

- **Valeur initiale (`V₀`)** : capital investi au départ, cours initial d'un ETF dividendes réinvestis, ou revenu annuel récurrent (ARR) au début de l'exercice observé.
- **Valeur finale (`Vₙ`)** : valorisation constatée au terme de la période étudiée, nette des frais de gestion courants.
- **Durée (`n`)** : nombre d'années exact séparant les deux mesures (par exemple `n = 3,5` pour 42 mois).

Sur le plan méthodologique, le TCAC exprime un **taux théorique constant**. Il ne signifie pas que votre portefeuille a progressé de manière linéaire chaque année, mais que le résultat composé équivaut à ce rythme annuel régulier. En Europe, les performances des ETF capitalisants sont présentées sur 3, 5 et 10 ans afin d'assurer la comparabilité réglementaire.

## Exemple pratique chiffré étape par étape

Considérons un épargnant français qui investit `12 000 €` dans un ETF actions mondial au sein d'un plan d'épargne en actions (PEA), sans apport ni retrait pendant `5 ans`. Les performances annuelles varient fortement :

- **Année 1 (`+18 %`)** : `12 000 € × 1,18 = 14 160,00 €`
- **Année 2 (`−10 %`)** : `14 160,00 € × 0,90 = 12 744,00 €`
- **Année 3 (`+22 %`)** : `12 744,00 € × 1,22 = 15 547,68 €`
- **Année 4 (`+15 %`)** : `15 547,68 € × 1,15 = 17 879,83 €`
- **Année 5 (`+8 %`)** : `17 879,83 € × 1,08 = 19 310,22 €`

Comparons maintenant les deux mesures :

1. **Moyenne arithmétique trompeuse** : `(18 − 10 + 22 + 15 + 8) ÷ 5 = 53 ÷ 5 = 10,60 %` par an.
2. **Calcul exact du TCAC** : `TCAC = (19 310,22 ÷ 12 000)^(1 ÷ 5) − 1 = (1,609185)^0,20 − 1 = 9,98 %` par an.

L'écart de `0,62 point` par an illustre l'érosion liée à la volatilité : après une perte de `10 %`, une hausse de `10 %` ne suffit pas pour revenir au capital précédent. Seul le TCAC traduit la croissance réelle en euros.

## Tableau comparatif : puissance de la capitalisation selon le TCAC

Ce tableau met en parallèle six profils d'actifs ou d'entreprises SaaS pour visualiser l'effet multiplicateur sur `5 ans` et `10 ans`, ainsi que le temps exact de doublement :

| Profil de placement ou d'activité | TCAC annuel | Facteur à 5 ans | Facteur à 10 ans | Capital pour 10 000 € (10 ans) | Délai de doublement |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Fonds monétaire / Livret prudent | 2,50 % | 1,13 × | 1,28 × | 12 801 € | 28,1 ans |
| Immobilier locatif net | 5,50 % | 1,31 × | 1,71 × | 17 081 € | 12,9 ans |
| ETF actions monde diversifié | 8,50 % | 1,50 × | 2,26 × | 22 610 € | 8,5 ans |
| Portefeuille croissance sectoriel | 12,00 % | 1,76 × | 3,11 × | 31 058 € | 6,1 ans |
| Entreprise SaaS mature (ARR) | 18,00 % | 2,29 × | 5,23 × | 52 338 € | 4,2 ans |
| Éditeur SaaS en hypercroissance (ARR) | 40,00 % | 5,38 × | 28,93 × | 289 255 € | 2,1 ans |

Passer d'un TCAC de `5,50 %` à `8,50 %` sur dix ans fait grimper le capital final de `17 081 €` à `22 610 €` pour `10 000 €` investis, soit `5 529 €` de différence grâce à la capitalisation composée.

## Enseignements stratégiques, limites et précautions d'usage

Pour interpréter un TCAC avec discernement, gardez quatre limites essentielles à l'esprit :

- **Le TCAC masque la volatilité intermédiaire** : deux ETF affichant `8,50 %` de TCAC sur dix ans peuvent avoir connu des baisses maximales historiques très différentes (`-18 %` contre `-45 %`). Analysez toujours la volatilité et le recul maximal en parallèle.
- **La sensibilité aux bornes de date** : commencer au creux d'une crise ou s'arrêter au sommet d'un cycle gonfle artificiellement le taux. Privilégiez les fenêtres glissantes sur plusieurs périodes.
- **L'impact des versements réguliers** : si vous alimentez un PEA ou une assurance-vie chaque mois, n'appliquez pas la formule brute du TCAC sur le solde total ; calculez plutôt le taux de rendement interne (TRI).
- **L'effet des frais et de l'inflation** : des frais annuels de `1,5 %` amputent directement votre TCAC net à long terme. Raisonnez également en TCAC réel, net d'inflation, pour mesurer votre gain de pouvoir d'achat.

*Avertissement : les taux et simulations présentés ont une portée strictement informative et ne préjugent pas des performances futures des marchés ou d'une entreprise. Ils ne constituent pas un conseil en investissement ; consultez un professionnel habilité avant toute décision.*
