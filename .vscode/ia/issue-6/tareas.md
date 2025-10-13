# 🔧 Tareas de Implementación - Issue #6

## 📋 Desglose Granular de Tareas

### 1. ⚙️ Setup Inicial
**Estado:** ✅ Completado  
**Duración estimada:** 15 minutos  

- [x] Crear rama `feature/issue-6-email-validation` desde `develop`
- [x] Crear estructura de documentación en `.vscode/ia/issue-6/`
- [x] Analizar código actual del componente `EmailForm.tsx`

### 2. 🧠 Análisis y Diseño de Solución
**Estado:** ✅ Completado  
**Duración estimada:** 20 minutos  

- [x] Definir regex pattern para validación de email
- [x] Diseñar estados del componente (email, emailError, isValid)
- [x] Planificar feedback visual y UX
- [x] Documentar casos de prueba

### 3. 💻 Implementación Core - Validación de Email
**Estado:** ⏳ Pendiente  
**Duración estimada:** 45 minutos  
**Archivos a modificar:** `components/EmailForm.tsx`

#### 3.1 Agregar constantes y tipos (5min)
```typescript
// Regex para validación de email
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Tipos para estados de error
interface EmailValidation {
  isValid: boolean;
  errorMessage: string | null;
}
```

#### 3.2 Actualizar estados del componente (10min)
```typescript
const [email, setEmail] = useState("");
const [emailError, setEmailError] = useState<string | null>(null);
const [hasInteracted, setHasInteracted] = useState(false);
```

#### 3.3 Crear función de validación (15min)
```typescript
const validateEmail = (emailValue: string): EmailValidation => {
  const trimmedEmail = emailValue.trim();
  
  if (!trimmedEmail) {
    return { isValid: false, errorMessage: null }; // No mostrar error si está vacío
  }
  
  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return { isValid: false, errorMessage: "Ingresa un email válido" };
  }
  
  return { isValid: true, errorMessage: null };
};
```

#### 3.4 Implementar validación en tiempo real (15min)
```typescript
const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const newEmail = e.target.value;
  setEmail(newEmail);
  
  if (!hasInteracted && newEmail.length > 0) {
    setHasInteracted(true);
  }
  
  if (hasInteracted) {
    const validation = validateEmail(newEmail);
    setEmailError(validation.errorMessage);
  }
};
```

### 4. 🎨 Implementación UI - Feedback Visual
**Estado:** ⏳ Pendiente  
**Duración estimada:** 30 minutos  
**Archivos a modificar:** `components/EmailForm.tsx`

#### 4.1 Actualizar componente Input (15min)
```jsx
<Input
  id="email"
  type="email"  // Cambiar de "text" a "email" para mejor semántica
  placeholder="ejemplo@correo.com"
  value={email}
  onChange={handleEmailChange}
  className={cn(
    "w-full",
    emailError && hasInteracted ? "border-red-500 ring-red-500" : ""
  )}
  aria-invalid={emailError && hasInteracted ? "true" : "false"}
  aria-describedby={emailError && hasInteracted ? "email-error" : undefined}
/>
```

#### 4.2 Agregar mensaje de error (10min)
```jsx
{emailError && hasInteracted && (
  <p 
    id="email-error" 
    className="text-red-600 text-sm mt-1"
    role="alert"
  >
    {emailError}
  </p>
)}
```

#### 4.3 Actualizar botón con validación (5min)
```jsx
<Button 
  type="submit" 
  variant="cyan" 
  className="w-full"
  disabled={!isEmailValid || !email.trim()}
>
  Enviar
</Button>
```

### 5. 🔄 Actualizar Lógica de Submit
**Estado:** ⏳ Pendiente  
**Duración estimada:** 10 minutos  

```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  const validation = validateEmail(email);
  
  if (!validation.isValid) {
    setHasInteracted(true);
    setEmailError(validation.errorMessage);
    return;
  }
  
  // Email válido - proceder con envío
  onSubmit(email.trim());
  setEmail("");
  setEmailError(null);
  setHasInteracted(false);
};
```

### 6. 🧪 Testing y Validación
**Estado:** ⏳ Pendiente  
**Duración estimada:** 45 minutos  

#### 6.1 Testing Manual (25min)
**Casos a probar:**
- [ ] Email válido: `test@example.com` → ✅ permite envío
- [ ] Email sin @: `testexample.com` → ❌ muestra error
- [ ] Email sin dominio: `test@` → ❌ muestra error
- [ ] Email sin TLD: `test@example` → ❌ muestra error
- [ ] Campo vacío: `` → ⚪ neutro, botón deshabilitado
- [ ] Solo espacios: `   ` → ⚪ neutro
- [ ] Email con espacios: ` test@example.com ` → ✅ trimea y acepta
- [ ] Feedback visual: borde rojo en error, normal en válido
- [ ] Mensaje de error aparece/desaparece correctamente
- [ ] Botón habilitado/deshabilitado según validez

