---
title: "Calculateur d'Impôt sur le Mariage"
metaTitle: "Calculateur d'Impôt Mariage et PACS : Gain ou Pénalité"
description: "Calculez l'impact fiscal du mariage ou du PACS sur votre impôt sur le revenu : comparez la déclaration commune et l'imposition séparée des deux conjoints."
metaDescription: "Simulez l'économie ou la pénalité d'impôt liée au mariage ou au PACS. Comparez la déclaration commune (quotient familial) et deux déclarations séparées."
metaKeywords: "calculateur impôt mariage, impôt mariage ou PACS, déclaration commune vs séparée, quotient familial couple, bonus fiscal mariage, pénalité fiscale mariage"
faqs:
  - question: "Pourquoi le mariage ou le PACS réduit-il fortement l'impôt lorsque les revenus du couple sont inégaux ?"
    answer: "Dans un barème progressif avec quotient familial (comme en France où un couple marié ou pacsé dispose de 2 parts fiscales), les revenus des deux partenaires sont additionnés puis divisés par deux avant d'être soumis aux tranches d'imposition. La fraction des revenus du conjoint le mieux rémunéré qui subissait une tranche marginale élevée (30 % ou 41 %) redescend ainsi remplir les tranches basses (0 % et 11 %) non utilisées par le conjoint au revenu plus modeste."
  - question: "Un couple dont les deux partenaires gagnent exactement le même salaire économise-t-il de l'impôt en se mariant ?"
    answer: "Non. Si les deux conjoints perçoivent exactement le même revenu imposable, la moyenne de leurs deux revenus ((R + R) / 2) est strictement égale à leur revenu individuel initial (R). Le passage à deux parts fiscales multiplie par deux l'impôt calculé sur une part, ce qui donne exactement la somme de leurs deux impôts de célibataires. Pire, pour deux salaires modestes proches du SMIC, l'addition des revenus peut parfois réduire le bénéfice de la décote fiscale."
  - question: "Peut-on opter pour une déclaration séparée l'année du mariage ou du PACS ?"
    answer: "Oui, en France (article 6-5 du Code général des impôts), uniquement au titre de l'année même de la célébration du mariage ou de l'enregistrement du PACS, les époux ou partenaires peuvent exercer une option irrévocable pour déposer deux déclarations séparées portant sur l'ensemble des revenus de l'année entière. Dès l'année suivante, l'imposition commune devient obligatoire (sauf séparation de biens sans vie commune)."
  - question: "Qu'est-ce que la pénalité fiscale du mariage (Marriage Tax Penalty) aux États-Unis ou en Suisse ?"
    answer: "Contrairement au quotient familial intégral français, certains systèmes fiscaux (comme l'impôt fédéral américain pour les hauts revenus ou l'impôt cantonal et fédéral suisse) appliquent aux couples mariés des seuils de tranches supérieures qui sont inférieurs au double des seuils d'un célibataire, ou plafonnent certaines déductions par foyer (comme le plafond SALT de 10 000 $ aux États-Unis). Deux conjoints gagnant chacun un salaire élevé paient alors plus d'impôt mariés qu'en concubinage."
  - question: "Comment répartir équitablement l'impôt commun entre les deux conjoints au quotidien ?"
    answer: "Lorsqu'un grand écart de revenus existe dans le couple, l'application du taux de prélèvement à la source commun du foyer pénalise le conjoint ayant le plus petit salaire en lui prélevant un pourcentage trop élevé. Il suffit d'activer l'option de taux individualisé sur son espace fiscal : le montant total de l'impôt du couple reste identique (avec tout le bonus du mariage), mais chaque conjoint voit son taux de prélèvement ajusté proportionnellement à son propre niveau de revenu."
---

Officialiser une union par le mariage ou le Pacte Civil de Solidarité (PACS) fusionne deux contribuables distincts en un seul **foyer fiscal**. Selon l'écart de rémunération entre les partenaires et la structure du barème progressif applicable (quotient familial en France, quotient conjugal en Belgique, barèmes conjoints aux États-Unis ou addition des revenus en Suisse), cette mise en commun modifie immédiatement la pression fiscale. Elle peut dégager un **bonus fiscal du mariage** de plusieurs milliers d'euros par an, s'avérer neutre, ou au contraire engendrer une **pénalité fiscale** par effet de seuil sur la décote, les crédits d'impôt et le patrimoine.

