---
title: "Calculatrice Binaire : Opérations et Conversions en Base 2"
metaTitle: "Calculatrice Binaire : Opérations Base 2 et Conversions"
description: "Effectuez des additions, soustractions en complément à deux, multiplications, divisions et opérations bit à bit en base 2, et convertissez entre binaire, décimal, hexadécimal, octal et ASCII."
metaDescription: "Effectuez des calculs binaires, opérations bit à bit et conversions entre base 2, décimal, hexadécimal, octal et ASCII sur registres 8 à 64 bits."
metaKeywords: "calculatrice binaire, calcul en base 2, convertisseur binaire décimal hexadécimal, complément à deux, opérations bit à bit, portes logiques, addition binaire, registre 8 16 32 64 bits"
faqs:
  - question: "Comment le complément à deux représente-t-il un entier négatif en binaire ?"
    answer: "Sur un registre de N bits, le bit de poids fort (tout à gauche) possède un poids négatif de -2^(N-1) tandis que les bits suivants conservent leur poids positif. Pour obtenir l'opposé d'un nombre positif, on inverse tous ses bits (complément à un) puis on ajoute 1 au bit de poids faible. Ce codage élimine le double zéro et permet au processeur de soustraire à l'aide du même circuit additionneur."
  - question: "Pourquoi le système hexadécimal (base 16) accompagne-t-il toujours le binaire en informatique ?"
    answer: "Parce que 16 = 2^4 : chaque chiffre hexadécimal (de 0 à 9 puis A à F) condense exactement quatre bits, appelés un quartet. Un octet de 8 bits s'écrit donc en deux symboles hexadécimaux (par exemple 1100 1010 en binaire devient CA en base 16), ce qui divise par quatre la longueur des adresses mémoire, des couleurs RVB et des trames réseau sans calcul de division."
  - question: "Quelle différence existe-t-il entre décalage à droite logique et décalage à droite arithmétique ?"
    answer: "Le décalage logique à droite, utilisé sur les entiers non signés, injecte toujours un 0 à gauche et équivaut à une division entière par une puissance de 2. Le décalage arithmétique à droite, employé sur les entiers signés en complément à deux, recopie le bit de signe à gauche afin de préserver le signe négatif du résultat."
  - question: "Pourquoi certains nombres décimaux simples comme 0,1 ne tombent-ils pas juste en base 2 ?"
    answer: "Un nombre fractionnaire décimal admet une écriture binaire finie uniquement si sa fraction irréductible a pour dénominateur une puissance de 2 (comme 0,5 = 1/2 ou 0,625 = 5/8). Or 0,1 = 1/10 comporte le facteur premier 5 : son développement binaire 0,0001100110011... est périodique infini, ce qui explique les légères dérives d'arrondi en virgule flottante."
  - question: "Que se passe-t-il lors d'un débordement de capacité sur un registre de 8, 16 ou 32 bits ?"
    answer: "Lorsqu'un résultat excède la capacité maximale du registre (par exemple 255 en 8 bits non signé ou 127 en 8 bits signé), les bits dépassant la largeur fixée sont tronqués et la valeur reboucle modulo 2^N. Ainsi, en 8 bits signé, ajouter 1 à 127 (01111111) produit 10000000, qui s'interprète comme -128."
---

En électronique numérique, architecture des processeurs, programmation système et réseaux, le **système binaire (base 2)** constitue le fondement du traitement de l'information. Chaque **bit** ne prend que deux états stables (`0` ou `1`), reflétant deux niveaux de tension au cœur des transistors.

Cette calculatrice binaire réunit l'essentiel des calculs informatiques : **arithmétique en base 2** (addition, soustraction, multiplication, division, modulo), **opérations bit à bit** (`ET`, `OU`, `OU exclusif`, `NON`, décalages), **conversions multi-bases** (binaire, décimal, hexadécimal, octal, entiers et fractionnaires), **registres interactifs** ($8$ à $64$ bits, signé ou non signé), **ASCII** et **tables de vérité**.

## Numération en Base 2, Complément à Deux et Opérateurs Logiques

Dans la numération positionnelle en base $2$, tout nombre binaire comportant $n$ bits entiers et $k$ bits fractionnaires vaut en décimal :

$$N_{10} = \sum_{i=-k}^{n-1} b_i \cdot 2^i = b_{n-1}2^{n-1} + \dots + b_1 2^1 + b_0 2^0 + b_{-1}2^{-1} + \dots + b_{-k}2^{-k}$$

* **$b_i \in \{0, 1\}$** : valeur du bit au rang $i$.
* **$b_{n-1}$** et **$b_0$** : respectivement **bit de poids fort** (à gauche) et **bit de poids faible** (rang des unités, fixant la parité).
* Les exposants négatifs ($2^{-1} = 0{,}5$, $2^{-2} = 0{,}25$, $2^{-3} = 0{,}125$) représentent la partie fractionnaire.

Sur un registre de largeur fixe $N \in \{8, 16, 32, 64\}$ bits, deux modes coexistent :

1. **Non signé** : entiers de **$0$ à $2^N - 1$**.
2. **Signé (complément à deux)** : entiers de **$-2^{N-1}$ à $2^{N-1} - 1$**, définis par :
   $$V = -b_{N-1} \cdot 2^{N-1} + \sum_{i=0}^{N-2} b_i \cdot 2^i \qquad \text{et} \qquad (-x)_{2} \equiv \overline{x} + 1 \pmod{2^N}$$

