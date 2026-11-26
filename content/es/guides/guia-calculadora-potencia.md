---
title: "Física de la Potencia: La Tasa de Realizar Trabajo"
description: "Domine la relación entre trabajo mecánico, tiempo y potencia (P = W / t). Comprenda el vatio, la equivalencia con caballos de fuerza (HP) y use la Calculadora de Potencia."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "power-calculator"
relatedType: "calculator"
faqs:
  - question: "¿Cuál es la diferencia exacta entre energía (julios o kWh) y potencia (vatios o kW)?"
    answer: "La energía o trabajo mide la cantidad total de esfuerzo o calor transferido (en julios o kilovatios-hora), mientras que la potencia mide la rapidez con la que ocurre esa transferencia (julios por segundo o vatios). Un motor pequeño puede realizar el mismo trabajo total que uno grande si opera durante más tiempo, pero desarrolla menor potencia."
  - question: "¿Cómo se convierten caballos de fuerza mecánicos (HP), caballos de vapor (CV) y kilovatios (kW)?"
    answer: "El caballo de fuerza mecánico imperial (HP) equivale a 745.7 vatios (0.7457 kW), mientras que el caballo de vapor métrico (CV) utilizado en automoción europea equivale a 735.5 vatios (0.7355 kW). Por tanto, 1 kW corresponde aproximadamente a 1.341 HP o a 1.360 CV."
  - question: "¿Cuándo conviene calcular la potencia como fuerza por velocidad (P = F × v)?"
    answer: "Cuando un vehículo, cinta transportadora o ascensor se desplaza a velocidad constante contra una fuerza resistente conocida (gravedad, rozamiento o arrastre aerodinámico). En ese régimen estacionario, P = F × v × cos(θ) entrega la potencia instantánea requerida sin necesidad de medir intervalos de tiempo ni distancias totales."
  - question: "¿Qué papel desempeña el rendimiento o eficiencia (η) al dimensionar un motor o bomba?"
    answer: "Ninguna máquina convierte el 100 % de la energía absorbida en trabajo mecánico útil; parte se pierde en calor, fricción y pérdidas eléctricas. La potencia de entrada requerida se obtiene dividiendo la potencia útil deseada entre la eficiencia adimensional η (por ejemplo, 0.85 para un 85 % de rendimiento)."
  - question: "¿Un aparato de mayor potencia consume siempre más electricidad en la factura mensual?"
    answer: "No necesariamente. El consumo facturado corresponde a la energía total (E = P × t). Un hervidor eléctrico de 2,200 W encendido durante 3 minutos consume 0.11 kWh, mientras que una estufa o luminaria de 200 W encendida durante 8 horas consume 1.60 kWh, casi quince veces más energía."
---

Si un operario sube una carga de `40 kg` por unas escaleras caminando o corriendo, realiza exactamente el mismo trabajo contra la gravedad. Sin embargo, al correr completa el ascenso en menos tiempo y desarrolla mayor **potencia**. En física e ingeniería, la potencia (`P`) cuantifica la rapidez con la que se realiza un trabajo o se transfiere energía.

Nuestra [Calculadora de Potencia](/es/calculadoras/calculadora-de-potencia) despeja de forma bidireccional potencia, trabajo o tiempo. Esta guía reúne las ecuaciones mecánicas y cinemáticas clave, las equivalencias entre vatios, `HP` y `CV`, un caso industrial resuelto paso a paso y los criterios técnicos para evitar errores de dimensionamiento.

## Ecuaciones fundamentales de la potencia y unidades

La potencia media (`P`) es el cociente entre el trabajo realizado (`W`) o variación energética (`ΔE`) y el tiempo transcurrido (`t`). Cuando un cuerpo se mueve a velocidad `v` bajo una fuerza constante `F`, se obtiene la forma cinemática instantánea:

```text
P = W / t = ΔE / t
P = F × v × cos(θ)
P_entrada = P_útil / η
```

Cada magnitud emplea unidades del Sistema Internacional:

- **`P` (Potencia):** medida en **vatios (`W`)**, donde `1 W = 1 J/s`. En instalaciones industriales se utilizan **kilovatios (`1 kW = 1,000 W`)** y **megavatios (`1 MW = 1,000,000 W`)**.
- **`W` (Trabajo o energía):** expresado en **julios (`J`)**.
- **`t` (Tiempo):** duración de la transferencia energética en **segundos (`s`)**.
- **`v` (Velocidad):** rapidez en **metros por segundo (`m/s`)**, formando un ángulo `θ` con la fuerza `F` (`N`).
- **`η` (Eficiencia):** rendimiento global (`0 < η ≤ 1`) entre potencia útil entregada y potencia absorbida.

