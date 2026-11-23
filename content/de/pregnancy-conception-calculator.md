---
title: "Empfängnisrechner"
metaTitle: "Empfängnisrechner: Zeugungsdatum & fruchtbare Tage prüfen"
description: "Ermitteln Sie das wahrscheinliche Befruchtungsdatum und das fruchtbare Zeitfenster rückwirkend aus dem errechneten Geburtstermin (ET), der letzten Periode oder einem Ultraschallbefund."
metaDescription: "Kostenloser Empfängnisrechner: Bestimmen Sie Zeugungsdatum und fruchtbares Fenster aus Geburtstermin (ET), letzter Periode oder Ultraschall-SSW."
metaKeywords: "empfängnisrechner, zeugungsdatum berechnen, wann wurde ich schwanger, befruchtungsdatum rechner, fruchtbares fenster, naegele regel, gestationsalter, ultraschall ssl"
faqs:
  - question: "Was ist der Unterschied zwischen Gestationsalter (SSW) und tatsächlichem Embryonalalter?"
    answer: "In der Frauenheilkunde im DACH-Raum wird das Gestationsalter ab dem ersten Tag der letzten Regelblutung gezählt, sodass eine normale Schwangerschaft rechnerisch 40 Wochen (280 Tage) dauert. Da der Eisprung und die Befruchtung erst rund zwei Wochen später stattfinden, ist das tatsächliche Embryonal- bzw. Fetalalter immer 14 Tage jünger als die im Mutterpass angegebene Schwangerschaftswoche."
  - question: "Ist das errechnete Befruchtungsdatum automatisch der Tag des Geschlechtsverkehrs?"
    answer: "Nein, beide Tage fallen oft auseinander. Reife Spermien können im fruchtbaren Zervixschleim und in den Eileitern bis zu fünf Tage befruchtungsfähig überleben, während die Eizelle nach dem Eisprung nur etwa 12 bis 24 Stunden befruchtbar bleibt. Der Empfängnisrechner weist daher zusätzlich ein fruchtbares Fenster von fünf Tagen vor bis zu einem Tag nach dem errechneten Befruchtungstag aus."
  - question: "Warum ist ein Ersttrimester-Ultraschall genauer als die Rechnung ab der letzten Periode?"
    answer: "Die Berechnung nach der letzten Regelblutung setzt einen regelmäßigen Eisprung 14 Tage vor der nächsten Periode voraus und wird bei Zyklusschwankungen oder spätem Eisprung schnell ungenau. Zwischen der 8. und 12. Schwangerschaftswoche wachsen nahezu alle Embryonen biologisch nahezu gleich schnell, sodass die Messung der Scheitel-Steiß-Länge (SSL) das Alter meist auf drei bis fünf Tage genau bestimmt."
  - question: "Wie berücksichtigt der Rechner kürzere oder längere Menstruationszyklen?"
    answer: "Bei der Eingabe nach letzter Periode unterstützt der Rechner Zykluslängen zwischen 20 und 45 Tagen. Da die zweite Zyklushälfte (Lutealphase) nach dem Eisprung im Regelfall relativ stabil etwa 14 Tage dauert, verschiebt jede Abweichung vom 28-Tage-Standardzyklus das wahrscheinliche Befruchtungsdatum entsprechend nach vorn oder nach hinten."
  - question: "Ab wann ist nach der Befruchtung ein Schwangerschaftstest zuverlässig positiv?"
    answer: "Nach der Verschmelzung von Ei- und Samenzelle im Eileiter dauert es etwa sechs bis zehn Tage, bis sich die Blastozyste in die Gebärmutterschleimhaut einnistet (Nidation). Erst danach bildet die frühe Plazenta messbare Mengen des Hormons hCG, weshalb Urin-Frühtests frühestens 10 bis 12 Tage und reguläre Tests rund 14 Tage nach der Empfängnis verlässlich anschlagen."
---

## Den Zeitpunkt der Befruchtung medizinisch rückrechnen

