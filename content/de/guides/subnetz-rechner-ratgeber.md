---
title: "Subnetting: Netzwerke unterteilen"
description: "Lernen Sie, was IPv4-Subnetting ist, wie Subnetzmasken, CIDR-Notation und VLSM funktionieren und nutzen Sie unseren kostenlosen Subnetz-Rechner."
category: "Productivity & Utilities"
relatedCalculator: "subnet-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Warum sind zwei Adressen in jedem IPv4-Subnetz nicht für Endgeräte nutzbar?"
    answer: "Die jeweils erste Adresse eines Teilnetzes (alle Host-Bits auf 0) identifiziert als Netzadresse das Subnetz selbst. Die jeweils letzte Adresse (alle Host-Bits auf 1) dient als Broadcast-Adresse, um Pakete an alle Teilnehmer im selben Subnetz zuzustellen. Daher stehen bei klassischen Subnetzen stets 2^(32 − Präfix) − 2 Adressen für Hosts zur Verfügung."
  - question: "Was bedeutet die CIDR-Notation wie /24 oder /26 genau?"
    answer: "CIDR (Classless Inter-Domain Routing) gibt hinter dem Schrägstrich die genaue Anzahl der führenden Eins-Bits der 32-Bit-Subnetzmaske an. Bei /24 stehen 24 Bits für das Netzwerk und 8 Bits für Hosts (Maske 255.255.255.0, 254 nutzbare Hosts); bei /26 stehen 26 Bits für das Netzwerk und 6 Bits für Hosts (Maske 255.255.255.192, 62 nutzbare Hosts)."
  - question: "Wann setzt man /31-Subnetze nach RFC 3021 ein?"
    answer: "Bei reinen Punkt-zu-Punkt-Verbindungen zwischen zwei Routern wird kein Broadcast benötigt. RFC 3021 erlaubt es deshalb, /31-Subnetze (Maske 255.255.255.254) ohne Netz- und Broadcast-Abzug mit beiden IP-Adressen zu belegen. Dadurch spart man gegenüber einem klassischen /30-Transfernetz genau die Hälfte des Adressraums."
  - question: "Was ist der Vorteil von VLSM (Variable Length Subnet Mask)?"
    answer: "Mit VLSM lassen sich innerhalb eines größeren Adressblocks unterschiedlich große Subnetze bilden, statt alle Abteilungen starr in gleich große /24-Netze zu zwängen. So erhält ein Großraumbüro ein /25-Netz mit 126 Hosts, während eine Router-Verbindung nur ein /30- oder /31-Netz benötigt."
  - question: "Warum sollte man in Firmen-VPNs Standardbereiche wie 192.168.1.0/24 vermeiden?"
    answer: "Viele private Heimrouter verwenden standardmäßig 192.168.0.0/24, 192.168.1.0/24 oder 192.168.178.0/24. Nutzt ein Firmennetzwerk genau denselben Bereich, entstehen beim Home-Office-VPN Routing-Konflikte. Unternehmen wählen deshalb bevorzugt seltener genutzte Segmente aus 10.0.0.0/8 oder 172.16.0.0/12 (RFC 1918)."
---

Wachsen Unternehmensnetzwerke unstrukturiert in einer einzigen großen Broadcast-Domäne, überfluten ARP-Anfragen, mDNS-Pakete und Service-Discovery-Meldungen sämtliche Leitungen und Switches. Zudem erschwert ein flaches Netzwerk wirksame Firewall-Regeln zwischen sensiblen Bereichen wie Buchhaltung, Produktion, Serverraum und Gäste-WLAN. **Subnetting** löst dieses Problem, indem es einen zusammenhängenden IPv4-Adressraum mithilfe von Subnetzmasken sauber in logisch isolierte Teilnetze zerlegt.

Damit bei der Netzplanung keine überlappenden Adressbereiche, falsch gesetzte Standard-Gateways oder verschwendete IP-Blöcke entstehen, müssen Netzadresse, Broadcast-Adresse und nutzbarer Host-Bereich exakt bestimmt werden. Unser [Subnetz-Rechner](/de/rechner/subnetz-rechner) übernimmt diese binäre Bitrechnung sofort und liefert zu jeder IPv4-Adresse mit Präfix alle Netzwerkgrenzen sowie die passende Wildcard-Maske.

## Binäre Architektur: IPv4-Adressen, Subnetzmaske und CIDR-Präfix

