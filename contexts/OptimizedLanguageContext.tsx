"use client";

import { createContext, useContext, useReducer, useMemo, useCallback, ReactNode } from 'react';
import { Language, getTranslation } from '@/lib/i18n';
import { LanguageState, LanguageAction } from '@/shared/types/context.types';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';

// Reducer para manejar el estado del idioma
function languageReducer(state: LanguageState, action: LanguageAction): LanguageState {
    switch (action.type) {
        case 'SET_LANGUAGE':
            return {
                ...state,
                language: action.payload,
                error: null
            };
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload
            };
        case 'RESET_STATE':
            return {
                language: 'es',
                isLoading: false,
                error: null
            };
        default:
            return state;
    }
}

// Tipos para el contexto
interface LanguageContextValue {
    state: LanguageState;
    setLanguage: (language: Language) => void;
    t: (key: keyof typeof import('@/lib/i18n').translations.es) => string;
    resetLanguage: () => void;
}

// Crear contexto
const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

// Hook para usar el contexto
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

// Proveedor del contexto
interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
    // Estado inicial
    const initialState: LanguageState = {
        language: 'es',
        isLoading: true,
        error: null
    };

    const [state, dispatch] = useReducer(languageReducer, initialState);

    // Hook de localStorage optimizado
    const { value: storedLanguage, setValue: setStoredLanguage, isLoading: storageLoading } = useLocalStorage({
        key: 'language',
        defaultValue: 'es' as Language,
        version: 1
    });

    // Sincronizar con localStorage
    useMemo(() => {
        if (!storageLoading && storedLanguage !== state.language) {
            dispatch({ type: 'SET_LANGUAGE', payload: storedLanguage });
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, [storedLanguage, storageLoading, state.language]);

    // Función para cambiar idioma (memoizada)
    const setLanguage = useCallback((language: Language) => {
        try {
            dispatch({ type: 'SET_LANGUAGE', payload: language });
            setStoredLanguage(language);
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Error al cambiar idioma' });
        }
    }, [setStoredLanguage]);

    // Función de traducción (memoizada)
    const t = useCallback((key: keyof typeof import('@/lib/i18n').translations.es) => {
        try {
            return getTranslation(state.language, key);
        } catch (error) {
            // Fallback a español en caso de error
            return getTranslation('es', key);
        }
    }, [state.language]);

    // Función para resetear idioma
    const resetLanguage = useCallback(() => {
        dispatch({ type: 'RESET_STATE' });
        setStoredLanguage('es');
    }, [setStoredLanguage]);

    // Valor del contexto (memoizado)
    const contextValue = useMemo(() => ({
        state,
        setLanguage,
        t,
        resetLanguage
    }), [state, setLanguage, t, resetLanguage]);

    return (
        <LanguageContext.Provider value={contextValue}>
            {children}
        </LanguageContext.Provider>
    );
};

// Hook para acceder solo al estado de carga
export const useLanguageLoading = () => {
    const { state } = useLanguage();
    return state.isLoading;
};

// Hook para acceder solo al idioma actual
export const useCurrentLanguage = () => {
    const { state } = useLanguage();
    return state.language;
};

// Hook para acceder solo a la función de traducción
export const useTranslation = () => {
    const { t } = useLanguage();
    return t;
}; 