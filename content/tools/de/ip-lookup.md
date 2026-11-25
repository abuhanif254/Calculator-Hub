---
metaTitle: "IP Lookup & Geolocation — ASN, ISP, rDNS & VPN prüfen"
metaDescription: "Prüfen Sie jede IPv4- oder IPv6-Adresse auf Standort, ASN, ISP, CIDR-Präfix, Reverse DNS (PTR) sowie VPN-, Proxy- und Tor-Signale mit SSRF-Schutz."
metaKeywords: "ip lookup, ip adresse orten, wie ist meine ip, ip geolocation, asn abfrage, isp herausfinden, reverse dns ptr, vpn proxy detektor, ipv4 ipv6 checker"
title: "IP Lookup & Geolocation Checker"
shortDescription: "Analysieren Sie öffentliche IPv4- und IPv6-Adressen in Echtzeit auf Geolocation, Internetprovider (ISP), ASN-Präfix, Reverse-DNS-Hostnamen sowie VPN-, Proxy-, Tor- und Rechenzentrums-Signale."
faqs:
  - question: "Warum zeigt IP-Geolocation oft eine Nachbarstadt statt meines exakten Wohnorts an?"
    answer: "IP-Geolocation ordnet Routing-Präfixe anhand von RIR-Registrierungen, Peering-Knoten und Latenzmessungen zu und nutzt keine GPS-Daten. Auf Landesebene liegt die Genauigkeit über 99 Prozent, auf Stadtebene jedoch häufig beim nächsten regionalen Broadband Network Gateway (BNG) Ihres Providers, das dutzende Kilometer entfernt stehen kann."
  - question: "Was passiert bei der Abfrage einer privaten RFC-1918-Adresse wie 192.168.1.1 oder 10.0.0.5?"
    answer: "Private, Loopback-, Link-Local- und CGNAT-Adressen werden im öffentlichen Internet nicht geroutet und besitzen weder öffentliche Geodaten noch eine eigene ASN. Unser Backend erkennt diese reservierten Subnetze sofort lokal, blockiert externe Abfragen zum Schutz vor SSRF und gibt stattdessen die exakte RFC-Klassifizierung aus."
  - question: "Warum liefern Anycast-Adressen wie 8.8.8.8 oder 1.1.1.1 unerwartete Standorte?"
    answer: "Bei BGP-Anycast kündigen Betreiber denselben IP-Bereich gleichzeitig an hunderten weltweiten Rechenzentrums-Standorten an, damit Router Pakete zum topologisch nächsten Knoten lenken. Da kein einzelner physischer Standort existiert, ordnen Geolocation-Datenbanken das Präfix meist dem Unternehmenssitz oder einem Landesmittelpunkt zu."
  - question: "Wie überprüft Forward-Confirmed Reverse DNS (FCrDNS) legitime Server?"
    answer: "FCrDNS fragt zuerst den PTR-Eintrag (Reverse DNS) einer IP-Adresse ab, um den Hostnamen zu ermitteln, und prüft anschließend per Vorwärtsabfrage (A- oder AAAA-Record), ob dieser Hostname wieder exakt auf die ursprüngliche IP zeigt. Mailserver und Firewalls erkennen damit echte Mail-Relays und seriöse Suchmaschinen-Crawler."
  - question: "Bedeutet ein Hosting- oder VPN-Hinweis automatisch, dass eine IP bösartig ist?"
    answer: "Nein. Eine Hosting-Markierung zeigt lediglich an, dass das Präfix zu einer Cloud- oder Rechenzentrums-ASN wie AWS, Hetzner oder Google Cloud gehört, während ein VPN-Flag auf einen geteilten Datenschutz-Tunnel verweist. Sicherheitsteams nutzen solche Signale als Risikofaktor für Zusatzprüfungen statt als pauschale Sperrregel."
features:
  - "Dual-Stack-Formatprüfung für IPv4 und IPv6 inklusive automatischer Ermittlung Ihrer aktuellen öffentlichen Client-IP"
  - "Mehrstufige Geolocation-Pipeline mit Fallback-Anbietern für Land, Region, Stadt, Postleitzahl, Koordinaten und IANA-Zeitzone"
  - "Zuordnung von Autonomous System Number (ASN), Internetprovider (ISP), Organisation, CIDR-Präfix und Verbindungstyp"
  - "Parallele Reverse-DNS-Auflösung (rDNS) für PTR-Hostnamen über die Zonen in-addr.arpa und ip6.arpa"
  - "Netzwerk- und Anonymisierungs-Erkennung für Tor-Exit-Nodes, offene Proxies, VPN-Endpunkte und Cloud-Rechenzentren"
  - "Integrierte Erkennung von RFC-1918-, RFC-6598-, RFC-4193- und Loopback-Blöcken mit SSRF-Schutz sowie JSON- und TXT-Export"
