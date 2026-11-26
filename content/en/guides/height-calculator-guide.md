---
title: "How Tall Will My Child Be? The Science of Height Prediction"
description: "Explore the genetics of human growth, learn the Khamis-Roche method, and use our Height Calculator to predict your child's adult height."
category: "Health"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "height-calculator"
relatedType: "calculator"
faqs:
  - question: "How accurate is the Mid-Parental Height formula compared to the Khamis-Roche method?"
    answer: "The Mid-Parental Height formula uses only biological parents' heights and carries a wide 95% confidence interval of roughly ±4 inches (±10 cm). By adding the child's current height, weight, and exact chronological age (for ages 4 to 17.5), the Khamis-Roche method narrows median prediction error to roughly ±2.1 inches (5.3 cm) in boys and ±1.7 inches (4.3 cm) in girls."
  - question: "If height is 80% genetic, why do siblings sometimes differ by more than 4 inches?"
    answer: "Height is polygenic, governed by more than 12,000 genetic variants across the genome rather than a single gene. Siblings inherit random 50% combinations of parental alleles—meaning one child can receive a taller cluster of variants while another receives a shorter cluster—creating natural biological spread around the mid-parental target."
  - question: "What is the most accurate way to measure a child's height at home?"
    answer: "Measure barefoot against a flat, uncarpeted wall without baseboards, heels together and touching the wall, head aligned in the Frankfort horizontal plane (looking straight ahead), and use a rigid right-angle headboard rather than a tilted pencil. Measure at the same morning hour each time, since spinal discs compress by 1 to 2 cm by evening."
  - question: "When can a child's predicted height deviate significantly from genetic formulas?"
    answer: "Constitutional growth delay ('late bloomers') or precocious puberty shifts the timing of growth plate fusion without necessarily changing genetics, whereas chronic celiac disease, untreated hypothyroidism, growth hormone deficiency, severe malnutrition, or prolonged systemic corticosteroid use can suppress final adult stature below genetic potential."
  - question: "How do adult height percentiles differ by country?"
    answer: "Because adult male and female means vary widely worldwide—from 183.8 cm (6 ft 0.4 in) for men in the Netherlands to 175.3 cm (5 ft 9.0 in) in the United States and 170.8 cm (5 ft 7.2 in) in Japan—a 179 cm (5 ft 10.5 in) man ranks near the 25th percentile in the Netherlands, 70th in the US, and 91st in Japan."
---

Human adult stature is roughly **80% heritable**, shaped by thousands of additive genetic variants inherited from both biological parents, while the remaining **20%** reflects childhood nutrition, sleep, systemic health, and endocrine timing. Because stature tracks along predictable biological channels once early infancy stabilizes, pediatricians rely on standardized mathematical models to forecast a child's adult height years before growth plates fuse.

Whether you want to estimate a child's future stature from parental measurements, convert precisely between centimeters, meters, and fractional inches, or benchmark height against regional population Z-scores, our [Height Calculator](/en/calculators/height-calculator) integrates unit conversion, mid-parental prediction, regional percentiles, and BMI checks in one workspace.

## Quantitative Growth Models: Mid-Parental, Khamis-Roche, and Percentiles

Growth forecasting uses three complementary quantitative approaches depending on whether you have only parental heights, longitudinal childhood measurements, or population reference curves.

```text
Exact Metric Conversion   = (Feet × 12 + Inches) × 2.54 cm
Mid-Parental Boy (cm)     = (Father_cm + Mother_cm + 13) / 2     [±10 cm / ±4 in]
Mid-Parental Girl (cm)    = (Father_cm + Mother_cm − 13) / 2     [±10 cm / ±4 in]
Mid-Parental Boy (in)     = (Father_in + Mother_in + 5) / 2
Mid-Parental Girl (in)    = (Father_in + Mother_in − 5) / 2
Khamis-Roche Prediction   = β0 + β1(Height_cm) + β2(Weight_kg) + β3(Mid_Parental_cm)
Population Z-Score        = (Height_cm − Regional_Mean) / Regional_SD
```

### Parameter Definitions and Statistical Mechanics

- **Sex Dimorphism Offset (`13 cm` / `5 in`):** Adult men average roughly `13 cm` (`5.1 in`) taller than adult women from identical genetic backgrounds; adding or subtracting `13 cm` adjusts the opposite-sex parent's height onto the child's biological scale before averaging.
- **Khamis-Roche Coefficients (`β0, β1, β2, β3`):** Sex- and half-year-age-specific regression weights validated on the Fels Longitudinal Study for Caucasian children aged `4.0` to `17.5` years. Including current weight acts as a proxy for biological maturation speed.
- **Population Normal CDF (`Z-Score`):** Converts raw height into a percentile ranking via the Gaussian error function (`erf`) against regional adult means and standard deviations (`SD`).

