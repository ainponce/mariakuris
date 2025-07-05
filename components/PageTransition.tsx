"use client"

import { useEffect, useState } from 'react'

export const PageTransition = () => {
    const [isVisible, setIsVisible] = useState(true)
    const [shouldRender, setShouldRender] = useState(true)

    useEffect(() => {
        // Permitir que la página se cargue completamente
        const loadTimer = setTimeout(() => {
            setIsVisible(false)

            // Después de la animación, remover el componente del DOM
            setTimeout(() => {
                setShouldRender(false)
            }, 5000) // Duración de la animación (5 segundos)
        }, 1000) // Delay inicial más largo para una transición más suave

        return () => clearTimeout(loadTimer)
    }, [])

    if (!shouldRender) return null

    return (
        <div
            className={`fixed inset-0 z-[9999] bg-[rgb(var(--theme-bg))] transition-opacity duration-5000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            style={{
                backdropFilter: 'blur(0px)',
                WebkitBackdropFilter: 'blur(0px)'
            }}
        >
            {/* Gradiente sutil para hacer la transición más suave */}
            <div
                className={`absolute inset-0 bg-gradient-to-br from-[rgb(var(--theme-gradient-from))] via-[rgb(var(--theme-gradient-to))] to-[#003366]/5 transition-opacity duration-4000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'
                    }`}
            />
        </div>
    )
} 