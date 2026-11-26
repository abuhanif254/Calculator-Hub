---
title: "The Ultimate Guide to Probability: Formulas, Events, and Rules"
description: "Master single-event, union, intersection, and conditional probability with exact formulas, Bayes' theorem examples, and decision rules."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "probability-calculator"
relatedType: "calculator"
faqs:
  - question: "What is the difference between mutually exclusive and independent events?"
    answer: "Mutually exclusive events cannot occur simultaneously, meaning P(A ∩ B) = 0, so knowing A occurred guarantees B did not. Independent events can occur together, and one event's occurrence does not alter the other's probability, meaning P(A ∩ B) = P(A) × P(B). Except for impossible zero-probability events, two events with positive probability cannot be both mutually exclusive and independent."
  - question: "When should I subtract P(A ∩ B) in the OR probability formula?"
    answer: "Always subtract P(A ∩ B) unless the events are strictly mutually exclusive. The General Addition Rule P(A ∪ B) = P(A) + P(B) − P(A ∩ B) prevents double-counting outcomes where both A and B occur. For independent events with P(A) = 0.5 and P(B) = 0.5, skipping the subtraction yields an impossible 1.0 instead of the true 0.75."
  - question: "How does sampling without replacement create dependent events?"
    answer: "Sampling without replacement shrinks both the remaining favorable count and the total sample space after each draw, changing conditional probabilities on subsequent steps. For example, drawing two aces from a standard 52-card deck gives (4/52) × (3/51) = 1/221 (0.45%), whereas sampling with replacement keeps the probability constant at (4/52)² = 1/169 (0.59%)."
  - question: "Why can a positive test result still have a low true probability under Bayes' theorem?"
    answer: "When a defect or disease has a low base rate (prior probability), even a small false-positive rate applied to the large healthy majority can outnumber true positives. Bayes' theorem weights test sensitivity by the prior prevalence, showing why screening tests require confirmatory follow-ups when prevalence is under 5%."
  - question: "What is the fastest way to compute 'at least one' probability across repeated trials?"
    answer: "Use the complement rule rather than summing every multi-success combination. For k independent trials each with success probability p, the probability of zero successes is (1 − p)^k, so P(at least 1 success) = 1 − (1 − p)^k. For instance, a 10% failure rate per component across 5 independent components yields 1 − 0.90^5 = 40.95% chance of at least one failure."
---

Probability quantifies uncertainty on a scale from `0` (impossibility) to `1` (certainty), defined for equally likely outcomes in sample space `S` as `P(A) = n(A) / n(S)`. Across engineering reliability, clinical diagnostics, and quantitative risk analysis, accurate modeling hinges on distinguishing whether events overlap, influence subsequent trials, or update prior base rates.

Because manual calculations often confuse mutually exclusive events with independent events—or omit overlap corrections when combining odds—a structured rule set prevents impossible probabilities above `1.0`. Compute single-event, union, intersection, complement, and conditional outcomes together using our [Probability Calculator](/en/calculators/probability-calculator).

## Core Probability Axioms and Rules

Valid probability models satisfy Kolmogorov's axioms: `P(A) ≥ 0`, `P(S) = 1`, and the probability of disjoint events equals the sum of their individual probabilities.

### Single Events and the Complement Rule

For event `A`, its complement `A'` represents every outcome in `S` outside `A`. Because `A` and `A'` partition `S` without overlap:

```text
P(A') = 1 − P(A)
```

For "at least one" events across `k` independent trials, compute zero successes and subtract from `1`:

```text
P(at least 1 success in k trials) = 1 − [1 − P(A)]^k
```

### The Addition Rule (OR Probabilities)

To find whether `A`, `B`, or both occur, apply the General Addition Rule:

```text
P(A ∪ B) = P(A) + P(B) − P(A ∩ B)
```

Subtracting `P(A ∩ B)` removes outcomes counted twice. When `A` and `B` are **mutually exclusive**, `P(A ∩ B) = 0`, simplifying the rule to `P(A) + P(B)`.

### The Multiplication Rule and Conditional Probability (AND Probabilities)

The joint probability that both `A` and `B` occur follows the General Multiplication Rule:

```text
P(A ∩ B) = P(A) × P(B | A)
```

Conditional probability `P(B | A) = P(A ∩ B) / P(A)` measures the likelihood of `B` given `A` occurred (`P(A) > 0`). When events are **independent**, `P(B | A) = P(B)`, reducing the joint rule to `P(A) × P(B)`.

