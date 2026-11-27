---
metaTitle: "Generador de Expresiones Cron y Probador de Horarios POSIX"
metaDescription: "Cree y valide expresiones cron de 5 campos POSIX para Linux, Kubernetes, GitHub Actions y Vercel. Prevenga errores de zona horaria UTC y cambio de hora DST."
metaKeywords: "generador cron, expresion crontab, sintaxis cron 5 campos, kubernetes cronjob, github actions schedule, vercel cron, utc vs dst, probador cron"
title: "Generador de Expresiones Cron y Probador de Horarios"
shortDescription: "Construya, traduzca a lenguaje natural y simule próximas ejecuciones de expresiones cron POSIX de 5 campos para Linux, Kubernetes, GitHub Actions y Vercel en su navegador."
faqs:
  - question: "¿Cuál es la diferencia entre el formato cron POSIX de 5 campos y el de 6 o 7 campos?"
    answer: "El estándar POSIX de 5 campos define minuto, hora, día del mes, mes y día de la semana, y es el utilizado por Linux, Kubernetes, GitHub Actions y Vercel. Los formatos de 6 o 7 campos añaden segundos al inicio o año al final (como en Quartz o Spring) y provocan errores de sintaxis en plataformas POSIX."
  - question: "¿Cómo interpreta cron una expresión donde se restringen tanto el día del mes como el día de la semana?"
    answer: "En el estándar POSIX y Vixie cron, si ambos campos tienen valores distintos de *, se aplica una condición lógica O (OR): la tarea se ejecuta cuando coincide el día del mes O cuando coincide el día de la semana, no únicamente cuando se cumplen ambos."
  - question: "¿Por qué conviene configurar todos los cron jobs en zona horaria UTC?"
    answer: "Las zonas locales con horario de verano (DST) provocan saltos de reloj: al adelantar la hora desaparecen ejecuciones programadas entre las 02:00 y las 03:00, y al atrasarla una tarea puede lanzarse dos veces seguidas. UTC carece de cambios estacionales y garantiza intervalos uniformes."
  - question: "¿Mi arquitectura de tareas programadas o expresiones se guarda en algún servidor?"
    answer: "No. Tanto la traducción a lenguaje natural como la simulación de las próximas fechas de disparo se calculan localmente en el navegador sin enviar configuraciones ni horarios a infraestructura externa."
  - question: "¿Por qué los workflows programados de GitHub Actions no siempre arrancan en el segundo exacto?"
    answer: "GitHub Actions ejecuta el evento schedule en UTC sobre una cola compartida; en horas en punto como 00:00 UTC los retrasos pueden superar los 15 minutos. Programar minutos desplazados como 17 o 42 reduce notablemente la latencia de arranque."
features:
  - "Constructor visual y edición directa para sintaxis cron estándar POSIX de 5 campos"
  - "Traducción inmediata a español técnico claro para documentar archivos crontab y manifiestos YAML"
  - "Simulador de próximas ejecuciones en UTC y en su zona horaria local para detectar desfases DST"
  - "Validación estricta de rangos, pasos (*/n), listas y equivalencias de domingo (0 y 7)"
  - "Procesamiento 100 % en el navegador sin exposición de calendarios internos ni rutas de scripts"
useCases:
  - "Configurar tareas de mantenimiento, copias de seguridad y rotación de logs en crontab de Linux"
  - "Definir manifiestos CronJob de Kubernetes (batch/v1) verificando la cadencia real antes de aplicar"
  - "Programar pipelines de integración continua y auditorías nocturnas en GitHub Actions"
  - "Planificar funciones serverless periódicas en vercel.json respetando ventanas UTC"
  - "Auditar expresiones heredadas con operadores combinados de día del mes y día de la semana"
howToSteps:
  - "Seleccione una plantilla predefinida o escriba su expresión de 5 campos separados por espacios."
  - "Ajuste visualmente minutos, horas, días del mes, meses o días de la semana según su requisito operativo."
  - "Compare la lista de próximas fechas simuladas en UTC frente a la zona horaria local."
  - "Copie la expresión validada e incorpórela en su archivo crontab, CronJob o flujo CI/CD."
---

Programar tareas recurrentes con un único carácter fuera de lugar en una expresión `cron` puede desencadenar ejecuciones cada minuto en lugar de una vez al mes, saturar bases de datos en horas pico o silenciar copias de seguridad críticas durante un cambio de horario estacional. Este generador interpreta y valida expresiones cron de **5 campos bajo la especificación POSIX**, traduciéndolas a una descripción precisa y calculando la secuencia exacta de próximas ejecuciones.

Todo el análisis sintáctico y la simulación temporal se realizan **100 % en el navegador del usuario** sin intervención de servidores remotos. De este modo, sus rutinas de facturación, ventanas de mantenimiento y configuraciones internas de despliegue permanecen estrictamente privadas en su equipo.

## Especificación POSIX de 5 campos y dialectos modernos

El formato clásico heredado de Vixie cron y adoptado por la mayoría de los orquestadores modernos consta de exactamente cinco campos separados por espacios:

```text
*     *     *       *     *
min   hora  día-mes mes   día-semana
(0-59)(0-23)(1-31)  (1-12)(0-6, dom=0 o 7)
```

Cada campo admite cuatro operadores estándar: `*` (todos los valores válidos), comas para listas (`1,15,30`), guiones para rangos (`1-5` en días laborables) y barras para intervalos (`*/15` o `0-30/5`). Aunque algunos entornos admiten abreviaturas (`MON-FRI`, `JAN`), los contenedores ligeros y plataformas serverless prefieren valores numéricos para evitar ambigüedades.

