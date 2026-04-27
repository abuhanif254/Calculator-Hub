export interface BmiResult {
  bmi: number;
  category: string;
  healthyWeightRange: {
    min: number;
    max: number;
  };
}

export const calculateBmi = (weightKg: number, heightCm: number): BmiResult => {
  const heightM = heightCm / 100;
  if (heightM <= 0 || weightKg <= 0) return { bmi: 0, category: "Invalid input", healthyWeightRange: { min: 0, max: 0 }};

  const bmi = weightKg / (heightM * heightM);

  let category = "";
  if (bmi < 18.5) category = "Underweight";
  else if (bmi >= 18.5 && bmi < 25) category = "Normal weight";
  else if (bmi >= 25 && bmi < 30) category = "Overweight";
  else category = "Obesity";

  // Healthy weight range (BMI 18.5 - 24.9)
  const minNormalWeight = 18.5 * (heightM * heightM);
  const maxNormalWeight = 24.9 * (heightM * heightM);

  return {
    bmi,
    category,
    healthyWeightRange: {
      min: minNormalWeight,
      max: maxNormalWeight
    }
  };
};
