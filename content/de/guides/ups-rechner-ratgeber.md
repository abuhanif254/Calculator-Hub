---
title: "USV-Rechner: Die richtige Notstrom-Batterie finden"
description: "Lernen Sie, was eine USV (Unterbrechungsfreie Stromversorgung) leistet, berechnen Sie Watt-, VA-Bedarf sowie Laufzeit und nutzen Sie unseren USV-Rechner."
category: "Productivity & Utilities"
relatedCalculator: "ups-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Was ist der Unterschied zwischen Watt (W) und Volt-Ampere (VA) bei einer USV?"
    answer: "Watt bezeichnet die tatsächliche Wirkleistung, die Ihre Endgeräte verbrauchen und in Rechenleistung oder Wärme umwandeln. Volt-Ampere (VA) misst die Scheinleistung, die aufgrund von Phasenverschiebungen und Netzteileffizienz aus dem Netz gezogen wird. Eine USV darf niemals über ihr Watt-Limit und ebenso wenig über ihr VA-Limit belastet werden."
  - question: "Warum brauchen moderne PC-Netzteile eine USV mit reiner Sinuswelle?"
    answer: "Aktuelle PC-, Workstation- und Server-Netzteile verwenden eine aktive Leistungsfaktorkorrektur (Active PFC), die eine saubere Wechselspannung erwartet. Schaltet eine einfache USV im Batteriebetrieb auf eine stufenförmige Rechteckspannung (modifizierte Sinuswelle) um, erkennen viele Active-PFC-Netzteile dies als Netzfehler und schalten den Computer trotz USV sofort ab."
  - question: "Wie viel Leistungsreserve sollte man bei der USV-Auswahl einplanen?"
    answer: "Planen Sie mindestens 20 % bis 25 % Reserve oberhalb Ihrer gemessenen oder summierten Dauerlast ein. Dieser Spielraum verhindert Überlastabschaltungen durch kurzzeitige Einschaltströme, reduziert die thermische Belastung des Wechselrichters und kompensiert den unvermeidlichen Kapazitätsverlust alternder Batterien."
  - question: "Wie lange hält eine USV-Batterie bei einem Stromausfall durch?"
    answer: "Im Heimbüro und kleinen Serverraum ist eine USV nicht für stundenlangen Weiterbetrieb ausgelegt, sondern für 5 bis 20 Minuten Autonomiezeit – gerade lang genug, um offene Dokumente zu sichern und Systeme per USB- oder Netzwerkbefehl geordnet herunterzufahren. Durch den Peukert-Effekt sinkt die entnehmbare Kapazität von Blei-Akkus bei sehr hoher Last überproportional stark."
  - question: "Woran erkennt man die Unterschiede zwischen VFD-, VI- und VFI-USV-Anlagen?"
    answer: "Gemäß Norm IEC 62040-3 stehen VFD (Offline/Standby) für einfache Systeme mit 6 bis 12 ms Umschaltzeit, VI (Line-Interactive) für Geräte mit automatischer Spannungsregelung (AVR) und 2 bis 6 ms Umschaltzeit sowie VFI (Online-Doppelwandler) für unterbrechungsfreie 0-ms-Versorgung bei maximalem Schutz vor Frequenzschwankungen und Netzstörungen."
---

Bereits ein kurzer Spannungseinbruch von wenigen Millisekunden oder ein plötzlicher Netzausfall genügt, um ungespeicherte Projektdaten zu zerstören, RAID-Verbünde auf einem NAS-System zu beschädigen oder empfindliche Netzwerkhardware außer Betrieb zu setzen. Eine **Unterbrechungsfreie Stromversorgung (USV)** überbrückt diese Unterbrechungen nahtlos über interne Akkumulatoren und glättet gleichzeitig gefährliche Überspannungen sowie Unterspannungen im 230-V-Stromnetz.

Damit Ihre Notstromlösung im Ernstfall weder durch Überlast abschaltet noch nach zwei Minuten erschöpft ist, müssen **Wirkleistung (Watt)**, **Scheinleistung (VA)**, **Leistungsfaktor** und die **gewünschte Autonomiezeit** exakt aufeinander abgestimmt sein. Unser [USV-Rechner](/de/rechner/usv-rechner) ermittelt aus der Summe Ihrer angeschlossenen Verbraucher die passende Leistungsklasse inklusive Sicherheitsreserve.

## Elektrische Grundlagen: Watt, Volt-Ampere, Leistungsfaktor und Laufzeit

