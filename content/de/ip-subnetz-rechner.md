---
title: "IP-Subnetz-Rechner"
description: "Berechnen Sie IPv4-Subnetzbereiche, CIDR-Blöcke, Wildcard-Masken, nutzbare IP-Bereiche und entwerfen Sie optimierte Netzwerke mit dem VLSM-Planer."
metaTitle: "IP-Subnetz-Rechner | CIDR-, VLSM- und IP-Bereichsrechner"
metaDescription: "Kostenloser Online-IP-Subnetz-Rechner. Berechnen Sie ganz einfach Subnetze, Wildcard-Masken, nutzbare Host-IP-Bereiche, Netzwerkklassen und VLSM-Pläne mit binären Aufschlüsselungen."
metaKeywords: "ip subnetz rechner, subnetz rechner, cidr rechner, vlsm rechner, ip bereichs rechner, subnetzmaske, wildcard maske, netzwerkadresse, broadcast adresse, ipv4 subnetting"
faqs:
  - question: "Was ist ein IP-Subnetz?"
    answer: "Ein Subnetz (kurz für logisches Teilnetz) ist eine logische Unterteilung eines IP-Netzwerks. Die Aufteilung eines großen Netzwerks in kleinere, separate Subnetze verbessert die Routing-Effizienz, erhöht die Sicherheit und reduziert den Broadcast-Verkehr durch Isolierung der lokalen Netzwerkkommunikation."
  - question: "Wofür steht CIDR?"
    answer: "CIDR steht für Classless Inter-Domain Routing (klassenloses domänenübergreifendes Routing). Es ist eine Methode zur Zuweisung von IP-Adressen und zum Routing von IP-Paketen, die die ältere klassenbasierte Netzwerkarchitektur ersetzte. CIDR verwendet die Präfixschreibweise (z. B. /24), um die Größe der Netzwerkmaske anzugeben."
  - question: "Wie berechnet man die Anzahl der nutzbaren Hosts in einem Subnetz?"
    answer: "Die Anzahl der nutzbaren Hosts wird mit der Formel 2^(32 - N) - 2 berechnet, wobei N die CIDR-Präfixlänge (Bits der Subnetzmaske) ist. Wir subtrahieren 2, da die erste Adresse für die Netzwerkadresse und die letzte Adresse für die Broadcast-Adresse reserviert ist."
  - question: "Was ist der Unterschied zwischen öffentlichen und privaten IP-Adressen?"
    answer: "Öffentliche IP-Adressen sind weltweit eindeutig und im öffentlichen Internet routingfähig. Private IP-Adressen (definiert in RFC 1918) sind für lokale Netzwerke (LANs) reserviert und nicht im Internet routingfähig. Sie erfordern Network Address Translation (NAT) für den Zugriff auf externe Webressourcen."
  - question: "Was ist der Zweck einer Broadcast-Adresse?"
    answer: "Eine Broadcast-Adresse ist eine spezielle Netzwerkadresse, die verwendet wird, um Pakete an alle aktiven Geräte in einem bestimmten Subnetz gleichzeitig zu senden. In IPv4 ist die Broadcast-Adresse die absolut letzte Adresse im Bereich eines Subnetzes."
  - question: "Was ist eine Wildcard-Maske?"
    answer: "Eine Wildcard-Maske ist das bitweise Inverse einer Subnetzmaske (berechnet als ~subnetzmaske). Sie wird häufig in Cisco-Routern, Zugriffskontrolllisten (ACLs) und Routing-Protokollen (wie OSPF) verwendet, um anzugeben, welche Bits einer IP-Adresse übereinstimmen müssen."
  - question: "Was ist VLSM (Variable Length Subnet Masking)?"
    answer: "VLSM ermöglicht es Netzwerkdesignern, einen IP-Adressraum in mehrere Subnetze unterschiedlicher Größe aufzuteilen, basierend auf den Host-Anforderungen des jeweiligen Segments. Dies vermeidet die Verschwendung von IP-Adressen, die bei der festen Subnetzmaskierung (FLSM) auftritt."
  - question: "Was ist der APIPA-Adressbereich?"
    answer: "APIPA (Automatic Private IP Addressing) verwendet den IP-Adressblock 169.254.0.0/16. Betriebssysteme weisen einer Netzwerkschnittstelle automatisch eine Adresse aus diesem Bereich zu, wenn kein DHCP-Server verfügbar und keine statische IP konfiguriert ist."
  - question: "Warum wird die Loopback-Adresse 127.0.0.1 verwendet?"
    answer: "Der IP-Bereich 127.0.0.0/8 ist für Loopback-Operationen reserviert. Die Adresse 127.0.0.1 (oft als 'localhost' bezeichnet) ermöglicht es einem Computer, Netzwerkverkehr an sich selbst zu senden, was für lokale Tests, Diagnosen und die Ausführung lokaler Dienste von entscheidender Bedeutung ist."
  - question: "Wie unterscheidet sich IPv6-Subnetting von IPv4-Subnetting?"
    answer: "IPv6 verwendet 128-Bit-Adressen (im Vergleich zu den 32-Bit-Adressen von IPv4), was bedeutet, dass es über einen praktisch unerschöpflichen Adresspool verfügt. IPv6-Subnetze sind normalerweise auf eine Präfixlänge von /64 für lokale Segmente standardisiert und verwenden keine herkömmlichen Broadcast-Adressen, sondern verlassen sich auf Multicast."
