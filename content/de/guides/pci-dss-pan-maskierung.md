---
title: "PCI DSS PAN-Maskierung: Schutz von Karteninhaberdaten in Datenbanken"
description: "Technischer Leitfaden zu PCI DSS v4.0 Anforderung 3 — wie Sie Primary Account Numbers (PAN) maskieren, kürzen und tokenisieren, um Karteninhaberdaten rechtskonform zu schützen."
---

## PCI DSS v4.0 Anforderung 3: Schutz der Primary Account Number (PAN)

Der **Payment Card Industry Data Security Standard (PCI DSS)** definiert verbindliche Sicherheitsvorgaben für alle Systeme, die Zahlungskartendaten speichern, verarbeiten oder übertragen. Die **Primary Account Number (PAN)** — die 15- oder 16-stellige Kartennummer — steht dabei im Zentrum der technischen Schutzmaßnahmen.

### Maskierungsregel bei der Anzeige (BIN + letzte 4 Ziffern)
Gemäß PCI DSS dürfen bei der Anzeige einer PAN auf Bildschirmen, Belegen oder in Support-Systemen maximal **die ersten 6 Ziffern (Issuer Identification Number / BIN) und die letzten 4 Ziffern** sichtbar sein (z. B. `453201******7890` oder `************7890`).

### Kürzung (Truncation), Tokenisierung und Hashing in Datenbanken
Um gespeicherte PAN-Daten nach PCI DSS Anforderung 3.5 unlesbar zu machen, sind folgende Verfahren zulässig:
1. **Irreversible Kürzung (Truncation)**: Dauerhaftes Entfernen der mittleren Ziffernblöcke vor dem Speichern in Datenbanken oder Logdateien.
2. **Tokenisierung**: Ersetzung der echten Kartennummer durch einen wertlosen Stellvertreter-Token.
3. **Kryptografisches Einweg-Hashing mit Salt**: Berechnung eines starken, schlüsselbasierten Hashwerts über die gesamte PAN.
