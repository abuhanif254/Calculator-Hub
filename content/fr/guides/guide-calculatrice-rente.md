---
title: "Comment Fonctionnent les Rentes : Acheter un Chèque Mensuel Garanti"
description: "Comprenez le fonctionnement des rentes viagères et temporaires (fixes, variables, indexées), le calcul actuariel des versements et estimez votre revenu mensuel garanti."
category: "Finance"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "annuity-calculator"
relatedType: "calculator"
faqs:
  - question: "Quelle différence fondamentale sépare une rente certaine d'une rente viagère ?"
    answer: "Une rente certaine verse un revenu sur une durée contractuelle fixe (par exemple 15 ou 20 ans) : si vous décédez avant le terme, le solde ou les mensualités restantes reviennent à vos héritiers. Une rente viagère verse un revenu jusqu'à votre décès, quel que soit votre âge final, en contrepartie de l'aliénation du capital au profit de l'assureur (sauf option de réversion ou d'annuités garanties)."
  - question: "Comment l'assureur calcule-t-il le montant d'une rente viagère ?"
    answer: "L'assureur s'appuie sur deux paramètres : les tables de mortalité officielles (qui estiment votre espérance de vie statistique à la date de liquidation) et le taux technique garanti, plafonné par la réglementation prudentielle. Plus vous déclenchez la rente tardivement, plus le taux de conversion annuel du capital est élevé."
  - question: "Comment les rentes sont-elles imposées en France ?"
    answer: "La fiscalité dépend de l'enveloppe d'origine. Une rente issue d'un Plan d'Épargne Retraite (PER) après déduction des versements est imposée comme une pension (barème de l'impôt sur le revenu après abattement de 10 %, plus prélèvements sociaux de 17,2 % sur la fraction représentative des produits). Une rente viagère à titre onéreux issue d'une assurance-vie n'est imposée que sur une fraction décroissante avec l'âge (40 % entre 60 et 69 ans, 30 % à partir de 70 ans)."
  - question: "Que deviennent mes fonds si j'opte pour une rente indexée ou variable ?"
    answer: "Une rente variable reste investie en unités de compte (actions, obligations) : vos mensualités fluctuent avec les marchés et peuvent baisser en cas de krach. Une rente indexée protège généralement votre capital contre les pertes via un plancher à 0 %, mais plafonne votre participation à la hausse d'un indice boursier (par exemple à 5 % ou 6 % par an)."
  - question: "La rente protège-t-elle contre l'inflation sur 25 ou 30 ans ?"
    answer: "Une rente fixe nominale perd du pouvoir d'achat chaque année si les prix augmentent. À 2,5 % d'inflation annuelle, un revenu mensuel figé de 1 500 € n'achète plus que l'équivalent de 915 € au bout de 20 ans. Certains contrats proposent une option de revalorisation annuelle indexée, mais celle-ci réduit sensiblement la mensualité de départ."
---

L'un des risques majeurs de la retraite par capitalisation est le **risque de longévité** : épuiser son épargne avant la fin de sa vie, ou se restreindre excessivement par prudence. La **rente** répond à ce défi en transférant ce risque vers un assureur. En contrepartie d'un capital initial ou d'une épargne constituée dans le temps, l'organisme s'engage contractuellement à verser un revenu périodique garanti pendant une durée fixée ou jusqu'à votre décès.

Contrairement à de simples retraits programmés, la rente repose sur une mécanique actuarielle associant taux technique, durée d'amortissement et mutualisation. Notre [Calculatrice de Rentes](/fr/calculatrices/calculateur-rente) vous permet de modéliser ces paramètres pour mesurer l'impact exact du capital engagé, du taux servi et de l'horizon sur votre futur revenu mensuel.

## Typologie des rentes et formules actuarielles

Avant de convertir un patrimoine en revenu régulier, il faut distinguer les trois mécanismes contractuels proposés par les assureurs.

### Les trois architectures de rendement

1. **Rente fixe** : le taux d'intérêt technique est verrouillé dès l'origine. Vos mensualités restent strictement constantes et indépendantes des marchés.
2. **Rente variable** : le capital demeure investi en unités de compte (actions, obligations). La rente progresse en phase haussière, mais baisse en cas de repli boursier et supporte des frais de gestion plus lourds.
3. **Rente indexée** : elle lie la revalorisation à un indice boursier avec un **plancher** (souvent `0 %`, protégeant contre les pertes) et un **plafond** (limitant le gain annuel maximal autour de `5 %` ou `6 %`).

