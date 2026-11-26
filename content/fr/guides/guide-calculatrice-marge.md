---
title: "Marge vs Majoration (Markup) : Le Guide Ultime de la Tarification"
description: "Découvrez la différence cruciale entre la marge et la majoration, comment calculer votre taux de marque exact et utilisez notre Calculatrice de Marge."
category: "Finance"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "margin-calculator"
relatedType: "calculator"
faqs:
  - question: "Pourquoi une majoration de 30 % ne donne-t-elle pas une marge de 30 % ?"
    answer: "Parce que la majoration s'applique au coût d'achat (le dénominateur le plus petit), alors que la marge brute (taux de marque) se calcule par rapport au prix de vente (le dénominateur le plus grand). Ajouter 30 % à un coût de 100 € donne un prix de vente de 130 €, soit un bénéfice brut de 30 € rapporté à 130 €, ce qui ne représente que 23,08 % de marge réelle."
  - question: "Quelle différence existe-t-il en français entre taux de marge et taux de marque ?"
    answer: "Dans la comptabilité commerciale française, le taux de marque rapporte la marge brute au prix de vente hors taxes (équivalent du « gross margin »), tandis que le taux de marge commerciale (ou taux de majoration / « markup ») rapporte cette même marge au coût d'achat hors taxes. Il est essentiel de préciser le dénominateur utilisé dans vos tableaux de bord."
  - question: "Les calculs de marge doivent-ils être effectués hors taxes (HT) ou toutes taxes comprises (TTC) ?"
    answer: "Toujours hors taxes (HT). La TVA est collectée pour le compte de l'État et reversée au Trésor public : elle ne constitue ni un revenu pour l'entreprise ni une composante de sa rentabilité. Mélanger un coût d'achat HT avec un prix de vente TTC fausse artificiellement votre taux de marge."
  - question: "Comment passer directement d'un taux de marque cible au prix de vente ?"
    answer: "Divisez votre coût de revient unitaire HT par (1 − Taux de marque exprimé en décimal). Par exemple, pour obtenir une marge de 35 % sur un article coûtant 65 € HT, calculez 65 / (1 − 0,35) = 65 / 0,65 = 100 € HT."
  - question: "Peut-on atteindre une marge brute (taux de marque) de 100 % ?"
    answer: "Non, sauf si votre coût d'achat ou de revient est strictement nul (0 €). En revanche, un taux de majoration (markup) peut tout à fait atteindre ou dépasser 100 % : doubler le prix par rapport au coût (multiplier par 2) correspond à une majoration de 100 % et à un taux de marque de 50 %."
---

Fixer le bon prix de vente conditionne la rentabilité d'une entreprise, mais une confusion fréquente réduit silencieusement les bénéfices : assimiler la **marge (taux de marque)** à la **majoration (markup)**. Ces deux ratios partagent le même bénéfice brut au numérateur, mais diffèrent par leur dénominateur, créant des écarts de plusieurs points sur chaque facture.

La **marge** mesure la part du prix de vente conservée après paiement du fournisseur, tandis que la **majoration** mesure le pourcentage ajouté au coût d'achat pour fixer ce prix. Calculez vos tarifs HT sans erreur grâce à notre [Calculatrice de Marge](/fr/calculatrices/calculatrice-de-marge).

## Formules Fondamentales et Définitions de la Tarification

Toute tarification fiable s'effectue **hors taxes (HT)** afin d'isoler la performance commerciale de la TVA collectée :

- **Coût de revient (C) :** Montant HT déboursé par unité (prix fournisseur, transport, douane et emballage direct).
- **Prix de vente HT (PV) :** Montant facturé au client avant TVA.
- **Marge brute (M) :** Bénéfice unitaire brut égal à `PV − C`.
- **Taux de marque (Marge sur vente) :** Fraction du chiffre d'affaires HT conservée en marge brute.
- **Taux de majoration (Markup sur coût) :** Pourcentage ajouté au coût HT pour obtenir le prix de vente, souvent exprimé via un **coefficient multiplicateur** (`PV / C`).

```text
Marge brute (€) = PV − C
Taux de marque (%) = ((PV − C) / PV) × 100
Taux de majoration (%) = ((PV − C) / C) × 100

Prix de vente depuis marge cible : PV = C / (1 − Taux de marque)
Marge → Majoration : Majoration = Marge / (1 − Marge)
Majoration → Marge : Marge = Majoration / (1 + Majoration)
```

