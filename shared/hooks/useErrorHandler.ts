"use client";

import { useCallback, useState } from 'react';
import { AppError } from '@/shared/types/error.types';
import { logger } from '@/services/error-handling/logger';

interface UseErrorHandlerConfig {
  logLevel?: 'low' | 'medium' | 'high' | 'critical';
  showToast?: boolean;
  rethrow?: boolean;
}

interface UseErrorHandlerReturn {
  error: AppError | null;
  isError: boolean;
  clearError: () => void;
  handleError: (error: Error | AppError, context?: Record<string, unknown>) => void;
  handleAsyncError: <T>(
    asyncOperation: () => Promise<T>,
    context?: Record<string, unknown>
  ) => Promise<T | null>;
}

export function useErrorHandler(config: UseErrorHandlerConfig = {}): UseErrorHandlerReturn {
  const {
    logLevel = 'medium',
    showToast = false,
    rethrow = false
  } = config;

  const [error, setError] = useState<AppError | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const handleError = useCallback((
    error: Error | AppError,
    context?: Record<string, unknown>
  ) => {
    let appError: AppError;
    
    if (error instanceof AppError) {
      // Si es AppError y hay contexto adicional, crear nuevo AppError
      if (context && error.context) {
        appError = new AppError(
          error.message,
          error.code,
          error.statusCode,
          { ...error.context, ...context }
        );
      } else {
        appError = error;
      }
    } else {
      appError = new AppError(
        error.message || 'Error desconocido',
        'HANDLED_ERROR',
        undefined,
        { originalError: error.name, ...context }
      );
    }

    setError(appError);

    // Log del error
    logger.log(appError, logLevel).catch(() => {
      // Fallback silencioso
    });

    // Mostrar toast si está habilitado
    if (showToast && typeof window !== 'undefined') {
      // Aquí se podría integrar con un sistema de notificaciones
      // Por ahora, mostramos una alerta simple
      setTimeout(() => {
        alert(`Error: ${appError.message}`);
      }, 100);
    }

    if (rethrow) {
      throw appError;
    }
  }, [logLevel, showToast, rethrow]);

  const handleAsyncError = useCallback(async <T>(
    asyncOperation: () => Promise<T>,
    context?: Record<string, unknown>
  ): Promise<T | null> => {
    try {
      clearError();
      const result = await asyncOperation();
      return result;
    } catch (error) {
      handleError(error as Error, context);
      return null;
    }
  }, [handleError, clearError]);

  return {
    error,
    isError: error !== null,
    clearError,
    handleError,
    handleAsyncError
  };
}

// Hook especializado para errores de formularios
export function useFormErrorHandler() {
  return useErrorHandler({
    logLevel: 'medium',
    showToast: true,
    rethrow: false
  });
}

// Hook especializado para errores críticos
export function useCriticalErrorHandler() {
  return useErrorHandler({
    logLevel: 'critical',
    showToast: true,
    rethrow: true
  });
}

// Hook especializado para errores de carga de datos
export function useDataErrorHandler() {
  return useErrorHandler({
    logLevel: 'high',
    showToast: false,
    rethrow: false
  });
} 