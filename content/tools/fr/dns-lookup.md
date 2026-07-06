---
metaTitle: "Recherche DNS | Vérificateur de Champs (A, MX, TXT, SPF) & WHOIS"
metaDescription: "Analysez les enregistrements DNS en direct. Inspectez les champs A, AAAA, MX, TXT, CNAME, NS. Vérifiez la sécurité de vos e-mails (SPF, DMARC) et le nom de domaine."
metaKeywords: "recherche dns, vérifier dns, dns lookup, enregistrements dns, champ A, champ mx, vérifier spf, dmarc lookup, propagation dns, tester nom de domaine"
title: "Outil de Recherche DNS (DNS Lookup)"
shortDescription: "Inspectez les enregistrements DNS (A, MX, TXT, CNAME, NS, SOA). Analysez la sécurité de votre domaine (SPF/DMARC) et diagnostiquez les erreurs de propagation."
faqs:
  - question: "Qu'est-ce qu'une recherche DNS (DNS Lookup) ?"
    answer: "Une recherche DNS consiste à interroger les serveurs pour trouver les enregistrements associés à un domaine. Cela inclut le mappage des noms de domaine vers des adresses IP (enregistrements A/AAAA), la recherche des serveurs de messagerie (enregistrements MX) et la sécurité (enregistrements TXT)."
  - question: "Qu'est-ce que la propagation DNS ?"
    answer: "La propagation DNS est la période pendant laquelle les modifications apportées aux enregistrements se diffusent mondialement. Comme les serveurs stockent les données en cache en fonction de leur TTL (Time to Live), la propagation peut prendre de quelques minutes à 48 heures."
  - question: "Pourquoi les enregistrements TXT sont-ils importants ?"
    answer: "Les enregistrements TXT sont largement utilisés pour vérifier la propriété d'un domaine (ex: Google Search Console) et pour configurer les frameworks de sécurité des courriels comme SPF, DKIM et DMARC."
  - question: "Qu'est-ce que le SPF ?"
    answer: "SPF (Sender Policy Framework) est un enregistrement TXT qui répertorie toutes les adresses IP autorisées à envoyer des courriels à partir de votre domaine. Il empêche les spammeurs d'usurper votre identité."
  - question: "Qu'est-ce que DMARC ?"
    answer: "DMARC est un enregistrement DNS qui indique aux boîtes de réception (Gmail, Outlook) comment gérer les courriels qui échouent aux contrôles SPF ou DKIM (ex: les placer en quarantaine ou les rejeter)."
  - question: "Le DNS peut-il affecter le SEO ?"
    answer: "Oui. Des serveurs DNS lents augmentent le TTFB (Time To First Byte), ce qui dégrade l'expérience utilisateur et les scores Google Core Web Vitals. Des pannes DNS fréquentes empêchent également Googlebot d'explorer vos pages."
features:
  - "Recherche simultanée de 10 types d'enregistrements DNS (A, AAAA, MX, TXT, CNAME, NS, SOA, CAA, SRV, PTR)."
  - "Audit de sécurité des e-mails sortants (SPF, DMARC, sélecteurs DKIM)."
  - "Analyseur WHOIS via RDAP (date de création, expiration, registrar)."
  - "Détecte les fournisseurs d'hébergement DNS (Cloudflare, AWS Route 53, OVH)."
  - "Scanner de DNS inversé (PTR) pour identifier le nom d'hôte d'une adresse IP."
  - "Partage des résultats via des paramètres d'URL (?domain=exemple.fr)."
useCases:
  - "Développeurs web dépannant des migrations de serveurs."
  - "Administrateurs système auditant le SPF/DMARC pour éviter le spoofing d'e-mails."
  - "Experts SEO diagnostiquant la latence du domaine et les configurations DNSSEC."
  - "Auditeurs de sécurité scannant les domaines pour vérifier la protection des certificats SSL (CAA)."
