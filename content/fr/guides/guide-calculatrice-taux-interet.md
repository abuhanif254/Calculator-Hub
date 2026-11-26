---
title: "Les Taux d'Intérêt Expliqués : TAEG Nominal vs Effectif"
description: "Comprenez la différence exacte entre taux nominal, taux annuel effectif (TAE) et TAEG légal avec frais, grâce aux formules de capitalisation et à notre calculatrice."
category: "Finance"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "interest-rate-calculator"
faqs:
  - question: "Quelle est la différence entre le taux débiteur nominal, le TAE et le TAEG ?"
    answer: "Le taux débiteur nominal (ou taux facial) sert uniquement de base au calcul des intérêts périodiques et ignore la capitalisation intra-annuelle comme les frais annexes. Le Taux Annuel Effectif (TAE, ou APY en finance anglo-saxonne) intègre l'effet mathématique de la fréquence de capitalisation. Enfin, le TAEG (Taux Annuel Effectif Global, obligatoire en Europe pour les crédits) va plus loin : il inclut la capitalisation actuarielle ainsi que tous les frais obligatoires (dossier, garantie, assurance exigée)."
  - question: "Pourquoi deux banques affichant le même taux nominal de 4 % peuvent-elles avoir des TAEG très différents ?"
    answer: "Parce que le TAEG agrège l'ensemble des coûts liés à l'octroi du prêt. Si la banque A facture 0 € de frais de dossier et une assurance à 0,15 %, tandis que la banque B applique 1 200 € de frais de dossier, des frais de caution et une assurance à 0,40 %, la banque B affichera un TAEG nettement supérieur malgré un taux nominal identique de 4,00 %."
  - question: "Qu'est-ce que la capitalisation continue et existe-t-elle en banque de détail ?"
    answer: "La capitalisation continue correspond à la limite mathématique obtenue lorsque la fréquence de calcul des intérêts tend vers l'infini (m → ∞), régie par la constante exponentielle e via la formule e^(r) − 1. En pratique, la banque de détail applique au maximum une capitalisation quotidienne (m = 365), tandis que la capitalisation continue reste utilisée en finance de marché pour valoriser les options et obligations."
  - question: "Comment passer d'un taux effectif annoncé à un taux nominal mensuel ?"
    answer: "Pour retrouver le taux nominal correspondant à un TAE connu composé m fois par an, on inverse la formule : r_nom = m × [(1 + TAE)^(1/m) − 1]. Par exemple, un rendement annuel effectif de 6,168 % composé mensuellement (m = 12) correspond à 12 × [(1,06168)^(1/12) − 1] = 6,00 % de taux nominal annuel, soit exactement 0,50 % par mois."
  - question: "La règle des quinzaines utilisée par les livrets français modifie-t-elle le taux effectif ?"
    answer: "Oui, de manière marginale sur les dépôts et retraits en cours d'année. Les livrets réglementés comme le Livret A calculent les intérêts par quinzaine (le 1er et le 16 du mois), mais ne les capitalisent qu'une seule fois par an au 31 décembre : leur taux affiché est donc à la fois nominal et effectif annuel si le capital reste déposé du 1er janvier au 31 décembre."
---

Lorsqu'un établissement financier annonce un taux d'intérêt, ce taux facial — appelé **taux nominal** ou taux débiteur — ne correspond presque jamais au coût ou au rendement mathématique réel sur une année. Dès que les intérêts sont calculés et capitalisés plusieurs fois par an, ils produisent eux-mêmes de nouveaux intérêts sur les périodes suivantes, hissant le **Taux Annuel Effectif (TAE)** au-dessus du taux nominal selon la relation `(1 + r_nom / m)^m − 1`.

Pour évaluer objectivement plusieurs offres de prêt ou d'épargne, notre [Calculatrice de Taux d'Intérêt](/fr/calculatrices/calculatrice-taux-interet) convertit immédiatement un taux nominal en taux effectif selon la fréquence de composition choisie, et détermine la mensualité ainsi que le coût total des intérêts.

## Taux nominal, taux effectif et TAEG : définitions et formules

En finance européenne, trois notions complémentaires encadrent l'affichage et le calcul des taux.

### Taux débiteur nominal

Le taux nominal (`r_nom`) détermine uniquement le taux périodique `r_période = r_nom / m`, où `m` représente le nombre de capitalisations par an (`12` mensuellement, `4` trimestriellement, `365` quotidiennement). Il ignore la capitalisation composée sur l'année ainsi que les frais de dossier ou d'assurance.

### Taux Annuel Effectif (TAE / APY)

Le taux effectif annuel mesure le rendement ou le coût actuariel pur sur `12` mois en intégrant la fréquence de capitalisation `m` :

