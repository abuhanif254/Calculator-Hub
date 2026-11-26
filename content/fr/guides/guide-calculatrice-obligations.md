---
title: "Comprendre les Obligations : La Base d'un Portefeuille Sûr"
description: "Maîtrisez la mécanique des obligations : valeur nominale, coupon, relation inverse avec les taux d'intérêt, calcul du rendement à l'échéance (YTM) et gestion de la duration."
category: "Finance"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "bond-calculator"
relatedType: "calculator"
faqs:
  - question: "Pourquoi le prix d'une obligation baisse-t-il lorsque les taux d'intérêt montent ?"
    answer: "Le coupon d'une obligation à taux fixe reste figé jusqu'à l'échéance. Si les banques centrales relèvent les taux et que de nouvelles obligations sont émises à 5 %, personne n'achètera au pair une ancienne obligation ne versant que 3 %. Son prix sur le marché secondaire doit donc baisser à escompte afin que son rendement global atteigne lui aussi 5 % pour le nouvel acheteur."
  - question: "Quelle est la différence entre le taux de coupon et le rendement à l'échéance (YTM) ?"
    answer: "Le taux de coupon indique uniquement le revenu annuel versé par rapport à la valeur nominale initiale (par exemple 40 € par an pour un nominal de 1 000 € à 4 %). Le rendement à l'échéance (Yield to Maturity ou taux actuariel) mesure le rendement annualisé total réel si vous achetez l'obligation au prix du jour et la conservez jusqu'au remboursement final, en intégrant la plus-value ou moins-value entre le prix d'achat et le pair."
  - question: "Que signifie acheter une obligation à escompte ou avec une prime ?"
    answer: "Une obligation se négocie à escompte (décote) lorsque son prix de marché est inférieur à sa valeur nominale (par exemple 922 € pour 1 000 € de nominal) ; son YTM est alors supérieur au taux de coupon. Elle cote avec une prime (surcote) au-dessus de 1 000 € lorsque son coupon dépasse les taux actuels du marché, ce qui rend son YTM inférieur au taux de coupon."
  - question: "Risque-t-on de perdre de l'argent sur une obligation si on la conserve jusqu'à l'échéance ?"
    answer: "Si vous détenez une obligation individuelle jusqu'à sa date de maturité, les fluctuations intermédiaires liées aux taux d'intérêt disparaissent : vous récupérez 100 % de la valeur nominale, sauf défaut de paiement de l'émetteur (risque de crédit). En revanche, un fonds obligataire sans échéance fixe ou une revente anticipée sur le marché secondaire expose directement votre capital au risque de taux."
  - question: "Comment interpréter la duration modifiée d'une obligation ?"
    answer: "La duration modifiée mesure la sensibilité du prix d'une obligation à une variation de 1 point de pourcentage (100 points de base) des taux d'intérêt. Une duration modifiée de 8 ans signifie qu'une hausse soudaine des taux de 1 % entraîne une baisse immédiate d'environ 8 % du cours de l'obligation sur le marché secondaire, et inversement en cas de détente des taux."
---

Une **obligation** est un titre de créance émis par un État (OAT françaises, Bunds allemands) ou par une entreprise pour emprunter des capitaux. En l'achetant, vous devenez créancier : l'émetteur s'engage à vous verser un intérêt périodique — le **coupon** — puis à rembourser la **valeur nominale** à une date d'échéance fixée à l'avance.

