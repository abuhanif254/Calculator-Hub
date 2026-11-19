---
title: "Calculadora de HELOC"
metaTitle: "Calculadora de HELOC: Línea de Crédito Hipotecaria y Cuotas"
description: "Calcule el crédito disponible (CLTV) y los pagos mensuales de su línea de crédito con garantía hipotecaria durante la fase de disposición y amortización."
metaDescription: "Simule su línea de crédito hipotecaria (HELOC): calcule el capital máximo disponible según el CLTV y compare las cuotas de disposición y reembolso."
metaKeywords: "calculadora de heloc, linea de credito con garantia hipotecaria, cltv hipoteca, periodo de disposicion y reembolso, extraer capital de vivienda, home equity line of credit español"
faqs:
  - question: "¿Por qué sube bruscamente la cuota mensual cuando termina el periodo de disposición de un HELOC?"
    answer: "Durante el periodo inicial de disposición (normalmente de 5 a 10 años), la mayoría de los contratos HELOC exigen pagar únicamente los intereses mensuales sobre el saldo utilizado, sin reducir el principal. Al cerrarse esa ventana y comenzar el periodo de reembolso (10 a 20 años), la deuda acumulada pasa a amortizarse mediante cuotas completas de capital más intereses, generando un incremento inmediato del 35 % al 60 % en el recibo mensual."
  - question: "¿Cómo calcula el banco cuánto dinero puedo extraer de mi vivienda mediante un HELOC?"
    answer: "Las entidades aplican el límite de Relación Préstamo-Valor Combinada (CLTV, por sus siglas en inglés), que suele situarse entre el 80 % y el 85 % del valor de tasación actual del inmueble. A ese importe máximo permitido se le resta el saldo pendiente de su primera hipoteca; la diferencia resultante es el cupo máximo de su línea de crédito."
  - question: "¿Pago intereses sobre el límite total aprobado en el HELOC o solo sobre lo que gasto?"
    answer: "Únicamente devenga intereses el capital que haya transferido o utilizado efectivamente (saldo dispuesto), no el límite total concedido. Si tiene una línea aprobada de $100.000 pero solo retira $25.000 para reformar la cocina, su cuota mensual se calculará exclusivamente sobre esos $25.000, aunque algunos bancos cobran una pequeña comisión anual de mantenimiento."
  - question: "¿Puedo amortizar capital voluntariamente durante la fase de disposición para reducir la deuda?"
    answer: "Sí, y es la estrategia financiera más recomendable. Como se trata de una línea rotativa (revolving), cualquier abono a capital realizado durante el periodo de disposición reduce inmediatamente el saldo sobre el que se calculan los intereses del mes siguiente y vuelve a liberar ese crédito por si necesita reutilizarlo antes de que finalice la etapa de retiro."
  - question: "¿Son deducibles de impuestos los intereses pagados en una línea HELOC?"
    answer: "En jurisdicciones como Estados Unidos (bajo reglas del IRS), los intereses de un HELOC solo son deducibles si los fondos se destinan de forma demostrable a comprar, construir o mejorar sustancialmente la vivienda que sirve de garantía. Si utiliza la línea para consolidar tarjetas de crédito o gastos personales, los intereses pierden el beneficio de deducción fiscal hipotecaria."
---

Una **Línea de Crédito con Garantía Hipotecaria** —conocida internacionalmente por sus siglas **HELOC** (*Home Equity Line of Credit*) y comercializada en España y Latinoamérica como hipoteca abierta o crédito hipotecario rotativo— permite a los propietarios transformar el patrimonio neto acumulado en su inmueble en una línea flexible de liquidez sin vender la propiedad ni cancelar su primera hipoteca.

A diferencia de un préstamo tradicional donde se recibe todo el dinero el primer día, un HELOC opera como una cuenta de crédito rotativa respaldada por la vivienda. Su rasgo crítico es su **estructura en dos etapas**: una fase inicial de disposición (*draw period*) con pagos mínimos de solo intereses, seguida de una fase de reembolso (*repayment period*) en la que se amortiza el capital acumulado.

## Cómo Funciona el Límite de Crédito Hipotecario (CLTV) y el Cálculo de las Dos Fases

Para proyectar con exactitud los pagos de un HELOC, debemos modelar tres ecuaciones encadenadas: la capacidad máxima de endeudamiento sobre el valor del inmueble y las cuotas de cada una de las dos etapas contractuales.

### 1. Cálculo del Cupo Máximo Disponible mediante el CLTV
Los bancos fijan un techo de **Relación Préstamo-Valor Combinada (CLTV, *Combined Loan-to-Value*)**, que suele oscilar entre el $75\%$ y el $85\%$ de la tasación oficial vigente ($V_{\text{tasación}}$). Restando el saldo pendiente de la hipoteca principal ($S_{\text{hipoteca}}$), se obtiene el límite máximo de la línea ($L_{\text{máx}}$):

$$L_{\text{máx}} = \left(V_{\text{tasación}} \times \text{CLTV}_{\text{máx}}\right) - S_{\text{hipoteca}}$$

### 2. Fase 1: Cuota en el Periodo de Disposición (Solo Intereses)
Durante los primeros $5$ a $10\text{ años}$, el titular retira fondos según sus necesidades hasta el límite aprobado. En la modalidad estándar *Interest-Only*, el pago mensual mínimo ($C_{\text{disposición}}$) cubre únicamente los intereses sobre el **saldo dispuesto real ($B$)** al tipo nominal anual vigente ($\text{TIN}$):