Jede USV besitzt zwei unabhängige Belastungsgrenzen: die maximale Wirkleistung in Watt (`W`) und die maximale Scheinleistung in Volt-Ampere (`VA`). Der Zusammenhang wird über den **Leistungsfaktor (`PF` bzw. `cos φ`)** beschrieben, der bei modernen Schaltnetzteilen mit aktiver Leistungsfaktorkorrektur typischerweise zwischen `0,85` und `0,98` liegt, bei älteren oder einfachen Netzteilen aber auf `0,60` bis `0,75` absinken kann.

```text
Scheinleistung (VA):     S_Last = P_Last / PF_Last
Mindest-USV-Leistung:    P_USV_min = P_gesamt × 1,25   (25 % Reserve)
                         S_USV_min = S_gesamt × 1,25
Stromaufnahme (230 V):   I (A) = S_Last / 230 V
Autonomiezeit (ca.):     t (Std.) ≈ (U_Batt × C_Ah × η_WR × k_Peukert) / P_gesamt
```

Für eine verlässliche Auslegung im europäischen `230-V / 50-Hz`-Netz sind vier Parameter entscheidend:

* **Wirkleistung (`P` in W):** Die tatsächlich abgegebene elektrische Leistung Ihrer Verbraucher unter realer Last (nicht zu verwechseln mit dem Maximalwert auf dem Netzteil-Typenschild; ein 850-W-PC-Netzteil zieht im Bürobetrieb oft nur `150–350 W`).
* **Scheinleistung (`S` in VA):** Die Summe aus Wirk- und Blindleistung, die der USV-Wechselrichter bereitstellen muss. Eine USV mit `1.500 VA / 900 W` besitzt einen eigenen Ausgangs-Leistungsfaktor von `0,60`.
* **Sicherheitsmarge (`20–25 %`):** Verhindert Überlastmeldungen bei Einschaltspitzen (beispielsweise wenn mehrere Festplatten gleichzeitig anlaufen) und schafft Puffer für künftige Erweiterungen.
* **Peukert-Effekt (`k_Peukert`) und Wechselrichter-Wirkungsgrad (`η_WR`):** Klassische VRLA-Blei-AGM-Akkus liefern bei schneller 10- bis 15-Minuten-Hochstromentladung oft nur `55 %` bis `65 %` ihrer auf 20 Stunden normierten Nennkapazität (`C20`), während der Wechselrichter rund `85–92 %` Wirkungsgrad erreicht.

## Schritt-für-Schritt-Dimensionierung: Workstation, Monitore und NAS

Ein Ingenieurbüro möchte einen Arbeitsplatz absichern, bestehend aus einer **Workstation (`380 W` Last, `PF = 0,95`)**, **zwei 27-Zoll-Monitoren (`je 45 W`, `PF = 0,90`)**, einem **4-Bay-NAS-Server (`55 W`, `PF = 0,90`)** und einem **Glasfaser-Router samt Switch (`25 W`, `PF = 0,80`)**. Ziel ist eine Überbrückungszeit von mindestens **10 Minuten** für einen automatisierten Shutdown.

1. **Gesamte Wirkleistung addieren:** `P_gesamt = 380 W + (2 × 45 W) + 55 W + 25 W = 550 W`.
2. **Einzelne Scheinleistungen berechnen:**
   * Workstation: `380 W / 0,95 = 400,0 VA`
   * Beide Monitore: `90 W / 0,90 = 100,0 VA`
   * NAS-System: `55 W / 0,90 = 61,1 VA`
   * Router und Switch: `25 W / 0,80 = 31,25 VA`
   * Summe `S_gesamt = 592,35 VA` (effektiver Misch-Leistungsfaktor: `0,928`).
3. **25-%-Sicherheitsreserve aufschlagen:**
   * Erforderliche USV-Wirkleistung: `550 W × 1,25 = 687,5 W` (mindestens `700 W`).
   * Erforderliche USV-Scheinleistung: `592,35 VA × 1,25 = 740,4 VA`.
   * *Auswahlentscheidung:* Eine preiswerte `1.000-VA`-Einsteiger-USV mit nur `600 W` Ausgangsleistung wäre mit `550 W / 600 W = 91,7 %` Auslastung ungeeignet. Die nächste passende Klasse ist eine Line-Interactive-USV mit **1.500 VA / 900 W** (`61,1 %` Auslastung) oder ein Modell mit **1.000 VA / 800 W** (`PF = 0,8`).
