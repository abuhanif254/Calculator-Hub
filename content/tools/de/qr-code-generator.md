---
metaTitle: "QR-Code Generator | Vektor-SVG & PNG mit Logo erstellen"
metaDescription: "Generieren Sie druckfähige QR-Codes als SVG oder PNG mit eigenem Logo, Farben und Fehlerkorrektur (L-H) für URLs, WLAN, vCard und SEPA-EPC."
metaKeywords: "qr code generator, qr code mit logo, vektor svg qr code, reed solomon fehlerkorrektur, wlan qr code erstellen, vcard qr code, sepa epc qr code, iso 18004"
title: "QR Code Generator & Designer"
shortDescription: "Erstellen Sie hochauflösende QR-Codes als verlustfreie Vektor-SVG- oder PNG-Dateien mit eigenem Logo, individuell konfigurierbarer Fehlerkorrektur (L/M/Q/H) und strukturierten Payloads."
faqs:
  - question: "Welches Fehlerkorrektur-Level muss ich wählen, wenn ein Firmenlogo im QR-Code sitzt?"
    answer: "Wählen Sie bei eingebetteten Logos zwingend das Level H (High, ca. 30 % Redundanz). Da der Scanner das zentrierte Logo technisch wie eine beschädigte Fläche behandelt, sollte die Grafik idealerweise höchstens 15 bis 20 % der Netto-Modulfläche abdecken, damit zusätzlich Reserve für Druckungenauigkeiten oder Reflexionen bleibt."
  - question: "Warum ist SVG für Druckprodukte deutlich besser geeignet als PNG?"
    answer: "Eine SVG-Datei beschreibt die einzelnen Module als exakte mathematische Vektorpfade. Dadurch lässt sich der QR-Code von der Visitenkarte bis zum Messebanner verlustfrei skalieren, ohne dass durch Interpolation oder Antialiasing unscharfe Kanten entstehen, die die Scan-Zuverlässigkeit beeinträchtigen."
  - question: "Was ist die Quiet Zone und warum schlägt der Scan ohne sie fehl?"
    answer: "Die Quiet Zone (Ruhezone) ist ein durchgehend heller, unbedruckter Rahmen um das gesamte QR-Muster mit einer Mindestbreite von vier Modulen pro Seite gemäß ISO/IEC 18004. Fehlt dieser Abstand, können Kamera-Scanner die drei großen Positionsmarkierungen (Finder Patterns) nicht eindeutig vom umgebenden Layout trennen."
  - question: "Werden meine WLAN-Passwörter oder vCard-Kontaktdaten an einen Server gesendet?"
    answer: "Nein. Die gesamte Codierung der Matrix, die Reed-Solomon-Berechnung und das Rendern der SVG- oder PNG-Grafik laufen zu 100 % lokal (clientseitig) in Ihrem Browser ab. Sensible Zugangsdaten, Kundenkontakte oder Zahlungsdaten verlassen Ihr Endgerät zu keinem Zeitpunkt."
  - question: "Wie erstelle ich einen fehlerfreien WLAN-QR-Code bei Passwörtern mit Sonderzeichen?"
    answer: "In der WLAN-Payload-Syntax (WIFI:T:WPA;S:Netzname;P:Passwort;;) müssen die reservierten Trennzeichen Semikolon (;), Doppelpunkt (:), Komma (,) und Backslash (\\) jeweils mit einem vorangestellten Backslash maskiert werden. Unser Generator übernimmt dieses Escaping automatisch."
features:
  - "ISO/IEC-18004-konforme Generierung mit frei wählbarer Reed-Solomon-Fehlerkorrektur (Level L, M, Q, H)"
  - "Strukturierte Payload-Vorlagen für URLs, WLAN (WPA/WPA2/WPA3), vCard-Kontakte, E-Mail, SMS, Geo-Koordinaten und Zahlungsdaten"
  - "Verlustfreier Vektor-Export als SVG sowie hochauflösender Raster-Export als PNG mit optionaler Transparenz"
  - "Zentrierte Logo-Integration mit automatischem Freistellbereich und Echtzeit-Vorschau der Modulgeometrie"
  - "Individuelle Gestaltung von Vordergrund-, Hintergrund- und Augenfarben (Finder Patterns) inklusive Kontrastkontrolle"
  - "100 % clientseitige Verarbeitung ohne Server-Übertragung für maximale Datensicherheit"
