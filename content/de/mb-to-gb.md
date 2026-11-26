---
title: "MB in GB Umrechner: Megabyte in Gigabyte (SI & IEC)"
description: "Rechnen Sie Megabyte (MB) präzise in Gigabyte (GB) um – nach SI-Standard (÷ 1.000) und binärem IEC-System (÷ 1.024) inklusive Formeln, Tabelle und Beispielen."
faqs:
  - question: "Wie viele Megabyte (MB) entsprechen exakt einem Gigabyte (GB)?"
    answer: "Nach dem internationalen Dezimalsystem (SI) entspricht 1 Gigabyte exakt 1.000 Megabyte (Faktor 10³). Im binären IEC-System hingegen entspricht 1 Gibibyte (GiB) genau 1.024 Mebibyte (MiB, Faktor 2¹⁰)."
  - question: "Warum zeigt Windows bei einer 500-GB-SSD weniger freien Speicherplatz an?"
    answer: "Speichermedien-Hersteller geben Kapazitäten im dezimalen SI-Standard an (500 GB = 500.000.000.000 Byte). Betriebssysteme wie Windows rechnen intern binär mit Faktor 1.024 und zeigen diesen Wert als GB statt GiB an, wodurch rund 465,66 GiB erscheinen."
  - question: "Welches System gilt bei Mobilfunk-Datentarifen im DACH-Raum?"
    answer: "Mobilfunkanbieter in Deutschland, Österreich und der Schweiz rechnen Datenvolumen nach dem dezimalen SI-Standard ab. Ein Tarif mit 10 GB umfasst somit exakt 10.000 MB."
  - question: "Wann muss ich durch 1.024 statt durch 1.000 teilen?"
    answer: "Den Divisor 1.024 verwenden Sie immer dann, wenn Sie binäre Speichergrößen wie Arbeitsspeicher (RAM), Prozessor-Caches oder Dateigrößen-Anzeigen unter Windows in Gibibyte (GiB) umrechnen möchten."
  - question: "Sind 1.000 MB dasselbe wie 1 GiB?"
    answer: "Nein. 1.000 MB entsprechen exakt 1 GB (10⁹ Byte), während 1 GiB genau 1.073.741.824 Byte umfasst. Umgerechnet in binäre Gibibyte ergeben 1.000 MB lediglich rund 0,9313 GiB."
---

Um Megabyte (MB) korrekt in Gigabyte (GB) umzurechnen, teilen Sie den Ausgangswert nach dem internationalen Dezimalsystem (SI) exakt durch **1.000** (`GB = MB ÷ 1.000`). Ein Speichervolumen von 2.500 MB entspricht somit genau 2,5 GB. Dieses dezimale Verhältnis gilt verbindlich für Festplatten, SSDs, USB-Sticks und Mobilfunk-Datentarife im gesamten DACH-Raum.

Wenn Sie hingegen binäre Speichergrößen auf Betriebssystem- oder Arbeitsspeicher-Ebene (RAM) auswerten, greift der binäre Faktor **1.024** gemäß der IEC-Norm (`GiB = MiB ÷ 1.024`). Dabei entsprechen 1.024 Mebibyte (MiB) exakt einem Gibibyte (GiB). Die präzise Unterscheidung beider Konstanten verhindert Planungsfehler bei Server-Infrastrukturen, Cloud-Kontingenten und Hardware-Käufen.

## Exakte Umrechnungsformeln und internationale Standards

Die Grundlage für die Umrechnung digitaler Speichereinheiten bildet die Abgrenzung zwischen dem Internationalen Einheitensystem (SI) und den binären Präfixen der Internationalen Elektrotechnischen Kommission (IEC). Während die SI-Konvention auf Zehnerpotenzen basiert, orientiert sich die Hardware-Adressierung in der Informatik an Zweierpotenzen, da digitale Schaltkreise ausschließlich binäre Zustände verarbeiten.

