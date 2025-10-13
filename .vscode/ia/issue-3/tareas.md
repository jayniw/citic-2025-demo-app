# 📝 Desglose Técnico de Tareas

## 🎯 Resumen de Implementación
Refactorizar `app/page.tsx` separando las 3 secciones principales en componentes reutilizables independientes.

## 📋 Lista de Tareas Detalladas

### 1. 🏗️ Setup Inicial
**Descripción:** Configurar rama de trabajo y estructura de documentación
**Estimación:** 5 minutos
**Archivos afectados:** Ninguno (setup de git)

**Comandos específicos:**
```bash
git checkout develop
git pull origin develop
git checkout -b feature/issue-3-component-sections
mkdir -p .vscode/ia/issue-3
```

**Criterios de completitud:**
- [ ] Rama creada correctamente
- [ ] Documentación inicializada
- [ ] Workspace limpio para desarrollo

---

### 2. 🎨 Crear Header Component
**Descripción:** Extraer la sección header en componente reutilizable
**Estimación:** 30 minutos
**Archivos afectados:** 
- ✨ Crear: `components/Header.tsx`

**Implementación detallada:**
```typescript
// components/Header.tsx
interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
        {title}
      </h1>
      {subtitle && (
        <p className="text-gray-600 dark:text-gray-300">
          {subtitle}
        </p>
      )}
    </div>
  );
}
```

**Validaciones:**
- [ ] Props correctamente tipadas
- [ ] Styling preservado exactamente
- [ ] Subtitle opcional funciona
- [ ] Export nombrado disponible

---

### 3. 📝 Crear EmailForm Component
**Descripción:** Extraer formulario con su lógica interna y callback
**Estimación:** 1 hora
**Archivos afectados:**
- ✨ Crear: `components/EmailForm.tsx`

**Implementación detallada:**
```typescript
// components/EmailForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EmailFormProps {
  onSubmit: (email: string) => void;
}

export function EmailForm({ onSubmit }: EmailFormProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onSubmit(email.trim());
      setEmail("");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Ingresa tu Email</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="text"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>
          <Button type="submit" variant="cyan" className="w-full">
            Enviar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

**Validaciones:**
- [ ] Estado local del email funciona
- [ ] Callback onSubmit se ejecuta correctamente
- [ ] Validación de email vacío
- [ ] Campo se limpia después del submit
- [ ] Todos los imports correctos
- [ ] "use client" incluido

---

### 4. 💻 Crear Terminal Component
**Descripción:** Extraer terminal de display en componente que recibe entries
**Estimación:** 45 minutos
**Archivos afectados:**
- ✨ Crear: `components/Terminal.tsx`

**Implementación detallada:**
```typescript
// components/Terminal.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TerminalEntry {
  timestamp: string;
  email: string;
}

interface TerminalProps {
  entries: TerminalEntry[];
}

