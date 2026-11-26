---
title: "IP-Subnetting: Host-Bereiche und Broadcasts"
description: "Berechnen Sie IPv4-Netzwerkadressen, Subnetzmasken, Broadcasts und nutzbare Host-Bereiche per CIDR-Notation und Bitmaske präzise."
category: "Productivity & Utilities"
relatedCalculator: "ip-subnet-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Warum sind in jedem IPv4-Subnetz standardmäßig zwei Adressen nicht für Hosts nutzbar?"
    answer: "Die allerniedrigste Adresse eines Subnetzes (alle Host-Bits auf 0) repräsentiert das Netz selbst als Netzwerkadresse und dient dem Routing. Die allerhöchste Adresse (alle Host-Bits auf 1) fungiert als gerichtete Broadcast-Adresse für Pakete an alle Teilnehmer im Segment. Beide Adressen dürfen Endgeräten wie Servern oder Clients nicht zugewiesen werden, weshalb sich die Zahl nutzbarer IPs auf 2^(32 − Präfix) − 2 reduziert."
  - question: "Wann gilt die Ausnahme für /31-Subnetze ohne Broadcast-Adresse?"
    answer: "Nach RFC 3021 dürfen /31-Subnetze für direkte Punkt-zu-Punkt-Verbindungen zwischen zwei Routern verwendet werden. Da auf einer dedizierten Leitung kein klassischer Broadcast nötig ist, werden beide Adressen als gültige Host-IPs genutzt. Gegenüber einem /30-Netz halbiert das den Adressverbrauch bei WAN-Links und spart so knappen IPv4-Adressraum."
  - question: "Was unterscheidet eine Subnetzmaske von einer Wildcard-Maske?"
    answer: "Eine Subnetzmaske markiert Netzwerk-Bits mit 1 und Host-Bits mit 0 (beispielsweise 255.255.255.192 für /26). Die Wildcard-Maske ist exakt das bitweise Komplement dazu (0.0.0.63) und wird unter anderem in Router-Zugriffslisten (ACLs) sowie im OSPF-Routing eingesetzt, um festzulegen, welche Bit-Positionen beim Abgleich ignoriert werden dürfen."
  - question: "In welcher Reihenfolge sollte man Subnetze bei VLSM aufteilen?"
    answer: "Beim Variable Length Subnet Masking (VLSM) beginnen Sie zwingend mit dem Subnetz, das die meisten Hosts benötigt, und arbeiten sich schrittweise zum kleinsten Bedarf vor. Jedes Subnetz muss an einem Vielfachen seiner eigenen Blockgröße beginnen. Starten Sie mit kleinen Netzen zuerst, entstehen Adresslücken oder unerlaubte Überschneidungen bei größeren Blöcken."
  - question: "Welche IPv4-Bereiche sind für interne Netze und Carrier-Grade NAT reserviert?"
    answer: "Für private Netze definiert RFC 1918 die Bereiche 10.0.0.0/8, 172.16.0.0/12 und 192.168.0.0/16. Zusätzlich reserviert RFC 6598 den Bereich 100.64.0.0/10 für Carrier-Grade NAT (CGNAT) bei Internetanbietern sowie RFC 3927 den Bereich 169.254.0.0/16 für automatische Link-Local-Adressen (APIPA), falls kein DHCP-Server antwortet."
---

Präzises IPv4-Subnetting entscheidet in Unternehmensnetzen, Rechenzentren und Cloud-Umgebungen darüber, ob Routing-Tabellen sauber greifen, Broadcast-Stürme eingedämmt werden und Adressräume ohne Überschneidungen wachsen können. Jedes Subnetz zerlegt eine 32-Bit-Adresse anhand einer Maske eindeutig in einen Netzanteil und einen Host-Anteil; aus dieser Grenze ergeben sich exakt die Netzwerkadresse, der erste und letzte zuweisbare Host sowie die Broadcast-Adresse.

Mit unserem [IP-Subnetz-Rechner](/de/rechner/ip-subnetz-rechner) ermitteln Sie diese Grenzen für beliebige IPv4-Adressen und CIDR-Präfixe sekundenschnell ohne manuelle Binärkonvertierung. Dieser Leitfaden erklärt die zugrunde liegende Bit-Mathematik, rechnet ein `/26`-Subnetz Schritt für Schritt durch, bietet eine kompakte CIDR-Referenztabelle und beleuchtet typische Planungsfehler wie VLSM-Überschneidungen und NAT-Konflikte.