useCases:
  - "Erstellung druckfertiger Vektor-QR-Codes für Flyer, Produktverpackungen, Plakate und Visitenkarten"
  - "Bereitstellung von Scan-to-Connect-WLAN-Zugängen in Hotels, Konferenzräumen, Praxen und Gastronomiebetrieben"
  - "Kontaktloser Austausch von Kontaktdaten über standardisierte vCard-QR-Codes auf Messen und Ausweisen"
  - "Generierung von GiroCode- bzw. EPC-QR-Codes für fehlerfreie SEPA-Überweisungen auf Rechnungen"
  - "Kennzeichnung von Maschinen, IT-Inventar und Ersatzteilen mit robusten Level-H-Codes für raue Umgebungen"
  - "Verknüpfung von Print-Kampagnen mit getaggten Web-Landingpages und digitalen Bedienungsanleitungen"
howToSteps:
  - "Wählen Sie den benötigten Datentyp (z. B. URL, WLAN, vCard oder Freitext) und geben Sie die Nutzdaten vollständig ein."
  - "Legen Sie das Fehlerkorrektur-Level fest: M für Standardanwendungen, Q oder H bei Logos und schwierigen Druckoberflächen."
  - "Passen Sie Farben, Modulstil und Ecken-Design an und achten Sie auf einen starken Hell-Dunkel-Kontrast."
  - "Laden Sie bei Bedarf Ihr Logo hoch und begrenzen Sie dessen Größe, sodass ausreichend Datenmodule unbedeckt bleiben."
  - "Prüfen Sie den generierten Code direkt mit mindestens zwei Smartphone-Kameras (iOS und Android) auf dem Bildschirm."
  - "Exportieren Sie das Ergebnis als skalierbare SVG-Datei für Druckereien oder als PNG-Datei für Web und Präsentationen."
---

Ein **QR-Code (Quick Response Code)** ist weit mehr als ein grafisches Schachbrettmuster: Hinter der zweidimensionalen Matrix verbirgt sich die internationale Norm **ISO/IEC 18004**, die präzise Vorgaben für Binärkodierung, Fehlerkorrektur, geometrische Entzerrung und optische Lesbarkeit definiert. Während klassische eindimensionale Strichcodes (EAN-13 oder Code 128) Daten ausschließlich horizontal abbilden und auf wenige Dutzend Zeichen begrenzt bleiben, speichert ein QR-Code Informationen in beiden Achsen. Richtig konfiguriert lassen sich damit nicht nur kompakte Web-Links, sondern auch strukturierte WLAN-Zugangsdaten, digitale Visitenkarten (vCard) und im DACH-Raum weit verbreitete SEPA-Überweisungen (EPC-QR / GiroCode) sekundenschnell und ohne Tippfehler einlesen.

## Matrix-Architektur und Kodierungsmodi gemäß ISO/IEC 18004

Die physische Komplexität eines QR-Codes wird durch seine **Version** von 1 bis 40 festgelegt. Version 1 besteht aus einer Matrix von `21 × 21` einzelnen Quadraten (Modulen); jede weitere Stufe vergrößert Breite und Höhe um exakt vier Module gemäß der Formel `17 + 4 × Version`. Die maximale Version 40 umfasst somit `177 × 177` Module und fasst bis zu 7.089 rein numerische Ziffern oder 2.953 Byte im UTF-8-Binärmodus.

Wie effizient die verfügbare Matrix ausgenutzt wird, hängt vom gewählten **Kodierungsmodus** ab: Im numerischen Modus verbrauchen drei Ziffern lediglich 10 Bit (3,33 Bit pro Zeichen), im alphanumerischen Modus (Großbuchstaben, Ziffern und neun ausgewählte Zeichen wie `$`, `%`, `/`, `:`) teilen sich zwei Zeichen 11 Bit (5,5 Bit pro Zeichen). Sobald Kleinbuchstaben, deutsche Umlaute oder Sonderzeichen enthalten sind, wechselt der Encoder in den **Byte-Modus** mit 8 Bit pro UTF-8-Byte. Daher erzeugt eine Domain in Großbuchstaben ohne lange Tracking-Parameter oft eine deutlich kompaktere und leichter scanbare Matrix.