---

# Leitfaden zu IP-Subnetting und Variable Length Subnet Masking (VLSM)

In der Architektur moderner digitaler Systeme wird die Internetkommunikation durch das Internet Protocol (IP) geregelt. Damit Geräte über globale Distanzen oder innerhalb lokaler Netzwerke (LANs) kommunizieren können, müssen Datenpakete präzise an ihr Ziel geleitet werden.

Da Netzwerke an Komplexität und Größe zunehmen, wird die Zuweisung eines einzigen massiven Blocks von IP-Adressen an eine Organisation ineffizient. **IP-Subnetting** ist die primäre Technik zur Aufteilung eines einzelnen physischen Netzwerks in mehrere kleinere, logisch isolierte Teilnetze.

Dieser Leitfaden bietet eine umfassende Untersuchung des IP-Subnettings, der CIDR-Notation, der Binärarithmetik hinter Netzwerkmasken, Netzwerkklassen und VLSM-Berechnungen.

---

## 1. Die Anatomie einer IPv4-Adresse

Eine IPv4-Adresse (Internet Protocol Version 4) ist eine **32-Bit-Binärzahl**, die aus einer Sequenz von 32 Einsen und Nullen besteht. Zur besseren Lesbarkeit wird dieser 32-Bit-Block in der **Dezimalschreibweise mit Punkten** dargestellt, bestehend aus vier Dezimalzahlen (jeweils im Bereich von 0 bis 255), die durch Punkte getrennt sind.

Jeder dieser vier Abschnitte wird als **Oktett** bezeichnet, da er 8 Bit darstellt ($2^8 = 256$ mögliche Werte):

$$\text{IP-Adresse (Dezimal): } 192.168.1.10$$
$$\text{IP-Adresse (Binär): } 11000000.10101000.00000001.00001010$$

Jede IP-Adresse ist in zwei verschiedene Komponenten unterteilt:
1.  **Netzwerkanteil:** Identifiziert das spezifische Netzwerk, zu dem das Gerät gehört.
2.  **Hostanteil:** Identifiziert das spezifische Gerät (Computer, Drucker, Router-Schnittstelle) innerhalb dieses Netzwerks.

Die Grenze zwischen Netzwerkanteil und Hostanteil wird durch die **Subnetzmaske** definiert.

---

## 2. Subnetzmasken und CIDR-Notation

Eine **Subnetzmaske** ist eine 32-Bit-Maske, bei der alle Netzwerkbits auf `1` und alle Hostbits auf `0` gesetzt sind. Durch eine bitweise logische `AND`-Verknüpfung der IP-Adresse mit der Subnetzmaske isoliert ein Router die Netzwerkadresse.

Beispielsweise unter Verwendung einer Standard-Klasse-C-Maske:
```
IP-Adresse:   192.168.1.10   ->  11000000.10101000.00000001.00001010
Subnetzmaske: 255.255.255.0  ->  11111111.11111111.11111111.00000000
------------------------------------------------------------------------
Netzwerk-IP:  192.168.1.0    ->  11000000.10101000.00000001.00000000
```

### Classless Inter-Domain Routing (CIDR)
Historisch gesehen waren IP-Adressen an starre Subnetzmasken gebunden, die auf Klassenstrukturen basierten. Im Jahr 1993 wurde **CIDR (Classless Inter-Domain Routing)** eingeführt, um die klassenbasierte Adressierung abzulösen.

CIDR verwendet einen Schrägstrich `/` gefolgt von der Anzahl der aktiven Netzwerkbits (Einsen) in der Subnetzmaske. Dies wird als **Präfixlänge** bezeichnet:

*   **255.255.255.0** enthält 24 Einsen, wird also als **/24** geschrieben.
*   **255.255.0.0** enthält 16 Einsen, wird also als **/16** geschrieben.
*   **255.255.255.240** enthält 28 Einsen, wird also als **/28** geschrieben.

---

## 3. Mathematische Ableitungen im Subnetting

Die Berechnung von Subnetzgrenzen erfordert Binärarithmetik. Für eine gegebene Präfixlänge $N$:

### 1. Gesamte IP-Zuweisungen
Die Gesamtzahl der im Block enthaltenen IP-Adressen ($IP_{total}$) beträgt:
$$IP_{total} = 2^{32 - N}$$

