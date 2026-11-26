---
title: "Calculadora de la Ley de Faraday de la Electrólisis"
description: "Guía técnica sobre las leyes de Faraday de la electrólisis: cálculo de masa depositada, carga eléctrica, equivalente electroquímico, ejemplo resuelto de cobreado y tabla comparativa de metales."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "faradays-law-calculator"
relatedType: "calculator"
faqs:
  - question: "¿Por qué la constante de Faraday vale aproximadamente 96 485 C/mol?"
    answer: "La constante de Faraday (F) representa la carga eléctrica total transportada por un mol de electrones. Se calcula multiplicando la carga elemental del electrón (e = 1.602176634 × 10⁻¹⁹ C) por la constante de Avogadro (N_A = 6.02214076 × 10²³ mol⁻¹), cuyo producto exacto es 96 485.33212 C/mol."
  - question: "¿Qué diferencia existe entre un ion monovalente y uno divalente o trivalente para la misma corriente?"
    answer: "Para una misma carga eléctrica total Q, un ion monovalente (n = 1, como Ag⁺) requiere un mol de electrones por mol de metal depositado, mientras que un ion divalente (n = 2, como Cu²⁺) necesita dos moles de electrones y un ion trivalente (n = 3, como Al³⁺ o Cr³⁺) exige tres. En consecuencia, los moles depositados se reducen a la mitad o a la tercera parte cuando aumenta la valencia n."
  - question: "¿La ley de Faraday sigue siendo válida si la corriente eléctrica fluctúa durante el proceso?"
    answer: "Sí, siempre que se integre la corriente instantánea en el tiempo para obtener la carga total real Q = ∫ I(t) dt en culombios. Si utiliza una fuente rectificada con corriente constante (galvanostática), la integral se simplifica al producto directo Q = I × t; en procesos con corriente variable debe emplearse el promedio ponderado o un culombímetro."
  - question: "¿Por qué la masa pesada en un baño electrolítico real suele ser ligeramente menor que la predicha por Faraday?"
    answer: "La ecuación teórica asume un rendimiento farádico del 100 %, es decir, que toda la corriente reduce exclusivamente el ion metálico deseado. En la práctica, parte de la carga se consume en reacciones parásitas en el cátodo —especialmente la evolución simultánea de gas hidrógeno en disoluciones acuosas— o en cortocircuitos locales, reduciendo la eficiencia catódica típica al 85 %–98 %."
  - question: "¿Puede aplicarse la ley de Faraday para calcular el espesor de un recubrimiento galvánico?"
    answer: "Sí. Una vez obtenida la masa depositada m en gramos mediante la ley de Faraday, se divide entre la densidad del metal ρ (en g/cm³) para hallar el volumen depositado, y luego entre el área superficial recubierta A (en cm²). El cociente resultante δ = m / (ρ × A) entrega el espesor medio de la película en centímetros o micrómetros."
---

Las **leyes de Faraday de la electrólisis** establecen la proporcionalidad directa entre la carga eléctrica que circula por una celda y la cantidad de sustancia transformada en los electrodos. Su expresión unificada determina la masa depositada o disuelta a partir de la corriente, el tiempo y el peso equivalente del ion: `m = (I × t × M) / (n × F)`.

Mediante nuestra [Calculadora de la Ley de Faraday](/es/calculadoras/calculadora-de-ley-de-faraday) puede calcular al instante la masa obtenida, la carga eléctrica, la intensidad o el tiempo requerido en **galvanoplastia**, **electrorefinación** y culombimetría. Esta guía detalla las ecuaciones, las unidades exactas, un ejercicio completo de electrodeposición, una tabla de equivalentes electroquímicos y las causas reales de desviación.

## Formulación matemática de las dos leyes de Faraday

El modelo de Faraday vincula la corriente macroscópica con la estequiometría química mediante dos enunciados complementarios:

- **Primera Ley de Faraday:** la masa (`m`) alterada en un electrodo es directamente proporcional a la carga eléctrica total (`Q`) que atraviesa el electrolito (`m ∝ Q`).
- **Segunda Ley de Faraday:** si la misma carga eléctrica recorre en serie distintas celdas, las masas depositadas de diferentes sustancias son proporcionales a sus pesos equivalentes (`M / n`).

```text
Carga eléctrica y moles de electrones:
Q = I × t
n_e = Q / F

Masa depositada o liberada (ecuación unificada):
m = (Q × M) / (n × F) = (I × t × M) / (n × F)

Equivalente electroquímico (Z) y masa con rendimiento farádico (η):
Z = M / (n × F)
m_real = m_teórica × η_farádica
```

Definición exacta de magnitudes en el Sistema Internacional:

- **`m`:** masa depositada o liberada (`g`).
- **`Q`:** carga eléctrica total (`C`), donde `1 C = 1 A·s`.
- **`I`:** corriente continua constante (`A`).
- **`t`:** tiempo transcurrido en segundos (`s`); convierta minutos u horas antes de sustituir (`1 min = 60 s`; `1 h = 3 600 s`).
- **`M`:** masa molar de la sustancia (`g/mol`).
- **`n`:** electrones transferidos por ion o molécula en la semirreacción (adimensional).
- **`F`:** constante de Faraday (`96 485 C/mol`).
- **`Z`:** equivalente electroquímico (`g/C`), masa transformada por cada culombio.

## Ejemplo resuelto paso a paso: electrodeposición de cobre

Un baño ácido de sulfato de cobre(II) (`CuSO₄`) recubre conectores eléctricos aplicando `I = 4.50 A` durante `45 minutos`. Calcule la masa teórica de cobre depositada y la masa real esperada con una eficiencia catódica del `94.0 %`.

### Paso 1: Identificar la semirreacción y convertir el tiempo

La reducción catódica es `Cu²⁺(ac) + 2 e⁻ → Cu(s)`, de modo que `n = 2` y `M = 63.546 g/mol`. En segundos, el tiempo vale:

```text
t = 45 min × 60 s/min = 2 700 s
```

### Paso 2: Calcular carga total y moles de electrones

```text
Q = 4.50 A × 2 700 s = 12 150 C
n_e = 12 150 C / 96 485 C/mol = 0.12593 mol e⁻
```

### Paso 3: Calcular la masa teórica y la masa real

Cada mol de cobre consume `2` moles de electrones:

```text
n_Cu = 0.12593 mol e⁻ / 2 = 0.062963 mol Cu
m_teórica = (12 150 C × 63.546 g/mol) / (2 × 96 485 C/mol) = 4.001 g Cu
m_real = 4.001 g × 0.940 = 3.761 g Cu
```

Sobre un área sumergida de `120 cm²` y densidad del cobre `8.96 g/cm³`, el espesor medio resulta `3.761 / (8.96 × 120) = 0.00350 cm` (`35.0 µm`).

## Tabla comparativa de depósito electroquímico por metal (a 10 000 C)

La tabla compara el equivalente electroquímico `Z` y la masa teórica depositada al circular exactamente `Q = 10 000 C` (`5.0 A` durante `2 000 s`) con rendimiento del `100 %`:

| Metal | Semirreacción catódica | `n` | `M` (`g/mol`) | `Z` (`mg/C`) | Masa en `10 000 C` |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Plata (`Ag`)** | `Ag⁺ + e⁻ → Ag` | `1` | `107.868` | `1.1180` | `11.180 g` |
| **Oro (`Au`)** | `Au(CN)₂⁻ + e⁻ → Au + 2 CN⁻` | `1` | `196.967` | `2.0414` | `20.414 g` |
| **Cobre (`Cu`)** | `Cu²⁺ + 2 e⁻ → Cu` | `2` | `63.546` | `0.3293` | `3.293 g` |
| **Níquel (`Ni`)** | `Ni²⁺ + 2 e⁻ → Ni` | `2` | `58.693` | `0.3042` | `3.042 g` |
| **Zinc (`Zn`)** | `Zn²⁺ + 2 e⁻ → Zn` | `2` | `65.380` | `0.3388` | `3.388 g` |
| **Cromo (`Cr`)** | `CrO₄²⁻ + 8 H⁺ + 6 e⁻ → Cr + 4 H₂O` | `6` | `51.996` | `0.0898` | `0.898 g` |
| **Aluminio (`Al`)** | `Al³⁺ + 3 e⁻ → Al` | `3` | `26.982` | `0.0932` | `0.932 g` |

## Aplicaciones industriales y errores habituales en el cálculo

Las leyes de Faraday rigen el **electrorefinado de cobre** (obteniendo cátodos de pureza `99.99 %`), los **recubrimientos galvánicos** anticorrosivos o conductivos (zincado, niquelado, cromado, dorado) y la **culombimetría analítica**, técnica absoluta para cuantificar especies sin patrones externos de calibración.

Evite cuatro errores comunes al aplicar la ecuación:

1. **No convertir el tiempo a segundos:** usar minutos u horas con `F = 96 485 C/mol` introduce un error de factor `60` o `3 600`; si trabaja en horas, utilice `26.801 A·h/mol`.
2. **Asignar incorrectamente la valencia `n`:** en complejos de cianuro el cobre se reduce desde `[Cu(CN)₂]⁻` (`n = 1`), depositando el doble de masa por culombio que desde `Cu²⁺` (`n = 2`).
3. **Confundir gases moleculares con átomos:** para gases como `H₂`, `O₂` o `Cl₂`, `M` y `n` deben corresponder a la molécula (`M(O₂) = 32.00 g/mol` con `n = 4`), no al átomo aislado.
4. **Superar la densidad de corriente límite:** elevar `I` en exceso agota los iones junto al cátodo, produce depósitos porosos y desvía carga hacia la evolución parásita de hidrógeno, reduciendo `η_farádica`.
