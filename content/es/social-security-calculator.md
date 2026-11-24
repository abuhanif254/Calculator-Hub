---
title: "Calculadora de Seguro Social"
metaTitle: "Calculadora de Seguro Social | Estima Tu Pensión Mensual"
description: "Estima tu prestación mensual de jubilación del Seguro Social según tu edad actual, salario anual y edad de retiro entre los 62 y los 70 años."
metaDescription: "Calcula tu pensión mensual estimada del Seguro Social según salario y edad de retiro. Compara cobrar a los 62, 67 o 70 años y su punto de equilibrio."
metaKeywords: "calculadora de seguro social, beneficios de jubilación, pensión mensual seguro social, edad plena de jubilación, retiro anticipado 62 años, jubilación diferida 70 años, calcular seguro social, monto de seguro primario"
faqs:
  - question: "¿Por qué conviene comparar el punto de equilibrio antes de pedir el Seguro Social a los 62, 67 o 70 años?"
    answer: "El punto de equilibrio señala la edad exacta a partir de la cual los cobros mensuales más altos por esperar compensan las mensualidades dejadas de percibir al principio. Esperar de los 62 a los 67 años alcanza el equilibrio a los 78 años y 8 meses; diferir de los 67 a los 70 años lo alcanza a los 82 años y 6 meses. Si tienes buena salud o antecedentes familiares de longevidad, postergar suele generar un ingreso vitalicio acumulado superior."
  - question: "¿Cuántos años de ingresos considera el Seguro Social para determinar mi pensión mensual?"
    answer: "La Administración del Seguro Social de Estados Unidos toma los 35 años mejor remunerados de tu historial laboral, indexados a la evolución salarial histórica, y los divide entre 420 meses. Si cotizaste menos de 35 años, cada año faltante se computa con valor cero, lo que reduce el promedio mensual y la prestación resultante."
  - question: "¿Qué ocurre si sigo trabajando mientras cobro el Seguro Social antes de la Edad Plena de Jubilación?"
    answer: "Si solicitas la pensión anticipada entre los 62 y los 66 años y continúas percibiendo salarios por encima del límite anual fijado por el organismo, se retiene temporalmente parte del beneficio mensual. Al llegar a tu Edad Plena de Jubilación ese límite desaparece y la prestación se recalcula al alza para devolverte gradualmente las cuotas retenidas."
  - question: "¿Cuál es el tope salarial imponible y por qué ganar más de esa cifra no incrementa mi pensión?"
    answer: "Cada año se establece un techo máximo de ingresos sujetos al impuesto de nómina del Seguro Social —168.600 USD anuales en el modelo de referencia 2024—. Todo salario que exceda ese límite no paga cotización al Seguro Social ni se suma al cálculo del Ingreso Mensual Indexado Promedio, por lo que existe un beneficio máximo alcanzable."
  - question: "¿Los beneficios estimados del Seguro Social se ajustan anualmente por inflación?"
    answer: "Sí. Una vez elegible, tu prestación mensual incorpora el ajuste anual por costo de vida basado en el índice de precios al consumidor, protegiendo tu poder adquisitivo durante toda la jubilación. Al aplicarse de forma porcentual sobre una base más alta, retrasar el cobro también amplifica el impacto absoluto de cada futura subida por inflación."
---

Elegir a qué edad solicitar el **Seguro Social** define una parte crítica de tu renta vitalicia. Entre cobrar anticipadamente a los 62 años y esperar hasta los 70 existe una brecha permanente del **77,14 %** en el ingreso mensual garantizado, una diferencia que determina cuánto capital privado deberás retirar de tus ahorros cada año.

Esta **Calculadora de Seguro Social** modela la fórmula progresiva del sistema federal estadounidense (en `USD $`) según tu edad actual, tu salario anual y tu edad prevista de retiro entre los 62 y los 70 años, comparando el pago a los 62, a la **Edad Plena de Jubilación** (67 años) y a los 70 años.

## Fórmula Progresiva del Beneficio y Ajustes por Edad

El cálculo oficial combina un promedio salarial con tope, tres tramos progresivos y factores mensuales de reducción o bonificación según el momento del retiro.

### 1. Ingreso Mensual Indexado Promedio y Monto de Seguro Primario

El modelo acota el salario anual ($I_{\text{anual}}$) al tope imponible de referencia ($I_{\text{máx}} = 168.600\text{ USD}$ en el parámetro 2024) para estimar el **Ingreso Mensual Indexado Promedio** ($I_m$). Sobre $I_m$ se aplican los puntos de inflexión $p_1 = 1.174\text{ USD}$ y $p_2 = 7.078\text{ USD}$ para hallar el **Monto de Seguro Primario** ($B_{\text{plena}}$), equivalente al 100 % a los 67 años:

$$I_m = \frac{\min(I_{\text{anual}},\; I_{\text{máx}})}{12}$$

$$B_{\text{plena}} = 0{,}90 \cdot \min(I_m, p_1) + 0{,}32 \cdot \max\bigl(0,\; \min(I_m, p_2) - p_1\bigr) + 0{,}15 \cdot \max(0,\; I_m - p_2)$$

Esta estructura sustituye el `90 %` del primer tramo, el `32 %` del tramo intermedio y solo el `15 %` del tramo superior, otorgando mayor tasa de reemplazo a rentas bajas y medias.

### 2. Retiro Anticipado y Créditos por Jubilación Diferida

