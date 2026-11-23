---
title: "Calculadora de Fechas"
metaTitle: "Calculadora de Fechas | Sumar, Restar y Días Entre Fechas"
description: "Calcule el número exacto de días, meses y años entre dos fechas, o sume y reste tiempo a una fecha específica con nuestra Calculadora de Fechas."
metaDescription: "Calculadora de fechas gratuita en línea. Calcule los días exactos entre dos fechas, cuente días hábiles o sume y reste años, meses y semanas."
metaKeywords: "calculadora de fechas, dias entre fechas, calcular dias, sumar dias a una fecha, restar dias, duracion entre fechas, dias habiles y naturales"
faqs:
  - question: "¿Cómo cuenta la calculadora los meses con distinta cantidad de días?"
    answer: "Al calcular intervalos por calendario o sumar meses, el motor respeta la longitud real de cada mes del calendario gregoriano (28, 29, 30 o 31 días). Si suma un mes a una fecha de fin de mes como el 31 de enero, el resultado se ajusta automáticamente al último día válido de febrero (28 o 29 según sea año bisiesto)."
  - question: "¿Qué diferencia hay entre días naturales y días hábiles?"
    answer: "Los días naturales (o días corridos) incluyen todos los días del calendario de lunes a domingo sin excepción. Los días hábiles o laborables excluyen los sábados, los domingos y, en el ámbito administrativo o judicial, los días festivos oficiales."
  - question: "¿Se incluye el día final al calcular la duración entre dos fechas?"
    answer: "Por convención matemática estándar, la diferencia entre dos fechas equivale a una resta simple donde se cuenta el número de períodos de 24 horas transcurridos (por ejemplo, del 1 al 5 del mismo mes hay 4 días). Si necesita contabilizar ambos extremos como jornadas completas, como ocurre en reservas de vacaciones o bajas médicas, debe activar la opción de incluir el día final para sumar 1 día al total."
  - question: "¿Cómo saber con certeza si un año es bisiesto?"
    answer: "Un año es bisiesto en el calendario gregoriano si es divisible exactamente entre 4, excepto los años seculares (terminados en 00), los cuales solo son bisiestos si además son divisibles entre 400. Por ello, los años 2000, 2024 y 2028 son bisiestos, mientras que 1900 y 2100 no lo son."
  - question: "¿Qué cambia si sumo 30 días en lugar de sumar 1 mes?"
    answer: "Sumar 1 mes conserva el mismo número de día en el mes siguiente (del 10 de marzo al 10 de abril, lo que representa 31 días reales), mientras que sumar 30 días añade exactamente treinta jornadas de 24 horas (del 10 de marzo al 9 de abril)."
---

La **Calculadora de Fechas** es una herramienta de cálculo cronológico diseñada para resolver operaciones exactas dentro del calendario gregoriano. A diferencia de los sistemas métricos decimales, el cómputo del tiempo civil combina unidades irregulares: meses que oscilan entre 28 y 31 días, semanas de 7 días que no dividen de forma exacta a los meses y años bisiestos que alteran la longitud anual cada cuatro años. Realizar estos conteos de forma manual en un almanaque suele provocar desfases de uno o dos días que resultan críticos en vencimientos contractuales, plazos procesales, liquidaciones de intereses o cronogramas de obra.

Este instrumento opera bajo dos modalidades complementarias: la **medición de intervalos entre dos fechas** (desglosando el resultado tanto en días totales absolutos como en años, meses, semanas y días compuestos) y la **aritmética de adición o sustracción temporal**, que permite proyectar una fecha futura o retroceder a una fecha pasada sumando o restando bloques específicos de tiempo.

## Fórmulas de cómputo cronológico y algoritmo del Día Juliano

Para determinar la distancia exacta entre una fecha inicial $(A_1, M_1, D_1)$ y una fecha final $(A_2, M_2, D_2)$ sin arrastrar errores por las irregularidades mensuales, la calculadora convierte cada fecha gregoriana a una escala lineal continua denominada **Número de Día Juliano** ($NDJ$) mediante división entera:

$$a = \left\lfloor \frac{14 - M}{12} \right\rfloor, \quad y = A + 4800 - a, \quad m = M + 12a - 3$$

$$NDJ = D + \left\lfloor \frac{153m + 2}{5} \right\rfloor + 365y + \left\lfloor \frac{y}{4} \right\rfloor - \left\lfloor \frac{y}{100} \right\rfloor + \left\lfloor \frac{y}{400} \right\rfloor - 32045$$

Una vez obtenidos los valores de serie de ambas fechas, la duración en días naturales ($\Delta D$) y la condición de año bisiesto se determinan mediante:

$$\Delta D = (NDJ_2 - NDJ_1) + I$$

$$\text{Bisiesto}(A) \iff (A \bmod 4 = 0 \land A \bmod 100 \neq 0) \lor (A \bmod 400 = 0)$$

### Definición de variables

