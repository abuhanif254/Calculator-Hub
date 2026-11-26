---
title: "Entendiendo los Bonos: La Base de un Portafolio Seguro"
description: "Aprenda sobre tasas de cupón, rendimiento al vencimiento, cómo reaccionan los precios a las tasas de interés y use nuestra Calculadora de Bonos."
category: "Finance"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "bond-calculator"
relatedType: "calculator"
faqs:
  - question: "¿Por qué caen los precios de los bonos existentes cuando el banco central sube las tasas de interés?"
    answer: "Cuando las tasas de interés suben, los bonos recién emitidos ofrecen cupones más altos. Para que un bono antiguo con un cupón fijo inferior resulte atractivo en el mercado secundario, su precio debe caer hasta que el descuento compense los intereses menores y su rendimiento al vencimiento iguale la tasa vigente de mercado."
  - question: "¿Qué diferencia existe entre la tasa de cupón, el rendimiento corriente y el rendimiento al vencimiento?"
    answer: "La tasa de cupón es el interés anual fijo calculado sobre el valor nominal del bono. El rendimiento corriente divide ese cupón anual entre el precio actual de mercado. El rendimiento al vencimiento (YTM) es la tasa interna de retorno integral: incorpora todos los cupones futuros y la ganancia o pérdida de capital al recuperar el valor nominal al vencimiento."
  - question: "¿Puedo perder dinero si mantengo un bono individual hasta su fecha de vencimiento?"
    answer: "Si mantiene un bono individual de alta calidad crediticia (sin cláusula de recompra anticipada) hasta su vencimiento y el emisor no incumple sus pagos, recuperará el 100% del valor nominal pactado sin importar las fluctuaciones intermedias de precio. Las pérdidas ocurren únicamente si vende antes del vencimiento cuando las tasas han subido, si el emisor entra en impago o si la inflación supera su rendimiento."
  - question: "¿Qué indica la duración de un bono frente a su plazo de vencimiento?"
    answer: "El plazo de vencimiento solo indica cuándo vence el capital final, mientras que la duración modificada mide el promedio ponderado del tiempo en que se reciben todos los flujos y cuantifica la sensibilidad del precio ante cambios en las tasas. Como regla aproximada, un bono con duración modificada de 4.4 años perderá alrededor de 4.4% de su valor si las tasas suben un punto porcentual."
  - question: "¿Qué es un bono con cláusula de recompra anticipada y qué riesgo implica?"
    answer: "Un bono rescatable permite al emisor recomprar la deuda antes de la fecha de vencimiento a un precio preestablecido. Los emisores suelen ejercer esta opción cuando las tasas de interés bajan para refinanciarse más barato, lo que obliga al inversionista a recibir su capital de vuelta justo cuando debe reinvertirlo a tasas de mercado menos favorables."
---

Un bono es un instrumento de deuda mediante el cual un inversionista presta capital a un gobierno, municipio o empresa a cambio de pagos periódicos de intereses y de la devolución íntegra del principal en una fecha pactada. Dentro de un portafolio diversificado, la renta fija actúa como contrapeso estabilizador: atenúa las caídas bursátiles y aporta flujos de caja predecibles para compromisos futuros.

Aunque los cupones sean fijos, el precio de mercado de un bono varía diariamente antes del vencimiento según las tasas de interés de referencia, las expectativas inflacionarias y la solvencia del emisor. Dominar la relación inversa entre precio y rendimiento permite identificar cuándo un título cotiza con prima o descuento. Con nuestra [Calculadora de Bonos](/es/calculadoras/calculadora-de-bonos), puede obtener de inmediato el precio teórico o el rendimiento al vencimiento exacto.

## Anatomía Técnica, Fórmulas y Definición de Parámetros

La valoración de un bono de renta fija convencional depende de cinco parámetros fundamentales:

- **Valor nominal (`VN`)**: Capital que el emisor reembolsará al vencimiento (usualmente `$1,000` por título).
- **Tasa de cupón (`c`)**: Interés anual fijo sobre el valor nominal. Con pago semestral (`m = 2`), cada cupón es `(VN × c) / 2`.
- **Plazo al vencimiento (`T`)**: Años restantes hasta la amortización final, equivalente a `N = T × m` períodos.
- **Precio de mercado (`P`)**: Cotización secundaria; cotiza **a la par** si `P = VN`, **con descuento** si `P < VN` y **con prima** si `P > VN`.
- **Rendimiento al vencimiento (`YTM` o `y`)**: Tasa de descuento anual compuesta que iguala el valor presente de los flujos futuros con el precio de mercado actual.

