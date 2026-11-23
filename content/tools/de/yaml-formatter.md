---
metaTitle: "YAML Formatter & Validator | Kubernetes & JSON Konverter"
metaDescription: "Formatieren, validieren und minifizieren Sie YAML 1.2 lokal im Browser. Ideal für Kubernetes-Manifeste, Docker Compose, GitHub Actions und JSON."
metaKeywords: "yaml formatter, yaml validator, yaml beautifier, kubernetes yaml prüfen, yaml in json umwandeln, yaml 1.2 parser, docker compose validator, yaml einrückung"
title: "YAML Formatter & Beautifier"
shortDescription: "Formatieren, validieren, linten und konvertieren Sie YAML-1.2-Dokumente inklusive Multi-Dokument-Manifesten für Kubernetes, Docker Compose und CI/CD lokal im Browser."
faqs:
  - question: "Warum verbietet die YAML-Spezifikation Tabulatorzeichen zur Einrückung?"
    answer: "Tabulatoren werden je nach Editor als 2, 4 oder 8 Spalten gerendert, wodurch die hierarchische Verschachtelung in YAML mehrdeutig würde. Die Spezifikation schreibt daher zwingend Leerzeichen (ASCII 0x20) für strukturelle Einrückungen vor; ein einzelner Tab führt sofort zu einem Parser-Fehler."
  - question: "Was ist das berühmte Norway-Problem in YAML 1.1 und YAML 1.2?"
    answer: "Unter YAML 1.1 wurden unquotierte Werte wie NO, yes, on oder off automatisch als boolesche Werte (false/true) interpretiert – das Länderkürzel NO für Norwegen wurde also zu false. YAML 1.2 (Core Schema) beschränkt Booleans auf true und false, doch viele ältere Parser nutzen noch YAML 1.1, weshalb Quoting kritischer Strings weiterhin Pflicht bleibt."
  - question: "Unterstützt der Formatter Kubernetes-Dateien mit mehreren Dokumenten?"
    answer: "Ja. Mehrteilige YAML-Streams, die über das Dokument-Trennzeichen --- (und optional ... am Ende) mehrere Kubernetes-Objekte wie Deployment, Service und Ingress in einer Datei bündeln, werden sauber getrennt geparst, validiert und konsistent formatiert."
  - question: "Worin unterscheiden sich die Block-Skalar-Indikatoren | und > in YAML?"
    answer: "Der Literal-Indikator | erhält sämtliche Zeilenumbrüche exakt wie geschrieben – ideal für eingebettete Shell-Skripte oder Zertifikate. Der Folded-Indikator > wandelt einfache Zeilenumbrüche in Leerzeichen um, damit lange Fließtexte übersichtlich umgebrochen werden können."
  - question: "Bleiben vertrauliche Secrets und Kubernetes-Konfigurationen lokal auf meinem Rechner?"
    answer: "Ja. Parsing, Validierung, JSON-Konvertierung und Diff-Vergleich laufen vollständig clientseitig in JavaScript in Ihrem Browser. Keine Konfigurationsdatei wird an einen Server übertragen oder protokolliert."
features:
  - "Deterministische YAML-Formatierung mit wählbarer Einrückungsbreite (2 oder 4 Leerzeichen) und optionaler Schlüssel-Sortierung"
  - "Echtzeit-Syntaxvalidierung mit exakter Zeilen- und Spaltenangabe sowie Erkennung doppelter Mapping-Schlüssel"
  - "Vollständige Unterstützung für Multi-Dokument-YAML-Streams (--- / ...) in Kubernetes- und Helm-Manifesten"
  - "Bidirektionale Konvertierung zwischen YAML und JSON inklusive Validierung von Datentypen und Verschachtelungen"
  - "Korrekte Verarbeitung von Block-Skalaren (|, |-, |+, >, >-), Ankern (&) und Aliasen (*)"
  - "100 % lokale Browser-Ausführung ohne Cloud-Upload für produktive DevOps- und Infrastruktur-Dateien"
