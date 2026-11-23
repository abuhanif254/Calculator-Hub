---
metaTitle: "DNS Lookup & Domain Check | A, MX, TXT, SPF & DMARC"
metaDescription: "Prüfen Sie A, AAAA, CNAME, MX, TXT, NS, SOA, CAA und PTR Records in Echtzeit. Analysieren Sie SPF-Lookups, DMARC-Policies, TTL und Propagierung."
metaKeywords: "dns lookup, dns check, mx record prüfen, txt record auslesen, spf prüfen, dmarc check, caa record, reverse dns ptr, dns propagierung"
title: "DNS Lookup & Domain Analyser"
shortDescription: "Analysieren Sie alle zentralen DNS-Ressourceneinträge (A, AAAA, CNAME, MX, TXT, NS, SOA, CAA, SRV, PTR) in Echtzeit – inklusive SPF-/DMARC-Sicherheitsdiagnose und TTL-Inspektion."
faqs:
  - question: "Warum zeigen verschiedene DNS-Server nach einer Änderung unterschiedliche Einträge an?"
    answer: "Das Domain Name System arbeitet nicht per aktivem Push, sondern über dezentrales Caching. Jeder rekursive Resolver speichert eine Antwort genau so lange zwischen, wie es der TTL-Wert (Time to Live) des vorherigen Eintrags vorgibt. Erst nach Ablauf dieser Zeitspanne fragt er den autoritativen Nameserver erneut ab – genau dieser Vorgang wird als DNS-Propagierung bezeichnet."
  - question: "Warum darf ein CNAME-Record nicht auf der Root-Domain (Zone Apex) gesetzt werden?"
    answer: "Gemäß RFC 1912 Abschnitt 2.4 darf ein CNAME nicht gemeinsam mit anderen Record-Typen auf demselben Domainnamen koexistieren. Da jede Root-Domain (etwa beispiel.de) zwingend SOA- und NS-Einträge – und häufig auch MX- oder TXT-Einträge – benötigt, führt ein CNAME am Apex zu schwerwiegenden Auflösungs- und E-Mail-Ausfällen. Moderne DNS-Anbieter umgehen dies per CNAME-Flattening bzw. ALIAS-/ANAME-Records."
  - question: "Was bedeutet das 10-Lookup-Limit bei SPF-Records und was passiert bei Überschreitung?"
    answer: "RFC 7208 begrenzt die Auswertung eines SPF-TXT-Eintrags auf maximal zehn DNS-auflösende Mechanismen (wie include, a, mx, ptr, exists oder redirect), um Denial-of-Service-Verstärkungen zu verhindern. Überschreitet eine Domain inklusive verschachtelter includes zehn Lookups, wertet der Empfängerserver den Eintrag als PermError aus und lehnt die E-Mail im Zweifel ab."
  - question: "Welchen Zweck erfüllt ein CAA-Record für die SSL/TLS-Sicherheit?"
    answer: "Ein Certification Authority Authorization (CAA) Record nach RFC 8659 legt öffentlich im DNS fest, welche Zertifizierungsstellen (z. B. letsencrypt.org oder digicert.com) überhaupt TLS-Zertifikate für Ihre Domain ausstellen dürfen. Alle öffentlich vertrauenswürdigen CAs sind verpflichtet, CAA-Einträge vor jeder Ausstellung zu prüfen."
  - question: "Wofür benötigen Mailserver einen Reverse-DNS-Eintrag (PTR)?"
    answer: "Ein PTR-Record löst eine IPv4- oder IPv6-Adresse über die speziellen Zonen in-addr.arpa bzw. ip6.arpa zurück in einen Hostnamen auf. Große E-Mail-Provider prüfen per Forward-Confirmed Reverse DNS (FCrDNS), ob der PTR-Hostname auch wieder per A/AAAA-Record auf dieselbe IP zeigt – fehlt diese Übereinstimmung, landen Mails fast immer im Spam."
