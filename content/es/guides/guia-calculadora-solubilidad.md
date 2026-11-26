---
title: "Calculadora de Solubilidad: Química de la Disolución"
description: "Guía técnica sobre la solubilidad química: cálculo de solubilidad molar y másica, curvas de solubilidad, entalpía de disolución, ley de Henry para gases y ejemplo resuelto."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "solubility-calculator"
relatedType: "calculator"
faqs:
  - question: "¿Por qué la solubilidad de los sólidos suele aumentar con la temperatura mientras que la de los gases disminuye?"
    answer: "La disolución de la mayoría de los sólidos iónicos y moleculares es endotérmica (ΔH_dis > 0), por lo que suministrar calor favorece la ruptura de la red cristalina según el principio de Le Chatelier. En cambio, disolver un gas en un líquido suele ser un proceso exotérmico (ΔH_dis < 0): al elevar la temperatura aumenta la energía cinética de las moléculas gaseosas y estas escapan con mayor facilidad de la fase líquida."
  - question: "¿Qué diferencia hay entre expresar la solubilidad en g/100 g de agua y en molaridad (mol/L)?"
    answer: "La escala g/100 g de agua mide la masa de soluto respecto a una masa fija de disolvente puro y no cambia si varía la densidad al disolver. La solubilidad molar (mol/L) divide los moles de soluto entre el volumen total final de la disolución; en disoluciones concentradas el soluto expande el volumen total, por lo que ambas magnitudes no se convierten mediante un simple factor sin conocer la densidad."
  - question: "¿Qué distingue a una disolución insaturada, una saturada y una sobresaturada?"
    answer: "Una disolución insaturada contiene menos soluto del máximo permitido a esa temperatura y disolverá más si se añade. Una disolución saturada alcanza exactamente el límite de equilibrio dinámico entre soluto disuelto y sin disolver. Una disolución sobresaturada retiene temporalmente más soluto del límite de equilibrio (por enfriamiento lento) y cristaliza de inmediato ante una perturbación o núcleo de siembra."
  - question: "¿Cómo influye la presión en la solubilidad de sólidos frente a gases?"
    answer: "Para sólidos y líquidos disueltos en líquidos, el efecto de la presión es prácticamente despreciable porque las fases condensadas son casi incompresibles. Para gases, la presión es determinante: según la ley de Henry, la concentración de gas disuelto aumenta de forma directamente proporcional a la presión parcial del gas sobre el líquido."
  - question: "¿Debe incluirse el agua de hidratación en la masa molar al calcular la solubilidad molar?"
    answer: "Si se pesa una sal hidratada como CuSO₄·5H₂O (249.68 g/mol) para preparar la disolución, debe dividirse entre la masa molar del hidrato para obtener los moles reales de Cu²⁺ y SO₄²⁻ introducidos, y recordar que el agua cristalina pasa a formar parte del disolvente total."
---

La **solubilidad** es la cantidad máxima de un **soluto** que se disuelve de forma estable en un **disolvente** (o disolución) a una temperatura y presión definidas. Depende del balance energético entre las fuerzas cohesivas del soluto puro y las interacciones de solvatación con el disolvente.

En laboratorio e industria se expresa como **solubilidad molar (`mol/L`)**, concentración másica (`g/L`), porcentaje en masa (`% m/m`) o `g / 100 g` de disolvente. La [Calculadora de Solubilidad](/es/calculadoras/calculadora-de-solubilidad) convierte masa, masa molar y volumen en solubilidad molar exacta.

## Magnitudes, ecuaciones y factores fisicoquímicos

Para calcular la **solubilidad molar (`S_molar`)** a partir de la masa de soluto disuelta en una disolución saturada de volumen conocido, se aplican dos pasos directos:

```text
n = m / M
S_molar = n / V = m / (M × V)
```

Donde:

- **`m`:** masa del soluto efectivamente disuelto (`g`).
- **`M`:** masa molar del soluto (`g/mol`).
- **`n`:** cantidad de sustancia en moles (`mol`).
- **`V`:** volumen total de la disolución saturada expresado en litros (`L`).

A partir de `S_molar`, la concentración másica en gramos por litro se obtiene mediante `S_masa = S_molar × M`. Cuando los datos experimentales se registran respecto a la masa del disolvente puro (por ejemplo, agua), la convención estándar utiliza `S_100g = (m_soluto / m_disolvente) × 100`.

### Influencia de la temperatura y entalpía de disolución

La variación de la solubilidad con la temperatura está gobernada por la **entalpía de disolución (`ΔH_dis`)**, que suma la energía necesaria para separar las partículas del soluto y la energía liberada al solvatarlas:

- **Disolución endotérmica (`ΔH_dis > 0`):** el sistema absorbe calor al disolverse (como `KNO₃` o `NH₄Cl`); elevar la temperatura incrementa notablemente la solubilidad.
- **Disolución exotérmica (`ΔH_dis < 0`):** el proceso libera calor (como `Li₂CO₃`, `Ca(OH)₂` o `Ce₂(SO₄)₃`); calentar el sistema reduce la solubilidad del sólido (solubilidad retrógrada).

