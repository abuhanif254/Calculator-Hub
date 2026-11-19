---
title: "Prozentualer Verringerungsrechner"
metaTitle: "Prozentualer Verringerungsrechner: Rabatt & Abnahme in %"
description: "Ermitteln Sie den prozentualen Rückgang, Rabatte, Kosteneinsparungen oder Wertverluste zwischen zwei Zahlen samt schrittweiser Formelerklärung."
metaDescription: "Prozentuale Abnahme und Rabatte einfach berechnen: Mit Formel, Doppelrabatt-Check, Verlust-Erholungs-Tabelle und Rückrechnung auf den Ursprungspreis."
metaKeywords: "prozentualer Verringerungsrechner, prozentuale Abnahme berechnen, Rabatt berechnen Formel, Wertverlust Prozent, Doppelrabatt, Skonto, Kursverlust ausgleichen"
faqs:
  - question: "Warum ergeben 30 % Rabatt plus 20 % Extra-Rabatt nicht insgesamt 50 % Ersparnis?"
    answer: "Der zweite Rabatt wird auf den bereits reduzierten Zwischenpreis angewendet und nicht erneut auf den ursprünglichen Listenpreis. Bei 100 € Startpreis senken 30 % Rabatt den Preis auf 70 €; weitere 20 % auf 70 € ziehen nur noch 14 € ab, sodass 56 € übrig bleiben. Die tatsächliche Gesamtersparnis beträgt somit 44 % statt 50 %."
  - question: "Wie viel Prozent Gewinn brauche ich nach einem Kursverlust von 40 %, um wieder bei null zu stehen?"
    answer: "Nach einem Rückgang um 40 % ist ein anschließender Anstieg um 66,67 % erforderlich, um das Startkapital zurückzugewinnen. Die Formel für den Aufholbedarf lautet: p ÷ (100 − p) × 100, also 40 ÷ 60 × 100 = 66,67 %. Aus 1.000 € werden nach −40 % zunächst 600 €, und 600 € × 1,6667 ergeben wieder 1.000 €."
  - question: "Wie berechne ich den ursprünglichen Listenpreis zurück, wenn nur Endpreis und Rabatt bekannt sind?"
    answer: "Teilen Sie den reduzierten Endpreis durch den Faktor (1 − Rabattsatz ÷ 100). Haben Sie nach 20 % Rabatt genau 80,00 € bezahlt, rechnen Sie 80,00 € ÷ 0,80 = 100,00 € ursprünglicher Preis. Wer stattdessen fälschlicherweise +20 % auf 80,00 € addiert, erhält nur 96,00 € und liegt um 4,00 € daneben."
  - question: "Kann eine prozentuale Abnahme überhaupt größer als 100 % sein?"
    answer: "Bei Preisen, Rabatten, Körpergewicht oder Stromverbrauch markiert 100 % die natürliche Grenze, da diese Größen nicht negativ werden können. Bei wirtschaftlichen Kennzahlen wie Unternehmensgewinn, Zahlungsstrom oder Kontostand ist eine Abnahme über 100 % dagegen möglich: Fällt ein Jahresgewinn von +200.000 € auf −40.000 € Verlust, beträgt der Rückgang 120 %."
  - question: "Spielt die Reihenfolge bei zwei aufeinanderfolgenden prozentualen Rabatten eine Rolle?"
    answer: "Nein, beim reinen prozentualen Mehrfachrabatt bleibt der Endpreis identisch – ganz gleich, welcher Abschlag zuerst abgezogen wird. Da die Multiplikation kommutativ ist, gilt beispielsweise 0,80 × 0,95 = 0,95 × 0,80 = 0,76 (stets 24 % Gesamtersparnis). Nur wenn ein fester Euro-Gutschein mit einem Prozentrabatt kombiniert wird, beeinflusst die Reihenfolge das Ergebnis."
---

## Prozentuale Abnahme, Rabatte und Wertverluste exakt bestimmen

