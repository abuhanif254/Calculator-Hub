---
title: "Calculateur de Sous-réseau"
metaTitle: "Calculateur de Sous-réseau IPv4 | Masque CIDR et Plage IP"
description: "Calculez le masque de sous-réseau IPv4, l'adresse réseau, l'adresse de diffusion et la plage d'hôtes utilisables à partir d'une adresse IP et de sa notation CIDR."
metaDescription: "Calculez masque de sous-réseau IPv4, adresse réseau, adresse de diffusion et plage d'hôtes utilisables à partir d'une adresse IP et de son préfixe CIDR."
metaKeywords: "calculateur de sous-réseau, masque de sous-réseau, adressage ipv4, notation cidr, adresse réseau, adresse de diffusion, plage ip utilisable, découpage vlsm, réseau informatique"
faqs:
  - question: "Comment convertir rapidement un préfixe CIDR en masque de sous-réseau décimal ?"
    answer: "Un préfixe CIDR /p indique que les p premiers bits sur 32 valent 1 et les 32 - p suivants valent 0. Divisez p par 8 : le quotient donne le nombre d'octets à 255, et le reste r détermine l'octet partiel en additionnant les r premiers poids binaires de gauche (128, 64, 32, 16, 8, 4, 2, 1). Par exemple, /26 donne trois octets à 255 et 2 bits dans le quatrième octet (128 + 64 = 192), soit 255.255.255.192."
  - question: "Pourquoi retire-t-on deux adresses au total pour obtenir le nombre d'hôtes utilisables ?"
    answer: "Dans tout sous-réseau IPv4 classique (préfixe inférieur ou égal à /30), la toute première adresse — dont tous les bits d'hôte valent 0 — identifie le sous-réseau lui-même dans les tables de routage, tandis que la toute dernière — tous les bits d'hôte à 1 — sert d'adresse de diffusion vers tous les équipements du segment. Aucune de ces deux bornes ne peut donc être affectée à une machine, d'où la formule 2^(32 - p) - 2."
  - question: "Quand utiliser un sous-réseau /31 ou /32 plutôt qu'un /30 ?"
    answer: "Le préfixe /30 (2 hôtes utilisables sur 4 adresses) reste universel pour relier deux routeurs, mais la norme RFC 3021 autorise un préfixe /31 sur les liaisons point à point modernes afin d'exploiter les 2 adresses sans perte (aucune adresse réseau ni de diffusion n'y est nécessaire). Le préfixe /32 désigne quant à lui un hôte unique : il sert aux interfaces de bouclage, aux routes statiques ciblées et aux règles de filtrage pare-feu."
  - question: "Comment éviter les chevauchements d'adresses lors d'un plan d'adressage VLSM ?"
    answer: "En sous-réseautage à masque de longueur variable (VLSM), commencez toujours par allouer les sous-réseaux exigeant le plus grand nombre d'hôtes (donc le préfixe CIDR le plus petit), puis découpez les blocs restants par taille décroissante. Chaque sous-réseau de taille 2^h doit impérativement démarrer sur un multiple exact de 2^h dans l'octet concerné ; un mauvais alignement provoque des recouvrements de routes et des conflits d'adressage."
  - question: "Quelles plages IPv4 privées (RFC 1918) peut-on découper librement en réseau local ?"
    answer: "Trois blocs sont réservés aux réseaux privés non routables sur Internet public : 10.0.0.0/8 (16 777 216 adresses, idéal pour les grandes infrastructures multi-sites), 172.16.0.0/12 (de 172.16.0.0 à 172.31.255.255, soit 1 048 576 adresses) et 192.168.0.0/16 (65 536 adresses, très répandu en PME et sur les réseaux domestiques). La plage 100.64.0.0/10 (RFC 6598) est quant à elle dédiée à la traduction d'adresses opérateur."
---