Damit jede Smartphone-Kamera den Code in beliebiger Drehung (360°) und bei schrägem Aufnahmewinkel sicher dekodiert, reserviert die Norm unveränderliche Funktionsmuster:

* **Positionsmarkierungen (Finder Patterns):** Drei `7 × 7`-Quadrate in den Ecken oben links, oben rechts und unten links, jeweils eingefasst von einem ein Modul breiten hellen Trennrand (Separator). Ihr charakteristisches Hell-Dunkel-Verhältnis von `1:1:3:1:1` erlaubt eine eindeutige Detektion in Echtzeit.
* **Timing Patterns:** Abwechselnd dunkle und helle Module auf Zeile 6 und Spalte 6, aus denen der Scanner das exakte Modulraster berechnet.
* **Ausrichtungsmuster (Alignment Patterns):** Ab Version 2 eingebettete `5 × 5`-Hilfsquadrate, die leichte Krümmungen auf Flaschen, Verpackungen oder gefalteten Prospekten ausgleichen.
* **Format- und Versionsinformationen:** Direkt an die Finder Patterns angrenzende, per BCH(15,5)-Code doppelt geschützte Metadaten-Bits für Fehlerkorrektur-Level und Datenmaske.
* **Datenmaskierung (Masken 0–7):** Der Encoder testet acht definierte Bit-Masken und wählt die Variante mit dem geringsten Penalty-Score, um großflächige einfarbige Blöcke oder versehentliche Schein-Markierungen zu unterdrücken.

## Reed-Solomon-Fehlerkorrektur und Logo-Integration

Die hohe Ausfallsicherheit verdankt der QR-Code der **Reed-Solomon-Fehlerkorrektur** über dem Galois-Feld `GF(2^8)` mit dem Generatorpolynom `x^8 + x^4 + x^3 + x^2 + 1`. Die Nutzdaten werden in 8-Bit-Codewörter zerlegt, blockweise um Paritäts-Codewörter erweitert und durch **Interleaving** über die gesamte Fläche verteilt. Dadurch bleiben selbst zusammenhängende Bündelfehler – etwa Kratzer, Knicke oder ein zentral platziertes Firmenlogo – vollständig korrigierbar.

| Fehlerkorrektur-Level | Wiederherstellbare Codewörter | Max. Datenkapazität (Byte, V10 / V40) | Eignung für Logos | Typischer Einsatzbereich |
| :--- | :--- | :--- | :--- | :--- |
| **L (Low)** | ca. 7 % | 271 / 2.953 Byte | Nicht geeignet | Saubere Bildschirme, kurze URLs mit minimaler Moduldichte |
| **M (Medium)** | ca. 15 % | 213 / 2.331 Byte | Eingeschränkt (< 8 % Fläche) | Standard für Flyer, Broschüren, Rechnungen und Tickets |
| **Q (Quartile)** | ca. 25 % | 151 / 1.663 Byte | Gut geeignet (< 15 % Fläche) | Produktverpackungen, Plakate, Lager- und Versandetiketten |
| **H (High)** | ca. 30 % | 119 / 1.273 Byte | Optimal (bis ca. 20 % Fläche) | Marken-QR-Codes mit Logo, Außenwerbung, Typenschilder |

Da höhere Korrekturstufen mehr Redundanz-Module erzeugen, steigt bei langen URLs mit zahlreichen UTM-Parametern die QR-Version stark an. Halten Sie Zieladressen daher möglichst kurz, kodieren Sie Sonderzeichen sauber mit dem [URL-Encoder](/de/werkzeuge/url-encoder) und nutzen Sie für komplexe Markenlayouts ergänzend das [QR-Code-Studio](/de/werkzeuge/qr-code-studio).

## Standardisierte Payload-Formate im Praxis-Einsatz

