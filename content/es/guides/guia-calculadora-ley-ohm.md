---
title: "La Ley de Ohm Explicada: La Base de la Electrónica"
description: "Domine la Ley de Ohm (V = I × R) y la ley de potencia eléctrica (P = V × I). Comprenda voltaje, corriente, resistencia, ejemplos de circuitos y la Calculadora de la Ley de Ohm."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "ohms-law-calculator"
relatedType: "calculator"
faqs:
  - question: "¿Qué componentes electrónicos obedecen la Ley de Ohm y cuáles son no óhmicos?"
    answer: "Los materiales óhmicos —como resistencias de película metálica, cables de cobre o aleaciones de nicromo a temperatura constante— mantienen una relación lineal y constante entre voltaje y corriente. En cambio, diodos, ledes, transistores, varistores y filamentos incandescentes son no óhmicos porque su resistencia efectiva varía con la tensión aplicada o la temperatura."
  - question: "¿Cómo afecta la temperatura a la resistencia eléctrica de un conductor?"
    answer: "En metales conductores como el cobre o el aluminio, la resistencia crece casi linealmente con la temperatura según R(T) = R₀ × [1 + α × (T − T₀)], donde α para el cobre ronda 0.00393 °C⁻¹. Por ello un motor o filamento frío presenta menor resistencia y mayor corriente inicial que cuando alcanza su temperatura de régimen."
  - question: "¿En qué se diferencia la Ley de Ohm en corriente continua (CC) respecto a la corriente alterna (CA)?"
    answer: "En corriente continua y cargas puramente resistivas se aplica directamente V = I × R. En corriente alterna con bobinas o condensadores aparece la reactancia (X) dependiente de la frecuencia, por lo que la resistencia se sustituye por la impedancia compleja Z (V = I × Z), introduciendo además un desfase angular entre voltaje y corriente."
  - question: "¿Por qué un cortocircuito provoca sobrecalentamiento extremo y disparo de protecciones?"
    answer: "Si un conductor une directamente el polo positivo y el negativo sin carga intermedia, la resistencia total cae a valores de miliohmios. Según I = V / R, la corriente se dispara a cientos o miles de amperios, y como el calor disipado sigue la ley de Joule (P = I² × R), la potencia térmica crece de forma cuadrática hasta fundir aislantes o activar el disyuntor."
  - question: "¿Cómo se calcula la resistencia limitadora adecuada para proteger un diodo LED?"
    answer: "Primero se resta la caída directa del LED (V_LED) al voltaje de la fuente para obtener la tensión que debe absorber la resistencia (V_R = V_fuente − V_LED). Luego se divide por la corriente nominal deseada mediante R = V_R / I_LED y se verifica la potencia disipada (P = V_R × I_LED) para elegir una resistencia con margen térmico."
---

La **Ley de Ohm**, formulada por Georg Simon Ohm en 1827, establece la relación lineal fundamental de los circuitos eléctricos: la intensidad de corriente que circula por un conductor óhmico es directamente proporcional al voltaje aplicado e inversamente proporcional a su resistencia (`I = V / R`).

Combinada con la ley de potencia eléctrica (`P = V × I`), esta ley permite dimensionar resistencias, diagnosticar fallos, estimar caídas de tensión y evitar sobrecargas térmicas. Con nuestra [Calculadora de la Ley de Ohm](/es/calculadoras/calculadora-ley-de-ohm) puede hallar al instante cualquier magnitud introduciendo dos valores conocidos. A continuación se detallan las ecuaciones, un diseño electrónico resuelto, una tabla de referencia y las restricciones físicas de validez.

## Ecuaciones de la Ley de Ohm y rueda de potencia

En circuitos lineales de corriente continua (o cargas resistivas puras en alterna), las cuatro magnitudes básicas quedan enlazadas mediante las siguientes expresiones:

```text
V = I × R
I = V / R
R = V / I
P = V × I = I² × R = V² / R
```

Las unidades oficiales del Sistema Internacional son:

- **`V` (Voltaje o tensión):** diferencia de potencial eléctrico medida en **voltios (`V`)**.
- **`I` (Corriente):** flujo de carga por segundo medido en **amperios (`A`)**, donde `1 A = 1 C/s`.
- **`R` (Resistencia):** oposición del material al movimiento de electrones, medida en **ohmios (`Ω`)**.
- **`P` (Potencia eléctrica):** energía disipada en calor o trabajo por segundo, medida en **vatios (`W`)**.

