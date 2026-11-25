---
metaTitle: "Recherche DNS | Champs A, AAAA, MX, TXT, SPF, DMARC & PTR"
metaDescription: "Interrogez en direct vos enregistrements DNS (A, AAAA, MX, TXT, NS, SOA, CAA, SRV, PTR), auditez SPF/DMARC, identifiez l'hébergeur et consultez RDAP."
metaKeywords: "recherche dns, dns lookup, vérifier enregistrements dns, champ a aaaa, enregistrement mx, vérificateur spf, dmarc lookup, sélecteur dkim, enregistrement caa, dns inversé ptr, propagation dns, rdap"
title: "Outil de Recherche DNS (DNS Lookup)"
shortDescription: "Inspectez en parallèle vos enregistrements DNS (A, AAAA, CNAME, MX, TXT, NS, SOA, CAA, SRV et PTR), auditez l'authentification e-mail SPF/DKIM/DMARC, identifiez l'hébergeur DNS et consultez les métadonnées RDAP."
faqs:
  - question: "Pourquoi un enregistrement CNAME ne peut-il pas coexister avec MX ou NS à la racine d'un domaine ?"
    answer: "La RFC 1034 (section 3.6.2) interdit la présence de tout autre type d'enregistrement sur le même nom qu'un CNAME, car les résolveurs suivent l'alias de manière exclusive et ignorent les champs voisins. Comme l'apex d'une zone exige des enregistrements SOA et NS, pointer une racine vers un CDN impose un champ A/AAAA ou un aplatissement ALIAS/ANAME géré côté fournisseur DNS."
  - question: "Qu'est-ce qui déclenche une erreur SPF permerror alors que la syntaxe TXT semble valide ?"
    answer: "La RFC 7208 (section 4.6.4) fixe une limite stricte de 10 requêtes DNS pour les mécanismes include, a, mx, ptr, exists et redirect lors d'une évaluation SPF, incluant toutes les inclusions imbriquées des plateformes tierces. Dépasser ce plafond provoque un statut permerror chez le serveur destinataire, entraînant fréquemment un échec DMARC et un classement en spam."
  - question: "Pourquoi les requêtes DNS renvoient-elles encore l'ancienne adresse IP après la mise à jour de ma zone ?"
    answer: "Les résolveurs récursifs mondiaux conservent chaque réponse en cache pendant la durée du TTL (Time to Live) de l'ancien enregistrement, tandis que les absences de réponse sont mémorisées selon le TTL minimum du champ SOA (RFC 2308). Abaisser le TTL à 60 ou 300 secondes au moins 24 heures avant une migration serveur réduit drastiquement cette fenêtre de latence."
  - question: "Comment l'outil identifie-t-il le fournisseur DNS et l'hébergeur sans accès WHOIS complet ?"
    answer: "L'analyseur compare les noms d'hôtes des serveurs NS autoritaires aux empreintes connues (Cloudflare, Amazon Route 53, OVHcloud, Google Cloud DNS, Azure DNS), lance une requête PTR inversée sur l'adresse IPv4 principale combinée à des heuristiques de préfixes anycast, et interroge les points d'accès JSON standardisés RDAP pour obtenir le registrar et l'âge du domaine."
  - question: "Pourquoi la recherche bloque-t-elle localhost ou les adresses IP privées RFC 1918 ?"
    answer: "Les navigateurs ne pouvant ouvrir directement de sockets UDP ou TCP sur le port 53, les requêtes DNS s'exécutent via notre résolveur côté serveur. Avant toute interrogation externe ou requête RDAP, le serveur contrôle les adresses résolues et bloque loopback (127.0.0.0/8, ::1), les réseaux privés RFC 1918, la plage CGNAT RFC 6598 et les sous-réseaux link-local afin de prévenir les attaques SSRF."
features:
  - "Résolution parallèle des 10 types d'enregistrements DNS (A, AAAA, CNAME, MX, TXT, NS, SOA, SRV, CAA et PTR inversé) avec affichage des TTL en direct"
  - "Validation automatisée de la politique SPF signalant les champs manquants, les qualificateurs permissifs +all et les règles neutres ?all"
  - "Inspection dédiée du sous-domaine _dmarc et sondage des sélecteurs DKIM courants (enregistrements google et default sous _domainkey)"
  - "Empreinte des serveurs de noms autoritaires et identification de l'hébergeur par DNS inversé PTR sur les principaux fournisseurs cloud"
  - "Extraction légère des métadonnées de domaine via RDAP (RFC 7480) incluant le bureau d'enregistrement, la date de création et l'ancienneté"
  - "Protection SSRF intégrée rejetant les plages loopback, privées RFC 1918, CGNAT RFC 6598 et adresses non routables avant résolution"
