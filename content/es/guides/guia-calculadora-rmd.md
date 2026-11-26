---
title: "Entendiendo las RMD: No Pierda el 25% de su Jubilación"
description: "Guía fiscal y matemática sobre las Distribuciones Mínimas Requeridas (RMD) del IRS, edades de inicio bajo SECURE 2.0, cálculo con la Tabla Uniforme de Vida y reducción de multas."
category: "Finance"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "rmd-calculator"
faqs:
  - question: "¿A qué edad debo comenzar a retirar mis Distribuciones Mínimas Requeridas (RMD)?"
    answer: "Bajo la ley SECURE 2.0, las personas nacidas entre 1951 y 1959 deben iniciar sus RMD al cumplir 73 años. Quienes nacieron en 1960 o después comenzarán a los 75 años. Su primera RMD puede aplazarse hasta el 1 de abril del año siguiente, aunque ello obligará a realizar dos retiros en ese mismo año calendario."
  - question: "¿Qué cuentas están sujetas a RMD y cuáles están exentas?"
    answer: "Están sujetas las cuentas IRA tradicionales, SEP IRA, SIMPLE IRA y los planes laborales pre-impuestos como 401(k), 403(b) y 457(b). Desde 2024, las cuentas Roth 401(k) quedaron exentas de RMD en vida del titular, igualándose así con las cuentas Roth IRA y las cuentas HSA."
  - question: "¿De cuánto es la multa del IRS si olvido retirar mi RMD a tiempo?"
    answer: "La ley SECURE 2.0 redujo el impuesto especial del 50% histórico al 25% sobre el monto de la RMD que no fue retirado dentro del plazo. Si el contribuyente corrige el error retirando el faltante y presentando el Formulario 5329 dentro de la ventana de corrección oportuna, la penalidad se reduce al 10%."
  - question: "¿Cómo influyen los límites de aporte de 2026 en la planificación previa a las RMD?"
    answer: "En 2026, el IRS permite aportar hasta $24,500 a un plan 401(k) o 403(b), $7,500 a una cuenta IRA y $4,400 individual o $8,750 familiar a una HSA. Combinar aportes pre-impuestos con contribuciones Roth y cuentas HSA exentas de RMD reduce el saldo sujeto a retiros obligatorios tras los 73 años."
  - question: "¿Puedo sumar varias cuentas IRA para hacer un solo retiro de RMD?"
    answer: "Sí para cuentas IRA tradicionales: debe calcular la RMD de cada IRA por separado, pero puede retirar la suma total desde una sola o varias de sus IRA tradicionales. En cambio, cada plan 401(k) o 457(b) exige retirar su RMD específica de manera independiente desde ese mismo plan."
---

Las **Distribuciones Mínimas Requeridas (RMD)** son los retiros anuales obligatorios que el IRS exige extraer de las cuentas de jubilación con impuestos diferidos una vez alcanzada la edad estatutaria. Su finalidad tributaria es evitar el diferimiento indefinido sobre saldos en planes 401(k), 403(b) e IRA tradicionales, convirtiendo parte del ahorro en ingreso ordinario gravable cada año.

Omitir o calcular mal este retiro activa una sanción severa: un **impuesto especial del 25%** sobre el monto no retirado antes del 31 de diciembre (reducible al 10% con corrección rápida). Para determinar su cifra exacta sin conjeturas, utilice la [Calculadora de RMD](/es/calculadoras/calculadora-rmd) con su saldo certificado del 31 de diciembre anterior y su año de nacimiento.

## Reglas de Edad bajo SECURE 2.0 y Fórmula Oficial del IRS

La ley **SECURE 2.0** estableció dos edades de inicio según el año de nacimiento:

- **Nacidos entre 1951 y 1959:** Deben iniciar sus RMD a los **73 años**.
- **Nacidos en 1960 o después:** Deben iniciar sus RMD a los **75 años**.

Para la **primera RMD**, existe una prórroga única hasta el **1 de abril del año siguiente** al de cumplir la edad de inicio. Sin embargo, usar esa prórroga obliga a tomar dos RMD en el segundo año fiscal (la diferida y la del año corriente), elevando su tramo tributario y posibles recargos en primas de Medicare (IRMAA). Todas las RMD posteriores vencen estrictamente el **31 de diciembre**.

La ecuación oficial divide el saldo de cierre del año anterior entre el factor actuarial asignado por el IRS en la **Tabla Uniforme de Vida** (Publicación 590-B, Tabla III):

```text
RMD_año = Saldo_31_Dic_Anterior / Factor_Esperanza_Vida
```

Parámetros y excepciones clave:

- **Saldo_31_Dic_Anterior:** Valor de mercado al 31 de diciembre del año fiscal previo.
- **Factor_Esperanza_Vida:** Divisor según su edad al final del año en curso. Si su cónyuge es el único beneficiario y es **más de 10 años menor**, se usa la **Tabla II de Vida Conjunta**, que reduce la RMD obligatoria.
- **Excepción laboral:** Si continúa empleado sin poseer más del 5% de la empresa, muchos planes 401(k) permiten diferir su RMD hasta el retiro definitivo.

## Cálculo Paso a Paso y Escenario de Penalización

Suponga que cumple **75 años** este año (nacido en 1951, ya en fase de retiro obligatorio) y su IRA tradicional cerró el 31 de diciembre pasado en **$600,000**.

1. **Factor aplicable:** En la Tabla Uniforme de Vida, a los 75 años corresponde un factor de **`24.6`**.
2. **Cálculo de la RMD:** `RMD = 600,000 / 24.6 = $24,390.24` (`4.07%` del saldo inicial).
3. **Impacto fiscal:** Con una tasa marginal efectiva del `22%`, este retiro genera `$5,365.85` en impuestos sobre la renta, incluso si reinvierte el dinero en una cuenta gravable.
4. **Multa por omisión (25%):** Si no retira nada antes del 31 de diciembre, la multa estándar asciende a `24,390.24 × 0.25 = $6,097.56`, además de tener que retirar igualmente los `$24,390.24`.
5. **Multa corregida (10%):** Si corrige el faltante y presenta el **Formulario 5329** dentro de la ventana de corrección oportuna, la penalidad baja a **`$2,439.02`**, pudiendo solicitar exención total si acredita causa razonable.

## Evolución de las RMD según Edad (Saldo Base de $600,000)

La tabla muestra cómo aumenta el porcentaje obligatorio conforme disminuye el factor del IRS, manteniendo constante un saldo de `$600,000`:

| Edad | Factor IRS (Tabla III) | % del Saldo | RMD Anual | Multa (`25%`) | Multa Corregida (`10%`) |
| --- | --- | --- | --- | --- | --- |
| **73 años** | `26.5` | `3.77%` | `$22,641.51` | `$5,660.38` | `$2,264.15` |
| **74 años** | `25.5` | `3.92%` | `$23,529.41` | `$5,882.35` | `$2,352.94` |
| **75 años** | `24.6` | `4.07%` | `$24,390.24` | `$6,097.56` | `$2,439.02` |
| **78 años** | `22.0` | `4.55%` | `$27,272.73` | `$6,818.18` | `$2,727.27` |
| **80 años** | `20.2` | `4.95%` | `$29,702.97` | `$7,425.74` | `$2,970.30` |
| **85 años** | `16.0` | `6.25%` | `$37,500.00` | `$9,375.00` | `$3,750.00` |
| **90 años** | `12.2` | `8.20%` | `$49,180.33` | `$12,295.08` | `$4,918.03` |

Entre los 73 y los 90 años, el porcentaje de extracción más que se duplica (`3.77%` frente a `8.20%`), incrementando la presión fiscal si la cartera continúa creciendo.

## Estrategias Fiscales, Errores Comunes y Cautelas

La gestión eficiente de las RMD inicia durante la etapa acumulativa. En **2026**, los límites estatutarios del IRS ascienden a **$24,500** para planes 401(k)/403(b), **$7,500** para cuentas IRA y **$4,400** (individual) o **$8,750** (familiar) para cuentas HSA. Asignar parte de estos aportes a cuentas **Roth** o **HSA** crea patrimonio exento de RMD en vida del titular.

Para reducir el impacto fiscal tras la jubilación considere cuatro puntos críticos:

- **Conversiones Roth escalonadas:** Transferir fondos de una IRA tradicional a una Roth IRA entre el retiro y los 73 o 75 años aprovecha tramos bajos y reduce el saldo futuro sujeto a RMD.
- **Distribuciones Caritativas Calificadas (QCD):** Desde los **70 años y medio**, donar directamente desde una IRA hacia organizaciones benéficas elegibles satisface la RMD sin sumarse a su ingreso gravable.
- **Reglas de agregación:** Puede sumar varias IRA tradicionales y retirar el total desde una sola IRA, pero cada plan **401(k) o 457(b)** exige retirar su RMD individualmente; mezclar cuentas de distinto tipo incumple la norma.
- **Plazos de liquidación:** Si posee activos ilíquidos en una IRA autodirigida o vende valores en diciembre, ejecute las órdenes con al menos dos semanas de margen para garantizar que la distribución liquide antes del 31 de diciembre.