useCases:
  - "Untersuchung verdächtiger Quell-IPs aus Nginx-, Apache- oder WAF-Zugriffslogs bei Brute-Force- und Scraping-Wellen"
  - "Kontrolle ausgehender Mailserver-IPs auf stimmige Reverse-DNS-PTR-Einträge vor dem Produktivstart neuer Versandserver"
  - "Überprüfung von VPN-Tunneln, Split-Tunnel-Egress und IPv6-Leaks während Netzwerk- und Datenschutz-Audits"
  - "Betrugsprävention im Online-Handel durch Abgleich von Rechnungsland, IP-Standort und Proxy- oder Tor-Risikowerten"
  - "Ermittlung von Cloud-Provider-ASN und CIDR-Block hinter unbekannten Webhook-Callbacks oder Drittanbieter-Integrationen"
  - "Einordnung von Firewall-Alarmen nach Privatkunden-Anschluss, mobilem CGNAT-Pool oder Rechenzentrums-Infrastruktur"
howToSteps:
  - "Öffnen Sie das Tool zur automatischen Anzeige Ihrer öffentlichen IP oder tragen Sie eine beliebige IPv4- bzw. IPv6-Adresse ein."
  - "Starten Sie die Analyse, um Geolocation-Abgleich, Anonymisierungsprüfung und Reverse-DNS-Abfrage parallel auszuführen."
  - "Lesen Sie im Standort- und Kartenbereich Land, Bundesland bzw. Region, Stadt, Koordinaten und IANA-Zeitzone ab."
  - "Prüfen Sie in der Netzwerk-Ansicht die zugehörige ASN, den ISP-Namen, die Organisation sowie das geroutete CIDR-Präfix."
  - "Kontrollieren Sie die Sicherheits- und rDNS-Felder auf VPN-, Proxy-, Tor- oder Hosting-Markierungen sowie PTR-Hostnamen."
  - "Kopieren Sie die strukturierte Zusammenfassung oder laden Sie den vollständigen Prüfbericht lokal als JSON oder TXT herunter."
---

Jedes Datenpaket im öffentlichen Internet trägt eine Quell- und Ziel-IP-Adresse, doch bloße Oktette oder Hexadezimalblöcke liefern Administratoren und Entwicklern zunächst kaum Kontext. Belastbare Netzwerkinformationen entstehen erst durch die Verknüpfung dreier unabhängiger Infrastruktur-Ebenen: globale BGP-Routing- und RIR-Register, kommerzielle Geolocation-Datenbanken sowie Reverse-DNS-Pointer-Zonen. Dieser IP Lookup Analyzer führt alle Abfragen parallel über SSRF-gesicherte Server-Endpunkte aus, schaltet bei Provider-Ausfällen automatisch auf Fallback-Quellen um und bereitet Standortkarte, ASN-Routing, PTR-Hostnamen und Sicherheitsindikatoren exportfertig im Browser auf.

## IPv4-Knappheit, kanonisches IPv6-Format und reservierte Blöcke

Das weltweite Internet-Routing arbeitet parallel mit 32-Bit-IPv4-Adressen (`4.294.967.296` theoretische Adressen) und 128-Bit-IPv6-Adressen (`3,4 × 10^38` Adressen). Da sich eine identische IPv6-Adresse auf dutzende Arten schreiben lässt, definiert RFC 5952 eine verbindliche kanonische Darstellung: Kleinbuchstaben für Hexadezimalziffern, Wegfall führender Nullen innerhalb jedes 16-Bit-Hextetts sowie genau eine Komprimierung mit `::` für die längste aufeinanderfolgende Reihe aus mindestens zwei Null-Hextetts (etwa `2001:4860:4860::8888`). Dual-Stack-Server protokollieren IPv4-Clients außerdem häufig als IPv4-mapped IPv6-Adressen im Bereich `::ffff:0:0/96` (z. B. `::ffff:203.0.113.45`), die vor einer IPv4-Datenbankabfrage sauber ausgepackt werden müssen.

