---
title: "So berechnen Sie Beton für Ihr nächstes Heimwerkerprojekt"
description: "Lernen Sie, wie Sie das Betonvolumen für Platten, Fundamente und Säulen präzise berechnen, den 10-%-Verschnitt einkalkulieren und die benötigte Sackanzahl ermitteln."
category: "Productivity & Utilities"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "concrete-calculator"
relatedType: "calculator"
faqs:
  - question: "Wie viel fertigen Beton ergibt ein 25-kg- oder 40-kg-Sack Trockenbeton?"
    answer: "Ein handelsüblicher 25-kg-Sack Trockenbeton (Estrich- oder Gartenbeton) ergibt nach Zugabe der vorgeschriebenen Wassermenge rund 12,5 bis 13 Liter Frischbeton. Ein 40-kg-Sack liefert entsprechend etwa 20 Liter. Für einen vollen Kubikmeter (1.000 Liter) benötigen Sie also rund 77 bis 80 Säcke à 25 kg oder 50 Säcke à 40 kg."
  - question: "Warum sollte man bei jeder Betonberechnung 10 % Reserve aufschlagen?"
    answer: "In der Praxis sind Baugruben und Schottertragschichten nie millimetergenau plan, Schalungsbretter geben unter dem hohen Frischbetondruck leicht nach und geringe Restmengen bleiben in der Mischmaschine, im Eimer oder in der Schubkarre haften. Ein Aufschlag von 10 % verhindert, dass die letzte Ecke unvollständig bleibt und eine statisch schwache Arbeitsfuge entsteht."
  - question: "Ab welcher Betonmenge lohnt sich Transportbeton statt Sackware aus dem Baumarkt?"
    answer: "Als wirtschaftliche und praktische Grenze gilt im Heimwerkerbereich ein Volumen von etwa 1,0 bis 1,5 m³. Ab dieser Menge entspricht der Bedarf rund 80 bis 120 Säcken à 25 kg (zwei bis drei Tonnen Material), deren Transport und manuelles Anmischen enorm zeitaufwendig sind. Ein Fahrmischer liefert gleichbleibende Normqualität direkt auf die Baustelle."
  - question: "Wie tief muss ein frostfreies Punktfundament in Deutschland, Österreich und der Schweiz sein?"
    answer: "In Mitteleuropa liegt die Frostgrenze je nach Region und Höhenlage üblicherweise zwischen 80 cm und 100 cm unter der Geländeoberkante; in alpinen Lagen auch bei 120 cm. Tragende Fundamente für Terrassenüberdachungen, Carports oder schwere Zaunanlagen sollten mindestens 80 cm tief gegründet werden, um Frosthebungen zuverlässig auszuschließen."
  - question: "Welche Folgen hat zu viel Anmachwasser beim Mischen von Beton?"
    answer: "Zu viel Wasser erhöht zwar kurzfristig die Fließfähigkeit, verschlechtert jedoch den Wasser-Zement-Wert (w/z-Wert) drastisch. Beim Verdunsten des überschüssigen Wassers entstehen feine Kapillarporen, wodurch die Druckfestigkeit stark sinkt, Schwindrisse zunehmen und Frostschäden durch eindringende Feuchtigkeit im Winter begünstigt werden."
---

Eine exakte Mengenplanung entscheidet bei jedem Betonprojekt über Statik, Optik und Budget. Wer zu wenig anmischt, riskiert kalte Arbeitsfugen während der Aushärtung; wer zu viel bestellt, zahlt unnötig für Überschuss und Entsorgung. Mit einer präzisen Volumenberechnung samt Sicherheitszuschlag bestimmen Sie Ihren Bedarf auf den Sack genau.

In diesem Leitfaden erfahren Sie, welche Formeln für Platten, Streifen- und Punktfundamente gelten, wie Sie die Sackanzahl ermitteln und welche Bauregeln zählen. Für die direkte Berechnung steht Ihnen unser kostenloser [Betonrechner](/de/rechner/betonrechner) zur Verfügung.

## Grundlagen der Betonvolumen-Berechnung und Geometrie

