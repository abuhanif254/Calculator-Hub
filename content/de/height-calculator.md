---
title: "Größenrechner"
metaTitle: "Größenrechner: cm in Fuß & Zoll und Kindergröße berechnen"
description: "Rechnen Sie Körpergrößen präzise zwischen Zentimetern, Metern sowie Fuß und Zoll um, prüfen Sie Perzentile im DACH-Raum und schätzen Sie die spätere Erwachsenengröße von Kindern."
metaDescription: "Körpergröße exakt von cm in Fuß und Zoll umrechnen, mit DACH-Perzentilen vergleichen und die zu erwartende Kindergröße nach Tanner berechnen."
metaKeywords: "größenrechner, cm in fuß und zoll, körpergröße umrechnen, kindergröße berechnen, tanner formel, größenperzentil deutschland österreich schweiz, fuß in cm"
faqs:
  - question: "Welche Formel verwendet der Größenrechner für die Umrechnung von cm in Fuß und Zoll?"
    answer: "Grundlage ist die international verbindliche Definition aus dem Jahr 1959: 1 Zoll entspricht exakt 2,54 cm und 1 Fuß entspricht genau 12 Zoll beziehungsweise 30,48 cm. Um Zentimeter umzurechnen, teilen Sie den Wert zunächst durch 2,54 für die Gesamtzoll und dividieren das Ergebnis anschließend ganzzahlig durch 12 für den Fuß-Anteil; der Rest ergibt die verbleibenden Zoll."
  - question: "Warum entsprechen 5,5 Fuß nicht 5 Fuß und 5 Zoll?"
    answer: "Weil das angloamerikanische System zwölfteilig (duodezimal) und nicht zehnteilig aufgebaut ist. Ein halber Fuß (0,5 Fuß) entspricht daher genau 6 Zoll, nicht 5 Zoll. Somit sind 5,5 Fuß gleichbedeutend mit 5 Fuß 6 Zoll beziehungsweise 167,64 cm, während 5 Fuß 5 Zoll lediglich 165,10 cm entsprechen."
  - question: "Wie hoch ist die durchschnittliche Körpergröße in Deutschland, Österreich und der Schweiz?"
    answer: "Im DACH-Raum zählen Erwachsene im weltweiten Vergleich zu den überdurchschnittlich großen Bevölkerungen. Junge bis mittelalte Männer erreichen im Schnitt etwa 179 bis 180 cm (Deutschland rund 180,0 cm, Österreich etwa 178,5 cm, Schweiz rund 179,0 cm), Frauen durchschnittlich etwa 165 bis 166 cm. Über alle Altersgruppen hinweg liegen die Gesamtdurchschnitte aufgrund des altersbedingten Größenverlusts leicht darunter."
  - question: "Warum ist die Körpergröße morgens höher als am Abend?"
    answer: "Über den Tag drückt die Schwerkraft Flüssigkeit aus den elastischen Bandscheiben der Wirbelsäule heraus. Dadurch schrumpft ein erwachsener Mensch im Tagesverlauf meist um 1,5 bis 2,0 cm. Während des liegenden Schlafs saugen sich die Bandscheiben wieder voll. Für vergleichbare Messungen sollten Sie stets zur selben Tageszeit messen."
  - question: "Wie genau ist die Kindergrößen-Vorhersage nach der mittleren Elterngröße?"
    answer: "Die Zielgrößenformel nach Tanner liefert eine genetische Orientierung mit einer typischen Schwankungsbreite von plus/minus 8,5 cm (entsprechend etwa zwei Standardabweichungen). Rund 60 bis 80 % der Endgröße sind genetisch bedingt; den Rest beeinflussen Ernährung, Schlaf, Pubertätszeitpunkt und Gesundheit. Für medizinische Wachstumsprognosen nutzt die Kinderheilkunde zusätzlich Röntgenaufnahmen der linken Hand zur Knochenalterbestimmung."
---

## Körpergröße exakt umrechnen, einordnen und prognostizieren

Im gesamten deutschsprachigen Raum (Deutschland, Österreich und Schweiz) bildet das metrische Einheitensystem (SI) mit Metern (`m`), Zentimetern (`cm`) und Millimetern (`mm`) den verbindlichen Maßstab für Personalausweise, Reisepässe, medizinische Vorsorgeuntersuchungen und Konfektionsgrößen. Sobald jedoch internationale Formulare, US-Reiseanträge, Sportausrüstung, Fahrräder oder Größenangaben aus Großbritannien und Nordamerika ins Spiel kommen, begegnen Ihnen Fuß (`ft`) und Zoll (`in`).

