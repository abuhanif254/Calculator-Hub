---
title: "Calculadora de CAGR (Tasa de Crecimiento Anual Compuesta)"
description: "Calcule la tasa de crecimiento anual compuesta (CAGR) de acciones, fondos cotizados o ingresos SaaS. Fórmula paso a paso, ejemplos en euros y comparativas."
faqs:
  - question: "¿Por qué el CAGR es más fiable que la media aritmética de rentabilidades anuales?"
    answer: "La media aritmética ignora el efecto multiplicativo de la capitalización compuesta y sobreestima el rendimiento real cuando existen caídas intermedias. El CAGR refleja exactamente el ritmo anual constante al que habría crecido el capital desde el punto inicial hasta el final."
  - question: "¿Qué ocurre si el valor inicial o el valor final es cero o negativo?"
    answer: "La fórmula estándar del CAGR requiere valores estrictamente positivos tanto al inicio como al cierre. Si una empresa parte de pérdidas operativas o de ingresos nulos, el cociente resulta indefinido o matemáticamente inválido, por lo que deben emplearse métricas de variación absoluta."
  - question: "¿El CAGR tiene en cuenta la volatilidad intermedia de una cartera?"
    answer: "No. El CAGR suaviza la trayectoria entre el primer y el último dato como si el crecimiento hubiera sido uniforme cada año. Por ello, dos carteras con el mismo CAGR pueden haber sufrido caídas máximas muy distintas durante el periodo."
  - question: "¿Cómo se aplica el CAGR a los ingresos recurrentes anuales (ARR) de un negocio SaaS?"
    answer: "En empresas de software como servicio, el CAGR del ARR mide la velocidad sostenida de expansión comercial entre ejercicios cerrados, eliminando distorsiones estacionales y facilitando la comparación entre empresas de distinto tamaño."
  - question: "¿Pueden calcularse tasas compuestas para periodos inferiores a un año o no enteros?"
    answer: "Sí. Basta con expresar el parámetro temporal en fracción de año, por ejemplo 2,5 años para treinta meses. Sin embargo, anualizar tramos muy cortos de pocos meses suele proyectar crecimientos poco representativos a largo plazo."
---

La **Tasa de Crecimiento Anual Compuesta (CAGR)** mide el ritmo promedio geométrico al que crece una inversión, una cartera de valores o una magnitud empresarial cada año durante un periodo superior a un ejercicio, asumiendo que todos los rendimientos intermedios se reinvierten de forma continua. A diferencia de la rentabilidad media simple, este indicador captura con exactitud el efecto del interés compuesto.

Esta herramienta permite calcular el CAGR a partir del valor inicial, el valor final y el horizonte en años. Es el estándar de referencia utilizado por gestores de fondos cotizados (ETF), analistas bursátiles y directivos de empresas de software como servicio (SaaS) para evaluar la progresión real de carteras y de ingresos recurrentes anuales (ARR).

## Fórmula matemática, variables y metodología financiera

La expresión matemática de la tasa de crecimiento anual compuesta se obtiene despejando la tasa constante de la ecuación de capitalización compuesta:

`CAGR = (Valor Final ÷ Valor Inicial)^(1 ÷ n) − 1`

Para expresar el resultado en porcentaje basta con multiplicar el valor obtenido por `100`. Sus tres componentes son:

- **Valor Inicial (`V₀`):** Capital invertido al comienzo del periodo o métrica base en el año cero (por ejemplo, patrimonio de partida o facturación recurrente inicial).
- **Valor Final (`Vₙ`):** Valor total alcanzado al término del periodo, incluyendo dividendos o rendimientos reinvertidos si se evalúa el retorno total.
- **Número de periodos (`n`):** Duración exacta medida en años entre ambas observaciones. Si se analizan datos de cierre anual desde 2021 hasta 2026, existen `5` intervalos anuales (`2026 − 2021 = 5`).

En los informes financieros auditados y folletos informativos supervisados por organismos como la CNMV en España o la ESMA en la Unión Europea, la rentabilidad histórica a medio y largo plazo se presenta mediante tasas anualizadas compuestas (CAGR o TAE equivalente), ya que la media aritmética induce a sobrevalorar la acumulación real cuando la serie presenta volatilidad.

## Ejemplo práctico paso a paso en euros

Considere dos casos habituales en el análisis financiero y corporativo: la expansión de los ingresos recurrentes anuales (ARR) de una empresa tecnológica europea y la evolución de una cartera bursátil expuesta a fluctuaciones intermedias.

