---
metaTitle: "Regex Tester & Live Debugger | ECMAScript & ReDoS Guard"
metaDescription: "Test ECMAScript regular expressions with live match highlighting, capture group inspection, flag toggles, and ReDoS backtracking diagnostics in-browser."
metaKeywords: "regex tester, javascript regex debugger, ECMAScript regular expressions, capture groups, lookahead regex, ReDoS prevention, catastrophic backtracking, regex flags"
title: "Regex Tester & Live Debugger"
shortDescription: "Validate ECMAScript regular expressions in real time with match highlighting, named capture group inspection, flag toggles, and catastrophic backtracking diagnostics."
faqs:
  - question: "Which regex flavor does this tester execute?"
    answer: "It executes the native ECMAScript RegExp engine defined by ECMA-262 inside your browser's JavaScript runtime. That guarantees exact behavioral parity with Node.js, Deno, Bun, Chrome V8, Safari JavaScriptCore, and modern frontend validation code."
  - question: "What is the difference between the s (dotAll) and m (multiline) flags?"
    answer: "The m flag changes the ^ and $ anchors so they match the start and end of every line rather than only the start and end of the entire string. The s flag changes the . wildcard so it matches newline characters such as LF and CR, which it normally excludes."
  - question: "How do named capture groups simplify production JavaScript code?"
    answer: "Named groups written as (?<year>\\d{4}) attach a groups dictionary directly to each match object. Instead of relying on fragile numeric indices like match[1] that break when you insert another parenthesis pair, you can destructure match.groups.year safely."
  - question: "What causes catastrophic backtracking (ReDoS) in regular expressions?"
    answer: "ReDoS happens when an NFA regex engine evaluates nested or overlapping quantifiers—such as (a+)+ or (\\w+|\\d+)*—against an input string that almost matches but fails near the end. The engine tries an exponential number of fallback paths, freezing a single-threaded Node.js server or browser tab."
  - question: "Why does calling .test() twice on a regex with the g flag alternate true and false?"
    answer: "When the global g flag is enabled, the RegExp instance mutates its internal lastIndex property after every match. A second call starts scanning from lastIndex instead of index 0, eventually hitting the end of the string, returning false, and resetting lastIndex to 0."
features:
  - "Live ECMAScript RegExp evaluation with highlighted match spans and indices"
  - "Detailed breakdown of numbered and named capture groups per match"
  - "Interactive toggles for g, i, m, s, u, and y engine flags"
  - "Early detection of nested quantifiers and ReDoS backtracking hazards"
  - "100% client-side execution with zero log or payload transmission"
useCases:
  - "Extracting structured fields from NGINX, Kubernetes, or JSON-adjacent server logs"
  - "Authoring strict form, slug, and API parameter validation rules in TypeScript"
  - "Debugging why a lookahead or lookbehind assertion fails on multiline input"
  - "Auditing user-facing or untrusted patterns for catastrophic backtracking risk"
  - "Testing Unicode property escapes before deploying internationalized input parsers"
howToSteps:
  - "Enter your ECMAScript regex pattern without outer slashes and toggle the desired flags."
  - "Paste realistic positive and negative test strings—including edge cases—into the corpus editor."
  - "Inspect highlighted full matches, numbered subgroups, and named group key-value pairs."
  - "Refine quantifiers or anchors if any match overshoots or triggers backtracking warnings."
---

Writing a regular expression from memory and shipping it straight to production is a classic source of subtle parsing bugs, dropped log lines, and event-loop stalls. A live debugger lets you verify every boundary condition—anchors, lazy quantifiers, capture groups, and Unicode character classes—against realistic multi-line payloads before committing code.

This Regex Tester & Live Debugger runs 100% client-side inside your browser's native JavaScript engine. Sensitive production log snippets, customer PII samples, auth header formats, and proprietary parsing rules stay strictly in local browser memory with zero network uploads.

## ECMAScript RegExp Engine Architecture and Flag Semantics

JavaScript's `RegExp` engine implements the ECMA-262 Section 22.2 specification using a backtracking Nondeterministic Finite Automaton (NFA). Because the engine attempts paths from left to right and backtracks whenever a branch fails, quantifier order and greediness directly control both match output and runtime latency. Adding `?` after `*`, `+`, or `{m,n}` switches from greedy matching (consuming as much as possible first) to lazy matching (expanding only as needed to satisfy the remainder of the pattern).

Modern ECMAScript supports several expressive grouping and assertion primitives. Non-capturing groups `(?:...)` apply quantifiers or alternations without allocating a capture slot, avoiding unnecessary memory overhead in tight loops. Named capture groups `(?<name>...)` populate `match.groups`, making complex parsers resilient to later edits, and can be referenced inside the same pattern via `\k<name>`. Positive lookaheads `(?=...)`, negative lookaheads `(?!...)`, and ES2018 lookbehinds `(?<=...)` / `(?<!...)` assert surrounding context without consuming characters into the matched span—essential when extracting values bounded by delimiters that must not appear in the final token.

