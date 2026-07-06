---
metaTitle: "Redirect Checker | 301 Weiterleitung Testen & SEO Audit Tool"
metaDescription: "Testen Sie HTTP-Weiterleitungen (Redirects 301, 302). Analysieren Sie Redirect-Ketten, decken Sie Endlosschleifen auf und prüfen Sie SEO Canonical Tags."
metaKeywords: "weiterleitung testen, redirect checker, 301 weiterleitung prüfen, redirect loop finden, umleitungen testen, seo redirect check, canonical fehler"
title: "Redirect Checker (Weiterleitungen Testen)"
shortDescription: "Verfolgen Sie URL-Weiterleitungen Schritt für Schritt. Analysieren Sie 301/302 HTTP-Statuscodes, finden Sie Latenz-Probleme und decken Sie Redirect-Loops auf."
faqs:
  - question: "Warum sind lange Redirect-Ketten schlecht für SEO?"
    answer: "Jeder Weiterleitungsschritt (Hop) erzeugt eine neue Serveranfrage, was die Ladezeit messbar verlängert (Latenz). Suchmaschinen-Crawler wie der Googlebot haben ein strenges Zeitbudget. Bei Ketten von über 3-4 Hops bricht der Crawler oft ab. Das Ergebnis: Die Zielseite wird nicht indexiert und fliegt aus den Suchergebnissen."
  - question: "Kann dieses Tool auch JavaScript-Weiterleitungen erkennen?"
    answer: "Ja, unser Tool führt ein HTML-Parsing durch. Wenn der Server zwar ein '200 OK' sendet, aber JavaScript-Befehle wie 'window.location.href' im Code versteckt sind, extrahiert der Parser diese URL und wertet sie als clientseitigen Redirect-Sprung."
  - question: "Was bedeutet eine 'Canonical Mismatch' Warnung?"
    answer: "Ein Konflikt entsteht, wenn die am Ende der Kette erreichte Ziel-URL ein HTML-Tag (<link rel='canonical'>) aufweist, das auf eine völlig andere Adresse zeigt. Google ist dann verwirrt, da Sie per Redirect sagen 'Seite A ist nun Seite B', aber Seite B behauptet, das Original liege auf Seite C."
  - question: "Was ist der Unterschied zwischen einem 301- und einem 308-Redirect?"
    answer: "Beide sind permanente Weiterleitungen. Beim älteren 301-Standard dürfen Browser jedoch technisch gesehen eine POST-Anfrage (z.B. Formularversand) in eine einfache GET-Anfrage umwandeln. Bei einem 308-Redirect ist diese Umwandlung strikt verboten."
features:
  - "Verfolgt bis zu 10 aufeinanderfolgende Redirect-Sprünge (Hops)."
  - "Gibt genaue HTTP-Statuscodes aus (301, 302, 307, 308, 404, 200)."
  - "Erkennt clientseitige Weiterleitungen (HTML Meta Refresh & JS Redirects)."
  - "Prüft Canonical-Tags auf Übereinstimmung zur Vermeidung von SEO-Fehlern."
  - "Deckt Endlosschleifen (Redirect Loops) und kaputte Pfade auf."
  - "Prüft auf unsichere HTTP-Verbindungen innerhalb einer HTTPS-Kette."
  - "Unterstützt verschiedene User-Agents (Googlebot, Desktop, iPhone)."
useCases:
  - "SEO-Experten, die verlorenen Linkjuice bei Domain-Umzügen suchen."
  - "Webentwickler, die Apache/Nginx .htaccess-Regeln debuggen."
  - "Systemadministratoren, die Ursachen für 'ERR_TOO_MANY_REDIRECTS' Browserfehler finden."
  - "Content-Manager, die sicherstellen wollen, dass gelöschte Seiten korrekt auf neue raten."
howToSteps:
  - "Geben Sie die Start-URL (z. B. domain.de) in das Adressfeld ein."
  - "Wählen Sie einen User-Agent aus dem Dropdown-Menü (z. B. Googlebot)."
  - "Klicken Sie auf 'Weiterleitungen Analysieren'."
  - "Betrachten Sie das Flussdiagramm mit allen Zwischenstationen (Hops) und Antwortzeiten."
  - "Prüfen Sie das SEO-Diagnose-Panel auf Fehler (Ketten, Loops)."
  - "Klicken Sie auf einzelne Schritte, um detaillierte HTTP-Header zu lesen."
