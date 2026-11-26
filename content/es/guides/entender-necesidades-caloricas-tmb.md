---
title: "Comprender las Necesidades Calóricas: Uso de la Calculadora de TMB"
description: "Guía técnica sobre la Tasa Metabólica Basal (TMB): ecuaciones de Mifflin-St Jeor, Harris-Benedict y Katch-McArdle, factores de actividad y cálculo del Gasto Energético Diario Total."
category: "Health"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "bmr-calculator"
faqs:
  - question: "¿Qué diferencia existe entre la TMB y el Gasto Energético Diario Total (GEDT o TDEE)?"
    answer: "La Tasa Metabólica Basal (TMB) mide únicamente la energía mínima necesaria para sostener las funciones vitales en reposo absoluto, ayuno y temperatura neutra. El Gasto Energético Diario Total (GEDT o TDEE) suma a la TMB el efecto térmico de los alimentos y toda la actividad física cotidiana y deportiva."
  - question: "¿Por qué la ecuación de Mifflin-St Jeor se considera más precisa que la de Harris-Benedict?"
    answer: "Publicada en 1990 sobre muestras contemporáneas con mayor diversidad de composición corporal, la fórmula de Mifflin-St Jeor presenta un margen de error medio cercano al ±10 % frente a la calorimetría indirecta, mientras que Harris-Benedict (incluso en su revisión de 1984) tiende a sobreestimar el gasto basal en torno a un 5 % en personas con sobrepeso."
  - question: "¿Es recomendable seguir una dieta con menos calorías que la TMB?"
    answer: "De forma sostenida, no. Consumir habitualmente por debajo de la TMB dificulta cubrir las necesidades de proteínas y micronutrientes, acelera la pérdida de masa muscular magra y desencadena mecanismos de adaptación metabólica que reducen el movimiento espontáneo diario y el gasto tiroideo."
  - question: "¿Por qué disminuye la TMB con el paso de los años?"
    answer: "A partir de los 30 años la TMB desciende aproximadamente entre un 1 % y un 2 % por década, aunque estudios recientes de metabolismo sugieren que gran parte de esa caída entre los 30 y los 60 años se debe a la pérdida gradual de masa muscular (sarcopenia) y al descenso de la actividad física, más que a una caída intrínseca del metabolismo celular."
  - question: "¿Cada cuánto tiempo conviene recalcular la TMB y el GEDT?"
    answer: "Se recomienda actualizar el cálculo cada vez que el peso corporal varíe entre 5 kg y 7 kg, o cuando cambie de forma estable el volumen semanal de entrenamiento o el nivel de actividad laboral, ya que tanto la masa total como el gasto por movimiento modifican el punto de mantenimiento calórico."
---

La **Tasa Metabólica Basal (TMB)** cuantifica la energía mínima que el organismo consume diariamente para sostener sus funciones vitales en reposo absoluto, ayuno de 12 horas y ambiente térmicamente neutro: respiración, circulación, síntesis celular y regulación térmica. En la mayoría de los adultos representa entre el **60 % y el 75 %** del gasto energético diario.

Determinar la TMB constituye el primer paso para calcular el **Gasto Energético Diario Total (GEDT o TDEE)**, es decir, las kilocalorías (`kcal`) reales que requiere su cuerpo según su estilo de vida. A partir de ese valor de mantenimiento se diseñan déficits controlados para perder grasa o superávits moderados para desarrollar masa muscular.

## Ecuaciones predictivas de la TMB y componentes del gasto

A falta de calorimetría indirecta en laboratorio, las ecuaciones antropométricas estiman la TMB mediante peso (`P` en `kg`), altura (`A` en `cm`), edad (`E` en años) y sexo biológico:

```text
Mifflin-St Jeor (1990 — Estándar clínico recomendado):
Hombres: TMB = (10 × P) + (6.25 × A) − (5 × E) + 5
Mujeres: TMB = (10 × P) + (6.25 × A) − (5 × E) − 161

Harris-Benedict revisada (Roza y Shizgal, 1984):
Hombres: TMB = (13.397 × P) + (4.799 × A) − (5.677 × E) + 88.362
Mujeres: TMB = (9.247 × P) + (3.098 × A) − (4.330 × E) + 447.593

Katch-McArdle (cuando se conoce el % de grasa corporal):
Masa Magra (kg) = P × [1 − (% Grasa / 100)]
TMB = 370 + (21.6 × Masa Magra)
```

Mifflin-St Jeor es la referencia habitual en nutrición clínica, mientras que Katch-McArdle ofrece mejor ajuste en deportistas con elevada masa muscular cuando se dispone de un porcentaje de grasa fiable. El gasto total (`GEDT = TMB × Factor de Actividad`) integra cuatro fracciones:

- **TMB (60 %–75 %):** metabolismo basal en reposo.
- **Efecto Térmico de los Alimentos (ETA, ~10 %):** energía empleada en digerir y asimilar nutrientes.
- **Actividad no asociada al ejercicio (NEAT, 10 %–20 %):** gasto por caminar, gesticular, mantenerse de pie y tareas cotidianas.
- **Ejercicio programado (EAT, 5 %–15 %):** sesiones deportivas planificadas.

## Cálculo paso a paso: de la TMB al ajuste calórico por objetivo

Considere una mujer de `30` años, `65 kg` de peso y `168 cm` de estatura con entrenamiento moderado cuatro días por semana.

1. **Calcular la TMB con Mifflin-St Jeor:**
   - Peso: `10 × 65 = 650 kcal`
   - Estatura: `6.25 × 168 = 1,050 kcal`
   - Edad: `5 × 30 = 150 kcal`
   - Total: `650 + 1,050 − 150 − 161 = 1,389 kcal/día`
2. **Aplicar el factor de actividad (PAL):** para un perfil moderadamente activo (`1.55`), el mantenimiento equivale a `1,389 × 1.55 = 2,152.95 kcal/día` (`≈ 2,153 kcal/día`).
3. **Ajustar según objetivo:**
   - **Pérdida de grasa sostenible (~0.45–0.5 kg/semana):** un déficit de `−500 kcal/día` (`3,500 kcal/semana`) fija la meta en `2,153 − 500 = 1,653 kcal/día`, cifra segura al mantenerse por encima de la TMB (`1,389 kcal`) y facilitar una ingesta proteica adecuada (`1.6–2.0 g/kg`) para preservar el tejido muscular.
   - **Ganancia muscular controlada:** un superávit moderado de `+250` a `+350 kcal/día` sitúa la pauta entre `2,403` y `2,503 kcal/día`, favoreciendo la síntesis proteica con mínima acumulación de tejido adiposo.
   - **Comparación con Katch-McArdle:** si esta misma mujer conociera su porcentaje de grasa corporal (por ejemplo, un `24 %`, equivalente a `49.4 kg` de masa magra), obtendría una TMB de `370 + (21.6 × 49.4) = 1,437 kcal/día`, confirmando la coherencia entre ambos modelos.

## Factores de actividad física y escenarios de gasto diario

Seleccionar un multiplicador realista es determinante para evitar errores de estimación. La siguiente tabla ilustra los cinco niveles aplicados al ejemplo (`TMB = 1,389 kcal/día`):

| Nivel de actividad | Multiplicador | Perfil cotidiano y ejercicio | GEDT (`TMB = 1,389`) | Déficit moderado (`−20 %`) |
|---|---|---|---|---|
| Sedentario | `1.20` | Trabajo de oficina, `< 4,000` pasos/día, sin ejercicio | `1,667 kcal/día` | `1,334 kcal/día` |
| Ligeramente activo | `1.375` | Caminatas o deporte ligero 1–3 días/semana | `1,910 kcal/día` | `1,528 kcal/día` |
| Moderadamente activo | `1.55` | `7,000–10,000` pasos/día o deporte 3–5 días/semana | `2,153 kcal/día` | `1,722 kcal/día` |
| Muy activo | `1.725` | Actividad laboral física o entreno intenso 6–7 días | `2,396 kcal/día` | `1,917 kcal/día` |
| Extremadamente activo | `1.90` | Empleo físico exigente y doble sesión diaria | `2,639 kcal/día` | `2,111 kcal/día` |

## Errores frecuentes, adaptación metabólica y precisión clínica

Conviene distinguir en la práctica la **TMB** (medida tras despertar en laboratorio, en ayuno estricto y sin haber realizado movimiento alguno) de la **Tasa Metabólica en Reposo (TMR o RMR)**, que resulta entre un `5 %` y un `10 %` superior por permitir un reposo previo más breve y menor aislamiento térmico. Al trasladar estos valores a un plan nutricional diario, evite los siguientes errores:

- **Sobreestimar la actividad física:** entrenar 45 minutos cuatro veces por semana con un empleo de oficina corresponde a *ligeramente* o *moderadamente activo* (`1.375–1.55`), no a *muy activo*.
- **Suponer linealidad en la pérdida de peso:** aunque `1 kg` de tejido adiposo equivale aproximadamente a `7,700 kcal`, el gasto diario disminuye a medida que baja la masa corporal y aparece **termogénesis adaptativa**.
- **Comer de forma crónica por debajo de la TMB:** los recortes severos reducen involuntariamente el NEAT, elevan la fatiga y aumentan la pérdida de masa muscular.
- **Variabilidad fisiológica y clínica:** las fórmulas presentan un margen de error cercano al `±10 %`. Condiciones como hipotiroidismo, síndrome de ovario poliquístico, embarazo o lactancia modifican el gasto energético y requieren valoración clínica individualizada.
