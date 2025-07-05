"use client"

import { useLanguage } from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/button'
import { Languages } from 'lucide-react'

export const LanguageToggle = () => {
    const { language, setLanguage } = useLanguage()

    const toggleLanguage = () => {
        setLanguage(language === 'es' ? 'en' : 'es')
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="text-[rgb(var(--theme-text))] hover:text-[#003366] hover:bg-[#003366]/5 transition-colors duration-200 gap-2"
        >
            <Languages className="h-4 w-4" />
            <span className="text-sm font-medium">
                {language === 'es' ? 'EN' : 'ES'}
            </span>
        </Button>
    )
} 