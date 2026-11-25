// ═══════════════════════════════════════════════════════════════════════
// lib/data/matrices/healthMatrices.ts
// 10 mathematically verified, 4-language (EN / ES / FR / DE) Health,
// Nutrition, Fitness & Sleep Featured Snippet matrices (Imperial + Metric).
// ═══════════════════════════════════════════════════════════════════════

import type { CalculatorMatrixDef } from './types';

export const healthMatrices: CalculatorMatrixDef[] = [
  {
    "slugs": [
      "bmi-calculator",
      "bmi-calculator-for-men",
      "bmi-calculator-for-women"
    ],
    "title": "Adult BMI & Healthy Weight Matrix (WHO Standards)",
    "description": "World Health Organization Body Mass Index weight ranges across common adult heights from 5'3\" (160 cm) to 6'3\" (190 cm).",
    "headers": [
      "Height",
      "Underweight (<18.5)",
      "Normal (18.5–24.9)",
      "Overweight (25–29.9)",
      "Obese (≥30.0)"
    ],
    "translations": {
      "es": {
        "title": "Matriz de IMC y Peso Saludable para Adultos (Estándares OMS)",
        "description": "Rangos exactos de peso corporal en kilogramos según estatura en centímetros conforme a las categorías oficiales de la OMS.",
        "headers": [
          "Estatura",
          "Bajo Peso (<18,5)",
          "Normal (18,5–24,9)",
          "Sobrepeso (25–29,9)",
          "Obesidad (≥30,0)"
        ]
      },
      "fr": {
        "title": "Matrice IMC Adulte et Poids Santé (Normes OMS en kg/cm)",
        "description": "Plages officielles de poids en kilogrammes selon la taille en centimètres d’après la classification de l’OMS.",
        "headers": [
          "Taille",
          "Maigreur (<18,5)",
          "Poids Normal (18,5–24,9)",
          "Surpoids (25–29,9)",
          "Obésité (≥30,0)"
        ]
      },
      "de": {
        "title": "BMI- und Normalgewicht-Tabelle für Erwachsene (WHO-Standards)",
        "description": "Exakte Gewichtsbereiche in Kilogramm nach Körpergröße in Zentimetern gemäß Weltgesundheitsorganisation (WHO).",
        "headers": [
          "Körpergröße",
          "Untergewicht (<18,5)",
          "Normalgewicht (18,5–24,9)",
          "Übergewicht (25–29,9)",
          "Adipositas (≥30,0)"
        ]
      }
    },
    "rows": [
      {
        "label": "5'3\" (160 cm)",
        "values": [
          "Under 104 lbs",
          "104 – 141 lbs",
          "142 – 169 lbs",
          "169+ lbs"
        ],
        "params": {
          "height_feet": "5",
          "height_inches": "3",
          "height_cm": "160",
          "weight_lbs": "123",
          "weight_kg": "56"
        }
      },
      {
        "label": "5'6\" (168 cm)",
        "values": [
          "Under 115 lbs",
          "115 – 155 lbs",
          "156 – 186 lbs",
          "187+ lbs"
        ],
        "params": {
          "height_feet": "5",
          "height_inches": "6",
          "height_cm": "168",
          "weight_lbs": "134",
          "weight_kg": "61"
        }
      },
      {
        "label": "5'9\" (175 cm)",
        "values": [
          "Under 125 lbs",
          "125 – 168 lbs",
          "169 – 202 lbs",
          "203+ lbs"
        ],
        "params": {
          "height_feet": "5",
          "height_inches": "9",
          "height_cm": "175",
          "weight_lbs": "146",
          "weight_kg": "66"
        }
      },
      {
        "label": "6'0\" (183 cm)",
        "values": [
          "Under 137 lbs",
          "137 – 184 lbs",
          "185 – 221 lbs",
          "221+ lbs"
        ],
        "params": {
          "height_feet": "6",
          "height_inches": "0",
          "height_cm": "183",
          "weight_lbs": "161",
          "weight_kg": "73"
        }
      },
      {
        "label": "6'3\" (190 cm)",
        "values": [
          "Under 147 lbs",
          "147 – 198 lbs",
          "199 – 238 lbs",
          "239+ lbs"
        ],
        "params": {
          "height_feet": "6",
          "height_inches": "3",
          "height_cm": "190",
          "weight_lbs": "172",
          "weight_kg": "78"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "160 cm",
          "values": [
            "Menos de 47,4 kg",
            "47,4 – 63,7 kg",
            "63,8 – 76,5 kg",
            "≥ 76,8 kg"
          ],
          "params": {
            "height_cm": "160",
            "weight_kg": "56"
          }
        },
        {
          "label": "168 cm",
          "values": [
            "Menos de 52,2 kg",
            "52,2 – 70,3 kg",
            "70,4 – 84,4 kg",
            "≥ 84,7 kg"
          ],
          "params": {
            "height_cm": "168",
            "weight_kg": "61"
          }
        },
        {
          "label": "175 cm",
          "values": [
            "Menos de 56,7 kg",
            "56,7 – 76,3 kg",
            "76,4 – 91,6 kg",
            "≥ 91,9 kg"
          ],
          "params": {
            "height_cm": "175",
            "weight_kg": "66"
          }
        },
        {
          "label": "183 cm",
          "values": [
            "Menos de 62,0 kg",
            "62,0 – 83,4 kg",
            "83,5 – 100,1 kg",
            "≥ 100,5 kg"
          ],
          "params": {
            "height_cm": "183",
            "weight_kg": "73"
          }
        },
        {
          "label": "190 cm",
          "values": [
            "Menos de 66,8 kg",
            "66,8 – 89,9 kg",
            "90,0 – 107,9 kg",
            "≥ 108,3 kg"
          ],
          "params": {
            "height_cm": "190",
            "weight_kg": "78"
          }
        }
      ],
      "fr": [
        {
          "label": "160 cm",
          "values": [
            "Moins de 47,4 kg",
            "47,4 – 63,7 kg",
            "63,8 – 76,5 kg",
            "≥ 76,8 kg"
          ],
          "params": {
            "height_cm": "160",
            "weight_kg": "56"
          }
        },
        {
          "label": "168 cm",
          "values": [
            "Moins de 52,2 kg",
            "52,2 – 70,3 kg",
            "70,4 – 84,4 kg",
            "≥ 84,7 kg"
          ],
          "params": {
            "height_cm": "168",
            "weight_kg": "61"
          }
        },
        {
          "label": "175 cm",
          "values": [
            "Moins de 56,7 kg",
            "56,7 – 76,3 kg",
            "76,4 – 91,6 kg",
            "≥ 91,9 kg"
          ],
          "params": {
            "height_cm": "175",
            "weight_kg": "66"
          }
        },
        {
          "label": "183 cm",
          "values": [
            "Moins de 62,0 kg",
            "62,0 – 83,4 kg",
            "83,5 – 100,1 kg",
            "≥ 100,5 kg"
          ],
          "params": {
            "height_cm": "183",
            "weight_kg": "73"
          }
        },
        {
          "label": "190 cm",
          "values": [
            "Moins de 66,8 kg",
            "66,8 – 89,9 kg",
            "90,0 – 107,9 kg",
            "≥ 108,3 kg"
          ],
          "params": {
            "height_cm": "190",
            "weight_kg": "78"
          }
        }
      ],
      "de": [
        {
          "label": "160 cm",
          "values": [
            "Unter 47,4 kg",
            "47,4 – 63,7 kg",
            "63,8 – 76,5 kg",
            "≥ 76,8 kg"
          ],
          "params": {
            "height_cm": "160",
            "weight_kg": "56"
          }
        },
        {
          "label": "168 cm",
          "values": [
            "Unter 52,2 kg",
            "52,2 – 70,3 kg",
            "70,4 – 84,4 kg",
            "≥ 84,7 kg"
          ],
          "params": {
            "height_cm": "168",
            "weight_kg": "61"
          }
        },
        {
          "label": "175 cm",
          "values": [
            "Unter 56,7 kg",
            "56,7 – 76,3 kg",
            "76,4 – 91,6 kg",
            "≥ 91,9 kg"
          ],
          "params": {
            "height_cm": "175",
            "weight_kg": "66"
          }
        },
        {
          "label": "183 cm",
          "values": [
            "Unter 62,0 kg",
            "62,0 – 83,4 kg",
            "83,5 – 100,1 kg",
            "≥ 100,5 kg"
          ],
          "params": {
            "height_cm": "183",
            "weight_kg": "73"
          }
        },
        {
          "label": "190 cm",
          "values": [
            "Unter 66,8 kg",
            "66,8 – 89,9 kg",
            "90,0 – 107,9 kg",
            "≥ 108,3 kg"
          ],
          "params": {
            "height_cm": "190",
            "weight_kg": "78"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "body-fat-calculator"
    ],
    "title": "Body Fat Percentage Classification Matrix (ACE Clinical Standards)",
    "description": "American Council on Exercise (ACE) reference body fat ranges comparing men and women across clinical fitness categories.",
    "headers": [
      "Category",
      "Men (% Body Fat)",
      "Women (% Body Fat)",
      "Clinical Profile"
    ],
    "translations": {
      "es": {
        "title": "Tabla de Clasificación de Porcentaje de Grasa Corporal (Estándar ACE)",
        "description": "Rangos clínicos de grasa corporal para hombres y mujeres desde nivel esencial y atlético hasta obesidad.",
        "headers": [
          "Categoría",
          "Hombres (% Grasa)",
          "Mujeres (% Grasa)",
          "Perfil Clínico"
        ]
      },
      "fr": {
        "title": "Classification du Taux de Masse Grasse (Normes ACE)",
        "description": "Repères de masse grasse corporelle chez l’homme et la femme selon le niveau de condition physique.",
        "headers": [
          "Catégorie",
          "Hommes (% Graisse)",
          "Femmes (% Graisse)",
          "Profil Clinique"
        ]
      },
      "de": {
        "title": "Körperfettanteil-Referenztabelle für Männer & Frauen (ACE-Norm)",
        "description": "Klinische Einstufung des Körperfettanteils (KFA) von Leistungssport bis erhöhtem Gesundheitsrisiko.",
        "headers": [
          "Kategorie",
          "Männer (KFA)",
          "Frauen (KFA)",
          "Gesundheitsprofil"
        ]
      }
    },
    "rows": [
      {
        "label": "Essential Fat",
        "values": [
          "2–5%",
          "10–13%",
          "Minimum physiological baseline"
        ],
        "params": {
          "gender": "male",
          "waist_cm": "74",
          "neck_cm": "38",
          "height_cm": "178"
        }
      },
      {
        "label": "Athletes",
        "values": [
          "6–13%",
          "14–20%",
          "Competitive endurance & physique"
        ],
        "params": {
          "gender": "male",
          "waist_cm": "78",
          "neck_cm": "39",
          "height_cm": "178"
        }
      },
      {
        "label": "Fitness",
        "values": [
          "14–17%",
          "21–24%",
          "Lean, sustainable athletic range"
        ],
        "params": {
          "gender": "male",
          "waist_cm": "82",
          "neck_cm": "39",
          "height_cm": "178"
        }
      },
      {
        "label": "Acceptable / Average",
        "values": [
          "18–24%",
          "25–31%",
          "Healthy general adult norm"
        ],
        "params": {
          "gender": "male",
          "waist_cm": "88",
          "neck_cm": "39",
          "height_cm": "178"
        }
      },
      {
        "label": "High / Obese",
        "values": [
          "≥25%",
          "≥32%",
          "Elevated cardiometabolic risk"
        ],
        "params": {
          "gender": "male",
          "waist_cm": "102",
          "neck_cm": "40",
          "height_cm": "178"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "Grasa Esencial",
          "values": [
            "2–5 %",
            "10–13 %",
            "Mínimo fisiológico vital"
          ],
          "params": {
            "gender": "male",
            "waist_cm": "74",
            "neck_cm": "38",
            "height_cm": "178"
          }
        },
        {
          "label": "Atletas",
          "values": [
            "6–13 %",
            "14–20 %",
            "Rendimiento deportivo competitivo"
          ],
          "params": {
            "gender": "male",
            "waist_cm": "78",
            "neck_cm": "39",
            "height_cm": "178"
          }
        },
        {
          "label": "Fitness",
          "values": [
            "14–17 %",
            "21–24 %",
            "Rango atlético y sostenible"
          ],
          "params": {
            "gender": "male",
            "waist_cm": "82",
            "neck_cm": "39",
            "height_cm": "178"
          }
        },
        {
          "label": "Aceptable / Media",
          "values": [
            "18–24 %",
            "25–31 %",
            "Rango saludable en población general"
          ],
          "params": {
            "gender": "male",
            "waist_cm": "88",
            "neck_cm": "39",
            "height_cm": "178"
          }
        },
        {
          "label": "Alto / Obesidad",
          "values": [
            "≥25 %",
            "≥32 %",
            "Mayor riesgo cardiometabólico"
          ],
          "params": {
            "gender": "male",
            "waist_cm": "102",
            "neck_cm": "40",
            "height_cm": "178"
          }
        }
      ],
      "fr": [
        {
          "label": "Graisse Essentielle",
          "values": [
            "2–5 %",
            "10–13 %",
            "Seuil physiologique minimal"
          ],
          "params": {
            "gender": "male",
            "waist_cm": "74",
            "neck_cm": "38",
            "height_cm": "178"
          }
        },
        {
          "label": "Athlètes",
          "values": [
            "6–13 %",
            "14–20 %",
            "Sportifs de compétition"
          ],
          "params": {
            "gender": "male",
            "waist_cm": "78",
            "neck_cm": "39",
            "height_cm": "178"
          }
        },
        {
          "label": "En Forme (Fitness)",
          "values": [
            "14–17 %",
            "21–24 %",
            "Profil tonique et durable"
          ],
          "params": {
            "gender": "male",
            "waist_cm": "82",
            "neck_cm": "39",
            "height_cm": "178"
          }
        },
        {
          "label": "Acceptable / Moyen",
          "values": [
            "18–24 %",
            "25–31 %",
            "Norme santé population générale"
          ],
          "params": {
            "gender": "male",
            "waist_cm": "88",
            "neck_cm": "39",
            "height_cm": "178"
          }
        },
        {
          "label": "Élevé / Obésité",
          "values": [
            "≥25 %",
            "≥32 %",
            "Risque cardiométabolique accru"
          ],
          "params": {
            "gender": "male",
            "waist_cm": "102",
            "neck_cm": "40",
            "height_cm": "178"
          }
        }
      ],
      "de": [
        {
          "label": "Essentielles Fett",
          "values": [
            "2–5 %",
            "10–13 %",
            "Physiologisches Minimum"
          ],
          "params": {
            "gender": "male",
            "waist_cm": "74",
            "neck_cm": "38",
            "height_cm": "178"
          }
        },
        {
          "label": "Leistungssportler",
          "values": [
            "6–13 %",
            "14–20 %",
            "Wettkampfsport & hohe Definition"
          ],
          "params": {
            "gender": "male",
            "waist_cm": "78",
            "neck_cm": "39",
            "height_cm": "178"
          }
        },
        {
          "label": "Fitness",
          "values": [
            "14–17 %",
            "21–24 %",
            "Athletisch und langfristig haltbar"
          ],
          "params": {
            "gender": "male",
            "waist_cm": "82",
            "neck_cm": "39",
            "height_cm": "178"
          }
        },
        {
          "label": "Durchschnittlich",
          "values": [
            "18–24 %",
            "25–31 %",
            "Gesunder Bevölkerungsdurchschnitt"
          ],
          "params": {
            "gender": "male",
            "waist_cm": "88",
            "neck_cm": "39",
            "height_cm": "178"
          }
        },
        {
          "label": "Erhöht / Adipositas",
          "values": [
            "≥25 %",
            "≥32 %",
            "Erhöhtes Stoffwechselrisiko"
          ],
          "params": {
            "gender": "male",
            "waist_cm": "102",
            "neck_cm": "40",
            "height_cm": "178"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "calorie-calculator"
    ],
    "title": "Daily Maintenance Calories (TDEE) & Fat-Loss Targets by Activity Level",
    "description": "Mifflin-St Jeor TDEE benchmarks for a reference 30-year-old male (75 kg / 175 cm) and female (62 kg / 165 cm), plus a 500 kcal/day weight-loss deficit (~0.45 kg/wk).",
    "headers": [
      "Activity Level",
      "PAL Factor",
      "Male Maintenance",
      "Male Cut (-500 kcal)",
      "Female Maintenance"
    ],
    "translations": {
      "es": {
        "title": "Calorías Diarias de Mantenimiento (TDEE) y Déficit por Actividad",
        "description": "Gasto energético diario (Mifflin-St Jeor) para hombre de referencia (75 kg, 175 cm, 30 años) y mujer (62 kg, 165 cm, 30 años).",
        "headers": [
          "Nivel de Actividad",
          "Factor PAL",
          "Hombre Mant.",
          "Hombre Déficit (-500)",
          "Mujer Mant."
        ]
      },
      "fr": {
        "title": "Besoins Caloriques Journaliers (TDEE) et Déficit selon l’Activité",
        "description": "Dépense calorique (Mifflin-St Jeor) pour un homme de référence (75 kg, 175 cm, 30 ans) et une femme (62 kg, 165 cm, 30 ans).",
        "headers": [
          "Niveau d’Activité",
          "Coefficient",
          "Homme Maintien",
          "Homme Sèche (-500)",
          "Femme Maintien"
        ]
      },
      "de": {
        "title": "Täglicher Kalorienbedarf (TDEE) & Abnehm-Defizit nach Aktivität",
        "description": "Gesamtumsatz nach Mifflin-St Jeor für Referenzmann (75 kg, 175 cm, 30 J.) und Referenzfrau (62 kg, 165 cm, 30 J.).",
        "headers": [
          "Aktivitätslevel",
          "PAL-Faktor",
          "Mann Erhalt",
          "Mann Defizit (-500)",
          "Frau Erhalt"
        ]
      }
    },
    "rows": [
      {
        "label": "Sedentary (Desk Job)",
        "values": [
          "×1.20",
          "2,039 kcal",
          "1,539 kcal",
          "1,608 kcal"
        ],
        "params": {
          "age": "30",
          "weight_kg": "75",
          "height_cm": "175",
          "activity": "1.2"
        }
      },
      {
        "label": "Lightly Active (1–3 d/wk)",
        "values": [
          "×1.38",
          "2,336 kcal",
          "1,836 kcal",
          "1,843 kcal"
        ],
        "params": {
          "age": "30",
          "weight_kg": "75",
          "height_cm": "175",
          "activity": "1.375"
        }
      },
      {
        "label": "Moderately Active (3–5 d/wk)",
        "values": [
          "×1.55",
          "2,633 kcal",
          "2,133 kcal",
          "2,077 kcal"
        ],
        "params": {
          "age": "30",
          "weight_kg": "75",
          "height_cm": "175",
          "activity": "1.55"
        }
      },
      {
        "label": "Very Active (6–7 d/wk)",
        "values": [
          "×1.73",
          "2,930 kcal",
          "2,430 kcal",
          "2,312 kcal"
        ],
        "params": {
          "age": "30",
          "weight_kg": "75",
          "height_cm": "175",
          "activity": "1.725"
        }
      },
      {
        "label": "Athlete (2× Daily)",
        "values": [
          "×1.90",
          "3,228 kcal",
          "2,728 kcal",
          "2,546 kcal"
        ],
        "params": {
          "age": "30",
          "weight_kg": "75",
          "height_cm": "175",
          "activity": "1.9"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "Sedentario (Oficina)",
          "values": [
            "×1,20",
            "2.039 kcal",
            "1.539 kcal",
            "1.608 kcal"
          ],
          "params": {
            "age": "30",
            "weight_kg": "75",
            "height_cm": "175",
            "activity": "1.2"
          }
        },
        {
          "label": "Ligera (1–3 d/sem)",
          "values": [
            "×1,38",
            "2.336 kcal",
            "1.836 kcal",
            "1.843 kcal"
          ],
          "params": {
            "age": "30",
            "weight_kg": "75",
            "height_cm": "175",
            "activity": "1.375"
          }
        },
        {
          "label": "Moderada (3–5 d/sem)",
          "values": [
            "×1,55",
            "2.633 kcal",
            "2.133 kcal",
            "2.077 kcal"
          ],
          "params": {
            "age": "30",
            "weight_kg": "75",
            "height_cm": "175",
            "activity": "1.55"
          }
        },
        {
          "label": "Muy Activa (6–7 d/sem)",
          "values": [
            "×1,73",
            "2.930 kcal",
            "2.430 kcal",
            "2.312 kcal"
          ],
          "params": {
            "age": "30",
            "weight_kg": "75",
            "height_cm": "175",
            "activity": "1.725"
          }
        },
        {
          "label": "Atleta (Doble Sesión)",
          "values": [
            "×1,90",
            "3.228 kcal",
            "2.728 kcal",
            "2.546 kcal"
          ],
          "params": {
            "age": "30",
            "weight_kg": "75",
            "height_cm": "175",
            "activity": "1.9"
          }
        }
      ],
      "fr": [
        {
          "label": "Sédentaire (Bureau)",
          "values": [
            "×1,20",
            "2 039 kcal",
            "1 539 kcal",
            "1 608 kcal"
          ],
          "params": {
            "age": "30",
            "weight_kg": "75",
            "height_cm": "175",
            "activity": "1.2"
          }
        },
        {
          "label": "Légère (1–3 j/sem)",
          "values": [
            "×1,38",
            "2 336 kcal",
            "1 836 kcal",
            "1 843 kcal"
          ],
          "params": {
            "age": "30",
            "weight_kg": "75",
            "height_cm": "175",
            "activity": "1.375"
          }
        },
        {
          "label": "Modérée (3–5 j/sem)",
          "values": [
            "×1,55",
            "2 633 kcal",
            "2 133 kcal",
            "2 077 kcal"
          ],
          "params": {
            "age": "30",
            "weight_kg": "75",
            "height_cm": "175",
            "activity": "1.55"
          }
        },
        {
          "label": "Intense (6–7 j/sem)",
          "values": [
            "×1,73",
            "2 930 kcal",
            "2 430 kcal",
            "2 312 kcal"
          ],
          "params": {
            "age": "30",
            "weight_kg": "75",
            "height_cm": "175",
            "activity": "1.725"
          }
        },
        {
          "label": "Athlète (2× / Jour)",
          "values": [
            "×1,90",
            "3 228 kcal",
            "2 728 kcal",
            "2 546 kcal"
          ],
          "params": {
            "age": "30",
            "weight_kg": "75",
            "height_cm": "175",
            "activity": "1.9"
          }
        }
      ],
      "de": [
        {
          "label": "Sitzend (Bürojob)",
          "values": [
            "×1,20",
            "2.039 kcal",
            "1.539 kcal",
            "1.608 kcal"
          ],
          "params": {
            "age": "30",
            "weight_kg": "75",
            "height_cm": "175",
            "activity": "1.2"
          }
        },
        {
          "label": "Leicht aktiv (1–3×/Wo.)",
          "values": [
            "×1,38",
            "2.336 kcal",
            "1.836 kcal",
            "1.843 kcal"
          ],
          "params": {
            "age": "30",
            "weight_kg": "75",
            "height_cm": "175",
            "activity": "1.375"
          }
        },
        {
          "label": "Moderat aktiv (3–5×/Wo.)",
          "values": [
            "×1,55",
            "2.633 kcal",
            "2.133 kcal",
            "2.077 kcal"
          ],
          "params": {
            "age": "30",
            "weight_kg": "75",
            "height_cm": "175",
            "activity": "1.55"
          }
        },
        {
          "label": "Sehr aktiv (6–7×/Wo.)",
          "values": [
            "×1,73",
            "2.930 kcal",
            "2.430 kcal",
            "2.312 kcal"
          ],
          "params": {
            "age": "30",
            "weight_kg": "75",
            "height_cm": "175",
            "activity": "1.725"
          }
        },
        {
          "label": "Leistungssport (2× tägl.)",
          "values": [
            "×1,90",
            "3.228 kcal",
            "2.728 kcal",
            "2.546 kcal"
          ],
          "params": {
            "age": "30",
            "weight_kg": "75",
            "height_cm": "175",
            "activity": "1.9"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "bmr-calculator"
    ],
    "title": "Basal Metabolic Rate (BMR) Reference Table by Body Weight & Age",
    "description": "Resting daily energy burn (Mifflin-St Jeor) for men (175 cm / 5'9\") and women (165 cm / 5'5\") at ages 25 and 45.",
    "headers": [
      "Body Weight",
      "Male Age 25",
      "Male Age 45",
      "Female Age 25",
      "Female Age 45"
    ],
    "translations": {
      "es": {
        "title": "Tabla de Tasa Metabólica Basal (TMB) por Peso y Edad",
        "description": "Gasto calórico diario en reposo (Mifflin-St Jeor) para hombres (175 cm) y mujeres (165 cm) a los 25 y 45 años.",
        "headers": [
          "Peso Corporal",
          "Hombre 25 Años",
          "Hombre 45 Años",
          "Mujer 25 Años",
          "Mujer 45 Años"
        ]
      },
      "fr": {
        "title": "Tableau du Métabolisme de Base (MB) selon le Poids et l’Âge",
        "description": "Dépense énergétique au repos (Mifflin-St Jeor) pour hommes (175 cm) et femmes (165 cm) à 25 et 45 ans.",
        "headers": [
          "Poids Corporel",
          "Homme 25 Ans",
          "Homme 45 Ans",
          "Femme 25 Ans",
          "Femme 45 Ans"
        ]
      },
      "de": {
        "title": "Grundumsatz-Tabelle (BMR) nach Körpergewicht & Alter",
        "description": "Ruheenergieverbrauch pro Tag (Mifflin-St Jeor) für Männer (175 cm) und Frauen (165 cm) im Alter von 25 und 45 Jahren.",
        "headers": [
          "Körpergewicht",
          "Mann (25 J.)",
          "Mann (45 J.)",
          "Frau (25 J.)",
          "Frau (45 J.)"
        ]
      }
    },
    "rows": [
      {
        "label": "121 lbs (55 kg)",
        "values": [
          "1524 kcal",
          "1424 kcal",
          "1295 kcal",
          "1195 kcal"
        ],
        "params": {
          "weight_kg": "55",
          "height_cm": "175",
          "age": "30",
          "gender": "male"
        }
      },
      {
        "label": "143 lbs (65 kg)",
        "values": [
          "1624 kcal",
          "1524 kcal",
          "1395 kcal",
          "1295 kcal"
        ],
        "params": {
          "weight_kg": "65",
          "height_cm": "175",
          "age": "30",
          "gender": "male"
        }
      },
      {
        "label": "165 lbs (75 kg)",
        "values": [
          "1724 kcal",
          "1624 kcal",
          "1495 kcal",
          "1395 kcal"
        ],
        "params": {
          "weight_kg": "75",
          "height_cm": "175",
          "age": "30",
          "gender": "male"
        }
      },
      {
        "label": "187 lbs (85 kg)",
        "values": [
          "1824 kcal",
          "1724 kcal",
          "1595 kcal",
          "1495 kcal"
        ],
        "params": {
          "weight_kg": "85",
          "height_cm": "175",
          "age": "30",
          "gender": "male"
        }
      },
      {
        "label": "209 lbs (95 kg)",
        "values": [
          "1924 kcal",
          "1824 kcal",
          "1695 kcal",
          "1595 kcal"
        ],
        "params": {
          "weight_kg": "95",
          "height_cm": "175",
          "age": "30",
          "gender": "male"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "55 kg",
          "values": [
            "1524 kcal",
            "1424 kcal",
            "1295 kcal",
            "1195 kcal"
          ],
          "params": {
            "weight_kg": "55",
            "height_cm": "175",
            "age": "30",
            "gender": "male"
          }
        },
        {
          "label": "65 kg",
          "values": [
            "1624 kcal",
            "1524 kcal",
            "1395 kcal",
            "1295 kcal"
          ],
          "params": {
            "weight_kg": "65",
            "height_cm": "175",
            "age": "30",
            "gender": "male"
          }
        },
        {
          "label": "75 kg",
          "values": [
            "1724 kcal",
            "1624 kcal",
            "1495 kcal",
            "1395 kcal"
          ],
          "params": {
            "weight_kg": "75",
            "height_cm": "175",
            "age": "30",
            "gender": "male"
          }
        },
        {
          "label": "85 kg",
          "values": [
            "1824 kcal",
            "1724 kcal",
            "1595 kcal",
            "1495 kcal"
          ],
          "params": {
            "weight_kg": "85",
            "height_cm": "175",
            "age": "30",
            "gender": "male"
          }
        },
        {
          "label": "95 kg",
          "values": [
            "1924 kcal",
            "1824 kcal",
            "1695 kcal",
            "1595 kcal"
          ],
          "params": {
            "weight_kg": "95",
            "height_cm": "175",
            "age": "30",
            "gender": "male"
          }
        }
      ],
      "fr": [
        {
          "label": "55 kg",
          "values": [
            "1524 kcal",
            "1424 kcal",
            "1295 kcal",
            "1195 kcal"
          ],
          "params": {
            "weight_kg": "55",
            "height_cm": "175",
            "age": "30",
            "gender": "male"
          }
        },
        {
          "label": "65 kg",
          "values": [
            "1624 kcal",
            "1524 kcal",
            "1395 kcal",
            "1295 kcal"
          ],
          "params": {
            "weight_kg": "65",
            "height_cm": "175",
            "age": "30",
            "gender": "male"
          }
        },
        {
          "label": "75 kg",
          "values": [
            "1724 kcal",
            "1624 kcal",
            "1495 kcal",
            "1395 kcal"
          ],
          "params": {
            "weight_kg": "75",
            "height_cm": "175",
            "age": "30",
            "gender": "male"
          }
        },
        {
          "label": "85 kg",
          "values": [
            "1824 kcal",
            "1724 kcal",
            "1595 kcal",
            "1495 kcal"
          ],
          "params": {
            "weight_kg": "85",
            "height_cm": "175",
            "age": "30",
            "gender": "male"
          }
        },
        {
          "label": "95 kg",
          "values": [
            "1924 kcal",
            "1824 kcal",
            "1695 kcal",
            "1595 kcal"
          ],
          "params": {
            "weight_kg": "95",
            "height_cm": "175",
            "age": "30",
            "gender": "male"
          }
        }
      ],
      "de": [
        {
          "label": "55 kg",
          "values": [
            "1524 kcal",
            "1424 kcal",
            "1295 kcal",
            "1195 kcal"
          ],
          "params": {
            "weight_kg": "55",
            "height_cm": "175",
            "age": "30",
            "gender": "male"
          }
        },
        {
          "label": "65 kg",
          "values": [
            "1624 kcal",
            "1524 kcal",
            "1395 kcal",
            "1295 kcal"
          ],
          "params": {
            "weight_kg": "65",
            "height_cm": "175",
            "age": "30",
            "gender": "male"
          }
        },
        {
          "label": "75 kg",
          "values": [
            "1724 kcal",
            "1624 kcal",
            "1495 kcal",
            "1395 kcal"
          ],
          "params": {
            "weight_kg": "75",
            "height_cm": "175",
            "age": "30",
            "gender": "male"
          }
        },
        {
          "label": "85 kg",
          "values": [
            "1824 kcal",
            "1724 kcal",
            "1595 kcal",
            "1495 kcal"
          ],
          "params": {
            "weight_kg": "85",
            "height_cm": "175",
            "age": "30",
            "gender": "male"
          }
        },
        {
          "label": "95 kg",
          "values": [
            "1924 kcal",
            "1824 kcal",
            "1695 kcal",
            "1595 kcal"
          ],
          "params": {
            "weight_kg": "95",
            "height_cm": "175",
            "age": "30",
            "gender": "male"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "ideal-weight-calculator",
      "healthy-weight-calculator",
      "height-calculator"
    ],
    "title": "Ideal Body Weight (Devine Formula) & WHO Healthy Range by Height",
    "description": "Clinical ideal weight reference for adult men and women paired with the full WHO healthy BMI (18.5–24.9) range.",
    "headers": [
      "Height",
      "Ideal Weight (Men)",
      "Ideal Weight (Women)",
      "WHO Healthy Weight Range"
    ],
    "translations": {
      "es": {
        "title": "Peso Ideal (Fórmula de Devine) y Rango Saludable OMS por Estatura",
        "description": "Peso clínico ideal para hombres y mujeres junto con la horquilla saludable de la OMS (IMC 18,5–24,9).",
        "headers": [
          "Estatura",
          "Peso Ideal (Hombres)",
          "Peso Ideal (Mujeres)",
          "Rango Saludable OMS"
        ]
      },
      "fr": {
        "title": "Poids Idéal (Formule de Devine) et Plage Santé OMS par Taille",
        "description": "Poids de référence clinique pour hommes et femmes accompagné de l’intervalle IMC normal (18,5–24,9).",
        "headers": [
          "Taille",
          "Poids Idéal (Hommes)",
          "Poids Idéal (Femmes)",
          "Plage Santé OMS"
        ]
      },
      "de": {
        "title": "Idealgewicht (Devine-Formel) & WHO-Normalgewicht nach Größe",
        "description": "Klinisches Idealgewicht für Männer und Frauen im Vergleich zur WHO-Normalgewichtsspanne (BMI 18,5–24,9).",
        "headers": [
          "Körpergröße",
          "Idealgewicht (Männer)",
          "Idealgewicht (Frauen)",
          "WHO-Normalbereich"
        ]
      }
    },
    "rows": [
      {
        "label": "5'1\" (155 cm)",
        "values": [
          "115 lbs",
          "106 lbs",
          "98 – 132 lbs"
        ],
        "params": {
          "height_cm": "155"
        }
      },
      {
        "label": "5'5\" (165 cm)",
        "values": [
          "135 lbs",
          "125 lbs",
          "111 – 149 lbs"
        ],
        "params": {
          "height_cm": "165"
        }
      },
      {
        "label": "5'9\" (175 cm)",
        "values": [
          "155 lbs",
          "145 lbs",
          "125 – 168 lbs"
        ],
        "params": {
          "height_cm": "175"
        }
      },
      {
        "label": "6'1\" (185 cm)",
        "values": [
          "175 lbs",
          "165 lbs",
          "140 – 188 lbs"
        ],
        "params": {
          "height_cm": "185"
        }
      },
      {
        "label": "6'4\" (193 cm)",
        "values": [
          "191 lbs",
          "181 lbs",
          "152 – 204 lbs"
        ],
        "params": {
          "height_cm": "193"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "155 cm",
          "values": [
            "52,4 kg",
            "47,9 kg",
            "44,4 – 59,8 kg"
          ],
          "params": {
            "height_cm": "155"
          }
        },
        {
          "label": "165 cm",
          "values": [
            "61,4 kg",
            "56,9 kg",
            "50,4 – 67,8 kg"
          ],
          "params": {
            "height_cm": "165"
          }
        },
        {
          "label": "175 cm",
          "values": [
            "70,5 kg",
            "66,0 kg",
            "56,7 – 76,3 kg"
          ],
          "params": {
            "height_cm": "175"
          }
        },
        {
          "label": "185 cm",
          "values": [
            "79,5 kg",
            "75,0 kg",
            "63,3 – 85,2 kg"
          ],
          "params": {
            "height_cm": "185"
          }
        },
        {
          "label": "193 cm",
          "values": [
            "86,8 kg",
            "82,3 kg",
            "68,9 – 92,8 kg"
          ],
          "params": {
            "height_cm": "193"
          }
        }
      ],
      "fr": [
        {
          "label": "155 cm",
          "values": [
            "52,4 kg",
            "47,9 kg",
            "44,4 – 59,8 kg"
          ],
          "params": {
            "height_cm": "155"
          }
        },
        {
          "label": "165 cm",
          "values": [
            "61,4 kg",
            "56,9 kg",
            "50,4 – 67,8 kg"
          ],
          "params": {
            "height_cm": "165"
          }
        },
        {
          "label": "175 cm",
          "values": [
            "70,5 kg",
            "66,0 kg",
            "56,7 – 76,3 kg"
          ],
          "params": {
            "height_cm": "175"
          }
        },
        {
          "label": "185 cm",
          "values": [
            "79,5 kg",
            "75,0 kg",
            "63,3 – 85,2 kg"
          ],
          "params": {
            "height_cm": "185"
          }
        },
        {
          "label": "193 cm",
          "values": [
            "86,8 kg",
            "82,3 kg",
            "68,9 – 92,8 kg"
          ],
          "params": {
            "height_cm": "193"
          }
        }
      ],
      "de": [
        {
          "label": "155 cm",
          "values": [
            "52,4 kg",
            "47,9 kg",
            "44,4 – 59,8 kg"
          ],
          "params": {
            "height_cm": "155"
          }
        },
        {
          "label": "165 cm",
          "values": [
            "61,4 kg",
            "56,9 kg",
            "50,4 – 67,8 kg"
          ],
          "params": {
            "height_cm": "165"
          }
        },
        {
          "label": "175 cm",
          "values": [
            "70,5 kg",
            "66,0 kg",
            "56,7 – 76,3 kg"
          ],
          "params": {
            "height_cm": "175"
          }
        },
        {
          "label": "185 cm",
          "values": [
            "79,5 kg",
            "75,0 kg",
            "63,3 – 85,2 kg"
          ],
          "params": {
            "height_cm": "185"
          }
        },
        {
          "label": "193 cm",
          "values": [
            "86,8 kg",
            "82,3 kg",
            "68,9 – 92,8 kg"
          ],
          "params": {
            "height_cm": "193"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "macro-calculator"
    ],
    "title": "Daily Macronutrient Split Reference (Protein / Carbs / Fat in Grams)",
    "description": "Evidence-based daily gram targets for fat loss, balanced maintenance, hypertrophy, endurance athletics, and ketogenic diets (4/4/9 kcal/g).",
    "headers": [
      "Nutrition Goal & Calories",
      "Protein (4 kcal/g)",
      "Carbs (4 kcal/g)",
      "Fats (9 kcal/g)"
    ],
    "translations": {
      "es": {
        "title": "Tabla de Distribución Diaria de Macronutrientes (Gramos)",
        "description": "Gramos diarios exactos de proteína, carbohidratos y grasas según objetivo nutricional (4/4/9 kcal/g).",
        "headers": [
          "Objetivo y Calorías",
          "Proteína (4 kcal/g)",
          "Carbohidratos (4 kcal/g)",
          "Grasas (9 kcal/g)"
        ]
      },
      "fr": {
        "title": "Répartition Journalière des Macronutriments en Grammes",
        "description": "Apports quotidiens en protéines, glucides et lipides selon votre objectif sportif (4/4/9 kcal/g).",
        "headers": [
          "Objectif & Calories",
          "Protéines (4 kcal/g)",
          "Glucides (4 kcal/g)",
          "Lipides (9 kcal/g)"
        ]
      },
      "de": {
        "title": "Tägliche Makronährstoff-Verteilungstabelle (Gramm-Ziele)",
        "description": "Tagesmengen für Eiweiß, Kohlenhydrate und Fette je nach Trainings- und Ernährungsziel (4/4/9 kcal/g).",
        "headers": [
          "Ziel & Tageskalorien",
          "Protein (4 kcal/g)",
          "Kohlenhydrate (4 kcal/g)",
          "Fett (9 kcal/g)"
        ]
      }
    },
    "rows": [
      {
        "label": "Fat Loss / Cut (1,800 kcal)",
        "values": [
          "158 g (35%)",
          "158 g (35%)",
          "60 g (30%)"
        ],
        "params": {
          "calories": "1800",
          "protein_pct": "35",
          "carb_pct": "35",
          "fat_pct": "30"
        }
      },
      {
        "label": "Balanced Maintenance (2,200 kcal)",
        "values": [
          "165 g (30%)",
          "220 g (40%)",
          "73 g (30%)"
        ],
        "params": {
          "calories": "2200",
          "protein_pct": "30",
          "carb_pct": "40",
          "fat_pct": "30"
        }
      },
      {
        "label": "Lean Bulk / Muscle (2,700 kcal)",
        "values": [
          "203 g (30%)",
          "304 g (45%)",
          "75 g (25%)"
        ],
        "params": {
          "calories": "2700",
          "protein_pct": "30",
          "carb_pct": "45",
          "fat_pct": "25"
        }
      },
      {
        "label": "High-Carb Endurance (3,000 kcal)",
        "values": [
          "150 g (20%)",
          "413 g (55%)",
          "83 g (25%)"
        ],
        "params": {
          "calories": "3000",
          "protein_pct": "20",
          "carb_pct": "55",
          "fat_pct": "25"
        }
      },
      {
        "label": "Low-Carb / Keto (2,000 kcal)",
        "values": [
          "125 g (25%)",
          "50 g (10%)",
          "144 g (65%)"
        ],
        "params": {
          "calories": "2000",
          "protein_pct": "25",
          "carb_pct": "10",
          "fat_pct": "65"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "Definición / Déficit (1.800 kcal)",
          "values": [
            "158 g (35%)",
            "158 g (35%)",
            "60 g (30%)"
          ],
          "params": {
            "calories": "1800",
            "protein_pct": "35",
            "carb_pct": "35",
            "fat_pct": "30"
          }
        },
        {
          "label": "Mantenimiento (2.200 kcal)",
          "values": [
            "165 g (30%)",
            "220 g (40%)",
            "73 g (30%)"
          ],
          "params": {
            "calories": "2200",
            "protein_pct": "30",
            "carb_pct": "40",
            "fat_pct": "30"
          }
        },
        {
          "label": "Volumen Limpio (2.700 kcal)",
          "values": [
            "203 g (30%)",
            "304 g (45%)",
            "75 g (25%)"
          ],
          "params": {
            "calories": "2700",
            "protein_pct": "30",
            "carb_pct": "45",
            "fat_pct": "25"
          }
        },
        {
          "label": "Resistencia (3.000 kcal)",
          "values": [
            "150 g (20%)",
            "413 g (55%)",
            "83 g (25%)"
          ],
          "params": {
            "calories": "3000",
            "protein_pct": "20",
            "carb_pct": "55",
            "fat_pct": "25"
          }
        },
        {
          "label": "Baja en Carbos / Keto (2.000 kcal)",
          "values": [
            "125 g (25%)",
            "50 g (10%)",
            "144 g (65%)"
          ],
          "params": {
            "calories": "2000",
            "protein_pct": "25",
            "carb_pct": "10",
            "fat_pct": "65"
          }
        }
      ],
      "fr": [
        {
          "label": "Sèche / Perte (1 800 kcal)",
          "values": [
            "158 g (35%)",
            "158 g (35%)",
            "60 g (30%)"
          ],
          "params": {
            "calories": "1800",
            "protein_pct": "35",
            "carb_pct": "35",
            "fat_pct": "30"
          }
        },
        {
          "label": "Maintien Équilibré (2 200 kcal)",
          "values": [
            "165 g (30%)",
            "220 g (40%)",
            "73 g (30%)"
          ],
          "params": {
            "calories": "2200",
            "protein_pct": "30",
            "carb_pct": "40",
            "fat_pct": "30"
          }
        },
        {
          "label": "Prise de Masse (2 700 kcal)",
          "values": [
            "203 g (30%)",
            "304 g (45%)",
            "75 g (25%)"
          ],
          "params": {
            "calories": "2700",
            "protein_pct": "30",
            "carb_pct": "45",
            "fat_pct": "25"
          }
        },
        {
          "label": "Endurance (3 000 kcal)",
          "values": [
            "150 g (20%)",
            "413 g (55%)",
            "83 g (25%)"
          ],
          "params": {
            "calories": "3000",
            "protein_pct": "20",
            "carb_pct": "55",
            "fat_pct": "25"
          }
        },
        {
          "label": "Cétogène / Low-Carb (2 000 kcal)",
          "values": [
            "125 g (25%)",
            "50 g (10%)",
            "144 g (65%)"
          ],
          "params": {
            "calories": "2000",
            "protein_pct": "25",
            "carb_pct": "10",
            "fat_pct": "65"
          }
        }
      ],
      "de": [
        {
          "label": "Abnehmen / Defizit (1.800 kcal)",
          "values": [
            "158 g (35%)",
            "158 g (35%)",
            "60 g (30%)"
          ],
          "params": {
            "calories": "1800",
            "protein_pct": "35",
            "carb_pct": "35",
            "fat_pct": "30"
          }
        },
        {
          "label": "Gewicht halten (2.200 kcal)",
          "values": [
            "165 g (30%)",
            "220 g (40%)",
            "73 g (30%)"
          ],
          "params": {
            "calories": "2200",
            "protein_pct": "30",
            "carb_pct": "40",
            "fat_pct": "30"
          }
        },
        {
          "label": "Muskelaufbau (2.700 kcal)",
          "values": [
            "203 g (30%)",
            "304 g (45%)",
            "75 g (25%)"
          ],
          "params": {
            "calories": "2700",
            "protein_pct": "30",
            "carb_pct": "45",
            "fat_pct": "25"
          }
        },
        {
          "label": "Ausdauersport (3.000 kcal)",
          "values": [
            "150 g (20%)",
            "413 g (55%)",
            "83 g (25%)"
          ],
          "params": {
            "calories": "3000",
            "protein_pct": "20",
            "carb_pct": "55",
            "fat_pct": "25"
          }
        },
        {
          "label": "Low-Carb / Keto (2.000 kcal)",
          "values": [
            "125 g (25%)",
            "50 g (10%)",
            "144 g (65%)"
          ],
          "params": {
            "calories": "2000",
            "protein_pct": "25",
            "carb_pct": "10",
            "fat_pct": "65"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "carbohydrate-calculator"
    ],
    "title": "Daily Carbohydrate Intake Matrix (Grams by Calorie Level & Diet)",
    "description": "Daily carbohydrate grams across Low-Carb (25%), Balanced AMDR Lower Bound (45%), Active (55%), and Endurance Athlete (65%) diets.",
    "headers": [
      "Daily Calorie Budget",
      "Low-Carb (25%)",
      "Balanced (45%)",
      "Active (55%)",
      "Endurance (65%)"
    ],
    "translations": {
      "es": {
        "title": "Tabla de Ingesta Diaria de Carbohidratos por Calorías",
        "description": "Gramos diarios de hidratos de carbono desde dietas bajas en carbohidratos (25 %) hasta deportes de resistencia (65 %).",
        "headers": [
          "Calorías Diarias",
          "Bajo (25 %)",
          "Equilibrado (45 %)",
          "Activo (55 %)",
          "Resistencia (65 %)"
        ]
      },
      "fr": {
        "title": "Apport Journalier en Glucides selon le Total Calorique",
        "description": "Besoins quotidiens en grammes de glucides selon le profil alimentaire (de 25 % à 65 % des apports).",
        "headers": [
          "Apport Calorique",
          "Modéré (25 %)",
          "Équilibré (45 %)",
          "Actif (55 %)",
          "Endurance (65 %)"
        ]
      },
      "de": {
        "title": "Täglicher Kohlenhydratbedarf nach Kalorienzufuhr (in Gramm)",
        "description": "Richtwerte in Gramm pro Tag von Low-Carb (25 %) über ausgewogene Ernährung (45–55 %) bis Ausdauersport (65 %).",
        "headers": [
          "Kalorienbedarf",
          "Low-Carb (25 %)",
          "Ausgewogen (45 %)",
          "Aktiv (55 %)",
          "Ausdauer (65 %)"
        ]
      }
    },
    "rows": [
      {
        "label": "1,600 kcal",
        "values": [
          "100 g",
          "180 g",
          "220 g",
          "260 g"
        ],
        "params": {
          "calories": "1600"
        }
      },
      {
        "label": "2,000 kcal",
        "values": [
          "125 g",
          "225 g",
          "275 g",
          "325 g"
        ],
        "params": {
          "calories": "2000"
        }
      },
      {
        "label": "2,400 kcal",
        "values": [
          "150 g",
          "270 g",
          "330 g",
          "390 g"
        ],
        "params": {
          "calories": "2400"
        }
      },
      {
        "label": "2,800 kcal",
        "values": [
          "175 g",
          "315 g",
          "385 g",
          "455 g"
        ],
        "params": {
          "calories": "2800"
        }
      },
      {
        "label": "3,200 kcal",
        "values": [
          "200 g",
          "360 g",
          "440 g",
          "520 g"
        ],
        "params": {
          "calories": "3200"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "1.600 kcal",
          "values": [
            "100 g",
            "180 g",
            "220 g",
            "260 g"
          ],
          "params": {
            "calories": "1600"
          }
        },
        {
          "label": "2.000 kcal",
          "values": [
            "125 g",
            "225 g",
            "275 g",
            "325 g"
          ],
          "params": {
            "calories": "2000"
          }
        },
        {
          "label": "2.400 kcal",
          "values": [
            "150 g",
            "270 g",
            "330 g",
            "390 g"
          ],
          "params": {
            "calories": "2400"
          }
        },
        {
          "label": "2.800 kcal",
          "values": [
            "175 g",
            "315 g",
            "385 g",
            "455 g"
          ],
          "params": {
            "calories": "2800"
          }
        },
        {
          "label": "3.200 kcal",
          "values": [
            "200 g",
            "360 g",
            "440 g",
            "520 g"
          ],
          "params": {
            "calories": "3200"
          }
        }
      ],
      "fr": [
        {
          "label": "1 600 kcal",
          "values": [
            "100 g",
            "180 g",
            "220 g",
            "260 g"
          ],
          "params": {
            "calories": "1600"
          }
        },
        {
          "label": "2 000 kcal",
          "values": [
            "125 g",
            "225 g",
            "275 g",
            "325 g"
          ],
          "params": {
            "calories": "2000"
          }
        },
        {
          "label": "2 400 kcal",
          "values": [
            "150 g",
            "270 g",
            "330 g",
            "390 g"
          ],
          "params": {
            "calories": "2400"
          }
        },
        {
          "label": "2 800 kcal",
          "values": [
            "175 g",
            "315 g",
            "385 g",
            "455 g"
          ],
          "params": {
            "calories": "2800"
          }
        },
        {
          "label": "3 200 kcal",
          "values": [
            "200 g",
            "360 g",
            "440 g",
            "520 g"
          ],
          "params": {
            "calories": "3200"
          }
        }
      ],
      "de": [
        {
          "label": "1.600 kcal",
          "values": [
            "100 g",
            "180 g",
            "220 g",
            "260 g"
          ],
          "params": {
            "calories": "1600"
          }
        },
        {
          "label": "2.000 kcal",
          "values": [
            "125 g",
            "225 g",
            "275 g",
            "325 g"
          ],
          "params": {
            "calories": "2000"
          }
        },
        {
          "label": "2.400 kcal",
          "values": [
            "150 g",
            "270 g",
            "330 g",
            "390 g"
          ],
          "params": {
            "calories": "2400"
          }
        },
        {
          "label": "2.800 kcal",
          "values": [
            "175 g",
            "315 g",
            "385 g",
            "455 g"
          ],
          "params": {
            "calories": "2800"
          }
        },
        {
          "label": "3.200 kcal",
          "values": [
            "200 g",
            "360 g",
            "440 g",
            "520 g"
          ],
          "params": {
            "calories": "3200"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "pace-calculator"
    ],
    "title": "Running Pace to 5K, 10K, Half Marathon & Marathon Finish Time Chart",
    "description": "Exact even-split race finish times across popular training and racing paces from 4:00/km (6:26/mi) to 6:30/km (10:28/mi).",
    "headers": [
      "Running Pace",
      "5K Finish",
      "10K Finish",
      "Half Marathon (21.1k)",
      "Marathon (42.2k)"
    ],
    "translations": {
      "es": {
        "title": "Tabla de Ritmos de Carrera y Tiempos de Meta (5K a Maratón)",
        "description": "Tiempos finales exactos a ritmo constante desde 4:00/km hasta 6:30/km en 5K, 10K, Media Maratón y Maratón.",
        "headers": [
          "Ritmo (Velocidad)",
          "5K (5 km)",
          "10K (10 km)",
          "Media Maratón",
          "Maratón (42,2 km)"
        ]
      },
      "fr": {
        "title": "Tableau des Allures de Course et Temps Finaux (5 km au Marathon)",
        "description": "Temps de passage et chronos finaux exacts pour des allures de 4:00/km à 6:30/km.",
        "headers": [
          "Allure (Vitesse)",
          "5 km",
          "10 km",
          "Semi-Marathon",
          "Marathon (42,2 km)"
        ]
      },
      "de": {
        "title": "Laufpace- & Zielzeiten-Tabelle (5 km, 10 km, Halbmarathon & Marathon)",
        "description": "Präzise Endzeiten bei gleichmäßigem Tempo von 4:00 min/km (15 km/h) bis 6:30 min/km.",
        "headers": [
          "Pace (Tempo)",
          "5 km",
          "10 km",
          "Halbmarathon",
          "Marathon (42,2 km)"
        ]
      }
    },
    "rows": [
      {
        "label": "6:26 /mi (4:00 /km)",
        "values": [
          "20:00",
          "40:00",
          "1:24:23",
          "2:48:47"
        ],
        "params": {
          "pace_minutes": "4",
          "pace_seconds": "0",
          "distance_km": "10"
        }
      },
      {
        "label": "7:15 /mi (4:30 /km)",
        "values": [
          "22:30",
          "45:00",
          "1:34:56",
          "3:09:53"
        ],
        "params": {
          "pace_minutes": "4",
          "pace_seconds": "30",
          "distance_km": "10"
        }
      },
      {
        "label": "8:03 /mi (5:00 /km)",
        "values": [
          "25:00",
          "50:00",
          "1:45:29",
          "3:30:59"
        ],
        "params": {
          "pace_minutes": "5",
          "pace_seconds": "0",
          "distance_km": "10"
        }
      },
      {
        "label": "8:51 /mi (5:30 /km)",
        "values": [
          "27:30",
          "55:00",
          "1:56:02",
          "3:52:04"
        ],
        "params": {
          "pace_minutes": "5",
          "pace_seconds": "30",
          "distance_km": "10"
        }
      },
      {
        "label": "9:39 /mi (6:00 /km)",
        "values": [
          "30:00",
          "1:00:00",
          "2:06:35",
          "4:13:10"
        ],
        "params": {
          "pace_minutes": "6",
          "pace_seconds": "0",
          "distance_km": "10"
        }
      },
      {
        "label": "10:28 /mi (6:30 /km)",
        "values": [
          "32:30",
          "1:05:00",
          "2:17:08",
          "4:34:16"
        ],
        "params": {
          "pace_minutes": "6",
          "pace_seconds": "30",
          "distance_km": "10"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "4:00 /km (15,0 km/h)",
          "values": [
            "20:00",
            "40:00",
            "1:24:23",
            "2:48:47"
          ],
          "params": {
            "pace_minutes": "4",
            "pace_seconds": "0",
            "distance_km": "10"
          }
        },
        {
          "label": "4:30 /km (13,3 km/h)",
          "values": [
            "22:30",
            "45:00",
            "1:34:56",
            "3:09:53"
          ],
          "params": {
            "pace_minutes": "4",
            "pace_seconds": "30",
            "distance_km": "10"
          }
        },
        {
          "label": "5:00 /km (12,0 km/h)",
          "values": [
            "25:00",
            "50:00",
            "1:45:29",
            "3:30:59"
          ],
          "params": {
            "pace_minutes": "5",
            "pace_seconds": "0",
            "distance_km": "10"
          }
        },
        {
          "label": "5:30 /km (10,9 km/h)",
          "values": [
            "27:30",
            "55:00",
            "1:56:02",
            "3:52:04"
          ],
          "params": {
            "pace_minutes": "5",
            "pace_seconds": "30",
            "distance_km": "10"
          }
        },
        {
          "label": "6:00 /km (10,0 km/h)",
          "values": [
            "30:00",
            "1:00:00",
            "2:06:35",
            "4:13:10"
          ],
          "params": {
            "pace_minutes": "6",
            "pace_seconds": "0",
            "distance_km": "10"
          }
        },
        {
          "label": "6:30 /km (9,2 km/h)",
          "values": [
            "32:30",
            "1:05:00",
            "2:17:08",
            "4:34:16"
          ],
          "params": {
            "pace_minutes": "6",
            "pace_seconds": "30",
            "distance_km": "10"
          }
        }
      ],
      "fr": [
        {
          "label": "4:00 /km (15,0 km/h)",
          "values": [
            "20:00",
            "40:00",
            "1:24:23",
            "2:48:47"
          ],
          "params": {
            "pace_minutes": "4",
            "pace_seconds": "0",
            "distance_km": "10"
          }
        },
        {
          "label": "4:30 /km (13,3 km/h)",
          "values": [
            "22:30",
            "45:00",
            "1:34:56",
            "3:09:53"
          ],
          "params": {
            "pace_minutes": "4",
            "pace_seconds": "30",
            "distance_km": "10"
          }
        },
        {
          "label": "5:00 /km (12,0 km/h)",
          "values": [
            "25:00",
            "50:00",
            "1:45:29",
            "3:30:59"
          ],
          "params": {
            "pace_minutes": "5",
            "pace_seconds": "0",
            "distance_km": "10"
          }
        },
        {
          "label": "5:30 /km (10,9 km/h)",
          "values": [
            "27:30",
            "55:00",
            "1:56:02",
            "3:52:04"
          ],
          "params": {
            "pace_minutes": "5",
            "pace_seconds": "30",
            "distance_km": "10"
          }
        },
        {
          "label": "6:00 /km (10,0 km/h)",
          "values": [
            "30:00",
            "1:00:00",
            "2:06:35",
            "4:13:10"
          ],
          "params": {
            "pace_minutes": "6",
            "pace_seconds": "0",
            "distance_km": "10"
          }
        },
        {
          "label": "6:30 /km (9,2 km/h)",
          "values": [
            "32:30",
            "1:05:00",
            "2:17:08",
            "4:34:16"
          ],
          "params": {
            "pace_minutes": "6",
            "pace_seconds": "30",
            "distance_km": "10"
          }
        }
      ],
      "de": [
        {
          "label": "4:00 /km (15,0 km/h)",
          "values": [
            "20:00",
            "40:00",
            "1:24:23",
            "2:48:47"
          ],
          "params": {
            "pace_minutes": "4",
            "pace_seconds": "0",
            "distance_km": "10"
          }
        },
        {
          "label": "4:30 /km (13,3 km/h)",
          "values": [
            "22:30",
            "45:00",
            "1:34:56",
            "3:09:53"
          ],
          "params": {
            "pace_minutes": "4",
            "pace_seconds": "30",
            "distance_km": "10"
          }
        },
        {
          "label": "5:00 /km (12,0 km/h)",
          "values": [
            "25:00",
            "50:00",
            "1:45:29",
            "3:30:59"
          ],
          "params": {
            "pace_minutes": "5",
            "pace_seconds": "0",
            "distance_km": "10"
          }
        },
        {
          "label": "5:30 /km (10,9 km/h)",
          "values": [
            "27:30",
            "55:00",
            "1:56:02",
            "3:52:04"
          ],
          "params": {
            "pace_minutes": "5",
            "pace_seconds": "30",
            "distance_km": "10"
          }
        },
        {
          "label": "6:00 /km (10,0 km/h)",
          "values": [
            "30:00",
            "1:00:00",
            "2:06:35",
            "4:13:10"
          ],
          "params": {
            "pace_minutes": "6",
            "pace_seconds": "0",
            "distance_km": "10"
          }
        },
        {
          "label": "6:30 /km (9,2 km/h)",
          "values": [
            "32:30",
            "1:05:00",
            "2:17:08",
            "4:34:16"
          ],
          "params": {
            "pace_minutes": "6",
            "pace_seconds": "30",
            "distance_km": "10"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "pregnancy-calculator",
      "due-date-calculator",
      "pregnancy-conception-calculator",
      "ovulation-calculator"
    ],
    "title": "Pregnancy Trimester & Gestational Milestone Reference (Weeks 1–40)",
    "description": "Clinical overview of gestational weeks, fetal length progression, and key prenatal milestones from conception through full term.",
    "headers": [
      "Gestational Age",
      "Stage",
      "Typical Length",
      "Key Developmental Milestone"
    ],
    "translations": {
      "es": {
        "title": "Calendario de Trimestres e Hitos del Embarazo (Semanas 1–40)",
        "description": "Resumen clínico por semanas de gestación, tamaño fetal aproximado y controles prenatales clave.",
        "headers": [
          "Edad Gestacional",
          "Etapa",
          "Longitud Típica",
          "Hito del Desarrollo"
        ]
      },
      "fr": {
        "title": "Calendrier des Trimestres et Étapes de Grossesse (Semaines 1–40)",
        "description": "Repères cliniques par semaines d’aménorrhée (SA), taille fœtale et examens prénataux majeurs.",
        "headers": [
          "Âge Gestationnel",
          "Trimestre",
          "Taille Estimée",
          "Étape Clé"
        ]
      },
      "de": {
        "title": "Schwangerschafts-Trimester & Meilensteine (1. bis 40. SSW)",
        "description": "Übersicht der Schwangerschaftswochen (SSW), fetalen Größe und wichtigen Vorsorge-Meilensteinen.",
        "headers": [
          "Schwangerschaftswoche",
          "Abschnitt",
          "Typische Größe",
          "Entwicklungs-Meilenstein"
        ]
      }
    },
    "rows": [
      {
        "label": "Weeks 1–12",
        "values": [
          "1st Trimester",
          "Poppy seed → Lime (5.4 cm)",
          "Heartbeat (~wk 6), organogenesis"
        ],
        "params": {
          "weeks": "10"
        }
      },
      {
        "label": "Weeks 13–20",
        "values": [
          "2nd Trimester (Early)",
          "Peach → Banana (25 cm)",
          "20-week anatomy ultrasound, first kicks"
        ],
        "params": {
          "weeks": "20"
        }
      },
      {
        "label": "Weeks 21–27",
        "values": [
          "2nd Trimester (Late)",
          "Carrot → Cauliflower (36 cm)",
          "Hearing develops, glucose screening"
        ],
        "params": {
          "weeks": "26"
        }
      },
      {
        "label": "Weeks 28–36",
        "values": [
          "3rd Trimester",
          "Eggplant → Honeydew (47 cm)",
          "Rapid brain growth, lung maturation"
        ],
        "params": {
          "weeks": "34"
        }
      },
      {
        "label": "Weeks 37–40",
        "values": [
          "Full Term",
          "Watermelon (~50 cm / 3.4 kg)",
          "Ready for delivery (EDD = 40 wks)"
        ],
        "params": {
          "weeks": "40"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "Semanas 1–12",
          "values": [
            "1.er Trimestre",
            "Semilla → Lima (5,4 cm)",
            "Latido (~sem 6), organogénesis"
          ],
          "params": {
            "weeks": "10"
          }
        },
        {
          "label": "Semanas 13–20",
          "values": [
            "2.º Trimestre (Inicio)",
            "Melocotón → Plátano (25 cm)",
            "Ecografía morfológica (sem 20)"
          ],
          "params": {
            "weeks": "20"
          }
        },
        {
          "label": "Semanas 21–27",
          "values": [
            "2.º Trimestre (Final)",
            "Zanahoria → Coliflor (36 cm)",
            "Desarrollo auditivo, test glucosa"
          ],
          "params": {
            "weeks": "26"
          }
        },
        {
          "label": "Semanas 28–36",
          "values": [
            "3.er Trimestre",
            "Berenjena → Melón (47 cm)",
            "Maduración pulmonar y cerebral"
          ],
          "params": {
            "weeks": "34"
          }
        },
        {
          "label": "Semanas 37–40",
          "values": [
            "A Término",
            "Sandía (~50 cm / 3,4 kg)",
            "Listo para nacer (FPP = 40 sem)"
          ],
          "params": {
            "weeks": "40"
          }
        }
      ],
      "fr": [
        {
          "label": "Semaines (SA) 1–12",
          "values": [
            "1er Trimestre",
            "Graine → Citron vert (5,4 cm)",
            "Battement (~sem 6), organogenèse"
          ],
          "params": {
            "weeks": "10"
          }
        },
        {
          "label": "Semaines (SA) 13–20",
          "values": [
            "2e Trimestre (Début)",
            "Pêche → Banane (25 cm)",
            "Échographie morphologique (22 SA)"
          ],
          "params": {
            "weeks": "20"
          }
        },
        {
          "label": "Semaines (SA) 21–27",
          "values": [
            "2e Trimestre (Fin)",
            "Carotte → Chou-fleur (36 cm)",
            "Audition active, dépistage diabète"
          ],
          "params": {
            "weeks": "26"
          }
        },
        {
          "label": "Semaines (SA) 28–36",
          "values": [
            "3e Trimestre",
            "Aubergine → Melon (47 cm)",
            "Maturation pulmonaire et cérébrale"
          ],
          "params": {
            "weeks": "34"
          }
        },
        {
          "label": "Semaines (SA) 37–40",
          "values": [
            "À Terme",
            "Pastèque (~50 cm / 3,4 kg)",
            "Prêt à naître (terme 40–41 SA)"
          ],
          "params": {
            "weeks": "40"
          }
        }
      ],
      "de": [
        {
          "label": "SSW 1–12",
          "values": [
            "1. Trimester",
            "Mohnsamen → Limette (5,4 cm)",
            "Herzschlag (~SSW 6), Organanlage"
          ],
          "params": {
            "weeks": "10"
          }
        },
        {
          "label": "SSW 13–20",
          "values": [
            "2. Trimester (Früh)",
            "Pfirsich → Banane (25 cm)",
            "Feindiagnostik & erste Kindsbewegungen"
          ],
          "params": {
            "weeks": "20"
          }
        },
        {
          "label": "SSW 21–27",
          "values": [
            "2. Trimester (Spät)",
            "Karotte → Blumenkohl (36 cm)",
            "Gehör entwickelt sich, Glukosetest"
          ],
          "params": {
            "weeks": "26"
          }
        },
        {
          "label": "SSW 28–36",
          "values": [
            "3. Trimester",
            "Aubergine → Honigmelone (47 cm)",
            "Lungenreife & starkes Gewichtswachstum"
          ],
          "params": {
            "weeks": "34"
          }
        },
        {
          "label": "SSW 37–40",
          "values": [
            "Geburtsreif (Termin)",
            "Wassermelone (~50 cm / 3,4 kg)",
            "Geburtsbereit (ET = 40. SSW)"
          ],
          "params": {
            "weeks": "40"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "advanced-sleep-cycle-calculator"
    ],
    "title": "90-Minute Sleep Cycle Optimal Wake-Up Schedule (Incl. 15-Min Latency)",
    "description": "Wake-up times aligned to the end of 4 (6 h), 5 (7.5 h — recommended adult target), and 6 (9 h) complete REM/NREM cycles assuming 15 minutes to fall asleep.",
    "headers": [
      "Bedtime",
      "4 Cycles (6.0 h)",
      "5 Cycles (7.5 h · Optimal)",
      "6 Cycles (9.0 h)"
    ],
    "translations": {
      "es": {
        "title": "Horarios Óptimos de Despertar por Ciclos de 90 Min (+15 min Latencia)",
        "description": "Horas ideales de alarma al finalizar 4 (6 h), 5 (7,5 h recomendadas) o 6 (9 h) ciclos completos de sueño.",
        "headers": [
          "Hora de Acostarse",
          "4 Ciclos (6,0 h)",
          "5 Ciclos (7,5 h · Óptimo)",
          "6 Ciclos (9,0 h)"
        ]
      },
      "fr": {
        "title": "Heures de Réveil Optimales par Cycles de 90 Min (+15 min Endormissement)",
        "description": "Réveils synchronisés en fin de 4 (6 h), 5 (7 h 30 recommandé) ou 6 (9 h) cycles complets pour éviter l’inertie matinale.",
        "headers": [
          "Heure du Coucher",
          "4 Cycles (6 h)",
          "5 Cycles (7 h 30 · Idéal)",
          "6 Cycles (9 h)"
        ]
      },
      "de": {
        "title": "Optimale Aufwachzeiten nach 90-Minuten-Schlafzyklen (+15 Min. Einschlafzeit)",
        "description": "Weckzeiten am Ende von 4 (6 Std.), 5 (7,5 Std. optimal) oder 6 (9 Std.) vollständigen Schlafzyklen.",
        "headers": [
          "Schlafenszeit",
          "4 Zyklen (6,0 Std.)",
          "5 Zyklen (7,5 Std. · Ideal)",
          "6 Zyklen (9,0 Std.)"
        ]
      }
    },
    "rows": [
      {
        "label": "9:30 PM",
        "values": [
          "3:45 AM",
          "5:15 AM",
          "6:45 AM"
        ],
        "params": {
          "bedtime": "21:30",
          "latency_minutes": "15"
        }
      },
      {
        "label": "10:00 PM",
        "values": [
          "4:15 AM",
          "5:45 AM",
          "7:15 AM"
        ],
        "params": {
          "bedtime": "22:00",
          "latency_minutes": "15"
        }
      },
      {
        "label": "10:30 PM",
        "values": [
          "4:45 AM",
          "6:15 AM",
          "7:45 AM"
        ],
        "params": {
          "bedtime": "22:30",
          "latency_minutes": "15"
        }
      },
      {
        "label": "11:00 PM",
        "values": [
          "5:15 AM",
          "6:45 AM",
          "8:15 AM"
        ],
        "params": {
          "bedtime": "23:00",
          "latency_minutes": "15"
        }
      },
      {
        "label": "11:30 PM",
        "values": [
          "5:45 AM",
          "7:15 AM",
          "8:45 AM"
        ],
        "params": {
          "bedtime": "23:30",
          "latency_minutes": "15"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "21:30",
          "values": [
            "03:45",
            "05:15",
            "06:45"
          ],
          "params": {
            "bedtime": "21:30",
            "latency_minutes": "15"
          }
        },
        {
          "label": "22:00",
          "values": [
            "04:15",
            "05:45",
            "07:15"
          ],
          "params": {
            "bedtime": "22:00",
            "latency_minutes": "15"
          }
        },
        {
          "label": "22:30",
          "values": [
            "04:45",
            "06:15",
            "07:45"
          ],
          "params": {
            "bedtime": "22:30",
            "latency_minutes": "15"
          }
        },
        {
          "label": "23:00",
          "values": [
            "05:15",
            "06:45",
            "08:15"
          ],
          "params": {
            "bedtime": "23:00",
            "latency_minutes": "15"
          }
        },
        {
          "label": "23:30",
          "values": [
            "05:45",
            "07:15",
            "08:45"
          ],
          "params": {
            "bedtime": "23:30",
            "latency_minutes": "15"
          }
        }
      ],
      "fr": [
        {
          "label": "21:30",
          "values": [
            "03:45",
            "05:15",
            "06:45"
          ],
          "params": {
            "bedtime": "21:30",
            "latency_minutes": "15"
          }
        },
        {
          "label": "22:00",
          "values": [
            "04:15",
            "05:45",
            "07:15"
          ],
          "params": {
            "bedtime": "22:00",
            "latency_minutes": "15"
          }
        },
        {
          "label": "22:30",
          "values": [
            "04:45",
            "06:15",
            "07:45"
          ],
          "params": {
            "bedtime": "22:30",
            "latency_minutes": "15"
          }
        },
        {
          "label": "23:00",
          "values": [
            "05:15",
            "06:45",
            "08:15"
          ],
          "params": {
            "bedtime": "23:00",
            "latency_minutes": "15"
          }
        },
        {
          "label": "23:30",
          "values": [
            "05:45",
            "07:15",
            "08:45"
          ],
          "params": {
            "bedtime": "23:30",
            "latency_minutes": "15"
          }
        }
      ],
      "de": [
        {
          "label": "21:30",
          "values": [
            "03:45",
            "05:15",
            "06:45"
          ],
          "params": {
            "bedtime": "21:30",
            "latency_minutes": "15"
          }
        },
        {
          "label": "22:00",
          "values": [
            "04:15",
            "05:45",
            "07:15"
          ],
          "params": {
            "bedtime": "22:00",
            "latency_minutes": "15"
          }
        },
        {
          "label": "22:30",
          "values": [
            "04:45",
            "06:15",
            "07:45"
          ],
          "params": {
            "bedtime": "22:30",
            "latency_minutes": "15"
          }
        },
        {
          "label": "23:00",
          "values": [
            "05:15",
            "06:45",
            "08:15"
          ],
          "params": {
            "bedtime": "23:00",
            "latency_minutes": "15"
          }
        },
        {
          "label": "23:30",
          "values": [
            "05:45",
            "07:15",
            "08:45"
          ],
          "params": {
            "bedtime": "23:30",
            "latency_minutes": "15"
          }
        }
      ]
    }
  }
];
