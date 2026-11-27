---
title: "Calculateur de Seuil de Rentabilité : Point Mort et Marge sur Coût Variable"
description: "Déterminez votre seuil de rentabilité en unités et en euros : marge sur coût variable, indice de sécurité, exemples e-commerce ou SaaS et tableau d'analyse."
faqs:
  - question: "Quelle est la différence entre le seuil de rentabilité et le point mort ?"
    answer: "Bien que les deux expressions soient souvent employées comme synonymes, le seuil de rentabilité désigne en comptabilité de gestion le niveau de chiffre d'affaires (en euros) ou de volume (en unités) à partir duquel les produits couvrent exactement l'ensemble des charges. Le point mort correspond quant à lui à la date ou au nombre de jours nécessaires pour atteindre ce seuil au cours de l'exercice."
  - question: "Comment déterminer le seuil de rentabilité pour une entreprise vendant plusieurs produits ?"
    answer: "Lorsque votre catalogue comporte plusieurs références aux marges différentes, calculez d'abord le taux de marge sur coût variable moyen pondéré par la répartition attendue des ventes. Divisez ensuite le total de vos charges fixes par ce taux moyen pondéré pour obtenir le chiffre d'affaires global d'équilibre."
  - question: "Les remboursements d'emprunt et la TVA entrent-ils dans le calcul du seuil de rentabilité ?"
    answer: "Non. Le calcul s'effectue hors taxes (HT) pour les entreprises assujetties à la TVA, car cette taxe est neutre sur le résultat. Quant aux emprunts bancaires, seuls les intérêts figurent dans les charges fixes d'exploitation ; le remboursement du capital relève de la trésorerie et sert à calculer un second indicateur appelé seuil de rentabilité financier."
  - question: "Comment appliquer cette formule à un modèle SaaS par abonnement ?"
    answer: "Dans un modèle SaaS, l'unité correspond à un client actif ou à un abonnement mensuel. Le coût variable regroupe les frais d'hébergement serveur par utilisateur, les commissions de paiement et le support de premier niveau. Diviser les charges fixes mensuelles (développement, salaires, loyers) par la marge mensuelle par abonné donne le nombre minimal de clients payants requis."
  - question: "Qu'est-ce qu'une bonne marge de sécurité pour une PME ou un site e-commerce ?"
    answer: "Une marge de sécurité supérieure à 20 % ou 25 % du chiffre d'affaires prévisionnel offre un coussin confortable face aux aléas saisonniers ou à une hausse ponctuelle des coûts publicitaires. En dessous de 10 %, l'entreprise devient vulnérable à la moindre baisse d'activité et doit réduire ses frais fixes ou revaloriser sa marge unitaire."
---

Le **seuil de rentabilité** correspond au niveau exact d'activité — en volume d'unités ou en chiffre d'affaires hors taxes (HT) — à partir duquel une entreprise couvre l'intégralité de ses charges fixes et variables. À ce point d'équilibre, le résultat d'exploitation est exactement nul.

Indispensable lors du lancement d'un site de commerce en ligne, d'un atelier industriel ou d'un logiciel SaaS par abonnement, cet indicateur répond à une question décisive : combien faut-il vendre chaque mois pour atteindre l'équilibre, et de quelle marge de sécurité disposez-vous face à un ralentissement commercial ?

## Formules mathématiques, marge sur coût variable et méthodologie

Le calcul distingue les **charges fixes** (indépendantes du volume à court terme : loyers, salaires administratifs et cotisations, logiciels, assurances, amortissements) des **charges variables** (proportionnelles aux ventes : achats de matières ou marchandises, emballage, expédition, commissions de paiement).

Calculez d'abord la **marge sur coût variable (MCV)** unitaire :

`Marge sur coût variable (€) = Prix de vente unitaire HT − Coût variable unitaire HT`

On en déduit le **taux de marge sur coût variable**, puis le seuil en volume et en valeur :

`Taux de MCV (%) = (Marge sur coût variable ÷ Prix de vente unitaire HT) × 100`
`Seuil de rentabilité (unités) = Coûts fixes ÷ (Prix de vente unitaire HT − Coût variable unitaire HT)`
`Seuil de rentabilité (€) = Coûts fixes ÷ Taux de MCV`

Pour mesurer votre résilience commerciale, le contrôle de gestion calcule également la **marge de sécurité** :

