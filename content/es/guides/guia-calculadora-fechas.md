---
title: "La Guía Definitiva de la Calculadora de Fechas: Sumar, Restar y Medir el Tiempo"
description: "Guía técnica para calcular duraciones exactas entre fechas: reglas del calendario gregoriano, años bisiestos, cómputo de días hábiles, convenciones financieras y casos límite."
category: "Productivity & Utilities"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "date-calculator"
relatedType: "calculator"
faqs:
  - question: "¿Por qué la suma de un mes desde el 31 de enero devuelve el 28 o 29 de febrero?"
    answer: "Porque febrero solo tiene 28 días en años comunes y 29 en años bisiestos. Las calculadoras de calendario estándar aplican una regla de ajuste al último día válido del mes destino en lugar de desbordar hacia marzo, manteniendo la operación dentro del mes calendario esperado."
  - question: "¿Por qué 2100 no será año bisiesto aunque sea divisible por 4?"
    answer: "La órbita terrestre dura aproximadamente 365.2422 días, no 365.25. Añadir un día cada 4 años sin excepción genera un exceso de 0.0078 días por año. Para corregirlo, el calendario gregoriano suprime el 29 de febrero en los años seculares múltiplos de 100, salvo que también sean divisibles por 400 (como 2000 o 2400)."
  - question: "¿Cuántos días calendario equivalen aproximadamente a 30 días hábiles?"
    answer: "Sin días festivos intermedios, 30 días hábiles de lunes a viernes equivalen exactamente a 6 semanas completas, es decir, 42 días calendario. Si dentro de ese intervalo cae algún feriado oficial entre semana, el plazo real se extiende a 43 días calendario o más según el calendario laboral aplicable."
  - question: "¿Se incluye el día de inicio al calcular los días transcurridos entre dos fechas?"
    answer: "Por convención estándar en cálculo de intervalos, la diferencia (Fecha Final − Fecha Inicial) cuenta los días transcurridos excluyendo el día de partida e incluyendo el de llegada, igual que las noches de hotel. En plazos legales o laborales inclusivos que cuentan ambos extremos, debe sumarse 1 día adicional."
  - question: "¿Qué diferencia hay entre el resultado en días totales y en años, meses y días?"
    answer: "El recuento de días totales mide la distancia absoluta en unidades exactas de 24 horas calendario (por ejemplo, 420 días). La descomposición en años, meses y días sigue los límites reales de cada mes del calendario gregoriano, por lo que el mismo número de días totales puede equivaler a distintos recuentos de meses según qué meses atraviese."
---

Calcular con exactitud la distancia entre dos fechas o proyectar un vencimiento futuro resulta complejo porque el calendario gregoriano carece de base decimal uniforme. Los meses varían entre `28`, `29`, `30` y `31` días, los años bisiestos alteran febrero de manera irregular y los plazos contractuales excluyen fines de semana y días festivos.

Nuestra [Calculadora de Fechas](/es/calculadoras/calculadora-de-fechas) automatiza tanto el conteo cronológico exacto como la suma o resta en días calendario y días hábiles. Esta guía desarrolla las reglas del calendario gregoriano, dos ejercicios resueltos paso a paso, una tabla de convenciones de conteo y los errores más frecuentes en el cómputo de intervalos.

## Reglas del calendario gregoriano y fórmulas de conteo

El año trópico medio dura aproximadamente `365.2422 días`. Para impedir el desplazamiento paulatino de las estaciones, el calendario gregoriano fija un promedio de `365.2425 días` mediante `97` años bisiestos por cada ciclo de `400` años.

### Criterio exacto de año bisiesto

Un año civil `Y` incorpora el `29 de febrero` (`366 días`) únicamente cuando satisface esta condición lógica:

```text
EsBisiesto(Y) = (Y mod 4 = 0) Y [(Y mod 100 ≠ 0) O (Y mod 400 = 0)]
```

Por tanto, `2024` y `2000` son bisiestos, mientras que `1900` y `2100` tienen `365 días` al ser múltiplos de `100` pero no de `400`.

### Medición absoluta frente a descomposición calendario

Un intervalo entre una fecha inicial `F₁` y una fecha final `F₂` se expresa según dos criterios:

- **Días totales exactos:** convierte ambas fechas a su **Número de Día Juliano (JDN)** y calcula `ΔD = JDN(F₂) − JDN(F₁)`. Resulta indispensable para liquidar intereses o estancias.
- **Descomposición `Años / Meses / Días`:** avanza primero años completos desde `F₁`, luego meses completos respetando la duración variable de cada mes y suma los días restantes hasta `F₂`.
- **Días hábiles (`D_hábiles`):** cuenta jornadas laborables (habitualmente de lunes a viernes) y descuenta festivos oficiales:

```text
D_hábiles = Días_Lunes_a_Viernes(F₁, F₂] − Feriados_en_Días_Laborables
```

## Ejemplos resueltos paso a paso

### Caso A: duración exacta atravesando un año bisiesto

Suponga un contrato vigente desde el **15 de enero de 2024** hasta el **10 de marzo de 2025**.

1. **Verificar año bisiesto:** el intervalo cruza febrero de `2024`, año divisible por `4` y no secular, por lo que febrero tuvo `29 días`.
2. **Calcular días totales exactos:**
   ```text
   Del 15/01/2024 al 15/01/2025 (bisiesto) = 366 días
   Resto de enero 2025 (31 − 15)           =  16 días
   Febrero 2025 (año común)                =  28 días
   Marzo 2025 (días 1 al 10)               =  10 días
   Total exacto = 366 + 16 + 28 + 10 = 420 días (60 semanas)
   ```
3. **Descomposición calendario:**
   ```text
   15/01/2024 → 15/01/2025 = 1 año
   15/01/2025 → 15/02/2025 = 1 mes
   15/02/2025 → 10/03/2025 = (28 − 15) + 10 = 23 días
   Resultado: 1 año, 1 mes y 23 días
   ```

### Caso B: proyección de 30 días hábiles

Suponga una notificación emitida el **lunes 2 de marzo de 2026** con un plazo de `30 días hábiles` (de lunes a viernes, contando desde el día siguiente):

1. **Estimar semanas base:** `30 días hábiles / 5 días laborales = 6 semanas` (`42 días calendario` sin festivos).
2. **Verificar avance:** la primera semana (3–6 de marzo) suma `4 días hábiles`; las cinco semanas siguientes (9 de marzo al 10 de abril) suman `25 días` (acumulado: `29`); el día hábil `30` recae el **lunes 13 de abril de 2026** (`42 días calendario`).
3. **Ajuste por festivo:** si el viernes `3 de abril de 2026` es feriado oficial en esa jurisdicción, el vencimiento se traslada al **martes 14 de abril de 2026** (`43 días calendario`).

## Convenciones de conteo de fechas en la práctica profesional

| Convención | Base anual / regla | Uso principal | Tratamiento bisiesto | Particularidad clave |
|---|---|---|---|---|
| `Actual/Actual` | `365` o `366` días reales | Deuda soberana y ámbito civil | Usa `29` días y divisor `366` | Máxima exactitud cronológica |
| Comercial `30/360` | `12` meses de `30` días | Bonos corporativos e hipotecas | Trata febrero con `30` días | Cuotas mensuales uniformes |
| `Actual/365` fijo | Días reales entre `365` | Préstamos comerciales locales | Suma día extra arriba, mantiene `365` | Eleva levemente el interés bisiesto |
| Días hábiles | Lunes a viernes sin festivos | Contratos y logística | Computa si cae entre lunes y viernes | `N` hábiles ≈ `1.4 × N` reales |
| Semanas `ISO 8601` | Lunes a domingo (`W01–W53`) | Industria y planificación | Mantiene semanas de `7` días | La semana 1 incluye el primer jueves |
| Cómputo inclusivo | `(F₂ − F₁) + 1` | Vacaciones y permisos | Suma `1` día completo adicional | Incluye fecha inicial y final |

## Aplicaciones habituales, casos límite y advertencias legales

Al emplear la [Calculadora de Fechas](/es/calculadoras/calculadora-de-fechas) en finanzas, derecho o software, vigile cuatro fuentes de error:

- **Fronteras inclusivas frente a exclusivas:** verifique si su cálculo mide noches transcurridas (`F₂ − F₁`) o jornadas completas incluyendo ambos extremos (`F₂ − F₁ + 1`). Del `1` al `5` de mayo hay `4 noches`, pero `5 días` de cobertura.
- **Asimetría al sumar meses:** sumar `1 mes` al `31 de enero de 2026` produce el `28 de febrero de 2026`, pero restar `1 mes` después devuelve el `28 de enero`, no el `31`. Los sistemas de facturación conservan siempre el día de anclaje original (`31`) en vez de encadenar resultados intermedios.
- **Horario de verano (`DST`):** restar horas locales en lugar de fechas `UTC` provoca desviaciones de `±1 día` en jornadas de `23` o `25 horas` al dividir milisegundos entre `86 400 000`.
- **Plazos legales y administrativos:** la legislación local determina si los plazos fijados por meses vencen de fecha a fecha y si un vencimiento en fin de semana o festivo se prorroga al siguiente día hábil. Confirme siempre el calendario oficial aplicable antes de fijar entregas vinculantes.