La segmentation d'un réseau IPv4 en **sous-réseaux** fonde toute architecture informatique maîtrisée. Réunir des centaines de postes, serveurs et objets connectés dans un même domaine de diffusion sature le trafic local, alourdit le diagnostic et facilite la propagation latérale en cas d'intrusion. Le découpage isole chaque usage — bureautique, serveurs de production, téléphonie IP ou accès sans fil invités — derrière des frontières routées et filtrées par pare-feu.

Notre calculateur exécute instantanément les opérations binaires sur 32 bits à partir d'une adresse IPv4 et de son **préfixe CIDR** (`/0` à `/32`). Il fournit masque décimal, adresse réseau, adresse de diffusion, plage d'hôtes utilisables, capacités totale et exploitable (y compris `/31` et `/32`) ainsi que classe historique.

## Formules binaires du sous-réseautage IPv4

Une adresse IPv4 est un entier non signé de **$32\text{ bits}$** divisé en quatre octets de $8\text{ bits}$ ($0$ à $255$). Le préfixe CIDR `/p` ($0 \le p \le 32$) sépare **$p$ bits réseau** (à gauche) et **$h = 32 - p$ bits d'hôte** (à droite).

* **Masque de sous-réseau ($M$)** : suite binaire de $p$ bits à `1` suivis de $h$ bits à `0`.
* **Masque générique ($W$)** : complément bit à bit $W = \overline{M}$ (utilisé dans les listes de contrôle d'accès des routeurs).
* **Adresse réseau** (opération **ET** bit à bit) :
  $$A_{\text{réseau}} = A_{\text{IP}} \mathbin{\&} M$$
* **Adresse de diffusion** (opération **OU** bit à bit) :
  $$A_{\text{diffusion}} = A_{\text{réseau}} \mathbin{|} \overline{M}$$
* **Capacité d'adressage** :
  $$N_{\text{total}} = 2^{32 - p} = 2^{h} \qquad \text{et} \qquad N_{\text{utilisables}} = \begin{cases} 2^{h} - 2 & \text{si } p \le 30 \\ 2 & \text{si } p = 31 \text{ (RFC 3021)} \\ 1 & \text{si } p = 32 \text{ (hôte unique)} \end{cases}$$

Pour tout préfixe standard ($p \le 30$), les hôtes assignables vont de $A_{\text{réseau}} + 1$ à $A_{\text{diffusion}} - 1$. Sur l'octet découpé de masque $m_k < 255$, le pas entre deux sous-réseaux successifs (**incrément de bloc**) vaut $\Delta = 256 - m_k$.

## Exemple chiffré : découpage de `172.16.45.130/26`

Un administrateur segmente le réseau privé `172.16.45.0/24` en réseaux locaux virtuels (VLAN) de 50 postes environ et souhaite caractériser le bloc qui contient l'interface **`172.16.45.130/26`**.

1. **Bits et masque** : $p = 26$ bits réseau et $h = 32 - 26 = \mathbf{6\text{ bits}}$ d'hôte. Les trois premiers octets valent `255.255.255`. Les $2$ bits réseau du 4e octet donnent `11000000` en binaire, soit $128 + 64 = \mathbf{192}$.
   * Masque : **`255.255.255.192`** ; masque générique : **`0.0.0.63`**.
   * Incrément : $\Delta = 256 - 192 = \mathbf{64}$ (les quatre blocs `/26` de ce `/24` démarrent à `.0`, `.64`, `.128` et `.192`).
2. **Adresse réseau (ET logique sur le 4e octet)** : `130` vaut `10000010` en binaire.
   * `10000010` (`130`) $\mathbin{\&}$ `11000000` (`192`) $=$ `10000000` (**`128`**) $\Longrightarrow$ **`172.16.45.128`**.
3. **Adresse de diffusion (OU logique avec `63` = `00111111`)** :
   * `10000000` (`128`) $\mathbin{|}$ `00111111` (`63`) $=$ `10111111` (**`191`**) $\Longrightarrow$ **`172.16.45.191`**.
4. **Plage exploitable** : de **`172.16.45.129`** à **`172.16.45.190`**, soit $2^6 = \mathbf{64}$ adresses totales et $64 - 2 = \mathbf{62}$ hôtes utilisables (couvrant 50 postes, la passerelle par défaut et une marge de croissance confortable).

## Table de référence CIDR : masques et capacités IPv4

| CIDR | Masque de sous-réseau | Masque générique | Total IP | Hôtes utilisables | Usage réseau type |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`/16`** | `255.255.0.0` | `0.0.255.255` | 65 536 | 65 534 | Grand campus ou nuage privé |
| **`/20`** | `255.255.240.0` | `0.0.15.255` | 4 096 | 4 094 | Agrégation multi-sites ou opérateur |
| **`/22`** | `255.255.252.0` | `0.0.3.255` | 1 024 | 1 022 | Grand réseau sans fil ou siège |
| **`/24`** | `255.255.255.0` | `0.0.0.255` | 256 | 254 | Réseau local standard de PME |
| **`/25`** | `255.255.255.128` | `0.0.0.127` | 128 | 126 | Demi-réseau ou grand VLAN métier |
| **`/26`** | `255.255.255.192` | `0.0.0.63` | 64 | 62 | Équipe départementale ou imprimantes |
| **`/27`** | `255.255.255.224` | `0.0.0.31` | 32 | 30 | Zone démilitarisée (DMZ) ou agence |
| **`/28`** | `255.255.255.240` | `0.0.0.15` | 16 | 14 | Grappe de serveurs ou bloc IP PME |
| **`/29`** | `255.255.255.248` | `0.0.0.7` | 8 | 6 | Pare-feu redondant et passerelles |
| **`/30`** | `255.255.255.252` | `0.0.0.3` | 4 | 2 | Liaison point à point classique |
| **`/31`** | `255.255.255.254` | `0.0.0.1` | 2 | 2 | Liaison point à point (RFC 3021) |
| **`/32`** | `255.255.255.255` | `0.0.0.0` | 1 | 1 | Bouclage local, règle pare-feu |

Chaque bit ajouté au préfixe CIDR **divise par deux** la capacité du sous-réseau et **double** le nombre de segments disponibles : un bloc `/24` se scinde exactement en deux `/25`, quatre `/26` ou huit `/27`. En pratique, associer un sous-réseau IPv4 dédié à chaque réseau local virtuel (VLAN) confine les trames de diffusion et simplifie les règles de filtrage inter-services.

## Bonnes pratiques d'architecture et pièges courants

* **Anticiper les réserves infonuagiques** : Au-delà du réseau, de la diffusion et de la passerelle, les plateformes de nuage privé (VPC) réservent souvent **5 adresses** par sous-réseau au lieu de 2 (routeur virtuel, résolveur DNS et réserve) : un `/28` n'y laisse alors que **11 adresses** exploitables.
* **Allouer du plus grand au plus petit en VLSM** : Pour combiner des tailles variées (`/25`, `/26`, `/28`, `/30`), attribuez toujours les plus grands blocs en premier afin de respecter l'alignement binaire sur $2^h$ et de simplifier l'agrégation de routes.
* **Ne pas confondre classe historique et routage** : Les classes A (`1`–`126`), B (`128`–`191`) et C (`192`–`223`) sont purement indicatives (avec `127.0.0.0/8` pour le bouclage local) ; seul le préfixe CIDR gouverne le routage moderne.
* **Choisir des plages RFC 1918 sans conflit VPN** : Utilisez `10.0.0.0/8`, `172.16.0.0/12` ou `192.168.0.0/16` en interne, en évitant `192.168.0.0/24` et `192.168.1.0/24` qui entrent fréquemment en conflit avec les boîtiers domestiques lors des accès distants.