useCases:
  - "Contrôler le basculement des champs A, AAAA et CNAME à travers les caches récursifs lors d'une migration cloud ou CDN sans coupure"
  - "Diagnostiquer des e-mails transactionnels rejetés en auditant l'ordre de priorité MX, la rigueur SPF et la politique d'application DMARC"
  - "Vérifier les enregistrements CAA avant un renouvellement automatique ACME afin de confirmer l'autorisation de Let's Encrypt ou DigiCert"
  - "Tester le DNS inversé (PTR) de l'adresse IP d'un serveur SMTP sortant pour satisfaire les contrôles anti-spam des messageries réceptrices"
  - "Valider la propagation des jetons TXT de propriété pour Google Search Console, Microsoft 365, Apple ou un outil d'envoi transactionnel"
  - "Auditer la redondance des serveurs NS autoritaires et la cohérence du numéro de série SOA après une délégation vers un nouveau gestionnaire DNS"
howToSteps:
  - "Saisissez un nom de domaine, une URL complète ou une adresse IPv4/IPv6 publique ; le protocole, le chemin et le numéro de port sont nettoyés automatiquement."
  - "Lancez la recherche pour résoudre en parallèle tous les enregistrements directs ou exécuter automatiquement une requête PTR inversée pour une IP."
  - "Parcourez les onglets structurés pour contrôler les cibles IPv4/IPv6, les valeurs TTL, les priorités MX, les temporisations SOA et les règles CAA."
  - "Consultez le panneau de diagnostic E-mail et Sécurité pour repérer toute alerte SPF, DMARC, sélecteur DKIM ou serveur de noms unique."
  - "Examinez le résumé d'infrastructure affichant le fournisseur DNS détecté, l'indice d'hébergement et l'ancienneté du domaine issue de RDAP."
  - "Copiez les valeurs d'enregistrements individuelles ou exportez le rapport complet pour un ticket d'incident, un guide de migration ou un audit client."
---

Chaque requête HTTP, session SMTP ou validation de certificat TLS débute par une résolution auprès du **Système de Noms de Domaine (DNS)**. Lorsqu'un site devient injoignable, qu'un courriel tombe en spam ou qu'un certificat ACME échoue, la cause se situe presque toujours dans un enregistrement de la zone autoritaire. Comme le bac à sable navigateur interdit les sockets UDP/TCP sur le port 53, notre **Outil de Recherche DNS** exécute des requêtes parallèles côté serveur et un contrôle RDAP, puis affiche champs décodés, TTL et diagnostics de messagerie sans stocker vos requêtes.

## Anatomie des enregistrements DNS et sémantique de résolution

Une zone DNS assemble des enregistrements normalisés par la **RFC 1035** et ses extensions. Les résolveurs parcourent la délégation depuis la racine (`.`) et le TLD (`.fr`, `.com`, `.ca`) jusqu'aux serveurs autoritaires, en mettant chaque réponse en cache selon son *Time to Live* (TTL) :

| Type | RFC | Exemple de zone DNS | Rôle opérationnel et contrainte clé |
| :--- | :--- | :--- | :--- |
| `A` | 1035 | `exemple.fr. 300 IN A 93.184.216.34` | Relie un nom d'hôte à une IPv4 32 bits (équilibrage possible). |
| `AAAA` | 3596 | `exemple.fr. 300 IN AAAA 2606:2800:220:1::` | Relie un hôte à une IPv6 128 bits pour la double pile. |
| `CNAME` | 1034 | `www.exemple.fr. IN CNAME edge.cdn.net.` | Alias canonique ; interdit à l'apex avec `NS` ou `SOA`. |
| `MX` | 5321 | `exemple.fr. IN MX 10 mail1.exemple.fr.` | Route SMTP par priorité croissante ; cible non `CNAME`. |
| `TXT` | 1035 | `exemple.fr. IN TXT "v=spf1 -all"` | Porte SPF, DKIM, DMARC et validations (blocs de 255 octets). |
| `NS` | 1035 | `exemple.fr. IN NS ns1.cloudflare.com.` | Serveurs autoritaires ; prévoir au moins deux hôtes distincts. |
| `SOA` | 2308 | `ns1.hote. admin.hote. 2026112501 7200 3600 1209600 300` | Primaire, série, délais de transfert et TTL de cache négatif. |
| `CAA` | 8659 | `exemple.fr. IN CAA 0 issue "letsencrypt.org"` | Autorise explicitement les autorités de certification TLS. |
| `SRV` | 2782 | `_sip._tcp.exemple.fr. IN SRV 10 60 5060 sip.exemple.fr.` | Publie priorité, poids, port et hôte cible d'un service. |
| `PTR` | 1035 | `34.216.184.93.in-addr.arpa. IN PTR hote.exemple.fr.` | Associe inversement une IP à son nom d'hôte canonique. |

