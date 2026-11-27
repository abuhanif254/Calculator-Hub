---
metaTitle: "JSON to YAML Converter — YAML 1.2 Safe Quoting & Configs"
metaDescription: "Convert JSON to clean YAML 1.2 in your browser with zero server uploads. Prevents the Norway problem and formats Kubernetes, Docker Compose, and OpenAPI files."
metaKeywords: "json to yaml converter, yaml 1.2 vs 1.1, norway problem yaml, kubernetes manifest converter, docker compose yaml, openapi json to yaml"
title: "JSON to YAML Converter"
shortDescription: "Convert JSON payloads into clean, human-readable YAML 1.2 manifests with safe string quoting for Kubernetes, Docker Compose, GitHub Actions, and OpenAPI specs."
faqs:
  - question: "What is the YAML 'Norway problem' and how does this converter prevent it?"
    answer: "In older YAML 1.1 parsers, unquoted strings like NO, yes, on, or off are coerced into booleans, turning country code NO (Norway) into false. Our serializer follows YAML 1.2 rules and safely quotes ambiguous tokens so strings remain strings."
  - question: "Why should I quote version strings like '3.10' or GitHub Actions expressions in YAML?"
    answer: "Unquoted '3.10' can be parsed as float 3.1 by YAML loaders, dropping the trailing zero in Python or tool version matrices. Quoting version numbers, cron expressions, and strings starting with colons or braces guarantees exact string preservation."
  - question: "Is every valid JSON document also valid YAML 1.2?"
    answer: "Yes. YAML 1.2 was explicitly engineered as a strict superset of JSON, meaning any JSON object or array parses under YAML 1.2. Converting to block-style YAML removes braces and trailing commas to maximize readability and diff clarity."
  - question: "Does the converter support multiline strings using literal block scalars (|)?"
    answer: "Yes. Strings containing embedded newline characters can be emitted using YAML literal block scalars ('|') rather than escaped '\\n' sequences, making embedded shell scripts, SQL queries, and PEM certificates easy to read."
  - question: "Are Kubernetes secrets or cloud credentials sent to any server during conversion?"
    answer: "Never. All JSON parsing and YAML serialization run strictly in your browser memory, so Helm values, IAM policies, and environment configs remain completely private."
features:
  - "YAML 1.2 compliant serialization that eliminates YAML 1.1 boolean coercion traps"
  - "Automatic quoting for ambiguous scalars like 'NO', 'yes', 'on', 'off', and octal-like strings"
  - "Clean 2-space or 4-space block indentation tailored for Kubernetes and GitHub Actions"
  - "Readable literal block scalar ('|') formatting for multiline scripts and certificates"
  - "100% client-side execution with zero network requests for sensitive DevOps configurations"
useCases:
  - "Converting JSON OpenAPI 3.1 schemas returned by API tools into maintainable YAML specifications"
  - "Transforming AWS CloudFormation or Terraform JSON templates into readable YAML configurations"
  - "Generating Kubernetes Deployment, Service, and ConfigMap manifests from JSON API payloads"
  - "Creating Docker Compose and GitHub Actions workflow files from programmatic JSON builders"
  - "Auditing large JSON configuration trees in clean block-style YAML during code reviews"
howToSteps:
  - "Paste your JSON object or array into the left editor or upload a local .json configuration file."
  - "Select your preferred indentation width (2 spaces recommended for Kubernetes and CI/CD)."
  - "Review the generated YAML 1.2 output, verifying safely quoted scalars and multiline blocks."
  - "Copy the YAML output or download a .yaml file directly into your repository."
---

Modern infrastructure runs on YAML—Kubernetes manifests, Docker Compose files, GitHub Actions workflows, and OpenAPI specifications—yet APIs, SDKs, and programmatic generators emit JSON. Converting JSON into YAML by stripping braces is deceptively error-prone: unquoted country codes flip into booleans, version numbers lose trailing zeros, and special leading punctuation triggers syntax errors across strict linters. This tool converts JSON into clean, idiomatic YAML 1.2 engineered for production DevOps workflows.

All tokenization, type inspection, and YAML emission happen 100% client-side inside your browser. Zero bytes leave your workstation, ensuring Kubernetes ConfigMaps, IAM policy documents, and private API specifications never touch external infrastructure.

## Under-the-Hood Architecture and Specification

Although **YAML 1.2 is an official superset of JSON** (every valid JSON document is valid flow-style YAML 1.2), converting JSON into idiomatic **block-style YAML** requires careful scalar analysis. The serializer walks the parsed JSON AST recursively, mapping objects to indented `key: value` mappings and arrays to hyphenated `- item` sequences while keeping `null`, numbers, and booleans unquoted.

The critical challenge lies in **YAML 1.2 vs. YAML 1.1 scalar resolution**. Under the legacy YAML 1.1 core schema—still used by older Python PyYAML, Ruby Psych, and legacy Docker Compose parsers—unquoted tokens such as `yes`, `no`, `on`, `off`, `y`, `n`, `true`, `false`, and sexagesimal numbers (`12:30`) are implicitly coerced into booleans or base-60 integers. Famously known as the **Norway problem**, a bare `country: NO` evaluates to `country: false`.

