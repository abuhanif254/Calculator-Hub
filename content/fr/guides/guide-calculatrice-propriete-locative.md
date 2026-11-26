---
title: "Les Mathématiques de l'Immobilier : Comment Analyser un Bien"
description: "Évaluez la rentabilité d'un investissement immobilier étape par étape : résultat net d'exploitation (NOI), taux de capitalisation, cash-flow, rendement sur fonds propres (Cash-on-Cash) et ratio DSCR."
category: "Finance"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "rental-property-calculator"
relatedType: "calculator"
faqs:
  - question: "Pourquoi le résultat net d'exploitation (NOI) exclut-il la mensualité du crédit ?"
    answer: "Le résultat net d'exploitation (NOI pour Net Operating Income) mesure la performance intrinsèque du bien immobilier indépendamment de son mode de financement. Exclure le remboursement du capital et des intérêts permet de comparer objectivement deux biens via leur taux de capitalisation (NOI / Prix d'achat), qu'ils soient financés au comptant ou à 80 % par emprunt."
  - question: "Quelle différence existe-t-il entre le taux de capitalisation (Cap Rate) et le rendement Cash-on-Cash ?"
    answer: "Le taux de capitalisation rapporte le NOI annuel au prix d'acquisition total du bien, ce qui correspond au rendement net d'un achat sans emprunt. Le rendement Cash-on-Cash divise le cash-flow annuel avant impôt (NOI moins service annuel de la dette) par la trésorerie réellement mobilisée de votre poche (apport personnel, frais de notaire et travaux initiaux)."
  - question: "La règle empirique des 1 % reste-t-elle pertinente avec des taux de crédit autour de 3,5 % à 4 % ?"
    answer: "La règle des 1 % (loyer mensuel égal à au moins 1 % du prix d'achat, soit 12 % brut annuel) constitue un filtre de tri rapide très sévère en Europe occidentale. Avec des taux de prêt immobilier entre 3,2 % et 3,8 % sur 20 à 25 ans, un rendement brut de 7,5 % à 9 % peut déjà atteindre l'autofinancement selon la taxe foncière et les charges de copropriété, rendant indispensable un calcul complet du NOI et du DSCR."
  - question: "Quelles charges faut-il intégrer dans les dépenses d'exploitation locative ?"
    answer: "Intégrez systématiquement la taxe foncière, l'assurance propriétaire non occupant (PNO), la garantie loyers impayés (GLI), la quote-part non récupérable des charges de copropriété, les frais de gestion locative (6 % à 9 % TTC), la vacance locative et une provision annuelle pour entretien et gros travaux (CapEx : toiture, chaudière, ravalement). Excluez en revanche la mensualité bancaire et l'amortissement comptable."
  - question: "Quel ratio de couverture de la dette (DSCR) exigent les banques pour financer un bien locatif ?"
    answer: "Les banques commerciales et les prêteurs spécialisés recherchent généralement un DSCR (NOI / Annuité de dette) compris entre 1,15 et 1,25, ce qui garantit que les loyers nets de charges couvrent 115 % à 125 % des échéances d'emprunt. En France, le HCSF plafonne également le taux d'endettement global du foyer emprunteur à 35 % assurance incluse, avec une prise en compte pondérée des loyers futurs (souvent 70 %)."
---

Analyser un investissement locatif avec rigueur exige d'écarter les promesses de plus-value pour auditer quatre indicateurs séquentiels : le **revenu locatif effectif (`EGI`)**, le **résultat net d'exploitation (`NOI`)**, le **service annuel de la dette (`ADS`)** et le **rendement sur fonds propres (`Cash-on-Cash`)**. Un bien sain protège votre trésorerie dès le premier mois tout en laissant le locataire rembourser le capital.

Les raccourcis comme la « règle des 1 % » ou la règle des `50 %` de charges ne servent qu'à filtrer des annonces ; toute offre demande un chiffrage complet des frais d'acte, de la vacance, de la taxe foncière et des travaux. Testez vos hypothèses dans notre [Calculatrice de Bien Locatif](/fr/calculatrices/calculateur-propriete-locative).

## Formules fondamentales de l'analyse locative

Ces équations normalisées séparent la rentabilité propre de l'immeuble de l'effet de levier bancaire :

```text
Loyer brut annuel (GSR)       = Loyer mensuel hors charges × 12
Revenu effectif (EGI)         = GSR × (1 − Taux de vacance) + Autres revenus
Résultat net (NOI)            = EGI − Charges d'exploitation (OpEx)
Taux de capitalisation        = (NOI / Prix d'acquisition) × 100 %
Service annuel dette (ADS)    = Mensualité de prêt (capital + intérêts) × 12
Cash-flow avant impôt (CF)    = NOI − ADS
Ratio de couverture (DSCR)    = NOI / ADS
Trésorerie investie           = Apport personnel + Frais d'acte + Travaux initiaux
Rendement Cash-on-Cash (CoC)  = (CF / Trésorerie investie) × 100 %
```

