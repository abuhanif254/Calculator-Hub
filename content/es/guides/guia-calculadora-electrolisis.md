---
title: "Calculadora de Electrólisis: La Electricidad al Servicio de la Química"
description: "Guía completa de celdas electrolíticas y cálculos de electrólisis: diferencias con celdas galvánicas, estequiometría de Faraday, consumo energético en kWh, ejemplo resuelto de hidrógeno verde y parámetros industriales."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "electrolysis-calculator"
relatedType: "calculator"
faqs:
  - question: "¿Por qué en una celda electrolítica cambian los signos de los electrodos respecto a una batería?"
    answer: "Por definición electroquímica universal, el ánodo es siempre el electrodo donde ocurre la oxidación y el cátodo donde ocurre la reducción. En una celda galvánica espontánea, el ánodo libera electrones y es el polo negativo; en una celda electrolítica, la fuente externa fuerza la extracción de electrones desde el ánodo (polo positivo) e inyecta electrones hacia el cátodo (polo negativo)."
  - question: "¿Qué voltaje mínimo necesita una electrólisis para comenzar realmente?"
    answer: "En teoría termodinámica, la tensión mínima iguala al potencial reversible |E_celda|. En la práctica, debe aplicarse un voltaje superior que sume el potencial termodinámico, los sobrepotenciales de activación en ánodo y cátodo (necesarios para vencer barreras cinéticas, especialmente al liberar gases) y la caída óhmica I × R del electrolito y las conexiones."
  - question: "¿Por qué no se puede obtener aluminio metálico mediante electrólisis de una sal disuelta en agua?"
    answer: "Porque el ion Al³⁺ posee un potencial de reducción estándar muy negativo (E° = −1.66 V), mucho menor que el del agua (E° ≈ −0.83 V a pH neutro). Si se aplica corriente en disolución acuosa, el agua se reduce primero en el cátodo liberando gas hidrógeno en lugar de depositar aluminio; por ello se emplea alúmina disuelta en criolita fundida a unos 960 °C."
  - question: "¿Cómo se calcula el volumen de gas producido durante la electrólisis de una disolución acuosa?"
    answer: "Primero se obtienen los moles de gas mediante la ley de Faraday: n_gas = (I × t) / (n × F). Luego se sustituye n_gas en la ley de los gases ideales, V = (n_gas × R × T) / P, descontando la presión de vapor del agua si el gas se recoge húmedo sobre un recipiente acuoso."
  - question: "¿Qué determina el consumo eléctrico en kilovatios-hora por kilogramo de producto?"
    answer: "El consumo específico de energía (en kWh/kg) depende directamente del voltaje real de celda U y de la relación electrones-masa molar (n / M), e inversamente de la eficiencia de corriente. Mientras la masa obtenida depende solo de la carga (I × t), el gasto eléctrico total escala con la potencia aplicada (U × I × t), por lo que reducir el sobrepotencial mejora drásticamente la rentabilidad."
---

La **electrólisis** utiliza una fuente externa de corriente continua para forzar reacciones de oxidación-reducción no espontáneas (`ΔG > 0`, `E_celda < 0`). Frente a una pila galvánica que convierte energía química en electricidad, una **celda electrolítica** invierte ese flujo: transforma trabajo eléctrico en productos químicos de alto valor industrial como aluminio primario, hidrógeno de alta pureza, cloro, sosa cáustica y recubrimientos metálicos.

Con nuestra [Calculadora de Electrólisis](/es/calculadoras/calculadora-de-electrolisis) puede despejar masa depositada o liberada, corriente, tiempo o masa molar mediante las relaciones cuantitativas de Faraday. Esta guía contrasta celdas electrolíticas y galvánicas, reúne las ecuaciones de masa, volumen gaseoso y consumo energético en `kWh`, resuelve un caso práctico completo de electrólisis del agua y compara los principales procesos industriales.

## Celdas electrolíticas frente a celdas galvánicas y balance energético

Distinguir la polaridad y el signo termodinámico evita confusiones al analizar reactores electroquímicos:

- **Espontaneidad:** la celda galvánica libera energía (`ΔG < 0`, `E_celda > 0`); la celda electrolítica absorbe trabajo eléctrico (`ΔG > 0`, `U_aplicado > |E_celda|`).
- **Polaridad:** la oxidación siempre sucede en el **ánodo** y la reducción en el **cátodo**, pero en electrólisis el ánodo se conecta al polo **positivo (`+`)** de la fuente y el cátodo al polo **negativo (`−`)**.

```text
Masa depositada o gas liberado (Ley de Faraday):
m = (I × t × M) / (n × F)

Moles y volumen de gas ideal:
n_gas = (I × t) / (n × F)
V_gas = (n_gas × R × T) / P

Tensión real y consumo eléctrico (kWh):
U_celda = |E_rev| + η_ánodo + η_cátodo + (I × R_interna)
E_eléctrica = (U_celda × I × t_horas) / 1 000
```

Definición de variables:

- **`m`:** masa obtenida (`g`); **`M`:** masa molar (`g/mol`); **`n`:** electrones transferidos por mol de producto.
- **`I`:** corriente continua (`A`); **`t`:** tiempo en segundos (`s`); **`t_horas`:** tiempo en horas (`h`).
- **`F`:** constante de Faraday (`96 485 C/mol`); **`R`:** `0.082057 L·atm/(mol·K)`.
- **`η_ánodo`, `η_cátodo`:** sobrepotenciales cinéticos (`V`) que elevan `U_celda` por encima del voltaje reversible `|E_rev|`.