### 2. Nutzbare Host-Kapazität
In jedem Subnetz sind zwei Adressen für die Netzwerkinfrastruktur reserviert:
*   **Netzwerkadresse:** Die erste Adresse, bei der alle Hostbits `0` sind. Wird verwendet, um den Subnetzblock in Routing-Tabellen zu identifizieren.
*   **Broadcast-Adresse:** Die letzte Adresse, bei der alle Hostbits `1` sind. Wird verwendet, um Pakete an alle Hosts im Subnetz zu senden.

Somit ist die Anzahl der zuweisbaren Host-Adressen ($H_{usable}$):
$$H_{usable} = 2^{32 - N} - 2$$

*Hinweis: Für Point-to-Point-Routerverbindungen (/31 und /32) erlauben moderne Standards (RFC 3021) das Weglassen von Netzwerk- und Broadcast-Adressen, was zu 2 bzw. 1 Host führt.*

### 3. Wildcard-Maske
Eine Wildcard-Maske ist das Inverse der Subnetzmaske, berechnet als:
$$\text{Wildcard-Maske} = 255.255.255.255 - \text{Subnetzmaske}$$

---

## 4. Klassenbasierte Netzwerkstruktur

Vor CIDR war der IPv4-Adressraum basierend auf den Werten des ersten Oktetts in fünf Klassen unterteilt:

| Klasse | Bereich (Erstes Oktett) | Standardmaske | Zweck | Max. Hosts pro Netz |
| :--- | :--- | :--- | :--- | :--- |
| **Klasse A** | $1 - 126$ | $255.0.0.0$ (/8) | Riesige Organisationen | $16.777.214$ |
| **Klasse B** | $128 - 191$ | $255.255.0.0$ (/16) | Mittlere Unternehmen | $65.534$ |
| **Klasse C** | $192 - 223$ | $255.255.255.0$ (/24) | Kleine Netzwerke | $254$ |
| **Klasse D** | $224 - 239$ | Nicht zutreffend | Multicast-Gruppen | Nicht zutreffend |
| **Klasse E** | $240 - 255$ | Nicht zutreffend | Wissenschaftliche Forschung | Nicht zutreffend |

*Hinweis: Der Wert 127 im ersten Oktett ist von der Klasse A ausgeschlossen, da er für lokale Loopback-Tests (z. B. 127.0.0.1) reserviert ist.*

---

## 5. Öffentliche vs. private IP-Adressen

Um den begrenzten IPv4-Adresspool zu schonen, reservierte die Internet Engineering Task Force (IETF) bestimmte Adressblöcke für interne, private Netzwerkbereitstellungen (RFC 1918). Diese Adressen werden von öffentlichen Routern im Internet ignoriert.

### 1. RFC 1918 Private Bereiche
*   **10.0.0.0 bis 10.255.255.255** (/8 Präfix)
*   **172.16.0.0 bis 172.31.255.255** (/12 Präfix)
*   **192.168.0.0 bis 192.168.255.255** (/16 Präfix)

### 2. APIPA (Automatic Private IP Addressing)
*   **169.254.0.0 bis 169.254.255.255** (/16 Präfix)
*   Wird von Betriebssystemen verwendet, um eine Netzwerkverbindung automatisch selbst zu konfigurieren, wenn kein DHCP verfügbar ist.

---

## 6. Variable Length Subnet Masking (VLSM)

**VLSM (Variable Length Subnet Masking)** ist eine fortschrittliche Routing-Technik, bei der Subnetze innerhalb desselben übergeordneten Adressblocks unterschiedliche Größen haben können. Dies ermöglicht es Netzwerkadministratoren, Subnetze zuzuweisen, die auf die spezifischen Hostanforderungen der einzelnen Abteilungen zugeschnitten sind, wodurch Adressverschwendung minimiert wird.

### Die VLSM-Design-Methodik:
1.  **Host-Anforderungen auflisten:** Schreiben Sie die Größenanforderungen für alle Segmente auf, einschließlich Point-to-Point-Routerverbindungen (die 2 Hosts erfordern).
2.  **Nach Größe sortieren:** Sortieren Sie die Segmente in absteigender Reihenfolge (vom größten zum kleinsten Segment). **Dies ist entscheidend**, da das Zuweisen kleinerer Subnetze zuerst den Adressraum fragmentieren kann.
3.  **Blöcke zuweisen:** Für jedes Segment:
    *   Finden Sie die kleinste Blockgröße ($2^k$), die die erforderlichen Hosts plus die 2 reservierten Adressen aufnehmen kann.
    *   Finden Sie das entsprechende CIDR-Präfix ($32 - k$).
    *   Weisen Sie die Startadresse zu, berechnen Sie Netzwerk, Broadcast und Bereich.
    *   Starten Sie das nächste Segment sofort an der nächsten verfügbaren IP-Grenze.
