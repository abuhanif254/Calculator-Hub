---
title: "Comprendre le Taux de Rentabilité Interne (TRI) : Un Guide Complet"
description: "Découvrez la formule du Taux de Rentabilité Interne (TRI), sa relation avec la VAN, un exemple chiffré détaillé, le TRIM et les critères de décision financière."
category: "Finance"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "irr-calculator"
relatedType: "calculator"
faqs:
  - question: "Quelle est la relation exacte entre le TRI et la Valeur Actuelle Nette (VAN) ?"
    answer: "Le Taux de Rentabilité Interne (TRI) correspond précisément au taux d'actualisation qui annule la Valeur Actuelle Nette (VAN) d'un projet. À ce taux d'équilibre, la valeur actualisée des flux de trésorerie entrants futurs égale exactement la valeur actualisée des décaissements initiaux et ultérieurs."
  - question: "Pourquoi le TRI ne se résout-il pas par une formule algébrique directe ?"
    answer: "Dès qu'un investissement comporte trois périodes ou plus avec des flux irréguliers, l'équation du TRI forme un polynôme de degré élevé sans solution algébrique explicite à partir du cinquième degré. Les moteurs financiers utilisent donc des algorithmes numériques itératifs comme la méthode de Newton-Raphson."
  - question: "Quand faut-il privilégier le TRI Modifié (TRIM) plutôt que le TRI classique ?"
    answer: "Le TRIM s'impose lorsque les flux intermédiaires d'un projet sont élevés et ne peuvent pas être réinvestis au taux du TRI lui-même, ou lorsque la série de flux change de signe plusieurs fois. Le TRIM actualise les sorties au coût du financement et capitalise les entrées à un taux de réinvestissement réaliste."
  - question: "Quelle différence existe-t-il entre le TRI périodique et le TRI daté (XIRR) ?"
    answer: "Le TRI périodique suppose que tous les flux surviennent à intervalles strictement réguliers, par exemple chaque année ou chaque mois. Le TRI daté (XIRR) associe chaque encaissement ou décaissement à sa date calendaire exacte et l'actualise selon la fraction d'année réelle sur une base de 365 jours."
  - question: "Comment arbitrer entre deux projets mutuellement exclusifs si l'un affiche un TRI supérieur et l'autre une VAN supérieure ?"
    answer: "Entre deux projets mutuellement exclusifs de tailles ou de durées différentes, retenez toujours le projet présentant la Valeur Actuelle Nette (VAN) la plus élevée au coût réel du capital. Un TRI élevé sur un petit montant crée souvent moins de richesse nette qu'un TRI modéré sur un capital plus important."
---

Évaluer un placement uniquement à partir du **Retour sur Investissement (ROI)** revient à ignorer la variable la plus décisive de la finance : **le temps**. Doubler un capital en deux ans traduit une performance remarquable, alors que le doubler en quinze ans compense à peine l'inflation. Le **Taux de Rentabilité Interne (TRI)** corrige ce biais en mesurant le taux de rendement annualisé composé, pondéré par les montants et l'échéancier de chaque flux sur toute la durée de détention.

En investissement immobilier, en capital-investissement ou en choix d'équipements, le TRI permet de comparer objectivement des projets aux profils de recettes très distincts. Notre [Calculatrice de TRI](/fr/calculatrices/calculatrice-tri) détermine instantanément ce taux d'équilibre à partir de vos flux mensuels ou annuels.

## Définition Mathématique du TRI et Équation de la VAN

En finance quantitative, le TRI est le taux d'actualisation qui annule la **Valeur Actuelle Nette (VAN)** d'une chronique de flux sur `N` périodes régulières :

```text
VAN = CF₀ + CF₁÷(1+TRI)^1 + CF₂÷(1+TRI)^2 + ... + CF_N÷(1+TRI)^N = 0
Soit : Σ [CF_t ÷ (1 + TRI)^t] = 0   (pour t = 0 à N)
```

* **`CF₀` (Décaissement initial) :** Capital engagé à `t = 0`, saisi en négatif (ex. `-250 000 €`), car la trésorerie sort du compte.
* **`CF_t` (Flux net de la période `t`) :** Solde net entre encaissements et décaissements constaté en fin de période `t`.
* **`N` (Nombre de périodes) :** Durée totale exprimée en périodes identiques (années, trimestres ou mois).
* **`TRI` (Taux interne périodique) :** Taux d'actualisation d'équilibre exprimé sous forme décimale puis en pourcentage.

### Résolution Itérative et Comparaison au Taux Plancher

