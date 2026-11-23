---
title: "Subnetz-Rechner"
metaTitle: "Subnetz-Rechner: IPv4, CIDR-Subnetzmaske & IP-Bereich"
description: "Berechnen Sie IPv4-Subnetze, Netzwerkadressen, Broadcast-Adressen, Wildcard-Masken und nutzbare Host-Bereiche anhand von IP-Adresse und CIDR-Präfix."
metaDescription: "Kostenloser IPv4 Subnetz-Rechner: Bestimmen Sie Subnetzmaske, Netzwerkadresse, Broadcast, Wildcard-Maske und nutzbare Hosts per CIDR-Notation sofort."
metaKeywords: "subnetz rechner, ipv4 subnetting, cidr rechner, subnetzmaske berechnen, netzwerkadresse, broadcast adresse, hostbereich, wildcard maske, vlsm"
faqs:
  - question: "Warum werden bei der Berechnung nutzbarer Hosts fast immer zwei IP-Adressen abgezogen?"
    answer: "In jedem klassischen IPv4-Subnetz sind zwei Adressen technisch für das Routing reserviert: Die allererste Adresse im Block (alle Host-Bits auf 0) repräsentiert die Netzwerkadresse selbst, während die allerletzte Adresse (alle Host-Bits auf 1) als Directed-Broadcast-Adresse dient, um Pakete gleichzeitig an alle Teilnehmer des Teilnetzes zu senden. Keine dieser beiden Adressen darf einer einzelnen Netzwerkkarte zugewiesen werden."
  - question: "Was ist die Besonderheit bei /31- und /32-Subnetzen gemäß RFC 3021?"
    answer: "Bei einem /31-Subnetz stehen rechnerisch nur 2 IP-Adressen zur Verfügung. Nach der klassischen Formel (2 minus 2) blieben null Hosts übrig. Der Standard RFC 3021 erlaubt jedoch für reine Punkt-zu-Punkt-Verbindungen (etwa zwischen zwei Routern) die Nutzung beider Adressen ohne separate Netzwerk- und Broadcast-IP. Ein /32-Präfix hingegen adressiert exakt einen einzelnen Host (Host-Route) mit der Subnetzmaske 255.255.255.255."
  - question: "Welche IPv4-Adressbereiche sind nach RFC 1918 für private lokale Netzwerke (LAN) reserviert?"
    answer: "Für den privaten Einsatz in Heim- und Firmennetzen, die nicht direkt im öffentlichen Internet geroutet werden, definiert RFC 1918 drei freie Blöcke: 10.0.0.0/8 (10.0.0.0 bis 10.255.255.255 mit 16.777.214 Hosts), 172.16.0.0/12 (172.16.0.0 bis 172.31.255.255 mit 1.048.574 Hosts) sowie den im DACH-Raum bei Routern wie der FRITZ!Box verbreiteten Bereich 192.168.0.0/16 (192.168.0.0 bis 192.168.255.255)."
  - question: "Wie berechnet man eine Wildcard-Maske für Access Control Lists (ACLs) und OSPF?"
    answer: "Die Wildcard-Maske (Inversmaske) ist das bitweise Komplement der Subnetzmaske. In der Dezimalschreibweise ziehen Sie jedes der vier Oktette der Subnetzmaske einzeln von 255 ab. Aus der Subnetzmaske 255.255.255.192 (/26) ergibt sich durch die Rechnung 255 minus 192 im letzten Oktett die Wildcard-Maske 0.0.0.63."
  - question: "Warum stehen in Cloud-Netzwerken (AWS, Azure, Google Cloud) weniger Hosts zur Verfügung als berechnet?"
    answer: "Während im physischen lokalen Netzwerk (On-Premises) pro Subnetz nur 2 Adressen für Netzwerk und Broadcast wegfallen, reservieren große Cloud-Anbieter wie AWS und Microsoft Azure in jedem Virtual-Private-Cloud-Subnetz (VPC/VNet) standardmäßig 5 IP-Adressen. Neben Netzwerk- und Broadcast-Adresse werden dort drei weitere IPs für das interne Cloud-Gateway, das DNS-Routing und zukünftige Plattformfunktionen blockiert."
---

Ein präziser **Subnetz-Rechner** ist das zentrale Planungswerkzeug für Netzwerkarchitekten, Systemadministratoren und DevOps-Ingenieure, um IPv4-Adressräume fehlerfrei in logische Teilnetze (Subnetze) zu gliedern. Ob bei der Segmentierung von Unternehmens-VLANs, der Einrichtung von Firewall-Regeln oder der Dimensionierung von Cloud-Netzwerken: Die korrekte Bestimmung von Netzwerkadresse, Subnetzmaske, Broadcast-Adresse und nutzbarem Host-Bereich entscheidet über Sicherheit, Performance und Routing-Stabilität.

## Grundlagen der IPv4-Adressierung und CIDR-Architektur

