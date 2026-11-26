---
title: "Calculadora de Potencial de Celda: Reacciones Espontáneas"
description: "Guía técnica sobre el potencial estándar de celda electroquímica: ecuación de Nernst, relación con la energía libre de Gibbs, cálculo paso a paso de una pila galvánica y tabla de potenciales de reducción."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "cell-potential-calculator"
relatedType: "calculator"
faqs:
  - question: "¿Por qué un potencial de celda positivo indica una reacción espontánea?"
    answer: "Porque el potencial de celda se relaciona directamente con la variación de energía libre de Gibbs mediante ΔG° = −n × F × E°_celda. Como el número de electrones n y la constante de Faraday F son siempre positivos, un valor positivo de E°_celda produce un ΔG° negativo, condición termodinámica necesaria para que la reacción avance espontáneamente y libere trabajo eléctrico útil."
  - question: "¿Se deben multiplicar los potenciales estándar E° cuando se ajustan los coeficientes estequiométricos de una semirreacción?"
    answer: "No. El potencial de reducción estándar es una propiedad intensiva medida en voltios (julios por culombio), por lo que no depende de la cantidad de sustancia ni de los coeficientes utilizados para equilibrar los electrones. Aunque multiplique una semirreacción por dos o por tres para igualar electrones transferidos, su valor de E° permanece exactamente igual."
  - question: "¿Qué ocurre con el potencial de celda cuando la concentración de reactivos disminuye durante la descarga?"
    answer: "Según la ecuación de Nernst, conforme la pila genera corriente aumenta la concentración de productos en el ánodo y disminuye la de reactivos en el cátodo, lo que incrementa el cociente de reacción Q. Ese aumento de Q hace que el término logarítmico reduzca progresivamente E_celda hasta alcanzar el equilibrio químico, momento en que E_celda = 0 V y la batería queda descargada."
  - question: "¿Cómo se determina qué electrodo actúa como cátodo y cuál como ánodo en una celda galvánica?"
    answer: "En una celda galvánica espontánea, la semirreacción con el potencial de reducción estándar E° más positivo (o menos negativo) tiene mayor tendencia a captar electrones y actúa como cátodo (reducción). La semirreacción con el E° menor se invierte para actuar como ánodo (oxidación), garantizando así que E°_celda = E°_cátodo − E°_ánodo resulte mayor que cero."
  - question: "¿Qué papel cumple el puente salino en el mantenimiento del potencial medido?"
    answer: "El puente salino cierra el circuito eléctrico permitiendo la migración de iones inertes (como K⁺ y NO₃⁻ o Cl⁻) entre ambas semiceldas sin mezclar las disoluciones. Sin este flujo iónico, la acumulación de carga positiva en el ánodo y negativa en el cátodo detendría casi de inmediato la transferencia de electrones y anularía el voltaje en el circuito externo."
---

El **potencial estándar de celda** (`E°_celda`) cuantifica la fuerza electromotriz máxima que genera una reacción de oxidación-reducción en condiciones estándar (`298.15 K`, disoluciones `1.0 M` y presiones de `1.0 bar`). Se calcula restando el potencial de reducción estándar del ánodo al del cátodo: `E°_celda = E°_cátodo − E°_ánodo`. Si el resultado es positivo (`E°_celda > 0`), el proceso es espontáneo (**celda galvánica**); si es negativo (`E°_celda < 0`), exige energía eléctrica externa (**celda electrolítica**).

Con nuestra [Calculadora de Potencial de Celda](/es/calculadoras/calculadora-de-potencial-de-celda) puede determinar al instante el voltaje estándar y la espontaneidad de pares redox habituales. Esta guía desarrolla las ecuaciones termodinámicas clave —incluida la **ecuación de Nernst** para concentraciones reales—, un ejemplo completo resuelto, una tabla de potenciales estándar y los errores más frecuentes al evaluarlos.

## Principios termodinámicos y ecuaciones fundamentales

Toda celda electroquímica acopla dos semirreacciones separadas: la **oxidación** (cesión de electrones en el ánodo) y la **reducción** (captación de electrones en el cátodo). Como no es posible medir el potencial absoluto de un solo electrodo, la IUPAC asigna por convención `0.000 V` al **electrodo estándar de hidrógeno** (EEH: `2 H⁺(ac, 1 M) + 2 e⁻ → H₂(g, 1 bar)`) y tabula todas las semirreacciones como potenciales de reducción estándar (`E°`).

```text
Potencial estándar de celda:
E°_celda = E°_cátodo − E°_ánodo

Energía libre de Gibbs estándar y equilibrio:
ΔG° = −n × F × E°_celda
E°_celda = (R × T / (n × F)) × ln(K_eq)

Ecuación de Nernst (condiciones no estándar):
E_celda = E°_celda − (R × T / (n × F)) × ln(Q)
E_celda (298.15 K) = E°_celda − (0.05916 V / n) × log₁₀(Q)
```

Parámetros y constantes:

- **`E°_cátodo` y `E°_ánodo`:** potenciales estándar de reducción (`V`) de las especies que se reducen y se oxidan, respectivamente.
- **`n`:** moles de electrones transferidos en la ecuación global equilibrada.
- **`F`:** constante de Faraday (`96 485 C/mol` o `96.485 kJ/(V·mol)`).
- **`R`:** constante de los gases ideales (`8.3145 J/(mol·K)`), y **`T`:** temperatura absoluta (`K`).
- **`Q`:** cociente de reacción calculado con las molaridades o presiones de los productos sobre los reactivos, omitiendo sólidos y líquidos puros.

