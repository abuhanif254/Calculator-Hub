---
title: "La Guía Definitiva de los Préstamos FHA: Requisitos y Cálculos"
description: "Descubra cómo funcionan los préstamos FHA, los requisitos de puntaje crediticio y DTI, y cómo calcular con exactitud el pago mensual incluyendo el MIP."
category: "Finance"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "fha-loan-calculator"
relatedType: "calculator"
faqs:
  - question: "¿Cuál es la diferencia entre el MIP inicial y el MIP anual en un préstamo FHA?"
    answer: "El MIP inicial (UFMIP) es una prima única del 1.75 % calculada sobre el monto base del préstamo que suele financiarse sumándola al saldo hipotecario. El MIP anual es una tarifa recurrente (entre 0.15 % y 0.75 % según el LTV, el plazo y el monto) que se divide en 12 cuotas y se cobra cada mes junto con el pago de la hipoteca."
  - question: "¿Se puede eliminar el seguro hipotecario MIP de un préstamo FHA?"
    answer: "Depende del pago inicial original. Si aportó menos del 10 % al momento del cierre (LTV superior al 90 %), el MIP anual permanece vigente durante toda la vida del préstamo y solo se elimina refinanciando a una hipoteca convencional tras acumular suficiente plusvalía. Si aportó el 10 % o más, el MIP se cancela automáticamente después de 11 años."
  - question: "¿Qué puntaje de crédito mínimo exige la FHA en la actualidad?"
    answer: "La normativa federal de la FHA permite acceder al pago inicial mínimo del 3.5 % con un puntaje FICO de al menos 580. Los solicitantes con puntajes entre 500 y 579 también pueden calificar, pero deben aportar un pago inicial mínimo del 10 %. No obstante, algunos prestamistas privados aplican requisitos propios más estrictos."
  - question: "¿Un préstamo FHA sirve para comprar propiedades de inversión o segunda vivienda?"
    answer: "No. Los préstamos respaldados por la FHA están restringidos exclusivamente a la adquisición o refinanciamiento de una residencia principal. El prestatario debe ocupar la propiedad dentro de los 60 días posteriores al cierre y residir en ella durante al menos un año, aunque sí se permite adquirir edificios multifamiliares de hasta cuatro unidades si habita una de ellas."
  - question: "¿Qué incluye exactamente la cuota mensual total calculada para una hipoteca FHA?"
    answer: "Un presupuesto preciso no solo suma capital e intereses sobre el préstamo aumentado con el UFMIP, sino también la doceava parte del MIP anual, los impuestos prediales locales (Property Taxes), el seguro de vivienda (Homeowners Insurance) y, cuando corresponda, las cuotas de asociación de propietarios (HOA)."
---

Un **préstamo FHA** es una hipoteca emitida por un prestamista aprobado y asegurada por la Administración Federal de Vivienda (Federal Housing Administration) de Estados Unidos. Su principal ventaja es permitir financiar hasta el `96.5 %` de una vivienda principal con un pago inicial mínimo del **`3.5 %`** para puntajes crediticios desde `580`, ampliando el acceso frente a las hipotecas convencionales.

A cambio de ese respaldo federal, el prestatario asume obligatoriamente la **Prima de Seguro Hipotecario (MIP)** en dos partes: una comisión inicial financiable y una prima anual prorrateada cada mes. Para estimar su cuota exacta antes de negociar, utilice nuestra [Calculadora de Préstamos FHA](/es/calculadoras/calculadora-prestamo-fha).

## Estructura financiera y fórmulas de cálculo

Calcular una hipoteca FHA requiere incorporar primero la prima inicial financiada (`UFMIP`) al capital amortizable y luego sumar el seguro mensual y los gastos retenidos en depósito (`escrow`):

```text
Monto Base = Precio de Compra − Pago Inicial
UFMIP (1.75 %) = Monto Base × 0.0175
Capital Total Financiado (P) = Monto Base + UFMIP
```

Sobre el capital total `P`, la cuota mensual fija de capital e intereses (`M`) se obtiene con la fórmula de amortización:

`M = P × [r(1 + r)^n] / [(1 + r)^n − 1]`

El desembolso mensual completo incorpora el MIP anual y las obligaciones de la propiedad:

`MIP Mensual = (Monto Base × Tasa MIP Anual) / 12`
`Pago Mensual Total = M + MIP Mensual + Impuesto Predial Mensual + Seguro Mensual`

