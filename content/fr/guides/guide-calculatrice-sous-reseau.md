---
title: "Subnetting : Diviser le Réseau"
description: "Maîtrisez le découpage en sous-réseaux IPv4 (subnetting) : notation CIDR, masques de sous-réseau, calcul du nombre d'hôtes, méthode VLSM, exemple chiffré et tableau de référence."
category: "Productivity & Utilities"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "subnet-calculator"
faqs:
  - question: "Pourquoi diviser un grand réseau IPv4 en plusieurs sous-réseaux ?"
    answer: "Le découpage en sous-réseaux limite la taille des domaines de diffusion (broadcast), réduisant ainsi le bruit réseau inutile sur chaque lien. Il renforce également la sécurité en isolant les services (employés, invités, serveurs, objets connectés) via des règles de pare-feu entre VLAN, et évite le gaspillage d'adresses IP."
  - question: "Que signifie exactement la notation CIDR /24 ou /28 ?"
    answer: "Le suffixe CIDR (Classless Inter-Domain Routing), noté /N, indique le nombre de bits consécutifs à 1 dédiés à l'identification du réseau dans une adresse IPv4 de 32 bits. En /24, 24 bits identifient le réseau et 8 bits restent pour les hôtes (254 adresses utilisables). En /28, 28 bits codent le réseau et 4 bits restent pour les hôtes (14 adresses utilisables)."
  - question: "Pourquoi retranche-t-on toujours 2 adresses au nombre total d'hôtes d'un sous-réseau ?"
    answer: "Dans un sous-réseau IPv4 standard, la toute première adresse (tous les bits hôtes à 0) identifie le réseau lui-même, et la toute dernière (tous les bits hôtes à 1) sert d'adresse de diffusion (broadcast) vers toutes les machines du segment. Aucune de ces deux adresses ne peut être attribuée à une interface hôte, d'où la formule 2^h − 2."
  - question: "Quelle est la différence entre le subnetting classique (FLSM) et le VLSM ?"
    answer: "Le FLSM (Fixed-Length Subnet Mask) découpe un bloc parent en sous-réseaux de taille identique, ce qui gaspille des adresses dès que les besoins varient. Le VLSM (Variable-Length Subnet Mask) adapte la taille de chaque sous-réseau au nombre réel d'équipements d'un service (par exemple un /25 pour 100 postes et un /30 pour une liaison routeur)."
  - question: "Existe-t-il des sous-réseaux utilisables avec seulement 2 adresses IP sans perte ?"
    answer: "Oui. La norme RFC 3021 autorise l'usage du masque /31 (255.255.255.254) sur les liaisons point-à-point entre deux routeurs. Dans ce cas particulier, les deux adresses disponibles servent directement aux deux extrémités du lien, sans adresse réseau ni adresse de broadcast dédiée."
---

Le **subnetting** (découpage en sous-réseaux) consiste à segmenter un bloc d'adresses IPv4 unique en plusieurs réseaux logiques autonomes. Chaque sous-réseau forme un domaine de diffusion (*broadcast domain*) indépendant : les requêtes ARP et annonces locales restent confinées à leur segment au lieu de saturer l'ensemble du réseau.

Pour diviser une plage IPv4, on emprunte des bits initialement attribués aux hôtes afin d'étendre le préfixe réseau (`CIDR`). Cette segmentation permet d'adapter la capacité de chaque service et de structurer le routage. Notre [Calculatrice de Sous-réseau](/fr/calculatrices/calculateur-de-sous-reseau) automatise ces calculs binaires et prévient tout chevauchement d'adresses.

## Masque de sous-réseau et formules CIDR

Une adresse IPv4 comporte `32` bits répartis en `4` octets. Le masque sépare la partie **réseau** (bits à `1` à gauche) de la partie **hôte** (bits à `0` à droite). En notation **CIDR** (*Classless Inter-Domain Routing*), le préfixe `/n` indique simplement ce nombre de bits réseau.

Lorsque vous divisez un réseau parent `/n_initial` vers un préfixe `/n_nouveau`, vous empruntez `s` bits à la partie hôte, laissant `h` bits disponibles pour les machines :

```text
Bits empruntés            : s = n_nouveau − n_initial
Bits hôtes restants       : h = 32 − n_nouveau
Sous-réseaux créés        : N_sous-réseaux = 2^s
Adresses totales par bloc : N_total = 2^h
Hôtes utilisables         : N_hôtes = 2^h − 2   (pour n ≤ 30)
Pas (incrément d'adresse) : Pas = 256 − octet_masque_intéressant
```

L'octet intéressant est le premier octet du masque strictement inférieur à `255`. Calculer le `Pas` permet d'énumérer les blocs successifs par simple addition.

### Segmentation fixe (FLSM) ou à longueur variable (VLSM)