### Solubilidad de gases y ley de Henry

A diferencia de los sólidos, la solubilidad de los gases en líquidos depende críticamente de la presión parcial del gas sobre la superficie líquida, según la **ley de Henry**:

```text
C = k_H × P_gas
```

Donde `C` es la concentración del gas disuelto (`mol/L`), `k_H` es la constante de Henry específica del par gas-disolvente a una temperatura dada (`mol/(L·atm)`) y `P_gas` es la presión parcial (`atm`). Además, al aumentar la temperatura, `k_H` disminuye, explicando la pérdida de gas en bebidas carbonatadas tibias y la reducción de oxígeno disuelto en ríos cálidos.

## Ejemplo numérico resuelto paso a paso

A `20 °C`, una disolución acuosa saturada de nitrato de potasio (`KNO₃`, `M = 101.10 g/mol`) contiene exactamente `31.6 g` de sal disueltos en `100.0 g` de agua. Tras completar la disolución y homogeneizar a `20 °C`, el volumen total medido de la mezcla es de `110.2 mL`. Calcule la solubilidad molar, la concentración en `g/L` y el porcentaje en masa (`% m/m`).

**Paso 1: Convertir el volumen total de la disolución a litros.**

```text
V = 110.2 mL / 1000 mL/L = 0.1102 L
```

**Paso 2: Calcular los moles de `KNO₃` disueltos.**

```text
n = 31.6 g / 101.10 g/mol = 0.31256 mol
```

**Paso 3: Determinar la solubilidad molar (`mol/L`).**

```text
S_molar = 0.31256 mol / 0.1102 L = 2.836 mol/L ≈ 2.84 M
```

**Paso 4: Expresar la concentración másica y el porcentaje en masa.**

```text
S_masa = 31.6 g / 0.1102 L = 286.75 g/L
% m/m = [31.6 g / (31.6 g + 100.0 g)] × 100 = (31.6 / 131.6) × 100 = 24.01 %
```

Este ejemplo ilustra una distinción esencial: aunque la solubilidad clásica del `KNO₃` se tabula como `31.6 g / 100 g H₂O` (`316 g` por kilogramo de disolvente), su concentración volumétrica en disolución saturada es `286.75 g/L` porque los `31.6 g` de sal expanden el volumen desde `100.0 mL` hasta `110.2 mL`.

## Tabla comparativa de solubilidades representativas a 20 °C

| Sustancia | Estado y naturaleza | Solubilidad (g / 100 g H₂O) | Tendencia al subir T | Observación fisicoquímica |
| :--- | :--- | :--- | :--- | :--- |
| Cloruro de sodio (`NaCl`) | Sólido iónico | `35.9` | Aumenta muy poco | `ΔH_dis ≈ +3.9 kJ/mol`; curva casi plana |
| Nitrato de potasio (`KNO₃`) | Sólido iónico | `31.6` | Aumenta fuertemente | `ΔH_dis ≈ +34.9 kJ/mol`; ideal para recristalizar |
| Sacarosa (`C₁₂H₂₂O₁₁`) | Sólido molecular polar | `204` | Aumenta fuertemente | Abundantes puentes de hidrógeno con el agua |
| Hidróxido de calcio (`Ca(OH)₂`) | Sólido iónico | `0.165` | Disminuye | Disolución exotérmica; base moderadamente soluble |
| Dióxido de carbono (`CO₂`, 1 atm) | Gas reactivo | `0.169` | Disminuye | Regido por ley de Henry y equilibrio carbónico |
| Oxígeno (`O₂`, 1 atm) | Gas apolar | `0.0043` | Disminuye | Crítico para la vida acuática y la corrosión |

## Aplicaciones en laboratorio, farmacia y errores comunes

La cuantificación precisa de la solubilidad es clave para purificar compuestos por **recristalización** (aprovechando gradientes térmicos), formular medicamentos cuya biodisponibilidad depende de su disolución acuosa y controlar el oxígeno disuelto en sistemas ambientales e industriales.

En la práctica analítica conviene evitar cuatro errores frecuentes:

1. **Confundir volumen de disolvente con volumen final:** disolver `31.6 g` de sal en `100 mL` de agua expande el volumen total; usar `100 mL` sobreestima la molaridad.
2. **Olvidar convertir mililitros a litros:** dividir moles entre `mL` genera un error de factor `1,000`.
3. **Ignorar transiciones de hidratos:** sales como `Na₂SO₄·10H₂O` cambian de pendiente a `32.4 °C` al deshidratarse; extrapolar linealmente invalida la predicción.
4. **Omitir reacciones en disolución:** gases como `HCl` o `NH₃` alcanzan altas solubilidades no solo por polaridad, sino por ionización ácido-base.
