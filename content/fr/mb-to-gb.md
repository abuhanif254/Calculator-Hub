---
title: "Convertisseur Mo en Go (MB en GB) : Formule SI, Mio/Gio et tableau"
description: "Convertissez facilement vos Mo (MB) en Go (GB) selon la norme SI (÷ 1 000) ou binaire IEC en Gio (÷ 1 024). Formule exacte, exemples et tableau pratique."
faqs:
  - question: "Combien y a-t-il de Mo (MB) dans 1 Go (GB) ?"
    answer: "Selon le Système international d'unités (SI), 1 gigaoctet (Go ou GB) équivaut exactement à 1 000 mégaoctets (Mo ou MB). En informatique binaire (norme IEC), 1 gibioctet (Gio ou GiB) correspond à 1 024 mébioctets (Mio ou MiB)."
  - question: "Pourquoi mon disque dur de 500 Go affiche-t-il moins d'espace sous Windows ?"
    answer: "Les fabricants de disques SSD et HDD utilisent la base décimale SI (1 Go = 1 000 000 000 octets), tandis que l'Explorateur Windows calcule en base binaire IEC tout en affichant l'abréviation Go. Un SSD de 500 Go contient donc environ 465,66 Gio affichés comme 465 Go."
  - question: "Quelle est la différence entre un gigaoctet (Go) et un gibioctet (Gio) ?"
    answer: "Le gigaoctet (Go / GB) repose sur les puissances de 10 (10^9 octets = 1 000 Mo). Le gibioctet (Gio / GiB) repose sur les puissances de 2 (2^30 octets = 1 073 741 824 octets = 1 024 Mio), soit un écart d'environ 7,37 %."
  - question: "Les forfaits mobiles et la mémoire vive (RAM) utilisent-ils le facteur 1 000 ou 1 024 ?"
    answer: "Les opérateurs télécoms expriment les enveloppes de données mobiles en base décimale SI (1 Go = 1 000 Mo). À l'inverse, la mémoire vive (RAM) obéit à l'architecture binaire matérielle, où 1 Go de RAM correspond physiquement à 1 024 Mio (1 Gio)."
  - question: "Comment convertir rapidement des Mo en Go de tête ?"
    answer: "Pour une conversion décimale SI exacte, divisez la valeur en Mo par 1 000 en décalant la virgule de trois rangs vers la gauche (par exemple, 2 500 Mo = 2,5 Go). Pour estimer la valeur binaire Windows en Gio, multipliez le résultat SI par 0,9313."
---

Pour convertir des mégaoctets (Mo, ou MB en notation anglo-saxonne) en gigaoctets (Go, ou GB), deux constantes exactes existent selon le contexte technique : `Go = Mo ÷ 1 000` dans le Système international d'unités (base décimale SI), et `Gio = Mio ÷ 1 024` dans le système binaire normalisé par la Commission électrotechnique internationale (IEC).

Dans la vie courante, les fiches techniques de smartphones, les forfaits mobiles, les clés USB et les disques SSD utilisent le facteur décimal **1 000**. En revanche, la mémoire vive (RAM) et l'affichage système de Windows exploitent les puissances de deux avec le diviseur **1 024**. Connaître cette distinction évite toute erreur d'interprétation lors d'un achat ou d'un dimensionnement informatique.

## Formule de conversion exacte et normes internationales (SI et IEC)

La dualité entre base 10 et base 2 a longtemps engendré une confusion dans l'industrie numérique. Depuis 1998, la norme internationale **IEC 60027-2**, reprise ensuite dans la norme **ISO/IEC 80000-13** et adoptée par le **NIST** ainsi que par le Bureau international des poids et mesures (BIPM), sépare formellement les préfixes décimaux des préfixes binaires :

- **Norme décimale (SI)** : `Go = Mo ÷ 1 000` (soit `1 Go = 10^3 Mo = 10^9 octets`). Les préfixes *méga-* et *giga-* conservent leur sens métrique universel.
- **Norme binaire (IEC)** : `Gio = Mio ÷ 1 024` (soit `1 Gio = 2^10 Mio = 2^30 octets = 1 073 741 824 octets`). Les préfixes *mébi-* (Mio) et *gibi-* (Gio) désignent strictement les multiples binaires.

Cette séparation garantit la cohérence avec les sciences physiques. En français, on emploie le symbole **o** pour *octet* (8 bits) plutôt que **B** (*byte*), bien que `MB` et `GB` restent fréquents dans les logiciels internationaux.

