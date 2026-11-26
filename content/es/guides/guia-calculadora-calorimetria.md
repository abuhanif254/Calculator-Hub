---
title: "Calculadora de Calorimetría: Midiendo la Transferencia de Calor"
description: "Aprenda cómo funciona un calorímetro, las ecuaciones de transferencia de calor a presión y volumen constantes, y utilice nuestra calculadora de calorimetría."
category: "Math & Science"
relatedCalculator: "calorimetry-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "¿Cuál es la diferencia entre un calorímetro de vaso y una bomba calorimétrica?"
    answer: "El calorímetro de vaso trabaja abierto a la atmósfera (presión constante), por lo que el calor medido equivale directamente a la variación de entalpía (ΔH). La bomba calorimétrica es un reactor rígido sellado (volumen constante) diseñado para combustiones a alta presión, donde el calor medido equivale a la variación de energía interna (ΔU)."
  - question: "¿Por qué se incluye la constante del calorímetro (C_cal) en los cálculos de precisión?"
    answer: "Ningún recipiente es perfectamente inerte desde el punto de vista térmico: parte del calor liberado o absorbido por la reacción calienta o enfría las paredes internas, el agitador y el sensor de temperatura. Ignorar el término C_cal × ΔT subestima sistemáticamente la magnitud real del calor de reacción."
  - question: "¿Qué significan los signos positivo y negativo en la variable q?"
    answer: "Por convención termodinámica, q > 0 indica un proceso endotérmico (el sistema absorbe energía térmica del entorno) y q < 0 indica un proceso exotérmico (el sistema libera calor). En calorimetría, si la temperatura del agua sube (q_agua > 0), la reacción estudiada ha sido exotérmica (q_reacción = −q_agua < 0)."
  - question: "¿Es indiferente usar grados Celsius o kelvin para calcular ΔT?"
    answer: "Sí, únicamente en diferencias de temperatura. Dado que un intervalo de 1 °C tiene exactamente la misma magnitud que un intervalo de 1 K, la diferencia ΔT = T_final − T_inicial arroja idéntico valor numérico en ambas escalas, aunque debe mantener la coherencia con las unidades de la capacidad calorífica específica."
  - question: "¿Cómo se calibra experimentalmente una bomba calorimétrica?"
    answer: "Se quema una masa conocida y certificada de un patrón termoquímico estable, habitualmente ácido benzoico de alta pureza (cuyo calor de combustión a volumen constante es −26,434 kJ/g). Al medir el incremento real de temperatura ΔT del baño de agua, se despeja la capacidad calorífica efectiva C_cal del equipo."
---

La **calorimetría** mide cuantitativamente el intercambio de energía térmica (`q`) asociado a una reacción química, un cambio de fase o una mezcla física. El instrumento empleado, el **calorímetro**, aísla el sistema del entorno exterior para transferir todo el calor liberado o absorbido hacia un medio receptor de masa y propiedades térmicas conocidas, habitualmente agua.

Por el Principio de Conservación de la Energía, en un recipiente adiabático la suma de flujos térmicos es cero (`q_sistema + q_entorno = 0`). Registrar el cambio de temperatura del medio permite calcular la energía del proceso con nuestra [Calculadora de Calorimetría](/es/calculadoras/calculadora-de-calorimetria).

## Ecuaciones fundamentales y variables de transferencia térmica

Cuando el intercambio térmico modifica la temperatura sin provocar cambio de fase (calor sensible), la energía transferida obedece la ecuación fundamental de la calorimetría. Al incorporar la capacidad térmica del propio recipiente (`C_cal`), el balance completo resulta:

```text
Calor sensible del medio receptor:
q_medio = m × c × ΔT

Calor absorbido por el calorímetro:
q_cal = C_cal × ΔT

Balance térmico completo:
q_reacción = −(q_medio + q_cal) = −(m × c × ΔT + C_cal × ΔT)

donde ΔT = T_final − T_inicial
```

Cada magnitud exige coherencia dimensional estricta:

- **`q` (energía térmica):** expresada en julios (`J`) o kilojulios (`kJ`). En nutrición sigue empleándose la kilocaloría (`1 kcal = 4,184 kJ`).
- **`m` (masa del medio):** en gramos (`g`) o kilogramos (`kg`). En disoluciones acuosas diluidas se estima multiplicando el volumen por su densidad (`ρ ≈ 1,00 g/mL`).
- **`c` (calor específico):** energía necesaria para elevar `1 g` de sustancia en `1 °C` (`4,184 J/(g·°C)` para el agua líquida a `25 °C`).
- **`C_cal` (constante del calorímetro):** energía requerida para variar `1 °C` la temperatura del aparato (`J/°C` o `J/K`).
- **`ΔT` (cambio de temperatura):** temperatura final de equilibrio menos temperatura inicial.

