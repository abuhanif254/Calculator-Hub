---
title: "Calculadora de Energía Libre de Gibbs: Reacciones Espontáneas"
description: "Aprenda cómo la Energía Libre de Gibbs determina si una reacción química es espontánea, la entalpía, la entropía y use nuestra calculadora gratuita."
category: "Math & Science"
relatedCalculator: "gibbs-free-energy-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "¿Por qué una reacción con variación de entalpía positiva puede ser espontánea?"
    answer: "Aunque un proceso endotérmico (ΔH > 0) absorbe energía térmica del entorno, la ecuación ΔG = ΔH − T × ΔS demuestra que puede volverse espontáneo (ΔG < 0) si genera un aumento suficiente de entropía (ΔS > 0) y opera a una temperatura absoluta elevada, haciendo que el término entrópico T × ΔS supere a ΔH."
  - question: "¿Si ΔG es muy negativo, la reacción ocurrirá de inmediato a simple vista?"
    answer: "No necesariamente. La energía libre de Gibbs predice la espontaneidad termodinámica, es decir, qué estado es más estable energéticamente, pero no indica la velocidad de reacción. Procesos muy favorables como la conversión de diamante en grafito (ΔG° < 0) presentan una energía de activación tan alta que no avanzan de manera perceptible a temperatura ambiente."
  - question: "¿Qué unidad debe usarse para la entropía y la temperatura en la ecuación de Gibbs?"
    answer: "La temperatura debe introducirse siempre en kelvin (K = °C + 273,15), nunca en grados Celsius ni Fahrenheit. Además, ΔH y T × ΔS deben compartir exactamente la misma unidad de energía: si ΔH está en kJ/mol y ΔS en J/(mol·K), es imprescindible dividir ΔS entre 1000 para expresarlo en kJ/(mol·K) antes de restar."
  - question: "¿Cómo se relacionan la energía libre de Gibbs estándar y la constante de equilibrio K?"
    answer: "Ambas magnitudes se vinculan mediante la relación ΔG° = −R × T × ln(K). Cuando ΔG° es negativo, la constante K es mayor que 1 y el equilibrio favorece a los productos; cuando ΔG° es positivo, K es menor que 1 y predominan los reactivos. Si ΔG° = 0, entonces K = 1."
  - question: "¿Cuál es la diferencia entre ΔG y ΔG° en un reactor químico?"
    answer: "ΔG° corresponde a las condiciones estándar de referencia (298,15 K, gases a 1 bar y solutos a 1 mol/L). En cambio, ΔG representa la variación real bajo las concentraciones y presiones instantáneas de la mezcla, dada por ΔG = ΔG° + R × T × ln(Q), y es la magnitud que determina hacia dónde avanza la reacción en ese instante."
---

La variación de la energía libre de Gibbs (`ΔG`) constituye el criterio termodinámico exacto para determinar si una reacción química es espontánea a temperatura y presión constantes. Su valor surge del balance entre el cambio de entalpía (`ΔH`) y el cambio de entropía (`ΔS`) multiplicado por la temperatura absoluta (`T`): `ΔG = ΔH − T × ΔS`. Si `ΔG < 0`, la reacción es espontánea (exergónica); si `ΔG > 0`, no es espontánea (endergónica) y requiere aporte externo de trabajo; y si `ΔG = 0`, el sistema está en equilibrio.

Además de predecir la dirección natural del cambio, `ΔG` fija el límite máximo de trabajo útil no expansivo que puede obtenerse del proceso. Para evitar errores de conversión entre julios, kilojulios y escalas térmicas, utilice nuestra [Calculadora de Energía Libre de Gibbs](/es/calculadoras/calculadora-de-energia-libre-gibbs).

## Fundamento termodinámico y ecuaciones clave

La segunda ley de la termodinámica exige que todo proceso espontáneo incremente la entropía total del universo (`ΔS_universo > 0`). A presión y temperatura constantes, la transferencia térmica hacia el entorno equivale a `−ΔH / T`, lo que permite expresar dicho criterio mediante variables exclusivas del sistema a través de la función `G = H − T × S`.

Las ecuaciones operativas para evaluar reacciones estándar, condiciones reales y constantes de equilibrio son:

```text
ΔG = ΔH − T × ΔS
ΔG° = Σ(n_p × ΔG°_f,productos) − Σ(n_r × ΔG°_f,reactivos)
ΔG = ΔG° + R × T × ln(Q)
ΔG° = −R × T × ln(K)
```

En estas fórmulas, `ΔG` y `ΔH` se miden en `kJ/mol`, `ΔS` en `kJ/(mol·K)`, `T` en kelvin (`K`), `R = 8,3145 × 10⁻³ kJ/(mol·K)` es la constante de los gases, `Q` es el cociente instantáneo de reacción y `K` es la constante de equilibrio termodinámica. Cuando `ΔH` y `ΔS` comparten signo, la temperatura umbral donde se invierte la espontaneidad (`ΔG = 0`) es `T_eq = ΔH / ΔS`.

## Ejemplo numérico paso a paso: calcinación de la caliza