Engine flags alter global semantics across the entire automaton: `g` finds all non-overlapping matches, `i` applies Unicode case folding, `m` binds `^` and `$` to line boundaries, `s` (dotAll) allows `.` to match `\n`, `\r`, `\u2028`, and `\u2029`, and `d` (`hasIndices`) exposes exact start and end character offsets via `match.indices` for syntax highlighters. Finally, `u` enables full UTF-16 surrogate pair handling plus Unicode property escapes such as `\p{Letter}`, while ES2024 `v` (`unicodeSets`) adds character-class set subtraction and intersection.

## Step-by-Step Walkthrough: Parsing Structured Logs with Named Groups

Suppose you need to extract timestamp, HTTP method, path, and status code from API gateway logs while skipping `/healthz` readiness probes. Start with a clean anchored pattern using named capture groups and a negative lookahead on the path:

```regex
^(?<ts>\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)\s+(?<method>GET|POST|PUT|DELETE)\s+(?!\/healthz\b)(?<path>\/\S*)\s+(?<status>[1-5]\d{2})$
```

Test this against a mixed corpus with the `g` and `m` flags enabled:

```text
2026-11-27T09:14:02Z GET /healthz 200
2026-11-27T09:14:05Z POST /v1/invoices/create 201
2026-11-27T09:14:09Z GET /v1/users/42?tab=billing 502
```

Line 1 is skipped cleanly because `(?!\/healthz\b)` rejects `/healthz` right before the path group consumes characters. Notice the `\b` word boundary inside the negative lookahead: without it, a real endpoint named `/healthz-metrics` would also be excluded. In JavaScript, `String.prototype.matchAll` iterates every match safely without mutating external state:

```javascript
const pattern = /^(?<ts>\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)\s+(?<method>GET|POST|PUT|DELETE)\s+(?!\/healthz\b)(?<path>\/\S*)\s+(?<status>[1-5]\d{2})$/gm;

for (const match of logCorpus.matchAll(pattern)) {
  const { ts, method, path, status } = match.groups;
  console.log({ ts, method, path, status: Number(status) });
}
```

## ECMAScript Regex Syntax and Flag Reference Table

Use this quick reference to verify ECMA-262 constructs and their exact behavior in modern JavaScript runtimes:

| Construct / Flag | Syntax | Engine Behavior | Typical Engineering Use Case |
| :--- | :--- | :--- | :--- |
| Named Capture | `(?<id>...)` | Stores match in `match.groups.id` | Self-documenting log and URL parsers |
| Non-Capturing | `(?:...)` | Groups tokens without saving capture | Alternations like `(?:http\|https)://` |
| Negative Lookahead | `(?!...)` | Fails if suffix matches ahead | Excluding paths or reserved keywords |
| Positive Lookbehind | `(?<=...)` | Asserts prefix without consuming it | Matching amounts after `USD ` |
| Lazy Quantifier | `*?`, `+?` | Consumes minimum required characters | Extracting quoted tokens safely |
| Unicode Property | `\p{L}`, `\p{N}` | Matches Unicode categories (requires `u`) | Internationalized name or tag validation |
| Multiline + dotAll | `m` and `s` | `^`/`$` match lines; `.` matches `\n` | Parsing multi-line config blocks |

## Catastrophic Backtracking (ReDoS), Security, and Edge Cases

The sharpest operational hazard in NFA regex engines is Regular Expression Denial of Service (ReDoS). When a pattern contains nested quantifiers such as `^([a-zA-Z0-9]+)+$` or overlapping alternations like `(a|a?)+b`, a non-matching string like `aaaaaaaaaaaaaaaaaaaaaaaa!` forces the engine to explore an exponential number of partitioning combinations before failing. On Node.js, a single malicious request payload can peg a CPU core at 100% and block the entire event loop for seconds or minutes.

Prevent ReDoS with four defensive rules:

1. **Eliminate nested quantifiers:** Collapse `([a-z]+)+` to `[a-z]+`, and replace greedy `.*` bridges with negated character classes such as `[^/]+` or `[^"]+` so the engine cannot over-consume and backtrack.
2. **Make alternations mutually exclusive:** Ensure branches inside `(A|B)*` cannot match the same starting characters.
3. **Bound input length first:** Reject strings exceeding an explicit character ceiling (for example, 4,096 bytes) before invoking `.exec()` or `.test()`.
4. **Watch stateful `g` flags:** Never share a `/g` regex literal across `.test()` calls inside validation middleware because `lastIndex` persists between invocations; omit `g` for boolean checks or use `matchAll()` for iteration.
5. **Consider linear-time engines for untrusted patterns:** Because ECMAScript `RegExp` uses backtracking rather than a DFA/Thompson NFA engine like Google RE2, never compile user-supplied regex strings directly on your API server without static complexity analysis or isolated worker timeouts. Similarly, remember that sticky `y` matching anchors strictly to `lastIndex` without scanning forward, which makes it ideal for tokenizers but surprising if accidentally enabled in general search.