Jede IPv4-Adresse besteht aus **32 Bits**, aufgeteilt in vier Oktette zu je 8 Bits (Wertebereich `0` bis `255`). Die **Subnetzmaske** legt fest, wo der **Netzwerkanteil** (`n` Bits, binär `1`) endet und der **Hostanteil** (`h = 32 − n` Bits, binär `0`) beginnt. In der modernen **CIDR-Notation** (Classless Inter-Domain Routing, RFC 4632) wird diese Trennlinie kompakt als Präfixlänge `/n` hinter der IP-Adresse angegeben.

```text
Gesamtadressen im Subnetz:  N_gesamt = 2^(32 − n)
Nutzbare Host-Adressen:     N_Hosts  = 2^(32 − n) − 2   (für n ≤ 30)
Wildcard-Maske (ACL/OSPF):  Wildcard = 255.255.255.255 − Subnetzmaske
Netzadresse:                Netz_IP  = IP_Adresse AND Subnetzmaske
Broadcast-Adresse:          Bcast_IP = Netz_IP OR Wildcard
Blockgröße (Sprungweite):   Schritt  = 256 − Oktettwert_Maske
```

Für die Praxis sind vier Parameter maßgeblich:
* **Netzadresse:** Die niedrigste Adresse des Teilnetzes, bei der alle Host-Bits auf `0` stehen; sie dient Routern als Zielangabe in Routing-Tabellen.
* **Broadcast-Adresse:** Die höchste Adresse des Teilnetzes, bei der alle Host-Bits auf `1` stehen; Pakete an diese Adresse erreichen jeden aktiven Host im Subnetz.
* **Nutzbarer Host-Bereich:** Alle Adressen zwischen `Netzadresse + 1` und `Broadcast − 1`, inklusive des Standard-Gateways (häufig die erste oder letzte nutzbare IP).
* **Wildcard-Maske:** Die bitweise Umkehrung der Subnetzmaske, die bei Router-Zugriffslisten (ACLs) und im Routing-Protokoll OSPF zur Bereichsdefinition benötigt wird.

## Schritt-für-Schritt-Beispiel: Subnetzanalyse und VLSM-Planung

### Teil 1: Analyse der Adresse `192.168.40.138/26`

Ein Administrator findet auf einem Server die Konfiguration `192.168.40.138/26` vor und muss die zugehörigen Netzgrenzen bestimmen:

1. **Subnetzmaske und Wildcard ermitteln:** `/26` entspricht `26` Einsen und `6` Nullen: Die ersten drei Oktette sind vollständig `255` (`24` Bits), im vierten Oktett bleiben `2` Netz-Bits (`11000000` binär = `128 + 64 = 192`). Die Subnetzmaske lautet **`255.255.255.192`**, die Wildcard-Maske **`0.0.0.63`** (`255 − 192`).
2. **Blockgröße bestimmen:** Im interessierenden vierten Oktett beträgt die Sprungweite `256 − 192 = 64`. Alle möglichen `/26`-Subnetze innerhalb von `192.168.40.0/24` beginnen folglich bei `.0`, `.64`, `.128` und `.192`.
3. **Netzadresse und Broadcast ableiten:** Da `138` zwischen `128` und `191` liegt, lautet die Netzadresse **`192.168.40.128`**. Die Broadcast-Adresse liegt exakt eine Nummer vor dem nächsten Netz (`192`), also bei **`192.168.40.191`**.
4. **Host-Bereich und Kapazität berechnen:** Nutzbar sind `192.168.40.129` bis `192.168.40.190`. Die Anzahl nutzbarer Endgeräte beträgt `2^(32 − 26) − 2 = 2^6 − 2 = 64 − 2 = 62` Hosts.

### Teil 2: Bedarfsplanung mit VLSM auf Basis von `10.10.0.0/24`

Um den Bereich `10.10.0.0/24` optimal aufzuteilen, ordnen Sie die Teilnetze stets **absteigend vom größten zum kleinsten Host-Bedarf**:
* **Produktion (`110` Geräte):** Erfordert ein `/25`-Netz (`126` Hosts) → `10.10.0.0/25` (Hosts `.1–.126`, Broadcast `.127`).
* **Verwaltung (`45` Geräte):** Erfordert ein `/26`-Netz (`62` Hosts) → `10.10.0.128/26` (Hosts `.129–.190`, Broadcast `.191`).
* **Server-VLAN (`20` Geräte):** Erfordert ein `/27`-Netz (`30` Hosts) → `10.10.0.192/27` (Hosts `.193–.222`, Broadcast `.223`).
* **Router-Transfernetz (`2` Ports):** Erfordert ein `/30`-Netz (`2` Hosts) → `10.10.0.224/30` (Hosts `.225–.226`, Broadcast `.227`). Der verbleibende Block `.228–.255` (`28` IPs) steht als Reserve für spätere Erweiterungen bereit.

