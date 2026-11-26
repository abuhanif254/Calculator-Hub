---
title: "Calculadora de Ácido-Base: Dominando la Neutralización"
description: "Guía técnica sobre reacciones ácido-base y titulaciones volumétricas: estequiometría de neutralización, factor de equivalencia, curvas de valoración y cálculo del punto de equivalencia."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "acid-base-calculator"
relatedType: "calculator"
faqs:
  - question: "¿El punto de equivalencia de una neutralización siempre ocurre a pH 7.00?"
    answer: "No. Solo alcanza exactamente pH 7.00 (a 25 °C) cuando reaccionan un ácido fuerte y una base fuerte, porque la sal resultante no se hidroliza. Al titular un ácido débil con una base fuerte, la base conjugada formada eleva el pH de equivalencia por encima de 7 (alrededor de 8.5–9.0); con un ácido fuerte y una base débil, el punto de equivalencia queda por debajo de 7."
  - question: "¿Qué diferencia hay entre punto de equivalencia y punto final en una titulación?"
    answer: "El punto de equivalencia es el instante estequiométrico exacto en que los moles de H⁺ cedidos igualan a los moles de OH⁻ aportados. El punto final es el momento experimental en que el indicador colorimétrico cambia de tono o el electrodo detecta la inflexión; un indicador bien elegido minimiza el error entre ambos puntos."
  - question: "¿Cuándo falla la fórmula simplificada M_a × V_a = M_b × V_b?"
    answer: "Falla siempre que el ácido o la base no tengan relación estequiométrica 1:1. Por ejemplo, cada mol de H₂SO₄ aporta dos equivalentes de H⁺ y cada mol de Ca(OH)₂ aporta dos equivalentes de OH⁻. En esos casos debe incorporarse el factor de equivalencia: n_a × M_a × V_a = n_b × M_b × V_b."
  - question: "¿Por qué debe añadirse siempre el ácido concentrado sobre el agua y nunca al revés al preparar disoluciones?"
    answer: "La hidratación de ácidos fuertes como el H₂SO₄ concentrado es sumamente exotérmica. Si se vierte agua sobre el ácido concentrado, el calor liberado en una capa superficial pequeña puede provocar ebullición violenta y proyecciones corrosivas; añadir el ácido lentamente sobre un volumen mayor de agua disipa el calor de forma segura."
  - question: "¿Por qué las disoluciones patrón de NaOH cambian de concentración con el tiempo si quedan expuestas al aire?"
    answer: "Porque el hidróxido de sodio absorbe dióxido de carbono (CO₂) atmosférico formando carbonato de sodio (Na₂CO₃), lo que reduce su alcalinidad efectiva frente a indicadores de punto final ácido y altera el título real de la disolución. Por ello las bases estándar deben estandarizarse periódicamente con ftalato ácido de potasio."
---

Una **reacción de neutralización ácido-base** transfiere protones desde un ácido hacia una base para formar una sal iónica y agua (`H₃O⁺ + OH⁻ → 2 H₂O`). Cuando esta reacción se ejecuta añadiendo de forma medida un reactivo patrón (titulante) sobre una muestra de concentración desconocida (analito), constituye una **titulación volumétrica**, método analítico esencial para determinar molaridades con alta exactitud.

Con nuestra [Calculadora de Ácido-Base](/es/calculadoras/calculadora-de-acido-base) puede calcular la molaridad o el volumen necesario en neutralizaciones monopróticas y polipróticas. Esta guía desarrolla la estequiometría con factores de equivalencia, un ejercicio completo de titulación con exceso de base, una tabla comparativa de curvas de valoración y las medidas de seguridad de laboratorio.

## Estequiometría de neutralización y ecuación de titulación

En una reacción equilibrada entre un ácido con `n_a` protones ionizables y una base con `n_b` equivalentes básicos por fórmula unitaria, el punto de equivalencia iguala los equivalentes químicos:

```text
n_a × M_a × V_a = n_b × M_b × V_b
```

Donde:

- **`M_a` y `M_b`:** molaridades del ácido y de la base (`mol/L` o `M`).
- **`V_a` y `V_b`:** volúmenes en unidades homogéneas (`mL` en ambos miembros o `L` en ambos).
- **`n_a` y `n_b`:** factores estequiométricos (`1` para `HCl`, `HNO₃`, `CH₃COOH`, `NaOH`, `KOH`; `2` para `H₂SO₄`, `Ca(OH)₂`, `Ba(OH)₂`; `3` para `H₃PO₄` en neutralización completa).

Solo cuando `n_a = n_b = 1` la ecuación se simplifica a `M_a × V_a = M_b × V_b`.

### Regiones de pH durante una titulación

