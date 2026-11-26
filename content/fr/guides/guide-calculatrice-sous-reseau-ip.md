---
title: "Subnetting IP : Plages d'Hôtes et Broadcast"
description: "Calculez avec exactitude l'adresse réseau, le premier et le dernier hôte utilisable, l'adresse de broadcast et le masque générique (wildcard) d'une adresse IPv4 en notation CIDR."
category: "Productivity & Utilities"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "ip-subnet-calculator"
faqs:
  - question: "Comment distinguer une adresse hôte valide d'une adresse réseau ou de broadcast ?"
    answer: "Convertissez mentalement ou via le pas de masque la plage du sous-réseau : la toute première adresse de l'intervalle (bits hôtes tous à 0) est l'identifiant réseau et la toute dernière (bits hôtes tous à 1) est l'adresse de broadcast. Toute adresse strictement comprise entre ces deux bornes est assignable à un hôte."
  - question: "Une adresse se terminant par .0 ou .255 peut-elle être attribuée à un ordinateur ?"
    answer: "Oui, dès lors que le masque est plus large qu'un /24 (comme /23, /22 ou /16). Par exemple, dans le réseau 10.20.4.0/22 (de 10.20.4.0 à 10.20.7.255), les adresses 10.20.4.255 et 10.20.5.0 ne sont ni l'adresse réseau ni le broadcast : ce sont des adresses d'hôtes tout à fait valides."
  - question: "À quoi sert le masque générique (wildcard mask) affiché par les calculatrices IP ?"
    answer: "Le masque générique (ou inversé) indique par un 0 les bits d'adresse qui doivent correspondre exactement et par un 1 les bits ignorés. Il est indispensable pour rédiger des listes de contrôle d'accès (ACL) sur les routeurs Cisco ou déclarer les réseaux dans le protocole de routage OSPF."
  - question: "Pourquoi une machine ne peut-elle pas recevoir l'adresse de broadcast comme IP ?"
    answer: "Un paquet envoyé à l'adresse de broadcast dirigé est interprété par tous les hôtes du segment comme un message collectif. Si une carte réseau utilisait cette adresse en unicast, la pile TCP/IP rejetterait la configuration ou provoquerait des conflits et des tempêtes de trames sur le commutateur."
  - question: "Comment calculer rapidement la plage d'hôtes d'un masque atypique comme /27 ou /22 ?"
    answer: "Repérez l'octet du masque différent de 255 et de 0, puis calculez le pas : Pas = 256 − valeur_octet_masque. L'adresse réseau correspond au multiple du pas immédiatement inférieur ou égal à l'octet correspondant de l'IP, et le broadcast se situe une unité avant le multiple suivant."
---

Lorsque vous configurez un pare-feu, un commutateur ou un serveur DHCP, connaître le préfixe CIDR ne suffit pas : il faut identifier exactement l'**adresse réseau**, le **premier hôte**, le **dernier hôte** et l'**adresse de diffusion (*broadcast*)** associés à une adresse IPv4. Une erreur d'une seule unité provoque des défauts de routage silencieux ou des conflits de passerelle.

À partir de n'importe quelle adresse IPv4 et de son masque (`/n`), ces quatre bornes découlent d'opérations logiques bit-à-bit. Notre [Calculatrice de Sous-réseau IP](/fr/calculatrices/calculateur-de-sous-reseau-ip) restitue instantanément ces limites ainsi que le masque générique (*wildcard*) utilisé dans les routeurs professionnels.

## Anatomie d'un sous-réseau et opérations binaires

Chaque bloc IPv4 est délimité par quatre repères fondamentaux :

- **Adresse réseau (Network ID) :** borne inférieure du bloc, où tous les bits hôtes valent `0`. Elle identifie le segment dans les tables de routage et reste inutilisable pour un hôte.
- **Premier hôte utilisable :** `Adresse réseau + 1`, attribué par convention à la passerelle par défaut.
- **Dernier hôte utilisable :** `Adresse de broadcast − 1`, la plus haute IP assignable du segment.
- **Adresse de diffusion (*Broadcast*) :** borne supérieure du bloc, où tous les bits hôtes valent `1`. Tout paquet vers cette adresse cible l'ensemble du sous-réseau.

Les routeurs déterminent ces bornes par algèbre booléenne bit-à-bit (`AND` et `OR`) :

```text
Adresse réseau     = IP AND Masque
Masque générique   = 255.255.255.255 − Masque   (NOT Masque)
Adresse broadcast  = Adresse réseau OR Masque générique
Premier hôte       = Adresse réseau + 1
Dernier hôte       = Adresse broadcast − 1
Nombre d'hôtes     = 2^(32 − CIDR) − 2
```

### Méthode rapide du « pas »

Repérez l'octet du masque différent de `255` et de `0` (l'octet décisif), puis calculez `Pas = 256 − octet_masque`. L'octet de l'adresse réseau vaut `floor(octet_IP / Pas) × Pas` et celui du broadcast vaut `octet_réseau + Pas − 1`. Les octets à gauche restent inchangés ; ceux à droite passent à `0` (réseau) ou à `255` (broadcast).