Im Jahr 1998 führte die IEC in der Norm **IEC 60027-2** (später überführt in **ISO/IEC 80000-13**) eindeutige Binärpräfixe ein, um Verwechslungen auszuschließen. Auch das US-amerikanische National Institute of Standards and Technology (NIST) sowie das deutsche Bundesamt für Sicherheit in der Informationstechnik und die Physikalisch-Technische Bundesanstalt (PTB) stützen diese Trennung:

* **Dezimales SI-System (Festplatten, SSDs, Netzwerke):** `GB = MB ÷ 1.000` (da `1 GB = 10⁹ Byte` und `1 MB = 10⁶ Byte`).
* **Binäres IEC-System (RAM, Dateisysteme, Kernel-Speicher):** `GiB = MiB ÷ 1.024` (da `1 GiB = 2³⁰ Byte = 1.073.741.824 Byte` und `1 MiB = 2²⁰ Byte = 1.048.576 Byte`).
* **Kreuzumrechnung von dezimalen MB in binäre GiB:** `GiB = (MB × 1.000.000) ÷ 1.073.741.824` beziehungsweise vereinfacht `GiB ≈ MB ÷ 1.073,7418`.

## Schritt-für-Schritt-Beispiele aus der Praxis

Die folgenden drei Szenarien zeigen die exakte Berechnung sowohl im dezimalen SI-Standard als auch im binären IEC-System sowie beim direkten Vergleich zwischen Herstellerangabe und Betriebssystem.

### Beispiel 1: Cloud-Backup und Mobilfunk-Datenvolumen (SI-Standard)
Sie möchten ein Fotoarchiv mit einer Gesamtgröße von **4.850 MB** über eine mobile Datenverbindung in einen Cloud-Speicher hochladen und prüfen, wie stark Ihr monatliches Gigabyte-Kontingent belastet wird. Da Mobilfunkprovider und Cloud-Anbieter nach dem SI-Standard abrechnen, teilen Sie den Wert durch 1.000:
* Formel: `GB = MB ÷ 1.000`
* Berechnung: `4.850 ÷ 1.000 = 4,85`
* Ergebnis: Das Backup verbraucht exakt **4,85 GB** Ihres Datenvolumens.

### Beispiel 2: Arbeitsspeicher-Auslastung auf einem Linux-Server (IEC-Standard)
Ein Monitoring-Werkzeug meldet für eine Datenbank-Instanz einen belegten Arbeitsspeicher von **16.384 MiB**. Sie möchten diesen Wert in Gibibyte (GiB) umrechnen, um die benötigte RAM-Ausstattung des physischen Servers zu überprüfen:
* Formel: `GiB = MiB ÷ 1.024`
* Berechnung: `16.384 ÷ 1.024 = 16`
* Ergebnis: Die Datenbank belegt exakt **16 GiB** Arbeitsspeicher.

### Beispiel 3: Reale Kapazität einer 1-TB-NVMe-SSD unter Windows
Sie kaufen eine neue NVMe-SSD, die laut Hersteller über eine Speicherkapazität von **1.000.000 MB** (1.000 GB bzw. 1 TB nach SI) verfügt. Nach dem Formatieren zeigt der Windows-Explorer jedoch einen deutlich geringeren Wert an, weil Windows die Byte-Zahl durch `1.024³` teilt:
* Schritt 1 (Bytes ermitteln): `1.000.000 MB × 1.000.000 = 1.000.000.000.000 Byte`
* Schritt 2 (Umrechnung in GiB): `1.000.000.000.000 ÷ 1.073.741.824 = 931,32257...`
* Ergebnis: Unter Windows stehen Ihnen rechnerisch rund **931,32 GiB** nutzbarer Speicherplatz zur Verfügung, obwohl die SSD technisch exakt 1.000 GB umfasst.

## Schnelle Referenz-Umrechnungstabelle (MB in GB & MiB in GiB)

Die folgende Übersicht stellt häufig gesuchte Speicherwerte im dezimalen SI-System und im binären IEC-System gegenüber und ordnet sie typischen Anwendungsfällen zu.