Para nacidos desde 1960, la Edad Plena de Jubilación es **67 años**. Reclamar antes aplica una reducción permanente de $\frac{5}{9}\,\%$ (`0,5556 %`) durante cada uno de los primeros 36 meses y de $\frac{5}{12}\,\%$ (`0,4167 %`) por cada mes adicional (hasta 60 meses a los 62 años). Esperar después de los 67 otorga **créditos por jubilación diferida** de $\frac{2}{3}\,\%$ (`0,6667 %`) mensual —un **8 % anual**— hasta un máximo de 36 meses (70 años):

$$B_{\text{anticipada}} = B_{\text{plena}} \cdot \left[1 - \frac{5}{900}\min(m, 36) - \frac{5}{1200}\max(0, m - 36)\right]$$

$$B_{\text{diferida}} = B_{\text{plena}} \cdot \left(1 + \frac{2}{300} \cdot \min(d, 36)\right)$$

Donde:

* **$I_m$**: Ingreso Mensual Indexado Promedio estimado en `USD $`.
* **$B_{\text{plena}}$**: Pensión mensual íntegra correspondiente a los 67 años.
* **$m = 12 \cdot (67 - E)$**: Meses de anticipación para edades $E$ entre 62 y 66 años.
* **$d = 12 \cdot (E - 67)$**: Meses de demora para edades $E$ entre 68 y 70 años.

## Ejemplo Práctico Paso a Paso: Salario Anual de 75.000 USD

Evaluemos a un trabajador con ingresos estables de **$I_{\text{anual}} = 75.000\text{ USD}$**:

1. **Ingreso mensual base:** `75.000 / 12` da **$I_m = 6.250{,}00\text{ USD}$** (por debajo del tope de `168.600 USD`).
2. **Primer tramo (90 %):** $1.174 \times 0{,}90 = \mathbf{1.056{,}60\text{ USD}}$.
3. **Segundo tramo (32 %):** $(6.250 - 1.174) \times 0{,}32 = 5.076 \times 0{,}32 = \mathbf{1.624{,}32\text{ USD}}$. Al ser $I_m < 7.078$, el tercer tramo es `0 USD`.
4. **Pensión a los 67 años:** $B_{\text{plena}} = 1.056{,}60 + 1.624{,}32 = \mathbf{2.680{,}92\text{ USD/mes}}$ (`32.171,04 USD/año`), con tasa de reemplazo bruta del **`42,89 %`**.
5. **Contraste entre 62 y 70 años:** a los 62 ($m = 60$) el recorte es $36 \times \frac{5}{9}\,\% + 24 \times \frac{5}{12}\,\% = 30\,\%$, dejando **`1.876,64 USD/mes`**. A los 70 ($d = 36$) el bono del `+24 %` eleva el pago a **`3.324,34 USD/mes`**.
6. **Punto de equilibrio:** esperar de 62 a 67 resigna 60 cheques (`112.598,64 USD`) recuperados a `804,28 USD/mes` extra en **140 meses** (**78 años y 8 meses**). Esperar de 67 a 70 recupera el importe diferido en **150 meses** (**82 años y 6 meses**), y supera al retiro a los 62 desde los **80 años y 5 meses**.

## Tabla Comparativa de Pensión por Edad (Salario de 75.000 USD)

Los totales anuales parten del beneficio mensual exacto previo al redondeo a centavos:

| Edad de Retiro | Ajuste frente a 67 Años | Factor Base | Pensión Mensual | Total Anual |
| :--- | :--- | :--- | :--- | :--- |
| **62 años** | -30,00 % | 70,00 % | 1.876,64 USD | 22.519,73 USD |
| **63 años** | -25,00 % | 75,00 % | 2.010,69 USD | 24.128,28 USD |
| **64 años** | -20,00 % | 80,00 % | 2.144,74 USD | 25.736,83 USD |
| **65 años** | -13,33 % | 86,67 % | 2.323,46 USD | 27.881,57 USD |
| **66 años** | -6,67 % | 93,33 % | 2.502,19 USD | 30.026,30 USD |
| **67 años (Plena)** | 0,00 % | 100,00 % | 2.680,92 USD | 32.171,04 USD |
| **68 años** | +8,00 % | 108,00 % | 2.895,39 USD | 34.744,72 USD |
| **69 años** | +16,00 % | 116,00 % | 3.109,87 USD | 37.318,41 USD |
| **70 años (Máxima)** | +24,00 % | 124,00 % | 3.324,34 USD | 39.892,09 USD |

Nótese que el punto de equilibrio calculado se mantiene idéntico para cualquier nivel salarial, pues el monto base se cancela en la proporción. Por ello, tu expectativa de vida y tu liquidez inmediata pesan más que el salario al decidir cuándo reclamar.

## Errores Habituales al Planificar tu Seguro Social

* **Suponer 35 años completos al sueldo actual:** pausas laborales, estudios o empleo sin cotización introducen ceros en el promedio de 35 años y rebajan la prestación oficial; verifica tu registro anual real.
* **Olvidar la pensión de supervivencia conyugal:** al fallecer el cónyuge con mayor prestación, el sobreviviente conserva el cheque superior; diferir hasta los 70 años el beneficio mayor blinda a la pareja.
* **Desatender impuestos y primas médicas:** si sumas retiros privados o rentas, hasta el **85 %** del Seguro Social puede tributar en el impuesto federal sobre la renta, reduciendo tu liquidez neta.
* **Postergar más allá de los 70 años:** los créditos por demora se detienen exactamente a los 70 años; solicitar después solo implica perder mensualidades irrecuperables.