Wer gerade einen positiven Schwangerschaftstest in den Händen hält oder Einträge im deutschen Mutterpass, im österreichischen Eltern-Kind-Pass oder in den Schweizer Vorsorgeunterlagen nachvollziehen möchte, fragt sich oft sofort: **Wann genau hat die Befruchtung stattgefunden?** Während klassische Schwangerschaftsrechner vorwärts zählen, um den voraussichtlichen Entbindungstermin (ET) zu bestimmen, kehrt der **Empfängnisrechner** diese geburtshilfliche Zeitachse um. Er schließt aus bekannten medizinischen Eckdaten auf den wahrscheinlichsten Tag der Konzeption und grenzt zugleich das fruchtbare Zeitfenster ein, in dem Geschlechtsverkehr zur Schwangerschaft geführt haben kann.

Die Datierung stützt sich auf drei bewährte Ausgangsgrößen: den ärztlich festgelegten **Geburtstermin (ET)**, einen **Ultraschallbefund** mit Angabe der Schwangerschaftswoche (`SSW`, notiert als Wochen plus Tage wie `9+3`) oder den **ersten Tag der letzten Regelblutung** samt individueller Zykluslänge. Entscheidend für jede Rückrechnung ist die medizinische Konvention der zwei rechnerischen Vorlaufwochen: Ab Zyklusbeginn dauert eine Schwangerschaft rechnerisch **280 Tage** (40 Wochen), ab der eigentlichen Befruchtung im Mittel jedoch **266 Tage** (38 Wochen).

## Die Berechnungsformeln der drei Methoden im Detail

Alle Kalenderrechnungen erfolgen tagesgenau auf SI-Basis (`1 Tag = 86.400 Sekunden`). Je nach gewählter Methode wendet der Rechner eine der folgenden Gleichungen an:

```text
1. Rückrechnung aus dem errechneten Geburtstermin (ET):
   T_Befruchtung = T_ET − 266 Tage

2. Berechnung nach letzter Periode (T_LP) und Zykluslänge (Z):
   T_Befruchtung = T_LP + 14 + (Z − 28) Tage  =  T_LP + Z − 14 Tage
   T_ET          = T_Befruchtung + 266 Tage   (20 ≤ Z ≤ 45 Tage; Standard: 28)

3. Rückrechnung aus einem Ultraschallbefund am Untersuchungstag (T_US):
   d_Gestation   = 7 × W + T                  (0 ≤ W ≤ 42; 0 ≤ T ≤ 6)
   T_Befruchtung = T_US − d_Gestation + 14 Tage
   T_ET          = T_Befruchtung + 266 Tage

4. Fruchtbares Fenster für den auslösenden Geschlechtsverkehr:
   T_Start = T_Befruchtung − 5 Tage   |   T_Ende = T_Befruchtung + 1 Tag
```

**Bedeutung der Variablen:**
- **`T_Befruchtung`** bezeichnet den wahrscheinlichsten Kalendertag des Eisprungs und der Befruchtung (`Tag 0`).
- **`T_ET`** ist der errechnete Entbindungstermin (maßgeblich etwa für die Mutterschutzfrist von sechs Wochen vor ET in Deutschland bzw. acht Wochen in Österreich).
- **`T_LP`** steht für den ersten Blutungstag der letzten regulären Menstruation; **`Z`** ist die persönliche Zykluslänge in Tagen nach der erweiterten Naegele-Regel.
- **`T_US`**, **`W`** und **`T`** beschreiben das Ultraschalldatum sowie das gemessene Gestationsalter in vollen Wochen und Tagen.
- **`T_Start`** bis **`T_Ende`** bilden den siebentägigen Kalenderkorridor (`−5` bis `+1` Tag), der die Spermienüberlebenszeit und die Befruchtungsfähigkeit der Eizelle abdeckt.

## Schritt-für-Schritt-Rechenbeispiel

Betrachten wir eine typische gynäkologische Erstuntersuchung: Beim Ultraschall am **14. Mai 2026** ergibt die Messung der Scheitel-Steiß-Länge (SSL) ein Gestationsalter von **9+3 SSW** (9 Wochen und 3 Tage).

1. **Gestationsalter in Tagen berechnen:** `d_Gestation = 9 × 7 + 3 = 66 Tage`.
2. **Äquivalenten Beginn der letzten Periode ermitteln:** `14. Mai 2026 − 66 Tage = 9. März 2026`.
3. **Embryonalalter und Befruchtungstag bestimmen:** Nach Abzug der 14 Tage vor dem Eisprung beträgt das tatsächliche Embryonalalter `66 − 14 = 52 Tage` (7 Wochen und 3 Tage). Daraus ergibt sich als wahrscheinliches Befruchtungsdatum der **23. März 2026** (`9. März + 14 Tage`).
4. **Fruchtbares Fenster eingrenzen:**
   - Beginn (`−5 Tage`): **18. März 2026**
   - Ende (`+1 Tag`): **24. März 2026**
   Geschlechtsverkehr zwischen dem **18. und 24. März 2026** hat biologisch die höchste Wahrscheinlichkeit.
