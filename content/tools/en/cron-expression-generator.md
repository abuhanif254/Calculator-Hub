---
metaTitle: "Cron Expression Generator & Schedule Tester | POSIX Crontab"
metaDescription: "Build and validate 5-field POSIX cron expressions for Linux, Kubernetes, GitHub Actions, and Vercel. Preview next UTC and local runs without DST errors."
metaKeywords: "cron expression generator, crontab tester, POSIX cron syntax, Kubernetes CronJob schedule, GitHub Actions cron, Vercel cron, cron UTC DST, crontab next run"
title: "Cron Expression Generator & Schedule Tester"
shortDescription: "Generate, decode, and validate 5-field POSIX cron expressions for Linux, Kubernetes, GitHub Actions, and Vercel, with live previews of upcoming UTC and local execution timestamps."
faqs:
  - question: "What does each field in a 5-field POSIX cron expression represent?"
    answer: "From left to right, the five fields represent minute (0-59), hour (0-23), day of month (1-31), month (1-12), and day of week (0-6, where 0 is Sunday, though many Vixie implementations also accept 7 for Sunday)."
  - question: "Why did my cron job run every day when I restricted both day-of-month and day-of-week?"
    answer: "Under POSIX and Vixie cron rules, when both the day-of-month and day-of-week fields are set to values other than *, the scheduler treats them as a logical OR rather than AND. For example, 0 9 15 * 1 runs at 09:00 on the 15th of the month AND on every Monday."
  - question: "Should Kubernetes and cloud cron jobs use UTC or a local timezone?"
    answer: "Use UTC (Etc/UTC) whenever possible. Local wall-clock timezones introduce Daylight Saving Time jumps where a 02:30 job is completely skipped during spring-forward or fires twice during fall-back, creating duplicate writes or missed SLAs."
  - question: "Do GitHub Actions and Vercel Cron support 6-field second-level schedules?"
    answer: "No. Both GitHub Actions and Vercel Cron require standard 5-field POSIX syntax with minute-level granularity. Sub-minute schedules require a dedicated queue worker or an external 6-field scheduler such as Quartz or AWS EventBridge."
  - question: "Why do my scheduled cloud cron jobs start a few minutes late at :00?"
    answer: "Millions of jobs worldwide target midnight or the top of the hour (0 * * * *), creating severe thundering-herd contention on shared control planes like GitHub Actions. Shifting your minute field to an off-peak offset such as 17 * * * * improves start-time predictability."
features:
  - "Interactive 5-field POSIX crontab builder with instant human-readable translation"
  - "Next-run execution timeline comparing UTC against your local browser timezone"
  - "Validation for ranges, step increments, lists, and Sunday 0/7 equivalence"
  - "Platform guidance for Linux crontab, Kubernetes CronJob, GitHub Actions, and Vercel"
  - "100% client-side evaluation with zero schedule or infrastructure metadata uploaded"
useCases:
  - "Scheduling Kubernetes CronJob database backups and log rotation pods"
  - "Configuring GitHub Actions nightly security scans and dependency audits"
  - "Validating Vercel Cron endpoints before deploying vercel.json updates"
  - "Auditing legacy Linux /etc/crontab entries for unintended OR-logic firing"
  - "Verifying how UTC schedules map onto regional business hours across seasons"
howToSteps:
  - "Select preset intervals or enter custom values across minute, hour, DOM, month, and DOW."
  - "Inspect the decoded English summary to confirm no unintended OR-logic exists."
  - "Compare the upcoming execution timestamps in both UTC and local wall-clock time."
  - "Copy the validated 5-field expression into your crontab, YAML manifest, or vercel.json."
---

A single misplaced asterisk or misunderstood day-of-week rule in a cron expression can silently skip nightly billing runs or trigger heavy database migrations every minute. Because Linux `crond`, Kubernetes `CronJob`, GitHub Actions, and Vercel Cron enforce slightly different validation rules and timezone defaults, inspecting the decoded schedule and upcoming timestamps before deployment saves hours of incident triage.

This Cron Expression Generator & Schedule Tester computes every schedule preview 100% client-side inside your browser. Your internal job intervals, deployment cadences, and maintenance windows never leave your device.

## 5-Field POSIX Crontab Specification and Scheduler Dialects

Traditional UNIX and POSIX crontab lines consist of five whitespace-separated fields: `minute` (`0-59`), `hour` (`0-23`), `day-of-month` (`1-31`), `month` (`1-12` or `JAN-DEC`), and `day-of-week` (`0-6` or `SUN-SAT`, with Vixie cron and Kubernetes also accepting `7` as Sunday). Each field accepts wildcards (`*`), comma-separated lists (`1,15`), closed ranges (`1-5`), and step operators (`*/15` or `0-30/5`). Note that step values divide the field's natural range starting from its minimum rather than measuring elapsed time from deployment: `*/7 * * * *` triggers at minutes `0, 7, 14, 21, 28, 35, 42, 49, 56` and then resets at `0` on the next hour, leaving only a 4-minute gap between `:56` and `:00`.