## Grundlagen der IPv4-Adressierung und CIDR-Notation

Eine IPv4-Adresse besteht aus `32 Bit`, unterteilt in vier durch Punkte getrennte Oktette zu je `8 Bit` (Wertebereich jeweils `0` bis `255`). Die Classless Inter-Domain Routing-Notation (CIDR) gibt hinter dem Schrägstrich als Präfixlänge `n` an, wie viele führende Bits von links das Netzwerk identifizieren. Die verbleibenden `h = 32 − n` Bits bilden den Host-Anteil innerhalb dieses Subnetzes.

```text
Gesamtzahl Adressen:    N_gesamt = 2^(32 − n)
Nutzbare Host-IPs:      N_hosts  = 2^(32 − n) − 2   (für n ≤ 30)
Netzwerkadresse:        IP_netz  = IP_host AND Subnetzmaske
Wildcard-Maske:         Maske_wc = 255.255.255.255 − Subnetzmaske
Broadcast-Adresse:      IP_bcast = IP_netz OR Maske_wc
Erster Host:            IP_min   = IP_netz + 1
Letzter Host:           IP_max   = IP_bcast − 1
```

Dabei gelten folgende Definitionen der vier Schlüsseladressen:

* **Netzwerkadresse (`Host-Bits = alle 0`):** Kennzeichnet das logische Subnetz in Routing-Tabellen. Sie darf keinem Endgerät zugewiesen werden.
* **Erster nutzbarer Host:** Die niedrigste vergabefähige IP-Adresse (`Netzwerkadresse + 1`), in vielen Firmennetzen und Heimroutern per Konvention dem Standard-Gateway zugeteilt.
* **Letzter nutzbarer Host:** Die höchste vergabefähige IP-Adresse vor dem Broadcast (`Broadcast − 1`), alternativ oft als Gateway genutzt.
* **Broadcast-Adresse (`Host-Bits = alle 1`):** Pakete an diese Adresse erreichen jedes Gerät innerhalb desselben Broadcast-Segments (Layer 2/3), werden von Routern jedoch standardmäßig nicht weitergeleitet.

Eine Sonderrolle spielen `/31`- und `/32`-Präfixe: Nach **RFC 3021** nutzt man `/31`-Netze auf Punkt-zu-Punkt-Verbindungen ohne Broadcast für exakt `2` Router-Interfaces. Ein `/32`-Präfix bezeichnet hingegen eine einzelne Host-Route (etwa für Loopback-Interfaces oder Firewall-Regeln).

## Schritt-für-Schritt-Beispiel: Berechnung eines /26-Subnetzes

Angenommen, Sie erhalten für eine neue Server-VLAN-Umgebung die Beispieladresse `192.168.10.130/26` und müssen Netzwerkadresse, Broadcast und den gültigen Host-Bereich bestimmen.

1. **Subnetzmaske und Wildcard-Maske ableiten:**  
   Bei `/26` sind die ersten `26` Bits auf `1` gesetzt (`8 + 8 + 8 + 2`). Das vierte Oktett lautet binär `11000000`, was dezimal `128 + 64 = 192` entspricht.  
   Subnetzmaske: `255.255.255.192`.  
   Wildcard-Maske: `255.255.255.255 − 255.255.255.192 = 0.0.0.63`.
2. **Blockgröße und Adressanzahl berechnen:**  
   Es verbleiben `h = 32 − 26 = 6` Host-Bits.  
   Gesamtadressen: `2^6 = 64` (Blockgröße im vierten Oktett: `256 − 192 = 64`). Die gültigen `/26`-Blöcke im vierten Oktett beginnen somit bei `0`, `64`, `128` und `192`.  
   Nutzbare Hosts: `64 − 2 = 62`.
3. **Netzwerkadresse durch bitweises UND ermitteln:**  
   Das vierte Oktett der Ziel-IP `130` lautet binär `10000010`, die Maske `192` lautet `11000000`.  
   `10000010 AND 11000000 = 10000000` (dezimal `128`).  
   Die Netzwerkadresse lautet daher `192.168.10.128`.
