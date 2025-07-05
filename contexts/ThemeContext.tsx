"use client"

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
    theme: Theme
    setTheme: (theme: Theme) => void
    resolvedTheme: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('light')
    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')

    useEffect(() => {
        // Cargar tema desde localStorage
        const savedTheme = localStorage.getItem('theme') as Theme
        if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
            setTheme(savedTheme)
        }
    }, [])

    useEffect(() => {
        // Guardar tema en localStorage
        localStorage.setItem('theme', theme)

        // El tema resuelto es siempre el mismo que el tema seleccionado
        setResolvedTheme(theme)

        // Aplicar tema al documento
        const root = document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(theme)

        // Actualizar atributo data-theme para compatibilidad adicional
        root.setAttribute('data-theme', theme)
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
} 