# 👤 Historias de Usuario - Issue #6

## Historia Principal

**Como** usuario de la aplicación demo  
**Quiero** que el formulario valide que mi email tenga el formato correcto  
**Para** asegurarme de que ingresé mi email correctamente y evitar errores  

### Contexto
Los usuarios interactúan con un formulario simple de email en la página principal. Actualmente pueden enviar cualquier texto, lo que puede causar confusión sobre si ingresaron correctamente su email.

## ✅ Criterios de Aceptación Detallados

### Criterio 1: Validación de Formato de Email
**Dado** que soy un usuario en la página principal  
**Cuando** ingreso un email con formato válido (ej: `usuario@dominio.com`)  
**Entonces** el formulario debe permitirme enviarlo sin mostrar errores  

**Casos válidos a probar:**
- `test@example.com`
- `user.name@domain.co`
- `user+tag@example-site.com`
- `123@numbers.org`

### Criterio 2: Prevención de Emails Inválidos
**Dado** que soy un usuario en la página principal  
**Cuando** ingreso un email con formato inválido  
**Entonces** el sistema debe mostrarme un mensaje de error y no permitir el envío  

**Casos inválidos a probar:**
- `usuario@` (sin dominio)
- `@dominio.com` (sin usuario)
- `usuario.dominio.com` (sin @)
- `usuario@dominio` (sin TLD)
- ` ` (solo espacios)
- `` (vacío)

### Criterio 3: Feedback Visual Inmediato
**Dado** que soy un usuario escribiendo mi email  
**Cuando** el formato de mi email es inválido  
**Entonces** debo ver:
- El borde del input en color rojo
- Un mensaje claro indicando el error
- El botón de envío deshabilitado

**Cuando** corrijo mi email y es válido  
**Entonces** debo ver:
- El borde del input vuelve a color normal
- El mensaje de error desaparece
- El botón de envío se habilita

### Criterio 4: Experiencia de Usuario No Intrusiva
**Dado** que soy un usuario nuevo en el formulario  
**Cuando** hago clic en el campo de email por primera vez  
**Entonces** no debo ver mensajes de error hasta que empiece a escribir

**Cuando** borro todo el contenido del campo  
**Entonces** el campo debe volver a su estado neutro (sin error, pero botón deshabilitado)

## 🎭 Personas y Escenarios

### Persona 1: Desarrollador Técnico
**Perfil:** Asiste a la charla, familiarizado con formularios web  
**Escenario:** Prueba el formulario con casos edge para ver la robustez
- Intenta emails con caracteres especiales
- Prueba emails muy largos
- Verifica que la validación sea consistente

**Expectativa:** Validación robusta que no sea fácil de romper

### Persona 2: Usuario General
**Perfil:** Persona no técnica que quiere probar la demo  
**Escenario:** Ingresa su email real para ver qué pasa
- Puede cometer errores tipográficos comunes
- Espera feedback claro si algo está mal
- Quiere una experiencia fluida

**Expectativa:** Proceso simple e intuitivo con ayuda visual clara

### Persona 3: Mobile User
**Perfil:** Usuario accediendo desde dispositivo móvil  
**Escenario:** Interactúa con el formulario en pantalla pequeña
- Puede tener autocorrect activo
- Teclado móvil puede introducir espacios extra
- Necesita feedback visual claro en pantalla pequeña

**Expectativa:** Validación que funcione bien en móvil

## 🧪 Casos de Uso Detallados

### Caso de Uso 1: Email Válido - Flujo Exitoso
1. Usuario hace clic en campo email
2. Usuario escribe `maria@empresa.com`
3. Campo se mantiene con borde normal
4. Usuario hace clic en "Enviar"
5. ✅ Email se envía correctamente
6. Campo se limpia para próximo uso

### Caso de Uso 2: Email Inválido - Feedback Inmediato
1. Usuario hace clic en campo email
2. Usuario escribe `maria@` (incompleto)
3. ❌ Borde se vuelve rojo
4. ❌ Aparece mensaje: "Ingresa un email válido"
5. ❌ Botón "Enviar" está deshabilitado
6. Usuario completa: `maria@empresa.com`
7. ✅ Borde vuelve a normal
8. ✅ Mensaje de error desaparece
9. ✅ Botón "Enviar" se habilita

