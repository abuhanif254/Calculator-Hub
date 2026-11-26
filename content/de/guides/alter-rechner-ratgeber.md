---
title: "Die mathematische Formel für das Alter: So berechnen Sie das genaue Alter"
description: "Verstehen Sie die exakte gregorianische Altersberechnung, Schaltjahrregeln nach § 187/188 BGB, Tageszählung sowie kulturelle Alterssysteme im Detail."
category: "Productivity & Utilities"
relatedCalculator: "age-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Warum reicht es nicht aus, die Tagesdifferenz durch 365,25 zu teilen?"
    answer: "Die mittlere gregorianische Jahreslänge beträgt 365,2425 Tage, während einzelne Kalenderjahre 365 oder 366 Tage und Monate zwischen 28 und 31 Tagen besitzen. Eine pauschale Division durch 365,25 führt bei runden Geburtstagen häufig zu Abweichungen von ein bis zwei Tagen und kann weder Schaltjahr-Sprünge noch unterschiedliche Monatslängen kalendergerecht abbilden."
  - question: "Wie lautet die exakte mathematische Schaltjahr-Regel des gregorianischen Kalenders?"
    answer: "Ein Jahr ist genau dann ein Schaltjahr mit 366 Tagen, wenn es durch 4 teilbar ist, aber nicht durch 100 – es sei denn, es ist gleichzeitig durch 400 teilbar. Daher war das Jahr 2000 ein Schaltjahr, während die Jahre 1900 und 2100 reguläre Gemeinjahre mit 365 Tagen bleiben."
  - question: "Wann gilt man rechtlich als ein Jahr älter, wenn man am 29. Februar geboren wurde?"
    answer: "Nach deutschem Zivilrecht (§ 187 Abs. 2 S. 2 in Verbindung mit § 188 Abs. 3 BGB) endet das Lebensjahr in Nicht-Schaltjahren mit Ablauf des letzten Monatstages, also am 28. Februar um 24:00 Uhr. Rechtlich tritt das neue Lebensjahr – etwa die Volljährigkeit – somit um 00:00 Uhr des 1. März ein. Einige Länder wie Neuseeland setzen behördlich den 28. Februar an."
  - question: "Was hat sich beim traditionellen koreanischen Alterssystem im Jahr 2023 geändert?"
    answer: "Historisch wurden Neugeborene in Südkorea bei der Geburt als 1 Jahr alt gezählt und erhielten an jedem 1. Januar ein weiteres Lebensjahr hinzu, wodurch Babys Ende Dezember binnen Tagen 2 Jahre alt wurden. Seit dem 28. Juni 2023 hat Südkorea im Zivil- und Verwaltungsrecht offiziell auf das internationale Alter (Man-Nai) umgestellt."
  - question: "Wie behandeln Altersrechner Monatsenden wie eine Geburt am 31. Januar am Stichtag 28. Februar?"
    answer: "Bei der Kalender-Subtraktion wird ein ganzer Kalendermonat erst vollendet, wenn das Ziel-Tagesdatum mindestens dem Geburts-Tagesdatum entspricht oder das Monatsende nach juristischer Zählung erreicht wird. Standard-Algorithmen borgen bei kleinerem Stichtag die exakte Tageszahl des jeweiligen Vormonats, um konsistente Jahre, Monate und Resttage auszugeben."
---

Auf den ersten Blick wirkt die Berechnung des eigenen Alters trivial, doch ein kalendergenaues Ergebnis in Jahren, Monaten, Tagen und Gesamtstunden erfordert einen strikten Algorithmus. Ungleiche Monatslängen zwischen 28 und 31 Tagen, Schalttage alle vier Jahre sowie Jahrhundertregeln machen eine pauschale Division durch `365` oder `365,25` unbrauchbar.

Unser [Altersrechner](/de/rechner/alter-rechner) übernimmt diese Kalenderlogik exakt bis auf die Minute und berechnet neben Jahren, Monaten und Resttagen auch Ihre insgesamt gelebten Wochen, Tage und Stunden. Dieser Leitfaden erläutert den schrittweisen Rechenalgorithmus, führt ein vollständig geprüftes Beispiel durch und ordnet rechtliche sowie kulturelle Besonderheiten im DACH-Raum und international ein.