---

## Wie HTTP-Weiterleitungen funktionieren

Eine **HTTP-Weiterleitung (Redirect)** ist ein Befehl des Webservers, der den Browser (oder Googlebot) automatisch von einer URL zu einer anderen weiterleitet. 

Dies ist unerlässlich, wenn eine Website auf eine neue Domain umzieht, URLs umstrukturiert werden oder man Besucher von unsicherem HTTP zwingend auf HTTPS leiten möchte. Die Weiterleitung stellt sicher, dass Nutzer nicht auf kaputten 404-Fehlerseiten landen.

Der technische Ablauf:
1. Der Nutzer ruft `http://domain.de/alt` auf.
2. Der Server antwortet mit einem **301 Statuscode** und einem Header `Location: https://domain.de/neu`.
3. Der Browser führt sofort (im Millisekundenbereich) einen neuen Aufruf der neuen Adresse durch.

## 301 vs 302 vs 307: Welchen Code sollte ich nutzen?

Für die Suchmaschinenoptimierung (SEO) ist die Wahl des Statuscodes entscheidend, denn er bestimmt, was mit dem angesammelten Vertrauen (Linkjuice / PageRank) der alten Seite passiert.

### 1. Permanente Weiterleitungen (Für SEO!)
Signalisiert der Suchmaschine, dass der Inhalt für immer umgezogen ist. Google überträgt 90-99% des Ranking-Potenzials auf die neue Seite und wirft die alte aus dem Index.
* **301 Moved Permanently:** Der klassische Standard für alle SEO-Umzüge.
* **308 Permanent Redirect:** Die modernere Alternative. Sie verbietet dem Browser, eine verschlüsselte POST-Anfrage auf dem Weg zur neuen URL in eine GET-Anfrage umzuwandeln (wichtig für API-Schnittstellen).

### 2. Temporäre Weiterleitungen (Kein SEO-Transfer)
Zeigt an, dass die Weiterleitung nur vorübergehend ist (z. B. bei Serverwartungsarbeiten). Google behält die alte URL im Index und wertet die neue URL nicht auf.
* **302 Found:** Der klassische temporäre Redirect.
* **307 Temporary Redirect:** Die strikte moderne Variante (wie 308, nur temporär).

---

## Clientseitige Weiterleitungen (Gefährlich für SEO)

Manche Weiterleitungen passieren nicht auf Server-Ebene, sondern erst, wenn das HTML-Dokument im Browser geladen wurde:

1. **Meta Refresh:** `<meta http-equiv=\"refresh\" content=\"3; url=...\">`. Dieser Code im HTML `<head>` wartet 3 Sekunden und leitet dann weiter. Google bestraft solche Weiterleitungen oft als Spam-Taktik.
2. **JavaScript Redirects:** `window.location.href = \"...\";`. Crawler führen JavaScript zwar aus, brechen aber bei komplexen Skripten oft ab. Wenn der Bot die Weiterleitung übersieht, bricht die Indexierung ab.

Sie sollten **immer** serverseitige 301/302 Redirects (z. B. via `.htaccess` oder Nginx) verwenden!

---

## Tödliche SEO-Fehler finden

### 1. Die Redirect-Kette (Chain)
Wenn A auf B leitet, und B auf C leitet. Die Ladezeit summiert sich auf, da jedes Mal DNS- und TCP-Handshakes durchgeführt werden müssen. Das "Crawl-Budget" von Google ist schnell aufgebraucht und die Kette wird abgebrochen. Linkjuice geht auf der Strecke verloren. 

### 2. Die Endlosschleife (Redirect Loop)
A leitet auf B, aber B leitet wieder zurück auf A. Der Browser bricht ab und zeigt Nutzern einen weißen Bildschirm mit dem Fehlercode `ERR_TOO_MANY_REDIRECTS`.

### 3. Canonical-Tag Konflikte
Wenn Sie einen 301-Redirect auf eine Seite setzen, diese Zielseite aber ein `<link rel=\"canonical\" href=\"...\">` Tag besitzt, das auf eine dritte URL verweist, senden Sie stark widersprüchliche Signale an Google. Dies führt im schlimmsten Fall zur Deindexierung beider Seiten. 

Nutzen Sie unseren **Redirect Tracer**, um alle versteckten Weiterleitungs-Sprünge sichtbar zu machen und Latenzverluste zu minimieren.
