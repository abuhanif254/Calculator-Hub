---
title: "Cómo Encontrar la Media: Aritmética, Geométrica y Armónica"
description: "Guía técnica sobre las tres medias pitagóricas: cuándo usar la media aritmética, geométrica o armónica, desigualdad entre medias, ejemplos paso a paso y errores frecuentes."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "mean-calculator"
relatedType: "calculator"
faqs:
  - question: "¿Por qué la media aritmética siempre es mayor o igual que la geométrica y la armónica?"
    answer: "Para cualquier conjunto de números reales positivos se cumple la desigualdad de las medias pitagóricas: H ≤ G ≤ x̄. La igualdad se alcanza únicamente cuando todos los valores del conjunto son idénticos; en cuanto existe dispersión, los valores altos impulsan al alza la media aritmética mientras los valores pequeños ejercen mayor peso en la media armónica."
  - question: "¿Por qué no debe usarse la media aritmética para calcular rendimientos anuales de inversión?"
    answer: "Los rendimientos compuestos actúan de forma multiplicativa, no aditiva. Si una cartera gana un 50% el primer año y pierde un 50% el segundo, el promedio aritmético arroja 0%, pero el capital real pasa de 1,000 € a 1,500 € y luego a 750 €. La media geométrica refleja con exactitud esa pérdida compuesta del −13.40% anual."
  - question: "¿Qué ocurre con la media geométrica y la armónica si algún dato es cero o negativo?"
    answer: "La media armónica es indefinida cuando algún valor es cero porque exige dividir 1 entre cada observación. Por su parte, la media geométrica se anula completamente si un término vale cero y puede producir resultados indefinidos o complejos con números negativos. Para tasas de crecimiento con valores negativos se transforman primero en factores multiplicativos (1 + r)."
  - question: "¿Cuándo conviene reemplazar la media aritmética por la mediana?"
    answer: "Cuando la distribución es fuertemente asimétrica o contiene valores atípicos extremos —como ingresos salariales, precios de viviendas o tiempos de espera— la media aritmética queda desplazada hacia la cola larga. En esos casos, la mediana describe con mayor fidelidad el valor central típico de la población."
  - question: "¿En qué se diferencia una media ponderada de una media aritmética simple?"
    answer: "La media aritmética simple asigna el mismo peso (1/n) a todas las observaciones. La media ponderada asigna un coeficiente específico wᵢ a cada dato según su relevancia, frecuencia o tamaño muestral, multiplicando cada valor por su peso y dividiendo la suma resultante entre la suma total de los pesos."
---

El término «promedio» suele identificarse automáticamente con la **media aritmética**, pero aplicarla de manera indiscriminada sin evaluar la estructura matemática de los datos genera distorsiones severas en finanzas, física, economía y ciencia de datos. Las tres **medias pitagóricas** —aritmética, geométrica y armónica— responden respectivamente a relaciones aditivas, multiplicativas y de tasas recíprocas.

Identificar con precisión qué operación conecta sus observaciones garantiza elegir el estimador matemáticamente coherente en cada problema. Puede calcular las tres medias al instante, además de la mediana, la moda y los estadísticos de dispersión, mediante nuestra [Calculadora de Media](/es/calculadoras/calculadora-de-media).

## Definición y fórmulas de las medias principales

Para un conjunto de `n` valores positivos `x₁, x₂, ..., xₙ`, cada media resume el conjunto bajo un criterio distinto:

### 1. Media aritmética (`x̄`) y ponderada (`x̄_w`)

Suma las observaciones y divide el total equitativamente. Es idónea para magnitudes aditivas como pesos, calificaciones homogéneas o errores aleatorios de medición:

```text
x̄   = (x₁ + x₂ + ... + xₙ) / n
x̄_w = Σ(wᵢ · xᵢ) / Σwᵢ
```

### 2. Media geométrica (`G`)

Calcula la raíz n-ésima del producto de los términos. Resulta indispensable cuando las variables se multiplican entre sí, como rentabilidades compuestas, tasas de crecimiento demográfico o índices de precios:

```text
G = (x₁ × x₂ × ... × xₙ)^(1/n)
```

En software numérico suele evaluarse mediante logaritmos (`exp[(1/n) · Σ ln(xᵢ)]`) para evitar desbordamientos en series largas.

### 3. Media armónica (`H`)

Equivale al recíproco de la media aritmética de los recíprocos. Es la medida exacta al promediar razones (km/h, Mb/s, múltiplos precio-beneficio) cuando el **numerador** permanece constante en cada tramo:

```text
H = n / (1/x₁ + 1/x₂ + ... + 1/xₙ)
```