## Ejemplo práctico paso a paso: neutralización ácido-base

Suponga que mezcla `50,0 mL` de `HCl 1,00 mol/L` con `50,0 mL` de `NaOH 1,00 mol/L` en un calorímetro a presión constante cuya constante térmica calibrada es `C_cal = 12,0 J/°C`. La temperatura inicial es `22,40 °C` y la máxima final alcanza `28,90 °C`. Asuma un volumen total de `100,0 mL`, densidad `1,00 g/mL` y `c = 4,184 J/(g·°C)`.

1. **Calcular el incremento térmico (`ΔT`):**
   `ΔT = 28,90 °C − 22,40 °C = +6,50 °C`.
2. **Calcular el calor absorbido por la disolución (`q_sol`):**
   `m_sol = 100,0 mL × 1,00 g/mL = 100,0 g`.
   `q_sol = 100,0 g × 4,184 J/(g·°C) × 6,50 °C = +2 719,6 J`.
3. **Calcular el calor absorbido por el calorímetro (`q_cal`):**
   `q_cal = 12,0 J/°C × 6,50 °C = +78,0 J`.
4. **Determinar el calor de reacción (`q_reacción`):**
   `q_reacción = −(2 719,6 J + 78,0 J) = −2 797,6 J = −2,798 kJ`.
   El signo negativo confirma un proceso exotérmico.
5. **Calcular la entalpía molar de neutralización (`ΔH_neut`):**
   Los moles de agua formados son `n = 0,0500 L × 1,00 mol/L = 0,0500 mol`.
   `ΔH_neut = −2,7976 kJ / 0,0500 mol = −55,95 kJ/mol ≈ −56,0 kJ/mol`.

Este resultado coincide con el valor teórico de referencia para la neutralización de ácidos y bases fuertes en disolución diluida (`−55,8` a `−57,3 kJ/mol`).

## Comparativa de técnicas calorimétricas y configuraciones

El tipo de calorímetro adecuado depende del estado físico de los reactivos y de la precisión analítica requerida.

| Tipo de calorímetro | Magnitud medida | Aplicación principal | Precisión típica | Entorno de uso |
| :--- | :--- | :--- | :--- | :--- |
| Calorímetro de vaso (presión constante) | `ΔH` (`q_p`) | Neutralizaciones y disoluciones acuosas | `±2 %` a `±5 %` | Docencia y laboratorio general |
| Bomba calorimétrica (volumen constante) | `ΔU` (`q_v`) | Poder calorífico de combustibles y alimentos | `±0,1 %` a `±0,5 %` | Control energético y calidad |
| Calorimetría diferencial de barrido (DSC) | Flujo térmico vs. `T` | Transiciones vítreas, fusión y pureza | `±0,5 %` a `±1 %` | Industria farmacéutica y polímeros |
| Calorimetría de titulación isotérmica (ITC) | `ΔH`, `K_d` y `ΔS` | Interacciones proteína-ligando | `±1 %` | Bioquímica y farmacología |
| Calorímetro adiabático de mezcla | `q` y `c` | Capacidad calorífica de aleaciones | `±0,5 %` a `±2 %` | Ciencia de materiales |
| Calorímetro de flujo continuo | Potencia térmica (`W`) | Seguridad térmica de reactores | `±1 %` a `±3 %` | Ingeniería química industrial |

## Aplicaciones, errores frecuentes y criterios de calibración

En el sector energético, la bomba calorimétrica certifica el poder calorífico superior e inferior (`PCS` y `PCI`) de carbón, biomasa y combustibles conforme a normas `ISO 1928` o `ASTM D5865`. En bromatología determina la energía bruta de los alimentos antes de aplicar factores de digestibilidad de Atwater para el etiquetado nutricional. En química industrial evalúa riesgos de embalamiento térmico antes de escalar síntesis a planta.

Para mantener la validez de sus mediciones, evite cuatro fallos habituales:

- **Pérdidas térmicas en procesos lentos:** Si la reacción tarda varios minutos, parte del calor escapa al ambiente. Los laboratorios corrigen este sesgo extrapolando linealmente la curva de enfriamiento hasta el instante de mezcla.
- **Usar propiedades del agua pura en disoluciones concentradas:** En electrolitos o ácidos concentrados, ni la densidad es `1,00 g/mL` ni el calor específico es `4,184 J/(g·°C)`.
- **Confundir `ΔU` con `ΔH`:** En combustiones dentro de una bomba calorimétrica (`V` constante) se mide `ΔU`; para convertirlo a entalpía estándar aplique `ΔH = ΔU + Δn_gas × R × T`.
- **Omitir la calibración periódica:** Cambiar el volumen de agua, el agitador o el sensor modifica `C_cal`, por lo que conviene recalibrar regularmente con ácido benzoico certificado (`−26,434 kJ/g`).
