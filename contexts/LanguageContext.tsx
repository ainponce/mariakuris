"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { Language, translations, getTranslation } from '@/lib/i18n'

interface LanguageContextType {
    language: Language
    setLanguage: (language: Language) => void
    t: (key: keyof typeof translations.es) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}

interface LanguageProviderProps {
    children: ReactNode
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
    const [language, setLanguage] = useState<Language>('es')

    // Load language from localStorage on mount
    useEffect(() => {
        const savedLanguage = localStorage.getItem('language') as Language
        if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
            setLanguage(savedLanguage)
        }
    }, [])

    // Save language to localStorage when changed
    useEffect(() => {
        localStorage.setItem('language', language)
    }, [language])

    const t = (key: keyof typeof translations.es) => {
        return getTranslation(language, key)
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
} 