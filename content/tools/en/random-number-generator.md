---
metaTitle: "Random Number Generator | CSPRNG, Dice Roller & OTP"
metaDescription: "Generate Web Crypto random numbers, decimals, polyhedral RPG dice rolls, numeric OTPs, and fair list picks offline with live stats and CSV export."
metaKeywords: "random number generator, RNG, dice roller, random picker, random number generator between 1 and 100, bulk random numbers, OTP generator, polyhedral dice simulator, statistical random dataset"
title: "Random Number Generator Tool & Simulator"
shortDescription: "Generate Web Crypto random integers, fixed-precision decimals, polyhedral RPG dice rolls, numeric OTP tokens, and custom list picks with live descriptive statistics and JSON/CSV export."
faqs:
  - question: "How does this generator produce cryptographically secure numbers in a web browser?"
    answer: "Range, Dice, and OTP modes invoke window.crypto.getRandomValues() on a 32-bit unsigned integer array and scale the OS-seeded value across your bounds. Unlike standard Math.random(), the underlying byte stream resists state-recovery attacks and runs completely client-side."
  - question: "Why did Unique Only mode return fewer numbers than I requested?"
    answer: "Sampling without replacement cannot yield more outputs than valid candidates inside your constrained domain. For example, requesting 30 unique even integers between 1 and 50 exceeds the 25 even integers available, and adding exclusions shrinks the valid pool further."
  - question: "What probability difference exists between rolling 1d20 and rolling 3d6?"
    answer: "A single 20-sided die (1d20) produces a flat discrete uniform distribution where every integer from 1 to 20 has an exact 5% probability. Summing three 6-sided dice (3d6) produces a bell-shaped discrete convolution centered at 10.5, where 10 and 11 occur 12.5% of the time each while 3 and 18 occur only 0.46% of the time."
  - question: "Are 6-digit numeric OTPs secure enough on their own for authentication?"
    answer: "A 6-digit decimal OTP has exactly 1,000,000 combinations (~19.93 bits of entropy), which is easily brute-forced if unlimited retries are allowed. Always pair short numeric OTPs with brief expiration windows (30 to 300 seconds) and strict per-account attempt lockouts."
  - question: "What live statistics are computed for bulk numerical datasets?"
    answer: "Whenever you run Range Generator or RPG Dice Roller mode, the tool automatically calculates the dataset minimum, maximum, total sum, arithmetic mean, exact median (averaging the two center values on even counts), and full spread range so you can sanity-check distribution balance instantly."
features:
  - "Web Crypto API (window.crypto.getRandomValues) 32-bit entropy sampling running 100% locally in the browser"
  - "Range Generator supporting negative bounds, fixed-precision decimals, unique-only sampling, odd/even parity filters, and comma-separated exclusions"
  - "Tabletop RPG Dice Roller supporting arbitrary multi-dice pools across standard polyhedra (d4, d6, d8, d10, d12, and d20)"
  - "Dedicated OTP / Numeric Token generator producing fixed-length, zero-preserving digit strings for PINs and verification testing"
  - "Custom Random Picker drawing fair winners or sample items from comma-separated pools with or without replacement"
  - "Real-time descriptive statistics panel (min, max, sum, mean, median, range) plus instant copy, JSON array, and CSV exports"
useCases:
  - "Generating randomized integer and decimal edge cases (including negatives) for QA fuzz testing and API boundary checks"
  - "Simulating multi-dice tabletop RPG mechanics (such as 4d6 stat arrays or 1d20 attack checks) with automatic sum calculation"
  - "Running transparent raffle draws, classroom cold-calls, or A/B cohort splits using the unique-only Random Picker"
  - "Creating bulk numeric verification codes, test PINs, or mock order numbers without exposing values to third-party servers"
  - "Drawing non-repeating lottery numbers or audit sample indices while excluding previously audited record IDs"
  - "Exporting synthetic numerical series into CSV or JSON for spreadsheet modeling, unit tests, and Monte Carlo prototypes"
howToSteps:
  - "Choose one of the four engines in the sidebar: Range Generator, RPG Dice Roller, OTP / Tokens, or Random Picker."
  - "Enter your parameters—such as minimum/maximum bounds, decimal places, die geometry (d4–d20), token length, or comma-separated pool items."
  - "Enable optional constraints like Unique Only, Odd/Even parity filtering, or comma-separated exclusion numbers in Range mode."
  - "Click Generate to sample your dataset locally and review live min, max, sum, average, median, and range telemetry."
  - "Copy the comma-separated output, copy a structured JSON array, or download a CSV file for immediate spreadsheet or code ingestion."
---

Reliable randomness underpins everything from Monte Carlo stress tests and QA fuzzing to cryptographic one-time passcodes and tabletop game mechanics. Yet subtle implementation flaws—predictable seeds, modulo skew, broken sampling without replacement, or silent range exhaustion—frequently invalidate naive scripts. **Random Number Generator Tool & Simulator** consolidates four distinct stochastic engines (Range Generator, RPG Dice Roller, OTP/Token creator, and Custom Picker) into an offline browser workspace powered by the Web Crypto API, complete with real-time descriptive statistics and clean JSON/CSV exports.

## Deterministic PRNGs vs. Cryptographic Browser Entropy

Because digital CPUs execute deterministic instruction pipelines, software randomness falls into two engineering tiers:

- **Non-Cryptographic PRNGs** (`xorshift128+` in V8's `Math.random()`, `MT19937` Mersenne Twister, and `PCG32`) evolve a compact mathematical state deterministically from an initial seed. They excel at reproducible procedural terrain or repeatable unit tests, yet observing enough outputs allows state reconstruction—making them unsuitable for PINs, tokens, or fair high-stakes draws.
- **Cryptographically Secure PRNGs (CSPRNGs)** harvest physical entropy from operating-system noise pools (CPU jitter, interrupt timings, hardware RNG instructions like `RDRAND`/`RDSEED`) and pass it through cryptographic primitives (`ChaCha20` or `CTR_DRBG`).

In Range, Dice, and OTP modes, this utility extracts 32-bit unsigned values through `window.crypto.getRandomValues(new Uint32Array(1))` and normalizes them by $2^{32} = 4{,}294{,}967{,}296$ into the half-open interval $[0, 1)$, guaranteeing unbiased uniform scaling across ordinary ranges without transmitting any request to a backend server.

## Four Generation Modes Compared

| Engine Mode | Domain & Precision | Sampling Distribution | Uniqueness & Filtering | Output Telemetry & Exports |
| :--- | :--- | :--- | :--- | :--- |
| **Range Generator** | Integers (negatives supported) or fixed decimals | Discrete or quantized continuous uniform on $[a, b]$ | Unique-only, Odd/Even parity, comma-separated exclusions | Min, Max, Sum, Mean, Median, Range; Copy, JSON, CSV |
| **RPG Dice Roller** | $N \times \{d4, d6, d8, d10, d12, d20\}$ | Uniform per die; Irwin-Hall-like bell sum for $N \ge 2$ | Independent rolls (replacement always enabled) | Individual rolls plus instant Sum, Mean, Median, Range |
| **OTP / Tokens** | Fixed-length decimal digits (`0–9`, leading zeros kept) | Independent uniform base-10 digits ($10^L$ states) | String-preserved leading zeros (e.g., `004819`) | Bulk list copy, JSON string array, CSV export |
| **Random Picker** | Arbitrary comma-separated text or numeric items | Uniform index draw over $K$ trimmed pool items | Toggle between Unique (without replacement) and Duplicates | Drawn sequence copy, JSON string array, CSV export |

## Sampling Without Replacement, Cardinality Limits, and Parity Math

Requesting unique integers inside a constrained interval introduces a classic combinatorial boundary. Suppose you sample unique integers on $[a, b]$ with an exclusion set $E$ and optional parity filter. The exact maximum feasible output count $N_{\max}$ is:

- **Unfiltered integers**: $(b - a + 1) - |E \cap [a, b]|$
- **Odd-only or Even-only**: roughly half the interval minus excluded elements matching that parity

When you draw with a rejection loop (`while results.length < amount`), execution stays nearly $O(N)$ while occupancy is below 50%, but as $N$ approaches $N_{\max}$ the expected trials scale with the harmonic number $N_{\max} H_{N_{\max}}$ (the **Coupon Collector** slowdown). To keep your browser tab responsive even under impossible constraints (like requesting 50 unique odd numbers between 1 and 20), the engine enforces a bounded attempt budget. For production backend code where you must pick $k$ unique items from a large dense array without rejection stalls, run a **partial Fisher-Yates shuffle** in $O(k)$ time, and apply rejection sampling on raw 32-bit integers to avoid modulo bias:

```typescript
// Unbiased bounded integer in [0, range) using Web Crypto rejection sampling
function unbiasedInt(range: number): number {
  const limit = Math.floor(0x100000000 / range) * range;
  const buf = new Uint32Array(1);
  do {
    crypto.getRandomValues(buf);
  } while (buf[0] >= limit);
  return buf[0] % range;
}
```

## Polyhedral Dice Curves and Statistical Sanity Checks

For a discrete uniform distribution on integers $[a, b]$, theoretical population mean and median both equal $\mu = \frac{a + b}{2}$, with variance $\sigma^2 = \frac{(b - a + 1)^2 - 1}{12}$. Watching the live statistics panel on a bulk sample of 500 or 1,000 rolls lets you verify empirical convergence toward $\mu$ immediately.

In tabletop RPG design, choosing between single-die and multi-die expressions dramatically reshapes outcome variance:
- **`1d20`** spans 1 to 20 with $\mu = 10.5$ and standard deviation $\sigma \approx 5.77$; extreme criticals (`1` or `20`) happen on 10% of all rolls.
- **`3d6`** spans 3 to 18 with the identical mean $\mu = 10.5$, yet its standard deviation shrinks to $\sigma \approx 2.96$; 74% of all rolls cluster between 8 and 13, rewarding predictable skill curves over swingy luck.
- **Decimals and Quantization**: When generating floating-point samples in Range Mode with fixed decimal precision (for example, `decimals = 2` on `[0, 100]` to mock currency values), values are rounded to the requested decimal places—so boundary endpoints `0.00` and `100.00` carry half the bin width of interior ticks unless your simulation samples open intervals directly. Keep that boundary behavior in mind when checking histograms or running chi-squared goodness-of-fit tests on exported datasets.

## Security Pitfalls in Numeric OTPs and Downstream Workflows

A 6-digit numeric OTP carries $6 \times \log_2(10) \approx 19.93$ bits of entropy—only one million possible values. In production authentication (such as RFC 6238 TOTP or SMS login verification), never rely on raw numeric entropy alone: enforce short lifetimes (30–300 seconds), invalidate codes after first use, and lock or rate-limit validation after 3–5 failed attempts. Always handle OTPs as **strings** rather than integers so leading zeros (`042918`) are never silently truncated into invalid 5-digit values during CSV or JSON ingestion.

When your task outgrows numeric datasets, explore sibling tools tailored to adjacent formats: inspect and sort large downloaded `.csv` exports inside the [CSV Viewer](/en/tools/csv-viewer), generate alphanumeric tokens or regex-like promo codes in the [Random String Generator](/en/tools/random-string-generator), or mint RFC 9562 database keys with the [UUID Generator](/en/tools/uuid-generator).
