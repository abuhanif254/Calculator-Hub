---
metaTitle: "Recherche IP & Géolocalisation | Vérificateur d'Adresse et VPN"
metaDescription: "Inspectez une adresse IP (IPv4/IPv6). Découvrez sa géolocalisation, son fournisseur d'accès (FAI/ISP), son réseau (ASN) et détectez les proxies, VPN ou Tor."
metaKeywords: "quelle est mon ip, mon adresse ip, recherche ip, géolocalisation ip, trouver ip, ipv4 ipv6, vpn detecteur, proxy tester, whois ip, asn lookup"
title: "Outil de Recherche IP & Géolocalisation"
shortDescription: "Inspectez les adresses IP (IPv4 et IPv6). Obtenez la localisation géographique, le fournisseur d'accès (FAI), les numéros ASN et la détection des Proxy/VPN."
faqs:
  - question: "Qu'est-ce qu'une adresse IP ?"
    answer: "Votre adresse IP (Internet Protocol) est une étiquette numérique unique attribuée à votre routeur par votre FAI (Fournisseur d'Accès à Internet). En cliquant sur 'Détecter mon IP', notre outil lira les en-têtes de votre requête pour afficher votre adresse publique."
  - question: "Cet outil peut-il trouver mon adresse physique (rue/maison) ?"
    answer: "Non. La géolocalisation IP ne peut pas identifier votre domicile ou vos coordonnées GPS précises. Elle se limite généralement à identifier la ville du centre de données ou du nœud de routage de votre FAI (Fournisseur d'accès)."
  - question: "Une adresse IP peut-elle révéler mon identité ?"
    answer: "Non, une adresse IP ne contient ni votre nom, ni votre e-mail. Seul votre FAI peut relier une adresse IP à un client précis, et il ne le fera que sur présentation d'un mandat judiciaire (ou réquisition légale)."
  - question: "Qu'est-ce qu'une adresse IP VPN ou Proxy ?"
    answer: "Un VPN ou un Proxy joue le rôle d'intermédiaire. Il chiffre (ou masque) votre trafic. Les sites web que vous visitez verront l'adresse IP du serveur VPN, et non votre véritable adresse IP à domicile."
  - question: "Pourquoi mon adresse IP indique-t-elle une autre ville ?"
    answer: "Si vous habitez en périphérie, votre FAI achemicalise souvent le trafic dans la grande métropole la plus proche. Les bases de données IP sont très fiables pour le pays (99%), mais la précision diminue au niveau de la ville (50 à 80%)."
  - question: "Le DNS inversé (rDNS) à quoi sert-il ?"
    answer: "Le DNS Inversé permet de trouver le nom d'hôte (domaine) caché derrière une adresse IP (contrairement au DNS normal). C'est crucial pour l'e-mailing, car les filtres anti-spam rejettent les adresses IP sans configuration rDNS valide."
features:
  - "Détection instantanée de votre IP publique (Support IPv4 et IPv6 complet)."
  - "Cartographie de géolocalisation avec pays, région, ville, et code postal."
  - "Identification du fournisseur d'accès internet (ISP/FAI) et du numéro de système autonome (ASN)."
  - "Recherches DNS Inversées automatisées (rDNS) via requêtes PTR."
  - "Renseignement de sécurité : détection des tunnels VPN, serveurs Proxy et nœuds de sortie TOR."
  - "Carte interactive propulsée par OpenStreetMap (sans tracking)."
useCases:
  - "Équipes de sécurité vérifiant les logs de pare-feu (Firewall) pour bloquer les réseaux de bots."
  - "Développeurs déboguant des serveurs Proxy Inverse et des accès API locaux."
  - "Ingénieurs Réseaux inspectant le routage BGP mondial via les numéros ASN."
  - "Propriétaires de boutiques E-commerce bloquant les fraudes de cartes bancaires (discordance pays IP/CB)."
howToSteps:
  - "Saisissez n'importe quelle adresse IPv4 ou IPv6 dans la barre de recherche."
  - "Ou bien, laissez le champ vide et cliquez sur 'Détecter mon IP'."
  - "Cliquez sur 'Interroger l'adresse IP' pour lancer l'analyse."
  - "Consultez le tableau de bord avec les coordonnées et le niveau de réputation."
  - "Analysez le panneau de menaces pour savoir si le visiteur utilise un VPN ou un proxy."
---

## Qu'est-ce que la recherche IP ?

Une **adresse IP (Internet Protocol)** est obligatoire pour qu'un appareil puisse communiquer sur Internet. 

Notre outil interroge les registres de télécommunications internationaux pour récupérer les métadonnées associées à une IP : emplacement physique, FAI (Fournisseur d'accès), type de connexion, etc. Que ce soit pour auditer des logs de serveur web ou vérifier votre propre anonymat, cet outil offre une visibilité totale.

---

## Les versions IP : IPv4 vs IPv6

Internet repose sur deux protocoles de routage :

### IPv4
* **Format** : Adresse numérique 32 bits divisée par des points (ex. `8.8.8.8` ou `192.168.1.1`).
* **Capacité** : Environ 4,3 milliards d'adresses. Ce stock mondial est épuisé, ce qui oblige les opérateurs à utiliser des systèmes comme le NAT pour partager une IP entre plusieurs foyers.

### IPv6
* **Format** : Adresse hexadécimale 128 bits séparée par des deux-points (ex. `2001:4860:4860::8888`).
* **Capacité** : Résout la pénurie mondiale. Il offre suffisamment d'adresses pour chaque objet connecté sur terre et intègre nativement des protocoles de sécurité avancés.

---

## IP Publiques vs Privées

1. **Adresses IP Publiques** : Utilisées sur l'Internet mondial pour identifier de façon unique un routeur ou un serveur. (C'est ce que notre outil scanne).
2. **Adresses IP Privées** : Utilisées en interne dans votre réseau domestique (ex. le routeur attribue `192.168.1.20` à votre PC). Elles ne sont pas routables sur Internet. Notre outil bloque automatiquement les requêtes vers des IP privées (via la norme RFC 1918) pour empêcher les piratages (SSRF).

---

## Les Systèmes Autonomes et l'ASN

Le réseau Internet mondial est composé de milliers de sous-réseaux. Un **système autonome (AS)** est l'un de ces gigantesques réseaux géré par une seule entité (Orange, Google, AWS, etc.).

Chaque réseau possède un numéro identifiant : l'**ASN** (Autonomous System Number). Lors d'une recherche IP, découvrir l'ASN permet de savoir immédiatement qui contrôle l'infrastructure (ex : `AS15169` appartient à Google LLC).

---

## Renseignements de Sécurité : VPN, Proxies et TOR

Identifier si une adresse IP masque son identité est essentiel pour la cybersécurité moderne :

1. **VPN (Virtual Private Network)** : Ils masquent la véritable localisation du client. Les IP de serveurs VPN sont partagées, ce qui alerte souvent les systèmes anti-fraude.
2. **Serveurs Proxy** : Ce sont des relais. Ils servent souvent à contourner les géo-blocages (pour Netflix, etc.).
3. **TOR (The Onion Router)** : C'est le niveau maximal de confidentialité (réseau de l'anonymat). Étant souvent utilisé pour des activités illicites, les adresses des nœuds de sortie TOR sont publiques et systématiquement signalées par notre outil.

Si une adresse IP provient d'un centre de données d'hébergement (Datacenter) ou d'un VPN plutôt que d'une simple box Internet résidentielle, cela peut justifier l'activation d'un Captcha de sécurité pour filtrer les robots !