#### 6.2 Tests Unitarios (15min) - OPCIONAL para demo
```typescript
// Si hay tiempo, crear tests básicos
describe('EmailForm Validation', () => {
  test('accepts valid email', () => {
    // Test implementation
  });
  
  test('rejects invalid email', () => {
    // Test implementation  
  });
});
```

#### 6.3 Testing de Accesibilidad (5min)
- [ ] Screen reader puede leer mensajes de error
- [ ] `aria-invalid` se actualiza correctamente
- [ ] `aria-describedby` conecta input con mensaje de error
- [ ] Navegación con teclado funciona

### 7. 📱 Testing Cross-Browser
**Estado:** ⏳ Pendiente  
**Duración estimada:** 15 minutos  

- [ ] Chrome/Edge (Chromium) - funcionalidad principal
- [ ] Firefox - validar regex compatibility
- [ ] Safari - si está disponible
- [ ] Mobile responsiveness - DevTools mobile simulation

### 8. 🎨 Refinamiento de UX
**Estado:** ⏳ Pendiente  
**Duración estimada:** 10 minutos  

#### 8.1 Ajustes finales de styling
- [ ] Verificar colores de error son contrastados
- [ ] Asegurar mensaje de error no rompe layout
- [ ] Verificar estados de focus del input

#### 8.2 Micro-interacciones (opcional)
- [ ] Transición suave de colores
- [ ] Animación sutil para mensaje de error

### 9. 📝 Documentación del Proceso
**Estado:** ⏳ En progreso  
**Duración estimada:** Continua durante implementación  

#### 9.1 Log de Ejecución
- [ ] Timestamp de inicio de cada tarea
- [ ] Decisiones técnicas tomadas
- [ ] Problemas encontrados y soluciones
- [ ] Screenshots de testing

#### 9.2 Criterios de Aceptación
- [ ] Validar cada criterio definido en historias de usuario
- [ ] Documentar resultados de testing
- [ ] Confirmar que cumple todos los requisitos

### 10. 🚀 Preparación del Pull Request
**Estado:** ⏳ Pendiente  
**Duración estimada:** 20 minutos  

#### 10.1 Code Quality (10min)
```bash
# Ejecutar linting
npm run lint

# Verificar build
npm run build  

# Ejecutar tests (si existen)
npm test
```

#### 10.2 Commit y Push (5min)
```bash
git add .
git commit -m "feat: add email validation to EmailForm component (closes #6)

- Add real-time email format validation with regex
- Implement visual feedback with error states
- Add accessibility attributes (aria-invalid, aria-describedby)
- Disable submit button for invalid emails
- Improve UX with non-intrusive error messages

Closes #6"

git push origin feature/issue-6-email-validation
```

#### 10.3 Crear PR (5min)
- [ ] Título descriptivo con referencia al issue
- [ ] Descripción completa con checklist
- [ ] Screenshots/GIFs de la funcionalidad
- [ ] Linking al issue #6

## 📊 Comandos y Scripts Útiles

### Durante Desarrollo
```bash
# Servidor de desarrollo
npm run dev

# Linting en watch mode
npm run lint --watch

# Build para verificar que compila
npm run build
```

### Para Testing
```bash
# Verificar que no hay errores TypeScript
npx tsc --noEmit

# Ejecutar Biome para linting
npx biome check

# Formatear código
npx biome format --write
```

### Para Debugging
```bash
# Ver estado actual de git
git status

# Ver diferencias
git diff

# Ver log de commits
git log --oneline -5
```

## 🎯 Criterios de "Done" por Tarea

### ✅ Tarea completada cuando:
1. **Código implementado** según especificación
2. **Testing manual** de casos principales ✅
3. **No hay errores** de TypeScript o linting
4. **Accesibilidad básica** verificada
5. **Documentación** actualizada en log-ejecucion.md

### 🚫 Criterios de bloqueo:
- Errores de compilación
- Funcionalidad rompe casos de uso existentes
- Regex permite emails claramente inválidos
- UI/UX significativamente degradada

## 📈 Métricas de Progreso

### Implementación: 0/5 tareas core completadas
- [ ] Estados del componente actualizados
- [ ] Función de validación implementada
- [ ] Feedback visual funcionando
- [ ] Lógica de submit actualizada
- [ ] Testing manual completado

### Calidad: 0/4 checks completados
- [ ] Sin errores de TypeScript
- [ ] Linting pasa
- [ ] Build exitoso
- [ ] Testing básico de accesibilidad

### Documentación: 3/5 archivos completados
- [x] planificacion.md
- [x] historias-usuario.md
- [x] tareas.md
- [ ] log-ejecucion.md (en progreso)
- [ ] criterios-aceptacion.md

**Progreso total:** ~40% (documentación completa, implementación pendiente)