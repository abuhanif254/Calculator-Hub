---
title: "IP-Subnetting: Host-Bereiche und Broadcasts"
description: "Tauchen Sie tiefer in IPv4-Subnetting ein. Berechnen Sie Netzwerk-IDs, Broadcasts und Host-Bereiche mit unserem IP-Subnetz-Rechner."
---

# IP-Subnetting: Host-Bereiche und Broadcasts

Als Systemadministrator müssen Sie wissen, wie man die erste und letzte nutzbare IP in einem Subnetz findet. Wir erklären die Mathematik und wie Sie unseren [IP-Subnetz-Rechner](/de/rechner/ip-subnetz-rechner) nutzen können, um sich das Binärrechnen zu sparen.

---

## 🌐 Die 4 Teile eines Subnetzes

Jedes Subnetz hat vier kritische Bestandteile:

**1. Netzwerkadresse:** Die allererste IP. Sie identifiziert das Netz. *Kann keinem PC zugewiesen werden.*
**2. Erster nutzbarer Host:** Die Netzwerkadresse + 1.
**3. Letzter nutzbarer Host:** Die höchste zuweisbare IP.
**4. Broadcast-Adresse:** Die allerletzte IP. Nachrichten an diese IP werden an alle PCs im Subnetz gesendet. *Kann nicht zugewiesen werden.*

---

## 📝 Beispiel: Ein /24 Netzwerk

Nehmen wir `192.168.1.0 /24` (256 Adressen gesamt).

* **Netzwerk:** `192.168.1.0`
* **Erster Host:** `192.168.1.1` *(Oft Ihr Router)*
* **Letzter Host:** `192.168.1.254`
* **Broadcast:** `192.168.1.255`

Zieht man die erste und letzte ab, bleiben exakt **254 nutzbare IPs**.

---

## ⚙️ Nutzung des Rechners

Bei komplizierten Subnetzen wie `/27` oder `/22` rechnen Sie nicht per Hand!
1. **IP:** IPv4-Adresse eingeben.
2. **CIDR Maske:** Gewünschte Größe (z.B. /26) wählen.
3. **Berechnen:** Das Tool liefert sofort Netzwerkadresse, Broadcast und den genauen Host-Bereich!
