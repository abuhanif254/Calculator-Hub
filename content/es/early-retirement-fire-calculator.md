---
title: "Calculadora FIRE (Independencia Financiera y Jubilación Anticipada)"
metaTitle: "Calculadora FIRE de Independencia Financiera y Retiro"
description: "Calcula tu número FIRE objetivo aplicando la regla del 4 % y proyecta exactamente cuántos años necesitas ahorrar e invertir para alcanzar la libertad financiera."
metaDescription: "Calcula tu número FIRE exacto con la regla del 4 %, compara modalidades Lean, Fat, Coast y Barista FIRE y descubre en cuántos años podrás jubilarte antes."
metaKeywords: "calculadora FIRE, independencia financiera, jubilación anticipada, regla del 4 por ciento, número FIRE, tasa de ahorro, Coast FIRE, Lean FIRE"
faqs:
  - question: "¿Es segura la regla del 4 % si planeo jubilarme a los 35 o 40 años?"
    answer: "El Estudio Trinity original validó la tasa de retiro del 4 % para un horizonte de 30 años. Si tu jubilación anticipada va a durar entre 40 y 55 años, la mayoría de planificadores financieros recomiendan reducir la Tasa de Retiro Seguro (TRS) al 3,25 % o 3,5 % (acumulando entre 28,5 y 30,7 veces tus gastos anuales) para evitar el agotamiento del capital."
  - question: "¿Debo calcular mi número FIRE con mis gastos brutos o descontando impuestos futuros?"
    answer: "Tu objetivo de gasto anual debe incluir la factura fiscal derivada de vender participaciones o cobrar dividendos. En España, las ganancias patrimoniales en la base del ahorro tributan entre el 19 % y el 28 % en el IRPF; por tanto, si necesitas 24.000 € netos para vivir y el 50 % de tu reembolso es plusvalía sujeta al 19 %, deberás retirar aproximadamente 26.500 € brutos al año."
  - question: "¿Por qué la tasa de ahorro importa mucho más que mi sueldo total para alcanzar FIRE?"
    answer: "La tasa de ahorro actúa en ambos lados de la ecuación simultáneamente: cuanto mayor porcentaje de tu ingreso neto ahorras, menor es tu coste de vida anual (lo que reduce el patrimonio total que necesitas acumular) y mayor es el capital libre que inviertes cada mes para acelerar el interés compuesto."
  - question: "¿Qué es exactamente el riesgo de secuencia de retornos y cómo puede arruinar mi retiro?"
    answer: "Es el peligro de sufrir una caída severa de la bolsa (del 30 % al 50 %) durante los primeros tres a cinco años tras dejar de trabajar. Al retirar dinero para vivir mientras los activos están deprimidos, vendes un número desproporcionado de participaciones y el portafolio pierde capacidad de recuperación cuando el mercado rebota."
  - question: "¿Cómo integro la futura pensión pública o el fondo de retiro obligatorio en mi cálculo?"
    answer: "Si cuentas con años cotizados en la Seguridad Social, una Afore o una AFP, puedes restar la pensión pública estimada (aplicando un factor de prudencia del 60 % al 70 %) a partir de los 65 o 67 años, o bien usar tu cartera FIRE como puente financiero completo y tratar la pensión estatal únicamente como margen de seguridad para la vejez."
---

El movimiento **FIRE** (*Financial Independence, Retire Early* o Independencia Financiera y Jubilación Anticipada) transforma el retiro de una edad biológica fija a una meta patrimonial verificable. En lugar de esperar hasta los 65 o 67 años, alcanzas la libertad financiera cuando los rendimientos reales de tu cartera de inversión cubren indefinidamente tu coste de vida anual.

## Qué es el Número FIRE y el Fundamento de la Regla del 4 %

El pilar cuantitativo del movimiento proviene del *Estudio Trinity* (Universidad Trinity, 1998), que analizó ciclos históricos de acciones y bonos. Esta investigación demostró que una cartera diversificada (entre un 75 % en renta variable global y un 25 % en bonos) soporta retiros anuales equivalentes al **4 % de su valor inicial**, ajustados cada año según la inflación (IPC), con una probabilidad histórica superior al 95 % de no agotarse durante 30 años.

De esta **Tasa de Retiro Seguro (TRS)** nace la regla de las 25 veces ($1 / 0,04 = 25$). Para horizontes de retiro más largos (45 o 50 años), reducir la tasa al **3,5 %** eleva el multiplicador a $28,57$ veces tu gasto anual, mientras que una tasa conservadora del **3,25 %** requiere acumular $30,77$ veces tus gastos.

## Fórmulas Matemáticas para la Libertad Financiera

Para evitar que la inflación distorsione tu poder adquisitivo futuro, todos los cálculos se expresan en **términos reales** (moneda constante de hoy).

### 1. Ecuación del Patrimonio Objetivo (Número FIRE)

$$C_{\text{FIRE}} = \frac{G_{\text{anual}}}{\text{TRS}}$$

Donde:
- $C_{\text{FIRE}}$: Patrimonio neto invertible necesario para retirarte (excluyendo la vivienda habitual si no produce rentas).
- $G_{\text{anual}}$: Gasto anual previsto durante la jubilación (incluyendo impuestos sobre reembolsos).
- $\text{TRS}$: Tasa de Retiro Seguro en tanto por uno ($0,04$ para el 4 % clásico; $0,035$ para el 3,5 % prudente).

### 2. Rentabilidad Real Neta de Inflación (Ecuación de Fisher)

