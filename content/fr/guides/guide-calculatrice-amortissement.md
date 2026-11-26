---
title: "Comprendre l'Amortissement : Comment les Actifs Perdent de la Valeur"
description: "Maîtrisez les méthodes d'amortissement linéaire, dégressif fiscal, dégressif double (DDB) et arithmétique (SYD), calculez les dotations annuelles et optimisez la fiscalité de vos actifs professionnels."
category: "Finance"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "depreciation-calculator"
relatedType: "calculator"
faqs:
  - question: "Quelle est la différence principale entre l'amortissement linéaire et l'amortissement dégressif ?"
    answer: "L'amortissement linéaire répartit de manière égale la base amortissable (coût d'acquisition moins valeur résiduelle) sur chaque année d'utilisation. L'amortissement dégressif applique un taux majoré à la valeur nette comptable restante en début d'exercice, concentrant d'importantes dotations déductibles dès les premières années tout en conservant le même amortissement cumulé total à l'échéance."
  - question: "Peut-on amortir un terrain en comptabilité d'entreprise ou en investissement locatif ?"
    answer: "Non. Ni le Plan Comptable Général (PCG) français ni les normes IFRS ou US GAAP n'autorisent l'amortissement d'un terrain nu, car sa durée de vie est réputée illimitée. Lors de l'achat d'un bien immobilier professionnel ou d'un bien loué en LMNP au réel, vous devez ventiler le prix total entre la quote-part foncière (non amortissable, souvent 15 % à 25 % hors Paris) et la construction (amortissable sur 25 à 40 ans)."
  - question: "Comment fonctionnent les coefficients de l'amortissement dégressif fiscal en France ?"
    answer: "L'article 39 A du Code général des impôts (CGI) réserve l'amortissement dégressif fiscal à certains biens neufs d'équipement industriel, matériel de bureau ou outillage d'une durée d'au moins 3 ans. Le taux linéaire est multiplié par 1,25 pour une durée de 3 à 4 ans, 1,75 pour 5 à 6 ans, et 2,25 au-delà de 6 ans ; dès que l'annuité linéaire sur les années restantes dépasse l'annuité dégressive, l'entreprise bascule automatiquement sur le linéaire."
  - question: "Que se passe-t-il lorsque l'on revend un actif amorti au-dessus de sa valeur nette comptable ?"
    answer: "La cession d'une immobilisation au-delà de sa valeur nette comptable (VNC) génère une plus-value professionnelle égale au prix de cession diminué de la VNC. En fiscalité française des BIC, la fraction correspondant aux amortissements antérieurement déduits est en principe qualifiée de plus-value à court terme, imposée comme un bénéfice courant, tandis que l'excédent au-dessus du prix d'achat initial relève du long terme."
  - question: "Quand faut-il privilégier l'amortissement par unités d'œuvre (unités de production) ?"
    answer: "La méthode des unités d'œuvre est exigée ou recommandée lorsque la perte de valeur économique d'un équipement dépend directement de son intensité d'usage plutôt que du simple passage du temps : véhicules utilitaires mesurés en kilomètres parcourus, machines-outils mesurées en heures d'usinage, ou presses industrielles mesurées en pièces produites."
---

L'**amortissement comptable** constate la dépréciation irréversible d'une immobilisation due à l'usure, à l'obsolescence ou au temps. Pour un particulier, la décote d'un véhicule constitue une perte patrimoniale ; pour une entreprise ou un loueur en meublé (`LMNP` au réel), la dotation annuelle forme une **charge non décaissée** qui réduit le bénéfice imposable et préserve la trésorerie.

