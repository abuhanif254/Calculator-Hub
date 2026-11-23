---
title: "Calculadora de Interés"
metaTitle: "Calculadora de Interés | Simple, Compuesto y TAE Real"
description: "Calcula el interés simple, compuesto y continuo en años o meses. Compara frecuencias de capitalización y conoce el saldo final y la TAE efectiva de tu capital."
metaDescription: "Calcula el interés simple, compuesto y continuo al instante. Compara frecuencias de capitalización, conoce la TAE efectiva y proyecta tu saldo final."
metaKeywords: "calculadora de interés, interés compuesto, interés simple, capitalización continua, calcular TAE, tasa nominal TIN, rendimiento de inversiones, interés efectivo anual"
faqs:
  - question: "¿Cuál es la diferencia fundamental entre el interés simple y el interés compuesto?"
    answer: "El interés simple se calcula únicamente sobre el capital inicial durante todo el plazo, generando un crecimiento lineal idéntico cada año. El interés compuesto suma periódicamente los intereses devengados al capital principal, de modo que en los períodos sucesivos los intereses también producen nuevos intereses con crecimiento exponencial."
  - question: "¿En qué se diferencian el TIN (tasa nominal) y la TAE o TEA (tasa efectiva)?"
    answer: "El Tipo de Interés Nominal (TIN) es el porcentaje anual pactado antes de incorporar el efecto de las capitalizaciones intermedias. La Tasa Anual Equivalente (TAE o TEA) refleja el rendimiento o coste efectivo real al cabo de un año completo teniendo en cuenta la frecuencia de capitalización."
  - question: "¿Cuánto influye cambiar de capitalización anual a mensual o diaria?"
    answer: "A mayor frecuencia de capitalización, antes se reinvierten los rendimientos y mayor resulta el saldo final. El mayor salto ocurre al pasar de capitalización anual a mensual; pasar de mensual a diaria o continua produce ganancias adicionales reales, aunque progresivamente más pequeñas por convergencia matemática."
  - question: "¿Qué es la capitalización continua y cuándo se utiliza?"
    answer: "La capitalización continua representa el límite teórico máximo del interés compuesto cuando los intervalos de reinversión tienden a infinito y el cálculo ocurre en cada instante mediante el número de Euler (e). Se emplea habitualmente en finanzas cuantitativas, valoración de derivados y análisis actuarial."
  - question: "¿Cómo afecta la inflación al rendimiento real de mis intereses?"
    answer: "La inflación reduce el poder adquisitivo del dinero a lo largo del tiempo. Para conocer su ganancia real debe aplicar la ecuación de Fisher comparando la TAE neta obtenida frente a la tasa de inflación anual; si la inflación supera su interés neto, el saldo nominal sube pero su capacidad de compra disminuye."
---

El interés representa el precio del dinero en el tiempo: constituye la remuneración de quien presta o invierte un capital y el coste financiero que asume quien solicita financiación. Comprender con rigor cómo evoluciona un saldo bajo cada régimen de cálculo permite proyectar depósitos, bonos o cuentas remuneradas, así como medir el coste efectivo de préstamos y tarjetas de crédito.

Nuestra **Calculadora de Interés** computa el capital acumulado y los intereses devengados en plazos en años o meses bajo siete modalidades: interés simple, capitalización anual, semestral, trimestral, mensual, diaria y continua.

## Diferencia Entre Interés Simple, Compuesto y Continuo

El crecimiento de un capital depende directamente de si los rendimientos periódicos se retiran o se capitalizan:

* **Interés simple:** El cálculo recae solo sobre el capital principal inicial, produciendo un crecimiento lineal constante. Se utiliza habitualmente en letras del tesoro a corto plazo, descuentos comerciales y préstamos breves sin reinversión.
* **Interés compuesto discreto:** Al cierre de cada intervalo ($n$ veces por año), el interés ganado se añade al principal. En el período siguiente la tasa actúa sobre un saldo mayor, acelerando el rendimiento de forma exponencial en horizontes largos.
* **Capitalización continua:** Representa el límite teórico cuando la frecuencia de liquidación crece indefinidamente ($n \to \infty$), marcando el techo matemático para una tasa nominal determinada.

## Fórmulas Fundamentales de Cálculo de Intereses

### 1. Interés Simple

$$I = P \cdot r \cdot t, \qquad A = P \cdot (1 + r \cdot t)$$

### 2. Interés Compuesto Discreto y Tasa Anual Equivalente (TAE)

$$A = P \left(1 + \frac{r}{n}\right)^{n \cdot t}, \qquad I = A - P, \qquad \text{TAE} = \left(1 + \frac{r}{n}\right)^{n} - 1$$

### 3. Capitalización Continua y Rentabilidad Real (Fisher)

$$A = P \cdot e^{r \cdot t}, \qquad \text{TAE}_{\text{cont}} = e^{r} - 1, \qquad r_{\text{real}} = \frac{1 + \text{TAE}}{1 + \pi} - 1$$

Donde las variables representan:

* **$A$ e $I$**: Saldo final acumulado e interés total generado ($I = A - P$).
* **$P$**: Capital principal inicial invertido o financiado.
* **$r$**: Tipo de interés nominal anual (TIN) en decimal (por ejemplo, $6\text{ \%} = 0,06$).
* **$t$**: Plazo total en años (si se ingresa en meses, se transforma como $t = \text{meses} / 12$).
* **$n$**: Períodos de capitalización anuales ($1$ anual, $2$ semestral, $4$ trimestral, $12$ mensual, $365$ diaria).
* **$e$**: Número de Euler ($e \approx 2,718282$).
* **$\text{TAE}$ y $r_{\text{real}}$**: Tasa Anual Equivalente efectiva (o TEA en Latinoamérica) y rentabilidad real ajustada por la inflación anual ($\pi$).

## Ejemplo Práctico Paso a Paso: $15.000\text{ €}$ al $6\text{ \%}$ en $8\text{ Años}$

Supongamos una inversión de **$15.000\text{ €}$** a un tipo nominal del **$6,00\text{ \%}$** ($r = 0,06$) durante **$8\text{ años}$** ($t = 8$):

1. **Régimen de interés simple:**
   $$I = 15.000 \times 0,06 \times 8 = 7.200,00\text{ €} \implies A = 22.200,00\text{ €}$$
2. **Interés compuesto con capitalización mensual ($n = 12$):**
   * Tasa mensual $\frac{r}{n} = \frac{0,06}{12} = 0,005$ ($0,50\text{ \%}$) y total de períodos $n \cdot t = 96\text{ meses}$.
   * Factor compuesto: $(1,005)^{96} \approx 1,614143$.
   * Saldo final e intereses: $A = 15.000 \times 1,614143 = \mathbf{24.212,14\text{ €}}$ e $I = \mathbf{9.212,14\text{ €}}$ ($2.012,14\text{ €}$ más que en interés simple sin aportar capital adicional).
3. **TAE efectiva y rendimiento real:**
   $$\text{TAE} = (1,005)^{12} - 1 \approx 6,1678\text{ \%}$$
   Con una inflación media del $\pi = 2,50\text{ \%}$, la rentabilidad real por Fisher resulta $r_{\text{real}} = \frac{1,061678}{1,025} - 1 \approx \mathbf{3,58\text{ \%}}$ anual.

## Tabla Comparativa por Frecuencia ($15.000\text{ €}$, $6\text{ \%}$, $8\text{ Años}$)

Compare el impacto de cada régimen disponible en la calculadora sobre el mismo capital y plazo:

| Frecuencia | Períodos | TAE Efectiva | Interés Total | Saldo Final | Extra vs. Simple |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Simple** | — | — | 7.200,00 € | 22.200,00 € | 0,00 € |
| **Anual** | 1 | 6,0000 % | 8.907,72 € | 23.907,72 € | +1.707,72 € |
| **Semestral** | 2 | 6,0900 % | 9.070,60 € | 24.070,60 € | +1.870,60 € |
| **Trimestral** | 4 | 6,1364 % | 9.154,86 € | 24.154,86 € | +1.954,86 € |
| **Mensual** | 12 | 6,1678 % | 9.212,14 € | 24.212,14 € | +2.012,14 € |
| **Diaria** | 365 | 6,1831 % | 9.240,16 € | 24.240,16 € | +2.040,16 € |
| **Continua** | $\infty$ | 6,1837 % | 9.241,12 € | 24.241,12 € | +2.041,12 € |

Observe la convergencia decreciente: pasar de capitalización anual a mensual añade $304,42\text{ €}$, mientras que saltar de diaria a continua agrega apenas $0,96\text{ €}$. En la práctica bancaria, esta convergencia confirma que el horizonte temporal y la tasa nominal pesan mucho más en el patrimonio final que la diferencia técnica entre liquidar intereses cada mes o cada día.

## Regla del 72, Estrategias y Errores Frecuentes

* **Estime cuándo se duplica su capital con la Regla del 72:** Dividir $72$ entre el tipo porcentual aproxima cuántos años tarda un depósito compuesto en doblar su valor. Al $6\text{ \%}$, $72 / 6 = 12\text{ años}$ (muy próximo al valor logarítmico exacto de $\frac{\ln 2}{\ln 1,06} \approx 11,90\text{ años}$). Esta referencia rápida ayuda a evaluar el potencial de largo plazo de cualquier cartera o producto de renta fija.
* **No confunda TIN y TAE al comparar ofertas:** Los bancos anuncian la TAE en depósitos porque es la cifra superior, pero suelen destacar el TIN o la tasa mensual en créditos y préstamos al consumo. Evalúe siempre productos equivalentes por su **TAE o CAT**.
* **Vigile la capitalización diaria en deudas rotativas:** Una tarjeta de crédito al $24\text{ \%}$ nominal con capitalización diaria implica una TAE efectiva del **$27,11\text{ \%}$** cuando el saldo no se liquida mensualmente, multiplicando rápidamente la carga financiera si solo se abonan cuotas mínimas.
* **Incorpore la retención fiscal en sus proyecciones:** Los rendimientos del capital mobiliario suelen tributar en cada liquidación (entre el $19\text{ \%}$ y el $28\text{ \%}$ según tramo y país). Para cálculos netos realistas, utilice la tasa después de impuestos $r_{\text{neto}} = r \cdot (1 - \tau)$.
