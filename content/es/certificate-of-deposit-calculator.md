---
title: "Calculadora de Depósitos a Plazo Fijo (CD)"
metaTitle: "Calculadora de Depósitos a Plazo Fijo (CD) — Interés y TAE"
description: "Calcula el rendimiento garantizado al vencimiento, los intereses brutos y la ganancia neta de impuestos de tus depósitos a plazo fijo y certificados (CD)."
metaDescription: "Simula cuánto ganarás con un depósito a plazo fijo o Certificado de Depósito (CD) a 3, 6, 12 o 36 meses. Calcula intereses brutos, retención fiscal y TAE."
metaKeywords: "calculadora depósito a plazo fijo, calculadora certificado de depósito CD, calcular intereses plazo fijo, simulador depósito bancario TAE, calculadora CDT"
faqs:
  - question: "¿Por qué conviene contratar un depósito a plazo fijo (CD) cuando los bancos centrales empiezan a bajar los tipos de interés?"
    answer: "Porque el depósito a plazo fijo blinda por contrato la tasa de interés pactada durante toda su vigencia (12, 24 o 36 meses). Mientras que las cuentas remuneradas a la vista recortan su remuneración inmediatamente tras una bajada de tipos del BCE o la Reserva Federal, el depósito te garantiza el tipo alto hasta el día de vencimiento."
  - question: "¿Puedo perder parte de mi capital inicial si cancelo un depósito a plazo fijo antes de tiempo?"
    answer: "En España y la Unión Europea, el Banco de España establece que la penalización o comisión por cancelación anticipada nunca puede superar el importe de los intereses brutos generados hasta esa fecha, por lo que tu capital inicial está 100 % garantizado. En EE. UU. y Latinoamérica, algunos CD aplican una penalización equivalente a entre 90 y 180 días de intereses."
  - question: "¿Por qué en un depósito a 2 o 3 años con pago de intereses al vencimiento la TAE es inferior al TIN?"
    answer: "La normativa de cálculo de la TAE asume que los intereses generados cada 12 meses se reinvierten. Si un depósito a 24 o 36 meses no abona los intereses anualmente, sino que los retiene sin capitalizar hasta el final del segundo o tercer año, la TAE matemática resulta ligeramente inferior al TIN nominal."
  - question: "¿Qué es una escalera de depósitos (CD Ladder) y para qué sirve?"
    answer: "Consiste en dividir tu ahorro en varios depósitos con vencimientos escalonados (por ejemplo, a 3, 6, 9 y 12 meses) en lugar de bloquear todo el capital en un único plazo largo. Así dispones de una ventana de liquidez libre de penalización cada trimestre sin renunciar a los tipos de interés de los plazos de un año."
  - question: "¿Cuánto retiene Hacienda sobre los intereses de un depósito bancario en España?"
    answer: "Los intereses tributan en la base del ahorro del IRPF por tramos progresivos: el 19 % para los primeros 6.000 € de rendimientos anuales, el 21 % entre 6.000 € y 50.000 €, el 23 % entre 50.000 € y 200.000 €, el 27 % entre 200.000 € y 300.000 €, y el 28 % a partir de 300.000 €. Los bancos españoles aplican por defecto la retención inicial del 19 % al liquidar."
---

Los **depósitos a plazo fijo** —denominados **Certificados de Depósito (CD)** en Estados Unidos, **CDT** en Colombia o **Pagarés Bancarios y CEDES** en México— son contratos financieros en los que entregas un capital a una entidad de crédito durante un plazo determinado (desde 1 mes hasta 5 años) a cambio de un tipo de interés fijo e inamovible. A diferencia de las cuentas de ahorro a la vista, cuya remuneración puede variar de un mes a otro, el depósito a plazo fijo garantiza exactamente cuántos euros o dólares recibirás en la fecha de vencimiento.

Esta calculadora determina el valor final al vencimiento, los intereses brutos devengados y la ganancia neta en tu bolsillo tras descontar impuestos, tanto para depósitos con liquidación única al vencimiento como para certificados con capitalización periódica.

## Fórmulas de rendimiento: Liquidación a vencimiento frente a capitalización compuesta

En la práctica bancaria coexisten dos métodos de cálculo según el contrato abone los intereses de una sola vez al finalizar el plazo o los capitalice periódicamente dentro del propio depósito:

### 1. Liquidación simple al vencimiento (estándar en plazos de 1 a 12 meses)
Las entidades calculan el interés bruto ($I_{\text{bruto}}$) aplicando la convención de días reales sobre año civil ($\text{ACT}/365$):

$$I_{\text{bruto}} = P \cdot \text{TIN} \cdot \frac{d}{365} \qquad \text{e} \qquad I_{\text{neto}} = I_{\text{bruto}} \cdot (1 - \tau)$$

### 2. Capitalización compuesta periódica (habitual en CDs plurianuales)
Cuando los intereses devengados cada mes o trimestre ($m$ veces al año) se suman al principal durante $t$ años para generar nuevos intereses, el valor final al vencimiento ($VF$) es:

$$VF = P \left(1 + \frac{\text{TIN}}{m}\right)^{m \cdot t} \qquad \text{donde} \qquad I_{\text{bruto}} = VF - P$$

Las variables empleadas son:

* **$P$**: Capital principal inmovilizado en el depósito.
* **$\text{TIN}$**: Tipo de Interés Nominal anual expresado en tanto por uno (por ejemplo, $0,035$ para el 3,50 %).
* **$d$**: Número exacto de días que dura la imposición (por ejemplo, 90, 182 o 365 días).
* **$m$**: Frecuencia de capitalización anual ($m = 12$ mensual, $m = 4$ trimestral, $m = 1$ anual).
* **$t$**: Duración del certificado expresada en años.
* **$\tau$**: Tipo de retención fiscal sobre rendimientos del capital mobiliario (por ejemplo, $0,19$ en el primer tramo de IRPF en España).

## Ejemplo numérico: Depósito de 40.000 € a 6, 12 y 24 meses (Bruto vs. Neto)

Supongamos que dispones de **40.000 €** (`USD 40,000`) que no vas a necesitar a corto plazo y evalúas un depósito al **3,50 % TIN** bajo tres plazos distintos, aplicando una retención fiscal del **19 %** ($\tau = 0,19$):

1. **Depósito a 6 meses (182 días) con pago al vencimiento**:
   * **Interés bruto**: $40.000 \times 0,035 \times (182 / 365) = 1.400 \times 0,498630 = \mathbf{698,08\text{ €}}$.
   * **Retención fiscal (19 %)**: $698,08 \times 0,19 = 132,64\text{ €}$.
   * **Interés neto y capital final**: Recibes **565,44 € limpios** (total al vencimiento: **40.565,44 €**).
2. **Depósito a 12 meses (365 días) con pago al vencimiento**:
   * **Interés bruto**: $40.000 \times 0,035 \times (365 / 365) = \mathbf{1.400,00\text{ €}}$.
   * **Retención fiscal (19 %)**: $1.400,00 \times 0,19 = 266,00\text{ €}$.
   * **Interés neto y capital final**: Recibes **1.134,00 € limpios** (total al vencimiento: **41.134,00 €**).
3. **Certificado (CD) a 24 meses (2 años) con capitalización trimestral ($m = 4$)**:
   * **Tasa trimestral**: $0,035 / 4 = 0,00875$ durante $4 \times 2 = 8\text{ trimestres}$.
   * **Valor final bruto ($VF$)**: $40.000 \times (1,00875)^8 = 40.000 \times 1,072189 = \mathbf{42.887,56\text{ €}}$.
   * **Interés bruto y ventaja compuesta**: Obtienes **2.887,56 € brutos** (**2.338,92 € netos** tras restar 548,64 € de impuestos), lo que supone **87,56 € adicionales** frente a un depósito sin capitalización trimestral.

## Cómo estructurar una Escalera de Depósitos (CD Ladder) de 40.000 €

El principal inconveniente de un plazo fijo a 12 o 24 meses es la falta de liquidez si surge una emergencia o si el banco prohíbe la cancelación anticipada. La estrategia de la **escalera de depósitos** divide el capital en cuatro tramos iguales para combinar alta rentabilidad con ventanas trimestrales de liquidez:

| Tramo del Capital | Importe Asignado | Plazo Inicial Contratado | TIN / TAE Orientativa | Interés Bruto en el Primer Ciclo | Qué Hacer al Vencer el Tramo |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Tramo 1 (Liquidez rápida)** | 10.000 € | 3 meses (90 días) | 3,10 % | 76,44 € | Si no necesitas el dinero, renueva a **12 meses** al tipo alto |
| **Tramo 2 (Liquidez media)** | 10.000 € | 6 meses (182 días) | 3,30 % | 164,55 € | Al vencer al 6.º mes, renueva a **12 meses** |
| **Tramo 3 (Puente anual)** | 10.000 € | 9 meses (273 días) | 3,40 % | 254,30 € | Al vencer al 9.º mes, renueva a **12 meses** |
| **Tramo 4 (Núcleo anual)** | 10.000 € | 12 meses (365 días) | 3,60 % | 360,00 € | Al cumplir el año, toda tu cartera rinde al tipo de **12 meses** con un vencimiento libre cada 90 días |

## Criterios clave antes de inmovilizar tus ahorros

* **Diferencia entre depósitos cancelables y no cancelables**: Muchos depósitos de banca extranjera contratados a través de plataformas europeas (como bancos de Italia, Lituania o Francia en Raisin) ofrecen las mayores TAE del mercado, pero **no admiten cancelación anticipada bajo ningún concepto** hasta el día exacto de vencimiento. Nunca destines tu fondo de emergencia primario a un depósito no cancelable.
* **Desactiva la renovación automática tácita**: Casi todos los bancos incluyen por defecto una cláusula de prórroga automática al vencimiento. Si no la desactivas al menos 5 días antes de que expire el plazo, el depósito se renovará por otro año entero, a menudo a un tipo de interés estándar muy inferior al promocional que contrataste inicialmente.
* **Respeta el límite de 100.000 € por entidad bancaria**: El Fondo de Garantía de Depósitos (FGD en Europa, o los USD 250,000 de la FDIC en EE. UU.) cubre la suma del principal más los intereses devengados. Si vas a invertir 100.000 €, deposita como máximo **95.000 € por banco** para que los intereses acumulados al vencimiento también queden dentro del paraguas de cobertura estatal.
