---
title: "Molaritäts-Verdünnung: Die c1V1 = c2V2 Formel"
description: "Lernen Sie, wie Sie Stammlösungen exakt nach c₁ × V₁ = c₂ × V₂ verdünnen, Verdünnungsreihen ansetzen und Volumenfehler vermeiden – inklusive Verdünnungsrechner."
category: "Math & Science"
relatedCalculator: "molarity-dilution-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Warum bleibt die Stoffmenge bei c₁ × V₁ = c₂ × V₂ konstant?"
    answer: "Beim Verdünnen einer Lösung fügen Sie ausschließlich reines Lösungsmittel hinzu – beispielsweise Reinstwasser oder einen Puffer. Dadurch vergrößert sich zwar das Gesamtvolumen und die Konzentration sinkt, die absolute Anzahl der gelösten Teilchen (Stoffmenge n in Mol) aus der entnommenen Stammlösung ändert sich jedoch nicht."
  - question: "Darf man in der Verdünnungsgleichung verschiedene Volumeneinheiten wie mL und L mischen?"
    answer: "Nein. Auf beiden Seiten der Gleichung c₁ × V₁ = c₂ × V₂ müssen identische Einheiten für Konzentration und Volumen verwendet werden. Wenn Sie V₂ in Litern einsetzen und c₁ sowie c₂ beide in mol/L angeben, erhalten Sie V₁ automatisch ebenfalls in Litern – oder Sie rechnen beide Volumina vorab konsequent in Milliliter (mL) um."
  - question: "Wann setzt man eine serielle Verdünnung (Verdünnungsreihe) ein?"
    answer: "Eine mehrstufige Verdünnungsreihe wird immer dann nötig, wenn der gewünschte Verdünnungsfaktor extrem groß ist (z. B. 1 : 10.000 oder 1 : 1.000.000). Ein direkter Ansatz in einem Schritt würde mikroskopisch kleine Pipettiervolumina im Nanoliterbereich oder unrealistisch große Messkolben erfordern; schrittweise 1:10-Verdünnungen halten jedes Pipettiervolumen im präzise messbaren Bereich."
  - question: "Warum darf man Wasser niemals direkt in konzentrierte Schwefelsäure gießen?"
    answer: "Beim Mischen konzentrierter Schwefelsäure mit Wasser wird eine sehr große Hydratationswärme frei (stark exotherme Reaktion). Gießt man das leichtere Wasser auf die dichte Säure, erhitzt sich die Grenzschicht schlagartig bis zum Siedeverzug, wodurch ätzende Säuretröpfchen herausspritzen können. Deshalb gilt die Sicherheitsregel: Erst das Wasser vorlegen, dann unter Rühren die Säure langsam zugeben."
  - question: "Wann wird die einfache Annahme V_Lösungsmittel = V₂ − V₁ im Labor ungenau?"
    answer: "Bei hochkonzentrierten wässrigen Lösungen oder organischen Mischungen (z. B. Ethanol/Wasser oder konzentrierte Mineralsäuren) tritt eine Volumenkontraktion auf: Das Gesamtvolumen ist kleiner als die Summe der Einzelvolumina. Für exakte Molaritäten füllen Sie die entnommene Stammlösung V₁ daher nicht mit einer berechneten Wassermenge auf, sondern ergänzen in einem geeichten Messkolben exakt bis zur Ringmarke V₂."
---

Aus Sicherheits-, Platz- und Haltbarkeitsgründen liefern Chemikalienhersteller Säuren, Basen und Pufferkonzentrate fast immer als hochkonzentrierte **Stammlösungen** – etwa `12,0 mol/L` Salzsäure oder `18,0 mol/L` Schwefelsäure. Im täglichen Laborbetrieb werden hingegen deutlich niedrigere, exakt definierte **Arbeitskonzentrationen** benötigt. Das mathematische Werkzeug für diesen Übergang ist die **Verdünnungsgleichung** `c₁ × V₁ = c₂ × V₂`.

Obwohl die Gleichung auf den ersten Blick schlicht wirkt, entstehen im Laboralltag zahlreiche Fehler durch verwechselte Einheiten (`mL` vs. `L`, `mmol/L` vs. `mol/L`), Volumenkontraktion oder falsche Reihenfolgen beim Ansetzen gefährlicher Säuren. Mit unserem [Molaritäts-Verdünnungs-Rechner](/de/rechner/molaritaets-verduennungsrechner) berechnen Sie das exakte Entnahmevolumen, die Zielkonzentration oder das maximal herstellbare Endvolumen zuverlässig in Sekunden.

