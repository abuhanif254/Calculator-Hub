---
title: "Calculateur RMD (Distribution Minimale Requise)"
metaTitle: "Calculateur RMD : Distribution Minimale Retraite (IRS/FERR)"
description: "Calculez votre distribution minimale requise (RMD) sur vos comptes de retraite américains (401k, IRA) ou le retrait minimal d'un FERR canadien."
metaDescription: "Estimez votre retrait annuel obligatoire (RMD) selon les tables IRS SECURE Act 2.0 (73 à 75 ans) et comparez avec le retrait minimal d'un FERR canadien."
metaKeywords: "calculateur RMD, distribution minimale requise, retrait obligatoire IRA 401k, table IRS Uniform Lifetime, SECURE Act 2.0 age 73, retrait minimal FERR"
faqs:
  - question: "À quel âge débute la distribution minimale requise (RMD) avec la loi SECURE Act 2.0 ?"
    answer: "Depuis l'entrée en vigueur de la loi SECURE Act 2.0 aux États-Unis, l'âge de déclenchement du RMD est fixé à 73 ans pour les épargnants nés entre 1951 et 1959. Pour toute personne née en 1960 ou après, l'âge légal du premier retrait obligatoire est repoussé à 75 ans (applicable à compter de 2033). Au Canada, la conversion d'un REER en FERR reste obligatoire avant la fin de l'année du 71e anniversaire, avec un premier retrait minimal à 72 ans."
  - question: "Les comptes Roth IRA et Roth 401(k) sont-ils soumis aux retraits obligatoires RMD ?"
    answer: "Non. Les comptes Roth IRA ont toujours été exonérés de RMD du vivant de leur titulaire d'origine, car les cotisations y ont été versées après impôt. De plus, depuis l'année fiscale 2024, la loi SECURE Act 2.0 a aligné le régime des comptes Roth 401(k) et Roth 403(b) d'entreprise sur celui des Roth IRA : ils ne subissent plus aucun RMD du vivant du souscripteur."
  - question: "Quelle est la pénalité de l'IRS si j'oublie d'effectuer mon retrait RMD avant le 31 décembre ?"
    answer: "La loi SECURE Act 2.0 a réduit la taxe d'accise punitive qui s'élevait historiquement à 50 % de l'insuffisance de retrait. Désormais, la pénalité standard est de 25 % du montant qui aurait dû être retiré. Elle est abaissée à 10 % si vous retirez le solde manquant et déposez une déclaration rectificative (formulaire IRS 5329) dans la fenêtre de correction de deux ans."
  - question: "Puis-je regrouper les RMD de plusieurs comptes de retraite et tout retirer d'un seul compte ?"
    answer: "Cela dépend de la nature juridique du compte. Si vous détenez plusieurs comptes Traditional IRA (ou SEP IRA / SIMPLE IRA), vous devez calculer le RMD de chacun séparément, mais vous avez le droit d'additionner ces montants et de prélever la somme totale sur un seul de vos IRA. En revanche, cette mutualisation est interdite pour les plans 401(k) : chaque 401(k) doit faire l'objet d'un retrait distinct."
  - question: "Comment sont imposés les retraits RMD pour un résident fiscal français ou européen ?"
    answer: "En vertu des conventions fiscales bilatérales (notamment l'article 18 de la convention fiscale franco-américaine), les distributions de pensions privées américaines (IRA, 401k) perçues par un résident fiscal français sont généralement imposables aux États-Unis (avec crédit d'impôt imputable en France pour éviter la double imposition), selon la nationalité du bénéficiaire. Un suivi fiscal transfrontalier est indispensable avant le premier décaissement."
---

Les comptes d'épargne-retraite à fiscalité différée — tels que les plans américains **Traditional IRA**, **401(k)**, **403(b)** ou le **Fonds enregistré de revenu de retraite (FERR)** issu d'un REER au Canada — permettent de déduire les cotisations du revenu imposable et de capitaliser les gains à l'abri de l'impôt pendant toute la vie active. En contrepartie, l'administration fiscale impose, à partir d'un âge légal, un décaissement annuel plancher appelé **Distribution Minimale Requise** (*Required Minimum Distribution* ou **RMD**). Ce calculateur détermine votre retrait obligatoire exact selon les tables actuarielles en vigueur.