```text
TAE = (1 + r_nom / m)^m − 1
TAE_continu = e^(r_nom) − 1
r_nom = m × [(1 + TAE)^(1 / m) − 1]
```

La troisième formule permet de retrouver le taux nominal mensuel à partir d'un taux effectif annuel connu.

### TAEG (Taux Annuel Effectif Global)

Obligatoire pour tout crédit aux particuliers dans l'Union européenne, le **TAEG** étend le calcul actuariel en intégrant tous les frais exigés pour l'octroi du prêt : frais de dossier, courtage, garantie et assurance emprunteur obligatoire. C'est l'unique indicateur permettant de comparer deux offres bancaires sur une base homogène.

## Exemple chiffré : de la mensualité au TAEG réel

Comparons deux offres de prêt personnel de `20 000,00 €` sur `48` mois (`4` ans).

### Offre A : 6,00 % nominal mensuel + 400,00 € de frais de dossier

1. **Taux mensuel :** `6,00 % / 12 = 0,50 %` (`0,005`).
2. **Mensualité hors frais :** `20 000 × [0,005 × (1,005)^48] / [(1,005)^48 − 1] = 469,70 €`.
3. **Taux effectif pur (hors frais) :** `(1 + 0,005)^12 − 1 = 6,168 %` (`6,17 %`).
4. **Impact des frais sur le TAEG :** Avec `400,00 €` de frais retenus au départ, le capital net reçu vaut `19 600,00 €` pour `48` mensualités de `469,70 €`. Le taux interne annuel composé — le **TAEG légal** — grimpe à **`7,27 %`**.

### Offre B : 5,80 % nominal quotidien, sans frais

1. **Taux effectif annuel :** `(1 + 0,058 / 365)^365 − 1 = 5,971 %`.
2. **Comparaison :** La capitalisation quotidienne rapproche le taux facial de `6,00 %`, mais l'absence de frais maintient son TAEG (`5,97 %`) `1,30` point en dessous de l'Offre A (`7,27 %`).

## Tableau comparatif selon la fréquence de capitalisation

Ce tableau montre l'évolution du Taux Annuel Effectif pour deux taux nominaux de référence (`10,00 %` et `6,00 %`).

| Fréquence de capitalisation | Périodes (`m`) | TAE pour 10,00 % | Écart | TAE pour 6,00 % | Écart |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Annuelle | 1 | 10,000 % | +0,000 pt | 6,000 % | +0,000 pt |
| Semestrielle | 2 | 10,250 % | +0,250 pt | 6,090 % | +0,090 pt |
| Trimestrielle | 4 | 10,381 % | +0,381 pt | 6,136 % | +0,136 pt |
| Mensuelle | 12 | 10,471 % | +0,471 pt | 6,168 % | +0,168 pt |
| Quotidienne | 365 | 10,516 % | +0,516 pt | 6,183 % | +0,183 pt |
| Continue (`e^r − 1`) | ∞ | 10,517 % | +0,517 pt | 6,184 % | +0,184 pt |

Le saut principal intervient entre la composition annuelle et mensuelle ; au-delà de la composition quotidienne, le passage à la capitalisation continue ne modifie le taux que de `0,001` point.

## Usages pratiques, pièges commerciaux et vigilance réglementaire

Convertir systématiquement les taux évite des erreurs coûteuses sur les crédits renouvelables comme sur l'épargne.

### Cartes renouvelables et crédits à capitalisation quotidienne

Sur les découverts bancaires et certaines cartes renouvelables, les intérêts courent au jour le jour avant d'être prélevés mensuellement. Un taux nominal de `18,00 %` composé quotidiennement représente un coût effectif de `(1 + 0,18 / 365)^365 − 1 = 19,72 %`, hors cotisations de carte.

### Harmoniser épargne et crédit avant arbitrage

Les livrets d'épargne affichent un taux effectif annuel (capitalisé au 31 décembre en France), tandis que les crédits affichent un taux nominal mensuel et un TAEG. Pour arbitrer entre rembourser un crédit à `3,45 %` nominal mensuel (`3,505 %` effectif) et épargner à `3,50 %` annuel, comparez toujours en taux effectif net d'impôts.

### Taux d'usure et remboursement anticipé

En France, le TAEG ne peut excéder le **taux d'usure** trimestriel publié par la Banque de France. Gardez toutefois à l'esprit que le TAEG suppose le maintien du prêt jusqu'à son terme : si vous soldez ou renégociez un emprunt immobilier de `20` ans au bout de `5` ans, les frais initiaux sont amortis quatre fois plus vite, renchérissant le taux effectif réel sur la durée effective du crédit.
