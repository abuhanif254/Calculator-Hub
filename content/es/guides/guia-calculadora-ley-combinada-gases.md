---
title: "Calculadora de la Ley Combinada de los Gases: Condiciones Cambiantes"
description: "Guía técnica sobre la ley combinada de los gases: derivación desde Boyle, Charles y Gay-Lussac, conversión obligatoria a Kelvin, ejemplo resuelto, tabla de escenarios y límites de idealidad."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "combined-gas-law-calculator"
relatedType: "calculator"
faqs:
  - question: "¿Por qué es obligatorio expresar la temperatura en Kelvin en la ley combinada de los gases?"
    answer: "Porque las leyes de Charles y Gay-Lussac se basan en la temperatura termodinámica absoluta, cuyo cero (0 K o -273.15 °C) corresponde a la mínima energía cinética traslacional. Si utiliza grados Celsius o Fahrenheit, valores negativos o iguales a cero provocan divisiones por cero o signos invertidos sin sentido físico."
  - question: "¿Qué magnitud debe permanecer constante para que la ley combinada sea válida?"
    answer: "La cantidad de sustancia gaseosa, es decir, el número de moles (n) del sistema cerrado. No debe existir entrada ni fuga de gas durante la transición entre el estado inicial y el estado final, ni tampoco reacciones químicas ni cambios de fase como condensación o sublimación."
  - question: "¿Es necesario convertir la presión a atmósferas y el volumen a litros antes de calcular?"
    answer: "No es obligatorio convertirlos a atmósferas o litros, siempre que las unidades de presión inicial y final coincidan entre sí (por ejemplo, ambas en kPa, bar o mmHg) y las unidades de volumen también sean idénticas en ambos estados (ambas en L, mL o m³), ya que los factores de conversión se cancelan."
  - question: "¿Cómo se diferencia la presión manométrica de la presión absoluta al usar la calculadora?"
    answer: "Un manómetro mide la presión relativa respecto a la atmósfera circundante (0 en el manómetro equivale aproximadamente a 101.325 kPa absolutos). La ley combinada exige presión absoluta; por ello, siempre debe sumar la presión atmosférica local a la lectura manométrica antes de ingresar los datos."
  - question: "¿En qué condiciones reales deja de cumplirse con precisión la ley combinada de los gases?"
    answer: "La ecuación pierde exactitud a presiones muy elevadas (por encima de 10 a 20 atm según el gas) o a temperaturas cercanas al punto de condensación. En esos regímenes el volumen propio de las moléculas y las fuerzas intermoleculares alteran el factor de compresibilidad Z, requiriendo ecuaciones de estado reales como Van der Waals o Peng-Robinson."
---

La **ley combinada de los gases** integra en una sola expresión matemática las leyes de Boyle-Mariotte, Charles y Gay-Lussac para describir el comportamiento de una masa fija de gas cuando cambian simultáneamente la presión, el volumen y la temperatura. Su ecuación fundamental, `(P₁ × V₁) / T₁ = (P₂ × V₂) / T₂`, establece que el cociente entre el producto presión-volumen y la temperatura absoluta permanece constante mientras no varíe la cantidad de moles del sistema.

Nuestra [Calculadora de la Ley Combinada de los Gases](/es/calculadoras/calculadora-de-ley-combinada-de-gases) despeja automáticamente cualquiera de las seis variables a partir de las cinco restantes y realiza las conversiones de escala térmica necesarias. Esta guía reúne la formulación teórica, un ejercicio numérico verificado paso a paso, una tabla comparativa de escenarios físicos y las precauciones experimentales clave.

## Integración de las tres leyes y variables de estado

La ley combinada deriva de la ecuación del gas ideal (`P × V = n × R × T`). Al despejar el producto constante `n × R` para un sistema cerrado sin intercambio de materia (`n₁ = n₂`), resulta invariante la relación `(P × V) / T = k`. Cada ley clásica representa un caso particular cuando una variable permanece fija:

* **Ley de Boyle (proceso isotérmico, `T₁ = T₂`):** al cancelarse la temperatura en ambos miembros, queda `P₁ × V₁ = P₂ × V₂`, reflejando proporcionalidad inversa entre presión y volumen.
* **Ley de Charles (proceso isobárico, `P₁ = P₂`):** al cancelarse la presión, se obtiene `V₁ / T₁ = V₂ / T₂`, describiendo la expansión térmica proporcional a la temperatura absoluta.
* **Ley de Gay-Lussac (proceso isocórico, `V₁ = V₂`):** en un recipiente rígido de volumen fijo, la ecuación se reduce a `P₁ / T₁ = P₂ / T₂`, vinculando calentamiento con aumento de presión interna.

### Definición estricta de parámetros y unidades

