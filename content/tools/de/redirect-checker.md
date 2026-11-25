---
metaTitle: "URL Redirect Checker — 301/302-Ketten & Schleifen prüfen"
metaDescription: "Prüfen Sie 301-, 302-, 307- und 308-Weiterleitungen Hop für Hop. Erkennen Sie Redirect-Ketten, Schleifen, Canonical-Fehler und HTTP-Header."
metaKeywords: "redirect checker, weiterleitung prüfen, 301 redirect test, url umleitung, weiterleitungskette, redirect schleife, 302 307 308, canonical check, seo tool"
title: "Kostenloser URL Redirect Checker"
shortDescription: "Verfolgen Sie URL-Weiterleitungen Schritt für Schritt, prüfen Sie 301-, 302-, 307- und 308-Statuscodes, decken Sie Ketten, Schleifen sowie Canonical-Abweichungen auf und inspizieren Sie rohe HTTP-Header."
faqs:
  - question: "Was unterscheidet HTTP 301 und 302 technisch von 307 und 308?"
    answer: "Alle vier Statuscodes lösen Weiterleitungen aus, unterscheiden sich jedoch bei der HTTP-Methode. Bei 301 und 302 dürfen Clients historisch bedingt eine POST-Anfrage beim Folgesprung in GET umwandeln. Die RFC-9110-Codes 307 (temporär) und 308 (permanent) schreiben dagegen strikt vor, dass Methode und Request-Body beim Redirect unverändert bleiben."
  - question: "Erkennt der Redirect Checker auch Meta-Refresh- und JavaScript-Weiterleitungen?"
    answer: "Ja. Erreicht die Verfolgung eine HTML-Antwort mit dem Status 200 OK, wertet das Backend bis zu 100 KB des HTML-Dokuments aus. Dabei erkennt es sowohl HTML-Meta-Refresh-Tags als auch klassische JavaScript-Umleitungen über window.location, location.href oder location.replace() und verfolgt das Ziel als eigenen Hop."
  - question: "Wie viele Sprünge (Hops) sind in einer Weiterleitungskette für SEO vertretbar?"
    answer: "Im Idealfall leitet eine veraltete URL in genau einem direkten Sprung (1 Hop) auf die finale Zieladresse weiter. Googlebot verfolgt pro Crawl-Durchlauf maximal fünf Sprünge und bricht nach insgesamt zehn Hops ab. Ketten mit mehr als zwei Sprüngen erhöhen die Latenz spürbar und verschwenden Crawl-Budget."
  - question: "Was bedeutet eine Warnung wegen Canonical-Abweichung am Kettenende?"
    answer: "Eine Canonical-Abweichung tritt auf, wenn die finale 200-OK-Ziel-URL im HTTP-Link-Header oder im HTML-Tag rel='canonical' auf eine andere URL verweist. Dadurch senden Server und Dokument widersprüchliche Konsolidierungssignale an Suchmaschinen, was zu fehlerhafter Indexierung oder verteilten Rankingsignalen führt."
  - question: "Warum lehnt das Tool Abfragen an localhost oder private IP-Bereiche ab?"
    answer: "Vor jedem einzelnen Weiterleitungssprung löst der Server den Hostnamen per DNS auf und prüft alle resultierenden IP-Adressen gegen reservierte Subnetze (RFC 1918, CGNAT, Loopback und Link-Local). Diese Schutzmaßnahme verhindert Server-Side Request Forgery (SSRF) selbst dann, wenn ein externer Server absichtlich auf eine interne Adresse umleitet."
