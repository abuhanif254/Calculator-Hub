---
metaTitle: "HTTP Header Checker: Security-Header, CORS & SEO prüfen"
metaDescription: "HTTP-Antwort-Header in Echtzeit analysieren: CSP, HSTS, CORS-Richtlinien, 301-Weiterleitungen, Cookie-Flags und Brotli-Kompression sofort prüfen."
metaKeywords: "http header checker, response header prüfen, security header check, csp prüfen, hsts header testen, cors header prüfen, redirect kette analysieren, cache-control prüfen"
title: "HTTP Header Checker"
shortDescription: "Analysieren Sie HTTP-Antwort-Header, Sicherheitsrichtlinien (CSP, HSTS), CORS-Freigaben, Weiterleitungsketten, Cookie-Attribute sowie Caching- und Kompressions-Header in Echtzeit."
faqs:
  - question: "Warum kann der Browser fremde HTTP-Header nicht direkt per JavaScript auslesen?"
    answer: "Die Same-Origin-Policy und CORS (Cross-Origin Resource Sharing) verbieten Browser-Skripten den Lesezugriff auf Antwort-Header fremder Domains – abgesehen von wenigen Safelist-Headern –, sofern der Zielserver diese nicht explizit über 'Access-Control-Expose-Headers' freigibt. Unser Checker führt die Anfrage deshalb geschützt serverseitig aus und liefert Ihnen den vollständigen rohen Header-Block."
  - question: "Wie schützt der HTTP Header Checker vor SSRF-Angriffen?"
    answer: "Bei Server-Side Request Forgery (SSRF) versuchen Angreifer, einen Server zu Anfragen an interne Systeme zu bewegen. Unser Backend validiert daher streng das Protokoll (nur HTTP/HTTPS), löst den Hostnamen vorab per DNS auf und blockiert sämtliche privaten RFC-1918-Netze, Loopback-Adressen (127.0.0.0/8, ::1) sowie Link-Local-Bereiche wie Cloud-Metadaten-IPs."
  - question: "Wann sollte ich eine HEAD-Anfrage statt einer GET-Anfrage wählen?"
    answer: "Eine HEAD-Anfrage fordert ausschließlich die Statuszeile und alle HTTP-Response-Header ohne den eigentlichen Nutzdaten-Body (HTML, JSON, Bilder) an. Sie eignet sich ideal für schnelle Header- und Redirect-Checks mit minimaler Latenz. Beachten Sie jedoch, dass manche Server oder API-Gateways HEAD blockieren oder abweichende Kompressions-Header liefern – im Zweifel schafft GET Klarheit."
  - question: "Warum reicht X-Frame-Options heute oft nicht mehr ohne Content-Security-Policy aus?"
    answer: "X-Frame-Options unterstützt nur starre Werte wie DENY oder SAMEORIGIN, jedoch keine Freigabe mehrerer vertrauenswürdiger Partner-Domains. Die moderne CSP-Direktive 'frame-ancestors' bietet feingranulare Kontrolle für beliebige Ursprünge und hat in aktuellen Browsern Vorrang vor X-Frame-Options."
  - question: "Wie entferne ich verräterische Server-Signaturen wie nginx/1.24 oder X-Powered-By?"
    answer: "Genaue Versionsnummern erleichtern automatisierte Schwachstellen-Scans (CVE-Fingerprinting). Setzen Sie in Nginx 'server_tokens off;', in Apache 'ServerTokens ProductOnly' plus 'ServerSignature Off', in PHP 'expose_php = Off' in der php.ini und in Express/Node.js 'app.disable(x-powered-by)' beziehungsweise die Middleware Helmet."
features:
  - "Serverseitige Inspektion vollständiger HTTP- und HTTPS-Response-Header ohne Einschränkungen durch Browser-CORS."
  - "Automatisiertes Sicherheits-Audit für CSP, HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy und Permissions-Policy."
  - "Schrittweise Verfolgung kompletter Weiterleitungsketten (301, 302, 307, 308) inklusive Erkennung von Loops und Zielstatus."
  - "Detaillierte Auswertung von Set-Cookie-Attributen (Secure, HttpOnly, SameSite, Path, Max-Age) zur Session-Härtung."
  - "Prüfung von Cache-Control, ETag, Vary sowie Content-Encoding (Brotli, Gzip, Zstd) samt Antwortzeit-Messung."
  - "Direkter Split-Screen-Vergleich zweier URLs oder Staging- versus Produktions-Konfigurationen inklusive Export."
