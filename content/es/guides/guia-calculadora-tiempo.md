---
title: "Cómo Sumar y Restar Tiempo: La Guía Definitiva"
description: "Guía práctica de aritmética sexagesimal (base 60): suma con acarreo, resta con préstamo, conversión a horas decimales, control de nóminas y prevención de errores."
category: "Productivity & Utilities"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "time-calculator"
relatedType: "calculator"
faqs:
  - question: "¿Por qué 8.30 horas en una hoja de cálculo no equivalen a 8 horas y 30 minutos?"
    answer: "Porque el reloj utiliza base 60 (sexagesimal) y los números decimales usan base 10. En sistema decimal, 0.30 horas corresponde al 30 % de 60 minutos, es decir, 18 minutos (8 h 18 min). Para representar 8 horas y 30 minutos en formato decimal debe escribirse 8.50 horas."
  - question: "¿Cómo se calcula una jornada laboral que cruza la medianoche?"
    answer: "Se divide el turno en dos tramos respecto a las 24:00 (medianoche): primero se resta la hora de entrada a 24:00 y luego se suma la hora de salida del día siguiente. Otra vía exacta consiste en sumar 24 horas a la hora de salida (por ejemplo, 06:15 pasa a ser 30:15) y restar directamente la hora de entrada."
  - question: "¿Cómo se convierten horas, minutos y segundos a horas decimales para facturación?"
    answer: "Divida los minutos entre 60, divida los segundos entre 3600 y sume ambos cocientes a las horas enteras: Horas decimales = H + (M / 60) + (S / 3600). Por ejemplo, 2 horas, 45 minutos y 0 segundos equivale a 2 + (45 / 60) = 2.75 horas."
  - question: "¿Por qué una calculadora convencional falla al sumar 1.45 + 2.30 como tiempo?"
    answer: "Una calculadora estándar opera en base 10 y devuelve 3.75, interpretando que la unidad vale 100 centésimas. En aritmética de tiempo cada unidad de hora contiene 60 minutos, por lo que 45 + 30 = 75 minutos debe convertirse mediante acarreo en 1 hora y 15 minutos, dando 4 horas y 15 minutos (4:15)."
  - question: "¿Es legal redondear las horas trabajadas a intervalos de 15 minutos en nómina?"
    answer: "En diversas jurisdicciones (como la normativa laboral federal estadounidense FLSA), el redondeo a incrementos de 5, 10 o 15 minutos solo se permite si es estrictamente simétrico y neutral a lo largo del tiempo (regla de los 7 minutos). Redondear sistemáticamente a favor del empleador constituye una infracción salarial; consulte la legislación laboral local vigente."
---

Sumar bloques horarios, liquidar hojas de tiempo o calcular la duración total de grabaciones provoca fallos frecuentes cuando se utiliza aritmética decimal común. Mientras las finanzas operan en **base 10**, el reloj sigue un sistema **sexagesimal (base 60)**: `1 hora` equivale a `60 minutos` y `1 minuto` a `60 segundos`.

Nuestra [Calculadora de Tiempo](/es/calculadoras/calculadora-de-tiempo) automatiza los acarreos y convierte al instante entre formato reloj (`HH:MM:SS`) y horas decimales. Esta guía expone las reglas de la base 60, dos ejemplos laborales resueltos paso a paso, una tabla de equivalencias decimales y los errores críticos en nóminas y hojas de cálculo.

## Fundamentos de la aritmética sexagesimal (base 60)

Toda magnitud horaria en horas (`H`), minutos (`M`) y segundos (`S`) responde a potencias de `60`:

```text
Segundos totales = (H × 3600) + (M × 60) + S
Horas decimales  = H + (M / 60) + (S / 3600)
```

### Suma con acarreo

Al sumar `(H₁, M₁, S₁)` y `(H₂, M₂, S₂)`, cada columna se reinicia al alcanzar `60`:

1. Sume segundos (`S_bruto = S₁ + S₂`). Si `S_bruto ≥ 60`, conserve `S_bruto mod 60` y sume `⌊S_bruto / 60⌋` minutos.
2. Sume minutos más el acarreo (`M_bruto = M₁ + M₂ + acarreo_s`). Si `M_bruto ≥ 60`, conserve `M_bruto mod 60` y sume `⌊M_bruto / 60⌋` horas.
3. Sume las horas junto con el acarreo recibido.

### Resta con préstamo

Para restar `HH₂:MM₂:SS₂` de `HH₁:MM₁:SS₁` en formato de 24 horas:

1. Si `SS₁ < SS₂`, reste `1` a `MM₁` y sume `60` a `SS₁`.
2. Si `MM₁ < MM₂`, reste `1` a `HH₁` y sume `60` a `MM₁`.
3. Si la jornada cruza la medianoche (`HH₁ < HH₂`), sume `24 horas` a `HH₁` antes de restar.

## Ejemplos numéricos resueltos paso a paso

### Ejemplo A: suma de bloques y conversión a horas decimales

Un consultor registra dos sesiones: **Bloque 1 = `4 h 45 min 40 s`** y **Bloque 2 = `3 h 38 min 50 s`**, a una tarifa de `$35.00/h`.

1. **Segundos:**
   ```text
   40 s + 50 s = 90 s → 90 − 60 = 30 s (acarreo: +1 min)
   ```
2. **Minutos (con acarreo):**
   ```text
   45 min + 38 min + 1 min = 84 min → 84 − 60 = 24 min (acarreo: +1 h)
   ```
3. **Horas y total en reloj:**
   ```text
   4 h + 3 h + 1 h = 8 h → Total = 8 h 24 min 30 s (08:24:30)
   ```
4. **Conversión decimal y cobro:**
   ```text
   Horas decimales = 8 + (24 / 60) + (30 / 3600)
                   = 8 + 0.4000 + 0.008333... = 8.4083 horas
   Importe bruto   = 8.408333 × $35.00 = $294.29
   ```

### Ejemplo B: turno nocturno con pausa no remunerada

Entrada a las **9:45 p. m. (`21:45`)**, pausa de `30 minutos` y salida a las **6:15 a. m. (`06:15`)** del día siguiente.

1. **Ajustar salida por cruce de medianoche (`+24 h`):** `06:15` pasa a `30:15`.
2. **Restar minutos con préstamo (`30 h → 29 h`, `15 min → 75 min`):**
   ```text
   Minutos: 75 − 45 = 30 min
   Horas:   29 − 21 = 8 h → Duración bruta = 8 h 30 min
   ```
3. **Descontar pausa de comida:**
   ```text
   8 h 30 min − 0 h 30 min = 8 h 00 min netas (8.00 horas)
   ```

## Tabla de equivalencias: minutos sexagesimales frente a horas decimales

| Tiempo (`HH:MM`) | Fracción de hora | Horas decimales exactas | Redondeo (2 dec.) | Error típico en base 10 |
|---|---|---|---|---|
| `0:06` | `1 / 10` | `0.1000 h` | `0.10 h` | Leerlo como `0.06 h` (`−40 %`) |
| `0:10` | `1 / 6` | `0.1667 h` | `0.17 h` | Escribir `0.10 h` (`6 min`) |
| `0:15` | `1 / 4` | `0.2500 h` | `0.25 h` | Escribir `0.15 h` (`9 min`) |
| `0:20` | `1 / 3` | `0.3333 h` | `0.33 h` | Escribir `0.20 h` (`12 min`) |
| `0:30` | `1 / 2` | `0.5000 h` | `0.50 h` | Escribir `0.30 h` (`18 min`) |
| `0:45` | `3 / 4` | `0.7500 h` | `0.75 h` | Escribir `0.45 h` (`27 min`) |

## Casos de uso habituales y advertencias de precisión

Al utilizar la [Calculadora de Tiempo](/es/calculadoras/calculadora-de-tiempo) en proyectos, producción audiovisual o nóminas, evite cuatro errores críticos:

- **Notación ambigua con punto decimal:** nunca mezcle `.` con `:` en hojas de registro. Escribir `7.45` en una fórmula de pago multiplica por `7 horas y 27 minutos` en lugar de `7 horas y 45 minutos`.
- **Celdas horarias en hojas de cálculo:** Excel y Google Sheets almacenan las horas como **fracción de 24 horas** (`06:00 = 0.25`). Para obtener horas decimales multiplicables por tarifa horaria, multiplique la celda por `24` (`=Celda * 24`).
- **Cambios de horario de verano (`DST`):** la aritmética pura de reloj asume horas fijas de `60 minutos`. Si un turno nocturno atraviesa un cambio estacional oficial, la duración real será `1 hora` mayor o menor que la resta directa `Salida − Entrada`.
- **Redondeo en control laboral:** cuando una empresa redondea fichajes a cuartos (`0.25 h`) o décimas (`0.10 h`), la regla debe ser estrictamente simétrica (por ejemplo, de `1` a `7` minutos hacia abajo y de `8` a `14` hacia arriba), conservando el registro original por segundo ante inspecciones.
