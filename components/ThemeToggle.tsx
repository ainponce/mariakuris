"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme()

    const toggleTheme = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
    }

    const getIcon = () => {
        return resolvedTheme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 p-0 text-current hover:bg-[#003366]/5 transition-all duration-300 hover:scale-110"
            onClick={toggleTheme}
        >
            {getIcon()}
            <span className="sr-only">
                {resolvedTheme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
            </span>
        </Button>
    )
} 