# 👤 Historias de Usuario Detalladas

## Historia de Usuario Principal

**Como** desarrollador del proyecto de demo CITIC-SIB 2025
**Quiero** tener las secciones principales de la página separadas en componentes reutilizables
**Para** poder reutilizarlos en diferentes páginas, mejorar la mantenibilidad del código y seguir las mejores prácticas de React

## 📋 Criterios de Aceptación Detallados

### ✅ Header Component
**Como** desarrollador
**Quiero** un componente Header reutilizable
**Para** mostrar títulos y subtítulos en diferentes páginas

**Criterios específicos:**
- El componente debe recibir props `title` y `subtitle`
- Debe mantener el styling actual (Tailwind CSS)
- Debe ser responsive y accesible
- Debe tener tipos TypeScript definidos

```typescript
interface HeaderProps {
  title: string;
  subtitle?: string;
}
```

### ✅ EmailForm Component  
**Como** usuario de la aplicación
**Quiero** que el formulario funcione exactamente igual que antes
**Para** no perder funcionalidad durante la refactorización

**Criterios específicos:**
- El componente debe manejar su propio estado local (email)
- Debe recibir un callback `onSubmit` con el email
- Debe mantener todas las validaciones actuales
- Debe limpiar el campo después del submit
- Debe usar los mismos componentes UI (Card, Input, Button)

```typescript
interface EmailFormProps {
  onSubmit: (email: string) => void;
}
```

### ✅ Terminal Component
**Como** usuario
**Quiero** ver los datos en el terminal exactamente como antes
**Para** tener la misma experiencia visual

**Criterios específicos:**
- Debe recibir un array de `terminalEntries` como prop
- Debe mostrar el estado vacío cuando no hay entries
- Debe mantener el scroll automático y animaciones
- Debe preservar el formato y colores actuales

```typescript
interface TerminalEntry {
  timestamp: string;
  email: string;
}

interface TerminalProps {
  entries: TerminalEntry[];
}
```

## 🔄 Casos de Uso Principales

### Caso de Uso 1: Usuario ingresa email
**Precondición:** La página está cargada
**Flujo principal:**
1. Usuario ve el header con título "Demo de Formulario"
2. Usuario escribe email en el campo de texto
3. Usuario hace click en "Enviar" (botón cyan)
4. Email se limpia del formulario
5. Nuevo entry aparece en el terminal con timestamp

**Postcondición:** El email aparece en el terminal y el formulario está listo para el siguiente

### Caso de Uso 2: Múltiples emails
**Precondición:** Ya hay al menos un entry en el terminal
**Flujo principal:**
1. Usuario ingresa nuevo email
2. Usuario envía el formulario
3. Nuevo entry se agrega al final de la lista
4. Se mantiene el separador visual entre entries
5. Scroll automático al final si es necesario

### Caso de Uso 3: Estado inicial
**Precondición:** Aplicación recién cargada
**Flujo esperado:**
1. Header muestra título y subtítulo
2. Formulario está vacío y listo para input
3. Terminal muestra mensaje "waiting for input..." con cursor parpadeante

## 🧪 Casos de Prueba Específicos

### Test Case 1: Header Component
```typescript
// Debe renderizar título y subtítulo
expect(screen.getByText("Demo de Formulario")).toBeInTheDocument();
expect(screen.getByText("Charla CITIC - SIB 2025")).toBeInTheDocument();

// Debe manejar título sin subtítulo
render(<Header title="Solo Título" />);
expect(screen.getByText("Solo Título")).toBeInTheDocument();
```

### Test Case 2: EmailForm Component
```typescript
// Debe llamar onSubmit con email correcto
const mockSubmit = jest.fn();
render(<EmailForm onSubmit={mockSubmit} />);

userEvent.type(screen.getByLabelText("Email"), "test@example.com");
userEvent.click(screen.getByText("Enviar"));

expect(mockSubmit).toHaveBeenCalledWith("test@example.com");

// Debe limpiar el campo después del submit
expect(screen.getByLabelText("Email")).toHaveValue("");
```

### Test Case 3: Terminal Component
```typescript
// Debe mostrar estado vacío
render(<Terminal entries={[]} />);
expect(screen.getByText("$ waiting for input...")).toBeInTheDocument();

// Debe mostrar entries correctamente
const entries = [{ timestamp: "10:30:45", email: "test@test.com" }];
render(<Terminal entries={entries} />);
expect(screen.getByText("[10:30:45] $ form-submit")).toBeInTheDocument();
expect(screen.getByText("→ Email: test@test.com")).toBeInTheDocument();
```

## 🎯 Escenarios Edge Cases

### Edge Case 1: Email vacío o solo espacios
- El formulario no debe enviar emails vacíos
- Debe usar `trim()` para eliminar espacios
- No debe agregar entry al terminal si email está vacío

### Edge Case 2: Email muy largo
- El terminal debe manejar emails largos correctamente
- Debe mantener el layout sin romper la UI
- Considerar truncado si es necesario

### Edge Case 3: Muchos entries en terminal
- Debe mantener performance con muchos entries
- Scroll debe funcionar correctamente
- Altura máxima debe respetarse (400px)

### Edge Case 4: Timestamp consistency
- Cada entry debe tener timestamp único y correcto
- Formato debe ser consistente (toLocaleTimeString())

## 🔍 Validaciones de Integración

### Validación 1: Comunicación entre componentes
- EmailForm debe comunicarse correctamente con página principal via callback
- Terminal debe recibir y mostrar actualizaciones del estado global
- Header debe renderizarse independientemente del estado de otros componentes

### Validación 2: Props drilling evitado
- Los componentes deben recibir solo las props que necesitan
- No debe haber dependencias innecesarias entre componentes
- Cada componente debe ser testeable de forma aislada

### Validación 3: Mantener funcionalidad exacta
- El comportamiento debe ser idéntico al original
- Las animaciones y efectos visuales deben preservarse
- Los estilos y responsive design deben mantenerse

## 📱 Consideraciones de UX

### UX 1: Feedback visual
- El botón debe mantener el color cyan y comportamiento actual
- El cursor parpadeante en terminal debe seguir funcionando
- Las animaciones de transición deben preservarse

### UX 2: Accesibilidad
- Labels y roles ARIA deben mantenerse
- Navegación por teclado debe funcionar
- Contraste de colores debe cumplir estándares

### UX 3: Responsive design
- Componentes deben adaptarse a diferentes tamaños de pantalla
- Layout debe mantenerse en mobile y desktop
- Text wrapping debe funcionar correctamente