$$r = \frac{\text{TIN}}{12}$$

$$C_{\text{disposición}} = B \times r$$

Como esta cuota mínima no amortiza principal, la deuda $B$ permanece intacta salvo que el prestatario realice abonos voluntarios a capital.

### 3. Fase 2: Cuota en el Periodo de Reembolso (Capital + Intereses)
Al concluir la ventana de disposición, la línea se cierra para nuevos retiros y el saldo vivo acumulado ($B$) pasa a amortizarse a lo largo de $n_{\text{reembolso}}$ meses (habitualmente entre $120$ y $240\text{ meses}$):

$$C_{\text{reembolso}} = B \times \frac{r(1 + r)^{n_{\text{reembolso}}}}{(1 + r)^{n_{\text{reembolso}}} - 1}$$

## Ejemplo Numérico Completo: Extracción de Liquidez sobre Vivienda de $400.000

Supongamos que un propietario financia la remodelación integral de su vivienda utilizando su patrimonio inmobiliario bajo estos parámetros:
* **Valor de tasación actual ($V_{\text{tasación}}$):** $\$400.000\text{ USD}$ (o $400.000\text{ €}$).
* **Límite CLTV del banco:** $80\%$.
* **Saldo pendiente de la primera hipoteca ($S_{\text{hipoteca}}$):** $\$220.000$.
* **Saldo dispuesto en el HELOC ($B$):** $\$75.000$.
* **Tipo de Interés Nominal variable ($\text{TIN}$):** $8{,}40\%$ anual ($r = \frac{0{,}084}{12} = 0{,}007$ mensual).
* **Plazos:** $10\text{ años}$ de disposición seguidos de $15\text{ años}$ ($180\text{ meses}$) de reembolso.

### Paso 1: Límite de crédito aprobable
Aplicando el techo del $80\%$ de CLTV:

$$L_{\text{máx}} = (\$400.000 \times 0{,}80) - \$220.000 = \$320.000 - \$220.000 = \$100.000$$

Al utilizar $\$75.000$, el titular mantiene una reserva disponible de $\$25.000$.

### Paso 2: Cuota en los primeros 10 años (Fase de Disposición)
Sobre los $\$75.000$ dispuestos al $0{,}70\%$ mensual:

$$C_{\text{disposición}} = \$75.000 \times 0{,}007 = \$525{,}00\text{ al mes}$$

Si abona solo esta cuota mínima durante los $120\text{ meses}$, habrá pagado $\$63.000$ en intereses y seguirá debiendo los mismos $\$75.000$ al iniciar el año 11.

### Paso 3: Cuota en los 15 años siguientes (Fase de Reembolso)
En el mes 121, el saldo de $\$75.000$ se amortiza en $n = 180\text{ meses}$. Con $(1 + 0{,}007)^{180} \approx 3{,}509955$:

$$C_{\text{reembolso}} = \$75.000 \times \frac{0{,}007 \times 3{,}509955}{3{,}509955 - 1} = \$75.000 \times 0{,}0097889 = \$734{,}17\text{ al mes}$$

Se produce un **salto de cuota inmediato de $+\$209{,}17\text{ al mes}$ ($+39{,}8\%$)** sin que los tipos de mercado hayan subido. En esta segunda fase desembolsará $\$132.150{,}15$ ($\$75.000$ de principal más $\$57.150{,}15$ de intereses).

## HELOC frente a Préstamo sobre Capital (Home Equity Loan) y Refinanciación

Compare la línea rotativa frente a las otras dos alternativas para obtener liquidez hipotecaria:

| Característica | Línea HELOC (Crédito Rotativo) | Home Equity Loan (2.ª Hipoteca Fija) | Cash-Out Refinance (Ampliación 1.ª Hipoteca) |
| :--- | :--- | :--- | :--- |
| **Entrega de Fondos** | Retiros flexibles según necesidad | Suma global única (100 % al inicio) | Suma global al renovar la hipoteca |
| **Tipo de Interés** | Variable (Prime Rate o Euríbor) | Fijo durante toda la vida del préstamo | Fijo o variable (reemplaza al anterior) |
| **Estructura de Cuota** | Dos fases: solo intereses y amortización | Cuota fija constante desde el mes 1 | Cuota única unificada desde el mes 1 |
| **Primera Hipoteca** | Mantiene intacta su hipoteca actual | Mantiene intacta su hipoteca actual | Cancela y sustituye su hipoteca actual |
| **Uso Óptimo** | Reformas por fases o liquidez flexible | Gasto único con aversión a tipo variable | Cuando los tipos actuales son más bajos |

## Riesgos Financieros del HELOC y Cómo Evitar el Choque de Cuota

* **Sensibilidad a subidas de tipos:** Como los HELOC están indexados al *Prime Rate* o Euríbor más un margen, una subida de $200\text{ puntos básicos}$ ($+2\%$) elevaría la cuota de intereses sobre $\$75.000$ de $\$525$ a $\$650$ mensuales de inmediato. Revise siempre el techo máximo contractual (*lifetime cap*).
* **Congelación por caída del precio de la vivienda:** Si el valor inmobiliario de su zona desciende, el banco puede reducir o bloquear el crédito no dispuesto al superarse el límite de CLTV.
* **Conversión a tramos de tipo fijo:** Muchos contratos permiten bloquear (*lock-in*) el saldo utilizado convirtiéndolo en un subpréstamo a tipo fijo con amortización constante desde el primer año, neutralizando el riesgo de tipos y evitando el salto de cuota al décimo año.