Un matiz esencial de POSIX reside en la interacción entre el día del mes (campo 3) y el día de la semana (campo 5). Cuando **ambos campos son distintos de `*`** —por ejemplo `0 9 15 * 1`—, POSIX aplica una unión lógica (`OR`): la tarea corre todos los días 15 del mes **y también** todos los lunes, no únicamente cuando coinciden. Además, plataformas como Kubernetes, GitHub Actions y Vercel rechazan el sexto campo de segundos propio de Quartz o Spring, por lo que validar contra la gramática de 5 campos evita fallos en el despliegue.

## Guía práctica: configuración en Linux, Kubernetes, GitHub Actions y Vercel

Suponga que programa una conciliación contable de lunes a viernes a las `03:17` UTC (evitando la congestión de las `03:00` en punto) con la expresión `17 3 * * 1-5`. Su configuración cambia según la plataforma:

- **Linux (`crontab -e`)**: Defina `CRON_TZ=UTC` para evitar dependencias de la zona local del servidor:
  ```text
  CRON_TZ=UTC
  17 3 * * 1-5 /usr/local/bin/reconcile-ledger.sh >> /var/log/ledger.log 2>&1
  ```
- **Kubernetes (`batch/v1` `CronJob`)**: Fije `spec.timeZone: "Etc/UTC"` junto con una política de concurrencia segura:
  ```yaml
  apiVersion: batch/v1
  kind: CronJob
  metadata:
    name: ledger-reconcile
  spec:
    schedule: "17 3 * * 1-5"
    timeZone: "Etc/UTC"
    concurrencyPolicy: Forbid
  ```
- **GitHub Actions (`.github/workflows/nightly.yml`)**: Opera siempre en UTC y no admite zonas locales ni macros como `@daily`:
  ```yaml
  on:
    schedule:
      - cron: "17 3 * * 1-5"
  ```
- **Vercel (`vercel.json`)**: Ejecuta peticiones HTTP `GET` mediante expresiones de 5 campos evaluadas en UTC:
  ```json
  {
    "crons": [{ "path": "/api/cron/reconcile", "schedule": "17 3 * * 1-5" }]
  }
  ```

## Tabla de referencia de campos, operadores y ejemplos cron

La siguiente tabla reúne patrones de programación habituales en ingeniería de sistemas junto con su semántica y compatibilidad entre plataformas:

| Expresión Cron | Frecuencia legible | Equivalente macro | Caso de uso habitual | Notas de compatibilidad |
| :--- | :--- | :--- | :--- | :--- |
| `0 * * * *` | Cada hora en el minuto 0 | `@hourly` | Limpieza de caché efímera | Evitar `:00` en GitHub Actions por latencia |
| `*/15 * * * *` | Cada 15 minutos | Sin macro | Sondeo de colas y métricas | Ver límite de frecuencia de su plan en Vercel |
| `17 3 * * 1-5` | Lunes a viernes a las 03:17 | Sin macro | Procesos batch en días hábiles | Estándar universal de 5 campos |
| `30 4 1 * *` | Día 1 de cada mes a las 04:30 | `@monthly` (00:00) | Generación de facturas mensuales | Seguro ante meses de 28, 30 o 31 días |
| `0 0 * * 0` | Todos los domingos a medianoche | `@weekly` | Rotación semanal de índices | Use `0` en lugar de `7` para máxima portabilidad |
| `0 2 29 2 *` | 29 de febrero a las 02:00 | Sin macro | Pruebas de años bisiestos | Se dispara únicamente cada 4 años |
| `*/5 8-18 * * 1-5` | Cada 5 min en horario laboral | Sin macro | Sincronización CRM en oficina | Requiere definir zona horaria si no es UTC |

## Riesgos en producción: UTC frente a DST, concurrencia y desfase

El fallo más frecuente en tareas programadas ocurre alrededor del **horario de verano (*Daylight Saving Time*, DST)**. Si un servidor o `CronJob` utiliza una zona horaria como `Europe/Madrid` o `America/New_York`, el día en que el reloj avanza de `01:59` a `03:00` cualquier tarea fijada a las `02:30` simplemente **no se ejecuta**. Por el contrario, al retrasar el reloj en otoño, la franja entre `01:00` y `02:00` transcurre dos veces, duplicando cobros, correos o migraciones si el proceso no es idempotente. Estandarizar todas las expresiones en **UTC** elimina por completo esta clase de incidentes.

Además de las zonas horarias, considere tres puntos críticos en producción:

- **Solapamiento por latencia (`concurrencyPolicy`)**: En Kubernetes, el valor predeterminado es `Allow`. Si un proceso programado con `*/5 * * * *` tarda 7 minutos debido a un pico de carga, el controlador lanzará una segunda instancia simultánea, provocando contención de bloqueos en base de datos. Configure `concurrencyPolicy: Forbid` o utilice bloqueos distribuidos en Redis/PostgreSQL.
- **El carácter `%` en `crontab` tradicional**: En demonios Vixie cron de Linux, un signo de porcentaje `%` sin escapar dentro del comando se traduce automáticamente en un salto de línea, truncando comandos como `date +%Y-%m-%d`. Escápelo siempre como `\%` en Linux o delegue la lógica a un script externo.
- **Día 31 del mes**: Programar `0 0 31 * *` omite automáticamente febrero, abril, junio, septiembre y noviembre, ejecutando la tarea solo siete veces al año en lugar de doce.
