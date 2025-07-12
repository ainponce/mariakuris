import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, ContactFormData, ApiResponse } from '@/lib/validations';
import { useToast } from '@/hooks/use-toast';
import { useConfig } from '@/hooks/use-config';

interface UseContactFormOptions {
  onSuccess?: (data: ContactFormData, response: ApiResponse) => void;
  onError?: (error: string) => void;
}

export const useContactForm = (options: UseContactFormOptions = {}) => {
  const { toast } = useToast();
  const { whatsappNumber } = useConfig();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      nombre: '',
      apellido: '',
      empresa: '',
      email: '',
      telefono: '',
      areaConsulta: '',
      mensaje: '',
    },
    mode: 'onChange', // Validar en tiempo real
  });

  const { handleSubmit, formState: { errors, isValid }, reset, watch } = form;

  // Función para enviar el formulario
  const onSubmit = useCallback(async (data: ContactFormData) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitCount(prev => prev + 1);

    try {
      // Mostrar toast de enviando
      toast({
        title: '📤 Enviando consulta...',
        description: 'Por favor espere mientras procesamos su solicitud.',
        duration: 2000,
      });

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al enviar la consulta');
      }

      if (result.success) {
        // Guardar URL de WhatsApp para uso posterior
        setWhatsappUrl(result.whatsappUrl || null);

        // Toast de éxito
        toast({
          title: '✅ ¡Consulta enviada exitosamente!',
          description: 'Recibirá una respuesta en breve. También puede contactarnos por WhatsApp.',
          duration: 6000,
        });

        // Resetear formulario
        reset();
        
        // Callback de éxito
        options.onSuccess?.(data, result);

        // Mostrar opción de WhatsApp después de un momento
        setTimeout(() => {
          if (result.whatsappUrl) {
            toast({
              title: '💬 ¿Prefiere una respuesta inmediata?',
              description: 'Haga clic en el botón de WhatsApp para contactarnos directamente',
              duration: 8000,
            });
          }
        }, 3000);

      } else {
        throw new Error(result.error || 'Error desconocido');
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Error al enviar la consulta';
      
      toast({
        title: '❌ Error al enviar la consulta',
        description: errorMessage,
        variant: 'destructive',
        duration: 5000,
      });

      options.onError?.(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }, [isSubmitting, toast, reset, options]);

  // Función para contacto rápido por WhatsApp
  const contactWhatsApp = useCallback(() => {
    const formData = watch();
    
    let message = '';
    if (formData.nombre || formData.empresa) {
      message = `Hola, soy ${formData.nombre} de ${formData.empresa}. `;
    } else {
      message = 'Hola, ';
    }
    
    if (formData.areaConsulta) {
      message += `Te escribo sobre: ${formData.areaConsulta}. `;
    }
    
    if (formData.mensaje) {
      message += formData.mensaje;
    } else {
      message += 'Me gustaría recibir más información sobre sus servicios corporativos.';
    }

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: '📱 WhatsApp abierto',
      description: 'Se ha abierto WhatsApp con su mensaje pre-cargado.',
      duration: 3000,
    });
  }, [watch, toast, whatsappNumber]);

  // Función para limpiar formulario
  const clearForm = useCallback(() => {
    reset();
    setWhatsappUrl(null);
    
    toast({
      title: '🧹 Formulario limpiado',
      description: 'Puede comenzar a escribir su nueva consulta.',
      duration: 2000,
    });
  }, [reset, toast]);

  // Función para validar campo individual
  const validateField = useCallback((fieldName: keyof ContactFormData, value: string) => {
    try {
      const fieldSchema = contactFormSchema.shape[fieldName];
      fieldSchema.parse(value);
      return { isValid: true, error: null };
    } catch (error) {
      if (error instanceof Error) {
        return { isValid: false, error: error.message };
      }
      return { isValid: false, error: 'Error de validación' };
    }
  }, []);

  // Calcular progreso del formulario
  const formProgress = useCallback(() => {
    const fields = watch();
    const fieldKeys = Object.keys(fields) as (keyof ContactFormData)[];
    const filledFields = fieldKeys.filter(key => fields[key]?.toString().trim().length > 0);
    return Math.round((filledFields.length / fieldKeys.length) * 100);
  }, [watch]);

  return {
    form,
    isSubmitting,
    submitCount,
    whatsappUrl,
    errors,
    isValid,
    formProgress: formProgress(),
    
    // Acciones
    onSubmit: handleSubmit(onSubmit),
    contactWhatsApp,
    clearForm,
    validateField,
    
    // Funciones auxiliares
    watch,
    reset,
    setValue: form.setValue,
    getValues: form.getValues,
    trigger: form.trigger,
  };
};

// Hook simplificado para casos básicos
export const useSimpleContactForm = () => {
  return useContactForm({
    onSuccess: (data) => {
      console.log('Form submitted successfully:', data);
    },
    onError: (error) => {
      console.error('Form submission error:', error);
    },
  });
};

// Tipos para exportar
export type ContactFormReturn = ReturnType<typeof useContactForm>; 