- **`Taux de vacance`** : provision pour rotation des locataires (`3 %` à `5 %` en zone tendue, `6 %` à `10 %` en zone détendue).
- **`OpEx`** : taxe foncière, assurance PNO/GLI, copropriété non récupérable, gestion (`6 %` à `8 %`), entretien et réserve `CapEx` (`5 %` à `10 %` pour toiture, chaudière ou façade).
- **`Trésorerie investie`** : total décaissé au démarrage, incluant les frais de notaire (`7,5 %` à `8,5 %` dans l'ancien) et les travaux.

## Exemple chiffré : colocation T3 de `180 000 €`

Étudions un T3 acheté `180 000 €` hors frais en colocation meublée. Vous versez `20 %` d'apport (`36 000 €`), `14 400 €` de frais de notaire (`8 %`) et `9 600 €` de travaux et mobilier, soit **`60 000 €` investis**. Le prêt de `144 000 €` court sur `20 ans` (`240 mois`) à `3,50 %` l'an.

1. **Revenu effectif (`EGI`)** : `1 450 €/mois` génèrent `17 400 €/an` bruts. Avec `5 %` de vacance (`870 €`), `EGI = 16 530 €`.
2. **Charges (`OpEx`)** : taxe foncière (`1 250 €`), PNO/GLI (`550 €`), copropriété non récupérable (`750 €`), gestion à `6 %` (`991,80 €`) et réserve entretien/`CapEx` (`988,20 €`), soit **`4 530 €`** (`27,4 %` de l'EGI).
3. **Résultat net (`NOI`)** : `16 530 € − 4 530 € = 12 000 €`. Le taux de capitalisation atteint `6,67 %` (pour `9,67 %` brut).
4. **Dette (`ADS`)** : au taux mensuel `0,035 / 12`, l'échéance vaut `835,14 €/mois`, soit `ADS = 10 021,70 €/an`.
5. **Cash-flow et `CoC`** : `CF = 12 000 € − 10 021,70 € = +1 978,30 €/an` (**`+164,86 €/mois`**), soit **`3,30 %` Cash-on-Cash** et un **`DSCR = 1,20`**. S'y ajoutent environ `5 060 €` de capital amorti dès l'année 1.

## Comparatif de 6 stratégies locatives (`20 %` d'apport + `8 %` de frais)

| Profil d'investissement | Prix | Cash investi | Loyer/mois | Brut | NOI/an | Cash-flow/mois | CoC | DSCR |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Studio patrimonial (Paris) | 260 000 € | 78 000 € | 1 020 € | 4,71 % | 8 673 € | −484 € | −7,44 % | 0,60 |
| T2 équilibré (Bordeaux, 25 ans) | 190 000 € | 62 000 € | 1 050 € | 6,63 % | 8 496 € | −53 € | −1,02 % | 0,93 |
| Studio meublé (Nantes, 25 ans) | 135 000 € | 44 000 € | 860 € | 7,64 % | 6 854 € | +30 € | +0,83 % | 1,06 |
| Colocation T3 (Lille, 20 ans) | 180 000 € | 60 000 € | 1 450 € | 9,67 % | 12 000 € | +165 € | +3,30 % | 1,20 |
| Immeuble 4 lots (ville moyenne) | 320 000 € | 114 000 € | 2 900 € | 10,88 % | 23 460 € | +457 € | +4,81 % | 1,31 |
| T3 rendement (Saint-Étienne) | 110 000 € | 42 000 € | 1 050 € | 11,45 % | 8 294 € | +176 € | +5,04 % | 1,34 |

Ce comparatif illustre le compromis entre valorisation et trésorerie : un studio parisien à `DSCR = 0,60` requiert un effort d'épargne mensuel de `484 €`, tandis qu'une colocation ou un immeuble de rapport franchit le seuil bancaire `DSCR ≥ 1,20` avec cash-flow positif. En pratique, viser un rendement brut supérieur à `8,5 %` hors grandes métropoles sécurise l'autofinancement dès la première année d'exploitation.

## Erreurs de chiffrage et cadre réglementaire

1. **Calculer sur le prix vendeur seul** : omettre frais de notaire (`8 %`), frais de dossier bancaire, travaux initiaux et assurance emprunteur gonfle artificiellement le rendement de `1` à `1,5` point.
2. **Oublier `CapEx` et DPE** : la loi Climat et Résilience interdit la location des logements classés G depuis 2025 (et F en 2028) ; chiffrez l'isolation thermique et les travaux de copropriété votés avant de signer le compromis.
3. **Négliger le régime fiscal** : en location nue, tranche marginale plus `17,2 %` de prélèvements sociaux pèsent fortement sur le cash-flow, alors que le `LMNP` au réel ou la `SCI` à l'IS amortissent le bâti et les meubles.
4. **Ignorer les règles HCSF** : la durée d'emprunt est plafonnée à `25 ans` (ou `27 ans` avec travaux lourds ou VEFA) et l'endettement du foyer à `35 %` assurance incluse. Un `DSCR ≥ 1,20` facilite nettement l'accord bancaire et le financement des opérations suivantes.
