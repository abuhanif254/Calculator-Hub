---
title: "Calculateur de TDEE : dépense énergétique journalière et besoins caloriques"
description: "Calculez votre dépense énergétique journalière (TDEE) selon Mifflin-St Jeor et ajustez vos calories et protéines pour la sèche, le maintien ou la masse."
faqs:
  - question: "Quelle est la différence entre le métabolisme de base et le TDEE ?"
    answer: "Le métabolisme de base (MB) correspond à l'énergie minimale consommée au repos complet pour assurer les fonctions vitales comme la respiration, la circulation sanguine et le maintien thermique. Le TDEE, ou dépense énergétique journalière totale, englobe ce métabolisme de base ainsi que toutes les dépenses supplémentaires liées à la digestion, aux gestes quotidiens et aux séances de sport."
  - question: "Pourquoi l'équation de Mifflin-St Jeor est-elle privilégiée par rapport à celle de Harris-Benedict ?"
    answer: "Publiée en 1990 et validée par de nombreuses études cliniques modernes, l'équation de Mifflin-St Jeor reflète plus fidèlement la composition corporelle des populations contemporaines. Elle présente une marge d'erreur inférieure à celle de Harris-Benedict (datant de 1919), qui tend souvent à surestimer les besoins caloriques des personnes sédentaires ou en surpoids."
  - question: "Comment éviter de surestimer son coefficient d'activité physique ?"
    answer: "La majorité des utilisateurs surestime son niveau d'activité en intégrant trois séances de musculation dans la catégorie très actif. En réalité, un salarié travaillant assis qui s'entraîne trois à quatre fois par semaine pendant une heure relève généralement du palier modérément actif (1,55), voire légèrement actif (1,375) si son nombre de pas quotidiens reste inférieur à 5 000."
  - question: "Quel déficit calorique viser pour perdre du gras sans sacrifier la masse musculaire ?"
    answer: "Un déficit modéré d'environ 300 à 500 kcal par jour sous votre TDEE permet de perdre entre 0,3 et 0,5 kg par semaine tout en préservant la force et le tissu musculaire. À l'inverse, des régimes drastiques dépassant 750 à 1 000 kcal de déficit accélèrent la fonte musculaire, augmentent la fatigue nerveuse et favorisent une baisse adaptative du NEAT."
  - question: "Pourquoi mon TDEE diminue-t-il au fil d'une sèche prolongée ?"
    answer: "Deux mécanismes expliquent cette baisse : d'une part, un corps plus léger dépense mécaniquement moins d'énergie pour se mouvoir et entretenir ses tissus ; d'autre part, la thermogenèse adaptative réduit inconsciemment votre agitation spontanée (NEAT). Il est donc recommandé de recalculer votre TDEE tous les 4 à 5 kg perdus ou d'observer la moyenne hebdomadaire de votre poids."
---

La dépense énergétique journalière totale, couramment désignée par le sigle international TDEE, représente le nombre total de calories que votre organisme brûle sur 24 heures. Son calcul repose sur l'estimation du métabolisme de base selon l'équation de Mifflin-St Jeor, multipliée par un coefficient reflétant votre activité physique réelle.

Connaître cet équilibre énergétique est indispensable pour piloter vos objectifs corporels sans tâtonnement. En retranchant 500 kcal à votre TDEE pour une sèche ou en ajoutant 250 kcal pour une prise de masse maîtrisée, vous ajustez vos calories et vos protéines avec rigueur.

## Formule mathématique, composantes métaboliques et méthodologie

Notre calculateur détermine d'abord votre métabolisme de base (MB), puis l'ajuste par un multiplicateur global allant de `1,2` à `1,9` :

- **Formule de Mifflin-St Jeor (Homme)** : `MB = (10 × poids en kg) + (6,25 × taille en cm) − (5 × âge en années) + 5`
- **Formule de Mifflin-St Jeor (Femme)** : `MB = (10 × poids en kg) + (6,25 × taille en cm) − (5 × âge en années) − 161`
- **Dépense énergétique totale** : `TDEE = MB × Coefficient d'activité`

Sur le plan physiologique, le TDEE résulte de l'addition de quatre postes distincts :
1. **Métabolisme de base (MB, environ 60 % à 70 %)** : l'énergie vitale dépensée par le cerveau, le foie, le cœur et les muscles au repos absolu.
2. **Thermogenèse liée aux activités non sportives (NEAT, environ 15 % à 25 %)** : l'ensemble des mouvements hors entraînement structuré (marche, posture debout, tâches ménagères, gesticulations). C'est le levier le plus variable d'un individu à l'autre.
3. **Effet thermique des aliments (TEF, environ 10 %)** : l'énergie requise pour digérer, absorber et métaboliser les nutriments. Les protéines génèrent un TEF élevé (`20 %` à `30 %` de leur valeur calorique), contre `5 %` à `10 %` pour les glucides et `0 %` à `3 %` pour les lipides.
4. **Dépense liée à l'exercice physique structuré (EAT, environ 5 % à 15 %)** : les calories directement brûlées durant vos séances de sport planifiées.

