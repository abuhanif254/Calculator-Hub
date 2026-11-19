---
title: "Calculadora Alquilar vs. Comprar"
metaTitle: "Calculadora Alquilar vs. Comprar Vivienda: Coste Real"
description: "Compare el impacto patrimonial a largo plazo entre alquilar una vivienda o comprarla con hipoteca, incluyendo gastos de compra, mantenimiento y coste de oportunidad."
metaDescription: "¿Conviene más alquilar o comprar casa? Compare hipoteca, gastos de escrituración, mantenimiento y rentabilidad del ahorro invertido a medio y largo plazo."
metaKeywords: "calculadora alquilar vs comprar, conviene mas alquilar o comprar vivienda, coste de oportunidad entrada hipoteca, regla del 5 por ciento inmobiliaria, punto de equilibrio compra vivienda"
faqs:
  - question: "¿Por qué es un error comparar directamente el alquiler mensual con la cuota de la hipoteca?"
    answer: "Porque la cuota hipotecaria no incluye todos los costes a fondo perdido de ser propietario (impuestos de compra como ITP o IVA, IBI, comunidad de vecinos, seguro de hogar y reparaciones), ni tampoco el coste de oportunidad del capital inmovilizado en la entrada del piso. A su vez, una parte de la cuota hipotecaria es amortización de capital, que sí incrementa su patrimonio."
  - question: "¿Cuánto dinero ahorrado necesito realmente para comprar una vivienda?"
    answer: "En España y la mayoría de mercados hipotecarios, los bancos financian como máximo el 80 % del valor de tasación o compraventa. Por tanto, necesita aportar un 20 % de entrada más un 10 % a 12 % adicional para cubrir impuestos (ITP o IVA y AJD), notaría, registro y tasación, sumando entre el 30 % y el 32 % del precio del inmueble."
  - question: "¿Qué es el coste de oportunidad de la entrada de la vivienda?"
    answer: "Es la rentabilidad financiera que deja de ganar al entregar sus ahorros iniciales para comprar el inmueble. Si usted destina 70.000 € a la entrada y gastos de una casa, pierde el interés compuesto que esos 70.000 € habrían generado invertidos en fondos indexados, bonos del Estado o depósitos durante 15 o 25 años."
  - question: "¿Cuántos años debo vivir en una casa comprada para que salga más rentable que alquilar?"
    answer: "En condiciones normales de mercado, el punto de equilibrio temporal se sitúa entre los 5 y los 8 años. Si vende la vivienda antes de cumplir 4 años, la revalorización acumulada rara vez alcanza para recuperar el 10 % de impuestos de compra y el 3 % a 5 % de gastos de agencia y plusvalía municipal en la venta."
  - question: "¿Cómo funciona la regla del 5 % o el PER inmobiliario para evaluar si un piso está caro?"
    answer: "El PER inmobiliario divide el precio de venta entre el alquiler anual que costaría ese mismo inmueble. Un PER inferior a 18 (rentabilidad bruta superior al 5,5 %) favorece claramente la compra; un PER entre 18 y 24 exige calcular el horizonte de permanencia; y un PER superior a 25 indica que resulta financieramente más eficiente alquilar e invertir."
---

La máxima popular que afirma que «alquilar es tirar el dinero» ignora una realidad financiera clave: comprar una vivienda con hipoteca también conlleva importantes **costes a fondo perdido**. Al adquirir un inmueble, usted asume impuestos de transmisión irrecuperables, intereses bancarios durante décadas, gastos de mantenimiento y el coste de oportunidad de inmovilizar sus ahorros. Esta calculadora enfrenta ambas alternativas con rigor patrimonial para revelar en qué año exacto la compra supera al alquiler.

## Por qué comparar la cuota hipotecaria con el alquiler mensual es un error financiero

Muchos compradores deciden hipotecarse al ver que una cuota bancaria de 900 € mensuales es inferior a un alquiler de 1.000 € en el mismo barrio. Sin embargo, una comparativa rigurosa exige separar qué parte del desembolso construye riqueza y qué parte desaparece como gasto irrecuperable:

* **Los costes hundidos del inquilino:** El 100 % de la renta mensual de alquiler (actualizada según la inflación) es un gasto a fondo perdido. A cambio, el inquilino conserva intacto en su cartera de inversión el capital equivalente al 30 % del valor de la casa (entrada más impuestos de escrituración) y no paga derramas, IBI (predial) ni seguros de continente.
* **Los costes hundidos del propietario:** Aunque la fracción de la cuota hipotecaria destinada a amortizar principal es ahorro forzoso, el propietario pierde a fondo perdido cinco partidas:
  1. **Impuestos y gastos de compra:** Entre el 8 % y el 12 % del precio de la vivienda en el día uno (ITP o IVA, AJD, notaría, gestoría y registro).
  2. **Intereses hipotecarios:** Especialmente altos durante la primera mitad del cuadro de amortización francés.
  3. **Tributos locales y gastos fijos:** IBI, tasa de basuras, comunidad de propietarios y seguros.
  4. **Mantenimiento y reformas:** Renovación de instalaciones y reparaciones (en torno al 1 % anual del valor del inmueble).
  5. **Coste de oportunidad del capital propio:** El rendimiento compuesto que habría generado el ahorro inicial invertido en activos financieros.

## Modelo matemático del Patrimonio Neto Final y el PER Inmobiliario

