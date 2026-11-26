---
title: "Le Guide Complet des Fractions : Addition, Soustraction, Multiplication & Division"
description: "Maîtrisez toutes les opérations sur les fractions : PPCM, PGCD, simplification irréductible, nombres mixtes, règles de priorité, exemple complet et tableau mémo."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "fraction-calculator"
relatedType: "calculator"
faqs:
  - question: "Pourquoi faut-il un dénominateur commun pour additionner ou soustraire, mais pas pour multiplier ?"
    answer: "Le dénominateur définit la taille des parts qui composent l'unité. Additionner 1/2 et 1/3 revient à additionner des grandeurs d'unités différentes ; il faut d'abord tout convertir dans une même subdivision (ici des sixièmes). La multiplication, à l'inverse, représente une fraction d'une autre fraction (prendre la moitié d'un tiers) et change directement la subdivision en multipliant les dénominateurs entre eux."
  - question: "Comment simplifier rapidement une grande fraction jusqu'à sa forme irréductible ?"
    answer: "Calculez le Plus Grand Commun Diviseur (PGCD) du numérateur et du dénominateur à l'aide de l'algorithme d'Euclide (divisions successives), puis divisez les deux termes par ce PGCD. Par exemple, pour 84/126, PGCD(84, 126) = 42, ce qui réduit immédiatement la fraction à 2/3."
  - question: "Pourquoi la division par zéro est-elle strictement interdite dans une fraction ?"
    answer: "Écrire a / b revient à chercher le nombre q tel que b × q = a. Si b = 0 et a ≠ 0, aucun nombre q ne vérifie 0 × q = a. Si b = 0 et a = 0, toute valeur de q convient, ce qui rend l'expression indéterminée. Un dénominateur ne peut donc jamais être nul."
  - question: "Comment convertir un nombre mixte en fraction impropre avant un calcul ?"
    answer: "Un nombre mixte de la forme E + a/b (partie entière E suivie d'une fraction propre a/b) se transforme en fraction impropre grâce à la formule (E × b + a) / b. Ainsi, 3 + 2/5 devient (3 × 5 + 2) / 5 = 17/5, forme indispensable pour multiplier ou diviser sans erreur."
  - question: "Vaut-il mieux conserver un résultat sous forme fractionnaire ou le convertir en décimal ?"
    answer: "Conservez la fraction irréductible pour tous les calculs intermédiaires afin d'éviter l'accumulation d'erreurs d'arrondi (par exemple, 1/3 ou 2/7 ont un développement décimal infini). Passez à l'écriture décimale uniquement en fin de chaîne pour afficher une mesure physique ou un montant monétaire arrondi."
---

Une **fraction** `a / b` (avec un dénominateur `b ≠ 0`) représente le quotient exact de deux nombres entiers : le **numérateur** `a` indique combien de parts sont retenues, tandis que le **dénominateur** `b` précise en combien de parts égales l'unité entière est divisée. À la différence de l'écriture décimale, qui oblige à tronquer les quotients périodiques infinis comme `1/3 = 0,333…` ou `2/7 = 0,2857…`, l'arithmétique fractionnaire préserve une exactitude mathématique absolue tout au long d'une chaîne de calcul.

Maîtriser les quatre opérations élémentaires, le Plus Petit Commun Multiple (`PPCM`), le Plus Grand Commun Diviseur (`PGCD`) et la règle des signes supprime l'essentiel des erreurs en algèbre, en physique appliquée et en gestion financière. Notre [Calculatrice de Fractions](/fr/calculatrices/calculatrice-de-fractions) effectue ces opérations en arithmétique exacte et réduit automatiquement chaque résultat jusqu'à sa forme irréductible.

## Anatomie d'une fraction, PGCD et réduction irréductible

Une fraction est qualifiée de **propre** lorsque la valeur absolue du numérateur est strictement inférieure à celle du dénominateur (`|a| < |b|`), **impropre** lorsque `|a| ≥ |b|`, et **irréductible** lorsque les deux termes sont premiers entre eux (`PGCD(|a|, |b|) = 1`). Deux fractions `a/b` et `c/d` représentent exactement le même nombre rationnel si et seulement si leurs produits en croix coïncident (`a × d = b × c`).

Pour réduire systématiquement une fraction sans multiplier les essais de divisibilité, on calcule le `PGCD` par l'algorithme d'Euclide (divisions euclidiennes successives) :

```text
Forme irréductible : (a / b) = (a ÷ PGCD) / (b ÷ PGCD)
Conversion nombre mixte E + a/b → fraction impropre : (E × b + a) / b   (pour E ≥ 0)
Gestion des signes : (−a) / b = a / (−b) = −(a / b)  et  (−a) / (−b) = a / b
```

En notation normalisée, placez toujours le signe moins devant la barre de fraction ou au numérateur, jamais au dénominateur dans le résultat final.

## Les quatre opérations fondamentales