Contrairement au **Taux de Croissance Annuel Composé (TCAC)**, qui relie uniquement une valeur initiale et une valeur finale, le TRI intègre chaque flux intermédiaire. Dès que `N >= 3`, le polynôme ne permet plus d'isoler `TRI` algébriquement ; les calculateurs emploient la méthode itérative de **Newton-Raphson** (`r_(k+1) = r_k − VAN(r_k)÷VAN'(r_k)`) jusqu'à converger sous `10^-7`. En décision d'investissement, ce TRI se compare au **taux plancher** (*hurdle rate*) ou au **CMPC (WACC)** :

* **`TRI > Taux plancher` :** L'actif crée de la valeur nette (`VAN > 0`) ; le projet est accepté.
* **`TRI = Taux plancher` :** Seuil d'équilibre (`VAN = 0`), sans enrichissement excédentaire ajusté du risque.
* **`TRI < Taux plancher` :** Le projet détruit de la valeur relative (`VAN < 0`) ; il est rejeté.

## Exemple Chiffré Pas à Pas

Un investisseur acquiert et rénove un immeuble locatif pour **250 000 €** (`CF₀ = -250 000 €`). Les flux nets annuels sur quatre ans, incluant la revente en année 4, s'établissent ainsi : `CF₁ = +45 000 €`, `CF₂ = +60 000 €`, `CF₃ = +75 000 €` et `CF₄ = +210 000 €` (`80 000 €` de loyers nets + `130 000 €` de cession nette).

### Étape 1 : Poser l'équation d'actualisation

```text
0 = -250 000 + 45 000÷(1+r)^1 + 60 000÷(1+r)^2 + 75 000÷(1+r)^3 + 210 000÷(1+r)^4
```

### Étape 2 : Tester un premier taux d'essai `r₁ = 12,0 %`

```text
VAN(12 %) = -250 000 + 40 178,57 + 47 831,63 + 53 383,52 + 133 458,80 = +24 852,52 €
```

La VAN étant positive (`+24 852,52 €`), le TRI réel dépasse `12,0 %`.

### Étape 3 : Tester un second taux d'essai `r₂ = 16,0 %`

```text
VAN(16 %) = -250 000 + 38 793,10 + 44 589,77 + 48 049,33 + 115 981,13 = -2 586,67 €
```

La VAN devient négative (`-2 586,67 €`) : la racine se situe entre `12,0 %` et `16,0 %`.

### Étape 4 : Interpoler puis converger

L'interpolation linéaire donne `12,0 % + [24 852,52 ÷ (24 852,52 + 2 586,67)] × 4,0 % = 15,62 %`. La convergence exacte par Newton-Raphson aboutit à un **TRI de 15,598 % (`15,60 %`)**, dépassant un taux plancher de `10,0 %` de `560` points de base.

## Comparatif des Indicateurs de Rentabilité

| Indicateur | Formule ou Base | Actualisation | Flux Intermédiaires | Hypothèse de Réinvestissement | Usage Privilégié |
|---|---|---|---|---|---|
| **TRI (IRR)** | Taux où `VAN = 0` | Oui | Gère les flux irréguliers | Au taux du TRI lui-même | Immobilier, capital-investissement, projets |
| **TRIM (MIRR)** | `[VF(entrées)÷|VA(sorties)|]^(1/N)−1` | Oui | Sépare entrées et sorties | Taux prudent choisi | TRI très élevés ou flux alternés |
| **VAN (NPV)** | `Σ [CF_t ÷ (1+CMPC)^t]` | Oui | Actualise au coût du capital | Au CMPC / taux plancher | Projets mutuellement exclusifs |
| **TCAC (CAGR)** | `(V_fin ÷ V_début)^(1/N) − 1` | Oui | Aucun flux intermédiaire | Capitalisation à 100 % | Actions, ETF, obligations zéro-coupon |
| **ROI Simple** | `(Gain − Coût) ÷ Coût` | Non | Somme brute sans date | Aucune | Opérations courtes (< 12 mois) |
| **Multiple MOIC** | `Encaissements ÷ Décaissements` | Non | Somme brute totale | Aucune | Richesse absolue en LBO |

## Limites Structurelles du TRI et Erreurs Courantes

1. **Hypothèse de réinvestissement irréaliste :** Le TRI suppose que chaque flux intermédiaire (`CF₁`, `CF₂`...) est replacé au même taux que le TRI global. Sur un projet affichant `32 %` de TRI, réinvestir les loyers de la première année à `32 %` est illusoire : calculez alors le **TRIM** avec un taux de réinvestissement réaliste (`6 %–8 %`).
2. **TRI multiples sur flux non conventionnels :** Si un actif subit plusieurs changements de signe (`− → + → −`, par exemple lors d'une lourde réhabilitation ou d'un coût de démantèlement final), la règle des signes de Descartes montre que l'équation peut admettre **plusieurs TRI valides**. Vérifiez systématiquement avec la VAN.
3. **Vitesse contre création de richesse totale :** Rembourser le capital très tôt gonfle mécaniquement le TRI même pour un profit modeste en euros. Associez toujours le TRI à la **VAN** et au **MOIC**, puis testez vos hypothèses dans notre [Calculatrice d'Investissement](/fr/calculatrices/calculatrice-investissement).