* **`P₁` y `P₂` (presión absoluta):** fuerza normal por unidad de área ejercida por las colisiones moleculares, medida respecto al vacío absoluto (en `kPa`, `Pa`, `atm`, `bar`, `mmHg` o `psi` absolutos).
* **`V₁` y `V₂` (volumen):** espacio físico ocupado por el gas (en `L`, `mL`, `cm³` o `m³`), idéntico en unidad entre ambos estados.
* **`T₁` y `T₂` (temperatura absoluta):** magnitud proporcional a la energía cinética traslacional media, expresada obligatoriamente en kelvin mediante `T(K) = T(°C) + 273.15` (o Rankine en unidades imperiales).

## Ejemplo resuelto paso a paso: globo meteorológico en ascenso

Un globo sonda flexible cargado con helio parte del nivel del mar con un volumen inicial `V₁ = 50.0 L`, presión atmosférica `P₁ = 101.3 kPa` y temperatura de `25.0 °C`. Al alcanzar la tropopausa, los sensores miden una presión exterior `P₂ = 25.0 kPa` y una temperatura de `-45.0 °C`. Suponiendo comportamiento ideal, ausencia de fugas y equilibrio mecánico y térmico, calculamos el volumen final `V₂`.

### Paso 1: Conversión a escala Kelvin

```text
T₁ = 25.0 + 273.15 = 298.15 K
T₂ = -45.0 + 273.15 = 228.15 K
```

### Paso 2: Despeje algebraico y cálculo verificado

Partiendo de `(P₁ × V₁) / T₁ = (P₂ × V₂) / T₂`, se despeja `V₂`:

```text
V₂ = (P₁ × V₁ × T₂) / (T₁ × P₂)
Numerador   = 101.3 kPa × 50.0 L × 228.15 K = 1,155,579.75 kPa·L·K
Denominador = 298.15 K × 25.0 kPa          = 7,453.75 kPa·K
V₂          = 1,155,579.75 / 7,453.75      = 155.03 L
```

Aunque el enfriamiento tiende a contraer el helio (`228.15 / 298.15 = 0.765`), la caída de presión atmosférica a menos de un cuarto (`101.3 / 25.0 = 4.052`) domina el proceso. El volumen crece `3.10` veces, explicando por qué los globos sonda despegan parcialmente inflados.

## Escenarios comparativos de aplicación práctica

La tabla siguiente compara seis transiciones gaseosas reales donde varían presión, volumen y temperatura simultáneamente:

| Escenario físico | Estado inicial (`P₁`, `V₁`, `T₁`) | Estado final conocido | Resultado calculado | Mecanismo dominante |
| :--- | :--- | :--- | :--- | :--- |
| Globo sonda en altitud | `101.3 kPa`, `50.0 L`, `298.15 K` | `P₂ = 25.0 kPa`, `T₂ = 228.15 K` | `V₂ = 155.03 L` | Descompresión supera enfriamiento |
| Burbuja en buceo (30 m) | `4.00 atm`, `12.0 mL`, `281.15 K` | `P₂ = 1.00 atm`, `T₂ = 297.15 K` | `V₂ = 50.73 mL` | Expansión combinada al ascender |
| Compresor de aire | `1.00 bar`, `100.0 L`, `293.15 K` | `P₂ = 8.00 bar`, `T₂ = 393.15 K` | `V₂ = 16.77 L` | Compresión con calentamiento |
| Neumático en autopista | `320 kPa`, `35.0 L`, `288.15 K` | `V₂ = 35.4 L`, `T₂ = 328.15 K` | `P₂ = 360.3 kPa` | Alza térmica casi isocórica |
| Jeringa en cámara térmica | `101.3 kPa`, `60.0 mL`, `295.15 K` | `P₂ = 120.0 kPa`, `V₂ = 45.0 mL` | `T₂ = 262.19 K` | Enfriamiento y compresión |
| Cilindro criogénico de N₂ | `150.0 bar`, `40.0 L`, `300.15 K` | `V₂ = 40.0 L`, `T₂ = 200.15 K` | `P₂ = 100.0 bar` | Caída proporcional de presión |

## Errores frecuentes, calibración y límites del modelo ideal

La validez de cualquier cálculo depende de verificar los supuestos termodinámicos antes de ingresar los datos:

* **Usar presión manométrica sin ajuste atmosférico:** los manómetros miden sobrepresión respecto al aire ambiente. Si un neumático marca `220 kPa` al nivel del mar, su presión absoluta es `220 + 101.3 = 321.3 kPa`; omitir este ajuste distorsiona `P₂ / P₁`.
* **Omitir la conversión a Kelvin:** sustituir `25 °C` y `-45 °C` en el ejemplo del globo habría arrojado un volumen negativo imposible (`-364.7 L`).
* **Cambios de masa o condensación:** la ecuación exige `n` constante. Si existe fuga de gas o condensación de vapor de agua al enfriar, la cantidad de moles varía e invalida el cálculo.
* **Desviaciones no ideales a alta presión:** por encima de `20 atm` o cerca del punto crítico, el volumen molecular excluido y las fuerzas de Van der Waals modifican el comportamiento ideal. En ingeniería se corrige mediante el factor de compresibilidad `Z` en `P × V = Z × n × R × T`, donde `Z` supera desviaciones del `5 %` en gases polares o pesados.
