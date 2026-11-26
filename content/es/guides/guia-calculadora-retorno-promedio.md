---
title: "Retorno Promedio Explicado: Cómo Medir su Inversión"
description: "Aprenda la diferencia matemática entre el retorno aritmético y el geométrico (TCAC), el impacto del arrastre por volatilidad y cómo medir el rendimiento real de su cartera."
category: "Finance"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "average-return-calculator"
relatedType: "calculator"
faqs:
  - question: "¿Por qué la media aritmética suele sobreestimar la rentabilidad real de una inversión?"
    answer: "La media aritmética suma los rendimientos de cada período y los divide por el número total de años, ignorando el efecto del interés compuesto y la asimetría matemática entre pérdidas y ganancias. Debido a que una caída del 50 % requiere una subida del 100 % para recuperar el capital inicial, el promedio simple siempre supera o iguala al rendimiento compuesto real."
  - question: "¿Cuándo conviene utilizar el retorno geométrico frente al retorno ponderado por dinero?"
    answer: "El retorno geométrico o Tasa de Crecimiento Anual Compuesto (TCAC) mide el rendimiento intrínseco de un activo o gestor sin distorsiones por depósitos o retiros externos. En cambio, la Tasa Interna de Retorno (TIR) o retorno ponderado por dinero resulta más adecuada para evaluar la experiencia real de un inversor que realiza aportaciones periódicas o retiros irregulares."
  - question: "¿Cómo afecta la volatilidad al retorno compuesto a largo plazo?"
    answer: "La volatilidad reduce el rendimiento compuesto mediante un fenómeno conocido como arrastre de la varianza. Incluso cuando dos inversiones comparten el mismo retorno aritmético promedio, la que presenta mayor dispersión en sus resultados anuales acumulará menos capital al final del horizonte temporal."
  - question: "¿Es posible que el retorno promedio sea positivo mientras la cartera pierde dinero?"
    answer: "Sí. Si un capital de $10,000 sube un 60 % el primer año hasta $16,000 y cae un 40 % el segundo año hasta $9,600, el promedio aritmético anual será +10 %, pero el inversor habrá sufrido una pérdida acumulada del 4 % y un retorno geométrico anualizado de −2.02 %."
  - question: "¿Qué datos necesita para utilizar la calculadora de retorno promedio?"
    answer: "Para obtener la Tasa de Crecimiento Anual Compuesto basta con conocer el valor inicial invertido, el saldo final acumulado y el número exacto de años transcurridos. Si desea comparar la media aritmética frente a la geométrica o analizar series con flujos irregulares, también puede ingresar la secuencia de rentabilidades porcentuales de cada período."
---

El rendimiento de una inversión no puede evaluarse mediante una simple suma y división de variaciones anuales. Si una cartera sube un 50 % en el primer año y retrocede un 50 % en el segundo, su promedio aritmético arroja un engañoso 0 %; sin embargo, $10,000 iniciales ascienden primero a $15,000 y caen luego a $7,500, lo que supone una pérdida efectiva del 25 %. Para medir la velocidad real a la que crece o se contrae un patrimonio bajo capitalización compuesta, la métrica adecuada es la media geométrica o Tasa de Crecimiento Anual Compuesto (TCAC).

Nuestra [Calculadora de Retorno Promedio](/es/calculadoras/calculadora-rendimiento-promedio) contrasta de forma inmediata la media simple con el rendimiento anualizado compuesto a partir de saldos iniciales y finales o de series históricas. Comprender la brecha entre ambos indicadores evita decisiones basadas en cifras infladas y permite comparar fondos, acciones o carteras sobre una base homogénea.

## Metodología y Fórmulas Fundamentales

En análisis financiero existen dos métodos principales para resumir una serie de rendimientos periódicos `R_1, R_2, ..., R_n` expresados en forma decimal (por ejemplo, `0.12` para +12 %).

### Media Aritmética Simple

La media aritmética representa el rendimiento esperado de un único período elegido al azar, asumiendo que el capital base se reinicia cada ejercicio sin acumulación compuesta:

```text
R_aritmético = (R_1 + R_2 + ... + R_n) / n
```

Donde `n` es el número total de períodos (habitualmente años). Aunque sirve para estimar el resultado de un solo período futuro bajo independencia estadística, sobreestima sistemáticamente el crecimiento plurianual cuando existe volatilidad.

### Media Geométrica y TCAC

La media geométrica encadena multiplicativamente los factores de crecimiento `(1 + R_i)` y extrae la raíz enésima del producto resultante:

```text
R_geométrico = [(1 + R_1) × (1 + R_2) × ... × (1 + R_n)]^(1 / n) − 1
```

