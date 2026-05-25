---
title: "Calculateur de sous-réseau IP"
description: "Calculez les plages de sous-réseau IPv4, les blocs CIDR, les masques génériques, les plages d'adresses IP utilisables et concevez des réseaux optimisés avec le planificateur VLSM."
metaTitle: "Calculateur de sous-réseau IP | Calculateur CIDR, VLSM et plages IP"
metaDescription: "Calculateur de sous-réseau IP gratuit en ligne. Calculez facilement les sous-réseaux, les masques génériques, les plages d'adresses IP utilisables, les classes réseau et les plans VLSM."
metaKeywords: "calculateur de sous-reseau ip, calculateur de sous-reseau, calculateur cidr, calculateur vlsm, masque de sous-reseau, masque generique, adresse reseau, adresse de diffusion, adresse broadcast, adressage ipv4"
faqs:
  - question: "Qu'est-Fi qu'un sous-réseau IP ?"
    answer: "Un sous-réseau (ou subnetwork) est une subdivision logique d'un réseau IP. Diviser un grand réseau en sous-réseaux plus petits et distincts améliore l'efficacité du routage, renforce la sécurité et réduit le trafic de diffusion (broadcast) en isolant les communications réseau locales."
  - question: "Que signifie CIDR ?"
    answer: "CIDR signifie Classless Inter-Domain Routing (routage inter-domaine sans classe). Il s'agit d'une méthode d'allocation des adresses IP et de routage des paquets IP qui a remplacé l'ancienne architecture réseau par classe. Le CIDR utilise une notation de préfixe (ex. /24) pour indiquer la taille du masque."
  - question: "Comment calcule-t-on le nombre d'hôtes utilisables dans un sous-réseau ?"
    answer: "Le nombre d'hôtes utilisables est calculé à l'aide de la formule 2^(32 - N) - 2, où N est la longueur du préfixe CIDR (bits du masque de sous-réseau). Nous soustrayons 2 car la première adresse est réservée à l'adresse réseau et la dernière adresse est réservée à l'adresse de diffusion."
  - question: "Quelle est la différence entre les adresses IP publiques et privées ?"
    answer: "Les adresses IP publiques sont uniques à l'échelle mondiale et routables sur le réseau Internet public. Les adresses IP privées (définies dans la RFC 1918) sont réservées aux réseaux locaux (LAN) et ne sont pas routables sur Internet, nécessitant une traduction d'adresse réseau (NAT) pour accéder aux ressources externes."
  - question: "Quel est le but d'une adresse de diffusion (broadcast) ?"
    answer: "Une adresse de diffusion est une adresse réseau spéciale utilisée pour transmettre simultanément des paquets à tous les appareils actifs sur un sous-réseau spécifique. En IPv4, l'adresse de diffusion est la toute dernière adresse de la plage du sous-réseau."
  - question: "Qu'est-ce qu'un masque générique (wildcard mask) ?"
    answer: "Un masque générique est l'inverse bit à bit d'un masque de sous-réseau (calculé par ~masque_de_sous_reseau). Il est couramment utilisé dans les routeurs Cisco, les listes de contrôle d'accès (ACL) et les protocoles de routage (comme OSPF) pour spécifier quels bits d'une adresse IP doivent correspondre."
  - question: "Qu'est-ce que le VLSM (Variable Length Subnet Masking) ?"
    answer: "Le VLSM permet aux concepteurs réseau de partitionner un espace d'adresses IP en plusieurs sous-réseaux de tailles variables en fonction des besoins en hôtes de chaque segment. Cela évite le gaspillage d'adresses IP qui se produit avec le masque de sous-réseau de longueur fixe (FLSM)."
  - question: "Quelle est la plage d'adresses APIPA ?"
    answer: "APIPA (Automatic Private IP Addressing) utilise le bloc d'adresses IP 169.254.0.0/16. Les systèmes d'exploitation attribuent automatiquement une adresse de cette plage à une interface réseau lorsqu'aucun serveur DHCP n'est disponible et qu'aucune adresse IP statique n'est configurée."
  - question: "Pourquoi l'adresse de bouclage (loopback) 127.0.0.1 est-elle utilisée ?"
    answer: "La plage IP 127.0.0.0/8 est réservée aux opérations de bouclage. L'adresse 127.0.0.1 (souvent appelée 'localhost') permet à un ordinateur d'envoyer du trafic réseau à lui-même, ce qui est essentiel pour les tests locaux, les diagnostics et l'exécution de services locaux."
  - question: "En quoi le sous-réseau IPv6 diffère-t-il du sous-réseau IPv4 ?"
    answer: "L'IPv6 utilise des adresses de 128 bits (contre 32 bits pour l'IPv4), ce qui signifie qu'il dispose d'un pool d'adresses pratiquement inépuisable. Les sous-réseaux IPv6 sont généralement standardisés autour d'une longueur de préfixe /64 pour les segments locaux, et n'utilisent pas d'adresses de diffusion traditionnelles, s'appuyant plutôt sur le multicast."
