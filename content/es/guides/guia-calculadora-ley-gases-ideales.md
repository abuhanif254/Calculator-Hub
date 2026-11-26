---
title: "Calculadora de la Ley de los Gases Ideales: PV = nRT"
description: "Comprenda la Ley de los Gases Ideales, la relación entre presión, volumen, moles y temperatura absoluta, y utilice nuestra calculadora gratuita."
category: "Math & Science"
relatedCalculator: "ideal-gas-law-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "¿Por qué la temperatura debe expresarse obligatoriamente en kelvin (K) en PV = nRT?"
    answer: "La Ley de los Gases Ideales se basa en el cero absoluto (0 K = −273,15 °C), punto donde la energía cinética promedio del modelo ideal se anula. Usar grados Celsius o Fahrenheit rompe la proporcionalidad directa entre presión, volumen y temperatura, además de provocar divisiones por cero o presiones negativas absurdas a 0 °C o temperaturas bajo cero."
  - question: "¿Cómo saber qué valor de la constante R utilizar?"
    answer: "La constante R es la misma magnitud física, pero su valor numérico cambia según las unidades elegidas para la presión (P) y el volumen (V). Si trabaja con atmósferas y litros, use R = 0,082057 L·atm/(mol·K); si emplea pascales y metros cúbicos (o kilopascales y litros), utilice R = 8,31446 J/(mol·K)."
  - question: "¿Cuál es la diferencia entre condiciones STP y SATP?"
    answer: "Las condiciones normales o STP tradicionales de la química se definen a 0 °C (273,15 K) y 1 atm (volumen molar de 22,414 L/mol), aunque la IUPAC fijó en 1982 la presión estándar en 1 bar (volumen molar de 22,711 L/mol). Las condiciones estándar ambientales SATP corresponden a 25 °C (298,15 K) y 1 bar (volumen molar de 24,789 L/mol)."
  - question: "¿Cuándo deja de ser precisa la Ley de los Gases Ideales?"
    answer: "El modelo ideal falla a presiones elevadas (por encima de 10 a 20 atm) o a bajas temperaturas próximas al punto de licuefacción del gas. En esas condiciones, el volumen propio de las moléculas y las fuerzas de atracción intermolecular (puentes de hidrógeno o fuerzas de Van der Waals) desvían el factor de compresibilidad Z = PV / (nRT) de la unidad."
  - question: "¿Se puede aplicar la ecuación PV = nRT a mezclas de gases como el aire?"
    answer: "Sí. Según la ley de Dalton de las presiones parciales, una mezcla de gases que no reaccionan entre sí se comporta como un único gas ideal en el que n representa la suma total de moles de todos los componentes y P corresponde a la presión total ejercida sobre el recipiente."
---

La **Ley de los Gases Ideales** (`PV = nRT`) es la ecuación de estado que describe el comportamiento macroscópico de los gases a presiones moderadas y temperaturas alejadas de la condensación. Unifica las leyes empíricas de Boyle-Mariotte, Charles, Gay-Lussac y Avogadro en una única relación matemática entre presión (`P`), volumen (`V`), moles (`n`) y temperatura absoluta (`T`).

El modelo supone partículas puntuales con volumen propio despreciable, colisiones perfectamente elásticas y ausencia de fuerzas intermoleculares. Para resolver cualquier incógnita con conversión automática de unidades, utilice nuestra [Calculadora de la Ley de los Gases Ideales](/es/calculadoras/calculadora-de-ley-de-gases-ideales).

## La ecuación de estado, variables y selección de la constante R

Las cuatro variables de estado, sus despejes y la forma expresada mediante densidad (`ρ`) y masa molar (`M`) se formulan así:

```text
Ecuación de estado:
P × V = n × R × T

Despejes por variable:
P = (n × R × T) / V        V = (n × R × T) / P
n = (P × V) / (R × T)      T = (P × V) / (n × R)

Forma con masa molar (M) y densidad (ρ = m / V):
P × M = ρ × R × T          ρ = (P × M) / (R × T)
```

Asegure la coherencia dimensional de cada parámetro:

- **`P` (presión absoluta):** equivalencias principales: `1 atm = 101 325 Pa = 101,325 kPa = 1,01325 bar = 760 mmHg (Torr)`.
- **`V` (volumen):** expresado en litros (`L = dm³`) o metros cúbicos (`1 m³ = 1 000 L`).
- **`n` (cantidad de sustancia):** moles de gas (`n = m / M`).
- **`T` (temperatura absoluta):** siempre en **kelvin (`K`)** mediante `T(K) = T(°C) + 273,15`.
- **`R` (constante universal de los gases):** constante molar derivada del producto `N_A × k_B`.