## Exemple détaillé pas à pas : analyser `172.16.45.138/27`

Supposons qu'un serveur porte l'adresse `172.16.45.138/27` et que vous deviez vérifier la plage exacte autorisée dans le serveur DHCP.

**Étape 1 — Convertir `/27` en masque décimal et masque générique :**
`27` bits à `1` forment trois octets complets (`24` bits) plus `3` bits dans le 4ᵉ octet (`11100000` en binaire = `224`).
- Masque : `255.255.255.224`
- Masque générique (*wildcard*) : `255.255.255.255 − 255.255.255.224 = 0.0.0.31`

**Étape 2 — Isoler l'adresse réseau via le pas :**
L'octet décisif est le `4ᵉ` octet (`138` dans l'IP, `224` dans le masque).

```text
Pas = 256 − 224 = 32
Multiples de 32 : 0, 32, 64, 96, 128, 160, 192, 224
Borne inférieure : floor(138 / 32) × 32 = 4 × 32 = 128
```

En binaire, `138` (`10001010`) `AND` `224` (`11100000`) confirme `10000000 = 128`. L'**adresse réseau** est `172.16.45.128`.

**Étape 3 — Déduire le broadcast et la plage d'hôtes :**
En ajoutant le masque générique (`0.0.0.31`) à l'adresse réseau :
- **Broadcast :** `172.16.45.128 + 0.0.0.31 = 172.16.45.159` (le bloc suivant démarre à `.160`).
- **Premier hôte :** `172.16.45.129` ; **Dernier hôte :** `172.16.45.158`.
- **Hôtes utilisables :** `2^5 − 2 = 30` adresses (`158 − 129 + 1 = 30`).

## Tableau comparatif de bornes IPv4 calculées

| Entrée IP / CIDR | Adresse réseau | Plage d'hôtes utilisables | Adresse de broadcast | Masque générique | Hôtes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `10.20.5.77/22` | `10.20.4.0` | `10.20.4.1` – `10.20.7.254` | `10.20.7.255` | `0.0.3.255` | `1 022` |
| `192.168.1.42/24` | `192.168.1.0` | `192.168.1.1` – `192.168.1.254` | `192.168.1.255` | `0.0.0.255` | `254` |
| `172.16.10.200/26` | `172.16.10.192` | `172.16.10.193` – `172.16.10.254` | `172.16.10.255` | `0.0.0.63` | `62` |
| `172.16.45.138/27` | `172.16.45.128` | `172.16.45.129` – `172.16.45.158` | `172.16.45.159` | `0.0.0.31` | `30` |
| `192.0.2.19/29` | `192.0.2.16` | `192.0.2.17` – `192.0.2.22` | `192.0.2.23` | `0.0.0.7` | `6` |
| `198.51.100.10/31` | `198.51.100.10` | `198.51.100.10` – `198.51.100.11` | Aucune (RFC 3021) | `0.0.0.1` | `2` |

## Applications pratiques, sécurité et pièges à éviter

### Exploitation dans les ACL, OSPF et DHCP

Le masque générique est indispensable sur les routeurs Cisco IOS : une règle `access-list 10 permit 172.16.45.128 0.0.0.31` filtre précisément les `30` hôtes du `/27`. En routage dynamique OSPF, la commande `network 172.16.45.128 0.0.0.31 area 0` active le protocole sur les interfaces exactes du segment : un masque générique erroné risque d'annoncer par inadvertance des interfaces publiques exposées sur Internet.

Côté serveur DHCP, configurez l'étendue d'adresses en excluant impérativement l'adresse réseau, l'adresse de diffusion, la passerelle par défaut (souvent `.129`) ainsi que la réserve destinée aux équipements statiques (commutateurs d'accès, points d'accès Wi-Fi, imprimantes réseau et serveurs).

### Vigilances sur les super-réseaux et la diffusion

- **Adresses en `.0` et `.255` sous un masque `< /24` :** dans `10.20.4.0/22` (qui agrège quatre blocs `/24` de `10.20.4.0` à `10.20.7.255`), les adresses `10.20.4.255`, `10.20.5.0` et `10.20.6.255` ne sont ni des adresses réseau ni des adresses de broadcast : ce sont des adresses d'hôtes parfaitement valides entre `.4.1` et `.7.254`.
- **Blocage du broadcast dirigé :** maintenez l'instruction `no ip directed-broadcast` sur vos interfaces de routeur afin d'empêcher des attaquants externes d'amplifier du trafic vers l'adresse de diffusion d'un sous-réseau interne (attaque par réflexion dite *Smurf*).
- **Liaison point-à-point `/31` et route d'hôte `/32` :** conformément à la RFC 3021, un `/31` (`255.255.255.254`) n'utilise ni adresse réseau ni broadcast et attribue ses `2` IP directement aux deux routeurs reliés. Quant au `/32` (`255.255.255.255`), il désigne une interface unique (*loopback*, tunnel VPN ou règle pare-feu ciblée).