Immer wenn ein Preis fällt, der jährliche Energieverbrauch sinkt, ein Fahrzeug an Wert verliert oder eine Aktie korrigiert, misst die prozentuale Abnahme den relativen Rückgang bezogen auf den ursprünglichen Ausgangswert. Gerade im Handel, beim gewerblichen Einkauf und an der Börse entscheidet das sichere Beherrschen dieser Rechnung darüber, ob vermeintliche Schnäppchen wirklich günstig sind und wie schwer ein Verlust im Depot tatsächlich wiegt.

## Mathematische Formel und verminderter Grundwert

Um den prozentualen Rückgang zwischen einem höheren Ausgangswert und einem niedrigeren Endwert zu berechnen, teilen Sie die absolute Verminderung durch den Ausgangswert:

```text
Prozentuale Abnahme (%) = ((Ausgangswert − Endwert) ÷ Ausgangswert) × 100
```

Die Formel liefert bei einem echten Rückgang eine positive Prozentzahl (beispielsweise `24 %` Rabatt oder `18 %` Einsparung). In der Finanzberichterstattung wird dasselbe Ergebnis häufig als gerichtete prozentuale Veränderung mit Minuszeichen (`−24 %`) ausgewiesen.

Kennen Sie umgekehrt den Ausgangswert und den prozentualen Abschlag `p`, erhalten Sie den neuen Endwert direkt über den **Reduktionsfaktor** – und ebenso die exakte Rückrechnung vom reduzierten Endwert auf die ursprüngliche Basis:

```text
Endwert = Ausgangswert × (1 − p ÷ 100)
Ausgangswert = Endwert ÷ (1 − p ÷ 100)
```

Für zwei hintereinandergeschaltete Prozentrabatte `r1` und `r2` (etwa Saisonrabatt plus Kundenskonto) existiert eine praktische Abkürzungsformel für den effektiven Gesamtrabatt:

```text
Gesamtrabatt (%) = r1 + r2 − (r1 × r2 ÷ 100)
```

## Die Asymmetrie von Verlusten: Warum minus 50 % nicht durch plus 50 % ausgeglichen werden

Ein zentraler Lehrsatz der Finanzmathematik wird im Alltag ständig unterschätzt: Jeder prozentuale Rückgang schrumpft die Berechnungsbasis für die spätere Erholung. Deshalb wächst der prozentuale Aufholbedarf mit steigendem Verlust überproportional stark nach der Formel `Aufholbedarf (%) = (p ÷ (100 − p)) × 100`. Die folgende Tabelle zeigt diese Asymmetrie anhand eines Ausgangswerts von `1.000,00 €`:

| Prozentuale Abnahme | Verbleibender Restwert (Basis 1.000 €) | Nötiger Anstieg bis zum Ausgangswert | Einordnung aus Alltag und Geldanlage |
| :--- | :--- | :--- | :--- |
| **−10 %** | 900,00 € | +11,11 % | Übliche Börsenkorrektur oder kleiner Aktionsrabatt |
| **−20 %** | 800,00 € | +25,00 % | Klassische Bärenmarkt-Schwelle oder Schlussverkauf |
| **−25 %** | 750,00 € | +33,33 % | Typischer Neuwagen-Wertverlust im ersten Betriebsjahr |
| **−40 %** | 600,00 € | +66,67 % | Starker Branchenabschwung oder deutlicher Abverkauf |
| **−50 %** | 500,00 € | +100,00 % | Halbierung des Kurswerts erfordert volle Verdopplung |
| **−75 %** | 250,00 € | +300,00 % | Schwerer Einbruch einzelner Wachstums- oder Kryptowerte |
| **−90 %** | 100,00 € | +900,00 % | Kapitalverzehnffachung nötig, um den Einstiegskurs zu erreichen |

Gerade für Privatanlegerinnen und Privatanleger liefert diese Übersicht eine unmittelbare Handlungsregel: Risikobegrenzung und breite Streuung schützen das Vermögen ungleich stärker als die Jagd nach Spitzenrenditen, weil tiefe Rückschläge mathematisch nur extrem schwer wieder aufzuholen sind.

## Durchgerechnete Praxisbeispiele: Doppelrabatt und Stromersparnis

### Beispiel 1: Saisonrabatt und Treuerabatt beim E-Bike-Kauf
Ein E-Bike kostet regulär `2.800,00 €`. Im Herbstabverkauf senkt der Fachhändler den Preis um `20 %` und gewährt Stammkunden zusätzlich `5 %` auf den reduzierten Verkaufspreis.

