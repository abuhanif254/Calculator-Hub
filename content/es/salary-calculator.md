---
title: "Calculadora de Salario"
metaTitle: "Calculadora de Salario | Conversor de Sueldo Anual y Hora"
description: "Convierte tu salario bruto entre tarifas por hora, diarias, semanales, quincenales, mensuales y anuales ajustando tu jornada laboral y días festivos."
metaDescription: "Convierte fácilmente tu salario entre tarifas por hora, diarias, semanales, quincenales, mensuales y anuales ajustando horas y vacaciones."
metaKeywords: "calculadora de salario, conversor de sueldo, salario anual a mensual, calcular tarifa por hora, sueldo bruto en 12 o 14 pagas, ingreso quincenal"
faqs:
  - question: "¿Cuántas horas laborables tiene un año estándar a jornada completa?"
    answer: "Con una jornada de 40 horas semanales durante las 52 semanas del año, el estándar de referencia es de 2.080 horas anuales antes de descontar vacaciones y festivos no remunerados."
  - question: "¿Cuál es la diferencia entre el pago quincenal y el pago bisemanal?"
    answer: "El pago quincenal se abona dos veces al mes (24 nóminas al año, típicamente los días 15 y 30), mientras que el pago bisemanal se realiza cada dos semanas (26 pagos al año), lo que genera dos meses con tres cobros."
  - question: "¿Cómo afecta el esquema de 12 versus 14 pagas al sueldo mensual en España?"
    answer: "A igual salario bruto anual, el sistema de 14 pagas divide el total anual entre 14 para abonar dos pagas extraordinarias (verano y Navidad), resultando en un ingreso mensual ordinario inferior al de 12 pagas prorrateadas."
  - question: "¿Cómo debo comparar una tarifa como autónomo o freelance con un salario en nómina?"
    answer: "Al evaluar una tarifa por hora como trabajador independiente, debes restar los días de vacaciones y festivos no facturables (calculando sobre unas 1.760 a 1.840 horas reales al año) y descontar las cuotas de seguridad social y gastos operativos."
  - question: "¿Por qué no basta con multiplicar el salario semanal por cuatro para obtener el sueldo mensual?"
    answer: "Un mes promedio no tiene exactamente cuatro semanas (28 días), sino 4,333 semanas (52 semanas divididas entre 12 meses). Multiplicar por cuatro subestima tu ingreso mensual real en aproximadamente un 7,7 %."
---

Evaluar una oferta de empleo, negociar un aumento o fijar tarifas como profesional independiente exige traducir cualquier cifra remunerativa a una base temporal homogénea. Nuestra **Calculadora de Salario** convierte al instante tu remuneración bruta entre tarifa por hora, jornada diaria, ciclo semanal, pago bisemanal, nómina quincenal, sueldo mensual y cómputo anual, permitiendo ajustar las horas trabajadas por semana y descontar días de vacaciones o festivos no remunerados.

Tanto en España como en Latinoamérica y Estados Unidos, las empresas expresan la compensación bajo convenciones distintas: mientras los contratos corporativos suelen negociarse en salario bruto anual (en 12 o 14 pagas) o sueldo mensual fijo, los contratos técnicos o por servicios se pactan por hora o quincena. Comprender la equivalencia matemática entre estos intervalos evita distorsiones al presupuestar gastos familiares o comparar propuestas laborales de diferentes sectores.

## Fórmulas Fundamentales de Conversión Salarial

El cálculo estándar parte del calendario laboral de **52 semanas por año** ($260\text{ días}$ laborables en semanas de cinco jornadas). En un contrato asalariado con vacaciones y festivos pagados, el salario bruto anual sin ajustes ($S_{\text{anual}}$) se determina mediante:

$$S_{\text{anual}} = T_{\text{hora}} \times H_{\text{semana}} \times 52$$

Cuando el profesional cobra únicamente por hora o jornada efectiva trabajada y no percibe ingresos durante vacaciones o feriados oficiales, se calcula el salario anual ajustado ($S_{\text{ajustado}}$):

$$S_{\text{ajustado}} = T_{\text{hora}} \times \left(\frac{H_{\text{semana}}}{D_{\text{semana}}}\right) \times \left[ (D_{\text{semana}} \times 52) - (D_{\text{vac}} + D_{\text{fest}}) \right]$$

Donde las variables representan:
* **$T_{\text{hora}}$**: Tarifa o remuneración bruta por hora trabajada (en `€` o `$`).
* **$H_{\text{semana}}$**: Horas ordinarias trabajadas por semana (habitualmente entre $37,5$ y $48\text{ horas}$ según convenio colectivo o legislación nacional).
* **$D_{\text{semana}}$**: Días laborables por semana (estándar de $5\text{ días}$ en oficina o $6\text{ días}$ en comercio).
* **$D_{\text{vac}}$ y $D_{\text{fest}}$**: Días laborables de vacaciones y días festivos anuales no remunerados.

A partir del monto anual ($S_{\text{anual}}$ o $S_{\text{ajustado}}$), se obtienen las equivalencias periódicas exactas:
* **Sueldo Diario** ($260\text{ días}$): $S_{\text{diario}} = \frac{S_{\text{anual}}}{52 \times D_{\text{semana}}}$
* **Sueldo Semanal** ($52\text{ semanas}$): $S_{\text{semanal}} = \frac{S_{\text{anual}}}{52}$
* **Sueldo Bisemanal** ($26\text{ pagos}$ al año): $S_{\text{bisemanal}} = \frac{S_{\text{anual}}}{26}$
* **Sueldo Quincenal** ($24\text{ pagos}$ al año): $S_{\text{quincenal}} = \frac{S_{\text{anual}}}{24}$
* **Sueldo Mensual en 12 o 14 pagas**: $S_{\text{mensual, 12}} = \frac{S_{\text{anual}}}{12}$ y $S_{\text{mensual, 14}} = \frac{S_{\text{anual}}}{14}$