## Qu'est-ce que la distribution minimale requise (RMD) et qui est concerné ?

Le mécanisme du RMD empêche que les enveloppes de retraite à impôt différé ne servent d'outil de transmission successorale indéfiniment défiscalisé. Dès que le titulaire atteint l'âge seuil fixé par la loi **SECURE Act 2.0**, il doit retirer chaque année une fraction minimale de son épargne, laquelle s'ajoute à son revenu imposable ordinaire de l'année.

Les seuils d'âge applicables aux comptes américains (IRA, 401(k), 403(b), 457(b), SEP IRA) dépendent de votre année de naissance :
* **Nés en 1950 ou avant :** Le RMD a déjà débuté (à 70½ ans ou 72 ans selon les anciennes lois).
* **Nés entre 1951 et 1959 :** L'obligation de retrait débute à **73 ans** (régime en vigueur de 2023 à 2032).
* **Nés en 1960 ou après :** L'âge de déclenchement est repoussé à **75 ans** (à partir du 1er janvier 2033).

**Exception d'emploi (*Still-Working Exception*) :** Si vous êtes toujours salarié à 73 ans et que vous ne détenez pas plus de $5\,\%$ du capital de l'entreprise qui vous emploie, vous pouvez différer les RMD sur le plan **401(k) de cet employeur actuel** jusqu'à votre départ effectif à la retraite. Cette dispense ne s'applique jamais aux comptes Traditional IRA ni aux 401(k) d'anciens employeurs.

## Formule officielle de calcul du RMD selon les tables actuarielles de l'IRS

Pour chaque année civile $N$ soumise à obligation, le montant minimal à décaisser avant le 31 décembre s'obtient en divisant la valeur liquidative du compte à la clôture de l'année précédente par un coefficient d'espérance de vie :

$$\text{RMD}_{\text{annuel}} = \frac{S_{31/12/N-1}}{F_{\text{âge}}}$$

**Définition des paramètres :**
* $S_{31/12/N-1}$ : Solde exact du compte de retraite arrêté au **31 décembre de l'année civile précédente** ($N-1$).
* $F_{\text{âge}}$ : Facteur de période de distribution (*Distribution Period*) attribué par l'Internal Revenue Service (IRS) dans la publication 590-B selon l'âge que le titulaire atteint au cours de l'année $N$.

L'IRS distingue trois tables actuarielles selon votre situation familiale :
1. **Table III (*Uniform Lifetime Table*) :** C'est la table universelle utilisée par défaut par tous les retraités célibataires, ainsi que par les retraités mariés dont le conjoint a moins de 10 ans d'écart d'âge.
2. **Table II (*Joint and Last Survivor Table*) :** Elle s'applique exclusivement si votre conjoint est l'**unique bénéficiaire primaire** du compte pendant toute l'année civile **et** qu'il est **plus jeune que vous de plus de 10 ans**. L'espérance de vie conjointe étant plus longue, le diviseur $F_{\text{âge}}$ est nettement plus élevé, ce qui réduit votre retrait obligatoire imposable.
3. **Table I (*Single Life Expectancy*) :** Réservée aux bénéficiaires de comptes hérités (*Inherited IRA*) soumis au retrait annuel.

## Exemple chiffré pas à pas : calcul du retrait obligatoire à 73 ans

Prenons le cas de Marc, ancien cadre ayant cotisé aux États-Unis, qui célèbre son **73e anniversaire** en 2026. Son compte *Traditional IRA* affichait une valeur de clôture de **$450\,000\text{ \$}$** au 31 décembre 2025 ($S_{31/12/2025}$).

### Cas 1 : Épouse du même âge (application de la Table III standard)
* Dans la Table III de l'IRS, le facteur de période de distribution correspondant à l'âge de **73 ans** est de **$F_{73} = 26{,}5$**.
* Application de la formule :
  $$\text{RMD}_{2026} = \frac{450\,000\text{ \$}}{26{,}5} = \mathbf{16\,981{,}13\text{ \$}}$$