One specification detail trips up even experienced engineers: the **DOM + DOW union rule**. When either day-of-month or day-of-week is `*`, the scheduler intersects normally. When **both** are restricted to non-`*` values, standard Vixie cron computes a logical **OR**. Thus `0 3 1 * 1` does not mean "the first Monday of the month at 03:00"—it runs on the 1st of every month **and** on every Monday. To target only the first Monday, schedule `0 3 1-7 * 1` only on engines supporting non-POSIX extensions, or run `0 3 * * 1` and verify `day <= 7` inside your application code.

Non-POSIX ecosystems add custom extensions. Quartz, Spring, and AWS EventBridge use 6 or 7 fields (adding seconds and year) and require `?` in one of DOM/DOW to resolve ambiguity, while Linux crond supports macros like `@hourly` and `@daily`.

## Step-by-Step Walkthrough: Designing Safe Multi-Platform Cron Schedules

Suppose you need a weekday database compaction job running at 02:17 UTC—intentionally staggered 17 minutes past the hour to avoid top-of-hour cluster contention. Your 5-field POSIX expression is:

```text
17 2 * * 1-5
```

Reading left to right: minute `17`, hour `2`, any day of month (`*`), any month (`*`), Monday through Friday (`1-5`). Inspecting the next five UTC timestamps confirms consistent weekday intervals with zero weekend executions.

Deploying that same expression across modern cloud platforms requires matching each platform's concurrency and timezone fields:

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: db-compaction
spec:
  schedule: "17 2 * * 1-5"
  timeZone: "Etc/UTC"
  concurrencyPolicy: Forbid
  startingDeadlineSeconds: 300
```

For GitHub Actions, note that `schedule` always executes in UTC and ignores local timezone strings:

```yaml
on:
  schedule:
    - cron: "17 2 * * 1-5"
```

In `vercel.json`, Hobby plans restrict crons to once per day, whereas Pro and Enterprise plans allow minute-level intervals, all evaluated in UTC:

```json
{
  "crons": [
    {
      "path": "/api/jobs/compact",
      "schedule": "17 2 * * 1-5"
    }
  ]
}
```

## Platform Cron Dialect and Behavior Comparison Table

Before copying a cron string between environments, check how each scheduler handles field count, timezones, and special modifiers:

| Platform | Field Count | Default Timezone | DOM + DOW Logic | Key Production Constraint |
| :--- | :--- | :--- | :--- | :--- |
| Linux Vixie Cron | 5 (plus macros) | System local time | Logical OR | Sensitive to host `/etc/localtime` DST shifts |
| Kubernetes CronJob | 5 (plus macros) | Controller UTC (`timeZone` optional) | Logical OR | `concurrencyPolicy` defaults to `Allow` |
| GitHub Actions | 5 (POSIX only) | Always UTC | Logical OR | Shortest interval 5m; delayed during `:00` spikes |
| Vercel Cron | 5 (POSIX only) | Always UTC | Logical OR | Hobby plan capped at daily; no overlap guard |
| AWS EventBridge | 6 (adds year) | Always UTC | Requires `?` in one | Uses `?` placeholder; rejects `*` in both |
| Spring / Quartz | 6 (adds seconds) | JVM / configured zone | Requires `?` in one | Supports `L`, `W`, and `#` nth-weekday syntax |

## UTC vs. DST Pitfalls, Overlap, and Production Safeguards

Running cron jobs against local wall-clock timezones such as `America/New_York` or `Europe/London` introduces two annual failure modes during Daylight Saving Time transitions. During spring-forward, clocks jump from `01:59` directly to `03:00`; any job scheduled between `02:00` and `02:59` never matches and is silently skipped. During fall-back, the `01:00–01:59` hour occurs twice, causing a `30 1 * * *` job to execute twice within 60 minutes—potentially double-charging invoices or duplicating report emails.

Standardizing all backend schedulers on `Etc/UTC` eliminates DST anomalies entirely. If business stakeholders require a report at "09:00 New York time," schedule the job frequently or handle timezone-aware dispatch inside application logic where DST transitions are explicitly guarded.

Finally, treat cron triggers as **at-least-once** or **best-effort** signals rather than exact transactional timers. Always set `concurrencyPolicy: Forbid` on Kubernetes `CronJob` resources so a slow job cannot overlap its next run, configure `startingDeadlineSeconds` carefully (knowing that Kubernetes may halt scheduling if more than 100 missed schedules accrue during control-plane downtime), and acquire a distributed lock (such as PostgreSQL advisory locks or Redis `SET NX`) inside serverless handlers. Also avoid scheduling monthly billing jobs on days `29`, `30`, or `31`—those dates simply never fire in February or 30-day months unless your job runs daily and checks for month-end in code—and stagger minutes away from `:00` and `:30` to escape global queueing delays.