## Algorithmus der exakten Altersberechnung (Jahre, Monate, Tage)

Um das Alter zwischen einem Geburtsdatum `(J_geb, M_geb, T_geb)` und einem Stichtag `(J_ziel, M_ziel, T_ziel)` fehlerfrei zu bestimmen, arbeitet man rückwärts von den Tagen über die Monate zu den Jahren und borgt bei negativen Differenzen jeweils die exakte Länge der Vorgängereinheit:

```text
1. Tage berechnen:
   t = T_ziel − T_geb
   Falls t < 0: t = t + L_vormonat(J_ziel, M_ziel)  und  M_ziel = M_ziel − 1

2. Monate berechnen:
   m = M_ziel − M_geb
   Falls m < 0: m = m + 12  und  J_ziel = J_ziel − 1

3. Jahre berechnen:
   j = J_ziel − J_geb

Schaltjahrbedingung für Februar (29 statt 28 Tage):
Schaltjahr = (J mod 4 = 0) UND ((J mod 100 ≠ 0) ODER (J mod 400 = 0))
```

Dabei bezeichnet `L_vormonat` die exakte Tageszahl des Kalendermonats unmittelbar vor `M_ziel` (etwa `31` für Januar, wenn `M_ziel` der Februar ist, oder `29` für Februar in einem Schaltjahr, wenn `M_ziel` der März ist). Durch das gezielte Borgen aus dem konkreten Vormonat vermeidet die Formel jeden Drift bei langen Zeiträumen.

Für die **Gesamtanzahl gelebter Tage (`D_gesamt`)** zählt man hingegen nicht mit pauschalen Monatsdurchschnitten, sondern addiert die exakten Tage aller vollen Jahre inklusive jedes einzelnen `29. Februar` im Intervall sowie die exakt verstrichenen Tage im Start- und Zieljahr. Im gregorianischen Kalender beträgt die mittlere Jahreslänge über einen 400-Jahres-Zyklus exakt `365,2425` Tage (`(400 × 365 + 97) / 400`), da alle `400` Jahre genau `97` Schalttage anfallen.

## Schritt-für-Schritt-Beispiel: Vom 28. August 1995 bis zum 10. Februar 2026

Ermitteln wir sowohl das kalendarische Alter als auch die exakt gelebten Tage für eine Person, die am `28. August 1995` geboren wurde, bezogen auf den Stichtag `10. Februar 2026`:

1. **Tage mit Vormonat-Leihe bestimmen:**  
   `t = 10 − 28 = −18`. Da das Ergebnis negativ ist, borgen wir die Tageslänge des Vormonats von Februar 2026 (Januar 2026 mit `31` Tagen) und verringern den Zielmonat um `1` (von Februar auf Januar).  
   `t = −18 + 31 = 13 Tage`.
2. **Monate mit Jahres-Leihe bestimmen:**  
   Mit dem angepassten Zielmonat `1` (Januar) gilt: `m = 1 − 8 = −7`.  
   Wir borgen `12` Monate (`m = −7 + 12 = 5 Monate`) und verringern das Zieljahr um `1` auf `2025`.
3. **Jahre berechnen:**  
   `j = 2025 − 1995 = 30 Jahre`.  
   Das exakte kalendarische Alter beträgt somit **30 Jahre, 5 Monate und 13 Tage**.
4. **Exakte Gesamttage und Stunden verifizieren:**  
   * Vom `28.08.1995` bis zum `28.08.2025` liegen `30` volle Jahre. In diesen Zeitraum fallen exakt `8` Schalttage (`1996, 2000, 2004, 2008, 2012, 2016, 2020, 2024`):  
     `30 × 365 + 8 = 10.958 Tage`.
   * Vom `28.08.2025` bis zum `10.02.2026` addieren wir die Monatsreste: `3` Resttage im August + `30` (Sept.) + `31` (Okt.) + `30` (Nov.) + `31` (Dez.) + `31` (Jan.) + `10` (Feb.) = `166 Tage`.
   * **Gesamtsumme:** `10.958 + 166 = 11.124 Tage` (entspricht `1.589 Wochen und 1 Tag` sowie `11.124 × 24 = 266.976 Stunden` ohne Zeitumstellung).

