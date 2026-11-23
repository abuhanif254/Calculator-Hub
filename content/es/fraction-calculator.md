---
title: "Calculadora de Fracciones"
metaTitle: "Calculadora de Fracciones | Sumar y Restar Fracciones"
description: "Suma, resta, multiplica y divide fracciones propias, impropias y números mixtos con simplificación automática al máximo común divisor."
metaDescription: "Calculadora de fracciones en línea gratuita. Resuelve problemas de fracciones, simplifica números mixtos y encuentra denominadores comunes."
metaKeywords: "calculadora de fracciones, sumar fracciones, restar fracciones, multiplicar fracciones, simplificar fracciones, minimo comun multiplo, numeros mixtos"
faqs:
  - question: "¿Cómo se suman o restan fracciones que tienen distinto denominador?"
    answer: "Primero se calcula el Mínimo Común Múltiplo (mcm) de los denominadores para obtener un denominador común. Luego se divide ese mcm entre cada denominador original y se multiplica el resultado por su numerador correspondiente. Finalmente, se suman o restan los nuevos numeradores manteniendo el denominador común y se simplifica."
  - question: "¿Cuál es la diferencia entre una fracción propia, una impropia y un número mixto?"
    answer: "En una fracción propia el numerador es menor que el denominador (como 3/4), por lo que su valor es inferior a la unidad. En una fracción impropia el numerador es mayor o igual que el denominador (como 11/4). Un número mixto expresa esa misma fracción impropia combinando su parte entera y su fracción restante (2 3/4)."
  - question: "¿Cómo se convierte un número mixto en fracción impropia para poder operar?"
    answer: "Se multiplica la parte entera por el denominador de la fracción y al resultado se le suma el numerador original, conservando el mismo denominador. Por ejemplo, en 3 2/5 se calcula (3 × 5) + 2 = 17, obteniendo la fracción impropia 17/5. Si el número mixto es negativo, el signo menos se aplica al resultado final."
  - question: "¿Por qué para dividir dos fracciones se multiplica en cruz o se invierte la segunda fracción?"
    answer: "Dividir cualquier cantidad entre una fracción equivale matemáticamente a multiplicarla por su elemento inverso multiplicativo o fracción recíproca. Al intercambiar el numerador y el denominador de la segunda fracción (el divisor), la división se transforma en una multiplicación directa de numeradores y denominadores."
  - question: "¿Qué significa reducir una fracción a su forma irreducible?"
    answer: "Una fracción es irreducible cuando su numerador y su denominador no tienen ningún divisor primo en común salvo el 1, es decir, cuando su Máximo Común Divisor (MCD) es igual a 1. Se obtiene dividiendo tanto el numerador como el denominador entre el MCD de ambos números."
---

Operar con números racionales expresados en forma de fracción $\frac{a}{b}$ permite conservar la exactitud matemática absoluta en cálculos algebraicos, mediciones de ingeniería, carpintería, dosificación clínica y proporciones financieras. A diferencia de los números decimales truncados —donde cantidades periódicas como $\frac{1}{3} \approx 0,333$ o $\frac{5}{6} \approx 0,833$ introducen errores acumulativos—, la aritmética fraccionaria trabaja con razones enteras exactas hasta el final del procedimiento.

Nuestra **Calculadora de Fracciones** resuelve operaciones de suma, resta, multiplicación y división tanto con fracciones simples (propias e impropias) como con números mixtos, determinando automáticamente el denominador común, reduciendo el resultado a su expresión irreducible mediante el Máximo Común Divisor (MCD) y mostrando su equivalencia en número mixto y notación decimal.

## Reglas y Fórmulas Fundamentales de la Aritmética de Fracciones

Toda fracción consta de un **numerador** (el dividendo situado arriba, que indica cuántas partes se toman) y un **denominador** no nulo (el divisor situado abajo, que define en cuántas partes iguales se divide la unidad). Según la operación requerida, se aplican cinco identidades algebraicas esenciales:

### 1. Conversión de Número Mixto a Fracción Impropia
Antes de operar con números mixtos de la forma $E\frac{a}{b}$ (donde $E$ es la parte entera positiva), estos se transforman en fracciones impropias:

$$E\frac{a}{b} = \frac{(E \cdot b) + a}{b} \quad (b \neq 0)$$

### 2. Suma y Resta de Fracciones
Cuando los denominadores son iguales ($b = d$), se suman o restan directamente los numeradores. Cuando los denominadores son distintos ($b \neq d$), se igualan utilizando el **Mínimo Común Múltiplo** $m = \text{mcm}(b, d)$ o mediante productos cruzados:

$$\frac{a}{b} \pm \frac{c}{d} = \frac{a\left(\frac{m}{b}\right) \pm c\left(\frac{m}{d}\right)}{m} = \frac{(a \cdot d) \pm (b \cdot c)}{b \cdot d}$$

### 3. Multiplicación y División de Fracciones
La multiplicación opera en línea recta (numerador por numerador y denominador por denominador), mientras que la división multiplica la primera fracción por la inversa o recíproca de la segunda:

$$\frac{a}{b} \times \frac{c}{d} = \frac{a \cdot c}{b \cdot d}, \quad \frac{a}{b} \div \frac{c}{d} = \frac{a}{b} \times \frac{d}{c} = \frac{a \cdot d}{b \cdot c}$$

### 4. Simplificación a Fracción Irreducible
Obtenido el resultado preliminar $\frac{N}{D}$, se calcula el Máximo Común Divisor $\text{MCD}(|N|, |D|)$ mediante el algoritmo de Euclides y se dividen ambos términos:

$$\frac{N_{\text{irreducible}}}{D_{\text{irreducible}}} = \frac{N \div \text{MCD}(|N|, |D|)}{D \div \text{MCD}(|N|, |D|)}$$

Donde cada variable representa:
* **$a, c$**: Numeradores enteros de la primera y segunda fracción.
* **$b, d$**: Denominadores enteros no nulos de la primera y segunda fracción.
* **$E$**: Parte entera de un número mixto.
* **$\text{mcm}(b, d)$**: El menor múltiplo positivo común a los denominadores $b$ y $d$.
* **$\text{MCD}(|N|, |D|)$**: El mayor divisor entero positivo que divide exactamente a $N$ y a $D$.

## Ejemplos Resueltos Paso a Paso

### Ejemplo 1: Suma de Números Mixtos con Distinto Denominador ($2\frac{5}{6} + 1\frac{3}{8}$)
1. **Convertir a fracciones impropias:** $2\frac{5}{6} = \frac{(2 \times 6) + 5}{6} = \frac{17}{6}$ y $1\frac{3}{8} = \frac{(1 \times 8) + 3}{8} = \frac{11}{8}$.
2. **Calcular el Mínimo Común Múltiplo:** Factorizando $6 = 2 \times 3$ y $8 = 2^3$, obtenemos $\text{mcm}(6, 8) = 2^3 \times 3 = 24$.
3. **Amplificar al denominador común $24$:**
   $$\frac{17}{6} = \frac{17 \times 4}{24} = \frac{68}{24}, \quad \frac{11}{8} = \frac{11 \times 3}{24} = \frac{33}{24}$$
4. **Sumar numeradores y convertir a mixto:** $\frac{68 + 33}{24} = \frac{101}{24}$. Como $101$ es primo, $\text{MCD}(101, 24) = 1$. Dividiendo $101 \div 24$ resulta cociente $4$ y resto $5$: **$\frac{101}{24} = 4\frac{5}{24} \approx 4,20833$**.

### Ejemplo 2: División con Simplificación Euclídea ($\frac{18}{35} \div \frac{27}{14}$)
1. **Multiplicar por el recíproco del divisor:** Invertimos $\frac{27}{14}$ a $\frac{14}{27}$:
   $$\frac{18}{35} \div \frac{27}{14} = \frac{18}{35} \times \frac{14}{27} = \frac{252}{945}$$
2. **Hallar el $\text{MCD}(252, 945)$ con el algoritmo de Euclides:** $945 = 252 \times 3 + 189$; luego $252 = 189 \times 1 + 63$; finalmente $189 = 63 \times 3 + 0 \implies \text{MCD} = 63$.
3. **Reducir a su mínima expresión:** Dividiendo ambos términos entre $63$, obtenemos **$\frac{252 \div 63}{945 \div 63} = \frac{4}{15} \approx 0,26667$**.

## Tabla de Referencia: Equivalencias entre Fracciones, Decimales y Porcentajes

Equivalencias de las fracciones más utilizadas en cálculo técnico, estadística y sistemas de medida:

| Fracción | Clasificación | Decimal | Tipo de Decimal | Porcentaje |
| :--- | :--- | :--- | :--- | :--- |
| **$\frac{1}{8}$** | Propia | $0,125$ | Exacto | $12,50\%$ |
| **$\frac{1}{6}$** | Propia | $0,1\overline{6}$ | Periódico mixto | $16,67\%$ |
| **$\frac{1}{5}$** | Propia | $0,20$ | Exacto | $20,00\%$ |
| **$\frac{1}{4}$** | Propia | $0,25$ | Exacto | $25,00\%$ |
| **$\frac{1}{3}$** | Propia | $0,\overline{3}$ | Periódico puro | $33,33\%$ |
| **$\frac{3}{8}$** | Propia | $0,375$ | Exacto | $37,50\%$ |
| **$\frac{1}{2}$** | Propia | $0,50$ | Exacto | $50,00\%$ |
| **$\frac{5}{8}$** | Propia | $0,625$ | Exacto | $62,50\%$ |
| **$\frac{2}{3}$** | Propia | $0,\overline{6}$ | Periódico puro | $66,67\%$ |
| **$\frac{3}{4}$** | Propia | $0,75$ | Exacto | $75,00\%$ |
| **$\frac{7}{8}$** | Propia | $0,875$ | Exacto | $87,50\%$ |
| **$\frac{5}{4}$ ($1\frac{1}{4}$)** | Impropia | $1,25$ | Exacto | $125,00\%$ |

## Consejos Prácticos y Errores Comunes al Operar con Fracciones

* **Sumar denominadores directamente:** El error más frecuente consiste en calcular $\frac{1}{3} + \frac{1}{4}$ como $\frac{2}{7}$. Los denominadores definen el tamaño de las particiones de la unidad y jamás se suman entre sí; deben igualarse primero mediante el mínimo común múltiplo ($\frac{4}{12} + \frac{3}{12} = \frac{7}{12}$).
* **Error de signo en números mixtos negativos:** En $-2\frac{3}{4}$, el signo negativo afecta a toda la cantidad: $-\left(2 + \frac{3}{4}\right) = -\frac{11}{4}$. Si calculas erróneamente $\frac{(-2 \times 4) + 3}{4}$, obtendrás $-\frac{5}{4}$.
* **Simplificación cruzada antes de multiplicar:** En productos como $\frac{18}{35} \times \frac{14}{27}$, simplifica en diagonal los factores comunes ($18$ y $27$ entre $9$ quedan en $2$ y $3$; $14$ y $35$ entre $7$ quedan en $2$ y $5$) para multiplicar directamente $\frac{2 \times 2}{5 \times 3} = \frac{4}{15}$.