## Step-by-Step Worked Prediction and Percentile Example

Suppose a father measures `5 ft 11 in` (`71 in` = `180.34 cm`) and a mother measures `5 ft 5 in` (`65 in` = `165.10 cm`).

1. **Mid-Parental Target for a Son:**
   - Imperial: `(71 + 65 + 5) / 2 = 141 / 2 = 70.5 in` (`5 ft 10.5 in`).
   - Metric: `(180.34 + 165.10 + 13) / 2 = 179.22 cm` (note `5 in = 12.7 cm`, whereas clinical rounding uses `13 cm`, producing a `0.15 cm` rounding difference).
   - **95% Genetic Target Range:** `66.5 in` to `74.5 in` (`5 ft 6.5 in` to `6 ft 2.5 in`, or roughly `169 cm` to `189 cm`).
2. **Mid-Parental Target for a Daughter:**
   - Imperial: `(71 + 65 − 5) / 2 = 131 / 2 = 65.5 in` (`5 ft 5.5 in`, or `166.37 cm`).
   - **95% Genetic Target Range:** `61.5 in` to `69.5 in` (`5 ft 1.5 in` to `5 ft 9.5 in`, or roughly `156 cm` to `176 cm`).
3. **Regional Adult Percentile Benchmark (`179.07 cm` / `5 ft 10.5 in` Male):**
   - **United States** (Mean `175.3 cm`, SD `7.4 cm`): `Z = +0.51` → **69.5th percentile**.
   - **Germany** (Mean `180.0 cm`, SD `7.1 cm`): `Z = −0.13` → **44.8th percentile**.
   - **Netherlands** (Mean `183.8 cm`, SD `7.1 cm`): `Z = −0.67` → **25.3rd percentile**.
   - **Japan** (Mean `170.8 cm`, SD `6.1 cm`): `Z = +1.36` → **91.2nd percentile**.

## Height Prediction Methods Benchmark Table

| Prediction Method | Required Inputs | Valid Age Range | Typical 95% Error Margin | Radiation / Clinical Visit | Best Practical Use Case |
|---|---|---|---|---|---|
| Mid-Parental Target Height | Father's & mother's heights, child's sex | Birth to 18 years | ±4.0 in (±10.0 cm) | None (formula only) | Establishing baseline genetic target zone early in childhood |
| Khamis-Roche Method | Child's age, height, weight, both parents' heights | 4.0 to 17.5 years | ±2.1 in boys / ±1.7 in girls | None (anthropometric only) | Non-invasive annual growth tracking without X-rays |
| Greulich-Pyle / Tanner-Whitehouse Bone Age | Left hand & wrist X-ray plus current height | 3 years to epiphyseal fusion | ±1.5 in (±3.8 cm) | Low-dose radiograph + specialist | Diagnosing precocious puberty or constitutional delay |
| CDC / WHO Percentile Tracking | Serial height measurements plotted over 12+ mo | 0 to 20 years | Tracks channel stability | Pediatric well-child visits | Detecting growth deceleration or percentile-crossing red flags |
| Simple Age-2 Doubling Rule | Child's standing height at exactly 24 months | Age 24 months (18 mo girls) | ±3.5 to ±4.5 in | None | Rough toddler estimate prior to preschool Khamis-Roche age |

## Clinical Caveats, Measurement Error, and Developmental Red Flags

Even the best mathematical predictor fails if input measurements are biased or biological assumptions break down:

- **Diurnal Spine Compression (`1–2 cm`):** Intervertebral discs lose fluid under gravity throughout the day. Measuring a child at `8:00 AM` versus `8:00 PM` can shift apparent height by up to `0.75 in` (`1.9 cm`), which exaggerates Khamis-Roche projections if extrapolated linearly.
- **Self-Reported Parental Bias:** Adults routinely over-report their height by `0.5` to `1.5 in` (`1.3` to `3.8 cm`), inflating a child's mid-parental target artificially. Measure both biological parents barefoot against a wall rather than relying on driver's license figures.
- **Population Calibration Limits:** Both the Khamis-Roche regression tables and U.S. CDC growth curves were calibrated primarily on North American cohorts; children of markedly different ancestry or early-maturing pubertal timelines may drift outside the standard confidence band.
- **When to Consult a Pediatric Endocrinologist:** A healthy child normally tracks along a stable percentile curve after age two. Schedule a clinical evaluation if a child's height drops below the **3rd percentile**, crosses **two major percentile lines downward**, or grows slower than **`5 cm` (`2 inches`) per year** between age four and the onset of puberty.