Unser **Größenrechner** deckt fünf zentrale Anwendungen in einem Werkzeug ab: die exakte Umrechnung zwischen metrischen und angloamerikanischen Längeneinheiten inklusive Zoll-Bruchdarstellung, die genetische Kindergrößen-Prognose nach Tanner, den direkten Größenvergleich zweier Personen, die statistische Perzentil-Einordnung anhand regionaler Normalverteilungen sowie eine integrierte Einordnung für den Body-Mass-Index (BMI).

## Mathematische Formeln für Umrechnung, Kindergröße und Perzentile

Alle Umrechnungen im Rechner stützen sich auf die seit 1959 weltweit einheitlich festgelegte metrische Definition des internationalen Zolls (`1 Zoll = 2,54 cm` exakt) und des Fußes (`1 Fuß = 12 Zoll = 30,48 cm` exakt):

```text
Zentimeter in Fuß & Zoll:
  Zoll_gesamt = h_cm / 2,54
  Fuß         = abrunden(Zoll_gesamt / 12)
  Restzoll    = Zoll_gesamt - (Fuß * 12)

Fuß & Zoll in Zentimeter:
  h_cm = (Fuß * 12 + Zoll) * 2,54
  h_m  = h_cm / 100
```

Für die Vorhersage der späteren Erwachsenengröße eines Kindes nutzt der Rechner die etablierte **Tanner-Formel der mittleren Elterngröße** (genetische Zielgröße). Dabei gleicht der Korrekturwert von `13 cm` den biologischen mittleren Größenunterschied zwischen Männern und Frauen aus:

```text
Junge:   h_Ziel = (h_Vater + h_Mutter + 13 cm) / 2
Mädchen: h_Ziel = (h_Vater + h_Mutter - 13 cm) / 2
Genetischer Zielkorridor: h_Ziel ± 8,5 cm
```

Zur statistischen Einordnung einer Körpergröße `h` innerhalb einer Vergleichsbevölkerung berechnet der Perzentil-Modus zunächst den standardisierten **z-Wert** aus dem geschlechtsspezifischen Mittelwert `μ` und der Standardabweichung `σ` (beide in Zentimetern):

```text
z = (h - μ) / σ
Perzentil = Φ(z) * 100 %
```

Dabei bezeichnet `Φ(z)` die Verteilungsfunktion der Standardnormalverteilung. Ein Ergebnis im 75. Perzentil bedeutet beispielsweise, dass die eingegebene Körpergröße größer ist als die von 75 Prozent der Vergleichsgruppe gleichen Geschlechts.

## Schritt-für-Schritt-Rechenbeispiele

### Beispiel 1: Umrechnung von 178,5 cm in Fuß und Zoll

Angenommen, Sie möchten eine Körpergröße von **178,5 cm** (`1,785 m`) für ein internationales Sportprofil in Fuß und Zoll umrechnen:

1. **Gesamtzoll ermitteln:** `178,5 cm / 2,54 = 70,2756 Zoll`.
2. **Ganze Fuß bestimmen:** `70,2756 / 12 = 5,8563`, der ganzzahlige Anteil beträgt somit **5 Fuß** (entsprechend `60 Zoll`).
3. **Verbleibende Zoll berechnen:** `70,2756 − 60 = 10,2756 Zoll`, gerundet auf zwei Nachkommastellen **10,28 Zoll**.
4. **Ergebnis:** `178,5 cm` entsprechen **5 Fuß 10,28 Zoll** (Kurzschreibweise `5′ 10,3″` oder handwerksnah `5′ 10 1/4″`).

Im deutschen Männer-Referenzdatensatz (`μ = 180,0 cm`, `σ = 7,1 cm`) ergibt `178,5 cm` einen z-Wert von `(178,5 − 180,0) / 7,1 = −0,21`, was rund dem **42. Perzentil** (`41,6 %`) entspricht und damit sehr nahe am Bevölkerungsdurchschnitt liegt.

### Beispiel 2: Genetische Zielgröße eines Kindes

Ein Vater misst **182,0 cm**, die Mutter **167,0 cm**.