features:
  - "Echtzeit-Abfrage aller zehn zentralen DNS-Record-Typen (A, AAAA, CNAME, MX, TXT, NS, SOA, CAA, SRV, PTR)"
  - "Automatisierte E-Mail-Sicherheitsanalyse für SPF-Syntax, Lookup-Zählung und DMARC-Richtlinien (_dmarc)"
  - "Anzeige exakter TTL-Werte, MX-Prioritäten, SOA-Seriennummern und autoritativer Nameserver-Delegationen"
  - "Reverse-DNS-Auflösung (PTR) zur Überprüfung von Mailserver-IPs und Hosting-Infrastrukturen"
  - "Erkennung gängiger DNS- und Cloud-Anbieter (Cloudflare, Route 53, Hetzner, DENIC-Delegationen)"
  - "Direkte Teilbarkeit von Diagnose-Ergebnissen für Entwickler-, DevOps- und Support-Teams"
useCases:
  - "Risikoarme Vorbereitung und Live-Verifizierung von Server-Migrationen und Domain-Umzügen"
  - "Audit und Absicherung geschäftlicher E-Mail-Domains gegen Phishing und Absender-Spoofing (SPF, DKIM, DMARC)"
  - "Diagnose langsamer Website-Ladezeiten (TTFB) und fehlgeschlagener SSL-Zertifikatserneuerungen durch CAA-Konflikte"
  - "Prüfung korrekter Domain-Verifizierungs-Tokens (TXT) für Google Search Console, Microsoft 365 und SaaS-Tools"
  - "Kontrolle der Reverse-DNS-Konfiguration (FCrDNS) vor der Inbetriebnahme dedizierter SMTP-Relay-Server"
  - "Aufdeckung fehlerhafter Nameserver-Delegationen und veralteter SOA-Seriennummern zwischen Primary und Secondary NS"
howToSteps:
  - "Geben Sie den zu prüfenden Domainnamen (z. B. beispiel.de), eine Subdomain oder eine IP-Adresse ein."
  - "Starten Sie die Live-Abfrage, um aktuelle Ressourceneinträge direkt über autoritative DNS-Strukturen auszulesen."
  - "Kontrollieren Sie in der Übersicht zunächst NS- und A/AAAA-Records auf korrekte Ziel-IPs und erwartete TTL-Werte."
  - "Wechseln Sie zu den MX- und TXT-Einträgen, um Mail-Routing, Verifizierungs-Tokens sowie SPF- und DMARC-Einträge zu prüfen."
  - "Überprüfen Sie bei SSL- oder Mailserver-Problemen gezielt CAA-Einträge, SOA-Timings und Reverse-DNS (PTR)."
  - "Dokumentieren oder teilen Sie den Abfragebericht zur Fehlerbehebung mit Ihrem Hosting- oder IT-Team."
---

Das **Domain Name System (DNS)** bildet die hierarchische, global verteilte Namensauflösung des Internets gemäß **RFC 1034** und **RFC 1035**. Bevor ein Browser das erste Byte HTML empfangen oder ein Mailserver eine SMTP-Sitzung aushandeln kann, muss der symbolische Domainname in eine routbare IP-Adresse oder einen spezialisierten Diensteintrag aufgelöst werden. Schon kleinste Konfigurationsfehler in einer DNS-Zone – etwa ein unzulässiger CNAME am Zone Apex, ein überschrittenes SPF-Lookup-Limit oder ein vergessener AAAA-Record – führen unmittelbar zu Website-Ausfällen, unzustellbaren Geschäfts-E-Mails oder blockierten TLS-Zertifikatserneuerungen.

## Anatomie einer DNS-Auflösung und Propagierungsmechanik

Sobald ein Client eine Adresse wie `www.beispiel.de` auflöst, greift eine mehrstufige Delegationskette:

1. **Stub Resolver & Rekursiver Resolver:** Das Betriebssystem prüft zuerst seinen lokalen DNS-Cache und die `hosts`-Datei. Bei einem Cache-Miss kontaktiert es den konfigurierten rekursiven Resolver (etwa den Provider-Resolver, Cloudflare `1.1.1.1` oder Google `8.8.8.8`).
2. **Iterative Traversierung:** Ist der Eintrag auch dort nicht zwischengespeichert, befragt der rekursive Resolver nacheinander einen der 13 logischen **Root-Nameserver** (`.`), anschließend den zuständigen **TLD-Nameserver** (für `.de` die Infrastruktur der **DENIC**), der per NS-Delegation – und bei Bedarf inklusive **Glue-Records** – an den **autoritativen Nameserver** der Zieldomain verweist.
3. **Transportprotokolle und Paketgrößen:** Standardabfragen laufen über UDP Port 53 mit einer historischen 512-Byte-Grenze. Größere Antworten (insbesondere durch DNSSEC-Signaturen oder umfangreiche TXT-Sets) nutzen die Erweiterung **EDNS0 (RFC 6891)** oder schalten bei gesetztem `TC`-Flag (*Truncated*) auf TCP Port 53 um. Zwischen Endgerät und Resolver schützen moderne Transportprotokolle wie **DoH (DNS over HTTPS, RFC 8484)** und **DoT (DNS over TLS, RFC 7858)** die Anfragen vor Mitlesen und Manipulation.

