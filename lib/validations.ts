import { z } from 'zod';

// Esquema de validación para el formulario de contacto
export const contactFormSchema = z.object({
  nombre: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'El nombre solo puede contener letras y espacios'),
  
  apellido: z
    .string()
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no puede exceder 50 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'El apellido solo puede contener letras y espacios'),
  
  empresa: z
    .string()
    .min(2, 'La empresa debe tener al menos 2 caracteres')
    .max(100, 'La empresa no puede exceder 100 caracteres')
    .trim(),
  
  email: z
    .string()
    .email('Por favor ingrese un email válido')
    .min(5, 'El email debe tener al menos 5 caracteres')
    .max(254, 'El email no puede exceder 254 caracteres')
    .toLowerCase()
    .trim(),
  
  telefono: z
    .string()
    .min(10, 'El teléfono debe tener al menos 10 caracteres')
    .max(20, 'El teléfono no puede exceder 20 caracteres')
    .regex(/^[\d\s\-\+\(\)]+$/, 'El teléfono solo puede contener números, espacios, guiones y paréntesis')
    .transform((val) => val.replace(/\s/g, '')), // Remover espacios
  
  areaConsulta: z
    .string()
    .min(5, 'El área de consulta debe tener al menos 5 caracteres')
    .max(200, 'El área de consulta no puede exceder 200 caracteres')
    .trim(),
  
  mensaje: z
    .string()
    .min(20, 'El mensaje debe tener al menos 20 caracteres')
    .max(2000, 'El mensaje no puede exceder 2000 caracteres')
    .trim(),
});

// Tipo TypeScript derivado del esquema
export type ContactFormData = z.infer<typeof contactFormSchema>;

// Esquema para la respuesta de la API
export const apiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  emailId: z.string().optional(),
  whatsappUrl: z.string().optional(),
  error: z.string().optional(),
  details: z.any().optional(),
});

export type ApiResponse = z.infer<typeof apiResponseSchema>;

// Validación para números de teléfono argentinos
export const argentinePhoneSchema = z
  .string()
  .regex(
    /^(\+54|54)?[\s\-]?9?[\s\-]?11[\s\-]?\d{4}[\s\-]?\d{4}$/,
    'Por favor ingrese un número de teléfono argentino válido (ej: +54 9 11 1234-5678)'
  );

// Validación para emails corporativos (opcional)
export const corporateEmailSchema = z
  .string()
  .email('Email inválido')
  .refine(
    (email) => {
      const domain = email.split('@')[1];
      const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
      return !personalDomains.includes(domain);
    },
    {
      message: 'Por favor utilice un email corporativo',
    }
  );

// Esquema extendido para validación más estricta (opcional)
export const strictContactFormSchema = contactFormSchema.extend({
  telefono: argentinePhoneSchema,
  // email: corporateEmailSchema, // Descomenta para requerir email corporativo
});

// Funciones de utilidad para validación
export const validateField = (schema: z.ZodType<any>, value: any) => {
  try {
    schema.parse(value);
    return { isValid: true, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0].message };
    }
    return { isValid: false, error: 'Error de validación' };
  }
};

// Sanitizar datos del formulario
export const sanitizeFormData = (data: any): ContactFormData => {
  return {
    nombre: data.nombre?.trim() || '',
    apellido: data.apellido?.trim() || '',
    empresa: data.empresa?.trim() || '',
    email: data.email?.toLowerCase().trim() || '',
    telefono: data.telefono?.replace(/\s/g, '') || '',
    areaConsulta: data.areaConsulta?.trim() || '',
    mensaje: data.mensaje?.trim() || '',
  };
}; 