useCases:
  - "Bereinigen und Validieren mehrteiliger Kubernetes-Manifeste und Helm-Values vor kubectl apply"
  - "Prüfen von Docker-Compose-Dateien auf Einrückungsfehler, doppelte Keys und falsche Port-Typen"
  - "Fehlersuche in GitHub-Actions-, GitLab-CI- und Azure-Pipelines-Workflows bei fehlerhaften Trigger-Blöcken"
  - "Konvertierung von OpenAPI-3.x-Spezifikationen (Swagger) zwischen YAML und JSON für API-Clients"
  - "Standardisierung von Ansible-Playbooks und Terraform-/Cloud-Init-Konfigurationen im Team"
  - "Vergleich von Original- und refaktorierten Konfigurationsständen vor einem Pull Request"
howToSteps:
  - "Fügen Sie Ihr rohes YAML in das Eingabefeld ein oder laden Sie eine lokale .yaml- oder .yml-Datei."
  - "Prüfen Sie die sofortige Validierungsanzeige; bei Syntaxfehlern springen Sie direkt zur markierten Zeile und Spalte."
  - "Wählen Sie die gewünschte Einrückungsbreite (Standard im Cloud-Native-Ökosystem sind 2 Leerzeichen)."
  - "Klicken Sie auf Formatieren für saubere Block-Struktur oder auf Minifizieren für kompakte Weitergabe."
  - "Wechseln Sie bei Bedarf in den Konvertierungsmodus, um das Dokument verlustfrei nach JSON zu überführen oder umgekehrt."
  - "Kopieren Sie das validierte Ergebnis oder laden Sie es als saubere Konfigurationsdatei herunter."
---