Parámetros clave:
- **`LTV` (Relación Préstamo-Valor):** `Monto Base / Precio de Compra`. Con un pago inicial del `3.5 %`, el `LTV` es del `96.5 %`.
- **`r`:** Tasa anual nominal dividida entre `12`.
- **`n`:** Total de mensualidades (`360` a 30 años; `180` a 15 años).
- **`DTI` (Relación Deuda-Ingreso):** Porcentaje del ingreso bruto mensual destinado a deudas; la referencia estándar FHA es del `31 %` para vivienda y `43 %` para deuda total.

## Ejemplo práctico paso a paso

Considere la compra de una residencia principal de **`$350,000`** con puntaje crediticio de `660`, pago inicial del **`3.5 %`** y tasa fija del **`6.25 %`** a `30` años (`n = 360`). Suponga un impuesto predial de `$4,200` anuales (`$350.00/mes`), seguro de vivienda de `$1,500` anuales (`$125.00/mes`) y una tasa MIP anual del `0.55 %`.

### Paso 1: Calcular el capital base y el MIP inicial

- **Pago inicial (`3.5 %`):** `$350,000 × 0.035 = $12,250.00`
- **Monto base del préstamo:** `$350,000 − $12,250 = $337,750.00` (`LTV = 96.5 %`)
- **MIP inicial (`1.75 %`):** `$337,750 × 0.0175 = $5,910.63`
- **Capital total financiado (`P`):** `$337,750 + $5,910.63 = $343,660.63`

### Paso 2: Obtener la cuota de capital e intereses (`M`)

Con `r = 0.0625 / 12 = 0.00520833` y `n = 360`:

`M = 343,660.63 × [0.00520833 × (1.00520833)^360] / [(1.00520833)^360 − 1] = $2,115.98`

### Paso 3: Agregar MIP anual y costos de propiedad

- **MIP anual (`0.55 %` sobre `$337,750`):** `($337,750 × 0.0055) / 12 = $154.80/mes`
- **Impuestos y seguro:** `$350.00 + $125.00 = $475.00/mes`
- **Pago mensual total estimado:** `$2,115.98 + $154.80 + $475.00 = $2,745.78`

Así, el MIP añade `$5,910.63` al saldo inicial financiado y `$154.80` cada mes mientras permanezca vigente el préstamo.

## Tabla comparativa de tasas y duración del MIP

Para montos base estándar (hasta `$726,200`), la estructura vigente de la FHA establece las siguientes tasas anuales según plazo, puntaje FICO y LTV:

| Plazo del préstamo | FICO mínimo | Pago inicial | LTV resultante | Tasa MIP anual | Duración del MIP |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **30 años (> 15 años)** | 580 o más | 3.5 % | 96.5 % | 0.55 % | Toda la vida del préstamo |
| **30 años (> 15 años)** | 580 o más | 5.0 % | 95.0 % | 0.50 % | Toda la vida del préstamo |
| **30 años (> 15 años)** | 580 o más | 10.0 % | 90.0 % | 0.50 % | 11 años |
| **30 años (> 15 años)** | 500 a 579 | 10.0 % | 90.0 % | 0.50 % | 11 años |
| **15 años (≤ 15 años)** | 580 o más | 3.5 % | 96.5 % | 0.40 % | Toda la vida del préstamo |
| **15 años (≤ 15 años)** | 580 o más | 10.0 % | 90.0 % | 0.15 % | 11 años |

## Casos de uso, errores frecuentes y advertencias regulatorias

Los préstamos FHA destacan para compradores de primera vivienda con liquidez limitada, prestatarios con historial crediticio en recuperación y adquirientes de edificios multifamiliares de hasta cuatro unidades que ocuparán una vivienda mientras alquilan las demás.

Conviene evitar cuatro errores habituales al evaluar esta opción:

- **Asumir que el MIP desaparece solo al llegar al 20 % de capital:** Con un pago inicial menor al `10 %`, el MIP dura toda la vida del préstamo. Para eliminarlo deberá refinanciar a una hipoteca convencional cuando su plusvalía alcance el `20 %`.
- **Ignorar los topes por condado:** La FHA fija montos máximos por zona geográfica; cualquier exceso sobre el límite local debe cubrirse en efectivo o mediante otra línea hipotecaria.
- **Subestimar la inspección de habitabilidad:** La tasación FHA exige cumplimiento estricto de seguridad y salubridad (techo íntegro, calefacción funcional y ausencia de pintura descascarada), rechazando inmuebles que requieran reformas mayores sin un programa FHA 203(k).
- **Omitir gastos de cierre:** Aparte del `3.5 %` de entrada, reserve entre un `2 %` y un `5 %` del precio para comisiones de originación, tasación y depósitos iniciales de impuestos y seguros.