features:
  - "Serverseitige Hop-für-Hop-Analyse über bis zu 10 Sprünge mit manueller Weiterleitungsverfolgung ohne verfälschenden Browser-Cache"
  - "Präzise Erkennung von HTTP-301-, 302-, 303-, 307- und 308-Weiterleitungen sowie Meta-Refresh- und JavaScript-Redirects"
  - "Automatische Diagnose von Endlosschleifen, überlangen Ketten, HTTPS-zu-HTTP-Downgrades und Canonical-Abweichungen"
  - "Simulation gängiger Clients (Desktop Chrome, iPhone Safari, Googlebot, Bingbot) sowie benutzerdefinierter User-Agent-Strings"
  - "Vollständige Pro-Hop-Inspektion von Antwortzeit (ms), Location-Ziel, rohen HTTP-Response-Headern und Set-Cookie-Einträgen"
  - "SSRF-geschützte DNS-Vorabprüfung pro Hop sowie Export kompletter Audit-Berichte als JSON- oder TXT-Datei"
useCases:
  - "Absicherung von Domain-Migrationen, HTTPS-Umstellungen und www-Kanonisierungen nach einem Website-Relaunch"
  - "Technisches SEO-Audit zur Beseitigung mehrstufiger Weiterleitungsketten und versehentlicher 302-Umleitungen"
  - "Fehlerdiagnose bei Endlosschleifen (ERR_TOO_MANY_REDIRECTS) zwischen CDN, Reverse-Proxy und CMS-Routing"
  - "Prüfung User-Agent-abhängiger Weiterleitungen und mobiler Zielseiten durch Vergleich von Chrome, Safari und Googlebot"
  - "Analyse von Kurz-URLs, Affiliate-Redirects und Kampagnen-Links inklusive gesetzter Tracking-Cookies pro Zwischenstation"
  - "Validierung von REST-API-Endpunkten auf methodenerhaltende 307- oder 308-Antworten bei POST- und PUT-Requests"
howToSteps:
  - "Tragen Sie die zu untersuchende Ausgangs-URL (mit http:// oder https://) in das Eingabefeld ein."
  - "Wählen Sie einen vordefinierten User-Agent (z. B. Chrome Desktop, iPhone Safari oder Googlebot) oder definieren Sie einen eigenen String."
  - "Starten Sie die Prüfung, um jeden einzelnen Redirect-Sprung serverseitig mit deaktiviertem Auto-Follow zu erfassen."
  - "Kontrollieren Sie die Diagnose-Warnungen auf Schleifen, Kettenlänge, unsichere Protokollwechsel oder Canonical-Konflikte."
  - "Öffnen Sie einzelne Hops, um Antwortzeiten in Millisekunden, Location-Header, Cookies und rohe Server-Header zu filtern."
  - "Exportieren Sie das komplette Trace-Protokoll als JSON-Payload oder lesbaren TXT-Report für Entwicklung und Dokumentation."
---

Wenn Browser, API-Clients oder Suchmaschinen-Crawler eine URL abrufen, verläuft der Weg zur eigentlichen Ressource selten geradlinig. Protokollwechsel von HTTP auf HTTPS, Hostname-Normierungen, alte Relaunch-Regeln und Tracking-Wrapper schieben häufig mehrere unsichtbare Weiterleitungen vor die Zielseite. Im normalen Browser bleiben diese Zwischenschritte oft verborgen, weil lokale Caches dauerhafte 301-Antworten speichern oder HSTS-Regeln Anfragen bereits vor dem ersten Netzwerkpaket intern umschreiben. Dieser Redirect Checker verfolgt jeden Sprung serverseitig im manuellen Modus, löst relative wie absolute `Location`-Header exakt nach RFC 9110 auf, misst die Antwortzeit pro Hop und prüft zusätzlich Canonical-Signale, Cookies sowie clientseitige HTML- und JavaScript-Weiterleitungen.

## HTTP-Weiterleitungs-Statuscodes nach RFC 9110 im Vergleich

Auf Protokollebene signalisiert ein Webserver eine Umleitung durch einen `3xx`-Statuscode in Kombination mit dem Antwort-Header `Location`. Entscheidend für Suchmaschinen, Proxies und API-Clients sind dabei drei Eigenschaften: ob die Verschiebung dauerhaft gilt, ob Caches den Sprung ohne erneute Rückfrage speichern dürfen und ob die ursprüngliche HTTP-Methode (etwa `POST`) beim Folgerequest erhalten bleibt.