In modernen Cloud-Native- und DevOps-Umgebungen steuert **YAML** (*YAML Ain't Markup Language*) nahezu die gesamte Infrastruktur – von Kubernetes-Manifesten und Docker-Compose-Stacks über GitHub Actions bis hin zu Ansible-Playbooks und OpenAPI-Spezifikationen. Weil YAML ohne geschweifte Klammern auskommt und Hierarchien rein über Einrückung definiert, liest es sich deutlich angenehmer als JSON, reagiert aber extrem empfindlich auf unsichtbare Leerzeichenfehler, Tabulatoren oder implizite Typumwandlungen. Der **YAML Formatter & Beautifier** prüft Dokumente clientseitig gegen die YAML-Spezifikation, meldet präzise Zeilen- und Spaltenfehler, normalisiert die Struktur deterministisch und konvertiert nahtlos zwischen YAML und JSON.

## YAML 1.2 vs. YAML 1.1: Schemas, Parser-Interna und Fallstricke

Seit **YAML 1.2** ist die Sprache ein echtes Superset von JSON: Jedes gültige JSON-Dokument ist zugleich gültiges YAML 1.2. Die Spezifikation unterscheidet dabei drei Typauflösungs-Schemas – das **Failsafe Schema** (alle Skalare bleiben Strings), das **JSON Schema** (strikt JSON-kompatible Typen) und das **Core Schema** (Standard in modernen Parsern, erkennt u. a. `null`, `~`, `0x`-Hex- und `0o`-Oktalwerte). In der Praxis laufen jedoch noch viele ältere Werkzeuge (wie klassische PyYAML-Deployments oder Legacy-CI-Runner) auf **YAML 1.1**, was wiederkehrende Bugs verursacht:

- **Das Norway-Problem (implizite Booleans)**: In YAML 1.1 werden unquotierte Werte wie `yes`, `no`, `on`, `off`, `y`, `n` als Wahrheitswerte geparst. Eine Länderliste `[DE, AT, CH, NO]` mutiert dort lautlos zu `["DE", "AT", "CH", false]`. Besonders tückisch ist der Top-Level-Schlüssel `on:` in GitHub Actions, den manche Linter fälschlich als `true:` auswerten.
- **Implizite Oktal- und Sexagesimalzahlen**: Dateiberechtigungen wie `mode: 0755` oder Docker-Port-Mappings wie `22:22` werden in YAML-1.1-Parsern als Oktalzahl (`493`) beziehungsweise Basis-60-Wert (`1342`) fehlinterpretiert. Setzen Sie Ports, Versionsnummern (`"1.10"`, sonst wird daraus die Fließkommazahl `1.1`) und Dateirechte daher stets explizit in Anführungszeichen.
- **Tabulatoren (`\t`)**: Ein einziges Tabulatorzeichen in der strukturellen Einrückung verletzt die Grammatik und bricht den Parse-Vorgang sofort ab.
- **Doppelte Schlüssel**: Viele Parser überschreiben doppelte Mapping-Keys stillschweigend mit dem letzten Eintrag. Ein strenges Linting deckt solche Kollisionen auf, bevor ein Deployment fehlerhafte Umgebungsvariablen übernimmt.

## Block-Skalare, Chomping-Indikatoren und Anker richtig einsetzen

Gerade bei eingebetteten Shell-Skripten, TLS-Zertifikaten oder langen Beschreibungen in ConfigMaps entscheiden die **Block-Skalar-Indikatoren** über korrekte Zeilenumbrüche am Textende (*Chomping*):

| Indikator | Stil | Zeilenumbrüche im Text | Abschließende Leerzeilen (Chomping) | Typischer Einsatzfall |
| :--- | :--- | :--- | :--- | :--- |
| `\|` | Literal (Clip) | Exakt erhalten | Genau ein finaler Zeilenumbruch (`\n`) | Mehrzeilige Shell-Befehle, Konfigurationsdateien |
| `\|-` | Literal (Strip) | Exakt erhalten | Alle abschließenden Umbrüche entfernt | API-Tokens, PEM-Blöcke ohne Trailing-Newline |
| `\|+` | Literal (Keep) | Exakt erhalten | Alle abschließenden Leerzeilen erhalten | Formattreue Vorlagen mit exaktem Padding |
| `>` | Folded (Clip) | Einzelne Umbrüche → Leerzeichen | Genau ein finaler Zeilenumbruch (`\n`) | Lange Beschreibungen in OpenAPI oder Helm |
| `>-` | Folded (Strip) | Einzelne Umbrüche → Leerzeichen | Alle abschließenden Umbrüche entfernt | Einzeilige CLI-Argumentketten über mehrere Zeilen |
| `>+` | Folded (Keep) | Einzelne Umbrüche → Leerzeichen | Alle abschließenden Leerzeilen erhalten | Selten; strukturierte Textblöcke mit Nachlauf |

Für wiederkehrende Blöcke bietet YAML **Anker (`&name`)**, **Aliase (`*name`)** und den weit verbreiteten Merge-Key (`<<: *name`). Aus Sicherheitsgründen begrenzen gehärtete Parser allerdings die Expansionstiefe, um sogenannte **Billion-Laughs-Angriffe** (exponentielle Speichererschöpfung durch verschachtelte Aliase) zu unterbinden. Achten Sie bei der Konvertierung nach JSON außerdem darauf, keine rein YAML-spezifischen Konstrukte wie komplexe Mapping-Schlüssel (`? [a, b]`) oder nicht-String-Keys zu verwenden, da JSON ausschließlich Zeichenketten als Objektschlüssel erlaubt.

## Praxisbeispiel: Sauberes Multi-Dokument-Kubernetes-Manifest

Das folgende Beispiel illustriert bewährte YAML-Konventionen – konsistente 2-Leerzeichen-Einrückung, Multi-Dokument-Trenner `---`, explizit gequotete kritische Werte, Anker-Wiederverwendung und Literal-Block-Skalare:

```yaml
# Dokument 1: Konfigurationsdaten mit striktem Literal-Block
apiVersion: v1
kind: ConfigMap
metadata:
  name: api-gateway-config
  labels: &common-labels
    app: billing-api
    region: "NO"
data:
  startup.sh: |-
    #!/bin/sh
    set -eu
    exec /usr/local/bin/gateway --port 8080
---
# Dokument 2: Deployment mit Wiederverwendung der Labels
apiVersion: apps/v1
kind: Deployment
metadata:
  name: billing-api
  labels:
    <<: *common-labels
spec:
  replicas: 3
  template:
    metadata:
      labels:
        <<: *common-labels
    spec:
      containers:
        - name: gateway
          image: registry.example.de/billing-api:2.4.0
          ports:
            - containerPort: 8080
```

## Helm-Templating, Minifizierung und CI-Linting-Regeln

Bei der Arbeit mit **Helm-Charts** entsteht ein besonders häufiges Fehlerbild durch gerenderte Go-Templates: Fehlt beim Einfügen mehrzeiliger Werte die Funktion `toYaml ... | nindent 8`, verschiebt sich die Einrückung aller Folgezeilen, was erst beim Ausführen von `helm template` als gültigkeitsbrechender Syntaxfehler auffällt. Übernehmen Sie die gerenderte Ausgabe direkt in den Formatter, identifizieren Sie verrutschte Listen und falsche Verschachtelungen innerhalb weniger Sekunden.

In professionellen Teams bewährt sich zudem eine verbindliche Linting-Richtlinie (analog zu `yamllint` in CI-Pipelines): durchgehend **2 Leerzeichen Einrückung**, Block-Stil statt schwer lesbarem Flow-Stil (`{a: 1, b: [2, 3]}`), keine nachgestellten Leerzeichen am Zeilenende (*Trailing Spaces*), eindeutige Schlüssel pro Ebene sowie explizite Dokumenttrenner `---` in mehrteiligen Streams. Während für Versionskontrolle und Code-Reviews stets die lesbare Block-Darstellung Vorrang hat, eignet sich die **YAML-Minifizierung** über kompakte Flow-Syntax gezielt für enge Umgebungsvariablen, CLI-Übergaben oder maschinell generierte Payloads, bei denen Kommentare und Einrückungs-Overhead eingespart werden sollen.

## Typische Fehlermeldungen und JSON-Interoperabilität

Meldet `kubectl` oder Docker Compose den Fehler `mapping values are not allowed in this context`, liegt fast immer ein unquotierter Doppelpunkt mit nachfolgendem Leerzeichen innerhalb eines Strings vor (etwa `message: Fehler: Timeout erreicht` statt `message: "Fehler: Timeout erreicht"`) oder eine um ein Leerzeichen verrutschte Einrückungsebene. Auch kopierte Konfigurationsblöcke aus Wikis oder Chat-Verläufen schleusen häufig geschützte Leerzeichen (Unicode `U+00A0`) oder typografische Anführungszeichen ein, die im Editor kaum sichtbar sind, aber den Parser zuverlässig abbrechen lassen. Durch sofortiges Re-Formatieren im Editor springt jeder strukturelle Versatz unmittelbar ins Auge und lässt sich vor dem Commit gezielt beheben.

Wenn Sie YAML-Konfigurationen für REST-APIs, JSON-Schema-Validatoren oder Cloud-IAM-Policies weiterverarbeiten müssen, wandelt der Konverter das Dokument direkt in valides JSON um, das sich anschließend im [JSON Formatter](/de/werkzeuge/json-formatter) verfeinern lässt. Für das präzise Review von Änderungen zwischen Staging- und Produktions-Manifesten empfiehlt sich der [Diff-Checker](/de/werkzeuge/diff-checker); bei älteren Enterprise-Schnittstellen steht ergänzend der [XML Formatter](/de/werkzeuge/xml-formatter) bereit. So sichern Sie reproduzierbare, fehlerfreie Infrastruktur-Konfigurationen über alle Entwicklungs- und Deployment-Stufen hinweg.
