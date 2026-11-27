---
title: "One Rep Max (1RM) Calculator"
description: "Calculate your One Rep Max safely using Epley and Brzycki formulas. Explore rep-range validity from 2 to 10 reps, periodization zones, and testing protocols."
faqs:
  - question: "Which is more accurate: the Epley formula or the Brzycki formula?"
    answer: "Between 2 and 10 repetitions, both equations stay within roughly 3% to 4% of each other and intersect at exactly 10 reps (where both yield 1.333 times the lifted weight). Brzycki tends to be slightly more conservative at 2 to 6 reps, while Epley tracks compound barbell lifts slightly better near 8 to 10 reps."
  - question: "Why should I avoid calculating 1RM from sets of 12 or more reps?"
    answer: "Submaximal prediction formulas rely on a near-linear relationship between load and fatigue that breaks down above 10 repetitions. Above 12 reps, muscular endurance, cardiovascular fatigue, and lactic acid tolerance distort the curve, causing Brzycki in particular to overestimate true 1RM."
  - question: "Is submaximal 1RM estimation safer than testing a true single-rep max?"
    answer: "Yes, for most lifters. True 1RM attempts carry elevated acute joint shear and form-breakdown risk, especially for beginners or solo lifters without spotters. Estimating 1RM from a crisp 3-to-6-rep technical set (stopping 1 to 2 reps shy of failure) yields reliable training percentages with far lower injury exposure."
  - question: "How do I use my estimated 1RM for percentage-based periodization?"
    answer: "Strength coaches typically program training blocks as percentages of a conservative Training Max (often 90% of true 1RM) or directly from your estimated 1RM: 85%–95% for maximal strength, 70%–82.5% for hypertrophy, and 50%–65% for bar-speed or muscular endurance work."
  - question: "Does the 1RM formula work equally well for isolation exercises and squats?"
    answer: "1RM calculators are calibrated primarily on multi-joint barbell movements like the back squat, bench press, deadlift, and overhead press. Single-joint isolation lifts such as bicep curls or lateral raises exhibit steeper fatigue curves and are best progressed by rep targets rather than 1RM percentages."
---

A **One Rep Max (1RM)** is the maximum weight you can lift for a single complete repetition with strict, standardized technique. Knowing your 1RM allows you to prescribe exact loading percentages for strength, hypertrophy, and power blocks without subjecting your joints and central nervous system to frequent maximal testing.

In 2026 strength-and-conditioning practice—aligned with American College of Sports Medicine (ACSM) and National Strength and Conditioning Association (NSCA) resistance-training guidelines—submaximal prediction formulas such as **Epley** and **Brzycki** are the preferred standard for safely estimating maximal strength from routine working sets of `2` to `10` repetitions.

## Mathematical Formula, Variables, and Validity Boundaries

The two most widely validated submaximal 1RM equations map lifted weight (`w`) and completed repetitions (`r`) to an estimated single-rep ceiling:

* **Epley Formula (1985):** `1RM = w × (1 + r ÷ 30)` *(for `r > 1`)*
* **Brzycki Formula (1993):** `1RM = w × 36 ÷ (37 − r)` *(for `1 ≤ r < 37`)*
* **Target Training Load:** `Working Weight = 1RM × (% Intensity ÷ 100)`

Here, `w` is the external load lifted (in `lb` or `kg`), and `r` is the number of full-range repetitions completed without assistance or momentum cheating. Notice the mathematical symmetry between the two models:

* At `r = 1`, Brzycki returns `w × 36 ÷ 36 = w`, whereas Epley requires `r > 1` by definition (`r = 1` simply equals `w`).
* Between `2` and `9` reps, Epley produces a slightly higher estimate than Brzycki (`3.7%` higher at `5` reps).
* At `r = 10`, both equations converge identically: Epley gives `w × (1 + 10 ÷ 30) = 1.3333w`, and Brzycki gives `w × 36 ÷ 27 = 1.3333w`.
* Above `10` reps, Brzycki's denominator (`37 − r`) shrinks rapidly, causing hyperbolic overestimation—at `20` reps it predicts `2.12w`, which rarely reflects true neuromuscular max strength. For valid predictions, restrict input sets to **2–10 clean reps** (ideally **3–6 reps** for heavy compound lifts).

