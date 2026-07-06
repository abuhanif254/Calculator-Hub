---
metaTitle: "HTTP Header Checker & Security Analyzer (SEO Tool)"
metaDescription: "Analysieren Sie HTTP-Antwort-Header in Echtzeit. Prüfen Sie Security-Header (CSP, HSTS), CORS-Richtlinien, SSL-Zertifikate, Redirects und Gzip-Kompression."
metaKeywords: "http header checker, response header auslesen, security header check, csp prüfen, hsts check, weiterleitung prüfen, seo redirect checker, cors test"
title: "HTTP Header Checker"
shortDescription: "Untersuchen Sie HTTP-Header, prüfen Sie CORS-Richtlinien, testen Sie 301-Weiterleitungen und auditieren Sie Security-Header wie CSP und HSTS."
faqs:
  - question: "Warum kann ich HTTP-Header nicht direkt über meinen Browser per JS prüfen?"
    answer: "Browser verwenden eine Sicherheitsfunktion namens CORS (Cross-Origin Resource Sharing). Wenn Sie über JavaScript Anfragen an fremde Webseiten senden, blockiert der Browser die Header, es sei denn, der Server erlaubt dies explizit. Unser Tool umgeht dies, indem die Anfrage auf unserem sicheren Backend ausgeführt wird."
  - question: "Was ist der Unterschied zwischen GET- und HEAD-Anfragen?"
    answer: "Bei einer GET-Anfrage fordert der Server sowohl die HTTP-Header als auch den gesamten Quelltext der Website an. Bei einer HEAD-Anfrage sendet der Server nur die Header zurück (ohne den HTML-Code). HEAD ist schneller und spart Bandbreite."
  - question: "Was bedeutet die Warnung 'Missing Strict-Transport-Security (HSTS)'?"
    answer: "HSTS weist den Browser an, künftig nur noch über verschlüsseltes HTTPS mit der Website zu kommunizieren. Fehlt dieser Header, können Angreifer Nutzer auf unverschlüsselte HTTP-Seiten umleiten (SSL Stripping)."
  - question: "Wie verberge ich meine Apache- oder Nginx-Serverversion?"
    answer: "Wenn Sie die Version Ihres Servers mitsenden (z. B. nginx/1.18.0), machen Sie es Hackern leicht, gezielt nach Schwachstellen zu suchen. Fügen Sie in Nginx 'server_tokens off;' hinzu. In Apache setzen Sie 'ServerTokens ProductOnly' und 'ServerSignature Off'."
features:
  - "Sichere Analyse von HTTP- und HTTPS-Verbindungen."
  - "Audit der Security Header (CSP, HSTS, X-Frame-Options, X-Content-Type-Options)."
  - "Verfolgung von Redirect-Ketten (Weiterleitungen wie 301, 302, 307)."
  - "Auswertung von Sicherheits-Cookies (Secure, HttpOnly, SameSite)."
  - "Latenz-Messung und Validierung der Gzip- oder Brotli-Kompression."
  - "Split-Screen: Vergleichen Sie die Header von zwei verschiedenen URLs."
useCases:
  - "Sicherheits-Audits von Servern (Prüfung fehlender Security Header)."
  - "SEO-Fehlerdiagnose bei falschen Canonical-Tags oder 302-Weiterleitungen."
  - "Backend-Entwickler, die API-Endpoints auf korrekte CORS-Header prüfen."
  - "Systemadministratoren, die Server-Signaturen verstecken wollen (Nginx/Apache)."
howToSteps:
  - "Geben Sie die Ziel-URL (z. B. https://example.com) in das Eingabefeld ein."
  - "Wählen Sie die HTTP-Methode (GET für die volle Antwort, HEAD nur für Header)."
  - "Wählen Sie einen User-Agent (z. B. Googlebot, Desktop Chrome, iPhone)."
  - "Klicken Sie auf 'Header prüfen', um die serverseitige Analyse zu starten."
  - "Überprüfen Sie die Noten (Security, SEO, Caching)."
  - "Nutzen Sie den Tab 'URLs vergleichen' für direkte Gegenüberstellungen."