- **Für einen Sohn:** `(182,0 + 167,0 + 13,0) / 2 = 362,0 / 2 = 181,0 cm`. Der statistisch erwartete genetische Zielkorridor liegt zwischen **172,5 cm** und **189,5 cm**.
- **Für eine Tochter:** `(182,0 + 167,0 − 13,0) / 2 = 336,0 / 2 = 168,0 cm`. Der erwartete Korridor reicht von **159,5 cm** bis **176,5 cm**; `168,0 cm` entsprächen in Deutschland etwa dem **62. Perzentil** junger Frauen.

## Referenztabelle: Metrische Umrechnung und regionale Durchschnittsgrößen

Die folgende Übersicht zeigt häufige Körpergrößen zwischen `155 cm` und `195 cm` mit exakten metrischen und angloamerikanischen Entsprechungen:

| Zentimeter | Meter | Gesamtzoll | Fuß & Zoll (dezimal) | Gerundet |
| :--- | :--- | :--- | :--- | :--- |
| 155,0 cm | 1,55 m | 61,0 Zoll | 5 Fuß 1,0 Zoll | 5′ 1″ |
| 165,0 cm | 1,65 m | 65,0 Zoll | 5 Fuß 5,0 Zoll | 5′ 5″ |
| 170,0 cm | 1,70 m | 66,9 Zoll | 5 Fuß 6,9 Zoll | 5′ 7″ |
| 175,0 cm | 1,75 m | 68,9 Zoll | 5 Fuß 8,9 Zoll | 5′ 9″ |
| 180,0 cm | 1,80 m | 70,9 Zoll | 5 Fuß 10,9 Zoll | 5′ 11″ |
| 185,0 cm | 1,85 m | 72,8 Zoll | 6 Fuß 0,8 Zoll | 6′ 1″ |
| 195,0 cm | 1,95 m | 76,8 Zoll | 6 Fuß 4,8 Zoll | 6′ 5″ |

Zum geografischen Vergleich liegen erwachsene Männer im Schnitt in den Niederlanden bei rund `183,8 cm`, in Deutschland bei `180,0 cm`, in der Schweiz bei etwa `179,0 cm`, in Österreich bei rund `178,5 cm`, in den USA bei `175,3 cm` und im weltweiten Mittel bei `171,0 cm`. Bei Frauen betragen die entsprechenden Richtwerte etwa `170,4 cm` (Niederlande), `166,0 cm` (Deutschland), `165,0 bis 166,0 cm` (Österreich und Schweiz), `161,8 cm` (USA) und `159,0 cm` (Weltmittel). Diese regionalen Unterschiede verdeutlichen, warum derselbe Messwert je nach Land in ganz unterschiedlichen Perzentilbereichen liegt und stets im passenden Bevölkerungskontext eingeordnet werden sollte.

## Praxistipps für präzise Messungen und häufige Stolperfallen

- **Korrekte Messhaltung nach Frankfurter Horizontale:** Messen Sie barfuß auf hartem, ebenem Boden. Fersen, Gesäß, Schulterblätter und Hinterkopf berühren leicht die Wand, während der Blick waagerecht nach vorn gerichtet ist. Ein rechtwinkliges Buch oder ein Anschlagwinkel verhindert ein Abkippen des Messstabs.
- **Tageszeit konsequent einhalten:** Durch die Belastung der Wirbelsäule nimmt die Körpergröße zwischen Aufstehen und Schlafengehen um rund `1,5 bis 2,0 cm` ab. Vergleichen Sie Verlaufswerte bei Kindern und Jugendlichen daher immer zur gleichen Tageszeit, idealerweise am Vormittag.
- **Dezimalfuß nicht mit Fuß und Zoll verwechseln:** Eine der häufigsten Umrechnungsfallen entsteht bei Angaben wie `5,8 Fuß`. Das entspricht nicht `5 Fuß 8 Zoll` (`172,72 cm`), sondern `5 Fuß` plus `0,8 mal 12 Zoll`, also `5 Fuß 9,6 Zoll` (`176,78 cm`) – eine Abweichung von gut vier Zentimetern.
- **Altersbedingter Größenverlust und pädiatrische Grenzen:** Ab etwa dem 40. Lebensjahr schrumpfen Menschen im Schnitt um rund einen Zentimeter pro Jahrzehnt durch Wasserverlust der Bandscheiben, Haltungsänderungen und abnehmende Knochendichte. Bei Kindern ersetzt die Tanner-Formel keine kinderärztliche Beurteilung: Starke Abweichungen von der individuellen Wachstumskurve im gelben U-Untersuchungsheft (Deutschland), im Eltern-Kind-Pass (Österreich) oder im Gesundheitsheft (Schweiz) sollten stets medizinisch abgeklärt werden.