useCases:
  - "Sicherheits-Audits von Webanwendungen zur Aufdeckung fehlender Schutz-Header und unsicher konfigurierter Session-Cookies."
  - "Fehlersuche bei blockierten Browser-API-Aufrufen durch falsch gesetzte CORS- und Preflight-Header."
  - "Technisches SEO-Monitoring von Statuscodes, Redirect-Ketten, X-Robots-Tag und HTTP-Canonical-Headern für PDFs."
  - "Optimierung von CDN-Trefferraten und Core Web Vitals durch Kontrolle von Cache-Control, ETag, Vary und Brotli-Kompression."
  - "Überprüfung von Server-Härtungsmaßnahmen nach Änderungen an Nginx, Apache, Cloudflare oder Reverse-Proxys."
  - "Gegenüberstellung von Entwicklungs-, Staging- und Live-Umgebungen nach Infrastruktur-Deployments."
howToSteps:
  - "Tragen Sie die vollständige Ziel-URL (z. B. https://beispiel.de/api) in das Eingabefeld ein."
  - "Wählen Sie die HTTP-Methode (GET für die vollständige Antwort oder HEAD für reine Metadaten ohne Body)."
  - "Legen Sie bei Bedarf einen passenden User-Agent fest (z. B. Desktop Chrome, Mobile Safari oder Googlebot)."
  - "Starten Sie die serverseitige Abfrage mit einem Klick auf 'Header prüfen'."
  - "Prüfen Sie die Kategorien für Security-Header, Redirect-Kette, Cookies, Caching sowie die Rohdaten-Ansicht."
  - "Nutzen Sie die Vergleichsfunktion für zwei URLs oder exportieren Sie den Prüfbericht für Dokumentation und Tickets."
---

Noch bevor ein Browser das erste Byte HTML, CSS oder JSON verarbeitet, verhandeln Client und Server über **HTTP-Header**, wie eine Ressource entschlüsselt, zwischengespeichert, gerendert und gegen Angriffe abgesichert wird. Eine einzige fehlende Direktive kann Cross-Site-Scripting ermöglichen, Caching im CDN komplett aushebeln oder Suchmaschinen unbeabsichtigt vom Indexieren abhalten. Mit unserem **HTTP Header Checker** untersuchen Sie die vollständige Serverantwort inklusive Weiterleitungsketten, Sicherheits-Headern, Cookie-Flags und Komprimierung zuverlässig über eine geschützte serverseitige Abfrage.

## Protokollaufbau: Von HTTP/1.1 über HPACK (HTTP/2) zu QPACK (HTTP/3)

Gemäß RFC 9110 bestehen HTTP-Header aus `Feldname: Feldwert`-Paaren, wobei Feldnamen groß-/kleinschreibungsunabhängig sind. Dabei verhandeln Request-Header des Clients (`User-Agent`, `Accept`, `Accept-Encoding`, `Accept-Language`, `Authorization`) per *Content Negotiation* mit den Response-Headern des Zielservers (`Content-Type`, `Content-Length`, `Vary`, `ETag`). In modernen Infrastrukturen ergänzen vorgelagerte Reverse-Proxys, Load Balancer und CDNs zusätzlich Diagnosefelder wie `Via`, `Age`, `X-Cache` oder `CF-Cache-Status`, die genau verraten, ob eine Antwort direkt vom Origin-Server oder aus dem Edge-Cache stammt.

Entscheidend für Latenz und Nebenläufigkeit ist zudem die ausgehandelte Protokollversion:

* **HTTP/1.1**: Überträgt Header als unkomprimierten ASCII-Klartext vor einer `\r\n\r\n`-Leerzeile. Identische Cookies und User-Agents werden bei jedem Request erneut gesendet, und sequenzielle Antworten leiden unter TCP-*Head-of-Line-Blocking*.
* **HTTP/2**: Kapselt Header in binäre `HEADERS`-Frames und komprimiert wiederkehrende Felder über **HPACK** mithilfe statischer und dynamischer Tabellen. Durch Multiplexing laufen parallele Streams über eine einzige TLS-Verbindung.
* **HTTP/3**: Nutzt **QUIC** auf UDP-Basis statt TCP und ersetzt HPACK durch **QPACK**, sodass Paketverluste eines einzelnen Streams nicht mehr die Header-Dekodierung anderer Streams ausbremsen.

## Kritische Security-Header und empfohlene Produktionswerte

Sicherheits-Header aktivieren native Schutzmechanismen direkt im Browser. Die folgende Referenz zeigt die wichtigsten Response-Header für gehärtete Produktionssysteme:

| HTTP-Header | Empfohlener Produktionswert | Primäres Schutzziel |
| :--- | :--- | :--- |
| **`Strict-Transport-Security`** | `max-age=63072000; includeSubDomains; preload` | Erzwingt HTTPS, verhindert SSL-Stripping und Downgrades |
| **`Content-Security-Policy`** | `default-src 'self'; object-src 'none'; frame-ancestors 'none'` | Blockiert XSS, unautorisierte Skripte und Clickjacking |
| **`X-Content-Type-Options`** | `nosniff` | Unterbindet MIME-Type-Sniffing durch den Browser |
| **`Referrer-Policy`** | `strict-origin-when-cross-origin` | Schützt Pfad- und Query-Daten beim Verlassen der Domain |
| **`Permissions-Policy`** | `camera=(), microphone=(), geolocation=()` | Sperrt ungenutzte Hardware- und Browser-APIs |
| **`Cross-Origin-Opener-Policy`** | `same-origin` | Isoliert den Browsing-Kontext gegen Cross-Origin-Leaks |

### CSP-Härtung ohne unsafe-inline und sichere Cookie-Flags

Eine häufige Schwachstelle in scheinbar geschützten Anwendungen sind aufgeweichte CSP-Regeln mit `'unsafe-inline'`, `'unsafe-eval'` oder pauschalen `*`-Wildcards, die den Schutz vor eingeschleustem JavaScript weitgehend neutralisieren. Setzen Sie stattdessen auf kryptografische Nonces (`'nonce-...'`) pro Request oder SHA-256-Hashes für statische Skriptblöcke. Um produktive Seiten beim Rollout nicht versehentlich zu blockieren, starten Sie zuerst mit dem parallelen Header `Content-Security-Policy-Report-Only` samt `report-to`-Endpunkt und werten reale Verstöße aus, bevor die strenge Richtlinie scharfgeschaltet wird.

Ebenso kritisch sind die Attribute in `Set-Cookie`: Session-Cookies benötigen zwingend `Secure` (ausschließlich HTTPS), `HttpOnly` (kein Zugriff über `document.cookie` bei XSS) sowie `SameSite=Lax` oder `SameSite=Strict` gegen Cross-Site Request Forgery (CSRF). Für besonders empfindliche Sitzungs-Tokens erzwingt das Namenspräfix `__Host-` zusätzlich `Secure`, `Path=/` und den Verzicht auf das `Domain`-Attribut.

## CORS-Richtlinien, Preflight-Anfragen und typische Fehlerquellen

Wenn eine Webanwendung unter `https://app.beispiel.de` per `fetch()` auf `https://api.beispiel.de` zugreift, prüft der Browser die **CORS**-Freigabe. Bei nicht-einfachen Anfragen (z. B. `Content-Type: application/json`, `PUT`/`DELETE` oder benutzerdefinierte `Authorization`-Header) schickt der Browser zuerst eine `OPTIONS`-Preflight-Anfrage mit `Origin` und `Access-Control-Request-Method`. Der API-Server muss darauf explizit mit `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods` und `Access-Control-Allow-Headers` antworten.

Ein klassischer Konfigurationsfehler: Wird `Access-Control-Allow-Credentials: true` (für Cookies oder Auth-Sessions) zusammen mit dem Wildcard-Wert `Access-Control-Allow-Origin: *` gesendet, verwirft der Browser die Antwort aus Sicherheitsgründen vollständig. Der Server muss stattdessen den geprüften exakten Origin zurückspiegeln und zwingend `Vary: Origin` ergänzen, damit zwischengeschaltete Caches keine fremden Freigaben ausliefern.

