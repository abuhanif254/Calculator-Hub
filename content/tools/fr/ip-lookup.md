---
metaTitle: "Recherche IP & Géolocalisation | ASN, FAI, rDNS & VPN"
metaDescription: "Inspectez toute adresse IPv4 ou IPv6 : géolocalisation, ASN, FAI, préfixe CIDR, DNS inversé (rDNS) et détection VPN, proxy ou Tor en ligne."
metaKeywords: "recherche ip, géolocalisation ip, quelle est mon ip, mon adresse ip, vérificateur ip, ipv4 ipv6, recherche asn, dns inversé, détecteur vpn, testeur proxy, whois ip"
title: "Outil de Recherche IP & Géolocalisation"
shortDescription: "Inspectez toute adresse IPv4 ou IPv6 pour obtenir sa géolocalisation, son fournisseur d'accès (FAI), son numéro ASN, son nom d'hôte rDNS et son statut proxy, VPN ou Tor."
faqs:
  - question: "Pourquoi la géolocalisation IP indique-t-elle une métropole voisine plutôt que mon adresse exacte ?"
    answer: "La géolocalisation IP associe des préfixes de routage aux allocations des registres régionaux (RIR), aux points d'échange des FAI et à des mesures de latence, jamais à un signal GPS. La précision atteint plus de 99 % au niveau du pays, mais pointe généralement vers la passerelle régionale (BNG) ou le nœud de collecte du FAI, parfois situé à plusieurs dizaines de kilomètres de l'abonné."
  - question: "Que se passe-t-il si j'interroge une adresse privée RFC 1918 comme 192.168.1.1 ou 10.0.0.5 ?"
    answer: "Les plages privées, de bouclage (loopback), lien-local et CGNAT ne sont pas routables sur l'Internet public et ne possèdent ni géolocalisation publique ni ASN dédié. Le moteur identifie immédiatement ces sous-réseaux réservés, court-circuite tout appel réseau externe pour bloquer les attaques SSRF et affiche la classification RFC correspondante."
  - question: "Pourquoi les adresses IP Anycast comme 8.8.8.8 ou 1.1.1.1 affichent-elles une ville inattendue ?"
    answer: "Avec le routage Anycast, un même préfixe IP est annoncé en BGP depuis des centaines de points de présence dans le monde afin d'orienter chaque utilisateur vers le nœud le plus proche topologiquement. Comme ce préfixe n'a aucun emplacement physique unique, les bases de géolocalisation l'attribuent par défaut au siège de l'opérateur ou au centre géographique du pays."
  - question: "Comment le DNS inversé confirmé (FCrDNS) permet-il de vérifier un serveur légitime ?"
    answer: "Le mécanisme FCrDNS effectue d'abord une requête PTR sur l'adresse IP pour obtenir son nom d'hôte, puis résout ce nom en enregistrement A ou AAAA afin de confirmer qu'il pointe bien vers l'adresse IP d'origine. Les serveurs de messagerie et les pare-feu applicatifs (WAF) s'en servent pour distinguer les vrais relais SMTP et robots d'indexation des enregistrements PTR usurpés."
  - question: "Un indicateur Hébergement (Datacenter) ou VPN signifie-t-il automatiquement qu'une IP est malveillante ?"
    answer: "Non. L'étiquette Hébergement indique simplement que le préfixe appartient à un ASN cloud ou datacenter (AWS, OVHcloud, GCP, DigitalOcean) plutôt qu'à un FAI résidentiel, tandis que l'indicateur VPN signale un tunnel chiffré partagé. Les équipes sécurité utilisent ces signaux pour ajuster un score de risque ou déclencher une authentification renforcée plutôt que pour bloquer aveuglément."
features:
  - "Validation double pile IPv4 et IPv6 avec détection automatique immédiate de votre adresse IP publique actuelle"
  - "Pipeline de géolocalisation multi-fournisseurs avec bascule automatique affichant pays, région, ville, code postal, coordonnées et fuseau horaire IANA"
  - "Attribution réseau complète incluant numéro de système autonome (ASN), FAI, organisation titulaire, préfixe CIDR annoncé et type de connexion"
  - "Résolution DNS inversée (rDNS) parallèle des enregistrements PTR sous les zones in-addr.arpa et ip6.arpa"
  - "Renseignement sécurité identifiant les nœuds de sortie Tor, les proxies ouverts, les serveurs VPN commerciaux et les plages datacenter"
  - "Détection native des plages réservées RFC 1918, RFC 6598, RFC 4193 et loopback avec protection serveur SSRF et export JSON ou TXT"