* **$A$, $M$, $D$**: Año de cuatro dígitos, número del mes ($1$ a $12$) y día del mes evaluado.
* **$a$, $y$, $m$**: Coeficientes intermedios que desplazan el inicio lógico del año a marzo para situar a febrero al final del ciclo anual.
* **$\lfloor x \rfloor$**: Función piso (parte entera de la división, descartando decimales).
* **$NDJ_1$ y $NDJ_2$**: Número de Día Juliano de la fecha inicial y de la fecha final.
* **$I$**: Parámetro de inclusión del día final ($I = 0$ para cómputo exclusivo estándar; $I = 1$ cuando se contabilizan ambos días extremos).

## Ejemplos prácticos resueltos paso a paso

### Ejemplo 1: Días exactos entre dos fechas en año bisiesto

Se firma un contrato de suministro el **15 de enero de 2024** con liquidación el **10 de mayo de 2024**, y se requiere conocer los días naturales devengados.

1. **Verificación de año bisiesto**: Como $2024$ es divisible entre $4$ ($2024 \div 4 = 506$) y no es secular, febrero de 2024 tiene **$29\text{ días}$**.
2. **Días restantes de enero**: Excluyendo el día inicial, restan $31 - 15 = 16\text{ días}$.
3. **Meses intermedios y mes final**: Se suman febrero ($29$), marzo ($31$), abril ($30$) y los $10\text{ días}$ de mayo:
   $$\Delta D = 16 + 29 + 31 + 30 + 10 = 116\text{ días naturales}$$
   Este intervalo equivale a **$16\text{ semanas y } 4\text{ días}$**, o por calendario a **3 meses y 25 días** (del 15 de enero al 15 de abril hay 3 meses; del 15 de abril al 10 de mayo hay 25 días). Con inclusión de ambos extremos ($I=1$), suma **$117\text{ días}$**.

### Ejemplo 2: Suma de un plazo compuesto a una fecha inicial

Para proyectar el vencimiento de una garantía sumando **1 año, 3 meses y 20 días** al **18 de noviembre de 2025**:

1. **Años y meses**: Sumar $1\text{ año}$ lleva al 18 de noviembre de 2026; añadir $3\text{ meses}$ sitúa la fecha en el **18 de febrero de 2027**.
2. **Días**: Como $2027$ no es bisiesto, febrero tiene $28\text{ días}$. Completar febrero consume $28 - 18 = 10\text{ días}$, y los $10\text{ días}$ restantes conducen al **10 de marzo de 2027**.

## Tabla de referencia del calendario gregoriano

| Trimestre / Meses | Duración real en días | Días acumulados (Normal / Bisiesto) | Base comercial 30/360 |
| :--- | :---: | :---: | :---: |
| **Enero / Febrero / Marzo** | $31 / 28\text{ o }29 / 31$ | $31 / 59\text{ (60)} / 90\text{ (91)}$ | $30\text{ días por mes (90 trimestrales)}$ |
| **Abril / Mayo / Junio** | $30 / 31 / 30$ | $120\text{ (121)} / 151\text{ (152)} / 181\text{ (182)}$ | $30\text{ días por mes (180 semestrales)}$ |
| **Julio / Agosto / Septiembre** | $31 / 31 / 30$ | $212\text{ (213)} / 243\text{ (244)} / 273\text{ (274)}$ | $30\text{ días por mes (270 acumulados)}$ |
| **Octubre / Noviembre / Diciembre** | $31 / 30 / 31$ | $304\text{ (305)} / 334\text{ (335)} / 365\text{ (366)}$ | $30\text{ días por mes (360 anuales)}$ |

## Aplicaciones jurídicas, financieras y errores frecuentes

* **Cómputo de plazos legales**: En derecho administrativo y procesal rige el principio *dies a quo non computatur in termino* (el día de notificación no se cuenta y el cómputo inicia al día siguiente) y *dies ad quem computatur* (el día de vencimiento se incluye completo). Los plazos fijados en días suelen referirse a **días hábiles**, mientras que los plazos en meses o años se cuentan de fecha a fecha en días naturales.
* **Devengo de intereses bancarios**: En las bases *Actual/360* y *Actual/365*, los intereses se liquidan multiplicando el capital por los días naturales exactos transcurridos entre el desembolso y el reembolso.
* **Error de inclusión (*off-by-one*)**: Una estancia del 10 al 15 de agosto comprende **$5\text{ noches}$** ($15 - 10 = 5$), pero abarca **$6\text{ días}$** si se cuentan tanto la jornada de llegada como la de salida.
* **Desbordamiento de fin de mes**: Sumar $1\text{ mes}$ al 31 de enero de 2026 ajusta la fecha al 28 de febrero; si luego suma otro mes obtendrá el 28 de marzo, mientras que sumar $2\text{ meses}$ directamente al 31 de enero arroja el **31 de marzo**. Introduzca siempre el plazo completo en una sola operación.