Nicht jede syntaktisch gültige Adresse ist weltweit erreichbar. Die IANA reserviert in beiden Protokollfamilien spezielle Adressblöcke, die im öffentlichen BGP-Routing niemals weitergeleitet werden dürfen:

| CIDR-Block | Protokoll | Standard / RFC | Geltungsbereich & technisches Verhalten |
| :--- | :--- | :--- | :--- |
| `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16` | IPv4 | RFC 1918 | Private Firmen- und Heimnetze; Zugriff ins Internet erfolgt über NAT am Gateway. |
| `100.64.0.0/10` | IPv4 | RFC 6598 | Carrier-Grade NAT (CGNAT) zwischen Provider-Kernnetz und Kundenroutern. |
| `127.0.0.0/8` / `::1/128` | IPv4 / IPv6 | RFC 1122 / 4291 | Lokales Loopback-Interface; Pakete verlassen den eigenen OS-Netzwerkstack nicht. |
| `169.254.0.0/16` / `fe80::/10` | IPv4 / IPv6 | RFC 3927 / 4291 | Link-Local Unicast; automatische Adressierung innerhalb eines einzelnen Netzwerksegments. |
| `fc00::/7` (`fd00::/8`) | IPv6 | RFC 4193 | Unique Local Addresses (ULA) für privates internes IPv6-Routing ohne Internet-Erreichbarkeit. |
| `192.0.2.0/24`, `198.51.100.0/24`, `203.0.113.0/24` | IPv4 | RFC 5737 | Dokumentations- und Testnetze (`TEST-NET-1/2/3`), ausgeschlossen aus globalen Routen. |
| `2001:db8::/32` | IPv6 | RFC 3849 | Offizielles IPv6-Dokumentationspräfix für Beispiele und Konfigurationsvorlagen. |

Wird ein reservierter oder privater Bereich eingegeben, klassifiziert unser Backend ihn unmittelbar lokal und überspringt sämtliche externen HTTP- und DNS-Anfragen – ein zentraler Baustein zur Abwehr von Server-Side Request Forgery (SSRF).

## Autonome Systeme (AS), BGP-Präfixe und RIR-Zuständigkeiten

Das öffentliche Internet besteht aus einem Geflecht von rund 75.000 aktiven **Autonomen Systemen (AS)** – eigenständig verwalteten Netzen, die ihre Erreichbarkeitsinformationen per Border Gateway Protocol (BGP) austauschen. Jedes Netz erhält eine eindeutige **Autonomous System Number (ASN)** – ursprünglich 16-Bit (`1–65535`), inzwischen gemäß RFC 6793 auf 32-Bit-Zahlen erweitert – von einer der fünf Regional Internet Registries (RIRs):

- **RIPE NCC** (Europa inkl. DACH-Region, Naher Osten und Teile Zentralasiens)
- **ARIN** (Nordamerika und Teile der Karibik)
- **APNIC** (Asien-Pazifik)
- **LACNIC** (Lateinamerika und Karibik)
- **AFRINIC** (Afrika)

Router leiten Pakete anhand des **Longest-Prefix-Match** gegen angekündigte CIDR-Blöcke weiter (typischerweise `/24` oder größer bei IPv4 und `/48` oder größer bei IPv6). In der Log-Analyse verrät die ASN oft wesentlich mehr als ein Stadtname: Taucht bei Login-Versuchen `AS16509` (Amazon AWS) oder `AS24940` (Hetzner Online) auf, handelt es sich fast sicher um Server- oder Bot-Traffic, während `AS3320` (Deutsche Telekom) oder `AS6830` (Vodafone/Liberty Global) auf klassische Endkunden- oder Mobilfunkanschlüsse hinweist. Über das moderne JSON-Protokoll **RDAP** (RFC 7480 ff.), das schrittweise klassisches Port-43-WHOIS ablöst, lassen sich zu jeder Zuteilung zudem `netname`, Zuteilungsstatus (`ASSIGNED PA` bzw. `ALLOCATED PA`) und der zuständige Abuse-Kontakt für Missbrauchsmeldungen ermitteln.

## Ursachen für Geolocation-Abweichungen: CGNAT, Anycast und IP-Leasing

