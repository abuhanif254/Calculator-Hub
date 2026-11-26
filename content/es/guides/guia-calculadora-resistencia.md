---
title: "Resistencia Eléctrica: Controlando el Flujo"
description: "Guía técnica sobre resistencia eléctrica: Ley de Ohm, Ley de Pouillet por material y geometría, asociación en serie y paralelo, diseño con LEDs y potencia disipada."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "resistance-calculator"
faqs:
  - question: "¿Por qué se quema un LED si se conecta directamente a una batería de 9 V sin resistor?"
    answer: "Un LED es un diodo semiconductor cuya corriente crece de manera exponencial en cuanto se supera su tensión directa umbral (alrededor de 1.8 V a 3.3 V según el color). Sin una resistencia limitadora en serie que absorba el excedente de tensión, la batería intenta entregar cientos de miliamperios o amperios, destruyendo la unión semiconductora en milisegundos por sobrecalentamiento."
  - question: "¿Cambia la resistencia eléctrica de un conductor cuando aumenta su temperatura?"
    answer: "Sí. En la mayoría de los metales conductores (cobre, aluminio, tungsteno) la resistencia aumenta con la temperatura porque la agitación térmica de la red cristalina dificulta el paso de los electrones. Por ejemplo, el filamento de una lámpara incandescente puede tener una resistencia diez veces mayor en caliente que a temperatura ambiente. En semiconductores y termistores NTC ocurre el efecto inverso."
  - question: "¿Cuál es la diferencia entre resistencia eléctrica (R) e impedancia (Z)?"
    answer: "La resistencia (R) se opone al flujo de corriente tanto en continua como en alterna disipando energía en forma de calor. La impedancia (Z) es una magnitud más general aplicable a corriente alterna que combina la resistencia pura con la reactancia inductiva y capacitiva dependientes de la frecuencia (Z = √(R² + X²))."
  - question: "¿Por qué conviene elegir un resistor con el doble de capacidad de potencia calculada?"
    answer: "Aunque un resistor de 1/4 W (0.25 W) soporta teóricamente 0.25 W en condiciones ideales de laboratorio, operar al 100 % de su límite eleva su temperatura superficial por encima de 100 °C, acelera la deriva del valor óhmico y puede decolorar o dañar la placa de circuito impreso. Aplicar un factor de seguridad del 50 % garantiza estabilidad térmica y larga vida útil."
  - question: "¿Cómo afecta duplicar el diámetro de un cable de cobre a su resistencia eléctrica?"
    answer: "Según la Ley de Pouillet, la resistencia es inversamente proporcional al área transversal del conductor. Como el área de un círculo depende del cuadrado del radio (A = π × r²), duplicar el diámetro multiplica el área por cuatro y reduce la resistencia eléctrica exactamente a la cuarta parte por unidad de longitud."
---

La **resistencia eléctrica** (símbolo `R`) cuantifica la oposición que presenta un material, componente o circuito al paso de la corriente eléctrica. Su unidad en el Sistema Internacional es el **ohmio** (`Ω`), definido como la resistencia de un conductor que, sometido a una diferencia de potencial de un voltio (`1 V`), deja circular exactamente un amperio (`1 A`).

Controlar la resistencia es la base del diseño electrónico y de la seguridad eléctrica: permite limitar corrientes para proteger semiconductores sensibles, dividir voltajes de referencia, generar calor útil y aislar partes activas. Con nuestra [Calculadora de Resistencia](/es/calculadoras/calculadora-de-resistencia) puede obtener el valor exacto en ohmios para cualquier combinación de tensión y corriente.

## Ecuaciones fundamentales y propiedades físicas

El análisis de resistencia combina las relaciones circuitales de la Ley de Ohm con las propiedades geométricas y térmicas del material conductor.

### Ley de Ohm y relaciones de potencia

Para un elemento óhmico lineal, la resistencia es el cociente entre la tensión aplicada (`V`, en voltios) y la intensidad resultante (`I`, en amperios). A partir de la potencia disipada (`P`, en vatios) también se expresan dos formas equivalentes:

```text
R = V / I
R = V² / P
R = P / I²
```

Toda corriente que atraviesa una resistencia genera calor por **efecto Joule**, cuya potencia disipada se calcula como `P = I² × R = V × I`.

### Ley de Pouillet, temperatura y asociación de resistores

La resistencia física de un conductor depende de la **resistividad** del material (`ρ`, en `Ω·m`), la longitud (`L`, en `m`), la sección transversal (`A`, en `m²`) y el coeficiente térmico (`α`, en `°C⁻¹`):