useCases:
  - "Enquêter sur des attaques par force brute, des pics de scraping API ou des adresses suspectes dans les journaux d'un reverse proxy Nginx ou Cloudflare"
  - "Vérifier que les adresses IP sortantes d'un serveur SMTP ou d'une passerelle d'entreprise exposent un enregistrement PTR conforme avant la mise en production"
  - "Auditer le routage d'un tunnel VPN ou d'une configuration split-tunnel sur IPv4 et IPv6 lors d'un diagnostic réseau"
  - "Croiser le pays de facturation bancaire d'une commande e-commerce avec la géolocalisation IP et les indicateurs proxy ou Tor"
  - "Identifier l'ASN cloud et le bloc CIDR derrière un webhook tiers ou un appel de rappel (callback) inconnu dans vos journaux applicatifs"
  - "Déterminer si une alerte pare-feu provient d'un abonné résidentiel, d'un pool CGNAT mobile ou d'un serveur hébergé en datacenter"
howToSteps:
  - "Ouvrez l'outil pour inspecter automatiquement votre propre adresse IP publique, ou saisissez n'importe quelle adresse IPv4 ou IPv6 cible."
  - "Lancez la requête afin d'exécuter en parallèle la géolocalisation, l'analyse des anonymiseurs et la résolution DNS inversée PTR."
  - "Consultez le panneau Localisation et la carte interactive pour vérifier le pays, la région, la ville, les coordonnées et le fuseau horaire IANA."
  - "Analysez la section Réseau et Routage pour relever l'ASN, le nom du FAI, l'organisation propriétaire et le bloc CIDR annoncé en BGP."
  - "Vérifiez les panneaux Sécurité et DNS inversé afin de repérer un VPN, un proxy, un nœud Tor, un hébergeur cloud ou le nom d'hôte PTR."
  - "Copiez le résumé structuré ou téléchargez le rapport complet au format JSON ou TXT directement depuis votre navigateur."
---

Chaque paquet circulant sur l'Internet public transporte une adresse IP source et destination, mais des octets bruts livrent peu d'indices exploitables isolément. Transformer une adresse en diagnostic réseau exige de corréler trois couches d'infrastructure : les annonces BGP des systèmes autonomes, les bases de géolocalisation multi-sources et les zones DNS inversées. Cet analyseur exécute ces requêtes en parallèle derrière des points de terminaison protégés contre les attaques SSRF, gère la redondance fournisseur et restitue une vue cartographique, routage et sécurité exportable directement dans votre navigateur.

## Épuisement IPv4, forme canonique IPv6 et plages réservées

Le routage Internet cohabite sur **IPv4** 32 bits (`4 294 967 296` adresses théoriques) et **IPv6** 128 bits ($3{,}4 \times 10^{38}$ adresses). Comme une adresse IPv6 admet plusieurs écritures équivalentes, la **RFC 5952** impose une forme canonique : hexadécimal minuscule, suppression des zéros en tête de chaque bloc de 16 bits et compression par `::` de la plus longue suite d'au moins deux blocs nuls (`2001:4860:4860::8888`). Les serveurs double pile journalisent souvent les clients IPv4 sous forme mappée `::ffff:0:0/96` (`::ffff:203.0.113.45`), qui doit être extraite avant toute recherche IPv4.

Toute adresse syntaxiquement valide n'est pas routable publiquement. L'IANA réserve plusieurs plages spéciales exclues des tables BGP globales :

| Bloc CIDR | Famille | Norme / RFC | Portée et comportement réseau |
| :--- | :--- | :--- | :--- |
| `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16` | IPv4 | RFC 1918 | Réseaux locaux privés (entreprises et foyers), traduits par NAT. |
| `100.64.0.0/10` | IPv4 | RFC 6598 | Espace Carrier-Grade NAT (CGNAT) partagé entre cœur opérateur et box. |
| `127.0.0.0/8` / `::1/128` | IPv4 / IPv6 | RFC 1122 / 4291 | Interface de bouclage (loopback) confinée à la pile réseau locale. |
| `169.254.0.0/16` / `fe80::/10` | IPv4 / IPv6 | RFC 3927 / 4291 | Adressage lien-local auto-configuré sur un seul segment, non routable. |
| `fc00::/7` (`fd00::/8`) | IPv6 | RFC 4193 | Adresses locales uniques (ULA) pour le routage IPv6 interne privé. |
| `192.0.2.0/24`, `198.51.100.0/24`, `203.0.113.0/24` | IPv4 | RFC 5737 | Plages de documentation et de test (`TEST-NET-1/2/3`) hors BGP. |
| `2001:db8::/32` | IPv6 | RFC 3849 | Préfixe réservé aux exemples de documentation et configurations types. |

Soumettre une plage réservée déclenche une classification locale immédiate sans appel HTTP ni DNS sortant, neutralisant tout risque **SSRF** (*Server-Side Request Forgery*) vers l'infrastructure interne.