Choisir entre **linéaire**, **dégressif accéléré** (`DDB`), **somme des chiffres des années (`SYD`)** ou **unités d'œuvre** ne change pas le total déductible sur la durée de vie, mais pilote le calendrier de vos économies d'impôt. Simulez vos tableaux annuels dans notre [Calculatrice d'Amortissement](/fr/calculatrices/calculatrice-amortissement).

## Méthodes d'amortissement et formules

Chaque plan d'amortissement combine trois paramètres : le **coût d'acquisition (`C`)**, la **valeur résiduelle (`S`)** et la **durée d'utilité (`n`)** en années ou en volume d'activité.

```text
Base amortissable               = C − S
Amortissement linéaire          = (C − S) / n
Dégressif comptable (DDB 200 %) = min(VNC_(t−1) × (Coefficient / n) ; VNC_(t−1) − S)
Somme des années (SYD)          = (C − S) × [(n − t + 1) / (n × (n + 1) / 2)]
Unités d'œuvre (année t)        = (C − S) × (Unités année t / Capacité totale)
```

- **`C` (Coût d'entrée)** : prix HT majoré des frais de livraison, installation et mise en service.
- **`S` (Valeur résiduelle)** : valeur de revente nette en fin d'usage (`0 €` en dégressif fiscal français).
- **`VNC_(t−1)`** : valeur nette comptable d'ouverture. En méthode dégressive, le taux s'applique sur `C` dès l'année `1`, puis s'arrête dès que la `VNC` rejoint `S`.
- **`Coefficient`** : `2,0` en double dégressif (`DDB 200 %`), `1,5` à `150 %`, ou en dégressif fiscal français (`CGI art. 39 A`) `1,25` (3–4 ans), `1,75` (5–6 ans) et `2,25` (> 6 ans) avec bascule linéaire finale.

## Exemple chiffré : utilitaire professionnel de `40 000 €`

Prenons un utilitaire neuf acquis `C = 40 000 € HT` le 1er janvier, exploité `n = 5 ans` avec une valeur de reprise `S = 4 000 € HT` (ou `S = 0 €` en dégressif fiscal).

1. **Linéaire** : la base vaut `40 000 € − 4 000 € = 36 000 €`, soit **`7 200,00 €/an`** constants (`20 %`) et une `VNC` finale de `4 000 €`.
2. **Double Dégressif (`DDB 200 %`, plancher `4 000 €`)** au taux `2 × 20 % = 40 %` :
   - **Année 1** : `40 000 € × 40 % = 16 000,00 €` (`VNC = 24 000 €`).
   - **Année 2** : `24 000 € × 40 % = 9 600,00 €` (`VNC = 14 400 €`).
   - **Année 3** : `14 400 € × 40 % = 5 760,00 €` (`VNC = 8 640 €`).
   - **Année 4** : `8 640 € × 40 % = 3 456,00 €` (`VNC = 5 184 €`).
   - **Année 5** : plafonnée à `5 184 € − 4 000 € = 1 184,00 €`.
3. **`SYD`** (dénominateur `5 × 6 / 2 = 15`) : déduit `5/15` de `36 000 €` soit `12 000 €` l'année 1, puis `9 600 €`, `7 200 €`, `4 800 €` et `2 400 €`.

## Comparatif des plans sur 5 ans (`40 000 € HT`)

| Exercice | Linéaire (`S = 4 000 €`) | Double Dégressif (`DDB 40 %`) | Somme des années (`SYD`) | Dégressif fiscal FR (`coeff 1,75`, `S = 0 €`) |
|---|---:|---:|---:|---:|
| Année 1 | 7 200,00 € | 16 000,00 € | 12 000,00 € | 14 000,00 € |
| Année 2 | 7 200,00 € | 9 600,00 € | 9 600,00 € | 9 100,00 € |
| Année 3 | 7 200,00 € | 5 760,00 € | 7 200,00 € | 5 915,00 € |
| Année 4 | 7 200,00 € | 3 456,00 € | 4 800,00 € | 5 492,50 € |
| Année 5 | 7 200,00 € | 1 184,00 € | 2 400,00 € | 5 492,50 € |
| **Total amorti** | **36 000,00 €** | **36 000,00 €** | **36 000,00 €** | **40 000,00 €** |
| **VNC finale** | **4 000,00 €** | **4 000,00 €** | **4 000,00 €** | **0,00 €** |

En dégressif fiscal français (`20 % × 1,75 = 35 %`), l'entreprise bascule automatiquement vers le linéaire dès l'ouverture de l'année 4 car le taux calculé sur la durée restante (`1 / 2 = 50 %`) dépasse `35 %`, amortissant les `10 985 €` résiduels en deux annuités égales de `5 492,50 €`.

## Cas d'usage et quatre erreurs à éviter

- **Linéaire** : idéal pour l'immobilier locatif `LMNP` par composants (gros œuvre sur 40 à 50 ans, toiture sur 25 ans, installations techniques sur 15 ans, mobilier sur 5 à 10 ans) et pour les jeunes sociétés encore peu imposées.
- **Dégressif accéléré** : optimal pour le matériel informatique, les engins de chantier, l'outillage neuf et les sociétés soumises à l'impôt sur les sociétés (`25 %` en France) qui souhaitent préserver leur trésorerie dès les premiers exercices.
- **Unités d'œuvre** : recommandé pour les flottes utilitaires suivies au kilomètre parcouru et les machines industrielles mesurées en heures de production.

Évitez enfin quatre pièges comptables et fiscaux fréquents :
1. **Oublier le prorata temporis** : selon le Plan Comptable Général (`PCG`), l'amortissement linéaire démarre à la date de mise en service (`base 360` ou `365 jours`), contre le 1er jour du mois d'acquisition en dégressif fiscal.
2. **Ignorer le plafond des voitures particulières** : en France, la déductibilité est plafonnée selon les émissions de CO₂ (`9 900 €`, `18 300 €`, `20 300 €` ou `30 000 €` pour les véhicules électriques), avec réintégration extra-comptable de l'excédent chaque année.
3. **Immobiliser des biens sous `500 € HT`** : les petits matériels et outillages sous ce seuil unitaire peuvent être passés directement en charges d'exploitation déductibles.
4. **Confondre comptable et fiscal** : lorsque le dégressif fiscal excède la dépréciation économique linéaire, la différence doit être enregistrée en amortissement dérogatoire au bilan.
