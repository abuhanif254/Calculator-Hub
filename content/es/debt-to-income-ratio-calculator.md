---
title: "Calculadora de Relación Deuda-Ingreso"
metaTitle: "Calculadora de Relación Deuda-Ingreso | Ratio DTI y 28/36"
description: "Calcula tu relación deuda-ingreso (DTI) mensual, evalúa tu tasa de esfuerzo financiero según la regla 28/36 y descubre cómo mejorar tu solvencia hipotecaria."
metaDescription: "Calcula tu relación deuda-ingreso (DTI) y tasa de esfuerzo financiero al instante. Comprueba si cumples la regla 28/36 para tu hipoteca o préstamo."
metaKeywords: "calculadora relación deuda ingreso, calculadora dti, calcular dti, tasa de esfuerzo financiero, límite dti hipoteca, regla 28/36, capacidad de endeudamiento"
faqs:
  - question: "¿Qué es la relación deuda-ingreso (DTI) o tasa de esfuerzo financiero?"
    answer: "La relación deuda-ingreso (DTI, por sus siglas internacionales) mide qué porcentaje de tus ingresos brutos mensuales se destina al pago obligatorio de cuotas de deuda, incluyendo vivienda, préstamos personales, vehículos y pagos mínimos de tarjetas. Es el indicador central que utilizan los bancos para evaluar tu capacidad de pago antes de aprobar una hipoteca o crédito."
  - question: "¿Qué porcentaje de DTI exigen los bancos para aprobar una hipoteca?"
    answer: "En Europa y Latinoamérica, entidades y supervisores como el Banco de España recomiendan no superar el 30 % al 35 % de endeudamiento sobre los ingresos disponibles, mientras que el estándar hipotecario internacional sitúa la zona óptima en el 36 % o menos sobre ingresos brutos. Superar el 43 % eleva notablemente el riesgo de denegación o exige mayores garantías y aportación inicial."
  - question: "¿Qué diferencia existe entre el ratio de vivienda y el ratio de endeudamiento total?"
    answer: "El ratio de vivienda compara únicamente el gasto mensual de vivienda —cuota hipotecaria o alquiler más impuestos sobre la propiedad, seguros obligatorios y comunidad— frente al ingreso bruto mensual. El ratio de endeudamiento total suma además todas las restantes deudas contractuales (coche, tarjetas de crédito, préstamos de estudios y personales) y suele ser el criterio determinante de aprobación."
  - question: "¿Deben incluirse gastos como alimentación, luz o suscripciones en el cálculo del DTI?"
    answer: "No. El cálculo bancario del DTI solo incluye obligaciones financieras contractuales y pagos recurrentes de deuda que figuren en informes crediticios o sentencias, como préstamos, tarjetas y pensiones alimenticias. Los gastos cotidianos de consumo —supermercado, electricidad, telefonía, transporte o ocio— quedan fuera de la fórmula, aunque sí condicionan tu liquidez real."
  - question: "¿Cuál es la estrategia más rápida para reducir el DTI antes de solicitar una hipoteca?"
    answer: "Liquidar por completo deudas pequeñas con cuota mínima relativamente alta, como saldos de tarjetas de crédito o préstamos al consumo próximos a vencer, elimina de inmediato esa cuota del numerador y rebaja el DTI mucho más rápido que amortizar una fracción equivalente en un crédito grande cuya cuota mensual permanece intacta."
---

Al solicitar una hipoteca, la financiación de un vehículo o un préstamo personal, el departamento de riesgos bancarios evalúa tu solvencia con una métrica determinante: la **relación deuda-ingreso (DTI)**, denominada también en España y Latinoamérica **tasa de esfuerzo financiero** o **ratio de endeudamiento**. Incluso con un historial crediticio sin retrasos, comprometer una fracción excesiva del ingreso mensual eleva el riesgo de impago ante cualquier imprevisto.

Esta **Calculadora de Relación Deuda-Ingreso** replica el filtro cuantitativo de las entidades financieras. Al registrar tus ingresos brutos mensuales —nóminas, pagas prorrateadas o rentas declaradas— y tus cuotas recurrentes de deuda en `EUR €` o `USD $`, calcula al instante tu porcentaje de endeudamiento, tu ingreso remanente y el nivel de riesgo de tu perfil.

## Ecuaciones del Ratio DTI, Regla 28/36 y Capacidad Disponible

### 1. Relación Deuda-Ingreso Global y Ratio de Vivienda

Sean $D_1, D_2, \dots, D_k$ las cuotas mensuales contractuales de deuda (hipoteca o alquiler, préstamo de coche, pagos mínimos de tarjetas, créditos personales, préstamos de estudios y pensiones alimenticias), $H$ el costo mensual de vivienda (cuota hipotecaria o alquiler más impuestos inmobiliarios y seguros obligatorios) e $Y_1, Y_2, \dots, Y_m$ los ingresos brutos mensuales demostrables:

$$\text{DTI}_{\text{total}} = \frac{\sum_{i=1}^{k} D_i}{\sum_{j=1}^{m} Y_j} \times 100\,\%, \qquad \text{DTI}_{\text{vivienda}} = \frac{H}{\sum_{j=1}^{m} Y_j} \times 100\,\%$$

### 2. Regla 28/36 y Margen de Endeudamiento Disponible