## Mécanisme mathématique : comment la déclaration commune modifie l'impôt progressif

Soit $R_1$ et $R_2$ les revenus nets imposables respectifs des deux partenaires (après déduction des frais réels ou de l'abattement forfaitaire de $10\text{ \%}$), et soit $f(x)$ la fonction qui calcule l'impôt progressif par tranches pour une seule part fiscale.

### 1. En concubinage ou déclaration séparée ($I_{\text{séparé}}$)
Chaque partenaire est imposé isolément sur une part ($N_1 = 1$ et $N_2 = 1$). La charge fiscale cumulée du couple est la somme des deux avis d'imposition :

$$I_{\text{séparé}} = f(R_1) + f(R_2)$$

### 2. En déclaration commune avec quotient familial ($I_{\text{commun}}$)
Dans le système français du quotient familial, un couple marié ou pacsé sans enfant bénéficie de $N = 2$ parts fiscales (plus $0,5$ part pour chacun des deux premiers enfants et $1$ part dès le troisième). Le revenu global est divisé par le nombre de parts avant application du barème progressif, puis le résultat est multiplié par $N$ :

$$Q = \frac{R_1 + R_2}{N} \quad \text{et} \quad I_{\text{commun}} = N \times f\left(\frac{R_1 + R_2}{N}\right)$$

Pour un couple sans enfant ($N = 2$), l'écart fiscal de l'union ($\Delta I$) vaut :

$$\Delta I = 2 \times f\left(\frac{R_1 + R_2}{2}\right) - \left[ f(R_1) + f(R_2) \right]$$

Du fait de la **convexité mathématique** d'un barème progressif par tranches croissantes ($0\text{ \%}$, $11\text{ \%}$, $30\text{ \%}$, $41\text{ \%}$, $45\text{ \%}$), l'impôt appliqué à la moyenne de deux revenus est toujours inférieur ou égal à la moyenne des impôts appliqués séparément :
- Si $R_1 = R_2$ (revenus égaux), $\Delta I = 0\text{ €}$ (hors effet décote).
- Si $R_1 \neq R_2$ dans des tranches différentes, $\Delta I < 0$ : le couple réalise une **économie d'impôt** proportionnelle à l'écart de revenus.

## Exemple chiffré : couple avec revenus asymétriques (65 000 € et 18 000 €)

Simulons l'impôt d'un couple sans enfant selon le barème progressif français ($0\text{ \%}$ jusqu'à $11\,497\text{ €}$ ; $11\text{ \%}$ de $11\,497\text{ €}$ à $29\,315\text{ €}$ ; $30\text{ \%}$ de $29\,315\text{ €}$ à $83\,823\text{ €}$ ; $41\text{ \%}$ de $83\,823\text{ €}$ à $180\,294\text{ €}$ ; $45\text{ \%}$ au-delà) :

- **Conjoint A** : salaire déclaré de **$65\,000\text{ €}$**, soit après abattement de $10\text{ \%}$ un revenu net imposable $R_1 = \mathbf{58\,500\text{ €}}$.
- **Conjoint B** : salaire déclaré de **$18\,000\text{ €}$**, soit après abattement de $10\text{ \%}$ un revenu net imposable $R_2 = \mathbf{16\,200\text{ €}}$.

### Étape 1 : Imposition séparée en concubinage (1 part chacun)
- **Conjoint A ($58\,500\text{ €}$, TMI à $30\text{ \%}$)** : tranche à $11\text{ \%}$ ($1\,959,98\text{ €}$) + tranche à $30\text{ \%}$ sur $29\,185\text{ €}$ ($8\,755,50\text{ €}$) = **$10\,715\text{ €}$ d'impôt**.
- **Conjoint B ($16\,200\text{ €}$, TMI à $11\text{ \%}$)** : impôt brut de $517,33\text{ €}$ sur la tranche à $11\text{ \%}$, intégralement effacé par la **décote des revenus modestes** ($655\text{ €}$) = **$0\text{ €}$ d'impôt**.
- **Total payé séparément** = **$10\,715\text{ €}$**.

### Étape 2 : Imposition commune après mariage ou PACS (2 parts)
- **Revenu imposable du foyer** : $58\,500 + 16\,200 = \mathbf{74\,700\text{ €}}$, soit un quotient familial $Q = \mathbf{37\,350\text{ €}}$ par part.
- **Impôt pour 1 part sur $37\,350\text{ €}$** : tranche à $11\text{ \%}$ ($1\,959,98\text{ €}$) + tranche à $30\text{ \%}$ sur $8\,035\text{ €}$ ($2\,410,50\text{ €}$) = $4\,370,48\text{ €}$.
- **Impôt total du couple (2 parts)** : $4\,370,48 \times 2 = \mathbf{8\,741\text{ €}}$.
- **Résultat** : l'impôt annuel baisse de $10\,715\text{ €}$ à $8\,741\text{ €}$, soit un **bonus fiscal de $1\,974\text{ €}$ par an**.

## Matrice d'impact fiscal selon la répartition des revenus nets imposables

| Profil de Couple (Revenus Nets) | Impôt Séparé (A + B) | Impôt Commun (2 parts) | Écart Annuel | Mécanisme Explicatif |
| :--- | :--- | :--- | :--- | :--- |
| **Salaires modestes égaux** ($18\,500\text{ €}$ / $18\,500\text{ €}$) | $696\text{ €}$ | **$823\text{ €}$** | **$+127\text{ €}$ (Pénalité)** | Plafond de décote couple ($1\,470\text{ €}$) inférieur à deux décotes célibataires ($1\,778\text{ €}$). |
| **Cadres à revenus égaux** ($45\,000\text{ €}$ / $45\,000\text{ €}$) | $13\,330\text{ €}$ | **$13\,330\text{ €}$** | **$0\text{ €}$ (Neutre)** | Les deux revenus saturent déjà la même tranche à $30\text{ \%}$ hors décote. |
| **Revenus asymétriques** ($58\,500\text{ €}$ / $16\,200\text{ €}$) | $10\,715\text{ €}$ | **$8\,741\text{ €}$** | **$-1\,974\text{ €}$ (Bonus)** | Transfert de revenus de la tranche à $30\text{ \%}$ vers la tranche à $11\text{ \%}$ du conjoint B. |
| **Couple mono-actif** ($70\,000\text{ €}$ / $0\text{ €}$) | $14\,165\text{ €}$ | **$7\,251\text{ €}$** | **$-6\,914\text{ €}$ (Bonus)** | Doublement complet des tranches basses à $0\text{ \%}$ et $11\text{ \%}$ sur un seul salaire. |
| **Hauts revenus inégaux** ($140\,000\text{ €}$ / $30\,000\text{ €}$) | $43\,553\text{ €}$ | **$37\,285\text{ €}$** | **$-6\,268\text{ €}$ (Bonus)** | Effacement intégral de la tranche marginale à $41\text{ \%}$ ramenée à $30\text{ \%}$. |

## Les cas où l'union civile alourdit la fiscalité

1. **L'effet de seuil de la décote sur deux petits salaires** : Le plafond de la décote d'un couple ($1\,470\text{ €}$) étant inférieur à deux décotes de célibataire ($2 \times 889\text{ €}$), deux concubins gagnant chacun autour de $1\,600\text{ €}$ net par mois peuvent payer $100\text{ €}$ à $250\text{ €}$ d'impôt en plus une fois mariés.
2. **Perte de la demi-part de parent isolé (case T)** : Un parent élevant seul un enfant perd sa demi-part fiscale supplémentaire et ses majorations d'allocations dès qu'il se marie ou se pacse.
3. **Impôt sur la Fortune Immobilière (IFI) et niches fiscales** : Le seuil d'assujettissement à l'IFI ($1\,300\,000\text{ €}$ net) et le plafond des niches fiscales ($10\,000\text{ €}$) s'apprécient par foyer fiscal et non par individu.
