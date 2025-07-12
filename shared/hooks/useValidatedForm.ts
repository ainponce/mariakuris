"use client";

import { useState, useCallback, useRef } from 'react';
import { useFormErrorHandler } from '@/shared/hooks/useErrorHandler';
import { logger } from '@/services/error-handling/logger';
import { AppError } from '@/shared/types/error.types';

interface UseValidatedFormConfig<T> {
  initialValues: T;
  validationFunction: (data: unknown) => {
    success: boolean;
    data?: T;
    errors?: Record<string, string>;
  };
  onSubmit: (data: T) => Promise<void>;
  onSuccess?: (data: T) => void;
  onError?: (error: AppError) => void;
  submitDelay?: number;
  autoReset?: boolean;
}

interface UseValidatedFormReturn<T> {
  values: T;
  errors: Record<string, string>;
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
  setValue: (field: keyof T, value: T[keyof T]) => void;
  setValues: (values: Partial<T>) => void;
  validateField: (field: keyof T) => boolean;
  validateForm: () => boolean;
  handleSubmit: (e?: React.FormEvent) => Promise<void>;
  reset: () => void;
  clearErrors: () => void;
}

export function useValidatedForm<T extends Record<string, any>>({
  initialValues,
  validationFunction,
  onSubmit,
  onSuccess,
  onError,
  submitDelay = 1000,
  autoReset = false
}: UseValidatedFormConfig<T>): UseValidatedFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Set<keyof T>>(new Set());
  
  const { handleError } = useFormErrorHandler();
  const submitTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSubmitTimeRef = useRef<number>(0);

  // Función para validar un campo específico
  const validateField = useCallback((field: keyof T): boolean => {
    try {
      const fieldValue = values[field];
      const testData = { ...values, [field]: fieldValue };
      
      const result = validationFunction(testData);
      
      if (result.success) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[field as string];
          return newErrors;
        });
        return true;
      } else {
        if (result.errors && result.errors[field as string]) {
          setErrors(prev => ({
            ...prev,
            [field]: result.errors![field as string]
          }));
        }
        return false;
      }
    } catch (error) {
      logger.warn('Error en validación de campo', {
        field: field as string,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      return false;
    }
  }, [values, validationFunction]);

  // Función para validar todo el formulario
  const validateForm = useCallback(): boolean => {
    try {
      const result = validationFunction(values);
      
      if (result.success) {
        setErrors({});
        return true;
      } else {
        setErrors(result.errors || {});
        return false;
      }
    } catch (error) {
      handleError(error as Error, { context: 'form-validation' });
      return false;
    }
  }, [values, validationFunction, handleError]);

  // Función para establecer el valor de un campo
  const setValue = useCallback((field: keyof T, value: T[keyof T]) => {
    setValues(prev => ({
      ...prev,
      [field]: value
    }));
    
    setIsDirty(true);
    setTouchedFields(prev => new Set(prev.add(field)));
    
    // Validar el campo después de un pequeño delay
    setTimeout(() => {
      if (touchedFields.has(field)) {
        validateField(field);
      }
    }, 300);
  }, [touchedFields, validateField]);

  // Función para establecer múltiples valores
  const setFormValues = useCallback((newValues: Partial<T>) => {
    setValues(prev => ({ ...prev, ...newValues }));
    setIsDirty(true);
    
    // Marcar campos como tocados
    Object.keys(newValues).forEach(field => {
      setTouchedFields(prev => new Set(prev.add(field as keyof T)));
    });
  }, []);

  // Función para manejar el envío del formulario
  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    // Verificar rate limiting
    const now = Date.now();
    if (now - lastSubmitTimeRef.current < submitDelay) {
      setErrors(prev => ({
        ...prev,
        general: 'Por favor, espere un momento antes de enviar nuevamente'
      }));
      return;
    }

    // Validar formulario
    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Agregar timestamp para validación adicional
      const dataWithTimestamp = {
        ...values,
        timestamp: Date.now(),
        honeypot: '' // Campo honeypot vacío
      };

      await onSubmit(dataWithTimestamp as T);
      
      lastSubmitTimeRef.current = Date.now();
      
      if (onSuccess) {
        onSuccess(values);
      }
      
      if (autoReset) {
        reset();
      }
      
      // Log exitoso
      logger.info('Formulario enviado exitosamente', {
        formType: 'contact',
        fieldsCount: Object.keys(values).length
      });
      
    } catch (error) {
      const appError = error instanceof AppError 
        ? error 
        : new AppError(
            'Error al enviar formulario',
            'FORM_SUBMIT_ERROR',
            500,
            { formData: Object.keys(values) }
          );
      
      handleError(appError);
      
      if (onError) {
        onError(appError);
      }
      
      setErrors(prev => ({
        ...prev,
        general: appError.message
      }));
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validateForm, onSubmit, onSuccess, onError, autoReset, submitDelay, handleError]);

  // Función para limpiar errores
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  // Función para resetear el formulario
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsDirty(false);
    setTouchedFields(new Set());
    
    if (submitTimeoutRef.current) {
      clearTimeout(submitTimeoutRef.current);
    }
  }, [initialValues]);

  // Calcular si el formulario es válido
  const isValid = Object.keys(errors).length === 0 && isDirty;

  return {
    values,
    errors,
    isSubmitting,
    isValid,
    isDirty,
    setValue,
    setValues: setFormValues,
    validateField,
    validateForm,
    handleSubmit,
    reset,
    clearErrors
  };
}

// Hook especializado para formulario de contacto
export function useContactForm(onSubmit: (data: any) => Promise<void>) {
  const { validateContactForm } = require('@/services/validation/contactFormValidation');
  
  return useValidatedForm({
    initialValues: {
      nombre: '',
      apellido: '',
      empresa: '',
      email: '',
      telefono: '',
      areaConsulta: '',
      descripcionCaso: '',
      consentimiento: false
    },
    validationFunction: validateContactForm,
    onSubmit,
    submitDelay: 2000,
    autoReset: true
  });
}

// Hook especializado para newsletter
export function useNewsletterForm(onSubmit: (data: any) => Promise<void>) {
  const { validateNewsletter } = require('@/services/validation/contactFormValidation');
  
  return useValidatedForm({
    initialValues: {
      email: '',
      nombre: '',
      consentimiento: false
    },
    validationFunction: validateNewsletter,
    onSubmit,
    submitDelay: 1000,
    autoReset: true
  });
} 