howToSteps:
  - "Saisissez un nom de domaine (ex: exemple.fr) ou une adresse IP dans la barre."
  - "Cliquez sur 'Interroger DNS' pour lancer l'inspection sécurisée côté serveur."
  - "Consultez les cartes présentant le fournisseur d'hébergement et les serveurs de noms."
  - "Naviguez entre les onglets pour examiner chaque type d'enregistrement (A, MX, TXT, CNAME)."
  - "Vérifiez l'onglet 'Diagnostic de sécurité' pour des alertes sur la protection SPF ou DMARC."
---

## Introduction au Système de Noms de Domaine (DNS)

Le **DNS** est la pierre angulaire d'Internet. Souvent appelé « l'annuaire d'Internet », le DNS traduit les noms de domaine lisibles par l'homme (comme `exemple.fr`) en adresses IP compréhensibles par les machines (comme `93.184.216.34`).

Lorsque vous modifiez une configuration DNS, il faut attendre le délai de propagation (le TTL). Cet outil développeur vous permet d'interroger directement les serveurs autoritaires pour vérifier en temps réel si vos changements ont été appliqués.

---

## Détail des Enregistrements DNS (Champs)

### 1. Enregistrements A et AAAA (Adresses IP)
* **Le champ A** : Relie votre nom de domaine au serveur Web hébergeant votre site à l'aide d'une adresse IPv4 (32 bits).
* **Le champ AAAA** : Fonctionne de manière identique mais avec une adresse IPv6 (128 bits). Idéal pour assurer la pérennité du réseau.

### 2. Enregistrement CNAME (Alias)
Un enregistrement CNAME fait correspondre un sous-domaine à un autre domaine (le domaine canonique). 
*Attention : Les normes RFC interdisent de placer un CNAME sur le domaine racine (ex: `exemple.fr`). Il ne peut être placé que sur un sous-domaine (`www.exemple.fr`).*

### 3. Enregistrement MX (Mail eXchanger)
Spécifie les serveurs chargés de recevoir les courriels envoyés à votre domaine. Chaque enregistrement MX inclut une priorité (le chiffre le plus bas indique la plus haute priorité).

### 4. Enregistrement TXT (Texte)
Contient des données lisibles par l'homme ou la machine. Indispensable pour la validation de la propriété d'un site (Validation Google Search Console) et pour la sécurité des e-mails (SPF, DKIM, DMARC).

### 5. Enregistrement NS (NameServer)
Définit quels serveurs ont l'autorité pour gérer votre zone DNS (ex: `ns1.cloudflare.com`).

### 6. Enregistrement CAA (Certification Authority Authorization)
Spécifie quelles autorités de certification (comme Let's Encrypt) sont autorisées à émettre des certificats SSL/TLS pour le domaine. Bloque la fraude aux certificats.

### 7. Enregistrement PTR (DNS inversé)
Contrairement au champ A, le champ PTR fait correspondre une adresse IP à un nom de domaine. Très utilisé par les serveurs de messagerie pour filtrer le SPAM en vérifiant l'identité de l'IP émettrice.

---

## Sécurité des E-mails : SPF, DKIM et DMARC

L'e-mail est par nature vulnérable à l'usurpation d'identité. Pour protéger votre marque et empêcher vos courriels de finir dans le dossier SPAM, vous devez configurer ces 3 enregistrements TXT :

1. **SPF (Sender Policy Framework)** : Répertorie toutes les adresses IP et serveurs autorisés à envoyer des e-mails en votre nom. (Ex: `v=spf1 include:_spf.google.com -all`).
2. **DKIM** : Ajoute une signature numérique (cryptographique) aux en-têtes de vos e-mails sortants.
3. **DMARC** : Lie le SPF et le DKIM. Il indique aux serveurs de réception comment traiter les courriels qui échouent aux tests SPF ou DKIM (`p=reject` demandera au serveur de rejeter formellement l'e-mail pirate).

Utilisez notre outil de **Recherche DNS** pour auditer la sécurité de votre domaine et garantir une délivrabilité parfaite de vos campagnes.