## Exemple pratique détaillé : calcul pour un profil sportif

Prenons le cas d'un homme de `32 ans`, mesurant `179 cm` pour un poids de `78 kg`, qui travaille en bureau et pratique la musculation ou la course à pied quatre fois par semaine (palier modérément actif, coefficient `1,55`).

**Étape 1 : Estimer le métabolisme de base (MB).**
On applique l'équation masculine :
`MB = (10 × 78) + (6,25 × 179) − (5 × 32) + 5`
`MB = 780 + 1 118,75 − 160 + 5 = 1 743,75 kcal/jour`, soit environ `1 744 kcal`.

**Étape 2 : Calculer le TDEE de maintien.**
On multiplie le métabolisme de base par le facteur d'activité :
`TDEE = 1 743,75 × 1,55 = 2 702,81 kcal/jour`, arrondi à `2 703 kcal`.
Cet apport correspond à l'équilibre pondéral exact : le poids reste stable à moyen terme.

**Étape 3 : Définir les cibles caloriques et protéiques selon l'objectif.**
- **Objectif sèche (`−500 kcal`)** : `2 703 − 500 = 2 203 kcal/jour`. Sur la base d'un équivalent énergétique d'environ `7 700 kcal` par kilogramme de tissu adipeux, ce déficit hebdomadaire de `3 500 kcal` vise une perte d'environ `0,45 kg` par semaine.
- **Objectif prise de masse sèche (`+250 kcal`)** : `2 703 + 250 = 2 953 kcal/jour`, favorisant l'anabolisme musculaire tout en limitant le stockage adipeux.
- **Cible de protéines** : les recommandations de nutrition sportive situent l'apport optimal entre `1,6` et `2,2 g` par kilogramme de poids corporel, soit `125 g` à `172 g` par jour pour cet athlète (`500` à `688 kcal`), particulièrement en phase de déficit pour protéger la masse maigre.

## Tableau de référence : besoins caloriques par niveau d'activité

Le tableau ci-dessous illustre l'impact des cinq paliers d'activité standards sur notre profil de référence (`MB = 1 744 kcal/jour`).

| Niveau d'activité | Coefficient | Profil hebdomadaire type | Maintien (TDEE) | Sèche (`−500 kcal`) | Prise de masse (`+250 kcal`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Sédentaire | `× 1,20` | Bureau, moins de 4 000 pas/jour | `2 093 kcal` | `1 593 kcal` | `2 343 kcal` |
| Légèrement actif | `× 1,375` | 1 à 2 séances ou 6 000 pas/jour | `2 398 kcal` | `1 898 kcal` | `2 648 kcal` |
| Modérément actif | `× 1,55` | 3 à 5 séances de sport/semaine | `2 703 kcal` | `2 203 kcal` | `2 953 kcal` |
| Très actif | `× 1,725` | 6 à 7 séances intenses/semaine | `3 008 kcal` | `2 508 kcal` | `3 258 kcal` |
| Extrêmement actif | `× 1,90` | Sportif biquotidien ou métier physique | `3 313 kcal` | `2 813 kcal` | `3 563 kcal` |

Pour les gabarits présentant un surpoids important ou une masse musculaire exceptionnelle, il reste utile de croiser cette estimation avec l'équation de Katch-McArdle dès que le taux de masse grasse est connu avec fiabilité.

## Stratégie d'ajustement, erreurs courantes et précautions de santé

Une équation prédictive fournit un excellent point de départ statistique, mais la variabilité génétique et le niveau réel de NEAT peuvent déplacer votre besoin réel de `±10 %`. Pour fiabiliser vos résultats, évitez trois écueils fréquents :

1. **Ne pas ajuster sur 14 jours** : Pesez-vous à jeun le matin et calculez une moyenne hebdomadaire. Si votre poids stagne deux semaines après ajustement, modifiez votre apport de `150 kcal` ou augmentez votre marche quotidienne.
2. **Compter les calories des montres connectées en double** : Les coefficients (`1,375` à `1,9`) intègrent déjà votre sport. Additionner les calories affichées par une montre entraîne un surplus involontaire.
3. **Descendre sous le métabolisme de base sans suivi** : Un apport très inférieur au MB sur la durée expose à des carences, des troubles hormonaux et une fatigue chronique.

*Avertissement : ce calculateur est destiné aux adultes en bonne santé à titre informatif. En cas de pathologie métabolique, de troubles du comportement alimentaire, de grossesse ou d'allaitement, rapprochez-vous d'un médecin nutritionniste ou d'un diététicien diplômé d'État.*