export function Terminal({ entries }: TerminalProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          Terminal - Datos Enviados
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm min-h-[200px] max-h-[400px] overflow-y-auto">
          {entries.length === 0 ? (
            <div className="text-gray-500">
              $ waiting for input...
              <span className="animate-pulse">_</span>
            </div>
          ) : (
            <div className="space-y-2">
              {entries.map((entry, index) => (
                <div
                  key={`${entry.timestamp}-${index}`}
                  className="space-y-1"
                >
                  <div className="text-blue-400">
                    [{entry.timestamp}] $ form-submit
                  </div>
                  <div className="text-green-400 pl-4">
                    → Email: {entry.email}
                  </div>
                  <div className="text-yellow-400 pl-4">
                    ✓ Data processed successfully
                  </div>
                  {index < entries.length - 1 && (
                    <div className="border-t border-gray-700 my-2"></div>
                  )}
                </div>
              ))}
              <div className="text-gray-500 mt-2">
                $ <span className="animate-pulse">_</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
```

**Validaciones:**
- [ ] Interface TerminalEntry exportada
- [ ] Estado vacío renderiza correctamente
- [ ] Entries se muestran con formato correcto
- [ ] Animaciones preservadas (cursor parpadeante)
- [ ] Scroll y altura máxima funcionan
- [ ] Keys únicas para elementos de lista

---

### 5. 🔧 Refactorizar Página Principal
**Descripción:** Modificar `app/page.tsx` para usar los nuevos componentes
**Estimación:** 30 minutos
**Archivos afectados:**
- 🔧 Modificar: `app/page.tsx`

**Implementación detallada:**
```typescript
// app/page.tsx (refactorizado)
"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { EmailForm } from "@/components/EmailForm";
import { Terminal } from "@/components/Terminal";

interface TerminalEntry {
  timestamp: string;
  email: string;
}

export default function Home() {
  const [terminalEntries, setTerminalEntries] = useState<TerminalEntry[]>([]);

  const handleEmailSubmit = (email: string) => {
    const newEntry: TerminalEntry = {
      timestamp: new Date().toLocaleTimeString(),
      email: email,
    };
    setTerminalEntries((prev) => [...prev, newEntry]);
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto space-y-8">
        <Header 
          title="Demo de Formulario" 
          subtitle="Charla CITIC - SIB 2025" 
        />
        
        <EmailForm onSubmit={handleEmailSubmit} />
        
        <Terminal entries={terminalEntries} />
      </div>
    </div>
  );
}
```

**Validaciones:**
- [ ] Imports correctos de los nuevos componentes
- [ ] Estado global de terminalEntries preservado
- [ ] Callback handleEmailSubmit funciona
- [ ] Layout y styling exactamente igual
- [ ] Funcionalidad completa preservada

---

### 6. 🧪 Testing y Validación Manual
**Descripción:** Probar funcionalidad completa y casos edge
**Estimación:** 30 minutos
**Archivos afectados:** Ninguno (testing)

**Plan de testing:**
```bash
# Desarrollo
npm run dev

# Verificar linting
npm run lint

# Verificar build
npm run build
```

**Checklist de testing manual:**
- [ ] Página carga correctamente
- [ ] Header muestra título y subtítulo
- [ ] Formulario acepta input de email
- [ ] Botón cyan funciona
- [ ] Email aparece en terminal con timestamp
- [ ] Múltiples emails se acumulan
- [ ] Campo se limpia después de submit
- [ ] Estado vacío del terminal funciona
- [ ] Animaciones funcionan (cursor parpadeante)
- [ ] Responsive design se mantiene
- [ ] No hay errores en consola
- [ ] No hay warnings de TypeScript

---

### 7. 🚀 Preparación para PR
**Descripción:** Linting final, commit y push
**Estimación:** 15 minutos
**Archivos afectados:** Todos los modificados

**Comandos específicos:**
```bash
# Linting final
npm run lint

# Build verification
npm run build

# Git workflow
git add .
git commit -m "feat: refactor main page sections into reusable components (closes #3)"
git push origin feature/issue-3-component-sections
```

**Checklist final:**
- [ ] Biome linting pasa sin errores
- [ ] Build completa exitosamente
- [ ] Commit message sigue convenciones
- [ ] Push exitoso a rama feature
- [ ] Listo para crear PR

---

## 📊 Resumen de Archivos

### Archivos Nuevos (4)
1. `components/Header.tsx` - Componente header reutilizable
2. `components/EmailForm.tsx` - Componente formulario con callback  
3. `components/Terminal.tsx` - Componente terminal display
4. `.vscode/ia/issue-3/` - Documentación completa del proceso

### Archivos Modificados (1)
1. `app/page.tsx` - Refactorizado para usar nuevos componentes

## 🎯 Métricas Objetivo
- **Líneas de código original:** ~100 líneas en page.tsx
- **Líneas después de refactor:** ~30 en page.tsx + ~200 en componentes
- **Componentes reutilizables:** 3 nuevos componentes
- **Reducción de complejidad:** Separación clara de responsabilidades
- **Mantenibilidad:** +80% (componentes independientes y testeables)