L'addition binaire suit quatre règles ($0+0=0$, $0+1=1$, $1+0=1$, $1+1=10_2$ avec retenue de $1$). Les opérateurs **bit à bit** traitent chaque colonne indépendamment : `ET` (masquage), `OU` (activation de bits), `OU exclusif` (bascule ou parité), `NON` (inversion) et décalages de $k$ rangs ($\times 2^k$ à gauche, division entière par $2^k$ à droite).

## Exemples Chiffrés Pas à Pas : Addition, Soustraction et Conversion

### Cas n° 1 : Addition avec débordement 8 bits et soustraction signée

**Addition** : Additionnons $1011\,0110_2$ ($182_{10}$) et $0101\,1101_2$ ($93_{10}$). En propageant les retenues de droite à gauche :

$$1011\,0110_2 + 0101\,1101_2 = \mathbf{1\,0001\,0011_2} = \mathbf{275_{10}} = \mathbf{113_{16}} = \mathbf{423_8}$$

Sur un registre **8 bits non signé** (maximum $255$), le neuvième bit est perdu : la valeur reboucle à **$0001\,0011_2 = 19_{10}$** ($275 \bmod 256$).

**Soustraction en complément à deux (8 bits signé)** : Calculons **$45 - 67$** ($0010\,1101_2 - 0100\,0011_2$) :

1. Codage de $+67$ sur 8 bits : $0100\,0011_2$.
2. Inversion de tous les bits (complément à un) : $1011\,1100_2$.
3. Ajout de $1$ : $1011\,1101_2$ (codage exact de $-67$).
4. Addition avec $+45$ : $0010\,1101_2 + 1011\,1101_2 = \mathbf{1110\,1010_2}$.
5. Vérification pondérée : $-128 + 64 + 32 + 8 + 2 = \mathbf{-22_{10}}$.

### Cas n° 2 : Convertir $25{,}625_{10}$ vers les bases 2, 16 et 8

* **Partie entière ($25$)** par divisions par $2$ : $25 = 12\times 2 + \mathbf{1}$ ; $12 = 6\times 2 + \mathbf{0}$ ; $6 = 3\times 2 + \mathbf{0}$ ; $3 = 1\times 2 + \mathbf{1}$ ; $1 = 0\times 2 + \mathbf{1}$ $\implies$ lecture ascendante : **$11001_2$**.
* **Partie fractionnaire ($0{,}625$)** par multiplications par $2$ : $0{,}625\times 2 = \mathbf{1}{,}25$ ; $0{,}25\times 2 = \mathbf{0}{,}50$ ; $0{,}50\times 2 = \mathbf{1}{,}00$ $\implies$ lecture descendante : **$,101_2$**.
* **Synthèse** : $25{,}625_{10} = \mathbf{11001{,}101_2} = \mathbf{19{,}\text{A}_{16}}$ (quartets $0001\ 1001{,}\ 1010$) $= \mathbf{31{,}5_8}$ (triplets $011\ 001{,}\ 101$).

## Référentiel des Largeurs de Registres Binaires

| Largeur | Combinaisons | Plage non signée | Plage signée (complément à deux) | Max hexadécimal | Usage courant |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **4 bits** | 16 | 0 à 15 | -8 à +7 | `0xF` | Quartet, 1 symbole hexadécimal |
| **8 bits** | 256 | 0 à 255 | -128 à +127 | `0xFF` | Octet, ASCII, canal RVB |
| **16 bits** | 65 536 | 0 à 65 535 | -32 768 à +32 767 | `0xFFFF` | Ports TCP/UDP, audio CD |
| **32 bits** | 4 294 967 296 | 0 à 4 294 967 295 | -2 147 483 648 à +2 147 483 647 | `0xFFFFFFFF` | Adresses IPv4, entier système |
| **64 bits** | $2^{64}$ | $0$ à $2^{64} - 1$ | $-2^{63}$ à $2^{63} - 1$ | `0xFFFFFFFFFFFFFFFF` | Adressage mémoire, horodatages |

## Bonnes Pratiques de Calcul Binaire et Pièges Fréquents

* **Contrôler la convention signée** : Une même suite de bits change totalement de sens selon le mode choisi : l'octet `1111 1111` représente **$255$** en non signé mais **$-1$** en signé par complément à deux.
* **Grouper par quartets et triplets** : Évitez le passage par la base 10 en regroupant par **4 bits** vers l'hexadécimal (`1100 1010` $\to$ `CA`) ou par **3 bits** vers l'octal (droits Unix `755` = `111 101 101`).
* **Employer le bon masque bit à bit** : Utilisez `ET` pour isoler un sous-réseau ou effacer des bits (`1100 1010 ET 1111 0000 = 1100 0000`, soit $192$), `OU` pour activer un drapeau et `OU exclusif` pour basculer un état.
* **Anticiper les fractions périodiques en base 2** : Des valeurs simples comme $0{,}1_{10}$ ou $0{,}2_{10}$ ont un développement binaire infini en virgule flottante sur 32 bits ; pour tout calcul financier en euros ou en dollars canadiens, travaillez en centimes entiers.