1. **Preis nach erstem Rabatt (`−20 %`):** `2.800,00 € × (1 − 0,20) = 2.800,00 € × 0,80 = 2.240,00 €`
2. **Preis nach zweitem Rabatt (`−5 %`):** `2.240,00 € × (1 − 0,05) = 2.240,00 € × 0,95 = 2.128,00 €`
3. **Absolute Ersparnis:** `2.800,00 € − 2.128,00 € = 672,00 €`
4. **Effektive prozentuale Abnahme:** `(672,00 ÷ 2.800,00) × 100 = 24,0 %`

Die Gegenprobe über die Kombinationsformel bestätigt das Ergebnis sofort: `20 + 5 − (20 × 5 ÷ 100) = 25 − 1 = 24,0 %`. Gegenüber einem vermeintlichen 25-%-Rabatt beträgt der Unterschied genau `28,00 €` (`5 %` der bereits abgezogenen `560,00 €`). Auch im gewerblichen Einkauf wirkt ein Skonto von `2 %` bei Zahlung binnen zehn statt dreißig Tagen rechnerisch beachtlich: Auf das Jahr hochgerechnet entspricht dieser kleine Preisnachlass einem effektiven Jahreszins von rund `36 %` – deutlich mehr als übliche Kontokorrentzinsen.

### Beispiel 2: Jährlichen Stromverbrauch spürbar gesenkt
Ein Haushalt verbrauchte im Vorjahr `3.600 kWh` Strom. Nach dem Austausch einer alten Gefriertruhe und einer Hocheffizienz-Heizungspumpe sinkt der Jahresverbrauch auf `2.952 kWh`.

1. **Eingesparte Kilowattstunden:** `3.600 kWh − 2.952 kWh = 648 kWh`
2. **Prozentuale Verbrauchsabnahme:** `(648 ÷ 3.600) × 100 = 18,0 %`

Bei einem Arbeitspreis von `0,35 €` pro Kilowattstunde fallen die jährlichen Stromkosten von `1.260,00 €` auf `1.033,20 €` – eine reale Ersparnis von `226,80 €` pro Jahr, also ebenfalls exakt `18,0 %` bei unverändertem Tarif.

## Vier typische Fallen bei Rabatten, Streichpreisen und Rückrechnungen

- **Streichpreise gegen UVP statt realem Marktpreis:** Viele Online-Händler werben mit hohen Prozentabzügen gegenüber der unverbindlichen Preisempfehlung (UVP) des Herstellers. In Deutschland verpflichtet § 11 der Preisangabenverordnung (PAngV) Händler bei beworbenen Preisermäßigungen dazu, den niedrigsten Gesamtpreis der letzten 30 Tage als Vergleichsbasis auszuweisen. Prüfen Sie bei vermeintlichen „−40 %“-Aktionen stets den tatsächlichen Marktpreisverlauf.
- **Kombination aus Prozentrabatt und Euro-Gutschein:** Während zwei Prozentrabatte beliebig vertauschbar sind, macht die Reihenfolge bei einem festen Gutschein (etwa `50 €`) plus Prozentrabatt (`20 %`) einen echten Unterschied: Wird erst der Prozentrabatt auf `300 €` gewährt (`240 €`) und dann `50 €` abgezogen, zahlen Sie `190 €`. Zieht der Händler den Gutschein zuerst ab (`250 €`) und gibt dann `20 %`, zahlen Sie `200 €` – also `10 €` mehr.
- **Unzulässige Rückrechnung per Aufschlag:** Um nach einem bekannten Rabatt den Ursprungspreis zu ermitteln, darf der Rabattsatz niemals einfach auf den Endpreis addiert werden. Nur die Division durch `(1 − p ÷ 100)` stellt den echten Listenpreis wieder her.
- **Verwechslung von Einmal- und Jahresrückgang:** Fällt der Marktwert einer Maschine über drei Jahre hinweg um insgesamt `30 %`, entspricht das nicht `10 %` pro Jahr auf den jeweiligen Buchwert, sondern einem jährlichen Abschreibungssatz von rund `11,21 %` (`1 − 0,70^(1/3)`).
