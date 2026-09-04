// ═══════════════════════════════════════════════════════════════════════
// lib/data/calculatorFormulas.ts
// Central registry of mathematical formulas, variable definitions,
// and semantic formula FAQ embeddings for Nexus Calculator Hub.
// ═══════════════════════════════════════════════════════════════════════

export interface FormulaVariable {
  symbol: string;
  name: string;
  description: string;
}

export interface CalculatorFormulaDef {
  /** Calculator slugs that utilize this exact mathematical model */
  slugs: string[];
  /** Common name of the formula */
  name: string;
  /** Primary formula expression in standard math notation */
  formula: string;
  /** Optional LaTeX expression for rendering engines */
  latex?: string;
  /** Ordered list of variables used in the equation */
  variables: FormulaVariable[];
  /** Concise step-by-step calculation methodology */
  stepByStep: string;
  /** SEO-optimized FAQ question and answer pair */
  faq: {
    question: string;
    answer: string;
  };
}

export const calculatorFormulas: CalculatorFormulaDef[] = [
  // ─── 1. LOANS & AMORTIZATION ──────────────────────────────────────────
  {
    slugs: [
      'mortgage-calculator',
      'loan-calculator',
      'amortization-calculator',
      'auto-loan-calculator',
      'personal-loan-calculator',
      'student-loan-calculator',
      'business-loan-calculator',
      'fha-loan-calculator',
      'va-mortgage-calculator',
      'boat-loan-calculator',
      'rental-property-calculator',
      'heloc-calculator',
      'mortgage-amortization-calculator',
      'canadian-mortgage-calculator',
      'payment-calculator',
    ],
    name: 'Standard Amortization Payment Formula',
    formula: 'M = P [ i(1 + i)^n ] / [ (1 + i)^n - 1 ]',
    latex: 'M = P \\frac{i(1 + i)^n}{(1 + i)^n - 1}',
    variables: [
      { symbol: 'M', name: 'Monthly Payment', description: 'Total periodic principal and interest payment' },
      { symbol: 'P', name: 'Principal Loan Amount', description: 'Initial borrowed loan balance' },
      { symbol: 'i', name: 'Periodic Interest Rate', description: 'Annual interest rate divided by payment frequency (e.g. APR / 12)' },
      { symbol: 'n', name: 'Total Number of Payments', description: 'Loan term in years multiplied by periods per year (e.g. 30 × 12 = 360)' },
    ],
    stepByStep: '1. Divide annual interest rate by 12 to get periodic rate i. 2. Multiply loan term in years by 12 to get n payments. 3. Compute (1 + i)^n. 4. Multiply by P and i, then divide by [(1 + i)^n - 1].',
    faq: {
      question: 'What is the mathematical formula used to calculate loan and mortgage payments?',
      answer: 'Monthly amortizing loan payments are calculated using the standard formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n - 1 ], where M is the monthly payment, P is the principal loan amount, i is the monthly interest rate (annual rate divided by 12), and n is the total number of monthly payments over the term.',
    },
  },

  // ─── 2. COMPOUND INTEREST & INVESTMENTS ────────────────────────────────
  {
    slugs: [
      'compound-interest-calculator',
      'investment-calculator',
      'savings-calculator',
      'future-value-calculator',
      'cd-calculator',
      'average-return-calculator',
      'finance-calculator',
    ],
    name: 'Compound Interest Formula',
    formula: 'A = P (1 + r/n)^(nt)',
    latex: 'A = P \\left(1 + \\frac{r}{n}\\right)^{nt}',
    variables: [
      { symbol: 'A', name: 'Future Value', description: 'Total accumulated balance including principal and compounded interest' },
      { symbol: 'P', name: 'Principal Deposit', description: 'Initial sum of money invested' },
      { symbol: 'r', name: 'Annual Interest Rate', description: 'Nominal interest rate expressed in decimal form (e.g. 7% = 0.07)' },
      { symbol: 'n', name: 'Compounding Frequency', description: 'Number of times interest is applied per year (12 for monthly, 365 for daily)' },
      { symbol: 't', name: 'Time in Years', description: 'Total duration of the investment' },
    ],
    stepByStep: '1. Divide annual rate r by compounding frequency n. 2. Add 1 to the result. 3. Raise the sum to the power of (n × t). 4. Multiply by the initial principal P.',
    faq: {
      question: 'What is the compound interest formula and how does it work?',
      answer: 'Compound interest is modeled by the formula A = P(1 + r/n)^(nt), where A is the future investment value, P is the starting principal, r is the annual nominal interest rate in decimal, n is the compounding frequency per year, and t is the investment duration in years.',
    },
  },

  // ─── 3. SIMPLE INTEREST ───────────────────────────────────────────────
  {
    slugs: ['simple-interest-calculator', 'interest-calculator', 'interest-rate-calculator'],
    name: 'Simple Interest Formula',
    formula: 'I = P × r × t',
    latex: 'I = P \\times r \\times t',
    variables: [
      { symbol: 'I', name: 'Total Interest', description: 'Total interest accrued over the duration' },
      { symbol: 'P', name: 'Principal Amount', description: 'Original amount deposited or borrowed' },
      { symbol: 'r', name: 'Annual Interest Rate', description: 'Interest rate per year (in decimal, e.g. 5% = 0.05)' },
      { symbol: 't', name: 'Time', description: 'Duration in years' },
    ],
    stepByStep: '1. Convert annual interest rate to decimal. 2. Multiply principal by rate and time in years.',
    faq: {
      question: 'What is the simple interest formula?',
      answer: 'Simple interest is calculated using the equation I = P × r × t, where I represents the total accrued interest, P is the initial principal amount, r is the annual interest rate in decimal form, and t is the total duration in years.',
    },
  },

  // ─── 4. PRESENT VALUE ─────────────────────────────────────────────────
  {
    slugs: ['present-value-calculator'],
    name: 'Present Value Formula',
    formula: 'PV = FV / (1 + r)^n',
    latex: 'PV = \\frac{FV}{(1 + r)^n}',
    variables: [
      { symbol: 'PV', name: 'Present Value', description: 'Current lump-sum value of a future cash flow' },
      { symbol: 'FV', name: 'Future Value', description: 'Expected amount to be received in the future' },
      { symbol: 'r', name: 'Discount Rate', description: 'Rate of return per discounting period' },
      { symbol: 'n', name: 'Number of Periods', description: 'Total periods between present date and future receipt' },
    ],
    stepByStep: '1. Add 1 to discount rate r. 2. Raise (1 + r) to power n. 3. Divide future value FV by the result.',
    faq: {
      question: 'What is the formula for Present Value (PV)?',
      answer: 'The present value formula is PV = FV / (1 + r)^n, where PV is the present value, FV is the expected future cash amount, r is the periodic discount rate, and n is the total number of compounding or discounting periods.',
    },
  },

  // ─── 5. DEBT-TO-INCOME (DTI) ──────────────────────────────────────────
  {
    slugs: ['debt-to-income-ratio-calculator'],
    name: 'Debt-to-Income (DTI) Ratio Formula',
    formula: 'DTI = (Total Monthly Debt Payments / Gross Monthly Income) × 100',
    latex: 'DTI = \\frac{\\text{Monthly Debt}}{\\text{Gross Monthly Income}} \\times 100',
    variables: [
      { symbol: 'DTI', name: 'Debt-to-Income Ratio', description: 'Percentage of gross income committed to monthly debts' },
      { symbol: 'Debt', name: 'Monthly Debt Obligations', description: 'Sum of minimum credit card, loan, and housing payments' },
      { symbol: 'Income', name: 'Gross Monthly Income', description: 'Total pre-tax earnings across all verifiable sources' },
    ],
    stepByStep: '1. Sum all minimum recurring monthly debt payments. 2. Divide by total gross pre-tax monthly income. 3. Multiply by 100 to get percentage.',
    faq: {
      question: 'How is Debt-to-Income (DTI) ratio calculated?',
      answer: 'The DTI ratio formula is: DTI = (Total Monthly Debt Payments / Gross Monthly Income) × 100. Lenders typically prefer a back-end DTI of 36% or lower for conventional mortgages, with 43%–50% being the maximum allowable limit.',
    },
  },

  // ─── 6. BMI (BODY MASS INDEX) ─────────────────────────────────────────
  {
    slugs: ['bmi-calculator'],
    name: 'Body Mass Index (BMI) Formula',
    formula: 'BMI = weight(kg) / [height(m)]²  OR  BMI = 703 × weight(lbs) / [height(in)]²',
    latex: 'BMI = \\frac{\\text{weight (kg)}}{[\\text{height (m)}]^2} = \\frac{703 \\times \\text{weight (lbs)}}{[\\text{height (in)}]^2}',
    variables: [
      { symbol: 'BMI', name: 'Body Mass Index', description: 'Standard clinical ratio of mass to squared stature' },
      { symbol: 'Weight', name: 'Body Weight', description: 'Measured body weight in kilograms (or pounds)' },
      { symbol: 'Height', name: 'Stature', description: 'Height in meters (or inches)' },
    ],
    stepByStep: '1. For metric: square height in meters, then divide weight in kg by that number. 2. For imperial: divide weight in lbs by height in inches squared, then multiply by 703.',
    faq: {
      question: 'What is the formula to calculate Body Mass Index (BMI)?',
      answer: 'In metric units, BMI = weight (kg) / [height (m)]². In imperial units, BMI = 703 × weight (lbs) / [height (in)]². Standard WHO categories classify under 18.5 as underweight, 18.5–24.9 as normal, 25.0–29.9 as overweight, and 30.0+ as obese.',
    },
  },

  // ─── 7. BMR & CALORIES (MIFFLIN-ST JEOR) ──────────────────────────────
  {
    slugs: ['bmr-calculator', 'calorie-calculator', 'daily-caloric-needs'],
    name: 'Mifflin-St Jeor BMR Equation',
    formula: 'Men: BMR = 10W + 6.25H - 5A + 5  |  Women: BMR = 10W + 6.25H - 5A - 161',
    latex: '\\text{BMR}_{\\text{men}} = 10W + 6.25H - 5A + 5, \\quad \\text{BMR}_{\\text{women}} = 10W + 6.25H - 5A - 161',
    variables: [
      { symbol: 'BMR', name: 'Basal Metabolic Rate', description: 'Baseline calories burned at complete rest' },
      { symbol: 'W', name: 'Weight in kg', description: 'Body mass in kilograms' },
      { symbol: 'H', name: 'Height in cm', description: 'Stature in centimeters' },
      { symbol: 'A', name: 'Age in years', description: 'Chronological age in years' },
    ],
    stepByStep: '1. Multiply weight in kg by 10. 2. Multiply height in cm by 6.25. 3. Multiply age by 5 and subtract. 4. Add +5 for men or subtract 161 for women.',
    faq: {
      question: 'What equation is used to calculate BMR and daily caloric needs?',
      answer: 'We use the clinically validated Mifflin-St Jeor equation: Men: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5; Women: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161. Total Daily Energy Expenditure (TDEE) is then calculated by multiplying BMR by an activity factor (1.2 to 1.9).',
    },
  },

  // ─── 8. PERCENTAGE & PERCENT ERROR ────────────────────────────────────
  {
    slugs: ['percentage-calculator'],
    name: 'Percentage Formula',
    formula: 'Percentage = (Part / Whole) × 100',
    latex: '\\text{Percentage} = \\frac{\\text{Part}}{\\text{Whole}} \\times 100',
    variables: [
      { symbol: 'P', name: 'Percentage', description: 'Fraction expressed per 100 units' },
      { symbol: 'Part', name: 'Portion Value', description: 'Subset value being measured' },
      { symbol: 'Whole', name: 'Base Value', description: 'Total reference quantity' },
    ],
    stepByStep: '1. Divide part by the whole value. 2. Multiply quotient by 100.',
    faq: {
      question: 'What is the formula to calculate a percentage?',
      answer: 'The fundamental percentage formula is: Percentage = (Part / Whole) × 100. To find the percentage change between two numbers: Change% = [(New Value - Old Value) / |Old Value|] × 100.',
    },
  },
  {
    slugs: ['percent-error-calculator'],
    name: 'Percent Error Formula',
    formula: 'Percent Error = (|Experimental - Theoretical| / Theoretical) × 100',
    latex: '\\text{Percent Error} = \\frac{|V_{\\text{exp}} - V_{\\text{theor}}|}{V_{\\text{theor}}} \\times 100',
    variables: [
      { symbol: 'Vexp', name: 'Experimental Value', description: 'Observed measurement from laboratory trial' },
      { symbol: 'Vtheor', name: 'Theoretical Value', description: 'Accepted literature or calculated true value' },
    ],
    stepByStep: '1. Subtract theoretical value from experimental value. 2. Take absolute value. 3. Divide by theoretical value and multiply by 100.',
    faq: {
      question: 'How do you calculate percent error in science and math?',
      answer: 'Percent error is calculated using the formula: Percent Error = (|Experimental Value - Theoretical Value| / Theoretical Value) × 100. It gauges accuracy in laboratory experiments by comparing measured outcomes against theoretical standards.',
    },
  },

  // ─── 9. KINEMATICS & PHYSICS MECHANICS ────────────────────────────────
  {
    slugs: ['velocity-calculator'],
    name: 'Velocity Formula',
    formula: 'v = Δd / Δt  OR  v = v₀ + at',
    latex: 'v = \\frac{\\Delta d}{\\Delta t}, \\quad v = v_0 + at',
    variables: [
      { symbol: 'v', name: 'Velocity', description: 'Rate of change of displacement over time (m/s)' },
      { symbol: 'Δd', name: 'Displacement', description: 'Change in position (meters)' },
      { symbol: 'Δt', name: 'Time Interval', description: 'Elapsed duration (seconds)' },
      { symbol: 'a', name: 'Acceleration', description: 'Rate of velocity change (m/s²)' },
    ],
    stepByStep: '1. Determine displacement and divide by elapsed time. 2. Under acceleration: add initial velocity v0 to (acceleration × time).',
    faq: {
      question: 'What is the formula for calculating velocity?',
      answer: 'Average velocity is given by v = Δd / Δt (displacement divided by elapsed time). For uniformly accelerated motion, final velocity is computed via v = v₀ + at, where v₀ is initial velocity, a is acceleration, and t is time.',
    },
  },
  {
    slugs: ['acceleration-calculator'],
    name: 'Acceleration Formula',
    formula: 'a = (v_f - v_i) / t',
    latex: 'a = \\frac{v_f - v_i}{t}',
    variables: [
      { symbol: 'a', name: 'Acceleration', description: 'Rate of change of velocity (m/s²)' },
      { symbol: 'vf', name: 'Final Velocity', description: 'Ending speed in m/s' },
      { symbol: 'vi', name: 'Initial Velocity', description: 'Starting speed in m/s' },
      { symbol: 't', name: 'Time Elapsed', description: 'Duration in seconds' },
    ],
    stepByStep: '1. Subtract initial velocity from final velocity. 2. Divide delta velocity by elapsed seconds.',
    faq: {
      question: 'What is the formula to calculate acceleration?',
      answer: 'Acceleration is calculated as a = (v_f - v_i) / t, where v_f is final velocity, v_i is initial velocity, and t is time elapsed. Newton’s second law also defines acceleration as a = F / m (net force divided by mass).',
    },
  },
  {
    slugs: ['force-calculator'],
    name: "Newton's Second Law Formula",
    formula: 'F = m × a',
    latex: 'F = m \\times a',
    variables: [
      { symbol: 'F', name: 'Force', description: 'Net force in Newtons (N = kg·m/s²)' },
      { symbol: 'm', name: 'Mass', description: 'Object mass in kilograms (kg)' },
      { symbol: 'a', name: 'Acceleration', description: 'Acceleration rate in m/s²' },
    ],
    stepByStep: '1. Multiply object mass in kg by acceleration in m/s².',
    faq: {
      question: 'What is the formula for force (Newton’s Second Law)?',
      answer: 'Force is calculated using Newton’s Second Law: F = m × a, where F is net force in Newtons, m is mass in kilograms, and a is acceleration in meters per second squared (m/s²).',
    },
  },
  {
    slugs: ['kinetic-energy-calculator'],
    name: 'Kinetic Energy Formula',
    formula: 'KE = ½ m v²',
    latex: 'KE = \\frac{1}{2} m v^2',
    variables: [
      { symbol: 'KE', name: 'Kinetic Energy', description: 'Energy possessed by motion in Joules (J)' },
      { symbol: 'm', name: 'Mass', description: 'Mass of object in kilograms' },
      { symbol: 'v', name: 'Velocity', description: 'Speed in meters per second' },
    ],
    stepByStep: '1. Square the velocity v². 2. Multiply by mass m. 3. Divide by 2.',
    faq: {
      question: 'What is the formula for kinetic energy?',
      answer: 'The kinetic energy formula is KE = ½ m v², where KE is energy in Joules (J), m is object mass in kilograms (kg), and v is velocity in meters per second (m/s).',
    },
  },
  {
    slugs: ['potential-energy-calculator'],
    name: 'Gravitational Potential Energy Formula',
    formula: 'PE = m × g × h',
    latex: 'PE = m \\times g \\times h',
    variables: [
      { symbol: 'PE', name: 'Potential Energy', description: 'Stored gravitational energy in Joules (J)' },
      { symbol: 'm', name: 'Mass', description: 'Object mass in kilograms' },
      { symbol: 'g', name: 'Gravitational Acceleration', description: 'Standard gravity (9.80665 m/s² on Earth)' },
      { symbol: 'h', name: 'Height', description: 'Vertical elevation above ground in meters' },
    ],
    stepByStep: '1. Multiply mass by gravitational acceleration (9.81 m/s²). 2. Multiply by height in meters.',
    faq: {
      question: 'How do you calculate gravitational potential energy?',
      answer: 'Gravitational potential energy is calculated via PE = m × g × h, where m is mass in kilograms, g is acceleration due to gravity (9.81 m/s² on Earth), and h is height in meters.',
    },
  },
  {
    slugs: ['momentum-calculator'],
    name: 'Linear Momentum Formula',
    formula: 'p = m × v',
    latex: 'p = m \\times v',
    variables: [
      { symbol: 'p', name: 'Momentum', description: 'Linear momentum in kg·m/s' },
      { symbol: 'm', name: 'Mass', description: 'Object mass in kilograms' },
      { symbol: 'v', name: 'Velocity', description: 'Object velocity in m/s' },
    ],
    stepByStep: '1. Multiply mass in kg by velocity in m/s.',
    faq: {
      question: 'What is the formula for linear momentum?',
      answer: 'Linear momentum is defined as p = m × v, where p is momentum in kg·m/s, m is mass in kilograms, and v is velocity in meters per second.',
    },
  },
  {
    slugs: ['projectile-motion-calculator'],
    name: '2D Projectile Motion Formulas',
    formula: 'Range: R = (v₀² sin 2θ) / g  |  Max Height: H = (v₀² sin² θ) / (2g)',
    latex: 'R = \\frac{v_0^2 \\sin(2\\theta)}{g}, \\quad H = \\frac{v_0^2 \\sin^2(\\theta)}{2g}',
    variables: [
      { symbol: 'v₀', name: 'Launch Velocity', description: 'Initial launch speed in m/s' },
      { symbol: 'θ', name: 'Launch Angle', description: 'Angle of release in degrees' },
      { symbol: 'g', name: 'Gravity', description: 'Gravitational acceleration (9.81 m/s²)' },
    ],
    stepByStep: '1. Compute horizontal velocity vx = v0 cos θ and vertical velocity vy = v0 sin θ. 2. Calculate flight time t = 2 vy / g. 3. Range R = vx × t.',
    faq: {
      question: 'What are the formulas for projectile motion trajectory and range?',
      answer: 'For ideal projectile motion launched from ground level: Horizontal range R = (v₀² sin 2θ) / g; Maximum height H = (v₀² sin² θ) / (2g); Total flight time t = (2 v₀ sin θ) / g, where v₀ is launch velocity, θ is launch angle, and g is gravity (9.81 m/s²).',
    },
  },

  // ─── 10. OHM\'S LAW & ELECTRICAL ───────────────────────────────────────
  {
    slugs: ['ohms-law-calculator', 'voltage-calculator', 'current-calculator', 'resistance-calculator'],
    name: "Ohm's Law Formula",
    formula: 'V = I × R  |  I = V / R  |  R = V / I',
    latex: 'V = I \\times R, \\quad I = \\frac{V}{R}, \\quad R = \\frac{V}{I}',
    variables: [
      { symbol: 'V', name: 'Voltage', description: 'Electrical potential difference in Volts (V)' },
      { symbol: 'I', name: 'Current', description: 'Electric current in Amperes (A)' },
      { symbol: 'R', name: 'Resistance', description: 'Electrical resistance in Ohms (Ω)' },
    ],
    stepByStep: '1. To find Voltage: multiply current I by resistance R. 2. To find Current: divide voltage V by resistance R. 3. To find Resistance: divide voltage V by current I.',
    faq: {
      question: "What is Ohm's Law and its mathematical formula?",
      answer: "Ohm's Law defines the relationship between electrical potential, current, and resistance: V = I × R (Voltage = Current × Resistance). Rearranging yields I = V / R and R = V / I.",
    },
  },
  {
    slugs: ['electrical-power-calculator'],
    name: 'Electrical Power Formula (Joule’s Law)',
    formula: 'P = V × I = I² × R = V² / R',
    latex: 'P = V \\times I = I^2 R = \\frac{V^2}{R}',
    variables: [
      { symbol: 'P', name: 'Electric Power', description: 'Rate of energy consumption in Watts (W)' },
      { symbol: 'V', name: 'Voltage', description: 'Voltage in Volts (V)' },
      { symbol: 'I', name: 'Current', description: 'Current in Amperes (A)' },
      { symbol: 'R', name: 'Resistance', description: 'Resistance in Ohms (Ω)' },
    ],
    stepByStep: '1. Multiply voltage by current. 2. Alternately, square current and multiply by resistance, or square voltage and divide by resistance.',
    faq: {
      question: 'What is the electrical power formula?',
      answer: 'Electric power is calculated using P = V × I, where P is power in Watts (W), V is voltage in Volts (V), and I is current in Amperes (A). Combining with Ohm’s Law gives P = I²R and P = V² / R.',
    },
  },

  // ─── 11. CHEMISTRY: MOLARITY, MOLALITY & GAS LAWS ─────────────────────
  {
    slugs: ['molarity-calculator'],
    name: 'Molarity (Molar Concentration) Formula',
    formula: 'M = n / V  (moles of solute / liters of solution)',
    latex: 'M = \\frac{n}{V}',
    variables: [
      { symbol: 'M', name: 'Molarity', description: 'Molar concentration in mol/L (M)' },
      { symbol: 'n', name: 'Moles of Solute', description: 'Quantity of dissolved substance (mol = mass / molar mass)' },
      { symbol: 'V', name: 'Volume of Solution', description: 'Total solution volume in liters (L)' },
    ],
    stepByStep: '1. Convert solute mass to moles (n = mass / molar mass). 2. Convert solution volume to liters. 3. Divide moles by liters.',
    faq: {
      question: 'What is the molarity formula and how do you calculate it?',
      answer: 'Molarity (M) is calculated using the formula: M = n / V, where n is moles of solute (mass in grams divided by molar mass in g/mol) and V is the total volume of solution in liters (L).',
    },
  },
  {
    slugs: ['molality-calculator'],
    name: 'Molality Formula',
    formula: 'm = n_solute / kg_solvent',
    latex: 'm = \\frac{n_{\\text{solute}}}{\\text{mass of solvent (kg)}}',
    variables: [
      { symbol: 'm', name: 'Molality', description: 'Concentration in mol/kg (m)' },
      { symbol: 'n', name: 'Moles of Solute', description: 'Quantity of solute in moles' },
      { symbol: 'kg', name: 'Solvent Mass', description: 'Mass of pure solvent in kilograms' },
    ],
    stepByStep: '1. Find moles of solute. 2. Measure solvent mass in kg (excluding solute). 3. Divide solute moles by solvent kg.',
    faq: {
      question: 'What is the formula for molality and how does it differ from molarity?',
      answer: 'Molality (m) is calculated as: m = moles of solute / kilograms of solvent. Unlike molarity (which depends on solution volume and fluctuates with temperature), molality is temperature-independent because mass does not expand with heat.',
    },
  },
  {
    slugs: ['dilution-calculator', 'molarity-dilution-calculator'],
    name: 'Solution Dilution Formula',
    formula: 'M₁ × V₁ = M₂ × V₂',
    latex: 'M_1 V_1 = M_2 V_2',
    variables: [
      { symbol: 'M₁', name: 'Initial Concentration', description: 'Stock solution molarity' },
      { symbol: 'V₁', name: 'Initial Volume', description: 'Volume of stock solution required' },
      { symbol: 'M₂', name: 'Final Concentration', description: 'Desired diluted molarity' },
      { symbol: 'V₂', name: 'Final Volume', description: 'Total desired diluted solution volume' },
    ],
    stepByStep: '1. Identify three known variables. 2. Solve for unknown: V1 = (M2 × V2) / M1.',
    faq: {
      question: 'What is the dilution formula for chemistry solutions?',
      answer: 'The chemical dilution formula is M₁V₁ = M₂V₂, where M₁ is initial stock concentration, V₁ is stock volume, M₂ is desired final concentration, and V₂ is total final volume.',
    },
  },
  {
    slugs: ['ideal-gas-law-calculator'],
    name: 'Ideal Gas Law Formula',
    formula: 'PV = nRT',
    latex: 'P V = n R T',
    variables: [
      { symbol: 'P', name: 'Pressure', description: 'Gas pressure in atmospheres (atm) or Pascals (Pa)' },
      { symbol: 'V', name: 'Volume', description: 'Gas volume in liters (L) or m³' },
      { symbol: 'n', name: 'Amount of Gas', description: 'Number of moles of gas' },
      { symbol: 'R', name: 'Universal Gas Constant', description: '0.08206 L·atm/(mol·K) or 8.314 J/(mol·K)' },
      { symbol: 'T', name: 'Absolute Temperature', description: 'Temperature in Kelvin (K = °C + 273.15)' },
    ],
    stepByStep: '1. Convert temperature to Kelvin. 2. Ensure units align with gas constant R. 3. Rearrange PV = nRT for unknown variable.',
    faq: {
      question: 'What is the Ideal Gas Law equation?',
      answer: 'The Ideal Gas Law is PV = nRT, where P is pressure, V is volume, n is moles of gas, R is the universal gas constant (0.08206 L·atm/mol·K or 8.314 J/mol·K), and T is absolute temperature in Kelvin.',
    },
  },
  {
    slugs: ['ph-calculator', 'poh-calculator'],
    name: 'pH and pOH Formulas',
    formula: 'pH = -log₁₀[H⁺]  |  pOH = -log₁₀[OH⁻]  |  pH + pOH = 14',
    latex: '\\text{pH} = -\\log_{10}[\\text{H}^+], \\quad \\text{pOH} = -\\log_{10}[\\text{OH}^-], \\quad \\text{pH} + \\text{pOH} = 14',
    variables: [
      { symbol: 'pH', name: 'pH Scale', description: 'Logarithmic measure of hydronium acidity (0–14)' },
      { symbol: '[H⁺]', name: 'Hydronium Concentration', description: 'Hydrogen ion concentration in M (mol/L)' },
      { symbol: '[OH⁻]', name: 'Hydroxide Concentration', description: 'Hydroxide ion concentration in M (mol/L)' },
    ],
    stepByStep: '1. Take base-10 log of hydronium concentration [H+]. 2. Multiply by -1 to get pH. 3. Subtract pH from 14 to find pOH.',
    faq: {
      question: 'What is the formula to calculate pH and pOH?',
      answer: 'pH is calculated using pH = -log₁₀[H⁺], where [H⁺] is hydrogen/hydronium ion molar concentration. At 25°C, pH and pOH relate by: pH + pOH = 14. An acidic solution has pH < 7, neutral pH = 7, and alkaline pH > 7.',
    },
  },
];