La **regla 28/36** fija un estándar prudencial reconocido: la vivienda no debe superar el **28 %** del ingreso bruto mensual ($\text{DTI}_{\text{vivienda}} \le 28\,\%$) y el total de deudas no debe exceder el **36 %** ($\text{DTI}_{\text{total}} \le 36\,\%$). En España y Europa, la banca aplica además un criterio paralelo del **30 % al 35 %** sobre ingresos netos. Para un límite bancario $L$ (en decimal, como `0,35` o `0,36`), la capacidad mensual adicional $C_{\text{disponible}}$ es:

$$C_{\text{disponible}} = \left(L \cdot \sum_{j=1}^{m} Y_j\right) - \sum_{i=1}^{k} D_i$$

Donde:

* **$D_i$:** cada cuota mensual mínima contractual (nunca el saldo total pendiente).
* **$H$:** desembolso mensual completo de vivienda principal (cuota, impuestos y seguros obligatorios).
* **$Y_j$:** cada fuente de ingreso bruto mensual verificable mediante nóminas, declaración fiscal o contratos.
* **$L$ y $C_{\text{disponible}}$:** techo de endeudamiento admitido por la entidad y margen disponible para nuevas cuotas.

## Ejemplo Práctico Paso a Paso: Hogar con 4.200 € de Ingresos Brutos

Supongamos dos titulares con **$Y = 4.200\text{ €}$** de ingresos brutos mensuales (`2.400 €` + `1.800 €`) que analizan una compra de vivienda con estas obligaciones mensuales:

* Hipoteca proyectada con impuestos y seguro obligatorio ($H$): **`1.050 €`**
* Préstamo de automóvil: **`340 €`**
* Pagos mínimos en dos tarjetas de crédito (saldo total `2.400 €`): **`180 €`**
* Préstamo personal pendiente: **`194 €`**

Evaluamos paso a paso su solvencia:

1. **Deuda mensual total:** $D = 1.050 + 340 + 180 + 194 = \mathbf{1.764\text{ €}}$.
2. **Ratio de vivienda:**
   $$\text{DTI}_{\text{vivienda}} = \frac{1.050}{4.200} \times 100\,\% = \mathbf{25{,}00\,\%}$$
   Cumple con margen el techo del `28 %`.
3. **Ratio de endeudamiento total:**
   $$\text{DTI}_{\text{total}} = \frac{1.764}{4.200} \times 100\,\% = \mathbf{42{,}00\,\%}$$
   Supera el `36 %` de la regla 28/36 y el `35 %` prudencial bancario, rozando el límite crítico del `43 %`.
4. **Impacto de cancelar tarjetas:** destinar `2.400 €` de ahorro a saldar ambas tarjetas borra `180 €/mes` del numerador. Las cuotas caen a $1.764 - 180 = \mathbf{1.584\text{ €}}$ y el DTI desciende a:
   $$\text{DTI}_{\text{nuevo}} = \frac{1.584}{4.200} \times 100\,\% = \mathbf{37{,}71\,\%}$$
   Una mejora inmediata de **`4,29` puntos porcentuales**. Si además liquidan el préstamo personal de `194 €`, la deuda baja a `1.390 €` y el DTI alcanza **`33,10 %`**, entrando en la franja óptima para negociar mejores condiciones.

## Tabla de Referencia: Tramos de DTI y Criterios Bancarios

| Tramo de DTI Total | Clasificación | Tope con 4.200 € / mes | Tope con 5.000 USD / mes | Evaluación Bancaria y Recomendación |
| :--- | :--- | :--- | :--- | :--- |
| **Hasta 28 %** | Sobresaliente | Hasta 1.176 € | Hasta 1.400 USD | Holgura máxima; acceso a las mejores tasas y plazos |
| **29 % – 35 %** | Óptimo | 1.177 € – 1.470 € | 1.401 – 1.750 USD | Zona saludable recomendada por banca europea y regla 28/36 |
| **36 % – 43 %** | Aceptable / Límite | 1.471 € – 1.806 € | 1.751 – 2.150 USD | Aprobable con ahorro y buen historial; menor margen de seguridad |
| **44 % – 49 %** | Riesgo elevado | 1.807 € – 2.058 € | 2.151 – 2.450 USD | Alta probabilidad de denegación salvo avales o mayor entrada |
| **50 % o más** | Crítico | Desde 2.100 € | Desde 2.500 USD | Sobreendeudamiento severo; sanear deudas antes de financiar |

Un **DTI del 43 %** sobre ingresos brutos suele consumir entre el **55 % y el 62 % del salario neto disponible** tras impuestos y cotizaciones, dejando escaso colchón frente a imprevistos o inflación.

## Errores Habituales al Calcular y Gestionar el DTI

* **Mezclar ingresos brutos y netos sin confirmar el criterio bancario:** la regla 28/36 opera sobre ingresos brutos, pero numerosos bancos españoles y latinoamericanos miden la tasa de esfuerzo sobre el neto; verifica la base exacta de tu entidad.
* **Ingresar el saldo total de la tarjeta en lugar del pago mínimo:** el DTI evalúa flujo mensual comprometido, no el capital total adeudado.
* **Contraer nuevas cuotas durante el estudio hipotecario:** financiar muebles o un coche antes de escriturar eleva el DTI y puede provocar un rechazo de última hora.
* **Amortizar parcialmente deudas grandes en vez de extinguir cuotas pequeñas:** aportar `2.400 €` a una hipoteca apenas altera su cuota mensual, mientras que cancelar tarjetas pequeñas elimina sus pagos mínimos y reduce el DTI al instante.