Beton wird in der Bauwirtschaft stets nach Raummaß in **Kubikmetern (`m³`)** oder bei kleineren Ausbesserungen in **Litern (`1 m³ = 1.000 Liter`)** kalkuliert. Unabhängig davon, ob Sie Sackware selbst anmischen oder Transportbeton bestellen, messen Sie zunächst alle Bauteilabmessungen einheitlich in Metern (oder rechnen Zentimeter durch Division durch `100` um).

Für die beiden häufigsten Heimwerker-Geometrien gelten folgende Standardformeln:

```text
Rechteckige Platte / Streifenfundament:
V_netto = L × B × H

Zylindrische Säule / Punktfundament:
V_netto = π × r² × H    (mit r = d / 2 und π ≈ 3,1416)
```

Dabei stehen `L` für die Länge, `B` für die Breite, `H` für die Bauteildicke beziehungsweise Fundamenttiefe, `d` für den Bohrlochdurchmesser und `r` für den Radius (jeweils in Metern). Bei stufenförmigen Bauteilen wie Außentreppen zerlegen Sie den Querschnitt in einzelne Quader, berechnen deren Teilvolumina separat und addieren sie anschließend.

### Die 10-%-Sicherheitsregel für Verschnitt und Untergrund

Das rein rechnerische Netto-Volumen reicht auf der Baustelle fast nie aus. Verdichteter Schotter oder gewachsener Boden weist leichte Höhenunterschiede auf, Holzschalungen biegen sich unter der Last von rund `2.350 kg` pro Kubikmeter Frischbeton minimal durch, und beim Einbringen verbleiben Reste im Mischer sowie in Transportgefäßen. Kalkulieren Sie deshalb konsequent mit einem Zuschlag von `10 %`:

```text
V_bestell = V_netto × 1,10
```

Für die Umrechnung in Sackware teilen Sie das Bestellvolumen in Litern (`V_bestell × 1.000`) durch die auf dem Gebinde angegebene Ergiebigkeit. In Deutschland, Österreich und der Schweiz liefert ein `25-kg-Sack` Trockenbeton im Schnitt `12,5 bis 13 Liter` Frischbeton; ein `40-kg-Sack` ergibt etwa `20 Liter`.

## Schritt-für-Schritt-Rechenbeispiel: Terrasse und Zaunfundamente

Angenommen, Sie planen eine rechteckige Bodenplatte für ein Gartenhaus sowie sechs zylindrische Punktfundamente für einen angrenzenden Sichtschutzzaun.

### 1. Rechteckige Bodenplatte (`4,50 m × 3,20 m × 0,12 m`)

Multiplizieren Sie die drei Abmessungen in Metern, um das Netto-Volumen zu erhalten:

```text
V_netto = 4,50 m × 3,20 m × 0,12 m = 1,728 m³
```

Nach Anwendung der `10-%-Regel` ergibt sich das Bestellvolumen:

```text
V_bestell = 1,728 m³ × 1,10 = 1,9008 m³ ≈ 1,90 m³ (1.900 Liter)
```

Da `1,90 m³` rund `152 Säcken` à `25 kg` (`3,8 Tonnen` Trockengewicht) entsprechen, empfiehlt sich hier klar die Lieferung per Transportbeton-Fahrmischer oder ein Abholen als erdfeuchter Beton im Kieswerk.

### 2. Sechs zylindrische Punktfundamente (`d = 30 cm`, `H = 80 cm`)

Bei einem Lochdurchmesser von `0,30 m` beträgt der Radius `r = 0,15 m`. Das Einzelvolumen eines frostfreien Punktfundaments mit `0,80 m` Tiefe lautet:

```text
V_einzel = 3,1416 × (0,15 m)² × 0,80 m = 3,1416 × 0,0225 × 0,80 ≈ 0,05655 m³ (56,55 Liter)
```

Für alle sechs Fundamente multiplizieren Sie mit `6` und schlagen `10 %` Reserve auf:

```text
V_gesamt = 6 × 0,05655 m³ = 0,3393 m³
V_bestell = 0,3393 m³ × 1,10 = 0,3732 m³ (373,2 Liter)
```

Teilen Sie `373,2 Liter` durch `12,5 Liter` Ergiebigkeit je `25-kg-Sack`: `373,2 / 12,5 = 29,86`. Sie kaufen also **30 Säcke à 25 kg** (`750 kg` Trockenmischung) – bequem zu verarbeiten mit einem kleinen Trommelmischer.

