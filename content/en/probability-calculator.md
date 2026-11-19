---
title: "Probability Calculator"
metaTitle: "Probability Calculator – Conditional, Bayes & Binomial"
description: "Calculate single and multiple event probabilities, conditional probability, Bayes' theorem, expected value, odds, and binomial trial outcomes."
metaDescription: "Free online probability calculator. Compute conditional probability, Bayes' theorem, union, intersection, expected value, odds, and binomial trials."
faqs:
  - question: "What is the difference between independent events and mutually exclusive events?"
    answer: "Independent events have no influence on one another, meaning the occurrence of event A does not alter the probability of event B: P(A and B) = P(A) * P(B). Mutually exclusive (disjoint) events cannot occur at the same time, meaning P(A and B) = 0. Therefore, two events with non-zero probabilities can never be both independent and mutually exclusive."
  - question: "When do you multiply probabilities versus adding probabilities?"
    answer: "Use the Multiplication Rule when calculating the intersection of events (the probability that BOTH event A AND event B occur). Use the Addition Rule when calculating the union of events (the probability that EITHER event A OR event B, or both, occur), making sure to subtract their overlap P(A and B) so shared outcomes are not double-counted."
  - question: "How does Bayes' Theorem update probabilities with new evidence?"
    answer: "Bayes' Theorem combines the baseline prior probability of a hypothesis P(A) with the likelihood of observing new evidence given that hypothesis P(B|A), normalized by the total probability of the evidence P(B) across all possible scenarios. This prevents the base-rate fallacy when interpreting diagnostic tests or risk alerts."
  - question: "How do you convert between probability and odds?"
    answer: "While probability measures favorable outcomes divided by total possible outcomes, odds measure favorable outcomes divided by unfavorable outcomes. Given probability p, the odds in favor are p / (1 - p), and the odds against are (1 - p) / p. Conversely, given odds of a:b in favor, the probability is a / (a + b)."
  - question: "What is the Law of Large Numbers in probability simulations?"
    answer: "The Law of Large Numbers states that as the number of identical independent trials (such as coin flips or dice rolls) increases toward infinity, the observed empirical relative frequency of an event converges toward its true theoretical probability."
---

Probability theory provides the mathematical framework for quantifying uncertainty, mapping the likelihood of any random event onto a continuous scale from $0$ (impossibility) to $1$ (absolute certainty). Governed by Kolmogorov's probability axioms—non-negativity ($P(E) \ge 0$), unit normalization of the entire sample space ($P(\Omega) = 1$), and additivity over mutually exclusive outcomes—probability calculations underpin actuarial risk modeling, clinical diagnostic testing, quantitative finance, reliability engineering, and statistical inference.

