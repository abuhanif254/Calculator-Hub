---
title: "Calculadora de Valor Presente"
metaTitle: "Calculadora de Valor Presente (VP) y Descuento de Flujos"
description: "Calcule el valor actual de un capital futuro o de una serie de rentas periódicas aplicando la tasa de descuento, inflación y frecuencia de capitalización."
metaDescription: "Calcule el Valor Presente (VP) de un capital futuro, anualidad o flujo de caja. Descuente cobros futuros según su tasa de rentabilidad o coste de capital."
metaKeywords: "calculadora de valor presente, valor actual neto flujos de caja, descuento de flujos financieros, formula valor presente capital futuro, valor actual de una anualidad, tasa de descuento wacc"
faqs:
  - question: "¿Por qué una cantidad de dinero en el futuro siempre vale menos que la misma cantidad hoy?"
    answer: "Por el principio del valor temporal del dinero, gobernado por tres factores: el coste de oportunidad (el dinero disponible hoy puede invertirse en bonos o activos productivos para generar intereses), la inflación (que erosiona el poder de compra de la moneda con el paso de los años) y el riesgo de crédito o incertidumbre sobre el cumplimiento efectivo del cobro futuro."
  - question: "¿Qué tasa de descuento debo introducir para calcular el valor presente de un flujo de efectivo?"
    answer: "Depende del perfil de la operación. Para finanzas personales o liquidaciones seguras, utilice la rentabilidad de los bonos del Estado al mismo plazo (Bono a 10 años o Treasury) más la inflación esperada. En evaluación de proyectos empresariales, emplee el Coste Medio Ponderado de Capital (WACC) de la compañía o la tasa mínima de rentabilidad exigida (hurdle rate) ajustada al riesgo del sector."
  - question: "¿Cuál es la diferencia entre el Valor Presente (VP) y el Valor Actual Neto (VAN / NPV)?"
    answer: "El Valor Presente (VP) calcula cuánto valen hoy los flujos de entrada futuros descontados a una tasa determinada. El Valor Actual Neto (VAN) da un paso adicional restando al Valor Presente de esos cobros futuros el desembolso o inversión inicial realizada en el momento cero (VAN = VP de flujos futuros − Inversión Inicial)."
  - question: "¿Cómo cambia el cálculo entre una anualidad ordinaria (vencida) y una anualidad anticipada?"
    answer: "En una anualidad ordinaria o vencida (como los cupones de un bono o sueldos), cada flujo se recibe al final de cada periodo. En una anualidad anticipada (como los contratos de alquiler de locales comerciales o primas de seguro), cada pago se cobra al principio del periodo. Al adelantarse cada cobro un periodo completo, el valor presente de una anualidad anticipada es exactamente igual al de una ordinaria multiplicado por (1 + r)."
  - question: "¿Se debe sumar la inflación a la tasa de descuento al actualizar flujos de caja?"
    answer: "Solo si los flujos futuros están expresados en términos nominales (moneda corriente de cada año futuro). Si los cobros futuros son fijos en euros o dólares nominales, debe aplicar una tasa de descuento nominal que ya incorpore la inflación. En cambio, si los flujos futuros están indexados al IPC (moneda constante), debe descontarlos con una tasa de interés real mediante la ecuación de Fisher para no penalizar dos veces el poder adquisitivo."
---

El **Valor Presente (VP)** —denominado **Valor Actual (VA)** en la literatura financiera de España y Latinoamérica— responde a una de las preguntas centrales de la economía corporativa y patrimonial: *¿cuánto vale en moneda de hoy un cobro o una corriente de ingresos que no se recibirá hasta dentro de varios años?*

Mediante la **actualización o descuento financiero** (el inverso exacto de la capitalización compuesta), esta calculadora traduce promesas de pago futuras, rentas periódicas, pagarés, indemnizaciones o flujos operativos de un proyecto a su equivalente líquido en el momento cero ($t = 0$), permitiendo comparar alternativas con calendarios dispares bajo una misma unidad de medida.

## Formulación Matemática del Valor Actual: Suma Única, Rentas y Perpetuidades

El modelo descuenta los importes futuros aplicando una **tasa de descuento ($r$)** que representa el coste de oportunidad del capital por periodo a lo largo de $n$ periodos.

### 1. Valor Presente de un Capital Futuro Único ($VF$)
Cuando se espera recibir un único importe global ($VF$) al final del periodo $n$, su valor actual se obtiene dividiendo dicho monto por el factor de capitalización compuesto:

$$VP = \frac{VF}{(1 + r)^n} = VF \times (1 + r)^{-n}$$

El término $(1 + r)^{-n}$ es el **Factor de Descuento ($FD$)**. Si el descuento se capitaliza $m$ veces por año (por ejemplo, $m = 12$ para frecuencia mensual con tasa nominal anual $r$), la ecuación subperiodal es:

$$VP = \frac{VF}{\left(1 + \frac{r}{m}\right)^{n \times m}}$$

### 2. Valor Presente de una Anualidad o Serie de Pagos Iguales ($PMT$)
Si el activo genera una serie de cobros periódicos constantes de importe $PMT$ durante $n$ periodos, la fórmula varía según el momento de pago dentro de cada intervalo:

* **Anualidad Ordinaria o Vencida (cobros al final de cada periodo):**
  $$VP_{\text{ordinaria}} = PMT \times \left[\frac{1 - (1 + r)^{-n}}{r}\right]$$

* **Anualidad Anticipada (cobros al inicio de cada periodo, como alquileres):**
  $$VP_{\text{anticipada}} = PMT \times \left[\frac{1 - (1 + r)^{-n}}{r}\right] \times (1 + r)$$

### 3. Valor Presente de una Perpetuidad (Modelo de Gordon-Shapiro)
Para valorar activos con horizonte indefinido —como concesiones perpetuas o acciones con dividendos constantes— donde el flujo del primer periodo ($FC_1$) crece a una tasa constante $g$ menor que la tasa de descuento ($r > g$):

$$VP_{\text{perpetuidad}} = \frac{FC_1}{r - g}$$

## Resolución Práctica: ¿Cobrar 85.000 € al Contado, una Renta Anual o un Pago Futuro?

Un empresario vende la cartera comercial de una delegación y el comprador le ofrece tres modalidades de pago, en un entorno donde el vendedor puede obtener una rentabilidad alternativa del **$7{,}00\%$ anual ($r = 0{,}07$)** en inversiones de riesgo equivalente:

1. **Opción A (Pago único diferido):** Cobrar **$115.000\text{ €}$** en un solo pago dentro de **$5\text{ años}$**.
2. **Opción B (Renta periódica vencida):** Cobrar **$21.000\text{ €}$** al cierre de cada año durante **$5\text{ años}$** (suma nominal sin descontar de $105.000\text{ €}$).
3. **Opción C (Pago inmediato al contado):** Cobrar **$85.000\text{ €}$** hoy mismo ($t = 0$).

Quien compare cifras sin descontar elegiría erróneamente la Opción A ($115.000\text{ €}$). Veamos qué dictamina la actualización financiera a Valor Presente:

* **Valoración de la Opción A (115.000 € en el año 5):**
  Con $(1 + 0{,}07)^5 = 1{,}4025517$ (Factor de Descuento $= 0{,}712986$):
  $$VP_A = \frac{115.000}{1{,}4025517} = 81.993{,}41\text{ €}$$

* **Valoración de la Opción B (Anualidad ordinaria de 21.000 €/año durante 5 años):**
  Calculamos el factor de actualización para $r = 0{,}07$ y $n = 5$:
  $$\frac{1 - (1{,}07)^{-5}}{0{,}07} = \frac{1 - 0{,}7129862}{0{,}07} = 4{,}1001974$$
  Multiplicando por la renta anual de $21.000\text{ €}$:
  $$VP_B = 21.000 \times 4{,}1001974 = 86.104{,}15\text{ €}$$

* **Decisión óptima:** En moneda homogénea de hoy, la **Opción B ($86.104{,}15\text{ €}$)** es la más rentable porque recupera liquidez desde el primer año, superando al cobro al contado de la **Opción C ($85.000{,}00\text{ €}$)** y dejando en último lugar a la **Opción A ($81.993{,}41\text{ €}$)**.

## Sensibilidad del Valor Presente de 100.000 € según Tasa y Horizonte

La siguiente matriz muestra cómo decae el valor actual de **$100.000\text{ €}$** (o $\$100.000\text{ USD}$) según el plazo de espera y la tasa de descuento exigida:

| Horizonte Temporal ($n$) | Tasa 3 % (Inflación) | Tasa 6 % (Renta fija) | Tasa 8 % (WACC medio) | Tasa 10 % (Renta variable) | Tasa 12 % (Capital riesgo) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Dentro de 1 año** | 97.087,38 € | 94.339,62 € | 92.592,59 € | 90.909,09 € | 89.285,71 € |
| **Dentro de 5 años** | 86.260,88 € | 74.725,82 € | 68.058,32 € | 62.092,13 € | 56.742,69 € |
| **Dentro de 10 años** | 74.409,39 € | 55.839,48 € | 46.319,35 € | 38.554,33 € | 32.197,32 € |
| **Dentro de 20 años** | 55.367,58 € | 31.180,47 € | 21.454,82 € | 14.864,36 € | 10.366,68 € |
| **Dentro de 30 años** | 41.198,68 € | 17.411,01 € | 9.937,73 € | 5.730,86 € | 3.337,79 € |

## Cómo Elegir la Tasa de Descuento Correcta y Evitar Sesgos

1. **Coherencia entre flujos nominales y tasas reales (Ecuación de Fisher):** Nunca descuente flujos expresados en moneda constante de hoy utilizando una tasa nominal que incluya inflación ($\pi$). Para hallar la tasa de descuento real limpia de inflación ($r_{\text{real}}$) a partir de la nominal ($r_n$), aplique la fórmula de Fisher:
   $$r_{\text{real}} = \frac{1 + r_n}{1 + \pi} - 1$$
2. **Simetría temporal en rentas mensuales:** Si valora alquileres o pensiones mensuales, divida la tasa anual entre $12$ para mantener la coherencia dimensional con el número total de meses.
3. **Prima por riesgo de contraparte:** Un pagaré privado con riesgo de impago no debe descontarse a la tasa de un bono del Estado; sume siempre un diferencial de crédito (*credit spread*) acorde a la solvencia del deudor.
