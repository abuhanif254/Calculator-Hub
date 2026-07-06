---
metaTitle: "DNS Lookup & Domain Check | A, MX, TXT, SPF, DMARC prüfen"
metaDescription: "Prüfen Sie DNS-Einträge in Echtzeit. Analysieren Sie A, AAAA, MX, TXT, CNAME, NS Records. Testen Sie E-Mail-Sicherheit (SPF, DMARC) und DNS-Propagierung."
metaKeywords: "dns lookup, dns check, mx record prüfen, txt record auslesen, a record checker, spf check, dmarc prüfen, ns lookup, whois domain check"
title: "DNS Lookup & Domain Analyser"
shortDescription: "Prüfen Sie 10 DNS-Eintragsarten (A, MX, TXT, CNAME) in Echtzeit. Diagnostizieren Sie E-Mail-Sicherheitslücken (SPF/DMARC) und Provider-Latenzen."
faqs:
  - question: "Was ist ein DNS Lookup?"
    answer: "Ein DNS-Lookup fragt DNS-Server (Nameserver) ab, um die mit einer Domain verknüpften Einträge zu finden. Dazu gehören IP-Adressen (A-Records), Mailserver (MX) und Sicherheitseinträge (TXT)."
  - question: "Was bedeutet DNS-Propagierung?"
    answer: "Wenn Sie einen DNS-Eintrag ändern, muss sich diese Änderung weltweit auf allen zwischenspeichernden (Caching) DNS-Servern verteilen. Das dauert in der Regel zwischen wenigen Minuten und 48 Stunden, abhängig vom eingestellten TTL (Time to Live) Wert."
  - question: "Warum sind TXT-Records so wichtig?"
    answer: "TXT-Einträge enthalten einfache Textinformationen. Sie werden heute primär genutzt, um den Domain-Besitz (z. B. bei der Google Search Console) zu bestätigen und um Anti-Spam-Maßnahmen wie SPF, DKIM und DMARC zu konfigurieren."
  - question: "Was ist SPF (Sender Policy Framework)?"
    answer: "SPF ist ein DNS-TXT-Eintrag, der genau auflistet, welche IP-Adressen und Mailserver berechtigt sind, E-Mails im Namen Ihrer Domain zu versenden. Es schützt Ihre Marke vor Spammern, die Ihre E-Mail-Adresse fälschen wollen."
  - question: "Was ist DMARC?"
    answer: "DMARC ist eine Richtlinie im DNS, die Empfängerservern (wie Gmail oder Outlook) sagt, was mit E-Mails passieren soll, die durch den SPF- oder DKIM-Test durchfallen (z. B. als Spam markieren oder komplett abweisen)."
  - question: "Kann eine schlechte DNS-Konfiguration SEO schaden?"
    answer: "Absolut. Wenn Ihre Nameserver langsam antworten, erhöht sich die Ladezeit Ihrer Website (Time to First Byte - TTFB). Google straft langsame Seiten im Ranking ab. Bei DNS-Ausfällen kann der Googlebot Ihre Seite gar nicht mehr crawlen."
features:
  - "Fragt 10 Kern-DNS-Einträge ab (A, AAAA, MX, TXT, CNAME, NS, SOA, CAA, SRV, PTR)."
  - "Prüft E-Mail-Sicherheitseinstellungen (SPF-Validierung, DMARC-Richtlinien)."
  - "Integriertes WHOIS-Tool (RDAP) für Registrierungs- und Ablaufdaten der Domain."
  - "Erkennt automatisch Hosting-Netzwerke und DNS-Provider (Cloudflare, Route 53)."
  - "Reverse DNS (PTR) Scanner zur Ermittlung des Hostnamens einer IP-Adresse."
  - "Teilen Sie die Abfrage-Ergebnisse einfach über die URL (?domain=example.de)."
useCases:
  - "Webentwickler, die Domain-Umzüge und Subdomain-Mappings durchführen."
  - "IT-Administratoren, die das E-Mail-Spoofing (Phishing) durch SPF/DMARC Audits verhindern wollen."
  - "SEO-Experten, die Ladezeiten (TTFB) und DNS-Propagierung diagnostizieren."
  - "Sicherheits-Auditoren, die Domains auf unautorisierte SSL-Zertifikate (CAA) prüfen."
howToSteps:
  - "Geben Sie einen Domainnamen (z. B. example.de) oder eine IP-Adresse in das Suchfeld ein."
  - "Klicken Sie auf 'DNS Abfragen', um die serverseitige Live-Prüfung zu starten."
  - "Sehen Sie in den Übersichtskarten, bei welchem Provider die Domain gehostet wird."
  - "Navigieren Sie durch die Tabs (A, MX, TXT), um die einzelnen Einträge inklusive TTL zu prüfen."
  - "Prüfen Sie den Tab 'Sicherheits-Diagnose' auf Warnungen zu fehlendem SPF- oder DMARC-Schutz."