## Ejemplo Práctico Paso a Paso: De Tarifa por Hora a Sueldo Anual

Supongamos que un consultor tecnológico analiza dos ofertas con una tarifa base de **$25,00\text{ €}$ por hora** para una jornada estándar de $H_{\text{semana}} = 40\text{ horas}$ repartidas en $D_{\text{semana}} = 5\text{ días}$ ($8\text{ horas}$ diarias).

### Escenario A: Contrato en nómina con vacaciones pagadas
En un contrato indefinido donde se remuneran las 52 semanas del año ($2.080\text{ horas}$):
1. **Salario anual bruto**: $S_{\text{anual}} = 25,00\text{ €} \times 40 \times 52 = 52.000,00\text{ €}$.
2. **Sueldo mensual en 12 pagas**: $S_{\text{mensual, 12}} = \frac{52.000,00\text{ €}}{12} = 4.333,33\text{ €}$ brutos al mes.
3. **Sueldo mensual en 14 pagas**: $S_{\text{mensual, 14}} = \frac{52.000,00\text{ €}}{14} = 3.714,29\text{ €}$ por mes ordinario, más dos pagas extraordinarias (verano y Navidad) de $3.714,29\text{ €}$ cada una.
4. **Pago quincenal vs. bisemanal**: En nómina quincenal percibe $\frac{52.000,00\text{ €}}{24} = 2.166,67\text{ €}$ dos veces al mes; en ciclo bisemanal cobra $\frac{52.000,00\text{ €}}{26} = 2.000,00\text{ €}$ cada catorce días.

### Escenario B: Contrato por horas sin días libres remunerados
Si factura solo las horas efectivas trabajadas y descansa $D_{\text{vac}} = 22\text{ días}$ laborables de vacaciones más $D_{\text{fest}} = 12\text{ días}$ festivos al año ($34\text{ días}$ no facturables):
1. **Días y horas efectivas**: $260 - 34 = 226\text{ días}$ laborables, equivalentes a $226 \times 8 = 1.808\text{ horas}$ reales facturadas.
2. **Ingreso anual ajustado**: $S_{\text{ajustado}} = 25,00\text{ €} \times 1.808 = 45.200,00\text{ €}$ (media mensual de $3.766,67\text{ €}$ dividida en 12 meses).
3. **Diferencia efectiva**: Los $34\text{ días}$ sin remuneración reducen el ingreso anual en **$6.800,00\text{ €}$** (un $13,08\text{ \%}$ menos que el contrato en nómina).

## Tabla de Equivalencias Salariales (40 Horas Semanales / 2.080 Horas Anuales)

Conversión directa de sueldos brutos sin días descontados (importes aplicables tanto en `€` como en `$`):

| Tarifa Hora | Diario (8 h) | Semanal (40 h) | Quincenal (24) | Mensual (12 Pagas) | Mensual (14 Pagas) | Anual Bruto |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **12,00** | 96,00 | 480,00 | 1.040,00 | 2.080,00 | 1.782,86 | **24.960,00** |
| **15,00** | 120,00 | 600,00 | 1.300,00 | 2.600,00 | 2.228,57 | **31.200,00** |
| **20,00** | 160,00 | 800,00 | 1.733,33 | 3.466,67 | 2.971,43 | **41.600,00** |
| **25,00** | 200,00 | 1.000,00 | 2.166,67 | 4.333,33 | 3.714,29 | **52.000,00** |
| **30,00** | 240,00 | 1.200,00 | 2.600,00 | 5.200,00 | 4.457,14 | **62.400,00** |
| **40,00** | 320,00 | 1.600,00 | 3.466,67 | 6.933,33 | 5.942,86 | **83.200,00** |

## Particularidades de Nómina y Consejos Prácticos

* **Esquema de 12 o 14 pagas y prestaciones legales**: En España el salario bruto anual suele distribuirse en 14 pagas o en 12 mensualidades con extras prorrateadas. En Latinoamérica el sueldo se pacta por mes y la legislación añade prestaciones anuales obligatorias como el *aguinaldo* en México (mínimo 15 días de salario), la *prima de servicios* en Colombia (30 días al año) o el *Sueldo Anual Complementario (SAC)* en Argentina (un sueldo mensual adicional dividido en junio y diciembre).
* **No multipliques el salario semanal por 4**: El factor exacto entre semanas y meses es $\frac{52}{12} = 4,3333$. Multiplicar el pago semanal por $4$ omite $4\text{ semanas}$ enteras de ingresos al año.
* **Ajusta tu tarifa de equilibrio como autónomo (*freelance*)**: Para igualar un sueldo bruto en nómina de $41.600\text{ €}$ ($20,00\text{ €/h}$ nominales), un trabajador independiente debe absorber unos $30\text{ a }35\text{ días}$ no facturables al año y sus cuotas de seguridad social, requiriendo fijar su tarifa comercial por hora entre un $35\text{ \%}$ y un $50\text{ \%}$ por encima de la tarifa asalariada.
* **Descuenta tiempos y gastos de transporte**: Si un empleo presencial paga $30.000\text{ €}$ anuales por $40\text{ horas}$ semanales pero exige $10\text{ horas}$ semanales de traslado y $1.800\text{ €}$ al año en transporte, tu remuneración efectiva cae de $14,42\text{ €/h}$ a $\frac{28.200\text{ €}}{2.600\text{ h}} = 10,85\text{ €/h}$ de tiempo real dedicado.