## Exemple Chiffré Étape par Étape : Éviter le Piège de la Majoration

Un commerçant achète un article au coût unitaire de **100,00 € HT** et vise un **taux de marque de 30 %** pour couvrir ses frais fixes et dégager un résultat net.

### L'erreur de la majoration directe

S'il ajoute `+30 %` à son coût, le prix passe à `100,00 × 1,30 = 130,00 € HT`. La marge dégagée vaut `30,00 €`, soit un taux de marque réel de `(30,00 / 130,00) × 100 = 23,08 %`. Il manque **6,92 points** de marge par rapport à l'objectif : sur `500 000 € HT` de chiffre d'affaires annuel, cette confusion détruit **34 600 €** de marge brute.

### La méthode exacte pour sécuriser 30 % de marge

Divisez le coût par `(1 − 0,30) = 0,70` :

1. **Prix de vente HT exact :** `100,00 / 0,70 = 142,86 € HT`.
2. **Vérification de la marge :** `142,86 − 100,00 = 42,86 €`, soit `(42,86 / 142,86) × 100 = 30,00 %`.
3. **Majoration équivalente :** `42,86 %` (coefficient multiplicateur HT de `1,429`).
4. **Prix TTC (TVA 20 %) :** `142,86 × 1,20 = 171,43 € TTC`.

## Table de Conversion : Taux de Marque, Majoration et Coefficient

Ce tableau convertit votre marge cible sur vente en majoration sur coût d'achat pour un coût unitaire de `100,00 € HT`.

| Taux de Marque (Marge sur PV) | Taux de Majoration (Sur Coût) | Coefficient Multiplicateur HT | Prix de Vente HT | Marge Brute Unitaire |
| :--- | :--- | :--- | :--- | :--- |
| 15,00 % | 17,65 % | 1,176 | 117,65 € | 17,65 € |
| 20,00 % | 25,00 % | 1,250 | 125,00 € | 25,00 € |
| 25,00 % | 33,33 % | 1,333 | 133,33 € | 33,33 € |
| 30,00 % | 42,86 % | 1,429 | 142,86 € | 42,86 € |
| 40,00 % | 66,67 % | 1,667 | 166,67 € | 66,67 € |
| 50,00 % | 100,00 % | 2,000 | 200,00 € | 100,00 € |
| 60,00 % | 150,00 % | 2,500 | 250,00 € | 150,00 € |

La relation est non linéaire : doubler votre prix d'achat (`+100 %` de majoration) plafonne la marge à `50 %`, tandis qu'une marge de `60 %` exige un coefficient de `2,5`.

## Cas d'Usage Stratégiques, Pièges Courants et Règles Commerciales

La distinction entre marge et majoration devient décisive lors des **promotions**. Une remise s'applique au prix de vente, sur la même base que le taux de marque. Sur un article vendu `100,00 € HT` pour un coût de `75,00 € HT` (`25 %` de marge), accorder `20 %` de remise ramène le prix à `80,00 € HT`. La marge chute alors à `(80,00 − 75,00) / 80,00 = 6,25 %` : il faut vendre quatre fois plus d'unités pour préserver la même masse de marge en euros.

Surveillez trois écueils courants :

- **Omettre les frais variables directs :** Commissions bancaires (`1,5 % à 3 %`), frais de place de marché (`10 % à 15 %`) et retours clients doivent intégrer le coût de revient avant tarification.
- **Confondre marge brute et marge nette :** Une marge brute de `40 %` doit encore couvrir loyers, salaires, marketing et impôts.
- **Mélanger devises et TVA :** Des achats en dollars et des ventes en euros exposent votre taux de marque aux variations de change si vos prix restent figés.

Sur le plan légal, l'article L. 442-5 du Code de commerce français interdit la **revente à perte** en dessous du prix d'achat effectif majoré des taxes et du transport. Contrôlez systématiquement vos tarifs HT avant toute campagne de soldes ou de déstockage. Enfin, en prestation de services ou en commerce B2B, exprimez toujours vos remises commerciales en points de marge résiduelle plutôt qu'en pourcentage du tarif catalogue afin d'éviter qu'un rabais commercial ne rende une commande déficitaire après prise en compte de vos coûts de structure.