* En pourcentage du portefeuille, Marc doit retirer au minimum $\frac{1}{26{,}5} = \mathbf{3{,}7736\,\%}$ de son capital avant la date limite.

### Cas 2 : Épouse unique bénéficiaire âgée de 58 ans (15 ans de moins — Table II)
* L'écart d'âge dépassant 10 ans, Marc relève de la Table II (*Joint Life*). À l'intersection de 73 ans (titulaire) et 58 ans (conjoint), le facteur grimpe à **$30{,}6$**.
* Nouveau calcul du RMD :
  $$\text{RMD}_{2026} = \frac{450\,000\text{ \$}}{30{,}6} = \mathbf{14\,705{,}88\text{ \$}}$$
* L'application de la Table II lui permet de laisser **$2\,275{,}25\text{ \$}$** supplémentaires fructifier à l'abri de l'impôt au sein de son IRA.

## Barème de référence : Table III de l'IRS et comparaison avec le FERR canadien

Le tableau ci-dessous récapitule les facteurs officiels de la **Table III de l'IRS** (*Uniform Lifetime Table*), le pourcentage équivalent, le retrait requis pour un portefeuille de **$500\,000\text{ \$}$**, ainsi que la comparaison directe avec le taux minimal réglementaire d'un **FERR au Canada** au même âge :

| Âge atteint dans l'année | Facteur IRS (Table III) | Taux RMD implicite (%) | RMD annuel pour 500 000 $ | Équivalent FERR (Canada) |
| :--- | :--- | :--- | :--- | :--- |
| **73 ans** | 26,5 | 3,77 % | 18 868 $ | 5,53 % (27 650 $) |
| **74 ans** | 25,5 | 3,92 % | 19 608 $ | 5,67 % (28 350 $) |
| **75 ans** | 24,6 | 4,07 % | 20 325 $ | 5,82 % (29 100 $) |
| **76 ans** | 23,7 | 4,22 % | 21 097 $ | 5,98 % (29 900 $) |
| **78 ans** | 22,0 | 4,55 % | 22 727 $ | 6,36 % (31 800 $) |
| **80 ans** | 20,2 | 4,95 % | 24 752 $ | 6,82 % (34 100 $) |
| **85 ans** | 16,0 | 6,25 % | 31 250 $ | 8,51 % (42 550 $) |
| **90 ans** | 12,2 | 8,20 % | 40 984 $ | 11,92 % (59 600 $) |

## Pièges fiscaux et stratégies de réduction de la facture RMD

* **Le piège du double retrait la première année (report au 1er avril) :** Pour votre toute première année de RMD (à 73 ans), l'IRS vous accorde un délai de grâce jusqu'au **1er avril de l'année suivante** pour effectuer le retrait. Toutefois, si vous utilisez ce report, vous devrez encaisser **deux RMD au cours de la même année fiscale** (celui de vos 73 ans avant le 1er avril, puis celui de vos 74 ans avant le 31 décembre). Ce cumul gonfle artificiellement votre revenu annuel et peut vous faire basculer dans une tranche marginale d'imposition supérieure.
* **Conversions partielles vers un Roth IRA avant 73 ans (*Roth Conversion Ladder*) :** Entre la date de cessation d'activité (par exemple à 62 ou 65 ans) et l'âge de 73 ans, vos revenus imposables sont souvent plus bas. Convertir chaque année une fraction de votre Traditional IRA vers un Roth IRA permet de payer l'impôt dans une tranche modérée et de réduire définitivement l'assiette future soumise aux RMD.
* **Distribution caritative qualifiée (*Qualified Charitable Distribution — QCD*) :** À partir de 70½ ans, un titulaire d'IRA peut transférer directement jusqu'à $105\,000\text{ \$}$ par an (montant indexé sur l'inflation) de son IRA vers un organisme caritatif agréé : ce don satisfait l'obligation de RMD à due concurrence sans jamais être intégré au revenu brut ajusté (*AGI*) imposable.
