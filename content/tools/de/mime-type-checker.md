---
metaTitle: "MIME-Type Checker | Content-Type Analyzer & Security Audit"
metaDescription: "Testen und validieren Sie MIME-Types (Content-Type) von Dateien und URLs. Prüfen Sie Datei-Uploads auf versteckte Gefahren, Magic Bytes und MIME-Sniffing."
metaKeywords: "mime type checker, content type prüfen, mime type herausfinden, dateiendung überprüfen, http header test, magic bytes, nosniff, file upload validierung"
title: "MIME-Type & Content-Type Checker"
shortDescription: "Erkennen und prüfen Sie MIME-Types (Content-Type) für Dateien, Endungen und URLs in Echtzeit. Audits für HTTP-Header und Magic Bytes beim Datei-Upload."
faqs:
  - question: "Was ist ein MIME-Type?"
    answer: "Ein MIME-Type (auch Media Type genannt) ist eine standardisierte Bezeichnung, mit der das Format einer Datei bei der Übertragung im Internet (via HTTP) angegeben wird. So weiß der Browser, wie er die Datei verarbeiten muss."
  - question: "Was bedeutet Content-Type?"
    answer: "Content-Type ist ein HTTP-Header-Feld. Es teilt dem Browser mit, welchen MIME-Type die gesendeten Daten haben und welche Zeichenkodierung (z.B. charset=UTF-8) verwendet wird."
  - question: "Was ist der Unterschied zwischen Dateiendung und MIME-Type?"
    answer: "Eine Dateiendung (wie .pdf oder .jpg) ist eine Namenskonvention auf Ihrem Computer. Ein MIME-Type (wie application/pdf) ist hingegen ein sicheres Netzwerk-Etikett im HTTP-Protokoll. Im Web zählt primär der MIME-Type, nicht die Endung!"
  - question: "Was ist MIME Sniffing?"
    answer: "Beim MIME Sniffing versucht der Browser, den Dateityp anhand des Dateiinhaltes selbst (und nicht anhand des Headers) zu erraten. Dies ist extrem gefährlich, da Hacker so Schadcode in vermeintlichen Bildern verstecken können (XSS-Angriffe)."
  - question: "Was bewirkt der Header X-Content-Type-Options?"
    answer: "Dieser Sicherheits-Header, speziell der Wert 'nosniff', verbietet dem Browser das gefährliche MIME-Sniffing. Der Browser muss sich dann strikt an den vom Server vorgegebenen Content-Type halten."
  - question: "Können falsche MIME-Types dem SEO schaden?"
    answer: "Ja! Wenn Ihr Server z.B. CSS-Dateien mit einem falschen MIME-Type ausliefert (wie text/plain statt text/css), blockiert der Browser das Laden. Googlebot sieht dann nur eine unformatierte Seite und straft Ihr Ranking für mangelnde Mobile-Optimierung ab."
features:
  - "Schnelle Suche nach Dateiendungen, um den passenden offiziellen MIME-Type zu finden."
  - "Server-seitiger URL-Inspektor für Content-Type- und Sicherheits-Header."
  - "Client-seitige Validierung von Datei-Uploads durch Auslesen roher 'Magic Bytes'."
  - "Erkennung von Dateiendungs-Manipulation (Spoofing) zur Abwehr von Hacker-Uploads."
  - "Durchsuchbare Datenbank mit über 60 gängigen MIME-Kategorien."
  - "Umfassender Security-Audit warnt bei fehlendem 'X-Content-Type-Options' Header."
useCases:
  - "Webentwickler, die Ladefehler (CSS/JS) aufgrund falscher Header-Konfigurationen debuggen."
  - "Sicherheits-Teams (Pentester), die Upload-Formulare auf Spoofing-Schwachstellen prüfen."
  - "Systemadministratoren, die Nginx- oder Apache-Server (mime.types) korrekt einrichten."
  - "SEO-Spezialisten, die Darstellungsfehler beim Crawling des Googlebots beheben."