---

# Guide avancé sur le sous-réseau IP et le masque de sous-réseau de longueur variable (VLSM)

Dans l'architecture des systèmes numériques modernes, la communication sur Internet est régie par le protocole Internet (IP). Pour que les appareils puissent communiquer à l'échelle mondiale ou au sein de réseaux locaux (LAN), les paquets de données doivent être acheminés vers leurs destinations avec précision.

À mesure que les réseaux gagnent en complexité et en taille, l'attribution d'un seul bloc massif d'adresses IP à une organisation devient inefficace. **Le sous-réseau IP** est la principale technique d'ingénierie utilisée pour diviser un réseau physique unique en plusieurs sous-réseaux plus petits et logiquement isolés.

Ce guide propose un examen complet du sous-réseau IP, de la notation CIDR, de l'arithmétique binaire derrière les masques de réseau, des classes de réseau et des calculs de masques de sous-réseau de longueur variable (VLSM).

---

## 1. L'anatomie d'une adresse IPv4

Une adresse Internet Protocol version 4 (IPv4) est un **nombre binaire de 32 bits** contenant une séquence de 32 uns et zéros. Pour la lisibilité humaine, ce bloc de 32 bits est représenté en **notation décimale à points**, composée de quatre nombres décimaux (chacun allant de 0 à 255) séparés par des points.

Chacune de ces quatre sections est appelée un **octet** car elle représente 8 bits ($2^8 = 256$ valeurs possibles) :

$$\text{Adresse IP (décimale à points) : } 192.168.1.10$$
$$\text{Adresse IP (binaire) : } 11000000.10101000.00000001.00001010$$

Chaque adresse IP est divisée en deux composants distincts :
1.  **Partie réseau :** Identifie le réseau spécifique auquel appartient l'appareil.
2.  **Partie hôte :** Identifie l'appareil spécifique (ordinateur, imprimante, interface de routeur) au sein de ce réseau.

La frontière entre la partie réseau et la partie hôte est définie par le **Masque de sous-réseau**.

---

## 2. Masques de sous-réseau et notation CIDR

Un **Masque de sous-réseau** est un masque de 32 bits où tous les bits réseau sont définis sur `1` et tous les bits hôtes sont définis sur `0`. En effectuant une opération logique `AND` bit à bit entre l'adresse IP et le masque de sous-réseau, un routeur isole l'adresse réseau.

Par exemple, en utilisant un masque de classe C standard :
```
Adresse IP :          192.168.1.10   ->  11000000.10101000.00000001.00001010
Masque de sous-réseau : 255.255.255.0  ->  11111111.11111111.11111111.00000000
------------------------------------------------------------------------
IP Réseau :           192.168.1.0    ->  11000000.10101000.00000001.00000000
```

### Routage inter-domaine sans classe (CIDR)
Historiquement, les adresses IP étaient liées à des masques de sous-réseau rigides basés sur des structures de classes. En 1993, la notation **CIDR (Classless Inter-Domain Routing)** a été introduite pour remplacer l'adressage par classe.

Le CIDR utilise une barre oblique `/` suivie du nombre de bits réseau actifs (les uns) dans le masque de sous-réseau. C'est ce qu'on appelle la **Longueur du préfixe** :

*   **255.255.255.0** contient 24 uns, il s'écrit donc **/24**.
*   **255.255.0.0** contient 16 uns, il s'écrit donc **/16**.
*   **255.255.255.240** contient 28 uns, il s'écrit donc **/28**.

---

## 3. Dérivations mathématiques du sous-réseau

Le calcul des limites de sous-réseau nécessite de l'arithmétique binaire. Pour toute longueur de préfixe donnée $N$ :

