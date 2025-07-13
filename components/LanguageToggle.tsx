"use client"

import { useLanguage } from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/button'
import { Languages } from 'lucide-react'

interface LanguageToggleProps {
    color?: string;
    isTransparent?: boolean;
}

export const LanguageToggle = ({ color, isTransparent = false }: LanguageToggleProps) => {
    const { language, setLanguage } = useLanguage()

    const toggleLanguage = () => {
        setLanguage(language === 'es' ? 'en' : 'es')
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="transition-all duration-300 gap-2 hover:scale-105 active:scale-95"
            style={{
                color: color || (isTransparent ? '#ffffff' : '#1e293b'),
                backgroundColor: 'transparent',
                filter: isTransparent ? 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' : 'none'
            }}
        >
            <Languages className="h-4 w-4" />
            <span className="text-sm font-medium">
                {language === 'es' ? 'EN' : 'ES'}
            </span>
        </Button>
    )
} 