4. **Autonomiezeit verifizieren:** Eine typische `1.500-VA`-USV enthält zwei in Reihe geschaltete `12-V / 9-Ah`-Bleiakkus (`24 V × 9 Ah = 216 Wh` nominal). Bei `η_WR = 0,88` und `k_Peukert = 0,60` stehen nutzbare `216 Wh × 0,88 × 0,60 = 114,05 Wh` bereit. Geteilt durch `550 W` ergibt dies eine realistische Laufzeit von `0,207 Std.` beziehungsweise **12,4 Minuten** – ausreichend für sicheres Speichern und automatisches Herunterfahren.

## USV-Topologien und typische Lastszenarien im Vergleich

Die internationale Norm **IEC 62040-3** unterteilt USV-Anlagen in drei Betriebsarten, die sich in Umschaltzeit, Spannungsqualität und Einsatzgebiet deutlich unterscheiden:

| Topologie / Lastszenario | Umschaltzeit | Wellenform (Batterie) | Typischer USV-PF | Empfohlene USV-Klasse | Typischer Einsatz & erwartete Laufzeit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Offline / Standby (VFD)** | `6–12 ms` | Modifizierte Rechteckspannung | `0,50–0,60` | `400–650 VA / 360 W` | Einfache Kassensysteme, Modem/Router ohne Active-PFC |
| **Line-Interactive (VI)** | `2–6 ms` | Modifiziert oder Reine Sinuswelle | `0,60–0,85` | `750–3.000 VA` | Büros, Workstations, NAS; mit AVR gegen Unterspannung |
| **Online-Doppelwandler (VFI)** | `0 ms` | Reine Sinuswelle (dauerhaft) | `0,80–1,00` | `1.000–20.000+ VA` | Rechenzentren, Medizintechnik, Gebiete mit starker Frequenzdrift |
| **Netzwerk & NAS (`80 W`)** | `2–8 ms` | Reine Sinuswelle empfohlen | `0,60–0,80` | `600–800 VA / 400 W` | ca. `25–40 Minuten` mit `1× 12 V / 9 Ah`-Akku |
| **Workstation + Displays (`550 W`)** | `2–4 ms` | Reine Sinuswelle zwingend | `0,80–0,90` | `1.500 VA / 900 W` | ca. `10–14 Minuten` mit `2× 12 V / 9 Ah`-Akkus |
| **Kleiner Serverschrank (`1.800 W`)** | `0 ms` (VFI) | Reine Sinuswelle | `0,90–1,00` | `3.000 VA / 2.700 W` | Rackmount mit SNMP-Karte, `16-A`-Einspeisung & Zusatzakku |

## Auswahlkriterien, typische Planungsfehler und Sicherheitsvorgaben

Im praktischen Einsatz entscheidet oft die richtige Zuordnung der Verbraucher über die Ausfallsicherheit:

1. **Hochleistungsverbraucher am Batterieausgang:** Laserdrucker, Heizlüfter oder Kaffeemaschinen erzeugen beim Aufheizen Lastspitzen über `1.200 W` und lösen sofort die Überlastsicherung aus. Verbinden Sie solche Geräte nur mit reinen Überspannungsbuchsen.
2. **Modifizierte Sinuswelle bei Aktiv-PFC-Netzteilen:** Günstige VFD-Geräte ohne echte Sinuswelle verursachen beim Umschalten bei modernen PC- und Server-Netzteilen häufig sofortige Abstürze.
3. **Temperaturbedingter Akkuverschleiß:** Blei-AGM-Akkus erreichen ihre 3 bis 5 Jahre Lebensdauer nur bei `20 °C`; pro `10 °C` Temperaturanstieg halbiert sich diese Spanne. **LiFePO4-Systeme** halten 8 bis 10 Jahre, sind aber teurer.
4. **Fehlende Shutdown-Kommunikation:** Ohne USB- oder SNMP-Verbindung zum NAS oder Server (z. B. über *Network UPS Tools*, NUT) entlädt sich die Batterie bei Abwesenheit vollständig bis zum harten Stromabbruch.

**Normative Hinweise:** Anlagen ab `3.000 VA` benötigen im europäischen `230-V`-Netz meist `16-A`-Anschlüsse (`IEC 60320 C20` oder `CEE 16 A`) statt Schukosteckern. Kaskadieren Sie niemals Überspannungsleisten hinter einer USV und entsorgen Sie Altakkus fachgerecht gemäß Batteriegesetz (BattG).
