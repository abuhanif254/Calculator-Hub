---
title: "HIPAA-Datenanonymisierung: Safe-Harbor-Methode vs. Expertenbewertung"
description: "Verstehen Sie die HIPAA-Anforderungen nach 45 CFR §164.514 zur De-Identifizierung medizinischer Daten im Vergleich zwischen Safe Harbor (18 Identifikatoren) und Expertenverfahren."
---

## HIPAA-Standards zur De-Identifizierung (45 CFR §164.514)

Der US-amerikanische **Health Insurance Portability and Accountability Act (HIPAA)** schützt **geschützte Gesundheitsinformationen (Protected Health Information, PHI)**. Damit medizinische Datensätze für Softwaretests, Forschung oder Analysen genutzt werden dürfen, schreibt §164.514 zwei zulässige Verfahren zur De-Identifizierung vor:

### 1. Die Safe-Harbor-Methode (18 Identifikatoren)
Erfordert das vollständige Entfernen oder Maskieren von genau **18 definierten Identifikatoren**, darunter:
- Vollständige Namen von Patienten und Angehörigen.
- Geografische Angaben unterhalb der Bundesstaatsebene (Straßenadressen, fünfstellige ZIP-Codes).
- Sämtliche exakten Datumsangaben (Geburts-, Aufnahme-, Entlassungs- und Sterbedatum) mit Ausnahme des Jahres sowie die Zusammenfassung von Altersangaben über 89 Jahren.
- Telefonnummern, E-Mail-Adressen, Sozialversicherungsnummern (SSN), Patientenaktennummern (MRN), IP-Adressen und biometrische Merkmale.

### 2. Die Expertenbewertung (Expert Determination)
Ein qualifizierter Statistiker weist mithilfe mathematischer Anonymisierungsmodelle (wie **$k$-Anonymität** und **$l$-Diversität**) nach, dass das Risiko einer Re-Identifizierung einzelner Patienten verschwindend gering ist.
