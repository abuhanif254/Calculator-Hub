---
title: "Calculadora RMD (Distribución Mínima Requerida)"
metaTitle: "Calculadora RMD | Distribuciones Mínimas Requeridas del IRS"
description: "Calcula tu Distribución Mínima Requerida (RMD) con precisión. Conoce las edades vigentes de la Ley SECURE 2.0, las tablas de esperanza de vida del IRS y evita la penalización fiscal del 25%."
metaDescription: "Calcula gratis tu RMD para cuentas IRA tradicional o 401(k). Conoce los cambios de edad de la Ley SECURE 2.0 y evita penalizaciones del IRS."
metaKeywords: "calculadora rmd, distribucion minima requerida, rmd irs, secure act 2.0, retiro cuenta ira, 401k rmd, tabla de esperanza de vida irs"
faqs:
  - question: "¿Qué es una Distribución Mínima Requerida (RMD) y a qué cuentas aplica?"
    answer: "Una Distribución Mínima Requerida (RMD) es el importe mínimo que el Servicio de Impuestos Internos (IRS) de EE. UU. obliga a retirar anualmente de las cuentas de jubilación con impuestos diferidos, incluyendo cuentas IRA Tradicionales, SEP IRA, SIMPLE IRA, 401(k), 403(b) y planes 457(b), una vez que el titular alcanza la edad legal reglamentaria."
  - question: "¿A qué edad comienzan las RMD según la Ley SECURE 2.0?"
    answer: "Bajo la Ley SECURE 2.0, la edad obligatoria de inicio es de 73 años para las personas nacidas entre el 1 de enero de 1951 y el 31 de diciembre de 1959, y se eleva a los 75 años para quienes hayan nacido el 1 de enero de 1960 o en una fecha posterior."
  - question: "¿Cuál es la penalización del IRS por no retirar la RMD antes de la fecha límite?"
    answer: "La Ley SECURE 2.0 redujo el impuesto especial por omisión del 50 % al 25 % sobre la fracción no retirada a tiempo. Además, si el contribuyente corrige el déficit dentro de la ventana de subsanación y presenta el Formulario 5329, la multa se reduce automáticamente al 10 %."
  - question: "¿Están las cuentas Roth IRA y Roth 401(k) sujetas a retiros mínimos obligatorios?"
    answer: "No. Las cuentas Roth IRA nunca han exigido retiros mínimos durante la vida del titular original. Asimismo, a partir del año fiscal 2024, la Ley SECURE 2.0 eliminó por completo las RMD en vida para las cuentas Roth designadas dentro de planes de empleador como Roth 401(k) y Roth 403(b)."
  - question: "¿Puedo sumar las RMD de varias cuentas y retirar el total desde una sola?"
    answer: "Depende del tipo de plan. Si posees múltiples cuentas IRA Tradicionales, debes calcular la RMD de cada una por separado, pero puedes sumar los montos y retirar el total desde una sola IRA. Por el contrario, en los planes 401(k), la RMD de cada plan debe calcularse y retirarse individualmente de su respectiva cuenta 401(k)."
---

## Marco Normativo de las Distribuciones Mínimas Requeridas (RMD)

Durante la etapa activa de ahorro laboral, los planes de jubilación tradicionales en los Estados Unidos permiten deducir las aportaciones de la base imponible y capitalizar los rendimientos con diferimiento fiscal. No obstante, el Servicio de Impuestos Internos (**IRS**) establece un límite temporal a ese beneficio mediante las **Distribuciones Mínimas Requeridas** (**RMD**). Al alcanzar la edad legal, el titular debe extraer cada año una fracción creciente de su saldo acumulado e integrarla como ingreso ordinario sujeto al impuesto sobre la renta.

Con la entrada en vigor de la **Ley SECURE 2.0**, el calendario de retiro obligatorio experimentó una reforma estructural: la edad de inicio se sitúa en **73 años** para los nacidos entre 1951 y 1959, y ascenderá a **75 años** a partir de 2033 para los nacidos en 1960 o después. Nuestra **Calculadora RMD** aplica las tablas actuariales oficiales de la **Publicación 590-B del IRS** para determinar con exactitud tu retiro anual obligatorio y planificar tu carga tributaria.

## Fórmula Oficial del IRS y Selección de la Tabla de Esperanza de Vida

El cálculo anual de la distribución mínima obligatoria se obtiene dividiendo el patrimonio de cierre del ejercicio previo entre el factor actuarial correspondiente a la edad que el titular cumple durante el año fiscal en curso:

$$\text{RMD}_t = \frac{S_{31\text{-dic}-(t-1)}}{F_e}$$

Donde los parámetros de la ecuación corresponden a:
* **$\text{RMD}_t$**: Monto bruto mínimo que debe retirarse antes del 31 de diciembre del año fiscal $t$ (en USD $\$$).
* **$S_{31\text{-dic}-(t-1)}$**: Saldo total de cierre de la cuenta al **31 de diciembre del año calendario anterior** ($t - 1$).
* **$F_e$**: Factor de período de distribución (esperanza de vida en años) asignado por el IRS según la edad $e$ que el titular cumple en el año $t$.

### ¿Qué Tabla Actuarial del IRS Debes Utilizar?