1. **Antes de la equivalencia:** el exceso del reactivo inicial dividido entre el **volumen total acumulado** (`V_a + V_b`) fija el pH (o forma una zona tampón si el analito es débil).
2. **En el punto de equivalencia:** se alcanza `pH 7.00` (`25 °C`) únicamente en pares fuerte-fuerte; si interviene un ácido o base débil, la hidrólisis de la sal desplaza el pH hacia el lado básico o ácido.
3. **Después de la equivalencia:** el titulante en exceso determina `[H⁺]` o `[OH⁻]` sobre `V_a + V_b`.

## Ejemplo práctico paso a paso: valoración de `H₂SO₄` y exceso de base

Se valoran `25.0 mL` de ácido sulfúrico (`H₂SO₄`, `n_a = 2`) con `NaOH 0.150 M` (`n_b = 1`), alcanzando el segundo punto de equivalencia con `32.4 mL` de base.

### Parte 1: Determinar la molaridad del `H₂SO₄`

```text
Moles OH⁻ consumidos = 0.150 mol/L × 0.0324 L = 0.00486 mol
Moles H₂SO₄ = 0.00486 / 2 = 0.00243 mol
M_a = 0.00243 mol / 0.0250 L = 0.0972 M
```

Con la fórmula general: `M_a = (1 × 0.150 × 32.4) / (2 × 25.0) = 0.0972 M`.

### Parte 2: Calcular el pH si se añaden `35.0 mL` de `NaOH` (exceso)

```text
V_exceso = 35.0 − 32.4 = 2.6 mL = 0.0026 L
Moles OH⁻ en exceso = 0.150 × 0.0026 = 3.90 × 10⁻⁴ mol
V_total = 25.0 + 35.0 = 60.0 mL = 0.0600 L
[OH⁻] = (3.90 × 10⁻⁴) / 0.0600 = 6.50 × 10⁻³ M
pOH = −log₁₀(6.50 × 10⁻³) = 2.187 ≈ 2.19
pH = 14.00 − 2.19 = 11.81
```

## Tabla comparativa de sistemas de titulación y puntos de equivalencia

| Sistema de valoración | Relación molar | pH de equivalencia (`25 °C`) | Especie dominante | Indicador adecuado | Rasgo de la curva |
| :--- | :---: | :---: | :--- | :--- | :--- |
| Ácido fuerte + Base fuerte (`HCl + NaOH`) | `1 : 1` | `7.00` | `NaCl` (neutro) | Azul de bromotimol | Salto amplio (`pH 4–10`) |
| Ácido diprótico + Base fuerte (`H₂SO₄ + NaOH`) | `1 : 2` | `7.00` | `Na₂SO₄` (neutro) | Azul de bromotimol | Exige factor `n_a = 2` |
| Ácido débil + Base fuerte (`CH₃COOH + NaOH`) | `1 : 1` | `~8.72` | `CH₃COO⁻` (básico) | Fenolftaleína (`8.2–10.0`) | Zona tampón en `pKa` |
| Ácido fuerte + Base débil (`HCl + NH₃`) | `1 : 1` | `~5.28` | `NH₄⁺` (ácido) | Rojo de metilo (`4.4–6.2`) | Fenolftaleína errónea |
| Ácido diprótico débil + Base fuerte (`H₂CO₃ + NaOH`) | `1 : 1` y `1 : 2` | `~8.3` y `~11.3` | `HCO₃⁻` / `CO₃²⁻` | Fenolftaleína / Naranja metilo | Dos inflexiones claras |
| Ácido débil + Base débil (`CH₃COOH + NH₃`) | `1 : 1` | `~7.00` | `NH₄⁺ / CH₃COO⁻` | pH-metro potenciométrico | Inflexión muy suave |

## Aplicaciones industriales, seguridad y errores frecuentes

La neutralización cuantitativa sustenta procesos críticos de control y seguridad:

- **Industria agroalimentaria:** cuantificación de acidez titulable en vinos (ácido tartárico), lácteos (ácido láctico) y zumos para asegurar conservación y perfil sensorial.
- **Tratamiento de efluentes:** ajuste automático de aguas residuales hacia el rango normativo de vertido (`pH 6.0–9.0`) antes de su descarga.
- **Farmacopea y control farmacéutico:** ensayos acidimétricos y alcalimétricos automatizados para certificar la pureza de materias primas.

### Errores frecuentes y precauciones de seguridad

1. **Omitir los factores `n_a` o `n_b`:** olvidar el factor `2` en `H₂SO₄` o `Ca(OH)₂` introduce un error del `50 %` o del `100 %`.
2. **Seleccionar un indicador inadecuado:** usar fenolftaleína al valorar amoníaco con `HCl` vira mucho antes del punto de equivalencia ácido (`pH ≈ 5.3`).
3. **Subestimar la energía térmica de neutralización:** mezclar ácidos y bases concentrados (`> 2 M`) libera unos `57.3 kJ/mol` de agua formada; debe trabajarse con agitación, refrigeración externa, gafas de seguridad y vitrina extractora.
4. **Olvidar la dilución acumulada:** tras superar la equivalencia, la concentración residual debe dividirse siempre por `V_a + V_b`.
