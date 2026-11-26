---
title: "Calculadora de Constante de Equilibrio: Midiendo el Balance Químico"
description: "Guía técnica sobre la constante de equilibrio (Keq, Kc y Kp): ley de acción de masas, cociente de reacción Q, relación con ΔG°, ejemplo resuelto y aplicaciones."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "equilibrium-constant-calculator"
relatedType: "calculator"
faqs:
  - question: "¿Por qué los sólidos puros y los líquidos puros no se incluyen en la expresión de Keq?"
    answer: "En termodinámica química, la constante de equilibrio se define en función de las actividades químicas y no solo de las concentraciones. La densidad y la concentración molar de un sólido puro o de un líquido puro permanecen prácticamente invariables durante la reacción, por lo que su actividad termodinámica se toma como igual a 1 y no modifica el valor numérico de Keq."
  - question: "¿Cuál es la diferencia práctica entre Kc, Kp y el cociente de reacción Q?"
    answer: "Kc expresa el equilibrio mediante concentraciones molares (mol/L), mientras que Kp utiliza presiones parciales de gases (atm o bar). Por su parte, el cociente de reacción Q emplea exactamente la misma fórmula matemática que Keq, pero evaluada con concentraciones o presiones instantáneas fuera del equilibrio para predecir hacia qué sentido avanzará la reacción."
  - question: "¿Un catalizador o un aumento de presión modifican el valor de la constante de equilibrio?"
    answer: "No. Un catalizador acelera por igual la reacción directa y la inversa, permitiendo alcanzar el equilibrio más rápido sin alterar Keq. Del mismo modo, un cambio de presión o de concentración desplaza la composición del sistema según el principio de Le Chatelier, pero Keq permanece constante; únicamente un cambio de temperatura modifica su valor."
  - question: "¿La constante de equilibrio tiene unidades o es adimensional?"
    answer: "Desde el punto de vista estrictamente termodinámico, Keq es adimensional porque se construye con actividades relativas a estados estándar de 1 M o 1 bar. En la enseñanza y en cálculos prácticos con concentraciones o presiones, suele tratarse también como una magnitud sin unidades, aunque algunos textos expresan unidades aparentes según la diferencia estequiométrica Δn."
  - question: "¿Qué indica un valor de Keq cercano a 10⁻⁵ frente a uno cercano a 10⁵?"
    answer: "Un Keq muy pequeño (10⁻⁵) señala que el equilibrio está fuertemente desplazado hacia los reactivos y la conversión en productos es mínima. En cambio, un Keq muy grande (10⁵) indica que la reacción directa es termodinámicamente muy favorable y que, al alcanzarse el equilibrio, la mezcla contiene casi exclusivamente productos."
---

En la mayoría de los procesos químicos, los reactivos no se consumen por completo. Conforme se acumulan productos, estos reaccionan en sentido inverso hasta igualar las velocidades directa e inversa. Ese estado se denomina **equilibrio dinámico**: las concentraciones macroscópicas permanecen constantes, aunque ambas reacciones prosiguen a nivel molecular.

La **constante de equilibrio (`Keq`)** cuantifica ese balance mediante la ley de acción de masas (`Keq > 1` favorece productos; `Keq < 1` favorece reactivos). La [Calculadora de Constante de Equilibrio](/es/calculadoras/calculadora-de-constante-de-equilibrio) determina `Kc`, `Kp`, el cociente `Q` y `ΔG°`.

## Formulación matemática, Kc, Kp y parámetros clave

Para una reacción reversible balanceada `a A + b B ⇌ c C + d D`, la constante en concentraciones molares (`Kc`) es:

```text
Kc = ([C]^c × [D]^d) / ([A]^a × [B]^b)
```

Donde `[A]`, `[B]`, `[C]` y `[D]` son concentraciones de equilibrio en `mol/L` (`M`), y `a`, `b`, `c`, `d` son los coeficientes estequiométricos. Los sólidos puros `(s)` y líquidos puros `(l)` tienen actividad unitaria (`1`) y se omiten.

### Relación entre Kc, Kp y energía libre de Gibbs

En reacciones gaseosas suele emplearse `Kp` con presiones parciales (`atm` o `bar`):

```text
Kp = Kc × (R × T)^Δn
```

Aquí, `R = 0.08206 L·atm/(mol·K)`, `T` es la temperatura en kelvin (`K = °C + 273.15`) y `Δn = (c + d) − (a + b)` considera solo gases. Termodinámicamente, `ΔG° = −R × T × ln(Keq)` con `R = 8.314 J/(mol·K)`.

### Cociente de reacción (Q) y sentido de evolución

El **cociente de reacción (`Q`)** aplica la misma fórmula con concentraciones instantáneas fuera del equilibrio:

- **`Q < Keq`:** exceso de reactivos; el sistema avanza hacia los productos.
- **`Q = Keq`:** sistema en equilibrio dinámico sin cambio neto.
- **`Q > Keq`:** exceso de productos; la reacción progresa en sentido inverso.

## Ejemplo numérico resuelto paso a paso

Considere la síntesis en fase gaseosa del yoduro de hidrógeno en un reactor cerrado de `2.00 L` a `458 °C` (`731.15 K`):

```text
H₂(g) + I₂(g) ⇌ 2 HI(g)
```

Al alcanzar el equilibrio, el análisis instrumental registra `0.200 mol` de `H₂`, `0.200 mol` de `I₂` y `1.400 mol` de `HI`.

**Paso 1: Convertir los moles en concentraciones molares (`mol/L`).**

```text
[H₂] = 0.200 mol / 2.00 L = 0.100 M
[I₂] = 0.200 mol / 2.00 L = 0.100 M
[HI] = 1.400 mol / 2.00 L = 0.700 M
```

**Paso 2: Plantear la expresión de `Kc` y sustituir los exponentes estequiométricos.**

```text
Kc = [HI]^2 / ([H₂] × [I₂])
Kc = (0.700)^2 / (0.100 × 0.100) = 0.490 / 0.0100 = 49.0
```

**Paso 3: Determinar `Kp` y verificar la espontaneidad estándar (`ΔG°`).**

Como hay `2` moles de gas en los productos y `1 + 1 = 2` moles de gas en los reactivos, `Δn = 2 − 2 = 0`. Por lo tanto, `Kp = 49.0 × (R × T)^0 = 49.0`. Evaluando la energía libre estándar a `731.15 K`:

```text
ΔG° = −8.314 J/(mol·K) × 731.15 K × ln(49.0)
ΔG° = −6078.78 × 3.8918 ≈ −23,657 J/mol = −23.66 kJ/mol
```

El resultado `Kc = 49.0` y `ΔG° = −23.66 kJ/mol` confirma que, a esa temperatura, la formación de `HI` está claramente favorecida frente a la mezcla sin reaccionar.

## Tabla comparativa de magnitudes de Keq y escenarios de reacción

| Condición o rango | Predominio en el equilibrio | Signo de ΔG° | Comportamiento del sistema | Ejemplo representativo |
| :--- | :--- | :--- | :--- | :--- |
| `Keq > 10³` | Casi todo en productos | `ΔG° < 0` (muy negativo) | Reacción prácticamente cuantitativa | Oxidación de `CO` a alta temperatura |
| `1 < Keq ≤ 10³` | Predominan los productos | `ΔG° < 0` (moderado) | Mezcla con conversión favorable | `H₂ + I₂ ⇌ 2 HI` a `458 °C` (`Kc = 49.0`) |
| `0.1 ≤ Keq ≤ 1` | Cantidades comparables | `ΔG° ≈ 0` | Coexisten reactivos y productos | Esterificación de Fischer típica |
| `Keq < 10⁻³` | Predominan los reactivos | `ΔG° > 0` (muy positivo) | Conversión directa despreciable | Autoionización del agua (`Kw = 10⁻¹⁴`) |
| `Q < Keq` | Sistema fuera de equilibrio | `ΔG < 0` (espontánea →) | Avanza formando más productos | Inicio de síntesis de amoníaco |
| `Q > Keq` | Sistema fuera de equilibrio | `ΔG > 0` (espontánea ←) | Retrocede regenerando reactivos | Descomposición tras añadir producto |

## Aplicaciones industriales, errores frecuentes y límites termodinámicos

El control de `Keq` sustenta procesos clave como la síntesis de amoníaco (Haber-Bosch, `N₂ + 3 H₂ ⇌ 2 NH₃`), la producción de ácido sulfúrico y el reformado con vapor. Según el principio de Le Chatelier, retirar productos o ajustar la presión cuando `Δn ≠ 0` mejora el rendimiento operativo, mientras la temperatura equilibra termodinámica y cinética.

Al calcular `Keq`, evite cuatro errores críticos:

1. **Incluir sólidos o solventes puros:** añadir `CaCO₃(s)` o `H₂O(l)` en disoluciones acuosas diluidas invalida el cociente de acción de masas.
2. **Ignorar la dependencia térmica:** aplicar una `Keq` tabulada a `25 °C` (`298.15 K`) en un reactor que opera a `400 °C` genera graves desviaciones; la variación térmica cuantitativa sigue la ecuación de van 't Hoff.
3. **Confundir `R` entre `Kp` y `ΔG°`:** usar `8.314` en `Kp` con presiones expresadas en atmósferas introduce un error superior a un factor de `100`.
4. **Omitir efectos no ideales:** a presiones elevadas o altas fuerzas iónicas en disolución, las concentraciones y presiones ideales deben reemplazarse por actividades y fugacidades efectivas para mantener la exactitud termodinámica.
