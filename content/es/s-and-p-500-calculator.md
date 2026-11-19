---
title: "Calculadora de Rendimiento S&P 500"
metaTitle: "Calculadora de Rendimiento S&P 500 — Interés Compuesto"
description: "Proyecta el crecimiento de tu patrimonio invirtiendo en el índice S&P 500 con aportaciones periódicas, reinversión de dividendos y ajuste por inflación."
metaDescription: "Simula cuánto crecerá tu dinero en el S&P 500 a largo plazo con aportes mensuales, interés compuesto, dividendos reinvertidos y rentabilidad real ajustada."
metaKeywords: "calculadora rendimiento sp500, invertir en sp500 interés compuesto, simulador s&p 500 aportes mensuales, rentabilidad histórica sp500, calculadora ETF sp500"
faqs:
  - question: "¿Cuál es la rentabilidad histórica promedio del índice S&P 500?"
    answer: "Desde su ampliación a 500 empresas en 1957, el S&P 500 ha generado una rentabilidad anualizada compuesta (CAGR) nominal de entre el 10,2 % y el 10,5 % incluyendo la reinversión de dividendos. Descontando la inflación histórica estadounidense, el retorno real se sitúa en torno al 6,8 % – 7,2 % anual."
  - question: "¿Es mejor invertir mediante un ETF de acumulación o uno de distribución?"
    answer: "En la fase de creación de patrimonio, un ETF o fondo indexado de acumulación (como VUAA o CSPX bajo normativa UCITS) es fiscalmente más eficiente porque reinvierte los dividendos internamente sin pasar por tu cuenta personal, difiriendo el impuesto sobre las ganancias hasta el día en que vendas tus participaciones."
  - question: "¿Qué diferencia hay entre un fondo indexado y un ETF del S&P 500 para un inversor en España o Latinoamérica?"
    answer: "En España, los fondos indexados permiten traspasar el capital de un fondo a otro sin tributar por las plusvalías (diferimiento fiscal), ventaja que no tienen los ETFs. En Latinoamérica, los ETFs cotizados en mercados locales (como el SIC en México) o a través de brókers internacionales suelen ofrecer menor coste y mejor liquidez que los fondos bancarios locales."
  - question: "¿Debo cubrir el riesgo de divisa (EUR Hedged) al invertir en el S&P 500 a largo plazo?"
    answer: "A plazos superiores a 10 o 15 años, las grandes multinacionales del S&P 500 ya generan cerca del 40 % de sus ingresos fuera de Estados Unidos, lo que actúa como cobertura natural. Los fondos con cobertura de divisa (Hedged) soportan el coste del diferencial de tipos de interés entre la Fed y el BCE, restando rentabilidad neta a largo plazo."
  - question: "¿Qué ocurre si el mercado sufre una caída del 30 % mientras hago aportaciones mensuales?"
    answer: "Mediante la estrategia de aportaciones periódicas constantes (Dollar-Cost Averaging o DCA), las caídas bursátiles te permiten adquirir un mayor número de participaciones con el mismo importe mensual, reduciendo tu precio medio de compra y acelerando la recuperación cuando el ciclo alcista regresa."
---

El índice **S&P 500** agrupa a las 500 mayores empresas cotizadas de Estados Unidos —que representan aproximadamente el 80 % de la capitalización bursátil estadounidense y cerca del 50 % del mercado mundial de renta variable— y constituye el estándar de referencia para la inversión pasiva a largo plazo. La clave de su capacidad para multiplicar el patrimonio no reside en acertar el momento exacto de entrada al mercado, sino en combinar el **interés compuesto**, la **reinversión automática de dividendos** y la disciplina de las **aportaciones periódicas mensuales** (*Dollar-Cost Averaging*).

Esta calculadora proyecta el valor futuro de tu cartera diferenciando entre el capital aportado de tu bolsillo, las ganancias generadas por la capitalización compuesta y el poder adquisitivo real tras descontar el efecto de la inflación.

## Fórmula del interés compuesto con aportaciones mensuales y ajuste por inflación

Para calcular con rigor la evolución de una cartera indexada al S&P 500 que combina un capital inicial con compras periódicas mensuales, se suma la capitalización del desembolso único inicial y el valor futuro de una renta constante:

$$VF = V_0 \left(1 + \frac{r}{12}\right)^{12t} + A \cdot \frac{\left(1 + \frac{r}{12}\right)^{12t} - 1}{\frac{r}{12}}$$

Donde las variables del modelo son:

* **$VF$**: Valor futuro nominal de la cartera al concluir el horizonte de inversión.
* **$V_0$**: Inversión o capital inicial aportado en el momento cero.
* **$A$**: Aportación periódica mensual constante.
* **$r$**: Tasa de rentabilidad anual nominal esperada (en tanto por uno), neta de la comisión anual de gestión del fondo (*TER*).
* **$t$**: Horizonte temporal expresado en años ($12t$ equivale al número total de meses de capitalización).

Dado que un horizonte de 15 a 30 años conlleva pérdida de poder de compra monetario, el rendimiento real ajustado por inflación ($r_{\text{real}}$) se determina mediante la **ecuación de Fisher**, donde $\pi$ representa la tasa de inflación anual media:

$$r_{\text{real}} = \frac{1 + r_{\text{nominal}}}{1 + \pi} - 1$$

