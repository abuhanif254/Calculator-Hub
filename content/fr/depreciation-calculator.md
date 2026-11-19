---
title: "Calculateur d'Amortissement"
metaTitle: "Calculateur d'Amortissement : Linéaire, Dégressif et VNC"
description: "Calculez l'amortissement comptable et fiscal de vos immobilisations en mode linéaire, dégressif ou variable et générez le plan de valeur nette comptable."
metaDescription: "Simulez l'amortissement linéaire ou dégressif de vos actifs professionnels, calculez les annuités au prorata temporis et suivez la valeur nette comptable."
metaKeywords: "calculateur amortissement comptable, amortissement linéaire, amortissement dégressif, valeur nette comptable VNC, prorata temporis immobilisation, dotation aux amortissements, coefficient fiscal dégressif"
faqs:
  - question: "Quelle est la différence entre l'amortissement et la dépréciation en comptabilité française ?"
    answer: "Selon le Plan Comptable Général (PCG), l'amortissement constate la consommation irréversible des avantages économiques d'une immobilisation au fil de sa durée d'utilisation prévue. À l'inverse, une dépréciation (provision) constate une perte de valeur ponctuelle et réversible lorsque la valeur actuelle du bien devient inférieure à sa Valeur Nette Comptable (VNC)."
  - question: "Comment calcule-t-on le prorata temporis de la première annuité d'amortissement ?"
    answer: "En amortissement linéaire, le prorata temporis se calcule en jours à compter de la date exacte de mise en service du bien, sur la base d'une année fiscale de 360 jours (12 mois de 30 jours). En amortissement dégressif, le décompte s'effectue en mois complets à partir du premier jour du mois d'acquisition, même si le bien est acheté le 28 du mois."
  - question: "Quand faut-il basculer de l'amortissement dégressif vers le linéaire ?"
    answer: "À l'ouverture de chaque exercice, on compare le taux dégressif avec le taux linéaire résiduel (égal à 1 divisé par le nombre d'années restantes à courir). Dès que l'annuité calculée en divisant la VNC par le nombre d'années restantes dépasse l'annuité dégressive, l'entreprise bascule obligatoirement sur des annuités constantes pour solder la VNC à zéro."
  - question: "La valeur résiduelle doit-elle être déduite de la base amortissable ?"
    answer: "En comptabilité (normes PCG et IFRS IAS 16), la base amortissable est égale au coût d'acquisition hors taxes diminué de la valeur résiduelle de revente si celle-ci est significative et mesurable dès l'origine. En revanche, l'administration fiscale française n'admet pas la déduction de la valeur résiduelle : l'écart donne alors lieu à la comptabilisation d'un amortissement dérogatoire."
  - question: "Quels sont les coefficients fiscaux applicables à l'amortissement dégressif ?"
    answer: "En France (article 39 A du CGI), le taux dégressif s'obtient en multipliant le taux linéaire par un coefficient dépendant de la durée normale d'utilisation du bien neuf : 1,25 pour une durée de 3 ou 4 ans ; 1,75 pour une durée de 5 ou 6 ans ; et 2,25 pour une durée strictement supérieure à 6 ans."
---

Lorsqu'une entreprise acquiert une immobilisation corporelle ou incorporelle — machine-outil, parc informatique, véhicule utilitaire, brevet ou agencement commercial — elle ne déduit pas l'intégralité de la dépense en charge l'année de l'achat. Elle répartit ce coût d'investissement sur la durée d'utilisation probable du bien à travers les **dotations aux amortissements**.

Ce calculateur d'amortissement génère le plan complet de vos immobilisations en méthode **linéaire**, **dégressive** ou **par unités d'œuvre**, tout en déterminant l'annuité de chaque exercice et l'évolution de la **Valeur Nette Comptable (VNC)** au bilan.

## Les Trois Méthodes d'Amortissement Comptable et Fiscal

Le choix du mode d'amortissement influence directement le résultat imposable de l'entreprise (IS ou BIC) et la valorisation de son actif immobilisé :

### 1. L'amortissement linéaire (régime de droit commun)
Méthode de référence du Plan Comptable Général (PCG) et des normes IFRS (IAS 16), l'amortissement linéaire répartit de manière constante la perte de valeur du bien sur sa durée réelle d'utilisation.
- **Point de départ** : la **date de mise en service** effective de l'actif.
- **Règle du prorata temporis** : en cas de mise en service en cours d'exercice, la première dotation est réduite proportionnellement au nombre de jours d'utilisation sur une année conventionnelle de **360 jours** (12 mois de 30 jours), et le reliquat est reporté sur un exercice supplémentaire en fin de plan.

### 2. L'amortissement dégressif (incitation fiscale à l'investissement)
Autorisé par l'article 39 A du Code général des impôts (et comparable à la *Déduction pour amortissement - DPA* sur solde dégressif au Canada), ce mécanisme accéléré permet de déduire des annuités plus élevées durant les premières années de détention d'un équipement neuf amortissable sur au moins 3 ans.
- **Point de départ** : le **1er jour du mois d'acquisition** (indépendamment de la date de mise en service).
- **Mécanisme de bascule** : chaque année, le taux dégressif s'applique à la **VNC d'ouverture**. Dès que le taux dégressif devient inférieur au taux linéaire résiduel ($1 / \text{Années restantes}$), le plan bascule en annuités constantes sur la VNC restante afin de solder le bien à zéro au terme de la durée initiale.