Eine IPv4-Adresse besteht aus exakt **32 Bit**, die in vier durch Punkte getrennte Blöcke zu je 8 Bit – sogenannte **Oktette** – unterteilt und dezimal von `0` bis `255` dargestellt werden (zum Beispiel `192.168.10.1`). Jede IPv4-Adresse setzt sich logisch aus zwei Teilen zusammen:
* **Netzwerkanteil (Präfix):** Identifiziert das gemeinsame Teilnetz, zu dem ein Datenpaket geroutet wird. Alle Geräte im selben Subnetz besitzen denselben Netzwerkanteil.
* **Hostanteil (Suffix):** Identifiziert das konkrete Endgerät (Server, Workstation, Drucker, Switch-Interface) innerhalb dieses Teilnetzes.

In der Frühzeit des Internets war die Grenze zwischen Netzwerk- und Hostanteil starr an historische Netzklassen (Klasse A mit `/8`, Klasse B mit `/16`, Klasse C mit `/24`) gebunden. Um der Verschwendung öffentlicher IPv4-Adressen entgegenzuwirken, wurde 1993 mit RFC 1519 (heute RFC 4632) das **Classless Inter-Domain Routing (CIDR)** eingeführt. Bei CIDR gibt ein Schrägstrich mit einer Zahl zwischen `0` und `32` (etwa `/26`) bitgenau an, wie viele führende Bits von links für die Netzwerkkennung reserviert sind.

## Mathematische Formeln zur Subnetz- und Host-Berechnung

Aus der CIDR-Präfixlänge $p$ (mit $0 \le p \le 32$) ergibt sich zunächst die Anzahl der verbleibenden Host-Bits $h = 32 - p$. Die Gesamtzahl aller IPv4-Adressen $N_{\text{gesamt}}$ innerhalb eines CIDR-Blocks sowie die Anzahl der tatsächlich für Endgeräte nutzbaren Host-Adressen $N_{\text{Hosts}}$ (für Standard-Subnetze mit $p \le 30$) berechnen sich über Zweierpotenzen:

$$N_{\text{gesamt}} = 2^{(32 - p)} = 2^h$$

$$N_{\text{Hosts}} = 2^{(32 - p)} - 2$$

Wird ein bestehendes übergeordnetes Netzwerk mit dem Präfix $p_{\text{alt}}$ in kleinere, gleich große Teilnetze mit dem neuen Präfix $p_{\text{neu}}$ unterteilt ($p_{\text{neu}} > p_{\text{alt}}$), ergibt sich die Anzahl der neu gewonnenen Subnetze $N_{\text{Subnetze}}$ aus der Differenz der Präfixlängen:

$$N_{\text{Subnetze}} = 2^{(p_{\text{neu}} - p_{\text{alt}})}$$

Auf Bitebene ermittelt der Subnetz-Rechner die Eckdaten durch boolesche Verknüpfungen zwischen 32-Bit-IP-Adresse und 32-Bit-Subnetzmaske:
1. **Netzwerkadresse ($\text{IP}_{\text{Netz}}$):** Bitweise UND-Verknüpfung ($\land$): $\text{IP}_{\text{Netz}} = \text{IP} \land \text{Maske}$.
2. **Wildcard-Maske ($\text{Wildcard}$):** Bitweise Negation ($\neg$): $\text{Wildcard} = 255.255.255.255 - \text{Maske}$.
3. **Broadcast-Adresse ($\text{IP}_{\text{Broadcast}}$):** Bitweise ODER-Verknüpfung ($\lor$): $\text{IP}_{\text{Broadcast}} = \text{IP}_{\text{Netz}} \lor \text{Wildcard}$.

## Schritt-für-Schritt-Rechenbeispiel aus der IT-Praxis

Ein Unternehmen in München trennt seine Abteilungen per VLAN. Für die Entwicklungsabteilung (45 Arbeitsplätze inklusive Server und Drucker) wird aus dem Stammnetz die IP-Adresse **`192.168.14.130/26`** vergeben. Zudem soll geprüft werden, wie hoch die Lizenzkosten einer Sicherheits-Appliance ausfallen, wenn der Hersteller **18,50 €** pro aktivierbarer Host-IP im Subnetz berechnet.

### 1. Berechnung der Host-Bits und Kapazität
Bei einem CIDR-Präfix von $p = 26$ verbleiben $h = 32 - 26 = 6\text{ Host-Bits}$ für Endgeräte:

$$N_{\text{gesamt}} = 2^6 = 64\text{ IP-Adressen} \quad \Rightarrow \quad N_{\text{Hosts}} = 64 - 2 = 62\text{ nutzbare Hosts}$$

Mit 62 nutzbaren Adressen ist das `/26`-Subnetz für 45 Arbeitsplätze ideal dimensioniert und bietet 17 Adressen Reserve.

### 2. Ermittlung von Subnetzmaske und Wildcard-Maske
Ein Präfix von `/26` bedeutet, dass die ersten drei Oktette (`255.255.255`) komplett gesetzt sind und im vierten Oktett weitere $26 - 24 = 2\text{ Bits}$ von links auf `1` stehen (binär `11000000`). Dezimal entspricht dies $128 + 64 = 192$:
* **Subnetzmaske:** `255.255.255.192`
* **Wildcard-Maske:** $255 - 192 = 63 \rightarrow$ `0.0.0.63`

