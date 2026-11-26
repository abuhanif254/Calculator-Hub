---
title: "Comprendre le Binaire : Comment Pensent les Ordinateurs"
description: "Apprenez à lire le code binaire, pourquoi les ordinateurs utilisent des 1 et 0, et comment faire des calculs avec notre Calculatrice Binaire."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "binary-calculator"
faqs:
  - question: "Comment convertir rapidement un grand nombre binaire en hexadécimal ?"
    answer: "Comme 16 = 2⁴, chaque chiffre hexadécimal correspond exactement à un groupe de 4 bits (un quartet). Il suffit de découper le nombre binaire par tranches de 4 bits en partant de la droite, puis de traduire chaque quartet entre 0 et F (par exemple 1101 = D et 0110 = 6, donc 11010110₂ = 0xD6)."
  - question: "Comment les ordinateurs représentent-ils les nombres négatifs en binaire ?"
    answer: "Les processeurs utilisent presque universellement le complément à deux. Sur 8 bits, le bit de poids fort vaut −128 au lieu de +128 : pour obtenir l'opposé d'un nombre, on inverse tous ses bits (complément à un) puis on ajoute 1. Ce codage permet d'utiliser exactement les mêmes circuits additionneurs pour l'addition et la soustraction."
  - question: "Quelle est la différence entre un bit, un octet (byte) et un mot processeur ?"
    answer: "Un bit (binary digit) est l'unité élémentaire valant 0 ou 1. Un octet (byte en anglais) regroupe 8 bits et peut coder 256 valeurs distinctes (de 0 à 255). Le mot (word) correspond à la taille naturelle des registres traités en une seule instruction par le processeur, généralement 32 bits ou 64 bits sur les architectures modernes."
  - question: "Pourquoi 1 kilooctet vaut-il parfois 1 000 octets et parfois 1 024 octets ?"
    answer: "Selon le Système international (SI), le préfixe kilo désigne 1 000 (10³), valeur utilisée par les fabricants de disques durs et les débits réseau. En mémoire vive (RAM), l'adressage repose sur des puissances de 2, soit 2¹⁰ = 1 024 octets. Pour lever l'ambiguïté, la norme CEI 60027-2 définit les préfixes binaires kibioctet (Kio = 1 024 octets) et mébioctet (Mio = 1 048 576 octets)."
  - question: "Comment les nombres à virgule sont-ils codés en binaire selon la norme IEEE 754 ?"
    answer: "La norme IEEE 754 représente un nombre flottant à l'aide de trois champs : 1 bit de signe, un exposant décalé (8 bits en simple précision 32 bits, 11 bits en double précision 64 bits) et une mantisse normalisée (23 ou 52 bits). Comme certaines fractions décimales (tel 0,1) deviennent infinies et périodiques en base 2, des écarts d'arrondi infimes apparaissent dans les calculs flottants."
---

Chaque fichier texte, image, flux audio ou instruction exécutée par un processeur repose sur le **système binaire** (base 2), qui ne manipule que deux symboles : `0` et `1`. Contrairement au système décimal (base 10) hérité de nos dix doigts, le binaire s'adapte directement à la physique des semi-conducteurs : un transistor CMOS distingue de manière extrêmement fiable deux niveaux de tension (état bas `0 V` = `0`, état haut `Vdd` = `1`), offrant une immunité au bruit électrique très supérieure à un codage à dix paliers de tension.

Dans cette notation positionnelle, chaque chiffre — appelé **bit** (*binary digit*) — porte un poids égal à une puissance de `2` croissante de droite à gauche (`1, 2, 4, 8, 16, 32, 64, 128…`). Pour additionner, soustraire, multiplier ou diviser des séquences binaires sans erreur de retenue, essayez notre [Calculatrice Binaire](/fr/calculatrices/calculatrice-binaire).

## Système positionnel en base 2 et logique booléenne

En base 10, un nombre s'écrit comme une somme de puissances de `10`. En base 2, la même règle s'applique avec des puissances de `2` :

```text
Valeur décimale : N = bₙ × 2ⁿ + ... + b₂ × 2² + b₁ × 2¹ + b₀ × 2⁰

Règles d'addition binaire (bit à bit) :
  0 + 0 = 0
  0 + 1 = 1
  1 + 0 = 1
  1 + 1 = 0  (avec retenue de 1 au rang supérieur, soit 10₂)
  1 + 1 + 1 = 1  (avec retenue de 1 au rang supérieur, soit 11₂)
```

Huit bits regroupés forment un **octet**, capable de coder `2⁸ = 256` états distincts (`0` à `255` en entier non signé, ou `-128` à `+127` en entier signé par complément à deux). Au niveau matériel, les unités arithmétiques et logiques (ALU) combinent des portes logiques élémentaires — **ET (`AND`)**, **OU (`OR`)**, **OU exclusif (`XOR`)** et **NON (`NOT`)** — pour réaliser toutes les opérations mathématiques et comparaisons en quelques nanosecondes.