Once you establish an estimated 1RM, many strength coaches derive a conservative **Training Max (TM)** set at `90%` of your estimated 1RM. Programming multi-week progressions off a Training Max builds a built-in buffer for daily fatigue, improves bar speed, and reduces the likelihood of technical breakdown or missed repetitions late in a training block.

## Step-by-Step Worked Practical Example

Suppose an intermediate lifter performs a clean, paused set of barbell back squats at `225 lb` (`102.1 kg`) for `5` repetitions, stopping with roughly one repetition in reserve (`RIR 1`).

1. **Calculate 1RM using the Epley formula:**
   `1RM_Epley = 225 × (1 + 5 ÷ 30) = 225 × 1.16667 = 262.5 lb` (`119.1 kg`).
2. **Calculate 1RM using the Brzycki formula:**
   `1RM_Brzycki = 225 × 36 ÷ (37 − 5) = 8,100 ÷ 32 = 253.1 lb` (`114.8 kg`).
3. **Establish a conservative working 1RM:**
   Averaging the two gives `257.8 lb`, or rounding conservatively to `255 lb` (`115.7 kg`) for programming. Using a conservative benchmark prevents missed lifts when fatigue accumulates mid-cycle.
4. **Derive weekly periodization loads from `255 lb`:**
   * **Hypertrophy block (`75%` of 1RM):** `255 × 0.75 = 191.25 lb` → load `190 lb` (`86.2 kg`) for sets of `8–10` reps.
   * **Strength block (`85%` of 1RM):** `255 × 0.85 = 216.75 lb` → load `215 lb` (`97.5 kg`) for sets of `4–5` reps.
   * **Peaking block (`92.5%` of 1RM):** `255 × 0.925 = 235.88 lb` → load `235 lb` (`106.6 kg`) for `2–3` reps.

## Percentage Periodization Benchmark Table

The loading chart below applies NSCA/ACSM resistance-training zones to a `260 lb` (`118 kg`) estimated 1RM across common mesocycle phases.

| Intensity (% 1RM) | Working Load (`lb` / `kg`) | Expected Rep Capacity | Primary Physiological Adaptation | Recommended Rest Interval |
| :--- | :--- | :--- | :--- | :--- |
| **90%–100%** | 234–260 lb (106–118 kg) | 1–4 reps | Maximal Strength & Neural Drive | 3–5 minutes |
| **85%** | 221 lb (100 kg) | 5–6 reps | Heavy Strength & Force Production | 2–4 minutes |
| **80%** | 208 lb (94 kg) | 7–8 reps | Strength–Hypertrophy Bridge | 2–3 minutes |
| **75%** | 195 lb (88.5 kg) | 8–10 reps | Myofibrillar Hypertrophy | 90–120 seconds |
| **65%–70%** | 169–182 lb (76.5–82.5 kg) | 10–15 reps | Volume Hypertrophy & Technique | 60–90 seconds |
| **50%–60%** | 130–156 lb (59–71 kg) | 15–20+ reps *(or 2–3 explosive)* | Muscular Endurance / Bar Speed | 30–60 seconds |

## Strategic Insights, Common Mistakes, and Safety Caveats

* **Standardize range of motion before trusting numbers:** A high squat or bounced bench press inflates `w` or `r` artificially. Only count repetitions meeting full competition or strict training depth and pause standards.
* **Respect ACSM screening and warm-up protocols:** Never jump straight to a heavy 3RM test cold. Perform 2–3 progressive warm-up sets (`50%`, `70%`, `82.5%`), set safety pins or spotter arms properly, and avoid true 1RM testing during your first 8–12 weeks of resistance training.
* **Account for daily readiness fluctuations:** Sleep loss, caloric deficits, and high life stress can shift day-to-day 1RM readiness by `5%–10%`. Autoregulate percentage prescriptions using Ratings of Perceived Exertion (RPE) alongside fixed math.
* **Do not extrapolate bodyweight-plus-load exercises naively:** On weighted pull-ups or dips, `w` must include **both** your body weight and added belt weight before applying Epley or Brzycki; otherwise, the percentage error distorts the result.

*Disclaimer: Strength testing and heavy resistance training carry inherent musculoskeletal and cardiovascular risk. This calculator provides theoretical estimates for training design only and is not medical advice; beginners and individuals with cardiovascular, spinal, or joint conditions should seek clearance from a qualified healthcare provider or certified strength coach.*