### Equivalencias entre vatios, kilovatios, HP y CV

En motores térmicos, bombas hidráulicas y climatización coexisten unidades tradicionales que conviene convertir con rigor:

- **`1 kW`:** `1,000 W` = `1,000 J/s` ≈ `1.341 HP` ≈ `1.360 CV`.
- **`1 HP` (caballo de fuerza mecánico):** equivale a `550 lb·ft/s` = `745.7 W`.
- **`1 CV` (caballo de vapor métrico):** equivale a `75 kgf·m/s` = `735.5 W`.
- **`1 BTU/h` (climatización):** equivale a `0.2931 W` (`1 tonelada de refrigeración ≈ 3.517 kW`).

## Ejemplo numérico resuelto paso a paso

Se requiere seleccionar el motor de un montacargas para elevar `m = 600 kg` una altura vertical `d = 18 m` en `t = 12 s` a velocidad uniforme (`θ = 0°`), con `g = 9.81 m/s²` y rendimiento mecánico-eléctrico `η = 0.85` (`85 %`).

1. **Fuerza de elevación (`F`):** `F = m × g = 600 kg × 9.81 m/s² = 5,886 N`.
2. **Trabajo mecánico útil (`W`):** `W = 5,886 N × 18 m = 105,948 J` (`105.95 kJ`).
3. **Potencia mecánica útil (`P_útil`):** `P_útil = 105,948 J / 12 s = 8,829 W ≈ 8.83 kW`, equivalente a `8,829 / 745.7 = 11.84 HP`. (Verificación cinemática: `v = 18 / 12 = 1.5 m/s`; `P_útil = 5,886 × 1.5 = 8,829 W`).
4. **Potencia eléctrica absorbida (`P_entrada`):** considerando pérdidas (`η = 0.85`), `P_entrada = 8,829 W / 0.85 = 10,387.06 W ≈ 10.39 kW`.

La elección comercial segura será un motor normalizado de `11 kW` (`15 HP`) para cubrir además el transitorio de arranque.

## Tabla comparativa de potencias y consumos habituales

La tabla relaciona la potencia nominal de seis sistemas con la energía total transferida en una hora de operación continua:

| Sistema o equipo | Potencia nominal | Equivalencia HP | Energía en 1 hora | Uso característico |
| --- | --- | --- | --- | --- |
| Bombilla LED doméstica | 10 W (0.01 kW) | 0.013 HP | 36,000 J (0.01 kWh) | Iluminación residencial eficiente |
| Ciclista en ascenso | 250 W (0.25 kW) | 0.335 HP | 900,000 J (0.25 kWh) | Esfuerzo aeróbico continuo |
| Hervidor eléctrico | 2,000 W (2.0 kW) | 2.68 HP | 7.2 MJ (2.0 kWh) | Calentamiento por resistencia |
| Bomba centrífuga | 7,500 W (7.5 kW) | 10.06 HP | 27.0 MJ (7.5 kWh) | Impulsión de caudal industrial |
| Motor de automóvil | 85,000 W (85 kW) | 114.0 HP | 306.0 MJ (85 kWh) | Tracción a plena carga |
| Aerogenerador terrestre | 3,000,000 W (3 MW) | 4,023 HP | 10.8 GJ (3,000 kWh) | Generación eléctrica de red |

## Usos industriales, errores habituales y criterios de precisión

El cálculo de potencia es indispensable para dimensionar motores y variadores de frecuencia, estimar cargas térmicas, analizar el umbral funcional en ciclismo y optimizar contratos eléctricos que facturan separadamente **potencia contratada (`kW`)** y **energía consumida (`kWh`)**.

Conviene evitar tres errores técnicos frecuentes:

1. **Confundir `kW` con `kWh`:** el kilovatio expresa tasa instantánea; el kilovatio-hora mide energía acumulada (`1 kWh = 3.6 MJ`). Hablar de «kW por hora» es incorrecto.
2. **Despreciar picos de arranque:** `P = W / t` mide potencia promedio, pero motores asíncronos y compresores exigen entre 2 y 6 veces su corriente nominal al vencer la inercia inicial.
3. **Omitir el factor de potencia (`cos φ`) en alterna:** en cargas inductivas la potencia activa útil es `P = V × I × cos(φ)` (`W`), distinta de la potencia aparente `S = V × I` (`VA`) que determina la sección del cableado.

Para cumplir reglamentos eléctricos vigentes (IEC o normativas nacionales de baja tensión), los conductores y protecciones deben dimensionarse sobre la potencia absorbida real, considerando derrateo térmico ambiental y márgenes de sobrecarga.