## Ejemplo práctico paso a paso: cilindro de oxígeno medicinal

Un cilindro rígido de acero de `40,0 L` contiene `6,50 kg` de oxígeno gaseoso (`O₂`, masa molar `M = 32,00 g/mol`) a `22,0 °C`. Calcule la presión absoluta interior en `atm` y en `kPa`.

1. **Convertir la masa a moles (`n`):**
   `m = 6,50 kg = 6 500 g`.
   `n = 6 500 g / 32,00 g/mol = 203,125 mol`.
2. **Convertir la temperatura a kelvin (`K`):**
   `T = 22,0 °C + 273,15 = 295,15 K`.
3. **Seleccionar `R` para litros y atmósferas:**
   `R = 0,082057 L·atm/(mol·K)`.
4. **Despejar la presión (`P`):**
   `P = (203,125 mol × 0,082057 L·atm/(mol·K) × 295,15 K) / 40,0 L`
   `P = 4 919,61 L·atm / 40,0 L = 122,99 atm ≈ 123,0 atm`.
5. **Convertir a kilopascales (`kPa`):**
   `P = 122,99 atm × 101,325 kPa/atm = 12 462 kPa ≈ 12,46 MPa`.

A presiones superiores a `100 atm`, el oxígeno real presenta ligera desviación (factor de compresibilidad `Z ≈ 0,93` a `295 K`), por lo que la presión medida en manómetro será algo menor que la ideal.

## Valores de la constante universal R según el sistema de unidades

Emparejar erróneamente las unidades de `P` y `V` con `R` es la causa más común de fallo en estos cálculos.

| Sistema de unidades | Presión (`P`) | Volumen (`V`) | Valor de `R` | Ámbito de aplicación |
| :--- | :--- | :--- | :--- | :--- |
| SI estándar | `Pa` (`N/m²`) | `m³` | `8,31446 J/(mol·K)` | Física y termodinámica teórica |
| SI práctico | `kPa` | `L` (`dm³`) | `8,31446 L·kPa/(mol·K)` | Ingeniería química y procesos |
| Química general | `atm` | `L` | `0,082057 L·atm/(mol·K)` | Estequiometría de laboratorio |
| Estándar IUPAC | `bar` | `L` | `0,083145 L·bar/(mol·K)` | Tablas termodinámicas (SATP) |
| Manometría clínica | `mmHg` (`Torr`) | `L` | `62,3636 L·mmHg/(mol·K)` | Fisiología respiratoria y vacío |
| Unidades térmicas | — | — | `1,9872 cal/(mol·K)` | Termoquímica clásica |

## Aplicaciones prácticas, errores comunes y desviación de gases reales

La ecuación `PV = nRT` fundamenta cálculos estequiométricos en reactores gaseosos, calibración de caudalímetros másicos, diseño de bolsas de aire automotrices (mediante la generación rápida de `N₂` por descomposición de azida sódica), planificación de mezclas respiratorias en buceo autónomo e inhaloterapia clínica, y modelado atmosférico de densidad aérea frente a la altitud. Asimismo, mediante la ley de Dalton de las presiones parciales, se extiende directamente a mezclas de gases que no reaccionan entre sí tomando `n` como el total de moles presentes.

Evite cuatro errores frecuentes que invalidan sus resultados:

- **Omitir la conversión a kelvin:** Introducir grados Celsius rompe la proporcionalidad directa entre variables de estado y provoca errores graves o divisiones indefinidas cerca de `0 °C`.
- **Usar presión manométrica sin corrección:** Los manómetros miden sobrepresión relativa al aire exterior. Sume siempre la presión atmosférica local (`P_abs = P_man + P_atm`) antes de aplicar la ecuación.
- **Confundir volúmenes molares estándar:** El volumen molar de `22,41 L/mol` corresponde a condiciones normales tradicionales (`0 °C` y `1 atm`), mientras que en condiciones ambientales estándar SATP (`25 °C`, `1 bar`) asciende a `24,79 L/mol`.
- **Ignorar el comportamiento de gases reales:** A presiones elevadas (superiores a `10–20 atm`) o bajas temperaturas cercanas a la licuefacción, el factor de compresibilidad `Z = PV / (nRT)` se desvía de `1` (como ocurre con el vapor de agua, el amoníaco `NH₃` o el gas natural comprimido). En tales casos debe emplearse la **ecuación de Van der Waals** (`[P + a × (n / V)²] × (V − n × b) = n × R × T`) o ecuaciones cúbicas como Peng-Robinson.
