---
metaTitle: "Generador de Interfaces TypeScript desde JSON | DTO y Zod"
metaDescription: "Genere interfaces TypeScript recursivas desde JSON en su navegador. Inferencia de arreglos unión, seguridad de tipos en DTO de API y validación con Zod."
metaKeywords: "json a typescript, generar interfaces typescript, inferencia tipos json, union types arreglos, dto api typescript, validacion runtime zod"
title: "Generador de Interfaces TypeScript desde JSON"
shortDescription: "Sintetice automáticamente interfaces 'export interface' recursivas y tipos unión a partir de cualquier respuesta JSON en su navegador, listos para DTOs de API y validación en tiempo de ejecución con Zod."
faqs:
  - question: "¿Cómo infiere la herramienta las interfaces recursivas para objetos anidados?"
    answer: "El generador recorre el árbol JSON en profundidad y extrae cada objeto anidado como una declaración export interface independiente con nombre en PascalCase. Si dos subobjetos comparten exactamente la misma estructura, pueden consolidarse para evitar duplicados."
  - question: "¿Qué sucede cuando un arreglo JSON contiene elementos heterogéneos u opcionales?"
    answer: "El motor analiza todos los elementos del arreglo, no solo el primero. Si detecta tipos primitivos distintos genera un tipo unión como (string | number)[]; si encuentra objetos con propiedades que faltan en algunos registros, marca esos campos como opcionales mediante el modificador ?."
  - question: "¿Es mejor usar export interface o type para los DTOs de una API en TypeScript?"
    answer: "Ambas opciones son válidas, pero export interface suele preferirse para objetos y contratos DTO porque produce mensajes de error más claros en el compilador tsc, admite herencia limpia con extends y permite ampliación de módulos si fuera necesario."
  - question: "¿Por qué necesito combinar las interfaces de TypeScript con esquemas Zod en producción?"
    answer: "TypeScript realiza comprobación estática exclusivamente durante la compilación: todas las interfaces desaparecen al transpilar a JavaScript. Validar la carga JSON entrante con Zod en tiempo de ejecución garantiza que un cambio inesperado en una API externa no rompa la aplicación."
  - question: "¿Se envían las respuestas JSON privadas de mi API a servidores externos?"
    answer: "No. Tanto el análisis del JSON como la síntesis del árbol de tipos TypeScript se ejecutan al 100 % en su navegador del lado del cliente. Ninguna carga útil sale de su máquina."
features:
  - "Generación recursiva de declaraciones export interface limpias y nombradas en PascalCase"
  - "Inferencia unificada de tipos unión y propiedades opcionales (?) en arreglos heterogéneos"
  - "Detección automática de propiedades anulables (T | null) y arreglos vacíos (unknown[])"
  - "Soporte para claves con caracteres especiales o guiones entrecomilladas de forma válida"
  - "Código listo para acoplar con esquemas de validación en tiempo de ejecución como Zod"
useCases:
  - "Tipar rápidamente respuestas JSON complejas de APIs REST o GraphQL de terceros en proyectos frontend"
  - "Definir contratos DTO seguros entre el cliente y el servidor en aplicaciones Next.js, NestJS o Angular"
  - "Documentar modelos de eventos de webhooks (Stripe, GitHub, Twilio) con tipado estricto"
  - "Acelerar la creación de esquemas Zod o Valibot partiendo de una estructura de tipos ya inferida"
  - "Refactorizar código JavaScript heredado hacia TypeScript estricto a partir de fixtures de pruebas"
howToSteps:
  - "Pegue un ejemplo representativo de la respuesta JSON de su API en el panel de entrada."
  - "Asigne un nombre raíz en PascalCase para la interfaz principal (por ejemplo, RespuestaPedido)."
  - "Revise las interfaces recursivas y los tipos unión inferidos automáticamente para arreglos y nulos."
  - "Copie las declaraciones export interface en su proyecto TypeScript y añada validación Zod en la frontera de red."
---

Trabajar con respuestas JSON sin tipar en proyectos TypeScript —recurriendo a `any` o a definiciones manuales propensas a desactualización— anula la principal ventaja del sistema de tipos estáticos: detectar incompatibilidades contractuales antes de llegar a producción. Redactar a mano interfaces anidadas para respuestas complejas de API consume tiempo valioso y suele pasar por alto propiedades opcionales, valores anulables o arreglos con tipos mixtos.

Este generador sintetiza declaraciones `export interface` limpias a partir de cualquier muestra JSON, ejecutándose al 100 % en el lado del cliente dentro de su navegador. Ninguna respuesta de API, token de prueba ni registro de negocio abandona su equipo, permitiéndole inspeccionar y tipar cargas útiles confidenciales de su infraestructura interna con privacidad absoluta.

## Motor de inferencia recursiva: AST de tipos, uniones estructurales y opcionalidad

Inferir tipos fiables desde una instancia JSON exige construir un árbol de tipos abstracto recorriendo recursivamente cada nodo y unificando estructuras heterogéneas. Para los valores primitivos el mapeo es directo: cadenas a `string`, valores numéricos a `number`, booleanos a `boolean` y nulos a `null`. Cuando una propiedad contiene un objeto literal, el generador lo extrae como una interfaz nominal independiente `export interface` en `PascalCase` derivada de su clave padre, evitando bloques anónimos en línea ilegibles cuando hay varios niveles de profundidad.

Si dos subobjetos dentro de la misma carga útil presentan estructuras idénticas, pueden consolidarse para mantener el código modular y libre de definiciones repetidas. Asimismo, las claves JSON que contienen guiones, puntos o espacios (como `"content-type"`) se envuelven automáticamente entre comillas válidas dentro de la interfaz para garantizar una compilación sin errores de sintaxis.

