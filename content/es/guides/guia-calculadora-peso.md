---
title: "Masa vs. Peso: ¿Cuál es la Diferencia?"
description: "Comprenda la distinción física entre masa (kilogramos) y peso (newtons), aprenda la segunda ley de Newton aplicada a la gravedad y calcule su peso en otros planetas."
category: "Math & Science"
relatedCalculator: "weight-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "¿Por qué las básculas domésticas muestran el resultado en kilogramos si el peso se mide en newtons?"
    answer: "Las básculas digitales y de resorte miden en realidad la fuerza normal ejercida sobre el sensor (en newtons), pero su electrónica divide internamente esa fuerza entre la gravedad estándar terrestre (9,80665 m/s²) para mostrar una lectura equivalente en kilogramos, útil para uso cotidiano y comercial."
  - question: "¿Mi masa cambia cuando viajo a la Luna o a la Estación Espacial Internacional?"
    answer: "No. La masa representa la cantidad de materia e inercia de su cuerpo, por lo que permanece invariable en cualquier lugar del universo. Si su masa es de 75 kg en la Tierra, seguirá siendo de 75 kg en la Luna o en órbita, aunque su peso medido por una báscula sea menor o prácticamente nulo."
  - question: "¿Por qué flotan los astronautas en órbita si la gravedad terrestre aún existe a esa altitud?"
    answer: "A 400 km de altura, la aceleración gravitatoria terrestre sigue siendo de unos 8,69 m/s² (casi un 89 % de la gravedad superficial). Los astronautas no flotan por ausencia de gravedad, sino porque tanto ellos como la estación espacial se encuentran en estado de caída libre orbital continua, reduciendo el peso aparente contra el suelo a cero."
  - question: "¿Qué diferencia hay entre una báscula de resorte y una balanza de dos platillos en otro planeta?"
    answer: "Una báscula de resorte o celda de carga mide fuerza (W = m × g) y en la Luna marcaría aproximadamente una sexta parte. Una balanza de dos platillos compara la fuerza de gravedad sobre el objeto frente a pesas patrón conocidas; como g afecta por igual a ambos lados, arrojará exactamente la misma masa en la Tierra y en la Luna."
  - question: "¿Es exactamente igual la aceleración de la gravedad en todo el planeta Tierra?"
    answer: "No. Aunque se adopta 9,80665 m/s² como valor estándar, la rotación terrestre y el achatamiento ecuatorial hacen que la gravedad superficial sea algo menor en el ecuador (≈ 9,78 m/s²) y ligeramente mayor en los polos (≈ 9,83 m/s²), disminuyendo también al aumentar la altitud sobre el nivel del mar."
---

En el lenguaje cotidiano, «masa» y «peso» suelen emplearse como sinónimos al hablar de kilogramos. Sin embargo, en física e ingeniería representan magnitudes distintas: la **masa** (`m`) es una propiedad escalar intrínseca que mide la cantidad de materia e inercia de un objeto en **kilogramos (kg)**; el **peso** (`W`) es una fuerza vectorial ejercida por la gravedad sobre esa masa y se mide en **newtons (N)**.

Mientras la masa permanece idéntica en cualquier punto del universo, el peso cambia proporcionalmente con la aceleración gravitatoria local. Para calcular la fuerza gravitatoria exacta de un cuerpo en la Tierra o en otros astros, utilice nuestra [Calculadora de Peso](/es/calculadoras/calculadora-de-peso).

## Definición física, segunda ley de Newton y unidades del Sistema Internacional

La relación entre masa y peso proviene de la **segunda ley de Newton** (`F = m × a`), sustituyendo la aceleración general por la aceleración gravitatoria local (`g`) debida a la masa (`M`) y al radio (`r`) del planeta:

```text
W = m × g
m = W / g
g = (G × M) / r²
```

Definición de magnitudes:

- **W (N):** Peso o fuerza gravitatoria en newtons (`1 N = 1 kg·m/s²`), equivalente aproximado al peso terrestre de una masa de `102 gramos`.
- **m (kg):** Masa inercial y gravitatoria en kilogramos, invariable frente a cambios de ubicación.
- **g (m/s²):** Gravedad local. La Conferencia General de Pesas y Medidas establece como gravedad estándar terrestre `9,80665 m/s²` (`≈ 9,81 m/s²`).
- **G (N·m²/kg²):** Constante de gravitación universal (`6,674 × 10⁻¹¹ N·m²/kg²`).