### La analogía hidráulica y sus límites

Para visualizar el circuito suele compararse con una tubería cerrada: el **voltaje (`V`)** equivale a la presión de bombeo; la **corriente (`I`)**, al caudal de agua; y la **resistencia (`R`)**, al estrechamiento que limita el flujo. A mayor presión o menor restricción, el caudal aumenta proporcionalmente. Sin embargo, a diferencia de una tubería rota, un interruptor eléctrico abierto mantiene voltaje entre bornes con corriente exactamente nula (`R → ∞`).

## Ejemplo práctico resuelto: resistencia limitadora para un LED

Suponga que desea alimentar un LED rojo estándar (caída directa `V_LED = 2.0 V`, corriente nominal `I_LED = 20 mA = 0.020 A`) desde una fuente regulada de `12 V` CC. Conectarlo sin limitación destruiría la unión semiconductora.

1. **Voltaje sobre la resistencia (`V_R`):** `V_R = V_fuente − V_LED = 12 V − 2.0 V = 10.0 V`.
2. **Resistencia teórica:** `R = V_R / I_LED = 10.0 V / 0.020 A = 500 Ω`.
3. **Valor comercial normalizado (serie E24):** se elige `510 Ω` (valor inmediato superior) para mantener la corriente bajo límite: `I_real = 10.0 V / 510 Ω = 0.0196 A` (`19.6 mA`).
4. **Potencia disipada (`P_R`):** `P_R = V_R × I_real = 10.0 V × 0.0196 A = 0.196 W` (equivalente a `0.0196² × 510 = 0.196 W`).

Aunque una resistencia de `0.25 W` (`1/4 W`) soporta `0.25 W`, operaría al `78.4 %` de su límite con elevado calentamiento. La práctica recomendada es duplicar el margen térmico usando una resistencia de **`510 Ω` y `0.5 W` (`1/2 W`)**.

## Combinaciones típicas de voltaje, corriente, resistencia y potencia

La tabla compara órdenes de magnitud desde señales digitales hasta cargas térmicas y fallos por cortocircuito:

| Circuito o aplicación | Voltaje | Resistencia | Corriente | Potencia | Nota de ingeniería |
| --- | --- | --- | --- | --- | --- |
| Entrada digital pull-up | 5 V | 10 kΩ | 0.5 mA | 2.5 mW | Consumo mínimo en lógica CMOS |
| Limitadora de LED | 10 V | 510 Ω | 19.6 mA | 0.196 W | Requiere encapsulado de 0.5 W |
| Bobina de relé 12 V | 12 V | 80 Ω | 0.15 A | 1.8 W | Corriente continua estable |
| Calefactor (230 V) | 230 V | 26.45 Ω | 8.70 A | 2,000 W | Carga resistiva lineal |
| Calefactor (120 V) | 120 V | 9.6 Ω | 12.5 A | 1,500 W | Límite continuo en circuito 15 A |
| Cortocircuito en batería | 12 V | 0.02 Ω | 600 A | 7,200 W | Riesgo severo de arco e incendio |

## Aplicaciones, errores frecuentes y límites de validez

La Ley de Ohm fundamenta el diseño de divisores de tensión, resistencias `shunt` para medir corriente, verificación de caídas en cables y selección de fusibles.

Conviene evitar cuatro errores recurrentes al calcular circuitos:

1. **Inconsistencia de prefijos métricos:** mezclar `mA` con `kΩ` sin convertir a amperios y ohmios introduce errores de `1,000` o `1,000,000` veces.
2. **Tratar semiconductores como resistencias lineales:** diodos y transistores no siguen una recta proporcional desde `0 V`; requieren considerar su caída de unión antes de aplicar la ley.
3. **Ignorar la potencia térmica (`I²R`):** acertar el valor en ohmios no evita quemar el componente si su potencia nominal en vatios es insuficiente.
4. **Olvidar resistencias equivalentes:** en serie las resistencias se suman (`R_eq = R₁ + R₂`), mientras en paralelo la resistencia total disminuye (`1/R_eq = 1/R₁ + 1/R₂`).

En seguridad eléctrica, la norma IEC 60479-1 establece que la impedancia del cuerpo humano oscila entre `500 Ω` y `2,500 Ω` según humedad y trayectoria; corrientes alternas superiores a `30 mA` a través del tórax pueden provocar fibrilación ventricular, exigiendo protección diferencial y aislamiento certificado.