howToSteps:
  - "Geben Sie eine Dateiendung (z.B. '.png') in das Suchfeld ein, um Definitionen zu finden."
  - "Fügen Sie eine URL in den URL-Inspektor ein, um die HTTP-Header live abzurufen."
  - "Ziehen Sie eine beliebige Datei per Drag & Drop in das Upload-Feld, um die Signaturen (Magic Bytes) auszulesen."
  - "Prüfen Sie den Validierungsstatus, um gefälschte Dateiendungen zu erkennen."
  - "Durchsuchen Sie unsere MIME-Datenbank nach Dateikategorien."
---

## Was ist ein MIME-Type?

Ein **MIME-Type** (Multipurpose Internet Mail Extensions), oft auch Content-Type genannt, ist ein standardisiertes, zweiteiliges Etikett. Es definiert das Format einer Datei, die über das Internet übertragen wird.

Er besteht aus einem Haupttyp und einem Untertyp (getrennt durch einen Schrägstrich `/`). Bei `text/html` ist `text` die Kategorie und `html` die exakte Struktur.

Wenn ein Webserver eine Datei an einen Browser sendet, fügt er einen HTTP-Header namens `Content-Type` hinzu. Der Browser verlässt sich zu 100 % auf diesen Header (nicht auf die Dateiendung!), um zu entscheiden, ob er ein Bild anzeigt, ein Video abspielt oder einen Download startet.

---

## Der Content-Type Header erklärt

Ein typischer HTTP-Response-Header sieht so aus:
```http
Content-Type: text/html; charset=UTF-8
```
Hier wird nicht nur mitgeteilt, dass es sich um HTML handelt, sondern auch, dass die Zeichenkodierung UTF-8 ist. Fehlt dieser Header, muss der Browser raten – das führt oft zu zerschossenen Layouts oder falschen Umlauten.

---

## Dateiendungen vs. MIME-Types (Security)

1. **Dateiendungen** (z.B. `.jpg`, `.pdf`): Namenskonventionen Ihres Betriebssystems (Windows).
2. **MIME-Types** (z.B. `image/jpeg`): Sichere Netzwerk-Etiketten im Internet.

Dateiendungen sind leicht zu fälschen. Ein Nutzer kann eine gefährliche `.exe`-Datei einfach in `.png` umbenennen. Die interne binäre Struktur der Datei bleibt jedoch gleich! Ein Webserver, der bei Bilder-Uploads nur auf die Endung `.png` vertraut, ist stark gefährdet. 

Eine robuste Überprüfung liest deshalb den MIME-Type und die sogenannten **Magic Bytes** (die interne Signatur) der Datei aus.

---

## Was ist MIME Sniffing?

Früher waren viele Server falsch konfiguriert. Um fehlerhafte Webseiten dennoch anzuzeigen, führten Browser das **MIME Sniffing** ein: Der Browser inspiziert die rohen Bytes einer Datei und rät den Dateityp, selbst wenn der Server etwas anderes behauptet.

Dies ist eine **massive Sicherheitslücke**. Wenn ein Angreifer eine HTML-Datei voller Viren hochlädt und sie `.jpg` nennt, rät der Browser beim Sniffing, dass es HTML ist und führt den bösartigen Code aus (Cross-Site Scripting / XSS).

### Der Schutz: X-Content-Type-Options

Um dieses Verhalten zu unterbinden, nutzen moderne Webseiten den folgenden Sicherheits-Header:
```http
X-Content-Type-Options: nosniff
```
Er zwingt den Browser, exakt dem vom Server deklarierten MIME-Type zu vertrauen und nichts auf eigene Faust zu raten oder auszuführen.

---

## Fehlerhafte MIME-Types und SEO-Auswirkungen

Wenn Sie JavaScript- oder CSS-Dateien mit falschen MIME-Types (z.B. als `text/plain`) ausliefern und den `nosniff`-Header aktiviert haben, wird der Browser das Laden der Skripte blockieren.

Dies hat fatale Folgen für das SEO (Suchmaschinenoptimierung). Der **Googlebot** kann das Design der Seite nicht mehr rendern, da das CSS blockiert wird. Die Webseite gilt für Google dann als nicht für Smartphones optimiert, was zu drastischen Ranking-Verlusten führt.