Conviene distinguir el **newton** del **kilogramo-fuerza** (`1 kgf = 9,80665 N`), una unidad técnica tradicional que aún aparece en manómetros antiguos y especificaciones de prensas. Cuando una báscula doméstica indica `75 kg`, en realidad mide una fuerza de compresión cercana a `735,5 N` y la divide internamente por `9,80665` para mostrar masa aparente. Por el contrario, una **balanza de dos platillos** compara momentos gravitatorios contra pesas patrón calibradas: como la gravedad actúa por igual en ambos extremos, arrojaría exactamente `75 kg` tanto en la Tierra como en la Luna.

## Ejemplo numérico paso a paso: módulo científico en tres astros

Suponga un instrumento de exploración con masa verificada `m = 85 kg`. Evaluamos su peso estático en la Tierra, la Luna y Marte, además de su resistencia al movimiento lateral.

1. **Peso en la superficie terrestre (`g = 9,81 m/s²`):**
   `W_Tierra = 85 kg × 9,81 m/s² = 833,85 N`.
2. **Peso en la Luna (`g = 1,62 m/s²`):**
   `W_Luna = 85 kg × 1,62 m/s² = 137,70 N`.
   Al comparar `137,70 / 833,85 = 0,1651`, el equipo ejerce en la Luna apenas el `16,51 %` de su peso terrestre (cerca de un sexto).
3. **Peso en Marte (`g = 3,72 m/s²`):**
   `W_Marte = 85 kg × 3,72 m/s² = 316,20 N` (`37,92 %` del peso en la Tierra).
4. **Invariancia de la masa inercial:**
   Si un motor empuja horizontalmente el instrumento sobre una guía sin fricción para acelerarlo a `2,0 m/s²`, necesita aplicar `F = 85 kg × 2,0 m/s² = 170 N` en los tres astros, porque los `85 kg` de inercia no cambian con la gravedad vertical.

## Comparativa de peso para una masa de 75 kg en el sistema solar

La tabla recoge el peso real en newtons y la lectura aparente en una báscula terrestre (calibrada a `9,81 m/s²`) para una masa constante de `75 kg`:

| Cuerpo celeste | Gravedad (m/s²) | Fracción terrestre | Peso real (N) | Lectura aparente |
| :--- | :--- | :--- | :--- | :--- |
| Luna | `1,62 m/s²` | `0,165 g` | `121,50 N` | `12,4 kg` |
| Mercurio | `3,70 m/s²` | `0,377 g` | `277,50 N` | `28,3 kg` |
| Marte | `3,72 m/s²` | `0,379 g` | `279,00 N` | `28,4 kg` |
| Venus | `8,87 m/s²` | `0,904 g` | `665,25 N` | `67,8 kg` |
| Tierra (referencia) | `9,81 m/s²` | `1,000 g` | `735,75 N` | `75,0 kg` |
| Júpiter (1 bar) | `24,79 m/s²` | `2,527 g` | `1.859,25 N` | `189,5 kg` |
| Sol (fotosfera) | `274,00 m/s²` | `27,931 g` | `20.550,00 N` | `2.094,8 kg` |

## Aplicaciones en ingeniería, errores comunes y matices de medición

En cálculo estructural, grúas y aeronáutica, las solicitaciones se expresan en **kilonewtons (`kN`)** para sumar directamente pesos estáticos (`m × g`), cargas aerodinámicas e inercias de izado. Cuando un ascensor acelera hacia arriba a `1,5 m/s²`, sus cables soportan el **peso aparente** `m × (g + a)`, elevando la tensión más de un `15 %` respecto al reposo.

Conviene evitar tres errores frecuentes en física aplicada y metrología:

- **Confundir ingravidez orbital con masa cero:** En la Estación Espacial Internacional, los astronautas flotan en caída libre continua (peso aparente nulo), pero conservan toda su inercia; para controlar su masa corporal utilizan dispositivos oscilatorios de resorte calibrados por vibración.
- **Mezclar libras-masa (`lbm`) y libras-fuerza (`lbf`):** En el sistema anglosajón, ambas comparten el nombre «libra», exigiendo factores de conversión gravitatoria explícitos en ingeniería térmica y mecánica.
- **Omitir la calibración gravitatoria local:** La rotación terrestre y el achatamiento ecuatorial hacen que `g` varíe entre `9,78 m/s²` en el ecuador y `9,83 m/s²` en los polos, además de disminuir con la altitud. Una báscula de celda de carga de alta precisión trasladada desde el nivel del mar hasta una planta industrial a `2.600 m` de altitud debe recalibrarse con pesas patrón certificadas para compensar esa diferencia.