| Status / Typ | Semantik | HTTP-Methode | Standard-Caching | Relevanz für SEO & Entwicklung |
| :--- | :--- | :--- | :--- | :--- |
| `301 Moved Permanently` | Dauerhaft verschoben | Darf `POST` zu `GET` ändern | Stark cachebar | Standard für Domain-Umzüge; überträgt kanonische Signale und Link-Signale. |
| `302 Found` | Temporär verschoben | Darf `POST` zu `GET` ändern | Nur mit Cache-Header | Für zeitlich begrenzte Aktionen oder A/B-Tests; alte URL bleibt meist kanonisch. |
| `303 See Other` | Verweis auf GET-Ressource | Erzwingt `GET` | Nicht standardmäßig | Ideal für das Post/Redirect/Get-Muster nach Formular-Submits. |
| `307 Temporary Redirect` | Temporär (strikt) | Methode & Body unverändert | Nur mit Cache-Header | Unverzichtbar für temporäre API-Redirects; auch genutzt bei Browser-internem HSTS. |
| `308 Permanent Redirect` | Dauerhaft (strikt) | Methode & Body unverändert | Stark cachebar | Moderne Alternative zu 301 für REST-APIs und dauerhafte Endpunkt-Migrationen. |
| `Meta Refresh` | Clientseitig im HTML | Immer `GET` | Seiten-Caching | Notlösung ohne Serverzugriff; `delay=0` wird von Google ähnlich 301 gewertet, erzeugt aber Overhead. |
| `JavaScript Redirect` | Clientseitig im Script | Immer `GET` | Seiten-Caching | Erst nach HTML-Download und Rendering wirksam; hohe Latenz und erhöhtes Crawl-Risiko. |

Ein häufiger Praxisirrtum betrifft den Unterschied zwischen `302` und `301` bei langfristig bestehenden Weiterleitungen: Zwar kann Google sehr langlebige 302-Signale mit der Zeit heuristisch als permanent interpretieren, doch verlässt man sich dabei auf verzögerte Signalkonsolidierung. Für dauerhafte URL-Änderungen gehört daher konsequent `301` (für Webseiten) beziehungsweise `308` (für methodensensitive APIs) in die Serverkonfiguration. Ebenso wichtig: Ein `307 Internal Redirect` in den Chrome-DevTools stammt häufig gar nicht vom Origin-Server, sondern von einer lokal zwischengespeicherten HSTS-Richtlinie – die serverseitige Prüfung offenbart, welchen echten Statuscode unverschlüsselte Erstbesucher erhalten.

## Weiterleitungsketten, Schleifen und Protokoll-Downgrades

Jeder zusätzliche Hop in einer Weiterleitungskette verursacht im schlechtesten Fall eine komplette Netzwerkkaskade aus DNS-Auflösung, TCP-Handshake, TLS-Verhandlung und Server-TTFB. Ein klassisches Negativbeispiel aus vielen Relaunches ist eine dreistufige Einstiegskette:

```text
http://beispiel.de
  -> 301 -> https://beispiel.de
  -> 301 -> https://www.beispiel.de/
  -> 302 -> https://www.beispiel.de/de/
```

Obwohl der Nutzer am Ende bei `200 OK` landet, addieren sich schnell 300 bis 900 Millisekunden reine Wartezeit vor dem ersten Byte HTML. Gleichzeitig schrumpft die Wahrscheinlichkeit, dass Crawler tiefe Pfade vollständig auflösen. Alle Varianten einer Domain (`http`, `https`, mit und ohne `www`) sollten deshalb immer in **genau einem Hop** direkt auf die kanonische Ziel-URL zeigen.