Considere la descomposición térmica del carbonato de calcio en la industria cementera: `CaCO₃(s) → CaO(s) + CO₂(g)`. A `298,15 K`, sus propiedades estándar son `ΔH° = +178,3 kJ/mol` y `ΔS° = +160,5 J/(mol·K)`. Evaluaremos su espontaneidad a `25 °C`, su temperatura umbral de calcinación y su valor a `1200 K` (`926,85 °C`).

1. **Conversión de unidades:** Se transforma la entropía a kilojulios: `ΔS° = +160,5 J/(mol·K) / 1000 = +0,1605 kJ/(mol·K)`.
2. **Evaluación a `298,15 K` (`25 °C`):** El término entrópico vale `T × ΔS° = 298,15 K × 0,1605 kJ/(mol·K) = 47,85 kJ/mol`. Al restarlo: `ΔG°(298,15 K) = 178,3 − 47,85 = +130,45 kJ/mol`. Al ser positivo, la piedra caliza es estable a temperatura ambiente.
3. **Temperatura mínima de calcinación (`T_eq`):** Igualando `ΔG° = 0`: `T_eq = 178,3 kJ/mol / 0,1605 kJ/(mol·K) = 1110,9 K`, equivalentes a `837,8 °C`.
4. **Evaluación en horno a `1200 K`:** `T × ΔS° = 1200 K × 0,1605 kJ/(mol·K) = 192,6 kJ/mol`, por lo que `ΔG°(1200 K) ≈ 178,3 − 192,6 = −14,3 kJ/mol`. Por encima de `1110,9 K`, la reacción es espontánea y la constante de equilibrio supera la unidad: `K = exp(−ΔG° / (R × T)) = exp(14,3 / (0,0083145 × 1200)) ≈ 4,19`, es decir, una presión parcial de equilibrio de `CO₂` superior a `4 bar`.

## Los cuatro regímenes de espontaneidad según ΔH y ΔS

La combinación de signos de entalpía y entropía define cuatro comportamientos térmicos diferenciados, además de la condición límite de equilibrio dinámico exacto.

| `ΔH` | `ΔS` | `−T × ΔS` | Signo de `ΔG` | Espontaneidad | Ejemplo químico o físico |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `< 0` | `> 0` | `< 0` | Siempre `< 0` | Espontánea a toda temperatura | Combustión de hidrocarburos |
| `> 0` | `< 0` | `> 0` | Siempre `> 0` | Nunca espontánea | Formación de ozono (`3 O₂ → 2 O₃`) |
| `< 0` | `< 0` | `> 0` | `< 0` si `\|ΔH\| > \|T × ΔS\|` | Espontánea a baja `T` (`T < ΔH/ΔS`) | Congelación del agua o síntesis de `NH₃` |
| `> 0` | `> 0` | `< 0` | `< 0` si `\|T × ΔS\| > \|ΔH\|` | Espontánea a alta `T` (`T > ΔH/ΔS`) | Fusión del hielo o calcinación de `CaCO₃` |
| Igual signo | Igual signo | Opuesto | `ΔG = 0` | Equilibrio dinámico (`Q = K`) | Ebullición del agua a `373,15 K` y `1 atm` |

## Aplicaciones industriales, errores comunes y matices de precisión

En metalurgia extractiva, los diagramas de Ellingham representan `ΔG°` frente a la temperatura absoluta para seleccionar qué agente reductor (como carbono sólido, monóxido de carbono o hidrógeno) logra reducir económicamente un óxido metálico específico en un alto horno. En bioquímica celular, el acoplamiento metabólico permite impulsar reacciones biosintéticas endergónicas (`ΔG > 0`) vinculándolas enzimáticamente a la hidrólisis del trifosfato de adenosina (`ATP`, cuya energía libre biológica estándar es `ΔG°' ≈ −30,5 kJ/mol` a `pH 7`). En ingeniería de reactores químicos, conocer `ΔG°` evita invertir recursos en rutas sintéticas desfavorables y orienta la optimización de presión, temperatura o extracción continua de productos para desplazar el cociente `Q`.

Entre los fallos de cálculo más habituales destaca mezclar `ΔH` expresada en `kJ/mol` con `ΔS` en `J/(mol·K)` sin dividir esta última entre `1000`, un descuido que amplifica mil veces el término entrópico y suele invertir el signo del resultado. Igualmente crítico es olvidar convertir los grados Celsius a escala absoluta kelvin (`K = °C + 273,15`), pues las temperaturas negativas o cercanas a cero Celsius destruyen la proporcionalidad termodinámica de `T × ΔS`.

Finalmente, recuerde dos límites metodológicos fundamentales. Primero, la termodinámica no predice la velocidad ni el mecanismo: una reacción con `ΔG < 0` puede resultar imperceptiblemente lenta si presenta una energía de activación elevada y carece de catalizador. Segundo, asumir `ΔH` y `ΔS` constantes es una aproximación válida solo en intervalos térmicos moderados; ante saltos de varios cientos de kelvin debe incorporarse la variación de capacidad calorífica (`ΔC_p`).