### Criterio de espontaneidad

El signo de `E°_celda` y de `ΔG°` siempre es opuesto. Si `E°_celda > 0`, entonces `ΔG° < 0` y `K_eq > 1`, por lo que la reacción directa produce trabajo eléctrico espontáneo. Si `E°_celda < 0`, la reacción directa es no espontánea (`ΔG° > 0`) y requiere aplicar una tensión superior a `|E_celda|`.

## Ejemplo resuelto paso a paso: celda de Daniell en condiciones reales

Construya una pila de zinc y cobre a `25.0 °C` (`298.15 K`) con una barra de zinc en `ZnSO₄ 0.10 M` y una barra de cobre en `CuSO₄ 1.50 M`, unidas mediante un puente salino de `KNO₃`.

### Paso 1: Identificar el cátodo y el ánodo

En tablas estándar: `Cu²⁺(ac) + 2 e⁻ → Cu(s)` tiene `E° = +0.34 V`, mientras que `Zn²⁺(ac) + 2 e⁻ → Zn(s)` tiene `E° = −0.76 V`. Como `+0.34 V > −0.76 V`, el cobre actúa como **cátodo** (reducción) y el zinc se invierte como **ánodo** (oxidación), transfiriendo `n = 2` electrones en `Zn(s) + Cu²⁺(ac) → Zn²⁺(ac) + Cu(s)`.

### Paso 2: Calcular el potencial estándar y la energía libre de Gibbs

```text
E°_celda = +0.34 V − (−0.76 V) = +1.10 V
ΔG° = −2 × 96 485 C/mol × 1.10 V = −212 267 J/mol ≈ −212.3 kJ/mol
```

El resultado confirma una pila espontánea que genera `1.10 V` en condiciones estándar.

### Paso 3: Ajustar el voltaje real mediante la ecuación de Nernst

Con `[Zn²⁺] = 0.10 M` y `[Cu²⁺] = 1.50 M`:

```text
Q = [Zn²⁺] / [Cu²⁺] = 0.10 / 1.50 = 0.06667
log₁₀(0.06667) = −1.1761

E_celda = 1.10 V − (0.05916 V / 2) × (−1.1761)
E_celda = 1.10 V + 0.0348 V = +1.135 V
```

Al haber exceso de reactivo `Cu²⁺` frente al producto `Zn²⁺` (`Q < 1`), el voltaje real asciende a `+1.135 V`.

## Tabla de potenciales de reducción estándar de referencia (25 °C)

| Semirreacción de reducción (acuosa) | `n` | `E°` (`V`) | Rol electroquímico habitual |
| :--- | :---: | :---: | :--- |
| `MnO₄⁻ + 8 H⁺ + 5 e⁻ → Mn²⁺ + 4 H₂O` | `5` | `+1.51 V` | Oxidante fuerte en valoraciones ácidas |
| `Cl₂(g) + 2 e⁻ → 2 Cl⁻` | `2` | `+1.36 V` | Producto anódico en proceso cloro-álcali |
| `O₂(g) + 4 H⁺ + 4 e⁻ → 2 H₂O` | `4` | `+1.23 V` | Cátodo en pilas de combustible |
| `Ag⁺ + e⁻ → Ag(s)` | `1` | `+0.80 V` | Electrodo secundario y plateado |
| `Cu²⁺ + 2 e⁻ → Cu(s)` | `2` | `+0.34 V` | Cátodo de Daniell y electrorefinado |
| `2 H⁺ + 2 e⁻ → H₂(g)` | `2` | `0.00 V` | Referencia universal EEH |
| `Fe²⁺ + 2 e⁻ → Fe(s)` | `2` | `−0.44 V` | Corrosión del acero en medio húmedo |
| `Zn²⁺ + 2 e⁻ → Zn(s)` | `2` | `−0.76 V` | Ánodo de sacrificio y pilas alcalinas |
| `Li⁺ + e⁻ → Li(s)` | `1` | `−3.04 V` | Ánodo de alta densidad energética |

## Aplicaciones prácticas y errores comunes de cálculo

El potencial de celda fundamenta el diseño de **baterías recargables**, **pilas de combustible**, **protección catódica** (donde ánodos de zinc o magnesio se oxidan preferentemente para proteger tuberías y cascos de acero) y sensores potenciométricos de pH.

Evite estos cuatro fallos frecuentes al calcular potenciales:

1. **Invertir dos veces el signo del ánodo:** la expresión `E°_celda = E°_cátodo − E°_ánodo` ya invierte el ánodo mediante la resta; cambiar manualmente su signo antes de restar duplica el error.
2. **Omitir el efecto del pH:** en pares con protones (`MnO₄⁻/Mn²⁺`, `O₂/H₂O`), `[H⁺]` aparece en `Q` elevado a potencias altas y desplaza el potencial real al variar el pH.
3. **Confundir concentración y actividad:** por encima de `0.1 M`, las atracciones interiónicas reducen la actividad efectiva y desvían la ecuación de Nernst varias decenas de milivoltios.
4. **Suponer cinética rápida solo por `E° > 0`:** la espontaneidad termodinámica no garantiza velocidad apreciable; reacciones con gases suelen requerir catalizadores para vencer el sobrepotencial de activación.