Para todo conjunto positivo se cumple la **desigualdad pitagórica**: `H ≤ G ≤ x̄`.

## Ejemplos numéricos paso a paso

### Comparación sobre un mismo conjunto

Dado el conjunto `[2, 8, 32]`:

1. **Media aritmética:** `x̄ = (2 + 8 + 32) / 3 = 42 / 3 = 14.00`.
2. **Media geométrica:** `G = (2 × 8 × 32)^(1/3) = 512^(1/3) = 8.00`.
3. **Media armónica:** `H = 3 / (1/2 + 1/8 + 1/32) = 3 / (21/32) = 96 / 21 ≈ 4.5714`.

Se verifica exactamente que `4.5714 ≤ 8.00 ≤ 14.00`.

### Por qué elegir la media incorrecta distorsiona el análisis

- **Rentabilidad financiera (Geométrica vs. Aritmética):** un capital de `1,000 €` sube un `+50%` en el año 1 (`factor 1.50`, saldo `1,500 €`) y cae un `−50%` en el año 2 (`factor 0.50`, saldo `750 €`). El promedio aritmético arroja `0%`, ocultando la pérdida real. La media geométrica de los factores es `G = √(1.50 × 0.50) = √0.75 ≈ 0.8660`, equivalente a una tasa anual compuesta de `−13.40%`, que reproduce exactamente `1,000 € × 0.8660² = 750 €`.
- **Velocidad media (Armónica vs. Aritmética):** un vehículo recorre `120 km` a `60 km/h` (`2 h`) y regresa `120 km` a `40 km/h` (`3 h`). Su velocidad media real es `240 km / 5 h = 48 km/h`. La media aritmética daría `50 km/h` (erróneo), mientras la media armónica obtiene `H = 2 / (1/60 + 1/40) = 2 / (5/120) = 48.00 km/h`.

## Tabla comparativa de criterios de selección

| Tipo de media | Operación base | Dominio válido | Aplicación óptima | Sensibilidad a atípicos |
| :--- | :--- | :--- | :--- | :--- |
| Media aritmética | Suma lineal | Reales cualquiera | Distribuciones simétricas y medidas aditivas | Alta ante valores extremos |
| Media ponderada | Suma con pesos `wᵢ` | Pesos `wᵢ ≥ 0`, `Σwᵢ > 0` | Notas por créditos, índices bursátiles | Proporcional al peso |
| Media geométrica | Producto | Valores `> 0` | Tasas compuestas, crecimiento porcentual | Moderada; sensible cerca de 0 |
| Media armónica | Suma de recíprocos | Valores `> 0` | Velocidades sobre distancia fija, puntuación F1 | Muy alta hacia valores pequeños |
| Media recortada | Suma tras recorte | Reales con recorte fijado | Jueces deportivos, series con ruido puntual | Baja frente a extremos acotados |
| Mediana | Ordenamiento | Variables ordinales | Salarios, precios de vivienda, colas sesgadas | Muy baja (robusta) |

## Criterios avanzados y errores frecuentes

En evaluación de modelos de clasificación automática, la **puntuación F1** es exactamente la media armónica entre la precisión y la sensibilidad: penaliza con severidad los modelos desequilibrados donde una métrica resulta muy alta a costa de desplomar la otra. Asimismo, en valoración bursátil, promediar múltiplos precio-beneficio de una cartera equiponderada exige emplear la media armónica para preservar la coherencia contable entre el precio agregado y los beneficios totales generados.

Evite cuatro errores recurrentes al calcular e interpretar promedios en informes técnicos:

- **Promediar porcentajes sin ponderar su base:** si una línea de negocio crece un 20% sobre 10 clientes y otra cae un 10% sobre 1,000 clientes, promediar `+20%` y `−10%` arroja un falso `+5%` cuando el volumen total cayó en realidad un 9.7%.
- **Confundir tiempo fijo con distancia fija en tasas:** la media armónica aplica cuando el numerador permanece constante (idéntica distancia recorrida o idéntica aportación periódica en euros); si lo constante es el denominador (por ejemplo, conducir una hora a `60 km/h` y otra hora a `40 km/h`), rige la media aritmética (`50 km/h`).
- **Ocultar bimodalidad tras una sola cifra central:** si la mitad de un grupo puntúa 10 y la otra mitad 90, el promedio de 50 no representa a ningún miembro real de la muestra.
- **Aplicar media geométrica directamente a tasas negativas sin sumar 1:** debe operarse siempre sobre factores multiplicativos `(1 + r)` estrictamente positivos.