5. **Errechneten Geburtstermin ableiten:** `23. März 2026 + 266 Tage = 14. Dezember 2026`.

**Gegenprobe nach letzter Periode:** Bei einer letzten Regelblutung am **1. März 2026** und einer Zykluslänge von **32 Tagen** verschiebt sich der Eisprung um `32 − 28 = +4 Tage` auf den **19. März 2026** (fruchtbares Fenster: **14. bis 20. März 2026**; ET: **10. Dezember 2026**). Weicht der Ultraschall-ET im ersten Trimester um mehr als sieben Tage vom Menstruations-ET ab, wird der Termin im Mutterpass in der Regel anhand der SSL-Messung angepasst.

## Vergleich der Datierungsmethoden und Genauigkeit

Die folgende Übersicht zeigt, wie verlässlich sich der Zeugungszeitraum je nach verfügbarer Datengrundlage eingrenzen lässt:

|Datierungsgrundlage|Rechnerische Basis|Typische Genauigkeit|Besonders geeignet bei|Häufige Fehlerquellen|
|:---|:---|:---|:---|:---|
|**Ersttrimester-Ultraschall (8.–12. SSW)**|Scheitel-Steiß-Länge (SSL)|±3 bis 5 Tage|Unregelmäßigen Zyklen, unklarer Periode|Messwinkel, ungünstige Kindslage|
|**Errechneter Geburtstermin (ET)**|`ET − 266 Tage`|Abhängig von der ET-Quelle|Ärztlich geprüftem ET im Mutterpass|Unkorrigierter ET bei langem Zyklus|
|**Letzte Periode + Zykluslänge**|`T_LP + Z − 14 Tage`|±5 bis 7 Tage|Stabilen Zyklen ohne Hormonwirkung|Verspäteter Eisprung durch Stress|
|**Ultraschall ab 2. Trimester (ab 14. SSW)**|Kopf- und Femurmaße|±7 bis 14 Tage|Später Erstdiagnose|Individuelle Wachstumsstreuung|
|**Kinderwunschbehandlung (IVF/ICSI)**|Punktionstag / Embryotransfer|±1 Tag|Reproduktionsmedizin|Verwechslung von Transfer- und Befruchtungstag|

## Typische Stolperfallen und Praxistipps

- **Einnistungsblutung nicht mit der Periode verwechseln:** Eine leichte Schmierblutung tritt häufig sechs bis zwölf Tage nach der Befruchtung auf und wird mitunter als schwache Menstruation fehlgedeutet. Das verschiebt das berechnete Zeugungsdatum um fast vier Wochen. Für die Periodenmethode zählt stets nur die letzte normal starke Regelblutung.
- **Individuelle Länge der Lutealphase beachten:** Die Formel `Z − 14` geht von einer vierzehntägigen Gelbkörperphase aus. Biologisch schwankt diese zwischen 11 und 16 Tagen, weshalb der Eisprung selbst im 28-Tage-Zyklus gelegentlich erst an Zyklustag 16 statt an Tag 14 stattfindet.
- **Verzögerter Eisprung nach hormoneller Verhütung:** In den ersten Zyklen nach Absetzen der Pille, der Hormonspirale oder während der Stillzeit verschiebt sich der Eisprung oft deutlich nach hinten. Verlassen Sie sich dann vorrangig auf die frühe SSL-Messung beim Frauenarzt.
- **Grenzen bei Vaterschaftsfragen:** Kommen innerhalb des siebentägigen fruchtbaren Fensters mehrere Partner in Betracht, lässt sich die Vaterschaft rechnerisch nicht zweifelsfrei klären. Wegen der biologischen Streuung von Ultraschallwerten und Spermienüberlebenszeit liefert ausschließlich ein akkreditierter DNA-Test nach dem Gendiagnostikgesetz verlässliche Sicherheit.
