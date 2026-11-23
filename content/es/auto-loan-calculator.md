---
title: "Calculadora de Préstamo de Auto"
description: "Calcula la cuota mensual de tu préstamo automotriz, el interés total acumulado y el impacto del enganche o valor de retoma en el costo real del vehículo."
metaTitle: "Calculadora de Préstamo de Auto | Cuota Mensual e Intereses"
metaDescription: "Calcula la cuota mensual de tu préstamo de auto, el costo total con intereses y el cuadro de amortización según plazo, enganche, impuestos y tasa TAE."
metaKeywords: "préstamo de auto, calculadora de préstamo automotriz, cuota mensual de automóvil, financiamiento de vehículos, tasa de interés auto, enganche y plazo"
faqs:
  - question: "¿Qué porcentaje de enganche o entrada se recomienda al financiar un automóvil?"
    answer: "Los planificadores financieros recomiendan aportar al menos un 20 % del precio del vehículo nuevo como enganche (o un 10 % en vehículos seminuevos). Este pago inicial absorbe la fuerte depreciación del primer año y evita que el saldo de la deuda supere el valor comercial del coche."
  - question: "¿Por qué la TAE o el CAT es más relevante que el tipo de interés nominal (TIN) en un crédito automotriz?"
    answer: "El TIN solo refleja el interés puro aplicado al capital prestado, mientras que la Tasa Anual Equivalente (TAE en España) o el Costo Anual Total (CAT en Latinoamérica) incluye comisiones de apertura, gastos de estudio y seguros obligatorios vinculados, mostrando el costo financiero real de la operación."
  - question: "¿Qué conviene más en el concesionario: un bono de descuento en el precio o financiamiento al 0 %?"
    answer: "Depende del capital financiado y de la tasa bancaria alternativa. Si puedes obtener un crédito externo a una tasa moderada, aplicar un bono de descuento directo de $2.500 o $3.000 sobre el precio de compra suele reducir más el desembolso total que financiar el precio de lista completo al 0 %."
  - question: "¿Qué significa tener un préstamo de auto con capital negativo o deuda bajo el agua?"
    answer: "Ocurre cuando el saldo pendiente de pago del préstamo es mayor que el valor de mercado actual del vehículo. Es muy frecuente en créditos a 72 u 84 meses con poco enganche, y supone un riesgo financiero grave si el vehículo sufre un siniestro total o necesitas venderlo antes de tiempo."
  - question: "¿Cómo reduce el valor del vehículo entregado a cuenta los impuestos de compra?"
    answer: "En numerosas jurisdicciones fiscales, entregar tu vehículo usado como parte de pago en el mismo contrato reduce la base imponible: el impuesto sobre las ventas solo se calcula sobre la diferencia neta entre el precio del automóvil nuevo y el valor tasado del vehículo entregado."
---

Financiar la compra de un vehículo exige analizar mucho más que la cuota mensual publicitada por el concesionario. La estructura de un crédito automotriz combina el precio negociado de la unidad, el enganche o entrada inicial, la tasación de un vehículo entregado a cuenta, los impuestos de matriculación y la tasa de interés efectiva a lo largo del plazo elegido. Esta calculadora determina tu pago mensual exacto, el desembolso total por intereses y el costo real del automóvil para que compares ofertas bancarias y de financieras de marca con total transparencia.

## Fórmula del Préstamo Automotriz y Capital Financiado

El cálculo de un préstamo para automóvil se divide en dos etapas matemáticas: la determinación del principal neto a financiar y la aplicación de la fórmula de anualidad vencida de cuota fija (sistema de amortización francés).

En primer lugar, el capital neto del préstamo ($P$) se obtiene sumando al precio acordado del vehículo los impuestos y cargos no abonados al contado, y descontando las aportaciones iniciales del comprador:

$$P = V_{\text{auto}} + G_{\text{imp}} + C_{\text{apertura}} - E - V_{\text{retoma}}$$

Una vez fijado el principal $P$, la cuota mensual constante ($M$) se calcula mediante la ecuación:

$$M = P \times \frac{r(1 + r)^n}{(1 + r)^n - 1}$$

Donde las variables representan:

*   **$M$ (Cuota mensual fija):** El importe de capital más intereses que pagarás cada mes durante toda la vigencia del préstamo.
*   **$P$ (Capital neto financiado):** La cantidad exacta de dinero que tomas prestada tras deducir el enganche ($E$) y el valor neto del vehículo entregado a cuenta ($V_{\text{retoma}}$), e incorporar impuestos ($G_{\text{imp}}$) y comisiones financiadas ($C_{\text{apertura}}$).
*   **$r$ (Tasa de interés mensual en tanto por uno):** El tipo nominal anual dividido entre doce meses y entre cien ($r = \frac{\text{TIN anual}}{12 \times 100}$).
*   **$n$ (Plazo total en meses):** El número de cuotas mensuales del contrato (habitualmente $36$, $48$, $60$, $72$ u $84$ meses).

El **interés total pagado** ($I_{\text{total}}$) y el **costo total del vehículo** ($C_{\text{total}}$) se deducen directamente de la cuota mensual:

$$I_{\text{total}} = (M \times n) - P$$

