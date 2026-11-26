---
title: "Wechselrichter: Batteriestrom in Wechselstrom umwandeln"
description: "Erfahren Sie, wie Wechselrichter Gleichstrom in Wechselstrom wandeln, warum reine Sinuswellen entscheidend sind und wie Sie Leistung sowie Batteriestrom exakt dimensionieren."
category: "Math & Science"
relatedCalculator: "inverter-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Kann ich an einen Wechselrichter mit modifizierter Sinuswelle problemlos ein Laptop-Netzteil oder eine Kaffeemaschine anschließen?"
    answer: "Nein, davon ist dringend abzuraten. Modifizierte Sinuswellen erzeugen eine gestufte Rechteckspannung mit hohem Oberwellengehalt. Schaltnetzteile von Laptops, Werkzeugladegeräten und Kaffeemaschinen mit elektronischer Steuerung können dadurch überhitzen, pfeifen oder irreparabel beschädigt werden. Für sensible Verbraucher ist ein Wechselrichter mit reiner Sinuswelle Pflicht."
  - question: "Wie viel Sicherheitsreserve sollte ich bei der Dauerleistung eines Wechselrichters einplanen?"
    answer: "Rechnen Sie auf die Summe aller gleichzeitig betriebenen Dauerverbraucher mindestens 20 bis 25 % Puffer hinzu. Wechselrichter reduzieren ihre maximale Ausgangsleistung bei steigender Umgebungstemperatur (Thermisches Derating ab etwa 25 bis 40 °C) und benötigen zudem Reserve für kurzfristige Lastspitzen."
  - question: "Warum ist der Anlaufstrom bei Kühlschränken, Pumpen oder Elektrowerkzeugen so wichtig?"
    answer: "Elektromotoren und Kompressoren ziehen beim Einschalten für 0,5 bis 3 Sekunden das Drei- bis Siebenfache ihrer Nennleistung. Ein 80-W-Kompressorkühlschrank kann kurzzeitig 500 bis 600 W anfordern. Überschreitet dieser Anlaufstrom die Spitzenleistung (Surge Power) des Wechselrichters, schaltet das Gerät sofort wegen Überlast ab."
  - question: "Wann lohnt sich der Umstieg von einem 12-V- auf ein 24-V- oder 48-V-Batteriesystem?"
    answer: "Ab einer Wechselrichter-Dauerleistung von etwa 1.500 bis 2.000 W werden die Gleichströme bei 12 V so hoch (über 150 A), dass extrem dicke Kabelquerschnitte (50 bis 95 mm²), teure Hochstromsicherungen und hohe Leitungsverluste entstehen. Bei 24 V halbiert sich der Batteriestrom, bei 48 V sinkt er auf ein Viertel — das macht große Anlagen deutlich sicherer und effizienter."
  - question: "Welche Schutzmaßnahmen sind beim Einbau eines 230-V-Wechselrichters im Wohnmobil oder Gartenhaus erforderlich?"
    answer: "Jeder Wechselrichter benötigt auf der DC-Seite eine Batteriehaupt-Sicherung möglichst nahe am Pluspol sowie ausreichend dimensionierte Kupferleitungen mit maximal 2 bis 3 % Spannungsfall. Auf der 230-V-AC-Seite sind je nach Netzform (IT- oder TN-System) ein allpoliger Fehlerstrom-Schutzschalter (RCD) und Leitungsschutzschalter gemäß DIN VDE 0100-721 fachgerecht vorzusehen."
---

Batterien und Solarmodule liefern elektrischen Strom stets als Gleichstrom (DC) auf einem niedrigen Spannungsniveau von `12 V`, `24 V` oder `48 V`. Haushaltsgeräte, Werkzeuge, Kaffeemaschinen und Arbeitsplatz-Netzteile benötigen im DACH-Raum jedoch `230 V` Wechselstrom (AC) mit exakt `50 Hz` Netzfrequenz. Diese Aufgabe übernimmt der Wechselrichter, indem er den Gleichstrom elektronisch taktet, hochtransformiert und als Wechselspannung ausgibt.

Mit unserem [Wechselrichter-Rechner](/de/rechner/wechselrichter-rechner) bestimmen Sie in Sekunden die benötigte Dauer- und Spitzenleistung Ihres Geräts sowie den tatsächlichen Gleichstrom, der unter Berücksichtigung des Wirkungsgrads aus Ihrer Batterie entnommen wird. Eine präzise Auslegung schützt nicht nur empfindliche Verbraucher vor Schäden, sondern verhindert auch überhitzte Batteriekabel, unnötige Leerlaufverluste und ungewollte Sicherheitsabschaltungen bei hohen Anlaufströmen. Dieser Leitfaden erklärt die Funktionsweise, vergleicht Wellenformen und führt ein vollständiges Berechnungsbeispiel durch.

