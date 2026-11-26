---
title: "Las Matemáticas de los Bienes Raíces: Cómo Analizar una Propiedad"
description: "Guía cuantitativa para analizar propiedades de alquiler: Ingreso Operativo Neto (NOI), tasa de capitalización (Cap Rate), flujo de caja, retorno sobre efectivo (CoC) y análisis de sensibilidad."
category: "Finance"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "rental-property-calculator"
relatedType: "calculator"
faqs:
  - question: "¿Por qué la cuota hipotecaria no se incluye dentro del Ingreso Operativo Neto (NOI)?"
    answer: "El NOI mide la rentabilidad intrínseca del inmueble con independencia de cómo se financie su compra. Excluir el pago de capital e intereses permite comparar propiedades en igualdad de condiciones mediante la tasa de capitalización, ya que dos compradores pueden adquirir el mismo activo con distinto apalancamiento o totalmente en efectivo."
  - question: "¿Sigue siendo viable la Regla del 1% en mercados con precios elevados?"
    answer: "En áreas metropolitanas de alta demanda resulta difícil hallar viviendas cuyo alquiler mensual alcance el 1% del precio de compra. Debe usarse únicamente como filtro preliminar: un inmueble al 0.8% con impuestos bajos puede dar flujo positivo, mientras que uno al 1.2% con impuestos altos o fuerte rotación puede perder dinero."
  - question: "¿Qué diferencia existe entre mantenimiento ordinario y reserva de gastos de capital (CapEx)?"
    answer: "El mantenimiento ordinario cubre reparaciones recurrentes menores, como plomería básica, pintura entre inquilinos o cerraduras. La reserva de gastos de capital (CapEx) provisiona sustituciones estructurales costosas de vida útil larga, como techo, climatización, calentador de agua o electrodomésticos principales."
  - question: "¿Cuál es un retorno sobre el efectivo (Cash-on-Cash) razonable para una propiedad de alquiler?"
    answer: "En mercados estabilizados con hipoteca tradicional, muchos inversores exigen entre un 6% y un 10% anual sobre el efectivo desembolsado. En ciudades con alta apreciación histórica suelen aceptar entre un 4% y un 6% si el activo presenta baja vacancia y sólido potencial de crecimiento de rentas."
  - question: "¿Qué es el índice DSCR y qué nivel exigen los prestamistas?"
    answer: "El DSCR (índice de cobertura del servicio de la deuda) divide el Ingreso Operativo Neto anual entre el servicio anual de la hipoteca. Un valor de 1.00 indica equilibrio exacto; la mayoría de los bancos comerciales y prestamistas de inversión exige un mínimo de 1.20 a 1.25 para aprobar financiamiento."
---

La inversión inmobiliaria rentable no depende de especular sobre la plusvalía futura, sino de una suscripción financiera disciplinada desde el primer día. Evaluar una propiedad de alquiler exige separar el rendimiento operativo del inmueble de su estructura de deuda, presupuestar vacancias y reservas de capital reales, y someter el flujo de caja a pruebas de estrés ante tasas más altas o caídas de renta.

Esta guía desarrolla las ecuaciones esenciales de valoración inmobiliaria, analiza paso a paso un dúplex de `$250,000` y mide la sensibilidad del retorno en seis escenarios. Para proyectar sus propias cifras de compra, alquiler y financiamiento, utilice nuestra [Calculadora de Propiedades de Alquiler](/es/calculadoras/calculadora-propiedad-alquiler).

## Métricas Fundamentales de Suscripción Inmobiliaria

El análisis comienza calculando el Ingreso Bruto Efectivo (`EGI`), que descuenta del alquiler bruto potencial la pérdida estimada por desocupación:

```text
EGI = Alquiler_Bruto_Potencial × (1 − Tasa_Vacancia) + Otros_Ingresos
```

Luego se deducen los gastos operativos (`OpEx`): impuesto predial, seguro, mantenimiento ordinario, reserva de gastos de capital (`CapEx`), administración y cuotas comunitarias. Así se obtiene el Ingreso Operativo Neto (`NOI`):

```text
NOI = EGI − Gastos_Operativos
```

Con el `NOI` anualizado se calculan los cuatro indicadores decisorios de la operación:

- **Tasa de Capitalización:** Rentabilidad no apalancada respecto al precio de compra: `Cap Rate = (NOI_Anual / Precio_de_Compra) × 100%`.
- **Flujo de Caja:** Excedente líquido tras pagar la hipoteca (`Capital + Intereses`): `Flujo_de_Caja = NOI − Servicio_de_Deuda`.
- **Retorno sobre el Efectivo (CoC):** Rendimiento anual sobre el efectivo total desembolsado (enganche, cierre y adecuación inicial): `CoC = (Flujo_de_Caja_Anual / Efectivo_Total_Invertido) × 100%`.
- **Cobertura de Deuda (DSCR):** Margen de solvencia frente al préstamo: `DSCR = NOI_Anual / Servicio_Anual_de_Deuda`.

