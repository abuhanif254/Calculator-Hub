---
metaTitle: "Cron Expression Generator & Tester: POSIX, K8s & UTC"
metaDescription: "Erstellen und testen Sie 5-Felder-Cron-Ausdrücke für Linux Crontab, Kubernetes, GitHub Actions und Vercel direkt im Browser. Inkl. Zeitplan-Vorschau."
metaKeywords: "Cron Expression Generator, Crontab Tester, 5 Felder Cron Syntax, Kubernetes CronJob Schedule, GitHub Actions Cron, Vercel Cron, UTC Sommerzeit Fehler"
title: "Cron Expression Generator & Zeitplan-Tester"
shortDescription: "Generieren, validieren und übersetzen Sie 5-Felder-POSIX-Cron-Ausdrücke in lesbare Zeitpläne direkt im Browser. Berechnen Sie die nächsten Ausführungszeitpunkte und vermeiden Sie Zeitzonen- sowie Sommerzeit-Fallen."
faqs:
  - question: "Welche Cron-Syntax unterstützt dieser Generator?"
    answer: "Der Generator arbeitet mit der standardisierten 5-Felder-POSIX-Crontab-Syntax (Minute, Stunde, Tag des Monats, Monat, Wochentag). Dieses Format wird von Linux-Crontabs, Kubernetes CronJobs, GitHub Actions und Vercel Cron Jobs direkt akzeptiert."
  - question: "Warum gibt es beim Wochentag sowohl 0 als auch 7 für Sonntag?"
    answer: "Historisch bedingt verwenden einige Unix-Implementierungen 0 bis 6 (Sonntag bis Samstag), während andere 1 bis 7 nutzen. Moderne Cron-Daemons wie Vixie-Cron und Kubernetes akzeptieren aus Kompatibilitätsgründen sowohl 0 als auch 7 als Sonntag."
  - question: "Was passiert bei einem Cron-Job um 02:30 Uhr während der Zeitumstellung?"
    answer: "In Zeitzonen mit Sommerzeit (wie Europe/Berlin) existiert 02:30 Uhr bei der Umstellung im März nicht – der Job wird übersprungen. Bei der Rückstellung im Oktober tritt 02:30 Uhr zweimal auf, sodass ein lokal geplanter Job doppelt laufen kann."
  - question: "Werden meine Infrastruktur-Zeitpläne auf einen Server hochgeladen?"
    answer: "Nein. Die gesamte Syntaxprüfung, Human-Readable-Übersetzung und Berechnung kommender Ausführungszeitpunkte findet zu 100 % clientseitig in Ihrem Browser statt."
  - question: "Warum verhalten sich Tag des Monats und Wochentag gemeinsam unerwartet?"
    answer: "Nach POSIX-Spezifikation werden beide Felder mit einem logischen ODER verknüpft, sobald keines von beiden ein Sternchen (*) trägt. Der Ausdruck 0 9 15 * 1 läuft daher an jedem 15. des Monats UND zusätzlich an jedem Montag."
features:
  - "Interaktiver Builder für die 5-Felder-POSIX-Syntax mit Sofortvalidierung"
  - "Automatische Übersetzung komplexer Cron-Strings in präzises, verständliches Deutsch"
  - "Vorschau der nächsten anstehenden Ausführungszeitpunkte in UTC und lokaler Zeitzone"
  - "Unterstützung von Schrittwerten (/), Bereichen (-), Listen (,) und Kurzmakros (@daily)"
  - "Vollständig clientseitige Berechnung ohne Weitergabe interner Deployment-Daten"
useCases:
  - "Konfiguration periodischer Datenbank-Backups und Log-Rotationen auf Linux-Servern"
  - "Planung von Kubernetes CronJobs in Produktiv-Clustern mit expliziter Zeitzonenangabe"
  - "Einrichtung nächtlicher CI/CD-Builds und Sicherheitsscans in GitHub Actions"
  - "Scheduling serverloser Wartungs-Endpunkte über vercel.json in Next.js-Projekten"
  - "Debugging fehlerhafter Legacy-Crontabs und Vermeidung von Doppelausführungen"
howToSteps:
  - "Geben Sie einen bestehenden 5-Felder-Cron-Ausdruck ein oder wählen Sie die gewünschten Intervalle über die Felder."
  - "Prüfen Sie die automatisch generierte textuelle Beschreibung, um die Logik gegenzuchecken."
  - "Kontrollieren Sie die berechnete Liste der nächsten Ausführungszeitpunkte inklusive Zeitzonen-Offset."
  - "Kopieren Sie den validierten Ausdruck direkt in Ihre Crontab, Kubernetes-YAML oder GitHub-Workflow-Datei."
---