Para determinar qué decisión maximiza su riqueza tras un horizonte de $N$ años, proyectamos el **Patrimonio Neto Final** de ambos perfiles bajo condiciones idénticas de flujo de caja:

$$\text{Patrimonio}_{\text{Comprador}}(N) = V_0 (1 + g)^N - P_{\text{Pendiente}}(N) - G_{\text{Venta}}$$

$$\text{Patrimonio}_{\text{Inquilino}}(N) = C_{\text{Inicial}} (1 + r_i)^N + \sum_{t=1}^{12N} \left( \text{Flujo}_{\text{Compra}, t} - \text{Alquiler}_t \right) (1 + r_m)^{12N - t}$$

Como indicador rápido de valoración, calculamos también el **PER Inmobiliario (Ratio Precio-Alquiler)**:

$$\text{PER Inmobiliario} = \frac{V_0}{12 \times \text{Alquiler}_{\text{Mensual Inicial}}}$$

Variables del modelo:
* $V_0$: Precio de compraventa inicial de la vivienda y $g$: tasa anual de revalorización inmobiliaria.
* $P_{\text{Pendiente}}(N)$: Capital vivo de la hipoteca al cierre del año $N$, y $G_{\text{Venta}}$: costes de venta.
* $C_{\text{Inicial}}$: Desembolso inicial del comprador (entrada + impuestos) que el inquilino mantiene invertido a una tasa neta anual $r_i$ (mensual $r_m$).

## Caso práctico numérico a 10 años: Vivienda de 250.000 € vs. Alquiler de 950 €/mes

Comparemos el patrimonio al cabo de **10 años** de una familia que duda entre comprar un piso de **$250.000\text{ €}$** o alquilar uno equivalente por **$950\text{ €/mes}$** (PER Inmobiliario = $21,9\text{ años}$).

### 1. Ruta de la Compra con Hipoteca
* **Desembolso inicial ($C_{\text{Inicial}}$):** Aporta el 20 % de entrada ($50.000\text{ €}$) más un 10 % en impuestos y gastos ($25.000\text{ €}$), sumando **$75.000\text{ €}$**.
* **Hipoteca y gastos mensuales:** Financia $200.000\text{ €}$ a 25 años al **3,20 % TIN fijo** (cuota de **$969,36\text{ €}$**). Sumando $180\text{ €/mes}$ de IBI, comunidad, seguro y mantenimiento, su desembolso mensual es de **$1.149,36\text{ €}$**.
* **Situación al año 10:** Con una revalorización del $2,5\,\%$ anual, la vivienda vale $250.000 \times (1,025)^{10} = \mathbf{320.021\text{ €}}$. Tras 120 cuotas, ha amortizado $63.890\text{ €}$ de deuda y debe **$136.110\text{ €}$**.
* **Patrimonio Neto del Comprador:** $320.021 - 136.110 = \mathbf{183.911\text{ €}}$ (o **$174.310\text{ €}$** descontando un 3 % de gastos de venta).

### 2. Ruta del Alquiler + Inversión
* **Capital invertido:** Conserva los **$75.000\text{ €}$** y los invierte en una cartera indexada al **6,0 % anual neto**, junto con el ahorro mensual respecto al coste del propietario (el alquiler de $950\text{ €/mes}$ sube un $2,5\,\%$ anual con el IPC).
* **Situación al año 10:** Los $75.000\text{ €}$ iniciales se convierten en $75.000 \times (1,06)^{10} = \mathbf{134.314\text{ €}}$, más **$13.200\text{ €}$** de los excedentes mensuales invertidos = **Patrimonio Neto de 147.514 €**.

**Veredicto a 10 años:** **Comprar supera a alquilar por 36.397 € de patrimonio acumulado**, cruzando el punto de equilibrio en el **año 5,5**.

## Matriz de decisión según horizonte y PER inmobiliario

| Permanencia Prevista | PER Inmobiliario | Opción Ganadora | Motivo Económico Principal |
| :--- | :--- | :--- | :--- |
| **Corto plazo (1 a 3 años)** | Cualquiera (15 a 30+) | **Alquilar** | Imposible amortizar el 10 % de impuestos de compra en tan poco tiempo. |
| **Medio plazo (4 a 6 años)** | Bajo (< 20 años) | **Compra ligera** | La amortización empieza a compensar los gastos de escrituración. |
| **Medio plazo (4 a 6 años)** | Alto (> 24 años) | **Alquilar e invertir** | Con precios > 24 veces el alquiler anual, la cartera financiera rinde más. |
| **Largo plazo (7 a 15 años)** | Estándar (16 a 23 años) | **Comprar** | La cuota fija hipotecaria protege frente a la subida del alquiler por IPC. |
| **Vitalicio (+15 años)** | Hasta 26 años | **Comprar claramente** | Eliminar el pago de vivienda antes de jubilarse asegura estabilidad. |

## Factores críticos que inclinan la balanza en la vida real

1. **La disciplina del inquilino inversor:** El cálculo asume que quien alquila invierte religiosamente el dinero de la entrada. Si deja esos 75.000 € en una cuenta al 0 % o los gasta, la hipoteca gana porque actúa como **ahorro forzoso mensual**.
2. **Protección frente a la inflación en la jubilación:** Una hipoteca a tipo fijo congela la cuota durante 25 años, mientras los alquileres suben con la inflación.
3. **Movilidad laboral:** Si su carrera exige mudarse de ciudad para lograr mejoras salariales del 20 % o 30 %, la flexibilidad del alquiler supera cualquier ventaja hipotecaria.