Sur le marché secondaire, le cours d'une obligation évolue en sens inverse des taux d'intérêt directeurs. Notre [Calculatrice d'Obligations](/fr/calculatrices/calculateur-d-obligations) calcule la valeur théorique d'un titre et détermine son **rendement à l'échéance (YTM)**, seul indicateur fidèle de sa rentabilité totale.

## Paramètres fondamentaux et équation de valorisation

Quatre paramètres définissent une obligation à taux fixe standard :

- **Valeur nominale (F) :** capital remboursé à l'échéance (généralement **1 000 €** par titre) ;
- **Taux de coupon (c) :** intérêt annuel fixe appliqué au nominal, versé annuellement ou semestriellement (`C = F × c / f`, où `f` est le nombre de paiements par an) ;
- **Maturité résiduelle (T) :** années restant jusqu'au remboursement, soit `N = T × f` périodes ;
- **Rendement à l'échéance (YTM) :** taux d'actualisation annuel égalisant le prix de marché (**P**) à la somme actualisée de tous les flux futurs.

La formule d'évaluation actualisée s'écrit :

```text
y_p = YTM / f    et    C = (F × c) / f    et    N = T × f
P   = C × [1 − (1 + y_p)^(−N)] / y_p + F / (1 + y_p)^N
```

Lorsque le prix **P** est observé sur le marché, le **YTM** ne se résout pas algébriquement au-delà de quelques périodes : le calculateur utilise une résolution numérique itérative (Newton-Raphson) pour déterminer le taux actuariel exact.

## Exemple chiffré : cotation à escompte et sensibilité aux taux

Analysons une obligation d'entreprise de qualité (*Investment Grade*) de valeur nominale **F = 1 000 €**, offrant un coupon annuel **c = 4,0 %** payé semestriellement (`f = 2`), à **T = 10 ans** de l'échéance.

1. **Flux périodiques :** pendant 10 ans (`N = 20` semestres), vous percevez `C = (1 000 × 0,04) / 2 = 20 €` tous les six mois, plus **1 000 €** au 20e semestre.
2. **Hausse des taux du marché (YTM exigé = 5,0 %) :** si les taux montent à **5,0 %/an**, le taux d'actualisation semestriel devient `y_p = 0,05 / 2 = 0,025`.
3. **Actualisation des coupons :** `20 × [1 − (1,025)^(−20)] / 0,025 = 311,78 €`.
4. **Actualisation du principal :** `1 000 / (1,025)^20 = 610,27 €`.
5. **Prix théorique d'équilibre :** l'obligation s'échange à **311,78 + 610,27 = 922,05 €**.

En achetant ce titre à **escompte** (77,95 € sous le pair) et en le conservant jusqu'au terme des 10 années, vous encaissez 40 € de coupons annuels ainsi qu'un gain garanti de 77,95 € au remboursement final, portant votre **YTM à exactement 5,00 %** par an. Sa duration de Macaulay s'établit à **8,26 ans** et sa duration modifiée à **8,05 %** : une nouvelle hausse des taux de 1 point réduirait encore son cours d'environ 8 %.

## Sensibilité du prix obligataire selon les taux du marché

Ce tableau présente la valeur de cette même obligation (nominal **1 000 €**, coupon **4,0 %** semestriel, **10 ans**) selon le YTM exigé :

| Rendement exigé (YTM) | Contexte de taux | Prix théorique (P) | Écart vs nominal | Rendement courant | Régime de cotation |
| :---: | :--- | :---: | :---: | :---: | :--- |
| 2,0 % | Taux très bas | 1 180,46 € | +180,46 € | 3,39 % | Forte prime (+18,0 %) |
| 3,0 % | Sous le coupon | 1 085,84 € | +85,84 € | 3,68 % | Prime (+8,6 %) |
| 4,0 % | Égal au coupon | 1 000,00 € | 0,00 € | 4,00 % | Au pair (0,0 %) |
| 5,0 % | Au-dessus du coupon | 922,05 € | −77,95 € | 4,34 % | Escompte (−7,8 %) |
| 6,0 % | Resserrement monétaire | 851,23 € | −148,77 € | 4,70 % | Escompte (−14,9 %) |
| 7,0 % | Choc de taux sévère | 786,81 € | −213,19 € | 5,08 % | Fort escompte (−21,3 %) |

Grâce à la **convexité** obligataire, une baisse de 2 points des taux directeurs (de 4 % vers 2 %) génère **+180,46 €** de gain, dépassant la perte de **−148,77 €** liée à une hausse symétrique de 2 points (de 4 % vers 6 %).

## Cas d'usage, erreurs fréquentes et précautions

### Construire un socle défensif efficace

- **Diversification contre les chocs boursiers :** les obligations souveraines de haute qualité (notées AA à AAA) progressent souvent en période de récession lorsque les banques centrales abaissent leurs taux directeurs afin de soutenir l'activité économique et le crédit ;
- **Échelle obligataire (*bond ladder*) :** répartir votre capital à parts égales sur des échéances annuelles échelonnées de un à cinq ans vous garantit des remboursements réguliers au pair, prêts à être réinvestis aux nouveaux taux sans jamais devoir vendre à perte sur le marché secondaire.

### Pièges courants et cadre fiscal

1. **Confondre rendement courant et YTM :** diviser le coupon annuel par le prix du jour (`40 / 922,05 = 4,34 %`) ignore le gain ou la perte mécanique à l'échéance ; comparez systématiquement les obligations sur la base de leur **YTM** complet.
2. **Oublier le coupon couru :** entre deux versements d'intérêts, l'acheteur indemnise le vendeur pour la fraction de coupon accumulée depuis la dernière date de détachement (*prix sale* égal au prix coté pied de coupon majoré du coupon couru).
3. **Sous-estimer le risque de défaut et l'inflation :** un YTM élevé sur une dette d'entreprise spéculative (*High Yield*) rémunère une probabilité réelle de défaillance de l'émetteur ; par ailleurs, si l'inflation dépasse votre YTM net, votre pouvoir d'achat recule chaque année.
4. **Négliger les clauses de rappel (*callable*) et la fiscalité :** certains émetteurs conservent le droit de rembourser l'emprunt par anticipation lorsque les taux baissent, plafonnant votre gain potentiel. En France, les obligations directes (inéligibles au PEA) supportent par défaut le PFU de 30 % en Compte-Titres Ordinaire, tandis que l'assurance-vie permet de différer l'imposition jusqu'aux rachats.