Zeitgesteuerte Hintergrundprozesse bilden das Rückgrat moderner Infrastruktur – von nächtlichen Datenbank-Dumps über automatisierte Zertifikatserneuerungen bis hin zu periodischen Data-Sync-Pipelines. Dennoch zählt die kompakte fünfstellige Crontab-Notation zu den häufigsten Fehlerquellen bei Deployments: Ein versehentlich gesetztes Sternchen im Minutenfeld oder eine verkannte ODER-Logik beim Wochentag kann tausende ungewollte Job-Starts auslösen. Dieser Cron Expression Generator & Zeitplan-Tester validiert Ihre Ausdrücke sofort und übersetzt sie in eindeutige Ausführungszeitpunkte.

Aus Sicherheits- und Datenschutzgründen arbeitet das Werkzeug zu 100 % clientseitig in Ihrem Browser. Ihre internen Betriebszeiten, Wartungsfenster und Deployment-Konfigurationen werden weder an einen Backend-Server übertragen noch dort gespeichert. Sie können selbst vertrauliche Produktions-Schedules für Finanzabschlüsse oder Sicherheitsscans bedenkenlos im Browser testen.

## Technische Architektur: 5-Felder-POSIX-Syntax und Plattform-Dialekte

Die klassische POSIX-Crontab-Notation besteht aus exakt fünf durch Leerzeichen getrennten Feldern, die von links nach rechts immer größere Zeiteinheiten abdecken:

```text
┌───────────── Minute (0 - 59)
│ ┌───────────── Stunde (0 - 23)
│ │ ┌───────────── Tag des Monats (1 - 31)
│ │ │ ┌───────────── Monat (1 - 12 oder JAN - DEC)
│ │ │ │ ┌───────────── Wochentag (0 - 6 oder SUN - SAT; 7 = Sonntag)
│ │ │ │ │
* * * * *
```

Jedes Feld unterstützt vier Basis-Operatoren: den Platzhalter `*` (jeder gültige Wert), Aufzählungen mit Komma (`1,15,30`), geschlossene Bereiche mit Bindestrich (`1-5` für Montag bis Freitag) sowie Schrittintervalle mit Schrägstrich (`*/15` für alle 15 Einheiten). Viele Systeme akzeptieren zudem vordefinierte Makros wie `@hourly` (`0 * * * *`), `@daily` (`0 0 * * *`) oder `@weekly` (`0 0 * * 0`). Beachten Sie bei Schrittintervallen wie `*/7` im Minutenfeld, dass der Cron-Daemon stets bei `0` startet und die Ausführungsminuten `0, 7, 14, 21, 28, 35, 42, 49, 56` wählt – zwischen Minute `56` und `0` der Folgestunde vergehen also nur vier statt sieben Minuten.

Wichtig für Entwickler ist die Unterscheidung zu erweiterten 6- oder 7-Felder-Dialekten (etwa Quartz in Java oder Spring Cron mit führendem Sekundenfeld und Spezialzeichen wie `L`, `W` oder `?`). Plattformen wie **Linux Crontab**, **Kubernetes `CronJob`**, **GitHub Actions** und **Vercel Cron** verlangen strikt das klassische 5-Felder-Format. Ein Sekundenfeld würde dort entweder zu einem Validierungsfehler beim Deployment führen oder die Minutenposition falsch interpretieren. Auch benannte Monate (`JAN-DEC`) und Wochentage (`MON-FRI`) werden in manchen minimalistischen Container-Images wie BusyBox-`crond` nicht einheitlich geparst, weshalb numerische Angaben in portablen Konfigurationen die sicherere Wahl bleiben.

## Praxis-Walkthrough: Kubernetes, GitHub Actions und Vercel konfigurieren

Angenommen, Sie möchten einen Abrechnungs- und Bereinigungs-Job einrichten, der werktags (Montag bis Freitag) um 03:15 Uhr UTC ausgeführt wird. Der korrekte Ausdruck lautet `15 3 * * 1-5`. Im Folgenden sehen Sie die konkrete Einbindung in drei verbreiteten DevOps-Umgebungen:

**1. Kubernetes CronJob (`spec.schedule`):**
Seit Kubernetes 1.27 ist das Feld `spec.timeZone` stabil (GA). Zusammen mit `concurrencyPolicy: Forbid` verhindern Sie überlappende Läufe bei langsamen Tasks, während `startingDeadlineSeconds` festlegt, wie lange ein verpasster Start nach einem Node-Neustart noch nachgeholt werden darf:

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: billing-reconciliation
spec:
  schedule: "15 3 * * 1-5"
  timeZone: "Etc/UTC"
  concurrencyPolicy: "Forbid"
  startingDeadlineSeconds: 300
  jobTemplate:
    spec:
      template:
        spec:
          restartPolicy: OnFailure
          containers:
            - name: worker
              image: registry.example.com/billing-worker:1.4.2