### La Regla del 1% y la Regla del 50%: Filtros, No Veredictos

La **Regla del 1%** sugiere que la renta mensual bruta iguale al menos el `1%` del precio de compra (`$2,500/mes` para `$250,000`), y la **Regla del 50%** estima que los gastos operativos (sin hipoteca) consumen la mitad de esa renta. Ambas agilizan el descarte inicial de listados, pero nunca sustituyen un presupuesto detallado con cotizaciones locales reales.

## Ejemplo Práctico Paso a Paso: Análisis de un Dúplex de $250,000

Suponga la compra de un dúplex por `$250,000` con `20%` de enganche (`$50,000`) más `$10,000` en gastos de cierre y puesta a punto, sumando `$60,000` de efectivo invertido. El préstamo de `$200,000` al `6.75%` fijo a 30 años genera una cuota mensual de `$1,297.20` (`$15,566.40/año`), mientras ambas unidades producen `$2,650/mes` de renta bruta.

1. **Ingreso Bruto Efectivo (EGI):** Con `5%` de vacancia, `EGI = $2,650 × 0.95 = $2,517.50/mes`.
2. **Gastos operativos mensuales:** Predial (`$260`), seguro (`$125`), mantenimiento y reserva de capital (`$240`) y administración del `8%` sobre el EGI (`$201.40`), totalizando `$826.40/mes` (`31.2%` de la renta bruta).
3. **Ingreso Operativo Neto (NOI):** `$2,517.50 − $826.40 = $1,691.10/mes` (`$20,293.20/año`).
4. **Tasa de Capitalización:** `($20,293.20 / $250,000) × 100% = 8.12%`.
5. **Flujo de Caja:** `$1,691.10 − $1,297.20 = $393.90/mes` (`$4,726.80/año`).
6. **Retorno CoC y DSCR:** `CoC = ($4,726.80 / $60,000) × 100% = 7.88%` anual y `DSCR = $1,691.10 / $1,297.20 = 1.30`.

Además del `7.88%` en flujo líquido anual, los inquilinos amortizan deuda hipotecaria mes a mes y la depreciación fiscal contable reduce la base imponible anual. Conviene verificar también el punto de equilibrio de ocupación (`Break-Even Occupancy`): sumando gastos operativos y servicio de deuda (`$826.40 + $1,297.20 = $2,123.60`), el dúplex cubre todas sus obligaciones con el `80.1%` de la renta bruta potencial.

## Análisis de Sensibilidad: Flujo de Caja ante Vacancia y Tasas

La tabla evalúa la resistencia financiera del mismo dúplex de `$250,000` ante seis variaciones realistas de tasas de financiamiento, ocupación y nivel de alquiler:

| Escenario Evaluado | Cuota Hipoteca | NOI Mensual | Flujo de Caja Mensual | Retorno CoC | DSCR |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Caso base (20% inicial, 6.75%, vac. 5%) | $1,297.20 | $1,691.10 | $393.90 | 7.88% | 1.30 |
| Tasa favorable (6.00% a 30 años) | $1,199.10 | $1,691.10 | $492.00 | 9.84% | 1.41 |
| Tasa elevada (7.50% a 30 años) | $1,398.43 | $1,691.10 | $292.67 | 5.85% | 1.21 |
| Vacancia elevada (12% anual) | $1,297.20 | $1,520.44 | $223.24 | 4.46% | 1.17 |
| Caída del alquiler (−10% a $2,385) | $1,297.20 | $1,459.49 | $162.29 | 3.25% | 1.13 |
| Mayor enganche (25% inicial = $72,500 tot.) | $1,216.12 | $1,691.10 | $474.98 | 7.86% | 1.39 |

Elevar el enganche al `25%` mejora el flujo mensual (`$474.98`) y el `DSCR` (`1.39`), pero reduce ligeramente el `CoC` (`7.86%`) porque reemplaza deuda al `6.75%` en un activo que rinde `8.12%` sin apalancamiento.

## Riesgos Ocultos, Reservas de Capital y Consideraciones Fiscales

El error más costoso al suscribir propiedades consiste en copiar el impuesto predial histórico del vendedor. Tras el traspaso, muchas jurisdicciones revalúan el catastro al precio de venta actual, elevando drásticamente la carga fiscal del primer año.

Asimismo, presupueste siempre entre `8%` y `10%` de administración aunque gestione el inmueble inicialmente por cuenta propia, de modo que la rentabilidad sobreviva si decide delegar en el futuro o ampliar su cartera. Considere finalmente tres restricciones prácticas: los préstamos para propiedades de inversión suelen exigir tasas entre `0.50%` y `0.875%` más altas y enganches mínimos del `20%–25%` frente a una vivienda principal; la iliquidez del mercado inmobiliario impide convertir el patrimonio en efectivo sin descuentos ni comisiones de venta; y la depreciación fiscal deducida anualmente suele quedar sujeta a recuperación tributaria al vender si no se difiere mediante intercambios fiscales autorizados.