Because human intuition frequently struggles with compound trials, asymmetric payoffs, and conditional base rates, calculating exact set operations—unions ($A \cup B$), intersections ($A \cap B$), complements ($A'$), Bayesian posteriors ($P(A \mid B)$), and binomial distributions—is essential for rigorous decision-making under uncertainty.

## Core Probability Formulas and Set Operations

### 1. Single-Event Probability and Complement ($P(A')$)

In an equiprobable sample space $\Omega$, the probability of event $A$ is the ratio of favorable outcomes $n(A)$ to total possible outcomes $n(\Omega)$. The complement $A'$ represents the event that $A$ does *not* occur:

$$P(A) = \frac{n(A)}{n(\Omega)}, \qquad P(A') = 1 - P(A)$$

### 2. Multiplication Rule: Intersection ($P(A \cap B)$)

The probability that both Event $A$ **and** Event $B$ occur simultaneously depends on statistical independence:

* **Independent Events**: $P(A \cap B) = P(A) \times P(B)$
* **Dependent Events**: $P(A \cap B) = P(A) \times P(B \mid A) = P(B) \times P(A \mid B)$
* **Mutually Exclusive (Disjoint) Events**: $P(A \cap B) = 0$

### 3. General Addition Rule: Union ($P(A \cup B)$)

The probability that at least one of the events ($A$ **or** $B$, or both) occurs subtracts their intersection to eliminate double-counting the overlap region:

$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

For the probability that **exactly one** of two events occurs (symmetric difference / exclusive OR, $A \triangle B$), subtract twice the intersection: $P(A \triangle B) = P(A) + P(B) - 2P(A \cap B)$.

### 4. Conditional Probability and Bayes' Theorem

Conditional probability $P(A \mid B)$ measures the likelihood of event $A$ occurring given that event $B$ has already occurred. Expanding $P(B)$ via the Law of Total Probability gives Bayes' Theorem:

$$P(A \mid B) = \frac{P(A \cap B)}{P(B)} = \frac{P(B \mid A) \cdot P(A)}{P(B \mid A)P(A) + P(B \mid A')P(A')}$$

### 5. Binomial Distribution, Expected Value, and Odds

For $k$ successes across $n$ independent Bernoulli trials with single-trial probability $p$:

$$P(X = k) = \binom{n}{k} p^k (1 - p)^{n - k} = \frac{n!}{k!(n - k)!} p^k (1 - p)^{n - k}$$

For a discrete random variable $X$ with outcomes $x_i$ and probabilities $p_i$, expected value and odds conversions are:

$$E[X] = \sum_{i=1}^{m} x_i P(X = x_i), \qquad \text{Odds in Favor} = \frac{p}{1 - p}, \qquad p = \frac{a}{a + b}$$

### Variable Definitions

* $\Omega$: Complete sample space of all possible elementary outcomes.
* $P(A \cap B)$: Joint intersection probability that both $A$ and $B$ occur.
* $P(A \cup B)$: Union probability that $A$, $B$, or both occur.
* $P(A)$: Prior baseline probability of hypothesis $A$ before new evidence.
* $P(B \mid A)$: Conditional likelihood of evidence $B$ given that $A$ is true.
* $P(A \mid B)$: Posterior probability of $A$ after accounting for evidence $B$.
* $\binom{n}{k}$: Binomial coefficient counting combinations of $k$ successes in $n$ trials.

## Step-by-Step Worked Calculation Examples

### Example 1: Compound Independent Events

Suppose an aerospace system relies on two independent tracking sensors where Sensor $A$ detects an anomaly with probability $P(A) = 0.40$ and Sensor $B$ detects it with probability $P(B) = 0.25$.

1. **Both sensors detect ($A \cap B$)**: $P(A \cap B) = 0.40 \times 0.25 = 0.10$ ($10.0\%$).
2. **At least one detects ($A \cup B$)**: $P(A \cup B) = 0.40 + 0.25 - 0.10 = 0.55$ ($55.0\%$).
3. **Exactly one detects ($A \triangle B$)**: $P(A \triangle B) = 0.40 + 0.25 - 2(0.10) = 0.45$ ($45.0\%$).
4. **Neither detects ($A' \cap B'$)**: $P(A' \cap B') = 1 - 0.55 = 0.45$ ($45.0\%$), matching $0.60 \times 0.75 = 0.45$.

### Example 2: Bayes' Theorem and the Diagnostic Base-Rate Fallacy

Suppose a manufacturing defect occurs in $1\%$ of microchips ($P(D) = 0.01$, $P(D') = 0.99$). An optical scan has $95\%$ sensitivity ($P(+ \mid D) = 0.95$) and $90\%$ specificity, corresponding to a $10\%$ false-positive rate ($P(+ \mid D') = 0.10$). If a chip triggers a positive alarm, what is the posterior probability $P(D \mid +)$ that it is defective?

1. **True Positive Joint Probability**: $P(+ \mid D)P(D) = 0.95 \times 0.01 = 0.0095$.
2. **False Positive Joint Probability**: $P(+ \mid D')P(D') = 0.10 \times 0.99 = 0.0990$.
3. **Total Positive Alarm Probability**: $P(+) = 0.0095 + 0.0990 = 0.1085$ ($10.85\%$).
4. **Posterior Probability**:
   $$P(D \mid +) = \frac{0.0095}{0.1085} \approx 0.08756 \quad (8.76\%)$$

Even with $95\%$ sensitivity, only $8.76\%$ of flagged chips are defective because the $10\%$ false-positive rate acts on the $99\%$ non-defective majority.

## Reference Table of Compound Probability Operations

| Probability Operation | Set Notation | Mathematical Formula | Logical Condition | Verbal Interpretation |
| :--- | :--- | :--- | :--- | :--- |
| **Complement** | $P(A')$ | $1 - P(A)$ | Unary negation | Event $A$ does **not** occur |
| **Independent Intersection** | $P(A \cap B)$ | $P(A) \cdot P(B)$ | $P(B \mid A) = P(B)$ | **Both** $A$ and $B$ occur independently |
| **Dependent Intersection** | $P(A \cap B)$ | $P(A) \cdot P(B \mid A)$ | $B$ depends on $A$ | **Both** $A$ and $B$ occur sequentially |
| **Disjoint Union** | $P(A \cup B)$ | $P(A) + P(B)$ | $P(A \cap B) = 0$ | **Either** $A$ or $B$ occurs (disjoint) |
| **General Union** | $P(A \cup B)$ | $P(A) + P(B) - P(A \cap B)$ | Overlapping events | **At least one** of $A$ or $B$ occurs |
| **Symmetric Difference** | $P(A \triangle B)$ | $P(A) + P(B) - 2P(A \cap B)$ | Exclusive OR (XOR) | **Exactly one** of $A$ or $B$ occurs |
| **Neither Event** | $P(A' \cap B')$ | $1 - P(A \cup B)$ | De Morgan's Law | **Neither** $A$ nor $B$ occurs |
| **At Least One in $n$ Trials** | $P(X \ge 1)$ | $1 - (1 - p)^n$ | $n$ independent trials | Event occurs $\ge 1$ time in $n$ trials |