## Grundlagen: Stoffmengenerhaltung und die Verdünnungsgleichung

Jede Verdünnung beruht auf einem einfachen physikalischen Erhaltungsprinzip: Wenn Sie aus einer Vorratsflasche ein bestimmtes Teilvolumen `V₁` einer Stammlösung der Konzentration `c₁` abpipettieren, befindet sich darin die Stoffmenge `n₁ = c₁ × V₁`. Geben Sie diese Portion in ein neues Gefäß und füllen mit reinem Lösungsmittel auf das größere Endvolumen `V₂` auf, bleibt die Anzahl der gelösten Moleküle oder Ionen unverändert (`n₁ = n₂`). Daraus folgt unmittelbar:

```
n₁ = n₂   ⇒   c₁ × V₁ = c₂ × V₂
```

Durch einfaches Umstellen lässt sich jede der vier Größen berechnen, sofern die übrigen drei bekannt sind:

```
Benötigtes Entnahmevolumen:      V₁ = (c₂ × V₂) / c₁
Resultierende Zielkonzentration: c₂ = (c₁ × V₁) / V₂
Erreichbares Endvolumen:         V₂ = (c₁ × V₁) / c₂
Verdünnungsfaktor:               f  = c₁ / c₂ = V₂ / V₁
Lösungsmittelanteil (ideal):     V_LM ≈ V₂ − V₁
```

Die Parameter sind eindeutig definiert:

- **`c₁` (Ausgangskonzentration / Stammlösung):** Molarität der konzentrierten Lösung in `mol/L` (häufig auch mit `M` abgekürzt), `mmol/L` (`mM`) oder `µmol/L` (`µM`).
- **`V₁` (Entnahmevolumen):** Das exakt abzumessende Volumen der Stammlösung.
- **`c₂` (Zielkonzentration):** Die gewünschte niedrigere Arbeitskonzentration.
- **`V₂` (Endvolumen):** Das Gesamtvolumen der fertigen verdünnten Lösung nach dem Auffüllen bis zur Kalibriermarke.

## Schritt-für-Schritt-Beispiel: Vom Handelskonzentrat zur Arbeitslösung

Sie sollen im analytischen Labor **250 mL** einer **0,50 mol/L Salzsäure** (`HCl`) herstellen. Im Chemikalienschrank steht eine konzentrierte Salzsäure-Stammlösung (`37 %` Massenanteil) mit einer Molarität von **12,0 mol/L** bereit.

### Schritt 1: Bekannte Größen und Einheiten abgleichen

- `c₁ = 12,0 mol/L`
- `c₂ = 0,50 mol/L`
- `V₂ = 250 mL` (entspricht `0,250 L`)

Beide Konzentrationen liegen bereits in `mol/L` vor. Wenn Sie `V₂` in Millilitern einsetzen, erhalten Sie `V₁` automatisch direkt in Millilitern.

### Schritt 2: Entnahmevolumen `V₁` und Verdünnungsfaktor `f` berechnen

```
V₁ = (c₂ × V₂) / c₁
V₁ = (0,50 mol/L × 250 mL) / 12,0 mol/L
V₁ = 125 mL / 12,0 = 10,4167 mL ≈ 10,42 mL
```

Der Verdünnungsfaktor beträgt `f = 12,0 / 0,50 = 24` (eine 1:24-Verdünnung).

### Schritt 3: Sicheres und normgerechtes Ansetzen im Messkolben

Für eine exakte Arbeitslösung reicht das bloße Zusammenkippen von `10,42 mL` Säure und `239,58 mL` Wasser nicht aus, da konzentrierte Säuren beim Mischen mit Wasser Wärme freisetzen und leicht kontrahieren. Gehen Sie wie folgt vor:

1. Legen Sie in einem **250-mL-Messkolben der Klasse A** (nach DIN EN ISO 1042) zunächst rund `150 mL` vollentsalztes Wasser vor.
2. Pipettieren Sie vorsichtig `10,42 mL` der `12,0 M` Salzsäure unter dem Abzug hinzu und schwenken Sie den Kolben leicht um.
3. Lassen Sie die leicht erwärmte Lösung auf die Kalibriertemperatur von `20 °C` abkühlen.
4. Füllen Sie erst dann exakt mit vollentsalztem Wasser bis zur `250-mL`-Ringmarke auf (Meniskusunterkante auf Augenhöhe) und homogenisieren Sie durch mehrfaches Umschwenken.

## Szenario-Tabelle: Häufige Laborverdünnungen und Verdünnungsfaktoren

Die folgende Übersicht zeigt typische Verdünnungsansätze aus Analytik, Titrimetrie und Molekularbiologie einschließlich des idealisierten Lösungsmittelbedarfs bis zur Marke.

| Stammlösung `c₁` | Zielkonzentration `c₂` | Endvolumen `V₂` | Entnahmevolumen `V₁` | Verdünnungsfaktor `f` | Wasser / Puffer (ca. bis zur Marke) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`12,0 mol/L` HCl** | `1,00 mol/L` | `500 mL` | `41,67 mL` | `12` | ca. `458,33 mL` |
| **`12,0 mol/L` HCl** | `0,50 mol/L` | `250 mL` | `10,42 mL` | `24` | ca. `239,58 mL` |
| **`18,0 mol/L` H₂SO₄** | `0,10 mol/L` | `1.000 mL` | `5,56 mL` | `180` | ca. `994,44 mL` |
| **`10,0 mol/L` NaOH** | `2,00 mol/L` | `200 mL` | `40,00 mL` | `5` | ca. `160,00 mL` |
| **`1,00 mol/L` NaCl** | `0,15 mol/L` | `500 mL` | `75,00 mL` | `6,67` | ca. `425,00 mL` |
| **`100 mmol/L` Tris-Puffer** | `10,0 mmol/L` | `100 mL` | `10,00 mL` | `10` | ca. `90,00 mL` |

## Laborsicherheit, Volumenkontraktion und typische Fehler

Bei Verdünnungen entscheiden physikalische Effekte und Sicherheitsvorschriften nach der deutschen Gefahrstoffverordnung (GefStoffV bzw. TRGS 526) über den Erfolg und die Unversehrtheit im Labor:

- **Säure-Sicherheitsregel:** Bei starken Säuren und Basen (insbesondere Schwefelsäure `H₂SO₄`, Salzsäure `HCl` oder konzentrierte Natronlauge `NaOH`) gilt ausnahmslos: *Erst das Wasser vorlegen, dann die Säure langsam unter Rühren zugeben.* So nimmt die große Wärmekapazität des vorgelegten Wassers die freiwerdende Lösungs- und Hydratationswärme sicher auf und verhindert gefährlichen Siedeverzug.
- **Einheitenkonsistenz prüfen:** Ein verbreiteter Rechenfehler entsteht beim Mischen von `mol/L` und `mmol/L` (Faktor 1.000) oder von `mL` und `L`. Ebenso darf eine prozentuale Massenkonzentration (z. B. `37 %` HCl) nicht direkt in die Gleichung eingesetzt werden, wenn die Zielgröße in `mol/L` gesucht wird – hierfür müssen Sie zunächst über Dichte und molare Masse in `mol/L` umrechnen.
- **Volumenkontraktion und Temperaturfehler:** Messkolben der Klasse A sind in Europa auf `20 °C` justiert (`Ex` bzw. `In`). Mischt man etwa Ethanol und Wasser im Verhältnis 1:1, schrumpft das Gesamtvolumen um rund `3,5 %`. Deshalb definiert `V₂` stets das **Endvolumen nach dem Auffüllen** und nicht die Summe der einzeln abgemessenen Volumina.
- **Serielle Verdünnung gegen Pipettierfehler:** Sollen aus einer `1,0 mol/L`-Stammlösung `10 mL` einer `1,0 µmol/L`-Arbeitslösung hergestellt werden (`f = 1.000.000`), ergäbe sich rechnerisch `V₁ = 0,01 µL` – ein Volumen, das sich mit keiner Standard-Kolbenhubpipette genau aufnehmen lässt. Lösen Sie solche Aufgaben stattdessen über drei aufeinanderfolgende 1:100-Schritte (jeweils `100 µL` in `10,0 mL`), wodurch alle Entnahmen präzise im kalibrierten Arbeitsbereich der Pipette liegen.
