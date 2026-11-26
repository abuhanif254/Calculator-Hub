---
title: "Rangos de Peso Ideal por Altura y Tamaño de Estructura"
description: "Explore las principales fórmulas de peso corporal ideal (Hamwi, Devine, Robinson, Miller), cómo influye la estructura ósea y cómo utilizar nuestra calculadora."
category: "Health"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "ideal-weight-calculator"
faqs:
  - question: "¿Cuál de las cuatro fórmulas de peso corporal ideal es la más utilizada en medicina?"
    answer: "La fórmula de Devine (1974) es el estándar clínico más extendido en farmacocinética hospitalaria, nefrología y medicina intensiva —por ejemplo, para programar el volumen corriente en ventilación mecánica o dosificar fármacos hidrofílicos—. No obstante, para orientar objetivos de salud general, promediar Hamwi, Devine, Robinson y Miller ofrece una referencia más equilibrada."
  - question: "¿Por qué las fórmulas de peso ideal dejan de ser fiables por debajo de los 152 cm de estatura?"
    answer: "Las cuatro ecuaciones clásicas parten de un peso base anclado a 60 pulgadas (152.4 cm o 5 pies) y suman o restan un incremento por cada pulgada de desviación. Cuando la estatura es inferior a 152.4 cm, el término H adopta valores negativos y la pendiente lineal —especialmente en la ecuación de Devine para mujeres— arroja pesos artificialmente bajos."
  - question: "¿Cómo influye el tamaño de la estructura ósea en el rango de peso ideal?"
    answer: "Una persona con esqueleto ancho posee mayor densidad y masa mineral ósea para la misma estatura que alguien de complexión estrecha. En antropometría clínica se aplica una corrección estándar de −10 % sobre el peso ideal para estructura pequeña, 0 % para estructura mediana y +10 % para estructura ósea grande."
  - question: "¿Qué diferencia práctica existe entre el Peso Corporal Ideal (PCI) y el Peso Corporal Ajustado (PCA)?"
    answer: "El Peso Corporal Ideal estima la masa magra teórica según la estatura y el sexo, mientras que el Peso Corporal Ajustado se utiliza en pacientes con sobrepeso u obesidad cuyo peso real supera en más de un 20 % al PCI. Se calcula como PCA = PCI + 0.4 × (Peso real − PCI) y permite ajustar dosis clínicas sin sobredosificar."
  - question: "¿Son válidas las tablas de peso ideal para deportistas con elevada masa muscular?"
    answer: "No. Las ecuaciones de Hamwi, Devine, Robinson y Miller no distinguen entre tejido muscular y tejido adiposo, por lo que pueden clasificar erróneamente como por encima de su peso ideal a atletas de fuerza o deportes de combate. En deportistas resultan más informativos el porcentaje de grasa corporal, la circunferencia de cintura y el índice cintura-estatura."
---

El **Peso Corporal Ideal (PCI)** —denominado *IBW* en la literatura clínica— estima el peso asociado a menor morbilidad y mejor dosificación terapéutica según estatura y sexo biológico. A diferencia del Índice de Masa Corporal (IMC), que define un intervalo amplio de normopeso (18.5 a 24.9 kg/m²), las ecuaciones de PCI fijan referencias puntuales derivadas de tablas actuariales y estudios farmacocinéticos.

Para ofrecer una referencia equilibrada, nuestra calculadora promedia las cuatro ecuaciones históricas principales (**Hamwi**, **Devine**, **Robinson** y **Miller**), aplica un ajuste de **±10 % según el tamaño de la estructura ósea** y contrasta el resultado con el intervalo saludable del IMC.

## Las cuatro ecuaciones clínicas de Peso Corporal Ideal

Las cuatro fórmulas parten de un peso basal fijado en **152.4 cm (60 pulgadas)** y suman una constante por cada pulgada adicional (`H`):

```text
H = (Estatura_cm − 152.4) / 2.54
```

Sus coeficientes específicos por autor y sexo (en kilogramos) son:

- **Hamwi (1964):** Pensada inicialmente para estimación dietética rápida.
  ``PCI Hombres = 48.0 + (2.7 × H)`` | ``PCI Mujeres = 45.5 + (2.2 × H)``
- **Devine (1974):** Estándar hospitalario para ajuste de fármacos hidrofílicos y ventilación mecánica.
  ``PCI Hombres = 50.0 + (2.3 × H)`` | ``PCI Mujeres = 45.5 + (2.3 × H)``
- **Robinson (1983):** Recalibrada sobre tablas actuariales de *Metropolitan Life* de 1959.
  ``PCI Hombres = 52.0 + (1.9 × H)`` | ``PCI Mujeres = 49.0 + (1.7 × H)``
- **Miller (1983):** Actualizada con datos actuariales de 1983, arrojando valores algo mayores en tallas bajas e intermedias.
  ``PCI Hombres = 56.2 + (1.41 × H)`` | ``PCI Mujeres = 53.1 + (1.36 × H)``

### Ajuste por estructura ósea y contraste con el IMC