/**
 * Retrieve formula definition for a specific calculator slug
 */
export function getFormulaForCalculator(slug: string): CalculatorFormulaDef | undefined {
  return calculatorFormulas.find((f) => f.slugs.includes(slug));
}

/**
 * Get an SEO-optimized FAQ pair with semantic math embedding for a calculator
 */
export function getFormulaFaq(
  slug: string,
  calculatorTitle: string,
  locale = 'en'
): { question: string; answer: string } | null {
  const formula = getFormulaForCalculator(slug);
  if (!formula) return null;

  const localizedQuestions: Record<string, string> = {
    en: `What is the mathematical formula used by the ${calculatorTitle}?`,
    es: `¿Cuál es la fórmula matemática utilizada por la ${calculatorTitle}?`,
    fr: `Quelle est la formule mathématique utilisée par le ${calculatorTitle} ?`,
    de: `Welche mathematische Formel verwendet der ${calculatorTitle}?`,
  };

  const localizedPrefixes: Record<string, string> = {
    en: `The primary formula used by the ${calculatorTitle} is: ${formula.formula}. Where: ${formula.variables.map(v => `${v.symbol} = ${v.name} (${v.description})`).join('; ')}. ${formula.stepByStep}`,
    es: `La fórmula principal utilizada por la ${calculatorTitle} es: ${formula.formula}. Donde: ${formula.variables.map(v => `${v.symbol} = ${v.name} (${v.description})`).join('; ')}. ${formula.stepByStep}`,
    fr: `La formule principale utilisée par le ${calculatorTitle} est : ${formula.formula}. Où : ${formula.variables.map(v => `${v.symbol} = ${v.name} (${v.description})`).join('; ')}. ${formula.stepByStep}`,
    de: `Die Hauptformel für den ${calculatorTitle} lautet: ${formula.formula}. Wobei: ${formula.variables.map(v => `${v.symbol} = ${v.name} (${v.description})`).join('; ')}. ${formula.stepByStep}`,
  };

  return {
    question: localizedQuestions[locale] || localizedQuestions.en,
    answer: localizedPrefixes[locale] || localizedPrefixes.en,
  };
}