El IRS publica tres tablas oficiales dentro del Apéndice B de la Publicación 590-B:
1. **Tabla III (Tabla Uniforme de Vida):** Aplicable a la mayoría de los jubilados: titulares solteros, casados cuyo cónyuge no es más de 10 años menor, o cuando el cónyuge no es el único beneficiario primario durante todo el año.
2. **Tabla II (Esperanza de Vida Conjunta y del Último Sobreviviente):** Exclusiva para titulares cuyo único beneficiario primario durante todo el año es su cónyuge y dicho cónyuge es **más de 10 años menor**. Otorga un divisor mayor y reduce el retiro obligatorio anual.
3. **Tabla I (Esperanza de Vida Individual):** Reservada para beneficiarios que calculan retiros sobre cuentas IRA heredadas.

## Ejemplo Práctico Paso a Paso: Cálculo Individual y Excepción de Cónyuge Joven

Analicemos dos escenarios verificados para un jubilado que cumple **74 años** en el año fiscal actual y cuyo saldo de cierre en su cuenta IRA Tradicional al 31 de diciembre pasado fue de **$S = \$485,000.00$ USD**.

### Escenario A: Aplicación Estándar de la Tabla Uniforme de Vida (Tabla III)
El titular está casado con una persona de 72 años (diferencia menor a 10 años), por lo que aplica la **Tabla III**:
1. Para la edad de **74 años**, el factor oficial vigente del IRS es **$F_{74} = 25.5$**.
2. Se divide el saldo al 31 de diciembre entre el factor actuarial:
   $$\text{RMD} = \frac{\$485,000.00}{25.5} = \$19,019.61\text{ USD}$$
3. Esto equivale a una tasa de retiro obligatorio del **$3.9216\%$** sobre el saldo de la cuenta.

### Escenario B: Excepción con Cónyuge Más de 10 Años Menor (Tabla II)
Si el mismo titular de **74 años** con **$\$485,000.00$ USD** tiene como única beneficiaria primaria durante todo el año a su esposa, quien cumple **60 años** este año (14 años menor):
1. En la **Tabla II del IRS**, la intersección de **74 años y 60 años** arroja un factor conjunto de **$F_{74,60} = 28.1$**.
2. Se ejecuta la división reglamentaria:
   $$\text{RMD}_{\text{conjunto}} = \frac{\$485,000.00}{28.1} = \$17,259.79\text{ USD}$$
3. Gracias a la Tabla II, el jubilado reduce su retiro imponible obligatorio en **$\$1,759.82$ USD** ese año.

## Tabla de Referencia del IRS: Factores de la Tabla Uniforme de Vida (Tabla III)

Resumen de los factores oficiales de la **Tabla Uniforme de Vida del IRS**, porcentaje equivalente de retiro y monto anual para una cartera de **$\$500,000$ USD**:

| Edad del Titular | Factor del IRS ($F_e$) | Porcentaje del Saldo ($\%$) | RMD para Saldo de $\$500,000$ |
| :--- | :--- | :--- | :--- |
| **73 años** (Inicio Ley SECURE 2.0) | $26.5$ | $3.7736\%$ | $\$18,867.92$ |
| **74 años** | $25.5$ | $3.9216\%$ | $\$19,607.84$ |
| **75 años** (Nacidos $\ge 1960$) | $24.6$ | $4.0650\%$ | $\$20,325.20$ |
| **76 años** | $23.7$ | $4.2194\%$ | $\$21,097.05$ |
| **78 años** | $22.0$ | $4.5455\%$ | $\$22,727.27$ |
| **80 años** | $20.2$ | $4.9505\%$ | $\$24,752.48$ |
| **85 años** | $16.0$ | $6.2500\%$ | $\$31,250.00$ |
| **90 años** | $12.2$ | $8.1967\%$ | $\$40,983.61$ |
| **95 años** | $8.9$ | $11.2360\%$ | $\$56,179.78$ |

## Plazos Críticos, Estrategias Fiscales y Errores a Evitar

* **La trampa fiscal del primer aplazamiento (1 de abril):** Para tu **primera RMD**, el IRS permite posponer el retiro hasta el **1 de abril del año siguiente** al que cumples 73 años. Sin embargo, si postergas ese primer retiro hasta el año siguiente, deberás retirar **dos RMD dentro del mismo año fiscal** (la primera diferida más la segunda que vence el 31 de diciembre), lo que puede impulsarte a un tramo impositivo marginal superior, gravar mayor porcentaje del Seguro Social y encarecer las primas mensuales de Medicare Parte B y Parte D.
* **Distribuciones Caritativas Calificadas (QCD):** A partir de los $70\frac{1}{2}$ años puedes transferir fondos directamente desde tu custodia de IRA Tradicional a una entidad benéfica calificada; la donación cubre tu RMD anual dólar por dólar y se excluye por completo de tu Ingreso Bruto Ajustado (AGI).
* **Excepción por continuidad laboral:** Si sigues trabajando a los 73 años o más y no posees más del $5\%$ de la empresa empleadora, la mayoría de los planes 401(k) corporativos permiten diferir las RMD de ese plan activo hasta el 1 de abril posterior a tu retiro efectivo.