## Vergleich: Kulturelle und juristische Alterssysteme

Nicht weltweit und nicht in jeder Fachdisziplin wird das Alter identisch gezählt. Die folgende Tabelle stellt die wichtigsten Systeme gegenüber.

| System / Rechtsraum | Startalter bei Geburt | Zeitpunkt des Alterswechsels | Regel am 29. Februar | Typische Abweichung / Anwendung |
| :--- | :--- | :--- | :--- | :--- |
| Internationales Alter (ISO / DACH) | `0 Jahre` | Jährlich am Geburtstag (`00:00 Uhr`) | Gesetzlicher Fristablauf (meist 1. März) | Weltweiter Standard für Ausweise und Medizin |
| Deutsches Zivilrecht (`§ 187/188 BGB`) | `0 Jahre` | Ablauf des Vortags vor Geburtstag | Volljährigkeit am `1. März` (`00:00 Uhr`) | Maßgeblich für Verträge, Rente, Wahlrecht |
| Traditionelles ostasiatisches Alter | `1 Jahr` | Jedes Neujahr (oft Mondkalender) | Kein direkter Einfluss auf Jahreswechsel | `1` bis `2` Jahre höher als das ISO-Alter |
| Südkoreanische Rechtsreform (2023) | `0 Jahre` | Jährlich am Geburtstag (`Man-Nai`) | Wechsel auf internationales System | Löst altes Neujahrsalter im Alltag ab |
| Großbritannien / Neuseeland (29. Feb.) | `0 Jahre` | Geburtstag (`00:00 Uhr`) | UK: `1. März`; Neuseeland: `28. Februar` | Unterschiedliche Führerschein- und Altersgrenzen |
| Astronomisches / Dezimalalter | `0,000 Jahre` | Kontinuierlich pro Sekunde | Exakte Tageszählung inklusive Schalttag | Pädiatrische Wachstumskurven, Demografie |

## Schaltjahr-Dilemma, Rechtsfristen und Zeitzonenfehler

In der juristischen Praxis ist das exakte Alter oft folgenreich – etwa beim Eintritt der Volljährigkeit, bei Altersgrenzen im Rentenrecht oder bei ärztlichen Vorsorgefristen. Für Deutschland regeln `§ 187 Abs. 2 S. 2` und `§ 188 Abs. 2, 3 BGB` die Fristberechnung eindeutig: Bei der Geburt wird der Geburtstag selbst voll mitgezählt. Fällt das Geburtsdatum auf den `29. Februar`, fehlt dieser Tag in Gemeinjahren; nach `§ 188 Abs. 3 BGB` endet die Frist daher mit Ablauf des letzten Monatstages, also am `28. Februar um 24:00 Uhr`. Rechtlich relevante Schwellenwerte wie das `18.` Lebensjahr treten demnach exakt am `1. März um 00:00 Uhr` ein.

Bei der stunden- oder minutengenauen Berechnung schleichen sich darüber hinaus häufig technische Fehler ein:

* **Zeitzonen-Versatz:** Wird ein Mensch beispielsweise um `01:30 Uhr` nachts in Tokio geboren, ist es in Berlin zeitgleich noch der Vortag (`17:30 Uhr` bzw. `18:30 Uhr`). Für offizielle Altersnachweise gilt immer das standesamtliche Ortsdatum der Geburt.
* **Sommerzeitumstellung (`MEZ`/`MESZ`):** Ein Kalenderjahr hat in Mitteleuropa zwar `365` oder `366` Tage, doch enthält der März-Tag der Umstellung nur `23 Stunden` und der Oktober-Tag `25 Stunden`. Exakte Stundenzähler unterscheiden deshalb zwischen reiner Tagesmultiplikation (`× 24 h`) und realen UTC-Zeitstempeln.
* **ISO-8601-Formatierung:** Verwenden Sie für internationale Datenbanken stets das eindeutige Format `JJJJ-MM-TT` (z. B. `1995-08-28`), um Verwechslungen zwischen europäischer (`TT.MM.JJJJ`) und US-amerikanischer Schreibweise (`MM/TT/JJJJ`) auszuschließen.