## Ejemplo resuelto paso a paso: electrólisis alcalina para producir hidrógeno

Un electrolizador alcalino opera a `25.0 °C` (`298.15 K`) y `1.00 atm` con `I = 12.0 A` durante `2.00 horas` (`7 200 s`) bajo un voltaje real `U = 2.10 V`. Determine las masas, los volúmenes ideales de `H₂` y `O₂` y el consumo específico en `kWh/kg`.

### Paso 1: Semirreacciones en medio alcalino

- **Cátodo (`−`, reducción):** `2 H₂O(l) + 2 e⁻ → H₂(g) + 2 OH⁻(ac)` (`n = 2`, `M(H₂) = 2.016 g/mol`)
- **Ánodo (`+`, oxidación):** `4 OH⁻(ac) → O₂(g) + 2 H₂O(l) + 4 e⁻` (`n = 4`, `M(O₂) = 32.00 g/mol`)

### Paso 2: Carga eléctrica, moles y masas producidas

```text
Q = 12.0 A × 7 200 s = 86 400 C
n_e = 86 400 C / 96 485 C/mol = 0.89548 mol e⁻

n(H₂) = 0.89548 / 2 = 0.44774 mol → m(H₂) = 0.44774 × 2.016 = 0.9026 g H₂
n(O₂) = 0.89548 / 4 = 0.22387 mol → m(O₂) = 0.22387 × 32.00 = 7.1638 g O₂
```

### Paso 3: Volúmenes gaseosos y consumo específico de energía

```text
V(H₂) = (0.44774 × 0.082057 × 298.15) / 1.00 = 10.954 L H₂
V(O₂) = (0.22387 × 0.082057 × 298.15) / 1.00 = 5.477 L O₂

E_eléctrica = (2.10 V × 12.0 A × 2.00 h) / 1 000 = 0.0504 kWh
Consumo específico = 0.0504 kWh / 0.0009026 kg = 55.84 kWh/kg H₂
```

El volumen de hidrógeno (`10.95 L`) duplica exactamente al de oxígeno (`5.48 L`), y el consumo específico de `55.8 kWh/kg` coincide con el rango habitual (`50–60 kWh/kg`) de los electrolizadores comerciales.

## Tabla comparativa de procesos electrolíticos industriales y de laboratorio

| Proceso | Electrolito | Producto catódico (`n`) | Producto anódico | Voltaje de celda | Escala de corriente |
| :--- | :--- | :--- | :--- | :---: | :--- |
| **Hall-Héroult (Al)** | `Al₂O₃` en criolita (`960 °C`) | `Al` líquido (`n = 3`) | `CO₂` en carbono | `4.1 – 4.5 V` | `150 000 – 500 000 A` |
| **Cloro-álcali** | Salmuera `NaCl(ac)` | `H₂`, `NaOH` (`n = 2`) | `Cl₂(g)` | `3.0 – 3.5 V` | `10 000 – 25 000 A` |
| **Electrólisis PEM** | Agua ultrapura | `H₂(g)` (`n = 2`) | `O₂(g)` (`n = 4`) | `1.8 – 2.2 V` | `1 – 10 000 A` |
| **Electrorefinado Cu** | `CuSO₄ + H₂SO₄(ac)` | `Cu` `99.99 %` (`n = 2`) | Disolución `Cu` | `0.25 – 0.40 V` | `200 – 400 A/m²` |
| **Niquelado Watts** | `NiSO₄, NiCl₂, H₃BO₃` | Capa de `Ni` (`n = 2`) | Disolución `Ni` | `2.0 – 6.0 V` | `200 – 800 A/m²` |
| **Proceso Downs (Na)** | `NaCl + CaCl₂` (`600 °C`) | `Na` líquido (`n = 1`) | `Cl₂(g)` | `5.7 – 7.0 V` | `20 000 – 45 000 A` |

En el electrorefinado de cobre la tensión es mínima (`0.25–0.40 V`) porque se oxida cobre en el ánodo y se reduce `Cu²⁺` en el cátodo, anulando el potencial reversible neto.

## Aplicaciones reales, seguridad y limitaciones prácticas

Además de la metalurgia primaria, la electrólisis impulsa la **producción de hidrógeno verde** con renovables, la **electrocoagulación y recuperación de metales** en aguas residuales y el **anodizado de aluminio** para crear capas protectoras de óxido.

Considere cuatro límites operativos y de seguridad clave:

1. **Competencia del disolvente acuoso:** los cationes alcalinos, alcalinotérreos y `Al³⁺` no se reducen en agua porque el agua se reduce antes formando `H₂`; en salmueras concentradas, el sobrepotencial del oxígeno libera `Cl₂` tóxico en el ánodo.
2. **Riesgo explosivo `H₂ / O₂`:** sin separador o membrana, el hidrógeno y el oxígeno se mezclan en relación `2:1` altamente detonante; todo electrolizador requiere compartimentos estancos y extracción ventilada.
3. **Calentamiento por efecto Joule:** todo exceso de tensión sobre el potencial termoneutral se disipa en calor, evaporando el baño y favoreciendo reacciones secundarias si falta refrigeración.
4. **Exigencia de corriente continua (CC):** la corriente alterna invierte los polos continuamente e impide la deposición o generación neta de producto.