## Funktionsprinzip und Wellenformen: Reine vs. modifizierte Sinuswelle

Um aus konstanter Gleichspannung eine wechselnde Netzspannung zu erzeugen, schalten Leistungstransistoren (MOSFETs oder IGBTs) in einer H-Brückenschaltung den Strom mit hoher Frequenz um. Entscheidend für die Verträglichkeit angeschlossener Geräte ist die Ausgangskurve:

* **Modifizierte Sinuswelle (Trapez-/Stufenwechselrichter):** Eine einfache Steuerung schaltet lediglich zwischen positiver Spannung, Nullvolt-Pause und negativer Spannung hin und her. Der Klirrfaktor (`THD`) liegt häufig bei `25 bis 40 %`. Induktive Lasten (Motoren, Transformatoren) erwärmen sich deutlich stärker, Audioverstärker brummen und elektronisch geregelte Netzteile können durch steile Spannungsflanken zerstört werden.
* **Reine Sinuswelle:** Über hochfrequente Pulsweitenmodulation (PWM) und einen nachgeschalteten LC-Filter bildet der Wechselrichter die geschwungene Sinuskurve des öffentlichen Stromnetzes nahezu identisch nach (`THD < 3 %`). Alle Haushalts-, Medizin- und Bürogeräte laufen störungsfrei und mit voller Effizienz.

## Berechnungsformeln für Leistung und Batteriestrom

Für die sichere Auslegung müssen AC-Dauerlast, Anlaufspitzen, Umwandlungswirkungsgrad und der resultierende DC-Batteriestrom sauber getrennt berechnet werden:

```text
Erforderliche Dauerleistung:   P_WR ≥ P_AC_gesamt × 1,25
DC-Eingangsleistung:           P_DC = (P_AC_gesamt / η) + P_leerlauf
Maximaler Batteriestrom:       I_DC = P_DC / U_DC_min
```

Dabei stehen folgende Größen für die Systemparameter:

* `P_AC_gesamt` = Summe der Wattzahlen aller gleichzeitig laufenden AC-Geräte (`W`)
* `1,25` = empfohlener Sicherheits- und Temperatur-Derating-Faktor (`25 %` Reserve)
* `η` = Wirkungsgrad des Wechselrichters unter Last (bei Markengeräten `0,88` bis `0,93`)
* `P_leerlauf` = Eigenverbrauch des eingeschalteten Wechselrichters ohne Last (oft `8` bis `25 W`)
* `U_DC_min` = niedrigste realistische Batteriespannung unter Vollast (z. B. `11,5 V` bei einem 12-V-System), da der Strom bei sinkender Spannung ansteigt

## Schritt-für-Schritt-Beispiel: Autarker Camper mit 12,8-V-LiFePO4-Akku

Ein ausgebautes Reisemobil nutzt ein `12,8-V`-LiFePO4-Bordnetz. Gleichzeitig sollen ein Induktionskochfeld auf mittlerer Stufe (`1.400 W`), ein Kompressorkühlschrank (`60 W` Dauerlast, `450 W` Anlaufspitze), ein Laptop-Netzteil (`100 W`) und der Router über `230 V` (`40 W`) betrieben werden.

1. **Gleichzeitige Dauerlast summieren:**  
   `P_AC_gesamt = 1.400 W + 60 W + 100 W + 40 W = 1.600 W`.
2. **Wechselrichter-Leistungsklasse wählen:**  
   Mit `25 %` Sicherheitsreserve ergibt sich `1.600 W × 1,25 = 2.000 W`. Ein Gerät der `2.000-W`-Klasse liefert typischerweise `4.000 W` Spitzenleistung für `2` bis `3` Sekunden — ausreichend, selbst wenn der Kühlschrankkompressor (`450 W`) während des Kochens anläuft.
3. **DC-Eingangsleistung bei η = 90 % (0,90) ermitteln:**  
   `P_DC = 1.600 W / 0,90 ≈ 1.777,78 W` (zuzüglich ca. `15 W` Eigenverbrauch = `1.792,78 W`).
4. **Batteriestrom bei Nennspannung und Lastabfall berechnen:**  
   * Bei `12,8 V` Nennspannung: `I_DC = 1.792,78 W / 12,8 V ≈ 140,06 A`.  
   * Bei entladenem Akku unter Last (`11,5 V`): `I_DC = 1.792,78 W / 11,5 V ≈ 155,89 A`.
