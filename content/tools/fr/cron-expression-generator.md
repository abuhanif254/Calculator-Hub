---
metaTitle: "Générateur d'expressions Cron et testeur POSIX 5 champs"
metaDescription: "Créez et validez vos tâches planifiées Cron POSIX à 5 champs pour Linux, Kubernetes, GitHub Actions et Vercel. Visualisez les prochaines exécutions en UTC."
metaKeywords: "generateur cron, expression crontab, syntaxe cron 5 champs, kubernetes cronjob, github actions schedule, vercel cron, utc dst cron, testeur planification"
title: "Générateur d'expressions Cron et testeur de planification"
shortDescription: "Construisez des expressions Cron POSIX à 5 champs, obtenez leur traduction claire en français et prévisualisez les prochaines dates d'exécution."
faqs:
  - question: "Que signifient les cinq champs d'une expression Cron POSIX standard ?"
    answer: "De gauche à droite, les cinq champs représentent la minute (0 à 59), l'heure (0 à 23), le jour du mois (1 à 31), le mois (1 à 12) et le jour de la semaine (0 à 6 ou 0 à 7, où 0 et 7 désignent le dimanche)."
  - question: "Pourquoi une expression avec jour du mois et jour de la semaine s'exécute-t-elle trop souvent ?"
    answer: "Selon la norme POSIX et Vixie cron, lorsque le champ jour du mois et le champ jour de la semaine sont tous deux restreints (différents de *), l'ordonnanceur applique un OU logique : la tâche se déclenche si l'une ou l'autre des deux conditions est vraie."
  - question: "GitHub Actions et Vercel utilisent-ils l'heure locale ou UTC ?"
    answer: "Les ordonnanceurs cloud modernes comme GitHub Actions et Vercel Cron évaluent exclusivement les expressions Cron en temps universel coordonné (UTC). Il faut donc convertir vos horaires locaux en UTC avant de déployer le fichier de configuration."
  - question: "Comment éviter les bugs lors du passage à l'heure d'été (DST) ?"
    answer: "Configurez vos démons cron Linux et vos CronJobs Kubernetes sur le fuseau UTC. Dans un fuseau avec heure d'été comme Europe/Paris, une tâche prévue à 02:30 est sautée au printemps et exécutée deux fois en automne."
  - question: "Cet outil envoie-t-il mes plannings de tâches vers un serveur ?"
    answer: "Non. L'analyse de la syntaxe Cron, la traduction en langage naturel et le calcul des prochains créneaux d'exécution sont effectués intégralement dans votre navigateur sans aucune requête réseau."
features:
  - "Validation syntaxique immédiate des 5 champs POSIX et des opérateurs *, virgule, tiret et slash"
  - "Traduction automatique en français lisible de la fréquence de déclenchement"
  - "Calcul des prochaines dates et heures d'exécution pour vérifier les cas limites de calendrier"
  - "Prise en charge des spécificités Linux crontab, Kubernetes CronJob, GitHub Actions et Vercel"
  - "Traitement 100 % local dans le navigateur pour protéger la confidentialité de votre infrastructure"
useCases:
  - "Planifier des sauvegardes de bases de données PostgreSQL pendant les heures creuses en UTC"
  - "Configurer le déclenchement automatique schedule d'un workflow GitHub Actions nocturne"
  - "Vérifier l'horaire exact d'un CronJob Kubernetes avant d'appliquer le manifeste YAML"
  - "Mettre en place un appel périodique d'endpoint Serverless sur Vercel Cron"
  - "Auditer une ancienne crontab serveur pour comprendre une fréquence complexe avec intervalles"
howToSteps:
  - "Saisissez une expression Cron à 5 champs existante ou utilisez les sélecteurs par champ."
  - "Vérifiez la description textuelle en français pour confirmer l'absence d'ambiguïté logique."
  - "Consultez la liste des prochaines exécutions prévues afin de contrôler les transitions de mois ou de week-end."
  - "Copiez l'expression validée directement dans votre crontab, manifeste Kubernetes ou workflow CI/CD."
---

La syntaxe Cron demeure le standard universel pour automatiser les tâches récurrentes sous Linux, dans les clusters Kubernetes et au sein des plateformes CI/CD ou Serverless. Pourtant, une simple confusion entre le jour du mois et le jour de la semaine, ou un oubli de décalage horaire, peut provoquer des déclenchements intempestifs ou sauter des sauvegardes critiques. Ce générateur et testeur vous aide à concevoir des expressions fiables et à prévisualiser leurs prochaines occurrences.

Pour préserver la confidentialité de vos architectures et de vos fenêtres de maintenance, l'ensemble du parseur et du calculateur d'occurrences s'exécute à 100 % dans votre navigateur. Aucune chaîne de planification ni aucune donnée de configuration n'est envoyée vers un serveur tiers.

## Spécification POSIX à 5 champs et variantes d'ordonnanceurs

Une expression Cron classique conforme à la spécification POSIX et à Vixie cron se compose exactement de cinq champs séparés par des espaces : `minute` (`0–59`), `heure` (`0–23`), `jour_du_mois` (`1–31`), `mois` (`1–12`) et `jour_de_la_semaine` (`0–6` ou `0–7`, `0` et `7` désignant le dimanche). Quatre opérateurs de base permettent d'exprimer les périodicités : le joker `*` (toutes les valeurs), la liste `,` (`1,15`), la plage `-` (`1-5` pour du lundi au vendredi) et le pas `/` (`*/15` pour toutes les 15 unités à partir du début de l'intervalle).

