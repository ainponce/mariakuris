"use client";

import { createContext, useContext, useReducer, useMemo, useCallback, ReactNode, useEffect } from 'react';
import { ThemeState, ThemeAction } from '@/shared/types/context.types';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';

type Theme = 'light' | 'dark';

// Reducer para manejar el estado del tema
function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
    switch (action.type) {
        case 'SET_THEME':
            return {
                ...state,
                theme: action.payload,
                error: null
            };
        case 'SET_RESOLVED_THEME':
            return {
                ...state,
                resolvedTheme: action.payload
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
                theme: 'light',
                resolvedTheme: 'light',
                isLoading: false,
                error: null
            };
        default:
            return state;
    }
}

// Tipos para el contexto
interface ThemeContextValue {
    state: ThemeState;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
    resetTheme: () => void;
}

// Crear contexto
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// Hook para usar el contexto
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

// Proveedor del contexto
interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    // Estado inicial
    const initialState: ThemeState = {
        theme: 'light',
        resolvedTheme: 'light',
        isLoading: true,
        error: null
    };

    const [state, dispatch] = useReducer(themeReducer, initialState);

    // Hook de localStorage optimizado
    const { value: storedTheme, setValue: setStoredTheme, isLoading: storageLoading } = useLocalStorage({
        key: 'theme',
        defaultValue: 'light' as Theme,
        version: 1
    });

    // Función para aplicar tema al DOM
    const applyTheme = useCallback((theme: Theme) => {
        try {
            if (typeof window === 'undefined') return;

            const root = document.documentElement;

            // Remover clases anteriores
            root.classList.remove('light', 'dark');

            // Aplicar nueva clase
            root.classList.add(theme);

            // Actualizar atributo data-theme
            root.setAttribute('data-theme', theme);

            // Actualizar meta theme-color para móviles
            const metaThemeColor = document.querySelector('meta[name="theme-color"]');
            if (metaThemeColor) {
                metaThemeColor.setAttribute('content', theme === 'dark' ? '#020202' : '#FFFFFF');
            }

            dispatch({ type: 'SET_RESOLVED_THEME', payload: theme });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Error al aplicar tema' });
        }
    }, []);

    // Sincronizar con localStorage
    useMemo(() => {
        if (!storageLoading && storedTheme !== state.theme) {
            dispatch({ type: 'SET_THEME', payload: storedTheme });
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, [storedTheme, storageLoading, state.theme]);

    // Aplicar tema cuando cambia
    useEffect(() => {
        if (!state.isLoading) {
            applyTheme(state.theme);
        }
    }, [state.theme, state.isLoading, applyTheme]);

    // Función para cambiar tema (memoizada)
    const setTheme = useCallback((theme: Theme) => {
        try {
            dispatch({ type: 'SET_THEME', payload: theme });
            setStoredTheme(theme);
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Error al cambiar tema' });
        }
    }, [setStoredTheme]);

    // Función para alternar tema (memoizada)
    const toggleTheme = useCallback(() => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    }, [state.theme, setTheme]);

    // Función para resetear tema
    const resetTheme = useCallback(() => {
        dispatch({ type: 'RESET_STATE' });
        setStoredTheme('light');
    }, [setStoredTheme]);

    // Detectar preferencias del sistema
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e: MediaQueryListEvent) => {
            // Solo aplicar si es la primera vez y no hay preferencia guardada
            if (state.isLoading && !storedTheme) {
                const systemTheme = e.matches ? 'dark' : 'light';
                dispatch({ type: 'SET_THEME', payload: systemTheme });
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        };

        mediaQuery.addEventListener('change', handleChange);

        // Verificar preferencia inicial
        if (state.isLoading && !storedTheme) {
            const systemTheme = mediaQuery.matches ? 'dark' : 'light';
            dispatch({ type: 'SET_THEME', payload: systemTheme });
            dispatch({ type: 'SET_LOADING', payload: false });
        }

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [state.isLoading, storedTheme]);

    // Valor del contexto (memoizado)
    const contextValue = useMemo(() => ({
        state,
        setTheme,
        toggleTheme,
        resetTheme
    }), [state, setTheme, toggleTheme, resetTheme]);

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};

// Hook para acceder solo al estado de carga
export const useThemeLoading = () => {
    const { state } = useTheme();
    return state.isLoading;
};

// Hook para acceder solo al tema actual
export const useCurrentTheme = () => {
    const { state } = useTheme();
    return state.theme;
};

// Hook para acceder solo al tema resuelto
export const useResolvedTheme = () => {
    const { state } = useTheme();
    return state.resolvedTheme;
};

// Hook para el toggle de tema
export const useThemeToggle = () => {
    const { toggleTheme } = useTheme();
    return toggleTheme;
}; 