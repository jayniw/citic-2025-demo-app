# ✅ Criterios de Aceptación y Validación

## 🎯 Criterios de Aceptación Principales

### 1. ✅ Componente Header
- [ ] **CA-H1:** Componente `Header` creado en `components/Header.tsx`
- [ ] **CA-H2:** Recibe props `title` (requerido) y `subtitle` (opcional)
- [ ] **CA-H3:** Mantiene styling exacto del original (Tailwind CSS)
- [ ] **CA-H4:** Funciona con y sin subtítulo
- [ ] **CA-H5:** Tipos TypeScript correctamente definidos
- [ ] **CA-H6:** Export nombrado disponible

**Prueba de validación:**
```typescript
// Debe renderizar con título y subtítulo
<Header title="Demo de Formulario" subtitle="Charla CITIC - SIB 2025" />

// Debe renderizar solo con título
<Header title="Solo Título" />
```

### 2. ✅ Componente EmailForm
- [ ] **CA-F1:** Componente `EmailForm` creado en `components/EmailForm.tsx`
- [ ] **CA-F2:** Maneja estado local del email internamente
- [ ] **CA-F3:** Recibe prop `onSubmit` callback function
- [ ] **CA-F4:** Valida email no vacío y hace trim()
- [ ] **CA-F5:** Limpia campo después del submit exitoso
- [ ] **CA-F6:** Usa exactamente los mismos UI components
- [ ] **CA-F7:** Botón mantiene variant="cyan"
- [ ] **CA-F8:** "use client" directive incluida

**Prueba de validación:**
```typescript
// Callback debe ejecutarse con email correcto
const handleSubmit = (email: string) => {
  console.log('Email recibido:', email);
};
<EmailForm onSubmit={handleSubmit} />

// Debe limpiar campo después de submit
// Debe validar email vacío y trim()
```

### 3. ✅ Componente Terminal
- [ ] **CA-T1:** Componente `Terminal` creado en `components/Terminal.tsx`
- [ ] **CA-T2:** Recibe prop `entries` array de TerminalEntry
- [ ] **CA-T3:** Interface TerminalEntry correctamente definida
- [ ] **CA-T4:** Muestra estado vacío con "waiting for input..."
- [ ] **CA-T5:** Renderiza entries con formato exacto del original
- [ ] **CA-T6:** Preserva animaciones (cursor parpadeante)
- [ ] **CA-T7:** Mantiene scroll y altura máxima (400px)
- [ ] **CA-T8:** Separadores entre entries funcionan

**Prueba de validación:**
```typescript
// Estado vacío
<Terminal entries={[]} />

// Con entries
const entries = [
  { timestamp: "10:30:45", email: "test@example.com" },
  { timestamp: "10:31:12", email: "otro@test.com" }
];
<Terminal entries={entries} />
```

### 4. ✅ Página Principal Refactorizada
- [ ] **CA-P1:** `app/page.tsx` usa los nuevos componentes
- [ ] **CA-P2:** Funcionalidad exactamente igual que antes
- [ ] **CA-P3:** Estado `terminalEntries` se mantiene en página
- [ ] **CA-P4:** Callback `handleEmailSubmit` funciona correctamente
- [ ] **CA-P5:** Layout y spacing se preservan
- [ ] **CA-P6:** Imports correctos de todos los componentes

**Prueba de validación:**
```typescript
// Página debe usar los 3 componentes
<Header title="..." subtitle="..." />
<EmailForm onSubmit={handleEmailSubmit} />
<Terminal entries={terminalEntries} />
```

## 🧪 Plan de Testing Detallado

### Unit Tests por Componente