Cuando solo se conoce el capital inicial `V_inicial`, el capital final `V_final` (sin aportaciones ni retiros intermedios) y la duración `n` en años, la fórmula se simplifica a:

```text
TCAC = (V_final / V_inicial)^(1 / n) − 1
```

### El Arrastre de la Varianza

La brecha entre ambos promedios depende directamente de la varianza (`σ²`) de los rendimientos periódicos. Para variaciones moderadas, la relación aproximada es:

```text
R_geométrico ≈ R_aritmético − (σ² / 2)
```

Cuanto mayor es la dispersión anual de una cartera, mayor es la penalización sobre su crecimiento compuesto efectivo. Reducir caídas severas protege el patrimonio acumulado con más eficacia que perseguir picos puntuales de rentabilidad.

## Ejemplo Numérico Paso a Paso

Suponga que invierte $10,000 durante cinco años consecutivos sin aportaciones adicionales ni retiros. Los rendimientos anuales observados son: Año 1: +25 %, Año 2: −20 %, Año 3: +15 %, Año 4: +10 % y Año 5: −10 %.

1. **Promedio aritmético:** Sume las cinco tasas y divida entre 5:
   `(+25 % − 20 % + 15 % + 10 % − 10 %) / 5 = +20 % / 5 = 4.00 % anual`.
2. **Evolución real del capital:** Multiplique el saldo de cada año por `(1 + R_i)`:
   - Año 1: `$10,000.00 × 1.25 = $12,500.00`
   - Año 2: `$12,500.00 × 0.80 = $10,000.00`
   - Año 3: `$10,000.00 × 1.15 = $11,500.00`
   - Año 4: `$11,500.00 × 1.10 = $12,650.00`
   - Año 5: `$12,650.00 × 0.90 = $11,385.00`
3. **Rentabilidad acumulada total:** `($11,385.00 − $10,000.00) / $10,000.00 = +13.85 %`.
4. **Retorno geométrico (TCAC):**
   `TCAC = ($11,385.00 / $10,000.00)^(1 / 5) − 1 = (1.1385)^0.20 − 1 = 2.63 % anual`.
5. **Verificación por varianza:** Con una varianza poblacional `σ² = 0.0274`, la aproximación arroja `0.0400 − (0.0274 / 2) = 0.0263` (`2.63 %`).

El promedio simple sugiere un 4.00 % anual, pero el patrimonio creció realmente al 2.63 % compuesto anual.

## Comparativa de Escenarios y Volatilidad

La tabla compara la evolución de $10,000 en dos años bajo distintos niveles de oscilación:

| Escenario | Año 1 | Año 2 | Aritmético | Geométrico (TCAC) | Saldo Final | Brecha |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| Estabilidad | +5.00 % | +5.00 % | +5.00 % | +5.00 % | $11,025.00 | 0.00 pts |
| Oscilación baja | +15.00 % | −5.00 % | +5.00 % | +4.52 % | $10,925.00 | −0.48 pts |
| Volatilidad alta | +30.00 % | −20.00 % | +5.00 % | +1.98 % | $10,400.00 | −3.02 pts |
| Simetría engañosa | +50.00 % | −50.00 % | 0.00 % | −13.40 % | $7,500.00 | −13.40 pts |
| Pérdida asimétrica | −40.00 % | +40.00 % | 0.00 % | −8.35 % | $8,400.00 | −8.35 pts |
| Recuperación exacta | +100.00 % | −50.00 % | +25.00 % | 0.00 % | $10,000.00 | −25.00 pts |

Los tres primeros escenarios comparten un idéntico promedio aritmético de +5.00 %, pero terminan separados por $625.00 debido únicamente a la amplitud de las fluctuaciones.

## Aplicaciones Prácticas, Errores Comunes y Criterios Regulatorios

El retorno geométrico puro mide la rentabilidad ponderada en el tiempo (TWR), estándar exigido por las normas internacionales GIPS para evaluar a gestores de fondos porque aísla su desempeño de los depósitos o retiros del cliente. Si usted realiza aportaciones mensuales (como en un plan de jubilación) o retiros antes de una caída, su experiencia personal debe medirse mediante la Tasa Interna de Retorno (TIR) o retorno ponderado por dinero (MWR).

Evite también tres errores habituales: confundir rentabilidad nominal con real (un 6.00 % nominal con 3.50 % de inflación equivale a `(1.06 / 1.035) − 1 = 2.42 %` real compuesto), omitir comisiones de gestión y retenciones fiscales sobre dividendos, y anualizar rendimientos mensuales excepcionales proyectando resultados no recurrentes a doce meses. Las entidades reguladas exigen reportar rentabilidades anualizadas netas de gastos corrientes cuando el historial supera el año; apoyarse en la media geométrica le garantiza una auditoría objetiva de cualquier inversión.