```text
Addition             : (a / b) + (c / d) = (a × d + c × b) / (b × d)
Soustraction         : (a / b) − (c / d) = (a × d − c × b) / (b × d)
Dénominateur optimal : convertir d'abord au dénominateur commun D = PPCM(b, d)
Multiplication       : (a / b) × (c / d) = (a × c) / (b × d)
Division (c ≠ 0)     : (a / b) ÷ (c / d) = (a / b) × (d / c) = (a × d) / (b × c)
```

### Simplification par PPCM et simplification croisée

Dans l'addition et la soustraction, passer par `PPCM(b, d)` évite de manipuler des entiers démesurés : pour calculer `5/12 + 7/18`, le produit direct `12 × 18 = 216` alourdit les calculs, alors que `PPCM(12, 18) = 36` conduit immédiatement à `15/36 + 14/36 = 29/36`. En multiplication, la **simplification croisée** consiste à diviser n'importe quel numérateur et n'importe quel dénominateur par un facteur commun *avant* d'effectuer le produit, réduisant ainsi les risques d'erreur.

## Exemple guidé : calcul combiné avec priorité opératoire

Résolvons l'expression complète `A = (3/4 + 5/6) × (2/5) − (1/3) ÷ (4/9)` en respectant strictement la hiérarchie des opérations (parenthèses, puis multiplications et divisions de gauche à droite, puis additions et soustractions) :

```text
1. Parenthèse (3/4 + 5/6) via PPCM(4, 6) = 12 :
   3/4 = 9/12  et  5/6 = 10/12  →  9/12 + 10/12 = 19/12

2. Produit (19/12) × (2/5) avec simplification croisée par 2 :
   (19 / 12) × (2 / 5) = (19 / 6) × (1 / 5) = 19/30

3. Division (1/3) ÷ (4/9) en multipliant par l'inverse 9/4 :
   (1 / 3) × (9 / 4) = 9/12 = 3/4   (réduit par PGCD = 3)

4. Soustraction finale 19/30 − 3/4 via PPCM(30, 4) = 60 :
   19/30 = 38/60  et  3/4 = 45/60  →  (38 − 45) / 60 = −7/60
```

Puisque `PGCD(7, 60) = 1`, la fraction négative `−7/60` est déjà irréductible. Son équivalent décimal approche `−0,1167`, mais seule l'écriture rationnelle conserve l'exactitude complète pour la suite d'un problème.

## Tableau récapitulatif des opérations sur les fractions

| Opération | Règle d'exécution | Condition critique | Exemple | Résultat réduit |
| :--- | :--- | :--- | :--- | :--- |
| Addition | Mettre au `PPCM`, additionner les numérateurs | `b ≠ 0` et `d ≠ 0` | `2/3 + 1/6 = 4/6 + 1/6` | `5/6` |
| Soustraction | Mettre au `PPCM`, soustraire les numérateurs | `b ≠ 0` et `d ≠ 0` | `5/8 − 1/4 = 5/8 − 2/8` | `3/8` |
| Multiplication | Multiplier en ligne et simplifier en croix | `b ≠ 0` et `d ≠ 0` | `(4/9) × (3/10) = 12/90` | `2/15` |
| Division | Multiplier par l'inverse `d/c` | `b, c, d ≠ 0` | `(3/5) ÷ (9/10) = 30/45` | `2/3` |
| Simplification | Diviser haut et bas par le `PGCD` | `b ≠ 0` | `42/56` (`PGCD = 14`) | `3/4` |
| Mixte → impropre | Calculer `(E × b + a) / b` | `b ≠ 0`, `E ≥ 0` | `2 + 3/7 = (2 × 7 + 3) / 7` | `17/7` |

## Usages professionnels, erreurs classiques et précision binaire

L'arithmétique rationnelle reste indispensable en menuiserie et usinage (`cm`, `mm`), en répartition financière (`€`, tantièmes de copropriété, proratas `jours / 365`) et en posologie (`kg`) avant tout arrondi final. Évitez quatre erreurs récurrentes :

- **Additionner les dénominateurs :** écrire `1/2 + 1/3 = 2/5` est faux, puisque `0,4 < 0,5`.
- **Multiplier un nombre mixte terme à terme :** `(2 + 1/2) × (3 + 1/3)` vaut `(5/2) × (10/3) = 25/3 = 8 + 1/3`, et non `6 + 1/6`.
- **Inverser le dividende :** seul le diviseur s'inverse dans `(a/b) ÷ (c/d)`.
- **Erreurs d'arrondi binaire :** en virgule flottante IEEE 754, `0,1 + 0,2` produit `0,30000000000000004`, alors que `1/10 + 2/10 = 3/10` reste exact.

Utilisez la [Calculatrice de Fractions](/fr/calculatrices/calculatrice-de-fractions) pour enchaîner vos calculs rationnels sans erreur de priorité ni perte de précision.