### 1. Allocations IP totales
Le nombre total d'adresses IP contenues dans le bloc ($IP_{total}$) est de :
$$IP_{total} = 2^{32 - N}$$

### 2. Capacité d'hôte utilisable
Dans tout sous-réseau, deux adresses sont réservées aux infrastructures réseau :
*   **Adresse réseau :** La première adresse où tous les bits d'hôte sont `0`. Utilisée pour identifier le bloc de sous-réseau dans les tables de routage.
*   **Adresse de diffusion (broadcast) :** La dernière adresse où tous les bits d'hôte sont `1`. Utilisée pour envoyer des paquets à tous les hôtes du sous-réseau.

Ainsi, le nombre d'adresses d'hôtes attribuables ($H_{usable}$) est de :
$$H_{usable} = 2^{32 - N} - 2$$

*Remarque : pour les liaisons de routeur point à point (/31 et /32), les normes modernes (RFC 3021) permettent l'omission des adresses réseau/diffusion, ce qui donne respectivement 2 et 1 hôtes.*

### 3. Masque générique (Wildcard)
Un masque générique est l'inverse du masque de sous-réseau, calculé comme suit :
$$\text{Masque générique} = 255.255.255.255 - \text{Masque de sous-réseau}$$

---

## 4. Structure d'adressage réseau par classe

Avant le CIDR, l'espace IPv4 était partitionné en cinq classes en fonction des valeurs du premier octet :

| Classe | Plage (Premier octet) | Masque par défaut | Objectif | Hôtes max par réseau |
| :--- | :--- | :--- | :--- | :--- |
| **Classe A** | $1 - 126$ | $255.0.0.0$ (/8) | Grandes organisations | $16 777 214$ |
| **Classe B** | $128 - 191$ | $255.255.0.0$ (/16) | Moyennes entreprises | $65 534$ |
| **Classe C** | $192 - 223$ | $255.255.255.0$ (/24) | Petits réseaux | $254$ |
| **Classe D** | $224 - 239$ | N/A | Groupes de multidifusion | N/A |
| **Classe E** | $240 - 255$ | N/A | Recherche scientifique | N/A |

*Remarque : la valeur du premier octet 127 est exclue de la classe A car elle est réservée aux tests de bouclage locaux (ex. 127.0.0.1).*

---

## 5. Adresses IP publiques ou privées

Pour conserver le pool limité d'adresses IPv4, l'IETF (Internet Engineering Task Force) a réservé des blocs d'adresses spécifiques pour les déploiements de réseaux privés internes (RFC 1918). Ces adresses sont ignorées par les routeurs Internet publics.

### 1. Plages privées RFC 1918
*   **10.0.0.0 à 10.255.255.255** (préfixe /8)
*   **172.16.0.0 à 172.31.255.255** (préfixe /12)
*   **192.168.0.0 à 192.168.255.255** (préfixe /16)

### 2. APIPA (Automatic Private IP Addressing)
*   **169.254.0.0 à 169.254.255.255** (préfixe /16)
*   Utilisé par les systèmes d'exploitation pour configurer automatiquement une connexion réseau lorsque le DHCP est indisponible.

---

## 6. Masque de sous-réseau de longueur variable (VLSM)

**Le VLSM (Variable Length Subnet Masking)** est une technique de routage avancée dans laquelle les sous-réseaux d'un même bloc d'adresses général peuvent avoir des tailles différentes. Cela permet aux administrateurs réseau d'allouer des sous-réseaux adaptés aux besoins spécifiques en hôtes de chaque département, minimisant ainsi le gaspillage d'adresses.

### La méthodologie de conception VLSM :
1.  **Répertorier les besoins en hôtes :** Notez les besoins en taille de tous les segments, y compris les liaisons de routeur point à point (qui nécessitent 2 hôtes).
2.  **Trier par taille :** Triez les segments par ordre décroissant (du plus grand segment au plus petit). **C'est une étape cruciale** car l'allocation des sous-réseaux plus petits en premier peut fragmenter l'espace d'adressage.
3.  **Allouer les blocs :** Pour chaque segment :
    *   Trouvez la plus petite taille de bloc ($2^k$) pouvant accueillir les hôtes requis plus les 2 adresses réservées.
    *   Trouvez le préfixe CIDR correspondant ($32 - k$).
    *   Attribuez l'adresse de départ, calculez le réseau, la diffusion et la plage.
    *   Démarrez le segment suivant immédiatement à la limite IP disponible suivante.