`Marge de sécurité (%) = [(Chiffre d'affaires réel − Seuil de rentabilité) ÷ Chiffre d'affaires réel] × 100`

## Exemple pratique chiffré étape par étape

Prenons une marque française de commerce en ligne vendant un accessoire de bureau au prix de `80,00 € HT`.

**Étape 1 : coûts variables unitaires**
- Coût de fabrication : `22,00 €`
- Emballage et expédition : `6,00 €`
- Frais de paiement et commission : `4,00 €`
- **Total variable unitaire** = `22 + 6 + 4 = 32,00 € HT`

**Étape 2 : marge sur coût variable**
- `MCV unitaire = 80,00 € − 32,00 € = 48,00 €`
- `Taux de MCV = (48,00 ÷ 80,00) × 100 = 60,00 %`

**Étape 3 : coûts fixes mensuels**
- Loyer d'entrepôt : `3 200 €`
- Salaires bruts chargés : `7 800 €`
- Logiciels SaaS et comptabilité : `1 400 €`
- Budget marketing fixe : `2 000 €`
- **Total des coûts fixes** = `14 400 €` par mois

**Étape 4 : seuil de rentabilité et point mort**
- **Seuil en volume** = `14 400 ÷ 48,00 = 300 unités par mois`
- **Seuil en valeur** = `300 × 80,00 € = 24 000 € HT` (ou `14 400 ÷ 0,60`)

Si l'entreprise vend `400 unités` sur un mois de `30 jours` (`32 000 € HT`), sa **marge de sécurité** atteint `[(32 000 − 24 000) ÷ 32 000] × 100 = 25,00 %`. Le **point mort** est franchi après `(300 ÷ 400) × 30 = 22,5 jours`, pour un résultat mensuel de `100 × 48,00 € = 4 800 €` avant impôt.

## Tableau comparatif par modèle économique

Ce tableau compare six structures de coûts représentatives en euros hors taxes :

| Modèle d'activité | Prix unitaire HT | Coût variable | MCV unitaire (%) | Coûts fixes mensuels | Seuil en unités / mois | Seuil en CA HT / mois |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Éditeur SaaS B2B (abonnement) | 50 € | 6 € | 44 € (88,0 %) | 22 000 € | 500 clients | 25 000 € |
| E-commerce marque propre | 80 € | 32 € | 48 € (60,0 %) | 14 400 € | 300 commandes | 24 000 € |
| Fabrication artisanale | 250 € | 110 € | 140 € (56,0 %) | 16 800 € | 120 pièces | 30 000 € |
| Conseil B2B (journée facturée) | 900 € | 180 € | 720 € (80,0 %) | 10 800 € | 15 jours | 13 500 € |
| Restauration rapide (menu) | 16 € | 5 € | 11 € (68,8 %) | 19 800 € | 1 800 couverts | 28 800 € |
| Distribution multi-marques | 60 € | 42 € | 18 € (30,0 %) | 18 000 € | 1 000 ventes | 60 000 € |

Avec des charges fixes comparables (`18 000 €` contre `22 000 €`), un distributeur à `30 %` de marge doit réaliser `60 000 €` de chiffre d'affaires pour atteindre l'équilibre, contre `25 000 €` pour un éditeur SaaS à `88 %` de marge.

## Enseignements stratégiques, erreurs fréquentes et précautions

Pour fiabiliser vos prévisions et protéger votre rentabilité, surveillez quatre points critiques :

- **Intégrer l'acquisition client variable en e-commerce** : si chaque commande coûte `14 €` de publicité en ligne, classez ce montant en coût variable afin de ne pas sous-estimer votre seuil réel.
- **Anticiper les paliers de charges fixes** : recruter ou agrandir un local déplace brutalement le point mort vers le haut.
- **Distinguer rentabilité comptable et trésorerie** : des délais clients à 60 jours, un stock élevé ou des remboursements d'emprunt peuvent créer des tensions même au-dessus du seuil comptable.
- **Optimiser le prix et la marge unitaire** : une hausse tarifaire maîtrisée ou une baisse des coûts d'achat abaisse le point mort plus rapidement qu'une réduction marginale des frais généraux.

*Avertissement : ces formules et repères sectoriels ont une vocation strictement pédagogique et informative. Ils ne remplacent pas un prévisionnel financier établi par un expert-comptable selon votre régime fiscal et social.*