### 3. L'amortissement variable (par unités d'œuvre)
Lorsque l'usure économique dépend de l'intensité d'exploitation plutôt que du temps écoulé (moule d'injection conçu pour $500\,000$ pièces, véhicule utilitaire amorti sur $300\,000\text{ km}$, turbine en heures-machine), la dotation annuelle est proportionnelle au volume d'unités consommées durant l'exercice.

## Formules Mathématiques du Plan d'Amortissement

La **base amortissable** $B$ correspond à la valeur brute d'entrée au bilan $V_0$ (prix d'achat HT majoré des frais accessoires de transport et d'installation) diminuée de la valeur résiduelle prévisionnelle $V_R$ ($B = V_0 - V_R$) :

- **Taux linéaire annuel ($t_L$)** sur $N$ années : $t_L = 1 / N$, avec première annuité réduite sur $j$ jours :
  $$A_1 = B \times t_L \times \frac{j}{360}$$
- **Taux dégressif annuel ($t_D$)** avec coefficient fiscal $k$ ($1,25$ pour 3-4 ans ; $1,75$ pour 5-6 ans ; $2,25$ au-delà de 6 ans) : $t_D = t_L \times k$, avec première annuité sur $m$ mois entiers :
  $$A_1 = B \times t_D \times \frac{m}{12}$$
- **Valeur Nette Comptable ($VNC_t$)** à la clôture de l'exercice $t$ :
  $$VNC_t = V_0 - \sum_{i=1}^{t} A_i$$

## Exemple Chiffré Comparé : Machine Industrielle de 60 000 € HT sur 5 Ans

Une PME (clôture au 31 décembre) acquiert et met en service un centre d'usinage neuf le **1er avril de l'Année 1** pour **$60\,000\text{ € HT}$** ($V_R = 0\text{ €}$), amortissable sur **$5\text{ ans}$** (taux linéaire $t_L = 20\text{ \%}$, coefficient $k = 1,75$, soit un taux dégressif $t_D = \mathbf{35\text{ \%}}$).

1. **Année 1 (9 mois, d'avril à décembre)** : $A_1 = 60\,000 \times 0,35 \times (9 / 12) = \mathbf{15\,750,00\text{ €}}$, d'où $VNC_1 = 44\,250,00\text{ €}$.
2. **Année 2 (12 mois, taux résiduel $25\text{ \%} < 35\text{ \%}$)** : $A_2 = 44\,250 \times 0,35 = \mathbf{15\,487,50\text{ €}}$, d'où $VNC_2 = 28\,762,50\text{ €}$.
3. **Année 3 (12 mois, taux résiduel $33,33\text{ \%} < 35\text{ \%}$)** : $A_3 = 28\,762,50 \times 0,35 = \mathbf{10\,066,88\text{ €}}$, d'où $VNC_3 = 18\,695,62\text{ €}$.
4. **Années 4 et 5 (2 ans restants : taux linéaire résiduel de $50\text{ \%} > 35\text{ \%}$, bascule en linéaire)** : $A_4 = A_5 = 18\,695,62 / 2 = \mathbf{9\,347,81\text{ €}}$, soldant la $VNC_5$ à $0,00\text{ €}$.

### Tableau Comparatif du Plan d'Amortissement (60 000 € HT sur 5 Ans)

| Exercice | VNC Début (Dégr.) | Dotation Dégressive | VNC Fin (Dégr.) | Dotation Linéaire | VNC Fin (Linéaire) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Année 1 (9 mois)** | 60 000,00 € | 15 750,00 € | 44 250,00 € | 9 000,00 € | 51 000,00 € |
| **Année 2** | 44 250,00 € | 15 487,50 € | 28 762,50 € | 12 000,00 € | 39 000,00 € |
| **Année 3** | 28 762,50 € | 10 066,88 € | 18 695,62 € | 12 000,00 € | 27 000,00 € |
| **Année 4 (Bascule)** | 18 695,62 € | 9 347,81 € | 9 347,81 € | 12 000,00 € | 15 000,00 € |
| **Année 5 (Bascule)** | 9 347,81 € | 9 347,81 € | 0,00 € | 12 000,00 € | 3 000,00 € |
| **Année 6 (3 mois)** | 0,00 € | 0,00 € | 0,00 € | 3 000,00 € | 0,00 € |

## Règles de Vigilance Fiscale et Comptable

- **Comptabilisation des amortissements dérogatoires** : lorsque l'entreprise pratique l'amortissement dégressif fiscal alors que l'usure économique réelle est linéaire, seul l'amortissement linéaire figure à l'actif en diminution du bien. Le surplus fiscal ($+6\,750,00\text{ €}$ en Année 1) s'enregistre au passif en provision réglementée (compte 145 *Amortissements dérogatoires*), puis fait l'objet d'une reprise à partir de l'Année 3.
- **Plafonnement des véhicules de tourisme** : en France (article 39-4 du CGI), les voitures particulières sont exclues du dégressif et leur base fiscalement déductible est plafonnée selon leurs émissions de $\text{CO}_2$ (de $9\,900\text{ €}$ à $30\,000\text{ €}$ pour les modèles électriques).
- **Approche par composants** : pour un actif complexe (bâtiment industriel, navire), chaque élément ayant une durée de vie propre (gros œuvre sur 40 ans, toiture sur 20 ans, ascenseur sur 15 ans) doit faire l'objet d'un plan d'amortissement distinct.