Viele Entwickler überschätzen die räumliche Genauigkeit von IP-Geolocation und bauen daraus zu strikte Geo-Fences oder Betrugsfilter. Drei reale Netzwerkmechanismen erklären, warum Standortangaben oft um dutzende Kilometer abweichen:

1. **Provider-Aggregation und Mobilfunk-CGNAT**: Mobilfunk- und Glasfaseranbieter bündeln zehntausende Anschlüsse hinter wenigen zentralen NAT-Gateways. Ein Smartphone-Nutzer in Freiburg oder Graz tritt dadurch häufig über einen zentralen Übergabepunkt in Frankfurt oder Wien ins Internet aus.
2. **BGP-Anycast-Präfixe**: Öffentliche DNS-Resolver (`8.8.8.8`, `1.1.1.1`) und globale CDNs strahlen identische IP-Präfixe gleichzeitig aus hunderten Rechenzentren aus. Weil BGP jede Anfrage zum nächstgelegenen Edge-Standort lenkt, existiert kein einzelner geografischer Punkt für diese IP; Datenbanken zeigen stattdessen den Hauptsitz des Betreibers an.
3. **IPv4-Leasing-Märkte**: Wegen erschöpfter IPv4-Reserven vermieten Betreiber regelmäßig `/24`-Blöcke über Ländergrenzen hinweg. Bis aktualisierte Geofeed-CSV-Dateien nach RFC 8805 von allen Datenbankanbietern übernommen wurden, zeigen geleaste Bereiche mitunter wochenlang das bisherige Land.

Beachten Sie im europäischen Umfeld zusätzlich die **DSGVO-Einordnung**: Vollständige IP-Adressen gelten rechtlich als personenbezogene Daten. Für langfristige Web-Analytik empfiehlt sich daher die Kürzung auf `/24` (IPv4) beziehungsweise `/48` (IPv6) direkt im Reverse-Proxy, während ungekürzte Sicherheits-Logs strikt zweckgebunden und zeitlich befristet aufbewahrt werden sollten.

## Reverse DNS (FCrDNS) und Risikoklassifizierung von Anonymisierern

Reverse DNS löst eine IP-Adresse über spezielle `.arpa`-Zonen wieder in einen Hostnamen auf. IPv4 kehrt dazu die vier Dezimaloktette unter `.in-addr.arpa` um, während IPv6 sämtliche komprimierten Nullen auf 32 Hexadezimal-Nibbles erweitert und rückwärts unter `.ip6.arpa` abfragt. Mit `dig` überprüfen Sie PTR-Einträge und **Forward-Confirmed Reverse DNS (FCrDNS)** direkt in der Shell:

```bash
# IPv4 Reverse-DNS-Abfrage (prüft 8.8.8.8.in-addr.arpa PTR)
dig -x 8.8.8.8 +short
# -> dns.google.

# IPv6 Reverse-DNS-Abfrage (32 umgekehrte Hex-Nibbles unter ip6.arpa)
dig -x 2606:4700:4700::1111 +short
# -> one.one.one.one.

# Vorwärtsbestätigung: Zeigt der PTR-Hostname auf die ursprüngliche IP zurück?
dig +short A dns.google
# -> 8.8.8.8 / 8.8.4.4
```

Um zu einem ermittelten PTR-Hostnamen weiterführende Vorwärts-Records, MX-Prioritäten oder SPF- und DMARC-Richtlinien zu prüfen, wechseln Sie direkt in unser [DNS Lookup Tool](/de/werkzeuge/dns-lookup).

Auf Sicherheitsebene trennen moderne Threat-Intelligence-Pipelines vier Netzwerktypen: **Tor-Exit-Nodes** (öffentlich gelistete Austrittsknoten des Tor-Netzwerks), **offene Proxies** (häufig für Credential Stuffing missbrauchte HTTP-/SOCKS-Relays), **kommerzielle VPN-Endpunkte** (verschlüsselte, gemeinsam genutzte Datenschutz-Tunnel) und **Hosting-/Rechenzentrumsnetze** (Cloud-Server für Bots, Monitore oder Webhooks). Kombiniert man diese Transport-Signale mit den Client-Kennungen im [User Agent Parser](/de/werkzeuge/user-agent-parser) sowie den Server-Antworten aus dem [HTTP Header Checker](/de/werkzeuge/http-header-checker), erhalten Incident-Response-Teams ein lückenloses Bild aus Netzwerkherkunft und Anwendungsschicht.