### Bayes' Theorem for Inverse Probability

When forward test accuracy `P(B | A)` is known and you need the inverse `P(A | B)`, Bayes' theorem updates prior probability `P(A)`:

```text
P(A | B) = [P(B | A) × P(A)] / P(B)
where P(B) = P(B | A) × P(A) + P(B | A') × P(A')
```

## Worked Numerical Examples: Joint Events and Bayesian Screening

Suppose two independent quality checks inspect warehouse packages: weight discrepancy `A` occurs with `P(A) = 0.35`, and barcode misread `B` occurs with `P(B) = 0.40`.

1. **Both events (`A ∩ B`):** `0.35 × 0.40 = 0.14` (`14.00%`).
2. **At least one (`A ∪ B`):** `0.35 + 0.40 − 0.14 = 0.61` (`61.00%`).
3. **Only A (`A ∩ B'`):** `0.35 − 0.14 = 0.21` (`21.00%`).
4. **Neither (`(A ∪ B)'`):** `1 − 0.61 = 0.39` (`39.00%`). All four disjoint regions sum to `1.00`.

Now consider dependent Bayesian screening in wafer manufacturing. Suppose `4%` of wafers contain a micro-fracture (`P(D) = 0.04`, `P(D') = 0.96`). An optical scanner achieves `95%` sensitivity (`P(+ | D) = 0.95`) with a `3%` false-positive rate (`P(+ | D') = 0.03`).

1. **True positive (`+ ∩ D`):** `0.04 × 0.95 = 0.0380` (`3.80%`).
2. **False positive (`+ ∩ D'`):** `0.96 × 0.03 = 0.0288` (`2.88%`).
3. **Total flagged `P(+)`:** `0.0380 + 0.0288 = 0.0668` (`6.68%`).
4. **Positive predictive value `P(D | +)`:** `0.0380 / 0.0668 = 0.56886` (**56.89%**).

Despite `95%` sensitivity and `97%` specificity, over `43%` of flagged wafers are intact because the defect base rate is low.

## Probability Event Structures Compared

Match your physical process to the correct structural equation using this reference matrix.

| Event Relationship | Exact Formula | Key Assumption | Overlap `P(A ∩ B)` | Typical Application |
| :--- | :--- | :--- | :--- | :--- |
| Complementary (`A`, `A'`) | `P(A') = 1 − P(A)` | Binary partition | `0` | Reliability pass/fail, "at least one" |
| Mutually Exclusive Union | `P(A ∪ B) = P(A) + P(B)` | Disjoint events | `0` | Single die roll, single-label class |
| Overlapping Union | `P(A ∪ B) = P(A) + P(B) − P(A ∩ B)` | Co-occurrence allowed | `> 0` | Dual-fault alerts, multi-symptom screening |
| Independent Intersection | `P(A ∩ B) = P(A) × P(B)` | `P(B \| A) = P(B)` | `P(A) × P(B)` | Sampling with replacement |
| Dependent Intersection | `P(A ∩ B) = P(A) × P(B \| A)` | Order alters odds | `P(A) × P(B \| A)` | Sampling without replacement |
| Bayesian Update | `P(A \| B) = P(B \| A)P(A) / P(B)` | Known prior & rates | `P(B \| A) × P(A)` | Medical screening, fraud detection |

## Practical Applications and Precision Pitfalls

Quantitative models routinely fail when analysts overlook four structural traps:

- **Conflating independence with mutual exclusivity:** Positive-probability events (`P(A) > 0`, `P(B) > 0`) that are mutually exclusive (`P(A ∩ B) = 0`) are strictly **dependent**, since knowing `A` occurred forces `P(B | A) = 0 ≠ P(B)`. Always verify whether events can co-occur before multiplying marginal probabilities.
- **Base-rate fallacy:** Equating `P(+ | D)` with `P(D | +)`—the transposed conditional error—grossly overstates risk whenever prevalence is low, such as rare-disease screening, fraud alerts, or intrusion detection. Anchor every diagnostic decision to prior prevalence `P(D)` before interpreting positive test flags.
- **Hidden correlation in parallel systems:** Treating redundant servers or financial assets as independent underestimates tail risk during shared grid outages or market shocks.
- **Floating-point underflow:** Multiplying hundreds of small probabilities directly (such as `0.02^300`) underflows 64-bit IEEE-754 precision to `0.0`; sum log-probabilities `Σ ln(pᵢ)` in production pipelines instead.