4. **Broadcast-Adresse und Host-Bereich bestimmen:**  
   Addieren Sie die Wildcard-Maske zur Netzwerkadresse: `192.168.10.128 + 0.0.0.63 = 192.168.10.191`.  
   * **Netzwerkadresse:** `192.168.10.128`
   * **Erster nutzbarer Host:** `192.168.10.129`
   * **Letzter nutzbarer Host:** `192.168.10.190`
   * **Broadcast-Adresse:** `192.168.10.191`

Alle `62` Adressen zwischen `.129` und `.190` können nun sicher per DHCP-Pool oder statisch an Server und Switches vergeben werden.

## Referenztabelle: Gängige CIDR-Präfixe im Überblick

Die folgende Übersicht zeigt die am häufigsten eingesetzten IPv4-Subnetzgrößen in Unternehmens-LANs, Cloud-VPCs und Infrastruktur-Links.

| CIDR-Präfix | Subnetzmaske | Wildcard-Maske | Gesamtadressen | Nutzbare Hosts | Typischer Einsatzzweck |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/22` | `255.255.252.0` | `0.0.3.255` | `1.024` | `1.022` | Große Campus-WLANs oder Cloud-VPC-Supernets |
| `/24` | `255.255.255.0` | `0.0.0.255` | `256` | `254` | Standard-Büro-VLAN oder Abteilungsnetz |
| `/25` | `255.255.255.128` | `0.0.0.127` | `128` | `126` | Mittelgroße Server- oder VoIP-Segmente |
| `/26` | `255.255.255.192` | `0.0.0.63` | `64` | `62` | Kleinere Etagen-VLANs, DMZ-Bereiche |
| `/27` | `255.255.255.224` | `0.0.0.31` | `32` | `30` | Management-Netze, Drucker- oder IoT-Segmente |
| `/28` | `255.255.255.240` | `0.0.0.15` | `16` | `14` | Kleine Transfernetze oder Firewall-Cluster |
| `/30` | `255.255.255.252` | `0.0.0.3` | `4` | `2` | Klassische Router-zu-Router-Transferstrecke |

## VLSM, typische Planungsfehler und RFC-Besonderheiten

In der Netzwerkpraxis werden Adressblöcke selten gleichförmig zerschnitten. Mit **Variable Length Subnet Masking (VLSM)** passen Sie die Subnetzgröße exakt an den Bedarf jedes Segments an: Ein Standort-Block `10.20.0.0/23` (`512` Adressen) lässt sich beispielsweise in ein `/24`-Client-Netz (`254` Hosts), ein `/25`-Server-Netz (`126` Hosts) und mehrere `/28`-Management-Netze (`14` Hosts) aufteilen. Entscheidend ist die strikte Sortierung vom größten zum kleinsten Subnetz, da jedes Subnetz zwingend auf einer durch seine Blockgröße teilbaren Basisadresse starten muss.

Häufige Fehler in der Konfiguration entstehen an drei Stellen:

* **Oktett-Grenzen bei Präfixen kleiner als `/24`:** In einem `/23`-Netz wie `172.16.4.0/23` umfasst der Host-Bereich `172.16.4.1` bis `172.16.5.254`. Die Adressen `172.16.4.255` und `172.16.5.0` sind hier **vollwertige, nutzbare Host-IPs** und keine Broadcast- oder Netzwerkadressen, obwohl viele Administratoren sie intuitiv meiden.
* **Kollision privater Netze bei VPN-Kopplungen:** Wer für Firmenstandorte das verbreitete `192.168.0.0/24` oder `192.168.1.0/24` wählt, provoziert Routing-Konflikte im Homeoffice-VPN, weil fast alle Consumer-Router dieselben Bereiche nutzen. Für Unternehmens-LANs empfiehlt sich der Griff in weniger frequentierte Segmente aus `10.0.0.0/8` oder `172.16.0.0/12`.
* **Cloud-Reservierungen beachten:** Public-Cloud-Anbieter wie AWS, Azure oder GCP reservieren innerhalb jedes VPC-Subnetzes häufig zusätzliche Adressen (oft die ersten drei nutzbaren IPs für Router, DNS und Zukunftserweiterung sowie die letzte Broadcast-Adresse). In einem `/28`-Cloud-Subnetz stehen dann statt `14` oft nur `11` Instanz-IPs zur Verfügung.