#### Header Component Tests
```typescript
describe('Header Component', () => {
  test('renders title and subtitle correctly', () => {
    render(<Header title="Test Title" subtitle="Test Subtitle" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
  });

  test('renders without subtitle', () => {
    render(<Header title="Only Title" />);
    expect(screen.getByText("Only Title")).toBeInTheDocument();
    expect(screen.queryByText("Test Subtitle")).not.toBeInTheDocument();
  });

  test('applies correct CSS classes', () => {
    render(<Header title="Test" />);
    const title = screen.getByText("Test");
    expect(title).toHaveClass("text-4xl", "font-bold");
  });
});
```

#### EmailForm Component Tests
```typescript
describe('EmailForm Component', () => {
  test('calls onSubmit with correct email', async () => {
    const mockSubmit = jest.fn();
    render(<EmailForm onSubmit={mockSubmit} />);
    
    const input = screen.getByLabelText("Email");
    const button = screen.getByText("Enviar");
    
    await userEvent.type(input, "test@example.com");
    await userEvent.click(button);
    
    expect(mockSubmit).toHaveBeenCalledWith("test@example.com");
  });

  test('clears input after submit', async () => {
    const mockSubmit = jest.fn();
    render(<EmailForm onSubmit={mockSubmit} />);
    
    const input = screen.getByLabelText("Email");
    await userEvent.type(input, "test@example.com");
    await userEvent.click(screen.getByText("Enviar"));
    
    expect(input).toHaveValue("");
  });

  test('trims whitespace and validates empty', async () => {
    const mockSubmit = jest.fn();
    render(<EmailForm onSubmit={mockSubmit} />);
    
    const input = screen.getByLabelText("Email");
    await userEvent.type(input, "  test@example.com  ");
    await userEvent.click(screen.getByText("Enviar"));
    
    expect(mockSubmit).toHaveBeenCalledWith("test@example.com");
  });

  test('does not submit empty email', async () => {
    const mockSubmit = jest.fn();
    render(<EmailForm onSubmit={mockSubmit} />);
    
    await userEvent.click(screen.getByText("Enviar"));
    
    expect(mockSubmit).not.toHaveBeenCalled();
  });
});
```

#### Terminal Component Tests
```typescript
describe('Terminal Component', () => {
  test('shows empty state correctly', () => {
    render(<Terminal entries={[]} />);
    expect(screen.getByText("$ waiting for input...")).toBeInTheDocument();
    expect(screen.getByText("_")).toHaveClass("animate-pulse");
  });

  test('renders entries correctly', () => {
    const entries = [
      { timestamp: "10:30:45", email: "test@test.com" }
    ];
    render(<Terminal entries={entries} />);
    
    expect(screen.getByText("[10:30:45] $ form-submit")).toBeInTheDocument();
    expect(screen.getByText("→ Email: test@test.com")).toBeInTheDocument();
    expect(screen.getByText("✓ Data processed successfully")).toBeInTheDocument();
  });

  test('renders multiple entries with separators', () => {
    const entries = [
      { timestamp: "10:30:45", email: "first@test.com" },
      { timestamp: "10:31:12", email: "second@test.com" }
    ];
    render(<Terminal entries={entries} />);
    
    expect(screen.getByText("→ Email: first@test.com")).toBeInTheDocument();
    expect(screen.getByText("→ Email: second@test.com")).toBeInTheDocument();
    
    // Verificar separador (border-t)
    const separators = document.querySelectorAll('.border-t');
    expect(separators.length).toBeGreaterThan(0);
  });
});
```

### Integration Tests

