import { z } from 'zod';

// Expresiones regulares para validación
const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Función para sanitizar HTML
function sanitizeHtml(input: string): string {
  return input
    .replace(/<[^>]*>/g, '') // Remover etiquetas HTML
    .replace(/&[^;]+;/g, '') // Remover entidades HTML
    .replace(/[<>&'"]/g, (match) => {
      const entities: Record<string, string> = {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        "'": '&#x27;',
        '"': '&quot;'
      };
      return entities[match] || match;
    })
    .trim();
}

// Función para sanitizar texto general
function sanitizeText(input: string): string {
  return input
    .replace(/[^\w\s\-@.,!?áéíóúÁÉÍÓÚñÑ]/g, '') // Solo caracteres seguros
    .trim()
    .substring(0, 500); // Limitar longitud
}

// Esquema de validación para el formulario de contacto
export const contactFormSchema = z.object({
  nombre: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres')
    .regex(nameRegex, 'El nombre solo puede contener letras y espacios')
    .transform(sanitizeText),
  
  apellido: z
    .string()
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no puede exceder 50 caracteres')
    .regex(nameRegex, 'El apellido solo puede contener letras y espacios')
    .transform(sanitizeText),
  
  empresa: z
    .string()
    .min(2, 'El nombre de la empresa debe tener al menos 2 caracteres')
    .max(100, 'El nombre de la empresa no puede exceder 100 caracteres')
    .transform(sanitizeText),
  
  email: z
    .string()
    .email('El formato del email no es válido')
    .regex(emailRegex, 'El email debe tener un formato válido')
    .max(100, 'El email no puede exceder 100 caracteres')
    .transform((email) => email.toLowerCase().trim()),
  
  telefono: z
    .string()
    .regex(phoneRegex, 'El formato del teléfono no es válido')
    .max(20, 'El teléfono no puede exceder 20 caracteres')
    .transform((phone) => phone.replace(/[^\d\+]/g, '')),
  
  areaConsulta: z
    .enum([
      'derecho-societario',
      'contratos-corporativos',
      'compliance-corporativo',
      'gobierno-corporativo',
      'ma-transacciones',
      'derecho-financiero',
      'otro'
    ], {
      errorMap: () => ({ message: 'Debe seleccionar un área de consulta válida' })
    }),
  
  descripcionCaso: z
    .string()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(2000, 'La descripción no puede exceder 2000 caracteres')
    .transform(sanitizeHtml),
  
  // Campos de seguridad
  honeypot: z.string().optional().default(''),
  timestamp: z.number().optional(),
  
  // Consentimiento
  consentimiento: z
    .boolean()
    .refine((val) => val === true, 'Debe aceptar el consentimiento para continuar')
});

// Esquema para newsletter
export const newsletterSchema = z.object({
  email: z
    .string()
    .email('El formato del email no es válido')
    .max(100, 'El email no puede exceder 100 caracteres')
    .transform((email) => email.toLowerCase().trim()),
  
  nombre: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres')
    .optional()
    .transform((name) => name ? sanitizeText(name) : undefined),
  
  consentimiento: z
    .boolean()
    .refine((val) => val === true, 'Debe aceptar el consentimiento para continuar')
});

// Tipos inferidos
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type NewsletterData = z.infer<typeof newsletterSchema>;

// Función para validar formulario de contacto
export function validateContactForm(data: unknown): {
  success: boolean;
  data?: ContactFormData;
  errors?: Record<string, string>;
} {
  try {
    const result = contactFormSchema.safeParse(data);
    
    if (result.success) {
      // Verificar honeypot
      if (result.data.honeypot && result.data.honeypot.length > 0) {
        return {
          success: false,
          errors: { general: 'Solicitud no válida' }
        };
      }
      
      // Verificar timestamp (protección contra bots)
      if (result.data.timestamp) {
        const now = Date.now();
        const timeDiff = now - result.data.timestamp;
        if (timeDiff < 3000) { // Mínimo 3 segundos
          return {
            success: false,
            errors: { general: 'Por favor, tómese un momento para completar el formulario' }
          };
        }
      }
      
      return {
        success: true,
        data: result.data
      };
    } else {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        if (error.path.length > 0) {
          errors[error.path[0]] = error.message;
        }
      });
      
      return {
        success: false,
        errors
      };
    }
  } catch (error) {
    return {
      success: false,
      errors: { general: 'Error en la validación del formulario' }
    };
  }
}

// Función para validar newsletter
export function validateNewsletter(data: unknown): {
  success: boolean;
  data?: NewsletterData;
  errors?: Record<string, string>;
} {
  try {
    const result = newsletterSchema.safeParse(data);
    
    if (result.success) {
      return {
        success: true,
        data: result.data
      };
    } else {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        if (error.path.length > 0) {
          errors[error.path[0]] = error.message;
        }
      });
      
      return {
        success: false,
        errors
      };
    }
  } catch (error) {
    return {
      success: false,
      errors: { general: 'Error en la validación del formulario' }
    };
  }
}

// Función para limpiar datos sensibles antes de logging
export function sanitizeDataForLogging(data: ContactFormData): Partial<ContactFormData> {
  const { email, telefono, descripcionCaso, ...safeData } = data;
  
  return {
    ...safeData,
    email: email ? `${email.substring(0, 3)}***@${email.split('@')[1]}` : undefined,
    telefono: telefono ? `***${telefono.slice(-4)}` : undefined,
    descripcionCaso: descripcionCaso ? `${descripcionCaso.substring(0, 50)}...` : undefined
  };
} 