### 3. Bestimmung von Netzwerkadresse, Host-Bereich und Broadcast
Die Blockgröße (Sprungweite) im vierten Oktett beträgt $256 - 192 = 64$. Die vier `/26`-Teilnetze innerhalb von `192.168.14.0/24` beginnen bei `.0`, `.64`, `.128` und `.192`. Da `.130` im dritten Block (zwischen `128` und `191`) liegt, lauten die exakten Grenzen:
* **Netzwerkadresse:** `192.168.14.128`
* **Erste nutzbare Host-IP (Standard-Gateway):** `192.168.14.129`
* **Letzte nutzbare Host-IP:** `192.168.14.190`
* **Broadcast-Adresse:** `192.168.14.191`
* **Lizenzkosten (62 Hosts × 18,50 €):** $62 \times 18{,}50\text{ €} = 1.147{,}00\text{ €}$

## Referenztabelle: IPv4-CIDR-Präfixe, Masken und Host-Kapazitäten

Die Übersicht zeigt die wichtigsten CIDR-Präfixe für das Netzwerk-Engineering:

| CIDR | Subnetzmaske | Wildcard-Maske | Gesamt-IPs | Nutzbare Hosts | Typischer Einsatzbereich |
| :--- | :--- | :--- | :---: | :---: | :--- |
| **`/32`** | `255.255.255.255` | `0.0.0.0` | 1 | 1 | Einzelner Host, Loopback, Firewall-Regel |
| **`/31`** | `255.255.255.254` | `0.0.0.1` | 2 | 2 (RFC 3021) | Punkt-zu-Punkt-Router-Links |
| **`/30`** | `255.255.255.252` | `0.0.0.3` | 4 | 2 | WAN-Transfernetze und Site-to-Site-VPN |
| **`/29`** | `255.255.255.248` | `0.0.0.7` | 8 | 6 | Kleine DMZ-Segmente, Firewall-Cluster |
| **`/28`** | `255.255.255.240` | `0.0.0.15` | 16 | 14 | Management-VLANs, kleine Servergruppen |
| **`/27`** | `255.255.255.224` | `0.0.0.31` | 32 | 30 | Abteilungs-VLANs, VoIP-Telefonie |
| **`/26`** | `255.255.255.192` | `0.0.0.63` | 64 | 62 | Mittelgroße Büroetagen, Gebäude-Netze |
| **`/25`** | `255.255.255.128` | `0.0.0.127` | 128 | 126 | Größere Unternehmensabteilungen |
| **`/24`** | `255.255.255.0` | `0.0.0.255` | 256 | 254 | Standard-LAN-Subnetz (Klasse C) |
| **`/22`** | `255.255.252.0` | `0.0.3.255` | 1.024 | 1.022 | Campus-Netzwerke, größere Gast-WLANs |
| **`/16`** | `255.255.0.0` | `0.0.255.255` | 65.536 | 65.534 | Großes Unternehmens-Stammnetz (Klasse B) |
| **`/8`** | `255.0.0.0` | `0.255.255.255` | 16.777.216 | 16.777.214 | Privater Großblock `10.0.0.0/8` (Klasse A) |

## Praxistipps für das Subnetting und häufige Planungsfehler

* **VLSM-Blöcke absteigend nach Größe sortieren:** Beim *Variable Length Subnet Masking (VLSM)* unterteilen Sie ein Hauptnetz in unterschiedlich große Teilnetze. Weisen Sie zwingend zuerst die größten Blöcke zu (erst `/24`, danach `/26`, zuletzt `/30`). Wer zuerst ein kleines `/30`-Transfernetz mitten in einen Adressraum legt, blockiert durch die binären Blockgrenzen die Zuweisung größerer angrenzender Subnetze.
* **Carrier-Grade NAT (CGNAT) beachten:** Viele Glasfaser- und Mobilfunkanbieter im DACH-Raum nutzen bei Dual-Stack Lite (DS-Lite) den Adressblock `100.64.0.0/10` (`100.64.0.0` bis `100.127.255.255`, Maske `255.192.0.0`) nach RFC 6598. Dieser Bereich ist für das Provider-Routing reserviert und darf nicht für interne Firmen-VLANs genutzt werden.
* **Wachstumspuffer für DHCP und IoT einkalkulieren:** Planen Sie VLANs niemals auf 100 % Auslastung. Halten Sie mindestens **25 % bis 30 % freie Host-Adressen** als Reserve für mobile Geräte, virtuelle Maschinen und DHCP-Leases vor.
* **VPN-Adresskonflikte im Homeoffice vermeiden:** Da Heimrouter im DACH-Raum meist auf `192.168.178.0/24` (FRITZ!Box) oder `192.168.1.0/24` vorkonfiguriert sind, sollten Firmen für interne Server- und VPN-Subnetze Blöcke aus `10.x.x.x` oder `172.16.x.x` bis `172.31.x.x` wählen, um Routing-Kollisionen im Remote-Zugriff auszuschließen.