#### Component Communication Tests
```typescript
describe('Page Integration', () => {
  test('email submission flow works end-to-end', async () => {
    render(<HomePage />);
    
    // Verificar componentes están presentes
    expect(screen.getByText("Demo de Formulario")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByText("$ waiting for input...")).toBeInTheDocument();
    
    // Enviar email
    const input = screen.getByLabelText("Email");
    await userEvent.type(input, "integration@test.com");
    await userEvent.click(screen.getByText("Enviar"));
    
    // Verificar aparece en terminal
    expect(screen.getByText("→ Email: integration@test.com")).toBeInTheDocument();
    expect(screen.getByText("✓ Data processed successfully")).toBeInTheDocument();
    
    // Verificar input está limpio
    expect(input).toHaveValue("");
  });

  test('multiple emails accumulate correctly', async () => {
    render(<HomePage />);
    
    const input = screen.getByLabelText("Email");
    const button = screen.getByText("Enviar");
    
    // Primer email
    await userEvent.type(input, "first@test.com");
    await userEvent.click(button);
    
    // Segundo email
    await userEvent.type(input, "second@test.com");
    await userEvent.click(button);
    
    // Ambos deben estar en terminal
    expect(screen.getByText("→ Email: first@test.com")).toBeInTheDocument();
    expect(screen.getByText("→ Email: second@test.com")).toBeInTheDocument();
  });
});
```

## 🔍 Manual Testing Checklist

### Funcionalidad Core
- [ ] **MT-1:** Página carga sin errores
- [ ] **MT-2:** Header muestra título y subtítulo correctos
- [ ] **MT-3:** Formulario acepta input de texto
- [ ] **MT-4:** Botón "Enviar" es clickeable y de color cyan
- [ ] **MT-5:** Email se envía al hacer submit
- [ ] **MT-6:** Campo se limpia después del submit
- [ ] **MT-7:** Email aparece en terminal con timestamp
- [ ] **MT-8:** Múltiples emails se acumulan en orden
- [ ] **MT-9:** Terminal muestra estado vacío inicialmente

### Visual y UX
- [ ] **MT-10:** Cursor parpadeante funciona en terminal
- [ ] **MT-11:** Separadores visuales entre entries
- [ ] **MT-12:** Scroll automático en terminal si necesario
- [ ] **MT-13:** Colores correctos (verde, azul, amarillo para terminal)
- [ ] **MT-14:** Responsive design funciona en mobile
- [ ] **MT-15:** Dark mode funciona correctamente
- [ ] **MT-16:** Animaciones y transiciones preservadas

### Edge Cases
- [ ] **MT-17:** Email vacío no se envía
- [ ] **MT-18:** Espacios en blanco se trimean
- [ ] **MT-19:** Emails muy largos no rompen layout
- [ ] **MT-20:** Muchos emails no afectan performance
- [ ] **MT-21:** Timestamp es consistente y correcto

### Técnico
- [ ] **MT-22:** No hay errores en consola del navegador
- [ ] **MT-23:** No hay warnings de React/TypeScript
- [ ] **MT-24:** Build se completa sin errores
- [ ] **MT-25:** Linting pasa sin problemas

## 📊 Criterios de Success Metrics

### Funcionalidad Preservada: 100%
- Todas las características originales funcionan idéntico
- No se pierde ninguna funcionalidad existente
- UX mantiene exactamente la misma experiencia

### Calidad de Código: Mejorada
- Separación clara de responsabilidades
- Componentes reutilizables y testeables
- Types TypeScript correctos y completos
- Código más mantenible y escalable

### Performance: Mantenida
- No degradación de performance
- Misma velocidad de carga y renderizado
- Animaciones suaves preservadas

### Estructura de Proyecto: Optimizada
- Organización clara de componentes
- Imports y exports consistentes
- Preparado para escalabilidad futura

## ✅ Validación Final

### Checklist Pre-PR
- [ ] Todos los criterios de aceptación ✅
- [ ] Manual testing completo ✅
- [ ] No errores de linting ✅
- [ ] Build exitoso ✅
- [ ] Funcionalidad idéntica al original ✅
- [ ] Componentes correctamente tipados ✅
- [ ] Documentación completa ✅

### Sign-off Criteria
- [ ] **Desarrollador:** Funcionalidad implementada y probada
- [ ] **QA:** Manual testing completo sin issues
- [ ] **Technical:** Código revisado y aprovado
- [ ] **Product:** Cumple requisitos del issue original

**Estado de validación:** 🔄 PENDIENTE - En proceso de implementación