$$C_{\text{total}} = (M \times n) + E + V_{\text{retoma}}$$

## Ejemplo Práctico Resuelto Paso a Paso

Supongamos que deseas adquirir un automóvil cuyo precio negociado es de $\$28.000$. Los impuestos, placas y derechos de registro suman $\$2.000$, elevando el precio puesto en calle a $\$30.000$. Cuentas con un enganche en efectivo de $\$6.000$ y solicitas financiar el resto a una tasa de interés anual del $6,00\%$ durante un plazo de $60$ meses (5 años).

1.  **Determinar el capital neto a financiar ($P$):**
    $$P = \$28.000 + \$2.000 - \$6.000 = \$24.000$$
2.  **Convertir la tasa anual a tasa mensual ($r$):**
    $$r = \frac{6,00}{12 \times 100} = 0,005\text{ mensual}$$
3.  **Calcular el factor de capitalización compuesta para $n = 60$ meses:**
    $$(1 + r)^{60} = (1,005)^{60} \approx 1,34885015$$
4.  **Sustituir los valores en la fórmula de la cuota mensual ($M$):**
    $$M = \$24.000 \times \frac{0,005 \times 1,34885015}{1,34885015 - 1} = \$24.000 \times 0,01933280 = \$463,99\text{ al mes}$$
5.  **Calcular el total de intereses y el costo final del vehículo:**
    *   **Total de cuotas pagadas al banco:** $\$463,99 \times 60 = \$27.839,40$.
    *   **Interés total acumulado ($I_{\text{total}}$):** $\$27.839,40 - \$24.000,00 = \$3.839,40$.
    *   **Costo real total del automóvil ($C_{\text{total}}$):** $\$27.839,40 + \$6.000,00\text{ (enganche)} = \$33.839,40$.

## Impacto del Plazo en el Costo Total del Préstamo

Extender el plazo del financiamiento reduce la cuota mensual, pero encarece notablemente el crédito y ralentiza la amortización del capital. La siguiente tabla compara el mismo préstamo de **$\$24.000$ al $6,00\%$ anual** en cinco plazos habituales del mercado automotriz:

| Plazo ($n$) | Cuota Mensual ($M$) | Interés Total ($I_{\text{total}}$) | Total en Cuotas | Sobrecosto sobre Capital |
| :--- | :--- | :--- | :--- | :--- |
| **36 meses** (3 años) | $\$730,13$ | $\$2.284,68$ | $\$26.284,68$ | $9,52\%$ |
| **48 meses** (4 años) | $\$563,64$ | $\$3.054,72$ | $\$27.054,72$ | $12,73\%$ |
| **60 meses** (5 años) | $\$463,99$ | $\$3.839,40$ | $\$27.839,40$ | $16,00\%$ |
| **72 meses** (6 años) | $\$397,75$ | $\$4.638,00$ | $\$28.638,00$ | $19,33\%$ |
| **84 meses** (7 años) | $\$350,61$ | $\$5.451,24$ | $\$29.451,24$ | $22,71\%$ |

Como demuestra la comparativa, pasar de $48$ a $84$ meses rebaja la cuota mensual en $\$213,03$, pero obliga a pagar **$\$2.396,52$ adicionales en intereses puros** y mantiene el vehículo gravado durante tres años más.

## Estrategias Financieras y Errores que Debes Evitar

### La Regla 20/4/10 para Comprar un Automóvil
Para evitar que el préstamo comprometa tu liquidez familiar, aplica el estándar de planificación **20/4/10**:
*   **20 % de enganche mínimo:** Cubre la caída inmediata de valor que sufre el vehículo al salir del concesionario.
*   **4 años (48 meses) de plazo máximo:** Evita seguir pagando cuotas bancarias cuando el automóvil ya requiera reparaciones mecánicas mayores fuera de garantía.
*   **10 % de tus ingresos brutos mensuales:** La suma de la cuota del préstamo, el seguro a todo riesgo y los impuestos de circulación no debe superar el diez por ciento de tu sueldo mensual.

### El Peligro de Negociar solo la Cuota Mensual
Uno de los errores más costosos en el concesionario consiste en negociar únicamente el pago mensual. Si fijas como único objetivo una cuota de $\$350$, el vendedor puede mantener el precio de lista sin descuento, añadir garantías extendidas innecesarias y estirar el préstamo a $84$ meses. **Negocia siempre primero el precio total al contado del automóvil**, luego pacta por separado el valor de tu coche usado y, finalmente, compara las condiciones de financiamiento.

### Depreciación Acelerada y Seguro de Brecha Patrimonial
Un automóvil nuevo pierde entre un $15\%$ y un $25\%$ de su valor comercial durante los primeros doce meses. Si financias el $90\%$ o el $100\%$ del vehículo a $72$ meses, durante los primeros tres años deberás al banco más dinero del que vale el coche. En caso de robo o pérdida total por accidente, la aseguradora ordinaria solo indemnizará el valor comercial del momento, dejándote una deuda residual sin vehículo; si optas por un enganche bajo, contrata una póliza de cobertura de brecha patrimonial o realiza abonos extraordinarios a capital durante el primer año.
