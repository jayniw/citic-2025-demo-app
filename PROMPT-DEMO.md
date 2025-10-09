# 🎯 PROMPT PARA DEMO: "Del Issue al Pull Request"

## Prompt Principal para la Demo

```
Actúa como un agente de desarrollo automatizado especializado en el flujo completo "Del Issue al Pull Request". 

Tu misión es:
1. Leer issues abiertos del repositorio GitHub: jayniw/citic-2025-demo-app
2. Analizar el issue según las definiciones en el archivo AGENT.md del repositorio
3. Crear documentación completa en .vscode/ia/issue-[número]/
4. Implementar la funcionalidad solicitada
5. Crear un Pull Request listo para revisión

REPOSITORIO: jayniw/citic-2025-demo-app
RAMA BASE: develop
ARCHIVO DE DEFINICIONES: AGENT.md

Inicia leyendo los issues abiertos del repositorio y procede con el análisis e implementación completa.
```

## Variantes del Prompt

### Versión Corta
```
Revisa los issues abiertos en GitHub del repo jayniw/citic-2025-demo-app, analiza según AGENT.md e implementa la solución completa hasta crear el PR.
```

### Versión con Issue Específico
```
Implementa el issue #[número] del repositorio jayniw/citic-2025-demo-app siguiendo el proceso definido en AGENT.md. Crea toda la documentación en .vscode/ia/ y el PR completo.
```

### Versión para Demo en Vivo
```
🚀 DEMO: Del Issue al Pull Request

Repositorio: jayniw/citic-2025-demo-app
Proceso: Seguir definiciones en AGENT.md

Tarea: Lee los issues abiertos e implementa uno completo con documentación en .vscode/ia/ y PR final.
```

## Contexto Necesario para el Agente

### Información del Proyecto
- **Repo**: jayniw/citic-2025-demo-app
- **Tech Stack**: Next.js 14, React, TypeScript, Tailwind CSS, shadcn/ui
- **Rama principal**: develop
- **Definiciones**: AGENT.md (en el repo)

### Estructura Esperada de Documentación
```
.vscode/ia/issue-[número]/
├── planificacion.md
├── historias-usuario.md  
├── tareas.md
├── log-ejecucion.md
└── criterios-aceptacion.md
```

### Flujo Esperado
1. **Leer issues** con MCP GitHub
2. **Análizar** según AGENT.md
3. **Crear rama** feature/issue-X-descripcion
4. **Documentar** en .vscode/ia/
5. **Implementar** código
6. **Testear** funcionalidad
7. **Crear PR** con descripción completa

## Comandos de Verificación

Para verificar que el agente tiene acceso:
- `mcp_github_github_list_issues` para leer issues
- Acceso al workspace del proyecto
- Capacidad de crear archivos y ramas

## Métricas de Éxito

La demo será exitosa si:
- ✅ Lee correctamente los issues del repo
- ✅ Genera documentación completa en .vscode/ia/
- ✅ Implementa funcionalidad solicitada
- ✅ Crea tests apropiados
- ✅ Genera PR con descripción profesional
- ✅ Todo el proceso es trazable y documentado

## Notas para la Presentación

- Enfatizar la **automatización completa** del proceso
- Mostrar la **calidad de la documentación** generada
- Destacar la **trazabilidad** y **colaboración en equipo**
- Demostrar **buenas prácticas** de desarrollo
- Resaltar la **escalabilidad** del enfoque