Die landläufig als **DNS-Propagierung** bezeichnete Verzögerung ist technisch kein aktiver Verteilungsprozess, sondern das Ablaufen zwischengespeicherter Einträge entsprechend ihrer **TTL (Time to Live)** in Sekunden. Auch Negativantworten (`NXDOMAIN`) werden gemäß dem `MINIMUM`-Feld des SOA-Records gecacht (**RFC 2308**). Für einen nahtlosen Serverumzug reduziert man die TTL mindestens 24 bis 48 Stunden **vor** dem Wechsel schrittweise auf `300` Sekunden, schaltet anschließend die Ziel-IP um und hebt die TTL erst nach erfolgreicher Verifizierung wieder auf produktive Werte (etwa `3600` Sekunden) an.

## Spezifikation aller zehn zentralen DNS-Record-Typen

| Record-Typ | Primärer Zweck & Standard | Beispiel-Eintrag (Zonefile-Syntax) | Häufige Fehlerquelle in der Praxis |
| :--- | :--- | :--- | :--- |
| **A** | IPv4-Adresse (32 Bit, RFC 1035) | `beispiel.de. 300 IN A 93.184.216.34` | Veraltete Server-IP nach Hosting-Wechsel |
| **AAAA** | IPv6-Adresse (128 Bit, RFC 3596) | `beispiel.de. 300 IN AAAA 2001:db8::1` | Vergessener AAAA-Record leitet Dual-Stack-Clients auf alten Server |
| **CNAME** | Kanonischer Alias (RFC 1035/1912) | `www IN CNAME beispiel.de.` | Unzulässiger Einsatz am Zone Apex kollidiert mit NS/MX |
| **MX** | Mail-Routing mit Priorität | `@ IN MX 10 mail.beispiel.de.` | Ziel zeigt auf IP oder CNAME statt auf A/AAAA-Hostnamen |
| **TXT** | Freitext, Verifizierung, SPF/DMARC | `@ IN TXT "v=spf1 include:_spf.ex.de -all"` | Zeichenketten über 255 Byte nicht sauber in Teilstrings getrennt |
| **NS** | Autoritative Nameserver | `@ IN NS ns1.dns-anbieter.de.` | Abweichung zwischen Registrar-Delegation und Zonen-NS |
| **SOA** | Zonen-Metadaten & Timings | `ns1.ex.de. hostmaster.ex.de. 2026051201 ...` | Serial nicht erhöht – Secondary-NS ignoriert Zonen-Update |
| **CAA** | Zugelassene Zertifizierungsstellen (RFC 8659) | `@ IN CAA 0 issue "letsencrypt.org"` | Blockiert unerwartet ACME-/Auto-SSL-Verlängerung |
| **SRV** | Dienst-Lokalisierung (Host, Port, Weight) | `_sip._tls IN SRV 10 5 5061 sip.ex.de.` | Fehlendes Unterstrich-Präfix bei Dienst- oder Protokollnamen |
| **PTR** | Reverse DNS (IP → Hostname) | `34.216.184.93.in-addr.arpa. IN PTR mail.ex.de.` | Fehlende FCrDNS-Übereinstimmung führt zu SMTP-Ablehnung |

## E-Mail-Authentifizierung: SPF, DKIM und DMARC korrekt verknüpfen

Gegen Phishing, Domain-Spoofing und Zustellungsprobleme bei großen Mail-Providern (wie Google, Microsoft, GMX und WEB.DE) ist das konsistente Zusammenspiel von SPF, DKIM und DMARC unerlässlich:

```bind
; 1. SPF (RFC 7208) – maximal 10 DNS-Lookups einhalten!
beispiel.de.         3600 IN TXT "v=spf1 ip4:198.51.100.10 include:_spf.mailprovider.de -all"

; 2. DKIM (RFC 6376) – öffentlicher RSA-2048-Schlüssel unter Selektor-Subdomain
s2026._domainkey.beispiel.de. 3600 IN TXT "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A..."

; 3. DMARC (RFC 7489) – Richtlinie, Alignment und aggregierte XML-Berichte
_dmarc.beispiel.de.  3600 IN TXT "v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s; pct=100; rua=mailto:dmarc@beispiel.de"

; 4. CAA (RFC 8659) – TLS-Zertifikatsausstellung auf Let's Encrypt beschränken
beispiel.de.         3600 IN CAA 0 issue "letsencrypt.org"
beispiel.de.         3600 IN CAA 0 issuewild ";"
```

Achten Sie bei **SPF** auf zwei kritische Regeln: Pro Domain darf exakt **ein** `v=spf1`-TXT-Eintrag existieren (zwei parallele Einträge erzeugen sofort einen `PermError`), und sämtliche `include`-Ketten dürfen zusammen höchstens 10 DNS-Lookups auslösen. Vermeiden Sie zudem manuelles SPF-Flattening per statischer IP-Liste bei großen Cloud-Maildiensten, da sich deren IP-Bereiche unangekündigt ändern können. Bei **DMARC** empfiehlt sich ein stufenweiser Rollout: Starten Sie mit `p=none`, werten Sie die eingehenden `rua`-XML-Berichte aus, schließen Sie alle legitimen Versandquellen (Newsletter, ERP, Ticketsystem) ein und erhöhen Sie anschließend über `p=quarantine` bis zum strikten `p=reject`.

## Praxis-Troubleshooting für Web-, Mail- und DevOps-Teams

Treten nach einer DNS-Umstellung unerwartete Erreichbarkeits- oder Sicherheitsfehler auf, grenzen folgende Prüfungen die Ursache schnell ein:

* **Dual-Stack-Falle (IPv4 vs. IPv6):** Wurde beim Serverumzug ausschließlich der `A`-Record angepasst, während ein älterer `AAAA`-Record aktiv blieb, steuern IPv6-fähige Mobilfunk- und Glasfaser-Anschlüsse weiterhin den alten Host an. Prüfen Sie Ziel-IPs und Netzbetreiber direkt im [IP-Lookup-Tool](/de/werkzeuge/ip-lookup).
* **SSL-, Redirect- und HTTP-Folgefehler:** Löst die Domain auf die korrekte Ziel-IP auf, liefert aber unerwartete Statuscodes oder TLS-Warnungen, analysieren Sie die HTTP-Antwortkette anschließend im [HTTP-Header-Checker](/de/werkzeuge/http-header-checker) sowie im [Redirect-Checker](/de/werkzeuge/redirect-checker).
* **DNSSEC-Ausfall (`SERVFAIL`) beim Registrar-Umzug:** Schlägt die Namensauflösung nach einem Nameserver-Wechsel plötzlich vollständig mit `SERVFAIL` fehl, verweist häufig noch ein veralteter **DS-Record** bei der übergeordneten Registry (z. B. DENIC) auf den früheren `DNSKEY`, sodass die kryptografische `RRSIG`-Prüfung scheitert. Deaktivieren oder rotieren Sie den DS-Eintrag vor einem Providerwechsel koordiniert. Zur weiteren technischen Optimierung Ihrer produktiven Domain stehen Ihnen zudem der [Robots.txt-Generator](/de/werkzeuge/robots-txt-generator) und der [Sitemap-XML-Generator](/de/werkzeuge/sitemap-xml-generator) bereit.

### Ergänzende Konsolen-Diagnose bei Zonenfehlern

Wenn ein Browser-Check und interne Systeme voneinander abweichen, grenzt der direkte Vergleich zwischen dem autoritativen Nameserver und einem öffentlichen Resolver das Problem sekundenschnell ein. Auf Linux- oder macOS-Systemen verfolgt `dig +trace beispiel.de` die gesamte Delegationskette ab den Root-Servern live mit, während gezielte Abfragen gegen einzelne Record-Typen (wie `TXT` für `_dmarc.beispiel.de` oder `MX` für das Mail-Routing) sofort offenlegen, ob ein Tippfehler in der Zonendatei vorliegt oder lediglich ein noch laufender TTL-Cache beim lokalen Internetanbieter die Aktualisierung verzögert.
