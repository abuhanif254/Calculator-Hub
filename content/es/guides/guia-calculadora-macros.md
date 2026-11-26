---
title: "Guía de la Calculadora de Macros: Proteínas, Carbohidratos y Grasas Explicados"
description: "Una guía completa para calcular y equilibrar macronutrientes para su objetivo de acondicionamiento físico utilizando nuestra calculadora de macros."
category: "Health"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "macro-calculator"
faqs:
  - question: "¿Es mejor calcular los macronutrientes en gramos por kilogramo de peso o por porcentajes fijos?"
    answer: "En nutrición deportiva y clínica es preferible fijar primero las proteínas y las grasas en gramos por kilogramo de peso corporal (especialmente de peso saludable o masa magra) y asignar los carbohidratos con las calorías restantes. Los porcentajes fijos pueden resultar excesivos o insuficientes en personas con ingestas calóricas muy bajas o muy altas."
  - question: "¿Cuánta proteína diaria se necesita realmente para perder grasa sin perder músculo?"
    answer: "Las guías de sociedades como la ISSN recomiendan entre 1.6 y 2.2 gramos de proteína por kilogramo de peso corporal al día cuando se realiza entrenamiento de fuerza en déficit calórico. Este aporte elevado estimula la síntesis proteica muscular, atenúa el catabolismo tisular y proporciona un mayor efecto saciante frente a los carbohidratos y las grasas."
  - question: "¿Qué margen de tolerancia diaria es aceptable al seguir un plan de macros?"
    answer: "No es necesario alcanzar la exactitud absoluta en cada comida. Mantener una desviación diaria de ±5 gramos en proteínas y grasas y de ±10 gramos en carbohidratos —lo que equivale a unas ±80 a 100 kcal respecto al objetivo— resulta plenamente suficiente para obtener los resultados previstos si se sostiene la constancia semanal."
  - question: "¿Debo pesar los alimentos en crudo o después de cocinarlos?"
    answer: "Siempre resulta más preciso pesar los alimentos en crudo y antes de cocinarlos, ya que la cocción altera el contenido de agua sin modificar las calorías reales. Por ejemplo, 100 gramos de arroz crudo absorben agua hasta pesar entre 250 y 300 gramos cocidos, mientras que 100 gramos de carne magra pueden reducirse a unos 75 gramos tras perder humedad."
  - question: "¿La dieta flexible basada en macros sustituye la calidad nutricional de los alimentos?"
    answer: "No. Aunque el balance energético y la distribución de macronutrientes gobiernan la composición corporal, la salud metabólica y digestiva depende también de los micronutrientes, la fibra dietética (25 a 38 g diarios) y la calidad lipídica. Conviene cubrir al menos el 80 % de los requerimientos con alimentos mínimamente procesados."
---

Los **macronutrientes** —proteínas, carbohidratos y grasas— constituyen los tres sustratos energéticos de la dieta. De acuerdo con los factores de Atwater, cada gramo de **proteína** o **carbohidrato** aporta **4 kcal**, mientras que cada gramo de **grasa** aporta **9 kcal**, más del doble de densidad calórica.

Calcular los «macros» consiste en traducir su **Gasto Energético Diario Total (GET o TDEE)** y su meta fisiológica en objetivos diarios expresados en gramos. Mientras el balance energético determina la variación global de peso, la proporción entre macronutrientes decide cuánto tejido magro se preserva, cuánta energía queda disponible para el entrenamiento y qué nivel de saciedad sostiene el plan.

## Metodología de cálculo: del metabolismo basal a los gramos diarios

El cálculo estructurado de macronutrientes comprende cuatro etapas secuenciales:

1. **Tasa Metabólica Basal (TMB):** La ecuación **Mifflin-St Jeor** estima el gasto en reposo usando peso (`P` en kg), estatura (`A` en cm) y edad (`E` en años):

```text
TMB (hombres) = (10 × P) + (6.25 × A) − (5 × E) + 5
TMB (mujeres) = (10 × P) + (6.25 × A) − (5 × E) − 161
```

2. **Gasto Energético Diario Total (GET):** Se multiplica la TMB por el factor de actividad (`FA`): 1.2 (sedentario), 1.375 (ligero), 1.55 (moderado, ejercicio 3–5 días/semana), 1.725 (intenso) o 1.9 (muy intenso).

```text
GET = TMB × FA
```

3. **Ajuste calórico por objetivo:** Para pérdida de grasa se aplica un déficit del 15 % al 20 % (−300 a −500 kcal/día); para mantenimiento se iguala el GET; para hipertrofia se suma un superávit limpio de +200 a +350 kcal/día.
4. **Conversión a gramos por macronutriente:** Con las calorías objetivo (`Cal_obj`), se calculan los gramos mediante porcentajes o por anclaje fisiológico por kilogramo:

```text
Proteína (g)      = (Cal_obj × %Proteína) / 4   [ó 1.6–2.2 g/kg]
Grasa (g)         = (Cal_obj × %Grasa) / 9      [mínimo 0.6–0.8 g/kg]
Carbohidratos (g) = (Cal_obj − [Proteína_g × 4 + Grasa_g × 9]) / 4
```

## Ejemplo práctico paso a paso con verificación aritmética

Considere un **hombre de 32 años**, **78 kg** y **178 cm**, con entrenamiento moderado cuatro días por semana (`FA = 1.55`), cuyo objetivo es **perder grasa conservando masa muscular**:

1. **TMB (Mifflin-St Jeor):**
   ``TMB = (10 × 78) + (6.25 × 178) − (5 × 32) + 5 = 780 + 1112.5 − 160 + 5 = 1737.5 kcal/día``
2. **Gasto Energético Diario Total (GET):**
   ``GET = 1737.5 × 1.55 = 2693.1 kcal ≈ 2693 kcal/día``
3. **Objetivo calórico (−493 kcal, déficit del 18.3 %):**
   ``Cal_obj = 2693 − 493 = 2200 kcal/día``
4. **Proteínas fijadas a 2.0 g/kg:**
   ``78 × 2.0 = 156 g/día`` -> ``156 × 4 = 624 kcal`` (28.4 %).
5. **Grasas al 28 % del objetivo (~0.87 g/kg):**
   ``2200 × 0.28 = 616 kcal`` -> ``616 / 9 = 68.4 g ≈ 68 g/día`` (``68 × 9 = 612 kcal``).
6. **Carbohidratos con el remanente calórico:**
   ``2200 − (624 + 612) = 964 kcal`` -> ``964 / 4 = 241 g/día``.

**Verificación:** ``(156 × 4) + (241 × 4) + (68 × 9) = 624 + 964 + 612 = 2200 kcal``.

## Perfiles de distribución de macronutrientes según objetivo

Aunque conviene anclar proteínas y grasas al peso corporal, los porcentajes muestran cómo se reorganiza el presupuesto energético en cada escenario:

| Objetivo | Proteína (% / g por kg) | Carbohidratos (%) | Grasas (%) | Fuentes prioritarias |
|---|---|---|---|---|
| Pérdida de grasa | 30–35 % (1.8–2.2 g/kg) | 35–40 % | 25–30 % | Ave, huevos, pescado blanco, legumbres, verduras |
| Mantenimiento | 20–25 % (1.2–1.6 g/kg) | 45–50 % | 25–30 % | Avena, arroz integral, yogur griego, aceite de oliva |
| Ganancia muscular | 25–30 % (1.6–2.2 g/kg) | 45–55 % | 20–25 % | Carnes magras, patata, quinua, pasta, frutos secos |
| Resistencia aeróbica | 15–20 % (1.4–1.8 g/kg) | 55–65 % | 20–25 % | Cereales integrales, fruta, tubérculos, pescado azul |
| Dieta cetogénica | 20–25 % (1.2–1.7 g/kg) | 5 % (<50 g/día) | 70–75 % | Salmón, aguacate, aceite de oliva, quesos, semillas |
| Recomposición corporal | 30–35 % (2.0–2.4 g/kg) | 40–45 % | 25 % | Claras de huevo, lácteos fermentados, legumbres |

## Aplicaciones prácticas, errores comunes y matices clínicos

El conteo de macronutrientes resulta especialmente valioso en la periodización nutricional de atletas, la pérdida de grasa con retención muscular y el manejo glucémico en personas activas. Para maximizar su eficacia sin generar rigidez alimentaria, conviene centrar al menos el 80 % de las calorías en alimentos mínimamente procesados ricos en micronutrientes y fibra (entre 25 y 38 g diarios) y pesar los ingredientes en crudo antes de cocinarlos, ya que la hidratación o pérdida de humedad altera el peso final sin modificar las calorías reales.

Cuatro fallos técnicos suelen comprometer la precisión en la práctica cotidiana:

- **Sobrestimar la actividad física:** Un trabajo de oficina con cuatro sesiones semanales de gimnasio suele corresponder a un factor de 1.45 a 1.55, no a 1.725.
- **Omitir aceites y salsas:** Una cucharada sopera de aceite vegetal suma ~13.5 g de grasa (~120 kcal), suficiente para neutralizar un déficit moderado.
- **Recortar demasiado las grasas:** Bajar de 0.5 a 0.6 g/kg de forma sostenida perjudica la absorción de vitaminas liposolubles y la síntesis hormonal.
- **Calcular proteína sobre peso total en obesidad:** En esos casos debe referenciarse a la masa magra o al peso corporal ideal.

Ante enfermedad renal crónica, hepatopatías, diabetes tipo 1 o trastornos de la conducta alimentaria, todo ajuste nutricional requiere supervisión médica o dietética profesional.