---

## Was sind HTTP-Header?

Wenn Sie im Internet surfen, kommuniziert Ihr Browser über **HTTP (Hypertext Transfer Protocol)** mit den Webservern. Diese Kommunikation besteht aus Anfragen (Requests) und Antworten (Responses).

Während die eigentliche "Nutzlast" dieses Austauschs typischerweise HTML, CSS oder Bilder sind, gibt es eine unsichtbare Metadaten-Hülle, die jede Anfrage begleitet. Diese Metadaten werden als **HTTP-Header** bezeichnet.

HTTP-Header sind einfache Name-Wert-Paare (z. B. `Content-Type: text/html`), die es dem Client und dem Server ermöglichen, Sicherheitseinstellungen, Caching-Regeln und Datenformate auszuhandeln.

---

## Security Header (Sicherheits-Header)

Sicherheits-Header weisen den Browser an, bestimmte eingebaute Abwehrmechanismen zu aktivieren:

### 1. Content-Security-Policy (CSP)
Die CSP ist die ultimative Verteidigung gegen Cross-Site-Scripting (XSS). Sie schränkt ein, von welchen Domains (Ursprüngen) der Browser Skripte, Bilder und Frames laden darf. 

### 2. Strict-Transport-Security (HSTS)
HSTS stellt sicher, dass eine Website niemals über eine unverschlüsselte HTTP-Verbindung geladen werden kann, und schützt vor Man-in-the-Middle (MITM) Angriffen.

### 3. X-Frame-Options (XFO)
Verhindert, dass Ihre Webseite in einem `<iframe>` auf einer fremden Domain eingebettet wird (Schutz vor Clickjacking-Angriffen).

### 4. X-Content-Type-Options (nosniff)
Zwingt den Browser, sich an den vom Server vorgegebenen Datentyp zu halten. Dies verhindert, dass ein hochgeladenes bösartiges Skript als harmloses Bild ausgeführt wird.

---

## SEO-Auswirkungen von HTTP-Headern

Suchmaschinen wie der Googlebot werten Antwort-Header aus, um zu verstehen, wie sie Ihre Inhalte indexieren sollen.

* **X-Robots-Tag**: Dieser Header weist Suchmaschinen an, ob sie eine Datei indexieren dürfen (`noindex`) oder nicht. Dies ist ideal, um PDF-Dateien oder Bilder vor der Google-Suche zu verbergen.
* **Redirections (Weiterleitungen)**: Google behandelt Weiterleitungs-Codes sehr unterschiedlich. Eine **301** (permanente Weiterleitung) gibt den gesamten SEO-Wert (PageRank) an die neue Seite weiter. Eine **302** (temporäre Weiterleitung) signalisiert Google, dass die alte URL im Index verbleiben soll.

---

## CORS-Header (Cross-Origin Resource Sharing)

CORS ist ein Sicherheitsmechanismus, der verhindert, dass eine Webseite über JavaScript ungefragt auf Daten (APIs) fremder Server zugreift. Der Zielserver muss dies über spezielle Header erlauben:

* **`Access-Control-Allow-Origin`**: Legt fest, welche Domains Zugriff haben (z. B. `https://mein-kunde.de`).
* **`Access-Control-Allow-Methods`**: Deklariert die erlaubten HTTP-Methoden (z. B. `GET, POST`).

---

## Caching und Komprimierung

* **`Cache-Control`**: Legt fest, wie lange Dateien im Browser-Cache gespeichert werden (z. B. `max-age=31536000` für 1 Jahr bei Bildern).
* **`Content-Encoding`**: Identifiziert den verwendeten Komprimierungsalgorithmus (meist **Brotli** oder **Gzip**). Brotli komprimiert Text bis zu 20 % effizienter als Gzip.

Mit unserem Tool können Sie in Sekundenschnelle alle Serverantworten prüfen, fehlerhafte Weiterleitungen reparieren und fehlende Sicherheits-Header nachrüsten.