$$r = \frac{1 + r_{\text{nominal}}}{1 + \pi} - 1$$

Si tu cartera indexada rinde un $8,5\%$ nominal anual ($r_{\text{nominal}} = 0,085$) y la inflación media es del $2,5\%$ ($\pi = 0,025$), tu rentabilidad real anualizada es $r = (1,085 / 1,025) - 1 = 0,0585$ (**5,85 % real**).

### 3. Fórmula Logarítmica de los Años hasta el Retiro ($N$)

Dado tu patrimonio invertido actual ($P_0$), tu ahorro anual constante ($A$), tu rentabilidad real ($r$) y tu meta ($C_{\text{FIRE}}$), los años necesarios se obtienen mediante:

$$N = \frac{\ln\left(\frac{C_{\text{FIRE}} \cdot r + A}{P_0 \cdot r + A}\right)}{\ln(1 + r)}$$

## Caso Práctico Paso a Paso: Retiro Antes de los 49 Años

Analicemos a **Elena (31 años)**, con ingresos netos anuales de **36.000 €** (o `$36,000 USD`), gastos anuales de **21.600 €** (1.800 €/mes) y una cartera indexada actual de **40.000 €** ($P_0 = 40.000$).

1. **Tasa de ahorro y aporte anual ($A$)**: Elena ahorra $36.000 - 21.600 = 14.400\text{ €}$ anuales, logrando una **tasa de ahorro del 40 %**.
2. **Cálculo del Número FIRE ($C_{\text{FIRE}}$)**: Con la regla del 4 % ($\text{TRS} = 0,04$), necesita $21.600 / 0,04 = \mathbf{540.000\text{ €}}$ (con una TRS conservadora del 3,5 %, necesitaría $21.600 / 0,035 = 617.143\text{ €}$).
3. **Cálculo de los años hasta el retiro ($N$)**: Con una rentabilidad real neta de inflación del **6 % anual** ($r = 0,06$):
   - Numerador interno: $(540.000 \times 0,06) + 14.400 = 46.800$.
   - Denominador interno: $(40.000 \times 0,06) + 14.400 = 16.800$.
   - Cociente: $46.800 / 16.800 = 2,785714$.
   - Aplicación de logaritmos naturales:
     $$N = \frac{\ln(2,785714)}{\ln(1,06)} = \frac{1,024504}{0,058269} \approx 17,58\text{ años}$$

Elena alcanzará los **540.000 €** en poder adquisitivo actual a los **48 años y 7 meses**. Si incrementara su tasa de ahorro al 50 % (18.000 € de gasto y 18.000 € de ahorro, meta de 450.000 €), su horizonte se reduciría a **13,3 años** (jubilación a los 44 años).

## Comparativa de Modalidades FIRE y Tasa de Ahorro

Dependiendo del presupuesto objetivo y de si deseas mantener ingresos parciales, existen cinco variantes estratégicas de independencia financiera:

|Modalidad FIRE|Gasto Mensual|Gasto Anual|Capital (TRS 4 %)|Capital (TRS 3,5 %)|Perfil y Estrategia|
|:---|:---|:---|:---|:---|:---|
|**Lean FIRE**|1.200 €/$|14.400 €/$|360.000 €/$|411.429 €/$|Vida minimalista, vivienda pagada o arbitraje geográfico.|
|**FIRE Estándar**|2.200 €/$|26.400 €/$|660.000 €/$|754.286 €/$|Cobertura total de clase media sin trabajar.|
|**Fat FIRE**|5.000 €/$|60.000 €/$|1.500.000 €/$|1.714.286 €/$|Holgura para viajes, salud privada e imprevistos.|
|**Barista FIRE**|2.200 €/$ (50 % cartera)|13.200 €/$ de cartera|330.000 €/$|377.143 €/$|La cartera cubre la mitad del gasto; el resto, empleo flexible.|
|**Coast FIRE**|Variable al retiro|Variable|120.000 €/$ a los 30 años|140.000 €/$ a los 30 años|El capital inicial crece solo hasta los 65 años; trabajas solo para tu gasto mensual.|

Observa además cómo la **tasa de ahorro** determina los años exactos para retirarte partiendo desde **patrimonio cero ($P_0 = 0$)** bajo la regla del 4 %:

|Tasa de Ahorro Neto|% de Ingresos Gastados|Años hasta FIRE (al 5 % real)|Años hasta FIRE (al 7 % real)|
|:---|:---|:---|:---|
|**15 %**|85 %|42,8 años|35,3 años|
|**30 %**|70 %|28,0 años|23,9 años|
|**50 %**|50 %|16,6 años|14,6 años|
|**65 %**|35 %|10,6 años|9,5 años|

## Errores Comunes y Estrategias de Protección Patrimonial

- **Descuidar el colchón de liquidez contra el riesgo de secuencia**: Retirarse con el 100 % en renta variable expone tu plan a una caída bursátil temprana. Mantener de 18 a 24 meses de gastos básicos en fondos monetarios o letras del Tesoro evita vender acciones en pérdidas durante un mercado bajista.
- **Incluir la vivienda habitual en el Número FIRE**: Tu casa reduce tu gasto mensual al evitar el alquiler, pero no genera liquidez para pagar facturas salvo que la alquiles o vendas.
- **Usar retiros rígidos en lugar de reglas flexibles**: Aplicar barandillas dinámicas (*guardrails*), reduciendo un 10 % los gastos discrecionales en años bajistas, eleva la tasa de éxito de la cartera cerca del 100 % incluso en retiros de 50 años.
