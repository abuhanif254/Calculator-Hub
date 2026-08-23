---
title: "QR-Code Best Practices: Scanbarkeit, Formate und Fehlerkorrektur"
description: "Erfahren Sie, wie Sie perfekte QR-Codes für Druck und Web generieren, einschließlich Fehlerkorrekturstufen, Farbkontrast und der Wahl zwischen Vektor (SVG) und Raster (PNG)."
---

# QR-Code Best Practices: Scanbarkeit, Formate und Fehlerkorrektur

QR-Codes (Quick Response) sind zu einer unverzichtbaren Brücke zwischen der physischen und der digitalen Welt geworden. Egal, ob Sie einen QR-Code zu einer Speisekarte, einer Visitenkarte oder einer Werbetafel hinzufügen, es ist entscheidend, dass er zuverlässig gescannt werden kann.

In diesem Leitfaden untersuchen wir die Anatomie eines QR-Codes, häufige Fehler und wie Sie unser kostenloses [QR Code Studio](/de/tools/qr-code-studio) nutzen können, um professionelle Codes zu generieren.

---

## 🏗️ Die Anatomie eines QR-Codes

Ein QR-Code enthält spezifische strukturelle Elemente, die es Smartphone-Kameras ermöglichen, ihn sofort zu lesen:
* **Positionierungsquadrate:** Die drei großen Quadrate in den Ecken. Sie teilen dem Scanner mit, wo sich der Code befindet und wie er ausgerichtet ist.
* **Ausrichtungsmuster:** Kleinere Quadrate innerhalb des Codes, die dem Scanner helfen, den Code zu lesen, selbst wenn er verzerrt oder auf einer gekrümmten Oberfläche gedruckt ist.
* **Ruhezone (Quiet Zone):** Der leere Rand um den QR-Code. Ohne diesen weißen Raum kann der Scanner den Code nicht von seiner Umgebung unterscheiden.

---

## ⚙️ Fehlerkorrekturstufen verstehen

Eine der leistungsstärksten Funktionen eines QR-Codes ist die **Fehlerkorrektur**. Dieser mathematische Algorithmus ermöglicht es, dass ein QR-Code scannbar bleibt, selbst wenn ein Teil davon beschädigt oder verdeckt ist (z. B. durch ein Logo).

Bei der Generierung eines Codes können Sie aus vier Stufen wählen:
1. **Stufe L (Niedrig):** Stellt ~7 % der Daten wieder her.
2. **Stufe M (Mittel):** Stellt ~15 % der Daten wieder her. Die Standardeinstellung.
3. **Stufe Q (Quartil):** Stellt ~25 % der Daten wieder her. Gut für industrielle Umgebungen.
4. **Stufe H (Hoch):** Stellt ~30 % der Daten wieder her. Unerlässlich, wenn Sie ein benutzerdefiniertes Logo in die Mitte des QR-Codes einbetten.

---

## 🎨 Best Practices für Scanbarkeit

### 1. Hoher Kontrast ist Pflicht
Kameras benötigen Kontrast, um die "Module" vom Hintergrund zu trennen. Verwenden Sie immer eine dunkle Farbe auf einem hellen Hintergrund.

### 2. Respektieren Sie die Ruhezone
Lassen Sie einen Rand von mindestens 4 Modulen (Pixeln) um den gesamten QR-Code.

### 3. Größe für den Druck
Eine gute Faustregel ist das 10:1-Verhältnis. Der Scanabstand sollte das Zehnfache der Größe des QR-Codes betragen.

---

## 📂 Formate: SVG vs. PNG

* **SVG (Scalable Vector Graphics):** Verwenden Sie dies für den **Druck**. Es ist eine mathematische Formel, das heißt, Sie können ihn auf die Größe eines Wolkenkratzers vergrößern, ohne dass er unscharf wird.
* **PNG (Portable Network Graphics):** Verwenden Sie dies für das **Web**. Es ist ein Rasterformat (aus Pixeln bestehend). Perfekt für E-Mail-Signaturen oder Websites.

---

## ❓ Häufig gestellte Fragen (FAQ)

### Laufen QR-Codes ab?
Statische QR-Codes (wie die von unserem Tool generierten) **laufen niemals ab**. Die Daten sind fest in das Muster selbst codiert.

### Warum lässt sich mein Logo-QR-Code nicht scannen?
Wenn Sie ein Logo hinzugefügt haben, haben Sie wahrscheinlich zu viele Daten verdeckt. Um dies zu beheben, erhöhen Sie die Fehlerkorrekturstufe auf **H (Hoch)** und stellen Sie sicher, dass Ihr Logo nicht die drei großen Positionierungsquadrate in den Ecken verdeckt.