## Simulación real: 10.000 € iniciales más 300 € al mes durante 25 años

Supongamos que un inversor inicia una cartera indexada al S&P 500 con **10.000 €** (`USD 10,000`) y programa una transferencia automática mensual de **300 €** (`USD 300`) durante **25 años** ($12t = 300\text{ meses}$). Asumimos una rentabilidad nominal neta del **9,60 % anual** (ligeramente por debajo del promedio histórico del 10,2 % tras descontar un 0,07 % de comisión TER y retenciones internas sobre dividendos).

1. **Tasa mensual equivalente ($r/12$)**: Dividimos $0,096 / 12 = 0,008$ (0,80 % de crecimiento compuesto mensual).
2. **Factor de capitalización a 300 meses**: Calculamos $(1 + 0,008)^{300} = (1,008)^{300} = 10,91895$.
3. **Crecimiento del capital inicial ($V_0$)**:
   $$10.000 \times 10,91895 = 109.189,50\text{ €}$$
4. **Crecimiento de las 300 aportaciones mensuales ($A$)**:
   $$300 \cdot \frac{10,91895 - 1}{0,008} = 300 \cdot \frac{9,91895}{0,008} = 300 \times 1.239,86875 = 371.960,63\text{ €}$$
5. **Patrimonio total acumulado ($VF$)**: Al sumar ambos bloques ($109.189,50 + 371.960,63$), la cartera alcanza **481.150,13 €**.
6. **Balance de esfuerzo frente a interés compuesto**: De esos 481.150,13 € finales, el inversor solo ha desembolsado de su bolsillo **100.000 €** ($10.000\text{ €}$ iniciales + $90.000\text{ €}$ en cuotas mensuales). Los **381.150,13 € restantes (el 79,2 % del patrimonio)** son beneficio puro generado por el interés compuesto.
7. **Ajuste a poder adquisitivo actual**: Si aplicamos una inflación media del 2,5 % anual durante 25 años ($(1,025)^{25} = 1,85394$), esos 481.150,13 € futuros equivalen a **259.528,42 € de poder de compra actual**.

## Comparativa de vehículos para invertir en el S&P 500 (España y Latinoamérica)

La elección del instrumento financiero y su estructura de comisiones (TER) impacta directamente en la rentabilidad neta acumulada:

| Vehículo de Inversión | Ejemplos de Referencia (Tickers / ISIN) | Comisión Anual (TER) | Tratamiento de Dividendos | Ventaja Fiscal y Operativa Principal |
| :--- | :--- | :--- | :--- | :--- |
| **Fondo Indexado UCITS (Acumulación)** | Vanguard U.S. 500 Stock Index / Fidelity S&P 500 | 0,06 % – 0,10 % | Reinversión automática interna | En España permite traspasos entre fondos sin pagar IRPF hasta el reembolso final |
| **ETF UCITS Europeo (Acumulación)** | iShares Core S&P 500 (`CSPX`) / Vanguard (`VUAA`) | 0,07 % | Reinversión automática (retención 15 % en origen por tratado Irlanda-EE. UU.) | Ideal en Latinoamérica y Europa para diferir impuestos sobre dividendos sin riesgo de impuesto sucesorio de EE. UU. |
| **ETF Estadounidense (Distribución)** | Vanguard (`VOO`) / SPDR (`SPY`) / iShares (`IVV`) | 0,03 % – 0,09 % | Pago en efectivo trimestral | Máxima liquidez mundial; sujeto a retención en origen de EE. UU. (15 % o 30 % según formulario W-8BEN) |
| **Fondo Bancario Tradicional Bolsa USA** | Fondos comercializados en sucursales bancarias | 1,25 % – 1,85 % | Variable | Ninguna: una comisión del 1,50 % anual drena más del 28 % del patrimonio total a 25 años |

## El impacto silencioso de las comisiones y la volatilidad del mercado

Al interpretar las proyecciones de la calculadora, ten presentes tres reglas fundamentales de la inversión indexada:

* **Vigila el coste anual (TER) por debajo del 0,15 %**: En el ejemplo anterior de 25 años, si en lugar de invertir mediante un ETF o fondo indexado con un TER del 0,07 % utilizas un fondo bancario que cobra un 1,57 % anual, tu rentabilidad neta cae del 9,60 % al 8,10 %. Ese diferencial del 1,5 % reduce tu capital final de **481.150 € a 365.420 €**, haciéndote perder **115.730 €** en comisiones acumuladas.
* **La rentabilidad del 10 % no es lineal**: El S&P 500 rara vez sube exactamente un 10 % en un año natural; su promedio histórico es el resultado de años alcistas del +25 % combinados con correcciones severas del -20 % al -35 % (como ocurrió en 2001, 2008 o 2022). Interrumpir las aportaciones mensuales durante los mercados bajistas destruye la ventaja matemática del *Dollar-Cost Averaging*.
* **Mitigación del riesgo de secuencia al acercarte al retiro**: Si vas a necesitar rescatar el capital en un plazo fijo, conviene trasladar progresivamente entre un 20 % y un 40 % de la cartera hacia renta fija de corto plazo o fondos monetarios durante los últimos 5 años previos a la jubilación para evitar vender acciones en medio de una recesión puntual.
