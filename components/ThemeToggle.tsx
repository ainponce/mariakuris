"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [isOpen, setIsOpen] = useState(false)

    const getIcon = () => {
        return resolvedTheme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />
    }

    const handleThemeChange = (newTheme: 'light' | 'dark') => {
        setTheme(newTheme)
        setIsOpen(false)
    }

    const themes = [
        { key: 'light' as const, label: 'Claro', icon: Sun },
        { key: 'dark' as const, label: 'Oscuro', icon: Moon },
    ]

    return (
        <div className="relative">
            <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 text-current hover:bg-[#003366]/5 transition-colors duration-200"
                onClick={() => setIsOpen(!isOpen)}
            >
                {getIcon()}
                <span className="sr-only">Cambiar tema</span>
            </Button>

            {isOpen && (
                <>
                    {/* Overlay para cerrar al hacer click fuera */}
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Menu minimalista */}
                    <div className="absolute right-0 top-full mt-1 z-20 w-32 bg-[rgb(var(--theme-card-bg))] border border-[#003366]/20 rounded-md shadow-sm overflow-hidden">
                        {themes.map((themeOption) => {
                            const Icon = themeOption.icon
                            return (
                                <button
                                    key={themeOption.key}
                                    onClick={() => handleThemeChange(themeOption.key)}
                                    className="w-full flex items-center px-3 py-2 text-sm text-[rgb(var(--theme-text))] hover:bg-[#003366]/5 transition-colors duration-150"
                                >
                                    <Icon className="h-4 w-4 mr-2 text-[rgb(var(--theme-text))]" />
                                    <span className="flex-1 text-left">{themeOption.label}</span>
                                    {theme === themeOption.key && (
                                        <span className="text-[#003366] text-xs">✓</span>
                                    )}
                                </button>
                            )
                        })}
                    </div>
                </>
            )}
        </div>
    )
} 