| Ausgangswert | Dezimal (SI: ÷ 1.000) | Binär (IEC: ÷ 1.024) | Typischer Praxiskontext |
| :--- | :--- | :--- | :--- |
| 100 MB / MiB | 0,1 GB | 0,0977 GiB | Kleines E-Mail-Anhangpaket oder Software-Patch |
| 256 MB / MiB | 0,256 GB | 0,25 GiB | Eingebetteter Grafikspeicher oder Docker-Container |
| 500 MB / MiB | 0,5 GB | 0,4883 GiB | Kurzes Full-HD-Video oder Musikalbum in FLAC |
| 512 MB / MiB | 0,512 GB | 0,5 GiB | Halbes Gigabyte Arbeitsspeicher in Embedded-Systemen |
| 1.000 MB / MiB | 1,0 GB | 0,9766 GiB | Basis-Einheit für Mobilfunk-Datenpakete |
| 1.024 MB / MiB | 1,024 GB | 1,0 GiB | Exaktes binäres Gibibyte (RAM-Modul-Standard) |
| 2.048 MB / MiB | 2,048 GB | 2,0 GiB | Standard-RAM-Zuweisung für eine virtuelle Maschine |
| 4.096 MB / MiB | 4,096 GB | 4,0 GiB | Maximale Dateigröße im älteren FAT32-Dateisystem |
| 5.000 MB / MiB | 5,0 GB | 4,8828 GiB | Kostenloses Einstiegskontingent vieler Cloud-Dienste |
| 10.000 MB / MiB | 10,0 GB | 9,7656 GiB | Übliches monatliches Smartphone-Datenvolumen |

## Branchenanwendungen, regionale Besonderheiten und häufige Fehler

In der IT-Branche, der Telekommunikation und im technischen Einkauf entstehen durch die parallele Nutzung zweier Zählsysteme regelmäßig kostspielige Missverständnisse. Während Festplatten- und SSD-Produzenten seit jeher im dezimalen SI-System werben, nutzen Betriebssysteme historische Bezeichnungen uneinheitlich: macOS (seit Version 10.6 Snow Leopard) und moderne Ubuntu-Distributionen zeigen Dateigrößen konsequent dezimal als echte GB an, wohingegen Microsoft Windows nach wie vor binäre Gibibyte-Werte berechnet, diese aber mit dem Kürzel „GB“ beschriftet.

Ein weiterer klassischer Fehler betrifft die Verwechslung von **Megabyte (MB)** und **Megabit (Mbit)** bei Internetanschlüssen. Internetprovider im DACH-Raum bewerben Übertragungsraten in Megabit pro Sekunde (Mbit/s), etwa 100 Mbit/s für einen VDSL-Anschluss. Da ein Byte aus 8 Bit besteht, entspricht dies einer maximalen Download-Geschwindigkeit von `100 ÷ 8 = 12,5 MB/s`. Wer eine 10-GB-Datei (10.000 MB) herunterladen möchte, benötigt bei vollen 12,5 MB/s rund 800 Sekunden – also etwas mehr als 13 Minuten – und nicht fälschlicherweise 100 Sekunden.

Auch bei der Planung von Datenbank-Clustern oder Backup-Richtlinien führt die Gleichsetzung von `1.000 MB` und `1.024 MiB` zu Fehlern. Bei einem Datensatz von 10 Terabyte beträgt die Differenz zwischen der dezimalen SI-Größe (10 TB) und der binären Größe (10 TiB) bereits knapp **10 Prozent** (genauer: 995 GB Unterschied). Kalkulieren Sie Speicherkapazitäten für Backups oder Kubernetes-Volumes daher stets mit einem Sicherheitspuffer von mindestens 10 bis 15 Prozent und achten Sie in Konfigurationsdateien penibel auf das korrekte Einheitenkürzel (`M` vs. `Mi`, `G` vs. `Gi`).