5. **Konsequenz für Kabel und Systemspannung:**  
   Bei fast `156 A` muss das Batteriekabel bei `1,5 m` einfacher Länge mindestens `50 mm²` Querschnitt aufweisen und mit einer `200-A`-Sicherung direkt am Pluspol geschützt werden. Soll später zusätzlich ein `1.800-W`-Föhn laufen, ist ein `24-V`-System vorzuziehen, das diesen Strom auf rund `78 A` halbiert.

## Benchmark-Tabelle: Verbraucher und Anforderungen an Wechselrichter

Unterschiedliche Lastarten stellen völlig verschiedene Anforderungen an Anlaufreserve und Spannungsqualität.

| Geräteklasse | Typische Dauerleistung | Anlaufstromfaktor | Erforderliche Wellenform | Kritisches Auslegungsdetail |
| :--- | :--- | :--- | :--- | :--- |
| Laptop- / Kameranetzteil | `45–140 W` | `1,0–1,2×` | Reine Sinuswelle | PFC-Netzteile überhitzen bei Trapezspannung |
| Kompressorkühlschrank | `45–90 W` | `5–7×` (`300–600 W`) | Reine Sinuswelle | Hohe Kurzzeit-Spitzenleistung nötig |
| Induktionskochfeld / Mikrowelle | `1.000–2.000 W` | `1,1–1,3×` | Reine Sinuswelle | Dauerhaft hohe DC-Ströme, Querschnitt prüfen |
| Kaffeemaschine / Wasserkocher | `800–1.500 W` | `1,0×` | Reine Sinuswelle (bei Elektronik) | Heizwendel ohmsch, Elektronik/Pumpe empfindlich |
| Winkelschleifer / Kreissäge | `700–1.800 W` | `3–4×` | Reine Sinuswelle | Sanftanlauf-Modul verhindert Überlastabschaltung |
| CPAP-Beatmungsgerät / Medizintechnik | `30–90 W` | `1,1×` | Reine Sinuswelle (Pflicht) | Bei Herstellerfreigabe oft `12/24-V`-DC-Adapter besser |

## Schutztechnik, Normen und typische Planungsfehler

Ein klassischer Fehler bei kleinen Verbrauchern ist der 24/7-Dauerbetrieb eines überdimensionierten Wechselrichters. Ein `2.000-W`-Gerät mit `20 W` Leerlaufverbrauch zieht über `24` Stunden bereits `480 Wh` aus der Batterie, ohne dass ein einziges Endgerät Strom verbraucht. Betreiben Sie Router, LED-Leuchten oder Kühlboxen wann immer möglich direkt über `12 V` oder `24 V` DC und nutzen Sie den Wechselrichter gezielt mit Fernbedienung oder ECO-Modus. Achten Sie bei der Einbauposition außerdem auf ausreichende Luftzirkulation: In geschlossenen Staufächern ohne Belüftung steigt die Gehäusetemperatur rasch über `40 °C`, sodass viele Geräte ihre Dauerleistung automatisch drosseln oder wegen Übertemperatur abschalten.

Besondere Sorgfalt erfordert zudem die elektrische Sicherheit gemäß `DIN VDE 0100-721` (Caravans/Wohnmobile) bzw. `DIN VDE 0100-410`. Viele Insel-Wechselrichter liefern ab Werk ein ungeerdetes IT-Netz, bei dem weder Außenleiter noch Neutralleiter mit dem Chassis verbunden sind. Wird einfach ein normaler Fehlerstrom-Schutzschalter (FI/RCD) nachgeschaltet, löst dieser bei einem einzelnen Isolationsfehler möglicherweise nicht aus, weil kein Rückschluss zum Schutzleiter besteht. Für den Betrieb mehrerer Steckdosen über eine Netzvorrangschaltung (Landstrom + Wechselrichter) muss deshalb entweder eine normgerechte Erdungsverbindung (TN-System mit automatischer N-PE-Brücke im Inselbetrieb) oder für jede einzelne Steckdose eine eigene Schutzmaßnahme wie Schutztrennung oder Isolationsüberwachung durch eine Elektrofachkraft umgesetzt werden. Beachten Sie bei Wechselrichtern mit eingebautem Ladegerät zusätzlich die zulässige Strombelastbarkeit des Landstromanschlusses auf Campingplätzen (`6 A` bis `16 A`).