---

## Einführung in das Domain Name System (DNS)

Das **DNS (Domain Name System)** ist das Telefonbuch des Internets. Es übersetzt menschenlesbare Domainnamen (wie `example.de`) in maschinenlesbare IP-Adressen (wie `93.184.216.34`). 

Wenn Sie eine URL in den Browser eingeben, läuft im Hintergrund ein mehrstufiger Auflösungsprozess ab. Mit unserem Tool können Sie DNS-Einträge direkt bei autoritativen Namensservern abfragen. So erkennen Sie fehlerhafte Weiterleitungen, prüfen Spam-Schutzeinstellungen für E-Mails und testen die weltweite Erreichbarkeit (Propagierung).

---

## Die wichtigsten DNS-Record-Arten erklärt

### 1. A-Record (IPv4-Adresse)
Der A-Record ist der wichtigste Eintrag. Er verbindet Ihre Domain direkt mit der 32-Bit IPv4-Adresse des Servers, auf dem Ihre Website liegt.
* **Beispiel:** `example.de. IN A 93.184.216.34`

### 2. AAAA-Record (IPv6-Adresse)
Funktioniert wie der A-Record, verweist jedoch auf die neuere, 128-Bit lange IPv6-Adresse.

### 3. CNAME-Record (Canonical Name)
Ein CNAME leitet eine Subdomain auf eine andere Domain (den kanonischen Namen) um. Er funktioniert wie eine Alias-Verknüpfung.
*Wichtig: Laut RFC-Standards darf ein CNAME nicht auf der Hauptdomain (Root-Domain, z. B. `example.de`) liegen, sondern nur auf Subdomains (`www.example.de`).*

### 4. MX-Record (Mail Exchanger)
Der MX-Eintrag legt fest, welche Server für den Empfang von E-Mails zuständig sind, die an Ihre Domain gesendet werden. Eine niedrige Prioritäts-Zahl bedeutet, dass dieser Server als erstes kontaktiert wird.

### 5. TXT-Record (Text Record)
TXT-Records speichern Textinformationen. Sie werden von Google, Microsoft und anderen Diensten zur Bestätigung der Domain-Inhaberschaft genutzt. Ebenso sind sie das Fundament der E-Mail-Sicherheit (SPF, DMARC, DKIM).

### 6. NS-Record (Nameserver)
Definiert, welche Server berechtigt (autoritativ) sind, auf DNS-Anfragen für Ihre Domain zu antworten (z. B. `ns1.cloudflare.com`).

### 7. CAA-Record (Zertifizierungsstelle)
Ein CAA-Record legt fest, welche Aussteller (z. B. Let's Encrypt) SSL/TLS-Zertifikate für Ihre Website ausstellen dürfen. Dies verhindert Man-in-the-Middle-Angriffe durch unberechtigte Zertifikats-Ausstellungen.

### 8. PTR-Record (Reverse DNS)
Während ein A-Record einen Namen in eine IP auflöst, macht der PTR-Record genau das Gegenteil: Er löst eine IP-Adresse in einen Domainnamen auf. Mailserver nutzen PTR-Checks, um Spam zu blockieren.

---

## E-Mail Sicherheit: SPF, DKIM und DMARC

E-Mails sind extrem anfällig für Spoofing (Fälschung der Absenderadresse). Um zu verhindern, dass Spammer im Namen Ihrer Domain E-Mails versenden, müssen Sie diese drei TXT-Records einrichten:

1. **SPF (Sender Policy Framework):** Eine Liste aller Server und IP-Adressen, die E-Mails für Ihre Domain versenden dürfen. Versendet ein fremder Server eine E-Mail, schlägt der SPF-Test fehl. (Beispiel: `v=spf1 include:_spf.google.com ~all`).
2. **DKIM (DomainKeys Identified Mail):** Fügt Ihren ausgehenden E-Mails eine kryptografische Signatur hinzu. Der öffentliche Schlüssel wird im DNS hinterlegt, damit der Empfänger die Echtheit prüfen kann.
3. **DMARC:** Gibt den Mail-Providern (Gmail, Outlook) genaue Anweisungen, was mit E-Mails passieren soll, die den SPF- oder DKIM-Test nicht bestehen (z. B. `p=reject` weist den Provider an, die Spam-Mail strikt abzulehnen).

Nutzen Sie unseren DNS-Checker, um Ihre Domain auf Konfigurationsfehler und Sicherheitslücken zu prüfen!