### Calcul d'une rente temporaire (rente certaine)

Pour une rente fixe versée en fin de mois (terme échu) sur `n` mensualités au taux périodique `r = taux_annuel / 12` :

```text
PMT = C × [r / (1 − (1 + r)^(−n))]
```

Si les versements interviennent en début de mois (terme à échoir) :

```text
PMT_début = PMT / (1 + r)
```

- **PMT** : versement mensuel brut garanti.
- **C** : capital net converti en rente (après frais éventuels).
- **r** : taux mensuel appliqué au contrat.
- **n** : nombre total de mensualités (`années × 12`).

Dans une **rente différée**, votre capital initial `C_0` capitalise d'abord pendant `d` années selon `C = C_0 × (1 + r_épargne)^d` avant le déclenchement des versements.

## Exemple détaillé : convertir 240 000 € sur 20 ans

Supposons la conversion d'un capital net de **240 000 €** en rente fixe sur **20 ans** (`n = 240 mois`) au taux annuel garanti de **4,20 %**, soit `r = 0,042 / 12 = 0,0035` par mois :

1. **Facteur d'actualisation** : `(1,0035)^(−240) = 0,432356`.
2. **Dénominateur** : `1 − 0,432356 = 0,567644`.
3. **Coefficient d'amortissement** : `0,0035 / 0,567644 = 0,00616583`.
4. **Mensualité brute** : `PMT = 240 000 × 0,00616583 = 1 479,77 €`.

Sur 20 ans, vous encaissez `1 479,77 € × 240 = 355 144,74 €`. L'écart de **115 144,74 €** par rapport au capital de départ provient des intérêts générés pendant la phase de décaissement.

## Comparatif des mensualités pour un capital de 250 000 €

Ce tableau compare les versements bruts et les cumuls perçus pour **250 000 €** selon la durée et deux taux garantis (`3,5 %` et `4,5 %`).

| Scénario de durée | Mois (`n`) | Mensualité à `3,5 %` | Total perçu à `3,5 %` | Mensualité à `4,5 %` | Total perçu à `4,5 %` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 10 ans (rente certaine) | 120 | 2 472,15 € | 296 658 € | 2 590,96 € | 310 915 € |
| 15 ans (rente certaine) | 180 | 1 787,21 € | 321 697 € | 1 912,48 € | 344 247 € |
| 20 ans (rente certaine) | 240 | 1 449,90 € | 347 976 € | 1 581,62 € | 379 590 € |
| 25 ans (rente certaine) | 300 | 1 251,56 € | 375 468 € | 1 389,58 € | 416 874 € |
| 30 ans (rente certaine) | 360 | 1 122,61 € | 404 140 € | 1 266,71 € | 456 017 € |
| Perpétuité (intérêts seuls) | Infini | 729,17 € | Capital préservé | 937,50 € | Capital préservé |

Doubler la durée de `10 ans` à `20 ans` réduit la mensualité d'environ `39 % à 41 %`, car le même capital doit financer deux fois plus d'échéances malgré les intérêts supplémentaires.

## Cas pratiques, frais cachés et points de vigilance

### Quand privilégier l'achat d'une rente

- **Sécuriser les charges fixes** : convertir une partie de l'épargne pour couvrir logement, alimentation et santé en complément des pensions publiques, tout en gardant le solde disponible.
- **Protéger le conjoint** : l'option de **réversion** (`60 %` ou `100 %`) maintient le revenu au conjoint survivant, moyennant une décote initiale de `8 % à 18 %` sur la mensualité.

### Risques et frais à inspecter avant signature

1. **Aliénation du capital** : sur une rente viagère simple sans annuités garanties, un décès précoce entraîne la perte du capital non consommé.
2. **Empilement des frais** : contrôlez les frais de conversion, les frais sur arrérages (`1 % à 3 %` par versement) et les pénalités de sortie anticipée.
3. **Érosion par l'inflation** : sans clause de revalorisation, une rente nominale fixe perd régulièrement en pouvoir d'achat.
4. **Solvabilité de l'émetteur** : privilégiez un assureur européen encadré par la directive Solvabilité II affichant un ratio de couverture robuste.

Simulez plusieurs durées et taux dans notre [Calculatrice de Rentes](/fr/calculatrices/calculateur-rente) afin d'équilibrer revenu garanti et liquidité patrimoniale.
