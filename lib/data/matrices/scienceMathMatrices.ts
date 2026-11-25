// ═══════════════════════════════════════════════════════════════════════
// lib/data/matrices/scienceMathMatrices.ts
// 25 mathematically verified, 4-language (EN / ES / FR / DE) Electrical,
// Physics, Chemistry, Statistics, Math & Utility Featured Snippet matrices.
// ═══════════════════════════════════════════════════════════════════════

import type { CalculatorMatrixDef } from './types';

export const scienceMathMatrices: CalculatorMatrixDef[] = [
  {
    "slugs": [
      "electricity-cost-calculator",
      "electrical-energy-calculator"
    ],
    "title": "Home Appliance Electricity Usage & Cost Table ($0.16 / kWh U.S. Avg)",
    "description": "Monthly kilowatt-hour consumption, monthly operating cost, and annual electric bill impact for common household devices.",
    "headers": [
      "Appliance & Duty Cycle",
      "Monthly kWh",
      "Monthly Cost",
      "Annual Cost"
    ],
    "translations": {
      "es": {
        "title": "Tabla de Consumo Eléctrico y Coste por Electrodoméstico (0,22 €/kWh)",
        "description": "Consumo mensual en kWh y gasto estimado mensual y anual con una tarifa eléctrica media de 0,22 €/kWh.",
        "headers": [
          "Electrodoméstico y Uso",
          "kWh / Mes",
          "Coste Mensual",
          "Coste Anual"
        ]
      },
      "fr": {
        "title": "Coût Électrique des Appareils Ménagers (Tarif Réglementé 0,25 €/kWh)",
        "description": "Consommation mensuelle en kWh et coût estimé par mois et par an au tarif de référence de 0,25 €/kWh.",
        "headers": [
          "Appareil & Usage",
          "kWh / Mois",
          "Coût Mensuel",
          "Coût Annuel"
        ]
      },
      "de": {
        "title": "Stromverbrauch & Stromkosten-Tabelle für Haushaltsgeräte (0,35 €/kWh)",
        "description": "Monatlicher kWh-Verbrauch sowie monatliche und jährliche Stromkosten bei einem deutschen Durchschnittspreis von 0,35 €/kWh.",
        "headers": [
          "Gerät & Laufzeit",
          "kWh / Monat",
          "Kosten / Monat",
          "Kosten / Jahr"
        ]
      }
    },
    "rows": [
      {
        "label": "LED Bulb (10 W · 6 h/d)",
        "values": [
          "1.8 kWh",
          "$0.29",
          "$3.50"
        ],
        "params": {
          "watts": "10",
          "hours_per_day": "6",
          "rate_per_kwh": "0.16"
        }
      },
      {
        "label": "Gaming PC (450 W · 4 h/d)",
        "values": [
          "54.0 kWh",
          "$8.64",
          "$105.12"
        ],
        "params": {
          "watts": "450",
          "hours_per_day": "4",
          "rate_per_kwh": "0.16"
        }
      },
      {
        "label": "Refrigerator (150 W avg · 24 h/d)",
        "values": [
          "108.0 kWh",
          "$17.28",
          "$210.24"
        ],
        "params": {
          "watts": "150",
          "hours_per_day": "24",
          "rate_per_kwh": "0.16"
        }
      },
      {
        "label": "Space Heater (1,500 W · 5 h/d)",
        "values": [
          "225.0 kWh",
          "$36.00",
          "$438.00"
        ],
        "params": {
          "watts": "1500",
          "hours_per_day": "5",
          "rate_per_kwh": "0.16"
        }
      },
      {
        "label": "Central AC / Heat Pump (3,000 W · 6 h/d)",
        "values": [
          "540.0 kWh",
          "$86.40",
          "$1,051.20"
        ],
        "params": {
          "watts": "3000",
          "hours_per_day": "6",
          "rate_per_kwh": "0.16"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "Bombilla LED (10 W · 6 h/d)",
          "values": [
            "1,8 kWh",
            "0,40 €",
            "4,82 €"
          ],
          "params": {
            "watts": "10",
            "hours_per_day": "6",
            "rate_per_kwh": "0.22"
          }
        },
        {
          "label": "PC Gaming (450 W · 4 h/d)",
          "values": [
            "54,0 kWh",
            "11,88 €",
            "144,54 €"
          ],
          "params": {
            "watts": "450",
            "hours_per_day": "4",
            "rate_per_kwh": "0.22"
          }
        },
        {
          "label": "Frigorífico (150 W · 24 h/d)",
          "values": [
            "108,0 kWh",
            "23,76 €",
            "289,08 €"
          ],
          "params": {
            "watts": "150",
            "hours_per_day": "24",
            "rate_per_kwh": "0.22"
          }
        },
        {
          "label": "Calefactor (1.500 W · 5 h/d)",
          "values": [
            "225,0 kWh",
            "49,50 €",
            "602,25 €"
          ],
          "params": {
            "watts": "1500",
            "hours_per_day": "5",
            "rate_per_kwh": "0.22"
          }
        },
        {
          "label": "Aire Acond. / Bomba (3.000 W · 6 h/d)",
          "values": [
            "540,0 kWh",
            "118,80 €",
            "1.445,40 €"
          ],
          "params": {
            "watts": "3000",
            "hours_per_day": "6",
            "rate_per_kwh": "0.22"
          }
        }
      ],
      "fr": [
        {
          "label": "Ampoule LED (10 W · 6 h/j)",
          "values": [
            "1,8 kWh",
            "0,45 €",
            "5,47 €"
          ],
          "params": {
            "watts": "10",
            "hours_per_day": "6",
            "rate_per_kwh": "0.25"
          }
        },
        {
          "label": "PC Gaming (450 W · 4 h/j)",
          "values": [
            "54,0 kWh",
            "13,50 €",
            "164,25 €"
          ],
          "params": {
            "watts": "450",
            "hours_per_day": "4",
            "rate_per_kwh": "0.25"
          }
        },
        {
          "label": "Réfrigérateur (150 W · 24 h/j)",
          "values": [
            "108,0 kWh",
            "27,00 €",
            "328,50 €"
          ],
          "params": {
            "watts": "150",
            "hours_per_day": "24",
            "rate_per_kwh": "0.25"
          }
        },
        {
          "label": "Radiateur (1 500 W · 5 h/j)",
          "values": [
            "225,0 kWh",
            "56,25 €",
            "684,38 €"
          ],
          "params": {
            "watts": "1500",
            "hours_per_day": "5",
            "rate_per_kwh": "0.25"
          }
        },
        {
          "label": "Climatisation / PAC (3 000 W · 6 h/j)",
          "values": [
            "540,0 kWh",
            "135,00 €",
            "1 642,50 €"
          ],
          "params": {
            "watts": "3000",
            "hours_per_day": "6",
            "rate_per_kwh": "0.25"
          }
        }
      ],
      "de": [
        {
          "label": "LED-Lampe (10 W · 6 Std./T)",
          "values": [
            "1,8 kWh",
            "0,63 €",
            "7,66 €"
          ],
          "params": {
            "watts": "10",
            "hours_per_day": "6",
            "rate_per_kwh": "0.35"
          }
        },
        {
          "label": "Gaming-PC (450 W · 4 Std./T)",
          "values": [
            "54,0 kWh",
            "18,90 €",
            "229,95 €"
          ],
          "params": {
            "watts": "450",
            "hours_per_day": "4",
            "rate_per_kwh": "0.35"
          }
        },
        {
          "label": "Kühlschrank (150 W · 24 Std./T)",
          "values": [
            "108,0 kWh",
            "37,80 €",
            "459,90 €"
          ],
          "params": {
            "watts": "150",
            "hours_per_day": "24",
            "rate_per_kwh": "0.35"
          }
        },
        {
          "label": "Heizlüfter (1.500 W · 5 Std./T)",
          "values": [
            "225,0 kWh",
            "78,75 €",
            "958,12 €"
          ],
          "params": {
            "watts": "1500",
            "hours_per_day": "5",
            "rate_per_kwh": "0.35"
          }
        },
        {
          "label": "Klimaanlage / WP (3.000 W · 6 Std./T)",
          "values": [
            "540,0 kWh",
            "189,00 €",
            "2.299,50 €"
          ],
          "params": {
            "watts": "3000",
            "hours_per_day": "6",
            "rate_per_kwh": "0.35"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "ohms-law-calculator",
      "voltage-calculator",
      "current-calculator",
      "resistance-calculator"
    ],
    "title": "Ohm’s Law Quick Reference Matrix (Voltage, Resistance, Current & Power)",
    "description": "Solved DC circuit benchmarks spanning 5V USB logic, 12V automotive, 24V industrial, 120V North American, and 230V European mains circuits.",
    "headers": [
      "Voltage / Resistance",
      "Current (I = V/R)",
      "Power (P = V×I)",
      "Energy Rate"
    ],
    "translations": {
      "es": {
        "title": "Tabla Rápida de la Ley de Ohm (Voltaje, Resistencia, Corriente y Potencia)",
        "description": "Ejemplos resueltos desde circuitos lógicos de 5 V y automoción 12 V hasta redes domésticas de 230 V.",
        "headers": [
          "Voltaje / Resistencia",
          "Corriente (I = V/R)",
          "Potencia (P = V×I)",
          "Tasa Energética"
        ]
      },
      "fr": {
        "title": "Table de Référence de la Loi d’Ohm (Tension, Courant, Résistance, Puissance)",
        "description": "Exemples résolus du 5 V USB et 12 V automobile jusqu’au réseau domestique européen 230 V.",
        "headers": [
          "Tension / Résistance",
          "Courant (I = V/R)",
          "Puissance (P = V×I)",
          "Débit Énergie"
        ]
      },
      "de": {
        "title": "Ohmsches Gesetz Schnellübersicht (Spannung, Strom, Widerstand & Watt)",
        "description": "Durchgerechnete Referenzwerte von 5-V-Elektronik und 12-V-KFZ-Bordnetz bis zum 230-V-Hausnetz.",
        "headers": [
          "Spannung / Widerstand",
          "Stromstärke (I = U/R)",
          "Leistung (P = U×I)",
          "Energie / Sek."
        ]
      }
    },
    "rows": [
      {
        "label": "5 V / 250 Ω",
        "values": [
          "0.02 A",
          "0.10 W",
          "0.10 J/s"
        ],
        "params": {
          "voltage": "5",
          "resistance": "250"
        }
      },
      {
        "label": "12 V / 4 Ω",
        "values": [
          "3.00 A",
          "36.00 W",
          "36.00 J/s"
        ],
        "params": {
          "voltage": "12",
          "resistance": "4"
        }
      },
      {
        "label": "24 V / 6 Ω",
        "values": [
          "4.00 A",
          "96.00 W",
          "96.00 J/s"
        ],
        "params": {
          "voltage": "24",
          "resistance": "6"
        }
      },
      {
        "label": "120 V / 12 Ω",
        "values": [
          "10.00 A",
          "1200.00 W",
          "1200.00 J/s"
        ],
        "params": {
          "voltage": "120",
          "resistance": "12"
        }
      },
      {
        "label": "230 V / 23 Ω",
        "values": [
          "10.00 A",
          "2300.00 W",
          "2300.00 J/s"
        ],
        "params": {
          "voltage": "230",
          "resistance": "23"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "5 V / 250 Ω",
          "values": [
            "0,02 A",
            "0,10 W",
            "0,10 J/s"
          ],
          "params": {
            "voltage": "5",
            "resistance": "250"
          }
        },
        {
          "label": "12 V / 4 Ω",
          "values": [
            "3,00 A",
            "36,00 W",
            "36,00 J/s"
          ],
          "params": {
            "voltage": "12",
            "resistance": "4"
          }
        },
        {
          "label": "24 V / 6 Ω",
          "values": [
            "4,00 A",
            "96,00 W",
            "96,00 J/s"
          ],
          "params": {
            "voltage": "24",
            "resistance": "6"
          }
        },
        {
          "label": "120 V / 12 Ω",
          "values": [
            "10,00 A",
            "1200,00 W",
            "1200,00 J/s"
          ],
          "params": {
            "voltage": "120",
            "resistance": "12"
          }
        },
        {
          "label": "230 V / 23 Ω",
          "values": [
            "10,00 A",
            "2300,00 W",
            "2300,00 J/s"
          ],
          "params": {
            "voltage": "230",
            "resistance": "23"
          }
        }
      ],
      "fr": [
        {
          "label": "5 V / 250 Ω",
          "values": [
            "0,02 A",
            "0,10 W",
            "0,10 J/s"
          ],
          "params": {
            "voltage": "5",
            "resistance": "250"
          }
        },
        {
          "label": "12 V / 4 Ω",
          "values": [
            "3,00 A",
            "36,00 W",
            "36,00 J/s"
          ],
          "params": {
            "voltage": "12",
            "resistance": "4"
          }
        },
        {
          "label": "24 V / 6 Ω",
          "values": [
            "4,00 A",
            "96,00 W",
            "96,00 J/s"
          ],
          "params": {
            "voltage": "24",
            "resistance": "6"
          }
        },
        {
          "label": "120 V / 12 Ω",
          "values": [
            "10,00 A",
            "1200,00 W",
            "1200,00 J/s"
          ],
          "params": {
            "voltage": "120",
            "resistance": "12"
          }
        },
        {
          "label": "230 V / 23 Ω",
          "values": [
            "10,00 A",
            "2300,00 W",
            "2300,00 J/s"
          ],
          "params": {
            "voltage": "230",
            "resistance": "23"
          }
        }
      ],
      "de": [
        {
          "label": "5 V / 250 Ω",
          "values": [
            "0,02 A",
            "0,10 W",
            "0,10 J/s"
          ],
          "params": {
            "voltage": "5",
            "resistance": "250"
          }
        },
        {
          "label": "12 V / 4 Ω",
          "values": [
            "3,00 A",
            "36,00 W",
            "36,00 J/s"
          ],
          "params": {
            "voltage": "12",
            "resistance": "4"
          }
        },
        {
          "label": "24 V / 6 Ω",
          "values": [
            "4,00 A",
            "96,00 W",
            "96,00 J/s"
          ],
          "params": {
            "voltage": "24",
            "resistance": "6"
          }
        },
        {
          "label": "120 V / 12 Ω",
          "values": [
            "10,00 A",
            "1200,00 W",
            "1200,00 J/s"
          ],
          "params": {
            "voltage": "120",
            "resistance": "12"
          }
        },
        {
          "label": "230 V / 23 Ω",
          "values": [
            "10,00 A",
            "2300,00 W",
            "2300,00 J/s"
          ],
          "params": {
            "voltage": "230",
            "resistance": "23"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "electrical-power-calculator",
      "power-supply-calculator"
    ],
    "title": "Watts to Amps Current Draw Table (12V DC, 24V DC, 120V AC & 230V AC)",
    "description": "Required circuit amperage (PF = 1.0) across standard DC battery rails and AC residential mains voltages for safe breaker and PSU sizing.",
    "headers": [
      "Power Load (Watts)",
      "12V DC Amps",
      "24V DC Amps",
      "120V AC Amps",
      "230V AC Amps"
    ],
    "translations": {
      "es": {
        "title": "Tabla de Conversión de Vatios a Amperios (12V, 24V, 120V y 230V)",
        "description": "Corriente requerida (cos φ = 1) en instalaciones de batería CC y redes domésticas CA para dimensionar magnetotérmicos.",
        "headers": [
          "Potencia (Vatios)",
          "Amperios 12V CC",
          "Amperios 24V CC",
          "Amperios 120V CA",
          "Amperios 230V CA"
        ]
      },
      "fr": {
        "title": "Table de Conversion Watts en Ampères (12 V, 24 V, 120 V et 230 V)",
        "description": "Intensité absorbée (cos φ = 1) pour dimensionner câbles, disjoncteurs et alimentations secteur.",
        "headers": [
          "Puissance (Watts)",
          "Ampères 12 V CC",
          "Ampères 24 V CC",
          "Ampères 120 V CA",
          "Ampères 230 V CA"
        ]
      },
      "de": {
        "title": "Watt-zu-Ampere-Stromtabelle (12 V, 24 V, 120 V & 230 V)",
        "description": "Erforderliche Stromstärke (cos φ = 1) zur Absicherung und Dimensionierung von Netzteilen und Leitungen.",
        "headers": [
          "Leistung (Watt)",
          "Strom bei 12 V DC",
          "Strom bei 24 V DC",
          "Strom bei 120 V AC",
          "Strom bei 230 V AC"
        ]
      }
    },
    "rows": [
      {
        "label": "100 W",
        "values": [
          "8.3 A",
          "4.2 A",
          "0.83 A",
          "0.43 A"
        ],
        "params": {
          "power": "100",
          "voltage": "120"
        }
      },
      {
        "label": "500 W",
        "values": [
          "41.7 A",
          "20.8 A",
          "4.17 A",
          "2.17 A"
        ],
        "params": {
          "power": "500",
          "voltage": "120"
        }
      },
      {
        "label": "1,000 W",
        "values": [
          "83.3 A",
          "41.7 A",
          "8.33 A",
          "4.35 A"
        ],
        "params": {
          "power": "1000",
          "voltage": "120"
        }
      },
      {
        "label": "1,800 W",
        "values": [
          "150.0 A",
          "75.0 A",
          "15.00 A",
          "7.83 A"
        ],
        "params": {
          "power": "1800",
          "voltage": "120"
        }
      },
      {
        "label": "3,000 W",
        "values": [
          "250.0 A",
          "125.0 A",
          "25.00 A",
          "13.04 A"
        ],
        "params": {
          "power": "3000",
          "voltage": "120"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "100 W",
          "values": [
            "8,3 A",
            "4,2 A",
            "0,83 A",
            "0,43 A"
          ],
          "params": {
            "power": "100",
            "voltage": "230"
          }
        },
        {
          "label": "500 W",
          "values": [
            "41,7 A",
            "20,8 A",
            "4,17 A",
            "2,17 A"
          ],
          "params": {
            "power": "500",
            "voltage": "230"
          }
        },
        {
          "label": "1.000 W",
          "values": [
            "83,3 A",
            "41,7 A",
            "8,33 A",
            "4,35 A"
          ],
          "params": {
            "power": "1000",
            "voltage": "230"
          }
        },
        {
          "label": "1.800 W",
          "values": [
            "150,0 A",
            "75,0 A",
            "15,00 A",
            "7,83 A"
          ],
          "params": {
            "power": "1800",
            "voltage": "230"
          }
        },
        {
          "label": "3.000 W",
          "values": [
            "250,0 A",
            "125,0 A",
            "25,00 A",
            "13,04 A"
          ],
          "params": {
            "power": "3000",
            "voltage": "230"
          }
        }
      ],
      "fr": [
        {
          "label": "100 W",
          "values": [
            "8,3 A",
            "4,2 A",
            "0,83 A",
            "0,43 A"
          ],
          "params": {
            "power": "100",
            "voltage": "230"
          }
        },
        {
          "label": "500 W",
          "values": [
            "41,7 A",
            "20,8 A",
            "4,17 A",
            "2,17 A"
          ],
          "params": {
            "power": "500",
            "voltage": "230"
          }
        },
        {
          "label": "1 000 W",
          "values": [
            "83,3 A",
            "41,7 A",
            "8,33 A",
            "4,35 A"
          ],
          "params": {
            "power": "1000",
            "voltage": "230"
          }
        },
        {
          "label": "1 800 W",
          "values": [
            "150,0 A",
            "75,0 A",
            "15,00 A",
            "7,83 A"
          ],
          "params": {
            "power": "1800",
            "voltage": "230"
          }
        },
        {
          "label": "3 000 W",
          "values": [
            "250,0 A",
            "125,0 A",
            "25,00 A",
            "13,04 A"
          ],
          "params": {
            "power": "3000",
            "voltage": "230"
          }
        }
      ],
      "de": [
        {
          "label": "100 W",
          "values": [
            "8,3 A",
            "4,2 A",
            "0,83 A",
            "0,43 A"
          ],
          "params": {
            "power": "100",
            "voltage": "230"
          }
        },
        {
          "label": "500 W",
          "values": [
            "41,7 A",
            "20,8 A",
            "4,17 A",
            "2,17 A"
          ],
          "params": {
            "power": "500",
            "voltage": "230"
          }
        },
        {
          "label": "1.000 W",
          "values": [
            "83,3 A",
            "41,7 A",
            "8,33 A",
            "4,35 A"
          ],
          "params": {
            "power": "1000",
            "voltage": "230"
          }
        },
        {
          "label": "1.800 W",
          "values": [
            "150,0 A",
            "75,0 A",
            "15,00 A",
            "7,83 A"
          ],
          "params": {
            "power": "1800",
            "voltage": "230"
          }
        },
        {
          "label": "3.000 W",
          "values": [
            "250,0 A",
            "125,0 A",
            "25,00 A",
            "13,04 A"
          ],
          "params": {
            "power": "3000",
            "voltage": "230"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "voltage-drop-calculator",
      "wire-resistance-calculator"
    ],
    "title": "Copper Wire Resistance & 30 m (100 ft) Voltage Drop Reference (120V)",
    "description": "Annealed copper conductor resistance at 20°C and round-trip voltage drop over a 30-meter one-way run at rated NEC ampacity.",
    "headers": [
      "Copper Wire Size",
      "Resistance / 100 m",
      "Rated Load",
      "Voltage Drop (30 m)",
      "% Drop (120V)"
    ],
    "translations": {
      "es": {
        "title": "Resistencia de Cable de Cobre y Caída de Tensión en 30 m (230 V)",
        "description": "Resistencia por 100 metros a 20 °C y caída de tensión ida y vuelta en un tendido de 30 m a 230 V.",
        "headers": [
          "Sección de Cobre",
          "Resistencia / 100 m",
          "Carga Nominal",
          "Caída (30 m)",
          "% Caída (230 V)"
        ]
      },
      "fr": {
        "title": "Résistance de Câble Cuivre et Chute de Tension sur 30 m (230 V)",
        "description": "Résistance linéique à 20 °C et chute de tension aller-retour sur 30 mètres en monophasé 230 V.",
        "headers": [
          "Section Cuivre",
          "Résistance / 100 m",
          "Courant Charge",
          "Chute (30 m)",
          "% Chute (230 V)"
        ]
      },
      "de": {
        "title": "Kupferkabel-Widerstand & Spannungsfall bei 30 m Länge (230 V)",
        "description": "Leiterwiderstand je 100 m bei 20 °C und Spannungsfall (Hin- & Rückleiter) im 230-V-Wechselstromnetz.",
        "headers": [
          "Kupferquerschnitt",
          "Widerstand / 100 m",
          "Laststrom",
          "Spannungsfall (30 m)",
          "% Abfall (230 V)"
        ]
      }
    },
    "rows": [
      {
        "label": "14 AWG (2.08 mm²)",
        "values": [
          "0.83 Ω",
          "15 A",
          "7.46 V",
          "6.22%"
        ],
        "params": {
          "wire_area_mm2": "2.08",
          "length_m": "30",
          "current_a": "15",
          "voltage": "120"
        }
      },
      {
        "label": "12 AWG (3.31 mm²)",
        "values": [
          "0.52 Ω",
          "20 A",
          "6.25 V",
          "5.21%"
        ],
        "params": {
          "wire_area_mm2": "3.31",
          "length_m": "30",
          "current_a": "20",
          "voltage": "120"
        }
      },
      {
        "label": "10 AWG (5.26 mm²)",
        "values": [
          "0.33 Ω",
          "30 A",
          "5.90 V",
          "4.92%"
        ],
        "params": {
          "wire_area_mm2": "5.26",
          "length_m": "30",
          "current_a": "30",
          "voltage": "120"
        }
      },
      {
        "label": "8 AWG (8.37 mm²)",
        "values": [
          "0.21 Ω",
          "40 A",
          "4.94 V",
          "4.12%"
        ],
        "params": {
          "wire_area_mm2": "8.37",
          "length_m": "30",
          "current_a": "40",
          "voltage": "120"
        }
      },
      {
        "label": "6 AWG (13.3 mm²)",
        "values": [
          "0.13 Ω",
          "55 A",
          "4.28 V",
          "3.56%"
        ],
        "params": {
          "wire_area_mm2": "13.3",
          "length_m": "30",
          "current_a": "55",
          "voltage": "120"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "2,08 mm² (14 AWG)",
          "values": [
            "0,83 Ω",
            "15 A",
            "7,46 V",
            "3,24%"
          ],
          "params": {
            "wire_area_mm2": "2.08",
            "length_m": "30",
            "current_a": "15",
            "voltage": "230"
          }
        },
        {
          "label": "3,31 mm² (12 AWG)",
          "values": [
            "0,52 Ω",
            "20 A",
            "6,25 V",
            "2,72%"
          ],
          "params": {
            "wire_area_mm2": "3.31",
            "length_m": "30",
            "current_a": "20",
            "voltage": "230"
          }
        },
        {
          "label": "5,26 mm² (10 AWG)",
          "values": [
            "0,33 Ω",
            "30 A",
            "5,90 V",
            "2,57%"
          ],
          "params": {
            "wire_area_mm2": "5.26",
            "length_m": "30",
            "current_a": "30",
            "voltage": "230"
          }
        },
        {
          "label": "8,37 mm² (8 AWG)",
          "values": [
            "0,21 Ω",
            "40 A",
            "4,94 V",
            "2,15%"
          ],
          "params": {
            "wire_area_mm2": "8.37",
            "length_m": "30",
            "current_a": "40",
            "voltage": "230"
          }
        },
        {
          "label": "13,30 mm² (6 AWG)",
          "values": [
            "0,13 Ω",
            "55 A",
            "4,28 V",
            "1,86%"
          ],
          "params": {
            "wire_area_mm2": "13.3",
            "length_m": "30",
            "current_a": "55",
            "voltage": "230"
          }
        }
      ],
      "fr": [
        {
          "label": "2,08 mm² (14 AWG)",
          "values": [
            "0,83 Ω",
            "15 A",
            "7,46 V",
            "3,24%"
          ],
          "params": {
            "wire_area_mm2": "2.08",
            "length_m": "30",
            "current_a": "15",
            "voltage": "230"
          }
        },
        {
          "label": "3,31 mm² (12 AWG)",
          "values": [
            "0,52 Ω",
            "20 A",
            "6,25 V",
            "2,72%"
          ],
          "params": {
            "wire_area_mm2": "3.31",
            "length_m": "30",
            "current_a": "20",
            "voltage": "230"
          }
        },
        {
          "label": "5,26 mm² (10 AWG)",
          "values": [
            "0,33 Ω",
            "30 A",
            "5,90 V",
            "2,57%"
          ],
          "params": {
            "wire_area_mm2": "5.26",
            "length_m": "30",
            "current_a": "30",
            "voltage": "230"
          }
        },
        {
          "label": "8,37 mm² (8 AWG)",
          "values": [
            "0,21 Ω",
            "40 A",
            "4,94 V",
            "2,15%"
          ],
          "params": {
            "wire_area_mm2": "8.37",
            "length_m": "30",
            "current_a": "40",
            "voltage": "230"
          }
        },
        {
          "label": "13,30 mm² (6 AWG)",
          "values": [
            "0,13 Ω",
            "55 A",
            "4,28 V",
            "1,86%"
          ],
          "params": {
            "wire_area_mm2": "13.3",
            "length_m": "30",
            "current_a": "55",
            "voltage": "230"
          }
        }
      ],
      "de": [
        {
          "label": "2,08 mm² (14 AWG)",
          "values": [
            "0,83 Ω",
            "15 A",
            "7,46 V",
            "3,24%"
          ],
          "params": {
            "wire_area_mm2": "2.08",
            "length_m": "30",
            "current_a": "15",
            "voltage": "230"
          }
        },
        {
          "label": "3,31 mm² (12 AWG)",
          "values": [
            "0,52 Ω",
            "20 A",
            "6,25 V",
            "2,72%"
          ],
          "params": {
            "wire_area_mm2": "3.31",
            "length_m": "30",
            "current_a": "20",
            "voltage": "230"
          }
        },
        {
          "label": "5,26 mm² (10 AWG)",
          "values": [
            "0,33 Ω",
            "30 A",
            "5,90 V",
            "2,57%"
          ],
          "params": {
            "wire_area_mm2": "5.26",
            "length_m": "30",
            "current_a": "30",
            "voltage": "230"
          }
        },
        {
          "label": "8,37 mm² (8 AWG)",
          "values": [
            "0,21 Ω",
            "40 A",
            "4,94 V",
            "2,15%"
          ],
          "params": {
            "wire_area_mm2": "8.37",
            "length_m": "30",
            "current_a": "40",
            "voltage": "230"
          }
        },
        {
          "label": "13,30 mm² (6 AWG)",
          "values": [
            "0,13 Ω",
            "55 A",
            "4,28 V",
            "1,86%"
          ],
          "params": {
            "wire_area_mm2": "13.3",
            "length_m": "30",
            "current_a": "55",
            "voltage": "230"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "led-resistor-calculator"
    ],
    "title": "Standard 20 mA LED Current-Limiting Resistor Chart (Nearest E24 Value)",
    "description": "Recommended next-higher E24 series resistor values for Red (2.0V), Green (2.2V), and Blue/White (3.2V) 5 mm LEDs at 20 mA.",
    "headers": [
      "DC Supply Voltage",
      "Red LED (2.0V)",
      "Green LED (2.2V)",
      "Blue / White (3.2V)",
      "Resistor Heat (Red)"
    ],
    "translations": {
      "es": {
        "title": "Tabla de Resistencias para LED de 20 mA (Valores E24 Estándar)",
        "description": "Valor comercial E24 recomendado para LEDs rojo (2,0 V), verde (2,2 V) y azul/blanco (3,2 V) a 20 mA.",
        "headers": [
          "Fuente CC",
          "LED Rojo (2,0 V)",
          "LED Verde (2,2 V)",
          "Azul/Blanco (3,2 V)",
          "Potencia Disipada"
        ]
      },
      "fr": {
        "title": "Tableau des Résistances LED 20 mA (Valeurs Normalisées E24)",
        "description": "Résistances de limitation série E24 pour LED rouge (2,0 V), verte (2,2 V) et bleue/blanche (3,2 V) à 20 mA.",
        "headers": [
          "Alimentation CC",
          "LED Rouge (2,0 V)",
          "LED Verte (2,2 V)",
          "Bleue/Blanche (3,2 V)",
          "Dissipation (Rouge)"
        ]
      },
      "de": {
        "title": "LED-Vorwiderstand-Tabelle für 20 mA (Nächster E24-Normwert)",
        "description": "Empfohlene E24-Widerstände für rote (2,0 V), grüne (2,2 V) und blaue/weiße (3,2 V) LEDs bei 20 mA.",
        "headers": [
          "Versorgung (DC)",
          "LED Rot (2,0 V)",
          "LED Grün (2,2 V)",
          "Blau/Weiß (3,2 V)",
          "Verlustleistung"
        ]
      }
    },
    "rows": [
      {
        "label": "3.3 V DC",
        "values": [
          "68 Ω",
          "56 Ω",
          "47 Ω",
          "26 mW"
        ],
        "params": {
          "supply_voltage": "3.3",
          "forward_voltage": "2.0",
          "forward_current_ma": "20"
        }
      },
      {
        "label": "5 V DC",
        "values": [
          "150 Ω",
          "150 Ω",
          "100 Ω",
          "60 mW"
        ],
        "params": {
          "supply_voltage": "5",
          "forward_voltage": "2.0",
          "forward_current_ma": "20"
        }
      },
      {
        "label": "9 V DC",
        "values": [
          "390 Ω",
          "390 Ω",
          "330 Ω",
          "140 mW"
        ],
        "params": {
          "supply_voltage": "9",
          "forward_voltage": "2.0",
          "forward_current_ma": "20"
        }
      },
      {
        "label": "12 V DC",
        "values": [
          "510 Ω",
          "510 Ω",
          "470 Ω",
          "200 mW"
        ],
        "params": {
          "supply_voltage": "12",
          "forward_voltage": "2.0",
          "forward_current_ma": "20"
        }
      },
      {
        "label": "24 V DC",
        "values": [
          "1100 Ω",
          "1100 Ω",
          "1100 Ω",
          "440 mW"
        ],
        "params": {
          "supply_voltage": "24",
          "forward_voltage": "2.0",
          "forward_current_ma": "20"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "3,3 V DC",
          "values": [
            "68 Ω",
            "56 Ω",
            "47 Ω",
            "26 mW"
          ],
          "params": {
            "supply_voltage": "3.3",
            "forward_voltage": "2.0",
            "forward_current_ma": "20"
          }
        },
        {
          "label": "5 V DC",
          "values": [
            "150 Ω",
            "150 Ω",
            "100 Ω",
            "60 mW"
          ],
          "params": {
            "supply_voltage": "5",
            "forward_voltage": "2.0",
            "forward_current_ma": "20"
          }
        },
        {
          "label": "9 V DC",
          "values": [
            "390 Ω",
            "390 Ω",
            "330 Ω",
            "140 mW"
          ],
          "params": {
            "supply_voltage": "9",
            "forward_voltage": "2.0",
            "forward_current_ma": "20"
          }
        },
        {
          "label": "12 V DC",
          "values": [
            "510 Ω",
            "510 Ω",
            "470 Ω",
            "200 mW"
          ],
          "params": {
            "supply_voltage": "12",
            "forward_voltage": "2.0",
            "forward_current_ma": "20"
          }
        },
        {
          "label": "24 V DC",
          "values": [
            "1100 Ω",
            "1100 Ω",
            "1100 Ω",
            "440 mW"
          ],
          "params": {
            "supply_voltage": "24",
            "forward_voltage": "2.0",
            "forward_current_ma": "20"
          }
        }
      ],
      "fr": [
        {
          "label": "3,3 V DC",
          "values": [
            "68 Ω",
            "56 Ω",
            "47 Ω",
            "26 mW"
          ],
          "params": {
            "supply_voltage": "3.3",
            "forward_voltage": "2.0",
            "forward_current_ma": "20"
          }
        },
        {
          "label": "5 V DC",
          "values": [
            "150 Ω",
            "150 Ω",
            "100 Ω",
            "60 mW"
          ],
          "params": {
            "supply_voltage": "5",
            "forward_voltage": "2.0",
            "forward_current_ma": "20"
          }
        },
        {
          "label": "9 V DC",
          "values": [
            "390 Ω",
            "390 Ω",
            "330 Ω",
            "140 mW"
          ],
          "params": {
            "supply_voltage": "9",
            "forward_voltage": "2.0",
            "forward_current_ma": "20"
          }
        },
        {
          "label": "12 V DC",
          "values": [
            "510 Ω",
            "510 Ω",
            "470 Ω",
            "200 mW"
          ],
          "params": {
            "supply_voltage": "12",
            "forward_voltage": "2.0",
            "forward_current_ma": "20"
          }
        },
        {
          "label": "24 V DC",
          "values": [
            "1100 Ω",
            "1100 Ω",
            "1100 Ω",
            "440 mW"
          ],
          "params": {
            "supply_voltage": "24",
            "forward_voltage": "2.0",
            "forward_current_ma": "20"
          }
        }
      ],
      "de": [
        {
          "label": "3,3 V DC",
          "values": [
            "68 Ω",
            "56 Ω",
            "47 Ω",
            "26 mW"
          ],
          "params": {
            "supply_voltage": "3.3",
            "forward_voltage": "2.0",
            "forward_current_ma": "20"
          }
        },
        {
          "label": "5 V DC",
          "values": [
            "150 Ω",
            "150 Ω",
            "100 Ω",
            "60 mW"
          ],
          "params": {
            "supply_voltage": "5",
            "forward_voltage": "2.0",
            "forward_current_ma": "20"
          }
        },
        {
          "label": "9 V DC",
          "values": [
            "390 Ω",
            "390 Ω",
            "330 Ω",
            "140 mW"
          ],
          "params": {
            "supply_voltage": "9",
            "forward_voltage": "2.0",
            "forward_current_ma": "20"
          }
        },
        {
          "label": "12 V DC",
          "values": [
            "510 Ω",
            "510 Ω",
            "470 Ω",
            "200 mW"
          ],
          "params": {
            "supply_voltage": "12",
            "forward_voltage": "2.0",
            "forward_current_ma": "20"
          }
        },
        {
          "label": "24 V DC",
          "values": [
            "1100 Ω",
            "1100 Ω",
            "1100 Ω",
            "440 mW"
          ],
          "params": {
            "supply_voltage": "24",
            "forward_voltage": "2.0",
            "forward_current_ma": "20"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "power-factor-calculator"
    ],
    "title": "AC Power Factor Conversion Matrix (Per 100 kVA Apparent Power)",
    "description": "Active working power (kW), reactive power (kVAR), and phase angle φ for a 100 kVA AC generator or transformer load.",
    "headers": [
      "Power Factor (cos φ)",
      "Real Power (kW)",
      "Reactive Power (kVAR)",
      "Phase Angle (φ)"
    ],
    "translations": {
      "es": {
        "title": "Tabla de Factor de Potencia CA (Por cada 100 kVA Aparentes)",
        "description": "Potencia activa útil (kW), reactiva (kVAR) y ángulo de desfase φ para una carga de 100 kVA.",
        "headers": [
          "Factor Potencia (cos φ)",
          "Potencia Activa (kW)",
          "Potencia Reactiva",
          "Ángulo (φ)"
        ]
      },
      "fr": {
        "title": "Matrice du Facteur de Puissance (Pour 100 kVA de Puissance Apparente)",
        "description": "Puissance active (kW), puissance réactive (kVAR) et déphasage φ d’une installation de 100 kVA.",
        "headers": [
          "Facteur (cos φ)",
          "Puissance Active (kW)",
          "Réactive (kVAR)",
          "Déphasage (φ)"
        ]
      },
      "de": {
        "title": "Leistungsfaktor-Tabelle (cos φ pro 100 kVA Scheinleistung)",
        "description": "Wirkleistung (kW), Blindleistung (kvar) und Phasenwinkel φ für Transformatoren und Drehstromanlagen.",
        "headers": [
          "Leistungsfaktor (cos φ)",
          "Wirkleistung (kW)",
          "Blindleistung (kvar)",
          "Phasenwinkel (φ)"
        ]
      }
    },
    "rows": [
      {
        "label": "PF = 0.70",
        "values": [
          "70.0 kW",
          "71.4 kVAR",
          "45.6°"
        ],
        "params": {
          "apparent_power_kva": "100",
          "power_factor": "0.7"
        }
      },
      {
        "label": "PF = 0.80",
        "values": [
          "80.0 kW",
          "60.0 kVAR",
          "36.9°"
        ],
        "params": {
          "apparent_power_kva": "100",
          "power_factor": "0.8"
        }
      },
      {
        "label": "PF = 0.85",
        "values": [
          "85.0 kW",
          "52.7 kVAR",
          "31.8°"
        ],
        "params": {
          "apparent_power_kva": "100",
          "power_factor": "0.85"
        }
      },
      {
        "label": "PF = 0.90",
        "values": [
          "90.0 kW",
          "43.6 kVAR",
          "25.8°"
        ],
        "params": {
          "apparent_power_kva": "100",
          "power_factor": "0.9"
        }
      },
      {
        "label": "PF = 0.95",
        "values": [
          "95.0 kW",
          "31.2 kVAR",
          "18.2°"
        ],
        "params": {
          "apparent_power_kva": "100",
          "power_factor": "0.95"
        }
      },
      {
        "label": "PF = 1.00",
        "values": [
          "100.0 kW",
          "0.0 kVAR",
          "0.0°"
        ],
        "params": {
          "apparent_power_kva": "100",
          "power_factor": "1"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "PF = 0,70",
          "values": [
            "70,0 kW",
            "71,4 kVAR",
            "45,6°"
          ],
          "params": {
            "apparent_power_kva": "100",
            "power_factor": "0.7"
          }
        },
        {
          "label": "PF = 0,80",
          "values": [
            "80,0 kW",
            "60,0 kVAR",
            "36,9°"
          ],
          "params": {
            "apparent_power_kva": "100",
            "power_factor": "0.8"
          }
        },
        {
          "label": "PF = 0,85",
          "values": [
            "85,0 kW",
            "52,7 kVAR",
            "31,8°"
          ],
          "params": {
            "apparent_power_kva": "100",
            "power_factor": "0.85"
          }
        },
        {
          "label": "PF = 0,90",
          "values": [
            "90,0 kW",
            "43,6 kVAR",
            "25,8°"
          ],
          "params": {
            "apparent_power_kva": "100",
            "power_factor": "0.9"
          }
        },
        {
          "label": "PF = 0,95",
          "values": [
            "95,0 kW",
            "31,2 kVAR",
            "18,2°"
          ],
          "params": {
            "apparent_power_kva": "100",
            "power_factor": "0.95"
          }
        },
        {
          "label": "PF = 1,00",
          "values": [
            "100,0 kW",
            "0,0 kVAR",
            "0,0°"
          ],
          "params": {
            "apparent_power_kva": "100",
            "power_factor": "1"
          }
        }
      ],
      "fr": [
        {
          "label": "PF = 0,70",
          "values": [
            "70,0 kW",
            "71,4 kVAR",
            "45,6°"
          ],
          "params": {
            "apparent_power_kva": "100",
            "power_factor": "0.7"
          }
        },
        {
          "label": "PF = 0,80",
          "values": [
            "80,0 kW",
            "60,0 kVAR",
            "36,9°"
          ],
          "params": {
            "apparent_power_kva": "100",
            "power_factor": "0.8"
          }
        },
        {
          "label": "PF = 0,85",
          "values": [
            "85,0 kW",
            "52,7 kVAR",
            "31,8°"
          ],
          "params": {
            "apparent_power_kva": "100",
            "power_factor": "0.85"
          }
        },
        {
          "label": "PF = 0,90",
          "values": [
            "90,0 kW",
            "43,6 kVAR",
            "25,8°"
          ],
          "params": {
            "apparent_power_kva": "100",
            "power_factor": "0.9"
          }
        },
        {
          "label": "PF = 0,95",
          "values": [
            "95,0 kW",
            "31,2 kVAR",
            "18,2°"
          ],
          "params": {
            "apparent_power_kva": "100",
            "power_factor": "0.95"
          }
        },
        {
          "label": "PF = 1,00",
          "values": [
            "100,0 kW",
            "0,0 kVAR",
            "0,0°"
          ],
          "params": {
            "apparent_power_kva": "100",
            "power_factor": "1"
          }
        }
      ],
      "de": [
        {
          "label": "PF = 0,70",
          "values": [
            "70,0 kW",
            "71,4 kVAR",
            "45,6°"
          ],
          "params": {
            "apparent_power_kva": "100",
            "power_factor": "0.7"
          }
        },
        {
          "label": "PF = 0,80",
          "values": [
            "80,0 kW",
            "60,0 kVAR",
            "36,9°"
          ],
          "params": {
            "apparent_power_kva": "100",
            "power_factor": "0.8"
          }
        },
        {
          "label": "PF = 0,85",
          "values": [
            "85,0 kW",
            "52,7 kVAR",
            "31,8°"
          ],
          "params": {
            "apparent_power_kva": "100",
            "power_factor": "0.85"
          }
        },
        {
          "label": "PF = 0,90",
          "values": [
            "90,0 kW",
            "43,6 kVAR",
            "25,8°"
          ],
          "params": {
            "apparent_power_kva": "100",
            "power_factor": "0.9"
          }
        },
        {
          "label": "PF = 0,95",
          "values": [
            "95,0 kW",
            "31,2 kVAR",
            "18,2°"
          ],
          "params": {
            "apparent_power_kva": "100",
            "power_factor": "0.95"
          }
        },
        {
          "label": "PF = 1,00",
          "values": [
            "100,0 kW",
            "0,0 kVAR",
            "0,0°"
          ],
          "params": {
            "apparent_power_kva": "100",
            "power_factor": "1"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "battery-runtime-calculator",
      "ups-calculator",
      "inverter-calculator"
    ],
    "title": "LiFePO₄ Battery Bank & UPS Runtime Matrix (85% DoD, 90% Inverter Eff.)",
    "description": "Usable AC watt-hours and continuous backup runtime under 150W (router/laptop), 500W (fridge/TV), and 1,500W (appliance) loads.",
    "headers": [
      "Battery Bank",
      "Usable AC Energy",
      "150W Load",
      "500W Load",
      "1,500W Load"
    ],
    "translations": {
      "es": {
        "title": "Tabla de Autonomía de Baterías LiFePO₄ y SAI (85 % DoD, 90 % Inversor)",
        "description": "Energía útil CA y horas de respaldo continuo ante cargas de 150 W, 500 W y 1.500 W.",
        "headers": [
          "Banco de Baterías",
          "Energía Útil CA",
          "Carga 150 W",
          "Carga 500 W",
          "Carga 1.500 W"
        ]
      },
      "fr": {
        "title": "Autonomie Batterie LiFePO₄ et Onduleur (DoD 85 %, Rendement 90 %)",
        "description": "Énergie utile CA et durée de secours pour des charges continues de 150 W, 500 W et 1 500 W.",
        "headers": [
          "Parc Batteries",
          "Énergie Utile CA",
          "Charge 150 W",
          "Charge 500 W",
          "Charge 1 500 W"
        ]
      },
      "de": {
        "title": "LiFePO₄-Batterie- & USV-Laufzeittabelle (85 % DoD, 90 % Wirkungsgrad)",
        "description": "Nutzbare AC-Kapazität und Überbrückungszeit bei 150 W, 500 W und 1.500 W Dauerlast.",
        "headers": [
          "Batteriespeicher",
          "Nutzbare AC-Energie",
          "150-W-Last",
          "500-W-Last",
          "1.500-W-Last"
        ]
      }
    },
    "rows": [
      {
        "label": "12V 100Ah (1.2 kWh)",
        "values": [
          "918 Wh",
          "6.1 h",
          "1.8 h",
          "0.6 h"
        ],
        "params": {
          "battery_voltage": "12",
          "battery_ah": "100",
          "load_watts": "500"
        }
      },
      {
        "label": "12V 200Ah (2.4 kWh)",
        "values": [
          "1836 Wh",
          "12.2 h",
          "3.7 h",
          "1.2 h"
        ],
        "params": {
          "battery_voltage": "12",
          "battery_ah": "200",
          "load_watts": "500"
        }
      },
      {
        "label": "24V 100Ah (2.4 kWh)",
        "values": [
          "1836 Wh",
          "12.2 h",
          "3.7 h",
          "1.2 h"
        ],
        "params": {
          "battery_voltage": "24",
          "battery_ah": "100",
          "load_watts": "500"
        }
      },
      {
        "label": "48V 100Ah (4.8 kWh)",
        "values": [
          "3672 Wh",
          "24.5 h",
          "7.3 h",
          "2.4 h"
        ],
        "params": {
          "battery_voltage": "48",
          "battery_ah": "100",
          "load_watts": "500"
        }
      },
      {
        "label": "48V 200Ah (9.6 kWh)",
        "values": [
          "7344 Wh",
          "49.0 h",
          "14.7 h",
          "4.9 h"
        ],
        "params": {
          "battery_voltage": "48",
          "battery_ah": "200",
          "load_watts": "500"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "12V 100Ah (1,2 kWh)",
          "values": [
            "918 Wh",
            "6,1 h",
            "1,8 h",
            "0,6 h"
          ],
          "params": {
            "battery_voltage": "12",
            "battery_ah": "100",
            "load_watts": "500"
          }
        },
        {
          "label": "12V 200Ah (2,4 kWh)",
          "values": [
            "1836 Wh",
            "12,2 h",
            "3,7 h",
            "1,2 h"
          ],
          "params": {
            "battery_voltage": "12",
            "battery_ah": "200",
            "load_watts": "500"
          }
        },
        {
          "label": "24V 100Ah (2,4 kWh)",
          "values": [
            "1836 Wh",
            "12,2 h",
            "3,7 h",
            "1,2 h"
          ],
          "params": {
            "battery_voltage": "24",
            "battery_ah": "100",
            "load_watts": "500"
          }
        },
        {
          "label": "48V 100Ah (4,8 kWh)",
          "values": [
            "3672 Wh",
            "24,5 h",
            "7,3 h",
            "2,4 h"
          ],
          "params": {
            "battery_voltage": "48",
            "battery_ah": "100",
            "load_watts": "500"
          }
        },
        {
          "label": "48V 200Ah (9,6 kWh)",
          "values": [
            "7344 Wh",
            "49,0 h",
            "14,7 h",
            "4,9 h"
          ],
          "params": {
            "battery_voltage": "48",
            "battery_ah": "200",
            "load_watts": "500"
          }
        }
      ],
      "fr": [
        {
          "label": "12V 100Ah (1,2 kWh)",
          "values": [
            "918 Wh",
            "6,1 h",
            "1,8 h",
            "0,6 h"
          ],
          "params": {
            "battery_voltage": "12",
            "battery_ah": "100",
            "load_watts": "500"
          }
        },
        {
          "label": "12V 200Ah (2,4 kWh)",
          "values": [
            "1836 Wh",
            "12,2 h",
            "3,7 h",
            "1,2 h"
          ],
          "params": {
            "battery_voltage": "12",
            "battery_ah": "200",
            "load_watts": "500"
          }
        },
        {
          "label": "24V 100Ah (2,4 kWh)",
          "values": [
            "1836 Wh",
            "12,2 h",
            "3,7 h",
            "1,2 h"
          ],
          "params": {
            "battery_voltage": "24",
            "battery_ah": "100",
            "load_watts": "500"
          }
        },
        {
          "label": "48V 100Ah (4,8 kWh)",
          "values": [
            "3672 Wh",
            "24,5 h",
            "7,3 h",
            "2,4 h"
          ],
          "params": {
            "battery_voltage": "48",
            "battery_ah": "100",
            "load_watts": "500"
          }
        },
        {
          "label": "48V 200Ah (9,6 kWh)",
          "values": [
            "7344 Wh",
            "49,0 h",
            "14,7 h",
            "4,9 h"
          ],
          "params": {
            "battery_voltage": "48",
            "battery_ah": "200",
            "load_watts": "500"
          }
        }
      ],
      "de": [
        {
          "label": "12V 100Ah (1,2 kWh)",
          "values": [
            "918 Wh",
            "6,1 h",
            "1,8 h",
            "0,6 h"
          ],
          "params": {
            "battery_voltage": "12",
            "battery_ah": "100",
            "load_watts": "500"
          }
        },
        {
          "label": "12V 200Ah (2,4 kWh)",
          "values": [
            "1836 Wh",
            "12,2 h",
            "3,7 h",
            "1,2 h"
          ],
          "params": {
            "battery_voltage": "12",
            "battery_ah": "200",
            "load_watts": "500"
          }
        },
        {
          "label": "24V 100Ah (2,4 kWh)",
          "values": [
            "1836 Wh",
            "12,2 h",
            "3,7 h",
            "1,2 h"
          ],
          "params": {
            "battery_voltage": "24",
            "battery_ah": "100",
            "load_watts": "500"
          }
        },
        {
          "label": "48V 100Ah (4,8 kWh)",
          "values": [
            "3672 Wh",
            "24,5 h",
            "7,3 h",
            "2,4 h"
          ],
          "params": {
            "battery_voltage": "48",
            "battery_ah": "100",
            "load_watts": "500"
          }
        },
        {
          "label": "48V 200Ah (9,6 kWh)",
          "values": [
            "7344 Wh",
            "49,0 h",
            "14,7 h",
            "4,9 h"
          ],
          "params": {
            "battery_voltage": "48",
            "battery_ah": "200",
            "load_watts": "500"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "solar-panel-calculator"
    ],
    "title": "Solar PV System Sizing Matrix (4.5 Peak Sun Hours, 80% System Efficiency)",
    "description": "Required rooftop solar array size (kW), 400W panel count, and approximate roof area needed to offset 10 to 60 kWh of daily usage.",
    "headers": [
      "Daily Usage",
      "Monthly Usage",
      "Required Array",
      "400W Panels",
      "Est. Roof Area"
    ],
    "translations": {
      "es": {
        "title": "Dimensionamiento de Placas Solares (5,0 HSP España, 80 % Rendimiento)",
        "description": "Potencia pico (kWp), número de paneles de 400 W y superficie de tejado estimada según consumo diario.",
        "headers": [
          "Consumo Diario",
          "Consumo Mensual",
          "Potencia (kWp)",
          "Paneles 400 W",
          "Superficie Tejado"
        ]
      },
      "fr": {
        "title": "Dimensionnement Panneaux Solaires (3,8 h Pic France, Rendement 80 %)",
        "description": "Puissance crête requise (kWc), nombre de modules 400 Wc et surface de toiture estimée.",
        "headers": [
          "Conso. Journalière",
          "Conso. Mensuelle",
          "Puissance Crête",
          "Panneaux 400 Wc",
          "Surface Toit"
        ]
      },
      "de": {
        "title": "Photovoltaik-Auslegungstabelle (3,0 Volllaststunden DACH, PR 80 %)",
        "description": "Benötigte PV-Anlagenleistung (kWp), Modulanzahl (400 Wp) und Dachfläche je nach täglichem Stromverbrauch.",
        "headers": [
          "Tagesverbrauch",
          "Monatsverbrauch",
          "Anlagengröße",
          "400-Wp-Module",
          "Dachfläche ca."
        ]
      }
    },
    "rows": [
      {
        "label": "10 kWh / day",
        "values": [
          "300 kWh",
          "2.78 kW",
          "7 × 400W",
          "14 m²"
        ],
        "params": {
          "daily_kwh": "10",
          "sun_hours": "4.5",
          "panel_watts": "400"
        }
      },
      {
        "label": "20 kWh / day",
        "values": [
          "600 kWh",
          "5.56 kW",
          "14 × 400W",
          "27 m²"
        ],
        "params": {
          "daily_kwh": "20",
          "sun_hours": "4.5",
          "panel_watts": "400"
        }
      },
      {
        "label": "30 kWh / day",
        "values": [
          "900 kWh",
          "8.33 kW",
          "21 × 400W",
          "41 m²"
        ],
        "params": {
          "daily_kwh": "30",
          "sun_hours": "4.5",
          "panel_watts": "400"
        }
      },
      {
        "label": "45 kWh / day",
        "values": [
          "1350 kWh",
          "12.50 kW",
          "32 × 400W",
          "62 m²"
        ],
        "params": {
          "daily_kwh": "45",
          "sun_hours": "4.5",
          "panel_watts": "400"
        }
      },
      {
        "label": "60 kWh / day",
        "values": [
          "1800 kWh",
          "16.67 kW",
          "42 × 400W",
          "82 m²"
        ],
        "params": {
          "daily_kwh": "60",
          "sun_hours": "4.5",
          "panel_watts": "400"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "10 kWh / día",
          "values": [
            "300 kWh",
            "2,50 kW",
            "7 × 400W",
            "14 m²"
          ],
          "params": {
            "daily_kwh": "10",
            "sun_hours": "5",
            "panel_watts": "400"
          }
        },
        {
          "label": "20 kWh / día",
          "values": [
            "600 kWh",
            "5,00 kW",
            "13 × 400W",
            "25 m²"
          ],
          "params": {
            "daily_kwh": "20",
            "sun_hours": "5",
            "panel_watts": "400"
          }
        },
        {
          "label": "30 kWh / día",
          "values": [
            "900 kWh",
            "7,50 kW",
            "19 × 400W",
            "37 m²"
          ],
          "params": {
            "daily_kwh": "30",
            "sun_hours": "5",
            "panel_watts": "400"
          }
        },
        {
          "label": "45 kWh / día",
          "values": [
            "1350 kWh",
            "11,25 kW",
            "29 × 400W",
            "57 m²"
          ],
          "params": {
            "daily_kwh": "45",
            "sun_hours": "5",
            "panel_watts": "400"
          }
        },
        {
          "label": "60 kWh / día",
          "values": [
            "1800 kWh",
            "15,00 kW",
            "38 × 400W",
            "74 m²"
          ],
          "params": {
            "daily_kwh": "60",
            "sun_hours": "5",
            "panel_watts": "400"
          }
        }
      ],
      "fr": [
        {
          "label": "10 kWh / jour",
          "values": [
            "300 kWh",
            "3,29 kW",
            "9 × 400W",
            "18 m²"
          ],
          "params": {
            "daily_kwh": "10",
            "sun_hours": "3.8",
            "panel_watts": "400"
          }
        },
        {
          "label": "20 kWh / jour",
          "values": [
            "600 kWh",
            "6,58 kW",
            "17 × 400W",
            "33 m²"
          ],
          "params": {
            "daily_kwh": "20",
            "sun_hours": "3.8",
            "panel_watts": "400"
          }
        },
        {
          "label": "30 kWh / jour",
          "values": [
            "900 kWh",
            "9,87 kW",
            "25 × 400W",
            "49 m²"
          ],
          "params": {
            "daily_kwh": "30",
            "sun_hours": "3.8",
            "panel_watts": "400"
          }
        },
        {
          "label": "45 kWh / jour",
          "values": [
            "1350 kWh",
            "14,80 kW",
            "38 × 400W",
            "74 m²"
          ],
          "params": {
            "daily_kwh": "45",
            "sun_hours": "3.8",
            "panel_watts": "400"
          }
        },
        {
          "label": "60 kWh / jour",
          "values": [
            "1800 kWh",
            "19,74 kW",
            "50 × 400W",
            "98 m²"
          ],
          "params": {
            "daily_kwh": "60",
            "sun_hours": "3.8",
            "panel_watts": "400"
          }
        }
      ],
      "de": [
        {
          "label": "10 kWh / Tag",
          "values": [
            "300 kWh",
            "4,17 kW",
            "11 × 400W",
            "21 m²"
          ],
          "params": {
            "daily_kwh": "10",
            "sun_hours": "3",
            "panel_watts": "400"
          }
        },
        {
          "label": "20 kWh / Tag",
          "values": [
            "600 kWh",
            "8,33 kW",
            "21 × 400W",
            "41 m²"
          ],
          "params": {
            "daily_kwh": "20",
            "sun_hours": "3",
            "panel_watts": "400"
          }
        },
        {
          "label": "30 kWh / Tag",
          "values": [
            "900 kWh",
            "12,50 kW",
            "32 × 400W",
            "62 m²"
          ],
          "params": {
            "daily_kwh": "30",
            "sun_hours": "3",
            "panel_watts": "400"
          }
        },
        {
          "label": "45 kWh / Tag",
          "values": [
            "1350 kWh",
            "18,75 kW",
            "47 × 400W",
            "92 m²"
          ],
          "params": {
            "daily_kwh": "45",
            "sun_hours": "3",
            "panel_watts": "400"
          }
        },
        {
          "label": "60 kWh / Tag",
          "values": [
            "1800 kWh",
            "25,00 kW",
            "63 × 400W",
            "123 m²"
          ],
          "params": {
            "daily_kwh": "60",
            "sun_hours": "3",
            "panel_watts": "400"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "free-fall-calculator",
      "velocity-calculator",
      "acceleration-calculator"
    ],
    "title": "Free Fall Drop Time & Impact Velocity Reference (g = 9.81 m/s²)",
    "description": "Ideal vacuum fall duration and terminal impact speed across drop heights from 5 meters to 100 meters.",
    "headers": [
      "Drop Height",
      "Fall Time (t)",
      "Impact Speed (m/s)",
      "Impact Speed (km/h)"
    ],
    "translations": {
      "es": {
        "title": "Tabla de Caída Libre: Tiempo y Velocidad de Impacto (g = 9,81 m/s²)",
        "description": "Tiempo de descenso y velocidad final en el vacío para alturas de caída de 5 a 100 metros.",
        "headers": [
          "Altura de Caída",
          "Tiempo (t)",
          "Velocidad (m/s)",
          "Velocidad (km/h)"
        ]
      },
      "fr": {
        "title": "Tableau de Chute Libre : Durée et Vitesse d’Impact (g = 9,81 m/s²)",
        "description": "Temps de chute et vitesse finale hors frottements de l’air pour des hauteurs de 5 à 100 mètres.",
        "headers": [
          "Hauteur",
          "Durée (t)",
          "Vitesse (m/s)",
          "Vitesse (km/h)"
        ]
      },
      "de": {
        "title": "Freier-Fall-Referenztabelle: Fallzeit & Endgeschwindigkeit (g = 9,81 m/s²)",
        "description": "Falldauer und Aufprallgeschwindigkeit im Vakuum für Fallhöhen von 5 bis 100 Metern.",
        "headers": [
          "Fallhöhe",
          "Fallzeit (t)",
          "Tempo (m/s)",
          "Tempo (km/h)"
        ]
      }
    },
    "rows": [
      {
        "label": "5 m",
        "values": [
          "1.01 s",
          "9.90 m/s",
          "35.7 km/h"
        ],
        "params": {
          "height": "5",
          "gravity": "9.80665"
        }
      },
      {
        "label": "10 m",
        "values": [
          "1.43 s",
          "14.00 m/s",
          "50.4 km/h"
        ],
        "params": {
          "height": "10",
          "gravity": "9.80665"
        }
      },
      {
        "label": "25 m",
        "values": [
          "2.26 s",
          "22.14 m/s",
          "79.7 km/h"
        ],
        "params": {
          "height": "25",
          "gravity": "9.80665"
        }
      },
      {
        "label": "50 m",
        "values": [
          "3.19 s",
          "31.32 m/s",
          "112.7 km/h"
        ],
        "params": {
          "height": "50",
          "gravity": "9.80665"
        }
      },
      {
        "label": "100 m",
        "values": [
          "4.52 s",
          "44.29 m/s",
          "159.4 km/h"
        ],
        "params": {
          "height": "100",
          "gravity": "9.80665"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "5 m",
          "values": [
            "1,01 s",
            "9,90 m/s",
            "35,7 km/h"
          ],
          "params": {
            "height": "5",
            "gravity": "9.80665"
          }
        },
        {
          "label": "10 m",
          "values": [
            "1,43 s",
            "14,00 m/s",
            "50,4 km/h"
          ],
          "params": {
            "height": "10",
            "gravity": "9.80665"
          }
        },
        {
          "label": "25 m",
          "values": [
            "2,26 s",
            "22,14 m/s",
            "79,7 km/h"
          ],
          "params": {
            "height": "25",
            "gravity": "9.80665"
          }
        },
        {
          "label": "50 m",
          "values": [
            "3,19 s",
            "31,32 m/s",
            "112,7 km/h"
          ],
          "params": {
            "height": "50",
            "gravity": "9.80665"
          }
        },
        {
          "label": "100 m",
          "values": [
            "4,52 s",
            "44,29 m/s",
            "159,4 km/h"
          ],
          "params": {
            "height": "100",
            "gravity": "9.80665"
          }
        }
      ],
      "fr": [
        {
          "label": "5 m",
          "values": [
            "1,01 s",
            "9,90 m/s",
            "35,7 km/h"
          ],
          "params": {
            "height": "5",
            "gravity": "9.80665"
          }
        },
        {
          "label": "10 m",
          "values": [
            "1,43 s",
            "14,00 m/s",
            "50,4 km/h"
          ],
          "params": {
            "height": "10",
            "gravity": "9.80665"
          }
        },
        {
          "label": "25 m",
          "values": [
            "2,26 s",
            "22,14 m/s",
            "79,7 km/h"
          ],
          "params": {
            "height": "25",
            "gravity": "9.80665"
          }
        },
        {
          "label": "50 m",
          "values": [
            "3,19 s",
            "31,32 m/s",
            "112,7 km/h"
          ],
          "params": {
            "height": "50",
            "gravity": "9.80665"
          }
        },
        {
          "label": "100 m",
          "values": [
            "4,52 s",
            "44,29 m/s",
            "159,4 km/h"
          ],
          "params": {
            "height": "100",
            "gravity": "9.80665"
          }
        }
      ],
      "de": [
        {
          "label": "5 m",
          "values": [
            "1,01 s",
            "9,90 m/s",
            "35,7 km/h"
          ],
          "params": {
            "height": "5",
            "gravity": "9.80665"
          }
        },
        {
          "label": "10 m",
          "values": [
            "1,43 s",
            "14,00 m/s",
            "50,4 km/h"
          ],
          "params": {
            "height": "10",
            "gravity": "9.80665"
          }
        },
        {
          "label": "25 m",
          "values": [
            "2,26 s",
            "22,14 m/s",
            "79,7 km/h"
          ],
          "params": {
            "height": "25",
            "gravity": "9.80665"
          }
        },
        {
          "label": "50 m",
          "values": [
            "3,19 s",
            "31,32 m/s",
            "112,7 km/h"
          ],
          "params": {
            "height": "50",
            "gravity": "9.80665"
          }
        },
        {
          "label": "100 m",
          "values": [
            "4,52 s",
            "44,29 m/s",
            "159,4 km/h"
          ],
          "params": {
            "height": "100",
            "gravity": "9.80665"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "force-calculator",
      "kinetic-energy-calculator",
      "potential-energy-calculator",
      "momentum-calculator",
      "work-calculator",
      "power-calculator",
      "projectile-motion-calculator"
    ],
    "title": "Classical Mechanics Energy & Momentum Matrix (1,500 kg Vehicle)",
    "description": "Illustrates the quadratic v² scaling of kinetic energy and braking distance (at 7.5 m/s² dry deceleration) compared to linear momentum.",
    "headers": [
      "Vehicle Speed",
      "Kinetic Energy (½mv²)",
      "Linear Momentum (mv)",
      "Braking Distance (7.5 m/s²)"
    ],
    "translations": {
      "es": {
        "title": "Energía Cinética, Momento y Distancia de Frenado (Vehículo de 1.500 kg)",
        "description": "Demuestra el crecimiento cuadrático (v²) de la energía cinética y la frenada frente al momento lineal.",
        "headers": [
          "Velocidad",
          "Energía Cinética",
          "Momento Lineal",
          "Frenado (7,5 m/s²)"
        ]
      },
      "fr": {
        "title": "Énergie Cinétique, Quantité de Mouvement et Freinage (Véhicule 1 500 kg)",
        "description": "Illustre la croissance quadratique (v²) de l’énergie cinétique et de la distance de freinage.",
        "headers": [
          "Vitesse",
          "Énergie Cinétique",
          "Quantité de Mvt",
          "Freinage (7,5 m/s²)"
        ]
      },
      "de": {
        "title": "Kinetische Energie, Impuls & Bremsweg (1.500-kg-PKW)",
        "description": "Veranschaulicht den quadratischen Anstieg (v²) von Bewegungsenergie und reinem Bremsweg bei 7,5 m/s² Verzögerung.",
        "headers": [
          "Geschwindigkeit",
          "Kinetische Energie",
          "Impuls (m·v)",
          "Bremsweg (7,5 m/s²)"
        ]
      }
    },
    "rows": [
      {
        "label": "19 mph (30 km/h)",
        "values": [
          "52.1 kJ",
          "12,500 kg·m/s",
          "4.6 m"
        ],
        "params": {
          "mass": "1500",
          "velocity": "8.33"
        }
      },
      {
        "label": "31 mph (50 km/h)",
        "values": [
          "144.7 kJ",
          "20,833 kg·m/s",
          "12.9 m"
        ],
        "params": {
          "mass": "1500",
          "velocity": "13.89"
        }
      },
      {
        "label": "50 mph (80 km/h)",
        "values": [
          "370.4 kJ",
          "33,333 kg·m/s",
          "32.9 m"
        ],
        "params": {
          "mass": "1500",
          "velocity": "22.22"
        }
      },
      {
        "label": "62 mph (100 km/h)",
        "values": [
          "578.7 kJ",
          "41,667 kg·m/s",
          "51.4 m"
        ],
        "params": {
          "mass": "1500",
          "velocity": "27.78"
        }
      },
      {
        "label": "81 mph (130 km/h)",
        "values": [
          "978.0 kJ",
          "54,167 kg·m/s",
          "86.9 m"
        ],
        "params": {
          "mass": "1500",
          "velocity": "36.11"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "30 km/h (8,3 m/s)",
          "values": [
            "52,1 kJ",
            "12.500 kg·m/s",
            "4,6 m"
          ],
          "params": {
            "mass": "1500",
            "velocity": "8.33"
          }
        },
        {
          "label": "50 km/h (13,9 m/s)",
          "values": [
            "144,7 kJ",
            "20.833 kg·m/s",
            "12,9 m"
          ],
          "params": {
            "mass": "1500",
            "velocity": "13.89"
          }
        },
        {
          "label": "80 km/h (22,2 m/s)",
          "values": [
            "370,4 kJ",
            "33.333 kg·m/s",
            "32,9 m"
          ],
          "params": {
            "mass": "1500",
            "velocity": "22.22"
          }
        },
        {
          "label": "100 km/h (27,8 m/s)",
          "values": [
            "578,7 kJ",
            "41.667 kg·m/s",
            "51,4 m"
          ],
          "params": {
            "mass": "1500",
            "velocity": "27.78"
          }
        },
        {
          "label": "130 km/h (36,1 m/s)",
          "values": [
            "978,0 kJ",
            "54.167 kg·m/s",
            "86,9 m"
          ],
          "params": {
            "mass": "1500",
            "velocity": "36.11"
          }
        }
      ],
      "fr": [
        {
          "label": "30 km/h (8,3 m/s)",
          "values": [
            "52,1 kJ",
            "12 500 kg·m/s",
            "4,6 m"
          ],
          "params": {
            "mass": "1500",
            "velocity": "8.33"
          }
        },
        {
          "label": "50 km/h (13,9 m/s)",
          "values": [
            "144,7 kJ",
            "20 833 kg·m/s",
            "12,9 m"
          ],
          "params": {
            "mass": "1500",
            "velocity": "13.89"
          }
        },
        {
          "label": "80 km/h (22,2 m/s)",
          "values": [
            "370,4 kJ",
            "33 333 kg·m/s",
            "32,9 m"
          ],
          "params": {
            "mass": "1500",
            "velocity": "22.22"
          }
        },
        {
          "label": "100 km/h (27,8 m/s)",
          "values": [
            "578,7 kJ",
            "41 667 kg·m/s",
            "51,4 m"
          ],
          "params": {
            "mass": "1500",
            "velocity": "27.78"
          }
        },
        {
          "label": "130 km/h (36,1 m/s)",
          "values": [
            "978,0 kJ",
            "54 167 kg·m/s",
            "86,9 m"
          ],
          "params": {
            "mass": "1500",
            "velocity": "36.11"
          }
        }
      ],
      "de": [
        {
          "label": "30 km/h (8,3 m/s)",
          "values": [
            "52,1 kJ",
            "12.500 kg·m/s",
            "4,6 m"
          ],
          "params": {
            "mass": "1500",
            "velocity": "8.33"
          }
        },
        {
          "label": "50 km/h (13,9 m/s)",
          "values": [
            "144,7 kJ",
            "20.833 kg·m/s",
            "12,9 m"
          ],
          "params": {
            "mass": "1500",
            "velocity": "13.89"
          }
        },
        {
          "label": "80 km/h (22,2 m/s)",
          "values": [
            "370,4 kJ",
            "33.333 kg·m/s",
            "32,9 m"
          ],
          "params": {
            "mass": "1500",
            "velocity": "22.22"
          }
        },
        {
          "label": "100 km/h (27,8 m/s)",
          "values": [
            "578,7 kJ",
            "41.667 kg·m/s",
            "51,4 m"
          ],
          "params": {
            "mass": "1500",
            "velocity": "27.78"
          }
        },
        {
          "label": "130 km/h (36,1 m/s)",
          "values": [
            "978,0 kJ",
            "54.167 kg·m/s",
            "86,9 m"
          ],
          "params": {
            "mass": "1500",
            "velocity": "36.11"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "density-calculator",
      "weight-calculator"
    ],
    "title": "Standard Engineering Material Density & Specific Weight Table",
    "description": "Reference mass densities (g/cm³ and kg/m³) and Earth gravitational specific weights (kN/m³) for common fluids, construction materials, and metals.",
    "headers": [
      "Material",
      "Density (g/cm³)",
      "Density (kg/m³)",
      "Specific Weight (kN/m³)"
    ],
    "translations": {
      "es": {
        "title": "Tabla de Densidad y Peso Específico de Materiales de Ingeniería",
        "description": "Densidades de referencia (g/cm³ y kg/m³) y peso específico gravitatorio de materiales comunes.",
        "headers": [
          "Material",
          "Densidad (g/cm³)",
          "Densidad (kg/m³)",
          "Peso Específico"
        ]
      },
      "fr": {
        "title": "Tableau des Masses Volumiques et Poids Spécifiques des Matériaux",
        "description": "Masses volumiques de référence (g/cm³ et kg/m³) pour l’eau, le béton et les métaux usuels.",
        "headers": [
          "Matériau",
          "Densité (g/cm³)",
          "Masse Vol. (kg/m³)",
          "Poids Spécifique"
        ]
      },
      "de": {
        "title": "Dichte- & Wichte-Referenztabelle gängiger Werkstoffe",
        "description": "Materialdichten (g/cm³ und kg/m³) sowie spezifisches Gewicht (kN/m³) von Wasser, Beton und Metallen.",
        "headers": [
          "Werkstoff",
          "Dichte (g/cm³)",
          "Dichte (kg/m³)",
          "Wichte (kN/m³)"
        ]
      }
    },
    "rows": [
      {
        "label": "Water (4°C)",
        "values": [
          "1.00 g/cm³",
          "1,000 kg/m³",
          "9.8 kN/m³"
        ],
        "params": {
          "density": "1000",
          "volume": "1"
        }
      },
      {
        "label": "Concrete (Standard)",
        "values": [
          "2.40 g/cm³",
          "2,400 kg/m³",
          "23.5 kN/m³"
        ],
        "params": {
          "density": "2400",
          "volume": "1"
        }
      },
      {
        "label": "Aluminum (6061)",
        "values": [
          "2.70 g/cm³",
          "2,700 kg/m³",
          "26.5 kN/m³"
        ],
        "params": {
          "density": "2700",
          "volume": "1"
        }
      },
      {
        "label": "Carbon Steel",
        "values": [
          "7.85 g/cm³",
          "7,850 kg/m³",
          "77.0 kN/m³"
        ],
        "params": {
          "density": "7850",
          "volume": "1"
        }
      },
      {
        "label": "Pure Copper",
        "values": [
          "8.96 g/cm³",
          "8,960 kg/m³",
          "87.9 kN/m³"
        ],
        "params": {
          "density": "8960",
          "volume": "1"
        }
      },
      {
        "label": "24K Gold",
        "values": [
          "19.32 g/cm³",
          "19,320 kg/m³",
          "189.5 kN/m³"
        ],
        "params": {
          "density": "19320",
          "volume": "1"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "Agua (4 °C)",
          "values": [
            "1,00 g/cm³",
            "1.000 kg/m³",
            "9,8 kN/m³"
          ],
          "params": {
            "density": "1000",
            "volume": "1"
          }
        },
        {
          "label": "Hormigón Estándar",
          "values": [
            "2,40 g/cm³",
            "2.400 kg/m³",
            "23,5 kN/m³"
          ],
          "params": {
            "density": "2400",
            "volume": "1"
          }
        },
        {
          "label": "Aluminio (6061)",
          "values": [
            "2,70 g/cm³",
            "2.700 kg/m³",
            "26,5 kN/m³"
          ],
          "params": {
            "density": "2700",
            "volume": "1"
          }
        },
        {
          "label": "Acero al Carbono",
          "values": [
            "7,85 g/cm³",
            "7.850 kg/m³",
            "77,0 kN/m³"
          ],
          "params": {
            "density": "7850",
            "volume": "1"
          }
        },
        {
          "label": "Cobre Puro",
          "values": [
            "8,96 g/cm³",
            "8.960 kg/m³",
            "87,9 kN/m³"
          ],
          "params": {
            "density": "8960",
            "volume": "1"
          }
        },
        {
          "label": "Oro 24K",
          "values": [
            "19,32 g/cm³",
            "19.320 kg/m³",
            "189,5 kN/m³"
          ],
          "params": {
            "density": "19320",
            "volume": "1"
          }
        }
      ],
      "fr": [
        {
          "label": "Eau (4 °C)",
          "values": [
            "1,00 g/cm³",
            "1 000 kg/m³",
            "9,8 kN/m³"
          ],
          "params": {
            "density": "1000",
            "volume": "1"
          }
        },
        {
          "label": "Béton Courant",
          "values": [
            "2,40 g/cm³",
            "2 400 kg/m³",
            "23,5 kN/m³"
          ],
          "params": {
            "density": "2400",
            "volume": "1"
          }
        },
        {
          "label": "Aluminium (6061)",
          "values": [
            "2,70 g/cm³",
            "2 700 kg/m³",
            "26,5 kN/m³"
          ],
          "params": {
            "density": "2700",
            "volume": "1"
          }
        },
        {
          "label": "Acier au Carbone",
          "values": [
            "7,85 g/cm³",
            "7 850 kg/m³",
            "77,0 kN/m³"
          ],
          "params": {
            "density": "7850",
            "volume": "1"
          }
        },
        {
          "label": "Cuivre Pur",
          "values": [
            "8,96 g/cm³",
            "8 960 kg/m³",
            "87,9 kN/m³"
          ],
          "params": {
            "density": "8960",
            "volume": "1"
          }
        },
        {
          "label": "Or Pur 24K",
          "values": [
            "19,32 g/cm³",
            "19 320 kg/m³",
            "189,5 kN/m³"
          ],
          "params": {
            "density": "19320",
            "volume": "1"
          }
        }
      ],
      "de": [
        {
          "label": "Wasser (4 °C)",
          "values": [
            "1,00 g/cm³",
            "1.000 kg/m³",
            "9,8 kN/m³"
          ],
          "params": {
            "density": "1000",
            "volume": "1"
          }
        },
        {
          "label": "Normalbeton",
          "values": [
            "2,40 g/cm³",
            "2.400 kg/m³",
            "23,5 kN/m³"
          ],
          "params": {
            "density": "2400",
            "volume": "1"
          }
        },
        {
          "label": "Aluminium (6061)",
          "values": [
            "2,70 g/cm³",
            "2.700 kg/m³",
            "26,5 kN/m³"
          ],
          "params": {
            "density": "2700",
            "volume": "1"
          }
        },
        {
          "label": "Baustahl",
          "values": [
            "7,85 g/cm³",
            "7.850 kg/m³",
            "77,0 kN/m³"
          ],
          "params": {
            "density": "7850",
            "volume": "1"
          }
        },
        {
          "label": "Reinkupfer",
          "values": [
            "8,96 g/cm³",
            "8.960 kg/m³",
            "87,9 kN/m³"
          ],
          "params": {
            "density": "8960",
            "volume": "1"
          }
        },
        {
          "label": "Feingold 24K",
          "values": [
            "19,32 g/cm³",
            "19.320 kg/m³",
            "189,5 kN/m³"
          ],
          "params": {
            "density": "19320",
            "volume": "1"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "molarity-calculator",
      "molality-calculator",
      "dilution-calculator",
      "molarity-dilution-calculator"
    ],
    "title": "Standard NaCl Molarity & 5M Stock Dilution Lab Table (MW = 58.44 g/mol)",
    "description": "Exact sodium chloride mass required for 250 mL, 500 mL, and 1 L solutions—plus stock aliquot needed from a 5.0 M stock to make 1 L.",
    "headers": [
      "Target Molarity",
      "Mass for 250 mL",
      "Mass for 500 mL",
      "Mass for 1.0 L",
      "5M Stock → 1 L"
    ],
    "translations": {
      "es": {
        "title": "Tabla de Preparación Molar de NaCl y Diluciones desde Stock 5 M",
        "description": "Gramos exactos de cloruro de sodio (58,44 g/mol) para 250 mL, 500 mL y 1 L, más alícuota desde solución madre 5 M.",
        "headers": [
          "Molaridad Objetivo",
          "Masa (250 mL)",
          "Masa (500 mL)",
          "Masa (1,0 L)",
          "Stock 5 M → 1 L"
        ]
      },
      "fr": {
        "title": "Table de Préparation Molaire NaCl et Dilution Stock 5 M (58,44 g/mol)",
        "description": "Masse exacte de NaCl pour 250 mL, 500 mL et 1 L, ainsi que le volume de solution mère 5 M à prélever.",
        "headers": [
          "Molarité Cible",
          "Masse (250 mL)",
          "Masse (500 mL)",
          "Masse (1,0 L)",
          "Stock 5 M → 1 L"
        ]
      },
      "de": {
        "title": "NaCl-Molaritäts- & 5M-Verdünnungs-Labortabelle (M = 58,44 g/mol)",
        "description": "Exakte Einwaage an Natriumchlorid für 250 mL, 500 mL und 1 L sowie benötigtes Stammlösungsvolumen (5 M → 1 L).",
        "headers": [
          "Ziel-Molarität",
          "Einwaage 250 mL",
          "Einwaage 500 mL",
          "Einwaage 1,0 L",
          "5M-Stock → 1 L"
        ]
      }
    },
    "rows": [
      {
        "label": "0.10 M",
        "values": [
          "1.46 g",
          "2.92 g",
          "5.84 g",
          "20 mL (5M)"
        ],
        "params": {
          "molarity": "0.1",
          "molar_mass": "58.44",
          "volume_l": "1"
        }
      },
      {
        "label": "0.25 M",
        "values": [
          "3.65 g",
          "7.30 g",
          "14.61 g",
          "50 mL (5M)"
        ],
        "params": {
          "molarity": "0.25",
          "molar_mass": "58.44",
          "volume_l": "1"
        }
      },
      {
        "label": "0.50 M",
        "values": [
          "7.30 g",
          "14.61 g",
          "29.22 g",
          "100 mL (5M)"
        ],
        "params": {
          "molarity": "0.5",
          "molar_mass": "58.44",
          "volume_l": "1"
        }
      },
      {
        "label": "1.00 M",
        "values": [
          "14.61 g",
          "29.22 g",
          "58.44 g",
          "200 mL (5M)"
        ],
        "params": {
          "molarity": "1",
          "molar_mass": "58.44",
          "volume_l": "1"
        }
      },
      {
        "label": "2.00 M",
        "values": [
          "29.22 g",
          "58.44 g",
          "116.88 g",
          "400 mL (5M)"
        ],
        "params": {
          "molarity": "2",
          "molar_mass": "58.44",
          "volume_l": "1"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "0,10 M",
          "values": [
            "1,46 g",
            "2,92 g",
            "5,84 g",
            "20 mL (5M)"
          ],
          "params": {
            "molarity": "0.1",
            "molar_mass": "58.44",
            "volume_l": "1"
          }
        },
        {
          "label": "0,25 M",
          "values": [
            "3,65 g",
            "7,30 g",
            "14,61 g",
            "50 mL (5M)"
          ],
          "params": {
            "molarity": "0.25",
            "molar_mass": "58.44",
            "volume_l": "1"
          }
        },
        {
          "label": "0,50 M",
          "values": [
            "7,30 g",
            "14,61 g",
            "29,22 g",
            "100 mL (5M)"
          ],
          "params": {
            "molarity": "0.5",
            "molar_mass": "58.44",
            "volume_l": "1"
          }
        },
        {
          "label": "1,00 M",
          "values": [
            "14,61 g",
            "29,22 g",
            "58,44 g",
            "200 mL (5M)"
          ],
          "params": {
            "molarity": "1",
            "molar_mass": "58.44",
            "volume_l": "1"
          }
        },
        {
          "label": "2,00 M",
          "values": [
            "29,22 g",
            "58,44 g",
            "116,88 g",
            "400 mL (5M)"
          ],
          "params": {
            "molarity": "2",
            "molar_mass": "58.44",
            "volume_l": "1"
          }
        }
      ],
      "fr": [
        {
          "label": "0,10 M",
          "values": [
            "1,46 g",
            "2,92 g",
            "5,84 g",
            "20 mL (5M)"
          ],
          "params": {
            "molarity": "0.1",
            "molar_mass": "58.44",
            "volume_l": "1"
          }
        },
        {
          "label": "0,25 M",
          "values": [
            "3,65 g",
            "7,30 g",
            "14,61 g",
            "50 mL (5M)"
          ],
          "params": {
            "molarity": "0.25",
            "molar_mass": "58.44",
            "volume_l": "1"
          }
        },
        {
          "label": "0,50 M",
          "values": [
            "7,30 g",
            "14,61 g",
            "29,22 g",
            "100 mL (5M)"
          ],
          "params": {
            "molarity": "0.5",
            "molar_mass": "58.44",
            "volume_l": "1"
          }
        },
        {
          "label": "1,00 M",
          "values": [
            "14,61 g",
            "29,22 g",
            "58,44 g",
            "200 mL (5M)"
          ],
          "params": {
            "molarity": "1",
            "molar_mass": "58.44",
            "volume_l": "1"
          }
        },
        {
          "label": "2,00 M",
          "values": [
            "29,22 g",
            "58,44 g",
            "116,88 g",
            "400 mL (5M)"
          ],
          "params": {
            "molarity": "2",
            "molar_mass": "58.44",
            "volume_l": "1"
          }
        }
      ],
      "de": [
        {
          "label": "0,10 M",
          "values": [
            "1,46 g",
            "2,92 g",
            "5,84 g",
            "20 mL (5M)"
          ],
          "params": {
            "molarity": "0.1",
            "molar_mass": "58.44",
            "volume_l": "1"
          }
        },
        {
          "label": "0,25 M",
          "values": [
            "3,65 g",
            "7,30 g",
            "14,61 g",
            "50 mL (5M)"
          ],
          "params": {
            "molarity": "0.25",
            "molar_mass": "58.44",
            "volume_l": "1"
          }
        },
        {
          "label": "0,50 M",
          "values": [
            "7,30 g",
            "14,61 g",
            "29,22 g",
            "100 mL (5M)"
          ],
          "params": {
            "molarity": "0.5",
            "molar_mass": "58.44",
            "volume_l": "1"
          }
        },
        {
          "label": "1,00 M",
          "values": [
            "14,61 g",
            "29,22 g",
            "58,44 g",
            "200 mL (5M)"
          ],
          "params": {
            "molarity": "1",
            "molar_mass": "58.44",
            "volume_l": "1"
          }
        },
        {
          "label": "2,00 M",
          "values": [
            "29,22 g",
            "58,44 g",
            "116,88 g",
            "400 mL (5M)"
          ],
          "params": {
            "molarity": "2",
            "molar_mass": "58.44",
            "volume_l": "1"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "mole-calculator",
      "molar-mass-calculator",
      "percent-composition-calculator",
      "stoichiometry-calculator",
      "empirical-formula-calculator",
      "molecular-formula-calculator",
      "balancing-chemical-equations-calculator"
    ],
    "title": "Common Laboratory Reagents: IUPAC Molar Mass & Mole Conversion Table",
    "description": "Standard IUPAC molar masses, moles contained in a 100 g sample, and mass needed for 0.50 moles of essential chemistry reagents.",
    "headers": [
      "Compound",
      "Molar Mass (g/mol)",
      "Moles in 100 g",
      "Mass for 0.5 mol"
    ],
    "translations": {
      "es": {
        "title": "Reactivos Comunes de Laboratorio: Masa Molar IUPAC y Conversión a Moles",
        "description": "Masas molares oficiales IUPAC, moles en 100 g y gramos necesarios para 0,50 moles.",
        "headers": [
          "Compuesto",
          "Masa Molar (g/mol)",
          "Moles en 100 g",
          "Masa para 0,5 mol"
        ]
      },
      "fr": {
        "title": "Réactifs Courants de Laboratoire : Masse Molaire IUPAC et Moles",
        "description": "Masses molaires IUPAC, quantité de matière dans 100 g et masse correspondant à 0,50 mol.",
        "headers": [
          "Composé",
          "Masse Molaire",
          "Moles dans 100 g",
          "Masse (0,5 mol)"
        ]
      },
      "de": {
        "title": "Gängige Laborchemikalien: Molare Masse (IUPAC) & Stoffmenge",
        "description": "Molare Massen nach IUPAC, Molzahl pro 100 g Probe sowie Einwaage für 0,50 mol.",
        "headers": [
          "Verbindung",
          "Molare Masse",
          "Mol in 100 g",
          "Masse für 0,5 mol"
        ]
      }
    },
    "rows": [
      {
        "label": "H₂O (Water)",
        "values": [
          "18.015 g/mol",
          "5.551 mol",
          "9.01 g"
        ],
        "params": {
          "molar_mass": "18.015",
          "mass_g": "100"
        }
      },
      {
        "label": "NaCl (Sodium Chloride)",
        "values": [
          "58.443 g/mol",
          "1.711 mol",
          "29.22 g"
        ],
        "params": {
          "molar_mass": "58.443",
          "mass_g": "100"
        }
      },
      {
        "label": "NaOH (Sodium Hydroxide)",
        "values": [
          "39.997 g/mol",
          "2.500 mol",
          "20.00 g"
        ],
        "params": {
          "molar_mass": "39.997",
          "mass_g": "100"
        }
      },
      {
        "label": "H₂SO₄ (Sulfuric Acid)",
        "values": [
          "98.079 g/mol",
          "1.020 mol",
          "49.04 g"
        ],
        "params": {
          "molar_mass": "98.079",
          "mass_g": "100"
        }
      },
      {
        "label": "C₆H₁₂O₆ (Glucose)",
        "values": [
          "180.156 g/mol",
          "0.555 mol",
          "90.08 g"
        ],
        "params": {
          "molar_mass": "180.156",
          "mass_g": "100"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "H₂O (Agua)",
          "values": [
            "18,015 g/mol",
            "5,551 mol",
            "9,01 g"
          ],
          "params": {
            "molar_mass": "18.015",
            "mass_g": "100"
          }
        },
        {
          "label": "NaCl (Cloruro de Sodio)",
          "values": [
            "58,443 g/mol",
            "1,711 mol",
            "29,22 g"
          ],
          "params": {
            "molar_mass": "58.443",
            "mass_g": "100"
          }
        },
        {
          "label": "NaOH (Hidróxido de Sodio)",
          "values": [
            "39,997 g/mol",
            "2,500 mol",
            "20,00 g"
          ],
          "params": {
            "molar_mass": "39.997",
            "mass_g": "100"
          }
        },
        {
          "label": "H₂SO₄ (Ácido Sulfúrico)",
          "values": [
            "98,079 g/mol",
            "1,020 mol",
            "49,04 g"
          ],
          "params": {
            "molar_mass": "98.079",
            "mass_g": "100"
          }
        },
        {
          "label": "C₆H₁₂O₆ (Glucosa)",
          "values": [
            "180,156 g/mol",
            "0,555 mol",
            "90,08 g"
          ],
          "params": {
            "molar_mass": "180.156",
            "mass_g": "100"
          }
        }
      ],
      "fr": [
        {
          "label": "H₂O (Eau)",
          "values": [
            "18,015 g/mol",
            "5,551 mol",
            "9,01 g"
          ],
          "params": {
            "molar_mass": "18.015",
            "mass_g": "100"
          }
        },
        {
          "label": "NaCl (Chlorure de Sodium)",
          "values": [
            "58,443 g/mol",
            "1,711 mol",
            "29,22 g"
          ],
          "params": {
            "molar_mass": "58.443",
            "mass_g": "100"
          }
        },
        {
          "label": "NaOH (Hydroxyde de Sodium)",
          "values": [
            "39,997 g/mol",
            "2,500 mol",
            "20,00 g"
          ],
          "params": {
            "molar_mass": "39.997",
            "mass_g": "100"
          }
        },
        {
          "label": "H₂SO₄ (Acide Sulfurique)",
          "values": [
            "98,079 g/mol",
            "1,020 mol",
            "49,04 g"
          ],
          "params": {
            "molar_mass": "98.079",
            "mass_g": "100"
          }
        },
        {
          "label": "C₆H₁₂O₆ (Glucose)",
          "values": [
            "180,156 g/mol",
            "0,555 mol",
            "90,08 g"
          ],
          "params": {
            "molar_mass": "180.156",
            "mass_g": "100"
          }
        }
      ],
      "de": [
        {
          "label": "H₂O (Wasser)",
          "values": [
            "18,015 g/mol",
            "5,551 mol",
            "9,01 g"
          ],
          "params": {
            "molar_mass": "18.015",
            "mass_g": "100"
          }
        },
        {
          "label": "NaCl (Natriumchlorid)",
          "values": [
            "58,443 g/mol",
            "1,711 mol",
            "29,22 g"
          ],
          "params": {
            "molar_mass": "58.443",
            "mass_g": "100"
          }
        },
        {
          "label": "NaOH (Natriumhydroxid)",
          "values": [
            "39,997 g/mol",
            "2,500 mol",
            "20,00 g"
          ],
          "params": {
            "molar_mass": "39.997",
            "mass_g": "100"
          }
        },
        {
          "label": "H₂SO₄ (Schwefelsäure)",
          "values": [
            "98,079 g/mol",
            "1,020 mol",
            "49,04 g"
          ],
          "params": {
            "molar_mass": "98.079",
            "mass_g": "100"
          }
        },
        {
          "label": "C₆H₁₂O₆ (Glucose)",
          "values": [
            "180,156 g/mol",
            "0,555 mol",
            "90,08 g"
          ],
          "params": {
            "molar_mass": "180.156",
            "mass_g": "100"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "ph-calculator",
      "poh-calculator",
      "acid-base-calculator",
      "henderson-hasselbalch-equation-calculator",
      "buffer-calculator",
      "pka-calculator",
      "ka-calculator",
      "kb-calculator"
    ],
    "title": "Aqueous pH, pOH & Hydronium [H⁺] Ion Concentration Scale (25°C)",
    "description": "Logarithmic relationship between pH, pOH, [H⁺], and [OH⁻] across strongly acidic, neutral, and strongly alkaline reference solutions.",
    "headers": [
      "pH & Common Example",
      "pOH (14 - pH)",
      "[H⁺] Molarity",
      "[OH⁻] Molarity"
    ],
    "translations": {
      "es": {
        "title": "Escala de pH, pOH y Concentración de Iones [H⁺] en Agua (25 °C)",
        "description": "Relación logarítmica exacta entre pH, pOH, [H⁺] y [OH⁻] desde ácidos fuertes hasta bases fuertes.",
        "headers": [
          "pH y Referencia",
          "pOH (14 - pH)",
          "Molaridad [H⁺]",
          "Molaridad [OH⁻]"
        ]
      },
      "fr": {
        "title": "Échelle de pH, pOH et Concentrations Ioniques [H₃O⁺] / [OH⁻] (25 °C)",
        "description": "Correspondance logarithmique entre pH, pOH et molarités ioniques pour les solutions usuelles.",
        "headers": [
          "pH & Exemple",
          "pOH (14 - pH)",
          "Molarité [H⁺]",
          "Molarité [OH⁻]"
        ]
      },
      "de": {
        "title": "pH-, pOH- & Oxoniumionen-Skala [H⁺] bei 25 °C",
        "description": "Logarithmischer Zusammenhang zwischen pH-Wert, pOH-Wert sowie [H⁺]- und [OH⁻]-Konzentrationen.",
        "headers": [
          "pH-Wert & Beispiel",
          "pOH (14 - pH)",
          "[H⁺]-Konzentration",
          "[OH⁻]-Konzentration"
        ]
      }
    },
    "rows": [
      {
        "label": "pH 1 (Battery / Gastric Acid)",
        "values": [
          "pOH 13",
          "10⁻1 M",
          "10⁻13 M"
        ],
        "params": {
          "ph": "1"
        }
      },
      {
        "label": "pH 3 (Vinegar / Citrus Juice)",
        "values": [
          "pOH 11",
          "10⁻3 M",
          "10⁻11 M"
        ],
        "params": {
          "ph": "3"
        }
      },
      {
        "label": "pH 5 (Black Coffee / Rainwater)",
        "values": [
          "pOH 9",
          "10⁻5 M",
          "10⁻9 M"
        ],
        "params": {
          "ph": "5"
        }
      },
      {
        "label": "pH 7 (Pure Water (Neutral, 25°C))",
        "values": [
          "pOH 7",
          "10⁻7 M",
          "10⁻7 M"
        ],
        "params": {
          "ph": "7"
        }
      },
      {
        "label": "pH 9 (Baking Soda Solution)",
        "values": [
          "pOH 5",
          "10⁻9 M",
          "10⁻5 M"
        ],
        "params": {
          "ph": "9"
        }
      },
      {
        "label": "pH 12 (Household Ammonia / Bleach)",
        "values": [
          "pOH 2",
          "10⁻12 M",
          "10⁻2 M"
        ],
        "params": {
          "ph": "12"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "pH 1 (Ácido Gástrico / Batería)",
          "values": [
            "pOH 13",
            "10⁻1 M",
            "10⁻13 M"
          ],
          "params": {
            "ph": "1"
          }
        },
        {
          "label": "pH 3 (Vinagre / Cítricos)",
          "values": [
            "pOH 11",
            "10⁻3 M",
            "10⁻11 M"
          ],
          "params": {
            "ph": "3"
          }
        },
        {
          "label": "pH 5 (Café Negro / Lluvia)",
          "values": [
            "pOH 9",
            "10⁻5 M",
            "10⁻9 M"
          ],
          "params": {
            "ph": "5"
          }
        },
        {
          "label": "pH 7 (Agua Pura (Neutra, 25 °C))",
          "values": [
            "pOH 7",
            "10⁻7 M",
            "10⁻7 M"
          ],
          "params": {
            "ph": "7"
          }
        },
        {
          "label": "pH 9 (Bicarbonato de Sodio)",
          "values": [
            "pOH 5",
            "10⁻9 M",
            "10⁻5 M"
          ],
          "params": {
            "ph": "9"
          }
        },
        {
          "label": "pH 12 (Amoníaco / Lejía)",
          "values": [
            "pOH 2",
            "10⁻12 M",
            "10⁻2 M"
          ],
          "params": {
            "ph": "12"
          }
        }
      ],
      "fr": [
        {
          "label": "pH 1 (Acide Gastrique)",
          "values": [
            "pOH 13",
            "10⁻1 M",
            "10⁻13 M"
          ],
          "params": {
            "ph": "1"
          }
        },
        {
          "label": "pH 3 (Vinaigre / Citron)",
          "values": [
            "pOH 11",
            "10⁻3 M",
            "10⁻11 M"
          ],
          "params": {
            "ph": "3"
          }
        },
        {
          "label": "pH 5 (Café Noir / Pluie)",
          "values": [
            "pOH 9",
            "10⁻5 M",
            "10⁻9 M"
          ],
          "params": {
            "ph": "5"
          }
        },
        {
          "label": "pH 7 (Eau Pure (Neutre, 25 °C))",
          "values": [
            "pOH 7",
            "10⁻7 M",
            "10⁻7 M"
          ],
          "params": {
            "ph": "7"
          }
        },
        {
          "label": "pH 9 (Bicarbonate de Sodium)",
          "values": [
            "pOH 5",
            "10⁻9 M",
            "10⁻5 M"
          ],
          "params": {
            "ph": "9"
          }
        },
        {
          "label": "pH 12 (Ammoniaque / Javel)",
          "values": [
            "pOH 2",
            "10⁻12 M",
            "10⁻2 M"
          ],
          "params": {
            "ph": "12"
          }
        }
      ],
      "de": [
        {
          "label": "pH 1 (Magensäure / Batteriesäure)",
          "values": [
            "pOH 13",
            "10⁻1 M",
            "10⁻13 M"
          ],
          "params": {
            "ph": "1"
          }
        },
        {
          "label": "pH 3 (Essig / Zitronensaft)",
          "values": [
            "pOH 11",
            "10⁻3 M",
            "10⁻11 M"
          ],
          "params": {
            "ph": "3"
          }
        },
        {
          "label": "pH 5 (Schwarzer Kaffee / Regen)",
          "values": [
            "pOH 9",
            "10⁻5 M",
            "10⁻9 M"
          ],
          "params": {
            "ph": "5"
          }
        },
        {
          "label": "pH 7 (Reines Wasser (Neutral, 25 °C))",
          "values": [
            "pOH 7",
            "10⁻7 M",
            "10⁻7 M"
          ],
          "params": {
            "ph": "7"
          }
        },
        {
          "label": "pH 9 (Natronlösung)",
          "values": [
            "pOH 5",
            "10⁻9 M",
            "10⁻5 M"
          ],
          "params": {
            "ph": "9"
          }
        },
        {
          "label": "pH 12 (Ammoniak / Bleichlauge)",
          "values": [
            "pOH 2",
            "10⁻12 M",
            "10⁻2 M"
          ],
          "params": {
            "ph": "12"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "ideal-gas-law-calculator",
      "combined-gas-law-calculator",
      "boyles-law-calculator",
      "charles-law-calculator"
    ],
    "title": "Ideal Gas Law Molar Volume Reference (n = 1.00 mol, PV = nRT)",
    "description": "Exact volume occupied by 1 mole of an ideal gas across STP, room temperature, boiling point, and elevated pressures.",
    "headers": [
      "Gas Condition",
      "Kelvin Temp (T)",
      "Pressure (kPa)",
      "Molar Volume (L)"
    ],
    "translations": {
      "es": {
        "title": "Volumen Molar de Gas Ideal (n = 1,00 mol, PV = nRT)",
        "description": "Volumen exacto ocupado por 1 mol de gas ideal en condiciones normales (CNPT), ambiente y alta presión.",
        "headers": [
          "Condición del Gas",
          "Temp. Kelvin (T)",
          "Presión (kPa)",
          "Volumen Molar (L)"
        ]
      },
      "fr": {
        "title": "Volume Molaire d’un Gaz Parfait (n = 1,00 mol, PV = nRT)",
        "description": "Volume occupé par 1 mole de gaz parfait aux conditions normales (CNTP), ambiantes et sous pression.",
        "headers": [
          "Conditions",
          "Température (K)",
          "Pression (kPa)",
          "Volume Molaire (L)"
        ]
      },
      "de": {
        "title": "Molares Volumen eines Idealen Gases (n = 1,00 mol, pV = nRT)",
        "description": "Exaktes Volumen von 1 Mol idealem Gas bei Normbedingungen (0 °C), Raumtemperatur und erhöhtem Druck.",
        "headers": [
          "Gaszustand",
          "Temperatur (K)",
          "Druck (kPa)",
          "Molvolumen (L)"
        ]
      }
    },
    "rows": [
      {
        "label": "STP (0°C · 1.00 atm)",
        "values": [
          "273.15 K",
          "101.3 kPa",
          "22.41 L"
        ],
        "params": {
          "moles": "1",
          "temperature_k": "273.15",
          "pressure_atm": "1"
        }
      },
      {
        "label": "SATP (25°C · 1.00 atm)",
        "values": [
          "298.15 K",
          "101.3 kPa",
          "24.47 L"
        ],
        "params": {
          "moles": "1",
          "temperature_k": "298.15",
          "pressure_atm": "1"
        }
      },
      {
        "label": "Compressed (25°C · 2.00 atm)",
        "values": [
          "298.15 K",
          "202.7 kPa",
          "12.23 L"
        ],
        "params": {
          "moles": "1",
          "temperature_k": "298.15",
          "pressure_atm": "2"
        }
      },
      {
        "label": "Heated (100°C · 1.00 atm)",
        "values": [
          "373.15 K",
          "101.3 kPa",
          "30.62 L"
        ],
        "params": {
          "moles": "1",
          "temperature_k": "373.15",
          "pressure_atm": "1"
        }
      },
      {
        "label": "High Pressure (25°C · 10.0 atm)",
        "values": [
          "298.15 K",
          "1013.3 kPa",
          "2.45 L"
        ],
        "params": {
          "moles": "1",
          "temperature_k": "298.15",
          "pressure_atm": "10"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "CNPT (0 °C · 1,00 atm)",
          "values": [
            "273,15 K",
            "101,3 kPa",
            "22,41 L"
          ],
          "params": {
            "moles": "1",
            "temperature_k": "273.15",
            "pressure_atm": "1"
          }
        },
        {
          "label": "Ambiente (25 °C · 1,00 atm)",
          "values": [
            "298,15 K",
            "101,3 kPa",
            "24,47 L"
          ],
          "params": {
            "moles": "1",
            "temperature_k": "298.15",
            "pressure_atm": "1"
          }
        },
        {
          "label": "Comprimido (25 °C · 2,00 atm)",
          "values": [
            "298,15 K",
            "202,7 kPa",
            "12,23 L"
          ],
          "params": {
            "moles": "1",
            "temperature_k": "298.15",
            "pressure_atm": "2"
          }
        },
        {
          "label": "Calentado (100 °C · 1,00 atm)",
          "values": [
            "373,15 K",
            "101,3 kPa",
            "30,62 L"
          ],
          "params": {
            "moles": "1",
            "temperature_k": "373.15",
            "pressure_atm": "1"
          }
        },
        {
          "label": "Alta Presión (25 °C · 10,0 atm)",
          "values": [
            "298,15 K",
            "1013,3 kPa",
            "2,45 L"
          ],
          "params": {
            "moles": "1",
            "temperature_k": "298.15",
            "pressure_atm": "10"
          }
        }
      ],
      "fr": [
        {
          "label": "CNTP (0 °C · 1,00 atm)",
          "values": [
            "273,15 K",
            "101,3 kPa",
            "22,41 L"
          ],
          "params": {
            "moles": "1",
            "temperature_k": "273.15",
            "pressure_atm": "1"
          }
        },
        {
          "label": "Ambiante (25 °C · 1,00 atm)",
          "values": [
            "298,15 K",
            "101,3 kPa",
            "24,47 L"
          ],
          "params": {
            "moles": "1",
            "temperature_k": "298.15",
            "pressure_atm": "1"
          }
        },
        {
          "label": "Comprimé (25 °C · 2,00 atm)",
          "values": [
            "298,15 K",
            "202,7 kPa",
            "12,23 L"
          ],
          "params": {
            "moles": "1",
            "temperature_k": "298.15",
            "pressure_atm": "2"
          }
        },
        {
          "label": "Chauffé (100 °C · 1,00 atm)",
          "values": [
            "373,15 K",
            "101,3 kPa",
            "30,62 L"
          ],
          "params": {
            "moles": "1",
            "temperature_k": "373.15",
            "pressure_atm": "1"
          }
        },
        {
          "label": "Haute Pression (25 °C · 10,0 atm)",
          "values": [
            "298,15 K",
            "1013,3 kPa",
            "2,45 L"
          ],
          "params": {
            "moles": "1",
            "temperature_k": "298.15",
            "pressure_atm": "10"
          }
        }
      ],
      "de": [
        {
          "label": "Normbedingungen (0 °C · 1,00 atm)",
          "values": [
            "273,15 K",
            "101,3 kPa",
            "22,41 L"
          ],
          "params": {
            "moles": "1",
            "temperature_k": "273.15",
            "pressure_atm": "1"
          }
        },
        {
          "label": "Raumtemperatur (25 °C · 1,00 atm)",
          "values": [
            "298,15 K",
            "101,3 kPa",
            "24,47 L"
          ],
          "params": {
            "moles": "1",
            "temperature_k": "298.15",
            "pressure_atm": "1"
          }
        },
        {
          "label": "Verdichtet (25 °C · 2,00 atm)",
          "values": [
            "298,15 K",
            "202,7 kPa",
            "12,23 L"
          ],
          "params": {
            "moles": "1",
            "temperature_k": "298.15",
            "pressure_atm": "2"
          }
        },
        {
          "label": "Erhitzt (100 °C · 1,00 atm)",
          "values": [
            "373,15 K",
            "101,3 kPa",
            "30,62 L"
          ],
          "params": {
            "moles": "1",
            "temperature_k": "373.15",
            "pressure_atm": "1"
          }
        },
        {
          "label": "Hochdruck (25 °C · 10,0 atm)",
          "values": [
            "298,15 K",
            "1013,3 kPa",
            "2,45 L"
          ],
          "params": {
            "moles": "1",
            "temperature_k": "298.15",
            "pressure_atm": "10"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "gibbs-free-energy-calculator",
      "enthalpy-calculator",
      "heat-of-reaction-calculator",
      "hess-law-calculator",
      "calorimetry-calculator",
      "specific-heat-calculator",
      "equilibrium-constant-calculator",
      "ksp-calculator",
      "solubility-calculator",
      "nernst-equation-calculator",
      "electrochemical-cell-calculator",
      "cell-potential-calculator",
      "faradays-law-calculator",
      "electrolysis-calculator"
    ],
    "title": "Thermochemistry Specific Heat & Calorimetry Reference (1 kg, ΔT = +10°C)",
    "description": "NIST specific heat capacities and exact thermal energy (q = m·c·ΔT) required to heat 1 kg of key lab substances by 10°C.",
    "headers": [
      "Substance",
      "Specific Heat (c)",
      "Heat for 1 kg · +10°C",
      "Kilocalories (kcal)"
    ],
    "translations": {
      "es": {
        "title": "Tabla de Calor Específico y Calorimetría (1 kg, ΔT = +10 °C)",
        "description": "Capacidades caloríficas NIST y energía térmica exacta (q = m·c·ΔT) para elevar 1 kg en 10 °C.",
        "headers": [
          "Sustancia",
          "Calor Específico (c)",
          "Calor (1 kg · +10 °C)",
          "Kilocalorías"
        ]
      },
      "fr": {
        "title": "Table des Capacités Thermiques et Calorimétrie (1 kg, ΔT = +10 °C)",
        "description": "Chaleurs massiques NIST et énergie thermique (q = m·c·ΔT) pour chauffer 1 kg de +10 °C.",
        "headers": [
          "Substance",
          "Chaleur Massique (c)",
          "Énergie (+10 °C)",
          "Kilocalories"
        ]
      },
      "de": {
        "title": "Spezifische Wärmekapazität & Kalorimetrie-Tabelle (1 kg, ΔT = +10 K)",
        "description": "NIST-Referenzwerte der Wärmekapazität und erforderliche Wärmeenergie (q = m·c·ΔT) für 1 kg bei +10 K.",
        "headers": [
          "Stoff",
          "Wärmekapazität (c)",
          "Wärme (1 kg · +10 K)",
          "Kilokalorien"
        ]
      }
    },
    "rows": [
      {
        "label": "Liquid Water (H₂O)",
        "values": [
          "4.184 J/(g·K)",
          "41.84 kJ",
          "10.00 kcal"
        ],
        "params": {
          "mass_g": "1000",
          "specific_heat": "4.184",
          "delta_t": "10"
        }
      },
      {
        "label": "Ethanol (C₂H₅OH)",
        "values": [
          "2.440 J/(g·K)",
          "24.40 kJ",
          "5.83 kcal"
        ],
        "params": {
          "mass_g": "1000",
          "specific_heat": "2.44",
          "delta_t": "10"
        }
      },
      {
        "label": "Aluminum (Al)",
        "values": [
          "0.897 J/(g·K)",
          "8.97 kJ",
          "2.14 kcal"
        ],
        "params": {
          "mass_g": "1000",
          "specific_heat": "0.897",
          "delta_t": "10"
        }
      },
      {
        "label": "Iron / Steel (Fe)",
        "values": [
          "0.449 J/(g·K)",
          "4.49 kJ",
          "1.07 kcal"
        ],
        "params": {
          "mass_g": "1000",
          "specific_heat": "0.449",
          "delta_t": "10"
        }
      },
      {
        "label": "Copper (Cu)",
        "values": [
          "0.385 J/(g·K)",
          "3.85 kJ",
          "0.92 kcal"
        ],
        "params": {
          "mass_g": "1000",
          "specific_heat": "0.385",
          "delta_t": "10"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "Agua Líquida (H₂O)",
          "values": [
            "4,184 J/(g·K)",
            "41,84 kJ",
            "10,00 kcal"
          ],
          "params": {
            "mass_g": "1000",
            "specific_heat": "4.184",
            "delta_t": "10"
          }
        },
        {
          "label": "Etanol (C₂H₅OH)",
          "values": [
            "2,440 J/(g·K)",
            "24,40 kJ",
            "5,83 kcal"
          ],
          "params": {
            "mass_g": "1000",
            "specific_heat": "2.44",
            "delta_t": "10"
          }
        },
        {
          "label": "Aluminio (Al)",
          "values": [
            "0,897 J/(g·K)",
            "8,97 kJ",
            "2,14 kcal"
          ],
          "params": {
            "mass_g": "1000",
            "specific_heat": "0.897",
            "delta_t": "10"
          }
        },
        {
          "label": "Hierro / Acero (Fe)",
          "values": [
            "0,449 J/(g·K)",
            "4,49 kJ",
            "1,07 kcal"
          ],
          "params": {
            "mass_g": "1000",
            "specific_heat": "0.449",
            "delta_t": "10"
          }
        },
        {
          "label": "Cobre (Cu)",
          "values": [
            "0,385 J/(g·K)",
            "3,85 kJ",
            "0,92 kcal"
          ],
          "params": {
            "mass_g": "1000",
            "specific_heat": "0.385",
            "delta_t": "10"
          }
        }
      ],
      "fr": [
        {
          "label": "Eau Liquide (H₂O)",
          "values": [
            "4,184 J/(g·K)",
            "41,84 kJ",
            "10,00 kcal"
          ],
          "params": {
            "mass_g": "1000",
            "specific_heat": "4.184",
            "delta_t": "10"
          }
        },
        {
          "label": "Éthanol (C₂H₅OH)",
          "values": [
            "2,440 J/(g·K)",
            "24,40 kJ",
            "5,83 kcal"
          ],
          "params": {
            "mass_g": "1000",
            "specific_heat": "2.44",
            "delta_t": "10"
          }
        },
        {
          "label": "Aluminium (Al)",
          "values": [
            "0,897 J/(g·K)",
            "8,97 kJ",
            "2,14 kcal"
          ],
          "params": {
            "mass_g": "1000",
            "specific_heat": "0.897",
            "delta_t": "10"
          }
        },
        {
          "label": "Fer / Acier (Fe)",
          "values": [
            "0,449 J/(g·K)",
            "4,49 kJ",
            "1,07 kcal"
          ],
          "params": {
            "mass_g": "1000",
            "specific_heat": "0.449",
            "delta_t": "10"
          }
        },
        {
          "label": "Cuivre (Cu)",
          "values": [
            "0,385 J/(g·K)",
            "3,85 kJ",
            "0,92 kcal"
          ],
          "params": {
            "mass_g": "1000",
            "specific_heat": "0.385",
            "delta_t": "10"
          }
        }
      ],
      "de": [
        {
          "label": "Flüssiges Wasser (H₂O)",
          "values": [
            "4,184 J/(g·K)",
            "41,84 kJ",
            "10,00 kcal"
          ],
          "params": {
            "mass_g": "1000",
            "specific_heat": "4.184",
            "delta_t": "10"
          }
        },
        {
          "label": "Ethanol (C₂H₅OH)",
          "values": [
            "2,440 J/(g·K)",
            "24,40 kJ",
            "5,83 kcal"
          ],
          "params": {
            "mass_g": "1000",
            "specific_heat": "2.44",
            "delta_t": "10"
          }
        },
        {
          "label": "Aluminium (Al)",
          "values": [
            "0,897 J/(g·K)",
            "8,97 kJ",
            "2,14 kcal"
          ],
          "params": {
            "mass_g": "1000",
            "specific_heat": "0.897",
            "delta_t": "10"
          }
        },
        {
          "label": "Eisen / Stahl (Fe)",
          "values": [
            "0,449 J/(g·K)",
            "4,49 kJ",
            "1,07 kcal"
          ],
          "params": {
            "mass_g": "1000",
            "specific_heat": "0.449",
            "delta_t": "10"
          }
        },
        {
          "label": "Kupfer (Cu)",
          "values": [
            "0,385 J/(g·K)",
            "3,85 kJ",
            "0,92 kcal"
          ],
          "params": {
            "mass_g": "1000",
            "specific_heat": "0.385",
            "delta_t": "10"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "z-score-calculator",
      "confidence-interval-calculator"
    ],
    "title": "Standard Normal Z-Critical Values for Confidence Intervals (80% – 99.9%)",
    "description": "Two-tailed standard normal critical values z_(α/2) and tail probabilities used across hypothesis tests and polling margins of error.",
    "headers": [
      "Confidence Level",
      "Critical z-Score",
      "Two-Tailed α",
      "One-Tailed α/2"
    ],
    "translations": {
      "es": {
        "title": "Valores Críticos Z de la Distribución Normal (Confianza 80 % – 99,9 %)",
        "description": "Puntuaciones z_(α/2) bilaterales y áreas de cola estándar para intervalos de confianza y contrastes.",
        "headers": [
          "Nivel de Confianza",
          "Valor Crítico z",
          "α Bilateral",
          "Cola α/2"
        ]
      },
      "fr": {
        "title": "Valeurs Critiques Z de la Loi Normale (Confiance 80 % – 99,9 %)",
        "description": "Seuils critiques bilatéraux z_(α/2) utilisés dans le calcul des intervalles de confiance.",
        "headers": [
          "Niveau de Confiance",
          "Cote Critique z",
          "Risque α Bilatéral",
          "Queue α/2"
        ]
      },
      "de": {
        "title": "Kritische Z-Werte der Standardnormalverteilung (80 % – 99,9 %)",
        "description": "Zweiseitige kritische Quantile z_(α/2) und Irrtumswahrscheinlichkeiten für Konfidenzintervalle.",
        "headers": [
          "Konfidenzniveau",
          "Kritischer z-Wert",
          "Zweiseitiges α",
          "Einseitiges α/2"
        ]
      }
    },
    "rows": [
      {
        "label": "80%",
        "values": [
          "±1.282",
          "0.200",
          "0.1000"
        ],
        "params": {
          "confidence_level": "80",
          "z_score": "1.282"
        }
      },
      {
        "label": "90%",
        "values": [
          "±1.645",
          "0.100",
          "0.0500"
        ],
        "params": {
          "confidence_level": "90",
          "z_score": "1.645"
        }
      },
      {
        "label": "95%",
        "values": [
          "±1.960",
          "0.050",
          "0.0250"
        ],
        "params": {
          "confidence_level": "95",
          "z_score": "1.96"
        }
      },
      {
        "label": "98%",
        "values": [
          "±2.326",
          "0.020",
          "0.0100"
        ],
        "params": {
          "confidence_level": "98",
          "z_score": "2.326"
        }
      },
      {
        "label": "99%",
        "values": [
          "±2.576",
          "0.010",
          "0.0050"
        ],
        "params": {
          "confidence_level": "99",
          "z_score": "2.576"
        }
      },
      {
        "label": "99.9%",
        "values": [
          "±3.291",
          "0.001",
          "0.0005"
        ],
        "params": {
          "confidence_level": "99.9",
          "z_score": "3.291"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "80 %",
          "values": [
            "±1,282",
            "0,200",
            "0,1000"
          ],
          "params": {
            "confidence_level": "80",
            "z_score": "1.282"
          }
        },
        {
          "label": "90 %",
          "values": [
            "±1,645",
            "0,100",
            "0,0500"
          ],
          "params": {
            "confidence_level": "90",
            "z_score": "1.645"
          }
        },
        {
          "label": "95 %",
          "values": [
            "±1,960",
            "0,050",
            "0,0250"
          ],
          "params": {
            "confidence_level": "95",
            "z_score": "1.96"
          }
        },
        {
          "label": "98 %",
          "values": [
            "±2,326",
            "0,020",
            "0,0100"
          ],
          "params": {
            "confidence_level": "98",
            "z_score": "2.326"
          }
        },
        {
          "label": "99 %",
          "values": [
            "±2,576",
            "0,010",
            "0,0050"
          ],
          "params": {
            "confidence_level": "99",
            "z_score": "2.576"
          }
        },
        {
          "label": "99,9 %",
          "values": [
            "±3,291",
            "0,001",
            "0,0005"
          ],
          "params": {
            "confidence_level": "99.9",
            "z_score": "3.291"
          }
        }
      ],
      "fr": [
        {
          "label": "80 %",
          "values": [
            "±1,282",
            "0,200",
            "0,1000"
          ],
          "params": {
            "confidence_level": "80",
            "z_score": "1.282"
          }
        },
        {
          "label": "90 %",
          "values": [
            "±1,645",
            "0,100",
            "0,0500"
          ],
          "params": {
            "confidence_level": "90",
            "z_score": "1.645"
          }
        },
        {
          "label": "95 %",
          "values": [
            "±1,960",
            "0,050",
            "0,0250"
          ],
          "params": {
            "confidence_level": "95",
            "z_score": "1.96"
          }
        },
        {
          "label": "98 %",
          "values": [
            "±2,326",
            "0,020",
            "0,0100"
          ],
          "params": {
            "confidence_level": "98",
            "z_score": "2.326"
          }
        },
        {
          "label": "99 %",
          "values": [
            "±2,576",
            "0,010",
            "0,0050"
          ],
          "params": {
            "confidence_level": "99",
            "z_score": "2.576"
          }
        },
        {
          "label": "99,9 %",
          "values": [
            "±3,291",
            "0,001",
            "0,0005"
          ],
          "params": {
            "confidence_level": "99.9",
            "z_score": "3.291"
          }
        }
      ],
      "de": [
        {
          "label": "80 %",
          "values": [
            "±1,282",
            "0,200",
            "0,1000"
          ],
          "params": {
            "confidence_level": "80",
            "z_score": "1.282"
          }
        },
        {
          "label": "90 %",
          "values": [
            "±1,645",
            "0,100",
            "0,0500"
          ],
          "params": {
            "confidence_level": "90",
            "z_score": "1.645"
          }
        },
        {
          "label": "95 %",
          "values": [
            "±1,960",
            "0,050",
            "0,0250"
          ],
          "params": {
            "confidence_level": "95",
            "z_score": "1.96"
          }
        },
        {
          "label": "98 %",
          "values": [
            "±2,326",
            "0,020",
            "0,0100"
          ],
          "params": {
            "confidence_level": "98",
            "z_score": "2.326"
          }
        },
        {
          "label": "99 %",
          "values": [
            "±2,576",
            "0,010",
            "0,0050"
          ],
          "params": {
            "confidence_level": "99",
            "z_score": "2.576"
          }
        },
        {
          "label": "99,9 %",
          "values": [
            "±3,291",
            "0,001",
            "0,0005"
          ],
          "params": {
            "confidence_level": "99.9",
            "z_score": "3.291"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "t-test-calculator",
      "p-value-calculator",
      "probability-calculator"
    ],
    "title": "P-Value & Hypothesis Test Significance Interpretation Matrix",
    "description": "Standard academic and clinical decision thresholds mapping two-tailed p-values and Z-scores to hypothesis testing outcomes.",
    "headers": [
      "Two-Tailed p-Value",
      "Equivalent |Z|",
      "Evidence Strength",
      "Hypothesis Decision"
    ],
    "translations": {
      "es": {
        "title": "Tabla de Interpretación del Valor p y Significancia Estadística",
        "description": "Umbrales académicos y científicos estándar que relacionan el valor p bilateral con la decisión sobre la hipótesis nula.",
        "headers": [
          "Valor p Bilateral",
          "|Z| Equivalente",
          "Nivel de Evidencia",
          "Decisión Estadística"
        ]
      },
      "fr": {
        "title": "Grille d’Interprétation de la p-value et des Tests d’Hypothèse",
        "description": "Seuils scientifiques standards reliant la p-value bilatérale à l’interprétation statistique.",
        "headers": [
          "p-value Bilatérale",
          "|Z| Équivalent",
          "Force de Preuve",
          "Décision Statistique"
        ]
      },
      "de": {
        "title": "p-Wert- & Signifikanzniveau-Interpretationstabelle",
        "description": "Wissenschaftliche Standardgrenzen zur Bewertung zweiseitiger p-Werte und t-/z-Tests.",
        "headers": [
          "Zweiseitiger p-Wert",
          "Äquiv. |Z|",
          "Signifikanzstufe",
          "Testentscheidung"
        ]
      }
    },
    "rows": [
      {
        "label": "p < 0.001",
        "values": [
          "≥ 3.291",
          "Very Strong Evidence (***)",
          "Reject H₀ at α = 0.001"
        ],
        "params": {
          "z_score": "2.58"
        }
      },
      {
        "label": "p < 0.01",
        "values": [
          "≥ 2.576",
          "Strong Significance (**)",
          "Reject H₀ at α = 0.01"
        ],
        "params": {
          "z_score": "2.58"
        }
      },
      {
        "label": "p < 0.05",
        "values": [
          "≥ 1.960",
          "Statistically Significant (*)",
          "Standard Reject H₀ threshold"
        ],
        "params": {
          "z_score": "1.96"
        }
      },
      {
        "label": "p 0.05 – 0.10",
        "values": [
          "1.645 – 1.959",
          "Marginal / Borderline",
          "Fail to reject H₀ at α = 0.05"
        ],
        "params": {
          "z_score": "1.96"
        }
      },
      {
        "label": "p > 0.10",
        "values": [
          "< 1.645",
          "Not Significant (ns)",
          "Consistent with null hypothesis H₀"
        ],
        "params": {
          "z_score": "2.58"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "p < 0,001",
          "values": [
            "≥ 3,291",
            "Evidencia Muy Fuerte (***)",
            "Rechazar H₀ (α = 0,001)"
          ],
          "params": {
            "z_score": "2.58"
          }
        },
        {
          "label": "p < 0,01",
          "values": [
            "≥ 2,576",
            "Significancia Fuerte (**)",
            "Rechazar H₀ (α = 0,01)"
          ],
          "params": {
            "z_score": "2.58"
          }
        },
        {
          "label": "p < 0,05",
          "values": [
            "≥ 1,960",
            "Estadísticamente Significativo (*)",
            "Umbral estándar para rechazar H₀"
          ],
          "params": {
            "z_score": "1.96"
          }
        },
        {
          "label": "p 0,05 – 0,10",
          "values": [
            "1,645 – 1,959",
            "Marginal / Límite",
            "No rechazar H₀ a α = 0,05"
          ],
          "params": {
            "z_score": "1.96"
          }
        },
        {
          "label": "p > 0,10",
          "values": [
            "< 1,645",
            "No Significativo (ns)",
            "Consistente con hipótesis nula H₀"
          ],
          "params": {
            "z_score": "2.58"
          }
        }
      ],
      "fr": [
        {
          "label": "p < 0,001",
          "values": [
            "≥ 3,291",
            "Preuve Très Forte (***)",
            "Rejeter H₀ (α = 0,001)"
          ],
          "params": {
            "z_score": "2.58"
          }
        },
        {
          "label": "p < 0,01",
          "values": [
            "≥ 2,576",
            "Significativité Forte (**)",
            "Rejeter H₀ (α = 0,01)"
          ],
          "params": {
            "z_score": "2.58"
          }
        },
        {
          "label": "p < 0,05",
          "values": [
            "≥ 1,960",
            "Statistiquement Significatif (*)",
            "Seuil standard de rejet de H₀"
          ],
          "params": {
            "z_score": "1.96"
          }
        },
        {
          "label": "p 0,05 – 0,10",
          "values": [
            "1,645 – 1,959",
            "Marginal / Limite",
            "Ne pas rejeter H₀ à 0,05"
          ],
          "params": {
            "z_score": "1.96"
          }
        },
        {
          "label": "p > 0,10",
          "values": [
            "< 1,645",
            "Non Significatif (ns)",
            "Compatible avec l’hypothèse nulle H₀"
          ],
          "params": {
            "z_score": "2.58"
          }
        }
      ],
      "de": [
        {
          "label": "p < 0,001",
          "values": [
            "≥ 3,291",
            "Höchst signifikant (***)",
            "H₀ verwerfen (α = 0,001)"
          ],
          "params": {
            "z_score": "2.58"
          }
        },
        {
          "label": "p < 0,01",
          "values": [
            "≥ 2,576",
            "Hoch signifikant (**)",
            "H₀ verwerfen (α = 0,01)"
          ],
          "params": {
            "z_score": "2.58"
          }
        },
        {
          "label": "p < 0,05",
          "values": [
            "≥ 1,960",
            "Statistisch signifikant (*)",
            "Standardgrenze zum Verwerfen von H₀"
          ],
          "params": {
            "z_score": "1.96"
          }
        },
        {
          "label": "p 0,05 – 0,10",
          "values": [
            "1,645 – 1,959",
            "Grenzwertig / Tendenz",
            "H₀ bei α = 0,05 beibehalten"
          ],
          "params": {
            "z_score": "1.96"
          }
        },
        {
          "label": "p > 0,10",
          "values": [
            "< 1,645",
            "Nicht signifikant (n.s.)",
            "Vereinbar mit Nullhypothese H₀"
          ],
          "params": {
            "z_score": "2.58"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "standard-deviation-calculator",
      "variance-calculator",
      "statistics-calculator",
      "mean-calculator",
      "median-calculator",
      "mode-calculator"
    ],
    "title": "Normal Distribution Empirical Rule (68–95–99.7% Sigma Coverage)",
    "description": "Percentage of observations falling inside ±1σ to ±3σ around the mean, illustrated with a reference normal distribution (μ = 100, σ = 15).",
    "headers": [
      "Sigma Band",
      "Data Within Range",
      "Outside Range (Tails)",
      "Example (μ=100, σ=15)"
    ],
    "translations": {
      "es": {
        "title": "Regla Empírica de la Desviación Estándar (68–95–99,7 %)",
        "description": "Proporción de datos dentro de ±1σ a ±3σ respecto a la media en una distribución normal (ejemplo μ = 100, σ = 15).",
        "headers": [
          "Banda Sigma",
          "Datos Dentro",
          "Fuera (Colas)",
          "Ejemplo (μ=100, σ=15)"
        ]
      },
      "fr": {
        "title": "Règle Empirique de l’Écart-Type (68–95–99,7 %)",
        "description": "Part des observations comprises entre ±1σ et ±3σ pour une loi normale (exemple μ = 100, σ = 15).",
        "headers": [
          "Intervalle Sigma",
          "Part Incluse",
          "Part Externe",
          "Exemple (μ=100, σ=15)"
        ]
      },
      "de": {
        "title": "Sigma-Regeln der Normalverteilung (68–95–99,7-%-Regel)",
        "description": "Anteil der Messwerte innerhalb von ±1σ bis ±3σ um den Mittelwert (Beispiel μ = 100, σ = 15).",
        "headers": [
          "Sigma-Bereich",
          "Daten innerhalb",
          "Außerhalb (Ränder)",
          "Beispiel (μ=100, σ=15)"
        ]
      }
    },
    "rows": [
      {
        "label": "±1σ",
        "values": [
          "68.27%",
          "31.73%",
          "85 – 115"
        ],
        "params": {
          "mean": "100",
          "std_dev": "15"
        }
      },
      {
        "label": "±1.5σ",
        "values": [
          "86.64%",
          "13.36%",
          "77.5 – 122.5"
        ],
        "params": {
          "mean": "100",
          "std_dev": "15"
        }
      },
      {
        "label": "±2σ",
        "values": [
          "95.45%",
          "4.55%",
          "70 – 130"
        ],
        "params": {
          "mean": "100",
          "std_dev": "15"
        }
      },
      {
        "label": "±2.5σ",
        "values": [
          "98.76%",
          "1.24%",
          "62.5 – 137.5"
        ],
        "params": {
          "mean": "100",
          "std_dev": "15"
        }
      },
      {
        "label": "±3σ",
        "values": [
          "99.73%",
          "0.27%",
          "55 – 145"
        ],
        "params": {
          "mean": "100",
          "std_dev": "15"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "±1σ",
          "values": [
            "68,27 %",
            "31,73 %",
            "85 – 115"
          ],
          "params": {
            "mean": "100",
            "std_dev": "15"
          }
        },
        {
          "label": "±1.5σ",
          "values": [
            "86,64 %",
            "13,36 %",
            "77,5 – 122,5"
          ],
          "params": {
            "mean": "100",
            "std_dev": "15"
          }
        },
        {
          "label": "±2σ",
          "values": [
            "95,45 %",
            "4,55 %",
            "70 – 130"
          ],
          "params": {
            "mean": "100",
            "std_dev": "15"
          }
        },
        {
          "label": "±2.5σ",
          "values": [
            "98,76 %",
            "1,24 %",
            "62,5 – 137,5"
          ],
          "params": {
            "mean": "100",
            "std_dev": "15"
          }
        },
        {
          "label": "±3σ",
          "values": [
            "99,73 %",
            "0,27 %",
            "55 – 145"
          ],
          "params": {
            "mean": "100",
            "std_dev": "15"
          }
        }
      ],
      "fr": [
        {
          "label": "±1σ",
          "values": [
            "68,27 %",
            "31,73 %",
            "85 – 115"
          ],
          "params": {
            "mean": "100",
            "std_dev": "15"
          }
        },
        {
          "label": "±1.5σ",
          "values": [
            "86,64 %",
            "13,36 %",
            "77,5 – 122,5"
          ],
          "params": {
            "mean": "100",
            "std_dev": "15"
          }
        },
        {
          "label": "±2σ",
          "values": [
            "95,45 %",
            "4,55 %",
            "70 – 130"
          ],
          "params": {
            "mean": "100",
            "std_dev": "15"
          }
        },
        {
          "label": "±2.5σ",
          "values": [
            "98,76 %",
            "1,24 %",
            "62,5 – 137,5"
          ],
          "params": {
            "mean": "100",
            "std_dev": "15"
          }
        },
        {
          "label": "±3σ",
          "values": [
            "99,73 %",
            "0,27 %",
            "55 – 145"
          ],
          "params": {
            "mean": "100",
            "std_dev": "15"
          }
        }
      ],
      "de": [
        {
          "label": "±1σ",
          "values": [
            "68,27 %",
            "31,73 %",
            "85 – 115"
          ],
          "params": {
            "mean": "100",
            "std_dev": "15"
          }
        },
        {
          "label": "±1.5σ",
          "values": [
            "86,64 %",
            "13,36 %",
            "77,5 – 122,5"
          ],
          "params": {
            "mean": "100",
            "std_dev": "15"
          }
        },
        {
          "label": "±2σ",
          "values": [
            "95,45 %",
            "4,55 %",
            "70 – 130"
          ],
          "params": {
            "mean": "100",
            "std_dev": "15"
          }
        },
        {
          "label": "±2.5σ",
          "values": [
            "98,76 %",
            "1,24 %",
            "62,5 – 137,5"
          ],
          "params": {
            "mean": "100",
            "std_dev": "15"
          }
        },
        {
          "label": "±3σ",
          "values": [
            "99,73 %",
            "0,27 %",
            "55 – 145"
          ],
          "params": {
            "mean": "100",
            "std_dev": "15"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "percentage-calculator",
      "percentage-increase-calculator",
      "percentage-decrease-calculator",
      "percentage-difference-calculator",
      "percent-error-calculator"
    ],
    "title": "Percentage Increase, Decrease & Break-Even Recovery Matrix (Base = 100)",
    "description": "Shows why percentage drops require a larger percentage rebound to break even (e.g., a 50% decline requires a +100% gain to recover).",
    "headers": [
      "Percent Change",
      "+X% from 100",
      "-X% from 100",
      "Gain Needed After -X% Drop"
    ],
    "translations": {
      "es": {
        "title": "Tabla de Aumento, Disminución y Recuperación Porcentual (Base 100)",
        "description": "Muestra por qué una caída porcentual exige una subida mayor para volver al valor original (tras -50 % hace falta +100 %).",
        "headers": [
          "Cambio %",
          "+X % desde 100",
          "-X % desde 100",
          "Subida para Recuperar"
        ]
      },
      "fr": {
        "title": "Tableau des Hausses, Baisses et Rattrapages en Pourcentage (Base 100)",
        "description": "Illustre l’asymétrie des pourcentages : après une baisse de 50 %, il faut une hausse de +100 % pour revenir à l’équilibre.",
        "headers": [
          "Variation %",
          "+X % sur 100",
          "-X % sur 100",
          "Hausse de Rattrapage"
        ]
      },
      "de": {
        "title": "Prozentuale Steigerung, Senkung & Aufhol-Tabelle (Basis 100)",
        "description": "Zeigt die Asymmetrie von Prozentrechnungen: Ein Rückgang um 50 % erfordert +100 % Zuwachs zum Ausgleich.",
        "headers": [
          "Prozentsatz",
          "+X % von 100",
          "-X % von 100",
          "Bedarf nach -X % Verlust"
        ]
      }
    },
    "rows": [
      {
        "label": "5%",
        "values": [
          "105",
          "95",
          "+5.3%"
        ],
        "params": {
          "value1": "100",
          "value2": "105"
        }
      },
      {
        "label": "10%",
        "values": [
          "110",
          "90",
          "+11.1%"
        ],
        "params": {
          "value1": "100",
          "value2": "110"
        }
      },
      {
        "label": "20%",
        "values": [
          "120",
          "80",
          "+25.0%"
        ],
        "params": {
          "value1": "100",
          "value2": "120"
        }
      },
      {
        "label": "25%",
        "values": [
          "125",
          "75",
          "+33.3%"
        ],
        "params": {
          "value1": "100",
          "value2": "125"
        }
      },
      {
        "label": "50%",
        "values": [
          "150",
          "50",
          "+100.0%"
        ],
        "params": {
          "value1": "100",
          "value2": "150"
        }
      },
      {
        "label": "100%",
        "values": [
          "200",
          "0",
          "+∞"
        ],
        "params": {
          "value1": "100",
          "value2": "200"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "5%",
          "values": [
            "105",
            "95",
            "+5,3%"
          ],
          "params": {
            "value1": "100",
            "value2": "105"
          }
        },
        {
          "label": "10%",
          "values": [
            "110",
            "90",
            "+11,1%"
          ],
          "params": {
            "value1": "100",
            "value2": "110"
          }
        },
        {
          "label": "20%",
          "values": [
            "120",
            "80",
            "+25,0%"
          ],
          "params": {
            "value1": "100",
            "value2": "120"
          }
        },
        {
          "label": "25%",
          "values": [
            "125",
            "75",
            "+33,3%"
          ],
          "params": {
            "value1": "100",
            "value2": "125"
          }
        },
        {
          "label": "50%",
          "values": [
            "150",
            "50",
            "+100,0%"
          ],
          "params": {
            "value1": "100",
            "value2": "150"
          }
        },
        {
          "label": "100%",
          "values": [
            "200",
            "0",
            "+∞"
          ],
          "params": {
            "value1": "100",
            "value2": "200"
          }
        }
      ],
      "fr": [
        {
          "label": "5%",
          "values": [
            "105",
            "95",
            "+5,3%"
          ],
          "params": {
            "value1": "100",
            "value2": "105"
          }
        },
        {
          "label": "10%",
          "values": [
            "110",
            "90",
            "+11,1%"
          ],
          "params": {
            "value1": "100",
            "value2": "110"
          }
        },
        {
          "label": "20%",
          "values": [
            "120",
            "80",
            "+25,0%"
          ],
          "params": {
            "value1": "100",
            "value2": "120"
          }
        },
        {
          "label": "25%",
          "values": [
            "125",
            "75",
            "+33,3%"
          ],
          "params": {
            "value1": "100",
            "value2": "125"
          }
        },
        {
          "label": "50%",
          "values": [
            "150",
            "50",
            "+100,0%"
          ],
          "params": {
            "value1": "100",
            "value2": "150"
          }
        },
        {
          "label": "100%",
          "values": [
            "200",
            "0",
            "+∞"
          ],
          "params": {
            "value1": "100",
            "value2": "200"
          }
        }
      ],
      "de": [
        {
          "label": "5%",
          "values": [
            "105",
            "95",
            "+5,3%"
          ],
          "params": {
            "value1": "100",
            "value2": "105"
          }
        },
        {
          "label": "10%",
          "values": [
            "110",
            "90",
            "+11,1%"
          ],
          "params": {
            "value1": "100",
            "value2": "110"
          }
        },
        {
          "label": "20%",
          "values": [
            "120",
            "80",
            "+25,0%"
          ],
          "params": {
            "value1": "100",
            "value2": "120"
          }
        },
        {
          "label": "25%",
          "values": [
            "125",
            "75",
            "+33,3%"
          ],
          "params": {
            "value1": "100",
            "value2": "125"
          }
        },
        {
          "label": "50%",
          "values": [
            "150",
            "50",
            "+100,0%"
          ],
          "params": {
            "value1": "100",
            "value2": "150"
          }
        },
        {
          "label": "100%",
          "values": [
            "200",
            "0",
            "+∞"
          ],
          "params": {
            "value1": "100",
            "value2": "200"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "fraction-calculator",
      "scientific-notation-calculator",
      "binary-calculator",
      "scientific-calculator",
      "graphing-calculator"
    ],
    "title": "Fraction, Decimal, Percentage & Scientific Notation Conversion Chart",
    "description": "Core rational fractions translated to exact decimals, percentages, and normalized scientific notation.",
    "headers": [
      "Fraction",
      "Decimal Value",
      "Percentage",
      "Scientific Notation"
    ],
    "translations": {
      "es": {
        "title": "Tabla de Conversión de Fracciones, Decimales y Porcentajes",
        "description": "Equivalencias exactas de las fracciones más frecuentes en decimal, porcentaje y notación científica.",
        "headers": [
          "Fracción",
          "Valor Decimal",
          "Porcentaje",
          "Notación Científica"
        ]
      },
      "fr": {
        "title": "Table de Conversion Fractions, Décimaux et Pourcentages",
        "description": "Correspondances usuelles entre fractions rationnelles, nombres décimaux et pourcentages.",
        "headers": [
          "Fraction",
          "Décimal",
          "Pourcentage",
          "Notation Scientifique"
        ]
      },
      "de": {
        "title": "Bruch-, Dezimal-, Prozent- & Zehnerpotenz-Umrechnungstabelle",
        "description": "Häufigste Brüche direkt umgerechnet in Dezimalzahlen, Prozentsätze und wissenschaftliche Schreibweise.",
        "headers": [
          "Bruch",
          "Dezimalzahl",
          "Prozentwert",
          "Wiss. Notation"
        ]
      }
    },
    "rows": [
      {
        "label": "1/8",
        "values": [
          "0.125",
          "12.5%",
          "0.13 × 10⁰"
        ],
        "params": {
          "numerator": "1",
          "denominator": "8"
        }
      },
      {
        "label": "1/5",
        "values": [
          "0.200",
          "20.0%",
          "0.20 × 10⁰"
        ],
        "params": {
          "numerator": "1",
          "denominator": "5"
        }
      },
      {
        "label": "1/4",
        "values": [
          "0.250",
          "25.0%",
          "0.25 × 10⁰"
        ],
        "params": {
          "numerator": "1",
          "denominator": "4"
        }
      },
      {
        "label": "1/3",
        "values": [
          "0.3333",
          "33.33%",
          "0.33 × 10⁰"
        ],
        "params": {
          "numerator": "1",
          "denominator": "3"
        }
      },
      {
        "label": "1/2",
        "values": [
          "0.500",
          "50.0%",
          "0.50 × 10⁰"
        ],
        "params": {
          "numerator": "1",
          "denominator": "2"
        }
      },
      {
        "label": "3/4",
        "values": [
          "0.750",
          "75.0%",
          "0.75 × 10⁰"
        ],
        "params": {
          "numerator": "3",
          "denominator": "4"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "1/8",
          "values": [
            "0,125",
            "12,5%",
            "0,13 × 10⁰"
          ],
          "params": {
            "numerator": "1",
            "denominator": "8"
          }
        },
        {
          "label": "1/5",
          "values": [
            "0,200",
            "20,0%",
            "0,20 × 10⁰"
          ],
          "params": {
            "numerator": "1",
            "denominator": "5"
          }
        },
        {
          "label": "1/4",
          "values": [
            "0,250",
            "25,0%",
            "0,25 × 10⁰"
          ],
          "params": {
            "numerator": "1",
            "denominator": "4"
          }
        },
        {
          "label": "1/3",
          "values": [
            "0,3333",
            "33,33%",
            "0,33 × 10⁰"
          ],
          "params": {
            "numerator": "1",
            "denominator": "3"
          }
        },
        {
          "label": "1/2",
          "values": [
            "0,500",
            "50,0%",
            "0,50 × 10⁰"
          ],
          "params": {
            "numerator": "1",
            "denominator": "2"
          }
        },
        {
          "label": "3/4",
          "values": [
            "0,750",
            "75,0%",
            "0,75 × 10⁰"
          ],
          "params": {
            "numerator": "3",
            "denominator": "4"
          }
        }
      ],
      "fr": [
        {
          "label": "1/8",
          "values": [
            "0,125",
            "12,5%",
            "0,13 × 10⁰"
          ],
          "params": {
            "numerator": "1",
            "denominator": "8"
          }
        },
        {
          "label": "1/5",
          "values": [
            "0,200",
            "20,0%",
            "0,20 × 10⁰"
          ],
          "params": {
            "numerator": "1",
            "denominator": "5"
          }
        },
        {
          "label": "1/4",
          "values": [
            "0,250",
            "25,0%",
            "0,25 × 10⁰"
          ],
          "params": {
            "numerator": "1",
            "denominator": "4"
          }
        },
        {
          "label": "1/3",
          "values": [
            "0,3333",
            "33,33%",
            "0,33 × 10⁰"
          ],
          "params": {
            "numerator": "1",
            "denominator": "3"
          }
        },
        {
          "label": "1/2",
          "values": [
            "0,500",
            "50,0%",
            "0,50 × 10⁰"
          ],
          "params": {
            "numerator": "1",
            "denominator": "2"
          }
        },
        {
          "label": "3/4",
          "values": [
            "0,750",
            "75,0%",
            "0,75 × 10⁰"
          ],
          "params": {
            "numerator": "3",
            "denominator": "4"
          }
        }
      ],
      "de": [
        {
          "label": "1/8",
          "values": [
            "0,125",
            "12,5%",
            "0,13 × 10⁰"
          ],
          "params": {
            "numerator": "1",
            "denominator": "8"
          }
        },
        {
          "label": "1/5",
          "values": [
            "0,200",
            "20,0%",
            "0,20 × 10⁰"
          ],
          "params": {
            "numerator": "1",
            "denominator": "5"
          }
        },
        {
          "label": "1/4",
          "values": [
            "0,250",
            "25,0%",
            "0,25 × 10⁰"
          ],
          "params": {
            "numerator": "1",
            "denominator": "4"
          }
        },
        {
          "label": "1/3",
          "values": [
            "0,3333",
            "33,33%",
            "0,33 × 10⁰"
          ],
          "params": {
            "numerator": "1",
            "denominator": "3"
          }
        },
        {
          "label": "1/2",
          "values": [
            "0,500",
            "50,0%",
            "0,50 × 10⁰"
          ],
          "params": {
            "numerator": "1",
            "denominator": "2"
          }
        },
        {
          "label": "3/4",
          "values": [
            "0,750",
            "75,0%",
            "0,75 × 10⁰"
          ],
          "params": {
            "numerator": "3",
            "denominator": "4"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "half-life-calculator"
    ],
    "title": "Exponential Half-Life Remaining & Decayed Fraction Table (1–10 Half-Lives)",
    "description": "Exact remaining substance fraction after 1 to 10 half-lives, applicable to radioactive isotopes (C-14, U-238) and pharmacokinetic drug clearance.",
    "headers": [
      "Elapsed Half-Lives",
      "Exact Fraction Left",
      "Remaining (%)",
      "Decayed (%)"
    ],
    "translations": {
      "es": {
        "title": "Tabla de Desintegración por Vidas Medias (1 a 10 Semividas)",
        "description": "Fracción y porcentaje remanente tras 1 a 10 periodos de semidesintegración (isótopos y farmacocinética).",
        "headers": [
          "Semividas",
          "Fracción Restante",
          "Remanente (%)",
          "Desintegrado (%)"
        ]
      },
      "fr": {
        "title": "Tableau de Décroissance par Demi-Vies (1 à 10 Demi-Vies)",
        "description": "Proportion exacte restante après 1 à 10 périodes de demi-vie en radioactivité et pharmacocinétique.",
        "headers": [
          "Demi-Vies Écoulées",
          "Fraction Restante",
          "Restant (%)",
          "Désintégré (%)"
        ]
      },
      "de": {
        "title": "Halbwertszeit-Zerfallstabelle (1 bis 10 Halbwertszeiten)",
        "description": "Exakter Restanteil und zerfallener Anteil nach 1 bis 10 Halbwertszeiten (Isotope & Pharmakokinetik).",
        "headers": [
          "Halbwertszeiten",
          "Exakter Restbruch",
          "Verbleibend (%)",
          "Zerfallen (%)"
        ]
      }
    },
    "rows": [
      {
        "label": "1 Half-Lives",
        "values": [
          "1 / 2",
          "50.00%",
          "50.00%"
        ],
        "params": {
          "initial_quantity": "100",
          "elapsed_time": "1",
          "half_life": "1"
        }
      },
      {
        "label": "2 Half-Lives",
        "values": [
          "1 / 4",
          "25.00%",
          "75.00%"
        ],
        "params": {
          "initial_quantity": "100",
          "elapsed_time": "2",
          "half_life": "1"
        }
      },
      {
        "label": "3 Half-Lives",
        "values": [
          "1 / 8",
          "12.50%",
          "87.50%"
        ],
        "params": {
          "initial_quantity": "100",
          "elapsed_time": "3",
          "half_life": "1"
        }
      },
      {
        "label": "4 Half-Lives",
        "values": [
          "1 / 16",
          "6.25%",
          "93.75%"
        ],
        "params": {
          "initial_quantity": "100",
          "elapsed_time": "4",
          "half_life": "1"
        }
      },
      {
        "label": "5 Half-Lives",
        "values": [
          "1 / 32",
          "3.125%",
          "96.875%"
        ],
        "params": {
          "initial_quantity": "100",
          "elapsed_time": "5",
          "half_life": "1"
        }
      },
      {
        "label": "10 Half-Lives",
        "values": [
          "1 / 1024",
          "0.098%",
          "99.902%"
        ],
        "params": {
          "initial_quantity": "100",
          "elapsed_time": "10",
          "half_life": "1"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "1 Vidas Medias",
          "values": [
            "1 / 2",
            "50,00%",
            "50,00%"
          ],
          "params": {
            "initial_quantity": "100",
            "elapsed_time": "1",
            "half_life": "1"
          }
        },
        {
          "label": "2 Vidas Medias",
          "values": [
            "1 / 4",
            "25,00%",
            "75,00%"
          ],
          "params": {
            "initial_quantity": "100",
            "elapsed_time": "2",
            "half_life": "1"
          }
        },
        {
          "label": "3 Vidas Medias",
          "values": [
            "1 / 8",
            "12,50%",
            "87,50%"
          ],
          "params": {
            "initial_quantity": "100",
            "elapsed_time": "3",
            "half_life": "1"
          }
        },
        {
          "label": "4 Vidas Medias",
          "values": [
            "1 / 16",
            "6,25%",
            "93,75%"
          ],
          "params": {
            "initial_quantity": "100",
            "elapsed_time": "4",
            "half_life": "1"
          }
        },
        {
          "label": "5 Vidas Medias",
          "values": [
            "1 / 32",
            "3,125%",
            "96,875%"
          ],
          "params": {
            "initial_quantity": "100",
            "elapsed_time": "5",
            "half_life": "1"
          }
        },
        {
          "label": "10 Vidas Medias",
          "values": [
            "1 / 1024",
            "0,098%",
            "99,902%"
          ],
          "params": {
            "initial_quantity": "100",
            "elapsed_time": "10",
            "half_life": "1"
          }
        }
      ],
      "fr": [
        {
          "label": "1 Demi-Vies",
          "values": [
            "1 / 2",
            "50,00%",
            "50,00%"
          ],
          "params": {
            "initial_quantity": "100",
            "elapsed_time": "1",
            "half_life": "1"
          }
        },
        {
          "label": "2 Demi-Vies",
          "values": [
            "1 / 4",
            "25,00%",
            "75,00%"
          ],
          "params": {
            "initial_quantity": "100",
            "elapsed_time": "2",
            "half_life": "1"
          }
        },
        {
          "label": "3 Demi-Vies",
          "values": [
            "1 / 8",
            "12,50%",
            "87,50%"
          ],
          "params": {
            "initial_quantity": "100",
            "elapsed_time": "3",
            "half_life": "1"
          }
        },
        {
          "label": "4 Demi-Vies",
          "values": [
            "1 / 16",
            "6,25%",
            "93,75%"
          ],
          "params": {
            "initial_quantity": "100",
            "elapsed_time": "4",
            "half_life": "1"
          }
        },
        {
          "label": "5 Demi-Vies",
          "values": [
            "1 / 32",
            "3,125%",
            "96,875%"
          ],
          "params": {
            "initial_quantity": "100",
            "elapsed_time": "5",
            "half_life": "1"
          }
        },
        {
          "label": "10 Demi-Vies",
          "values": [
            "1 / 1024",
            "0,098%",
            "99,902%"
          ],
          "params": {
            "initial_quantity": "100",
            "elapsed_time": "10",
            "half_life": "1"
          }
        }
      ],
      "de": [
        {
          "label": "1 Halbwertszeiten",
          "values": [
            "1 / 2",
            "50,00%",
            "50,00%"
          ],
          "params": {
            "initial_quantity": "100",
            "elapsed_time": "1",
            "half_life": "1"
          }
        },
        {
          "label": "2 Halbwertszeiten",
          "values": [
            "1 / 4",
            "25,00%",
            "75,00%"
          ],
          "params": {
            "initial_quantity": "100",
            "elapsed_time": "2",
            "half_life": "1"
          }
        },
        {
          "label": "3 Halbwertszeiten",
          "values": [
            "1 / 8",
            "12,50%",
            "87,50%"
          ],
          "params": {
            "initial_quantity": "100",
            "elapsed_time": "3",
            "half_life": "1"
          }
        },
        {
          "label": "4 Halbwertszeiten",
          "values": [
            "1 / 16",
            "6,25%",
            "93,75%"
          ],
          "params": {
            "initial_quantity": "100",
            "elapsed_time": "4",
            "half_life": "1"
          }
        },
        {
          "label": "5 Halbwertszeiten",
          "values": [
            "1 / 32",
            "3,125%",
            "96,875%"
          ],
          "params": {
            "initial_quantity": "100",
            "elapsed_time": "5",
            "half_life": "1"
          }
        },
        {
          "label": "10 Halbwertszeiten",
          "values": [
            "1 / 1024",
            "0,098%",
            "99,902%"
          ],
          "params": {
            "initial_quantity": "100",
            "elapsed_time": "10",
            "half_life": "1"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "concrete-calculator",
      "volume-calculator",
      "triangle-calculator"
    ],
    "title": "Concrete Slab Volume & Premix Bag Estimator (4-Inch / 10 cm Standard Slab)",
    "description": "Exact concrete volume and premix bag counts (including 10% standard waste allowance) for patios, shed pads, and garage slabs.",
    "headers": [
      "Slab Dimensions (4\")",
      "Cubic Yards",
      "Cubic Feet",
      "80-lb Bags (+10%)",
      "60-lb Bags (+10%)"
    ],
    "translations": {
      "es": {
        "title": "Volumen de Hormigón y Sacos para Losas de 10 cm de Espesor",
        "description": "Metros cúbicos netos, volumen con 10 % de merma y número de sacos premezclados de 25 kg y 40 kg.",
        "headers": [
          "Losa (Espesor 10 cm)",
          "Volumen Neto",
          "Con 10 % Merma",
          "Sacos 25 kg",
          "Sacos 40 kg"
        ]
      },
      "fr": {
        "title": "Volume de Béton et Nombre de Sacs pour Dalle de 10 cm",
        "description": "Mètres cubes nets, volume avec 10 % de marge et nombre de sacs de béton prêt à l’emploi (25 kg et 40 kg).",
        "headers": [
          "Dalle (Ép. 10 cm)",
          "Volume Net",
          "Avec 10 % Marge",
          "Sacs 25 kg",
          "Sacs 40 kg"
        ]
      },
      "de": {
        "title": "Betonvolumen & Sackbedarf-Tabelle (10 cm Bodenplatte)",
        "description": "Netto-Kubikmeter, Bedarf inkl. 10 % Zuschlag sowie Anzahl der 25-kg- und 40-kg-Fertigbetonsäcke.",
        "headers": [
          "Fläche (10 cm Stärke)",
          "Netto-Volumen",
          "Inkl. 10 % Zuschlag",
          "25-kg-Säcke",
          "40-kg-Säcke"
        ]
      }
    },
    "rows": [
      {
        "label": "10 × 10 ft (4\" thick)",
        "values": [
          "1.23 yd³",
          "33 ft³",
          "62 bags",
          "82 bags"
        ],
        "params": {
          "length": "10",
          "width": "10",
          "thickness_in": "4"
        }
      },
      {
        "label": "12 × 12 ft (4\" thick)",
        "values": [
          "1.78 yd³",
          "48 ft³",
          "89 bags",
          "118 bags"
        ],
        "params": {
          "length": "12",
          "width": "12",
          "thickness_in": "4"
        }
      },
      {
        "label": "10 × 20 ft (4\" thick)",
        "values": [
          "2.47 yd³",
          "67 ft³",
          "123 bags",
          "163 bags"
        ],
        "params": {
          "length": "10",
          "width": "20",
          "thickness_in": "4"
        }
      },
      {
        "label": "20 × 20 ft (4\" thick)",
        "values": [
          "4.94 yd³",
          "133 ft³",
          "245 bags",
          "326 bags"
        ],
        "params": {
          "length": "20",
          "width": "20",
          "thickness_in": "4"
        }
      },
      {
        "label": "24 × 24 ft (4\" thick)",
        "values": [
          "7.11 yd³",
          "192 ft³",
          "353 bags",
          "470 bags"
        ],
        "params": {
          "length": "24",
          "width": "24",
          "thickness_in": "4"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "3 × 3 m (10 cm)",
          "values": [
            "0,90 m³",
            "0,99 m³",
            "77 sacos",
            "48 sacos"
          ],
          "params": {
            "length_m": "3",
            "width_m": "3",
            "thickness_cm": "10"
          }
        },
        {
          "label": "4 × 3 m (10 cm)",
          "values": [
            "1,20 m³",
            "1,32 m³",
            "102 sacos",
            "63 sacos"
          ],
          "params": {
            "length_m": "4",
            "width_m": "3",
            "thickness_cm": "10"
          }
        },
        {
          "label": "5 × 4 m (10 cm)",
          "values": [
            "2,00 m³",
            "2,20 m³",
            "170 sacos",
            "105 sacos"
          ],
          "params": {
            "length_m": "5",
            "width_m": "4",
            "thickness_cm": "10"
          }
        },
        {
          "label": "6 × 5 m (10 cm)",
          "values": [
            "3,00 m³",
            "3,30 m³",
            "254 sacos",
            "158 sacos"
          ],
          "params": {
            "length_m": "6",
            "width_m": "5",
            "thickness_cm": "10"
          }
        },
        {
          "label": "8 × 6 m (10 cm)",
          "values": [
            "4,80 m³",
            "5,28 m³",
            "407 sacos",
            "252 sacos"
          ],
          "params": {
            "length_m": "8",
            "width_m": "6",
            "thickness_cm": "10"
          }
        }
      ],
      "fr": [
        {
          "label": "3 × 3 m (10 cm)",
          "values": [
            "0,90 m³",
            "0,99 m³",
            "77 sacs",
            "48 sacs"
          ],
          "params": {
            "length_m": "3",
            "width_m": "3",
            "thickness_cm": "10"
          }
        },
        {
          "label": "4 × 3 m (10 cm)",
          "values": [
            "1,20 m³",
            "1,32 m³",
            "102 sacs",
            "63 sacs"
          ],
          "params": {
            "length_m": "4",
            "width_m": "3",
            "thickness_cm": "10"
          }
        },
        {
          "label": "5 × 4 m (10 cm)",
          "values": [
            "2,00 m³",
            "2,20 m³",
            "170 sacs",
            "105 sacs"
          ],
          "params": {
            "length_m": "5",
            "width_m": "4",
            "thickness_cm": "10"
          }
        },
        {
          "label": "6 × 5 m (10 cm)",
          "values": [
            "3,00 m³",
            "3,30 m³",
            "254 sacs",
            "158 sacs"
          ],
          "params": {
            "length_m": "6",
            "width_m": "5",
            "thickness_cm": "10"
          }
        },
        {
          "label": "8 × 6 m (10 cm)",
          "values": [
            "4,80 m³",
            "5,28 m³",
            "407 sacs",
            "252 sacs"
          ],
          "params": {
            "length_m": "8",
            "width_m": "6",
            "thickness_cm": "10"
          }
        }
      ],
      "de": [
        {
          "label": "3 × 3 m (10 cm)",
          "values": [
            "0,90 m³",
            "0,99 m³",
            "77 Säcke",
            "48 Säcke"
          ],
          "params": {
            "length_m": "3",
            "width_m": "3",
            "thickness_cm": "10"
          }
        },
        {
          "label": "4 × 3 m (10 cm)",
          "values": [
            "1,20 m³",
            "1,32 m³",
            "102 Säcke",
            "63 Säcke"
          ],
          "params": {
            "length_m": "4",
            "width_m": "3",
            "thickness_cm": "10"
          }
        },
        {
          "label": "5 × 4 m (10 cm)",
          "values": [
            "2,00 m³",
            "2,20 m³",
            "170 Säcke",
            "105 Säcke"
          ],
          "params": {
            "length_m": "5",
            "width_m": "4",
            "thickness_cm": "10"
          }
        },
        {
          "label": "6 × 5 m (10 cm)",
          "values": [
            "3,00 m³",
            "3,30 m³",
            "254 Säcke",
            "158 Säcke"
          ],
          "params": {
            "length_m": "6",
            "width_m": "5",
            "thickness_cm": "10"
          }
        },
        {
          "label": "8 × 6 m (10 cm)",
          "values": [
            "4,80 m³",
            "5,28 m³",
            "407 Säcke",
            "252 Säcke"
          ],
          "params": {
            "length_m": "8",
            "width_m": "6",
            "thickness_cm": "10"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "subnet-calculator",
      "ip-subnet-calculator"
    ],
    "title": "IPv4 CIDR Subnet Mask & Usable Host Capacity Cheat Sheet",
    "description": "Quick networking reference converting CIDR prefixes (/30 through /16) into dotted-decimal subnet masks and usable host counts.",
    "headers": [
      "CIDR Prefix",
      "Subnet Mask",
      "Total IPv4 IPs",
      "Usable Hosts (2^(32-p)-2)"
    ],
    "translations": {
      "es": {
        "title": "Tabla Rápida de Máscaras de Subred IPv4 CIDR y Hosts Utilizables",
        "description": "Referencia de red para convertir prefijos CIDR (/30 a /16) en máscara decimal y número de hosts asignables.",
        "headers": [
          "Prefijo CIDR",
          "Máscara de Subred",
          "IPs Totales",
          "Hosts Utilizables"
        ]
      },
      "fr": {
        "title": "Table de Référence des Masques de Sous-Réseau IPv4 CIDR",
        "description": "Correspondance instantanée entre préfixes CIDR (/30 à /16), masques décimaux et hôtes utilisables.",
        "headers": [
          "Préfixe CIDR",
          "Masque Sous-Réseau",
          "Adresses Totales",
          "Hôtes Utilisables"
        ]
      },
      "de": {
        "title": "IPv4-CIDR-Subnetzmasken- & Nutzbare-Hosts-Übersicht",
        "description": "Netzwerk-Schnellübersicht von CIDR-Präfixen (/30 bis /16) mit Subnetzmaske und maximalen Host-Adressen.",
        "headers": [
          "CIDR-Präfix",
          "Subnetzmaske",
          "IPs Gesamt",
          "Nutzbare Hosts"
        ]
      }
    },
    "rows": [
      {
        "label": "/30",
        "values": [
          "255.255.255.252",
          "4",
          "2"
        ],
        "params": {
          "cidr": "30",
          "ip_address": "192.168.1.0"
        }
      },
      {
        "label": "/28",
        "values": [
          "255.255.255.240",
          "16",
          "14"
        ],
        "params": {
          "cidr": "28",
          "ip_address": "192.168.1.0"
        }
      },
      {
        "label": "/26",
        "values": [
          "255.255.255.192",
          "64",
          "62"
        ],
        "params": {
          "cidr": "26",
          "ip_address": "192.168.1.0"
        }
      },
      {
        "label": "/24",
        "values": [
          "255.255.255.0",
          "256",
          "254"
        ],
        "params": {
          "cidr": "24",
          "ip_address": "192.168.1.0"
        }
      },
      {
        "label": "/22",
        "values": [
          "255.255.252.0",
          "1,024",
          "1,022"
        ],
        "params": {
          "cidr": "22",
          "ip_address": "192.168.1.0"
        }
      },
      {
        "label": "/16",
        "values": [
          "255.255.0.0",
          "65,536",
          "65,534"
        ],
        "params": {
          "cidr": "16",
          "ip_address": "192.168.1.0"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "/30",
          "values": [
            "255.255.255.252",
            "4",
            "2"
          ],
          "params": {
            "cidr": "30",
            "ip_address": "192.168.1.0"
          }
        },
        {
          "label": "/28",
          "values": [
            "255.255.255.240",
            "16",
            "14"
          ],
          "params": {
            "cidr": "28",
            "ip_address": "192.168.1.0"
          }
        },
        {
          "label": "/26",
          "values": [
            "255.255.255.192",
            "64",
            "62"
          ],
          "params": {
            "cidr": "26",
            "ip_address": "192.168.1.0"
          }
        },
        {
          "label": "/24",
          "values": [
            "255.255.255.0",
            "256",
            "254"
          ],
          "params": {
            "cidr": "24",
            "ip_address": "192.168.1.0"
          }
        },
        {
          "label": "/22",
          "values": [
            "255.255.252.0",
            "1.024",
            "1.022"
          ],
          "params": {
            "cidr": "22",
            "ip_address": "192.168.1.0"
          }
        },
        {
          "label": "/16",
          "values": [
            "255.255.0.0",
            "65.536",
            "65.534"
          ],
          "params": {
            "cidr": "16",
            "ip_address": "192.168.1.0"
          }
        }
      ],
      "fr": [
        {
          "label": "/30",
          "values": [
            "255.255.255.252",
            "4",
            "2"
          ],
          "params": {
            "cidr": "30",
            "ip_address": "192.168.1.0"
          }
        },
        {
          "label": "/28",
          "values": [
            "255.255.255.240",
            "16",
            "14"
          ],
          "params": {
            "cidr": "28",
            "ip_address": "192.168.1.0"
          }
        },
        {
          "label": "/26",
          "values": [
            "255.255.255.192",
            "64",
            "62"
          ],
          "params": {
            "cidr": "26",
            "ip_address": "192.168.1.0"
          }
        },
        {
          "label": "/24",
          "values": [
            "255.255.255.0",
            "256",
            "254"
          ],
          "params": {
            "cidr": "24",
            "ip_address": "192.168.1.0"
          }
        },
        {
          "label": "/22",
          "values": [
            "255.255.252.0",
            "1 024",
            "1 022"
          ],
          "params": {
            "cidr": "22",
            "ip_address": "192.168.1.0"
          }
        },
        {
          "label": "/16",
          "values": [
            "255.255.0.0",
            "65 536",
            "65 534"
          ],
          "params": {
            "cidr": "16",
            "ip_address": "192.168.1.0"
          }
        }
      ],
      "de": [
        {
          "label": "/30",
          "values": [
            "255.255.255.252",
            "4",
            "2"
          ],
          "params": {
            "cidr": "30",
            "ip_address": "192.168.1.0"
          }
        },
        {
          "label": "/28",
          "values": [
            "255.255.255.240",
            "16",
            "14"
          ],
          "params": {
            "cidr": "28",
            "ip_address": "192.168.1.0"
          }
        },
        {
          "label": "/26",
          "values": [
            "255.255.255.192",
            "64",
            "62"
          ],
          "params": {
            "cidr": "26",
            "ip_address": "192.168.1.0"
          }
        },
        {
          "label": "/24",
          "values": [
            "255.255.255.0",
            "256",
            "254"
          ],
          "params": {
            "cidr": "24",
            "ip_address": "192.168.1.0"
          }
        },
        {
          "label": "/22",
          "values": [
            "255.255.252.0",
            "1.024",
            "1.022"
          ],
          "params": {
            "cidr": "22",
            "ip_address": "192.168.1.0"
          }
        },
        {
          "label": "/16",
          "values": [
            "255.255.0.0",
            "65.536",
            "65.534"
          ],
          "params": {
            "cidr": "16",
            "ip_address": "192.168.1.0"
          }
        }
      ]
    }
  },
  {
    "slugs": [
      "gpa-calculator",
      "grade-calculator"
    ],
    "title": "Standard 4.0 GPA Scale & Percentage Grade Conversion Table",
    "description": "Official U.S. 4.0 unweighted GPA scale mapping letter grades and percentage scores to academic standing benchmarks.",
    "headers": [
      "Letter Grade",
      "Percentage Score",
      "4.0 GPA Scale",
      "Academic Standing"
    ],
    "translations": {
      "es": {
        "title": "Tabla de Conversión de Escala GPA 4,0 a Calificación 0–10",
        "description": "Equivalencia orientativa entre calificaciones anglosajonas (A–D), porcentaje, GPA 4,0 y escala sobre 10.",
        "headers": [
          "Letra (EE. UU.)",
          "Porcentaje",
          "Escala GPA 4,0",
          "Equivalencia (0–10)"
        ]
      },
      "fr": {
        "title": "Table de Conversion GPA 4,0 vers Notation Française sur 20",
        "description": "Correspondance indicative entre notes américaines (A–D), pourcentage, GPA 4,0 et moyenne sur 20.",
        "headers": [
          "Note Lettre",
          "Pourcentage",
          "Échelle GPA 4,0",
          "Équivalent (/20)"
        ]
      },
      "de": {
        "title": "GPA-4,0-Umrechnungstabelle in Deutsche Hochschulnoten (1,0 – 4,0)",
        "description": "Orientierungstabelle zur Umrechnung von US-Noten (A–D) und GPA 4,0 in das deutsche Notensystem.",
        "headers": [
          "US-Note",
          "Prozentwert",
          "GPA (4,0-Skala)",
          "Deutsche Note"
        ]
      }
    },
    "rows": [
      {
        "label": "A / A+",
        "values": [
          "93–100%",
          "4.0",
          "Dean’s List"
        ],
        "params": {
          "grade_points": "4.0",
          "credits": "3"
        }
      },
      {
        "label": "A-",
        "values": [
          "90–92%",
          "3.7",
          "Dean’s List"
        ],
        "params": {
          "grade_points": "3.7",
          "credits": "3"
        }
      },
      {
        "label": "B+",
        "values": [
          "87–89%",
          "3.3",
          "Good Standing"
        ],
        "params": {
          "grade_points": "3.3",
          "credits": "3"
        }
      },
      {
        "label": "B",
        "values": [
          "83–86%",
          "3.0",
          "Good Standing"
        ],
        "params": {
          "grade_points": "3.0",
          "credits": "3"
        }
      },
      {
        "label": "C",
        "values": [
          "73–76%",
          "2.0",
          "Satisfactory"
        ],
        "params": {
          "grade_points": "2.0",
          "credits": "3"
        }
      },
      {
        "label": "D / Pass",
        "values": [
          "60–69%",
          "1.0",
          "Minimum Pass"
        ],
        "params": {
          "grade_points": "1.0",
          "credits": "3"
        }
      }
    ],
    "rowsByLocale": {
      "es": [
        {
          "label": "A / A+",
          "values": [
            "93–100 %",
            "4,0",
            "9,0 – 10,0"
          ],
          "params": {
            "grade_points": "4.0",
            "credits": "3"
          }
        },
        {
          "label": "A-",
          "values": [
            "90–92 %",
            "3,7",
            "8,5 – 8,9"
          ],
          "params": {
            "grade_points": "3.7",
            "credits": "3"
          }
        },
        {
          "label": "B+",
          "values": [
            "87–89 %",
            "3,3",
            "8,0 – 8,4"
          ],
          "params": {
            "grade_points": "3.3",
            "credits": "3"
          }
        },
        {
          "label": "B",
          "values": [
            "83–86 %",
            "3,0",
            "7,0 – 7,9"
          ],
          "params": {
            "grade_points": "3.0",
            "credits": "3"
          }
        },
        {
          "label": "C",
          "values": [
            "73–76 %",
            "2,0",
            "5,5 – 6,4"
          ],
          "params": {
            "grade_points": "2.0",
            "credits": "3"
          }
        },
        {
          "label": "D / Pass",
          "values": [
            "60–69 %",
            "1,0",
            "5,0 – 5,4"
          ],
          "params": {
            "grade_points": "1.0",
            "credits": "3"
          }
        }
      ],
      "fr": [
        {
          "label": "A / A+",
          "values": [
            "93–100 %",
            "4,0",
            "16 – 20 / 20"
          ],
          "params": {
            "grade_points": "4.0",
            "credits": "3"
          }
        },
        {
          "label": "A-",
          "values": [
            "90–92 %",
            "3,7",
            "15 / 20"
          ],
          "params": {
            "grade_points": "3.7",
            "credits": "3"
          }
        },
        {
          "label": "B+",
          "values": [
            "87–89 %",
            "3,3",
            "14 / 20"
          ],
          "params": {
            "grade_points": "3.3",
            "credits": "3"
          }
        },
        {
          "label": "B",
          "values": [
            "83–86 %",
            "3,0",
            "13 / 20"
          ],
          "params": {
            "grade_points": "3.0",
            "credits": "3"
          }
        },
        {
          "label": "C",
          "values": [
            "73–76 %",
            "2,0",
            "11 / 20"
          ],
          "params": {
            "grade_points": "2.0",
            "credits": "3"
          }
        },
        {
          "label": "D / Pass",
          "values": [
            "60–69 %",
            "1,0",
            "10 / 20"
          ],
          "params": {
            "grade_points": "1.0",
            "credits": "3"
          }
        }
      ],
      "de": [
        {
          "label": "A / A+",
          "values": [
            "93–100 %",
            "4,0",
            "1,0 – 1,3"
          ],
          "params": {
            "grade_points": "4.0",
            "credits": "3"
          }
        },
        {
          "label": "A-",
          "values": [
            "90–92 %",
            "3,7",
            "1,7"
          ],
          "params": {
            "grade_points": "3.7",
            "credits": "3"
          }
        },
        {
          "label": "B+",
          "values": [
            "87–89 %",
            "3,3",
            "2,0"
          ],
          "params": {
            "grade_points": "3.3",
            "credits": "3"
          }
        },
        {
          "label": "B",
          "values": [
            "83–86 %",
            "3,0",
            "2,3 – 2,7"
          ],
          "params": {
            "grade_points": "3.0",
            "credits": "3"
          }
        },
        {
          "label": "C",
          "values": [
            "73–76 %",
            "2,0",
            "3,3 – 3,7"
          ],
          "params": {
            "grade_points": "2.0",
            "credits": "3"
          }
        },
        {
          "label": "D / Pass",
          "values": [
            "60–69 %",
            "1,0",
            "4,0"
          ],
          "params": {
            "grade_points": "1.0",
            "credits": "3"
          }
        }
      ]
    }
  }
];
