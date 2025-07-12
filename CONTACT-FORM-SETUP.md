# 📧 Sistema de Formulario de Contacto - Configuración y Uso

## 📋 Resumen del Sistema

El sistema de formulario de contacto implementado incluye:

- ✅ **Formulario reactivo** con validación en tiempo real
- ✅ **Envío de emails** con diseño profesional via Resend
- ✅ **Integración con WhatsApp** para contacto inmediato
- ✅ **Sistema de toasts** para feedback del usuario
- ✅ **Validación robusta** con Zod y React Hook Form
- ✅ **Diseño responsivo** y accesible
- ✅ **Manejo de errores** centralizado y profesional

---

## 🔧 Configuración Inicial

### 1. Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
# Resend API Key para envío de emails
# Obtener en: https://resend.com/api-keys
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# WhatsApp Business Number (con código de país, sin espacios ni signos)
# Ejemplo: +54 9 11 1234-5678 se convierte en 5491112345678
WHATSAPP_NUMBER=5491123456789

# Email de destino para las consultas corporativas
CONTACT_EMAIL=maria.kuris@corporativo.com

# Email remitente (opcional - por defecto usa onboarding@resend.dev)
# Para testing: onboarding@resend.dev
# Para producción: contacto@tudominio.com (requiere verificación)
FROM_EMAIL=onboarding@resend.dev

# Configuración de rate limiting (opcional)
RATE_LIMIT_REQUESTS=5
RATE_LIMIT_WINDOW=60000
```

**⚠️ Importante:** El sistema ahora usa automáticamente estas variables de entorno. Ya no hay valores hardcodeados en el código.

### 2. Configuración de Resend

1. **Crear cuenta en Resend:**
   - Visita [https://resend.com](https://resend.com)
   - Crea una cuenta gratuita (100 emails/día)

2. **Obtener API Key:**
   - Ve a Settings > API Keys
   - Crea una nueva API key
   - Copia la clave y agrégala a `.env.local`

3. **Configurar dominio:**
   
   **Para Testing/Desarrollo:**
   - Usa `onboarding@resend.dev` (ya configurado por defecto)
   - No requiere verificación
   
   **Para Producción:**
   - Ve a Domains en tu dashboard de Resend
   - Agrega tu dominio personalizado
   - Configura los registros DNS requeridos
   - Espera la verificación (puede tomar unas horas)
   - Actualiza el campo `from` en `app/api/send-email/route.ts`

### 3. Configuración de WhatsApp Business

1. **Obtener número de WhatsApp Business:**
   - Descarga WhatsApp Business
   - Configura tu número comercial
   - Activa las funciones de empresa

2. **Configurar el número:**
   - Formato: código de país + número sin espacios
   - Ejemplo: +54 9 11 1234-5678 → 5491112345678

---

## 📁 Estructura de Archivos

```
├── app/
│   ├── api/
│   │   ├── config/
│   │   │   └── route.ts          # API endpoint para configuración pública
│   │   └── send-email/
│   │       └── route.ts          # API endpoint para envío de emails
│   └── layout.tsx                # Layout principal con Toaster
├── components/
│   └── ContactForm.tsx           # Componente principal del formulario
├── hooks/
│   ├── use-config.ts             # Hook para obtener configuración
│   └── use-contact-form.ts       # Hook personalizado para el formulario
├── lib/
│   └── validations.ts            # Esquemas de validación con Zod
├── .env.local                    # Variables de entorno (crear manualmente)
└── package.json                  # Dependencias instaladas
```

---

## 🔧 Sistema de Configuración Dinámica

### Variables de Entorno Automáticas

El sistema ahora usa automáticamente las variables de entorno que configures:

- **`RESEND_API_KEY`** - Para el envío de emails
- **`WHATSAPP_NUMBER`** - Número de WhatsApp (formato: sin espacios ni signos)
- **`CONTACT_EMAIL`** - Email donde recibirás las consultas
- **`FROM_EMAIL`** - Email remitente (por defecto: `onboarding@resend.dev`)

### Endpoint de Configuración

- **GET `/api/config`** - Retorna configuración pública (número de WhatsApp y email de contacto)
- Las API keys sensibles NO se exponen al frontend
- Configuración cacheada automáticamente en el cliente

### Fallback Seguro

Si falla la configuración o no están las variables:
- Se usan valores por defecto para evitar errores
- El sistema sigue funcionando normalmente
- Se registran logs para debugging

---

## 🚀 Uso del Sistema

### Formulario de Contacto

El formulario incluye los siguientes campos:

- **Nombre*** (mínimo 2 caracteres, solo letras)
- **Apellido*** (mínimo 2 caracteres, solo letras)
- **Empresa*** (mínimo 2 caracteres)
- **Email*** (formato de email válido)
- **Teléfono*** (mínimo 10 caracteres, formatos argentinos)
- **Área de Consulta*** (mínimo 5 caracteres)
- **Mensaje*** (mínimo 20 caracteres, máximo 2000)

### Flujo de Envío

1. **Usuario completa el formulario**
2. **Validación en tiempo real** con feedback visual
3. **Envío del email** con diseño profesional
4. **Toast de confirmación** al usuario
5. **Opción de WhatsApp** para contacto inmediato

### Funcionalidades Adicionales

- **Progreso del formulario** - Barra de progreso visual
- **Botón de limpieza** - Limpiar formulario parcialmente completado
- **Validación estricta** - Previene envíos con datos incompletos
- **Rate limiting** - Previene spam y abuso

---

## 🎨 Personalización

### Cambiar Colores Corporativos

En `components/ContactForm.tsx`:

```tsx
// Cambiar color principal (actualmente #003366)
className="bg-[#TU_COLOR] hover:bg-[#TU_COLOR]/80"

