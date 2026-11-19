---
title: "Calculateur HELOC (Marge de Crédit Hypothécaire)"
metaTitle: "Calculateur HELOC : Marge de Crédit Hypothécaire et Tirage"
description: "Calculez votre plafond de Marge de Crédit Hypothécaire (HELOC) ainsi que vos mensualités pendant la période de tirage et la phase de remboursement."
metaDescription: "Simulez votre Marge de Crédit Hypothécaire (HELOC) : calculez votre capacité d'emprunt maximale, vos intérêts en période de tirage et vos mensualités."
metaKeywords: "calculateur HELOC, marge de crédit hypothécaire, prêt hypothécaire rechargeable, ratio prêt-valeur RPV, période de tirage HELOC, crédit hypothécaire mobilisable, valeur nette immobilière"
faqs:
  - question: "Qu'est-ce qu'une marge de crédit hypothécaire (HELOC) et quel est son équivalent en Europe ?"
    answer: "Une HELOC (Home Equity Line of Credit), appelée officiellement Marge de crédit hypothécaire au Canada, est une ligne de crédit renouvelable garantie par la valeur nette de votre bien immobilier. En France, en Belgique et en Suisse, ce mécanisme correspond au prêt hypothécaire rechargeable, à l'ouverture de crédit hypothécaire ou à la mobilisation d'une cédule hypothécaire existante."
  - question: "Quel est le montant maximal que l'on peut emprunter via une HELOC ?"
    answer: "Le plafond dépend du Ratio Prêt-Valeur (RPV ou quotité hypothécaire) autorisé par la réglementation. Au Canada (règles du BSIF), l'endettement total combiné (prêt hypothécaire principal + marge) ne peut excéder 80 % de la valeur marchande du bien, et la portion purement renouvelable est plafonnée à 65 %. En France et en Belgique, les banques limitent généralement la quotité d'un crédit hypothécaire de trésorerie entre 50 % et 70 % de la valeur vénale expertisée."
  - question: "Pourquoi la mensualité augmente-t-elle brusquement après la période de tirage ?"
    answer: "Durant la période de tirage (souvent 5 à 10 ans), l'emprunteur n'est tenu de payer que les intérêts mensuels sur les sommes utilisées. Dès l'ouverture de la période de remboursement (10 à 20 ans), la ligne est gelée et la mensualité intègre à la fois les intérêts et l'amortissement du capital, provoquant un saut de mensualité de 50 % à 80 % appelé choc de paiement."
  - question: "Comment le taux d'intérêt variable d'une marge hypothécaire est-il déterminé ?"
    answer: "Le taux d'une HELOC est presque toujours variable et indexé sur le taux directeur de la banque centrale : au Canada et aux États-Unis, il correspond au taux préférentiel de la banque majoré d'une marge (ex. Taux préférentiel + 0,50 %) ; en zone euro et en Suisse, il s'appuie sur l'Euribor 3 mois ou le SARON majoré d'une marge bancaire contractuelle."
  - question: "Peut-on rembourser le capital d'une HELOC par anticipation sans pénalité ?"
    answer: "Oui, c'est l'avantage majeur d'une marge de crédit hypothécaire ouverte par rapport à un prêt hypothécaire fermé : vous pouvez rembourser tout ou partie du capital emprunté à n'importe quel moment sans aucune indemnité de remboursement anticipé (IRA), et les fonds remboursés redeviennent immédiatement disponibles tant que la période de tirage est active."
---

Lorsqu'un propriétaire rembourse progressivement son emprunt immobilier ou que la valeur de marché de sa résidence progresse, il accumule une richesse immobilisée appelée **valeur nette immobilière** (*home equity*). La **Marge de Crédit Hypothécaire (HELOC)** — ou **crédit hypothécaire rechargeable** en Europe francophone — transforme cette valeur nette en une réserve de trésorerie souple et réutilisable, facturée à un taux nettement inférieur à celui d'un prêt personnel non garanti.

Ce calculateur HELOC détermine votre **plafond d'emprunt disponible** selon le ratio prêt-valeur de votre juridiction, puis distingue vos paiements mensuels entre la **période de tirage** (intérêts seuls) et la **période d'amortissement** (capital et intérêts).

## Fonctionnement en Deux Phases : Tirage Souple puis Amortissement

Contrairement à un prêt immobilier classique où l'intégralité des fonds est débloquée chez le notaire et amortie dès le premier mois, un contrat HELOC se divise en deux périodes contractuelles :

### 1. La période de tirage (*Draw Period*, généralement 5 à 10 ans)
Vous disposez d'un plafond de crédit autorisé dans lequel vous puisez librement au fur et à mesure de vos besoins (rénovation énergétique, extension de maison, financement d'études, apport pour un investissement locatif).
- **Intérêts uniquement sur les sommes tirées** : si votre plafond autorisé est de $140\,000\text{ \$/€}$ mais que vous n'utilisez que $30\,000\text{ \$/€}$, les intérêts ne courent que sur $30\,000\text{ \$/€}$.
- **Paiement minimal réduit** : la banque n'exige chaque mois que le règlement des intérêts courus. Tout remboursement de capital est libre et reconstitue immédiatement votre crédit disponible.

### 2. La période de remboursement (*Repayment Period*, généralement 10 à 20 ans)
À l'échéance de la période de tirage, la possibilité d'effectuer de nouveaux retraits s'arrête. Le solde utilisé bascule en prêt amortissable : vous remboursez chaque mois une fraction du capital en plus des intérêts, ce qui entraîne une hausse mécanique importante de la mensualité.