Après contrôle des champs `A`, `AAAA` et `CAA`, complétez l'audit web avec notre [analyseur d'en-têtes HTTP](/fr/outils/http-header-checker) ou tracez les redirections de domaine via le [testeur de redirection URL](/fr/outils/redirect-checker). Sur les sous-domaines sensibles qui ne doivent jamais recevoir de certificat TLS, une règle `CAA 0 issue ";"` bloque explicitement toute autorité de certification, tandis que la balise `issuewild` encadre séparément les certificats jokers (`*.exemple.fr`) et `iodef` signale les tentatives non autorisées.

## Audit de l'authentification e-mail : SPF, DKIM et DMARC

SMTP ne prouvant pas nativement l'identité de l'expéditeur, les messageries vérifient trois standards DNS complémentaires :

```text
; Politique SPF à la racine (rejet strict, <= 10 requêtes DNS)
exemple.fr.                    300 IN TXT "v=spf1 include:_spf.google.com ip4:198.51.100.24 -all"

; Clé publique DKIM par sélecteur
google._domainkey.exemple.fr.  300 IN TXT "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A..."

; Politique DMARC stricte avec rapports agrégés RUA
_dmarc.exemple.fr.             300 IN TXT "v=DMARC1; p=reject; sp=reject; adkim=r; aspf=r; pct=100; rua=mailto:dmarc@exemple.fr"
```

### Quatre causes fréquentes de rejet ou d'usurpation

1. **Qualificateurs SPF permissifs** : `+all` autorise tout serveur Internet à envoyer sous votre domaine et `?all` reste neutre. Utilisez `~all` pendant l'inventaire des émetteurs, puis passez à `-all`.
2. **Plafond de 10 requêtes SPF (RFC 7208 §4.6.4)** : chaque `include`, `a`, `mx`, `exists` ou `redirect` (y compris imbriqué chez vos prestataires SaaS) consomme ce budget unique ; au-delà, le serveur renvoie `permerror`.
3. **DMARC figé en observation (`p=none`)** : ce mode collecte les rapports `rua` sans bloquer le spoofing. Une fois l'alignement SPF/DKIM validé, migrez vers `p=quarantine`, puis `p=reject`.
4. **Sélecteurs DKIM personnalisés** : les clés résidant sous `<selecteur>._domainkey.<domaine>`, notre outil sonde les sélecteurs courants (`google`, `default`). Pour un sélecteur dédié (`s1`, `k1`, `selector1`), repérez la balise `s=` dans l'en-tête `DKIM-Signature` d'un e-mail reçu.

## Cache TTL, numéro de série SOA et délai de propagation

La « propagation DNS » repose sur un cache tiré par les résolveurs (*pull-based*) et non sur une diffusion active. Après incrémentation du numéro de série `SOA` (`AAAAMMJJnn`, RFC 1912), les serveurs secondaires synchronisent par `AXFR`/`IXFR` selon les temporisations `refresh`, `retry` et `expire` de l'enregistrement `SOA`, tandis que les caches externes conservent l'ancienne valeur jusqu'à l'expiration de son TTL. Les réponses négatives (`NXDOMAIN`, `NODATA`) sont également cachées selon la plus petite valeur entre le TTL du `SOA` et son champ `MINTTL` (RFC 2308) ; avant une migration critique, réduisez le TTL à 60 ou 300 secondes au moins 24 heures à l'avance. Pour comparer en terminal serveur autoritaire et résolveurs publics :

```bash
# Interroger directement le serveur autoritaire sans cache récursif
dig @ns1.exemple.net exemple.fr A +norecurse +noall +answer

# Comparer les TTL restants sur Cloudflare et Google DNS
dig @1.1.1.1 exemple.fr MX +noall +answer
dig @8.8.8.8 _dmarc.exemple.fr TXT +short
```

## DNS inversé (`PTR`), empreinte cloud et protection SSRF

Entrer une adresse IPv4 ou IPv6 active automatiquement la recherche inverse `in-addr.arpa` ou `ip6.arpa` afin de vérifier le champ `PTR` exigé par les relais SMTP. Sur un domaine, l'outil associe un `PTR` secondaire sur l'IPv4 principale, l'empreinte des serveurs `NS` et une requête JSON **RDAP** (`https://rdap.org/domain/<domaine>`, RFC 7480) pour identifier registrar, ancienneté et fournisseur DNS. Pour analyser ensuite l'ASN, le bloc CIDR et la localisation réseau d'une IP résolue, transmettez-la à notre [outil de recherche IP](/fr/outils/ip-lookup).

Avant toute résolution sortante côté serveur, un filtre SSRF bloque immédiatement loopback (`127.0.0.0/8`, `::1`), réseaux privés RFC 1918 (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`), plage CGNAT RFC 6598 (`100.64.0.0/10`), plages link-local et adresses uniques locales IPv6 (`fc00::/7`).