// Cambiar color de WhatsApp (actualmente #25d366)
className="border-[#25d366] text-[#25d366] hover:bg-[#25d366]"
```

### Personalizar Validaciones

En `lib/validations.ts`:

```tsx
// Ejemplo: requerir email corporativo
email: corporateEmailSchema, // Descomenta esta línea

// Ejemplo: validación de teléfono más estricta
telefono: argentinePhoneSchema, // Reemplaza la validación básica
```

### Modificar Template de Email

En `app/api/send-email/route.ts`:

```tsx
// Personalizar el HTML del email
const emailHtml = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <!-- Tu diseño personalizado aquí -->
  </div>
`;
```

---

## 🔒 Consideraciones de Seguridad

### Validación de Datos

- ✅ **Validación del servidor** con Zod
- ✅ **Sanitización de datos** automática
- ✅ **Prevención de XSS** en templates
- ✅ **Rate limiting** básico implementado

### Información Sensible

- ✅ **API keys** en variables de entorno
- ✅ **Logs de errores** sin información sensible
- ✅ **Headers de seguridad** configurados
- ✅ **Validación de origen** para prevenir spam

### Recomendaciones Adicionales

1. **Implementar CAPTCHA** para mayor seguridad
2. **Configurar CORS** específico para el dominio
3. **Agregar logs** con herramientas como Sentry
4. **Implementar rate limiting** más robusto

---

## 📊 Monitoreo y Analytics

### Métricas Disponibles

El sistema registra automáticamente:

- **Envíos exitosos** vs **fallos**
- **Tiempo de respuesta** del API
- **Errores de validación** más comunes
- **Uso de WhatsApp** vs **solo email**

### Logs de Desarrollo

En desarrollo, verifica la consola para:

```bash
✅ Formulario enviado exitosamente: {...}
❌ Error en el formulario: {...}
📧 Email enviado con ID: {...}
📱 WhatsApp abierto: {...}
```

---

## 🐛 Resolución de Problemas

### Error: "RESEND_API_KEY not found"

**Solución:**
1. Verifica que `.env.local` existe
2. Confirma que la variable esté bien escrita
3. Reinicia el servidor de desarrollo

### Error: "Domain is not verified"

**Problema:** `The gmail.com domain is not verified` o similar

**Solución:**
1. **Para Testing:** Usa `onboarding@resend.dev` (ya configurado)
2. **Para Producción:** Verifica tu dominio en Resend:
   ```javascript
   // En app/api/send-email/route.ts
   from: 'Consulta Corporativa <onboarding@resend.dev>' // ✅ Funciona
   from: 'Consulta <contacto@tudominio.com>' // ❌ Requiere verificación
   ```

**⚠️ Dominios que NO funcionan sin verificación:**
- `gmail.com`, `yahoo.com`, `hotmail.com`
- Cualquier dominio que no sea tuyo

### Error: "Invalid email format"

**Solución:**
1. Verifica que el email tenga formato válido
2. Revisa la validación en `lib/validations.ts`
3. Confirma que no haya espacios extra

### Error: "Rate limit exceeded"

**Solución:**
1. Espera unos minutos antes de enviar de nuevo
2. Ajusta `RATE_LIMIT_REQUESTS` en `.env.local`
3. Implementa rate limiting más granular

### WhatsApp no abre correctamente

**Solución:**
1. Verifica que `WHATSAPP_NUMBER` esté en formato correcto
2. Confirma que WhatsApp esté instalado
3. Revisa que el número no tenga espacios o caracteres especiales

---

## 🔄 Actualizaciones Futuras

### Mejoras Planificadas

- [ ] **Integración con CRM** (HubSpot, Salesforce)
- [ ] **Automatización de respuestas** con AI
- [ ] **Dashboard de métricas** administrativo
- [ ] **Sistema de citas** online
- [ ] **Notificaciones push** para la abogada

### Extensiones Opcionales

- [ ] **Integración con Calendly** para citas
- [ ] **Chat en vivo** con widget personalizado
- [ ] **Formularios especializados** por área legal
- [ ] **Sistema de seguimiento** de casos

---

## 📞 Soporte y Contacto

Para dudas sobre la implementación:

1. **Documentación técnica:** Revisa este documento
2. **Issues en GitHub:** Reporta problemas específicos
3. **Logs del servidor:** Verifica los logs de Next.js
4. **Documentación de Resend:** [https://resend.com/docs](https://resend.com/docs)

---

## 📝 Changelog

### v1.0.0 (Actual)
- ✅ Sistema completo de formulario de contacto
- ✅ Integración con Resend para emails
- ✅ Funcionalidad de WhatsApp
- ✅ Validación robusta con Zod
- ✅ Sistema de toasts para feedback
- ✅ Diseño responsivo y accesible

---

**💡 Tip:** Para probar el sistema en desarrollo, usa emails válidos pero puedes usar números de WhatsApp ficticios para las pruebas. 