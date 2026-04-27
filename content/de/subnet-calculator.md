---
title: "Subnetz-Rechner"
description: "Berechnen Sie IPv4-Subnetze, Netzwerkadressen, Broadcast-Adressen und nutzbare Host-Bereiche basierend auf IP-Adresse und CIDR-Block."
metaTitle: "Subnetz-Rechner | IPv4, CIDR & IP-Bereich"
metaDescription: "Kostenloser IP Subnetz-Rechner. Berechnen Sie Subnetzmasken, IP-Bereiche, die Broadcast-Adresse und Host-Limits mithilfe der CIDR-Notation."
metaKeywords: "subnetz rechner, subnet calculator, ip rechner, cidr rechner, netzwerkadresse, broadcast adresse, ipv4 subnetting, hostbereich"
---

## Was ist ein Subnetz-Rechner?
Ein **Subnetz-Rechner (Subnet Calculator)** ist ein unverzichtbares Werkzeug für IT-Administratoren, Systemelektroniker und Netzwerkingenieure, um ein übergeordnetes IP-Netzwerk in logische, skalierbare Teilnetze (Subnetze) zu unterteilen.

Die manuelle Umrechnung von 32-Bit Dualsystem-Blöcken – um beispielsweise die Grenzen eines `192.168.1.0/24` Netzwerkes zu bestimmen – ist extrem fehleranfällig. Unser Rechner zerlegt jede gültige IPv4-Adresse zuzüglich CIDR-Notation automatisch in Sekunden und listet die präzise Netzwerkgrundadresse (Base), die maximale Obergrenze (Broadcast) und alle verfügbaren Hosts für Ihre Server oder Endgeräte auf.

### CIDR-Notation & Subnetzmaske
Das sogenannte Subnetting stützt sich auf die Subnetzmaske. Moderne IT-Architekturen verzichten auf lange Schreibweisen wie `255.255.255.0` und greifen direkt auf die **CIDR (Classless Inter-Domain Routing)**-Notation zurück, dargestellt durch einen Slash und eine zweistellige Zahl (z.B. `/24`).
*   Eine **/24**-Maske blockiert die ersten 24 Bit für das Netzwerk, wodurch 8 Bit für die Hosts übrig bleiben (entspricht 256 gesamten IPs).
*   Mit unserem Rechner können Sie die Maske dynamisch anpassen und beobachten, wie sich Ihr Pool an IP-Adressen sofort berechnet.

### Verfügbare Host-Reichweite
In jedem Standard-Subnetz sind ausnahmslos zwei IP-Adressen blockiert, da sie für das Netzwerk-Routing reserviert sind:
1.  **Netzwerkadresse:** Die absolute Anfangs-IP; sie definiert das Netzwerkbündel selbst.
2.  **Broadcast-Adresse:** Die finale IP des Blocks; mit dieser IP werden Systempakete zeitgleich an alle Endgeräte "gesendet". 

Die verbleibende Spanne zwischen diesen beiden Extremen bildet den Pool Ihrer **nutzbaren Host-Adressen**, welchen unser System zuverlässig für Sie ausgibt.