```text
Ley de Pouillet:
R = ρ × (L / A)

Dependencia térmica respecto a T₀ (20 °C):
R(T) = R₀ × [1 + α × (T − T₀)]

Asociación en serie (misma corriente):
R_eq = R₁ + R₂ + ... + R_n

Asociación en paralelo (mismo voltaje):
1 / R_eq = (1 / R₁) + (1 / R₂) + ... + (1 / R_n)
```

En serie la resistencia total supera siempre a la mayor individual; en paralelo resulta menor que la resistencia más pequeña de la rama.

## Ejemplo práctico paso a paso: resistor limitador para un LED

Suponga que desea alimentar un LED rojo estándar desde una pila de `V_s = 9.0 V`. Su caída de tensión directa es `V_f = 2.0 V` y su corriente nominal segura es `I = 20 mA` (`0.020 A`).

1. **Tensión que debe absorber el resistor (`V_R`):**
   `V_R = V_s − V_f = 9.0 V − 2.0 V = 7.0 V`
2. **Resistencia exacta por Ley de Ohm:**
   `R = 7.0 V / 0.020 A = 350 Ω`
3. **Selección de valor comercial normalizado (serie E12 / E24):**
   Se elige el valor inmediato superior (`390 Ω` en serie E12) para no superar los `20 mA`. La corriente real resultante es:
   `I_real = 7.0 V / 390 Ω = 0.01795 A ≈ 17.95 mA`
4. **Verificación de potencia disipada:**
   `P_R = V_R × I_real = 7.0 V × 0.01795 A = 0.1256 W`.
   Dado que `0.1256 W` supera el límite de `1/8 W` (`0.125 W`), debe instalarse un resistor de **`1/4 W` (`0.25 W`)** o `1/2 W` (`0.50 W`) para asegurar margen térmico.

## Comparativa de resistividad por material a 20 °C

La tabla siguiente compara la resistividad eléctrica (`ρ`) y el coeficiente térmico (`α`) de materiales representativos:

| Material | Categoría | Resistividad `ρ` a `20 °C` (`Ω·m`) | Coeficiente `α` (`°C⁻¹`) | Aplicación técnica principal |
| :--- | :--- | :--- | :--- | :--- |
| Plata (`Ag`) | Conductor óptimo | `1.59 × 10⁻⁸` | `+0.0038` | Contactos de relés y alta frecuencia |
| Cobre recocido (`Cu`) | Conductor estándar | `1.68 × 10⁻⁸` | `+0.00393` | Cableado eléctrico, pistas PCB, bobinados |
| Aluminio (`Al`) | Conductor ligero | `2.82 × 10⁻⁸` | `+0.00429` | Líneas aéreas de distribución eléctrica |
| Nicromo (`Ni-Cr`) | Aleación resistiva | `1.10 × 10⁻⁶` | `+0.0004` | Resistencias calefactoras y estufas |
| Carbono / Grafito | Semimetal / Resistivo | `3.5 × 10⁻⁵` | `−0.0005` | Escobillas de motores y resistores |
| Silicio intrínseco (`Si`) | Semiconductor | `~6.40 × 10²` | `−0.075` | Transistores, diodos y microchips |
| PVC / Vidrio seco | Aislante dieléctrico | `10¹² – 10¹⁶` | Negativo | Recubrimiento de cables y alta tensión |

## Aplicaciones reales, errores comunes y tolerancias

- **Aplicaciones en electrónica y potencia:** además de limitar corriente en LEDs y entradas digitales (*pull-up* / *pull-down*), los resistores forman divisores de tensión para sensores, descargan condensadores de alto voltaje (*bleeder*) y actúan como derivaciones (*shunt*) de precisión (`0.01–0.1 Ω`) para medir corriente.
- **Error de tolerancia comercial:** los resistores de carbono habituales tienen tolerancia de `±5 %`, frente a `±1 %` o `±0.1 %` en película metálica. En puentes de Wheatstone o divisores para convertidores ADC, usar `±5 %` introduce errores de lectura relevantes.
- **Medición en circuito energizado:** nunca debe medirse resistencia con tensión aplicada o condensadores cargados; el voltaje externo falsea la lectura y daña el multímetro. Asimismo, medir componentes soldados en placa incluye las ramas paralelas del circuito.
- **Componentes no óhmicos:** diodos, varistores, bombillas incandescentes y motores no mantienen una relación `V / I` constante, por lo que su resistencia medida en frío no predice su consumo en operación.