**Caso 1: Expansión de ARR en una empresa SaaS.** Suponga que una compañía de software B2B cierra el ejercicio 2020 con un ARR de `100.000 €` y alcanza `248.832 €` al cierre de 2025 (`n = 5` años):

1. **Cociente entre valor final e inicial:** `248.832 € ÷ 100.000 € = 2,48832`.
2. **Exponente de anualización:** `1 ÷ 5 = 0,20`.
3. **Cálculo de la raíz quinta:** `(2,48832)^0,20 = 1,20`.
4. **Conversión a tasa porcentual:** `(1,20 − 1) × 100 = 20,00 %` de CAGR anual.

**Caso 2: Efecto de la volatilidad en una cartera de acciones o ETF.** Imagine una inversión inicial de `10.000 €` que sube un `+25 %` durante el primer año (alcanzando `12.500 €`) y cae un `−20 %` en el segundo año (regresando exactamente a `10.000 €`).

- **Media aritmética engañosa:** `(+25 % − 20 %) ÷ 2 = +2,50 %` anual aparente.
- **CAGR real:** `(10.000 € ÷ 10.000 €)^(1 ÷ 2) − 1 = (1)^0,5 − 1 = 0,00 %` anual.

El CAGR demuestra sin ambigüedad que la cartera no generó ganancia acumulada alguna tras dos años, pese a mostrar una media aritmética positiva.

## Referencias de crecimiento compuesto según horizonte y activo

La tabla siguiente compara distintos perfiles de crecimiento compuesto durante un horizonte de cinco años tomando como referencia una base inicial común de `50.000 €`:

| Perfil analizado | Base inicial | Valor a 5 años | Múltiplo | CAGR | Lectura financiera |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Liquidez conservadora | 50.000 € | 56.570 € | 1,13x | 2,50 % | Cobertura parcial de inflación |
| Cartera mixta defensiva | 50.000 € | 66.911 € | 1,34x | 6,00 % | Crecimiento con baja volatilidad |
| ETF global diversificado | 50.000 € | 76.931 € | 1,54x | 9,00 % | Media histórica de bolsa amplia |
| Cartera de crecimiento | 50.000 € | 96.271 € | 1,93x | 14,00 % | Exige alta tolerancia al riesgo |
| SaaS consolidado (ARR) | 50.000 € | 124.416 € | 2,49x | 20,00 % | Expansión sólida en etapa madura |
| Tecnológica en hipercrecimiento | 50.000 € | 268.912 € | 5,38x | 40,00 % | Difícil de sostener a largo plazo |

Observe cómo duplicar la tasa compuesta anual del `9,00 %` al `20,00 %` no duplica el capital final en cinco años, sino que eleva la ganancia neta acumulada de `26.931 €` a `74.416 €` gracias al efecto exponencial continuo del interés compuesto sobre los rendimientos ya consolidados en cada ejercicio.

## Limitaciones del indicador, errores habituales y consideraciones fiscales

Aunque el CAGR es insustituible para resumir trayectorias plurianuales, su uso aislado conlleva riesgos analíticos que conviene vigilar:

- **Ignorar los flujos de caja intermedios:** El cálculo básico presupone que no hubo aportaciones ni retiradas adicionales entre la fecha inicial y la final. Si un inversor realiza aportaciones mensuales periódicas a un ETF, el indicador adecuado para medir su desempeño personal es la Tasa Interna de Retorno (TIR o rendimiento ponderado por el dinero), no el CAGR simple.
- **Enmascarar el riesgo de trayectoria:** Un fondo con un CAGR del `10 %` puede haber perdido un `45 %` en un ejercicio intermedio antes de recuperarse. Evaluar únicamente el CAGR sin revisar la volatilidad anualizada o la caída máxima puede llevar a asumir más riesgo del tolerable.
- **Efecto de la fecha de corte:** Seleccionar el inicio justo tras un mínimo de mercado o el cierre en un pico eufórico altera artificialmente el resultado. Conviene contrastar ventanas móviles de cinco o diez años.
- **Tributación e inflación:** El CAGR bruto calculado sobre precios de mercado no descuenta la erosión del poder adquisitivo ni los impuestos devengados al reembolsar fondos o percibir dividendos, que en España tributan en la base del ahorro del IRPF y reducen la tasa compuesta neta disponible.

*Aviso informativo: los cálculos, tablas y supuestos expuestos tienen carácter estrictamente educativo y no suponen recomendación de compra o venta de activos ni asesoramiento financiero o tributario.*