## Exemples chiffrés étape par étape : conversions et addition sur 8 bits

### 1. Convertir le binaire `11010110₂` en décimal

Associons à chacun des `8` bits sa puissance de `2`, de gauche (`2⁷ = 128`) à droite (`2⁰ = 1`) :

```text
Bit     :   1     1     0     1     0     1     1     0
Poids   : 128    64    32    16     8     4     2     1
Somme   : 128 +  64 +   0 +  16 +   0 +   4 +   2 +   0 = 214
```

Le nombre binaire `11010110₂` vaut donc exactement `214` en base 10.

### 2. Convertir le décimal `173` en binaire (divisions par 2)

On divise successivement par `2` en relevant chaque reste (`0` ou `1`), puis on lit les restes de bas en haut :

- `173 ÷ 2 = 86`, reste `1` (poids faible)
- `86 ÷ 2 = 43`, reste `0`
- `43 ÷ 2 = 21`, reste `1`
- `21 ÷ 2 = 10`, reste `1`
- `10 ÷ 2 = 5`, reste `0`
- `5 ÷ 2 = 2`, reste `1`
- `2 ÷ 2 = 1`, reste `0`
- `1 ÷ 2 = 0`, reste `1` (poids fort)

En lisant du dernier reste au premier, on obtient `10101101₂` (`128 + 32 + 8 + 4 + 1 = 173`).

### 3. Additionner `01011100₂` (`92`) et `00110111₂` (`55`)

En alignant les bits à droite et en propageant les retenues de droite à gauche :

```text
Retenues : 1 1 1 1 1 0 0 -
Nombre A : 0 1 0 1 1 1 0 0  (92)
Nombre B : 0 0 1 1 0 1 1 1  (55)
────────────────────────────
Somme    : 1 0 0 1 0 0 1 1  (147)
```

Vérification : `128 + 16 + 2 + 1 = 147`, ce qui concorde avec `92 + 55 = 147`.

## Tableau de correspondance : décimal, binaire, hexadécimal et usages

Pour raccourcir l'écriture des séquences binaires longues, les informaticiens utilisent l'**hexadécimal** (base 16, chiffres `0–9` et lettres `A–F`), car un chiffre hexadécimal condense exactement `4` bits :

| Décimal (`base 10`) | Binaire (`8 bits`) | Hexadécimal (`base 16`) | Octal (`base 8`) | Usage ou signification courante |
| :---: | :---: | :---: | :---: | :--- |
| `0` | `0000 0000` | `0x00` | `000` | Octet nul (`NUL` en ASCII) |
| `10` | `0000 1010` | `0x0A` | `012` | Saut de ligne Unix (`LF`) |
| `15` | `0000 1111` | `0x0F` | `017` | Masque binaire sur un quartet bas (`4` bits) |
| `42` | `0010 1010` | `0x2A` | `052` | Caractère astérisque (`*`) en table ASCII |
| `127` | `0111 1111` | `0x7F` | `177` | Valeur maximale d'un entier signé 8 bits |
| `192` | `1100 0000` | `0xC0` | `300` | Premier octet des réseaux privés `192.168.x.x` |
| `255` | `1111 1111` | `0xFF` | `377` | Masque de sous-réseau IPv4 complet (`2⁸ − 1`) |

## Cas d'usage concrets, pièges courants et précision numérique

Le calcul binaire intervient quotidiennement dans l'administration réseau, le développement embarqué et la sécurité informatique :

- **Masques réseau IPv4 et droits Unix :** Un masque `/24` (`255.255.255.0`) active `24` bits à `1` suivis de `8` bits à `0` pour isoler la partie réseau d'une adresse IP par opération `AND`. De même, les droits d'accès Unix (`chmod 755`) traduisent trois triplets binaires (`111` = lecture/écriture/exécution, `101` = lecture/exécution).
- **Dépassement de capacité (*overflow*) :** Sur un registre non signé de `8` bits, `255 + 1` provoque un dépassement et boucle à `0` (`00000000₂`). En arithmétique signée, ajouter `1` à `+127` (`01111111₂`) bascule vers `-128` (`10000000₂`), une faille classique en C/C++ exploitée en sécurité logicielle.
- **Ordre des octets (*endianness*) :** Les processeurs x86-64 stockent les entiers multi-octets en *little-endian* (octet de poids faible à l'adresse basse), alors que les protocoles réseau (TCP/IP) imposent le *big-endian*.
- **Arrondis flottants IEEE 754 :** Tout comme `1/3` ne s'écrit pas de façon finie en base 10 (`0,333…`), `0,1` en base 10 devient une fraction binaire infinie (`0,0001100110011…₂`). C'est pourquoi `0,1 + 0,2` vaut `0,30000000000000004` en virgule flottante double précision ; pour les montants financiers en euros, on privilégie le calcul entier en centimes ou la virgule fixe décimale.
