"use client";

import { useCallback, useEffect, useState } from 'react';
import { logger } from '@/services/error-handling/logger';
import { AppError } from '@/shared/types/error.types';

interface UseLocalStorageOptions<T> {
  serialize?: (value: T) => string;
  deserialize?: (value: string) => T;
  defaultValue: T;
  key: string;
  version?: number;
}

interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (value: T | ((prev: T) => T)) => void;
  removeValue: () => void;
  isLoading: boolean;
  error: string | null;
}

export function useLocalStorage<T>({
  serialize = JSON.stringify,
  deserialize = JSON.parse,
  defaultValue,
  key,
  version = 1
}: UseLocalStorageOptions<T>): UseLocalStorageReturn<T> {
  const [value, setValue] = useState<T>(defaultValue);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const versionedKey = `${key}_v${version}`;

  // Función para leer desde localStorage
  const readFromStorage = useCallback((): T => {
    try {
      if (typeof window === 'undefined') {
        return defaultValue;
      }

      const item = window.localStorage.getItem(versionedKey);
      
      if (item === null) {
        return defaultValue;
      }

      return deserialize(item);
    } catch (error) {
      logger.warn('Error leyendo desde localStorage', {
        key: versionedKey,
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
      setError('Error al leer configuración guardada');
      return defaultValue;
    }
  }, [versionedKey, defaultValue, deserialize]);

  // Función para escribir a localStorage
  const writeToStorage = useCallback((newValue: T) => {
    try {
      if (typeof window === 'undefined') {
        return;
      }

      window.localStorage.setItem(versionedKey, serialize(newValue));
      setError(null);
    } catch (error) {
      const appError = new AppError(
        'Error al guardar configuración',
        'STORAGE_ERROR',
        undefined,
        { key: versionedKey, value: newValue }
      );
      
      logger.log(appError, 'medium').catch(() => {});
      setError('Error al guardar configuración');
    }
  }, [versionedKey, serialize]);

  // Función para eliminar del localStorage
  const removeValue = useCallback(() => {
    try {
      if (typeof window === 'undefined') {
        return;
      }

      window.localStorage.removeItem(versionedKey);
      setValue(defaultValue);
      setError(null);
    } catch (error) {
      logger.warn('Error eliminando desde localStorage', {
        key: versionedKey,
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
      setError('Error al eliminar configuración');
    }
  }, [versionedKey, defaultValue]);

  // Cargar valor inicial desde localStorage
  useEffect(() => {
    const storedValue = readFromStorage();
    setValue(storedValue);
    setIsLoading(false);
  }, [readFromStorage]);

  // Función para actualizar valor
  const updateValue = useCallback((newValue: T | ((prev: T) => T)) => {
    const valueToStore = typeof newValue === 'function' 
      ? (newValue as (prev: T) => T)(value)
      : newValue;

    setValue(valueToStore);
    writeToStorage(valueToStore);
  }, [value, writeToStorage]);

  // Limpiar versiones anteriores
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      // Limpiar versiones anteriores
      for (let i = 1; i < version; i++) {
        const oldKey = `${key}_v${i}`;
        if (window.localStorage.getItem(oldKey)) {
          window.localStorage.removeItem(oldKey);
        }
      }
    } catch (error) {
      // Ignorar errores de limpieza
    }
  }, [key, version]);

  return {
    value,
    setValue: updateValue,
    removeValue,
    isLoading,
    error
  };
}

// Hook especializado para configuraciones simples
export function useSimpleStorage<T>(key: string, defaultValue: T) {
  return useLocalStorage({
    key,
    defaultValue,
    serialize: JSON.stringify,
    deserialize: JSON.parse,
    version: 1
  });
} 