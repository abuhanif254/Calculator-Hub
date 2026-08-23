---
title: "Subnetting: Netzwerke unterteilen"
description: "Lernen Sie, was Subnetting ist, wie die CIDR-Notation funktioniert und nutzen Sie unseren kostenlosen Subnetz-Rechner."
---

# Subnetting: Netzwerke unterteilen

Für IT-Anfänger ist das "Subnetting" (Subnetzbildung) oft das schwerste Thema. In diesem Ratgeber erklären wir das Konzept ohne komplizierte Mathematik und zeigen unseren [Subnetz-Rechner](/de/rechner/subnetz-rechner).

---

## 🏢 Die Großraumbüro-Analogie

Stellen Sie sich 1.000 Mitarbeiter in einem einzigen Großraumbüro vor. Wenn alle gleichzeitig reden, ist der Lärm ohrenbetäubend. 
In Netzwerken ist das genauso. Computer senden ständig "Broadcast"-Nachrichten. 1.000 PCs im selben Netzwerk würden es zum Absturz bringen.

**Die Lösung?** Wände einziehen. Man teilt das Büro in isolierte Abteilungen (HR, Vertrieb, IT). In der IT teilt man einen riesigen IP-Adressbereich in kleine, isolierte **Subnetze (Subnets)**.

---

## 📝 Subnetzmasken und CIDR-Notation

Um dem PC zu sagen, wie groß sein "Büro" ist, nutzt man eine **Subnetzmaske**.
Oft sieht man IPs so: `192.168.1.50 /24`.
Das `/24` ist die **CIDR-Notation**. Sie besagt, dass dieses Netzwerk genau **254 nutzbare Computer** fassen kann. Brauchen Sie nur Platz für 14 PCs, reicht ein `/28`!

---

## ⚙️ Nutzung des Rechners

Subnetz-Mathematik (in Binärzahlen) ist fehleranfällig. IT-Profis nutzen Rechner.
1. **IP-Adresse:** IPv4-Adresse eingeben.
2. **Subnetzmaske / CIDR:** Die gewünschte Netzwerkgröße wählen.
3. **Berechnen:** Das Tool liefert sofort die Netzwerkadresse, Broadcast-Adresse und den exakten IP-Bereich für Ihre Computer!