## CIDR-Referenztabelle: Masken, Wildcards und Host-Kapazitäten

Die folgende Übersicht zeigt die am häufigsten eingesetzten IPv4-Präfixe für Unternehmensnetze, Campus-VLANs und Transferstrecken:

| CIDR-Präfix | Subnetzmaske | Wildcard-Maske | Gesamtadressen | Nutzbare Hosts | Typisches Einsatzszenario |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`/22`** | `255.255.252.0` | `0.0.3.255` | `1.024` | `1.022` | Großes Gäste-WLAN oder Campus-Standort |
| **`/24`** | `255.255.255.0` | `0.0.0.255` | `256` | `254` | Standard-Büronetz oder Abteilungs-VLAN |
| **`/25`** | `255.255.255.128` | `0.0.0.127` | `128` | `126` | Mittelgroße Etage oder Produktionshalle |
| **`/26`** | `255.255.255.192` | `0.0.0.63` | `64` | `62` | Kleines Team-VLAN oder VoIP-Telefonie |
| **`/27`** | `255.255.255.224` | `0.0.0.31` | `32` | `30` | Server-Cluster, DMZ oder Drucker-Netz |
| **`/28`** | `255.255.255.240` | `0.0.0.15` | `16` | `14` | Management-Interfaces (iLO/iDRAC) oder Außenstelle |
| **`/30`** | `255.255.255.252` | `0.0.0.3` | `4` | `2` | Klassische Punkt-zu-Punkt-Verbindung (Router–Firewall) |

*(Hinweis: `/31` belegt nach RFC 3021 zwei Host-Adressen für Punkt-zu-Punkt-Links ohne Broadcast; `/32` bezeichnet exakt eine einzelne Host-Route oder Loopback-Adresse.)*

## Praxisanwendung, Fehlerquellen und Sicherheitsaspekte

Im modernen Netzwerkdesign dient Subnetting zusammen mit VLANs (IEEE 802.1Q) als Fundament für Zero-Trust-Architekturen: IoT-Sensoren, Überwachungskameras, Arbeitsplatz-PCs und Datenbankserver erhalten getrennte Subnetze, deren Datenverkehr ausschließlich kontrolliert über eine zentrale Firewall geroutet wird. Auch in Cloud-Umgebungen wie AWS, Azure oder Google Cloud basiert jede Virtual Private Cloud (VPC) auf exakt geplanten CIDR-Blöcken.

Vier typische Planungsfehler führen in der Praxis häufig zu Ausfällen:

1. **Verletzte Blockgrenzen bei VLSM:** Beginnt ein kleines `/27`-Subnetz beispielsweise bei `.20` statt an einer `32er`-Grenze (`.0`, `.32`, `.64`), überlappt es mit Nachbarnetzen oder wird von Routern automatisch auf die nächste gültige Grenze zurückgesetzt.
2. **Cloud-Reservierungen übersehen:** Während klassische LANs `2` Adressen pro Subnetz reservieren, belegen große Cloud-Anbieter meist `4` oder `5` Adressen pro Subnetz (zusätzlich für VPC-Router, internen DNS und Zukunftsreserve). In einem `/28`-Cloud-Subnetz stehen daher oft nur `11` statt `14` nutzbare IPs bereit.
3. **Veraltetes Klassen-Denken:** Seit der Einführung von CIDR in den 1990er-Jahren sind die historischen Netzklassen A, B und C im Routing obsolet. Eine Adresse aus dem Bereich `10.0.0.0/8` kann problemlos mit `/24` oder `/29` betrieben werden.
4. **Kollision privater Adressräume:** Doppelbelegungen von `192.168.1.0/24` bei Firmenzusammenschlüssen oder VPN-Einwahlen erfordern aufwendiges NAT. Wählen Sie für Unternehmensnetze eindeutige Teilblöcke aus den privaten RFC-1918-Bereichen (`10.0.0.0/8` oder `172.16.0.0/12`).

**Ausblick auf IPv6:** Um der globalen IPv4-Knappheit zu begegnen, arbeitet IPv6 mit `128-Bit`-Adressen und vergibt für lokale Subnetze standardmäßig einheitliche `/64`-Präfixe – wodurch klassisches Bit-Sparen auf Host-Ebene vollständig entfällt.