### Caso de Uso 3: Campo Vacío - Estado Neutral
1. Usuario hace clic en campo email
2. Usuario no escribe nada o borra todo
3. ⚪ Campo en estado neutro (sin error)
4. ❌ Botón "Enviar" deshabilitado
5. No se muestra mensaje de error

### Caso de Uso 4: Corrección de Errores
1. Usuario escribe email inválido
2. Ve feedback de error
3. Usuario corrige gradualmente el email
4. En cuanto el email es válido, error desaparece
5. Puede enviar inmediatamente

## 🔍 Edge Cases y Casos Especiales

### Edge Case 1: Emails con Caracteres Especiales Válidos
- `user+newsletter@site.com` ✅
- `user.name@sub.domain.com` ✅
- `user_123@site-name.co.uk` ✅

### Edge Case 2: Espacios Extra
- ` user@domain.com ` → debe trimear y validar ✅
- `user @domain.com` → inválido (espacio en medio) ❌

### Edge Case 3: Longitud
- Email muy corto: `a@b.co` ✅
- Email muy largo: `very.very.long.email.address@super.long.domain.name.example.com` ✅

### Edge Case 4: Casos Límite de Formato
- `123456@numbers.com` ✅
- `user@site.c` (TLD de 1 caracter) → depende del regex, generalmente ❌
- `user@localhost` → según especificación es válido, pero nuestro regex lo rechazará ❌

## 📱 Consideraciones de Accesibilidad

### Para Usuarios con Discapacidades Visuales
- Mensaje de error debe ser anunciado por screen readers
- Usar `aria-invalid="true"` cuando hay error
- Usar `aria-describedby` para asociar mensaje de error

### Para Usuarios con Dificultades Motoras
- Área de clic del input debe ser suficientemente grande
- Error no debe aparecer/desaparecer muy rápidamente
- Botón debe tener estado visual claro (habilitado/deshabilitado)

### Para Usuarios con Dificultades Cognitivas
- Mensaje de error debe ser claro y específico
- No usar jerga técnica ("formato inválido" vs "ingresa un email válido")
- Feedback debe ser inmediato pero no abrumador

## 🎯 Métricas de Éxito

### Funcionales
- ✅ 100% de emails válidos son aceptados
- ✅ 100% de emails inválidos son rechazados
- ✅ Feedback visual aparece en < 100ms
- ✅ No hay falsos positivos/negativos en validación

### Usabilidad
- ✅ Usuario entiende inmediatamente cuando hay error
- ✅ Usuario puede corregir error fácilmente
- ✅ Proceso de envío exitoso es fluido
- ✅ No hay frustración por validación excesivamente estricta

### Técnicas
- ✅ Sin errores de JavaScript en consola
- ✅ Validación funciona en todos los navegadores soportados
- ✅ Performance no afectada por validación
- ✅ Accesibilidad cumple estándares WCAG 2.1

## 📋 Definición de "Done"

Una historia se considera completa cuando:

1. **Implementación técnica**
   - [ ] Validación de email implementada
   - [ ] Estados visuales funcionando
   - [ ] Mensajes de error apropiados
   - [ ] Botón habilitado/deshabilitado según validez

2. **Testing**
   - [ ] Todos los casos de uso principales probados
   - [ ] Edge cases verificados
   - [ ] Testing manual en diferentes navegadores
   - [ ] Tests unitarios escritos y pasando

3. **Accesibilidad**
   - [ ] ARIA attributes correctos
   - [ ] Screen reader compatibility
   - [ ] Keyboard navigation funcional

4. **Documentación**
   - [ ] Código comentado apropiadamente
   - [ ] README actualizado si necesario
   - [ ] Decisiones técnicas documentadas

5. **Review**
   - [ ] Code review aprobado
   - [ ] QA manual completado
   - [ ] Demo funciona correctamente