Une particularité historique piège régulièrement les développeurs : lorsque le champ `jour_du_mois` et le champ `jour_de_la_semaine` contiennent tous deux une valeur spécifique (autre que `*`), l'ordonnanceur les combine par un **OU logique** et non par un ET. Ainsi, `0 3 15 * 1` ne s'exécute pas uniquement les lundis tombant un 15, mais tous les 15 du mois ainsi que tous les lundis à 03:00.

De plus, chaque plateforme introduit des subtilités d'implémentation. Linux `crontab` utilise le fuseau horaire du système (ou la variable `CRON_TZ`), Kubernetes `CronJob` supporte le champ `spec.timeZone` depuis la version 1.27 tout en conservant UTC par défaut, tandis que GitHub Actions et Vercel Cron imposent strictement le fuseau UTC et n'acceptent pas les extensions non standard à 6 ou 7 champs incluant les secondes ou l'année.

## Mise en œuvre pratique : planifier une sauvegarde et un job CI/CD

Supposons que vous deviez lancer une sauvegarde incrémentale toutes les 15 minutes du lundi au vendredi pendant les heures ouvrées UTC (`08:00` à `18:59`), puis déclencher un audit de dépendances GitHub Actions chaque dimanche à `04:30 UTC`. Voici comment décliner ces expressions de manière portable sur vos environnements :

```yaml
# Manifeste Kubernetes CronJob (sauvegarde en semaine, toutes les 15 min)
apiVersion: batch/v1
kind: CronJob
metadata:
  name: pg-incremental-backup
spec:
  schedule: "*/15 8-18 * * 1-5"
  timeZone: "UTC"
  concurrencyPolicy: Forbid
```

Pour votre pipeline GitHub Actions ou votre fichier `vercel.json`, la syntaxe reste identique à 5 champs :

```yaml
# Workflow GitHub Actions : audit hebdomadaire le dimanche à 04:30 UTC
on:
  schedule:
    - cron: "30 4 * * 0"
```

Avant de valider la mise en production, vérifiez systématiquement les 5 à 10 prochaines exécutions calculées par l'outil. Pour `*/15 8-18 * * 1-5`, vous constaterez que la première exécution du matin a lieu à `08:00:00`, la dernière de la journée à `18:45:00`, et qu'aucun déclenchement n'apparaît le samedi ni le dimanche.

## Tableau de référence de la syntaxe Cron et des plateformes

Le tableau suivant réunit des expressions courantes et résume la prise en charge des principales plateformes d'exécution :

| Expression Cron (5 champs) | Fréquence exacte | Cas d'usage type | Compatibilité (Linux / K8s / GH Actions / Vercel) |
| --- | --- | --- | --- |
| `*/5 * * * *` | Toutes les 5 minutes | Sondage de file d'attente, métriques | Linux, K8s, GH Actions (minimum 5 min), Vercel (Pro) |
| `0 * * * *` | Au début de chaque heure (`HH:00`) | Agrégation horaire, rotation de cache | Universelle (toutes plateformes) |
| `17 2 * * *` | Tous les jours à `02:17` | Purge de sessions en évitant le pic `:00` | Universelle (toutes plateformes) |
| `0 9-17 * * 1-5` | Chaque heure de `09:00` à `17:00`, lun-ven | Synchronisation CRM en heures ouvrées | Universelle (toutes plateformes) |
| `0 0 1 * *` | Le 1er de chaque mois à `00:00` | Facturation mensuelle, archivage | Universelle (toutes plateformes) |
| `30 4 * * 0` | Chaque dimanche à `04:30` | Audit sécurité, réindexation complète | Universelle (toutes plateformes) |

## Pièges en production : UTC vs heure d'été (DST) et concurrence

En production, la majorité des incidents liés aux tâches planifiées proviennent du temps et de la concurrence plutôt que d'une erreur de syntaxe :

- **Pièges de l'heure d'été (DST)** : dans un fuseau comme `Europe/Paris`, le passage à l'heure d'été supprime l'heure de `02:00` à `02:59` ; toute tâche planifiée dans cette plage est tout simplement ignorée. Inversement, lors du retour à l'heure d'hiver, la plage `02:00` à `02:59` survient deux fois, entraînant une double exécution potentiellement destructrice pour une facturation ou un envoi d'e-mails. Exécutez toujours vos crons en **UTC**.
- **Effet troupeau à minuit pile (`0 0 * * *`)** : planifier toutes les tâches à `:00` provoque des pics de contention CPU, de connexions PostgreSQL et de latence sur les plateformes partagées comme GitHub Actions (qui peut retarder les jobs de plusieurs minutes à l'heure pleine). Décalez les minutes à une valeur impaire comme `17 2 * * *`.
- **Chevauchement d'exécutions longues** : si une tâche prévue toutes les 5 minutes dure 7 minutes, deux instances s'exécutent simultanément. Sous Linux, protégez vos scripts avec `flock` ; sous Kubernetes, définissez `concurrencyPolicy: Forbid` et `startingDeadlineSeconds`.
- **Absence du 31 dans certains mois** : une règle `0 6 31 * *` ne s'exécutera que sept fois par an. Pour une tâche de fin de mois fiable, déclenchez le 1er du mois à `00:05` ou vérifiez la date du lendemain dans le script.