```

**2. GitHub Actions (`.github/workflows/nightly.yml`):**
GitHub Actions wertet Cron-Ausdrücke grundsätzlich in **UTC** aus. Beachten Sie, dass zu vollen Stunden (z. B. `0 0 * * *`) wegen hoher Last auf den GitHub-Runnern Verzögerungen von einigen Minuten auftreten können; ungerade Minuten wie `17 3 * * 1-5` starten deutlich zuverlässiger. Zudem pausiert GitHub geplante Workflows automatisch, wenn in einem öffentlichen Repository 60 Tage lang keine Aktivität stattfand.

**3. Vercel Cron Jobs (`vercel.json`):**
Auch Vercel interpretiert alle Zeitpläne strikt in UTC und löst HTTP-GET-Requests auf den definierten API-Route-Handler aus. Schützen Sie diesen Endpunkt im Code zwingend über den `Authorization: Bearer ${CRON_SECRET}`-Header, damit externe Angreifer den Job nicht manuell triggern können:

```json
{
  "crons": [
    {
      "path": "/api/cron/cleanup",
      "schedule": "15 3 * * 1-5"
    }
  ]
}
```

## Referenz-Tabelle: Häufige Cron-Muster für Entwickler

| Cron-Ausdruck | Bedeutung (UTC) | Typischer Anwendungsfall | Hinweis zur Ausführung |
| :--- | :--- | :--- | :--- |
| `*/5 * * * *` | Alle 5 Minuten | Health-Checks, Queue-Polling | Startet bei Minute 00, 05, 10 usw. |
| `0 * * * *` | Jede volle Stunde | Metrik-Aggregation, Cache-Warmup | Entspricht dem Makro `@hourly` |
| `30 2 * * *` | Täglich um 02:30 Uhr | Nächtliche Datenbank-Backups | Vorsicht bei lokaler DST-Zeitzone |
| `0 9 * * 1-5` | Mo–Fr um 09:00 Uhr | Tägliche Business-Reports | Wochenende (0, 6, 7) ausgeschlossen |
| `0 0 1 * *` | Am 1. jeden Monats | Monatliche Rechnungsstellung | Läuft um Mitternacht `00:00` |
| `0 */6 * * *` | Alle 6 Stunden | SSL- oder Token-Synchronisation | Läuft um 00:00, 06:00, 12:00, 18:00 |

## Produktions-Fallstricke: UTC vs. Sommerzeit und POSIX-ODER-Logik

In produktiven Umgebungen führen insbesondere vier Mechanismen immer wieder zu Ausfällen oder unerwarteter Last:

- **UTC vs. Sommerzeit (DST / MEZ & MESZ):** Läuft ein Cron-Daemon in `Europe/Berlin`, springt die Systemuhr am letzten Sonntag im März von `01:59:59` direkt auf `03:00:00`. Ein für `30 2 * * *` geplanter Job wird an diesem Tag ersatzlos übersprungen. Im Oktober wird die Stunde zwischen `02:00` und `03:00` hingegen doppelt durchlaufen, was zu doppelten Abrechnungen oder Race Conditions führen kann. Konfigurieren Sie Server-Crontabs und Cluster-Schedules daher konsequent in **UTC** und passen Sie geschäftskritische Uhrzeiten bei Bedarf explizit über die Anwendungslogik an.
- **Die POSIX-ODER-Falle bei Datum und Wochentag:** Viele Entwickler schreiben `0 8 1-7 * 1` in der Annahme, der Job laufe nur am ersten Montag des Monats. Tatsächlich verknüpft POSIX die Felder *Tag des Monats* und *Wochentag* per ODER, sobald beide eingeschränkt sind. Das Resultat: Der Job läuft an den ersten sieben Tagen des Monats *und* an jedem Montag. Um ausschließlich den ersten Montag zu treffen, müssen Sie den Zeitplan auf jeden Montag (`0 8 * * 1`) setzen und das genaue Datum (`day <= 7`) im Anwendungscode prüfen.
- **Vergessenes Locking bei langen Jobs:** Cron garantiert keine Exklusivität. Dauert ein minütlicher Job 75 Sekunden, laufen zwei Instanzen parallel. Nutzen Sie auf Linux-Systemen `flock` (z. B. `/usr/bin/flock -n /tmp/job.lock`) oder in Kubernetes `concurrencyPolicy: Forbid`, um parallele Zugriffe und Speicherengpässe auszuschließen.
- **Fehlende Idempotenz und Alerting:** Da cloudbasierte Scheduler bei Netzwerkfehlern oder Node-Ausfällen einen Lauf verzögert nachholen oder zweimal anstoßen können, sollte jeder Cron-Handler vollständig idempotent arbeiten und per Dead-Man's-Switch überwacht werden.