El punto crítico de todo generador reside en los arreglos JSON. Un algoritmo ingenuo que inspecciona únicamente el índice `[0]` falla en cuanto el segundo registro incluye un campo nuevo o un tipo distinto. Nuestro motor fusiona estructuralmente todos los elementos de la colección:
- Los arreglos de primitivos mixtos como `["activo", 200, null]` producen un tipo unión limpio `(string | number | null)[]`.
- Los arreglos de objetos cuyas propiedades aparecen solo en algunos registros declaran automáticamente dichos campos como opcionales (`etiqueta?: string`) y resuelven conflictos de tipo por propiedad (`T | U`).
- Los arreglos vacíos (`[]`) se tipan como `unknown[]` en lugar de contaminar el proyecto con `any[]`, cumpliendo las reglas estrictas de `strict: true` en `tsconfig.json`.

## Guía práctica: de respuesta JSON heterogénea a DTO tipado y esquema Zod

Considere una respuesta JSON realista de un servicio de pagos con un objeto anidado, un campo nulo, un arreglo con formas parcialmente distintas y una lista vacía:

```json
{"id":"tx_88412","total":245.5,"reembolso":null,"cliente":{"id":910,"correo":"dev@ejemplo.es"},"articulos":[{"sku":"PRO-1","etiqueta":"vip"},{"sku":"ADD-9"}],"alertas":[]}
```

1. **Genere las interfaces DTO**: Pegue la carga útil y asigne el nombre raíz `TransaccionDTO`. El motor unifica los objetos de `articulos` marcando `etiqueta` como opcional y tipa `alertas` de forma segura:

```typescript
export interface Cliente { id: number; correo: string; }
export interface Articulo { sku: string; etiqueta?: string; }
export interface TransaccionDTO { id: string; total: number; reembolso: null; cliente: Cliente; articulos: Articulo[]; alertas: unknown[]; }
```

2. **Refine tipos anulables conocidos**: Si `reembolso` aparece como `null` en esta muestra puntual pero la documentación de su backend indica que devuelve un importe cuando existe una devolución, amplíe manualmente la firma a `reembolso: number | null`.
3. **Valide en tiempo de ejecución con Zod**: Dado que las interfaces TypeScript se borran por completo al compilar a JavaScript, acople un esquema Zod en la frontera de red para verificar los datos reales devueltos por `fetch` antes de consumirlos en la interfaz:

```typescript
import { z } from "zod";
export const TransaccionSchema = z.object({ id: z.string(), total: z.number(), reembolso: z.number().nullable(), cliente: z.object({ id: z.number(), correo: z.string().email() }), articulos: z.array(z.object({ sku: z.string(), etiqueta: z.string().optional() })), alertas: z.array(z.unknown()) });
```

## Tabla de referencia: mapeo de tipos JSON a TypeScript y validación Zod

Consulte esta matriz para verificar la correspondencia entre patrones JSON de entrada, tipado estático en TypeScript y validación en tiempo de ejecución:

| Entrada JSON | Tipo TypeScript inferido | Equivalente Zod | Recomendación de diseño |
| :--- | :--- | :--- | :--- |
| `"texto"` | `string` | `z.string()` | Use uniones literales para enums cerrados |
| `42` / `19.95` | `number` | `z.number()` | JSON no separa enteros y decimales |
| `true` / `false` | `boolean` | `z.boolean()` | Mapeo directo uno a uno |
| `null` | `null` | `z.null()` | Amplíe a `T \| null` si el campo admite valor |
| `[1, "dos"]` | `(number \| string)[]` | `z.array(z.union([z.number(), z.string()]))` | Inferido al recorrer todos los índices |
| `[]` (vacío) | `unknown[]` | `z.array(z.unknown())` | Evita `any[]` bajo configuración estricta |
| Clave ausente en ítem | `clave?: T` | `.optional()` | Unificación estructural sobre arreglos |
| Objeto anidado | `export interface SubNombre` | `z.object({ ... })` | Interfaz independiente en PascalCase |

## Escenarios límite en producción: precisión numérica, fechas ISO y seguridad de contratos

Incluso partiendo de interfaces DTO correctamente generadas, los entornos reales presentan cuatro matices que una única muestra JSON no puede revelar por sí sola.

En primer lugar, las **fechas ISO-8601**. El estándar JSON carece de tipo `Date`: una marca temporal como `"2026-11-27T10:10:00Z"` sigue siendo un `string` tras ejecutar `JSON.parse()`. Tipar esa propiedad como `Date` directamente en el DTO de red induce errores en ejecución al invocar métodos como `.toISOString()`. Consérvela como `string` en la interfaz de transporte y transfiérala a `Date` en su capa mapeadora o mediante `z.coerce.date()`.

En segundo lugar, la **diferencia contractual entre `undefined` y `null`**. Algunas APIs omiten propiedades vacías (`prop?: T`) mientras que otras serializan `"prop": null` (`prop: T | null`). Contraste siempre varias muestras —incluyendo respuestas vacías o parciales— frente a su especificación OpenAPI.

En tercer lugar, el **límite de precisión numérica IEEE-754**. Si la API devuelve identificadores de 64 bits serializados como cadena para evitar pérdida de precisión en JavaScript, manténgalos como `string` en TypeScript en lugar de convertirlos a `number`.

Por último, evite las **aserciones de tipo ciegas (`as RespuestaTransaccion`)** tras una llamada `fetch`. Una aserción únicamente silencia al compilador `tsc` sin inspeccionar la carga recibida; si el servidor responde con un error HTML inesperado o cambia un nombre de campo, la aplicación fallará en producción. Validar en tiempo de ejecución con Zod o Valibot en la frontera de entrada garantiza seguridad de tipos real de extremo a extremo.
