// ═══════════════════════════════════════════════════════════════════════
// lib/data/matrices/financeMatrices.ts
// 28 mathematically verified, 4-language (EN / ES / FR / DE) financial
// Featured Snippet matrices with native USD ($) & EUR (€) formatting.
// ═══════════════════════════════════════════════════════════════════════

import type { CalculatorMatrixDef } from './types';

export const financeMatrices: CalculatorMatrixDef[] = [
  {
    "slugs": [
      "mortgage-calculator",
      "amortization-calculator",
      "mortgage-amortization-calculator",
      "canadian-mortgage-calculator",
      "payment-calculator",
      "15-year-mortgage-calculator",
      "30-year-mortgage-calculator"
    ],
    "title": "Monthly Mortgage Payment Comparison (6.5% Fixed APR)",
    "description": "Side-by-side comparison of 15-year vs. 30-year fixed monthly principal & interest payments and lifetime interest cost at 6.5% APR.",
    "headers": [
      "Loan Amount",
      "15-Year Monthly",
      "15-Year Total Interest",
      "30-Year Monthly",
      "30-Year Total Interest"
    ],
    "translations": {
      "es": {
        "title": "Tabla Comparativa de Cuotas Hipotecarias (3,8 % Tipo Fijo)",
        "description": "Comparación de cuotas mensuales y coste total de intereses a 15 y 30 años para importes hipotecarios habituales al 3,8 % TIN.",
        "headers": [
          "Importe Hipoteca",
          "Cuota 15 Años",
          "Intereses (15 Años)",
          "Cuota 30 Años",
          "Intereses (30 Años)"
        ]
      },
      "fr": {
        "title": "Tableau Comparatif des Mensualités Immobilières (Taux Fixe 3,8 %)",
        "description": "Comparaison des mensualités hors assurance et du coût total des intérêts sur 15 et 30 ans pour un prêt immobilier à 3,8 %.",
        "headers": [
          "Capital Emprunté",
          "Mensualité 15 Ans",
          "Intérêts (15 Ans)",
          "Mensualité 30 Ans",
          "Intérêts (30 Ans)"
        ]
      },
      "de": {
        "title": "Baufinanzierung-Ratenvergleich (3,8 % Sollzins, 15 vs. 30 Jahre)",
        "description": "Schnellübersicht der monatlichen Annuitäten und Gesamtzinskosten für gängige Immobilienkredite bei 3,8 % gebundenem Sollzins.",
        "headers": [
          "Darlehensbetrag",
          "Rate (15 J.)",
          "Gesamtzins (15 J.)",
          "Rate (30 J.)",
          "Gesamtzins (30 J.)"
        ]
      }
    },
    "rows": [
      {
        "label": "$150,000",
        "values": [
          "$1,307 / mo",
          "$85,199",
          "$948 / mo",
          "$191,317"
        ],
        "params": {
          "home_value": "187500",
          "down_payment": "37500",
          "loan_amount": "150000",
          "interest_rate": "6.5",
          "loan_term": "30"
        }
      },
      {
        "label": "$250,000",
        "values": [
          "$2,178 / mo",
          "$141,998",
          "$1,580 / mo",
          "$318,861"
        ],
        "params": {
          "home_value": "312500",
          "down_payment": "62500",
          "loan_amount": "250000",
          "interest_rate": "6.5",
          "loan_term": "30"
        }
      },
      {
        "label": "$350,000",
        "values": [
          "$3,049 / mo",
          "$198,798",
          "$2,212 / mo",
          "$446,406"
        ],
        "params": {
          "home_value": "437500",
          "down_payment": "87500",
          "loan_amount": "350000",
          "interest_rate": "6.5",
          "loan_term": "30"
        }
      },
      {
        "label": "$500,000",
        "values": [
          "$4,356 / mo",
          "$283,997",
          "$3,160 / mo",
          "$637,722"
        ],
        "params": {
          "home_value": "625000",
          "down_payment": "125000",
          "loan_amount": "500000",
          "interest_rate": "6.5",
          "loan_term": "30"
        }
      },
      {
        "label": "$750,000",
        "values": [
          "$6,533 / mo",
          "$425,995",
          "$4,741 / mo",
          "$956,584"
        ],
        "params": {
          "home_value": "937500",
          "down_payment": "187500",
          "loan_amount": "750000",
          "interest_rate": "6.5",
          "loan_term": "30"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "150.000 €",
          "values": [
            "1.095 € / mes",
            "47.020 €",
            "699 € / mes",
            "101.617 €"
          ],
          "params": {
            "home_value": "187500",
            "down_payment": "37500",
            "loan_amount": "150000",
            "interest_rate": "3.8",
            "loan_term": "30"
          }
        },
        {
          "label": "250.000 €",
          "values": [
            "1.824 € / mes",
            "78.367 €",
            "1.165 € / mes",
            "169.362 €"
          ],
          "params": {
            "home_value": "312500",
            "down_payment": "62500",
            "loan_amount": "250000",
            "interest_rate": "3.8",
            "loan_term": "30"
          }
        },
        {
          "label": "350.000 €",
          "values": [
            "2.554 € / mes",
            "109.714 €",
            "1.631 € / mes",
            "237.106 €"
          ],
          "params": {
            "home_value": "437500",
            "down_payment": "87500",
            "loan_amount": "350000",
            "interest_rate": "3.8",
            "loan_term": "30"
          }
        },
        {
          "label": "500.000 €",
          "values": [
            "3.649 € / mes",
            "156.735 €",
            "2.330 € / mes",
            "338.723 €"
          ],
          "params": {
            "home_value": "625000",
            "down_payment": "125000",
            "loan_amount": "500000",
            "interest_rate": "3.8",
            "loan_term": "30"
          }
        },
        {
          "label": "750.000 €",
          "values": [
            "5.473 € / mes",
            "235.102 €",
            "3.495 € / mes",
            "508.085 €"
          ],
          "params": {
            "home_value": "937500",
            "down_payment": "187500",
            "loan_amount": "750000",
            "interest_rate": "3.8",
            "loan_term": "30"
          }
        }
      ],
      "fr": [
        {
          "label": "150 000 €",
          "values": [
            "1 095 € / mois",
            "47 020 €",
            "699 € / mois",
            "101 617 €"
          ],
          "params": {
            "home_value": "187500",
            "down_payment": "37500",
            "loan_amount": "150000",
            "interest_rate": "3.8",
            "loan_term": "30"
          }
        },
        {
          "label": "250 000 €",
          "values": [
            "1 824 € / mois",
            "78 367 €",
            "1 165 € / mois",
            "169 362 €"
          ],
          "params": {
            "home_value": "312500",
            "down_payment": "62500",
            "loan_amount": "250000",
            "interest_rate": "3.8",
            "loan_term": "30"
          }
        },
        {
          "label": "350 000 €",
          "values": [
            "2 554 € / mois",
            "109 714 €",
            "1 631 € / mois",
            "237 106 €"
          ],
          "params": {
            "home_value": "437500",
            "down_payment": "87500",
            "loan_amount": "350000",
            "interest_rate": "3.8",
            "loan_term": "30"
          }
        },
        {
          "label": "500 000 €",
          "values": [
            "3 649 € / mois",
            "156 735 €",
            "2 330 € / mois",
            "338 723 €"
          ],
          "params": {
            "home_value": "625000",
            "down_payment": "125000",
            "loan_amount": "500000",
            "interest_rate": "3.8",
            "loan_term": "30"
          }
        },
        {
          "label": "750 000 €",
          "values": [
            "5 473 € / mois",
            "235 102 €",
            "3 495 € / mois",
            "508 085 €"
          ],
          "params": {
            "home_value": "937500",
            "down_payment": "187500",
            "loan_amount": "750000",
            "interest_rate": "3.8",
            "loan_term": "30"
          }
        }
      ],
      "de": [
        {
          "label": "150.000 €",
          "values": [
            "1.095 € / Mon.",
            "47.020 €",
            "699 € / Mon.",
            "101.617 €"
          ],
          "params": {
            "home_value": "187500",
            "down_payment": "37500",
            "loan_amount": "150000",
            "interest_rate": "3.8",
            "loan_term": "30"
          }
        },
        {
          "label": "250.000 €",
          "values": [
            "1.824 € / Mon.",
            "78.367 €",
            "1.165 € / Mon.",
            "169.362 €"
          ],
          "params": {
            "home_value": "312500",
            "down_payment": "62500",
            "loan_amount": "250000",
            "interest_rate": "3.8",
            "loan_term": "30"
          }
        },
        {
          "label": "350.000 €",
          "values": [
            "2.554 € / Mon.",
            "109.714 €",
            "1.631 € / Mon.",
            "237.106 €"
          ],
          "params": {
            "home_value": "437500",
            "down_payment": "87500",
            "loan_amount": "350000",
            "interest_rate": "3.8",
            "loan_term": "30"
          }
        },
        {
          "label": "500.000 €",
          "values": [
            "3.649 € / Mon.",
            "156.735 €",
            "2.330 € / Mon.",
            "338.723 €"
          ],
          "params": {
            "home_value": "625000",
            "down_payment": "125000",
            "loan_amount": "500000",
            "interest_rate": "3.8",
            "loan_term": "30"
          }
        },
        {
          "label": "750.000 €",
          "values": [
            "5.473 € / Mon.",
            "235.102 €",
            "3.495 € / Mon.",
            "508.085 €"
          ],
          "params": {
            "home_value": "937500",
            "down_payment": "187500",
            "loan_amount": "750000",
            "interest_rate": "3.8",
            "loan_term": "30"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "fha-loan-calculator",
      "va-mortgage-calculator",
      "va-loan-calculator",
      "jumbo-mortgage-calculator"
    ],
    "title": "FHA, VA & Jumbo Mortgage Payment Matrix (30-Yr at 6.25%)",
    "description": "Compare down payment requirements, financed loan balances, and monthly principal & interest payments across FHA, VA, Conventional, and Jumbo tiers.",
    "headers": [
      "Home Price & Program",
      "Down Payment",
      "Loan Balance",
      "Monthly P&I",
      "30-Yr Interest"
    ],
    "translations": {
      "es": {
        "title": "Matriz de Hipotecas Especiales y Alto Importe (30 Años al 3,9 %)",
        "description": "Compare entrada inicial, capital financiado, cuota mensual e intereses totales según el porcentaje de financiación.",
        "headers": [
          "Precio y Modalidad",
          "Entrada",
          "Capital Financiado",
          "Cuota Mensual",
          "Interés 30 Años"
        ]
      },
      "fr": {
        "title": "Matrice de Financement Immobilier par Apport (30 Ans à 3,9 %)",
        "description": "Comparez l’apport initial, le capital emprunté, la mensualité et le coût total des intérêts selon votre profil d’achat.",
        "headers": [
          "Prix & Formule",
          "Apport",
          "Capital Emprunté",
          "Mensualité",
          "Intérêts 30 Ans"
        ]
      },
      "de": {
        "title": "Baufinanzierung-Vergleich nach Eigenkapitalquote (30 J., 3,9 %)",
        "description": "Vergleich von Eigenkapital, Darlehenssumme, Monatsrate und Gesamtzinsen von Vollfinanzierung bis Großdarlehen.",
        "headers": [
          "Kaufpreis & Tarif",
          "Eigenkapital",
          "Darlehenssumme",
          "Monatsrate",
          "Zinsen (30 J.)"
        ]
      }
    },
    "rows": [
      {
        "label": "$300,000 · FHA (3.5% Down)",
        "values": [
          "$10,500",
          "$289,500",
          "$1,783 / mo",
          "$352,200"
        ],
        "params": {
          "home_value": "300000",
          "down_payment": "10500",
          "loan_amount": "289500",
          "interest_rate": "6.25",
          "loan_term": "30"
        }
      },
      {
        "label": "$400,000 · VA (0% Down)",
        "values": [
          "$0",
          "$400,000",
          "$2,463 / mo",
          "$486,633"
        ],
        "params": {
          "home_value": "400000",
          "down_payment": "0",
          "loan_amount": "400000",
          "interest_rate": "6.25",
          "loan_term": "30"
        }
      },
      {
        "label": "$500,000 · Conventional (10%)",
        "values": [
          "$50,000",
          "$450,000",
          "$2,771 / mo",
          "$547,462"
        ],
        "params": {
          "home_value": "500000",
          "down_payment": "50000",
          "loan_amount": "450000",
          "interest_rate": "6.25",
          "loan_term": "30"
        }
      },
      {
        "label": "$850,000 · Jumbo (20% Down)",
        "values": [
          "$170,000",
          "$680,000",
          "$4,187 / mo",
          "$827,276"
        ],
        "params": {
          "home_value": "850000",
          "down_payment": "170000",
          "loan_amount": "680000",
          "interest_rate": "6.25",
          "loan_term": "30"
        }
      },
      {
        "label": "$1,200,000 · Jumbo (20% Down)",
        "values": [
          "$240,000",
          "$960,000",
          "$5,911 / mo",
          "$1,167,919"
        ],
        "params": {
          "home_value": "1200000",
          "down_payment": "240000",
          "loan_amount": "960000",
          "interest_rate": "6.25",
          "loan_term": "30"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "300.000 € · Entrada 3,5 %",
          "values": [
            "10.500 €",
            "289.500 €",
            "1.365 € / mes",
            "202.073 €"
          ],
          "params": {
            "home_value": "300000",
            "down_payment": "10500",
            "loan_amount": "289500",
            "interest_rate": "3.9",
            "loan_term": "30"
          }
        },
        {
          "label": "400.000 € · Financiación 100 %",
          "values": [
            "0 €",
            "400.000 €",
            "1.887 € / mes",
            "279.202 €"
          ],
          "params": {
            "home_value": "400000",
            "down_payment": "0",
            "loan_amount": "400000",
            "interest_rate": "3.9",
            "loan_term": "30"
          }
        },
        {
          "label": "500.000 € · Estándar (10 %)",
          "values": [
            "50.000 €",
            "450.000 €",
            "2.123 € / mes",
            "314.102 €"
          ],
          "params": {
            "home_value": "500000",
            "down_payment": "50000",
            "loan_amount": "450000",
            "interest_rate": "3.9",
            "loan_term": "30"
          }
        },
        {
          "label": "850.000 € · Gran Hipoteca (20 %)",
          "values": [
            "170.000 €",
            "680.000 €",
            "3.207 € / mes",
            "474.644 €"
          ],
          "params": {
            "home_value": "850000",
            "down_payment": "170000",
            "loan_amount": "680000",
            "interest_rate": "3.9",
            "loan_term": "30"
          }
        },
        {
          "label": "1.200.000 € · Gran Hipoteca (20 %)",
          "values": [
            "240.000 €",
            "960.000 €",
            "4.528 € / mes",
            "670.085 €"
          ],
          "params": {
            "home_value": "1200000",
            "down_payment": "240000",
            "loan_amount": "960000",
            "interest_rate": "3.9",
            "loan_term": "30"
          }
        }
      ],
      "fr": [
        {
          "label": "300 000 € · Apport 3,5 %",
          "values": [
            "10 500 €",
            "289 500 €",
            "1 365 € / mois",
            "202 073 €"
          ],
          "params": {
            "home_value": "300000",
            "down_payment": "10500",
            "loan_amount": "289500",
            "interest_rate": "3.9",
            "loan_term": "30"
          }
        },
        {
          "label": "400 000 € · Sans Apport (0 %)",
          "values": [
            "0 €",
            "400 000 €",
            "1 887 € / mois",
            "279 202 €"
          ],
          "params": {
            "home_value": "400000",
            "down_payment": "0",
            "loan_amount": "400000",
            "interest_rate": "3.9",
            "loan_term": "30"
          }
        },
        {
          "label": "500 000 € · Standard (10 %)",
          "values": [
            "50 000 €",
            "450 000 €",
            "2 123 € / mois",
            "314 102 €"
          ],
          "params": {
            "home_value": "500000",
            "down_payment": "50000",
            "loan_amount": "450000",
            "interest_rate": "3.9",
            "loan_term": "30"
          }
        },
        {
          "label": "850 000 € · Prêt Haut Montant (20 %)",
          "values": [
            "170 000 €",
            "680 000 €",
            "3 207 € / mois",
            "474 644 €"
          ],
          "params": {
            "home_value": "850000",
            "down_payment": "170000",
            "loan_amount": "680000",
            "interest_rate": "3.9",
            "loan_term": "30"
          }
        },
        {
          "label": "1 200 000 € · Prêt Haut Montant (20 %)",
          "values": [
            "240 000 €",
            "960 000 €",
            "4 528 € / mois",
            "670 085 €"
          ],
          "params": {
            "home_value": "1200000",
            "down_payment": "240000",
            "loan_amount": "960000",
            "interest_rate": "3.9",
            "loan_term": "30"
          }
        }
      ],
      "de": [
        {
          "label": "300.000 € · 3,5 % EK",
          "values": [
            "10.500 €",
            "289.500 €",
            "1.365 € / Mon.",
            "202.073 €"
          ],
          "params": {
            "home_value": "300000",
            "down_payment": "10500",
            "loan_amount": "289500",
            "interest_rate": "3.9",
            "loan_term": "30"
          }
        },
        {
          "label": "400.000 € · Vollfinanzierung",
          "values": [
            "0 €",
            "400.000 €",
            "1.887 € / Mon.",
            "279.202 €"
          ],
          "params": {
            "home_value": "400000",
            "down_payment": "0",
            "loan_amount": "400000",
            "interest_rate": "3.9",
            "loan_term": "30"
          }
        },
        {
          "label": "500.000 € · 10 % Eigenkapital",
          "values": [
            "50.000 €",
            "450.000 €",
            "2.123 € / Mon.",
            "314.102 €"
          ],
          "params": {
            "home_value": "500000",
            "down_payment": "50000",
            "loan_amount": "450000",
            "interest_rate": "3.9",
            "loan_term": "30"
          }
        },
        {
          "label": "850.000 € · 20 % EK (Großkredit)",
          "values": [
            "170.000 €",
            "680.000 €",
            "3.207 € / Mon.",
            "474.644 €"
          ],
          "params": {
            "home_value": "850000",
            "down_payment": "170000",
            "loan_amount": "680000",
            "interest_rate": "3.9",
            "loan_term": "30"
          }
        },
        {
          "label": "1.200.000 € · 20 % EK (Großkredit)",
          "values": [
            "240.000 €",
            "960.000 €",
            "4.528 € / Mon.",
            "670.085 €"
          ],
          "params": {
            "home_value": "1200000",
            "down_payment": "240000",
            "loan_amount": "960000",
            "interest_rate": "3.9",
            "loan_term": "30"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "down-payment-calculator"
    ],
    "title": "Down Payment & LTV Impact on a $400,000 Home (6.5% APR)",
    "description": "See how increasing your down payment from 5% to 25% reduces loan-to-value (LTV), eliminates private mortgage insurance (PMI), and lowers monthly payments.",
    "headers": [
      "Down Payment",
      "Loan Amount",
      "LTV Ratio",
      "30-Yr Monthly P&I",
      "PMI Status"
    ],
    "translations": {
      "es": {
        "title": "Impacto de la Entrada Inicial y LTV en una Vivienda de 400.000 € (3,8 %)",
        "description": "Vea cómo aumentar la entrada del 5 % al 25 % reduce el ratio LTV y abarata la cuota mensual hipotecaria.",
        "headers": [
          "Entrada Inicial",
          "Capital Financiado",
          "Ratio LTV",
          "Cuota Mensual",
          "Condición LTV"
        ]
      },
      "fr": {
        "title": "Impact de l’Apport Personnel sur un Bien à 400 000 € (3,8 %)",
        "description": "Découvrez comment un apport de 5 % à 25 % réduit votre ratio prêt/valeur (LTV) et vos mensualités.",
        "headers": [
          "Apport Personnel",
          "Montant Emprunté",
          "Ratio LTV",
          "Mensualité 30 Ans",
          "Profil Risque"
        ]
      },
      "de": {
        "title": "Auswirkung des Eigenkapitals bei 400.000 € Kaufpreis (3,8 %)",
        "description": "Übersicht, wie 5 % bis 25 % Eigenkapital den Beleihungsauslauf (LTV) senken und die monatliche Kreditrate reduzieren.",
        "headers": [
          "Eigenkapital",
          "Darlehensbetrag",
          "Beleihung (LTV)",
          "Monatsrate (30 J.)",
          "Konditionsstufe"
        ]
      }
    },
    "rows": [
      {
        "label": "5% ($20,000)",
        "values": [
          "$380,000",
          "95%",
          "$2,402 / mo",
          "Required"
        ],
        "params": {
          "home_value": "400000",
          "down_payment": "20000",
          "interest_rate": "6.5",
          "loan_term": "30"
        }
      },
      {
        "label": "10% ($40,000)",
        "values": [
          "$360,000",
          "90%",
          "$2,275 / mo",
          "Required"
        ],
        "params": {
          "home_value": "400000",
          "down_payment": "40000",
          "interest_rate": "6.5",
          "loan_term": "30"
        }
      },
      {
        "label": "15% ($60,000)",
        "values": [
          "$340,000",
          "85%",
          "$2,149 / mo",
          "Required"
        ],
        "params": {
          "home_value": "400000",
          "down_payment": "60000",
          "interest_rate": "6.5",
          "loan_term": "30"
        }
      },
      {
        "label": "20% ($80,000)",
        "values": [
          "$320,000",
          "80%",
          "$2,023 / mo",
          "None (80% LTV)"
        ],
        "params": {
          "home_value": "400000",
          "down_payment": "80000",
          "interest_rate": "6.5",
          "loan_term": "30"
        }
      },
      {
        "label": "25% ($100,000)",
        "values": [
          "$300,000",
          "75%",
          "$1,896 / mo",
          "None (80% LTV)"
        ],
        "params": {
          "home_value": "400000",
          "down_payment": "100000",
          "interest_rate": "6.5",
          "loan_term": "30"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "5% (20.000 €)",
          "values": [
            "380.000 €",
            "95%",
            "1.771 € / mes",
            "Sí / Mayor riesgo"
          ],
          "params": {
            "home_value": "400000",
            "down_payment": "20000",
            "interest_rate": "3.8",
            "loan_term": "30"
          }
        },
        {
          "label": "10% (40.000 €)",
          "values": [
            "360.000 €",
            "90%",
            "1.677 € / mes",
            "Sí / Mayor riesgo"
          ],
          "params": {
            "home_value": "400000",
            "down_payment": "40000",
            "interest_rate": "3.8",
            "loan_term": "30"
          }
        },
        {
          "label": "15% (60.000 €)",
          "values": [
            "340.000 €",
            "85%",
            "1.584 € / mes",
            "Sí / Mayor riesgo"
          ],
          "params": {
            "home_value": "400000",
            "down_payment": "60000",
            "interest_rate": "3.8",
            "loan_term": "30"
          }
        },
        {
          "label": "20% (80.000 €)",
          "values": [
            "320.000 €",
            "80%",
            "1.491 € / mes",
            "Exento (≤80% LTV)"
          ],
          "params": {
            "home_value": "400000",
            "down_payment": "80000",
            "interest_rate": "3.8",
            "loan_term": "30"
          }
        },
        {
          "label": "25% (100.000 €)",
          "values": [
            "300.000 €",
            "75%",
            "1.398 € / mes",
            "Exento (≤80% LTV)"
          ],
          "params": {
            "home_value": "400000",
            "down_payment": "100000",
            "interest_rate": "3.8",
            "loan_term": "30"
          }
        }
      ],
      "fr": [
        {
          "label": "5 % (20 000 €)",
          "values": [
            "380 000 €",
            "95 %",
            "1 771 € / mois",
            "Caution élevée"
          ],
          "params": {
            "home_value": "400000",
            "down_payment": "20000",
            "interest_rate": "3.8",
            "loan_term": "30"
          }
        },
        {
          "label": "10 % (40 000 €)",
          "values": [
            "360 000 €",
            "90 %",
            "1 677 € / mois",
            "Caution élevée"
          ],
          "params": {
            "home_value": "400000",
            "down_payment": "40000",
            "interest_rate": "3.8",
            "loan_term": "30"
          }
        },
        {
          "label": "15 % (60 000 €)",
          "values": [
            "340 000 €",
            "85 %",
            "1 584 € / mois",
            "Caution élevée"
          ],
          "params": {
            "home_value": "400000",
            "down_payment": "60000",
            "interest_rate": "3.8",
            "loan_term": "30"
          }
        },
        {
          "label": "20 % (80 000 €)",
          "values": [
            "320 000 €",
            "80 %",
            "1 491 € / mois",
            "Optimal (≤80% LTV)"
          ],
          "params": {
            "home_value": "400000",
            "down_payment": "80000",
            "interest_rate": "3.8",
            "loan_term": "30"
          }
        },
        {
          "label": "25 % (100 000 €)",
          "values": [
            "300 000 €",
            "75 %",
            "1 398 € / mois",
            "Optimal (≤80% LTV)"
          ],
          "params": {
            "home_value": "400000",
            "down_payment": "100000",
            "interest_rate": "3.8",
            "loan_term": "30"
          }
        }
      ],
      "de": [
        {
          "label": "5 % (20.000 €)",
          "values": [
            "380.000 €",
            "95 %",
            "1.771 € / Mon.",
            "Zinsaufschlag"
          ],
          "params": {
            "home_value": "400000",
            "down_payment": "20000",
            "interest_rate": "3.8",
            "loan_term": "30"
          }
        },
        {
          "label": "10 % (40.000 €)",
          "values": [
            "360.000 €",
            "90 %",
            "1.677 € / Mon.",
            "Zinsaufschlag"
          ],
          "params": {
            "home_value": "400000",
            "down_payment": "40000",
            "interest_rate": "3.8",
            "loan_term": "30"
          }
        },
        {
          "label": "15 % (60.000 €)",
          "values": [
            "340.000 €",
            "85 %",
            "1.584 € / Mon.",
            "Zinsaufschlag"
          ],
          "params": {
            "home_value": "400000",
            "down_payment": "60000",
            "interest_rate": "3.8",
            "loan_term": "30"
          }
        },
        {
          "label": "20 % (80.000 €)",
          "values": [
            "320.000 €",
            "80 %",
            "1.491 € / Mon.",
            "Top-Kondition (≤80 %)"
          ],
          "params": {
            "home_value": "400000",
            "down_payment": "80000",
            "interest_rate": "3.8",
            "loan_term": "30"
          }
        },
        {
          "label": "25 % (100.000 €)",
          "values": [
            "300.000 €",
            "75 %",
            "1.398 € / Mon.",
            "Top-Kondition (≤80 %)"
          ],
          "params": {
            "home_value": "400000",
            "down_payment": "100000",
            "interest_rate": "3.8",
            "loan_term": "30"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "mortgage-payoff-calculator"
    ],
    "title": "Extra Monthly Mortgage Payment Savings ($350,000 Loan at 6.5%)",
    "description": "Exact payoff acceleration and lifetime interest saved by adding $100 to $1,000 in extra monthly principal toward a 30-year mortgage.",
    "headers": [
      "Extra Monthly Principal",
      "Total Payment",
      "Payoff Time",
      "Total Interest",
      "Interest Saved"
    ],
    "translations": {
      "es": {
        "title": "Ahorro por Amortización Anticipada Mensual (350.000 € al 3,8 %)",
        "description": "Reducción del plazo e intereses ahorrados al aportar de 100 € a 1.000 € adicionales cada mes en una hipoteca a 30 años.",
        "headers": [
          "Aporte Extra Mensual",
          "Pago Total",
          "Plazo Final",
          "Interés Total",
          "Intereses Ahorrados"
        ]
      },
      "fr": {
        "title": "Économies par Remboursement Anticipé Mensuel (350 000 € à 3,8 %)",
        "description": "Gain de durée et d’intérêts en ajoutant de 100 € à 1 000 € de capital supplémentaire chaque mois sur 30 ans.",
        "headers": [
          "Surplus Mensuel",
          "Mensualité Totale",
          "Durée Finale",
          "Coût Intérêts",
          "Intérêts Économisés"
        ]
      },
      "de": {
        "title": "Sondertilgungs-Effekt auf die Laufzeit (350.000 € bei 3,8 %)",
        "description": "Laufzeitverkürzung und Zinsersparnis durch monatliche Mehr-Tilgung von 100 € bis 1.000 € bei einem 30-Jahres-Darlehen.",
        "headers": [
          "Monatl. Mehr-Tilgung",
          "Gesamtrate",
          "Neue Laufzeit",
          "Gesamtzinsen",
          "Zinsersparnis"
        ]
      }
    },
    "rows": [
      {
        "label": "$0 (Base)",
        "values": [
          "$2,212 / mo",
          "30 yrs 1 mo",
          "$448,618",
          "$0"
        ],
        "params": {
          "loan_amount": "350000",
          "interest_rate": "6.5",
          "loan_term": "30",
          "extra_payment": "0"
        }
      },
      {
        "label": "+$100 / mo",
        "values": [
          "$2,312 / mo",
          "26 yrs 6 mo",
          "$385,292",
          "$61,114"
        ],
        "params": {
          "loan_amount": "350000",
          "interest_rate": "6.5",
          "loan_term": "30",
          "extra_payment": "100"
        }
      },
      {
        "label": "+$250 / mo",
        "values": [
          "$2,462 / mo",
          "22 yrs 9 mo",
          "$322,191",
          "$124,215"
        ],
        "params": {
          "loan_amount": "350000",
          "interest_rate": "6.5",
          "loan_term": "30",
          "extra_payment": "250"
        }
      },
      {
        "label": "+$500 / mo",
        "values": [
          "$2,712 / mo",
          "18 yrs 7 mo",
          "$254,829",
          "$191,577"
        ],
        "params": {
          "loan_amount": "350000",
          "interest_rate": "6.5",
          "loan_term": "30",
          "extra_payment": "500"
        }
      },
      {
        "label": "+$1,000 / mo",
        "values": [
          "$3,212 / mo",
          "13 yrs 10 mo",
          "$183,232",
          "$263,174"
        ],
        "params": {
          "loan_amount": "350000",
          "interest_rate": "6.5",
          "loan_term": "30",
          "extra_payment": "1000"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "0 € (Base)",
          "values": [
            "1.631 € / mes",
            "30 años 0 m",
            "237.106 €",
            "0 €"
          ],
          "params": {
            "loan_amount": "350000",
            "interest_rate": "3.8",
            "loan_term": "30",
            "extra_payment": "0"
          }
        },
        {
          "label": "+100 € / mes",
          "values": [
            "1.731 € / mes",
            "27 años 0 m",
            "210.796 €",
            "26.311 €"
          ],
          "params": {
            "loan_amount": "350000",
            "interest_rate": "3.8",
            "loan_term": "30",
            "extra_payment": "100"
          }
        },
        {
          "label": "+250 € / mes",
          "values": [
            "1.881 € / mes",
            "23 años 6 m",
            "180.400 €",
            "56.706 €"
          ],
          "params": {
            "loan_amount": "350000",
            "interest_rate": "3.8",
            "loan_term": "30",
            "extra_payment": "250"
          }
        },
        {
          "label": "+500 € / mes",
          "values": [
            "2.131 € / mes",
            "19 años 5 m",
            "146.488 €",
            "90.618 €"
          ],
          "params": {
            "loan_amount": "350000",
            "interest_rate": "3.8",
            "loan_term": "30",
            "extra_payment": "500"
          }
        },
        {
          "label": "+1.000 € / mes",
          "values": [
            "2.631 € / mes",
            "14 años 5 m",
            "105.137 €",
            "131.969 €"
          ],
          "params": {
            "loan_amount": "350000",
            "interest_rate": "3.8",
            "loan_term": "30",
            "extra_payment": "1000"
          }
        }
      ],
      "fr": [
        {
          "label": "0 € (Base)",
          "values": [
            "1 631 € / mois",
            "30 ans 0 mois",
            "237 106 €",
            "0 €"
          ],
          "params": {
            "loan_amount": "350000",
            "interest_rate": "3.8",
            "loan_term": "30",
            "extra_payment": "0"
          }
        },
        {
          "label": "+100 € / mois",
          "values": [
            "1 731 € / mois",
            "27 ans 0 mois",
            "210 796 €",
            "26 311 €"
          ],
          "params": {
            "loan_amount": "350000",
            "interest_rate": "3.8",
            "loan_term": "30",
            "extra_payment": "100"
          }
        },
        {
          "label": "+250 € / mois",
          "values": [
            "1 881 € / mois",
            "23 ans 6 mois",
            "180 400 €",
            "56 706 €"
          ],
          "params": {
            "loan_amount": "350000",
            "interest_rate": "3.8",
            "loan_term": "30",
            "extra_payment": "250"
          }
        },
        {
          "label": "+500 € / mois",
          "values": [
            "2 131 € / mois",
            "19 ans 5 mois",
            "146 488 €",
            "90 618 €"
          ],
          "params": {
            "loan_amount": "350000",
            "interest_rate": "3.8",
            "loan_term": "30",
            "extra_payment": "500"
          }
        },
        {
          "label": "+1 000 € / mois",
          "values": [
            "2 631 € / mois",
            "14 ans 5 mois",
            "105 137 €",
            "131 969 €"
          ],
          "params": {
            "loan_amount": "350000",
            "interest_rate": "3.8",
            "loan_term": "30",
            "extra_payment": "1000"
          }
        }
      ],
      "de": [
        {
          "label": "0 € (Basis)",
          "values": [
            "1.631 € / Mon.",
            "30 J. 0 Mon.",
            "237.106 €",
            "0 €"
          ],
          "params": {
            "loan_amount": "350000",
            "interest_rate": "3.8",
            "loan_term": "30",
            "extra_payment": "0"
          }
        },
        {
          "label": "+100 € / Mon.",
          "values": [
            "1.731 € / Mon.",
            "27 J. 0 Mon.",
            "210.796 €",
            "26.311 €"
          ],
          "params": {
            "loan_amount": "350000",
            "interest_rate": "3.8",
            "loan_term": "30",
            "extra_payment": "100"
          }
        },
        {
          "label": "+250 € / Mon.",
          "values": [
            "1.881 € / Mon.",
            "23 J. 6 Mon.",
            "180.400 €",
            "56.706 €"
          ],
          "params": {
            "loan_amount": "350000",
            "interest_rate": "3.8",
            "loan_term": "30",
            "extra_payment": "250"
          }
        },
        {
          "label": "+500 € / Mon.",
          "values": [
            "2.131 € / Mon.",
            "19 J. 5 Mon.",
            "146.488 €",
            "90.618 €"
          ],
          "params": {
            "loan_amount": "350000",
            "interest_rate": "3.8",
            "loan_term": "30",
            "extra_payment": "500"
          }
        },
        {
          "label": "+1.000 € / Mon.",
          "values": [
            "2.631 € / Mon.",
            "14 J. 5 Mon.",
            "105.137 €",
            "131.969 €"
          ],
          "params": {
            "loan_amount": "350000",
            "interest_rate": "3.8",
            "loan_term": "30",
            "extra_payment": "1000"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "house-affordability-calculator"
    ],
    "title": "Home Affordability by Annual Gross Income (28% Rule, 6.5% APR)",
    "description": "Conservative home purchase price estimates using the 28% front-end housing ratio with 20% down payment and 20% allowance for taxes & insurance.",
    "headers": [
      "Annual Gross Income",
      "Max Housing Budget (28%)",
      "Est. Max Loan",
      "Target Home Price",
      "20% Down Cash"
    ],
    "translations": {
      "es": {
        "title": "Capacidad de Compra de Vivienda por Ingreso Anual (Regla del 28 %, 3,8 %)",
        "description": "Precio máximo recomendado de vivienda según ingresos brutos anuales aplicando la regla prudente del 28 % y 20 % de entrada.",
        "headers": [
          "Ingreso Bruto Anual",
          "Presupuesto Vivienda",
          "Hipoteca Máx.",
          "Precio Objetivo",
          "Entrada (20 %)"
        ]
      },
      "fr": {
        "title": "Capacité d’Achat Immobilier selon le Revenu Annuel (28 %, Taux 3,8 %)",
        "description": "Budget immobilier estimé à partir du revenu annuel brut avec un effort mensuel maîtrisé (28 %) et 20 % d’apport.",
        "headers": [
          "Revenu Brut Annuel",
          "Budget Mensuel (28 %)",
          "Emprunt Max.",
          "Prix Bien Cible",
          "Apport (20 %)"
        ]
      },
      "de": {
        "title": "Maximale Immobilienfinanzierung nach Jahreseinkommen (28-%-Regel, 3,8 %)",
        "description": "Solide Kaufpreis-Richtwerte auf Basis des Jahresbruttoeinkommens bei 28 % Wohnkostenquote und 20 % Eigenkapital.",
        "headers": [
          "Jahresbrutto",
          "Max. Wohnbudget",
          "Max. Darlehen",
          "Ziel-Kaufpreis",
          "20 % Eigenkapital"
        ]
      }
    },
    "rows": [
      {
        "label": "$60,000 / yr",
        "values": [
          "$1,400 / mo",
          "$177,196",
          "$221,495",
          "$44,299"
        ],
        "params": {
          "annual_income": "60000",
          "interest_rate": "6.5",
          "down_payment": "44299"
        }
      },
      {
        "label": "$90,000 / yr",
        "values": [
          "$2,100 / mo",
          "$265,794",
          "$332,243",
          "$66,449"
        ],
        "params": {
          "annual_income": "90000",
          "interest_rate": "6.5",
          "down_payment": "66449"
        }
      },
      {
        "label": "$120,000 / yr",
        "values": [
          "$2,800 / mo",
          "$354,392",
          "$442,990",
          "$88,598"
        ],
        "params": {
          "annual_income": "120000",
          "interest_rate": "6.5",
          "down_payment": "88598"
        }
      },
      {
        "label": "$160,000 / yr",
        "values": [
          "$3,733 / mo",
          "$472,523",
          "$590,654",
          "$118,131"
        ],
        "params": {
          "annual_income": "160000",
          "interest_rate": "6.5",
          "down_payment": "118131"
        }
      },
      {
        "label": "$220,000 / yr",
        "values": [
          "$5,133 / mo",
          "$649,719",
          "$812,149",
          "$162,430"
        ],
        "params": {
          "annual_income": "220000",
          "interest_rate": "6.5",
          "down_payment": "162430"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "60.000 € / año",
          "values": [
            "1.400 € / mes",
            "240.365 €",
            "300.457 €",
            "60.091 €"
          ],
          "params": {
            "annual_income": "60000",
            "interest_rate": "3.8",
            "down_payment": "60091"
          }
        },
        {
          "label": "90.000 € / año",
          "values": [
            "2.100 € / mes",
            "360.548 €",
            "450.685 €",
            "90.137 €"
          ],
          "params": {
            "annual_income": "90000",
            "interest_rate": "3.8",
            "down_payment": "90137"
          }
        },
        {
          "label": "120.000 € / año",
          "values": [
            "2.800 € / mes",
            "480.731 €",
            "600.913 €",
            "120.183 €"
          ],
          "params": {
            "annual_income": "120000",
            "interest_rate": "3.8",
            "down_payment": "120183"
          }
        },
        {
          "label": "160.000 € / año",
          "values": [
            "3.733 € / mes",
            "640.974 €",
            "801.218 €",
            "160.244 €"
          ],
          "params": {
            "annual_income": "160000",
            "interest_rate": "3.8",
            "down_payment": "160244"
          }
        },
        {
          "label": "220.000 € / año",
          "values": [
            "5.133 € / mes",
            "881.340 €",
            "1.101.675 €",
            "220.335 €"
          ],
          "params": {
            "annual_income": "220000",
            "interest_rate": "3.8",
            "down_payment": "220335"
          }
        }
      ],
      "fr": [
        {
          "label": "60 000 € / an",
          "values": [
            "1 400 € / mois",
            "240 365 €",
            "300 457 €",
            "60 091 €"
          ],
          "params": {
            "annual_income": "60000",
            "interest_rate": "3.8",
            "down_payment": "60091"
          }
        },
        {
          "label": "90 000 € / an",
          "values": [
            "2 100 € / mois",
            "360 548 €",
            "450 685 €",
            "90 137 €"
          ],
          "params": {
            "annual_income": "90000",
            "interest_rate": "3.8",
            "down_payment": "90137"
          }
        },
        {
          "label": "120 000 € / an",
          "values": [
            "2 800 € / mois",
            "480 731 €",
            "600 913 €",
            "120 183 €"
          ],
          "params": {
            "annual_income": "120000",
            "interest_rate": "3.8",
            "down_payment": "120183"
          }
        },
        {
          "label": "160 000 € / an",
          "values": [
            "3 733 € / mois",
            "640 974 €",
            "801 218 €",
            "160 244 €"
          ],
          "params": {
            "annual_income": "160000",
            "interest_rate": "3.8",
            "down_payment": "160244"
          }
        },
        {
          "label": "220 000 € / an",
          "values": [
            "5 133 € / mois",
            "881 340 €",
            "1 101 675 €",
            "220 335 €"
          ],
          "params": {
            "annual_income": "220000",
            "interest_rate": "3.8",
            "down_payment": "220335"
          }
        }
      ],
      "de": [
        {
          "label": "60.000 € / Jahr",
          "values": [
            "1.400 € / Mon.",
            "240.365 €",
            "300.457 €",
            "60.091 €"
          ],
          "params": {
            "annual_income": "60000",
            "interest_rate": "3.8",
            "down_payment": "60091"
          }
        },
        {
          "label": "90.000 € / Jahr",
          "values": [
            "2.100 € / Mon.",
            "360.548 €",
            "450.685 €",
            "90.137 €"
          ],
          "params": {
            "annual_income": "90000",
            "interest_rate": "3.8",
            "down_payment": "90137"
          }
        },
        {
          "label": "120.000 € / Jahr",
          "values": [
            "2.800 € / Mon.",
            "480.731 €",
            "600.913 €",
            "120.183 €"
          ],
          "params": {
            "annual_income": "120000",
            "interest_rate": "3.8",
            "down_payment": "120183"
          }
        },
        {
          "label": "160.000 € / Jahr",
          "values": [
            "3.733 € / Mon.",
            "640.974 €",
            "801.218 €",
            "160.244 €"
          ],
          "params": {
            "annual_income": "160000",
            "interest_rate": "3.8",
            "down_payment": "160244"
          }
        },
        {
          "label": "220.000 € / Jahr",
          "values": [
            "5.133 € / Mon.",
            "881.340 €",
            "1.101.675 €",
            "220.335 €"
          ],
          "params": {
            "annual_income": "220000",
            "interest_rate": "3.8",
            "down_payment": "220335"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "auto-loan-calculator",
      "used-car-loan-calculator",
      "new-car-loan-calculator",
      "motorcycle-loan-calculator",
      "rv-loan-calculator",
      "boat-loan-calculator"
    ],
    "title": "Auto Loan Monthly Payment Schedule (6.0% APR)",
    "description": "Monthly vehicle payments across 36, 48, 60, and 72-month terms at 6.0% APR for common car, motorcycle, RV, and boat balances.",
    "headers": [
      "Financed Amount",
      "36 Months (3 Yr)",
      "48 Months (4 Yr)",
      "60 Months (5 Yr)",
      "72 Months (6 Yr)"
    ],
    "translations": {
      "es": {
        "title": "Tabla de Cuotas de Préstamo de Vehículo (5,5 % TAE)",
        "description": "Cuotas mensuales para financiación de coche, moto o barco en plazos de 36 a 72 meses al 5,5 %.",
        "headers": [
          "Importe Financiado",
          "36 Meses (3 Años)",
          "48 Meses (4 Años)",
          "60 Meses (5 Años)",
          "72 Meses (6 Años)"
        ]
      },
      "fr": {
        "title": "Barème des Mensualités de Crédit Auto / Véhicule (5,5 % TAEG)",
        "description": "Mensualités estimées sur 36, 48, 60 et 72 mois à 5,5 % pour le financement d’une voiture, moto ou bateau.",
        "headers": [
          "Montant Financé",
          "36 Mois (3 Ans)",
          "48 Mois (4 Ans)",
          "60 Mois (5 Ans)",
          "72 Mois (6 Ans)"
        ]
      },
      "de": {
        "title": "Monatlicher Ratenplan für Autokredite (5,5 % Effektivzins)",
        "description": "Geschätzte Monatsraten für Fahrzeugfinanzierungen über 36, 48, 60 und 72 Monate bei 5,5 % Jahreszins.",
        "headers": [
          "Kreditbetrag",
          "36 Monate (3 J.)",
          "48 Monate (4 J.)",
          "60 Monate (5 J.)",
          "72 Monate (6 J.)"
        ]
      }
    },
    "rows": [
      {
        "label": "$15,000",
        "values": [
          "$456 / mo",
          "$352 / mo",
          "$290 / mo",
          "$249 / mo"
        ],
        "params": {
          "vehicle_price": "18000",
          "down_payment": "3000",
          "loan_amount": "15000",
          "interest_rate": "6",
          "loan_term_months": "60"
        }
      },
      {
        "label": "$25,000",
        "values": [
          "$761 / mo",
          "$587 / mo",
          "$483 / mo",
          "$414 / mo"
        ],
        "params": {
          "vehicle_price": "30000",
          "down_payment": "5000",
          "loan_amount": "25000",
          "interest_rate": "6",
          "loan_term_months": "60"
        }
      },
      {
        "label": "$35,000",
        "values": [
          "$1,065 / mo",
          "$822 / mo",
          "$677 / mo",
          "$580 / mo"
        ],
        "params": {
          "vehicle_price": "42000",
          "down_payment": "7000",
          "loan_amount": "35000",
          "interest_rate": "6",
          "loan_term_months": "60"
        }
      },
      {
        "label": "$50,000",
        "values": [
          "$1,521 / mo",
          "$1,174 / mo",
          "$967 / mo",
          "$829 / mo"
        ],
        "params": {
          "vehicle_price": "60000",
          "down_payment": "10000",
          "loan_amount": "50000",
          "interest_rate": "6",
          "loan_term_months": "60"
        }
      },
      {
        "label": "$65,000",
        "values": [
          "$1,977 / mo",
          "$1,527 / mo",
          "$1,257 / mo",
          "$1,077 / mo"
        ],
        "params": {
          "vehicle_price": "78000",
          "down_payment": "13000",
          "loan_amount": "65000",
          "interest_rate": "6",
          "loan_term_months": "60"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "15.000 €",
          "values": [
            "453 € / mes",
            "349 € / mes",
            "287 € / mes",
            "245 € / mes"
          ],
          "params": {
            "vehicle_price": "18000",
            "down_payment": "3000",
            "loan_amount": "15000",
            "interest_rate": "5.5",
            "loan_term_months": "60"
          }
        },
        {
          "label": "25.000 €",
          "values": [
            "755 € / mes",
            "581 € / mes",
            "478 € / mes",
            "408 € / mes"
          ],
          "params": {
            "vehicle_price": "30000",
            "down_payment": "5000",
            "loan_amount": "25000",
            "interest_rate": "5.5",
            "loan_term_months": "60"
          }
        },
        {
          "label": "35.000 €",
          "values": [
            "1.057 € / mes",
            "814 € / mes",
            "669 € / mes",
            "572 € / mes"
          ],
          "params": {
            "vehicle_price": "42000",
            "down_payment": "7000",
            "loan_amount": "35000",
            "interest_rate": "5.5",
            "loan_term_months": "60"
          }
        },
        {
          "label": "50.000 €",
          "values": [
            "1.510 € / mes",
            "1.163 € / mes",
            "955 € / mes",
            "817 € / mes"
          ],
          "params": {
            "vehicle_price": "60000",
            "down_payment": "10000",
            "loan_amount": "50000",
            "interest_rate": "5.5",
            "loan_term_months": "60"
          }
        },
        {
          "label": "65.000 €",
          "values": [
            "1.963 € / mes",
            "1.512 € / mes",
            "1.242 € / mes",
            "1.062 € / mes"
          ],
          "params": {
            "vehicle_price": "78000",
            "down_payment": "13000",
            "loan_amount": "65000",
            "interest_rate": "5.5",
            "loan_term_months": "60"
          }
        }
      ],
      "fr": [
        {
          "label": "15 000 €",
          "values": [
            "453 € / mois",
            "349 € / mois",
            "287 € / mois",
            "245 € / mois"
          ],
          "params": {
            "vehicle_price": "18000",
            "down_payment": "3000",
            "loan_amount": "15000",
            "interest_rate": "5.5",
            "loan_term_months": "60"
          }
        },
        {
          "label": "25 000 €",
          "values": [
            "755 € / mois",
            "581 € / mois",
            "478 € / mois",
            "408 € / mois"
          ],
          "params": {
            "vehicle_price": "30000",
            "down_payment": "5000",
            "loan_amount": "25000",
            "interest_rate": "5.5",
            "loan_term_months": "60"
          }
        },
        {
          "label": "35 000 €",
          "values": [
            "1 057 € / mois",
            "814 € / mois",
            "669 € / mois",
            "572 € / mois"
          ],
          "params": {
            "vehicle_price": "42000",
            "down_payment": "7000",
            "loan_amount": "35000",
            "interest_rate": "5.5",
            "loan_term_months": "60"
          }
        },
        {
          "label": "50 000 €",
          "values": [
            "1 510 € / mois",
            "1 163 € / mois",
            "955 € / mois",
            "817 € / mois"
          ],
          "params": {
            "vehicle_price": "60000",
            "down_payment": "10000",
            "loan_amount": "50000",
            "interest_rate": "5.5",
            "loan_term_months": "60"
          }
        },
        {
          "label": "65 000 €",
          "values": [
            "1 963 € / mois",
            "1 512 € / mois",
            "1 242 € / mois",
            "1 062 € / mois"
          ],
          "params": {
            "vehicle_price": "78000",
            "down_payment": "13000",
            "loan_amount": "65000",
            "interest_rate": "5.5",
            "loan_term_months": "60"
          }
        }
      ],
      "de": [
        {
          "label": "15.000 €",
          "values": [
            "453 € / Mon.",
            "349 € / Mon.",
            "287 € / Mon.",
            "245 € / Mon."
          ],
          "params": {
            "vehicle_price": "18000",
            "down_payment": "3000",
            "loan_amount": "15000",
            "interest_rate": "5.5",
            "loan_term_months": "60"
          }
        },
        {
          "label": "25.000 €",
          "values": [
            "755 € / Mon.",
            "581 € / Mon.",
            "478 € / Mon.",
            "408 € / Mon."
          ],
          "params": {
            "vehicle_price": "30000",
            "down_payment": "5000",
            "loan_amount": "25000",
            "interest_rate": "5.5",
            "loan_term_months": "60"
          }
        },
        {
          "label": "35.000 €",
          "values": [
            "1.057 € / Mon.",
            "814 € / Mon.",
            "669 € / Mon.",
            "572 € / Mon."
          ],
          "params": {
            "vehicle_price": "42000",
            "down_payment": "7000",
            "loan_amount": "35000",
            "interest_rate": "5.5",
            "loan_term_months": "60"
          }
        },
        {
          "label": "50.000 €",
          "values": [
            "1.510 € / Mon.",
            "1.163 € / Mon.",
            "955 € / Mon.",
            "817 € / Mon."
          ],
          "params": {
            "vehicle_price": "60000",
            "down_payment": "10000",
            "loan_amount": "50000",
            "interest_rate": "5.5",
            "loan_term_months": "60"
          }
        },
        {
          "label": "65.000 €",
          "values": [
            "1.963 € / Mon.",
            "1.512 € / Mon.",
            "1.242 € / Mon.",
            "1.062 € / Mon."
          ],
          "params": {
            "vehicle_price": "78000",
            "down_payment": "13000",
            "loan_amount": "65000",
            "interest_rate": "5.5",
            "loan_term_months": "60"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "lease-calculator"
    ],
    "title": "Car Lease Monthly Payment Reference (0.0025 Money Factor / 6.0% APR)",
    "description": "Estimated pre-tax monthly lease payments across 24, 36, and 48-month terms assuming standard 65%/58%/48% residual values and $0 cap cost reduction.",
    "headers": [
      "Vehicle MSRP",
      "36-Mo Residual (58%)",
      "24-Mo Lease",
      "36-Mo Lease",
      "48-Mo Lease"
    ],
    "translations": {
      "es": {
        "title": "Tabla de Cuotas de Leasing de Vehículo (6,0 % Equivalente)",
        "description": "Estimación de cuotas mensuales antes de impuestos a 24, 36 y 48 meses con valores residuales estándar del 65 %/58 %/48 %.",
        "headers": [
          "Precio Vehículo",
          "Valor Residual (36 m)",
          "Leasing 24 Meses",
          "Leasing 36 Meses",
          "Leasing 48 Meses"
        ]
      },
      "fr": {
        "title": "Tableau des Loyers de Leasing Auto LOA (Équivalent 6,0 %)",
        "description": "Loyers mensuels estimés sans apport sur 24, 36 et 48 mois avec valeurs résiduelles de 65 %, 58 % et 48 %.",
        "headers": [
          "Prix Catalogue",
          "Option d’Achat (36 m)",
          "LOA 24 Mois",
          "LOA 36 Mois",
          "LOA 48 Mois"
        ]
      },
      "de": {
        "title": "Auto-Leasingraten-Übersicht (6,0 % Effektivzins, 0 € Anzahlung)",
        "description": "Monatliche Netto-Leasingraten über 24, 36 und 48 Monate bei typischen Restwerten von 65 %, 58 % und 48 %.",
        "headers": [
          "Listenpreis",
          "Restwert (36 Mon.)",
          "24 Monate",
          "36 Monate",
          "48 Monate"
        ]
      }
    },
    "rows": [
      {
        "label": "$28,000",
        "values": [
          "$16,240",
          "$524 / mo",
          "$437 / mo",
          "$407 / mo"
        ],
        "params": {
          "vehicle_price": "28000",
          "residual_value": "16240",
          "lease_term": "36"
        }
      },
      {
        "label": "$36,000",
        "values": [
          "$20,880",
          "$674 / mo",
          "$562 / mo",
          "$523 / mo"
        ],
        "params": {
          "vehicle_price": "36000",
          "residual_value": "20880",
          "lease_term": "36"
        }
      },
      {
        "label": "$45,000",
        "values": [
          "$26,100",
          "$842 / mo",
          "$703 / mo",
          "$654 / mo"
        ],
        "params": {
          "vehicle_price": "45000",
          "residual_value": "26100",
          "lease_term": "36"
        }
      },
      {
        "label": "$60,000",
        "values": [
          "$34,800",
          "$1,123 / mo",
          "$937 / mo",
          "$872 / mo"
        ],
        "params": {
          "vehicle_price": "60000",
          "residual_value": "34800",
          "lease_term": "36"
        }
      },
      {
        "label": "$80,000",
        "values": [
          "$46,400",
          "$1,497 / mo",
          "$1,249 / mo",
          "$1,163 / mo"
        ],
        "params": {
          "vehicle_price": "80000",
          "residual_value": "46400",
          "lease_term": "36"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "28.000 €",
          "values": [
            "16.240 €",
            "524 € / mes",
            "437 € / mes",
            "407 € / mes"
          ],
          "params": {
            "vehicle_price": "28000",
            "residual_value": "16240",
            "lease_term": "36"
          }
        },
        {
          "label": "36.000 €",
          "values": [
            "20.880 €",
            "674 € / mes",
            "562 € / mes",
            "523 € / mes"
          ],
          "params": {
            "vehicle_price": "36000",
            "residual_value": "20880",
            "lease_term": "36"
          }
        },
        {
          "label": "45.000 €",
          "values": [
            "26.100 €",
            "842 € / mes",
            "703 € / mes",
            "654 € / mes"
          ],
          "params": {
            "vehicle_price": "45000",
            "residual_value": "26100",
            "lease_term": "36"
          }
        },
        {
          "label": "60.000 €",
          "values": [
            "34.800 €",
            "1.123 € / mes",
            "937 € / mes",
            "872 € / mes"
          ],
          "params": {
            "vehicle_price": "60000",
            "residual_value": "34800",
            "lease_term": "36"
          }
        },
        {
          "label": "80.000 €",
          "values": [
            "46.400 €",
            "1.497 € / mes",
            "1.249 € / mes",
            "1.163 € / mes"
          ],
          "params": {
            "vehicle_price": "80000",
            "residual_value": "46400",
            "lease_term": "36"
          }
        }
      ],
      "fr": [
        {
          "label": "28 000 €",
          "values": [
            "16 240 €",
            "524 € / mois",
            "437 € / mois",
            "407 € / mois"
          ],
          "params": {
            "vehicle_price": "28000",
            "residual_value": "16240",
            "lease_term": "36"
          }
        },
        {
          "label": "36 000 €",
          "values": [
            "20 880 €",
            "674 € / mois",
            "562 € / mois",
            "523 € / mois"
          ],
          "params": {
            "vehicle_price": "36000",
            "residual_value": "20880",
            "lease_term": "36"
          }
        },
        {
          "label": "45 000 €",
          "values": [
            "26 100 €",
            "842 € / mois",
            "703 € / mois",
            "654 € / mois"
          ],
          "params": {
            "vehicle_price": "45000",
            "residual_value": "26100",
            "lease_term": "36"
          }
        },
        {
          "label": "60 000 €",
          "values": [
            "34 800 €",
            "1 123 € / mois",
            "937 € / mois",
            "872 € / mois"
          ],
          "params": {
            "vehicle_price": "60000",
            "residual_value": "34800",
            "lease_term": "36"
          }
        },
        {
          "label": "80 000 €",
          "values": [
            "46 400 €",
            "1 497 € / mois",
            "1 249 € / mois",
            "1 163 € / mois"
          ],
          "params": {
            "vehicle_price": "80000",
            "residual_value": "46400",
            "lease_term": "36"
          }
        }
      ],
      "de": [
        {
          "label": "28.000 €",
          "values": [
            "16.240 €",
            "524 € / Mon.",
            "437 € / Mon.",
            "407 € / Mon."
          ],
          "params": {
            "vehicle_price": "28000",
            "residual_value": "16240",
            "lease_term": "36"
          }
        },
        {
          "label": "36.000 €",
          "values": [
            "20.880 €",
            "674 € / Mon.",
            "562 € / Mon.",
            "523 € / Mon."
          ],
          "params": {
            "vehicle_price": "36000",
            "residual_value": "20880",
            "lease_term": "36"
          }
        },
        {
          "label": "45.000 €",
          "values": [
            "26.100 €",
            "842 € / Mon.",
            "703 € / Mon.",
            "654 € / Mon."
          ],
          "params": {
            "vehicle_price": "45000",
            "residual_value": "26100",
            "lease_term": "36"
          }
        },
        {
          "label": "60.000 €",
          "values": [
            "34.800 €",
            "1.123 € / Mon.",
            "937 € / Mon.",
            "872 € / Mon."
          ],
          "params": {
            "vehicle_price": "60000",
            "residual_value": "34800",
            "lease_term": "36"
          }
        },
        {
          "label": "80.000 €",
          "values": [
            "46.400 €",
            "1.497 € / Mon.",
            "1.249 € / Mon.",
            "1.163 € / Mon."
          ],
          "params": {
            "vehicle_price": "80000",
            "residual_value": "46400",
            "lease_term": "36"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "loan-calculator",
      "personal-loan-calculator",
      "business-loan-calculator",
      "heloc-calculator"
    ],
    "title": "Personal & Business Loan Payment Schedule (9.5% APR)",
    "description": "Monthly fixed installments for 3, 5, and 7-year installment loans at 9.5% APR along with total 5-year interest expense.",
    "headers": [
      "Loan Principal",
      "3-Year Monthly",
      "5-Year Monthly",
      "7-Year Monthly",
      "5-Year Total Interest"
    ],
    "translations": {
      "es": {
        "title": "Tabla de Cuotas de Préstamo Personal y Empresarial (7,2 % TAE)",
        "description": "Cuotas mensuales fijas a 3, 5 y 7 años al 7,2 % junto con el coste total de intereses a 5 años.",
        "headers": [
          "Importe Solicitado",
          "Cuota 3 Años",
          "Cuota 5 Años",
          "Cuota 7 Años",
          "Interés Total (5 Años)"
        ]
      },
      "fr": {
        "title": "Barème de Prêt Personnel et Professionnel (7,2 % TAEG)",
        "description": "Mensualités fixes sur 3, 5 et 7 ans à 7,2 % ainsi que le coût total des intérêts sur 5 ans.",
        "headers": [
          "Montant du Prêt",
          "Mensualité 3 Ans",
          "Mensualité 5 Ans",
          "Mensualité 7 Ans",
          "Intérêts (5 Ans)"
        ]
      },
      "de": {
        "title": "Ratenkredit- & Firmenkredit-Übersicht (7,2 % Effektivzins)",
        "description": "Monatsraten für 3-, 5- und 7-jährige Ratenkredite bei 7,2 % effektivem Jahreszins inklusive Gesamtzinskosten über 5 Jahre.",
        "headers": [
          "Kreditsumme",
          "Rate (3 J.)",
          "Rate (5 J.)",
          "Rate (7 J.)",
          "Gesamtzins (5 J.)"
        ]
      }
    },
    "rows": [
      {
        "label": "$10,000",
        "values": [
          "$320 / mo",
          "$210 / mo",
          "$163 / mo",
          "$2,601"
        ],
        "params": {
          "loan_amount": "10000",
          "interest_rate": "9.5",
          "loan_term": "5"
        }
      },
      {
        "label": "$25,000",
        "values": [
          "$801 / mo",
          "$525 / mo",
          "$409 / mo",
          "$6,503"
        ],
        "params": {
          "loan_amount": "25000",
          "interest_rate": "9.5",
          "loan_term": "5"
        }
      },
      {
        "label": "$50,000",
        "values": [
          "$1,602 / mo",
          "$1,050 / mo",
          "$817 / mo",
          "$13,006"
        ],
        "params": {
          "loan_amount": "50000",
          "interest_rate": "9.5",
          "loan_term": "5"
        }
      },
      {
        "label": "$100,000",
        "values": [
          "$3,203 / mo",
          "$2,100 / mo",
          "$1,634 / mo",
          "$26,011"
        ],
        "params": {
          "loan_amount": "100000",
          "interest_rate": "9.5",
          "loan_term": "5"
        }
      },
      {
        "label": "$200,000",
        "values": [
          "$6,407 / mo",
          "$4,200 / mo",
          "$3,269 / mo",
          "$52,022"
        ],
        "params": {
          "loan_amount": "200000",
          "interest_rate": "9.5",
          "loan_term": "5"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "10.000 €",
          "values": [
            "310 € / mes",
            "199 € / mes",
            "152 € / mes",
            "1.937 €"
          ],
          "params": {
            "loan_amount": "10000",
            "interest_rate": "7.2",
            "loan_term": "5"
          }
        },
        {
          "label": "25.000 €",
          "values": [
            "774 € / mes",
            "497 € / mes",
            "380 € / mes",
            "4.844 €"
          ],
          "params": {
            "loan_amount": "25000",
            "interest_rate": "7.2",
            "loan_term": "5"
          }
        },
        {
          "label": "50.000 €",
          "values": [
            "1.548 € / mes",
            "995 € / mes",
            "760 € / mes",
            "9.687 €"
          ],
          "params": {
            "loan_amount": "50000",
            "interest_rate": "7.2",
            "loan_term": "5"
          }
        },
        {
          "label": "100.000 €",
          "values": [
            "3.097 € / mes",
            "1.990 € / mes",
            "1.519 € / mes",
            "19.374 €"
          ],
          "params": {
            "loan_amount": "100000",
            "interest_rate": "7.2",
            "loan_term": "5"
          }
        },
        {
          "label": "200.000 €",
          "values": [
            "6.194 € / mes",
            "3.979 € / mes",
            "3.038 € / mes",
            "38.748 €"
          ],
          "params": {
            "loan_amount": "200000",
            "interest_rate": "7.2",
            "loan_term": "5"
          }
        }
      ],
      "fr": [
        {
          "label": "10 000 €",
          "values": [
            "310 € / mois",
            "199 € / mois",
            "152 € / mois",
            "1 937 €"
          ],
          "params": {
            "loan_amount": "10000",
            "interest_rate": "7.2",
            "loan_term": "5"
          }
        },
        {
          "label": "25 000 €",
          "values": [
            "774 € / mois",
            "497 € / mois",
            "380 € / mois",
            "4 844 €"
          ],
          "params": {
            "loan_amount": "25000",
            "interest_rate": "7.2",
            "loan_term": "5"
          }
        },
        {
          "label": "50 000 €",
          "values": [
            "1 548 € / mois",
            "995 € / mois",
            "760 € / mois",
            "9 687 €"
          ],
          "params": {
            "loan_amount": "50000",
            "interest_rate": "7.2",
            "loan_term": "5"
          }
        },
        {
          "label": "100 000 €",
          "values": [
            "3 097 € / mois",
            "1 990 € / mois",
            "1 519 € / mois",
            "19 374 €"
          ],
          "params": {
            "loan_amount": "100000",
            "interest_rate": "7.2",
            "loan_term": "5"
          }
        },
        {
          "label": "200 000 €",
          "values": [
            "6 194 € / mois",
            "3 979 € / mois",
            "3 038 € / mois",
            "38 748 €"
          ],
          "params": {
            "loan_amount": "200000",
            "interest_rate": "7.2",
            "loan_term": "5"
          }
        }
      ],
      "de": [
        {
          "label": "10.000 €",
          "values": [
            "310 € / Mon.",
            "199 € / Mon.",
            "152 € / Mon.",
            "1.937 €"
          ],
          "params": {
            "loan_amount": "10000",
            "interest_rate": "7.2",
            "loan_term": "5"
          }
        },
        {
          "label": "25.000 €",
          "values": [
            "774 € / Mon.",
            "497 € / Mon.",
            "380 € / Mon.",
            "4.844 €"
          ],
          "params": {
            "loan_amount": "25000",
            "interest_rate": "7.2",
            "loan_term": "5"
          }
        },
        {
          "label": "50.000 €",
          "values": [
            "1.548 € / Mon.",
            "995 € / Mon.",
            "760 € / Mon.",
            "9.687 €"
          ],
          "params": {
            "loan_amount": "50000",
            "interest_rate": "7.2",
            "loan_term": "5"
          }
        },
        {
          "label": "100.000 €",
          "values": [
            "3.097 € / Mon.",
            "1.990 € / Mon.",
            "1.519 € / Mon.",
            "19.374 €"
          ],
          "params": {
            "loan_amount": "100000",
            "interest_rate": "7.2",
            "loan_term": "5"
          }
        },
        {
          "label": "200.000 €",
          "values": [
            "6.194 € / Mon.",
            "3.979 € / Mon.",
            "3.038 € / Mon.",
            "38.748 €"
          ],
          "params": {
            "loan_amount": "200000",
            "interest_rate": "7.2",
            "loan_term": "5"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "student-loan-calculator",
      "college-cost-calculator"
    ],
    "title": "Student Loan Repayment Schedule (6.53% Federal Rate)",
    "description": "Compare 10-year Standard, 15-year, and 20-year Extended student loan monthly payments and 10-year total interest cost.",
    "headers": [
      "Student Debt Balance",
      "10-Yr Standard",
      "10-Yr Interest",
      "15-Yr Monthly",
      "20-Yr Extended"
    ],
    "translations": {
      "es": {
        "title": "Plan de Amortización de Préstamo Estudiantil (4,5 % Anual)",
        "description": "Compare cuotas mensuales en plazos de 10, 15 y 20 años e intereses totales a 10 años.",
        "headers": [
          "Saldo Educativo",
          "Cuota 10 Años",
          "Interés 10 Años",
          "Cuota 15 Años",
          "Cuota 20 Años"
        ]
      },
      "fr": {
        "title": "Tableau de Remboursement de Prêt Étudiant (Taux 4,5 %)",
        "description": "Comparez les mensualités sur 10, 15 et 20 ans ainsi que le coût des intérêts sur 10 ans.",
        "headers": [
          "Capital Emprunté",
          "Mensualité 10 Ans",
          "Intérêts 10 Ans",
          "Mensualité 15 Ans",
          "Mensualité 20 Ans"
        ]
      },
      "de": {
        "title": "Studienkredit-Rückzahlungsplan (4,5 % Jahreszins)",
        "description": "Vergleich der monatlichen Rückzahlungsraten über 10, 15 und 20 Jahre samt Zinskosten bei 10 Jahren Laufzeit.",
        "headers": [
          "Darlehensstand",
          "Rate (10 J.)",
          "Zinsen (10 J.)",
          "Rate (15 J.)",
          "Rate (20 J.)"
        ]
      }
    },
    "rows": [
      {
        "label": "$20,000",
        "values": [
          "$227 / mo",
          "$7,288",
          "$175 / mo",
          "$149 / mo"
        ],
        "params": {
          "loan_amount": "20000",
          "interest_rate": "6.53",
          "loan_term": "10"
        }
      },
      {
        "label": "$35,000",
        "values": [
          "$398 / mo",
          "$12,754",
          "$305 / mo",
          "$262 / mo"
        ],
        "params": {
          "loan_amount": "35000",
          "interest_rate": "6.53",
          "loan_term": "10"
        }
      },
      {
        "label": "$50,000",
        "values": [
          "$569 / mo",
          "$18,220",
          "$436 / mo",
          "$374 / mo"
        ],
        "params": {
          "loan_amount": "50000",
          "interest_rate": "6.53",
          "loan_term": "10"
        }
      },
      {
        "label": "$75,000",
        "values": [
          "$853 / mo",
          "$27,331",
          "$655 / mo",
          "$561 / mo"
        ],
        "params": {
          "loan_amount": "75000",
          "interest_rate": "6.53",
          "loan_term": "10"
        }
      },
      {
        "label": "$120,000",
        "values": [
          "$1,364 / mo",
          "$43,729",
          "$1,047 / mo",
          "$897 / mo"
        ],
        "params": {
          "loan_amount": "120000",
          "interest_rate": "6.53",
          "loan_term": "10"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "20.000 €",
          "values": [
            "207 € / mes",
            "4.873 €",
            "153 € / mes",
            "127 € / mes"
          ],
          "params": {
            "loan_amount": "20000",
            "interest_rate": "4.5",
            "loan_term": "10"
          }
        },
        {
          "label": "35.000 €",
          "values": [
            "363 € / mes",
            "8.528 €",
            "268 € / mes",
            "221 € / mes"
          ],
          "params": {
            "loan_amount": "35000",
            "interest_rate": "4.5",
            "loan_term": "10"
          }
        },
        {
          "label": "50.000 €",
          "values": [
            "518 € / mes",
            "12.183 €",
            "382 € / mes",
            "316 € / mes"
          ],
          "params": {
            "loan_amount": "50000",
            "interest_rate": "4.5",
            "loan_term": "10"
          }
        },
        {
          "label": "75.000 €",
          "values": [
            "777 € / mes",
            "18.275 €",
            "574 € / mes",
            "474 € / mes"
          ],
          "params": {
            "loan_amount": "75000",
            "interest_rate": "4.5",
            "loan_term": "10"
          }
        },
        {
          "label": "120.000 €",
          "values": [
            "1.244 € / mes",
            "29.239 €",
            "918 € / mes",
            "759 € / mes"
          ],
          "params": {
            "loan_amount": "120000",
            "interest_rate": "4.5",
            "loan_term": "10"
          }
        }
      ],
      "fr": [
        {
          "label": "20 000 €",
          "values": [
            "207 € / mois",
            "4 873 €",
            "153 € / mois",
            "127 € / mois"
          ],
          "params": {
            "loan_amount": "20000",
            "interest_rate": "4.5",
            "loan_term": "10"
          }
        },
        {
          "label": "35 000 €",
          "values": [
            "363 € / mois",
            "8 528 €",
            "268 € / mois",
            "221 € / mois"
          ],
          "params": {
            "loan_amount": "35000",
            "interest_rate": "4.5",
            "loan_term": "10"
          }
        },
        {
          "label": "50 000 €",
          "values": [
            "518 € / mois",
            "12 183 €",
            "382 € / mois",
            "316 € / mois"
          ],
          "params": {
            "loan_amount": "50000",
            "interest_rate": "4.5",
            "loan_term": "10"
          }
        },
        {
          "label": "75 000 €",
          "values": [
            "777 € / mois",
            "18 275 €",
            "574 € / mois",
            "474 € / mois"
          ],
          "params": {
            "loan_amount": "75000",
            "interest_rate": "4.5",
            "loan_term": "10"
          }
        },
        {
          "label": "120 000 €",
          "values": [
            "1 244 € / mois",
            "29 239 €",
            "918 € / mois",
            "759 € / mois"
          ],
          "params": {
            "loan_amount": "120000",
            "interest_rate": "4.5",
            "loan_term": "10"
          }
        }
      ],
      "de": [
        {
          "label": "20.000 €",
          "values": [
            "207 € / Mon.",
            "4.873 €",
            "153 € / Mon.",
            "127 € / Mon."
          ],
          "params": {
            "loan_amount": "20000",
            "interest_rate": "4.5",
            "loan_term": "10"
          }
        },
        {
          "label": "35.000 €",
          "values": [
            "363 € / Mon.",
            "8.528 €",
            "268 € / Mon.",
            "221 € / Mon."
          ],
          "params": {
            "loan_amount": "35000",
            "interest_rate": "4.5",
            "loan_term": "10"
          }
        },
        {
          "label": "50.000 €",
          "values": [
            "518 € / Mon.",
            "12.183 €",
            "382 € / Mon.",
            "316 € / Mon."
          ],
          "params": {
            "loan_amount": "50000",
            "interest_rate": "4.5",
            "loan_term": "10"
          }
        },
        {
          "label": "75.000 €",
          "values": [
            "777 € / Mon.",
            "18.275 €",
            "574 € / Mon.",
            "474 € / Mon."
          ],
          "params": {
            "loan_amount": "75000",
            "interest_rate": "4.5",
            "loan_term": "10"
          }
        },
        {
          "label": "120.000 €",
          "values": [
            "1.244 € / Mon.",
            "29.239 €",
            "918 € / Mon.",
            "759 € / Mon."
          ],
          "params": {
            "loan_amount": "120000",
            "interest_rate": "4.5",
            "loan_term": "10"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "debt-payoff-calculator",
      "credit-cards-payoff",
      "credit-card-minimum-payment-calculator",
      "debt-consolidation-calculator"
    ],
    "title": "Credit Card Minimum Payment Trap vs. 24-Month Payoff (22% APR)",
    "description": "Compare paying a 2.5% monthly minimum against an aggressive 24-month payoff plan at 22% APR to see total interest avoided.",
    "headers": [
      "Card Balance",
      "2.5% Min Pay & Term",
      "Min-Pay Interest",
      "24-Mo Payoff Plan",
      "24-Mo Interest"
    ],
    "translations": {
      "es": {
        "title": "Trampa del Pago Mínimo vs. Plan a 24 Meses en Tarjetas (18 % TAE)",
        "description": "Compare pagar un mínimo del 2,5 % mensual frente a liquidar la deuda en 24 meses al 18 % TAE.",
        "headers": [
          "Saldo Tarjeta",
          "Pago 2,5 % y Plazo",
          "Interés Mínimo",
          "Plan 24 Meses",
          "Interés 24 Meses"
        ]
      },
      "fr": {
        "title": "Piège du Paiement Minimum vs Solde en 24 Mois (18 % TAEG)",
        "description": "Comparez un remboursement minimum de 2,5 %/mois à un plan accéléré sur 24 mois à 18 % TAEG.",
        "headers": [
          "Solde Carte",
          "Minimum 2,5 % & Durée",
          "Intérêts Min.",
          "Plan 24 Mois",
          "Intérêts 24 Mois"
        ]
      },
      "de": {
        "title": "Kreditkarten-Mindestrate vs. 24-Monats-Tilgung (18 % Effektivzins)",
        "description": "Vergleich zwischen 2,5 % Mindestrate und konsequenter Tilgung innerhalb von 24 Monaten bei 18 % Zins.",
        "headers": [
          "Kartensaldo",
          "2,5 % Rate & Dauer",
          "Zinskosten Min.",
          "24-Mon.-Rate",
          "Zinskosten 24 Mon."
        ]
      }
    },
    "rows": [
      {
        "label": "$3,000",
        "values": [
          "$75 (73 mo)",
          "$2,475",
          "$156 / mo",
          "$744"
        ],
        "params": {
          "balance": "3000",
          "interest_rate": "22",
          "monthly_payment": "156"
        }
      },
      {
        "label": "$5,000",
        "values": [
          "$125 (73 mo)",
          "$4,125",
          "$259 / mo",
          "$1,216"
        ],
        "params": {
          "balance": "5000",
          "interest_rate": "22",
          "monthly_payment": "259"
        }
      },
      {
        "label": "$10,000",
        "values": [
          "$250 (73 mo)",
          "$8,250",
          "$519 / mo",
          "$2,456"
        ],
        "params": {
          "balance": "10000",
          "interest_rate": "22",
          "monthly_payment": "519"
        }
      },
      {
        "label": "$15,000",
        "values": [
          "$375 (73 mo)",
          "$12,375",
          "$778 / mo",
          "$3,672"
        ],
        "params": {
          "balance": "15000",
          "interest_rate": "22",
          "monthly_payment": "778"
        }
      },
      {
        "label": "$25,000",
        "values": [
          "$625 (73 mo)",
          "$20,625",
          "$1,297 / mo",
          "$6,128"
        ],
        "params": {
          "balance": "25000",
          "interest_rate": "22",
          "monthly_payment": "1297"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "3.000 €",
          "values": [
            "75 € (62 meses)",
            "1.650 €",
            "150 € / mes",
            "600 €"
          ],
          "params": {
            "balance": "3000",
            "interest_rate": "18",
            "monthly_payment": "150"
          }
        },
        {
          "label": "5.000 €",
          "values": [
            "125 € (62 meses)",
            "2.750 €",
            "250 € / mes",
            "1.000 €"
          ],
          "params": {
            "balance": "5000",
            "interest_rate": "18",
            "monthly_payment": "250"
          }
        },
        {
          "label": "10.000 €",
          "values": [
            "250 € (62 meses)",
            "5.500 €",
            "499 € / mes",
            "1.976 €"
          ],
          "params": {
            "balance": "10000",
            "interest_rate": "18",
            "monthly_payment": "499"
          }
        },
        {
          "label": "15.000 €",
          "values": [
            "375 € (62 meses)",
            "8.250 €",
            "749 € / mes",
            "2.976 €"
          ],
          "params": {
            "balance": "15000",
            "interest_rate": "18",
            "monthly_payment": "749"
          }
        },
        {
          "label": "25.000 €",
          "values": [
            "625 € (62 meses)",
            "13.750 €",
            "1.248 € / mes",
            "4.952 €"
          ],
          "params": {
            "balance": "25000",
            "interest_rate": "18",
            "monthly_payment": "1248"
          }
        }
      ],
      "fr": [
        {
          "label": "3 000 €",
          "values": [
            "75 € (62 mois)",
            "1 650 €",
            "150 € / mois",
            "600 €"
          ],
          "params": {
            "balance": "3000",
            "interest_rate": "18",
            "monthly_payment": "150"
          }
        },
        {
          "label": "5 000 €",
          "values": [
            "125 € (62 mois)",
            "2 750 €",
            "250 € / mois",
            "1 000 €"
          ],
          "params": {
            "balance": "5000",
            "interest_rate": "18",
            "monthly_payment": "250"
          }
        },
        {
          "label": "10 000 €",
          "values": [
            "250 € (62 mois)",
            "5 500 €",
            "499 € / mois",
            "1 976 €"
          ],
          "params": {
            "balance": "10000",
            "interest_rate": "18",
            "monthly_payment": "499"
          }
        },
        {
          "label": "15 000 €",
          "values": [
            "375 € (62 mois)",
            "8 250 €",
            "749 € / mois",
            "2 976 €"
          ],
          "params": {
            "balance": "15000",
            "interest_rate": "18",
            "monthly_payment": "749"
          }
        },
        {
          "label": "25 000 €",
          "values": [
            "625 € (62 mois)",
            "13 750 €",
            "1 248 € / mois",
            "4 952 €"
          ],
          "params": {
            "balance": "25000",
            "interest_rate": "18",
            "monthly_payment": "1248"
          }
        }
      ],
      "de": [
        {
          "label": "3.000 €",
          "values": [
            "75 € (62 Mon.)",
            "1.650 €",
            "150 € / Mon.",
            "600 €"
          ],
          "params": {
            "balance": "3000",
            "interest_rate": "18",
            "monthly_payment": "150"
          }
        },
        {
          "label": "5.000 €",
          "values": [
            "125 € (62 Mon.)",
            "2.750 €",
            "250 € / Mon.",
            "1.000 €"
          ],
          "params": {
            "balance": "5000",
            "interest_rate": "18",
            "monthly_payment": "250"
          }
        },
        {
          "label": "10.000 €",
          "values": [
            "250 € (62 Mon.)",
            "5.500 €",
            "499 € / Mon.",
            "1.976 €"
          ],
          "params": {
            "balance": "10000",
            "interest_rate": "18",
            "monthly_payment": "499"
          }
        },
        {
          "label": "15.000 €",
          "values": [
            "375 € (62 Mon.)",
            "8.250 €",
            "749 € / Mon.",
            "2.976 €"
          ],
          "params": {
            "balance": "15000",
            "interest_rate": "18",
            "monthly_payment": "749"
          }
        },
        {
          "label": "25.000 €",
          "values": [
            "625 € (62 Mon.)",
            "13.750 €",
            "1.248 € / Mon.",
            "4.952 €"
          ],
          "params": {
            "balance": "25000",
            "interest_rate": "18",
            "monthly_payment": "1248"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "debt-to-income-ratio-calculator"
    ],
    "title": "Debt-to-Income (DTI) Lending Benchmark Matrix",
    "description": "Maximum monthly recurring debt limits across Excellent (<20%), Manageable (20–35%), Conventional Cap (36–43%), and High-Risk (>43%) DTI tiers.",
    "headers": [
      "Gross Monthly Income",
      "Excellent (<20%)",
      "Manageable (20–35%)",
      "Lending Cap (36–43%)",
      "High Risk (>43%)"
    ],
    "translations": {
      "es": {
        "title": "Tabla de Referencia de Ratio Deuda-Ingresos (DTI)",
        "description": "Límites máximos de cuotas mensuales de deuda según el ingreso mensual bruto para aprobación hipotecaria.",
        "headers": [
          "Ingreso Mensual Bruto",
          "Excelente (<20 %)",
          "Saludable (20–35 %)",
          "Límite Bancario (36–43 %)",
          "Riesgo Alto (>43 %)"
        ]
      },
      "fr": {
        "title": "Tableau de Référence du Taux d’Endettement (DTI / HCSF)",
        "description": "Plafonds de mensualités cumulées selon le revenu mensuel brut (seuil HCSF recommandé : 35 %).",
        "headers": [
          "Revenu Mensuel Brut",
          "Excellent (<20 %)",
          "Maîtrisé (20–35 %)",
          "Plafond Toléré (36–43 %)",
          "Risque Élevé (>43 %)"
        ]
      },
      "de": {
        "title": "Referenztabelle zum Schulden-Einkommens-Verhältnis (DTI)",
        "description": "Maximal tragbare monatliche Kreditraten in Abhängigkeit vom Bruttoeinkommen für Banken-Bonitätsprüfungen.",
        "headers": [
          "Monatl. Bruttoeinkommen",
          "Sehr gut (<20 %)",
          "Solide (20–35 %)",
          "Kreditgrenze (36–43 %)",
          "Hohes Risiko (>43 %)"
        ]
      }
    },
    "rows": [
      {
        "label": "$4,000 / mo",
        "values": [
          "<$800",
          "$800 – $1,400",
          "$1,440 – $1,720",
          ">$1,720"
        ],
        "params": {
          "monthly_income": "4000",
          "monthly_debt": "1200"
        }
      },
      {
        "label": "$6,000 / mo",
        "values": [
          "<$1,200",
          "$1,200 – $2,100",
          "$2,160 – $2,580",
          ">$2,580"
        ],
        "params": {
          "monthly_income": "6000",
          "monthly_debt": "1800"
        }
      },
      {
        "label": "$8,000 / mo",
        "values": [
          "<$1,600",
          "$1,600 – $2,800",
          "$2,880 – $3,440",
          ">$3,440"
        ],
        "params": {
          "monthly_income": "8000",
          "monthly_debt": "2400"
        }
      },
      {
        "label": "$10,000 / mo",
        "values": [
          "<$2,000",
          "$2,000 – $3,500",
          "$3,600 – $4,300",
          ">$4,300"
        ],
        "params": {
          "monthly_income": "10000",
          "monthly_debt": "3000"
        }
      },
      {
        "label": "$14,000 / mo",
        "values": [
          "<$2,800",
          "$2,800 – $4,900",
          "$5,040 – $6,020",
          ">$6,020"
        ],
        "params": {
          "monthly_income": "14000",
          "monthly_debt": "4200"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "4.000 € / mes",
          "values": [
            "<800 €",
            "800 € – 1.400 €",
            "1.440 € – 1.720 €",
            ">1.720 €"
          ],
          "params": {
            "monthly_income": "4000",
            "monthly_debt": "1200"
          }
        },
        {
          "label": "6.000 € / mes",
          "values": [
            "<1.200 €",
            "1.200 € – 2.100 €",
            "2.160 € – 2.580 €",
            ">2.580 €"
          ],
          "params": {
            "monthly_income": "6000",
            "monthly_debt": "1800"
          }
        },
        {
          "label": "8.000 € / mes",
          "values": [
            "<1.600 €",
            "1.600 € – 2.800 €",
            "2.880 € – 3.440 €",
            ">3.440 €"
          ],
          "params": {
            "monthly_income": "8000",
            "monthly_debt": "2400"
          }
        },
        {
          "label": "10.000 € / mes",
          "values": [
            "<2.000 €",
            "2.000 € – 3.500 €",
            "3.600 € – 4.300 €",
            ">4.300 €"
          ],
          "params": {
            "monthly_income": "10000",
            "monthly_debt": "3000"
          }
        },
        {
          "label": "14.000 € / mes",
          "values": [
            "<2.800 €",
            "2.800 € – 4.900 €",
            "5.040 € – 6.020 €",
            ">6.020 €"
          ],
          "params": {
            "monthly_income": "14000",
            "monthly_debt": "4200"
          }
        }
      ],
      "fr": [
        {
          "label": "4 000 € / mois",
          "values": [
            "<800 €",
            "800 € – 1 400 €",
            "1 440 € – 1 720 €",
            ">1 720 €"
          ],
          "params": {
            "monthly_income": "4000",
            "monthly_debt": "1200"
          }
        },
        {
          "label": "6 000 € / mois",
          "values": [
            "<1 200 €",
            "1 200 € – 2 100 €",
            "2 160 € – 2 580 €",
            ">2 580 €"
          ],
          "params": {
            "monthly_income": "6000",
            "monthly_debt": "1800"
          }
        },
        {
          "label": "8 000 € / mois",
          "values": [
            "<1 600 €",
            "1 600 € – 2 800 €",
            "2 880 € – 3 440 €",
            ">3 440 €"
          ],
          "params": {
            "monthly_income": "8000",
            "monthly_debt": "2400"
          }
        },
        {
          "label": "10 000 € / mois",
          "values": [
            "<2 000 €",
            "2 000 € – 3 500 €",
            "3 600 € – 4 300 €",
            ">4 300 €"
          ],
          "params": {
            "monthly_income": "10000",
            "monthly_debt": "3000"
          }
        },
        {
          "label": "14 000 € / mois",
          "values": [
            "<2 800 €",
            "2 800 € – 4 900 €",
            "5 040 € – 6 020 €",
            ">6 020 €"
          ],
          "params": {
            "monthly_income": "14000",
            "monthly_debt": "4200"
          }
        }
      ],
      "de": [
        {
          "label": "4.000 € / Mon.",
          "values": [
            "<800 €",
            "800 € – 1.400 €",
            "1.440 € – 1.720 €",
            ">1.720 €"
          ],
          "params": {
            "monthly_income": "4000",
            "monthly_debt": "1200"
          }
        },
        {
          "label": "6.000 € / Mon.",
          "values": [
            "<1.200 €",
            "1.200 € – 2.100 €",
            "2.160 € – 2.580 €",
            ">2.580 €"
          ],
          "params": {
            "monthly_income": "6000",
            "monthly_debt": "1800"
          }
        },
        {
          "label": "8.000 € / Mon.",
          "values": [
            "<1.600 €",
            "1.600 € – 2.800 €",
            "2.880 € – 3.440 €",
            ">3.440 €"
          ],
          "params": {
            "monthly_income": "8000",
            "monthly_debt": "2400"
          }
        },
        {
          "label": "10.000 € / Mon.",
          "values": [
            "<2.000 €",
            "2.000 € – 3.500 €",
            "3.600 € – 4.300 €",
            ">4.300 €"
          ],
          "params": {
            "monthly_income": "10000",
            "monthly_debt": "3000"
          }
        },
        {
          "label": "14.000 € / Mon.",
          "values": [
            "<2.800 €",
            "2.800 € – 4.900 €",
            "5.040 € – 6.020 €",
            ">6.020 €"
          ],
          "params": {
            "monthly_income": "14000",
            "monthly_debt": "4200"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "compound-interest-calculator",
      "investment-calculator",
      "future-value-calculator",
      "average-return-calculator",
      "finance-calculator",
      "s-and-p-500-calculator",
      "dividend-reinvestment-calculator",
      "mutual-fund-calculator"
    ],
    "title": "Compound Interest & Equity Growth Matrix (8.0% Annual Return)",
    "description": "Projected portfolio value over 5, 10, 20, and 30 years at an 8.0% annualized return with annual compounding and zero additional deposits.",
    "headers": [
      "Starting Deposit",
      "After 5 Years",
      "After 10 Years",
      "After 20 Years",
      "After 30 Years"
    ],
    "translations": {
      "es": {
        "title": "Tabla de Crecimiento de Interés Compuesto (8,0 % Anual)",
        "description": "Valor futuro proyectado a 5, 10, 20 y 30 años con un rendimiento compuesto anual del 8,0 % sin aportaciones extra.",
        "headers": [
          "Capital Inicial",
          "Tras 5 Años",
          "Tras 10 Años",
          "Tras 20 Años",
          "Tras 30 Años"
        ]
      },
      "fr": {
        "title": "Tableau de Croissance des Intérêts Composés (8,0 % par An)",
        "description": "Valeur future projetée sur 5, 10, 20 et 30 ans à un rendement annuel composé de 8,0 %.",
        "headers": [
          "Capital Initial",
          "Après 5 Ans",
          "Après 10 Ans",
          "Après 20 Ans",
          "Après 30 Ans"
        ]
      },
      "de": {
        "title": "Zinseszins- & ETF-Wachstumstabelle (8,0 % Jahresrendite)",
        "description": "Prognostizierter Depotwert nach 5, 10, 20 und 30 Jahren bei 8,0 % jährlicher Rendite und Wiederanlage.",
        "headers": [
          "Anfangskapital",
          "Nach 5 Jahren",
          "Nach 10 Jahren",
          "Nach 20 Jahren",
          "Nach 30 Jahren"
        ]
      }
    },
    "rows": [
      {
        "label": "$5,000",
        "values": [
          "$7,347",
          "$10,795",
          "$23,305",
          "$50,313"
        ],
        "params": {
          "initial_deposit": "5000",
          "annual_addition": "0",
          "interest_rate": "8.0",
          "years": "20"
        }
      },
      {
        "label": "$10,000",
        "values": [
          "$14,693",
          "$21,589",
          "$46,610",
          "$100,627"
        ],
        "params": {
          "initial_deposit": "10000",
          "annual_addition": "0",
          "interest_rate": "8.0",
          "years": "20"
        }
      },
      {
        "label": "$25,000",
        "values": [
          "$36,733",
          "$53,973",
          "$116,524",
          "$251,566"
        ],
        "params": {
          "initial_deposit": "25000",
          "annual_addition": "0",
          "interest_rate": "8.0",
          "years": "20"
        }
      },
      {
        "label": "$50,000",
        "values": [
          "$73,466",
          "$107,946",
          "$233,048",
          "$503,133"
        ],
        "params": {
          "initial_deposit": "50000",
          "annual_addition": "0",
          "interest_rate": "8.0",
          "years": "20"
        }
      },
      {
        "label": "$100,000",
        "values": [
          "$146,933",
          "$215,892",
          "$466,096",
          "$1,006,266"
        ],
        "params": {
          "initial_deposit": "100000",
          "annual_addition": "0",
          "interest_rate": "8.0",
          "years": "20"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "5.000 €",
          "values": [
            "7.347 €",
            "10.795 €",
            "23.305 €",
            "50.313 €"
          ],
          "params": {
            "initial_deposit": "5000",
            "annual_addition": "0",
            "interest_rate": "8.0",
            "years": "20"
          }
        },
        {
          "label": "10.000 €",
          "values": [
            "14.693 €",
            "21.589 €",
            "46.610 €",
            "100.627 €"
          ],
          "params": {
            "initial_deposit": "10000",
            "annual_addition": "0",
            "interest_rate": "8.0",
            "years": "20"
          }
        },
        {
          "label": "25.000 €",
          "values": [
            "36.733 €",
            "53.973 €",
            "116.524 €",
            "251.566 €"
          ],
          "params": {
            "initial_deposit": "25000",
            "annual_addition": "0",
            "interest_rate": "8.0",
            "years": "20"
          }
        },
        {
          "label": "50.000 €",
          "values": [
            "73.466 €",
            "107.946 €",
            "233.048 €",
            "503.133 €"
          ],
          "params": {
            "initial_deposit": "50000",
            "annual_addition": "0",
            "interest_rate": "8.0",
            "years": "20"
          }
        },
        {
          "label": "100.000 €",
          "values": [
            "146.933 €",
            "215.892 €",
            "466.096 €",
            "1.006.266 €"
          ],
          "params": {
            "initial_deposit": "100000",
            "annual_addition": "0",
            "interest_rate": "8.0",
            "years": "20"
          }
        }
      ],
      "fr": [
        {
          "label": "5 000 €",
          "values": [
            "7 347 €",
            "10 795 €",
            "23 305 €",
            "50 313 €"
          ],
          "params": {
            "initial_deposit": "5000",
            "annual_addition": "0",
            "interest_rate": "8.0",
            "years": "20"
          }
        },
        {
          "label": "10 000 €",
          "values": [
            "14 693 €",
            "21 589 €",
            "46 610 €",
            "100 627 €"
          ],
          "params": {
            "initial_deposit": "10000",
            "annual_addition": "0",
            "interest_rate": "8.0",
            "years": "20"
          }
        },
        {
          "label": "25 000 €",
          "values": [
            "36 733 €",
            "53 973 €",
            "116 524 €",
            "251 566 €"
          ],
          "params": {
            "initial_deposit": "25000",
            "annual_addition": "0",
            "interest_rate": "8.0",
            "years": "20"
          }
        },
        {
          "label": "50 000 €",
          "values": [
            "73 466 €",
            "107 946 €",
            "233 048 €",
            "503 133 €"
          ],
          "params": {
            "initial_deposit": "50000",
            "annual_addition": "0",
            "interest_rate": "8.0",
            "years": "20"
          }
        },
        {
          "label": "100 000 €",
          "values": [
            "146 933 €",
            "215 892 €",
            "466 096 €",
            "1 006 266 €"
          ],
          "params": {
            "initial_deposit": "100000",
            "annual_addition": "0",
            "interest_rate": "8.0",
            "years": "20"
          }
        }
      ],
      "de": [
        {
          "label": "5.000 €",
          "values": [
            "7.347 €",
            "10.795 €",
            "23.305 €",
            "50.313 €"
          ],
          "params": {
            "initial_deposit": "5000",
            "annual_addition": "0",
            "interest_rate": "8.0",
            "years": "20"
          }
        },
        {
          "label": "10.000 €",
          "values": [
            "14.693 €",
            "21.589 €",
            "46.610 €",
            "100.627 €"
          ],
          "params": {
            "initial_deposit": "10000",
            "annual_addition": "0",
            "interest_rate": "8.0",
            "years": "20"
          }
        },
        {
          "label": "25.000 €",
          "values": [
            "36.733 €",
            "53.973 €",
            "116.524 €",
            "251.566 €"
          ],
          "params": {
            "initial_deposit": "25000",
            "annual_addition": "0",
            "interest_rate": "8.0",
            "years": "20"
          }
        },
        {
          "label": "50.000 €",
          "values": [
            "73.466 €",
            "107.946 €",
            "233.048 €",
            "503.133 €"
          ],
          "params": {
            "initial_deposit": "50000",
            "annual_addition": "0",
            "interest_rate": "8.0",
            "years": "20"
          }
        },
        {
          "label": "100.000 €",
          "values": [
            "146.933 €",
            "215.892 €",
            "466.096 €",
            "1.006.266 €"
          ],
          "params": {
            "initial_deposit": "100000",
            "annual_addition": "0",
            "interest_rate": "8.0",
            "years": "20"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "savings-calculator",
      "cd-calculator",
      "high-yield-savings-calculator",
      "certificate-of-deposit-calculator"
    ],
    "title": "High-Yield Savings & CD Interest Matrix (4.5% APY, Monthly Compounding)",
    "description": "Guaranteed cash interest earned in Year 1 plus ending balances after 1, 3, and 5 years at 4.5% APY.",
    "headers": [
      "Deposit Balance",
      "Year 1 Interest",
      "1-Year Balance",
      "3-Year Balance",
      "5-Year Balance"
    ],
    "translations": {
      "es": {
        "title": "Rendimiento de Cuenta Remunerada y Depósito a Plazo (3,25 % TAE)",
        "description": "Intereses del primer año y saldo acumulado tras 1, 3 y 5 años con capitalización mensual al 3,25 %.",
        "headers": [
          "Saldo Depositado",
          "Interés Año 1",
          "Saldo a 1 Año",
          "Saldo a 3 Años",
          "Saldo a 5 Años"
        ]
      },
      "fr": {
        "title": "Tableau de Rendement Livret & Compte à Terme (3,25 % Annuel)",
        "description": "Intérêts générés la 1re année et capital final après 1, 3 et 5 ans à un taux de 3,25 %.",
        "headers": [
          "Capital Placé",
          "Intérêts An 1",
          "Solde à 1 An",
          "Solde à 3 Ans",
          "Solde à 5 Ans"
        ]
      },
      "de": {
        "title": "Tagesgeld- & Festgeld-Zinstabelle (3,25 % p.a.)",
        "description": "Zinsertrag im ersten Jahr sowie Endguthaben nach 1, 3 und 5 Jahren bei 3,25 % Jahreszins.",
        "headers": [
          "Anlagebetrag",
          "Zinsen Jahr 1",
          "Stand nach 1 J.",
          "Stand nach 3 J.",
          "Stand nach 5 J."
        ]
      }
    },
    "rows": [
      {
        "label": "$5,000",
        "values": [
          "$230",
          "$5,230",
          "$5,721",
          "$6,259"
        ],
        "params": {
          "initial_deposit": "5000",
          "interest_rate": "4.5",
          "years": "5"
        }
      },
      {
        "label": "$10,000",
        "values": [
          "$459",
          "$10,459",
          "$11,442",
          "$12,518"
        ],
        "params": {
          "initial_deposit": "10000",
          "interest_rate": "4.5",
          "years": "5"
        }
      },
      {
        "label": "$25,000",
        "values": [
          "$1,148",
          "$26,148",
          "$28,606",
          "$31,295"
        ],
        "params": {
          "initial_deposit": "25000",
          "interest_rate": "4.5",
          "years": "5"
        }
      },
      {
        "label": "$50,000",
        "values": [
          "$2,297",
          "$52,297",
          "$57,212",
          "$62,590"
        ],
        "params": {
          "initial_deposit": "50000",
          "interest_rate": "4.5",
          "years": "5"
        }
      },
      {
        "label": "$100,000",
        "values": [
          "$4,594",
          "$104,594",
          "$114,425",
          "$125,180"
        ],
        "params": {
          "initial_deposit": "100000",
          "interest_rate": "4.5",
          "years": "5"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "5.000 €",
          "values": [
            "165 €",
            "5.165 €",
            "5.511 €",
            "5.881 €"
          ],
          "params": {
            "initial_deposit": "5000",
            "interest_rate": "3.25",
            "years": "5"
          }
        },
        {
          "label": "10.000 €",
          "values": [
            "330 €",
            "10.330 €",
            "11.023 €",
            "11.762 €"
          ],
          "params": {
            "initial_deposit": "10000",
            "interest_rate": "3.25",
            "years": "5"
          }
        },
        {
          "label": "25.000 €",
          "values": [
            "825 €",
            "25.825 €",
            "27.557 €",
            "29.405 €"
          ],
          "params": {
            "initial_deposit": "25000",
            "interest_rate": "3.25",
            "years": "5"
          }
        },
        {
          "label": "50.000 €",
          "values": [
            "1.649 €",
            "51.649 €",
            "55.113 €",
            "58.809 €"
          ],
          "params": {
            "initial_deposit": "50000",
            "interest_rate": "3.25",
            "years": "5"
          }
        },
        {
          "label": "100.000 €",
          "values": [
            "3.299 €",
            "103.299 €",
            "110.227 €",
            "117.619 €"
          ],
          "params": {
            "initial_deposit": "100000",
            "interest_rate": "3.25",
            "years": "5"
          }
        }
      ],
      "fr": [
        {
          "label": "5 000 €",
          "values": [
            "165 €",
            "5 165 €",
            "5 511 €",
            "5 881 €"
          ],
          "params": {
            "initial_deposit": "5000",
            "interest_rate": "3.25",
            "years": "5"
          }
        },
        {
          "label": "10 000 €",
          "values": [
            "330 €",
            "10 330 €",
            "11 023 €",
            "11 762 €"
          ],
          "params": {
            "initial_deposit": "10000",
            "interest_rate": "3.25",
            "years": "5"
          }
        },
        {
          "label": "25 000 €",
          "values": [
            "825 €",
            "25 825 €",
            "27 557 €",
            "29 405 €"
          ],
          "params": {
            "initial_deposit": "25000",
            "interest_rate": "3.25",
            "years": "5"
          }
        },
        {
          "label": "50 000 €",
          "values": [
            "1 649 €",
            "51 649 €",
            "55 113 €",
            "58 809 €"
          ],
          "params": {
            "initial_deposit": "50000",
            "interest_rate": "3.25",
            "years": "5"
          }
        },
        {
          "label": "100 000 €",
          "values": [
            "3 299 €",
            "103 299 €",
            "110 227 €",
            "117 619 €"
          ],
          "params": {
            "initial_deposit": "100000",
            "interest_rate": "3.25",
            "years": "5"
          }
        }
      ],
      "de": [
        {
          "label": "5.000 €",
          "values": [
            "165 €",
            "5.165 €",
            "5.511 €",
            "5.881 €"
          ],
          "params": {
            "initial_deposit": "5000",
            "interest_rate": "3.25",
            "years": "5"
          }
        },
        {
          "label": "10.000 €",
          "values": [
            "330 €",
            "10.330 €",
            "11.023 €",
            "11.762 €"
          ],
          "params": {
            "initial_deposit": "10000",
            "interest_rate": "3.25",
            "years": "5"
          }
        },
        {
          "label": "25.000 €",
          "values": [
            "825 €",
            "25.825 €",
            "27.557 €",
            "29.405 €"
          ],
          "params": {
            "initial_deposit": "25000",
            "interest_rate": "3.25",
            "years": "5"
          }
        },
        {
          "label": "50.000 €",
          "values": [
            "1.649 €",
            "51.649 €",
            "55.113 €",
            "58.809 €"
          ],
          "params": {
            "initial_deposit": "50000",
            "interest_rate": "3.25",
            "years": "5"
          }
        },
        {
          "label": "100.000 €",
          "values": [
            "3.299 €",
            "103.299 €",
            "110.227 €",
            "117.619 €"
          ],
          "params": {
            "initial_deposit": "100000",
            "interest_rate": "3.25",
            "years": "5"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "simple-interest-calculator",
      "interest-calculator",
      "interest-rate-calculator"
    ],
    "title": "Simple vs. Compound Interest Comparison ($10,000 at 7.0%)",
    "description": "See how monthly compounding pulls ahead of linear simple interest on a $10,000 principal at 7.0% APR over 5 to 30 years.",
    "headers": [
      "Horizon",
      "Simple Interest Earned",
      "Simple Total",
      "Compound Total (Monthly)",
      "Compounding Advantage"
    ],
    "translations": {
      "es": {
        "title": "Interés Simple vs. Interés Compuesto (10.000 € al 7,0 %)",
        "description": "Diferencia acumulada entre el interés lineal y la capitalización mensual sobre 10.000 € al 7,0 %.",
        "headers": [
          "Horizonte",
          "Interés Simple",
          "Total Simple",
          "Total Compuesto",
          "Ventaja Compuesta"
        ]
      },
      "fr": {
        "title": "Intérêts Simples vs Intérêts Composés (10 000 € à 7,0 %)",
        "description": "Écart de capital entre intérêts simples et capitalisation mensuelle sur 10 000 € placés à 7,0 %.",
        "headers": [
          "Horizon",
          "Intérêts Simples",
          "Total Simple",
          "Total Composé",
          "Gain Capitalisation"
        ]
      },
      "de": {
        "title": "Einfache Zinsen vs. Zinseszins-Effekt (10.000 € bei 7,0 %)",
        "description": "Direkter Vergleich von linearem Zins und monatlichem Zinseszins für 10.000 € Startkapital über 5 bis 30 Jahre.",
        "headers": [
          "Laufzeit",
          "Einfache Zinsen",
          "Endwert Einfach",
          "Endwert Zinseszins",
          "Zinseszins-Vorteil"
        ]
      }
    },
    "rows": [
      {
        "label": "5 Years",
        "values": [
          "$3,500",
          "$13,500",
          "$14,176",
          "+$676"
        ],
        "params": {
          "principal": "10000",
          "interest_rate": "7.0",
          "years": "5"
        }
      },
      {
        "label": "10 Years",
        "values": [
          "$7,000",
          "$17,000",
          "$20,097",
          "+$3,097"
        ],
        "params": {
          "principal": "10000",
          "interest_rate": "7.0",
          "years": "10"
        }
      },
      {
        "label": "15 Years",
        "values": [
          "$10,500",
          "$20,500",
          "$28,489",
          "+$7,989"
        ],
        "params": {
          "principal": "10000",
          "interest_rate": "7.0",
          "years": "15"
        }
      },
      {
        "label": "20 Years",
        "values": [
          "$14,000",
          "$24,000",
          "$40,387",
          "+$16,387"
        ],
        "params": {
          "principal": "10000",
          "interest_rate": "7.0",
          "years": "20"
        }
      },
      {
        "label": "30 Years",
        "values": [
          "$21,000",
          "$31,000",
          "$81,165",
          "+$50,165"
        ],
        "params": {
          "principal": "10000",
          "interest_rate": "7.0",
          "years": "30"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "5 Años",
          "values": [
            "3.500 €",
            "13.500 €",
            "14.176 €",
            "+676 €"
          ],
          "params": {
            "principal": "10000",
            "interest_rate": "7.0",
            "years": "5"
          }
        },
        {
          "label": "10 Años",
          "values": [
            "7.000 €",
            "17.000 €",
            "20.097 €",
            "+3.097 €"
          ],
          "params": {
            "principal": "10000",
            "interest_rate": "7.0",
            "years": "10"
          }
        },
        {
          "label": "15 Años",
          "values": [
            "10.500 €",
            "20.500 €",
            "28.489 €",
            "+7.989 €"
          ],
          "params": {
            "principal": "10000",
            "interest_rate": "7.0",
            "years": "15"
          }
        },
        {
          "label": "20 Años",
          "values": [
            "14.000 €",
            "24.000 €",
            "40.387 €",
            "+16.387 €"
          ],
          "params": {
            "principal": "10000",
            "interest_rate": "7.0",
            "years": "20"
          }
        },
        {
          "label": "30 Años",
          "values": [
            "21.000 €",
            "31.000 €",
            "81.165 €",
            "+50.165 €"
          ],
          "params": {
            "principal": "10000",
            "interest_rate": "7.0",
            "years": "30"
          }
        }
      ],
      "fr": [
        {
          "label": "5 Ans",
          "values": [
            "3 500 €",
            "13 500 €",
            "14 176 €",
            "+676 €"
          ],
          "params": {
            "principal": "10000",
            "interest_rate": "7.0",
            "years": "5"
          }
        },
        {
          "label": "10 Ans",
          "values": [
            "7 000 €",
            "17 000 €",
            "20 097 €",
            "+3 097 €"
          ],
          "params": {
            "principal": "10000",
            "interest_rate": "7.0",
            "years": "10"
          }
        },
        {
          "label": "15 Ans",
          "values": [
            "10 500 €",
            "20 500 €",
            "28 489 €",
            "+7 989 €"
          ],
          "params": {
            "principal": "10000",
            "interest_rate": "7.0",
            "years": "15"
          }
        },
        {
          "label": "20 Ans",
          "values": [
            "14 000 €",
            "24 000 €",
            "40 387 €",
            "+16 387 €"
          ],
          "params": {
            "principal": "10000",
            "interest_rate": "7.0",
            "years": "20"
          }
        },
        {
          "label": "30 Ans",
          "values": [
            "21 000 €",
            "31 000 €",
            "81 165 €",
            "+50 165 €"
          ],
          "params": {
            "principal": "10000",
            "interest_rate": "7.0",
            "years": "30"
          }
        }
      ],
      "de": [
        {
          "label": "5 Jahre",
          "values": [
            "3.500 €",
            "13.500 €",
            "14.176 €",
            "+676 €"
          ],
          "params": {
            "principal": "10000",
            "interest_rate": "7.0",
            "years": "5"
          }
        },
        {
          "label": "10 Jahre",
          "values": [
            "7.000 €",
            "17.000 €",
            "20.097 €",
            "+3.097 €"
          ],
          "params": {
            "principal": "10000",
            "interest_rate": "7.0",
            "years": "10"
          }
        },
        {
          "label": "15 Jahre",
          "values": [
            "10.500 €",
            "20.500 €",
            "28.489 €",
            "+7.989 €"
          ],
          "params": {
            "principal": "10000",
            "interest_rate": "7.0",
            "years": "15"
          }
        },
        {
          "label": "20 Jahre",
          "values": [
            "14.000 €",
            "24.000 €",
            "40.387 €",
            "+16.387 €"
          ],
          "params": {
            "principal": "10000",
            "interest_rate": "7.0",
            "years": "20"
          }
        },
        {
          "label": "30 Jahre",
          "values": [
            "21.000 €",
            "31.000 €",
            "81.165 €",
            "+50.165 €"
          ],
          "params": {
            "principal": "10000",
            "interest_rate": "7.0",
            "years": "30"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "401k-calculator",
      "401k-growth-calculator",
      "roth-ira-calculator",
      "retirement-calculator"
    ],
    "title": "Retirement & 401(k) Nest Egg by Monthly Contribution (7.0% Real Return)",
    "description": "Inflation-adjusted retirement savings projected across 10, 20, 30, and 35 years starting from $0 at a 7.0% compounded annual return.",
    "headers": [
      "Monthly Savings",
      "After 10 Years",
      "After 20 Years",
      "After 30 Years",
      "After 35 Years"
    ],
    "translations": {
      "es": {
        "title": "Crecimiento del Fondo de Jubilación por Ahorro Mensual (7,0 % Real)",
        "description": "Capital proyectado a 10, 20, 30 y 35 años partiendo de 0 € con un rendimiento real compuesto del 7,0 %.",
        "headers": [
          "Ahorro Mensual",
          "Tras 10 Años",
          "Tras 20 Años",
          "Tras 30 Años",
          "Tras 35 Años"
        ]
      },
      "fr": {
        "title": "Capital Retraite Projeté par Épargne Mensuelle (7,0 % Réel)",
        "description": "Épargne retraite cumulée après 10, 20, 30 et 35 ans en partant de 0 € à un rendement réel de 7,0 %.",
        "headers": [
          "Épargne Mensuelle",
          "Après 10 Ans",
          "Après 20 Ans",
          "Après 30 Ans",
          "Après 35 Ans"
        ]
      },
      "de": {
        "title": "Altersvorsorge- & Sparplan-Vermögen nach Monatsrate (7,0 % p.a.)",
        "description": "Vermögensaufbau nach 10, 20, 30 und 35 Jahren bei monatlicher Sparrate und 7,0 % realer Jahresrendite.",
        "headers": [
          "Monatl. Sparrate",
          "Nach 10 Jahren",
          "Nach 20 Jahren",
          "Nach 30 Jahren",
          "Nach 35 Jahren"
        ]
      }
    },
    "rows": [
      {
        "label": "$300 / mo",
        "values": [
          "$51,925",
          "$156,278",
          "$365,991",
          "$540,316"
        ],
        "params": {
          "monthly_contribution": "300",
          "interest_rate": "7.0",
          "years": "30"
        }
      },
      {
        "label": "$500 / mo",
        "values": [
          "$86,542",
          "$260,463",
          "$609,985",
          "$900,527"
        ],
        "params": {
          "monthly_contribution": "500",
          "interest_rate": "7.0",
          "years": "30"
        }
      },
      {
        "label": "$1,000 / mo",
        "values": [
          "$173,085",
          "$520,927",
          "$1,219,971",
          "$1,801,055"
        ],
        "params": {
          "monthly_contribution": "1000",
          "interest_rate": "7.0",
          "years": "30"
        }
      },
      {
        "label": "$1,500 / mo",
        "values": [
          "$259,627",
          "$781,390",
          "$1,829,956",
          "$2,701,582"
        ],
        "params": {
          "monthly_contribution": "1500",
          "interest_rate": "7.0",
          "years": "30"
        }
      },
      {
        "label": "$2,000 / mo",
        "values": [
          "$346,170",
          "$1,041,853",
          "$2,439,942",
          "$3,602,109"
        ],
        "params": {
          "monthly_contribution": "2000",
          "interest_rate": "7.0",
          "years": "30"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "300 € / mes",
          "values": [
            "51.925 €",
            "156.278 €",
            "365.991 €",
            "540.316 €"
          ],
          "params": {
            "monthly_contribution": "300",
            "interest_rate": "7.0",
            "years": "30"
          }
        },
        {
          "label": "500 € / mes",
          "values": [
            "86.542 €",
            "260.463 €",
            "609.985 €",
            "900.527 €"
          ],
          "params": {
            "monthly_contribution": "500",
            "interest_rate": "7.0",
            "years": "30"
          }
        },
        {
          "label": "1.000 € / mes",
          "values": [
            "173.085 €",
            "520.927 €",
            "1.219.971 €",
            "1.801.055 €"
          ],
          "params": {
            "monthly_contribution": "1000",
            "interest_rate": "7.0",
            "years": "30"
          }
        },
        {
          "label": "1.500 € / mes",
          "values": [
            "259.627 €",
            "781.390 €",
            "1.829.956 €",
            "2.701.582 €"
          ],
          "params": {
            "monthly_contribution": "1500",
            "interest_rate": "7.0",
            "years": "30"
          }
        },
        {
          "label": "2.000 € / mes",
          "values": [
            "346.170 €",
            "1.041.853 €",
            "2.439.942 €",
            "3.602.109 €"
          ],
          "params": {
            "monthly_contribution": "2000",
            "interest_rate": "7.0",
            "years": "30"
          }
        }
      ],
      "fr": [
        {
          "label": "300 € / mois",
          "values": [
            "51 925 €",
            "156 278 €",
            "365 991 €",
            "540 316 €"
          ],
          "params": {
            "monthly_contribution": "300",
            "interest_rate": "7.0",
            "years": "30"
          }
        },
        {
          "label": "500 € / mois",
          "values": [
            "86 542 €",
            "260 463 €",
            "609 985 €",
            "900 527 €"
          ],
          "params": {
            "monthly_contribution": "500",
            "interest_rate": "7.0",
            "years": "30"
          }
        },
        {
          "label": "1 000 € / mois",
          "values": [
            "173 085 €",
            "520 927 €",
            "1 219 971 €",
            "1 801 055 €"
          ],
          "params": {
            "monthly_contribution": "1000",
            "interest_rate": "7.0",
            "years": "30"
          }
        },
        {
          "label": "1 500 € / mois",
          "values": [
            "259 627 €",
            "781 390 €",
            "1 829 956 €",
            "2 701 582 €"
          ],
          "params": {
            "monthly_contribution": "1500",
            "interest_rate": "7.0",
            "years": "30"
          }
        },
        {
          "label": "2 000 € / mois",
          "values": [
            "346 170 €",
            "1 041 853 €",
            "2 439 942 €",
            "3 602 109 €"
          ],
          "params": {
            "monthly_contribution": "2000",
            "interest_rate": "7.0",
            "years": "30"
          }
        }
      ],
      "de": [
        {
          "label": "300 € / Mon.",
          "values": [
            "51.925 €",
            "156.278 €",
            "365.991 €",
            "540.316 €"
          ],
          "params": {
            "monthly_contribution": "300",
            "interest_rate": "7.0",
            "years": "30"
          }
        },
        {
          "label": "500 € / Mon.",
          "values": [
            "86.542 €",
            "260.463 €",
            "609.985 €",
            "900.527 €"
          ],
          "params": {
            "monthly_contribution": "500",
            "interest_rate": "7.0",
            "years": "30"
          }
        },
        {
          "label": "1.000 € / Mon.",
          "values": [
            "173.085 €",
            "520.927 €",
            "1.219.971 €",
            "1.801.055 €"
          ],
          "params": {
            "monthly_contribution": "1000",
            "interest_rate": "7.0",
            "years": "30"
          }
        },
        {
          "label": "1.500 € / Mon.",
          "values": [
            "259.627 €",
            "781.390 €",
            "1.829.956 €",
            "2.701.582 €"
          ],
          "params": {
            "monthly_contribution": "1500",
            "interest_rate": "7.0",
            "years": "30"
          }
        },
        {
          "label": "2.000 € / Mon.",
          "values": [
            "346.170 €",
            "1.041.853 €",
            "2.439.942 €",
            "3.602.109 €"
          ],
          "params": {
            "monthly_contribution": "2000",
            "interest_rate": "7.0",
            "years": "30"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "early-retirement-fire-calculator",
      "annuity-calculator",
      "annuity-payout-calculator",
      "rmd-calculator",
      "social-security-calculator"
    ],
    "title": "FIRE Portfolio Target & Safe Withdrawal Rate Matrix (3.5% – 4.5% SWR)",
    "description": "Required retirement portfolio to sustain your annual spending indefinitely using the classic 4% (25×) rule, conservative 3.5% (28.6×), and 4.5% SWR.",
    "headers": [
      "Annual Spending",
      "Monthly Budget",
      "Conservative (3.5% SWR)",
      "Classic FIRE (4.0% / 25×)",
      "Flexible (4.5% SWR)"
    ],
    "translations": {
      "es": {
        "title": "Objetivo Patrimonial FIRE y Tasa Segura de Retiro (3,5 % – 4,5 %)",
        "description": "Capital necesario para financiar sus gastos anuales de forma sostenible mediante la regla clásica del 4 % (25×).",
        "headers": [
          "Gasto Anual",
          "Gasto Mensual",
          "Conservador (3,5 %)",
          "Regla FIRE (4,0 % / 25×)",
          "Flexible (4,5 %)"
        ]
      },
      "fr": {
        "title": "Capital Indépendance Financière FIRE (Règle des 3,5 % à 4,5 %)",
        "description": "Patrimoine financier requis pour couvrir vos dépenses annuelles selon la règle des 4 % (25× dépenses annuelles).",
        "headers": [
          "Dépenses Annuelles",
          "Budget Mensuel",
          "Prudent (3,5 %)",
          "Règle FIRE (4,0 % / 25×)",
          "Flexible (4,5 %)"
        ]
      },
      "de": {
        "title": "FIRE-Kapitalziel & Sichere Entnahmerate (3,5 % – 4,5 % SWR)",
        "description": "Benötigtes Depotvermögen zur dauerhaften Deckung Ihrer Ausgaben nach der 4-%-Regel (25× Jahresausgaben).",
        "headers": [
          "Jahresausgaben",
          "Monatsbudget",
          "Konservativ (3,5 %)",
          "FIRE-Ziel (4,0 % / 25×)",
          "Flexibel (4,5 %)"
        ]
      }
    },
    "rows": [
      {
        "label": "$30,000 / yr",
        "values": [
          "$2,500 / mo",
          "$857,143",
          "$750,000",
          "$666,667"
        ],
        "params": {
          "annual_expenses": "30000",
          "withdrawal_rate": "4.0"
        }
      },
      {
        "label": "$48,000 / yr",
        "values": [
          "$4,000 / mo",
          "$1,371,429",
          "$1,200,000",
          "$1,066,667"
        ],
        "params": {
          "annual_expenses": "48000",
          "withdrawal_rate": "4.0"
        }
      },
      {
        "label": "$60,000 / yr",
        "values": [
          "$5,000 / mo",
          "$1,714,286",
          "$1,500,000",
          "$1,333,333"
        ],
        "params": {
          "annual_expenses": "60000",
          "withdrawal_rate": "4.0"
        }
      },
      {
        "label": "$80,000 / yr",
        "values": [
          "$6,667 / mo",
          "$2,285,714",
          "$2,000,000",
          "$1,777,778"
        ],
        "params": {
          "annual_expenses": "80000",
          "withdrawal_rate": "4.0"
        }
      },
      {
        "label": "$120,000 / yr",
        "values": [
          "$10,000 / mo",
          "$3,428,571",
          "$3,000,000",
          "$2,666,667"
        ],
        "params": {
          "annual_expenses": "120000",
          "withdrawal_rate": "4.0"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "30.000 € / año",
          "values": [
            "2.500 € / mes",
            "857.143 €",
            "750.000 €",
            "666.667 €"
          ],
          "params": {
            "annual_expenses": "30000",
            "withdrawal_rate": "4.0"
          }
        },
        {
          "label": "48.000 € / año",
          "values": [
            "4.000 € / mes",
            "1.371.429 €",
            "1.200.000 €",
            "1.066.667 €"
          ],
          "params": {
            "annual_expenses": "48000",
            "withdrawal_rate": "4.0"
          }
        },
        {
          "label": "60.000 € / año",
          "values": [
            "5.000 € / mes",
            "1.714.286 €",
            "1.500.000 €",
            "1.333.333 €"
          ],
          "params": {
            "annual_expenses": "60000",
            "withdrawal_rate": "4.0"
          }
        },
        {
          "label": "80.000 € / año",
          "values": [
            "6.667 € / mes",
            "2.285.714 €",
            "2.000.000 €",
            "1.777.778 €"
          ],
          "params": {
            "annual_expenses": "80000",
            "withdrawal_rate": "4.0"
          }
        },
        {
          "label": "120.000 € / año",
          "values": [
            "10.000 € / mes",
            "3.428.571 €",
            "3.000.000 €",
            "2.666.667 €"
          ],
          "params": {
            "annual_expenses": "120000",
            "withdrawal_rate": "4.0"
          }
        }
      ],
      "fr": [
        {
          "label": "30 000 € / an",
          "values": [
            "2 500 € / mois",
            "857 143 €",
            "750 000 €",
            "666 667 €"
          ],
          "params": {
            "annual_expenses": "30000",
            "withdrawal_rate": "4.0"
          }
        },
        {
          "label": "48 000 € / an",
          "values": [
            "4 000 € / mois",
            "1 371 429 €",
            "1 200 000 €",
            "1 066 667 €"
          ],
          "params": {
            "annual_expenses": "48000",
            "withdrawal_rate": "4.0"
          }
        },
        {
          "label": "60 000 € / an",
          "values": [
            "5 000 € / mois",
            "1 714 286 €",
            "1 500 000 €",
            "1 333 333 €"
          ],
          "params": {
            "annual_expenses": "60000",
            "withdrawal_rate": "4.0"
          }
        },
        {
          "label": "80 000 € / an",
          "values": [
            "6 667 € / mois",
            "2 285 714 €",
            "2 000 000 €",
            "1 777 778 €"
          ],
          "params": {
            "annual_expenses": "80000",
            "withdrawal_rate": "4.0"
          }
        },
        {
          "label": "120 000 € / an",
          "values": [
            "10 000 € / mois",
            "3 428 571 €",
            "3 000 000 €",
            "2 666 667 €"
          ],
          "params": {
            "annual_expenses": "120000",
            "withdrawal_rate": "4.0"
          }
        }
      ],
      "de": [
        {
          "label": "30.000 € / Jahr",
          "values": [
            "2.500 € / Mon.",
            "857.143 €",
            "750.000 €",
            "666.667 €"
          ],
          "params": {
            "annual_expenses": "30000",
            "withdrawal_rate": "4.0"
          }
        },
        {
          "label": "48.000 € / Jahr",
          "values": [
            "4.000 € / Mon.",
            "1.371.429 €",
            "1.200.000 €",
            "1.066.667 €"
          ],
          "params": {
            "annual_expenses": "48000",
            "withdrawal_rate": "4.0"
          }
        },
        {
          "label": "60.000 € / Jahr",
          "values": [
            "5.000 € / Mon.",
            "1.714.286 €",
            "1.500.000 €",
            "1.333.333 €"
          ],
          "params": {
            "annual_expenses": "60000",
            "withdrawal_rate": "4.0"
          }
        },
        {
          "label": "80.000 € / Jahr",
          "values": [
            "6.667 € / Mon.",
            "2.285.714 €",
            "2.000.000 €",
            "1.777.778 €"
          ],
          "params": {
            "annual_expenses": "80000",
            "withdrawal_rate": "4.0"
          }
        },
        {
          "label": "120.000 € / Jahr",
          "values": [
            "10.000 € / Mon.",
            "3.428.571 €",
            "3.000.000 €",
            "2.666.667 €"
          ],
          "params": {
            "annual_expenses": "120000",
            "withdrawal_rate": "4.0"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "inflation-calculator",
      "present-value-calculator"
    ],
    "title": "Inflation Purchasing Power Erosion Table (3.0% Annual CPI)",
    "description": "How 3.0% sustained annual inflation shrinks the real value of idle cash over 10, 20, and 30 years—and the future sum needed to match today’s buying power in 20 years.",
    "headers": [
      "Today’s Cash",
      "Real Value (10 Yr)",
      "Real Value (20 Yr)",
      "Real Value (30 Yr)",
      "20-Yr Cost Equivalent"
    ],
    "translations": {
      "es": {
        "title": "Tabla de Pérdida de Poder Adquisitivo por Inflación (3,0 % IPC Anual)",
        "description": "Impacto de una inflación sostenida del 3,0 % sobre el valor real del efectivo en 10, 20 y 30 años.",
        "headers": [
          "Importe Actual",
          "Valor Real (10 Años)",
          "Valor Real (20 Años)",
          "Valor Real (30 Años)",
          "Equivalente en 20 Años"
        ]
      },
      "fr": {
        "title": "Érosion du Pouvoir d’Achat due à l’Inflation (3,0 % par An)",
        "description": "Impact d’une inflation annuelle de 3,0 % sur la valeur réelle de votre épargne après 10, 20 et 30 ans.",
        "headers": [
          "Montant Actuel",
          "Valeur Réelle (10 Ans)",
          "Valeur Réelle (20 Ans)",
          "Valeur Réelle (30 Ans)",
          "Équivalent à 20 Ans"
        ]
      },
      "de": {
        "title": "Kaufkraftverlust-Tabelle bei 3,0 % jährlicher Inflation",
        "description": "So schrumpft die reale Kaufkraft von Bargeld bei 3,0 % Teuerung nach 10, 20 und 30 Jahren.",
        "headers": [
          "Heutiger Betrag",
          "Kaufkraft (10 J.)",
          "Kaufkraft (20 J.)",
          "Kaufkraft (30 J.)",
          "Bedarf in 20 Jahren"
        ]
      }
    },
    "rows": [
      {
        "label": "$1,000",
        "values": [
          "$744",
          "$554",
          "$412",
          "$1,806"
        ],
        "params": {
          "amount": "1000",
          "inflation_rate": "3.0",
          "years": "20"
        }
      },
      {
        "label": "$10,000",
        "values": [
          "$7,441",
          "$5,537",
          "$4,120",
          "$18,061"
        ],
        "params": {
          "amount": "10000",
          "inflation_rate": "3.0",
          "years": "20"
        }
      },
      {
        "label": "$50,000",
        "values": [
          "$37,205",
          "$27,684",
          "$20,599",
          "$90,306"
        ],
        "params": {
          "amount": "50000",
          "inflation_rate": "3.0",
          "years": "20"
        }
      },
      {
        "label": "$100,000",
        "values": [
          "$74,409",
          "$55,368",
          "$41,199",
          "$180,611"
        ],
        "params": {
          "amount": "100000",
          "inflation_rate": "3.0",
          "years": "20"
        }
      },
      {
        "label": "$500,000",
        "values": [
          "$372,047",
          "$276,838",
          "$205,993",
          "$903,056"
        ],
        "params": {
          "amount": "500000",
          "inflation_rate": "3.0",
          "years": "20"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "1.000 €",
          "values": [
            "744 €",
            "554 €",
            "412 €",
            "1.806 €"
          ],
          "params": {
            "amount": "1000",
            "inflation_rate": "3.0",
            "years": "20"
          }
        },
        {
          "label": "10.000 €",
          "values": [
            "7.441 €",
            "5.537 €",
            "4.120 €",
            "18.061 €"
          ],
          "params": {
            "amount": "10000",
            "inflation_rate": "3.0",
            "years": "20"
          }
        },
        {
          "label": "50.000 €",
          "values": [
            "37.205 €",
            "27.684 €",
            "20.599 €",
            "90.306 €"
          ],
          "params": {
            "amount": "50000",
            "inflation_rate": "3.0",
            "years": "20"
          }
        },
        {
          "label": "100.000 €",
          "values": [
            "74.409 €",
            "55.368 €",
            "41.199 €",
            "180.611 €"
          ],
          "params": {
            "amount": "100000",
            "inflation_rate": "3.0",
            "years": "20"
          }
        },
        {
          "label": "500.000 €",
          "values": [
            "372.047 €",
            "276.838 €",
            "205.993 €",
            "903.056 €"
          ],
          "params": {
            "amount": "500000",
            "inflation_rate": "3.0",
            "years": "20"
          }
        }
      ],
      "fr": [
        {
          "label": "1 000 €",
          "values": [
            "744 €",
            "554 €",
            "412 €",
            "1 806 €"
          ],
          "params": {
            "amount": "1000",
            "inflation_rate": "3.0",
            "years": "20"
          }
        },
        {
          "label": "10 000 €",
          "values": [
            "7 441 €",
            "5 537 €",
            "4 120 €",
            "18 061 €"
          ],
          "params": {
            "amount": "10000",
            "inflation_rate": "3.0",
            "years": "20"
          }
        },
        {
          "label": "50 000 €",
          "values": [
            "37 205 €",
            "27 684 €",
            "20 599 €",
            "90 306 €"
          ],
          "params": {
            "amount": "50000",
            "inflation_rate": "3.0",
            "years": "20"
          }
        },
        {
          "label": "100 000 €",
          "values": [
            "74 409 €",
            "55 368 €",
            "41 199 €",
            "180 611 €"
          ],
          "params": {
            "amount": "100000",
            "inflation_rate": "3.0",
            "years": "20"
          }
        },
        {
          "label": "500 000 €",
          "values": [
            "372 047 €",
            "276 838 €",
            "205 993 €",
            "903 056 €"
          ],
          "params": {
            "amount": "500000",
            "inflation_rate": "3.0",
            "years": "20"
          }
        }
      ],
      "de": [
        {
          "label": "1.000 €",
          "values": [
            "744 €",
            "554 €",
            "412 €",
            "1.806 €"
          ],
          "params": {
            "amount": "1000",
            "inflation_rate": "3.0",
            "years": "20"
          }
        },
        {
          "label": "10.000 €",
          "values": [
            "7.441 €",
            "5.537 €",
            "4.120 €",
            "18.061 €"
          ],
          "params": {
            "amount": "10000",
            "inflation_rate": "3.0",
            "years": "20"
          }
        },
        {
          "label": "50.000 €",
          "values": [
            "37.205 €",
            "27.684 €",
            "20.599 €",
            "90.306 €"
          ],
          "params": {
            "amount": "50000",
            "inflation_rate": "3.0",
            "years": "20"
          }
        },
        {
          "label": "100.000 €",
          "values": [
            "74.409 €",
            "55.368 €",
            "41.199 €",
            "180.611 €"
          ],
          "params": {
            "amount": "100000",
            "inflation_rate": "3.0",
            "years": "20"
          }
        },
        {
          "label": "500.000 €",
          "values": [
            "372.047 €",
            "276.838 €",
            "205.993 €",
            "903.056 €"
          ],
          "params": {
            "amount": "500000",
            "inflation_rate": "3.0",
            "years": "20"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "salary-calculator",
      "hourly-to-salary-calculator",
      "salary-to-hourly-calculator",
      "biweekly-salary-calculator"
    ],
    "title": "Hourly Wage to Weekly, Biweekly, Monthly & Annual Salary (40 hrs/wk)",
    "description": "Standard full-time gross pay conversions based on 40 hours per week across 52 paid weeks (2,080 hours per year).",
    "headers": [
      "Hourly Wage",
      "Weekly (40h)",
      "Biweekly (80h)",
      "Monthly Gross",
      "Annual Salary"
    ],
    "translations": {
      "es": {
        "title": "Conversión de Tarifa por Hora a Salario Mensual y Anual (40 h/sem)",
        "description": "Equivalencias salariales brutas estándar calculadas sobre 40 horas semanales y 52 semanas (2.080 horas/año).",
        "headers": [
          "Tarifa / Hora",
          "Semanal (40 h)",
          "Quincenal (80 h)",
          "Mensual Bruto",
          "Salario Anual"
        ]
      },
      "fr": {
        "title": "Conversion Taux Horaire en Salaire Mensuel et Annuel Brut (40 h/sem)",
        "description": "Correspondances de rémunération brute calculées sur 40 heures par semaine (2 080 heures par an).",
        "headers": [
          "Taux Horaire",
          "Hebdomadaire",
          "Bimensuel (80 h)",
          "Mensuel Brut",
          "Annuel Brut"
        ]
      },
      "de": {
        "title": "Stundenlohn-zu-Jahresgehalt-Tabelle (40 Std./Woche, 2.080 Std.)",
        "description": "Bruttogehalts-Umrechnung für Vollzeit (40 Stunden/Woche, 52 Wochen) auf Wochen-, Monats- und Jahresbasis.",
        "headers": [
          "Stundenlohn",
          "Wöchentlich",
          "Zweiwöchentlich",
          "Monatsbrutto",
          "Jahresbrutto"
        ]
      }
    },
    "rows": [
      {
        "label": "$18.00 / h",
        "values": [
          "$720",
          "$1,440",
          "$3,120",
          "$37,440"
        ],
        "params": {
          "hourly_rate": "18",
          "hours_per_week": "40",
          "weeks_per_year": "52"
        }
      },
      {
        "label": "$25.00 / h",
        "values": [
          "$1,000",
          "$2,000",
          "$4,333",
          "$52,000"
        ],
        "params": {
          "hourly_rate": "25",
          "hours_per_week": "40",
          "weeks_per_year": "52"
        }
      },
      {
        "label": "$35.00 / h",
        "values": [
          "$1,400",
          "$2,800",
          "$6,067",
          "$72,800"
        ],
        "params": {
          "hourly_rate": "35",
          "hours_per_week": "40",
          "weeks_per_year": "52"
        }
      },
      {
        "label": "$50.00 / h",
        "values": [
          "$2,000",
          "$4,000",
          "$8,667",
          "$104,000"
        ],
        "params": {
          "hourly_rate": "50",
          "hours_per_week": "40",
          "weeks_per_year": "52"
        }
      },
      {
        "label": "$75.00 / h",
        "values": [
          "$3,000",
          "$6,000",
          "$13,000",
          "$156,000"
        ],
        "params": {
          "hourly_rate": "75",
          "hours_per_week": "40",
          "weeks_per_year": "52"
        }
      },
      {
        "label": "$100.00 / h",
        "values": [
          "$4,000",
          "$8,000",
          "$17,333",
          "$208,000"
        ],
        "params": {
          "hourly_rate": "100",
          "hours_per_week": "40",
          "weeks_per_year": "52"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "18,00 € / h",
          "values": [
            "720 €",
            "1.440 €",
            "3.120 €",
            "37.440 €"
          ],
          "params": {
            "hourly_rate": "18",
            "hours_per_week": "40",
            "weeks_per_year": "52"
          }
        },
        {
          "label": "25,00 € / h",
          "values": [
            "1.000 €",
            "2.000 €",
            "4.333 €",
            "52.000 €"
          ],
          "params": {
            "hourly_rate": "25",
            "hours_per_week": "40",
            "weeks_per_year": "52"
          }
        },
        {
          "label": "35,00 € / h",
          "values": [
            "1.400 €",
            "2.800 €",
            "6.067 €",
            "72.800 €"
          ],
          "params": {
            "hourly_rate": "35",
            "hours_per_week": "40",
            "weeks_per_year": "52"
          }
        },
        {
          "label": "50,00 € / h",
          "values": [
            "2.000 €",
            "4.000 €",
            "8.667 €",
            "104.000 €"
          ],
          "params": {
            "hourly_rate": "50",
            "hours_per_week": "40",
            "weeks_per_year": "52"
          }
        },
        {
          "label": "75,00 € / h",
          "values": [
            "3.000 €",
            "6.000 €",
            "13.000 €",
            "156.000 €"
          ],
          "params": {
            "hourly_rate": "75",
            "hours_per_week": "40",
            "weeks_per_year": "52"
          }
        },
        {
          "label": "100,00 € / h",
          "values": [
            "4.000 €",
            "8.000 €",
            "17.333 €",
            "208.000 €"
          ],
          "params": {
            "hourly_rate": "100",
            "hours_per_week": "40",
            "weeks_per_year": "52"
          }
        }
      ],
      "fr": [
        {
          "label": "18,00 € / h",
          "values": [
            "720 €",
            "1 440 €",
            "3 120 €",
            "37 440 €"
          ],
          "params": {
            "hourly_rate": "18",
            "hours_per_week": "40",
            "weeks_per_year": "52"
          }
        },
        {
          "label": "25,00 € / h",
          "values": [
            "1 000 €",
            "2 000 €",
            "4 333 €",
            "52 000 €"
          ],
          "params": {
            "hourly_rate": "25",
            "hours_per_week": "40",
            "weeks_per_year": "52"
          }
        },
        {
          "label": "35,00 € / h",
          "values": [
            "1 400 €",
            "2 800 €",
            "6 067 €",
            "72 800 €"
          ],
          "params": {
            "hourly_rate": "35",
            "hours_per_week": "40",
            "weeks_per_year": "52"
          }
        },
        {
          "label": "50,00 € / h",
          "values": [
            "2 000 €",
            "4 000 €",
            "8 667 €",
            "104 000 €"
          ],
          "params": {
            "hourly_rate": "50",
            "hours_per_week": "40",
            "weeks_per_year": "52"
          }
        },
        {
          "label": "75,00 € / h",
          "values": [
            "3 000 €",
            "6 000 €",
            "13 000 €",
            "156 000 €"
          ],
          "params": {
            "hourly_rate": "75",
            "hours_per_week": "40",
            "weeks_per_year": "52"
          }
        },
        {
          "label": "100,00 € / h",
          "values": [
            "4 000 €",
            "8 000 €",
            "17 333 €",
            "208 000 €"
          ],
          "params": {
            "hourly_rate": "100",
            "hours_per_week": "40",
            "weeks_per_year": "52"
          }
        }
      ],
      "de": [
        {
          "label": "18,00 € / h",
          "values": [
            "720 €",
            "1.440 €",
            "3.120 €",
            "37.440 €"
          ],
          "params": {
            "hourly_rate": "18",
            "hours_per_week": "40",
            "weeks_per_year": "52"
          }
        },
        {
          "label": "25,00 € / h",
          "values": [
            "1.000 €",
            "2.000 €",
            "4.333 €",
            "52.000 €"
          ],
          "params": {
            "hourly_rate": "25",
            "hours_per_week": "40",
            "weeks_per_year": "52"
          }
        },
        {
          "label": "35,00 € / h",
          "values": [
            "1.400 €",
            "2.800 €",
            "6.067 €",
            "72.800 €"
          ],
          "params": {
            "hourly_rate": "35",
            "hours_per_week": "40",
            "weeks_per_year": "52"
          }
        },
        {
          "label": "50,00 € / h",
          "values": [
            "2.000 €",
            "4.000 €",
            "8.667 €",
            "104.000 €"
          ],
          "params": {
            "hourly_rate": "50",
            "hours_per_week": "40",
            "weeks_per_year": "52"
          }
        },
        {
          "label": "75,00 € / h",
          "values": [
            "3.000 €",
            "6.000 €",
            "13.000 €",
            "156.000 €"
          ],
          "params": {
            "hourly_rate": "75",
            "hours_per_week": "40",
            "weeks_per_year": "52"
          }
        },
        {
          "label": "100,00 € / h",
          "values": [
            "4.000 €",
            "8.000 €",
            "17.333 €",
            "208.000 €"
          ],
          "params": {
            "hourly_rate": "100",
            "hours_per_week": "40",
            "weeks_per_year": "52"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "margin-calculator"
    ],
    "title": "Gross Profit Margin vs. Markup Conversion Matrix (Per $100 Unit Cost)",
    "description": "Quick pricing table translating target gross profit margins into equivalent cost markups and retail selling prices.",
    "headers": [
      "Target Gross Margin",
      "Required Markup",
      "Unit Cost",
      "Selling Price",
      "Gross Profit"
    ],
    "translations": {
      "es": {
        "title": "Tabla de Conversión entre Margen Comercial y Markup (Base 100 €)",
        "description": "Equivalencia exacta entre margen sobre venta, recargo sobre costo y precio de venta final.",
        "headers": [
          "Margen Bruto",
          "Markup Necesario",
          "Costo Unitario",
          "Precio Venta",
          "Beneficio Bruto"
        ]
      },
      "fr": {
        "title": "Table de Correspondance Taux de Marque vs Taux de Marge (Base 100 €)",
        "description": "Convertissez instantanément votre taux de marque cible en taux de marge et prix de vente HT.",
        "headers": [
          "Taux de Marque",
          "Taux de Marge",
          "Coût d’Achat",
          "Prix de Vente",
          "Marge Brute"
        ]
      },
      "de": {
        "title": "Handelsspanne (Marge) vs. Kalkulationsaufschlag-Tabelle (Basis 100 €)",
        "description": "Exakte Umrechnung von gewünschter Bruttomarge in den erforderlichen Kalkulationsaufschlag und Nettoverkaufspreis.",
        "headers": [
          "Ziel-Marge",
          "Erforderl. Aufschlag",
          "Einkaufspreis",
          "Verkaufspreis",
          "Rohertrag"
        ]
      }
    },
    "rows": [
      {
        "label": "10%",
        "values": [
          "11.1%",
          "$100",
          "$111.11",
          "$11.11"
        ],
        "params": {
          "cost": "100",
          "margin": "10"
        }
      },
      {
        "label": "20%",
        "values": [
          "25.0%",
          "$100",
          "$125.00",
          "$25.00"
        ],
        "params": {
          "cost": "100",
          "margin": "20"
        }
      },
      {
        "label": "25%",
        "values": [
          "33.3%",
          "$100",
          "$133.33",
          "$33.33"
        ],
        "params": {
          "cost": "100",
          "margin": "25"
        }
      },
      {
        "label": "33.3%",
        "values": [
          "50.0%",
          "$100",
          "$149.99",
          "$49.99"
        ],
        "params": {
          "cost": "100",
          "margin": "33.33"
        }
      },
      {
        "label": "50%",
        "values": [
          "100.0%",
          "$100",
          "$200.00",
          "$100.00"
        ],
        "params": {
          "cost": "100",
          "margin": "50"
        }
      },
      {
        "label": "60%",
        "values": [
          "150.0%",
          "$100",
          "$250.00",
          "$150.00"
        ],
        "params": {
          "cost": "100",
          "margin": "60"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "10%",
          "values": [
            "11,1%",
            "100 €",
            "111,11 €",
            "11,11 €"
          ],
          "params": {
            "cost": "100",
            "margin": "10"
          }
        },
        {
          "label": "20%",
          "values": [
            "25,0%",
            "100 €",
            "125,00 €",
            "25,00 €"
          ],
          "params": {
            "cost": "100",
            "margin": "20"
          }
        },
        {
          "label": "25%",
          "values": [
            "33,3%",
            "100 €",
            "133,33 €",
            "33,33 €"
          ],
          "params": {
            "cost": "100",
            "margin": "25"
          }
        },
        {
          "label": "33,3%",
          "values": [
            "50,0%",
            "100 €",
            "149,99 €",
            "49,99 €"
          ],
          "params": {
            "cost": "100",
            "margin": "33.33"
          }
        },
        {
          "label": "50%",
          "values": [
            "100,0%",
            "100 €",
            "200,00 €",
            "100,00 €"
          ],
          "params": {
            "cost": "100",
            "margin": "50"
          }
        },
        {
          "label": "60%",
          "values": [
            "150,0%",
            "100 €",
            "250,00 €",
            "150,00 €"
          ],
          "params": {
            "cost": "100",
            "margin": "60"
          }
        }
      ],
      "fr": [
        {
          "label": "10 %",
          "values": [
            "11,1 %",
            "100 €",
            "111,11 €",
            "11,11 €"
          ],
          "params": {
            "cost": "100",
            "margin": "10"
          }
        },
        {
          "label": "20 %",
          "values": [
            "25,0 %",
            "100 €",
            "125,00 €",
            "25,00 €"
          ],
          "params": {
            "cost": "100",
            "margin": "20"
          }
        },
        {
          "label": "25 %",
          "values": [
            "33,3 %",
            "100 €",
            "133,33 €",
            "33,33 €"
          ],
          "params": {
            "cost": "100",
            "margin": "25"
          }
        },
        {
          "label": "33,3 %",
          "values": [
            "50,0 %",
            "100 €",
            "149,99 €",
            "49,99 €"
          ],
          "params": {
            "cost": "100",
            "margin": "33.33"
          }
        },
        {
          "label": "50 %",
          "values": [
            "100,0 %",
            "100 €",
            "200,00 €",
            "100,00 €"
          ],
          "params": {
            "cost": "100",
            "margin": "50"
          }
        },
        {
          "label": "60 %",
          "values": [
            "150,0 %",
            "100 €",
            "250,00 €",
            "150,00 €"
          ],
          "params": {
            "cost": "100",
            "margin": "60"
          }
        }
      ],
      "de": [
        {
          "label": "10 %",
          "values": [
            "11,1 %",
            "100 €",
            "111,11 €",
            "11,11 €"
          ],
          "params": {
            "cost": "100",
            "margin": "10"
          }
        },
        {
          "label": "20 %",
          "values": [
            "25,0 %",
            "100 €",
            "125,00 €",
            "25,00 €"
          ],
          "params": {
            "cost": "100",
            "margin": "20"
          }
        },
        {
          "label": "25 %",
          "values": [
            "33,3 %",
            "100 €",
            "133,33 €",
            "33,33 €"
          ],
          "params": {
            "cost": "100",
            "margin": "25"
          }
        },
        {
          "label": "33,3 %",
          "values": [
            "50,0 %",
            "100 €",
            "149,99 €",
            "49,99 €"
          ],
          "params": {
            "cost": "100",
            "margin": "33.33"
          }
        },
        {
          "label": "50 %",
          "values": [
            "100,0 %",
            "100 €",
            "200,00 €",
            "100,00 €"
          ],
          "params": {
            "cost": "100",
            "margin": "50"
          }
        },
        {
          "label": "60 %",
          "values": [
            "150,0 %",
            "100 €",
            "250,00 €",
            "150,00 €"
          ],
          "params": {
            "cost": "100",
            "margin": "60"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "percent-off-calculator"
    ],
    "title": "Percent Off Discount & Final Sale Price Matrix",
    "description": "Instant sale prices for 15%, 25%, 40%, and 50% off retail price points before local sales tax.",
    "headers": [
      "Original Price",
      "15% Off",
      "25% Off",
      "40% Off",
      "50% Off"
    ],
    "translations": {
      "es": {
        "title": "Tabla Rápida de Descuentos y Precios Rebajados",
        "description": "Precios finales tras aplicar rebajas del 15 %, 25 %, 40 % y 50 % sobre importes habituales.",
        "headers": [
          "Precio Original",
          "-15 % Dto.",
          "-25 % Dto.",
          "-40 % Dto.",
          "-50 % Dto."
        ]
      },
      "fr": {
        "title": "Tableau Rapide des Soldes et Prix Remisés",
        "description": "Prix soldés instantanés pour des réductions de 15 %, 25 %, 40 % et 50 % sur le prix affiché.",
        "headers": [
          "Prix Initial",
          "-15 %",
          "-25 %",
          "-40 %",
          "-50 %"
        ]
      },
      "de": {
        "title": "Rabatt- & Sonderpreis-Schnellübersicht (15 % bis 50 %)",
        "description": "Reduzierte Endpreise bei 15 %, 25 %, 40 % und 50 % Preisnachlass auf gängige Einkaufsbeträge.",
        "headers": [
          "Ursprungspreis",
          "15 % Rabatt",
          "25 % Rabatt",
          "40 % Rabatt",
          "50 % Rabatt"
        ]
      }
    },
    "rows": [
      {
        "label": "$50",
        "values": [
          "$42.50",
          "$37.50",
          "$30.00",
          "$25.00"
        ],
        "params": {
          "original_price": "50",
          "discount_percent": "25"
        }
      },
      {
        "label": "$100",
        "values": [
          "$85",
          "$75",
          "$60",
          "$50"
        ],
        "params": {
          "original_price": "100",
          "discount_percent": "25"
        }
      },
      {
        "label": "$250",
        "values": [
          "$213",
          "$188",
          "$150",
          "$125"
        ],
        "params": {
          "original_price": "250",
          "discount_percent": "25"
        }
      },
      {
        "label": "$500",
        "values": [
          "$425",
          "$375",
          "$300",
          "$250"
        ],
        "params": {
          "original_price": "500",
          "discount_percent": "25"
        }
      },
      {
        "label": "$1,000",
        "values": [
          "$850",
          "$750",
          "$600",
          "$500"
        ],
        "params": {
          "original_price": "1000",
          "discount_percent": "25"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "50 €",
          "values": [
            "42,50 €",
            "37,50 €",
            "30,00 €",
            "25,00 €"
          ],
          "params": {
            "original_price": "50",
            "discount_percent": "25"
          }
        },
        {
          "label": "100 €",
          "values": [
            "85 €",
            "75 €",
            "60 €",
            "50 €"
          ],
          "params": {
            "original_price": "100",
            "discount_percent": "25"
          }
        },
        {
          "label": "250 €",
          "values": [
            "213 €",
            "188 €",
            "150 €",
            "125 €"
          ],
          "params": {
            "original_price": "250",
            "discount_percent": "25"
          }
        },
        {
          "label": "500 €",
          "values": [
            "425 €",
            "375 €",
            "300 €",
            "250 €"
          ],
          "params": {
            "original_price": "500",
            "discount_percent": "25"
          }
        },
        {
          "label": "1.000 €",
          "values": [
            "850 €",
            "750 €",
            "600 €",
            "500 €"
          ],
          "params": {
            "original_price": "1000",
            "discount_percent": "25"
          }
        }
      ],
      "fr": [
        {
          "label": "50 €",
          "values": [
            "42,50 €",
            "37,50 €",
            "30,00 €",
            "25,00 €"
          ],
          "params": {
            "original_price": "50",
            "discount_percent": "25"
          }
        },
        {
          "label": "100 €",
          "values": [
            "85 €",
            "75 €",
            "60 €",
            "50 €"
          ],
          "params": {
            "original_price": "100",
            "discount_percent": "25"
          }
        },
        {
          "label": "250 €",
          "values": [
            "213 €",
            "188 €",
            "150 €",
            "125 €"
          ],
          "params": {
            "original_price": "250",
            "discount_percent": "25"
          }
        },
        {
          "label": "500 €",
          "values": [
            "425 €",
            "375 €",
            "300 €",
            "250 €"
          ],
          "params": {
            "original_price": "500",
            "discount_percent": "25"
          }
        },
        {
          "label": "1 000 €",
          "values": [
            "850 €",
            "750 €",
            "600 €",
            "500 €"
          ],
          "params": {
            "original_price": "1000",
            "discount_percent": "25"
          }
        }
      ],
      "de": [
        {
          "label": "50 €",
          "values": [
            "42,50 €",
            "37,50 €",
            "30,00 €",
            "25,00 €"
          ],
          "params": {
            "original_price": "50",
            "discount_percent": "25"
          }
        },
        {
          "label": "100 €",
          "values": [
            "85 €",
            "75 €",
            "60 €",
            "50 €"
          ],
          "params": {
            "original_price": "100",
            "discount_percent": "25"
          }
        },
        {
          "label": "250 €",
          "values": [
            "213 €",
            "188 €",
            "150 €",
            "125 €"
          ],
          "params": {
            "original_price": "250",
            "discount_percent": "25"
          }
        },
        {
          "label": "500 €",
          "values": [
            "425 €",
            "375 €",
            "300 €",
            "250 €"
          ],
          "params": {
            "original_price": "500",
            "discount_percent": "25"
          }
        },
        {
          "label": "1.000 €",
          "values": [
            "850 €",
            "750 €",
            "600 €",
            "500 €"
          ],
          "params": {
            "original_price": "1000",
            "discount_percent": "25"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "sales-tax-calculator",
      "vat-calculator"
    ],
    "title": "Sales Tax & Reverse-Tax Extraction Table (8.25% Reference Rate)",
    "description": "Compare adding 8.25% sales tax to a pre-tax subtotal versus reverse-extracting included tax from a tax-inclusive receipt total.",
    "headers": [
      "Base Amount",
      "Tax Added (+8.25%)",
      "Gross Total",
      "Reverse Pre-Tax Net",
      "Included Tax"
    ],
    "translations": {
      "es": {
        "title": "Tabla de IVA (21 % General España): Añadir y Desglosar",
        "description": "Cálculo directo de base imponible + 21 % de IVA y desglose inverso desde un importe con IVA incluido.",
        "headers": [
          "Importe Base",
          "IVA Añadido (21 %)",
          "Total con IVA",
          "Base Imponible (Inverso)",
          "IVA Incluido"
        ]
      },
      "fr": {
        "title": "Tableau de TVA (20 % Taux Normal France) : HT ↔ TTC",
        "description": "Passage rapide du montant HT au TTC (+20 %) et extraction de la TVA incluse à partir d’un prix TTC.",
        "headers": [
          "Montant Base",
          "TVA Ajoutée (20 %)",
          "Total TTC",
          "Montant HT (depuis TTC)",
          "TVA Incluse"
        ]
      },
      "de": {
        "title": "Mehrwertsteuer-Tabelle (19 % Regelsteuersatz): Netto ↔ Brutto",
        "description": "Schnellübersicht für MwSt.-Aufschlag (Netto → Brutto) und MwSt.-Herausrechnung aus Bruttopreisen bei 19 %.",
        "headers": [
          "Basisbetrag",
          "MwSt. (+19 %)",
          "Bruttobetrag",
          "Netto (aus Brutto)",
          "Enthaltene MwSt."
        ]
      }
    },
    "rows": [
      {
        "label": "$50",
        "values": [
          "$4.13",
          "$54.13",
          "$46.19",
          "$3.81"
        ],
        "params": {
          "amount": "50",
          "tax_rate": "8.25"
        }
      },
      {
        "label": "$100",
        "values": [
          "$8.25",
          "$108.25",
          "$92.38",
          "$7.62"
        ],
        "params": {
          "amount": "100",
          "tax_rate": "8.25"
        }
      },
      {
        "label": "$250",
        "values": [
          "$20.63",
          "$270.63",
          "$230.95",
          "$19.05"
        ],
        "params": {
          "amount": "250",
          "tax_rate": "8.25"
        }
      },
      {
        "label": "$500",
        "values": [
          "$41.25",
          "$541.25",
          "$461.89",
          "$38.11"
        ],
        "params": {
          "amount": "500",
          "tax_rate": "8.25"
        }
      },
      {
        "label": "$1,000",
        "values": [
          "$82.50",
          "$1,082.50",
          "$923.79",
          "$76.21"
        ],
        "params": {
          "amount": "1000",
          "tax_rate": "8.25"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "50 €",
          "values": [
            "10,50 €",
            "60,50 €",
            "41,32 €",
            "8,68 €"
          ],
          "params": {
            "amount": "50",
            "tax_rate": "21"
          }
        },
        {
          "label": "100 €",
          "values": [
            "21,00 €",
            "121,00 €",
            "82,64 €",
            "17,36 €"
          ],
          "params": {
            "amount": "100",
            "tax_rate": "21"
          }
        },
        {
          "label": "250 €",
          "values": [
            "52,50 €",
            "302,50 €",
            "206,61 €",
            "43,39 €"
          ],
          "params": {
            "amount": "250",
            "tax_rate": "21"
          }
        },
        {
          "label": "500 €",
          "values": [
            "105,00 €",
            "605,00 €",
            "413,22 €",
            "86,78 €"
          ],
          "params": {
            "amount": "500",
            "tax_rate": "21"
          }
        },
        {
          "label": "1.000 €",
          "values": [
            "210,00 €",
            "1.210,00 €",
            "826,45 €",
            "173,55 €"
          ],
          "params": {
            "amount": "1000",
            "tax_rate": "21"
          }
        }
      ],
      "fr": [
        {
          "label": "50 €",
          "values": [
            "10,00 €",
            "60,00 €",
            "41,67 €",
            "8,33 €"
          ],
          "params": {
            "amount": "50",
            "tax_rate": "20"
          }
        },
        {
          "label": "100 €",
          "values": [
            "20,00 €",
            "120,00 €",
            "83,33 €",
            "16,67 €"
          ],
          "params": {
            "amount": "100",
            "tax_rate": "20"
          }
        },
        {
          "label": "250 €",
          "values": [
            "50,00 €",
            "300,00 €",
            "208,33 €",
            "41,67 €"
          ],
          "params": {
            "amount": "250",
            "tax_rate": "20"
          }
        },
        {
          "label": "500 €",
          "values": [
            "100,00 €",
            "600,00 €",
            "416,67 €",
            "83,33 €"
          ],
          "params": {
            "amount": "500",
            "tax_rate": "20"
          }
        },
        {
          "label": "1 000 €",
          "values": [
            "200,00 €",
            "1 200,00 €",
            "833,33 €",
            "166,67 €"
          ],
          "params": {
            "amount": "1000",
            "tax_rate": "20"
          }
        }
      ],
      "de": [
        {
          "label": "50 €",
          "values": [
            "9,50 €",
            "59,50 €",
            "42,02 €",
            "7,98 €"
          ],
          "params": {
            "amount": "50",
            "tax_rate": "19"
          }
        },
        {
          "label": "100 €",
          "values": [
            "19,00 €",
            "119,00 €",
            "84,03 €",
            "15,97 €"
          ],
          "params": {
            "amount": "100",
            "tax_rate": "19"
          }
        },
        {
          "label": "250 €",
          "values": [
            "47,50 €",
            "297,50 €",
            "210,08 €",
            "39,92 €"
          ],
          "params": {
            "amount": "250",
            "tax_rate": "19"
          }
        },
        {
          "label": "500 €",
          "values": [
            "95,00 €",
            "595,00 €",
            "420,17 €",
            "79,83 €"
          ],
          "params": {
            "amount": "500",
            "tax_rate": "19"
          }
        },
        {
          "label": "1.000 €",
          "values": [
            "190,00 €",
            "1.190,00 €",
            "840,34 €",
            "159,66 €"
          ],
          "params": {
            "amount": "1000",
            "tax_rate": "19"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "tip-calculator"
    ],
    "title": "Restaurant Tip & Total Bill Quick Reference (15% – 25%)",
    "description": "Tip dollar amount and final bill total (in parentheses) for standard U.S. hospitality gratuity tiers from 15% to 25%.",
    "headers": [
      "Check Subtotal",
      "15% Tip (Total)",
      "18% Tip (Total)",
      "20% Tip (Total)",
      "25% Tip (Total)"
    ],
    "translations": {
      "es": {
        "title": "Tabla Rápida de Propinas y Total de Cuenta (5 % – 20 %)",
        "description": "Importe de propina y total final entre paréntesis para cuentas habituales de restaurante.",
        "headers": [
          "Cuenta Subtotal",
          "5 % (Total)",
          "10 % (Total)",
          "15 % (Total)",
          "20 % (Total)"
        ]
      },
      "fr": {
        "title": "Barème Rapide des Pourboires et Addition Totale (5 % – 20 %)",
        "description": "Montant du pourboire et total final entre parenthèses selon le niveau de service.",
        "headers": [
          "Addition",
          "5 % (Total)",
          "10 % (Total)",
          "15 % (Total)",
          "20 % (Total)"
        ]
      },
      "de": {
        "title": "Trinkgeld-Schnelltabelle für Restaurants (5 % – 20 %)",
        "description": "Trinkgeldbetrag und gerundeter Gesamtbetrag in Klammern für gängige Restaurantrechnungen.",
        "headers": [
          "Rechnung",
          "5 % (Gesamt)",
          "10 % (Gesamt)",
          "15 % (Gesamt)",
          "20 % (Gesamt)"
        ]
      }
    },
    "rows": [
      {
        "label": "$40",
        "values": [
          "$6.00 ($46)",
          "$7.20 ($47)",
          "$8.00 ($48)",
          "$10.00 ($50)"
        ],
        "params": {
          "bill_amount": "40",
          "tip_percent": "18",
          "split_count": "2"
        }
      },
      {
        "label": "$75",
        "values": [
          "$11.25 ($86)",
          "$13.50 ($89)",
          "$15.00 ($90)",
          "$18.75 ($94)"
        ],
        "params": {
          "bill_amount": "75",
          "tip_percent": "18",
          "split_count": "2"
        }
      },
      {
        "label": "$120",
        "values": [
          "$18.00 ($138)",
          "$21.60 ($142)",
          "$24.00 ($144)",
          "$30.00 ($150)"
        ],
        "params": {
          "bill_amount": "120",
          "tip_percent": "18",
          "split_count": "2"
        }
      },
      {
        "label": "$200",
        "values": [
          "$30.00 ($230)",
          "$36.00 ($236)",
          "$40.00 ($240)",
          "$50.00 ($250)"
        ],
        "params": {
          "bill_amount": "200",
          "tip_percent": "18",
          "split_count": "2"
        }
      },
      {
        "label": "$350",
        "values": [
          "$52.50 ($402)",
          "$63.00 ($413)",
          "$70.00 ($420)",
          "$87.50 ($438)"
        ],
        "params": {
          "bill_amount": "350",
          "tip_percent": "18",
          "split_count": "2"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "40 €",
          "values": [
            "2,00 € (42 €)",
            "4,00 € (44 €)",
            "6,00 € (46 €)",
            "8,00 € (48 €)"
          ],
          "params": {
            "bill_amount": "40",
            "tip_percent": "10",
            "split_count": "2"
          }
        },
        {
          "label": "75 €",
          "values": [
            "3,75 € (79 €)",
            "7,50 € (83 €)",
            "11,25 € (86 €)",
            "15,00 € (90 €)"
          ],
          "params": {
            "bill_amount": "75",
            "tip_percent": "10",
            "split_count": "2"
          }
        },
        {
          "label": "120 €",
          "values": [
            "6,00 € (126 €)",
            "12,00 € (132 €)",
            "18,00 € (138 €)",
            "24,00 € (144 €)"
          ],
          "params": {
            "bill_amount": "120",
            "tip_percent": "10",
            "split_count": "2"
          }
        },
        {
          "label": "200 €",
          "values": [
            "10,00 € (210 €)",
            "20,00 € (220 €)",
            "30,00 € (230 €)",
            "40,00 € (240 €)"
          ],
          "params": {
            "bill_amount": "200",
            "tip_percent": "10",
            "split_count": "2"
          }
        },
        {
          "label": "350 €",
          "values": [
            "17,50 € (368 €)",
            "35,00 € (385 €)",
            "52,50 € (402 €)",
            "70,00 € (420 €)"
          ],
          "params": {
            "bill_amount": "350",
            "tip_percent": "10",
            "split_count": "2"
          }
        }
      ],
      "fr": [
        {
          "label": "40 €",
          "values": [
            "2,00 € (42 €)",
            "4,00 € (44 €)",
            "6,00 € (46 €)",
            "8,00 € (48 €)"
          ],
          "params": {
            "bill_amount": "40",
            "tip_percent": "10",
            "split_count": "2"
          }
        },
        {
          "label": "75 €",
          "values": [
            "3,75 € (79 €)",
            "7,50 € (83 €)",
            "11,25 € (86 €)",
            "15,00 € (90 €)"
          ],
          "params": {
            "bill_amount": "75",
            "tip_percent": "10",
            "split_count": "2"
          }
        },
        {
          "label": "120 €",
          "values": [
            "6,00 € (126 €)",
            "12,00 € (132 €)",
            "18,00 € (138 €)",
            "24,00 € (144 €)"
          ],
          "params": {
            "bill_amount": "120",
            "tip_percent": "10",
            "split_count": "2"
          }
        },
        {
          "label": "200 €",
          "values": [
            "10,00 € (210 €)",
            "20,00 € (220 €)",
            "30,00 € (230 €)",
            "40,00 € (240 €)"
          ],
          "params": {
            "bill_amount": "200",
            "tip_percent": "10",
            "split_count": "2"
          }
        },
        {
          "label": "350 €",
          "values": [
            "17,50 € (368 €)",
            "35,00 € (385 €)",
            "52,50 € (402 €)",
            "70,00 € (420 €)"
          ],
          "params": {
            "bill_amount": "350",
            "tip_percent": "10",
            "split_count": "2"
          }
        }
      ],
      "de": [
        {
          "label": "40 €",
          "values": [
            "2,00 € (42 €)",
            "4,00 € (44 €)",
            "6,00 € (46 €)",
            "8,00 € (48 €)"
          ],
          "params": {
            "bill_amount": "40",
            "tip_percent": "10",
            "split_count": "2"
          }
        },
        {
          "label": "75 €",
          "values": [
            "3,75 € (79 €)",
            "7,50 € (83 €)",
            "11,25 € (86 €)",
            "15,00 € (90 €)"
          ],
          "params": {
            "bill_amount": "75",
            "tip_percent": "10",
            "split_count": "2"
          }
        },
        {
          "label": "120 €",
          "values": [
            "6,00 € (126 €)",
            "12,00 € (132 €)",
            "18,00 € (138 €)",
            "24,00 € (144 €)"
          ],
          "params": {
            "bill_amount": "120",
            "tip_percent": "10",
            "split_count": "2"
          }
        },
        {
          "label": "200 €",
          "values": [
            "10,00 € (210 €)",
            "20,00 € (220 €)",
            "30,00 € (230 €)",
            "40,00 € (240 €)"
          ],
          "params": {
            "bill_amount": "200",
            "tip_percent": "10",
            "split_count": "2"
          }
        },
        {
          "label": "350 €",
          "values": [
            "17,50 € (368 €)",
            "35,00 € (385 €)",
            "52,50 € (402 €)",
            "70,00 € (420 €)"
          ],
          "params": {
            "bill_amount": "350",
            "tip_percent": "10",
            "split_count": "2"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "rental-property-calculator",
      "real-estate-calculator",
      "rent-vs-buy-calculator",
      "rent-calculator",
      "budget-calculator"
    ],
    "title": "Rental Property Cap Rate & Cash Flow Matrix (20% Down, 35% OpEx)",
    "description": "Investment benchmark comparing gross monthly rent, Net Operating Income (NOI), unlevered Cap Rate, and estimated monthly cash flow after a 30-year mortgage.",
    "headers": [
      "Purchase Price",
      "Monthly Rent",
      "Annual NOI (65%)",
      "Cap Rate",
      "Est. Monthly Cash Flow"
    ],
    "translations": {
      "es": {
        "title": "Matriz de Rentabilidad de Alquiler y Flujo de Caja (20 % Entrada)",
        "description": "Comparativa de alquiler mensual, ingreso operativo neto (NOI), Cap Rate y flujo de caja tras hipoteca al 3,9 %.",
        "headers": [
          "Precio Inmueble",
          "Alquiler Mensual",
          "NOI Anual (65 %)",
          "Cap Rate",
          "Flujo Mensual Est."
        ]
      },
      "fr": {
        "title": "Matrice de Rentabilité Locative et Cash-Flow (20 % Apport, 3,9 %)",
        "description": "Comparez loyer mensuel, revenu net d’exploitation (NOI), rendement net (Cap Rate) et cash-flow mensuel.",
        "headers": [
          "Prix d’Achat",
          "Loyer Mensuel",
          "NOI Annuel (65 %)",
          "Rendement Net",
          "Cash-Flow Mensuel"
        ]
      },
      "de": {
        "title": "Mietrendite- & Cashflow-Übersicht für Kapitalanlagen (20 % EK, 3,9 %)",
        "description": "Vergleich von Kaltmiete, Nettobetriebsergebnis (NOI), Nettomietrendite und monatlichem Cashflow nach Finanzierung.",
        "headers": [
          "Kaufpreis",
          "Monatsmiete",
          "Jahres-NOI (65 %)",
          "Nettorendite",
          "Cashflow / Monat"
        ]
      }
    },
    "rows": [
      {
        "label": "$250,000",
        "values": [
          "$2,200 / mo",
          "$17,160",
          "6.86%",
          "+$166 / mo"
        ],
        "params": {
          "property_price": "250000",
          "monthly_rent": "2200",
          "down_payment_percent": "20",
          "interest_rate": "6.5"
        }
      },
      {
        "label": "$350,000",
        "values": [
          "$2,900 / mo",
          "$22,620",
          "6.46%",
          "+$115 / mo"
        ],
        "params": {
          "property_price": "350000",
          "monthly_rent": "2900",
          "down_payment_percent": "20",
          "interest_rate": "6.5"
        }
      },
      {
        "label": "$500,000",
        "values": [
          "$4,000 / mo",
          "$31,200",
          "6.24%",
          "+$72 / mo"
        ],
        "params": {
          "property_price": "500000",
          "monthly_rent": "4000",
          "down_payment_percent": "20",
          "interest_rate": "6.5"
        }
      },
      {
        "label": "$750,000",
        "values": [
          "$5,800 / mo",
          "$45,240",
          "6.03%",
          "$-22 / mo"
        ],
        "params": {
          "property_price": "750000",
          "monthly_rent": "5800",
          "down_payment_percent": "20",
          "interest_rate": "6.5"
        }
      },
      {
        "label": "$1,000,000",
        "values": [
          "$7,500 / mo",
          "$58,500",
          "5.85%",
          "$-182 / mo"
        ],
        "params": {
          "property_price": "1000000",
          "monthly_rent": "7500",
          "down_payment_percent": "20",
          "interest_rate": "6.5"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "250.000 €",
          "values": [
            "2.200 € / mes",
            "17.160 €",
            "6,86%",
            "+487 € / mes"
          ],
          "params": {
            "property_price": "250000",
            "monthly_rent": "2200",
            "down_payment_percent": "20",
            "interest_rate": "3.9"
          }
        },
        {
          "label": "350.000 €",
          "values": [
            "2.900 € / mes",
            "22.620 €",
            "6,46%",
            "+564 € / mes"
          ],
          "params": {
            "property_price": "350000",
            "monthly_rent": "2900",
            "down_payment_percent": "20",
            "interest_rate": "3.9"
          }
        },
        {
          "label": "500.000 €",
          "values": [
            "4.000 € / mes",
            "31.200 €",
            "6,24%",
            "+713 € / mes"
          ],
          "params": {
            "property_price": "500000",
            "monthly_rent": "4000",
            "down_payment_percent": "20",
            "interest_rate": "3.9"
          }
        },
        {
          "label": "750.000 €",
          "values": [
            "5.800 € / mes",
            "45.240 €",
            "6,03%",
            "+940 € / mes"
          ],
          "params": {
            "property_price": "750000",
            "monthly_rent": "5800",
            "down_payment_percent": "20",
            "interest_rate": "3.9"
          }
        },
        {
          "label": "1.000.000 €",
          "values": [
            "7.500 € / mes",
            "58.500 €",
            "5,85%",
            "+1.102 € / mes"
          ],
          "params": {
            "property_price": "1000000",
            "monthly_rent": "7500",
            "down_payment_percent": "20",
            "interest_rate": "3.9"
          }
        }
      ],
      "fr": [
        {
          "label": "250 000 €",
          "values": [
            "2 200 € / mois",
            "17 160 €",
            "6,86 %",
            "+487 € / mois"
          ],
          "params": {
            "property_price": "250000",
            "monthly_rent": "2200",
            "down_payment_percent": "20",
            "interest_rate": "3.9"
          }
        },
        {
          "label": "350 000 €",
          "values": [
            "2 900 € / mois",
            "22 620 €",
            "6,46 %",
            "+564 € / mois"
          ],
          "params": {
            "property_price": "350000",
            "monthly_rent": "2900",
            "down_payment_percent": "20",
            "interest_rate": "3.9"
          }
        },
        {
          "label": "500 000 €",
          "values": [
            "4 000 € / mois",
            "31 200 €",
            "6,24 %",
            "+713 € / mois"
          ],
          "params": {
            "property_price": "500000",
            "monthly_rent": "4000",
            "down_payment_percent": "20",
            "interest_rate": "3.9"
          }
        },
        {
          "label": "750 000 €",
          "values": [
            "5 800 € / mois",
            "45 240 €",
            "6,03 %",
            "+940 € / mois"
          ],
          "params": {
            "property_price": "750000",
            "monthly_rent": "5800",
            "down_payment_percent": "20",
            "interest_rate": "3.9"
          }
        },
        {
          "label": "1 000 000 €",
          "values": [
            "7 500 € / mois",
            "58 500 €",
            "5,85 %",
            "+1 102 € / mois"
          ],
          "params": {
            "property_price": "1000000",
            "monthly_rent": "7500",
            "down_payment_percent": "20",
            "interest_rate": "3.9"
          }
        }
      ],
      "de": [
        {
          "label": "250.000 €",
          "values": [
            "2.200 € / Mon.",
            "17.160 €",
            "6,86 %",
            "+487 € / Mon."
          ],
          "params": {
            "property_price": "250000",
            "monthly_rent": "2200",
            "down_payment_percent": "20",
            "interest_rate": "3.9"
          }
        },
        {
          "label": "350.000 €",
          "values": [
            "2.900 € / Mon.",
            "22.620 €",
            "6,46 %",
            "+564 € / Mon."
          ],
          "params": {
            "property_price": "350000",
            "monthly_rent": "2900",
            "down_payment_percent": "20",
            "interest_rate": "3.9"
          }
        },
        {
          "label": "500.000 €",
          "values": [
            "4.000 € / Mon.",
            "31.200 €",
            "6,24 %",
            "+713 € / Mon."
          ],
          "params": {
            "property_price": "500000",
            "monthly_rent": "4000",
            "down_payment_percent": "20",
            "interest_rate": "3.9"
          }
        },
        {
          "label": "750.000 €",
          "values": [
            "5.800 € / Mon.",
            "45.240 €",
            "6,03 %",
            "+940 € / Mon."
          ],
          "params": {
            "property_price": "750000",
            "monthly_rent": "5800",
            "down_payment_percent": "20",
            "interest_rate": "3.9"
          }
        },
        {
          "label": "1.000.000 €",
          "values": [
            "7.500 € / Mon.",
            "58.500 €",
            "5,85 %",
            "+1.102 € / Mon."
          ],
          "params": {
            "property_price": "1000000",
            "monthly_rent": "7500",
            "down_payment_percent": "20",
            "interest_rate": "3.9"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "bond-calculator",
      "irr-calculator",
      "apr-calculator",
      "cash-back-vs-low-interest-calculator"
    ],
    "title": "10-Year Bond Price vs. Market Yield Sensitivity (5.0% Coupon, $1,000 Par)",
    "description": "Demonstrates the inverse relationship between market interest rates (YTM) and fair bond market price for a 10-year semi-annual 5% coupon bond.",
    "headers": [
      "Market Yield (YTM)",
      "Fair Bond Price",
      "Current Yield",
      "Premium / Discount",
      "Trading Status"
    ],
    "translations": {
      "es": {
        "title": "Sensibilidad del Precio de un Bono a 10 Años (Cupón 5,0 %, Nominal 1.000 €)",
        "description": "Relación inversa entre el rendimiento de mercado (TIR/YTM) y el precio justo de un bono semestral al 5 %.",
        "headers": [
          "Rendimiento (YTM)",
          "Precio Justo",
          "Rentabilidad Actual",
          "Prima / Descuento",
          "Cotización"
        ]
      },
      "fr": {
        "title": "Sensibilité Prix / Taux d’une Obligation 10 Ans (Coupon 5,0 %, 1 000 €)",
        "description": "Relation inverse entre le taux actuariel du marché (YTM) et la valeur d’une obligation à coupon fixe de 5 %.",
        "headers": [
          "Taux Marché (YTM)",
          "Prix Obligation",
          "Rendement Courant",
          "Prime / Décote",
          "Statut"
        ]
      },
      "de": {
        "title": "Anleihekurs-Sensitivität nach Marktrendite (10 J., 5,0 % Kupon, 1.000 €)",
        "description": "Zeigt die inverse Beziehung zwischen Marktzins (YTM) und fairem Anleihekurs bei 5 % Halbjahreskupon.",
        "headers": [
          "Marktrendite (YTM)",
          "Fairer Kurs",
          "Laufende Verzinsung",
          "Auf-/Abschlag",
          "Kursstatus"
        ]
      }
    },
    "rows": [
      {
        "label": "3.0%",
        "values": [
          "$1,171.69",
          "4.27%",
          "$171.69",
          "Premium"
        ],
        "params": {
          "face_value": "1000",
          "coupon_rate": "5.0",
          "yield_to_maturity": "3",
          "years_to_maturity": "10"
        }
      },
      {
        "label": "4.0%",
        "values": [
          "$1,081.76",
          "4.62%",
          "$81.76",
          "Premium"
        ],
        "params": {
          "face_value": "1000",
          "coupon_rate": "5.0",
          "yield_to_maturity": "4",
          "years_to_maturity": "10"
        }
      },
      {
        "label": "5.0%",
        "values": [
          "$1,000.00",
          "5.00%",
          "$0.00",
          "Par Value"
        ],
        "params": {
          "face_value": "1000",
          "coupon_rate": "5.0",
          "yield_to_maturity": "5",
          "years_to_maturity": "10"
        }
      },
      {
        "label": "6.0%",
        "values": [
          "$925.61",
          "5.40%",
          "$-74.39",
          "Discount"
        ],
        "params": {
          "face_value": "1000",
          "coupon_rate": "5.0",
          "yield_to_maturity": "6",
          "years_to_maturity": "10"
        }
      },
      {
        "label": "7.0%",
        "values": [
          "$857.88",
          "5.83%",
          "$-142.12",
          "Discount"
        ],
        "params": {
          "face_value": "1000",
          "coupon_rate": "5.0",
          "yield_to_maturity": "7",
          "years_to_maturity": "10"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "3,0%",
          "values": [
            "1.171,69 €",
            "4,27%",
            "171,69 €",
            "Con Prima"
          ],
          "params": {
            "face_value": "1000",
            "coupon_rate": "5.0",
            "yield_to_maturity": "3",
            "years_to_maturity": "10"
          }
        },
        {
          "label": "4,0%",
          "values": [
            "1.081,76 €",
            "4,62%",
            "81,76 €",
            "Con Prima"
          ],
          "params": {
            "face_value": "1000",
            "coupon_rate": "5.0",
            "yield_to_maturity": "4",
            "years_to_maturity": "10"
          }
        },
        {
          "label": "5,0%",
          "values": [
            "1.000,00 €",
            "5,00%",
            "0,00 €",
            "A la Par"
          ],
          "params": {
            "face_value": "1000",
            "coupon_rate": "5.0",
            "yield_to_maturity": "5",
            "years_to_maturity": "10"
          }
        },
        {
          "label": "6,0%",
          "values": [
            "925,61 €",
            "5,40%",
            "-74,39 €",
            "Con Descuento"
          ],
          "params": {
            "face_value": "1000",
            "coupon_rate": "5.0",
            "yield_to_maturity": "6",
            "years_to_maturity": "10"
          }
        },
        {
          "label": "7,0%",
          "values": [
            "857,88 €",
            "5,83%",
            "-142,12 €",
            "Con Descuento"
          ],
          "params": {
            "face_value": "1000",
            "coupon_rate": "5.0",
            "yield_to_maturity": "7",
            "years_to_maturity": "10"
          }
        }
      ],
      "fr": [
        {
          "label": "3,0 %",
          "values": [
            "1 171,69 €",
            "4,27 %",
            "171,69 €",
            "Au-dessus du Pair"
          ],
          "params": {
            "face_value": "1000",
            "coupon_rate": "5.0",
            "yield_to_maturity": "3",
            "years_to_maturity": "10"
          }
        },
        {
          "label": "4,0 %",
          "values": [
            "1 081,76 €",
            "4,62 %",
            "81,76 €",
            "Au-dessus du Pair"
          ],
          "params": {
            "face_value": "1000",
            "coupon_rate": "5.0",
            "yield_to_maturity": "4",
            "years_to_maturity": "10"
          }
        },
        {
          "label": "5,0 %",
          "values": [
            "1 000,00 €",
            "5,00 %",
            "0,00 €",
            "Au Pair"
          ],
          "params": {
            "face_value": "1000",
            "coupon_rate": "5.0",
            "yield_to_maturity": "5",
            "years_to_maturity": "10"
          }
        },
        {
          "label": "6,0 %",
          "values": [
            "925,61 €",
            "5,40 %",
            "-74,39 €",
            "Décote"
          ],
          "params": {
            "face_value": "1000",
            "coupon_rate": "5.0",
            "yield_to_maturity": "6",
            "years_to_maturity": "10"
          }
        },
        {
          "label": "7,0 %",
          "values": [
            "857,88 €",
            "5,83 %",
            "-142,12 €",
            "Décote"
          ],
          "params": {
            "face_value": "1000",
            "coupon_rate": "5.0",
            "yield_to_maturity": "7",
            "years_to_maturity": "10"
          }
        }
      ],
      "de": [
        {
          "label": "3,0 %",
          "values": [
            "1.171,69 €",
            "4,27 %",
            "171,69 €",
            "Über Pari"
          ],
          "params": {
            "face_value": "1000",
            "coupon_rate": "5.0",
            "yield_to_maturity": "3",
            "years_to_maturity": "10"
          }
        },
        {
          "label": "4,0 %",
          "values": [
            "1.081,76 €",
            "4,62 %",
            "81,76 €",
            "Über Pari"
          ],
          "params": {
            "face_value": "1000",
            "coupon_rate": "5.0",
            "yield_to_maturity": "4",
            "years_to_maturity": "10"
          }
        },
        {
          "label": "5,0 %",
          "values": [
            "1.000,00 €",
            "5,00 %",
            "0,00 €",
            "Zu Pari"
          ],
          "params": {
            "face_value": "1000",
            "coupon_rate": "5.0",
            "yield_to_maturity": "5",
            "years_to_maturity": "10"
          }
        },
        {
          "label": "6,0 %",
          "values": [
            "925,61 €",
            "5,40 %",
            "-74,39 €",
            "Unter Pari"
          ],
          "params": {
            "face_value": "1000",
            "coupon_rate": "5.0",
            "yield_to_maturity": "6",
            "years_to_maturity": "10"
          }
        },
        {
          "label": "7,0 %",
          "values": [
            "857,88 €",
            "5,83 %",
            "-142,12 €",
            "Unter Pari"
          ],
          "params": {
            "face_value": "1000",
            "coupon_rate": "5.0",
            "yield_to_maturity": "7",
            "years_to_maturity": "10"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "income-tax-calculator",
      "marriage-tax-calculator",
      "estate-tax-calculator"
    ],
    "title": "Progressive Federal Income Tax: Marginal vs. Effective Rate Benchmark",
    "description": "Illustrates why progressive tax brackets produce a much lower effective average tax rate than your top marginal bracket (single filer standard deduction benchmark).",
    "headers": [
      "Gross Income",
      "Top Marginal Bracket",
      "Est. Federal Tax",
      "Effective Rate",
      "After-Federal Net"
    ],
    "translations": {
      "es": {
        "title": "Impuesto Progresivo sobre la Renta: Tipo Marginal vs. Efectivo",
        "description": "Comparación ilustrativa entre el tipo marginal del último tramo y el tipo efectivo real promedio sobre el ingreso bruto.",
        "headers": [
          "Ingreso Bruto",
          "Tramo Marginal",
          "Impuesto Est.",
          "Tipo Efectivo",
          "Neto Estimado"
        ]
      },
      "fr": {
        "title": "Impôt Progressif sur le Revenu : Taux Marginal vs Taux Moyen",
        "description": "Illustration de l’écart entre la tranche marginale d’imposition (TMI) et le taux moyen effectif.",
        "headers": [
          "Revenu Brut",
          "Tranche Marginale",
          "Impôt Est.",
          "Taux Moyen",
          "Revenu Après Impôt"
        ]
      },
      "de": {
        "title": "Progressiver Steuertarif: Grenzsteuersatz vs. Durchschnittssteuersatz",
        "description": "Zeigt anschaulich, warum der effektive Durchschnittssteuersatz deutlich unter dem Spitzen-Grenzsteuersatz liegt.",
        "headers": [
          "Jahresbrutto",
          "Grenzsteuersatz",
          "Geschätzte Steuer",
          "Effektivsatz",
          "Netto nach Steuer"
        ]
      }
    },
    "rows": [
      {
        "label": "$50,000",
        "values": [
          "12%",
          "$3,867",
          "7.7%",
          "$46,133"
        ],
        "params": {
          "annual_income": "50000",
          "filing_status": "single"
        }
      },
      {
        "label": "$85,000",
        "values": [
          "22%",
          "$10,047",
          "11.8%",
          "$74,953"
        ],
        "params": {
          "annual_income": "85000",
          "filing_status": "single"
        }
      },
      {
        "label": "$125,000",
        "values": [
          "24%",
          "$18,918",
          "15.1%",
          "$106,082"
        ],
        "params": {
          "annual_income": "125000",
          "filing_status": "single"
        }
      },
      {
        "label": "$200,000",
        "values": [
          "24%",
          "$36,918",
          "18.5%",
          "$163,082"
        ],
        "params": {
          "annual_income": "200000",
          "filing_status": "single"
        }
      },
      {
        "label": "$350,000",
        "values": [
          "35%",
          "$85,857",
          "24.5%",
          "$264,143"
        ],
        "params": {
          "annual_income": "350000",
          "filing_status": "single"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "50.000 €",
          "values": [
            "12%",
            "3.867 €",
            "7,7%",
            "46.133 €"
          ],
          "params": {
            "annual_income": "50000",
            "filing_status": "single"
          }
        },
        {
          "label": "85.000 €",
          "values": [
            "22%",
            "10.047 €",
            "11,8%",
            "74.953 €"
          ],
          "params": {
            "annual_income": "85000",
            "filing_status": "single"
          }
        },
        {
          "label": "125.000 €",
          "values": [
            "24%",
            "18.918 €",
            "15,1%",
            "106.082 €"
          ],
          "params": {
            "annual_income": "125000",
            "filing_status": "single"
          }
        },
        {
          "label": "200.000 €",
          "values": [
            "24%",
            "36.918 €",
            "18,5%",
            "163.082 €"
          ],
          "params": {
            "annual_income": "200000",
            "filing_status": "single"
          }
        },
        {
          "label": "350.000 €",
          "values": [
            "35%",
            "85.857 €",
            "24,5%",
            "264.143 €"
          ],
          "params": {
            "annual_income": "350000",
            "filing_status": "single"
          }
        }
      ],
      "fr": [
        {
          "label": "50 000 €",
          "values": [
            "12 %",
            "3 867 €",
            "7,7 %",
            "46 133 €"
          ],
          "params": {
            "annual_income": "50000",
            "filing_status": "single"
          }
        },
        {
          "label": "85 000 €",
          "values": [
            "22 %",
            "10 047 €",
            "11,8 %",
            "74 953 €"
          ],
          "params": {
            "annual_income": "85000",
            "filing_status": "single"
          }
        },
        {
          "label": "125 000 €",
          "values": [
            "24 %",
            "18 918 €",
            "15,1 %",
            "106 082 €"
          ],
          "params": {
            "annual_income": "125000",
            "filing_status": "single"
          }
        },
        {
          "label": "200 000 €",
          "values": [
            "24 %",
            "36 918 €",
            "18,5 %",
            "163 082 €"
          ],
          "params": {
            "annual_income": "200000",
            "filing_status": "single"
          }
        },
        {
          "label": "350 000 €",
          "values": [
            "35 %",
            "85 857 €",
            "24,5 %",
            "264 143 €"
          ],
          "params": {
            "annual_income": "350000",
            "filing_status": "single"
          }
        }
      ],
      "de": [
        {
          "label": "50.000 €",
          "values": [
            "12 %",
            "3.867 €",
            "7,7 %",
            "46.133 €"
          ],
          "params": {
            "annual_income": "50000",
            "filing_status": "single"
          }
        },
        {
          "label": "85.000 €",
          "values": [
            "22 %",
            "10.047 €",
            "11,8 %",
            "74.953 €"
          ],
          "params": {
            "annual_income": "85000",
            "filing_status": "single"
          }
        },
        {
          "label": "125.000 €",
          "values": [
            "24 %",
            "18.918 €",
            "15,1 %",
            "106.082 €"
          ],
          "params": {
            "annual_income": "125000",
            "filing_status": "single"
          }
        },
        {
          "label": "200.000 €",
          "values": [
            "24 %",
            "36.918 €",
            "18,5 %",
            "163.082 €"
          ],
          "params": {
            "annual_income": "200000",
            "filing_status": "single"
          }
        },
        {
          "label": "350.000 €",
          "values": [
            "35 %",
            "85.857 €",
            "24,5 %",
            "264.143 €"
          ],
          "params": {
            "annual_income": "350000",
            "filing_status": "single"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "commission-calculator"
    ],
    "title": "Sales Commission Payout Reference Table (3% – 12% Rates)",
    "description": "Quick gross commission earnings across common SaaS, B2B, and real estate commission tiers.",
    "headers": [
      "Closed Sales Volume",
      "3% Rate",
      "5% Rate",
      "8% Rate",
      "12% Rate"
    ],
    "translations": {
      "es": {
        "title": "Tabla de Comisiones de Ventas por Volumen (3 % – 12 %)",
        "description": "Comisión bruta obtenida según volumen de ventas cerradas en los tramos comerciales más habituales.",
        "headers": [
          "Volumen de Ventas",
          "Tasa 3 %",
          "Tasa 5 %",
          "Tasa 8 %",
          "Tasa 12 %"
        ]
      },
      "fr": {
        "title": "Barème de Commissions Commerciales sur Ventes (3 % – 12 %)",
        "description": "Montant brut des commissions perçues selon le chiffre d’affaires réalisé.",
        "headers": [
          "Chiffre d’Affaires",
          "Taux 3 %",
          "Taux 5 %",
          "Taux 8 %",
          "Taux 12 %"
        ]
      },
      "de": {
        "title": "Verkaufsprovisions-Übersichtstabelle (3 % – 12 %)",
        "description": "Brutto-Provisionsansprüche bei gängigen Vertriebs-, Immobilien- und B2B-Provisionssätzen.",
        "headers": [
          "Umsatzvolumen",
          "3 % Provision",
          "5 % Provision",
          "8 % Provision",
          "12 % Provision"
        ]
      }
    },
    "rows": [
      {
        "label": "$25,000",
        "values": [
          "$750",
          "$1,250",
          "$2,000",
          "$3,000"
        ],
        "params": {
          "sales_amount": "25000",
          "commission_rate": "8"
        }
      },
      {
        "label": "$50,000",
        "values": [
          "$1,500",
          "$2,500",
          "$4,000",
          "$6,000"
        ],
        "params": {
          "sales_amount": "50000",
          "commission_rate": "8"
        }
      },
      {
        "label": "$100,000",
        "values": [
          "$3,000",
          "$5,000",
          "$8,000",
          "$12,000"
        ],
        "params": {
          "sales_amount": "100000",
          "commission_rate": "8"
        }
      },
      {
        "label": "$250,000",
        "values": [
          "$7,500",
          "$12,500",
          "$20,000",
          "$30,000"
        ],
        "params": {
          "sales_amount": "250000",
          "commission_rate": "8"
        }
      },
      {
        "label": "$500,000",
        "values": [
          "$15,000",
          "$25,000",
          "$40,000",
          "$60,000"
        ],
        "params": {
          "sales_amount": "500000",
          "commission_rate": "8"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "25.000 €",
          "values": [
            "750 €",
            "1.250 €",
            "2.000 €",
            "3.000 €"
          ],
          "params": {
            "sales_amount": "25000",
            "commission_rate": "8"
          }
        },
        {
          "label": "50.000 €",
          "values": [
            "1.500 €",
            "2.500 €",
            "4.000 €",
            "6.000 €"
          ],
          "params": {
            "sales_amount": "50000",
            "commission_rate": "8"
          }
        },
        {
          "label": "100.000 €",
          "values": [
            "3.000 €",
            "5.000 €",
            "8.000 €",
            "12.000 €"
          ],
          "params": {
            "sales_amount": "100000",
            "commission_rate": "8"
          }
        },
        {
          "label": "250.000 €",
          "values": [
            "7.500 €",
            "12.500 €",
            "20.000 €",
            "30.000 €"
          ],
          "params": {
            "sales_amount": "250000",
            "commission_rate": "8"
          }
        },
        {
          "label": "500.000 €",
          "values": [
            "15.000 €",
            "25.000 €",
            "40.000 €",
            "60.000 €"
          ],
          "params": {
            "sales_amount": "500000",
            "commission_rate": "8"
          }
        }
      ],
      "fr": [
        {
          "label": "25 000 €",
          "values": [
            "750 €",
            "1 250 €",
            "2 000 €",
            "3 000 €"
          ],
          "params": {
            "sales_amount": "25000",
            "commission_rate": "8"
          }
        },
        {
          "label": "50 000 €",
          "values": [
            "1 500 €",
            "2 500 €",
            "4 000 €",
            "6 000 €"
          ],
          "params": {
            "sales_amount": "50000",
            "commission_rate": "8"
          }
        },
        {
          "label": "100 000 €",
          "values": [
            "3 000 €",
            "5 000 €",
            "8 000 €",
            "12 000 €"
          ],
          "params": {
            "sales_amount": "100000",
            "commission_rate": "8"
          }
        },
        {
          "label": "250 000 €",
          "values": [
            "7 500 €",
            "12 500 €",
            "20 000 €",
            "30 000 €"
          ],
          "params": {
            "sales_amount": "250000",
            "commission_rate": "8"
          }
        },
        {
          "label": "500 000 €",
          "values": [
            "15 000 €",
            "25 000 €",
            "40 000 €",
            "60 000 €"
          ],
          "params": {
            "sales_amount": "500000",
            "commission_rate": "8"
          }
        }
      ],
      "de": [
        {
          "label": "25.000 €",
          "values": [
            "750 €",
            "1.250 €",
            "2.000 €",
            "3.000 €"
          ],
          "params": {
            "sales_amount": "25000",
            "commission_rate": "8"
          }
        },
        {
          "label": "50.000 €",
          "values": [
            "1.500 €",
            "2.500 €",
            "4.000 €",
            "6.000 €"
          ],
          "params": {
            "sales_amount": "50000",
            "commission_rate": "8"
          }
        },
        {
          "label": "100.000 €",
          "values": [
            "3.000 €",
            "5.000 €",
            "8.000 €",
            "12.000 €"
          ],
          "params": {
            "sales_amount": "100000",
            "commission_rate": "8"
          }
        },
        {
          "label": "250.000 €",
          "values": [
            "7.500 €",
            "12.500 €",
            "20.000 €",
            "30.000 €"
          ],
          "params": {
            "sales_amount": "250000",
            "commission_rate": "8"
          }
        },
        {
          "label": "500.000 €",
          "values": [
            "15.000 €",
            "25.000 €",
            "40.000 €",
            "60.000 €"
          ],
          "params": {
            "sales_amount": "500000",
            "commission_rate": "8"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "zakat-calculator"
    ],
    "title": "Annual Zakat Obligation Reference Table (2.5% of Net Zakatable Wealth)",
    "description": "Annual and monthly equivalent Zakat due (1/40th = 2.5%) for net zakatable wealth held above Nisab for one full lunar year (Hawl).",
    "headers": [
      "Net Zakatable Wealth",
      "Annual Zakat (2.5%)",
      "Monthly Equivalent",
      "Remaining Wealth (97.5%)"
    ],
    "translations": {
      "es": {
        "title": "Tabla de Referencia del Zakat Anual (2,5 % del Patrimonio Neto)",
        "description": "Importe anual y equivalente mensual de Zakat (2,5 %) para patrimonio elegible superior al umbral Nisab.",
        "headers": [
          "Patrimonio Neto Elegible",
          "Zakat Anual (2,5 %)",
          "Equivalente Mensual",
          "Patrimonio Restante"
        ]
      },
      "fr": {
        "title": "Barème de la Zakat Annuelle (2,5 % du Patrimoine Éligible)",
        "description": "Montant annuel et équivalent mensuel de la Zakat (1/40e) pour un patrimoine net dépassant le Nisab sur un an lunaire.",
        "headers": [
          "Patrimoine Net Éligible",
          "Zakat Annuelle (2,5 %)",
          "Équivalent Mensuel",
          "Patrimoine Restant"
        ]
      },
      "de": {
        "title": "Zakat-Referenztabelle (2,5 % des Nettovermögens über Nisab)",
        "description": "Jährliche Zakat-Abgabe (2,5 %) und monatlicher Richtwert für Vermögen oberhalb der Nisab-Grenze nach einem Mondjahr.",
        "headers": [
          "Zakat-pflichtiges Netto",
          "Jährliche Zakat (2,5 %)",
          "Monatlicher Anteil",
          "Verbleibendes Vermögen"
        ]
      }
    },
    "rows": [
      {
        "label": "$10,000",
        "values": [
          "$250",
          "$20.83",
          "$9,750"
        ],
        "params": {
          "net_wealth": "10000"
        }
      },
      {
        "label": "$25,000",
        "values": [
          "$625",
          "$52.08",
          "$24,375"
        ],
        "params": {
          "net_wealth": "25000"
        }
      },
      {
        "label": "$50,000",
        "values": [
          "$1,250",
          "$104.17",
          "$48,750"
        ],
        "params": {
          "net_wealth": "50000"
        }
      },
      {
        "label": "$100,000",
        "values": [
          "$2,500",
          "$208.33",
          "$97,500"
        ],
        "params": {
          "net_wealth": "100000"
        }
      },
      {
        "label": "$250,000",
        "values": [
          "$6,250",
          "$520.83",
          "$243,750"
        ],
        "params": {
          "net_wealth": "250000"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "10.000 €",
          "values": [
            "250 €",
            "20,83 €",
            "9.750 €"
          ],
          "params": {
            "net_wealth": "10000"
          }
        },
        {
          "label": "25.000 €",
          "values": [
            "625 €",
            "52,08 €",
            "24.375 €"
          ],
          "params": {
            "net_wealth": "25000"
          }
        },
        {
          "label": "50.000 €",
          "values": [
            "1.250 €",
            "104,17 €",
            "48.750 €"
          ],
          "params": {
            "net_wealth": "50000"
          }
        },
        {
          "label": "100.000 €",
          "values": [
            "2.500 €",
            "208,33 €",
            "97.500 €"
          ],
          "params": {
            "net_wealth": "100000"
          }
        },
        {
          "label": "250.000 €",
          "values": [
            "6.250 €",
            "520,83 €",
            "243.750 €"
          ],
          "params": {
            "net_wealth": "250000"
          }
        }
      ],
      "fr": [
        {
          "label": "10 000 €",
          "values": [
            "250 €",
            "20,83 €",
            "9 750 €"
          ],
          "params": {
            "net_wealth": "10000"
          }
        },
        {
          "label": "25 000 €",
          "values": [
            "625 €",
            "52,08 €",
            "24 375 €"
          ],
          "params": {
            "net_wealth": "25000"
          }
        },
        {
          "label": "50 000 €",
          "values": [
            "1 250 €",
            "104,17 €",
            "48 750 €"
          ],
          "params": {
            "net_wealth": "50000"
          }
        },
        {
          "label": "100 000 €",
          "values": [
            "2 500 €",
            "208,33 €",
            "97 500 €"
          ],
          "params": {
            "net_wealth": "100000"
          }
        },
        {
          "label": "250 000 €",
          "values": [
            "6 250 €",
            "520,83 €",
            "243 750 €"
          ],
          "params": {
            "net_wealth": "250000"
          }
        }
      ],
      "de": [
        {
          "label": "10.000 €",
          "values": [
            "250 €",
            "20,83 €",
            "9.750 €"
          ],
          "params": {
            "net_wealth": "10000"
          }
        },
        {
          "label": "25.000 €",
          "values": [
            "625 €",
            "52,08 €",
            "24.375 €"
          ],
          "params": {
            "net_wealth": "25000"
          }
        },
        {
          "label": "50.000 €",
          "values": [
            "1.250 €",
            "104,17 €",
            "48.750 €"
          ],
          "params": {
            "net_wealth": "50000"
          }
        },
        {
          "label": "100.000 €",
          "values": [
            "2.500 €",
            "208,33 €",
            "97.500 €"
          ],
          "params": {
            "net_wealth": "100000"
          }
        },
        {
          "label": "250.000 €",
          "values": [
            "6.250 €",
            "520,83 €",
            "243.750 €"
          ],
          "params": {
            "net_wealth": "250000"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "depreciation-calculator"
    ],
    "title": "Asset Depreciation Benchmark Table (10% Salvage Value)",
    "description": "Annual straight-line vs. Year-1 Double-Declining Balance (DDB) depreciation write-offs for business equipment and vehicles.",
    "headers": [
      "Asset Purchase Cost",
      "10% Salvage",
      "5-Yr Straight-Line / Yr",
      "5-Yr DDB (Year 1)",
      "10-Yr Straight-Line / Yr"
    ],
    "translations": {
      "es": {
        "title": "Tabla de Depreciación de Activos (10 % Valor Residual)",
        "description": "Comparación de cuotas anuales lineales frente al primer año de saldo decreciente doble (DDB) para activos fijos.",
        "headers": [
          "Costo del Activo",
          "Residual (10 %)",
          "Lineal 5 Años / Año",
          "DDB 5 Años (Año 1)",
          "Lineal 10 Años / Año"
        ]
      },
      "fr": {
        "title": "Tableau d’Amortissement d’Actifs (Valeur Résiduelle 10 %)",
        "description": "Dotations annuelles en amortissement linéaire (5 et 10 ans) comparées à la 1re année en dégressif accéléré.",
        "headers": [
          "Coût d’Acquisition",
          "Résiduelle (10 %)",
          "Linéaire 5 Ans / An",
          "Dégressif 5 Ans (An 1)",
          "Linéaire 10 Ans / An"
        ]
      },
      "de": {
        "title": "Abschreibungstabelle (AfA) bei 10 % Restwert",
        "description": "Jährliche lineare Abschreibung über 5 und 10 Jahre im Vergleich zum ersten Jahr der degressiven Abschreibung.",
        "headers": [
          "Anschaffungskosten",
          "Restwert (10 %)",
          "Linear 5 J. / Jahr",
          "Degressiv 5 J. (J. 1)",
          "Linear 10 J. / Jahr"
        ]
      }
    },
    "rows": [
      {
        "label": "$10,000",
        "values": [
          "$1,000",
          "$1,800",
          "$4,000",
          "$900"
        ],
        "params": {
          "asset_cost": "10000",
          "salvage_value": "1000",
          "useful_life": "5"
        }
      },
      {
        "label": "$25,000",
        "values": [
          "$2,500",
          "$4,500",
          "$10,000",
          "$2,250"
        ],
        "params": {
          "asset_cost": "25000",
          "salvage_value": "2500",
          "useful_life": "5"
        }
      },
      {
        "label": "$50,000",
        "values": [
          "$5,000",
          "$9,000",
          "$20,000",
          "$4,500"
        ],
        "params": {
          "asset_cost": "50000",
          "salvage_value": "5000",
          "useful_life": "5"
        }
      },
      {
        "label": "$100,000",
        "values": [
          "$10,000",
          "$18,000",
          "$40,000",
          "$9,000"
        ],
        "params": {
          "asset_cost": "100000",
          "salvage_value": "10000",
          "useful_life": "5"
        }
      },
      {
        "label": "$250,000",
        "values": [
          "$25,000",
          "$45,000",
          "$100,000",
          "$22,500"
        ],
        "params": {
          "asset_cost": "250000",
          "salvage_value": "25000",
          "useful_life": "5"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "10.000 €",
          "values": [
            "1.000 €",
            "1.800 €",
            "4.000 €",
            "900 €"
          ],
          "params": {
            "asset_cost": "10000",
            "salvage_value": "1000",
            "useful_life": "5"
          }
        },
        {
          "label": "25.000 €",
          "values": [
            "2.500 €",
            "4.500 €",
            "10.000 €",
            "2.250 €"
          ],
          "params": {
            "asset_cost": "25000",
            "salvage_value": "2500",
            "useful_life": "5"
          }
        },
        {
          "label": "50.000 €",
          "values": [
            "5.000 €",
            "9.000 €",
            "20.000 €",
            "4.500 €"
          ],
          "params": {
            "asset_cost": "50000",
            "salvage_value": "5000",
            "useful_life": "5"
          }
        },
        {
          "label": "100.000 €",
          "values": [
            "10.000 €",
            "18.000 €",
            "40.000 €",
            "9.000 €"
          ],
          "params": {
            "asset_cost": "100000",
            "salvage_value": "10000",
            "useful_life": "5"
          }
        },
        {
          "label": "250.000 €",
          "values": [
            "25.000 €",
            "45.000 €",
            "100.000 €",
            "22.500 €"
          ],
          "params": {
            "asset_cost": "250000",
            "salvage_value": "25000",
            "useful_life": "5"
          }
        }
      ],
      "fr": [
        {
          "label": "10 000 €",
          "values": [
            "1 000 €",
            "1 800 €",
            "4 000 €",
            "900 €"
          ],
          "params": {
            "asset_cost": "10000",
            "salvage_value": "1000",
            "useful_life": "5"
          }
        },
        {
          "label": "25 000 €",
          "values": [
            "2 500 €",
            "4 500 €",
            "10 000 €",
            "2 250 €"
          ],
          "params": {
            "asset_cost": "25000",
            "salvage_value": "2500",
            "useful_life": "5"
          }
        },
        {
          "label": "50 000 €",
          "values": [
            "5 000 €",
            "9 000 €",
            "20 000 €",
            "4 500 €"
          ],
          "params": {
            "asset_cost": "50000",
            "salvage_value": "5000",
            "useful_life": "5"
          }
        },
        {
          "label": "100 000 €",
          "values": [
            "10 000 €",
            "18 000 €",
            "40 000 €",
            "9 000 €"
          ],
          "params": {
            "asset_cost": "100000",
            "salvage_value": "10000",
            "useful_life": "5"
          }
        },
        {
          "label": "250 000 €",
          "values": [
            "25 000 €",
            "45 000 €",
            "100 000 €",
            "22 500 €"
          ],
          "params": {
            "asset_cost": "250000",
            "salvage_value": "25000",
            "useful_life": "5"
          }
        }
      ],
      "de": [
        {
          "label": "10.000 €",
          "values": [
            "1.000 €",
            "1.800 €",
            "4.000 €",
            "900 €"
          ],
          "params": {
            "asset_cost": "10000",
            "salvage_value": "1000",
            "useful_life": "5"
          }
        },
        {
          "label": "25.000 €",
          "values": [
            "2.500 €",
            "4.500 €",
            "10.000 €",
            "2.250 €"
          ],
          "params": {
            "asset_cost": "25000",
            "salvage_value": "2500",
            "useful_life": "5"
          }
        },
        {
          "label": "50.000 €",
          "values": [
            "5.000 €",
            "9.000 €",
            "20.000 €",
            "4.500 €"
          ],
          "params": {
            "asset_cost": "50000",
            "salvage_value": "5000",
            "useful_life": "5"
          }
        },
        {
          "label": "100.000 €",
          "values": [
            "10.000 €",
            "18.000 €",
            "40.000 €",
            "9.000 €"
          ],
          "params": {
            "asset_cost": "100000",
            "salvage_value": "10000",
            "useful_life": "5"
          }
        },
        {
          "label": "250.000 €",
          "values": [
            "25.000 €",
            "45.000 €",
            "100.000 €",
            "22.500 €"
          ],
          "params": {
            "asset_cost": "250000",
            "salvage_value": "25000",
            "useful_life": "5"
          }
        }
      ]
    }
  }
];