Noch kritischer sind zirkuläre Weiterleitungsschleifen (`A -> B -> A` oder `A -> A`), die Browser mit `ERR_TOO_MANY_REDIRECTS` abbrechen. In Produktionsumgebungen entstehen sie meist durch widersprüchliche Schichten: Ein vorgeschaltetes CDN terminiert TLS und reicht Anfragen intern per HTTP weiter, während der Origin-Server oder das CMS wegen fehlendem `X-Forwarded-Proto: https` endlos zurück auf HTTPS umleitet. Ebenso problematisch sind **HTTPS-zu-HTTP-Downgrades** innerhalb einer Kette, die Transportverschlüsselung aushebeln und gesetzte `Secure`-Cookies abschneiden. Unser Analyzer meldet beide Muster sofort und protokolliert alle pro Hop empfangenen `Set-Cookie`-Header.

## Canonical-Konsistenz und clientseitige Fallbacks

Eine saubere `301`-Kette verliert einen Großteil ihrer Wirkung, wenn die erreichte `200-OK`-Zielseite widersprüchliche Kanonisierungshinweise ausgibt. Der Prüfer liest daher sowohl den HTTP-Header `Link: <https://...>; rel="canonical"` als auch das HTML-Element `<link rel="canonical" href="...">` aus. Weicht die deklarierte Canonical-URL von der tatsächlich erreichten Ziel-URL ab – etwa wegen fehlendem Trailing Slash, vertauschter Subdomain oder verbliebenen Tracking-Parametern – schlägt das Tool einen **Canonical Mismatch** Alarm.

Gleichzeitig bleiben viele Umleitungen für reine Header-Skripte unsichtbar, weil der Server `200 OK` ausliefert und erst im HTML per `<meta http-equiv="refresh" content="0;url=...">` oder via `window.location.replace(...)` weiterleitet. Durch die Inspektion der ersten 100 KB jeder HTML-Antwort deckt der Redirect Checker auch solche versteckten clientseitigen Sprünge zuverlässig auf.

## Praxisbeispiele: Nginx, Apache und cURL-Diagnose

Um doppelte Sprünge von `http://beispiel.de` über `https://beispiel.de` nach `https://www.beispiel.de` zu vermeiden, fassen Sie Protokoll- und Hostname-Wechsel in Nginx direkt in einem `server`-Block zusammen:

```nginx
# HTTP (mit und ohne www) in einem einzigen 301-Hop auf das kanonische Ziel
server {
    listen 80;
    listen [::]:80;
    server_name beispiel.de www.beispiel.de;
    return 301 https://www.beispiel.de$request_uri;
}

# HTTPS ohne www direkt auf HTTPS mit www umleiten
server {
    listen 443 ssl http2;
    server_name beispiel.de;
    return 301 https://www.beispiel.de$request_uri;
}
```

Für schnelle Stichproben direkt aus dem Terminal eignet sich `curl` mit deaktiviertem Body-Output und benutzerdefiniertem User-Agent, um jeden `Location`-Header und Statuscode sichtbar zu machen:

```bash
# Komplette Redirect-Kette inklusive Antwort-Headern als Googlebot verfolgen
curl -sSL -D - -o /dev/null \
  -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" \
  "http://beispiel.de/alter-pfad" | grep -iE "^(HTTP/|location:|link:|set-cookie:)"
```

Wenn Sie Apache-Weiterleitungen fehlerfrei generieren möchten, unterstützt Sie der [.htaccess Generator](/de/werkzeuge/htaccess-generator). Für eine tiefgehende Sicherheits- und Caching-Prüfung der finalen Zielseite – einschließlich HSTS, CSP und Brotli-Kompression – lohnt sich der anschließende Check im [HTTP Header Checker](/de/werkzeuge/http-header-checker). Stellen Sie bei SEO-Migrationen zudem über den [Robots.txt Generator](/de/werkzeuge/robots-txt-generator) sicher, dass weitergeleitete Alt-URLs nicht per `Disallow` blockiert sind, da Crawler den 301-Status sonst niemals auslesen können. Für die Auswertung abweichender Mobil- oder Bot-Kennungen lässt sich jeder verwendete Request-Header direkt im [User Agent Parser](/de/werkzeuge/user-agent-parser) überprüfen.
