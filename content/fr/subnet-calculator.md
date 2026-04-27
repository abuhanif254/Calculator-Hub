---
title: "Calculateur de Sous-réseau"
description: "Calculez vos sous-réseaux IPv4, vos adresses réseau et de diffusion (broadcast), ainsi que vos plages d'adresses IP utilisables selon le CIDR."
metaTitle: "Calculateur de Sous-réseau (Subnet) | IPv4 & CIDR"
metaDescription: "Calculateur de masque de sous-réseau gratuit. Calculez les plages IP, adresses de broadcast et l'hôte maximal utilisable via la notation CIDR."
metaKeywords: "calculateur de sous-reseau, masque de sous reseau, ipv4, calculateur cidr, adresse broadcast, plage ip, reseau informatique"
---

## Qu'est-ce qu'un Calculateur de Sous-réseau ?
Un **Calculateur de Sous-réseau** est un outil de de diagnostic réseau utilisé par les administrateurs systèmes et les ingénieurs pour partitionner une structure IP (IPv4) en réseaux logiques plus petits (les sous-réseaux).

Tenter de cerner manuellement les limites binaires exactes d'une adresse de type `192.168.1.0/24` entraîne souvent des erreurs. Notre calculateur analyse instantanément n'importe quelle configuration IPv4 couplée au suffixe CIDR afin de cartographier la Base du réseau, son point de Diffusion absolu (Broadcast), ainsi que toutes les adresses hôtes disponibles.

### Notation CIDR et Masque de Sous-réseau
Au lieu d'écrire de longs masques contraignants tels que `255.255.255.0`, l'informatique moderne utilise la normalisation **CIDR** (ex: `/24`).
*   Un masque **/24** indique que les 24 premiers bits constituent l'adresse réseau, laissant les 8 derniers pour les différents équipements informatiques, soit 256 adresses IP au total.
*   Notre outil vous permet d'ajuster le CIDR en direct, voyant mathématiquement se réduire ou s'étendre votre parc informatique IP.

### Plages Informatiques Utilisables
Dans chaque sous-réseau standardisé, deux adresses exactes sont inaccessibles au matériel (routeur, PC, serveur) :
1.  **L'Adresse Réseau :** La toute première adresse mathématique, servant à identifier le réseau auprès du routeur externe.
2.  **L'Adresse de Diffusion (Broadcast) :** L'adresse finale, utilisée par les paquets de données pour envoyer un ordre global à tous les appareils de ce réseau.
Le reliquat central équivaut à la **plage d'hôtes valide** ; un index géré automatiquement par notre outil.
