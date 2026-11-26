---
title: "Comprendre la TVA : La Norme Mondiale pour les Taxes"
description: "Maîtrisez les mécanismes de la Taxe sur la Valeur Ajoutée (TVA), la conversion entre prix HT et TTC, la TVA déductible et les taux applicables grâce à notre Calculatrice de TVA."
category: "Finance"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "vat-calculator"
faqs:
  - question: "Pourquoi ne peut-on pas calculer la TVA d'un prix TTC en le multipliant simplement par 20 % ?"
    answer: "Le taux de TVA s'applique toujours sur la base Hors Taxes (HT) et non sur le prix Toutes Taxes Comprises (TTC). Pour un taux de 20 %, le prix TTC représente 120 % du prix HT. La part réelle de TVA incluse dans un montant TTC correspond donc au rapport 20 / 120, soit 16,67 % du TTC, et non 20 %. Multiplier le TTC par 0,20 surestimerait la taxe de 20 %."
  - question: "Quelle est la différence entre TVA collectée, TVA déductible et TVA nette à décaisser ?"
    answer: "La TVA collectée est la taxe que vous facturez à vos clients sur vos ventes. La TVA déductible est celle que vous avez vous-même payée à vos fournisseurs sur vos achats professionnels. En fin de période, vous ne reversez à l'administration fiscale que la différence (TVA collectée moins TVA déductible). Si ce solde est négatif, vous disposez d'un crédit de TVA reportable ou remboursable."
  - question: "Comment fonctionne la franchise en base de TVA pour les micro-entreprises ?"
    answer: "Sous certains plafonds de chiffre d'affaires annuel fixés par le Code général des impôts (CGI), une entreprise bénéficie de la franchise en base : elle facture ses prestations sans TVA et doit inscrire sur ses factures la mention « TVA non applicable, art. 293 B du CGI ». En contrepartie, elle ne peut pas récupérer la TVA payée sur ses propres achats professionnels."
  - question: "Quel est le principe de l'autoliquidation de la TVA dans les échanges intracommunautaires ?"
    answer: "Lorsqu'une entreprise assujettie vend un bien ou un service à une autre entreprise identifiée à la TVA dans un autre État membre de l'Union européenne, la facture est émise Hors Taxes avec mention d'autoliquidation. C'est l'acheteur qui déclare et déduit simultanément la TVA au taux en vigueur dans son propre pays, évitant ainsi d'avancer la trésorerie."
  - question: "La TVA doit-elle être arrondie sur chaque ligne de facture ou sur le total ?"
    answer: "La réglementation européenne et fiscale française autorise l'arrondi au centime le plus proche soit par ligne de facture, soit sur le total net Hors Taxes par taux de TVA. L'arrondi sur le total par taux est recommandé en comptabilité, car il limite les écarts cumulés lors des rapprochements bancaires et des déclarations de TVA mensuelles ou trimestrielles."
---

La Taxe sur la Valeur Ajoutée (TVA) est un impôt indirect sur la consommation adopté dans plus de 170 pays et généralisé à toute l'Union européenne. Contrairement à une taxe perçue uniquement au stade final, la TVA fonctionne par paiements fractionnés : chaque entreprise collecte la taxe sur ses ventes, déduit celle réglée sur ses achats professionnels et reverse le solde net à l'État.

Pour le particulier, le tarif affiché en magasin est exprimé Toutes Taxes Comprises (`TTC`) : il supporte l'intégralité de la taxe sans récupération possible. Pour une société assujettie, la TVA est neutre sur le résultat comptable mais impose une conversion exacte entre montants Hors Taxes (`HT`) et `TTC`, automatisable avec notre [Calculatrice de TVA](/fr/calculatrices/calculateur-tva).

## Principes de fonctionnement et formules de conversion HT / TTC

La TVA taxe uniquement la valeur ajoutée créée à chaque maillon de la chaîne économique. En comptabilité, les produits et charges sont enregistrés Hors Taxes (`HT`), tandis que les encaissements et décaissements circulent `TTC`. La conversion entre ces deux bases repose sur des formules asymétriques :

```text
TTC = HT × (1 + t)
TVA = HT × t = TTC − HT
HT = TTC / (1 + t)
TVA extraite du TTC = TTC × [t / (1 + t)]
TVA nette à reverser = TVA collectée − TVA déductible
```

Chaque paramètre désigne une grandeur précise :

- **`HT` (Hors Taxes)** : base imposable nette correspondant au revenu réel du vendeur, exprimée en euros (`€`).
- **`TTC` (Toutes Taxes Comprises)** : prix final facturé au client, égal à la somme du `HT` et de la taxe.
- **`t` (Taux de TVA)** : taux légal sous forme décimale (`0,20` pour `20 %`, `0,055` pour `5,5 %`).
- **`(1 + t)`** : coefficient multiplicateur permettant d'ajouter la taxe au `HT` ou d'extraire le `HT` par division.

