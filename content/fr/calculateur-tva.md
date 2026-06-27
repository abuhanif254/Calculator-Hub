---
title: "Calculatrice de TVA"
description: "Ajoutez instantanément la TVA à un prix hors taxes (HT) ou extrayez le montant de la TVA d'un prix toutes taxes comprises (TTC)."
metaTitle: "Calculatrice de TVA | Passer du prix HT au TTC"
metaDescription: "Calculatrice de TVA en ligne gratuite. Calculez rapidement les prix TTC en ajoutant la TVA, ou retrouvez les prix HT. Parfait pour les entreprises et consommateurs."
metaKeywords: "calculatrice tva, calcul tva, prix ht, prix ttc, ajouter tva, inverser tva, taux tva france"
---

## Le Guide Complet de la Taxe sur la Valeur Ajoutée (TVA)

La Taxe sur la Valeur Ajoutée (TVA) est un impôt indirect sur la consommation, utilisé par plus de 170 pays dans le monde, y compris l'ensemble de l'Union européenne.
Contrairement à la taxe de vente américaine (Sales Tax) qui s'ajoute en caisse, la TVA est profondément intégrée dans toute la chaîne d'approvisionnement et est presque toujours incluse directement dans le prix affiché pour le consommateur final (le prix Toutes Taxes Comprises ou TTC).

Parce que la TVA est intégrée dans le prix final, les mathématiques requises pour extraire la taxe ou calculer le prix de base Hors Taxes (HT) peuvent être trompeuses. Soustraire simplement le pourcentage de la taxe du prix total entraînera une erreur mathématique qui peut gravement endommager la comptabilité d'une entreprise.

Notre **Calculatrice de TVA** est un outil de précision. En entrant un prix et le taux de TVA (ex: 20% en France pour le taux normal), cet outil peut instantanément ajouter la taxe pour générer un prix TTC, ou effectuer la mathématique inverse pour retirer la taxe et révéler le prix HT.

## Comment Utiliser la Calculatrice de TVA

### Mode 1 : Ajouter la TVA (HT vers TTC)
Utilisez ce mode si vous êtes un entrepreneur qui fixe le prix d'un nouveau produit.
1. **Prix Net (HT) :** Entrez le prix de base de l'article avant les taxes.
2. **Taux de TVA :** Entrez le taux normal (ex: 20%) ou réduit (ex: 5,5% ou 10% en France).
3. **Le Résultat :** La calculatrice multipliera le prix net par le taux pour générer le **Montant de la TVA** et le **Prix Brut (TTC)**.

### Mode 2 : Retirer la TVA (TTC vers HT)
Utilisez ce mode si vous êtes un consommateur avec un reçu ou pour votre comptabilité.
1. **Prix Brut (TTC) :** Entrez le prix final payé.
2. **Taux de TVA :** Entrez le taux en pourcentage qui a été appliqué.
3. **Le Résultat :** La calculatrice effectuera le calcul inverse pour révéler le **Prix Net (HT)** et le **Montant de la TVA**.

## Qu'est-ce qu'exactement la TVA ?

La TVA est une taxe "multi-stades". L'État perçoit une fraction de la taxe à chaque étape de la chaîne d'approvisionnement, taxant la "valeur ajoutée" à cette étape.
Les entreprises (comme un menuisier achetant du bois) paient la TVA sur leurs achats, mais elles peuvent "déduire" et récupérer cette TVA. Le fardeau financier final repose entièrement sur le consommateur (le client final du meuble), qui lui, ne peut rien récupérer.

## Mathématiques : Ajouter la TVA (Calcul du TTC)

**Formule : Prix TTC = Prix HT × Multiplicateur**
* Le multiplicateur est 1 + (Taux / 100).
* Une TVA à 20 % devient un multiplicateur de **1,20**.

**Exemple :** Un prix HT de 500 € et une TVA à 20 %.
* Prix TTC = 500 × 1,20 = **600 €**

## Mathématiques : Retirer la TVA (Le Piège)

C'est ici que beaucoup font une erreur catastrophique. Si un article coûte 600 € TTC, l'intuition vous dit de soustraire 20 % de 600 € pour trouver le prix HT.
**C'est faux !**
* 20 % de 600 € = 120 €. 
* 600 € - 120 € = 480 €. Mais nous venons de prouver ci-dessus que le prix HT était de 500 € !

Pourquoi ? Parce que la taxe de 20 % a été appliquée sur le plus petit chiffre (500), et non sur le grand (600).

**Formule : Prix HT = Prix TTC ÷ Multiplicateur**
* Prix HT = 600 ÷ 1,20 = **500 €**. Notre calculatrice utilise cette division exacte.

## Récupération de la TVA pour les Touristes (Détaxe)

Si vous êtes un touriste non-résident de l'UE visitant la France (ex: Américain ou Suisse), vous pouvez récupérer une grande partie de la TVA sur vos achats.
* Lors de l'achat de biens physiques (sacs, parfums), demandez un "Bordereau de détaxe" (Tax-Free).
* À l'aéroport, vous devez présenter les biens non utilisés et les bordereaux aux douanes (ou bornes PABLO) avant d'enregistrer vos bagages.
* Vous serez remboursé d'une grande partie de la TVA. Les services (hôtels, restaurants) ne sont pas détaxables.

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Comment passer du prix TTC au prix HT ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pour retrouver le prix HT à partir d'un prix TTC avec une TVA à 20 %, vous devez diviser le prix TTC par 1,20. Ne soustrayez pas simplement 20 %, car cela donnera un résultat mathématiquement incorrect."
      }
    },
    {
      "@type": "Question",
      "name": "Qu'est-ce que le taux réduit de TVA ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En France, à côté du taux normal de 20 %, il existe des taux réduits (ex: 10 % pour la restauration, 5,5 % pour les produits de première nécessité comme l'alimentation et 2,1 % pour certains médicaments)."
      }
    },
    {
      "@type": "Question",
      "name": "Qui paie réellement la TVA ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bien que les entreprises la collectent et la reversent à l'État, le consommateur final est celui qui supporte l'intégralité de la charge financière de la TVA."
      }
    }
  ]
}
</script>