## Formules Mathématiques : Capacité d'Emprunt et Mensualités

### 1. Calcul du plafond disponible de la marge ($L_{max}$)
Les autorités bancaires plafonnent l'endettement garanti par un bien immobilier via le **Ratio Prêt-Valeur maximal ($RPV_{max}$)** ($80\text{ \%}$ de la valeur marchande au Canada pour un crédit combiné avec portion renouvelable plafonnée à $65\text{ \%}$, et généralement entre $50\text{ \%}$ et $70\text{ \%}$ de la valeur vénale en France, Belgique et Suisse) :

$$L_{max} = (V_{bien} \times RPV_{max}) - CRD_{hypo}$$

Où $V_{bien}$ désigne la **valeur vénale actuelle** de la propriété, $RPV_{max}$ la **quotité hypothécaire maximale** autorisée (ex. $0,80$) et $CRD_{hypo}$ le **capital restant dû** sur le prêt immobilier principal.

### 2. Mensualités en phase de tirage ($M_{tirage}$) et de remboursement ($M_{remb}$)
Pour un encours tiré $E$, un taux nominal annuel $T$ (taux mensuel $t_m = T / 12$) et $n$ mois d'amortissement ($n = \text{années} \times 12$) :

$$M_{tirage} = E \times t_m \qquad \text{et} \qquad M_{remb} = E \times \frac{t_m}{1 - (1 + t_m)^{-n}}$$

## Exemple Chiffré Pas à Pas : Mobilisation de 80 000 $ / €

Un propriétaire détient une résidence évaluée à **$500\,000\text{ \$}$ (ou $500\,000\text{ €}$)** avec un solde hypothécaire principal ($CRD_{hypo}$) de **$260\,000\text{ \$/€}$**. La banque autorise un Ratio Prêt-Valeur combiné de **$80\text{ \%}$** au taux annuel de **$6,00\text{ \%}$** ($t_m = 0,06 / 12 = 0,005$).

1. **Plafond d'emprunt disponible ($L_{max}$)** :
   $$L_{max} = (500\,000 \times 0,80) - 260\,000 = 400\,000 - 260\,000 = \mathbf{140\,000\text{ \$/€}}$$
   *(Ce montant de $140\,000\text{ \$}$ représente $28\text{ \%}$ de la valeur du bien, respectant le plafond fédéral canadien du BSIF qui limite la portion purement renouvelable à $65\text{ \%}$).*
2. **Phase 1 — Période de tirage de 10 ans (120 mois) pour un tirage de $80\,000\text{ \$/€}$** :
   Le propriétaire utilise **$80\,000\text{ \$/€}$** pour des travaux de rénovation énergétique :
   $$M_{tirage} = 80\,000 \times 0,005 = \mathbf{400,00\text{ \$/€ par mois}}$$
   S'il ne rembourse aucun capital pendant 10 ans, il verse $120 \times 400 = 48\,000\text{ \$/€}$ d'intérêts et doit toujours $80\,000\text{ \$/€}$ de capital au début de la 11e année.
3. **Phase 2 — Période de remboursement de 15 ans (180 mois)** :
   À la fin de la 10e année, les $80\,000\text{ \$/€}$ s'amortissent sur $180\text{ mois}$ :
   $$M_{remb} = 80\,000 \times \frac{0,005}{1 - (1,005)^{-180}} = \frac{400}{0,592518} = \mathbf{675,09\text{ \$/€ par mois}}$$
   La bascule provoque un **choc de paiement de $+275,09\text{ \$/€}$ par mois ($+68,8\text{ \%}$)**, et les intérêts de cette seconde phase totalisent $(180 \times 675,09) - 80\,000 = 41\,516,20\text{ \$/€}$.

## Tableau Comparatif : Stratégies de Remboursement (Tirage de 80 000 $ / €)

| Stratégie sur la Marge | Taux Annuel | Mensualité Tirage (10 ans) | Mensualité Amort. (15 ans) | Hausse à la Bascule | Intérêts Totaux |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Intérêts seuls 10 ans + Amort. 15 ans** | 6,00 % | 400,00 $ / € | 675,09 $ / € | +68,8 % | 89 516,20 $ / € |
| **Choc de taux (+150 pdb)** | 7,50 % | 500,00 $ / € | 741,61 $ / € | +48,3 % | 113 489,80 $ / € |
| **Remboursement de 30 000 $ en phase 1** | 6,00 % | 400,00 $ / € | 421,93 $ / € | +68,8 % | 64 947,40 $ / € |
| **Conversion immédiate en prêt fixe 15 ans** | 5,25 % | — (amort. direct) | 643,10 $ / € | 0,0 % | 35 758,00 $ / € |

## Stratégies de Prudence et Pièges à Éviter

- **Verrouillez vos gros tirages dans une tranche à taux fixe** : la plupart des crédits hypothécaires combinés permettent de convertir une somme tirée en une **tranche hypothécaire amortissable à taux fixe**. Sur $80\,000\text{ \$/€}$ de travaux, cette conversion économise plus de $50\,000\text{ \$/€}$ d'intérêts par rapport à 10 ans de paiement d'intérêts seuls.
- **Anticipez les frais d'acte notarié et d'expertise** : l'inscription d'une garantie hypothécaire engendre des frais d'évaluation immobilière ($300$ à $800\text{ \$/€}$), des honoraires de notaire et des frais d'enregistrement.
- **Ne financez jamais des biens de consommation courante avec votre logement** : votre résidence servant de garantie réelle, un défaut de paiement lors d'une hausse des taux variables vous expose à une saisie immobilière.