## Exemples pratiques de calcul étape par étape

### Exemple 1 : Estimer le poids d'une sauvegarde photo et vidéo (norme SI)

Vous souhaitez archiver un dossier contenant 48 500 Mo de photographies RAW et de séquences vidéo 4K sur un service de stockage en nuage facturé au gigaoctet décimal.

1. Identifiez la norme du fournisseur : les hébergeurs commerciaux facturent généralement en base SI (1 000).
2. Appliquez la formule : `Go = 48 500 ÷ 1 000`.
3. Déplacez la virgule de trois rangs vers la gauche : vous obtenez **48,5 Go**. Une offre de 50 Go suffit avec une marge de 1,5 Go (1 500 Mo).

### Exemple 2 : Comprendre l'espace réel d'un SSD de 512 Go sous Windows (norme IEC)

Vous achetez un SSD interne étiqueté « 512 Go » et souhaitez vérifier quelle capacité affichera l'Explorateur Windows.

1. Convertissez la capacité commerciale en octets selon la norme SI : `512 × 1 000 000 000 = 512 000 000 000 octets`.
2. Divisez par un gibioctet (`1 024³ = 1 073 741 824 octets`).
3. Calculez `512 000 000 000 ÷ 1 073 741 824 ≈ 476,84 Gio`. Windows affichera environ **476,8 Go** disponibles, sans anomalie matérielle.

### Exemple 3 : Suivre sa consommation de données mobiles (base décimale)

Votre smartphone affiche 15 360 Mo consommés sur un forfait incluant 20 Go d'internet mobile.

1. Les opérateurs appliquent la convention SI : `15 360 Mo ÷ 1 000 = 15,36 Go`.
2. Soustrayez cette valeur de l'enveloppe mensuelle : `20 - 15,36 = 4,64 Go`.
3. Il vous reste exactement **4,64 Go** (`4 640 Mo`) avant réduction de débit.

## Tableau de conversion rapide Mo (MB) vers Go (GB) et Gio (GiB)

Le tableau suivant rassemble les valeurs courantes en gigaoctets décimaux (SI) et en gibioctets binaires (IEC).

| Mo / MB | Go SI (GB) | Gio IEC (GiB) | Usage courant |
| :--- | :--- | :--- | :--- |
| 100 | 0,1 Go | 0,0977 Gio | Mise à jour applicative |
| 256 | 0,256 Go | 0,25 Gio | Cache système ou mémoire |
| 500 | 0,5 Go | 0,4883 Gio | Demi-gigaoctet commercial |
| 512 | 0,512 Go | 0,5 Gio | Demi-gibioctet RAM / GPU |
| 1 000 | 1 Go | 0,9766 Gio | Palier 1 Go SI (mobile) |
| 1 024 | 1,024 Go | 1 Gio | Palier exact 1 Gio IEC |
| 4 096 | 4,096 Go | 4 Gio | Limite fichier FAT32 |
| 10 000 | 10 Go | 9,7656 Gio | Forfait data ou sauvegarde |

*Note de lecture* : La colonne Gio suppose une entrée en mébioctets (Mio, comme sous Windows). Pour convertir un chiffre décimal pur en Gio, divisez par `1 073,7418`.

## Cas d'usage industriels et erreurs de conversion fréquentes

Plusieurs pièges récurrents expliquent les écarts constatés entre les outils, les systèmes d'exploitation et les contrats commerciaux :

- **Divergence entre Windows, macOS et Linux** : Depuis macOS 10.6, Apple applique la norme SI dans le Finder (`1 Go = 1 000 Mo`), affichant la capacité exacte inscrite sur la boîte d'un SSD. Linux distingue explicitement *Gio* et *Go*, tandis que Windows calcule en base 1 024 tout en affichant *Go*.
- **Confusion entre octets (Mo) et bits (Mb)** : Les débits réseau (fibre 1 Gbit/s ou 5G) sont mesurés en **mégabits**, pas en octets. Comme 1 octet vaut 8 bits, une ligne à 1 000 Mbit/s transfère au maximum `125 Mo/s`. Confondre `MB` et `Mb` fausse les calculs d'un facteur 8.
- **Surcharge du système de fichiers** : Un disque formaté en NTFS, APFS ou ext4 réserve 1 % à 4 % d'espace pour les tables d'allocation et métadonnées.
- **Dimensionnement de la RAM** : Les puces DRAM suivent l'architecture binaire JEDEC : une barrette « 16 Go » contient physiquement 16 Gio (`16 384 Mio`).