To protect configurations across both YAML 1.1 and YAML 1.2 loaders, a production serializer quotes any string that:
- Matches YAML 1.1 boolean or null keywords (`on`, `off`, `yes`, `no`, `null`, `~`).
- Resembles a numeric literal, hexadecimal (`0xFF`), or octal (`0755`) so leading zeros and trailing decimal zeros (`"3.10"`) are never mangled.
- Begins with YAML indicator characters (`-`, `?`, `:`, `[`, `]`, `{`, `}`, `#`, `&`, `*`, `!`, `|`, `>`, `'`, `"`, `%`, `@`, `` ` ``) or contains `: ` / ` #`.
- Represents a date-like ISO timestamp (`2026-11-27`) that legacy YAML 1.1 loaders automatically coerce into native `Date` objects instead of plain strings.

For OpenAPI 3.1 specifications, Kubernetes Custom Resource Definitions (CRDs), and Docker Compose service definitions, preserving exact string types across these edge cases prevents subtle schema-validation failures during `helm template`, `docker compose config`, or `kubectl apply --dry-run=server` checks.

## Step-by-Step Developer Walkthrough

Consider a GitHub Actions / Kubernetes configuration payload in JSON containing an international country code, a Python version string, a chmod mode, and a multiline shell command:

```json
{
  "service": "billing-api",
  "region": "NO",
  "pythonVersion": "3.10",
  "fileMode": "0644",
  "triggerOnPush": true,
  "ports": [8080, 8443],
  "startupScript": "set -euo pipefail\necho 'Booting service'\nexec ./server"
}
```

1. **Boolean vs. String Disambiguation:** `triggerOnPush` is a native JSON boolean, so it emits unquoted `true`. Meanwhile, `"NO"` is a JSON string matching a YAML 1.1 falsy keyword, so the converter quotes it as `'NO'` (or `"NO"`).
2. **Numeric-Looking Strings:** `"3.10"` and `"0644"` are strings in JSON. Emitting them unquoted would turn `"3.10"` into float `3.1` and `"0644"` into decimal `420` (in octal-aware YAML 1.1 parsers). Quoting preserves both exact values.
3. **Literal Block Scalars:** Because `startupScript` contains `\n`, emitting a `|` block scalar keeps the shell script readable without escaped `\n` noise.

```yaml
service: billing-api
region: "NO"
pythonVersion: "3.10"
fileMode: "0644"
triggerOnPush: true
ports:
  - 8080
  - 8443
startupScript: |
  set -euo pipefail
  echo 'Booting service'
  exec ./server
```

## YAML 1.1 vs. YAML 1.2 Serialization Reference

| JSON Value | Unquoted YAML Risk | YAML 1.1 Interpretation | YAML 1.2 Core Schema | Safe Emitted YAML |
| :--- | :--- | :--- | :--- | :--- |
| `"NO"` | Norway problem | Boolean `false` | String `"NO"` | `"NO"` |
| `"on"` | GitHub Actions `on:` key/val | Boolean `true` | String `"on"` | `"on"` |
| `"3.10"` | Python / Node version matrix | Float `3.1` | Float `3.1` | `"3.10"` |
| `"0755"` | Unix permissions / ZIP codes | Octal `493` | String `"0755"` | `"0755"` |
| `"12:30"` | Time / port mapping | Sexagesimal `750` | String `"12:30"` | `"12:30"` |
| `"*admin"` | YAML alias syntax collision | Alias lookup error | Alias lookup error | `"*admin"` |
| `"foo #bar"` | Inline comment truncation | Truncated to `"foo"` | Truncated to `"foo"` | `"foo #bar"` |

## Production Pitfalls, Security, and Performance Edge Cases

The most common DevOps outage caused by JSON-to-YAML migration occurs in **Helm charts and GitHub Actions workflows** where YAML 1.1 parsers remain active. GitHub Actions treats `on:` at the root level as a mapping key, yet older third-party linters or Python `yaml.safe_load()` (PyYAML implements YAML 1.1) parse an unquoted `on:` key as boolean `True`. Always double-check CI/CD keys and numeric-looking strings such as `"1.10"` (which evaluates to `1.1`, breaking Go or Python version selectors).

Another subtle trap involves **tab indentation (`\t`)**. Unlike JSON, YAML strictly forbids tab characters for structural indentation. Mixing a single tab into a 2-space Kubernetes manifest causes immediate `found character '\t' that cannot start any token` errors in `kubectl apply`. Always configure your editor and converter to emit 2-space indentation for Kubernetes, Helm, and OpenAPI, or 4-space indentation where your team's style guide requires it.

Finally, avoid generating **YAML anchors and aliases (`&ref`, `*ref`)** automatically when converting from JSON unless your target loader explicitly supports them. JSON has no native reference graph semantics; emitting plain expanded mappings guarantees deterministic, diff-friendly manifests and avoids anchor-expansion denial-of-service vectors (such as the "Billion Laughs" attack) that strict enterprise YAML validators reject. Similarly, watch out for **duplicate keys** in malformed JSON inputs: while `JSON.parse()` overwrites earlier keys using last-key-wins semantics, strict YAML 1.2 validators and `yamllint` reject duplicate mapping keys outright, making clean JSON pre-validation essential before committing generated files to GitOps pipelines.