La envergadura esquelética modifica el PCI teórico en aproximadamente **±10 %**: ``PCI × 0.90`` (estructura pequeña), ``PCI × 1.00`` (mediana) y ``PCI × 1.10`` (grande). Como referencia rápida, rodee su muñeca en el punto más estrecho con pulgar e índice contrarios: si se superponen indica complexión pequeña; si apenas se tocan, mediana; y si queda espacio, grande (en antropometría clínica se mide además el diámetro bicondíleo del codo). Paralelamente, el rango normoponderal del IMC se obtiene con:

```text
Rango Saludable (IMC) = [18.5 a 24.9] × (Estatura_m)^2
```

## Ejemplo práctico paso a paso con verificación aritmética

Calculemos el consenso de PCI y el rango de IMC para una **mujer de 165 cm (1.65 m)** con **estructura ósea grande (+10 %)**:

1. **Pulgadas sobre 152.4 cm:** ``H = (165 − 152.4) / 2.54 = 12.6 / 2.54 = 4.96 pulgadas``.
2. **Evaluación por fórmula (mujeres):**
   - **Hamwi:** ``45.5 + (2.2 × 4.96) = 56.4 kg``
   - **Devine:** ``45.5 + (2.3 × 4.96) = 56.9 kg``
   - **Robinson:** ``49.0 + (1.7 × 4.96) = 57.4 kg``
   - **Miller:** ``53.1 + (1.36 × 4.96) = 59.8 kg``
3. **Promedio de consenso (estructura mediana):** ``(56.4 + 56.9 + 57.4 + 59.8) / 4 = 230.5 / 4 = 57.6 kg``.
4. **Ajuste por estructura grande (+10 %):** ``57.6 × 1.10 = 63.4 kg`` (frente a ``57.6 × 0.90 = 51.8 kg`` en estructura pequeña).
5. **Contraste con el rango IMC (18.5–24.9):** Con ``1.65^2 = 2.7225 m²``, el rango abarca de ``18.5 × 2.7225 = 50.4 kg`` a ``24.9 × 2.7225 = 67.8 kg``. Ambas referencias quedan dentro del normopeso.

## Comparativa de fórmulas de peso ideal y referencias por estatura

La tabla resume el promedio de las cuatro ecuaciones (estructura mediana), la horquilla ajustada por complexión (±10 %) y el rango normoponderal del IMC:

| Estatura | PCI Mujeres (mediana) | Rango óseo Mujeres (±10 %) | PCI Hombres (mediana) | Rango óseo Hombres (±10 %) | Rango IMC 18.5–24.9 |
|---|---|---|---|---|---|
| 155 cm | 50.2 kg | 45.2–55.2 kg | 53.7 kg | 48.3–59.1 kg | 44.4–59.8 kg |
| 160 cm | 54.0 kg | 48.6–59.4 kg | 57.8 kg | 52.0–63.6 kg | 47.4–63.7 kg |
| 165 cm | 57.6 kg | 51.8–63.4 kg | 61.9 kg | 55.7–68.1 kg | 50.4–67.8 kg |
| 170 cm | 61.4 kg | 55.3–67.5 kg | 66.0 kg | 59.4–72.6 kg | 53.5–72.0 kg |
| 175 cm | 65.1 kg | 58.6–71.6 kg | 70.1 kg | 63.1–77.1 kg | 56.7–76.3 kg |
| 180 cm | 68.8 kg | 61.9–75.7 kg | 74.1 kg | 66.7–81.5 kg | 59.9–80.7 kg |

## Aplicaciones clínicas, errores frecuentes y limitaciones fisiológicas

En medicina hospitalaria y nutrición clínica, el PCI según Devine guía el cálculo del volumen tidal protector en ventilación mecánica (6 a 8 mL/kg de PCI para evitar barotrauma pulmonar), la estimación del aclaramiento renal de creatinina y la dosificación de fármacos hidrofílicos de margen terapéutico estrecho. En la práctica ambulatoria, proporciona una meta ponderada más realista que el peso mínimo estético.

Conviene evitar cuatro errores frecuentes al interpretar estas ecuaciones:

- **Equiparar peso ideal con composición corporal saludable:** Un peso dentro del PCI puede ocultar baja masa muscular y exceso de grasa visceral («obesidad normoponderal»).
- **Aplicar ecuaciones adultas en menores o estaturas inferiores a 152.4 cm:** En niños y tallas muy bajas generan cifras distorsionadas; deben usarse curvas de percentiles pediátricas.
- **Ignorar el Peso Corporal Ajustado (PCA):** En pacientes con obesidad, ciertos fármacos requieren ``PCA = PCI + 0.4 × (Peso_real − PCI)`` en lugar del PCI puro.
- **Aplicar el PCI a deportistas de fuerza:** La hipertrofia muscular eleva el peso saludable por encima del PCI teórico sin implicar exceso adiposo.

Para evaluar adecuadamente el riesgo cardiometabólico, combine el PCI con el porcentaje de grasa corporal y el índice cintura-estatura (objetivo inferior a 0.50).
