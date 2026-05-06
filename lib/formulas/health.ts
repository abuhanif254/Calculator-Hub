export interface BmiResult {
  bmi: number;
  category: string;
  healthyWeightRange: {
    min: number;
    max: number;
  };
  ponderalIndex?: number;
  bodyFatPercentage?: number;
}

export const calculateBmi = (weightKg: number, heightCm: number, age?: number, gender?: "male" | "female"): BmiResult => {
  const heightM = heightCm / 100;
  if (heightM <= 0 || weightKg <= 0) return { bmi: 0, category: "Invalid input", healthyWeightRange: { min: 0, max: 0 }};

  const bmi = weightKg / (heightM * heightM);
  const ponderalIndex = weightKg / (heightM * heightM * heightM);

  let category = "";
  if (bmi < 18.5) category = "Underweight";
  else if (bmi >= 18.5 && bmi < 25) category = "Normal weight";
  else if (bmi >= 25 && bmi < 30) category = "Overweight";
  else category = "Obesity";

  // Healthy weight range (BMI 18.5 - 24.9)
  const minNormalWeight = 18.5 * (heightM * heightM);
  const maxNormalWeight = 24.9 * (heightM * heightM);
  
  let bodyFatPercentage: number | undefined = undefined;
  if (age !== undefined && gender !== undefined && age > 0) {
    const isMale = gender === "male" ? 1 : 0;
    if (age < 15) {
      bodyFatPercentage = (1.51 * bmi) - (0.70 * age) - (3.6 * isMale) + 1.4;
    } else {
      bodyFatPercentage = (1.20 * bmi) + (0.23 * age) - (10.8 * isMale) - 5.4;
    }
    // Prevent negative or unrealistic values
    bodyFatPercentage = Math.max(0, Math.min(100, bodyFatPercentage));
  }

  return {
    bmi,
    category,
    healthyWeightRange: {
      min: minNormalWeight,
      max: maxNormalWeight
    },
    ponderalIndex,
    bodyFatPercentage
  };
};