```text
1. Cupón periódico:
   C = (VN × c) / m

2. Precio teórico del bono:
   P = Σ [C / (1 + y / m)^t] + [VN / (1 + y / m)^N]    (t = 1 hasta N)

3. Rendimiento corriente:
   RC = (VN × c) / P

4. Aproximación rápida del YTM:
   YTM_aprox ≈ [Cupón_anual + (VN − P) / T] / [(VN + P) / 2]

5. Sensibilidad ante variación de tasas (Duración Modificada):
   ΔP / P ≈ −D_mod × Δy
```

Cuando un título cotiza con descuento, siempre se cumple `Tasa de cupón < Rendimiento corriente < YTM`. Cuando cotiza con prima, la desigualdad se invierte (`YTM < Rendimiento corriente < Tasa de cupón`).

## Ejemplo Numérico Paso a Paso

Suponga que analiza un bono corporativo con valor nominal de `$1,000`, cupón anual del `5.00%` pagadero semestralmente (`m = 2`), vencimiento restante de `5 años` (`N = 10` períodos) y precio actual de `$925.00`.

1. **Calcule el cupón periódico y anual**: cada semestre paga `C = ($1,000 × 0.05) / 2 = $25.00`, sumando `$50.00` anuales.
2. **Determine el rendimiento corriente**: `$50.00 / $925.00 = 5.41%`. Este indicador mide solo la renta por cupón y omite la ganancia de capital al vencimiento.
3. **Estime el YTM aproximado**: al comprar en `$925.00` y recibir `$1,000` en 5 años, usted obtiene `$75.00` adicionales (`$15.00` anuales promedio):
   - Numerador: `$50.00 + ($1,000 − $925.00) / 5 = $65.00`
   - Denominador (precio medio): `($1,000 + $925.00) / 2 = $962.50`
   - `YTM_aprox = $65.00 / $962.50 = 6.75%`.
4. **Verifique el YTM exacto**: resolviendo la ecuación de valor presente con capitalización semestral, la tasa exacta que iguala los 10 cupones de `$25.00` y los `$1,000` finales a `$925.00` es **`6.79%`** anual.

## Escenarios de Precio y Rendimiento en el Mercado Secundario

La tabla siguiente ilustra la sensibilidad del bono (`VN = $1,000`, cupón `5.00%` semestral, `5 años`) ante cambios en las tasas de mercado:

| Rendimiento de Mercado (YTM) | Precio Exacto | Cotización | Rendimiento Corriente | Ganancia/Pérdida al Vencimiento | Variación vs. Par |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `3.00%` | `$1,092.22` | Con prima | `4.58%` | `−$92.22` | `+9.22%` |
| `4.00%` | `$1,044.91` | Con prima | `4.79%` | `−$44.91` | `+4.49%` |
| `5.00%` | `$1,000.00` | A la par | `5.00%` | `$0.00` | `0.00%` |
| `6.00%` | `$957.35` | Con descuento | `5.22%` | `+$42.65` | `−4.27%` |
| `7.00%` | `$916.83` | Con descuento | `5.45%` | `+$83.17` | `−8.32%` |
| `8.00%` | `$878.34` | Con descuento | `5.69%` | `+$121.66` | `−12.17%` |

## Aplicaciones Prácticas, Errores Comunes y Consideraciones de Riesgo

Una estrategia clásica para gestionar el riesgo de tasa es construir una **escalera de bonos**: distribuir el capital en vencimientos escalonados de 1 a 5 años. Cada año vence un tramo que provee liquidez o permite reinvertir a las nuevas tasas vigentes, suavizando la exposición a movimientos bruscos de la curva de rendimientos.

Entre los errores más comunes figuran cuatro: confundir el rendimiento corriente con el retorno total en bonos con prima (ignorando la convergencia descendente hacia `$1,000`); equiparar un fondo de bonos sin fecha de vencimiento con un bono individual mantenido hasta el final; subestimar el riesgo de impago en emisiones corporativas de alto rendimiento (grado especulativo); y omitir los intereses devengados acumulados entre fechas de pago al negociar en el mercado secundario.

Finalmente, considere el marco tributario y de reinversión: los intereses corporativos suelen gravarse como renta ordinaria, mientras ciertos bonos soberanos o municipales gozan de exenciones locales o federales según la jurisdicción. Además, el cálculo del `YTM` asume que los cupones intermedios se reinvierten exactamente a esa misma tasa y que no existen cláusulas de rescate anticipado que acorten el plazo efectivo del título cuando bajan las tasas de interés.