En **FLSM** (*Fixed-Length Subnet Mask*), tous les sous-réseaux partagent le même masque : diviser `192.168.1.0/24` en quatre `/26` (`s = 2`, soit `2^2 = 4` sous-réseaux) donne quatre blocs de `62` hôtes, ce qui gaspille `60` IP sur une simple liaison à `2` routeurs. Le **VLSM** (*Variable-Length Subnet Mask*) ajuste chaque préfixe au besoin réel en effectuant des découpages successifs sur des blocs de tailles différentes, à condition d'allouer toujours les plus grands sous-réseaux en premier pour respecter l'alignement binaire sur les puissances de `2`.

En complément, la technique inverse appelée **agrégation de routes** (*supernetting* ou *route summarization*) regroupe plusieurs sous-réseaux contigus sous un préfixe CIDR plus court (par exemple quatre `/24` réunis en un seul `/22`). Cela allège considérablement les tables de routage des routeurs centraux et accélère la convergence réseau.

## Exemple chiffré : plan d'adressage VLSM d'une PME

Vous devez répartir le bloc privé `192.168.10.0/24` (`256` adresses de `.0` à `.255`) entre quatre besoins classés par taille décroissante, en choisissant le plus petit exposant `h` tel que `2^h − 2 ≥ besoin` :

1. **Production (`100` postes) :** `2^6 − 2 = 62` ne suffit pas ; `2^7 − 2 = 126` convient (`h = 7`, `/25`, masque `255.255.255.128`, pas `128`). Bloc : `192.168.10.0/25` (`.0` à `.127`, hôtes `.1` à `.126`).
2. **Ingénierie (`50` postes) :** `2^6 − 2 = 62` convient (`h = 6`, `/26`, masque `255.255.255.192`, pas `64`). Bloc suivant : `192.168.10.128/26` (`.128` à `.191`, hôtes `.129` à `.190`).
3. **Direction et RH (`25` postes) :** `2^5 − 2 = 30` convient (`h = 5`, `/27`, masque `255.255.255.224`, pas `32`). Bloc suivant : `192.168.10.192/27` (`.192` à `.223`, hôtes `.193` à `.222`).
4. **Liaison WAN (`2` routeurs) :** `2^2 − 2 = 2` convient (`h = 2`, `/30`, masque `255.255.255.252`, pas `4`). Bloc suivant : `192.168.10.224/30` (`.224` à `.227`, hôtes `.225` et `.226`).

Cet agencement consomme `128 + 64 + 32 + 4 = 228` adresses et laisse `28` adresses libres (`192.168.10.228` à `.255`) pour de futures extensions.

## Tableau de référence des masques CIDR courants

| CIDR | Masque décimal | Bits (`h`) | Total (`2^h`) | Hôtes (`2^h − 2`) | Pas (4ᵉ octet) | Usage courant |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/24` | `255.255.255.0` | `8` | `256` | `254` | `256` (3ᵉ oct. `1`) | LAN standard ou grand VLAN |
| `/25` | `255.255.255.128` | `7` | `128` | `126` | `128` | Étage de bureaux ou service |
| `/26` | `255.255.255.192` | `6` | `64` | `62` | `64` | Département PME ou Wi-Fi |
| `/27` | `255.255.255.224` | `5` | `32` | `30` | `32` | Petit service ou DMZ |
| `/28` | `255.255.255.240` | `4` | `16` | `14` | `16` | Administration / IPMI |
| `/29` | `255.255.255.248` | `3` | `8` | `6` | `8` | Bloc IP publiques pare-feu |
| `/30` | `255.255.255.252` | `2` | `4` | `2` | `4` | Liaison WAN point-à-point |

## Cas d'usage et erreurs classiques à éviter

### Segmentation par VLAN et architectures cloud

En production, chaque sous-réseau correspond généralement à un **VLAN** distinct (postes utilisateurs, téléphonie VoIP, caméras, Wi-Fi invité). Cette séparation facilite la qualité de service (QoS) et permet au pare-feu de bloquer les déplacements latéraux en cas d'intrusion. Le même principe régit les réseaux virtuels cloud (AWS VPC, Azure VNet) pour isoler les sous-réseaux publics des bases de données privées.

### Pièges d'adressage fréquents

- **Oublier la passerelle et les équipements fixes :** `30` postes ne tiennent pas dans un `/27` (`30` hôtes utiles) dès que l'on ajoute l'IP du routeur (`.1`), des bornes Wi-Fi et des imprimantes. Prévoyez toujours `20 %` à `30 %` de réserve.
- **Allouer les petits blocs avant les grands en VLSM :** placer un `/28` en `.0` puis tenter de démarrer un `/25` en `.16` échoue, car un `/25` doit commencer sur un multiple de `128` (`.0` ou `.128`).
- **Utiliser des IP hors RFC 1918 en interne :** cantonnez vos LAN privés aux plages `10.0.0.0/8`, `172.16.0.0/12` ou `192.168.0.0/16` afin d'éviter tout conflit avec Internet.