## Vergleichstabelle: Typische Bauprojekte und Materialbedarf

Die folgende Übersicht zeigt typische Maße nach mitteleuropäischer Baupraxis sowie den daraus resultierenden Netto- und Bestellbedarf inklusive `10 %` Sicherheitszuschlag (kalkuliert mit `12,5 Liter` pro `25-kg-Sack`):

| Projektbeispiel | Typische Maße (`L × B × H` / `d × H`) | Netto-Volumen | Bestellvolumen (`+10 %`) | Bedarf (`25-kg-Säcke`) | Empfohlene Beschaffung |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Einzelnes Zaunfundament | `d = 0,30 m × H = 0,80 m` | `0,057 m³` (`57 l`) | `0,062 m³` (`62 l`) | `5 Säcke` | Handmischung / Rührwerk |
| Gartenweg-Abschnitt | `3,00 m × 0,90 m × 0,10 m` | `0,270 m³` (`270 l`) | `0,297 m³` (`297 l`) | `24 Säcke` | Trommelmischer |
| Sechs Terrassen-Punktfundamente | `6 × (d = 0,35 m × H = 0,80 m)` | `0,462 m³` (`462 l`) | `0,508 m³` (`508 l`) | `41 Säcke` | Trommelmischer |
| Kleine Gartenhausplatte | `3,00 m × 2,50 m × 0,12 m` | `0,900 m³` (`900 l`) | `0,990 m³` (`990 l`) | `80 Säcke` | Mischer oder Kieswerk-Abholung |
| Terrassenplatte (Standard) | `4,50 m × 3,20 m × 0,12 m` | `1,728 m³` (`1.728 l`) | `1,901 m³` (`1.901 l`) | `153 Säcke` | Transportbeton (Fahrmischer) |
| Carport-Streifenfundament | `2 × (6,00 m × 0,35 m × 0,80 m)` | `3,360 m³` (`3.360 l`) | `3,696 m³` (`3.696 l`) | `296 Säcke` | Transportbeton (Fahrmischer) |

## Praxis-Tipps, Normen und typische Baufehler vermeiden

Neben der reinen Kubikmeterzahl entscheidet die fachgerechte Verarbeitung über die Dauerhaftigkeit Ihres Bauwerks:

- **Richtige Festigkeits- und Expositionsklasse wählen:** Für freibewitterte Bauteile im Außenbereich (Frost- und Taubelastung nach DIN EN 206 / DIN 1045-2) sollten Sie mindestens **C20/25** oder besser **C25/30** verwenden. Achten Sie bei Sackware auf den Hinweis „frostbeständig“ und bei Transportbeton auf die Expositionsklasse **XC4 / XF1** (bei Tausalzbelastung nahe Zufahrten **XF4**).
- **Wasserzugabe streng kontrollieren:** Überschreiten Sie niemals die auf dem Sack angegebene Wassermenge (meist `2,5 bis 3,2 Liter` pro `25 kg`). Ein zu hoher Wasser-Zement-Wert erzeugt beim Austrocknen Poren, mindert die Endfestigkeit erheblich und führt zu abplatzenden Oberflächen nach dem ersten Winter.
- **Sauber verdichten und nachbehandeln:** Eingeschlossene Luftblasen schwächen das Gefüge. Stochern Sie Punktfundamente gründlich mit einem Stahlstab ab oder nutzen Sie bei Platten einen Innenrüttler beziehungsweise eine Rüttelbohle. Decken Sie frischen Beton anschließend mindestens **3 bis 7 Tage** mit einer Baufolie ab oder halten Sie ihn leicht feucht, um Spannungsrisse durch zu schnelles Austrocknen in Sonne und Wind zu verhindern.
- **Bewehrung und Frostschutz einplanen:** Bodenplatten ab etwa `3 m` Seitenlänge benötigen in der Regel eine tragfähige Schottertragschicht (mindestens `15–20 cm` verdichtet) sowie eine Stahlbetonmatte (z. B. `Q188A`) mit `3 bis 4 cm` Betondeckung auf Abstandhaltern, um Setzungsrisse aufzunehmen.