Une erreur fréquente consiste à soustraire `20 %` d'un montant `TTC` pour retrouver le `HT`. Or, `20 %` s'applique au `HT` (`100 %`), portant le `TTC` à `120 %`. La part réelle de TVA contenue dans un prix `TTC` vaut donc `0,20 / 1,20 = 16,667 %`, et non `20 %`. Appliquer `-20 %` sur le `TTC` sous-évaluerait la base nette de `3,33 %`.

## Exemple chiffré étape par étape : chaîne de valeur et extraction

Suivons un bien soumis au taux normal français de `20 %` à travers trois intervenants :

1. **Producteur** : il vend des matières premières pour `100,00 € HT`, ajoute `20,00 €` de TVA (`120,00 € TTC`) et reverse `20,00 €` au Trésor public.
2. **Fabricant** : il revend le produit fini au distributeur pour `250,00 € HT` et collecte `50,00 €` de TVA (`300,00 € TTC`). Il déduit les `20,00 €` payés en amont et reverse `50,00 − 20,00 = 30,00 €` (`20 %` de sa valeur ajoutée de `150,00 €`).
3. **Distributeur** : il vend au client final pour `400,00 € HT` et encaisse `80,00 €` de TVA (`480,00 € TTC`). Après déduction des `50,00 €` versés au fabricant, il reverse `80,00 − 50,00 = 30,00 €`.

Au total, l'État perçoit `20,00 + 30,00 + 30,00 = 80,00 €`, soit exactement la taxe payée par le consommateur sur `480,00 € TTC`. Pour extraire le `HT` depuis ce ticket final de `480,00 €`, on divise par `1,20` : `480,00 / 1,20 = 400,00 € HT`, d'où `80,00 €` de TVA. À tort, calculer `480,00 × 0,20` donnerait `96,00 €`, faussant la déclaration de `16,00 €`.

## Barème des taux de TVA et coefficients de conversion

En France, plusieurs taux coexistent selon la nature des biens et le territoire :

| Régime de TVA | Taux | HT → TTC | TTC → HT | Part TVA dans TTC | Exemples concernés |
| :--- | :---: | :---: | :---: | :---: | :--- |
| Taux normal (métropole) | `20,0 %` | `× 1,200` | `÷ 1,200` | `16,67 %` | Biens courants, services, électronique |
| Taux intermédiaire | `10,0 %` | `× 1,100` | `÷ 1,100` | `9,09 %` | Restauration, rénovation, transports |
| Taux réduit | `5,5 %` | `× 1,055` | `÷ 1,055` | `5,21 %` | Alimentation, livres, énergie (abonnements) |
| Taux particulier | `2,1 %` | `× 1,021` | `÷ 1,021` | `2,06 %` | Médicaments remboursables, presse agréée |
| Taux normal DOM | `8,5 %` | `× 1,085` | `÷ 1,085` | `7,83 %` | Guadeloupe, Martinique et La Réunion |
| Taux zéro / exonéré | `0,0 %` | `× 1,000` | `÷ 1,000` | `0,00 %` | Exportations hors UE, livraisons B2B UE |

## Applications pratiques, erreurs courantes et vigilance réglementaire

La maîtrise des conversions `HT`/`TTC` sécurise vos marges et votre conformité fiscale :

- **Calcul de marge commerciale** : une marge brute se calcule toujours sur les prix `HT`. Comparer un prix de vente `TTC` à un coût d'achat `HT` gonfle artificiellement le taux de marge apparent sur les produits taxés à `20 %`.
- **Tarification B2B contre B2C** : entre professionnels assujettis (`B2B`), les devis sont négociés `HT` puisque la taxe est récupérable. À destination des particuliers (`B2C`), l'affichage `TTC` est légalement obligatoire.
- **Facturation multi-taux** : un lot réunissant un livre (`5,5 %`) et un accessoire électronique (`20 %`) doit ventiler chaque ligne selon son taux propre ; à défaut, le taux le plus élevé s'applique à l'ensemble.
- **Dépenses exclues du droit à déduction** : certaines charges professionnelles (véhicules de tourisme, hébergement des dirigeants, cadeaux au-delà du plafond légal) restent non déductibles et pèsent donc pour leur montant `TTC`.
- **Ventes européennes (`OSS` et `VIES`)** : en `e-commerce B2C`, au-delà de `10 000 € HT` annuels dans l'UE hors pays d'établissement, le taux du pays de l'acheteur s'applique via le guichet unique `OSS`. En `B2B` intracommunautaire, vérifiez toujours le numéro de TVA du client dans la base `VIES` avant de facturer `HT`.
- **Autoliquidation et exigibilité** : pour les prestations de services, la TVA devient généralement exigible lors de l'encaissement, alors qu'elle est due dès la livraison pour les ventes de biens meubles. Respecter ces dates d'exigibilité évite tout décalage de trésorerie ou pénalité de retard lors des déclarations mensuelles.