## Caching, Validierung, Kompression und SEO-Header

Neben der Sicherheit steuern HTTP-Header maßgeblich Ladezeit, CDN-Effizienz und Suchmaschinen-Indexierung:

* **Caching & CDN-Trennung**: Unveränderliche Assets mit Datei-Hash erhalten `Cache-Control: public, max-age=31536000, immutable`. Mit `s-maxage` steuern Sie die Haltedauer für Shared Caches (CDNs) unabhängig vom Browser-Cache, während `stale-while-revalidate` sofortige Auslieferung aus dem Cache mit asynchroner Hintergrund-Erneuerung kombiniert.
* **Bedingte Revalidierung via ETag**: Bei dynamischem HTML ermöglicht `Cache-Control: no-cache` in Verbindung mit `ETag` (stark `"abc123"` oder schwach `W/"abc123"`) oder `Last-Modified` extrem schlanke `If-None-Match`-Prüfungen mit Status `304 Not Modified`. Achten Sie in Multi-Server-Clustern darauf, ETags aus dem Dateiinhalt statt aus lokalen Dateisystem-Inodes zu berechnen.
* **Komprimierung**: Der Header `Content-Encoding` zeigt, ob der Server `br` (Brotli, meist 15–25 % kompakter als Gzip bei Text-Assets), `gzip` oder zunehmend `zstd` ausliefert. Stellen Sie sicher, dass parallel `Vary: Accept-Encoding` gesetzt ist.
* **SEO-Steuerung & Weiterleitungen**: Über `X-Robots-Tag: noindex, nofollow` sperren Sie PDF-Dateien, Medien oder Staging-Subdomains direkt auf Protokollebene; `Link: <https://beispiel.de/ziel>; rel="canonical"` setzt kanonische Verweise für Nicht-HTML-Dateien. Vermeiden Sie mehrstufige `Location`-Ketten (`http` → `https` → `www`), da jeder Hop zusätzliche Round-Trip-Latenz erzeugt.

## Typische Audit-Fallen, CLI-Diagnose und Server-Härtung

Achten Sie bei produktiven Header-Audits besonders auf drei häufig übersehene Fehlerquellen: Erstens senden Reverse-Proxy und Anwendungsframework oft widersprüchliche doppelte Header (etwa zwei abweichende `Cache-Control`- oder `X-Frame-Options`-Zeilen), was zu unvorhersehbarem Browser-Verhalten führt. Zweitens sperrt `Strict-Transport-Security` mit `includeSubDomains` sämtliche Subdomains sofort von unverschlüsseltem HTTP aus – aktivieren Sie `preload` erst, wenn alle internen und externen Subdomains gültige TLS-Zertifikate besitzen. Drittens sollten Sie im Nginx-Kontext stets das Schlüsselwort `always` ergänzen, damit Sicherheitsheader auch auf `4xx`- und `5xx`-Fehlerseiten ausgespielt werden.

Zur schnellen Automatisierung in CI/CD-Pipelines lassen sich die Ergebnisse unseres Checkers jederzeit mit `curl` reproduzieren:

```bash
curl -sSLD - -o /dev/null -H "Accept-Encoding: br, gzip" https://beispiel.de
```

Ein kompakter Härtungsblock im Nginx-`server`-Kontext schließt Versionslecks und setzt zentrale Schutz-Header:

```nginx
server_tokens off;
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
```

Nutzen Sie Apache, erzeugen Sie die passenden Header- und Redirect-Direktiven direkt im [.htaccess Generator](/de/werkzeuge/htaccess-generator). Für detaillierte Pfadanalysen mehrstufiger Umleitungen steht Ihnen der [Redirect Checker](/de/werkzeuge/redirect-checker) zur Verfügung, während Sie vorgelagerte Namensauflösungen im [DNS Lookup](/de/werkzeuge/dns-lookup) oder Dateitypen im [MIME Type Checker](/de/werkzeuge/mime-type-checker) überprüfen können.