Native Kamera-Apps unter iOS und Android erkennen anhand standardisierter Präfixe sofort den passenden Systemdialog. Die folgenden drei Strukturen sind im DACH-Alltag besonders relevant:

```text
# 1. WLAN-Zugang (WPA/WPA2/WPA3, versteckte SSID = false)
WIFI:T:WPA;S:Buero_Gastnetz;P:Sicheres\;Passwort\:2026;H:false;;

# 2. Digitale Visitenkarte (vCard 3.0)
BEGIN:VCARD
VERSION:3.0
N:Musterfrau;Erika;;;
FN:Erika Musterfrau
ORG:Beispiel GmbH
TEL;TYPE=WORK,VOICE:+493012345678
EMAIL:erika.musterfrau@beispiel.de
URL:https://beispiel.de
END:VCARD

# 3. SEPA-Überweisung nach EPC-Standard (GiroCode)
BCD
002
1
SCT
COBADEFFXXX
Beispiel GmbH
DE89370400440532013000
EUR149.90

RE-2026-0412
```

Beachten Sie beim WLAN-Schema zwingend das Escaping reservierter Trennzeichen (`;`, `:`, `,`, `\`) mittels Backslash. Für rechnungsfähige EPC-QR-Codes schreibt der European Payments Council verbindlich UTF-8 (`1` in Zeile 3), Fehlerkorrektur-Level `M` und maximal Version 13 vor.

## Druckvorstufe, SVG-Vektorqualität und Fehlerdiagnose

In der Praxis scheitern gedruckte QR-Codes fast nie am Datenteil, sondern an vermeidbaren Satz- und Produktionsfehlern:

1. **Vermeidung von Subpixel-Haarrissen im SVG:** Einzelne `<rect>`-Elemente zeigen in manchen RIP-Workflows oder PDF-Viewern hauchdünne weiße Linien durch Antialiasing. Bereinigen Sie Vektordaten mit dem [SVG-Optimizer](/de/werkzeuge/svg-optimizer) oder exportieren Sie exakte Rastergrößen über den [SVG-zu-PNG-Konverter](/de/werkzeuge/svg-to-png).
2. **Kontrast, Farbmodell und Polarität:** Dunkle Module gehören stets auf einen hellen Hintergrund; invertierte Codes (hell auf dunkel) überfordern viele ältere Lesegeräte und Kassen-Scanner. Validieren Sie Markenfarben vorab mit dem [Kontrast-Prüfer](/de/werkzeuge/contrast-checker) und legen Sie im Vierfarb-Offsetdruck reines Schwarz (`C0 M0 Y0 K100`) ohne Mischfarben an, um Passerungenauigkeiten auszuschließen.
3. **Quiet Zone und Mindestgröße:** Die vier Module breite Ruhezone darf niemals beschnitten oder von farbigen Layout-Elementen überlagert werden. Orientieren Sie sich für die physische Druckgröße am Verhältnis **1:10 zur Scan-Distanz**: Ein Plakat für zwei Meter Leseabstand erfordert mindestens `20 × 20 cm`, während auf Visitenkarten und Etiketten `2 × 2 cm` bei niedriger QR-Version nicht unterschritten werden sollten.

### Statische vs. dynamische QR-Codes in der Praxis

Unser Generator erzeugt **statische QR-Codes**, bei denen sämtliche Nutzdaten unmittelbar und unveränderlich in der Modulmatrix kodiert sind. Der große Vorteil für Unternehmen und Behörden liegt in der dauerhaften Unabhängigkeit: Es fallen keine wiederkehrenden Abo-Gebühren an, es existiert kein externer Dienst als Ausfallrisiko und die Codes funktionieren selbst nach Jahren zuverlässig ohne Tracking-Weiterleitung. Benötigen Sie für Kampagnen dennoch nachträglich änderbare Zieladressen und eine besonders geringe Moduldichte (etwa Version 2 oder 3), richten Sie einfach eine dauerhafte Kurz-URL auf Ihrer eigenen Domain per HTTP-301/302-Weiterleitung ein und kodieren diese statisch im QR-Code.