## Systèmes autonomes, préfixes BGP et registres RIR

L'Internet mondial réunit environ 75 000 **systèmes autonomes (AS)** actifs échangeant leurs routes via **BGP** (*Border Gateway Protocol*). Chaque réseau obtient un **ASN** (*Autonomous System Number*), codé sur 16 bits (`1–65535`) puis étendu à 32 bits par la **RFC 6793**, auprès des cinq registres régionaux (**RIR**) :

- **RIPE NCC** : Europe, Moyen-Orient et Asie centrale.
- **ARIN** : Amérique du Nord et Caraïbes.
- **APNIC** : région Asie-Pacifique.
- **LACNIC** : Amérique latine et Caraïbes.
- **AFRINIC** : continent africain.

Les routeurs appliquent la règle du **préfixe le plus long** (*longest-prefix match*) sur des blocs CIDR annoncés (`/24` ou plus grand en IPv4, `/48` en IPv6). En analyse d'incident, l'ASN s'avère souvent plus parlant que la ville : `AS16276` (OVHcloud) ou `AS16509` (Amazon AWS) signale une origine serveur ou automatisée, tandis que `AS3215` (Orange) ou `AS12322` (Free) désigne un accès grand public.

### RDAP, RPKI et extraction d'IP derrière un reverse proxy

Les registres remplacent progressivement l'ancien protocole WHOIS en texte libre par **RDAP** (**RFC 9082/9083**), qui expose en JSON sur HTTPS le titulaire exact du préfixe, les contacts d'abus (`abuse`) et la date d'allocation. Sur le plan de l'intégrité du routage, la cryptographie **RPKI** (*Resource Public Key Infrastructure*) vérifie via des certificats ROA qu'un ASN dispose bien du droit d'annoncer un préfixe CIDR précis. Côté applicatif, si votre serveur se trouve derrière un répartiteur de charge ou un CDN, veillez à n'inspecter l'en-tête `X-Forwarded-For` ou `CF-Connecting-IP` qu'en provenance de vos proxies de confiance, sans quoi un client malveillant peut falsifier l'adresse source journalisée.

## Pourquoi la géolocalisation IP dérive : CGNAT, Anycast et location IPv4

Surestimer la précision spatiale d'une IP crée des règles anti-fraude fragiles. Trois réalités réseau expliquent cette dérive :

1. **Agrégation FAI et CGNAT mobile** : Les opérateurs mobiles regroupent des dizaines de milliers d'abonnés derrière quelques passerelles NAT régionales, situées parfois à plus de 150 km du terminal.
2. **Préfixes Anycast** : Les résolveurs (`8.8.8.8`, `1.1.1.1`) et CDN annoncent le même préfixe depuis des centaines de points de présence. BGP choisit le nœud le plus proche, mais la base géographique ne stocke souvent que le siège social de l'opérateur.
3. **Location IPv4 transfrontalière** : Des blocs `/24` loués entre continents conservent leur ancien pays tant que les fichiers *geofeed* (**RFC 8805**) ne sont pas réindexés.

## DNS inversé (FCrDNS) et signaux de menace réseau

Le DNS inversé associe une IP à un nom d'hôte en renversant ses composantes sous `.in-addr.arpa` (octets décimaux IPv4) ou `.ip6.arpa` (32 quartets hexadécimaux IPv6). Vous pouvez vérifier manuellement un enregistrement `PTR` et sa confirmation directe (**FCrDNS**) en ligne de commande :

```bash
# Résolution inverse IPv4 (8.8.8.8.in-addr.arpa PTR)
dig -x 8.8.8.8 +short
# -> dns.google.

# Résolution inverse IPv6 (32 quartets inversés sous ip6.arpa)
dig -x 2606:4700:4700::1111 +short
# -> one.one.one.one.

# Confirmation directe FCrDNS vers l'IP initiale
dig +short A dns.google
# -> 8.8.8.8 / 8.8.4.4
```

Pour auditer ensuite les enregistrements `A`, `AAAA`, `MX`, `SPF` ou `DMARC` du domaine trouvé, poursuivez avec notre [outil de recherche DNS](/fr/outils/dns-lookup).

Côté sécurité, l'analyse sépare quatre profils : **nœuds de sortie Tor** recensés publiquement, **proxies ouverts** HTTP/SOCKS exploités pour le *credential stuffing*, **terminaisons VPN commerciales** partagées et **plages datacenter** hébergeant robots ou webhooks SaaS. En croisant ces indicateurs avec notre [analyseur de User-Agent](/fr/outils/user-agent-parser) et le [vérificateur d'en-têtes HTTP](/fr/outils/http-header-checker), vous reliez l'origine réseau à l'identité applicative.
